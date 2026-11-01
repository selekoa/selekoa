// Basis-1 discovery and counting for the key-papers pack.
//   node research/key-papers/refs.mjs ids        identifiers (arXiv, DOI) in the corpus texts -> .local/key-papers/ids.json
//   node research/key-papers/refs.mjs resolve    metadata for identifiers (arXiv API, Semantic Scholar) and Semantic
//                                                Scholar reference lists of indexed corpus papers -> .local/key-papers/candidates.json
//   node research/key-papers/refs.mjs count      match every candidate in every corpus text -> counts.json
// Discovery never counts: a candidate is counted only where its identifier or title is found in a corpus text.
import { execFileSync } from 'node:child_process';
import { join } from 'node:path';
import {
  CACHE,
  DIR,
  cachedMeta,
  cachedText,
  normalise,
  readJson,
  writeJson,
} from './tools.mjs';

const corpus = () => readJson(join(DIR, 'corpus.json'));
const log = () => readJson(join(CACHE, 'corpus-log.json'));

const YYMM = '(?:0[7-9]|1\\d|2[0-6])(?:0[1-9]|1[0-2])';
const NEW_ID = new RegExp(
  `(arxiv|corr|abs/|pdf/)[^\\n]{0,40}?\\b(${YYMM}\\.\\d{4,5})(v\\d+)?\\b`,
  'gi',
);
const OLD_ID =
  /(?:arxiv:|arxiv\.org\/(?:abs|pdf)\/)((?:cs|stat|math|physics|q-bio|cond-mat|quant-ph|nlin)(?:\.[A-Z]{2})?\/\d{7})/gi;
const DOI = /\b(10\.\d{4,9}\/[-._;()/:A-Za-z0-9]+)/g;
const cleanDoi = (d) =>
  d
    .replace(/[.,;:)]+$/, '')
    .replace(/\.(pdf|html?)$/i, '')
    .toLowerCase();

// Bodies retrieved for more than one corpus entry (an archive listing shared by several editions, a
// collected volume, a monthly newsgroup archive, one address serving two versions) are left out: a
// citation in them cannot be attributed to one dataset document.
export function sharedBodies() {
  const holders = new Map();
  for (const d of corpus()) {
    const key = d.document ?? d.sources[0].id;
    for (const s of d.sources) {
      const m = cachedMeta('corpus', s.id);
      if (!m) continue;
      const set = holders.get(m.sha256) ?? {
        entries: new Set(),
        sources: new Set(),
        url: m.finalUrl,
      };
      set.entries.add(key);
      set.sources.add(s.id);
      holders.set(m.sha256, set);
    }
  }
  return new Map([...holders].filter(([, v]) => v.entries.size > 1));
}

export function textsByEntry() {
  const l = log();
  const shared = sharedBodies();
  const out = [];
  for (const d of corpus()) {
    const key = d.document ?? d.sources[0].id;
    const parts = [];
    for (const s of d.sources) {
      if (!l[s.id]?.ok) continue;
      if (shared.has(cachedMeta('corpus', s.id)?.sha256)) continue;
      const t = cachedText('corpus', s.id);
      if (t) parts.push({ source: s.id, text: t });
    }
    out.push({
      key,
      name: d.name,
      subtype: d.subtype,
      sources: d.sources.map((s) => s.id),
      parts,
    });
  }
  return out;
}

function ids() {
  const arxiv = {};
  const doi = {};
  for (const e of textsByEntry())
    for (const p of e.parts) {
      const flat = p.text.replace(/\s+/g, ' ');
      for (const m of flat.matchAll(NEW_ID))
        (arxiv[m[2]] ??= new Set()).add(e.key);
      for (const m of flat.matchAll(OLD_ID))
        (arxiv[m[1].toLowerCase()] ??= new Set()).add(e.key);
      for (const m of flat.matchAll(DOI)) {
        const d = cleanDoi(m[1]);
        if (d.startsWith('10.48550/arxiv.'))
          (arxiv[d.slice(15)] ??= new Set()).add(e.key);
        else (doi[d] ??= new Set()).add(e.key);
      }
    }
  const ser = (o) =>
    Object.fromEntries(Object.entries(o).map(([k, v]) => [k, [...v]]));
  writeJson(join(CACHE, 'ids.json'), { arxiv: ser(arxiv), doi: ser(doi) });
  console.log(
    `${Object.keys(arxiv).length} arXiv ids, ${Object.keys(doi).length} DOIs`,
  );
}

