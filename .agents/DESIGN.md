# Apex Conclave — Design System

> Source: the owner's redesign brief (2026-10-22, `../one.md`). It replaces the palette and "Inter only" rule of `docs/Apex_Conclave_Developer_Design_Sheet.pdf`. The logo files from the design sheet stay as they are.

---

## Direction

Dark, warm, restrained, editorial. Apex Conclave is an umbrella brand for student competitions and events across several disciplines; Diplovia is one event inside it, not the identity of the whole site.

The site should look designed by a person, not generated from a template: typography, composition, real content and fine dividers carry the personality. No fake numbers, sponsors, testimonials or events.

**Logo**: use the supplied files only, via `components/layout/ApexWordmark.tsx`: `public/brand/apex-conclave-logo-light.png` on ink, `-dark.png` on paper or cream. Never redraw, recolour, stretch or add effects. When an event has its own identity (Diplovia), Apex Conclave is the parent brand next to it.

---

## Palette (the only colours)

| Name | Hex | Tailwind | Use |
|---|---|---|---|
| Ink | `#0C0C0D` | `ink` | Dark backgrounds: hero, nav, footer, dark sections |
| Cream | `#EAE6DF` | `cream` | Text on ink, logo, primary button fill |
| Bronze | `#8C7B5A` | `bronze` | Accents only: thin lines, icons, labels, focus ring |
| Paper | `#F4F1EA` | `paper` | Light sections and content surfaces |
| Stone | `#6E6A62` | `stone` | Secondary text and captions **on paper only** |
| Hairline | `#CFC9BD` | `hairline` | Borders and dividers **on paper** |

On ink, tints of cream replace stone and hairline:

| Need on ink | Class | Contrast |
|---|---|---|
| Primary text | `text-cream` | 15.7:1 |
| Secondary text | `text-cream/70` | 7.9:1 |
| Placeholder | `placeholder:text-cream/55` | 5.2:1 |
| Border / divider | `border-cream/10`, stronger `/20`, hover `/30` | — |
| Hover fill | `bg-cream/5` | — |

Contrast limits (checked 2026-10-22):

- Stone on ink 3.6:1: do not use.
- Bronze on paper 3.65:1: lines and icons only, never text.
- Bronze on ink 4.7:1: small labels are fine.

Error colour `#E06C75` stays for form errors only.

Panels on ink have no fill (`bg-ink`) and a `cream/10` border. Do not use semi-transparent fills on things that overlap (ScrollStack cards).

---

## Typography

- **Headlines (h1, h2)**: Newsreader (`font-serif`, `--font-newsreader`, variable with optical sizing). Applied to `h1, h2` in `globals.css`. Weight 400–500; no bold serif.
- **Everything else**: Inter (`font-sans`, `--font-inter`): body, nav, buttons, labels, h3 and below.
- **Labels**: `.eyebrow`: 12px uppercase, `tracking-[0.14em]`, bronze. No wider tracking anywhere.
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

- `.btn-primary`: cream fill, ink text; hover turns to a cream outline.
- `.btn-secondary`: cream/40 outline, cream text; hover brightens the border.

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

- No gradients, neon, glassmorphism, glow or heavy shadows.
- No colours outside the palette; no separate palette per event vertical.
- No pure white (`#fff`) backgrounds.
- No AI-looking or generic stock photos; every image needs a purpose. Generated images must never pass as real Apex Conclave events.
- No random or mixed icon styles. Lucide outline icons only, small, bronze or cream, and only where they help.
- No fake statistics, testimonials, sponsor logos, partnerships or event listings. Planned verticals are labelled as planned.
- No parallax, spinning or heavy scroll animation.
