// Checks every external URL in data/sources.json (canonicalUrl, evidenceUrl,
// archivedUrl) for link rot. Needs the network; run manually, it is not part
// of `pnpm check`.
//
//   node scripts/check-links.mjs [--json <file>] [--id <sourceId>]...
//                                [--host <hostname>]... [--no-archive]
//
// Each distinct URL is requested once: HEAD first, then GET when HEAD fails or
// answers 4xx/5xx. Redirects are followed by hand (up to ten hops) so the
// final URL is recorded. At most four hosts are checked at once and each host
// is paced, one request at a time. Failures are retried once after a pause.
// web.archive.org is paced like scripts/check-wayback.mjs; a connection
// failure there is recorded as a tool limit, not as a broken link; after five
// in a row the remaining archive URLs are recorded as tool limits unrequested.
//
// Classes: ok, redirect, client-error (404, 410 and other 4xx), blocked (401,
// 403, 429, bot walls), server-error (5xx), dead-domain (no DNS record),
// network (timeouts, resets, refused tunnels), tool-limit.
//
// Results go to review/.local/ (ignored by Git). Exits 1 if any URL is
// client-error or dead-domain.
import { lookup } from 'node:dns/promises';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname } from 'node:path';

const CONCURRENCY = 4;
const HOST_PACE_MS = 1000;
const ARCHIVE_PACE_MS = 1500;
const TIMEOUT_MS = 30000;
const RETRY_PAUSE_MS = 10000;
const MAX_HOPS = 10;
const USER_AGENT = 'selekoa-link-check (source link rot check)';
const ARCHIVE_HOSTS = new Set(['web.archive.org']);
const ARCHIVE_GIVE_UP = 5;

