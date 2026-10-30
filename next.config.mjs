// Content-Security-Policy (added after the live security test, 2026-10-30). Next.js inlines its startup scripts, so
// inline scripts stay allowed (nonces would make every page dynamic); scripts from other sites, framing, <base>,
// plugins and off-site form posts are blocked. Dev needs eval for fast refresh. Vercel Analytics is same-origin.
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${process.env.NODE_ENV === 'development' ? " 'unsafe-eval'" : ''}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self' data:",
  "connect-src 'self'",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
].join('; ');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Lets a check build run next to `npm run dev`: NEXT_DIST_DIR=.next-build npm run build
  distDir: process.env.NEXT_DIST_DIR || '.next',
  async redirects() {
    return [
      { source: '/committees', destination: '/events/diplovia-2026#committees', permanent: true },
      // Community was merged into About (redesign, 2026-10-22)
      { source: '/community', destination: '/about#community', permanent: true },
    ];
  },
  // All images are local (public/). Add remotePatterns here if a remote image is ever needed.
  // AVIF first (smaller), WebP for browsers without AVIF.
  images: { formats: ['image/avif', 'image/webp'] },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          { key: 'Content-Security-Policy', value: csp },
        ],
      },
    ];
  },
};

export default nextConfig;
