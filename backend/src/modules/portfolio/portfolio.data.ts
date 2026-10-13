import type { PortfolioProfile } from './portfolio.types.js';
import { normalizeProjects, rawProjects } from './portfolio.projects.js';
import {
  compactStrings,
  isPortfolioExperienceEntry,
  isPresent,
} from './portfolio.util.js';

/**
 * Optional Nest mirror of profile data. Canonical copy for production: frontend/src/data/portfolio/.
 * Profile content from CS Form No. 212 (updated 2026-10-13).
 */
const raw: Omit<PortfolioProfile, 'projects'> = {
  name: 'Joseph Esguerra Padasas',
  title: 'Information System Analyst III',
  headline: 'Department of Agriculture · Interim Agricultural Statistics Office',
  summary:
    'Career Service Professional helping national agencies connect programs to systems and data people can use every day. My work covers information systems analysis, knowledge management, project evaluation, and analytics—from scoping and design through rollout and support. I have served in technical contract-of-service roles with DILG, DHSUD, NFRDI, and the Department of Agriculture, with a consistent focus on clear requirements, accountable delivery, and adoption in the field.',
  location: 'Caloocan City, National Capital Region, Philippines',
  portraitPath: '/profile.jpg',
  links: [
    {
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/joseph-padasas-64057b26b',
    },
  ],
  focusAreas: compactStrings([
    'Information systems analysis & support',
    'Data management and analytics',
    'Knowledge management systems',
    'Project monitoring and evaluation',
    'Web and productivity platforms for government teams',
  ]),
  capabilities: [
    {
      title: 'Systems & data',
      description:
        'Design and support agency tools, databases, and reporting aligned with public-sector requirements.',
      tools: compactStrings([
        'Database management (SQL, Sheets, Firebase)',
        'Google Apps Script',
        'Data analysis and report writing',
      ]),
    },
    {
      title: 'Application delivery',
      description:
        'Build and maintain web-based tools for internal programs and field operations.',
      tools: compactStrings([
        'HTML',
        'PHP',
        'JavaScript',
        'CSS',
        'Google Workspace',
        'Microsoft Office',
      ]),
    },
    {
      title: 'Program support',
      description:
        'Evaluation, technical writing, and coordination across PMOs and line offices.',
      tools: compactStrings([
        'Project evaluation',
        'Technical documentation',
        'Regional project monitoring (RPMES)',
      ]),
    },
    {
      title: 'Communications',
      description:
        'Visual and written materials that help teams adopt systems and comply with standards.',
      tools: compactStrings([
        'Graphic design (Canva)',
        'Computer hardware/software troubleshooting',
      ]),
    },
  ],
  experience: [
    {
      organization:
        'Department of Agriculture – Interim Agricultural Statistics Office',
      role: 'Information System Analyst III',
      period: 'Mar 2025 – Present',
      logoPath: '/logos/da.svg',
      highlights: compactStrings([]),
    },
    {
      organization:
        'National Fisheries Research and Development Institute – FishCORE PMO (FishCRRM 1.1)',
      role: 'Senior Science Research Specialist',
      period: 'Nov 2025 – Dec 2025',
      logoPath: '/logos/nfrdi.svg',
      highlights: compactStrings([]),
    },
    {
      organization:
        'Department of Human Settlements and Urban Development – KMISS KMD',
      role: 'KM Technical Staff II',
      period: 'Jan 2024 – Oct 2025',
      logoPath: '/logos/dhsud.svg',
      highlights: compactStrings([]),
    },
    {
      organization:
        'Department of the Interior and Local Government – AS HRMD',
      role: 'Information System Analyst II',
      period: 'May 2023 – Mar 2024',
      logoPath: '/logos/dilg.svg',
      highlights: compactStrings([]),
    },
    {
      organization:
        'Department of the Interior and Local Government – LEO70 PMO',
      role: 'Project Evaluation Officer III',
      period: 'Jan 2022 – Dec 2023',
      logoPath: '/logos/dilg.svg',
      highlights: compactStrings([]),
    },
    {
      organization:
        'Department of the Interior and Local Government – LEO70 PMO',
      role: 'Information System Analyst II',
      period: 'Jul 2020 – Dec 2021',
      logoPath: '/logos/dilg.svg',
      highlights: compactStrings([]),
    },
    {
      organization: 'Department of the Interior and Local Government – OPDS',
      role: 'Development Management Officer I',
      period: 'Nov 2018 – Jul 2020',
      logoPath: '/logos/dilg.svg',
      highlights: compactStrings([]),
    },
  ],
  education: [
    {
      institution: 'FEU – Institute of Technology',
      degree: 'Bachelor of Science in Computer Engineering',
      period: '2009 – 2017',
      location: 'Manila, Philippines',
      logoPath: '/logos/feu-tech.png',
    },
  ],
  competencies: compactStrings([
    'Career Service Professional (CSE)',
    'Database management (SQL, Sheets, Firebase)',
    'Google Apps Script web app development',
    'Web development (HTML, PHP, JavaScript, CSS)',
    'MS Office / Google Workspace',
    'Canva',
    'Hardware and software troubleshooting',
  ]),
};

export function getPortfolioProfile(): PortfolioProfile {
  const experience = raw.experience
    .filter((item) => isPortfolioExperienceEntry(item.organization))
    .map((item) => ({
      ...item,
      highlights: compactStrings(item.highlights),
      ...(isPresent(item.location) ? { location: item.location } : {}),
      ...(isPresent(item.logoPath) ? { logoPath: item.logoPath } : {}),
    }));

  const education = (raw.education ?? [])
    .filter(
      (item) =>
        isPresent(item.institution) &&
        isPresent(item.degree) &&
        isPresent(item.period),
    )
    .map((item) => ({
      ...item,
      ...(isPresent(item.location) ? { location: item.location } : {}),
      ...(isPresent(item.logoPath) ? { logoPath: item.logoPath } : {}),
    }));

  return {
    name: raw.name,
    title: raw.title,
    headline: raw.headline,
    summary: raw.summary,
    location: raw.location,
    portraitPath: raw.portraitPath,
    links: raw.links.filter((l) => isPresent(l.label) && isPresent(l.href)),
    focusAreas: raw.focusAreas,
    capabilities: raw.capabilities.map((cap) => ({
      ...cap,
      tools: compactStrings(cap.tools),
    })),
    experience,
    projects: normalizeProjects(rawProjects),
    education,
    competencies: raw.competencies,
  };
}
