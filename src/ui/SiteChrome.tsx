import { releaseVersion } from 'virtual:site';

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
  | { kind: 'commitments' }
  | { kind: 'propositions'; id: string }
  | { kind: 'control'; id: string }
  | { kind: 'reading' }
  | { kind: 'question'; id: string }
  | { kind: 'dossier'; id: string }
  | { kind: 'person'; id: string }
  | { kind: 'claim'; id: string }
  | { kind: 'search'; q?: string }
  | { kind: 'about' }
  | { kind: 'how-checked' };

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
    <button
      onClick={() => onNavigate(target)}
      aria-current={current === target ? 'page' : undefined}
    >
      {label}
    </button>
  );
  return (
    <header className="site-banner">
      <div className="site-header">
        <button
          className="wordmark"
          onClick={() => onNavigate('home')}
          aria-label="Selekoa start page"
        >
          selekoa<span aria-hidden="true">.</span>
        </button>
        <div className="header-rule" aria-hidden="true" />
        <p>A documentary history of machine intelligence.</p>
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
        <button className="text-button" onClick={onHowChecked}>
          What this means →
        </button>
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
      <button className="text-button" onClick={onAbout}>
        About & method
      </button>
    </footer>
  );
}
