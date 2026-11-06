// Seeded audit sample for pack 2: every Q05 cell; 6 of the not-found cells on Q07–Q14;
// 16 of the remaining cells. Writes audit-sample.json and audit/pack-answers.json.
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const DIR = join(dirname(fileURLToPath(import.meta.url)), '..');
const SEED = 20261104;
let x = SEED >>> 0;
const rnd = () => (
  (x = (Math.imul(x, 1664525) + 1013904223) >>> 0),
  x / 2 ** 32
);
const shuffle = (a) => {
  a = [...a];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};
const pack = JSON.parse(readFileSync(join(DIR, 'pack.json'), 'utf8'));
const id = (c) => `${c.card}:${c.question}`;
const q05 = pack.cells.filter((c) => c.question === 'Q05');
const nf = pack.cells.filter(
  (c) =>
    c.status === 'not-found' &&
    ['Q07', 'Q08', 'Q09', 'Q10', 'Q11', 'Q12', 'Q13', 'Q14'].includes(
      c.question,
    ),
);
const nfPick = shuffle(nf).slice(0, 6);
const used = new Set([...q05, ...nfPick].map(id));
const rest = shuffle(pack.cells.filter((c) => !used.has(id(c)))).slice(0, 16);
const items = [
  ...q05.map((c) => ({
    id: id(c),
    why: 'targeted: framework determination (Q05)',
  })),
  ...nfPick.map((c) => ({ id: id(c), why: 'targeted: not-found on Q07–Q14' })),
  ...rest.map((c) => ({ id: id(c), why: 'random' })),
].map((it, i) => ({ n: i + 1, ...it }));
writeFileSync(
  join(DIR, 'audit-sample.json'),
  JSON.stringify(
    {
      seed: SEED,
      method:
        'Linear congruential generator in audit/sample.mjs (seed 20261104): every Q05 cell; 6 of the not-found cells on Q07–Q14; 16 of the remaining cells.',
      items,
    },
    null,
    2,
  ) + '\n',
);
const byId = new Map(pack.cells.map((c) => [id(c), c]));
writeFileSync(
  join(DIR, 'audit', 'pack-answers.json'),
  JSON.stringify(
    items.map((it) => ({ n: it.n, id: it.id, ...byId.get(it.id) })),
    null,
    2,
  ) + '\n',
);
console.log(`${items.length} items`);
