'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

const SELECTOR = '.reveal, .reveal-right, .reveal-stagger > *, .reveal-cells > * > *';

/**
 * Marks reveal blocks with `is-in` when they reach the screen; CSS then plays the slide to the end, even if
 * scrolling stops. Leaving below the screen (scrolling back up) resets them, so they arrive again next time.
 */
export default function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) e.target.classList.add('is-in');
          else if (e.boundingClientRect.top > 0) e.target.classList.remove('is-in');
        }
      },
      { rootMargin: '0px 0px -10% 0px' },
    );
    document.querySelectorAll(SELECTOR).forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
