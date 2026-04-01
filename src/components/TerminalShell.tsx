import React, { useCallback, useEffect, useRef, useState } from 'react';

const NAV = [
  { label: '~/home',    path: '/home'   },
  { label: '~/about',   path: '/about'  },
  { label: '~/games',   path: '/games'  },
  { label: '~/resume',  path: '/resume' },
];

interface Props {
  children: React.ReactNode;
  currentPath?: string;
}

const TerminalShell = React.forwardRef<HTMLDivElement, Props>(
  ({ children, currentPath = '/' }, externalRef) => {
    const internalRef = useRef<HTMLDivElement>(null);
    const inputRef    = useRef<HTMLInputElement>(null);

    // Merge external ref (used by Home for scroll-during-intro) with internal
    const setBodyRef = useCallback(
      (el: HTMLDivElement | null) => {
        (internalRef as React.RefObject<HTMLDivElement | null>).current = el;
        if (typeof externalRef === 'function') externalRef(el);
        else if (externalRef)                 externalRef.current = el;
      },
      [externalRef],
    );

    const [cmdLog,   setCmdLog]   = useState<{ cmd: string; out: React.ReactNode }[]>([]);
    const [value,    setValue]    = useState('');
    const [hist,     setHist]     = useState<string[]>([]);
    const [histIdx,  setHistIdx]  = useState(-1);

    // Auto-scroll when cmdLog grows
    useEffect(() => {
      if (!cmdLog.length) return;
      setTimeout(() => {
        internalRef.current?.scrollTo({ top: internalRef.current.scrollHeight, behavior: 'smooth' });
      }, 40);
    }, [cmdLog]);

    const gotoPage = (p: string) => {
      window.history.pushState({}, '', p);
      window.dispatchEvent(new PopStateEvent('popstate'));
    };

    const handleCommand = (raw: string) => {
      const cmd = raw.toLowerCase().trim().replace(/^(cd |goto )/, '');

      if (cmd === 'clear') { setCmdLog([]); return; }

      const navMap: Record<string, string> = {
        about: '/about', games: '/games', resume: '/resume', home: '/', '~': '/',
      };

      if (Object.prototype.hasOwnProperty.call(navMap, cmd)) {
        if (navMap[cmd] === currentPath) {
          setCmdLog(h => [...h, { cmd: raw, out: <span className="pixel-body text-xl text-slate-500">Already here.</span> }]);
          return;
        }
        setCmdLog(h => [...h, {
          cmd: raw,
          out: <span className="pixel-body text-xl" style={{ color: '#9be564' }}>→ navigating to {navMap[cmd]}…</span>,
        }]);
        setTimeout(() => gotoPage(navMap[cmd]), 320);
        return;
      }

      const responses: Record<string, React.ReactNode> = {
        help: (
          <div className="pixel-body text-xl text-slate-400 space-y-0.5">
            <p><span style={{ color: '#8ecae6' }}>about</span>   — about page</p>
            <p><span style={{ color: '#8ecae6' }}>games</span>   — games showcase</p>
            <p><span style={{ color: '#8ecae6' }}>resume</span>  — résumé</p>
            <p><span style={{ color: '#8ecae6' }}>home</span>    — home terminal</p>
            <p><span style={{ color: '#8ecae6' }}>ls</span>      — list pages</p>
            <p><span style={{ color: '#8ecae6' }}>whoami</span>  — who is Diego</p>
            <p><span style={{ color: '#8ecae6' }}>clear</span>   — clear history</p>
            <p><span style={{ color: '#8ecae6' }}>pwd</span>     — current path</p>
          </div>
        ),
        whoami: (
          <span className="pixel-body text-xl text-slate-300">
            Diego Gonçalves Piovezan Santana — Fullstack Engineer &amp; Game Developer.
          </span>
        ),
        ls: (
          <div className="flex gap-5 pixel-body text-xl">
            <a href="/"       style={{ color: '#8ecae6' }} className="hover:underline">home/</a>
            <a href="/about"  style={{ color: '#8ecae6' }} className="hover:underline">about/</a>
            <a href="/games"  style={{ color: '#8ecae6' }} className="hover:underline">games/</a>
            <a href="/resume" style={{ color: '#8ecae6' }} className="hover:underline">resume/</a>
          </div>
        ),
        pwd: <span className="pixel-body text-xl" style={{ color: '#8ecae6' }}>{currentPath}</span>,
      };

      const out = responses[cmd] ?? (
        <span className="pixel-body text-xl" style={{ color: '#f87171' }}>
          command not found: <span style={{ color: '#fca5a5' }}>{raw}</span>
          {' '}— type <span style={{ color: '#8ecae6' }}>help</span> for commands.
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
      <div className="h-screen flex flex-col overflow-hidden" style={{ background: '#0a0c14' }}>

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
                style={{ color: n.path === currentPath ? '#8ecae6' : '#475569' }}
              >
                {n.label}
              </a>
            ))}
          </nav>
        </div>

        {/* ── Scrollable content ── */}
        <div ref={setBodyRef} className="flex-1 overflow-y-auto min-h-0">
          {children}

          {/* Command log — appended after page content */}
          {cmdLog.length > 0 && (
            <div className="px-6 pb-6 md:px-10 space-y-4">
              {cmdLog.map((entry, i) => (
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
        </div>

        {/* ── Fixed command input ── */}
        <div
          className="flex items-center gap-2 px-6 py-4 shrink-0"
          style={{ borderTop: '1px solid rgba(142,202,230,0.12)', background: '#07080f' }}
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
            placeholder="type a command… (try 'help')"
            spellCheck={false}
            autoComplete="off"
            autoCorrect="off"
          />
        </div>
      </div>
    );
  },
);

TerminalShell.displayName = 'TerminalShell';
export default TerminalShell;
