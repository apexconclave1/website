import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import ScrollProgress from '@/components/ui/scroll-progress';
import DarkVeilWrapper from '@/components/ui/DarkVeilWrapper';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { siteUrl } from '@/lib/site';
import { homeContent, organizationConfig } from '@/lib/data/organization';

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
  authors: [{ name: 'Apex Conclave' }],
  publisher: 'Apex Conclave',
  openGraph: {
    title: 'Apex Conclave',
    description: homeContent.summary,
    type: 'website',
    locale: 'en_IN',
    siteName: 'Apex Conclave',
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
};

// Organisation details for search engines
const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: organizationConfig.name,
  url: siteUrl,
  logo: `${siteUrl}/brand/apex-conclave-logo-dark.png`,
  email: organizationConfig.contactEmail,
  sameAs: Object.values(organizationConfig.socials).filter(Boolean),
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        {/* Global Scroll Progress Bar */}
        <ScrollProgress />

        {/* Shared background for the whole site */}
        <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 opacity-50">
          <DarkVeilWrapper speed={0.3} warpAmount={0.02} noiseIntensity={0.02} scanlineIntensity={0.03} />
        </div>

        {/* Foreground Page Content */}
        <div className="relative z-10">
          <Navbar />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
