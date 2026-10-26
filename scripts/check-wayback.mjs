// Checks that each Wayback archivedUrl in data/sources.json names the capture
// the Internet Archive actually serves. Needs the network; run manually, it is
// not part of `pnpm check`.
//
//   node scripts/check-wayback.mjs [--json <file>] [--id <sourceId>]...
//
// Requests https://web.archive.org/web/<timestamp>id_/<url> without following
// redirects, sequentially, with about one second of pacing and up to three
// attempts on timeouts. Exits 1 on any redirect to another capture, 404 or
// failure.
import { readFileSync, writeFileSync } from 'node:fs';

const PACE_MS = 1500;
const TIMEOUT_MS = 30000;
const ATTEMPTS = 3;
const BACKOFF_MS = 20000; // the Archive refuses connections when polled too fast

const args = process.argv.slice(2);
const only = new Set();
let jsonOut = null;
for (let i = 0; i < args.length; i += 1) {
  if (args[i] === '--json') jsonOut = args[(i += 1)];
  else if (args[i] === '--id') only.add(args[(i += 1)]);
  else {
    console.error(`Unknown argument: ${args[i]}`);
    process.exit(2);
  }
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const sources = JSON.parse(
  readFileSync(new URL('../data/sources.json', import.meta.url), 'utf8'),
);
const archivePattern =
  /^https?:\/\/web\.archive\.org\/web\/(\d{4,14})[a-z_]*\/(.+)$/;

async function probe(timestamp, original) {
  const url = `https://web.archive.org/web/${timestamp}id_/${original}`;
  let last = 'failed: no attempt';
  for (let attempt = 1; attempt <= ATTEMPTS; attempt += 1) {
    try {
      const response = await fetch(url, {
        method: 'GET',
        redirect: 'manual',
        signal: AbortSignal.timeout(TIMEOUT_MS),
        headers: { 'user-agent': 'selekoa-wayback-check' },
      });
      await response.body?.cancel();
      if (response.status >= 300 && response.status < 400) {
        const location = response.headers.get('location') ?? '';
        const match = location.match(/\/web\/(\d{4,14})[a-z_]*\//);
        if (match)
          return match[1] === timestamp
            ? { status: 'exact' }
            : { status: 'redirect', served: match[1] };
        return {
          status: 'failed',
          detail: `redirect without capture timestamp: ${location}`,
        };
      }
      if (response.status === 200) return { status: 'exact' };
      if (response.status === 404) return { status: '404' };
      last = `failed: HTTP ${response.status}`;
    } catch (error) {
      last =
        `failed: ${error?.name ?? 'Error'} ${error?.cause?.code ?? error?.message ?? ''}`.trim();
    }
    if (attempt < ATTEMPTS) await sleep(BACKOFF_MS * attempt);
  }
  return { status: 'failed', detail: last };
}

const targets = sources.filter(
  (s) =>
    s.archivedUrl &&
    archivePattern.test(s.archivedUrl) &&
    (only.size === 0 || only.has(s.id)),
);
const results = [];
for (const source of targets) {
  const [, timestamp, original] = source.archivedUrl.match(archivePattern);
  const result = {
    id: source.id,
    recorded: timestamp,
    archivedAt: source.archivedAt,
    ...(await probe(timestamp, original)),
  };
  results.push(result);
  if (result.status !== 'exact') {
    console.log(
      `${result.status.padEnd(8)} ${source.id} ${timestamp}${result.served ? ` -> ${result.served}` : ''}${result.detail ? ` (${result.detail})` : ''}`,
    );
  }
  await sleep(PACE_MS);
}

const count = (status) => results.filter((r) => r.status === status).length;
console.log(
  `Checked ${results.length}: ${count('exact')} exact, ${count('redirect')} redirect, ${count('404')} 404, ${count('failed')} failed.`,
);
if (jsonOut) writeFileSync(jsonOut, `${JSON.stringify(results, null, 2)}\n`);
process.exit(results.some((r) => r.status !== 'exact') ? 1 : 0);
