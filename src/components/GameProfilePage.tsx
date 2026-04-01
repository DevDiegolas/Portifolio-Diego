import { useState } from 'react';

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

// ── Game card ──────────────────────────────────────────────────────────────
function GameCard({
  name, achievements, total, favorite, platinum = false, showProgress = false,
}: {
  name: string;
  achievements?: number;
  total?: number;
  favorite?: boolean;
  platinum?: boolean;
  showProgress?: boolean;
}) {
  const safeAchievements = achievements ?? 0;
  const safeTotal = total ?? 0;
  const pct = safeTotal > 0 ? Math.round((safeAchievements / safeTotal) * 100) : 0;
  const isPerfect = safeTotal > 0 && safeAchievements === safeTotal;
  return (
    <div
      className="rounded-lg p-4 space-y-2"
      style={{
        background: 'var(--t-bg-card)',
        border: `1px solid ${favorite ? 'var(--t-primary)' : 'var(--t-frame-line)'}`,
        boxShadow: favorite ? '0 0 12px color-mix(in srgb, var(--t-primary) 20%, transparent)' : undefined,
      }}
    >
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          {favorite && <span className="pixel-title text-xs shrink-0" style={{ color: 'var(--t-primary)' }}>♥</span>}
          <span className="pixel-title text-[0.65rem] sm:text-xs truncate" style={{ color: platinum || isPerfect ? 'var(--t-secondary)' : 'var(--t-frame-light)' }}>
            {(platinum || isPerfect) && '★ '}{name}
          </span>
        </div>
        {(platinum || isPerfect) && (
          <span
            className="pixel-title text-[0.55rem] shrink-0 px-2 py-0.5 rounded"
            style={{ color: 'var(--t-bg)', background: 'var(--t-secondary)' }}
          >
            100%
          </span>
        )}
      </div>
      {showProgress && (
        <>
          <div
            className="relative h-2.5 rounded-sm overflow-hidden"
            style={{ background: 'var(--t-bg)', border: '1px solid var(--t-frame-line)' }}
          >
            <div
              className="absolute inset-y-0 left-0 rounded-sm"
              style={{
                width: `${pct}%`,
                background: isPerfect ? 'var(--t-secondary)' : 'var(--t-primary)',
                boxShadow: `0 0 6px ${isPerfect ? 'var(--t-secondary)' : 'var(--t-primary)'}66`,
              }}
            />
          </div>
          <p className="pixel-body text-sm" style={{ color: 'var(--t-text-dimmer)' }}>
            {safeAchievements}/{safeTotal} achievements
          </p>
        </>
      )}
    </div>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────
export default function GameProfilePage() {
  const [cubeTab, setCubeTab] = useState<'perfect' | 'finished'>('perfect');

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8 w-full">
      <div
        className="relative rounded-2xl p-4 sm:p-6 md:p-8 space-y-6 sm:space-y-8"
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

        {/* ── Title ── */}
        <div className="text-center -mt-2">
          <p
            className="pixel-title text-sm md:text-base tracking-widest"
            style={{ color: 'var(--t-frame-light)', textShadow: '0 0 16px color-mix(in srgb, var(--t-frame) 53%, transparent)' }}
          >
            ◈ GAME PROFILE ◈
          </p>
          <p className="pixel-body text-xl mt-2" style={{ color: 'var(--t-text)' }}>
            Deus Gamer &nbsp;·&nbsp; Steam Level 20 &nbsp;·&nbsp; 198 Games
          </p>
          <p className="pixel-body text-base mt-0.5" style={{ color: 'var(--t-text-dim)' }}>
            São Paulo, Brazil &nbsp;|&nbsp; Member since 2018
          </p>
        </div>

        {/* ── FAVORITE GAMES ── */}
        <div>
          <SheetHeader>FAVORITE GAMES</SheetHeader>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <GameCard name="Hollow Knight" achievements={63} total={63} favorite platinum showProgress />
            <GameCard name="Hollow Knight: Silksong" favorite />
            <GameCard name="Rain World" favorite />
            <GameCard name="Outer Wilds" favorite />
            <GameCard name="Blue Prince" favorite />
          </div>
        </div>

        {/* ── PUZZLE MASTER ── */}
        <div>
          <SheetHeader>PUZZLE MASTER — ESCAPE ROOMS & MYSTERIES</SheetHeader>
          <p className="pixel-body text-lg mb-4 pl-1" style={{ color: 'var(--t-text-dim)' }}>
            Every Cube Escape cleared, every Room solved. A true puzzle connoisseur.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* The Room Series */}
            <div className="space-y-3">
              <p className="pixel-title text-xs pl-1" style={{ color: 'var(--t-tertiary)' }}>THE ROOM SERIES — ALL CLEARED</p>
              <GameCard
                name="The Room"
                achievements={5}
                total={5}
                platinum
                showProgress
              />
              <GameCard
                name="The Room Two"
                achievements={7}
                total={7}
                platinum
                showProgress
              />
              <GameCard
                name="The Room Three"
                achievements={6}
                total={10}
                showProgress
              />
              <GameCard
                name="The Room Four: Old Sins"
                achievements={8}
                total={8}
                platinum
                showProgress
              />
            </div>

            {/* Cube Escape */}
            <div className="space-y-3">
              <p className="pixel-title text-xs pl-1" style={{ color: 'var(--t-tertiary)' }}>CUBE ESCAPE / RUSTY LAKE — ALL CLEARED</p>
              <div
                className="rounded-lg p-5 space-y-3"
                style={{ background: 'var(--t-bg-card)', border: '1px solid var(--t-frame-line)' }}
              >
                <p className="pixel-body text-xl leading-relaxed" style={{ color: 'var(--t-text)' }}>
                  The entire Rusty Lake / Cube Escape saga — completed. From Cube Escape: Seasons to
                  Paradox, every surreal room was escaped, every timeline pieced together. Some with
                  full achievement completion. The lake remembers.
                </p>

                <div className="flex items-center gap-2 mt-2">
                  <button
                    type="button"
                    onClick={() => setCubeTab('perfect')}
                    className="pixel-title text-[0.55rem] px-2.5 py-1 rounded border"
                    style={{
                      color: cubeTab === 'perfect' ? 'var(--t-bg)' : 'var(--t-secondary)',
                      background: cubeTab === 'perfect' ? 'var(--t-secondary)' : 'var(--t-bg)',
                      borderColor: 'var(--t-frame-line)',
                    }}
                  >
                    100%
                  </button>
                  <button
                    type="button"
                    onClick={() => setCubeTab('finished')}
                    className="pixel-title text-[0.55rem] px-2.5 py-1 rounded border"
                    style={{
                      color: cubeTab === 'finished' ? 'var(--t-bg)' : 'var(--t-secondary)',
                      background: cubeTab === 'finished' ? 'var(--t-secondary)' : 'var(--t-bg)',
                      borderColor: 'var(--t-frame-line)',
                    }}
                  >
                    Just Finished
                  </button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {(cubeTab === 'perfect'
                    ? [
                        'Rusty Lake Hotel',
                        'Rusty Lake: Roots',
                        'The White Door',
                        'Samsara Room',
                        'Underground Blossom',
                        'The Mr. Rabbit Magic Show',
                      ]
                    : [
                        'Cube Escape Collection',
                        'Paradox',
                        'Rusty Lake Paradise',
                        'The Past Within',
                      ]
                  ).map(title => (
                    <span
                      key={title}
                      className="pixel-title text-[0.5rem] px-2 py-1 rounded"
                      style={{
                        color: 'var(--t-secondary)',
                        border: '1px solid var(--t-frame-line)',
                        background: 'var(--t-bg)',
                      }}
                    >
                      {cubeTab === 'perfect' ? '★ ' : ''}
                      {title}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── STATS OVERVIEW ── */}
        <div>
          <SheetHeader>PLAYER STATS</SheetHeader>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: 'GAMES OWNED', value: '198', color: 'var(--t-primary)' },
              { label: 'PERFECT GAMES', value: '22', color: 'var(--t-secondary)' },
              { label: 'REVIEWS', value: '24', color: 'var(--t-tertiary)' },
              { label: 'SCREENSHOTS', value: '588', color: 'var(--t-quaternary)' },
            ].map(s => (
              <div
                key={s.label}
                className="rounded-lg p-4 text-center"
                style={{ background: 'var(--t-bg-card)', border: '1px solid var(--t-frame-line)' }}
              >
                <p className="pixel-title text-sm sm:text-lg" style={{ color: s.color }}>{s.value}</p>
                <p className="pixel-title text-[0.5rem] sm:text-[0.6rem] mt-1" style={{ color: 'var(--t-text-dim)' }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Footer ── */}
        <div className="text-center pt-2">
          <a
            href="https://steamcommunity.com/id/MOGUSMOGUS/"
            target="_blank"
            rel="noreferrer"
            className="pixel-title text-[0.6rem] sm:text-xs tracking-widest hover:underline"
            style={{ color: 'var(--t-primary)' }}
          >
            VIEW FULL STEAM PROFILE →
          </a>
        </div>

      </div>
    </section>
  );
}
