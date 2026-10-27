import { homeContent } from '@/lib/data/organization';

/** The four ideas behind Apex Conclave (Experience, Competition, Community, Opportunity): numbered, ruled. */
export function Ideas({ className = '' }: { className?: string }) {
  return (
    <ul className={`reveal-stagger grid ${className}`}>
      {homeContent.about.ideas.map((idea, i) => (
        <li key={idea.title} className="border-t border-soft/15 py-6 pr-6 md:py-7">
          <span className="font-display text-3xl font-medium text-accent">{String(i + 1).padStart(2, '0')}</span>
          <h3 className="mt-4 text-base font-medium text-bright">{idea.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-soft">{idea.body}</p>
        </li>
      ))}
    </ul>
  );
}
