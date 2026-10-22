import type { Metadata } from 'next';
import { Inter, Newsreader } from 'next/font/google';
import './globals.css';
import ScrollProgress from '@/components/ui/scroll-progress';
import BackToTop from '@/components/ui/BackToTop';
import UtmCapture from '@/components/UtmCapture';
import ClickTracker from '@/components/ClickTracker';
import { Analytics } from '@vercel/analytics/next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { siteUrl } from '@/lib/site';
import { organizationConfig, siteCredit } from '@/lib/data/organization';
import { JsonLd } from '@/components/JsonLd';
import { organizationSchema, websiteSchema } from '@/lib/seo';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

// Headlines (h1, h2): variable font with optical sizing
const newsreader = Newsreader({
  subsets: ['latin'],
  variable: '--font-newsreader',
  display: 'swap',
  axes: ['opsz'],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: 'Apex Conclave', template: '%s | Apex Conclave' },
  description: organizationConfig.description,
  applicationName: 'Apex Conclave',
  keywords: ['Apex Conclave', 'student competitions', 'student events', 'India', 'Diplovia', 'Model UN', 'MUN', 'debate', 'case competitions', 'hackathons'],
  // Site credit lives only in metadata (not on the page)
  authors: [{ name: siteCredit.name, url: siteCredit.url }],
  publisher: 'Apex Conclave',
  creator: siteCredit.name,
  openGraph: {
    title: 'Apex Conclave',
    description: organizationConfig.description,
    type: 'website',
    locale: 'en_IN',
    siteName: 'Apex Conclave',
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
  // Google Search Console ownership check (HTML tag method)
  ...(process.env.GOOGLE_SITE_VERIFICATION && { verification: { google: process.env.GOOGLE_SITE_VERIFICATION } }),
};


export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${newsreader.variable}`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body suppressHydrationWarning className="font-sans antialiased bg-ink text-cream min-h-screen relative selection:bg-bronze/40 selection:text-cream">
        <JsonLd data={organizationSchema()} />
        <JsonLd data={websiteSchema()} />
        {/* Global Scroll Progress Bar */}
        <ScrollProgress />

        {/* Foreground Page Content */}
        <div className="relative z-10">
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-sm focus:bg-cream focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-ink"
          >
            Skip to content
          </a>
          <Navbar />
          {children}
          <Footer />
          <BackToTop />
          <UtmCapture />
          <Analytics />
          <ClickTracker />
        </div>
      </body>
    </html>
  );
}
