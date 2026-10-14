'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  IconCollapse,
  IconExpand,
  NavIcon,
  type NavIconId,
} from '@/features/portfolio/nav-icons';

const baseSections: {
  id: NavIconId;
  label: string;
}[] = [
  { id: 'about', label: 'Profile' },
  { id: 'focus', label: 'Focus' },
  { id: 'capabilities', label: 'Systems' },
  { id: 'experience', label: 'Experience' },
  { id: 'education', label: 'Education' },
  { id: 'competencies', label: 'Stack' },
  { id: 'projects', label: 'Projects' },
  { id: 'connect', label: 'Connect' },
];

type Props = {
  expanded: boolean;
  onToggle: () => void;
  showEducation?: boolean;
  displayName?: string;
  navTitle?: string;
  navSubtitle?: string;
};

export function SiteNav({
  expanded,
  onToggle,
  showEducation = true,
  displayName = 'Portfolio',
  navTitle = 'josesgpadasas',
  navSubtitle = 'Personal Portfolio',
}: Props) {
  const sections = useMemo(
    () =>
      baseSections.filter(
        (item) => item.id !== 'education' || showEducation,
      ),
    [showEducation],
  );

  const [activeId, setActiveId] = useState<string>(sections[0]?.id ?? 'about');

  useEffect(() => {
    const elements = sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target.id) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: '-25% 0px -60% 0px', threshold: [0, 0.25, 0.5, 1] },
    );

    for (const el of elements) observer.observe(el);
    return () => observer.disconnect();
  }, [sections]);

  const closeMobileOverlay = useCallback(() => {
    if (
      expanded &&
      typeof window !== 'undefined' &&
      window.matchMedia('(width < 1024px)').matches
    ) {
      onToggle();
    }
  }, [expanded, onToggle]);

  useEffect(() => {
    if (!expanded) return;
    const mq = window.matchMedia('(width < 1024px)');
    if (!mq.matches) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onToggle();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [expanded, onToggle]);

  const initials =
    displayName
      .split(' ')
      .filter(Boolean)
      .slice(0, 3)
      .map((part) => part[0]?.toUpperCase() ?? '')
      .join('') || 'JEP';

  return (
    <>
      {expanded ? (
        <button
          type="button"
          aria-label="Close navigation"
          className="nav-mobile-backdrop fixed inset-0 z-[45] lg:hidden"
          onClick={onToggle}
        />
      ) : null}

      <aside
        aria-label="Primary"
        className={`nav-rail fixed inset-y-0 left-0 z-50 flex flex-col border-r border-[var(--color-nav-border)] pt-[env(safe-area-inset-top,0px)] transition-[width] duration-300 ease-out ${
          expanded ? 'w-64' : 'w-[4.75rem]'
        }`}
      >
        <div
          className={`flex shrink-0 items-center border-b border-[var(--color-nav-border)] ${
            expanded ? 'justify-between gap-2 px-4 py-5' : 'flex-col gap-3 py-4'
          }`}
        >
          <div
            className={`flex items-center ${expanded ? 'min-w-0 gap-3' : 'justify-center'}`}
          >
            <div
              aria-hidden
              className="flex h-10 w-10 shrink-0 items-center justify-center border border-[var(--color-sky)] bg-[var(--color-nav-elevated)] font-mono text-xs font-medium text-[var(--color-sky)]"
            >
              {initials || 'JEP'}
            </div>
            {expanded ? (
              <div className="min-w-0">
                <p className="truncate font-mono text-sm font-semibold text-white">
                  {navTitle}
                </p>
                <p className="truncate text-[10px] uppercase tracking-wider text-[var(--color-nav-muted)]">
                  {navSubtitle}
                </p>
              </div>
            ) : null}
          </div>
          <button
            type="button"
            onClick={onToggle}
            aria-expanded={expanded}
            aria-label={expanded ? 'Collapse navigation' : 'Expand navigation'}
            className="nav-toggle flex h-9 w-9 shrink-0 items-center justify-center border border-[var(--color-nav-border)] text-[var(--color-nav-text)] hover:border-[var(--color-sky)] hover:bg-[var(--color-nav-elevated)] hover:text-white"
          >
            {expanded ? (
              <IconCollapse className="h-5 w-5" aria-hidden />
            ) : (
              <IconExpand className="h-5 w-5" aria-hidden />
            )}
          </button>
        </div>

        <nav className="flex-1 overflow-x-hidden overflow-y-auto py-4">
          {expanded ? (
            <p className="mb-2 px-4 font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--color-nav-muted)]">
              Navigate
            </p>
          ) : null}
          <ul className={`space-y-1 ${expanded ? 'px-2' : 'px-1.5'}`}>
            {sections.map((item) => {
              const active = activeId === item.id;
              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    title={!expanded ? item.label : undefined}
                    aria-current={active ? 'location' : undefined}
                    onClick={closeMobileOverlay}
                    className={`nav-link group flex items-center rounded-sm ${
                      expanded
                        ? 'gap-3 border-l-2 px-3 py-2.5'
                        : 'mx-auto w-10 justify-center py-2.5'
                    } ${
                      active
                        ? expanded
                          ? 'border-[var(--color-sky)] bg-[var(--color-nav-active)] text-white'
                          : 'bg-[var(--color-nav-active)] text-white'
                        : expanded
                          ? 'border-transparent text-[var(--color-nav-text)] hover:border-[var(--color-nav-border)] hover:bg-[var(--color-nav-elevated)] hover:text-white'
                          : 'text-[var(--color-nav-text)] hover:bg-[var(--color-nav-elevated)] hover:text-white'
                    }`}
                  >
                    <NavIcon
                      id={item.id}
                      className={`h-5 w-5 shrink-0 ${
                        active
                          ? 'text-[var(--color-sky)]'
                          : 'text-[var(--color-nav-muted)] group-hover:text-[var(--color-sky)]'
                      }`}
                      aria-hidden
                    />
                    {expanded ? (
                      <span className="truncate text-sm font-medium">
                        {item.label}
                      </span>
                    ) : null}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        {expanded ? (
          <div className="shrink-0 border-t border-[var(--color-nav-border)] px-4 py-4 font-mono text-[10px] leading-relaxed text-[var(--color-nav-muted)]">
            <p>NEXT · NESTJS · OPENAPI</p>
            <p className="mt-1 text-[var(--color-nav-text)]">v1.0</p>
          </div>
        ) : (
          <div className="shrink-0 py-3 text-center">
            <span className="status-pulse inline-block h-2 w-2 rounded-full bg-[var(--color-signal)]" />
          </div>
        )}
      </aside>
    </>
  );
}
