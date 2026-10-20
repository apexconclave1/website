# Skill: Analytics Tracking

> Privacy-first event telemetry and conversion tracking patterns for the Apex Conclave website.

---

## When to Activate

Use this skill when:
- Adding analytics or tracking to the website
- Implementing conversion tracking for registrations
- Setting up event telemetry for user behavior
- Ensuring privacy compliance

---

## Privacy-First Principles

1. **No tracking without consent**: Implement a cookie consent banner before loading analytics
2. **Minimal data collection**: Only track what's necessary for improving the event experience
3. **No PII in analytics**: Never send names, emails, or phone numbers to analytics services
4. **First-party analytics preferred**: Consider privacy-friendly tools (Plausible, Umami, Fathom) over Google Analytics

---

## Recommended Analytics Stack

| Tool | Purpose | Privacy |
|---|---|---|
| **Plausible** or **Umami** | Page views, referrers, basic metrics | Privacy-first, no cookies |
| **Firebase Analytics** (optional) | If already using Firebase | Google-owned, requires consent |
| **Custom events** | Registration funnel tracking | First-party, stored in Firestore |

---

## Key Events to Track

### Page-Level Events
```typescript
// Track key page views
trackEvent('page_view', { page: '/events/diplovia-2025', referrer: document.referrer });
trackEvent('page_view', { page: '/events', filter: 'MUN' });
```

### Registration Funnel
```typescript
// Step 1: User views seat matrix
trackEvent('seat_matrix_viewed', { eventId: 'diplovia-2025', chamberId: 'unsc' });

// Step 2: User clicks on an available seat
trackEvent('seat_selected', { eventId: 'diplovia-2025', seatId: 'us', chamber: 'unsc' });

// Step 3: User opens application modal
trackEvent('application_started', { eventId: 'diplovia-2025', seatId: 'us' });

// Step 4: User submits application
trackEvent('application_submitted', { eventId: 'diplovia-2025', seatId: 'us' });

// Step 5: Application confirmed (success)
trackEvent('application_confirmed', { eventId: 'diplovia-2025', seatId: 'us' });
```

### Engagement Events
```typescript
trackEvent('study_guide_downloaded', { chamberId: 'unsc', eventId: 'diplovia-2025' });
trackEvent('cta_clicked', { label: 'Explore Events', page: '/' });
trackEvent('social_link_clicked', { platform: 'instagram' });
```

---

## Implementation Pattern

### Custom Analytics Hook
```tsx
// hooks/useAnalytics.ts
"use client"

export function useAnalytics() {
  const trackEvent = (eventName: string, properties?: Record<string, string>) => {
    // Send to your analytics service
    if (typeof window !== 'undefined' && window.plausible) {
      window.plausible(eventName, { props: properties });
    }

    // Optionally log to Firestore for custom dashboards
    // logToFirestore('analytics_events', { eventName, properties, timestamp: new Date() });
  };

  return { trackEvent };
}
```

### Cookie Consent (Required for EU/GDPR)
```tsx
// components/CookieConsent.tsx
"use client"
import { useState, useEffect } from 'react';

export function CookieConsent() {
  const [consented, setConsented] = useState<boolean | null>(null);

  useEffect(() => {
    const consent = localStorage.getItem('analytics_consent');
    setConsented(consent === 'true');
  }, []);

  if (consented !== null && consented) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#141718] border-t border-[#1a1d1e] p-4 z-50">
      <div className="max-w-[1240px] mx-auto flex items-center justify-between">
        <p className="text-sm text-[#A5A6A2]">
          We use privacy-friendly analytics to improve your experience.
        </p>
        <div className="flex gap-3">
          <button onClick={() => { localStorage.setItem('analytics_consent', 'false'); setConsented(false); }}
            className="text-sm text-[#A5A6A2] hover:text-[#F4F2ED]">Decline</button>
          <button onClick={() => { localStorage.setItem('analytics_consent', 'true'); setConsented(true); }}
            className="text-sm bg-[#F4F2ED] text-[#080909] px-4 py-1.5 rounded-[8px]">Accept</button>
        </div>
      </div>
    </div>
  );
}
```

---

## Conversion Metrics to Monitor

| Metric | Formula |
|---|---|
| **Seat View Rate** | Seat Matrix Views / Event Page Views |
| **Seat Selection Rate** | Seats Selected / Seat Matrix Views |
| **Application Start Rate** | Applications Started / Seats Selected |
| **Application Completion Rate** | Applications Submitted / Applications Started |
| **Overall Conversion** | Applications Submitted / Event Page Views |
