// Applies the corrections of the pre-launch audit (review/prelaunch-audit-2026-11-02.md):
// field-level patches to stored records, each re-checked against its source
// by a fixer and an independent skeptic before it was listed in
// review/prelaunch-fixes-2026-11-02.json. Every patch names the record, the
// field, the value it replaces and the new value; a patch whose old value no
// longer matches stops the script, so nothing is changed silently.
//
//   pnpm tsx scripts/prelaunch-fixes.ts           write the records and the before-snapshot
//   pnpm tsx scripts/prelaunch-fixes.ts --check   compare with the stored records
//   pnpm tsx scripts/prelaunch-fixes.ts --base <commit>
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
  old: unknown;
  /** The new value; absent with `remove` to delete the field. */
  new?: unknown;
  remove?: true;
};

const patchPath = 'review/prelaunch-fixes-2026-11-02.json';
const snapshotPath = 'review/prelaunch-fixes-before-2026-11-02.json';
const read = (path: string) => JSON.parse(readFileSync(path, 'utf8'));
const args = process.argv.slice(2);
const check = args.includes('--check');
const sha = (value: unknown) =>
  createHash('sha256').update(JSON.stringify(value)).digest('hex');

const fixes: Json = read(patchPath);
const date: string = fixes.date;
const patches: Patch[] = fixes.corrections.flatMap(
  (c: { patches: Patch[] }) => c.patches,
);

// ---------------------------------------------------------------- base
const stored = {
  meta: read('data/meta.json'),
  ...Object.fromEntries(names.map((n) => [n, read(`data/${n}.json`)])),
} as { meta: Json } & Record<Name, Row[]>;
const storedSnapshot: Json | null = existsSync(snapshotPath)
  ? read(snapshotPath)
  : null;
const base = {
  meta: storedSnapshot ? storedSnapshot.meta : stored.meta,
  ...Object.fromEntries(
    names.map((n) => {
      const added = new Set<string>(storedSnapshot?.added[n] ?? []);
      const before = new Map<string, Row>(
        (storedSnapshot?.before[n] ?? []).map((r: Row) => [r.id, r]),
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
if (
  storedSnapshot &&
  names.some((n) => sha(base[n]) !== storedSnapshot.sha256[n])
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

// ---------------------------------------------------------------- patches
const changed: Record<Name, Map<string, Row>> = {
  entities: new Map(),
  claims: new Map(),
  sources: new Map(),
  evidence: new Map(),
};
const segments = (path: string) => path.split('.');
function at(row: Json, path: string) {
  return segments(path).reduce<Json | undefined>(
    (v, k) => (v === undefined ? undefined : v[k]),
    row,
  );
}
for (const p of patches) {
  const row = base[p.table].find((r) => r.id === p.id) as Json | undefined;
  if (!row) throw new Error(`No stored ${p.table} row: ${p.id}`);
  const current = at(row, p.path);
  if (!isDeepStrictEqual(current, p.old))
    throw new Error(
      `${p.table}/${p.id} ${p.path}: the stored value is not the patch's old value`,
    );
  if (!changed[p.table].has(p.id))
    changed[p.table].set(p.id, structuredClone(row) as Row);
  const keys = segments(p.path);
  const parent = keys.slice(0, -1).reduce<Json>((v, k) => (v[k] ??= {}), row);
  if (p.remove) delete parent[keys.at(-1)!];
  else parent[keys.at(-1)!] = structuredClone(p.new);
}

// A rerun must not undo a later edit to a patched row: with a snapshot, the
// stored rows must be exactly the patched ones.
if (storedSnapshot && !check)
  for (const n of names)
    for (const id of changed[n].keys()) {
      const patched = base[n].find((r) => r.id === id);
      const now = stored[n].find((r) => r.id === id);
      if (JSON.stringify(patched) !== JSON.stringify(now))
        throw new Error(
          `${n}/${id} differs from the corrected row; a later edit would be lost. Compare with --check.`,
        );
    }

// ---------------------------------------------------------------- output
const meta = {
  ...base.meta,
  updatedAt: date > base.meta.updatedAt ? date : base.meta.updatedAt,
};
const newSnapshot = {
  description:
    'Rows changed by the corrections of the pre-launch audit (scripts/prelaunch-fixes.ts, review/prelaunch-fixes-2026-11-02.json, review/prelaunch-audit-2026-11-02.md). Restoring the changed rows reproduces the dataset as it was at baseCommit.',
  baseCommit:
    storedSnapshot && !baseArg ? storedSnapshot.baseCommit : baseCommit,
  meta: base.meta,
  added: Object.fromEntries(names.map((n) => [n, [] as string[]])),
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
  ...Object.fromEntries(names.map((n) => [`data/${n}.json`, base[n]])),
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
  } else console.log('Stored records match the corrections.');
} else {
  for (const [path, value] of Object.entries(outputs))
    writeFileSync(path, JSON.stringify(value, null, 2) + '\n');
  execFileSync('pnpm', ['prettier', '--write', ...Object.keys(outputs)], {
    stdio: 'ignore',
  });
  console.log(
    `Changed ${names.map((n) => `${changed[n].size} ${n}`).join(', ')} by ${patches.length} patches.`,
  );
}
