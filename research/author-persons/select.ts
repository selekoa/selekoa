// Selection: authors credited on texts that are the subject of proposition
// records, with or without a person entity. Writes selection.json.
// Run: pnpm exec tsx research/author-persons/select.ts
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
type Name = {
  family?: string;
  given?: string;
  suffix?: string;
  literal?: string;
};
type Src = Dataset['sources'][number] & { authorNames?: Name[] };

const fold = (s: string) =>
  s
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z ]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
const entities = new Map(data.entities.map((e) => [e.id, e]));
const sources = new Map((data.sources as Src[]).map((s) => [s.id, s]));
const persons = data.entities.filter((e) => e.type === 'person');

const claimCollections = new Map<string, string[]>();
for (const c of applicationCollections)
  for (const id of collectionClaimIds(data, c)) {
    const l = claimCollections.get(id) ?? [];
    if (!l.includes(c.definition.id)) l.push(c.definition.id);
    claimCollections.set(id, l);
  }
const propositionPredicates = new Set([
  'articulates_proposition',
  'contests_proposition',
  'bears_on_proposition',
]);
// Claims per document (as subject or object).
const docClaims = new Map<string, Dataset['claims']>();
for (const c of data.claims)
  for (const x of [
    c.subject,
    c.object.kind === 'entity' ? c.object.entityId : null,
  ])
    if (x && entities.get(x)?.type === 'document') {
      const l = docClaims.get(x) ?? [];
      l.push(c);
      docClaims.set(x, l);
    }
const evidenceById = new Map(data.evidence.map((e) => [e.id, e]));
const authoredPairs = new Set(
  data.claims
    .filter((c) => c.predicate === 'authored' && c.object.kind === 'entity')
    .map((c) => `${c.subject}|${(c.object as { entityId: string }).entityId}`),
);

// Studied texts: documents that are the subject of a proposition record.
const studied = [...docClaims.entries()].filter(([, cs]) =>
  cs.some((c) => propositionPredicates.has(c.predicate)),
);

// Person matching: family + given compatible (full first given name equal, or initial matches).
function compatible(a: Name, given: string) {
  const g1 = fold(a.given ?? '')
    .split(' ')
    .filter(Boolean);
  const g2 = fold(given).split(' ').filter(Boolean);
  if (!g1.length || !g2.length) return false;
  if (g1[0].length > 1 && g2[0].length > 1) return g1[0] === g2[0];
  return g1[0][0] === g2[0][0];
}
function matchPerson(n: Name) {
  return persons.filter((p) => {
    const forms = [p.name, ...(p.aliases ?? [])];
    const sort = (p as { sortName?: string }).sortName ?? '';
    const [f, g] = sort.split(',').map((x) => x?.trim() ?? '');
    if (fold(f) === fold(n.family ?? '') && compatible(n, g)) return true;
    return forms.some((full) => {
      const w = full.split(/\s+/);
      return (
        fold(w[w.length - 1]) === fold(n.family ?? '') &&
        compatible(n, w.slice(0, -1).join(' '))
      );
    });
  });
}

type Doc = {
  documentId: string;
  documentName: string;
  sourceId: string;
  printedAuthor: string;
  authorPosition: number;
  authorCount: number;
  date: string | null;
  kind: string | undefined;
  title: string;
  evidenceUrl: string | undefined;
  archivedUrl: string | null | undefined;
  records: number;
  propositionRecords: number;
  collections: Record<string, number>;
  roles: string[];
  authoredClaimExists: boolean;
};
const people = new Map<
  string,
  {
    family: string;
    given: string;
    suffix?: string;
    personEntity: string | null;
    candidates: string[];
    forms: Set<string>;
    docs: Doc[];
  }
