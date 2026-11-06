/**
 * The page renderer: a pure function from the release data (bundled with
 * this module) and a path to the page's HTML. It renders the application's
 * own React components to a string with React's web-stream server API,
 * which runs in Node and in a Cloudflare Worker alike, so the build and a
 * later render-on-request use the same code. Built as a separate bundle
 * (`pnpm build`, see vite.config.ts) with no Node-only import.
 */
import { StrictMode } from 'react';
import { renderToReadableStream } from 'react-dom/server';
import App from '../App';
import { repository } from '../domain/repository';
import {
  holdAsPart,
  holdParts,
  holdRecords,
  onPartsHeld,
  repository as heldRecords,
} from '../ui/records';
import {
  collectionIndex,
  indexFor,
  seedCollectionIndex,
} from '../domain/collection-index';
import {
  renderSettled,
  sameAtWidths,
  settledWidth,
  widthQueries,
} from '../ui/client';
import {
  coreOf,
  corePath,
  mapLayoutPath,
  slicePath,
  type PlacedSlice,
} from '../domain/slices';
import { readHooks, sliceOf, startTrace, tracedDataset } from './trace';
import { setReadHooks } from '../domain/memo';
import type { Dataset } from '../domain/schema';
import { memorySearchSource } from '../ui/memory-search';
import { provideSearch } from '../ui/search-source';
import { provideIslands } from '../ui/islands';
import { cellsIsland, ModelCardsCells } from '../ui/ModelCards';
import { modelCardsId } from '../reading/model-cards-page';
import { normalisePath } from '../domain/addresses';
import { pageMeta, pagePaths, siteName } from './pages';
import { pageHtml } from './page-html';
import { mapReadable, queryDataset } from '../domain/query';
import { siteFacts } from '../domain/site-facts';
import { controlTimelines, timelineCsv } from '../domain/control-timelines';
import { controlTimelines as timelinesDefinition } from '../reading/control-timelines';
import { controlTimelinesCsvPath } from '../reading/control-timelines-page';
import { propositionStances, stanceCsv } from '../domain/proposition-stances';
import { stancesCsvPath } from '../reading/proposition-stances-page';
import { propositionFrames } from '../reading/proposition-frames';
import {
  layoutKey,
  networkLayout,
  storeLayout,
  type LayoutFile,
} from '../ui/layout';

export { pageFile } from './page-html';

// Values computed once per dataset count their reads for every page.
setReadHooks(readHooks);
// The renderer holds the whole dataset and searches it in memory. A page
// drawn from slices names the collections their index entries give, as in
// the browser; the traced dataset (the whole dataset) has the whole index.
holdRecords(repository);
let index: ReturnType<typeof collectionIndex> | undefined;
const wholeIndex = () => (index ??= collectionIndex(repository.data));
onPartsHeld((data, entries) =>
  seedCollectionIndex(data, entries ?? wholeIndex()),
);
/** A slice with the collection index entries of the records it holds. */
const indexed = (slice: PlacedSlice): PlacedSlice => ({
  ...slice,
  index: indexFor(wholeIndex(), repository.data, slice),
});
provideSearch(memorySearchSource(repository));

/**
 * Files the build writes beside the pages, built from the same records as
 * the page that links to them: the control timelines' CSV and each
 * collection's stances by author. `baseUrl` is the site's address, for the
 * record links in a file read away from the site.
 */
export const pageFiles = (baseUrl: string) => [
  {
    path: controlTimelinesCsvPath,
    text: timelineCsv(
      repository.data,
      controlTimelines(repository.data, timelinesDefinition),
    ),
  },
  ...propositionFrames.map((frame) => ({
    path: stancesCsvPath(frame.id),
    text: stanceCsv(
      propositionStances(repository.data, frame),
      baseUrl.replace(/\/$/, ''),
    ),
  })),
];

/** Every path the build writes. */
export const paths = () => pagePaths(repository.data);

