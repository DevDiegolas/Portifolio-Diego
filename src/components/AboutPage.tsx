import { useEffect, useState } from 'react';
import Footer from './Footer';

// ── Stat bar ───────────────────────────────────────────────────────────────
function StatBar({
  label, value, color, spec, delay,
}: {
  label: string; value: number; color: string; spec: string; delay: number;
}) {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setWidth(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);

  return (
    <div className="flex items-center gap-3">
      {/* Label */}
      <span
        className="pixel-title text-xs w-24 shrink-0 text-right"
        style={{ color: '#9e7d40' }}
      >
        {label}
      </span>

      {/* Bar */}
      <div
        className="relative h-4 flex-1 rounded-sm overflow-hidden"
        style={{ background: '#1a1208', border: '1px solid #3d2e12' }}
      >
        <div
          className="absolute inset-y-0 left-0 rounded-sm transition-all duration-1000 ease-out"
          style={{ width: `${width}%`, background: color, boxShadow: `0 0 8px ${color}88` }}
        />
        {/* Pixel segments */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: 'repeating-linear-gradient(90deg, transparent 0px, transparent 9px, rgba(0,0,0,0.4) 9px, rgba(0,0,0,0.4) 10px)',
          }}
        />
      </div>

      {/* Value */}
      <span className="pixel-title text-xs w-6 shrink-0" style={{ color }}>{value}</span>

      {/* Spec */}
      <span className="pixel-body text-lg text-slate-600 hidden md:block truncate">{spec}</span>
    </div>
  );
}

const STATS = [
  { label: 'FRONTEND', value: 82, color: '#8ecae6', spec: '— React, TypeScript, CSS',    delay: 300  },
  { label: 'BACKEND',  value: 67, color: '#9be564', spec: '— Node.js, Go, REST APIs',    delay: 450  },
  { label: 'GAME DEV', value: 72, color: '#f497c2', spec: '— Godot, Unity, GameMaker',   delay: 600  },
  { label: 'TEACHING', value: 90, color: '#ffd166', spec: '— Mentoring, Classes',         delay: 750  },
  { label: 'SYSTEMS',  value: 55, color: '#a78bfa', spec: '— AWS, PostgreSQL, Linux',     delay: 900  },
];

// ── Info row ───────────────────────────────────────────────────────────────
function InfoRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-start gap-3 py-1.5 border-b" style={{ borderColor: '#2a1f0a' }}>
      <span className="pixel-title text-xs w-16 shrink-0" style={{ color: '#9e7d40' }}>{label}</span>
      <span className="pixel-body text-xl text-slate-300">{value}</span>
    </div>
  );
}

// ── Corner decoration ──────────────────────────────────────────────────────
function Corner({ pos }: { pos: 'tl' | 'tr' | 'bl' | 'br' }) {
  const classes = {
    tl: 'top-0 left-0 border-t-2 border-l-2',
    tr: 'top-0 right-0 border-t-2 border-r-2',
    bl: 'bottom-0 left-0 border-b-2 border-l-2',
    br: 'bottom-0 right-0 border-b-2 border-r-2',
  }[pos];
  return (
    <div
      className={`absolute w-5 h-5 ${classes}`}
      style={{ borderColor: '#e8c97a' }}
    />
  );
}

// ── Section header ─────────────────────────────────────────────────────────
function SheetHeader({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <span className="pixel-title text-xs" style={{ color: '#e8c97a' }}>◈</span>
      <span className="pixel-title text-xs tracking-widest" style={{ color: '#e8c97a' }}>{children}</span>
      <span className="pixel-title text-xs" style={{ color: '#e8c97a' }}>◈</span>
      <div className="flex-1 h-px" style={{ background: '#3d2e12' }} />
    </div>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────
export default function AboutPage() {
  return (
    <div className="flex flex-col w-full mt-10 space-y-16">
      <section className="max-w-6xl mx-auto px-6 w-full">

        {/* Page title */}
        <h2 className="pixel-title text-xl md:text-2xl font-bold text-white mb-6 border-b border-gray-800 pb-4">
          About Me
        </h2>

        {/* ── Character Sheet frame ── */}
        <div
          className="relative rounded-2xl p-6 md:p-8 space-y-8"
          style={{
            background: '#0d0b06',
            border: '2px solid #c9a55c',
            boxShadow: '0 0 0 4px #3d2208, 0 0 0 6px #c9a55c44',
          }}
        >
          <Corner pos="tl" />
          <Corner pos="tr" />
          <Corner pos="bl" />
          <Corner pos="br" />

          {/* Sheet title */}
          <div className="text-center -mt-2">
            <p className="pixel-title text-sm md:text-base tracking-widest" style={{ color: '#e8c97a', textShadow: '0 0 16px #c9a55c88' }}>
              ◈ CHARACTER SHEET ◈
            </p>
          </div>

          {/* ── Identity + Attributes ── */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

            {/* Identity */}
            <div>
              <SheetHeader>IDENTITY</SheetHeader>
              <div className="space-y-0">
                <InfoRow label="NAME"   value="Diego" />
                <InfoRow label="CLASS"  value="Fullstack Engineer" />
                <InfoRow label="SPEC"   value="Game Developer" />
                <InfoRow label="ORIGIN" value="Brazil" />
                <InfoRow label="STATUS" value={
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-400 inline-block" style={{ boxShadow: '0 0 6px #4ade80' }} />
                    Active
                  </span>
                } />
                <InfoRow label="XP"     value="4+ Years" />
                <InfoRow label="BUILD"  value="v2.0" />
              </div>
            </div>

            {/* Attributes */}
            <div>
              <SheetHeader>ATTRIBUTES</SheetHeader>
              <div className="space-y-3">
                {STATS.map(s => (
                  <StatBar key={s.label} {...s} />
                ))}
              </div>
            </div>
          </div>

          {/* ── Lore ── */}
          <div>
            <SheetHeader>LORE</SheetHeader>
            <div className="space-y-4 pl-1">
              <p className="pixel-body text-xl text-slate-300 leading-relaxed">
                My journey in tech started in 2020 as a student at a programming school. I stayed there for
                years, learning deeply while gradually stepping into teaching roles. During the pandemic, classes
                moved online, and at 17 I became a monitor, helping students in hybrid classrooms while
                instructors handled remote sessions.
              </p>
              <p className="pixel-body text-xl text-slate-300 leading-relaxed">
                Before turning 18, I was already teaching some groups myself. It was a bit unusual to handle
                parent meetings at that age, but it built confidence and leadership early. Soon after, I started
                my Computer Science degree and continued teaching until I moved into a web and mobile support
                analyst role.
              </p>
              <p className="pixel-body text-xl text-slate-300 leading-relaxed">
                Later, I returned to teaching online and was invited by another school to teach as well. I had
                great feedback from students, but timing with college made full commitment difficult. Even so, I
                still keep a strong connection with education while working professionally as a developer.
              </p>
              <p className="pixel-body text-xl text-slate-300 leading-relaxed">
                Along this path, I built hands-on experience in both web and game development — GameMaker,
                Unity (2D and 3D), Godot, and Roblox Studio. A fun part of my story is that I often taught
                the same topics I was actively studying as a student, giving me a practical and evolving
                perspective.
              </p>
            </div>
          </div>

        </div>
      </section>

      <Footer />
    </div>
  );
}
