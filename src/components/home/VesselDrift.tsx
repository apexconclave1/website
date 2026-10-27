'use client';

import { useEffect, useRef } from 'react';
import { vesselShapes, type VesselKind } from '@/components/home/vesselShapes';

/**
 * Hero background: plain sculptural vessels, drawn in SVG. Warm key light from the top left, a lime rim light on the
 * shadow side, cool blue-black shadows,
 * bases fading into darkness. Two even rows drift in opposite directions for depth: the front row (large, overlapping,
 * one baseline, cropped by the hero's bottom) left to right; the back row (smaller, dimmer, higher) right to left.
 * Vessels may cross the set's edge (overflow visible), so the row continues straight into the next copy.
 * Greys and light tints are fixed artwork colours, like a photograph, not brand roles. Each layer is one set of vessels drawn twice side by side; the track moves by
 * half its width, so the loop never shows a seam. Paused while the hero is off screen; still under reduced motion
 * (globals.css .drift-*). Includes the scrims and grain that keep text over it readable (contrast measured for the
 * home hero layout: text bottom-left, a short column bottom-right). Decorative: hidden from screen readers.
 */

// Set size (viewBox). Rendered at the layer's height, a set is wider than the screen for aspect ratios up to ~2.6:1.
const SET_W = 2400;
const SET_H = 900;

type Vessel = { kind: VesselKind; x: number; y: number; w: number };
// Height per unit of width, so heights follow widths
const ratio = { bowl: vesselShapes.bowl.h / vesselShapes.bowl.w, jar: vesselShapes.jar.h / vesselShapes.jar.w };

/** An even row: vessels share one baseline and overlap their neighbour by `overlap` of their width. */
function row(items: { kind: VesselKind; w: number }[], baseline: number, overlap: number, start = 0): Vessel[] {
  let x = start;
  return items.map(({ kind, w }) => {
    const v = { kind, w, x, y: baseline - w * ratio[kind] };
    x += w * (1 - overlap);
    return v;
  });
}
// Rows repeat exactly every SET_W: the sum of w × (1 − overlap) must equal 2400, or the loop shows a gap or a jump.
// Front: four large vessels (2667 × 0.9 = 2400), base below the bottom edge (cropped)
const front = row(
  [
    { kind: 'bowl', w: 800 },
    { kind: 'jar', w: 560 },
    { kind: 'bowl', w: 760 },
    { kind: 'jar', w: 547 },
  ],
  900,
  0.1,
  -40,
);
// Back: six smaller vessels a third of a width apart (1800 × 4/3 = 2400)
const back = row(
  Array.from({ length: 6 }, (_, i) => ({ kind: (i % 2 ? 'jar' : 'bowl') as VesselKind, w: i % 2 ? 260 : 340 })),
  760,
  -0.33,
  20,
);

function VesselSet({ vessels, id }: { vessels: Vessel[]; id: string }) {
  return (
    <svg viewBox={`0 0 ${SET_W} ${SET_H}`} aria-hidden="true" focusable="false" className="h-full w-auto shrink-0 overflow-visible" data-set={id}>
      {vessels.map((v, i) => (
        <use key={i} href={`#vd-${v.kind}`} x={v.x} y={v.y} width={v.w} height={v.w * ratio[v.kind]} />
      ))}
    </svg>
  );
}

function Track({ vessels, id, className }: { vessels: Vessel[]; id: string; className: string }) {
  return (
    <div className={`flex h-full w-max will-change-transform ${className}`}>
      <VesselSet vessels={vessels} id={id} />
      <VesselSet vessels={vessels} id={id} />
    </div>
  );
}

