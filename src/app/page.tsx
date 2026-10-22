import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import HeroSection from '@/components/home/HeroSection';
import { EventCard } from '@/components/EventCard';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { eventsData } from '@/lib/data/events';
import { homeContent, leadershipTeam, organizationConfig } from '@/lib/data/organization';
import { TeamCard } from '@/components/team/TeamCard';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata(
  'Apex Conclave',
  'Apex Conclave runs youth-led events where students think, compete, build and lead. Its first event is Diplovia 2026, a virtual Model United Nations.',
  '/',
);

export default function HomePage() {
  const featured = eventsData[0];

  return (
    <main id="main-content">
      <HeroSection />

      {/* Events under Apex Conclave */}
      <section className="mx-auto max-w-container border-t border-cream/10 px-6 py-20">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <SectionHeading eyebrow="Events" title="Events under Apex Conclave." />
          <Link href="/events" className="text-sm text-cream/70 underline underline-offset-4 hover:text-cream">
            All events
          </Link>
        </div>
        <div className="rounded border border-cream/10 bg-ink p-6 md:p-10">
          <EventCard event={featured} trackAs="cta_home_featured_event" priority />
        </div>
        <p className="mt-6 text-sm text-cream/70">{homeContent.moreEventsNote}</p>
      </section>

      {/* What Apex Conclave is */}
      <section className="mx-auto max-w-container border-t border-cream/10 px-6 py-20">
        <SectionHeading eyebrow="About" title="What Apex Conclave is." description={organizationConfig.manifesto} />
        <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
          {homeContent.pillars.map((p) => (
            <div key={p.title} className="space-y-2 rounded border border-cream/10 bg-ink p-6">
              <h3 className="text-base font-semibold text-cream">{p.title}</h3>
              <p className="text-sm leading-relaxed text-cream/70">{p.body}</p>
            </div>
          ))}
        </div>
        <Link
          href="/about"
          className="mt-8 inline-flex items-center gap-2 text-sm text-cream underline underline-offset-4"
        >
          Read more about Apex Conclave <ArrowRight size={14} />
        </Link>
      </section>

      {/* Team */}
      <section className="mx-auto max-w-container border-t border-cream/10 px-6 py-20">
        <SectionHeading eyebrow="Team" title="The people behind Apex Conclave." />
        <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
          {leadershipTeam.map((m) => (
            <TeamCard key={m.name} name={m.name} role={m.role} photo={m.photo} bio={m.bio} />
          ))}
        </div>
      </section>

      {/* Network */}
      <section className="mx-auto max-w-container border-t border-cream/10 px-6 py-20">
        <SectionHeading eyebrow="Network" title="Who it brings together." />
        <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
          {homeContent.network.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className="panel group space-y-2 transition-colors duration-200 hover:border-cream/20"
            >
              <h3 className="flex items-center justify-between text-base font-semibold text-cream">
                {n.title}
                <ArrowRight size={16} className="text-cream/70 transition-transform duration-200 group-hover:translate-x-0.5" />
              </h3>
              <p className="text-sm leading-relaxed text-cream/70">{n.body}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Attend · Partner · Collaborate */}
      <section className="mx-auto max-w-container border-t border-cream/10 px-6 py-20">
        <h2 className="text-2xl font-bold text-cream md:text-3xl">Attend. Partner. Collaborate.</h2>
        <p className="mt-2 text-cream/70">Questions? Write to {organizationConfig.contactEmail}</p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            href="/events"
            className="btn-primary"
          >
            Attend an event
          </Link>
          <Link
            href="/partners"
            className="btn-secondary"
          >
            Partner with us
          </Link>
          <Link
            href={`/contact?category=${encodeURIComponent('Host an Event')}`}
            className="btn-secondary"
          >
            Host an event with us
          </Link>
        </div>
      </section>
    </main>
  );
}
