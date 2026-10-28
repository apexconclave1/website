'use client';

// Interactive part of /events: category filter (shown once there is more than one event), upcoming list, past events.
import { useState } from 'react';
import { eventsData } from '@/lib/data/events';
import { EventCard } from '@/components/EventCard';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { EventCategory } from '@/types/schema';

const CATEGORIES: { label: string; value: EventCategory | 'ALL' }[] = [
  { label: 'All Events', value: 'ALL' },
  { label: 'MUN', value: 'MUN' },
  { label: 'Tech', value: 'TECH' },
  { label: 'Leadership', value: 'LEADERSHIP' },
  { label: 'Business', value: 'BUSINESS' },
  { label: 'Cultural', value: 'CULTURAL' },
];

export default function EventsDirectory() {
  const [activeCategory, setActiveCategory] = useState<EventCategory | 'ALL'>('ALL');

  const inCategory = eventsData.filter((e) => activeCategory === 'ALL' || e.category === activeCategory);
  const isPast = (e: (typeof eventsData)[number]) => e.status === 'COMPLETED' || e.status === 'ARCHIVED';
  const filtered = inCategory.filter((e) => !isPast(e));
  const past = inCategory.filter(isPast);

  return (
    <>
      {/* Filter Bar: only useful once there is more than one event */}
      {eventsData.length > 1 && (
      <div className="space-y-4 border-b border-soft/15 pb-6">
        {/* Category Filter */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs uppercase tracking-widest text-soft font-medium w-16 shrink-0">
            Type
          </span>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setActiveCategory(cat.value)}
              className={`px-4 py-1.5 rounded text-xs font-semibold uppercase tracking-wider transition-colors ${
                activeCategory === cat.value
                  ? 'bg-bright text-deep'
                  : 'bg-ground border border-soft/15 text-soft hover:text-bright hover:border-soft/40'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>
      )}

      {/* Events Grid */}
      {filtered.length > 0 ? (
        <div className="space-y-5">
          {filtered.map((event) => (
            // Events with their own identity show in it (DIPLOVIA: navy, gold, Playfair Display)
            <div
              key={event.id}
              className={`rounded border p-6 md:p-10 ${event.brand === 'diplovia' ? 'theme-diplovia bg-hero border-accent/30' : 'border-soft/15'}`}
            >
              <EventCard event={event} priority />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 space-y-3">
          <p className="text-soft text-sm">
            No upcoming events{activeCategory === 'ALL' ? ' right now.' : ' in this category.'}
          </p>
          <button
            onClick={() => setActiveCategory('ALL')}
            className="text-xs text-accent underline underline-offset-4"
          >
            Clear filters
          </button>
        </div>
      )}

      {past.length > 0 && (
        <section className="space-y-6 border-t border-soft/15 pt-12">
          <SectionHeading eyebrow="Archive" title="Past events" />
          <div className="space-y-5">
            {past.map((event) => (
              <div key={event.id} className="rounded border border-soft/15 bg-ground p-6 md:p-10">
                <EventCard event={event} />
              </div>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
