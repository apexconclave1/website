# Apex Conclave — Developer Design System

> This document is the definitive design reference for the Apex Conclave website. All design tokens, rules, and prohibitions are extracted directly from the **Official Apex Conclave Developer Design Sheet**.

---

## Design Direction & Principles

- **Brand Character**: Minimal · Youthful · Intelligent · Premium · Flexible · Typography-Led · Dark-First
- **Primary Philosophy**: "The website should feel like a serious modern organization built for young people. Let typography, layout, photography and spacing create the personality."
- **Logo Rule**: Use the supplied logo file, `public/brand/apex-conclave-logo-light.png` (dark backgrounds) or `-dark.png` (light backgrounds), via `components/layout/ApexWordmark.tsx`. **Never redraw it in type.** Do not add icons, globes, crowns, 3D effects, or cinematic glows. Keep clear space around it. When an event has its own identity, Apex Conclave is secondary.

---

## Color Palette & Design Tokens

```css
:root {
  /* === PRIMARY PALETTE === */
  --bg: #080909;        /* Ink Black — Primary background */
  --surface: #141718;   /* Surface — Cards, panels, hover states */
  --text: #F4F2ED;      /* Soft White — Primary text & headings */
  --muted: #A5A6A2;     /* Muted Grey — Subtitles, captions, metadata */
  --accent: #C7A16A;    /* Warm Bronze — Small accents ONLY (badges, tiny text) */
  --teal: #21474D;      /* Deep Teal — Optional supporting accent */

  /* === SPACING & LAYOUT === */
  --radius: 10px;       /* Border radius (acceptable range: 8px–12px) */
  --container: 1240px;  /* Max container width (range: 1200px–1280px) */
  --space-base: 8px;    /* 8px spatial grid system */
}
```

### Tailwind Token Mapping

| Token | Tailwind Class | Hex |
|---|---|---|
| Background | `bg-bg` / `bg-[#080909]` | `#080909` |
| Surface | `bg-surface` / `bg-[#141718]` | `#141718` |
| Primary Text | `text-soft-white` / `text-[#F4F2ED]` | `#F4F2ED` |
| Muted Text | `text-muted-grey` / `text-[#A5A6A2]` | `#A5A6A2` |
| Accent | `text-warm-bronze` / `bg-[#C7A16A]` | `#C7A16A` |
| Supporting | `text-deep-teal` / `bg-[#21474D]` | `#21474D` |

---

## Typography

- **Font**: Inter only (loaded with `next/font`). The sheet allows Manrope, Geist or Satoshi, but the site uses one family.
- **Headlines**: Large, bold, restrained. Let size and weight carry the hierarchy.
- **Body**: 16–18px, regular weight.
- **Micro Text**: 12–14px, medium weight, tracked (letter-spacing).
- **Logo**: image file only (see Logo Rule).

---

## Spacing System

Based on an **8px grid**:

| Scale | Value | Usage |
|---|---|---|
| `space-1` | 8px | Tight gaps, inline spacing |
| `space-2` | 16px | Component padding, small gaps |
| `space-3` | 24px | Card padding, section inner spacing |
| `space-4` | 32px | Section gaps |
| `space-6` | 48px | Major section separators |
| `space-8` | 64px | Hero and feature section padding |
| `space-12` | 96px | Page-level vertical rhythm |

---

## Border & Surface Treatment

- **Card borders**: `border border-[#141718]` or `border border-[#1a1d1e]` (subtle contrast)
- **Border radius**: `10px` (range: 8px–12px)
- **Hover states**: Subtle border color shift or slight background lighten — never a shadow
- **Surfaces**: Use `#141718` for cards and panels against `#080909` background

---

## Animation Guidelines

- **Duration range**: 150ms–350ms
- **Easing**: Ease-out (`cubic-bezier(0.25, 0.46, 0.45, 0.94)`)
- **Allowed properties**: `opacity`, `transform` (scale, translateY, translateX)
- **Hover effects**: Subtle `scale(1.01)` or `translateY(-2px)` with border color shift
- **Page transitions**: Fade in with `opacity` + slight `translateY(8px → 0)`
- **Tool**: CSS transitions (Tailwind utilities); no animation library. `transition` classes use the brand curve by default
- **Height**: only through a `grid-template-rows` 0fr→1fr transition (FAQ), never by animating `height`

---

## Approved effects (owner decision, 2026-10-20)

These six components are part of the design system and are used as supplied, including their gradients, glow, shadows and blur. The prohibitions below apply to everything else.

| Component | Where it is allowed |
|---|---|
| `DarkVeil` | One fixed background for the whole site (`app/layout.tsx`) |
| `StrokeText` | Home hero headline only. Never use it to draw the logo |
| `AccordionGallery` | Event committee galleries |
| `SpecularButton` | Primary CTAs only, at most 2 or 3 per page (each is a WebGL context) |
| `ScrollStack` | Events directory list |
| `FuzzyText` | The "404" on the not-found page only (`components/ui/FuzzyText.jsx`, React Bits source as supplied, added 2026-10-20) |

## STRICT PROHIBITIONS

> [!CAUTION]
> **These rules are ABSOLUTE. Violating any of them breaks the Apex Conclave brand.**

| Rule | Description |
|---|---|
| ❌ NO Gradients | Never use `linear-gradient()` or `radial-gradient()` anywhere |
| ❌ NO Glassmorphism | No `backdrop-blur`, frosted glass panels, or translucent overlays |
| ❌ NO Heavy Shadows | No `box-shadow` for visual effect. Use borders for depth |
| ❌ NO Decorative Icons | No random vector icons, emoji, or ornamental graphics |
| ❌ NO Excessive Bronze | `#C7A16A` is for tiny badges and text highlights ONLY — not backgrounds, borders, or large elements |
| ❌ NO Heavy Parallax | No spinning, rotating, or heavy scroll-triggered animations |
| ❌ NO Icon Logos | Use the supplied logo file only. No icons, shields, or emblems |

---

## Component Design Patterns

### Cards
```
Background: #141718
Border: border border-[#1a1d1e]
Radius: 10px
Padding: 24px (space-3)
Hover: border color shifts to #2a2d2e, subtle scale(1.01) over 200ms
```

### Buttons
```
Primary: bg-[#F4F2ED] text-[#080909] font-medium px-6 py-3 rounded-[10px]
Secondary: border border-[#F4F2ED] text-[#F4F2ED] px-6 py-3 rounded-[10px]
Hover: opacity-90 or slight scale
```

### Status Badges
```
AVAILABLE: border border-[#F4F2ED] text-[#F4F2ED] text-xs px-2 py-0.5
RESERVED: bg-[#A5A6A2]/10 text-[#A5A6A2] text-xs px-2 py-0.5
ALLOCATED: bg-[#C7A16A]/10 text-[#C7A16A] text-xs px-2 py-0.5
```

### Forms
```
Use the classes in app/globals.css: .field-label, .field-input (set aria-invalid for errors), .field-error, .panel, .eyebrow
Error colour: #E06C75 (errors only)
```

### Section Headings
```
Title: text-3xl md:text-4xl font-bold text-[#F4F2ED]
Subtitle: text-base text-[#A5A6A2] mt-2
```
