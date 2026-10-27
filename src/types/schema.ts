export type EventStatus = 'UPCOMING' | 'LIVE' | 'COMPLETED' | 'ARCHIVED';
export type EventCategory = 'MUN' | 'LEADERSHIP' | 'TECH' | 'BUSINESS' | 'CULTURAL';
export type PortfolioStatus = 'AVAILABLE' | 'RESERVED' | 'ALLOCATED';

/**
 * Apex Conclave Organization Global Settings
 */
export interface OrganizationConfig {
  name: string;
  /** One-sentence brand description (footer) */
  description: string;
  contactEmail: string;
  socials: {
    instagram?: string;
    linkedin?: string;
  };
}

/**
 * Universal Event Entity
 */
export interface EventEntity {
  id: string;
  slug: string;
  title: string;
  searchTitle?: string; // Page title for search results and link previews, e.g. 'Diplovia 2026: Virtual Model UN'
  edition?: string;
  category: EventCategory;
  status: EventStatus;
  startDate?: string; // ISO date. Leave both dates out to show "Dates to be announced"
  endDate?: string;
  location: {
    city: string;
    venue: string;
    isVirtual?: boolean;
  };
  shortDescription: string;
  fullOverview: string;
  coverImage: string;
  heroBanner?: string;
  logo?: string; // Event's own logo; shown on its page with Apex Conclave secondary
  brand?: 'diplovia'; // Event with its own identity: its pages use that brand's colours and fonts (globals.css)
  posterImage?: string; // The event's own artwork (as supplied, no printed dates), for the home featured section
  format?: string; // One line, e.g. 'Virtual Model United Nations · 2 days'
  pricing?: {
    regular: number;    // INR
    earlyBird?: number; // INR, charged for the first earlyBirdDays after registrationOpensAt
    earlyBirdDays?: number;
  };
  registrationOpen: boolean;
  registrationOpensAt?: string; // ISO date (IST). Early-bird window starts here
  registrationUrl?: string;
  features: string[];
}

/**
 * Chamber / Committee (Sub-module for MUNs & Specialized Summits like Diplovia)
 */
export interface ChamberEntity {
  id: string;
  eventId: string; // References EventEntity.id (e.g. 'diplovia-2025')
  code: string;     // e.g., 'UNSC', 'WHO', 'UNHRC'
  name: string;     // e.g., 'United Nations Security Council'
  topic: string;    // Agenda description
  theme: string;     // One-word theme, e.g. 'POWER'
  challenge: string; // What the committee asks of delegates
  suits: string;     // Who the committee suits
  totalSeats: number;
  bannerImage?: string;
  studyGuidePdfUrl?: string; // Set only when the real guide exists
  displayOrder: number;
  portfolios: string[]; // Countries or characters delegates can list as preferences
}

/**
 * Partner / Sponsor Entity
 */
export interface PartnerEntity {
  id: string;
  name: string;
  tier: 'TITANIUM' | 'PLATINUM' | 'GOLD' | 'INSTITUTIONAL_PARTNER';
  logoUrl: string;
  websiteUrl: string;
}
