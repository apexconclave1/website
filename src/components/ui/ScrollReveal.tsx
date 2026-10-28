'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

const SELECTOR = '.reveal, .reveal-right, .reveal-stagger > *, .reveal-cells > * > *, .stamp';

/**
 * Marks reveal blocks with `is-in` when they reach the screen; CSS then plays the slide to the end, even if
 * scrolling stops. Once only: each block is then left alone, so scrolling back does not replay it.
 */
export default function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          e.target.classList.add('is-in');
          observer.unobserve(e.target);
        }
      },
      { rootMargin: '0px 0px -10% 0px' },
    );
    document.querySelectorAll(SELECTOR).forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
