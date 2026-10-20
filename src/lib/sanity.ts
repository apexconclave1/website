import { createClient } from '@sanity/client';
import { createImageUrlBuilder } from '@sanity/image-url';

type DriftWallItem = { image: string; title?: string; href?: string };

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '55brkxf1';
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-03-01';

export const sanityClient = projectId
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: true,
    })
  : null;

const builder = sanityClient ? createImageUrlBuilder(sanityClient) : null;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function urlFor(source: any) {
  return builder ? builder.image(source) : null;
}

/* =========================================================================
   1. GALLERY TYPES & FALLBACK
   ========================================================================= */

export const FALLBACK_GALLERY_IMAGES: DriftWallItem[] = [
  {
    image: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?q=80&w=800&auto=format&fit=crop',
    title: 'General Assembly Hall',
    href: '/committees',
  },
  {
    image: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?q=80&w=800&auto=format&fit=crop',
    title: 'Diplomatic Dialogue',
    href: '/about',
  },
  {
    image: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=800&auto=format&fit=crop',
    title: 'Security Council Deliberations',
    href: '/committees',
  },
  {
    image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=800&auto=format&fit=crop',
    title: 'Keynote & Gavel Address',
    href: '/about',
  },
  {
    image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?q=80&w=800&auto=format&fit=crop',
    title: 'Resolution Caucus',
    href: '/committees',
  },
  {
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=800&auto=format&fit=crop',
    title: 'Multilateral Summit',
    href: '/committees',
  },
  {
    image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=800&auto=format&fit=crop',
    title: 'Diplomatic Press Chamber',
    href: '/about',
  },
  {
    image: 'https://images.unsplash.com/photo-1529070538774-1843cb3265df?q=80&w=800&auto=format&fit=crop',
    title: 'Future Leaders Network',
    href: '/contact',
  },
  {
    image: 'https://images.unsplash.com/photo-1531497865144-0464ef8fb9a9?q=80&w=800&auto=format&fit=crop',
    title: 'Crisis Simulation Chamber',
    href: '/committees',
  },
  {
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fit=crop',
    title: 'Collaborative Statecraft',
    href: '/about',
  },
  {
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop',
    title: 'Executive Plenary',
    href: '/committees',
  },
  {
    image: 'https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?q=80&w=800&auto=format&fit=crop',
    title: 'Delegation Leadership',
    href: '/contact',
  },
];

export async function fetchGalleryImages(): Promise<DriftWallItem[]> {
  if (typeof window !== 'undefined') {
    try {
      const res = await fetch('/api/sanity?type=gallery');
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) return data;
      }
    } catch {
      // Graceful fallback
    }
    return FALLBACK_GALLERY_IMAGES;
  }

  if (!sanityClient) {
    return FALLBACK_GALLERY_IMAGES;
  }

  try {
    const query = `*[_type == "galleryImage"] | order(order asc, _createdAt desc) {
      title,
      "image": image.asset->url,
      href
    }`;
    const result = await sanityClient.fetch<{ title?: string; image?: string; href?: string }[]>(query);

    if (result && result.length > 0) {
      return result
        .filter((item) => Boolean(item.image))
        .map((item) => ({
          image: item.image as string,
          title: item.title,
          href: item.href,
        }));
    }
  } catch {
    // Graceful fallback
  }

  return FALLBACK_GALLERY_IMAGES;
}

/* =========================================================================
   2. COMMITTEES & CHAMBERS
   ========================================================================= */

export interface CommitteeItem {
  code: string;
  name: string;
  topic: string;
  eb: string;
  seats: number;
  image: string;
  alt: string;
  studyGuideUrl?: string;
}

