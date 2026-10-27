# Apex Conclave Website: Progress

Last updated: 2026-10-27. One file for status, decisions, history and to-dos (the old `IMPLEMENTATION_PLAN.md` was merged in here on 2026-10-23). Design rules: `DESIGN.md`. Conventions: `AGENTS.md`. Product: `PRODUCT.md`. Skills: `SKILLS_MASTER_GUIDE.md`.

## Start here

**What this is.** Website of **Apex Conclave**, a student events and competitions brand with six event verticals (diplomacy and MUNs active; business, technology, debate, startups and esports planned). **Diplovia 2026**, a virtual Model UN on 21 and 22 November 2026, is the first event (`/events/diplovia-2026`). Stack: Next.js 14 (App Router), React 18, TypeScript, Tailwind 3, Supabase, Zod, Vercel Analytics. Fonts: Newsreader (headlines) and Inter.

**Where things stand.** Redesign v3 is merged into `main` and live (https://website-apc20.vercel.app). Redesign v4 started 2026-10-27 from the owner's brief "Apex Conclave × DIPLOVIA" (two brand identities: Apex obsidian/lime, Diplovia navy/ivory/gold/burgundy). Phases 0–3 done; v4 rules replace the v3 palette, fonts and light mode as each phase lands.

**Next.** Redesign v4 Phase 4 (featured DIPLOVIA section on home). Blocker for forms: the Supabase project in `.env.local` (and on Vercel) does not resolve, see Known gaps.

**How we work.**
- The owner commits. Claude stops after each phase, reports, and gives a commit command (with `git add -u` plus new files).
- Ask before assuming anything, and before installing any skill (present it, wait for OK; project-level, telemetry off).
- After each phase: `npx tsc --noEmit`, `npm run lint`, `NEXT_DIST_DIR=.next-build npm run build` (a separate folder, so a running `npm run dev` keeps working), then update this file.
- Site credit: "Website by Kapish Garg" is not shown on the page; it lives in the author/creator meta tags, WebSite JSON-LD (`websiteSchema` in `lib/seo.ts`) and `public/llms.txt`.

## Phase checklist

Redesign v4 (from 2026-10-27), owner brief "Final website redesign brief: Apex Conclave × DIPLOVIA". Stop and report after each phase; owner does all git work.

- [x] 0. Baseline: before screenshots (11 pages × 360/390/768/1024/1440), axe and Lighthouse on live, confirmed dates, demo contact message
- [x] 1. Design system: two token sets (Apex default, Diplovia scoped), Space Grotesk / Inter / Cormorant Garamond, gradients and textures, shared components; teal and light mode removed
- [x] 2. Navigation, footer, home hero (original SVG/CSS geometric focal piece, staggered entrance)
- [x] 3. Verticals and experience cards (custom geometric mark per vertical, active / upcoming / planned labels)
- [ ] 4. Featured Diplovia section on home
- [ ] 5. Diplovia event page, register wizard and receipt in the Diplovia identity; new Diplovia artwork; event page performance; demo registration
- [ ] 6. Every other page: about and team, partners, contact, events, FAQ, terms, 404, error
- [ ] 7. Motion and responsive pass (360, 390, 768, 1024, 1440)
- [ ] 8. Final QA (axe, keyboard, Lighthouse, SEO and share images, links, console, build), after screenshots, report

Redesign v3 (2026-10-22 to 2026-10-23):

Redesign v3 (2026-10-22 to 2026-10-23), from the owner's brief (`one.md`, no longer in the folder; its rules live in `DESIGN.md`):

- [x] 1. Foundation: tokens, fonts, 2px radius, effect removal, button classes, DESIGN.md
- [x] 2. Navigation and footer
- [x] 3. Home hero and About section
- [x] 4. Event Verticals (`/verticals`, data with active/planned status)
- [x] 5. Featured Diplovia section (artwork from the PDFs in `docs/`)
- [x] 6. Partnerships (home section, `/partners`, contact form topics)
- [x] 7. Team
- [x] 8. Other pages (About + Community merge, events, event page, register, contact, terms, FAQ, 404)
- [x] 9. Copy and SEO (metadata, keywords, JSON-LD, `llms.txt`)
- [x] 9b. Phone layout pass on every page, shorter phone footer
- [x] 9c. Colour rework: palettes, depth, fades, grain
- [x] 9d. One background, scroll reveal, teal default, light mode, typewriter, opposite-colour panels
- [x] 10. Final QA (accessibility, phone widths, forms, links, performance, summary)
- [x] 10b. Apple HIG review and fixes
- [x] 11. Declutter: md files merged and moved into `.agents/`, root pointers, README, PRODUCT.md

Before the redesign (2026-10-20): A remove Firebase, Sanity and the seat matrix; B event data (dates TBA, pricing, closed registration, past events); C backend (fresh Supabase schema, server-side pricing, contact storage); D logo and restyle; E Community, Partners, home Network; F Diplovia booklet content; G SEO, assets, Vercel; launch audit; skills review steps 1–7; SEO audit. All done; summary under "Earlier work".

## Decisions

### Current (owner, redesign v4, 2026-10-27; replaces conflicting v3 rows below as phases land)

| Topic | Decision |
|---|---|
| Apex identity | #0B0B0C background, #E4E4E4 text, #222226 surfaces, #C7F36B accent (restrained); Space Grotesk headlines, Inter body |
| Diplovia identity | #101B2D navy, #F1EBDD ivory, #B99A5F gold, #642C3A burgundy; Cormorant Garamond for editorial headlines, Inter body; no lime |
| Gradients | Apex hero `linear-gradient(115deg, #0B0B0C 0%, #17171F 55%, #292A20 100%)`; Diplovia `linear-gradient(115deg, #0A111D 0%, #14253D 58%, #35202A 100%)`; only on selected heroes and artwork |
| Light mode | Dropped |
| Dropped effects | Hero typewriter, ScrollStack on /events, FuzzyText 404 |
| Radius | 2px kept |
| Diplovia pages | Navbar and footer switch to the Diplovia palette, Apex still shown as the parent brand |
| Logos | No dark variants or SVGs exist; logos used unaltered on dark backgrounds only (no CSS recolouring) |
| Diplovia artwork | New original artwork (not the recoloured booklet poster) |
| Diplovia dates | 21 and 22 November 2026, confirmed by owner 2026-10-27. Registration still closed until owner says it opens |
| Committees | UNSC, WHO, UNHRC, UNGA, Historical Crisis Committee are final |
| Team | Three founders only |
| Testing | Demo contact message and demo registration allowed (mark as test, delete after) |
| Git | Owner does all git work; Claude never commits or deploys |


### Current (owner, redesign v3)

| Topic | Decision |
|---|---|
| Brand | Multi-format student events and competitions brand; Diplovia is one featured event, not the identity |
| Content rules | No fake stats, sponsors, testimonials or events; planned verticals labelled as planned |
| Photos | No stock or AI photos; typography and composition carry the hero and verticals. Team photos are real (Kapish's file is a real photo, retouched, per owner) |
| Palette | Teal: #031211 background, #E8E4D3 text, #00AEBB accent (derived #010A09, #F7F4E8). Red and the brief's ink/cream/bronze palettes were tried and dropped (2026-10-23) |
| Light mode | Navbar sun/moon toggle, remembered per browser; without a saved choice the site follows the device setting. Cream background, #00AEBB buttons, derived #006A73 for accent text |
| Background | One background on every page; hairlines between sections; glow and grain fixed to the screen |
| Opposite-colour panels | Only the active vertical tile and the partner call-to-action (home and the `/partners` email strip) |
| Motion | Content slides in from the side (8rem, 4rem on phones), plays to the end once started, resets when scrolled back up; hero typewriter on "bolder generation." only (~2.4s); everything still under reduced motion |
| Fonts | Newsreader (h1, h2) + Inter; ₹ from the device font so the extended font files never load |
| Radius | 2px everywhere |
| Effects | Keep ScrollStack (`/events`) and FuzzyText (404). DarkVeil, StrokeText, SpecularButton, AccordionGallery, DepthCarousel removed |
| Nav | Home, About, Event Verticals, Events, Partners, Contact; button "Partner With Us", or "Register" while registration is open. Team link removed (`/about#team` still works) |
| Hero | "A bigger stage for a bolder generation."; logo in the nav only; disciplines index under the buttons |
| Verticals | Six, in the brief's order; only Diplomacy & MUNs active; `/verticals` page plus a compact home section; no page per vertical; planned ones get "Register interest" (contact topic 'Register Interest', subject prefilled) |
| Featured Diplovia | Format, dates, venue, committees, registration status; no fees; poster cropped from the booklet cover above its old dates, background recoloured to #031211 |
| Partners | One contact topic ('Sponsorship & Partnership') with the subject prefilled per collaboration type; 'why partner' as intentions; 'Who we work with' hidden until real partners exist |
| Team | Three founders, black-and-white portraits, 'How we run events' list |
| About | Mission, What we run, Who it brings together (the old Community page; `/community` redirects), Team with quotes, Get involved / Follow along |
| Terms | Written for all events: same refund numbers everywhere plus a per-event override line; general conduct plus one line per format; guardian consent under 18; organising team decides in-event matters; disputes by email |
| Event page hero | Diplovia logo only, no artwork |
| Footer | The brief's description line; Terms & Privacy one page; Instagram and LinkedIn only |
| Accessibility (Apple HIG) | 44px tap areas on phones (`.hit` for small links), 16px form fields on phones, visible focus ring on teal buttons, 200% text fits, pressed state on touch, hover only with a pointer, stronger borders with Increase Contrast, short top bar in landscape |
| Share images | Site and Diplovia share images on #031211 |
| Git | Work on branch `redesign`; owner commits each phase |

Superseded during the redesign: silver/paper light sections, eased fades between sections, the red palette and `?palette=` switch, dark-only default.

### Still in force from 2026-10-20

| Topic | Decision |
|---|---|
| Diplovia dates | Moving later; "Dates to be announced"; registration closed until dates are set |
| Seat allotment | Preference-based: delegates list two choices, the team assigns seats by hand; no live seat matrix |
| Payment | Manual UPI + UTR, checked by hand in Supabase; dummy UPI id/QR for now; coupons stay |
| Backend | Supabase only, fresh project (owner creates it and runs `supabase/migrations/`) |
| Sanity / Firebase | Removed |
| Logo | The approved logo from the design sheet (`public/brand/`); never redrawn in type |
| Sponsorship | Tiers and prices are never public |
| Email | No paid services; contact messages stored in Supabase; Resend (free tier) once a domain exists |
| Hosting | Vercel; domain not bought yet |
| Copy source | The delegate booklet (not the sponsorship brochure) for Diplovia copy and team quotes |

## Site map

- `/` home: hero with typewriter and disciplines index, verticals, featured Diplovia, about, team, partnerships.
- `/verticals` the six event verticals (active and planned).
- `/events` upcoming and past events; `/events/diplovia-2026` overview, how it works, committees, who sits at the table, why MUN, outcome, fees, allotment, FAQ.
- `/register?event=diplovia-2026` wizard (closed until `registrationOpen: true`).
- `/about` (with `#community` and `#team`), `/partners`, `/contact` (accepts `?category=` and `?subject=`), `/faq`, `/terms`.
- Redirects: `/community` to `/about#community`, `/committees` to the Diplovia committees.

## Phase notes (newest first)

**v4 Phase 3, verticals (2026-10-27).** `VerticalsGrid` rebuilt as six equal cards (the big active tile is gone): artwork panel (16:9), number, `StatusLabel`, title, description, and one destination for the whole card (title link with a full-card `::after`; focus ring on the card via `:has(:focus-visible)`; `sr-only` text names the destination). Active card: accent border, `.bg-hero` behind its art, links to its event with "Upcoming · 21 to 22 Nov 2026 · Registration opens soon" (the prefix follows `event.status`: Live now, Upcoming, or nothing). Planned cards: "Register interest" to the contact form preset (unchanged `interestHref`). New `components/verticals/VerticalArt.tsx`: original line drawings per vertical in role colours (globe ringed by seats, rising bars, routed node lattice, facing lecterns, growing squares, tournament bracket); accent only on the active one. Hover: 4px lift (`.card-lift`) on an inner element, art scales 3%, arrow nudges; the `li` keeps the scroll reveal (both use transform, and the reveal's settled rule would cancel the lift on the same element). Home: same cards, two per row on phones without descriptions and footers. `/verticals`: status key above the grid (Active, Upcoming, Planned with one-line meanings). Lucide icons no longer used for verticals. Checked: tsc, lint, build; no overflow at 360–1440 on home and `/verticals`; cards equal height per row; hover transform -4px; six destinations correct; axe 11 pages × 390/1440: 0.

**v4 Phase 2, navigation, footer, hero (2026-10-27).** Hero (`components/home/HeroSection.tsx`): `.bg-hero` Apex gradient with a `.texture-grid` layer (64px hairline grid, masked to fade), eyebrow "Student competitions and experiences", headline in three deliberate lines ("A bigger stage / for a bolder / generation.", "bolder generation." lime; full sentence in an `sr-only` span, lines `aria-hidden`), up to 96px on desktop and `min(3.5rem, 11.4vw)` on phones so each line holds at 360px; summary; "Explore Experiences" (to `/verticals`) and "Partner With Us". Focal piece `components/home/HeroArt.tsx`: original SVG (three-tier stage, angular slab with a lit lime edge, tilted dashed orbit with one node per vertical, the active one lime), colours from the role variables, `aria-hidden`; beside the text from `lg`, below the buttons on phones. Entrance: new `.rise-in` (16px rise + fade, 0.7s, inline delays, SVG groups via `transform-box`), runs once, instant under reduced motion. Bottom index: verticals with active/planned dots (status in `sr-only` text) and "Next: Diplovia 2026 · 21 to 22 Nov 2026". `homeContent.headlineHighlight` removed. Navbar: transparent until 8px of scroll (or menu open), then `ground` with a hairline; desktop links without Home (logo goes home) and an accent underline that grows on hover and stays on the active page; mobile menu is a full-height panel (Space Grotesk links with arrows, active dot, button and email at the bottom), page scroll locked while open, Escape closes and returns focus. Footer on `deep`: logo, description, email, Explore / Events (Diplovia with its dates) / Follow columns, Terms, Privacy (`/terms#privacy`) and Code of Conduct; description now shown on phones too. `formatEventDates` prints same-month ranges as "21 to 22 Nov 2026" (check script updated). Checked: tsc, lint, build, `check-events`; no horizontal overflow at 360/390/768/1024/1440; h1 lines one row each at 360 and 390; mobile menu opens, locks scroll, Escape closes and refocuses the button; keyboard order skip link, logo, five links, button, hero buttons, index, all with focus rings; axe 11 pages × 390/1440: 0; Lighthouse home mobile 96 / 100 / 96 / 100, LCP 2.7s, CLS 0, TBT 0 (best practices only lose the local-only Vercel insights 404).

**v4 Phase 1, design system (2026-10-27).** `globals.css` rewritten: Apex roles on `:root` (#0B0B0C ground, #222226 surface, #E4E4E4 soft, #C7F36B accent, derived #070708 deep and #F4F4F1 bright); DIPLOVIA roles on `.theme-diplovia` and `body:has(main[data-brand='diplovia'])` (#101B2D, #14253D, #F1EBDD, #B99A5F, #642C3A `wine`, derived #F9F6EE); new roles `surface` and `wine`; `--hero-gradient` per brand behind `.bg-hero`; `--font-display` and `--display-tracking` per brand on `h1, h2` and Tailwind `font-display` (replaces `font-serif`, 9 uses). Fonts: Space Grotesk and Cormorant Garamond (500/600 + italic, `preload: false`) replace Newsreader. Removed: light mode (head script, navbar toggle, `[data-theme='light']`, `--c-accent-text`), `.tone-flip` (its three panels now `bg-surface`), `.logo-mark` CSS mask and `.event-logo` filter (`ApexWordmark` now renders the PNG unaltered with `next/image`, 44px tall), TypedText, ScrollStack (+ css, d.ts; `/events` is a plain bordered list), FuzzyText (404 is a large lime "404" in Space Grotesk). Teal glow replaced by a faint neutral top light; grain 9% to 6%. Buttons: primary hover to `bright`, secondary hover accent border and text, 1px press; `Button` variants match. New `StatusLabel` (active, upcoming, planned) and `.card-lift` (used from Phase 3). `EventEntity.brand` (`'diplovia'` on Diplovia 2026); the event page sets `data-brand`, so it, its navbar and footer are already navy/gold/Cormorant ahead of its Phase 5 redesign. Checked: tsc, lint, build; computed colours and fonts on home, event page, /events, 404 (Apex pages load only Inter + Space Grotesk; the event page adds Cormorant); axe 11 pages × 390/1440: 0; console clean apart from the Vercel insights script that 404s locally only. `DESIGN.md` rewritten for v4; `AGENTS.md` and README updated.

**v4 Phase 0, baseline (2026-10-27).** Before screenshots of the live site saved outside the repo in `../redesign-v4-screens/before/` (11 pages at 360/390/768/1024/1440, reduced motion so revealed content shows; full-page captures leave lazy images and the hero's second line blank, viewport checks confirm both render). No horizontal overflow on any page or width; no console errors or failed requests on home. axe (WCAG 2.2 AA) on 11 pages at 390 and 1440: 0. Lighthouse mobile on live: home 94 / 100 / 100 / 100 (LCP 3.0s, CLS 0); event page performance 59 then 75 on a re-run (LCP 8.0s then 3.7s), accessibility, best practices, SEO 100. Dates set (`startDate` 2026-11-21, `endDate` 2026-11-22 in `events.ts`); "Dates to be announced" gone from every page; two FAQ answers, the closed-registration line, `llms.txt` and `check-events.mjs` updated; Event JSON-LD now renders. Registration left closed (no answer yet on opening). Demo contact message through the real form on the local production build and straight to the live API: both 500, `getaddrinfo ENOTFOUND` for the Supabase project host (the host is not in public DNS: project deleted or URL wrong). Checked: tsc, lint, build, `node scripts/check-events.mjs`.


**Phase 11, declutter (2026-10-23).** `progress.md` and `IMPLEMENTATION_PLAN.md` merged into this file and moved into `.agents/` next to the other md files; the redesign notes kept in full, the 2026-10-20 notes condensed (full text in git history). Root `CLAUDE.md` imports `.agents/AGENTS.md` (Claude Code loads it); root `AGENTS.md` points other tools to `.agents/`; the dead `.agents/CLAUDE.md` deleted. `PRODUCT.md` rewritten for the brief (six verticals, Diplovia as one event). README project tree and links updated. Test builds (`.next-build/`) and `.DS_Store` files deleted. Outdated items removed: `_cleanup_trash/` to-do (folder already gone), references to `../one.md`. Code scan: no unused components, styles or public files.

**Apple HIG review (2026-10-23).** Owner asked for an Apple design analysis on phone and laptop via find-skills. Search found no web-specific Apple skill; installed (after owner OK, files read first) `ehmo/platform-design-skills` `ios-design-guidelines` + `macos-design-guidelines` (621★, MIT, instructions only) into `.agents/skills/` with `.claude/skills/` symlinks, CLI 1.7.4, telemetry off. Review published as a private artifact (https://claude.ai/artifact/YZPjmB13mFPgi6cjQZd98y). High: teal button focus ring invisible on dark (`.btn-primary` outline is currentColor = on-accent); form fields 14px (iOS zoom on focus); tap targets under 44px (footer 28/16px, event section menu 20px, breadcrumbs, hero vertical index, text links, FAQ chips 34px). Medium: 200% text overflows hero h1 and header; no pressed state on link buttons/cards, hover sticks on touch; appearance ignores the device setting (owner chose dark default); Diplovia poster's neutral black against teal. Low: no Increase Contrast variant; 72px header in landscape; thumb-zone Register bar for when registration opens. 14 guidelines met. Owner picked fixes for findings 1–9 (all but the later Register bar), done the same day: `.btn-primary:focus-visible` outline in `bright`; `.field-input` `text-base sm:text-sm`; tap areas via `min-h-11`/`min-w-11` (footer, hero vertical index, FAQ chips, event section menu `py-3`) and `.hit` (::before 44px) on breadcrumbs, the hero "Now" link, stand-alone text links, LinkedIn, contact cards; hero h1 `min(…, vw)` sizes, navbar controls and gutters in px, footer site links auto-fit grid, email `overflow-wrap:anywhere`; `future.hoverOnlyWhenSupported` plus `@media (hover:none)` `:active` opacity and no tap highlight; theme script follows `prefers-color-scheme` when nothing is saved; poster background shifted from #0B0B0B to #031211 (PIL composite, strokes untouched); `prefers-contrast: more` borders at 60%; navbar `h-14` under 500px height. Owner also deleted the seven old hand-written skills; `SKILLS_MASTER_GUIDE.md` now lists the three installed ones. Checked: HIG audit at 390px on 10 pages: 0 targets under 44px, no fields under 16px, 200% text fits; focus ring cream on teal buttons; appearance in all four device/saved combinations; axe 11 pages × 2 widths × 2 modes: 0; no overflow at 360–1024px; Lighthouse home 93, event 93, contact 92, CLS 0.

**find-skills installed (2026-10-23).** Owner request. `npx skills@1.7.4 add https://github.com/vercel-labs/skills --skill find-skills -a universal -a claude-code -y` with `DISABLE_TELEMETRY=1`: file in `.agents/skills/find-skills/SKILL.md` (read by Cursor, Codex, Gemini CLI, Copilot, OpenCode and others), symlinked from `.claude/skills/find-skills` for Claude Code; `skills-lock.json` records source and hash (`npx skills update` uses it). Instructions only, no scripts; file reviewed before install. Owner rule: suggested skills are presented and installed only after their OK, not with the skill's own `-g -y`.

**Phase 10, final QA (2026-10-23).** Red palette dropped (owner): switch script, red variables, red flip panel and docs removed; Diplovia share image colours moved to teal; site share image (`app/opengraph-image.png`, `twitter-image.png`) redone on #031211. ₹ drawn from the device font (`Rupee` @font-face, U+20B9, first in body, h1/h2 and Tailwind stacks): event page 82 to 92, 560 to 391KB. Checks on the production build: tsc, lint; axe on 11 pages (incl. register, 404) at 390 and 1280px in dark and light: 0 issues; no horizontal overflow at 360/390/768/1024 while scrolling every page; 33 internal links and 17 anchors fine, `/community` and `/committees` 308, sitemap, robots, llms.txt, share images 200; contact form client validation (4 errors empty, subject prefilled from Register interest), API rejects empty, unknown topic, foreign origin (403); register API validates. Lighthouse mobile: home 93, about 91, verticals 91, event 92, partners 91, contact 92; accessibility and SEO 100; best practices 96 (Vercel insights script 404s locally only); CLS 0, TBT 0 everywhere. Not tested: real Supabase writes, real phones, real browsers other than headless Chrome.

**Opposite-colour panels (2026-10-22).** Owner found dark mode too dark and light mode too light. `.tone-flip` in `globals.css` redefines the role variables inside a panel (light values in dark mode, dark values in light mode), so text, labels, lines and buttons follow. Used on the active vertical tile (replaces the 4% tint) and as panels for the home partner call-to-action and the `/partners` email strip. Diplovia logo darkened on light panels. Checked: tsc, lint, build; frames at 1440 and 390px both modes; axe home, verticals, partners: 0 in dark and light.

**Hero typewriter (2026-10-22).** Owner asked for a typewriter on the main heading (sent a monospace width-animation snippet). Built as `components/home/TypedText.tsx` instead: only "bolder generation." types in, letter by letter (500ms start, 110ms a letter after the owner asked for slower), all letters laid out from the start (`.typed-char` hidden only under `.js` and no reduced motion), cursor drawn as `::after` on the last typed letter (a separate empty element wrapped onto its own line), blinks three times and goes. `sr-only` full text, visual letters `aria-hidden`. Checked: frames at 1440 and 390px while typing and after; axe 0; Lighthouse home 93, LCP 3.2s, CLS 0.

**One background, scroll reveal, light mode (2026-10-22).** Owner found the alternating sections tiring. Teal became the default palette (red behind `?palette=red`, dropped in Phase 10). Every section sits on `ground`: `tone-*` and `fade-*` classes removed, formerly light sections recoloured (text-deep/ground to bright/soft, deep hairlines to soft), sections divided by `border-t border-soft/15`; VerticalsGrid draws hairlines with borders instead of gap-px fills; nav on `ground`, footer transparent. Fixed texture: `body::before` glow (top light, accent low right) and the grain. Scroll reveal: `.reveal` / `.reveal-right` / `.reveal-stagger` / `.reveal-cells` with `components/ui/ScrollReveal.tsx` (IntersectionObserver adds `.is-in`; 0.8s, 8rem travel, 4rem on phones; plays to the end once started, resets when scrolled back up past); hidden only under `.js` and no reduced motion; `main` clips horizontal overflow; `.rise` replaced. Applied on home, about, partners, verticals, event page grids and every `SectionHeading`. Light mode: `html[data-theme='light']` variables, `--c-accent-text` (Tailwind `textColor.accent`) so accent text is #006A73 on cream while fills stay #00AEBB; sun/moon toggle in the navbar (`aria-pressed`), choice in localStorage `apc-theme`, applied before paint; Diplovia logo darkened via `.event-logo`; `color-scheme` per mode. Checked: tsc, lint, build; axe 9 pages: dark 0, light 0; frames at 1440 and 390px (mid-slide and settled, no horizontal overflow, last blocks settle above the footer); Lighthouse home performance 93 (was 90), LCP 3.2s, CLS 0, TBT 0.

**Colour rework (2026-10-22).** Owner replaced the palette and asked for richer blending. Colour tokens are now roles (`deep`, `ground`, `soft`, `bright`, `accent`, `on-accent`) in `tailwind.config.ts`, defined as RGB-triplet CSS variables in `globals.css` so opacity modifiers work. Red palette (then default): #161616 / #2A2A2A / #C0C0C0 / #EDEDED / #E10600, white button text. Teal palette: #010A09 / #031211 / #E8E4D3 / #F7F4E8 / #00AEBB, dark button text, dark labels on cream. Switch: an inline script in `app/layout.tsx` read `?palette=` (removed in Phase 10). Tones: `.tone-dark`, `.tone-soft`, `.tone-hero`, eased fades via `fade-top-*`/`fade-bottom-*`, body gradient, film grain (`body::after`); tones and fades later replaced by one background. Logo drawn as a CSS mask in the palette's logo colour; same file. Hero: "bolder generation." in accent (`homeContent.headlineHighlight`). `.btn-primary` is the accent button everywhere (`.btn-ink` removed); `Button` primary/accent match; focus rings follow the text colour. Errors: `.field-error` / `.alert-error` with an accent ⚠ and readable text. Checked: tsc, lint, build; axe on 9 pages in both palettes; screenshots at 1440 and 390px; Lighthouse home performance 90, CLS 0, TBT 0.

**Phone pass (2026-10-22).** Checked at real phone widths (390 and 360px) with Chrome DevTools device emulation (plain headless `--window-size` cannot go below about 500px). Site-wide: section padding `py-16 md:py-32`, page headers `pt-28 md:pt-36`, page titles `text-[2.625rem] md:text-6xl`, long intros `text-base md:text-lg`. Home verticals: planned verticals two per row on phones without descriptions (the `/verticals` page keeps one column with descriptions); a soft hyphen in "Entre­preneurship" lets it break in narrow cells (stripped from the contact subject). Featured Diplovia: labels above values on phones, full-width buttons. Home About ideas 2×2 on phones. `TeamMember`: 96px photo beside the text on phones, quote full width underneath. Event page: delegate's work and delegate types two per row; seat badges no longer wrap. Events card hides the repeated logo below `lg`. Contact: doubled divider removed. Footer on phones: no description or column headings, site links in two columns, Events column folded into the Events link, contact links on one wrapped line. Results at 390px: home 10,818 to 7,822px tall, About 7,306 to 5,511px; no sideways overflow at 390 or 360px; mobile menu opens and lists the six links and the button. Full-page captures show team photos as empty boxes (a capture quirk with the grayscale filter; a normal viewport capture shows them).

**Phase 9, copy and SEO (2026-10-22).** New descriptions (all 120–160 characters, checked in the built HTML) for home, About, Partners, Contact and Terms; Events, Verticals, FAQ, event page and register unchanged. Layout fallback description and Open Graph use `organizationConfig.description`; keywords widened beyond MUN (student competitions, student events, case competitions, hackathons). Organization JSON-LD has a `description`. General FAQ answers say Apex Conclave runs several disciplines (Diplovia first, others planned) and point to the Partners page. `public/llms.txt` rewritten (verticals with active/planned, no Community link). Terms rewritten for all Apex Conclave events with the owner's answers: "Participant Code of Conduct" (general rules, one line per format: Model UN, hackathons, case/pitch, debates, esports; event pages may add rules; the event's organising team removes participants and decides results), registration (assignments of committee/country/track/team/role, guardian consent for under-18s), refunds (same 75% / 50% / none / full-if-we-cancel numbers for every event, an event page may override), privacy (participants instead of delegates), disputes raised with Apex Conclave by email. Section ids unchanged, so `/terms#code-of-conduct` links still work. The Diplovia registration consent text (rules of procedure, respectful debate) is MUN-specific on purpose and unchanged. Canonicals show localhost locally because `NEXT_PUBLIC_SITE_URL` is only set on Vercel.

**Phase 8, other pages (2026-10-22).** About rebuilt: header with the brief's mission copy and the four ideas as a ruled list; "What we run" (events as ruled rows with logo, link to verticals); "Who it brings together" (`id="community"`, the old Community groups, reworded for all formats: Participants; Judges, mentors and dais; Volunteers and campus ambassadors); Team (`id="team"`) with `TeamMember` portraits plus booklet quotes (optional `quote` prop) and the standards; "Join us" / "Hear it first" with Instagram and LinkedIn. `/community` deleted and permanently redirected to `/about#community` (`next.config.mjs`), removed from the sitemap. Removed now-unused `TeamCard`, `organizationConfig.tagline` and `manifesto`, and the `.card-link` style. Team removed from the navbar and footer at the owner's request. Page titles everywhere are Newsreader at normal weight: events ("What’s on."), contact, FAQ, terms, register (both states), 404, error, receipt; registration step and contact form headings medium weight. Event page: site padding (`px-6`), delegate's work and "who sits at the table" as open columns, committees and fees as hairline grids (fifth committee spans the row), serif phase and committee names, eyebrow labels. Contact channels are a ruled list instead of four cards. Terms: open sections with hairlines, serif headings. Checked: tsc, lint, build, `/community` returns 308 to `/about#community`, every internal link on 10 pages returns 200, screenshots at 1280px. FuzzyText "404" looks dim in headless Chrome (canvas); check it in a real browser.

**Phase 7, team (2026-10-22).** Home partnership section flipped (list left, text right on large screens; text still first on phones). New `components/team/TeamMember.tsx`: open portrait, square photo in black and white (CSS `grayscale`, files stay in colour), name, role, bio, LinkedIn (`.ext-link`). Home Team section (`id="team"`): heading and a "How we run events" list (`operatingStandards` in `organization.ts`: Student-led, Clear rules up front, Fair competition, We reply) on the left, three portraits on the right; on phones the people come before the list. New photos: Ayush from `~/Desktop/PHOTO-2026-10-22-09-49-57.jpg`, Kapish from `~/Downloads/ChatGPT Image Sep 27, 2026, 05_42_51 PM.png` (owner confirmed it is a real photo, only retouched); both cropped square to 640px. After replacing a photo, delete `.next-build/cache/images` (and `.next/cache/images`) locally or the image optimizer serves the old one; Vercel clears it on deploy. Checked: tsc, lint, build, screenshots at 1280 and 600px.

**Phase 6, partnerships (2026-10-22).** `partnersContent` rewritten: headline "Let’s build what’s next, together.", intro on who we aim to work with, the five collaboration types from the brief (`collaborations`), "why partner" reworded as intentions (no reach claims), placements worded for any event. New `components/partners/CollaborationList.tsx` (ruled, numbered list; each row opens the contact form via `partnerEnquiryFor()` with topic 'Sponsorship & Partnership' and subject 'Partnership: <type>'). Home: partnership section before the footer (headline, intro, "Partner With Us", "How partnerships work", the list) replaces the Network cards and the "Attend · Partner · Collaborate" block. `/partners`: intro with the list, "Why partner" (three open columns), "What a sponsorship can include" (ruled two-column list), "Who we work with" only renders once `partners` has entries, email line and button. Checked: tsc, lint, build, links on / and /partners return 200, screenshots at 1280px.

**Phase 5, featured Diplovia (2026-10-22).** New `components/home/FeaturedEvent.tsx` replaces the home "Events under Apex Conclave" card: "Featured event" label and "All events" link, then a split: left the title, "Presented by Apex Conclave.", a hairline definition list (Format, Dates, Venue, Committees by full name from `chambers.ts`, Registration) and two buttons, "View Event Details" and, while registration is closed, "Follow for registration updates" (Instagram, where dates are announced; it becomes "Register" when registration opens); right the event artwork in a hairline frame. Artwork: the delegate booklet cover rendered at 200 dpi with `pdftoppm` and cropped above the printed dates (31 Oct to 1 Nov, now out of date), `public/events/diplovia-2026-poster.jpg`. New optional `EventEntity` fields `posterImage` and `format`. Checked: tsc, lint, build, screenshots at 1280 and 600px.

**Phase 4, event verticals (2026-10-22).** New `components/verticals/VerticalsGrid.tsx`, used on `/verticals` and (with `compact`) on home. The active vertical spans two columns and two rows with "Active", its description and the linked event (Diplovia logo on the page version, title, dates, Online, registration state, "View event"); the five planned ones are open cells with number, icon, serif title, description, "Planned" and, on the page, "Register interest". On two columns the last cell spans the row so no empty cell shows. `/verticals`: split header (headline and a note that the other verticals are planned, not past events), the grid, and a closing line linking to the contact form ('Host an Event'). Home: "Our Event Verticals" section right after the hero, "One brand, many kinds of competition.", "See all verticals". Contact: new topic 'Register Interest' (`validators/contact.ts`; the database column is free text, no migration) and `?subject=` support on `/contact` (prefilled, capped at 150 characters); `interestHref()` in `verticals.ts` builds the link. Checked: tsc, lint, build, links, screenshots at 1280 and 800px, contact form prefill. Not sent: a real 'Register Interest' message to Supabase.

**Phase 3, home hero and About (2026-10-22).** Hero (`components/home/HeroSection.tsx`): screen-height (capped at 60rem), serif headline "A bigger stage for a bolder generation." at up to 104px, the brief's supporting line, "Explore Events" and "Partner With Us" buttons; no label above the headline, logo only in the nav. Along the bottom, behind a hairline: the six verticals by short name (`short` in `verticals.ts`), each linking to its row on `/verticals` (rows have ids), and "Now: Diplovia 2026 · Dates to be announced" linking to the event (first upcoming or live event). Home About: split layout, "More than events. A platform for what’s next." with the brief's copy, and the four ideas (Experience, Competition, Community, Opportunity) as an open 2×2 list with hairline rules and 20px Lucide icons (Compass, Target, Users, DoorOpen). Content in `homeContent.about`. Checked: tsc, lint, build, screenshots at 1440, 1280 and 600px.

**Phase 2, navigation and footer (2026-10-22).** Navbar with a thin accent underline on the active page; fits at 1024px. Right button is "Partner With Us" (`partnerEnquiryHref` in `organization.ts`, also used by `/partners`), or "Register" while an event's registration is open. Mobile menu: full-width list with hairline rows, closes on tap, Escape closes and returns focus. Footer: logo, `organizationConfig.description` (the brief's line), site links, events, email and the two socials, Terms & Privacy and Code of Conduct. New `src/lib/data/verticals.ts` (six verticals, `active` or `planned`) and a first `/verticals` page; added to the sitemap. Checked: tsc, lint, build, every internal link on 11 pages returns 200, screenshots at 1024 and 1280px.

**Phase 1, foundation (2026-10-22).** First palette tokens from the brief (ink, cream, bronze, paper; replaced by role tokens in the colour rework). Newsreader loaded with next/font (`--font-newsreader`, `font-serif`) and applied to `h1, h2` in `globals.css`; Inter for everything else. All radii 2px. `.btn-primary` and `.btn-secondary` replace SpecularButton and copied inline button classes. Removed DarkVeil, StrokeText, SpecularButton, AccordionGallery, DepthCarousel and TeamCarousel; `ogl` and `gsap` uninstalled. ScrollStack cards: 2px, hairline border, no shadow. Home JS 154 to 101 kB. DESIGN.md rewritten.

### Earlier work (2026-10-20), condensed

Full notes are in git history (`progress.md` and `IMPLEMENTATION_PLAN.md` before 2026-10-23).

- **Removed:** Firebase, Sanity, the live seat matrix with its fake delegates, framer-motion, `@supabase/ssr`, Lenis. Event page JS 277 to 143 kB.
- **Event data:** optional dates with "Dates to be announced" (`formatEventDates()`); `pricing` (299 early bird for 3 days from `registrationOpensAt`, IST; 399 regular) with `eventFees()` and `feeAt()`; `registrationOpen: false` closes registration everywhere; past events section. Check: `node scripts/check-events.mjs`.
- **Backend:** `supabase/migrations/001_init.sql` (registrations, coupons, `redeem_coupon()`, contact messages, private payment-proofs bucket; RLS on, no anon access), `002_utm.sql`, `003_funnel_view.sql` (run by owner). `/api/register` validates committee and country against `chambers.ts`, sets the fee on the server and makes `DIP-XXXXXXXX` codes; `/api/register/payment` takes the amount from the database and redeems coupons atomically; `/api/contact` stores messages; same-origin check on every POST. Not yet run against a real database.
- **Brand assets:** logo extracted from the design sheet to `public/brand/` (light and dark); Diplovia logo made transparent and compressed (52 KB).
- **Diplovia content:** the event page built from the delegate booklet (`lib/data/eventStory.ts`; committee `theme`, `challenge`, `suits`); stock committee banners removed (the gallery returns once every committee has a real `bannerImage`); "QR delegate pass" removed from the copy because it was never built.
- **SEO:** `pageMetadata()` in `lib/seo.ts` (title, 120–160 character description, canonical, `og:url`, image, Twitter tags) on every page; title template; `metadataBase` from `lib/site.ts`; sitemap, robots (blocks `/api/` only), `/register` noindex; JSON-LD (Organization, WebSite, FAQPage, BreadcrumbList, Event once dates exist); Diplovia share image (`app/events/[slug]/opengraph-image.tsx`, title from `searchTitle`); security headers.
- **Launch features:** skip link, back-to-top, print stylesheet, confirm dialog before payment, register loading skeleton, UTM capture, Vercel Analytics events (`registration_submitted`, `payment_submitted`, `contact_sent`, funnel steps) and `data-track` click tracking (`ClickTracker`), optional Resend notification for contact messages, Search Console tag, form autocomplete, global reduced-motion rule.
- **Reports:** skills review https://claude.ai/artifact/Q8bwoZfY9GMBJEsYvp9hsH, SEO audit https://claude.ai/artifact/9MSL3fbNmAtAeGcsYbHVHw.
- **Deployed** to Vercel at https://website-apc20.vercel.app with `NEXT_PUBLIC_SITE_URL` set; checked live: sitemap URLs, share image, robots, noindex, headers, contact API validation.

## Known gaps

- **Contact form and registration cannot save (live and local).** The Supabase URL in `.env.local` and on Vercel points to a host that does not exist in DNS (checked 2026-10-27). Needs a new or restored Supabase project, migrations run, and the three keys updated locally and on Vercel.

- Not tested for real: contact form and registration writing to Supabase; real phones; Safari and Firefox (headless Chrome only). The scroll slide, typewriter and FuzzyText 404 especially need a look on a real device.
- Committee gallery hidden until real committee photos exist. No study guides yet. No QR delegate pass (only a tracking code on the receipt).
- Rate limiting is in memory per server instance (weak on Vercel); see the `ponytail:` note in `lib/security/rate-limit.ts`.
- Pages for planned verticals do not exist (by decision); partner logos hidden until real partners exist.
- Copy written by Claude that the owner should review: terms wording; "Six kinds of stage, one standard.", "One event live, more on the way.", "Hear it first."

## Owner to-do (not code)

- Fix Supabase (see Known gaps): the live contact form returns an error for every message.
- Create the Supabase project, run `supabase/migrations/` in order, fill `.env.local` and Vercel env vars; test one registration and one contact message end to end.
- Real UPI id and QR (`paymentConfig` in `src/lib/data/organization.ts`, `public/payment/upi-qr.jpg`).
- Diplovia registration: when it opens, set `registrationOpensAt` and `registrationOpen: true` in `src/lib/data/events.ts` (dates are set).
- Final country/character lists per committee (`src/lib/data/chambers.ts`; HC has 4 of 18).
- Real photos for the five committees (`bannerImage` in `chambers.ts`) to bring back the committee gallery.
- Decide on a QR delegate pass.
- SVG of the logo from the designer.
- Buy the domain, then set `NEXT_PUBLIC_SITE_URL`.

## Acceptance checks

1. `npx tsc --noEmit`, `npm run lint`, `NEXT_DIST_DIR=.next-build npm run build` pass.
2. `node scripts/check-events.mjs` passes.
3. A tampered request cannot change the amount paid (the server computes it); the anon key cannot read or write any table.
4. axe (WCAG 2.1 AA) shows 0 issues on every page in dark and light at 390 and 1280px.
5. No horizontal scroll at 360, 390, 768 and 1024px on any route, including while content slides in.
6. Phones: tap targets at least 44px, form fields at least 16px, 200% text fits.

## Practical notes

- Work in `website/`. `npm run dev` for development.
- Check builds next to a running dev server: `NEXT_DIST_DIR=.next-build npm run build`, then `NEXT_DIST_DIR=.next-build npx next start -p 3100`.
- After replacing an image, delete `.next-build/cache/images` and `.next/cache/images`.
- After changing `tailwind.config.ts`, restart `npm run dev`.
- Port busy: `lsof -ti :3000 | xargs kill`.
- Headless Chrome cannot go below about 500px wide with `--window-size`; use DevTools device emulation for phone widths.
