# Apex Conclave: Implementation Plan

Goal: make the site the **Apex Conclave umbrella website**. Diplovia 2026 is the first event under it, not the whole site. Also fix the visual bugs, the WebGL performance problems, and the gap between the components and what `progress.md` claims.

Sources of truth: `.agents/DESIGN.md`, `.agents/AGENTS.md`, `.agents/PRODUCT.md`. Where those docs say Firebase, this plan wins (Supabase).

## Decisions (final)

| Topic | Decision |
|---|---|
| Events | Only Diplovia 2026. Delete the two invented events. No teasers. Add new events later via `lib/data/events.ts`. |
| Font | Inter only (next/font). Remove Playfair Display and Montserrat. |
| WebGL components | Old effects removed 2026-10-06. Use DarkVeil, StrokeText, AccordionGallery, SpecularButton, ScrollStack as supplied. |
| `/committees` | Permanent redirect to `/events/diplovia-2026#committees`. Remove from nav. |
| Backend | Supabase only. Remove Firebase. Sanity untouched, site must work without it. |
| Email | `apexconclave1@gmail.com` everywhere. No `diplovia@` addresses. |
| Domain | Not bought. Use `NEXT_PUBLIC_SITE_URL` (default `http://localhost:3000`). No hard-coded `diplovia.com`. |
| UPI | Keep placeholder `diplovia@demo` and QR for now. TODO in progress.md. |
| Impact numbers | Unverified (15 events / 5000 delegates / 65 institutions). Show none. |

## Brand rules (from DESIGN.md)

- Wordmark: text only, `apex` lowercase + `CONCLAVE` uppercase.
- Colors: bg `#080909`, surface `#141718`, text `#F4F2ED`, muted `#A5A6A2`, accent `#C7A16A` (tiny badges and text only), teal `#21474D`. Replace every `#BA9C7A`.
- Forbidden: gradients, backdrop blur, box-shadow effects, decorative icons or emoji, spin or heavy parallax, icon logos.
- Radius 8-12px, container 1240px, 8px grid.
- Animation: Framer Motion, 150-350ms, ease `[0.25, 0.46, 0.45, 0.94]`, opacity and transform only, honor `prefers-reduced-motion`.
- Prefer Tailwind tokens over inline style objects and raw hex.

## Verified problems

**Structure and brand**
- Navbar and Footer render `DiploviaLogo` (emblem + Diplovia tagline); footer says "(c) DIPLOVIA".
- Navbar and Footer are imported page by page. `/events`, `/events/[slug]`, `/register` have none.
- Home is mostly Diplovia (hero, feature card, arena accordion, WhatIsDiplovia, metrics).
- `/about /faq /terms /contact /verify` written as Diplovia pages.
- Metadata: root title "apex CONCLAVE - Diplovia 2026"; `/register` says "Edition I" and canonical `diplovia.com`.
- Design violations: blur and shadow in Navbar/Footer, radial-gradient in hero, 43 files with `#BA9C7A`, serif headings, about 58 `use client` files with inline styles.
- Emails: `diplovia@gmai.com` (typo) in Footer; `diplovia@gmail.com` in terms, verify, ContactCards, CertVerifyInput.
- Dead duplicates: `components/Navbar.tsx`, `components/Footer.tsx`.

**Components vs md files**
- progress.md claims auto-pause and `loseContext()` on all canvases. Actual: only LaserFlow has an IntersectionObserver; only DarkVeil, FlexCarousel, RippleDistortion release context. Orb, ParticleText, LaserFlow never do. Others render every frame off-screen and in background tabs.
- Home mounts about 6 WebGL layers at once. DarkVeil is global on every route.
- Fixed header uses backdrop blur over an animating WebGL layer (repaint every frame).
- Six `*Wrapper.tsx` files type props as `any`.
- AGENTS.md says Framer Motion for all animation; it is used in 4 files only.
- progress.md is stale (Phases 3-6 marked pending but built; wrong event slug; says Supabase while AGENTS and PRODUCT say Firebase).
- `public/` has 10 near-duplicate logos; `Diplovia_logo_final.png` is 1.1 MB.
- Backend split: register API uses Supabase, but `SeatMatrix.tsx` and `ApplicationModal.tsx` use Firebase, and `.env.local` has no Firebase keys. Live seats and the application modal cannot work today.

