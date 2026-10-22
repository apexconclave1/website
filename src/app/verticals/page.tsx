import type { Metadata } from 'next';
import Link from 'next/link';
import { pageMetadata } from '@/lib/seo';
import { verticals } from '@/lib/data/verticals';
import { eventsData } from '@/lib/data/events';

export const metadata: Metadata = pageMetadata(
  'Event Verticals',
  'The kinds of student competitions Apex Conclave runs and plans: diplomacy and MUNs, business cases, hackathons, debate, startup pitching and esports.',
  '/verticals',
);

// ponytail: plain list for now; the full editorial layout replaces it in redesign Phase 4.
export default function VerticalsPage() {
  return (
    <main id="main-content" className="mx-auto max-w-container px-6 pb-24 pt-32">
      <p className="eyebrow mb-3">Event Verticals</p>
      <h1 className="max-w-3xl text-4xl font-medium leading-[1.1] text-cream md:text-5xl">
        Six kinds of stage, one standard.
      </h1>
      <p className="mt-6 max-w-[60ch] text-lg leading-relaxed text-cream/70">
        The disciplines Apex Conclave builds events in. One is running now; the others are planned and will open as
        they are ready.
      </p>

      <ol className="mt-16 border-t border-cream/10">
        {verticals.map((v, i) => {
          const event = v.eventSlug && eventsData.find((e) => e.slug === v.eventSlug);
          return (
            <li
              key={v.id}
              id={v.id}
              className="scroll-mt-24 grid gap-3 border-b border-cream/10 py-8 md:grid-cols-[4rem_1fr_12rem] md:items-baseline md:gap-8"
            >
              <span className="text-sm tabular-nums text-cream/70">{String(i + 1).padStart(2, '0')}</span>
              <div>
                <h2 className="text-2xl font-medium text-cream md:text-3xl">{v.title}</h2>
                <p className="mt-2 max-w-[56ch] text-cream/70">{v.description}</p>
              </div>
              <div className="text-sm md:text-right">
                {v.status === 'active' ? (
                  <>
                    <span className="eyebrow block">Active</span>
                    {event && (
                      <Link
                        href={`/events/${event.slug}`}
                        className="mt-2 inline-block text-cream underline underline-offset-4 hover:text-cream/70"
                      >
                        {event.title}
                      </Link>
                    )}
                  </>
                ) : (
                  <span className="text-xs font-medium uppercase tracking-[0.14em] text-cream/70">Planned</span>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </main>
  );
}
