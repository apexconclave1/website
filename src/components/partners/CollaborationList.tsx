import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { partnerEnquiryFor, partnersContent } from '@/lib/data/organization';

/** The five ways to work with Apex Conclave as a ruled list, for paper sections. Each row opens the enquiry form. */
export function CollaborationList() {
  return (
    <ol className="border-t border-hairline">
      {partnersContent.collaborations.map((c, i) => (
        <li key={c.title} className="border-b border-hairline">
          <Link
            href={partnerEnquiryFor(c.title)}
            className="group grid gap-2 py-6 sm:grid-cols-[3rem_1fr_auto] sm:items-baseline sm:gap-6"
            data-track="cta_partner_type"
            data-track-type={c.title}
          >
            <span className="text-sm tabular-nums text-stone">{String(i + 1).padStart(2, '0')}</span>
            <span>
              <span className="block text-lg font-medium text-ink">{c.title}</span>
              <span className="mt-1 block max-w-[56ch] text-sm leading-relaxed text-stone">{c.body}</span>
            </span>
            <span className="inline-flex items-center gap-1.5 text-sm text-ink underline decoration-hairline underline-offset-[6px] transition-colors duration-200 group-hover:decoration-ink">
              Enquire <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-0.5" />
            </span>
          </Link>
        </li>
      ))}
    </ol>
  );
}
