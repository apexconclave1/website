import Link from 'next/link';
import FuzzyText from '@/components/ui/FuzzyText';

export default function NotFound() {
  return (
    <main id="main-content" className="flex min-h-[70vh] items-center justify-center px-6 pt-24 text-center">
      <div>
        <div className="mb-6 flex justify-center text-cream">
          <FuzzyText fontSize="clamp(5rem, 18vw, 10rem)" baseIntensity={0.2} hoverIntensity={0.5} intro>
            404
          </FuzzyText>
        </div>
        <h1 className="mb-4 text-4xl font-normal text-cream md:text-5xl">Page not found</h1>
        <p className="mx-auto mb-8 max-w-[400px] text-base leading-relaxed text-cream/70">
          This page does not exist or has moved.
        </p>
        <Link
          href="/"
          className="btn-primary"
        >
          Go home
        </Link>
      </div>
    </main>
  );
}
