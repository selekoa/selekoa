// Retrieval of the selected papers: arXiv abstract page (submission history), the quoted PDF
// version, and bibliographic records for venue versions.
//   node research/key-papers/papers.mjs fetch [--retry]   -> .local/key-papers/paper/*, paper-log.json
//   node research/key-papers/papers.mjs facts             -> facts.json (versions, venues, bylines; tracked)
import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import {
  CACHE,
  DIR,
  cachedMeta,
  cachedText,
  fetchDoc,
  readJson,
  writeJson,
} from './tools.mjs';

import { CURATION } from './curation.mjs';

const dsrc = new Map(
  readJson(join(DIR, '..', '..', 'data', 'sources.json')).map((x) => [x.id, x]),
);
const ents = new Map(
  readJson(join(DIR, '..', '..', 'data', 'entities.json')).map((e) => [
    e.id,
    e,
  ]),
);
// Selected papers with the preparer's corrections applied. Papers already in the dataset are read
// from the corpus cache under their dataset source.
export const sel = () =>
  readJson(join(DIR, 'selection.json')).papers.map((p) => {
    const c = CURATION[p.id] ?? {};
    const out = {
      ...p,
      ...Object.fromEntries(
        Object.entries(c).filter(([k]) => !['reason'].includes(k)),
      ),
      curation: c.reason ?? null,
    };
    if (p.datasetDocument) {
      out.datasetSources = ents.get(p.datasetDocument)?.sourceIds ?? [];
      // authors as the dataset's own source records them, not the index's
      const src = out.datasetSources
        .map((i) => dsrc.get(i))
        .find((x) => x?.authorNames?.length);
      if (src)
        out.authors = src.authorNames
          .filter((a) => a.family)
          .map((a) => [a.given, a.family].filter(Boolean).join(' '));
    }
    return out;
  });
const keyOf = (p) => p.id;

function getJson(url) {
  for (let i = 0; i < 3; i++) {
    try {
      const out = execFileSync(
        'curl',
        ['-sS', '-m', '60', '-w', '\n%{http_code}', url],
        { encoding: 'utf8', maxBuffer: 1 << 26 },
      );
      const at = out.lastIndexOf('\n');
      if (out.slice(at + 1) === '200') return JSON.parse(out.slice(0, at));
      if (out.slice(at + 1) === '404') return null;
    } catch {
      /* retry */
    }
    execFileSync('sleep', [String(4 * (i + 1))]);
  }
  return null;
}

async function fetchAll(retry) {
  const logPath = join(CACHE, 'paper-log.json');
  const log = existsSync(logPath) ? readJson(logPath) : {};
  const papers = sel();
  // Bibliographic records: one Semantic Scholar batch call; Crossref per DOI.
  const s2Path = join(CACHE, 'paper-s2.json');
  const s2 = existsSync(s2Path) ? readJson(s2Path) : {};
  const need = papers.filter((p) => !s2[p.id] && (p.arxiv || p.doi || p.s2));
  if (need.length) {
    const ids = need.map((p) =>
      p.arxiv ? `ARXIV:${p.arxiv}` : p.doi ? `DOI:${p.doi}` : p.s2,
    );
    const fields =
      'title,authors,year,publicationDate,venue,journal,publicationVenue,externalIds,citationCount,publicationTypes';
    for (let i = 0; i < 6; i++) {
      try {
        const out = execFileSync(
          'curl',
          [
            '-sS',
            '-m',
            '120',
            '-w',
            '\n%{http_code}',
            '-H',
            'content-type: application/json',
            '-d',
            JSON.stringify({ ids }),
            `https://api.semanticscholar.org/graph/v1/paper/batch?fields=${fields}`,
          ],
          { encoding: 'utf8', maxBuffer: 1 << 27 },
        );
        const at = out.lastIndexOf('\n');
        if (out.slice(at + 1) === '200') {
          JSON.parse(out.slice(0, at)).forEach(
            (w, j) => (s2[need[j].id] = w ?? { missing: true }),
          );
          break;
        }
      } catch {
        /* retry */
      }
      execFileSync('sleep', [String(10 * (i + 1))]);
    }
    writeJson(s2Path, s2);
  }
  for (const p of papers) {
    const doi = p.doi && !p.doi.startsWith('10.48550') ? p.doi : null;
    if (doi && !existsSync(join(CACHE, 'paper', `${p.id}--crossref.json`))) {
      const cr = getJson(
        `https://api.crossref.org/works/${encodeURIComponent(doi)}`,
      );
      mkdirSync(join(CACHE, 'paper'), { recursive: true });
      writeJson(join(CACHE, 'paper', `${p.id}--crossref.json`), cr ?? {});
    }
  }
  // Texts: one queue per host, so arXiv's pacing does not hold up other hosts.
  const jobs = [];
  for (const p of papers) {
    if (log[p.id] && (log[p.id].ok || !retry)) continue;
    if (p.arxiv)
      jobs.push({
        p,
        steps: [
          ['abs', `${p.id}--abs`, `https://arxiv.org/abs/${p.arxiv}`],
          [
            'pdf',
            `${p.id}--v1`,
            `https://arxiv.org/pdf/${p.arxiv}${p.pdfVersion ?? 'v1'}`,
          ],
        ],
      });
    else if (p.textUrl)
      jobs.push({
        p,
        steps: [
          ['text', `${p.id}--text`, p.textUrl],
          ...(p.bibUrl ? [['bib', `${p.id}--bib`, p.bibUrl]] : []),
        ],
      });
    else
      log[p.id] = {
        ok: false,
        steps: {},
        note: p.datasetDocument
          ? 'dataset sources read from the corpus cache'
          : 'no text address',
      };
  }
  const queues = new Map();
  for (const j of jobs) {
    const h = new URL(j.steps[0][2]).host;
    queues.set(h, [...(queues.get(h) ?? []), j]);
  }
  await Promise.all(
    [...queues.values()].map(async (list) => {
      for (const { p, steps } of list) {
        const entry = { ok: true, steps: {} };
        for (const [name, key, url] of steps) {
          const m = await fetchDoc('paper', key, url);
          entry.steps[name] = m.httpStatus ?? 0;
          if (name !== 'bib' && !(m.httpStatus === 200 && (m.words ?? 0) > 100))
            entry.ok = false;
        }
        log[p.id] = entry;
        writeJson(logPath, log);
        console.log(`${p.id}: ${JSON.stringify(entry.steps)}`);
      }
    }),
  );
  writeJson(logPath, log);
}

