# Apex Conclave — AI Agent Guidelines

> This file defines the core coding conventions and behavioral rules for any AI agent working on the Apex Conclave website codebase.

---

## Project Overview

**Apex Conclave** is an elite umbrella organization hosting multiple premier events, conferences, and youth initiatives. The flagship event is **Diplovia**, a diplomatic Model United Nations conference.

- **Stack**: Next.js 14+ (App Router), React Server Components, Tailwind CSS, TypeScript, Framer Motion, GSAP, ogl (WebGL), Lenis, Lucide React, Supabase (Postgres + Realtime)
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
│   ├── events/       # Event page client pieces (SeatSection)
│   └── ui/           # Primitive UI components (Button, Badge, WebGL effects)
├── lib/              # Utilities, data, Supabase services
│   ├── data/         # Static content data files
│   ├── supabase/     # Supabase browser and server clients
│   └── security/     # Rate limiting
├── types/            # TypeScript type definitions
└── styles/           # Global styles (if separate from app/)
```

### Naming
- Components: `PascalCase.tsx` (e.g., `EventCard.tsx`, `SeatMatrix.tsx`)
- Utilities/data: `camelCase.ts` (e.g., `events.ts`, `config.ts`)
- Types: `PascalCase` interfaces, `UPPER_SNAKE_CASE` for union literals

### Styling
- Use **Tailwind CSS** utility classes with the custom design tokens defined in `tailwind.config.ts`.
- For custom hex values, use Tailwind's arbitrary value syntax: `bg-[#080909]`, `text-[#F4F2ED]`.
- Prefer design token classes (`bg-bg`, `text-soft-white`, `bg-surface`) over raw hex when tokens are configured.

### Performance
- Minimize `"use client"` boundaries. Push interactivity to leaf components.
- Use `React.lazy()` and `next/dynamic` for heavy client components.
- Optimize images with `next/image`.
- Avoid unnecessary re-renders: memoize callbacks and values where needed.

### Animation
- Use **Framer Motion** for all animations.
- Keep durations between **150ms–350ms**.
- Preferred easing: `[0.25, 0.46, 0.45, 0.94]` (ease-out).
- Only animate `opacity`, `transform` (scale, translateY). Never animate layout-triggering properties.

---

## Strict Design Prohibitions

> Owner exception (2026-10-06): the 4 React Bits components in `components/ui` (DarkVeil, StrokeText, AccordionGallery, SpecularButton, ScrollStack) are used as supplied, including their gradients, glow, shadows and blur. The rules below apply to everything else.

> [!CAUTION]
> These rules are **non-negotiable**. Violating them breaks the brand identity.

- ❌ **NO Gradients** (linear or radial)
- ❌ **NO Glassmorphism** (frosted glass, backdrop-blur panels)
- ❌ **NO Heavy Drop Shadows** (use `border border-[#141718]` or `border border-[#1a1d1e]`)
- ❌ **NO Decorative Icons** (no random vectors, emoji, or ornamental graphics)
- ❌ **NO Excessive Bronze** (`#C7A16A` is for tiny badges and text highlights ONLY)
- ❌ **NO Heavy Parallax / Spinning Animations** (subtle transitions only)
- ❌ **NO Icon Logos** (the logo is a typography-only wordmark: `apex CONCLAVE`)

---

## Backend Guidelines (Supabase)

- Use **Supabase** on the free tier (enough for the first event). Free projects pause after about a week of inactivity.
- Seat reservation goes through the `reserve_seat_atomic()` SQL function (row lock) so two delegates cannot book the same seat.
- Live seat counts use Supabase Realtime on `registrations`.
- The service-role key is server-only (`lib/supabase/server.ts`). Never import it in a client component.
- Content that changes per event lives in `lib/data/*` (events, chambers, leaders, faqs). Sanity is not part of v1.
- Navbar and Footer are rendered once in `app/layout.tsx`. Do not import them in pages.
- Font is Inter only (next/font, `--font-inter`). Do not add other font families.
- Contact email comes from `organizationConfig.contactEmail`. Do not hard-code addresses.

## Commit & Code Review

- Write descriptive commit messages: `feat:`, `fix:`, `refactor:`, `docs:`, `style:`.
- Every component should be self-contained and testable.
- Keep PRs focused on a single concern.
