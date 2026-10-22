import Link from 'next/link';
import ApexWordmark from '@/components/layout/ApexWordmark';
import { eventsData } from '@/lib/data/events';
import { organizationConfig } from '@/lib/data/organization';

const linkClass = 'inline-block py-1 text-sm text-cream/70 transition-colors duration-200 hover:text-cream';
const headingClass = 'mb-4 text-xs font-medium uppercase tracking-[0.18em] text-bronze';

const socials = [
  { label: 'Instagram', href: organizationConfig.socials.instagram },
  { label: 'LinkedIn', href: organizationConfig.socials.linkedin },
].filter((s) => s.href);

export default function Footer() {
  return (
    <footer className="border-t border-cream/10 bg-ink px-6 pb-8 pt-16 print:hidden">
      <div className="mx-auto max-w-container">
        <div className="mb-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="max-w-xs">
            <ApexWordmark size="md" />
            <p className="mt-4 text-sm leading-relaxed text-cream/70">{organizationConfig.tagline}</p>
          </div>

          <div>
            <p className={headingClass}>Events</p>
            <ul className="flex flex-col gap-3">
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
            <p className={headingClass}>Apex Conclave</p>
            <ul className="flex flex-col gap-3">
              <li><Link href="/about" className={linkClass}>About</Link></li>
              <li><Link href="/community" className={linkClass}>Community</Link></li>
              <li><Link href="/partners" className={linkClass}>Partners</Link></li>
              <li><Link href="/contact" className={linkClass}>Contact</Link></li>
              <li><Link href="/faq" className={linkClass}>FAQ</Link></li>
            </ul>
          </div>

          <div>
            <p className={headingClass}>Connect</p>
            <ul className="flex flex-col gap-3">
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

        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-cream/10 pt-6">
          <p className="text-xs text-cream/70">© {new Date().getFullYear()} Apex Conclave. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/terms" className="text-xs text-cream/70 transition-colors duration-200 hover:text-cream">
              Terms &amp; Privacy
            </Link>
            <Link href="/terms#code-of-conduct" className="text-xs text-cream/70 transition-colors duration-200 hover:text-cream">
              Code of Conduct
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
