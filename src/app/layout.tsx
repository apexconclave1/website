import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import ScrollProgress from '@/components/ui/scroll-progress';
import DarkVeilWrapper from '@/components/ui/DarkVeilWrapper';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Apex Conclave',
  description:
    'Apex Conclave is an umbrella for multiple youth events. Diplovia 2026, a virtual Model United Nations, is the first.',
  keywords: ['Apex Conclave', 'Model UN', 'MUN', 'diplomacy', 'Diplovia 2026', 'debate', 'UNSC', 'UNHRC', 'Kapish Garg', 'Ayush Vishnoi'],
  authors: [
    {
      name: 'Kapish Garg',
      url: 'https://www.linkedin.com/in/kapish-garg-8335a0282/',
    },
    {
      name: 'Ayush Vishnoi',
    },
  ],
  creator: 'Kapish Garg (Co-Founder)',
  publisher: 'Apex Conclave',
  openGraph: {
    title: 'Apex Conclave',
    description: 'An umbrella for multiple youth events. Diplovia 2026 is the first.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Apex Conclave',
  },
  robots: { index: true, follow: true },
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
