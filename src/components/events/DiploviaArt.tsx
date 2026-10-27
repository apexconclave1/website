/**
 * DIPLOVIA artwork: an original emblem in SVG (no image file, no library), drawn in the DIPLOVIA roles, so it must sit
 * inside .theme-diplovia or a DIPLOVIA page. A dotted globe seen slightly from above, gold globe lines, a burgundy
 * horseshoe council table around its base with fifteen seats (the Security Council's size; the world sits at the table)
 * and a ring with one marker per committee. The table's front half is drawn again over the globe, clipped.
 * Decorative: hidden from screen readers. Points are computed once on the server.
 */
const C = 300; // centre
const R = 200; // globe radius
const TILT = (20 * Math.PI) / 180; // viewer above the equator
const SPIN = (12 * Math.PI) / 180;
const rad = (d: number) => (d * Math.PI) / 180;
const c = (role: string, a = 1) => `rgb(var(--c-${role}) / ${a})`;

/** Orthographic projection: latitude/longitude in degrees to screen x, y and depth (z > 0 faces the viewer). */
function project(latDeg: number, lonDeg: number) {
  const lat = rad(latDeg);
  const lon = rad(lonDeg) + SPIN;
  const x = R * Math.cos(lat) * Math.sin(lon);
  const y = -R * Math.sin(lat);
  const z = R * Math.cos(lat) * Math.cos(lon);
  return { x: C + x, y: C + y * Math.cos(TILT) + z * Math.sin(TILT), z: z * Math.cos(TILT) - y * Math.sin(TILT) };
}

const round = (n: number) => Math.round(n * 10) / 10;

// Dot texture: every 12 degrees, front hemisphere only, fainter towards the rim
const dots: { x: number; y: number; o: number }[] = [];
for (let lat = -72; lat <= 72; lat += 12) {
  for (let lon = 0; lon < 360; lon += 12) {
    const p = project(lat, lon);
    if (p.z > 0) dots.push({ x: round(p.x), y: round(p.y), o: round(0.16 + 0.5 * (p.z / R)) });
  }
}

/** Front half of a globe line as an SVG path (points sampled every 4 degrees) */
function frontPath(points: { x: number; y: number; z: number }[]) {
  let d = '';
  let pen = false;
  for (const p of points) {
    if (p.z > 0) {
      d += `${pen ? 'L' : 'M'}${round(p.x)},${round(p.y)} `;
      pen = true;
    } else pen = false;
  }
  return d.trim();
}
const steps = (from: number, to: number) => Array.from({ length: (to - from) / 4 + 1 }, (_, i) => from + i * 4);
const equator = frontPath(steps(-180, 180).map((lon) => project(0, lon)));
const tropic = frontPath(steps(-180, 180).map((lon) => project(30, lon)));
const meridians = [-50, 10, 70].map((lon) => frontPath(steps(-88, 88).map((lat) => project(lat, lon))));

// Council table: horseshoe (gap towards the viewer) in perspective, around the globe's base
const T = { cx: C, cy: 438, rx: 250, ry: 62, w: 30 };
const tableAt = (a: number, grow = 0) => ({ x: round(T.cx + (T.rx + grow) * Math.cos(rad(a))), y: round(T.cy + (T.ry + grow * 0.31) * Math.sin(rad(a))) });
const o1 = tableAt(118), o2 = tableAt(62), i1 = tableAt(62, -T.w), i2 = tableAt(118, -T.w);
const table = `M${o1.x},${o1.y} A${T.rx},${T.ry} 0 1 1 ${o2.x},${o2.y} L${i1.x},${i1.y} A${T.rx - T.w},${round(T.ry - T.w * 0.31)} 0 1 0 ${i2.x},${i2.y} Z`;
const seats = Array.from({ length: 15 }, (_, i) => tableAt(126 + (i * (414 - 126)) / 14, 14));

// Committee ring: five markers on a tilted orbit
const ORBIT = { rx: 262, ry: 64, tilt: -10 };
const committeeAngles = [100, 30, 160, 230, 310]; // degrees, 90 = front

