import { PortfolioShell } from '@/features/portfolio/portfolio-shell';
import { PortfolioView } from '@/features/portfolio/portfolio-view';
import { fetchPortfolioProfile } from '@/lib/portfolio';

export async function PortfolioPage() {
  const profile = await fetchPortfolioProfile();

  return (
    <PortfolioShell
      showEducation={profile.education.length > 0}
      navTitle="josesgpadasas"
      navSubtitle="Personal Portfolio"
    >
      <PortfolioView profile={profile} />
    </PortfolioShell>
  );
}
