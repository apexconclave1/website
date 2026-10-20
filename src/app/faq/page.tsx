import type { Metadata } from 'next';
import Link from 'next/link';
import FAQAccordion from '@/components/faq/FAQAccordion';
import { apexFaqs } from '@/lib/data/faqs';
import { JsonLd } from '@/components/JsonLd';
import { faqSchema, pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata('FAQ', 'Answers to common questions about Apex Conclave: what it is, which events you can join right now, and how schools, colleges and brands can partner.', '/faq');

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
      <JsonLd data={faqSchema(apexFaqs)} />
      <FAQAccordion items={apexFaqs} />
    </main>
  );
}
