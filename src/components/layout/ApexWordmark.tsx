import Link from 'next/link';

interface ApexWordmarkProps {
  size?: 'sm' | 'md';
  href?: string;
}

export default function ApexWordmark({ size = 'sm', href = '/' }: ApexWordmarkProps) {
  const text = size === 'sm' ? 'text-xl' : 'text-2xl';
  return (
    <Link
      href={href}
      aria-label="Apex Conclave home"
      className={`${text} inline-flex items-baseline gap-1.5 text-soft-white select-none`}
    >
      <span className="font-medium tracking-tight">apex</span>
      <span className="font-bold uppercase tracking-[0.12em]">Conclave</span>
    </Link>
  );
}
