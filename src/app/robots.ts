import type { MetadataRoute } from 'next';
import { siteUrl } from '@/lib/site';

// Every crawler may read the whole public site, AI search and training crawlers included (owner, 2026-11-01).
// The named list only states that for the AI crawlers; a named group replaces the '*' rules for that bot, so it
// repeats them. /api/ stays closed; /register is kept out of results by its noindex tag, not here.
const aiCrawlers = [
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'ClaudeBot',
  'Claude-SearchBot',
  'Claude-User',
  'PerplexityBot',
  'Perplexity-User',
  'Google-Extended',
  'Applebot-Extended',
  'meta-externalagent',
  'CCBot',
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: '/api/' },
      { userAgent: aiCrawlers, allow: '/', disallow: '/api/' },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
