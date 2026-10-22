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
          'bg-ink text-cream border border-cream/20'
        );
        return <span className={cn(badgeStyles, className)}>{children || 'AVAILABLE'}</span>;
      case 'RESERVED':
        badgeStyles = cn(
          badgeStyles,
          'bg-ink text-cream/70 border border-cream/15'
        );
        return <span className={cn(badgeStyles, className)}>{children || 'RESERVED'}</span>;
      case 'ALLOCATED':
        badgeStyles = cn(
          badgeStyles,
          'bg-ink text-bronze border border-bronze/40'
        );
        return <span className={cn(badgeStyles, className)}>{children || 'ALLOCATED'}</span>;
    }
  }

  if (category) {
    return (
      <span
        className={cn(
          badgeStyles,
          'bg-ink text-cream border border-cream/15',
          className
        )}
      >
        {category}
      </span>
    );
  }

  const variants = {
    default: 'bg-ink text-cream border border-cream/15',
    outline: 'bg-transparent text-cream/70 border border-cream/15',
    accent: 'bg-ink text-bronze border border-bronze/40',
    muted: 'bg-cream/5 text-cream/70',
  };

  return (
    <span className={cn(badgeStyles, variants[variant], className)}>
      {children}
    </span>
  );
}
