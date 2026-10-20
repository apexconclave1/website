import { OrganizationConfig, PartnerEntity } from '@/types/schema';

export const organizationConfig: OrganizationConfig = {
  name: 'Apex Conclave',
  tagline: 'The Premier Youth Events Ecosystem for India’s Next Generation of Leaders',
  manifesto:
    'Apex Conclave bridges the gap between classroom theory and real-world execution. We build high-velocity, intellectually rigorous platforms for the next generation of leaders, thinkers, and changemakers across India.',
  contactEmail: 'apexconclave1@gmail.com',
  socials: {
    instagram: 'https://instagram.com/apex_conclave',
    linkedin: 'https://linkedin.com/company/apex-conclave',
  },
};

// ponytail: placeholder UPI id and QR. Replace both before registration opens.
export const paymentConfig = {
  upiId: 'diplovia@demo',
  qrImage: '/payment/upi-qr.jpg',
};

export const homeContent = {
  eyebrow: 'Youth events, built by young people',
  headline: 'An umbrella for youth events.',
  summary:
    'Apex Conclave runs multiple events under one brand. Diplovia, a virtual Model United Nations, is the first.',
  moreEventsNote: 'More events will be announced here.',
  network: [
    {
      title: 'Community',
      href: '/community',
      body: 'Delegates, chairs, speakers and volunteers from schools and colleges across India.',
    },
    {
      title: 'Partners',
      href: '/partners',
      body: 'Institutions and brands that back our events and meet students inside them.',
    },
    {
      title: 'Team',
      href: '/about',
      body: 'The students who build and run Apex Conclave.',
    },
  ],
  pillars: [
    {
      title: 'What we build',
      body: 'Intellectually rigorous events that move students from classroom theory to real-world practice.',
    },
    {
      title: 'Who it is for',
      body: 'High school and college students across India: future leaders, thinkers and changemakers.',
    },
    {
      title: 'How to take part',
      body: 'Pick an event, register online and join from anywhere. New events are listed on the Events page.',
    },
  ],
};

export const leadershipTeam = [
  {
    name: 'Ayush Vishnoi',
    role: 'Founder & CEO',
    photo: '/leadership/ayush-vishnoi.jpg',
    quote:
      'Apex Conclave was built to empower young minds. With Diplovia, we are taking youth diplomacy entirely digital, removing geographic barriers to let India’s brightest minds debate without limits.',
  },
  {
    name: 'Kapish Garg',
    role: 'Co-Founder',
    photo: '/leadership/kapish-garg.png',
    quote:
      'We don’t believe in passive student fests. Our mission is to engineer high-velocity platforms that challenge students intellectually while offering our corporate partners highly interactive, trackable engagement.',
  },
  {
    name: 'Vansh Jain',
    role: 'Chief Operating Officer',
    quote:
      'Operational precision is our benchmark. By leveraging a 100% cloud-based infrastructure, Diplovia guarantees seamless execution, unmatched screen-time retention, and premium value delivery.',
  },
];

// Partner logos once confirmed. Tiers stay internal; they are not shown on the site.
export const partners: PartnerEntity[] = [];

export const partnersContent = {
  headline: 'Partner with Apex Conclave.',
  intro:
    'Our events reach high school and college students across India who choose to spend their weekends debating, negotiating and building. Partners meet them inside the event, not on a banner they walk past.',
  why: [
    {
      title: 'Inside the room',
      body: 'Our events run online. Your brand sits in the committee backdrop and on screen during live sessions, where delegates are looking all day.',
    },
    {
      title: 'A focused audience',
      body: 'Students aged 15 to 23 from schools and colleges across India, selected for events that ask them to research, speak and lead.',
    },
    {
      title: 'Built with you',
      body: 'Packages are shaped around your goals: visibility, recruitment, product trials or awards. Cash or in kind.',
    },
  ],
  placements: [
    'Naming of a committee or of the event',
    'Logo on committee backdrops and slides',
    'Short brand video between sessions',
    'Logo on every participation certificate',
    'Awards and prizes for top delegates',
    'Joint posts on Instagram and LinkedIn',
  ],
};

export const communityContent = {
  headline: 'The people who show up.',
  intro:
    'Apex Conclave is more than its events. It is the students who take part, the chairs who run the rooms, and the team that builds the platform between events.',
  groups: [
    {
      title: 'Delegates',
      body: 'High school and college students who research a position, defend it under time pressure and negotiate with people who disagree.',
    },
    {
      title: 'Speakers and dais',
      body: 'Chairs, crisis directors and guest speakers who run committees and push delegates. Names for each event are announced on its page.',
    },
    {
      title: 'Volunteers and campus ambassadors',
      body: 'Students who help run events and bring Apex Conclave to their school or college.',
    },
  ],
};
