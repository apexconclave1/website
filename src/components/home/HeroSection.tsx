import { homeContent } from '@/lib/data/organization';
import StrokeText from '@/components/ui/StrokeText';
import SpecularButton from '@/components/ui/SpecularButton';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <section id="hero" aria-label="Apex Conclave">
      <div className="mx-auto max-w-[1240px] px-6 pb-20 pt-36 md:pt-44">
        <p className="mb-6 text-xs font-medium uppercase tracking-[0.2em] text-warm-bronze">{homeContent.eyebrow}</p>
        <h1 className="max-w-[900px]">
          <StrokeText
            text="apex CONCLAVE"
            strokeColor="#C7A16A"
            fillColor="#F4F2ED"
            fontWeight={700}
            className="[&>svg]:!h-auto"
          />
        </h1>
        <p className="mt-8 text-2xl font-semibold text-soft-white md:text-3xl">{homeContent.headline}</p>
        <p className="mt-4 max-w-[60ch] text-lg leading-relaxed text-muted-grey">{homeContent.summary}</p>
        <div className="mt-10 flex flex-wrap items-center gap-6">
          <SpecularButton href="/events" size="md" radius={10}>
            Explore events
          </SpecularButton>
          <Link
            href="/about"
            className="inline-flex items-center rounded-[10px] border border-soft-white px-6 py-3 text-sm font-medium text-soft-white transition-opacity duration-200 hover:opacity-90"
          >
            About us
          </Link>
        </div>
      </div>
    </section>
  );
}
