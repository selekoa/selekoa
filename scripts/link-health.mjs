// Link health: can every cited source still be reached, and does it still
// contain the passages quoted from it? Needs the network; run manually, it is
// not part of `pnpm check`. Changes nothing in data/.
//
//   node scripts/link-health.mjs [--date YYYY-MM-DD] [--max-sources N]
//                                [--id <sourceId>]... [--report-only]
//
// For each source in data/sources.json, in dataset order, the evidenceUrl and
// the canonicalUrl are requested once each (once in all when they are the
// same address) with curl, by GET, one request at a time, at least 3 s apart
// per host, 30 s timeout per request. Redirects are followed by hand (up to
// ten hops) so the chain is recorded. curl is used because it goes through
// this environment's HTTPS proxy without extra configuration.
//
// Bodies are treated as evidence only. They are cached under .local/link-health/
// (ignored by Git) by SHA-256, with the per-URL results in a state file, so a
// stopped run resumes where it left off. --max-sources N stops after N more
// sources, so a wrapper can commit a checkpoint every N sources.
//
// Each quotation (evidence with passageType "quote") is matched against the
// text of the evidenceUrl body and, when it differs, the canonicalUrl body:
//   verbatim    the passage occurs exactly in the extracted text;
//   normalised  it occurs after folding whitespace, quotation marks and
//               dashes only;
//   not-found   neither. A not-found passage is then tried loosely (Unicode
//               compatibility forms, case, soft hyphens, PDF line-end
//               hyphens, elisions, CJK radical forms, all whitespace and hyphens) and the hit is recorded as
//               `looseHit`, a hint that the miss is an extraction artefact.
//               A loose hit does not count as a match.
// Invisible format characters (Unicode Cf) are removed from extracted text.
// HTML is matched first against its visible text, then against the page
// source (scripts and JSON included), recorded as `foundIn`.
//
// Source classes, most severe first: gone (4xx/5xx or no DNS record), moved
// (redirected to a different document), changed (body readable, a quotation
// not found), blocked (401/403/429, a challenge page, or a CONNECT refusal by
// this environment's proxy), unreachable (timeout or reset; the proxy's own
// relay log is recorded), unreadable (body answered but no text to check:
// script-rendered shell or unsupported type), ok.
//
// Writes review/link-health-<date>.json and review/link-health-<date>.md. The
// Markdown is regenerated on every run; hand-written notes go in the section
// marked for them, which is carried over from the existing file.
import { execFile } from 'node:child_process';
import { createHash } from 'node:crypto';
import { lookup } from 'node:dns/promises';
import {
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  renameSync,
  rmSync,
  statSync,
  writeFileSync,
} from 'node:fs';
import { join } from 'node:path';
import { promisify } from 'node:util';

/**
 * A signed storage address (an S3 pre-signed URL) carries a third party's
 * access key ID and a short-lived signature. Neither is worth keeping, and
 * neither belongs in a published file, so a recorded address drops its query.
 */
const unsigned = (href) =>
  typeof href === 'string' && /[?&]X-Amz-Signature=/.test(href)
    ? href.split('?')[0]
    : href;

const run = promisify(execFile);
const HOST_PACE_MS = 3000;
const TIMEOUT_S = 30;
const MAX_HOPS = 10;
const MAX_BYTES = 100 * 1024 * 1024;
const USER_AGENT = 'selekoa-link-health (source link and quotation check)';

const args = process.argv.slice(2);
let date = new Date().toISOString().slice(0, 10);
let maxSources = Infinity;
let reportOnly = false;
const onlyIds = new Set();
for (let i = 0; i < args.length; i += 1) {
  if (args[i] === '--date') date = args[(i += 1)];
  else if (args[i] === '--max-sources') maxSources = Number(args[(i += 1)]);
  else if (args[i] === '--id') onlyIds.add(args[(i += 1)]);
  else if (args[i] === '--report-only') reportOnly = true;
  else {
    console.error(`Unknown argument: ${args[i]}`);
    process.exit(2);
  }
}

const LOCAL = '.local/link-health';
const BODIES = join(LOCAL, 'bodies');
const TEXTS = join(LOCAL, 'text');
const STATE = join(LOCAL, `state-${date}.json`);
const JSON_OUT = `review/link-health-${date}.json`;
const MD_OUT = `review/link-health-${date}.md`;
mkdirSync(BODIES, { recursive: true });
mkdirSync(TEXTS, { recursive: true });

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const readJson = (path) => JSON.parse(readFileSync(path, 'utf8'));
const sources = readJson('data/sources.json');
const evidence = readJson('data/evidence.json');
const quotesBySource = new Map();
for (const item of evidence) {
  if (item.passageType !== 'quote') continue;
  if (!quotesBySource.has(item.sourceId)) quotesBySource.set(item.sourceId, []);
  quotesBySource.get(item.sourceId).push(item);
}

function writeAtomic(path, text) {
  writeFileSync(`${path}.tmp`, text);
  renameSync(`${path}.tmp`, path);
}

const state = existsSync(STATE) ? readJson(STATE) : { fetches: {} };
const saveState = () => writeAtomic(STATE, JSON.stringify(state));

// ---------------------------------------------------------------- fetching

const lastRequest = new Map();
async function pace(host) {
  const wait = (lastRequest.get(host) ?? 0) + HOST_PACE_MS - Date.now();
  if (wait > 0) await sleep(wait);
}

async function relayFailure(host) {
  // The proxy keeps a log of tunnels it refused or lost; it names the reason
  // a request failed in this environment.
  try {
    const { stdout } = await run('curl', [
      '-sS',
      '--max-time',
      '5',
      `${process.env.HTTPS_PROXY}/__agentproxy/status`,
    ]);
    const failures = JSON.parse(stdout).recentRelayFailures ?? [];
    const hit = failures.filter((f) => f.host?.split(':')[0] === host).at(-1);
    return hit ? { kind: hit.kind, detail: hit.detail } : undefined;
  } catch {
    return undefined;
  }
}

