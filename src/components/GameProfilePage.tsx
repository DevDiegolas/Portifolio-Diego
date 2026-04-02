import { useState, useRef, useCallback } from 'react';
import { useTheme } from '../ThemeContext';
import knightMask from '../assets/knight-mask.png';

// ── Knight mask icon (button, isolated from text) ────────────────────────
function KnightIcon({ style, onClick }: { style?: React.CSSProperties; onClick?: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="knight-btn"
      style={{ userSelect: 'none', ...style }}
    >
      <img
        src={knightMask}
        alt=""
        draggable={false}
        style={{ width: '1.6em', height: 'auto', display: 'block' }}
      />
    </button>
  );
}

// ── Steel Soul activation flash + Knight button ──────────────────────────
const steelSoulStyles = `
.knight-btn {
  all: unset;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
  border-radius: 6px;
  cursor: url('/podendoclicar-big.png') 2 2, pointer;
  transition: transform 0.15s ease, filter 0.15s ease;
  -webkit-user-select: none;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
}
.knight-btn:hover {
  transform: scale(1.18);
  filter: brightness(1.25);
}
.knight-btn:active {
  transform: scale(0.82);
  filter: brightness(0.9);
}

@keyframes steel-flash {
  0%   { opacity: 0; }
  15%  { opacity: 1; }
  100% { opacity: 0; }
}
@keyframes steel-pulse {
  0%, 100% { text-shadow: 0 0 8px #a0aec044; }
  50%      { text-shadow: 0 0 20px #a0aec088, 0 0 40px #a0aec044; }
}
.steel-soul-flash {
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: radial-gradient(ellipse at center, #c0c8d8 0%, #08090c 70%);
  animation: steel-flash 1.2s ease-out forwards;
  pointer-events: none;
}
.shiny-steel {
  background: linear-gradient(
    90deg,
    #7888a0 0%, #b0b8c8 20%, #e0e4ec 40%,
    #b0b8c8 60%, #7888a0 80%, #b0b8c8 100%
  );
  background-size: 200% auto;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: shiny-slide 3s ease-in-out infinite;
}
@keyframes steel-glow {
  0%, 100% { box-shadow: 0 0 15px #a0aec033, 0 0 30px #a0aec015, inset 0 0 15px #a0aec008; }
  50%      { box-shadow: 0 0 22px #a0aec055, 0 0 44px #a0aec025, inset 0 0 22px #a0aec012; }
}
.steel-card {
  border: 2px solid #a0aec0;
  animation: steel-glow 3s ease-in-out infinite;
  background: linear-gradient(
    135deg,
    var(--t-bg-card) 0%,
    color-mix(in srgb, #a0aec0 6%, var(--t-bg-card)) 50%,
    var(--t-bg-card) 100%
  );
}
`;

// ── Shiny gold styles (injected once) ─────────────────────────────────────
const goldStyles = `
@keyframes shiny-slide {
  0%   { background-position: -200% center; }
  100% { background-position:  200% center; }
}
.shiny-gold {
  background: linear-gradient(
    90deg,
    #c9a227 0%, #ffd700 20%, #fff8b0 40%,
    #ffd700 60%, #c9a227 80%, #ffd700 100%
  );
  background-size: 200% auto;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: shiny-slide 3s ease-in-out infinite;
}
@keyframes gold-glow {
  0%, 100% { box-shadow: 0 0 15px #ffd70033, 0 0 30px #ffd70015, inset 0 0 15px #ffd70008; }
  50%      { box-shadow: 0 0 22px #ffd70055, 0 0 44px #ffd70025, inset 0 0 22px #ffd70012; }
}
.gold-card {
  border: 2px solid #ffd700;
  animation: gold-glow 3s ease-in-out infinite;
  background: linear-gradient(
    135deg,
    var(--t-bg-card) 0%,
    color-mix(in srgb, #ffd700 6%, var(--t-bg-card)) 50%,
    var(--t-bg-card) 100%
  );
}
`;

// ── Corner decoration ─────────────────────────────────────────────────────
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

// ── Section header ────────────────────────────────────────────────────────
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

