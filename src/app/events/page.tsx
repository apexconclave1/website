import EventsDirectory from '@/components/events/EventsDirectory';
import { PageHeader } from '@/components/ui/PageHeader';

// Server-rendered; only EventsDirectory (category filter) runs in the browser. Metadata is in ./layout.tsx.
export default function EventsPage() {
  return (
    <main id="main-content">
      <PageHeader eyebrow="Events" title="What’s on." aside={<p>Everything Apex Conclave is running. New events are added here as they are announced.</p>} />
      <div className="mx-auto max-w-container space-y-14 px-6 py-16 md:py-24">
        <EventsDirectory />
      </div>
    </main>
  );
}
