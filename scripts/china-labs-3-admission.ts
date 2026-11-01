// Admits the third Chinese frontier-AI institutions collection
// (research/china-labs-3) into the dataset, in two parts, using the authored
// map in review/china-labs-3-admission-map-2026-10-31.json, the maintainer's
// decisions of 2026-10-30 and the maintainer's adjudication of the
// cross-family check of 2026-10-31 (review/china-labs-pack-3-2026-10-29.md).
//
//   pnpm tsx scripts/china-labs-3-admission.ts                 write parts 1 and 2
//   pnpm tsx scripts/china-labs-3-admission.ts --part 1        write part 1 only
//   pnpm tsx scripts/china-labs-3-admission.ts [--part 1] --check
//                                                              compare with the stored records
//
// Part 1 admits every record on the existing schema. Part 2 raises the schema
// to the next minor version (attributes.listedEntity) and admits the eleven
// developers' entries in the CAC lists of filed services (decision 2).
//
// The script is idempotent. Where the stored data holds the rows that the
// before-snapshots (review/china-labs-3-admission-{1,2}-before-2026-10-31.json)
// list as added, and the metadata this admission wrote, it removes those rows
// and restores the rows they changed, then rebuilds both parts. A snapshot
// whose added rows are absent from the stored data is foreign (a new base)
// and is ignored: both parts are rebuilt from the stored data. A stored part
// whose metadata changed after it was written stops the script. A pack entity
// or source already in the base is reused, and a pack record that duplicates
// a stored record (same subject, predicate, object and role) is skipped and
// reported. The pack is never changed.
import { createHash } from 'node:crypto';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { maxQuotedWords } from '../src/domain/schema';

const date = '2026-10-31';
const dir = 'research/china-labs-3';
const files = {
  pack: `${dir}/pack.json`,
  verification: `${dir}/verification.json`,
  check: `${dir}/cross-family-check-2026-10-29.json`,
  map: `review/china-labs-3-admission-map-${date}.json`,
  snapshot: (part: string) =>
    `review/china-labs-3-admission-${part}-before-${date}.json`,
};
const names = ['entities', 'claims', 'sources', 'evidence'] as const;
type Name = (typeof names)[number];
type Row = Record<string, unknown> & { id: string };
type Json = Record<string, any>; // eslint-disable-line @typescript-eslint/no-explicit-any
type Data = { meta: Json } & Record<Name, Row[]>;

const read = (path: string) => JSON.parse(readFileSync(path, 'utf8'));
const args = process.argv.slice(2);
const check = args.includes('--check');
const onlyPart = args.includes('--part')
  ? args[args.indexOf('--part') + 1]
  : undefined;
if (onlyPart && onlyPart !== '1' && onlyPart !== '2')
  throw new Error('Usage: [--part 1|2] [--check]');
const pack: Json = read(files.pack);
const verification: Json = read(files.verification);
const crossCheck: Json = read(files.check);
const map: Json = read(files.map);

// ---------------------------------------------------------------- base
const sha = (value: unknown) =>
  createHash('sha256').update(JSON.stringify(value)).digest('hex');
const stored: Data = {
  meta: read('data/meta.json'),
  ...Object.fromEntries(names.map((n) => [n, read(`data/${n}.json`)])),
} as Data;
const snapshots: Record<string, Json | null> = Object.fromEntries(
  ['1', '2'].map((p) => [
    p,
    existsSync(files.snapshot(p)) ? read(files.snapshot(p)) : null,
  ]),
);
/** Key-order-independent JSON, for comparing metadata. */
const canonical = (value: unknown): string =>
  Array.isArray(value)
    ? `[${value.map(canonical).join(',')}]`
    : value && typeof value === 'object'
      ? `{${Object.keys(value)
          .sort()
          .map((k) => `${JSON.stringify(k)}:${canonical((value as Json)[k])}`)
          .join(',')}}`
      : JSON.stringify(value);