// ── Game chip (small tag) ─────────────────────────────────────────────────
function GameChip({ name, perfect = false }: { name: string; perfect?: boolean }) {
  return (
    <span
      className="pixel-title text-[0.5rem] px-2 py-1 rounded inline-block"
      style={{
        color: perfect ? 'var(--t-secondary)' : 'var(--t-frame-light)',
        border: '1px solid var(--t-frame-line)',
        background: 'var(--t-bg)',
      }}
    >
      {perfect && '★ '}{name}
    </span>
  );
}

// ── Data ──────────────────────────────────────────────────────────────────
const honoredMentionGames = [
  'Hollow Knight: Silksong',
  'Rain World',
  'Outer Wilds',
  'Blue Prince',
  'Just Shapes & Beats',
];

const cubeEscapeGames = [
  { name: 'Rusty Lake Hotel', perfect: true },
  { name: 'Rusty Lake: Roots', perfect: true },
  { name: 'The White Door', perfect: true },
  { name: 'Samsara Room', perfect: true },
  { name: 'Underground Blossom', perfect: true },
  { name: 'The Mr. Rabbit Magic Show', perfect: true },
  { name: 'Cube Escape Collection', perfect: false },
  { name: 'Paradox', perfect: false },
  { name: 'Rusty Lake Paradise', perfect: false },
  { name: 'The Past Within', perfect: false },
];

const roomGames = [
  { name: 'The Room', perfect: true },
  { name: 'The Room Two', perfect: true },
  { name: 'The Room Three', perfect: false },
  { name: 'The Room Four: Old Sins', perfect: true },
];

// ── Page ──────────────────────────────────────────────────────────────────
const STEEL_SOUL_CLICKS = 5;

