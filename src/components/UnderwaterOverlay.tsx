import { useEffect, useRef } from 'react';

// ── Pre-generated bubble data (sides of the screen) ──────────────────────
const BUBBLES = Array.from({ length: 24 }, (_, i) => ({
  id: i,
  size: 4 + Math.random() * 14,
  // cluster on left 0-10% or right 90-100%
  left: Math.random() < 0.5 ? Math.random() * 10 : 90 + Math.random() * 10,
  delay: Math.random() * 14,
  duration: 7 + Math.random() * 9,
  opacity: 0.12 + Math.random() * 0.25,
  wobble: -20 + Math.random() * 40, // horizontal drift
}));

export default function UnderwaterOverlay() {
  const trailRef = useRef<HTMLDivElement>(null);

  // ── Mouse trail bubbles ────────────────────────────────────────────────
  useEffect(() => {
    const container = trailRef.current;
    if (!container) return;

    let frame = 0;
    let lastX = 0;
    let lastY = 0;

    const spawn = (x: number, y: number) => {
      const el = document.createElement('div');
      el.className = 'uw-trail';
      const s = 3 + Math.random() * 7;
      el.style.cssText = `left:${x}px;top:${y}px;width:${s}px;height:${s}px;`;
      container.appendChild(el);
      setTimeout(() => el.remove(), 1100);
    };

    const onMove = (e: MouseEvent) => {
      // only spawn if moved enough
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      if (dx * dx + dy * dy < 120) return;
      lastX = e.clientX;
      lastY = e.clientY;

      if (frame) return;
      frame = requestAnimationFrame(() => {
        spawn(e.clientX, e.clientY);
        frame = 0;
      });
    };

    window.addEventListener('mousemove', onMove);
    return () => {
      window.removeEventListener('mousemove', onMove);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <>
      {/* ── SVG distortion filter ── */}
      <svg className="absolute w-0 h-0" aria-hidden="true">
        <defs>
          <filter id="uw-distort" x="-5%" y="-5%" width="110%" height="110%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.012 0.022"
              numOctaves={2}
              seed={3}
              result="noise"
            >
              <animate
                attributeName="baseFrequency"
                dur="10s"
                values="0.012 0.022;0.018 0.032;0.012 0.022"
                repeatCount="indefinite"
              />
            </feTurbulence>
            <feDisplacementMap in="SourceGraphic" in2="noise" scale={5} />
          </filter>
        </defs>
      </svg>

      {/* ── Blue-green color tint ── */}
      <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 9997 }}>
        <div className="absolute inset-0 uw-tint" />
        <div className="absolute inset-0 uw-caustics" />
      </div>

      {/* ── Floating bubbles (sides) ── */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 9998 }}>
        {BUBBLES.map(b => (
          <div
            key={b.id}
            className="uw-bubble"
            style={{
              left: `${b.left}%`,
              width: b.size,
              height: b.size,
              opacity: b.opacity,
              animationDelay: `${b.delay}s`,
              animationDuration: `${b.duration}s`,
              '--uw-wobble': `${b.wobble}px`,
            } as React.CSSProperties}
          />
        ))}
      </div>

      {/* ── Mouse trail container ── */}
      <div
        ref={trailRef}
        className="fixed inset-0 pointer-events-none overflow-hidden"
        style={{ zIndex: 9999 }}
      />
    </>
  );
}
