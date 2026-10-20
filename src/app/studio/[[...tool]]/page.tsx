'use client';

import Link from 'next/link';

export default function StudioRedirectPage() {
  return (
    <div className="min-h-screen bg-obsidian text-marble flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-surface-elevated border border-gold/20 rounded-2xl p-8 shadow-2xl text-center space-y-6">
        <div className="w-12 h-12 rounded-xl bg-gold/10 border border-gold/30 text-gold flex items-center justify-center mx-auto text-2xl font-serif">
          🏛️
        </div>
        
        <div className="space-y-2">
          <h1 className="text-2xl font-serif font-bold text-marble tracking-tight">
            DIPLOVIA Studio
          </h1>
          <p className="text-sm text-sand/80 font-sans leading-relaxed">
            Sanity Studio now runs as an isolated Vite application for 10x faster GROQ queries, hot-reloading, and schema validation.
          </p>
        </div>

        <div className="bg-obsidian/60 border border-sand/10 rounded-lg p-4 text-left font-mono text-xs space-y-2">
          <div className="text-sand/50 uppercase text-[10px] tracking-wider">Launch Commands</div>
          <div className="text-gold font-semibold">$ npm run studio:dev</div>
          <div className="text-sand/60">Runs Studio at http://localhost:3333</div>
        </div>

        <div className="pt-2 flex flex-col gap-3">
          <a
            href="http://localhost:3333"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3 px-4 rounded-xl bg-gold text-obsidian font-sans font-semibold text-sm hover:bg-gold/90 transition-colors shadow-lg shadow-gold/20 inline-flex items-center justify-center gap-2"
          >
            Open Standalone Studio (localhost:3333) ↗
          </a>
          <Link
            href="/"
            className="text-xs text-sand hover:text-marble transition-colors"
          >
            ← Return to Main Application
          </Link>
        </div>
      </div>
    </div>
  );
}

