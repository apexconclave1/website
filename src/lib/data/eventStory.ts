// Long-form event page copy, keyed by event id. Source for Diplovia: docs/Diplovia_2026_Delegate_Booklet_home_print.pdf

export interface EventStory {
  /** Titles may wrap words in *asterisks*: shown in italic, as in the booklet */
  intro: { title: string; body: string[] };
  work: { title: string; body: string }[];
  difference: { title: string; body: string };
  phases: { name: string; lead: string; steps: string[] }[];
  delegateTypes: { title: string; lookAt: string[] }[];
  skills: string[];
  takeHome: { title: string; body: string }[];
}

export const eventStories: Record<string, EventStory> = {
  'diplovia-2026': {
    intro: {
      title: 'Diplomacy *without a border.*',
      body: [
        'Diplovia puts the committee room on your screen. Delegates are assigned countries, meet online and debate international issues with students who could be logging in from anywhere.',
        'The format is not watered down. You still research a position, speak for a country, negotiate with other delegates, draft solutions and respond to a crisis when one breaks.',
      ],
    },
    work: [
      { title: 'Research', body: 'Know the country’s record before you speak for it.' },
      { title: 'Represent', body: 'Argue the position, not your own opinion.' },
      { title: 'Negotiate', body: 'Find out who you can work with.' },
      { title: 'Resolve', body: 'Turn agreement into a written draft.' },
    ],
    difference: {
      title: 'Not just *another MUN.*',
      body: 'A physical MUN asks for travel, time and money before you have said a word. Diplovia asks you to log in.',
    },
    phases: [
      {
        name: 'Before',
        lead: 'The work starts before the first session.',
        steps: ['Research', 'Background guide', 'Country assignment', 'Preparation'],
      },
      {
        name: 'During',
        lead: 'Then the committee convenes.',
        steps: ['Opening', 'Moderated caucuses', 'Unmoderated caucuses', 'Negotiation', 'Drafting', 'Crisis'],
      },
      {
        name: 'After',
        lead: 'What you carry out of the room.',
        steps: ['Awards', 'Recognition', 'Certificates', 'Connections'],
      },
    ],
    delegateTypes: [
      { title: 'The first-timer', lookAt: ['UNGA', 'WHO'] },
      { title: 'The debater', lookAt: ['UNSC'] },
      { title: 'The strategist', lookAt: ['UNHRC'] },
      { title: 'The negotiator', lookAt: ['UNGA'] },
      { title: 'The crisis player', lookAt: ['HC'] },
    ],
    skills: [
      'Public speaking',
      'Research',
      'Negotiation',
      'Policy thinking',
      'Leadership',
      'Critical thinking',
      'Collaboration',
    ],
    takeHome: [
      { title: 'Certificate', body: 'Proof you took part.' },
      { title: 'Awards', body: 'Recognition for outstanding performance in committee.' },
      { title: 'Competitive recognition', body: 'Standing among delegates from schools and colleges across India.' },
      { title: 'Networking', body: 'The students you debated, allied with and competed against.' },
    ],
  },
};
