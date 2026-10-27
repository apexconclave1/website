# Apex Conclave × DIPLOVIA: Design System

> Source: the owner's redesign v4 brief "Final website redesign brief: Apex Conclave × DIPLOVIA" (2026-10-27) and the owner's answers recorded in `PROGRESS.md`. Replaces the v3 teal palette, Newsreader headlines and light mode. The logo files from `docs/Apex_Conclave_Developer_Design_Sheet.pdf` stay as they are.

---

## Two brands

- **Apex Conclave**: dark, cinematic, editorial, confident. A premium competition and experiences company. Default on every page.
- **DIPLOVIA**: diplomatic, intellectual, international, prestigious. Its own navy, ivory, gold and burgundy identity; never Apex's lime.
- Both share quality and discipline (grid, spacing, components), not colours or display fonts.

The site should look art-directed, not templated: strong typography, deliberate alignment, generous space, original compositions. No fake numbers, sponsors, testimonials, photos or events.

**Logos** are used exactly as supplied: `public/brand/apex-conclave-logo-light.png` (via `components/layout/ApexWordmark.tsx`, `next/image`) and `public/brand/diplovia-logo-light.png`. Both are light, with no dark or SVG versions, so they only sit on dark backgrounds. Never recolour (no CSS masks or filters), redraw, stretch or add effects. On DIPLOVIA pages Apex Conclave stays visible as the parent brand.

---

## Tokens

Colours are roles, defined as RGB-triplet CSS variables in `globals.css` and used through Tailwind names (`bg-ground`, `text-soft`, `border-soft/15`). Never use raw hex in components.

| Role (Tailwind) | Use | Apex (default, `:root`) | DIPLOVIA (`.theme-diplovia`) |
|---|---|---|---|
| `deep` | Darkest step, hover fills | `#070708` (derived) | `#0A111D` |
| `ground` | Page background | `#0B0B0C` Deep Obsidian Black | `#101B2D` Midnight Navy |
| `surface` | Secondary surfaces, panels | `#222226` Graphite | `#14253D` |
| `soft` | Body text, hairlines (`border-soft/15`) | `#E4E4E4` Muted Off-White | `#F1EBDD` Muted Ivory |
| `bright` | Headlines, strong text | `#F4F4F1` (derived) | `#F9F6EE` (derived) |
| `accent` | Buttons, markers, labels | `#C7F36B` Acid Lime | `#B99A5F` Antique Gold (6.4:1 on navy) |
| `on-accent` | Text on accent fills | `#0B0B0C` | `#101B2D` |
| `wine` | Fills and artwork only, never text | graphite (Apex has none) | `#642C3A` Burgundy |

**Scoping.** Apex is the default. DIPLOVIA applies in two ways, both in `globals.css`:
- `.theme-diplovia` on a section (e.g. the home featured event): redefines the roles inside it and sets its background and text colour.
- `<main data-brand="diplovia">` on a page (event pages with `brand: 'diplovia'` in `lib/data/events.ts`): `body:has(main[data-brand='diplovia'])` switches the whole page, navbar and footer included, with no script. Browsers without `:has()` keep Apex colours around the page.

Change one brand's block without touching the other. Accent is restrained: buttons, small labels, thin lines, one highlight per view. No large accent areas.

**Gradients** only where they add depth (selected heroes, featured artwork), via `.bg-hero`, which reads `--hero-gradient` from the active brand:
- Apex: `linear-gradient(115deg, #0B0B0C 0%, #17171F 55%, #292A20 100%)`
- DIPLOVIA: `linear-gradient(115deg, #0A111D 0%, #14253D 58%, #35202A 100%)`

Solid backgrounds everywhere else. Allowed textures: the fixed faint top light (`body::before`), fine grain (`body::after`, 6%), fine grid lines and subtle radial light used selectively. No neon glow, rainbow or purple-blue gradients, glassmorphism or heavy blur.

## Typography

| Use | Apex | DIPLOVIA |
|---|---|---|
| h1, h2, `font-display` | Space Grotesk (`--font-space-grotesk`, variable 300–700), tracking −0.025em | Cormorant Garamond (`--font-cormorant`, 500/600, italic), tracking −0.005em |
| Body, UI, h3 and below | Inter (`--font-inter`) | Inter |

