'use client';

import { useState, useRef } from 'react';
import {
  QrCode,
  Copy,
  Check,
  Tag,
  Upload,
  AlertCircle,
  Loader2,
  ArrowRight,
  X,
  IndianRupee,
} from 'lucide-react';
import { REGISTRATION_FEE } from '@/lib/validators/registration';

interface StepPaymentProps {
  registrationId: number;
  trackingCode: string;
  onPaymentComplete: (result: {
    trackingCode: string;
    status: string;
    finalAmount: number;
  }) => void;
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '0.7rem 0.85rem',
  borderRadius: '6px',
  border: '1px solid rgba(205, 199, 192, 0.2)',
  backgroundColor: 'rgba(15, 18, 24, 0.6)',
  color: '#F4F1EA',
  fontFamily: "var(--font-inter), system-ui, sans-serif",
  fontSize: '0.875rem',
  outline: 'none',
  transition: 'border-color 200ms ease',
};

const labelStyle: React.CSSProperties = {
  fontFamily: "var(--font-inter), system-ui, sans-serif",
  fontSize: '0.75rem',
  fontWeight: 600,
  color: '#CDC7C0',
  letterSpacing: '0.05em',
  textTransform: 'uppercase' as const,
  marginBottom: '0.4rem',
  display: 'block',
};

