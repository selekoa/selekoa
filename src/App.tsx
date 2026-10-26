import { lazy, Suspense, useEffect, useState } from 'react';
import summary from 'virtual:landing-summary';
import { Landing } from './ui/Landing';
import {
  SiteFooter,
  SiteHeader,
  SkipLink,
  type NavTarget,
  type StartAction,
} from './ui/SiteChrome';

/**
 * The start page renders from a small precomputed summary. The records and
 * every other page load with the workspace, which a link opens; pointing at
 * or focusing a link starts the download early.
 */
const loadWorkspace = () => import('./Workspace');
const Workspace = lazy(loadWorkspace);

type Theme = 'light' | 'dark';
const darkQuery = '(prefers-color-scheme: dark)';

/** The one item Selekoa stores in the browser: the reader's explicit choice. */
const themeKey = 'selekoa-theme';

function storedTheme(): Theme | null {
  try {
    const value = window.localStorage.getItem(themeKey);
    return value === 'light' || value === 'dark' ? value : null;
  } catch {
    return null;
  }
}

/**
 * The reader's system setting decides the theme, and follows it when it
 * changes, until they press the toggle. Their choice is stored in the
 * browser's local storage and never leaves the device; without storage it
 * lasts for this visit.
 */
function useTheme(): [Theme, (theme: Theme) => void] {
  const [chosen, setChosen] = useState<Theme | null>(storedTheme);
  const [system, setSystem] = useState<Theme>(() =>
    window.matchMedia?.(darkQuery).matches ? 'dark' : 'light',
  );
  useEffect(() => {
    const query = window.matchMedia?.(darkQuery);
    if (!query) return;
    const follow = () => setSystem(query.matches ? 'dark' : 'light');
    query.addEventListener('change', follow);
    return () => query.removeEventListener('change', follow);
  }, []);
  const theme = chosen ?? system;
  useEffect(() => {
    document.documentElement.dataset.selekoaTheme = theme;
  }, [theme]);
  const choose = (next: Theme) => {
    setChosen(next);
    try {
      window.localStorage.setItem(themeKey, next);
    } catch {
      // Storage can be blocked or full; the choice still holds for this visit.
    }
  };
  return [theme, choose];
}

const isStartAddress = (hash: string) => !hash || hash === '#/';

export default function App() {
  const [theme, setTheme] = useTheme();
  // Any address other than the start page needs the records at once.
  const [open, setOpen] = useState(() => !isStartAddress(window.location.hash));
  const [start, setStart] = useState<StartAction | null>(null);
  useEffect(() => {
    if (open) return;
    const follow = () => {
      if (!isStartAddress(window.location.hash)) setOpen(true);
    };
    const prefetch = (event: Event) => {
      if ((event.target as Element | null)?.closest?.('button, a'))
        void loadWorkspace();
    };
    window.addEventListener('hashchange', follow);
    document.addEventListener('pointerover', prefetch);
    document.addEventListener('focusin', prefetch);
    return () => {
      window.removeEventListener('hashchange', follow);
      document.removeEventListener('pointerover', prefetch);
      document.removeEventListener('focusin', prefetch);
    };
  }, [open]);
  const go = (action: StartAction) => {
    setStart(action);
    setOpen(true);
  };
  const navigate = (target: NavTarget) => {
    if (target === 'home') {
      setStart(null);
      window.scrollTo(0, 0);
      return;
    }
    go(
      target === 'search' || target === 'about'
        ? { kind: target }
        : { kind: 'hub', id: target },
    );
  };
  const header = (current: NavTarget | null) => (
    <SiteHeader
      current={current}
      onNavigate={navigate}
      theme={theme}
      onTheme={setTheme}
      onHowChecked={() => go({ kind: 'how-checked' })}
    />
  );
  if (open)
    return (
      <Suspense
        fallback={
          <>
            {header(null)}
            <main className="page-loading" id="loading" tabIndex={-1}>
              <p role="status">Loading the records…</p>
            </main>
          </>
        }
      >
        <Workspace theme={theme} onTheme={setTheme} start={start} />
      </Suspense>
    );
  return (
    <>
      <SkipLink target="start" label="Skip to content" />
      {header('home')}
      <Landing summary={summary} onAction={go} />
      <SiteFooter onAbout={() => go({ kind: 'about' })} />
    </>
  );
}
