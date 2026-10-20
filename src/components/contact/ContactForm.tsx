'use client';

import { useState } from 'react';
import { Send, CheckCircle, AlertTriangle, Loader } from 'lucide-react';
import { contactCategories as categories, contactSchema, type ContactFields } from '@/lib/validators/contact';

type FieldErrors = Partial<Record<keyof ContactFields, string>>;

type SubmitState = 'idle' | 'submitting' | 'success' | 'error';

export default function ContactForm() {
  const [form, setForm] = useState<ContactFields>({
    name: '',
    email: '',
    phone: '',
    institution: '',
    category: 'General Inquiry',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitState, setSubmitState] = useState<SubmitState>('idle');

  const update = <K extends keyof ContactFields>(key: K, value: ContactFields[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = contactSchema.safeParse(form);
    if (!parsed.success) {
      const fieldErrors: FieldErrors = {};
      parsed.error.issues.forEach((issue) => {
        const key = issue.path[0] as keyof ContactFields;
        fieldErrors[key] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    setSubmitState('submitting');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(parsed.data),
      });
      if (!res.ok) throw new Error('Server error');
      setSubmitState('success');
      setForm({ name: '', email: '', phone: '', institution: '', category: 'General Inquiry', subject: '', message: '' });
    } catch {
      setSubmitState('error');
    }
  };

  const inputStyle = (hasError: boolean): React.CSSProperties => ({
    width: '100%',
    backgroundColor: 'rgba(15, 18, 24, 0.55)',
    backdropFilter: 'blur(8px)',
    WebkitBackdropFilter: 'blur(8px)',
    border: hasError ? '1px solid #E05A4E' : '1px solid rgba(205,199,192,0.18)',
    borderRadius: '6px',
    color: '#F4F1EA',
    fontFamily: "var(--font-inter), system-ui, sans-serif",
    fontSize: '0.9rem',
    padding: '0.75rem 0.95rem',
    outline: 'none',
    transition: 'border-color 200ms ease, box-shadow 200ms ease',
  });

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontFamily: "var(--font-inter), system-ui, sans-serif",
    fontSize: '0.6875rem',
    fontWeight: 600,
    letterSpacing: '0.12em',
    color: '#9A9490',
    textTransform: 'uppercase',
    marginBottom: '0.4rem',
  };

  const errorStyle: React.CSSProperties = {
    fontFamily: "var(--font-inter), system-ui, sans-serif",
    fontSize: '0.6875rem',
    color: '#E05A4E',
    marginTop: '0.25rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.3rem',
  };

  if (submitState === 'success') {
    return (
      <div
        role="status"
        aria-live="polite"
        style={{
          backgroundColor: 'rgba(15, 18, 24, 0.45)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          border: '1px solid rgba(76,175,122,0.4)',
          borderRadius: '12px',
          padding: '2.5rem',
          textAlign: 'center',
        }}
      >
        <CheckCircle size={36} color="#4CAF7A" strokeWidth={1.5} style={{ margin: '0 auto 1rem' }} />
        <h3
          style={{
            fontFamily: "var(--font-inter), system-ui, sans-serif",
            fontSize: '1.375rem',
            color: '#F4F1EA',
            marginBottom: '0.5rem',
          }}
        >
          Message Received
        </h3>
        <p
          style={{
            fontFamily: "var(--font-inter), system-ui, sans-serif",
            fontSize: '0.875rem',
            color: '#9A9490',
            lineHeight: 1.6,
          }}
        >
          Thank you for reaching out. The Apex Conclave team will respond to your inquiry within 48 hours.
        </p>
      </div>
    );
  }

  return (
    <div
      style={{
        backgroundColor: 'rgba(15, 18, 24, 0.42)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        border: '1px solid rgba(199, 161, 106, 0.18)',
        borderRadius: '12px',
        padding: '2rem',
      }}
    >
      <form onSubmit={handleSubmit} noValidate aria-label="Contact Apex Conclave Secretariat">
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1rem',
          marginBottom: '1rem',
        }}
      >
        {/* Name */}
        <div>
          <label htmlFor="contact-name" style={labelStyle}>Full Name *</label>
          <input
            id="contact-name"
            type="text"
            value={form.name}
            onChange={(e) => update('name', e.target.value)}
            aria-required="true"
            aria-describedby={errors.name ? 'name-error' : undefined}
            aria-invalid={!!errors.name}
            style={inputStyle(!!errors.name)}
            onFocus={(e) => (e.currentTarget.style.borderColor = '#C7A16A')}
            onBlur={(e) => (e.currentTarget.style.borderColor = errors.name ? '#E05A4E' : 'rgba(205,199,192,0.2)')}
          />
          {errors.name && <p id="name-error" role="alert" style={errorStyle}><AlertTriangle size={11} /> {errors.name}</p>}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="contact-email" style={labelStyle}>Email Address *</label>
          <input
            id="contact-email"
            type="email"
            value={form.email}
            onChange={(e) => update('email', e.target.value)}
            aria-required="true"
            aria-describedby={errors.email ? 'email-error' : undefined}
            aria-invalid={!!errors.email}
            style={inputStyle(!!errors.email)}
            onFocus={(e) => (e.currentTarget.style.borderColor = '#C7A16A')}
            onBlur={(e) => (e.currentTarget.style.borderColor = errors.email ? '#E05A4E' : 'rgba(205,199,192,0.2)')}
          />
          {errors.email && <p id="email-error" role="alert" style={errorStyle}><AlertTriangle size={11} /> {errors.email}</p>}
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="contact-phone" style={labelStyle}>Phone (Optional)</label>
          <input
            id="contact-phone"
            type="tel"
            value={form.phone}
            onChange={(e) => update('phone', e.target.value)}
            style={inputStyle(false)}
            onFocus={(e) => (e.currentTarget.style.borderColor = '#C7A16A')}
            onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(205,199,192,0.2)')}
          />
        </div>

        {/* Institution */}
        <div>
          <label htmlFor="contact-institution" style={labelStyle}>Institution (Optional)</label>
          <input
            id="contact-institution"
            type="text"
            value={form.institution}
            onChange={(e) => update('institution', e.target.value)}
            style={inputStyle(false)}
            onFocus={(e) => (e.currentTarget.style.borderColor = '#C7A16A')}
            onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(205,199,192,0.2)')}
          />
        </div>
      </div>

      {/* Category + Subject */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1rem',
          marginBottom: '1rem',
        }}
      >
        <div>
          <label htmlFor="contact-category" style={labelStyle}>Category *</label>
          <select
            id="contact-category"
            value={form.category}
            onChange={(e) => update('category', e.target.value as ContactFields['category'])}
            style={{
              ...inputStyle(false),
              cursor: 'pointer',
              appearance: 'none',
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%239A9490' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right 0.9rem center',
              paddingRight: '2.5rem',
            }}
            onFocus={(e) => (e.currentTarget.style.borderColor = '#C7A16A')}
            onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(205,199,192,0.2)')}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat} style={{ backgroundColor: '#22262A', color: '#F4F1EA' }}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="contact-subject" style={labelStyle}>Subject *</label>
          <input
            id="contact-subject"
            type="text"
            value={form.subject}
            onChange={(e) => update('subject', e.target.value)}
            aria-required="true"
            aria-describedby={errors.subject ? 'subject-error' : undefined}
            aria-invalid={!!errors.subject}
            style={inputStyle(!!errors.subject)}
            onFocus={(e) => (e.currentTarget.style.borderColor = '#C7A16A')}
            onBlur={(e) => (e.currentTarget.style.borderColor = errors.subject ? '#E05A4E' : 'rgba(205,199,192,0.2)')}
          />
          {errors.subject && <p id="subject-error" role="alert" style={errorStyle}><AlertTriangle size={11} /> {errors.subject}</p>}
        </div>
      </div>

      {/* Message */}
      <div style={{ marginBottom: '1.5rem' }}>
        <label htmlFor="contact-message" style={labelStyle}>Message *</label>
        <textarea
          id="contact-message"
          value={form.message}
          onChange={(e) => update('message', e.target.value)}
          rows={5}
          aria-required="true"
          aria-describedby={errors.message ? 'message-error' : undefined}
          aria-invalid={!!errors.message}
          style={{
            ...inputStyle(!!errors.message),
            resize: 'vertical',
            fontFamily: "var(--font-inter), system-ui, sans-serif",
          }}
          onFocus={(e) => (e.currentTarget.style.borderColor = '#C7A16A')}
          onBlur={(e) => (e.currentTarget.style.borderColor = errors.message ? '#E05A4E' : 'rgba(205,199,192,0.2)')}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.25rem' }}>
          {errors.message ? (
            <p id="message-error" role="alert" style={errorStyle}><AlertTriangle size={11} /> {errors.message}</p>
          ) : <span />}
          <span style={{ fontFamily: "var(--font-inter), system-ui, sans-serif", fontSize: '0.6875rem', color: '#6A6460' }}>
            {form.message.length}/1000
          </span>
        </div>
      </div>

      {/* Submit */}
      {submitState === 'error' && (
        <p role="alert" style={{ ...errorStyle, marginBottom: '1rem' }}>
          <AlertTriangle size={13} /> Submission failed. Please try again.
        </p>
      )}

      <button
        id="contact-submit-btn"
        type="submit"
        disabled={submitState === 'submitting'}
        aria-label="Send message to Apex Conclave team"
        style={{
          fontFamily: "var(--font-inter), system-ui, sans-serif",
          fontSize: '0.875rem',
          fontWeight: 600,
          color: '#1A1D1F',
          backgroundColor: submitState === 'submitting' ? '#9A8068' : '#C7A16A',
          border: 'none',
          padding: '0.8rem 2rem',
          cursor: submitState === 'submitting' ? 'not-allowed' : 'pointer',
          letterSpacing: '0.04em',
          transition: 'background-color 200ms ease, transform 200ms ease',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
        }}
        onMouseEnter={(e) => {
          if (submitState !== 'submitting') {
            e.currentTarget.style.backgroundColor = '#c8ae90';
            e.currentTarget.style.transform = 'translateY(-1px)';
          }
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = submitState === 'submitting' ? '#9A8068' : '#C7A16A';
          e.currentTarget.style.transform = 'translateY(0)';
        }}
      >
        {submitState === 'submitting' ? (
          <><Loader size={14} style={{ animation: 'spin 1s linear infinite' }} /> Sending…</>
        ) : (
          <><Send size={14} /> Send Message</>
        )}
      </button>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </form>
    </div>
  );
}
