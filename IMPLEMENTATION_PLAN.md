# Apex Conclave: Implementation Plan (v2, from 2026-10-20)

Goal: the **Apex Conclave umbrella website**, built to `docs/Apex_Conclave_Developer_Design_Sheet.pdf`, with **Diplovia 2026** as the first event at `/events/diplovia-2026`. Registration must be safe to open for real payments.

Sources of truth: the design sheet PDF, `docs/Diplovia_2026_Delegate_Booklet_home_print.pdf` (event copy), `.agents/DESIGN.md`, `.agents/AGENTS.md`. Status per phase is in `progress.md`.

## Redesign v3 (from 2026-10-22)

Source: owner brief `../one.md`. Goal: present Apex Conclave as a multi-format student events and competitions brand; Diplovia becomes one featured event. Keep all working functionality (registration, Supabase, APIs, forms, SEO, analytics). The owner commits each phase; Claude stops after each phase and reports.

### Owner decisions (2026-10-22)

| Topic | Decision |
|---|---|
| Inputs | Work from the brief only (no strategy document or visual reference supplied) |
| Photos | None: typography and composition carry the hero and verticals; no stock or AI photos |
| Diplovia artwork | Extract from the PDFs in `docs/` |
| Palette | Brief palette replaces the design sheet; teal removed; DESIGN.md rewritten |
| Fonts | Newsreader (headlines) + Inter |
| Effects | Keep ScrollStack (`/events`) and FuzzyText (404). Remove DarkVeil, StrokeText, SpecularButton, AccordionGallery, DepthCarousel |
| Radius | 2px everywhere |
| Light sections | Verticals and Partnership on paper; Hero, Diplovia, Team and Footer on ink |
| Verticals | Own page `/verticals`; no page per vertical; planned verticals get a "Register interest" link to the contact form |
| Verticals list | The six in the brief, in that order; only Diplomacy & MUNs is active |
| Nav | Home, About, Event Verticals, Events, Team, Partners, Contact; links open existing pages |
| Community | Merged into About; `/community` redirects to `/about` |
| Hero headline | "A bigger stage for a bolder generation" |
| Team | The 3 founders; bios stay as they are for now |
| Footer | Terms & Privacy stays one page; Instagram and LinkedIn only |
| Partners audience line | Reword as an intended audience, not a claim |
| Scope | Whole site |
| Git | Work on branch `redesign`; owner commits each phase |
| Verticals before Phase 4 | Simple real `/verticals` page in Phase 2, so no commit has a broken link |
| Nav button | "Partner With Us" (contact form, Sponsorship & Partnership topic); switches to "Register" while an event's registration is open |
| Hero | Logo in the nav only; no label above the headline; composition is headline + disciplines index (no photo) |
| Home About | On paper |
| Verticals on home | Yes: compact paper section after the hero, plus the full `/verticals` page |
| Register interest | New contact topic 'Register Interest' with the subject prefilled ('Interest: <vertical>') |
| Diplovia artwork | Delegate booklet cover, cropped above its old printed dates (`public/events/diplovia-2026-poster.jpg`) |
| Featured details | Format, dates, venue, committees, registration status; no fees; 'All events' link kept, 'more events' note dropped |
| Partner enquiries | One topic ('Sponsorship & Partnership'), subject prefilled per collaboration type |
| /partners blocks | Keep 'what a sponsorship can include' (generic wording); reword 'why partner' as intentions; hide 'Who we work with' until real partners exist |
| Team | Three portraits, black and white (CSS grayscale), heading kept, 'How we run events' list with the owner-approved copy; new photos for Ayush and Kapish (Kapish's file is a real photo, retouched, per owner) |
| Home partnership layout | Flipped: list left, text right on large screens (text first on phones) |
| About page | Paper mission header, What we run, Who it brings together (from Community), Team with quotes and standards, Get involved / Follow along |
| Terms | Rewritten for all events (owner request in Phase 9): same refund numbers for every event plus a per-event override line; general conduct rules plus one line per format; guardian consent for under-18s; 'organising team' decides in-event matters, Apex Conclave handles disputes |
| Event page hero | Logo only, no artwork |
| Team link | Removed from navbar and footer (owner, 2026-10-22); `/about#team` still works |
| Vertical icons | Landmark, BriefcaseBusiness, Code, Mic, Sprout, Gamepad2 (Lucide, bronze) |
| Footer text | The brief's line: "Apex Conclave creates platforms for students to compete, collaborate and showcase their abilities across business, technology, diplomacy, debate and more." |

### Phases

- [x] 1. Foundation: tokens, fonts, 2px radius, effect removal, button classes, DESIGN.md (2026-10-22)
- [x] 2. Navigation and footer (2026-10-22)
- [x] 3. Home hero and About section (2026-10-22)
- [x] 4. Event Verticals (`/verticals`, data with active/planned status) (2026-10-22)
- [x] 5. Featured Diplovia section (artwork from `docs/` PDFs) (2026-10-22)
- [x] 6. Partnerships (home section, `/partners`, contact form topics) (2026-10-22)
- [x] 7. Team (2026-10-22)
- [x] 8. Other pages (About + Community merge, events, event page, register, contact, terms, FAQ, 404) (2026-10-22)
- [x] 9. Copy and SEO (metadata, keywords, JSON-LD, `llms.txt`) (2026-10-22)
- [x] 9b. Phone layout pass on every page + shorter phone footer (owner request, 2026-10-22)
- [ ] 10. Final QA (a11y, responsive at real phone widths, forms, links, performance, summary)
- [ ] 11. Declutter: merge `IMPLEMENTATION_PLAN.md` into `progress.md`, move the project md files into one folder, tidy the folder structure (owner request, 2026-10-22)

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
| Effects | Keep DarkVeil, StrokeText, AccordionGallery, SpecularButton, ScrollStack; FuzzyText added for the 404 and DepthCarousel for the home Team section; ScrollStack replaced by the newer React Bits JS version without Lenis (owner requests, 2026-10-20). DESIGN.md updated to allow them. |
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
- [x] Reduced motion: DarkVeil one still frame, ScrollStack without smooth wheel scrolling, scroll bar without spring, Button without tap scale.
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
- [x] Step 3: `SpecularButton` imports ogl inside its effect (link still server-rendered); `/events` is a server page with `components/events/EventsDirectory.tsx` as the only client part; `lib/supabase/client.ts` and `@supabase/ssr` removed (anon key no longer needed); `Badge` and `SectionHeading` use `cn()`. First-load JS: `/` 164 to 151 kB, `/events` 135 to 122 kB, event page 148 to 135 kB.
- [x] Step 4: events `register_viewed`, `registration_step_completed` (steps 1-3); site-wide `components/ClickTracker.tsx` sends any `data-track` click (CTAs: `cta_hero_explore_events`, `cta_home_featured_event`, `cta_events_view_event`, `cta_event_register`, `cta_nav_register`, `cta_card_register`; `social_click` / `email_click` with platform and place). `supabase/migrations/003_funnel_view.sql`: `registration_funnel` view by event, UTM source and campaign (security_invoker, no API access). Privacy notice in Terms now covers analytics, UTM tags and service providers (updated October 2026).
- [x] Step 5: Tailwind tokens `line` (#1a1d1e) and `line-strong` (#2a2d2e) replace 39 literals; container token set to 1240px and used everywhere (13 `max-w-[1240px]` replaced); `SectionHeading` eyebrow is the plain `.eyebrow` text (bronze chip on #16130F removed); home featured event reuses `EventCard`, which now shows Register / "Registration opens soon".
- [x] Step 6: brand easing as Tailwind's default transition curve; 200ms fade-and-rise between wizard steps; 8px scroll-linked rise on `SectionHeading` (never hidden at rest); FAQ plus/minus icon and `grid-template-rows` open/close.
- [x] Step 7: five skill files in `.agents/skills/` rewritten to match the site; `SKILLS_MASTER_GUIDE.md` index updated. `003_funnel_view.sql` run by owner.
- [x] SEO audit (https://claude.ai/artifact/9MSL3fbNmAtAeGcsYbHVHw) steps 1–5: `pageMetadata()` helper on every page, Diplovia share image, `searchTitle` and 120–160 char descriptions, `/register` noindex, real text in the home `h1`. Both SEO skill files rewritten.

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
