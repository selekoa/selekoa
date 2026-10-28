// Author-person pack tools.
//   node research/author-persons/tools.mjs fetch [--retry]   retrieve each selected source (cache: .local/author-persons)
//   node research/author-persons/tools.mjs verify            find each credited name in the retrieved text
// Retrieval bodies stay in the ignored .local/ cache; only hashes and matches are tracked.
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import {
  existsSync,
  mkdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from 'node:fs';
import { join } from 'node:path';
import { gunzipSync } from 'node:zlib';

const ROOT = new URL('../..', import.meta.url).pathname;
const DIR = join(ROOT, 'research', 'author-persons');
const CACHE = join(ROOT, '.local', 'author-persons');
mkdirSync(CACHE, { recursive: true });
const UA = 'selekoa-research/0.1 (private research; paced requests)';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const sha256 = (b) => createHash('sha256').update(b).digest('hex');
const readJson = (p) => JSON.parse(readFileSync(p, 'utf8'));
const writeJson = (p, v) => writeFileSync(p, JSON.stringify(v, null, 1) + '\n');

const last = new Map();
async function pace(host) {
  const gap = /archive\.org$/.test(host) ? 8000 : 4000;
  const t = last.get(host) ?? 0;
  const wait = t + gap - Date.now();
  if (wait > 0) await sleep(wait);
  last.set(host, Date.now());
}

function curl(url, out) {
  const args = [
    '-sS',
    '-L',
    '--max-time',
    '90',
    '-A',
    UA,
    '-o',
    out,
    '-w',
    '%{http_code} %{content_type} %{url_effective}',
    url,
  ];
  const r = execFileSync('curl', args, { encoding: 'utf8' }).trim().split(' ');
  return {
    status: Number(r[0]),
    type: r[1] ?? '',
    finalUrl: r.slice(2).join(' '),
  };
}

export function htmlToText(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/(p|div|li|h\d|tr|pre)>/gi, '\n')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&#x27;|&rsquo;/g, '’'.length ? "'" : "'")
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/[ \t]+/g, ' ')
    .replace(/\n\s*\n+/g, '\n');
}

// LessWrong and the Alignment Forum: the post's author metadata through the GraphQL API.
async function lessWrong(url) {
  const id = /posts\/([A-Za-z0-9]+)/.exec(url)?.[1];
  if (!id) return null;
  const host = new URL(url).host;
  const api = `https://${host}/graphql`;
  const query = `{ post(input:{selector:{_id:"${id}"}}) { result { _id title postedAt user { displayName username } coauthors { displayName username } } } }`;
  await pace(host);
  const out = join(CACHE, 'tmp.json');
  execFileSync('curl', [
    '-sS',
    '--max-time',
    '60',
    '-A',
    UA,
    '-H',
    'content-type: application/json',
    '-d',
    JSON.stringify({ query }),
    '-o',
    out,
    api,
  ]);
  const buf = readFileSync(out);
  const j = JSON.parse(buf.toString('utf8'));
  const p = j?.data?.post?.result;
  if (!p) return { status: 0, buf, text: '' };
  const names = [p.user, ...(p.coauthors ?? [])]
    .filter(Boolean)
    .map((u) => u.displayName);
  return {
    status: 200,
    buf,
    route: 'lesswrong_graphql',
    finalUrl: api,
    text: `${p.title}\nAuthors (post data): ${names.join(', ')}\nPosted: ${p.postedAt}\n`,
  };
}

// curl's own message only; the command line would carry local paths.
const cleanError = (e) =>
  (String(e.stderr ?? '').trim() || String(e.message))
    .split('\n')[0]
    .replaceAll(ROOT, '')
    .replace(/-o \S+/g, '-o <cache>');
const deadHosts = new Map();
async function retrieve(key, url) {
  const host = new URL(url).host;
  if ((deadHosts.get(host) ?? 0) >= 2)
    return { status: 0, error: 'host unreachable in this run', text: '' };
  if (/lesswrong\.com|alignmentforum\.org/.test(url)) {
    const r = await lessWrong(url);
    if (r) return r;
  }
  const tmp = join(CACHE, `${key}.download`);
  let r = { status: 0 };
  if (existsSync(tmp)) rmSync(tmp);
  for (let i = 0; i < 3; i++) {
    await pace(new URL(url).host);
    try {
      r = curl(url, tmp);
      if (r.status && r.status < 500 && r.status !== 429) break;
    } catch (e) {
      r = { status: 0, error: cleanError(e) };
    }
    if (!r.status && /archive\.org$/.test(host)) break;
    await sleep(10000 * (i + 1));
  }
  if (!existsSync(tmp) || !r.status) {
    deadHosts.set(host, (deadHosts.get(host) ?? 0) + 1);
    return { status: 0, error: r.error ?? 'no response', text: '' };
  }
  let buf = readFileSync(tmp);
  if (buf[0] === 0x1f && buf[1] === 0x8b) buf = gunzipSync(buf);
  const isPdf = buf.subarray(0, 5).toString() === '%PDF-';
  let text;
  if (isPdf) {
    const pdf = join(CACHE, `${key}.pdf`);
    writeFileSync(pdf, buf);
    try {
      execFileSync(
        'pdftotext',
        ['-enc', 'UTF-8', '-l', '3', pdf, join(CACHE, `${key}.p1-3.txt`)],
        { stdio: 'ignore' },
      );
      text = readFileSync(join(CACHE, `${key}.p1-3.txt`), 'utf8');
    } catch {
      text = '';
    }
  } else {
    const s = buf.toString('utf8');
    text = /<html|<body|<div|<p[ >]/i.test(s) ? htmlToText(s) : s;
  }
  return {
    status: r.status,
    buf,
    finalUrl: r.finalUrl,
    route: 'direct',
    pdf: isPdf,
    text,
  };
}

