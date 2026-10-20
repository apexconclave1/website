import type { Metadata } from 'next';
import HorizonDivider from '@/components/layout/HorizonDivider';
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

      <main id="main-content" style={{ paddingTop: '64px' }}>
        <section
          aria-label="Terms and Conditions"
          style={{
            minHeight: '100vh',
            backgroundColor: 'transparent',
            padding: '5rem 1.5rem',
          }}
        >
          <div style={{ maxWidth: '780px', margin: '0 auto' }}>
            <div style={{ marginBottom: '3rem' }}>
              <p
                style={{
                  fontFamily: "var(--font-inter), system-ui, sans-serif",
                  fontSize: '0.6875rem',
                  fontWeight: 600,
                  letterSpacing: '0.2em',
                  color: '#C7A16A',
                  textTransform: 'uppercase',
                  marginBottom: '0.875rem',
                }}
              >
                Legal
              </p>
              <h1
                style={{
                  fontFamily: "var(--font-inter), system-ui, sans-serif",
                  fontWeight: 400,
                  fontSize: 'clamp(1.875rem, 3.5vw, 2.5rem)',
                  letterSpacing: '-0.02em',
                  color: '#F4F1EA',
                  lineHeight: 1.15,
                  marginBottom: '1rem',
                }}
              >
                Terms & Conditions
              </h1>
              <p
                style={{
                  fontFamily: "var(--font-inter), system-ui, sans-serif",
                  fontSize: '0.875rem',
                  color: '#9A9490',
                  lineHeight: 1.7,
                }}
              >
                Last updated: September 2026. By registering as a delegate or using Apex Conclave services,
                you agree to the following terms in their entirety.
              </p>
            </div>

            {sections.map((section, i) => (
              <div key={section.id}>
                {i > 0 && <HorizonDivider />}
                <article
                  id={section.id}
                  aria-label={section.title}
                  style={{
                    marginBottom: '2rem',
                    backgroundColor: 'rgba(15, 18, 24, 0.4)',
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)',
                    border: '1px solid rgba(199, 161, 106, 0.15)',
                    borderRadius: '12px',
                    padding: '1.75rem',
                  }}
                >
                  <h2
                    style={{
                      fontFamily: "var(--font-inter), system-ui, sans-serif",
                      fontWeight: 400,
                      fontSize: '1.375rem',
                      color: '#F4F1EA',
                      marginBottom: '1.25rem',
                      lineHeight: 1.3,
                    }}
                  >
                    {section.title}
                  </h2>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
                    {section.content.map((para, pi) => (
                      <p
                        key={pi}
                        style={{
                          fontFamily: "var(--font-inter), system-ui, sans-serif",
                          fontSize: '0.9375rem',
                          color: '#CDC7C0',
                          lineHeight: 1.75,
                          paddingLeft: '1rem',
                          borderLeft: '2px solid rgba(199, 161, 106,0.3)',
                        }}
                      >
                        {para}
                      </p>
                    ))}
                  </div>
                </article>
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
