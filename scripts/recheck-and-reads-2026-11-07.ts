// Settles the 19 "Under re-check" headlines by the maintainer's answers of
// 2026-11-07 and applies the Codex reads of that day
// (review/recheck-and-reads-2026-11-07.md), from the map
// review/recheck-and-reads-2026-11-07-map.json. Each map entry names its input, the
// record, the field and what changes:
//
//   set             replace a field; `old` must equal the stored value
//                   (absent means the field is new)
//   remove          delete a field; `old` must equal the stored value
//   append          add a sentence to a text field that does not yet hold it
//   add             add a new row
//   attachEvidence  add an evidence ID to a claim’s list, first or last
//
// An entry whose old value no longer matches, or that changes nothing, stops
// the script, so no promised correction is silently skipped (operating guide,
// “silent no-ops in admission scripts”).
//
//   pnpm tsx scripts/recheck-and-reads-2026-11-07.ts           write the records and the before-snapshot
//   pnpm tsx scripts/recheck-and-reads-2026-11-07.ts --check   compare with the stored records
//   pnpm tsx scripts/recheck-and-reads-2026-11-07.ts --base <commit>
//                                         rebuild on a new base: the snapshot names that base commit
//
// Adapted from scripts/prelaunch-fixes.ts. Where the stored data holds every
// row the before-snapshot lists as added, the script first removes those rows
// and restores the rows it changed; otherwise it builds on the stored data.
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { isDeepStrictEqual } from 'node:util';

const names = ['entities', 'claims', 'sources', 'evidence'] as const;
type Name = (typeof names)[number];
type Row = Record<string, unknown> & { id: string };
type Json = Record<string, any>; // eslint-disable-line @typescript-eslint/no-explicit-any
type Entry = {
  key: string;
  input: string;
  op: 'set' | 'remove' | 'append' | 'add' | 'attachEvidence';
  table: Name;
  id?: string;
  path?: string;
  old?: unknown;
  new?: unknown;
  text?: string;
  row?: Row;
  evidenceId?: string;
  position?: 'first' | 'last';
};

const mapPath = 'review/recheck-and-reads-2026-11-07-map.json';
const read = (path: string) => JSON.parse(readFileSync(path, 'utf8'));
const args = process.argv.slice(2);
const check = args.includes('--check');
const sha = (value: unknown) =>
  createHash('sha256').update(JSON.stringify(value)).digest('hex');

const map: Json = read(mapPath);
const date: string = map.date;
const entries: Entry[] = map.entries;
const snapshotPath = `review/recheck-and-reads-2026-11-07-before-${date}.json`;
for (const e of entries)
  if (!map.inputs[e.input])
    throw new Error(`${e.key}: unknown input ${e.input}`);

// ---------------------------------------------------------------- base
const stored = {
  meta: read('data/meta.json'),
  ...Object.fromEntries(names.map((n) => [n, read(`data/${n}.json`)])),
} as { meta: Json } & Record<Name, Row[]>;
const storedSnapshot: Json | null = existsSync(snapshotPath)
  ? read(snapshotPath)
  : null;
const snapshotApplies = (s: Json) =>
  names.every((n) => {
    const ids = new Set(stored[n].map((r) => r.id));
    return ((s.added?.[n] ?? []) as string[]).every((id) => ids.has(id));
  });
const snapshot =
  storedSnapshot && snapshotApplies(storedSnapshot) ? storedSnapshot : null;
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
if (snapshot && names.some((n) => sha(base[n]) !== snapshot.sha256[n]))
  throw new Error(
    `${snapshotPath} does not describe the stored data. To rebuild on a new base, restore the base data and delete the snapshot first.`,
  );
const baseArg = args.includes('--base')
  ? args[args.indexOf('--base') + 1]
  : undefined;
const baseCommit = execFileSync('git', ['rev-parse', baseArg ?? 'HEAD'], {
  encoding: 'utf8',
}).trim();

// ---------------------------------------------------------------- entries
const index = Object.fromEntries(
  names.map((n) => [n, new Map(base[n].map((r) => [r.id, r]))]),
) as Record<Name, Map<string, Row>>;
const changed: Record<Name, Map<string, Row>> = {
  entities: new Map(),
  claims: new Map(),
  sources: new Map(),
  evidence: new Map(),
};
const added: Record<Name, Row[]> = {
  entities: [],
  claims: [],
  sources: [],
  evidence: [],
};
const segments = (path: string) => path.split('.');
const at = (row: Json, path: string) =>
  segments(path).reduce<Json | undefined>(
    (v, k) => (v === undefined ? undefined : v[k]),
    row,
  );
