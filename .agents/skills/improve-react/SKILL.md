# Skill: Improve React

> React Server Components performance tuning, re-render triage, and optimization patterns for the Apex Conclave Next.js website.

---

## When to Activate

Use this skill when:
- Optimizing component rendering performance
- Deciding between Server and Client Components
- Debugging unnecessary re-renders
- Reducing JavaScript bundle size

---

## Server vs Client Component Decision Tree

```
Does the component need...
├── useState, useEffect, useRef, or other hooks? → "use client"
├── onClick, onChange, or other event handlers? → "use client"
├── Browser APIs (window, document, localStorage)? → "use client"
├── Framer Motion animations? → "use client"
├── Firebase onSnapshot real-time listeners? → "use client"
└── None of the above? → Keep as Server Component (default)
```

### Golden Rule
**Server Components are the default.** Only add `"use client"` when you have an explicit reason. Push client boundaries as far down the tree as possible.

---

## Optimization Patterns

### 1. Leaf Client Components
```tsx
// ❌ Bad: Entire page is a client component
"use client"
export default function EventsPage() {
  const [filter, setFilter] = useState('ALL');
  return (
    <div>
      <h1>Events</h1>  {/* This doesn't need to be client! */}
      <FilterBar value={filter} onChange={setFilter} />
      <EventGrid filter={filter} />
    </div>
  );
}

// ✅ Good: Only interactive parts are client components
// app/events/page.tsx (Server Component)
export default function EventsPage() {
  return (
    <div>
      <h1>Events</h1>
      <EventsContent />  {/* Client boundary pushed to leaf */}
    </div>
  );
}

// components/EventsContent.tsx
"use client"
export function EventsContent() {
  const [filter, setFilter] = useState('ALL');
  return (
    <>
      <FilterBar value={filter} onChange={setFilter} />
      <EventGrid filter={filter} />
    </>
  );
}
```

### 2. Memoization
```tsx
// Use React.memo for components that receive stable props but sit under a re-rendering parent
const EventCard = React.memo(function EventCard({ event }: { event: EventEntity }) {
  return <div>...</div>;
});

// Use useMemo for expensive computations
const filteredEvents = useMemo(
  () => events.filter(e => e.category === filter),
  [events, filter]
);

// Use useCallback for handlers passed to memoized children
const handleSelect = useCallback((seatId: string) => {
  setSelectedSeat(seatId);
}, []);
```

### 3. Dynamic Imports for Heavy Components
```tsx
import dynamic from 'next/dynamic';

// Lazy-load the SeatMatrix (heavy Firestore + Framer Motion component)
const SeatMatrix = dynamic(() => import('@/components/SeatMatrix'), {
  loading: () => <div className="animate-pulse bg-[#141718] h-64 rounded-[10px]" />,
  ssr: false  // No SSR for real-time Firestore component
});
```

### 4. Image Optimization
```tsx
import Image from 'next/image';

// Always use next/image for optimized loading
<Image
  src={event.coverImage}
  alt={event.title}
  width={800}
  height={450}
  className="object-cover"
  priority={isAboveFold}  // Only for hero/above-fold images
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
/>
```

---

## Re-Render Debugging Checklist

When a component re-renders unexpectedly:

1. **Check prop stability**: Are objects/arrays being recreated on every render?
2. **Check context usage**: Is the component consuming a context that changes frequently?
3. **Check parent renders**: Is a parent component re-rendering and causing cascading updates?
4. **Check Firestore listeners**: Is `onSnapshot` causing state updates that propagate too broadly?

### Firebase-Specific Pattern
```tsx
// ✅ Isolate Firestore subscriptions in a dedicated hook
function useSeatStatus(chamberId: string) {
  const [seats, setSeats] = useState<SeatPortfolioEntity[]>([]);

  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, `events/diplovia-2025/chambers/${chamberId}/seats`),
      (snapshot) => {
        setSeats(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as SeatPortfolioEntity)));
      }
    );
    return () => unsub();
  }, [chamberId]);

  return seats;
}
```

---

## Bundle Size Guidelines

- Keep `"use client"` components small — they ship JavaScript to the browser
- Use `next/dynamic` for components not needed on initial page load
- Avoid importing entire icon libraries: `import { ArrowRight } from 'lucide-react'` (tree-shakes correctly)
- Monitor bundle with `next build` — check the output for large client chunks
