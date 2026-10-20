'use client';

import Link from 'next/link';
import { RegistrationFormData } from '@/lib/validators/registration';
import { Button } from '@/components/ui/Button';

interface StepReviewProps {
  formData: Partial<RegistrationFormData>;
  onChange: (updates: Partial<RegistrationFormData>) => void;
  onJumpToStep: (step: number) => void;
  errors: Record<string, string[] | undefined>;
  isSubmitting: boolean;
  onSubmit: () => void;
}

const EXPERIENCE_LABELS: Record<string, string> = {
  FIRST_TIME: 'First MUN',
  INTERMEDIATE_1_3: '1 to 3 conferences',
  ADVANCED_4_7: '4 to 7 conferences',
  VETERAN_8_PLUS: '8 or more conferences',
};

export default function StepReview({ formData, onChange, onJumpToStep, errors, isSubmitting, onSubmit }: StepReviewProps) {
  const sections = [
    {
      step: 1,
      title: 'About you',
      body: (
        <>
          <p className="text-base font-semibold text-soft-white">{formData.fullName || '—'}</p>
          <p className="mt-1 text-sm text-muted-grey">
            {formData.email} · {formData.phone}
          </p>
          <p className="mt-1 text-sm text-muted-grey">
            {formData.institutionName} · {formData.city}, {formData.country} ·{' '}
            {formData.track === 'HIGH_SCHOOL' ? 'High school' : 'College'}
          </p>
        </>
      ),
    },
    {
      step: 2,
      title: 'Preferences',
      body: (
        <>
          <p className="text-sm text-soft-white">
            1. {formData.firstChoiceCommittee} — {formData.firstChoiceCountry || 'Not selected'}
          </p>
          <p className="mt-1 text-sm text-muted-grey">
            2. {formData.secondChoiceCommittee} — {formData.secondChoiceCountry || 'Not selected'}
          </p>
        </>
      ),
    },
    {
      step: 3,
      title: 'Experience',
      body: (
        <>
          <p className="text-sm text-soft-white">{EXPERIENCE_LABELS[formData.experienceLevel ?? ''] ?? '—'}</p>
          <p className="mt-1 max-w-[60ch] text-sm leading-relaxed text-muted-grey">{formData.motivation}</p>
        </>
      ),
    },
  ];

  const checks = [
    {
      key: 'acceptCodeOfConduct',
      title: 'Code of conduct *',
      text: (
        <>
          I agree to the{' '}
          <Link href="/terms#code-of-conduct" target="_blank" className="text-soft-white underline underline-offset-4">
            code of conduct
          </Link>
          : rules of procedure, respectful debate, no plagiarism and zero tolerance for harassment.
        </>
      ),
    },
    {
      key: 'verifyAccuracy',
      title: 'Accurate details *',
      text: 'The details about my school or college, track and experience are true.',
    },
  ] as const;

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h3 className="mb-1 text-xl font-semibold text-soft-white">Review</h3>
        <p className="text-sm text-muted-grey">Check your details before you submit.</p>
      </div>

      <div className="divide-y divide-line rounded-[10px] border border-line bg-surface">
        {sections.map((s) => (
          <div key={s.step} className="flex flex-wrap items-start justify-between gap-4 p-5">
            <div className="min-w-0">
              <p className="eyebrow mb-2">{s.title}</p>
              {s.body}
            </div>
            <Button type="button" variant="outline" size="sm" onClick={() => onJumpToStep(s.step)}>
              Edit
            </Button>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-3">
        {checks.map((c) => (
          <div key={c.key}>
            <label
              className={`flex cursor-pointer items-start gap-3 rounded-[10px] border p-4 ${
                errors[c.key] ? 'border-[#E06C75]' : 'border-line'
              }`}
            >
              <input
                type="checkbox"
                checked={Boolean(formData[c.key])}
                onChange={(e) => onChange({ [c.key]: e.target.checked as true })}
                className="mt-0.5 h-4 w-4 shrink-0 accent-soft-white"
              />
              <span>
                <span className="block text-sm font-semibold text-soft-white">{c.title}</span>
                <span className="mt-1 block text-sm leading-relaxed text-muted-grey">{c.text}</span>
              </span>
            </label>
            {errors[c.key] && <p className="field-error">{errors[c.key]![0]}</p>}
          </div>
        ))}
      </div>

      <Button type="button" size="lg" disabled={isSubmitting} onClick={onSubmit} className="w-full">
        {isSubmitting ? 'Submitting…' : 'Submit application'}
      </Button>
    </div>
  );
}
