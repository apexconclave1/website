import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import SectionNavigator, { SectionItem } from '@/components/ui/SectionNavigator';
import { PageHeader } from '@/components/ui/PageHeader';
import ScrollProgress from '@/components/ui/scroll-progress';
import { organizationConfig } from '@/lib/data/organization';

export const metadata: Metadata = pageMetadata('Terms & Conditions', 'Terms for every Apex Conclave event: participant code of conduct, registration and fees, a no-refund policy, privacy notice and disputes.', '/terms');

const termsSectionsNav: SectionItem[] = [
  { id: 'code-of-conduct', label: 'Conduct' },
  { id: 'registration-terms', label: 'Registration' },
  { id: 'refund-policy', label: 'Refunds' },
  { id: 'privacy', label: 'Privacy' },
  { id: 'disputes', label: 'Disputes' },
];

// Owner-approved rewrite for all Apex Conclave events (2026-10-22): format lines, guardian consent, organising team as
// the deciding body. Refunds (owner, 2026-10-29): none in any case, except a full refund if Apex Conclave cancels the event.
const sections = [
  {
    id: 'code-of-conduct',
    title: 'Participant Code of Conduct',
    content: [
      'Everyone taking part in an Apex Conclave event, whether as a participant, judge, mentor, chair, volunteer or guest, is expected to act with honesty, respect and fairness towards other participants, organisers and partners.',
      'Personal attacks, harassment, discriminatory language and disruptive behaviour are not allowed, online or in person.',
      'All submitted work must be your own or your team’s. Plagiarism, undeclared use of other people’s work and any attempt to gain an unfair advantage will lead to disqualification.',
      'Format-specific rules also apply. Model UN: position papers, speeches and resolutions must be original. Other formats publish their own rules on their event page.',
      'Each event page may add its own rules. The organising team of the event may remove a participant who seriously breaks this code or the event rules, without refund of fees. Decisions on results are made by the event’s organising team and judging panel.',
    ],
  },
  {
    id: 'registration-terms',
    title: 'Registration & Fees',
    content: [
      'Registration is confirmed only once the full fee for the event has been received and verified. Submitting the registration form alone does not confirm participation.',
      'Preferences you give at registration, such as a committee, country, track, team or role, are met where possible. The organising team makes the final assignments in the interest of a fair and balanced event.',
      'Participants under 18 confirm that a parent or guardian has agreed to their registration and to these terms.',
      'Information collected during registration is used only to run Apex Conclave events and is not shared with third parties without consent.',
    ],
  },
  {
    id: 'refund-policy',
    title: 'Refund & Cancellation Policy',
    content: [
      'All fees are non-refundable. No refund is given in any case, including if a participant cancels, does not attend, or is removed under the code of conduct.',
      'The only exception: if Apex Conclave cancels an event, everyone registered receives a full refund of the fees paid, processed within 30 business days.',
    ],
  },
  {
    id: 'privacy',
    title: 'Privacy Notice',
    content: [
      'Personal information collected through registration and contact forms (name, email, phone, institution) is processed only to run Apex Conclave events and reply to messages.',
      'We use Vercel Web Analytics to count page visits and key actions (for example, a submitted registration). It sets no cookies and does not identify you; no names, emails or phone numbers are sent to it.',
      'If you arrive through a link with campaign tags (utm_source, utm_medium, utm_campaign), those tags are stored with your registration so we know which channels reach participants.',
      'Your data is held with the services that run this website: Supabase (database and payment screenshots), Vercel (hosting and analytics) and Resend (email notifications about contact messages).',
      'We do not sell, rent or otherwise transfer personal data to commercial third parties.',
      `You may ask us to delete your personal data by writing to ${organizationConfig.contactEmail}. Requests are handled within 14 business days, subject to legal retention obligations.`,
    ],
  },
  {
    id: 'disputes',
    title: 'Disputes & Governing Law',
    content: [
      `Any dispute arising from participation in an Apex Conclave event should first be raised with Apex Conclave at ${organizationConfig.contactEmail}, for internal resolution.`,
      'These terms are governed by and construed in accordance with the laws of India. Any unresolved dispute is subject to the jurisdiction of courts in India.',
      'Apex Conclave may amend these terms at any time. Continuing to take part after an amendment means you accept the revised terms.',
    ],
  },
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
            {sections.map((section) => (
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
