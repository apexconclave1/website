import { cn } from '@/lib/utils';

export type Status = 'active' | 'upcoming' | 'planned';

// One look for every status on the site, in either brand. Planned never looks like it is running.
const styles: Record<Status, { label: string; className: string; dot: string }> = {
  active: { label: 'Active', className: 'border-accent/60 text-bright', dot: 'bg-accent' },
  upcoming: { label: 'Upcoming', className: 'border-soft/40 text-bright', dot: 'border border-bright' },
  planned: { label: 'Planned', className: 'border-dashed border-soft/30 text-soft', dot: 'border border-soft/60' },
};

export function StatusLabel({ status, className }: { status: Status; className?: string }) {
  const s = styles[status];
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 rounded-sm border px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.14em]',
        s.className,
        className,
      )}
    >
      <span aria-hidden="true" className={cn('h-1.5 w-1.5 rounded-full', s.dot)} />
      {s.label}
    </span>
  );
}
