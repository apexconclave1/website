# Apex Conclave Website: Progress

Last updated: 2026-10-06 (end of day). Resume with the START HERE section below. The detailed plan and acceptance checks are in `IMPLEMENTATION_PLAN.md`.

## START HERE (next session)

Tasks 1 to 3 are done (2026-10-06). Next, in order. Run `npx tsc --noEmit` and `npm run build` after each. Do not run `npm run build` while `npm run dev` is running.

1. **Check the effects in a real browser** (owner): home hero (StrokeText draw-in and fill), global DarkVeil (colour, frame rate, mobile), SpecularButton shine, `/events` ScrollStack, committees accordion on hover. Headless Chrome could not judge these. If DarkVeil is too heavy or too purple, tune its props (`hueShift`, `speed`) in `layout.tsx`; keep `resolutionScale` at 1.
2. **Phase 5: done** (see notes in Phase 5 section). Left for the owner: check touch behaviour of SpecularButton (`autoAnimate`) and the mobile look in a real browser.
3. **Phase 6: Supabase.** (next) Port `SeatMatrix.tsx` and `ApplicationModal.tsx` off Firebase, confirm migrations, remove `lib/firebase`, `firestore.rules`, the `firebase` dependency, rewrite `.env.example`, review the API routes (Zod, rate limit), make the contact API store or email messages.
4. **Phase 7: metadata, SEO, assets.** Title template `%s | Apex Conclave`, per-page descriptions, `metadataBase` from `NEXT_PUBLIC_SITE_URL`, `sitemap.ts`, `robots.ts`, remove duplicate logos in `public/`, compress `Diplovia_logo_final.png` below 200 KB.
5. **Phase 8: docs.** Final pass after the above. Tell the owner before deleting the other two `progress.md` copies.

Owner items (not code): replace the placeholder UPI id `diplovia@demo` and QR, buy the domain, replace stock committee photos, delete `_cleanup_trash/`, decide whether to commit (`website/.git` exists).

Decisions given by the owner on 2026-10-05/06 (still valid):
- Diplovia stays inside this site at `/events/diplovia-2026`.
- Certificate verification is removed. QR code and ticket code on the delegate pass stay.
- The four pasted React Bits components plus ScrollStack are used as supplied, even where they break DESIGN.md (gradients, glow, blur).

## Task 3 status (2026-10-06, rewritten)

All old effect components were removed (moved to `_cleanup_trash/effects/`) and replaced by 4 owner-supplied React Bits components, used as pasted (typed only):
- `DarkVeil`: one fixed background for the whole site, in `layout.tsx`. Keep `resolutionScale` at 1: the pasted component sizes its canvas in px, so a smaller value shrinks the visible canvas.
- `StrokeText`: home hero heading, inside a real `<h1>`.
- `AccordionGallery`: Diplovia committees (items from `chambers.ts`).
- `SpecularButton`: primary CTAs only (navbar Register, home "Explore events", home card "Explore Diplovia 2026", event "Register"). Each one is its own WebGL context; keep to 2 or 3 per route. Secondary and form buttons stay on `Button.tsx`. Added `href` prop (renders `next/link`).
- Owner-approved: gradients, glow, shadow and blur inside these 4 components override DESIGN.md.
- Small defensive edits to pasted code: `try/catch` around `new Renderer` in DarkVeil and SpecularButton (without WebGL the whole page crashed).
- Committees accordion opens on hover (tap on touch). A Carousel for committee details was tried and removed at the owner's request (files in `_cleanup_trash/carousel/`); the text cards stay.
- `ScrollStack` (new dep `lenis`) on `/events`, window-scroll mode, one `ScrollStackItem` per event. `EventCard` was rewritten as the full-width card body (SpecularButton "View event"). Lenis takes over smooth scrolling on `/events` only.
- `LineSidebar` was kept (the Terms page section nav uses it). `three` and `@types/three` removed from `package.json`.
- Known: the shader default colour is purple (`hueShift` prop can change it). Not measured: frame rate, Lighthouse, real-browser look of StrokeText (headless Chrome stalls its animation). DarkVeil has no pause when off-screen or the tab is hidden.

## What this is

The website of **Apex Conclave**, an umbrella brand for multiple events. **Diplovia 2026** (virtual Model UN, Oct 31 to Nov 1, 2026) is the first event.

Stack: Next.js 14 (App Router), React 18, Tailwind 3, TypeScript, Framer Motion, Supabase (decided; see Phase 6). Font: Inter only.

## Status

| Phase | State |
|---|---|
| 0 Baseline | Done |
| 1 Shell (wordmark, Navbar, Footer in layout, Inter, palette, emails) | Done |
| 2 Events data and routes | Done |
| 3 Pages (home, event page, about, contact, terms, verify, faq, register copy) | Done, with gaps below. `/verify` removed |
| Task 1 Remove certificate verification | Done 2026-10-06 (files in `_cleanup_trash/verify/`) |
| Task 2 Umbrella home page rewrite | Done 2026-10-06 (copy in `homeContent`, `organization.ts`) |
| Task 3 React Bits effects (same work as Phase 4) | Done 2026-10-06 (DarkVeil, StrokeText, AccordionGallery, SpecularButton, ScrollStack); needs real-browser check |
| 4 WebGL refinement | Superseded by Task 3 (old effects removed). Real-browser performance check pending |
| 5 Visual bug pass | Done 2026-10-06 (see Phase 5 notes below) |
| 6 Backend (Supabase only) | Not started |
| 7 Metadata, SEO, assets | Not started |
| 8 Docs | Docs updated 2026-10-06 (progress, plan, AGENTS, DESIGN). PRODUCT.md not re-checked |

