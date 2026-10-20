import { NextRequest, NextResponse } from 'next/server';
import { CouponSchema, PaymentSchema } from '@/lib/validators/registration';
import { getServiceClient } from '@/lib/supabase/server';
import { checkRateLimit, getClientIp, isSameOrigin } from '@/lib/security/rate-limit';

const ALLOWED_TYPES: Record<string, string> = { 'image/jpeg': 'jpg', 'image/png': 'png', 'image/webp': 'webp' };
const MAX_FILE_SIZE = 5 * 1024 * 1024;

export async function POST(req: NextRequest) {
  try {
    const ip = getClientIp(req.headers);
    if (!checkRateLimit(`payment:${ip}`, { windowMs: 60_000, maxRequests: 10 }).allowed) {
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
    }

    const supabase = getServiceClient();

    // The amount comes from the database row the server wrote, never from the browser
    const { data: existingReg, error: fetchError } = await supabase
      .from('registrations')
      .select('id, status, original_amount')
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

    let finalAmount = Number(existingReg.original_amount);
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
        payment_utr: utrResult.data.paymentUtr,
        payment_screenshot_path: screenshotPath,
        coupon_code: couponCode,
        final_amount: finalAmount,
        status: 'PAYMENT_SUBMITTED',
      })
      .eq('id', registrationId)
      .eq('status', 'SUBMITTED') // guards against a double submit
      .select('tracking_code, status, final_amount')
      .single();

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
