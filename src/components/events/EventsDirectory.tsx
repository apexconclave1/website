'use client';

// Interactive part of /events: category filter (shown once there is more than one event), upcoming stack, past events.
import { useState } from 'react';
import { eventsData } from '@/lib/data/events';
import { EventCard } from '@/components/EventCard';
import { SectionHeading } from '@/components/ui/SectionHeading';
import ScrollStack, { ScrollStackItem } from '@/components/ui/ScrollStack';
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
      <div className="space-y-4 border-b border-cream/10 pb-6">
        {/* Category Filter */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs uppercase tracking-widest text-cream/70 font-medium w-16 shrink-0">
            Type
          </span>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setActiveCategory(cat.value)}
              className={`px-4 py-1.5 rounded text-xs font-semibold uppercase tracking-wider transition-colors ${
                activeCategory === cat.value
                  ? 'bg-cream text-ink'
                  : 'bg-ink border border-cream/10 text-cream/70 hover:text-cream hover:border-cream/30'
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
        <ScrollStack
          key={filtered.map((e) => e.id).join()}
          useWindowScroll
          itemDistance={80}
          baseScale={0.92}
          itemScale={0.02}
          holdDistance={96}
          className="events-stack"
        >
          {filtered.map((event) => (
            <ScrollStackItem
              key={event.id}
              itemClassName="!h-auto !rounded !border !border-cream/10 !p-6 md:!p-10 !bg-ink !text-cream !shadow-none"
            >
              <EventCard event={event} />
            </ScrollStackItem>
          ))}
        </ScrollStack>
      ) : (
        <div className="text-center py-20 space-y-3">
          <p className="text-cream/70 text-sm">
            No upcoming events{activeCategory === 'ALL' ? ' right now.' : ' in this category.'}
          </p>
          <button
            onClick={() => setActiveCategory('ALL')}
            className="text-xs text-bronze underline underline-offset-4"
          >
            Clear filters
          </button>
        </div>
      )}

      {past.length > 0 && (
        <section className="space-y-6 border-t border-cream/10 pt-12">
          <SectionHeading eyebrow="Archive" title="Past events" />
          <div className="space-y-5">
            {past.map((event) => (
              <div key={event.id} className="rounded border border-cream/10 bg-ink p-6 md:p-10">
                <EventCard event={event} />
              </div>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
