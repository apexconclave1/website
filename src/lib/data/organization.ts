import { OrganizationConfig, PartnerEntity } from '@/types/schema';

export const organizationConfig: OrganizationConfig = {
  name: 'Apex Conclave',
  tagline: 'Youth-led events where students think, compete, build and lead.',
  manifesto:
    'Apex Conclave is a youth-led events ecosystem. Conferences, simulations and competitions are how we work, but the point is what happens inside them: students stop reading about diplomacy, enterprise and policy and start practising them.',
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
      body: 'Conferences, simulations and competitions where students practise diplomacy, enterprise and policy instead of reading about them.',
    },
    {
      title: 'Who it is for',
      body: 'High school and college students across India who want a position to research, defend and negotiate.',
    },
    {
      title: 'How to take part',
      body: 'Pick an event, register online and join from anywhere. New events are listed on the Events page.',
    },
  ],
};

// Quotes from the Diplovia 2026 delegate booklet. Bios written from each person's role; edit freely.
// Website credit: not shown on the page; used in meta tags, JSON-LD and public/llms.txt only.
export const siteCredit = { name: 'Kapish Garg', url: 'https://www.linkedin.com/in/gargkapish/' };

export const leadershipTeam = [
  {
    name: 'Ayush Vishnoi',
    role: 'Founder & CEO',
    bio: 'Founded Apex Conclave and leads its direction, partnerships and events, starting with Diplovia.',
    photo: '/leadership/ayush-vishnoi.jpg',
    quote:
      'Apex Conclave exists to give students a place to practise what they usually only read about. Diplovia takes that online, so where you live doesn’t decide whether you get a seat in the room. Do the research, pick your position, and speak.',
  },
  {
    name: 'Kapish Garg',
    role: 'Co-Founder',
    bio: 'Co-founded Apex Conclave and works across its events, from planning to the delegate experience.',
    photo: '/leadership/kapish-garg.jpg',
    quote:
      'A good committee is built by delegates who listen as carefully as they speak. Bring a strong position, and be willing to move it when the argument earns it.',
  },
  {
    name: 'Vansh Jain',
    role: 'Chief Operating Officer',
    bio: 'Runs operations: the schedule, access and the online setup that keeps every committee session running.',
    photo: '/leadership/vansh-jain.jpg',
    quote:
      'Running a conference online means the details decide everything: timing, access, clarity. Our job is to make those invisible, so your only concern is your country’s position.',
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
