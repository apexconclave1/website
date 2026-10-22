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
| `ink` | `#0C0C0D` | Dark backgrounds (hero, nav, footer, dark sections) |
| `cream` | `#EAE6DF` | Text on ink, primary button fill; `cream/70` secondary text, `cream/10`–`/30` borders on ink |
| `bronze` | `#8C7B5A` | Thin lines, icons, labels, focus ring. Never text on paper |
| `paper` | `#F4F1EA` | Light sections |
| `stone` | `#6E6A62` | Secondary text on paper only |
| `hairline` | `#CFC9BD` | Borders on paper |
| `max-w-container` | 1240px | Every page's content width |

Fonts: Newsreader (`font-serif`, automatic on h1/h2) and Inter (`font-sans`). Radius: 2px everywhere.

## Shared classes (`app/globals.css`)

`.panel` (bordered panel), `.btn-primary` and `.btn-secondary` (link buttons), `.field-label`, `.field-input`, `.field-error` (all forms), `.eyebrow` (section label, plain bronze text), `.ext-link` and `.card-link` (social links with hover arrow and lift).

## Shared components — reuse before writing markup

`SectionHeading` (eyebrow, title, description, `as="h1"` for page titles), `EventCard` (every event listing, home included), `Button`, `Badge`, `TeamCard`, `Breadcrumbs`, `ApexWordmark` (the logo image; never redraw the logo in type).

---

## Principles

1. **Depth from hairlines, not shadows.** Borders and dark/light section changes.
2. **Typography carries hierarchy.** Serif headings at 400–500 weight; body 16–18px `cream`; meta 12–14px `cream/70` (on paper: `ink` and `stone`). Headings use `text-wrap: balance`.
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

Only `ScrollStack` (`/events`) and `FuzzyText` (404) remain (owner decision, 2026-10-22). See `.agents/DESIGN.md`.

## Checklist before shipping

- [ ] Tokens only; no raw hex, no new colours
- [ ] No gradients, glass or shadows anywhere
- [ ] Bronze only for eyebrows, small badges, focus ring
- [ ] Width `max-w-container`; existing shared component reused where one fits
- [ ] Hover 150–350ms (`transition` uses the brand curve by default)
- [ ] Works at 390px with a 16–24px gutter and no horizontal scroll (check on a real phone)
- [ ] Contrast at least 4.5:1 for text
