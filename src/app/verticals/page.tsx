import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { pageMetadata } from '@/lib/seo';
import { VerticalsGrid } from '@/components/verticals/VerticalsGrid';

export const metadata: Metadata = pageMetadata(
  'Event Verticals',
  'The student competitions Apex Conclave runs: diplomacy and Model UN with Diplovia 2026, a virtual MUN in November 2026. New formats are coming soon.',
  '/verticals',
);

export default function VerticalsPage() {
  return (
    <main id="main-content">
      <div className="mx-auto max-w-container px-6 pb-16 pt-28 md:pb-32 md:pt-36">
        <header className="grid gap-8 pb-16 lg:grid-cols-12 lg:items-end">
          <div className="reveal lg:col-span-7">
            <p className="eyebrow mb-5">Event Verticals</p>
            <h1 className="max-w-[16ch] text-[2.625rem] font-normal leading-[1.04] md:text-6xl">
              One stage live. More on the way.
            </h1>
          </div>
          <p className="reveal-right max-w-[48ch] text-base leading-relaxed text-soft md:text-lg lg:col-span-5">
            Apex Conclave runs student competitions and experiences under one name. Diplomacy is live with Diplovia 2026.
            New formats are being built and will be announced here first.
          </p>
        </header>

        <h2 className="sr-only">All verticals</h2>
        <VerticalsGrid />

        <div className="reveal mt-16 flex flex-col gap-6 border-t border-soft/15 pt-10 md:flex-row md:items-center md:justify-between">
          <p className="max-w-[52ch] text-soft">
            Want to judge, mentor, sponsor a challenge or bring an Apex Conclave event to your campus?
          </p>
          <Link
            href={`/contact?category=${encodeURIComponent('Host an Event')}`}
            className="hit inline-flex items-center gap-2 text-sm font-medium text-bright underline decoration-soft/40 underline-offset-[6px] transition-colors duration-200 hover:decoration-bright"
          >
            Talk to the team <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </main>
  );
}
