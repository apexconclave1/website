# Skill: Modern Web Guidance

> Semantic HTML, accessibility and modern CSS (with progressive enhancement) for the Apex Conclave website.

---

## When to Activate

- Writing page structure, forms or interactive components
- Reaching for JS where CSS or a native element might do
- Reviewing accessibility or metadata

---

## Prefer the platform

| Need | Use | In this repo |
|---|---|---|
| Modal / confirm | `<dialog>` with `showModal()` | Payment confirmation in `StepPayment` |
| Scroll-linked motion | `animation-timeline: scroll()` / `view()` in `@supports` | `.scroll-progress`, `.rise` |
| Animate height | `grid-template-rows: 0fr → 1fr` | `FAQAccordion` |
| Balanced headings | `text-wrap: balance` | `h1, h2, h3` in `globals.css` |
| Autofill | `autocomplete` on every identity field; `off` on coupon and UTR | `StepIdentity`, `ContactForm` |
| Print | `@media print` in `globals.css` | Receipt and event pages print cleanly |

Use a JS fallback only when the feature carries meaning (the scroll bar has one; the heading rise does not need one).

## Semantic structure

- Navbar and Footer render once in `app/layout.tsx`; each page renders its own `<main id="main-content">`, which the layout's skip link targets.
- One `<h1>` per page (`SectionHeading as="h1"` when the section heading is the title). Eyebrows and footer column labels are `<p>`, not headings.
- Self-contained items (event cards) suit `<article>`; when an event gets dates, render them in `<time dateTime>` (Diplovia shows "Dates to be announced" for now).
- Groups of radio-like choices use `<fieldset>` + `<legend>`; toggle buttons use `aria-pressed`.

## Accessibility essentials

- Every control reachable and usable by keyboard; visible `:focus-visible` ring (bronze, 2px).
- Menus and dialogs close on Escape and return focus (Navbar mobile menu does this).
- Expanders: `aria-expanded` + `aria-controls`; collapsed content `invisible` so it leaves the tab order.
- Icon-only buttons need `aria-label`; decorative icons `aria-hidden`.
- Form errors: `aria-invalid` on the field and the message linked with `aria-describedby` or shown in `.field-error`.
- Reduced motion: the catch-all in `globals.css` covers CSS; JS effects check `matchMedia` themselves.
- Touch targets at least 44px on mobile (`Button` sets `max-md:min-h-11`).
- Contrast: `soft-white` on `bg` 16.7:1, `muted-grey` on `surface` 7.4:1, bronze on `bg` 8.3:1.

## Responsive

Tailwind defaults (`sm` 640, `md` 768, `lg` 1024). Navbar collapses below `lg`. Content width `max-w-container` (1240px). Check every page at 390px on a real phone; headless Chrome cannot render that narrow.

## Metadata and discoverability

- Per-page `metadata` with a canonical; title template `%s | Apex Conclave` in `app/layout.tsx`; base URL from `lib/site.ts`.
- JSON-LD through `<JsonLd>` with builders in `lib/seo.ts` (Organization, WebSite, FAQPage, BreadcrumbList, Event once dates exist).
- `app/sitemap.ts`, `app/robots.ts`, `public/llms.txt`. Add new public pages to the sitemap.
