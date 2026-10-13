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

export async function fetchPortfolioProfile(): Promise<PortfolioProfile | null> {
  const base =
    process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:3000/api/v1';
  try {
    const res = await fetch(`${base}/portfolio`, { cache: 'no-store' });
    if (!res.ok) return null;
    const json = (await res.json()) as Partial<PortfolioProfile>;
    if (!json.name || !json.title) return null;
    return normalizePortfolioProfile(
      json as Partial<PortfolioProfile> & Pick<PortfolioProfile, 'name' | 'title'>,
    );
  } catch {
    return null;
  }
}
