import Link from 'next/link';
import { ArrowDown, ArrowRight } from 'lucide-react';
import { homeContent, partnerEnquiryHref } from '@/lib/data/organization';
import { VesselDrift } from '@/components/home/VesselDrift';

// The headline, in deliberate lines
const lines = [
  <>A bigger stage</>,
  <>
    for a <span className="text-accent">bolder</span>
  </>,
  <>generation.</>,
];

/**
 * Home hero: full-screen, cinematic. Drifting sculptural vessels on the Apex hero gradient behind an oversized
 * headline. Lime tints, kept few: "bolder", the vessels' rim light, the glow behind them and the main button's hover.
 */
export default function HeroSection() {
  return (
    <section id="hero" aria-label="Apex Conclave" className="relative isolate flex min-h-[max(100svh,40rem)] flex-col overflow-hidden bg-ground bg-hero">
      <VesselDrift />

      <div className="mx-auto flex w-full max-w-container flex-1 flex-col justify-end px-6 pb-10 pt-[calc(4.5rem+min(52vw,17rem))] md:pb-14 lg:pt-28">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-6">
          {/* Lines rise in one after another; the trailing space keeps words apart for search engines and screen readers.
              min(…, vw) keeps it on screen with large text */}
          <h1 className="text-[min(3.5rem,11.4vw)] font-medium leading-[0.95] text-bright sm:text-[min(5rem,11vw)] lg:col-span-8 lg:text-[min(6.5rem,7.6vw)]">
            {lines.map((line, i) => (
              <span key={i} className="rise-in block" style={{ animationDelay: `${80 + i * 90}ms` }}>
                {line}{' '}
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

        <div className="mt-12 hidden justify-end border-t border-soft/15 pt-2 sm:flex md:mt-16">
          <a
            href="#verticals"
            className="inline-flex min-h-11 items-center gap-2 text-xs uppercase tracking-[0.14em] text-soft transition-colors duration-200 hover:text-bright"
          >
            Scroll <ArrowDown size={14} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
