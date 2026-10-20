import { EventEntity } from '@/types/schema';

// Add new events here. Everything (directory, home, footer, event pages) reads from this list.
export const eventsData: EventEntity[] = [
  {
    id: 'diplovia-2026',
    slug: 'diplovia-2026',
    title: 'Diplovia 2026',
    edition: 'Virtual Edition',
    category: 'MUN',
    status: 'UPCOMING',
    startDate: '2026-10-31',
    endDate: '2026-11-01',
    location: {
      city: 'Online',
      venue: '100% Virtual (Zoom / Google Meet)',
      isVirtual: true,
    },
    shortDescription:
      'The first Apex Conclave event: a two-day virtual Model United Nations conference with five committees, open to high school and college students.',
    fullOverview:
      'Over two days, delegates step into the shoes of global diplomats, ministers, and health officials across five committees. Facing high-stakes geopolitical crises, they negotiate, draft resolutions, and defend complex policies without geographical barriers.',
    coverImage: '/assets/Diplovia_logo_final.png',
    registrationOpen: true,
    fees: [
      { label: 'Early Bird', amount: '₹299', note: 'First 3 days of registration' },
      { label: 'Regular', amount: '₹399' },
    ],
    features: [
      '5 committees: UNSC, WHO, UNHRC, UNGA and a Historical Crisis Committee',
      '2 days, 100% virtual (Zoom / Google Meet)',
      'Open to students aged 15 to 23, high school and college',
      'QR delegate pass',
    ],
  },
];
