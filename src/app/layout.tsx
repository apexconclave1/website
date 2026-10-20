import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import ScrollProgress from '@/components/ui/scroll-progress';
import DarkVeilWrapper from '@/components/ui/DarkVeilWrapper';
import BackToTop from '@/components/ui/BackToTop';
import UtmCapture from '@/components/UtmCapture';
import { Analytics } from '@vercel/analytics/next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { siteUrl } from '@/lib/site';
import { homeContent, siteCredit } from '@/lib/data/organization';
import { JsonLd } from '@/components/JsonLd';
import { organizationSchema, websiteSchema } from '@/lib/seo';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: 'Apex Conclave', template: '%s | Apex Conclave' },
  description: homeContent.summary,
  applicationName: 'Apex Conclave',
  keywords: ['Apex Conclave', 'Diplovia', 'Model UN', 'MUN', 'youth events', 'India', 'diplomacy', 'debate'],
  // Site credit lives only in metadata (not on the page)
  authors: [{ name: siteCredit.name, url: siteCredit.url }],
  publisher: 'Apex Conclave',
  creator: siteCredit.name,
  openGraph: {
    title: 'Apex Conclave',
    description: homeContent.summary,
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
      className={inter.variable}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body suppressHydrationWarning className="font-sans antialiased bg-[#080909] text-[#F4F2ED] min-h-screen relative selection:bg-[#C7A16A]/30 selection:text-[#F4F2ED]">
        <JsonLd data={organizationSchema()} />
        <JsonLd data={websiteSchema()} />
        {/* Global Scroll Progress Bar */}
        <ScrollProgress />

        {/* Shared background for the whole site */}
        <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 opacity-50 print:hidden">
          <DarkVeilWrapper speed={0.3} warpAmount={0.02} noiseIntensity={0.02} scanlineIntensity={0.03} />
        </div>

        {/* Foreground Page Content */}
        <div className="relative z-10">
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-sm focus:bg-soft-white focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-bg"
          >
            Skip to content
          </a>
          <Navbar />
          {children}
          <Footer />
          <BackToTop />
          <UtmCapture />
          <Analytics />
        </div>
      </body>
    </html>
  );
}
