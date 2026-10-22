import Image from 'next/image';

interface TeamMemberProps {
  name: string;
  role: string;
  photo: string;
  bio: string;
  linkedin?: string;
}

/** Open portrait for dark sections: square black-and-white photo, name, role, bio, LinkedIn. */
export function TeamMember({ name, role, photo, bio, linkedin }: TeamMemberProps) {
  return (
    <figure>
      {/* Grayscale evens out the different photo backgrounds; the files stay in colour */}
      <Image
        src={photo}
        alt={`${name}, ${role}`}
        width={512}
        height={512}
        sizes="(min-width: 1024px) 260px, (min-width: 640px) 33vw, 100vw"
        className="aspect-square w-full max-w-[18rem] border border-cream/10 object-cover grayscale sm:max-w-none"
      />
      <figcaption className="mt-5">
        <h3 className="text-lg font-medium text-cream">{name}</h3>
        <p className="eyebrow mt-1">{role}</p>
        <p className="mt-3 text-sm leading-relaxed text-cream/70">{bio}</p>
        {linkedin && (
          <a
            href={linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${name} on LinkedIn`}
            className="ext-link mt-3 text-sm text-cream/70"
            data-track="social_click"
            data-track-platform="linkedin"
            data-track-place="team"
          >
            LinkedIn
          </a>
        )}
      </figcaption>
    </figure>
  );
}
