import { releaseVersion } from 'virtual:site';
import { referencePath } from '../domain/addresses';
import { NavLink } from './NavLink';

/** Pages the primary navigation opens. The wordmark opens the start page. */
export type NavTarget =
  'home' | 'governance' | 'ideas' | 'institutions' | 'search' | 'about';

/**
 * What a start-page link asks the full application to open. The start page
 * renders before the records load, so its links are carried over as actions.
 */
export type StartAction =
  | { kind: 'hub'; id: 'governance' | 'ideas' | 'institutions' }
  | { kind: 'documents' }
  | { kind: 'compare'; id: string }
  | { kind: 'commitments' }
  | { kind: 'propositions'; id: string }
  | { kind: 'control'; id: string }
  | { kind: 'reading' }
  | { kind: 'question'; id: string }
  | { kind: 'dossier'; id: string; view?: 'map' }
  | { kind: 'person'; id: string }
  | { kind: 'claim'; id: string }
  | { kind: 'search'; q?: string }
  | { kind: 'about' }
  | { kind: 'how-checked' }
  | { kind: 'not-covered' };

/** The address of each primary navigation item. */
export const navHref: Record<NavTarget, string> = {
  home: '/',
  governance: '/governance',
  ideas: '/ideas',
  institutions: '/institutions',
  search: '/search',
  about: '/about',
};

/** The ids a start-page action needs that the action itself leaves out. */
type StartIds = {
  history: { id: string };
  commitments: { id: string };
  reading: { id: string };
};

/** The address a start-page action opens, so that it can be a real link. */
export function startHref(action: StartAction, ids: StartIds): string {
  switch (action.kind) {
    case 'hub':
      return referencePath({ kind: 'hub', id: action.id });
    case 'documents':
      return referencePath({ kind: 'documents', id: ids.history.id });
    case 'commitments':
      return referencePath({ kind: 'commitments', id: ids.commitments.id });
    case 'reading':
      return referencePath({ kind: 'question', id: ids.reading.id });
    case 'search':
      return referencePath({ kind: 'search', q: action.q });
    case 'about':
    case 'how-checked':
    case 'not-covered':
      return referencePath({ kind: 'about' });
    default:
      return referencePath(action);
  }
}

export function SkipLink({ target, label }: { target: string; label: string }) {
  return (
    <a
      className="skip-link"
      href={'#' + target}
      onClick={(event) => {
        event.preventDefault();
        document.getElementById(target)?.focus();
      }}
    >
      {label}
    </a>
  );
}

export function SiteHeader({
  current,
  onNavigate,
  theme,
  onTheme,
  onHowChecked,
}: {
  current: NavTarget | null;
  onNavigate: (target: NavTarget) => void;
  theme: 'light' | 'dark';
  onTheme: (theme: 'light' | 'dark') => void;
  /** Opens “How this was checked” on the About & method page. */
  onHowChecked: () => void;
}) {
  const item = (target: NavTarget, label: string) => (
    <NavLink
      href={navHref[target]}
      onOpen={() => onNavigate(target)}
      aria-current={current === target ? 'page' : undefined}
    >
      {label}
    </NavLink>
  );
  return (
    <header className="site-banner">
      <div className="site-header">
        <NavLink
          className="wordmark"
          href={navHref.home}
          onOpen={() => onNavigate('home')}
          aria-label="Selekoa start page"
        >
          selekoa<span aria-hidden="true">.</span>
        </NavLink>
        {/* The start page's own heading carries the tagline. */}
        {current !== 'home' && (
          <>
            <div className="header-rule" aria-hidden="true" />
            <p>A documentary history of machine intelligence.</p>
          </>
        )}
        <nav className="header-nav" aria-label="Primary">
          {item('governance', 'Governance')}
          {item('ideas', 'Ideas & debates')}
          {item('institutions', 'Institutions & people')}
          {item('search', 'Search')}
          {item('about', 'About & method')}
        </nav>
        <div className="header-actions">
          <button
            className="theme-toggle"
            aria-pressed={theme === 'dark'}
            onClick={() => onTheme(theme === 'light' ? 'dark' : 'light')}
          >
            Dark mode
          </button>
        </div>
      </div>
      {/* The dataset's review status, stated once for every page. Each
          record states its own status in the Evidence Inspector. */}
      <p className="site-status">
        Records found and checked by machines, not reviewed by an editor ·{' '}
        <NavLink
          className="text-button"
          href={navHref.about}
          onOpen={onHowChecked}
        >
          What this means →
        </NavLink>
      </p>
    </header>
  );
}

export function SiteFooter({ onAbout }: { onAbout: () => void }) {
  return (
    <footer className="site-footer">
      <span>
        Selekoa · research preview
        {releaseVersion && ` · dataset release v${releaseVersion}`}
      </span>
      <span>Exploratory records, checked by machines.</span>
      <NavLink className="text-button" href={navHref.about} onOpen={onAbout}>
        About & method
      </NavLink>
    </footer>
  );
}
