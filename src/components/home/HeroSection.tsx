import Link from 'next/link';
import { homeContent } from '@/lib/data/organization';

export default function HeroSection() {
  return (
    <section id="hero" aria-label="Apex Conclave">
      <div className="mx-auto max-w-container px-6 pb-20 pt-36 md:pt-44">
        <p className="eyebrow mb-6">{homeContent.eyebrow}</p>
        <h1 className="max-w-[1000px] text-5xl font-medium leading-[1.05] text-cream md:text-7xl">{homeContent.headline}</h1>
        <p className="mt-8 max-w-[60ch] text-lg leading-relaxed text-cream/70">{homeContent.summary}</p>
        <div className="mt-10">
          <Link href="/events" className="btn-primary" data-track="cta_hero_explore_events">
            Explore events
          </Link>
        </div>
      </div>
    </section>
  );
}
