// Event verticals under the Apex Conclave brand. Only verticals with a real event are listed (owner, 2026-10-27);
// the grid fills the rest with `comingSoonSlots` "Coming soon" cards that open /coming-soon.
export interface Vertical {
  id: string;
  title: string;
  description: string;
  status: 'active';
  /** Slug of the event in this vertical */
  eventSlug?: string;
}

export const verticals: Vertical[] = [
  {
    id: 'diplomacy',
    title: 'Diplomacy & MUNs',
    description: 'Model United Nations conferences, diplomacy and policy simulations.',
    status: 'active',
    eventSlug: 'diplovia-2026',
  },
];

/** "Coming soon" cards shown after the real verticals (home and /verticals) */
export const comingSoonSlots = 2;
