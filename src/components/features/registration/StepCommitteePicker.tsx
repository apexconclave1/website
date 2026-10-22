'use client';

import { Step2FormData } from '@/lib/validators/registration';
import { ChamberEntity } from '@/types/schema';

interface StepCommitteePickerProps {
  chambers: ChamberEntity[];
  formData: Partial<Step2FormData>;
  onChange: (updates: Partial<Step2FormData>) => void;
  errors: Record<string, string[] | undefined>;
}

export default function StepCommitteePicker({ chambers, formData, onChange, errors }: StepCommitteePickerProps) {
  const byCode = (code?: string) => chambers.find((c) => c.code === code);

  const choices = [
    {
      n: 1,
      title: 'First choice *',
      committeeKey: 'firstChoiceCommittee',
      countryKey: 'firstChoiceCountry',
      committee: formData.firstChoiceCommittee || chambers[0]?.code,
    },
    {
      n: 2,
      title: 'Second choice *',
      committeeKey: 'secondChoiceCommittee',
      countryKey: 'secondChoiceCountry',
      committee: formData.secondChoiceCommittee || (chambers[1] ?? chambers[0])?.code,
    },
  ] as const;

  return (
    <div className="flex flex-col gap-7">
      <div>
        <h3 className="mb-1 text-xl font-semibold text-cream">Committee and country</h3>
        <p className="text-sm text-cream/70">
          List two preferences. The team assigns every delegate a seat and confirms it after payment is verified.
        </p>
      </div>

      {choices.map((c) => {
        const countries = byCode(c.committee)?.portfolios ?? [];
        const err = errors[c.countryKey] ?? errors[c.committeeKey];
        return (
          <fieldset key={c.n} className={`panel ${err ? 'border-[#E06C75]' : ''}`}>
            <legend className="sr-only">{c.title}</legend>
            <p className="eyebrow mb-4">{c.title}</p>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <div>
                <label htmlFor={c.committeeKey} className="field-label">
                  Committee
                </label>
                <select
                  id={c.committeeKey}
                  value={c.committee}
                  onChange={(e) => onChange({ [c.committeeKey]: e.target.value, [c.countryKey]: '' })}
                  className="field-input"
                >
                  {chambers.map((ch) => (
                    <option key={ch.code} value={ch.code}>
                      {ch.code} — {ch.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor={c.countryKey} className="field-label">
                  Country / portfolio
                </label>
                <select
                  id={c.countryKey}
                  value={formData[c.countryKey] || ''}
                  onChange={(e) => onChange({ [c.countryKey]: e.target.value })}
                  aria-invalid={!!errors[c.countryKey]}
                  aria-describedby={err ? `${c.countryKey}-error` : undefined}
                  className="field-input"
                >
                  <option value="">Select a country</option>
                  {countries.map((name) => (
                    <option key={name} value={name}>
                      {name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            {err && (
              <p id={`${c.countryKey}-error`} className="field-error">
                {err[0]}
              </p>
            )}
          </fieldset>
        );
      })}
    </div>
  );
}
