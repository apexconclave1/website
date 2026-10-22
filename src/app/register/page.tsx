import { Metadata } from 'next';
import Link from 'next/link';
import { eventsData } from '@/lib/data/events';
import { chambersData } from '@/lib/data/chambers';
import { pageMetadata } from '@/lib/seo';
import { Suspense } from 'react';
import RegistrationWizard from '@/components/features/registration/RegistrationWizard';

// Kept out of search with noindex (not a robots.txt block, which would hide the noindex from Google)
export const metadata: Metadata = {
  ...pageMetadata(
    'Register',
    'Register as a delegate for Diplovia 2026. Pick a committee and country portfolio. Open to high school and college students.',
    '/register',
  ),
  robots: { index: false, follow: true },
};

export default function RegisterPage({ searchParams }: { searchParams: { event?: string } }) {
  const event = eventsData.find((e) => e.slug === searchParams.event) ?? eventsData[0];
  const committeeCount = chambersData.filter((c) => c.eventId === event.id).length;

  if (!event.registrationOpen) {
    return (
      <main id="main-content" className="mx-auto max-w-[720px] px-6 pb-24 pt-36 text-center">
        <p className="eyebrow mb-5">{event.title}</p>
        <h1 className="text-4xl font-normal text-cream md:text-5xl">Registration opens soon.</h1>
        <p className="mt-4 text-base text-cream/70">
          Dates and the registration window will be announced on the event page and on our Instagram.
        </p>
        <Link
          href={`/events/${event.slug}`}
          className="mt-8 btn-secondary"
        >
          View {event.title}
        </Link>
      </main>
    );
  }

  return (
    <main id="main-content" className="mx-auto max-w-container px-6 pb-20 pt-28">
      <div className="mb-14 text-center">
        <p className="eyebrow mb-4">{event.title} · Delegate registration</p>
        <h1 className="mb-4 text-5xl font-normal text-cream md:text-6xl">Register</h1>
        <p className="mx-auto max-w-[620px] text-base leading-relaxed text-cream/70">
          List your committee and country preferences across the {committeeCount} committees. The team reviews applications
          and assigns seats after payment is verified.
        </p>
      </div>

      <Suspense
        fallback={
          <div role="status" aria-label="Loading registration" className="mx-auto max-w-[820px] rounded border border-cream/10 bg-ink p-6 md:p-10">
            <div className="mb-8 grid grid-cols-5 gap-2 border-b border-cream/20 pb-8">
              {Array.from({ length: 5 }, (_, i) => (
                <span key={i} className="h-[3px] rounded-full bg-cream/20" />
              ))}
            </div>
            <div className="space-y-5 motion-safe:animate-pulse">
              <div className="h-6 w-40 rounded-sm bg-cream/10" />
              <div className="grid grid-cols-2 gap-5">
                {Array.from({ length: 6 }, (_, i) => (
                  <div key={i} className="h-12 rounded-sm bg-cream/10" />
                ))}
              </div>
            </div>
          </div>
        }
      >
        <RegistrationWizard />
      </Suspense>
    </main>
  );
}
