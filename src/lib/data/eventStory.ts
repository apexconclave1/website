// Long-form event page copy, keyed by event id. Source for Diplovia: docs/Diplovia_2026_Delegate_Booklet_home_print.pdf

export interface EventStory {
  intro: { title: string; body: string[] };
  work: { title: string; body: string }[];
  phases: { name: string; lead: string; steps: { title: string; body: string }[] }[];
  delegateTypes: { title: string; body: string; lookAt: string[] }[];
  skills: { title: string; body: string }[];
  outcomes: { build: { title: string; body: string }[]; takeHome: { title: string; body: string }[] };
}

export const eventStories: Record<string, EventStory> = {
  'diplovia-2026': {
    intro: {
      title: 'Diplomacy without a border.',
      body: [
        'Diplovia puts the committee room on your screen. Delegates are assigned countries, meet on Zoom or Google Meet, and debate international issues with students who could be logging in from anywhere.',
        'The format is not watered down. You still research a position, speak for a country, negotiate with other delegates, draft solutions and respond to a crisis when one breaks.',
      ],
    },
    work: [
      { title: 'Research', body: 'Know the country’s record before you speak for it.' },
      { title: 'Represent', body: 'Argue the position, not your own opinion.' },
      { title: 'Negotiate', body: 'Find out who you can work with.' },
      { title: 'Resolve', body: 'Turn agreement into a written draft.' },
    ],
    phases: [
      {
        name: 'Before',
        lead: 'The work starts before the first session.',
        steps: [
          { title: 'Research', body: 'Learn the topic and the context around it.' },
          { title: 'Background guide', body: 'Your starting map of the agenda.' },
          { title: 'Country assignment', body: 'The position you will represent.' },
          { title: 'Preparation', body: 'Build your stance, your speeches and your list of likely allies.' },
        ],
      },
      {
        name: 'During',
        lead: 'Then the committee convenes.',
        steps: [
          { title: 'Opening', body: 'Delegates take their places and the agenda is set.' },
          { title: 'Moderated caucuses', body: 'Structured debate. Time is limited, so make each point count.' },
          { title: 'Unmoderated caucuses', body: 'The floor loosens. Delegates talk directly and compare positions.' },
          { title: 'Negotiation', body: 'Competing interests meet.' },
          { title: 'Drafting', body: 'Positions become written text.' },
          { title: 'Crisis', body: 'Events can break into the room and demand fast responses.' },
        ],
      },
      {
        name: 'After',
        lead: 'What you carry out of the room.',
        steps: [
          { title: 'Awards', body: 'Recognition for outstanding performance.' },
          { title: 'Recognition', body: 'Your work seen by the committee.' },
          { title: 'Certificates', body: 'Proof you were there.' },
          { title: 'Connections', body: 'The delegates you debated, allied with or opposed.' },
        ],
      },
    ],
    delegateTypes: [
      { title: 'The first-timer', body: 'Never attended an MUN before. You’ll learn the format by being in it.', lookAt: ['UNGA', 'WHO'] },
      { title: 'The debater', body: 'Lives for the floor.', lookAt: ['UNSC'] },
      { title: 'The strategist', body: 'Researches before everyone else.', lookAt: ['UNHRC'] },
      { title: 'The negotiator', body: 'Builds alliances when others are still speaking.', lookAt: ['UNGA'] },
      { title: 'The crisis player', body: 'Thinks fastest when everything goes wrong.', lookAt: ['HC'] },
    ],
    skills: [
      { title: 'Public speaking', body: 'Making one clear point in the time you’re given, to a room listening for weaknesses.' },
      { title: 'Research', body: 'Country policy, past behaviour, the facts behind the agenda. You can’t defend a position you haven’t studied.' },
      { title: 'Negotiation', body: 'Reaching agreement with people who want something different.' },
      { title: 'Policy thinking', body: 'Turning a problem into something a committee can actually vote on.' },
      { title: 'Leadership', body: 'Leading a bloc without a title, by persuading rather than instructing.' },
      { title: 'Critical thinking', body: 'Testing claims, your own included, before they cost you the room.' },
      { title: 'Collaboration', body: 'A resolution has many authors. Share the draft and keep your position.' },
    ],
    outcomes: {
      build: [
        { title: 'Delegate experience', body: 'Time in a real committee, on a real agenda.' },
        { title: 'Research ability', body: 'Learning to prepare a position properly.' },
        { title: 'Public speaking', body: 'Practice under time limits.' },
        { title: 'Negotiation', body: 'Working out agreement with delegates who disagree.' },
        { title: 'Strategic thinking', body: 'Choosing what to argue, and when.' },
      ],
      takeHome: [
        { title: 'Certificate', body: 'Proof you took part.' },
        { title: 'Awards', body: 'Recognition for outstanding performance in committee.' },
        { title: 'Competitive recognition', body: 'Standing among delegates from schools and colleges across India.' },
        { title: 'Networking', body: 'The students you debated, allied with and competed against.' },
      ],
    },
  },
};
