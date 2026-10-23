# Apex Conclave Website

Website of **Apex Conclave**, an umbrella brand that runs multiple youth events. **Diplovia 2026**, a virtual Model United Nations, is the first event and lives at `/events/diplovia-2026`.

## Stack

- Next.js 14 (App Router), React 18, TypeScript
- Tailwind CSS 3, Vercel Analytics
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
| `SUPABASE_SERVICE_ROLE_KEY` | Server only (API routes). Never expose it to the browser. |
| `NEXT_PUBLIC_SITE_URL` | Public site URL for canonicals, sharing tags, sitemap and robots. Set it on Vercel |

### Database

SQL migrations are in `supabase/migrations/`. Run them in order in the Supabase SQL editor of a new project.

## Deploy to Vercel

1. Push the repo to GitHub (`git push -u origin main`).
2. On [vercel.com](https://vercel.com), choose **Add New → Project** and import the GitHub repo. Framework preset: **Next.js**. If the repo root is above `website/`, set **Root Directory** to `website`.
3. Under **Environment Variables**, add (Production and Preview):
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY` (keep it server-only; never prefix it with `NEXT_PUBLIC_`)
   - `NEXT_PUBLIC_SITE_URL`: always set it, to the main address (now `https://website-apc20.vercel.app`, later the bought domain). Without it the site falls back to Vercel's `VERCEL_PROJECT_PRODUCTION_URL`, which pointed to a dead `vercel.app` address on 2026-10-20.
   - `RESEND_API_KEY` (optional): emails the team about contact messages. Sign up at resend.com with the team inbox.
   - `GOOGLE_SITE_VERIFICATION` (optional): the `content` value of Google Search Console's HTML tag.
4. In the project, open **Analytics** and enable Web Analytics (free on Hobby; custom conversion events need Pro).
5. Deploy. Every push to `main` redeploys.
6. Search Console: add the site as a URL-prefix property, choose the HTML tag method, put the code in `GOOGLE_SITE_VERIFICATION`, redeploy, verify, then submit `/sitemap.xml`.
7. After buying the domain: **Settings → Domains** → add it, follow the DNS steps, then set `NEXT_PUBLIC_SITE_URL=https://your-domain` and redeploy.

Before opening registration, check `src/lib/data/events.ts` (dates, `registrationOpensAt`, `registrationOpen: true`) and `paymentConfig` in `src/lib/data/organization.ts` (real UPI id and QR).

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Development server |
| `npm run build` | Production build (stop `npm run dev` first; both write to `.next`) |
| `npm start` | Serve the production build |
| `npm run lint` | ESLint |
| `npx tsc --noEmit` | Type-check |
| `NEXT_DIST_DIR=.next-build npm run build` | Check build without disturbing a running dev server |
| `node scripts/check-events.mjs` | Check the date and early-bird fee logic |

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

Rules are in `.agents/DESIGN.md`. Colours are role tokens (`deep`, `ground`, `soft`, `bright`, `accent`) in teal, dark by default with a light mode toggle in the navbar. One background on every page; content slides in on scroll (`components/ui/ScrollReveal.tsx`). Fonts: Newsreader (headlines) and Inter.

## Project notes

- Current status and next steps: `progress.md`
- Plan: `IMPLEMENTATION_PLAN.md`
- Conventions for contributors and AI agents: `.agents/AGENTS.md`
