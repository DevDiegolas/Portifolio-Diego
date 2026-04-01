import { useCallback, useEffect, useRef, useState } from 'react';
import TerminalShell from './TerminalShell';
import iconPotato from '../assets/icon-potato.png';
import bgPotato from '../assets/bg-potato.png';
import iconSolo from '../assets/icon-solo.png';
import bgSolo from '../assets/bg-solo.png';

// ── Tech data ──────────────────────────────────────────────────────────────
const CDN = 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons';

const MOST_USED = [
  { name: 'react',      icon: `${CDN}/react/react-original.svg` },
  { name: 'node.js',    icon: `${CDN}/nodejs/nodejs-original.svg` },
  { name: 'typescript', icon: `${CDN}/typescript/typescript-original.svg` },
  { name: 'go',         icon: `${CDN}/go/go-original.svg` },
  { name: 'docker',     icon: `${CDN}/docker/docker-original.svg` },
];
const FAMILIAR = [
  { name: 'godot',      icon: `${CDN}/godot/godot-original.svg` },
  { name: 'unity',      icon: `${CDN}/unity/unity-original.svg` },
  { name: 'GameMaker',  icon: `https://cdn.simpleicons.org/gamemaker/00b96b` },
  { name: 'aws',        icon: `${CDN}/amazonwebservices/amazonwebservices-original-wordmark.svg` },
];

// ── Helpers ────────────────────────────────────────────────────────────────
function TechTree({ label, items }: { label: string; items: typeof MOST_USED }) {
  return (
    <div>
      <p className="pixel-title text-xs" style={{ color: 'var(--t-secondary)' }}>{label}</p>
      {items.map((item, i) => (
        <div key={item.name} className="flex items-center gap-2 mt-1.5">
          <span className="pixel-body text-lg select-none" style={{ color: 'var(--t-text-dim)' }}>
            {i === items.length - 1 ? '└──' : '├──'}
          </span>
          <img src={item.icon} alt={item.name} className="w-4 h-4 shrink-0" />
          <span className="pixel-body text-xl" style={{ color: 'var(--t-text)' }}>{item.name}</span>
        </div>
      ))}
    </div>
  );
}

const LEARNING = [
  { name: 'Machine Learning', icon: `${CDN}/tensorflow/tensorflow-original.svg` },
  { name: 'AI Agents',        icon: 'https://img.icons8.com/fluency/48/robot-2.png' },
  { name: 'Automation',       icon: `${CDN}/github/github-original.svg` },
];

