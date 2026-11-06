// Retrieves a LessWrong / Alignment Forum post through the site's public GraphQL
// endpoint (the HTML pages return HTTP 403 to this environment) and stores its
// body in the pack cache under the given key.
// Usage: node research/predictions/lw-fetch.mjs <key> <postId>
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const [key, id] = process.argv.slice(2);
const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const CACHE = join(ROOT, '.local', 'predictions', 'doc');
mkdirSync(CACHE, { recursive: true });
const url = 'https://www.lesswrong.com/graphql';
const query = `{ post(input:{selector:{_id:"${id}"}}){ result { title postedAt pageUrl user { displayName } contents { html } } } }`;
const out = execFileSync(
  'curl',
  [
    '-sS',
    '-m',
    '60',
    '-X',
    'POST',
    url,
    '-H',
    'content-type: application/json',
    '-A',
    'Mozilla/5.0',
    '-d',
    JSON.stringify({ query }),
  ],
  { encoding: 'utf8', maxBuffer: 64 << 20 },
);
const post = JSON.parse(out).data.post.result;
const html = `<h1>${post.title}</h1><p>${post.user?.displayName ?? ''}, ${post.postedAt}</p>${post.contents.html}`;
writeFileSync(join(CACHE, `${key}.html`), html);
writeFileSync(
  join(CACHE, `${key}.json`),
  JSON.stringify(
    {
      key,
      requestedUrl: `${url} (post ${id})`,
      finalUrl: post.pageUrl,
      httpStatus: 200,
      contentType: 'application/json (GraphQL)',
      bytes: Buffer.byteLength(html),
      sha256: createHash('sha256').update(html).digest('hex'),
      retrievedAt: new Date().toISOString(),
      postedAt: post.postedAt,
    },
    null,
    2,
  ),
);
console.log(`${key}: ${post.title} (${post.postedAt}), ${html.length} chars`);
