import React from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'accent' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  className?: string;
}

const baseStyles =
  'inline-flex items-center justify-center font-medium transition duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-bright focus-visible:ring-offset-2 focus-visible:ring-offset-ground max-md:min-h-11 rounded disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer select-none enabled:active:scale-[0.98]';

const variants = {
  primary: 'bg-accent text-on-accent hover:bg-bright border border-transparent font-semibold',
  secondary: 'bg-ground text-bright hover:border-accent hover:text-accent border border-soft/35',
  outline: 'bg-transparent text-bright border border-soft/25 hover:border-bright hover:bg-soft/5',
  accent: 'bg-accent text-on-accent hover:bg-bright font-semibold border border-transparent',
  ghost: 'bg-transparent text-soft hover:text-bright hover:bg-soft/5',
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
