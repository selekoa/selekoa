// Selection for the key-papers pack.
//   node research/key-papers/select.mjs   -> selection.json (tracked)
// Basis 1: works cited by at least THRESHOLD distinct citing texts of the corpus (rank.mjs), on machine
// intelligence. Basis 2: Semantic Scholar citation count, filling up to BASIS2_CAP works basis 1 misses.
import { execFileSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { CACHE, DIR, ROOT, normalise, readJson, writeJson } from './tools.mjs';

const THRESHOLD = 5;
const NEAR = 4; // the next band down, listed as near-misses
const BASIS2_CAP = 30;
const CHECK_DATE = '2026-10-28';

const tkey = (t) =>
  normalise(t ?? '')
    .replace(/&amp;/g, '&')
    .replace(/<[^>]+>/g, '')
    .replace(/[^a-z0-9 ]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

// Works that are one work under two titles, by the preparer: the shorter key is a truncation.
const SAME_WORK = {
  'why are there still so many jobs the history and future of workplace':
    'why are there still so many jobs the history and future of workplace automation',
};

// Subject rule: title or abstract names machine intelligence. Overrides where neither is available
// or the rule misreads a title, by the preparer, each with its reason.
const SUBJECT =
  /automat|singularity|uploads|artificial intelligence|machine intelligence|machine learning|neural net|language model|\bllms?\b|robot|superintellig|ultraintellig|intelligent machine|reinforcement learning|deep learning|\bai\b|\bagi\b|transformer|foundation model|question answering|machine translation|chatbot|generative pre|pre-?train|benchmark for (general|large|language)|computeri[sz]ation/i;
const SUBJECT_OVERRIDE = {
  'are ideas getting harder to find': {
    in: false,
    reason:
      'Research productivity and economic growth; neither title nor abstract concerns machine intelligence.',
  },
  'report of the editor journal of economic perspectives': {
    in: false,
    reason:
      "A journal editor's annual report, matched by its DOI in the American Economic Association site's navigation links, not cited in any text.",
  },
};

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
      const out = execFileSync(
        'curl',
        [...args, `https://api.semanticscholar.org/graph/v1${path}`],
        {
          encoding: 'utf8',
          maxBuffer: 1 << 28,
        },
      );
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
const F =
  'title,abstract,fieldsOfStudy,s2FieldsOfStudy,authors,year,publicationDate,venue,journal,externalIds,citationCount,publicationTypes';

function enrich(works) {
  const cachePath = join(CACHE, 's2-works.json');
  const cache = existsSync(cachePath) ? readJson(cachePath) : {};
  const need = works.filter((w) => !cache[w.tk]);
  const ids = need.map((w) =>
    w.arxiv ? `ARXIV:${w.arxiv}` : w.doi ? `DOI:${w.doi}` : null,
  );
  const withId = need.filter((_, i) => ids[i]);
  const got = withId.length
    ? (s2(`/paper/batch?fields=${F}`, { ids: ids.filter(Boolean) }) ?? [])
    : [];
  withId.forEach((w, i) => {
    if (got[i]) cache[w.tk] = { ...got[i], via: 'identifier' };
  });
  for (const w of need.filter((x) => !cache[x.tk])) {
    const r = s2(
      `/paper/search/match?query=${encodeURIComponent(w.title)}&fields=${F}`,
    );
    const m = r?.data?.[0];
    if (m && tkey(m.title) === w.tk) cache[w.tk] = { ...m, via: 'title match' };
    else cache[w.tk] = { missing: true };
  }
  writeJson(cachePath, cache);
  return cache;
}

function basis2Ranking() {
  const path = join(CACHE, 's2-basis2.json');
  if (existsSync(path)) return readJson(path);
  const q =
    '"machine learning" | "neural network" | "neural networks" | "deep learning" | "reinforcement learning" | "language model" | "language models"';
  const r = s2(
    `/paper/search/bulk?query=${encodeURIComponent(q)}&fieldsOfStudy=Computer%20Science&publicationTypes=JournalArticle,Conference&sort=citationCount:desc&fields=title,year,citationCount,externalIds,publicationTypes,venue,authors,abstract`,
  );
  const out = {
    retrievedAt: CHECK_DATE,
    query: q,
    total: r?.total ?? null,
    data: (r?.data ?? []).slice(0, 150),
  };
  writeJson(path, out);
  return out;
}

const ents = readJson(join(ROOT, 'data', 'entities.json'));
const docByArxiv = new Map(
  ents
    .filter((e) => e.externalIds?.arxiv)
    .map((e) => [e.externalIds.arxiv, e.id]),
);
const studied = new Set(
  readJson(join(ROOT, 'data', 'claims.json'))
    .filter((c) => /_proposition$/.test(c.predicate))
    .map((c) => c.subject),
);
const dsrc = new Map(
  readJson(join(ROOT, 'data', 'sources.json')).map((x) => [x.id, x]),
);
const entIndex = new Map(ents.map((e) => [e.id, e]));
// For a dataset document, the authors its own source records.
function datasetAuthors(w) {
  const d =
    w.datasetDocument ??
    (w.arxiv && docByArxiv.get(w.arxiv)) ??
    docByTitle.get(w.tk);
  const src = (entIndex.get(d)?.sourceIds ?? [])
    .map((i) => dsrc.get(i))
    .find((x) => x?.authorNames?.length);
  return src
    ? src.authorNames
        .filter((a) => a.family)
        .map((a) => [a.given, a.family].filter(Boolean).join(' '))
    : null;
}
const docByTitle = new Map(
  ents.filter((e) => e.type === 'document').map((e) => [tkey(e.name), e.id]),
);

function main() {
  const ranked = readJson(join(CACHE, 'ranked.json'));
  // merge one-work duplicates
  const byKey = new Map();
  for (const r of ranked) {
    const tk = SAME_WORK[tkey(r.title)] ?? tkey(r.title);
    const prev = byKey.get(tk);
    if (!prev) byKey.set(tk, { ...r, tk });
    else {
      const groups = new Map(prev.citingTexts.map((t) => [t.group, t]));
      for (const t of r.citingTexts)
        if (!groups.has(t.group)) groups.set(t.group, t);
      prev.citingTexts = [...groups.values()];
      prev.count = groups.size;
      prev.keys.push(...r.keys);
      prev.arxiv ??= r.arxiv;
      prev.doi ??= r.doi;
      prev.datasetDocument ??= r.datasetDocument;
      prev.mergedTitles = [...(prev.mergedTitles ?? []), r.title];
    }
  }
  const works = [...byKey.values()].sort(
    (a, b) => b.count - a.count || a.title.localeCompare(b.title),
  );
  const band = works.filter((w) => w.count >= NEAR);
  const s2c = enrich(band);
  const studiedDoc = (w) => {
    const d = w.datasetDocument ?? docByTitle.get(w.tk);
    return d && studied.has(d);
  };
  const decorate = (w) => {
    const m = s2c[w.tk] && !s2c[w.tk].missing ? s2c[w.tk] : null;
    const arxiv = w.arxiv ?? m?.externalIds?.ArXiv ?? null;
    const doi = (w.doi ?? m?.externalIds?.DOI ?? null)?.toLowerCase() ?? null;
    const ov = SUBJECT_OVERRIDE[w.tk];
    const subjectText = `${w.title} ${m?.abstract ?? ''}`;
    const fields = [
      ...new Set([
        ...(m?.fieldsOfStudy ?? []),
        ...(m?.s2FieldsOfStudy ?? []).map((f) => f.category),
      ]),
    ];
    const subject = ov
      ? { in: ov.in, basis: 'preparer', reason: ov.reason }
      : studiedDoc(w)
        ? {
            in: true,
            basis:
              'the dataset already records this text in a proposition collection on machine intelligence',
          }
        : fields.includes('Computer Science')
          ? {
              in: true,
              basis: 'Semantic Scholar field of study: Computer Science',
            }
          : SUBJECT.test(subjectText)
            ? {
                in: true,
                basis: `keyword in the ${m?.abstract ? 'title or abstract' : 'title'}`,
              }
            : {
                in: false,
                basis: m
                  ? `fields of study ${fields.join(', ') || 'none'}; no keyword in the ${m.abstract ? 'title or abstract' : 'title'}`
                  : 'no index record; no keyword in the title',
              };
    return {
      tk: w.tk,
      title: w.title,
      mergedTitles: w.mergedTitles ?? [],
      arxiv,
      doi: doi && !doi.startsWith('10.48550') ? doi : null,
      s2: m?.paperId ?? null,
      datasetDocument:
        w.datasetDocument ??
        (arxiv && docByArxiv.get(arxiv)) ??
        docByTitle.get(w.tk) ??
        null,
      year: m?.year ?? (w.years?.[0] ? Number(w.years[0]) : null),
      authors:
        datasetAuthors(w) ?? m?.authors?.map((a) => a.name) ?? w.authors ?? [],
      venue: m?.venue || m?.journal?.name || null,
      types: m?.publicationTypes ?? null,
      count: w.count,
      citingTexts: w.citingTexts.map((t) => ({
        group: t.group,
        entries: t.entries.map((e) => ({
          entry: e.entry,
          source: e.source,
          how: e.how,
          page: e.locator.page,
        })),
      })),
      subject,
    };
  };
  const banded = band.map(decorate);
  const basis1 = banded
    .filter((w) => w.count >= THRESHOLD && w.subject.in)
    .map((w) => ({ ...w, basis: 1 }));
  const excluded = banded
    .filter((w) => !w.subject.in)
    .map((w) => ({
      title: w.title,
      count: w.count,
      reason: w.subject.reason ?? `Subject rule not met (${w.subject.basis}).`,
    }));
  const nearMisses = banded
    .filter((w) => w.count < THRESHOLD && w.subject.in)
    .map((w) => ({
      title: w.title,
      count: w.count,
      arxiv: w.arxiv,
      doi: w.doi,
      datasetDocument: w.datasetDocument,
    }));
  // Basis 2
  const b2 = basis2Ranking();
  const have = new Set(basis1.map((w) => w.tk));
  const haveArxiv = new Set(basis1.map((w) => w.arxiv).filter(Boolean));
  const basis2 = [];
  const basis2Skipped = [];
  for (const [i, p] of b2.data.entries()) {
    if (basis2.length >= BASIS2_CAP) break;
    const tk = tkey(p.title);
    const rankNo = i + 1;
    if (
      have.has(tk) ||
      (p.externalIds?.ArXiv && haveArxiv.has(p.externalIds.ArXiv))
    ) {
      basis2Skipped.push({
        rank: rankNo,
        title: p.title,
        citationCount: p.citationCount,
        reason: 'Already admitted by basis 1.',
      });
      continue;
    }
    const why = basis2Exclusion(p);
    if (why) {
      basis2Skipped.push({
        rank: rankNo,
        title: p.title,
        citationCount: p.citationCount,
        reason: why,
      });
      continue;
    }
    const near = works.find((w) => w.tk === tk);
    basis2.push({
      tk,
      title: p.title,
      arxiv: p.externalIds?.ArXiv ?? null,
      doi: p.externalIds?.DOI?.toLowerCase() ?? null,
      s2: p.paperId,
      datasetDocument:
        (p.externalIds?.ArXiv && docByArxiv.get(p.externalIds.ArXiv)) ??
        docByTitle.get(tk) ??
        null,
      year: p.year,
      authors: (p.authors ?? []).map((a) => a.name),
      venue: p.venue || null,
      types: p.publicationTypes ?? null,
      count: near?.count ?? 0,
      citingTexts: near ? decorate(near).citingTexts : [],
      basis: 2,
      basis2: {
        index: 'Semantic Scholar',
        citationCount: p.citationCount,
        rank: rankNo,
        retrievedAt: b2.retrievedAt,
      },
    });
  }
  const out = {
    checkDate: CHECK_DATE,
    rule: {
      basis1: `Cited by at least ${THRESHOLD} distinct citing texts of the corpus (identifier or title match), on machine intelligence.`,
      threshold: THRESHOLD,
      nearMissBand: NEAR,
      basis2: {
        index: 'Semantic Scholar',
        query: b2.query,
        filters:
          'fieldsOfStudy=Computer Science; publicationTypes=JournalArticle,Conference; sort=citationCount:desc',
        cap: BASIS2_CAP,
        totalMatching: b2.total,
        retrievedAt: b2.retrievedAt,
      },
    },
    counts: {
      basis1: basis1.length,
      basis2: basis2.length,
      nearMisses: nearMisses.length,
      excluded: excluded.length,
    },
    papers: [...basis1, ...basis2].map((w) => ({ id: paperId(w), ...w })),
    nearMisses,
    excluded,
    basis2Skipped,
  };
  writeJson(join(DIR, 'selection.json'), out);
  console.log(JSON.stringify(out.counts));
}

// Basis-2 exclusions: a book, a software or dataset description, or a work not on machine learning.
const B2_EXCLUDE = {
  'scikit learn machine learning in python':
    'A software description (a library), not a paper on a method, model or finding.',
  'pytorch an imperative style high performance deep learning library':
    'A software description (a library).',
  'libsvm a library for support vector machines':
    'A software description (a library).',
  'tensorflow a system for large scale machine learning':
    'A software description (a system).',
  'reinforcement learning an introduction': 'A book (textbook), not a paper.',
  'pattern recognition and machine learning': 'A book (textbook), not a paper.',
  'neural networks for pattern recognition': 'A book (textbook), not a paper.',
  'statistical learning theory': 'A book, not a paper.',
  'collective dynamics of small world networks':
    'Network science; not on machine learning.',
  'mega11 molecular evolutionary genetics analysis version 11':
    'Software for molecular genetics; not on machine learning.',
  'an introduction to roc analysis':
    'A tutorial on an evaluation method in statistics, not a machine-learning method, model or finding.',
  'a survey on transfer learning':
    'A survey of a field, not a paper on a method, model or finding.',
  'deep learning in neural networks an overview': 'A survey of a field.',
  'physics informed neural networks a deep learning framework for solving forward and inverse problems involving nonlinear partial differential equations':
    'Applied mathematics (numerical methods for differential equations).',
  'highly accurate protein structure prediction with alphafold':
    'Structural biology; the index places it in Computer Science, but its subject is protein structure.',
  'deep learning':
    'Index anomaly: the record is a 2017 encyclopedia entry by two authors whose count (tens of thousands) cannot be its own; the index appears to have merged citations of another work.',
  'generative adversarial networks':
    'Index anomaly: the record is a 2021 conference paper whose count appears to merge citations of the 2014 paper of the same name; neither expression is admitted on this count.',
  'anfis adaptive network based fuzzy inference system':
    'Fuzzy systems; kept out under the rule as it is not a machine-learning method in the sense of the query terms.',
};
function basis2Exclusion(p) {
  return B2_EXCLUDE[tkey(p.title)] ?? null;
}

function paperId(w) {
  if (w.datasetDocument) return w.datasetDocument;
  const short = tkey(w.title)
    .split(' ')
    .filter(
      (x) =>
        ![
          'a',
          'an',
          'the',
          'of',
          'for',
          'and',
          'with',
          'in',
          'on',
          'to',
          'via',
          'is',
          'are',
        ].includes(x),
    )
    .slice(0, 5)
    .join('-');
  return `kp-${short}-${w.year ?? 'nd'}`;
}

main();
