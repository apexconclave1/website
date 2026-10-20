import type { Metadata } from 'next';
import Link from 'next/link';
import FAQAccordion from '@/components/faq/FAQAccordion';
import { apexFaqs } from '@/lib/data/faqs';

export const metadata: Metadata = {
  title: 'FAQ | Apex Conclave',
  description: 'Answers about Apex Conclave, its events and partnerships.',
};

export default function FAQPage() {
  return (
    <main id="main-content" className="mx-auto max-w-[860px] px-6 pb-24 pt-32">
      <p className="mb-3 text-xs font-medium uppercase tracking-[0.18em] text-warm-bronze">FAQ</p>
      <h1 className="mb-4 text-3xl font-bold text-soft-white md:text-4xl">Frequently asked questions</h1>
      <p className="mb-10 text-base text-muted-grey">
        Questions about a specific event are answered on its page, for example{' '}
        <Link href="/events/diplovia-2026#faq" className="text-soft-white underline underline-offset-4">
          Diplovia 2026
        </Link>
        . Anything else, <Link href="/contact" className="text-soft-white underline underline-offset-4">contact us</Link>.
      </p>
      <FAQAccordion items={apexFaqs} />
    </main>
  );
}
