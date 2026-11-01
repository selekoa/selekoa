// Lists the dataset's proposition records, dated 2000 or later, on concepts that
// overlap this pack's propositions, so that the pack links them instead of
// re-recording them. Usage: node research/risk-debate/dataset-overlap.mjs
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const DIR = dirname(fileURLToPath(import.meta.url));
const DATA = join(DIR, '..', '..', 'data');
const read = (f) => JSON.parse(readFileSync(join(DATA, f), 'utf8'));
const entities = new Map(read('entities.json').map((e) => [e.id, e]));
const claims = read('claims.json');
const props = JSON.parse(readFileSync(join(DIR, 'propositions.json'), 'utf8'));
const STANCE = {
  articulates_proposition: 'articulates',
  contests_proposition: 'contests',
  bears_on_proposition: 'bears_on',
};

const out = [];
for (const p of props.propositions)
  for (const o of p.overlaps ?? []) {
    const records = claims
      .filter(
        (c) =>
          STANCE[c.predicate] &&
          c.object?.entityId === o.id &&
          String(c.time?.date ?? '') >= '2000',
      )
      .map((c) => ({
        claimId: c.id,
        document: c.subject,
        shortName: entities.get(c.subject)?.shortName ?? null,
        date: c.time?.date ?? null,
        stance: STANCE[c.predicate],
        roles: c.attributes?.thought?.roles ?? [],
      }))
      .sort((a, b) => String(a.date).localeCompare(String(b.date)));
    out.push({ pack: p.code, dataset: o.code, concept: o.id, records });
  }
writeFileSync(
  join(DIR, 'dataset-overlap.json'),
  JSON.stringify(out, null, 2) + '\n',
);
console.log(
  out.map((o) => `${o.pack}↔${o.dataset}: ${o.records.length}`).join('\n'),
);