export default function StepPayment({
  registrationId,
  trackingCode,
  onPaymentComplete,
}: StepPaymentProps) {
  const [couponCode, setCouponCode] = useState('');
  const [couponApplied, setCouponApplied] = useState<{
    code: string;
    discount: number;
  } | null>(null);
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

  const finalAmount = couponApplied
    ? REGISTRATION_FEE.STANDARD - couponApplied.discount
    : REGISTRATION_FEE.STANDARD;

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
        setCouponApplied({
          code: data.couponCode,
          discount: data.discountAmount,
        });
        setCouponError('');
      } else {
        setCouponError(data.error || 'Invalid coupon code.');
        setCouponApplied(null);
      }
    } catch {
      setCouponError('Failed to validate coupon. Please try again.');
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

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      setSubmitError('Screenshot must be a JPEG, PNG, or WebP image.');
      return;
    }

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      setSubmitError('Screenshot must be under 5MB.');
      return;
    }

    setScreenshotFile(file);
    setSubmitError('');

    // Create preview
    const reader = new FileReader();
    reader.onload = (ev) => {
      setScreenshotPreview(ev.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveScreenshot = () => {
    setScreenshotFile(null);
    setScreenshotPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const copyUpiId = async () => {
    try {
      await navigator.clipboard.writeText('diplovia@demo');
      setUpiCopied(true);
      setTimeout(() => setUpiCopied(false), 2000);
    } catch {
      // Fallback - do nothing
    }
  };

  const handleSubmitPayment = async () => {
    // Validate UTR
    const utrRegex = /^[A-Za-z0-9]{8,30}$/;
    if (!paymentUtr.trim()) {
      setUtrError('Please enter your UTR / Transaction Reference Number.');
      return;
    }
    if (!utrRegex.test(paymentUtr.trim())) {
      setUtrError('UTR must be 8–30 alphanumeric characters.');
      return;
    }

    setUtrError('');
    setSubmitError('');
    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append('registrationId', String(registrationId));
      formData.append('trackingCode', trackingCode);
      formData.append('paymentUtr', paymentUtr.trim());
      formData.append('finalAmount', String(finalAmount));

      if (couponApplied) {
        formData.append('couponCode', couponApplied.code);
      }

      if (screenshotFile) {
        formData.append('screenshot', screenshotFile);
      }

      const res = await fetch('/api/register/payment', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (res.ok && data.success) {
        onPaymentComplete({
          trackingCode: data.trackingCode,
          status: data.status,
          finalAmount: data.finalAmount,
        });
      } else {
        setSubmitError(data.error || 'Failed to submit payment details. Please try again.');
      }
    } catch {
      setSubmitError('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Section Header */}
      <div>
        <h2
          style={{
            fontFamily: "var(--font-inter), system-ui, sans-serif",
            fontSize: '1.5rem',
            fontWeight: 400,
            color: '#F4F1EA',
            marginBottom: '0.5rem',
          }}
        >
          Complete Your Registration
        </h2>
        <p
          style={{
            fontFamily: "var(--font-inter), system-ui, sans-serif",
            fontSize: '0.8125rem',
            color: '#9A9490',
            lineHeight: 1.65,
          }}
        >
          Your application has been recorded with tracking code{' '}
          <span style={{ color: '#C7A16A', fontWeight: 600 }}>{trackingCode}</span>.
          Complete the payment below to secure your portfolio allotment.
        </p>
      </div>

      {/* Fee Summary Card */}
      <div
        style={{
          padding: '1.25rem',
          borderRadius: '8px',
          backgroundColor: 'rgba(199, 161, 106, 0.08)',
          border: '1px solid rgba(199, 161, 106, 0.2)',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: couponApplied ? '0.75rem' : 0,
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-inter), system-ui, sans-serif",
              fontSize: '0.8125rem',
              color: '#CDC7C0',
              fontWeight: 500,
            }}
          >
            Delegate Registration Fee
          </span>
          <span
            style={{
              fontFamily: "var(--font-inter), system-ui, sans-serif",
              fontSize: '1.125rem',
              fontWeight: 700,
              color: couponApplied ? '#9A9490' : '#F4F1EA',
              textDecoration: couponApplied ? 'line-through' : 'none',
            }}
          >
            ₹{REGISTRATION_FEE.STANDARD}
          </span>
        </div>

        {couponApplied && (
          <>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '0.75rem',
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-inter), system-ui, sans-serif",
                  fontSize: '0.75rem',
                  color: '#6FCF97',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.3rem',
                }}
              >
                <Tag size={12} /> Coupon {couponApplied.code} applied
              </span>
              <span
                style={{
                  fontFamily: "var(--font-inter), system-ui, sans-serif",
                  fontSize: '0.875rem',
                  color: '#6FCF97',
                }}
              >
                −₹{couponApplied.discount}
              </span>
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingTop: '0.75rem',
                borderTop: '1px solid rgba(199, 161, 106, 0.15)',
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-inter), system-ui, sans-serif",
                  fontSize: '0.875rem',
                  color: '#F4F1EA',
                  fontWeight: 700,
                }}
              >
                Amount Payable
              </span>
              <span
                style={{
                  fontFamily: "var(--font-inter), system-ui, sans-serif",
                  fontSize: '1.25rem',
                  fontWeight: 800,
                  color: '#C7A16A',
                }}
              >
                ₹{finalAmount}
              </span>
            </div>
          </>
        )}
      </div>

      {/* Coupon Code Section */}
      <div>
        <label style={labelStyle}>
          Have a Coupon Code?
        </label>
        {couponApplied ? (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0.65rem 0.85rem',
              borderRadius: '6px',
              backgroundColor: 'rgba(111, 207, 151, 0.08)',
              border: '1px solid rgba(111, 207, 151, 0.3)',
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-inter), system-ui, sans-serif",
                fontSize: '0.8125rem',
                color: '#6FCF97',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem',
              }}
            >
              <Check size={14} /> {couponApplied.code} — ₹{couponApplied.discount} off
            </span>
            <button
              type="button"
              onClick={handleRemoveCoupon}
              style={{
                background: 'none',
                border: 'none',
                color: '#9A9490',
                cursor: 'pointer',
                padding: '0.15rem',
                display: 'flex',
                alignItems: 'center',
              }}
              aria-label="Remove coupon"
            >
              <X size={14} />
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <input
              type="text"
              placeholder="Enter coupon code"
              value={couponCode}
              onChange={(e) => {
                setCouponCode(e.target.value.toUpperCase());
                setCouponError('');
              }}
              onKeyDown={(e) => e.key === 'Enter' && handleApplyCoupon()}
              style={{
                ...inputStyle,
                flex: 1,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
              }}
            />
            <button
              type="button"
              onClick={handleApplyCoupon}
              disabled={couponLoading || !couponCode.trim()}
              className="btn-tactile"
              style={{
                padding: '0.7rem 1rem',
                borderRadius: '6px',
                border: '1px solid rgba(199, 161, 106, 0.4)',
                backgroundColor: 'rgba(199, 161, 106, 0.12)',
                color: '#C7A16A',
                fontFamily: "var(--font-inter), system-ui, sans-serif",
                fontSize: '0.75rem',
                fontWeight: 700,
                letterSpacing: '0.05em',
                cursor: couponLoading || !couponCode.trim() ? 'not-allowed' : 'pointer',
                opacity: couponLoading || !couponCode.trim() ? 0.5 : 1,
                whiteSpace: 'nowrap',
                display: 'flex',
                alignItems: 'center',
                gap: '0.3rem',
              }}
            >
              {couponLoading ? <Loader2 size={13} className="animate-spin" /> : <Tag size={13} />}
              Apply
            </button>
          </div>
        )}
        {couponError && (
          <p
            style={{
              fontFamily: "var(--font-inter), system-ui, sans-serif",
              fontSize: '0.75rem',
              color: '#E57373',
              marginTop: '0.35rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.25rem',
            }}
          >
            <AlertCircle size={12} /> {couponError}
          </p>
        )}
      </div>

      {/* UPI QR Code Section */}
      <div
        style={{
          padding: '1.5rem',
          borderRadius: '10px',
          backgroundColor: 'rgba(10, 13, 18, 0.5)',
          border: '1px solid rgba(205, 199, 192, 0.12)',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.35rem',
            padding: '0.3rem 0.7rem',
            borderRadius: '14px',
            backgroundColor: 'rgba(199, 161, 106, 0.1)',
            border: '1px solid rgba(199, 161, 106, 0.2)',
            marginBottom: '1rem',
          }}
        >
          <QrCode size={12} color="#C7A16A" />
          <span
            style={{
              fontFamily: "var(--font-inter), system-ui, sans-serif",
              fontSize: '0.625rem',
              fontWeight: 700,
              letterSpacing: '0.12em',
              color: '#C7A16A',
              textTransform: 'uppercase',
            }}
          >
            Scan to Pay
          </span>
        </div>

        {/* QR Code Image */}
        <div
          style={{
            width: '200px',
            height: '200px',
            margin: '0 auto 1rem',
            borderRadius: '10px',
            overflow: 'hidden',
            backgroundColor: '#fff',
            padding: '8px',
          }}
        >
          <img
            src="/payment/upi-qr.jpg"
            alt="DIPLOVIA UPI QR Code for payment"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              borderRadius: '6px',
            }}
          />
        </div>

        {/* Amount Badge */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.25rem',
            padding: '0.4rem 1rem',
            borderRadius: '20px',
            backgroundColor: 'rgba(199, 161, 106, 0.15)',
            border: '1px solid rgba(199, 161, 106, 0.3)',
            marginBottom: '1rem',
          }}
        >
          <IndianRupee size={14} color="#C7A16A" />
          <span
            style={{
              fontFamily: "var(--font-inter), system-ui, sans-serif",
              fontSize: '1.125rem',
              fontWeight: 800,
              color: '#C7A16A',
            }}
          >
            {finalAmount}
          </span>
        </div>

        {/* UPI ID */}
        <div style={{ marginTop: '0.5rem' }}>
          <p
            style={{
              fontFamily: "var(--font-inter), system-ui, sans-serif",
              fontSize: '0.6875rem',
              color: '#9A9490',
              marginBottom: '0.35rem',
            }}
          >
            Or pay using UPI ID
          </p>
          <button
            type="button"
            onClick={copyUpiId}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.45rem 0.85rem',
              borderRadius: '6px',
              border: '1px solid rgba(205, 199, 192, 0.2)',
              backgroundColor: 'rgba(15, 18, 24, 0.6)',
              color: '#F4F1EA',
              fontFamily: "var(--font-inter), system-ui, sans-serif",
              fontSize: '0.8125rem',
              fontWeight: 600,
              letterSpacing: '0.03em',
              cursor: 'pointer',
              transition: 'border-color 200ms ease',
            }}
          >
            diplovia@demo
            {upiCopied ? (
              <Check size={13} color="#6FCF97" />
            ) : (
              <Copy size={13} color="#9A9490" />
            )}
          </button>
        </div>
      </div>

      {/* UTR Input */}
      <div>
        <label style={labelStyle}>
          UTR / Transaction Reference Number *
        </label>
        <input
          type="text"
          placeholder="e.g., 425619287345"
          value={paymentUtr}
          onChange={(e) => {
            const val = e.target.value.replace(/[^A-Za-z0-9]/g, '');
            setPaymentUtr(val);
            setUtrError('');
          }}
          maxLength={30}
          style={{
            ...inputStyle,
            borderColor: utrError ? 'rgba(229, 115, 115, 0.5)' : undefined,
            letterSpacing: '0.06em',
          }}
        />
        {utrError ? (
          <p
            style={{
              fontFamily: "var(--font-inter), system-ui, sans-serif",
              fontSize: '0.75rem',
              color: '#E57373',
              marginTop: '0.3rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.25rem',
            }}
          >
            <AlertCircle size={12} /> {utrError}
          </p>
        ) : (
          <p
            style={{
              fontFamily: "var(--font-inter), system-ui, sans-serif",
              fontSize: '0.6875rem',
              color: '#8A8480',
              marginTop: '0.3rem',
            }}
          >
            Find this in your UPI app under transaction details after payment
          </p>
        )}
      </div>

      {/* Screenshot Upload */}
      <div>
        <label style={labelStyle}>
          Payment Screenshot (Optional)
        </label>
        {screenshotPreview ? (
          <div
            style={{
              position: 'relative',
              width: '160px',
              height: '160px',
              borderRadius: '8px',
              overflow: 'hidden',
              border: '1px solid rgba(205, 199, 192, 0.15)',
            }}
          >
            <img
              src={screenshotPreview}
              alt="Payment proof preview"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
            <button
              type="button"
              onClick={handleRemoveScreenshot}
              style={{
                position: 'absolute',
                top: '6px',
                right: '6px',
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                border: 'none',
                color: '#F4F1EA',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              aria-label="Remove screenshot"
            >
              <X size={12} />
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="btn-tactile"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              width: '100%',
              padding: '1.25rem',
              borderRadius: '8px',
              border: '2px dashed rgba(205, 199, 192, 0.15)',
              backgroundColor: 'transparent',
              color: '#9A9490',
              fontFamily: "var(--font-inter), system-ui, sans-serif",
              fontSize: '0.8125rem',
              cursor: 'pointer',
              transition: 'border-color 200ms ease, color 200ms ease',
            }}
          >
            <Upload size={16} />
            Upload screenshot of your UPI payment
          </button>
        )}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />
      </div>

      {/* Error Message */}
      {submitError && (
        <div
          style={{
            padding: '0.75rem 1rem',
            borderRadius: '6px',
            backgroundColor: 'rgba(229, 115, 115, 0.1)',
            border: '1px solid rgba(229, 115, 115, 0.25)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}
        >
          <AlertCircle size={14} color="#E57373" />
          <span
            style={{
              fontFamily: "var(--font-inter), system-ui, sans-serif",
              fontSize: '0.8125rem',
              color: '#E57373',
            }}
          >
            {submitError}
          </span>
        </div>
      )}

      {/* Submit Button */}
      <button
        type="button"
        onClick={handleSubmitPayment}
        disabled={isSubmitting || !paymentUtr.trim()}
        className="btn-tactile"
        style={{
          padding: '0.85rem 1.5rem',
          borderRadius: '8px',
          backgroundColor: isSubmitting || !paymentUtr.trim() ? 'rgba(199, 161, 106, 0.4)' : '#C7A16A',
          color: '#1A1D1F',
          fontFamily: "var(--font-inter), system-ui, sans-serif",
          fontSize: '0.875rem',
          fontWeight: 700,
          letterSpacing: '0.05em',
          border: 'none',
          cursor: isSubmitting || !paymentUtr.trim() ? 'not-allowed' : 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.5rem',
          boxShadow: '0 6px 20px -4px rgba(199, 161, 106, 0.35)',
          width: '100%',
        }}
      >
        {isSubmitting ? (
          <>
            <Loader2 size={16} className="animate-spin" /> Submitting Payment Details...
          </>
        ) : (
          <>
            Confirm Payment & Complete Registration <ArrowRight size={15} />
          </>
        )}
      </button>

      {/* Verification Note */}
      <p
        style={{
          fontFamily: "var(--font-inter), system-ui, sans-serif",
          fontSize: '0.6875rem',
          color: '#8A8480',
          textAlign: 'center',
          lineHeight: 1.65,
        }}
      >
        Your payment will be verified by the Secretariat within 24 hours.
        You will receive a confirmation email at the address provided in your application.
      </p>
    </div>
  );
}
