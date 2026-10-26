// Mapping self-audit of the economics admission: a seeded random sample of
// admitted records, each compared field by field with the candidate packs.
//
//   pnpm tsx scripts/economics-admission-audit.ts           write the report
//   pnpm tsx scripts/economics-admission-audit.ts --check   compare with it
//
// A difference is "mapped" when the admission map accounts for it, and
// "drift" otherwise.
import { readFileSync, writeFileSync } from 'node:fs';

type Json = Record<string, any>; // eslint-disable-line @typescript-eslint/no-explicit-any
const read = (path: string) => JSON.parse(readFileSync(path, 'utf8'));
const date = '2026-10-14';
const output = `review/economics-admission-audit-${date}.json`;
const growth: Json = read('research/economics-growth/pack.json');
const mainstream: Json = read('research/economics-mainstream/pack.json');
const map: Json = read(`review/economics-admission-map-${date}.json`);
const claims: Json[] = read('data/claims.json');
const evidence: Json[] = read('data/evidence.json');
const entities = new Map<string, Json>(
  read('data/entities.json').map((e: Json) => [e.id, e]),
);

const passages = new Map<string, Json>([
  ...growth.propositions.flatMap((p: Json) =>
    p.passages.map((x: Json) => [
      x.id,
      {
        ...x,
        code: p.id,
        s: growth.sources.find((s: Json) => s.id === x.source),
        tier: growth.sources.find((s: Json) => s.id === x.source).tier.value,
      },
    ]),
  ),
  ...mainstream.passages.map((x: Json) => {
    const s = mainstream.sources.find((y: Json) => y.id === x.source);
    return [x.id, { ...x, code: x.proposition, s, tier: s.tier }];
  }),
]);

// mulberry32, as in the packs' audits.
const seed = 20261014;
function mulberry32(a: number) {
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const pool = claims
  .filter((c) => c.id.startsWith('ec-'))
  .map((c) => c.id)
  .sort();
const random = mulberry32(seed);
const shuffled = [...pool];
for (let i = shuffled.length - 1; i > 0; i--) {
  const j = Math.floor(random() * (i + 1));
  [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
}
const sample = shuffled.slice(0, 25).sort();

const predicateOf: Record<string, string> = {
  articulates: 'articulates_proposition',
  contests: 'contests_proposition',
  'bears-on': 'bears_on_proposition',
};
const normal = (s: string) => s.replace(/\s+/g, ' ').trim();

const records = sample.map((id) => {
  const claim = claims.find((c) => c.id === id)!;
  const thought = claim.attributes.thought;
  const items = evidence.filter((e) => e.claimId === id);
  const drift: string[] = [];
  const mapped: string[] = [];
  const checked: string[] = [];
  for (const e of items) {
    const pid = (e.note as string).match(/passage (\S+) \(/)![1];
    const p = passages.get(pid)!;
    const field = (name: string, ok: boolean, how?: string) => {
      checked.push(`${pid} ${name}`);
      if (ok) return;
      if (how) mapped.push(`${pid} ${name}: ${how}`);
      else drift.push(`${pid} ${name}`);
    };
    const proposition = entities.get(claim.object.entityId);
    field('proposition', proposition?.proposition?.code === p.code);
    field('predicate', claim.predicate === predicateOf[p.relation]);
    field(
      'quotation',
      e.passage === p.quote,
      map.quoteChanges[pid] && e.passage === map.quoteChanges[pid].quote
        ? 'shortened under the admission map'
        : undefined,
    );
    field('locator', e.locator === p.locator);
    field('context', normal(claim.statement).includes(normal(p.context)));
    if (p.qualification)
      field(
        'qualification',
        normal(claim.qualification).includes(normal(p.qualification)),
      );
    field('date', claim.time.date === p.s.date.value);
    field(
      'attested date',
      (thought.attested?.date ?? null) === (p.s.attested?.value ?? null),
    );
    field('tier', thought.tier?.value === p.tier);
    for (const role of p.roles ?? [])
      if (role.startsWith('earliest-located'))
        field(`role ${role}`, thought.roles.includes(role));
    field('context-only', Boolean(e.contextOnly) === Boolean(p.contextOnly));
    if (p.contextOnly)
      field(
        'context required',
        e.contextOnly?.requires === p.contextOnly.requires,
      );
    if (p.conditions)
      field(
        'conditions',
        normal(thought.conditions ?? '').includes(normal(p.conditions)),
      );
    if (p.missing)
      field(
        'missing element',
        normal(thought.missing ?? '').includes(normal(p.missing)),
      );
    if (p.engagement)
      field(
        'engagement',
        thought.engagement?.kind === p.engagement,
        thought.engagement?.kind === 'engages-premise'
          ? 'message-level rule: the record engages a premise when any of its passages does'
          : undefined,
      );
    if (p.estimate)
      field(
        'estimate',
        (thought.estimates ?? []).some(
          (x: Json) =>
            x.holder === p.estimate.holder && x.value === p.estimate.value,
        ),
      );
  }
  return {
    claimId: id,
    passages: items.length,
    checked: checked.length,
    drift,
    mapped,
  };
});

const report = {
  description:
    'Mapping self-audit of the economics admission: 25 admitted records drawn at random (mulberry32, seed 20261014) and compared field by field with research/economics-growth/pack.json and research/economics-mainstream/pack.json. It checks the mapping, not the sources; the quotations were re-checked against freshly retrieved copies separately (economics-admission-quote-check-2026-10-14.json). Machine-run by the admitting session; not a fresh-context or human review.',
  seed,
  sampled: sample.length,
  of: pool.length,
  drift: records.reduce((n, r) => n + r.drift.length, 0),
  mapped: records.reduce((n, r) => n + r.mapped.length, 0),
  fieldsChecked: records.reduce((n, r) => n + r.checked, 0),
  records,
};
const text = JSON.stringify(report, null, 2) + '\n';
if (process.argv.includes('--check')) {
  if (JSON.stringify(read(output)) !== JSON.stringify(report)) {
    console.error('The audit report differs from the stored one.');
    process.exitCode = 1;
  } else console.log('Audit report matches.');
} else {
  writeFileSync(output, text);
  console.log(
    `${report.sampled} records, ${report.fieldsChecked} fields: ${report.drift} drift, ${report.mapped} mapped.`,
  );
}
