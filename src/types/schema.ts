export type EventStatus = 'UPCOMING' | 'LIVE' | 'COMPLETED' | 'ARCHIVED';
export type EventCategory = 'MUN' | 'LEADERSHIP' | 'TECH' | 'BUSINESS' | 'CULTURAL';
export type PortfolioStatus = 'AVAILABLE' | 'RESERVED' | 'ALLOCATED';

/**
 * Apex Conclave Organization Global Settings
 */
export interface OrganizationConfig {
  name: string;
  tagline: string;
  manifesto: string;
  contactEmail: string;
  socials: {
    instagram?: string;
    linkedin?: string;
    twitter?: string;
  };
}

/**
 * Universal Event Entity
 */
export interface EventEntity {
  id: string;
  slug: string;
  title: string;
  edition?: string;
  category: EventCategory;
  status: EventStatus;
  startDate: string;
  endDate: string;
  location: {
    city: string;
    venue: string;
    isVirtual?: boolean;
  };
  shortDescription: string;
  fullOverview: string;
  coverImage: string;
  heroBanner?: string;
  fees?: { label: string; amount: string; note?: string }[];
  registrationOpen: boolean;
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
  executiveBoard: string; // Dais leadership description
  totalSeats: number;
  bannerImage?: string;
  studyGuidePdfUrl?: string;
  displayOrder: number;
}

/**
 * Agent-Free Country / Character / Seat Portfolio Matrix
 */
export interface SeatPortfolioEntity {
  id: string;
  eventId: string;
  chamberId: string;
  portfolioName: string; // e.g. 'United States', 'United Kingdom', 'Delegate of India'
  isoCode?: string;       // e.g. 'US', 'GB', 'IN'
  region: 'Africa' | 'Americas' | 'Asia-Pacific' | 'Europe' | 'Middle East' | 'Observer';
  status: PortfolioStatus;
  assignedDelegateName?: string;
  institution?: string;
}

/**
 * Speaker / Dais Member / Leader Entity
 */
export interface LeaderEntity {
  id: string;
  name: string;
  role: string;          // e.g. 'Secretary-General', 'Keynote Speaker', 'Advisory Board'
  bio: string;
  photoUrl: string;
  eventId?: string;      // If specific to an event, otherwise global organization leader
  organization?: string;
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

/**
 * Direct Agent-Free Delegate Application Schema
 */
export interface DelegateApplicationPayload {
  eventId: string;
  chamberId: string;
  preferredPortfolios: string[]; // List of seat IDs chosen by delegate directly
  delegateDetails: {
    fullName: string;
    email: string;
    phone: string;
    institution: string;
    experienceLevel: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
    statementOfPurpose?: string;
  };
}
