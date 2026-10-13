'use client';

import { useState, type CSSProperties, type ReactNode } from 'react';
import { PageBackdrop } from '@/features/portfolio/page-backdrop';
import { ScrollToTop } from '@/features/portfolio/scroll-to-top';
import { SiteNav } from '@/features/portfolio/site-nav';

const NAV_EXPANDED = '16rem';
const NAV_COLLAPSED = '4.75rem';

type Props = {
  children: ReactNode;
  showEducation: boolean;
  /** Used for avatar initials (e.g. full name). */
  displayName: string;
  navTitle?: string;
  navSubtitle?: string;
};

export function PortfolioShell({
  children,
  showEducation,
  displayName,
  navTitle = 'josesgpadasas',
  navSubtitle = 'Personal Portfolio',
}: Props) {
  const [expanded, setExpanded] = useState(false);

  const shellStyle = {
    '--nav-width': expanded ? NAV_EXPANDED : NAV_COLLAPSED,
  } as CSSProperties;

  return (
    <div
      className="portfolio-shell relative min-h-screen w-full max-w-full overflow-x-clip"
      data-nav-expanded={expanded ? 'true' : 'false'}
      style={shellStyle}
    >
      <PageBackdrop />
      <SiteNav
        expanded={expanded}
        onToggle={() => setExpanded((v) => !v)}
        showEducation={showEducation}
        displayName={displayName}
        navTitle={navTitle}
        navSubtitle={navSubtitle}
      />
      <div className="shell-content min-h-screen min-w-0 w-full max-w-full box-border lg:pl-[var(--nav-width)]">
        {children}
      </div>
      <ScrollToTop />
    </div>
  );
}
