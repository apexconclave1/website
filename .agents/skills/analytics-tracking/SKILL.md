# Skill: Analytics Tracking

> Privacy-first, cookie-free tracking for the Apex Conclave website. Vercel Web Analytics for page views and events, Supabase for the first-party registration funnel.

---

## When to Activate

- Adding a tracked button, link or form
- Adding a step to the registration wizard
- Reading or changing the registration funnel
- Changing what the privacy notice (`app/terms/page.tsx`) says about data

---

## Rules

1. **No personal data in analytics.** Never send names, emails, phones, institutions or tracking codes. Send ids, step numbers, amounts and topics only.
2. **No cookies, no consent banner.** Vercel Web Analytics is cookie-free. Do not add an analytics tool that sets cookies without asking the owner first (it would need a consent banner).
3. **Free tier only.** Vercel shows custom events only on Pro; the free answer to "where do people drop off" is the Supabase view below.
4. **Analytics never blocks the page.** `<Analytics />` loads after hydration; tracking calls are fire-and-forget.
5. **Update the privacy notice** in `app/terms/page.tsx` when you start storing or sending a new kind of data.

---

## Stack

| Piece | Where | What it records |
|---|---|---|
| `@vercel/analytics` `<Analytics />` | `app/layout.tsx` | Page views, referrers, countries, devices |
| `track()` from `@vercel/analytics` | Client components | Named events (below) |
| `ClickTracker` | `components/ClickTracker.tsx`, mounted once in the layout | Any click on an element with `data-track` |
| `UtmCapture` / `readUtm()` | `components/UtmCapture.tsx` | First-touch `utm_source`, `utm_medium`, `utm_campaign` per session (sessionStorage) |
| `registrations.utm_*` columns | `supabase/migrations/002_utm.sql` | UTM stored with each registration |
| `registration_funnel` view | `supabase/migrations/003_funnel_view.sql` | Registrations, paid, confirmed, paid %, verified revenue per event, source and campaign |

---

## Tracking a click (preferred, works in Server Components)

Add attributes; no JS and no `"use client"` needed. Extra `data-track-*` attributes become properties.

```tsx
<a href={instagram} data-track="social_click" data-track-platform="instagram">Instagram</a>
```

`EventCard` takes a `trackAs` prop that renders `data-track`; other links set `data-track` directly.

## Tracking a state change (client components)

```tsx
import { track } from '@vercel/analytics';

track('registration_step_completed', { event: event.id, step: currentStep });
```

---

## Event names in use

| Event | Fired from | Properties |
|---|---|---|
| `register_viewed` | `RegistrationWizard` mount | `event` |
| `registration_step_completed` | Wizard "Continue" after a valid step | `event`, `step` |
| `registration_submitted` | Wizard, after `/api/register` succeeds | `event` |
| `payment_submitted` | Wizard, after `/api/register/payment` succeeds | `event`, `amount` |
| `contact_sent` | `ContactForm` success | `category` |
| `cta_hero_explore_events` | Home hero button | — |
| `cta_home_featured_event`, `cta_events_view_event` | `EventCard` "Explore" button | — |
| `cta_card_register`, `cta_event_register`, `cta_nav_register` | Register buttons (card, event page, navbar) | — |
| `social_click`, `email_click` | Footer, contact and community social and email links | `platform`, `place` |

Naming: `snake_case`, object first then action for funnel events (`registration_submitted`), `cta_<place>_<action>` for buttons. Reuse a name before adding one.

---

## Reading the funnel

Supabase SQL editor (service role only; the view is revoked from `anon` and `authenticated`):

```sql
select * from registration_funnel order by registrations desc;
```

Share campaign links as `https://<site>/events/diplovia-2026?utm_source=instagram&utm_campaign=<post-or-school>`.

| Metric | Source |
|---|---|
| Event page views | Vercel Analytics, page `/events/diplovia-2026` |
| Started registration | `register_viewed` (Vercel, Pro) or page views of `/register` (free) |
| Submitted | `registration_funnel.registrations` |
| Paid | `registration_funnel.paid` / `paid_percent` |
| Confirmed | `registration_funnel.confirmed` |
