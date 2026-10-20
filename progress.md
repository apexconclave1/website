# Apex Conclave Website: Progress

Last updated: 2026-10-20. Plan, decisions and acceptance checks: `IMPLEMENTATION_PLAN.md`.

## START HERE (next session)

Phases A to G are done. Next: **Phase H** (final docs pass), then owner steps: Supabase setup, Vercel deploy, real UPI, dates.

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
| E Community, Partners, home Network section | Done 2026-10-20 |
| F Diplovia booklet content | Done 2026-10-20 |
| G SEO, assets, Vercel | Done 2026-10-20 |
| H Docs final pass | Next |

## Phase notes

**A (2026-10-20).** Removed Firebase (`lib/firebase`, `firestore.rules`), the live seat matrix and its fake delegates (`SeatMatrix`, `ApplicationModal`, `SeatSection`, `seats.ts`), and Sanity (`lib/sanity.ts`, `/api/sanity`, `/studio`, `sanity/`, configs). Packages `firebase`, `@sanity/client`, `@sanity/image-url` uninstalled. Committee country lists moved to `chambers.ts` (`portfolios`, placeholders). Event page "Seat matrix" replaced by an "Allotment" section. Event page JS 277 kB to 143 kB. Added README, `.eslintrc.json`, new `.env.example`.

**B (2026-10-20).** `startDate`/`endDate` optional; `formatEventDates()` shows "Dates to be announced". `pricing` (299 early bird for 3 days from `registrationOpensAt`, IST; 399 regular) replaces hard-coded fees. `registrationOpen: false` hides the navbar Register button and shows "Registration opens soon" on home, event page and `/register`. `/events` has a Past events section; the status filter was removed. Check script: `node scripts/check-events.mjs`.

**C (2026-10-20).** New single migration `supabase/migrations/001_init.sql` (old 001/002 removed; the project is fresh). Anon key has no access to any table. `/api/register` rejects closed events and committee/country pairs not in `chambers.ts`, sets the fee on the server, makes `DIP-XXXXXXXX` tracking codes, and returns a clear message for a duplicate email. `/api/register/payment` takes the amount from the database and redeems the coupon with `redeem_coupon()`; the browser amount is ignored. `/api/contact` stores messages in `contact_messages`. Same-origin check on POST routes. Smoke-tested: closed event, foreign origin and bad contact input are rejected. Not tested: a full registration against Supabase.

**D (2026-10-20).** Logo extracted from the design sheet PDF to `public/brand/apex-conclave-logo-light.png` (and `-dark.png`), transparent background; `ApexWordmark` now renders it (40px in the navbar). Hero: StrokeText animates the headline, one CTA. Register page, wizard (stepper, 5 steps, receipt), contact page/form/cards, terms, 404 and error pages rewritten with Tailwind palette classes; decorative icons and `alert()` removed. Shared classes in `globals.css`: `.field-label`, `.field-input`, `.field-error`, `.panel`, `.eyebrow`. Glass, glow and off-palette CSS variables deleted; `HorizonDivider` deleted. Placeholder phone number and X link removed. `next.config.mjs` reads `NEXT_DIST_DIR` so check builds do not overwrite the dev server's `.next`. Screenshots at 1280px reviewed (home, register wizard, contact, terms).

**E (2026-10-20).** New `/partners` and `/community` pages; copy in `partnersContent`, `communityContent` and `partners` (empty list) in `organization.ts`. Navbar has six links and switches to the desktop layout at `lg` (fits at 1024px). Home: "Network" cards (Community, Partners, Team) and an Attend · Partner · Collaborate CTA replace the old Leadership and Contact sections. Contact form accepts `?category=` and has new topics `Join the Community` and `Host an Event`. Logo 48px in the navbar. Social links (footer, contact cards, Community page) now have a clear hover: `.ext-link` (underline + sliding ↗) and `.card-link` (card lifts 2px, border brightens), both in `globals.css`, off under reduced motion. Screenshots reviewed: home, partners, community, navbar at 1024px.

**F (2026-10-20).** Diplovia page rebuilt from the delegate booklet: overview and the delegate's work, How it works (Before / During / After), committees with theme, challenge and who each suits, Who sits at the table, Why MUN, What you take home, then fees, allotment, team (booklet quotes) and FAQ. Copy in `lib/data/eventStory.ts`; `ChamberEntity.executiveBoard` replaced by `theme`, `challenge`, `suits`. Event hero shows the Diplovia logo (`EventEntity.logo`) with "presented by Apex Conclave". Diplovia logo made transparent and compressed to 52 KB (`public/brand/diplovia-logo-light.png`); the old 1.1 MB file is removed and the dark boxes on the home and events cards are gone. Stock Unsplash committee banners removed (the UNSC one showed Barack Obama); the committee gallery shows again once every committee has a real `bannerImage`. "QR delegate pass" removed from the copy because it does not exist. Screenshots reviewed: full event page, home card.

**G (2026-10-20).** Root metadata with title template, `metadataBase` from `lib/site.ts` (site URL, else Vercel production URL, else localhost), Organization JSON-LD; all page titles shortened so the template adds "| Apex Conclave"; `app/events/layout.tsx` gives `/events` its metadata (the page is a client component) and keeps the template for event pages. Added `sitemap.xml`, `robots.txt`, favicon/apple icon/OG image built from the approved logo. Removed the wildcard `images.remotePatterns`; added basic security headers in `next.config.mjs`. New Kapish photo (`public/leadership/kapish-garg.jpg`), Ayush photo compressed. README has Vercel deploy steps. Checked on the dev server: titles, og:image, sitemap, robots, headers.

## Site map

- `/` home: hero, featured event, about, network, Attend · Partner · Collaborate CTA.
- `/events` upcoming and past events from `src/lib/data/events.ts`.
- `/events/diplovia-2026` overview, how it works, committees, who sits at the table, why MUN, outcome, fees, allotment, team, FAQ.
- `/register?event=diplovia-2026` wizard (closed until `registrationOpen: true`).
- `/about`, `/community`, `/partners`, `/contact` (accepts `?category=`), `/terms`, `/faq`. `/committees` redirects to the Diplovia committees.

## Decisions

See the table in `IMPLEMENTATION_PLAN.md`. Short version: preference-based allotment, manual UPI payments, Supabase only, design-sheet logo, effects allowed, booklet copy, Instagram and LinkedIn only, Vercel.

## Known gaps

- Hero StrokeText: headless Chrome stalls its animation; check in a real browser.
- Committee gallery hidden until real committee photos exist. No study guides yet.
- No QR delegate pass exists (only a tracking code on the receipt).
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
