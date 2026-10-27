import Image from 'next/image';
import Link from 'next/link';

interface ApexWordmarkProps {
  size?: 'sm' | 'md';
  href?: string;
}

// Approved logo from the design sheet (docs/), used as supplied: original colour and proportions, transparent
// background. There is no dark version, so it only sits on dark backgrounds. Never redraw, recolour or stretch it.
export default function ApexWordmark({ size = 'sm', href = '/' }: ApexWordmarkProps) {
  const height = size === 'sm' ? 44 : 60;
  return (
    <Link href={href} aria-label="Apex Conclave home" className="inline-flex shrink-0 select-none">
      <Image
        src="/brand/apex-conclave-logo-light.png"
        alt="Apex Conclave"
        width={Math.round((height * 692) / 234)}
        height={height}
        priority
      />
    </Link>
  );
}