function get(url, accept = 'application/json') {
  for (let i = 0; i < 4; i++) {
    try {
      const out = execFileSync(
        'curl',
        [
          '-sS',
          '-m',
          '90',
          '-H',
          `Accept: ${accept}`,
          '-w',
          '\n%{http_code}',
          url,
        ],
        {
          encoding: 'utf8',
          maxBuffer: 1 << 28,
        },
      );
      const at = out.lastIndexOf('\n');
      const status = Number(out.slice(at + 1));
      if (status === 200) return out.slice(0, at);
      if (status === 404) return null;
      execFileSync('sleep', [String(5 * (i + 1))]);
    } catch {
      execFileSync('sleep', [String(5 * (i + 1))]);
    }
  }
  return null;
}

// arXiv API: title, authors, v1 date (published) and latest version date (updated).
function arxivMeta(idList) {
  const out = {};
  for (let i = 0; i < idList.length; i += 80) {
    const batch = idList.slice(i, i + 80);
    const xml = get(
      `https://export.arxiv.org/api/query?id_list=${batch.join(',')}&max_results=100`,
      'application/atom+xml',
    );
    execFileSync('sleep', ['4']);
    if (!xml) continue;
    for (const entry of xml.split('<entry>').slice(1)) {
      const id = /<id>https?:\/\/arxiv\.org\/abs\/([^<]+?)(v\d+)?<\/id>/.exec(
        entry,
      )?.[1];
      if (!id) continue;
      const title = /<title>([\s\S]*?)<\/title>/
        .exec(entry)?.[1]
        .replace(/\s+/g, ' ')
        .trim();
      const authors = [...entry.matchAll(/<name>([^<]+)<\/name>/g)].map((m) =>
        m[1].trim(),
      );
      out[id] = {
        arxiv: id,
        title,
        authors,
        published: /<published>([^<]+)/.exec(entry)?.[1],
        updated: /<updated>([^<]+)/.exec(entry)?.[1],
        doi: /<arxiv:doi[^>]*>([^<]+)/.exec(entry)?.[1]?.toLowerCase() ?? null,
        journalRef:
          /<arxiv:journal_ref[^>]*>([^<]+)/
            .exec(entry)?.[1]
            ?.replace(/\s+/g, ' ') ?? null,
      };
    }
  }
  return out;
}

// Semantic Scholar Graph API (no key; paced). OpenAlex's shared free budget was exhausted
// for this network on 2026-10-28, so discovery and the basis-2 counts use Semantic Scholar.
const S2 = 'https://api.semanticscholar.org/graph/v1';
const S2_FIELDS =
  'title,authors,year,publicationDate,venue,externalIds,citationCount,journal,publicationTypes';
function s2(path, body) {
  for (let i = 0; i < 6; i++) {
    try {
      const args = ['-sS', '-m', '120', '-w', '\n%{http_code}'];
      if (body)
        args.push(
          '-H',
          'content-type: application/json',
          '-d',
          JSON.stringify(body),
        );
      const out = execFileSync('curl', [...args, `${S2}${path}`], {
        encoding: 'utf8',
        maxBuffer: 1 << 28,
      });
      const at = out.lastIndexOf('\n');
      const status = out.slice(at + 1);
      execFileSync('sleep', ['3']);
      if (status === '200') return JSON.parse(out.slice(0, at));
      if (status === '404') return null;
    } catch {
      /* retry */
    }
    execFileSync('sleep', [String(10 * (i + 1))]);
  }
  return null;
}
export const slimS2 = (w) => ({
  s2: w.paperId,
  title: w.title,
  authors: (w.authors ?? []).map((a) => a.name),
  year: w.year ?? null,
  date: w.publicationDate ?? null,
  venue: w.venue || w.journal?.name || null,
  types: w.publicationTypes ?? null,
  citedBy: w.citationCount ?? null,
  arxiv: w.externalIds?.ArXiv ?? null,
  doi: w.externalIds?.DOI?.toLowerCase() ?? null,
  dblp: w.externalIds?.DBLP ?? null,
});
export function s2Batch(ids) {
  const out = [];
  for (let i = 0; i < ids.length; i += 400) {
    const r = s2(`/paper/batch?fields=${S2_FIELDS}`, {
      ids: ids.slice(i, i + 400),
    });
    out.push(
      ...(r ?? []).map((w, j) =>
        w
          ? { query: ids[i + j], ...slimS2(w) }
          : { query: ids[i + j], missing: true },
      ),
    );
  }
  return out;
}

