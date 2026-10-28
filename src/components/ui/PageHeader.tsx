import type { ReactNode } from 'react';

/**
 * Header for inner pages: the brand's hero gradient with the fine grid, label, oversized title and an optional
 * right-hand column (intro, buttons). Rises in on load. Sits under the transparent navbar, so it has its own top padding.
 */
export function PageHeader({ eyebrow, title, aside }: { eyebrow: string; title: ReactNode; aside?: ReactNode }) {
  return (
    <header className="relative isolate overflow-hidden border-b border-soft/15 bg-hero">
      <div aria-hidden="true" className="texture-grid absolute inset-0 -z-10" />
      <div className="mx-auto grid max-w-container gap-8 px-6 pb-14 pt-32 md:pb-20 md:pt-44 lg:grid-cols-12 lg:items-end lg:gap-10">
        <div className="lg:col-span-7">
          <p className="eyebrow rise-in mb-5">{eyebrow}</p>
          <h1 className="rise-in max-w-[16ch] text-[2.75rem] font-medium leading-[1] text-bright md:text-7xl" style={{ animationDelay: '80ms' }}>
            {title}
          </h1>
        </div>
        {aside && (
          <div className="rise-in text-base leading-relaxed text-soft md:text-lg lg:col-span-5" style={{ animationDelay: '160ms' }}>
            {aside}
          </div>
        )}
      </div>
    </header>
  );
}
