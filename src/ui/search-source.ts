/**
 * Where the search page's facets and results come from. The page renderer
 * and tests search the whole dataset in memory; the browser searches the
 * static index the build writes (src/domain/search-index.ts), loading only
 * the files a query needs. Both give the same results.
 */
import type { Repository } from '../domain/repository';
import type { SearchResults } from '../domain/search';
import type {
  IndexFilters,
  IndexLoader,
  IndexManifest,
  searchIndexFiles,
} from '../domain/search-index';
import type { Dataset } from '../domain/schema';
import { repositoryOf } from './records';
import type { SearchFacets } from './search-facets';
import { settled, track, type Tracked } from './tracked';

export type SearchRequest = { query: string; filters: IndexFilters };

export type SearchOutcome = {
  results: SearchResults;
  /** The records the results show, with at least the fields shown. */
  repository: Repository;
  /** The index could not be loaded; the request is tried again next time. */
  failed?: boolean;
};

export type SearchSource = {
  facets: () => Tracked<SearchFacets>;
  /** The same promise for the same request, so that `use` reads it at once. */
  search: (request: SearchRequest) => Tracked<SearchOutcome>;
};

export const requestKey = ({ query, filters }: SearchRequest) =>
  JSON.stringify([query, Object.entries(filters).sort()]);

/** Keeps the latest requests' promises; older ones are fetched again. */
export function cached(
  make: (request: SearchRequest) => Tracked<SearchOutcome>,
) {
  const held = new Map<string, Tracked<SearchOutcome>>();
  return (request: SearchRequest) => {
    const k = requestKey(request);
    let found = held.get(k);
    if (!found) {
      found = make(request);
      held.set(k, found);
      const made = found;
      void made.then((outcome) => {
        if (outcome.failed && held.get(k) === made) held.delete(k);
      });
      if (held.size > 64) held.delete(held.keys().next().value!);
    }
    return found;
  };
}

/**
 * The static index as the build writes it (virtual:search-index), with the
 * search over it, both loaded when the search page opens.
 */
export type IndexModule = {
  manifest: IndexManifest;
  facets: SearchFacets;
  load: IndexLoader;
  search: typeof searchIndexFiles;
};

/** Search over the static index; each file is loaded once. */
export function indexSearchSource(
  open: () => Promise<IndexModule>,
): SearchSource {
  let module: Tracked<IndexModule> | undefined;
  const opened = () =>
    (module ??= track(
      open().catch((error: unknown) => {
        module = undefined;
        throw error;
      }),
    ));
  let facets: Tracked<SearchFacets> | undefined;
  const once = <T>(load: (i: number) => Promise<T>) => {
    const loaded = new Map<number, Promise<T>>();
    return (i: number) => {
      let found = loaded.get(i);
      if (!found) {
        found = load(i);
        loaded.set(i, found);
        // A failed load is tried again next time.
        found.catch(() => loaded.delete(i));
      }
      return found;
    };
  };
  let loader: IndexLoader | undefined;
  return {
    facets: () => (facets ??= track(opened().then((m) => m.facets))),
    search: cached((request) => {
      // No query: nothing to look up, and the built page shows no results.
      if (!request.query.trim())
        return settled({
          results: { terms: [], total: 0, groups: [] },
          repository: repositoryOf(emptyData),
        });
      return track(
        opened()
          .then(async (m) => {
            loader ??= {
              postings: once(m.load.postings),
              chunk: once(m.load.chunk),
              collection: once(m.load.collection),
              organisation: once(m.load.organisation),
            };
            const { results, shown } = await m.search(
              m.manifest,
              loader,
              request.query,
              request.filters,
            );
            return {
              results,
              repository: repositoryOf({
                ...emptyData,
                ...(shown as unknown as Omit<Dataset, 'meta'>),
              }),
            };
          })
          .catch((error: unknown) => {
            // Offline, or an index file gone after a deploy: say so, and
            // look the query up again when it is asked again.
            console.error('Search could not load the index', error);
            return {
              results: { terms: [], total: 0, groups: [] },
              repository: repositoryOf(emptyData),
              failed: true,
            };
          }),
      );
    }),
  };
}

const emptyData: Dataset = {
  meta: undefined as unknown as Dataset['meta'],
  entities: [],
  claims: [],
  sources: [],
  evidence: [],
};

let source: SearchSource | null = null;
/** Sets where search reads from: the browser's index or a repository. */
export const provideSearch = (next: SearchSource) => {
  source = next;
};
export function searchSource(): SearchSource {
  if (!source) throw new Error('No search source provided');
  return source;
}
