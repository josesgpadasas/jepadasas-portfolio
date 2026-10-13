export type PortfolioLink = {
  label: string;
  href: string;
};

export type PortfolioExperience = {
  organization: string;
  role: string;
  period: string;
  location?: string;
  /** Public path to agency seal/logo (served from frontend /public). */
  logoPath?: string;
  highlights: string[];
};

export type PortfolioCapability = {
  title: string;
  description: string;
  tools: string[];
};

export type PortfolioEducation = {
  institution: string;
  degree: string;
  period: string;
  location?: string;
  logoPath?: string;
};

export type PortfolioProject = {
  title: string;
  period: string;
  organization: string;
  summary: string;
  highlights: string[];
  tools: string[];
  links: PortfolioLink[];
  logoPath?: string;
};

export type PortfolioProfile = {
  name: string;
  title: string;
  headline: string;
  summary: string;
  location: string;
  portraitPath: string;
  links: PortfolioLink[];
  focusAreas: string[];
  capabilities: PortfolioCapability[];
  experience: PortfolioExperience[];
  projects: PortfolioProject[];
  education: PortfolioEducation[];
  competencies: string[];
};