function parseHeaders(text) {
  // curl writes every header block (1xx, then the final one).
  const blocks = text.split(/\r?\n\r?\n/).filter((b) => b.trim());
  const last = blocks.at(-1) ?? '';
  const headers = {};
  for (const line of last.split(/\r?\n/).slice(1)) {
    const at = line.indexOf(':');
    if (at > 0)
      headers[line.slice(0, at).trim().toLowerCase()] = line
        .slice(at + 1)
        .trim();
  }
  return headers;
}

async function requestOnce(url) {
  const host = new URL(url).hostname;
  await pace(host);
  const tmpBody = join(LOCAL, 'tmp-body');
  const tmpHead = join(LOCAL, 'tmp-head');
  rmSync(tmpBody, { force: true });
  rmSync(tmpHead, { force: true });
  const curlArgs = [
    '-sS',
    '--compressed',
    '--max-time',
    String(TIMEOUT_S),
    '--max-filesize',
    String(MAX_BYTES),
    '--proto',
    '=http,https',
    '-A',
    USER_AGENT,
    '-H',
    'Accept: text/html,application/xhtml+xml,application/pdf,*/*;q=0.8',
    '-o',
    tmpBody,
    '-D',
    tmpHead,
    '-w',
    '%{http_code}\t%{content_type}',
    '--',
    url,
  ];
  let stdout;
  let error;
  try {
    ({ stdout } = await run('curl', curlArgs, { maxBuffer: 1024 * 1024 }));
  } catch (failure) {
    stdout = failure.stdout ?? '';
    error = {
      curlExit: failure.code,
      message: (failure.stderr ?? '').trim().slice(0, 300),
    };
  }
  lastRequest.set(host, Date.now());
  const [code, contentType] = stdout.split('\t');
  const status = Number(code) || 0;
  const headers = existsSync(tmpHead)
    ? parseHeaders(readFileSync(tmpHead, 'latin1'))
    : {};
  const body = existsSync(tmpBody) ? readFileSync(tmpBody) : Buffer.alloc(0);
  return {
    status,
    contentType: contentType || undefined,
    headers,
    body,
    error,
  };
}

async function fetchUrl(url) {
  const chain = [];
  let current = url;
  const requestedAt = new Date().toISOString();
  for (let hop = 0; hop <= MAX_HOPS; hop += 1) {
    const host = new URL(current).hostname;
    const response = await requestOnce(current);
    if (response.error && !response.status) {
      const record = { url, requestedAt, chain, failedUrl: current };
      record.error = response.error;
      try {
        await lookup(host);
      } catch (dns) {
        if (['ENOTFOUND', 'ENODATA'].includes(dns?.code)) record.dns = dns.code;
      }
      if (!record.dns) record.relay = await relayFailure(host);
      return record;
    }
    if (response.status >= 300 && response.status < 400) {
      const location = response.headers.location;
      if (location) {
        const next = new URL(location, current).href;
        chain.push({ url: current, status: response.status });
        current = next;
        continue;
      }
    }
    const sha256 = createHash('sha256').update(response.body).digest('hex');
    if (response.body.length && !existsSync(join(BODIES, sha256)))
      writeFileSync(join(BODIES, sha256), response.body);
    return {
      url,
      requestedAt,
      chain,
      status: response.status,
      finalUrl: current,
      contentType: response.contentType,
      bytes: response.body.length,
      sha256: response.body.length ? sha256 : undefined,
      lastModified: response.headers['last-modified'],
      cfMitigated: response.headers['cf-mitigated'],
      error: response.error,
    };
  }
  return { url, requestedAt, chain, loop: true };
}

// ---------------------------------------------------------- text extraction

const NAMED = {
  amp: '&',
  lt: '<',
  gt: '>',
  quot: '"',
  apos: "'",
  nbsp: ' ',
  ndash: '–',
  mdash: '—',
  lsquo: '‘',
  rsquo: '’',
  sbquo: '‚',
  ldquo: '“',
  rdquo: '”',
  bdquo: '„',
  hellip: '…',
  shy: '­',
  laquo: '«',
  raquo: '»',
  middot: '·',
  bull: '•',
  copy: '©',
  reg: '®',
  trade: '™',
  eacute: 'é',
  egrave: 'è',
  aacute: 'á',
  agrave: 'à',
  oacute: 'ó',
  uuml: 'ü',
  ouml: 'ö',
  auml: 'ä',
  szlig: 'ß',
  ccedil: 'ç',
  thinsp: ' ',
  ensp: ' ',
  emsp: ' ',
  zwj: '‍',
  zwnj: '‌',
  minus: '−',
  prime: '′',
  Prime: '″',
};
function decodeEntities(text) {
  return text.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (match, name) => {
    if (name[0] === '#') {
      const code =
        name[1].toLowerCase() === 'x'
          ? parseInt(name.slice(2), 16)
          : parseInt(name.slice(1), 10);
      try {
        return String.fromCodePoint(code);
      } catch {
        return match;
      }
    }
    return NAMED[name] ?? NAMED[name.toLowerCase()] ?? match;
  });
}

