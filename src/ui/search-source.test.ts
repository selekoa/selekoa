import { createElement } from 'react';
import { renderToReadableStream } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { repository } from '../domain/repository';
import {
  buildIndexFiles,
  searchIndexFiles,
  type IndexFilters,
} from '../domain/search-index';
import { searchQueries } from '../domain/search-queries';
import type { SearchMode } from '../domain/search';
import { memorySearchSource } from './memory-search';
import { Search } from './Search';
import { searchFacets } from './search-facets';
import { indexSearchSource, type SearchSource } from './search-source';

/**
 * The identity checks compare every query over the whole dataset, so their
 * time grows with it; after the 2026-10-31 admissions they exceed the
 * default 60 s on four processors. The time limit is a test runner setting,
 * not a size budget.
 */
const IDENTITY_TIMEOUT = 300_000;

/**
 * The search page draws the same results from the static index as from the
 * whole dataset: the same groups, snippets, labels, sources and collections,
 * for every query of the fixed set. See docs/data-loading-design-c.md
 * ("Search index").
 */
const data = repository.data;
const facets = searchFacets(data);
const files = buildIndexFiles(data, {
  collections: facets.collections,
  organisations: facets.organisations.map((o) => o.id),
});
const indexed = () =>
  indexSearchSource(() =>
    Promise.resolve({
      manifest: files.manifest,
      facets,
      search: searchIndexFiles,
      load: {
        postings: (i) => Promise.resolve(structuredClone(files.postings[i])),
        chunk: (i) => Promise.resolve(structuredClone(files.chunks[i])),
        collection: (i) => Promise.resolve(files.collections[i]),
        organisation: (i) => Promise.resolve(files.organisations[i]),
      },
    }),
  );

/** The search page's markup for a query, drawn from a source. */
async function render(source: SearchSource, query: string, mode: SearchMode) {
  const noop = () => {};
  const stream = await renderToReadableStream(
    createElement(Search, {
      source,
      query,
      onQuery: noop,
      mode,
      onMode: noop,
      selectedClaimId: null,
      onClaim: noop,
      onEntity: noop,
      onPage: noop,
      onPagePath: noop,
    }),
    {
      onError(error) {
        throw error;
      },
    },
  );
  await stream.allReady;
  return new Response(stream).text();
}

describe('search from the static index', () => {
  const queries = searchQueries(data);

  it(
    'draws the results of the whole dataset for every query',
    async () => {
      const memory = memorySearchSource(repository);
      const index = indexed();
      for (const query of queries)
        for (const mode of ['all', 'names'] as const)
          expect(await render(index, query, mode), `${query} (${mode})`).toBe(
            await render(memory, query, mode),
          );
    },
    IDENTITY_TIMEOUT,
  );

  it('has the facets the page renderer has', async () => {
    expect(await indexed().facets()).toEqual(
      memorySearchSource(repository).facets().value,
    );
  });

  it('answers a filtered search alike', async () => {
    const memory = memorySearchSource(repository);
    const index = indexed();
    const filters: IndexFilters[] = [
      { collectionId: facets.collections[0].id },
      { organisationId: 'anthropic', order: 'date' },
      { types: ['source'], fromYear: 2020 },
    ];
    for (const f of filters)
      for (const query of ['ASL-3', 'board', 'Altman', 'safety framework']) {
        const request = { query, filters: f };
        const [a, b] = await Promise.all([
          index.search(request),
          memory.search(request),
        ]);
        expect(a.results, `${query} ${JSON.stringify(f)}`).toEqual(b.results);
      }
  });
});
