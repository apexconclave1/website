import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { comingSoonSlots, verticals } from '@/lib/data/verticals';
import { eventsData, formatEventDates } from '@/lib/data/events';
import { StatusLabel } from '@/components/ui/StatusLabel';
import { VerticalArt } from '@/components/verticals/VerticalArt';

// Card frame shared by both kinds. The li slides in (reveal); the inner card lifts on hover. Both use transform,
// so they sit on separate elements. The whole card is the link (the link's ::after covers it).
const cardClass =
  'card-lift group relative flex w-full flex-col rounded border [&:has(:focus-visible)]:outline [&:has(:focus-visible)]:outline-2 [&:has(:focus-visible)]:outline-offset-2 [&:has(:focus-visible)]:outline-bright';
const stretch = "after:absolute after:inset-0 after:content-[''] focus-visible:outline-none";

/**
 * Event verticals: the real ones (artwork, status, title, description, their event) followed by "Coming soon" cards
 * that open /coming-soon (owner, 2026-10-27: planned verticals are not named). `compact` is the home version.
 */
export function VerticalsGrid({ compact = false }: { compact?: boolean }) {
  return (
    <ol className={`reveal-stagger grid gap-3 sm:gap-4 lg:grid-cols-3 ${compact ? 'grid-cols-2' : 'sm:grid-cols-2'}`}>
      {verticals.map((v) => {
        const event = v.eventSlug ? eventsData.find((e) => e.slug === v.eventSlug) : undefined;
        return (
          // On two columns the real card spans the row, the two Coming soon cards share the next
          <li key={v.id} id={v.id} className={`flex scroll-mt-24 lg:col-span-1 ${compact ? 'col-span-2' : 'sm:col-span-2'}`}>
            <div className={`${cardClass} border-accent/40 bg-ground`}>
              <div className="overflow-hidden border-b border-soft/10 bg-hero">
                <VerticalArt id={v.id} active className="aspect-[16/9] w-full transition-transform duration-500 group-hover:scale-[1.03]" />
              </div>
              <div className={`flex flex-1 flex-col ${compact ? 'p-4 md:p-6' : 'p-6'}`}>
                <StatusLabel status={v.status} className="self-start" />
                <h3 className="mt-4 font-display text-2xl font-medium leading-tight text-bright">
                  <Link href={event ? `/events/${event.slug}` : '/events'} className={stretch} data-track="cta_verticals_event" data-track-vertical={v.id}>
                    {v.title}
                    {event && <span className="sr-only">: view {event.title}</span>}
                  </Link>
                </h3>
                <p className="mb-6 mt-2 text-sm leading-relaxed text-soft">{v.description}</p>
                {event && (
                  <span className="mt-auto flex items-center justify-between gap-3 border-t border-soft/15 pt-4 text-sm text-bright">
                    <span>
                      {event.title}
                      <span className="block text-xs text-soft">
                        {event.status === 'LIVE' ? 'Live now · ' : event.status === 'UPCOMING' ? 'Upcoming · ' : ''}
                        {formatEventDates(event)} · {event.registrationOpen ? 'Registration open' : 'Registration opens soon'}
                      </span>
                    </span>
                    <ArrowRight size={16} aria-hidden="true" className="shrink-0 transition-transform duration-200 group-hover:translate-x-1" />
                  </span>
                )}
              </div>
            </div>
          </li>
        );
      })}

      {Array.from({ length: comingSoonSlots }, (_, i) => (
        <li key={`soon-${i}`} className="flex">
          <div className={`${cardClass} border-soft/20 bg-ground hover:border-soft/45`}>
            <h3 className="sr-only">Coming soon</h3>
            {/* A plain panel with a worn lime stamp that thumps in once (.stamp in globals.css); the second card a beat later */}
            <div className={`flex flex-1 items-center justify-center overflow-hidden border-b border-soft/10 bg-hero ${compact ? 'min-h-36 sm:min-h-48' : 'min-h-48'}`}>
              <span aria-hidden="true" className={`stamp ${compact ? 'text-lg sm:text-3xl' : 'text-3xl'}`} style={{ transitionDelay: `${i * 160}ms` }}>
                Coming
                <br />
                soon
              </span>
            </div>
            <Link
              href="/coming-soon"
              className={`${stretch} flex items-center justify-between gap-3 text-sm text-soft transition-colors duration-200 group-hover:text-bright ${compact ? 'p-4 md:px-6' : 'px-6 py-4'}`}
              data-track="cta_verticals_coming_soon"
            >
              <span>
                <span className="sr-only">Coming soon: a new Apex Conclave experience. </span>
                Stay tuned
              </span>
              <ArrowRight size={16} aria-hidden="true" className="shrink-0 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </div>
        </li>
      ))}
    </ol>
  );
}
