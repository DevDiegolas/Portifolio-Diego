import { useEffect, useRef, useState } from 'react';

// ── Tech data ──────────────────────────────────────────────────────────────
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

// ── Sub-components ─────────────────────────────────────────────────────────
function TechTree({ label, items }: { label: string; items: typeof MOST_USED }) {
  return (
    <div>
      <p className="pixel-title text-xs" style={{ color: '#9be564' }}>{label}</p>
      {items.map((item, i) => (
        <div key={item.name} className="flex items-center gap-2 mt-1.5">
          <span className="pixel-body text-lg text-slate-600 select-none">
            {i === items.length - 1 ? '└──' : '├──'}
          </span>
          <img src={item.icon} alt={item.name} className="w-4 h-4 shrink-0" />
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

function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVis(true), delay);
    return () => clearTimeout(t);
  }, [delay]);
  return (
    <div style={{ opacity: vis ? 1 : 0, transition: 'opacity 0.6s ease' }}>
      {children}
    </div>
  );
}

// ── Game window card ───────────────────────────────────────────────────────
interface GameWindowProps {
  filename: string;
  title: string;
  description: string;
  icon: string;
  bgImage: string;
  tags: string[];
  accentColor: string;
}

function GameWindow({ filename, title, description, icon, bgImage, tags, accentColor }: GameWindowProps) {
  return (
    <a
      href="/games"
      className="block overflow-hidden transition-all duration-200"
      style={{
        borderRadius: 4,
        border: `1px solid ${accentColor}28`,
        background: '#06070d',
        textDecoration: 'none',
        boxShadow: `0 0 0 0 ${accentColor}00`,
      }}
      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = `${accentColor}55`; }}
      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = `${accentColor}28`; }}
    >
      {/* Window title bar */}
      <div
        className="flex items-center gap-2 px-3 py-1.5"
        style={{ background: '#08090e', borderBottom: `1px solid ${accentColor}18` }}
      >
        <span className="pixel-title text-xs" style={{ color: `${accentColor}77` }}>▶</span>
        <span className="pixel-title text-xs" style={{ color: '#3a4556', fontSize: '0.6rem' }}>{filename}</span>
        <div className="flex-1" />
        {tags.map(t => (
          <span
            key={t}
            className="pixel-title"
            style={{
              fontSize: '0.52rem',
              padding: '1px 5px',
              color: `${accentColor}bb`,
              background: `${accentColor}0f`,
              border: `1px solid ${accentColor}28`,
              borderRadius: 2,
            }}
          >{t}</span>
        ))}
      </div>

      {/* Content row */}
      <div className="flex items-center gap-4 p-3 md:p-4">
        {/* Thumbnail */}
        <div className="relative w-20 h-14 shrink-0 overflow-hidden" style={{ borderRadius: 3, border: `1px solid ${accentColor}18` }}>
          <img
            src={bgImage}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
            style={{ filter: 'blur(4px) saturate(0.6)', opacity: 0.4 }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <img src={icon} alt={title} className="w-9 h-9 object-contain drop-shadow-lg" />
          </div>
        </div>

        {/* Text */}
        <div className="flex-1 min-w-0">
          <p
            className="pixel-title mb-1"
            style={{ fontSize: '0.58rem', color: accentColor, letterSpacing: '0.08em' }}
          >{title}</p>
          <p
            className="pixel-body text-xl text-slate-500 leading-snug"
            style={{
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            } as React.CSSProperties}
          >{description}</p>
        </div>

        {/* Arrow */}
        <span className="pixel-title text-xs shrink-0" style={{ color: `${accentColor}55` }}>→</span>
      </div>

      {/* Accent bottom */}
      <div style={{ height: 1, background: `linear-gradient(90deg, ${accentColor}55, transparent 70%)` }} />
    </a>
  );
}

// ── Intro sequence ─────────────────────────────────────────────────────────
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
  { type: 'out',   node: <TechTree label="most-used"     items={MOST_USED} /> },
  { type: 'blank' },
  { type: 'out',   node: <TechTree label="familiar-with" items={FAMILIAR}  /> },
  { type: 'blank' },
  { type: 'out',   node: <LearningTree /> },
  { type: 'blank' },
  { type: 'pause', ms: 400 },
  { type: 'cmd',   text: 'ls games/' },
];

function TerminalIntro({ onDone, onScroll }: { onDone: () => void; onScroll: () => void }) {
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
          onScroll();
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
          onScroll();
          await delay(180);
        }
      }
      setTyping(false);
      onDone();
    }

    run();
    return () => { cancelled = true; };
  }, []);

  return (
    <div>
      {lines}
      <div className="flex items-center gap-2 mt-1">
        <span className="pixel-title text-xs select-none" style={{ color: '#4ade80' }}>$</span>
        <span className="pixel-title text-xs"             style={{ color: '#8ecae6' }}>{currentCmd}</span>
        <span
          className="inline-block w-1.75 h-3.5 align-middle"
          style={{ background: (typing || blink) ? '#8ecae6' : 'transparent' }}
        />
      </div>
    </div>
  );
}

