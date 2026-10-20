export default function HorizonDivider({ label }: { label?: string }) {
  return (
    <div
      role="separator"
      aria-hidden="true"
      style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        margin: '4rem 0',
      }}
    >
      <div
        style={{
          width: '100%',
          height: '1px',
          backgroundColor: 'rgba(205,199,192,0.3)',
        }}
      />
      <span
        style={{
          position: 'absolute',
          padding: '0 1.25rem',
          backgroundColor: 'var(--bg-base)',
          color: '#CDC7C0',
          fontFamily: "var(--font-inter), system-ui, sans-serif",
          fontSize: '0.6875rem',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          fontWeight: 500,
        }}
      >
        {label ?? '❖'}
      </span>
    </div>
  );
}