export function VesselDrift() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => el.classList.toggle('drift-paused', !e.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {/* Shapes and light, defined once and reused by every vessel */}
      <svg width="0" height="0" className="absolute" focusable="false">
        <defs>
          {/* Warm sand key light top left, falling through warm grey into blue-black shadow */}
          <radialGradient id="vd-body" cx="0.28" cy="0.1" r="0.9">
            <stop offset="0" stopColor="#c8bfa8" />
            <stop offset="0.14" stopColor="#7d766a" />
            <stop offset="0.34" stopColor="#3a3833" />
            <stop offset="0.6" stopColor="#17171f" />
            <stop offset="1" stopColor="#08080b" />
          </radialGradient>
          {/* Cool fill from the right, so the shadow side is not dead black */}
          <linearGradient id="vd-fill" x1="1" y1="0" x2="0.4" y2="0.3">
            <stop offset="0" stopColor="#3b4256" stopOpacity="0.55" />
            <stop offset="1" stopColor="#3b4256" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="vd-rim" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#efe7d2" />
            <stop offset="0.5" stopColor="#8f897b" />
            <stop offset="1" stopColor="#2a2a30" />
          </linearGradient>
          <linearGradient id="vd-edge" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#f3ead4" stopOpacity="0.85" />
            <stop offset="0.65" stopColor="#f3ead4" stopOpacity="0" />
          </linearGradient>
          {/* Lime rim light on the shadow side: a brand tint, like a coloured back light */}
          <linearGradient id="vd-lime" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#c7f36b" stopOpacity="0.75" />
            <stop offset="0.7" stopColor="#c7f36b" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="vd-fade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0.45" stopColor="#fff" />
            <stop offset="1" stopColor="#000" />
          </linearGradient>
          <mask id="vd-fade-mask" maskContentUnits="objectBoundingBox">
            <rect width="1" height="1" fill="url(#vd-fade)" />
          </mask>

          {(Object.keys(vesselShapes) as VesselKind[]).map((kind) => {
            const s = vesselShapes[kind];
            return (
              <symbol key={kind} id={`vd-${kind}`} viewBox={`0 0 ${s.w} ${s.h}`} overflow="visible">
                <g mask="url(#vd-fade-mask)">
                  <path d={s.body} fill="url(#vd-body)" />
                  <path d={s.body} fill="url(#vd-fill)" />
                  <path d={s.light} fill="none" stroke="url(#vd-edge)" strokeWidth="2" />
                  <path d={s.rim} fill="none" stroke="url(#vd-lime)" strokeWidth="2.5" />
                </g>
                <ellipse {...s.mouth} fill="#030304" />
                <ellipse {...s.mouth} fill="none" stroke="url(#vd-rim)" strokeWidth={kind === 'bowl' ? 5 : 4} />
              </symbol>
            );
          })}
        </defs>
      </svg>

      {/* Soft pool of light behind the rows: warm, with a trace of the brand lime */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_45%_at_55%_62%,rgb(var(--c-accent)/0.1),transparent_70%),radial-gradient(ellipse_45%_40%_at_35%_40%,rgb(200_191_168/0.08),transparent_70%)]" />
      {/* Phones: a band between the navbar and the headline. Large screens: rims above and beside the headline. */}
      <div className="absolute inset-x-0 top-[9%] h-[22%] opacity-40 lg:top-[10%] lg:h-[42%]">
        <Track vessels={back} id="back" className="drift-rtl" />
      </div>
      <div className="absolute inset-x-0 top-[12%] h-[30%] lg:top-[16%] lg:h-[80%]">
        <Track vessels={front} id="front" className="drift-ltr" />
      </div>
      {/* Scrims keep the text readable over the vessels: darker at the top (navbar) and towards the bottom (text) */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgb(var(--c-ground)/0.85)_0%,transparent_22%,transparent_38%,rgb(var(--c-ground)/0.6)_60%,rgb(var(--c-ground)/0.95)_90%)]" />
      {/* Darker pools behind the text blocks only, so the vessels stay vivid elsewhere (contrast measured against the drift) */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,transparent_34%,rgb(var(--c-ground)/0.85)_46%,rgb(var(--c-ground)/0.85)_100%)] lg:bg-[radial-gradient(ellipse_58%_46%_at_26%_66%,rgb(var(--c-ground)/0.88),rgb(var(--c-ground)/0.7)_45%,transparent_78%),radial-gradient(ellipse_30%_32%_at_84%_74%,rgb(var(--c-ground)/0.8),transparent_72%)]" />
      <div aria-hidden="true" className="hero-grain pointer-events-none absolute inset-0" />
    </div>
  );
}