// ── Inline prompt ──────────────────────────────────────────────────────────
function InlinePrompt({ onCommand }: { onCommand: (cmd: string) => void }) {
  const [value,   setValue]   = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState(-1);
  const inputRef              = useRef<HTMLInputElement>(null);

  useEffect(() => { inputRef.current?.focus(); }, []);

  const submit = () => {
    const cmd = value.trim();
    if (!cmd) return;
    setHistory(h => [cmd, ...h]);
    setHistIdx(-1);
    setValue('');
    onCommand(cmd);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') { submit(); return; }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      const next = Math.min(histIdx + 1, history.length - 1);
      setHistIdx(next);
      setValue(history[next] ?? '');
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const next = Math.max(histIdx - 1, -1);
      setHistIdx(next);
      setValue(next === -1 ? '' : history[next]);
    }
  };

  return (
    <div
      className="flex items-center gap-2 cursor-text"
      onClick={() => inputRef.current?.focus()}
    >
      <span className="pixel-title text-xs select-none" style={{ color: '#4ade80' }}>$</span>
      <input
        ref={inputRef}
        value={value}
        onChange={e => { setValue(e.target.value); setHistIdx(-1); }}
        onKeyDown={onKeyDown}
        className="flex-1 bg-transparent outline-none pixel-title text-xs"
        style={{ color: '#8ecae6', caretColor: '#8ecae6' }}
        placeholder="type a command... (try 'help')"
        spellCheck={false}
        autoComplete="off"
        autoCorrect="off"
      />
    </div>
  );
}

// ── Nav ────────────────────────────────────────────────────────────────────
const NAV = [
  { label: '~/',       path: '/'       },
  { label: '~/about',  path: '/about'  },
  { label: '~/games',  path: '/games'  },
  { label: '~/resume', path: '/resume' },
];

