# Apex Conclave — Design System

> Source: the owner's redesign brief (2026-10-22, `../one.md`). It replaces the palette and "Inter only" rule of `docs/Apex_Conclave_Developer_Design_Sheet.pdf`. The logo files from the design sheet stay as they are.

---

## Direction

Dark, editorial, with depth: tonal shading, soft fades and grain instead of flat blocks. Apex Conclave is an umbrella brand for student competitions and events across several disciplines; Diplovia is one event inside it, not the identity of the whole site.

The site should look designed by a person, not generated from a template: typography, composition, real content and fine dividers carry the personality. No fake numbers, sponsors, testimonials or events.

**Logo**: `components/layout/ApexWordmark.tsx` draws `public/brand/apex-conclave-logo-light.png` as a CSS mask in the palette's logo colour (`.logo-mark`): same shape and proportions, colour per palette (owner approved an off-white version). Never redraw it in type, stretch it or add effects. When an event has its own identity (Diplovia), Apex Conclave is the parent brand next to it.

---

## Palette (owner, 2026-10-22; replaces the brief's ink/cream/bronze palette)

Colours are set by role as CSS variables (`globals.css`) and used through Tailwind names. Visitors get **teal, dark**. The red palette is kept for comparison: `?palette=red` (or `?palette=teal`) on any URL switches and is remembered in that browser (script in `app/layout.tsx`, marked `ponytail:`; delete it and the red block once the owner settles).

| Role (Tailwind) | Use | Teal dark (default) | Teal light (toggle) | Red (preview, dark only) |
|---|---|---|---|---|
| `deep` | Hover fills; darkest step | `#010A09` (derived) | `#DDD8C4` (derived) | `#161616` (derived) |
| `ground` | The one page background; nav; panels | `#031211` | `#E8E4D3` | `#2A2A2A` |
| `soft` | Body text; hairlines (`border-soft/15`) | `#E8E4D3` | `#2A3A38` (derived) | `#C0C0C0` |
| `bright` | Headlines, strong text | `#F7F4E8` (derived) | `#031211` | `#EDEDED` (derived) |
| `accent` | Button fills, lines, markers (`bg-`, `border-`) | `#00AEBB` | `#00AEBB` | `#E10600` |
| `text-accent` (`--c-accent-text`) | Labels, icons, hero highlight | `#00AEBB` | `#006A73` (derived; `#00AEBB` is 2.1:1 on cream) | `#E10600` |
| `on-accent` | Text on accent buttons | `#031211` | `#031211` | `#FFFFFF` |
| logo (`--c-logo`) | `.logo-mark` | `#EAE6DF` original cream | `#031211` | `#EDEDED` |

`text-accent` has its own variable (`textColor` in `tailwind.config.ts`), so accent text can be darker than accent fills in light mode.

**Light mode** (owner, 2026-10-22): sun/moon toggle in the navbar, dark by default, remembered per browser (`apc-theme` in localStorage, applied before paint by a script in `app/layout.tsx`, sets `html[data-theme='light']`). Teal palette only; the toggle is hidden with `?palette=red`. The cream Diplovia logo is darkened in light mode (`.event-logo`).

Contrast (checked 2026-10-22, axe 0 issues on 9 pages in teal dark and light): soft on ground 15:1 (dark); dark on teal 7.1; teal text on dark 7.1.

**Known exception (owner accepted):** in the red palette, small red labels fail contrast (2.9:1 on charcoal, 3.6:1 on near-black).

Errors: `.field-error` and `.alert-error` show the message in `bright` with an accent ⚠ (and accent borders on invalid fields); accent text alone would fail contrast.

## One background (owner, 2026-10-22)

- Every page and section sits on `ground`. No alternating dark/light sections, no section gradients; sections are separated by a hairline (`border-t border-soft/15`) and spacing.
- Texture is fixed to the screen, so the background never changes while scrolling: `body::before` (soft light at the top, a faint accent glow low right) and `body::after` (film grain, 9% overlay). Both hidden in print.
- **Opposite-colour panels** (owner, 2026-10-22): a few contained panels flip to the other mode's colours (`.tone-flip`: cream in dark mode, dark teal in light mode, silver with red). Only the active vertical tile (VerticalsGrid) and the partner call-to-action (home Partnerships text, `/partners` "Prefer email?" strip). Panels stay inside the page width, never full-width bands. Keep it to these few.
- No other gradients. Still no purple-blue gradients, neon, glassmorphism or heavy shadows.

