'use client';

import { useState } from 'react';
import { CheckCircle2, Copy, Check, Calendar, ArrowRight, ShieldCheck, Clock, IndianRupee } from 'lucide-react';
import Link from 'next/link';

interface RegistrationReceiptProps {
  trackingCode: string;
  submittedAt: string;
  allotment: {
    committee: string;
    country: string;
    status: string;
    delegateName: string;
    track: string;
    institution: string;
  };
  paymentStatus?: string;
  amountPaid?: number;
  onNewRegistration: () => void;
}

export default function RegistrationReceipt({
  trackingCode,
  submittedAt,
  allotment,
  paymentStatus,
  amountPaid,
  onNewRegistration,
}: RegistrationReceiptProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(trackingCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formattedDate = new Date(submittedAt).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        gap: '2rem',
        animation: 'badge-confirm 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      }}
    >
      {/* Success Icon */}
      <div
        style={{
          width: '64px',
          height: '64px',
          borderRadius: '50%',
          backgroundColor: 'rgba(76, 175, 122, 0.15)',
          border: '1px solid rgba(76, 175, 122, 0.4)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#4CAF7A',
          boxShadow: '0 0 30px rgba(76, 175, 122, 0.25)',
        }}
      >
        <CheckCircle2 size={32} />
      </div>

      {/* Title */}
      <div>
        <span
          style={{
            fontFamily: "var(--font-inter), system-ui, sans-serif",
            fontSize: '0.6875rem',
            fontWeight: 700,
            letterSpacing: '0.2em',
            color: '#C7A16A',
            textTransform: 'uppercase',
            marginBottom: '0.5rem',
            display: 'block',
          }}
        >
          {paymentStatus === 'PAYMENT_SUBMITTED' ? 'Payment Submitted' : 'Registration Logged'}
        </span>
        <h2
          style={{
            fontFamily: "var(--font-inter), system-ui, sans-serif",
            fontSize: 'clamp(1.75rem, 3.5vw, 2.25rem)',
            color: '#F4F1EA',
            lineHeight: 1.2,
          }}
        >
          {paymentStatus === 'PAYMENT_SUBMITTED'
            ? 'Registration & Payment Recorded'
            : 'Registration Provisionally Confirmed'}
        </h2>
        <p
          style={{
            fontFamily: "var(--font-inter), system-ui, sans-serif",
            fontSize: '0.875rem',
            color: '#9A9490',
            maxWidth: '520px',
            margin: '0.65rem auto 0',
            lineHeight: 1.6,
          }}
        >
          {paymentStatus === 'PAYMENT_SUBMITTED'
            ? 'Your application and payment details have been recorded. The Secretariat will verify your payment within 24 hours and send a confirmation email.'
            : 'Your allocation preference has been recorded with the DIPLOVIA Secretariat. An email confirmation has been dispatched.'}
        </p>
      </div>

      {/* Credential Reference Box */}
      <div
        style={{
          width: '100%',
          maxWidth: '540px',
          borderRadius: '8px',
          backgroundColor: 'rgba(10, 13, 18, 0.75)',
          border: '1px solid rgba(199, 161, 106, 0.4)',
          padding: '1.75rem',
          boxShadow: '0 20px 50px -15px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.08)',
          textAlign: 'left',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.25rem',
        }}
      >
        {/* Code & Copy Banner */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingBottom: '1rem',
            borderBottom: '1px solid rgba(205, 199, 192, 0.12)',
            flexWrap: 'wrap',
            gap: '0.75rem',
          }}
        >
          <div>
            <span style={{ fontFamily: "var(--font-inter), system-ui, sans-serif", fontSize: '0.625rem', color: '#8A8480', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              Application Reference Code
            </span>
            <p style={{ fontFamily: "var(--font-inter), system-ui, sans-serif", fontSize: '1.15rem', fontWeight: 700, color: '#C7A16A', letterSpacing: '0.05em' }}>
              {trackingCode}
            </p>
          </div>
          <button
            type="button"
            onClick={handleCopy}
            className="btn-tactile"
            style={{
              padding: '0.45rem 0.85rem',
              borderRadius: '4px',
              backgroundColor: copied ? 'rgba(76, 175, 122, 0.15)' : 'rgba(255, 255, 255, 0.05)',
              border: copied ? '1px solid #4CAF7A' : '1px solid rgba(205, 199, 192, 0.2)',
              color: copied ? '#4CAF7A' : '#CDC7C0',
              fontFamily: "var(--font-inter), system-ui, sans-serif",
              fontSize: '0.75rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem',
            }}
          >
            {copied ? <Check size={13} /> : <Copy size={13} />}
            {copied ? 'Copied' : 'Copy Code'}
          </button>
        </div>

        {/* Structured Allotment Details */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
          <div>
            <span style={{ fontFamily: "var(--font-inter), system-ui, sans-serif", fontSize: '0.625rem', color: '#8A8480', textTransform: 'uppercase' }}>
              Allocated Chamber
            </span>
            <p style={{ fontFamily: "var(--font-inter), system-ui, sans-serif", fontSize: '0.875rem', fontWeight: 600, color: '#F4F1EA', marginTop: '0.15rem' }}>
              {allotment.committee}
            </p>
          </div>

          <div>
            <span style={{ fontFamily: "var(--font-inter), system-ui, sans-serif", fontSize: '0.625rem', color: '#8A8480', textTransform: 'uppercase' }}>
              Provisional Country
            </span>
            <p style={{ fontFamily: "var(--font-inter), system-ui, sans-serif", fontSize: '0.875rem', fontWeight: 600, color: '#C7A16A', marginTop: '0.15rem' }}>
              {allotment.country}
            </p>
          </div>

          <div>
            <span style={{ fontFamily: "var(--font-inter), system-ui, sans-serif", fontSize: '0.625rem', color: '#8A8480', textTransform: 'uppercase' }}>
              Delegate Name
            </span>
            <p style={{ fontFamily: "var(--font-inter), system-ui, sans-serif", fontSize: '0.8125rem', color: '#CDC7C0', marginTop: '0.15rem' }}>
              {allotment.delegateName}
            </p>
          </div>

          <div>
            <span style={{ fontFamily: "var(--font-inter), system-ui, sans-serif", fontSize: '0.625rem', color: '#8A8480', textTransform: 'uppercase' }}>
              Educational Track
            </span>
            <p style={{ fontFamily: "var(--font-inter), system-ui, sans-serif", fontSize: '0.8125rem', color: '#CDC7C0', marginTop: '0.15rem' }}>
              {allotment.track === 'HIGH_SCHOOL' ? 'High School' : 'Collegiate'}
            </p>
          </div>
        </div>

        {/* Amount Paid */}
        {amountPaid !== undefined && (
          <div
            style={{
              paddingTop: '0.75rem',
              borderTop: '1px solid rgba(205, 199, 192, 0.08)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <span style={{ fontFamily: "var(--font-inter), system-ui, sans-serif", fontSize: '0.625rem', color: '#8A8480', textTransform: 'uppercase' }}>
              Amount Paid
            </span>
            <span style={{ fontFamily: "var(--font-inter), system-ui, sans-serif", fontSize: '1rem', fontWeight: 700, color: '#C7A16A', display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
              <IndianRupee size={14} />{amountPaid}
            </span>
          </div>
        )}

        {/* Status Pill */}
        <div
          style={{
            paddingTop: '0.75rem',
            borderTop: '1px solid rgba(205, 199, 192, 0.08)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <span style={{ fontFamily: "var(--font-inter), system-ui, sans-serif", fontSize: '0.6875rem', color: '#8A8480' }}>
            Submitted: {formattedDate}
          </span>
          {paymentStatus === 'PAYMENT_SUBMITTED' ? (
            <span
              style={{
                fontFamily: "var(--font-inter), system-ui, sans-serif",
                fontSize: '0.6875rem',
                fontWeight: 700,
                color: '#FFB74D',
                backgroundColor: 'rgba(255, 183, 77, 0.12)',
                padding: '0.2rem 0.6rem',
                borderRadius: '3px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.3rem',
              }}
            >
              <Clock size={12} /> AWAITING VERIFICATION
            </span>
          ) : (
            <span
              style={{
                fontFamily: "var(--font-inter), system-ui, sans-serif",
                fontSize: '0.6875rem',
                fontWeight: 700,
                color: '#4CAF7A',
                backgroundColor: 'rgba(76, 175, 122, 0.12)',
                padding: '0.2rem 0.6rem',
                borderRadius: '3px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.3rem',
              }}
            >
              <ShieldCheck size={12} /> FIRST PREFERENCE
            </span>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
        <a
          href="https://calendar.google.com/calendar/render?action=TEMPLATE&text=DIPLOVIA+Edition+I+Conference&dates=20261120T090000Z/20261122T180000Z&details=DIPLOVIA+Inaugural+Conference+Chambers&location=New+Delhi,+India"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-tactile"
          style={{
            padding: '0.75rem 1.35rem',
            borderRadius: '6px',
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(205, 199, 192, 0.2)',
            color: '#F4F1EA',
            fontFamily: "var(--font-inter), system-ui, sans-serif",
            fontSize: '0.8125rem',
            fontWeight: 600,
            textDecoration: 'none',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.45rem',
          }}
        >
          <Calendar size={14} color="#C7A16A" /> Add to Calendar
        </a>

        <Link
          href="/committees"
          className="btn-tactile"
          style={{
            padding: '0.75rem 1.35rem',
            borderRadius: '6px',
            backgroundColor: '#C7A16A',
            color: '#1A1D1F',
            fontFamily: "var(--font-inter), system-ui, sans-serif",
            fontSize: '0.8125rem',
            fontWeight: 700,
            textDecoration: 'none',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.45rem',
          }}
        >
          Explore Committees <ArrowRight size={14} />
        </Link>
      </div>

      <button
        type="button"
        onClick={onNewRegistration}
        style={{
          background: 'none',
          border: 'none',
          color: '#8A8480',
          fontFamily: "var(--font-inter), system-ui, sans-serif",
          fontSize: '0.75rem',
          cursor: 'pointer',
          textDecoration: 'underline',
          marginTop: '0.5rem',
        }}
      >
        Submit another delegation dossier
      </button>
    </div>
  );
}
