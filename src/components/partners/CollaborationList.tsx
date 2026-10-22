import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { partnerEnquiryFor, partnersContent } from '@/lib/data/organization';

/** The five ways to work with Apex Conclave as a ruled list, for paper sections. Each row opens the enquiry form. */
export function CollaborationList() {
  return (
    <ol className="border-t border-deep/20">
      {partnersContent.collaborations.map((c, i) => (
        <li key={c.title} className="border-b border-deep/20">
          <Link
            href={partnerEnquiryFor(c.title)}
            className="group grid gap-2 py-6 sm:grid-cols-[3rem_1fr_auto] sm:items-baseline sm:gap-6"
            data-track="cta_partner_type"
            data-track-type={c.title}
          >
            <span className="text-sm tabular-nums text-ground">{String(i + 1).padStart(2, '0')}</span>
            <span>
              <span className="block text-lg font-medium text-deep">{c.title}</span>
              <span className="mt-1 block max-w-[56ch] text-sm leading-relaxed text-ground">{c.body}</span>
            </span>
            <span className="inline-flex items-center gap-1.5 text-sm text-deep underline decoration-deep/30 underline-offset-[6px] transition-colors duration-200 group-hover:decoration-deep">
              Enquire <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-0.5" />
            </span>
          </Link>
        </li>
      ))}
    </ol>
  );
}
