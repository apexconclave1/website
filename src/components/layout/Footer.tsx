import Link from 'next/link';
import ApexWordmark from '@/components/layout/ApexWordmark';
import { eventsData } from '@/lib/data/events';
import { organizationConfig } from '@/lib/data/organization';

const linkClass = 'inline-block py-1 text-sm text-soft transition-colors duration-200 hover:text-bright';
// Column headings and the description are hidden on phones to keep the footer short
const headingClass = 'eyebrow mb-4 hidden sm:block';

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
    <footer className="border-t border-soft/15 bg-deep pb-8 pt-12 sm:pt-16 print:hidden">
      <div className="mx-auto max-w-container px-6">
        <div className="grid gap-8 pb-10 sm:grid-cols-2 sm:gap-12 sm:pb-14 lg:grid-cols-[1.6fr_1fr_1fr_1fr] lg:gap-10">
          <div className="max-w-sm">
            <ApexWordmark size="md" />
            <p className="mt-6 hidden text-sm leading-relaxed text-soft sm:block">{organizationConfig.description}</p>
          </div>

          <nav aria-label="Footer">
            <p className={headingClass}>Apex Conclave</p>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-1 sm:flex sm:flex-col sm:gap-2">
              {siteLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className={linkClass}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Events column only from sm up; on phones the Events link above covers it */}
          <div className="hidden sm:block">
            <p className={headingClass}>Events</p>
            <ul className="flex flex-col gap-2">
              {eventsData.map((event) => (
                <li key={event.id}>
                  <Link href={`/events/${event.slug}`} className={linkClass}>
                    {event.title}
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
            <p className={headingClass}>Connect</p>
            <ul className="flex flex-wrap gap-x-6 gap-y-1 border-t border-soft/15 pt-6 sm:flex-col sm:gap-2 sm:border-0 sm:pt-0">
              <li>
                <a href={`mailto:${organizationConfig.contactEmail}`} className={`${linkClass} underline-offset-4 hover:underline`}>
                  {organizationConfig.contactEmail}
                </a>
              </li>
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

        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-soft/15 pt-6">
          <p className="text-xs text-soft">© {new Date().getFullYear()} Apex Conclave. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/terms" className="text-xs text-soft transition-colors duration-200 hover:text-bright">
              Terms &amp; Privacy
            </Link>
            <Link href="/terms#code-of-conduct" className="text-xs text-soft transition-colors duration-200 hover:text-bright">
              Code of Conduct
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
