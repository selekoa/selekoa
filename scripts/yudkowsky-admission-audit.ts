// Mapping self-audit of the Yudkowsky admission: a seeded random sample of
// admitted records, each compared field by field with the candidate pack.
//
//   pnpm tsx scripts/yudkowsky-admission-audit.ts           write the report
//   pnpm tsx scripts/yudkowsky-admission-audit.ts --check   compare with it
//
// A difference is "mapped" when the admission map or the recorded dating
// rules account for it, and "drift" otherwise.
import { readFileSync, writeFileSync } from 'node:fs';

type Json = Record<string, any>; // eslint-disable-line @typescript-eslint/no-explicit-any
const read = (path: string) => JSON.parse(readFileSync(path, 'utf8'));
const date = '2026-10-08';
const output = `review/yudkowsky-admission-audit-${date}.json`;
const pack: Json = read('research/yudkowsky-arguments/pack.json');
const map: Json = read(`review/yudkowsky-admission-map-${date}.json`);
const claims: Json[] = read('data/claims.json');
const evidence = new Map<string, Json>(
  read('data/evidence.json').map((e: Json) => [e.id, e]),
);
const sources = new Map<string, Json>(pack.sources.map((s: Json) => [s.id, s]));
const passages = new Map<string, Json>(
  pack.takes.flatMap((t: Json) =>
    t.passages.map((p: Json) => [p.id.toLowerCase(), { ...p, take: t.id }]),
  ),
);

// mulberry32, as in the cross-family check of the pack.
const seed = 20261008;
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
  .filter((c) => c.id.startsWith('yk-'))
  .map((c) => c.id)
  .sort();
