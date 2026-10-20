import type { Metadata } from 'next';
import ContactForm from '@/components/contact/ContactForm';
import ContactCards from '@/components/contact/ContactCards';

export const metadata: Metadata = {
  title: 'Contact | Apex Conclave',
  description: 'Reach out to Apex Conclave about events, registration, partnerships and sponsorship.',
};

export default function ContactPage({ searchParams }: { searchParams: { category?: string } }) {
  return (
    <main id="main-content" className="mx-auto max-w-[1240px] px-6 pb-24 pt-32">
      <p className="eyebrow mb-3">Contact</p>
      <h1 className="max-w-3xl text-4xl font-bold leading-tight text-soft-white md:text-5xl">Talk to us.</h1>
      <p className="mt-6 max-w-[65ch] text-lg leading-relaxed text-muted-grey">
        Questions about an event, registration, partnerships or hosting an event with us. Send a message and we reply
        within 48 hours.
      </p>

      <div className="mt-16 grid grid-cols-1 items-start gap-10 border-t border-surface pt-16 lg:grid-cols-[1fr_2fr]">
        <ContactCards />
        <ContactForm defaultCategory={searchParams.category} />
      </div>
    </main>
  );
}
