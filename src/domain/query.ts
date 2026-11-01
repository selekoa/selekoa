import type { Claim, Dataset, Entity, Evidence, Source } from './schema';
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
/**
 * The stored time of a claim alone, as review packs print it. Reader-facing
 * text uses `timeLabel`, which reads an open-ended role differently.
 */
export function storedTimeLabel(claim: Claim): string {
  if (claim.time.kind === 'unknown') return 'Date unknown';
  if (claim.time.kind === 'interval')
    return `${claim.time.from ?? 'Unknown start'} → ${claim.time.until ?? 'End unknown'}`;
  return `${claim.time.date} · ${claim.time.kind === 'snapshot' ? 'snapshot' : (claim.time.basis ?? 'event')}`;
}

/** Predicates whose records are a person's role at an institution. */
export const rolePredicates: ReadonlySet<Claim['predicate']> = new Set([
  'held_role',
]);

/**
 * The records a time label reads: the dataset, or an export that carries a
 * claim's evidence, sources and named entities (a starter or a packet).
 */
export type LabelRecords = {
  evidence: readonly Pick<Evidence, 'claimId' | 'sourceId' | 'support'>[];
  sources: readonly Pick<
    Source,
    'id' | 'title' | 'documentId' | 'publicationDate' | 'versionDate'
  >[];
  entities: readonly Pick<Entity, 'id' | 'name'>[];
};

type LabelIndex = {
  of: LabelRecords;
  evidence: Map<string, LabelRecords['evidence'][number][]>;
  sources: Map<string, LabelRecords['sources'][number]>;
  entities: Map<string, LabelRecords['entities'][number]>;
};
// Built from relation fields alone (IDs), which a page's slice always holds
// (src/domain/slices.ts), so one index serves every page drawn from the
// same records without counting reads for any of them.
const labelIndexes = new WeakMap<object, LabelIndex>();
function labelIndex(records: LabelRecords): LabelIndex {
  const held = labelIndexes.get(records.evidence);
  if (
    held &&
    held.of.sources === records.sources &&
    held.of.entities === records.entities
  )
    return held;
  const evidence = new Map<string, LabelRecords['evidence'][number][]>();
  for (const e of records.evidence) {
    const items = evidence.get(e.claimId);
    if (items) items.push(e);
    else evidence.set(e.claimId, [e]);
  }
  const index = {
    of: {
      evidence: records.evidence,
      sources: records.sources,
      entities: records.entities,
    },
    evidence,
    sources: new Map(records.sources.map((s) => [s.id, s])),
    entities: new Map(records.entities.map((e) => [e.id, e])),
  };
  labelIndexes.set(records.evidence, index);
  return index;
}

/** Whether a claim is a role with a stated start and no stated end. */
export function isOpenRole(claim: Claim) {
  return (
    rolePredicates.has(claim.predicate) &&
    claim.time.kind === 'interval' &&
    !!claim.time.from &&
    !claim.time.until
  );
}

/**
 * For an open-ended role: the latest dated document among the sources whose
 * evidence supports the record, with that source's own date (publication
 * date, else version date). The name is the source's document record where it
 * has one and the export holds it, else the source title. Null when no
 * supporting source carries a date; undefined for any other record.
 * Maintainer decision of 2026-10-31 (review/people-admission-2026-10-31.md).
 */
export function roleStatedIn(records: LabelRecords, claim: Claim) {
  if (!isOpenRole(claim)) return undefined;
  const index = labelIndex(records);
  let latest: { source: LabelRecords['sources'][number]; date: string } | null =
    null;
  for (const e of index.evidence.get(claim.id) ?? []) {
    if (e.support !== 'supports') continue;
    const source = index.sources.get(e.sourceId);
    const date = source && (source.publicationDate ?? source.versionDate);
    if (
      date &&
      (!latest ||
        date > latest.date ||
        (date === latest.date && source.id < latest.source.id))
    )
      latest = { source, date };
  }
  if (!latest) return null;
  const { source, date } = latest;
  const document = source.documentId
    ? index.entities.get(source.documentId)
    : undefined;
  return {
    sourceId: source.id,
    documentId: source.documentId,
    name: document?.name ?? source.title,
    date,
  };
}

/**
 * A claim's time as readers see it. An open-ended role reads “from <start>
 * (stated in <document>, <date>)”, or “from <start> (end not recorded)” when
 * no supporting source is dated; it never reads “present”. Every other record
 * reads as stored (`storedTimeLabel`).
 */
export function timeLabel(claim: Claim, records: LabelRecords): string {
  const stated = roleStatedIn(records, claim);
  if (stated === undefined) return storedTimeLabel(claim);
  const from = (claim.time as { from: string }).from;
  return stated
    ? `from ${from} (stated in ${stated.name}, ${stated.date})`
    : `from ${from} (end not recorded)`;
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