function LearningTree() {
  return (
    <div>
      <p className="pixel-title text-xs" style={{ color: 'var(--t-secondary)' }}>currently-learning</p>
      {LEARNING.map((item, i) => (
        <div key={item.name} className="flex items-center gap-2 mt-1.5">
          <span className="pixel-body text-lg select-none" style={{ color: 'var(--t-text-dim)' }}>
            {i === LEARNING.length - 1 ? '└──' : '├──'}
          </span>
          <img src={item.icon} alt={item.name} className="w-4 h-4 shrink-0" />
          <span className="pixel-body text-xl" style={{ color: 'var(--t-text)' }}>{item.name}</span>
        </div>
      ))}
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

// ── Game window card (with hover-expand) ───────────────────────────────────
interface GameWindowProps {
  filename: string;
  title: string;
  description: string;
  expandedText: string;
  icon: string;
  bgImage: string;
  tags: string[];
  accentColor: string;
}

function GameWindow({
  filename, title, description, expandedText, icon, bgImage, tags, accentColor,
}: GameWindowProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href="/games"
      className="block overflow-hidden transition-colors duration-200"
      style={{
        borderRadius: 4,
        border: `1px solid ${hovered ? accentColor + '50' : accentColor + '25'}`,
        background: 'var(--t-bg-card)',
        textDecoration: 'none',
        transition: 'border-color 0.2s ease',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Window title bar */}
      <div
        className="flex items-center gap-2 px-3 py-1.5"
        style={{ background: 'var(--t-bg-bar)', borderBottom: `1px solid ${accentColor}18` }}
      >
        <span className="pixel-title text-xs" style={{ color: `${accentColor}77` }}>▶</span>
        <span className="pixel-title" style={{ fontSize: '0.6rem', color: 'var(--t-text-dimmer)' }}>{filename}</span>
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

      {/* Compact row — always visible */}
      <div className="flex items-center gap-4 p-3 md:p-4">
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

        <div className="flex-1 min-w-0">
          <p className="pixel-title mb-1" style={{ fontSize: '0.58rem', color: accentColor, letterSpacing: '0.08em' }}>{title}</p>
          <p
            className="pixel-body text-xl leading-snug"
            style={{
              color: 'var(--t-text-dim)',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            } as React.CSSProperties}
          >{description}</p>
        </div>

        <span
          className="pixel-title text-xs shrink-0 transition-transform duration-300"
          style={{ color: `${accentColor}55`, transform: hovered ? 'rotate(90deg)' : 'none' }}
        >→</span>
      </div>

      {/* Expanded section — slides open on hover */}
      <div
        style={{
          maxHeight: hovered ? '520px' : '0',
          opacity: hovered ? 1 : 0,
          overflow: 'hidden',
          transition: 'max-height 0.5s ease, opacity 0.35s ease',
        }}
      >
        <div
          className="px-4 pb-5 pt-1 space-y-3"
          style={{ borderTop: `1px solid ${accentColor}18` }}
        >
          <p className="pixel-body text-xl leading-relaxed" style={{ color: 'var(--t-text-muted)' }}>{expandedText}</p>
          <p className="pixel-body text-xl leading-relaxed" style={{ color: 'var(--t-text-dim)' }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt
            ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
            ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
          <p className="pixel-body text-xl leading-relaxed" style={{ color: 'var(--t-text-dim)' }}>
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
            nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
            deserunt mollit anim id est laborum.
          </p>
          <div className="pt-1">
            <span
              className="pixel-title"
              style={{
                fontSize: '0.55rem',
                color: accentColor,
                border: `1px solid ${accentColor}40`,
                background: `${accentColor}0c`,
                padding: '4px 10px',
                borderRadius: 3,
              }}
            >open project →</span>
          </div>
        </div>
      </div>

      {/* Accent bottom */}
      <div style={{ height: 1, background: `linear-gradient(90deg, ${accentColor}${hovered ? '70' : '40'}, transparent 70%)`, transition: 'all 0.3s' }} />
    </a>
  );
}

// ── Static intro (full terminal state, no animation) ──────────────────────
function Cmd({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="pixel-title text-xs select-none" style={{ color: 'var(--t-prompt)' }}>$</span>
      <span className="pixel-title text-xs" style={{ color: 'var(--t-primary)' }}>{text}</span>
    </div>
  );
}

function Out({ children }: { children: React.ReactNode }) {
  return (
    <div className="pixel-body text-xl leading-snug" style={{ color: 'var(--t-text)' }}>{children}</div>
  );
}

function StaticIntro() {
  return (
    <div className="space-y-0">
      <Cmd text="whoami" />
      <Out>Hi, I&apos;m <span style={{ color: 'var(--t-primary)' }}>Diego.</span></Out>
      <div className="h-2" />
      <Cmd text="cat role.txt" />
      <Out>Fullstack Software Engineer &amp; Game Developer</Out>
      <div className="h-2" />
      <Cmd text="npm list --skills" />
      <div className="h-2" />
      <Out><TechTree label="most-used"     items={MOST_USED} /></Out>
      <div className="h-2" />
      <Out><TechTree label="familiar-with" items={FAMILIAR}  /></Out>
      <div className="h-2" />
      <Out><LearningTree /></Out>
      <div className="h-2" />
      <Cmd text="ls games/" />
    </div>
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
  { type: 'out',   node: <span>Hi, I&apos;m <span style={{ color: 'var(--t-primary)' }}>Diego.</span></span> },
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
  const onDoneRef = useRef(onDone);
  const onScrollRef = useRef(onScroll);

  useEffect(() => {
    onDoneRef.current = onDone;
    onScrollRef.current = onScroll;
  }, [onDone, onScroll]);

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
            <div key={`o${i}`} className="pixel-body text-xl leading-snug" style={{ color: 'var(--t-text)' }}>
              {item.node}
            </div>
          )]);
          onScrollRef.current();
          await delay(50);
        } else if (item.type === 'cmd') {
          setTyping(true);
          for (let c = 0; c <= item.text.length; c++) {
            if (cancelled) return;
            if (c % 2 === 0 || c === item.text.length) {
              setCurrentCmd(item.text.slice(0, c));
            }
            await delay(45 + Math.random() * 25);
          }
          if (cancelled) return;
          const committed = item.text;
          setCurrentCmd('');
          setLines(l => [...l, (
            <div key={`c${i}`} className="flex items-center gap-2">
              <span className="pixel-title text-xs select-none" style={{ color: 'var(--t-prompt)' }}>$</span>
              <span className="pixel-title text-xs"             style={{ color: 'var(--t-primary)' }}>{committed}</span>
            </div>
          )]);
          onScrollRef.current();
          await delay(180);
        }
      }
      setTyping(false);
      onDoneRef.current();
    }

    run();
    return () => { cancelled = true; };
  }, []);

  return (
    <div>
      {lines}
      <div className="flex items-center gap-2 mt-1">
        <span className="pixel-title text-xs select-none" style={{ color: 'var(--t-prompt)' }}>$</span>
        <span className="pixel-title text-xs"             style={{ color: 'var(--t-primary)' }}>{currentCmd}</span>
        <span
          className={`inline-block w-1.5 h-3.5 align-middle intro-caret ${typing ? '' : 'intro-caret-idle'}`}
          style={{ background: 'var(--t-primary)' }}
        />
      </div>
    </div>
  );
}

