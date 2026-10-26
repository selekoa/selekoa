import type { Claim, Dataset, Entity } from './schema';
import { dateOf, isProvisionRecord, relatedTo } from './query';

export const dossierSections = {
  chronology: 'Chronology',
  people: 'People & paths',
  ideas: 'Ideas & documents',
  capital: 'Capital & compute',
  governance: 'Governance',
} as const;
export type DossierSection = keyof typeof dossierSections;
export type DossierGroup = {
  id: string;
  label: string;
  entity?: Entity;
  claims: Claim[];
  connectionClaims?: Claim[];
};
const personnel = new Set(['held_role', 'co_founded', 'departure_announced']);
const documentary = new Set([
  'cites',
  'discusses',
  'explicitly_credits',
  'uses_method_from',
]);
const compare = (a: Claim, b: Claim) =>
  (dateOf(a) ?? '9999').localeCompare(dateOf(b) ?? '9999') ||
  a.id.localeCompare(b.id);
const sorted = (claims: Claim[]) => [...claims].sort(compare);

/** A bounded reading projection, never a new assertion or an inferred path.
 * All returned claims are the original validated records. No transitive closure.
 */
export function institutionalDossier(data: Dataset, institutionId: string) {
  const entities = new Map(data.entities.map((e) => [e.id, e]));
  const institution = entities.get(institutionId);
  if (!institution || institution.type !== 'organisation') return null;
  const direct = data.claims.filter((c) => relatedTo(c, institutionId));
  // Navigation follows explicit institutional edges, never shared people or
  // chronology. Neighbour records remain in their own dossiers.
  const institutionalRelations = new Set([
    'combined_into',
    'acquired',
    'unit_of',
    'separation_announced',
    'name_transition_announced',
  ]);
  const institutionLinks = sorted(direct).flatMap((claim) => {
    if (
      !institutionalRelations.has(claim.predicate) ||
      claim.object.kind !== 'entity'
    )
      return [];
    const otherId =
      claim.subject === institutionId ? claim.object.entityId : claim.subject;
    const entity = entities.get(otherId);
    return entity?.type === 'organisation' && otherId !== institutionId
      ? [{ entity, claim }]
      : [];
  });
  const peopleIds = new Set(
    direct
      .filter(
        (c) =>
          personnel.has(c.predicate) &&
          entities.get(c.subject)?.type === 'person',
      )
      .map((c) => c.subject),
  );
  const people = data.claims.filter(
    (c) => peopleIds.has(c.subject) && personnel.has(c.predicate),
  );
  const roots = data.claims.filter(
    (c) =>
      c.object.kind === 'entity' &&
      ((c.predicate === 'authored' && peopleIds.has(c.subject)) ||
        (c.predicate === 'published' && c.subject === institutionId)),
  );
  const documentIds = new Set(
    roots.flatMap((c) =>
      c.object.kind === 'entity' ? [c.object.entityId] : [],
    ),
  );
  const links = data.claims.filter(
    (c) =>
      documentary.has(c.predicate) &&
      (documentIds.has(c.subject) ||
        (c.object.kind === 'entity' && documentIds.has(c.object.entityId))),
  );
  // Incoming citations retain the citing document as the subject. Its publisher
  // and concept discussion orient the reader without following another citation hop.
  const contextDocuments = new Set(
    links
      .filter((c) => entities.get(c.subject)?.type === 'document')
      .map((c) => c.subject),
  );
  const ideas = data.claims.filter(
    (c) =>
      (roots.includes(c) && c.topic === 'ideas') ||
      links.includes(c) ||
      (c.predicate === 'published' &&
        c.object.kind === 'entity' &&
        contextDocuments.has(c.object.entityId)) ||
      (c.predicate === 'discusses' && contextDocuments.has(c.subject)),
  );
  const versionIds = new Set(
    data.entities
      .filter((e) => e.documentVersion?.publisherId === institutionId)
      .map((e) => e.id),
  );
  const governance = data.claims.filter(
    (c) =>
      c.topic === 'governance' &&
      !isProvisionRecord(c) &&
      (relatedTo(c, institutionId) ||
        versionIds.has(c.subject) ||
        (c.object.kind === 'entity' && versionIds.has(c.object.entityId))),
  );
  const capital = direct.filter(
    (c) => c.topic === 'capital' || c.topic === 'compute',
  );
  const chronology = sorted([
    ...new Map([...direct, ...governance].map((c) => [c.id, c])).values(),
  ]);
  const claims = sorted([
    ...new Map(
      [...chronology, ...people, ...ideas, ...capital].map((c) => [c.id, c]),
    ).values(),
  ]);
  const evidenceIds = new Set(claims.flatMap((c) => c.evidenceIds));
  const evidence = data.evidence
    .filter((e) => evidenceIds.has(e.id))
    .sort((a, b) => a.id.localeCompare(b.id));
  const sourceIds = new Set(evidence.map((e) => e.sourceId));
  const dates = claims
    .flatMap((c) =>
      c.time.kind === 'interval'
        ? [c.time.from, c.time.until].filter((d): d is string => !!d)
        : dateOf(c)
          ? [dateOf(c)!]
          : [],
    )
    .sort();
  const groupBy = (
    records: Claim[],
    key: (c: Claim) => string,
  ): DossierGroup[] => {
    const groups = new Map<string, Claim[]>();
    for (const c of sorted(records)) {
      const id = key(c);
      groups.set(id, [...(groups.get(id) ?? []), c]);
    }
    return [...groups].map(([id, items]) => ({
      id,
      label: entities.get(id)?.name ?? id,
      entity: entities.get(id),
      claims: items,
    }));
  };
  const sections: Record<DossierSection, DossierGroup[]> = {
    chronology: groupBy(
      chronology,
      (c) => dateOf(c)?.slice(0, 4) ?? 'Date unknown',
    ),
    people: groupBy(people, (c) => c.subject),
    ideas: groupBy(ideas, (c) =>
      c.predicate === 'authored' || c.predicate === 'published'
        ? c.object.kind === 'entity'
          ? c.object.entityId
          : c.subject
        : c.subject,
    ),
    capital: groupBy(capital, (c) =>
      c.subject === institutionId
        ? c.object.kind === 'entity'
          ? c.object.entityId
          : institutionId
        : c.subject,
    ),
    governance: groupBy(governance, (c) =>
      c.subject === institutionId && c.object.kind === 'entity'
        ? c.object.entityId
        : c.subject,
    ),
  };
  const founders = new Set(
    direct.filter((c) => c.predicate === 'co_founded').map((c) => c.subject),
  );
  sections.people.sort(
    (a, b) =>
      Number(founders.has(b.id)) - Number(founders.has(a.id)) ||
      a.label.localeCompare(b.label),
  );
  for (const group of sections.ideas) {
    // Prefer a direct publication to a person's authorship when both explain inclusion.
    const root =
      sorted(roots).find(
        (c) =>
          c.predicate === 'published' &&
          c.subject === institutionId &&
          c.object.kind === 'entity' &&
          c.object.entityId === group.id,
      ) ??
      sorted(roots).find(
        (c) => c.object.kind === 'entity' && c.object.entityId === group.id,
      ) ??
      sorted(roots).find(
        (r) =>
          r.object.kind === 'entity' &&
          links.some(
            (c) =>
              c.subject === group.id &&
              c.object.kind === 'entity' &&
              c.object.entityId ===
                (r.object.kind === 'entity' ? r.object.entityId : ''),
          ),
      );
    if (root) {
      const membershipRank = (c: Claim) =>
        c.predicate === 'co_founded' ? 0 : c.predicate === 'held_role' ? 1 : 2;
      const membership = sorted(direct)
        .sort((a, b) => membershipRank(a) - membershipRank(b))
        .find((c) => c.subject === root.subject && personnel.has(c.predicate));
      group.connectionClaims = [...(membership ? [membership] : []), root];
    }
  }
  return {
    institution,
    institutionLinks,
    claims,
    sections,
    sourceIds: [...sourceIds].sort(),
    evidence,
    coverage: {
      from: dates[0],
      until: dates.at(-1),
      unknown: claims.filter((c) => c.time.kind === 'unknown').length,
    },
    versions: data.entities
      .filter((e) => versionIds.has(e.id))
      .sort((a, b) => a.id.localeCompare(b.id)),
    connections: Object.fromEntries(
      claims.map((c) => [
        c.id,
        direct.includes(c)
          ? 'Record about this institution'
          : people.includes(c)
            ? 'Same person · record at another institution'
            : governance.includes(c)
              ? 'Record about this institution’s framework'
              : roots.includes(c)
                ? 'Written by a person in this dossier'
                : 'Related document · no adoption implied',
      ]),
    ),
  };
}
export type InstitutionalDossier = NonNullable<
  ReturnType<typeof institutionalDossier>
>;
