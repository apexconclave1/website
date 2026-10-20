'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { paymentConfig } from '@/lib/data/organization';
import { Button } from '@/components/ui/Button';

interface StepPaymentProps {
  registrationId: number;
  trackingCode: string;
  /** Fee in INR set by the server for this registration */
  fee: number;
  onPaymentComplete: (result: { trackingCode: string; status: string; finalAmount: number }) => void;
}

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

export default function StepPayment({ registrationId, trackingCode, fee, onPaymentComplete }: StepPaymentProps) {
  const [couponCode, setCouponCode] = useState('');
  const [couponApplied, setCouponApplied] = useState<{ code: string; discount: number } | null>(null);
  const [couponError, setCouponError] = useState('');
  const [couponLoading, setCouponLoading] = useState(false);
  const [paymentUtr, setPaymentUtr] = useState('');
  const [utrError, setUtrError] = useState('');
  const [screenshotFile, setScreenshotFile] = useState<File | null>(null);
  const [screenshotPreview, setScreenshotPreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [upiCopied, setUpiCopied] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const confirmRef = useRef<HTMLDialogElement>(null);

  // Display only. The server recomputes the amount from the registration and the coupon.
  const finalAmount = couponApplied ? Math.max(0, fee - couponApplied.discount) : fee;

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) return;
    setCouponLoading(true);
    setCouponError('');
    try {
      const res = await fetch('/api/register/validate-coupon', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ couponCode: couponCode.trim().toUpperCase() }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setCouponApplied({ code: data.couponCode, discount: Number(data.discountAmount) });
      } else {
        setCouponError(data.error || 'Invalid coupon code.');
        setCouponApplied(null);
      }
    } catch {
      setCouponError('Could not check the coupon. Please try again.');
    } finally {
      setCouponLoading(false);
    }
  };

  const handleRemoveCoupon = () => {
    setCouponApplied(null);
    setCouponCode('');
    setCouponError('');
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!ALLOWED_TYPES.includes(file.type)) {
      setSubmitError('Screenshot must be a JPEG, PNG, or WebP image.');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setSubmitError('Screenshot must be under 5MB.');
      return;
    }
    setScreenshotFile(file);
    setSubmitError('');
    const reader = new FileReader();
    reader.onload = (ev) => setScreenshotPreview(ev.target?.result as string);
    reader.readAsDataURL(file);
  };

  const handleRemoveScreenshot = () => {
    setScreenshotFile(null);
    setScreenshotPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const copyUpiId = async () => {
    try {
      await navigator.clipboard.writeText(paymentConfig.upiId);
      setUpiCopied(true);
      setTimeout(() => setUpiCopied(false), 2000);
    } catch {
      // Clipboard blocked: the id is visible on screen anyway
    }
  };

  // Step 1: validate, then ask for confirmation (submitting a payment cannot be undone)
  const handleConfirmClick = () => {
    const utr = paymentUtr.trim();
    if (!utr) {
      setUtrError('Enter the UTR / transaction reference number.');
      return;
    }
    if (!/^[A-Za-z0-9]{8,30}$/.test(utr)) {
      setUtrError('The UTR is 8 to 30 letters and numbers.');
      return;
    }
    setUtrError('');
    confirmRef.current?.showModal();
  };

  // Step 2: the delegate confirmed in the dialog
  const handleSubmitPayment = async () => {
    confirmRef.current?.close();
    const utr = paymentUtr.trim();
    setSubmitError('');
    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append('registrationId', String(registrationId));
      formData.append('trackingCode', trackingCode);
      formData.append('paymentUtr', utr);
      if (couponApplied) formData.append('couponCode', couponApplied.code);
      if (screenshotFile) formData.append('screenshot', screenshotFile);

      const res = await fetch('/api/register/payment', { method: 'POST', body: formData });
      const data = await res.json();

      if (res.ok && data.success) {
        onPaymentComplete({ trackingCode: data.trackingCode, status: data.status, finalAmount: data.finalAmount });
      } else {
        setSubmitError(data.error || 'Could not submit payment details. Please try again.');
      }
    } catch {
      setSubmitError('Network error. Check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h3 className="mb-1 text-xl font-semibold text-soft-white">Payment</h3>
        <p className="text-sm leading-relaxed text-muted-grey">
          Your application is saved with tracking code{' '}
          <span className="font-semibold text-soft-white">{trackingCode}</span>. Note it down, then pay below.
        </p>
      </div>

      {/* Fee summary */}
      <div className="panel space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-grey">Delegate fee</span>
          <span className={`text-lg font-bold ${couponApplied ? 'text-muted-grey line-through' : 'text-soft-white'}`}>
            ₹{fee}
          </span>
        </div>
        {couponApplied && (
          <>
            <div className="flex items-center justify-between text-sm text-muted-grey">
              <span>Coupon {couponApplied.code}</span>
              <span>−₹{couponApplied.discount}</span>
            </div>
            <div className="flex items-center justify-between border-t border-[#2a2d2e] pt-3">
              <span className="text-sm font-semibold text-soft-white">To pay</span>
              <span className="text-xl font-bold text-soft-white">₹{finalAmount}</span>
            </div>
          </>
        )}
      </div>

      {/* Coupon */}
      <div>
        <label htmlFor="coupon" className="field-label">
          Coupon code (optional)
        </label>
        {couponApplied ? (
          <div className="flex items-center justify-between rounded-sm border border-[#2a2d2e] px-4 py-3 text-sm text-soft-white">
            <span>
              {couponApplied.code}: ₹{couponApplied.discount} off
            </span>
            <button type="button" onClick={handleRemoveCoupon} className="text-muted-grey underline underline-offset-4 hover:text-soft-white">
              Remove
            </button>
          </div>
        ) : (
          <div className="flex gap-2">
            <input
              id="coupon"
              type="text"
              placeholder="Enter code"
              value={couponCode}
              onChange={(e) => {
                setCouponCode(e.target.value.toUpperCase());
                setCouponError('');
              }}
              onKeyDown={(e) => e.key === 'Enter' && handleApplyCoupon()}
              aria-invalid={!!couponError}
              className="field-input uppercase tracking-wider"
            />
            <Button
              type="button"
              variant="outline"
              onClick={handleApplyCoupon}
              disabled={couponLoading || !couponCode.trim()}
              className="shrink-0 px-5"
            >
              {couponLoading ? 'Checking…' : 'Apply'}
            </Button>
          </div>
        )}
        {couponError && <p className="field-error">{couponError}</p>}
      </div>

      {/* UPI */}
      <div className="panel text-center">
        <p className="eyebrow mb-4">Scan to pay ₹{finalAmount}</p>
        <div className="mx-auto mb-4 h-[200px] w-[200px] overflow-hidden rounded-[10px] bg-white p-2">
          <Image src={paymentConfig.qrImage} alt="UPI QR code for payment" width={184} height={184} className="h-full w-full object-contain" />
        </div>
        <p className="mb-2 text-xs text-muted-grey">Or pay to this UPI id</p>
        <button
          type="button"
          onClick={copyUpiId}
          className="inline-flex items-center gap-2 rounded-sm border border-[#2a2d2e] px-4 py-2 text-sm font-semibold text-soft-white transition-colors duration-200 hover:border-soft-white"
        >
          {paymentConfig.upiId}
          <span className="text-xs font-normal text-muted-grey">{upiCopied ? 'Copied' : 'Copy'}</span>
        </button>
      </div>

      {/* UTR */}
      <div>
        <label htmlFor="utr" className="field-label">
          UTR / transaction reference number *
        </label>
        <input
          id="utr"
          type="text"
          inputMode="text"
          placeholder="e.g. 425619287345"
          value={paymentUtr}
          onChange={(e) => {
            setPaymentUtr(e.target.value.replace(/[^A-Za-z0-9]/g, ''));
            setUtrError('');
          }}
          maxLength={30}
          aria-invalid={!!utrError}
          aria-describedby="utr-help"
          className="field-input tracking-wider"
        />
        <p id="utr-help" className={utrError ? 'field-error' : 'mt-1.5 text-xs text-muted-grey'}>
          {utrError || 'Find it in your UPI app under the transaction details.'}
        </p>
      </div>

      {/* Screenshot */}
      <div>
        <p className="field-label">Payment screenshot (optional)</p>
        {screenshotPreview ? (
          <div className="flex items-end gap-4">
            <div className="h-40 w-40 overflow-hidden rounded-[10px] border border-[#2a2d2e]">
              {/* eslint-disable-next-line @next/next/no-img-element -- local data URL preview */}
              <img src={screenshotPreview} alt="Payment screenshot preview" className="h-full w-full object-cover" />
            </div>
            <button type="button" onClick={handleRemoveScreenshot} className="text-sm text-muted-grey underline underline-offset-4 hover:text-soft-white">
              Remove
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="w-full rounded-[10px] border border-dashed border-[#2a2d2e] p-5 text-sm text-muted-grey transition-colors duration-200 hover:border-soft-white hover:text-soft-white"
          >
            Upload a screenshot of your UPI payment
          </button>
        )}
        <input ref={fileInputRef} type="file" accept={ALLOWED_TYPES.join(',')} onChange={handleFileChange} className="hidden" />
      </div>

      {submitError && (
        <p role="alert" className="rounded-sm border border-[#E06C75] px-4 py-3 text-sm text-[#E06C75]">
          {submitError}
        </p>
      )}

      <Button type="button" size="lg" onClick={handleConfirmClick} disabled={isSubmitting || !paymentUtr.trim()} className="w-full">
        {isSubmitting ? 'Submitting…' : 'Confirm payment'}
      </Button>

      <dialog
        ref={confirmRef}
        aria-labelledby="confirm-payment-title"
        className="w-[calc(100%-2rem)] max-w-md rounded-[12px] border border-[#2a2d2e] bg-surface p-6 text-soft-white backdrop:bg-bg/80"
      >
        <h4 id="confirm-payment-title" className="text-lg font-semibold">Submit these payment details?</h4>
        <p className="mt-2 text-sm text-muted-grey">You can’t change them after submitting. Check they match your UPI app.</p>
        <dl className="mt-5 space-y-2 text-sm">
          <div className="flex justify-between gap-4">
            <dt className="text-muted-grey">Amount paid</dt>
            <dd className="font-semibold">₹{finalAmount}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-muted-grey">UTR</dt>
            <dd className="font-semibold tracking-wider">{paymentUtr}</dd>
          </div>
          {couponApplied && (
            <div className="flex justify-between gap-4">
              <dt className="text-muted-grey">Coupon</dt>
              <dd className="font-semibold">{couponApplied.code}</dd>
            </div>
          )}
        </dl>
        <div className="mt-6 flex justify-end gap-3">
          <Button type="button" variant="outline" onClick={() => confirmRef.current?.close()}>
            Go back
          </Button>
          <Button type="button" onClick={handleSubmitPayment}>
            Submit
          </Button>
        </div>
      </dialog>

      <p className="text-center text-xs leading-relaxed text-muted-grey">
        The team checks payments within 24 hours and confirms your seat by email.
      </p>
    </div>
  );
}
