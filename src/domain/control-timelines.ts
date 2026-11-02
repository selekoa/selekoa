import type { Claim, Dataset, Entity } from './schema';
import {
  controlEntryLabels,
  controlStageLabels,
  controlEntries,
  type ControlEntryKind,
} from './control-structures';
import { controlStructures } from '../reading/control-structures';

/**
 * One organisation's row: the records of its control-structure page, or,
 * where it has none, stored records named in the definition.
 */
export type TimelineLane =
  | { organisationId: string; controlId: string }
  | { organisationId: string; claimIds: string[]; selection: string };

export type ControlTimelinesDefinition = {
  id: string;
  title: string;
  question: string;
  introduction: string;
  lanes: TimelineLane[];
  /** Kinds of control-structure records left to their own pages. */
  omittedKinds: ControlEntryKind[];
  limits: string[];
};

export type TimelineKind = ControlEntryKind | 'acquisition' | 'combination';

export const timelineKindLabels: Record<TimelineKind, string> = {
  ...controlEntryLabels,
  acquisition: 'Acquisition',
  combination: 'Combination of units',
};

/**
 * How a record marks its change: announced (or planned, or agreed), in
 * effect or completed, or neither, as for a snapshot or a document's date.
 */
export type TimelineStatus = 'announced' | 'effective' | 'dated';

export const timelineStatusLabels: Record<TimelineStatus, string> = {
  announced: 'Announced, planned or agreed',
  effective: 'In effect or completed',
  dated: 'Dated record',
};

export type DatePrecision = 'year' | 'month' | 'day';

export const precisionLabels: Record<DatePrecision, string> = {
  year: 'year',
  month: 'month',
  day: 'day',
};

/** The predicates of records named for a row without a control page. */
const namedKinds: Partial<Record<Claim['predicate'], TimelineKind>> = {
  acquired: 'acquisition',
  combined_into: 'combination',
  name_transition_announced: 'naming',
  converted_into: 'conversion',
  formed_entity: 'formation',
  has_legal_form: 'legal_form',
  holds_control_right: 'control',
  held_role: 'board',
  departure_announced: 'board',
};

/** Predicates whose records are announcements by definition. */
const announcing = new Set<Claim['predicate']>([
  'combined_into',
  'name_transition_announced',
  'departure_announced',
]);

/**
 * The status a record states, and the stage it names: a control stage where
 * it has one, else an announced activity or an announcement date, else an
 * effective date or a completed acquisition or conversion. Nothing else is
 * read as announced or in effect. A control right stated in effect in a
 * dated snapshot is a dated record.
 */
export function timelineStatus(claim: Claim): {
  status: TimelineStatus;
  stage: string;
} {
  const stage = claim.attributes?.control?.stage;
  // A snapshot of a control right is read from a document of that date; the
  // right may be older, so the snapshot is not shown as taking effect then
  // (maintainer decision of 2026-11-02 on the pre-launch audit, PA-17).
  if (stage === 'effective' && claim.time.kind === 'snapshot')
    return { status: 'dated', stage: 'Dated record' };
  if (stage)
    return {
      status: stage === 'effective' ? 'effective' : 'announced',
      stage: controlStageLabels[stage],
    };
  const basis = claim.time.kind === 'event' ? claim.time.basis : undefined;
  if (
    claim.attributes?.activityStage === 'announced' ||
    basis === 'announcement' ||
    announcing.has(claim.predicate)
  )
    return { status: 'announced', stage: 'Announced' };
  if (basis === 'effective') return { status: 'effective', stage: 'In effect' };
  if (claim.predicate === 'acquired' || claim.predicate === 'converted_into')
    return { status: 'effective', stage: 'Completed' };
  return { status: 'dated', stage: 'Dated record' };
}

export const precisionOf = (date: string): DatePrecision =>
  date.length === 4 ? 'year' : date.length === 7 ? 'month' : 'day';

/** The first and last instant of a stored date, in fractional years. */
export function dateExtent(date: string): [number, number] {
  const year = Number(date.slice(0, 4));
  const precision = precisionOf(date);
  if (precision === 'year') return [year, year + 1];
  const month = Number(date.slice(5, 7));
  if (precision === 'month')
    return [year + (month - 1) / 12, year + month / 12];
  const day = Number(date.slice(8, 10));
  const days = (Date.UTC(year + 1, 0, 1) - Date.UTC(year, 0, 1)) / 864e5;
  const ofYear =
    (Date.UTC(year, month - 1, day) - Date.UTC(year, 0, 1)) / 864e5;
  const at = year + (ofYear + 0.5) / days;
  return [at, at];
}

