import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { pageMetadata } from '@/lib/seo';
import { organizationConfig } from '@/lib/data/organization';
import { VesselDrift } from '@/components/home/VesselDrift';

// Where the "Coming soon" vertical cards lead. Kept out of search (thin page) but links are followed.
export const metadata: Metadata = {
  ...pageMetadata(
    'Coming Soon',
    'New Apex Conclave experiences are being built right now. They will be announced on the website and on Instagram first. See the events running now.',
    '/coming-soon',
  ),
  robots: { index: false, follow: true },
};

export default function ComingSoonPage() {
  return (
    <main id="main-content">
      {/* Same layout as the home hero, so the vessels' scrims keep the text readable */}
      <section aria-labelledby="soon-heading" className="relative isolate flex min-h-[max(100svh,40rem)] flex-col overflow-hidden bg-ground bg-hero">
        <VesselDrift />
        <div className="mx-auto flex w-full max-w-container flex-1 flex-col justify-end px-6 pb-14 pt-[calc(4.5rem+min(52vw,17rem))] md:pb-20 lg:pt-28">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-6">
            <h1
              id="soon-heading"
              className="rise-in text-[min(3rem,9vw)] font-medium leading-[1] text-bright sm:text-[min(4.5rem,9vw)] lg:col-span-8 lg:text-[min(5.25rem,6vw)]"
              style={{ animationDelay: '80ms' }}
            >
              We know you’re <span className="text-accent">excited.</span>
              <span className="block">Hold that thought.</span>
            </h1>
            <div className="rise-in lg:col-span-4" style={{ animationDelay: '160ms' }}>
              <p className="max-w-[42ch] text-base leading-relaxed text-soft [text-shadow:0_1px_12px_rgb(0_0_0/0.95)]">
                New Apex Conclave experiences are being built right now. They will be announced here and on our Instagram
                first.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/events"
                  className="inline-flex items-center justify-center gap-2 rounded border border-bright bg-bright px-6 py-3 text-sm font-medium text-ground transition duration-200 hover:border-accent hover:bg-accent active:translate-y-px"
                  data-track="cta_soon_events"
                >
                  See current events <ArrowRight size={16} aria-hidden="true" />
                </Link>
                {organizationConfig.socials.instagram && (
                  <a
                    href={organizationConfig.socials.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary hover:border-bright hover:text-bright"
                    data-track="social_click"
                    data-track-platform="instagram"
                    data-track-place="coming_soon"
                  >
                    Follow on Instagram
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* The page's label, along the bottom like the home hero's strip */}
          <p className="mt-12 flex min-h-11 items-center gap-3 border-t border-soft/15 pt-2 text-xs font-medium uppercase tracking-[0.2em] text-soft md:mt-16">
            <span aria-hidden="true" className="h-2 w-2 animate-pulse rounded-full bg-accent" />
            Coming soon
          </p>
        </div>
      </section>
    </main>
  );
}
