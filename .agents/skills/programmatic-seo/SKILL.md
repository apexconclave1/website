# Skill: Programmatic SEO

> Data-driven event pages and URL rules for the Apex Conclave website. Pages are generated from TypeScript data, not a CMS.

---

## When to Activate

- Adding an event or a new edition of an event
- Proposing a new page type (committee, category, study guide)
- Changing a slug or URL

---

## URL architecture (current)

```
/                         Home (Apex Conclave)
/events                   Directory: upcoming + past (category filter appears with 2+ categories)
/events/diplovia-2026     Event page, statically generated from eventsData
/about /community /partners /contact /faq /terms
/register?event=<slug>    Registration (noindex)
/committees               Redirects to /events/diplovia-2026#committees
```

## How event pages are generated

- `app/events/[slug]/page.tsx`: `generateStaticParams()` from `eventsData`; `generateMetadata()` per event; unknown slug → `notFound()`.
- Content comes from `src/lib/data/`: `events.ts` (event), `chambers.ts` (committees, keyed by event id), `faqs.ts` (`faqsByEvent`), `eventStory.ts` (booklet copy). Adding an event = adding entries there; home, directory, footer, sitemap and event page update themselves.

## Slug rules

- Lowercase, hyphenated, `{event-name}-{year}`: `diplovia-2026`.
- **Never change or delete a published slug.** When Diplovia 2027 starts, add `diplovia-2027` and set 2026 to `PAST`; the 2026 page stays as the record (results, photos, recap). If a slug must move, add a permanent redirect in `next.config.mjs`.

## New page types: only with real content

A generated page must answer a search on its own. Thin pages (a name and two lines) are worse than no page.

| Page type | Add when | Not before |
|---|---|---|
| Committee page `/events/[slug]/committees/[id]` | Each committee has a final country list, an agenda background of a few hundred words, and a study guide | Country lists are placeholders today |
| Study guide as an HTML page | A guide exists; HTML is indexable and readable on phones, a PDF alone is not | — |
| Category page `/events/category/[category]` | 2+ categories with several events each | One event today; the directory filter is enough |
| Past-edition recap | An edition has ended and has results or photos | — |

## Scaling

- Static data files in `src/lib/data/` until editing them becomes the bottleneck (roughly 10+ events or non-technical editors). Then choose a CMS with the owner; Sanity was removed on purpose.
- Pages stay statically generated; if data ever comes from a database or CMS, use `export const revalidate = 3600` instead of rendering on every request.
