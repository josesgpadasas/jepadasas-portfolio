import type { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  xmlns: 'http://www.w3.org/2000/svg',
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.75,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

export function IconProfile(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5 20v-1a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5v1" />
    </svg>
  );
}

export function IconFocus(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2v2M12 20v2M2 12h2M20 12h2" />
    </svg>
  );
}

export function IconSystems(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <path d="M9 9h6v6H9zM9 2v2M15 2v2M9 20v2M15 20v2M2 9h2M2 15h2M20 9h2M20 15h2" />
    </svg>
  );
}

export function IconProjects(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 7h16v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7z" />
      <path d="M4 7V5a2 2 0 0 1 2-2h3l2 2h7a2 2 0 0 1 2 2v2" />
      <path d="M8 11h8M8 15h5" />
    </svg>
  );
}

export function IconExperience(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      <rect x="4" y="7" width="16" height="13" rx="2" />
      <path d="M4 12h16" />
    </svg>
  );
}

export function IconEducation(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M3 9l9-5 9 5-9 5-9-5z" />
      <path d="M21 10v5a2 2 0 0 1-1 1.73l-7 4a2 2 0 0 1-2 0l-7-4A2 2 0 0 1 3 15v-5" />
      <path d="M12 14v7" />
    </svg>
  );
}

export function IconStack(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 3 3 8l9 5 9-5-9-5z" />
      <path d="M3 12l9 5 9-5M3 16l9 5 9-5" />
    </svg>
  );
}

export function IconConnect(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M10 13a5 5 0 0 1 7.07-7.07l1.41 1.41" />
      <path d="M14 11a5 5 0 0 1-7.07 7.07l-1.41-1.41" />
    </svg>
  );
}

export function IconExpand(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M9 4v16M15 10l-3 3-3-3" />
    </svg>
  );
}

export function IconMenu(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

export function IconCollapse(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M9 4v16M12 13l3-3-3-3" />
    </svg>
  );
}

export type NavIconId =
  | 'about'
  | 'focus'
  | 'capabilities'
  | 'projects'
  | 'experience'
  | 'education'
  | 'competencies'
  | 'connect';

export function NavIcon({
  id,
  ...props
}: IconProps & { id: NavIconId }) {
  switch (id) {
    case 'about':
      return <IconProfile {...props} />;
    case 'focus':
      return <IconFocus {...props} />;
    case 'capabilities':
      return <IconSystems {...props} />;
    case 'projects':
      return <IconProjects {...props} />;
    case 'experience':
      return <IconExperience {...props} />;
    case 'education':
      return <IconEducation {...props} />;
    case 'competencies':
      return <IconStack {...props} />;
    case 'connect':
      return <IconConnect {...props} />;
  }
}
