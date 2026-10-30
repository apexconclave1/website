import { NextRequest, NextResponse } from 'next/server';
import { CouponSchema, PaymentSchema } from '@/lib/validators/registration';
import { getServiceClient } from '@/lib/supabase/server';
import { getClientIp, isSameOrigin, rateLimit } from '@/lib/security/rate-limit';
import { couponsAllowed, eventsData } from '@/lib/data/events';

const ALLOWED_TYPES: Record<string, string> = { 'image/jpeg': 'jpg', 'image/png': 'png', 'image/webp': 'webp' };
const MAX_FILE_SIZE = 5 * 1024 * 1024;
// The browser's declared type proves nothing; check the file's first bytes too
const SIGNATURES: Record<string, (b: Uint8Array) => boolean> = {
  'image/jpeg': (b) => b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff,
  'image/png': (b) => [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a].every((v, i) => b[i] === v),
  'image/webp': (b) => String.fromCharCode(...b.slice(0, 4)) === 'RIFF' && String.fromCharCode(...b.slice(8, 12)) === 'WEBP',
};
const UTR_TAKEN = 'This UTR has already been used for another registration. Each delegate pays separately; contact us if this is a mistake.';

export async function POST(req: NextRequest) {
  try {
    const ip = getClientIp(req.headers);
    if (!(await rateLimit(`payment:${ip}`, { windowMs: 60_000, maxRequests: 10 })).allowed) {
      return NextResponse.json({ success: false, error: 'Too many attempts. Please wait.' }, { status: 429 });
    }
    if (!isSameOrigin(req.headers)) {
      return NextResponse.json({ success: false, error: 'Invalid request origin.' }, { status: 403 });
    }

    const formData = await req.formData();
    const registrationId = String(formData.get('registrationId') ?? '');
    const trackingCode = String(formData.get('trackingCode') ?? '');
    const rawCoupon = String(formData.get('couponCode') ?? '').trim();
    const screenshot = formData.get('screenshot');
    const screenshotFile = screenshot instanceof File && screenshot.size > 0 ? screenshot : null;

    if (!registrationId || !trackingCode) {
      return NextResponse.json({ success: false, error: 'Missing registration reference.' }, { status: 400 });
    }

    const utrResult = PaymentSchema.safeParse({ paymentUtr: formData.get('paymentUtr') });
    if (!utrResult.success) {
      return NextResponse.json(
        { success: false, error: 'Invalid transaction reference.', issues: utrResult.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    let couponCode: string | null = null;
    if (rawCoupon) {
      const couponResult = CouponSchema.safeParse({ couponCode: rawCoupon });
      if (!couponResult.success) {
        return NextResponse.json({ success: false, error: 'Invalid coupon code format.' }, { status: 400 });
      }
      couponCode = couponResult.data.couponCode;
    }

    if (screenshotFile) {
      if (!ALLOWED_TYPES[screenshotFile.type]) {
        return NextResponse.json({ success: false, error: 'Screenshot must be a JPEG, PNG, or WebP image.' }, { status: 400 });
      }
      if (screenshotFile.size > MAX_FILE_SIZE) {
        return NextResponse.json({ success: false, error: 'Screenshot must be under 5MB.' }, { status: 400 });
      }
      const head = new Uint8Array(await screenshotFile.slice(0, 12).arrayBuffer());
      if (!SIGNATURES[screenshotFile.type](head)) {
        return NextResponse.json({ success: false, error: 'Screenshot must be a real JPEG, PNG, or WebP image.' }, { status: 400 });
      }
    }

    const supabase = getServiceClient();

    // The amount comes from the database row the server wrote, never from the browser
    const { data: existingReg, error: fetchError } = await supabase
      .from('registrations')
      .select('id, event_id, status, original_amount')
      .eq('id', registrationId)
      .eq('tracking_code', trackingCode)
      .single();

    if (fetchError || !existingReg) {
      return NextResponse.json({ success: false, error: 'Registration not found.' }, { status: 404 });
    }
    if (existingReg.status !== 'SUBMITTED') {
      return NextResponse.json(
        { success: false, error: 'Payment has already been submitted for this registration.' },
        { status: 409 }
      );
    }

    // One UTR per registration, checked before any coupon is used (the unique index in migration 004 backs this up)
    const utr = utrResult.data.paymentUtr.toUpperCase();
    const { data: utrUsed } = await supabase.from('registrations').select('id').eq('payment_utr', utr).limit(1);
    if (utrUsed?.length) {
      return NextResponse.json({ success: false, error: UTR_TAKEN }, { status: 409 });
    }

    let finalAmount = Number(existingReg.original_amount);
    const regEvent = eventsData.find((e) => e.id === existingReg.event_id);
    if (couponCode && (!regEvent || !couponsAllowed(regEvent, finalAmount))) {
      return NextResponse.json(
        { success: false, error: 'Coupons apply to the regular fee only, not the early bird fee. Remove it and try again.' },
        { status: 400 }
      );
    }
    if (couponCode) {
      // Checks and uses the coupon in one atomic step; null means invalid or used up
      const { data: discount, error: couponError } = await supabase.rpc('redeem_coupon', {
        coupon_code_param: couponCode,
      });
      if (couponError) {
        console.error('Coupon redeem error:', couponError);
        return NextResponse.json({ success: false, error: 'Could not apply the coupon. Please try again.' }, { status: 500 });
      }
      if (discount === null) {
        return NextResponse.json(
          { success: false, error: 'This coupon is invalid or has been fully used. Remove it and try again.' },
          { status: 400 }
        );
      }
      finalAmount = Math.max(0, finalAmount - Number(discount));
    }

    let screenshotPath: string | null = null;
    if (screenshotFile) {
      const path = `${trackingCode}/payment-proof.${ALLOWED_TYPES[screenshotFile.type]}`;
      const { error: uploadError } = await supabase.storage
        .from('payment-proofs')
        .upload(path, screenshotFile, { contentType: screenshotFile.type, upsert: true });
      if (uploadError) {
        // Non-blocking: the UTR is enough to verify the payment
        console.error('Screenshot upload error:', uploadError);
      } else {
        screenshotPath = path;
      }
    }

    // ponytail: if this update fails after redeem_coupon, one coupon use is lost. Fine at this scale; fix by hand in the dashboard.
    const { data: updatedReg, error: updateError } = await supabase
      .from('registrations')
      .update({
        payment_utr: utr,
        payment_screenshot_path: screenshotPath,
        coupon_code: couponCode,
        final_amount: finalAmount,
        status: 'PAYMENT_SUBMITTED',
      })
      .eq('id', registrationId)
      .eq('status', 'SUBMITTED') // guards against a double submit
      .select('tracking_code, status, final_amount')
      .single();

    if (updateError?.code === '23505') {
      return NextResponse.json({ success: false, error: UTR_TAKEN }, { status: 409 });
    }
    if (updateError || !updatedReg) {
      console.error('Payment update error:', updateError);
      return NextResponse.json({ success: false, error: 'Failed to record payment. Please try again.' }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      message: 'Payment details recorded. Verification will be completed within 24 hours.',
      trackingCode: updatedReg.tracking_code,
      status: updatedReg.status,
      finalAmount: Number(updatedReg.final_amount),
    });
  } catch (error) {
    console.error('Payment processing error:', error);
    return NextResponse.json({ success: false, error: 'Internal server error processing payment.' }, { status: 500 });
  }
}
