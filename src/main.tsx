import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import App from './App';
import { legacyHashPath, normalisePath } from './domain/addresses';
import { currentAddress } from './ui/location';
// Every stylesheet loads with the first page, in the order the pages were
// written against; page code loads separately when a page first opens.
import './tokens.css';
import './ui/research-path.css';
import './ui/record-pages.css';
import './ui/reading-first.css';
import './ui/control-commitments.css';
import './ui/about.css';
import './styles.css';

// An earlier hash address (#/person/x, #explorer) moves to its path, in place,
// whether the page opens at it or it is followed from an open page.
const legacy = legacyHashPath(window.location.hash);
if (legacy !== null) window.history.replaceState(null, '', legacy);
window.addEventListener('hashchange', () => {
  const path = legacyHashPath(window.location.hash);
  if (path === null) return;
  window.history.replaceState(null, '', path);
  window.dispatchEvent(new PopStateEvent('popstate'));
});

const root = document.getElementById('root')!;
const app = (address: string) => (
  <StrictMode>
    <App address={address} />
  </StrictMode>
);
// A page built for this path takes over its own HTML, rendered as it was
// built (the path alone); the workspace then applies the query, such as an
// inspected claim. Any other page (the start page reached by an earlier hash
// address, the not-found page, or the development server's empty page) is
// drawn afresh.
const path = normalisePath(window.location.pathname);
if (root.dataset.path === path) {
  holdClicks();
  hydrateRoot(root, app(path));
} else createRoot(root).render(app(currentAddress()));

/**
 * A button or disclosure summary pressed on a built page before the page
 * runs in the browser is held and pressed again once it does (App sends `selekoa:shown`). The
 * browser keeps the built elements, so the same button receives it. Links
 * need no help: they open the built page they name.
 */
function holdClicks() {
  const held: HTMLElement[] = [];
  const hold = (event: MouseEvent) => {
    const button = (event.target as Element | null)?.closest?.<HTMLElement>(
      'button, summary',
    );
    if (!button || !root.contains(button)) return;
    event.preventDefault();
    event.stopPropagation();
    held.push(button);
  };
  document.addEventListener('click', hold, true);
  window.addEventListener(
    'selekoa:shown',
    () => {
      document.removeEventListener('click', hold, true);
      for (const button of held.splice(0))
        if (button.isConnected) button.click();
    },
    { once: true },
  );
}
