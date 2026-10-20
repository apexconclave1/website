'use client';

import { motion, useScroll, useSpring, SpringOptions } from 'framer-motion';
import { cn } from '@/lib/utils';
import React from 'react';

export type ScrollProgressProps = {
  className?: string;
  springOptions?: SpringOptions;
};

export function ScrollProgress({
  className,
  springOptions = {
    stiffness: 280,
    damping: 30,
    restDelta: 0.001,
  },
}: ScrollProgressProps) {
  const { scrollYProgress } = useScroll();

  const scaleX = useSpring(scrollYProgress, springOptions);

  return (
    <motion.div
      className={cn(
        'fixed inset-x-0 top-0 z-[100] h-[2px] origin-left bg-[#F4F2ED] pointer-events-none',
        className
      )}
      style={{
        scaleX,
      }}
    />
  );
}

export default ScrollProgress;
