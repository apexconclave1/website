import { NextResponse } from 'next/server';

// Simple in-memory store for first draft.
// 🚩 FLAG: Replace with Prisma ContactInquiry model insert in production.

// Simple rate limiter
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 60_000;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || entry.resetAt < now) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return true;
  }
  if (entry.count >= RATE_LIMIT) return false;
  entry.count++;
  return true;
}

export async function POST(request: Request) {
  const ip = request.headers.get('x-forwarded-for') ?? 'unknown';

  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: 'Rate limit exceeded. Please try again in a minute.' },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 });
  }

  if (
    typeof body !== 'object' ||
    body === null ||
    !('name' in body) ||
    !('email' in body) ||
    !('message' in body)
  ) {
    return NextResponse.json({ error: 'Missing required fields.' }, { status: 422 });
  }

  const { name, email, message } = body as Record<string, unknown>;

  if (typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Invalid email address.' }, { status: 422 });
  }

  if (typeof message !== 'string' || message.length < 20) {
    return NextResponse.json({ error: 'Message too short.' }, { status: 422 });
  }

  // In production: await prisma.contactInquiry.create({ data: { name, email, message, ... } })
  console.log('[ContactInquiry]', { name, email, subject: (body as Record<string, unknown>).subject });

  return NextResponse.json({ success: true }, { status: 201 });
}
