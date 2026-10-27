import type { EventEntity } from '@/types/schema';

// Add new events here. Everything (directory, home, footer, event pages) reads from this list.
export const eventsData: EventEntity[] = [
  {
    id: 'diplovia-2026',
    slug: 'diplovia-2026',
    title: 'Diplovia 2026',
    searchTitle: 'Diplovia 2026: Virtual Model UN',
    edition: 'Virtual Edition',
    category: 'MUN',
    status: 'UPCOMING',
    location: {
      city: 'Online',
      venue: '100% Virtual (Zoom / Google Meet)',
      isVirtual: true,
    },
    shortDescription:
      'The first Apex Conclave event: a two-day virtual Model United Nations conference with five committees, open to high school and college students.',
    fullOverview:
      'Two days, five committees, all online. Delegates represent countries, negotiate, draft resolutions and respond when a crisis breaks.',
    coverImage: '/brand/diplovia-logo-light.png',
    logo: '/brand/diplovia-logo-light.png',
    brand: 'diplovia',
    // Delegate booklet cover (docs/), rendered at 200 dpi and cropped above its old printed dates; colours untouched
    posterImage: '/events/diplovia-2026-cover.jpg',
    format: 'Virtual Model United Nations · 2 days',
    // Dates confirmed by the owner on 2026-10-27. Set registrationOpensAt and registrationOpen: true when registration opens.
    startDate: '2026-11-21',
    endDate: '2026-11-22',
    registrationOpen: false,
    pricing: { regular: 399, earlyBird: 299, earlyBirdDays: 3 },
    features: [
      '5 committees: UNSC, WHO, UNHRC, UNGA and a Historical Crisis Committee',
      '2 days, 100% virtual (Zoom / Google Meet)',
      'Open to students aged 15 to 23, high school and college',
      'Certificate for every delegate, awards for the best',
    ],
  },
];

const DAY_MS = 86_400_000;

const formatDay = (iso: string, withYear: boolean) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    ...(withYear && { year: 'numeric' }),
    timeZone: 'UTC',
  });

/** "21 to 22 Nov 2026", "31 Oct to 1 Nov 2026", or "Dates to be announced" when no dates are set. */
export function formatEventDates(event: EventEntity): string {
  const { startDate, endDate } = event;
  if (!startDate) return 'Dates to be announced';
  if (!endDate || endDate === startDate) return formatDay(startDate, true);
  if (startDate.slice(0, 7) === endDate.slice(0, 7)) return `${Number(startDate.slice(8))} to ${formatDay(endDate, true)}`;
  return `${formatDay(startDate, startDate.slice(0, 4) !== endDate.slice(0, 4))} to ${formatDay(endDate, true)}`;
}

/** Fee rows for display. */
export function eventFees(event: EventEntity): { label: string; amount: string; note?: string }[] {
  const p = event.pricing;
  if (!p) return [];
  return [
    ...(p.earlyBird != null
      ? [{ label: 'Early Bird', amount: `₹${p.earlyBird}`, note: `First ${p.earlyBirdDays ?? 0} days of registration` }]
      : []),
    { label: 'Regular', amount: `₹${p.regular}` },
  ];
}

/** Fee in INR charged at `now`. Early bird runs from registrationOpensAt (IST midnight) for earlyBirdDays. */
export function feeAt(event: EventEntity, now: Date): number | null {
  const p = event.pricing;
  if (!p) return null;
  if (p.earlyBird != null && event.registrationOpensAt) {
    const earlyBirdEnds = Date.parse(`${event.registrationOpensAt}T00:00:00+05:30`) + (p.earlyBirdDays ?? 0) * DAY_MS;
    if (now.getTime() < earlyBirdEnds) return p.earlyBird;
  }
  return p.regular;
}