/** How the stored date is read: the date's kind and what it marks. */
export function dateKindLabel(claim: Claim): string {
  const t = claim.time;
  if (t.kind === 'unknown') return 'date unknown';
  if (t.kind === 'snapshot') return 'snapshot';
  if (t.kind === 'event') return t.basis ? `event · ${t.basis}` : 'event';
  if (t.from && t.until) return 'interval';
  return t.from
    ? 'interval start, end not recorded'
    : 'interval end, start not recorded';
}

export type TimelineEvent = {
  claim: Claim;
  organisation: Entity;
  kind: TimelineKind;
  status: TimelineStatus;
  /** The stored stage or the status it rests on ("Agreed in principle"). */
  stage: string;
  /** The date the record is placed at, as stored; null when undated. */
  date: string | null;
  /** The stored end of an interval with both ends. */
  until: string | null;
  precision: DatePrecision | null;
  dateKind: string;
  /** The date as a reader sees it: `2023-09-06 → end not recorded`. */
  dateText: string;
  /** Placement on the axis, in fractional years; a day has start = end. */
  start: number;
  end: number;
  /** The sub-row of the lane the mark is drawn in, from 0. */
  row: number;
};

/** The width a point or a narrow span takes when rows are packed, in years. */
const markWidth = 0.16;

function placed(
  claim: Claim,
  organisation: Entity,
  kind: TimelineKind,
): TimelineEvent {
  const { status, stage } = timelineStatus(claim);
  const t = claim.time;
  const from =
    t.kind === 'event' || t.kind === 'snapshot'
      ? t.date
      : t.kind === 'interval'
        ? (t.from ?? t.until ?? null)
        : null;
  const until = t.kind === 'interval' && t.from && t.until ? t.until : null;
  const [start] = from ? dateExtent(from) : [0];
  const end = from ? dateExtent(until ?? from)[1] : 0;
  const dateText = !from
    ? 'Date unknown'
    : t.kind !== 'interval'
      ? from
      : until
        ? `${from} → ${until}`
        : t.from
          ? `from ${from}, end not recorded`
          : `until ${from}, start not recorded`;
  return {
    claim,
    organisation,
    kind,
    status,
    stage,
    date: from,
    until,
    precision: from ? precisionOf(from) : null,
    dateKind: dateKindLabel(claim),
    dateText,
    start,
    end,
    row: 0,
  };
}

/** Places each mark in the first sub-row where it overlaps no other mark. */
function packRows(events: TimelineEvent[]) {
  const rowEnds: number[] = [];
  for (const event of events) {
    const point = event.start === event.end;
    const from = point ? event.start - markWidth / 2 : event.start;
    const right = point
      ? event.start + markWidth / 2
      : Math.max(event.end, event.start + markWidth);
    let row = rowEnds.findIndex((end) => end <= from);
    if (row === -1) row = rowEnds.length;
    rowEnds[row] = right + 0.02;
    event.row = row;
  }
  return Math.max(rowEnds.length, 1);
}

/**
 * The control timelines of several organisations on one axis. It returns
 * stored records only, placed at their stored dates and precision; it never
 * joins records across rows, and it counts nothing across organisations.
 */
