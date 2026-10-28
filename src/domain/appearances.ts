import type { Dataset } from './schema';
import { relatedTo } from './query';
import { authorKey, propositionsView } from './propositions';
import { documentHistory } from './document-history';
import { controlStructure } from './control-structures';
import { commitmentsView } from './commitments';
import { questionStarterView } from './question-starter';
import { researchPaths, resolveQuestion } from './research-path';
import { propositionCollections } from '../reading/human-thought';
import { documentHistories } from '../reading/frontier-safety-frameworks';
import { controlStructures } from '../reading/control-structures';
import { commitmentCollections } from '../reading/commitments';
import { questionStarters } from '../reading/self-governance';
import { frameworkComparison } from '../reading/framework-comparison';
import { comparisonView } from './framework-comparison';

/** Where a collection page opens, in the start page's terms. */
export type CollectionTarget =
  | { kind: 'propositions'; id: string }
  | { kind: 'documents' }
  | { kind: 'compare'; id: string }
  | { kind: 'control'; id: string }
  | { kind: 'commitments' }
  | { kind: 'question'; id: string }
  | { kind: 'reading' };

export type Appearance = {
  target: CollectionTarget;
  title: string;
  /** Records in the collection that name the person or document. */
  records: number;
  /** For a person: records in the collection on texts the person wrote. */
  texts: number;
};

/** What all of a person's or document's appearances add up to. */
export type AppearanceTotals = {
  collections: number;
  /** Distinct records that name the person or document, across collections. */
  records: number;
  /** Distinct records on texts the person wrote, across collections. */
  texts: number;
};

/**
 * The collections that hold records about a person or document, or, for a
 * person, records on texts whose source names them as an author. Computed
 * from stored claims and the collections' own definitions; a person matched
 * by author name is matched on the name as the source prints it, with middle
 * initials ignored.
 */
export function appearances(data: Dataset, entityId: string): Appearance[] {
  return collect(data, entityId).found;
}

/**
 * Totals over a person's or document's appearances. A record that sits in
 * two collections counts once.
 */
export function appearanceTotals(
  data: Dataset,
  entityId: string,
): AppearanceTotals {
  const { found, recordIds, textIds } = collect(data, entityId);
  return {
    collections: found.length,
    records: recordIds.size,
    texts: textIds.size,
  };
}

function collect(data: Dataset, entityId: string) {
  const found: Appearance[] = [];
  const recordIds = new Set<string>();
  const textIds = new Set<string>();
  const entity = data.entities.find((e) => e.id === entityId);
  if (!entity) return { found, recordIds, textIds };
  const byId = new Map(data.claims.map((c) => [c.id, c]));
  const names =
    entity.type === 'person'
      ? new Set([entity.name, ...entity.aliases].map(authorKey))
      : new Set<string>();
  const about = (claimIds: string[]) => {
    const ids = claimIds.filter((id) => relatedTo(byId.get(id)!, entityId));
    for (const id of ids) recordIds.add(id);
    return ids.length;
  };
  const add = (
    target: CollectionTarget,
    title: string,
    records: number,
    texts = 0,
  ) => {
    if (records || texts) found.push({ target, title, records, texts });
  };
  const authored = (records: { claim: { id: string } }[]) => {
    for (const r of records) textIds.add(r.claim.id);
    return records.length;
  };
  for (const c of collections(data))
    add(
      c.target,
      c.title,
      about(c.claimIds),
      c.records
        ? authored(
            c.records.filter((r) =>
              r.authors.some((a) => names.has(authorKey(a))),
            ),
          )
        : 0,
    );
  return { found, recordIds, textIds };
}

type CollectionRecords = {
  target: CollectionTarget;
  title: string;
  claimIds: string[];
  /** Proposition records with their texts' authors. */
  records?: { claim: { id: string }; authors: string[] }[];
};
const cache = new WeakMap<Dataset, CollectionRecords[]>();

/** Every collection's records, computed once per dataset. */
function collections(data: Dataset): CollectionRecords[] {
  const known = cache.get(data);
  if (known) return known;
  const list: CollectionRecords[] = [
    ...propositionCollections.map((collection) => {
      const view = propositionsView(data, collection);
      return {
        target: { kind: 'propositions' as const, id: collection.id },
        title: collection.title,
        claimIds: view.claimIds,
        records: view.groups.flatMap((g) =>
          g.propositions.flatMap((p) => p.records),
        ),
      };
    }),
    ...documentHistories.map((definition) => ({
      target: { kind: 'documents' as const },
      title: definition.title,
      claimIds: documentHistory(data, definition).claimIds,
    })),
    {
      target: { kind: 'compare', id: frameworkComparison.id },
      title: frameworkComparison.title,
      claimIds: comparisonView(data, frameworkComparison).claimIds,
    },
    ...controlStructures.map((definition) => ({
      target: { kind: 'control' as const, id: definition.id },
      title: definition.title,
      claimIds: controlStructure(data, definition).claimIds,
    })),
    ...commitmentCollections.map((definition) => ({
      target: { kind: 'commitments' as const },
      title: definition.title,
      claimIds: commitmentsView(data, definition).claimIds,
    })),
    ...questionStarters.map((definition) => ({
      target: { kind: 'question' as const, id: definition.id },
      title: definition.title,
      claimIds: questionStarterView(data, definition).claimIds,
    })),
    ...researchPaths.map((definition) => ({
      target: { kind: 'reading' as const },
      title: definition.title,
      claimIds: resolveQuestion(data, definition).items.map((i) => i.claimId),
    })),
  ];
  cache.set(data, list);
  return list;
}
