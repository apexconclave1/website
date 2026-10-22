# Apex Conclave Website: Progress

Last updated: 2026-10-20. Plan, decisions and acceptance checks: `IMPLEMENTATION_PLAN.md`.

## START HERE (next session)

**Redesign v3 in progress (branch `redesign`).** Brief: `../one.md`. Plan, owner decisions and phase list: "Redesign v3" in `IMPLEMENTATION_PLAN.md`. Phases 1–3 done 2026-10-22; next is Phase 4 (Event Verticals page). The owner commits each phase; stop after each phase and report.

Site credit: "Website by Kapish Garg" is not shown on the page; it lives in the author/creator meta tags, WebSite JSON-LD (`websiteSchema` in `lib/seo.ts`) and `public/llms.txt`.

After each phase: `npx tsc --noEmit`, `npm run lint`, `NEXT_DIST_DIR=.next-build npm run build` (separate folder so it does not break a running `npm run dev`), then update this file and `IMPLEMENTATION_PLAN.md`.

## Redesign v3 phase notes

**Phase 1, foundation (2026-10-22).** New palette tokens in `tailwind.config.ts` and `globals.css`: `ink`, `cream`, `bronze`, `paper`, `stone`, `hairline`. Old tokens (`bg`, `surface`, `soft-white`, `muted-grey`, `warm-bronze`, `deep-teal`, `line`, `line-strong`) removed and every class moved across about 40 files: secondary text on ink is `cream/70`, borders `cream/10` to `/30`, panels are `bg-ink` with a border (no fill, so ScrollStack cards do not show through). Newsreader loaded with next/font (`--font-newsreader`, `font-serif`) and applied to `h1, h2` in `globals.css`; Inter stays for everything else. All radii are 2px. New `.btn-primary` and `.btn-secondary` classes replace SpecularButton and the copied inline button classes. Removed DarkVeil, StrokeText, SpecularButton, AccordionGallery, DepthCarousel and TeamCarousel; `ogl` and `gsap` uninstalled. The home Team section temporarily uses `TeamCard` (Phase 7 replaces it). The hero headline is real text now (still the old copy until Phase 3). ScrollStack cards: 2px, hairline border, no shadow. Terms sidebar (LineSidebar, SectionNavigator) and the Diplovia share image use the new colours. Contrast checked: cream/ink 15.7, cream/70 7.9, placeholder cream/55 5.2, bronze/ink 4.7; stone on ink (3.6) and bronze text on paper (3.65) are not allowed. Home JS 154 to 101 kB. DESIGN.md rewritten; AGENTS.md, frontend-design, improve-animations, improve-react, analytics and seo-audit skills and README updated. Screenshots reviewed at 1280px (home, event page, register) and 600px (home). Headless Chrome cannot render below about 500px wide, so phone widths are checked in Phase 10.

**Phase 2, navigation and footer (2026-10-22).** Navbar: Home, About, Event Verticals, Events, Team (`/about#team`), Partners, Contact; active page gets a thin bronze underline; fits at 1024px. Right button is "Partner With Us" (`partnerEnquiryHref` in `organization.ts`, also used by `/partners`), or "Register" while an event's registration is open. Mobile menu: full-width list with hairline rows, closes on tap (needed for the same-page `#team` link), Escape still closes and returns focus. Footer: logo, `organizationConfig.description` (new field, the brief's line), site links, events, email and the two socials, Terms & Privacy and Code of Conduct; padding moved inside the container so it lines up with the nav. Community left the nav and footer (page stays until the Phase 8 merge and redirect). New `src/lib/data/verticals.ts` (six verticals, `active` or `planned`) and a simple `/verticals` page (numbered rows, Active/Planned label; full layout in Phase 4); added to the sitemap. About team section has `id="team"`. Checked: tsc, lint, build, every internal link on 11 pages returns 200, screenshots at 1024 and 1280px. Mobile menu not clicked in a browser (headless Chrome cannot tap); check it on a phone.

**Phase 3, home hero and About (2026-10-22).** Hero (`components/home/HeroSection.tsx`): screen-height on ink (capped at 60rem for very tall screens), serif headline "A bigger stage for a bolder generation." at up to 104px, the brief's supporting line, "Explore Events" and "Partner With Us" buttons; no label above the headline, logo only in the nav. Along the bottom, behind a hairline: the six verticals by short name (`short` in `verticals.ts`), each linking to its row on `/verticals` (rows now have ids), and "Now: Diplovia 2026 · Dates to be announced" linking to the event (first upcoming or live event). Home About is the first paper section: split layout, "More than events. A platform for what’s next." with the brief's copy in stone, and the four ideas (Experience, Competition, Community, Opportunity) as an open 2×2 list with hairline rules and 20px bronze Lucide icons (Compass, Target, Users, DoorOpen). Content in `homeContent.about`; old `eyebrow` and `pillars` removed. `homeContent.summary` is the new line; it is also the layout's fallback meta description (176 characters, tidy in Phase 9). Removed a doubled hairline under the hero. Checked: tsc, lint, build, screenshots at 1440, 1280 and 600px.

## What this is

Website of **Apex Conclave**, an umbrella brand for youth events. **Diplovia 2026** (virtual Model UN, dates moving, to be announced) is the first event.

Stack: Next.js 14 (App Router), React 18, TypeScript, Tailwind 3, Supabase, Zod, Vercel Analytics. Fonts: Newsreader (headlines) and Inter. Hosting: Vercel (planned).

