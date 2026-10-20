# Skill: Improve Animations

> 150–350ms motion with CSS only for the Apex Conclave website. No animation library (framer-motion was removed); GSAP, Lenis and ogl live inside the approved effects only.

---

## When to Activate

- Adding hover, focus, step-change or reveal motion
- Reviewing motion for smoothness or reduced-motion support

---

## Rules

| Rule | Value |
|---|---|
| Duration | 150ms (buttons) to 350ms (reveals); 200ms default |
| Easing | Brand ease-out `cubic-bezier(0.25, 0.46, 0.45, 0.94)`. Tailwind's `transition` classes use it by default (`tailwind.config.ts`), so do not add `ease-*` classes |
| Allowed | `opacity`, `transform` (translate up to 12px, scale 0.98–1.02), border and text colour |
| Forbidden | Rotate, skew, blur/filter, background morphing, animating `width`/`height`/`top`/`left` |
| At rest | Nothing starts hidden. Content must be readable if CSS animations or JS never run |
| Tool | CSS transitions, `@keyframes`, scroll-driven animations. No JS animation libraries |

Exceptions: the six approved effects (`DarkVeil`, `StrokeText` 1.6s draw, `AccordionGallery` width and filter, `SpecularButton`, `ScrollStack`, `FuzzyText` canvas static on the 404) keep their own timing and properties. The FAQ answer uses a `grid-template-rows` 0fr→1fr transition, the accepted way to animate height without JS.

---

## Patterns in use

### Hover lift (cards, social links)
```tsx
className="transition duration-200 hover:-translate-y-0.5 hover:border-line-strong"
```

### Button press
```tsx
className="transition duration-150 enabled:active:scale-[0.98]"
```

### Step change (registration wizard)
Re-key the wrapper so the keyframe replays on each step:
```tsx
<div key={currentStep} className="animate-step-in">…</div>  // 200ms fade + 8px rise
```

### Section-enter rise (`SectionHeading`)
`.rise` in `globals.css`: an 8px `translateY`, tied to scroll with `animation-timeline: view()` inside `@supports`. Transform only, so headings are visible at rest; browsers without support simply show no motion.

### Expand and collapse (`FAQAccordion`)
```tsx
<div className={`grid transition-[grid-template-rows,visibility] duration-200 ${open ? 'visible grid-rows-[1fr]' : 'invisible grid-rows-[0fr]'}`}>
  <div className="overflow-hidden">…</div>
</div>
```
`invisible` keeps closed content out of the tab order and screen readers. Use a plus/minus icon swap, not a rotating chevron.

### Scroll progress bar
`.scroll-progress` uses `animation-timeline: scroll(root)` with a JS fallback in `components/ui/scroll-progress.tsx`.

---

## Reduced motion

`globals.css` has a catch-all `@media (prefers-reduced-motion: reduce)` that collapses every CSS transition and animation, and disables `.rise`. The effects handle it themselves: DarkVeil draws one still frame, ScrollStack skips Lenis smooth scroll, FuzzyText draws clean text with no fuzz or intro. Any new JS-driven motion must check `matchMedia('(prefers-reduced-motion: reduce)')`.

## Performance

- Animate only `transform` and `opacity` (compositor-only).
- No `will-change` unless a measured jank problem needs it.
- Each `SpecularButton` is a WebGL context: at most 2–3 per page.
