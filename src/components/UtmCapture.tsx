'use client';

import { useEffect } from 'react';

export const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign'] as const;
const STORAGE_KEY = 'apex_utm';

/** Saves UTM parameters from the landing URL for this browser session (first touch wins). */
export default function UtmCapture() {
  useEffect(() => {
    try {
      if (sessionStorage.getItem(STORAGE_KEY)) return;
      const params = new URLSearchParams(window.location.search);
      const utm = Object.fromEntries(UTM_KEYS.flatMap((k) => (params.get(k) ? [[k, params.get(k)!.slice(0, 100)]] : [])));
      if (Object.keys(utm).length) sessionStorage.setItem(STORAGE_KEY, JSON.stringify(utm));
    } catch {
      // Storage blocked: registrations are saved without UTM data
    }
  }, []);
  return null;
}

/** UTM data saved by <UtmCapture />, or {} */
export function readUtm(): Partial<Record<(typeof UTM_KEYS)[number], string>> {
  try {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY) ?? '{}');
  } catch {
    return {};
  }
}
