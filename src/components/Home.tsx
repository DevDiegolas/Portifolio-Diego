import GameCard from './GameCard';
import PotatoCard from './PotatoCard';
import Footer from './Footer';

export default function Home() {
  return (
    <div className="flex flex-col w-full mt-10 space-y-24">

      {/* 1. HERO SECTION */}
      <section className="text-center space-y-6 max-w-6xl mx-auto px-6 w-full" id="home">
        <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight">
          Hi, I'm <span className="text-blue-400">Diego</span>
        </h1>
        <p className="text-xl md:text-2xl text-gray-400 font-medium max-w-2xl mx-auto">
          Fullstack Software Engineer & Game Developer
        </p>
      </section>

      {/* 2. TECH STACK */}
      <section className="max-w-6xl mx-auto px-6 w-full">
        <h2 className="text-3xl font-bold text-white mb-8 border-b border-gray-800 pb-4">
          My Tech Arsenal
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Most Used */}
          <div className="bg-gray-900 p-6 rounded-xl border border-gray-800 hover:border-green-500/50 transition">
            <h3 className="text-xl font-semibold text-green-400 mb-4">Most Used</h3>
            <p className="text-gray-400 text-sm">React, Node.js, TypeScript, Go...</p>
          </div>

          {/* Familiar With */}
          <div className="bg-gray-900 p-6 rounded-xl border border-gray-800 hover:border-blue-500/50 transition">
            <h3 className="text-xl font-semibold text-blue-400 mb-4">Familiar With</h3>
            <p className="text-gray-400 text-sm">Godot, Unity, PostgreSQL, AWS...</p>
          </div>

          {/* Currently Learning */}
          <div className="bg-gray-900 p-6 rounded-xl border border-gray-800 hover:border-purple-500/50 transition">
            <h3 className="text-xl font-semibold text-purple-400 mb-4">Currently Learning</h3>
            <p className="text-gray-400 text-sm">New architectures, Shaders...</p>
          </div>
        </div>
      </section>

      {/* 3. GAME STUDIES — full viewport width */}
      <section className="w-full">
        <h2 className="text-3xl font-bold text-white mb-8 border-b border-gray-800 pb-4 max-w-6xl mx-auto px-6">
          Game Architecture & Logic
        </h2>

        <div className="flex flex-col w-full">
          <PotatoCard />
          <GameCard
            title="Solo Blocking"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
            bgImageName="bg-solo.png"
            iconImageName="icon-solo.png"
            accentColor="#7c3aed"
            overlayFrom="from-black/95"
            overlayVia="via-purple-950/80"
          />
        </div>
      </section>

      <Footer />
    </div>
  );
}