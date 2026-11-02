/**
 * Propositions by author (roadmap, interface item 5): for each proposition of
 * a propositions collection, the texts that articulate, contest or bear on
 * it, in date order; and for each author as a text's byline names them, the
 * propositions their texts take a stance on. Computed only from the stored
 * proposition records (`propositionsView`); it adds no stance, influence or
 * count that ranks people. A stance belongs to a text, never to a person.
 */
import type { Dataset, Register, ThoughtRole, Tier } from './schema';
import {
  authorKey,
  propositionsView,
  recordDates,
  registerLabels,
  roleLabels,
  stanceLabels,
  tierLabels,
  type PropositionRecord,
  type PropositionsFrame,
  type Stance,
} from './propositions';

/** The stored roles a row marks: the earliest located ones, as stored. */
const markedRoles: ThoughtRole[] = [
  'earliest-located',
  'earliest-located-tier-2',
  'earliest-located-term',
];

/** How an event date was stated, as the record stores its basis. */
const basisLabels: Record<string, string> = {
  publication: 'published',
  announcement: 'announced',
  effective: 'effective',
  revision: 'revised',
  signature: 'signed',
};

/**
 * Where a row's byline comes from: the text's own source (one whose
 * document is the text), or nowhere when only a source about the text is
 * recorded, whose authors are not the text's.
 */
export type BylineBasis = 'own source' | 'not recorded';

export type StanceRow = {
  claimId: string;
  collectionId: string;
  propositionId: string;
  code: string;
  proposition: string;
  stance: Stance;
  documentId: string;
  /** The text's title, as its document record names it. */
  text: string;
  /** The authors as the text's own source prints them; empty if not recorded. */
  bylines: string[];
  bylineBasis: BylineBasis;
  /** The stored date, at its stored precision. */
  date: string;
  /** How the date was stated (published, announced), where stored. */
  dateBasis: string;
  /** "1998 · wording attested 2000-08-17", "1965 · claimed 1962-10". */
  dates: string;
  /** The earliest-located roles the record stores, as labels. */
  marks: string[];
  register: Register;
  tier?: Tier;
};

/** The text's own source: among the record's sources, else any in the dataset. */
function ownByline(data: Dataset, r: PropositionRecord) {
  const id = r.document.id;
  const own =
    r.sources.find((s) => s.documentId === id) ??
    data.sources.find((s) => s.documentId === id);
  return own?.authors.length
    ? { bylines: own.authors, bylineBasis: 'own source' as const }
    : { bylines: [] as string[], bylineBasis: 'not recorded' as const };
}

function row(
  data: Dataset,
  collectionId: string,
  entry: {
    entity: { id: string; name: string };
    proposition: { code: string };
  },
  r: PropositionRecord,
): StanceRow {
  const time = r.claim.time;
  const basis = time.kind === 'event' && time.basis ? time.basis : '';
  return {
    claimId: r.claim.id,
    collectionId,
    propositionId: entry.entity.id,
    code: entry.proposition.code,
    proposition: entry.entity.name,
    stance: r.stance,
    documentId: r.document.id,
    text: r.document.name,
    ...ownByline(data, r),
    date: r.dated,
    dateBasis: basisLabels[basis] ?? basis,
    dates: recordDates(r),
    marks: r.roles
      .filter((role) => markedRoles.includes(role))
      .map((role) =>
        role === 'earliest-located-term' && r.term
          ? `${roleLabels[role]} “${r.term}”`
          : roleLabels[role],
      ),
    register: r.register,
    ...(r.tier ? { tier: r.tier.value } : {}),
  };
}

/** A section anchor from a byline key: `author-eliezer-yudkowsky`. */
const anchorOf = (key: string) =>
  'author-' +
  (key
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '') || 'x');

const collator = new Intl.Collator('en', { sensitivity: 'base' });

