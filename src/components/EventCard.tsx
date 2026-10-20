import Image from 'next/image';
import { Calendar, MapPin, ArrowRight } from 'lucide-react';
import { EventEntity } from '@/types/schema';
import { eventFees, formatEventDates } from '@/lib/data/events';
import { Badge } from '@/components/ui/Badge';
import SpecularButton from '@/components/ui/SpecularButton';

export interface EventCardProps {
  event: EventEntity;
}

/** Full-width card body. The events page wraps it in a ScrollStackItem so one event shows at a time. */
export function EventCard({ event }: EventCardProps) {
  return (
    <div className="grid items-center gap-8 lg:grid-cols-2">
      <div className="space-y-5">
        <div className="flex flex-wrap items-center gap-2">
          <Badge category={event.category} />
          {event.edition && <Badge variant="accent">{event.edition}</Badge>}
        </div>

        <h2 className="text-3xl font-bold text-soft-white md:text-5xl">{event.title}</h2>

        <div className="flex flex-wrap items-center gap-5 text-sm text-muted-grey">
          <span className="flex items-center gap-1.5">
            <Calendar className="h-4 w-4 text-warm-bronze" />
            {formatEventDates(event)}
          </span>
          <span className="flex items-center gap-1.5">
            <MapPin className="h-4 w-4 text-warm-bronze" />
            {event.location.venue}
          </span>
        </div>

        <p className="text-base leading-relaxed text-muted-grey">{event.shortDescription}</p>

        {event.pricing && (
          <ul className="flex flex-wrap gap-3 text-sm text-soft-white">
            {eventFees(event).map((f) => (
              <li key={f.label} className="rounded-[10px] border border-[#1a1d1e] bg-bg px-4 py-2">
                <span className="text-muted-grey">{f.label}:</span> {f.amount}
              </li>
            ))}
          </ul>
        )}

        <div className="pt-2">
          <SpecularButton href={`/events/${event.slug}`} size="md" radius={10}>
            <span className="inline-flex items-center gap-2 whitespace-nowrap">
              View event <ArrowRight size={16} />
            </span>
          </SpecularButton>
        </div>
      </div>

      <div className="relative h-[240px] overflow-hidden rounded-[10px] border border-[#1a1d1e] bg-bg md:h-[320px]">
        <Image
          src={event.coverImage}
          alt={event.title}
          fill
          className="object-contain p-8"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
      </div>
    </div>
  );
}
