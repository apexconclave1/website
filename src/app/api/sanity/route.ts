import { NextRequest, NextResponse } from 'next/server';
import {
  sanityClient,
  FALLBACK_COMMITTEES,
  FALLBACK_MATRIX_DATA,
  FALLBACK_CONFERENCE_DATA,
  FALLBACK_LEADERSHIP,
  FALLBACK_GALLERY_IMAGES,
  FALLBACK_ANNOUNCEMENTS,
  CommitteeItem,
  MatrixCountry,
  CommitteeMatrixData,
  ConferenceEditionData,
  LeadershipMember,
  AnnouncementItem,
} from '@/lib/sanity';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get('type');

  if (!sanityClient) {
    return NextResponse.json(getFallback(type));
  }

  try {
    switch (type) {
      case 'committees': {
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
          return NextResponse.json(result);
        }
        return NextResponse.json(FALLBACK_COMMITTEES);
      }

      case 'matrix': {
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
          return NextResponse.json(mappedMatrix);
        }
        return NextResponse.json(FALLBACK_MATRIX_DATA);
      }

      case 'conference': {
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
          return NextResponse.json({
            title: result.title || FALLBACK_CONFERENCE_DATA.title,
            editionNumber: result.editionNumber || FALLBACK_CONFERENCE_DATA.editionNumber,
            startDate: result.startDate || FALLBACK_CONFERENCE_DATA.startDate,
            endDate: result.endDate || FALLBACK_CONFERENCE_DATA.endDate,
            targetCountdownDate: result.targetCountdownDate || result.startDate || FALLBACK_CONFERENCE_DATA.targetCountdownDate,
            venue: result.venue || FALLBACK_CONFERENCE_DATA.venue,
            registrationOpen: result.registrationOpen ?? true,
            totalChambers: result.totalChambers || FALLBACK_CONFERENCE_DATA.totalChambers,
            totalSeats: result.totalSeats || FALLBACK_CONFERENCE_DATA.totalSeats,
          });
        }
        return NextResponse.json(FALLBACK_CONFERENCE_DATA);
      }

      case 'leadership': {
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
          return NextResponse.json(result);
        }
        return NextResponse.json(FALLBACK_LEADERSHIP);
      }

      case 'gallery': {
        const query = `*[_type == "galleryImage"] | order(order asc, _createdAt desc) {
          title,
          "image": image.asset->url,
          href
        }`;
        const result = await sanityClient.fetch<{ title?: string; image?: string; href?: string }[]>(query);
        if (result && result.length > 0) {
          const items = result
            .filter((item) => Boolean(item.image))
            .map((item) => ({
              image: item.image as string,
              title: item.title,
              href: item.href,
            }));
          return NextResponse.json(items);
        }
        return NextResponse.json(FALLBACK_GALLERY_IMAGES);
      }

      case 'announcements': {
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
          return NextResponse.json(result);
        }
        return NextResponse.json(FALLBACK_ANNOUNCEMENTS);
      }

      default:
        return NextResponse.json({ error: 'Invalid query type' }, { status: 400 });
    }
  } catch (error) {
    console.warn(`[Sanity Server API] Fallback triggered for type: ${type}`, error);
    return NextResponse.json(getFallback(type));
  }
}

function getFallback(type: string | null) {
  switch (type) {
    case 'committees':
      return FALLBACK_COMMITTEES;
    case 'matrix':
      return FALLBACK_MATRIX_DATA;
    case 'conference':
      return FALLBACK_CONFERENCE_DATA;
    case 'leadership':
      return FALLBACK_LEADERSHIP;
    case 'gallery':
      return FALLBACK_GALLERY_IMAGES;
    case 'announcements':
      return FALLBACK_ANNOUNCEMENTS;
    default:
      return {};
  }
}
