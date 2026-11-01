/**
 * The chronicle's index and its dates (src/domain/chronicle.ts): which years
 * have pages, each year's counts by topic, which records state a date for a
 * year, and how a record's date places it. Light, with no other domain
 * module, so that addresses and the claim panel can use it on any page.
 */
import type { Claim, Dataset } from './schema';
import { topics, type Topic } from './predicates';

export const chronicleTopicLabels: Record<Topic, string> = {
  people: 'People',
  institutions: 'Institutions',
  ideas: 'Ideas & lineages',
  capital: 'Capital',
  compute: 'Compute',
  governance: 'Governance',
};

export const isTopic = (value: string): value is Topic =>
  (topics as readonly string[]).includes(value);

/** What a placed date is: the date's kind, or the end of an interval it marks. */
export type DateRole =
  | 'event'
  | 'publication'
  | 'effective'
  | 'revision'
  | 'announcement'
  | 'signature'
  | 'snapshot'
  | 'interval'
  | 'interval-start'
  | 'interval-end';

export const dateRoleLabels: Record<DateRole, string> = {
  event: 'event',
  publication: 'publication',
  effective: 'effective',
  revision: 'revision',
  announcement: 'announcement',
  signature: 'signature',
  snapshot: 'snapshot',
  interval: 'interval',
  'interval-start': 'interval begins',
  'interval-end': 'interval ends',
};

export type Precision = 'day' | 'month' | 'year';
export const precisionOf = (date: string): Precision =>
  date.length === 4 ? 'year' : date.length === 7 ? 'month' : 'day';
export const precisionLabels: Record<Precision, string> = {
  day: 'dated to the day',
  month: 'dated to the month',
  year: 'dated to the year',
};

/**
 * One date of a record, as stored, with its kind; for an interval within
 * one year, its end as well.
 */
export type Placement = { date: string; role: DateRole; until?: string };

/**
 * The dates that place a record in the chronicle: an event's or snapshot's
 * date, or an interval's start and end (one placement when both fall in one
 * year). An unknown date places nothing.
 */
export function placements(claim: Pick<Claim, 'time'>): Placement[] {
  const t = claim.time;
  if (t.kind === 'event') return [{ date: t.date, role: t.basis ?? 'event' }];
  if (t.kind === 'snapshot') return [{ date: t.date, role: 'snapshot' }];
  if (t.kind === 'interval') {
    if (t.from && t.until && t.from.slice(0, 4) === t.until.slice(0, 4))
      return [{ date: t.from, role: 'interval', until: t.until }];
    return [
      ...(t.from ? [{ date: t.from, role: 'interval-start' as const }] : []),
      ...(t.until ? [{ date: t.until, role: 'interval-end' as const }] : []),
    ];
  }
  return [];
}

export const yearOf = (date: string) => Number(date.slice(0, 4));

/**
 * Whether a date lies wholly after a check date: a stated date of
 * application, such as a law's, not yet reached when the record's sources
 * were last checked. A date that may be the check date or earlier is not
 * after it.
 */
export function after(date: string, check: string) {
  const [y, m, d] = date.split('-');
  const earliest = `${y}-${m ?? '01'}-${d ?? '01'}`;
  return earliest > check;
}

export type ChronicleYear = {
  year: number;
  /** Records placed in the year, by topic (scheduled dates excluded). */
  topics: Partial<Record<Topic, number>>;
  /** Dates stated for the year, and scheduled dates in it. */
  stated: number;
};

export type ChronicleIndex = {
  /**
   * Scheduled dates, as `<claim id>@<date>`: a record's own date that lies
   * after the latest check of the record's own evidence, such as a law's
   * date of effect. They are listed with the stated dates, not as records.
   */
  scheduled: string[];
  /** Every year with a placed record or a stated date, earliest first. */
  years: ChronicleYear[];
  /**
   * Records that state a date for the year or are scheduled in it, by year,
   * with each record's topic.
   */
  statedBy: [number, [string, Topic][]][];
};

