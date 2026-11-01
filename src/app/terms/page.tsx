import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import SectionNavigator, { SectionItem } from '@/components/ui/SectionNavigator';
import { PageHeader } from '@/components/ui/PageHeader';
import ScrollProgress from '@/components/ui/scroll-progress';
import { termsSections } from '@/lib/data/terms';

export const metadata: Metadata = pageMetadata('Terms & Conditions', 'Terms for every Apex Conclave event: participant code of conduct, registration and fees, a no-refund policy, privacy notice and disputes.', '/terms');

const termsSectionsNav: SectionItem[] = [
  { id: 'code-of-conduct', label: 'Conduct' },
  { id: 'registration-terms', label: 'Registration' },
  { id: 'refund-policy', label: 'Refunds' },
  { id: 'privacy', label: 'Privacy' },
  { id: 'disputes', label: 'Disputes' },
];

export default function TermsPage() {
  return (
    <>
      <SectionNavigator sections={termsSectionsNav} position="left" />

      <main id="main-content">
        <ScrollProgress />
        <PageHeader
          eyebrow="Legal"
          title="Terms & conditions"
          aside={
            <p>
              Last updated: October 2026. These terms apply to every Apex Conclave event. By registering for an event or
              using this website, you agree to them.
            </p>
          }
        />
        <div className="mx-auto max-w-[780px] px-6 pb-16 pt-6 md:pb-24 md:pt-10">
          <div className="border-b border-soft/15">
            {termsSections.map((section) => (
              <article key={section.id} id={section.id} aria-labelledby={`${section.id}-title`} className="scroll-mt-24 border-t border-soft/15 py-10">
                <h2 id={`${section.id}-title`} className="mb-5 text-3xl font-normal text-bright">
                  {section.title}
                </h2>
                <div className="flex flex-col gap-3.5">
                  {section.content.map((para, pi) => (
                    <p key={pi} className="text-[15px] leading-relaxed text-soft">
                      {para}
                    </p>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
