import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { Calendar, MapPin, ArrowUpRight } from 'lucide-react';
import { eventsData, eventFees, formatEventDates } from '@/lib/data/events';
import { chambersData } from '@/lib/data/chambers';
import { leadersData } from '@/lib/data/leaders';
import { faqsByEvent } from '@/lib/data/faqs';
import { Badge } from '@/components/ui/Badge';
import { SectionHeading } from '@/components/ui/SectionHeading';
import AccordionGallery from '@/components/ui/AccordionGallery';
import SpecularButton from '@/components/ui/SpecularButton';
import FAQAccordion from '@/components/faq/FAQAccordion';

interface EventDetailPageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  return eventsData.map((event) => ({ slug: event.slug }));
}

export async function generateMetadata({ params }: EventDetailPageProps): Promise<Metadata> {
  const event = eventsData.find((e) => e.slug === params.slug);
  if (!event) return {};
  return {
    title: `${event.title} | Apex Conclave`,
    description: event.shortDescription,
  };
}

const sectionClass = 'scroll-mt-24 border-t border-[#141718] py-16';

export default function EventDetailPage({ params }: EventDetailPageProps) {
  const event = eventsData.find((e) => e.slug === params.slug);
  if (!event) notFound();

  const chambers = chambersData.filter((c) => c.eventId === event.id).sort((a, b) => a.displayOrder - b.displayOrder);
  const leaders = leadersData.filter((l) => !l.eventId || l.eventId === event.id);
  const faqs = faqsByEvent[event.id] ?? [];

  return (
    <div className="min-h-screen pt-[4.5rem] text-[#F4F2ED]">
      {/* Hero */}
      <div className="relative h-[60vh] min-h-[420px] w-full overflow-hidden border-b border-[#141718]">
        <div className="relative z-10 mx-auto flex h-full max-w-container flex-col justify-end px-4 pb-10 md:px-8 md:pb-16">
          <div className="max-w-3xl space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <Badge category={event.category} />
              {event.edition && <Badge variant="accent">{event.edition}</Badge>}
              <Badge variant={event.registrationOpen ? 'default' : 'muted'}>
                {event.registrationOpen ? 'Registration open' : 'Registration opens soon'}
              </Badge>
            </div>
            <h1 className="text-4xl font-bold leading-tight tracking-tight md:text-6xl">{event.title}</h1>
            <div className="flex flex-wrap items-center gap-5 text-sm text-[#A5A6A2]">
              <span className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4 text-[#C7A16A]" />
                {formatEventDates(event)}
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="h-4 w-4 text-[#C7A16A]" />
                {event.location.venue}
              </span>
            </div>
            {event.registrationOpen && (
              <SpecularButton href={`/register?event=${event.slug}`} size="md" radius={10}>
                <span className="inline-flex items-center gap-2 whitespace-nowrap">
                  Register for {event.title}
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </SpecularButton>
            )}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-container px-4 md:px-8">
        {/* Section nav */}
        <nav aria-label="Event sections" className="flex gap-6 overflow-x-auto border-b border-[#141718] py-4 text-sm text-[#A5A6A2]">
          {[
            ['overview', 'Overview'],
            ...(chambers.length ? [['committees', 'Committees']] : []),
            ...(event.pricing ? [['fees', 'Fees']] : []),
            ...(chambers.length ? [['allotment', 'Allotment']] : []),
            ['team', 'Team'],
            ...(faqs.length ? [['faq', 'FAQ']] : []),
          ].map(([id, label]) => (
            <a key={id} href={`#${id}`} className="whitespace-nowrap transition-colors duration-200 hover:text-[#F4F2ED]">
              {label}
            </a>
          ))}
        </nav>

        <section id="overview" className="scroll-mt-24 py-16">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
            <div className="space-y-6 md:col-span-2">
              <SectionHeading eyebrow="Overview" title={`What is ${event.title}?`} />
              <p className="text-base leading-relaxed text-[#A5A6A2]">{event.fullOverview}</p>
            </div>
            <div className="space-y-4">
              <div className="text-xs font-medium uppercase tracking-widest text-[#A5A6A2]">Key features</div>
              <ul className="space-y-3">
                {event.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm text-[#A5A6A2]">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#C7A16A]" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {chambers.length > 0 && (
          <section id="committees" className={sectionClass}>
            <SectionHeading
              eyebrow="Committees"
              title="Choose your arena."
              description="Each committee debates a different global challenge."
            />
            <div className="mt-8 overflow-hidden rounded-[12px] border border-[#141718] bg-[#080909] p-4">
              <AccordionGallery
                items={chambers.map((c) => ({ image: c.bannerImage ?? '', label: c.code, alt: c.name }))}
                defaultIndex={0}
                height={420}
                gap={12}
                radius={12}
                expandRatio={0.52}
                trigger="hover"
                accentColor="#C7A16A"
                overlayColor="#080909"
                textColor="#F4F2ED"
              />
            </div>
            <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2">
              {chambers.map((c) => (
                <div key={c.id} className="space-y-3 rounded-[10px] border border-[#1a1d1e] bg-[#141718] p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="mb-1 text-xs font-medium uppercase tracking-widest text-[#C7A16A]">{c.code}</div>
                      <h3 className="text-base font-bold leading-tight">{c.name}</h3>
                    </div>
                    <Badge variant="muted">{c.totalSeats} seats</Badge>
                  </div>
                  <p className="text-sm leading-relaxed text-[#A5A6A2]">
                    <span className="mb-0.5 block text-xs uppercase tracking-wider text-[#8A8C88]">Agenda</span>
                    {c.topic}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {event.pricing && (
          <section id="fees" className={sectionClass}>
            <SectionHeading eyebrow="Fees" title="Delegate fee" />
            <div className="mt-8 grid max-w-xl grid-cols-1 gap-5 sm:grid-cols-2">
              {eventFees(event).map((fee) => (
                <div key={fee.label} className="rounded-[10px] border border-[#1a1d1e] bg-[#141718] p-6">
                  <div className="text-xs font-medium uppercase tracking-widest text-[#A5A6A2]">{fee.label}</div>
                  <div className="mt-2 text-3xl font-bold">{fee.amount}</div>
                  {fee.note && <div className="mt-1 text-sm text-[#A5A6A2]">{fee.note}</div>}
                </div>
              ))}
            </div>
          </section>
        )}

        {chambers.length > 0 && (
          <section id="allotment" className={sectionClass}>
            <SectionHeading
              eyebrow="Allotment"
              title="How seats are given out."
              description="When you register, you list a first and second choice of committee and country. The team assigns every delegate a seat and confirms it by email after your payment is verified."
            />
          </section>
        )}

        <section id="team" className={sectionClass}>
          <SectionHeading eyebrow="Team" title={`The people behind ${event.title}.`} />
          <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {leaders.map((l) => (
              <div key={l.id} className="space-y-3 rounded-[10px] border border-[#1a1d1e] bg-[#141718] p-6">
                <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-[#1a1d1e] text-sm font-medium">
                  {l.photoUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={l.photoUrl} alt={l.name} className="h-full w-full object-cover" />
                  ) : (
                    l.name.split(' ').map((n) => n[0]).join('')
                  )}
                </div>
                <div>
                  <div className="text-sm font-semibold">{l.name}</div>
                  <div className="mt-0.5 text-xs font-medium text-[#C7A16A]">{l.role}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {faqs.length > 0 && (
          <section id="faq" className={`${sectionClass} pb-24`}>
            <SectionHeading eyebrow="FAQ" title={`${event.title} questions`} />
            <div className="mt-8 max-w-[860px]">
              <FAQAccordion items={faqs} />
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
