// Admits the people candidate pack (research/people) into the dataset, using
// the authored map in review/people-admission-map-2026-10-31.json, the
// maintainer's decisions of 2026-10-30 (review/people-pack-2026-10-29.md) and
// the corrections of the cross-family check
// (research/people/cross-family-check-2026-10-29.md).
//
//   pnpm tsx scripts/people-admission.ts          write the records
//   pnpm tsx scripts/people-admission.ts --check  compare with the stored records
//
// The script is idempotent: it first removes the rows its before-snapshot
// lists as added and restores the rows it changed, then rebuilds them. The
// pack is never changed.
import { createHash } from 'node:crypto';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { maxQuotedWords } from '../src/domain/schema';

const dir = 'research/people';
const names = ['entities', 'claims', 'sources', 'evidence'] as const;
type Name = (typeof names)[number];
type Row = Record<string, unknown> & { id: string };
type Json = Record<string, any>; // eslint-disable-line @typescript-eslint/no-explicit-any

const read = (path: string) => JSON.parse(readFileSync(path, 'utf8'));
const check = process.argv.includes('--check');
const map: Json = read('review/people-admission-map-2026-10-31.json');
const pack: Json = read(`${dir}/pack.json`);
const verification: Json = read(`${dir}/verification.json`);
const crossCheck: Json = read(`${dir}/cross-family-check-2026-10-29.json`);
const date: string = map.admissionDate;
const checkDate: string = map.checkDate;
const snapshotPath = 'review/people-admission-before-2026-10-31.json';

const packSources = new Map<string, Json>(
  pack.sources.map((s: Json) => [s.key, s]),
);
const extraSources = new Map<string, Json>(
  (map.extraSources as Json[]).map((s) => [s.key, s]),
);
const checkOf = new Map<string, Json>(
  Object.values(crossCheck.items as Json).map((i: Json) => [i.record_id, i]),
);
const words = (s: string) =>
  s.split(/\s+/).filter((w) => /[\p{L}\p{N}]/u.test(w)).length;

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
const index = Object.fromEntries(
  names.map((n) => [n, new Map(base[n].map((r) => [r.id, r]))]),
) as Record<Name, Map<string, Row>>;
const existing = (n: Name, id: string) => index[n].get(id);
const sha = (value: unknown) =>
  createHash('sha256').update(JSON.stringify(value)).digest('hex');

const idToken = /\b[a-z][a-z0-9]*(?:-[a-z0-9]+)+\b/g;
const packIds = new Set<string>(pack.claims.map((c: Json) => c.id));
/** Reader-facing text never names a record ID. */
function noIds(text: string, where: string) {
  const left = (text.match(idToken) ?? []).find(
    (t) => packIds.has(t) || index.claims.has(t),
  );
  if (left) throw new Error(`Record ID left in ${where}: ${left}`);
  return text;
}

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
const addOnce = (n: Name, row: Row) => {
  if (added[n].some((r) => r.id === row.id) || existing(n, row.id))
    throw new Error(`Duplicate ${n} id: ${row.id}`);
  added[n].push(row);
};
function changeRow(n: Name, id: string, edit: (row: Row) => void) {
  const row = existing(n, id);
  if (!row) throw new Error(`No stored ${n} row: ${id}`);
  if (!changed[n].has(id)) changed[n].set(id, structuredClone(row));
  edit(row);
}

const usedSources = new Set<string>();
const sourceId = (key: string): string => {
  const x = extraSources.get(key);
  if (x) return x.id;
  const s = packSources.get(key);
  if (!s) throw new Error('Unknown pack source: ' + key);
  return (
    s.datasetSource ??
    map.sourceAliases[key]?.id ??
    `source-pp-${key.replace(/^pp-/, '')}`
  );
};

function checkSentence(id: string) {
  const item = checkOf.get(id);
  if (!item) throw new Error('No cross-family check item for ' + id);
  const agreed = item.comparison.verdict === 'agree';
  // Only the items whose findings changed the record say so; the others
  // were retrieval limits without a contradiction (review of 2026-10-31).
  const verdict = agreed
    ? 'agreed with the record'
    : (map.checkSentences.applied as number[]).includes(item.number)
      ? 'agreed in part; what followed from it was applied at admission'
      : map.checkSentences.retrieval;
  return item.part === 'A'
    ? `A cross-family machine check (2026-10-30, item ${item.number}) answered the record’s question blind from fresh retrievals and ${verdict}.`
    : `A cross-family machine check (2026-10-30, item ${item.number}) re-read the record’s sources and ${verdict}.`;
}

