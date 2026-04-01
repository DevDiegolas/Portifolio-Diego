import { useEffect, useRef, useState } from 'react';
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

function getPathname() {
  if (typeof window === 'undefined') return '/';
  return window.location.pathname || '/';
}

export default function App() {
  const [loaded, setLoaded] = useState(() => sessionStorage.getItem('portfolio_loaded') === '1');
  const [path, setPath] = useState(getPathname);
  const [direction, setDirection] = useState<'forward' | 'back'>('forward');
  const pathRef = useRef(path);

  useEffect(() => {
    pathRef.current = path;
  }, [path]);

  useEffect(() => {
    const goTo = (nextPath: string) => {
      const currentOrder = ROUTE_ORDER[pathRef.current] ?? 0;
      const nextOrder = ROUTE_ORDER[nextPath] ?? 0;

      if (nextPath === pathRef.current) return;

      setDirection(nextOrder >= currentOrder ? 'forward' : 'back');
      window.history.pushState({}, '', nextPath);
      setPath(nextPath);
      window.scrollTo({ top: 0, behavior: 'auto' });
    };

    const onPopState = () => {
      const nextPath = getPathname();
      const currentOrder = ROUTE_ORDER[pathRef.current] ?? 0;
      const nextOrder = ROUTE_ORDER[nextPath] ?? 0;

      setDirection(nextOrder >= currentOrder ? 'forward' : 'back');
      setPath(nextPath);
      window.scrollTo({ top: 0, behavior: 'auto' });
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
      goTo(url.pathname);
    };

    window.addEventListener('popstate', onPopState);
    document.addEventListener('click', onDocumentClick);

    return () => {
      window.removeEventListener('popstate', onPopState);
      document.removeEventListener('click', onDocumentClick);
    };
  }, []);

  let content = <Home />;
  if (path === '/resume') content = <ResumePage />;
  if (path === '/games') content = <GamesPage />;
  if (path === '/about') content = <AboutPage />;

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
          <main key={path} className={`page-transition ${direction === 'forward' ? 'page-transition-forward' : 'page-transition-back'}`}>
            {content}
          </main>
        )}
      </div>
    </ThemeProvider>
  );
}
