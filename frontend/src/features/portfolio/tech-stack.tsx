'use client';

type TechIcon = {
  src: string;
};

const SIMPLE_ICONS = 'https://cdn.simpleicons.org';

/** CDN slug + brand hex (no #), or `local` path under /tech/ */
const BRAND: Record<string, { slug: string; color: string } | { local: string }> = {
  PHP: { slug: 'php', color: '777BB4' },
  JavaScript: { slug: 'javascript', color: 'F7DF1E' },
  CSS: { slug: 'css', color: '663399' },
  HTML: { slug: 'html5', color: 'E34F26' },
  Node: { slug: 'nodedotjs', color: '339933' },
  React: { slug: 'react', color: '61DAFB' },
  'Next.js': { slug: 'nextdotjs', color: '000000' },
  'Tailwind CSS': { slug: 'tailwindcss', color: '06B6D4' },
  TypeScript: { slug: 'typescript', color: '3178C6' },
  PostgreSQL: { slug: 'postgresql', color: '4169E1' },
  MySQL: { slug: 'mysql', color: '4479A1' },
  Python: { slug: 'python', color: '3776AB' },
  Firebase: { slug: 'firebase', color: 'DD2C00' },
  'Google Apps Script': { slug: 'googleappsscript', color: '4285F4' },
  'Microsoft Office': { local: '/tech/microsoft-office.svg' },
  'Data Studio': { local: '/tech/looker-studio.svg' },
  'Power BI': { local: '/tech/power-bi.svg' },
};

function iconUrl(slug: string, color: string): string {
  return `${SIMPLE_ICONS}/${slug}/${color}`;
}

function resolveTechIcon(label: string): TechIcon {
  const brand = BRAND[label];
  if (brand) {
    if ('local' in brand) {
      return { src: brand.local };
    }
    return { src: iconUrl(brand.slug, brand.color) };
  }

  if (label === 'SQL') {
    return { src: '/tech/sql.svg' };
  }

  return { src: '/tech/default.svg' };
}

type Props = {
  items: string[];
};

export function TechStackGrid({ items }: Props) {
  return (
    <ul className="tech-stack-grid mt-10 grid w-full">
      {items.map((label) => (
        <TechStackCard key={label} label={label} />
      ))}
    </ul>
  );
}

function TechStackCard({ label }: { label: string }) {
  const { src } = resolveTechIcon(label);

  return (
    <li className="tech-stack-grid__item">
      <div
        className="tech-stack-card section-card"
        aria-label={label}
      >
        <div className="tech-stack-card__logo-wrap">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt=""
            width={40}
            height={40}
            className="tech-stack-card__logo"
            loading="lazy"
            decoding="async"
            onError={(event) => {
              const img = event.currentTarget;
              if (img.src.endsWith('/tech/default.svg')) return;
              img.src = '/tech/default.svg';
            }}
          />
        </div>
        <p className="tech-stack-card__label">{label}</p>
      </div>
    </li>
  );
}
