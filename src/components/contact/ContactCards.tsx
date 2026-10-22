import { organizationConfig } from '@/lib/data/organization';

export default function ContactCards() {
  const { contactEmail, socials } = organizationConfig;
  const cards = [
    { label: 'Email', value: contactEmail, href: `mailto:${contactEmail}` },
    ...(socials.instagram ? [{ label: 'Instagram', value: '@apex_conclave', href: socials.instagram }] : []),
    ...(socials.linkedin ? [{ label: 'LinkedIn', value: 'Apex Conclave', href: socials.linkedin }] : []),
  ];

  return (
    <div className="flex flex-col gap-4">
      {cards.map((c) => (
        <a
          key={c.label}
          href={c.href}
          {...(c.href.startsWith('http') && { target: '_blank', rel: 'noopener noreferrer' })}
          data-track={c.label === 'Email' ? 'email_click' : 'social_click'}
          data-track-platform={c.label.toLowerCase()}
          data-track-place="contact"
          className="panel card-link block"
        >
          <p className="eyebrow mb-2">{c.label}</p>
          <p className="ext-link text-base text-cream">
            {c.value}
          </p>
        </a>
      ))}
      <div className="panel">
        <p className="eyebrow mb-2">Response time</p>
        <p className="text-base text-cream">Within 48 hours</p>
      </div>
    </div>
  );
}
