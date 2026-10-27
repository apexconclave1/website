import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { interestHref, verticals } from '@/lib/data/verticals';
import { eventsData, formatEventDates } from '@/lib/data/events';
import { StatusLabel } from '@/components/ui/StatusLabel';
import { VerticalArt } from '@/components/verticals/VerticalArt';

/**
 * The six event verticals as equal cards: artwork, number, status, title, description and one destination.
 * Active: links to its event (and names it). Planned: links to the contact form with "Register interest" prefilled.
 * The whole card is the link (the title's ::after covers it). `compact` is the home version: two per row on phones,
 * descriptions from sm up.
 */
export function VerticalsGrid({ compact = false }: { compact?: boolean }) {
  return (
    <ol className={`reveal-stagger grid gap-3 sm:gap-4 lg:grid-cols-3 ${compact ? 'grid-cols-2' : 'md:grid-cols-2'}`}>
      {verticals.map((v, i) => {
        const active = v.status === 'active';
        const event = v.eventSlug ? eventsData.find((e) => e.slug === v.eventSlug) : undefined;
        const href = active && event ? `/events/${event.slug}` : interestHref(v);

        return (
          // The li slides in (reveal); the inner card lifts on hover. Both use transform, so they sit on separate elements.
          <li key={v.id} id={v.id} className="flex scroll-mt-24">
            <div
              className={`card-lift group relative flex w-full flex-col rounded border bg-ground [&:has(:focus-visible)]:outline [&:has(:focus-visible)]:outline-2 [&:has(:focus-visible)]:outline-offset-2 [&:has(:focus-visible)]:outline-bright ${
                active ? 'border-accent/40' : 'border-soft/15'
              }`}
            >
              <div className={`overflow-hidden border-b border-soft/10 ${active ? 'bg-hero' : 'bg-surface/30'}`}>
                <VerticalArt
                  id={v.id}
                  active={active}
                  className="aspect-[16/9] w-full transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </div>

              <div className={`flex flex-1 flex-col ${compact ? 'p-4 md:p-6' : 'p-6'}`}>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs tabular-nums text-soft/70">{String(i + 1).padStart(2, '0')}</span>
                  <StatusLabel status={v.status} />
                </div>
                <h3 className={`mt-4 font-display font-medium leading-tight text-bright ${compact ? 'text-base sm:text-xl md:text-2xl' : 'text-2xl'}`}>
                  <Link
                    href={href}
                    className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none"
                    data-track={active ? 'cta_verticals_event' : 'cta_verticals_interest'}
                    data-track-vertical={v.id}
                  >
                    {v.title}
                    <span className="sr-only">{active && event ? `: view ${event.title}` : ': register interest'}</span>
                  </Link>
                </h3>
                <p className={`mt-2 text-sm leading-relaxed text-soft ${compact ? 'hidden sm:block' : ''}`}>{v.description}</p>

                <div className={`mt-auto pt-6 text-sm ${compact ? 'hidden sm:block' : ''}`}>
                  <span className="flex items-center justify-between gap-3 border-t border-soft/15 pt-4 text-bright">
                    {active && event ? (
                      <span>
                        {event.title}
                        <span className="block text-xs text-soft">
                          {event.status === 'LIVE' ? 'Live now · ' : event.status === 'UPCOMING' ? 'Upcoming · ' : ''}
                          {formatEventDates(event)} · {event.registrationOpen ? 'Registration open' : 'Registration opens soon'}
                        </span>
                      </span>
                    ) : (
                      <span>Register interest</span>
                    )}
                    <ArrowRight size={16} aria-hidden="true" className="shrink-0 transition-transform duration-200 group-hover:translate-x-1" />
                  </span>
                </div>
              </div>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
