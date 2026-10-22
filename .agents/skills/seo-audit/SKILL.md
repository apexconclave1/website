# Skill: SEO Audit

> Metadata, share previews, structured data and technical SEO for the Apex Conclave website (Next.js 14 Metadata API).

---

## When to Activate

- Adding a page, or changing a page's title, description or main heading
- Changing what a link preview shows on WhatsApp, Instagram, LinkedIn
- Adding or changing JSON-LD
- Before launch, after buying the domain, after changing event dates

---

## How metadata works here

- `app/layout.tsx` sets the defaults: `metadataBase` (from `lib/site.ts`), title template `%s | Apex Conclave`, description, `openGraph`, `twitter`, robots, Search Console verification (`GOOGLE_SITE_VERIFICATION`), author/creator (site credit, metadata only).
- Every page builds its metadata with `pageMetadata(title, description, path, imageUrl?)` from `lib/seo.ts`: full title, description, canonical, Open Graph (url, type, site name, locale, image) and Twitter tags.
- **Next.js merges metadata shallowly.** A page that sets `openGraph` by hand replaces the layout's whole `openGraph` object and loses the image. Always use `pageMetadata`.
- Page metadata also beats a route's `opengraph-image` file, so a page with its own image passes the URL as `imageUrl` (event pages pass `/events/<slug>/opengraph-image`).
- Default share image: `app/opengraph-image.png` (1200×630). Events get their own from `app/events/[slug]/opengraph-image.tsx` (`next/og`: event logo, subtitle from `searchTitle`, dates, Apex logo). It uses Satori's default font, not Inter.
- Event `searchTitle` (in `events.ts`) is the search and preview title, e.g. "Diplovia 2026: Virtual Model UN".
- Base URL: `NEXT_PUBLIC_SITE_URL`, else Vercel's production URL, else localhost. Canonicals, sitemap and robots follow it, so set it the day the domain is live.

## Structured data

Builders in `lib/seo.ts`, rendered with `<JsonLd data={…} />`:

| Schema | Where |
|---|---|
| `Organization`, `WebSite` (with `creator`) | Every page (layout) |
| `FAQPage` | `/faq` and each event page |
| `BreadcrumbList` | Event pages |
| `Event` | Event pages, **only when `startDate` exists** (`eventSchema` returns `null` otherwise). Includes `VirtualLocation`, organizer, and an `Offer` from `feeAt()` |

Do not publish an `Event` schema with guessed dates. When dates change after publishing, set `eventStatus` to `EventRescheduled` and keep `previousStartDate`.

## Crawling

- `app/robots.ts`: allow all, disallow `/api/`. `/register` is kept out with `robots: { index: false }`. A page that should stay out of search uses `robots: { index: false }` in its metadata, not a robots.txt block (Google cannot read a noindex on a page it is blocked from).
- `app/sitemap.ts`: every public page plus every event from `eventsData`. Add new pages there.
- `public/llms.txt`: plain summary for AI agents (includes the site credit).
- Unknown event slugs return 404 (`notFound()`); `/committees` redirects to the event page.

---

## Checklist per page

- [ ] Unique title; the template adds "| Apex Conclave". Put the words people search first ("Diplovia 2026: Virtual Model UN"), the brand last
- [ ] Description 120–160 characters, written for the person deciding whether to click
- [ ] Canonical set (`alternates.canonical`)
- [ ] Metadata built with `pageMetadata`; check the preview with a link-preview tool after deploy
- [ ] One `<h1>` containing real text (an image needs `alt`; an SVG heading needs visually hidden text)
- [ ] Every image has `alt`; decorative ones `alt=""`
- [ ] Link text says where it goes (no "click here")
- [ ] Listed in `app/sitemap.ts` if public; `index: false` if not
- [ ] JSON-LD only for facts that are true and visible on the page

## After deploy (owner)

1. Search Console: verify with `GOOGLE_SITE_VERIFICATION`, submit `/sitemap.xml`.
2. PageSpeed Insights on `/` and the event page (mobile). Watch LCP and INP.
3. Rich Results Test on the event page once dates are set.
4. After the domain: set `NEXT_PUBLIC_SITE_URL`, redeploy, redirect the `vercel.app` address to the domain in Vercel → Domains.