// A snapshot describes the stored data only if this script wrote the stored
// part on top of the snapshot's base. On a new base (another admission merged
// first, or the parts not yet written) a snapshot is foreign: restoring its
// metadata and rows would drop the base's own changes, so it is ignored and
// both parts are rebuilt from the stored data. Where the stored data holds a
// part's rows but its metadata changed after the part was written, the
// script refuses instead of guessing.
for (const part of ['2', '1']) {
  const snap = snapshots[part];
  if (!snap) continue;
  const ids = names.flatMap((n) =>
    ((snap.added[n] ?? []) as string[]).map((id) => [n, id] as [Name, string]),
  );
  const present = ids.filter(([n, id]) => stored[n].some((r) => r.id === id));
  if (present.length < ids.length) {
    if (present.length)
      throw new Error(
        `Snapshot ${part} is foreign but ${present.length} of its ${ids.length} added rows are stored (e.g. ${present[0][1]}). Remove this admission's rows from data/ or restore the matching snapshot before rerunning.`,
      );
    console.warn(
      `Snapshot ${part} lists rows absent from the stored data; ignoring it and rebuilding from the stored data.`,
    );
    snapshots[part] = null;
    continue;
  }
  if (part === '2' && !snapshots['1'])
    throw new Error(
      'Snapshot 2 matches the stored data but snapshot 1 does not.',
    );
}
/** The metadata a part writes on top of a base's metadata. */
const partMeta = (part: string, base: Json) => {
  const plan: Json = map.parts[part];
  const bump = (v: string) => {
    const [major, minor] = v.split('.').map(Number);
    return `${major}.${minor + 1}`;
  };
  return {
    ...base,
    ...(plan.schemaVersion
      ? {
          schemaVersion:
            plan.schemaVersion === 'next'
              ? bump(base.schemaVersion)
              : plan.schemaVersion,
        }
      : {}),
    updatedAt: date,
    scope: `${base.scope} ${plan.scope}`,
  };
};
{
  const s1 = snapshots['1'];
  const s2 = snapshots['2'];
  const expected = s2
    ? partMeta('2', s2.meta)
    : s1
      ? partMeta('1', s1.meta)
      : undefined;
  const chained =
    !s1 || !s2 || canonical(partMeta('1', s1.meta)) === canonical(s2.meta);
  if (expected && (!chained || canonical(expected) !== canonical(stored.meta)))
    throw new Error(
      'data/meta.json is not what this admission wrote on the snapshots’ base: it changed after the admission (for example, another admission merged on top). Restoring the snapshot would drop that change. Regenerate the snapshots from the new base: rerun on data/ without this admission’s rows, with the snapshots removed.',
    );
}
/** The data before a part: its added rows removed, its changed rows restored. */
function undo(data: Data, snap: Json | null): Data {
  if (!snap) return data;
  return {
    meta: snap.meta,
    ...Object.fromEntries(
      names.map((n) => {
        const added = new Set<string>(snap.added[n] ?? []);
        const before = new Map<string, Row>(
          (snap.before[n] ?? []).map((r: Row) => [r.id, r]),
        );
        return [
          n,
          data[n]
            .filter((r) => !added.has(r.id))
            .map((r) => structuredClone(before.get(r.id) ?? r)),
        ];
      }),
    ),
  } as Data;
}
const base0 = undo(undo(stored, snapshots['2']), snapshots['1']);

// ---------------------------------------------------------------- pack
const packSources = new Map<string, Json>(
  pack.sources.map((s: Json) => [s.id, s]),
);
const extraSources = new Map<string, Json>(
  (map.extraSources as Json[]).map((s) => [s.id, s]),
);
const packEntities = new Map<string, Json>(
  pack.entities.map((e: Json) => [e.id, e]),
);
const newEntities = new Map<string, Json>(
  (map.newEntities as Json[]).map((e) => [e.id, e]),
);
const checkOf = new Map<string, Json>(
  Object.values(crossCheck.items as Json).map((item: Json) => [
    item.record_id,
    item,
  ]),
);
const part2 = new Set<string>(map.parts['2'].include);
const holds: Record<string, string> = map.holds;
for (const id of [...part2, ...Object.keys(holds)])
  if (!pack.claims.some((c: Json) => c.id === id))
    throw new Error('Not a pack record: ' + id);
const partOf = (id: string) => (part2.has(id) ? '2' : '1');
// Entities the pack's text may name by ID: its own, the map's new ones and
// the stored organisations its records point to.
const knownEntities = new Set<string>([
  ...packEntities.keys(),
  ...newEntities.keys(),
  ...(pack.claims as Json[])
    .map((c) => c.attributes?.listedEntity)
    .filter(Boolean),
]);

// ---------------------------------------------------------------- text
const cjk = /[぀-ヿ㐀-鿿豈-﫿]/g;
/** The pack's stricter count: each CJK character is one word. */
const packWords = (s: string) =>
  (s.match(cjk) ?? []).length +
  s
    .replace(cjk, ' ')
    .split(/\s+/)
    .filter((w) => /[\p{L}\p{N}]/u.test(w)).length;
const hasCjk = (s: string) => /[㐀-鿿]/.test(s);
const machine = (text: string) =>
  `English machine translation, not verified by a person: “${text}”.`;
const loaded =
  /\b(poach(ed|ing)?|ousted?|defect(ed|ion)?|exodus|rivals?|betray\w*|purge\w*|landmark|pioneer\w*|first to)\b/i;
// Line-break spaces between Chinese characters and compatibility forms in
// the text layer of the TC260 PDFs (as the second collection normalised them).
const normalisedSources = new Set([
  'c3-src-tc260-asgf-v1-pdf',
  'c3-src-tc260-asgf-v2-pdf',
  'c3-src-tc260-asgf-v3-pdf',
]);
const cjkChar = '[㐀-鿿，。、；：（）《》“”]';
const tidyCjk = (s: string) =>
  s
    .replace(/⻛/g, '风')
    .replace(/⻅/g, '见')
    .replace(new RegExp(`(${cjkChar})\\s+(?=${cjkChar})`, 'g'), '$1');

// ---------------------------------------------------------------- build
type Built = {
  result: Data;
  added: Record<Name, Row[]>;
  changed: Record<Name, Map<string, Row>>;
  skipped: string[];
  reused: string[];
};
const usedMapKeys = new Set<string>();

