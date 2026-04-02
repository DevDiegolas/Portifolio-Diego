import React, { useEffect, useRef, useState } from 'react';
import { THEMES, useTheme } from '../ThemeContext';
import { useUnderwater } from '../UnderwaterContext';
import { ShellScrollContext } from '../ShellScrollContext';

const NAV = [
  { label: '~/home',    path: '/'       },
  { label: '~/about',   path: '/about'  },
  { label: '~/games',   path: '/games'  },
  { label: '~/profile', path: '/game-profile' },
  { label: '~/resume',  path: '/resume' },
];

interface Props {
  children: React.ReactNode;
  currentPath?: string;
}

export default function TerminalShell({ children, currentPath = '/' }: Props) {
    const scrollRef  = useRef<HTMLDivElement>(null);
    const cmdLogRef  = useRef<HTMLDivElement>(null);
    const inputRef   = useRef<HTMLInputElement>(null);
    const termBarRef = useRef<HTMLDivElement>(null);
    const { theme, setTheme } = useTheme();
    const { active: uwActive, toggle: uwToggle } = useUnderwater();

    const [cmdLog,    setCmdLog]    = useState<{ cmd: string; out: React.ReactNode }[]>([]);
    const [value,     setValue]     = useState('');
    const [hist,      setHist]     = useState<string[]>([]);
    const [histIdx,   setHistIdx]  = useState(-1);
    const [collapsed, setCollapsed] = useState(false);

    // Collapse terminal when clicking outside its bar
    useEffect(() => {
      const handler = (e: MouseEvent) => {
        if (termBarRef.current && !termBarRef.current.contains(e.target as Node)) {
          if (cmdLog.length > 0 || value.length > 0) {
            setCollapsed(true);
          }
        }
      };
      document.addEventListener('mousedown', handler);
      return () => document.removeEventListener('mousedown', handler);
    }, [cmdLog.length, value.length]);

    const expandTerminal = () => {
      setCollapsed(false);
      requestAnimationFrame(() => inputRef.current?.focus());
    };

    // Auto-scroll command log when it grows
    useEffect(() => {
      if (!cmdLog.length) return;
      requestAnimationFrame(() => {
        cmdLogRef.current?.scrollTo({ top: cmdLogRef.current.scrollHeight, behavior: 'smooth' });
      });
    }, [cmdLog]);

    const gotoPage = (p: string) => {
      window.history.pushState({}, '', p);
      window.dispatchEvent(new PopStateEvent('popstate'));
    };

    const handleCommand = (raw: string) => {
      const cmd = raw.toLowerCase().trim().replace(/^(cd |goto )/, '');

      if (cmd === 'clear') { setCmdLog([]); return; }

      const navMap: Record<string, string> = {
        about: '/about', games: '/games', profile: '/game-profile', 'game-profile': '/game-profile', resume: '/resume', home: '/', '~': '/',
      };

      if (Object.prototype.hasOwnProperty.call(navMap, cmd)) {
        if (navMap[cmd] === currentPath) {
          setCmdLog(h => [...h, { cmd: raw, out: <span className="pixel-body text-xl" style={{ color: 'var(--t-text-dim)' }}>Already here.</span> }]);
          return;
        }
        setCmdLog(h => [...h, {
          cmd: raw,
          out: <span className="pixel-body text-xl" style={{ color: 'var(--t-secondary)' }}>→ navigating to {navMap[cmd]}…</span>,
        }]);
        setTimeout(() => gotoPage(navMap[cmd]), 320);
        return;
      }

      // ── Theme commands ──
      if (cmd === 'theme' || cmd === 'theme list' || cmd === 'themes' || cmd === 'color' || cmd === 'color list' || cmd === 'colors') {
        setCmdLog(h => [...h, {
          cmd: raw,
          out: (
            <div className="pixel-body text-xl space-y-0.5" style={{ color: 'var(--t-text-muted)' }}>
              <p style={{ color: 'var(--t-tertiary)' }}>Available themes:</p>
              {THEMES.map(t => (
                <p key={t.name}>
                  <span style={{ color: t.name === theme.name ? 'var(--t-secondary)' : 'var(--t-primary)' }}>
                    {t.name === theme.name ? '● ' : '  '}{t.name}
                  </span>
                  <span style={{ color: 'var(--t-text-dim)' }}> — {t.label}</span>
                </p>
              ))}
              <p className="mt-1" style={{ color: 'var(--t-text-dim)' }}>
                Usage: <span style={{ color: 'var(--t-primary)' }}>theme {'<name>'}</span> or <span style={{ color: 'var(--t-primary)' }}>color {'<name>'}</span>
              </p>
            </div>
          ),
        }]);
        return;
      }

      if (cmd.startsWith('theme ') || cmd.startsWith('color ')) {
        const themeName = cmd.slice(6).trim();
        const found = THEMES.find(t => t.name === themeName);
        if (found) {
          setTheme(found.name);
          setCmdLog(h => [...h, {
            cmd: raw,
            out: (
              <span className="pixel-body text-xl" style={{ color: 'var(--t-secondary)' }}>
                Theme changed to <span style={{ color: 'var(--t-primary)' }}>{found.label}</span>.
              </span>
            ),
          }]);
        } else {
          setCmdLog(h => [...h, {
            cmd: raw,
            out: (
              <span className="pixel-body text-xl" style={{ color: 'var(--t-error)' }}>
                Unknown theme: <span style={{ color: 'var(--t-error-light)' }}>{themeName}</span>
                {' '}— type <span style={{ color: 'var(--t-primary)' }}>color list</span> to see options.
              </span>
            ),
          }]);
        }
        return;
      }

      // ── Underwater toggle ──
      if (cmd === 'underwater') {
        uwToggle();
        const next = !uwActive;
        setCmdLog(h => [...h, {
          cmd: raw,
          out: (
            <span className="pixel-body text-xl" style={{ color: 'var(--t-secondary)' }}>
              {next ? '🫧 Underwater mode activated. Dive in.' : '☀ Underwater mode deactivated. Back to the surface.'}
            </span>
          ),
        }]);
        return;
      }

      const responses: Record<string, React.ReactNode> = {
        help: (
          <div className="pixel-body text-xl space-y-0.5" style={{ color: 'var(--t-text-muted)' }}>
            <p><span style={{ color: 'var(--t-primary)' }}>about</span>   — about page</p>
            <p><span style={{ color: 'var(--t-primary)' }}>games</span>   — games showcase</p>
            <p><span style={{ color: 'var(--t-primary)' }}>profile</span> — game profile page</p>
            <p><span style={{ color: 'var(--t-primary)' }}>resume</span>  — résumé</p>
            <p><span style={{ color: 'var(--t-primary)' }}>home</span>    — home terminal</p>
            <p><span style={{ color: 'var(--t-primary)' }}>ls</span>      — list pages</p>
            <p><span style={{ color: 'var(--t-primary)' }}>whoami</span>  — who is Diego</p>
            <p><span style={{ color: 'var(--t-primary)' }}>theme</span>   — change color theme</p>
            <p><span style={{ color: 'var(--t-primary)' }}>color</span>   — alias for theme command</p>
            <p><span style={{ color: 'var(--t-primary)' }}>underwater</span> — toggle underwater mode</p>
            <p><span style={{ color: 'var(--t-primary)' }}>clear</span>   — clear history</p>
            <p><span style={{ color: 'var(--t-primary)' }}>pwd</span>     — current path</p>
          </div>
        ),
        whoami: (
          <span className="pixel-body text-xl" style={{ color: 'var(--t-text)' }}>
            Diego Gonçalves Piovezan Santana — Fullstack Engineer &amp; Game Developer.
          </span>
        ),
        ls: (
          <div className="flex gap-5 pixel-body text-xl">
            <a href="/"       style={{ color: 'var(--t-primary)' }} className="hover:underline">home/</a>
            <a href="/about"  style={{ color: 'var(--t-primary)' }} className="hover:underline">about/</a>
            <a href="/games"  style={{ color: 'var(--t-primary)' }} className="hover:underline">games/</a>
            <a href="/game-profile" style={{ color: 'var(--t-primary)' }} className="hover:underline">profile/</a>
            <a href="/resume" style={{ color: 'var(--t-primary)' }} className="hover:underline">resume/</a>
          </div>
        ),
        pwd: <span className="pixel-body text-xl" style={{ color: 'var(--t-primary)' }}>{currentPath === '/' ? '/home' : currentPath}</span>,
      };

      const out = responses[cmd] ?? (
        <span className="pixel-body text-xl" style={{ color: 'var(--t-error)' }}>
          command not found: <span style={{ color: 'var(--t-error-light)' }}>{raw}</span>
          {' '}— type <span style={{ color: 'var(--t-primary)' }}>help</span> for commands.
        </span>
      );

      setCmdLog(h => [...h, { cmd: raw, out }]);
    };

    const submit = () => {
      const cmd = value.trim();
      if (!cmd) return;
      setHist(h => [cmd, ...h]);
      setHistIdx(-1);
      setValue('');
      handleCommand(cmd);
    };

    const onKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === 'Enter') { submit(); return; }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        const next = Math.min(histIdx + 1, hist.length - 1);
        setHistIdx(next);
        setValue(hist[next] ?? '');
      }
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        const next = Math.max(histIdx - 1, -1);
        setHistIdx(next);
        setValue(next === -1 ? '' : hist[next]);
      }
    };

    return (
      <ShellScrollContext.Provider value={scrollRef}>
      <div className="h-screen flex flex-col overflow-hidden" style={{ background: 'var(--t-bg)' }}>

        {/* ── Title bar ── */}
        <div
          className="px-3 sm:px-4 py-2.5 sm:py-3 shrink-0"
          style={{ borderBottom: '1px solid color-mix(in srgb, var(--t-primary) 12%, transparent)', background: 'var(--t-bg-bar)' }}
        >
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-500/70" />
            <span className="w-3 h-3 rounded-full bg-yellow-400/70" />
            <span className="w-3 h-3 rounded-full bg-green-500/70" />
            <span className="pixel-title text-xs ml-2 mr-auto hidden sm:inline" style={{ color: 'var(--t-text-dim)' }}>diego@portfolio:~$</span>

            <nav className="hidden sm:flex items-center gap-4">
              {NAV.map(n => (
                <a
                  key={n.path}
                  href={n.path}
                  className="pixel-title text-xs whitespace-nowrap transition-colors hover:text-white"
                  style={{ color: n.path === currentPath ? 'var(--t-primary)' : 'var(--t-text-dim)' }}
                >
                  {n.label}
                </a>
              ))}
            </nav>
          </div>

          <nav className="sm:hidden mt-2 -mx-1 px-1 flex items-center gap-3 overflow-x-auto scrollbar-hide">
            {NAV.map(n => (
              <a
                key={n.path}
                href={n.path}
                className="pixel-title text-[0.62rem] whitespace-nowrap transition-colors"
                style={{ color: n.path === currentPath ? 'var(--t-primary)' : 'var(--t-text-dim)' }}
              >
                {n.label}
              </a>
            ))}
          </nav>
        </div>

        {/* ── Scrollable content ── */}
        <div ref={scrollRef} className="flex-1 min-h-0 relative">
          {children}
        </div>

        {/* ── Command log + input ── */}
        <div
          ref={termBarRef}
          className="shrink-0 relative"
          style={{
            borderTop: '1px solid color-mix(in srgb, var(--t-primary) 12%, transparent)',
            background: 'var(--t-bg-bar)',
            minHeight: '2.6rem',
          }}
        >
          {/* Collapsed hint bar — always in DOM, fades in/out */}
          <div
            className="absolute inset-0 flex items-center gap-2 px-3 sm:px-6 cursor-pointer"
            style={{
              opacity: collapsed ? 1 : 0,
              pointerEvents: collapsed ? 'auto' : 'none',
              transition: 'opacity 0.3s ease',
              zIndex: collapsed ? 1 : 0,
            }}
            onClick={expandTerminal}
          >
            <span className="pixel-title text-xs select-none" style={{ color: 'var(--t-prompt)' }}>$</span>
            <span className="pixel-title text-xs" style={{ color: 'var(--t-text-dim)' }}>
              {value || 'click to expand terminal…'}
            </span>
            <span className="ml-auto pixel-body text-sm" style={{ color: 'var(--t-text-dimmer)', transition: 'transform 0.3s ease', transform: collapsed ? 'rotate(0)' : 'rotate(180deg)' }}>▲</span>
          </div>

          {/* Expanded: log + input — slides via grid trick */}
          <div
            style={{
              display: 'grid',
              gridTemplateRows: collapsed ? '0fr' : '1fr',
              opacity: collapsed ? 0 : 1,
              transition: 'grid-template-rows 0.4s cubic-bezier(0.22,1,0.36,1), opacity 0.3s ease',
            }}
          >
            <div style={{ overflow: 'hidden' }}>
              {cmdLog.length > 0 && (
                <div ref={cmdLogRef} className="px-3 sm:px-6 pt-3 pb-1 max-h-40 overflow-y-auto scrollbar-hide space-y-3">
                  {cmdLog.map((entry, i) => (
                    <div key={i}>
                      <div className="flex items-center gap-2">
                        <span className="pixel-title text-xs select-none" style={{ color: 'var(--t-prompt)' }}>$</span>
                        <span className="pixel-title text-xs" style={{ color: 'var(--t-primary)' }}>{entry.cmd}</span>
                      </div>
                      <div className="mt-1 ml-4">{entry.out}</div>
                    </div>
                  ))}
                </div>
              )}
              <div
                className="flex items-center gap-2 px-3 sm:px-6 py-3 sm:py-4"
                onClick={() => inputRef.current?.focus()}
              >
                <span className="pixel-title text-xs select-none" style={{ color: 'var(--t-prompt)' }}>$</span>
                <input
                  ref={inputRef}
                  value={value}
                  onChange={e => { setValue(e.target.value); setHistIdx(-1); }}
                  onKeyDown={onKeyDown}
                  className="flex-1 bg-transparent outline-none pixel-title text-xs"
                  style={{ color: 'var(--t-primary)', caretColor: 'var(--t-primary)' }}
                  placeholder="type a command… (try 'help')"
                  spellCheck={false}
                  autoComplete="off"
                  autoCorrect="off"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      </ShellScrollContext.Provider>
    );
}