function edit(e: Entry, apply: (row: Json) => void) {
  const row = (index[e.table].get(e.id!) ??
    added[e.table].find((r) => r.id === e.id)) as Json | undefined;
  if (!row) throw new Error(`${e.key}: no ${e.table} row ${e.id}`);
  const before = JSON.stringify(row);
  if (index[e.table].has(e.id!) && !changed[e.table].has(e.id!))
    changed[e.table].set(e.id!, structuredClone(row) as Row);
  apply(row);
  if (JSON.stringify(row) === before)
    throw new Error(`${e.key}: the entry changed nothing`);
}
function oldMatches(e: Entry, row: Json) {
  const current = at(row, e.path!);
  const expected = e.old === null && current === undefined ? undefined : e.old;
  if (!isDeepStrictEqual(current, expected))
    throw new Error(
      `${e.key}: ${e.table}/${e.id} ${e.path} is not the entry's old value`,
    );
}
const parentOf = (row: Json, path: string) =>
  segments(path)
    .slice(0, -1)
    .reduce<Json>((v, k) => (v[k] ??= {}), row);
const last = (path: string) => segments(path).at(-1)!;

for (const e of entries) {
  switch (e.op) {
    case 'add': {
      const row = structuredClone(e.row!);
      if (
        index[e.table].has(row.id) ||
        added[e.table].some((r) => r.id === row.id)
      )
        throw new Error(`${e.key}: duplicate ${e.table} id ${row.id}`);
      added[e.table].push(row);
      break;
    }
    case 'set':
      edit(e, (row) => {
        oldMatches(e, row);
        parentOf(row, e.path!)[last(e.path!)] = structuredClone(e.new);
      });
      break;
    case 'remove':
      edit(e, (row) => {
        oldMatches(e, row);
        delete parentOf(row, e.path!)[last(e.path!)];
      });
      break;
    case 'append':
      edit(e, (row) => {
        const current: unknown = at(row, e.path!);
        if (typeof current !== 'string')
          throw new Error(`${e.key}: ${e.path} is not text`);
        if (current.includes(e.text!))
          throw new Error(`${e.key}: the text is already there`);
        parentOf(row, e.path!)[last(e.path!)] =
          `${current.trimEnd()} ${e.text}`;
      });
      break;
    case 'attachEvidence':
      edit(e, (row) => {
        const ids = row.evidenceIds as string[];
        if (ids.includes(e.evidenceId!))
          throw new Error(`${e.key}: already attached`);
        const ev = added.evidence.find((r) => r.id === e.evidenceId);
        if (!ev || ev.claimId !== e.id)
          throw new Error(`${e.key}: no added evidence of this claim`);
        if (e.position === 'first') ids.unshift(e.evidenceId!);
        else ids.push(e.evidenceId!);
      });
      break;
    default:
      throw new Error(`${e.key}: unknown operation`);
  }
}
// Every added evidence row belongs to a claim that lists it.
for (const ev of added.evidence) {
  const claim = (index.claims.get(ev.claimId as string) ??
    added.claims.find((c) => c.id === ev.claimId)) as Json | undefined;
  if (!claim?.evidenceIds.includes(ev.id))
    throw new Error(`Added evidence not listed by its claim: ${ev.id}`);
}

// A rerun must not undo a later edit to a corrected row.
if (snapshot && !check)
  for (const n of names)
    for (const id of changed[n].keys()) {
      const corrected = index[n].get(id);
      const now = stored[n].find((r) => r.id === id);
      if (JSON.stringify(corrected) !== JSON.stringify(now))
        throw new Error(
          `${n}/${id} differs from the corrected row; a later edit would be lost. Compare with --check.`,
        );
    }

// ---------------------------------------------------------------- output
const result = Object.fromEntries(
  names.map((n) => [n, [...base[n], ...added[n]]]),
) as Record<Name, Row[]>;
const meta = {
  ...base.meta,
  updatedAt: date > base.meta.updatedAt ? date : base.meta.updatedAt,
};
const newSnapshot = {
  description:
    'Rows added and changed by the re-check settlement and reads of 2026-11-07 (scripts/recheck-and-reads-2026-11-07.ts, review/recheck-and-reads-2026-11-07-map.json, review/recheck-and-reads-2026-11-07.md). Removing the added rows and restoring the changed rows reproduces the dataset as it was at baseCommit.',
  baseCommit:
    storedSnapshot && !baseArg ? storedSnapshot.baseCommit : baseCommit,
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
  'data/meta.json': meta,
  ...Object.fromEntries(names.map((n) => [`data/${n}.json`, result[n]])),
  [snapshotPath]: newSnapshot,
};
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
  } else console.log('Stored records match the map.');
} else {
  for (const [path, value] of Object.entries(outputs))
    writeFileSync(path, JSON.stringify(value, null, 2) + '\n');
  execFileSync('pnpm', ['prettier', '--write', ...Object.keys(outputs)], {
    stdio: 'ignore',
  });
  const count = (r: Record<Name, unknown[] | Map<string, Row>>) =>
    names
      .map(
        (n) =>
          `${Array.isArray(r[n]) ? (r[n] as unknown[]).length : (r[n] as Map<string, Row>).size} ${n}`,
      )
      .join(', ');
  console.log(
    `${entries.length} map entries: added ${count(added)}; changed ${count(changed)}.`,
  );
}
