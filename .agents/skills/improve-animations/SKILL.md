# Skill: Improve Animations

> 150–350ms motion curves and micro-interactions using Framer Motion for the Apex Conclave website.

---

## When to Activate

Use this skill when:
- Adding hover effects, page transitions, or scroll-triggered reveals
- Reviewing animation performance and smoothness
- Implementing loading states or state transitions

---

## Core Rules

### Duration Limits
- **Minimum**: 150ms (quick micro-interactions like button hover)
- **Maximum**: 350ms (page transitions, section reveals)
- **Sweet spot**: 200ms for most interactions

### Easing Curves
```typescript
// Preferred easing for Apex Conclave
const easeOut = [0.25, 0.46, 0.45, 0.94];
const easeInOut = [0.42, 0, 0.58, 1];

// Framer Motion spring (for natural feel)
const spring = { type: "spring", stiffness: 300, damping: 30 };
```

### Allowed Animation Properties
✅ `opacity` — Fade in/out
✅ `scale` — Subtle grow/shrink (max `1.02`)
✅ `translateY` — Vertical slide (max `12px`)
✅ `translateX` — Horizontal slide (max `12px`)
✅ `borderColor` — Border highlight transitions

### Forbidden Animation Properties
❌ `rotate` — No spinning or rotating elements
❌ `skew` — No skewing or distortion
❌ `blur` / `filter` — No blur transitions
❌ `background` — No color morphing backgrounds
❌ Layout-triggering properties (`width`, `height`, `top`, `left`)

---

## Standard Patterns

### Page/Section Enter Animation
```tsx
import { motion } from 'framer-motion';

const fadeInUp = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }
};

<motion.div {...fadeInUp}>
  {/* Section content */}
</motion.div>
```

### Staggered List Animation
```tsx
const container = {
  animate: { transition: { staggerChildren: 0.06 } }
};

const item = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.25 } }
};

<motion.div variants={container} initial="initial" animate="animate">
  {items.map(i => <motion.div key={i} variants={item} />)}
</motion.div>
```

### Card Hover
```tsx
<motion.div
  whileHover={{ scale: 1.01, transition: { duration: 0.2 } }}
  className="bg-[#141718] border border-[#1a1d1e] hover:border-[#2a2d2e] transition-colors duration-200"
>
  {/* Card content */}
</motion.div>
```

### Button Hover
```tsx
<motion.button
  whileHover={{ scale: 1.02 }}
  whileTap={{ scale: 0.98 }}
  transition={{ duration: 0.15 }}
>
  Explore Events
</motion.button>
```

### Scroll-Triggered Reveal (Viewport Enter)
```tsx
<motion.div
  initial={{ opacity: 0, y: 12 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-50px" }}
  transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
>
  {/* Content revealed on scroll */}
</motion.div>
```

---

## Anti-Patterns to Avoid

| ❌ Don't | ✅ Do Instead |
|---|---|
| Spin logos or icons | Keep elements static or use subtle opacity fade |
| Parallax scroll backgrounds | Use simple fadeInUp on scroll enter |
| Bounce or elastic springs | Use tight, damped springs or ease-out curves |
| Animate on every scroll pixel | Use `whileInView` with `once: true` |
| Duration > 500ms | Keep under 350ms for all transitions |
| Scale > 1.05 on hover | Keep scale between 1.01–1.02 |

---

## Performance Notes

- Always animate `transform` and `opacity` (GPU-composited, no layout thrash).
- Use `will-change: transform` sparingly and only on elements that actually animate.
- Prefer CSS transitions for simple hover effects (faster than Framer Motion for static state changes).
- Use Framer Motion for orchestrated/staggered animations and scroll-triggered reveals.