function quoteNote(claimId: string, i: number, e: Json) {
  const found = (verification.quotes as Json[]).find(
    (q) => q.claim === claimId && q.evidence === i + 1,
  );
  if (!found?.found)
    throw new Error(`Quotation not matched by the pack: ${claimId}:${i}`);
  return `The quotation (${words(e.passage)} words) matched the text retrieved for the candidate pack on ${pack.checkDate}. Matching ignored differences of whitespace, case, quotation marks, dashes, PDF line-break hyphens and Unicode compatibility forms, so the source’s typography can differ.`;
}

const quoted = new Map<string, Set<string>>();
/** A dataset source that records no length cannot carry a quotation. */
const lengthless = (key: string) => {
  const s = packSources.get(key);
  const id = s?.datasetSource ?? map.sourceAliases[key]?.id;
  const row = id ? existing('sources', id) : null;
  return Boolean(row && !(row.documentWords as Json)?.count);
};
function evidenceRow(claimId: string, eid: string, e: Json, note: string): Row {
  usedSources.add(e.source);
  const sid = sourceId(e.source);
  if (e.passageType === 'quote' && lengthless(e.source)) {
    // As in the author-person admission: the printed form, given as a
    // labelled paraphrase, because the dataset's source row records no
    // document length against which a quotation can be checked.
    e = {
      ...e,
      passageType: 'paraphrase',
      passage: `Credited as “${e.passage}” (${e.locator.charAt(0).toLowerCase()}${e.locator.slice(1)}).`,
    };
    note = `${note.replace(/ No human editorial review\.$/, '')} Given as a labelled paraphrase because the source records no document length against which a quotation can be checked. No human editorial review.`;
  }
  if (e.passageType === 'quote') {
    if (words(e.passage) > 50) throw new Error('Quote over 50 words: ' + eid);
    quoted.set(sid, (quoted.get(sid) ?? new Set()).add(e.passage));
  }
  return {
    id: eid,
    claimId,
    sourceId: sid,
    sourceRole: e.sourceRole,
    support: e.support,
    locator: e.locator,
    passage: e.passage,
    passageType: e.passageType,
    verification: 'machine_checked',
    checkedAt: e.checkedAt ?? checkDate,
    note: noIds(note, eid),
    retrievalRoute: 'direct',
  };
}

// ---------------------------------------------------------------- claims
const hold: Record<string, string> = map.hold;
const admitted = (pack.claims as Json[]).filter((c) => !hold[c.id]);
for (const id of Object.keys(hold))
  if (!packIds.has(id)) throw new Error('Held record not in pack: ' + id);
for (const id of Object.keys(map.claims))
  if (!admitted.some((c) => c.id === id))
    throw new Error('Correction for a record not admitted: ' + id);

const referenced = new Set<string>();
for (const c of admitted) {
  if (c.proposedPredicate) throw new Error('Proposed predicate: ' + c.id);
  const fix: Json = map.claims[c.id] ?? {};
  const item = checkOf.get(c.id);
  const evidence: Json[] = (c.evidence as Json[]).map((e, i) => ({
    ...e,
    ...(fix.evidence?.[i] ?? {}),
    note: [
      e.note,
      e.translation
        ? `Working translation: ${e.translation.replace(/ \(Selekoa's working translation\)/, '')}`
        : null,
      fix.evidence?.[i]?.note,
      e.passageType === 'quote' ? quoteNote(c.id, i, e) : null,
      i === 0 ? checkSentence(c.id) : null,
      'No human editorial review.',
    ]
      .filter(Boolean)
      .join(' '),
  }));
  for (const extra of (fix.addEvidence ?? []) as Json[])
    evidence.push({
      ...extra,
      checkedAt: date,
      note: `${extra.note} No human editorial review.`,
    });
  const short = c.id.replace(/^pp-/, '');
  const evidenceIds = evidence.map((_, i) => `pp-ev-${short}-${i + 1}`);
  evidence.forEach((e, i) =>
    addOnce('evidence', evidenceRow(c.id, evidenceIds[i], e, e.note)),
  );
  if (!item) throw new Error('Unchecked record: ' + c.id);
  const attributes = Object.fromEntries(
    Object.entries(c.attributes ?? {}).filter(([k]) => k === 'role'),
  );
  const qualification = [
    fix.qualification ?? c.qualification,
    fix.qualificationAdd,
  ]
    .filter(Boolean)
    .join(' ');
  addOnce('claims', {
    id: c.id,
    subject: c.subject,
    predicate: c.predicate,
    object: c.object,
    topic: map.topics[c.group],
    statement: noIds(fix.statement ?? c.statement, c.id),
    time: fix.time ?? c.time,
    derivation: c.derivation,
    resolution: c.resolution,
    ...(c.inferenceRationale
      ? { inferenceRationale: c.inferenceRationale }
      : {}),
    editorialState: 'seed',
    qualification: noIds(qualification, c.id),
    evidenceIds,
    recordedAt: date,
    ...(Object.keys(attributes).length ? { attributes } : {}),
  });
  referenced.add(c.subject);
  if (c.object.kind === 'entity') referenced.add(c.object.entityId);
}

