import { NextRequest, NextResponse } from 'next/server';
import { contactSchema, type ContactFields } from '@/lib/validators/contact';
import { getServiceClient } from '@/lib/supabase/server';
import { checkRateLimit, getClientIp, isSameOrigin } from '@/lib/security/rate-limit';
import { organizationConfig } from '@/lib/data/organization';

/**
 * Email the team about a new message via Resend (free tier, plain HTTPS, no SDK).
 * Skipped when RESEND_API_KEY is not set. Never fails the request: the message is already stored.
 * Without a verified domain Resend only delivers to the account's own address, which is the team inbox here.
 */
async function notifyTeam(m: ContactFields) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return;
  const oneLine = (v: string) => v.replace(/[\r\n]+/g, ' ').slice(0, 150);
  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: process.env.RESEND_FROM || 'Apex Conclave <onboarding@resend.dev>',
        to: [organizationConfig.contactEmail],
        reply_to: m.email,
        subject: oneLine(`[Website] ${m.category}: ${m.subject}`),
        text: [
          `Name: ${m.name}`,
          `Email: ${m.email}`,
          `Phone: ${m.phone || '-'}`,
          `Institution: ${m.institution || '-'}`,
          `Topic: ${m.category}`,
          '',
          m.message,
        ].join('\n'),
      }),
    });
    if (!res.ok) console.error('Resend error:', res.status, await res.text());
  } catch (err) {
    console.error('Resend request failed:', err);
  }
}

export async function POST(req: NextRequest) {
  if (!checkRateLimit(`contact:${getClientIp(req.headers)}`, { windowMs: 60_000, maxRequests: 5 }).allowed) {
    return NextResponse.json({ error: 'Rate limit exceeded. Please try again in a minute.' }, { status: 429 });
  }
  if (!isSameOrigin(req.headers)) {
    return NextResponse.json({ error: 'Invalid request origin.' }, { status: 403 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Validation failed', issues: parsed.error.flatten().fieldErrors }, { status: 422 });
  }

  const { phone, institution, ...rest } = parsed.data;
  const { error } = await getServiceClient()
    .from('contact_messages')
    .insert({ ...rest, phone: phone || null, institution: institution || null });

  if (error) {
    console.error('Contact insert error:', error);
    return NextResponse.json({ error: 'Could not send your message. Please email us instead.' }, { status: 500 });
  }

  await notifyTeam(parsed.data);

  return NextResponse.json({ success: true }, { status: 201 });
}
