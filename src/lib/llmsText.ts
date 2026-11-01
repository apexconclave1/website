import { earlyBirdEndsAt, eventsData, formatEventDates } from '@/lib/data/events';
import { chambersData } from '@/lib/data/chambers';
import { eventStories } from '@/lib/data/eventStory';
import { apexFaqs, faqsByEvent } from '@/lib/data/faqs';
import { verticals } from '@/lib/data/verticals';
import { termsSections } from '@/lib/data/terms';
import {
  communityContent,
  homeContent,
  leadershipTeam,
  operatingStandards,
  organizationConfig,
  partnersContent,
  siteCredit,
} from '@/lib/data/organization';
import { siteUrl } from '@/lib/site';

// Plain-text files for AI search and assistants (/llms.txt, /llms-full.txt, see llmstxt.org) and people (/humans.txt).
// Built from the same data as the pages, so they change with them. Coupon codes and payment details stay out.

const url = (path: string) => `${siteUrl}${path}`;
const lines = (...parts: (string | false | undefined)[]) => parts.filter((p) => p !== false && p !== undefined).join('\n');
const committeesOf = (eventId: string) =>
  chambersData.filter((c) => c.eventId === eventId).sort((a, b) => a.displayOrder - b.displayOrder);
const istDay = (ms: number) =>
  new Date(ms).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Asia/Kolkata' });
/** "Early Bird ₹299 until 5 November 2026; Regular ₹399 from 6 November 2026": dated, so it stays true after the switch */
const feesLine = (event: (typeof eventsData)[number]) => {
  const p = event.pricing!;
  const ends = earlyBirdEndsAt(event);
  return ends === null || p.earlyBird == null
    ? `₹${p.regular}`
    : `Early Bird ₹${p.earlyBird} until ${istDay(ends - 1)}; Regular ₹${p.regular} from ${istDay(ends)}`;
};
const socialLines = (prefix: string) =>
  Object.entries(organizationConfig.socials).map(
    ([k, v]) => v && `${prefix}${({ instagram: 'Instagram', linkedin: 'LinkedIn' } as Record<string, string>)[k] ?? k}: ${v}`,
  );

const pages = [
  ['Home', '/', 'what Apex Conclave is, its event verticals, the featured event, team and partnerships'],
  ['Event Verticals', '/verticals', 'the kinds of events Apex Conclave runs'],
  ['Events', '/events', 'every event, upcoming and past'],
  ['About', '/about', 'mission, the people it brings together, team and how events are run'],
  ['Partners', '/partners', 'sponsorships, college partnerships, competition challenges, judges and mentors, campus communities'],
  ['FAQ', '/faq', 'common questions about Apex Conclave and its events'],
  ['Contact', '/contact', 'contact form for events, registration and partnerships; replies within 48 hours'],
  ['Terms & Conditions', '/terms', 'code of conduct, registration, refunds, privacy and disputes'],
] as const;

export function llmsTxt(): string {
  return lines(
    `# ${organizationConfig.name}`,
    '',
    `> ${organizationConfig.name} is a student-led events and competitions brand in India. ${organizationConfig.description} ${eventsData[0].title}, a virtual Model United Nations, is its first event; new formats are coming soon.`,
    '',
    ...eventsData.flatMap((e) => [
      `## ${e.title}${e.format ? ` (${e.format})` : ''}`,
      '',
      `- What: ${e.shortDescription}`,
      `- Dates: ${formatEventDates(e)}${e.location.isVirtual ? ', 100% online' : `, ${e.location.venue}`}`,
      `- Committees: ${committeesOf(e.id).map((c) => `${c.name} (${c.code}): ${c.topic}`).join('; ')}`,
      e.pricing && `- Delegate fee: ${feesLine(e)}; paid by UPI`,
      `- Registration: ${e.registrationOpen ? `open now at ${url(`/register?event=${e.slug}`)}` : 'opens soon'}`,
      `- Event page with agendas, how it works and FAQ: ${url(`/events/${e.slug}`)}`,
      '',
    ]),
    '## Pages',
    '',
    ...pages.map(([name, path, about]) => `- [${name}](${url(path)}): ${about}`),
    ...eventsData.map((e) => `- [${e.title}](${url(`/events/${e.slug}`)}): ${e.shortDescription}`),
    '',
    '## Team',
    '',
    ...leadershipTeam.map((p) => `- ${p.name}, ${p.role}: ${p.linkedin}`),
    '',
    '## Contact',
    '',
    `- Email: ${organizationConfig.contactEmail}`,
    ...socialLines('- '),
    `- Website designed and built by ${siteCredit.name} (Co-Founder): ${siteCredit.url}`,
    '',
    '## Optional',
    '',
    `- [Full text of the site](${url('/llms-full.txt')}): every page's facts in one file (committees, FAQs, terms)`,
    '',
  );
}

