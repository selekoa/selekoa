/**
 * What the search page shows before any query: its filters' choices, the
 * collections each claim belongs to and the reading pages it lists. Computed
 * from the whole dataset, by the build for the browser
 * (scripts/search-index.ts) and by the page renderer, so that the search
 * page needs no record to be drawn.
 */
import type { Dataset } from '../domain/schema';
import {
  searchOrganisations,
  searchYears,
  type PageEntry,
} from '../domain/search';
import {
  applicationCollections,
  collectionClaimIds,
  type CollectionKind,
} from '../release/collections';
import { searchablePages } from '../prerender/searchable-pages';

const collectionKinds: Record<CollectionKind, string> = {
  documents: 'Document history',
  compare: 'Comparison',
  commitments: 'Commitments',
  control: 'Control structure',
  question: 'Guided reading',
  propositions: 'Propositions',
  guide: 'Guided reading',
};

export type SearchCollection = {
  id: string;
  label: string;
  title: string;
  claimIds: string[];
};

export type SearchFacets = {
  /** Collections for the filter, in the order of their kinds. */
  collections: SearchCollection[];
  /** Organisations named in at least one claim, by name. */
  organisations: { id: string; name: string }[];
  /** Years present in claim dates and source publication dates. */
  years: number[];
  /** Document names shared by more than one document record. */
  sharedNames: string[];
  /** The reading pages search lists. */
  pages: PageEntry[];
};

export function searchFacets(data: Dataset): SearchFacets {
  const entities = new Map(data.entities.map((e) => [e.id, e]));
  const collections = [...applicationCollections]
    .sort(
      (a, b) =>
        Object.keys(collectionKinds).indexOf(a.kind) -
        Object.keys(collectionKinds).indexOf(b.kind),
    )
    .map((c) => {
      const title = String(c.definition.title);
      const institution =
        typeof c.definition.institutionId === 'string'
          ? entities.get(c.definition.institutionId)?.name
          : undefined;
      const named = institution
        ? `${institution}, ${title.toLowerCase()}`
        : title;
      return {
        id: `${c.kind}:${c.definition.id}`,
        label: `${collectionKinds[c.kind]}: ${named}`,
        title: named,
        claimIds: [...new Set(collectionClaimIds(data, c))],
      };
    });
  const seen = new Map<string, number>();
  for (const e of data.entities)
    if (e.type === 'document') seen.set(e.name, (seen.get(e.name) ?? 0) + 1);
  return {
    collections,
    organisations: searchOrganisations(data),
    years: searchYears(data),
    sharedNames: [...seen].filter(([, n]) => n > 1).map(([name]) => name),
    pages: searchablePages(data),
  };
}
