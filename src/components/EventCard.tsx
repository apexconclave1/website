import Image from 'next/image';
import Link from 'next/link';
import { Calendar, MapPin, ArrowRight } from 'lucide-react';
import { EventEntity } from '@/types/schema';
import { eventFees, formatEventDates } from '@/lib/data/events';

export interface EventCardProps {
  event: EventEntity;
  /** Analytics name for the main button (ClickTracker) */
  trackAs?: string;
  /** Load the cover image eagerly when the card is near the top of the page */
  priority?: boolean;
}

/** Full-width card body. The events page wraps it in a bordered block. */
export function EventCard({ event, trackAs = 'cta_events_view_event', priority = false }: EventCardProps) {
  return (
    <div className="grid items-center gap-8 lg:grid-cols-2">
      <div className="space-y-5">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-accent">
          {[event.format?.split(' · ')[0], event.edition].filter(Boolean).join(' · ')}
        </p>

        {/* An event with its own logo shows only the logo (beside); the name stays for screen readers */}
        <h2 className={event.posterImage ? 'sr-only' : 'text-5xl font-medium leading-tight text-bright md:text-6xl'}>{event.title}</h2>

        <div className="flex flex-wrap items-center gap-5 text-sm text-soft">
          <span className="flex items-center gap-1.5">
            <Calendar className="h-4 w-4 text-accent" />
            {formatEventDates(event)}
          </span>
          <span className="flex items-center gap-1.5">
            <MapPin className="h-4 w-4 text-accent" />
            {event.location.venue}
          </span>
        </div>

        <p className="text-base leading-relaxed text-soft">{event.shortDescription}</p>

        {event.pricing && (
          <ul className="flex flex-wrap gap-3 text-sm text-bright">
            {eventFees(event).map((f) => (
              <li key={f.label} className="rounded border border-soft/20 px-4 py-2">
                <span className="text-soft">{f.label}:</span> {f.amount}
              </li>
            ))}
          </ul>
        )}

        <div className="flex flex-wrap items-center gap-4 pt-2">
          <Link href={`/events/${event.slug}`} className="btn-primary whitespace-nowrap" data-track={trackAs}>
            Explore {event.title} <ArrowRight size={16} />
          </Link>
          {event.registrationOpen ? (
            <Link
              href={`/register?event=${event.slug}`}
              data-track="cta_card_register"
              className="btn-secondary"
            >
              Register
            </Link>
          ) : (
            <span className="text-sm text-soft">Registration opens soon</span>
          )}
        </div>
      </div>

      {/* The event's logo, its visible name (first when stacked); otherwise its cover image, large screens only */}
      {event.posterImage ? (
        <Image
          src={event.posterImage}
          priority={priority}
          alt=""
          width={1200}
          height={345}
          sizes="(min-width: 1024px) 520px, 448px"
          className="order-first h-auto w-full max-w-md lg:order-none lg:max-w-none"
        />
      ) : (
        <div className="relative hidden h-[280px] lg:block">
          <Image src={event.coverImage} priority={priority} alt={event.title} fill className="object-contain p-8" sizes="50vw" />
        </div>
      )}
    </div>
  );
}
