'use client';

import { useEffect, useState } from 'react';

/**
 * Types `text` in letter by letter, then blinks a cursor three times and drops it (hero highlight).
 * Every letter is laid out from the start (hidden ones keep their space), so nothing shifts and it wraps on
 * any screen. Letters are hidden only when scripts run and motion is allowed (.typed-char in globals.css);
 * screen readers and search get the whole text at once.
 */
// Typing speed (owner asked for it a little slower): about 2.4s for 'bolder generation.'
const START_MS = 500;
const LETTER_MS = 110;

export function TypedText({ text, className }: { text: string; className?: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return setCount(text.length);
    let typed = 0;
    const tick = () => {
      typed += 1;
      setCount(typed);
      if (typed < text.length) timer = setTimeout(tick, LETTER_MS);
    };
    let timer = setTimeout(tick, START_MS);
    return () => clearTimeout(timer);
  }, [text]);

  const chars = [...text];
  return (
    <span className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {/* The cursor is drawn on the last typed letter, so it can never wrap onto a line of its own */}
        {chars.slice(0, count).map((ch, i) => (
          <span key={i} className={i === count - 1 ? `typed-cursor ${count === chars.length ? 'is-done' : ''}` : undefined}>
            {ch}
          </span>
        ))}
        {chars.slice(count).map((ch, i) => (
          <span key={count + i} className="typed-char">
            {ch}
          </span>
        ))}
      </span>
    </span>
  );
}
