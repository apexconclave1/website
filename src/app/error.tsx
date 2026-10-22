'use client';

import Link from 'next/link';

export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <main id="main-content" className="flex min-h-[70vh] items-center justify-center px-6 pt-24 text-center">
      <div>
        <p className="eyebrow mb-4">Error</p>
        <h1 className="mb-4 text-4xl font-normal text-bright md:text-5xl">Something went wrong</h1>
        <p className="mx-auto mb-8 max-w-[440px] text-base leading-relaxed text-soft">
          Please try again. If it keeps happening, write to us from the contact page.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <button
            type="button"
            onClick={reset}
            className="btn-primary"
          >
            Try again
          </button>
          <Link
            href="/"
            className="btn-secondary"
          >
            Go home
          </Link>
        </div>
      </div>
    </main>
  );
}
