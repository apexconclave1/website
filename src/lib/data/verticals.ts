// Event verticals under the Apex Conclave brand (owner brief, 2026-10-22).
// These are intended categories. Only mark one 'active' once it has a real event in eventsData.
export interface Vertical {
  id: string;
  title: string;
  /** One-word name for compact lists (home hero index) */
  short: string;
  description: string;
  status: 'active' | 'planned';
  /** Slug of a live event in this vertical, when there is one */
  eventSlug?: string;
}

/** Contact form preset for a planned vertical: 'Register Interest' topic, subject names the vertical. */
export const interestHref = (v: Vertical) =>
  `/contact?category=${encodeURIComponent('Register Interest')}&subject=${encodeURIComponent(`Interest: ${v.title.replace(/\u00AD/g, '')}`)}`;

export const verticals: Vertical[] = [
  {
    id: 'diplomacy',
    title: 'Diplomacy & MUNs',
    short: 'Diplomacy',
    description: 'Model United Nations conferences, diplomacy and policy simulations.',
    status: 'active',
    eventSlug: 'diplovia-2026',
  },
  {
    id: 'business',
    title: 'Business & Case Competitions',
    short: 'Business',
    description: 'Business strategy, consulting cases, analytics and management challenges.',
    status: 'planned',
  },
  {
    id: 'technology',
    title: 'Technology & Hackathons',
    short: 'Technology',
    description: 'Coding competitions, hackathons, buildathons and technology challenges.',
    status: 'planned',
  },
  {
    id: 'debate',
    title: 'Debates & Discourse',
    short: 'Debate',
    description: 'Debating, public speaking, argumentation and leadership-oriented events.',
    status: 'planned',
  },
  {
    id: 'startups',
    // Soft hyphen (\u00AD) lets the long word break in narrow grid cells; it is invisible otherwise
    title: 'Startup Pitching & Entre\u00ADpreneurship',
    short: 'Startups',
    description: 'Startup pitches, entrepreneurial challenges and business-building competitions.',
    status: 'planned',
  },
  {
    id: 'esports',
    title: 'Gaming & Esports',
    short: 'Esports',
    description: 'Competitive gaming tournaments and inter-college leagues.',
    status: 'planned',
  },
];