function build(
  part: '1' | '2',
  base: Data,
  earlier = new Set<string>(),
): Built {
  const existing = (n: Name, id: string) => base[n].find((r) => r.id === id);
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
  const skipped: string[] = [];
  const reused: string[] = [];
  const has = (n: Name, id: string) =>
    Boolean(existing(n, id) || added[n].some((r) => r.id === id));
  const addOnce = (n: Name, row: Row) => {
    if (has(n, row.id)) throw new Error(`Duplicate ${n} id: ${row.id}`);
    added[n].push(row);
  };
  const changeRow = (n: Name, id: string, edit: (row: Json) => void) => {
    const row = existing(n, id);
    if (!row) throw new Error(`No stored ${n} row: ${id}`);
    if (!changed[n].has(id)) changed[n].set(id, structuredClone(row));
    edit(row);
  };

  // A pack record that duplicates a stored one (another pack on the chain)
  // is skipped: same subject, predicate, object and role.
  const sameAs = (c: Json) =>
    base.claims.find(
      (o: Json) =>
        o.subject === c.subject &&
        o.predicate === c.predicate &&
        JSON.stringify(o.object) === JSON.stringify(c.object) &&
        (o.attributes?.role ?? '') === (c.attributes?.role ?? '') &&
        !String(o.id).startsWith('c3-'),
    );

  const include = (pack.claims as Json[]).filter(
    (c) => partOf(c.id) === part && !holds[c.id],
  );
  const admittedIds = new Set<string>([
    ...base.claims.map((c) => c.id),
    ...include.map((c) => c.id),
  ]);
  const laterIds = new Set<string>(
    (pack.claims as Json[])
      .filter((c) => !admittedIds.has(c.id))
      .map((c) => c.id),
  );
  const entityName = (id: string) => {
    if (!knownEntities.has(id)) return undefined;
    const e: Json | undefined =
      existing('entities', id) ??
      packEntities.get(id) ??
      newEntities.get(id) ??
      undefined;
    if (!e || e.existing) {
      const row = existing('entities', id);
      if (!row) return undefined;
      return ((row.shortName as string) ?? (row.name as string)).split(
        ' / ',
      )[0];
    }
    return ((e.shortName as string) ?? (e.name as string)).split(' / ')[0];
  };
  const idToken = /`?\b[a-z0-9][a-z0-9]*(?:-[a-z0-9]+)+\b`?|`[a-z0-9]+`/g;
  /** Reader-facing text never names a record ID. */
  function prose(text: string, where: string) {
    let out = text
      .replace(
        /\b(?:the )?(?:dataset |proposed |existing )?entity `?([a-z0-9][a-z0-9-]*)`?/g,
        (m, id) =>
          entityName(id) ? `the dataset’s record of ${entityName(id)}` : m,
      )
      .replace(/\bthe `?([a-z0-9][a-z0-9-]*)`? entity\b/g, (m, id) =>
        entityName(id) ? `the dataset’s record of ${entityName(id)}` : m,
      )
      .replace(/ \(`?([a-z0-9][a-z0-9-]*)`?\)/g, (m, id) =>
        admittedIds.has(id) || laterIds.has(id)
          ? ' (recorded separately)'
          : entityName(id)
            ? ''
            : m,
      )
      .replace(/\(see `?([a-z0-9][a-z0-9-]*)`?\)/g, (m, id) =>
        admittedIds.has(id) || laterIds.has(id) ? '(recorded separately)' : m,
      )
      .replace(/\bsupports `?([a-z0-9][a-z0-9-]*)`?\./g, (m, id) =>
        admittedIds.has(id) ? 'supports another record of the same event.' : m,
      );
    // The reader's unit is the collection, not the candidate pack.
    out = out
      .replace(/\bthis pack(['’]s) governance group\b/g, 'this collection')
      .replace(/\bthis pack(['’]s)?\b/g, 'this collection$1')
      .replace(/\bthe pack tool\b/g, 'the preparing tool');
    out = out.replace(idToken, (t) => {
      const id = t.replace(/`/g, '');
      if (admittedIds.has(id) || laterIds.has(id)) return 'recorded separately';
      if ((t.startsWith('`') || /-/.test(id)) && entityName(id))
        return entityName(id)!;
      return t;
    });
    const left = (out.match(idToken) ?? []).find((t) => {
      const id = t.replace(/`/g, '');
      return (
        admittedIds.has(id) ||
        laterIds.has(id) ||
        (/-/.test(id) && knownEntities.has(id))
      );
    });
    if (left) throw new Error(`Record ID left in ${where}: ${left}`);
    return out;
  }

  // ------------------------------------------------------------ sources
  const usedSources = new Set<string>();
  const sourceIdOf = new Map<string, string>();
  /** The dataset ID a pack or map source becomes (reused where stored). */
  const sourceId = (key: string): string => {
    if (sourceIdOf.has(key)) return sourceIdOf.get(key)!;
    let id: string;
    const x = extraSources.get(key);
    const s = packSources.get(key);
    if (x) id = x.id;
    else if (s?.datasetSourceId) id = s.datasetSourceId;
    else if (s) {
      const sameUrl = base.sources.find((r) => r.canonicalUrl === s.url);
      id = sameUrl ? sameUrl.id : key;
      if (sameUrl && sameUrl.id !== key)
        reused.push(`source ${key} → ${sameUrl.id}`);
    } else if (existing('sources', key)) id = key;
    else throw new Error('Unknown source: ' + key);
    sourceIdOf.set(key, id);
    return id;
  };

  // ------------------------------------------------------------ evidence
  const quoted = new Map<string, Set<string>>();
  const quote = (sid: string, passage: string) => {
    if (packWords(passage) > 50)
      throw new Error('Quote over 50 words: ' + passage);
    quoted.set(sid, (quoted.get(sid) ?? new Set()).add(passage));
  };
  const checkSentence = (claimId: string) => {
    const item = checkOf.get(claimId);
    if (!item) return '';
    if (item.part === 'B')
      return `A cross-family machine check (2026-10-31, item ${item.number}) re-read the record’s sources directly and found ${item.evidence_support === 'full' ? 'full support' : 'partial support'}.`;
    const a = item.comparison?.assessment;
    return `A cross-family machine check (2026-10-31, item ${item.number}) answered the record’s question blind from fresh retrievals and ${a === 'agree' ? 'agreed with the record' : 'agreed in part; the admission record lists how each point was handled'}.`;
  };
  function evidenceRow(
    claimId: string,
    e: Json,
    note: string,
    route: string | null = 'direct',
  ): Row {
    usedSources.add(e.sourceId);
    const sid = sourceId(e.sourceId);
    if (e.passageType === 'quote') quote(sid, e.passage);
    return {
      id: e.id,
      claimId,
      sourceId: sid,
      sourceRole: e.sourceRole,
      support: e.support,
      locator: prose(e.locator, e.id),
      passage:
        e.passageType === 'quote' ? e.passage : prose(e.passage, e.id + ':p'),
      passageType: e.passageType,
      verification: 'machine_checked',
      checkedAt: date,
      note: prose(note, e.id + ':note'),
      ...(route ? { retrievalRoute: route } : {}),
    };
  }
  function packEvidenceNote(
    claimId: string,
    e: Json,
    extra: { changed?: string; atAdmission?: boolean; normalised?: boolean },
  ) {
    const drafting = verification.passagesChecked[e.origin ?? e.id];
    if (drafting?.match !== 'match')
      throw new Error('Passage not matched in drafting: ' + e.id);
    const fresh = verification.fresh.passagesChecked[e.origin ?? e.id];
    const elided = e.passageType === 'quote' && /…|\.\.\./.test(e.passage);
    const verbatim =
      e.passageType === 'quote'
        ? `The quotation (${packWords(e.passage)} words${hasCjk(e.passage) ? ', each CJK character counted as one' : ''})`
        : e.anchor
          ? 'The paraphrase’s verbatim anchor'
          : 'The candidate pack’s quotation of this passage';
    const matched = extra.atAdmission
      ? `${verbatim} was matched at admission on ${date} in a direct retrieval whose SHA-256 equals the pack’s.`
      : fresh?.match === 'match'
        ? `${verbatim} matched the text retrieved for the candidate pack on 2026-10-29 and again in a fresh retrieval the same day, read directly from the publisher.`
        : `${verbatim} matched the text retrieved for the candidate pack on 2026-10-29, read directly from the publisher; the fresh retrieval ${fresh?.match === 'not cached' ? 'failed (the host reset the connection)' : 'returned a page the tool treats as a block page, byte-identical to the first copy'}.`;
    return [
      `Candidate pack passage, Chinese frontier-AI institutions, third collection (${dir}).`,
      e.visualReading
        ? `Read from a layout rendering of the PDF page, where the text layer separates the table’s columns. ${matched.replace(' matched ', ' matched, in its parts and in order, ')}`
        : matched,
      'Matching ignored differences of whitespace, case, quotation marks, dashes and Unicode compatibility forms, so the source’s typography can differ.',
      extra.normalised
        ? 'Line-break spaces between Chinese characters and compatibility forms (⻛ for 风) in the PDF’s text layer were normalised at admission.'
        : '',
      elided
        ? 'Elided quotation: the ellipses mark omitted words, so the passage is not continuous in the source.'
        : '',
      e.passageType === 'paraphrase'
        ? e.anchor
          ? 'The paraphrase is Selekoa’s; only the anchor is the source’s wording.'
          : 'The paraphrase is Selekoa’s.'
        : '',
      extra.changed ?? '',
      e.translation ? machine(e.translation) : '',
      !e.translation && hasCjk(e.passage) && e.passageType === 'quote'
        ? 'No English rendering is given; no human translation review.'
        : '',
      checkSentence(claimId),
      'No human editorial review.',
    ]
      .filter(Boolean)
      .join(' ');
  }

  // ------------------------------------------------------------ claims
  /** A stored or admitted passage cited again as context for another record. */
  const copyRow = (from: Row, n: Json, claimId: string): Row => ({
    ...structuredClone(from),
    id: n.id,
    claimId,
    support: n.support,
    checkedAt: date,
    note: `${(from.note as string)
      .replace(/ No human editorial review\.$/, '')
      .replace(
        / A cross-family machine check \(2026-10-31, item K\d+\)[^.]*\./,
        '',
      )} Cited at the admission of the third Chinese collection (${dir}) as context for ${n.purpose ?? 'this record’s comparison'}; the same passage supports another record. No human editorial review.`,
  });
  const later: { n: Json; claimId: string; at: number }[] = [];
  for (const raw of include) {
    const plan: Json = map.claims[raw.id] ?? {};
    usedMapKeys.add(`claims:${raw.id}`);
    const c: Json = structuredClone(raw);
    for (const key of [
      'subject',
      'predicate',
      'object',
      'statement',
      'qualification',
      'derivation',
      'inferenceRationale',
    ])
      if (plan[key] !== undefined) c[key] = plan[key];
    if (plan.time) c.time = plan.time;
    for (const [from, to] of (plan.qualificationReplace
      ? [plan.qualificationReplace]
      : []) as [string, string][]) {
      if (!c.qualification.includes(from))
        throw new Error('Qualification text not found: ' + raw.id);
      c.qualification = c.qualification.replace(from, to);
    }
    // Attributes: the schema's fields only. Stages, rounds, counts' notes and
    // the CAC row fields stay in the statement and qualification.
    const attributes: Json = structuredClone(c.attributes ?? {});
    for (const k of [
      'stage',
      'round',
      'relation',
      'countNote',
      'countBasis',
      'legalEntityName',
      'modelName',
      'filingNumber',
      'filingDate',
    ])
      delete attributes[k];
    if (plan.attributes === null)
      for (const k of Object.keys(attributes)) delete attributes[k];
    else Object.assign(attributes, plan.attributes ?? {});
    if (attributes.listedEntity) {
      if (part !== '2')
        throw new Error('A listed entity before the schema change: ' + c.id);
      attributes.listing = { count: 1, countBasis: 'counted' };
    }
    if (c.predicate === 'states_provision') {
      const p = attributes.provision;
      attributes.provision = p
        ? { kind: map.provisionKinds[p.kind] ?? p.kind, key: p.key }
        : {
            kind: 'statement',
            key: c.id.replace(/^c3-/, '').replace(/^01ai-/, 'zero-one-ai-'),
          };
    }
    const dup = sameAs({ ...c, attributes });
    if (dup) {
      skipped.push(`${c.id} duplicates stored ${dup.id}`);
      admittedIds.delete(c.id);
      continue;
    }

    // Time: the schema's bases. A snapshot, interval or unknown date has none.
    const time: Json = { kind: c.time.kind };
    for (const key of ['date', 'from', 'until', 'basis', 'note'])
      if (c.time[key] !== undefined && c.time[key] !== null)
        time[key] = c.time[key];
    if (time.kind !== 'event') delete time.basis;
    if (time.basis === 'filing')
      throw new Error('A filing basis without a decision: ' + c.id);
    time.note = prose(time.note, c.id + ':time');

    const statement = prose(c.statement, c.id);
    const qualification = prose(c.qualification, c.id + ':q');
    if (loaded.test(statement) || loaded.test(qualification))
      throw new Error('Loaded wording: ' + c.id);

    const evidenceIds: string[] = [];
    const push = (row: Row) => {
      addOnce('evidence', row);
      evidenceIds.push(row.id);
    };
    for (const rawEvidence of c.evidence as Json[]) {
      const ePlan: Json = map.evidence[rawEvidence.id] ?? {};
      if (map.evidence[rawEvidence.id])
        usedMapKeys.add(`evidence:${rawEvidence.id}`);
      const e: Json = {
        ...structuredClone(rawEvidence),
        translation: rawEvidence.translation?.text ?? null,
      };
      for (const k of ['locator', 'passage', 'passageType', 'support'])
        if (ePlan[k] !== undefined) e[k] = ePlan[k];
      if ('translation' in ePlan) e.translation = ePlan.translation;
      const normalised =
        normalisedSources.has(e.sourceId) &&
        e.passageType === 'quote' &&
        tidyCjk(e.passage) !== e.passage;
      if (normalised) e.passage = tidyCjk(e.passage);
      if (ePlan.split) {
        for (const piece of ePlan.split as Json[]) {
          if (!e.passage.includes(piece.passage.replace(/\s+/g, ' ')))
            throw new Error('A split part outside the pack passage: ' + e.id);
          const p = {
            ...e,
            id: piece.id,
            origin: e.id,
            locator: piece.locator,
            passage: piece.passage,
          };
          push(
            evidenceRow(
              c.id,
              p,
              packEvidenceNote(c.id, p, {
                atAdmission: true,
                changed:
                  'The pack had joined the author and the affiliation into one quotation across intervening authors; at admission each became its own quotation (cross-family check, item K033).',
              }),
            ),
          );
        }
        continue;
      }
      // The table-row wording belongs to the check's items (K006, K103); a
      // change the admission made on its own gives its own note.
      const toParaphrase =
        e.passageType === 'paraphrase' && rawEvidence.passageType === 'quote';
      if (toParaphrase && !ePlan.changedNote && !/^K\d+:/.test(ePlan.reason))
        throw new Error(
          'A quotation made a paraphrase without a note: ' + e.id,
        );
      const changedText = ePlan.changedNote
        ? ePlan.changedNote
        : ePlan.passage
          ? toParaphrase
            ? `The candidate pack quoted this passage; the cross-family check found that the quotation did not reproduce the source’s order or text, so at admission it became Selekoa’s paraphrase of the printed row, keeping its values (${ePlan.reason.split(':')[0]}).`
            : `Paraphrase revised at admission (${ePlan.reason.split(':')[0]}).`
          : ePlan.locator
            ? `Locator corrected at admission (${ePlan.reason.split(':')[0]}).`
            : 'translation' in ePlan
              ? `Working translation corrected at admission (${ePlan.reason.split(':')[0]}).`
              : '';
      push(
        evidenceRow(
          c.id,
          e,
          packEvidenceNote(c.id, e, { changed: changedText, normalised }),
        ),
      );
    }
    for (const n of (map.newEvidence as Json[]).filter(
      (n) => n.claimId === c.id,
    )) {
      usedMapKeys.add(`newEvidence:${n.id}`);
      if (n.copyOf) {
        const from =
          base.evidence.find((x) => x.id === n.copyOf) ??
          added.evidence.find((x) => x.id === n.copyOf);
        // A passage of a record admitted later in this part is cited once
        // that record is built (below).
        if (from) push(copyRow(from, n, c.id));
        else later.push({ n, claimId: c.id, at: evidenceIds.length });
        continue;
      }
      push(
        evidenceRow(
          c.id,
          n,
          [
            `Added at the admission of the Chinese frontier-AI institutions, third collection (${dir}).`,
            n.reason,
            checkSentence(c.id),
            'No human editorial review.',
          ].join(' '),
          n.retrievalRoute ?? null,
        ),
      );
    }

    if (c.derivation === 'inferred' && !c.inferenceRationale)
      throw new Error('An inferred record without a rationale: ' + c.id);
    addOnce('claims', {
      id: c.id,
      subject: c.subject,
      predicate: c.predicate,
      object: c.object,
      topic: c.topic,
      statement,
      time,
      derivation: c.derivation,
      resolution: c.resolution,
      ...(c.inferenceRationale
        ? { inferenceRationale: prose(c.inferenceRationale, c.id + ':ir') }
        : {}),
      editorialState: 'seed',
      qualification,
      evidenceIds,
      recordedAt: date,
      ...(Object.keys(attributes).length ? { attributes } : {}),
    });
  }

  for (const [i, { n, claimId, at }] of later.entries()) {
    const from = added.evidence.find((x) => x.id === n.copyOf);
    if (!from) throw new Error('Unknown evidence to cite: ' + n.copyOf);
    const row = copyRow(from, n, claimId);
    addOnce('evidence', row);
    const claim = added.claims.find((x) => x.id === claimId);
    if (!claim) throw new Error('Context for a record not admitted: ' + n.id);
    // Each earlier deferred passage of the record moved the position by one,
    // so the record keeps the map's order of its passages.
    const shift = later.slice(0, i).filter((o) => o.claimId === claimId).length;
    (claim.evidenceIds as string[]).splice(at + shift, 0, row.id);
  }

  // ------------------------------------------- edits to stored records
  if (part === '1') {
    const src = map.storedEvidenceSource;
    for (const [id, edit] of Object.entries(
      map.storedClaimEdits as Record<string, Json>,
    )) {
      usedMapKeys.add(`storedClaimEdits:${id}`);
      const e = edit.evidence;
      if (existing('evidence', e.id)) {
        reused.push(`evidence ${e.id} already stored`);
        continue;
      }
      changeRow('claims', id, (row) => {
        const [from, to] = edit.qualificationReplace as [string, string];
        if (!row.qualification.includes(from))
          throw new Error('Qualification text not found: ' + id);
        row.qualification = row.qualification.replace(from, to);
        row.statement = edit.statement;
        row.time = edit.time;
        row.evidenceIds = [e.id, ...row.evidenceIds];
      });
      addOnce(
        'evidence',
        evidenceRow(
          id,
          {
            id: e.id,
            sourceId: src.sourceId,
            sourceRole: 'primary',
            support: 'supports',
            locator: src.locator,
            passageType: 'quote',
            passage: e.passage,
          },
          [
            `Added at the admission of the Chinese frontier-AI institutions, third collection (${dir}), as a correction (decision 8): StepFun’s own post is primary evidence for a record that rested on reporting.`,
            `${src.check.replace('The quotation', `The quotation (${packWords(e.passage)} words, each CJK character counted as one)`)} Matching ignored differences of whitespace.`,
            machine(e.translation),
            'No human editorial review.',
          ].join(' '),
        ),
      );
    }
    for (const [id, plan] of Object.entries(
      map.aliases as Record<string, Json>,
    )) {
      usedMapKeys.add(`aliases:${id}`);
      const row = existing('entities', id);
      if (!row) throw new Error('No stored entity: ' + id);
      const missing = (plan.add as string[]).filter(
        (a) => !(row.aliases as string[]).includes(a),
      );
      if (missing.length)
        changeRow('entities', id, (r) => {
          r.aliases = [...r.aliases, ...missing];
        });
    }
  }

  // ------------------------------------------------------------ entities
  const referenced = new Set<string>();
  for (const c of added.claims) {
    referenced.add(c.subject as string);
    if ((c.object as Json).kind === 'entity')
      referenced.add((c.object as Json).entityId);
    const listed = (c.attributes as Json | undefined)?.listedEntity;
    if (listed) referenced.add(listed);
  }
  for (const id of referenced) {
    if (existing('entities', id)) {
      const p = packEntities.get(id) ?? newEntities.get(id);
      if (p && !p.existing && !earlier.has(id))
        reused.push(`entity ${id} already stored`);
      continue;
    }
    const raw: Json | undefined = packEntities.get(id) ?? newEntities.get(id);
    if (!raw || raw.existing) throw new Error('Entity without a row: ' + id);
    const plan: Json = map.entities[id] ?? {};
    if (map.entities[id]) usedMapKeys.add(`entities:${id}`);
    const sources = [
      ...(raw.sourceIds as string[]),
      ...(plan.addSourceIds ?? []),
    ];
    for (const s of sources) usedSources.add(s);
    const subtype = plan.subtype ?? map.subtypes[raw.subtype] ?? raw.subtype;
    if (!subtype) throw new Error('No subtype for ' + id);
    const personName = (raw.name as string).split(' / ')[0].split(' ');
    addOnce('entities', {
      id,
      name: plan.name ?? raw.name,
      ...(raw.shortName ? { shortName: raw.shortName } : {}),
      ...(raw.type === 'person'
        ? {
            // Chinese names: family name first, as the sources print them.
            sortName:
              plan.sortName ??
              `${personName[0]}, ${personName.slice(1).join(' ')}`,
          }
        : {}),
      type: raw.type,
      subtype,
      aliases: plan.aliases ?? raw.aliases ?? [],
      description: prose(plan.description ?? raw.description, id),
      sourceIds: [...new Set(sources.map(sourceId))],
    });
  }

  // ------------------------------------------------------------ sources
  const documentOf = (key: string): string | undefined => {
    const plan = map.sources[key];
    if (plan && 'documentId' in plan) return plan.documentId ?? undefined;
    const x = extraSources.get(key);
    if (x) return x.documentId;
    // The document a source is the first expression of, or an arXiv version
    // of; a source listed by several documents names none.
    const docs = added.entities.filter(
      (e) =>
        e.type === 'document' &&
        (packEntities.get(e.id)?.sourceIds ?? []).includes(key),
    );
    if (docs.length !== 1) return undefined;
    const first = (packEntities.get(docs[0].id)!.sourceIds as string[])[0];
    return first === key || packSources.get(key)?.version?.kind === 'arxiv'
      ? docs[0].id
      : undefined;
  };
  for (const key of usedSources) {
    const id = sourceId(key);
    if (existing('sources', id) || added.sources.some((s) => s.id === id))
      continue;
    const plan: Json = map.sources[key] ?? {};
    if (map.sources[key]) usedMapKeys.add(`sources:${key}`);
    const x = extraSources.get(key);
    const documentId = documentOf(key);
    if (x) {
      addOnce('sources', {
        id,
        ...(documentId ? { documentId } : {}),
        title: x.title,
        authors: x.authors,
        publisher: x.publisher,
        publicationDate: x.publicationDate,
        version: x.version,
        canonicalUrl: x.canonicalUrl,
        evidenceUrl: x.evidenceUrl,
        language: x.language,
        archivedUrl: x.archivedUrl,
        archivedAt: x.archivedAt,
        kind: x.kind,
        accessedAt: x.accessedAt,
        reuse: {
          attribution: `${x.authors.join(', ')}, “${x.title}”${x.publicationDate ? `, ${x.publicationDate}` : ''}.`,
          licence: 'No open redistribution licence asserted',
          note: 'Bibliographic metadata and editorial paraphrases; no quotation is taken from this capture. Recheck terms before wider redistribution.',
        },
      });
      continue;
    }
    const s = packSources.get(key)!;
    const capture = plan.capture
      ? (crossCheck.archive_captures_consulted as Json[]).find(
          (a) => a.source_id === key && a.timestamp === plan.capture,
        )
      : undefined;
    if (plan.capture && !capture)
      throw new Error('Capture not in the check: ' + key);
    const strip = (u: string) =>
      u.replace(/^https?:\/\//, '').replace(/\/$/, '');
    if (capture && !strip(capture.url).endsWith(strip(s.url)))
      throw new Error('Capture of another address: ' + key);
    const original: string | undefined = s.originalTitle ?? undefined;
    const english = original && original !== s.title ? s.title : undefined;
    const etAl = (a: string) => /^et al\b/.test(a);
    const credited = (s.authors ?? []).filter((a: string) => !etAl(a));
    const authors: string[] = credited.length ? credited : [s.publisher];
    const ts: string = capture?.timestamp ?? '';
    const archivedAt = ts
      ? `${ts.slice(0, 4)}-${ts.slice(4, 6)}-${ts.slice(6, 8)}`
      : undefined;
    const version = [
      `${s.publicationDate ? 'Dated' : 'Undated'} ${['paper', 'filing', 'report'].includes(s.kind) ? 'document' : s.kind === 'post' ? 'post' : 'page'}, retrieved on ${s.retrieval.retrievedAt} (SHA-256 ${s.retrieval.sha256}) directly from the publisher.`,
      s.version?.id ? `Version: ${s.version.id}.` : '',
      plan.versionReplace
        ? (s.version.note as string).includes(plan.versionReplace[0])
          ? (s.version.note as string).replace(
              plan.versionReplace[0],
              plan.versionReplace[1],
            )
          : (() => {
              throw new Error('Version text not found: ' + key);
            })()
        : (s.version?.note ?? ''),
      s.version?.kind === 'mutable-page'
        ? 'Its wording can change; earlier wording is not authenticated.'
        : '',
      capture
        ? `The cross-family check (2026-10-31) located the Internet Archive capture of ${archivedAt} linked here; a capture shows only what the archive retrieved that day. ${plan.reason}`
        : '',
      english ? `English title (machine translation): “${english}”.` : '',
      (s.authors ?? []).some(etAl)
        ? 'The author list gives the first credited authors only; see the document for the full list.'
        : '',
      s.sourceClass === 'reporting'
        ? 'A reporting outlet, cited beside the primary text.'
        : '',
    ]
      .filter(Boolean)
      .join(' ');
    const title = original ?? s.title;
    addOnce('sources', {
      id,
      ...(documentId ? { documentId } : {}),
      title,
      authors,
      publisher: s.publisher,
      publicationDate: s.publicationDate,
      version: prose(version, id),
      ...(plan.versionDate ? { versionDate: plan.versionDate } : {}),
      canonicalUrl: s.url,
      evidenceUrl: s.url,
      language: s.language,
      ...(capture ? { archivedUrl: capture.url, archivedAt } : {}),
      documentWords: plan.documentWords ?? {
        count: s.documentWords.count,
        basis: `${s.documentWords.basis.replace(/\.$/, '')}${s.language === 'en' ? '' : ', each CJK character counted as one word'}; counted for the candidate pack on ${s.retrieval.retrievedAt}.`,
      },
      kind: s.kind,
      accessedAt: s.retrieval.retrievedAt,
      reuse: {
        attribution: `${authors.join(', ')}, “${title}”${s.publicationDate ? `, ${s.publicationDate}` : ''}.`,
        licence: 'No open redistribution licence asserted',
        note: 'Bibliographic metadata, editorial paraphrases and short attributed quotations (at most 50 words each). Recheck terms before wider redistribution.',
      },
    });
  }

  // ------------------------------------------------------------ limits
  const norm = (p: string) =>
    p
      .toLowerCase()
      .replace(/[‘’'“”"]/g, "'")
      .replace(/\s+/g, ' ')
      .trim();
  const overLimit: string[] = [];
  for (const [id, passages] of quoted) {
    const row =
      added.sources.find((s) => s.id === id) ?? existing('sources', id);
    const length = (row?.documentWords as Json)?.count;
    const all = new Set([...passages].map(norm));
    for (const e of base.evidence)
      if (e.sourceId === id && e.passageType === 'quote')
        all.add(norm(e.passage as string));
    const list = [...all];
    const total = list
      .filter((p) => !list.some((q) => q !== p && q.includes(p)))
      .reduce((n, p) => n + packWords(p), 0);
    if (!length || total > maxQuotedWords(length))
      overLimit.push(
        `${id}: ${total} quoted words, limit ${length ? maxQuotedWords(length) : '?'}`,
      );
  }
  if (overLimit.length)
    throw new Error('Over the quotation limit:\n' + overLimit.join('\n'));

  // ------------------------------------------------------------ result
  const meta = partMeta(part, base.meta);
  return {
    result: {
      meta,
      ...Object.fromEntries(names.map((n) => [n, [...base[n], ...added[n]]])),
    } as unknown as Data,
    added,
    changed,
    skipped,
    reused,
  };
}

// ---------------------------------------------------------------- run
const head = execFileSync('git', ['rev-parse', '--short', 'HEAD'])
  .toString()
  .trim();
function snapshotOf(part: string, base: Data, built: Built) {
  const hashes = {
    meta: sha(base.meta),
    ...Object.fromEntries(
      names.map((n) => [
        n,
        sha(base[n].map((r) => built.changed[n].get(r.id) ?? r)),
      ]),
    ),
  };
  const old = snapshots[part];
  // The base commit is kept while the base is the same; a new base takes HEAD.
  const baseCommit =
    old && JSON.stringify(old.sha256) === JSON.stringify(hashes)
      ? old.baseCommit
      : head;
  return {
    description: map.parts[part].snapshotDescription,
    baseCommit,
    meta: base.meta,
    added: Object.fromEntries(
      names.map((n) => [n, built.added[n].map((r) => r.id)]),
    ),
    before: Object.fromEntries(
      names.map((n) => [n, [...built.changed[n].values()]]),
    ),
    ...(built.skipped.length ? { skippedAsDuplicates: built.skipped } : {}),
    sha256: hashes,
  };
}

const one = build('1', structuredClone(base0));
const outputs: Record<string, unknown> = {
  [files.snapshot('1')]: snapshotOf('1', base0, one),
};
let final = one.result;
const report = [one];
if (onlyPart !== '1') {
  const base1 = structuredClone(one.result);
  const two = build(
    '2',
    structuredClone(base1),
    new Set(one.added.entities.map((e) => e.id)),
  );
  outputs[files.snapshot('2')] = snapshotOf('2', base1, two);
  final = two.result;
  report.push(two);
  // Every map entry is used once both parts are built, except for records
  // skipped as duplicates of stored records.
  const skippedIds = new Set(
    report.flatMap((b) => b.skipped.map((s) => s.split(' ')[0])),
  );
  const unused: string[] = [];
  for (const key of [
    'claims',
    'evidence',
    'entities',
    'sources',
    'aliases',
    'storedClaimEdits',
  ])
    for (const id of Object.keys(map[key] ?? {}))
      if (!usedMapKeys.has(`${key}:${id}`) && !holds[id] && !skippedIds.has(id))
        unused.push(`${key}:${id}`);
  for (const n of map.newEvidence as Json[])
    if (!usedMapKeys.has(`newEvidence:${n.id}`) && !skippedIds.has(n.claimId))
      unused.push(`newEvidence:${n.id}`);
  if (unused.length)
    throw new Error('Unused map entries: ' + unused.join(', '));
}
Object.assign(outputs, {
  'data/meta.json': final.meta,
  ...Object.fromEntries(names.map((n) => [`data/${n}.json`, final[n]])),
});

for (const [i, b] of report.entries()) {
  for (const s of b.skipped) console.warn(`part ${i + 1}: skipped ${s}`);
  for (const s of b.reused) console.warn(`part ${i + 1}: reused ${s}`);
}
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
  } else console.log('Stored records match the pack and the map.');
} else {
  for (const [path, value] of Object.entries(outputs))
    writeFileSync(path, JSON.stringify(value, null, 2) + '\n');
  execFileSync(
    process.platform === 'win32' ? 'pnpm.cmd' : 'pnpm',
    ['prettier', '--write', ...Object.keys(outputs)],
    { stdio: 'ignore', shell: process.platform === 'win32' },
  );
  for (const [i, b] of report.entries())
    console.log(
      `Part ${i + 1}: added ${names.map((n) => `${b.added[n].length} ${n}`).join(', ')}; changed ${names.map((n) => `${b.changed[n].size} ${n}`).join(', ')}.`,
    );
}