const random = mulberry32(seed);
const shuffled = [...pool];
for (let i = shuffled.length - 1; i > 0; i--) {
  const j = Math.floor(random() * (i + 1));
  [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
}
const sample = shuffled.slice(0, 20).sort();

const predicateOf: Record<string, string> = {
  'said-it': 'articulates_proposition',
  'earlier-self': 'articulates_proposition',
  'answered-it': 'contests_proposition',
  disagrees: 'contests_proposition',
  related: 'bears_on_proposition',
};
const datedBy: Record<string, string> = {
  'doc-aipnf': map.documents['doc-aipnf'].draft.date,
  'doc-sits-2000-capture': map.documents['doc-sits-2000-capture'].date,
  'ext-extropians.96-3124': map.documents['ext-extropians.96-3124'].date,
};

const records = sample.map((id) => {
  const claim = claims.find((c) => c.id === id)!;
  const thought = claim.attributes.thought;
  const findings: { field: string; kind: 'mapped' | 'drift'; note: string }[] =
    [];
  const note = (field: string, kind: 'mapped' | 'drift', text: string) =>
    findings.push({ field, kind, note: text });
  const items = claim.evidenceIds
    .map((e: string) => evidence.get(e)!)
    .filter((e: Json) => /^evidence-yk-t\d\d-[a-z0-9]+$/.test(e.id));
  const checked: string[] = [];
  for (const e of items) {
    const p = passages.get(e.id.replace('evidence-yk-', ''))!;
    const pid = p.id;
    checked.push(pid);
    const s = sources.get(p.source)!;
    const code = 'Y' + p.take.slice(1);
    if (claim.object.entityId !== map.propositions[p.take].id)
      note('proposition', 'drift', `${pid} belongs to ${p.take}, not ${code}`);
    if (claim.predicate !== predicateOf[p.relation])
      note('predicate', 'drift', `${pid}: ${p.relation} → ${claim.predicate}`);
    const change = map.quoteChanges[pid];
    if (e.passage !== p.quote)
      note(
        'quotation',
        change ? 'mapped' : 'drift',
        `${pid}: ${change ? (change.paraphrase ? 'paraphrased' : 'shortened or replaced') + ' under the quotation limit' : 'differs from the pack'}`,
      );
    if (e.locator !== p.locator)
      note('locator', 'drift', `${pid}: locator differs`);
    if (e.checkedAt !== p.checkedAt)
      note('check date', 'drift', `${pid}: ${p.checkedAt} → ${e.checkedAt}`);
    if (!claim.statement.includes(p.context))
      note('context', 'drift', `${pid}: context missing from the statement`);
    if (p.qualification && !claim.qualification.includes(p.qualification))
      note('qualification', 'drift', `${pid}: qualification not kept verbatim`);
    if (
      !claim.qualification.includes(
        pack.takes
          .find((t: Json) => t.id === p.take)
          .premises.find((x: Json) => x.id === p.premise).text,
      )
    )
      note('premise', 'drift', `${pid}: premise not named`);
    const expected = datedBy[p.source] ?? s.date.value;
    if (claim.time.date !== expected)
      note('date', 'drift', `${pid}: ${expected} → ${claim.time.date}`);
    else if (expected !== s.date.value)
      note(
        'date',
        'mapped',
        `${pid}: dated ${expected} (pack source date ${s.date.value}) by the recorded dating rule`,
      );
    if (!claim.time.note.includes(s.date.basis) && !datedBy[p.source])
      note('date basis', 'drift', `${pid}: date basis not kept`);
    const roles: string[] = thought.roles;
    if (roles.includes('strongest' as never))
      note('roles', 'drift', `${pid}: "strongest" stored`);
    if (p.roles.includes('earliest-located')) {
      if (p.relation === 'related')
        note(
          'roles',
          'mapped',
          `${pid}: earliest located on a related passage is not carried over`,
        );
      else if (!roles.includes('earliest-located'))
        note('roles', 'drift', `${pid}: earliest located lost`);
    }
    if (
      p.roles.includes('later-restatement') &&
      !roles.includes('later-restatement')
    )
      note('roles', 'drift', `${pid}: later restatement lost`);
    if (p.roles.includes('strongest'))
      note('roles', 'mapped', `${pid}: "strongest" left to the consuming app`);
    if (Boolean(p.cardUse) !== Boolean(e.contextOnly))
      note('context-only', 'drift', `${pid}: context-only flag differs`);
    if (p.voice === 'retrospective' && !thought.retrospective)
      note('retrospective', 'drift', `${pid}: retrospective flag missing`);
    if (p.voice === 'fiction' && thought.register !== 'fiction')
      note('register', 'drift', `${pid}: fiction not labelled`);
    if (
      p.relation === 'answered-it' &&
      thought.engagement?.kind !== 'engages-premise'
    )
      note(
        'engagement',
        'drift',
        `${pid}: answered-it not recorded as engaging a premise`,
      );
    if (
      p.relation === 'disagrees' &&
      thought.engagement?.kind !== 'contrary-only'
    ) {
      const mixed = claim.evidenceIds.length > 1;
      note(
        'engagement',
        mixed ? 'mapped' : 'drift',
        `${pid}: disagrees${mixed ? ', merged into a record that also engages a premise' : ' not recorded as contrary only'}`,
      );
    }
    if (p.relation === 'related' && !thought.missing)
      note('missing element', 'drift', `${pid}: no missing element`);
  }
  return {
    claimId: id,
    passages: checked,
    result: findings.some((f) => f.kind === 'drift')
      ? 'drift'
      : findings.length
        ? 'mapped differences only'
        : 'identical',
    findings,
  };
});

const report = {
  description:
    'Mapping self-audit of the Yudkowsky admission: 20 admitted records drawn at random and compared field by field with research/yudkowsky-arguments/pack.json. It checks the mapping, not the sources: the passages themselves were checked against their sources before the pack was merged (#15). Machine-run by the admitting session; not a fresh-context or human review.',
  date,
  method: `Seed ${seed}, mulberry32, Fisher–Yates shuffle of the ${pool.length} admitted claim IDs sorted lexicographically; the first 20 are taken. For each pack passage of a sampled record: proposition, predicate, quotation, locator, check date, context, qualification, premise, date and date basis, roles, context-only flag, retrospective flag, register, engagement and missing element.`,
  sampled: sample,
  passagesCompared: records.reduce((n, r) => n + r.passages.length, 0),
  drift: records.filter((r) => r.result === 'drift').map((r) => r.claimId),
  records,
};
const text = JSON.stringify(report, null, 2) + '\n';
if (process.argv.includes('--check')) {
  if (JSON.stringify(read(output)) !== JSON.stringify(report)) {
    console.error('The audit report differs from the stored records.');
    process.exitCode = 1;
  } else console.log('The audit report matches.');
} else {
  writeFileSync(output, text);
  console.log(
    `${sample.length} records, ${report.passagesCompared} passages; drift in ${report.drift.length}.`,
  );
}
