import type { Dataset } from '../domain/schema';
import { researchPaths, resolveQuestion } from '../domain/research-path';
import { documentHistory } from '../domain/document-history';
import { commitmentsView } from '../domain/commitments';
import { controlStructure } from '../domain/control-structures';
import { documentHistories } from '../reading/frontier-safety-frameworks';
import { commitmentCollections } from '../reading/commitments';
import { controlStructures } from '../reading/control-structures';
import { propositionsView } from '../domain/propositions';
import { propositionCollections } from '../reading/human-thought';
import { frameworkComparison } from '../reading/framework-comparison';
import { comparisonView } from '../domain/framework-comparison';

/** Collection kinds, named as in the application's page addresses. */
export const collectionKinds = [
  'question',
  'documents',
  'compare',
  'control',
  'commitments',
  'propositions',
] as const;
export type CollectionKind = (typeof collectionKinds)[number];

export type CollectionDefinition = {
  kind: CollectionKind;
  definition: { id: string; version: number; [key: string]: unknown };
};

/** The authored collection definitions the application currently reads. */
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
  ...propositionCollections.map((definition) => ({
    kind: 'propositions' as const,
    definition,
  })),
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
