'use client';

import { useState, useEffect } from 'react';
import SpecularButton from '@/components/ui/SpecularButton';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import ApexWordmark from '@/components/layout/ApexWordmark';
import { eventsData } from '@/lib/data/events';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/events', label: 'Events' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

// ponytail: Register goes to the first event with open registration. Point at /events once several are open at once.
const openEvent = eventsData.find((e) => e.registrationOpen);
const registerHref = openEvent ? `/register?event=${openEvent.slug}` : null;

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => setOpen(false), [pathname]);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-bg border-b border-surface">
      <div className="mx-auto flex h-[4.5rem] max-w-[1240px] items-center justify-between px-6">
        <ApexWordmark />

        <nav aria-label="Main navigation" className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActive(link.href) ? 'page' : undefined}
              className={`text-sm font-medium transition-colors duration-200 ${
                isActive(link.href) ? 'text-soft-white' : 'text-muted-grey hover:text-soft-white'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {registerHref && (
          <div className="hidden md:block">
            <SpecularButton href={registerHref} size="sm" radius={10}>
              Register
            </SpecularButton>
          </div>
        )}

        <button
          type="button"
          onClick={() => setOpen(!open)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          className="md:hidden flex h-11 w-11 items-center justify-center rounded-[10px] border border-surface text-soft-white"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open && (
        <nav
          aria-label="Mobile navigation"
          className="md:hidden flex flex-col gap-1 border-t border-surface bg-bg px-6 py-4"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActive(link.href) ? 'page' : undefined}
              className={`rounded-[10px] px-3 py-3 text-base font-medium ${
                isActive(link.href) ? 'bg-surface text-soft-white' : 'text-muted-grey'
              }`}
            >
              {link.label}
            </Link>
          ))}
          {registerHref && (
            <Link
              href={registerHref}
              className="mt-2 rounded-[10px] bg-soft-white px-3 py-3 text-center text-base font-medium text-bg"
            >
              Register
            </Link>
          )}
        </nav>
      )}
    </header>
  );
}
