import type { Claim, Dataset, Entity } from './schema';
import { propositionStances, type Topic } from './predicates';

export type Filters = {
  topic: Topic | 'all';
  throughYear: number;
  entityType: Entity['type'] | 'all' | 'structural';
  focusId: string | null;
  frameworkFamily?: string | null;
  /**
   * Keep proposition records. A search's timeline and map show every claim its
   * list shows, proposition records included.
   */
  propositions?: boolean;
};
export function dateOf(claim: Claim): string | undefined {
  return claim.time.kind === 'event' || claim.time.kind === 'snapshot'
    ? claim.time.date
    : claim.time.kind === 'interval'
      ? (claim.time.from ?? claim.time.until)
      : undefined;
}
export function timeLabel(claim: Claim): string {
  if (claim.time.kind === 'unknown') return 'Date unknown';
  if (claim.time.kind === 'interval')
    return `${claim.time.from ?? 'Unknown start'} → ${claim.time.until ?? 'End unknown'}`;
  return `${claim.time.date} · ${claim.time.kind === 'snapshot' ? 'snapshot' : (claim.time.basis ?? 'event')}`;
}
export function relatedTo(claim: Claim, entityId: string): boolean {
  return (
    claim.subject === entityId ||
    (claim.object.kind === 'entity' && claim.object.entityId === entityId)
  );
}
/**
 * Provision-level records of a framework edition: quoted provisions, recorded
 * absences and changes keyed to one provision. They belong to document pages
 * and histories, not to institution-level dossiers or paths.
 */
export function isProvisionRecord(claim: Claim) {
  return (
    claim.predicate === 'states_provision' ||
    claim.predicate === 'provision_not_found' ||
    claim.predicate === 'provision_assessed' ||
    (claim.predicate === 'changes_from' && !!claim.attributes?.provision)
  );
}
/**
 * How a text stands to a proposition (schema 2.11). These records belong to the
 * propositions collection and to document pages; the map leaves them out, since
 * a star of texts around a proposition says nothing about how the texts relate.
 */
export function isPropositionRecord(claim: Claim) {
  return claim.predicate in propositionStances;
}
export function relationshipClaims(claims: Claim[]) {
  return claims.filter(
    (
      claim,
    ): claim is Claim & { object: { kind: 'entity'; entityId: string } } =>
      claim.object.kind === 'entity',
  );
}
export function queryDataset(data: Dataset, filters: Filters) {
  const familyIds = filters.frameworkFamily
    ? new Set(
        data.entities
          .filter(
            (e) =>
              e.documentVersion?.family === filters.frameworkFamily ||
              (e.id === filters.frameworkFamily &&
                e.subtype === 'Framework family'),
          )
          .map((e) => e.id),
      )
    : null;
  let claims = data.claims.filter((c) => {
    const date = dateOf(c);
    return (
      (filters.propositions || !isPropositionRecord(c)) &&
      (filters.topic === 'all' || c.topic === filters.topic) &&
      (!familyIds ||
        familyIds.has(c.subject) ||
        (c.object.kind === 'entity' && familyIds.has(c.object.entityId))) &&
      (!date || Number(date.slice(0, 4)) <= filters.throughYear)
    );
  });
  if (filters.focusId)
    claims = claims.filter((c) => relatedTo(c, filters.focusId!));
  const used = new Set(
    claims.flatMap((c) => [
      c.subject,
      ...(c.object.kind === 'entity' ? [c.object.entityId] : []),
    ]),
  );
  // Keep the focus visible even when filters hide all its claims.
  if (filters.focusId) used.add(filters.focusId);
  let entities = data.entities.filter((e) => used.has(e.id));
  if (filters.entityType !== 'all') {
    entities = entities.filter(
      (e) =>
        (filters.entityType === 'structural'
          ? ['organisation', 'infrastructure', 'fund', 'public_body'].includes(
              e.type,
            )
          : e.type === filters.entityType) || e.id === filters.focusId,
    );
    const visible = new Set(entities.map((e) => e.id));
    claims = claims.filter(
      (c) =>
        visible.has(c.subject) &&
        (c.object.kind === 'literal' || visible.has(c.object.entityId)),
    );
    const endpoints = new Set(
      claims.flatMap((c) => [
        c.subject,
        ...(c.object.kind === 'entity' ? [c.object.entityId] : []),
      ]),
    );
    entities = entities.filter(
      (e) => endpoints.has(e.id) || e.id === filters.focusId,
    );
  }
  return { entities, claims };
}
export function searchEntities(data: Dataset, query: string): Entity[] {
  const terms = query.trim().toLocaleLowerCase().split(/\s+/).filter(Boolean);
  if (!terms.length) return [];
  return data.entities
    .filter((e) => {
      const haystack = [e.name, e.shortName ?? '', ...e.aliases]
        .join(' ')
        .toLocaleLowerCase();
      return terms.every((term) => haystack.includes(term));
    })
    .sort((a, b) => a.name.localeCompare(b.name));
}
/**
 * The largest set the relationship map draws. Above either limit the labels
 * and lines overlap too much to read, and the list stands in for the map.
 * A map centred on one record is a star: its leaves sit on rings around the
 * focus, so it stays legible at larger sizes than a search or topic map.
 * See review/launch-polish-2026-10-26.md and review/map-followup-2026-10-26.md
 * for the cases inspected.
 */
export const mapLimits = {
  unfocused: { records: 100, relationships: 150 },
  focused: { records: 150, relationships: 225 },
};
export function mapSize(view: { entities: unknown[]; claims: Claim[] }) {
  return {
    records: view.entities.length,
    relationships: view.claims.filter((c) => c.object.kind === 'entity').length,
  };
}
export function mapReadable(
  view: { entities: unknown[]; claims: Claim[] },
  focused: boolean,
) {
  const size = mapSize(view);
  const limit = focused ? mapLimits.focused : mapLimits.unfocused;
  return (
    size.records <= limit.records && size.relationships <= limit.relationships
  );
}
