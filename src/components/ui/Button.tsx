import React from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'accent' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  className?: string;
}

const baseStyles =
  'inline-flex items-center justify-center font-medium transition duration-150 ease-out focus:outline-none focus:ring-1 focus:ring-warm-bronze max-md:min-h-11 rounded disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer select-none enabled:active:scale-[0.98]';

const variants = {
  primary: 'bg-soft-white text-bg hover:bg-[#E2DFD7] border border-transparent font-semibold',
  secondary: 'bg-surface text-soft-white hover:bg-[#1C2022] border border-[#222729]',
  outline: 'bg-transparent text-soft-white border border-[#2a2f32] hover:border-soft-white hover:bg-surface',
  accent: 'bg-warm-bronze text-bg hover:bg-[#B5905B] font-semibold border border-transparent',
  ghost: 'bg-transparent text-muted-grey hover:text-soft-white hover:bg-surface',
};

const sizes = {
  sm: 'text-xs px-3 py-1.5 gap-1.5',
  md: 'text-sm px-4 py-2 gap-2',
  lg: 'text-base px-6 py-3 gap-2.5',
};

// Tap feedback is CSS (active:scale); the global reduced-motion rule turns its transition off.
export function Button({ variant = 'primary', size = 'md', children, className, ...props }: ButtonProps) {
  return (
    <button className={cn(baseStyles, variants[variant], sizes[size], className)} {...props}>
      {children}
    </button>
  );
}
