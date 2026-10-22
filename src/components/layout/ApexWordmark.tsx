import Link from 'next/link';

interface ApexWordmarkProps {
  size?: 'sm' | 'md';
  href?: string;
}

// Approved logo from the design sheet (docs/), drawn from public/brand/apex-conclave-logo-light.png as a mask
// so its colour follows the palette (.logo-mark in globals.css). Same shape and proportions; never redraw it in type.
export default function ApexWordmark({ size = 'sm', href = '/' }: ApexWordmarkProps) {
  const height = size === 'sm' ? 48 : 60;
  return (
    <Link href={href} aria-label="Apex Conclave home" className="inline-flex shrink-0 select-none">
      <span
        role="img"
        aria-label="Apex Conclave"
        className="logo-mark block"
        style={{ width: Math.round((height * 692) / 234), height }}
      />
    </Link>
  );
}
