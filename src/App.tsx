import { Suspense, useCallback, useEffect, useMemo, useState } from 'react';
import summary from 'virtual:landing-summary';
import { normalisePath, startPath } from './domain/addresses';
import { mapLayoutPath } from './domain/slices';
import { Landing } from './ui/Landing';
import { currentAddress } from './ui/location';
import { useInBrowser, useMediaQuery } from './ui/client';
import { loadable, pages, preloadPage } from './ui/page-modules';
import { loadData, loadRecords } from './ui/records';
import { searchSource } from './ui/search-source';
import { provideVisits } from './ui/page-visits';
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
    // With the code and data of the page the browser opened at, so that a
    // built page is taken over at once (src/ui/page-modules.tsx).
    typeof window === 'undefined'
      ? null
      : preloadPage(window.location.pathname),
    typeof window === 'undefined' ? null : preloadData(currentAddress()),
    typeof window === 'undefined' ? null : prefetchMap(currentAddress()),
  ]).then(([module]) => module.default),
);

/**
 * An address that opens a map (a dossier's map, a search's map in the
 * explorer) fetches the map's code, and the dossier's stored layout or the
 * worker that lays out a search's map (src/ui/map-layout.ts), with the
 * page's own code and data rather than after them, so that the map is drawn
 * soon after the page runs. Nothing waits for them.
 */
function prefetchMap(address: string) {
  const url = new URL(address, 'https://site.invalid');
  const [, kind, id, rest] = normalisePath(url.pathname).split('/');
  const hash = new URLSearchParams(url.hash.slice(1));
  const dossier =
    kind === 'dossier' &&
    !!id &&
    rest === undefined &&
    url.searchParams.get('view') === 'map';
  const search =
    kind === 'explore' &&
    !id &&
    !!hash.get('q')?.trim() &&
    hash.get('view') === 'map';
  if (!dossier && !search) return null;
  void pages.Network.preload();
  void import('./ui/map-layout').then((m) =>
    dossier
      ? m.prefetchLayout(
          mapLayoutPath({ id: decodeURIComponent(id), type: 'organisation' })!,
        )
      : m.startWorker(),
  );
  return null;
}

/**
 * The data a page needs before it is drawn: its slice, or the records, and
 * on the search page its filters and the index's manifest
 * (src/ui/records.ts, src/ui/search-source.ts).
 */
function preloadData(address: string) {
  // Slices serve a built page taken over at its own address; anything else
  // (the start page's links, an address with no built page, the development
  // server) opens with the whole records, as it did before.
  const builtPage =
    document.getElementById('root')?.dataset.path ===
    normalisePath(window.location.pathname);
  return Promise.all([
    builtPage ? loadData(address) : loadRecords(),
    normalisePath(address.split(/[?#]/)[0]) === '/search'
      ? searchSource().facets()
      : null,
  ]);
}
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
  /**
   * The path the workspace was mounted at, and how many times: a link from a
   * page drawn from its slice mounts it afresh at the next page's path, as a
   * fresh load of that address does (src/ui/page-visits.ts).
   */
  const [mounted, setMounted] = useState({ path: address, count: 0 });
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
  useEffect(() => {
    provideVisits((path) => {
      setStart(null);
      setMounted((m) => ({ path, count: m.count + 1 }));
    });
    return () => provideVisits(null);
  }, []);
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
        target === 'search' || target === 'explore' || target === 'about'
          ? { kind: target }
          : { kind: 'hub', id: target },
      );
    },
    [go],
  );
  const howChecked = useCallback(() => go({ kind: 'how-checked' }), [go]);
  const search = useCallback(
    (q: string) => go({ kind: 'search', q: q || undefined }),
    [go],
  );
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
              onSearch={search}
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
          key={mounted.count}
          address={mounted.path}
          theme={theme}
          onTheme={setTheme}
          start={start}
          onShown={setWorkspaceShown}
        />
      </Suspense>
    ),
    [mounted, theme, setTheme, start, navigate, search, howChecked],
  );
  if (open) return workspace;
  return (
    <>
      <SkipLink target="start" label="Skip to content" />
      <SiteHeader
        current="home"
        onNavigate={navigate}
        onSearch={search}
        theme={theme}
        onTheme={setTheme}
        onHowChecked={howChecked}
      />
      <Landing summary={summary} onAction={go} />
      <SiteFooter onAbout={() => go({ kind: 'about' })} />
    </>
  );
}
