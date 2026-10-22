import EventsDirectory from '@/components/events/EventsDirectory';

// Server-rendered; only EventsDirectory (filter + scroll stack) runs in the browser. Metadata is in ./layout.tsx.
export default function EventsPage() {
  return (
    <main id="main-content" className="mx-auto max-w-container space-y-14 px-6 pb-16 pt-28 md:pb-24 md:pt-36">
      <header className="grid gap-8 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-7">
          <p className="eyebrow mb-5">Events</p>
          <h1 className="text-[2.625rem] font-normal leading-[1.04] text-bright md:text-6xl">What’s on.</h1>
        </div>
        <p className="max-w-[48ch] text-base leading-relaxed text-soft md:text-lg lg:col-span-5">
          Everything Apex Conclave is running. New events are added here as they are announced.
        </p>
      </header>
      <EventsDirectory />
    </main>
  );
}
