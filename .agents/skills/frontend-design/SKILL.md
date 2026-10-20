# Skill: Frontend Design

> Dark-first, typography-led UI engineering patterns for the Apex Conclave website.

---

## When to Activate

Use this skill when:
- Building new UI components or page sections
- Reviewing existing component designs for brand compliance
- Making layout decisions (grid, spacing, container width)

---

## Core Principles

### 1. Dark-First Design
- **Background**: Always `#080909` (Ink Black) as the base canvas
- **Surface**: Use `#141718` for cards, panels, modals, and interactive surfaces
- **Contrast**: Rely on the contrast between `#080909` and `#141718` for visual hierarchy — NOT shadows or gradients

### 2. Typography-Led Hierarchy
- Headlines carry the visual weight. Make them **large** and **bold** but restrained.
- Body text at 16–18px in `#F4F2ED` (Soft White) for readability.
- Secondary/meta text at 12–14px in `#A5A6A2` (Muted Grey).
- Let font size, weight, and spacing communicate hierarchy — NOT color or decoration.

### 3. Spatial Breathing Room
- Use generous whitespace. The design should breathe.
- Sections should have at least `64px–96px` vertical padding.
- Cards should have at least `24px` internal padding.
- Don't crowd elements — let each component have its own visual space.

### 4. Surface-Based Depth
```
Layer 0 (Background):  #080909
Layer 1 (Surface):     #141718  — Cards, panels, modals
Layer 2 (Hover):       #1a1d1e  — Hovered cards, active states
Layer 3 (Border):      #2a2d2e  — Highlighted borders, focus rings
```

---

## Component Patterns

### Editorial Event Card
```tsx
<div className="bg-[#141718] border border-[#1a1d1e] rounded-[10px] p-6 hover:border-[#2a2d2e] transition-colors duration-200">
  {/* Cover image */}
  <div className="aspect-[16/9] rounded-[8px] overflow-hidden mb-4">
    <Image ... className="object-cover w-full h-full" />
  </div>
  {/* Category badge */}
  <span className="text-xs text-[#A5A6A2] tracking-wider uppercase">MUN</span>
  {/* Title */}
  <h3 className="text-xl font-bold text-[#F4F2ED] mt-2">Diplovia 2025</h3>
  {/* Meta */}
  <p className="text-sm text-[#A5A6A2] mt-1">15–17 Nov · New Delhi</p>
</div>
```

### Section Layout
```tsx
<section className="py-16 md:py-24">
  <div className="max-w-[1240px] mx-auto px-6">
    <h2 className="text-3xl md:text-4xl font-bold text-[#F4F2ED]">Section Title</h2>
    <p className="text-base text-[#A5A6A2] mt-2 max-w-2xl">Supporting text.</p>
    {/* Content grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
      ...
    </div>
  </div>
</section>
```

---

## Checklist Before Shipping a Component

- [ ] Uses only approved colors (`#080909`, `#141718`, `#F4F2ED`, `#A5A6A2`, `#C7A16A`, `#21474D`)
- [ ] No gradients, glassmorphism, or heavy shadows
- [ ] Bronze (`#C7A16A`) used only for tiny badges or text highlights
- [ ] Hover transitions are 150–350ms, eased out
- [ ] Typography creates hierarchy (not color or decoration)
- [ ] Responsive at mobile, tablet, and desktop breakpoints
- [ ] Sufficient whitespace and breathing room
