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

      <FeaturedEvent event={featured} />

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

      {/* Team: heading and standards on the left, portraits on the right; phones show people before standards */}
      <section id="team" aria-labelledby="team-heading" className="mx-auto max-w-container px-6 py-24 md:py-32">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <p className="eyebrow mb-5">Team</p>
            <h2 id="team-heading" className="max-w-[14ch] text-4xl font-normal leading-[1.08] md:text-[3.25rem]">
              The people behind Apex Conclave.
            </h2>
          </div>

          <div className="grid gap-12 sm:grid-cols-3 sm:gap-6 lg:col-span-8 lg:row-span-2">
            {leadershipTeam.map((m) => (
              <TeamMember key={m.name} name={m.name} role={m.role} photo={m.photo} bio={m.bio} linkedin={m.linkedin} />
            ))}
          </div>

          <div className="lg:col-span-4 lg:self-end">
            <h3 className="eyebrow mb-4">How we run events</h3>
            <ul className="border-t border-cream/10">
              {operatingStandards.map((s) => (
                <li key={s.title} className="border-b border-cream/10 py-4">
                  <p className="text-sm font-medium text-cream">{s.title}</p>
                  <p className="mt-1 text-sm text-cream/70">{s.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Partnerships: last section before the footer */}
      <section aria-labelledby="partner-heading" className="bg-paper text-ink">
        <div className="mx-auto grid max-w-container gap-14 px-6 py-24 md:py-32 lg:grid-cols-12 lg:gap-10">
          {/* Text after the list on large screens (About above puts text first); text still comes first on phones */}
          <div className="lg:col-span-5 lg:col-start-8 lg:row-start-1">
            <p className="eyebrow mb-5 text-stone">Partner with us</p>
            <h2 id="partner-heading" className="max-w-[14ch] text-4xl font-normal leading-[1.08] md:text-[3.25rem]">
              {partnersContent.headline}
            </h2>
            <p className="mt-8 max-w-[46ch] text-lg leading-relaxed text-stone">{partnersContent.intro}</p>
            <div className="mt-10 flex flex-wrap items-center gap-6">
              <Link href={partnerEnquiryHref} className="btn-ink" data-track="cta_home_partner">
                Partner With Us
              </Link>
              <Link
                href="/partners"
                className="text-sm font-medium text-ink underline decoration-hairline underline-offset-[6px] transition-colors duration-200 hover:decoration-ink"
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
