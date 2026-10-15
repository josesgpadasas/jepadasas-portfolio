import type { PortfolioProject } from '@/lib/portfolio';
import { compactStrings, isPresent } from '@/data/portfolio/util';

/**
 * Selected systems from Portfolio_Joseph_E_Padasas.pdf (newest first).
 */
export const rawProjects: PortfolioProject[] = [
  {
    title: 'DHSUD Knowledge Portal',
    period: '2025',
    organization: 'DHSUD – KMISS KMD',
    logoPath: '/logos/dhsud.svg',
    summary:
      'Knowledge management platform to centralize access to documents, resources, and institutional knowledge—supporting collaboration, workflow efficiency, and informed policy and program decisions.',
    highlights: compactStrings([
      'Central repository of knowledge products and resources',
      'Captures best practices and expertise across units',
      'Structured access for DHSUD personnel',
    ]),
    tools: compactStrings(['Google Workspace', 'Google Sites', 'Google Apps Script']),
    links: [],
  },
  {
    title: 'Knowledge Portal Content Management Platform',
    period: '2025',
    organization: 'DHSUD – KMISS KMD',
    logoPath: '/logos/dhsud.svg',
    summary:
      'Knowledge management platform for authorized staff to publish and maintain forms, templates, legal references, manuals, policies, guidelines, and training materials on the DHSUD Knowledge Portal.',
    highlights: compactStrings([
      'Add, edit, and archive knowledge products',
      'Keeps portal content current and consistent',
    ]),
    tools: compactStrings(['Google Apps Script', 'Google Workspace']),
    links: [],
  },
  {
    title: 'Centralized Knowledge Products & Forms Repository',
    period: '2025',
    organization: 'DHSUD – KMISS KMD',
    logoPath: '/logos/dhsud.svg',
    summary:
      'Knowledge management web application that consolidate legal references, manuals, policies, guidelines, training materials, and downloadable forms for DHSUD personnel.',
    highlights: compactStrings([
      'Single hub for internal and external transaction forms',
      'Supports knowledge sharing and version control',
    ]),
    tools: compactStrings(['Google Apps Script', 'Google Workspace']),
    links: [],
  },
  {
    title: 'DHSUD 4PH Web Page',
    period: '2025',
    organization: 'DHSUD',
    logoPath: '/logos/dhsud.svg',
    summary:
      'Public-facing webpage page for the Pambansang Pabahay Para sa Pilipino (4PH) program for public information and awareness.',
    highlights: compactStrings([
      'Program information and transparency for housing applicants',
      'Application guide and direct access to PAG-IBIG membership registration',
    ]),
    tools: compactStrings([
      'WordPress'
    ]),
    links: [],
  },
  {
    title: 'DHSUD Gender and Development (GAD) Corner',
    period: '2024',
    organization: 'DHSUD',
    logoPath: '/logos/dhsud.svg',
    summary:
      'Gender and Development (GAD) section on the official DHSUD website serving as a central repository for GAD-related information and resources within the department.',
    highlights: compactStrings(['Public GAD information hub on DHSUD website']),
    tools: compactStrings(['WordPress']),
    links: [],
  },
  {
    title: 'Key Shelter Agencies (KSA) Reporting Platform',
    period: '2024',
    organization: 'DHSUD – Key Shelter Agencies',
    logoPath: '/logos/dhsud.svg',
    summary:
      'Online reporting platform replacing Excel-based data collection for Key Shelter Agencies - centralized data, real-time dashboards, and analysis.',
    highlights: compactStrings([
      'Centralized target and actual accomplishment data submission for all KSAs',
      'Real-time visualization and dynamic reporting',
      'Data analysis for resource allocation',
    ]),
    tools: compactStrings(['AppSheet', 'Looker Studio', 'Google Workspace']),
    links: [],
  },
  {
    title: 'LGU COVID-19 Monitoring System (LGU-CMS)',
    period: '2021 – 2022',
    organization: 'DILG',
    logoPath: '/logos/dilg.svg',
    summary:
      'Online reporting and monitoring platform for DILG Field Officers of COVID-19 data nationwide—supporting standardized gathering, analysis, and DILG oversight.',
    highlights: compactStrings([
      'User-friendly LGU compliance data entry',
      'Comprehensive monitoring across administrative levels',
      'Reporting and visualization for decision support',
    ]),
    tools: compactStrings(['AppSheet', 'Google Apps Script', 'Looker Studio', 'Google Sites']),
    links: [
      {
        label: 'LGU-CMS user manual',
        href: 'https://bit.ly/LGU-CMS_Manual',
      },
    ],
  },
  {
    title: 'Emergency Operations Center (EOC) Web Portal',
    period: '2020',
    organization: 'DILG',
    logoPath: '/logos/dilg.svg',
    summary:
      'Information hub for COVID-19-related data from LGUs nationwide, visualizing Community Quarantine Monitoring System (CQMS) data with custom reports and granular maps—including barangay-level views via the DILG incident-rate map.',
    highlights: compactStrings([
      'Real-time Community Quarantine Monitoring System (CQMS) data visualization',
      'Custom report generation',
      'Decision support for policies and interventions',
    ]),
    tools: compactStrings(['Google Sites', 'Looker Studio']),
    links: [
      {
        label: 'EOC web portal',
        href: 'https://bit.ly/EOC-Web_Portal',
      },
    ],
  },
  {
    title: 'Community Quarantine Monitoring System (CQMS)',
    period: '2020',
    organization: 'DILG',
    logoPath: '/logos/dilg.svg',
    summary:
      'Online monitoring tool for LGU submission of community quarantine and COVID-19-related data across the Philippines—forms plus dashboard views.',
    highlights: compactStrings([
      'Nationwide LGU data gathering forms',
      'Dashboard for pandemic monitoring',
    ]),
    tools: compactStrings(['Google Workspace', 'Looker Studio']),
    links: [],
  },
  {
    title: 'Human Resource Management Division (HRMD) Visual Communications',
    period: '2022 – 2023',
    organization: 'DILG',
    logoPath: '/logos/dilg.svg',
    summary:
      'Layout and publication design for DILG Human Resource Management Division (HRMD) programs—event posters, report covers, brochures, presentation covers, and related materials produced in Canva.',
    highlights: compactStrings([
      'Consistent branding for banners and event posters'
    ]),
    tools: compactStrings(['Canva']),
    links: [],
  },
];

export function normalizeProjects(
  projects: PortfolioProject[] = [],
): PortfolioProject[] {
  return projects
    .filter((p) => isPresent(p.title) && isPresent(p.summary))
    .map((p) => ({
      ...p,
      highlights: compactStrings(p.highlights ?? []),
      tools: compactStrings(p.tools ?? []),
      links: (p.links ?? []).filter(
        (l) => isPresent(l.label) && isPresent(l.href),
      ),
      ...(isPresent(p.logoPath) ? { logoPath: p.logoPath } : {}),
    }));
}