export const FALLBACK_COMMITTEES: CommitteeItem[] = [
  {
    code: 'UNSC',
    name: 'United Nations Security Council',
    topic: 'Addressing Non-State Territorial Incursions and the Sovereignty of Cyber Space in Multilateral Conflict Zones',
    eb: 'Executive Board Dais',
    seats: 15,
    image: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=1200&q=80',
    alt: 'United Nations Security Council Chamber',
  },
  {
    code: 'WHO',
    name: 'World Health Organization',
    topic: 'Pandemic Preparedness and Global Health Security Frameworks in the Post-COVID Geopolitical Landscape',
    eb: 'Executive Board Dais',
    seats: 20,
    image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1200&q=80',
    alt: 'World Health Organization Assembly',
  },
  {
    code: 'UNHRC',
    name: 'United Nations Human Rights Council',
    topic: 'Protecting the Rights of Climate Refugees and Displaced Populations Under International Humanitarian Law',
    eb: 'Executive Board Dais',
    seats: 25,
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1200&q=80',
    alt: 'United Nations Human Rights Council Court',
  },
  {
    code: 'UNGA',
    name: 'United Nations General Assembly',
    topic: 'Reforming the Architecture of Global Economic Governance for an Equitable Multilateral Trading Order',
    eb: 'Executive Board Dais',
    seats: 30,
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80',
    alt: 'United Nations General Assembly Plenary Hall',
  },
];

export async function fetchCommittees(): Promise<CommitteeItem[]> {
  if (typeof window !== 'undefined') {
    try {
      const res = await fetch('/api/sanity?type=committees');
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) return data;
      }
    } catch {
      // Graceful fallback
    }
    return FALLBACK_COMMITTEES;
  }

  if (!sanityClient) {
    return FALLBACK_COMMITTEES;
  }

  try {
    const query = `*[_type == "committee"] | order(displayOrder asc, _createdAt asc) {
      code,
      name,
      topic,
      "eb": coalesce(executiveBoard, "Executive Board Dais"),
      seats,
      "image": bannerImage.asset->url,
      "alt": coalesce(bannerImage.alt, name),
      "studyGuideUrl": studyGuide.asset->url
    }`;
    const result = await sanityClient.fetch<CommitteeItem[]>(query);

    if (result && result.length > 0) {
      return result.map((item, idx) => ({
        code: item.code || `COMM-${idx + 1}`,
        name: item.name || 'Diplomatic Committee',
        topic: item.topic || 'Deliberating Global Policy & Geopolitical Stability',
        eb: item.eb || 'Executive Board Dais',
        seats: item.seats || 20,
        image: item.image || FALLBACK_COMMITTEES[idx % FALLBACK_COMMITTEES.length].image,
        alt: item.alt || item.name || 'Committee Chamber',
        studyGuideUrl: item.studyGuideUrl,
      }));
    }
  } catch {
    // Graceful fallback
  }

  return FALLBACK_COMMITTEES;
}

/* =========================================================================
   3. COUNTRY PORTFOLIO MATRIX
   ========================================================================= */

export interface MatrixCountry {
  code: string;
  name: string;
  status: 'AVAILABLE' | 'RESERVED' | 'ALLOCATED';
  continent: string;
  delegateName?: string;
  institution?: string;
}

export interface CommitteeMatrixData {
  code: string;
  name: string;
  agenda: string;
  totalSeats: number;
  availableSeats: number;
  countries: MatrixCountry[];
}

