import { Metadata } from 'next';
import Link from 'next/link';
import { eventsData } from '@/lib/data/events';
import { chambersData } from '@/lib/data/chambers';
import { Suspense } from 'react';
import RegistrationWizard from '@/components/features/registration/RegistrationWizard';
import { ShieldCheck, Calendar, Globe } from 'lucide-react';

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
    <main
      style={{
        minHeight: '100vh',
        padding: '7rem 1.5rem 5rem',
        background: 'transparent',
        position: 'relative',
        zIndex: 2,
      }}
    >
      <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
        {/* Page Header */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              padding: '0.35rem 0.85rem',
              borderRadius: '20px',
              backgroundColor: 'rgba(199, 161, 106, 0.12)',
              border: '1px solid rgba(199, 161, 106, 0.25)',
              marginBottom: '1rem',
            }}
          >
            <ShieldCheck size={13} color="#C7A16A" />
            <span
              style={{
                fontFamily: "var(--font-inter), system-ui, sans-serif",
                fontSize: '0.6875rem',
                fontWeight: 700,
                letterSpacing: '0.12em',
                color: '#C7A16A',
                textTransform: 'uppercase',
              }}
            >
              {event.title} · Delegate registration
            </span>
          </div>

          <h1
            style={{
              fontFamily: "var(--font-inter), system-ui, sans-serif",
              fontWeight: 400,
              fontSize: 'clamp(2.25rem, 4.5vw, 3.25rem)',
              letterSpacing: '-0.01em',
              color: '#F4F1EA',
              lineHeight: 1.15,
              marginBottom: '1rem',
            }}
          >
            Delegate Registration
          </h1>

          <p
            style={{
              fontFamily: "var(--font-inter), system-ui, sans-serif",
              fontSize: '0.9375rem',
              color: '#9A9490',
              maxWidth: '620px',
              margin: '0 auto',
              lineHeight: 1.7,
            }}
          >
            List your committee and country preferences across the {committeeCount} committees. The team reviews applications and assigns seats after payment is verified.
          </p>
        </div>

        {/* Multi-Step Wizard Wrapped in Suspense */}
        <Suspense
          fallback={
            <div
              style={{
                textAlign: 'center',
                padding: '4rem',
                color: '#C7A16A',
                fontFamily: "var(--font-inter), system-ui, sans-serif",
              }}
            >
              Loading registration...
            </div>
          }
        >
          <RegistrationWizard />
        </Suspense>
      </div>
    </main>
  );
}
