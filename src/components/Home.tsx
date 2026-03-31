import { useEffect, useState } from 'react';
import GameCard from './GameCard';
import PotatoCard from './PotatoCard';
import Footer from './Footer';

// ── Icon URLs ──────────────────────────────────────────────────────────────
const CDN = 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons';

const MOST_USED = [
  { name: 'react',      icon: `${CDN}/react/react-original.svg` },
  { name: 'node.js',    icon: `${CDN}/nodejs/nodejs-original.svg` },
  { name: 'typescript', icon: `${CDN}/typescript/typescript-original.svg` },
  { name: 'go',         icon: `${CDN}/go/go-original.svg` },
];
const FAMILIAR = [
  { name: 'godot',      icon: `${CDN}/godot/godot-original.svg` },
  { name: 'unity',      icon: `${CDN}/unity/unity-original.svg` },
  { name: 'postgresql', icon: `${CDN}/postgresql/postgresql-original.svg` },
  { name: 'aws',        icon: `${CDN}/amazonwebservices/amazonwebservices-original-wordmark.svg` },
];

// ── Tree renderer ──────────────────────────────────────────────────────────
function TechTree({ label, items }: { label: string; items: typeof MOST_USED }) {
  return (
    <div>
      <p className="pixel-title text-xs" style={{ color: '#9be564' }}>{label}</p>
      {items.map((item, i) => (
        <div key={item.name} className="flex items-center gap-2 mt-1.5">
          <span className="pixel-body text-lg text-slate-600 select-none">
            {i === items.length - 1 ? '└──' : '├──'}
          </span>
          <img src={item.icon} alt={item.name} className="w-4 h-4 flex-shrink-0" />
          <span className="pixel-body text-xl text-slate-300">{item.name}</span>
        </div>
      ))}
    </div>
  );
}

function LearningTree() {
  return (
    <div>
      <p className="pixel-title text-xs" style={{ color: '#9be564' }}>currently-learning</p>
      <div className="flex items-center gap-2 mt-1.5">
        <span className="pixel-body text-lg text-slate-600 select-none">└──</span>
        <span className="pixel-body text-xl text-slate-300">shaders, new architectures...</span>
      </div>
    </div>
  );
}

// ── Sequence definition ────────────────────────────────────────────────────
type SeqItem =
  | { type: 'cmd';   text: string }
  | { type: 'out';   node: React.ReactNode }
  | { type: 'blank' }
  | { type: 'pause'; ms: number }

const SEQUENCE: SeqItem[] = [
  { type: 'cmd',   text: 'whoami' },
  { type: 'out',   node: <span>Hi, I&apos;m <span style={{ color: '#8ecae6' }}>Diego.</span></span> },
  { type: 'blank' },
  { type: 'pause', ms: 280 },
  { type: 'cmd',   text: 'cat role.txt' },
  { type: 'out',   node: 'Fullstack Software Engineer & Game Developer' },
  { type: 'blank' },
  { type: 'pause', ms: 280 },
  { type: 'cmd',   text: 'npm list --skills' },
  { type: 'blank' },
  { type: 'out',   node: <TechTree label="most-used"      items={MOST_USED} /> },
  { type: 'blank' },
  { type: 'out',   node: <TechTree label="familiar-with"  items={FAMILIAR}  /> },
  { type: 'blank' },
  { type: 'out',   node: <LearningTree /> },
];

// ── Terminal hero ──────────────────────────────────────────────────────────
function TerminalHero() {
  const [lines,      setLines]      = useState<React.ReactNode[]>([]);
  const [currentCmd, setCurrentCmd] = useState('');
  const [typing,     setTyping]     = useState(true);
  const [blink,      setBlink]      = useState(true);

  useEffect(() => {
    const id = setInterval(() => setBlink(b => !b), 530);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    let cancelled = false;
    const delay = (ms: number) => new Promise<void>(r => setTimeout(r, ms));

    async function run() {
      for (let i = 0; i < SEQUENCE.length; i++) {
        if (cancelled) return;
        const item = SEQUENCE[i];

        if (item.type === 'blank') {
          setLines(l => [...l, <div key={`b${i}`} className="h-2" />]);

        } else if (item.type === 'pause') {
          await delay(item.ms);

        } else if (item.type === 'out') {
          setLines(l => [...l, (
            <div key={`o${i}`} className="pixel-body text-xl text-slate-300 leading-snug">
              {item.node}
            </div>
          )]);
          await delay(50);

        } else if (item.type === 'cmd') {
          setTyping(true);
          for (let c = 0; c <= item.text.length; c++) {
            if (cancelled) return;
            setCurrentCmd(item.text.slice(0, c));
            await delay(45 + Math.random() * 25);
          }
          if (cancelled) return;
          const committed = item.text;
          setCurrentCmd('');
          setLines(l => [...l, (
            <div key={`c${i}`} className="flex items-center gap-2">
              <span className="pixel-title text-xs select-none" style={{ color: '#4ade80' }}>$</span>
              <span className="pixel-title text-xs"             style={{ color: '#8ecae6' }}>{committed}</span>
            </div>
          )]);
          await delay(180);
        }
      }
      setTyping(false);
    }

    run();
    return () => { cancelled = true; };
  }, []);

  return (
    <section className="max-w-6xl mx-auto px-6 w-full" id="home">
      <div
        className="rounded-2xl overflow-hidden border"
        style={{ borderColor: 'rgba(142,202,230,0.15)', background: '#0a0c14' }}
      >
        {/* Title bar */}
        <div
          className="flex items-center gap-2 px-4 py-3 border-b"
          style={{ borderColor: 'rgba(142,202,230,0.1)', background: '#07080f' }}
        >
          <span className="w-3 h-3 rounded-full bg-red-500/70" />
          <span className="w-3 h-3 rounded-full bg-yellow-400/70" />
          <span className="w-3 h-3 rounded-full bg-green-500/70" />
          <span className="pixel-title text-xs text-slate-600 ml-3">diego@portfolio:~$</span>
        </div>

        {/* Body */}
        <div className="p-6 md:p-10 min-h-[320px]">
          {lines}

          {/* Active typing line */}
          <div className="flex items-center gap-2 mt-1">
            <span className="pixel-title text-xs select-none" style={{ color: '#4ade80' }}>$</span>
            <span className="pixel-title text-xs"             style={{ color: '#8ecae6' }}>{currentCmd}</span>
            <span
              className="inline-block w-[7px] h-[14px] align-middle"
              style={{ background: (typing || blink) ? '#8ecae6' : 'transparent' }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────
export default function Home() {
  return (
    <div className="flex flex-col w-full mt-10 space-y-24">

      <TerminalHero />

      {/* Game studies */}
      <section className="w-full" id="games">
        <h2 className="pixel-title text-xl md:text-2xl font-bold text-white mb-8 border-b border-gray-800 pb-4 max-w-6xl mx-auto px-6">
          Game Architecture &amp; Logic
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
