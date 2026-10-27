import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import ContactForm from '@/components/contact/ContactForm';
import ContactCards from '@/components/contact/ContactCards';
import { PageHeader } from '@/components/ui/PageHeader';

export const metadata: Metadata = pageMetadata('Contact', 'Contact Apex Conclave about events, registration, partnerships, sponsorship, judging or hosting an event on your campus. The team replies within 48 hours.', '/contact');

export default function ContactPage({ searchParams }: { searchParams: { category?: string; subject?: string } }) {
  return (
    <main id="main-content">
      <PageHeader
        eyebrow="Contact"
        title="Talk to us."
        aside={
          <p>
            Questions about an event, registration, partnerships or hosting an event with us. Send a message and we reply
            within 48 hours.
          </p>
        }
      />
      <div className="mx-auto grid max-w-container grid-cols-1 items-start gap-10 px-6 py-16 md:py-24 lg:grid-cols-[1fr_2fr]">
        <ContactCards />
        <ContactForm defaultCategory={searchParams.category} defaultSubject={searchParams.subject} />
      </div>
    </main>
  );
}
