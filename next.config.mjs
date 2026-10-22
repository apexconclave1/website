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
        ],
      },
    ];
  },
};

export default nextConfig;
