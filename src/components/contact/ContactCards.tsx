'use client';

import { Mail, Phone, Clock } from 'lucide-react';
import { organizationConfig } from '@/lib/data/organization';

export default function ContactCards() {
  const cardStyle: React.CSSProperties = {
    backgroundColor: 'rgba(15, 18, 24, 0.42)',
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    border: '1px solid rgba(199, 161, 106, 0.18)',
    borderRadius: '12px',
    padding: '1.75rem',
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <div style={cardStyle}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
          <Mail size={18} color="#C7A16A" strokeWidth={1.5} />
          <p
            style={{
              fontFamily: "var(--font-inter), system-ui, sans-serif",
              fontSize: '0.6875rem',
              fontWeight: 700,
              letterSpacing: '0.15em',
              color: '#C7A16A',
              textTransform: 'uppercase',
            }}
          >
            Email Secretariat
          </p>
        </div>
        <a
          href={`mailto:${organizationConfig.contactEmail}`}
          style={{
            fontFamily: "var(--font-inter), system-ui, sans-serif",
            fontSize: '1.0625rem',
            fontWeight: 400,
            color: '#F4F1EA',
            textDecoration: 'none',
            transition: 'color 150ms ease',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = '#C7A16A')}
          onMouseLeave={(e) => (e.currentTarget.style.color = '#F4F1EA')}
        >
          {organizationConfig.contactEmail}
        </a>
      </div>

      {/* 🚩 FLAG: Replace +91 XXXXX XXXXX with the official phone number before launch */}
      <div style={cardStyle}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
          <Phone size={18} color="#C7A16A" strokeWidth={1.5} />
          <p
            style={{
              fontFamily: "var(--font-inter), system-ui, sans-serif",
              fontSize: '0.6875rem',
              fontWeight: 700,
              letterSpacing: '0.15em',
              color: '#C7A16A',
              textTransform: 'uppercase',
            }}
          >
            Call Us
          </p>
        </div>
        <p
          style={{
            fontFamily: "var(--font-inter), system-ui, sans-serif",
            fontSize: '1.0625rem',
            fontWeight: 400,
            color: '#F4F1EA',
          }}
        >
          +91 XXXXX XXXXX
        </p>
        <p
          style={{
            fontFamily: "var(--font-inter), system-ui, sans-serif",
            fontSize: '0.75rem',
            color: '#CDC7C0',
            marginTop: '0.25rem',
          }}
        >
          Mon–Sat, 10am–6pm IST
        </p>
      </div>

      <div style={cardStyle}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
          <Clock size={18} color="#C7A16A" strokeWidth={1.5} />
          <p
            style={{
              fontFamily: "var(--font-inter), system-ui, sans-serif",
              fontSize: '0.6875rem',
              fontWeight: 700,
              letterSpacing: '0.15em',
              color: '#C7A16A',
              textTransform: 'uppercase',
            }}
          >
            Response Time
          </p>
        </div>
        <p
          style={{
            fontFamily: "var(--font-inter), system-ui, sans-serif",
            fontSize: '0.9375rem',
            color: '#F4F1EA',
            fontWeight: 500,
          }}
        >
          Within 48 hours
        </p>
        <p
          style={{
            fontFamily: "var(--font-inter), system-ui, sans-serif",
            fontSize: '0.75rem',
            color: '#CDC7C0',
            marginTop: '0.25rem',
          }}
        >
          The Secretariat reviews all inquiries
        </p>
      </div>
    </div>
  );
}