// ── Page ───────────────────────────────────────────────────────────────────
export default function Home() {
  const [showContent, setShowContent] = useState(false);
  const [cmdHistory,  setCmdHistory]  = useState<{ cmd: string; out: React.ReactNode }[]>([]);
  const bodyRef                       = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    setTimeout(() => {
      bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight, behavior: 'smooth' });
    }, 40);
  };

  useEffect(() => { if (showContent)        scrollToBottom(); }, [showContent]);
  useEffect(() => { if (cmdHistory.length)  scrollToBottom(); }, [cmdHistory]);

  const gotoPage = (path: string) => {
    window.history.pushState({}, '', path);
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  const handleCommand = (raw: string) => {
    const cmd = raw.toLowerCase().trim().replace(/^(cd |goto )/, '');

    if (cmd === 'clear') { setCmdHistory([]); return; }

    const navMap: Record<string, string> = {
      about: '/about', games: '/games', resume: '/resume',
    };

    if (navMap[cmd]) {
      setCmdHistory(h => [...h, {
        cmd: raw,
        out: <span className="pixel-body text-xl" style={{ color: '#9be564' }}>→ Navigating to {navMap[cmd]}...</span>,
      }]);
      setTimeout(() => gotoPage(navMap[cmd]), 350);
      return;
    }

    const responses: Record<string, React.ReactNode> = {
      help: (
        <div className="pixel-body text-xl text-slate-400 space-y-0.5">
          <p><span style={{ color: '#8ecae6' }}>about</span>   — open about page</p>
          <p><span style={{ color: '#8ecae6' }}>games</span>   — open games page</p>
          <p><span style={{ color: '#8ecae6' }}>resume</span>  — open resume</p>
          <p><span style={{ color: '#8ecae6' }}>ls</span>      — list pages</p>
          <p><span style={{ color: '#8ecae6' }}>whoami</span>  — who is Diego</p>
          <p><span style={{ color: '#8ecae6' }}>clear</span>   — clear command history</p>
          <p><span style={{ color: '#8ecae6' }}>pwd</span>     — working directory</p>
        </div>
      ),
      whoami: (
        <span className="pixel-body text-xl text-slate-300">
          Diego Gonçalves Piovezan Santana — Fullstack Engineer &amp; Game Developer.
        </span>
      ),
      ls: (
        <div className="flex gap-5 pixel-body text-xl">
          <a href="/about"  style={{ color: '#8ecae6' }} className="hover:underline">about/</a>
          <a href="/games"  style={{ color: '#8ecae6' }} className="hover:underline">games/</a>
          <a href="/resume" style={{ color: '#8ecae6' }} className="hover:underline">resume/</a>
        </div>
      ),
      pwd:  <span className="pixel-body text-xl" style={{ color: '#8ecae6' }}>/home/diego/portfolio</span>,
      home: <span className="pixel-body text-xl text-slate-400">Already at ~/</span>,
      '~':  <span className="pixel-body text-xl text-slate-400">Already at ~/</span>,
    };

    const out = responses[cmd] ?? (
      <span className="pixel-body text-xl" style={{ color: '#f87171' }}>
        command not found: <span style={{ color: '#fca5a5' }}>{raw}</span>
        {' '}— type <span style={{ color: '#8ecae6' }}>help</span> for commands.
      </span>
    );

    setCmdHistory(h => [...h, { cmd: raw, out }]);
  };

  return (
    <div
      className="h-screen flex flex-col overflow-hidden"
      style={{ background: '#0a0c14' }}
    >
      {/* ── Title bar ── */}
      <div
        className="flex items-center gap-2 px-4 py-3 shrink-0"
        style={{ borderBottom: '1px solid rgba(142,202,230,0.12)', background: '#07080f' }}
      >
        <span className="w-3 h-3 rounded-full bg-red-500/70" />
        <span className="w-3 h-3 rounded-full bg-yellow-400/70" />
        <span className="w-3 h-3 rounded-full bg-green-500/70" />
        <span className="pixel-title text-xs text-slate-600 ml-2 mr-auto">diego@portfolio:~$</span>

        <nav className="hidden sm:flex items-center gap-4">
          {NAV.map(n => (
            <a
              key={n.path}
              href={n.path}
              className="pixel-title text-xs transition-colors hover:text-white"
              style={{ color: n.path === '/' ? '#8ecae6' : '#475569' }}
            >
              {n.label}
            </a>
          ))}
        </nav>
      </div>

      {/* ── Scrollable body ── */}
      <div
        ref={bodyRef}
        className="flex-1 overflow-y-auto min-h-0 px-6 py-6 md:px-10 md:py-8"
      >
        {/* Auto-typed intro */}
        <TerminalIntro onDone={() => setShowContent(true)} onScroll={scrollToBottom} />

        {/* Games + contacts — appear as terminal output of `ls games/` */}
        {showContent && (
          <FadeIn delay={80}>
            <div className="mt-3 space-y-2">
              <p className="pixel-body text-lg" style={{ color: '#2e3d52', userSelect: 'none' }}>
                {'  drwxr-xr-x  2  diego  staff'}
              </p>
              <GameWindow
                filename="games/potato-clicker"
                title="POTATO CLICKER"
                description="An idle clicker game where you grow your potato empire. Click to harvest, buy upgrades, and watch your potatoes multiply!"
                icon="/src/assets/icon-potato.png"
                bgImage="/src/assets/bg-potato.png"
                tags={['idle', 'godot', 'in-dev']}
                accentColor="#c2ce2b"
              />
              <GameWindow
                filename="games/solo-blocking"
                title="SOLO BLOCKING"
                description="A fast combat prototype with tight controls and responsive block mechanics."
                icon="/src/assets/icon-solo.png"
                bgImage="/src/assets/bg-solo.png"
                tags={['combat', 'godot', 'in-dev']}
                accentColor="#a855f7"
              />
            </div>

            {/* Contacts as terminal key-value output */}
            <div className="mt-6 pt-4" style={{ borderTop: '1px solid rgba(142,202,230,0.06)' }}>
              <p className="pixel-title mb-3" style={{ fontSize: '0.58rem', color: '#2e3d52', letterSpacing: '0.1em' }}># contacts</p>
              <div className="space-y-1.5">
                {[
                  { key: 'github',   value: 'DevDiegolas',                href: 'https://github.com/DevDiegolas',                               external: true  },
                  { key: 'linkedin', value: 'diego-gonçalves-piovezan',   href: 'https://www.linkedin.com/in/diego-gon%C3%A7alves-piovezan/', external: true  },
                  { key: 'resume',   value: '~/resume',                   href: '/resume',                                                      external: false },
                ].map(({ key, value, href, external }) => (
                  <div key={key} className="flex items-center gap-2">
                    <span className="pixel-body text-lg select-none" style={{ color: '#2e3d52', width: 60, textAlign: 'right' }}>{key}</span>
                    <span className="pixel-body text-lg select-none" style={{ color: '#2e3d52' }}>→</span>
                    <a
                      href={href}
                      target={external ? '_blank' : undefined}
                      rel={external ? 'noreferrer' : undefined}
                      className="pixel-body text-xl transition-colors"
                      style={{ color: '#4a5f78' }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#cbd5e1'; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = '#4a5f78'; }}
                    >{value}</a>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        )}

        {/* Command history — rendered inline in the flow */}
        {cmdHistory.length > 0 && (
          <div className="mt-6 space-y-4">
            {cmdHistory.map((entry, i) => (
              <div key={i}>
                <div className="flex items-center gap-2">
                  <span className="pixel-title text-xs select-none" style={{ color: '#4ade80' }}>$</span>
                  <span className="pixel-title text-xs" style={{ color: '#8ecae6' }}>{entry.cmd}</span>
                </div>
                <div className="mt-1 ml-4">{entry.out}</div>
              </div>
            ))}
          </div>
        )}

        {/* Inline prompt — appears right where the terminal stops */}
        {showContent && (
          <div className="mt-4">
            <InlinePrompt onCommand={handleCommand} />
          </div>
        )}

        <div className="h-6" />
      </div>
    </div>
  );
}
