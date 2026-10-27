import Link from 'next/link';
import ApexWordmark from '@/components/layout/ApexWordmark';
import { eventsData, formatEventDates } from '@/lib/data/events';
import { organizationConfig } from '@/lib/data/organization';

// min-h-11: 44px rows, Apple's minimum touch target
const linkClass = 'inline-flex min-h-11 items-center text-sm text-soft transition-colors duration-200 hover:text-bright';
const headingClass = 'mb-3 text-xs font-medium uppercase tracking-[0.14em] text-soft/70';
const legalClass = 'inline-flex min-h-11 items-center text-xs text-soft/80 transition-colors duration-200 hover:text-bright';

const siteLinks = [
  { href: '/about', label: 'About' },
  { href: '/verticals', label: 'Event Verticals' },
  { href: '/events', label: 'Events' },
  { href: '/partners', label: 'Partners' },
  { href: '/contact', label: 'Contact' },
  { href: '/faq', label: 'FAQ' },
];

const socials = [
  { label: 'Instagram', href: organizationConfig.socials.instagram },
  { label: 'LinkedIn', href: organizationConfig.socials.linkedin },
].filter((s) => s.href);

export default function Footer() {
  return (
    <footer className="border-t border-soft/15 bg-deep pb-6 pt-14 md:pt-20 print:hidden">
      <div className="mx-auto max-w-container px-6">
        <div className="grid gap-12 pb-12 md:pb-16 lg:grid-cols-12 lg:gap-6">
          <div className="max-w-md lg:col-span-5">
            <ApexWordmark size="md" />
            <p className="mt-6 text-sm leading-relaxed text-soft">{organizationConfig.description}</p>
            <a
              href={`mailto:${organizationConfig.contactEmail}`}
              className="mt-6 inline-flex min-h-11 items-center text-lg text-bright underline decoration-soft/30 underline-offset-[6px] transition-colors duration-200 [overflow-wrap:anywhere] hover:decoration-accent md:text-xl"
            >
              {organizationConfig.contactEmail}
            </a>
          </div>

          <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:col-span-7">
            <nav aria-label="Footer">
              <p className={headingClass}>Explore</p>
              <ul>
                {siteLinks.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className={linkClass}>
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div>
              <p className={headingClass}>Events</p>
              <ul>
                {eventsData.map((event) => (
                  <li key={event.id}>
                    <Link href={`/events/${event.slug}`} className="flex min-h-11 flex-col justify-center py-1 text-sm text-soft transition-colors duration-200 hover:text-bright">
                      {event.title}
                      <span className="text-xs text-soft/70">{formatEventDates(event)}</span>
                    </Link>
                  </li>
                ))}
                <li>
                  <Link href="/events" className={linkClass}>
                    All events
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <p className={headingClass}>Follow</p>
              <ul>
                {socials.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${linkClass} ext-link`}
                      data-track="social_click"
                      data-track-platform={s.label.toLowerCase()}
                      data-track-place="footer"
                    >
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2 border-t border-soft/15 pt-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-soft/80">© {new Date().getFullYear()} Apex Conclave. All rights reserved.</p>
          <ul className="flex flex-wrap gap-x-6">
            <li><Link href="/terms" className={legalClass}>Terms</Link></li>
            <li><Link href="/terms#privacy" className={legalClass}>Privacy</Link></li>
            <li><Link href="/terms#code-of-conduct" className={legalClass}>Code of Conduct</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
