import { notFound } from 'next/navigation';
import Image from 'next/image';
import type { Metadata } from 'next';
import { Calendar, MapPin, ArrowUpRight } from 'lucide-react';
import { eventsData, eventFees, formatEventDates } from '@/lib/data/events';
import { chambersData } from '@/lib/data/chambers';
import { faqsByEvent } from '@/lib/data/faqs';
import { eventStories } from '@/lib/data/eventStory';
import { Badge } from '@/components/ui/Badge';
import { SectionHeading } from '@/components/ui/SectionHeading';
import AccordionGallery from '@/components/ui/AccordionGallery';
import SpecularButton from '@/components/ui/SpecularButton';
import FAQAccordion from '@/components/faq/FAQAccordion';
import Link from 'next/link';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { JsonLd } from '@/components/JsonLd';
import { eventSchema, faqSchema } from '@/lib/seo';

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
    title: event.title,
    description: event.shortDescription,
    alternates: { canonical: `/events/${event.slug}` },
    openGraph: {
      title: `${event.title} | Apex Conclave`,
      description: event.shortDescription,
    },
  };
}

const sectionClass = 'scroll-mt-24 border-t border-surface py-16';
const pad2 = (n: number) => String(n).padStart(2, '0');

export default function EventDetailPage({ params }: EventDetailPageProps) {
  const event = eventsData.find((e) => e.slug === params.slug);
  if (!event) notFound();

  const chambers = chambersData.filter((c) => c.eventId === event.id).sort((a, b) => a.displayOrder - b.displayOrder);
  const faqs = faqsByEvent[event.id] ?? [];
  const story = eventStories[event.id];

  const nav: [string, string][] = [
    ['overview', 'Overview'],
    ...(story ? ([['how-it-works', 'How it works']] as [string, string][]) : []),
    ...(chambers.length ? ([['committees', 'Committees']] as [string, string][]) : []),
    ...(story ? ([['why-mun', 'Why MUN'], ['outcome', 'What you take home']] as [string, string][]) : []),
    ...(event.pricing ? ([['fees', 'Fees']] as [string, string][]) : []),
    ...(chambers.length ? ([['allotment', 'Allotment']] as [string, string][]) : []),
    ...(faqs.length ? ([['faq', 'FAQ']] as [string, string][]) : []),
  ];

  return (
    <main id="main-content" className="min-h-screen pt-[4.5rem] text-soft-white">
      {eventSchema(event) && <JsonLd data={eventSchema(event)!} />}
      {faqs.length > 0 && <JsonLd data={faqSchema(faqs)} />}
      {/* Hero: the event's own identity first, Apex Conclave secondary */}
      <div className="border-b border-surface">
        <div className="mx-auto flex min-h-[420px] max-w-container flex-col justify-end px-4 pb-10 pt-20 md:px-8 md:pb-16">
          <div className="max-w-3xl space-y-5">
            <Breadcrumbs
              items={[
                { name: 'Home', href: '/' },
                { name: 'Events', href: '/events' },
                { name: event.title, href: `/events/${event.slug}` },
              ]}
            />
            <div className="flex flex-wrap items-center gap-2">
              <Badge category={event.category} />
              {event.edition && <Badge variant="accent">{event.edition}</Badge>}
              <Badge variant={event.registrationOpen ? 'default' : 'muted'}>
                {event.registrationOpen ? 'Registration open' : 'Registration opens soon'}
              </Badge>
            </div>
            <h1>
              {event.logo ? (
                <Image
                  src={event.logo}
                  alt={event.title}
                  width={1200}
                  height={345}
                  priority
                  className="h-auto w-full max-w-[520px]"
                />
              ) : (
                <span className="text-4xl font-bold leading-tight tracking-tight md:text-6xl">{event.title}</span>
              )}
            </h1>
            <p className="text-sm text-muted-grey">
              {event.title} · presented by <span className="text-soft-white">Apex Conclave</span>
            </p>
            <div className="flex flex-wrap items-center gap-5 text-sm text-muted-grey">
              <span className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4 text-warm-bronze" aria-hidden="true" />
                {formatEventDates(event)}
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="h-4 w-4 text-warm-bronze" aria-hidden="true" />
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
        <nav aria-label="Event sections" className="flex gap-6 overflow-x-auto border-b border-surface py-4 text-sm text-muted-grey">
          {nav.map(([id, label]) => (
            <a key={id} href={`#${id}`} className="whitespace-nowrap transition-colors duration-200 hover:text-soft-white">
              {label}
            </a>
          ))}
        </nav>

        {/* Overview */}
        <section id="overview" className="scroll-mt-24 py-16">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
            <div className="space-y-6 md:col-span-2">
              <SectionHeading eyebrow="Overview" title={story?.intro.title ?? `What is ${event.title}?`} />
              {(story?.intro.body ?? [event.fullOverview]).map((p) => (
                <p key={p} className="max-w-[65ch] text-base leading-relaxed text-muted-grey">
                  {p}
                </p>
              ))}
            </div>
            <div className="space-y-4">
              <div className="text-xs font-medium uppercase tracking-widest text-muted-grey">Key features</div>
              <ul className="space-y-3">
                {event.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm text-muted-grey">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-warm-bronze" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {story && (
            <div className="mt-12">
              <div className="mb-4 text-xs font-medium uppercase tracking-widest text-muted-grey">The delegate’s work</div>
              <ol className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {story.work.map((w, i) => (
                  <li key={w.title} className="panel space-y-2">
                    <span className="text-xs font-medium text-warm-bronze">{pad2(i + 1)}</span>
                    <h3 className="text-base font-semibold">{w.title}</h3>
                    <p className="text-sm leading-relaxed text-muted-grey">{w.body}</p>
                  </li>
                ))}
              </ol>
            </div>
          )}
        </section>

        {/* How it works */}
        {story && (
          <section id="how-it-works" className={sectionClass}>
            <SectionHeading eyebrow="How it works" title="Your screen becomes the conference room." />
            <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-3">
              {story.phases.map((phase) => (
                <div key={phase.name}>
                  <h3 className="text-2xl font-bold">{phase.name}</h3>
                  <p className="mt-1 text-sm text-muted-grey">{phase.lead}</p>
                  <ol className="mt-6 space-y-4 border-l border-[#2a2d2e] pl-5">
                    {phase.steps.map((step, i) => (
                      <li key={step.title}>
                        <p className="text-sm font-semibold">
                          <span className="mr-2 text-xs font-medium text-warm-bronze">{pad2(i + 1)}</span>
                          {step.title}
                        </p>
                        <p className="mt-1 text-sm leading-relaxed text-muted-grey">{step.body}</p>
                      </li>
                    ))}
                  </ol>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Committees */}
        {chambers.length > 0 && (
          <section id="committees" className={sectionClass}>
            <SectionHeading
              eyebrow="Committees"
              title={`${chambers.length} rooms. ${chambers.length} ways to test yourself.`}
              description="Not sure? Choose the agenda you can’t stop thinking about."
            />
            {chambers.every((c) => c.bannerImage) && (
              <div className="mt-8 overflow-hidden rounded-[12px] border border-surface bg-bg p-4">
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
            )}
            <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2">
              {chambers.map((c) => (
                <article key={c.id} className="panel space-y-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="mb-1 text-xs font-medium uppercase tracking-widest text-warm-bronze">
                        {c.code} · {c.theme}
                      </div>
                      <h3 className="text-base font-bold leading-tight">{c.name}</h3>
                    </div>
                    <Badge variant="muted">{c.totalSeats} seats</Badge>
                  </div>
                  <p className="text-sm leading-relaxed">
                    <span className="mb-0.5 block text-xs uppercase tracking-wider text-[#8A8C88]">Agenda</span>
                    {c.topic}
                  </p>
                  <p className="text-sm leading-relaxed text-muted-grey">{c.challenge}</p>
                  <p className="border-t border-[#2a2d2e] pt-3 text-sm text-muted-grey">
                    <span className="text-soft-white">Suits: </span>
                    {c.suits}
                  </p>
                </article>
              ))}
            </div>

            {story && (
              <div className="mt-14">
                <h3 className="text-xl font-bold">Who sits at the table?</h3>
                <p className="mt-1 text-sm text-muted-grey">Five kinds of delegate, and most people are a mix.</p>
                <ol className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
                  {story.delegateTypes.map((d, i) => (
                    <li key={d.title} className="panel flex flex-col gap-2">
                      <span className="text-xs font-medium text-warm-bronze">{pad2(i + 1)}</span>
                      <p className="text-base font-semibold">{d.title}</p>
                      <p className="flex-1 text-sm leading-relaxed text-muted-grey">{d.body}</p>
                      <p className="text-xs uppercase tracking-wider text-muted-grey">
                        Look at <span className="text-soft-white">{d.lookAt.join(', ')}</span>
                      </p>
                    </li>
                  ))}
                </ol>
              </div>
            )}
          </section>
        )}

        {/* Why MUN */}
        {story && (
          <section id="why-mun" className={sectionClass}>
            <SectionHeading
              eyebrow="Why MUN"
              title="It doesn’t teach you what to think. It teaches you how to think under pressure."
            />
            <ol className="mt-10 grid grid-cols-1 gap-x-10 md:grid-cols-2">
              {story.skills.map((s, i) => (
                <li key={s.title} className="flex gap-5 border-b border-surface py-5">
                  <span className="pt-0.5 text-xs font-medium text-warm-bronze">{pad2(i + 1)}</span>
                  <div>
                    <p className="text-base font-semibold">{s.title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-muted-grey">{s.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>
        )}

        {/* Outcome */}
        {story && (
          <section id="outcome" className={sectionClass}>
            <SectionHeading eyebrow="The outcome" title="You leave with more than a certificate." />
            <div className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-2">
              {[
                ['What you build', story.outcomes.build],
                ['What you take home', story.outcomes.takeHome],
              ].map(([heading, items]) => (
                <div key={heading as string}>
                  <h3 className="mb-4 text-xs font-medium uppercase tracking-widest text-muted-grey">{heading as string}</h3>
                  <ul className="space-y-4">
                    {(items as { title: string; body: string }[]).map((o) => (
                      <li key={o.title}>
                        <p className="text-base font-semibold">{o.title}</p>
                        <p className="mt-0.5 text-sm text-muted-grey">{o.body}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Fees */}
        {event.pricing && (
          <section id="fees" className={sectionClass}>
            <SectionHeading eyebrow="Fees" title="Delegate fee" />
            <div className="mt-8 grid max-w-xl grid-cols-1 gap-5 sm:grid-cols-2">
              {eventFees(event).map((fee) => (
                <div key={fee.label} className="panel">
                  <div className="text-xs font-medium uppercase tracking-widest text-muted-grey">{fee.label}</div>
                  <div className="mt-2 text-3xl font-bold">{fee.amount}</div>
                  {fee.note && <div className="mt-1 text-sm text-muted-grey">{fee.note}</div>}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Allotment */}
        {chambers.length > 0 && (
          <section id="allotment" className={sectionClass}>
            <SectionHeading
              eyebrow="Allotment"
              title="How seats are given out."
              description="When you register, you list a first and second choice of committee and country. The team assigns every delegate a seat and confirms it by email after your payment is verified."
            />
          </section>
        )}

        {faqs.length > 0 && (
          <section id="faq" className={`${sectionClass} pb-24`}>
            <SectionHeading eyebrow="FAQ" title={`${event.title} questions`} />
            <div className="mt-8 max-w-[860px]">
              <FAQAccordion items={faqs} />
            </div>
            <p className="mt-8 text-sm text-muted-grey">
              Questions about Apex Conclave itself?{' '}
              <Link href="/faq" className="text-soft-white underline underline-offset-4">
                General FAQ
              </Link>{' '}
              or{' '}
              <Link href="/contact" className="text-soft-white underline underline-offset-4">
                contact us
              </Link>
              .
            </p>
          </section>
        )}
      </div>
    </main>
  );
}
