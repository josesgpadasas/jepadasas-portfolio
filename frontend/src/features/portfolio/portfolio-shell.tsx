'use client';

import { useState, type ReactNode } from 'react';
import { PageBackdrop } from '@/features/portfolio/page-backdrop';
import { ScrollToTop } from '@/features/portfolio/scroll-to-top';
import { SiteNav } from '@/features/portfolio/site-nav';

type Props = {
  children: ReactNode;
  showEducation: boolean;
  navTitle?: string;
  navSubtitle?: string;
};

export function PortfolioShell({
  children,
  showEducation,
  navTitle = 'josesgpadasas',
  navSubtitle = 'Personal Portfolio',
}: Props) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className="portfolio-shell relative min-h-screen w-full max-w-full overflow-x-clip"
      data-nav-expanded={expanded ? 'true' : 'false'}
    >
      <PageBackdrop />
      <SiteNav
        expanded={expanded}
        onToggle={() => setExpanded((v) => !v)}
        showEducation={showEducation}
        navTitle={navTitle}
        navSubtitle={navSubtitle}
      />
      <div className="shell-content min-h-screen min-w-0 w-full max-w-full box-border pt-[var(--mobile-header-height)] lg:pt-0 lg:pl-[var(--nav-width)]">
        {children}
      </div>
      <ScrollToTop />
    </div>
  );
}
