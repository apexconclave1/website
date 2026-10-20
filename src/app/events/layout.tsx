import type { Metadata } from 'next';

// /events/page.tsx is a client component, so its metadata lives here.
export const metadata: Metadata = {
  title: { absolute: 'Events | Apex Conclave', template: '%s | Apex Conclave' },
  description: 'Every event run by Apex Conclave, upcoming and past.',
};

export default function EventsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
