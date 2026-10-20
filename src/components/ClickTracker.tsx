'use client';

import { useEffect } from 'react';
import { track } from '@vercel/analytics';

/**
 * One listener for the whole site: a click on any element with `data-track="event_name"` sends that
 * event to Vercel Analytics. Extra `data-track-*` attributes become properties, e.g.
 * <a data-track="social_click" data-track-platform="instagram">. Server components only add attributes.
 */
export default function ClickTracker() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const el = (e.target as Element | null)?.closest<HTMLElement>('[data-track]');
      if (!el?.dataset.track) return;
      const props: Record<string, string> = {};
      for (const [key, value] of Object.entries(el.dataset)) {
        if (key.startsWith('track') && key !== 'track' && value) {
          props[key.slice(5, 6).toLowerCase() + key.slice(6)] = value;
        }
      }
      track(el.dataset.track, props);
    };
    document.addEventListener('click', onClick, { capture: true });
    return () => document.removeEventListener('click', onClick, { capture: true });
  }, []);
  return null;
}
