'use client';

import Link from 'next/link';

export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <main className="flex min-h-[70vh] items-center justify-center px-6 pt-24 text-center">
      <div>
        <p className="eyebrow mb-4">Error</p>
        <h1 className="mb-4 text-3xl font-bold text-soft-white md:text-5xl">Something went wrong</h1>
        <p className="mx-auto mb-8 max-w-[440px] text-base leading-relaxed text-muted-grey">
          Please try again. If it keeps happening, write to us from the contact page.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center rounded-[10px] bg-soft-white px-6 py-3 text-sm font-medium text-bg transition-opacity duration-200 hover:opacity-90"
          >
            Try again
          </button>
          <Link
            href="/"
            className="inline-flex items-center rounded-[10px] border border-soft-white px-6 py-3 text-sm font-medium text-soft-white transition-opacity duration-200 hover:opacity-90"
          >
            Go home
          </Link>
        </div>
      </div>
    </main>
  );
}
