import { useCallback, useEffect, useRef, useState } from 'react';
import Home from './components/Home';
import ResumePage from './components/ResumePage';
import GamesPage from './components/GamesPage';
import AboutPage from './components/AboutPage';
import GameLoader from './components/GameLoader';
import { ThemeProvider } from './ThemeContext';

const ROUTE_ORDER: Record<string, number> = {
  '/': 0,
  '/about': 1,
  '/games': 2,
  '/resume': 3,
};

const TRANSITION_MS = 380;

function getPathname() {
  if (typeof window === 'undefined') return '/';
  return window.location.pathname || '/';
}

function pageFor(p: string) {
  if (p === '/resume') return <ResumePage />;
  if (p === '/games') return <GamesPage />;
  if (p === '/about') return <AboutPage />;
  return <Home />;
}

export default function App() {
  const [loaded, setLoaded] = useState(() => sessionStorage.getItem('portfolio_loaded') === '1');
  const [path, setPath] = useState(getPathname);
  const [direction, setDirection] = useState<'forward' | 'back'>('forward');
  const [prev, setPrev] = useState<{ path: string; dir: 'forward' | 'back' } | null>(null);
  const pathRef = useRef(path);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    pathRef.current = path;
  }, [path]);

  const navigate = useCallback((nextPath: string) => {
    if (nextPath === pathRef.current) return;

    const currentOrder = ROUTE_ORDER[pathRef.current] ?? 0;
    const nextOrder = ROUTE_ORDER[nextPath] ?? 0;
    const dir = nextOrder >= currentOrder ? 'forward' : 'back';

    // Clear any pending cleanup
    if (timerRef.current) clearTimeout(timerRef.current);

    // Snapshot the current page as "prev" so it can animate out
    setPrev({ path: pathRef.current, dir });
    setDirection(dir);
    setPath(nextPath);
    window.history.pushState({}, '', nextPath);
    window.scrollTo({ top: 0, behavior: 'auto' });

    // Remove the old page after the animation completes
    timerRef.current = setTimeout(() => setPrev(null), TRANSITION_MS);
  }, []);

  useEffect(() => {
    const onPopState = () => {
      const nextPath = getPathname();
      if (nextPath === pathRef.current) return;

      const currentOrder = ROUTE_ORDER[pathRef.current] ?? 0;
      const nextOrder = ROUTE_ORDER[nextPath] ?? 0;
      const dir = nextOrder >= currentOrder ? 'forward' : 'back';

      if (timerRef.current) clearTimeout(timerRef.current);

      setPrev({ path: pathRef.current, dir });
      setDirection(dir);
      setPath(nextPath);
      window.scrollTo({ top: 0, behavior: 'auto' });

      timerRef.current = setTimeout(() => setPrev(null), TRANSITION_MS);
    };

    const onDocumentClick = (event: MouseEvent) => {
      if (event.defaultPrevented) return;
      if (event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const target = event.target as Element | null;
      const anchor = target?.closest('a');
      if (!anchor) return;

      const href = anchor.getAttribute('href');
      if (!href || !href.startsWith('/')) return;
      if (anchor.getAttribute('target') && anchor.getAttribute('target') !== '_self') return;
      if (anchor.hasAttribute('download')) return;

      const url = new URL(href, window.location.origin);
      if (url.origin !== window.location.origin) return;

      event.preventDefault();
      navigate(url.pathname);
    };

    window.addEventListener('popstate', onPopState);
    document.addEventListener('click', onDocumentClick);

    return () => {
      window.removeEventListener('popstate', onPopState);
      document.removeEventListener('click', onDocumentClick);
    };
  }, [navigate]);

  return (
    <ThemeProvider>
      <div className="h-screen overflow-hidden font-sans" style={{ color: 'var(--t-text)' }}>
        {!loaded ? (
          <GameLoader
            onComplete={() => {
              sessionStorage.setItem('portfolio_loaded', '1');
              setLoaded(true);
            }}
          />
        ) : (
          <div className="relative h-full">
            {/* Outgoing page — animates out, removed after transition */}
            {prev && (
              <main
                key={`out-${prev.path}`}
                className={`absolute inset-0 page-exit ${prev.dir === 'forward' ? 'page-exit-forward' : 'page-exit-back'}`}
                style={{ pointerEvents: 'none' }}
              >
                {pageFor(prev.path)}
              </main>
            )}
            {/* Incoming page — animates in */}
            <main
              key={`in-${path}`}
              className={`absolute inset-0 page-enter ${direction === 'forward' ? 'page-enter-forward' : 'page-enter-back'}`}
            >
              {pageFor(path)}
            </main>
          </div>
        )}
      </div>
    </ThemeProvider>
  );
}
