import { NextRequest, NextResponse } from 'next/server';
import { PaymentSchema } from '@/lib/validators/registration';
import { getServiceClient } from '@/lib/supabase/server';
import { checkRateLimit, getClientIp } from '@/lib/security/rate-limit';

export async function POST(req: NextRequest) {
  try {
    // Rate limiting: 10 payment submissions per minute per IP
    const ip = getClientIp(req.headers);
    const rateCheck = checkRateLimit(`payment:${ip}`, {
      windowMs: 60_000,
      maxRequests: 10,
    });

    if (!rateCheck.allowed) {
      return NextResponse.json(
        { success: false, error: 'Too many attempts. Please wait.' },
        { status: 429 }
      );
    }

    const formData = await req.formData();
    const registrationId = formData.get('registrationId') as string;
    const trackingCode = formData.get('trackingCode') as string;
    const paymentUtr = formData.get('paymentUtr') as string;
    const couponCode = (formData.get('couponCode') as string) || null;
    const finalAmount = parseFloat(formData.get('finalAmount') as string);
    const screenshotFile = formData.get('screenshot') as File | null;

    if (!registrationId || !trackingCode) {
      return NextResponse.json(
        { success: false, error: 'Missing registration reference.' },
        { status: 400 }
      );
    }

    // Validate UTR
    const utrResult = PaymentSchema.safeParse({ paymentUtr });
    if (!utrResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid transaction reference.',
          issues: utrResult.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const supabase = getServiceClient();

    // Verify registration exists and is in correct status
    const { data: existingReg, error: fetchError } = await supabase
      .from('registrations')
      .select('id, status')
      .eq('id', registrationId)
      .eq('tracking_code', trackingCode)
      .single();

    if (fetchError || !existingReg) {
      return NextResponse.json(
        { success: false, error: 'Registration not found.' },
        { status: 404 }
      );
    }

    if (existingReg.status !== 'SUBMITTED') {
      return NextResponse.json(
        { success: false, error: 'Payment has already been submitted for this registration.' },
        { status: 409 }
      );
    }

    // Handle screenshot upload to Supabase Storage
    let screenshotPath: string | null = null;
    if (screenshotFile) {
      // Validate file type and size
      const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
      if (!allowedTypes.includes(screenshotFile.type)) {
        return NextResponse.json(
          { success: false, error: 'Screenshot must be a JPEG, PNG, or WebP image.' },
          { status: 400 }
        );
      }

      const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
      if (screenshotFile.size > MAX_FILE_SIZE) {
        return NextResponse.json(
          { success: false, error: 'Screenshot must be under 5MB.' },
          { status: 400 }
        );
      }

      // Sanitize filename
      const ext = screenshotFile.name.split('.').pop()?.toLowerCase() ?? 'jpg';
      const safeName = `${trackingCode}/payment-proof.${ext}`;

      const { error: uploadError } = await supabase.storage
        .from('payment-proofs')
        .upload(safeName, screenshotFile, {
          contentType: screenshotFile.type,
          upsert: true,
        });

      if (uploadError) {
        console.error('Screenshot upload error:', uploadError);
        // Non-blocking: proceed without screenshot
      } else {
        screenshotPath = safeName;
      }
    }

    // If coupon was applied, atomically increment coupon usage
    if (couponCode) {
      const { error: couponUpdateError } = await supabase.rpc('increment_coupon_usage', {
        coupon_code_param: couponCode,
      });

      // If coupon increment fails, still proceed (coupon was validated earlier)
      if (couponUpdateError) {
        console.error('Coupon increment error (non-blocking):', couponUpdateError);
      }
    }

    // Update registration with payment details
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
      .eq('status', 'SUBMITTED') // Concurrent guard condition
      .select('id, tracking_code, status, final_amount')
      .single();

    if (updateError || !updatedReg) {
      console.error('Payment update error:', updateError);
      return NextResponse.json(
        { success: false, error: 'Failed to record payment. Please try again.' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Payment details recorded. Verification will be completed within 24 hours.',
      trackingCode: updatedReg.tracking_code,
      status: updatedReg.status,
      finalAmount: updatedReg.final_amount,
    });
  } catch (error) {
    console.error('Payment processing error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error processing payment.' },
      { status: 500 }
    );
  }
}