**Visual bugs (seen in headless Chrome, 390px and 1280px)**
- ~~Horizontal overflow at 390px~~: false alarm. Headless Chrome enforces a minimum window width, which cropped the screenshots. A real 390px frame shows no overflow. Real mobile issues: register stepper labels clip ("04 REVI"), long input placeholders.
- No nav or footer on `/events`, `/events/diplovia-2026`, `/register`.
- Register page still says "Edition I", "Dossier", "4 flagship chambers" (data has 5). "View Event Dossier" on event cards.
- Particle wordmark at 1280px is scattered dots, not readable.
- Hero Orb nearly invisible but uses a context; large empty hero area.
- Event cards and the area below tabs on the Diplovia page render dimmed or empty on first paint (animation starts hidden; part may be headless, verify).
- Unsplash stock photos used as event covers.
- Mixed fonts (serif, Montserrat, nav style).
- Bright bronze scroll-progress bar on every page.

## Phases

> Status 2026-10-06: Phases 0 to 3 and Tasks 1 to 3 are done. Phase 4 was superseded by the four owner-supplied components plus ScrollStack. Phase 5 is done. Next is Phase 6 (Supabase), then 7 (SEO), 8 (docs). See `progress.md` START HERE.
>

Order matters: each phase ends with `npx tsc --noEmit` and `npm run build` passing.

### Phase 0: Baseline (DONE)
- [x] Run `tsc` and `build` (tsc currently clean). Record result.
- [x] Run `npm run dev`. Open every route at 390 / 768 / 1280. List every visual bug (route + width). Merge with the list above.
- [x] Lighthouse mobile on `/` and `/events/diplovia-2026`: record LCP, TBT, CLS. (WebGL context count not measured; counted from code instead: about 6 on the old home page.)
- Verify: baseline numbers written down.
- Result (production build, headless mobile emulation): `/` Performance 72, LCP 3.9 s, TBT 590 ms, CLS 0. `/events/diplovia-2026` Performance 78, LCP 6.0 s, TBT 70 ms. Home first-load JS 261 kB, now 149 kB.

### Phase 1: Shell (DONE)
- [x] Add `components/layout/ApexWordmark.tsx` (text only). Use in Navbar and Footer.
- [x] Load Inter via `next/font` in `app/layout.tsx`; remove Playfair, Montserrat, inline `fontFamily`.
- [x] Move Navbar and Footer into `app/layout.tsx`; remove per-page imports.
- [x] Rebuild Navbar and Footer: solid `#080909`, 1px `#141718` border, no blur or shadow, Tailwind hover classes. Nav: Home, Events, About, Contact, Verify + Register (goes to `/register?event=diplovia-2026` while one event exists).
- [x] Footer: umbrella tagline, socials and email from `organization.ts`, events list from `events.ts`, governance links, "(c) Apex Conclave".
- [x] Single `contactEmail` constant in `organization.ts`; replace all `diplovia@` strings.
- [x] Delete `components/Navbar.tsx` and `components/Footer.tsx` after confirming no imports.
- [x] Scroll-progress bar: 2px `#F4F2ED` or remove.
- Verify: every route shows the same nav and footer; grep `gmai.com|diplovia@` in src is empty.

### Phase 2: Events data and routes (DONE)
- [x] `events.ts`: keep Diplovia 2026 only. Replace Unsplash cover and banner with brand visuals under `/public` or a flat surface color.
- [x] `next.config.mjs`: permanent redirect `/committees` to `/events/diplovia-2026#committees`.
- [x] `/events` reads only from `events.ts`; remove filters that make no sense with one event (type and status) or keep them hidden until there is more than one event.
- [x] Remove FlexCarousel from home while there is one event (keep the component).
- Verify: `/events` lists one event; `/committees` redirects.

