'use client';

import { useState, useEffect } from 'react';
import { Globe, Award, CheckCircle2 } from 'lucide-react';
import { Step2FormData } from '@/lib/validators/registration';
import { fetchCountryMatrix, FALLBACK_MATRIX_DATA, CommitteeMatrixData } from '@/lib/sanity';

interface StepCommitteePickerProps {
  formData: Partial<Step2FormData>;
  onChange: (updates: Partial<Step2FormData>) => void;
  errors: Record<string, string[] | undefined>;
}

export default function StepCommitteePicker({ formData, onChange, errors }: StepCommitteePickerProps) {
  const [matrices, setMatrices] = useState<Record<string, CommitteeMatrixData>>(FALLBACK_MATRIX_DATA);

  useEffect(() => {
    let isMounted = true;
    fetchCountryMatrix().then((data) => {
      if (isMounted && data && Object.keys(data).length > 0) {
        setMatrices(data);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  const committeeKeys = Object.keys(matrices);
  const activePrimaryComm = formData.firstChoiceCommittee || (committeeKeys.length > 0 ? committeeKeys[0] : 'UNSC');
  const primaryCountries = matrices[activePrimaryComm]?.countries || [];

  const activeSecondaryComm = formData.secondChoiceCommittee || (committeeKeys.length > 1 ? committeeKeys[1] : committeeKeys[0]);
  const secondaryCountries = matrices[activeSecondaryComm]?.countries || [];

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
          Chamber & Country Allotment Preferences
        </h3>
        <p style={{ fontFamily: "var(--font-inter), system-ui, sans-serif", fontSize: '0.8125rem', color: '#9A9490' }}>
          Select your primary and contingency delegation preferences. The Secretariat reviews and provisions portfolios on a rolling basis.
        </p>
      </div>

      {/* 1st Choice (Primary) */}
      <div
        style={{
          padding: '1.5rem',
          borderRadius: '8px',
          backgroundColor: 'rgba(10, 13, 18, 0.55)',
          border: errors.firstChoiceCountry || errors.firstChoiceCommittee
            ? '1px solid #E06C75'
            : '1px solid rgba(199, 161, 106, 0.3)',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.25rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '24px',
              height: '24px',
              borderRadius: '50%',
              backgroundColor: '#C7A16A',
              color: '#1A1D1F',
              fontFamily: "var(--font-inter), system-ui, sans-serif",
              fontSize: '0.75rem',
              fontWeight: 700,
            }}
          >
            1
          </span>
          <span
            style={{
              fontFamily: "var(--font-inter), system-ui, sans-serif",
              fontSize: '0.8125rem',
              fontWeight: 700,
              letterSpacing: '0.1em',
              color: '#C7A16A',
              textTransform: 'uppercase',
            }}
          >
            Primary Preference (1st Choice) *
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
          {/* Committee Choice */}
          <div>
            <label
              htmlFor="firstChoiceCommittee"
              style={{
                display: 'block',
                fontFamily: "var(--font-inter), system-ui, sans-serif",
                fontSize: '0.75rem',
                fontWeight: 600,
                color: '#CDC7C0',
                marginBottom: '0.45rem',
              }}
            >
              Chamber / Committee *
            </label>
            <select
              id="firstChoiceCommittee"
              value={activePrimaryComm}
              onChange={(e) => {
                const comm = e.target.value;
                onChange({
                  firstChoiceCommittee: comm,
                  firstChoiceCountry: '',
                });
              }}
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                borderRadius: '6px',
                backgroundColor: '#111418',
                border: '1px solid rgba(205, 199, 192, 0.18)',
                color: '#F4F1EA',
                fontFamily: "var(--font-inter), system-ui, sans-serif",
                fontSize: '0.875rem',
                outline: 'none',
              }}
            >
              {committeeKeys.map((code) => (
                <option key={code} value={code}>
                  {code} — {matrices[code]?.name}
                </option>
              ))}
            </select>
          </div>

          {/* Country Choice */}
          <div>
            <label
              htmlFor="firstChoiceCountry"
              style={{
                display: 'block',
                fontFamily: "var(--font-inter), system-ui, sans-serif",
                fontSize: '0.75rem',
                fontWeight: 600,
                color: '#CDC7C0',
                marginBottom: '0.45rem',
              }}
            >
              Target Country / Delegation *
            </label>
            <select
              id="firstChoiceCountry"
              value={formData.firstChoiceCountry || ''}
              onChange={(e) => onChange({ firstChoiceCountry: e.target.value })}
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                borderRadius: '6px',
                backgroundColor: '#111418',
                border: errors.firstChoiceCountry ? '1px solid #E06C75' : '1px solid rgba(205, 199, 192, 0.18)',
                color: '#F4F1EA',
                fontFamily: "var(--font-inter), system-ui, sans-serif",
                fontSize: '0.875rem',
                outline: 'none',
              }}
            >
              <option value="">-- Select Country Portfolio --</option>
              {primaryCountries.map((c) => (
                <option key={c.code + c.name} value={c.name}>
                  {c.name} ({c.continent}) — [{c.status}]
                </option>
              ))}
            </select>
          </div>
        </div>

        {errors.firstChoiceCountry && (
          <p style={{ fontFamily: "var(--font-inter), system-ui, sans-serif", fontSize: '0.75rem', color: '#E06C75' }}>
            {errors.firstChoiceCountry[0]}
          </p>
        )}
      </div>

      {/* 2nd Choice (Contingency) */}
      <div
        style={{
          padding: '1.5rem',
          borderRadius: '8px',
          backgroundColor: 'rgba(10, 13, 18, 0.4)',
          border: errors.secondChoiceCountry
            ? '1px solid #E06C75'
            : '1px solid rgba(205, 199, 192, 0.15)',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.25rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '24px',
              height: '24px',
              borderRadius: '50%',
              backgroundColor: 'rgba(205, 199, 192, 0.2)',
              color: '#F4F1EA',
              fontFamily: "var(--font-inter), system-ui, sans-serif",
              fontSize: '0.75rem',
              fontWeight: 700,
            }}
          >
            2
          </span>
          <span
            style={{
              fontFamily: "var(--font-inter), system-ui, sans-serif",
              fontSize: '0.8125rem',
              fontWeight: 700,
              letterSpacing: '0.1em',
              color: '#CDC7C0',
              textTransform: 'uppercase',
            }}
          >
            Contingency Preference (2nd Choice) *
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
          {/* Committee Choice */}
          <div>
            <label
              htmlFor="secondChoiceCommittee"
              style={{
                display: 'block',
                fontFamily: "var(--font-inter), system-ui, sans-serif",
                fontSize: '0.75rem',
                fontWeight: 600,
                color: '#CDC7C0',
                marginBottom: '0.45rem',
              }}
            >
              Chamber / Committee *
            </label>
            <select
              id="secondChoiceCommittee"
              value={activeSecondaryComm}
              onChange={(e) => {
                const comm = e.target.value;
                onChange({
                  secondChoiceCommittee: comm,
                  secondChoiceCountry: '',
                });
              }}
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                borderRadius: '6px',
                backgroundColor: '#111418',
                border: '1px solid rgba(205, 199, 192, 0.18)',
                color: '#F4F1EA',
                fontFamily: "var(--font-inter), system-ui, sans-serif",
                fontSize: '0.875rem',
                outline: 'none',
              }}
            >
              {committeeKeys.map((code) => (
                <option key={code} value={code}>
                  {code} — {matrices[code]?.name}
                </option>
              ))}
            </select>
          </div>

          {/* Country Choice */}
          <div>
            <label
              htmlFor="secondChoiceCountry"
              style={{
                display: 'block',
                fontFamily: "var(--font-inter), system-ui, sans-serif",
                fontSize: '0.75rem',
                fontWeight: 600,
                color: '#CDC7C0',
                marginBottom: '0.45rem',
              }}
            >
              Target Country / Delegation *
            </label>
            <select
              id="secondChoiceCountry"
              value={formData.secondChoiceCountry || ''}
              onChange={(e) => onChange({ secondChoiceCountry: e.target.value })}
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                borderRadius: '6px',
                backgroundColor: '#111418',
                border: errors.secondChoiceCountry ? '1px solid #E06C75' : '1px solid rgba(205, 199, 192, 0.18)',
                color: '#F4F1EA',
                fontFamily: "var(--font-inter), system-ui, sans-serif",
                fontSize: '0.875rem',
                outline: 'none',
              }}
            >
              <option value="">-- Select Country Portfolio --</option>
              {secondaryCountries.map((c) => (
                <option key={c.code + c.name} value={c.name}>
                  {c.name} ({c.continent}) — [{c.status}]
                </option>
              ))}
            </select>
          </div>
        </div>

        {errors.secondChoiceCountry && (
          <p style={{ fontFamily: "var(--font-inter), system-ui, sans-serif", fontSize: '0.75rem', color: '#E06C75' }}>
            {errors.secondChoiceCountry[0]}
          </p>
        )}
      </div>
    </div>
  );
}