/**
 * Built markup the browser keeps until it has loaded what draws it
 * (src/ui/islands.ts), drawn from the whole dataset, never from the records
 * held for a page: it is no part of any page's slice. The list of every
 * cell on the Model cards page.
 */
const islands = new Map<string, string>();
provideIslands((key) => islands.get(key));
async function drawIslands(address: string) {
  if (
    islands.has(cellsIsland) ||
    normalisePath(address.split('?')[0]) !== `/compare/${modelCardsId}`
  )
    return;
  const none = () => {};
  const stream = await renderToReadableStream(
    <ModelCardsCells
      repository={repository}
      developer={null}
      selectedClaimId={null}
      onClaim={none}
      onEditions={none}
    />,
  );
  await stream.allReady;
  islands.set(cellsIsland, await new Response(stream).text());
}

async function renderApp(address: string) {
  await drawIslands(address);
  let failure: unknown = null;
  const stream = await renderToReadableStream(
    <StrictMode>
      <App address={address} />
    </StrictMode>,
    {
      onError(error) {
        failure ??= error;
      },
    },
  );
  // Wait for every page component to load, so the markup is complete.
  await stream.allReady;
  const html = await new Response(stream).text();
  if (failure) throw failure;
  return html;
}

/** The markup of the page at a path as built, within its root element. */
export const renderBody = (path: string) => renderApp(path);

/**
 * The HTML of the page at a path, or null when the path opens no page.
 * `template` is the built index.html; `baseUrl` the site's address for the
 * canonical link; `body` the page's markup, if already drawn.
 */
export async function renderPage(
  path: string,
  template: string,
  baseUrl: string | null,
  modules: string[] = [],
  body?: string,
): Promise<string | null> {
  const meta = pageMeta(repository.data, path);
  if (!meta) return null;
  return pageHtml({
    template,
    path,
    body: body ?? (await renderApp(path)),
    meta,
    baseUrl,
    modules,
    data: slicePath(path) ? [slicePath(path)!] : null,
  });
}

/**
 * The page drawn as built, and as the browser draws it once taken over on a
 * wide screen and on a phone. A page that answered no width query
 * differently at the two widths (src/ui/client.ts) is drawn once for both.
 */
async function renderBoth(path: string): Promise<Drawn> {
  const before = settledWidth();
  try {
    renderSettled(false);
    const built = await renderApp(path);
    renderSettled(1440);
    widthQueries.clear();
    const wide = await renderApp(path);
    if (sameAtWidths(1440, 390)) return { built, wide, narrow: wide };
    renderSettled(390);
    return { built, wide, narrow: await renderApp(path) };
  } finally {
    renderSettled(before);
  }
}
type Drawn = { built: string; wide: string; narrow: string };

/**
 * A page with its slice (src/prerender/trace.ts): the records drawing it
 * reads, as built and once taken over, and its title read.
 * The page is drawn again from the slice alone, as the browser holds it, and
 * the slice is refused unless both drawings are unchanged. Null for a page
 * without a slice of its own.
 */
let traced: Dataset | undefined;

export async function renderSlice(
  path: string,
  /** The page as built (`renderBody`), if already drawn. */
  built?: string,
): Promise<{
  html: Drawn;
  slice: PlacedSlice;
} | null> {
  if (!slicePath(path)) return null;
  traced ??= tracedDataset(repository.data);
  const trace = startTrace();
  // Held as a part, as the browser holds a slice: not the whole dataset.
  holdAsPart(traced);
  let html: Drawn;
  try {
    html = await renderBoth(path);
    // The browser reads a page's title (src/Workspace.tsx), not its
    // description.
    void pageMeta(traced, path)?.title;
  } finally {
    holdRecords(repository);
  }
  // The traced drawing is the page as built: tracing changes no output.
  if (built === undefined) {
    const before = settledWidth();
    renderSettled(false);
    built = await renderApp(path).finally(() => renderSettled(before));
  }
  if (built !== html.built)
    throw new Error(`${path}: drawn differently while traced`);
  // The smallest slice that draws the page as built: the records read; or
  // those with their neighbourhood; or, for a page that counts or draws
  // records it does not name, the records read held with the whole
  // relation core (src/prerender/trace.ts). A part of the dataset can also
  // make the drawing fail.
  for (const form of ['alone', 'near'] as const) {
    const slice = indexed(sliceOf(repository.data, trace, form));
    if (await checkSlice(path, slice, html).catch(() => false))
      return { html, slice };
  }
  return { html, slice: indexed(sliceOf(repository.data, trace, 'core')) };
}