### Phase 3: Pages (DONE, see notes)
- [x] Home: Hero (wordmark, one-line umbrella statement, CTAs Explore events / About) > Featured event (Diplovia 2026) > Events list > What Apex Conclave is > Leadership > Contact CTA. Hero sized to content, no `100vh` void.
- [ ] WhatIsDiplovia and gallery: NOT moved (see Phase 3 notes). Arena accordion moved. Delete metrics section everywhere.
- [x] `/events/diplovia-2026`: LaserFlow hero, overview, 5 arenas from `chambers.ts`, seat matrix, fees (early bird Rs 299 first 3 days, Rs 399 after), format (virtual, Zoom/Meet), Diplovia FAQ, Register CTA. Anchors `#overview #committees #fees #faq`.
- [x] `/about`: Apex story and mission, leadership (Ayush Vishnoi, Kapish Garg, Vansh Jain), values.
- [x] `/contact`: umbrella contact, event dropdown (General, Diplovia). `/terms`: umbrella with a labeled Diplovia section. `/verify`: generic wording. `/faq`: umbrella FAQ + link to Diplovia FAQ.
- [x] `ConferenceStatusBar`: derive from `chambers.ts` and `seats.ts`; drop figures that cannot be derived.
- [x] Register page copy: remove "Edition I", "Dossier", "4 chambers"; make it event-driven.
- Verify: home source contains no arena names, no metrics, no invented events.

> Owner decision 2026-10-06: Orb removed; low-power phones get static images instead of WebGL.
>
> Phase 3 notes: the Diplovia page shows overview, committees, fees, seat matrix, team and FAQ. The old brand sections (WhatIsDiplovia, BrandDialectic, ThreePillars) and the ParticleText/Orb hero were not moved; they sit in `_cleanup_trash/` or unused in `components/ui/` until Phase 4 decides what to bring back. Metrics were removed. `/committees` redirects. Seat matrix still reads Firebase (Phase 6).

### Phase 4: WebGL refinement (SUPERSEDED 2026-10-06: old effects removed, replaced by DarkVeil, StrokeText, AccordionGallery, SpecularButton; see progress.md)
- [ ] New `hooks/useWebGLLifecycle.ts`: returns `inView` (IntersectionObserver, rootMargin 100px) and `pageVisible` (visibilitychange). Render loop runs only when both true; cancel rAF otherwise.
- [ ] Every component calls `loseContext()` and disposes geometry, textures, programs on unmount (add to ParticleText, LaserFlow; Orb is removed).
- [ ] Budget: at most 2 live contexts per route. DarkVeil only in hero or replaced by flat `#080909`. Mount heavy components near the viewport, unmount when far.
- [ ] Cap devicePixelRatio at 1.5 (1 on mobile). `prefers-reduced-motion` = one static frame. No WebGL or low-power mobile = static fallback.
- [ ] Reserve canvas space (fixed height or aspect-ratio) and show flat `#141718` placeholder until ready.
- [ ] Wordmark: plain Inter type; ParticleText only as optional hover, or fix sampling so text is legible at rest.
- [ ] Palette-only visuals: no glow-like gradients in CSS or shaders; tint with `#21474D` / `#C7A16A` at low intensity.
- [ ] Type wrapper props (no `any`), add display names.
- [ ] Report components with no consumer (DriftWall, LineSidebar, SpotlightCard, TextType, DiplomaticGlobe). Do not delete without approval.
- Verify: DevTools shows 2 or fewer contexts per route; scrolling past a canvas stops its frame loop; background tab GPU near zero.

### Phase 5: Visual bug pass (DONE 2026-10-06, see progress.md)
- [ ] Fix every bug from Phase 0 plus: overflow at 390px, tap targets under 44px, muted text contrast on `#141718`, `focus-visible` on all controls, mobile menu, clipped text in cards, z-index conflicts (header, SectionNavigator, LineSidebar).
- [ ] Entrance animations start visible or use a safe default so content shows at rest.
- Verify: no horizontal scroll at 390px on any route; screenshots at 390 and 1280 reviewed.

