import GameCard from './GameCard';
import PotatoCard from './PotatoCard';
import Footer from './Footer';

export default function Home() {
  return (
    <div className="flex flex-col w-full mt-10 space-y-24">

      {/* 1. HERO SECTION */}
      <section className="text-center space-y-6 max-w-6xl mx-auto px-6 w-full" id="home">
        <h1 className="pixel-title text-2xl md:text-4xl font-extrabold text-white tracking-tight">
          Hi, I'm <span className="pixel-cyan">Diego</span>
        </h1>
        <p className="pixel-body text-xl md:text-2xl text-slate-200 font-medium max-w-2xl mx-auto">
          Fullstack Software Engineer & Game Developer
        </p>
      </section>

      {/* 2. TECH STACK */}
      <section className="max-w-6xl mx-auto px-6 w-full">
        <h2 className="pixel-title text-xl md:text-2xl font-bold text-white mb-8 border-b border-gray-800 pb-4">
          My Tech Arsenal
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Most Used */}
          <div className="bg-gray-900 p-6 rounded-xl border border-gray-800 hover:border-green-500/50 transition">
            <h3 className="pixel-title text-sm md:text-base font-semibold pixel-green mb-4">Most Used</h3>
            <div className="grid grid-cols-4 gap-4 items-center justify-items-center">
              <img
                src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg"
                alt="React"
                title="React"
                className="w-9 h-9"
              />
              <img
                src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg"
                alt="Node.js"
                title="Node.js"
                className="w-9 h-9"
              />
              <img
                src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg"
                alt="TypeScript"
                title="TypeScript"
                className="w-9 h-9"
              />
              <img
                src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg"
                alt="Go"
                title="Go"
                className="w-9 h-9"
              />
            </div>
          </div>

          {/* Familiar With */}
          <div className="bg-gray-900 p-6 rounded-xl border border-gray-800 hover:border-blue-500/50 transition">
            <h3 className="pixel-title text-sm md:text-base font-semibold pixel-cyan mb-4">Familiar With</h3>
            <div className="grid grid-cols-4 gap-4 items-center justify-items-center">
              <img
                src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/godot/godot-original.svg"
                alt="Godot"
                title="Godot"
                className="w-9 h-9"
              />
              <img
                src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/unity/unity-original.svg"
                alt="Unity"
                title="Unity"
                className="w-9 h-9"
              />
              <img
                src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg"
                alt="PostgreSQL"
                title="PostgreSQL"
                className="w-9 h-9"
              />
              <img
                src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg"
                alt="AWS"
                title="AWS"
                className="w-9 h-9"
              />
            </div>
          </div>

          {/* Currently Learning */}
          <div className="bg-gray-900 p-6 rounded-xl border border-gray-800 hover:border-purple-500/50 transition">
            <h3 className="pixel-title text-sm md:text-base font-semibold pixel-pink mb-4">Currently Learning</h3>
            <p className="pixel-body text-lg text-slate-200">New architectures, Shaders...</p>
          </div>
        </div>
      </section>

      {/* 3. GAME STUDIES — full viewport width */}
      <section className="w-full" id="games">
        <h2 className="pixel-title text-xl md:text-2xl font-bold text-white mb-8 border-b border-gray-800 pb-4 max-w-6xl mx-auto px-6">
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