export const FALLBACK_MATRIX_DATA: Record<string, CommitteeMatrixData> = {
  UNSC: {
    code: 'UNSC',
    name: 'United Nations Security Council',
    agenda: 'Addressing Non-State Territorial Incursions and the Sovereignty of Cyber Space in Multilateral Conflict Zones',
    totalSeats: 15,
    availableSeats: 6,
    countries: [
      { code: 'US', name: 'United States (P5)', status: 'ALLOCATED', continent: 'North America' },
      { code: 'GB', name: 'United Kingdom (P5)', status: 'ALLOCATED', continent: 'Europe' },
      { code: 'FR', name: 'France (P5)', status: 'ALLOCATED', continent: 'Europe' },
      { code: 'RU', name: 'Russian Federation (P5)', status: 'RESERVED', continent: 'Europe/Asia' },
      { code: 'CN', name: "People's Republic of China (P5)", status: 'RESERVED', continent: 'Asia' },
      { code: 'JP', name: 'Japan', status: 'AVAILABLE', continent: 'Asia' },
      { code: 'KR', name: 'Republic of Korea', status: 'AVAILABLE', continent: 'Asia' },
      { code: 'CH', name: 'Switzerland', status: 'AVAILABLE', continent: 'Europe' },
      { code: 'MT', name: 'Malta', status: 'AVAILABLE', continent: 'Europe' },
      { code: 'DZ', name: 'Algeria', status: 'AVAILABLE', continent: 'Africa' },
      { code: 'SL', name: 'Sierra Leone', status: 'AVAILABLE', continent: 'Africa' },
      { code: 'MZ', name: 'Mozambique', status: 'RESERVED', continent: 'Africa' },
      { code: 'GY', name: 'Guyana', status: 'RESERVED', continent: 'South America' },
      { code: 'EC', name: 'Ecuador', status: 'ALLOCATED', continent: 'South America' },
      { code: 'SI', name: 'Slovenia', status: 'RESERVED', continent: 'Europe' },
    ],
  },
  WHO: {
    code: 'WHO',
    name: 'World Health Organization',
    agenda: 'Pandemic Preparedness and Global Health Security Frameworks in the Post-COVID Geopolitical Landscape',
    totalSeats: 20,
    availableSeats: 11,
    countries: [
      { code: 'IN', name: 'India', status: 'ALLOCATED', continent: 'Asia' },
      { code: 'US', name: 'United States', status: 'ALLOCATED', continent: 'North America' },
      { code: 'DE', name: 'Germany', status: 'ALLOCATED', continent: 'Europe' },
      { code: 'BR', name: 'Brazil', status: 'AVAILABLE', continent: 'South America' },
      { code: 'ZA', name: 'South Africa', status: 'AVAILABLE', continent: 'Africa' },
      { code: 'AU', name: 'Australia', status: 'AVAILABLE', continent: 'Oceania' },
      { code: 'CA', name: 'Canada', status: 'AVAILABLE', continent: 'North America' },
      { code: 'JP', name: 'Japan', status: 'AVAILABLE', continent: 'Asia' },
      { code: 'IT', name: 'Italy', status: 'AVAILABLE', continent: 'Europe' },
      { code: 'EG', name: 'Egypt', status: 'AVAILABLE', continent: 'Africa' },
      { code: 'NG', name: 'Nigeria', status: 'AVAILABLE', continent: 'Africa' },
      { code: 'ID', name: 'Indonesia', status: 'AVAILABLE', continent: 'Asia' },
      { code: 'SA', name: 'Saudi Arabia', status: 'RESERVED', continent: 'Asia' },
      { code: 'SG', name: 'Singapore', status: 'AVAILABLE', continent: 'Asia' },
    ],
  },
  UNHRC: {
    code: 'UNHRC',
    name: 'United Nations Human Rights Council',
    agenda: 'Protecting the Rights of Climate Refugees and Displaced Populations Under International Humanitarian Law',
    totalSeats: 25,
    availableSeats: 14,
    countries: [
      { code: 'SE', name: 'Sweden', status: 'ALLOCATED', continent: 'Europe' },
      { code: 'NO', name: 'Norway', status: 'ALLOCATED', continent: 'Europe' },
      { code: 'BD', name: 'Bangladesh', status: 'ALLOCATED', continent: 'Asia' },
      { code: 'NL', name: 'Netherlands', status: 'AVAILABLE', continent: 'Europe' },
      { code: 'MX', name: 'Mexico', status: 'AVAILABLE', continent: 'North America' },
      { code: 'KE', name: 'Kenya', status: 'AVAILABLE', continent: 'Africa' },
      { code: 'AR', name: 'Argentina', status: 'AVAILABLE', continent: 'South America' },
      { code: 'PH', name: 'Philippines', status: 'AVAILABLE', continent: 'Asia' },
      { code: 'CL', name: 'Chile', status: 'AVAILABLE', continent: 'South America' },
      { code: 'VN', name: 'Vietnam', status: 'AVAILABLE', continent: 'Asia' },
    ],
  },
  UNGA: {
    code: 'UNGA',
    name: 'United Nations General Assembly',
    agenda: 'Reforming the Architecture of Global Economic Governance for an Equitable Multilateral Trading Order',
    totalSeats: 30,
    availableSeats: 18,
    countries: [
      { code: 'IN', name: 'Republic of India', status: 'ALLOCATED', continent: 'Asia' },
      { code: 'FR', name: 'France', status: 'ALLOCATED', continent: 'Europe' },
      { code: 'AE', name: 'United Arab Emirates', status: 'ALLOCATED', continent: 'Asia' },
      { code: 'SG', name: 'Singapore', status: 'ALLOCATED', continent: 'Asia' },
      { code: 'ZA', name: 'South Africa', status: 'AVAILABLE', continent: 'Africa' },
      { code: 'QA', name: 'Qatar', status: 'AVAILABLE', continent: 'Asia' },
      { code: 'TR', name: 'Turkey', status: 'AVAILABLE', continent: 'Europe/Asia' },
      { code: 'ES', name: 'Spain', status: 'AVAILABLE', continent: 'Europe' },
      { code: 'MY', name: 'Malaysia', status: 'AVAILABLE', continent: 'Asia' },
      { code: 'TH', name: 'Thailand', status: 'AVAILABLE', continent: 'Asia' },
      { code: 'NZ', name: 'New Zealand', status: 'AVAILABLE', continent: 'Oceania' },
    ],
  },
};

