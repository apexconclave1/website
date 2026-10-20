import React from 'react';
import { cn } from '@/lib/utils';
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
        badgeStyles = cn(
          badgeStyles,
          'bg-surface text-soft-white border border-[#2a2f32]'
        );
        return <span className={cn(badgeStyles, className)}>{children || 'AVAILABLE'}</span>;
      case 'RESERVED':
        badgeStyles = cn(
          badgeStyles,
          'bg-[#191C1E] text-muted-grey border border-[#262B2E]'
        );
        return <span className={cn(badgeStyles, className)}>{children || 'RESERVED'}</span>;
      case 'ALLOCATED':
        badgeStyles = cn(
          badgeStyles,
          'bg-[#1F1B15] text-warm-bronze border border-[#3A3022]'
        );
        return <span className={cn(badgeStyles, className)}>{children || 'ALLOCATED'}</span>;
    }
  }

  if (category) {
    return (
      <span
        className={cn(
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
    <span className={cn(badgeStyles, variants[variant], className)}>
      {children}
    </span>
  );
}
