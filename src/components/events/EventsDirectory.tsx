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
      <div className="space-y-4 border-b border-[#1a1e20] pb-6">
        {/* Category Filter */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs uppercase tracking-widest text-muted-grey font-medium w-16 shrink-0">
            Type
          </span>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setActiveCategory(cat.value)}
              className={`px-4 py-1.5 rounded text-xs font-semibold uppercase tracking-wider transition-colors ${
                activeCategory === cat.value
                  ? 'bg-soft-white text-bg'
                  : 'bg-surface border border-[#212527] text-muted-grey hover:text-soft-white hover:border-[#353c40]'
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
          className="[&_.scroll-stack-inner]:!min-h-0 [&_.scroll-stack-inner]:!px-0 [&_.scroll-stack-inner]:!pb-24 [&_.scroll-stack-inner]:!pt-0"
        >
          {filtered.map((event) => (
            <ScrollStackItem
              key={event.id}
              itemClassName="!h-auto !rounded-[12px] !p-6 md:!p-10 border border-line bg-surface"
            >
              <EventCard event={event} />
            </ScrollStackItem>
          ))}
        </ScrollStack>
      ) : (
        <div className="text-center py-20 space-y-3">
          <p className="text-muted-grey text-sm">
            No upcoming events{activeCategory === 'ALL' ? ' right now.' : ' in this category.'}
          </p>
          <button
            onClick={() => setActiveCategory('ALL')}
            className="text-xs text-warm-bronze underline underline-offset-4"
          >
            Clear filters
          </button>
        </div>
      )}

      {past.length > 0 && (
        <section className="space-y-6 border-t border-[#141718] pt-12">
          <SectionHeading eyebrow="Archive" title="Past events" />
          <div className="space-y-5">
            {past.map((event) => (
              <div key={event.id} className="rounded-[12px] border border-line bg-surface p-6 md:p-10">
                <EventCard event={event} />
              </div>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