function resolve() {
  const { arxiv, doi } = readJson(join(CACHE, 'ids.json'));
  const cand = new Map(); // key -> candidate
  const add = (w, how) => {
    const k = w.arxiv
      ? `arxiv:${w.arxiv}`
      : w.doi
        ? `doi:${w.doi}`
        : w.s2
          ? `s2:${w.s2}`
          : null;
    if (!k) return;
    const prev = cand.get(k);
    cand.set(k, {
      ...w,
      ...(prev ?? {}),
      found: [...new Set([...(prev?.found ?? []), how])],
    });
  };
  const meta = arxivMeta(Object.keys(arxiv));
  for (const m of Object.values(meta))
    add({ ...m, date: m.published?.slice(0, 10) }, 'identifier');
  console.log(
    `arXiv metadata for ${Object.keys(meta).length} of ${Object.keys(arxiv).length}`,
  );
  const byDoi = s2Batch(Object.keys(doi).map((d) => `DOI:${d}`));
  for (const w of byDoi) if (!w.missing) add(w, 'identifier');
  console.log(
    `Semantic Scholar metadata for ${byDoi.filter((w) => !w.missing).length} of ${Object.keys(doi).length} DOIs`,
  );
  // Reference lists of corpus papers indexed by Semantic Scholar: titles to search for, never counts.
  const ents = new Map(
    readJson(join(DIR, '..', '..', 'data', 'entities.json')).map((e) => [
      e.id,
      e,
    ]),
  );
  const paperIds = new Set();
  for (const e of textsByEntry()) {
    const ax = ents.get(e.key)?.externalIds?.arxiv;
    if (ax) paperIds.add(`arXiv:${ax}`);
    for (const p of e.parts) {
      const m = /arXiv:(\d{4}\.\d{4,5})v\d/.exec(p.text.slice(0, 4000));
      if (m) paperIds.add(`arXiv:${m[1]}`);
    }
  }
  let nRefs = 0;
  for (const id of paperIds) {
    const r = s2(
      `/paper/${id}/references?fields=title,authors,year,externalIds&limit=1000`,
    );
    for (const x of r?.data ?? [])
      if (x.citedPaper?.title) {
        nRefs++;
        add(slimS2(x.citedPaper), 'semantic-scholar-reference');
      }
  }
  console.log(
    `${paperIds.size} corpus papers queried; ${nRefs} reference entries`,
  );
  // Dataset documents that are papers.
  for (const e of ents.values())
    if (
      e.type === 'document' &&
      /paper|preprint|article|report|book|chapter|essay/i.test(e.subtype)
    ) {
      const k = e.externalIds?.arxiv
        ? `arxiv:${e.externalIds.arxiv}`
        : `dataset:${e.id}`;
      const prev = cand.get(k);
      cand.set(k, {
        title: e.name,
        ...(prev ?? {}),
        arxiv: prev?.arxiv ?? e.externalIds?.arxiv ?? null,
        datasetDocument: e.id,
        found: [...new Set([...(prev?.found ?? []), 'dataset-document'])],
      });
    }
  writeJson(join(CACHE, 'candidates.json'), Object.fromEntries(cand));
  console.log(`${cand.size} candidates`);
}

