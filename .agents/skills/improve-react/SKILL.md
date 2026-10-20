# Skill: Improve React

> Server-first rendering and bundle discipline for the Apex Conclave website (Next.js 14 App Router, React 18).

---

## When to Activate

- Deciding between a Server and a Client Component
- Adding a heavy dependency or effect
- A page's First Load JS grows in `next build` output
- Debugging an unexpected re-render

---

## Server vs Client

```
Does the component need...
├── useState / useEffect / useRef or other hooks?      → "use client"
├── onClick / onChange or other event handlers?        → "use client"
├── window, document, sessionStorage, matchMedia?      → "use client"
└── None of these?                                     → Server Component (default)
```

**Server Components are the default.** Push `"use client"` to the smallest leaf. Examples in this repo:

- `app/events/page.tsx` is a server page; only `components/events/EventsDirectory.tsx` (filter + ScrollStack) is client.
- Footer, `TeamCard`, `Breadcrumbs`, `JsonLd` and `SectionHeading` send no JS.
- Click tracking needs no client code in the component: add `data-track` (see the analytics skill).

## Data

- Site content is static TypeScript in `src/lib/data/` and is read directly in Server Components. No fetching, no CMS.
- Writes go through API routes in `app/api/` using `lib/supabase/server.ts` (service-role key, server only). There is **no browser Supabase client**; never add one or a `NEXT_PUBLIC_` key with table access.
- Prices, coupons and event state are decided on the server (`feeAt()`, `redeem_coupon()`); never trust amounts from the browser.

## Heavy pieces load on demand

| Piece | How |
|---|---|
| `DarkVeil` (WebGL) | `next/dynamic` with `ssr: false` in `DarkVeilWrapper` |
| `SpecularButton` (ogl) | `import('ogl')` inside `useEffect`; the link itself is server HTML |
| GSAP / Lenis | Imported only inside the effects that use them |
| Analytics | `<Analytics />` loads after hydration |

## Images

`next/image` everywhere (AVIF/WebP via `next.config.mjs`). `priority` only for the above-the-fold image of a page. Always pass `sizes` when the image is not fixed width.

## Memoisation

Do not add `React.memo`, `useMemo` or `useCallback` by default. Add one only for a measured problem (an expensive computation, or a memoised child that re-renders on a new function prop).

## Re-render checklist

1. Props recreated every render (inline objects or arrays passed to a memoised child)?
2. State held higher than the components that use it?
3. An effect that sets state on every render (missing or unstable dependency)?

---

## Bundle budget

Check `next build` output after any dependency or `"use client"` change. To build next to a running dev server: `NEXT_DIST_DIR=.next-build npm run build`.

| Route | First Load JS (Oct 2026) |
|---|---|
| Shared | 87.8 kB |
| `/` | 151 kB |
| `/events` | 122 kB |
| `/events/[slug]` | 135 kB |
| `/register` | 145 kB |
| `/contact` | 121 kB |

A change that adds more than ~10 kB to a route needs a reason. Ask the owner before installing a new package.
