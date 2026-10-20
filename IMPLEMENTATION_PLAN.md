# Apex Conclave: Implementation Plan (v2, from 2026-10-20)

Goal: the **Apex Conclave umbrella website**, built to `docs/Apex_Conclave_Developer_Design_Sheet.pdf`, with **Diplovia 2026** as the first event at `/events/diplovia-2026`. Registration must be safe to open for real payments.

Sources of truth: the design sheet PDF, `docs/Diplovia_2026_Delegate_Booklet_home_print.pdf` (event copy), `.agents/DESIGN.md`, `.agents/AGENTS.md`. Status per phase is in `progress.md`.

## Owner decisions (2026-10-20)

| Topic | Decision |
|---|---|
| Diplovia dates | Moving later. Show "Dates to be announced"; registration closed until dates are set. |
| Seat allotment | Preference-based: delegates list 2 choices, the team assigns seats by hand. No live seat matrix. |
| Payment | Manual UPI + UTR, checked by hand in the Supabase dashboard. Dummy UPI id/QR for now. Coupons stay. |
| Backend | Supabase only, fresh project (owner creates it and runs `supabase/migrations/001_init.sql`). |
| Sanity / Firebase | Removed. |
| Logo | Use the approved logo from the design sheet (`public/brand/`). Never redraw it in type. |
| Pages | Add Community and Partners now. Sponsorship tiers and prices are **not** public. |
| Effects | Keep DarkVeil, StrokeText, AccordionGallery, SpecularButton, ScrollStack. DESIGN.md updated to allow them. |
| Email | Skip paid services. Contact messages are stored in Supabase. Revisit Resend (free tier) once a domain exists. |
| Hosting | Vercel. Domain not bought yet. |
| Social | Instagram and LinkedIn only (no X). |
| Copy source | Delegate booklet (not the sponsorship brochure) for Diplovia copy and team quotes. |

## Phases

Each phase ends with `npx tsc --noEmit`, `npm run lint` and a build passing, and with `progress.md` updated.
While `npm run dev` runs, build into a separate folder: `NEXT_DIST_DIR=.next-build npm run build`.

### A. Remove unused systems (DONE 2026-10-20)
- [x] Remove Firebase (`lib/firebase`, `firestore.rules`, package), live seat matrix (`SeatMatrix`, `ApplicationModal`, `SeatSection`, `seats.ts` with fake delegates).
- [x] Remove Sanity (`lib/sanity.ts`, `/api/sanity`, `/studio`, `sanity/`, configs, packages).
- [x] Committee country lists live in `chambers.ts` (`portfolios`); wizard reads them for the event in `?event=`.
- [x] `.env.example` rewritten; README and `.eslintrc.json` added.

### B. Event data (DONE 2026-10-20)
- [x] Optional dates: "Dates to be announced" everywhere via `formatEventDates()`.
- [x] `pricing` + `registrationOpensAt` in `events.ts`; `eventFees()` for display, `feeAt()` for the server. Check: `node scripts/check-events.mjs`.
- [x] Closed registration: navbar Register hidden, `/register` shows "Registration opens soon", event/home show it too.
- [x] `/events`: upcoming list plus a "Past events" section (status `COMPLETED`/`ARCHIVED`).

### C. Backend (DONE 2026-10-20, not yet run against a real database)
- [x] `supabase/migrations/001_init.sql`: registrations (with `event_id`, unique email per event, assigned seat columns), coupons, `redeem_coupon()`, contact_messages, private `payment-proofs` bucket. RLS on, no anon policies.
- [x] `/api/register`: event must be open; committee/country validated against `chambers.ts`; fee set by the server; random tracking code `DIP-XXXXXXXX`.
- [x] `/api/register/payment`: amount from the database row; coupon re-checked and redeemed atomically; browser amount ignored.
- [x] `/api/contact`: shared Zod schema (`lib/validators/contact.ts`), stores to `contact_messages`.
- [x] Same-origin check on all POST routes; UPI id/QR in `paymentConfig`.
- [ ] Owner: create Supabase project, run the SQL, fill `.env.local`, test one registration end to end.

