'use client';

import { ShieldCheck, CheckSquare, Edit3, ArrowRight, Loader2 } from 'lucide-react';
import { RegistrationFormData } from '@/lib/validators/registration';

interface StepReviewProps {
  formData: Partial<RegistrationFormData>;
  onChange: (updates: Partial<RegistrationFormData>) => void;
  onJumpToStep: (step: number) => void;
  errors: Record<string, string[] | undefined>;
  isSubmitting: boolean;
  onSubmit: () => void;
}

export default function StepReview({
  formData,
  onChange,
  onJumpToStep,
  errors,
  isSubmitting,
  onSubmit,
}: StepReviewProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h3
          style={{
            fontFamily: "var(--font-inter), system-ui, sans-serif",
            fontSize: '1.35rem',
            color: '#F4F1EA',
            marginBottom: '0.35rem',
          }}
        >
          Review & Final Confirmation
        </h3>
        <p style={{ fontFamily: "var(--font-inter), system-ui, sans-serif", fontSize: '0.8125rem', color: '#9A9490' }}>
          Please review your delegation choices before submitting your dossier to the Secretariat.
        </p>
      </div>

      {/* Summary Audit Card */}
      <div
        style={{
          borderRadius: '8px',
          backgroundColor: 'rgba(10, 13, 18, 0.65)',
          border: '1px solid rgba(199, 161, 106, 0.25)',
          overflow: 'hidden',
        }}
      >
        {/* Section 1: Delegate Identity */}
        <div
          style={{
            padding: '1.25rem 1.5rem',
            borderBottom: '1px solid rgba(205, 199, 192, 0.1)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            flexWrap: 'wrap',
            gap: '1rem',
          }}
        >
          <div>
            <span
              style={{
                fontFamily: "var(--font-inter), system-ui, sans-serif",
                fontSize: '0.6875rem',
                fontWeight: 700,
                color: '#C7A16A',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
              }}
            >
              Delegate Identity & Track
            </span>
            <h4
              style={{
                fontFamily: "var(--font-inter), system-ui, sans-serif",
                fontSize: '1rem',
                fontWeight: 600,
                color: '#F4F1EA',
                marginTop: '0.2rem',
              }}
            >
              {formData.fullName || '—'}
            </h4>
            <p style={{ fontFamily: "var(--font-inter), system-ui, sans-serif", fontSize: '0.8125rem', color: '#CDC7C0', marginTop: '0.2rem' }}>
              {formData.email} · {formData.phone}
            </p>
            <p style={{ fontFamily: "var(--font-inter), system-ui, sans-serif", fontSize: '0.75rem', color: '#8A8480', marginTop: '0.2rem' }}>
              {formData.institutionName} · {formData.city}, {formData.country} ({formData.track === 'HIGH_SCHOOL' ? 'High School' : 'Collegiate'})
            </p>
          </div>
          <button
            type="button"
            onClick={() => onJumpToStep(1)}
            className="btn-tactile"
            style={{
              background: 'none',
              border: '1px solid rgba(205, 199, 192, 0.2)',
              borderRadius: '4px',
              padding: '0.35rem 0.75rem',
              color: '#C7A16A',
              fontFamily: "var(--font-inter), system-ui, sans-serif",
              fontSize: '0.6875rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem',
            }}
          >
            <Edit3 size={11} /> Edit
          </button>
        </div>

        {/* Section 2: Allotment Preferences */}
        <div
          style={{
            padding: '1.25rem 1.5rem',
            borderBottom: '1px solid rgba(205, 199, 192, 0.1)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            flexWrap: 'wrap',
            gap: '1rem',
          }}
        >
          <div>
            <span
              style={{
                fontFamily: "var(--font-inter), system-ui, sans-serif",
                fontSize: '0.6875rem',
                fontWeight: 700,
                color: '#C7A16A',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
              }}
            >
              Allotment Preferences
            </span>
            <div style={{ marginTop: '0.4rem', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
              <p style={{ fontFamily: "var(--font-inter), system-ui, sans-serif", fontSize: '0.875rem', color: '#F4F1EA' }}>
                <strong style={{ color: '#C7A16A' }}>1st Choice:</strong> {formData.firstChoiceCommittee} — {formData.firstChoiceCountry || 'Not selected'}
              </p>
              <p style={{ fontFamily: "var(--font-inter), system-ui, sans-serif", fontSize: '0.8125rem', color: '#CDC7C0' }}>
                <strong style={{ color: '#8A8480' }}>2nd Choice:</strong> {formData.secondChoiceCommittee} — {formData.secondChoiceCountry || 'Not selected'}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => onJumpToStep(2)}
            className="btn-tactile"
            style={{
              background: 'none',
              border: '1px solid rgba(205, 199, 192, 0.2)',
              borderRadius: '4px',
              padding: '0.35rem 0.75rem',
              color: '#C7A16A',
              fontFamily: "var(--font-inter), system-ui, sans-serif",
              fontSize: '0.6875rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem',
            }}
          >
            <Edit3 size={11} /> Edit
          </button>
        </div>

        {/* Section 3: Track Record */}
        <div
          style={{
            padding: '1.25rem 1.5rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            flexWrap: 'wrap',
            gap: '1rem',
          }}
        >
          <div style={{ maxWidth: '600px' }}>
            <span
              style={{
                fontFamily: "var(--font-inter), system-ui, sans-serif",
                fontSize: '0.6875rem',
                fontWeight: 700,
                color: '#C7A16A',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
              }}
            >
              Experience & Statement
            </span>
            <p style={{ fontFamily: "var(--font-inter), system-ui, sans-serif", fontSize: '0.8125rem', color: '#F4F1EA', marginTop: '0.3rem' }}>
              Level: {formData.experienceLevel ? formData.experienceLevel.replace(/_/g, ' ') : '—'}
            </p>
            <p style={{ fontFamily: "var(--font-inter), system-ui, sans-serif", fontSize: '0.75rem', color: '#9A9490', marginTop: '0.35rem', fontStyle: 'italic', lineHeight: 1.5 }}>
              &quot;{formData.motivation}&quot;
            </p>
          </div>
          <button
            type="button"
            onClick={() => onJumpToStep(3)}
            className="btn-tactile"
            style={{
              background: 'none',
              border: '1px solid rgba(205, 199, 192, 0.2)',
              borderRadius: '4px',
              padding: '0.35rem 0.75rem',
              color: '#C7A16A',
              fontFamily: "var(--font-inter), system-ui, sans-serif",
              fontSize: '0.6875rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem',
            }}
          >
            <Edit3 size={11} /> Edit
          </button>
        </div>
      </div>

      {/* Terms & Code of Conduct Agreements */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {/* Code of Conduct */}
        <label
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: '0.75rem',
            cursor: 'pointer',
            padding: '1rem',
            borderRadius: '6px',
            backgroundColor: 'rgba(255, 255, 255, 0.02)',
            border: errors.acceptCodeOfConduct ? '1px solid #E06C75' : '1px solid rgba(205, 199, 192, 0.12)',
          }}
        >
          <input
            type="checkbox"
            checked={Boolean(formData.acceptCodeOfConduct)}
            onChange={(e) => onChange({ acceptCodeOfConduct: e.target.checked as true })}
            style={{ marginTop: '0.2rem', accentColor: '#C7A16A' }}
          />
          <div>
            <span style={{ fontFamily: "var(--font-inter), system-ui, sans-serif", fontSize: '0.8125rem', fontWeight: 600, color: '#F4F1EA' }}>
              Acceptance of Diplomatic Norms & Code of Conduct *
            </span>
            <p style={{ fontFamily: "var(--font-inter), system-ui, sans-serif", fontSize: '0.75rem', color: '#9A9490', marginTop: '0.2rem', lineHeight: 1.5 }}>
              I agree to abide by the DIPLOVIA Rules of Procedure, parliamentary decency, anti-plagiarism standards, and zero-tolerance policy on harassment.
            </p>
          </div>
        </label>
        {errors.acceptCodeOfConduct && (
          <p style={{ fontFamily: "var(--font-inter), system-ui, sans-serif", fontSize: '0.75rem', color: '#E06C75' }}>
            {errors.acceptCodeOfConduct[0]}
          </p>
        )}

        {/* Academic Accuracy Verification */}
        <label
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: '0.75rem',
            cursor: 'pointer',
            padding: '1rem',
            borderRadius: '6px',
            backgroundColor: 'rgba(255, 255, 255, 0.02)',
            border: errors.verifyAccuracy ? '1px solid #E06C75' : '1px solid rgba(205, 199, 192, 0.12)',
          }}
        >
          <input
            type="checkbox"
            checked={Boolean(formData.verifyAccuracy)}
            onChange={(e) => onChange({ verifyAccuracy: e.target.checked as true })}
            style={{ marginTop: '0.2rem', accentColor: '#C7A16A' }}
          />
          <div>
            <span style={{ fontFamily: "var(--font-inter), system-ui, sans-serif", fontSize: '0.8125rem', fontWeight: 600, color: '#F4F1EA' }}>
              Certification of Academic Integrity & Anti-Forgery *
            </span>
            <p style={{ fontFamily: "var(--font-inter), system-ui, sans-serif", fontSize: '0.75rem', color: '#9A9490', marginTop: '0.2rem', lineHeight: 1.5 }}>
              I certify that all details regarding my educational institution, age/grade track, and past delegate experience are accurate and authentic.
            </p>
          </div>
        </label>
        {errors.verifyAccuracy && (
          <p style={{ fontFamily: "var(--font-inter), system-ui, sans-serif", fontSize: '0.75rem', color: '#E06C75' }}>
            {errors.verifyAccuracy[0]}
          </p>
        )}
      </div>

      {/* Submit Action */}
      <button
        type="button"
        disabled={isSubmitting}
        onClick={onSubmit}
        className="btn-tactile"
        style={{
          width: '100%',
          padding: '1rem',
          borderRadius: '6px',
          backgroundColor: '#C7A16A',
          color: '#1A1D1F',
          fontFamily: "var(--font-inter), system-ui, sans-serif",
          fontSize: '0.875rem',
          fontWeight: 700,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          border: 'none',
          cursor: isSubmitting ? 'not-allowed' : 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.5rem',
          boxShadow: '0 8px 24px -6px rgba(199, 161, 106, 0.4)',
        }}
      >
        {isSubmitting ? (
          <>
            <Loader2 size={16} className="animate-spin" /> Recording registration...
          </>
        ) : (
          <>
            Submit Official Application <ArrowRight size={16} />
          </>
        )}
      </button>
    </div>
  );
}