>();
for (const [docId, cs] of studied) {
  // Inspected expression: the source most cited by this document's proposition records.
  const docSources = new Set(entities.get(docId)?.sourceIds ?? []);
  const tally = new Map<string, number>();
  for (const c of cs)
    for (const eid of c.evidenceIds) {
      const sid = evidenceById.get(eid)?.sourceId;
      if (
        sid &&
        (sources.get(sid)?.documentId === docId || docSources.has(sid))
      )
        tally.set(sid, (tally.get(sid) ?? 0) + 1);
    }
  if (!tally.size)
    for (const s of data.sources as Src[])
      if (s.documentId === docId || docSources.has(s.id)) tally.set(s.id, 0);
  const sid = [...tally.entries()].sort((a, b) => b[1] - a[1])[0]?.[0];
  if (!sid) continue;
  const s = sources.get(sid)!;
  (s.authorNames ?? []).forEach((n, i) => {
    if (!n.family) return;
    const matches = matchPerson(n);
    const key =
      matches.length === 1
        ? matches[0].id
        : `${fold(n.family)}|${fold(n.given ?? '')[0] ?? ''}`;
    const p = people.get(key) ?? {
      family: n.family,
      given: n.given ?? '',
      suffix: n.suffix,
      personEntity: matches.length === 1 ? matches[0].id : null,
      candidates: matches.map((m) => m.id),
      forms: new Set<string>(),
      docs: [],
    };
    if ((n.given ?? '').length > p.given.length) p.given = n.given ?? '';
    p.forms.add(s.authors[i]);
    const collections: Record<string, number> = {};
    const roles = new Set<string>();
    for (const c of cs) {
      for (const col of claimCollections.get(c.id) ?? [])
        collections[col] = (collections[col] ?? 0) + 1;
      for (const r of (c.attributes as { thought?: { roles?: string[] } })
        ?.thought?.roles ?? [])
        roles.add(r);
    }
    p.docs.push({
      documentId: docId,
      documentName: entities.get(docId)!.name,
      sourceId: sid,
      printedAuthor: s.authors[i],
      authorPosition: i + 1,
      authorCount: s.authors.length,
      date: s.publicationDate ?? null,
      kind: s.kind,
      title: s.title,
      evidenceUrl: s.evidenceUrl,
      archivedUrl: s.archivedUrl,
      records: cs.length,
      propositionRecords: cs.filter((c) =>
        propositionPredicates.has(c.predicate),
      ).length,
      collections,
      roles: [...roles],
      authoredClaimExists:
        matches.length === 1 && authoredPairs.has(`${matches[0].id}|${docId}`),
    });
    people.set(key, p);
  });
}
const out = [...people.entries()].map(([key, p]) => ({
  key,
  family: p.family,
  given: p.given,
  suffix: p.suffix,
  personEntity: p.personEntity,
  ambiguousMatches: p.candidates.length > 1 ? p.candidates : undefined,
  forms: [...p.forms],
  records: p.docs.reduce((a, d) => a + d.records, 0),
  documents: p.docs.sort((a, b) =>
    (a.date ?? '9999').localeCompare(b.date ?? '9999'),
  ),
}));
out.sort((a, b) => b.records - a.records);
writeFileSync(
  'research/author-persons/selection.json',
  JSON.stringify(out, null, 1) + '\n',
);
const fresh = out.filter((p) => !p.personEntity);
const existing = out.filter((p) => p.personEntity);
console.log(
  'studied documents',
  studied.length,
  'authors',
  out.length,
  'new',
  fresh.length,
  'existing',
  existing.length,
);
for (const p of fresh)
  console.log(
    'NEW',
    p.records,
    p.documents.length,
    p.forms.join(' / '),
    p.documents
      .flatMap((d) => d.roles)
      .filter((r) => r.startsWith('earliest') || r === 'most-developed')
      .join(','),
  );
for (const p of existing)
  console.log(
    'EXIST',
    p.personEntity,
    p.documents.length,
    'missing authored:',
    p.documents.filter((d) => !d.authoredClaimExists).length,
  );
