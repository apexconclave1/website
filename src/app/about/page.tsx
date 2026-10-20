import type { Metadata } from 'next';
import Link from 'next/link';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { eventsData } from '@/lib/data/events';
import { leadershipTeam, organizationConfig } from '@/lib/data/organization';

export const metadata: Metadata = {
  title: 'About | Apex Conclave',
  description: organizationConfig.manifesto,
};

export default function AboutPage() {
  return (
    <main id="main-content" className="mx-auto max-w-[1240px] px-6 pb-24 pt-32">
      <p className="mb-3 text-xs font-medium uppercase tracking-[0.18em] text-warm-bronze">About</p>
      <h1 className="max-w-3xl text-4xl font-bold leading-tight text-soft-white md:text-5xl">
        {organizationConfig.tagline}
      </h1>
      <p className="mt-6 max-w-[65ch] text-lg leading-relaxed text-muted-grey">{organizationConfig.manifesto}</p>

      <section className="mt-20 border-t border-surface pt-16">
        <SectionHeading eyebrow="Events" title="What we run." />
        <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2">
          {eventsData.map((event) => (
            <Link
              key={event.id}
              href={`/events/${event.slug}`}
              className="space-y-2 rounded-[10px] border border-[#1a1d1e] bg-surface p-6 transition-colors duration-200 hover:border-[#2a2d2e]"
            >
              <div className="text-lg font-bold text-soft-white">{event.title}</div>
              <p className="text-sm leading-relaxed text-muted-grey">{event.shortDescription}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-20 border-t border-surface pt-16">
        <SectionHeading eyebrow="Leadership" title="The team." />
        <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-3">
          {leadershipTeam.map((m) => (
            <figure key={m.name} className="space-y-4 rounded-[10px] border border-[#1a1d1e] bg-surface p-6">
              <figcaption>
                <div className="text-base font-semibold text-soft-white">{m.name}</div>
                <div className="text-xs font-medium uppercase tracking-wider text-warm-bronze">{m.role}</div>
              </figcaption>
              <blockquote className="text-sm leading-relaxed text-muted-grey">{m.quote}</blockquote>
            </figure>
          ))}
        </div>
      </section>

      <section className="mt-20 flex flex-wrap items-center justify-between gap-6 border-t border-surface pt-16">
        <p className="text-xl font-bold text-soft-white">Partner with us or host an event.</p>
        <Link
          href="/contact"
          className="inline-flex items-center rounded-[10px] bg-soft-white px-6 py-3 text-sm font-medium text-bg transition-opacity duration-200 hover:opacity-90"
        >
          Contact us
        </Link>
      </section>
    </main>
  );
}