// ── sessionStorage key ─────────────────────────────────────────────────────
const INTRO_KEY = 'portfolio_intro_shown';

// ── Page ───────────────────────────────────────────────────────────────────
export default function Home() {
  const [introSeen]    = useState(() => sessionStorage.getItem(INTRO_KEY) === '1');
  const [showContent,  setShowContent]  = useState(introSeen);
  const bodyRef                         = useRef<HTMLDivElement>(null);

  // Mark intro as seen immediately so back-navigation skips it
  useEffect(() => {
    if (!introSeen) sessionStorage.setItem(INTRO_KEY, '1');
  }, [introSeen]);

  const scrollToBottom = useCallback(() => {
    requestAnimationFrame(() => {
      bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight, behavior: 'auto' });
    });
  }, []);

  const handleIntroDone = useCallback(() => {
    setShowContent(true);
  }, []);

  useEffect(() => { if (showContent) scrollToBottom(); }, [showContent, scrollToBottom]);

  return (
    <TerminalShell ref={bodyRef} currentPath="/">
      <div className="px-6 py-6 md:px-10 md:py-8">

        {/* First visit: animated intro. Return visit: full static output instantly. */}
        {!introSeen
          ? <TerminalIntro onDone={handleIntroDone} onScroll={scrollToBottom} />
          : <StaticIntro />
        }

        {/* Games + contacts */}
        {showContent && (
          <FadeIn delay={introSeen ? 0 : 80}>
            <div className="mt-3 space-y-2">
              <p className="pixel-body text-lg select-none" style={{ color: 'var(--t-text-dimmer)' }}>
                {'  drwxr-xr-x  2  diego  staff'}
              </p>

              <GameWindow
                filename="games/potato-clicker"
                title="POTATO CLICKER"
                description="An idle clicker game where you grow your potato empire."
                expandedText="Click to harvest, buy upgrades, and watch your potatoes multiply across increasingly complex prestige loops."
                icon={iconPotato}
                bgImage={bgPotato}
                tags={['idle', 'godot', 'in-dev']}
                accentColor="#c2ce2b"
              />

              <GameWindow
                filename="games/solo-blocking"
                title="SOLO BLOCKING"
                description="A fast combat prototype with tight block mechanics."
                expandedText="Responsive controls, impact feedback, and movement polish are the core focus of this action combat prototype."
                icon={iconSolo}
                bgImage={bgSolo}
                tags={['combat', 'godot', 'in-dev']}
                accentColor="#a855f7"
              />
            </div>

            {/* Contacts */}
            <div className="mt-6 pt-4" style={{ borderTop: '1px solid color-mix(in srgb, var(--t-primary) 6%, transparent)' }}>
              <p className="pixel-title mb-3" style={{ fontSize: '0.58rem', color: 'var(--t-text-dimmer)', letterSpacing: '0.1em' }}># contacts</p>
              <div className="space-y-1.5">
                {[
                  { key: 'github',   val: 'DevDiegolas',                    href: 'https://github.com/DevDiegolas',                              ext: true  },
                  { key: 'linkedin', val: 'diego-gonçalves-piovezan',        href: 'https://www.linkedin.com/in/diego-gon%C3%A7alves-piovezan/', ext: true  },
                  { key: 'resume',   val: '~/resume',                        href: '/resume',                                                     ext: false },
                ].map(({ key, val, href, ext }) => (
                  <div key={key} className="flex items-center gap-2">
                    <span className="pixel-body text-lg select-none" style={{ color: 'var(--t-text-dimmer)', width: 62, textAlign: 'right' }}>{key}</span>
                    <span className="pixel-body text-lg select-none" style={{ color: 'var(--t-text-dimmer)' }}>→</span>
                    <a
                      href={href}
                      target={ext ? '_blank' : undefined}
                      rel={ext ? 'noreferrer' : undefined}
                      className="pixel-body text-xl transition-colors"
                      style={{ color: 'var(--t-text-dim)' }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'var(--t-text)'; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'var(--t-text-dim)'; }}
                    >{val}</a>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        )}

        <div className="h-6" />
      </div>
    </TerminalShell>
  );
}
