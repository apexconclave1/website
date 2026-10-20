'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Check, ArrowRight, ArrowLeft } from 'lucide-react';
import StepIdentity from './StepIdentity';
import StepCommitteePicker from './StepCommitteePicker';
import StepExperience from './StepExperience';
import StepReview from './StepReview';
import StepPayment from './StepPayment';
import RegistrationReceipt from './RegistrationReceipt';
import {
  RegistrationFormData,
  RegistrationStep1Schema,
  RegistrationStep2Schema,
  RegistrationStep3Schema,
  RegistrationStep4Schema,
} from '@/lib/validators/registration';

const STEPS = [
  { id: 1, label: 'Identity', desc: 'Delegate details' },
  { id: 2, label: 'Chamber', desc: 'Portfolio choice' },
  { id: 3, label: 'Experience', desc: 'Track record' },
  { id: 4, label: 'Review', desc: 'Confirmation' },
  { id: 5, label: 'Payment', desc: 'Complete registration' },
];

interface RegistrationResult {
  registrationId: number;
  trackingCode: string;
  submittedAt: string;
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
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // After Step 4 submit → registration saved in Supabase
  const [registrationResult, setRegistrationResult] = useState<RegistrationResult | null>(null);

  // After Step 5 (payment) → final receipt
  const [paymentResult, setPaymentResult] = useState<PaymentResult | null>(null);

  const [formData, setFormData] = useState<Partial<RegistrationFormData>>({
    track: 'HIGH_SCHOOL',
    delegationType: 'INDIVIDUAL',
    firstChoiceCommittee: 'UNSC',
    firstChoiceCountry: '',
    secondChoiceCommittee: 'WHO',
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
        firstChoiceCommittee: committeeParam || prev.firstChoiceCommittee || 'UNSC',
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

  const handleNext = () => {
    if (validateStep(currentStep)) {
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
    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setRegistrationResult({
          registrationId: data.registrationId,
          trackingCode: data.trackingCode,
          submittedAt: data.submittedAt,
          allotment: data.allotment,
        });
        // Advance to Step 5 (Payment)
        setCurrentStep(5);
        window.scrollTo({ top: 100, behavior: 'smooth' });
      } else {
        alert(data.error || 'Failed to submit registration. Please try again.');
      }
    } catch (err) {
      console.error('Submission error:', err);
      alert('Network error submitting application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePaymentComplete = (result: PaymentResult) => {
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
      firstChoiceCommittee: 'UNSC',
      firstChoiceCountry: '',
      secondChoiceCommittee: 'WHO',
      secondChoiceCountry: '',
      experienceLevel: 'FIRST_TIME',
    });
  };

  // After payment is complete → show receipt
  if (paymentResult && registrationResult) {
    return (
      <RegistrationReceipt
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
    <div
      style={{
        maxWidth: '820px',
        margin: '0 auto',
        borderRadius: '12px',
        backgroundColor: 'rgba(10, 13, 18, 0.42)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: '1px solid rgba(199, 161, 106, 0.22)',
        borderTop: '1px solid rgba(199, 161, 106, 0.4)',
        boxShadow: '0 24px 60px -20px rgba(0,0,0,0.85), inset 0 1px 0 rgba(255,255,255,0.08)',
        padding: 'clamp(1.5rem, 3.5vw, 2.75rem)',
        overflow: 'hidden',
      }}
    >
      {/* Progress Steps Header */}
      <div
        className="reg-stepper"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)',
          gap: '0.5rem',
          paddingBottom: '2rem',
          marginBottom: '2rem',
          borderBottom: '1px solid rgba(205, 199, 192, 0.1)',
        }}
      >
        {STEPS.map((step) => {
          const isComplete = currentStep > step.id;
          const isCurrent = currentStep === step.id;
          return (
            <div
              key={step.id}
              aria-current={isCurrent ? 'step' : undefined}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.35rem',
                opacity: isCurrent ? 1 : isComplete ? 0.85 : 0.6,
                transition: 'opacity 200ms ease',
              }}
            >
              {/* Progress Bar Segment */}
              <div
                style={{
                  height: '3px',
                  width: '100%',
                  borderRadius: '2px',
                  backgroundColor: isComplete || isCurrent ? '#C7A16A' : 'rgba(205, 199, 192, 0.15)',
                  boxShadow: isCurrent ? '0 0 8px #C7A16A' : 'none',
                }}
              />
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <span
                  style={{
                    fontFamily: "var(--font-inter), system-ui, sans-serif",
                    fontSize: '0.625rem',
                    fontWeight: 700,
                    color: isCurrent ? '#C7A16A' : '#CDC7C0',
                  }}
                >
                  {isComplete ? <Check size={10} color="#C7A16A" /> : `0${step.id}`}
                </span>
                <span
                  className={isCurrent ? undefined : 'hidden sm:inline'}
                  style={{
                    fontFamily: "var(--font-inter), system-ui, sans-serif",
                    fontSize: '0.6875rem',
                    fontWeight: 600,
                    color: isCurrent ? '#F4F1EA' : '#8A8480',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                  }}
                >
                  {step.label}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Step Content Shell */}
      <div style={{ minHeight: '380px' }}>
        {currentStep === 1 && (
          <StepIdentity formData={formData} onChange={updateFormData} errors={errors} />
        )}
        {currentStep === 2 && (
          <StepCommitteePicker formData={formData} onChange={updateFormData} errors={errors} />
        )}
        {currentStep === 3 && (
          <StepExperience formData={formData} onChange={updateFormData} errors={errors} />
        )}
        {currentStep === 4 && (
          <StepReview
            formData={formData}
            onChange={updateFormData}
            onJumpToStep={(s) => setCurrentStep(s)}
            errors={errors}
            isSubmitting={isSubmitting}
            onSubmit={handleSubmit}
          />
        )}
        {currentStep === 5 && registrationResult && (
          <StepPayment
            registrationId={registrationResult.registrationId}
            trackingCode={registrationResult.trackingCode}
            onPaymentComplete={handlePaymentComplete}
          />
        )}
      </div>

      {/* Wizard Footer Controls (only for steps 1-3) */}
      {currentStep < 4 && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: '2.5rem',
            paddingTop: '1.5rem',
            borderTop: '1px solid rgba(205, 199, 192, 0.1)',
          }}
        >
          {currentStep > 1 ? (
            <button
              type="button"
              onClick={handleBack}
              className="btn-tactile"
              style={{
                padding: '0.65rem 1.25rem',
                borderRadius: '6px',
                border: '1px solid rgba(205, 199, 192, 0.2)',
                backgroundColor: 'transparent',
                color: '#CDC7C0',
                fontFamily: "var(--font-inter), system-ui, sans-serif",
                fontSize: '0.8125rem',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
              }}
            >
              <ArrowLeft size={14} /> Back
            </button>
          ) : (
            <div />
          )}

          <button
            type="button"
            onClick={handleNext}
            className="btn-tactile"
            style={{
              padding: '0.75rem 1.5rem',
              borderRadius: '6px',
              backgroundColor: '#C7A16A',
              color: '#1A1D1F',
              fontFamily: "var(--font-inter), system-ui, sans-serif",
              fontSize: '0.8125rem',
              fontWeight: 700,
              letterSpacing: '0.05em',
              border: 'none',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              boxShadow: '0 6px 20px -4px rgba(199, 161, 106, 0.35)',
            }}
          >
            Continue to {STEPS[currentStep].label} <ArrowRight size={14} />
          </button>
        </div>
      )}
    </div>
  );
}
