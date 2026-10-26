// Optional live replay. Generation and tests never invoke the network.
import { createHash } from 'node:crypto';
import { mkdir, writeFile } from 'node:fs/promises';

if (process.argv.slice(2).join(' ') !== '--replay')
  throw new Error(
    'Use node scripts/research-sl4-search.mjs --replay. Writes an exclusive ignored .local/sl4-replay.json; never changes frozen research.',
  );
const responses = [];
const candidates = [];
const hits = [];
async function get(id, url) {
  try {
    const r = await fetch(url, { signal: AbortSignal.timeout(15000) });
    const bytes = Buffer.from(await r.arrayBuffer());
    responses.push({
      id,
      url,
      resolvedUrl: r.url,
      status: r.status,
      sha256: createHash('sha256').update(bytes).digest('hex'),
    });
    return r.ok ? bytes.toString('utf8') : null;
  } catch {
    responses.push({ id, url, status: null, retrieval: 'failed' });
    return null;
  }
}
for (let year = 1; year <= 4; year++) {
  for (let month = 1; month <= 12; month++) {
    const ym = String(year).padStart(2, '0') + String(month).padStart(2, '0');
    const url = `http://sl4.org/archive/${ym}/date.html`;
    const html = await get('sl4-index-' + ym, url);
    if (html === null) continue;
    const rows = html.matchAll(
      /<li><a href="([^"]+)"><strong>(.*?)<\/strong><\/a>.*?<em>(.*?)<\/em>.*?<em>\((.*?)\)<\/em>/g,
    );
    for (const row of rows) {
      if (
        /^\d+\.html$/.test(row[1]) &&
        /volition|summary of current FAI/i.test(row[2])
      )
        candidates.push({
          id: `sl4-${ym}-${row[1].replace('.html', '')}`,
          url: new URL(row[1], url).href,
          subject: row[2],
        });
    }
  }
}
for (const c of candidates) {
  const html = await get(c.id, c.url);
  if (html === null) continue;
  const body =
    html.split('<!-- body="start" -->')[1]?.split('<!-- body="end" -->')[0] ??
    html;
  const plain = body.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ');
  if (/coherent\s+extrapolated\s+volition/i.test(plain)) hits.push(c.id);
}
await mkdir('.local', { recursive: true });
await writeFile(
  '.local/sl4-replay.json',
  JSON.stringify(
    {
      method:
        '2001–2004 indexes; title-screened bodies; stripped/collapsed case-insensitive exact phrase. Counts are retrieval results, not historical absence.',
      responses,
      candidates,
      hits,
    },
    null,
    2,
  ) + '\n',
  { flag: 'wx' },
);
console.log(
  `Replay: ${candidates.length} selected bodies, ${hits.length} matching bodies. Inspect contexts and failures; do not infer priority. Frozen research unchanged.`,
);
