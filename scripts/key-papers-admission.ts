// Admits the key papers candidate pack (research/key-papers) into the
// dataset, in three parts, using the authored map in
// review/key-papers-admission-map-2026-10-31.json, the maintainer's decisions
// of 2026-10-28 (review/key-papers-pack-2026-10-28.md, decision 10 for the
// order) and the adjudication of the cross-family check of 2026-10-31
// (research/key-papers/cross-family-check-2026-10-28.md).
//
//   pnpm tsx scripts/key-papers-admission.ts --part 1          documents, versions, stated contributions, citations
//   pnpm tsx scripts/key-papers-admission.ts --part 2          persons and authorship
//   pnpm tsx scripts/key-papers-admission.ts --part 3          attributed credits
//   pnpm tsx scripts/key-papers-admission.ts --part N --check  compare with the stored records
//
// Run the parts in order. A part is idempotent while it is the latest part
// applied: it first removes the rows its before-snapshot lists as added and
// restores the rows it changed, then rebuilds them. Records that repeat a
// stored record (same subject, predicate and object) are skipped, so a part
// can run on a base that already holds some of them (the people pack, for
// one). Persons the base already holds are reused by ID or exact name. The
// pack is never changed, and nothing is retrieved: quotations rest on the
// pack's mechanical check and on the cross-family check.
import { createHash } from 'node:crypto';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { maxQuotedWords } from '../src/domain/schema';

const dir = 'research/key-papers';
const names = ['entities', 'claims', 'sources', 'evidence'] as const;
type Name = (typeof names)[number];
type Row = Record<string, unknown> & { id: string };
type Json = Record<string, any>; // eslint-disable-line @typescript-eslint/no-explicit-any

const read = (path: string) => JSON.parse(readFileSync(path, 'utf8'));
const args = process.argv.slice(2);
const check = args.includes('--check');
const map: Json = read('review/key-papers-admission-map-2026-10-31.json');
const pack: Json = read(`${dir}/pack.json`);
const verification: Json = read(`${dir}/verification.json`);
const crossCheck: Json = read(`${dir}/cross-family-check-2026-10-28.json`);
const verdicts: Json = read(`${dir}/cross-family-verdicts-2026-10-28.json`);
const brief = readFileSync(`${dir}/cross-family-input-2026-10-28.md`, 'utf8');

const part = args[args.indexOf('--part') + 1];
const plan: Json = map.parts[part];
if (!args.includes('--part') || !plan)
  throw new Error('Usage: --part 1|2|3 [--check]');
const date: string = map.admissionDate;
const snapshotPath = `review/key-papers-admission-${part}-before-2026-10-31.json`;

// ---------------------------------------------------------------- base
const stored = {
  meta: read('data/meta.json'),
  ...Object.fromEntries(names.map((n) => [n, read(`data/${n}.json`)])),
} as { meta: Json } & Record<Name, Row[]>;
const snapshot: Json | null = existsSync(snapshotPath)
  ? read(snapshotPath)
  : null;
const base = {
  meta: snapshot ? snapshot.meta : stored.meta,
  ...Object.fromEntries(
    names.map((n) => {
      const added = new Set<string>(snapshot?.added[n] ?? []);
      const before = new Map<string, Row>(
        (snapshot?.before[n] ?? []).map((r: Row) => [r.id, r]),
      );
      return [
        n,
        stored[n]
          .filter((r) => !added.has(r.id))
          .map((r) => structuredClone(before.get(r.id) ?? r)),
      ];
    }),
  ),
} as { meta: Json } & Record<Name, Row[]>;
const baseCommit: string =
  snapshot?.baseCommit ??
  execFileSync('git', ['rev-parse', 'HEAD'], { encoding: 'utf8' }).trim();
const index = Object.fromEntries(
  names.map((n) => [n, new Map(base[n].map((r) => [r.id, r]))]),
) as Record<Name, Map<string, Row>>;
const existing = (n: Name, id: string) => index[n].get(id);
const sha = (value: unknown) =>
  createHash('sha256').update(JSON.stringify(value)).digest('hex');

// ---------------------------------------------------------------- rows
const added: Record<Name, Row[]> = {
  entities: [],
  claims: [],
  sources: [],
  evidence: [],
};
const changed: Record<Name, Map<string, Row>> = {
  entities: new Map(),
  claims: new Map(),
  sources: new Map(),
  evidence: new Map(),
};
const isAdded = (n: Name, id: string) => added[n].some((r) => r.id === id);
const addOnce = (n: Name, row: Row) => {
  if (isAdded(n, row.id) || existing(n, row.id))
    throw new Error(`Duplicate ${n} id: ${row.id}`);
  added[n].push(row);
};
/** Records an edit to a stored row, keeping the row as it was in the snapshot. */
function changeRow(n: Name, id: string, edit: (row: Row) => void) {
  const row = existing(n, id);
  if (!row) throw new Error(`No stored ${n} row: ${id}`);
  if (!changed[n].has(id)) changed[n].set(id, structuredClone(row));
  edit(row);
}
const log: Record<string, string[]> = {};
const note = (kind: string, line: string) => (log[kind] ??= []).push(line);

// ---------------------------------------------------------------- text
const decode = (s: string) =>
  s.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>');
const words = (s: string) =>
  s.split(/\s+/).filter((w) => /[\p{L}\p{N}]/u.test(w)).length;
