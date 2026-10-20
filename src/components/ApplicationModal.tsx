'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, AlertCircle } from 'lucide-react';
import { SeatPortfolioEntity, ChamberEntity } from '@/types/schema';
import { submitDelegateApplication } from '@/lib/firebase/applications';
import { Button } from '@/components/ui/Button';

export interface ApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedSeat: SeatPortfolioEntity | null;
  chambers: ChamberEntity[];
}

export function ApplicationModal({
  isOpen,
  onClose,
  selectedSeat,
  chambers,
}: ApplicationModalProps) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [institution, setInstitution] = useState('');
  const [experienceLevel, setExperienceLevel] = useState<
    'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED'
  >('INTERMEDIATE');
  const [statementOfPurpose, setStatementOfPurpose] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  const currentChamber = chambers.find((c) => c.id === selectedSeat?.chamberId);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !institution || !selectedSeat) {
      setErrorMessage('Please complete all required fields.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const result = await submitDelegateApplication({
        eventId: selectedSeat.eventId,
        chamberId: selectedSeat.chamberId,
        preferredPortfolios: [selectedSeat.id],
        delegateDetails: {
          fullName,
          email,
          phone,
          institution,
          experienceLevel,
          statementOfPurpose,
        },
      });

      if (result.success) {
        setSubmitSuccess(true);
      } else {
        setErrorMessage(result.message || 'Submission failed. Please try again.');
      }
    } catch (err) {
      setErrorMessage('An unexpected error occurred.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="bg-surface border border-[#1f2325] rounded-lg max-w-lg w-full p-6 space-y-6 relative shadow-2xl overflow-y-auto max-h-[90vh]"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 text-muted-grey hover:text-soft-white p-1 focus:outline-none"
          >
            <X className="w-5 h-5" />
          </button>

          {submitSuccess ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-12 h-12 rounded-full bg-[#1A2520] border border-[#2B4235] text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-soft-white">
                Application Received!
              </h3>
              <p className="text-muted-grey text-sm max-w-md mx-auto leading-relaxed">
                Your direct application for{' '}
                <span className="text-soft-white font-semibold">
                  {selectedSeat?.portfolioName}
                </span>{' '}
                in <span className="text-soft-white font-semibold">{currentChamber?.code}</span> has been successfully logged. Our secretariat will confirm allocation via email.
              </p>
              <div className="pt-4">
                <Button variant="primary" onClick={onClose} className="w-full">
                  Close Window
                </Button>
              </div>
            </div>
          ) : (
            <>
              {/* Header */}
              <div className="space-y-1">
                <span className="text-xs uppercase tracking-widest text-warm-bronze font-medium">
                  Direct Delegate Registration
                </span>
                <h3 className="text-2xl font-bold text-soft-white">
                  Apply for {selectedSeat?.portfolioName}
                </h3>
                {currentChamber && (
                  <p className="text-xs text-muted-grey">
                    Committee Chamber: {currentChamber.code} ({currentChamber.name})
                  </p>
                )}
              </div>

              {errorMessage && (
                <div className="p-3 rounded bg-[#251515] border border-[#482020] text-red-300 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-muted-grey">
                    Full Name <span className="text-warm-bronze">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Delegate Full Name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-3.5 py-2 bg-[#0d0f10] border border-[#222729] rounded text-sm text-soft-white focus:outline-none focus:border-warm-bronze"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-muted-grey">
                      Email Address <span className="text-warm-bronze">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="delegate@institution.edu"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3.5 py-2 bg-[#0d0f10] border border-[#222729] rounded text-sm text-soft-white focus:outline-none focus:border-warm-bronze"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-muted-grey">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3.5 py-2 bg-[#0d0f10] border border-[#222729] rounded text-sm text-soft-white focus:outline-none focus:border-warm-bronze"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-muted-grey">
                    Institution / University <span className="text-warm-bronze">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. St. Stephen's College / Delhi University"
                    value={institution}
                    onChange={(e) => setInstitution(e.target.value)}
                    className="w-full px-3.5 py-2 bg-[#0d0f10] border border-[#222729] rounded text-sm text-soft-white focus:outline-none focus:border-warm-bronze"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-muted-grey">
                    MUN Experience Level
                  </label>
                  <select
                    value={experienceLevel}
                    onChange={(e) =>
                      setExperienceLevel(
                        e.target.value as 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED'
                      )
                    }
                    className="w-full px-3.5 py-2 bg-[#0d0f10] border border-[#222729] rounded text-sm text-soft-white focus:outline-none focus:border-warm-bronze"
                  >
                    <option value="BEGINNER">Beginner (0–2 MUNs)</option>
                    <option value="INTERMEDIATE">Intermediate (3–6 MUNs)</option>
                    <option value="ADVANCED">Advanced (7+ MUNs / Executive Board)</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-muted-grey">
                    Statement of Purpose / Strategy Note
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Brief note outlining your policy position or reason for selecting this portfolio..."
                    value={statementOfPurpose}
                    onChange={(e) => setStatementOfPurpose(e.target.value)}
                    className="w-full px-3.5 py-2 bg-[#0d0f10] border border-[#222729] rounded text-sm text-soft-white focus:outline-none focus:border-warm-bronze resize-none"
                  />
                </div>

                <div className="pt-2 flex items-center justify-end gap-3">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={onClose}
                    disabled={isSubmitting}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="primary"
                    size="sm"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Submitting...' : 'Confirm Application'}
                  </Button>
                </div>
              </form>
            </>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