## Phase 5 notes (2026-10-06)

Fixed:
- Register stepper: on phones only the current step shows its label, no more "04 REVI" clipping (`.reg-stepper` in `globals.css`); inactive steps raised from 0.4 to 0.6 opacity; `aria-current="step"`.
- Global `:focus-visible` outline (bronze, 2px) for every control.
- Tap targets: `Button` has `min-h-11` below `md`; footer links have vertical padding.
- Contrast: Agenda label on the event page (`#5a5e60` to `#8A8C88`).
- Entrance animations: none start hidden any more (only the application modal, which is correct).

Checked at 390px and OK: home, events, event page, about, contact, terms, faq, register. Mobile menu closes on route change. The event section tab bar scrolls sideways by design.

Not done: header and SectionNavigator z-index overlap is not an issue (SectionNavigator is `lg` only). No overflow check by script (headless Chrome has a minimum window width); the iframe screenshots showed none.

Test note: loading four WebGL pages at once in one headless session crashed one page ("Application error"). Each page works alone. Not reproduced for a single real tab, but a WebGL failure outside `new Renderer` would still take the whole page down; consider an error boundary around DarkVeil if it shows up.

## Site map

- `/` umbrella home: hero, featured event, events list, about, contact.
- `/events` directory, driven only by `src/lib/data/events.ts`.
- `/events/diplovia-2026` Diplovia page: overview, committees, fees, seat matrix, team, FAQ.
- `/register?event=diplovia-2026` registration wizard.
- `/about`, `/contact`, `/terms`, `/faq` umbrella pages. `/verify` is removed.
- `/committees` redirects to `/events/diplovia-2026#committees`.

To add an event: add an entry to `eventsData` in `src/lib/data/events.ts`. Committees, leaders and FAQs for an event go in `chambers.ts`, `leaders.ts` and `faqs.ts` keyed by the event id.

## Decisions

- Only Diplovia exists. No placeholder events.
- Inter only. Palette from `.agents/DESIGN.md`. No gradients, blur or shadows.
- Contact email `apexconclave1@gmail.com` (constant in `organization.ts`).
- Supabase is the backend. Firebase will be removed. Sanity is not part of v1.
- Domain not bought yet. `NEXT_PUBLIC_SITE_URL` will carry it (Phase 7).
- Impact numbers (15 events, 5000 delegates, 65 institutions) were unverified and removed.

## Known gaps (not done yet)

- **Effects:** DarkVeil runs site-wide with no pause when off-screen or the tab is hidden. Each SpecularButton is its own WebGL context. Not measured yet.
- **Seat matrix and application modal** still read Firebase, which has no keys here, so live seats do not work yet (Phase 6).
- **Contact API** only logs messages to the console; nothing is stored or emailed.
- **Payment step** uses a placeholder UPI id `diplovia@demo` and the QR in `public/payment/`. Replace before real payments open.
- **Metadata:** root title is now "Apex Conclave"; page-level titles, `metadataBase`, sitemap and robots are still missing (Phase 7).
- **Stock images:** committee banner images in `chambers.ts` and the DarkVeil background are not final.
- **Register wizard:** stepper labels clip on 390px wide screens.
- WhatIsDiplovia, BrandDialectic and ThreePillars sections were not carried over to the Diplovia page; copies are in `_cleanup_trash/`.

## How to resume (practical notes)

- Work in `website/`. Run `npm run dev`, then `npx tsc --noEmit` and `npm run build` after each task.
- Do not run `npm run build` while `npm run dev` is running. It overwrites `.next` and the dev server then returns 500. Stop the dev server first, or `rm -rf .next` and restart.
- Port 3000 may stay busy from an earlier run: `lsof -ti :3000 | xargs kill`.
- Checking mobile layout: headless Chrome `--window-size=390` is cropped by a minimum window width. Use an iframe 390px wide, or Chrome DevTools device mode.
- Lighthouse needs a production build (`npm run build && npm start`), not the dev server. Headless Chrome has no real GPU, so judge WebGL effects in a normal browser.
- No git commits exist yet (`website/.git` is empty). Commit when you are happy with a stage.
- The assistant cannot delete files in this setup. Unused files are moved to `_cleanup_trash/` and you delete that folder yourself.

## Cleanup

Unused files were moved (not deleted) to `_cleanup_trash/` at the project root. Delete that folder when you are sure nothing is needed.

## Baseline performance (production build, headless mobile emulation)

| Page | Performance | LCP | TBT | CLS |
|---|---|---|---|---|
| `/` | 72 | 3.9 s | 590 ms | 0 |
| `/events/diplovia-2026` | 78 | 6.0 s | 70 ms | 0 |

Home first-load JS went from 261 kB to 149 kB after Phase 3. Re-measure after Phase 4.
