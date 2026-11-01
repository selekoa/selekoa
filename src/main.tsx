import { StrictMode } from 'react';
import type { Dataset } from './domain/schema';
import type { CollectionIndex } from './domain/collection-index';
import { createRoot, hydrateRoot } from 'react-dom/client';
import App from './App';
import { legacyHashPath, normalisePath } from './domain/addresses';
import { currentAddress } from './ui/location';
import {
  onPartsHeld,
  provideParts,
  provideRecords,
  repositoryOf,
} from './ui/records';
import { corePath } from './domain/slices';
import facts from 'virtual:site-facts';
import { indexSearchSource, provideSearch } from './ui/search-source';
// Every stylesheet loads with the first page, in the order the pages were
// written against; page code loads separately when a page first opens.
import './tokens.css';
import './ui/research-path.css';
import './ui/record-pages.css';
import './ui/reading-first.css';
import './ui/control-commitments.css';
import './ui/about.css';
import './styles.css';

// The records chunk loads when a page needs it; search reads the static
// index the build writes, file by file (docs/data-loading-design-c.md).
// The whole records are the relation core and the rest of every record,
// put together; the build has validated them (docs/data-loading-design-c.md).
provideRecords(() =>
  Promise.all([
    import('virtual:records-core'),
    import('virtual:records-content'),
    import('./domain/slices'),
  ]).then(([core, content, slices]) =>
    repositoryOf(slices.assemble(core.default, content.default)),
  ),
);
// A page drawn from its slice holds the collection index entries of the
// records its parts hold, which each slice carries, and the relation core
// when its slice says so (src/domain/slices.ts,
// src/domain/collection-index.ts); the entries are given to every set of
// parts. The code that gives them loads with the first part, not on pages
// that hold none (the start page, search).
let indexing: Promise<typeof import('./domain/collection-index')> | undefined;
const index = () => (indexing ??= import('./domain/collection-index'));
let seed: ((data: Dataset, index: CollectionIndex) => void) | undefined;
const noEntries: CollectionIndex = {
  byClaim: [],
  collections: [],
  marks: [],
  chronicle: { years: [], scheduled: [], statedBy: [] },
};
onPartsHeld((data, entries) => seed?.(data, entries ?? noEntries));
provideParts(async (url) => {
  const [part, code] = await Promise.all([
    url === corePath
      ? import('virtual:records-core').then((m) => m.default)
      : fetch(url).then((response) => {
          if (!response.ok) throw new Error(`${url}: ${response.status}`);
          return response.json();
        }),
    index(),
  ]);
  // A part of the records another build was made with (a tab kept open
  // across a deploy) cannot be drawn with this build's code and records.
  if (part.version !== facts.version)
    throw new Error(`${url} is from another version of the records`);
  seed = code.seedCollectionIndex;
  return part;
});
provideSearch(
  indexSearchSource(() =>
    Promise.all([
      import('virtual:search-index'),
      import('./domain/search-index'),
    ]).then(([index, engine]) => ({
      ...index,
      search: engine.searchIndexFiles,
    })),
  ),
);

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
      'button, summary, a[data-claim-link]',
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
