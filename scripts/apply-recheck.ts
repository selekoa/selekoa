// Applies a decision on the cross-family earliest-located re-check of
// 2026-11-02 (review/earliest-located-recheck-2026-11-02.md), as listed in a
// spec file: field-level patches, and rows added after a named row. A patch names the value it replaces (or
// that the field is absent); a patch whose old value no longer matches stops
// the script, so nothing is changed silently. The spec names its
// before-snapshot, which goes first in the chain in
// src/editorial/historical-views.ts.
//
//   pnpm tsx scripts/apply-recheck.ts --spec <path>           write the records and the before-snapshot
//   pnpm tsx scripts/apply-recheck.ts --spec <path> --check   compare with the stored records
//   pnpm tsx scripts/apply-recheck.ts --spec <path> --base <commit>
//                                  rebuild on a new base: the snapshot names that base commit
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { isDeepStrictEqual } from 'node:util';

const names = ['entities', 'claims', 'sources', 'evidence'] as const;
type Name = (typeof names)[number];
type Row = Record<string, unknown> & { id: string };
type Json = Record<string, any>; // eslint-disable-line @typescript-eslint/no-explicit-any
type Patch = {
  table: Name;
  id: string;
  path: string;
  /** The value replaced; absent when the field is absent before. */
  old?: unknown;
  /** The new value; absent with `remove` to delete the field. */
  new?: unknown;
  remove?: true;
};
type Correction = {
  id: string;
  patches: Patch[];
  added?: Partial<Record<Name, { row: Row; after: string }[]>>;
};

const read = (path: string) => JSON.parse(readFileSync(path, 'utf8'));
const args = process.argv.slice(2);
const check = args.includes('--check');
const option = (name: string) =>
  args.includes(name) ? args[args.indexOf(name) + 1] : undefined;
const specPath = option('--spec');
if (!specPath)
  throw new Error(
    'Usage: pnpm tsx scripts/apply-recheck.ts --spec <path> [--check] [--base <commit>]',
  );
const sha = (value: unknown) =>
  createHash('sha256').update(JSON.stringify(value)).digest('hex');

const spec: Json = read(specPath);
const date: string = spec.date;
const snapshotPath: string = spec.snapshotPath;
const corrections: Correction[] = spec.corrections;

// ---------------------------------------------------------------- base
const stored = {
  meta: read('data/meta.json'),
  ...Object.fromEntries(names.map((n) => [n, read(`data/${n}.json`)])),
} as { meta: Json } & Record<Name, Row[]>;
const storedSnapshot: Json | null = existsSync(snapshotPath)
  ? read(snapshotPath)
  : null;
function revert(rows: Row[], n: Name): Row[] {
  if (!storedSnapshot) return rows.map((r) => structuredClone(r));
  const before = new Map<string, Row>(
    storedSnapshot.before[n].map((r: Row) => [r.id, r]),
  );
  const added = new Set<string>(storedSnapshot.added[n]);
  return rows
    .filter((r) => !added.has(r.id))
    .map((r) => structuredClone(before.get(r.id) ?? r));
}
const base = {
  meta: storedSnapshot ? storedSnapshot.meta : stored.meta,
  ...Object.fromEntries(names.map((n) => [n, revert(stored[n], n)])),
} as { meta: Json } & Record<Name, Row[]>;
const baseSha = Object.fromEntries(names.map((n) => [n, sha(base[n])]));
if (
  storedSnapshot &&
  names.some((n) => baseSha[n] !== storedSnapshot.sha256[n])
)
  throw new Error(
    `${snapshotPath} does not describe the stored data. To rebuild on a new base, restore the base data and delete the snapshot first.`,
  );
const baseArg = option('--base');
const baseCommit = execFileSync('git', ['rev-parse', baseArg ?? 'HEAD'], {
  encoding: 'utf8',
}).trim();

