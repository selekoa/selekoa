import type { Claim, Dataset, Entity, Source } from './schema';
import type { Predicate } from './predicates';
import { dateOf, relatedTo } from './query';
import { latestPossibleDay, readingDates } from './research-path';

/** Predicates that place a person at an institution; never derived from others. */
export const pathPredicates: readonly Predicate[] = [
  'held_role',
  'co_founded',
  'departure_announced',
  'launched',
];

export type ProfileGap = {
  id:
    | 'snapshots'
    | 'open-intervals'
    | 'no-start'
    | 'undated'
    | 'retrospective'
    | 'unknown-publication'
    | 'no-end-or-departure';
  text: string;
  claimIds: string[];
};

const byDate = (a: Claim, b: Claim) =>
  (dateOf(a) ?? '').localeCompare(dateOf(b) ?? '') || a.id.localeCompare(b.id);

const plural = (n: number, one: string, many: string) =>
  `${n} ${n === 1 ? one : many}`;

const earliestPossibleDay = (date: string) =>
  date.length === 4 ? date + '-01-01' : date.length === 7 ? date + '-01' : date;

/**
 * Record and documentation dates. A source counts as retrospective only when
 * its earliest possible publication day is after the latest possible day of
 * the record (an interval's stated end). Open intervals are never retrospective.
 */
export function documentationDates(data: Dataset, claim: Claim) {
  const dates = readingDates(data, claim);
  if (claim.time.kind !== 'interval' || !claim.time.until) return dates;
  const end = latestPossibleDay(claim.time.until);
  return {
    ...dates,
    publications: dates.publications.map((p) => ({
      ...p,
      retrospective: !!p.date && earliestPossibleDay(p.date) > end,
    })),
  };
}

/**
 * A person's documented record: a pure projection of stored claims in which
 * the person is subject or object. Nothing is inferred: no transition between
 * roles, no tenure from a snapshot, no end from a missing end.
 */
export function personProfile(data: Dataset, personId: string) {
  const person = data.entities.find(
    (e) => e.id === personId && e.type === 'person',
  );
  if (!person) return null;
  const entities = new Map(data.entities.map((e) => [e.id, e]));
  const sources = new Map(data.sources.map((s) => [s.id, s]));
  const related = data.claims.filter((c) => relatedTo(c, personId));
  const pathClaims = related.filter(
    (c) => c.subject === personId && pathPredicates.includes(c.predicate),
  );
  const entry = (claim: Claim) => ({
    claim,
    institution:
      claim.object.kind === 'entity'
        ? (entities.get(claim.object.entityId) as Entity)
        : undefined,
    dates: documentationDates(data, claim),
  });
  const path = pathClaims
    .filter((c) => c.time.kind !== 'unknown')
    .sort(byDate)
    .map(entry);
  const undated = pathClaims
    .filter((c) => c.time.kind === 'unknown')
    .map(entry)
    .sort(
      (a, b) =>
        (a.institution?.name ?? '').localeCompare(b.institution?.name ?? '') ||
        a.claim.id.localeCompare(b.claim.id),
    );
  const works = related
    .filter((c) => c.predicate === 'authored' && c.subject === personId)
    .sort(byDate);
  const creditsTo = related
    .filter(
      (c) =>
        c.predicate === 'explicitly_credits' &&
        c.object.kind === 'entity' &&
        c.object.entityId === personId,
    )
    .sort(byDate);
  const governance = related
    .filter((c) => c.topic === 'governance')
    .sort(byDate);
  const shown = new Set(
    [...pathClaims, ...works, ...creditsTo, ...governance].map((c) => c.id),
  );
  const other = related.filter((c) => !shown.has(c.id)).sort(byDate);
  const claimIds = [
    ...new Set(
      [
        ...path.map((e) => e.claim),
        ...undated.map((e) => e.claim),
        ...works,
        ...creditsTo,
        ...governance,
        ...other,
      ].map((c) => c.id),
    ),
  ];
  return {
    person,
    identitySources: person.sourceIds.map((id) => sources.get(id)!),
    path,
    undated,
    works,
    creditsTo,
    governance,
    other,
    claimIds,
    gaps: profileGaps(data, [...path, ...undated], sources),
  };
}

export type PersonProfile = NonNullable<ReturnType<typeof personProfile>>;
export type PathEntry = PersonProfile['path'][number];

/** "What this record cannot tell you": computed from the stored records only. */
function profileGaps(
  data: Dataset,
  entries: { claim: Claim; dates: ReturnType<typeof documentationDates> }[],
  sources: Map<string, Source>,
): ProfileGap[] {
  const gaps: ProfileGap[] = [];
  const add = (id: ProfileGap['id'], claims: Claim[], text: string) => {
    if (claims.length)
      gaps.push({ id, text, claimIds: claims.map((c) => c.id) });
  };
  const claims = entries.map((e) => e.claim);
  const snapshots = claims.filter((c) => c.time.kind === 'snapshot');
  add(
    'snapshots',
    snapshots,
    `${plural(snapshots.length, 'record reports', 'records report')} a role or state at a single date. A snapshot establishes neither when the role began nor when it ended.`,
  );
  const open = claims.filter(
    (c) => c.time.kind === 'interval' && c.time.from && !c.time.until,
  );
  add(
    'open-intervals',
    open,
    `${plural(open.length, 'interval has', 'intervals have')} a recorded start but no recorded end. The end is unknown; this is not evidence that the role continues.`,
  );
  const noStart = claims.filter(
    (c) => c.time.kind === 'interval' && !c.time.from && c.time.until,
  );
  add(
    'no-start',
    noStart,
    `${plural(noStart.length, 'interval has', 'intervals have')} a recorded end but no recorded start.`,
  );
  const undated = claims.filter((c) => c.time.kind === 'unknown');
  add(
    'undated',
    undated,
    `${plural(undated.length, 'record has', 'records have')} no defensible date. ${undated.length === 1 ? 'It is' : 'They are'} listed under Undated and cannot be placed in sequence with the dated records.`,
  );
  const retrospective = entries
    .filter((e) => e.dates.publications.some((p) => p.retrospective))
    .map((e) => e.claim);
  add(
    'retrospective',
    retrospective,
    `${plural(retrospective.length, 'record rests', 'records rest')} on sources published after the date or period described. Later accounts can compress, omit or re-title earlier roles.`,
  );
  const unknownPublication = claims.filter((c) =>
    data.evidence.some(
      (e) =>
        e.claimId === c.id && sources.get(e.sourceId)?.publicationDate === null,
    ),
  );
  add(
    'unknown-publication',
    unknownPublication,
    `${plural(unknownPublication.length, 'record cites', 'records cite')} a source whose publication date is unknown, so when the account was written cannot be established.`,
  );
  // Institutions for which no record states an end boundary or a departure.
  const byInstitution = new Map<string, Claim[]>();
  for (const c of claims)
    if (c.object.kind === 'entity')
      byInstitution.set(c.object.entityId, [
        ...(byInstitution.get(c.object.entityId) ?? []),
        c,
      ]);
  const unbounded = [...byInstitution.entries()].filter(
    ([, group]) =>
      !group.some(
        (c) =>
          c.predicate === 'departure_announced' ||
          (c.time.kind === 'interval' && c.time.until),
      ),
  );
  if (unbounded.length)
    add(
      'no-end-or-departure',
      unbounded.flatMap(([, group]) => group),
      `No end date or departure announcement is recorded for ${unbounded
        .map(([id]) => data.entities.find((e) => e.id === id)!.name)
        .join(
          ', ',
        )}. That is a coverage gap: it does not mean the person remained.`,
    );
  return gaps;
}
