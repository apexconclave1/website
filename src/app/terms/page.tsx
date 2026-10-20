import type { Metadata } from 'next';
import SectionNavigator, { SectionItem } from '@/components/ui/SectionNavigator';
import { organizationConfig } from '@/lib/data/organization';

export const metadata: Metadata = {
  title: 'Terms & Conditions | Apex Conclave',
  description: 'Apex Conclave delegate code of conduct, registration terms, refund policy, and privacy notice for conference participants.',
};

const termsSectionsNav: SectionItem[] = [
  { id: 'code-of-conduct', label: 'Conduct' },
  { id: 'registration-terms', label: 'Registration' },
  { id: 'refund-policy', label: 'Refunds' },
  { id: 'privacy', label: 'Privacy' },
  { id: 'disputes', label: 'Disputes' },
];

const sections = [
  {
    id: 'code-of-conduct',
    title: 'Delegate Code of Conduct',
    content: [
      'All delegates are expected to maintain the highest standard of academic integrity, professional decorum, and diplomatic courtesy throughout the Apex Conclave conference.',
      'Delegates must engage in all committee proceedings in good faith, refraining from personal attacks, discriminatory language, or conduct unbecoming of a diplomatic representative.',
      'Plagiarism of any kind in working papers, position papers, or speeches will result in immediate disqualification. All submitted documents must be original work.',
      'Delegates found in material breach of the Code of Conduct may be removed from committee sessions at the Executive Board\'s discretion, without refund of registration fees.',
    ],
  },
  {
    id: 'registration-terms',
    title: 'Registration & Fees',
    content: [
      'Registration is confirmed only upon receipt of full delegate fees. Submission of the registration form alone does not constitute confirmed participation.',
      'Country and committee preferences are accommodated on a best-effort, first-confirmed basis. The Secretariat reserves the right to make final allocation decisions in the interest of committee balance.',
      'Delegate information collected during registration will be used solely for conference operations and will not be shared with third parties without consent.',
    ],
  },
  {
    id: 'refund-policy',
    title: 'Refund & Cancellation Policy',
    content: [
      'Cancellations submitted more than 21 days before the conference date are eligible for a 75% refund of delegate fees paid.',
      'Cancellations submitted between 10 and 21 days before the conference date are eligible for a 50% refund.',
      'No refunds will be issued for cancellations submitted fewer than 10 days before the conference, or for delegates who do not attend without prior written notice.',
      'In the event that Apex Conclave cancels the conference for reasons beyond its control (force majeure), full refunds will be processed within 30 business days.',
    ],
  },
  {
    id: 'privacy',
    title: 'Privacy Notice',
    content: [
      'Personal information collected via registration and contact forms (name, email, phone, institution) is processed solely for the purpose of Apex Conclave event operations.',
      'We do not sell, rent, or otherwise transfer personal data to commercial third parties.',
      `Delegates may request deletion of their personal data by contacting the Secretariat at ${organizationConfig.contactEmail}. Requests will be honoured within 14 business days, subject to legal retention obligations.`,
    ],
  },
  {
    id: 'disputes',
    title: 'Disputes & Governing Law',
    content: [
      'Any disputes arising from participation in Apex Conclave events shall first be submitted to the Secretariat for internal resolution.',
      'These Terms are governed by and construed in accordance with the laws of India. Any unresolved disputes shall be subject to the jurisdiction of courts in India.',
      'Apex Conclave reserves the right to amend these Terms at any time. Continued participation after amendment constitutes acceptance of revised Terms.',
    ],
  },
];

export default function TermsPage() {
  return (
    <>
      <SectionNavigator sections={termsSectionsNav} position="left" />

      <main id="main-content" className="mx-auto max-w-[780px] px-6 pb-24 pt-32">
        <p className="eyebrow mb-3">Legal</p>
        <h1 className="mb-4 text-3xl font-bold text-soft-white md:text-4xl">Terms & conditions</h1>
        <p className="mb-12 text-sm leading-relaxed text-muted-grey">
          Last updated: September 2026. By registering as a delegate or using Apex Conclave services, you agree to these
          terms.
        </p>

        <div className="flex flex-col gap-6">
          {sections.map((section) => (
            <article key={section.id} id={section.id} aria-labelledby={`${section.id}-title`} className="panel scroll-mt-24 md:p-8">
              <h2 id={`${section.id}-title`} className="mb-5 text-xl font-semibold text-soft-white">
                {section.title}
              </h2>
              <div className="flex flex-col gap-3.5">
                {section.content.map((para, pi) => (
                  <p key={pi} className="border-l-2 border-[#2a2d2e] pl-4 text-[15px] leading-relaxed text-muted-grey">
                    {para}
                  </p>
                ))}
              </div>
            </article>
          ))}
        </div>
      </main>
    </>
  );
}
