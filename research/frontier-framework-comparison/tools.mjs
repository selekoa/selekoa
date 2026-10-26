// Candidate pack tooling for research/frontier-framework-comparison.
// Usage: node research/frontier-framework-comparison/tools.mjs fetch <key> <url>
//        node research/frontier-framework-comparison/tools.mjs verify | render | grep <key> <regex>
// Retrieval bodies stay in the ignored .local/economics-growth/ cache.
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import {
  existsSync,
  mkdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from 'node:fs';
import { dirname, join } from 'node:path';
import { gunzipSync } from 'node:zlib';
import { fileURLToPath } from 'node:url';

const DIR = dirname(fileURLToPath(import.meta.url));
const ROOT = join(DIR, '..', '..');
const CACHE = join(ROOT, '.local', 'frontier-framework-comparison', 'doc');
const PACK = join(DIR, 'pack.json');
const UA = 'Mozilla/5.0 (compatible; selekoa-research; paced retrieval)';

const sha256 = (buf) => createHash('sha256').update(buf).digest('hex');
const readJson = (p) => JSON.parse(readFileSync(p, 'utf8'));
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// Retrieval uses curl: it honours the session's HTTPS proxy, which Node's fetch does not.
async function fetchDoc(key, url) {
  mkdirSync(CACHE, { recursive: true });
  const tmp = join(CACHE, `${key}.download`);
  let status = 0;
  let finalUrl = url;
  let type = '';
  for (let attempt = 0; attempt < 5; attempt++) {
    try {
      const out = execFileSync(
        'curl',
        [
          '-sS',
          '-L',
          '--compressed',
          '-m',
          '180',
          '-A',
          UA,
          '-o',
          tmp,
          '-w',
          '%{http_code}\t%{url_effective}\t%{content_type}',
          url,
        ],
        { encoding: 'utf8' },
      );
      [status, finalUrl, type] = out.split('\t');
      status = Number(status);
      if (status !== 429 && status < 500 && status !== 0) break;
    } catch (e) {
      console.log(`attempt ${attempt + 1} failed: ${e.message.split('\n')[0]}`);
    }
    await sleep(20000 * (attempt + 1));
  }
  if (!existsSync(tmp)) throw new Error(`no response: ${url}`);
  const buf = readFileSync(tmp);
  const isPdf =
    type.includes('pdf') || buf.subarray(0, 5).toString() === '%PDF-';
  const raw = join(CACHE, `${key}.${isPdf ? 'pdf' : 'html'}`);
  writeFileSync(raw, buf);
  rmSync(tmp);
  if (isPdf)
    try {
      execFileSync(
        'pdftotext',
        ['-enc', 'UTF-8', raw, join(CACHE, `${key}.txt`)],
        { stdio: 'ignore' },
      );
    } catch {
      console.log(`${key}: pdftotext failed (damaged or truncated PDF)`);
    }
  const capture = /web\.archive\.org\/web\/(\d{14})/.exec(finalUrl)?.[1];
  writeFileSync(
    join(CACHE, `${key}.json`),
    JSON.stringify(
      {
        key,
        requestedUrl: url,
        finalUrl,
        waybackCapture: capture ?? null,
        httpStatus: status,
        contentType: type,
        bytes: buf.length,
        sha256: sha256(buf),
        retrievedAt: new Date().toISOString(),
      },
      null,
      2,
    ),
  );
  console.log(
    `${key}: HTTP ${status}, ${buf.length} bytes, ${isPdf ? 'pdf' : 'html'}, capture ${capture ?? '-'}`,
  );
}

const ENTITIES = {
  amp: '&',
  lt: '<',
  gt: '>',
  quot: '"',
  apos: "'",
  nbsp: ' ',
  mdash: '—',
  ndash: '–',
  hellip: '…',
  rsquo: '’',
  lsquo: '‘',
  rdquo: '”',
  ldquo: '“',
};
function htmlToText(html) {
  return html
    .replace(/<(script|style)[\s\S]*?<\/\1>/gi, ' ')
    .replace(/<br\s*\/?>|<\/(p|div|li|h\d|blockquote|tr)>/gi, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&#x([0-9a-f]+);/gi, (_, h) =>
      String.fromCodePoint(parseInt(h, 16)),
    )
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(Number(d)))
    .replace(/&([a-z]+);/gi, (m, n) => ENTITIES[n.toLowerCase()] ?? m);
}
// Normalisation for quote matching: Unicode compatibility forms (PDF ligatures),
// quotes, dashes, PDF line-break hyphenation and whitespace.
function normalise(text) {
  return (
    text
      .normalize('NFKC')
      // Invisible bidi and zero-width controls that some PDF text layers carry.
      .replace(/[\u200b-\u200f\u202a-\u202e\u2060-\u2064\ufeff]/g, '')
      .replace(/[‘’‛′]/g, "'")
      .replace(/[“”‟″]/g, '"')
      .replace(/[–—−]/g, '-')
      .replace(/…/g, '...')
      .replace(/(\w)-\s*\n\s*(\w)/g, '$1$2') // soft hyphen at a PDF line break
      .replace(/\s+/g, ' ')
      // Split text runs can leave a space before punctuation.
      .replace(/ ([,.;:)])/g, '$1')
      .trim()
      .toLowerCase()
  );
}
function cachedText(key) {
  const base = join(CACHE, key);
  if (existsSync(base + '.txt')) return readFileSync(base + '.txt', 'utf8');
  if (existsSync(base + '.html')) {
    // Wayback id_ captures can keep the original gzip transfer encoding.
    let buf = readFileSync(base + '.html');
    if (buf[0] === 0x1f && buf[1] === 0x8b) buf = gunzipSync(buf);
    return htmlToText(buf.toString('utf8'));
  }
  return null;
}
const words = (s) => s.trim().split(/\s+/).filter(Boolean).length;

