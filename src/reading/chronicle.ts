import type { Topic } from '../domain/predicates';
import {
  chronicleTopicLabels,
  yearTopics,
  yearTotal,
  type ChronicleYear,
} from '../domain/chronicle-index';

/**
 * The chronicle's own words (src/domain/chronicle.ts). Everything else on its
 * pages is computed from the records: dates, counts, statements and marks.
 * No sentence here states a trend or a cause (src/domain/chronicle.test.ts).
 */
const plural = (n: number, one: string, many: string) =>
  `${n} ${n === 1 ? one : many}`;

export const chronicleText = {
  indexTitle: 'Browse by year',
  indexDescription:
    'Selekoa’s dated records, one page per year, each record with its date as the source gives it. Selective: what the records hold, not a history of any year.',
  indexLede:
    'Every year in which Selekoa holds a dated record or a stated date. Each year’s page lists its records in date order, grouped by topic.',
  /** The index's disclosure: what its counts show and do not show. */
  indexLimits: [
    'The counts are of records, not of events.',
    'Coverage is uneven across years and topics: a year or topic with few records may be one the records barely cover.',
  ],
  indexLimitsHeading: 'What this shows and does not show',
  selective: 'Selective: what the records hold, not a history of the year.',
  limitsHeading: 'How this page is made',
  limits: [
    'Each record keeps the kind of date its source gives: an event, a publication, an announcement, an effective date, a revision, a signature, a snapshot, or the start or end of an interval. A snapshot is one dated report of a state.',
    'A record dated only to a month sits under that month, before the records dated to a day. A record dated only to the year sits under the year, before the months. No day or month is added.',
    'An announcement records what a party stated. It does not show that anything was done, built or paid for.',
    'Dates a party states for a year are listed apart, after the records: targets, deadlines and terms, and dates stated in passing, such as a reported start of operation. So is a record’s own date that falls after its sources were last checked, such as a law’s date of effect. A stated date given only in words, with no year, is not listed.',
    'Records with an unknown date are not listed. A record with an interval appears in the year it starts and in the year it ends, or once, with both dates, when both fall in one year.',
    'Each provision of a text is a record of its own. Provisions sharing a text and a date are shown here as one entry, with their number, and listed on the text’s page; a contested or unresolved one is listed here on its own. The counts on this page include each provision record.',
    'The page lists the records by fixed rules, without selection or framing. Coverage is uneven across years and topics: a year or topic with few records may be one the records barely cover.',
  ],
  statedHeading: (year: number) => `Dates stated for ${year}`,
  statedNote:
    'Each date as its record gives it, with who stated it. A target, deadline or term says what a party said would happen; a reported date says what a party said happened; a scheduled date had not been reached when the record’s sources were last checked. None is a dated record of what happened.',
  noRecords: (year: number) =>
    `No dated records for ${year}. The records state dates for it, listed below.`,
  /** A year page's opening sentences, for a year with records. */
  lede: (y: ChronicleYear, topic: Topic | null, stated: number) => {
    const n = topic ? (y.topics[topic] ?? 0) : yearTotal(y);
    const what = topic
      ? `${chronicleTopicLabels[topic].toLowerCase()} ${n === 1 ? 'record' : 'records'}`
      : n === 1
        ? 'record'
        : 'records';
    return [
      `Selekoa’s ${n} ${what} dated ${y.year}, in date order${topic ? `, of ${yearTotal(y)} in all topics` : ', grouped by topic'}.`,
      stated
        ? `${plural(stated, 'stated date is', 'stated dates are')} listed apart.`
        : '',
    ]
      .filter(Boolean)
      .join(' ');
  },
  /** The title of a year with stated dates only. */
  statedOnlyTitle: (year: number) => `Dates stated for ${year}`,
};

/** A year's counts in one or two sentences, for a page's lede and description. */
export function yearCounts(y: ChronicleYear, topic: Topic | null): string {
  const total = yearTotal(y);
  const stated = y.stated
    ? ` ${plural(y.stated, 'stated date is', 'stated dates are')} listed apart.`
    : '';
  if (topic) {
    const n = y.topics[topic] ?? 0;
    return `${plural(n, `${chronicleTopicLabels[topic].toLowerCase()} record`, `${chronicleTopicLabels[topic].toLowerCase()} records`)} dated ${y.year}, of ${total} in all topics.`;
  }
  if (!total)
    return `No dated records for ${y.year}; ${plural(y.stated, 'stated date', 'stated dates')}.`;
  const topics = yearTopics(y).length;
  return `${plural(total, 'record', 'records')} dated ${y.year}, in ${plural(topics, 'topic', 'topics')}.${stated}`;
}
