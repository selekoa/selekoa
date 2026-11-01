import type { Claim, Dataset, Entity } from './schema';

/**
 * A collection of families of methods and names in the technical history of
 * machine intelligence (schema 2.26). Each concept carries a naming
 * criterion; its records say which located texts name a family or use a
 * name, which is the earliest located use, and which texts define it. Order
 * is not influence, and earliest located never means first.
 */
export type NamingCollection = {
  id: string;
  version: number;
  title: string;
  question: string;
  editorialStatus: 'machine-proposed';
  introduction: string;
  groups: {
    id: string;
    label: string;
    description: string;
    conceptIds: string[];
  }[];
  /** Per concept: how it was searched, stated once. */
  searches: Record<
    string,
    {
      venues: string;
      years: string;
      methods: string;
      gaps: string;
      failures: string;
      /** What the cross-family check searched and found, in its terms. */
      check?: string;
    }
  >;
  /** Attributed statements about who named or devised something, per concept. */
  attributed: Record<string, string[]>;
  /** Headlines replaced since the candidate searches, kept on record. */
  corrections: {
    conceptId: string;
    replaced: string;
    reason: string;
    claimIds: string[];
    recordedAt: string;
  }[];
  limits: string[];
};

export type NamingUse = {
  claim: Claim;
  /** The date that decides earliest located: the attested date, or the record's. */
  wording?: string;
};

export type NamingConceptView = {
  concept: Entity;
  earliest?: NamingUse;
  withheld?: string;
  uses: NamingUse[];
  otherSense: NamingUse[];
  unverified: NamingUse[];
  definitions: Claim[];
  attributed: Claim[];
};

const wordingOf = (c: Claim) =>
  c.attributes?.naming?.attested?.date ??
  (c.time.kind === 'event' ? c.time.date : undefined);
const byDate = (a: NamingUse, b: NamingUse) =>
  (a.wording ?? '9999').localeCompare(b.wording ?? '9999') ||
  a.claim.id.localeCompare(b.claim.id);

/** The records of one concept, sorted by the date of their wording. */
export function namingConceptView(
  data: Pick<Dataset, 'claims' | 'entities'>,
  collection: NamingCollection,
  conceptId: string,
): NamingConceptView {
  const concept = data.entities.find((e) => e.id === conceptId);
  if (!concept?.naming) throw new Error(`Not a naming concept: ${conceptId}`);
  const of = data.claims.filter(
    (c) => c.object.kind === 'entity' && c.object.entityId === conceptId,
  );
  const uses = of
    .filter((c) => c.predicate === 'uses_term')
    .map((claim) => ({ claim, wording: wordingOf(claim) }))
    .sort(byDate);
  const sense = (s: string) =>
    uses.filter((u) => u.claim.attributes?.naming?.sense === s);
  const attributedIds = new Set(collection.attributed[conceptId] ?? []);
  return {
    concept,
    earliest: uses.find(
      (u) => u.claim.attributes?.naming?.role === 'earliest-located',
    ),
    withheld: concept.naming.withheld?.[0]?.reason,
    uses: sense('meets'),
    otherSense: sense('other-sense'),
    unverified: sense('unverified'),
    definitions: of
      .filter((c) => c.predicate === 'discusses')
      .sort((a, b) => (wordingOf(a) ?? '').localeCompare(wordingOf(b) ?? '')),
    attributed: data.claims.filter((c) => attributedIds.has(c.id)),
  };
}

/** Every concept of the collection, in group order. */
export function namingView(
  data: Pick<Dataset, 'claims' | 'entities'>,
  collection: NamingCollection,
) {
  return collection.groups.map((group) => ({
    group,
    concepts: group.conceptIds.map((id) =>
      namingConceptView(data, collection, id),
    ),
  }));
}
