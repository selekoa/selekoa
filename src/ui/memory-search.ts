/**
 * Search over the whole dataset held in memory, for the page renderer and
 * tests: the same facets and results as the browser's static index
 * (src/ui/search-source.ts), answered at once.
 */
import type { Repository } from '../domain/repository';
import { createSearchIndex, searchRecords } from '../domain/search';
import { searchFacets, type SearchFacets } from './search-facets';
import { cached, type SearchSource } from './search-source';
import { settled, type Tracked } from './tracked';

/** Search over a repository held in memory, answered at once. */
export function memorySearchSource(repository: Repository): SearchSource {
  let facets: Tracked<SearchFacets> | undefined;
  let index: ReturnType<typeof createSearchIndex> | undefined;
  const facetsOf = () => (facets ??= settled(searchFacets(repository.data)));
  return {
    facets: facetsOf,
    search: cached(({ query, filters }) => {
      const { collectionId, ...rest } = filters;
      const collection = collectionId
        ? facetsOf().value!.collections.find((c) => c.id === collectionId)
        : undefined;
      index ??= createSearchIndex(repository.data);
      return settled({
        results: searchRecords(index, query, {
          ...rest,
          collection: collection ? new Set(collection.claimIds) : undefined,
        }),
        repository,
      });
    }),
  };
}
