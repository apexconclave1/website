'use client';

import { useEffect, useState, useRef } from 'react';
import LineSidebar from '@/components/ui/LineSidebar';

export interface SectionItem {
  id: string;
  label: string;
}

export interface SectionNavigatorProps {
  sections: SectionItem[];
  className?: string;
  position?: 'left' | 'right';
}

export default function SectionNavigator({
  sections,
  className = '',
  position = 'left',
}: SectionNavigatorProps) {
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [mounted, setMounted] = useState(false);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setMounted(true);

    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = sections.findIndex((s) => s.id === entry.target.id);
          if (index !== -1) {
            setActiveIdx(index);
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      root: null,
      rootMargin: '-25% 0px -35% 0px',
      threshold: 0,
    });

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sections]);

  const handleItemClick = (index: number) => {
    const targetId = sections[index]?.id;
    if (targetId) {
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const handleMouseEnter = () => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    hoverTimeoutRef.current = setTimeout(() => {
      setIsHovered(false);
    }, 120);
  };

  if (!mounted) return null;

  return (
    <aside
      className={`hidden lg:block ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        position: 'fixed',
        [position]: '1.5rem',
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 90,
        pointerEvents: 'auto',
      }}
      aria-label="Section navigation sidebar"
    >
      <div
        style={{
          backgroundColor: isHovered ? 'rgb(var(--c-soft) / 0.05)' : 'transparent',
          padding: isHovered ? '0.75rem 1.15rem 0.75rem 0.5rem' : '0.25rem 0',
          borderRadius: '8px',
          border: isHovered ? '1px solid rgb(var(--c-soft) / 0.15)' : '1px solid transparent',
          transition: 'all 240ms cubic-bezier(0.16, 1, 0.3, 1)',
          cursor: 'pointer',
          width: 'fit-content',
        }}
      >
        <LineSidebar
          items={sections.map((s) => s.label)}
          activeControlled={activeIdx}
          isCollapsed={!isHovered}
          accentColor="rgb(var(--c-accent))"
          textColor="rgb(var(--c-soft))"
          markerColor="rgb(var(--c-accent) / 0.35)"
          showIndex={true}
          showMarker={true}
          proximityRadius={isHovered ? 100 : 40}
          maxShift={isHovered ? 14 : 0}
          markerLength={isHovered ? 36 : 18}
          itemGap={isHovered ? 12 : 10}
          fontSize={0.75}
          onItemClick={handleItemClick}
        />
      </div>
    </aside>
  );
}
