import { organizationConfig } from '@/lib/data/organization';

// Shown on /terms and in /llms-full.txt.
// Owner-approved rewrite for all Apex Conclave events (2026-10-22): format lines, guardian consent, organising team as
// the deciding body. Refunds (owner, 2026-10-29): none in any case, except a full refund if Apex Conclave cancels the event.
export const termsSections = [
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
