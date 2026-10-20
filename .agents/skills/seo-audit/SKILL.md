# Skill: SEO Audit

> Event JSON-LD structured data, OpenGraph tags, Twitter Cards, and technical SEO patterns for the Apex Conclave website.

---

## When to Activate

Use this skill when:
- Adding or updating meta tags on any page
- Implementing structured data (JSON-LD)
- Optimizing for social sharing previews (OG/Twitter)
- Reviewing technical SEO compliance

---

## Meta Tag Templates

### Organization (Home Page)
```tsx
// app/layout.tsx or app/page.tsx
export const metadata = {
  title: 'Apex Conclave — Where Visionary Minds Converge',
  description: 'Apex Conclave is the umbrella organization for premier events, conferences, and youth initiatives including Diplovia MUN.',
  keywords: ['Apex Conclave', 'MUN', 'Diplovia', 'Youth Conference', 'Leadership Summit'],
  openGraph: {
    title: 'Apex Conclave',
    description: 'Where visionary minds converge to shape what\'s next.',
    url: 'https://apexconclave.org',
    siteName: 'Apex Conclave',
    type: 'website',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Apex Conclave',
    description: 'Where visionary minds converge to shape what\'s next.',
    images: ['/og-image.png'],
  },
};
```

### Event Detail Page
```tsx
// app/events/[slug]/page.tsx
export async function generateMetadata({ params }) {
  const event = getEventBySlug(params.slug);
  return {
    title: `${event.title} — Apex Conclave`,
    description: event.shortDescription,
    openGraph: {
      title: event.title,
      description: event.shortDescription,
      type: 'article',
      images: [{ url: event.heroBanner, width: 1200, height: 630 }],
    },
  };
}
```

---

## JSON-LD Structured Data

### Organization Schema (Home Page)
```tsx
const orgJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Apex Conclave',
  url: 'https://apexconclave.org',
  logo: 'https://apexconclave.org/logo.png',
  description: 'Umbrella organization for premier events, conferences, and youth initiatives.',
  sameAs: [
    'https://instagram.com/apexconclave',
    'https://linkedin.com/company/apexconclave',
  ],
};

// In page component:
<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />
```

### Event Schema (Event Detail Pages)
```tsx
const eventJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Event',
  name: event.title,
  description: event.shortDescription,
  startDate: event.startDate,
  endDate: event.endDate,
  location: {
    '@type': event.location.isVirtual ? 'VirtualLocation' : 'Place',
    name: event.location.venue,
    address: { '@type': 'PostalAddress', addressLocality: event.location.city },
  },
  organizer: {
    '@type': 'Organization',
    name: 'Apex Conclave',
    url: 'https://apexconclave.org',
  },
  eventStatus: 'https://schema.org/EventScheduled',
  eventAttendanceMode: event.location.isVirtual
    ? 'https://schema.org/OnlineEventAttendanceMode'
    : 'https://schema.org/OfflineEventAttendanceMode',
  image: event.heroBanner,
  offers: {
    '@type': 'Offer',
    availability: event.registrationOpen
      ? 'https://schema.org/InStock'
      : 'https://schema.org/SoldOut',
  },
};
```

---

## Technical SEO Checklist

- [ ] Every page has a unique `<title>` tag
- [ ] Every page has a `<meta name="description">` (120–160 characters)
- [ ] Single `<h1>` per page with clear hierarchy (`h1` > `h2` > `h3`)
- [ ] All images have descriptive `alt` attributes
- [ ] All links have meaningful anchor text (not "click here")
- [ ] `robots.txt` allows search engine crawling
- [ ] `sitemap.xml` generated for all public pages
- [ ] Canonical URLs set for all pages
- [ ] No broken internal links (404s)
- [ ] Page load time under 3 seconds
- [ ] Mobile-friendly responsive layout

---

## Robots & Sitemap

### `public/robots.txt`
```
User-agent: *
Allow: /
Sitemap: https://apexconclave.org/sitemap.xml
```

### `app/sitemap.ts`
```tsx
import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const events = getAllEvents();
  return [
    { url: 'https://apexconclave.org', lastModified: new Date() },
    { url: 'https://apexconclave.org/events', lastModified: new Date() },
    { url: 'https://apexconclave.org/about', lastModified: new Date() },
    { url: 'https://apexconclave.org/contact', lastModified: new Date() },
    ...events.map(event => ({
      url: `https://apexconclave.org/events/${event.slug}`,
      lastModified: new Date(),
    })),
  ];
}
```
