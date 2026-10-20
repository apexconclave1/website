import { Metadata } from 'next';
import Link from 'next/link';
import { eventsData } from '@/lib/data/events';
import { chambersData } from '@/lib/data/chambers';
import { Suspense } from 'react';
import RegistrationWizard from '@/components/features/registration/RegistrationWizard';

export const metadata: Metadata = {
  title: 'Register | Apex Conclave',
  description:
    'Register as a delegate for Diplovia 2026. Pick a committee and country portfolio. Open to high school and college students.',
  openGraph: {
    title: 'Register | Apex Conclave',
    description:
      'Register as a delegate for Diplovia 2026. Pick a committee and country portfolio. Open to high school and college students.',
  },
};

export default function RegisterPage({ searchParams }: { searchParams: { event?: string } }) {
  const event = eventsData.find((e) => e.slug === searchParams.event) ?? eventsData[0];
  const committeeCount = chambersData.filter((c) => c.eventId === event.id).length;

  if (!event.registrationOpen) {
    return (
      <main className="mx-auto max-w-[720px] px-6 pb-24 pt-36 text-center">
        <p className="mb-3 text-xs font-medium uppercase tracking-[0.18em] text-warm-bronze">{event.title}</p>
        <h1 className="text-3xl font-bold text-soft-white md:text-4xl">Registration opens soon.</h1>
        <p className="mt-4 text-base text-muted-grey">
          Dates and the registration window will be announced on the event page and on our Instagram.
        </p>
        <Link
          href={`/events/${event.slug}`}
          className="mt-8 inline-flex items-center rounded-[10px] border border-soft-white px-6 py-3 text-sm font-medium text-soft-white transition-opacity duration-200 hover:opacity-90"
        >
          View {event.title}
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-[1240px] px-6 pb-20 pt-28">
      <div className="mb-14 text-center">
        <p className="eyebrow mb-4">{event.title} · Delegate registration</p>
        <h1 className="mb-4 text-4xl font-bold text-soft-white md:text-5xl">Register</h1>
        <p className="mx-auto max-w-[620px] text-base leading-relaxed text-muted-grey">
          List your committee and country preferences across the {committeeCount} committees. The team reviews applications
          and assigns seats after payment is verified.
        </p>
      </div>

      <Suspense fallback={<p className="p-16 text-center text-muted-grey">Loading registration…</p>}>
        <RegistrationWizard />
      </Suspense>
    </main>
  );
}