### Phase 6: Backend (Supabase only)
- [ ] Port `SeatMatrix.tsx` (Supabase Realtime) and `ApplicationModal.tsx` (calls `/api/register`) off Firebase.
- [ ] Confirm migrations 001 and 002 contain events, committees, registrations, coupons, `reserve_seat_atomic()` with `FOR UPDATE`, scoped by event. Add 003 if missing. Do not apply to a remote DB; hand over the SQL and command.
- [ ] Remove `lib/firebase/*`, `firestore.rules`, `firebase` dependency after nothing imports them and build passes.
- [ ] Rewrite `.env.example` for Supabase + Sanity (names only; never copy values from `.env.local`).
- [ ] Review `/api/register`, `/payment`, `/validate-coupon`, `/api/contact` (`/api/verify` is removed in Task 1): Zod validation, rate limiting, service-role key server-only, no Diplovia-only assumptions.
- [ ] Wizard: no rewrite. Event-driven via `?event=` with safe fallback; pass and receipt show Apex Conclave as issuer.
- [ ] Confirm site renders without Sanity data.
- Verify: `grep -rn firebase src` empty; registration flow works end to end against a dev Supabase project.

### Phase 7: Metadata, SEO, assets
- [ ] Root title template `%s | Apex Conclave`; every page has own title and description.
- [ ] `metadataBase` from `NEXT_PUBLIC_SITE_URL`; remove every `diplovia.com`.
- [ ] Add `app/sitemap.ts`, `app/robots.ts`.
- [ ] Delete unreferenced duplicate logos in `public/`; compress `Diplovia_logo_final.png` below 200 KB. Report unclear files rather than deleting.

### Phase 8: Docs
- [ ] One accurate `website/progress.md` (what exists, pending, decisions, open items incl. UPI placeholder and domain purchase). Tell the owner before deleting the other two copies.
- [ ] Update `AGENTS.md` and `PRODUCT.md`: Supabase not Firebase, current stack.
- [ ] Do not commit (repo has no commits; owner decides).

## Acceptance checks

1. `npx tsc --noEmit` passes.
2. `npm run build` passes.
3. `grep -rn "BA9C7A\|backdrop-filter\|backdropFilter\|linear-gradient\|radial-gradient\|Playfair\|Montserrat" src` empty.
4. `grep -rn "diplovia@\|gmai.com\|diplovia.com" src supabase` empty.
5. `grep -rn firebase src` empty; no `firebase` in `package.json`.
6. `grep -ri diplovia app/layout.tsx components/layout app/page.tsx` shows only the featured card and events list.
7. Same Navbar and Footer on every route; `/committees` redirects.
8. No horizontal scroll at 390px on any route.
9. At most 2 live WebGL contexts on `/` and on `/events/diplovia-2026`; off-screen canvases stop rendering.
10. Lighthouse mobile on `/`: Performance 85+, CLS under 0.1 (report before and after).
11. Home has no arena names, invented events or metrics.
12. (Done) No `/verify` route, no `api/verify`, no certificate-verification links in nav, footer, FAQ, terms or contact form (Task 1). QR and ticket code on the delegate pass remain.
13. (Done) Home states that Apex Conclave is an umbrella for multiple events and links to `/events/diplovia-2026` (Task 2).

## Working rules

- Surgical changes. Match existing style unless it breaks a rule above. Mention unrelated problems, do not fix them.
- No new dependencies. New shared pieces limited to `ApexWordmark` and `useWebGLLifecycle`.
- Take stated defaults; ask only when blocked.
- Finish with: files changed, files deleted, defaults taken, before/after performance numbers, open items.

## Open items for the owner

- Replace placeholder UPI id and QR before real payments.
- Buy the domain, then set `NEXT_PUBLIC_SITE_URL`.
- Verify real impact numbers before any are shown.
- Supabase free tier pauses after about a week of inactivity; fine for development, plan for it before launch.
