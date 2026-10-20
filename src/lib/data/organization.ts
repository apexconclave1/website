import { OrganizationConfig } from '@/types/schema';

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
