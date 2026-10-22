'use client';

import { Step1FormData } from '@/lib/validators/registration';

interface StepIdentityProps {
  formData: Partial<Step1FormData>;
  onChange: (updates: Partial<Step1FormData>) => void;
  errors: Record<string, string[] | undefined>;
}

type TextKey = 'fullName' | 'email' | 'phone' | 'partnerName' | 'institutionName' | 'city' | 'country';

const TRACKS: { value: Step1FormData['track']; title: string; note: string }[] = [
  { value: 'HIGH_SCHOOL', title: 'High school', note: 'Grades 8 to 12' },
  { value: 'COLLEGIATE', title: 'College', note: 'Undergraduate students' },
];

export default function StepIdentity({ formData, onChange, errors }: StepIdentityProps) {
  const field = (key: TextKey, label: string, placeholder: string, autoComplete: string, type = 'text') => (
    <div>
      <label htmlFor={key} className="field-label">
        {label}
      </label>
      <input
        id={key}
        type={type}
        autoComplete={autoComplete}
        placeholder={placeholder}
        value={formData[key] || ''}
        onChange={(e) => onChange({ [key]: e.target.value })}
        aria-invalid={!!errors[key]}
        aria-describedby={errors[key] ? `${key}-error` : undefined}
        className="field-input"
      />
      {errors[key] && (
        <p id={`${key}-error`} className="field-error">
          {errors[key]![0]}
        </p>
      )}
    </div>
  );

  return (
    <div className="flex flex-col gap-7">
      <div>
        <h3 className="mb-1 text-xl font-medium text-bright">About you</h3>
        <p className="text-sm text-soft">Use your details as they should appear on your certificate.</p>
      </div>

      <fieldset>
        <legend className="field-label">Track *</legend>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {TRACKS.map((t) => {
            const active = formData.track === t.value;
            return (
              <button
                key={t.value}
                type="button"
                aria-pressed={active}
                onClick={() => onChange({ track: t.value })}
                className={`rounded border p-4 text-left transition-colors duration-200 ${
                  active ? 'border-bright bg-ground' : 'border-soft/25 hover:border-soft/40'
                }`}
              >
                <span className="block text-sm font-semibold text-bright">{t.title}</span>
                <span className="mt-1 block text-xs text-soft">{t.note}</span>
              </button>
            );
          })}
        </div>
        {errors.track && <p className="field-error">{errors.track[0]}</p>}
      </fieldset>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {field('fullName', 'Full name *', 'e.g. Alex Rivera', 'name')}
        {field('email', 'Email *', 'e.g. alex@example.com', 'email', 'email')}
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {field('phone', 'WhatsApp / phone *', 'e.g. +91 98765 43210', 'tel', 'tel')}
        <div>
          <label htmlFor="delegationType" className="field-label">
            Delegation *
          </label>
          <select
            id="delegationType"
            value={formData.delegationType || 'INDIVIDUAL'}
            onChange={(e) => onChange({ delegationType: e.target.value as Step1FormData['delegationType'] })}
            aria-invalid={!!errors.delegationType}
            className="field-input"
          >
            <option value="INDIVIDUAL">Individual delegate</option>
            <option value="DOUBLE_DELEGATION">Double delegation (with a partner)</option>
            <option value="DELEGATION_HEAD">Head of a school or college delegation</option>
          </select>
        </div>
      </div>

      {formData.delegationType === 'DOUBLE_DELEGATION' && field('partnerName', 'Partner’s full name *', 'e.g. Maya Chen', 'off')}

      {field('institutionName', 'School / college *', 'e.g. Modern School', 'organization')}

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {field('city', 'City *', 'e.g. New Delhi', 'address-level2')}
        {field('country', 'Country *', 'e.g. India', 'country-name')}
      </div>
    </div>
  );
}
