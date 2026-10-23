# Apex Conclave — Design System

> Source: the owner's redesign brief (2026-10-22, `../one.md`). It replaces the palette and "Inter only" rule of `docs/Apex_Conclave_Developer_Design_Sheet.pdf`. The logo files from the design sheet stay as they are.

---

## Direction

Dark, editorial, with depth: tonal shading, soft fades and grain instead of flat blocks. Apex Conclave is an umbrella brand for student competitions and events across several disciplines; Diplovia is one event inside it, not the identity of the whole site.

The site should look designed by a person, not generated from a template: typography, composition, real content and fine dividers carry the personality. No fake numbers, sponsors, testimonials or events.

**Logo**: `components/layout/ApexWordmark.tsx` draws `public/brand/apex-conclave-logo-light.png` as a CSS mask in the palette's logo colour (`.logo-mark`): same shape and proportions, colour per palette (owner approved an off-white version). Never redraw it in type, stretch it or add effects. When an event has its own identity (Diplovia), Apex Conclave is the parent brand next to it.

---

## Palette (owner, 2026-10-22; replaces the brief's ink/cream/bronze palette)

Colours are set by role as CSS variables (`globals.css`) and used through Tailwind names. Teal, dark by default, with a light mode. A charcoal/silver/red palette was tried and dropped (owner, 2026-10-23).

| Role (Tailwind) | Use | Dark (default) | Light (toggle) |
|---|---|---|---|
| `deep` | Hover fills; darkest step | `#010A09` (derived) | `#DDD8C4` (derived) |
| `ground` | The one page background; nav; panels | `#031211` | `#E8E4D3` |
| `soft` | Body text; hairlines (`border-soft/15`) | `#E8E4D3` | `#2A3A38` (derived) |
| `bright` | Headlines, strong text | `#F7F4E8` (derived) | `#031211` |
| `accent` | Button fills, lines, markers (`bg-`, `border-`) | `#00AEBB` | `#00AEBB` |
| `text-accent` (`--c-accent-text`) | Labels, icons, hero highlight | `#00AEBB` | `#006A73` (derived; `#00AEBB` is 2.1:1 on cream) |
| `on-accent` | Text on accent buttons | `#031211` | `#031211` |
| logo (`--c-logo`) | `.logo-mark` | `#EAE6DF` original cream | `#031211` |

`text-accent` has its own variable (`textColor` in `tailwind.config.ts`), so accent text can be darker than accent fills in light mode.

**Light mode** (owner, 2026-10-22): sun/moon toggle in the navbar, remembered per browser (`apc-theme` in localStorage, applied before paint by a script in `app/layout.tsx`, sets `html[data-theme='light']`). Without a saved choice the site follows the device's appearance setting (Apple HIG review, 2026-10-23); dark when the device is dark. The cream Diplovia logo is darkened in light mode (`.event-logo`).

Contrast (checked 2026-10-22, axe 0 issues on 9 pages in dark and light): soft on ground 15:1 (dark); dark on teal 7.1; teal text on dark 7.1.

**Increase Contrast** (`prefers-contrast: more`): hairlines and borders go to 60% strength.

Errors: `.field-error` and `.alert-error` show the message in `bright` with an accent ⚠ (and accent borders on invalid fields); accent text alone would fail contrast.

## One background (owner, 2026-10-22)

- Every page and section sits on `ground`. No alternating dark/light sections, no section gradients; sections are separated by a hairline (`border-t border-soft/15`) and spacing.
- Texture is fixed to the screen, so the background never changes while scrolling: `body::before` (soft light at the top, a faint accent glow low right) and `body::after` (film grain, 9% overlay). Both hidden in print.
- **Opposite-colour panels** (owner, 2026-10-22): a few contained panels flip to the other mode's colours (`.tone-flip`: cream in dark mode, dark teal in light mode). Only the active vertical tile (VerticalsGrid) and the partner call-to-action (home Partnerships text, `/partners` "Prefer email?" strip). Panels stay inside the page width, never full-width bands. Keep it to these few.
- No other gradients. Still no purple-blue gradients, neon, glassmorphism or heavy shadows.

## Typography

- **Headlines (h1, h2)**: Newsreader (`font-serif`, `--font-newsreader`, variable with optical sizing). Applied to `h1, h2` in `globals.css`. Weight 400–500; no bold serif.
- **Everything else**: Inter (`font-sans`, `--font-inter`): body, nav, buttons, labels, h3 and below.
- **₹**: drawn from the device font (`Rupee` @font-face, U+20B9 only, first in every stack). Inter and Newsreader only carry it in their extended files (~170KB). Keep `Rupee` first in any new font stack.
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

## Touch and keyboard (Apple HIG review, 2026-10-23)

- **Tap areas at least 44×44px** on phones. Footer links, the hero vertical index and the event section menu are 44px tall; small stand-alone text links get `.hit` (an invisible 44px `::before` area, no layout change). Links inside sentences are exempt.
- **Form fields 16px on phones** (`.field-input` is `text-base sm:text-sm`): Safari on iPhone zooms in on smaller fields.
- **Focus rings** follow the text colour; `.btn-primary` uses the headline colour so the ring shows on the dark page.
- **Large text**: the hero headline is capped by screen width and the top bar's controls are in px, so 200% text still fits a 390px screen. Long unbroken strings (the email address) may wrap anywhere.
- **Landscape phones**: the top bar is 56px when the screen is under 500px tall.

## Buttons

Shared classes in `globals.css`, used on links:

- `.btn-primary`: accent fill, `on-accent` text; hover turns `deep`.
- `.btn-secondary`: soft outline on dark; hover shows the accent border.

`components/ui/Button.tsx` covers `<button>` elements (forms, wizard).

---

## Motion

- Hover and UI: 150–350ms, Tailwind default easing (brand curve), `opacity` and `transform` only. `hover:` styles apply only on devices with a pointer (`future.hoverOnlyWhenSupported`); on touch screens every link and button dims to 60% while pressed (`globals.css`).
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
