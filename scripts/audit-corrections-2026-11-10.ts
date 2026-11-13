// Applies the corrections of the blind audit of 2026-11-09 under the
// maintainer's answers of 2026-11-10 (review/audit-corrections-and-model-cards-5-2026-11-10.md).
// It reads the adjudication's correction map
// (review/audit-2026-11-09-correction-map.json) and the answers map
// (review/audit-corrections-2026-11-10-map.json), which says which entries
// apply and adds the entries the answers call for. Each entry names the
// record, the field and what changes:
//
//   set             replace a field; `old` must equal the stored value
//                   (`oldAbsent`: the field is new); with `unset`, delete it
//   append          add a sentence to a text field that does not yet hold it
//   add             add a new row
//   remove          delete a row (kept in the snapshot with the earlier order)
//
// An entry whose old value no longer matches, or that changes nothing, stops
// the script, so no promised correction is silently skipped (operating guide,
// “silent no-ops in admission scripts”). An entry marked
// `oldAfterEarlierEntry` follows an earlier entry on the same field and is
// matched against that entry's new value.
//
//   pnpm tsx scripts/audit-corrections-2026-11-10.ts           write the records and the before-snapshot
//   pnpm tsx scripts/audit-corrections-2026-11-10.ts --check   compare with the stored records
//   pnpm tsx scripts/audit-corrections-2026-11-10.ts --base <commit>
//                                         rebuild on a new base: the snapshot names that base commit
//
// Adapted from scripts/corrections-2026-11-06.ts. Where the stored data holds
// every row the before-snapshot lists as added, the script first removes those
// rows and restores the rows it changed or removed; otherwise it builds on the
// stored data.
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
  ref?: string;
  status?: string;
  op: 'set' | 'append' | 'add' | 'remove';
  table: Name;
  id: string;
  path?: string;
  old?: unknown;
  oldAbsent?: boolean;
  oldAfterEarlierEntry?: boolean;
  unset?: boolean;
  new?: unknown;
  text?: string;
  row?: Row;
};

const answersPath = 'review/audit-corrections-2026-11-10-map.json';
const read = (path: string) => JSON.parse(readFileSync(path, 'utf8'));
const args = process.argv.slice(2);
const check = args.includes('--check');
const sha = (value: unknown) =>
  createHash('sha256').update(JSON.stringify(value)).digest('hex');

const answers: Json = read(answersPath);
const date: string = answers.date;
const correctionMap: Json = read(answers.correctionMap);
const snapshotPath = `review/audit-corrections-2026-11-10-before-${date}.json`;