function quoteFound(quote, text) {
  // A hyphen at a PDF line break may be soft or part of a compound: try both.
  const hays = [normalise(text), normalise(text.replace(/-\s*\n\s*/g, '-'))];
  const frags = quote
    .split(/\s*(?:…|\.\.\.)\s*/)
    .map(normalise)
    .filter(Boolean);
  let missing = frags[0];
  for (const hay of hays) {
    let from = 0;
    missing = null;
    for (const frag of frags) {
      const at = hay.indexOf(frag, from);
      if (at < 0) {
        missing = frag;
        break;
      }
      from = at + frag.length;
    }
    if (!missing) return true;
  }
  return missing;
}

// pdftotext separates pages with form feeds; returns [text, pageStarts].
function pages(key) {
  const t = cachedText(key);
  if (t == null) return null;
  return t.split('\f');
}
// PDF pages (1-based) on which the first and last fragment of a quote occur.
function quotePages(quote, key) {
  const ps = pages(key);
  if (!ps) return null;
  const frags = quote.split(/\s*(?:…|\.\.\.)\s*/).filter(Boolean);
  const on = (frag) => {
    const hit = [];
    ps.forEach((p, i) => {
      if (quoteFound(frag, p) === true) hit.push(i + 1);
    });
    return hit;
  };
  const first = on(frags[0]);
  const last = on(frags[frags.length - 1]);
  if (first.length && last.length) return [first[0], last[last.length - 1]];
  // A quote may cross a page break: try consecutive page pairs.
  for (let i = 0; i + 1 < ps.length; i++)
    if (quoteFound(quote, ps[i] + '\n' + ps[i + 1]) === true)
      return [i + 1, i + 2];
  return [];
}

function grep(key, pattern) {
  const ps = pages(key);
  if (!ps) return console.log('missing');
  const re = new RegExp(pattern, 'gi');
  ps.forEach((p, i) => {
    const flat = p.replace(/\s+/g, ' ');
    let last = -Infinity;
    for (const m of flat.matchAll(re)) {
      if (m.index - last < 400) continue;
      last = m.index;
      console.log(
        `[${key} PDF p. ${i + 1}] …${flat.slice(Math.max(0, m.index - 200), m.index + 300)}…\n`,
      );
    }
  });
}

function showPage(key, n) {
  const ps = pages(key);
  console.log(ps ? ps[Number(n) - 1] : 'missing');
}

const readJsonFile = (p) => JSON.parse(readFileSync(p, 'utf8'));
const FACET_IDS = () =>
  new Set(
    readJson(PACK).dimensions.flatMap((d) =>
      d.facets.map((f) => `${d.id}.${f.id}`),
    ),
  );
const STATUSES = [
  'stated',
  'not-found',
  'not-applicable',
  'carried-unverified',
];

