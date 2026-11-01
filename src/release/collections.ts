import type { Dataset } from '../domain/schema';
import { researchPaths, resolveQuestion } from '../domain/research-path';
import { documentHistory } from '../domain/document-history';
import { commitmentsView } from '../domain/commitments';
import { controlStructure } from '../domain/control-structures';
import { documentHistories } from '../reading/frontier-safety-frameworks';
import { commitmentCollections } from '../reading/commitments';
import { controlStructures } from '../reading/control-structures';
import { propositionsView } from '../domain/propositions';
import { propositionFrames } from '../reading/proposition-frames';
import { frameworkComparison } from '../reading/framework-comparison';
import { comparisonView } from '../domain/framework-comparison';
import { frameworksLawView } from '../domain/frameworks-law';
import { computeGuides, guides } from '../reading/guides';
import { computeBuildoutView } from '../domain/compute-buildout';

/** Collection kinds, named as in the application's page addresses. */
export const collectionKinds = [
  'question',
  'documents',
  'compare',
  'control',
  'commitments',
  'propositions',
  // From release 0.12.0: guided readings across collections (`/guide/<id>`).
  'guide',
] as const;
export type CollectionKind = (typeof collectionKinds)[number];

export type CollectionDefinition = {
  kind: CollectionKind;
  definition: { id: string; version: number; [key: string]: unknown };
};

/**
 * The authored collection definitions the application currently reads.
 * Propositions collections are their frames, without the reader text only
 * their own pages show (src/reading/proposition-frames.ts); releases read
 * them whole (`wholeCollections`, src/release/whole-collections.ts).
 */
export const applicationCollections: CollectionDefinition[] = [
  ...researchPaths.map((definition) => ({
    kind: 'question' as const,
    definition,
  })),
  ...documentHistories.map((definition) => ({
    kind: 'documents' as const,
    definition,
  })),
  { kind: 'compare' as const, definition: frameworkComparison },
  ...controlStructures.map((definition) => ({
    kind: 'control' as const,
    definition,
  })),
  ...commitmentCollections.map((definition) => ({
    kind: 'commitments' as const,
    definition,
  })),
  ...propositionFrames.map((definition) => ({
    kind: 'propositions' as const,
    definition,
  })),
  ...guides.map((definition) => ({ kind: 'guide' as const, definition })),
  // The compute guide (`computeGuides`) joins here at the release that
  // registers it; `collectionClaimIds` already reads it.
];

/** The claims a collection resolves to, using the application's own readers. */
export function collectionClaimIds(
  data: Dataset,
  { kind, definition }: CollectionDefinition,
): string[] {
  // Definitions are the application's own typed objects; the casts restore them.
  if (kind === 'question')
    return resolveQuestion(
      data,
      definition as unknown as Parameters<typeof resolveQuestion>[1],
    ).items.map((i) => i.claimId);
  if (kind === 'documents')
    return documentHistory(
      data,
      definition as unknown as Parameters<typeof documentHistory>[1],
    ).claimIds;
  if (kind === 'compare')
    return comparisonView(
      data,
      definition as unknown as Parameters<typeof comparisonView>[1],
    ).claimIds;
  if (kind === 'control')
    return controlStructure(
      data,
      definition as unknown as Parameters<typeof controlStructure>[1],
    ).claimIds;
  if (kind === 'guide' && computeGuides.some((g) => g.id === definition.id))
    return computeBuildoutView(
      data,
      definition as unknown as Parameters<typeof computeBuildoutView>[1],
    ).claimIds;
  if (kind === 'guide')
    return frameworksLawView(
      data,
      definition as unknown as Parameters<typeof frameworksLawView>[1],
    ).claimIds;
  if (kind === 'propositions')
    return propositionsView(
      data,
      definition as unknown as Parameters<typeof propositionsView>[1],
    ).claimIds;
  return commitmentsView(
    data,
    definition as unknown as Parameters<typeof commitmentsView>[1],
  ).claimIds;
}

const byClaim = new WeakMap<Dataset, Map<string, CollectionDefinition[]>>();

/** A collection's key in a stored index: `<kind>:<id>`. */
export const collectionKey = (c: CollectionDefinition) =>
  `${c.kind}:${String(c.definition.id)}`;

/**
 * Gives a dataset the collections of each claim, as computed from the whole
 * dataset (src/domain/collection-index.ts), for a page drawn from part of it.
 */
export function seedCollectionsByClaim(
  data: Dataset,
  stored: [string, string[]][],
) {
  const byKey = new Map(
    applicationCollections.map((c) => [collectionKey(c), c]),
  );
  byClaim.set(
    data,
    new Map(stored.map(([id, keys]) => [id, keys.map((k) => byKey.get(k)!)])),
  );
}

/**
 * The collections each claim appears in, in the order of
 * `applicationCollections`. Computed once per dataset.
 */
export function collectionsByClaim(
  data: Dataset,
): Map<string, CollectionDefinition[]> {
  const cached = byClaim.get(data);
  if (cached) return cached;
  const found = new Map<string, CollectionDefinition[]>();
  for (const collection of applicationCollections)
    for (const id of new Set(collectionClaimIds(data, collection)))
      found.set(id, [...(found.get(id) ?? []), collection]);
  byClaim.set(data, found);
  return found;
}
