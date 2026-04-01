import { useEffect, useRef, useState } from 'react';
import TerminalShell from './TerminalShell';
import { useTheme } from '../ThemeContext';
import bgPotato from '../assets/bg-potato.png';
import bgSolo from '../assets/bg-solo.png';
import iconPotato from '../assets/icon-potato.png';
import iconSolo from '../assets/icon-solo.png';

export default function GamesPage() {
  const { theme } = useTheme();
  const [selected, setSelected] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const rouletteRef = useRef<HTMLDivElement>(null);

  const games = [
    {
      id: 'potato-clicker',
      title: 'Potato Clicker',
      status: 'Coming Soon',
      genre: 'Idle / Clicker',
      description:
        'Idle progression with upgrades, economy loops, and long-session retention mechanics.',
      bg: bgPotato,
      icon: iconPotato,
      accentFrom: theme.colors.secondary,
      accentTo: theme.colors.tertiary,
    },
    {
      id: 'solo-blocking',
      title: 'Solo Blocking',
      status: 'Coming Soon',
      genre: 'Action / Combat',
      description:
        'Fast combat prototype focused on responsiveness, movement, and impact feedback.',
      bg: bgSolo,
      icon: iconSolo,
      accentFrom: theme.colors.quaternary,
      accentTo: theme.colors.fifth,
    },
  ];

  const activeGame = games[selected];

  const selectGame = (index: number) => {
    if (index === selected) return;
    setTransitioning(true);
    setTimeout(() => {
      setSelected(index);
      setTransitioning(false);
    }, 220);
  };

  const nextGame = () => selectGame((selected + 1) % games.length);
  const prevGame = () => selectGame((selected - 1 + games.length) % games.length);

  useEffect(() => {
    const el = rouletteRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (e.deltaY > 0) nextGame();
      else prevGame();
    };
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, [selected]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      // Don't hijack arrows when the user is typing in the shell input
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key === 'ArrowDown') nextGame();
      if (e.key === 'ArrowUp') prevGame();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [selected]);

  return (
    <TerminalShell currentPath="/games">
      <section className="max-w-6xl mx-auto px-3 sm:px-6 py-4 sm:py-6 w-full">

        {/* Main container */}
        <div
          className="relative overflow-hidden rounded-xl border min-h-[calc(100vh-9.5rem)] sm:min-h-[70vh]"
          style={{ borderColor: 'color-mix(in srgb, var(--t-primary) 16%, transparent)', isolation: 'isolate' }}
        >
          {/* ── Blurred background image ── */}
          {games.map((game, i) => (
            <div
              key={game.id}
              className="absolute inset-0 transition-opacity duration-700"
              style={{ opacity: i === selected ? 1 : 0, zIndex: 0 }}
            >
              <img
                src={game.bg}
                alt=""
                className="absolute inset-0 w-full h-full object-cover"
                style={{ filter: 'blur(18px) saturate(1.3)', transform: 'scale(1.08)' }}
              />
              {/* Dark overlay */}
              <div className="absolute inset-0 bg-black/62" />
              {/* Accent gradient from game color */}
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  background: `radial-gradient(ellipse 80% 60% at 30% 50%, ${game.accentFrom}55, transparent)`,
                }}
              />
            </div>
          ))}

          {/* ── Scanlines overlay ── */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.06]"
            style={{
              backgroundImage: 'repeating-linear-gradient(0deg, color-mix(in srgb, var(--t-text) 35%, transparent) 0px, color-mix(in srgb, var(--t-text) 35%, transparent) 1px, transparent 1px, transparent 4px)',
              zIndex: 1,
            }}
          />

          {/* ── Content grid ── */}
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[1fr_280px] min-h-[calc(100vh-9.5rem)] sm:min-h-[72vh]">

            {/* LEFT — Game info */}
            <div className="p-4 sm:p-6 md:p-10 lg:p-12 flex flex-col justify-between">
              {/* Top: genre + title + description */}
              <div>
                <p
                  className="pixel-title text-xs mb-3 tracking-widest uppercase"
                  style={{
                    color: activeGame.accentFrom,
                    transition: 'color 0.4s',
                    textShadow: `0 0 12px ${activeGame.accentFrom}88`,
                  }}
                >
                  {activeGame.genre}
                </p>

                <div
                  className="transition-all duration-300"
                  style={{ opacity: transitioning ? 0 : 1, transform: transitioning ? 'translateY(6px)' : 'translateY(0)' }}
                >
                  <h3 className="pixel-title text-2xl sm:text-3xl md:text-5xl leading-tight" style={{ color: 'var(--t-text)' }}>
                    {activeGame.title}
                  </h3>

                  <p className="pixel-body text-lg sm:text-xl md:text-2xl mt-4 sm:mt-5 max-w-lg leading-relaxed" style={{ color: 'var(--t-text-muted)' }}>
                    {activeGame.description}
                  </p>
                </div>
              </div>

              {/* Bottom: status badge + play button */}
              <div className="mt-7 sm:mt-10 flex items-center gap-3 sm:gap-4 flex-wrap">
                <span
                  className="pixel-title text-xs px-3 py-1.5 rounded border"
                  style={{
                    borderColor: `${activeGame.accentFrom}55`,
                    color: activeGame.accentFrom,
                    background: `${activeGame.accentFrom}15`,
                  }}
                >
                  {activeGame.status}
                </span>

                <button
                  type="button"
                  disabled
                  className="pixel-title text-xs px-4 sm:px-6 py-2.5 sm:py-3 rounded-md border cursor-not-allowed opacity-50"
                  style={{ borderColor: `${activeGame.accentFrom}44`, background: `${activeGame.accentFrom}22`, color: 'var(--t-text)' }}
                >
                  ▶ Play Game
                </button>
              </div>
            </div>

            {/* RIGHT — Roulette wheel */}
            <div
              ref={rouletteRef}
              className="border-t lg:border-t-0 lg:border-l backdrop-blur-sm flex flex-col"
              style={{ overscrollBehavior: 'contain', borderColor: 'color-mix(in srgb, var(--t-text) 12%, transparent)', background: 'color-mix(in srgb, var(--t-bg-darker) 70%, transparent)' }}
            >
              {/* Header */}
              <div className="px-4 py-4 border-b flex items-center justify-between" style={{ borderColor: 'color-mix(in srgb, var(--t-text) 12%, transparent)' }}>
                <p className="pixel-title text-xs tracking-widest uppercase" style={{ color: 'var(--t-text-muted)' }}>Select</p>
                <p className="pixel-body text-base" style={{ color: 'var(--t-text-dim)' }}>{selected + 1} / {games.length}</p>
              </div>

              {/* Arrow up */}
              <button
                type="button"
                onClick={prevGame}
                className="w-full py-2 transition-colors text-xs pixel-title"
                style={{ color: 'var(--t-text-dim)' }}
              >
                ▲
              </button>

              {/* Game cards */}
              <div className="flex-1 flex flex-col justify-center gap-2 px-3 py-2 overflow-hidden min-h-60 sm:min-h-64">
                {games.map((game, index) => {
                  const offset = index - selected;
                  const isActive = offset === 0;
                  const isAdjacent = Math.abs(offset) === 1;

                  return (
                    <button
                      key={game.id}
                      type="button"
                      onClick={() => selectGame(index)}
                      className="text-left rounded-xl border transition-all duration-300 px-3 py-3 flex items-center gap-3"
                      style={{
                        borderColor: isActive ? `${game.accentFrom}88` : 'color-mix(in srgb, var(--t-text) 10%, transparent)',
                        background: isActive ? `${game.accentFrom}18` : 'color-mix(in srgb, var(--t-bg-darker) 78%, transparent)',
                        opacity: isActive ? 1 : isAdjacent ? 0.55 : 0.3,
                        transform: isActive ? 'scale(1)' : 'scale(0.95)',
                        boxShadow: isActive ? `0 0 20px ${game.accentFrom}33` : 'none',
                      }}
                    >
                      {/* Icon */}
                      <div
                        className="w-10 h-10 rounded-lg overflow-hidden shrink-0 border"
                        style={{ borderColor: isActive ? `${game.accentFrom}55` : 'color-mix(in srgb, var(--t-text) 12%, transparent)' }}
                      >
                        <img src={game.icon} alt={game.title} className="w-full h-full object-cover" />
                      </div>

                      {/* Text */}
                      <div className="min-w-0">
                        <p className="pixel-title text-xs truncate" style={{ color: 'var(--t-text)' }}>{game.title}</p>
                        <p
                          className="pixel-body text-sm mt-0.5 truncate"
                          style={{ color: isActive ? game.accentFrom : theme.colors.textMuted }}
                        >
                          {game.genre}
                        </p>
                      </div>

                      {/* Active indicator */}
                      {isActive && (
                        <div
                          className="ml-auto w-1.5 h-1.5 rounded-full shrink-0"
                          style={{ background: game.accentFrom, boxShadow: `0 0 8px ${game.accentFrom}` }}
                        />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Arrow down */}
              <button
                type="button"
                onClick={nextGame}
                className="w-full py-2 transition-colors text-xs pixel-title"
                style={{ color: 'var(--t-text-dim)' }}
              >
                ▼
              </button>

              {/* Scroll hint */}
              <div className="px-4 py-3 border-t text-center" style={{ borderColor: 'color-mix(in srgb, var(--t-text) 12%, transparent)' }}>
                <p className="pixel-body text-sm" style={{ color: 'var(--t-text-dim)' }}>scroll or ↑↓</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </TerminalShell>
  );
}