export async function fetchCountryMatrix(): Promise<Record<string, CommitteeMatrixData>> {
  if (typeof window !== 'undefined') {
    try {
      const res = await fetch('/api/sanity?type=matrix');
      if (res.ok) {
        const data = await res.json();
        if (data && Object.keys(data).length > 0) return data;
      }
    } catch {
      // Graceful fallback
    }
    return FALLBACK_MATRIX_DATA;
  }

  if (!sanityClient) {
    return FALLBACK_MATRIX_DATA;
  }

  try {
    const query = `*[_type == "committee"] {
      code,
      name,
      topic,
      seats,
      "countries": *[_type == "countryMatrix" && references(^._id)] {
        "code": coalesce(isoCode, "UN"),
        "name": countryName,
        status,
        continent,
        delegateName,
        institution
      }
    }`;

    interface SanityCommitteeQueryResult {
      code: string;
      name: string;
      topic: string;
      seats: number;
      countries: MatrixCountry[];
    }

    const result = await sanityClient.fetch<SanityCommitteeQueryResult[]>(query);

    if (result && result.length > 0) {
      const mappedMatrix: Record<string, CommitteeMatrixData> = {};

      result.forEach((c) => {
        const countriesList = c.countries || [];
        const availableCount = countriesList.filter((cntry) => cntry.status === 'AVAILABLE').length;

        mappedMatrix[c.code] = {
          code: c.code,
          name: c.name,
          agenda: c.topic,
          totalSeats: c.seats || (countriesList.length > 0 ? countriesList.length : 15),
          availableSeats: countriesList.length > 0 ? availableCount : Math.floor((c.seats || 15) * 0.4),
          countries: countriesList.length > 0 ? countriesList : (FALLBACK_MATRIX_DATA[c.code]?.countries || []),
        };
      });

      return mappedMatrix;
    }
  } catch {
    // Graceful fallback
  }

  return FALLBACK_MATRIX_DATA;
}

/* =========================================================================
   4. CONFERENCE EDITION & COUNTDOWN
   ========================================================================= */

export interface ConferenceEditionData {
  title: string;
  editionNumber: string;
  startDate: string;
  endDate: string;
  targetCountdownDate: string;
  venue: string;
  registrationOpen: boolean;
  totalChambers: number;
  totalSeats: number;
}

