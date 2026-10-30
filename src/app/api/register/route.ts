import { NextRequest, NextResponse } from 'next/server';
import { randomBytes } from 'node:crypto';
import { RegistrationRequestSchema } from '@/lib/validators/registration';
import { getServiceClient } from '@/lib/supabase/server';
import { getClientIp, isSameOrigin, rateLimit } from '@/lib/security/rate-limit';
import { eventsData, feeAt } from '@/lib/data/events';
import { chambersData } from '@/lib/data/chambers';
import { organizationConfig } from '@/lib/data/organization';

export async function POST(req: NextRequest) {
  try {
    const ip = getClientIp(req.headers);
    const rateCheck = await rateLimit(`register:${ip}`, { windowMs: 60_000, maxRequests: 10 });
    if (!rateCheck.allowed) {
      return NextResponse.json(
        { success: false, error: 'Too many registration attempts. Please wait a moment and try again.' },
        { status: 429, headers: { 'Retry-After': String(Math.ceil((rateCheck.resetAt - Date.now()) / 1000)) } }
      );
    }

    if (!isSameOrigin(req.headers)) {
      return NextResponse.json({ success: false, error: 'Invalid request origin.' }, { status: 403 });
    }

    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ success: false, error: 'Invalid request body.' }, { status: 400 });
    }
    const parseResult = RegistrationRequestSchema.safeParse(body);
    if (!parseResult.success) {
      return NextResponse.json(
        { success: false, error: 'Validation failed', issues: parseResult.error.flatten().fieldErrors },
        { status: 400 }
      );
    }
    const data = parseResult.data;

    const event = eventsData.find((e) => e.id === data.eventId);
    const fee = event ? feeAt(event, new Date()) : null;
    if (!event || !event.registrationOpen || fee === null) {
      return NextResponse.json({ success: false, error: 'Registration for this event is not open.' }, { status: 400 });
    }

    // Each preference must be a real committee of this event and one of its portfolios
    const chambers = chambersData.filter((c) => c.eventId === event.id);
    const validChoice = (committee?: string, country?: string) =>
      !!chambers.find((c) => c.code === committee)?.portfolios.includes(country ?? '');
    const thirdGiven = !!(data.thirdChoiceCommittee || data.thirdChoiceCountry);
    if (
      !validChoice(data.firstChoiceCommittee, data.firstChoiceCountry) ||
      !validChoice(data.secondChoiceCommittee, data.secondChoiceCountry) ||
      (thirdGiven && !validChoice(data.thirdChoiceCommittee, data.thirdChoiceCountry))
    ) {
      return NextResponse.json({ success: false, error: 'Please choose a committee and country from the list.' }, { status: 400 });
    }

    // e.g. DIP-7F3A9C21
    const trackingCode = `${event.id.slice(0, 3).toUpperCase()}-${randomBytes(4).toString('hex').toUpperCase()}`;

    const supabase = getServiceClient();
    const { data: registration, error: insertError } = await supabase
      .from('registrations')
      .insert({
        tracking_code: trackingCode,
        event_id: event.id,
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
        third_choice_committee: thirdGiven ? data.thirdChoiceCommittee : null,
        third_choice_country: thirdGiven ? data.thirdChoiceCountry : null,
        experience_level: data.experienceLevel,
        prior_awards: data.priorAwards || null,
        motivation: data.motivation,
        portfolio_sample_url: data.portfolioSampleUrl || null,
        original_amount: fee,
        final_amount: fee,
        status: 'SUBMITTED',
        utm_source: data.utm_source ?? null,
        utm_medium: data.utm_medium ?? null,
        utm_campaign: data.utm_campaign ?? null,
      })
      .select('id, tracking_code, created_at')
      .single();

    if (insertError) {
      if (insertError.code === '23505') {
        const duplicateEmail = insertError.message.includes('registrations_event_email_key');
        return NextResponse.json(
          {
            success: false,
            error: duplicateEmail
              ? `This email is already registered for ${event.title}. Contact us if you need to change your application.`
              : 'Registration conflict. Please try again.',
          },
          { status: 409 }
        );
      }
      console.error('Supabase insert error:', insertError);
      return NextResponse.json({ success: false, error: `Could not save your registration. Please try again, or email ${organizationConfig.contactEmail}.` }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      registrationId: registration.id,
      trackingCode: registration.tracking_code,
      submittedAt: registration.created_at,
      fee,
      allotment: {
        committee: data.firstChoiceCommittee,
        country: data.firstChoiceCountry,
        status: 'PREFERENCE_RECORDED',
        delegateName: data.fullName,
        track: data.track,
        institution: data.institutionName,
      },
    });
  } catch (error) {
    console.error('Registration processing error:', error);
    return NextResponse.json({ success: false, error: 'Internal server error processing registration' }, { status: 500 });
  }
}
