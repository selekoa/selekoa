import { Suspense, useCallback, useEffect, useMemo, useState } from 'react';
import summary from 'virtual:landing-summary';
import { normalisePath, startPath } from './domain/addresses';
import { Landing } from './ui/Landing';
import { currentAddress } from './ui/location';
import { useInBrowser, useMediaQuery } from './ui/client';
import { loadable, preloadPage } from './ui/page-modules';
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
const Workspace = loadable(() =>
  Promise.all([
    import('./Workspace'),
    // With the code of the page the browser opened at, so that a built page
    // is taken over at once (src/ui/page-modules.tsx).
    typeof window === 'undefined'
      ? null
      : preloadPage(window.location.pathname),
  ]).then(([module]) => module.default),
);
const loadWorkspace = Workspace.preload;

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
 *
 * A built page is rendered without either setting, in the light theme, and
 * keeps it until the browser has taken the page over (`shown`): a change
 * passed into a page still being taken over would make React draw it afresh.
 * The colours follow the reader's setting from the start, through CSS and
 * the page's inline script (index.html).
 */
function useTheme(shown: boolean): [Theme, (theme: Theme) => void] {
  const system: Theme = useMediaQuery(darkQuery, false) ? 'dark' : 'light';
  /** The reader's choice in this visit; undefined until they make one. */
  const [chosen, setChosen] = useState<Theme | undefined>(undefined);
  const theme = shown ? (chosen ?? storedTheme() ?? system) : 'light';
  useEffect(() => {
    if (shown) document.documentElement.dataset.selekoaTheme = theme;
  }, [theme, shown]);
  const choose = useCallback((next: Theme) => {
    setChosen(next);
    try {
      window.localStorage.setItem(themeKey, next);
    } catch {
      // Storage can be blocked or full; the choice still holds for this visit.
    }
  }, []);
  return [theme, choose];
}

const isStartAddress = (address: string) =>
  normalisePath(address.split(/[?#]/)[0]) === startPath;

export default function App({
  address,
}: {
  /** The address the page opens at: the browser's, or the one pre-rendered. */
  address: string;
}) {
  // Any address other than the start page needs the records at once.
  const [open, setOpen] = useState(() => !isStartAddress(address));
  /** Whether the page in view runs in the browser (see useTheme). */
  const [workspaceShown, setWorkspaceShown] = useState(false);
  const landingShown = useInBrowser();
  const shown = open ? workspaceShown : landingShown;
  const [theme, setTheme] = useTheme(shown);
  // Releases the clicks held while a built page was taken over (main.tsx).
  // The marker on <html> lets tests wait for it.
  useEffect(() => {
    if (!shown) return;
    document.documentElement.dataset.selekoaReady = '';
    window.dispatchEvent(new Event('selekoa:shown'));
  }, [shown]);
  const [start, setStart] = useState<StartAction | null>(null);
  useEffect(() => {
    if (open) return;
    const follow = () => {
      if (!isStartAddress(currentAddress())) setOpen(true);
    };
    const prefetch = (event: Event) => {
      if ((event.target as Element | null)?.closest?.('button, a'))
        void loadWorkspace();
    };
    window.addEventListener('popstate', follow);
    document.addEventListener('pointerover', prefetch);
    document.addEventListener('focusin', prefetch);
    return () => {
      window.removeEventListener('popstate', follow);
      document.removeEventListener('pointerover', prefetch);
      document.removeEventListener('focusin', prefetch);
    };
  }, [open]);
  // Set state only, so the same functions serve every render.
  const go = useCallback((action: StartAction) => {
    setStart(action);
    setOpen(true);
  }, []);
  const navigate = useCallback(
    (target: NavTarget) => {
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
    },
    [go],
  );
  const howChecked = useCallback(() => go({ kind: 'how-checked' }), [go]);
  // The same element while nothing it shows has changed, so React leaves a
  // page that is still being taken over alone.
  const workspace = useMemo(
    () => (
      <Suspense
        fallback={
          <>
            <SiteHeader
              current={null}
              onNavigate={navigate}
              theme={theme}
              onTheme={setTheme}
              onHowChecked={howChecked}
            />
            <main className="page-loading" id="loading" tabIndex={-1}>
              <p role="status">Loading the records…</p>
            </main>
          </>
        }
      >
        <Workspace
          address={address}
          theme={theme}
          onTheme={setTheme}
          start={start}
          onShown={setWorkspaceShown}
        />
      </Suspense>
    ),
    [address, theme, setTheme, start, navigate, howChecked],
  );
  if (open) return workspace;
  return (
    <>
      <SkipLink target="start" label="Skip to content" />
      <SiteHeader
        current="home"
        onNavigate={navigate}
        theme={theme}
        onTheme={setTheme}
        onHowChecked={howChecked}
      />
      <Landing summary={summary} onAction={go} />
      <SiteFooter onAbout={() => go({ kind: 'about' })} />
    </>
  );
}