export function DiploviaArt({ className }: { className?: string }) {
  const ringTransform = `rotate(${ORBIT.tilt} ${C} ${C})`;
  const marker = (a: number) => {
    const x = round(C + ORBIT.rx * Math.cos(rad(a)));
    const y = round(C + ORBIT.ry * Math.sin(rad(a)));
    return <rect key={a} x={x - 4} y={y - 4} width={8} height={8} transform={`rotate(45 ${x} ${y})`} fill={c('accent')} />;
  };

  return (
    <svg viewBox="20 64 560 456" aria-hidden="true" focusable="false" className={className}>
      <defs>
        <radialGradient id="da-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" style={{ stopColor: c('accent', 0.16) }} />
          <stop offset="1" style={{ stopColor: c('accent', 0) }} />
        </radialGradient>
        <radialGradient id="da-sphere" cx="0.38" cy="0.32" r="0.75">
          <stop offset="0" style={{ stopColor: c('surface', 0.9) }} />
          <stop offset="1" style={{ stopColor: c('deep', 0.6) }} />
        </radialGradient>
        <clipPath id="da-front">
          <rect x={0} y={T.cy} width={600} height={200} />
        </clipPath>
      </defs>

      <circle cx={C} cy={C} r={230} fill="url(#da-glow)" className="rise-in" />

      {/* Back half of the committee ring */}
      <g transform={ringTransform} className="rise-in" style={{ animationDelay: '360ms' }}>
        <path d={`M${C + ORBIT.rx},${C} A${ORBIT.rx},${ORBIT.ry} 0 0 0 ${C - ORBIT.rx},${C}`} fill="none" stroke={c('accent', 0.25)} strokeDasharray="1 6" />
        {committeeAngles.filter((a) => a > 180).map(marker)}
      </g>

      {/* Council table (whole; the globe covers its back) */}
      <g className="rise-in" style={{ animationDelay: '240ms' }}>
        <path d={table} transform="translate(0 10)" fill={c('deep')} />
        <path d={table} fill={c('wine')} stroke={c('accent', 0.6)} strokeWidth={0.8} />
        {seats.map((s, i) => (
          <circle key={i} cx={s.x} cy={s.y} r={3.2} fill={c('accent')} />
        ))}
      </g>

      <circle cx={C} cy={C} r={R} fill="url(#da-sphere)" stroke={c('accent', 0.55)} strokeWidth={1} className="rise-in" />

      <g className="rise-in" style={{ animationDelay: '120ms' }}>
        {dots.map((d, i) => (
          <circle key={i} cx={d.x} cy={d.y} r={1.5} fill={c('soft', d.o)} />
        ))}
        {meridians.map((d, i) => (
          <path key={i} d={d} fill="none" stroke={c('accent', i === 1 ? 0.7 : 0.3)} strokeWidth={i === 1 ? 1.1 : 0.8} />
        ))}
        <path d={tropic} fill="none" stroke={c('accent', 0.3)} strokeWidth={0.8} />
        <path d={equator} fill="none" stroke={c('accent', 0.75)} strokeWidth={1.1} />
      </g>

      {/* Council table, front half again, over the globe */}
      <g clipPath="url(#da-front)" className="rise-in" style={{ animationDelay: '240ms' }}>
        <path d={table} transform="translate(0 10)" fill={c('deep')} />
        <path d={table} fill={c('wine')} stroke={c('accent', 0.6)} strokeWidth={0.8} />
        {seats.map((s, i) => (
          <circle key={i} cx={s.x} cy={s.y} r={3.2} fill={c('accent')} />
        ))}
      </g>

      {/* Front half of the committee ring */}
      <g transform={ringTransform} className="rise-in" style={{ animationDelay: '360ms' }}>
        <path d={`M${C - ORBIT.rx},${C} A${ORBIT.rx},${ORBIT.ry} 0 0 0 ${C + ORBIT.rx},${C}`} fill="none" stroke={c('accent', 0.5)} strokeDasharray="1 6" />
        {committeeAngles.filter((a) => a <= 180).map(marker)}
      </g>
    </svg>
  );
}
