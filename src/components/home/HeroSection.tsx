import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { homeContent, partnerEnquiryHref } from '@/lib/data/organization';
import { verticals } from '@/lib/data/verticals';
import { eventsData, formatEventDates } from '@/lib/data/events';
import { TypedText } from '@/components/home/TypedText';

// The event currently promoted: the first upcoming or live one
const current = eventsData.find((e) => e.status === 'UPCOMING' || e.status === 'LIVE');

export default function HeroSection() {
  return (
    <section id="hero" aria-label="Apex Conclave" className="flex min-h-[min(100svh,60rem)] flex-col pt-[4.5rem]">
      <div className="mx-auto flex w-full max-w-container flex-1 flex-col justify-center px-6 py-20">
        <h1 className="max-w-[14ch] text-[3.25rem] font-normal leading-[0.98] tracking-[-0.02em] text-bright sm:text-7xl lg:text-[6.5rem]">
          {homeContent.headline.replace(homeContent.headlineHighlight, '')}
          <TypedText text={homeContent.headlineHighlight} className="text-accent" />
        </h1>
        <p className="mt-10 max-w-[52ch] text-lg leading-relaxed text-soft">{homeContent.summary}</p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link href="/events" className="btn-primary" data-track="cta_hero_explore_events">
            Explore Events
          </Link>
          <Link href={partnerEnquiryHref} className="btn-secondary" data-track="cta_hero_partner">
            Partner With Us
          </Link>
        </div>
      </div>

      {/* Disciplines index: every vertical, planned ones included, links to its row on /verticals */}
      <div className="border-t border-soft/15">
        <div className="mx-auto flex max-w-container flex-col gap-6 px-6 py-6 lg:flex-row lg:items-center lg:justify-between">
          <nav aria-label="Event verticals">
            <ul className="grid grid-cols-3 gap-x-6 gap-y-3 sm:flex sm:flex-wrap sm:gap-x-8">
              {verticals.map((v) => (
                <li key={v.id}>
                  <Link
                    href={`/verticals#${v.id}`}
                    className="text-sm text-soft transition-colors duration-200 hover:text-bright"
                  >
                    {v.short}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          {current && (
            <Link
              href={`/events/${current.slug}`}
              className="group inline-flex items-center gap-3 text-sm text-soft transition-colors duration-200 hover:text-bright"
              data-track="cta_hero_current_event"
            >
              <span className="eyebrow">Now</span>
              <span>
                <span className="text-bright">{current.title}</span> · {formatEventDates(current)}
              </span>
              <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