function charsetOf(contentType, buffer) {
  const header = /charset=["']?([\w-]+)/i.exec(contentType ?? '')?.[1];
  if (header) return header;
  const head = buffer.subarray(0, 4096).toString('latin1');
  return /<meta[^>]+charset=["']?([\w-]+)/i.exec(head)?.[1] ?? 'utf-8';
}
function decodeBody(buffer, contentType) {
  try {
    return new TextDecoder(charsetOf(contentType, buffer)).decode(buffer);
  } catch {
    return new TextDecoder('utf-8').decode(buffer);
  }
}

function htmlVisibleText(html) {
  return decodeEntities(
    html
      .replace(/<!--[\s\S]*?-->/g, ' ')
      .replace(/<(script|style|template|svg)\b[\s\S]*?<\/\1\s*>/gi, ' ')
      .replace(
        /<(br|\/p|\/div|\/li|\/h[1-6]|\/tr|\/blockquote)\b[^>]*>/gi,
        '\n',
      )
      .replace(INLINE_TAG, '')
      .replace(/<[^>]+>/g, ' '),
  );
}
// Inline elements do not break words: "Rainier</a>, a" is "Rainier, a".
const INLINE_TAG =
  /<\/?(a|abbr|b|cite|code|em|font|i|mark|q|s|small|span|strong|sub|sup|time|u)\b[^>]*>/gi;
function htmlSourceText(html) {
  // Scripts and JSON included: some pages carry their article in a data blob.
  const unescaped = html
    .replace(/\\u([0-9a-f]{4})/gi, (_, hex) =>
      String.fromCharCode(parseInt(hex, 16)),
    )
    .replace(/\\n/g, ' ')
    .replace(/\\(["'/\\])/g, '$1');
  return decodeEntities(
    decodeEntities(unescaped.replace(INLINE_TAG, '').replace(/<[^>]+>/g, ' ')),
  );
}

// Bump when extraction changes, so cached text is rebuilt.
const EXTRACT_VERSION = 3;

function kindOf(contentType, buffer) {
  const type = (contentType ?? '').toLowerCase();
  if (type.includes('pdf') || buffer.subarray(0, 5).toString() === '%PDF-')
    return 'pdf';
  if (type.includes('html') || type.includes('xml')) return 'html';
  if (type.startsWith('text/') || type.includes('json')) return 'text';
  if (/^\s*</.test(buffer.subarray(0, 512).toString('latin1'))) return 'html';
  return 'other';
}

// Returns { kind, layers: [{ name, text }] } or { kind } when there is no text.
async function extract(record) {
  if (!record.sha256) return { kind: 'empty', layers: [] };
  const cached = join(TEXTS, `${record.sha256}.v${EXTRACT_VERSION}.json`);
  if (existsSync(cached)) return readJson(cached);
  const path = join(BODIES, record.sha256);
  const buffer = readFileSync(path);
  const kind = kindOf(record.contentType, buffer);
  let result = { kind, layers: [] };
  if (kind === 'pdf') {
    // Content-stream order first: reading-order reconstruction can splice
    // drop capitals and margin text into sentences.
    for (const [name, mode] of [
      ['pdf text (stream order)', ['-raw']],
      ['pdf text (reading order)', []],
    ]) {
      try {
        const { stdout } = await run(
          'pdftotext',
          [...mode, '-enc', 'UTF-8', '-q', path, '-'],
          { maxBuffer: 256 * 1024 * 1024, timeout: 120000 },
        );
        result.layers.push({ name, text: stdout });
      } catch (error) {
        result.error = `pdftotext: ${String(error.message).slice(0, 200)}`;
      }
    }
  } else if (kind === 'html') {
    const html = decodeBody(buffer, record.contentType);
    result.layers.push({ name: 'visible text', text: htmlVisibleText(html) });
    result.layers.push({ name: 'page source', text: htmlSourceText(html) });
  } else if (kind === 'text') {
    const text = decodeBody(buffer, record.contentType);
    result.layers.push({ name: 'text', text });
    if (/json/i.test(record.contentType ?? ''))
      result.layers.push({ name: 'page source', text: htmlSourceText(text) });
  }
  // Invisible format characters (bidi overrides that some PDF exporters wrap
  // around every line, zero-width spaces, soft hyphens) are not text.
  for (const layer of result.layers)
    layer.text = layer.text.replace(/\p{Cf}/gu, '');
  writeFileSync(cached, JSON.stringify(result));
  return result;
}

const words = (text) => (text.match(/[\p{L}\p{N}]+/gu) ?? []).length;

// ------------------------------------------------------------------ matching

const normalise = (text) =>
  text
    .replace(/[‘’‚‛′`´]/g, "'")
    .replace(/[“”„‟″]/g, '"')
    .replace(/[‐‑‒–—―−﹘﹣－]/g, '-')
    .replace(/\s+/g, ' ')
    .trim();
// CJK Radicals Supplement forms that some PDF fonts emit for ordinary
// simplified characters; NFKC does not map them.
const RADICALS = {
  '⺁': '厂',
  '⺇': '几',
  '⻀': '丷',
  '⻁': '虎',
  '⻄': '西',
  '⻅': '见',
  '⻆': '角',
  '⻉': '贝',
  '⻋': '车',
  '⻑': '長',
  '⻓': '长',
  '⻔': '门',
  '⻘': '青',
  '⻚': '页',
  '⻛': '风',
  '⻜': '飞',
  '⻝': '食',
  '⻢': '马',
  '⻤': '鬼',
  '⻥': '鱼',
  '⻦': '鸟',
  '⻨': '麦',
  '⻩': '黄',
  '⻬': '齐',
  '⻮': '齿',
  '⻰': '龙',
  '⻳': '龟',
};
// Loose form: also drops control characters, PDF line-end hyphens and all
// whitespace and hyphens (PDF text often gains spaces before punctuation,
// loses them between words, or splits a hyphenated word at a line end). Used only to explain a miss, never as a match.
function loose(text) {
  return normalise(
    text
      .normalize('NFKC')
      .replace(/[\u2e80-\u2eff]/g, (c) => RADICALS[c] ?? c)
      .replace(/(\p{L})-[ \t]*\n\s*(\p{L})/gu, '$1$2')
      .replace(/[\p{Cc}\p{Cf}]/gu, ' '),
  )
    .toLowerCase()
    .replace(/[\s-]+/g, '');
}
const ELISION = /\s*(?:\[\s*(?:…|\.\.\.)\s*\]|…|\.\.\.)\s*/;

function matchPassage(passage, layers, prepared) {
  for (const layer of layers)
    if (layer.text.includes(passage))
      return { match: 'verbatim', foundIn: layer.name };
  const wanted = normalise(passage);
  for (const [i, layer] of layers.entries())
    if (prepared.normal[i].includes(wanted))
      return { match: 'normalised', foundIn: layer.name };
  const segments = passage
    .split(ELISION)
    .map((s) => loose(s))
    .filter((s) => s.length >= 3);
  for (const [i, layer] of layers.entries()) {
    const hay = prepared.loose[i];
    let at = 0;
    const ok =
      segments.length > 0 &&
      segments.every((s) => {
        const found = hay.indexOf(s, at);
        if (found < 0) return false;
        at = found + s.length;
        return true;
      });
    if (ok)
      return {
        match: 'not-found',
        looseHit: segments.length > 1 ? 'elided segments, in order' : 'loose',
        foundIn: layer.name,
      };
  }
  return { match: 'not-found' };
}

// ------------------------------------------------------------ classification

function sameDocument(a, b) {
  const key = (href) => {
    try {
      const u = new URL(href);
      const host = u.hostname.toLowerCase().replace(/^www\./, '');
      const path = decodeURIComponent(u.pathname)
        .replace(/\/(index\.html?)?$/i, '')
        .replace(/\/+$/, '');
      return `${host}${path}${u.search}`;
    } catch {
      return href;
    }
  };
  return key(a) === key(b);
}
function isHomepage(href) {
  try {
    const u = new URL(href);
    return /^\/?([a-z]{2}(-[a-z]{2})?\/?)?$/i.test(u.pathname) && !u.search;
  } catch {
    return false;
  }
}

const BOT_WALL =
  /cf-browser-verification|challenge-platform|<title>Just a moment|Attention Required! \| Cloudflare|captcha|Access Denied|Request unsuccessful\. Incapsula|perimeterx|datadome|Please enable JS and disable any ad blocker/i;

function classifyFetch(record) {
  if (!record) return { class: 'pending' };
  if (record.loop) return { class: 'unreachable', detail: 'redirect loop' };
  if (!record.status) {
    if (record.dns)
      return { class: 'gone', detail: `no DNS record (${record.dns})` };
    if (record.relay?.kind === 'connect_rejected')
      return {
        class: 'blocked',
        detail: `this environment's proxy refused the connection: ${record.relay.detail}`,
      };
    const relay = record.relay
      ? `; proxy log: ${record.relay.kind}, ${record.relay.detail}`
      : '';
    return {
      class: 'unreachable',
      detail: `curl exit ${record.error?.curlExit}: ${record.error?.message}${relay}`,
    };
  }
  const { status } = record;
  let snippet = '';
  if (record.sha256 && record.bytes < 2_000_000)
    snippet = readFileSync(join(BODIES, record.sha256))
      .subarray(0, 65536)
      .toString('utf8');
  const challenge =
    record.cfMitigated === 'challenge' ||
    ([403, 429, 503].includes(status) && BOT_WALL.test(snippet)) ||
    (status < 300 &&
      /<title>(Just a moment|Attention Required)/i.test(snippet));
  if (challenge)
    return { class: 'blocked', detail: `challenge page (HTTP ${status})` };
  if ([401, 403, 429].includes(status))
    return { class: 'blocked', detail: `HTTP ${status}` };
  if (status >= 400) return { class: 'gone', detail: `HTTP ${status}` };
  if (status < 200 || status >= 300)
    return { class: 'unreachable', detail: `HTTP ${status}` };
  if (
    record.finalUrl !== record.url &&
    !sameDocument(record.finalUrl, record.url)
  ) {
    if (/[?&]X-Amz-Signature=/.test(record.finalUrl))
      return { class: 'ok', detail: 'served from a signed storage URL' };
    // Same page with a query added (Nature's cookie check, tracking).
    const plain = (href) => {
      const u = new URL(href);
      return `${u.hostname.replace(/^www\./, '')}${u.pathname}`;
    };
    if (plain(record.finalUrl) === plain(record.url))
      return { class: 'ok', detail: 'same page, query changed' };
    if (record.finalUrl.includes(encodeURIComponent(record.url)))
      return { class: 'ok', detail: 'login or cookie handshake' };
    // twitter.com is now x.com, and a post keeps its number when the account
    // is renamed: the same post, so not a move. The new handle is recorded.
    const post = (href) =>
      /^https?:\/\/(?:www\.|mobile\.)?(?:twitter|x)\.com\/([^/?#]+)\/status\/(\d+)/.exec(
        href,
      );
    const alias = (href) =>
      href.replace(/^(https?:\/\/(?:[\w-]+\.)?)twitter\.com/, '$1x.com');
    if (sameDocument(alias(record.finalUrl), alias(record.url)))
      return { class: 'ok', detail: 'twitter.com now answers as x.com' };
    const from = post(record.url);
    const to = post(record.finalUrl);
    if (from?.[2] && from[2] === to?.[2])
      return {
        class: 'ok',
        detail: `same post; account handle now ${to[1] ?? 'changed'}`,
      };
    return {
      class: 'moved',
      detail:
        isHomepage(record.finalUrl) && !isHomepage(record.url)
          ? 'redirects to a homepage'
          : 'redirects to another address',
    };
  }
  return {
    class: 'ok',
    detail: record.chain.length ? 'trivial redirect' : undefined,
  };
}

const SEVERITY = [
  'gone',
  'moved',
  'changed',
  'blocked',
  'unreachable',
  'unreadable',
  'ok',
];

// -------------------------------------------------------- recorded hashes etc

function recordedHashes() {
  // Any object in review/ or research/ JSON that pairs an address with a
  // SHA-256 of what was retrieved. The hash may be of a different
  // representation (raw vs decompressed, an archive capture), so a mismatch
  // is a prompt to look, not proof of change.
  const index = new Map();
  const walk = (dir) => {
    for (const name of readdirSync(dir)) {
      const path = join(dir, name);
      if (statSync(path).isDirectory()) walk(path);
      else if (name.endsWith('.json') && !name.startsWith('link-health-'))
        scan(path);
    }
  };
  const scan = (path) => {
    let json;
    try {
      json = readJson(path);
    } catch {
      return;
    }
    const visit = (node) => {
      if (Array.isArray(node)) return node.forEach(visit);
      if (!node || typeof node !== 'object') return;
      const keys = Object.keys(node);
      const hashes = keys.filter(
        (k) =>
          /sha256/i.test(k) &&
          !/text|preparer|blind|verdict|message|pack/i.test(k) &&
          typeof node[k] === 'string' &&
          /^[0-9a-f]{64}$/.test(node[k]),
      );
      if (hashes.length)
        for (const k of keys)
          if (typeof node[k] === 'string' && /^https?:\/\//.test(node[k]))
            for (const h of hashes) {
              if (!index.has(node[k])) index.set(node[k], []);
              const list = index.get(node[k]);
              if (!list.some((e) => e.sha256 === node[h] && e.file === path))
                list.push({
                  file: path.replaceAll('\\', '/'),
                  field: h,
                  sha256: node[h],
                });
            }
      for (const k of keys) visit(node[k]);
    };
    visit(json);
  };
  for (const dir of ['review', 'research']) if (existsSync(dir)) walk(dir);
  return index;
}

async function codexItems() {
  const path = 'research/archive-verification-2026-10-28/items.json';
  try {
    if (existsSync(path)) return { from: path, items: readJson(path) };
    const { stdout } = await run(
      'git',
      ['show', `origin/archive-verification-2026-10-28:${path}`],
      { maxBuffer: 64 * 1024 * 1024 },
    );
    return {
      from: `${path} on branch archive-verification-2026-10-28`,
      items: JSON.parse(stdout),
    };
  } catch {
    return { from: undefined, items: [] };
  }
}

// ---------------------------------------------------------------- main loop

const selected = sources.filter((s) => !onlyIds.size || onlyIds.has(s.id));
const urlsOf = (s) => [
  ...new Set(
    [s.evidenceUrl, s.canonicalUrl].filter((u) => /^https?:\/\//.test(u ?? '')),
  ),
];

if (!reportOnly) {
  let processed = 0;
  for (const source of selected) {
    const missing = urlsOf(source).filter((u) => !state.fetches[u]);
    if (!missing.length) continue;
    if (processed >= maxSources) break;
    for (const url of missing) {
      const record = await fetchUrl(url);
      state.fetches[url] = record;
      saveState();
      const c = classifyFetch(record);
      if (c.class !== 'ok')
        console.log(
          `${c.class.padEnd(11)} ${url}${record.finalUrl && record.finalUrl !== url ? ` -> ${record.finalUrl}` : ''} (${c.detail})`,
        );
    }
    processed += 1;
  }
  const done = selected.filter((s) =>
    urlsOf(s).every((u) => state.fetches[u]),
  ).length;
  console.log(
    `Fetched ${processed} more sources; ${done}/${selected.length} complete.`,
  );
}

// The repository's Prettier settings, so the tracked outputs pass
// `pnpm format:check`; unformatted when Prettier is not installed.
async function formatted(path, text) {
  try {
    const prettier = await import('prettier');
    const options = (await prettier.resolveConfig(path)) ?? {};
    return await prettier.format(text, { ...options, filepath: path });
  } catch {
    return text;
  }
}

// ------------------------------------------------------------------ report

const hashes = recordedHashes();
const codex = await codexItems();
const codexBySource = new Map();
for (const item of codex.items) {
  if (!codexBySource.has(item.source)) codexBySource.set(item.source, []);
  codexBySource.get(item.source).push(item);
}

const prepared = new Map();
async function layersFor(record) {
  // Only bodies of the document itself: not error pages or challenge pages.
  if (!record?.sha256 || !['ok', 'moved'].includes(classifyFetch(record).class))
    return undefined;
  if (prepared.has(record.sha256)) return prepared.get(record.sha256);
  const extracted = await extract(record);
  const layers = extracted.layers ?? [];
  const value = {
    kind: extracted.kind,
    error: extracted.error,
    layers,
    words: layers[0] ? words(layers[0].text) : 0,
    normal: layers.map((l) => normalise(l.text)),
    loose: layers.map((l) => loose(l.text)),
  };
  prepared.set(record.sha256, value);
  return value;
}

function hashCompare(url, record) {
  const recorded = hashes.get(url) ?? [];
  if (!recorded.length || !record?.sha256) return undefined;
  return {
    recorded: recorded.length,
    sameBytes: recorded.some((r) => r.sha256 === record.sha256),
    files: [...new Set(recorded.map((r) => r.file))],
  };
}

function modifiedSinceAccess(record, accessedAt) {
  if (!record?.lastModified || !accessedAt) return undefined;
  const modified = Date.parse(record.lastModified);
  const accessed = Date.parse(`${accessedAt}T23:59:59Z`);
  if (Number.isNaN(modified) || Number.isNaN(accessed)) return undefined;
  return modified > accessed;
}

const results = [];
for (const source of selected) {
  const urls = urlsOf(source);
  if (!urls.every((u) => state.fetches[u])) {
    results.push({ id: source.id, class: 'pending' });
    continue;
  }
  const fields = {};
  for (const field of ['evidenceUrl', 'canonicalUrl']) {
    const url = source[field];
    if (!url) continue;
    if (field === 'canonicalUrl' && url === source.evidenceUrl) {
      fields[field] = { sameAs: 'evidenceUrl' };
      continue;
    }
    const record = state.fetches[url];
    const c = classifyFetch(record);
    const text = await layersFor(record);
    fields[field] = {
      url,
      status: record.status || undefined,
      chain: record.chain?.length ? record.chain.map(unsigned) : undefined,
      finalUrl:
        record.finalUrl && record.finalUrl !== url
          ? unsigned(record.finalUrl)
          : undefined,
      contentType: record.contentType,
      bytes: record.bytes,
      sha256: record.sha256,
      lastModified: record.lastModified,
      modifiedSinceAccess: modifiedSinceAccess(record, source.accessedAt),
      requestedAt: record.requestedAt,
      class: c.class,
      detail: c.detail,
      bodyKind: text?.kind,
      textWords: text?.words,
      extractionError: text?.error,
      recordedHash: hashCompare(url, record),
    };
  }
  // Quotations: try every readable body of this source.
  const bodies = [];
  for (const field of ['evidenceUrl', 'canonicalUrl']) {
    const f = fields[field];
    if (!f || f.sameAs) continue;
    const text = await layersFor(state.fetches[f.url]);
    if (text?.layers.length) bodies.push({ field, text });
  }
  const quotes = (quotesBySource.get(source.id) ?? []).map((q) => {
    const rank = (x) =>
      x.match === 'verbatim'
        ? 1
        : x.match === 'normalised'
          ? 2
          : x.looseHit
            ? 3
            : 4;
    let best = { match: 'not-found' };
    for (const body of bodies) {
      const m = {
        ...matchPassage(q.passage, body.text.layers, body.text),
        field: body.field,
      };
      if (rank(m) < rank(best)) best = m;
    }
    const out = { evidenceId: q.id, claimId: q.claimId, match: best.match };
    if (best.field) out.field = best.field;
    if (best.foundIn) out.foundIn = best.foundIn;
    if (best.looseHit) out.looseHit = best.looseHit;
    if (best.match === 'not-found') {
      out.locator = q.locator;
      out.passage = q.passage;
    }
    return out;
  });

  const urlClasses = Object.values(fields)
    .filter((f) => !f.sameAs)
    .map((f) => f.class);
  const readable = bodies.some(
    (b) => b.text.words >= 150 || b.text.kind === 'pdf',
  );
  const missingQuotes = quotes.filter((q) => q.match === 'not-found');
  let sourceClass = SEVERITY.find((c) => urlClasses.includes(c)) ?? 'ok';
  const reasons = [];
  // No quotation at all, not even loosely, in an HTML page: most likely a
  // landing or viewer page (an abstract, a scan viewer) rather than the text
  // quoted from, so it cannot show a change.
  const landingPage =
    bodies.length > 0 &&
    bodies.every((b) => b.text.kind === 'html') &&
    quotes.length > 0 &&
    quotes.every((q) => q.match === 'not-found' && !q.looseHit);
  if (
    landingPage &&
    ['ok', 'blocked', 'unreachable', 'unreadable'].includes(sourceClass)
  ) {
    sourceClass = 'unreadable';
    reasons.push(
      'no quotation found in the page text: probably a landing or viewer page, not the quoted text',
    );
  } else if (quotes.length && missingQuotes.length && sourceClass === 'ok') {
    if (
      !bodies.length ||
      (!readable && missingQuotes.length === quotes.length)
    ) {
      sourceClass = 'unreadable';
      reasons.push(
        'no checkable text in the body (script-rendered page, empty or unsupported type)',
      );
    } else sourceClass = 'changed';
  } else if (
    quotes.length &&
    missingQuotes.length &&
    SEVERITY.indexOf(sourceClass) > SEVERITY.indexOf('changed') &&
    bodies.length &&
    readable
  ) {
    sourceClass = 'changed';
  }
  if (
    sourceClass === 'ok' &&
    urlClasses.every((c) => c === 'ok') &&
    !bodies.length &&
    quotes.length
  ) {
    sourceClass = 'unreadable';
  }
  for (const [field, f] of Object.entries(fields))
    if (!f.sameAs && f.class !== 'ok')
      reasons.push(`${field}: ${f.class}${f.detail ? ` (${f.detail})` : ''}`);
  if (missingQuotes.length)
    reasons.push(
      `${missingQuotes.length} of ${quotes.length} quotations not found${missingQuotes.some((q) => q.looseHit) ? `, ${missingQuotes.filter((q) => q.looseHit).length} with a loose hit` : ''}`,
    );

  results.push({
    id: source.id,
    title: source.title,
    publisher: source.publisher,
    host: new URL(source.evidenceUrl).hostname,
    accessedAt: source.accessedAt,
    archivedUrl: source.archivedUrl,
    archivedAt: source.archivedAt,
    codexItems: codexBySource.get(source.id)?.map((i) => i.n),
    class: sourceClass,
    reasons: reasons.length ? reasons : undefined,
    quoteCounts: quotes.length
      ? Object.fromEntries(
          ['verbatim', 'normalised', 'not-found'].map((m) => [
            m,
            quotes.filter((q) => q.match === m).length,
          ]),
        )
      : undefined,
    fields,
    quotes: quotes.length ? quotes : undefined,
  });
}

const CLASSES = [...SEVERITY, 'pending'];
const complete = results.filter((r) => r.class !== 'pending');
const counts = Object.fromEntries(
  CLASSES.map((c) => [c, results.filter((r) => r.class === c).length]),
);
const allQuotes = complete.flatMap((r) => r.quotes ?? []);
const quoteCounts = {
  verbatim: allQuotes.filter((q) => q.match === 'verbatim').length,
  normalised: allQuotes.filter((q) => q.match === 'normalised').length,
  notFound: allQuotes.filter((q) => q.match === 'not-found').length,
  notFoundWithLooseHit: allQuotes.filter((q) => q.looseHit).length,
};
const distinctUrls = new Set(
  complete.flatMap((r) =>
    Object.values(r.fields)
      .filter((f) => !f.sameAs)
      .map((f) => f.url),
  ),
);

const report = {
  run: date,
  script: 'scripts/link-health.mjs',
  method: {
    request:
      "curl GET through this environment's HTTPS proxy, one request at a time, ≥3 s apart per host, 30 s timeout, redirects followed by hand (≤10 hops), decompressed body hashed",
    userAgent: USER_AGENT,
    quoteMatch:
      'verbatim; normalised = whitespace, quotation marks and dashes folded; not-found (looseHit = hit only after NFKC, case, soft-hyphen, PDF line-end hyphen, control character, CJK radical, elision or whitespace folding; not counted as a match)',
    codexList: codex.from,
  },
  sources: { total: selected.length, complete: complete.length },
  distinctUrlsRequested: distinctUrls.size,
  counts,
  quoteCounts,
  results,
};
writeAtomic(
  JSON_OUT,
  await formatted(JSON_OUT, `${JSON.stringify(report, null, 2)}\n`),
);

// ---------------------------------------------------------------- Markdown

const esc = (s) =>
  String(s ?? '')
    .replace(/\|/g, '\\|')
    .replace(/\n/g, ' ');
const trim = (s, n = 160) => (s.length > n ? `${s.slice(0, n - 1)}…` : s);
const NOTES_START = '<!-- notes:start -->';
const NOTES_END = '<!-- notes:end -->';
let notes = 'Not yet written: the run is in progress.';
if (existsSync(MD_OUT)) {
  const old = readFileSync(MD_OUT, 'utf8');
  const a = old.indexOf(NOTES_START);
  const b = old.indexOf(NOTES_END);
  if (a >= 0 && b > a) notes = old.slice(a + NOTES_START.length, b).trim();
}

const md = [];
md.push(`# Source link health, ${date}`, '');
md.push(
  `Generated by \`node ${report.script}\` from \`data/sources.json\` and \`data/evidence.json\`; the machine-readable results are in [\`${JSON_OUT.replace('review/', '')}\`](${JSON_OUT.replace('review/', '')}). Nothing in \`data/\` was changed. Bodies are cached outside the repository (\`.local/link-health/\`).`,
  '',
);
md.push(
  `Coverage: ${complete.length} of ${selected.length} sources complete, ${distinctUrls.size} distinct addresses requested.${complete.length < selected.length ? ' **Run in progress; this is a checkpoint.**' : ''}`,
  '',
);
md.push('## Method', '');
md.push(
  `Each source's \`evidenceUrl\` and \`canonicalUrl\` were requested once (once in all when they are the same), by GET with curl, one request at a time, at least 3 s apart per host, 30 s timeout per request, user agent \`${USER_AGENT}\`. Redirects were followed by hand, so the chain and final address are recorded. For each answer the status, content type, byte length and SHA-256 of the (decompressed) body are recorded. The requests went out from a cloud machine through this environment's proxy; "blocked" and "unreachable" mean "could not be checked from there", not "broken".`,
  '',
  'Every quotation (evidence with `passageType: quote`) was matched against the text extracted from the body: visible text first, then page source for HTML (some pages carry their article in a script blob), `pdftotext` for PDF (content-stream order, then reading order). Invisible format characters (bidi overrides that some PDF exporters wrap around each line, zero-width spaces, soft hyphens) are removed from the extracted text, and inline HTML tags are dropped without adding a space. **Verbatim** is an exact match; **normalised** folds whitespace, quotation marks and dashes only; anything else is **not found**. A not-found passage was then tried loosely (Unicode compatibility forms, CJK radical forms, case, soft and PDF line-end hyphens, control characters, marked elisions in order, and all whitespace and hyphens ignored); a loose hit is listed as a likely extraction artefact but not counted as a match.',
  '',
);
md.push('| Class | Meaning |', '| --- | --- |');
md.push(
  '| ok | Answered; every quotation found. |',
  '| changed | Answered with readable text, but some quotations not found. |',
  '| moved | Redirected to a different document (not http→https, `www.` or a trailing slash). |',
  '| gone | HTTP 4xx (other than 401/403/429) or 5xx, or no DNS record. |',
  "| blocked | HTTP 401/403/429, a challenge page, or a refusal by this environment's proxy. Not circumvented. |",
  "| unreachable | Timeout or connection reset; the proxy's relay log entry is recorded. |",
  '| unreadable | Answered, but no text to check the quotations against: script-rendered page, unsupported type, or an HTML landing or viewer page in which no quotation occurs even loosely. |',
  '',
  'A source takes the most severe class of its two addresses, in the order of the table (changed outranks blocked when one address was readable).',
  '',
);

md.push('## Summary', '', '### By class', '');
md.push('| Class | Sources |', '| --- | ---: |');
for (const c of CLASSES) {
  if (!counts[c]) continue;
  md.push(`| ${c} | ${counts[c]} |`);
  if (c === 'changed') {
    const hard = complete.filter(
      (r) =>
        r.class === 'changed' &&
        r.quotes?.some((q) => q.match === 'not-found' && !q.looseHit),
    ).length;
    md.push(
      `| — of which a quotation not found at all | ${hard} |`,
      `| — of which found only after loose folding | ${counts.changed - hard} |`,
    );
  }
}
md.push(`| **Total** | ${results.length} |`, '');
md.push(
  `Quotations checked: ${allQuotes.length}. Verbatim ${quoteCounts.verbatim}, normalised ${quoteCounts.normalised}, not found ${quoteCounts.notFound} (${quoteCounts.notFoundWithLooseHit} of them with a loose hit). Quotations of blocked, unreachable and unreadable sources are counted as not found here; the per-class lists below separate them.`,
  '',
);

md.push('### By host', '');
const byHost = new Map();
for (const r of complete) {
  if (!byHost.has(r.host))
    byHost.set(r.host, Object.fromEntries(SEVERITY.map((c) => [c, 0])));
  byHost.get(r.host)[r.class] += 1;
}
const hostRows = [...byHost.entries()].sort((a, b) => {
  const total = (x) => SEVERITY.reduce((n, c) => n + x[c], 0);
  return total(b[1]) - total(a[1]) || a[0].localeCompare(b[0]);
});
const shown = hostRows.filter(
  ([, c]) => c.ok !== SEVERITY.reduce((n, k) => n + c[k], 0) || c.ok >= 3,
);
const folded = hostRows.filter((row) => !shown.includes(row));
md.push(
  `Host of the \`evidenceUrl\`. Hosts with fewer than three sources, all ok, are folded into the last row.`,
  '',
);
md.push(
  `| Host | Sources | ${SEVERITY.join(' | ')} |`,
  `| --- | ---: | ${SEVERITY.map(() => '---:').join(' | ')} |`,
);
for (const [host, c] of shown)
  md.push(
    `| ${host} | ${SEVERITY.reduce((n, k) => n + c[k], 0)} | ${SEVERITY.map((k) => c[k] || '').join(' | ')} |`,
  );
if (folded.length)
  md.push(
    `| ${folded.length} other hosts | ${folded.reduce((n, [, c]) => n + c.ok, 0)} | ${SEVERITY.map((k) => (k === 'ok' ? folded.reduce((n, [, c]) => n + c.ok, 0) : '')).join(' | ')} |`,
  );
md.push('');

md.push(
  '## Reading and recommended next steps',
  '',
  NOTES_START,
  notes,
  NOTES_END,
  '',
);

const archiveCell = (r) =>
  r.archivedUrl ? `yes (${r.archivedAt ?? 'undated'})` : 'no';
const codexCell = (r) =>
  r.codexItems?.length ? `items ${r.codexItems.join(', ')}` : 'no';
const fieldLine = (r) =>
  Object.entries(r.fields)
    .filter(([, f]) => !f.sameAs)
    .map(
      ([k, f]) =>
        `\`${k}\` ${f.class}${f.detail ? ` (${esc(f.detail)})` : ''}${f.finalUrl ? ` → <${f.finalUrl}>` : ''}`,
    )
    .join('; ');

// A changed source whose every missing quotation has a loose hit is most
// likely an extraction artefact or a marked elision; listed apart.
const hardMiss = (r) =>
  r.quotes?.some((q) => q.match === 'not-found' && !q.looseHit);
const groups = [
  ['gone', 'Gone', complete.filter((r) => r.class === 'gone')],
  ['moved', 'Moved', complete.filter((r) => r.class === 'moved')],
  [
    'changed',
    'Changed: a quotation not found at all',
    complete.filter((r) => r.class === 'changed' && hardMiss(r)),
  ],
  [
    'changed',
    'Changed: quotations found only after loose folding',
    complete.filter((r) => r.class === 'changed' && !hardMiss(r)),
  ],
];
for (const [cls, heading, rows] of groups) {
  md.push(`## ${heading} (${rows.length})`, '');
  if (!rows.length) {
    md.push('None.', '');
    continue;
  }
  md.push(
    '| Source | Accessed | Addresses | Quotations | Archived copy in dataset | Codex list |',
    '| --- | --- | --- | --- | --- | --- |',
  );
  for (const r of rows) {
    const q = r.quoteCounts
      ? `${r.quoteCounts.verbatim + r.quoteCounts.normalised}/${r.quotes.length} found`
      : 'none';
    md.push(
      `| \`${r.id}\`<br>${esc(trim(r.title, 90))} | ${r.accessedAt} | ${fieldLine(r)} | ${q} | ${archiveCell(r)} | ${codexCell(r)} |`,
    );
  }
  md.push('');
  const failing = rows.filter((r) =>
    r.quotes?.some((q) => q.match === 'not-found'),
  );
  if (failing.length) {
    md.push(
      `### Quotations not found (${heading.split(':')[0].toLowerCase()}${cls === 'changed' ? (rows === groups[2][2] ? ', not found at all' : ', loose only') : ''})`,
      '',
    );
    for (const r of failing) {
      md.push(`- \`${r.id}\``);
      for (const q of r.quotes.filter((x) => x.match === 'not-found'))
        md.push(
          `  - \`${q.evidenceId}\` (${esc(q.locator)})${q.looseHit ? ` — loose hit: ${q.looseHit}` : ''}: “${esc(trim(q.passage, 220))}”`,
        );
    }
    md.push('');
  }
}

for (const cls of ['blocked', 'unreachable', 'unreadable']) {
  const rows = complete.filter((r) => r.class === cls);
  md.push(`## ${cls[0].toUpperCase()}${cls.slice(1)} (${rows.length})`, '');
  if (!rows.length) {
    md.push('None.', '');
    continue;
  }
  const reasons = new Map();
  for (const r of rows) {
    const f =
      Object.values(r.fields).find((x) => !x.sameAs && x.class === cls) ??
      r.fields.evidenceUrl;
    const key = `${r.host} — ${(f.detail ?? r.reasons?.[0] ?? '').replace(/curl exit (\d+): [^;]*/, 'curl exit $1').replace(/(proxy log: [\w_]+),.*$/, '$1')}`;
    if (!reasons.has(key)) reasons.set(key, []);
    reasons.get(key).push(r);
  }
  md.push(
    '| Host and reason | Sources | With archived copy | In Codex list |',
    '| --- | ---: | ---: | ---: |',
  );
  for (const [key, list] of [...reasons.entries()].sort(
    (a, b) => b[1].length - a[1].length,
  ))
    md.push(
      `| ${esc(trim(key, 200))} | ${list.length} | ${list.filter((r) => r.archivedUrl).length} | ${list.filter((r) => r.codexItems?.length).length} |`,
    );
  md.push('', `<details><summary>Sources</summary>`, '');
  for (const r of rows) md.push(`- \`${r.id}\` — ${fieldLine(r)}`);
  md.push('', '</details>', '');
}

md.push('## Comparison with recorded dates and hashes', '');
const withHash = complete.flatMap((r) =>
  Object.entries(r.fields)
    .filter(([, f]) => f.recordedHash)
    .map(([k, f]) => ({ r, k, f })),
);
const same = withHash.filter((x) => x.f.recordedHash.sameBytes);
md.push(
  `**Hashes.** ${withHash.length} requested addresses have a SHA-256 recorded for the same address in a pack or review file under \`research/\` or \`review/\`. ${same.length} of them returned identical bytes today; ${withHash.length - same.length} differ. A difference is expected for dynamic pages (scripts, timestamps, tracking) and for hashes taken of a compressed or differently negotiated body, so it is a prompt to look, not evidence of a changed text; the quotation check above is the substantive test.`,
  '',
);
const differing = withHash.filter(
  (x) => !x.f.recordedHash.sameBytes && x.r.class !== 'ok',
);
if (differing.length) {
  md.push('Differing hashes on sources that are not ok:', '');
  for (const x of differing)
    md.push(
      `- \`${x.r.id}\` (${x.r.class}), \`${x.k}\`; recorded in ${x.f.recordedHash.files.map((f) => `\`${f}\``).join(', ')}`,
    );
  md.push('');
}
const modified = complete.flatMap((r) =>
  Object.entries(r.fields)
    .filter(([, f]) => f.modifiedSinceAccess)
    .map(([k, f]) => ({ r, k, f })),
);
const withLm = complete.flatMap((r) =>
  Object.values(r.fields).filter((f) => f.lastModified),
).length;
md.push(
  `**Dates.** ${withLm} answers carried a \`Last-Modified\` header; for ${modified.length} it is later than the source's \`accessedAt\`. Many servers set the header to the time of the request, so this is weak evidence on its own.`,
  '',
);
const modifiedNotOk = modified.filter(
  (x) => !['ok', 'blocked', 'unreachable'].includes(x.r.class),
);
if (modifiedNotOk.length) {
  md.push('Modified since access, and not ok:', '');
  for (const x of modifiedNotOk)
    md.push(
      `- \`${x.r.id}\` (${x.r.class}): accessed ${x.r.accessedAt}, \`Last-Modified\` ${x.f.lastModified}`,
    );
  md.push('');
}

writeAtomic(MD_OUT, await formatted(MD_OUT, `${md.join('\n')}\n`));
console.log(
  `Wrote ${JSON_OUT} and ${MD_OUT}: ${CLASSES.filter((c) => counts[c])
    .map((c) => `${counts[c]} ${c}`)
    .join(', ')}.`,
);
