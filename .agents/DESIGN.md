# Apex Conclave — Design System

> Source: the owner's redesign brief (2026-10-22, `../one.md`). It replaces the palette and "Inter only" rule of `docs/Apex_Conclave_Developer_Design_Sheet.pdf`. The logo files from the design sheet stay as they are.

---

## Direction

Dark, editorial, with depth: tonal shading, soft fades and grain instead of flat blocks. Apex Conclave is an umbrella brand for student competitions and events across several disciplines; Diplovia is one event inside it, not the identity of the whole site.

The site should look designed by a person, not generated from a template: typography, composition, real content and fine dividers carry the personality. No fake numbers, sponsors, testimonials or events.

**Logo**: `components/layout/ApexWordmark.tsx` draws `public/brand/apex-conclave-logo-light.png` as a CSS mask in the palette's logo colour (`.logo-mark`): same shape and proportions, colour per palette (owner approved an off-white version). Never redraw it in type, stretch it or add effects. When an event has its own identity (Diplovia), Apex Conclave is the parent brand next to it.

---

## Palette (owner, 2026-10-22; replaces the brief's ink/cream/bronze palette)

Colours are set by role as CSS variables (`globals.css`) and used through Tailwind names. Two palettes are built in while the owner decides; visitors get **red**. `?palette=teal` or `?palette=red` on any URL switches and is remembered in that browser (script in `app/layout.tsx`, marked `ponytail:`; delete it and the teal block once one is chosen).

| Role (Tailwind) | Use | Red (default) | Teal |
|---|---|---|---|
| `deep` | Nav, footer, hero, bottom of dark sections | `#161616` (derived) | `#010A09` (derived) |
| `ground` | Dark base; text on light sections | `#2A2A2A` | `#031211` |
| `soft` | Body text on dark; light section background | `#C0C0C0` | `#E8E4D3` |
| `bright` | Headlines on dark | `#EDEDED` (derived) | `#F7F4E8` (derived) |
| `accent` | Buttons, lines, markers, labels, hero highlight | `#E10600` | `#00AEBB` |
| `on-accent` | Text on accent buttons | `#FFFFFF` | `#031211` |
| labels on light sections (`--c-accent-on-soft`) | `.eyebrow` inside `.tone-soft` | `#E10600` | `#031211` |
| logo (`--c-logo`) | `.logo-mark` | `#EDEDED` off-white | `#EAE6DF` original cream |

Contrast (checked 2026-10-22): soft on ground 7.9 (red) / 15 (teal); white on red 5.0; dark on teal 7.1; teal text on dark 7.1.

**Known exception (owner accepted):** in the red palette, small red labels fail contrast (2.9:1 on charcoal, 3.6:1 on near-black, 2.7:1 on silver). The teal palette has none.

Errors: `.field-error` and `.alert-error` show the message in `bright` with an accent ⚠ (and accent borders on invalid fields); accent text alone would fail contrast.

## Tone, depth and texture

- `.tone-dark`: ground with a faint top light, shading to `deep` at the bottom.
- `.tone-soft`: soft with a light bloom top left.
- `.tone-hero`: deep with a low accent glow rising from the bottom edge (stage light).
- Fades: add `fade-top-deep|ground|soft` (colour of the section above) and `fade-bottom-deep` (below); eased with `color-mix` stops over 3.5rem (6rem from md).
- The page background (`body`) shades deep → ground → deep for all-dark pages.
- Film grain: `body::after`, fixed SVG noise, 9% overlay; hidden in print.
- Gradients are allowed for these tones only. Still no purple-blue gradients, neon, glassmorphism or heavy shadows.

## Typography

- **Headlines (h1, h2)**: Newsreader (`font-serif`, `--font-newsreader`, variable with optical sizing). Applied to `h1, h2` in `globals.css`. Weight 400–500; no bold serif.
- **Everything else**: Inter (`font-sans`, `--font-inter`): body, nav, buttons, labels, h3 and below.
- **Labels**: `.eyebrow`: 12px uppercase, `tracking-[0.14em]`, accent (labels inside light sections use the palette label colour). No wider tracking anywhere.
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

- `.btn-primary`: accent fill, `on-accent` text; hover turns `deep`. Used on dark and light sections.
- `.btn-secondary`: soft outline on dark; hover shows the accent border.

`components/ui/Button.tsx` covers `<button>` elements (forms, wizard).

---

## Motion

- 150–350ms, Tailwind default easing (brand curve), `opacity` and `transform` only.
- Subtle hover on nav, buttons and links. No scroll animation on every heading or card. Nothing starts hidden.
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
- No parallax, spinning or heavy scroll animation.
