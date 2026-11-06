/**
 * Search over the whole dataset held in memory, for the page renderer and
 * tests: the same facets and results as the browser's static index
 * (src/ui/search-source.ts), answered at once.
 */
import type { Repository } from '../domain/repository';
import { createSearchIndex, searchRecords } from '../domain/search';
import {
  searchCollections,
  searchFacets,
  type SearchFacets,
} from './search-facets';
import { cached, type SearchSource } from './search-source';
import { settled, type Tracked } from './tracked';

/** Search over a repository held in memory, answered at once. */
export function memorySearchSource(repository: Repository): SearchSource {
  let facets: Tracked<SearchFacets> | undefined;
  let index: ReturnType<typeof createSearchIndex> | undefined;
  const facetsOf = () => (facets ??= settled(searchFacets(repository.data)));
  let members: ReturnType<typeof searchCollections> | undefined;
  let memberOf: Map<string, number[]> | undefined;
  const membersOf = () => {
    if (!members) {
      members = searchCollections(repository.data);
      memberOf = new Map();
      members.forEach((c, i) => {
        for (const id of c.claimIds)
          memberOf!.set(id, [...(memberOf!.get(id) ?? []), i]);
      });
    }
    return { members, memberOf: memberOf! };
  };
  return {
    facets: facetsOf,
    search: cached(({ query, filters }) => {
      const { collectionId, ...rest } = filters;
      const collection = collectionId
        ? membersOf().members.find((c) => c.id === collectionId)
        : undefined;
      index ??= createSearchIndex(repository.data);
      return settled({
        results: searchRecords(index, query, {
          ...rest,
          collection: collection ? new Set(collection.claimIds) : undefined,
        }),
        repository,
        memberOf: membersOf().memberOf,
      });
    }),
  };
}
