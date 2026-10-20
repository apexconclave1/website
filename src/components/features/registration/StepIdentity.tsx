'use client';

import { User, Mail, Phone, School, MapPin, Users } from 'lucide-react';
import { Step1FormData } from '@/lib/validators/registration';

interface StepIdentityProps {
  formData: Partial<Step1FormData>;
  onChange: (updates: Partial<Step1FormData>) => void;
  errors: Record<string, string[] | undefined>;
}

export default function StepIdentity({ formData, onChange, errors }: StepIdentityProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      <div>
        <h3
          style={{
            fontFamily: "var(--font-inter), system-ui, sans-serif",
            fontSize: '1.35rem',
            color: '#F4F1EA',
            marginBottom: '0.35rem',
          }}
        >
          Delegate Identity & Academic Track
        </h3>
        <p style={{ fontFamily: "var(--font-inter), system-ui, sans-serif", fontSize: '0.8125rem', color: '#9A9490' }}>
          Please provide your official delegation details as they should appear on your credentials and chamber placards.
        </p>
      </div>

      {/* Educational Track Selection */}
      <div>
        <label
          style={{
            display: 'block',
            fontFamily: "var(--font-inter), system-ui, sans-serif",
            fontSize: '0.75rem',
            fontWeight: 600,
            color: '#C7A16A',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            marginBottom: '0.65rem',
          }}
        >
          Educational Track *
        </label>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.85rem' }}>
          <button
            type="button"
            onClick={() => onChange({ track: 'HIGH_SCHOOL' })}
            className="btn-tactile"
            style={{
              padding: '1rem',
              borderRadius: '6px',
              border: formData.track === 'HIGH_SCHOOL' ? '1px solid #C7A16A' : '1px solid rgba(205, 199, 192, 0.15)',
              backgroundColor: formData.track === 'HIGH_SCHOOL' ? 'rgba(199, 161, 106, 0.12)' : 'rgba(255, 255, 255, 0.02)',
              textAlign: 'left',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.35rem',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontFamily: "var(--font-inter), system-ui, sans-serif", fontSize: '0.875rem', fontWeight: 600, color: '#F4F1EA' }}>
                High School Track
              </span>
              {formData.track === 'HIGH_SCHOOL' && (
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#C7A16A' }} />
              )}
            </div>
            <span style={{ fontFamily: "var(--font-inter), system-ui, sans-serif", fontSize: '0.75rem', color: '#9A9490' }}>
              Grades 8 through 12
            </span>
          </button>

          <button
            type="button"
            onClick={() => onChange({ track: 'COLLEGIATE' })}
            className="btn-tactile"
            style={{
              padding: '1rem',
              borderRadius: '6px',
              border: formData.track === 'COLLEGIATE' ? '1px solid #C7A16A' : '1px solid rgba(205, 199, 192, 0.15)',
              backgroundColor: formData.track === 'COLLEGIATE' ? 'rgba(199, 161, 106, 0.12)' : 'rgba(255, 255, 255, 0.02)',
              textAlign: 'left',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.35rem',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontFamily: "var(--font-inter), system-ui, sans-serif", fontSize: '0.875rem', fontWeight: 600, color: '#F4F1EA' }}>
                Collegiate Track
              </span>
              {formData.track === 'COLLEGIATE' && (
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#C7A16A' }} />
              )}
            </div>
            <span style={{ fontFamily: "var(--font-inter), system-ui, sans-serif", fontSize: '0.75rem', color: '#9A9490' }}>
              Undergraduate University Students
            </span>
          </button>
        </div>
        {errors.track && (
          <p style={{ fontFamily: "var(--font-inter), system-ui, sans-serif", fontSize: '0.75rem', color: '#E06C75', marginTop: '0.4rem' }}>
            {errors.track[0]}
          </p>
        )}
      </div>

      {/* Full Name & Email */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
        <div>
          <label
            htmlFor="fullName"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              fontFamily: "var(--font-inter), system-ui, sans-serif",
              fontSize: '0.75rem',
              fontWeight: 600,
              color: '#CDC7C0',
              marginBottom: '0.45rem',
            }}
          >
            <User size={13} color="#C7A16A" /> Full Legal Name *
          </label>
          <input
            id="fullName"
            type="text"
            required
            placeholder="e.g. Alex Rivera"
            value={formData.fullName || ''}
            onChange={(e) => onChange({ fullName: e.target.value })}
            style={{
              width: '100%',
              padding: '0.75rem 1rem',
              borderRadius: '6px',
              backgroundColor: 'rgba(10, 13, 18, 0.65)',
              border: errors.fullName ? '1px solid #E06C75' : '1px solid rgba(205, 199, 192, 0.18)',
              color: '#F4F1EA',
              fontFamily: "var(--font-inter), system-ui, sans-serif",
              fontSize: '0.875rem',
              outline: 'none',
            }}
          />
          {errors.fullName && (
            <p style={{ fontFamily: "var(--font-inter), system-ui, sans-serif", fontSize: '0.75rem', color: '#E06C75', marginTop: '0.35rem' }}>
              {errors.fullName[0]}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="email"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              fontFamily: "var(--font-inter), system-ui, sans-serif",
              fontSize: '0.75rem',
              fontWeight: 600,
              color: '#CDC7C0',
              marginBottom: '0.45rem',
            }}
          >
            <Mail size={13} color="#C7A16A" /> Email Address *
          </label>
          <input
            id="email"
            type="email"
            required
            placeholder="e.g. alex.rivera@institution.edu"
            value={formData.email || ''}
            onChange={(e) => onChange({ email: e.target.value })}
            style={{
              width: '100%',
              padding: '0.75rem 1rem',
              borderRadius: '6px',
              backgroundColor: 'rgba(10, 13, 18, 0.65)',
              border: errors.email ? '1px solid #E06C75' : '1px solid rgba(205, 199, 192, 0.18)',
              color: '#F4F1EA',
              fontFamily: "var(--font-inter), system-ui, sans-serif",
              fontSize: '0.875rem',
              outline: 'none',
            }}
          />
          {errors.email && (
            <p style={{ fontFamily: "var(--font-inter), system-ui, sans-serif", fontSize: '0.75rem', color: '#E06C75', marginTop: '0.35rem' }}>
              {errors.email[0]}
            </p>
          )}
        </div>
      </div>

      {/* Phone & Delegation Structure */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
        <div>
          <label
            htmlFor="phone"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              fontFamily: "var(--font-inter), system-ui, sans-serif",
              fontSize: '0.75rem',
              fontWeight: 600,
              color: '#CDC7C0',
              marginBottom: '0.45rem',
            }}
          >
            <Phone size={13} color="#C7A16A" /> WhatsApp / Contact Phone *
          </label>
          <input
            id="phone"
            type="tel"
            required
            placeholder="e.g. +91 98765 43210"
            value={formData.phone || ''}
            onChange={(e) => onChange({ phone: e.target.value })}
            style={{
              width: '100%',
              padding: '0.75rem 1rem',
              borderRadius: '6px',
              backgroundColor: 'rgba(10, 13, 18, 0.65)',
              border: errors.phone ? '1px solid #E06C75' : '1px solid rgba(205, 199, 192, 0.18)',
              color: '#F4F1EA',
              fontFamily: "var(--font-inter), system-ui, sans-serif",
              fontSize: '0.875rem',
              outline: 'none',
            }}
          />
          {errors.phone && (
            <p style={{ fontFamily: "var(--font-inter), system-ui, sans-serif", fontSize: '0.75rem', color: '#E06C75', marginTop: '0.35rem' }}>
              {errors.phone[0]}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="delegationType"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              fontFamily: "var(--font-inter), system-ui, sans-serif",
              fontSize: '0.75rem',
              fontWeight: 600,
              color: '#CDC7C0',
              marginBottom: '0.45rem',
            }}
          >
            <Users size={13} color="#C7A16A" /> Delegation Structure *
          </label>
          <select
            id="delegationType"
            value={formData.delegationType || 'INDIVIDUAL'}
            onChange={(e) => onChange({ delegationType: e.target.value as Step1FormData['delegationType'] })}
            style={{
              width: '100%',
              padding: '0.75rem 1rem',
              borderRadius: '6px',
              backgroundColor: '#111418',
              border: errors.delegationType ? '1px solid #E06C75' : '1px solid rgba(205, 199, 192, 0.18)',
              color: '#F4F1EA',
              fontFamily: "var(--font-inter), system-ui, sans-serif",
              fontSize: '0.875rem',
              outline: 'none',
            }}
          >
            <option value="INDIVIDUAL">Individual Delegate</option>
            <option value="DOUBLE_DELEGATION">Double Delegation (Partner Allotment)</option>
            <option value="DELEGATION_HEAD">Head of School / University Delegation</option>
          </select>
        </div>
      </div>

      {/* Partner Name if Double Delegation */}
      {formData.delegationType === 'DOUBLE_DELEGATION' && (
        <div>
          <label
            htmlFor="partnerName"
            style={{
              display: 'block',
              fontFamily: "var(--font-inter), system-ui, sans-serif",
              fontSize: '0.75rem',
              fontWeight: 600,
              color: '#CDC7C0',
              marginBottom: '0.45rem',
            }}
          >
            Co-Delegate / Partner Full Legal Name *
          </label>
          <input
            id="partnerName"
            type="text"
            placeholder="e.g. Maya Chen"
            value={formData.partnerName || ''}
            onChange={(e) => onChange({ partnerName: e.target.value })}
            style={{
              width: '100%',
              padding: '0.75rem 1rem',
              borderRadius: '6px',
              backgroundColor: 'rgba(10, 13, 18, 0.65)',
              border: '1px solid rgba(205, 199, 192, 0.18)',
              color: '#F4F1EA',
              fontFamily: "var(--font-inter), system-ui, sans-serif",
              fontSize: '0.875rem',
              outline: 'none',
            }}
          />
        </div>
      )}

      {/* Institution Name */}
      <div>
        <label
          htmlFor="institutionName"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            fontFamily: "var(--font-inter), system-ui, sans-serif",
            fontSize: '0.75rem',
            fontWeight: 600,
            color: '#CDC7C0',
            marginBottom: '0.45rem',
          }}
        >
          <School size={13} color="#C7A16A" /> School / College / University Name *
        </label>
        <input
          id="institutionName"
          type="text"
          required
          placeholder="e.g. Modern School / St. Stephen's College"
          value={formData.institutionName || ''}
          onChange={(e) => onChange({ institutionName: e.target.value })}
          style={{
            width: '100%',
            padding: '0.75rem 1rem',
            borderRadius: '6px',
            backgroundColor: 'rgba(10, 13, 18, 0.65)',
            border: errors.institutionName ? '1px solid #E06C75' : '1px solid rgba(205, 199, 192, 0.18)',
            color: '#F4F1EA',
            fontFamily: "var(--font-inter), system-ui, sans-serif",
            fontSize: '0.875rem',
            outline: 'none',
          }}
        />
        {errors.institutionName && (
          <p style={{ fontFamily: "var(--font-inter), system-ui, sans-serif", fontSize: '0.75rem', color: '#E06C75', marginTop: '0.35rem' }}>
            {errors.institutionName[0]}
          </p>
        )}
      </div>

      {/* City & Country */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
        <div>
          <label
            htmlFor="city"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              fontFamily: "var(--font-inter), system-ui, sans-serif",
              fontSize: '0.75rem',
              fontWeight: 600,
              color: '#CDC7C0',
              marginBottom: '0.45rem',
            }}
          >
            <MapPin size={13} color="#C7A16A" /> City of Residence *
          </label>
          <input
            id="city"
            type="text"
            required
            placeholder="e.g. New Delhi"
            value={formData.city || ''}
            onChange={(e) => onChange({ city: e.target.value })}
            style={{
              width: '100%',
              padding: '0.75rem 1rem',
              borderRadius: '6px',
              backgroundColor: 'rgba(10, 13, 18, 0.65)',
              border: errors.city ? '1px solid #E06C75' : '1px solid rgba(205, 199, 192, 0.18)',
              color: '#F4F1EA',
              fontFamily: "var(--font-inter), system-ui, sans-serif",
              fontSize: '0.875rem',
              outline: 'none',
            }}
          />
          {errors.city && (
            <p style={{ fontFamily: "var(--font-inter), system-ui, sans-serif", fontSize: '0.75rem', color: '#E06C75', marginTop: '0.35rem' }}>
              {errors.city[0]}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="country"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              fontFamily: "var(--font-inter), system-ui, sans-serif",
              fontSize: '0.75rem',
              fontWeight: 600,
              color: '#CDC7C0',
              marginBottom: '0.45rem',
            }}
          >
            <MapPin size={13} color="#C7A16A" /> Country of Residence *
          </label>
          <input
            id="country"
            type="text"
            required
            placeholder="e.g. India"
            value={formData.country || ''}
            onChange={(e) => onChange({ country: e.target.value })}
            style={{
              width: '100%',
              padding: '0.75rem 1rem',
              borderRadius: '6px',
              backgroundColor: 'rgba(10, 13, 18, 0.65)',
              border: errors.country ? '1px solid #E06C75' : '1px solid rgba(205, 199, 192, 0.18)',
              color: '#F4F1EA',
              fontFamily: "var(--font-inter), system-ui, sans-serif",
              fontSize: '0.875rem',
              outline: 'none',
            }}
          />
          {errors.country && (
            <p style={{ fontFamily: "var(--font-inter), system-ui, sans-serif", fontSize: '0.75rem', color: '#E06C75', marginTop: '0.35rem' }}>
              {errors.country[0]}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
