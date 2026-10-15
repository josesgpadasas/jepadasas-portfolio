import profilePortrait from '@/assets/profile.jpg';
import type { PortfolioProfile } from '@/lib/portfolio';
import { RevealSection } from '@/features/portfolio/reveal-section';

function usesBundledPortrait(portraitPath: string): boolean {
  return (
    portraitPath === '/profile.jpg' ||
    portraitPath.endsWith('/profile.jpg')
  );
}

type Props = {
  profile: PortfolioProfile;
};

export function PortfolioView({ profile }: Props) {
  const education = profile.education ?? [];
  const experience = profile.experience ?? [];
  const projects = profile.projects ?? [];
  const focusAreas = profile.focusAreas ?? [];
  const capabilities = profile.capabilities ?? [];
  const competencies = profile.competencies ?? [];
  const links = profile.links ?? [];

  return (
    <div className="content-canvas relative min-h-screen min-w-0 w-full max-w-full">
      <main className="content-main relative z-[1] min-w-0 w-full max-w-full pb-28 pt-6 lg:pt-14">
        <RevealSection
          id="about"
          className="scroll-mt-10 pb-12 lg:pb-16"
        >
            <div className="mb-10 inline-flex items-center gap-2 rounded-sm border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-navy-soft)] shadow-[var(--shadow-card)] animate-fade-in">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--color-signal)]" />
              Open to Side Projects
            </div>

            <div className="hero-grid grid w-full gap-8 max-lg:min-w-0 lg:gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(240px,22rem)] lg:items-start xl:grid-cols-[minmax(0,1fr)_minmax(260px,24rem)] 2xl:grid-cols-[minmax(0,1.2fr)_minmax(280px,26rem)]">
              <div className="min-w-0">
                <p className="font-mono text-xs uppercase tracking-[0.25em] text-[var(--color-accent)]">
                  {profile.location}
                </p>
                <h1 className="mt-4 text-[clamp(1.75rem,7vw,2.25rem)] font-bold leading-[1.08] tracking-tight text-[var(--color-navy)] sm:text-5xl xl:text-[3.25rem]">
                  {profile.name}
                </h1>
                <p className="mt-4 text-lg font-semibold leading-snug text-[var(--color-navy-soft)] sm:text-2xl">
                  {profile.title}
                </p>

                <div className="summary-panel mt-8 border-l-4 border-l-[var(--color-sky)] bg-[var(--color-surface)] p-6 sm:p-8">
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--color-accent)]">
                    About
                  </p>
                  <p className="summary-text mt-3 text-base leading-[1.75] text-[var(--color-muted)] sm:text-lg sm:leading-8">
                    {profile.summary}
                  </p>
                </div>

                <dl className="meta-grid mt-8 grid w-full gap-3">
                  <MetaField label="Sector" value="National Government" />
                  <MetaField label="Current Agency" value="Department of Agriculture" />
                  <MetaField label="Eligibility" value="Career Service Professional" />
                </dl>
              </div>

              <div className="hero-portrait relative mx-auto w-full max-w-[min(100%,20rem)] lg:mx-0 lg:max-w-none lg:justify-self-end">
                <div
                  aria-hidden
                  className="portrait-offset absolute -left-3 -top-3 h-full w-full border-2 border-[var(--color-navy)] bg-[var(--color-panel)] transition-transform duration-300"
                />
                <div className="portrait-frame relative border-2 border-[var(--color-navy)] bg-white p-2">
                  <div className="flex items-center justify-between border-b border-[var(--color-border)] px-2 py-1.5 font-mono text-[10px] uppercase tracking-wider text-[var(--color-muted)]">
                    <span>img/portrait</span>
                    <span className="text-[var(--color-accent)]">ready</span>
                  </div>
                  <ProfilePortrait
                    name={profile.name}
                    portraitPath={profile.portraitPath}
                  />
                </div>
              </div>
            </div>
        </RevealSection>

        <RevealSection
          id="focus"
          className="section-shell scroll-mt-10 py-12 lg:py-16"
        >
            <SectionHeading
              code="01"
              title="Current Focus"
              description="Priority areas for digital transformation work in the public sector."
            />
            <ul className="focus-grid mt-10 grid w-full gap-4">
              {focusAreas.map((area, index) => (
                <li
                  key={area}
                  className="section-card flex gap-4 p-5"
                  style={{ animationDelay: `${index * 60}ms` }}
                >
                  <span className="font-mono text-sm font-medium text-[var(--color-accent)]">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="text-base font-medium leading-snug text-[var(--color-navy)]">
                    {area}
                  </span>
                </li>
              ))}
            </ul>
        </RevealSection>

        <RevealSection
          id="capabilities"
          className="section-shell scroll-mt-10 py-12 lg:py-16"
        >
            <SectionHeading
              code="02"
              title="Skills & Capabilities"
              description="Technical skills applied from previous and current work experiences."
            />
            <div className="cap-grid mt-10 grid w-full gap-5">
              {capabilities.map((cap) => (
                <article
                  key={cap.title}
                  className="section-card flex flex-col border-t-4 border-t-[var(--color-sky)] p-6"
                >
                  <h3 className="text-lg font-semibold text-[var(--color-navy)]">
                    {cap.title}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-[var(--color-muted)]">
                    {cap.description}
                  </p>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {(cap.tools ?? []).map((tool) => (
                      <li
                        key={tool}
                        className="tag-chip px-2.5 py-1 font-mono text-[11px] text-[var(--color-navy)]"
                      >
                        {tool}
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
        </RevealSection>

        <RevealSection
          id="experience"
          className="section-shell scroll-mt-10 py-12 lg:py-16"
        >
            <SectionHeading
              code="03"
              title="Work Experience"
              description="Current and previous roles in the various National Government Agencies."
            />
            <ol className="experience-timeline relative mt-10 space-y-0 border-l-2 border-[var(--color-border)] pl-8">
              {experience.map((item) => (
                <li
                  key={`${item.organization}-${item.period}`}
                  className="timeline-node relative pb-10 last:pb-0"
                >
                  <div className="section-card p-5">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
                      <div className="flex min-w-0 flex-1 gap-4">
                        {item.logoPath ? (
                          <AgencyLogo
                            src={item.logoPath}
                            organization={item.organization}
                          />
                        ) : null}
                        <div className="min-w-0 flex-1">
                          <h3 className="text-lg font-semibold text-[var(--color-navy)]">
                            {item.role}
                          </h3>
                          <p className="mt-1 text-sm font-medium leading-relaxed text-[var(--color-navy-soft)]">
                            {item.organization}
                          </p>
                          {item.location ? (
                            <p className="mt-1 text-sm text-[var(--color-muted)]">
                              {item.location}
                            </p>
                          ) : null}
                        </div>
                      </div>
                      <p className="shrink-0 font-mono text-xs text-[var(--color-accent)] sm:text-right">
                        {item.period}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ol>
        </RevealSection>

        {education.length > 0 ? (
          <RevealSection
            id="education"
            className="section-shell scroll-mt-10 py-12 lg:py-16"
          >
              <SectionHeading
                code="04"
                title="Educational Background"
                description="Educational attainment that shaped the knowledge and skills applied."
              />
              <ol className="mt-10 space-y-4">
                {education.map((item) => (
                  <li
                    key={`${item.institution}-${item.period}`}
                    className="section-card p-5"
                  >
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
                      <div className="flex min-w-0 flex-1 gap-4">
                        {item.logoPath ? (
                          <AgencyLogo
                            src={item.logoPath}
                            organization={item.institution}
                          />
                        ) : null}
                        <div className="min-w-0 flex-1">
                          <h3 className="text-lg font-semibold text-[var(--color-navy)]">
                            {item.degree}
                          </h3>
                          <p className="mt-1 text-sm font-medium text-[var(--color-navy-soft)]">
                            {item.institution}
                          </p>
                          {item.location ? (
                            <p className="mt-1 text-sm text-[var(--color-muted)]">
                              {item.location}
                            </p>
                          ) : null}
                        </div>
                      </div>
                      <p className="shrink-0 font-mono text-xs text-[var(--color-accent)] sm:text-right">
                        {item.period}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
          </RevealSection>
        ) : null}

        <RevealSection
          id="competencies"
          className="section-shell scroll-mt-10 py-12 lg:py-16"
        >
            <SectionHeading
              code="05"
              title="Technology stack"
              description="Tools and disciplines in active use."
            />
            <ul className="mt-10 flex flex-wrap gap-2">
              {competencies.map((skill) => (
                <li
                  key={skill}
                  className="skill-chip border border-[var(--color-navy)] bg-[var(--color-navy)] px-3 py-2 text-sm font-medium text-white"
                >
                  {skill}
                </li>
              ))}
            </ul>
        </RevealSection>

        {projects.length > 0 ? (
          <RevealSection
            id="projects"
            className="section-shell scroll-mt-10 py-12 lg:py-16"
          >
            <SectionHeading
              code="06"
              title="Highlighted Projects"
              description="Systems and platforms delivered for the various National Government Agencies."
            />
            <ul className="project-list mt-10 space-y-5">
              {projects.map((project) => (
                <li key={`${project.title}-${project.period}`}>
                  <article className="section-card p-6">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                      <div className="flex min-w-0 flex-1 gap-4">
                        {project.logoPath ? (
                          <AgencyLogo
                            src={project.logoPath}
                            organization={project.organization}
                          />
                        ) : null}
                        <div className="min-w-0 flex-1">
                          <h3 className="text-lg font-semibold text-[var(--color-navy)]">
                            {project.title}
                          </h3>
                          <p className="mt-1 text-sm font-medium text-[var(--color-navy-soft)]">
                            {project.organization}
                          </p>
                          <p className="mt-3 text-sm leading-relaxed text-[var(--color-muted)]">
                            {project.summary}
                          </p>
                          {project.highlights.length > 0 ? (
                            <ul className="mt-4 space-y-1.5 text-sm text-[var(--color-muted)]">
                              {project.highlights.map((point) => (
                                <li
                                  key={point}
                                  className="flex gap-2 leading-relaxed"
                                >
                                  <span
                                    aria-hidden
                                    className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[var(--color-accent)]"
                                  />
                                  <span>{point}</span>
                                </li>
                              ))}
                            </ul>
                          ) : null}
                          {project.tools.length > 0 ? (
                            <ul className="mt-4 flex flex-wrap gap-2">
                              {project.tools.map((tool) => (
                                <li
                                  key={tool}
                                  className="tag-chip px-2.5 py-1 font-mono text-[11px] text-[var(--color-navy)]"
                                >
                                  {tool}
                                </li>
                              ))}
                            </ul>
                          ) : null}
                          {project.links.length > 0 ? (
                            <ul className="mt-4 flex flex-wrap gap-3">
                              {project.links.map((link) => (
                                <li key={link.href}>
                                  <a
                                    href={link.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="link-cta inline-flex items-center gap-2 border border-[var(--color-navy)] bg-[var(--color-panel)] px-3 py-1.5 text-xs font-semibold text-[var(--color-navy)]"
                                  >
                                    {link.label}
                                    <span aria-hidden className="font-mono">
                                      ext
                                    </span>
                                  </a>
                                </li>
                              ))}
                            </ul>
                          ) : null}
                        </div>
                      </div>
                      <p className="shrink-0 font-mono text-xs text-[var(--color-accent)] sm:text-right">
                        {project.period}
                      </p>
                    </div>
                  </article>
                </li>
              ))}
            </ul>
          </RevealSection>
        ) : null}

        <RevealSection
          id="connect"
          className="section-shell scroll-mt-10 py-12 lg:py-16"
        >
            <SectionHeading
              code="07"
              title="Connect"
              description="Professional channels."
            />
            <ul className="connect-links mt-8 flex flex-wrap gap-4">
              {links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-cta inline-flex items-center gap-2 border-2 border-[var(--color-navy)] bg-[var(--color-sky)] px-5 py-3 text-sm font-semibold text-[var(--color-navy)]"
                  >
                    {link.label}
                    <span aria-hidden className="font-mono text-xs">
                      ext
                    </span>
                  </a>
                </li>
              ))}
            </ul>
        </RevealSection>

      </main>
    </div>
  );
}

function ProfilePortrait({
  name,
  portraitPath,
}: {
  name: string;
  portraitPath: string;
}) {
  const alt = `Portrait of ${name}`;

  if (usesBundledPortrait(portraitPath)) {
    return (
      // Native img: avoids /_next/image, which can fail under Vercel Services rewrites.
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={profilePortrait.src}
        alt={alt}
        width={profilePortrait.width}
        height={profilePortrait.height}
        decoding="async"
        fetchPriority="high"
        className="block aspect-[6/7] w-full object-cover object-top"
      />
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={portraitPath}
      alt={alt}
      width={480}
      height={560}
      decoding="async"
      className="block aspect-[6/7] w-full object-cover object-top"
    />
  );
}

function AgencyLogo({
  src,
  organization,
}: {
  src: string;
  organization: string;
}) {
  return (
    <div className="agency-logo shrink-0">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt=""
        width={56}
        height={56}
        className="agency-logo__img"
        loading="lazy"
        decoding="async"
      />
      <span className="sr-only">{organization}</span>
    </div>
  );
}

function MetaField({ label, value }: { label: string; value: string }) {
  return (
    <div className="section-card px-4 py-3">
      <dt className="font-mono text-[10px] uppercase tracking-wider text-[var(--color-muted)]">
        {label}
      </dt>
      <dd className="mt-1 text-sm font-medium leading-snug text-[var(--color-navy)]">
        {value}
      </dd>
    </div>
  );
}

function SectionHeading({
  code,
  title,
  description,
}: {
  code: string;
  title: string;
  description: string;
}) {
  return (
    <header className="w-full border-b border-[var(--color-border)] pb-6">
      <div className="flex items-center gap-3">
        <span className="inline-flex h-8 min-w-8 items-center justify-center rounded-sm border border-[var(--color-navy)] bg-[var(--color-panel)] font-mono text-xs font-medium text-[var(--color-navy)]">
          {code}
        </span>
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--color-accent)]">
          Section
        </p>
      </div>
      <h2 className="mt-4 text-[1.625rem] font-bold leading-tight tracking-tight text-[var(--color-navy)] lg:text-3xl xl:text-[2.125rem]">
        {title}
      </h2>
      <p className="mt-3 max-w-4xl text-base leading-relaxed text-[var(--color-muted)]">
        {description}
      </p>
    </header>
  );
}
