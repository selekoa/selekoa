// Mechanical verification of the key-papers pack.
//   node research/key-papers/verify.mjs   -> verification.json
// Checks: every quotation found in the text it names (at most 50 words); the per-source quotation
// budget, counting the dataset's existing quotations of the same source; a locator on every
// evidence item; every citation re-found in the citing text; every authorship name on the
// first page of the text read.
import { join } from 'node:path';
import {
  DIR,
  ROOT,
  cachedText,
  normalise,
  quoteFound,
  readJson,
  words,
  writeJson,
} from './tools.mjs';

const pack = readJson(join(DIR, 'pack.json'));
const dataSources = new Map(
  readJson(join(ROOT, 'data', 'sources.json')).map((s) => [s.id, s]),
);
const datasetQuotes = new Map();
for (const e of readJson(join(ROOT, 'data', 'evidence.json')))
  if (e.passageType === 'quote' && e.passage) {
    const set = datasetQuotes.get(e.sourceId) ?? new Set();
    set.add(normalise(e.passage));
    datasetQuotes.set(e.sourceId, set);
  }
const text = (key) => cachedText('paper', key) ?? cachedText('corpus', key);
const docs = new Map(pack.documents.map((d) => [d.id, d]));
const tkey = (t) =>
  normalise(t ?? '')
    .replace(/&amp;/g, '&')
    .replace(/[^a-z0-9 ]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

const problems = [];
const quotes = [];
const quotedBySource = new Map();
const citations = [];
const authorship = [];
for (const c of pack.claims) {
  for (const [i, e] of (c.evidence ?? []).entries()) {
    const tag = `${c.id} ev${i + 1}`;
    if (!e.locator) problems.push(`${tag}: no locator`);
    if (!e.source) problems.push(`${tag}: no source`);
    const t = e.source ? text(e.source) : null;
    if (
      (c.kind === 'states' || c.kind === 'shaping') &&
      e.passageType === 'quote'
    ) {
      const w = words(e.passage);
      const found = t != null && quoteFound(e.passage, t) === true;
      if (!t) problems.push(`${tag}: no retrieved text for ${e.source}`);
      else if (!found) problems.push(`${tag}: quotation not found`);
      if (w > 50) problems.push(`${tag}: quotation of ${w} words`);
      quotes.push({ claim: c.id, source: e.source, words: w, found });
      const set = quotedBySource.get(e.source) ?? new Set();
      set.add(normalise(e.passage));
      quotedBySource.set(e.source, set);
    } else if (c.kind === 'cites') {
      const d = docs.get(c.object.entityId);
      const flat = t?.replace(/\s+/g, ' ') ?? '';
      let ok;
      if (c.match === 'arXiv identifier')
        ok = !!d.externalIds.arxiv && flat.includes(d.externalIds.arxiv);
      else if (c.match === 'DOI')
        ok =
          !!d.externalIds.doi && flat.toLowerCase().includes(d.externalIds.doi);
      else {
        const sel = readJson(join(DIR, 'selection.json')).papers.find(
          (p) => p.id === d.id,
        );
        ok = tkey(flat).includes(tkey(sel?.title ?? d.title));
      }
      if (!t) problems.push(`${tag}: citing text not retrieved`);
      else if (!ok) problems.push(`${tag}: citation not re-found (${c.match})`);
      citations.push({
        claim: c.id,
        citing: c.subject,
        source: e.source,
        match: c.match,
        refound: ok,
      });
    } else if (c.kind === 'authored') {
      const first = t
        ? t.includes('\f')
          ? t.split('\f')[0]
          : t.slice(0, 6000)
        : '';
      const strip = (s) =>
        s
          .replace(/[Łł]/g, (c) => (c === 'Ł' ? 'L' : 'l'))
          .replace(/[Øø]/g, (c) => (c === 'Ø' ? 'O' : 'o'))
          .normalize('NFD')
          .replace(/\p{M}/gu, '');
      const ok =
        !!t &&
        strip(first.replace(/\s+/g, ' '))
          .toUpperCase()
          .includes(strip(e.passage).toUpperCase());
      if (!ok) problems.push(`${tag}: printed name not on the first page`);
      authorship.push({
        claim: c.id,
        person: c.subject,
        source: e.source,
        printed: e.passage,
        found: ok,
      });
    }
  }
}
// per-source budget
const perSource = {};
for (const [key, set] of quotedBySource) {
  // a pack copy of an expression the dataset already holds shares that source's budget
  const docId = key.replace(/--(v1|text)$/, '');
  const d = docs.get(docId);
  const same =
    d?.existingEntity && d.externalIds.arxiv
      ? [...dataSources.values()].find(
          (x) =>
            x.documentId === docId ||
            (x.evidenceUrl ?? '').includes(`${d.externalIds.arxiv}v1`),
        )
      : null;
  const ds = dataSources.has(key)
    ? key
    : same && (same.evidenceUrl ?? '').includes('v1')
      ? same.id
      : null;
  const prior = ds ? (datasetQuotes.get(ds) ?? new Set()) : new Set();
  const added = [...set].filter((q) => ![...prior].some((d) => d.includes(q)));
  const quoted = added.reduce((n, q) => n + words(q), 0);
  const priorWords = [...prior].reduce((n, q) => n + words(q), 0);
  const recorded = ds
    ? (dataSources.get(ds).documentWords?.count ?? null)
    : null;
  const docWords = recorded ?? (words(text(key) ?? '') || null);
  const limit =
    docWords == null
      ? null
      : docWords >= 2000
        ? Math.min(800, Math.max(400, Math.floor(docWords * 0.05)))
        : Math.max(25, Math.floor(docWords * 0.1));
  perSource[key] = {
    quotedNew: quoted,
    datasetQuoted: priorWords,
    documentWords: docWords,
    documentWordsBasis:
      recorded != null
        ? 'dataset source record'
        : 'words in the retrieved text layer',
    limit,
  };
  if (limit == null) problems.push(`${key}: document length unknown`);
  else if (quoted + priorWords > limit)
    problems.push(
      `${key}: ${quoted}+${priorWords} quoted words over limit ${limit}`,
    );
}
const out = {
  checkedAt: new Date().toISOString().slice(0, 10),
  summary: {
    quotations: quotes.length,
    quotationsFound: quotes.filter((q) => q.found).length,
    citations: citations.length,
    citationsRefound: citations.filter((c) => c.refound).length,
    authorship: authorship.length,
    authorshipFound: authorship.filter((a) => a.found).length,
    problems: problems.length,
  },
  problems,
  perSource,
  quotes,
  citations,
  authorship,
};
writeJson(join(DIR, 'verification.json'), out);
console.log(JSON.stringify(out.summary));
if (problems.length) console.log(problems.slice(0, 40).join('\n'));
