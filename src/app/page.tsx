import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Compass, DoorOpen, Target, Users } from 'lucide-react';
import HeroSection from '@/components/home/HeroSection';
import { FeaturedEvent } from '@/components/home/FeaturedEvent';
import { eventsData } from '@/lib/data/events';
import { homeContent, leadershipTeam, operatingStandards, partnerEnquiryHref, partnersContent } from '@/lib/data/organization';
import { CollaborationList } from '@/components/partners/CollaborationList';
import { TeamMember } from '@/components/team/TeamMember';
import { VerticalsGrid } from '@/components/verticals/VerticalsGrid';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata(
  'Apex Conclave',
  'Apex Conclave runs student competitions and events across diplomacy, business, technology, debate, startups and esports. Diplovia 2026 is its first event.',
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
      <section id="verticals" aria-labelledby="verticals-heading" className="scroll-mt-16 border-t border-soft/15">
        <div className="mx-auto max-w-container px-6 py-16 md:py-32">
          <div className="reveal mb-10 flex md:mb-14 flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="eyebrow mb-5">Our Event Verticals</p>
              <h2 id="verticals-heading" className="max-w-[18ch] text-4xl font-normal leading-[1.08] md:text-[3.25rem]">
                One brand, many kinds of competition.
              </h2>
            </div>
            <Link
              href="/verticals"
              className="hit inline-flex shrink-0 items-center gap-2 text-sm font-medium text-bright underline decoration-soft/40 underline-offset-[6px] transition-colors duration-200 hover:decoration-bright"
            >
              See all verticals <ArrowRight size={14} />
            </Link>
          </div>
          <VerticalsGrid compact />
        </div>
      </section>

      <FeaturedEvent event={featured} />

      {/* About */}
      <section aria-labelledby="about-heading" className="border-t border-soft/15">
        <div className="mx-auto grid max-w-container gap-10 px-6 md:gap-14 py-16 md:py-32 lg:grid-cols-12 lg:gap-10">
          <div className="reveal lg:col-span-6">
            <p className="eyebrow mb-5">About Apex Conclave</p>
            <h2 id="about-heading" className="max-w-[16ch] text-4xl font-normal leading-[1.08] md:text-[3.25rem]">
              {homeContent.about.headline}
            </h2>
            <p className="mt-8 max-w-[54ch] text-base leading-relaxed text-soft md:text-lg">{homeContent.about.body}</p>
            <Link
              href="/about"
              className="hit mt-10 inline-flex items-center gap-2 text-sm font-medium text-bright underline decoration-soft/40 underline-offset-[6px] transition-colors duration-200 hover:decoration-bright"
            >
              Read more about Apex Conclave <ArrowRight size={14} />
            </Link>
          </div>

          <ul className="reveal-stagger grid grid-cols-2 gap-x-6 self-end lg:col-span-5 lg:col-start-8">
            {homeContent.about.ideas.map((idea, i) => {
              const Icon = aboutIcons[i];
              return (
                <li key={idea.title} className="border-t border-soft/15 py-6 sm:pr-8 md:py-7">
                  <Icon size={20} strokeWidth={1.5} className="text-accent" aria-hidden="true" />
                  <h3 className="mt-4 text-base font-medium md:mt-5">{idea.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-soft">{idea.body}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* Team: heading and standards on the left, portraits on the right; phones show people before standards */}
      <section id="team" aria-labelledby="team-heading" className="border-t border-soft/15">
        <div className="mx-auto max-w-container px-6 py-16 md:py-32">
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
            <div className="reveal lg:col-span-4">
              <p className="eyebrow mb-5">Team</p>
              <h2 id="team-heading" className="max-w-[14ch] text-4xl font-normal leading-[1.08] md:text-[3.25rem]">
                The people behind Apex Conclave.
              </h2>
            </div>

            <div className="reveal-stagger grid gap-8 sm:grid-cols-3 sm:gap-6 lg:col-span-8 lg:row-span-2">
              {leadershipTeam.map((m) => (
                <TeamMember key={m.name} name={m.name} role={m.role} photo={m.photo} bio={m.bio} linkedin={m.linkedin} />
              ))}
            </div>

            <div className="reveal lg:col-span-4 lg:self-end">
              <h3 className="eyebrow mb-4">How we run events</h3>
              <ul className="border-t border-soft/15">
                {operatingStandards.map((s) => (
                  <li key={s.title} className="border-b border-soft/15 py-4">
                    <p className="text-sm font-medium text-bright">{s.title}</p>
                    <p className="mt-1 text-sm text-soft">{s.body}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Partnerships: last section before the footer */}
      <section aria-labelledby="partner-heading" className="border-t border-soft/15">
        <div className="mx-auto grid max-w-container gap-10 px-6 md:gap-14 py-16 md:py-32 lg:grid-cols-12 lg:gap-10">
          {/* Text after the list on large screens (About above puts text first); text still comes first on phones.
              A panel in the opposite colour. */}
          <div className="reveal-right bg-surface self-start rounded p-6 sm:p-10 lg:col-span-5 lg:col-start-8 lg:row-start-1">
            <p className="eyebrow mb-5">Partner with us</p>
            <h2 id="partner-heading" className="max-w-[14ch] text-4xl font-normal leading-[1.08] md:text-[3.25rem]">
              {partnersContent.headline}
            </h2>
            <p className="mt-8 max-w-[46ch] text-base leading-relaxed text-soft md:text-lg">{partnersContent.intro}</p>
            <div className="mt-10 flex flex-wrap items-center gap-6">
              <Link href={partnerEnquiryHref} className="btn-primary" data-track="cta_home_partner">
                Partner With Us
              </Link>
              <Link
                href="/partners"
                className="hit text-sm font-medium text-bright underline decoration-soft/40 underline-offset-[6px] transition-colors duration-200 hover:decoration-bright"
              >
                How partnerships work
              </Link>
            </div>
          </div>
          <div className="lg:col-span-7 lg:col-start-1 lg:row-start-1">
            <CollaborationList />
          </div>
        </div>
      </section>
    </main>
  );
}
