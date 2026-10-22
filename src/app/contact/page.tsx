import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import ContactForm from '@/components/contact/ContactForm';
import ContactCards from '@/components/contact/ContactCards';

export const metadata: Metadata = pageMetadata('Contact', 'Contact Apex Conclave about events, registration, partnerships, sponsorship, judging or hosting an event on your campus. The team replies within 48 hours.', '/contact');

export default function ContactPage({ searchParams }: { searchParams: { category?: string; subject?: string } }) {
  return (
    <main id="main-content" className="mx-auto max-w-container px-6 pb-16 pt-28 md:pb-24 md:pt-36">
      <p className="eyebrow mb-5">Contact</p>
      <h1 className="max-w-3xl text-[2.625rem] font-normal leading-[1.04] text-bright md:text-6xl">Talk to us.</h1>
      <p className="mt-6 max-w-[65ch] text-base leading-relaxed text-soft md:text-lg">
        Questions about an event, registration, partnerships or hosting an event with us. Send a message and we reply
        within 48 hours.
      </p>

      <div className="mt-12 grid grid-cols-1 items-start gap-10 md:mt-16 lg:grid-cols-[1fr_2fr]">
        <ContactCards />
        <ContactForm defaultCategory={searchParams.category} defaultSubject={searchParams.subject} />
      </div>
    </main>
  );
}
