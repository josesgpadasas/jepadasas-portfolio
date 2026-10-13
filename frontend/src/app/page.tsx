import { Suspense } from 'react';
import { PortfolioPage } from '@/features/portfolio/portfolio-page';

function PortfolioFallback() {
  return (
    <main className="mx-auto flex min-h-screen max-w-lg flex-col justify-center px-6 py-16">
      <p className="font-mono text-sm text-[var(--color-muted)]">
        Loading portfolio…
      </p>
    </main>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<PortfolioFallback />}>
      <PortfolioPage />
    </Suspense>
  );
}
