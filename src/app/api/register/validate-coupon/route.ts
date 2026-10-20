import { NextRequest, NextResponse } from 'next/server';
import { CouponSchema } from '@/lib/validators/registration';
import { getServiceClient } from '@/lib/supabase/server';
import { checkRateLimit, getClientIp } from '@/lib/security/rate-limit';

export async function POST(req: NextRequest) {
  try {
    // Rate limiting: 20 coupon validation attempts per minute per IP
    const ip = getClientIp(req.headers);
    const rateCheck = checkRateLimit(`coupon:${ip}`, {
      windowMs: 60_000,
      maxRequests: 20,
    });

    if (!rateCheck.allowed) {
      return NextResponse.json(
        { success: false, error: 'Too many attempts. Please wait.' },
        { status: 429 }
      );
    }

    const body = await req.json();
    const parseResult = CouponSchema.safeParse(body);

    if (!parseResult.success) {
      return NextResponse.json(
        { success: false, error: 'Invalid coupon code format.' },
        { status: 400 }
      );
    }

    const { couponCode } = parseResult.data;
    const supabase = getServiceClient();

    // Fetch coupon from database
    const { data: coupon, error: fetchError } = await supabase
      .from('coupons')
      .select('id, code, discount_amount, max_redemptions, current_redemptions, is_active')
      .eq('code', couponCode)
      .eq('is_active', true)
      .single();

    if (fetchError || !coupon) {
      return NextResponse.json(
        { success: false, error: 'Invalid or expired coupon code.' },
        { status: 404 }
      );
    }

    // Check if coupon has reached max redemptions
    if (
      coupon.max_redemptions !== null &&
      coupon.current_redemptions >= coupon.max_redemptions
    ) {
      return NextResponse.json(
        { success: false, error: 'This coupon has reached its maximum usage limit.' },
        { status: 410 }
      );
    }

    return NextResponse.json({
      success: true,
      couponCode: coupon.code,
      discountAmount: coupon.discount_amount,
      remainingUses: coupon.max_redemptions !== null
        ? coupon.max_redemptions - coupon.current_redemptions
        : null,
    });
  } catch (error) {
    console.error('Coupon validation error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to validate coupon.' },
      { status: 500 }
    );
  }
}
