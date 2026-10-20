'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import type { FaqItem } from '@/lib/data/faqs';

export default function FAQAccordion({ items }: { items: FaqItem[] }) {
  const categories = Array.from(new Set(items.map((f) => f.category)));
  const [openId, setOpenId] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState(categories[0]);

  const filtered = items.filter((f) => f.category === activeCategory);

  return (
    <div>
      {categories.length > 1 && (
        <div role="tablist" aria-label="FAQ categories" className="mb-8 flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              role="tab"
              aria-selected={activeCategory === cat}
              id={`faq-tab-${cat}`}
              onClick={() => {
                setActiveCategory(cat);
                setOpenId(null);
              }}
              className={`rounded-[10px] border px-4 py-2 text-xs font-medium uppercase tracking-wider transition-colors duration-200 ${
                activeCategory === cat
                  ? 'border-soft-white bg-soft-white text-bg'
                  : 'border-[#1a1d1e] bg-surface text-muted-grey hover:text-soft-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      <div role="tabpanel" aria-labelledby={`faq-tab-${activeCategory}`}>
        {filtered.map((faq) => {
          const isOpen = openId === faq.id;
          return (
            <div key={faq.id} className="border-b border-[#1a1d1e]">
              <button
                id={`faq-btn-${faq.id}`}
                aria-expanded={isOpen}
                aria-controls={`faq-panel-${faq.id}`}
                onClick={() => setOpenId(isOpen ? null : faq.id)}
                className="flex w-full items-center justify-between gap-4 py-5 text-left"
              >
                <span className={`text-base font-medium ${isOpen ? 'text-soft-white' : 'text-muted-grey'}`}>
                  {faq.q}
                </span>
                <ChevronDown
                  size={16}
                  className={`shrink-0 text-warm-bronze transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                />
              </button>
              {isOpen && (
                <div id={`faq-panel-${faq.id}`} role="region" aria-labelledby={`faq-btn-${faq.id}`} className="pb-6">
                  <p className="max-w-[65ch] text-sm leading-relaxed text-muted-grey">{faq.a}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
