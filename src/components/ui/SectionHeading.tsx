import React from 'react';
import { cn } from '@/lib/utils';

export interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
  /** Heading level; use 'h1' when the section heading is the page title */
  as?: 'h1' | 'h2';
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  className,
  as: Heading = 'h2',
}: SectionHeadingProps) {
  return (
    <div
      className={cn('rise space-y-3', align === 'center' ? 'text-center max-w-2xl mx-auto' : 'max-w-3xl', className)}
    >
      {eyebrow && (
        <p className="eyebrow">{eyebrow}</p>
      )}
      <Heading className="text-2xl md:text-4xl font-bold tracking-tight text-soft-white leading-tight">
        {title}
      </Heading>
      {description && (
        <p className="text-muted-grey text-base md:text-lg leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