// ---------------------------------------------------------------- entities
const claimSources = (personId: string) =>
  admitted
    .filter((c) => c.subject === personId)
    .flatMap((c) => (c.evidence as Json[]).map((e) => e.source as string));
for (const p of pack.persons as Json[]) {
  const over: Json = map.persons[p.id] ?? {};
  if (p.existing) continue;
  if (existing('entities', p.id)) throw new Error('Person exists: ' + p.id);
  const keys = [
    ...new Set<string>([
      ...(p.identity as Json[]).map((x) => x.source),
      ...(over.addSources ?? []),
      ...claimSources(p.id),
    ]),
  ];
  for (const k of keys) usedSources.add(k);
  addOnce('entities', {
    id: p.id,
    name: p.name,
    sortName: p.sortName,
    type: 'person',
    subtype: p.subtype,
    aliases: p.aliases,
    description: noIds(over.description ?? p.description, p.id),
    sourceIds: [...new Set(keys.map(sourceId))],
  });
}
for (const [id, over] of Object.entries(map.existingEntities as Json))
  changeRow('entities', id, (row) => {
    if (over.subtype) row.subtype = over.subtype;
  });
const docSubtypes: Record<string, string> = map.documentSubtypeMap;
for (const d of pack.documents as Json[]) {
  const over: Json = map.documents[d.id] ?? {};
  const publishedAt: string | null = over.publishedAt ?? d.publishedAt;
  const publisher = existing('entities', d.publisherId);
  if (!publisher) throw new Error('No publisher: ' + d.publisherId);
  const subtype = docSubtypes[d.subtype] ?? d.subtype;
  usedSources.add(d.source);
  const label = `${publisher.name} ${subtype.toLowerCase()}${publishedAt ? ` (${publishedAt})` : ''}`;
  const dateNote =
    over.dateNote ??
    (publishedAt
      ? 'Date the text gives, as recorded by the candidate pack.'
      : undefined);
  addOnce('entities', {
    id: d.id,
    name: d.title,
    type: 'document',
    subtype,
    aliases: [],
    description: publishedAt
      ? `${subtype} published by ${publisher.name}. ${dateNote}`
      : `${subtype} published by ${publisher.name}. The page shows no date; the record is dated by retrieval.`,
    sourceIds: [sourceId(d.source)],
    ...(publishedAt
      ? {
          documentVersion: {
            // A family key, not an entity: the ID without its year.
            family: d.id.replace(/-\d{4}(?=-|$)/, ''),
            label,
            publisherId: d.publisherId,
            publishedAt,
            ...(over.revisedAt ? { revisedAt: over.revisedAt } : {}),
            dateNote,
          },
        }
      : {}),
  });
}
for (const id of referenced)
  if (!existing('entities', id) && !added.entities.some((e) => e.id === id))
    throw new Error('Entity without a row: ' + id);

