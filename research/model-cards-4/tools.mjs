// Candidate pack tooling for research/model-cards-4 (copied from research/model-cards-3/tools.mjs, itself from pack 2;
// same cache, quote matching and budgets).
// Usage: node research/model-cards-4/tools.mjs fetch <key> <url>
//        node research/model-cards-4/tools.mjs grep <key> <regex>
//        node research/model-cards-4/tools.mjs page <key> <n>
//        node research/model-cards-4/tools.mjs words <key>
//        node research/model-cards-4/tools.mjs check <draft.json>   (quotes of one draft)
//        node research/model-cards-4/tools.mjs merge | verify | render | brief
// Retrieval bodies stay in the ignored .local/model-cards/ cache.
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import {
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  rmSync,
  writeFileSync,
} from 'node:fs';
import { dirname, join } from 'node:path';
import { gunzipSync } from 'node:zlib';
import { fileURLToPath } from 'node:url';

const DIR = dirname(fileURLToPath(import.meta.url));
const ROOT = join(DIR, '..', '..');
const CACHE = join(ROOT, '.local', 'model-cards', 'doc');
const PACK = join(DIR, 'pack.json');
const UA =
  process.env.FL_UA ||
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36';

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
  for (let attempt = 0; attempt < 3; attempt++) {
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
          '-H',
          'Accept-Language: en,zh;q=0.8',
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
    await sleep(10000 * (attempt + 1));
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
  else if (existsSync(join(CACHE, `${key}.txt`)))
    rmSync(join(CACHE, `${key}.txt`));
  const meta = {
    key,
    requestedUrl: url.split('?')[0],
    finalUrl: finalUrl.split('?')[0],
    httpStatus: status,
    contentType: type,
    bytes: buf.length,
    sha256: sha256(buf),
    retrievedAt: new Date().toISOString(),
  };
  writeFileSync(join(CACHE, `${key}.json`), JSON.stringify(meta, null, 2));
  const text = cachedText(key) ?? '';
  console.log(
    `${key}: HTTP ${status}, ${buf.length} bytes, ${isPdf ? 'pdf' : 'html'}, ${words(text)} words of text`,
  );
  await sleep(8000);
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
  sect: '§',
};
function htmlToText(html) {
  return html
    .replace(/<(script|style|noscript)[\s\S]*?<\/\1>/gi, ' ')
    .replace(/<br\s*\/?>|<\/(p|div|li|h\d|blockquote|tr|td|th|dd|dt)>/gi, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&#x([0-9a-f]+);/gi, (_, h) =>
      String.fromCodePoint(parseInt(h, 16)),
    )
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(Number(d)))
    .replace(/&([a-z]+);/gi, (m, n) => ENTITIES[n.toLowerCase()] ?? m)
    .replace(/[ \t]+/g, ' ')
    .replace(/\n\s*\n+/g, '\n\n');
}
// Normalisation for quote matching: Unicode compatibility forms, quotes, dashes,
// PDF line-break hyphenation and whitespace.
export function normalise(text) {
  return text
    .normalize('NFKC')
    .replace(/[\u00ad\u200b-\u200f\u202a-\u202e\u2060-\u2064\ufeff]/g, '')
    .replace(/[‘’‛′`]/g, "'")
    .replace(/[“”‟″]/g, '"')
    .replace(/[‐‑‒–—−]/g, '-')
    .replace(/…/g, '...')
    .replace(/(\w)-\s*\n\s*(\w)/g, '$1$2')
    .replace(/\s+/g, ' ')
    .replace(/ ([,.;:)])/g, '$1')
    .replace(/\( /g, '(')
    .trim()
    .toLowerCase();
}
// Chinese text: also drop all whitespace, since PDF and HTML layers break lines mid-phrase.
const normaliseCjk = (t) => normalise(t).replace(/\s+/g, '');
const isCjk = (s) => /[㐀-鿿]/.test(s);

export function cachedText(key) {
  const base = join(CACHE, key);
  if (existsSync(base + '.txt')) return readFileSync(base + '.txt', 'utf8');
  if (existsSync(base + '.html')) {
    let buf = readFileSync(base + '.html');
    if (buf[0] === 0x1f && buf[1] === 0x8b) buf = gunzipSync(buf);
    let markup = buf.toString('utf8');
    // XML records (California CAML): separate adjacent elements so that
    // structured fields such as an action and its date do not run together.
    if (markup.startsWith('<?xml')) markup = markup.replace(/>\s*</g, '> <');
    return htmlToText(markup);
  }
  return null;
}
export const words = (s) =>
  isCjk(s)
    ? (s.match(/[㐀-鿿]/g) ?? []).length
    : s.trim().split(/\s+/).filter(Boolean).length;

export function quoteFound(quote, text) {
  const norm = isCjk(quote) ? normaliseCjk : normalise;
  const hays = [norm(text), norm(text.replace(/-\s*\n\s*/g, '-'))];
  const frags = quote
    .split(/\s*(?:…|\.\.\.|\[…\])\s*/)
    .map(norm)
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
  // A printed hyphen at a PDF line break can be lost in the text layer
  // ("General-\nPurpose" -> "GeneralPurpose"): compare without hyphens as a last resort.
  const bare = (x) => x.replace(/-/g, '');
  const hay = bare(hays[0]);
  let from = 0;
  for (const frag of frags.map(bare)) {
    const at = hay.indexOf(frag, from);
    if (at < 0) return missing;
    from = at + frag.length;
  }
  return true;
}

function pages(key) {
  const t = cachedText(key);
  if (t == null) return null;
  return t.split('\f');
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
      const where = ps.length > 1 ? ` PDF p. ${i + 1}` : '';
      console.log(
        `[${key}${where}] …${flat.slice(Math.max(0, m.index - 250), m.index + 350)}…\n`,
      );
    }
  });
}

// Which PDF page holds a quote (null for HTML).
function quotePage(quote, key) {
  const ps = pages(key);
  if (!ps || ps.length < 2) return null;
  const frags = quote.split(/\s*(?:…|\.\.\.|\[…\])\s*/).filter(Boolean);
  for (let i = 0; i < ps.length; i++)
    if (quoteFound(frags[0], ps[i]) === true) return i + 1;
  return 0;
}

const DRAFTS = join(DIR, 'drafts');
function loadDrafts() {
  return readdirSync(DRAFTS)
    .filter((f) => f.endsWith('.json') && !f.startsWith('sources-'))
    .sort()
    .map((f) => ({ file: f, ...readJson(join(DRAFTS, f)) }));
}

// Checks quotes and per-source budgets. Returns { problems, perSource, perQuote }.
function rawPdfText(key) {
  const pdf = join(CACHE, `${key}.pdf`);
  if (!existsSync(pdf)) return null;
  try {
    return execFileSync('pdftotext', ['-raw', '-enc', 'UTF-8', pdf, '-'], {
      encoding: 'utf8',
      maxBuffer: 1 << 28,
    });
  } catch {
    return null;
  }
}
export function checkQuotes(claims, sources, datasetWords = {}) {
  const problems = [];
  const perQuote = [];
  const quotedBySource = new Map();
  const srcByKey = new Map(sources.map((s) => [s.key, s]));
  for (const c of claims)
    for (const [i, e] of (c.evidence ?? []).entries()) {
      const tag = `${c.id} ev${i + 1}`;
      const src = srcByKey.get(e.source);
      if (!src) {
        problems.push(`${tag}: unknown source ${e.source}`);
        continue;
      }
      if (!e.locator) problems.push(`${tag}: no locator`);
      if (e.passageType !== 'quote') continue;
      const w = words(e.passage);
      const cjk = isCjk(e.passage);
      if ((!cjk && w > 50) || (cjk && w > 100))
        problems.push(`${tag}: quote of ${w} words`);
      const text = src.cacheKey ? cachedText(src.cacheKey) : null;
      let found = null;
      let page = null;
      let layer = null;
      if (text == null) {
        problems.push(`${tag}: no cached text for ${e.source}`);
      } else {
        found = quoteFound(e.passage, text);
        // Some PDFs interleave a line's words in the default text layer (GPT-4o's
        // reference [4]); retry against pdftotext's raw reading order, and say so.
        const raw = found === true ? null : rawPdfText(src.cacheKey);
        if (raw != null && quoteFound(e.passage, raw) === true) {
          found = true;
          layer = 'pdftotext -raw';
        }
        if (found !== true) problems.push(`${tag}: not found: «${found}»`);
        page = layer
          ? raw
              .split('\f')
              .findIndex((pg) => quoteFound(e.passage, pg) === true) + 1
          : quotePage(e.passage, src.cacheKey);
      }
      perQuote.push({
        claim: c.id,
        evidence: i + 1,
        source: e.source,
        words: w,
        found: found === true,
        ...(layer ? { textLayer: layer } : {}),
        pdfPage: page,
      });
      const set = quotedBySource.get(e.source) ?? new Set();
      set.add(normalise(e.passage));
      quotedBySource.set(e.source, set);
    }
  const perSource = {};
  for (const [key, set] of quotedBySource) {
    const src = srcByKey.get(key);
    const prior = new Set(
      [src.datasetSource, ...(src.sharedBudgetWith ?? [])]
        .filter(Boolean)
        .flatMap((id) => [...(datasetWords[id] ?? [])]),
    );
    // A pack quote already contained in a dataset quote of the same source adds nothing.
    const added = [...set].filter(
      (q) => ![...prior].some((d) => d.includes(q)),
    );
    const total = added.reduce((n, q) => n + words(q), 0);
    const priorWords = [...prior].reduce((n, q) => n + words(q), 0);
    const doc = src.documentWords?.count ?? null;
    let limit = null;
    if (doc != null)
      limit =
        doc >= 2000
          ? Math.min(800, Math.max(400, Math.floor(doc * 0.05)))
          : Math.max(25, Math.floor(doc * 0.1));
    perSource[key] = {
      quotedNew: total,
      datasetQuoted: priorWords,
      documentWords: doc,
      limit,
    };
    if (doc == null) problems.push(`${key}: documentWords missing`);
    else if (total + priorWords > limit)
      problems.push(
        `${key}: ${total}+${priorWords} quoted words over limit ${limit}`,
      );
  }
  return { problems, perSource, perQuote };
}

function datasetQuotedWords() {
  const ev = readJson(join(ROOT, 'data', 'evidence.json'));
  const by = new Map();
  for (const e of ev) {
    if (e.passageType !== 'quote' || !e.passage) continue;
    const set = by.get(e.sourceId) ?? new Set();
    set.add(normalise(e.passage));
    by.set(e.sourceId, set);
  }
  return Object.fromEntries(by);
}

// Draft cells (FORMAT.md) as claims with evidence, for checkQuotes.
export function cellsAsClaims(cells) {
  return cells.map((c) => ({
    id: `${c.card}:${c.question}`,
    evidence: (c.passages ?? []).map((p) => ({
      source: p.source,
      locator: p.locator,
      passage: p.quote,
      passageType: 'quote',
    })),
  }));
}
// Source registries: one file per drafting group, drafts/sources-<group>.json.
const SOURCES_DIR = join(DIR, 'drafts');
export function loadSources() {
  return readdirSync(SOURCES_DIR)
    .filter((f) => /^sources-.*\.json$/.test(f))
    .sort()
    .flatMap((f) => readJson(join(SOURCES_DIR, f)));
}

const cmd = process.argv[2];
const args = process.argv.slice(3);
if (cmd === 'fetch') await fetchDoc(args[0], args[1]);
else if (cmd === 'grep') grep(args[0], args[1]);
else if (cmd === 'page')
  console.log(pages(args[0])?.[Number(args[1]) - 1] ?? 'missing');
else if (cmd === 'text') console.log(cachedText(args[0]) ?? 'missing');
else if (cmd === 'words') console.log(words(cachedText(args[0]) ?? ''));
else if (cmd === 'dsquotes') {
  const src = loadSources().find((s) => s.key === args[0]);
  const ev = readJson(join(ROOT, 'data', 'evidence.json'));
  const ids = [src.datasetSource, ...(src.sharedBudgetWith ?? [])];
  for (const e of ev)
    if (ids.includes(e.sourceId) && e.passageType === 'quote')
      console.log(`- ${e.claimId} | ${e.locator} | ${e.passage}`);
} else if (cmd === 'checkcells') {
  const d = readJson(args[0]);
  const r = checkQuotes(
    cellsAsClaims(d.cells ?? []),
    loadSources(),
    datasetQuotedWords(),
  );
  console.log(r.problems.length ? r.problems.join('\n') : 'no problems');
  for (const [k, v] of Object.entries(r.perSource))
    console.log(
      `${k}: new ${v.quotedNew} + dataset ${v.datasetQuoted} of limit ${v.limit}`,
    );
} else if (cmd === 'none') {
  // imported as a module
} else if (cmd === 'check') {
  const d = readJson(args[0]);
  const r = checkQuotes(d.claims ?? [], d.sources ?? [], datasetQuotedWords());
  console.log(r.problems.length ? r.problems.join('\n') : 'no problems');
  console.log(JSON.stringify(r.perSource, null, 1));
} else if (['merge', 'verify', 'render', 'brief'].includes(cmd)) {
  const mod = await import('./build.mjs');
  await mod[cmd]({
    loadDrafts,
    checkQuotes,
    cachedText,
    quoteFound,
    datasetQuotedWords,
    rawPdfText,
    readJson,
    PACK,
    DIR,
    ROOT,
    args,
  });
} else
  console.log(
    'commands: fetch grep page text words check merge verify render brief',
  );
