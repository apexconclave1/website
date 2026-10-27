import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { homeContent, partnerEnquiryHref } from '@/lib/data/organization';
import { verticals } from '@/lib/data/verticals';
import { eventsData, formatEventDates } from '@/lib/data/events';
import { HeroArt } from '@/components/home/HeroArt';

// The event currently promoted: the first upcoming or live one
const current = eventsData.find((e) => e.status === 'UPCOMING' || e.status === 'LIVE');

// homeContent.headline split into deliberate lines (keep the two in sync)
const lines = [
  <>A bigger stage</>,
  <>
    for a <span className="text-accent">bolder</span>
  </>,
  <span key="g" className="text-accent">generation.</span>,
];

export default function HeroSection() {
  return (
    <section id="hero" aria-label="Apex Conclave" className="relative isolate overflow-hidden bg-hero pt-[4.5rem]">
      <div aria-hidden="true" className="texture-grid absolute inset-0 -z-10" />

      <div className="mx-auto grid min-h-[min(calc(100svh-4.5rem-3.75rem),52rem)] max-w-container items-center gap-12 px-6 py-16 md:py-24 lg:grid-cols-12 lg:gap-6">
        <div className="lg:col-span-7">
          <p className="eyebrow rise-in mb-8">Student competitions and experiences</p>
          {/* sr-only full sentence; visual lines rise in one after another. min(…, vw) keeps it on screen with large text */}
          <h1 className="text-[min(3.5rem,11.4vw)] font-medium leading-[0.95] text-bright sm:text-[min(5rem,11vw)] lg:text-[min(6rem,7.4vw)]">
            <span className="sr-only">{homeContent.headline}</span>
            {lines.map((line, i) => (
              <span key={i} aria-hidden="true" className="rise-in block" style={{ animationDelay: `${80 + i * 90}ms` }}>
                {line}
              </span>
            ))}
          </h1>
          <p className="rise-in mt-10 max-w-[48ch] text-base leading-relaxed text-soft md:text-lg" style={{ animationDelay: '360ms' }}>
            {homeContent.summary}
          </p>
          <div className="rise-in mt-10 flex flex-wrap gap-3" style={{ animationDelay: '440ms' }}>
            <Link href="/verticals" className="btn-primary" data-track="cta_hero_explore">
              Explore Experiences <ArrowRight size={16} aria-hidden="true" />
            </Link>
            <Link href={partnerEnquiryHref} className="btn-secondary" data-track="cta_hero_partner">
              Partner With Us
            </Link>
          </div>
        </div>

        <HeroArt className="mx-auto w-full max-w-[22rem] sm:max-w-[28rem] lg:col-span-5 lg:max-w-none" />
      </div>

      {/* Disciplines index: every vertical with its status, links to its row on /verticals; then the next event */}
      <div className="border-t border-soft/15">
        <div className="mx-auto flex max-w-container flex-col gap-2 px-6 py-2 lg:flex-row lg:items-center lg:justify-between">
          <nav aria-label="Event verticals">
            <ul className="grid grid-cols-2 gap-x-6 min-[420px]:grid-cols-3 sm:flex sm:flex-wrap sm:gap-x-8">
              {verticals.map((v) => (
                <li key={v.id}>
                  <Link
                    href={`/verticals#${v.id}`}
                    className="inline-flex min-h-11 items-center gap-2 text-sm text-soft transition-colors duration-200 hover:text-bright"
                  >
                    <span
                      aria-hidden="true"
                      className={`h-1.5 w-1.5 rounded-full ${v.status === 'active' ? 'bg-accent' : 'border border-soft/50'}`}
                    />
                    {v.short}
                    <span className="sr-only">({v.status})</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          {current && (
            <Link
              href={`/events/${current.slug}`}
              className="group inline-flex min-h-11 items-center gap-3 text-sm text-soft transition-colors duration-200 hover:text-bright"
              data-track="cta_hero_current_event"
            >
              <span className="eyebrow">Next</span>
              <span>
                <span className="text-bright">{current.title}</span> · {formatEventDates(current)}
              </span>
              <ArrowRight size={14} aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
