# Apex Conclave — Skills Master Guide

> Quick index of all installed project skills in `.agents/skills/`. Each skill provides specialized guidance for AI agents working on specific aspects of the Apex Conclave website.

---

## Installed Skills

| # | Skill | Directory | Purpose |
|---|---|---|---|
| 1 | **Frontend Design** | `skills/frontend-design/` | Dark-first, typography-led UI engineering patterns |
| 2 | **Improve Animations** | `skills/improve-animations/` | 150–350ms motion curves & micro-interactions with Framer Motion |
| 3 | **Improve React** | `skills/improve-react/` | React Server Components performance tuning & re-render triage |
| 4 | **Modern Web Guidance** | `skills/modern-web-guidance/` | Modern CSS (`:has()`, container queries, `@layer`) & HTML5 semantics |
| 5 | **SEO Audit** | `skills/seo-audit/` | Event JSON-LD schema, OpenGraph, Twitter Cards, technical SEO |
| 6 | **Programmatic SEO** | `skills/programmatic-seo/` | Scalable multi-event landing page architecture & dynamic routes |
| 7 | **Sanity Best Practices** | `skills/sanity-best-practices/` | Sanity CMS schema modeling, GROQ queries (for future CMS integration) |
| 8 | **Analytics Tracking** | `skills/analytics-tracking/` | Privacy-first event telemetry & conversion tracking |

---

## How to Use Skills

Each skill directory contains a `SKILL.md` file with detailed instructions. AI agents should:

1. **Read the relevant `SKILL.md`** before working on that aspect of the project.
2. **Follow the patterns and rules** defined in each skill.
3. **Cross-reference with `DESIGN.md`** to ensure all work respects the core design system.
4. **Check `progress.md`** to understand what has been done and what's next.

---

## Skill Activation Guide

| When you're working on... | Activate skill... |
|---|---|
| Building new UI components or pages | `frontend-design` |
| Adding hover effects, transitions, page animations | `improve-animations` |
| Optimizing render performance, reducing bundle size | `improve-react` |
| Using modern CSS features, semantic HTML | `modern-web-guidance` |
| Adding meta tags, structured data, OG images | `seo-audit` |
| Creating dynamic event pages, URL structures | `programmatic-seo` |
| Integrating Sanity CMS (future) | `sanity-best-practices` |
| Adding analytics, tracking events, conversions | `analytics-tracking` |
