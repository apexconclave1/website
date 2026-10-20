import Link from 'next/link';
import Image from 'next/image';

interface ApexWordmarkProps {
  size?: 'sm' | 'md';
  href?: string;
}

// Approved logo from the design sheet (docs/). Do not redraw it in type.
export default function ApexWordmark({ size = 'sm', href = '/' }: ApexWordmarkProps) {
  const height = size === 'sm' ? 48 : 60;
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
