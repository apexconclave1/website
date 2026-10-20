import Link from 'next/link';
import ApexWordmark from '@/components/layout/ApexWordmark';
import { eventsData } from '@/lib/data/events';
import { organizationConfig } from '@/lib/data/organization';

const linkClass = 'inline-block py-1 text-sm text-muted-grey transition-colors duration-200 hover:text-soft-white';
const headingClass = 'mb-4 text-xs font-medium uppercase tracking-[0.18em] text-warm-bronze';

const socials = [
  { label: 'Instagram', href: organizationConfig.socials.instagram },
  { label: 'LinkedIn', href: organizationConfig.socials.linkedin },
].filter((s) => s.href);

export default function Footer() {
  return (
    <footer className="border-t border-surface bg-bg px-6 pb-8 pt-16">
      <div className="mx-auto max-w-[1240px]">
        <div className="mb-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="max-w-xs">
            <ApexWordmark size="md" />
            <p className="mt-4 text-sm leading-relaxed text-muted-grey">{organizationConfig.tagline}</p>
          </div>

          <div>
            <h4 className={headingClass}>Events</h4>
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
            <h4 className={headingClass}>Apex Conclave</h4>
            <ul className="flex flex-col gap-3">
              <li><Link href="/about" className={linkClass}>About</Link></li>
              <li><Link href="/contact" className={linkClass}>Contact</Link></li>
              <li><Link href="/faq" className={linkClass}>FAQ</Link></li>
            </ul>
          </div>

          <div>
            <h4 className={headingClass}>Connect</h4>
            <ul className="flex flex-col gap-3">
              <li>
                <a href={`mailto:${organizationConfig.contactEmail}`} className={linkClass}>
                  {organizationConfig.contactEmail}
                </a>
              </li>
              {socials.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" className={linkClass}>
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-surface pt-6">
          <p className="text-xs text-muted-grey">© {new Date().getFullYear()} Apex Conclave. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/terms" className="text-xs text-muted-grey transition-colors duration-200 hover:text-soft-white">
              Terms &amp; Privacy
            </Link>
            <Link href="/terms#code-of-conduct" className="text-xs text-muted-grey transition-colors duration-200 hover:text-soft-white">
              Code of Conduct
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