export const FALLBACK_CONFERENCE_DATA: ConferenceEditionData = {
  title: 'DIPLOVIA Edition I',
  editionNumber: 'Edition I',
  startDate: '2026-11-20',
  endDate: '2026-11-22',
  targetCountdownDate: '2026-11-20T09:00:00Z',
  venue: 'New Delhi, India',
  registrationOpen: true,
  totalChambers: 4,
  totalSeats: 90,
};

export async function fetchConferenceStatus(): Promise<ConferenceEditionData> {
  if (typeof window !== 'undefined') {
    try {
      const res = await fetch('/api/sanity?type=conference');
      if (res.ok) {
        const data = await res.json();
        if (data && data.title) return data;
      }
    } catch {
      // Graceful fallback
    }
    return FALLBACK_CONFERENCE_DATA;
  }

  if (!sanityClient) {
    return FALLBACK_CONFERENCE_DATA;
  }

  try {
    const query = `*[_type == "conferenceEdition" && isActive == true][0] {
      title,
      editionNumber,
      startDate,
      endDate,
      targetCountdownDate,
      venue,
      registrationOpen,
      totalChambers,
      totalSeats
    }`;
    const result = await sanityClient.fetch<ConferenceEditionData | null>(query);

    if (result && result.title) {
      return {
        title: result.title || FALLBACK_CONFERENCE_DATA.title,
        editionNumber: result.editionNumber || FALLBACK_CONFERENCE_DATA.editionNumber,
        startDate: result.startDate || FALLBACK_CONFERENCE_DATA.startDate,
        endDate: result.endDate || FALLBACK_CONFERENCE_DATA.endDate,
        targetCountdownDate: result.targetCountdownDate || result.startDate || FALLBACK_CONFERENCE_DATA.targetCountdownDate,
        venue: result.venue || FALLBACK_CONFERENCE_DATA.venue,
        registrationOpen: result.registrationOpen ?? true,
        totalChambers: result.totalChambers || FALLBACK_CONFERENCE_DATA.totalChambers,
        totalSeats: result.totalSeats || FALLBACK_CONFERENCE_DATA.totalSeats,
      };
    }
  } catch {
    // Graceful fallback
  }

  return FALLBACK_CONFERENCE_DATA;
}

/* =========================================================================
   5. EXECUTIVE LEADERSHIP
   ========================================================================= */

export interface LeadershipMember {
  id: string;
  role: string;
  title: string;
  name: string;
  image: string;
  linkedin: string;
  quote: string;
  bio: string;
  expertise: string[];
}

export const FALLBACK_LEADERSHIP: LeadershipMember[] = [
  {
    id: 'founder',
    role: 'Founder',
    title: 'Secretary-General',
    name: 'Ayush Vishnoi',
    image: '/leadership/ayush-vishnoi.jpg',
    linkedin: 'https://www.linkedin.com/in/ayush-vishnoi-53394135b/',
    quote:
      '"Diplomacy is not merely the absence of conflict, but the deliberate resolution of differences through education, empathy, and rigorous multilateral discourse."',
    bio: 'Ayush Vishnoi is the Founder and Secretary-General of DIPLOVIA. With a dedicated vision for youth leadership and international relations, he established DIPLOVIA to create an academically uncompromising platform where students develop confidence, policy literacy, and the art of constructive consensus.',
    expertise: ['Multilateral Strategy', 'Conference Architecture', 'Youth Leadership'],
  },
  {
    id: 'cofounder',
    role: 'Co-Founder',
    title: 'Chief Technology Officer (CTO)',
    name: 'Kapish Garg',
    image: '/leadership/kapish-garg.png',
    linkedin: 'https://www.linkedin.com/in/kapish-garg-8335a0282/',
    quote:
      '"Technology and structured multilateral debate together bridge communities, architecting seamless platforms that empower the next generation of global problem solvers."',
    bio: 'Kapish Garg is the Co-Founder & Chief Technology Officer (CTO) of DIPLOVIA, having designed, architected, and built the entire digital platform and verification ecosystem. Directing both software engineering and academic systems, he ensures the platform delivers state-of-the-art performance, reliability, and intellectual rigour.',
    expertise: ['Platform Architecture', 'Software Engineering', 'Academic Governance', 'Systems Infrastructure'],
  },
];