export function propositionStances(
  data: Dataset,
  frame: PropositionsFrame,
  /** People with person pages, to link an author whose name matches. */
  people: { id: string; name: string }[] = [],
) {
  const view = propositionsView(data, frame);
  const groups = view.groups.map((g) => ({
    id: g.id,
    label: g.label,
    propositions: g.propositions.map((p) => ({
      id: p.entity.id,
      code: p.proposition.code,
      name: p.entity.name,
      rows: p.records.map((r) => row(data, frame.id, p, r)),
    })),
  }));
  const rows = groups.flatMap((g) => g.propositions.flatMap((p) => p.rows));
  // Authors: each name on a text's own byline, joined by the same key as
  // the rest of the site ("Eliezer S. Yudkowsky" and "Eliezer Yudkowsky").
  const byKey = new Map<string, { names: string[]; rows: StanceRow[] }>();
  for (const r of rows)
    for (const name of r.bylines) {
      const key = authorKey(name);
      const held = byKey.get(key) ?? { names: [], rows: [] };
      byKey.set(key, held);
      if (!held.names.includes(name)) held.names.push(name);
      if (!held.rows.includes(r)) held.rows.push(r);
    }
  const personByKey = new Map(people.map((p) => [authorKey(p.name), p.id]));
  const anchors = new Set<string>();
  const byDate = (a: StanceRow, b: StanceRow) =>
    a.date.localeCompare(b.date) ||
    a.code.localeCompare(b.code, 'en', { numeric: true }) ||
    a.claimId.localeCompare(b.claimId);
  const authors = [...byKey]
    .map(([key, { names, rows }]) => {
      let anchor = anchorOf(key);
      while (anchors.has(anchor)) anchor += '-2';
      anchors.add(anchor);
      return {
        key,
        anchor,
        name: names[0],
        /** Other forms the bylines print. */
        alsoPrinted: names.slice(1),
        personId: personByKey.get(key) ?? null,
        rows: [...rows].sort(byDate),
      };
    })
    .sort(
      (a, b) => collator.compare(a.name, b.name) || a.key.localeCompare(b.key),
    );
  const unattributed = rows.filter((r) => !r.bylines.length).sort(byDate);
  return {
    collection: frame,
    groups,
    rows,
    authors,
    unattributed,
    claimIds: rows.map((r) => r.claimId),
    counts: {
      propositions: groups.reduce((n, g) => n + g.propositions.length, 0),
      texts: new Set(rows.map((r) => r.documentId)).size,
      records: rows.length,
    },
  };
}

export type PropositionStances = ReturnType<typeof propositionStances>;
export type StanceAuthor = PropositionStances['authors'][number];

/** The first author whose byline key is one of these, if any. */
export const authorFor = (view: PropositionStances, keys: readonly string[]) =>
  view.authors.find((a) => keys.includes(a.key)) ?? null;

/** "Contests · Earliest located · Tier 1 · Fiction"; nonfiction unlabelled. */
export function stanceLine(r: StanceRow) {
  return [
    stanceLabels[r.stance],
    ...r.marks,
    ...(r.tier ? [tierLabels[r.tier]] : []),
    ...(r.register === 'nonfiction' ? [] : [registerLabels[r.register]]),
  ].join(' · ');
}

/** "2014 · published", "1998 · published · wording attested 2000-08-17". */
export function dateLine(r: StanceRow) {
  const [first, ...rest] = r.dates.split(' · ');
  return [first, r.dateBasis, ...rest].filter(Boolean).join(' · ');
}

export const stanceCsvColumns = [
  'collection',
  'proposition_code',
  'proposition',
  'stance',
  'earliest_located',
  'text',
  'document_id',
  'byline',
  'byline_basis',
  'date',
  'date_basis',
  'dates_shown',
  'register',
  'tier',
  'record_id',
  'record_url',
] as const;

/** The CSV rows: one per row the page shows, in the page's order. */
export function stanceCsvRows(view: PropositionStances, origin: string) {
  return view.rows.map((r) => ({
    collection: view.collection.title,
    proposition_code: r.code,
    proposition: r.proposition,
    stance: stanceLabels[r.stance],
    earliest_located: r.marks.join(' ; '),
    text: r.text,
    document_id: r.documentId,
    byline: r.bylines.join(' ; '),
    byline_basis: r.bylineBasis,
    date: r.date,
    date_basis: r.dateBasis,
    dates_shown: dateLine(r),
    register: registerLabels[r.register],
    tier: r.tier ? tierLabels[r.tier] : '',
    record_id: r.claimId,
    record_url: `${origin}/claim/${encodeURIComponent(r.claimId)}`,
  }));
}

const cell = (value: string) => `"${value.replaceAll('"', '""')}"`;

/** The CSV text: a header row, then one quoted row per stance, CRLF. */
export function stanceCsv(view: PropositionStances, origin: string) {
  return (
    [
      stanceCsvColumns.join(','),
      ...stanceCsvRows(view, origin).map((row) =>
        stanceCsvColumns.map((c) => cell(row[c])).join(','),
      ),
    ].join('\r\n') + '\r\n'
  );
}
