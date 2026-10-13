'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';

type Props = {
  children: ReactNode;
  className?: string;
  delayMs?: number;
  id?: string;
};

export function RevealSection({ children, className = '', delayMs = 0, id }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.06, rootMargin: '0px 0px -8% 0px' },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      id={id}
      ref={ref}
      style={{ transitionDelay: `${delayMs}ms` }}
      className={`reveal-section ${visible ? 'reveal-section--visible' : ''} ${className}`}
    >
      {children}
    </div>
  );
}
