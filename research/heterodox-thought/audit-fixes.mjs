// Applies the same-family audit's dispositions to the drafts (research/heterodox-thought).
// Order: node reconcile.mjs; node audit-fixes.mjs; node reconcile.mjs (re-assigns
// earliest-located roles after any date or stance change); then tools.mjs merge.
// Inputs: audit/fixes-<draft>.json, one per draft, written from audit/findings.json.
// Each entry: { n, id, disposition: "applied" | "held" | "not-applied", reason, ops: [...] }.
// An op: { target: "record" | "link" | "document" | "source" | "searchLog" | "omission"
//          | "retrievalFailure" | "openQuestion", id, field, value }
//   - field is a dot path ("statement", "time.date", "evidence.0.locator", "roles");
//     value replaces it (null clears it);
//   - { target, id, remove: true } removes the item (and, for a record, nothing else);
//   - { target: "record" | "link" | "omission" | "retrievalFailure" | "openQuestion"
//       | "searchLog" | "source" | "document", add: {...} } appends an item.
//   searchLog items are addressed by proposition code as id.
// A record whose predicate changes gets the id suffix of its stance (-contests,
// -context, none), so that ids keep the pack's convention.
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const DIR = dirname(fileURLToPath(import.meta.url));
const KIND = {
  record: 'records',
  link: 'links',
  document: 'documents',
  source: 'sources',
  searchLog: 'searchLog',
  omission: 'omissions',
  retrievalFailure: 'retrievalFailures',
  openQuestion: 'openQuestions',
};
const keyOf = (target, x) =>
  target === 'source'
    ? x.key
    : target === 'searchLog'
      ? x.proposition
      : target === 'omission'
        ? x.item
        : target === 'retrievalFailure'
          ? x.url
          : target === 'openQuestion'
            ? x.question
            : x.id;
const setPath = (obj, path, value) => {
  const parts = path.split('.');
  let o = obj;
  for (const p of parts.slice(0, -1)) {
    if (o[p] == null) o[p] = /^\d+$/.test(p) ? [] : {};
    o = o[p];
  }
  o[parts.at(-1)] = value;
};
const suffix = {
  articulates_proposition: '',
  contests_proposition: '-contests',
  bears_on_proposition: '-context',
};
const problems = [];
const summary = { applied: 0, held: 0, 'not-applied': 0 };
for (const f of [
  'de-garis.json',
  'land.json',
  'moravec.json',
  'accelerationism.json',
  'further-texts.json',
]) {
  const fixesPath = join(DIR, 'audit', `fixes-${f}`);
  if (!existsSync(fixesPath)) continue;
  const draftPath = join(DIR, 'drafts', f);
  const d = JSON.parse(readFileSync(draftPath, 'utf8'));
  const fixes = JSON.parse(readFileSync(fixesPath, 'utf8'));
  // Ops always name a record by its id before this script ran; renames are followed.
  const renamed = new Map();
  for (const fx of fixes) {
    summary[fx.disposition] = (summary[fx.disposition] ?? 0) + 1;
    if (fx.disposition !== 'applied') continue;
    for (const op of fx.ops ?? []) {
      const arr = (d[KIND[op.target]] ??= []);
      if (op.add) {
        arr.push(op.add);
        continue;
      }
      const want = renamed.get(op.id) ?? op.id;
      const i = arr.findIndex((x) => keyOf(op.target, x) === want);
      if (i < 0) {
        problems.push(`${f} finding ${fx.n}: ${op.target} ${op.id} not found`);
        continue;
      }
      if (op.remove) {
        arr.splice(i, 1);
        continue;
      }
      setPath(arr[i], op.field, op.value);
      if (op.target === 'record' && op.field === 'predicate') {
        const r = arr[i];
        const base = r.id.replace(/-(contests|context)$/, '');
        r.id = base + suffix[r.predicate];
        renamed.set(op.id, r.id);
      }
    }
  }
  writeFileSync(draftPath, JSON.stringify(d, null, 2) + '\n');
}
console.log(JSON.stringify(summary));
console.log(problems.length ? problems.join('\n') : 'no problems');
if (problems.length) process.exitCode = 1;
