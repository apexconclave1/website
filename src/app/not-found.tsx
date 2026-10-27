import Link from 'next/link';

export default function NotFound() {
  return (
    <main id="main-content" className="flex min-h-[70vh] items-center justify-center px-6 pt-24 text-center">
      <div>
        <p aria-hidden="true" className="mb-6 font-display text-[clamp(5rem,18vw,10rem)] font-medium leading-none tracking-[-0.04em] text-accent">
          404
        </p>
        <h1 className="mb-4 text-4xl font-normal text-bright md:text-5xl">Page not found</h1>
        <p className="mx-auto mb-8 max-w-[400px] text-base leading-relaxed text-soft">
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
