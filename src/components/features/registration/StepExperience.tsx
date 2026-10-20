'use client';

import { Award, FileText, Link2 } from 'lucide-react';
import { Step3FormData } from '@/lib/validators/registration';

interface StepExperienceProps {
  formData: Partial<Step3FormData>;
  onChange: (updates: Partial<Step3FormData>) => void;
  errors: Record<string, string[] | undefined>;
}

const experienceTiers = [
  {
    id: 'FIRST_TIME',
    label: 'First-Time Delegate',
    desc: 'Foundational diplomacy, zero or first conference experience',
  },
  {
    id: 'INTERMEDIATE_1_3',
    label: '1–3 Conferences',
    desc: 'Familiar with parliamentary procedure and resolution drafting',
  },
  {
    id: 'ADVANCED_4_7',
    label: '4–7 Conferences',
    desc: 'Seasoned debater with committee leadership track record',
  },
  {
    id: 'VETERAN_8_PLUS',
    label: '8+ Conferences / Veteran',
    desc: 'Extensive high-level crisis and general assembly experience',
  },
] as const;

export default function StepExperience({ formData, onChange, errors }: StepExperienceProps) {
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
          Diplomatic Track Record & Intent
        </h3>
        <p style={{ fontFamily: "var(--font-inter), system-ui, sans-serif", fontSize: '0.8125rem', color: '#9A9490' }}>
          Help the Executive Board evaluate your allocation tier and ensure equitable, rigorous debate in each chamber.
        </p>
      </div>

      {/* Experience Level Selection */}
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
          Conference Experience Level *
        </label>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '0.85rem' }}>
          {experienceTiers.map((tier) => {
            const isSelected = formData.experienceLevel === tier.id;
            return (
              <button
                key={tier.id}
                type="button"
                onClick={() => onChange({ experienceLevel: tier.id })}
                className="btn-tactile"
                style={{
                  padding: '1rem',
                  borderRadius: '6px',
                  border: isSelected ? '1px solid #C7A16A' : '1px solid rgba(205, 199, 192, 0.15)',
                  backgroundColor: isSelected ? 'rgba(199, 161, 106, 0.12)' : 'rgba(255, 255, 255, 0.02)',
                  textAlign: 'left',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.35rem',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontFamily: "var(--font-inter), system-ui, sans-serif", fontSize: '0.875rem', fontWeight: 600, color: '#F4F1EA' }}>
                    {tier.label}
                  </span>
                  {isSelected && (
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#C7A16A' }} />
                  )}
                </div>
                <span style={{ fontFamily: "var(--font-inter), system-ui, sans-serif", fontSize: '0.75rem', color: '#9A9490' }}>
                  {tier.desc}
                </span>
              </button>
            );
          })}
        </div>
        {errors.experienceLevel && (
          <p style={{ fontFamily: "var(--font-inter), system-ui, sans-serif", fontSize: '0.75rem', color: '#E06C75', marginTop: '0.4rem' }}>
            {errors.experienceLevel[0]}
          </p>
        )}
      </div>

      {/* Prior Awards / Commendations */}
      <div>
        <label
          htmlFor="priorAwards"
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
          <Award size={13} color="#C7A16A" /> Prior Awards & Commendations (Optional)
        </label>
        <input
          id="priorAwards"
          type="text"
          placeholder="e.g. Best Delegate (HMUN 2025), High Commendation (ILMUN)"
          value={formData.priorAwards || ''}
          onChange={(e) => onChange({ priorAwards: e.target.value })}
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

      {/* Statement of Motivation */}
      <div>
        <label
          htmlFor="motivation"
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
          <FileText size={13} color="#C7A16A" /> Statement of Intent & Policy Vision *
        </label>
        <textarea
          id="motivation"
          required
          rows={4}
          placeholder="In 2–4 sentences, explain your perspective on your preferred committee agenda and how you intend to contribute to resolution drafting."
          value={formData.motivation || ''}
          onChange={(e) => onChange({ motivation: e.target.value })}
          style={{
            width: '100%',
            padding: '0.75rem 1rem',
            borderRadius: '6px',
            backgroundColor: 'rgba(10, 13, 18, 0.65)',
            border: errors.motivation ? '1px solid #E06C75' : '1px solid rgba(205, 199, 192, 0.18)',
            color: '#F4F1EA',
            fontFamily: "var(--font-inter), system-ui, sans-serif",
            fontSize: '0.875rem',
            lineHeight: 1.6,
            outline: 'none',
            resize: 'vertical',
          }}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.35rem' }}>
          {errors.motivation ? (
            <p style={{ fontFamily: "var(--font-inter), system-ui, sans-serif", fontSize: '0.75rem', color: '#E06C75' }}>
              {errors.motivation[0]}
            </p>
          ) : (
            <span />
          )}
          <span style={{ fontFamily: "var(--font-inter), system-ui, sans-serif", fontSize: '0.6875rem', color: '#8A8480' }}>
            {(formData.motivation || '').length} / 1200 characters
          </span>
        </div>
      </div>

      {/* Writing Sample / Resolution Link */}
      <div>
        <label
          htmlFor="portfolioSampleUrl"
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
          <Link2 size={13} color="#C7A16A" /> Position Paper / Writing Sample URL (Optional)
        </label>
        <input
          id="portfolioSampleUrl"
          type="url"
          placeholder="e.g. https://drive.google.com/file/d/... or personal website"
          value={formData.portfolioSampleUrl || ''}
          onChange={(e) => onChange({ portfolioSampleUrl: e.target.value })}
          style={{
            width: '100%',
            padding: '0.75rem 1rem',
            borderRadius: '6px',
            backgroundColor: 'rgba(10, 13, 18, 0.65)',
            border: errors.portfolioSampleUrl ? '1px solid #E06C75' : '1px solid rgba(205, 199, 192, 0.18)',
            color: '#F4F1EA',
            fontFamily: "var(--font-inter), system-ui, sans-serif",
            fontSize: '0.875rem',
            outline: 'none',
          }}
        />
        {errors.portfolioSampleUrl && (
          <p style={{ fontFamily: "var(--font-inter), system-ui, sans-serif", fontSize: '0.75rem', color: '#E06C75', marginTop: '0.35rem' }}>
            {errors.portfolioSampleUrl[0]}
          </p>
        )}
      </div>
    </div>
  );
}