export function llmsFullTxt(): string {
  const faq = (items: { q: string; a: string }[], level: string) => items.flatMap((f) => [`${level} ${f.q}`, '', f.a, '']);
  return lines(
    `# ${organizationConfig.name}: full text`,
    '',
    `> The facts on ${siteUrl}, in one file. Short version: ${url('/llms.txt')}.`,
    '',
    '## About',
    '',
    homeContent.about.body,
    '',
    ...homeContent.about.ideas.map((i) => `- ${i.title}: ${i.body}`),
    '',
    '### How events are run',
    '',
    ...operatingStandards.map((s) => `- ${s.title}: ${s.body}`),
    '',
    '### Event verticals',
    '',
    ...verticals.map((v) => `- ${v.title}: ${v.description}`),
    '- More formats are coming soon.',
    '',
    ...eventsData.flatMap((e) => {
      const story = eventStories[e.id];
      return [
        `## ${e.title}`,
        '',
        e.shortDescription,
        '',
        e.fullOverview,
        '',
        `- Format: ${e.format ?? e.category}`,
        `- Dates: ${formatEventDates(e)}`,
        `- Where: ${e.location.venue}`,
        e.pricing && `- Delegate fee: ${feesLine(e)}; paid by UPI`,
        `- Registration: ${e.registrationOpen ? `open now at ${url(`/register?event=${e.slug}`)}` : 'opens soon'}`,
        ...(e.features ?? []).map((f) => `- ${f}`),
        '',
        ...(story
          ? [
              `### ${story.intro.title}`,
              '',
              ...story.intro.body.flatMap((para) => [para, '']),
              `### ${story.difference.title}`,
              '',
              story.difference.body,
              '',
              '### What delegates do',
              '',
              ...story.work.map((w) => `- ${w.title}: ${w.body}`),
              '',
              '### How it works',
              '',
              ...story.phases.map((p) => `- ${p.name}: ${p.lead} ${p.steps.join(', ')}.`),
              '',
              '### Skills you build',
              '',
              story.skills.join(', ') + '.',
              '',
              '### What you take home',
              '',
              ...story.takeHome.map((t) => `- ${t.title}: ${t.body}`),
              '',
              '### Which committee suits you',
              '',
              ...story.delegateTypes.map((d) => `- ${d.title}: ${d.lookAt.join(' or ')}`),
              '',
            ]
          : []),
        '### Committees',
        '',
        ...committeesOf(e.id).flatMap((c) => [
          `#### ${c.name} (${c.code})`,
          '',
          `- Agenda: ${c.topic}`,
          `- Theme: ${c.theme}`,
          `- The challenge: ${c.challenge}`,
          `- Suits: ${c.suits}`,
          '',
        ]),
        `### ${e.title} FAQ`,
        '',
        ...faq(faqsByEvent[e.id] ?? [], '####'),
      ];
    }),
    '## General FAQ',
    '',
    ...faq(apexFaqs, '###'),
    '## Partners',
    '',
    partnersContent.intro,
    '',
    ...partnersContent.collaborations.map((c) => `- ${c.title}: ${c.body}`),
    '',
    '### Why partner',
    '',
    ...partnersContent.why.map((w) => `- ${w.title}: ${w.body}`),
    '',
    `Possible placements: ${partnersContent.placements.join('; ')}. Sponsorship tiers and prices are shared on request: ${organizationConfig.contactEmail}.`,
    '',
    '## Community',
    '',
    communityContent.intro,
    '',
    ...communityContent.groups.map((g) => `- ${g.title}: ${g.body}`),
    '',
    '## Team',
    '',
    ...leadershipTeam.map((p) => `- ${p.name}, ${p.role}. ${p.bio} LinkedIn: ${p.linkedin}`),
    '',
    `Website designed and built by ${siteCredit.name} (Co-Founder): ${siteCredit.url}`,
    '',
    '## Terms & Conditions',
    '',
    ...termsSections.flatMap((s) => [`### ${s.title}`, '', ...s.content.map((c) => `- ${c}`), '']),
    '## Contact',
    '',
    `- Email: ${organizationConfig.contactEmail} (replies within 48 hours)`,
    ...socialLines('- '),
    `- Contact form: ${url('/contact')}`,
    '',
  );
}

/** humanstxt.org format. "Last update" is the build date. */
export function humansTxt(): string {
  return lines(
    '/* TEAM */',
    '',
    ...leadershipTeam.flatMap((p) => [
      `  ${p.role}: ${p.name}${p.name === siteCredit.name ? ' (designed and built this website)' : ''}`,
      `  LinkedIn: ${p.linkedin}`,
      '  From: India',
      '',
    ]),
    `  Contact: ${organizationConfig.contactEmail}`,
    ...socialLines('  '),
    '',
    '/* SITE */',
    '',
    `  Last update: ${new Date().toISOString().slice(0, 10)}`,
    '  Language: English',
    '  Standards: HTML5, CSS3, WCAG 2.2 AA',
    '  Components: Next.js, React, TypeScript, Tailwind CSS, Supabase, Resend',
    '  Hosting: Vercel',
    '  Fonts: Space Grotesk, Inter, Playfair Display',
    `  Design and build: ${siteCredit.name}`,
    '',
  );
}
