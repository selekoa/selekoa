// Applies the maintainer's decisions of 2026-11-02 on the pre-launch audit
// (review/prelaunch-audit-2026-11-02.md, "Decisions for the maintainer"), as
// listed in review/audit-followups-2026-11-02.json: field-level patches,
// added and removed rows, and bulk wording corrections. A patch names the
// value it replaces (or that the field is absent); a patch whose old value no
// longer matches stops the script, so nothing is changed silently. A bulk
// rule replaces one exact sentence wherever it occurs in one field and
// writes the IDs it changed to review/audit-followups-wording-2026-11-02.json.
//
//   pnpm tsx scripts/audit-followups.ts           write the records and the before-snapshot
//   pnpm tsx scripts/audit-followups.ts --check   compare with the stored records
//   pnpm tsx scripts/audit-followups.ts --base <commit>
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
  removed?: Partial<Record<Name, { id: string; reason: string }[]>>;
};
type Bulk = {
  id: string;
  table: Name;
  field: string;
  from: string;
  to: string;
  expected: number;
};

const specPath = 'review/audit-followups-2026-11-02.json';
const snapshotPath = 'review/audit-followups-before-2026-11-02.json';
const wordingPath = 'review/audit-followups-wording-2026-11-02.json';
const read = (path: string) => JSON.parse(readFileSync(path, 'utf8'));
const args = process.argv.slice(2);
const check = args.includes('--check');
const sha = (value: unknown) =>
  createHash('sha256').update(JSON.stringify(value)).digest('hex');

const spec: Json = read(specPath);
const date: string = spec.date;
const corrections: Correction[] = spec.corrections;
const bulk: Bulk[] = spec.bulk;

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
  const added = new Set<string>(storedSnapshot.added[n]);
  const before = new Map<string, Row>(
    storedSnapshot.before[n].map((r: Row) => [r.id, r]),
  );
  const kept = rows
    .filter((r) => !added.has(r.id))
    .map((r) => structuredClone(before.get(r.id) ?? r))
    .concat(structuredClone(storedSnapshot.removed[n]));
  const order: string[] | null = storedSnapshot.order[n];
  if (!order) return kept;
  const at = new Map(order.map((id, i) => [id, i]));
  return kept.sort((a, b) => at.get(a.id)! - at.get(b.id)!);
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
const baseArg = args.includes('--base')
  ? args[args.indexOf('--base') + 1]
  : undefined;
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
const changed: Record<Name, Set<string>> = {
  entities: new Set(),
  claims: new Set(),
  sources: new Set(),
  evidence: new Set(),
};
const segments = (path: string) => path.split('.');
const find = (n: Name, id: string) => {
  const row = rows[n].find((r) => r.id === id) as Json | undefined;
  if (!row) throw new Error(`No ${n} row: ${id}`);
  return row;
};
function at(row: Json, path: string) {
  return segments(path).reduce<Json | undefined>(
    (v, k) => (v === undefined ? undefined : v[k]),
    row,
  );
}

const added: Record<Name, string[]> = {
  entities: [],
  claims: [],
  sources: [],
  evidence: [],
};
const removed: Record<Name, Row[]> = {
  entities: [],
  claims: [],
  sources: [],
  evidence: [],
};
for (const c of corrections) {
  for (const p of c.patches) {
    const row = find(p.table, p.id);
    const current = at(row, p.path);
    const expected = 'old' in p ? p.old : undefined;
    if (!isDeepStrictEqual(current, expected))
      throw new Error(
        `${c.id}: ${p.table}/${p.id} ${p.path}: the stored value is not the patch's old value`,
      );
    const keys = segments(p.path);
    const parent = keys.slice(0, -1).reduce<Json>((v, k) => (v[k] ??= {}), row);
    if (p.remove) delete parent[keys.at(-1)!];
    else parent[keys.at(-1)!] = structuredClone(p.new);
    changed[p.table].add(p.id);
  }
  for (const n of names) {
    for (const { row, after } of c.added?.[n] ?? []) {
      if (rows[n].some((r) => r.id === row.id))
        throw new Error(`${c.id}: ${n}/${row.id} exists already`);
      const i = rows[n].findIndex((r) => r.id === after);
      if (i < 0) throw new Error(`${c.id}: no ${n} row ${after} to follow`);
      rows[n].splice(i + 1, 0, structuredClone(row));
      added[n].push(row.id);
    }
    for (const { id } of c.removed?.[n] ?? []) {
      const i = rows[n].findIndex((r) => r.id === id);
      if (i < 0) throw new Error(`${c.id}: no ${n} row ${id} to remove`);
      removed[n].push(original[n].get(id)!);
      rows[n].splice(i, 1);
      changed[n].delete(id);
    }
  }
}

const wording: Record<string, string[]> = {};
for (const b of bulk) {
  const ids: string[] = [];
  for (const row of rows[b.table] as Json[]) {
    const value = row[b.field];
    if (typeof value !== 'string' || !value.includes(b.from)) continue;
    row[b.field] = value.split(b.from).join(b.to);
    ids.push(row.id);
    changed[b.table].add(row.id);
  }
  if (ids.length !== b.expected)
    throw new Error(
      `${b.id}: ${ids.length} rows changed, ${b.expected} expected`,
    );
  wording[b.id] = ids;
}
for (const n of names) for (const id of added[n]) changed[n].delete(id);
// A patch that sets a field to its old value is no change.
for (const n of names)
  for (const id of [...changed[n]])
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
const newSnapshot = {
  description:
    "Rows changed by the maintainer's decisions of 2026-11-02 on the pre-launch audit (scripts/audit-followups.ts, review/audit-followups-2026-11-02.json, review/audit-followups-2026-11-02.md). Reverting it (src/editorial/historical-views.ts) reproduces the dataset as it was at baseCommit.",
  baseCommit:
    storedSnapshot && !baseArg ? storedSnapshot.baseCommit : baseCommit,
  meta: base.meta,
  added,
  before: Object.fromEntries(
    names.map((n) => [n, base[n].filter((r) => changed[n].has(r.id))]),
  ),
  removed,
  order: Object.fromEntries(
    names.map((n) => [n, removed[n].length ? base[n].map((r) => r.id) : null]),
  ),
  sha256: { meta: sha(base.meta), ...baseSha },
};
const outputs: Record<string, unknown> = {
  'data/meta.json': meta,
  ...Object.fromEntries(names.map((n) => [`data/${n}.json`, rows[n]])),
  [snapshotPath]: newSnapshot,
  [wordingPath]: {
    description:
      'Records changed by the bulk wording corrections of 2026-11-02 (review/audit-followups-2026-11-02.json, "bulk"), by rule. Written by scripts/audit-followups.ts.',
    rules: bulk.map(({ id, table, field, from, to }) => ({
      id,
      table,
      field,
      from,
      to,
      ids: wording[id],
    })),
  },
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
      .map(
        (n) =>
          `${n}: ${added[n].length} added, ${changed[n].size} changed, ${removed[n].length} removed`,
      )
      .join('; '),
  );
}
