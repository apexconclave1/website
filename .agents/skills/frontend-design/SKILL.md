# Skill: Frontend Design

> Dark-first, typography-led UI for the Apex Conclave website. Full rules: `.agents/DESIGN.md` (from `docs/Apex_Conclave_Developer_Design_Sheet.pdf`).

---

## When to Activate

- Building a new page, section or component
- Reviewing a component for brand compliance
- Making layout decisions (grid, spacing, container width)

---

## Tokens (use these, never raw hex)

| Tailwind token | Use |
|---|---|
| `deep` | Hover fills; darkest step |
| `ground` | The one page background, nav, panels |
| `soft` | Body text (`text-soft`); lines `border-soft/15`–`/25` |
| `bright` | Headlines, strong text |
| `accent` | Buttons, lines, markers, labels, hero highlight |
| `on-accent` | Text on accent fills |

Values per palette and mode (teal default, light mode toggle, red preview via `?palette=red`) are in `.agents/DESIGN.md` and `globals.css`. Use roles, never hex.
| `max-w-container` | 1240px | Every page's content width |

Fonts: Newsreader (`font-serif`, automatic on h1/h2) and Inter (`font-sans`). Radius: 2px everywhere.

## Shared classes (`app/globals.css`)

`.panel` (bordered panel), `.btn-primary` and `.btn-secondary` (link buttons), `.field-label`, `.field-input`, `.field-error` (all forms), `.eyebrow` (section label, plain bronze text), `.ext-link` and `.card-link` (social links with hover arrow and lift).

## Shared components — reuse before writing markup

`SectionHeading` (eyebrow, title, description, `as="h1"` for page titles), `EventCard` (every event listing, home included), `Button`, `Badge`, `TeamCard`, `Breadcrumbs`, `ApexWordmark` (the logo image; never redraw the logo in type).

---

## Principles

1. **Depth from hairlines, not shadows.** One background; sections divided by hairlines and spacing.
2. **Typography carries hierarchy.** Serif headings at 400–500 weight; body 16–18px `soft`; meta 12–14px `cream/70` (on paper: `ink` and `stone`). Headings use `text-wrap: balance`.
3. **Breathing room.** Sections 64–96px vertical padding (`py-16 md:py-24`); cards at least 24px inside (`p-6`).
4. **Accent with intent.** Buttons, lines, labels and one hero highlight; no large accent backgrounds.
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

Only `ScrollStack` (`/events`) and `FuzzyText` (404) remain (owner decision, 2026-10-22). See `.agents/DESIGN.md`.

## Checklist before shipping

- [ ] Tokens only; no raw hex, no new colours
- [ ] No gradients, glass or shadows anywhere
- [ ] Bronze only for eyebrows, small badges, focus ring
- [ ] Width `max-w-container`; existing shared component reused where one fits
- [ ] Hover 150–350ms (`transition` uses the brand curve by default)
- [ ] Works at 390px with a 16–24px gutter and no horizontal scroll (check on a real phone)
- [ ] Contrast at least 4.5:1 for text
