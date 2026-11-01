import { describe, expect, it } from 'vitest';
import { searchQueries } from './search-queries';
import { repository } from './repository';
import {
  createSearchIndex,
  searchOrganisations,
  searchRecords,
  type SearchFilters,
} from './search';
import {
  buildIndexFiles,
  searchIndexFiles,
  termKeys,
  type IndexFiles,
  type IndexFilters,
  type IndexLoader,
} from './search-index';
import {
  applicationCollections,
  collectionClaimIds,
} from '../release/collections';

/**
 * The identity checks compare every query over the whole dataset, so their
 * time grows with it; after the 2026-10-31 admissions they exceed the
 * default 60 s on four processors. The time limit is a test runner setting,
 * not a size budget.
 */
const IDENTITY_TIMEOUT = 300_000;

/**
 * Search over the static index gives the results of search over the whole
 * dataset: the same hits, scores, snippets and order, for a fixed set of
 * queries with and without filters. See docs/data-loading-design-c.md
 * ("Search index").
 */
const data = repository.data;
const index = createSearchIndex(data);
const collections = applicationCollections.map((c) => ({
  id: `${c.kind}:${c.definition.id}`,
  claimIds: collectionClaimIds(data, c),
}));
const organisations = searchOrganisations(data).map((o) => o.id);
const files: IndexFiles = buildIndexFiles(data, { collections, organisations });

/** Loads from memory, counting the files each search reads. */
function loader(read: Set<string>): IndexLoader {
  const at = <T>(kind: string, list: T[], i: number) => {
    read.add(`${kind}:${i}`);
    return Promise.resolve(structuredClone(list[i]));
  };
  return {
    postings: (i) => at('postings', files.postings, i),
    chunk: (i) => at('chunk', files.chunks, i),
    collection: (i) => at('collection', files.collections, i),
    organisation: (i) => at('organisation', files.organisations, i),
  };
}

const queries = searchQueries(data);

/** Filter combinations, each with the same filters in both forms. */
const filterSets: { name: string; index: IndexFilters; full: SearchFilters }[] =
  [
    { name: 'none', index: {}, full: {} },
    { name: 'names', index: { mode: 'names' }, full: { mode: 'names' } },
    {
      name: 'names in an organisation',
      index: { mode: 'names', organisationId: 'openai' },
      full: { mode: 'names', organisationId: 'openai' },
    },
    {
      name: 'whole words',
      index: { wholeWords: true },
      full: { wholeWords: true },
    },
    { name: 'date order', index: { order: 'date' }, full: { order: 'date' } },
    {
      name: 'passages',
      index: { types: ['passage'] },
      full: { types: ['passage'] },
    },
    {
      name: 'years',
      index: { fromYear: 2019, untilYear: 2023 },
      full: { fromYear: 2019, untilYear: 2023 },
    },
    {
      name: 'organisation',
      index: { organisationId: 'openai' },
      full: { organisationId: 'openai' },
    },
    ...collections.slice(0, 3).map((c) => ({
      name: c.id,
      index: { collectionId: c.id },
      full: { collection: new Set(c.claimIds) },
    })),
  ];

describe('the static search index', () => {
  it('has a query set of at least 200 queries', () => {
    expect(queries.length).toBeGreaterThanOrEqual(200);
  });

  it(
    'gives the same results as the whole dataset for every query',
    async () => {
      let compared = 0;
      for (const query of queries) {
        const read = new Set<string>();
        const { results } = await searchIndexFiles(
          files.manifest,
          loader(read),
          query,
        );
        expect(results, query).toEqual(searchRecords(index, query));
        compared += results.total;
      }
      expect(compared).toBeGreaterThan(10_000);
    },
    IDENTITY_TIMEOUT,
  );

  it(
    'gives the same results with each filter',
    async () => {
      for (const { name, index: f, full } of filterSets)
        for (const query of queries.filter((_, i) => i % 3 === 0)) {
          const { results } = await searchIndexFiles(
            files.manifest,
            loader(new Set()),
            query,
            f,
          );
          expect(results, `${query} (${name})`).toEqual(
            searchRecords(index, query, full),
          );
        }
    },
    IDENTITY_TIMEOUT,
  );

  it('shows every record a result names', async () => {
    for (const query of queries.filter((_, i) => i % 5 === 0)) {
      const { results, shown } = await searchIndexFiles(
        files.manifest,
        loader(new Set()),
        query,
      );
      const has = (list: { id?: string }[], id: string) =>
        list.some((r) => r.id === id);
      for (const hit of results.groups.flatMap((g) => g.hits)) {
        if (hit.claimId)
          expect(has(shown.claims, hit.claimId), hit.id).toBe(true);
        if (hit.type === 'passage')
          expect(has(shown.evidence, hit.id), hit.id).toBe(true);
        if (hit.type === 'source')
          expect(has(shown.sources, hit.id), hit.id).toBe(true);
        if (hit.type === 'entity')
          expect(has(shown.entities, hit.id), hit.id).toBe(true);
        if (hit.claimId)
          for (const id of hit.sourceIds)
            expect(has(shown.sources, id), id).toBe(true);
      }
    }
  });

  it('reads one postings file for most terms, and few chunks for rare words', async () => {
    const read = new Set<string>();
    await searchIndexFiles(files.manifest, loader(read), 'whistleblower');
    const postings = [...read].filter((f) => f.startsWith('postings'));
    expect(postings.length).toBe(1);
    expect(
      [...read].filter((f) => f.startsWith('chunk')).length,
    ).toBeLessThanOrEqual(3);
  });

  it('separates words at a character outside the Basic Multilingual Plane, as search does', () => {
    expect(termKeys('𐐨zqxv')).toEqual([{ key: 'zqxv', prefix: true }]);
  });

  it('refuses an organisation the filter does not list', async () => {
    await expect(
      searchIndexFiles(files.manifest, loader(new Set()), 'altman', {
        organisationId: 'sam-altman',
      }),
    ).rejects.toThrow(/sam-altman/);
  });

  it('keys a term by its words, the last as a prefix', () => {
    expect(termKeys('asl 3')).toEqual([
      { key: 'asl', prefix: false },
      { key: '3', prefix: true },
    ]);
    expect(termKeys('a')).toEqual([{ key: 'a', prefix: false }]);
    expect(termKeys('深度')).toEqual([
      { key: '#深', prefix: false },
      { key: '#度', prefix: false },
    ]);
  });
});
