const NA = new Set([
  '',
  'n/a',
  'na',
  'n.a.',
  'none',
  'not applicable',
  'not available',
  '-',
  '—',
]);

export function isPresent(value: unknown): boolean {
  if (value === null || value === undefined) return false;
  if (typeof value === 'string') {
    return !NA.has(value.trim().toLowerCase());
  }
  if (Array.isArray(value)) {
    return value.length > 0;
  }
  return true;
}

export function compactStrings(values: string[]): string[] {
  return values.filter(isPresent);
}

/** Omit private / non-PDS roles (e.g. bootcamp side gigs). */
export function isPortfolioExperienceEntry(organization: string): boolean {
  const org = organization.trim().toLowerCase();
  if (!org) return false;
  if (org.includes('welovenocode')) return false;
  return true;
}
