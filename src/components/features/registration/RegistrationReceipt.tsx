'use client';

import { useState } from 'react';
import Link from 'next/link';
import { EventEntity } from '@/types/schema';
import { Button } from '@/components/ui/Button';

interface RegistrationReceiptProps {
  event: EventEntity;
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
  paymentStatus?: string;
  amountPaid?: number;
  onNewRegistration: () => void;
}

/** Google Calendar link, only when the event has dates (all-day, end date exclusive). */
function calendarUrl(event: EventEntity): string | null {
  if (!event.startDate) return null;
  const end = new Date(`${event.endDate ?? event.startDate}T00:00:00Z`);
  end.setUTCDate(end.getUTCDate() + 1);
  const ymd = (d: string) => d.replace(/-/g, '');
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: event.title,
    dates: `${ymd(event.startDate)}/${ymd(end.toISOString().slice(0, 10))}`,
    details: event.shortDescription,
    location: event.location.venue,
  });
  return `https://calendar.google.com/calendar/render?${params}`;
}

export default function RegistrationReceipt({
  event,
  trackingCode,
  submittedAt,
  allotment,
  paymentStatus,
  amountPaid,
  onNewRegistration,
}: RegistrationReceiptProps) {
  const [copied, setCopied] = useState(false);
  const paid = paymentStatus === 'PAYMENT_SUBMITTED';
  const calendar = calendarUrl(event);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(trackingCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard blocked: the code is visible on screen
    }
  };

  const formattedDate = new Date(submittedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });

  const rows: [string, string][] = [
    ['First preference', `${allotment.committee} — ${allotment.country}`],
    ['Name', allotment.delegateName],
    ['Track', allotment.track === 'HIGH_SCHOOL' ? 'High school' : 'College'],
    ['Submitted', formattedDate],
    ...(amountPaid !== undefined ? ([['Amount', `₹${amountPaid}`]] as [string, string][]) : []),
    ['Status', paid ? 'Payment being verified' : 'Awaiting payment'],
  ];

  return (
    <div className="flex flex-col items-center gap-8 text-center">
      <div>
        <p className="eyebrow mb-2">{paid ? 'Payment submitted' : 'Application saved'}</p>
        <h2 className="text-3xl font-normal text-bright md:text-4xl">
          {paid ? 'You’re registered. We’re checking your payment.' : 'Application saved.'}
        </h2>
        <p className="mx-auto mt-3 max-w-[52ch] text-sm leading-relaxed text-soft">
          {paid
            ? 'The team verifies payments within 24 hours, assigns your seat and confirms it by email.'
            : 'Complete the payment to finish your registration.'}
        </p>
      </div>

      <div className="panel w-full max-w-[540px] text-left">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-soft/25 pb-4">
          <div>
            <p className="text-xs text-soft">Tracking code (keep it for any query)</p>
            <p className="mt-1 text-lg font-bold tracking-wider text-bright">{trackingCode}</p>
          </div>
          <Button type="button" variant="outline" size="sm" onClick={handleCopy}>
            {copied ? 'Copied' : 'Copy code'}
          </Button>
        </div>
        <dl className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {rows.map(([label, value]) => (
            <div key={label}>
              <dt className="text-xs text-soft">{label}</dt>
              <dd className="mt-0.5 text-sm font-medium text-bright">{value}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="flex flex-wrap justify-center gap-4">
        {calendar && (
          <a
            href={calendar}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary"
          >
            Add to calendar
          </a>
        )}
        <Link
          href={`/events/${event.slug}#committees`}
          className="btn-primary"
        >
          Read about the committees
        </Link>
      </div>

      <button type="button" onClick={onNewRegistration} className="text-xs text-soft underline underline-offset-4 hover:text-bright">
        Register another delegate
      </button>
    </div>
  );
}
