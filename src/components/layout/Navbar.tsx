'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import ApexWordmark from '@/components/layout/ApexWordmark';
import { eventsData } from '@/lib/data/events';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/events', label: 'Events' },
  { href: '/about', label: 'About' },
  { href: '/community', label: 'Community' },
  { href: '/partners', label: 'Partners' },
  { href: '/contact', label: 'Contact' },
];

// ponytail: Register goes to the first event with open registration. Point at /events once several are open at once.
const openEvent = eventsData.find((e) => e.registrationOpen);
const registerHref = openEvent ? `/register?event=${openEvent.slug}` : null;

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => setOpen(false), [pathname]);

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
    <header className="fixed inset-x-0 top-0 z-50 bg-ink border-b border-cream/10 print:hidden">
      <div className="mx-auto flex h-[4.5rem] max-w-container items-center justify-between px-6">
        <ApexWordmark />

        <nav aria-label="Main navigation" className="hidden lg:flex items-center gap-7">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActive(link.href) ? 'page' : undefined}
              className={`text-sm font-medium transition-colors duration-200 ${
                isActive(link.href) ? 'text-cream' : 'text-cream/70 hover:text-cream'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {registerHref && (
          <div className="hidden lg:block">
            <Link href={registerHref} className="btn-primary px-4 py-2" data-track="cta_nav_register">
              Register
            </Link>
          </div>
        )}

        <button
          type="button"
          ref={menuButtonRef}
          onClick={() => setOpen(!open)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="mobile-menu"
          className="lg:hidden flex h-11 w-11 items-center justify-center rounded border border-cream/10 text-cream"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open && (
        <nav
          id="mobile-menu"
          aria-label="Mobile navigation"
          className="lg:hidden flex flex-col gap-1 border-t border-cream/10 bg-ink px-6 py-4"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActive(link.href) ? 'page' : undefined}
              className={`rounded px-3 py-3 text-base font-medium ${
                isActive(link.href) ? 'bg-ink text-cream' : 'text-cream/70'
              }`}
            >
              {link.label}
            </Link>
          ))}
          {registerHref && (
            <Link
              href={registerHref}
              data-track="cta_nav_register"
              data-track-place="mobile"
              className="mt-2 rounded bg-cream px-3 py-3 text-center text-base font-medium text-ink"
            >
              Register
            </Link>
          )}
        </nav>
      )}
    </header>
  );
}
