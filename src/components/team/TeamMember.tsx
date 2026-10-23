import Image from 'next/image';

interface TeamMemberProps {
  name: string;
  role: string;
  photo: string;
  bio: string;
  linkedin?: string;
  /** Optional quote (About page) */
  quote?: string;
}

/** Open portrait for dark sections: square black-and-white photo, name, role, bio, LinkedIn. */
export function TeamMember({ name, role, photo, bio, linkedin, quote }: TeamMemberProps) {
  return (
    <figure className="grid grid-cols-[6rem_1fr] items-start gap-5 sm:block">
      {/* Grayscale evens out the different photo backgrounds; the files stay in colour */}
      <Image
        src={photo}
        alt={`${name}, ${role}`}
        width={512}
        height={512}
        sizes="(min-width: 1024px) 260px, (min-width: 640px) 33vw, 96px"
        className="aspect-square w-full border border-soft/15 object-cover grayscale"
      />
      <figcaption className="sm:mt-5">
        <h3 className="text-lg font-medium text-bright">{name}</h3>
        <p className="eyebrow mt-1">{role}</p>
        <p className="mt-3 text-sm leading-relaxed text-soft">{bio}</p>
        {linkedin && (
          <a
            href={linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${name} on LinkedIn`}
            className="ext-link hit mt-3 text-sm text-soft"
            data-track="social_click"
            data-track-platform="linkedin"
            data-track-place="team"
          >
            LinkedIn
          </a>
        )}
      </figcaption>
      {/* Full width under photo and text on phones */}
      {quote && (
        <blockquote className="col-span-2 border-l border-accent pl-4 font-serif text-base leading-relaxed text-bright sm:mt-5">
          “{quote}”
        </blockquote>
      )}
    </figure>
  );
}
