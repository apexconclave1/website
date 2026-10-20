# Skill: Programmatic SEO

> Scalable multi-event landing page architecture and dynamic route patterns for the Apex Conclave website.

---

## When to Activate

Use this skill when:
- Creating dynamic event pages from data
- Designing URL structures for events, chambers, or categories
- Implementing `generateStaticParams` for static generation
- Building category/filter landing pages

---

## URL Architecture

```
/                           → Home page
/events                     → Events directory (filterable)
/events/diplovia-2025       → Event microsite (dynamic [slug])
/events/tech-summit-2025    → Another event microsite
/about                      → About Apex Conclave
/contact                    → Contact page
```

### Future URL Expansion
```
/events/diplovia-2025/unsc              → Chamber-specific page
/events/diplovia-2025/unsc/seats        → Seat matrix for specific chamber
/community                              → Community hub
/alumni                                 → Alumni directory
/blog                                   → Content hub
/blog/[slug]                            → Blog post
```

---

## Dynamic Route Implementation

### Static Generation of Event Pages
```tsx
// app/events/[slug]/page.tsx
import { getAllEvents, getEventBySlug } from '@/lib/data/events';

export function generateStaticParams() {
  const events = getAllEvents();
  return events.map((event) => ({
    slug: event.slug,
  }));
}

export default function EventPage({ params }: { params: { slug: string } }) {
  const event = getEventBySlug(params.slug);
  if (!event) notFound();
  return <EventMicrosite event={event} />;
}
```

### Category Landing Pages (Programmatic)
When events grow, create category-specific landing pages:
```
/events?category=mun       → All MUN events
/events?category=tech      → All Tech events
/events?status=upcoming    → All upcoming events
```

These can be server-rendered with search params:
```tsx
// app/events/page.tsx
export default function EventsPage({
  searchParams,
}: {
  searchParams: { category?: string; status?: string };
}) {
  const events = getFilteredEvents(searchParams.category, searchParams.status);
  return <EventGrid events={events} />;
}
```

---

## Slug Generation Rules

- Lowercase, hyphenated: `diplovia-2025`, `tech-summit-2025`
- Include year for recurring events
- Keep slugs short and descriptive
- Never change a slug once published (breaks SEO)
- Format: `{event-name}-{year}` or `{event-name}-{edition}`

---

## Scaling Patterns

### When to Move from Static Data to CMS
- **< 10 events**: Static data files in `lib/data/` are fine
- **10–50 events**: Consider Sanity CMS for content management
- **50+ events**: Full CMS with API routes and ISR (Incremental Static Regeneration)

### ISR for Dynamic Content
```tsx
// When using CMS, enable ISR for event pages
export const revalidate = 3600; // Revalidate every hour

export default async function EventPage({ params }) {
  const event = await fetchEventFromCMS(params.slug);
  return <EventMicrosite event={event} />;
}
```