## Typography

- **Headlines (h1, h2)**: Newsreader (`font-serif`, `--font-newsreader`, variable with optical sizing). Applied to `h1, h2` in `globals.css`. Weight 400–500; no bold serif.
- **Everything else**: Inter (`font-sans`, `--font-inter`): body, nav, buttons, labels, h3 and below.
- **Labels**: `.eyebrow`: 12px uppercase, `tracking-[0.14em]`, `text-accent`. No wider tracking anywhere.
- **Scale**: keep to a few sizes. Body 16–18px, meta 12–14px, section title `text-3xl md:text-[2.75rem]`, hero up to `md:text-7xl`. No oversized type in every section.

---

## Shape, spacing, depth

- **Radius**: 2px everywhere (`rounded`, `rounded-sm`, `rounded-lg` are all 2px). `rounded-full` only for tiny functional dots and bars.
- **Depth**: hairline borders, never shadows, glow, blur or glass.
- **Container**: `max-w-container` (1240px), 24px side padding.
- **Spacing**: 8px grid; sections 64–96px vertical.
- **Variety**: each section gets its own layout (split, editorial grid, open list, image-led). Do not repeat icon + heading + paragraph cards.

---

## Buttons

Shared classes in `globals.css`, used on links:

- `.btn-primary`: accent fill, `on-accent` text; hover turns `deep`.
- `.btn-secondary`: soft outline on dark; hover shows the accent border.

`components/ui/Button.tsx` covers `<button>` elements (forms, wizard).

---

## Motion

- Hover and UI: 150–350ms, Tailwind default easing (brand curve), `opacity` and `transform` only.
- **Scroll reveal** (owner, 2026-10-22): content slides in from the side and fades in as it reaches the screen. Once started it plays to the end (0.8s) even if scrolling stops; scrolling back up past it resets it so it arrives again. Travel: 4rem on phones, 8rem from md (`--reveal-dist`).
  - Classes: `.reveal` (from the left), `.reveal-right` (from the right), `.reveal-stagger` on a list (each item on its own, later columns 0.12s / 0.24s behind), `.reveal-cells` on a grid whose cells draw the hairlines (cells stay, contents move, cells clip).
  - `components/ui/ScrollReveal.tsx` adds `.is-in` (IntersectionObserver). Content is only hidden when scripts run (`.js` on `<html>`) and motion is allowed; no-JS and reduced-motion visitors see everything still. `main` clips horizontal overflow so right-hand slides never widen the page.
  - Use on content blocks below the hero. Not on the hero, nav or footer. Do not nest a reveal inside another reveal.
- **Hero typewriter** (owner, 2026-10-22): "bolder generation." types itself in after load (`components/home/TypedText.tsx`, 110ms a letter, about 2.4s), with a 2px cursor in the text colour that blinks three times and goes. Letters keep their space while hidden, so nothing shifts; Newsreader, no monospace. Full text for screen readers (`sr-only`) and search; no-JS and reduced-motion visitors see it whole. Hero headline only.
- Global reduced-motion rule in `globals.css`.

### Kept effects (owner decision, 2026-10-22)

| Component | Where |
|---|---|
| `ScrollStack` | `/events` list only. Cards restyled to the palette (2px, hairline border, no shadow) |
| `FuzzyText` | The "404" on the not-found page only |

Removed on 2026-10-22: DarkVeil, StrokeText, SpecularButton, AccordionGallery, DepthCarousel (and the `ogl` and `gsap` packages).

---

## Prohibitions

- No purple-blue gradients, neon, glassmorphism or heavy shadows; gradients only for the tones above.
- No colours outside the active palette; no separate palette per event vertical.
- No pure white (`#fff`) backgrounds.
- No AI-looking or generic stock photos; every image needs a purpose. Generated images must never pass as real Apex Conclave events.
- No random or mixed icon styles. Lucide outline icons only, small, accent or soft, and only where they help.
- No fake statistics, testimonials, sponsor logos, partnerships or event listings. Planned verticals are labelled as planned.
- No parallax or spinning. Scroll motion only through the reveal classes above.
