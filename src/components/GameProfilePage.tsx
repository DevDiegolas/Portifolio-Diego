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

// ── Achievement bar ────────────────────────────────────────────────────────
function AchievementBar({
  label, current, total, color, delay,
}: {
  label: string; current: number; total: number; color: string; delay: number;
}) {
  const pct = Math.round((current / total) * 100);
  const isPerfect = current === total;
  return (
    <div className="flex items-center gap-2 sm:gap-3">
      <span
        className="pixel-title text-[0.55rem] sm:text-[0.65rem] w-28 sm:w-36 shrink-0 text-right truncate"
        style={{ color: isPerfect ? 'var(--t-secondary)' : 'var(--t-frame-dark)' }}
      >
        {isPerfect && '★ '}{label}
      </span>
      <div
        className="relative h-4 flex-1 rounded-sm overflow-hidden"
        style={{ background: 'var(--t-bg-card)', border: '1px solid var(--t-frame-line)' }}
      >
        <div
          className="absolute inset-y-0 left-0 rounded-sm"
          style={{
            width: `${pct}%`,
            background: isPerfect ? 'var(--t-secondary)' : color,
            boxShadow: `0 0 8px ${isPerfect ? 'var(--t-secondary)' : color}88`,
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
      <span className="pixel-title text-[0.55rem] sm:text-[0.65rem] w-16 shrink-0 text-right" style={{ color: isPerfect ? 'var(--t-secondary)' : color }}>
        {current}/{total}
      </span>
    </div>
  );
}

// ── Game card ──────────────────────────────────────────────────────────────
function GameCard({
  name, hours, achievements, total, note, favorite,
}: {
  name: string; hours?: string; achievements: number; total: number; note?: string; favorite?: boolean;
}) {
  const pct = Math.round((achievements / total) * 100);
  const isPerfect = achievements === total;
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
          <span className="pixel-title text-[0.65rem] sm:text-xs truncate" style={{ color: isPerfect ? 'var(--t-secondary)' : 'var(--t-frame-light)' }}>
            {isPerfect && '★ '}{name}
          </span>
        </div>
        <span
          className="pixel-title text-[0.55rem] shrink-0 px-2 py-0.5 rounded"
          style={{
            color: isPerfect ? 'var(--t-bg)' : pct >= 80 ? 'var(--t-secondary)' : 'var(--t-text-dim)',
            background: isPerfect ? 'var(--t-secondary)' : 'transparent',
            border: isPerfect ? 'none' : '1px solid var(--t-frame-line)',
          }}
        >
          {isPerfect ? '100%' : `${pct}%`}
        </span>
      </div>
      {hours && (
        <p className="pixel-body text-base" style={{ color: 'var(--t-text-dim)' }}>{hours} played</p>
      )}
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
        {achievements}/{total} achievements
      </p>
      {note && (
        <p className="pixel-body text-base leading-relaxed" style={{ color: 'var(--t-text-dim)' }}>{note}</p>
      )}
    </div>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────
export default function GameProfilePage() {
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

        {/* ── HALL OF FAME — 100% ── */}
        <div>
          <SheetHeader>HALL OF FAME — PERFECT GAMES</SheetHeader>
          <p className="pixel-body text-lg mb-4 pl-1" style={{ color: 'var(--t-text-dim)' }}>
            Games completed with every single achievement unlocked.
          </p>
          <div className="space-y-3">
            <AchievementBar label="Hollow Knight"  current={63} total={63} color="var(--t-primary)"   delay={300} />
            <AchievementBar label="The Room"        current={5}  total={5}  color="var(--t-tertiary)" delay={450} />
            <AchievementBar label="The Room Two"    current={7}  total={7}  color="var(--t-tertiary)" delay={600} />
          </div>
        </div>

        {/* ── FAVORITE GAMES ── */}
        <div>
          <SheetHeader>FAVORITE GAMES</SheetHeader>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div
              className="md:col-span-3 rounded-lg p-5 space-y-3"
              style={{
                background: 'var(--t-bg-card)',
                border: '1px solid var(--t-primary)',
                boxShadow: '0 0 16px color-mix(in srgb, var(--t-primary) 25%, transparent)',
              }}
            >
              <div className="flex items-center gap-2">
                <span className="pixel-title text-xs" style={{ color: 'var(--t-primary)' }}>♥</span>
                <span className="pixel-title text-xs sm:text-sm" style={{ color: 'var(--t-secondary)' }}>★ HOLLOW KNIGHT — 100%</span>
              </div>
              <p className="pixel-body text-xl leading-relaxed" style={{ color: 'var(--t-text)' }}>
                167 hours of pure dedication. All 63 achievements unlocked — every pantheon conquered,
                Steel Soul completed, speedruns done, and 112% map completion reached. This is the game
                that defines the standard. The Radiance fell, the Hollow Knight was freed, and every
                challenge this masterpiece had to offer was overcome.
              </p>
              <div className="flex flex-wrap gap-3 mt-1">
                {['All Pantheons', 'Steel Soul', '112% Completion', 'Speedrun', 'All Bosses'].map(tag => (
                  <span
                    key={tag}
                    className="pixel-title text-[0.55rem] px-2 py-1 rounded"
                    style={{ color: 'var(--t-secondary)', border: '1px solid var(--t-frame-line)', background: 'var(--t-bg)' }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div
              className="rounded-lg p-5 space-y-3"
              style={{
                background: 'var(--t-bg-card)',
                border: '1px solid var(--t-primary)',
                boxShadow: '0 0 12px color-mix(in srgb, var(--t-primary) 15%, transparent)',
              }}
            >
              <div className="flex items-center gap-2">
                <span className="pixel-title text-xs" style={{ color: 'var(--t-primary)' }}>♥</span>
                <span className="pixel-title text-[0.65rem] sm:text-xs" style={{ color: 'var(--t-frame-light)' }}>HOLLOW KNIGHT: SILKSONG</span>
              </div>
              <p className="pixel-body text-xl leading-relaxed" style={{ color: 'var(--t-text)' }}>
                The long-awaited sequel — 47 hours in and 73% achievements unlocked. Actively chasing
                the full completion with Steel Soul and True Hunter runs still ahead.
              </p>
              <AchievementBar label="Progress" current={38} total={52} color="var(--t-primary)" delay={300} />
            </div>

            <div
              className="rounded-lg p-5 space-y-3"
              style={{
                background: 'var(--t-bg-card)',
                border: '1px solid var(--t-primary)',
                boxShadow: '0 0 12px color-mix(in srgb, var(--t-primary) 15%, transparent)',
              }}
            >
              <div className="flex items-center gap-2">
                <span className="pixel-title text-xs" style={{ color: 'var(--t-primary)' }}>♥</span>
                <span className="pixel-title text-[0.65rem] sm:text-xs" style={{ color: 'var(--t-frame-light)' }}>RAIN WORLD</span>
              </div>
              <p className="pixel-body text-xl leading-relaxed" style={{ color: 'var(--t-text)' }}>
                A brutally beautiful ecosystem sim. Completed the Pilgrimage — one of the hardest
                paths in any game — alongside Survivor, Hunter, Monk, and Saint campaigns. Dragon Slayer
                earned. This world doesn't care about you, and that's what makes it special.
              </p>
              <AchievementBar label="Progress" current={27} total={47} color="var(--t-quaternary)" delay={450} />
            </div>

            <div
              className="rounded-lg p-5 space-y-3"
              style={{
                background: 'var(--t-bg-card)',
                border: '1px solid var(--t-primary)',
                boxShadow: '0 0 12px color-mix(in srgb, var(--t-primary) 15%, transparent)',
              }}
            >
              <div className="flex items-center gap-2">
                <span className="pixel-title text-xs" style={{ color: 'var(--t-primary)' }}>♥</span>
                <span className="pixel-title text-[0.65rem] sm:text-xs" style={{ color: 'var(--t-frame-light)' }}>BLASPHEMOUS</span>
              </div>
              <p className="pixel-body text-xl leading-relaxed" style={{ color: 'var(--t-text)' }}>
                A dark metroidvania with souls-like combat. 93% complete with a sub-3-hour speedrun
                under the belt. Only a couple of achievements away from perfection.
              </p>
              <AchievementBar label="Progress" current={42} total={45} color="var(--t-fifth)" delay={600} />
            </div>
          </div>
        </div>

        {/* ── SOULS-LIKES ── */}
        <div>
          <SheetHeader>SOULS-LIKES — PREPARE TO DIE</SheetHeader>
          <p className="pixel-body text-lg mb-4 pl-1" style={{ color: 'var(--t-text-dim)' }}>
            From the Lands Between to Ashina — if it punishes, it's on the list.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <GameCard
              name="Elden Ring"
              achievements={27}
              total={42}
              note="Claimed both Elden Lord and Age of Stars endings. Malenia defeated. The Tarnished endures."
            />
            <GameCard
              name="Dark Souls III"
              achievements={24}
              total={43}
              note="The Abyss Watchers, Yhorm, the Nameless King — none were spared. A journey through Lothric's finest."
            />
            <GameCard
              name="Sekiro: Shadows Die Twice"
              achievements={12}
              total={34}
              note="Genichiro, Lady Butterfly, Guardian Ape, Owl — the way of the shinobi demands precision."
            />
            <GameCard
              name="Salt and Sanctuary"
              achievements={0}
              total={0}
              note="A 2D souls-like that feels like home. Showcased as a Steam favorite — the salt is real."
            />
            <GameCard
              name="Dark Souls Remastered"
              achievements={0}
              total={41}
              note="The original legend. In the collection, waiting to be kindled."
            />
            <GameCard
              name="Dark Souls II: Scholar of the First Sin"
              achievements={0}
              total={38}
              note="Bearer of the curse. The full Dark Souls trilogy stands ready."
            />
          </div>
        </div>

        {/* ── ROGUE-LIKES ── */}
        <div>
          <SheetHeader>ROGUE-LIKES — ONE MORE RUN</SheetHeader>
          <p className="pixel-body text-lg mb-4 pl-1" style={{ color: 'var(--t-text-dim)' }}>
            The "just one more run" addiction. Death is progress.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <GameCard
              name="Enter the Gungeon"
              achievements={46}
              total={54}
              note="Lead God achieved — 5 master rounds in a single run. All character pasts completed. The Gungeon respects no one."
            />
            <GameCard
              name="Dead Cells"
              achievements={66}
              total={121}
              note="Multiple boss takedowns and DLC exploration. The Beheaded keeps coming back."
            />
          </div>
        </div>

        {/* ── METROIDVANIAS ── */}
        <div>
          <SheetHeader>METROIDVANIAS — EXPLORE EVERYTHING</SheetHeader>
          <p className="pixel-body text-lg mb-4 pl-1" style={{ color: 'var(--t-text-dim)' }}>
            Interconnected worlds, ability gates, and the joy of finding a shortcut back to a save point.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <GameCard
              name="Hollow Knight"
              achievements={63}
              total={63}
              note="The gold standard. 167 hours, every achievement, every secret."
              favorite
            />
            <GameCard
              name="Hollow Knight: Silksong"
              hours="47 hrs"
              achievements={38}
              total={52}
              note="Hornet's adventure — 73% and climbing toward that perfect run."
              favorite
            />
            <GameCard
              name="Blasphemous"
              achievements={42}
              total={45}
              note="93% — dark, punishing, and beautiful. Speedrun in under 3 hours completed."
            />
            <GameCard
              name="Rain World"
              achievements={27}
              total={47}
              note="More ecosystem survival than classic metroidvania, but the exploration is unmatched."
              favorite
            />
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
                note="Perfect. Every puzzle box opened, every mechanism understood."
              />
              <GameCard
                name="The Room Two"
                achievements={7}
                total={7}
                note="Perfect. The mysteries deepened and every one was unraveled."
              />
              <GameCard
                name="The Room Three"
                achievements={6}
                total={10}
                note="All chapters completed. Multiple endings discovered — the imprisoned path was just the beginning."
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
                <div className="flex flex-wrap gap-2 mt-2">
                  {[
                    'Seasons', 'The Lake', 'Arles', 'Harvey\'s Box', 'Case 23',
                    'The Mill', 'Birthday', 'Theatre', 'The Cave', 'Paradox',
                  ].map(title => (
                    <span
                      key={title}
                      className="pixel-title text-[0.5rem] px-2 py-1 rounded"
                      style={{ color: 'var(--t-tertiary)', border: '1px solid var(--t-frame-line)', background: 'var(--t-bg)' }}
                    >
                      {title}
                    </span>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2">
                  {[
                    'Rusty Lake Hotel', 'Rusty Lake: Roots', 'Rusty Lake Paradise',
                    'The White Door', 'The Past Within',
                  ].map(title => (
                    <span
                      key={title}
                      className="pixel-title text-[0.5rem] px-2 py-1 rounded"
                      style={{ color: 'var(--t-secondary)', border: '1px solid var(--t-frame-line)', background: 'var(--t-bg)' }}
                    >
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
              { label: 'PERFECT GAMES', value: '3', color: 'var(--t-secondary)' },
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
