import { NextRequest, NextResponse } from 'next/server';
import { contactSchema } from '@/lib/validators/contact';
import { getServiceClient } from '@/lib/supabase/server';
import { checkRateLimit, getClientIp, isSameOrigin } from '@/lib/security/rate-limit';

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

  return NextResponse.json({ success: true }, { status: 201 });
}
