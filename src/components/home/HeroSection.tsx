import Link from 'next/link';
import { ArrowDown, ArrowRight } from 'lucide-react';
import { homeContent, partnerEnquiryHref } from '@/lib/data/organization';
import { eventsData, formatEventDates } from '@/lib/data/events';
import { VesselDrift } from '@/components/home/VesselDrift';

// The event currently promoted: the first upcoming or live one
const current = eventsData.find((e) => e.status === 'UPCOMING' || e.status === 'LIVE');

// homeContent.headline split into deliberate lines (keep the two in sync)
const lines = [
  <>A bigger stage</>,
  <>
    for a <span className="text-accent">bolder</span>
  </>,
  <>generation.</>,
];

/**
 * Home hero: full-screen, cinematic. Drifting sculptural vessels on the Apex hero gradient behind an oversized
 * headline. Lime tints, kept few: "bolder", the vessels' rim light, the glow behind them, the next-event dot and the
 * main button's hover.
 */
export default function HeroSection() {
  return (
    <section id="hero" aria-label="Apex Conclave" className="relative isolate flex min-h-[max(100svh,40rem)] flex-col overflow-hidden bg-ground bg-hero">
      <VesselDrift />
      {/* Scrims keep the text readable over the vessels: darker at the top (navbar) and towards the bottom (text) */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_bottom,rgb(var(--c-ground)/0.85)_0%,transparent_22%,transparent_38%,rgb(var(--c-ground)/0.6)_60%,rgb(var(--c-ground)/0.95)_90%)]" />
      {/* Darker pools behind the text blocks only, so the vessels stay vivid elsewhere (contrast measured against the drift) */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_bottom,transparent_34%,rgb(var(--c-ground)/0.85)_46%,rgb(var(--c-ground)/0.85)_100%)] lg:bg-[radial-gradient(ellipse_58%_46%_at_26%_66%,rgb(var(--c-ground)/0.88),rgb(var(--c-ground)/0.7)_45%,transparent_78%),radial-gradient(ellipse_30%_32%_at_84%_74%,rgb(var(--c-ground)/0.8),transparent_72%)]" />
      <div aria-hidden="true" className="hero-grain pointer-events-none absolute inset-0 -z-10" />

      <div className="mx-auto flex w-full max-w-container flex-1 flex-col justify-end px-6 pb-10 pt-[calc(4.5rem+min(52vw,17rem))] md:pb-14 lg:pt-28">
        <p className="rise-in mb-6 text-xs font-medium uppercase tracking-[0.2em] text-soft [text-shadow:0_1px_10px_rgb(0_0_0/0.9)]">Student competitions and experiences</p>
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-6">
          {/* sr-only full sentence; visual lines rise in one after another. min(…, vw) keeps it on screen with large text */}
          <h1 className="text-[min(3.5rem,11.4vw)] font-medium leading-[0.95] text-bright sm:text-[min(5rem,11vw)] lg:col-span-8 lg:text-[min(6.5rem,7.6vw)]">
            <span className="sr-only">{homeContent.headline}</span>
            {lines.map((line, i) => (
              <span key={i} aria-hidden="true" className="rise-in block" style={{ animationDelay: `${80 + i * 90}ms` }}>
                {line}
              </span>
            ))}
          </h1>
          <div className="rise-in lg:col-span-4" style={{ animationDelay: '380ms' }}>
            <p className="max-w-[42ch] text-base leading-relaxed text-soft [text-shadow:0_1px_12px_rgb(0_0_0/0.95)]">{homeContent.summary}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/verticals"
                className="inline-flex items-center justify-center gap-2 rounded border border-bright bg-bright px-6 py-3 text-sm font-medium text-ground transition duration-200 hover:border-accent hover:bg-accent active:translate-y-px"
                data-track="cta_hero_explore"
              >
                Explore Experiences <ArrowRight size={16} aria-hidden="true" />
              </Link>
              <Link href={partnerEnquiryHref} className="btn-secondary hover:border-bright hover:text-bright" data-track="cta_hero_partner">
                Partner With Us
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-12 flex items-center justify-between gap-6 border-t border-soft/15 pt-2 md:mt-16">
          {current ? (
            <Link
              href={`/events/${current.slug}`}
              className="group inline-flex min-h-11 items-center gap-3 text-xs uppercase tracking-[0.14em] text-soft transition-colors duration-200 hover:text-bright"
              data-track="cta_hero_current_event"
            >
              {/* The hero's one lime detail */}
              <span aria-hidden="true" className="h-2 w-2 rounded-full bg-accent" />
              <span>
                Next: <span className="text-bright">{current.title}</span>
                <span className="hidden sm:inline"> · {formatEventDates(current)}</span>
              </span>
            </Link>
          ) : (
            <span />
          )}
          <a
            href="#verticals"
            className="hidden min-h-11 items-center gap-2 text-xs uppercase tracking-[0.14em] text-soft transition-colors duration-200 hover:text-bright sm:inline-flex"
          >
            Scroll <ArrowDown size={14} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
