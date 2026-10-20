import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';

// Metadata for /events; event pages set their own in generateMetadata.
export const metadata: Metadata = pageMetadata(
  'Events',
  'All Apex Conclave events, upcoming and past. Start with Diplovia 2026, a two-day virtual Model United Nations for high school and college students.',
  '/events',
);

export default function EventsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
