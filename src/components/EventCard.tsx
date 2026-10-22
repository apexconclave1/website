import Image from 'next/image';
import Link from 'next/link';
import { Calendar, MapPin, ArrowRight } from 'lucide-react';
import { EventEntity } from '@/types/schema';
import { eventFees, formatEventDates } from '@/lib/data/events';
import { Badge } from '@/components/ui/Badge';

export interface EventCardProps {
  event: EventEntity;
  /** Analytics name for the main button (ClickTracker) */
  trackAs?: string;
  /** Load the cover image eagerly when the card is near the top of the page */
  priority?: boolean;
}

/** Full-width card body. The events page wraps it in a ScrollStackItem so one event shows at a time. */
export function EventCard({ event, trackAs = 'cta_events_view_event', priority = false }: EventCardProps) {
  return (
    <div className="grid items-center gap-8 lg:grid-cols-2">
      <div className="space-y-5">
        <div className="flex flex-wrap items-center gap-2">
          <Badge category={event.category} />
          {event.edition && <Badge variant="accent">{event.edition}</Badge>}
        </div>

        <h2 className="text-4xl font-normal leading-tight text-cream md:text-5xl">{event.title}</h2>

        <div className="flex flex-wrap items-center gap-5 text-sm text-cream/70">
          <span className="flex items-center gap-1.5">
            <Calendar className="h-4 w-4 text-bronze" />
            {formatEventDates(event)}
          </span>
          <span className="flex items-center gap-1.5">
            <MapPin className="h-4 w-4 text-bronze" />
            {event.location.venue}
          </span>
        </div>

        <p className="text-base leading-relaxed text-cream/70">{event.shortDescription}</p>

        {event.pricing && (
          <ul className="flex flex-wrap gap-3 text-sm text-cream">
            {eventFees(event).map((f) => (
              <li key={f.label} className="rounded border border-cream/10 bg-ink px-4 py-2">
                <span className="text-cream/70">{f.label}:</span> {f.amount}
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
            <span className="text-sm text-cream/70">Registration opens soon</span>
          )}
        </div>
      </div>

      <div className="relative h-[200px] md:h-[280px]">
        <Image
          src={event.coverImage}
          priority={priority}
          alt={event.title}
          fill
          className="object-contain p-8"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
      </div>
    </div>
  );
}