export async function fetchLeadership(): Promise<LeadershipMember[]> {
  if (typeof window !== 'undefined') {
    try {
      const res = await fetch('/api/sanity?type=leadership');
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) return data;
      }
    } catch {
      // Graceful fallback
    }
    return FALLBACK_LEADERSHIP;
  }

  if (!sanityClient) {
    return FALLBACK_LEADERSHIP;
  }

  try {
    const query = `*[_type == "leadership"] | order(order asc, _createdAt asc) {
      "id": coalesce(slug.current, _id),
      role,
      "title": executiveTitle,
      name,
      "image": coalesce(portrait.asset->url, "/leadership/ayush-vishnoi.jpg"),
      linkedin,
      quote,
      bio,
      "expertise": domainTags
    }`;
    const result = await sanityClient.fetch<LeadershipMember[]>(query);

    if (result && result.length > 0) {
      return result.map((item, idx) => ({
        id: item.id || `leader-${idx + 1}`,
        role: item.role || 'Secretariat',
        title: item.title || 'Director',
        name: item.name || 'Executive Member',
        image: item.image || (idx === 0 ? '/leadership/ayush-vishnoi.jpg' : '/leadership/kapish-garg.png'),
        linkedin: item.linkedin || 'https://www.linkedin.com',
        quote: item.quote || 'Leading diplomatic innovation for future generations.',
        bio: item.bio || 'Executive secretariat leader committed to excellence in diplomatic simulations.',
        expertise: item.expertise && item.expertise.length > 0 ? item.expertise : ['Multilateral Strategy', 'Diplomatic Governance'],
      }));
    }
  } catch {
    // Graceful fallback
  }

  return FALLBACK_LEADERSHIP;
}

/* =========================================================================
   6. ANNOUNCEMENTS & CIRCULARS
   ========================================================================= */

export interface AnnouncementItem {
  id: string;
  title: string;
  slug: string;
  category: string;
  publishedAt: string;
  summary: string;
  pdfUrl?: string;
}

export const FALLBACK_ANNOUNCEMENTS: AnnouncementItem[] = [
  {
    id: 'announcement-1',
    title: 'DIPLOVIA Edition I Delegate Registration Protocol & Matrix Release',
    slug: 'edition-1-registration-matrix',
    category: 'Circular',
    publishedAt: '2026-09-01',
    summary: 'The official Country Matrix and Delegate Handbooks for UNSC, WHO, UNHRC, and UNGA are now published for institutional review.',
  },
  {
    id: 'announcement-2',
    title: 'Code of Diplomatic Conduct & Procedure Guidelines',
    slug: 'code-of-conduct-guidelines',
    category: 'Secretariat Bulletin',
    publishedAt: '2026-08-15',
    summary: 'Rules of Procedure (RoP), parliamentary norms, and resolution drafting standards for all participating delegations.',
  },
];

export async function fetchAnnouncements(): Promise<AnnouncementItem[]> {
  if (typeof window !== 'undefined') {
    try {
      const res = await fetch('/api/sanity?type=announcements');
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) return data;
      }
    } catch {
      // Graceful fallback
    }
    return FALLBACK_ANNOUNCEMENTS;
  }

  if (!sanityClient) {
    return FALLBACK_ANNOUNCEMENTS;
  }

  try {
    const query = `*[_type == "announcement"] | order(publishedAt desc, _createdAt desc) {
      "id": _id,
      title,
      "slug": slug.current,
      category,
      publishedAt,
      summary,
      "pdfUrl": attachment.asset->url
    }`;
    const result = await sanityClient.fetch<AnnouncementItem[]>(query);

    if (result && result.length > 0) {
      return result;
    }
  } catch {
    // Graceful fallback
  }

  return FALLBACK_ANNOUNCEMENTS;
}
