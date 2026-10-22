'use client';

import { useEffect, useState } from 'react';

/** Appears after scrolling down a screen and a half; jumps back to the top. */
export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 1.5);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <button
      type="button"
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0 })}
      className={`fixed bottom-6 right-6 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-cream/20 bg-ink text-cream transition duration-200 hover:-translate-y-0.5 hover:border-cream print:hidden ${
        visible ? 'opacity-100' : 'pointer-events-none opacity-0'
      }`}
    >
      <span aria-hidden="true">↑</span>
    </button>
  );
}
