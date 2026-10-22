import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import Link from 'next/link';
import Image from 'next/image';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { organizationConfig, partners, partnersContent } from '@/lib/data/organization';

export const metadata: Metadata = pageMetadata('Partners', 'Partner with Apex Conclave to reach high school and college students across India through Diplovia and future youth events. Talk to the team.', '/partners');

const contactHref = `/contact?category=${encodeURIComponent('Sponsorship & Partnership')}`;

export default function PartnersPage() {
  return (
    <main id="main-content" className="mx-auto max-w-container px-6 pb-24 pt-32">
      <p className="eyebrow mb-3">Partners</p>
      <h1 className="max-w-3xl text-4xl font-bold leading-tight text-cream md:text-5xl">{partnersContent.headline}</h1>
      <p className="mt-6 max-w-[65ch] text-lg leading-relaxed text-cream/70">{partnersContent.intro}</p>

      <section className="mt-20 border-t border-cream/10 pt-16">
        <SectionHeading eyebrow="Why partner" title="Where your brand lives." />
        <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-3">
          {partnersContent.why.map((w) => (
            <div key={w.title} className="panel space-y-2">
              <h3 className="text-base font-semibold text-cream">{w.title}</h3>
              <p className="text-sm leading-relaxed text-cream/70">{w.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-20 border-t border-cream/10 pt-16">
        <SectionHeading
          eyebrow="Options"
          title="What a partnership can include."
          description="Every package is put together with you. Write to us for the partnership deck."
        />
        <ul className="mt-8 grid grid-cols-1 gap-x-10 gap-y-4 md:grid-cols-2">
          {partnersContent.placements.map((p) => (
            <li key={p} className="border-b border-cream/10 pb-4 text-base text-cream">
              {p}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-20 border-t border-cream/10 pt-16">
        <SectionHeading eyebrow="Partners" title="Who we work with." />
        {partners.length > 0 ? (
          <ul className="mt-8 grid grid-cols-2 gap-5 md:grid-cols-4">
            {partners.map((p) => (
              <li key={p.id} className="panel flex h-32 items-center justify-center">
                <a href={p.websiteUrl} target="_blank" rel="noopener noreferrer" aria-label={p.name}>
                  <Image src={p.logoUrl} alt={p.name} width={160} height={64} className="h-16 w-auto object-contain" />
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-6 text-base text-cream/70">Our first partners will be listed here.</p>
        )}
      </section>

      <section className="mt-20 flex flex-wrap items-center justify-between gap-6 border-t border-cream/10 pt-16">
        <div>
          <p className="text-2xl font-bold text-cream md:text-3xl">Let’s build something together.</p>
          <p className="mt-2 text-cream/70">
            Or write to {organizationConfig.contactEmail}. See who you’ll reach on the{' '}
            <Link href="/community" className="text-cream underline underline-offset-4">
              Community
            </Link>{' '}
            page.
          </p>
        </div>
        <Link
          href={contactHref}
          className="btn-primary"
        >
          Become a partner
        </Link>
      </section>
    </main>
  );
}
