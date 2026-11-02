import { useRef, useState } from 'react';
import { contact, releaseVersion } from 'virtual:site';
import { referencePath } from '../domain/addresses';
import { NavLink } from './NavLink';

/** Pages the primary navigation opens. The wordmark opens the start page. */
export type NavTarget =
  | 'home'
  | 'governance'
  | 'ideas'
  | 'institutions'
  | 'search'
  | 'explore'
  | 'about';

/**
 * What a start-page link asks the full application to open. The start page
 * renders before the records load, so its links are carried over as actions.
 */
export type StartAction =
  | { kind: 'hub'; id: 'governance' | 'ideas' | 'institutions' }
  | { kind: 'documents' }
  /** The framework comparison, or one of its questions (facet). */
  | { kind: 'compare'; id: string; facet?: string }
  | { kind: 'commitments' }
  | { kind: 'guide'; id: string }
  | { kind: 'propositions'; id: string }
  /** Propositions by author, at the first author with one of these keys. */
  | { kind: 'stances'; id?: string; authors?: string[] }
  | { kind: 'years' }
  | { kind: 'control'; id: string }
  | { kind: 'reading' }
  | { kind: 'question'; id: string }
  | { kind: 'dossier'; id: string; view?: 'map' }
  | { kind: 'person'; id: string }
  | { kind: 'claim'; id: string }
  | { kind: 'search'; q?: string }
  | { kind: 'explore' }
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
  explore: '/explore',
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
    case 'how-checked':
      return referencePath({ kind: 'about' }) + '#about-built';
    case 'about':
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

/** A magnifying glass, drawn in the text colour. */
const searchIcon = (
  <svg
    aria-hidden="true"
    focusable="false"
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
  >
    <circle cx="6.75" cy="6.75" r="4.75" />
    <path d="M10.25 10.25 14 14" strokeLinecap="round" />
  </svg>
);

export function SiteHeader({
  current,
  onNavigate,
  onSearch,
  theme,
  onTheme,
  onHowChecked,
}: {
  current: NavTarget | null;
  onNavigate: (target: NavTarget) => void;
  /** Opens the search page with these terms. */
  onSearch: (query: string) => void;
  theme: 'light' | 'dark';
  onTheme: (theme: 'light' | 'dark') => void;
  /** Opens “How this was built” on the About & method page. */
  onHowChecked: () => void;
}) {
  // On a phone the search field opens from an icon; wider screens show it.
  const [searchOpen, setSearchOpen] = useState(false);
  const fieldRef = useRef<HTMLInputElement>(null);
  const toggleRef = useRef<HTMLAnchorElement>(null);
  const toggleSearch = () => {
    const open = !searchOpen;
    setSearchOpen(open);
    if (open) requestAnimationFrame(() => fieldRef.current?.focus());
  };
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
          {item('about', 'About & method')}
          {item('explore', 'Explore the records')}
        </nav>
        {/* The search page has its own field, so the header leaves it out
            there. Without scripts the form asks for /search?q=…, which the
            search page moves to its fragment address once it runs. */}
        {current !== 'search' && (
          <form
            className={`header-search${searchOpen ? ' is-open' : ''}`}
            id="site-search"
            role="search"
            aria-label="Site"
            action={navHref.search}
            method="get"
            onSubmit={(event) => {
              event.preventDefault();
              const form = event.currentTarget;
              const query = String(new FormData(form).get('q') ?? '').trim();
              form.reset();
              setSearchOpen(false);
              onSearch(query);
            }}
          >
            <input
              ref={fieldRef}
              type="search"
              name="q"
              aria-label="Search the records"
              placeholder="Search"
              autoComplete="off"
              enterKeyHint="search"
              onKeyDown={(event) => {
                if (event.key !== 'Escape' || !searchOpen) return;
                setSearchOpen(false);
                toggleRef.current?.focus();
              }}
            />
            <button type="submit" aria-label="Submit search">
              {searchIcon}
            </button>
          </form>
        )}
        <div className="header-actions">
          {/* A link to the search page until the page runs in the browser. */}
          {current !== 'search' && (
            <a
              ref={toggleRef}
              className="header-search-toggle"
              href={navHref.search}
              role="button"
              aria-label="Search"
              aria-expanded={searchOpen}
              aria-controls="site-search"
              onClick={(event) => {
                if (
                  event.button !== 0 ||
                  event.metaKey ||
                  event.ctrlKey ||
                  event.shiftKey ||
                  event.altKey
                )
                  return;
                event.preventDefault();
                toggleSearch();
              }}
              onKeyDown={(event) => {
                if (event.key !== ' ') return;
                event.preventDefault();
                toggleSearch();
              }}
            >
              {searchIcon}
            </a>
          )}
          <button
            className="theme-toggle"
            aria-pressed={theme === 'dark'}
            onClick={() => onTheme(theme === 'light' ? 'dark' : 'light')}
          >
            Dark mode
          </button>
        </div>
      </div>
      {/* How the records are made, stated once for every page; About says
          more. Each record states its own checks in the Evidence Inspector. */}
      <p className="site-status">
        Found and cross-checked by machines ·{' '}
        <NavLink
          className="text-button"
          // The section the link's handler opens, so that the page opened
          // from its slice, or without scripts, opens there too.
          href={`${navHref.about}#about-built`}
          onOpen={onHowChecked}
        >
          How this works →
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
      <span>Found and cross-checked by machines.</span>
      {contact && (
        <span>
          Corrections and suggestions:{' '}
          <a href={`mailto:${contact}`}>{contact}</a>
        </span>
      )}
      <NavLink className="text-button" href={navHref.about} onOpen={onAbout}>
        About & method
      </NavLink>
    </footer>
  );
}
