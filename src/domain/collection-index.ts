/**
 * Which claims each collection holds, computed by the build from the whole
 * dataset. A page drawn from part of the dataset (its slice) still names
 * every collection a claim or person appears in: each slice carries the
 * entries of the records it holds (`indexFor`), and the parts held give
 * their entries together (`mergeIndexes` in src/domain/slices.ts) to the
 * part of the dataset they make (`seedCollectionIndex`), in the renderer and
 * in the browser alike. See docs/data-loading-design-c.md ("Per-page data").
 */
import type { Dataset } from './schema';
import type { PlacedSlice } from './slices';
import {
  authorKey,
  everyEarliestMark,
  seedEarliestMarks,
  type EarliestMark,
} from './propositions';
import {
  collectionKey,
  collectionsByClaim,
  seedCollectionsByClaim,
} from '../release/collections';
import {
  collections,
  seedCollections,
  type CollectionRecords,
} from './appearances';
import {
  chronicleIndex,
  seedChronicleIndex,
  type ChronicleIndex,
} from './chronicle-index';

export type CollectionIndex = {
  /** Each claim in a collection, with the collections' keys. */
  byClaim: [string, string[]][];
  /**
   * Each collection's claims, and proposition records' authors. Every
   * collection is listed, in the same order, in any part of the index.
   */
  collections: CollectionRecords[];
  /** Each document's earliest-located marks. */
  marks: [string, EarliestMark[]][];
  /** The chronicle's years, counts and stated dates (src/domain/chronicle.ts). */
  chronicle: ChronicleIndex;
};

export function collectionIndex(data: Dataset): CollectionIndex {
  return {
    byClaim: [...collectionsByClaim(data)].map(([id, list]) => [
      id,
      list.map(collectionKey),
    ]),
    marks: everyEarliestMark(data),
    chronicle: chronicleIndex(data),
    collections: collections(data).map((c) => ({
      ...c,
      ...(c.records
        ? {
            records: c.records.map((r) => ({
              claim: { id: r.claim.id },
              authors: r.authors,
            })),
          }
        : {}),
    })),
  };
}

/**
 * The entries of the index a slice needs: those of the claims and documents
 * it holds, and the proposition records whose authors include a person whose
 * aliases it holds (src/domain/appearances.ts matches a person's texts by
 * their name and aliases, so a page that does reads the aliases). A page
 * reads the index only for records it holds, so it finds there what it finds
 * in the whole index; the build checks every page drawn from its slice. The
 * chronicle's years and counts are the whole dataset's (any page resolves a
 * year's address with them, src/domain/deep-links.ts); its scheduled and
 * stated dates are those of the claims the slice holds. A slice that needs
 * the whole relation core holds every record, so it carries the whole index.
 */
export function indexFor(
  index: CollectionIndex,
  data: Dataset,
  slice: PlacedSlice,
): CollectionIndex {
  if (slice.core) return index;
  const claims = new Set(slice.claims.map((c) => c.id!));
  const entities = new Set(slice.entities.map((e) => e.id!));
  const named = new Set(
    slice.entities.filter((e) => 'aliases' in e).map((e) => e.id!),
  );
  const names = new Set(
    data.entities
      .filter((e) => e.type === 'person' && named.has(e.id))
      .flatMap((e) => [e.name, ...e.aliases].map(authorKey)),
  );
  return {
    byClaim: index.byClaim.filter(([id]) => claims.has(id)),
    marks: index.marks.filter(([id]) => entities.has(id)),
    chronicle: {
      years: index.chronicle.years,
      scheduled: index.chronicle.scheduled.filter((key) =>
        claims.has(key.slice(0, key.lastIndexOf('@'))),
      ),
      statedBy: index.chronicle.statedBy.flatMap(
        ([year, list]): ChronicleIndex['statedBy'] => {
          const held = list.filter(([id]) => claims.has(id));
          return held.length ? [[year, held]] : [];
        },
      ),
    },
    collections: index.collections.map((c) => ({
      ...c,
      claimIds: c.claimIds.filter((id) => claims.has(id)),
      ...(c.records
        ? {
            records: c.records.filter((r) =>
              r.authors.some((a) => names.has(authorKey(a))),
            ),
          }
        : {}),
    })),
  };
}

export function seedCollectionIndex(data: Dataset, index: CollectionIndex) {
  seedCollectionsByClaim(data, index.byClaim);
  seedCollections(data, index.collections);
  seedEarliestMarks(data, index.marks);
  seedChronicleIndex(data, index.chronicle);
}
