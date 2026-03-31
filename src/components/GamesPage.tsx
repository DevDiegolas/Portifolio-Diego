import Footer from './Footer';

export default function GamesPage() {
  return (
    <div className="flex flex-col w-full mt-10 space-y-16">
      <section className="max-w-6xl mx-auto px-6 w-full">
        <h2 className="pixel-title text-xl md:text-2xl font-bold text-white mb-6 border-b border-gray-800 pb-4">
          Games
        </h2>

        <p className="pixel-body text-lg text-slate-200 mb-6">
          This is your playable games area. The structure is ready for launching each title directly on the site.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <article className="bg-gray-900/80 border border-gray-800 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between gap-4">
              <h3 className="pixel-title text-sm md:text-base text-white">Potato Clicker</h3>
              <span className="pixel-body text-base text-amber-300">Coming Soon</span>
            </div>
            <p className="pixel-body text-lg text-slate-200 leading-relaxed">
              Clicker-style progression game with upgrades, balancing loops, and long-term retention systems.
            </p>
            <button
              type="button"
              disabled
              className="w-full md:w-auto px-4 py-2 rounded-md bg-gray-700 text-gray-300 font-semibold cursor-not-allowed"
            >
              Play Soon
            </button>
          </article>

          <article className="bg-gray-900/80 border border-gray-800 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between gap-4">
              <h3 className="pixel-title text-sm md:text-base text-white">Solo Blocking</h3>
              <span className="pixel-body text-base text-amber-300">Coming Soon</span>
            </div>
            <p className="pixel-body text-lg text-slate-200 leading-relaxed">
              Action-oriented prototype focused on mechanics, controls, and responsive combat interactions.
            </p>
            <button
              type="button"
              disabled
              className="w-full md:w-auto px-4 py-2 rounded-md bg-gray-700 text-gray-300 font-semibold cursor-not-allowed"
            >
              Play Soon
            </button>
          </article>
        </div>
      </section>

      <Footer />
    </div>
  );
}
