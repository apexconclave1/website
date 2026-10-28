import { notFound } from 'next/navigation';
import Image from 'next/image';
import type { Metadata } from 'next';
import { ArrowRight, Plus } from 'lucide-react';
import { eventsData, eventFees, formatEventDates } from '@/lib/data/events';
import { chambersData } from '@/lib/data/chambers';
import { faqsByEvent } from '@/lib/data/faqs';
import { eventStories } from '@/lib/data/eventStory';
import { organizationConfig } from '@/lib/data/organization';
import { SectionHeading } from '@/components/ui/SectionHeading';
import FAQAccordion from '@/components/faq/FAQAccordion';
import Link from 'next/link';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import ScrollProgress from '@/components/ui/scroll-progress';
import { JsonLd } from '@/components/JsonLd';
import { eventSchema, faqSchema, pageMetadata } from '@/lib/seo';

interface EventDetailPageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  return eventsData.map((event) => ({ slug: event.slug }));
}

export async function generateMetadata({ params }: EventDetailPageProps): Promise<Metadata> {
  const event = eventsData.find((e) => e.slug === params.slug);
  if (!event) return {};
  return pageMetadata(
    event.searchTitle ?? event.title,
    event.shortDescription,
    `/events/${event.slug}`,
    `/events/${event.slug}/opengraph-image`,
  );
}

const sectionPad = 'scroll-mt-36 py-16 md:py-24';
const sectionClass = `${sectionPad} border-t border-soft/15`;
const pad2 = (n: number) => String(n).padStart(2, '0');
/** Booklet-style emphasis: words wrapped in *asterisks* render in italic */
const emph = (text: string) => text.split('*').map((part, i) => (i % 2 ? <em key={i}>{part}</em> : part));
const DAY_MS = 86_400_000;

/**
 * Event page. Events with their own identity (`brand`) switch the whole page to it via <main data-brand>
 * (DIPLOVIA: espresso, cream, caramel, Playfair Display). Content comes from lib/data (events, chambers, eventStory, faqs).
 */