const args = process.argv.slice(2);
const onlyIds = new Set();
const onlyHosts = new Set();
let includeArchive = true;
let jsonOut = `review/.local/link-check-${new Date().toISOString().slice(0, 10)}.json`;
for (let i = 0; i < args.length; i += 1) {
  if (args[i] === '--json') jsonOut = args[(i += 1)];
  else if (args[i] === '--id') onlyIds.add(args[(i += 1)]);
  else if (args[i] === '--host') onlyHosts.add(args[(i += 1)]);
  else if (args[i] === '--no-archive') includeArchive = false;
  else {
    console.error(`Unknown argument: ${args[i]}`);
    process.exit(2);
  }
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const sources = JSON.parse(
  readFileSync(new URL('../data/sources.json', import.meta.url), 'utf8'),
);

// url -> [{ id, field, accessedAt, archivedAt }]
const uses = new Map();
for (const source of sources) {
  if (onlyIds.size && !onlyIds.has(source.id)) continue;
  for (const field of ['canonicalUrl', 'evidenceUrl', 'archivedUrl']) {
    const url = source[field];
    if (!url || !/^https?:\/\//.test(url)) continue;
    const host = new URL(url).hostname;
    if (onlyHosts.size && !onlyHosts.has(host)) continue;
    if (!includeArchive && ARCHIVE_HOSTS.has(host)) continue;
    if (!uses.has(url)) uses.set(url, []);
    uses.get(url).push({
      id: source.id,
      field,
      accessedAt: source.accessedAt,
      archivedAt: source.archivedAt,
    });
  }
}

const BOT_WALL =
  /cf-browser-verification|challenge-platform|Just a moment\.\.\.|Attention Required! \| Cloudflare|captcha|Access Denied|Request unsuccessful\. Incapsula|perimeterx|datadome/i;

function errorDetail(error) {
  const cause = error?.cause;
  return `${cause?.code ?? error?.name ?? 'Error'} ${cause?.message ?? error?.message ?? ''}`.trim();
}

async function request(url, method) {
  const response = await fetch(url, {
    method,
    redirect: 'manual',
    signal: AbortSignal.timeout(TIMEOUT_MS),
    headers: {
      'user-agent': USER_AGENT,
      accept: 'text/html,application/xhtml+xml,application/pdf,*/*;q=0.8',
    },
  });
  let snippet = '';
  if (method === 'GET' && response.body) {
    // Read only the start of the page: enough to spot a bot wall.
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    while (snippet.length < 32768) {
      const { done, value } = await reader.read();
      if (done) break;
      snippet += decoder.decode(value, { stream: true });
    }
    await reader.cancel().catch(() => {});
  } else {
    await response.body?.cancel().catch(() => {});
  }
  return { status: response.status, headers: response.headers, snippet };
}

// Follows redirects by hand with one method; returns the final response.
async function follow(url, method) {
  const chain = [];
  let current = url;
  for (let hop = 0; hop <= MAX_HOPS; hop += 1) {
    const response = await request(current, method);
    if (response.status >= 300 && response.status < 400) {
      const location = response.headers.get('location');
      if (!location) return { ...response, finalUrl: current, chain };
      const next = new URL(location, current).href;
      chain.push({ status: response.status, to: next });
      current = next;
      continue;
    }
    return { ...response, finalUrl: current, chain };
  }
  return { status: 0, finalUrl: current, chain, loop: true, snippet: '' };
}

// Same document after trivial normalisation: scheme, www., trailing slash,
// default index file, case of the host.
function normalise(href) {
  try {
    const u = new URL(href);
    const host = u.hostname.toLowerCase().replace(/^www\./, '');
    const path = u.pathname
      .replace(/\/(index\.html?)?$/i, '')
      .replace(/\/+$/, '');
    return `${host}${path}${u.search}`;
  } catch {
    return href;
  }
}

function isHomepage(href) {
  try {
    const u = new URL(href);
    return /^\/?([a-z]{2}(-[a-z]{2})?\/?)?$/i.test(u.pathname) && !u.search;
  } catch {
    return false;
  }
}

function classify(url, response) {
  const { status, headers, snippet, finalUrl } = response;
  const base = {
    httpStatus: status,
    finalUrl: finalUrl !== url ? finalUrl : undefined,
  };
  if (response.loop)
    return { ...base, class: 'network', detail: 'redirect loop' };
  const challenge =
    headers?.get('cf-mitigated') === 'challenge' ||
    ([403, 429, 503].includes(status) && BOT_WALL.test(snippet ?? ''));
  if (challenge || [401, 403, 429].includes(status))
    return {
      ...base,
      class: 'blocked',
      detail: challenge ? 'bot wall' : `HTTP ${status}`,
    };
  if (status >= 200 && status < 300) {
    if (
      BOT_WALL.test(snippet ?? '') &&
      /<title>Just a moment|captcha/i.test(snippet)
    )
      return { ...base, class: 'blocked', detail: 'bot wall (200)' };
    if (finalUrl === url) return { ...base, class: 'ok' };
    if (normalise(finalUrl) === normalise(url))
      return { ...base, class: 'ok', detail: 'trivial redirect' };
    // A short-lived signed storage address: the stable URL stays the right
    // one, and the signed one is not worth keeping.
    if (/[?&]X-Amz-Signature=/.test(finalUrl))
      return {
        httpStatus: status,
        class: 'ok',
        detail: 'served from a signed storage URL',
      };
    // A login or cookie handshake that carries the original address back.
    if (finalUrl.includes(encodeURIComponent(url)))
      return { ...base, class: 'ok', detail: 'login or cookie handshake' };
    const toHomepage = isHomepage(finalUrl) && !isHomepage(url);
    return {
      ...base,
      class: 'redirect',
      detail: toHomepage ? 'redirects to a homepage' : 'moved',
    };
  }
  if (status === 404 || status === 410)
    return { ...base, class: 'client-error', detail: `HTTP ${status}` };
  if (status >= 400 && status < 500)
    return { ...base, class: 'client-error', detail: `HTTP ${status}` };
  if (status >= 500)
    return { ...base, class: 'server-error', detail: `HTTP ${status}` };
  return { ...base, class: 'network', detail: `HTTP ${status}` };
}

async function checkOnce(url) {
  const host = new URL(url).hostname;
  try {
    await lookup(host);
  } catch (error) {
    if (['ENOTFOUND', 'ENODATA'].includes(error?.code))
      return { class: 'dead-domain', detail: `DNS ${error.code}` };
  }
  let head;
  try {
    head = await follow(url, 'HEAD');
    if (head.status >= 200 && head.status < 400) return classify(url, head);
  } catch {
    head = null;
  }
  try {
    return classify(url, await follow(url, 'GET'));
  } catch (error) {
    if (head) return classify(url, head);
    const result = { class: 'network', detail: errorDetail(error) };
    if (ARCHIVE_HOSTS.has(host)) result.class = 'tool-limit';
    return result;
  }
}

const RETRY = new Set([
  'network',
  'server-error',
  'tool-limit',
  'client-error',
]);

async function check(url) {
  const first = await checkOnce(url);
  if (!RETRY.has(first.class)) return first;
  await sleep(RETRY_PAUSE_MS);
  const second = await checkOnce(url);
  // Keep the better of the two; record that the first attempt failed.
  const rank = [
    'ok',
    'redirect',
    'blocked',
    'server-error',
    'client-error',
    'tool-limit',
    'network',
    'dead-domain',
  ];
  const best =
    rank.indexOf(second.class) <= rank.indexOf(first.class) ? second : first;
  return best === first
    ? { ...first, retried: true }
    : { ...second, retried: true, firstAttempt: first.class };
}

// One queue per host, at most CONCURRENCY hosts at once.
const byHost = new Map();
for (const url of uses.keys()) {
  const host = new URL(url).hostname;
  if (!byHost.has(host)) byHost.set(host, []);
  byHost.get(host).push(url);
}
const hostQueue = [...byHost.entries()].sort(
  (a, b) => b[1].length - a[1].length,
);
const results = [];
let done = 0;

async function worker() {
  for (;;) {
    const next = hostQueue.shift();
    if (!next) return;
    const [host, urls] = next;
    const archive = ARCHIVE_HOSTS.has(host);
    const pace = archive ? ARCHIVE_PACE_MS : HOST_PACE_MS;
    let failures = 0;
    for (const url of urls) {
      // The Archive refuses or resets connections from some networks; once it
      // has failed several times in a row, stop asking it.
      const skip = archive && failures >= ARCHIVE_GIVE_UP;
      const outcome = skip
        ? {
            class: 'tool-limit',
            detail: `not requested after ${ARCHIVE_GIVE_UP} consecutive connection failures`,
          }
        : await check(url);
      failures = outcome.class === 'tool-limit' ? failures + 1 : 0;
      const result = { url, host, uses: uses.get(url), ...outcome };
      results.push(result);
      done += 1;
      if (result.class !== 'ok') {
        console.log(
          `${result.class.padEnd(12)} ${url}${result.finalUrl ? ` -> ${result.finalUrl}` : ''}${result.detail ? ` (${result.detail})` : ''}`,
        );
      }
      if (done % 50 === 0) console.log(`... ${done}/${uses.size}`);
      if (!skip) await sleep(pace);
    }
  }
}

await Promise.all(Array.from({ length: CONCURRENCY }, worker));
results.sort((a, b) => a.url.localeCompare(b.url));

const classes = [
  'ok',
  'redirect',
  'client-error',
  'blocked',
  'server-error',
  'dead-domain',
  'network',
  'tool-limit',
];
const counts = Object.fromEntries(
  classes.map((c) => [c, results.filter((r) => r.class === c).length]),
);
console.log(
  `Checked ${results.length} URLs: ${classes.map((c) => `${counts[c]} ${c}`).join(', ')}.`,
);
mkdirSync(dirname(jsonOut), { recursive: true });
writeFileSync(
  jsonOut,
  `${JSON.stringify({ checkedAt: new Date().toISOString(), counts, results }, null, 2)}\n`,
);
console.log(`Wrote ${jsonOut}`);
process.exit(
  results.some((r) => ['client-error', 'dead-domain'].includes(r.class))
    ? 1
    : 0,
);