async function cmdFetch(retry) {
  const sel = readJson(join(DIR, 'selection.json'));
  const targets = new Map();
  for (const p of sel) for (const d of p.documents) targets.set(d.sourceId, d);
  const sources = new Map(
    readJson(join(ROOT, 'data', 'sources.json')).map((s) => [s.id, s]),
  );
  const logPath = join(DIR, 'retrieval.json');
  const log = existsSync(logPath) ? readJson(logPath) : {};
  for (const [sid, d] of targets) {
    const prev = log[sid];
    if (prev && (prev.ok || !retry)) continue;
    const src = sources.get(sid);
    const urls = [
      ...new Set(
        [d.evidenceUrl, d.archivedUrl, src?.canonicalUrl].filter(Boolean),
      ),
    ];
    const entry = { sourceId: sid, attempts: [] };
    for (const url of urls) {
      const r = await retrieve(sid, url);
      const ok = r.status >= 200 && r.status < 400 && r.text.trim().length > 40;
      entry.attempts.push({
        url,
        status: r.status,
        route: r.route,
        error: r.error,
        bytes: r.buf?.length,
        sha256: r.buf ? sha256(r.buf) : undefined,
      });
      if (ok) {
        writeFileSync(join(CACHE, `${sid}.txt`), r.text);
        Object.assign(entry, {
          ok: true,
          url,
          route: r.route,
          pdf: !!r.pdf,
          sha256: sha256(r.buf),
          retrievedAt: new Date().toISOString().slice(0, 10),
        });
        break;
      }
    }
    if (!entry.ok) entry.ok = false;
    log[sid] = entry;
    writeJson(logPath, log);
    console.log(
      sid,
      entry.ok ? 'ok' : 'FAIL',
      entry.attempts.map((a) => a.status).join(','),
    );
  }
}

// Internet Archive scans: the source record names the OCR text it was read in;
// read that instead of the item page.
async function cmdFetchOcr() {
  const sel = readJson(join(DIR, 'selection.json'));
  const sources = new Map(
    readJson(join(ROOT, 'data', 'sources.json')).map((s) => [s.id, s]),
  );
  const logPath = join(DIR, 'retrieval.json');
  const log = readJson(logPath);
  const ids = new Set(sel.flatMap((p) => p.documents.map((d) => d.sourceId)));
  for (const sid of ids) {
    const src = sources.get(sid);
    if (!/djvu\.txt/.test(src?.version ?? '')) continue;
    if (log[sid]?.ocr) continue;
    const item = /archive\.org\/(?:details|download)\/([^/\s]+)/.exec(
      src.evidenceUrl ?? '',
    )?.[1];
    if (!item) continue;
    const url = `https://archive.org/download/${item}/${item}_djvu.txt`;
    const r = await retrieve(sid, url);
    const ok = r.status >= 200 && r.status < 400 && r.text.trim().length > 40;
    const entry = log[sid] ?? { sourceId: sid, attempts: [] };
    entry.attempts.push({
      url,
      status: r.status,
      route: r.route,
      error: r.error,
      bytes: r.buf?.length,
      sha256: r.buf ? sha256(r.buf) : undefined,
    });
    if (ok) {
      writeFileSync(join(CACHE, `${sid}.txt`), r.text);
      Object.assign(entry, {
        ok: true,
        url,
        route: r.route,
        pdf: false,
        ocr: true,
        sha256: sha256(r.buf),
        retrievedAt: new Date().toISOString().slice(0, 10),
      });
    }
    log[sid] = entry;
    writeJson(logPath, log);
    console.log(sid, ok ? 'ok' : 'FAIL', r.status);
  }
}

const cmd = process.argv[2];
if (cmd === 'fetch-ocr') await cmdFetchOcr();
if (cmd === 'fetch') await cmdFetch(process.argv.includes('--retry'));
