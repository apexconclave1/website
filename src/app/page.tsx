import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Compass, DoorOpen, Target, Users } from 'lucide-react';
import HeroSection from '@/components/home/HeroSection';
import { EventCard } from '@/components/EventCard';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { eventsData } from '@/lib/data/events';
import { homeContent, leadershipTeam, organizationConfig } from '@/lib/data/organization';
import { TeamCard } from '@/components/team/TeamCard';
import { VerticalsGrid } from '@/components/verticals/VerticalsGrid';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata(
  'Apex Conclave',
  'Apex Conclave runs youth-led events where students think, compete, build and lead. Its first event is Diplovia 2026, a virtual Model United Nations.',
  '/',
);

// Experience, Competition, Community, Opportunity (same order as homeContent.about.ideas)
const aboutIcons = [Compass, Target, Users, DoorOpen];

export default function HomePage() {
  const featured = eventsData[0];

  return (
    <main id="main-content">
      <HeroSection />

      {/* Event verticals (compact; full version on /verticals) */}
      <section aria-labelledby="verticals-heading" className="bg-paper text-ink">
        <div className="mx-auto max-w-container px-6 py-24 md:py-32">
          <div className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="eyebrow mb-5 text-stone">Our Event Verticals</p>
              <h2 id="verticals-heading" className="max-w-[18ch] text-4xl font-normal leading-[1.08] md:text-[3.25rem]">
                One brand, many kinds of competition.
              </h2>
            </div>
            <Link
              href="/verticals"
              className="inline-flex shrink-0 items-center gap-2 text-sm font-medium text-ink underline decoration-hairline underline-offset-[6px] transition-colors duration-200 hover:decoration-ink"
            >
              See all verticals <ArrowRight size={14} />
            </Link>
          </div>
          <VerticalsGrid compact />
        </div>
      </section>

      {/* Events under Apex Conclave (the hero index rule sits above it) */}
      <section className="mx-auto max-w-container px-6 py-20">
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

      {/* About: first light section */}
      <section aria-labelledby="about-heading" className="bg-paper text-ink">
        <div className="mx-auto grid max-w-container gap-14 px-6 py-24 md:py-32 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-6">
            <p className="eyebrow mb-5 text-stone">About Apex Conclave</p>
            <h2 id="about-heading" className="max-w-[16ch] text-4xl font-normal leading-[1.08] md:text-[3.25rem]">
              {homeContent.about.headline}
            </h2>
            <p className="mt-8 max-w-[54ch] text-lg leading-relaxed text-stone">{homeContent.about.body}</p>
            <Link
              href="/about"
              className="mt-10 inline-flex items-center gap-2 text-sm font-medium text-ink underline decoration-hairline underline-offset-[6px] transition-colors duration-200 hover:decoration-ink"
            >
              Read more about Apex Conclave <ArrowRight size={14} />
            </Link>
          </div>

          <ul className="grid self-end sm:grid-cols-2 lg:col-span-5 lg:col-start-8">
            {homeContent.about.ideas.map((idea, i) => {
              const Icon = aboutIcons[i];
              return (
                <li key={idea.title} className="border-t border-hairline py-7 sm:pr-8">
                  <Icon size={20} strokeWidth={1.5} className="text-bronze" aria-hidden="true" />
                  <h3 className="mt-5 text-base font-medium">{idea.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-stone">{idea.body}</p>
                </li>
              );
            })}
          </ul>
        </div>
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
