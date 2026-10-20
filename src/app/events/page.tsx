'use client';

import React, { useState } from 'react';
import { eventsData } from '@/lib/data/events';
import { EventCard } from '@/components/EventCard';
import { SectionHeading } from '@/components/ui/SectionHeading';
import ScrollStack, { ScrollStackItem } from '@/components/ui/ScrollStack';
import { EventCategory, EventStatus } from '@/types/schema';

const CATEGORIES: { label: string; value: EventCategory | 'ALL' }[] = [
  { label: 'All Events', value: 'ALL' },
  { label: 'MUN', value: 'MUN' },
  { label: 'Tech', value: 'TECH' },
  { label: 'Leadership', value: 'LEADERSHIP' },
  { label: 'Business', value: 'BUSINESS' },
  { label: 'Cultural', value: 'CULTURAL' },
];

const STATUSES: { label: string; value: EventStatus | 'ALL' }[] = [
  { label: 'All', value: 'ALL' },
  { label: 'Upcoming', value: 'UPCOMING' },
  { label: 'Live', value: 'LIVE' },
  { label: 'Completed', value: 'COMPLETED' },
];

export default function EventsPage() {
  const [activeCategory, setActiveCategory] = useState<EventCategory | 'ALL'>('ALL');
  const [activeStatus, setActiveStatus] = useState<EventStatus | 'ALL'>('ALL');

  const filtered = eventsData.filter((event) => {
    const catMatch = activeCategory === 'ALL' || event.category === activeCategory;
    const statusMatch = activeStatus === 'ALL' || event.status === activeStatus;
    return catMatch && statusMatch;
  });

  return (
    <div className="max-w-container mx-auto px-4 md:px-8 pt-28 pb-16 md:pt-32 md:pb-24 space-y-12">
      {/* Header */}
      <SectionHeading
        eyebrow="Events Directory"
        title="Events"
        description="Everything Apex Conclave is running. New events are added here as they are announced."
      />

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

        {/* Status Filter */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs uppercase tracking-widest text-muted-grey font-medium w-16 shrink-0">
            Status
          </span>
          {STATUSES.map((s) => (
            <button
              key={s.value}
              onClick={() => setActiveStatus(s.value)}
              className={`px-4 py-1.5 rounded text-xs font-semibold uppercase tracking-wider transition-colors ${
                activeStatus === s.value
                  ? 'bg-soft-white text-bg'
                  : 'bg-surface border border-[#212527] text-muted-grey hover:text-soft-white hover:border-[#353c40]'
              }`}
            >
              {s.label}
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
              itemClassName="!h-auto !rounded-[12px] !p-6 md:!p-10 border border-[#1a1d1e] bg-surface"
            >
              <EventCard event={event} />
            </ScrollStackItem>
          ))}
        </ScrollStack>
      ) : (
        <div className="text-center py-20 space-y-3">
          <p className="text-muted-grey text-sm">
            No events match the selected filters.
          </p>
          <button
            onClick={() => { setActiveCategory('ALL'); setActiveStatus('ALL'); }}
            className="text-xs text-warm-bronze underline underline-offset-4"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}
