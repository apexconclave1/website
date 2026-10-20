import type { Metadata } from 'next';
import Link from 'next/link';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { TeamCard } from '@/components/team/TeamCard';
import { communityContent, leadershipTeam, organizationConfig } from '@/lib/data/organization';

export const metadata: Metadata = {
  title: 'Community',
  description: 'The delegates, speakers, volunteers and team behind Apex Conclave events.',
};

const joinHref = `/contact?category=${encodeURIComponent('Join the Community')}`;

export default function CommunityPage() {
  const { instagram, linkedin } = organizationConfig.socials;

  return (
    <main id="main-content" className="mx-auto max-w-[1240px] px-6 pb-24 pt-32">
      <p className="eyebrow mb-3">Community</p>
      <h1 className="max-w-3xl text-4xl font-bold leading-tight text-soft-white md:text-5xl">{communityContent.headline}</h1>
      <p className="mt-6 max-w-[65ch] text-lg leading-relaxed text-muted-grey">{communityContent.intro}</p>

      <section className="mt-20 border-t border-surface pt-16">
        <SectionHeading eyebrow="Who" title="Who is part of it." />
        <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-3">
          {communityContent.groups.map((g) => (
            <div key={g.title} className="panel space-y-2">
              <h3 className="text-base font-semibold text-soft-white">{g.title}</h3>
              <p className="text-sm leading-relaxed text-muted-grey">{g.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-20 border-t border-surface pt-16">
        <SectionHeading eyebrow="Team" title="The people building it." />
        <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-3">
          {leadershipTeam.map((m) => (
            <TeamCard key={m.name} name={m.name} role={m.role} photo={m.photo} />
          ))}
        </div>
        <Link href="/about" className="mt-6 inline-block text-sm text-soft-white underline underline-offset-4">
          More about the team
        </Link>
      </section>

      <section className="mt-20 grid grid-cols-1 gap-10 border-t border-surface pt-16 md:grid-cols-2">
        <div>
          <p className="text-2xl font-bold text-soft-white md:text-3xl">Join us.</p>
          <p className="mt-3 max-w-[50ch] text-muted-grey">
            Volunteer at an event, become a campus ambassador, or chair a committee. Tell us what you want to do.
          </p>
          <Link
            href={joinHref}
            className="mt-6 inline-flex items-center rounded-[10px] bg-soft-white px-6 py-3 text-sm font-medium text-bg transition-opacity duration-200 hover:opacity-90"
          >
            Get involved
          </Link>
        </div>
        <div>
          <p className="text-2xl font-bold text-soft-white md:text-3xl">Follow along.</p>
          <p className="mt-3 text-muted-grey">Event news, dates and results are posted first on our socials.</p>
          <div className="mt-6 flex flex-wrap gap-4">
            {instagram && (
              <a href={instagram} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-2 rounded-[10px] border border-soft-white px-6 py-3 text-sm font-medium text-soft-white transition-colors duration-200 hover:bg-soft-white hover:text-bg">
                Instagram
                <span aria-hidden="true" className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">↗</span>
              </a>
            )}
            {linkedin && (
              <a href={linkedin} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-2 rounded-[10px] border border-soft-white px-6 py-3 text-sm font-medium text-soft-white transition-colors duration-200 hover:bg-soft-white hover:text-bg">
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
