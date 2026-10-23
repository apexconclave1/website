import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { TeamMember } from '@/components/team/TeamMember';
import { eventsData, formatEventDates } from '@/lib/data/events';
import {
  communityContent,
  homeContent,
  leadershipTeam,
  operatingStandards,
  organizationConfig,
  partnerEnquiryHref,
} from '@/lib/data/organization';

export const metadata: Metadata = pageMetadata('About', 'Apex Conclave creates platforms for students to compete, collaborate and grow. Meet the team, the people it brings together and how it runs its events.', '/about');

const joinHref = `/contact?category=${encodeURIComponent('Join the Community')}`;
const linkClass =
  'hit inline-flex items-center gap-2 text-sm font-medium underline underline-offset-[6px] transition-colors duration-200';

export default function AboutPage() {
  const { instagram, linkedin } = organizationConfig.socials;
  const socials = [
    { label: 'Instagram', href: instagram },
    { label: 'LinkedIn', href: linkedin },
  ].filter((s) => s.href);

  return (
    <main id="main-content">
      {/* Mission */}
      <section>
        <div className="mx-auto grid max-w-container gap-10 px-6 pb-16 pt-28 md:pb-32 md:pt-36 lg:grid-cols-12">
          <div className="reveal lg:col-span-7">
            <p className="eyebrow mb-5">About Apex Conclave</p>
            <h1 className="max-w-[16ch] text-[2.625rem] font-normal leading-[1.04] md:text-6xl">{homeContent.about.headline}</h1>
          </div>
          <div className="reveal-right lg:col-span-5 lg:pt-12">
            <p className="text-base leading-relaxed text-soft md:text-lg">{homeContent.about.body}</p>
            <ul className="mt-10 border-t border-soft/15">
              {homeContent.about.ideas.map((idea) => (
                <li key={idea.title} className="grid grid-cols-[8rem_1fr] gap-4 border-b border-soft/15 py-4 text-sm">
                  <span className="font-medium text-bright">{idea.title}</span>
                  <span className="text-soft">{idea.body}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* What we run, who it brings together, team */}
      <div className="border-t border-soft/15">
        {/* What we run */}
        <section className="mx-auto max-w-container px-6 py-16 md:py-32">
          <div className="reveal mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="eyebrow mb-5">What we run</p>
              <h2 className="max-w-[18ch] text-4xl font-normal leading-[1.08] md:text-5xl">One event live, more on the way.</h2>
            </div>
            <Link href="/verticals" className={`${linkClass} shrink-0 text-bright decoration-soft/40 hover:decoration-bright`}>
              See the event verticals <ArrowRight size={14} />
            </Link>
          </div>
          <ul className="reveal-stagger border-t border-soft/15">
            {eventsData.map((event) => (
              <li key={event.id} className="border-b border-soft/15">
                <Link
                  href={`/events/${event.slug}`}
                  className="group grid items-center gap-6 py-8 md:grid-cols-[12rem_1fr_auto] md:gap-10"
                >
                  {event.logo ? (
                    <Image src={event.logo} alt="" width={180} height={52} className="event-logo h-auto w-[160px]" />
                  ) : (
                    <span className="font-serif text-2xl">{event.title}</span>
                  )}
                  <span>
                    <span className="block text-lg text-bright">{event.title}</span>
                    <span className="mt-1 block max-w-[60ch] text-sm leading-relaxed text-soft">{event.shortDescription}</span>
                    <span className="mt-2 block text-sm text-soft">{formatEventDates(event)}</span>
                  </span>
                  <span className="inline-flex items-center gap-2 text-sm text-bright underline decoration-soft/40 underline-offset-[6px] transition-colors duration-200 group-hover:decoration-bright">
                    View event <ArrowRight size={14} />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* Who it brings together (was the Community page; /community redirects here) */}
        <section id="community" className="scroll-mt-24 border-t border-soft/15">
          <div className="mx-auto grid max-w-container gap-12 px-6 py-16 md:py-32 lg:grid-cols-12 lg:gap-10">
            <div className="reveal lg:col-span-5">
              <p className="eyebrow mb-5">Who it brings together</p>
              <h2 className="max-w-[14ch] text-4xl font-normal leading-[1.08] md:text-5xl">{communityContent.headline}</h2>
              <p className="mt-6 max-w-[46ch] text-soft">{communityContent.intro}</p>
            </div>
            <ol className="reveal-stagger lg:col-span-7">
              {communityContent.groups.map((g, i) => (
                <li key={g.title} className="grid gap-2 border-t border-soft/15 py-6 sm:grid-cols-[3rem_1fr] sm:gap-6">
                  <span className="text-sm tabular-nums text-soft">{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <h3 className="text-lg font-medium text-bright">{g.title}</h3>
                    <p className="mt-1 max-w-[56ch] text-sm leading-relaxed text-soft">{g.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Team, with booklet quotes */}
        <section id="team" className="scroll-mt-24 border-t border-soft/15">
          <div className="mx-auto max-w-container px-6 py-16 md:py-32">
            <div className="reveal">
              <p className="eyebrow mb-5">Team</p>
              <h2 className="max-w-[18ch] text-4xl font-normal leading-[1.08] md:text-5xl">The people behind Apex Conclave.</h2>
            </div>
            <div className="reveal-stagger mt-10 grid gap-10 sm:grid-cols-3 sm:gap-8 md:mt-14">
              {leadershipTeam.map((m) => (
                <TeamMember key={m.name} {...m} />
              ))}
            </div>
            <div className="mt-20 grid gap-8 lg:grid-cols-12 lg:gap-10">
              <h3 className="reveal eyebrow lg:col-span-4">How we run events</h3>
              <ul className="reveal-stagger grid gap-x-10 border-t border-soft/15 sm:grid-cols-2 lg:col-span-8">
                {operatingStandards.map((s) => (
                  <li key={s.title} className="border-b border-soft/15 py-4">
                    <p className="text-sm font-medium text-bright">{s.title}</p>
                    <p className="mt-1 text-sm text-soft">{s.body}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

      </div>

      {/* Get involved */}
      <section className="border-t border-soft/15">
        <div className="mx-auto grid max-w-container gap-10 px-6 md:gap-14 py-24 md:grid-cols-2 md:py-32">
          <div className="reveal">
            <p className="eyebrow mb-5">Get involved</p>
            <h2 className="text-4xl font-normal leading-[1.08] md:text-5xl">Join us.</h2>
            <p className="mt-6 max-w-[46ch] text-soft">
              Volunteer at an event, become a campus ambassador, or judge and chair a round. Tell us what you want to do.
            </p>
            <Link href={joinHref} className="btn-primary mt-8">
              Get involved
            </Link>
          </div>
          <div className="reveal-right">
            <p className="eyebrow mb-5">Follow along</p>
            <h2 className="text-4xl font-normal leading-[1.08] md:text-5xl">Hear it first.</h2>
            <p className="mt-6 max-w-[46ch] text-soft">
              Event news, dates and results are posted first on our socials. Representing a school, college or company?{' '}
              <Link href={partnerEnquiryHref} className="text-bright underline decoration-soft/40 underline-offset-4 hover:decoration-bright">
                Partner with us
              </Link>
              .
            </p>
            <ul className="mt-8 flex flex-wrap gap-8">
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ext-link hit text-sm font-medium text-bright underline decoration-soft/40 hover:text-bright hover:decoration-bright"
                    data-track="social_click"
                    data-track-platform={s.label.toLowerCase()}
                    data-track-place="about"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}
