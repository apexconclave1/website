'use client';

import { useEffect, useState } from 'react';

const UNITS = [
  ['Days', 86_400_000],
  ['Hours', 3_600_000],
  ['Minutes', 60_000],
  ['Seconds', 1_000],
] as const;

interface CountdownProps {
  /** Event name, e.g. "Diplovia" */
  name: string;
  /** Start and end in ms (see eventWindow) */
  start: number;
  end: number;
  className?: string;
}

/** Live countdown to an event's start; "<name> is live" while it runs; nothing once it has ended. */
export function Countdown({ name, start, end, className = '' }: CountdownProps) {
  // Null on the server and the first paint, so the cached HTML never shows a stale time ("--" until the clock starts)
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 1_000);
    return () => clearInterval(id);
  }, []);

  if (now !== null && now >= end) return null;

  if (now !== null && now >= start) {
    return (
      <p className={`inline-flex items-center gap-2.5 rounded border border-accent/40 px-4 py-2.5 text-sm font-medium text-bright ${className}`}>
        <span aria-hidden="true" className="h-2 w-2 animate-pulse rounded-full bg-accent" />
        {name} is live
      </p>
    );
  }

  let left = now === null ? 0 : start - now;
  const values = UNITS.map(([label, ms]) => {
    if (now === null) return [label, '--'] as const;
    const value = Math.floor(left / ms);
    left -= value * ms;
    return [label, String(value).padStart(2, '0')] as const;
  });
  const startsOn = new Date(start).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Asia/Kolkata' });

  return (
    <div className={className}>
      <p className="text-xs uppercase tracking-[0.14em] text-soft/80">Starts in</p>
      {/* The ticking numbers are hidden from screen readers (a new announcement every second); the date is read instead */}
      <p className="sr-only">
        {name} starts on {startsOn}.
      </p>
      <div aria-hidden="true" className="mt-3 grid max-w-md grid-cols-4 gap-2 sm:gap-3">
        {values.map(([label, value]) => (
          <div key={label} className="rounded border border-accent/25 px-1 py-3 text-center sm:py-4">
            <span className="block font-display text-3xl font-medium leading-none lining-nums tabular-nums text-bright md:text-4xl">{value}</span>
            <span className="mt-2 block text-[0.65rem] uppercase tracking-[0.14em] text-soft/80 sm:text-xs">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
