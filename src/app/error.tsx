'use client';

import Link from 'next/link';

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main
      style={{
        minHeight: '100vh',
        backgroundColor: '#1A1D1F',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        textAlign: 'center',
      }}
    >
      <div>
        <p
          style={{
            fontFamily: "var(--font-inter), system-ui, sans-serif",
            fontSize: '0.6875rem',
            fontWeight: 700,
            letterSpacing: '0.2em',
            color: '#C7A16A',
            textTransform: 'uppercase',
            marginBottom: '1rem',
          }}
        >
          500 · Server Error
        </p>
        <h1
          style={{
            fontFamily: "var(--font-inter), system-ui, sans-serif",
            fontWeight: 400,
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            color: '#F4F1EA',
            lineHeight: 1.15,
            letterSpacing: '-0.02em',
            marginBottom: '1rem',
          }}
        >
          Something went wrong
        </h1>
        <p
          style={{
            fontFamily: "var(--font-inter), system-ui, sans-serif",
            fontSize: '0.9375rem',
            color: '#9A9490',
            lineHeight: 1.7,
            maxWidth: '440px',
            margin: '0 auto 2rem',
          }}
        >
          An unexpected error has occurred. The DIPLOVIA team has been notified. Please try again or return home.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button
            onClick={reset}
            style={{
              fontFamily: "var(--font-inter), system-ui, sans-serif",
              fontSize: '0.875rem',
              fontWeight: 600,
              color: '#1A1D1F',
              backgroundColor: '#C7A16A',
              border: 'none',
              padding: '0.75rem 2rem',
              cursor: 'pointer',
              letterSpacing: '0.04em',
            }}
          >
            Try Again
          </button>
          <Link
            href="/"
            style={{
              fontFamily: "var(--font-inter), system-ui, sans-serif",
              fontSize: '0.875rem',
              fontWeight: 500,
              color: '#CDC7C0',
              border: '1px solid rgba(205,199,192,0.4)',
              padding: '0.75rem 2rem',
              textDecoration: 'none',
              letterSpacing: '0.04em',
              display: 'inline-block',
            }}
          >
            Return Home
          </Link>
        </div>
      </div>
    </main>
  );
}