const MONTHS = {
  Jan: '01',
  Feb: '02',
  Mar: '03',
  Apr: '04',
  May: '05',
  Jun: '06',
  Jul: '07',
  Aug: '08',
  Sep: '09',
  Oct: '10',
  Nov: '11',
  Dec: '12',
};
function submissionHistory(k) {
  const t = cachedText('paper', `${k}--abs`);
  if (!t) return null;
  const flat = t.replace(/\s+/g, ' ');
  const versions = [
    ...flat.matchAll(/\[v(\d+)\] \w{3}, (\d{1,2}) (\w{3}) (\d{4}) [\d:]+ UTC/g),
  ].map((m) => ({
    version: `v${m[1]}`,
    date: `${m[4]}-${MONTHS[m[3]]}-${m[2].padStart(2, '0')}`,
  }));
  const comments =
    /Comments: (.{0,300}?)(?: Subjects:| Cite as:)/.exec(flat)?.[1]?.trim() ??
    null;
  const journalRef =
    /Journal reference: (.{0,300}?)(?: DOI:| Cite as:| Related DOI:)/
      .exec(flat)?.[1]
      ?.trim() ?? null;
  const relatedDoi =
    /Related DOI: \S*?(10\.\d{4,9}\/\S+)/
      .exec(flat)?.[1]
      ?.replace(/[.,]$/, '') ?? null;
  return { versions, comments, journalRef, relatedDoi };
}

// Where each credited name is printed on the first page of the text read (the byline position),
// with the printed form as it stands there. Index author names are only the list searched for.
const strip = (s) =>
  s
    .replace(/[Łł]/g, (c) => (c === 'Ł' ? 'L' : 'l'))
    .replace(/[Øø]/g, (c) => (c === 'Ø' ? 'O' : 'o'))
    .normalize('NFD')
    .replace(/\p{M}/gu, '');
