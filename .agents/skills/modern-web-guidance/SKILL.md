# Skill: Modern Web Guidance

> Modern CSS features, HTML5 semantics, and progressive enhancement patterns for the Apex Conclave website.

---

## When to Activate

Use this skill when:
- Writing CSS or Tailwind utility patterns
- Structuring semantic HTML for pages and components
- Implementing responsive layouts
- Using modern browser features

---

## Modern CSS Features to Use

### Container Queries
Use container queries for components that need to respond to their container size, not the viewport.
```css
.event-card-container {
  container-type: inline-size;
}

@container (min-width: 400px) {
  .event-card { /* wider layout */ }
}
```

### `:has()` Selector
Use for parent-based conditional styling:
```css
/* Style a card differently when it contains a status badge */
.seat-row:has(.badge-allocated) {
  opacity: 0.6;
}

/* Style a form group when its input is focused */
.form-group:has(input:focus) {
  border-color: #F4F2ED;
}
```

### CSS Logical Properties
Use logical properties for better internationalization readiness:
```css
/* Instead of margin-left, use: */
margin-inline-start: 1rem;

/* Instead of padding-top/bottom, use: */
padding-block: 2rem;
```

### `@layer` for Style Organization
```css
@layer base, components, utilities;

@layer base {
  body { background: #080909; color: #F4F2ED; }
}

@layer components {
  .event-card { /* ... */ }
}
```

---

## Semantic HTML Structure

### Page Layout
```html
<body>
  <header>         <!-- Navbar -->
    <nav>...</nav>
  </header>
  <main>           <!-- Page content -->
    <section>      <!-- Each major section -->
      <h2>...</h2>
      <article>    <!-- Self-contained content blocks like event cards -->
        ...
      </article>
    </section>
  </main>
  <footer>         <!-- Footer -->
    ...
  </footer>
</body>
```

### Event Card
```html
<article aria-labelledby="event-title-diplovia">
  <figure>
    <img src="..." alt="Diplovia 2025 event banner" />
  </figure>
  <span role="status">UPCOMING</span>
  <h3 id="event-title-diplovia">Diplovia 2025</h3>
  <time datetime="2025-11-15">15–17 November 2025</time>
  <p>...</p>
  <a href="/events/diplovia-2025" aria-label="View Diplovia 2025 details">View Event</a>
</article>
```

### Form (Application Modal)
```html
<form aria-labelledby="form-title" novalidate>
  <h2 id="form-title">Apply for Seat</h2>
  <div role="group" aria-labelledby="personal-info">
    <legend id="personal-info">Personal Information</legend>
    <label for="full-name">Full Name</label>
    <input id="full-name" name="fullName" type="text" required autocomplete="name" />
  </div>
</form>
```

---

## Responsive Design Patterns

### Breakpoints (Tailwind Defaults)
| Breakpoint | Width | Usage |
|---|---|---|
| `sm` | 640px | Larger phones |
| `md` | 768px | Tablets |
| `lg` | 1024px | Small laptops |
| `xl` | 1280px | Desktops (container max-width) |

### Grid Patterns
```tsx
// Event grid: 1 col → 2 col → 3 col
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

// Two-column layout with sidebar
<div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8">

// Impact numbers: 2x2 on mobile, 4 across on desktop
<div className="grid grid-cols-2 md:grid-cols-4 gap-6">
```

---

## Accessibility Essentials

- All interactive elements must be keyboard accessible
- Use `aria-label` for icon-only buttons
- Modals must trap focus and be dismissable with Escape
- Color contrast: `#F4F2ED` on `#080909` = ~16.7:1 ratio ✅
- Color contrast: `#A5A6A2` on `#080909` = ~7.5:1 ratio ✅
- Use `prefers-reduced-motion` to disable animations for users who prefer it:
  ```css
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      transition-duration: 0.01ms !important;
    }
  }
  ```
