'use client';

import dynamic from 'next/dynamic';
import type { ComponentProps } from 'react';
import type DarkVeilComponent from './DarkVeil';

const DarkVeil = dynamic(() => import('./DarkVeil'), { ssr: false });

export default function DarkVeilWrapper(props: ComponentProps<typeof DarkVeilComponent>) {
  return <DarkVeil {...props} />;
}
