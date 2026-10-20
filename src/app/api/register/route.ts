import { NextRequest, NextResponse } from 'next/server';
import { FullRegistrationSchema, REGISTRATION_FEE } from '@/lib/validators/registration';
import { getServiceClient } from '@/lib/supabase/server';
import { checkRateLimit, getClientIp } from '@/lib/security/rate-limit';

export async function POST(req: NextRequest) {
  try {
    // Rate limiting: 10 registration attempts per minute per IP
    const ip = getClientIp(req.headers);
    const rateCheck = checkRateLimit(`register:${ip}`, {
      windowMs: 60_000,
      maxRequests: 10,
    });

    if (!rateCheck.allowed) {
      return NextResponse.json(
        {
          success: false,
          error: 'Too many registration attempts. Please wait a moment and try again.',
        },
        {
          status: 429,
          headers: {
            'Retry-After': String(Math.ceil((rateCheck.resetAt - Date.now()) / 1000)),
          },
        }
      );
    }

    // Origin verification (basic CSRF protection)
    const origin = req.headers.get('origin');
    const host = req.headers.get('host');
    if (origin && host && !origin.includes(host)) {
      return NextResponse.json(
        { success: false, error: 'Invalid request origin.' },
        { status: 403 }
      );
    }

    const body = await req.json();

    const parseResult = FullRegistrationSchema.safeParse(body);
    if (!parseResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: 'Validation failed',
          issues: parseResult.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const data = parseResult.data;
    const supabase = getServiceClient();

    // Generate unique DIPLOVIA tracking code
    // Format: DIP-REG-2026-XXXX (sequential, collision-resistant)
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const timestamp = Date.now().toString(36).slice(-4).toUpperCase();
    const trackingCode = `DIP-REG-2026-${timestamp}${randomSuffix}`;

    // Insert registration into Supabase
    const { data: registration, error: insertError } = await supabase
      .from('registrations')
      .insert({
        tracking_code: trackingCode,
        full_name: data.fullName,
        email: data.email,
        phone: data.phone,
        track: data.track,
        institution_name: data.institutionName,
        delegation_type: data.delegationType,
        partner_name: data.partnerName || null,
        city: data.city,
        country: data.country,
        first_choice_committee: data.firstChoiceCommittee,
        first_choice_country: data.firstChoiceCountry,
        second_choice_committee: data.secondChoiceCommittee,
        second_choice_country: data.secondChoiceCountry,
        third_choice_committee: data.thirdChoiceCommittee || null,
        third_choice_country: data.thirdChoiceCountry || null,
        experience_level: data.experienceLevel,
        prior_awards: data.priorAwards || null,
        motivation: data.motivation,
        portfolio_sample_url: data.portfolioSampleUrl || null,
        original_amount: REGISTRATION_FEE.STANDARD,
        final_amount: REGISTRATION_FEE.STANDARD,
        status: 'SUBMITTED',
      })
      .select('id, tracking_code, created_at')
      .single();

    if (insertError) {
      console.error('Supabase insert error:', insertError);

      // Handle unique constraint violation (duplicate tracking code)
      if (insertError.code === '23505') {
        return NextResponse.json(
          { success: false, error: 'Registration conflict. Please try again.' },
          { status: 409 }
        );
      }

      return NextResponse.json(
        { success: false, error: 'Failed to process registration. Please try again.' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Registration dossier successfully recorded with the Secretariat.',
      registrationId: registration.id,
      trackingCode: registration.tracking_code,
      submittedAt: registration.created_at,
      standardFee: REGISTRATION_FEE.STANDARD,
      allotment: {
        committee: data.firstChoiceCommittee,
        country: data.firstChoiceCountry,
        status: 'PROVISIONAL_RESERVED',
        delegateName: data.fullName,
        track: data.track,
        institution: data.institutionName,
      },
    });
  } catch (error) {
    console.error('Registration processing error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error processing registration' },
      { status: 500 }
    );
  }
}
