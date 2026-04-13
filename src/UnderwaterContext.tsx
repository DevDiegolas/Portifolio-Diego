import { createContext, useCallback, useContext, useState } from 'react';

interface UnderwaterValue {
  active: boolean;
  toggle: () => void;
}

const Ctx = createContext<UnderwaterValue>({ active: false, toggle: () => {} });

export function UnderwaterProvider({ children }: { children: React.ReactNode }) {
  const [active, setActive] = useState(
    () => localStorage.getItem('portfolio_underwater') === '1',
  );

  const toggle = useCallback(() => {
    setActive(prev => {
      const next = !prev;
      localStorage.setItem('portfolio_underwater', next ? '1' : '0');
      return next;
    });
  }, []);

  return <Ctx.Provider value={{ active, toggle }}>{children}</Ctx.Provider>;
}

export function useUnderwater() {
  return useContext(Ctx);
}