export default function GameProfilePage() {
  const { theme, setTheme } = useTheme();
  const [clickCount, setClickCount] = useState(0);
  const [showFlash, setShowFlash] = useState(false);
  const resetTimer = useRef<ReturnType<typeof setTimeout>>(null);
  const isSteelSoul = theme.name === 'steelsoul';

  const handleKnightClick = useCallback(() => {
    if (isSteelSoul) return;

    const next = clickCount + 1;
    setClickCount(next);

    // reset counter after 2s of no clicks
    if (resetTimer.current) clearTimeout(resetTimer.current);
    resetTimer.current = setTimeout(() => setClickCount(0), 2000);

    if (next >= STEEL_SOUL_CLICKS) {
      setClickCount(0);
      setShowFlash(true);
      setTimeout(() => setTheme('steelsoul'), 300);
      setTimeout(() => setShowFlash(false), 1400);
    }
  }, [clickCount, isSteelSoul, setTheme]);

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8 w-full">
      <style>{goldStyles}</style>
      <style>{steelSoulStyles}</style>
      {showFlash && <div className="steel-soul-flash" />}

      <div
        className="relative rounded-2xl p-4 sm:p-6 md:p-8 space-y-6 sm:space-y-8"
        style={{
          background: 'var(--t-frame-bg)',
          border: '2px solid var(--t-frame)',
          boxShadow:
            '0 0 0 4px var(--t-frame-outer), 0 0 0 6px color-mix(in srgb, var(--t-frame) 27%, transparent)',
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
            style={{
              color: 'var(--t-frame-light)',
              textShadow: '0 0 16px color-mix(in srgb, var(--t-frame) 53%, transparent)',
            }}
          >
            ◈ GAME PROFILE ◈
          </p>
          <p className="pixel-body text-xl mt-2" style={{ color: 'var(--t-text)' }}>
            <span className={isSteelSoul ? 'shiny-steel' : 'shiny-gold'} style={{ fontWeight: 700 }}>Deus Gamer</span>
            &nbsp;·&nbsp; Steam Level 20 &nbsp;·&nbsp; 198 Games
          </p>
          <p className="pixel-body text-base mt-0.5" style={{ color: 'var(--t-text-dim)' }}>
            São Paulo, Brazil &nbsp;|&nbsp; Member since 2018
          </p>
        </div>

        {/* ── FAVORITE GAME ── */}
        <div>
          <SheetHeader>FAVORITE GAME</SheetHeader>
          <div className={`${isSteelSoul ? 'steel-card' : 'gold-card'} rounded-lg p-5 sm:p-6`}>
            <div className="flex items-center gap-3">
              <KnightIcon
                style={{ fontSize: '1.4rem' }}
                onClick={handleKnightClick}
              />
              <span className={`${isSteelSoul ? 'shiny-steel' : 'shiny-gold'} pixel-title text-base sm:text-lg`}>
                Hollow Knight
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-2 mt-3">
              <span
                className="pixel-title text-[0.55rem] px-2.5 py-0.5 rounded"
                style={{ color: isSteelSoul ? '#0c0d12' : '#1a1a2e', background: isSteelSoul ? '#a0aec0' : '#ffd700' }}
              >
                ★ 63/63 ACHIEVEMENTS
              </span>
              <span
                className="pixel-title text-[0.55rem] px-2.5 py-0.5 rounded"
                style={{ color: isSteelSoul ? '#0c0d12' : '#1a1a2e', background: isSteelSoul ? '#a0aec0' : '#ffd700' }}
              >
                {isSteelSoul ? 'STEEL SOUL' : 'PERFECT GAME'}
              </span>
            </div>
          </div>
        </div>

        {/* ── HONORED MENTION ── */}
        <div>
          <SheetHeader>HONORED MENTION</SheetHeader>
          <div
            className="rounded-lg p-5 space-y-3"
            style={{
              background: 'var(--t-bg-card)',
              border: '1px solid var(--t-primary)',
              boxShadow: '0 0 12px color-mix(in srgb, var(--t-primary) 20%, transparent)',
            }}
          >
            <p className="pixel-body text-xl leading-relaxed" style={{ color: 'var(--t-text)' }}>
              Games that left a mark. Each one earned its place through unforgettable
              worlds, brilliant design, or moments that stayed long after the credits rolled.
            </p>
            <div className="flex flex-wrap gap-2">
              {honoredMentionGames.map(name => (
                <GameChip key={name} name={name} />
              ))}
            </div>
          </div>
        </div>

        {/* ── PUZZLE MASTER ── */}
        <div>
          <SheetHeader>PUZZLE MASTER — ESCAPE ROOMS & MYSTERIES</SheetHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Cube Escape */}
            <div className="space-y-3">
              <p className="pixel-title text-xs pl-1" style={{ color: 'var(--t-tertiary)' }}>
                CUBE ESCAPE / RUSTY LAKE — ALL CLEARED
              </p>
              <div
                className="rounded-lg p-5 space-y-3"
                style={{ background: 'var(--t-bg-card)', border: '1px solid var(--t-frame-line)' }}
              >
                <p className="pixel-body text-xl leading-relaxed" style={{ color: 'var(--t-text)' }}>
                  The entire Rusty Lake / Cube Escape saga — completed. From Cube Escape: Seasons to
                  Paradox, every surreal room was escaped, every timeline pieced together. Some with
                  full achievement completion. The lake remembers.
                </p>
                <div className="flex flex-wrap gap-2">
                  {cubeEscapeGames.map(g => (
                    <GameChip key={g.name} name={g.name} perfect={g.perfect} />
                  ))}
                </div>
              </div>
            </div>

            {/* The Room */}
            <div className="space-y-3">
              <p className="pixel-title text-xs pl-1" style={{ color: 'var(--t-tertiary)' }}>
                THE ROOM SERIES — ALL CLEARED
              </p>
              <div
                className="rounded-lg p-5 space-y-3"
                style={{ background: 'var(--t-bg-card)', border: '1px solid var(--t-frame-line)' }}
              >
                <p className="pixel-body text-xl leading-relaxed" style={{ color: 'var(--t-text)' }}>
                  Every box opened, every mechanism solved. From the first mysterious safe to the
                  haunted dollhouse of Old Sins, each room was a masterclass in tactile puzzle design.
                  The craftsmanship never gets old.
                </p>
                <div className="flex flex-wrap gap-2">
                  {roomGames.map(g => (
                    <GameChip key={g.name} name={g.name} perfect={g.perfect} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>


        {/* ── PLAYER STATS ── */}
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
