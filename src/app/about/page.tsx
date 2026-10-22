import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import Link from 'next/link';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { TeamCard } from '@/components/team/TeamCard';
import { eventsData } from '@/lib/data/events';
import { leadershipTeam, organizationConfig } from '@/lib/data/organization';

export const metadata: Metadata = pageMetadata('About', 'Apex Conclave is a youth-led events ecosystem: conferences, simulations and competitions where students practise diplomacy, enterprise and leadership.', '/about');

export default function AboutPage() {
  return (
    <main id="main-content" className="mx-auto max-w-container px-6 pb-24 pt-32">
      <p className="mb-3 text-xs font-medium uppercase tracking-[0.18em] text-bronze">About</p>
      <h1 className="max-w-3xl text-4xl font-bold leading-tight text-cream md:text-5xl">
        {organizationConfig.tagline}
      </h1>
      <p className="mt-6 max-w-[65ch] text-lg leading-relaxed text-cream/70">{organizationConfig.manifesto}</p>

      <section className="mt-20 border-t border-cream/10 pt-16">
        <SectionHeading eyebrow="Events" title="What we run." />
        <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2">
          {eventsData.map((event) => (
            <Link
              key={event.id}
              href={`/events/${event.slug}`}
              className="space-y-2 rounded border border-cream/10 bg-ink p-6 transition-colors duration-200 hover:border-cream/20"
            >
              <div className="text-lg font-bold text-cream">{event.title}</div>
              <p className="text-sm leading-relaxed text-cream/70">{event.shortDescription}</p>
            </Link>
          ))}
        </div>
      </section>

      <section id="team" className="mt-20 scroll-mt-24 border-t border-cream/10 pt-16">
        <SectionHeading eyebrow="Leadership" title="The team." />
        <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-3">
          {leadershipTeam.map((m) => (
            <TeamCard key={m.name} name={m.name} role={m.role} photo={m.photo} bio={m.bio} quote={m.quote} />
          ))}
        </div>
      </section>

      <section className="mt-20 flex flex-wrap items-center justify-between gap-6 border-t border-cream/10 pt-16">
        <div>
          <p className="text-xl font-bold text-cream">Partner with us or host an event.</p>
          <p className="mt-2 text-sm text-cream/70">
            See our{' '}
            <Link href="/partners" className="text-cream underline underline-offset-4">
              partnership options
            </Link>{' '}
            or meet the{' '}
            <Link href="/community" className="text-cream underline underline-offset-4">
              community
            </Link>
            .
          </p>
        </div>
        <Link
          href="/contact"
          className="btn-primary"
        >
          Contact us
        </Link>
      </section>
    </main>
  );
}