**Deployed (2026-10-20).** Live at https://website-apc20.vercel.app (Vercel, public, Analytics script loading). `NEXT_PUBLIC_SITE_URL` set to that address after the fallback pointed canonicals and sitemap to a dead `website-theta-ten-15.vercel.app`. Checked live: all 9 sitemap URLs 200, Diplovia OG image, robots, `/register` noindex, security headers, contact API validation. Not yet: contact form into Supabase, test registration, previews, Search Console, PageSpeed.

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

**Skills steps 3–5 (2026-10-20).** Server `/events`, lazy ogl in SpecularButton, Supabase browser client removed, funnel and click tracking (`ClickTracker`, `003_funnel_view.sql`, run by owner 2026-10-20), privacy notice updated, `line`/`line-strong` and 1240px container tokens, one eyebrow style, home reuses `EventCard`. After changing `tailwind.config.ts`, restart `npm run dev` (the running dev server keeps the old config and shows "border-line-strong does not exist").

**Skills steps 6–7 (2026-10-20).** Motion: brand curve is Tailwind's default `transition` easing (`ease-out` classes removed); wizard steps fade and rise 8px over 200ms (`animate-step-in`, re-keyed per step); `SectionHeading` has an 8px scroll-linked rise (`.rise`, transform only, `@supports animation-timeline: view()`, off under reduced motion); FAQ uses plus/minus instead of a rotating chevron and opens with a `grid-template-rows` transition (answers now always in the HTML, `invisible` when closed). Skill files: the five in `.agents/skills/` rewritten for the real stack (Supabase, preference allotment, Vercel Analytics, CSS-only motion, approved effect exceptions, bundle budget); `SKILLS_MASTER_GUIDE.md` drops the missing Sanity skill. `seo-audit` and `programmatic-seo` skills still mention 2025, seat pages and Sanity (not in scope). Bundle unchanged. FAQ open state and the rise still need a look in a real browser.

**SEO audit (2026-10-20).** Kapish's bio no longer mentions the website. `seo-audit` and `programmatic-seo` skills rewritten for the real site. Findings: page `openGraph` replaces the layout's (Diplovia and register previews have no image; 7 pages reuse the home preview; no `og:url`); event title lacks search words; 7 descriptions outside 120-160 chars; `/register` blocked in robots.txt instead of `noindex`; home `h1` is SVG only. Kapish's LinkedIn is `linkedin.com/in/gargkapish` everywhere (old `kapish-garg-8335a0282` removed).

**SEO steps 1–5 (2026-10-20).** `pageMetadata()` in `lib/seo.ts` gives every page its own title, description (all 120–160 chars), canonical, `og:url`, image and Twitter tags. Diplovia share image `app/events/[slug]/opengraph-image.tsx` (also used in the Event schema). Event title from `searchTitle`: "Diplovia 2026: Virtual Model UN". `/register` is `noindex`; robots.txt blocks only `/api/`. Home `h1` has visually hidden text; the StrokeText SVG is `aria-hidden`. New descriptions were written by Claude: owner to review.

**404 page (2026-10-20).** "404" drawn with React Bits `FuzzyText` (`components/ui/FuzzyText.jsx`, JS source as supplied, no new package; intro static then light fuzz, stronger on hover; still under reduced motion). Recorded as the sixth approved effect in DESIGN.md and the design and animation skills.

**Team carousel and new ScrollStack (2026-10-20).** Home Team section uses React Bits `DepthCarousel` (`components/ui/DepthCarousel.jsx` + `.css`, uses the installed GSAP) through `components/team/TeamCarousel.tsx`: photos turn in 3D; the front person's name, role and bio show below (all three bios stay in the HTML). Network stays as cards (no images; owner choice). `/events` uses the newer React Bits `ScrollStack.jsx` (no Lenis; types in `ScrollStack.d.ts`; side padding reset by `.events-stack` in `globals.css`). `/events` 122 to 117 kB, home 151 to 154 kB. `lenis` uninstalled by owner. Each team member has a `linkedin` field (`leadershipTeam`); the name in the carousel caption links to it (new tab, hover arrow). All three set. TeamCard still used on About and Community.

## Site map

- `/` home: hero, featured event, about, network, Attend · Partner · Collaborate CTA.
- `/events` upcoming and past events from `src/lib/data/events.ts`.
- `/events/diplovia-2026` overview, how it works, committees, who sits at the table, why MUN, outcome, fees, allotment, team, FAQ.
- `/register?event=diplovia-2026` wizard (closed until `registrationOpen: true`).
- `/about`, `/community`, `/partners`, `/contact` (accepts `?category=`), `/terms`, `/faq`. `/committees` redirects to the Diplovia committees.

## Decisions

See the table in `IMPLEMENTATION_PLAN.md`. Short version: preference-based allotment, manual UPI payments, Supabase only, design-sheet logo, effects allowed, booklet copy, Instagram and LinkedIn only, Vercel.

## Known gaps

- Committee gallery hidden until real committee photos exist. No study guides yet.
- No QR delegate pass exists (only a tracking code on the receipt).
- Rate limiting is in memory per server instance (weak on Vercel); see the `ponytail:` note in `lib/security/rate-limit.ts`.

## Owner to-do

See "Owner to-do" in `IMPLEMENTATION_PLAN.md` (Supabase setup, real UPI, new dates, country lists, photos, delete `_cleanup_trash/`, domain).

## Practical notes

- Work in `website/`. `npm run dev` for development.
- Check build next to a running dev server: `NEXT_DIST_DIR=.next-build npm run build`.
- Port busy: `lsof -ti :3000 | xargs kill`.
- Headless Chrome cannot judge WebGL effects; use a real browser.
