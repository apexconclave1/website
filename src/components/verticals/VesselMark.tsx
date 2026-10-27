import { vesselShapes, type VesselKind } from '@/components/home/vesselShapes';

/**
 * Coming soon card artwork: one of the hero's vessels, still mostly in shadow (not yet revealed), caught by a lime
 * rim light and a faint warm glint, under a soft lime glow. Same 16:9 box as the vertical artwork.
 * `uid` keeps gradient ids unique when the same mark appears more than once on a page. Decorative: hidden from screen readers.
 */
const placement: Record<VesselKind, { x: number; y: number; scale: number }> = {
  bowl: { x: 34, y: 54, scale: 0.42 },
  jar: { x: 84, y: 34, scale: 0.38 },
};

export function VesselMark({ kind, uid, className }: { kind: VesselKind; uid: string; className?: string }) {
  const s = vesselShapes[kind];
  const { x, y, scale } = placement[kind];
  const id = (name: string) => `vm-${uid}-${name}`;
  return (
    <svg viewBox="0 0 320 180" aria-hidden="true" focusable="false" className={className}>
      <defs>
        <radialGradient id={id('glow')} cx="0.5" cy="0.6" r="0.5">
          <stop offset="0" stopColor="#c7f36b" stopOpacity="0.16" />
          <stop offset="1" stopColor="#c7f36b" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={id('body')} cx="0.3" cy="0.12" r="0.9">
          <stop offset="0" stopColor="#6e685c" />
          <stop offset="0.2" stopColor="#2e2c28" />
          <stop offset="0.55" stopColor="#121215" />
          <stop offset="1" stopColor="#060607" />
        </radialGradient>
        <linearGradient id={id('lime')} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#c7f36b" stopOpacity="0.9" />
          <stop offset="0.75" stopColor="#c7f36b" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={id('fade')} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0.35" stopColor="#fff" />
          <stop offset="1" stopColor="#000" />
        </linearGradient>
        <mask id={id('mask')} maskContentUnits="objectBoundingBox">
          <rect width="1" height="1" fill={`url(#${id('fade')})`} />
        </mask>
      </defs>
      <ellipse cx="160" cy="120" rx="150" ry="90" fill={`url(#${id('glow')})`} />
      {/* Hover lift on a wrapper: a CSS transform on the inner group would replace its transform attribute */}
      <g className="transition-transform duration-500 group-hover:-translate-y-1">
        <g transform={`translate(${x} ${y}) scale(${scale})`}>
          <g mask={`url(#${id('mask')})`}>
            <path d={s.body} fill={`url(#${id('body')})`} />
            <path d={s.rim} fill="none" stroke={`url(#${id('lime')})`} strokeWidth="5" />
            <path d={s.light} fill="none" stroke="#e9e1cc" strokeOpacity="0.35" strokeWidth="3" />
          </g>
          <ellipse {...s.mouth} fill="#030304" stroke="#5c574d" strokeWidth="5" />
        </g>
      </g>
    </svg>
  );
}
