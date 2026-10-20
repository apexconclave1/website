# Apex Conclave Website: Progress

Last updated: 2026-10-20. Plan, decisions and acceptance checks: `IMPLEMENTATION_PLAN.md`.

## START HERE (next session)

Phases A to G and the launch audit are done. Skills review published (https://claude.ai/artifact/Q8bwoZfY9GMBJEsYvp9hsH) with a 7-step plan; waiting for the owner to pick steps. Then Phase H (final docs pass) and owner steps: Vercel deploy, Analytics on, Resend key, Search Console, real UPI, dates.

Site credit: "Website by Kapish Garg" is not shown on the page; it lives in the author/creator meta tags, WebSite JSON-LD (`websiteSchema` in `lib/seo.ts`) and `public/llms.txt`. Kapish's team bio still says he built the website.

After each phase: `npx tsc --noEmit`, `npm run lint`, `NEXT_DIST_DIR=.next-build npm run build` (separate folder so it does not break a running `npm run dev`), then update this file and `IMPLEMENTATION_PLAN.md`.

## What this is

Website of **Apex Conclave**, an umbrella brand for youth events. **Diplovia 2026** (virtual Model UN, dates moving, to be announced) is the first event.

Stack: Next.js 14 (App Router), React 18, TypeScript, Tailwind 3, ogl/GSAP/Lenis (effects only), Supabase, Zod, Vercel Analytics. Font: Inter only. Hosting: Vercel (planned).

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

**Photos (2026-10-20).** Vansh's photo added; Ayush's recropped to the face (from the original in the first commit). New `components/team/TeamCard.tsx` (80px photo, name, role, quote) replaces three separate team markups: About, Community and the event page Team section.

**Launch audit (2026-10-20).** See the "Launch audit" list in `IMPLEMENTATION_PLAN.md` for every item. New files: `components/JsonLd.tsx`, `components/Breadcrumbs.tsx`, `components/UtmCapture.tsx`, `components/ui/BackToTop.tsx`, `components/team/TeamCard.tsx`, `lib/seo.ts`, `supabase/migrations/002_utm.sql`. New package: `@vercel/analytics`. New env (optional): `RESEND_API_KEY`, `RESEND_FROM`, `GOOGLE_SITE_VERIFICATION`. Verified: build, lint, events check, canonicals and JSON-LD in page HTML, link crawl, reduced-motion screenshot (hero headline renders fully).

**Skills steps 1–2 (2026-10-20).** Form autocomplete, Escape on the mobile menu, footer heading semantics, `text-wrap`, global reduced-motion rule; framer-motion removed (Button and ScrollProgress now CSS). Bundles: `/contact` 121 kB (was 159), `/register` 145 kB (was 182). Not verified in a real browser: the CSS scroll-progress bar (headless Chrome does not update scroll timelines).

**Skills steps 3–5 (2026-10-20).** Server `/events`, lazy ogl in SpecularButton, Supabase browser client removed, funnel and click tracking (`ClickTracker`, `003_funnel_view.sql`, owner to run), privacy notice updated, `line`/`line-strong` and 1240px container tokens, one eyebrow style, home reuses `EventCard`. After changing `tailwind.config.ts`, restart `npm run dev` (the running dev server keeps the old config and shows "border-line-strong does not exist").

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