/**
 * Whether a page drawn from a slice, as built and once taken over, matches
 * its drawing with the whole dataset, and its title read from the slice
 * (which the browser sets when a link opens the page, src/Workspace.tsx)
 * matches the title read from the whole dataset. The slice is held alone,
 * or with the relation core when it, or another slice held, says it needs
 * it, as the browser holds them (src/ui/records.ts).
 */
export async function checkSlice(
  path: string,
  slice: PlacedSlice,
  html: Drawn,
  /** Other pages' slices held as well, as after reading them in one visit. */
  others: Record<string, PlacedSlice> = {},
) {
  const parts = { ...others, [path]: slice };
  const withCore = Object.values(parts).some((p) => p.core);
  holdRecords(null);
  holdParts(withCore ? { [corePath]: core(), ...parts } : parts);
  try {
    const title = pageMeta(heldRecords.data, path)?.title;
    if (title === undefined || title !== pageMeta(repository.data, path)?.title)
      return false;
    const drawn = await renderBoth(path);
    return (
      drawn.built === html.built &&
      drawn.wide === html.wide &&
      drawn.narrow === html.narrow
    );
  } finally {
    holdRecords(repository);
  }
}

/** The part every page drawn from slices holds (src/domain/slices.ts). */
let held: ReturnType<typeof coreOf> | undefined;
export const core = () => (held ??= coreOf(repository.data));

let latestYear: number | undefined;

/**
 * The layout of the map centred on the record a dossier or person page is
 * about, as that page draws it (src/ui/map-layout.ts), and where it is
 * written; null for other pages. The map's records are chosen as the pages
 * choose them: a dossier's map with the explorer's default year
 * (src/Workspace.tsx), a person's map with every year
 * (src/ui/PersonPage.tsx). A map too large to draw has no layout; its file
 * is written all the same, so that a browser asking for it finds it.
 */
export function mapLayouts(
  path: string,
): { file: string; layouts: LayoutFile } | null {
  const [, kind, id, rest] = path.split('/');
  if ((kind !== 'dossier' && kind !== 'person') || !id || rest !== undefined)
    return null;
  const entity = repository.entities.get(id);
  const file = entity && mapLayoutPath(entity);
  if (!file) return null;
  latestYear ??= siteFacts(repository.data).years[0];
  const view = queryDataset(repository.data, {
    topic: 'all',
    throughYear: kind === 'dossier' ? latestYear : 9999,
    entityType: 'all',
    focusId: id,
  });
  const { anchors } = repository.data.meta;
  return {
    file,
    layouts: {
      version: core().version!,
      layouts: mapReadable(view, true)
        ? [
            storeLayout(
              layoutKey(view.entities, view.claims, anchors, id),
              networkLayout(view.entities, view.claims, anchors, id),
            ),
          ]
        : [],
    },
  };
}

/** The not-found page, sent for any path the site does not have. */
export async function renderNotFound(template: string) {
  return pageHtml({
    template,
    path: null,
    body: await renderApp('/not-found'),
    meta: {
      title: `Page not found · ${siteName}`,
      description: 'This address does not match any page or record.',
    },
    baseUrl: null,
  });
}