// Which map entries apply: every agreed entry; a held entry only where the
// answers name its reference as applied. Any reference the answers do not
// settle stops the script.
const applies = (e: Entry) => {
  if (e.status === 'agreed') return true;
  const decided = answers.apply[e.ref!];
  if (typeof decided !== 'boolean')
    throw new Error(`${e.key}: held entry ${e.ref} has no answer`);
  return decided;
};
const mapEntries = (correctionMap.entries as Entry[]).filter(applies);
const skipped = (correctionMap.entries as Entry[]).filter((e) => !applies(e));
const entries: Entry[] = [...mapEntries, ...(answers.entries as Entry[])];
for (const e of answers.entries as Entry[])
  if (
    e.key.startsWith('H2b-') &&
    !skipped.some((s) => s.key === (e as Json).replaces && s.ref === 'P1-held')
  )
    throw new Error(`${e.key}: replaces no skipped P1-held entry`);

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
      if (!snapshot) return [n, stored[n].map((r) => structuredClone(r))];
      const added = new Set<string>(snapshot.added[n] ?? []);
      const before = new Map<string, Row>(
        (snapshot.before[n] ?? []).map((r: Row) => [r.id, r]),
      );
      const rows = stored[n]
        .filter((r) => !added.has(r.id))
        .map((r) => structuredClone(before.get(r.id) ?? r))
        .concat(
          ((snapshot.removed?.[n] ?? []) as Row[]).map((r) =>
            structuredClone(r),
          ),
        );
      const order = snapshot.order?.[n] as string[] | null;
      if (order) {
        const position = new Map(order.map((id, i) => [id, i]));
        rows.sort((a, b) => position.get(a.id)! - position.get(b.id)!);
      }
      return [n, rows];
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
const removed: Record<Name, Row[]> = {
  entities: [],
  claims: [],
  sources: [],
  evidence: [],
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
// The value each field was last set to by an entry, for oldAfterEarlierEntry.
const lastSet = new Map<string, unknown>();
function edit(e: Entry, apply: (row: Json) => void) {
  const row = (index[e.table].get(e.id) ??
    added[e.table].find((r) => r.id === e.id)) as Json | undefined;
  if (!row) throw new Error(`${e.key}: no ${e.table} row ${e.id}`);
  const before = JSON.stringify(row);
  if (index[e.table].has(e.id) && !changed[e.table].has(e.id))
    changed[e.table].set(e.id, structuredClone(row) as Row);
  apply(row);
  if (JSON.stringify(row) === before)
    throw new Error(`${e.key}: the entry changed nothing`);
}
function oldMatches(e: Entry, row: Json) {
  const field = `${e.table}/${e.id} ${e.path}`;
  const current = at(row, e.path!);
  if (Boolean(e.oldAfterEarlierEntry) !== lastSet.has(field))
    throw new Error(
      `${e.key}: ${field} ${e.oldAfterEarlierEntry ? 'follows no earlier entry' : 'was already set by an earlier entry'}`,
    );
  const expected = e.oldAbsent ? undefined : e.old;
  if (!isDeepStrictEqual(current, expected))
    throw new Error(`${e.key}: ${field} is not the entry's old value`);
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
      if (row.id !== e.id) throw new Error(`${e.key}: row id differs`);
      if (
        index[e.table].has(row.id) ||
        added[e.table].some((r) => r.id === row.id)
      )
        throw new Error(`${e.key}: duplicate ${e.table} id ${row.id}`);
      added[e.table].push(row);
      break;
    }
    case 'remove': {
      const row = index[e.table].get(e.id);
      if (!row || changed[e.table].has(e.id))
        throw new Error(`${e.key}: no unchanged ${e.table} row ${e.id}`);
      removed[e.table].push(structuredClone(row));
      index[e.table].delete(e.id);
      break;
    }
    case 'set':
      edit(e, (row) => {
        oldMatches(e, row);
        if (e.unset) delete parentOf(row, e.path!)[last(e.path!)];
        else parentOf(row, e.path!)[last(e.path!)] = structuredClone(e.new);
        lastSet.set(`${e.table}/${e.id} ${e.path}`, e.new);
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
    default:
      throw new Error(`${e.key}: unknown operation`);
  }
}
// Every evidence row belongs to a claim that lists it, and no claim lists a
// removed row.
const claimRow = (id: string) =>
  (index.claims.get(id) ?? added.claims.find((c) => c.id === id)) as
    Json | undefined;
for (const ev of added.evidence)
  if (!claimRow(ev.claimId as string)?.evidenceIds.includes(ev.id))
    throw new Error(`Added evidence not listed by its claim: ${ev.id}`);
for (const ev of removed.evidence)
  if (claimRow(ev.claimId as string)?.evidenceIds.includes(ev.id))
    throw new Error(`Removed evidence still listed by its claim: ${ev.id}`);

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
  names.map((n) => [
    n,
    [...base[n].filter((r) => index[n].has(r.id)), ...added[n]],
  ]),
) as Record<Name, Row[]>;
const meta = {
  ...base.meta,
  updatedAt: date > base.meta.updatedAt ? date : base.meta.updatedAt,
  ...(answers.schemaVersion ? { schemaVersion: answers.schemaVersion } : {}),
};
const newSnapshot = {
  description:
    'Rows added, changed and removed by the corrections of the blind audit of 2026-11-09, applied under the maintainer’s answers of 2026-11-10 (scripts/audit-corrections-2026-11-10.ts, review/audit-2026-11-09-correction-map.json, review/audit-corrections-2026-11-10-map.json, review/audit-corrections-and-model-cards-5-2026-11-10.md). Removing the added rows, restoring the changed and removed rows and the earlier order reproduces the dataset as it was at baseCommit.',
  baseCommit:
    storedSnapshot && !baseArg ? storedSnapshot.baseCommit : baseCommit,
  meta: base.meta,
  added: Object.fromEntries(names.map((n) => [n, added[n].map((r) => r.id)])),
  before: Object.fromEntries(names.map((n) => [n, [...changed[n].values()]])),
  removed: Object.fromEntries(names.map((n) => [n, removed[n]])),
  // The earlier order, only where a row was removed.
  order: Object.fromEntries(
    names.map((n) => [n, removed[n].length ? base[n].map((r) => r.id) : null]),
  ),
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
  } else console.log('Stored records match the maps.');
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
    `${entries.length} entries applied (${mapEntries.length} of the correction map, ${(answers.entries as Entry[]).length} of the answers; ${skipped.length} map entries not applied: ${[...new Set(skipped.map((e) => e.ref))].join(', ')}): added ${count(added)}; changed ${count(changed)}; removed ${count(removed)}.`,
  );
}
