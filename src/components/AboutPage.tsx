import TerminalShell from './TerminalShell';

// ── Stat bar ───────────────────────────────────────────────────────────────
function StatBar({
  label, value, color, spec, delay,
}: {
  label: string; value: number; color: string; spec: string; delay: number;
}) {
  return (
    <div className="flex items-center gap-3">
      <span
        className="pixel-title text-xs w-24 shrink-0 text-right"
        style={{ color: 'var(--t-frame-dark)' }}
      >
        {label}
      </span>
      <div
        className="relative h-4 flex-1 rounded-sm overflow-hidden"
        style={{ background: 'var(--t-bg-card)', border: `1px solid var(--t-frame-line)` }}
      >
        <div
          className="absolute inset-y-0 left-0 rounded-sm"
          style={{
            width: `${value}%`,
            background: color,
            boxShadow: `0 0 8px ${color}88`,
            transformOrigin: 'left',
            animation: `stat-bar-grow 1s ease-out ${delay}ms both`,
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: 'repeating-linear-gradient(90deg, transparent 0px, transparent 9px, rgba(0,0,0,0.4) 9px, rgba(0,0,0,0.4) 10px)',
          }}
        />
      </div>
      <span className="pixel-title text-xs w-6 shrink-0" style={{ color }}>{value}</span>
      <span className="pixel-body text-lg hidden md:block w-48 truncate" style={{ color: 'var(--t-text-dim)' }}>{spec}</span>
    </div>
  );
}

const STATS = [
  { label: 'FRONTEND', value: 82, color: 'var(--t-primary)',    spec: '— React, TypeScript, CSS',    delay: 300  },
  { label: 'BACKEND',  value: 67, color: 'var(--t-secondary)',  spec: '— Node.js, Go, REST APIs',    delay: 450  },
  { label: 'GAME DEV', value: 93, color: 'var(--t-quaternary)', spec: '— Godot, Unity, GameMaker',   delay: 600  },
  { label: 'TEACHING', value: 90, color: 'var(--t-tertiary)',   spec: '— Mentoring, Classes',         delay: 750  },
  { label: 'SYSTEMS',  value: 55, color: 'var(--t-fifth)',      spec: '— AWS, PostgreSQL, Linux',     delay: 900  },
];

// ── Info row ───────────────────────────────────────────────────────────────
function InfoRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 py-1.5 border-b" style={{ borderColor: 'var(--t-frame-line-dark)' }}>
      <span className="pixel-title text-xs w-20 shrink-0 text-right" style={{ color: 'var(--t-frame-dark)' }}>{label}</span>
      <span className="pixel-body text-xl leading-tight" style={{ color: 'var(--t-text)' }}>{value}</span>
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
      style={{ borderColor: 'var(--t-frame-light)' }}
    />
  );
}

// ── Section header ─────────────────────────────────────────────────────────
function SheetHeader({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <span className="pixel-title text-xs" style={{ color: 'var(--t-frame-light)' }}>◈</span>
      <span className="pixel-title text-xs tracking-widest" style={{ color: 'var(--t-frame-light)' }}>{children}</span>
      <span className="pixel-title text-xs" style={{ color: 'var(--t-frame-light)' }}>◈</span>
      <div className="flex-1 h-px" style={{ background: 'var(--t-frame-line)' }} />
    </div>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────
export default function AboutPage() {
  return (
    <TerminalShell currentPath="/about">
      <section className="max-w-6xl mx-auto px-6 py-8 w-full">

        {/* ── Character Sheet frame ── */}
        <div
          className="relative rounded-2xl p-6 md:p-8 space-y-8"
          style={{
            background: 'var(--t-frame-bg)',
            border: '2px solid var(--t-frame)',
            boxShadow: '0 0 0 4px var(--t-frame-outer), 0 0 0 6px color-mix(in srgb, var(--t-frame) 27%, transparent)',
          }}
        >
          <Corner pos="tl" />
          <Corner pos="tr" />
          <Corner pos="bl" />
          <Corner pos="br" />

          {/* Sheet title */}
          <div className="text-center -mt-2">
            <p className="pixel-title text-sm md:text-base tracking-widest" style={{ color: 'var(--t-frame-light)', textShadow: '0 0 16px color-mix(in srgb, var(--t-frame) 53%, transparent)' }}>
              ◈ CHARACTER SHEET ◈
            </p>
          </div>

          {/* ── Identity + Attributes ── */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

            {/* Identity */}
            <div>
              <SheetHeader>IDENTITY</SheetHeader>
              <div className="space-y-0">
                <InfoRow label="NAME"   value="Diego Gonçalves Piovezan Santana" />
                <InfoRow label="CLASS"  value="Fullstack Engineer" />
                <InfoRow label="SPEC"   value="Game Developer" />
                <InfoRow label="ORIGIN" value="Brazil" />
                <InfoRow label="STATUS" value={
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full inline-block" style={{ background: 'var(--t-secondary)', boxShadow: '0 0 6px var(--t-secondary)' }} />
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
              <p className="pixel-body text-xl leading-relaxed" style={{ color: 'var(--t-text)' }}>
                My journey in tech started in 2020 as a student at a programming school. I stayed there for
                years, learning deeply while gradually stepping into teaching roles. During the pandemic, classes
                moved online, and at 17 I became a monitor, helping students in hybrid classrooms while
                instructors handled remote sessions.
              </p>
              <p className="pixel-body text-xl leading-relaxed" style={{ color: 'var(--t-text)' }}>
                Before turning 18, I was already teaching some groups myself. It was a bit unusual to handle
                parent meetings at that age, but it built confidence and leadership early. Soon after, I started
                my Computer Science degree and continued teaching until I moved into a web and mobile support
                analyst role.
              </p>
              <p className="pixel-body text-xl leading-relaxed" style={{ color: 'var(--t-text)' }}>
                Later, I returned to teaching online and was invited by another school to teach as well. I had
                great feedback from students, but timing with college made full commitment difficult. Even so, I
                still keep a strong connection with education while working professionally as a developer.
              </p>
              <p className="pixel-body text-xl leading-relaxed" style={{ color: 'var(--t-text)' }}>
                Along this path, I built hands-on experience in both web and game development — GameMaker,
                Unity (2D and 3D), Godot, and Roblox Studio. A fun part of my story is that I often taught
                the same topics I was actively studying as a student, giving me a practical and evolving
                perspective.
              </p>
            </div>
          </div>

        </div>
      </section>
    </TerminalShell>
  );
}
