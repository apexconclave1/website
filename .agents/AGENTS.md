# Apex Conclave — AI Agent Guidelines

> This file defines the core coding conventions and behavioral rules for any AI agent working on the Apex Conclave website codebase.

---

## Project Overview

**Apex Conclave** is a multi-format student events and competitions brand with six event verticals. **Diplovia 2026**, a virtual Model United Nations conference, is the first event.

- **Stack**: Next.js 14+ (App Router), React Server Components, Tailwind CSS, TypeScript, Lucide React, Supabase (Postgres), Vercel Analytics
- **Design Philosophy**: Two brands: Apex Conclave (dark, cinematic, editorial) and DIPLOVIA (diplomatic, editorial). Dark only (see `DESIGN.md`)

### Project docs (all in `.agents/`)

| File | What it holds |
|---|---|
| `PROGRESS.md` | Status, decisions, phase notes, known gaps, owner to-do. Start here |
| `DESIGN.md` | Design system: palette, type, motion, touch and keyboard rules |
| `PRODUCT.md` | Product vision, verticals, audience, roadmap |
| `SKILLS_MASTER_GUIDE.md` | Installed skills in `skills/` |
| `AGENTS.md` | This file: coding conventions |

The root `CLAUDE.md` and `AGENTS.md` only point here. `README.md` (root) covers setup and deploy.

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
├── components/       # UI components, one folder per area
│   ├── layout/       # Navbar, Footer, ApexWordmark (rendered once in app/layout.tsx)
│   ├── home/ verticals/ partners/ team/ events/ contact/ faq/  # Section components
│   ├── features/registration/  # Registration wizard
│   └── ui/           # Shared pieces (Button, Badge, StatusLabel, SectionHeading, ScrollReveal)
├── lib/              # Utilities, data, Supabase services
│   ├── data/         # Static content data files
│   ├── supabase/     # Supabase server client (service role)
│   ├── validators/   # Zod schemas shared by forms and API routes
│   └── security/     # Rate limiting, same-origin check
└── types/            # TypeScript type definitions
(global styles: src/app/globals.css)
```

### Naming
- Components: `PascalCase.tsx` (e.g., `EventCard.tsx`, `VerticalsGrid.tsx`)
- Utilities/data: `camelCase.ts` (e.g., `events.ts`, `config.ts`)
- Types: `PascalCase` interfaces, `UPPER_SNAKE_CASE` for union literals

### Styling
- Use **Tailwind CSS** utility classes with the custom design tokens defined in `tailwind.config.ts`.
- Use the role tokens (`deep`, `ground`, `surface`, `soft`, `bright`, `accent`, `on-accent`, `wine`), never raw hex; they switch between Apex and DIPLOVIA (`.theme-diplovia`, `<main data-brand="diplovia">`). See `DESIGN.md`.

### Performance
- Minimize `"use client"` boundaries. Push interactivity to leaf components.
- Use `React.lazy()` and `next/dynamic` for heavy client components.
- Optimize images with `next/image`.
- Avoid unnecessary re-renders: memoize callbacks and values where needed.

### Animation
- Use **CSS transitions** (Tailwind) for UI motion. There is no animation library.
- Keep durations between **150ms–350ms**.
- Preferred easing: `[0.25, 0.46, 0.45, 0.94]` (ease-out).
- Only animate `opacity`, `transform` (scale, translate). Never animate layout-triggering properties.
- Scroll motion only through the reveal classes (`.reveal`, `.reveal-right`, `.reveal-stagger`, `.reveal-cells`); see `DESIGN.md`.
- Phones: tap targets at least 44px (`.hit` for small links), form fields at least 16px.

---

## Strict Design Prohibitions

> Redesign v4 (2026-10-27): ScrollStack, FuzzyText and the hero typewriter removed; light mode removed. See `DESIGN.md`.

> [!CAUTION]
> These rules are **non-negotiable**. Violating them breaks the brand identity.

- ❌ **NO Gradients** except `.bg-hero` (each brand's hero gradient) on selected heroes and artwork, and the fixed page light in `globals.css`
- ❌ **NO Glassmorphism** (frosted glass, backdrop-blur panels)
- ❌ **NO Heavy Drop Shadows** (use hairline borders: `border-soft/15`)
- ❌ **NO Decorative Icons** (no random vectors, emoji, or ornamental graphics)
- ❌ **NO Large Accent Areas** (accent is for buttons, lines, labels and the hero highlight)
- ❌ **NO Heavy Parallax / Spinning Animations** (subtle transitions only)
- ❌ **NO Icon Logos**, **no redrawn or recoloured logo**: use `public/brand/apex-conclave-logo-light.png` via `ApexWordmark` and `diplovia-logo-light.png` as supplied, on dark backgrounds only

---

## Backend Guidelines (Supabase)

- Use **Supabase** on the free tier (enough for the first event). Free projects pause after about a week of inactivity.
- Schema: `supabase/migrations/001_init.sql`. RLS is on and the anon key has no access; every read/write goes through API routes with the service-role key.
- Seats are not booked online. Delegates list two preferences; the team fills `assigned_committee` / `assigned_country` by hand.
- Prices come from `pricing` in `lib/data/events.ts` and are computed on the server (`feeAt`). Never trust an amount sent by the browser.
- Coupons are redeemed with the `redeem_coupon()` SQL function (atomic). Rate limits use `rateLimit()` (in-memory plus `hit_rate_limit()` in Supabase, migration 004); a UTR can be used once.
- The service-role key is server-only (`lib/supabase/server.ts`). Never import it in a client component.
- Content that changes per event lives in `lib/data/*` (events, chambers with country lists, event story, verticals, organisation and team, faqs). There is no CMS.
- Navbar and Footer are rendered once in `app/layout.tsx`. Do not import them in pages.
- Fonts: Space Grotesk (Apex) or Playfair Display (DIPLOVIA) for h1/h2 and `font-display` through `--font-display`; Inter for everything else. All via next/font. Do not add other families.
- Contact email comes from `organizationConfig.contactEmail`. Do not hard-code addresses.

## Commit & Code Review

- Write descriptive commit messages: `feat:`, `fix:`, `refactor:`, `docs:`, `style:`.
- Every component should be self-contained and testable.
- Keep PRs focused on a single concern.
