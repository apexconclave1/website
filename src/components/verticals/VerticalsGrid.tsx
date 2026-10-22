import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, BriefcaseBusiness, Code, Gamepad2, Landmark, Mic, Sprout, type LucideIcon } from 'lucide-react';
import { interestHref, verticals } from '@/lib/data/verticals';
import { eventsData, formatEventDates } from '@/lib/data/events';

const icons: Record<string, LucideIcon> = {
  diplomacy: Landmark,
  business: BriefcaseBusiness,
  technology: Code,
  debate: Mic,
  startups: Sprout,
  esports: Gamepad2,
};

/**
 * Editorial grid of the six verticals, for paper sections. The active vertical is an ink tile spanning
 * two columns and rows; planned ones are open cells divided by hairlines. `compact` is the home version.
 */
export function VerticalsGrid({ compact = false }: { compact?: boolean }) {
  return (
    // gap-px over a hairline background draws the dividers; every cell has its own paper or ink fill
    // Home (compact): planned verticals two per row on phones, descriptions from sm up. Page: one column on phones.
    <ol
      className={`grid gap-px border border-deep/20 bg-deep/20 lg:grid-cols-3 ${compact ? 'grid-cols-2' : 'md:grid-cols-2'}`}
    >
      {verticals.map((v, i) => {
        const Icon = icons[v.id];
        const number = String(i + 1).padStart(2, '0');
        const event = v.eventSlug ? eventsData.find((e) => e.slug === v.eventSlug) : undefined;

        if (v.status === 'active') {
          return (
            <li
              key={v.id}
              id={v.id}
              className={`tone-dark flex scroll-mt-24 flex-col p-6 text-bright md:col-span-2 md:p-10 lg:row-span-2 ${compact ? 'col-span-2' : ''}`}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm tabular-nums text-soft">{number}</span>
                <Icon size={20} strokeWidth={1.5} className="text-accent" aria-hidden="true" />
              </div>
              <p className="eyebrow mt-8 md:mt-10">Active</p>
              <h3 className="mt-3 font-serif text-4xl font-normal leading-tight md:text-5xl">{v.title}</h3>
              <p className="mt-4 max-w-[46ch] text-soft">{v.description}</p>

              {event && (
                // pt-12 keeps a gap above the rule when the tile is short (one-row layouts); mt-auto pins it to the bottom
                <div className="mt-auto pt-10 md:pt-12">
                  <Link
                    href={`/events/${event.slug}`}
                    className="group flex flex-col gap-6 border-t border-soft/15 pt-8 sm:flex-row sm:items-end sm:justify-between"
                    data-track="cta_verticals_event"
                  >
                    <div>
                      {event.logo && !compact && (
                        <Image src={event.logo} alt="" width={180} height={52} className="mb-5 h-auto w-[180px]" />
                      )}
                      <span className="block text-lg text-bright">{event.title}</span>
                      <span className="mt-1 block text-sm text-soft">
                        {formatEventDates(event)} · {event.location.isVirtual ? 'Online' : event.location.city} ·{' '}
                        {event.registrationOpen ? 'Registration open' : 'Registration opens soon'}
                      </span>
                    </div>
                    <span className="inline-flex shrink-0 items-center gap-2 text-sm text-bright underline decoration-soft/40 underline-offset-[6px] transition-colors duration-200 group-hover:decoration-bright">
                      View event <ArrowRight size={14} />
                    </span>
                  </Link>
                </div>
              )}
            </li>
          );
        }

        return (
          <li
            key={v.id}
            id={v.id}
            // Wherever there are two columns, the sixth cell would sit alone, so it spans the row
            className={`flex scroll-mt-24 flex-col bg-soft text-deep lg:last:col-span-1 ${
              compact ? 'p-5 last:col-span-2 md:p-7' : 'p-6 md:p-8 md:last:col-span-2'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-sm tabular-nums text-ground">{number}</span>
              <Icon size={20} strokeWidth={1.5} className="text-accent" aria-hidden="true" />
            </div>
            <h3
              className={`font-serif font-normal leading-snug ${
                compact ? 'mt-5 text-lg md:mt-8 md:text-2xl' : 'mt-6 text-2xl md:mt-10 md:text-[1.75rem]'
              }`}
            >
              {v.title}
            </h3>
            <p className={`mt-3 text-sm leading-relaxed text-ground ${compact ? 'hidden sm:block' : ''}`}>{v.description}</p>
            <div className="mt-auto flex items-center justify-between gap-4 pt-5 text-sm md:pt-8">
              <span className="text-xs font-medium uppercase tracking-[0.14em] text-ground">Planned</span>
              {!compact && (
                <Link
                  href={interestHref(v)}
                  className="inline-flex items-center gap-1.5 text-deep underline decoration-deep/30 underline-offset-[6px] transition-colors duration-200 hover:decoration-deep"
                  data-track="cta_verticals_interest"
                  data-track-vertical={v.id}
                >
                  Register interest <ArrowRight size={14} />
                </Link>
              )}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
