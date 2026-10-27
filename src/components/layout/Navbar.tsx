'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowRight, Menu, X } from 'lucide-react';
import ApexWordmark from '@/components/layout/ApexWordmark';
import { eventsData } from '@/lib/data/events';
import { organizationConfig, partnerEnquiryHref } from '@/lib/data/organization';

// Desktop: the logo is the way home. The mobile menu lists Home too.
const navLinks = [
  { href: '/about', label: 'About' },
  { href: '/verticals', label: 'Event Verticals' },
  { href: '/events', label: 'Events' },
  { href: '/partners', label: 'Partners' },
  { href: '/contact', label: 'Contact' },
];
const mobileLinks = [{ href: '/', label: 'Home' }, ...navLinks];

// ponytail: the button switches to Register for the first event with open registration. Point at /events once several are open at once.
const openEvent = eventsData.find((e) => e.registrationOpen);
const cta = openEvent
  ? { href: `/register?event=${openEvent.slug}`, label: 'Register', track: 'cta_nav_register' }
  : { href: partnerEnquiryHref, label: 'Partner With Us', track: 'cta_nav_partner' };

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => setOpen(false), [pathname]);

  // Transparent over the top of the page, solid with a hairline once scrolled
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Open menu: Escape closes it and returns focus to its button; the page behind does not scroll
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      setOpen(false);
      menuButtonRef.current?.focus();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open]);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`);

  const solid = scrolled || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 print:hidden ${
        solid ? 'border-soft/15 bg-ground' : 'border-transparent bg-transparent'
      }`}
    >
      {/* Shorter on short screens (phone held sideways); controls in px so they keep their size with large text */}
      <div className="mx-auto flex h-[4.5rem] max-w-container items-center justify-between gap-[24px] px-[24px] [@media(max-height:500px)]:h-14">
        <ApexWordmark />

        <nav aria-label="Main navigation" className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? 'page' : undefined}
                className={`relative whitespace-nowrap py-2 text-sm transition-colors duration-200 after:absolute after:inset-x-0 after:bottom-0 after:h-px after:origin-left after:bg-accent after:transition-transform after:duration-300 ${
                  active ? 'text-bright after:scale-x-100' : 'text-soft after:scale-x-0 hover:text-bright hover:after:scale-x-100'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-[12px]">
          {/* Quiet outline while the bar is transparent over a page top (the home hero stays monochrome); lime once scrolled */}
          <Link href={cta.href} className={`${solid ? 'btn-primary' : 'btn-secondary'} hidden px-5 py-2.5 lg:inline-flex`} data-track={cta.track}>
            {cta.label}
          </Link>

          <button
            type="button"
            ref={menuButtonRef}
            onClick={() => setOpen(!open)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="flex h-[44px] w-[44px] items-center justify-center rounded border border-soft/25 text-bright transition-colors duration-200 hover:border-accent lg:hidden"
          >
            {open ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
          </button>
        </div>
      </div>

      {open && (
        <nav
          id="mobile-menu"
          aria-label="Mobile navigation"
          className="fixed inset-x-0 bottom-0 top-[4.5rem] flex flex-col overflow-y-auto border-t border-soft/15 bg-ground px-6 pb-8 [@media(max-height:500px)]:top-14 lg:hidden"
        >
          <ul className="mt-2">
            {mobileLinks.map((link, i) => {
              const active = isActive(link.href);
              return (
                <li key={link.href} className="rise-in border-b border-soft/15" style={{ animationDelay: `${i * 40}ms` }}>
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    aria-current={active ? 'page' : undefined}
                    className={`flex items-center justify-between py-4 font-display text-2xl ${active ? 'text-bright' : 'text-soft'}`}
                  >
                    {link.label}
                    {active ? (
                      <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-accent" />
                    ) : (
                      <ArrowRight size={18} aria-hidden="true" className="text-soft/60" />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="mt-auto pt-10">
            <Link
              href={cta.href}
              onClick={() => setOpen(false)}
              data-track={cta.track}
              data-track-place="mobile"
              className="btn-primary w-full"
            >
              {cta.label}
            </Link>
            <a
              href={`mailto:${organizationConfig.contactEmail}`}
              className="mt-4 flex min-h-11 items-center justify-center text-sm text-soft [overflow-wrap:anywhere]"
            >
              {organizationConfig.contactEmail}
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