const escRe = (w) => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
function bylines(p) {
  const t = paperText(p);
  const authors = p.authors ?? [];
  if (!t)
    return {
      read: null,
      names: authors.map((a) => ({
        name: a,
        printed: null,
        where: 'text not retrieved',
      })),
    };
  const pages = t.text.split('\f');
  const orig = (pages.length > 1 ? pages[0] : t.text.slice(0, 6000))
    .replace(/\[link: [^\]]*\]/g, ' ')
    .replace(/\s+/g, ' ');
  // stripped copy with a map from each stripped character back to the original one
  let first = '';
  const back = [];
  [...orig].forEach((ch, i) => {
    const st = strip(ch);
    first += st;
    for (let k = 0; k < st.length; k++) back.push(i);
  });
  const origChars = [...orig];
  const printedAt = (m) =>
    origChars
      .slice(back[m.index], back[m.index + m[0].length - 1] + 1)
      .join('')
      .trim();
  if (p.bylineCollective)
    return {
      read: `${t.kind}:${t.key}`,
      collective: true,
      names: [
        {
          name: p.bylineCollective,
          printed: first.includes(p.bylineCollective)
            ? p.bylineCollective
            : null,
          where: 'PDF p. 1',
          collective: true,
        },
      ],
      indexAuthors: authors.length,
    };
  const names = [];
  const upper = first.toUpperCase();
  for (const a of authors) {
    const toks = strip(a).replace(/\./g, '. ').split(/\s+/).filter(Boolean);
    if (!toks.length) continue;
    const fam = escRe(toks.at(-1));
    const given = toks.slice(0, -1).map((g) => g.replace(/\.$/, ''));
    // A given name as indexed; an initial stands for itself or for a capitalised name; a hyphenated
    // given name may be printed joined ("Yan-Ping" / "Yanping").
    const giv = (g) =>
      g.length === 1
        ? `${escRe(g)}(?:\\.|[a-z]+)?`
        : g
            .split('-')
            .map((part, i) =>
              i
                ? `[${part[0].toUpperCase()}${part[0].toLowerCase()}]${escRe(part.slice(1))}`
                : escRe(part),
            )
            .join('-?');
    const SEP = '[\\s\\-]+';
    const MID = '(?:[A-Z](?:\\.|[a-z]+)?[\\s\\-]+)*';
    const forms = [];
    if (given.length) {
      forms.push(given.map(giv).join(SEP) + SEP + fam);
      forms.push(giv(given[0]) + SEP + MID + fam);
      forms.push(`${escRe(given[0][0])}\\.?${SEP}${MID}${fam}`);
      // a printed given name that differs from the index form but shares its initial (Jeffrey / Jeff)
      forms.push(`${escRe(given[0][0])}[a-z]+${SEP}${MID}${fam}`);
    } else forms.push(fam);
    let printed = null;
    for (const f of forms) {
      const re = new RegExp(`(?<![A-Za-z])${f}(?![a-z])`);
      const m = re.exec(first) ?? re.exec(upper) ?? null;
      if (m && m[0].split(/\s+/).length <= 5) {
        printed = printedAt(m);
        break;
      }
    }
    names.push({
      name: a,
      printed,
      where: printed
        ? pages.length > 1
          ? 'PDF p. 1'
          : 'page head'
        : 'not found on the first page',
    });
  }
  return { read: `${t.kind}:${t.key}`, names };
}

function facts() {
  const s2Path = join(CACHE, 'paper-s2.json');
  const s2All = existsSync(s2Path) ? readJson(s2Path) : {};
  const out = [];
  for (const p of sel()) {
    const k = keyOf(p);
    const absMeta = cachedMeta('paper', `${k}--abs`);
    const read = paperText(p);
    const pdfMeta = read
      ? read.kind === 'paper'
        ? cachedMeta('paper', read.key)
        : cachedMeta('corpus', read.key)
      : null;
    const hist = p.arxiv ? submissionHistory(k) : null;
    let w = s2All[k] ?? {};
    // An index record is used only if its authors' family names overlap the paper's.
    const fam = (n) => strip(n).split(/\s+/).pop().toLowerCase();
    const mine = new Set((p.authors ?? []).map(fam));
    const theirs = (w.authors ?? []).map((a) => fam(a.name));
    const indexMismatch =
      w.paperId &&
      mine.size &&
      theirs.length &&
      theirs.filter((x) => mine.has(x)).length /
        Math.min(mine.size, theirs.length) <
        0.5;
    if (indexMismatch) w = {};
    const crPath = join(CACHE, 'paper', `${k}--crossref.json`);
    const cr = existsSync(crPath) ? (readJson(crPath).message ?? null) : null;
    out.push({
      id: k,
      arxiv: p.arxiv ?? null,
      title: p.title,
      authors: p.authors,
      arxivHistory: hist,
      abs: absMeta && {
        url: absMeta.finalUrl,
        status: absMeta.httpStatus,
        sha256: absMeta.sha256,
        retrievedAt: absMeta.retrievedAt,
      },
      text: pdfMeta && {
        read: read.kind === 'corpus' ? `dataset source ${read.key}` : read.key,
        url: pdfMeta.finalUrl,
        status: pdfMeta.httpStatus,
        sha256: pdfMeta.sha256,
        words: pdfMeta.words,
        retrievedAt: pdfMeta.retrievedAt,
      },
      semanticScholar: w.paperId
        ? {
            id: w.paperId,
            venue: w.venue || null,
            publicationVenue: w.publicationVenue
              ? {
                  name: w.publicationVenue.name,
                  type: w.publicationVenue.type ?? null,
                }
              : null,
            journal: w.journal ?? null,
            publicationDate: w.publicationDate ?? null,
            year: w.year ?? null,
            types: w.publicationTypes ?? null,
            externalIds: w.externalIds ?? null,
            citationCount: w.citationCount ?? null,
          }
        : null,
      crossref: cr && {
        doi: cr.DOI,
        type: cr.type,
        container: cr['container-title']?.[0] ?? null,
        volume: cr.volume ?? null,
        issue: cr.issue ?? null,
        page: cr.page ?? null,
        publishedPrint: cr['published-print']?.['date-parts']?.[0] ?? null,
        publishedOnline: cr['published-online']?.['date-parts']?.[0] ?? null,
        issued: cr.issued?.['date-parts']?.[0] ?? null,
      },
      bylines: bylines(p),
      curation: p.curation,
      indexMismatch: indexMismatch
        ? `Semantic Scholar record ${s2All[k].paperId} ("${s2All[k].title}", ${s2All[k].year}) has other authors; not used.`
        : null,
      datasetDocument: p.datasetDocument ?? null,
      textUrl: p.textUrl ?? null,
    });
  }
  writeJson(join(DIR, 'facts.json'), out);
  console.log(`${out.length} papers`);
}

