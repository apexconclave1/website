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
      venue: '100% Virtual',
      isVirtual: true,
    },
    shortDescription:
      'The first Apex Conclave event: a two-day virtual Model United Nations conference with five committees, open to high school and college students.',
    fullOverview:
      'Two days, five committees, all online. Delegates represent countries, negotiate, draft resolutions and respond when a crisis breaks.',
    coverImage: '/brand/diplovia-logo-light.png',
    logo: '/brand/diplovia-logo-light.png',
    brand: 'diplovia',
    // The event's logo, shown as its visible name on the event page, home band and events card
    posterImage: '/brand/diplovia-logo-light.png',
    format: 'Virtual Model United Nations · 2 days',
    // Dates moved by the owner to 22 and 23 Nov (2026-10-30). Registration opened 2026-10-30: early bird ₹299 to 5 Nov
    // (7 days), then ₹399; coupons (DIPFRIEND) only on the regular fee.
    startDate: '2026-11-22',
    endDate: '2026-11-23',
    registrationOpensAt: '2026-10-30',
    registrationOpen: true,
    pricing: { regular: 399, earlyBird: 299, earlyBirdDays: 7 },
    features: [
      '5 committees: UNSC, WHO, UNHRC, UNGA and a Historical Crisis Committee',
      '2 days, 100% virtual',
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
      ? [{ label: 'Early Bird', amount: `₹${p.earlyBird}`, note: earlyBirdNote(event) }]
      : []),
    { label: 'Regular', amount: `₹${p.regular}` },
  ];
}

/** "Until 5 Nov" (last early-bird day) once the opening date is set, else "First 7 days of registration". */
function earlyBirdNote(event: EventEntity): string {
  const days = event.pricing?.earlyBirdDays ?? 0;
  if (!event.registrationOpensAt) return `First ${days} days of registration`;
  const lastDay = new Date(Date.parse(`${event.registrationOpensAt}T00:00:00Z`) + (days - 1) * DAY_MS).toISOString().slice(0, 10);
  return `Until ${formatDay(lastDay, false)}`;
}

/** Coupons apply to the regular fee only, never on top of the early bird (owner, 2026-10-30). */
export function couponsAllowed(event: EventEntity, fee: number): boolean {
  return !!event.pricing && fee >= event.pricing.regular;
}

/** When the early bird ends (ms): it runs from registrationOpensAt (IST midnight) for earlyBirdDays. Null without one. */
export function earlyBirdEndsAt(event: EventEntity): number | null {
  const p = event.pricing;
  if (p?.earlyBird == null || !event.registrationOpensAt) return null;
  return Date.parse(`${event.registrationOpensAt}T00:00:00+05:30`) + (p.earlyBirdDays ?? 0) * DAY_MS;
}

/** Fee in INR charged at `now`. */
export function feeAt(event: EventEntity, now: Date): number | null {
  const p = event.pricing;
  if (!p) return null;
  const ends = earlyBirdEndsAt(event);
  return ends !== null && now.getTime() < ends ? (p.earlyBird ?? p.regular) : p.regular;
}
