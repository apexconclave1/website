import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { pageMetadata } from '@/lib/seo';
import { VerticalsGrid } from '@/components/verticals/VerticalsGrid';

export const metadata: Metadata = pageMetadata(
  'Event Verticals',
  'The kinds of student competitions Apex Conclave runs and plans: diplomacy and MUNs, business cases, hackathons, debate, startup pitching and esports.',
  '/verticals',
);

export default function VerticalsPage() {
  return (
    <main id="main-content">
      <div className="mx-auto max-w-container px-6 pb-16 pt-28 md:pb-32 md:pt-36">
        <header className="grid gap-8 pb-16 lg:grid-cols-12 lg:items-end">
          <div className="reveal lg:col-span-7">
            <p className="eyebrow mb-5">Event Verticals</p>
            <h1 className="max-w-[16ch] text-[2.625rem] font-normal leading-[1.04] tracking-[-0.01em] md:text-6xl">
              Six kinds of stage, one standard.
            </h1>
          </div>
          <p className="reveal-right max-w-[48ch] text-base leading-relaxed text-soft md:text-lg lg:col-span-5">
            Apex Conclave is built to run events across disciplines under one name. Diplomacy is running now. The others
            are planned: they are listed so you know where we are going, not because they have happened yet.
          </p>
        </header>

        <h2 className="sr-only">All verticals</h2>
        <VerticalsGrid />

        <div className="reveal mt-16 flex flex-col gap-6 border-t border-soft/15 pt-10 md:flex-row md:items-center md:justify-between">
          <p className="max-w-[52ch] text-soft">
            Want to judge, mentor, sponsor a challenge or bring one of these to your campus?
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
