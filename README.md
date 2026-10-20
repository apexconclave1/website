# Apex Conclave Website

Website of **Apex Conclave**, an umbrella brand that runs multiple youth events. **Diplovia 2026**, a virtual Model United Nations, is the first event and lives at `/events/diplovia-2026`.

## Stack

- Next.js 14 (App Router), React 18, TypeScript
- Tailwind CSS 3, Framer Motion, ogl (WebGL effects), Lenis
- Supabase (Postgres + Storage) for registrations, coupons and contact messages
- Zod for validation
- Hosting: Vercel (planned)

## Getting started

Requirements: Node.js 18.17 or newer, npm.

```bash
npm install
cp .env.example .env.local   # then fill in the values
npm run dev                  # http://localhost:3000
```

### Environment variables

| Name | Where it is used |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase public key |
| `SUPABASE_SERVICE_ROLE_KEY` | Server only (API routes). Never expose it to the browser. |
| `NEXT_PUBLIC_SITE_URL` | Public site URL for metadata and sitemap |

### Database

SQL migrations are in `supabase/migrations/`. Run them in order in the Supabase SQL editor of a new project.

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Development server |
| `npm run build` | Production build (stop `npm run dev` first; both write to `.next`) |
| `npm start` | Serve the production build |
| `npm run lint` | ESLint |
| `npx tsc --noEmit` | Type-check |

## Project structure

```
src/
  app/                 Pages and API routes (App Router)
    api/register/      Registration, payment and coupon endpoints
    api/contact/       Contact form endpoint
    events/[slug]/     One page per event
  components/
    layout/            Navbar and Footer (rendered once in app/layout.tsx)
    features/registration/  Registration wizard steps
    ui/                Shared UI and WebGL effects
  lib/
    data/              Site content: events, committees, FAQs, organisation
    supabase/          Browser and server Supabase clients
    validators/        Zod schemas
  types/               Shared TypeScript types
supabase/migrations/   Database SQL
docs/                  Design sheet and Diplovia brochures (PDF)
```

## Adding an event

1. Add an entry to `eventsData` in `src/lib/data/events.ts`.
2. Add its committees (with country lists) to `src/lib/data/chambers.ts` and its FAQs to `src/lib/data/faqs.ts`, keyed by the event id.

The home page, events directory, footer and event page all read from these files.

## Design

Rules are in `.agents/DESIGN.md`, taken from `docs/Apex_Conclave_Developer_Design_Sheet.pdf`. Palette: `#080909` background, `#141718` surface, `#F4F2ED` text, `#A5A6A2` muted, `#C7A16A` small accents only. Font: Inter only.

## Project notes

- Current status and next steps: `progress.md`
- Plan: `IMPLEMENTATION_PLAN.md`
- Conventions for contributors and AI agents: `.agents/AGENTS.md`
