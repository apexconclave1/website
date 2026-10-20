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
- [ ] New photos of Kapish and Vansh when supplied.

### G. SEO, assets, Vercel
- [ ] Title template `%s | Apex Conclave`; per-page descriptions; `metadataBase` from `NEXT_PUBLIC_SITE_URL` (fallback Vercel URL).
- [ ] `app/sitemap.ts`, `app/robots.ts`, OG image from the logo.
- [ ] Restrict `images.remotePatterns` (no remote images are used any more).
- [ ] Vercel deploy steps and env list.

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
- Photos of Kapish and Vansh; SVG of the logo from the designer.
- Delete `/Users/kapishgarg1/Apex Conclave/_cleanup_trash/`.
- Buy the domain, then set `NEXT_PUBLIC_SITE_URL`.