export default function EventDetailPage({ params }: EventDetailPageProps) {
  const event = eventsData.find((e) => e.slug === params.slug);
  if (!event) notFound();

  const chambers = chambersData.filter((c) => c.eventId === event.id).sort((a, b) => a.displayOrder - b.displayOrder);
  const faqs = faqsByEvent[event.id] ?? [];
  const story = eventStories[event.id];
  const fees = eventFees(event);
  const registerHref = `/register?event=${event.slug}`;
  const askHref = `/contact?category=${encodeURIComponent(`${event.title} Registration`)}`;

  const nav: [string, string][] = [
    ['overview', 'Overview'],
    ...(story ? ([['how-it-works', 'How it works']] as [string, string][]) : []),
    ...(chambers.length ? ([['committees', 'Committees']] as [string, string][]) : []),
    ...(story ? ([['why-mun', 'Why MUN']] as [string, string][]) : []),
    ['registration', 'Registration'],
    ...(faqs.length ? ([['faq', 'FAQ']] as [string, string][]) : []),
    ['contact', 'Contact'],
  ];

  // The difference band: confirmed figures only
  const figures = [
    ...(event.location.isVirtual ? [{ figure: '100%', label: 'Online', note: 'No travel. No geography barrier.' }] : []),
    ...(event.startDate && event.endDate
      ? [{ figure: String(Math.round((Date.parse(event.endDate) - Date.parse(event.startDate)) / DAY_MS) + 1), label: 'Days', note: 'A focused conference experience.' }]
      : []),
    ...(chambers.length ? [{ figure: String(chambers.length), label: 'Committees', note: 'Different agendas. Different challenges.' }] : []),
    ...(fees[0] ? [{ figure: fees[0].amount, label: fees[0].label, note: fees[0].note ?? '' }] : []),
  ];

  const facts = [
    { label: 'Dates', value: formatEventDates(event) },
    { label: 'Venue', value: event.location.venue },
    { label: 'Registration', value: event.registrationOpen ? 'Open now' : 'Opens soon' },
  ];

  return (
    <main id="main-content" data-brand={event.brand} className="min-h-screen text-bright">
      <ScrollProgress />
      {eventSchema(event) && <JsonLd data={eventSchema(event)!} />}
      {faqs.length > 0 && <JsonLd data={faqSchema(faqs)} />}

      {/* Hero: the event's logo as its headline (name kept for screen readers), then facts and the way in */}
      <header className="relative isolate overflow-hidden bg-hero pt-[4.5rem]">
        <div className="mx-auto grid max-w-container gap-12 px-6 pb-16 pt-10 md:pb-24 md:pt-16 lg:grid-cols-12 lg:items-center lg:gap-10">
          <div className="lg:col-span-7">
            <Breadcrumbs
              items={[
                { name: 'Home', href: '/' },
                { name: 'Events', href: '/events' },
                { name: event.title, href: `/events/${event.slug}` },
              ]}
            />
            <p className="rise-in mt-10 text-xs font-medium uppercase tracking-[0.3em] text-accent">
              {event.format?.split(' · ')[0] ?? event.edition} · Presented by Apex Conclave
            </p>
            <h1 className="rise-in mt-6" style={{ animationDelay: '80ms' }}>
              {event.posterImage ? (
                <>
                  <span className="sr-only">{event.title}</span>
                  <Image
                    src={event.posterImage}
                    alt=""
                    width={1200}
                    height={345}
                    priority
                    sizes="(min-width: 768px) 560px, 100vw"
                    className="h-auto w-full max-w-[560px]"
                  />
                </>
              ) : (
                <span className="block text-[3.5rem] font-medium leading-[0.92] text-bright md:text-8xl">{event.title}</span>
              )}
            </h1>

            <dl className="rise-in mt-10 grid border-y border-accent/25 sm:grid-cols-3" style={{ animationDelay: '240ms' }}>
              {facts.map((f, i) => (
                <div key={f.label} className={`py-4 ${i > 0 ? 'border-t border-accent/25 sm:border-l sm:border-t-0 sm:pl-5' : 'sm:pr-5'}`}>
                  <dt className="text-xs uppercase tracking-[0.14em] text-soft/80">{f.label}</dt>
                  <dd className="mt-1.5 text-sm text-bright md:text-base">
                    {f.label === 'Registration' && (
                      <span aria-hidden="true" className={`mr-2 inline-block h-1.5 w-1.5 rounded-full align-middle ${event.registrationOpen ? 'bg-accent' : 'border border-accent'}`} />
                    )}
                    {f.value}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="rise-in mt-8 flex flex-wrap gap-3" style={{ animationDelay: '320ms' }}>
              {event.registrationOpen ? (
                <Link href={registerHref} className="btn-primary w-full sm:w-auto" data-track="cta_event_register">
                  Register for {event.title} <ArrowRight size={16} aria-hidden="true" />
                </Link>
              ) : (
                <a href="#registration" className="btn-primary w-full sm:w-auto" data-track="cta_event_registration_info">
                  How registration works <ArrowRight size={16} aria-hidden="true" />
                </a>
              )}
              {chambers.length > 0 && (
                <a href="#committees" className="btn-secondary w-full sm:w-auto">
                  See the {chambers.length} committees
                </a>
              )}
            </div>
          </div>

          {/* Large screens: the committees fill the right side, each a link to its row below */}
          {chambers.length > 0 && (
            <div className="rise-in hidden lg:col-span-4 lg:col-start-9 lg:block" style={{ animationDelay: '160ms' }}>
              <p className="text-xs uppercase tracking-[0.14em] text-soft/80">{chambers.length} committees</p>
              <ol className="mt-4 border-t border-accent/25">
                {chambers.map((c) => (
                  <li key={c.id} className="border-b border-accent/25">
                    <a href={`#${c.id}`} className="group flex items-baseline gap-5 py-4">
                      <span className="w-28 shrink-0 font-display text-3xl font-semibold leading-none text-accent">{c.code}</span>
                      <span className="text-sm text-soft transition-colors duration-200 group-hover:text-bright">{c.name}</span>
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          )}
        </div>
      </header>

      {/* Section menu: stays under the top bar while reading */}
      <nav aria-label="Event sections" className="sticky top-[4.5rem] z-30 border-b border-soft/15 bg-ground [@media(max-height:500px)]:top-14">
        <div className="mx-auto flex max-w-container gap-6 overflow-x-auto px-6 text-sm text-soft">
          {nav.map(([id, label]) => (
            <a key={id} href={`#${id}`} className="min-w-11 shrink-0 whitespace-nowrap py-3.5 text-center transition-colors duration-200 hover:text-bright">
              {label}
            </a>
          ))}
        </div>
      </nav>

      <div className="mx-auto max-w-container px-6">
        {/* Overview */}
        <section id="overview" className="scroll-mt-36 py-16 md:py-24">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
            <div className="space-y-6 md:col-span-2">
              <SectionHeading eyebrow="Overview" title={story ? emph(story.intro.title) : `What is ${event.title}?`} />
              {(story?.intro.body ?? [event.fullOverview]).map((p) => (
                <p key={p} className="max-w-[65ch] text-base leading-relaxed text-soft md:text-lg">
                  {p}
                </p>
              ))}
            </div>
            <div className="reveal-right space-y-4 md:border-l md:border-accent/25 md:pl-8">
              <h3 className="eyebrow">Key features</h3>
              <ul className="space-y-3">
                {event.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm text-soft">
                    <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rotate-45 bg-accent" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {story && (
            <div className="mt-14">
              <h3 className="eyebrow mb-6">The delegate’s work</h3>
              <ol className="reveal-stagger grid grid-cols-2 gap-x-6 gap-y-8 lg:grid-cols-4">
                {story.work.map((w, i) => (
                  <li key={w.title} className="space-y-2 border-t border-accent/30 pt-5">
                    <span className="font-display text-2xl text-accent">{pad2(i + 1)}</span>
                    <h4 className="text-base font-medium">{w.title}</h4>
                    <p className="text-sm leading-relaxed text-soft">{w.body}</p>
                  </li>
                ))}
              </ol>
            </div>
          )}
        </section>
      </div>

      {/* The difference: the event in four large figures, on a full-width band (as in the booklet) */}
      {story && (
        <section aria-labelledby="difference-heading" className="border-y border-accent/25 bg-surface/50">
          <div className="mx-auto grid max-w-container gap-12 px-6 py-16 md:py-24 lg:grid-cols-12 lg:items-end lg:gap-10">
            <div className="reveal lg:col-span-4">
              <p className="eyebrow">The difference</p>
              <h2 id="difference-heading" className="mt-3 text-3xl font-medium leading-[1.1] text-bright md:text-[2.75rem]">
                {emph(story.difference.title)}
              </h2>
              <p className="mt-4 max-w-[40ch] text-base leading-relaxed text-soft md:text-lg">{story.difference.body}</p>
            </div>
            <dl className="reveal-stagger grid grid-cols-2 gap-x-6 gap-y-10 lg:col-span-8 lg:grid-cols-4">
              {figures.map((f) => (
                <div key={f.label} className="flex flex-col border-t border-accent/30 pt-5">
                  <dt className="order-2 mt-4 text-xs uppercase tracking-[0.14em] text-accent">{f.label}</dt>
                  <dd className="order-1 font-display text-5xl font-medium leading-none text-bright md:text-7xl lg:text-6xl xl:text-7xl">{f.figure}</dd>
                  <dd className="order-3 mt-2 text-sm leading-relaxed text-soft">{f.note}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      )}

      <div className="mx-auto max-w-container px-6">
        {/* How it works: three phases, each step a tag */}
        {story && (
          <section id="how-it-works" className={sectionPad}>
            <SectionHeading eyebrow="How it works" title={emph('Your screen becomes *the conference room.*')} />
            <ol className="reveal-stagger mt-12 grid gap-12 md:grid-cols-3 md:gap-6">
              {story.phases.map((phase, i) => (
                <li key={phase.name} className="relative border-t border-accent/40 pt-8">
                  <span aria-hidden="true" className="absolute -top-[5px] left-0 h-2.5 w-2.5 rotate-45 bg-accent" />
                  <p className="text-xs uppercase tracking-[0.14em] text-accent">Phase {pad2(i + 1)}</p>
                  <h3 className="mt-2 font-display text-5xl font-medium">{phase.name}</h3>
                  <p className="mt-2 font-display text-lg italic text-soft">{phase.lead}</p>
                  <ul className="mt-6 flex flex-wrap gap-2">
                    {phase.steps.map((step) => (
                      <li key={step} className="border border-soft/20 px-3 py-1.5 text-sm text-bright">
                        {step}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ol>
          </section>
        )}

        {/* Committees: one card per room; the challenge and who it suits open on request */}
        {chambers.length > 0 && (
          <section id="committees" className={sectionClass}>
            <SectionHeading
              eyebrow="Committees"
              title={emph(`${chambers.length} rooms. *${chambers.length} ways to test yourself.*`)}
              description="Not sure? Choose the agenda you can’t stop thinking about."
            />
            <ol className="reveal-stagger mt-12 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
              {chambers.map((c) => (
                <li
                  key={c.id}
                  id={c.id}
                  className="flex scroll-mt-36 flex-col border border-accent/25 bg-surface/40 p-6 target:border-accent sm:last:col-span-2 xl:last:col-span-1"
                >
                  <p className="font-display text-5xl font-semibold leading-none text-accent">{c.code}</p>
                  <p className="mt-3 text-xs uppercase tracking-[0.14em] text-soft/80">
                    {c.theme} · {c.totalSeats} seats
                  </p>
                  <h3 className="mt-6 text-sm text-soft">{c.name}</h3>
                  <p className="mt-2 font-display text-xl leading-snug text-bright">{c.topic}</p>
                  <details className="group mt-auto pt-6">
                    <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-3 border-t border-accent/25 pt-3 text-sm text-bright [&::-webkit-details-marker]:hidden">
                      What it asks of you
                      <Plus size={16} aria-hidden="true" className="shrink-0 text-accent transition-transform duration-200 group-open:rotate-45" />
                    </summary>
                    <p className="mt-3 text-sm leading-relaxed text-soft">{c.challenge}</p>
                    <p className="mt-3 text-sm text-soft">
                      <span className="text-bright">Suits: </span>
                      {c.suits}
                    </p>
                  </details>
                </li>
              ))}
            </ol>

            {story && (
              <div className="mt-16">
                <h3 className="font-display text-3xl font-medium md:text-4xl">{emph('Who sits *at the table?*')}</h3>
                <p className="mt-2 text-sm text-soft">Five kinds of delegate, and most people are a mix.</p>
                <ul className="reveal-stagger mt-8 flex flex-wrap gap-3">
                  {story.delegateTypes.map((d) => (
                    <li key={d.title} className="flex min-h-11 items-center gap-4 border border-accent/25 px-4 py-2">
                      <span className="text-base text-bright">{d.title}</span>
                      <span className="flex gap-3 text-xs uppercase tracking-[0.14em]">
                        {d.lookAt.map((code) => {
                          const room = chambers.find((c) => c.code === code);
                          return room ? (
                            <a key={code} href={`#${room.id}`} className="hit text-accent underline-offset-4 hover:underline">
                              {code}
                            </a>
                          ) : (
                            <span key={code}>{code}</span>
                          );
                        })}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </section>
        )}

        {/* Why MUN: the skills it builds beside what you take home */}
        {story && (
          <section id="why-mun" className={sectionClass}>
            <SectionHeading
              eyebrow="Why MUN"
              title={emph('It doesn’t teach you what to think. It teaches you *how to think under pressure.*')}
            />
            <div className="mt-12 grid gap-12 lg:grid-cols-12 lg:gap-10">
              <div className="reveal lg:col-span-6">
                <h3 className="eyebrow mb-4">Skills you build</h3>
                <ol className="border-t border-soft/15">
                  {story.skills.map((skill, i) => (
                    <li key={skill} className="flex items-baseline gap-5 border-b border-soft/15 py-4">
                      <span className="text-xs font-medium text-accent">{pad2(i + 1)}</span>
                      <span className="font-display text-2xl text-bright md:text-3xl">{skill}</span>
                    </li>
                  ))}
                </ol>
              </div>
              <div className="reveal-right lg:col-span-5 lg:col-start-8">
                <h3 className="eyebrow mb-4">What you take home</h3>
                <ul className="border-t border-soft/15">
                  {story.takeHome.map((o) => (
                    <li key={o.title} className="border-b border-soft/15 py-4">
                      <p className="font-display text-2xl text-bright md:text-3xl">{o.title}</p>
                      <p className="mt-1 text-sm text-soft">{o.body}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        )}

        {/* Registration: status, fees, the three steps, the way in */}
        <section id="registration" className={sectionClass}>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-5">
              <SectionHeading
                eyebrow="Registration"
                title={emph('How to take *your seat.*')}
                description={
                  event.registrationOpen
                    ? 'Registration is open. It takes a few minutes; have your school or college details ready.'
                    : 'Registration opens soon. The window is announced on this page and on our Instagram.'
                }
              />
              {fees.length > 0 && (
                <dl id="fees" className="reveal mt-10 grid scroll-mt-36 grid-cols-2 border-y border-accent/25">
                  {fees.map((fee, i) => (
                    <div key={fee.label} className={`py-5 ${i > 0 ? 'border-l border-accent/25 pl-5' : 'pr-5'}`}>
                      <dt className="text-xs uppercase tracking-[0.14em] text-soft/80">{fee.label}</dt>
                      <dd>
                        <span className="mt-1 block font-display text-5xl font-medium text-bright">{fee.amount}</span>
                        {fee.note && <span className="mt-1 block text-sm text-soft">{fee.note}</span>}
                      </dd>
                    </div>
                  ))}
                </dl>
              )}
            </div>

            <div className="lg:col-span-6 lg:col-start-7">
              <ol id="allotment" className="reveal-stagger scroll-mt-36 border-t border-accent/30">
                {[
                  ['Register', 'Fill in your details and list a first and second choice of committee and country.'],
                  ['Pay', 'Pay the delegate fee by UPI and enter the transaction reference (UTR).'],
                  ['Get your seat', 'The team assigns every delegate a seat and confirms it by email once your payment is verified.'],
                ].map(([title, body], i) => (
                  <li key={title} className="flex gap-6 border-b border-soft/15 py-6">
                    <span className="font-display text-3xl text-accent">{pad2(i + 1)}</span>
                    <div>
                      <p className="text-lg font-medium">{title}</p>
                      <p className="mt-1 text-sm leading-relaxed text-soft">{body}</p>
                    </div>
                  </li>
                ))}
              </ol>
              <div className="reveal mt-8 flex flex-wrap gap-3">
                {event.registrationOpen ? (
                  <Link href={registerHref} className="btn-primary w-full sm:w-auto" data-track="cta_event_register">
                    Register for {event.title} <ArrowRight size={16} aria-hidden="true" />
                  </Link>
                ) : (
                  organizationConfig.socials.instagram && (
                    <a
                      href={organizationConfig.socials.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary w-full sm:w-auto"
                      data-track="social_click"
                      data-track-platform="instagram"
                      data-track-place="event_registration"
                    >
                      Follow for registration updates
                    </a>
                  )
                )}
                <Link href="/terms#refund-policy" className="btn-secondary w-full sm:w-auto">
                  Refunds and terms
                </Link>
              </div>
            </div>
          </div>
        </section>

        {faqs.length > 0 && (
          <section id="faq" className={sectionClass}>
            <SectionHeading eyebrow="FAQ" title={`${event.title} questions`} />
            <div className="mt-8 max-w-[860px]">
              <FAQAccordion items={faqs} />
            </div>
          </section>
        )}

        {/* Contact */}
        <section id="contact" className={`${sectionClass} pb-24`}>
          <div className="reveal grid gap-8 border border-accent/30 bg-surface/60 p-6 sm:p-10 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <p className="eyebrow mb-4">Contact</p>
              <h2 className="text-4xl font-medium leading-tight md:text-5xl">Questions about {event.title}?</h2>
              <p className="mt-4 max-w-[52ch] text-soft">
                Write to the organising team. We reply within 48 hours. For Apex Conclave in general, see the{' '}
                <Link href="/faq" className="text-bright underline underline-offset-4 hover:decoration-accent">
                  general FAQ
                </Link>
                .
              </p>
            </div>
            <div className="flex flex-col gap-3 lg:col-span-5 lg:items-end">
              <Link href={askHref} className="btn-primary w-full sm:w-auto">
                Send a question <ArrowRight size={16} aria-hidden="true" />
              </Link>
              <a
                href={`mailto:${organizationConfig.contactEmail}`}
                className="inline-flex min-h-11 items-center text-sm text-bright underline decoration-soft/40 underline-offset-4 [overflow-wrap:anywhere] hover:decoration-accent"
              >
                {organizationConfig.contactEmail}
              </a>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
