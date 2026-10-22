import type { Metadata } from 'next';
import type { EventEntity } from '@/types/schema';
import type { FaqItem } from '@/lib/data/faqs';
import { organizationConfig, siteCredit } from '@/lib/data/organization';
import { feeAt } from '@/lib/data/events';
import { siteUrl } from '@/lib/site';

const shareImage = { url: '/opengraph-image.png', width: 1200, height: 630, alt: 'Apex Conclave' };

/**
 * Title, description, canonical and link preview for one page. Next.js merges metadata shallowly
 * (a page's openGraph replaces the layout's, image included), so the preview is rebuilt in full here.
 * Page metadata beats a route's opengraph-image file, so a page with its own image passes its URL here.
 */
export function pageMetadata(title: string, description: string, path: string, imageUrl?: string): Metadata {
  const name = organizationConfig.name;
  const fullTitle = title === name ? name : `${title} | ${name}`;
  const image = imageUrl ? { ...shareImage, url: imageUrl, alt: title } : shareImage;
  return {
    title: { absolute: fullTitle },
    description,
    alternates: { canonical: path },
    openGraph: { title: fullTitle, description, url: path, type: 'website', locale: 'en_IN', siteName: name, images: [image] },
    twitter: { card: 'summary_large_image', title: fullTitle, description, images: [image.url] },
  };
}

// Schema.org objects rendered with <JsonLd />.

export const organizationSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: organizationConfig.name,
  description: organizationConfig.description,
  url: siteUrl,
  logo: `${siteUrl}/brand/apex-conclave-logo-dark.png`,
  email: organizationConfig.contactEmail,
  sameAs: Object.values(organizationConfig.socials).filter(Boolean),
});

/** WebSite with its creator, so search engines and AI agents know who built it (not shown on the page). */
export const websiteSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: organizationConfig.name,
  url: siteUrl,
  publisher: { '@type': 'Organization', name: organizationConfig.name },
  creator: { '@type': 'Person', name: siteCredit.name, url: siteCredit.url, jobTitle: 'Co-Founder, Apex Conclave' },
});

export const faqSchema = (items: FaqItem[]) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: items.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
});

export const breadcrumbSchema = (items: { name: string; href: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((c, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: c.name,
    item: `${siteUrl}${c.href}`,
  })),
});

/** Event schema needs a start date, so it returns null until dates are announced. */
export const eventSchema = (event: EventEntity) => {
  if (!event.startDate) return null;
  const fee = feeAt(event, new Date());
  return {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: event.title,
    description: event.shortDescription,
    startDate: event.startDate,
    endDate: event.endDate ?? event.startDate,
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: event.location.isVirtual
      ? 'https://schema.org/OnlineEventAttendanceMode'
      : 'https://schema.org/OfflineEventAttendanceMode',
    location: event.location.isVirtual
      ? { '@type': 'VirtualLocation', url: `${siteUrl}/events/${event.slug}` }
      : { '@type': 'Place', name: event.location.venue, address: event.location.city },
    image: [`${siteUrl}/events/${event.slug}/opengraph-image`],
    organizer: { '@type': 'Organization', name: organizationConfig.name, url: siteUrl },
    ...(fee !== null && {
      offers: {
        '@type': 'Offer',
        price: fee,
        priceCurrency: 'INR',
        url: `${siteUrl}/register?event=${event.slug}`,
        availability: event.registrationOpen ? 'https://schema.org/InStock' : 'https://schema.org/PreOrder',
      },
    }),
  };
};
