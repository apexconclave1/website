import { organizationConfig } from '@/lib/data/organization';

/** Contact channels as a ruled list beside the form. */
export default function ContactCards() {
  const { contactEmail, socials } = organizationConfig;
  const rows = [
    { label: 'Email', value: contactEmail, href: `mailto:${contactEmail}` },
    ...(socials.instagram ? [{ label: 'Instagram', value: '@apex_conclave', href: socials.instagram }] : []),
    ...(socials.linkedin ? [{ label: 'LinkedIn', value: 'Apex Conclave', href: socials.linkedin }] : []),
  ];

  return (
    <dl className="border-t border-soft/15">
      {rows.map((r) => (
        <div key={r.label} className="border-b border-soft/15 py-5">
          <dt className="eyebrow mb-2">{r.label}</dt>
          <dd>
            <a
              href={r.href}
              {...(r.href.startsWith('http') && { target: '_blank', rel: 'noopener noreferrer' })}
              data-track={r.label === 'Email' ? 'email_click' : 'social_click'}
              data-track-platform={r.label.toLowerCase()}
              data-track-place="contact"
              className="ext-link hit text-base text-bright [overflow-wrap:anywhere]"
            >
              {r.value}
            </a>
          </dd>
        </div>
      ))}
      <div className="border-b border-soft/15 py-5">
        <dt className="eyebrow mb-2">Response time</dt>
        <dd className="text-base text-bright">Within 48 hours</dd>
      </div>
    </dl>
  );
}
