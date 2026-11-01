// Key-papers pack tools: retrieval of the citing corpus and of candidate papers.
//   node research/key-papers/tools.mjs corpus                 -> corpus.json (dataset documents and the source read for each)
//   node research/key-papers/tools.mjs fetch-corpus [--retry]  retrieve every corpus source (cache: .local/key-papers/corpus)
//   node research/key-papers/tools.mjs fetch <key> <url>       one paper (cache: .local/key-papers/paper)
//   node research/key-papers/tools.mjs grep <key> <regex>      search a cached text (corpus or paper)
// Retrieval bodies stay in the ignored .local/key-papers/ cache; only hashes and locators are tracked.
import { execFile, execFileSync } from 'node:child_process';
import { promisify } from 'node:util';
const execFileP = promisify(execFile);
import { createHash } from 'node:crypto';
import {
  existsSync,
  mkdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { gunzipSync } from 'node:zlib';

export const DIR = dirname(fileURLToPath(import.meta.url));
export const ROOT = join(DIR, '..', '..');
export const CACHE = join(ROOT, '.local', 'key-papers');
const UA =
  process.env.KP_UA ||
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
export const sha256 = (b) => createHash('sha256').update(b).digest('hex');
export const readJson = (p) => JSON.parse(readFileSync(p, 'utf8'));
export const writeJson = (p, v) =>
  writeFileSync(p, JSON.stringify(v, null, 1) + '\n');

const last = new Map();
async function pace(host) {
  const gap = /archive\.org$|arxiv\.org$/.test(host) ? 6000 : 3000;
  const wait = (last.get(host) ?? 0) + gap - Date.now();
  if (wait > 0) await sleep(wait);
  last.set(host, Date.now());
}

const ENT = {
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
export function htmlToText(html) {
  return html
    .replace(/<(script|style|noscript)[\s\S]*?<\/\1>/gi, ' ')
    .replace(
      /<br\s*\/?>|<\/(p|div|li|h\d|blockquote|tr|td|th|dd|dt|pre)>/gi,
      '\n',
    )
    .replace(/<a\s[^>]*href="([^"]+)"[^>]*>/gi, ' [link: $1] ')
    .replace(/<[^>]+>/g, '')
    .replace(/&#x([0-9a-f]+);/gi, (_, h) =>
      String.fromCodePoint(parseInt(h, 16)),
    )
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(Number(d)))
    .replace(/&([a-z]+);/gi, (m, n) => ENT[n.toLowerCase()] ?? m)
    .replace(/[ \t]+/g, ' ')
    .replace(/\n\s*\n+/g, '\n\n');
}

// Normalisation for quote and title matching.
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
export const words = (s) => s.trim().split(/\s+/).filter(Boolean).length;

export function quoteFound(quote, text) {
  const frags = quote
    .split(/\s*(?:…|\.\.\.|\[…\])\s*/)
    .map(normalise)
    .filter(Boolean);
  for (const hay of [
    normalise(text),
    normalise(text.replace(/-\s*\n\s*/g, '-')),
  ]) {
    let from = 0;
    let ok = true;
    for (const f of frags) {
      const at = hay.indexOf(f, from);
      if (at < 0) {
        ok = false;
        break;
      }
      from = at + f.length;
    }
    if (ok) return true;
  }
  const bare = (x) => x.replace(/[-\s]/g, '');
  const hay = bare(normalise(text));
  let from = 0;
  for (const f of frags.map(bare)) {
    const at = hay.indexOf(f, from);
    if (at < 0) return false;
    from = at + f.length;
  }
  return true;
}

export function cachedText(kind, key) {
  const base = join(CACHE, kind, key);
  if (existsSync(base + '.txt')) return readFileSync(base + '.txt', 'utf8');
  if (existsSync(base + '.html')) {
    let buf = readFileSync(base + '.html');
    if (buf[0] === 0x1f && buf[1] === 0x8b) buf = gunzipSync(buf);
    return htmlToText(buf.toString('utf8'));
  }
  return null;
}
export const cachedMeta = (kind, key) =>
  existsSync(join(CACHE, kind, key + '.json'))
    ? readJson(join(CACHE, kind, key + '.json'))
    : null;

