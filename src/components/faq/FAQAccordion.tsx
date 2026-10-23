'use client';

import { useState } from 'react';
import { Minus, Plus } from 'lucide-react';
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
              className={`min-h-11 rounded border px-4 py-2 text-xs font-medium uppercase tracking-wider transition-colors duration-200 ${
                activeCategory === cat
                  ? 'border-bright bg-bright text-deep'
                  : 'border-soft/15 bg-ground text-soft hover:text-bright'
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
            <div key={faq.id} className="border-b border-soft/15">
              <button
                id={`faq-btn-${faq.id}`}
                aria-expanded={isOpen}
                aria-controls={`faq-panel-${faq.id}`}
                onClick={() => setOpenId(isOpen ? null : faq.id)}
                className="flex w-full items-center justify-between gap-4 py-5 text-left"
              >
                <span className={`text-base font-medium ${isOpen ? 'text-bright' : 'text-soft'}`}>
                  {faq.q}
                </span>
                {isOpen ? (
                  <Minus size={16} aria-hidden className="shrink-0 text-accent" />
                ) : (
                  <Plus size={16} aria-hidden className="shrink-0 text-accent" />
                )}
              </button>
              {/* 0fr to 1fr animates height without measuring; invisible keeps closed answers out of tab order */}
              <div
                id={`faq-panel-${faq.id}`}
                role="region"
                aria-labelledby={`faq-btn-${faq.id}`}
                className={`grid transition-[grid-template-rows,visibility] duration-200 ${
                  isOpen ? 'visible grid-rows-[1fr]' : 'invisible grid-rows-[0fr]'
                }`}
              >
                <div className="overflow-hidden">
                  <p className="max-w-[65ch] pb-6 text-sm leading-relaxed text-soft">{faq.a}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
