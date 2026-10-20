import { SectionHeading } from '@/components/ui/SectionHeading';
import EventsDirectory from '@/components/events/EventsDirectory';

// Server-rendered; only EventsDirectory (filter + scroll stack) runs in the browser. Metadata is in ./layout.tsx.
export default function EventsPage() {
  return (
    <main id="main-content" className="max-w-container mx-auto px-4 md:px-8 pt-28 pb-16 md:pt-32 md:pb-24 space-y-12">
      <SectionHeading
        as="h1"
        eyebrow="Events Directory"
        title="Events"
        description="Everything Apex Conclave is running. New events are added here as they are announced."
      />
      <EventsDirectory />
    </main>
  );
}
