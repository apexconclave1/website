import type { Metadata } from 'next';
import Link from 'next/link';
import FAQAccordion from '@/components/faq/FAQAccordion';
import { PageHeader } from '@/components/ui/PageHeader';
import { apexFaqs } from '@/lib/data/faqs';
import { JsonLd } from '@/components/JsonLd';
import { faqSchema, pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata('FAQ', 'Answers to common questions about Apex Conclave: what it is, which events you can join right now, and how schools, colleges and brands can partner.', '/faq');

export default function FAQPage() {
  return (
    <main id="main-content">
      <PageHeader
        eyebrow="FAQ"
        title="Frequently asked questions"
        aside={
          <p>
            Questions about a specific event are answered on its page, for example{' '}
            <Link href="/events/diplovia-2026#faq" className="text-bright underline underline-offset-4 hover:decoration-accent">
              Diplovia 2026
            </Link>
            . Anything else,{' '}
            <Link href="/contact" className="text-bright underline underline-offset-4 hover:decoration-accent">
              contact us
            </Link>
            .
          </p>
        }
      />
      <div className="mx-auto max-w-[860px] px-6 py-16 md:py-24">
        <JsonLd data={faqSchema(apexFaqs)} />
        <FAQAccordion items={apexFaqs} />
      </div>
    </main>
  );
}
