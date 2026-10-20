import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { PortfolioStatus, EventCategory } from '@/types/schema';

export interface BadgeProps {
  children?: React.ReactNode;
  status?: PortfolioStatus;
  category?: EventCategory;
  variant?: 'default' | 'outline' | 'accent' | 'muted';
  className?: string;
}

export function Badge({
  children,
  status,
  category,
  variant = 'default',
  className,
}: BadgeProps) {
  let badgeStyles = 'inline-flex items-center text-xs px-2.5 py-0.5 rounded-sm font-medium tracking-wide uppercase';

  if (status) {
    switch (status) {
      case 'AVAILABLE':
        badgeStyles = twMerge(
          badgeStyles,
          'bg-surface text-soft-white border border-[#2a2f32]'
        );
        return <span className={twMerge(badgeStyles, className)}>{children || 'AVAILABLE'}</span>;
      case 'RESERVED':
        badgeStyles = twMerge(
          badgeStyles,
          'bg-[#191C1E] text-muted-grey border border-[#262B2E]'
        );
        return <span className={twMerge(badgeStyles, className)}>{children || 'RESERVED'}</span>;
      case 'ALLOCATED':
        badgeStyles = twMerge(
          badgeStyles,
          'bg-[#1F1B15] text-warm-bronze border border-[#3A3022]'
        );
        return <span className={twMerge(badgeStyles, className)}>{children || 'ALLOCATED'}</span>;
    }
  }

  if (category) {
    return (
      <span
        className={twMerge(
          badgeStyles,
          'bg-surface text-soft-white border border-[#222729]',
          className
        )}
      >
        {category}
      </span>
    );
  }

  const variants = {
    default: 'bg-surface text-soft-white border border-[#222729]',
    outline: 'bg-transparent text-muted-grey border border-[#222729]',
    accent: 'bg-[#1F1B15] text-warm-bronze border border-[#3A3022]',
    muted: 'bg-[#141718] text-muted-grey',
  };

  return (
    <span className={twMerge(clsx(badgeStyles, variants[variant], className))}>
      {children}
    </span>
  );
}
