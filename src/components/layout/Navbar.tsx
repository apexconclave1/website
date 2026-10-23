'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, Moon, Sun, X } from 'lucide-react';
import ApexWordmark from '@/components/layout/ApexWordmark';
import { eventsData } from '@/lib/data/events';
import { partnerEnquiryHref } from '@/lib/data/organization';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/verticals', label: 'Event Verticals' },
  { href: '/events', label: 'Events' },
  { href: '/partners', label: 'Partners' },
  { href: '/contact', label: 'Contact' },
];

// ponytail: the button switches to Register for the first event with open registration. Point at /events once several are open at once.
const openEvent = eventsData.find((e) => e.registrationOpen);
const cta = openEvent
  ? { href: `/register?event=${openEvent.slug}`, label: 'Register', track: 'cta_nav_register' }
  : { href: partnerEnquiryHref, label: 'Partner With Us', track: 'cta_nav_partner' };

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => setOpen(false), [pathname]);

  // Light mode: the head script in app/layout.tsx applies the saved choice before paint; this reads and flips it
  const [light, setLight] = useState(false);
  useEffect(() => setLight(document.documentElement.dataset.theme === 'light'), []);
  const toggleTheme = () => {
    const next = !light;
    if (next) document.documentElement.dataset.theme = 'light';
    else delete document.documentElement.dataset.theme;
    try {
      localStorage.setItem('apc-theme', next ? 'light' : 'dark');
    } catch {}
    setLight(next);
  };

  // Escape closes the mobile menu and returns focus to its button
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      setOpen(false);
      menuButtonRef.current?.focus();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-soft/15 bg-ground print:hidden">
      {/* Shorter on short screens (phone held sideways); controls in px so they keep their size with large text */}
      <div className="mx-auto flex h-[4.5rem] max-w-container items-center justify-between gap-[24px] px-[24px] [@media(max-height:500px)]:h-14">
        <ApexWordmark />

        <nav aria-label="Main navigation" className="hidden items-center gap-6 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActive(link.href) ? 'page' : undefined}
              className={`whitespace-nowrap text-sm transition-colors duration-200 ${
                isActive(link.href)
                  ? 'text-bright underline decoration-accent decoration-1 underline-offset-[10px]'
                  : 'text-soft hover:text-bright'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-[12px]">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Light mode"
            aria-pressed={light}
            className="theme-toggle flex h-[44px] w-[44px] items-center justify-center rounded border border-soft/25 text-bright transition-colors duration-200 hover:border-bright lg:h-[36px] lg:w-[36px]"
          >
            <Sun size={18} className="theme-icon-sun" aria-hidden="true" />
            <Moon size={18} className="theme-icon-moon" aria-hidden="true" />
          </button>

          <Link href={cta.href} className="btn-primary hidden px-4 py-2 lg:inline-flex" data-track={cta.track}>
            {cta.label}
          </Link>

          <button
          type="button"
          ref={menuButtonRef}
          onClick={() => setOpen(!open)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="mobile-menu"
          className="flex h-[44px] w-[44px] items-center justify-center rounded border border-soft/25 text-bright lg:hidden"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-menu" aria-label="Mobile navigation" className="border-t border-soft/15 bg-ground px-6 pb-6 lg:hidden">
          <ul>
            {navLinks.map((link) => (
              <li key={link.href} className="border-b border-soft/15">
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  aria-current={isActive(link.href) ? 'page' : undefined}
                  className={`flex items-center justify-between py-4 text-base ${
                    isActive(link.href) ? 'text-bright' : 'text-soft'
                  }`}
                >
                  {link.label}
                  {isActive(link.href) && <span aria-hidden="true" className="h-px w-6 bg-accent" />}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href={cta.href}
            onClick={() => setOpen(false)}
            data-track={cta.track}
            data-track-place="mobile"
            className="btn-primary mt-6 w-full"
          >
            {cta.label}
          </Link>
        </nav>
      )}
    </header>
  );
}