### D. Brand and restyle (DONE 2026-10-20)
- [x] Logo extracted from the design sheet to `public/brand/apex-conclave-logo-{light,dark}.png`; used by `ApexWordmark` (navbar, footer).
- [x] Hero: one statement (StrokeText animates the headline), one supporting line, one CTA.
- [x] Register page, all 5 wizard steps, receipt, contact page/form/cards, terms, 404, error page moved from inline styles to Tailwind palette tokens; decorative icons removed; `alert()` replaced by inline errors.
- [x] `globals.css` reduced to palette tokens + form primitives (`.field-input`, `.panel`, `.eyebrow`, ...). Glass, glow and off-palette variables removed.
- [x] DESIGN.md / AGENTS.md: effects officially allowed.
- [x] Placeholder phone "+91 XXXXX XXXXX" and X link removed.

### E. New pages (DONE 2026-10-20)
- [x] Nav: Home, Events, About, Community, Partners, Contact (desktop nav from `lg`; hamburger below). Footer links added.
- [x] `/partners`: why partner and what a partnership can include (from the brochure, no tiers, prices or unverified numbers), partner logo grid from `partners` in `organization.ts` (empty state until confirmed), CTA to `/contact?category=Sponsorship & Partnership`.
- [x] `/community`: delegates, speakers and dais, volunteers; team; "Get involved" CTA (`Join the Community` topic); Instagram/LinkedIn.
- [x] Home: Leadership and Contact sections replaced by "Network" (Community, Partners, Team) and an Attend · Partner · Collaborate CTA. New contact topic `Host an Event`.
- [x] Logo bumped to 48px (navbar) / 60px (footer) for a readable "CONCLAVE".
- [x] Hover state on every social link: `.ext-link` and `.card-link` in `globals.css`.

