/**
 * Geometric artwork for event verticals: original line drawings in the brand's role colours (no images, no library).
 * Diplomacy only, since only verticals with a real event are listed; the accent marks an active vertical.
 * Decorative: hidden from screen readers (the card says what the vertical is).
 */
const line = 'rgb(var(--c-soft) / 0.3)';
const faint = 'rgb(var(--c-soft) / 0.14)';
const fill = 'rgb(var(--c-surface))';

type Draw = (hi: string) => React.ReactNode;

const rad = (d: number) => (d * Math.PI) / 180;

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