- `--font-display` switches with the brand, so `h1, h2` and `font-display` follow the scope automatically.
- All via `next/font` in `app/layout.tsx`. Cormorant is not preloaded; browsers only fetch it where DIPLOVIA type renders. No other families.
- Cormorant runs small for its size; set DIPLOVIA headlines a step larger than Apex ones.
- **₹** comes from the device font (`Rupee` @font-face, U+20B9 only, first in every stack). Keep `Rupee` first in any new stack.
- **Labels**: `.eyebrow`: 12px uppercase, `tracking-[0.14em]`, `text-accent`.

## Shape, spacing, depth

- **Radius**: 2px everywhere (`rounded`, `rounded-sm`, `rounded-lg`). `rounded-full` only for small dots.
- **Depth**: hairline borders and tone (`surface`), never heavy shadows.
- **Container**: `max-w-container` (1240px), 24px side padding. 8px spacing grid; sections 64–128px vertical.
- **Breakpoints**: Tailwind defaults (`sm` 640, `md` 768, `lg` 1024, `xl` 1280). Test at 360, 390, 768, 1024, 1440.
- **Variety**: each section gets its own layout. Avoid rows of identical rounded cards.

## Components

| Component | Where | Notes |
|---|---|---|
| `.btn-primary` / `.btn-secondary` | `globals.css`, on links | Primary: accent fill, hover to `bright`. Secondary: outline, hover accent border and text. Both press down 1px |
| `Button` | `components/ui/Button.tsx` | Same looks for `<button>` (forms, wizard) |
| `StatusLabel` | `components/ui/StatusLabel.tsx` | `active` (accent dot), `upcoming` (outline), `planned` (dashed, muted). Planned must never look running |
| `SectionHeading` | `components/ui/SectionHeading.tsx` | Eyebrow, h2, description |
| `.card-lift` | `globals.css` | Linked cards: 4px lift and stronger border on hover |
| `.panel`, `.field-*`, `.alert-error` | `globals.css` | Panels on `surface`, form fields, errors |
| `ApexWordmark` | `components/layout/` | The logo, unaltered |

## Touch and keyboard (Apple HIG review, 2026-10-23)

- **Tap areas at least 44×44px** on phones; small stand-alone links get `.hit` (invisible 44px `::before`). Links inside sentences are exempt.
- **Form fields 16px on phones** (`.field-input` is `text-base sm:text-sm`).
- **Focus rings** follow the text colour; `.btn-primary` uses `bright`.
- **Large text**: hero headline capped by screen width; navbar controls in px, so 200% text fits at 390px.
- **Hover** only on pointer devices (`future.hoverOnlyWhenSupported`); touch gets a 60% pressed state. Never rely on hover for content.
- **Increase Contrast**: hairlines and borders go to 60%.
- **Landscape phones**: navbar 56px under 500px height.

## Motion

- UI: 150–350ms, brand ease-out, `opacity` and `transform` only. Card hover lift 4–6px; quick button feedback.
- **Scroll reveal**: `.reveal`, `.reveal-right`, `.reveal-stagger`, `.reveal-cells` with `components/ui/ScrollReveal.tsx` (IntersectionObserver adds `.is-in`). Content hidden only with JS and motion allowed. Not on the hero, nav or footer; no nesting.
- Allowed: subtle staggered headline entrance, gentle reveals, subtle DIPLOVIA artwork parallax if cheap.
- Not allowed: continuous spinning, particles, flashing, scroll hijacking, animation libraries, decorative motion.
- Global reduced-motion rule in `globals.css`; everything must work without motion.
- Removed 2026-10-27 (owner): hero typewriter, ScrollStack on `/events`, FuzzyText 404.

## Prohibitions

- No colours outside the two brand blocks; no lime in DIPLOVIA, no gold or navy in Apex.
- No recoloured, redrawn or distorted logos.
- No stock or AI photos, random illustrations, or images posing as real Apex Conclave events. Artwork is original geometry, typography or SVG composition.
- No mixed icon styles: Lucide outline only, small, where they help.
- No fake statistics, testimonials, partner logos, awards or endorsements. Planned verticals labelled as planned.
- No pure white (`#fff`) backgrounds.
