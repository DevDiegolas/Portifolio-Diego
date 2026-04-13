import { createContext, useContext, useEffect, useState } from 'react';

// ── Theme shape ───────────────────────────────────────────────────────────
export interface ThemeColors {
  primary: string;
  secondary: string;
  tertiary: string;
  quaternary: string;
  fifth: string;
  bg: string;
  bgCard: string;
  bgBar: string;
  bgDarker: string;
  text: string;
  textMuted: string;
  textDim: string;
  textDimmer: string;
  prompt: string;
  error: string;
  errorLight: string;
  frame: string;
  frameBg: string;
  frameLight: string;
  frameDark: string;
  frameLine: string;
  frameLineDark: string;
  frameOuter: string;
}

export interface Theme {
  name: string;
  label: string;
  colors: ThemeColors;
  secret?: boolean;
}

// ── Themes ────────────────────────────────────────────────────────────────
export const THEMES: Theme[] = [
  {
    name: 'terminal',
    label: 'Terminal (default)',
    colors: {
      primary: '#8ecae6',
      secondary: '#9be564',
      tertiary: '#ffd166',
      quaternary: '#f497c2',
      fifth: '#a78bfa',
      bg: '#0a0c14',
      bgCard: '#06070d',
      bgBar: '#07080f',
      bgDarker: '#06070e',
      text: '#cbd5e1',
      textMuted: '#94a3b8',
      textDim: '#475569',
      textDimmer: '#2e3d52',
      prompt: '#4ade80',
      error: '#f87171',
      errorLight: '#fca5a5',
      frame: '#c9a55c',
      frameBg: '#0d0b06',
      frameLight: '#e8c97a',
      frameDark: '#9e7d40',
      frameLine: '#3d2e12',
      frameLineDark: '#2a1f0a',
      frameOuter: '#3d2208',
    },
  },
  {
    name: 'dracula',
    label: 'Dracula',
    colors: {
      primary: '#bd93f9',
      secondary: '#50fa7b',
      tertiary: '#f1fa8c',
      quaternary: '#ff79c6',
      fifth: '#8be9fd',
      bg: '#282a36',
      bgCard: '#1e1f29',
      bgBar: '#21222c',
      bgDarker: '#191a21',
      text: '#f8f8f2',
      textMuted: '#bfbfb8',
      textDim: '#6272a4',
      textDimmer: '#44475a',
      prompt: '#50fa7b',
      error: '#ff5555',
      errorLight: '#ff8888',
      frame: '#bd93f9',
      frameBg: '#1e1f29',
      frameLight: '#caa8ff',
      frameDark: '#8872b8',
      frameLine: '#44475a',
      frameLineDark: '#343746',
      frameOuter: '#2d1f54',
    },
  },
  {
    name: 'monokai',
    label: 'Monokai',
    colors: {
      primary: '#f92672',
      secondary: '#a6e22e',
      tertiary: '#e6db74',
      quaternary: '#66d9ef',
      fifth: '#ae81ff',
      bg: '#272822',
      bgCard: '#1e1f1a',
      bgBar: '#1c1d18',
      bgDarker: '#1a1b16',
      text: '#f8f8f2',
      textMuted: '#b8b8aa',
      textDim: '#75715e',
      textDimmer: '#49483e',
      prompt: '#a6e22e',
      error: '#f92672',
      errorLight: '#fb5e93',
      frame: '#e6db74',
      frameBg: '#1e1f1a',
      frameLight: '#f0e898',
      frameDark: '#b8b050',
      frameLine: '#49483e',
      frameLineDark: '#3e3d32',
      frameOuter: '#3c3a2a',
    },
  },
  {
    name: 'nord',
    label: 'Nord',
    colors: {
      primary: '#88c0d0',
      secondary: '#a3be8c',
      tertiary: '#ebcb8b',
      quaternary: '#b48ead',
      fifth: '#81a1c1',
      bg: '#2e3440',
      bgCard: '#272c36',
      bgBar: '#242933',
      bgDarker: '#1f232b',
      text: '#eceff4',
      textMuted: '#d8dee9',
      textDim: '#7b88a1',
      textDimmer: '#4c566a',
      prompt: '#a3be8c',
      error: '#bf616a',
      errorLight: '#d08770',
      frame: '#ebcb8b',
      frameBg: '#272c36',
      frameLight: '#f0d9a8',
      frameDark: '#b89e60',
      frameLine: '#4c566a',
      frameLineDark: '#3b4252',
      frameOuter: '#3b4252',
    },
  },
  {
    name: 'solarized',
    label: 'Solarized Dark',
    colors: {
      primary: '#268bd2',
      secondary: '#859900',
      tertiary: '#b58900',
      quaternary: '#d33682',
      fifth: '#6c71c4',
      bg: '#002b36',
      bgCard: '#002028',
      bgBar: '#001e26',
      bgDarker: '#00171e',
      text: '#93a1a1',
      textMuted: '#839496',
      textDim: '#586e75',
      textDimmer: '#2e4a52',
      prompt: '#859900',
      error: '#dc322f',
      errorLight: '#e8605e',
      frame: '#b58900',
      frameBg: '#002028',
      frameLight: '#d4a017',
      frameDark: '#8a6800',
      frameLine: '#2e4a52',
      frameLineDark: '#1a3a42',
      frameOuter: '#1a3a42',
    },
  },
  {
    name: 'gruvbox',
    label: 'Gruvbox',
    colors: {
      primary: '#fe8019',
      secondary: '#b8bb26',
      tertiary: '#fabd2f',
      quaternary: '#d3869b',
      fifth: '#83a598',
      bg: '#282828',
      bgCard: '#1d2021',
      bgBar: '#1a1c1d',
      bgDarker: '#171819',
      text: '#ebdbb2',
      textMuted: '#bdae93',
      textDim: '#928374',
      textDimmer: '#504945',
      prompt: '#b8bb26',
      error: '#fb4934',
      errorLight: '#fc7b6a',
      frame: '#fabd2f',
      frameBg: '#1d2021',
      frameLight: '#fcd564',
      frameDark: '#c89a1e',
      frameLine: '#504945',
      frameLineDark: '#3c3836',
      frameOuter: '#3c3836',
    },
  },
  {
    name: 'catppuccin',
    label: 'Catppuccin Mocha',
    colors: {
      primary: '#cba6f7',
      secondary: '#a6e3a1',
      tertiary: '#f9e2af',
      quaternary: '#f38ba8',
      fifth: '#89b4fa',
      bg: '#1e1e2e',
      bgCard: '#181825',
      bgBar: '#15151e',
      bgDarker: '#11111b',
      text: '#cdd6f4',
      textMuted: '#a6adc8',
      textDim: '#6c7086',
      textDimmer: '#45475a',
      prompt: '#a6e3a1',
      error: '#f38ba8',
      errorLight: '#f5a8bd',
      frame: '#f9e2af',
      frameBg: '#181825',
      frameLight: '#fbeccd',
      frameDark: '#c4b07e',
      frameLine: '#45475a',
      frameLineDark: '#313244',
      frameOuter: '#313244',
    },
  },
  {
    name: 'steelsoul',
    label: 'Steel Soul',
    secret: true,
    colors: {
      primary: '#b0b8c8',
      secondary: '#8a9bb0',
      tertiary: '#c8cdd5',
      quaternary: '#7889a0',
      fifth: '#9aa8b8',
      bg: '#08090c',
      bgCard: '#0c0d12',
      bgBar: '#0a0b10',
      bgDarker: '#060709',
      text: '#d0d4dc',
      textMuted: '#8a90a0',
      textDim: '#4a5060',
      textDimmer: '#2a2e38',
      prompt: '#b0b8c8',
      error: '#a04050',
      errorLight: '#c06070',
      frame: '#8090a8',
      frameBg: '#0c0d12',
      frameLight: '#a0aec0',
      frameDark: '#5a6878',
      frameLine: '#2a3040',
      frameLineDark: '#1a2030',
      frameOuter: '#1a2030',
    },
  },
];