// Checks cells (a draft file or pack.json): quotes, words, pages, required fields.
function checkCells(cells, editions) {
  const problems = [];
  const results = {};
  const quoted = new Map();
  const facets = FACET_IDS();
  const seen = new Set();
  for (const c of cells) {
    const id = `${c.edition}.${c.facet}`;
    if (seen.has(id)) problems.push(`${id}: duplicate cell`);
    seen.add(id);
    const ed = editions.get(c.edition);
    if (!ed) {
      problems.push(`${id}: unknown edition`);
      continue;
    }
    if (!facets.has(c.facet)) problems.push(`${id}: unknown facet`);
    if (!STATUSES.includes(c.status))
      problems.push(`${id}: bad status ${c.status}`);
    const entries = c.entries ?? [];
    if (['stated', 'carried-unverified'].includes(c.status) && !entries.length)
      problems.push(`${id}: ${c.status} without entries`);
    if (c.status === 'not-found') {
      if (entries.length) problems.push(`${id}: not-found with entries`);
      const nf = c.notFound ?? {};
      if (!nf.inspected || !nf.searchTerms?.length)
        problems.push(`${id}: not-found needs inspected and searchTerms`);
    }
    if (c.status === 'not-applicable' && !c.reason)
      problems.push(`${id}: not-applicable needs reason`);
    for (const e of entries) {
      const where = `${id}/${e.id}`;
      for (const f of ['id', 'quote', 'locator'])
        if (!e[f]) problems.push(`${where}: missing ${f}`);
      if (!e.quote) continue;
      const n = words(e.quote);
      if (n > 50) problems.push(`${where}: quote has ${n} words (max 50)`);
      const q = quoted.get(c.edition) ?? new Map();
      q.set(normalise(e.quote), n);
      quoted.set(c.edition, q);
      const r = { words: n };
      if (c.status === 'carried-unverified') {
        r.match = 'not retrieved';
        results[e.id] = r;
        continue;
      }
      const text = cachedText(ed.cacheKey);
      if (text == null) {
        r.match = 'not cached';
        problems.push(`${where}: ${ed.cacheKey} not cached`);
      } else {
        const found = quoteFound(e.quote, text);
        r.match = found === true ? 'match' : 'absent';
        if (found !== true)
          problems.push(
            `${where}: fragment not found: "${found.slice(0, 70)}"`,
          );
        else {
          const pp = quotePages(e.quote, ed.cacheKey);
          r.pdfPages = pp;
          const m = /PDF pp?\. (\d+)(?:[–-](\d+))?/.exec(e.locator);
          if (pp?.length && m) {
            const lo = Number(m[1]);
            const hi = Number(m[2] ?? m[1]);
            if (pp[0] < lo || pp[1] > hi)
              problems.push(
                `${where}: locator says PDF p. ${lo}${hi !== lo ? '–' + hi : ''}, quote found on ${pp.join('–')}`,
              );
          } else if (pp?.length && !m)
            problems.push(`${where}: locator lacks "PDF p. N"`);
        }
      }
      results[e.id] = r;
    }
  }
  const totals = {};
  for (const [ed, q] of quoted) {
    const n = [...q.values()].reduce((a, b) => a + b, 0);
    totals[ed] = n;
    const words_ = editions.get(ed).documentWords?.count ?? 9999;
    const cap = words_ < 2000 ? Math.floor(words_ * 0.1) : 400;
    if (n > cap) problems.push(`${ed}: ${n} quoted words exceed cap ${cap}`);
  }
  return { problems, results, totals };
}

function editionsMap() {
  return new Map(readJson(PACK).editions.map((e) => [e.id, e]));
}

function checkDraft(file) {
  const cells = readJsonFile(file).cells;
  const { problems, results, totals } = checkCells(cells, editionsMap());
  const n = Object.keys(results).length;
  console.log(
    `${cells.length} cells, ${n} quotes; quoted words per edition: ${JSON.stringify(totals)}`,
  );
  console.log(problems.length ? problems.join('\n') : 'no problems');
}

// Distinct quoted words per edition: the words of the edition's text covered by at least one
// quotation, so overlapping or repeated quotations count once. Quotations that cannot be
// located (edition not cached) are counted by their length.
function coverage(key, quotes) {
  const text = cachedText(key);
  if (text == null) return quotes.reduce((n, q) => n + words(q), 0);
  const hay = normalise(text);
  const starts = [];
  for (const m of hay.matchAll(/\S+/g)) starts.push(m.index);
  const covered = new Set();
  let unlocated = 0;
  for (const q of quotes) {
    const frags = q
      .split(/\s*(?:…|\.\.\.)\s*/)
      .map(normalise)
      .filter(Boolean);
    let from = 0;
    for (const frag of frags) {
      const at = hay.indexOf(frag, from);
      if (at < 0) {
        unlocated += words(frag);
        continue;
      }
      from = at + frag.length;
      starts.forEach((st, i) => {
        if (st >= at && st < at + frag.length) covered.add(i);
      });
    }
  }
  return covered.size + unlocated;
}