async function curl(url, out, extra = []) {
  const { stdout } = await execFileP(
    'curl',
    [
      '-sS',
      '-L',
      '--compressed',
      '-m',
      '120',
      '-A',
      UA,
      '-H',
      'Accept-Language: en,zh;q=0.8',
      ...extra,
      '-o',
      out,
      '-w',
      '%{http_code}\t%{url_effective}\t%{content_type}',
      url,
    ],
    { encoding: 'utf8' },
  );
  const r = stdout.split('\t');
  return { status: Number(r[0]), finalUrl: r[1], type: r[2] ?? '' };
}

// LessWrong and the Alignment Forum: the post body through the publisher's GraphQL API.
async function lessWrong(url, tmp) {
  const id = /posts\/([A-Za-z0-9]+)/.exec(url)?.[1];
  if (!id) return null;
  const host = new URL(url).host;
  const query = `{ post(input:{selector:{_id:"${id}"}}) { result { _id title postedAt contents { html } } } }`;
  await pace(host);
  const r = await curl(`https://${host}/graphql`, tmp, [
    '-H',
    'content-type: application/json',
    '-d',
    JSON.stringify({ query }),
  ]);
  const j = JSON.parse(readFileSync(tmp, 'utf8'));
  const p = j?.data?.post?.result;
  if (!p) return { ...r, status: 0 };
  writeFileSync(
    tmp,
    `<html><body><h1>${p.title}</h1><p>Posted: ${p.postedAt}</p>${p.contents?.html ?? ''}</body></html>`,
  );
  return { ...r, type: 'text/html', route: 'graphql' };
}

const dead = new Map();
export async function fetchDoc(kind, key, url) {
  const dir = join(CACHE, kind);
  mkdirSync(dir, { recursive: true });
  const tmp = join(dir, `${key}.download`);
  if (existsSync(tmp)) rmSync(tmp);
  const host = new URL(url).host;
  if ((dead.get(host) ?? 0) >= 3)
    return { status: 0, error: 'host unreachable in this run' };
  let r = { status: 0 };
  if (/lesswrong\.com|alignmentforum\.org/.test(host)) {
    try {
      r = (await lessWrong(url, tmp)) ?? r;
    } catch (e) {
      r = { status: 0, error: String(e.message).split('\n')[0] };
    }
  }
  if (!r.status)
    for (let i = 0; i < 3; i++) {
      await pace(host);
      try {
        r = await curl(url, tmp);
        r.route = 'direct';
        if (r.status && r.status < 500 && r.status !== 429) break;
      } catch (e) {
        r = {
          status: 0,
          error: (String(e.stderr ?? '') || String(e.message))
            .split('\n')[0]
            .replace(/-o \S+/g, ''),
        };
        if (/archive\.org$/.test(host)) break;
      }
      await sleep(8000 * (i + 1));
    }
  if (!r.status || !existsSync(tmp)) {
    dead.set(host, (dead.get(host) ?? 0) + 1);
    return { status: 0, error: r.error ?? 'no response' };
  }
  let buf = readFileSync(tmp);
  rmSync(tmp);
  if (buf[0] === 0x1f && buf[1] === 0x8b) buf = gunzipSync(buf);
  const isPdf = buf.subarray(0, 5).toString() === '%PDF-';
  for (const ext of ['pdf', 'html', 'txt'])
    if (existsSync(join(dir, `${key}.${ext}`)))
      rmSync(join(dir, `${key}.${ext}`));
  const raw = join(dir, `${key}.${isPdf ? 'pdf' : 'html'}`);
  writeFileSync(raw, buf);
  if (isPdf)
    try {
      execFileSync(
        'pdftotext',
        ['-enc', 'UTF-8', raw, join(dir, `${key}.txt`)],
        {
          stdio: 'ignore',
        },
      );
    } catch {
      /* damaged PDF: no text */
    }
  else if (
    !/<html|<body|<div|<p[ >]/i.test(buf.subarray(0, 5000).toString('utf8'))
  )
    writeFileSync(join(dir, `${key}.txt`), buf.toString('utf8'));
  const text = cachedText(kind, key) ?? '';
  const meta = {
    key,
    requestedUrl: url,
    finalUrl: r.finalUrl,
    route: r.route,
    httpStatus: r.status,
    contentType: r.type,
    bytes: buf.length,
    sha256: sha256(buf),
    words: words(text),
    retrievedAt: new Date().toISOString().slice(0, 10),
  };
  writeJson(join(dir, `${key}.json`), meta);
  return meta;
}

