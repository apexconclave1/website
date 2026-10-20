import Link from 'next/link';

export default function NotFound() {
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
          404 · Not Found
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
          Page Not Found
        </h1>
        <p
          style={{
            fontFamily: "var(--font-inter), system-ui, sans-serif",
            fontSize: '0.9375rem',
            color: '#9A9490',
            lineHeight: 1.7,
            maxWidth: '400px',
            margin: '0 auto 2rem',
          }}
        >
          The page you requested does not exist. You may have followed an incorrect link or the page has been moved.
        </p>
        <Link
          href="/"
          style={{
            fontFamily: "var(--font-inter), system-ui, sans-serif",
            fontSize: '0.875rem',
            fontWeight: 600,
            color: '#1A1D1F',
            backgroundColor: '#C7A16A',
            padding: '0.75rem 2rem',
            textDecoration: 'none',
            letterSpacing: '0.04em',
            display: 'inline-block',
          }}
        >
          Return Home
        </Link>
      </div>
    </main>
  );
}
