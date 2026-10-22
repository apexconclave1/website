import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { EventEntity } from '@/types/schema';
import { formatEventDates } from '@/lib/data/events';
import { chambersData } from '@/lib/data/chambers';
import { organizationConfig } from '@/lib/data/organization';

/** Home featured event: details and CTAs on one side, the event's own artwork on the other. */
export function FeaturedEvent({ event }: { event: EventEntity }) {
  const committees = chambersData.filter((c) => c.eventId === event.id);

  const details = [
    event.format && { label: 'Format', value: event.format },
    { label: 'Dates', value: formatEventDates(event) },
    { label: 'Venue', value: event.location.venue },
    committees.length > 0 && {
      label: 'Committees',
      value: (
        <ul>
          {committees.map((c) => (
            <li key={c.id}>{c.name}</li>
          ))}
        </ul>
      ),
    },
    { label: 'Registration', value: event.registrationOpen ? 'Open' : 'Opens soon' },
  ].filter(Boolean) as { label: string; value: React.ReactNode }[];

  return (
    <section aria-labelledby="featured-heading" className="mx-auto max-w-container px-6 py-16 md:py-32">
      <div className="mb-10 flex md:mb-14 items-end justify-between gap-6">
        <p className="eyebrow">Featured event</p>
        <Link href="/events" className="text-sm text-cream/70 underline underline-offset-4 transition-colors duration-200 hover:text-cream">
          All events
        </Link>
      </div>

      <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <h2 id="featured-heading" className="text-[2.75rem] font-normal leading-none md:text-6xl">
            {event.title}
          </h2>
          <p className="mt-4 text-cream/70">Presented by Apex Conclave.</p>

          <dl className="mt-10 border-t border-cream/10">
            {details.map((d) => (
              <div key={d.label} className="grid gap-1 border-b border-cream/10 py-4 text-sm sm:grid-cols-[7.5rem_1fr] sm:gap-4">
                <dt className="text-cream/70">{d.label}</dt>
                <dd className="text-cream">{d.value}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-10 flex flex-wrap gap-3">
            <Link href={`/events/${event.slug}`} className="btn-primary w-full sm:w-auto" data-track="cta_home_featured_event">
              View Event Details <ArrowRight size={16} />
            </Link>
            {event.registrationOpen ? (
              <Link href={`/register?event=${event.slug}`} className="btn-secondary w-full sm:w-auto" data-track="cta_home_featured_register">
                Register
              </Link>
            ) : (
              organizationConfig.socials.instagram && (
                // Dates and the registration window are announced on Instagram (see /register)
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

        {event.posterImage && (
          <div className="lg:col-span-7">
            <Image
              src={event.posterImage}
              alt={`${event.title} artwork`}
              width={1500}
              height={1570}
              sizes="(min-width: 1280px) 700px, (min-width: 1024px) 55vw, 100vw"
              className="h-auto w-full border border-cream/10"
            />
          </div>
        )}
      </div>
    </section>
  );
}
