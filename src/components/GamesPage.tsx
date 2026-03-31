import { useEffect, useMemo, useRef, useState } from 'react';
import Footer from './Footer';

const games = [
  {
    id: 'potato-clicker',
    title: 'Potato Clicker',
    status: 'Coming Soon',
    description: 'Idle progression with upgrades, economy loops, and long-session retention.',
    accent: 'from-lime-400/35 via-yellow-300/15 to-transparent',
  },
  {
    id: 'solo-blocking',
    title: 'Solo Blocking',
    status: 'Coming Soon',
    description: 'Fast combat prototype focused on responsiveness, movement, and impact feedback.',
    accent: 'from-fuchsia-400/30 via-violet-300/15 to-transparent',
  },
];

export default function GamesPage() {
  const [selected, setSelected] = useState(0);
  const rouletteRef = useRef<HTMLElement | null>(null);

  const activeGame = games[selected];
  const wheelItems = useMemo(() => {
    const total = games.length;

    return games.map((game, index) => {
      let offset = index - selected;

      if (offset > total / 2) offset -= total;
      if (offset < -total / 2) offset += total;

      return { ...game, offset };
    });
  }, [selected]);

  const nextGame = () => setSelected((prev) => (prev + 1) % games.length);
  const prevGame = () => setSelected((prev) => (prev - 1 + games.length) % games.length);

  useEffect(() => {
    const el = rouletteRef.current;
    if (!el) return;

    const onWheel = (event: WheelEvent) => {
      event.preventDefault();
      event.stopPropagation();
      if (event.deltaY > 0) nextGame();
      if (event.deltaY < 0) prevGame();
    };

    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, []);

  return (
    <div className="flex flex-col w-full mt-10 space-y-16">
      <section className="max-w-6xl mx-auto px-6 w-full">
        <h2 className="pixel-title text-xl md:text-2xl font-bold text-white mb-6 border-b border-gray-800 pb-4">
          Games
        </h2>

        <div className="relative overflow-hidden rounded-3xl border border-gray-800 bg-gray-900/70 min-h-[72vh]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_20%,rgba(255,255,255,0.09),transparent_30%)]" />
          <div className={`absolute inset-0 bg-gradient-to-r ${activeGame.accent} transition-all duration-700`} />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[420px_1fr] min-h-[72vh]">
            <aside
              ref={rouletteRef}
              className="border-r border-gray-800/80 bg-gray-950/70 p-5 md:p-7 flex flex-col"
              style={{ overscrollBehavior: 'contain' }}
            >
              <div className="flex items-center justify-between mb-4">
                <p className="pixel-title text-xs text-slate-200">Game Roulette</p>
                <span className="pixel-body text-base text-slate-400">{selected + 1}/{games.length}</span>
              </div>

              <p className="pixel-body text-base text-slate-400 mb-4">Scroll to rotate</p>

              <div className="relative flex-1 overflow-hidden rounded-xl border border-gray-800 bg-black/25 p-3">
                <div className="relative h-full min-h-[380px]">
                  {wheelItems.map((game) => {
                    const absOffset = Math.abs(game.offset);
                    const isActive = game.offset === 0;

                    return (
                      <button
                        key={game.id}
                        type="button"
                        onClick={() => setSelected(games.findIndex((item) => item.id === game.id))}
                        style={{
                          transform: `translateY(calc(-50% + ${game.offset * 112}px)) scale(${isActive ? 1 : 0.92})`,
                          opacity: isActive ? 1 : 0.62,
                          zIndex: isActive ? 10 : 5 - absOffset,
                        }}
                        className={`text-left rounded-lg border transition-all duration-300 px-4 py-4 ${
                          isActive
                            ? 'border-cyan-200/60 bg-cyan-300/15'
                            : 'border-gray-700 bg-gray-900/55 hover:opacity-90'
                        } ${absOffset > 1 ? 'blur-[1px]' : ''} absolute left-0 right-0 top-1/2`}
                      >
                        <p className="pixel-title text-xs text-white">{game.title}</p>
                        <p className="pixel-body text-lg text-slate-300 mt-1">{game.status}</p>
                      </button>
                    );
                  })}
                </div>
              </div>
            </aside>

            <div className="p-6 md:p-10 flex flex-col justify-end">
              <div className="mb-auto">
                <p className="pixel-title text-xs text-slate-300/80">Selected Game</p>
                <h3 className="pixel-title text-lg md:text-2xl text-white mt-3">{activeGame.title}</h3>
                <p className="pixel-body text-xl md:text-2xl text-slate-200 mt-3 max-w-2xl leading-relaxed">
                  {activeGame.description}
                </p>
              </div>

              <div className="rounded-2xl border border-gray-700 bg-black/40 min-h-[320px] md:min-h-[380px] flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(transparent_96%,rgba(255,255,255,0.08)_96%)] bg-[length:100%_7px] opacity-30" />
                <p className="pixel-title text-sm md:text-base text-slate-100 z-10 text-center px-4">
                  Trailer do jogo
                </p>
              </div>

              <div className="mt-5">
                <button
                  type="button"
                  disabled
                  className="pixel-title text-xs px-5 py-3 rounded-md bg-emerald-600/80 text-white border border-emerald-300/30 cursor-not-allowed"
                >
                  Play Game
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
