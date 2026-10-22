import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import Link from 'next/link';
import Image from 'next/image';
import { CollaborationList } from '@/components/partners/CollaborationList';
import { organizationConfig, partnerEnquiryHref, partners, partnersContent } from '@/lib/data/organization';

export const metadata: Metadata = pageMetadata('Partners', 'Partner with Apex Conclave: sponsor an event, co-host with your college, set a competition challenge, judge or mentor, or bring events to your campus.', '/partners');

export default function PartnersPage() {
  return (
    <main id="main-content">
      {/* Intro and the five ways to work together, on paper */}
      <section className="bg-paper text-ink">
        <div className="mx-auto grid max-w-container gap-10 px-6 md:gap-14 pb-16 pt-28 md:pb-32 md:pt-36 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <p className="eyebrow mb-5 text-stone">Partners</p>
            <h1 className="max-w-[14ch] text-[2.625rem] font-normal leading-[1.04] md:text-6xl">{partnersContent.headline}</h1>
            <p className="mt-8 max-w-[46ch] text-base leading-relaxed text-stone md:text-lg">{partnersContent.intro}</p>
            <Link href={partnerEnquiryHref} className="btn-ink mt-10" data-track="cta_partners_enquire">
              Partner With Us
            </Link>
          </div>
          <div className="lg:col-span-7 lg:pt-2">
            <h2 className="sr-only">Ways to work with us</h2>
            <CollaborationList />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-container px-6 py-16 md:py-32">
        <p className="eyebrow mb-5">Why partner</p>
        <h2 className="max-w-[20ch] text-4xl font-normal leading-[1.08] md:text-5xl">What we are building for partners.</h2>
        <div className="mt-14 grid gap-10 md:grid-cols-3">
          {partnersContent.why.map((w) => (
            <div key={w.title} className="border-t border-cream/20 pt-6">
              <h3 className="text-base font-medium text-cream">{w.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-cream/70">{w.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-cream/10">
        <div className="mx-auto grid max-w-container gap-10 px-6 py-16 md:py-32 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="eyebrow mb-5">Sponsorship</p>
            <h2 className="max-w-[16ch] text-4xl font-normal leading-[1.08] md:text-5xl">What a sponsorship can include.</h2>
            <p className="mt-6 max-w-[42ch] text-cream/70">
              Every package is put together with you. Write to us and we will send the options for the event you are
              interested in.
            </p>
          </div>
          <ul className="grid content-start gap-x-10 sm:grid-cols-2 lg:col-span-7">
            {partnersContent.placements.map((p) => (
              <li key={p} className="border-b border-cream/10 py-4 text-cream">
                {p}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Shown once real partners are added to `partners` in organization.ts */}
      {partners.length > 0 && (
        <section className="mx-auto max-w-container border-t border-cream/10 px-6 py-24">
          <p className="eyebrow mb-5">Partners</p>
          <h2 className="text-4xl font-normal md:text-5xl">Who we work with.</h2>
          <ul className="mt-10 grid grid-cols-2 gap-px border border-cream/10 bg-cream/10 md:grid-cols-4">
            {partners.map((p) => (
              <li key={p.id} className="flex h-32 items-center justify-center bg-ink">
                <a href={p.websiteUrl} target="_blank" rel="noopener noreferrer" aria-label={p.name}>
                  <Image src={p.logoUrl} alt={p.name} width={160} height={64} className="h-16 w-auto object-contain" />
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="border-t border-cream/10">
        <div className="mx-auto flex max-w-container flex-col gap-6 px-6 py-16 md:flex-row md:items-center md:justify-between">
          <p className="max-w-[44ch] text-cream/70">
            Prefer email? Write to{' '}
            <a href={`mailto:${organizationConfig.contactEmail}`} className="text-cream underline underline-offset-4">
              {organizationConfig.contactEmail}
            </a>
            .
          </p>
          <Link href={partnerEnquiryHref} className="btn-primary" data-track="cta_partners_enquire_bottom">
            Partner With Us
          </Link>
        </div>
      </section>
    </main>
  );
}