### F. Diplovia content (DONE 2026-10-20)
- [x] Event page sections from the booklet: Overview ("Diplomacy without a border" + the delegate's work), How it works (Before / During / After), Committees with theme, challenge and "Suits", Who sits at the table, Why MUN (7 skills), What you take home. Copy in `lib/data/eventStory.ts` (keyed by event id); committee fields `theme`, `challenge`, `suits` in `chambers.ts`.
- [x] Booklet quotes for the team (home, about, event page). Diplovia logo in the event hero with "presented by Apex Conclave".
- [x] Diplovia logo made transparent and compressed: `public/brand/diplovia-logo-light.png` (52 KB, was 1.1 MB); dark boxes behind it removed.
- [x] Study-guide `#` links removed. Stock committee banners removed (UNSC was a photo of Barack Obama); the gallery returns when every committee has a real `bannerImage`.
- [x] "QR delegate pass" claim removed from features and FAQ (no QR pass exists in the code).
- [x] New photo of Kapish (2026-10-20).
- [x] Photo of Vansh (2026-10-20). All three photos cropped to the face, 512px JPEG. Shared `components/team/TeamCard.tsx` shows them on About, Community and event pages.

### G. SEO, assets, Vercel (DONE 2026-10-20)
- [x] Title template `%s | Apex Conclave` (root layout; `app/events/layout.tsx` keeps it for event pages); per-page titles and descriptions; event pages have a canonical URL.
- [x] `metadataBase` and URLs from `lib/site.ts`: `NEXT_PUBLIC_SITE_URL`, else `VERCEL_PROJECT_PRODUCTION_URL`, else localhost.
- [x] `app/sitemap.ts`, `app/robots.ts` (disallow `/api/`, `/register`), Organization JSON-LD in the root layout.
- [x] Favicon, apple icon, OG/Twitter image generated from the approved logo (the old favicon was an unrelated emblem).
- [x] `images.remotePatterns` removed (all images local). Security headers (nosniff, frame DENY, referrer, permissions).
- [x] Photos: new Kapish photo (32 KB), Ayush photo compressed (107 KB to 26 KB).
- [x] README: Vercel deploy steps and env list.

### Launch audit (DONE 2026-10-20)
- [x] Team with photos and bios on the home page (removed from the Diplovia page); `leaders.ts` removed.
- [x] Skip-to-content link; `<main id="main-content">` on every page; `/events` H1 (`SectionHeading as="h1"`).
- [x] Reduced motion: DarkVeil one still frame, ScrollStack without Lenis, scroll bar without spring, Button without tap scale.
- [x] AVIF + WebP via `images.formats`; gallery `<img>` lazy.
- [x] Canonical on every page; JSON-LD via `components/JsonLd.tsx` + `lib/seo.ts`: Organization, FAQPage (`/faq`, event page), BreadcrumbList (event page, visible `Breadcrumbs`), Event (only once dates exist).
- [x] Cross-links (Partners ↔ Community, About → both, event FAQ → general FAQ). Crawl of 12 internal URLs: no 404s.
- [x] Back-to-top button, print stylesheet, confirm `<dialog>` before payment submit, register loading skeleton.
- [x] UTM capture (`components/UtmCapture.tsx`, first touch per session) stored on registrations (`002_utm.sql`, run by owner).
- [x] Vercel Web Analytics (`@vercel/analytics`) + events `registration_submitted`, `payment_submitted`, `contact_sent`. Custom events need a Vercel Pro plan to appear in the dashboard; page views work on Hobby.
- [x] Contact email notification via Resend REST API (`RESEND_API_KEY`), non-blocking.
- [x] Search Console verification tag from `GOOGLE_SITE_VERIFICATION`.
- [x] Copy rewritten from the booklet's own wording (tagline, manifesto, pillars, overview); bios added; "Website by Kapish Garg" in the footer.
- Skipped with reason: dark mode toggle (dark-only brand), site search (about 10 pages), password toggle (no passwords), toasts (inline feedback already), floating contact button (contact in nav, footer and CTAs), cookie banner (Vercel Analytics sets no cookies), strict CSP (needs nonces, little gain without logins).

### Skills review, steps 1 and 2 (DONE 2026-10-20)
Report: https://claude.ai/artifact/Q8bwoZfY9GMBJEsYvp9hsH
- [x] Step 1: `autocomplete` on registration and contact fields (name, email, tel, organization, address-level2, country-name; off for partner, coupon, UTR, subject); Escape closes the mobile menu and returns focus (`aria-controls` added); footer column headings are `<p>` instead of `<h4>`; `text-wrap: balance` on headings and `pretty` on paragraphs; global reduced-motion rule for CSS transitions and animations.
- [x] Step 2: `framer-motion` uninstalled. `Button` is a plain `<button>` with CSS `active:scale-[0.98]` and uses `cn()`; `ScrollProgress` runs on a CSS scroll-driven animation (`.scroll-progress` in `globals.css`) with a passive scroll listener only where unsupported. `/contact` 159 to 121 kB, `/register` 182 to 145 kB first-load JS; other routes unchanged.
- [ ] Steps 3 to 7 of the report: owner to choose.

### H. Docs
- [ ] Final pass on README, progress, AGENTS, PRODUCT, DESIGN.

## Acceptance checks

1. `npx tsc --noEmit`, `npm run lint`, build pass.
2. `grep -rni "firebase\|sanity" src package.json` empty.
3. Outside the 5 effect components: no `backdrop`, gradient, `box-shadow`, or off-palette hex (`F4F1EA`, `9A9490`, `CDC7C0`, `BA9C7A`).
4. A tampered request cannot change the amount paid (server computes it); the anon key cannot read or write any table.
5. `node scripts/check-events.mjs` passes.
6. No horizontal scroll at 390px on any route.

## Owner to-do (not code)

- Run the SQL in a new Supabase project; fill `.env.local`.
- Real UPI id and QR (`paymentConfig` in `src/lib/data/organization.ts`, `public/payment/upi-qr.jpg`).
- New dates: set `startDate`, `endDate`, `registrationOpensAt`, `registrationOpen: true` in `src/lib/data/events.ts`.
- Final country/character lists per committee (`src/lib/data/chambers.ts`; HC has 4 of 18).
- Real photos for the 5 committees (`bannerImage` in `chambers.ts`) to bring back the committee gallery.
- Decide on a QR delegate pass (removed from the copy because it was never built).
- SVG of the logo from the designer.
- Delete `/Users/kapishgarg1/Apex Conclave/_cleanup_trash/`.
- Buy the domain, then set `NEXT_PUBLIC_SITE_URL`.
