import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import Link from 'next/link';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { TeamCard } from '@/components/team/TeamCard';
import { communityContent, leadershipTeam, organizationConfig } from '@/lib/data/organization';

export const metadata: Metadata = pageMetadata('Community', 'Meet the delegates, speakers, volunteers and team behind Apex Conclave events, and find out how to join the community on Instagram and LinkedIn.', '/community');

const joinHref = `/contact?category=${encodeURIComponent('Join the Community')}`;

export default function CommunityPage() {
  const { instagram, linkedin } = organizationConfig.socials;

  return (
    <main id="main-content" className="mx-auto max-w-container px-6 pb-24 pt-32">
      <p className="eyebrow mb-3">Community</p>
      <h1 className="max-w-3xl text-4xl font-bold leading-tight text-cream md:text-5xl">{communityContent.headline}</h1>
      <p className="mt-6 max-w-[65ch] text-lg leading-relaxed text-cream/70">{communityContent.intro}</p>

      <section className="mt-20 border-t border-cream/10 pt-16">
        <SectionHeading eyebrow="Who" title="Who is part of it." />
        <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-3">
          {communityContent.groups.map((g) => (
            <div key={g.title} className="panel space-y-2">
              <h3 className="text-base font-semibold text-cream">{g.title}</h3>
              <p className="text-sm leading-relaxed text-cream/70">{g.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-20 border-t border-cream/10 pt-16">
        <SectionHeading eyebrow="Team" title="The people building it." />
        <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-3">
          {leadershipTeam.map((m) => (
            <TeamCard key={m.name} name={m.name} role={m.role} photo={m.photo} bio={m.bio} />
          ))}
        </div>
        <Link href="/about" className="mt-6 inline-block text-sm text-cream underline underline-offset-4">
          More about the team
        </Link>
      </section>

      <section className="mt-20 grid grid-cols-1 gap-10 border-t border-cream/10 pt-16 md:grid-cols-2">
        <div>
          <p className="text-2xl font-bold text-cream md:text-3xl">Join us.</p>
          <p className="mt-3 max-w-[50ch] text-cream/70">
            Volunteer at an event, become a campus ambassador, or chair a committee. Tell us what you want to do.
          </p>
          <Link
            href={joinHref}
            className="mt-6 btn-primary"
          >
            Get involved
          </Link>
        </div>
        <div>
          <p className="text-2xl font-bold text-cream md:text-3xl">Follow along.</p>
          <p className="mt-3 text-cream/70">
            Event news, dates and results are posted first on our socials. Representing a school or company?{' '}
            <Link href="/partners" className="text-cream underline underline-offset-4">
              Partner with us
            </Link>
            .
          </p>
          <div className="mt-6 flex flex-wrap gap-4">
            {instagram && (
              <a href={instagram} target="_blank" rel="noopener noreferrer" data-track="social_click" data-track-platform="instagram" data-track-place="community" className="group inline-flex items-center gap-2 rounded border border-cream px-6 py-3 text-sm font-medium text-cream transition-colors duration-200 hover:bg-cream hover:text-ink">
                Instagram
                <span aria-hidden="true" className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">↗</span>
              </a>
            )}
            {linkedin && (
              <a href={linkedin} target="_blank" rel="noopener noreferrer" data-track="social_click" data-track-platform="linkedin" data-track-place="community" className="group inline-flex items-center gap-2 rounded border border-cream px-6 py-3 text-sm font-medium text-cream transition-colors duration-200 hover:bg-cream hover:text-ink">
                LinkedIn
                <span aria-hidden="true" className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">↗</span>
              </a>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