// The citing corpus: every dataset document with the sources recorded for it, plus
// paper and report sources not linked to a document record.
function corpus() {
  const ents = readJson(join(ROOT, 'data', 'entities.json'));
  const srcs = readJson(join(ROOT, 'data', 'sources.json'));
  const byId = new Map(srcs.map((s) => [s.id, s]));
  const out = [];
  const seen = new Set();
  for (const d of ents.filter((e) => e.type === 'document')) {
    const ids = [
      ...new Set([
        ...(d.sourceIds ?? []),
        ...srcs.filter((s) => s.documentId === d.id).map((s) => s.id),
      ]),
    ].filter((i) => byId.has(i));
    for (const i of ids) seen.add(i);
    out.push({
      document: d.id,
      name: d.name,
      subtype: d.subtype,
      sources: ids.map((i) => source(byId.get(i))),
    });
  }
  for (const s of srcs)
    if (!seen.has(s.id) && ['paper', 'report', 'book'].includes(s.kind))
      out.push({
        document: null,
        name: s.title,
        subtype: `unlinked source (${s.kind})`,
        sources: [source(s)],
      });
  writeJson(join(DIR, 'corpus.json'), out);
  console.log(
    `${out.length} corpus entries, ${out.reduce((n, d) => n + d.sources.length, 0)} sources`,
  );
}
function source(s) {
  const urls = [s.evidenceUrl, s.archivedUrl, s.canonicalUrl].filter(Boolean);
  // web.archive.org refuses connections from this environment: try live addresses first.
  urls.sort(
    (a, b) => /web\.archive\.org/.test(a) - /web\.archive\.org/.test(b),
  );
  return {
    id: s.id,
    title: s.title,
    date: s.publicationDate ?? null,
    kind: s.kind,
    urls: [...new Set(urls)],
  };
}

async function fetchCorpus(retry) {
  const c = readJson(join(DIR, 'corpus.json'));
  const logPath = join(CACHE, 'corpus-log.json');
  const log = existsSync(logPath) ? readJson(logPath) : {};
  const queues = new Map();
  for (const d of c)
    for (const s of d.sources) {
      if (log[s.id] && (log[s.id].ok || !retry)) continue;
      const host = s.urls[0] ? new URL(s.urls[0]).host : 'none';
      if (!queues.has(host)) queues.set(host, []);
      queues.get(host).push(s);
    }
  const work = async (list) => {
    for (const s of list) {
      const attempts = [];
      let ok = false;
      for (const url of s.urls) {
        const m = await fetchDoc('corpus', s.id, url);
        attempts.push({
          url,
          status: m.httpStatus ?? 0,
          error: m.error ?? null,
          words: m.words ?? 0,
        });
        if (m.httpStatus >= 200 && m.httpStatus < 400 && m.words > 30) {
          ok = true;
          break;
        }
      }
      log[s.id] = { ok, attempts };
      writeJson(logPath, log);
      console.log(
        `${s.id}: ${ok ? 'ok' : 'FAILED'} ${attempts.map((a) => a.status).join(',')}`,
      );
    }
  };
  await Promise.all([...queues.values()].map(work));
  writeJson(logPath, log);
}

function grep(key, pattern) {
  const t = cachedText('corpus', key) ?? cachedText('paper', key);
  if (t == null) return console.log('missing');
  const pages = t.split('\f');
  const re = new RegExp(pattern, 'gi');
  pages.forEach((p, i) => {
    const flat = p.replace(/\s+/g, ' ');
    let lastAt = -Infinity;
    for (const m of flat.matchAll(re)) {
      if (m.index - lastAt < 300) continue;
      lastAt = m.index;
      console.log(
        `[${key}${pages.length > 1 ? ` PDF p. ${i + 1}` : ''}] …${flat.slice(Math.max(0, m.index - 200), m.index + 300)}…\n`,
      );
    }
  });
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const [cmd, ...args] = process.argv.slice(2);
  if (cmd === 'corpus') corpus();
  else if (cmd === 'fetch-corpus') await fetchCorpus(args.includes('--retry'));
  else if (cmd === 'fetch')
    console.log(await fetchDoc('paper', args[0], args[1]));
  else if (cmd === 'grep') grep(args[0], args[1]);
  else if (cmd === 'text')
    console.log(
      cachedText('corpus', args[0]) ??
        cachedText('paper', args[0]) ??
        'missing',
    );
  else console.log('commands: corpus fetch-corpus fetch grep text');
}
