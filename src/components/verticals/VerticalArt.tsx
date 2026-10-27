/**
 * Geometric artwork for each event vertical: original line drawings in the brand's role colours (no images, no library).
 * Same grid, stroke weight and palette for all six; only the active vertical gets the accent colour.
 * Decorative: hidden from screen readers (the card says what the vertical is).
 */
const line = 'rgb(var(--c-soft) / 0.3)';
const faint = 'rgb(var(--c-soft) / 0.14)';
const fill = 'rgb(var(--c-surface))';

type Draw = (hi: string) => React.ReactNode;

const rad = (d: number) => (d * Math.PI) / 180;
const arc = (cx: number, cy: number, r: number, from: number, to: number) =>
  `M${cx + r * Math.cos(rad(from))},${cy + r * Math.sin(rad(from))} A${r},${r} 0 0 1 ${cx + r * Math.cos(rad(to))},${cy + r * Math.sin(rad(to))}`;

const drawings: Record<string, Draw> = {
  // A globe ringed by seats, one of them taken
  diplomacy: (hi) => (
    <>
      <circle cx={160} cy={90} r={74} fill="none" stroke={faint} strokeDasharray="2 5" />
      {Array.from({ length: 16 }, (_, i) => {
        const a = rad(i * 22.5 - 90);
        return i === 0 ? (
          <circle key={i} cx={160 + 74 * Math.cos(a)} cy={90 + 74 * Math.sin(a)} r={4} fill={hi} />
        ) : (
          <circle key={i} cx={160 + 74 * Math.cos(a)} cy={90 + 74 * Math.sin(a)} r={2.2} fill={line} />
        );
      })}
      <circle cx={160} cy={90} r={50} fill={fill} stroke={line} />
      <ellipse cx={160} cy={90} rx={20} ry={50} fill="none" stroke={line} />
      <ellipse cx={160} cy={90} rx={38} ry={50} fill="none" stroke={faint} />
      <ellipse cx={160} cy={90} rx={50} ry={10} fill="none" stroke={hi} strokeWidth={1.25} />
      <ellipse cx={160} cy={66} rx={43} ry={6} fill="none" stroke={faint} />
      <ellipse cx={160} cy={114} rx={43} ry={6} fill="none" stroke={faint} />
    </>
  ),
  // Rising bars with a trend line
  business: (hi) => {
    const heights = [30, 46, 62, 84, 106];
    const tops = heights.map((h, i) => [101 + i * 30, 150 - h] as const);
    return (
      <>
        <line x1={70} y1={150} x2={250} y2={150} stroke={faint} />
        {heights.map((h, i) => (
          <rect key={i} x={92 + i * 30} y={150 - h} width={18} height={h} fill={fill} stroke={line} />
        ))}
        <polyline points={tops.map((t) => t.join(',')).join(' ')} fill="none" stroke={hi} strokeWidth={1.25} />
        {tops.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r={i === tops.length - 1 ? 3.5 : 2} fill={i === tops.length - 1 ? hi : line} />
        ))}
      </>
    );
  },
  // A lattice of nodes with one routed path
  technology: (hi) => (
    <>
      {Array.from({ length: 24 }, (_, i) => (
        <circle key={i} cx={90 + (i % 6) * 28} cy={45 + Math.floor(i / 6) * 30} r={2} fill={line} />
      ))}
      <path d="M90,75 H174 V105 H230" fill="none" stroke={faint} />
      <path d="M90,45 H146 V105 H202 V135 H230" fill="none" stroke={hi} strokeWidth={1.25} />
      <rect x={85} y={40} width={10} height={10} fill={fill} stroke={hi} />
      <rect x={225} y={130} width={10} height={10} fill={hi} />
    </>
  ),
  // Two lecterns facing each other, arguments travelling between them
  debate: (hi) => (
    <>
      <line x1={60} y1={150} x2={260} y2={150} stroke={faint} />
      <polygon points="78,150 84,104 116,104 122,150" fill={fill} stroke={line} />
      <polygon points="198,150 204,104 236,104 242,150" fill={fill} stroke={line} />
      {[12, 22, 32].map((r, i) => (
        <path key={`l${r}`} d={arc(122, 92, r, -40, 40)} fill="none" stroke={i === 1 ? hi : line} strokeWidth={i === 1 ? 1.25 : 1} />
      ))}
      {[12, 22, 32].map((r) => (
        <path key={`r${r}`} d={arc(198, 92, r, 140, 220)} fill="none" stroke={line} />
      ))}
    </>
  ),
  // Squares growing along a rising line
  startups: (hi) => (
    <>
      <line x1={84} y1={146} x2={226} y2={46} stroke={faint} strokeDasharray="3 5" />
      <rect x={92} y={118} width={18} height={18} fill={fill} stroke={line} />
      <rect x={122} y={94} width={28} height={28} fill={fill} stroke={line} />
      <rect x={162} y={62} width={42} height={42} fill={fill} stroke={hi} strokeWidth={1.25} />
      <polyline points="212,46 226,46 226,60" fill="none" stroke={hi} strokeWidth={1.25} />
    </>
  ),
  // A tournament bracket: eight entries down to one
  esports: (hi) => {
    const ys = Array.from({ length: 8 }, (_, i) => 34 + i * 16);
    const rounds: number[][] = [ys];
    while (rounds[rounds.length - 1].length > 1) {
      const prev = rounds[rounds.length - 1];
      rounds.push(prev.filter((_, i) => i % 2 === 0).map((y, i) => (y + prev[i * 2 + 1]) / 2));
    }
    const x = (r: number) => 92 + r * 34;
    return (
      <>
        {rounds.slice(0, -1).map((col, r) =>
          col.map((y, i) => (
            // The top entry wins every round, so its path is highlighted
            <path
              key={`${r}-${i}`}
              d={`M${x(r)},${y} H${x(r) + 17} V${rounds[r + 1][Math.floor(i / 2)]} H${x(r + 1)}`}
              fill="none"
              stroke={i === 0 ? hi : line}
              strokeWidth={i === 0 ? 1.25 : 1}
            />
          )),
        )}
        {ys.map((y, i) => (
          <circle key={i} cx={x(0)} cy={y} r={2} fill={i === 0 ? hi : line} />
        ))}
        <polygon points={`${x(3) + 2},${rounds[3][0]} ${x(3) + 10},${rounds[3][0] - 8} ${x(3) + 18},${rounds[3][0]} ${x(3) + 10},${rounds[3][0] + 8}`} fill={hi} />
      </>
    );
  },
};

export function VerticalArt({ id, active, className }: { id: string; active: boolean; className?: string }) {
  const draw = drawings[id];
  if (!draw) return null;
  return (
    <svg viewBox="0 0 320 180" aria-hidden="true" focusable="false" className={className}>
      {draw(active ? 'rgb(var(--c-accent))' : 'rgb(var(--c-bright) / 0.75)')}
    </svg>
  );
}
