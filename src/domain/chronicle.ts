/**
 * The chronicle: every dated record, one page per year (`/year/<yyyy>`), with
 * an index of the years (`/years`). Built from the records alone; the pages
 * add no narrative. A record keeps its date's kind (event, publication,
 * announcement, effective date, snapshot, interval) and its precision (day,
 * month or year), and sits under the year or month its date gives, never on
 * an invented day. Dates a party states as targets, deadlines or terms, and
 * dates of application after the latest source check, are listed apart from
 * the year's records: they are what a source states, not dated records of
 * what happened. Topics are the claims' own (`topic`), so records admitted
 * later appear without a change here.
 *
 * Which years exist, how many records each topic has in each year and which
 * records state a date for a year are computed by the build from the whole
 * dataset and given to any part of it (src/domain/collection-index.ts), so
 * that a year page drawn from its slice, and the index page, show what the
 * whole dataset gives.
 */
import type { Claim, Dataset, Entity } from './schema';
import type { Topic } from './predicates';
import { isProvisionRecord } from './query';
import { allEarliestMarks, type EarliestMark } from './propositions';
import { selected } from './memo';
import {
  isScheduled,
  chronicleIndexOf,
  chronicleTopicLabels,
  dateRoleLabels,
  placements,
  precisionOf,
  yearOf,
  yearTopics,
  yearTotal,
  type DateRole,
  type Precision,
} from './chronicle-index';

export * from './chronicle-index';

export type ChronicleRecord = {
  kind: 'record';
  key: string;
  claim: Claim;
  date: string;
  /** An interval's end, where it ends in the same year. */
  until: string | null;
  role: DateRole;
  precision: Precision;
  subject: Entity;
  /** The stage a record states (an announcement, a plan), if any. */
  stage: string | null;
  /** Earliest located marks the propositions collections give the record. */
  marks: EarliestMark[];
};

/**
 * Provision records of one text sharing one date: one entry, counted and
 * linked to the text's page, which lists them.
 */
export type ChronicleProvisions = {
  kind: 'provisions';
  key: string;
  claims: Claim[];
  date: string;
  /** An interval's end, where it ends in the same year. */
  until: string | null;
  role: DateRole;
  precision: Precision;
  subject: Entity;
};

export type ChronicleEntry = ChronicleRecord | ChronicleProvisions;

export type ChronicleMonth = {
  /** `year` for records dated to the year only, else the month (`03`). */
  id: string;
  heading: string;
  entries: ChronicleEntry[];
};

export type ChronicleSection = {
  topic: Topic;
  label: string;
  /** Records placed, counting each provision record. */
  records: number;
  months: ChronicleMonth[];
};

export type ChronicleStated = {
  key: string;
  claim: Claim;
  /** As stated, at its precision. */
  date: string;
  wording: string | null;
  label: string;
  statedBy: Entity | null;
  /** A record's own date after its sources were last checked, not a stated date. */
  scheduled: boolean;
};

const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const statedDateLabels: Record<string, string> = {
  target_operation: 'Operation target',
  target_completion: 'Completion target',
  construction_start_target: 'Construction start target',
  delivery_target: 'Delivery target',
  launch_target: 'Launch target',
  deadline: 'Deadline',
  contract_term: 'Contract runs until',
  construction_start_stated: 'Construction start reported',
  operational_stated: 'Operation start reported',
};

const stageLabels: Record<string, string> = {
  proposed: 'proposed',
  announced: 'announced',
  reported_performed: 'reported as performed',
  planned: 'plan',
  committed: 'commitment',
  contracted: 'contract',
  letter_of_intent: 'letter of intent',
  term_sheet: 'term sheet',
  closed: 'closed',
  operational: 'stated as in operation',
  preliminary: 'preliminary award',
  final: 'final award',
  disbursed: 'disbursed',
};

/** The stage a record states, in the record's own terms. */
function stageOf(claim: Claim): string | null {
  const a = claim.attributes;
  const stage = a?.activityStage ?? a?.awardStage ?? a?.transactionStage;
  return stage ? (stageLabels[stage] ?? stage.replaceAll('_', ' ')) : null;
}

const byDate = (
  a: { date: string; key: string },
  b: { date: string; key: string },
) => a.date.localeCompare(b.date) || a.key.localeCompare(b.key);

/**
 * One year's records, by topic and month, with the dates stated for it kept
 * apart. With a topic, only that topic's records and stated dates.
 */
