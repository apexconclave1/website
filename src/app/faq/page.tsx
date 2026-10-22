import type { Metadata } from 'next';
import Link from 'next/link';
import FAQAccordion from '@/components/faq/FAQAccordion';
import { apexFaqs } from '@/lib/data/faqs';
import { JsonLd } from '@/components/JsonLd';
import { faqSchema, pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata('FAQ', 'Answers to common questions about Apex Conclave: what it is, which events you can join right now, and how schools, colleges and brands can partner.', '/faq');

export default function FAQPage() {
  return (
    <main id="main-content" className="mx-auto max-w-[860px] px-6 pb-16 pt-28 md:pb-24 md:pt-36">
      <p className="eyebrow mb-5">FAQ</p>
      <h1 className="mb-6 text-[2.625rem] font-normal leading-[1.04] text-bright md:text-6xl">Frequently asked questions</h1>
      <p className="mb-10 text-base text-soft">
        Questions about a specific event are answered on its page, for example{' '}
        <Link href="/events/diplovia-2026#faq" className="text-bright underline underline-offset-4">
          Diplovia 2026
        </Link>
        . Anything else, <Link href="/contact" className="text-bright underline underline-offset-4">contact us</Link>.
      </p>
      <JsonLd data={faqSchema(apexFaqs)} />
      <FAQAccordion items={apexFaqs} />
    </main>
  );
}
