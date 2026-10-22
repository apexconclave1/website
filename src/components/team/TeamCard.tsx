import Image from 'next/image';

interface TeamCardProps {
  name: string;
  role: string;
  photo?: string;
  bio?: string;
  quote?: string;
}

/** One team member: photo, name, role, optional bio and quote. Used on About, Community and event pages. */
export function TeamCard({ name, role, photo, bio, quote }: TeamCardProps) {
  return (
    <figure className="panel flex flex-col gap-5">
      <div className="flex items-center gap-4">
        <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-full bg-cream/10 text-base font-medium text-cream">
          {photo ? (
            <Image src={photo} alt={name} width={160} height={160} className="h-full w-full object-cover" />
          ) : (
            name.split(' ').map((n) => n[0]).join('')
          )}
        </div>
        <figcaption>
          <div className="text-base font-semibold text-cream">{name}</div>
          <div className="mt-1 text-xs font-medium uppercase tracking-wider text-bronze">{role}</div>
        </figcaption>
      </div>
      {bio && <p className="text-sm leading-relaxed text-cream">{bio}</p>}
      {quote && <blockquote className="text-sm leading-relaxed text-cream/70">“{quote}”</blockquote>}
    </figure>
  );
}
