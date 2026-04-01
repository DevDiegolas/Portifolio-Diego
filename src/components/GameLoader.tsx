import { useEffect, useRef, useState } from 'react';
import { useTheme } from '../ThemeContext';

const STEPS: { target: number; duration: number; message: string }[] = [
  { target: 12, duration: 400,  message: 'Initializing engine...'    },
  { target: 28, duration: 600,  message: 'Loading assets...'          },
  { target: 41, duration: 300,  message: 'Compiling shaders...'       },
  { target: 57, duration: 700,  message: 'Spawning entities...'       },
  { target: 68, duration: 250,  message: 'Building world...'          },
  { target: 79, duration: 500,  message: 'Loading save data...'       },
  { target: 91, duration: 350,  message: 'Rendering pixel art...'     },
  { target: 100, duration: 450, message: 'Preparing portfolio...'     },
];

const TIPS = [
  'Tip: Diego ships fullstack apps and games from the same brain.',
  'Tip: Fluent in TypeScript, Go, React and game loops.',
  'Tip: Currently building Potato Clicker — an idle game.',
  'Tip: Solo Blocking is a fast combat prototype in development.',
  'Tip: Loves long-session retention mechanics and clean architecture.',
  'Tip: Game dev and software engineering are the same skill set.',
];

export default function GameLoader({ onComplete }: { onComplete: () => void }) {
  const { theme } = useTheme();
  const [progress, setProgress]   = useState(0);
  const [message, setMessage]     = useState(STEPS[0].message);
  const [fading, setFading]       = useState(false);
  const [tip]                     = useState(() => TIPS[Math.floor(Math.random() * TIPS.length)]);
  const [dots, setDots]           = useState('');
  const doneRef                   = useRef(false);

  const finish = () => {
    if (doneRef.current) return;
    doneRef.current = true;
    setProgress(100);
    setFading(true);
    setTimeout(onComplete, 700);
  };

  // Organic loading progress
  useEffect(() => {
    let stepIndex = 0;
    let frame: ReturnType<typeof setTimeout>;

    const runStep = () => {
      if (stepIndex >= STEPS.length) { finish(); return; }
      const step = STEPS[stepIndex];
      setMessage(step.message);

      const startVal = stepIndex === 0 ? 0 : STEPS[stepIndex - 1].target;
      const diff     = step.target - startVal;
      const interval = 16;
      const totalFrames = Math.round(step.duration / interval);
      let f = 0;

      const tick = () => {
        f++;
        // Ease-out curve
        const t = f / totalFrames;
        const eased = 1 - Math.pow(1 - t, 2);
        setProgress(Math.round(startVal + diff * eased));
        if (f < totalFrames) {
          frame = setTimeout(tick, interval);
        } else {
          stepIndex++;
          // Small pause between steps (feels more real)
          frame = setTimeout(runStep, 180 + Math.random() * 120);
        }
      };
      tick();
    };

    runStep();
    return () => clearTimeout(frame);
  }, []);

  // Animated dots after message
  useEffect(() => {
    const id = setInterval(() => setDots(d => d.length >= 3 ? '' : d + '.'), 380);
    return () => clearInterval(id);
  }, []);

  // Skip on any key or click
  useEffect(() => {
    const skip = () => finish();
    window.addEventListener('keydown', skip, { once: true });
    return () => window.removeEventListener('keydown', skip);
  }, []);

  const barFill = `${progress}%`;
  const c = theme.colors;

  const withAlpha = (hex: string, alpha: number) => {
    const clean = hex.replace('#', '');
    if (clean.length !== 6) return hex;
    const r = parseInt(clean.slice(0, 2), 16);
    const g = parseInt(clean.slice(2, 4), 16);
    const b = parseInt(clean.slice(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  return (
    <div
      className="fixed inset-0 z-9999 flex items-center justify-center select-none"
      style={{
        background: c.bgDarker,
        opacity: fading ? 0 : 1,
        transition: 'opacity 0.7s ease',
        pointerEvents: fading ? 'none' : 'auto',
      }}
      onClick={finish}
    >
      {/* Scanlines */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `repeating-linear-gradient(0deg, ${withAlpha(c.text, 0.03)} 0px, ${withAlpha(c.text, 0.03)} 1px, transparent 1px, transparent 4px)`,
        }}
      />

      {/* Subtle grid */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            `linear-gradient(${withAlpha(c.primary, 0.04)} 1px, transparent 1px),` +
            `linear-gradient(90deg, ${withAlpha(c.primary, 0.04)} 1px, transparent 1px)`,
          backgroundSize: '48px 48px',
        }}
      />

      {/* Corner brackets */}
      {(['top-5 left-5 border-t-2 border-l-2',
         'top-5 right-5 border-t-2 border-r-2',
         'bottom-5 left-5 border-b-2 border-l-2',
         'bottom-5 right-5 border-b-2 border-r-2',
      ] as const).map((cls, i) => (
        <div key={i} aria-hidden className={`absolute w-7 h-7 ${cls}`} style={{ borderColor: withAlpha(c.primary, 0.3) }} />
      ))}

      {/* Version tag — top-right */}
      <p className="pixel-title absolute top-7 right-12 text-xs" style={{ color: 'var(--t-text-dim)' }}>v2.0</p>

      {/* ── Main card ── */}
      <div className="flex flex-col items-center gap-10 w-full max-w-md px-8">

        {/* Studio label */}
        <p className="pixel-title text-xs tracking-[0.3em] uppercase" style={{ color: 'var(--t-text-dim)' }}>
          Diegolas Studio
        </p>

        {/* Logo / Title */}
        <div className="text-center space-y-2">
          <h1
            className="pixel-title text-4xl md:text-5xl leading-tight"
            style={{ color: 'var(--t-text)', textShadow: `0 0 24px ${withAlpha(c.primary, 0.66)}, 0 0 60px ${withAlpha(c.primary, 0.13)}` }}
          >
            DIEGO
            <span style={{ color: c.primary, textShadow: `0 0 16px ${c.primary}` }}>
              .EXE
            </span>
          </h1>
          <p className="pixel-body text-2xl" style={{ color: 'var(--t-text-muted)' }}>Portfolio  -  Game Dev &amp; Fullstack</p>
        </div>

        {/* Loading bar */}
        <div className="w-full space-y-2">
          {/* Bar */}
          <div
            className="relative w-full h-5 rounded-sm overflow-hidden"
            style={{ background: c.bgCard, border: `1px solid ${withAlpha(c.primary, 0.15)}` }}
          >
            {/* Fill */}
            <div
              className="absolute inset-y-0 left-0 rounded-sm"
              style={{
                width: barFill,
                background: `linear-gradient(90deg, ${c.fifth} 0%, ${c.primary} 100%)`,
                boxShadow: `0 0 10px ${withAlpha(c.primary, 0.47)}`,
                transition: 'width 0.05s linear',
              }}
            />
            {/* Pixel segments overlay */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage: `repeating-linear-gradient(90deg, transparent 0px, transparent 11px, ${withAlpha(c.bgDarker, 0.7)} 11px, ${withAlpha(c.bgDarker, 0.7)} 12px)`,
              }}
            />
          </div>

          {/* Message + percent */}
          <div className="flex items-start justify-between gap-4">
            <p className="pixel-title text-xs leading-relaxed" style={{ color: withAlpha(c.primary, 0.9) }}>
              {message.replace('...', '')}<span className="inline-block w-6">{dots}</span>
            </p>
            <p className="pixel-title text-xs shrink-0" style={{ color: 'var(--t-text-muted)' }}>{progress}%</p>
          </div>
        </div>

        {/* Tip */}
        <div
          className="w-full rounded border px-4 py-3"
          style={{ borderColor: withAlpha(c.primary, 0.08), background: withAlpha(c.primary, 0.03) }}
        >
          <p className="pixel-body text-lg leading-relaxed" style={{ color: 'var(--t-text-muted)' }}>{tip}</p>
        </div>

        {/* Skip hint */}
        <p
          className="pixel-title text-xs"
          style={{ color: 'var(--t-text-dim)', animation: 'pulse 2s ease-in-out infinite' }}
        >
          CLICK OR PRESS ANY KEY TO SKIP
        </p>
      </div>
    </div>
  );
}
