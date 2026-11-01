import { humansTxt } from '@/lib/llmsText';

// Built once per deploy and served from the CDN
export const dynamic = 'force-static';

export function GET() {
  return new Response(humansTxt(), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
