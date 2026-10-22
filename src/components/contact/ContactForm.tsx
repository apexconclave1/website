'use client';

import { useState } from 'react';
import { contactCategories as categories, contactSchema, type ContactFields } from '@/lib/validators/contact';
import { Button } from '@/components/ui/Button';
import { track } from '@vercel/analytics';

type FieldErrors = Partial<Record<keyof ContactFields, string>>;
type SubmitState = 'idle' | 'submitting' | 'success' | 'error';
type Category = ContactFields['category'];

const emptyForm = (category: Category): ContactFields => ({
  name: '',
  email: '',
  phone: '',
  institution: '',
  category,
  subject: '',
  message: '',
});

export default function ContactForm({ defaultCategory }: { defaultCategory?: string }) {
  const initialCategory: Category = (categories as readonly string[]).includes(defaultCategory ?? '')
    ? (defaultCategory as Category)
    : 'General Inquiry';
  const [form, setForm] = useState<ContactFields>(emptyForm(initialCategory));
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitState, setSubmitState] = useState<SubmitState>('idle');

  const update = <K extends keyof ContactFields>(key: K, value: ContactFields[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = contactSchema.safeParse(form);
    if (!parsed.success) {
      const fieldErrors: FieldErrors = {};
      parsed.error.issues.forEach((issue) => {
        fieldErrors[issue.path[0] as keyof ContactFields] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    setSubmitState('submitting');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(parsed.data),
      });
      if (!res.ok) throw new Error('Server error');
      setSubmitState('success');
      track('contact_sent', { category: parsed.data.category });
      setForm(emptyForm(initialCategory));
    } catch {
      setSubmitState('error');
    }
  };

  if (submitState === 'success') {
    return (
      <div role="status" aria-live="polite" className="panel p-10 text-center">
        <h3 className="mb-2 text-xl font-semibold text-cream">Message received</h3>
        <p className="text-sm text-cream/70">Thanks for writing. We reply within 48 hours.</p>
      </div>
    );
  }

  const input = (
    key: 'name' | 'email' | 'phone' | 'institution' | 'subject',
    label: string,
    autoComplete: string,
    type = 'text'
  ) => (
    <div>
      <label htmlFor={`contact-${key}`} className="field-label">
        {label}
      </label>
      <input
        id={`contact-${key}`}
        type={type}
        autoComplete={autoComplete}
        value={form[key] ?? ''}
        onChange={(e) => update(key, e.target.value)}
        aria-invalid={!!errors[key]}
        aria-describedby={errors[key] ? `${key}-error` : undefined}
        className="field-input"
      />
      {errors[key] && (
        <p id={`${key}-error`} className="field-error">
          {errors[key]}
        </p>
      )}
    </div>
  );

  return (
    <form onSubmit={handleSubmit} noValidate aria-label="Contact Apex Conclave" className="panel flex flex-col gap-5 md:p-8">
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {input('name', 'Name *', 'name')}
        {input('email', 'Email *', 'email', 'email')}
        {input('phone', 'Phone (optional)', 'tel', 'tel')}
        {input('institution', 'School / college / company (optional)', 'organization')}
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <div>
          <label htmlFor="contact-category" className="field-label">
            Topic *
          </label>
          <select
            id="contact-category"
            value={form.category}
            onChange={(e) => update('category', e.target.value as Category)}
            className="field-input"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
        {input('subject', 'Subject *', 'off')}
      </div>

      <div>
        <label htmlFor="contact-message" className="field-label">
          Message *
        </label>
        <textarea
          id="contact-message"
          rows={6}
          maxLength={1000}
          value={form.message}
          onChange={(e) => update('message', e.target.value)}
          aria-invalid={!!errors.message}
          aria-describedby="message-help"
          className="field-input resize-y leading-relaxed"
        />
        <div id="message-help" className="mt-1.5 flex justify-between gap-4 text-xs">
          <span className="text-[#E06C75]">{errors.message}</span>
          <span className="shrink-0 text-cream/70">{form.message.length} / 1000</span>
        </div>
      </div>

      {submitState === 'error' && (
        <p role="alert" className="rounded-sm border border-[#E06C75] px-4 py-3 text-sm text-[#E06C75]">
          Your message could not be sent. Please try again or email us directly.
        </p>
      )}

      <Button type="submit" size="lg" disabled={submitState === 'submitting'} className="w-full md:w-auto md:self-start">
        {submitState === 'submitting' ? 'Sending…' : 'Send message'}
      </Button>
    </form>
  );
}
