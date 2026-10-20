import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import HeroSection from '@/components/home/HeroSection';
import SpecularButton from '@/components/ui/SpecularButton';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { eventsData, eventFees, formatEventDates } from '@/lib/data/events';
import { homeContent, organizationConfig } from '@/lib/data/organization';

export default function HomePage() {
  const featured = eventsData[0];

  return (
    <main id="main-content">
      <HeroSection />

      {/* Events under Apex Conclave */}
      <section className="mx-auto max-w-[1240px] border-t border-surface px-6 py-20">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <SectionHeading eyebrow="Events" title="Events under Apex Conclave." />
          <Link href="/events" className="text-sm text-muted-grey underline underline-offset-4 hover:text-soft-white">
            All events
          </Link>
        </div>
        <div className="grid items-center gap-10 rounded-[12px] border border-[#1a1d1e] bg-surface p-8 lg:grid-cols-2 lg:p-12">
          <div className="space-y-6">
            <span className="inline-block rounded-sm border border-[#1a1d1e] bg-bg px-3 py-1 text-xs font-medium uppercase tracking-widest text-warm-bronze">
              First event · {formatEventDates(featured)}
            </span>
            <h2 className="text-3xl font-bold text-soft-white md:text-5xl">{featured.title}</h2>
            <p className="text-base leading-relaxed text-muted-grey">{featured.shortDescription}</p>
            <ul className="flex flex-wrap gap-3 text-sm text-soft-white">
              {eventFees(featured).map((f) => (
                <li key={f.label} className="rounded-[10px] border border-[#1a1d1e] bg-bg px-4 py-2">
                  <span className="text-muted-grey">{f.label}:</span> {f.amount}
                </li>
              ))}
              <li className="rounded-[10px] border border-[#1a1d1e] bg-bg px-4 py-2">100% virtual</li>
            </ul>
            <div className="flex flex-wrap gap-4 pt-2">
              <SpecularButton href={`/events/${featured.slug}`} size="md" radius={10}>
                <span className="inline-flex items-center gap-2 whitespace-nowrap">
                  Explore {featured.title} <ArrowRight size={16} />
                </span>
              </SpecularButton>
              {featured.registrationOpen ? (
                <Link
                  href={`/register?event=${featured.slug}`}
                  className="inline-flex items-center rounded-[10px] border border-soft-white px-6 py-3 text-sm font-medium text-soft-white transition-opacity duration-200 hover:opacity-90"
                >
                  Register
                </Link>
              ) : (
                <span className="inline-flex items-center px-2 py-3 text-sm text-muted-grey">Registration opens soon</span>
              )}
            </div>
          </div>
          <div className="relative flex h-[280px] items-center justify-center overflow-hidden rounded-[10px] border border-[#1a1d1e] bg-bg md:h-[360px]">
            <Image
              src={featured.coverImage}
              alt="Diplovia logo"
              width={420}
              height={210}
              className="h-auto w-3/4 max-w-[420px] object-contain"
              priority
            />
          </div>
        </div>
        <p className="mt-6 text-sm text-muted-grey">{homeContent.moreEventsNote}</p>
      </section>

      {/* What Apex Conclave is */}
      <section className="mx-auto max-w-[1240px] border-t border-surface px-6 py-20">
        <SectionHeading eyebrow="About" title="What Apex Conclave is." description={organizationConfig.manifesto} />
        <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
          {homeContent.pillars.map((p) => (
            <div key={p.title} className="space-y-2 rounded-[10px] border border-[#1a1d1e] bg-surface p-6">
              <h3 className="text-base font-semibold text-soft-white">{p.title}</h3>
              <p className="text-sm leading-relaxed text-muted-grey">{p.body}</p>
            </div>
          ))}
        </div>
        <Link
          href="/about"
          className="mt-8 inline-flex items-center gap-2 text-sm text-soft-white underline underline-offset-4"
        >
          Read more about Apex Conclave <ArrowRight size={14} />
        </Link>
      </section>

      {/* Network */}
      <section className="mx-auto max-w-[1240px] border-t border-surface px-6 py-20">
        <SectionHeading eyebrow="Network" title="Who it brings together." />
        <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
          {homeContent.network.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className="panel group space-y-2 transition-colors duration-200 hover:border-[#2a2d2e]"
            >
              <h3 className="flex items-center justify-between text-base font-semibold text-soft-white">
                {n.title}
                <ArrowRight size={16} className="text-muted-grey transition-transform duration-200 group-hover:translate-x-0.5" />
              </h3>
              <p className="text-sm leading-relaxed text-muted-grey">{n.body}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Attend · Partner · Collaborate */}
      <section className="mx-auto max-w-[1240px] border-t border-surface px-6 py-20">
        <h2 className="text-2xl font-bold text-soft-white md:text-3xl">Attend. Partner. Collaborate.</h2>
        <p className="mt-2 text-muted-grey">Questions? Write to {organizationConfig.contactEmail}</p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            href="/events"
            className="inline-flex items-center rounded-[10px] bg-soft-white px-6 py-3 text-sm font-medium text-bg transition-opacity duration-200 hover:opacity-90"
          >
            Attend an event
          </Link>
          <Link
            href="/partners"
            className="inline-flex items-center rounded-[10px] border border-soft-white px-6 py-3 text-sm font-medium text-soft-white transition-opacity duration-200 hover:opacity-90"
          >
            Partner with us
          </Link>
          <Link
            href={`/contact?category=${encodeURIComponent('Host an Event')}`}
            className="inline-flex items-center rounded-[10px] border border-soft-white px-6 py-3 text-sm font-medium text-soft-white transition-opacity duration-200 hover:opacity-90"
          >
            Host an event with us
          </Link>
        </div>
      </section>
    </main>
  );
}
