# Skill: Frontend Design

> Dark-first, typography-led UI for the Apex Conclave website. Full rules: `.agents/DESIGN.md` (from `docs/Apex_Conclave_Developer_Design_Sheet.pdf`).

---

## When to Activate

- Building a new page, section or component
- Reviewing a component for brand compliance
- Making layout decisions (grid, spacing, container width)

---

## Tokens (use these, never raw hex)

| Tailwind token | Hex | Use |
|---|---|---|
| `bg` | `#080909` | Page background (layer 0) |
| `surface` | `#141718` | Cards, panels, dialogs (layer 1) |
| `line` | `#1a1d1e` | Default borders, dividers (layer 2) |
| `line-strong` | `#2a2d2e` | Hover and highlighted borders (layer 3) |
| `soft-white` | `#F4F2ED` | Headings, body text, primary button fill |
| `muted-grey` | `#A5A6A2` | Secondary text and meta |
| `warm-bronze` | `#C7A16A` | Eyebrows, small badges, focus ring only |
| `deep-teal` | `#21474D` | Rare accent |
| `max-w-container` | 1240px | Every page's content width |

Font: Inter only (`font-sans`). Radius: `rounded` (10px) for cards and buttons, `rounded-sm` (8px) inside cards.

## Shared classes (`app/globals.css`)

`.panel` (surface card), `.field-label`, `.field-input`, `.field-error` (all forms), `.eyebrow` (section label, plain bronze text), `.ext-link` and `.card-link` (social links with hover arrow and lift).

## Shared components — reuse before writing markup

`SectionHeading` (eyebrow, title, description, `as="h1"` for page titles), `EventCard` (every event listing, home included), `Button`, `Badge`, `TeamCard`, `Breadcrumbs`, `ApexWordmark` (the logo image; never redraw the logo in type), `SpecularButton` (primary CTAs only).

---

## Principles

1. **Depth from surfaces, not shadows.** `bg` → `surface` → `line` → `line-strong`.
2. **Typography carries hierarchy.** Headings large and bold; body 16–18px `soft-white`; meta 12–14px `muted-grey`. Headings use `text-wrap: balance`.
3. **Breathing room.** Sections 64–96px vertical padding (`py-16 md:py-24`); cards at least 24px inside (`p-6`).
4. **Bronze is small.** One eyebrow per section at most; never bronze fills or large bronze text.
5. **Content lives in `src/lib/data/`**, not in components (events, chambers, FAQs, organisation, booklet story).
6. **Private things stay private.** Sponsorship tiers and prices are never on the site. The site credit (Kapish Garg) is in metadata, JSON-LD and `llms.txt` only, never visible.

## Section pattern

```tsx
<section className="py-16 md:py-24">
  <div className="mx-auto max-w-container px-6">
    <SectionHeading eyebrow="Committees" title="Five rooms, one weekend" description="…" />
    <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">…</div>
  </div>
</section>
```

---

## Approved effects

`DarkVeil`, `StrokeText`, `AccordionGallery`, `SpecularButton` and `ScrollStack` keep their own gradients, glow, blur and timing (owner decision, 2026-10-20). Where each is allowed: `.agents/DESIGN.md`. Do not "fix" them, and do not copy their styling into other components.

## Checklist before shipping

- [ ] Tokens only; no raw hex, no new colours
- [ ] No gradients, glass or shadows outside the five approved effects
- [ ] Bronze only for eyebrows, small badges, focus ring
- [ ] Width `max-w-container`; existing shared component reused where one fits
- [ ] Hover 150–350ms (`transition` uses the brand curve by default)
- [ ] Works at 390px with a 16–24px gutter and no horizontal scroll (check on a real phone)
- [ ] Contrast at least 4.5:1 for text
