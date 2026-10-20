# Apex Conclave Website: Progress

Last updated: 2026-10-20. Plan, decisions and acceptance checks: `IMPLEMENTATION_PLAN.md`.

## START HERE (next session)

Phases A to D are done. Next: **Phase E** (Community and Partners pages, home "Network" section), then F (Diplovia booklet content), G (SEO, assets, Vercel), H (docs).

After each phase: `npx tsc --noEmit`, `npm run lint`, `NEXT_DIST_DIR=.next-build npm run build` (separate folder so it does not break a running `npm run dev`), then update this file and `IMPLEMENTATION_PLAN.md`.

## What this is

Website of **Apex Conclave**, an umbrella brand for youth events. **Diplovia 2026** (virtual Model UN, dates moving, to be announced) is the first event.

Stack: Next.js 14 (App Router), React 18, TypeScript, Tailwind 3, Framer Motion, ogl/GSAP/Lenis (effects), Supabase, Zod. Font: Inter only. Hosting: Vercel (planned).

## Status

| Phase | State |
|---|---|
| A Remove Firebase, Sanity, seat matrix | Done 2026-10-20 |
| B Event data (TBA dates, pricing, closed registration, past events) | Done 2026-10-20 |
| C Backend (fresh Supabase schema, server-side pricing, contact storage) | Done 2026-10-20; not yet tested against a real database |
| D Logo and restyle to palette | Done 2026-10-20 |
| E Community, Partners, home Network section | Next |
| F Diplovia booklet content | Pending |
| G SEO, assets, Vercel | Pending |
| H Docs final pass | Pending |

## Phase notes

**A (2026-10-20).** Removed Firebase (`lib/firebase`, `firestore.rules`), the live seat matrix and its fake delegates (`SeatMatrix`, `ApplicationModal`, `SeatSection`, `seats.ts`), and Sanity (`lib/sanity.ts`, `/api/sanity`, `/studio`, `sanity/`, configs). Packages `firebase`, `@sanity/client`, `@sanity/image-url` uninstalled. Committee country lists moved to `chambers.ts` (`portfolios`, placeholders). Event page "Seat matrix" replaced by an "Allotment" section. Event page JS 277 kB to 143 kB. Added README, `.eslintrc.json`, new `.env.example`.

**B (2026-10-20).** `startDate`/`endDate` optional; `formatEventDates()` shows "Dates to be announced". `pricing` (299 early bird for 3 days from `registrationOpensAt`, IST; 399 regular) replaces hard-coded fees. `registrationOpen: false` hides the navbar Register button and shows "Registration opens soon" on home, event page and `/register`. `/events` has a Past events section; the status filter was removed. Check script: `node scripts/check-events.mjs`.

**C (2026-10-20).** New single migration `supabase/migrations/001_init.sql` (old 001/002 removed; the project is fresh). Anon key has no access to any table. `/api/register` rejects closed events and committee/country pairs not in `chambers.ts`, sets the fee on the server, makes `DIP-XXXXXXXX` tracking codes, and returns a clear message for a duplicate email. `/api/register/payment` takes the amount from the database and redeems the coupon with `redeem_coupon()`; the browser amount is ignored. `/api/contact` stores messages in `contact_messages`. Same-origin check on POST routes. Smoke-tested: closed event, foreign origin and bad contact input are rejected. Not tested: a full registration against Supabase.

**D (2026-10-20).** Logo extracted from the design sheet PDF to `public/brand/apex-conclave-logo-light.png` (and `-dark.png`), transparent background; `ApexWordmark` now renders it (40px in the navbar). Hero: StrokeText animates the headline, one CTA. Register page, wizard (stepper, 5 steps, receipt), contact page/form/cards, terms, 404 and error pages rewritten with Tailwind palette classes; decorative icons and `alert()` removed. Shared classes in `globals.css`: `.field-label`, `.field-input`, `.field-error`, `.panel`, `.eyebrow`. Glass, glow and off-palette CSS variables deleted; `HorizonDivider` deleted. Placeholder phone number and X link removed. `next.config.mjs` reads `NEXT_DIST_DIR` so check builds do not overwrite the dev server's `.next`. Screenshots at 1280px reviewed (home, register wizard, contact, terms).

## Site map

- `/` home: hero, featured event, about, leadership, contact CTA.
- `/events` upcoming and past events from `src/lib/data/events.ts`.
- `/events/diplovia-2026` overview, committees, fees, allotment, team, FAQ.
- `/register?event=diplovia-2026` wizard (closed until `registrationOpen: true`).
- `/about`, `/contact` (accepts `?category=`), `/terms`, `/faq`. `/committees` redirects to the Diplovia committees.

## Decisions

See the table in `IMPLEMENTATION_PLAN.md`. Short version: preference-based allotment, manual UPI payments, Supabase only, design-sheet logo, effects allowed, booklet copy, Instagram and LinkedIn only, Vercel.

## Known gaps

- Hero StrokeText: headless Chrome stalls its animation; check in a real browser.
- Diplovia logo on the home card and events page has a dark box behind it and is 1.1 MB (Phase G).
- Committee banner images are Unsplash stock (`chambers.ts`). Study guide links are `#`.
- Rate limiting is in memory per server instance (weak on Vercel); see the `ponytail:` note in `lib/security/rate-limit.ts`.
- `lib/supabase/client.ts` and `@supabase/ssr` are unused (browser key has no access now). Left in place.
- DarkVeil runs site-wide without pausing off-screen; each SpecularButton is its own WebGL context.

## Owner to-do

See "Owner to-do" in `IMPLEMENTATION_PLAN.md` (Supabase setup, real UPI, new dates, country lists, photos, delete `_cleanup_trash/`, domain).

## Practical notes

- Work in `website/`. `npm run dev` for development.
- Check build next to a running dev server: `NEXT_DIST_DIR=.next-build npm run build`.
- Port busy: `lsof -ti :3000 | xargs kill`.
- Headless Chrome cannot judge WebGL effects; use a real browser.
