// Inventory: people credited as authors in source records who have no person entity.
// Run: pnpm exec tsx research/author-persons/inventory.ts  → research/author-persons/inventory.json
import { readFileSync, writeFileSync } from 'node:fs';
import type { Dataset } from '../../src/domain/schema';
import {
  applicationCollections,
  collectionClaimIds,
} from '../../src/release/collections';

const read = (f: string) => JSON.parse(readFileSync(`data/${f}.json`, 'utf8'));
const data = {
  meta: read('meta'),
  entities: read('entities'),
  claims: read('claims'),
  sources: read('sources'),
  evidence: read('evidence'),
} as Dataset;

const fold = (s: string) =>
  s
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z一-鿿 ]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
// Key: family name + first given word (initials dropped unless nothing else).
function key(family: string, given = '') {
  const g = fold(given)
    .split(' ')
    .filter((w) => w.length > 1);
  return `${fold(family)}|${g[0] ?? fold(given).split(' ')[0] ?? ''}`;
}
function keyFromFull(full: string) {
  const w = full.trim().split(/\s+/);
  return key(w[w.length - 1], w.slice(0, -1).join(' '));
}

const persons = data.entities.filter((e) => e.type === 'person');
const personKeys = new Map<string, string>();
for (const p of persons) {
  const sort = (p as { sortName?: string }).sortName;
  if (sort && sort.includes(',')) {
    const [f, g] = sort.split(',');
    personKeys.set(key(f, g), p.id);
  }
  for (const n of [p.name, ...(p.aliases ?? [])])
    personKeys.set(keyFromFull(n), p.id);
}

// Collections each claim belongs to.
const claimCollections = new Map<string, string[]>();
for (const c of applicationCollections) {
  for (const id of collectionClaimIds(data, c)) {
    const list = claimCollections.get(id) ?? [];
    if (!list.includes(c.definition.id)) list.push(c.definition.id);
    claimCollections.set(id, list);
  }
}

const claimsBySource = new Map<string, Set<string>>();
for (const e of data.evidence) {
  const s = claimsBySource.get(e.sourceId) ?? new Set();
  s.add(e.claimId);
  claimsBySource.set(e.sourceId, s);
}
const docOfSource = new Map<string, string>();
for (const s of data.sources)
  if (s.documentId) docOfSource.set(s.id, s.documentId);
for (const e of data.entities)
  if (e.type === 'document')
    for (const sid of e.sourceIds ?? [])
      if (!docOfSource.has(sid)) docOfSource.set(sid, e.id);

type Row = {
  key: string;
  forms: Set<string>;
  sources: Set<string>;
  documents: Set<string>;
  claims: Set<string>;
  byCollection: Record<string, Set<string>>;
  matchedPerson?: string;
};
const rows = new Map<string, Row>();
for (const s of data.sources) {
  const names = (
    s as {
      authorNames?: { family?: string; given?: string; literal?: string }[];
    }
  ).authorNames;
  if (!names) continue;
  names.forEach((n, i) => {
    if (!n.family) return;
    const k = key(n.family, n.given);
    const r: Row = rows.get(k) ?? {
      key: k,
      forms: new Set(),
      sources: new Set(),
      documents: new Set(),
      claims: new Set(),
      byCollection: {},
    };
    r.forms.add((s.authors[i] ?? `${n.given ?? ''} ${n.family}`).trim());
    r.sources.add(s.id);
    const doc = docOfSource.get(s.id);
    if (doc) r.documents.add(doc);
    for (const cid of claimsBySource.get(s.id) ?? []) {
      r.claims.add(cid);
      for (const col of claimCollections.get(cid) ?? ['(no collection)']) {
        (r.byCollection[col] ??= new Set()).add(cid);
      }
    }
    r.matchedPerson = personKeys.get(k);
    rows.set(k, r);
  });
}

const out = [...rows.values()]
  .map((r) => ({
    key: r.key,
    forms: [...r.forms],
    personEntity: r.matchedPerson ?? null,
    sources: [...r.sources],
    documents: [...r.documents],
    claimCount: r.claims.size,
    byCollection: Object.fromEntries(
      Object.entries(r.byCollection).map(([k, v]) => [k, v.size]),
    ),
  }))
  .sort((a, b) => b.claimCount - a.claimCount);
writeFileSync(
  'research/author-persons/inventory.json',
  JSON.stringify(out, null, 1) + '\n',
);
const missing = out.filter((r) => !r.personEntity);
console.log('authors', out.length, 'missing', missing.length);
for (const r of missing.slice(0, 400))
  console.log(
    r.claimCount,
    r.sources.length,
    r.forms.join(' / '),
    JSON.stringify(r.byCollection),
  );