const months = [
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
/** A date in the prose of a note, as a reader reads it. */
const inWords = (d: string) => {
  const [y, m, day] = d.split('-');
  if (!m) return y;
  const month = months[Number(m) - 1];
  return day ? `${Number(day)} ${month} ${y}` : `${month} ${y}`;
};
/** The earliest of dates of mixed precision, by their first possible day. */
const earliest = (dates: string[]) =>
  [...dates].sort(
    (a, b) =>
      (a + '-01-01').slice(0, 10).localeCompare((b + '-01-01').slice(0, 10)) ||
      b.length - a.length,
  )[0];
const idToken = /\b[a-z][a-z0-9]*(?:-[a-z0-9]+){2,}\b/g;
const packIds = new Set<string>([
  ...pack.claims.map((c: Json) => c.id),
  ...pack.documents.map((d: Json) => d.id),
]);
/** Reader-facing text never names a record ID. */
function noIds(text: string, where: string) {
  const left = (text.match(idToken) ?? []).find(
    (t) => packIds.has(t) || index.entities.has(t) || index.claims.has(t),
  );
  if (left) throw new Error(`Record ID left in ${where}: ${left}`);
  return text;
}
const loaded =
  /\b(landmark|seminal|pioneer\w*|breakthrough|foundational|influential)\b/i;

// ---------------------------------------------------------------- pack
const packDocs = new Map<string, Json>(
  pack.documents.map((d: Json) => [d.id, d]),
);
const packSources = new Map<string, Json & { doc: string }>();
for (const d of pack.documents as Json[])
  for (const s of d.sources as Json[])
    packSources.set(s.key, { ...s, doc: d.id });
/** The dataset ID of a pack document. */
const docId = (id: string): string => map.documentMap[id]?.id ?? id;
/** The dataset ID of a citing text (a document, or an unlinked source). */
const citingId = (id: string): string =>
  map.citingDocuments[id]?.id ?? docId(id);
const packClaims: Json[] = pack.claims;

// Cross-family check items by record, for the evidence notes.
const titleKey = (s: string) =>
  decode(s)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
const docByTitle = new Map<string, string>(
  pack.documents.map((d: Json) => [titleKey(d.title), d.id]),
);
const itemPaper = new Map<string, string>();
for (const m of brief.matchAll(
  /### ([AB]\d+) · (?:dates|byline|count)\n\n- Paper: (.*?)(?: \((?:arxiv|doi) [^)]*\))?\n/g,
)) {
  const id = docByTitle.get(titleKey(m[2]));
  if (id) itemPaper.set(m[1], id);
}
const checkOf = new Map<string, Json[]>();
const addCheck = (claimId: string, item: Json) =>
  checkOf.set(claimId, [...(checkOf.get(claimId) ?? []), item]);
for (const v of verdicts.items as Json[]) {
  const item = { ...crossCheck[v.id], id: v.id };
  for (const id of v.claimIds ?? []) addCheck(id, item);
  if (v.kind === 'count') {
    const paper = itemPaper.get(v.id);
    for (const c of packClaims)
      if (
        c.predicate === 'cites' &&
        c.object.entityId === paper &&
        (v.pack.citing as string[]).includes(c.subject)
      )
        addCheck(c.id, item);
  }
  if (v.kind === 'authorship')
    for (const c of packClaims)
      if (c.predicate === 'authored' && c.subject === v.pack.proposedId)
        addCheck(c.id, item);
  if (v.kind === 'byline') {
    const paper = itemPaper.get(v.id);
    for (const c of packClaims)
      if (c.predicate === 'authored' && c.object.entityId === paper)
        addCheck(c.id, item);
  }
}
function checkSentence(claimId: string) {
  return (checkOf.get(claimId) ?? [])
    .map((item) => {
      const partly = item.verdict !== 'supported';
      const what: Record<string, string> = {
        quotation: 'found the quotation at its locator',
        attribution:
          'found the attribution at its locator and in the citing text’s reference entry',
        count: 'found the citation in the citing text',
        authorship: 'transcribed the printed name from the byline blind',
        byline: 'transcribed the byline blind',
      };
      return `A cross-family machine check (2026-10-30, item ${item.id}) ${what[item.kind] ?? 'checked the record'}${partly ? '; it qualified its answer, and the adjudication of 2026-10-31 was applied at admission' : ''}.`;
    })
    .join(' ');
}

// ---------------------------------------------------------------- sources
const cleanUrl = (u: string) =>
  u.startsWith('https://www.nature.com/') ? u.replace(/\?.*$/, '') : u;
const arxivId = (u: string) =>
  u.match(/arxiv\.org\/(?:abs|pdf|html)\/(\d{4}\.\d{4,5})(v\d+)?/);
const reuse = (authors: string[], title: string, d: string | null) => ({
  attribution: `${authors.length > 10 ? `${authors[0]} and others` : authors.join(', ')}, “${title}”${d ? `, ${d}` : ''}.`,
  licence: 'No open redistribution licence asserted',
  note: 'Bibliographic metadata, editorial paraphrases and short attributed quotations (at most 50 words each). Recheck terms before wider redistribution.',
});
/** The byline as printed in the version read, with the adjudicated additions. */
function byline(doc: Json): string[] {
  if (doc.bylineCollective) return [doc.bylineCollective];
  const list: string[] = [...doc.authorsAsPrinted];
  const add = map.bylineAdditions[doc.id];
  if (add && !list.includes(add.name)) {
    const at = list.indexOf(add.after);
    if (at < 0) throw new Error('Byline addition without anchor: ' + doc.id);
    list.splice(at + 1, 0, add.name);
  }
  return list;
}
/** Dates of a pack document's arXiv versions, in order. */
const arxivVersions = (doc: Json) =>
  (doc.versions as Json[]).filter((v) => v.kind === 'arXiv submission');

const sourceIdOf = new Map<string, string>();
/** The dataset source a pack source key stands for, made on first use. */
function sourceFor(key: string): string {
  if (sourceIdOf.has(key)) return sourceIdOf.get(key)!;
  const s = packSources.get(key);
  if (!s) {
    if (existing('sources', key) || isAdded('sources', key)) return key;
    throw new Error('Unknown source: ' + key);
  }
  if (s.kind.startsWith('dataset source')) {
    sourceIdOf.set(key, key);
    return key;
  }
  const id = `source-${key.startsWith('kp-') ? '' : 'kp-'}${key.replace(/--/g, '-')}`;
  // Made by an earlier part.
  if (existing('sources', id)) {
    sourceIdOf.set(key, id);
    return id;
  }
  const doc = packDocs.get(s.doc)!;
  const documentId = docId(doc.id);
  const title = decode(doc.title);
  // An expression the dataset already holds is reused, not entered twice.
  if (s.kind !== 'arXiv abstract page' && s.kind !== 'Crossref record') {
    const same = base.sources.find(
      (x) => x.evidenceUrl === cleanUrl(s.url) || x.canonicalUrl === s.url,
    );
    if (same) {
      sourceIdOf.set(key, same.id);
      if (same.documentId !== documentId) {
        changeRow('sources', same.id, (row) => {
          row.documentId = documentId;
        });
        note(
          'sources linked',
          `${same.id} → ${documentId} (the expression the pack read)`,
        );
      }
      // Schema 2.8 needs a length for a source with quotations.
      if (!same.documentWords && s.words) {
        changeRow('sources', same.id, (row) => {
          row.documentWords = {
            count: s.words,
            basis:
              'Approximate: words in the retrieved text layer of the same expression; counted for the key papers pack on 2026-10-28.',
          };
        });
        note('lengths added', `${same.id}: ${s.words} words`);
      }
      const printed = byline(doc);
      // A stored list that gives only the first credited authors takes the
      // byline as printed, so that every credited name stays on the record
      // (decision 3); a list that differs in name forms is left as it is.
      const storedAuthors = same.authors as string[];
      if (
        printed.length > storedAuthors.length &&
        storedAuthors.every((a) => printed.includes(a))
      ) {
        changeRow('sources', same.id, (row) => {
          row.authors = printed;
          delete row.authorNames;
          row.version = `${(row.version as string).replace(/ The author list gives the first credited authors only; see the document for the full list\./, '')} The author list is the byline as printed on the first page, read for the key papers pack on 2026-10-28.`;
          row.reuse = {
            ...(row.reuse as Json),
            ...reuse(
              printed,
              row.title as string,
              row.publicationDate as string,
            ),
            note: (row.reuse as Json).note,
          };
        });
        note(
          'author lists completed',
          `${same.id}: ${storedAuthors.length} → ${printed.length} names`,
        );
      } else if (
        printed.length &&
        JSON.stringify(printed) !== JSON.stringify(storedAuthors)
      )
        note(
          'author lists not changed',
          `${same.id}: ${(same.authors as string[]).length} names stored, ${printed.length} printed`,
        );
      return same.id;
    }
  }
  sourceIdOf.set(key, id);
  const accessed: string = s.retrievedAt;
  const hash = s.sha256 ? ` (SHA-256 ${s.sha256})` : '';
  let row: Row;
  if (s.kind === 'arXiv abstract page') {
    const versions = arxivVersions(doc);
    const history = versions
      .map(
        (v) =>
          `${v.label.replace(/^arXiv:\S+?(v\d+)$/, '$1')} ${inWords(v.date)}`,
      )
      .join('; ');
    row = {
      id,
      documentId,
      title,
      authors: ['arXiv'],
      publisher: 'arXiv',
      publicationDate: versions[0]?.date ?? null,
      ...(versions.length
        ? { versionDate: versions[versions.length - 1].date }
        : {}),
      version: `arXiv abstract page, retrieved for the candidate pack on ${accessed}${hash}. Submission history as arXiv records it (UTC): ${history}. The page serves the latest version; each version is a separate expression, and only the one a record names was read.`,
      canonicalUrl: s.url,
      evidenceUrl: s.url,
      language: 'en',
      kind: 'paper',
      accessedAt: accessed,
      reuse: reuse(['arXiv'], title, versions[0]?.date ?? null),
    };
  } else if (s.kind === 'Crossref record') {
    const v = (doc.versions as Json[]).find((x) => x.source === key);
    if (!v) throw new Error('A Crossref record without a version: ' + key);
    const what = /conference/.test(v.kind)
      ? 'conference'
      : /chapter/.test(v.kind)
        ? 'book chapter'
        : 'journal';
    const extra = map.venues[doc.id]?.note?.[key];
    // The pack recorded no Crossref title; where the check read a journal
    // title that differs from the arXiv title, the source carries it.
    const journal: Json | undefined = map.crossrefTitles[key];
    const recordTitle = journal?.title ?? title;
    row = {
      id,
      documentId,
      title: recordTitle,
      authors: ['Crossref'],
      publisher: 'Crossref',
      publicationDate: v.date,
      version: [
        `Crossref record of the ${what} version: ${decode(v.label).replace(/\s+/g, ' ')} (DOI ${v.doi}), retrieved for the candidate pack on ${accessed}. The date is the publisher-deposited date, kept at year precision; it was not checked against the issue.`,
        extra,
        journal?.note,
      ]
        .filter(Boolean)
        .join(' '),
      canonicalUrl: `https://doi.org/${v.doi}`,
      evidenceUrl: s.url,
      // The language of the work the record describes.
      language: 'en',
      kind: 'dataset',
      accessedAt: accessed,
      reuse: reuse(['Crossref'], recordTitle, v.date),
    };
  } else {
    const isArxiv = /arxiv\.org/.test(s.url);
    const t = map.textSources[key];
    if (!isArxiv && !t) throw new Error('A text without its map entry: ' + key);
    const label = isArxiv ? arxivId(s.url) : null;
    const v = label
      ? arxivVersions(doc).find((x) => x.label.endsWith(label[2]))
      : null;
    const published: string | null = isArxiv ? (v?.date ?? null) : t.date;
    const authors = byline(doc).length ? byline(doc) : [t.publisher];
    row = {
      id,
      documentId,
      title,
      authors,
      ...(doc.bylineCollective
        ? { authorNames: [{ literal: doc.bylineCollective }] }
        : {}),
      publisher: isArxiv ? 'arXiv' : t.publisher,
      publicationDate: published,
      ...(published && isArxiv ? { versionDate: published } : {}),
      version: [
        isArxiv
          ? `arXiv:${label![1]}${label![2]}${published ? `, submitted ${inWords(published)} (UTC)` : ''}.`
          : t.note,
        `Retrieved for the candidate pack on ${accessed}${hash}.`,
        doc.bylineCollective
          ? `The first page prints the collective byline “${doc.bylineCollective}”; contributors listed elsewhere in the text are not recorded as authors.`
          : byline(doc).length
            ? 'The author list is the byline as printed on the first page.'
            : '',
        doc.curation && /v1|withdrawn/.test(doc.curation) ? doc.curation : '',
      ]
        .filter(Boolean)
        .join(' '),
      canonicalUrl: isArxiv
        ? `https://arxiv.org/abs/${label![1]}${label![2]}`
        : cleanUrl(s.url),
      evidenceUrl: cleanUrl(s.url),
      language: 'en',
      ...(s.words
        ? {
            documentWords: {
              count: s.words,
              basis:
                'Approximate: words in the retrieved text layer; counted for the key papers pack on 2026-10-28.',
            },
          }
        : {}),
      kind: 'paper',
      accessedAt: accessed,
      reuse: reuse(authors, title, published),
    };
  }
  row.version = noIds(row.version as string, id);
  addOnce('sources', row);
  return id;
}

/** A venue version the cross-family check located, as a source. */
function venueSource(doc: Json, v: Json): string {
  const id = `source-kp-${doc.id.replace(/^kp-/, '')}-${v.item.toLowerCase()}`;
  if (isAdded('sources', id)) return id;
  const title = decode(doc.title);
  addOnce('sources', {
    id,
    documentId: docId(doc.id),
    title,
    authors: [v.publisher],
    publisher: v.publisher,
    publicationDate: v.date,
    version: noIds(
      [
        `${v.label}.`,
        v.note ?? '',
        `Located by the cross-family machine check on 2026-10-30 (item ${v.item}; ${v.locator}), at the precision of its source${v.crossref ? ' (Crossref only, so the year)' : ''}; not read again at admission.`,
      ]
        .filter(Boolean)
        .join(' '),
      id,
    ),
    canonicalUrl: v.doi ? `https://doi.org/${v.doi}` : v.url,
    evidenceUrl: v.url,
    language: 'en',
    kind: v.crossref ? 'dataset' : 'paper',
    accessedAt: '2026-10-30',
    reuse: reuse([v.publisher], title, v.date),
  });
  return id;
}

/** Every version source of a pack document; returns the dated versions. */
function versionSources(doc: Json): { id: string; date: string | null }[] {
  const out: { id: string; date: string | null }[] = [];
  const venues: Json = map.venues[doc.id] ?? {};
  for (const s of doc.sources as Json[]) {
    if (s.kind === 'Semantic Scholar record') continue;
    // A Crossref record that dates no version (an SSRN posting, a report
    // dated by its title page) is not entered.
    if (
      s.kind === 'Crossref record' &&
      !(doc.versions as Json[]).some((v) => v.source === s.key)
    ) {
      note('Crossref records without a version', `${doc.id}: ${s.url}`);
      continue;
    }
    if (venues.hold?.[s.key]) {
      note('versions held', `${doc.id}: ${venues.hold[s.key]}`);
      continue;
    }
    const replacement = venues.replace?.[s.key];
    if (replacement) {
      const id = venueSource(doc, replacement);
      out.push({ id, date: replacement.date });
      continue;
    }
    const id = sourceFor(s.key);
    const row =
      existing('sources', id) ?? added.sources.find((r) => r.id === id);
    out.push({ id, date: (row?.publicationDate as string | null) ?? null });
  }
  (venues.add ?? []).forEach((v: Json) => {
    const id = venueSource(doc, v);
    out.push({ id, date: v.date });
  });
  const identity = map.identitySources[doc.id];
  if (identity) {
    const id = `source-kp-${doc.id.replace(/^kp-/, '')}-identity`;
    if (!isAdded('sources', id))
      addOnce('sources', {
        id,
        documentId: docId(doc.id),
        title: identity.title,
        authors: identity.authors,
        publisher: identity.publisher,
        publicationDate: identity.publicationDate,
        version: identity.version,
        canonicalUrl: identity.url,
        evidenceUrl: identity.url,
        language: 'en',
        kind: identity.kind,
        accessedAt: '2026-10-30',
        reuse: reuse(
          identity.authors,
          identity.title,
          identity.publicationDate,
        ),
      });
    out.unshift({ id, date: identity.publicationDate });
  }
  return out;
}

// ---------------------------------------------------------------- evidence
const quoted = new Map<string, Set<string>>();
const verifiedQuote = (claimId: string, source: string) =>
  (verification.quotes as Json[]).find(
    (q) => q.claim === claimId && q.source === source,
  )?.found === true;
const verifiedName = (claimId: string) =>
  (verification.authorship as Json[]).find((q) => q.claim === claimId)
    ?.found === true;
const verifiedCitation = (claimId: string) =>
  (verification.citations as Json[]).find((q) => q.claim === claimId)
    ?.refound === true;

function evidenceRow(
  claimId: string,
  n: number,
  e: Json,
  sourceId: string,
  text: string,
): Row {
  if (e.passageType === 'quote') {
    if (words(e.passage) > 50)
      throw new Error('Quote over 50 words: ' + claimId);
    quoted.set(sourceId, (quoted.get(sourceId) ?? new Set()).add(e.passage));
  }
  return {
    id: `evidence-${claimId}-${n}`,
    claimId,
    sourceId,
    sourceRole: e.sourceRole,
    support: e.support,
    locator: e.locator,
    passage:
      e.passageType === 'quote'
        ? e.passage
        : noIds(e.passage.replace(/^Paraphrase:\s*/, ''), claimId),
    passageType: e.passageType,
    verification: 'machine_checked',
    checkedAt: date,
    note: noIds(
      [
        'Candidate pack passage, key papers (research/key-papers).',
        text,
        e.note ?? '',
        checkSentence(claimId),
        'No human editorial review.',
      ]
        .filter(Boolean)
        .join(' '),
      claimId,
    ),
  };
}

// ---------------------------------------------------------------- claims
const tripleKey = (s: string, p: string, o: string) => `${s}|${p}|${o}`;
const storedTriples = new Map<string, string>(
  base.claims.map((c) => [
    tripleKey(
      c.subject as string,
      c.predicate as string,
      ((c.object as Json).entityId ?? (c.object as Json).value) as string,
    ),
    c.id,
  ]),
);
/** A source version that says the copy read is a later revision or a changed reprint. */
const laterCopy =
  /revised version|contains minor changes|Revised (?:January|February|March|April|May|June|July|August|September|October|November|December) \d{4}/;
const attributionKinds: Record<string, string> = {
  'builds on': 'builds_on',
  'attributes a term or concept': 'attributes_term',
  'summarises an argument or finding': 'summarises',
  'attributes and disputes': 'attributes_and_disputes',
};

function addClaim(raw: Json, row: Row, evidence: Row[]) {
  if (!evidence.length) throw new Error('A record without evidence: ' + row.id);
  const statement = noIds(row.statement as string, row.id);
  const qualification = noIds(row.qualification as string, row.id);
  if (loaded.test(statement) || loaded.test(qualification))
    throw new Error('Loaded wording: ' + row.id);
  for (const e of evidence) addOnce('evidence', e);
  addOnce('claims', {
    ...row,
    statement,
    qualification,
    evidenceIds: evidence.map((e) => e.id),
    editorialState: 'seed',
    recordedAt: date,
  });
  void raw;
}

/** The claim's object as the dataset names it. */
const objectOf = (c: Json) =>
  c.object.kind === 'entity'
    ? { kind: 'entity', entityId: docId(c.object.entityId) }
    : c.object;

function admitPackClaim(c: Json) {
  if (map.hold[c.id]) {
    note('held', `${c.id}: ${map.hold[c.id]}`);
    return;
  }
  const subject =
    c.predicate === 'authored' ? personOf(c.subject) : citingId(c.subject);
  const over: Json = map.claims[c.id] ?? {};
  // A stated contribution's literal is its statement; a trimmed statement
  // replaces both.
  const object =
    over.statement && c.object.kind === 'literal'
      ? { ...c.object, value: over.statement }
      : objectOf(c);
  if (object.kind === 'entity' && object.entityId === subject) {
    note(
      'self-citations dropped',
      `${c.id}: the work’s own text${c.object.entityId !== object.entityId ? ' (a pack document the dataset already holds)' : ''}`,
    );
    return;
  }
  const same = storedTriples.get(
    tripleKey(subject, c.predicate, object.entityId ?? object.value),
  );
  if (same) {
    note('repeats a stored record', `${c.id} = ${same}`);
    return;
  }
  const doc = packDocs.get(c.object.entityId ?? c.subject);
  const evidence: Row[] = [];
  const time: Json = { kind: 'unknown', note: '' };
  const attributes: Json = {};
  let qualification: string = c.qualification;

  (c.evidence as Json[]).forEach((e, i) => {
    const sid = e.datasetSource ? e.source : sourceFor(e.source);
    let text: string;
    if (c.predicate === 'cites') {
      if (!verifiedCitation(c.id))
        throw new Error('Citation not re-found by the pack: ' + c.id);
      text = `The citation was matched (${c.match ?? 'title'}) in the text retrieved for the candidate pack on 2026-10-28 and re-found by its mechanical check. The paraphrase is Selekoa’s.`;
    } else if (c.predicate === 'authored') {
      if (!verifiedName(c.id))
        throw new Error('Printed name not found by the pack: ' + c.id);
      text = `The printed name (${words(e.passage)} words) was found in the byline of the text retrieved for the candidate pack on 2026-10-28.`;
    } else if (e.passageType === 'quote') {
      if (!verifiedQuote(c.id, e.source))
        throw new Error('Quotation not matched by the pack: ' + c.id);
      text = `The quotation (${words(e.passage)} words) matched the text retrieved for the candidate pack on 2026-10-28 (research/key-papers/verification.json). Matching ignored differences of whitespace, case, quotation marks, dashes and line-break hyphens, so the source’s typography can differ.`;
    } else
      text =
        'The paraphrase is Selekoa’s, written from the text retrieved for the candidate pack; it is not a quotation and was not machine-matched.';
    evidence.push(evidenceRow(c.id, i + 1, e, sid, text));
  });

  if (c.predicate === 'states_contribution') {
    const s =
      added.sources.find((r) => r.id === evidence[0].sourceId) ??
      existing('sources', evidence[0].sourceId as string)!;
    const d = s.publicationDate as string | null;
    const arxiv = /arxiv\.org/.test(s.evidenceUrl as string);
    if (d)
      Object.assign(time, {
        kind: 'event',
        date: d,
        basis: 'publication',
        note: arxiv
          ? `Date of the arXiv version quoted, submitted ${inWords(d)} (UTC); later versions may word it differently.`
          : `Date of the version quoted, as its source gives it (${inWords(d)}); other versions may word it differently.`,
      });
    else
      time.note =
        'The version quoted carries no date of its own; other versions may word it differently.';
    if (c.priorityClaim) attributes.priorityClaim = true;
  } else if (c.predicate === 'cites' || c.predicate === 'credits_work') {
    if (c.time.date)
      Object.assign(time, {
        kind: 'event',
        date: c.time.date,
        basis: 'publication',
        note:
          c.time.note ??
          'Date of the citing text as the dataset records it; the citation does not identify which version of the cited work was read.',
      });
    else
      time.note =
        'The dataset records no date for the citing text; the citation does not identify which version of the cited work was read.';
    if (c.predicate === 'cites' && !c.time.note)
      time.note = `Date of the citing text as the dataset records it (${inWords(c.time.date)}). The citation does not identify which version of the cited work was read.`;
    if (c.predicate === 'credits_work') {
      attributes.attribution = attributionKinds[c.attribution];
      if (!attributes.attribution)
        throw new Error('Unknown attribution kind: ' + c.id);
      if (c.time.date)
        time.note = `Date of the citing text as the dataset records it (${inWords(c.time.date)}).`;
    }
  } else if (c.predicate === 'authored') {
    const dated = documentDate(doc!);
    if (dated)
      Object.assign(time, {
        kind: 'event',
        date: dated.date,
        basis: 'publication',
        note: dated.note,
      });
    else
      time.note =
        'No dated version of the work is recorded; the authorship is that of the version read.';
  }
  // A text read in a later copy than the one its date names (a revision, a
  // reprint marked as changed) is not dated as if the copy read were the
  // first: the map says how each such copy dates the records read in it.
  if (c.predicate !== 'authored') {
    const sid = evidence[0].sourceId as string;
    const copy: Json | undefined = map.laterCopies[sid]?.[c.predicate];
    const s =
      added.sources.find((r) => r.id === sid) ?? existing('sources', sid);
    if (
      !copy &&
      !over.time &&
      !over.timeNote &&
      laterCopy.test((s?.version as string) ?? '')
    )
      throw new Error(`Read in a later copy, without a map entry: ${c.id}`);
    if (copy?.time) Object.assign(time, copy.time);
    if (copy?.timeNote) time.note = copy.timeNote;
    if (copy?.qualificationAppend)
      qualification = `${qualification} ${copy.qualificationAppend}`;
    if (copy) note('dated by a later copy', `${c.id} (${sid})`);
  }
  if (over.time) Object.assign(time, over.time);
  if (over.timeNote) time.note = over.timeNote;
  if (over.qualificationAppend)
    qualification = `${qualification} ${over.qualificationAppend}`;
  const ordered: Json =
    time.kind === 'unknown'
      ? { kind: 'unknown', note: time.note }
      : {
          kind: time.kind,
          date: time.date,
          basis: time.basis,
          note: time.note,
        };
  if (!ordered.basis) delete ordered.basis;
  addClaim(
    c,
    {
      id: c.id,
      subject,
      predicate: c.predicate,
      object,
      topic: 'ideas',
      statement: decode(over.statement ?? c.statement),
      time: ordered,
      derivation: c.derivation,
      resolution: c.resolution,
      qualification: decode(qualification),
      ...(Object.keys(attributes).length ? { attributes } : {}),
    } as Row,
    evidence,
  );
}

// The dated versions of each work, for authorship dates.
const datedVersions = new Map<string, { id: string; date: string | null }[]>();
function documentDate(doc: Json) {
  const versions = datedVersions.get(doc.id) ?? [];
  const dates = versions.map((v) => v.date).filter(Boolean) as string[];
  if (!dates.length) return null;
  const d = earliest(dates);
  const v1 = arxivVersions(doc)[0]?.date;
  return {
    date: d,
    note:
      d === v1
        ? `Date of the work’s earliest recorded version, arXiv version 1, submitted ${inWords(d)} (UTC).`
        : `Date of the work’s earliest recorded version (${inWords(d)}), at the precision its source gives.`,
  };
}

// ---------------------------------------------------------------- persons
const personRows = new Map<string, string>(); // pack person ID → dataset ID
const basePersonByName = new Map<string, string>();
for (const e of base.entities)
  if (e.type === 'person')
    for (const n of [e.name as string, ...(e.aliases as string[])])
      basePersonByName.set(n, e.id);
function personOf(packId: string): string {
  const id = personRows.get(packId);
  if (!id) throw new Error('Person not prepared: ' + packId);
  return id;
}
const sortName = (id: string, name: string) => {
  if (map.sortNames[id]) return map.sortNames[id] as string;
  const parts = name.split(' ');
  const family = parts.pop()!;
  return `${family}, ${parts.join(' ')}`;
};

// ================================================================= part 1
const allDocs: Json[] = pack.documents;
if (part === '1') {
  // Citing texts held only as sources become documents.
  for (const [, c] of Object.entries(
    map.citingDocuments as Record<string, Json>,
  )) {
    if (c.name && !existing('entities', c.id))
      addOnce('entities', {
        id: c.id,
        name: c.name,
        type: 'document',
        subtype: c.subtype,
        aliases: [],
        description: c.description,
        sourceIds: [c.sourceId],
        externalIds: c.externalIds,
      });
    const s = existing('sources', c.sourceId);
    if (s && s.documentId !== c.id)
      changeRow('sources', c.sourceId, (row) => {
        row.documentId = c.id;
      });
  }
  // Documents and their versions.
  for (const doc of allDocs) {
    const id = docId(doc.id);
    const versions = versionSources(doc);
    datedVersions.set(doc.id, versions);
    if (existing('entities', id)) continue;
    const read =
      doc.read && !doc.read.startsWith('dataset source')
        ? sourceFor(doc.read)
        : null;
    const primary = read ?? versions[0]?.id;
    if (!primary) throw new Error('A document without a source: ' + doc.id);
    const override = map.subtypes.overrides[doc.id];
    const externalIds: Json = { ...(doc.externalIds ?? {}) };
    if (map.venues[doc.id]?.dropDoi === externalIds.doi) delete externalIds.doi;
    const arxiv = arxivVersions(doc).length > 0;
    addOnce('entities', {
      id,
      name: decode(doc.title),
      type: 'document',
      subtype: override?.subtype ?? map.subtypes.default,
      aliases: [],
      description: [
        'Work-level record.',
        arxiv
          ? 'Its arXiv versions and any conference or journal version are listed as sources, each with its own date.'
          : 'Each recorded version is listed as a source with its own date.',
        doc.bylineCollective
          ? `The byline prints the collective name “${doc.bylineCollective}”.`
          : '',
        'A citation to the work does not identify which version the citing author read.',
      ]
        .filter(Boolean)
        .join(' '),
      sourceIds: [primary],
      ...(Object.keys(externalIds).length ? { externalIds } : {}),
    });
  }
  for (const c of packClaims)
    if (plan.predicates.includes(c.predicate)) admitPackClaim(c);
}

// ================================================================= part 2
if (part === '2') {
  for (const doc of allDocs) {
    const versions: { id: string; date: string | null }[] = [];
    for (const s of doc.sources as Json[]) {
      if (
        s.kind === 'Semantic Scholar record' ||
        map.venues[doc.id]?.hold?.[s.key] ||
        (s.kind === 'Crossref record' &&
          !(doc.versions as Json[]).some((v) => v.source === s.key))
      )
        continue;
      const r = map.venues[doc.id]?.replace?.[s.key];
      if (r) versions.push({ id: '', date: r.date });
      else {
        const sid = sourceFor(s.key);
        versions.push({
          id: sid,
          date: (existing('sources', sid)?.publicationDate as string) ?? null,
        });
      }
    }
    for (const v of map.venues[doc.id]?.add ?? [])
      versions.push({ id: '', date: v.date });
    datedVersions.set(doc.id, versions);
  }
  // Persons: reused where the base holds them, by ID or exact printed name.
  const credits = new Map<string, Json[]>();
  for (const c of packClaims)
    if (c.predicate === 'authored' && !map.hold[c.id])
      credits.set(c.subject, [...(credits.get(c.subject) ?? []), c]);
  for (const r of pack.persons.reused as Json[]) personRows.set(r.id, r.id);
  for (const p of pack.persons.proposed as Json[]) {
    const reusedId =
      existing('entities', p.id)?.type === 'person'
        ? p.id
        : basePersonByName.get(p.name);
    if (reusedId) {
      personRows.set(p.id, reusedId);
      note('persons reused', `${p.id} → ${reusedId}`);
      continue;
    }
    const mine = credits.get(p.id) ?? [];
    if (map.personHolds[p.id] || mine.length < 2) {
      for (const c of mine) map.hold[c.id] ??= map.personHolds[p.id];
      note(
        'persons held',
        `${p.id}: ${map.personHolds[p.id] ?? 'fewer than two credits remain'}`,
      );
      continue;
    }
    // Decision 3, second step: a new person credited on fewer than three
    // pack papers waits on the maintainer, because the check found identity
    // unresolved on the printed name alone (A049–A075).
    if (mine.length < map.identityHold.minimumPapers) {
      for (const c of mine) map.hold[c.id] ??= map.identityHold.reason;
      note(
        'persons held (decision 3, second step)',
        `${p.id}: ${mine.length} papers`,
      );
      continue;
    }
    personRows.set(p.id, p.id);
    const papers = mine
      .map((c) => packDocs.get(c.object.entityId)!)
      .sort((a, b) => String(a.year).localeCompare(String(b.year)));
    const sources = [
      ...new Set(mine.map((c) => sourceFor(c.evidence[0].source))),
    ];
    addOnce('entities', {
      id: p.id,
      name: p.name,
      sortName: sortName(p.id, p.name),
      type: 'person',
      subtype: 'Writer',
      aliases: [],
      description: `Credited under the printed name “${p.name}” in the bylines of ${papers.length === 2 ? 'two recorded papers' : `${papers.length} recorded papers, among them`} “${decode(papers[0].title)}” (${papers[0].year}) and “${decode(papers[1].title)}” (${papers[1].year}). No affiliation or role is recorded.`,
      sourceIds: sources.slice(0, 5),
    });
  }
  for (const c of packClaims) if (c.predicate === 'authored') admitPackClaim(c);
  // Single-paper authors whose printed name is an existing person's name.
  const credited = new Set(
    added.claims.map((c) => `${c.subject}|${(c.object as Json).entityId}`),
  );
  for (const a of pack.authorsWithoutRecord as Json[])
    for (const cr of a.credits as Json[]) {
      const person = basePersonByName.get(cr.printed);
      const doc = packDocs.get(cr.paper)!;
      const object = docId(doc.id);
      if (!person || credited.has(`${person}|${object}`)) continue;
      if (storedTriples.has(tripleKey(person, 'authored', object))) {
        note('repeats a stored record', `${person} authored ${object}`);
        continue;
      }
      const id = `kp-authored-${person}-${doc.id.replace(/^kp-/, '')}`;
      const sid = sourceFor(doc.read);
      const dated = documentDate(doc);
      addClaim(
        {},
        {
          id,
          subject: person,
          predicate: 'authored',
          object: { kind: 'entity', entityId: object },
          topic: 'ideas',
          statement: `${cr.printed} is a credited author of ${decode(doc.title)}.`,
          time: dated
            ? {
                kind: 'event',
                date: dated.date,
                basis: 'publication',
                note: dated.note,
              }
            : {
                kind: 'unknown',
                note: 'No dated version of the work is recorded.',
              },
          derivation: 'explicit',
          resolution: 'supported',
          qualification:
            'Authorship as credited in the byline of the text read, under the printed name the dataset’s person record bears; it implies neither sole authorship nor a role, and no affiliation is recorded.',
        } as Row,
        [
          {
            ...evidenceRow(
              id,
              1,
              {
                locator: `${cr.where}, byline`,
                passage: cr.printed,
                passageType: 'quote',
                sourceRole: 'primary',
                support: 'supports',
              },
              sid,
              'The printed name was located in the byline of the text retrieved for the candidate pack on 2026-10-28 (research/key-papers/facts.json). The person record already existed under the same name; the pack listed the name without a person record.',
            ),
          },
        ],
      );
      note('authorship for existing persons', `${id}`);
    }
  // A stored person's description that counts the dataset texts crediting
  // the name is no longer true once the person gains authorship here.
  const onlyText = ', the only dataset text that credits this name;';
  for (const id of new Set(added.claims.map((c) => c.subject as string))) {
    const person = existing('entities', id);
    if (!(person?.description as string | undefined)?.includes(onlyText))
      continue;
    changeRow('entities', id, (row) => {
      row.description = (row.description as string).replace(onlyText, ';');
    });
    note('descriptions corrected', id);
  }
}

// ================================================================= part 3
if (part === '3') {
  for (const c of packClaims)
    if (plan.predicates.includes(c.predicate)) admitPackClaim(c);
}

// ---------------------------------------------------------------- integrity
for (const c of added.claims) {
  for (const id of [c.subject, (c.object as Json).entityId].filter(Boolean))
    if (
      !existing('entities', id as string) &&
      !isAdded('entities', id as string)
    )
      throw new Error(`Entity without a row: ${id} (${c.id})`);
}

// ---------------------------------------------------------------- limits
const norm = (p: string) =>
  p
    .toLowerCase()
    .replace(/[‘’'“”"]/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
const overLimit: string[] = [];
// A stored source with a new quotation and no recorded length takes the
// length the pack counted for it (schema 2.8).
for (const id of quoted.keys()) {
  const row = existing('sources', id);
  const counted = (verification.perSource as Json)[id];
  if (row && !row.documentWords && counted?.documentWords) {
    changeRow('sources', id, (r) => {
      r.documentWords = {
        count: counted.documentWords,
        basis: `Approximate: ${counted.documentWordsBasis}; counted for the key papers pack on 2026-10-28.`,
      };
    });
    note('lengths added', `${id}: ${counted.documentWords} words`);
  }
}
for (const id of quoted.keys()) {
  const row = added.sources.find((s) => s.id === id) ?? existing('sources', id);
  const length = (row?.documentWords as Json)?.count;
  const all = new Set<string>([...quoted.get(id)!].map(norm));
  for (const e of base.evidence)
    if (e.sourceId === id && e.passageType === 'quote')
      all.add(norm(e.passage as string));
  const list = [...all];
  const total = list
    .filter((p) => !list.some((q) => q !== p && q.includes(p)))
    .reduce((n, p) => n + words(p), 0);
  if (!length || total > maxQuotedWords(length))
    overLimit.push(
      `${id}: ${total} quoted words, limit ${length ? maxQuotedWords(length) : '?'}`,
    );
}
if (overLimit.length)
  throw new Error('Over the quotation limit:\n' + overLimit.join('\n'));

// ---------------------------------------------------------------- output
const minor = (v: string) => Number(v.split('.')[1]);
const meta = {
  ...base.meta,
  ...(plan.schemaVersion &&
  minor(plan.schemaVersion) > minor(base.meta.schemaVersion)
    ? { schemaVersion: plan.schemaVersion }
    : {}),
  updatedAt: date,
  scope: `${base.meta.scope} ${plan.scope}`,
};
const result = {
  meta,
  ...Object.fromEntries(names.map((n) => [n, [...base[n], ...added[n]]])),
} as unknown as { meta: Json } & Record<Name, Row[]>;
const newSnapshot = {
  description: plan.snapshotDescription,
  baseCommit,
  meta: base.meta,
  added: Object.fromEntries(names.map((n) => [n, added[n].map((r) => r.id)])),
  before: Object.fromEntries(names.map((n) => [n, [...changed[n].values()]])),
  sha256: {
    meta: sha(base.meta),
    ...Object.fromEntries(
      names.map((n) => [n, sha(base[n].map((r) => changed[n].get(r.id) ?? r))]),
    ),
  },
};
const outputs: Record<string, unknown> = {
  'data/meta.json': result.meta,
  ...Object.fromEntries(names.map((n) => [`data/${n}.json`, result[n]])),
  [snapshotPath]: newSnapshot,
};
const counts = `Added ${names.map((n) => `${added[n].length} ${n}`).join(', ')}; changed ${names.map((n) => `${changed[n].size} ${n}`).join(', ')}.`;
if (check) {
  const differing = Object.entries(outputs).filter(
    ([path, value]) =>
      !existsSync(path) ||
      JSON.stringify(read(path)) !==
        JSON.stringify(JSON.parse(JSON.stringify(value))),
  );
  if (differing.length) {
    console.error(
      'Differs from stored: ' + differing.map(([p]) => p).join(', '),
    );
    process.exitCode = 1;
  } else console.log(`Stored records match the pack and the map. ${counts}`);
} else {
  for (const [path, value] of Object.entries(outputs))
    writeFileSync(path, JSON.stringify(value, null, 2) + '\n');
  execFileSync('pnpm', ['prettier', '--write', ...Object.keys(outputs)], {
    stdio: 'ignore',
  });
  console.log(counts);
  for (const [kind, lines] of Object.entries(log)) {
    console.log(`${kind}: ${lines.length}`);
    if (args.includes('--verbose'))
      for (const l of lines) console.log('  ' + l);
  }
}
