'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import StepIdentity from './StepIdentity';
import StepCommitteePicker from './StepCommitteePicker';
import StepExperience from './StepExperience';
import StepReview from './StepReview';
import StepPayment from './StepPayment';
import RegistrationReceipt from './RegistrationReceipt';
import { Button } from '@/components/ui/Button';
import { readUtm } from '@/components/UtmCapture';
import { track } from '@vercel/analytics';
import { eventsData } from '@/lib/data/events';
import { chambersData } from '@/lib/data/chambers';
import {
  RegistrationFormData,
  RegistrationStep1Schema,
  RegistrationStep2Schema,
  RegistrationStep3Schema,
  RegistrationStep4Schema,
} from '@/lib/validators/registration';

const STEPS = [
  { id: 1, label: 'About you', desc: 'Delegate details' },
  { id: 2, label: 'Committee', desc: 'Portfolio choice' },
  { id: 3, label: 'Experience', desc: 'Track record' },
  { id: 4, label: 'Review', desc: 'Confirmation' },
  { id: 5, label: 'Payment', desc: 'Complete registration' },
];

interface RegistrationResult {
  registrationId: number;
  trackingCode: string;
  submittedAt: string;
  fee: number;
  allotment: {
    committee: string;
    country: string;
    status: string;
    delegateName: string;
    track: string;
    institution: string;
  };
}

interface PaymentResult {
  trackingCode: string;
  status: string;
  finalAmount: number;
}