// ---------------------------------------------------------------- sources
const kinds: Record<string, string> = map.sourceKindMap;
const documentOf = new Map<string, string>(
  (pack.documents as Json[])
    .filter((d) => d.id !== 'hennessy-2026-alphabet-chair-letter')
    .map((d) => [d.source, d.id]),
);
for (const key of [...packSources.keys(), ...extraSources.keys()]) {
  if (!usedSources.has(key)) continue;
  const id = sourceId(key);
  if (existing('sources', id) || added.sources.some((s) => s.id === id))
    continue;
  const x = extraSources.get(key);
  if (x) {
    addOnce('sources', {
      id,
      title: x.title,
      authors: x.authors,
      publisher: x.publisher,
      ...(x.publisherId ? { publisherId: x.publisherId } : {}),
      publicationDate: x.publicationDate,
      version: x.version,
      canonicalUrl: x.url,
      evidenceUrl: x.url,
      language: x.language,
      kind: x.kind,
      accessedAt: x.accessedAt,
      reuse: {
        attribution: `${x.authors.join(', ')}, “${x.title}”${x.publicationDate ? `, ${x.publicationDate}` : ''}.`,
        licence: 'No open redistribution licence asserted',
        note: 'Bibliographic metadata only; no passage is quoted. Recheck terms before wider redistribution.',
      },
    });
    continue;
  }
  const s = packSources.get(key)!;
  const over: Json = map.sourceOverrides[key] ?? {};
  const documentId = documentOf.get(key);
  const doc = documentId
    ? (pack.documents as Json[]).find((d) => d.id === documentId)
    : undefined;
  const publicationDate: string | null =
    (documentId && map.documents[documentId]?.publishedAt) ??
    s.publicationDate ??
    null;
  const letterFix =
    key === 'nadella-2025-shareholder-letter'
      ? ' The letter’s closing signature is dated 15 October 2025 (cross-family check, item 76; matched again at admission on 2026-10-31 in a fresh retrieval whose SHA-256 equals the pack’s).'
      : '';
  const version = [
    `Retrieved for the candidate pack on ${s.retrievedAt} (SHA-256 ${s.sha256}).`,
    s.version.replace(/; the letter carries no date\./, '.'),
    letterFix,
    over.versionAdd,
    ['webpage', 'profile', 'post', 'announcement'].includes(s.kind)
      ? 'Its wording can change; earlier wording is not authenticated.'
      : '',
  ]
    .filter(Boolean)
    .join(' ');
  addOnce('sources', {
    id,
    ...(documentId ? { documentId } : {}),
    title: s.title,
    authors: [s.publisher],
    publisher: s.publisher,
    ...(doc ? { publisherId: doc.publisherId } : {}),
    publicationDate,
    version: noIds(version, id),
    canonicalUrl: over.url ?? s.url,
    evidenceUrl: over.url ?? s.finalUrl ?? s.url,
    language: s.language === 'zh' ? 'zh-Hans' : s.language,
    ...(s.documentWords
      ? {
          documentWords: {
            count: s.documentWords.count,
            basis: `${s.documentWords.basis.replace(/\.$/, '')}; counted for the candidate pack`,
          },
        }
      : {}),
    kind: kinds[s.kind] ?? s.kind,
    accessedAt: s.retrievedAt,
    reuse: {
      attribution: `${s.publisher}, “${s.title}”${publicationDate ? `, ${publicationDate}` : ''}.`,
      licence: 'No open redistribution licence asserted',
      note: 'Bibliographic metadata, editorial paraphrases and short attributed quotations (at most 50 words each). Recheck terms before wider redistribution.',
    },
  });
}

// ---------------------------------------------------------------- limits
const norm = (p: string) =>
  p
    .toLowerCase()
    .replace(/[‘’'“”"]/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
const overLimit: string[] = [];
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
const meta = {
  ...base.meta,
  updatedAt: date,
  scope: `${base.meta.scope} ${map.scope}`,
};
const result = {
  meta,
  ...Object.fromEntries(names.map((n) => [n, [...base[n], ...added[n]]])),
} as unknown as { meta: Json } & Record<Name, Row[]>;
const baseCommit =
  snapshot?.baseCommit ??
  execFileSync('git', ['rev-parse', '--short', 'HEAD']).toString().trim();
const newSnapshot = {
  description: map.snapshotDescription,
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
if (check) {
  const differing = Object.entries(outputs).filter(
    ([path, value]) =>
      JSON.stringify(read(path)) !==
      JSON.stringify(JSON.parse(JSON.stringify(value))),
  );
  if (differing.length) {
    console.error(
      'Differs from stored: ' + differing.map(([p]) => p).join(', '),
    );
    process.exitCode = 1;
  } else console.log('Stored records match the pack and the map.');
} else {
  for (const [path, value] of Object.entries(outputs))
    writeFileSync(path, JSON.stringify(value, null, 2) + '\n');
  execFileSync('pnpm', ['prettier', '--write', ...Object.keys(outputs)], {
    stdio: 'ignore',
  });
  console.log(
    `Added ${names.map((n) => `${added[n].length} ${n}`).join(', ')}; changed ${names.map((n) => `${changed[n].size} ${n}`).join(', ')}.`,
  );
}
