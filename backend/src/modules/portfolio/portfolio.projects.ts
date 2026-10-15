import type { PortfolioProject } from './portfolio.types.js';
import { compactStrings, isPresent } from './portfolio.util.js';

/**
 * Selected systems from Portfolio_Joseph_E_Padasas.pdf (newest first).
 */
export const rawProjects: PortfolioProject[] = [
  {
    title: 'KMISS Document Monitoring System',
    period: '2025',
    organization: 'DHSUD – KMISS KMD',
    logoPath: '/logos/dhsud.svg',
    summary:
      'AppSheet web app for centralized upload, organization, and real-time tracking of documents (PDF, DOCX, XLSX) with search, filters, and role-based access for knowledge management workflows.',
    highlights: compactStrings([
      'Real-time document status tracking',
      'Advanced search and filtering',
      'Responsive layout for desktop and mobile',
    ]),
    tools: compactStrings(['AppSheet', 'Google Workspace']),
    links: [],
  },
  {
    title: 'Knowledge Portal Content Management Platform',
    period: '2025',
    organization: 'DHSUD – KMISS KMD',
    logoPath: '/logos/dhsud.svg',
    summary:
      'Google Apps Script platform for authorized staff to publish and maintain forms, templates, legal references, manuals, policies, guidelines, and training materials on the DHSUD Knowledge Portal.',
    highlights: compactStrings([
      'Add, edit, and retire knowledge products',
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
      'Google Apps Script web applications that consolidate legal references, manuals, policies, guidelines, training materials, and downloadable forms for DHSUD personnel.',
    highlights: compactStrings([
      'Single hub for internal and external transaction forms',
      'Supports knowledge sharing and version control',
    ]),
    tools: compactStrings(['Google Apps Script', 'Google Workspace']),
    links: [],
  },
  {
    title: 'DHSUD 4PH Web Page & Beneficiary Applications',
    period: '2025',
    organization: 'DHSUD',
    logoPath: '/logos/dhsud.svg',
    summary:
      'Public-facing site for the Pambansang Pabahay Para sa Pilipino (4PH) program, plus Google Apps Script tools for online beneficiary applications and real-time application tracking.',
    highlights: compactStrings([
      'Program information and transparency for housing applicants',
      'Online application form and status tracker',
    ]),
    tools: compactStrings([
      'Google Apps Script',
      'Google Sites / web publishing',
    ]),
    links: [],
  },
  {
    title: 'DHSUD Knowledge Portal',
    period: '2024',
    organization: 'DHSUD – KMISS KMD',
    logoPath: '/logos/dhsud.svg',
    summary:
      'Secure internal repository to centralize documents, resources, and institutional knowledge—supporting collaboration, workflow efficiency, and informed policy and program decisions under RA 11201.',
    highlights: compactStrings([
      'Captures best practices and expertise across units',
      'Structured access for DHSUD personnel',
    ]),
    tools: compactStrings(['Google Workspace', 'Knowledge management']),
    links: [],
  },
  {
    title: 'DHSUD GAD Corner',
    period: '2024',
    organization: 'DHSUD',
    logoPath: '/logos/dhsud.svg',
    summary:
      'Gender and Development (GAD) section on the official DHSUD website serving as a central repository for GAD-related information and resources within the department.',
    highlights: compactStrings(['Public GAD information hub on dhsud.gov.ph']),
    tools: compactStrings(['Web content', 'Google Sites']),
    links: [],
  },
  {
    title: 'KSA Reporting Platform (KSARP)',
    period: '2024',
    organization: 'DHSUD – Key Shelter Agencies',
    logoPath: '/logos/dhsud.svg',
    summary:
      'Digital reporting platform replacing spreadsheet-based collection for Key Shelter Agencies—using AppSheet and Looker Studio for centralized data, real-time dashboards, and analysis.',
    highlights: compactStrings([
      'Centralized accomplishment data for all KSAs',
      'Real-time visualization and dynamic reporting',
      'Data analysis for resource allocation',
    ]),
    tools: compactStrings(['AppSheet', 'Looker Studio', 'Google Workspace']),
    links: [],
  },
  {
    title: 'Scholarship Management System (e-SCHO)',
    period: '2023',
    organization: 'DILG',
    logoPath: '/logos/dilg.svg',
    summary:
      'Integrated platform for scholarship and study-grant applications with dashboards, tracking, and reporting—streamlining intake, Commitment Action Plans, and management visibility.',
    highlights: compactStrings([
      'Secured login and application processing',
      'Real-time dashboard and scholarship tracking',
      'Online document submission',
    ]),
    tools: compactStrings(['Web application', 'Database & dashboard']),
    links: [],
  },
  {
    title: 'LGU COVID-19 Monitoring System (LGU-CMS)',
    period: '2021 – 2022',
    organization: 'DILG',
    logoPath: '/logos/dilg.svg',
    summary:
      'AppSheet front end with Google Sheets backend for LGU online reporting and monitoring of COVID-19 data nationwide—supporting standardized gathering, analysis, and DILG oversight.',
    highlights: compactStrings([
      'User-friendly LGU data entry',
      'Comprehensive monitoring across administrative levels',
      'Reporting and visualization for decision support',
    ]),
    tools: compactStrings(['AppSheet', 'Google Sheets']),
    links: [
      {
        label: 'LGU-CMS user manual',
        href: 'https://bit.ly/LGU-CMS_Manual',
      },
    ],
  },
  {
    title: 'EOC Web Portal',
    period: '2020',
    organization: 'DILG',
    logoPath: '/logos/dilg.svg',
    summary:
      'Google Sites hub for COVID-19 information from LGUs nationwide, visualizing CQMS data with custom reports and granular maps—including barangay-level views via the DILG incident-rate map.',
    highlights: compactStrings([
      'Real-time CQMS data visualization',
      'Custom report generation',
      'Decision support for policies and interventions',
    ]),
    tools: compactStrings(['Google Sites', 'CQMS / Google Sheets']),
    links: [
      {
        label: 'EOC web portal',
        href: 'https://bit.ly/EOC-Web_Portal',
      },
    ],
  },
  {
    title: 'Community Quarantine Monitoring System (CQMS)',
    period: '2019',
    organization: 'DILG',
    logoPath: '/logos/dilg.svg',
    summary:
      'Online monitoring system using Google Sheets for LGU submission of community quarantine and COVID-19-related data across the Philippines—forms plus dashboard views.',
    highlights: compactStrings([
      'Nationwide LGU data gathering forms',
      'Dashboard for pandemic monitoring',
    ]),
    tools: compactStrings(['Google Sheets', 'Google Forms']),
    links: [],
  },
  {
    title: 'Government visual communications',
    period: '2018 – 2024',
    organization: 'DILG',
    logoPath: '/logos/dilg.svg',
    summary:
      'Layout and publication design for DILG programs—event posters, report covers, brochures, presentation covers, and related materials produced in Canva.',
    highlights: compactStrings([
      'Consistent branding for reports and events',
      'Support for communication and adoption of systems',
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
