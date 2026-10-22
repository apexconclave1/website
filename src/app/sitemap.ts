import type { MetadataRoute } from 'next';
import { eventsData } from '@/lib/data/events';
import { siteUrl } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ['', '/events', '/about', '/verticals', '/community', '/partners', '/contact', '/faq', '/terms'];
  return [
    ...pages.map((path) => ({ url: `${siteUrl}${path}`, changeFrequency: 'weekly' as const, priority: path ? 0.7 : 1 })),
    ...eventsData.map((e) => ({ url: `${siteUrl}/events/${e.slug}`, changeFrequency: 'weekly' as const, priority: 0.9 })),
  ];
}
