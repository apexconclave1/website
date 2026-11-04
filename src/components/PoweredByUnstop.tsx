import Image from 'next/image';

// Unstop partnership (2026-11-04): the agreement asks for the Unstop logo as "Powered By" on the site. Supplied logo,
// unchanged, on a transparent background (owner).
export function PoweredByUnstop({ place, className = '' }: { place: string; className?: string }) {
  return (
    <a
      href="https://unstop.com"
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex min-h-11 items-center gap-3 text-xs uppercase tracking-[0.14em] text-soft/80 transition-colors duration-200 hover:text-bright ${className}`}
      data-track="partner_click"
      data-track-partner="unstop"
      data-track-place={place}
    >
      Powered by
      <Image src="/brand/unstop-logo.png" alt="Unstop" width={500} height={199} className="h-7 w-auto" />
    </a>
  );
}
