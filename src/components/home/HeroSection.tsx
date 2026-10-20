import { homeContent } from '@/lib/data/organization';
import StrokeText from '@/components/ui/StrokeText';
import SpecularButton from '@/components/ui/SpecularButton';

export default function HeroSection() {
  return (
    <section id="hero" aria-label="Apex Conclave">
      <div className="mx-auto max-w-container px-6 pb-20 pt-36 md:pt-44">
        <p className="mb-6 text-xs font-medium uppercase tracking-[0.2em] text-warm-bronze">{homeContent.eyebrow}</p>
        {/* Real text for search engines and screen readers; the drawn SVG headline is decorative */}
        <h1 className="max-w-[1000px]">
          <span className="sr-only">{homeContent.headline}</span>
          <span aria-hidden="true">
            <StrokeText
              text={homeContent.headline}
              strokeColor="#C7A16A"
              fillColor="#F4F2ED"
              fontWeight={700}
              className="[&>svg]:!h-auto"
            />
          </span>
        </h1>
        <p className="mt-8 max-w-[60ch] text-lg leading-relaxed text-muted-grey">{homeContent.summary}</p>
        <div className="mt-10">
          <SpecularButton href="/events" size="md" radius={10} trackAs="cta_hero_explore_events">
            Explore events
          </SpecularButton>
        </div>
      </div>
    </section>
  );
}
