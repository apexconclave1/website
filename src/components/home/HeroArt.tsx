import { verticals } from '@/lib/data/verticals';

/**
 * Hero focal piece: an original composition, drawn in SVG (no image file, no library).
 * A three-tier stage ("a bigger stage"), an angular sculpture standing on it, and a tilted orbit with one node per
 * event vertical; the active vertical's node is lime. Pieces rise in once on load (.rise-in); nothing loops.
 * Decorative: hidden from screen readers. Colours come from the brand roles, so it follows the palette.
 */
const CX = 280;
// Stage tiers, bottom to top: half-width, top edge y, 26px tall
const tiers = [
  { rx: 250, y: 430 },
  { rx: 190, y: 404 },
  { rx: 130, y: 378 },
];
const H = 26;
const ry = (rx: number) => rx * 0.27;

// Orbit: ellipse around the sculpture, tilted; nodes at fixed angles (degrees), back half drawn behind the sculpture
const ORBIT = { cy: 250, rx: 210, ry: 48, tilt: -12 };
const nodeAngles = [112, 32, 165, 215, 270, 325]; // degrees, 0 = right, 90 = front; the first is the active vertical's spot, clear of the sculpture
const nodes = verticals.map((v, i) => {
  const t = (nodeAngles[i] * Math.PI) / 180;
  return { active: v.status === 'active', x: CX + ORBIT.rx * Math.cos(t), y: ORBIT.cy + ORBIT.ry * Math.sin(t), back: Math.sin(t) < 0 };
});

const c = (role: string, a = 1) => `rgb(var(--c-${role}) / ${a})`;

export function HeroArt({ className }: { className?: string }) {
  const orbitTransform = `rotate(${ORBIT.tilt} ${CX} ${ORBIT.cy})`;
  const node = (n: (typeof nodes)[number], i: number) =>
    n.active ? (
      <circle key={i} cx={n.x} cy={n.y} r={5} fill={c('accent')} />
    ) : (
      <circle key={i} cx={n.x} cy={n.y} r={3.5} fill={c('ground')} stroke={c('soft', n.back ? 0.3 : 0.55)} strokeWidth={1} />
    );

  return (
    <svg viewBox="16 96 528 436" aria-hidden="true" focusable="false" className={className}>
      <defs>
        <linearGradient id="ha-top" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" style={{ stopColor: c('surface') }} />
          <stop offset="1" style={{ stopColor: c('ground') }} />
        </linearGradient>
        <linearGradient id="ha-side" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" style={{ stopColor: c('surface', 0.9) }} />
          <stop offset="1" style={{ stopColor: c('deep') }} />
        </linearGradient>
        <linearGradient id="ha-lit" x1="0" y1="0" x2="1" y2="0.4">
          <stop offset="0" style={{ stopColor: c('soft', 0.22) }} />
          <stop offset="1" style={{ stopColor: c('surface') }} />
        </linearGradient>
        <radialGradient id="ha-light" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" style={{ stopColor: c('soft', 0.1) }} />
          <stop offset="1" style={{ stopColor: c('soft', 0) }} />
        </radialGradient>
        <radialGradient id="ha-pool" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" style={{ stopColor: c('accent', 0.22) }} />
          <stop offset="1" style={{ stopColor: c('accent', 0) }} />
        </radialGradient>
      </defs>

      {/* Soft light behind the sculpture */}
      <circle cx={290} cy={250} r={150} fill="url(#ha-light)" className="rise-in" />

      {/* Stage */}
      {tiers.map(({ rx, y }, i) => (
        <g key={rx} className="rise-in" style={{ animationDelay: `${120 + i * 90}ms` }}>
          <path
            d={`M${CX - rx},${y} L${CX - rx},${y + H} A${rx},${ry(rx)} 0 0 0 ${CX + rx},${y + H} L${CX + rx},${y} A${rx},${ry(rx)} 0 0 1 ${CX - rx},${y} Z`}
            fill="url(#ha-side)"
            stroke={c('soft', 0.12)}
          />
          <ellipse cx={CX} cy={y} rx={rx} ry={ry(rx)} fill="url(#ha-top)" stroke={c('soft', 0.18)} />
        </g>
      ))}
      <g className="rise-in" style={{ animationDelay: '400ms' }}>
        <ellipse cx={CX} cy={378} rx={96} ry={24} fill="url(#ha-pool)" />
        {/* Lit front edge of the top tier */}
        <path d={`M${CX - 130},378 A130,${ry(130)} 0 0 0 ${CX + 130},378`} fill="none" stroke={c('accent', 0.85)} strokeWidth={1.25} />
      </g>

      {/* Orbit, back half */}
      <g transform={orbitTransform} className="rise-in" style={{ animationDelay: '520ms' }}>
        <path
          d={`M${CX + ORBIT.rx},${ORBIT.cy} A${ORBIT.rx},${ORBIT.ry} 0 0 0 ${CX - ORBIT.rx},${ORBIT.cy}`}
          fill="none"
          stroke={c('soft', 0.18)}
          strokeDasharray="2 6"
        />
        {nodes.map((n, i) => n.back && node(n, i))}
      </g>

      {/* Sculpture: a slab with a sloped, cut top, standing on the stage */}
      <g className="rise-in" style={{ animationDelay: '260ms' }}>
        <polygon points="248,180 280,167 280,392 248,380" fill="url(#ha-lit)" stroke={c('soft', 0.16)} />
        <polygon points="280,167 312,130 312,380 280,392" fill="url(#ha-side)" stroke={c('soft', 0.12)} />
        <polygon points="248,180 280,143 312,130 280,167" fill={c('soft', 0.28)} />
        <line x1={280} y1={167} x2={280} y2={392} stroke={c('accent')} strokeWidth={1.25} />
      </g>

      {/* Orbit, front half */}
      <g transform={orbitTransform} className="rise-in" style={{ animationDelay: '520ms' }}>
        <path
          d={`M${CX - ORBIT.rx},${ORBIT.cy} A${ORBIT.rx},${ORBIT.ry} 0 0 0 ${CX + ORBIT.rx},${ORBIT.cy}`}
          fill="none"
          stroke={c('soft', 0.35)}
          strokeDasharray="2 6"
        />
        {nodes.map((n, i) => !n.back && node(n, i))}
      </g>
    </svg>
  );
}
