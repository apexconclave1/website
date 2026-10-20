// Public site URL for metadata, sitemap and robots.
// NEXT_PUBLIC_SITE_URL once the domain exists; until then the Vercel production URL, then localhost.
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL && `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`) ||
  'http://localhost:3000'
).replace(/\/$/, '');
