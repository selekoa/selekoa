import { referencePath } from '../domain/addresses';
import type { Entity } from '../domain/schema';
import { propositionFrames } from '../reading/proposition-frames';

/**
 * The page a record link opens: a person's or document's page, an
 * organisation's dossier (except from the explorer's map, list and
 * timeline, which open it in place), a proposition's section of its
 * collection page; none for other records.
 */
export function recordPath(
  entity: Pick<Entity, 'id' | 'type' | 'proposition'> | undefined,
  inExplorer: boolean,
): string | undefined {
  if (!entity) return undefined;
  const { id } = entity;
  if (entity.proposition) {
    const collection = propositionFrames.find((c) =>
      c.groups.some((g) => g.propositionIds.includes(id)),
    );
    // With the proposition's section, so that the link opens its place on
    // the collection page (src/ui/page-visits.ts), and the built page scrolls
    // to it when read without scripts.
    return collection
      ? `${referencePath({ kind: 'propositions', id: collection.id })}#proposition-${entity.proposition.code.toLowerCase()}`
      : undefined;
  }
  if (entity.type === 'person' || entity.type === 'document')
    return referencePath({ kind: entity.type, id });
  if (entity.type === 'organisation' && !inExplorer)
    return referencePath({ kind: 'dossier', id });
  return undefined;
}
