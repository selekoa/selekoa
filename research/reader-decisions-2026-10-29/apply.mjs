// Applies the data part of the maintainer's decisions of 2026-10-29 on the
// reader tasks (review/reader-tasks-2026-10-29.md, "Decisions for the
// maintainer"; record: review/reader-decisions-2026-10-29.md):
//
//   node research/reader-decisions-2026-10-29/apply.mjs
//
// Decision 1, the EU AI Act's dates of application, is the only decision that
// changes data. Every change is made here, from the dataset as stored at the
// base commit, so the script can be re-run and gives the same result. It
// writes data/*.json and the before-snapshot
// review/reader-decisions-before-2026-10-29.json.
import { execSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { writeFileSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = join(import.meta.dirname, '..', '..');
const BASE = '024a6e5';
const RECORDED = '2026-10-29';
const SNAPSHOT = 'review/reader-decisions-before-2026-10-29.json';
const names = ['entities', 'claims', 'sources', 'evidence'];
const atBase = (file) =>
  JSON.parse(
    execSync(`git show ${BASE}:${file}`, {
      cwd: ROOT,
      maxBuffer: 1 << 28,
    }).toString(),
  );
const writeJson = (p, v) =>
  writeFileSync(join(ROOT, p), JSON.stringify(v, null, 2) + '\n');
const data = {
  meta: atBase('data/meta.json'),
  ...Object.fromEntries(names.map((n) => [n, atBase(`data/${n}.json`)])),
};
const sha = (v) => createHash('sha256').update(JSON.stringify(v)).digest('hex');
const priorMeta = structuredClone(data.meta);
const priorSha = Object.fromEntries(
  [...names, 'meta'].map((n) => [n, sha(data[n])]),
);

const before = { entities: [], claims: [], sources: [], evidence: [] };
const added = { entities: [], claims: [], sources: [], evidence: [] };

const find = (name, id) => {
  const row = data[name].find((r) => r.id === id);
  if (!row) throw new Error(`No ${name} row ${id}`);
  return row;
};
/** Changes a stored row in place, keeping its earlier state for the snapshot. */
function change(name, id, fn) {
  const row = find(name, id);
  if (!before[name].some((r) => r.id === id))
    before[name].push(structuredClone(row));
  fn(row);
  return row;
}
function add(name, row, afterId) {
  if (data[name].some((r) => r.id === row.id))
    throw new Error(`${name} ${row.id} exists`);
  const i = data[name].findIndex((r) => r.id === afterId);
  if (i < 0) throw new Error(`No ${name} row ${afterId}`);
  data[name].splice(i + 1, 0, row);
  added[name].push(row.id);
  return row;
}
const replaceIn = (text, from, to) => {
  if (!text.includes(from)) throw new Error(`“${from}” not in “${text}”`);
  return text.split(from).join(to);
};

// ---------------------------------------------------------------------------
// Decision 1. The general date of application is filed as a date: a
// statement of the Regulation dated by the day Article 113 states, so the
// frameworks-and-law timeline shows it, and no longer a threshold.
change('claims', 'aia-art113-general-date', (c) => {
  c.attributes.provision.kind = 'statement';
  c.time = {
    kind: 'event',
    date: '2026-08-02',
    basis: 'effective',
    note: 'The general date of application that Article 113, second paragraph, states. The provision was published in the Official Journal on 2024-07-12 (the Regulation is dated 13 June 2024). Entry into force and the dates of application by chapter are recorded separately.',
  };
  c.qualification = replaceIn(
    c.qualification,
    'see the record on Chapter V. The Regulation was published on 12 July 2024; the entry-into-force date computed from it is not stated in the text and is not recorded.',
    'see the records on Chapter V. The entry-into-force date is not stated in the text; it is computed from the publication date and recorded separately.',
  );
});

// The Art. 113(b) exception, glossed so that a reader need not know which
// chapter is on general-purpose AI models.
change('claims', 'aia-art113-chapter-v-date', (c) => {
  c.object.value = replaceIn(
    c.object.value,
    'Chapters III (Section 4), V, VII',
    'Chapters III (Section 4), V (general-purpose AI models), VII',
  );
});

// A dated record of Art. 113(b) for Chapter V. It quotes the same passage as
// the exception record (25 words; the source's quotation limit is 800 words,
// of which 722 were quoted before this change) and the chapter's heading.
const verified =
  'matched mechanically on 2026-10-29 against a fresh direct retrieval of the Official Journal text from the Publications Office’s Cellar repository, whose SHA-256 equals that of the frameworks-to-law admission’s retrieval of 2026-10-28 (EUR-Lex returned an empty response). Matching ignored differences of whitespace and case, so the source’s typography can differ. No cross-family machine check of this record; it quotes the passage of the exception record, which a fresh-context machine audit checked on 2026-10-10. No human editorial review.';
add(
  'claims',
  {
    id: 'aia-art113-chapter-v-applies',
    subject: 'eu-ai-act-2024',
    predicate: 'states_provision',
    object: {
      kind: 'literal',
      value: 'Chapter V (general-purpose AI models) applies from 2 August 2025',
    },
    topic: 'governance',
    statement:
      'Article 113, third paragraph, point (b), provides that Chapter V, the chapter on general-purpose AI models, applies from 2 August 2025.',
    time: {
      kind: 'event',
      date: '2025-08-02',
      basis: 'effective',
      note: 'The date of application that Article 113, third paragraph, point (b), states for Chapter V. The provision was published in the Official Journal on 2024-07-12; the record of the same point as an exception to the general date is dated by that publication.',
    },
    derivation: 'explicit',
    resolution: 'supported',
    editorialState: 'seed',
    qualification:
      'Chapter V contains Articles 51 to 56 on general-purpose AI models. The same point applies Chapter III Section 4, Chapters VII and XII and Article 78 from the same date, and excepts Article 101 (fines for providers of general-purpose AI models); see the record of the exception. Date of application is not evidence of compliance or enforcement. Regulation (EU) 2026/1744 replaced points (a) and (c) of the third paragraph and added point (d); in the inspected text, point (b) is not amended.',
    evidenceIds: [
      'evidence-aia-art113-chapter-v-applies-1',
      'evidence-aia-art113-chapter-v-applies-2',
    ],
    recordedAt: RECORDED,
    attributes: {
      provision: { kind: 'statement', key: 'aia-chapter-v-applies' },
    },
  },
  'aia-art113-chapter-v-date',
);
add(
  'evidence',
  {
    id: 'evidence-aia-art113-chapter-v-applies-1',
    claimId: 'aia-art113-chapter-v-applies',
    sourceId: 'source-eu-ai-act-2024',
    sourceRole: 'primary',
    support: 'supports',
    locator: 'Article 113, third paragraph, point (b)',
    passage:
      'Chapter III Section 4, Chapter V, Chapter VII and Chapter XII and Article 78 shall apply from 2 August 2025, with the exception of Article 101',
    passageType: 'quote',
    verification: 'machine_checked',
    checkedAt: RECORDED,
    note: `Verbatim quote (25 words), ${verified}`,
    retrievalRoute: 'direct',
  },
  'evidence-aia-art113-chapter-v-date-1',
);
add(
  'evidence',
  {
    id: 'evidence-aia-art113-chapter-v-applies-2',
    claimId: 'aia-art113-chapter-v-applies',
    sourceId: 'source-eu-ai-act-2024',
    sourceRole: 'primary',
    support: 'context',
    locator: 'Chapter V, heading',
    passage: 'GENERAL-PURPOSE AI MODELS',
    passageType: 'quote',
    verification: 'machine_checked',
    checkedAt: RECORDED,
    note: `The heading of Chapter V, quoted for the gloss in the record's label. Verbatim quote, ${verified}`,
    retrievalRoute: 'direct',
  },
  'evidence-aia-art113-chapter-v-applies-1',
);

// ---------------------------------------------------------------------------
// Metadata and snapshot.
writeJson(SNAPSHOT, {
  description: `Records as stored at ${BASE} (schema 2.20, release v0.12.0) before the maintainer’s decisions of ${RECORDED} on the reader tasks (review/reader-decisions-2026-10-29.md): the earlier metadata, the IDs the change added and the rows it changed, as they were. The test-only historical view restores them.`,
  baseCommit: BASE,
  meta: priorMeta,
  added,
  before,
  sha256: priorSha,
});
data.meta.updatedAt = RECORDED;
data.meta.scope += ` On ${RECORDED}, by the maintainer’s decisions of that day on a reader test, the EU AI Act’s dates of application are recorded as dates: the general date of 2 August 2026 and the date of 2 August 2025 from which Chapter V, on general-purpose AI models, applies, each dated by the day Article 113 states. All records remain seeds.`;
for (const n of ['meta', ...names]) writeJson(`data/${n}.json`, data[n]);
// The stored files are formatted by the repository's Prettier settings.
execSync(
  `pnpm -s prettier --write ${['meta', ...names].map((n) => `data/${n}.json`).join(' ')} ${SNAPSHOT}`,
  { cwd: ROOT },
);
console.log(
  `Added ${names.map((n) => `${added[n].length} ${n}`).join(', ')}; changed ${names.map((n) => `${before[n].length} ${n}`).join(', ')}.`,
);
