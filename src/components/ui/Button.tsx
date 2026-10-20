'use client';

import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface ButtonProps extends HTMLMotionProps<'button'> {
  variant?: 'primary' | 'secondary' | 'outline' | 'accent' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  className?: string;
}

export function Button({
  variant = 'primary',
  size = 'md',
  children,
  className,
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles =
    'inline-flex items-center justify-center font-medium transition-colors focus:outline-none focus:ring-1 focus:ring-warm-bronze max-md:min-h-11 rounded disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer select-none';

  const variants = {
    primary:
      'bg-soft-white text-bg hover:bg-[#E2DFD7] border border-transparent font-semibold',
    secondary:
      'bg-surface text-soft-white hover:bg-[#1C2022] border border-[#222729]',
    outline:
      'bg-transparent text-soft-white border border-[#2a2f32] hover:border-soft-white hover:bg-surface',
    accent:
      'bg-warm-bronze text-bg hover:bg-[#B5905B] font-semibold border border-transparent',
    ghost:
      'bg-transparent text-muted-grey hover:text-soft-white hover:bg-surface',
  };

  const sizes = {
    sm: 'text-xs px-3 py-1.5 gap-1.5',
    md: 'text-sm px-4 py-2 gap-2',
    lg: 'text-base px-6 py-3 gap-2.5',
  };

  return (
    <motion.button
      whileTap={disabled ? undefined : { scale: 0.98 }}
      transition={{ duration: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={twMerge(clsx(baseStyles, variants[variant], sizes[size], className))}
      disabled={disabled}
      {...props}
    >
      {children}
    </motion.button>
  );
}
