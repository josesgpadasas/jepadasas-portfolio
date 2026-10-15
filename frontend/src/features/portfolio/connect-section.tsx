import profilePortrait from '@/assets/profile.jpg';
import type { PortfolioLink } from '@/lib/portfolio';

type Props = {
  name: string;
  title: string;
  headline: string;
  location: string;
  summary: string;
  links: PortfolioLink[];
};

function isLinkedInLink(link: PortfolioLink): boolean {
  return /linkedin\.com/i.test(link.href);
}

function previewExcerpt(text: string, maxLength = 320): string {
  const trimmed = text.trim();
  if (trimmed.length <= maxLength) return trimmed;
  return `${trimmed.slice(0, maxLength).trimEnd()}…`;
}

export function ConnectPanel({
  name,
  title,
  headline,
  location,
  summary,
  links,
}: Props) {
  const linkedIn = links.find(isLinkedInLink);
  const otherLinks = links.filter((link) => !isLinkedInLink(link));

  if (!linkedIn && otherLinks.length === 0) {
    return null;
  }

  return (
    <div className="connect-panel mt-8">
      {linkedIn ? (
        <article className="linkedin-preview section-card overflow-hidden border-t-4 border-t-[#0a66c2]">
          <div className="linkedin-preview__header">
            <LinkedInLogo className="linkedin-preview__logo" aria-hidden />
            <span className="linkedin-preview__brand">LinkedIn profile</span>
          </div>

          <div className="linkedin-preview__content">
            <div className="linkedin-preview__body">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={profilePortrait.src}
                alt=""
                width={104}
                height={104}
                className="linkedin-preview__avatar"
                loading="lazy"
                decoding="async"
              />
              <div className="linkedin-preview__copy min-w-0">
                <h3 className="linkedin-preview__name">{name}</h3>
                <p className="linkedin-preview__title">{title}</p>
                <p className="linkedin-preview__headline">{headline}</p>
                <p className="linkedin-preview__location">{location}</p>
                <p className="linkedin-preview__summary">
                  {previewExcerpt(summary)}
                </p>
              </div>
            </div>

            <div className="linkedin-preview__aside">
              <a
                href={linkedIn.href}
                target="_blank"
                rel="noopener noreferrer"
                className="linkedin-cta link-cta"
              >
                <LinkedInLogo className="linkedin-cta__icon" aria-hidden />
                <span className="linkedin-cta__label">View profile on LinkedIn</span>
                <ExternalLinkIcon className="linkedin-cta__external" aria-hidden />
              </a>
            </div>
          </div>
        </article>
      ) : null}

      {otherLinks.length > 0 ? (
        <ul className="connect-links mt-4 flex flex-wrap gap-3">
          {otherLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="external-link-btn external-link-btn--compact link-cta"
              >
                <span className="external-link-btn__label">{link.label}</span>
                <ExternalLinkIcon className="external-link-btn__icon" />
              </a>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

function LinkedInLogo({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function ExternalLinkIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M15 3h6v6" />
      <path d="M10 14 21 3" />
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    </svg>
  );
}