const ISSUERS = {
  'ai risk management framework': [
    'NIST',
    'National Institute of Standards and Technology',
  ],
};
const STOP = new Set([
  'introduction',
  'conclusion',
  'references',
  'abstract',
  'deep learning',
  'machine learning',
  'artificial intelligence',
  'superintelligence',
]);
function titleKey(t) {
  return normalise(t ?? '')
    .replace(/<[^>]+>/g, '')
    .replace(/[^a-z0-9 ]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function count() {
  const cand = readJson(join(CACHE, 'candidates.json'));
  const entries = textsByEntry().map((e) => ({
    ...e,
    flats: e.parts.map((p) => ({
      source: p.source,
      pages: p.text.split('\f'),
      key: titleKey(p.text),
      raw: p.text.replace(/\s+/g, ' '),
    })),
  }));
  const results = [];
  let n = 0;
  for (const [k, c] of Object.entries(cand)) {
    if (++n % 500 === 0) console.log(n);
    const tk = titleKey(c.title);
    const tw = tk.split(' ').filter(Boolean).length;
    // Titles of four words or fewer are common phrases or parts of other names ("Frontier AI Risk
    // Management Framework"): they count only with an author's family name, or the issuing body
    // of an institutional work, within 300 characters; titles of three words or fewer also need the
    // year there. (Amended after the same-family audit.)
    const strongTitle = tw >= 5 && tk.length >= 20 && !STOP.has(tk);
    const fam = [
      ...(c.authors ?? []).map((a) => a.split(/\s+/).pop()),
      ...(ISSUERS[tk] ?? []),
    ].filter(Boolean);
    const year = c.published?.slice(0, 4) ?? String(c.year ?? '');
    const citedBy = [];
    for (const e of entries) {
      if (c.datasetDocument && e.key === c.datasetDocument) continue;
      let hit = null;
      for (const f of e.flats) {
        // identifiers
        if (c.arxiv) {
          const re = new RegExp(
            `(?<![\\d.])${c.arxiv.replace('.', '\\.')}(?![\\d])`,
            'i',
          );
          const m = re.exec(f.raw);
          if (
            m &&
            /arxiv|corr|abs\/|pdf\//i.test(
              f.raw.slice(Math.max(0, m.index - 60), m.index),
            )
          ) {
            hit = {
              source: f.source,
              how: 'arXiv identifier',
              at: m.index,
              raw: f,
            };
          }
        }
        if (!hit && c.doi && !c.doi.startsWith('10.48550')) {
          const at = f.raw.toLowerCase().indexOf(c.doi);
          if (at >= 0) hit = { source: f.source, how: 'DOI', at, raw: f };
        }
        if (!hit && tk && tw >= 2) {
          const at = f.key.indexOf(tk);
          if (at >= 0) {
            const bounded =
              (at === 0 || f.key[at - 1] === ' ') &&
              (f.key[at + tk.length] ?? ' ') === ' ';
            if (bounded) {
              if (strongTitle)
                hit = { source: f.source, how: 'title', tkAt: at, raw: f };
              else {
                const near = f.key.slice(
                  Math.max(0, at - 300),
                  at + tk.length + 300,
                );
                if (
                  fam.some((x) => near.includes(titleKey(x))) &&
                  (tw >= 4 || (year && near.includes(year)))
                )
                  hit = {
                    source: f.source,
                    how: 'title with author and year',
                    tkAt: at,
                    raw: f,
                  };
              }
            }
          }
        }
        // A title inside a link to an encyclopedia article is not a citation of the work.
        if (hit && hit.how.startsWith('title')) {
          const m = titlePattern(tk).exec(f.raw);
          const around = m
            ? f.raw.slice(
                Math.max(0, m.index - 120),
                m.index + m[0].length + 20,
              )
            : '';
          if (/wikipedia\.org/i.test(around)) hit = null;
        }
        if (hit) break;
      }
      if (hit) {
        // Exclude the paper's own text: its title within the first 1,500 characters of a corpus source and a matching author.
        const head = titleKey(hit.raw.raw.slice(0, 1500));
        if (
          tk &&
          head.includes(tk) &&
          fam.some((x) => head.includes(titleKey(x)))
        )
          continue;
        citedBy.push({
          entry: e.key,
          source: hit.source,
          how: hit.how,
          locator: locate(hit, c, tk),
        });
      }
    }
    if (citedBy.length)
      results.push({ key: k, ...c, count: citedBy.length, citedBy });
  }
  results.sort((a, b) => b.count - a.count);
  writeJson(join(CACHE, 'counts.json'), results);
  console.log(
    `${results.length} candidates cited at least once; ${results.filter((r) => r.count >= 2).length} at least twice`,
  );
}

// Locator: PDF page and a short context (the reference entry or link) for re-checking.
const esc = (w) => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
function titlePattern(tk) {
  return new RegExp(tk.split(' ').map(esc).join('[^A-Za-z0-9]{1,8}'), 'i');
}
function locate(hit, c, tk) {
  const f = hit.raw;
  let page = null;
  let context;
  const pat = hit.how.startsWith('title') ? titlePattern(tk) : null;
  if (f.pages.length > 1) {
    const probe =
      hit.how === 'arXiv identifier'
        ? c.arxiv
        : hit.how === 'DOI'
          ? c.doi
          : null;
    for (let i = 0; i < f.pages.length; i++) {
      const p = f.pages[i].replace(/\s+/g, ' ');
      if (probe ? p.toLowerCase().includes(probe) : pat.test(p)) {
        page = i + 1;
        break;
      }
    }
  }
  if (hit.at != null)
    context = f.raw.slice(Math.max(0, hit.at - 160), hit.at + 60);
  else {
    const m = pat.exec(f.raw);
    context = m
      ? f.raw.slice(Math.max(0, m.index - 140), m.index + m[0].length + 60)
      : null;
  }
  return { page, context };
}

const cmd = process.argv[2];
if (cmd === 'ids') ids();
else if (cmd === 'resolve') resolve();
else if (cmd === 'count') count();
else if (cmd === 'shared')
  console.log(
    JSON.stringify(
      [...sharedBodies()].map(([sha, v]) => ({
        sha256: sha,
        url: v.url,
        entries: [...v.entries],
        sources: [...v.sources],
      })),
      null,
      1,
    ),
  );
else console.log('commands: ids resolve count');