export function yearView(data: Dataset, year: number, topic: Topic | null) {
  const index = chronicleIndexOf(data);
  const at = index.years.findIndex((y) => y.year === year);
  if (at < 0) throw new Error(`No chronicle year ${year}`);
  const summary = index.years[at];
  const entities = new Map(data.entities.map((e) => [e.id, e]));
  const marks = new Map<string, EarliestMark[]>();
  for (const mark of allEarliestMarks(data))
    marks.set(mark.claimId, [...(marks.get(mark.claimId) ?? []), mark]);
  const records: ChronicleRecord[] = [];
  const provisions = new Map<string, ChronicleProvisions>();
  const shown = topic ? [topic] : yearTopics(summary);
  for (const claim of data.claims) {
    if (!shown.includes(claim.topic)) continue;
    for (const p of placements(claim)) {
      if (yearOf(p.date) !== year || isScheduled(index, claim.id, p.date))
        continue;
      const subject = entities.get(claim.subject)!;
      const base = {
        date: p.date,
        until: p.until ?? null,
        role: p.role,
        precision: precisionOf(p.date),
        subject,
      };
      // A contested or unresolved record, and an assessment of a provision,
      // is listed on its own, with its status.
      if (
        isProvisionRecord(claim) &&
        claim.resolution === 'supported' &&
        claim.predicate !== 'provision_assessed'
      ) {
        const key = `${claim.topic} ${claim.subject} ${p.date} ${p.role}`;
        const group = provisions.get(key);
        if (group) group.claims.push(claim);
        else
          provisions.set(key, {
            kind: 'provisions',
            key: `provisions-${claim.subject}-${p.date}-${p.role}`,
            claims: [claim],
            ...base,
          });
        continue;
      }
      records.push({
        kind: 'record',
        key: `${claim.id}-${p.role}`,
        claim,
        stage: stageOf(claim),
        marks: marks.get(claim.id) ?? [],
        ...base,
      });
    }
  }
  // Provision records are counted and linked, not drawn one by one: the
  // page selects them by their relations alone (src/domain/memo.ts).
  for (const group of provisions.values()) selected('claims', group.claims);
  const entries: ChronicleEntry[] = [...records, ...provisions.values()].sort(
    byDate,
  );
  const sections: ChronicleSection[] = shown.map((t) => {
    const own = entries.filter((e) =>
      e.kind === 'record' ? e.claim.topic === t : e.claims[0].topic === t,
    );
    const months: ChronicleMonth[] = [];
    for (const entry of own) {
      const id = entry.precision === 'year' ? 'year' : entry.date.slice(5, 7);
      let month = months.at(-1);
      if (month?.id !== id)
        months.push(
          (month = {
            id,
            heading:
              id === 'year'
                ? `Dated to ${year} only`
                : `${monthNames[Number(id) - 1]} ${year}`,
            entries: [],
          }),
        );
      month.entries.push(entry);
    }
    return {
      topic: t,
      label: chronicleTopicLabels[t],
      records: summary.topics[t] ?? 0,
      months,
    };
  });
  const statedIds = (index.statedBy.find(([y]) => y === year)?.[1] ?? [])
    .filter(([, t]) => !topic || t === topic)
    .map(([id]) => id);
  const claims = new Map(data.claims.map((c) => [c.id, c]));
  const stated: ChronicleStated[] = [];
  for (const id of statedIds) {
    const claim = claims.get(id)!;
    for (const p of placements(claim))
      if (yearOf(p.date) === year && isScheduled(index, id, p.date))
        stated.push({
          key: `${id}-${p.role}`,
          claim,
          date: p.date,
          wording: null,
          label: `Scheduled date · ${dateRoleLabels[p.role]}`,
          statedBy: null,
          scheduled: true,
        });
    (claim.attributes?.statedDates ?? []).forEach((d, i) => {
      // A date kept only in words, with no year, places nothing.
      if (!d.date || yearOf(d.date) !== year) return;
      stated.push({
        key: `${id}-stated-${i}`,
        claim,
        date: d.date,
        wording: d.wording ?? null,
        label: statedDateLabels[d.kind] ?? d.kind.replaceAll('_', ' '),
        statedBy: entities.get(d.statedBy) ?? null,
        scheduled: false,
      });
    });
  }
  stated.sort(byDate);
  return {
    year,
    topic,
    summary,
    previous: index.years[at - 1]?.year ?? null,
    next: index.years[at + 1]?.year ?? null,
    topics: yearTopics(summary),
    total: yearTotal(summary),
    sections,
    stated,
  };
}

export type YearView = ReturnType<typeof yearView>;