// ---------------------------------------------------------------- changes
const rows = Object.fromEntries(
  names.map((n) => [n, base[n].map((r) => structuredClone(r))]),
) as Record<Name, Row[]>;
const original = Object.fromEntries(
  names.map((n) => [n, new Map(base[n].map((r) => [r.id, r]))]),
) as Record<Name, Map<string, Row>>;
const changed = Object.fromEntries(
  names.map((n) => [n, new Set<string>()]),
) as Record<Name, Set<string>>;
const find = (n: Name, id: string) => {
  const row = rows[n].find((r) => r.id === id) as Json | undefined;
  if (!row) throw new Error(`No ${n} row: ${id}`);
  return row;
};
const at = (row: Json, path: string) =>
  path
    .split('.')
    .reduce<Json | undefined>(
      (v, k) => (v === undefined ? undefined : v[k]),
      row,
    );

const added = Object.fromEntries(
  names.map((n) => [n, [] as string[]]),
) as Record<Name, string[]>;
for (const c of corrections) {
  for (const n of names)
    for (const { row, after } of c.added?.[n] ?? []) {
      if (rows[n].some((r) => r.id === row.id))
        throw new Error(`${c.id}: ${n}/${row.id} exists already`);
      const i = rows[n].findIndex((r) => r.id === after);
      if (i < 0) throw new Error(`${c.id}: no ${n} row ${after} to follow`);
      rows[n].splice(i + 1, 0, structuredClone(row));
      added[n].push(row.id);
    }
  for (const p of c.patches) {
    const row = find(p.table, p.id);
    const expected = 'old' in p ? p.old : undefined;
    if (!isDeepStrictEqual(at(row, p.path), expected))
      throw new Error(
        `${c.id}: ${p.table}/${p.id} ${p.path}: the stored value is not the patch's old value`,
      );
    const keys = p.path.split('.');
    const parent = keys.slice(0, -1).reduce<Json>((v, k) => (v[k] ??= {}), row);
    if (p.remove) delete parent[keys.at(-1)!];
    else parent[keys.at(-1)!] = structuredClone(p.new);
    changed[p.table].add(p.id);
  }
}
for (const n of names) for (const id of added[n]) changed[n].delete(id);
for (const n of names)
  for (const id of changed[n])
    if (isDeepStrictEqual(original[n].get(id), find(n, id)))
      throw new Error(`${n}/${id} is listed as changed but is unchanged`);

// A rerun must not undo a later edit: with a snapshot, the stored rows must
// be exactly the corrected ones.
if (storedSnapshot && !check)
  for (const n of names)
    if (sha(rows[n]) !== sha(stored[n]))
      throw new Error(
        `data/${n}.json differs from the corrected rows; a later edit would be lost. Compare with --check.`,
      );

// ---------------------------------------------------------------- output
const meta = {
  ...base.meta,
  schemaVersion: spec.schemaVersion,
  updatedAt: date > base.meta.updatedAt ? date : base.meta.updatedAt,
};
const empty = () => Object.fromEntries(names.map((n) => [n, []]));
const newSnapshot = {
  description: spec.snapshotDescription,
  baseCommit:
    storedSnapshot && !baseArg ? storedSnapshot.baseCommit : baseCommit,
  meta: base.meta,
  added,
  before: Object.fromEntries(
    names.map((n) => [n, base[n].filter((r) => changed[n].has(r.id))]),
  ),
  removed: empty(),
  order: Object.fromEntries(names.map((n) => [n, null])),
  sha256: { meta: sha(base.meta), ...baseSha },
};
const outputs: Record<string, unknown> = {
  'data/meta.json': meta,
  ...Object.fromEntries(names.map((n) => [`data/${n}.json`, rows[n]])),
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
  } else console.log('Stored records match the decisions.');
} else {
  for (const [path, value] of Object.entries(outputs))
    writeFileSync(path, JSON.stringify(value, null, 2) + '\n');
  execFileSync('pnpm', ['prettier', '--write', ...Object.keys(outputs)], {
    stdio: 'ignore',
  });
  console.log(
    names
      .map((n) => `${n}: ${added[n].length} added, ${changed[n].size} changed`)
      .join('; '),
  );
}
