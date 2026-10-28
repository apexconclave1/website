import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { EventEntity } from '@/types/schema';
import { formatEventDates } from '@/lib/data/events';
import { chambersData } from '@/lib/data/chambers';
import { organizationConfig } from '@/lib/data/organization';

/**
 * Home featured event, in the event's own identity (.theme-diplovia: espresso, cream, caramel, Playfair Display):
 * overview, confirmed facts, registration state, the way in, the event's logo as its visible name, then the committees
 * with their agendas.
 */
export function FeaturedEvent({ event }: { event: EventEntity }) {
  const committees = chambersData.filter((c) => c.eventId === event.id).sort((a, b) => a.displayOrder - b.displayOrder);

  const facts = [
    { label: 'Dates', value: formatEventDates(event) },
    { label: 'Format', value: event.format },
    { label: 'Venue', value: event.location.venue },
    { label: 'Registration', value: event.registrationOpen ? 'Open now' : 'Opens soon' },
  ].filter((f) => f.value);

  return (
    <section aria-labelledby="featured-heading" className="theme-diplovia band-fade relative isolate overflow-hidden">
      <div className="mx-auto max-w-container px-6 py-16 md:py-28">
        <div className="reveal mb-12 flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-b border-accent/25 pb-5 md:mb-16">
          <p className="eyebrow">Featured event</p>
          <p className="flex items-center gap-6 text-sm text-soft">
            <span className="hidden sm:inline">Presented by Apex Conclave</span>
            <Link href="/events" className="hit underline decoration-soft/40 underline-offset-4 transition-colors duration-200 hover:text-bright hover:decoration-accent">
              All events
            </Link>
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-12 lg:gap-x-10 lg:gap-y-12">
          <div className="reveal lg:col-span-6">
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-accent">
              {event.format?.split(' · ')[0] ?? event.edition}
            </p>
            {/* The logo beside is the visible name; the heading stays for screen readers */}
            <h2 id="featured-heading" className={event.posterImage ? 'sr-only' : 'mt-5 text-[3.25rem] font-medium leading-[0.95] text-bright md:text-7xl'}>
              {event.title}
            </h2>
            <p className="mt-6 max-w-[46ch] text-base leading-relaxed text-soft md:text-lg">{event.fullOverview}</p>
          </div>

          {event.posterImage && (
            <div className="reveal-right order-first max-w-md lg:order-none lg:col-span-6 lg:col-start-7 lg:row-span-2 lg:max-w-none lg:self-center">
              <Image
                src={event.posterImage}
                alt=""
                width={1200}
                height={345}
                sizes="(min-width: 1280px) 600px, (min-width: 1024px) 48vw, 100vw"
                className="h-auto w-full"
              />
            </div>
          )}

          <div className="reveal lg:col-span-6 lg:row-start-2">
            <dl className="grid grid-cols-2 border-t border-accent/25">
              {facts.map((f, i) => (
                <div key={f.label} className={`border-b border-accent/25 py-4 ${i % 2 === 0 ? 'pr-4' : 'border-l pl-4'}`}>
                  <dt className="text-xs uppercase tracking-[0.14em] text-soft/80">{f.label}</dt>
                  <dd className="mt-1.5 text-sm text-bright md:text-base">
                    {f.label === 'Registration' && (
                      <span aria-hidden="true" className={`mr-2 inline-block h-1.5 w-1.5 rounded-full align-middle ${event.registrationOpen ? 'bg-accent' : 'border border-accent'}`} />
                    )}
                    {f.value}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={`/events/${event.slug}`} className="btn-primary w-full sm:w-auto" data-track="cta_home_featured_event">
                Explore {event.title} <ArrowRight size={16} aria-hidden="true" />
              </Link>
              {event.registrationOpen ? (
                <Link href={`/register?event=${event.slug}`} className="btn-secondary w-full sm:w-auto" data-track="cta_home_featured_register">
                  Register now
                </Link>
              ) : (
                organizationConfig.socials.instagram && (
                  // The registration window is announced on Instagram (see /register)
                  <a
                    href={organizationConfig.socials.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary w-full sm:w-auto"
                    data-track="social_click"
                    data-track-platform="instagram"
                    data-track-place="home_featured"
                  >
                    Follow for registration updates
                  </a>
                )
              )}
            </div>
          </div>
        </div>

        {committees.length > 0 && (
          <div className="mt-16 md:mt-24">
            <h3 className="reveal mb-6 text-xs font-medium uppercase tracking-[0.14em] text-soft/80">
              {committees.length} committees
            </h3>
            <ol className="reveal-stagger grid border-t border-accent/25 sm:grid-cols-2 lg:grid-cols-5">
              {committees.map((c) => (
                <li key={c.id} className="border-b border-accent/25 py-5 sm:pr-6 lg:border-b-0 lg:border-r lg:px-5 lg:first:pl-0 lg:last:border-r-0">
                  <p className="font-display text-3xl font-semibold text-accent">{c.code}</p>
                  <p className="mt-1 text-sm text-bright">{c.name}</p>
                  <p className="mt-3 text-sm leading-relaxed text-soft/85">{c.topic}</p>
                </li>
              ))}
            </ol>
          </div>
        )}
      </div>
    </section>
  );
}
