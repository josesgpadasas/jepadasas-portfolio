import { PortfolioShell } from '@/features/portfolio/portfolio-shell';
import { PortfolioView } from '@/features/portfolio/portfolio-view';
import {
  fetchPortfolioProfile,
  normalizePortfolioProfile,
} from '@/lib/portfolio';

export async function PortfolioPage() {
  const profile = await fetchPortfolioProfile();

  if (!profile) {
    return (
      <main className="mx-auto flex min-h-screen max-w-lg flex-col justify-center px-6 py-16">
        <h1 className="text-2xl font-semibold text-[var(--color-navy)]">
          Portfolio API unavailable
        </h1>
        <p className="mt-3 text-[var(--color-muted)]">
          Start the NestJS backend on port 3000, then refresh this page.
        </p>
        <code className="mt-6 block rounded border border-[var(--color-border)] bg-[var(--color-panel)] p-4 text-sm">
          cd backend && npm run start:dev
        </code>
      </main>
    );
  }

  const normalized = normalizePortfolioProfile(profile);

  return (
    <PortfolioShell
      showEducation={normalized.education.length > 0}
      displayName={normalized.name}
      navTitle="josesgpadasas"
      navSubtitle="Personal Portfolio"
    >
      <PortfolioView profile={normalized} />
    </PortfolioShell>
  );
}
