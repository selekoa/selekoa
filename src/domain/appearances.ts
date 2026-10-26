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

/** Where a collection page opens, in the start page's terms. */
export type CollectionTarget =
  | { kind: 'propositions'; id: string }
  | { kind: 'documents' }
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

/**
 * The collections that hold records about a person or document, or, for a
 * person, records on texts whose source names them as an author. Computed
 * from stored claims and the collections' own definitions; a person matched
 * by author name is matched on the name as the source prints it, with middle
 * initials ignored.
 */
export function appearances(data: Dataset, entityId: string): Appearance[] {
  const entity = data.entities.find((e) => e.id === entityId);
  if (!entity) return [];
  const byId = new Map(data.claims.map((c) => [c.id, c]));
  const names =
    entity.type === 'person'
      ? new Set([entity.name, ...entity.aliases].map(authorKey))
      : new Set<string>();
  const about = (claimIds: string[]) =>
    claimIds.filter((id) => relatedTo(byId.get(id)!, entityId)).length;
  const found: Appearance[] = [];
  const add = (
    target: CollectionTarget,
    title: string,
    records: number,
    texts = 0,
  ) => {
    if (records || texts) found.push({ target, title, records, texts });
  };
  for (const collection of propositionCollections) {
    const view = propositionsView(data, collection);
    const all = view.groups.flatMap((g) =>
      g.propositions.flatMap((p) => p.records),
    );
    add(
      { kind: 'propositions', id: collection.id },
      collection.title,
      about(view.claimIds),
      all.filter((r) => r.authors.some((a) => names.has(authorKey(a)))).length,
    );
  }
  for (const definition of documentHistories)
    add(
      { kind: 'documents' },
      definition.title,
      about(documentHistory(data, definition).claimIds),
    );
  for (const definition of controlStructures)
    add(
      { kind: 'control', id: definition.id },
      definition.title,
      about(controlStructure(data, definition).claimIds),
    );
  for (const definition of commitmentCollections)
    add(
      { kind: 'commitments' },
      definition.title,
      about(commitmentsView(data, definition).claimIds),
    );
  for (const definition of questionStarters)
    add(
      { kind: 'question', id: definition.id },
      definition.title,
      about(questionStarterView(data, definition).claimIds),
    );
  for (const definition of researchPaths)
    add(
      { kind: 'reading' },
      definition.title,
      about(resolveQuestion(data, definition).items.map((i) => i.claimId)),
    );
  return found;
}
