// Basis-1 ranking: merge candidates that are one work, count distinct citing texts, rank.
//   node research/key-papers/rank.mjs   -> .local/key-papers/ranked.json
import { join } from 'node:path';
import { CACHE, DIR, normalise, readJson, writeJson } from './tools.mjs';

const tkey = (t) =>
  normalise(t ?? '')
    .replace(/&amp;/g, '&')
    .replace(/<[^>]+>/g, '')
    .replace(/[^a-z0-9 ]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
const JUNK =
  /^(in )?(advances in|proceedings|journal of|arxiv|corr|preprint|international conference|conference on|workshop)/;

// Each corpus entry is one citing text. Bodies shared by several entries are already left out of
// the count (refs.mjs sharedBodies), so no two entries share a counted text.
// Each corpus entry is one citing text, except that an unlinked source holding another version
// of a dataset document (an arXiv v5 beside the dataset's v1) counts with that document.
// Bodies shared by several entries are already left out (refs.mjs sharedBodies).
export function groups() {
  const corpus = readJson(join(DIR, 'corpus.json'));
  const docs = corpus.filter((d) => d.document);
  const out = new Map();
  for (const d of corpus) {
    const key = d.document ?? d.sources[0].id;
    let g = key;
    if (!d.document) {
      const t = tkey(d.name);
      const same = docs.find(
        (x) => tkey(x.name).length > 12 && t.startsWith(tkey(x.name)),
      );
      if (same) g = same.document;
    }
    out.set(key, g);
  }
  return out;
}

function rank() {
  const counts = readJson(join(CACHE, 'counts.json'));
  const groupOf = groups();
  const works = new Map();
  for (const c of counts) {
    const tk = tkey(c.title);
    if (!tk || JUNK.test(tk)) continue;
    if (c.doi && /^10\.\d+\/.{0,5}$/.test(c.doi)) continue; // truncated DOI
    const id = tk;
    const w = works.get(id) ?? {
      title: c.title,
      keys: [],
      arxiv: null,
      doi: null,
      datasetDocument: null,
      years: new Set(),
      authors: null,
      cites: new Map(),
    };
    w.keys.push(c.key);
    w.arxiv ??= c.arxiv ?? null;
    if (c.doi && !c.doi.startsWith('10.48550')) w.doi ??= c.doi;
    w.datasetDocument ??= c.datasetDocument ?? null;
    if (c.year || c.published)
      w.years.add(String(c.year ?? c.published.slice(0, 4)));
    if (!w.authors && c.authors?.length) w.authors = c.authors;
    for (const x of c.citedBy) {
      const g = groupOf.get(x.entry) ?? x.entry;
      const list = w.cites.get(g) ?? [];
      if (!list.some((y) => y.entry === x.entry)) list.push(x);
      w.cites.set(g, list);
    }
    works.set(id, w);
  }
  // a dataset document never cites itself, through any of its keys
  const out = [];
  for (const w of works.values()) {
    if (w.datasetDocument)
      w.cites.delete(groupOf.get(w.datasetDocument) ?? w.datasetDocument);
    const count = w.cites.size;
    if (!count) continue;
    out.push({
      title: w.title,
      keys: w.keys,
      arxiv: w.arxiv,
      doi: w.doi,
      datasetDocument: w.datasetDocument,
      years: [...w.years].sort(),
      authors: w.authors,
      count,
      citingTexts: [...w.cites.entries()].map(([g, list]) => ({
        group: g,
        entries: list,
      })),
    });
  }
  out.sort((a, b) => b.count - a.count || a.title.localeCompare(b.title));
  writeJson(join(CACHE, 'ranked.json'), out);
  const shared = [...new Set(groupOf.values())].length;
  console.log(
    `${out.length} works; ${groupOf.size} corpus entries in ${shared} citing texts`,
  );
}

rank();