// ── Apply theme to CSS variables ──────────────────────────────────────────
function applyTheme(theme: Theme) {
  const root = document.documentElement;
  const c = theme.colors;
  root.style.setProperty('--t-primary', c.primary);
  root.style.setProperty('--t-secondary', c.secondary);
  root.style.setProperty('--t-tertiary', c.tertiary);
  root.style.setProperty('--t-quaternary', c.quaternary);
  root.style.setProperty('--t-fifth', c.fifth);
  root.style.setProperty('--t-bg', c.bg);
  root.style.setProperty('--t-bg-card', c.bgCard);
  root.style.setProperty('--t-bg-bar', c.bgBar);
  root.style.setProperty('--t-bg-darker', c.bgDarker);
  root.style.setProperty('--t-text', c.text);
  root.style.setProperty('--t-text-muted', c.textMuted);
  root.style.setProperty('--t-text-dim', c.textDim);
  root.style.setProperty('--t-text-dimmer', c.textDimmer);
  root.style.setProperty('--t-prompt', c.prompt);
  root.style.setProperty('--t-error', c.error);
  root.style.setProperty('--t-error-light', c.errorLight);
  root.style.setProperty('--t-frame', c.frame);
  root.style.setProperty('--t-frame-bg', c.frameBg);
  root.style.setProperty('--t-frame-light', c.frameLight);
  root.style.setProperty('--t-frame-dark', c.frameDark);
  root.style.setProperty('--t-frame-line', c.frameLine);
  root.style.setProperty('--t-frame-line-dark', c.frameLineDark);
  root.style.setProperty('--t-frame-outer', c.frameOuter);
}

// ── Context ───────────────────────────────────────────────────────────────
const STORAGE_KEY = 'portfolio_theme';

interface ThemeCtx {
  theme: Theme;
  setTheme: (name: string) => void;
}

const ThemeContext = createContext<ThemeCtx>({
  theme: THEMES[0],
  setTheme: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return THEMES.find(t => t.name === saved) ?? THEMES[0];
  });

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  const setTheme = (name: string) => {
    const found = THEMES.find(t => t.name === name);
    if (found) {
      setThemeState(found);
      localStorage.setItem(STORAGE_KEY, name);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
