# Skill: Sanity Best Practices

> Sanity CMS schema modeling, GROQ queries, and integration patterns for the Apex Conclave website.

> **Note**: This skill is for **future CMS integration**. The initial build uses static data files. When migrating to Sanity, follow these patterns.

---

## When to Activate

Use this skill when:
- Migrating from static data to Sanity CMS
- Designing content schemas for events, chambers, and seats
- Writing GROQ queries for data fetching
- Setting up Sanity Studio for content editors

---

## Schema Modeling

### Event Schema
```typescript
// sanity/schemas/event.ts
export default {
  name: 'event',
  title: 'Event',
  type: 'document',
  fields: [
    { name: 'title', type: 'string', title: 'Event Title' },
    { name: 'slug', type: 'slug', title: 'Slug', options: { source: 'title' } },
    { name: 'edition', type: 'string', title: 'Edition' },
    {
      name: 'category',
      type: 'string',
      title: 'Category',
      options: { list: ['MUN', 'LEADERSHIP', 'TECH', 'BUSINESS', 'CULTURAL'] },
    },
    {
      name: 'status',
      type: 'string',
      title: 'Status',
      options: { list: ['UPCOMING', 'LIVE', 'COMPLETED', 'ARCHIVED'] },
    },
    { name: 'startDate', type: 'date', title: 'Start Date' },
    { name: 'endDate', type: 'date', title: 'End Date' },
    {
      name: 'location',
      type: 'object',
      fields: [
        { name: 'city', type: 'string' },
        { name: 'venue', type: 'string' },
        { name: 'isVirtual', type: 'boolean' },
      ],
    },
    { name: 'shortDescription', type: 'text', title: 'Short Description' },
    { name: 'fullOverview', type: 'blockContent', title: 'Full Overview' },
    { name: 'coverImage', type: 'image', title: 'Cover Image' },
    { name: 'heroBanner', type: 'image', title: 'Hero Banner' },
    { name: 'registrationOpen', type: 'boolean', title: 'Registration Open' },
    { name: 'features', type: 'array', of: [{ type: 'string' }] },
  ],
};
```

### Chamber Schema
```typescript
// sanity/schemas/chamber.ts
export default {
  name: 'chamber',
  title: 'Chamber / Committee',
  type: 'document',
  fields: [
    { name: 'event', type: 'reference', to: [{ type: 'event' }] },
    { name: 'code', type: 'string', title: 'Code (e.g., UNSC)' },
    { name: 'name', type: 'string', title: 'Full Name' },
    { name: 'topic', type: 'text', title: 'Agenda Topic' },
    { name: 'executiveBoard', type: 'text', title: 'Executive Board' },
    { name: 'totalSeats', type: 'number', title: 'Total Seats' },
    { name: 'bannerImage', type: 'image' },
    { name: 'studyGuidePdf', type: 'file', title: 'Study Guide PDF' },
    { name: 'displayOrder', type: 'number' },
  ],
};
```

---

## GROQ Query Patterns

### Fetch All Upcoming Events
```groq
*[_type == "event" && status == "UPCOMING"] | order(startDate asc) {
  _id,
  title,
  "slug": slug.current,
  category,
  status,
  startDate,
  endDate,
  location,
  shortDescription,
  "coverImage": coverImage.asset->url,
  registrationOpen
}
```

### Fetch Single Event with Chambers
```groq
*[_type == "event" && slug.current == $slug][0] {
  ...,
  "coverImage": coverImage.asset->url,
  "heroBanner": heroBanner.asset->url,
  "chambers": *[_type == "chamber" && references(^._id)] | order(displayOrder asc) {
    _id,
    code,
    name,
    topic,
    executiveBoard,
    totalSeats,
    "bannerImage": bannerImage.asset->url,
    "studyGuidePdfUrl": studyGuidePdf.asset->url
  }
}
```

---

## Migration Checklist

When moving from static data to Sanity:

- [ ] Set up Sanity project and install `@sanity/client`
- [ ] Create all schemas (event, chamber, leader, partner)
- [ ] Migrate static data from `lib/data/` to Sanity Studio
- [ ] Replace static data imports with GROQ queries
- [ ] Update `generateStaticParams` to fetch slugs from Sanity
- [ ] Set up ISR (`revalidate`) for dynamic content
- [ ] Keep Firestore for seat status and applications (real-time data stays in Firebase)
- [ ] Test all pages with CMS data