// Quoted words in this pack, in the dataset, and in both together, for each edition.
function datasetWords(pack) {
  const ev = readJson(join(ROOT, 'data', 'evidence.json'));
  const out = {};
  for (const ed of pack.editions) {
    const dataQuotes = ev
      .filter((e) => e.sourceId === ed.dataSource && e.passageType === 'quote')
      .map((e) => e.passage);
    const packQuotes = pack.cells
      .filter((c) => c.edition === ed.id)
      .flatMap((c) => c.entries ?? [])
      .map((e) => e.quote);
    out[ed.id] = {
      pack: coverage(ed.cacheKey, packQuotes),
      dataset: coverage(ed.cacheKey, dataQuotes),
      union: coverage(ed.cacheKey, [...dataQuotes, ...packQuotes]),
    };
  }
  return out;
}

function verify() {
  const pack = readJson(PACK);
  const editions = new Map(pack.editions.map((e) => [e.id, e]));
  const { problems, results, totals } = checkCells(pack.cells, editions);
  // Every edition has exactly one cell per facet.
  for (const ed of pack.editions)
    for (const f of FACET_IDS())
      if (!pack.cells.some((c) => c.edition === ed.id && c.facet === f))
        problems.push(`${ed.id}.${f}: missing cell`);
  for (const ed of pack.editions) {
    const meta = join(CACHE, `${ed.cacheKey}.json`);
    if (ed.retrieval && existsSync(meta)) {
      const m = readJson(meta);
      if (m.sha256 !== ed.retrieval.sha256)
        problems.push(
          `${ed.id}: cached ${ed.cacheKey} sha256 differs from the recorded retrieval`,
        );
    }
  }
  const union = datasetWords(pack);
  const overUnion = Object.entries(union)
    .filter(([, u]) => u.union > 400)
    .map(
      ([id, u]) =>
        `${id}: pack ${u.pack} + dataset ${u.dataset} distinct quoted words = ${u.union} (over 400 if admitted)`,
    );
  writeFileSync(
    join(DIR, 'verification.json'),
    JSON.stringify(
      {
        checkedWith: 'research/frontier-framework-comparison/tools.mjs verify',
        note: 'Each quote is matched against the cached copy of its edition retrieved from the publisher on the recorded date (normalised for whitespace, quotes, dashes, Unicode compatibility forms, invisible bidi and zero-width characters, a space before punctuation and PDF line-break hyphenation; … separates fragments that must occur in order). pdfPages are the PDF pages of the pdftotext layer on which the quote occurs; each locator is checked against them. carried-unverified quotes were not re-checked in this run because the edition could not be retrieved.',
        problems,
        quotedWordsPerEdition: totals,
        quotedWordsWithDataset: union,
        overCapIfAdmitted: overUnion,
        quotes: results,
      },
      null,
      1,
    ) + '\n',
  );
  const n = Object.keys(results).length;
  console.log(
    `${pack.editions.length} editions, ${pack.cells.length} cells, ${n} quotes`,
  );
  if (overUnion.length) console.log('if admitted:\n' + overUnion.join('\n'));
  if (problems.length) {
    console.log(problems.join('\n'));
    process.exitCode = 1;
  } else
    console.log(
      'all quotes match their editions; locators, caps and cells complete',
    );
}

const [cmd, ...args] = process.argv.slice(2);
if (cmd === 'fetch') await fetchDoc(args[0], args[1]);
else if (cmd === 'grep') grep(args[0], args[1]);
else if (cmd === 'retext')
  // Re-extract a cached PDF with a pdftotext mode (e.g. raw) when the default layout splits words.
  execFileSync('pdftotext', [
    '-enc',
    'UTF-8',
    `-${args[1]}`,
    join(CACHE, `${args[0]}.pdf`),
    join(CACHE, `${args[0]}.txt`),
  ]);
else if (cmd === 'page') showPage(args[0], args[1]);
else if (cmd === 'check') checkDraft(args[0]);
else if (cmd === 'verify') verify();
else if (cmd === 'render')
  (await import('./render.mjs')).render(readJson(PACK), DIR);
else if (cmd === 'crosscheck')
  (await import('./crosscheck.mjs')).crosscheck(readJson(PACK), DIR, args[0]);
else if (cmd === 'meta')
  console.log(readFileSync(join(CACHE, `${args[0]}.json`), 'utf8'));
else
  console.log(
    'commands: fetch <key> <url> | grep <key> <re> | page <key> <n> | check <draft.json> | verify | render | crosscheck <date> | meta <key>',
  );
