import { OrganizationConfig, PartnerEntity } from '@/types/schema';

export const organizationConfig: OrganizationConfig = {
  name: 'Apex Conclave',
  description:
    'Apex Conclave creates platforms for students to compete, collaborate and showcase their abilities across business, technology, diplomacy, debate and more.',
  contactEmail: 'apexconclave1@gmail.com',
  socials: {
    instagram: 'https://instagram.com/apex_conclave',
    linkedin: 'https://linkedin.com/company/apex-conclave',
  },
};

// Partnership enquiries: contact form with the topic preselected
export const partnerEnquiryHref = `/contact?category=${encodeURIComponent('Sponsorship & Partnership')}`;
/** Same form with the subject naming the collaboration type */
export const partnerEnquiryFor = (title: string) => `${partnerEnquiryHref}&subject=${encodeURIComponent(`Partnership: ${title}`)}`;

// ponytail: placeholder UPI id and QR. Replace both before registration opens.
export const paymentConfig = {
  upiId: 'diplovia@demo',
  qrImage: '/payment/upi-qr.jpg',
};

export const homeContent = {
  // The hero shows this in three lines (components/home/HeroSection.tsx); keep both in sync
  headline: 'A bigger stage for a bolder generation.',
  summary:
    'Apex Conclave creates platforms for students to compete, collaborate and showcase their abilities through experiences spanning business, technology, diplomacy, debate and more.',
  about: {
    headline: 'More than events. A platform for what’s next.',
    body: 'Apex Conclave creates platforms for students to challenge themselves, develop practical skills and connect with ambitious peers. Through competitions, conferences and collaborative experiences across multiple disciplines, we aim to make participation meaningful, competition fair and opportunities more accessible.',
    ideas: [
      { title: 'Experience', body: 'Learn by participating in practical challenges.' },
      { title: 'Competition', body: 'Test ideas, analytical thinking and execution.' },
      { title: 'Community', body: 'Connect with students, colleges, judges and industry.' },
      { title: 'Opportunity', body: 'Create meaningful exposure through events and partnerships.' },
    ],
  },
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
    linkedin: 'https://www.linkedin.com/in/ayush-vishnoi-53394135b/',
    quote:
      'Apex Conclave exists to give students a place to practise what they usually only read about. Diplovia takes that online, so where you live doesn’t decide whether you get a seat in the room. Do the research, pick your position, and speak.',
  },
  {
    name: 'Kapish Garg',
    role: 'Co-Founder',
    bio: 'Co-founded Apex Conclave and works across its events, from planning to the delegate experience.',
    photo: '/leadership/kapish-garg.jpg',
    linkedin: siteCredit.url,
    quote:
      'A good committee is built by delegates who listen as carefully as they speak. Bring a strong position, and be willing to move it when the argument earns it.',
  },
  {
    name: 'Vansh Jain',
    role: 'Chief Operating Officer',
    bio: 'Runs operations: the schedule, access and the online setup that keeps every committee session running.',
    photo: '/leadership/vansh-jain.jpg',
    linkedin: 'https://www.linkedin.com/in/vansh-jain-939a5b349/',
    quote:
      'Running a conference online means the details decide everything: timing, access, clarity. Our job is to make those invisible, so your only concern is your country’s position.',
  },
];

// "How we run events" next to the team on home (owner-approved commitments, 2026-10-22)
export const operatingStandards = [
  { title: 'Student-led', body: 'Run by students, for students.' },
  { title: 'Clear rules up front', body: 'Format, fees and allotment explained before you register.' },
  { title: 'Fair competition', body: 'Published criteria and an impartial dais or panel.' },
  { title: 'We reply', body: 'Every message answered within 48 hours.' },
];

// Partner logos once confirmed. Tiers stay internal; they are not shown on the site.
export const partners: PartnerEntity[] = [];

export const partnersContent = {
  headline: 'Let’s build what’s next, together.',
  intro:
    'Apex Conclave aims to work with schools, colleges, student communities, organisations and brands to create competitions and experiences for students. If you want to back an event, set a challenge or help run one, we would like to hear from you.',
  // The five ways to work with us. Each 'Enquire' link opens the contact form with the title as its subject.
  collaborations: [
    {
      title: 'Event sponsorships',
      body: 'Support an event as a sponsor, in cash or in kind, with visibility shaped around your goals.',
    },
    {
      title: 'Institutional and college partnerships',
      body: 'Co-host an event with your institution, bring your students in, or run an Apex Conclave event on your campus.',
    },
    {
      title: 'Sponsored competition challenges',
      body: 'Set a real problem from your organisation as a case, hackathon brief or pitch challenge, and see how students solve it.',
    },
    {
      title: 'Judges and mentors',
      body: 'Judge rounds, mentor teams or chair a committee, and give students feedback from practice.',
    },
    {
      title: 'Campus ambassador and student community partnerships',
      body: 'Student clubs and ambassadors who bring Apex Conclave events to their campus and community.',
    },
  ],
  why: [
    {
      title: 'Students who choose to take part',
      body: 'Our events are built for high school and college students who sign up to research, compete and present. That is the audience we intend to bring together.',
    },
    {
      title: 'Part of the event, not a banner',
      body: 'Placements are planned into the event itself: sessions, challenges, awards and certificates.',
    },
    {
      title: 'Built with you',
      body: 'Packages are shaped around your goals: visibility, recruitment, product trials or awards. Cash or in kind.',
    },
  ],
  placements: [
    'Naming of an event, round or challenge',
    'Logo on session backdrops and slides',
    'Short brand video between sessions',
    'Logo on participation certificates',
    'Awards and prizes for top participants',
    'Joint posts on Instagram and LinkedIn',
  ],
};

// About page "Who it brings together" (merged from the old Community page)
export const communityContent = {
  headline: 'The people who show up.',
  intro:
    'Apex Conclave is more than its events. It is the students who take part, the judges and chairs who run the rounds, and the team that builds the platform between events.',
  groups: [
    {
      title: 'Participants',
      body: 'High school and college students who sign up to research, compete, build and present, whatever the format.',
    },
    {
      title: 'Judges, mentors and dais',
      body: 'Judges, mentors, chairs and guest speakers who run the rounds and push participants. Names for each event are announced on its page.',
    },
    {
      title: 'Volunteers and campus ambassadors',
      body: 'Students who help run events and bring Apex Conclave to their school or college.',
    },
  ],
};
