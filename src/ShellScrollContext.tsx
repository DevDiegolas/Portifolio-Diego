import { createContext, useContext } from 'react';

/** Exposes the scrollable content area so child pages can scroll it. */
export const ShellScrollContext = createContext<React.RefObject<HTMLDivElement | null>>({ current: null });
export const useShellScroll = () => useContext(ShellScrollContext);
