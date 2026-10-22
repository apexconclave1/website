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
          'bg-ground text-bright border border-soft/25'
        );
        return <span className={cn(badgeStyles, className)}>{children || 'AVAILABLE'}</span>;
      case 'RESERVED':
        badgeStyles = cn(
          badgeStyles,
          'bg-ground text-soft border border-soft/20'
        );
        return <span className={cn(badgeStyles, className)}>{children || 'RESERVED'}</span>;
      case 'ALLOCATED':
        badgeStyles = cn(
          badgeStyles,
          'bg-ground text-accent border border-accent/40'
        );
        return <span className={cn(badgeStyles, className)}>{children || 'ALLOCATED'}</span>;
    }
  }

  if (category) {
    return (
      <span
        className={cn(
          badgeStyles,
          'bg-ground text-bright border border-soft/20',
          className
        )}
      >
        {category}
      </span>
    );
  }

  const variants = {
    default: 'bg-ground text-bright border border-soft/20',
    outline: 'bg-transparent text-soft border border-soft/20',
    accent: 'bg-ground text-accent border border-accent/40',
    muted: 'bg-soft/5 text-soft',
  };

  return (
    <span className={cn(badgeStyles, variants[variant], className)}>
      {children}
    </span>
  );
}