/** The chronicle's index, computed from the whole dataset. */
export function chronicleIndex(data: Dataset): ChronicleIndex {
  const checked = new Map<string, string>();
  for (const e of data.evidence)
    if ((checked.get(e.claimId) ?? '') < e.checkedAt)
      checked.set(e.claimId, e.checkedAt);
  const scheduled: string[] = [];
  const years = new Map<number, ChronicleYear>();
  const at = (year: number) => {
    let y = years.get(year);
    if (!y) years.set(year, (y = { year, topics: {}, stated: 0 }));
    return y;
  };
  const stated = new Map<number, Map<string, Topic>>();
  const state = (year: number, claim: Claim) => {
    at(year).stated += 1;
    stated.set(
      year,
      (stated.get(year) ?? new Map()).set(claim.id, claim.topic),
    );
  };
  for (const claim of data.claims) {
    for (const p of placements(claim)) {
      const year = yearOf(p.date);
      if (after(p.date, checked.get(claim.id)!)) {
        scheduled.push(scheduledKey(claim.id, p.date));
        state(year, claim);
      } else {
        const y = at(year);
        y.topics[claim.topic] = (y.topics[claim.topic] ?? 0) + 1;
      }
    }
    for (const d of claim.attributes?.statedDates ?? [])
      if (d.date) state(yearOf(d.date), claim);
  }
  return {
    scheduled: scheduled.sort(),
    years: [...years.values()].sort((a, b) => a.year - b.year),
    statedBy: [...stated]
      .sort(([a], [b]) => a - b)
      .map(([year, ids]) => [
        year,
        [...ids].sort(([a], [b]) => a.localeCompare(b)),
      ]),
  };
}

export const scheduledKey = (claimId: string, date: string) =>
  `${claimId}@${date}`;

/** Whether a record's date is a scheduled date (see `scheduled`). */
export const isScheduled = (
  index: ChronicleIndex,
  claimId: string,
  date: string,
) => index.scheduled.includes(scheduledKey(claimId, date));

const indexes = new WeakMap<Dataset, ChronicleIndex>();

/**
 * Gives a dataset the chronicle's index computed from the whole dataset
 * (src/domain/collection-index.ts), for a page drawn from part of it.
 */
export function seedChronicleIndex(data: Dataset, index: ChronicleIndex) {
  indexes.set(data, index);
}

/** The chronicle's index: as given to a part, or computed once per dataset. */
export function chronicleIndexOf(data: Dataset): ChronicleIndex {
  let index = indexes.get(data);
  if (!index) indexes.set(data, (index = chronicleIndex(data)));
  return index;
}

export const chronicleYears = (data: Dataset) =>
  chronicleIndexOf(data).years.map((y) => y.year);

/** Records placed in a year, over every topic. */
export const yearTotal = (y: ChronicleYear) =>
  Object.values(y.topics).reduce((n, c) => n + (c ?? 0), 0);

/** The topics with records in a year, in the topics' order. */
export const yearTopics = (y: ChronicleYear) =>
  topics.filter((t) => (y.topics[t] ?? 0) > 0);

/** The address id of a year page: the year, or the year and one topic. */
export const yearPageId = (year: number, topic?: Topic | null) =>
  topic ? `${year}-${topic}` : String(year);

/** The year and topic an address id names, if the chronicle has that page. */
export function parseYearPageId(
  data: Dataset,
  id: string,
): { year: number; topic: Topic | null } | null {
  const match = /^(\d{4})(?:-([a-z]+))?$/.exec(id);
  if (!match) return null;
  const year = chronicleIndexOf(data).years.find(
    (y) => y.year === Number(match[1]),
  );
  if (!year) return null;
  if (!match[2]) return { year: year.year, topic: null };
  const topic = match[2];
  // A topic page exists only where the year has more than one topic.
  return isTopic(topic) &&
    (year.topics[topic] ?? 0) > 0 &&
    yearTopics(year).length > 1
    ? { year: year.year, topic }
    : null;
}

/** Every chronicle page's address id: each year, then its topic pages. */
export function yearPageIds(data: Dataset): string[] {
  return chronicleIndexOf(data).years.flatMap((y) => {
    const list = yearTopics(y);
    return [
      yearPageId(y.year),
      ...(list.length > 1 ? list.map((t) => yearPageId(y.year, t)) : []),
    ];
  });
}
