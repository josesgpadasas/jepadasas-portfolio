'use client';

import { useEffect, useRef, useState } from 'react';
import profilePortrait from '@/assets/profile.jpg';

type Props = {
  open: boolean;
};

/** Eye midpoint on the 1024px art canvas, as a fraction of the layer box. */
const EYE_CENTER = { x: 0.52, y: 0.43 };
/** Cursor distance (px) at which the irises reach the edge of their travel. */
const GAZE_REACH_PX = 240;
const GAZE_EASE = 0.16;

/** All layers share the same 1024×1024 canvas, so they stack pixel-aligned. */
function Layer({
  src,
  className = '',
  onError,
}: {
  src: string;
  className?: string;
  onError?: () => void;
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt=""
      width={160}
      height={160}
      className={`assistant-mascot__layer ${className}`}
      draggable={false}
      onError={onError}
    />
  );
}

function useCursorGaze(enabled: boolean) {
  const eyesRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = eyesRef.current;
    if (!enabled || !el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let targetX = 0;
    let targetY = 0;
    let x = 0;
    let y = 0;
    let frame = 0;

    const tick = () => {
      x += (targetX - x) * GAZE_EASE;
      y += (targetY - y) * GAZE_EASE;
      el.style.setProperty('--gaze-x', x.toFixed(3));
      el.style.setProperty('--gaze-y', y.toFixed(3));
      const settled = Math.abs(targetX - x) < 0.002 && Math.abs(targetY - y) < 0.002;
      frame = settled ? 0 : requestAnimationFrame(tick);
    };
    const wake = () => {
      if (!frame) frame = requestAnimationFrame(tick);
    };

    const onMove = (event: PointerEvent) => {
      const box = el.getBoundingClientRect();
      const dx = event.clientX - (box.left + box.width * EYE_CENTER.x);
      const dy = event.clientY - (box.top + box.height * EYE_CENTER.y);
      const distance = Math.hypot(dx, dy) || 1;
      const reach = Math.min(1, distance / GAZE_REACH_PX);
      targetX = (dx / distance) * reach;
      targetY = (dy / distance) * reach;
      wake();
    };
    const onLeave = () => {
      targetX = 0;
      targetY = 0;
      wake();
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    document.documentElement.addEventListener('pointerleave', onLeave);
    window.addEventListener('blur', onLeave);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', onMove);
      document.documentElement.removeEventListener('pointerleave', onLeave);
      window.removeEventListener('blur', onLeave);
    };
  }, [enabled]);

  return eyesRef;
}

export function AssistantMascot({ open }: Props) {
  const [rigOk, setRigOk] = useState(true);
  const eyesRef = useCursorGaze(rigOk);

  return (
    <span className="assistant-mascot__figure" aria-hidden>
      <span
        className={`assistant-mascot__bubble ${open ? 'assistant-mascot__bubble--open' : ''}`}
      >
        {open ? 'Close' : 'Ask me!'}
      </span>

      {rigOk ? (
        <span
          className={`assistant-mascot__rig ${open ? 'assistant-mascot__rig--open' : ''}`}
        >
          <span className="assistant-mascot__body">
            <Layer src="/mascot-body.png" onError={() => setRigOk(false)} />
            <span className="assistant-mascot__head">
              <Layer src="/mascot-head.png" />
              <span ref={eyesRef} className="assistant-mascot__eyes">
                <Layer src="/mascot-irises.png" className="assistant-mascot__irises" />
              </span>
              <span className="assistant-mascot__lid assistant-mascot__lid--left" />
              <span className="assistant-mascot__lid assistant-mascot__lid--right" />
            </span>
            <span className="assistant-mascot__hand">
              <Layer src="/mascot-hand.png" />
            </span>
          </span>
        </span>
      ) : (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src={profilePortrait.src}
          alt=""
          width={160}
          height={160}
          className="assistant-mascot__art--fallback"
          draggable={false}
        />
      )}
    </span>
  );
}
