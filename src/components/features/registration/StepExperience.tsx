'use client';

import { Step3FormData } from '@/lib/validators/registration';

interface StepExperienceProps {
  formData: Partial<Step3FormData>;
  onChange: (updates: Partial<Step3FormData>) => void;
  errors: Record<string, string[] | undefined>;
}

const experienceTiers = [
  { id: 'FIRST_TIME', label: 'First MUN', desc: 'No conferences yet, or this is your first' },
  { id: 'INTERMEDIATE_1_3', label: '1 to 3 conferences', desc: 'You know the procedure and have drafted clauses' },
  { id: 'ADVANCED_4_7', label: '4 to 7 conferences', desc: 'You have led blocs or won awards' },
  { id: 'VETERAN_8_PLUS', label: '8 or more', desc: 'Long experience across crisis and GA committees' },
] as const;

export default function StepExperience({ formData, onChange, errors }: StepExperienceProps) {
  const motivationLength = (formData.motivation || '').length;

  return (
    <div className="flex flex-col gap-7">
      <div>
        <h3 className="mb-1 text-xl font-semibold text-soft-white">Experience</h3>
        <p className="text-sm text-muted-grey">This helps the team balance experience across committees.</p>
      </div>

      <fieldset>
        <legend className="field-label">MUN experience *</legend>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {experienceTiers.map((tier) => {
            const active = formData.experienceLevel === tier.id;
            return (
              <button
                key={tier.id}
                type="button"
                aria-pressed={active}
                onClick={() => onChange({ experienceLevel: tier.id })}
                className={`rounded-[10px] border p-4 text-left transition-colors duration-200 ${
                  active ? 'border-soft-white bg-bg' : 'border-[#2a2d2e] hover:border-[#4a4d4e]'
                }`}
              >
                <span className="block text-sm font-semibold text-soft-white">{tier.label}</span>
                <span className="mt-1 block text-xs text-muted-grey">{tier.desc}</span>
              </button>
            );
          })}
        </div>
        {errors.experienceLevel && <p className="field-error">{errors.experienceLevel[0]}</p>}
      </fieldset>

      <div>
        <label htmlFor="priorAwards" className="field-label">
          Awards (optional)
        </label>
        <input
          id="priorAwards"
          type="text"
          placeholder="e.g. Best Delegate, XYZ MUN 2025"
          value={formData.priorAwards || ''}
          onChange={(e) => onChange({ priorAwards: e.target.value })}
          className="field-input"
        />
      </div>

      <div>
        <label htmlFor="motivation" className="field-label">
          Why do you want to join? *
        </label>
        <textarea
          id="motivation"
          rows={4}
          maxLength={1200}
          placeholder="Two to four sentences on your preferred agenda and what you want to bring to the committee."
          value={formData.motivation || ''}
          onChange={(e) => onChange({ motivation: e.target.value })}
          aria-invalid={!!errors.motivation}
          aria-describedby="motivation-help"
          className="field-input resize-y leading-relaxed"
        />
        <div id="motivation-help" className="mt-1.5 flex justify-between gap-4 text-xs">
          <span className="text-[#E06C75]">{errors.motivation?.[0]}</span>
          <span className="shrink-0 text-muted-grey">{motivationLength} / 1200</span>
        </div>
      </div>

      <div>
        <label htmlFor="portfolioSampleUrl" className="field-label">
          Writing sample link (optional)
        </label>
        <input
          id="portfolioSampleUrl"
          type="url"
          placeholder="e.g. a Google Drive link to a position paper"
          value={formData.portfolioSampleUrl || ''}
          onChange={(e) => onChange({ portfolioSampleUrl: e.target.value })}
          aria-invalid={!!errors.portfolioSampleUrl}
          className="field-input"
        />
        {errors.portfolioSampleUrl && <p className="field-error">{errors.portfolioSampleUrl[0]}</p>}
      </div>
    </div>
  );
}
