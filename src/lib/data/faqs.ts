export interface FaqItem {
  id: string;
  category: string;
  q: string;
  a: string;
}

export const apexFaqs: FaqItem[] = [
  {
    id: 'apex-1',
    category: 'About',
    q: 'What is Apex Conclave?',
    a: 'Apex Conclave is a student-led organisation that creates competitions and events for students across India. Diplovia, a virtual Model United Nations, is our first event; new formats are coming soon.',
  },
  {
    id: 'apex-2',
    category: 'About',
    q: 'Which events can I join right now?',
    a: 'Diplovia 2026 is our first event, on 22 and 23 November 2026. Registration is open now. New events are listed on the Events page as soon as they are announced.',
  },
  {
    id: 'apex-4',
    category: 'Partnerships',
    q: 'Can my school, college or company partner with us?',
    a: 'Yes. The Partners page lists the ways to work with us: sponsorships, college partnerships, competition challenges, judging and mentoring, and campus communities. Use the Contact page and choose Sponsorship & Partnership, and we will reply with the options.',
  },
];

export const faqsByEvent: Record<string, FaqItem[]> = {
  'diplovia-2026': [
    {
      id: 'dip-1',
      category: 'Registration',
      q: 'How do I register as a delegate?',
      a: 'Use the Register button on this page once registration opens. Fill in your details, list your committee and country preferences, submit, then pay the delegate fee by UPI. You get a tracking code straight away, and the team confirms your seat by email after checking the payment.',
    },
    {
      id: 'dip-2',
      category: 'Registration',
      q: 'What does it cost?',
      a: 'The Early Bird fee is ₹299 until 5 November 2026. From 6 November the regular fee is ₹399.',
    },
    {
      id: 'dip-3',
      category: 'Registration',
      q: 'Who can take part?',
      a: 'High school and college students, roughly ages 15 to 23. Prior Model UN experience helps but is not required.',
    },
    {
      id: 'dip-4',
      category: 'Format',
      q: 'Where and when is Diplovia held?',
      a: 'Diplovia 2026 runs over two days, 22 and 23 November 2026. It is 100% virtual, so you can join from anywhere.',
    },
    {
      id: 'dip-5',
      category: 'Committees',
      q: 'Which committees are there?',
      a: 'Five: UNSC, WHO, UNHRC, UNGA and a Historical Crisis Committee on the Cuban Missile Crisis of 1962. Agendas are listed in the Committees section.',
    },
    {
      id: 'dip-6',
      category: 'Committees',
      q: 'How are country assignments made?',
      a: 'You list a first and second choice of committee and country when you register. The team assigns seats and confirms yours by email after your payment is verified.',
    },
  ],
};
