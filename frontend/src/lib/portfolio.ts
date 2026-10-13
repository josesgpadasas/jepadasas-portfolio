export type PortfolioLink = {
  label: string;
  href: string;
};

export type PortfolioExperience = {
  organization: string;
  role: string;
  period: string;
  location?: string;
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

/** Ensures list fields exist when API/cache returns a partial payload. */
export function normalizePortfolioProfile(
  data: Partial<PortfolioProfile> & Pick<PortfolioProfile, 'name' | 'title'>,
): PortfolioProfile {
  return {
    ...data,
    headline: data.headline ?? '',
    summary: data.summary ?? '',
    location: data.location ?? '',
    portraitPath: data.portraitPath ?? '/profile.jpg',
    links: data.links ?? [],
    focusAreas: data.focusAreas ?? [],
    capabilities: data.capabilities ?? [],
    experience: (data.experience ?? []).map((item) => ({
      ...item,
      highlights: item.highlights ?? [],
    })),
    projects: (data.projects ?? []).map((item) => ({
      ...item,
      highlights: item.highlights ?? [],
      tools: item.tools ?? [],
      links: item.links ?? [],
    })),
    education: data.education ?? [],
    competencies: data.competencies ?? [],
  };
}

import { getPortfolioProfile } from '@/data/portfolio/profile';

/** Loads profile from in-app data (Vercel-friendly; no NestJS required). */
export async function fetchPortfolioProfile(): Promise<PortfolioProfile> {
  return normalizePortfolioProfile(getPortfolioProfile());
}