export default function RegistrationWizard() {
  const searchParams = useSearchParams();
  const event = eventsData.find((e) => e.slug === searchParams.get('event')) ?? eventsData[0];
  const chambers = chambersData
    .filter((c) => c.eventId === event.id)
    .sort((a, b) => a.displayOrder - b.displayOrder);
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  // After Step 4 submit → registration saved in Supabase
  const [registrationResult, setRegistrationResult] = useState<RegistrationResult | null>(null);

  // After Step 5 (payment) → final receipt
  const [paymentResult, setPaymentResult] = useState<PaymentResult | null>(null);

  const [formData, setFormData] = useState<Partial<RegistrationFormData>>({
    track: 'HIGH_SCHOOL',
    delegationType: 'INDIVIDUAL',
    firstChoiceCommittee: chambers[0]?.code,
    firstChoiceCountry: '',
    secondChoiceCommittee: (chambers[1] ?? chambers[0])?.code,
    secondChoiceCountry: '',
    experienceLevel: 'FIRST_TIME',
    acceptCodeOfConduct: undefined,
    verifyAccuracy: undefined,
  });

  const [errors, setErrors] = useState<Record<string, string[] | undefined>>({});

  // Parse URL query parameters if delegate clicked "Claim Portfolio" from /committees
  useEffect(() => {
    const committeeParam = searchParams.get('committee');
    const countryParam = searchParams.get('country');
    if (committeeParam || countryParam) {
      setFormData((prev) => ({
        ...prev,
        firstChoiceCommittee: committeeParam || prev.firstChoiceCommittee,
        firstChoiceCountry: countryParam || prev.firstChoiceCountry || '',
      }));
    }
  }, [searchParams]);

  const updateFormData = (updates: Partial<RegistrationFormData>) => {
    setFormData((prev) => ({ ...prev, ...updates }));
    // Clear field error on edit
    const updatedKeys = Object.keys(updates);
    setErrors((prev) => {
      const next = { ...prev };
      updatedKeys.forEach((key) => delete next[key]);
      return next;
    });
  };

  const validateStep = (step: number): boolean => {
    let result;
    if (step === 1) {
      result = RegistrationStep1Schema.safeParse(formData);
    } else if (step === 2) {
      result = RegistrationStep2Schema.safeParse(formData);
    } else if (step === 3) {
      result = RegistrationStep3Schema.safeParse(formData);
    } else if (step === 4) {
      result = RegistrationStep4Schema.safeParse(formData);
    }

    if (result && !result.success) {
      setErrors(result.error.flatten().fieldErrors);
      return false;
    }

    setErrors({});
    return true;
  };

  // Funnel: one event when the wizard opens, one per completed step (1-3; step 4 is registration_submitted)
  useEffect(() => {
    track('register_viewed', { event: event.id });
  }, [event.id]);

  const handleNext = () => {
    if (validateStep(currentStep)) {
      track('registration_step_completed', { event: event.id, step: currentStep });
      setCurrentStep((prev) => Math.min(prev + 1, 4));
      window.scrollTo({ top: 120, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
    window.scrollTo({ top: 120, behavior: 'smooth' });
  };

  const handleSubmit = async () => {
    if (!validateStep(4)) return;

    setIsSubmitting(true);
    setSubmitError('');
    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, ...readUtm(), eventId: event.id }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setRegistrationResult({
          registrationId: data.registrationId,
          trackingCode: data.trackingCode,
          submittedAt: data.submittedAt,
          fee: data.fee,
          allotment: data.allotment,
        });
        track('registration_submitted', { event: event.id });
        // Advance to Step 5 (Payment)
        setCurrentStep(5);
        window.scrollTo({ top: 100, behavior: 'smooth' });
      } else {
        setSubmitError(data.error || 'Could not submit your application. Please try again.');
      }
    } catch (err) {
      console.error('Submission error:', err);
      setSubmitError('Network error. Check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePaymentComplete = (result: PaymentResult) => {
    track('payment_submitted', { event: event.id, amount: result.finalAmount });
    setPaymentResult(result);
    window.scrollTo({ top: 100, behavior: 'smooth' });
  };

  const resetForm = () => {
    setRegistrationResult(null);
    setPaymentResult(null);
    setCurrentStep(1);
    setFormData({
      track: 'HIGH_SCHOOL',
      delegationType: 'INDIVIDUAL',
      firstChoiceCommittee: chambers[0]?.code,
      firstChoiceCountry: '',
      secondChoiceCommittee: (chambers[1] ?? chambers[0])?.code,
      secondChoiceCountry: '',
      experienceLevel: 'FIRST_TIME',
    });
  };

  // After payment is complete → show receipt
  if (paymentResult && registrationResult) {
    return (
      <RegistrationReceipt
        event={event}
        trackingCode={registrationResult.trackingCode}
        submittedAt={registrationResult.submittedAt}
        allotment={registrationResult.allotment}
        paymentStatus={paymentResult.status}
        amountPaid={paymentResult.finalAmount}
        onNewRegistration={resetForm}
      />
    );
  }

  return (
    <div className="mx-auto max-w-[820px] rounded border border-soft/15 bg-ground p-6 md:p-10">
      {/* Stepper: on phones only the current step shows its label */}
      <ol className="mb-8 grid grid-cols-5 gap-2 border-b border-soft/25 pb-8">
        {STEPS.map((step) => {
          const isComplete = currentStep > step.id;
          const isCurrent = currentStep === step.id;
          return (
            <li key={step.id} aria-current={isCurrent ? 'step' : undefined} className="flex flex-col gap-2">
              <span className={`h-[3px] w-full rounded-full ${isComplete || isCurrent ? 'bg-bright' : 'bg-soft/20'}`} />
              <span className={`text-xs font-medium ${isCurrent ? 'text-bright' : 'text-soft'}`}>
                <span className="tabular-nums">{isComplete ? '✓' : `0${step.id}`}</span>
                <span className={isCurrent ? 'ml-1.5' : 'ml-1.5 hidden sm:inline'}>{step.label}</span>
              </span>
            </li>
          );
        })}
      </ol>

      <div key={currentStep} className="min-h-[380px] animate-step-in">
        {currentStep === 1 && <StepIdentity formData={formData} onChange={updateFormData} errors={errors} />}
        {currentStep === 2 && (
          <StepCommitteePicker chambers={chambers} formData={formData} onChange={updateFormData} errors={errors} />
        )}
        {currentStep === 3 && <StepExperience formData={formData} onChange={updateFormData} errors={errors} />}
        {currentStep === 4 && (
          <>
            <StepReview
              formData={formData}
              onChange={updateFormData}
              onJumpToStep={(s) => setCurrentStep(s)}
              errors={errors}
              isSubmitting={isSubmitting}
              onSubmit={handleSubmit}
            />
            {submitError && (
              <p role="alert" className="alert-error mt-4">
                {submitError}
              </p>
            )}
          </>
        )}
        {currentStep === 5 && registrationResult && (
          <StepPayment
            registrationId={registrationResult.registrationId}
            trackingCode={registrationResult.trackingCode}
            fee={registrationResult.fee}
            onPaymentComplete={handlePaymentComplete}
          />
        )}
      </div>

      {currentStep < 4 && (
        <div className="mt-10 flex items-center justify-between border-t border-soft/25 pt-6">
          {currentStep > 1 ? (
            <Button type="button" variant="outline" onClick={handleBack}>
              Back
            </Button>
          ) : (
            <span />
          )}
          <Button type="button" onClick={handleNext}>
            Continue to {STEPS[currentStep].label}
          </Button>
        </div>
      )}
    </div>
  );
}
