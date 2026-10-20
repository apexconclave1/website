/**
 * Simple in-memory sliding-window rate limiter.
 * ponytail: memory is per server instance, so on Vercel it only slows bursts that hit one warm instance.
 * Move to a shared store (Upstash Redis or a Supabase table) if abuse shows up.
 */

interface RateLimitEntry {
  timestamps: number[];
}

const store = new Map<string, RateLimitEntry>();

// Cleanup stale entries every 5 minutes to prevent memory leak
const CLEANUP_INTERVAL = 5 * 60 * 1000;
let lastCleanup = Date.now();

function cleanup(windowMs: number) {
  const now = Date.now();
  if (now - lastCleanup < CLEANUP_INTERVAL) return;
  lastCleanup = now;

  const cutoff = now - windowMs;
  for (const [key, entry] of store) {
    entry.timestamps = entry.timestamps.filter((t) => t > cutoff);
    if (entry.timestamps.length === 0) {
      store.delete(key);
    }
  }
}

interface RateLimitOptions {
  /** Time window in milliseconds (default: 60_000 = 1 minute) */
  windowMs?: number;
  /** Maximum requests per window (default: 10) */
  maxRequests?: number;
}

interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetAt: number;
}

export function checkRateLimit(
  identifier: string,
  options: RateLimitOptions = {}
): RateLimitResult {
  const { windowMs = 60_000, maxRequests = 10 } = options;
  const now = Date.now();

  cleanup(windowMs);

  const entry = store.get(identifier) ?? { timestamps: [] };
  const cutoff = now - windowMs;

  // Remove expired timestamps
  entry.timestamps = entry.timestamps.filter((t) => t > cutoff);

  if (entry.timestamps.length >= maxRequests) {
    const resetAt = entry.timestamps[0] + windowMs;
    return {
      allowed: false,
      remaining: 0,
      resetAt,
    };
  }

  // Record this request
  entry.timestamps.push(now);
  store.set(identifier, entry);

  return {
    allowed: true,
    remaining: maxRequests - entry.timestamps.length,
    resetAt: now + windowMs,
  };
}

/**
 * Extract client IP from request headers (respects X-Forwarded-For for proxied deployments).
 */
export function getClientIp(headers: Headers): string {
  return (
    headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    headers.get('x-real-ip') ??
    'unknown'
  );
}

/**
 * Basic CSRF guard: a browser POST must come from this site's own host.
 * Requests without an Origin header (curl, server-to-server) pass; they cannot carry a victim's cookies anyway.
 */
export function isSameOrigin(headers: Headers): boolean {
  const origin = headers.get('origin');
  const host = headers.get('x-forwarded-host') ?? headers.get('host');
  if (!origin || !host) return true;
  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}
