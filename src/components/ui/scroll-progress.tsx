'use client';

import { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

/**
 * 2px reading-progress bar. Browsers with CSS scroll-driven animations run it with no JS
 * (`.scroll-progress` in globals.css); others fall back to a passive scroll listener.
 */
export function ScrollProgress({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (CSS.supports('animation-timeline: scroll()')) return;
    const bar = ref.current;
    if (!bar) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={cn(
        'scroll-progress pointer-events-none fixed inset-x-0 top-0 z-[100] h-[2px] bg-accent print:hidden',
        className
      )}
    />
  );
}

export default ScrollProgress;