export function controlTimelines(
  data: Dataset,
  definition: ControlTimelinesDefinition,
) {
  const entities = new Map(data.entities.map((e) => [e.id, e]));
  const claims = new Map(data.claims.map((c) => [c.id, c]));
  const omitted = new Set<TimelineKind>(definition.omittedKinds);
  const lanes = definition.lanes.map((lane) => {
    const organisation = entities.get(lane.organisationId);
    if (!organisation)
      throw new Error('Missing organisation: ' + lane.organisationId);
    let records: { claim: Claim; kind: TimelineKind }[];
    let collection = null;
    if ('controlId' in lane) {
      collection = controlStructures.find((c) => c.id === lane.controlId);
      if (!collection)
        throw new Error('Missing control structure: ' + lane.controlId);
      records = controlEntries(data, collection)
        .entries.filter((e) => !omitted.has(e.kind))
        .map((e) => ({ claim: e.claim, kind: e.kind as TimelineKind }));
    } else
      records = lane.claimIds.map((id) => {
        const claim = claims.get(id);
        if (!claim) throw new Error('Missing timeline claim: ' + id);
        const kind = namedKinds[claim.predicate];
        if (!kind)
          throw new Error(
            `Not a control-timeline record: ${id} (${claim.predicate})`,
          );
        return { claim, kind };
      });
    const all = records
      .map((r) => placed(r.claim, organisation, r.kind))
      .sort(
        (a, b) => a.start - b.start || a.claim.id.localeCompare(b.claim.id),
      );
    const events = all.filter((e) => e.date);
    const rows = packRows(events);
    return {
      lane,
      organisation,
      collection,
      selection: 'selection' in lane ? lane.selection : null,
      events,
      undated: all.filter((e) => !e.date),
      rows,
    };
  });
  const placedEvents = lanes.flatMap((l) => l.events);
  const first = Math.floor(Math.min(...placedEvents.map((e) => e.start)));
  const last = Math.floor(Math.max(...placedEvents.map((e) => e.end - 1e-9)));
  const years = Array.from({ length: last - first + 1 }, (_, i) => first + i);
  /** Runs of years in which a row has no record, merged. */
  const gaps = (events: TimelineEvent[]) => {
    const empty = years.filter((y) => !events.some((e) => inYear(e, y)));
    const runs: { from: number; to: number }[] = [];
    for (const y of empty) {
      const run = runs.at(-1);
      if (run && run.to === y - 1) run.to = y;
      else runs.push({ from: y, to: y });
    }
    return runs;
  };
  return {
    definition,
    years,
    lanes: lanes.map((l) => ({ ...l, gaps: gaps(l.events) })),
    claimIds: lanes.flatMap((l) =>
      [...l.events, ...l.undated].map((e) => e.claim.id),
    ),
  };
}

export type ControlTimelines = ReturnType<typeof controlTimelines>;
export type ControlTimelineLane = ControlTimelines['lanes'][number];

/** Whether a mark lies in a year: a band or span that touches it, or a day in it. */
export const inYear = (event: TimelineEvent, year: number) =>
  event.start < year + 1 && event.end > year;

/** The source addresses of a record: those of its supporting passages. */
function sourceUrls(data: Dataset, claim: Claim) {
  const evidence = data.evidence.filter((e) => e.claimId === claim.id);
  const supporting = evidence.filter((e) => e.support === 'supports');
  const urls = (supporting.length ? supporting : evidence).map(
    (e) => data.sources.find((s) => s.id === e.sourceId)?.canonicalUrl ?? '',
  );
  return [...new Set(urls.filter(Boolean))];
}

export const csvColumns = [
  'organisation',
  'date',
  'date_precision',
  'date_kind',
  'kind',
  'status',
  'stage',
  'statement',
  'record_id',
  'source_url',
] as const;

/**
 * The rows of the CSV download, one per record the page shows, in the
 * page's order: each organisation's dated records by date, then its undated
 * ones. Several source addresses are separated by " ; ".
 */
export function timelineRows(data: Dataset, view: ControlTimelines) {
  return view.lanes.flatMap((lane) =>
    [...lane.events, ...lane.undated].map((e) => ({
      organisation: e.organisation.name,
      date: e.until ? `${e.date}/${e.until}` : (e.date ?? ''),
      date_precision: e.precision ? precisionLabels[e.precision] : 'unknown',
      date_kind: e.dateKind,
      kind: timelineKindLabels[e.kind],
      status: timelineStatusLabels[e.status],
      stage: e.stage,
      statement: e.claim.statement,
      record_id: e.claim.id,
      source_url: sourceUrls(data, e.claim).join(' ; '),
    })),
  );
}

const cell = (value: string) => `"${value.replaceAll('"', '""')}"`;

/** The CSV text: a header row, then one quoted row per record. */
export function timelineCsv(data: Dataset, view: ControlTimelines) {
  return (
    [
      csvColumns.join(','),
      ...timelineRows(data, view).map((row) =>
        csvColumns.map((c) => cell(row[c])).join(','),
      ),
    ].join('\r\n') + '\r\n'
  );
}

/** Parses the CSV this module writes (quoted cells, CRLF rows). */
export function parseTimelineCsv(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let value = '';
  let quoted = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (quoted) {
      if (ch === '"' && text[i + 1] === '"') {
        value += '"';
        i++;
      } else if (ch === '"') quoted = false;
      else value += ch;
    } else if (ch === '"') quoted = true;
    else if (ch === ',') {
      row.push(value);
      value = '';
    } else if (ch === '\n') {
      row.push(value);
      rows.push(row);
      row = [];
      value = '';
    } else if (ch !== '\r') value += ch;
  }
  if (value || row.length) rows.push([...row, value]);
  return rows;
}
