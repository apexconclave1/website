import Link from 'next/link';
import FuzzyText from '@/components/ui/FuzzyText';

export default function NotFound() {
  return (
    <main id="main-content" className="flex min-h-[70vh] items-center justify-center px-6 pt-24 text-center">
      <div>
        <div className="mb-6 flex justify-center text-soft-white">
          <FuzzyText fontSize="clamp(5rem, 18vw, 10rem)" baseIntensity={0.2} hoverIntensity={0.5} intro>
            404
          </FuzzyText>
        </div>
        <h1 className="mb-4 text-3xl font-bold text-soft-white md:text-5xl">Page not found</h1>
        <p className="mx-auto mb-8 max-w-[400px] text-base leading-relaxed text-muted-grey">
          This page does not exist or has moved.
        </p>
        <Link
          href="/"
          className="inline-flex items-center rounded-[10px] bg-soft-white px-6 py-3 text-sm font-medium text-bg transition-opacity duration-200 hover:opacity-90"
        >
          Go home
        </Link>
      </div>
    </main>
  );
}
