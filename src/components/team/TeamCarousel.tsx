'use client';

import { useState } from 'react';
import DepthCarousel from '@/components/ui/DepthCarousel';

interface Member {
  name: string;
  role: string;
  photo: string;
  bio: string;
  linkedin?: string;
}

/** Home Team section: photos in the DepthCarousel, the front person's name, role and bio underneath. */
export function TeamCarousel({ members }: { members: Member[] }) {
  const [active, setActive] = useState(0);

  return (
    <div className="flex flex-col items-center gap-8">
      <div className="relative h-[460px] w-full max-w-[720px]">
        <DepthCarousel
          items={members.map((m) => ({ image: m.photo, alt: `${m.name}, ${m.role}` }))}
          cardWidth={300}
          cardHeight={340}
          radius={12}
          tint="#080909"
          depth={220}
          spread={90}
          tilt={22}
          visibleCards={2}
          falloff={0.2}
          blur={6}
          onChange={(i: number) => setActive(i)}
        />
      </div>
      {/* All bios stay in the HTML for search and screen readers; only the front person's is shown */}
      <div aria-live="polite" className="min-h-[7rem] max-w-[52ch] text-center">
        {members.map((m, i) => (
          <div key={m.name} hidden={i !== active}>
            <h3 className="text-lg font-semibold text-soft-white">
              {m.linkedin ? (
                <a
                  href={m.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${m.name} on LinkedIn`}
                  className="ext-link relative after:absolute after:left-full after:ml-1.5"
                  data-track="social_click"
                  data-track-platform="linkedin"
                  data-track-place="team"
                >
                  {m.name}
                </a>
              ) : (
                m.name
              )}
            </h3>
            <p className="mt-1 text-xs font-medium uppercase tracking-wider text-warm-bronze">{m.role}</p>
            <p className="mt-3 text-sm leading-relaxed text-muted-grey">{m.bio}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
