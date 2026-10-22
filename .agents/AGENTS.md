# Apex Conclave — AI Agent Guidelines

> This file defines the core coding conventions and behavioral rules for any AI agent working on the Apex Conclave website codebase.

---

## Project Overview

**Apex Conclave** is an elite umbrella organization hosting multiple premier events, conferences, and youth initiatives. The flagship event is **Diplovia**, a diplomatic Model United Nations conference.

- **Stack**: Next.js 14+ (App Router), React Server Components, Tailwind CSS, TypeScript, Lucide React, Supabase (Postgres), Vercel Analytics
- **Design Philosophy**: Minimal · Youthful · Intelligent · Premium · Typography-Led · Dark-First

---

## Coding Conventions

### General
- Write **TypeScript** everywhere. No `any` types unless absolutely necessary.
- Use **React Server Components** (RSC) by default. Only add `"use client"` when the component needs interactivity, hooks, or browser APIs.
- Keep components small, focused, and reusable.
- Use named exports for components; default exports only for page/layout files.
- Use absolute imports via `@/` path alias (maps to `src/`).

### File & Folder Structure
```
src/
├── app/              # Next.js App Router pages & layouts
├── components/       # Shared UI components
│   ├── layout/       # Navbar, Footer, ApexWordmark (rendered once in app/layout.tsx)
│   ├── features/registration/  # Registration wizard
│   └── ui/           # Primitive UI components (Button, Badge, WebGL effects)
├── lib/              # Utilities, data, Supabase services
│   ├── data/         # Static content data files
│   ├── supabase/     # Supabase server client (service role)
│   ├── validators/   # Zod schemas shared by forms and API routes
│   └── security/     # Rate limiting, same-origin check
├── types/            # TypeScript type definitions
└── styles/           # Global styles (if separate from app/)
```

### Naming
- Components: `PascalCase.tsx` (e.g., `EventCard.tsx`, `SeatMatrix.tsx`)
- Utilities/data: `camelCase.ts` (e.g., `events.ts`, `config.ts`)
- Types: `PascalCase` interfaces, `UPPER_SNAKE_CASE` for union literals

### Styling
- Use **Tailwind CSS** utility classes with the custom design tokens defined in `tailwind.config.ts`.
- For custom hex values, use Tailwind's arbitrary value syntax: prefer the palette tokens (`ink`, `cream`, `bronze`, `paper`, `stone`, `hairline`); see `DESIGN.md`.
- Prefer design token classes (`bg-bg`, `text-soft-white`, `bg-surface`) over raw hex when tokens are configured.

### Performance
- Minimize `"use client"` boundaries. Push interactivity to leaf components.
- Use `React.lazy()` and `next/dynamic` for heavy client components.
- Optimize images with `next/image`.
- Avoid unnecessary re-renders: memoize callbacks and values where needed.

### Animation
- Use **CSS transitions** (Tailwind) for UI motion. There is no animation library.
- Keep durations between **150ms–350ms**.
- Preferred easing: `[0.25, 0.46, 0.45, 0.94]` (ease-out).
- Only animate `opacity`, `transform` (scale, translateY). Never animate layout-triggering properties.

---

## Strict Design Prohibitions

> Kept effects (2026-10-22): ScrollStack (`/events`) and FuzzyText (404 only). See `DESIGN.md`.

> [!CAUTION]
> These rules are **non-negotiable**. Violating them breaks the brand identity.

- ❌ **NO Gradients** (linear or radial)
- ❌ **NO Glassmorphism** (frosted glass, backdrop-blur panels)
- ❌ **NO Heavy Drop Shadows** (use hairline borders: `border-cream/10` on ink, `border-hairline` on paper)
- ❌ **NO Decorative Icons** (no random vectors, emoji, or ornamental graphics)
- ❌ **NO Excessive Bronze** (bronze `#8C7B5A` is for thin lines, icons and small labels only)
- ❌ **NO Heavy Parallax / Spinning Animations** (subtle transitions only)
- ❌ **NO Icon Logos** and **no redrawn logo**: use `public/brand/apex-conclave-logo-*.png` via `ApexWordmark`

---

## Backend Guidelines (Supabase)

- Use **Supabase** on the free tier (enough for the first event). Free projects pause after about a week of inactivity.
- Schema: `supabase/migrations/001_init.sql`. RLS is on and the anon key has no access; every read/write goes through API routes with the service-role key.
- Seats are not booked online. Delegates list two preferences; the team fills `assigned_committee` / `assigned_country` by hand.
- Prices come from `pricing` in `lib/data/events.ts` and are computed on the server (`feeAt`). Never trust an amount sent by the browser.
- Coupons are redeemed with the `redeem_coupon()` SQL function (atomic).
- The service-role key is server-only (`lib/supabase/server.ts`). Never import it in a client component.
- Content that changes per event lives in `lib/data/*` (events, chambers with country lists, leaders, faqs). There is no CMS.
- Navbar and Footer are rendered once in `app/layout.tsx`. Do not import them in pages.
- Fonts: Newsreader for h1/h2 (`--font-newsreader`), Inter for everything else (`--font-inter`), both via next/font. Do not add other families.
- Contact email comes from `organizationConfig.contactEmail`. Do not hard-code addresses.

## Commit & Code Review

- Write descriptive commit messages: `feat:`, `fix:`, `refactor:`, `docs:`, `style:`.
- Every component should be self-contained and testable.
- Keep PRs focused on a single concern.