const cmd = process.argv[2];
if (cmd === 'fetch') await fetchAll(process.argv.includes('--retry'));
else if (cmd === 'facts') facts();
else if (!['text', 'list', 'check'].includes(cmd))
  console.log('commands: fetch facts text list');

// The text read for a paper: arXiv v1, the curated text address, or the dataset's own source.
export function paperText(p) {
  for (const key of [`${p.id}--v1`, `${p.id}--text`]) {
    const t = cachedText('paper', key);
    if (t && t.split(/\s+/).length > 100)
      return { kind: 'paper', key, text: t };
  }
  // dataset sources: PDF text layers first, then web pages
  const ds = [...(p.datasetSources ?? [])].sort(
    (a, b) =>
      existsSync(join(CACHE, 'corpus', `${b}.txt`)) -
      existsSync(join(CACHE, 'corpus', `${a}.txt`)),
  );
  for (const sid of ds) {
    const t = cachedText('corpus', sid);
    if (t && t.split(/\s+/).length > 100)
      return { kind: 'corpus', key: sid, text: t };
  }
  return null;
}
if (process.argv[2] === 'text') {
  const p = sel().find((x) => x.id === process.argv[3]);
  const t = p && paperText(p);
  if (!t) console.log('missing');
  else {
    const pages = t.text.split('\f');
    const n = Number(process.argv[4] ?? 2);
    console.log(`[${t.kind}:${t.key}]`);
    pages
      .slice(0, n)
      .forEach((pg, i) => console.log(`\n=== PDF p. ${i + 1} ===\n${pg}`));
  }
}
if (process.argv[2] === 'list')
  for (const p of sel()) console.log(`${p.id}\t${p.basis}\t${p.title}`);
// Check the quotations of one draft against the text each names.
if (process.argv[2] === 'check') {
  const { quoteFound, words } = await import('./tools.mjs');
  const draft = readJson(process.argv[3]);
  const papers = new Map(sel().map((p) => [p.id, p]));
  let problems = 0;
  for (const d of draft) {
    const p = papers.get(d.paper);
    if (!p && !d.citing) {
      console.log(`${d.paper}: not a selected paper`);
      problems++;
      continue;
    }
    const quotes =
      d.quotes ??
      (d.passage && d.passageType !== 'paraphrase'
        ? [{ passage: d.passage }]
        : []);
    const text = d.citing
      ? cachedText('corpus', d.source)
      : d.text
        ? (cachedText('paper', d.text) ?? cachedText('corpus', d.text))
        : null;
    for (const q of quotes) {
      const w = words(q.passage);
      const ok = text != null && quoteFound(q.passage, text) === true;
      if (!ok || w > 50) {
        problems++;
        console.log(
          `${d.paper}${d.citing ? ` <- ${d.citing}` : ''}: ${!text ? 'no text' : !ok ? 'NOT FOUND' : ''} ${w > 50 ? `${w} words` : ''} «${q.passage.slice(0, 80)}»`,
        );
      }
    }
  }
  console.log(problems ? `${problems} problems` : 'no problems');
}
