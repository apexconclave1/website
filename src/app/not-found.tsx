import Link from 'next/link';

export default function NotFound() {
  return (
    <main id="main-content" className="flex min-h-[70vh] items-center justify-center px-6 pt-24 text-center">
      <div>
        <p className="eyebrow mb-4">404</p>
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
