// Integrator's changes to the drafts before merge: one definition per shared source and
// document, and record corrections found at the first merge. Idempotent; prints what it changed.
// Usage: node research/risk-debate/reconcile.mjs
import { readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const DIR = join(dirname(fileURLToPath(import.meta.url)), 'drafts');
const files = readdirSync(DIR)
  .filter((f) => f.endsWith('.json'))
  .sort();
const drafts = Object.fromEntries(
  files.map((f) => [f, JSON.parse(readFileSync(join(DIR, f), 'utf8'))]),
);
const log = [];

// 1. Two ids for one text: keep the first.
const RENAME = {
  'bengio-2024-reasoning-arguments': 'bengio-2024-reasoning-through-arguments',
};
for (const [f, d] of Object.entries(drafts)) {
  const before = JSON.stringify(d);
  let after = before;
  for (const [from, to] of Object.entries(RENAME))
    after = after.replaceAll(`"${from}"`, `"${to}"`);
  if (after !== before) {
    drafts[f] = JSON.parse(after);
    log.push(`${f}: renamed ${Object.keys(RENAME).join(', ')}`);
  }
}

// 2. One definition per shared source and document. The canonical copy is the one named
// here (the more careful word count or version note), otherwise the first draft's.
const CANONICAL = {
  'belrose-pope-2023-ai-easy-to-control': 'goals-and-drives.json', // essay-only word count
  'bostrom-2003-ethical-issues': 'takeoff.json', // full text to the reference list; revision note
  'brooks-2017-seven-deadly-sins': 'takeoff.json', // body without comments; writing date noted
};
for (const kind of ['sources', 'documents']) {
  const idOf = (x) => (kind === 'sources' ? x.key : x.id);
  const all = new Map();
  for (const f of files)
    for (const x of drafts[f][kind] ?? []) {
      const list = all.get(idOf(x)) ?? [];
      list.push({ f, x });
      all.set(idOf(x), list);
    }
  for (const [id, list] of all) {
    if (list.length < 2) continue;
    const canon = list.find((l) => l.f === CANONICAL[id]) ?? list[0];
    for (const l of list) {
      if (JSON.stringify(l.x) === JSON.stringify(canon.x)) continue;
      const arr = drafts[l.f][kind];
      arr[arr.indexOf(l.x)] = structuredClone(canon.x);
      log.push(`${l.f}: ${kind} ${id} set to the definition in ${canon.f}`);
    }
  }
}

// 3. Record corrections.
const recs = new Map();
for (const f of files)
  for (const r of drafts[f].records ?? []) recs.set(r.id, { f, r });
const fix = (id, change, why) => {
  // Reclassified records carry a -context suffix after the first run.
  const hit = recs.get(id) ?? recs.get(`${id}-context`);
  if (!hit) return log.push(`MISSING ${id}`);
  const before = JSON.stringify(hit.r);
  change(hit.r);
  if (JSON.stringify(hit.r) !== before) log.push(`${hit.f}: ${id}: ${why}`);
};
// The 2003 paper is read in the author's undated revised version (as the goals-and-drives
// record already says), so its wording cannot be earliest located.
fix(
  'rd-r05-bostrom-2003-ethical-issues',
  (r) => {
    r.attested = {
      date: null,
      note: "The wording is read in the undated revised version on the author's site; the 2003 printed wording was not compared, so the date from which it is attested is unknown.",
    };
    r.roles = ['articulation'];
  },
  'undated revised wording: attested date unknown; earliest-located role removed',
);
// "Most developed" is a role of articulations only.
for (const id of [
  'rd-r02-thorstad-2026-instrumental-convergence-contests',
  'rd-r05-thorstad-2022-against-singularity-hypothesis-contests',
])
  fix(
    id,
    (r) => {
      r.roles = r.roles.map((x) => (x === 'most-developed' ? 'contesting' : x));
      r.roles = [...new Set(r.roles)];
    },
    'most-developed is not a role of contesting records',
  );
// R05 requires a short period (hours to months) or a fast/hard/discontinuous/foom name.
fix(
  'rd-r05-chalmers-singularity',
  (r) => {
    r.predicate = 'bears_on_proposition';
    r.roles = ['context', 'earliest-located-term'];
    r.missing =
      'A short period: the paper suggests “within years” for the step to AI++ and takes “within decades” as its conservative reading; “within days” is reported as what some would suggest.';
    r.id = r.id.endsWith('-context') ? r.id : `${r.id}-context`;
  },
  'reclassified as context: no period of hours to months is asserted',
);
fix(
  'rd-r05-muehlhauser-salamon-2012-intelligence-explosion',
  (r) => {
    r.predicate = 'bears_on_proposition';
    r.roles = ['context'];
    r.missing =
      'A short period or a fast-takeoff name: the chapter says the explosion follows “fairly rapidly”, without a period.';
    r.id = r.id.endsWith('-context') ? r.id : `${r.id}-context`;
  },
  'reclassified as context: "fairly rapidly" without a period',
);
fix(
  'rd-r05-yudkowsky-2017-alphago-zero-foom',
  (r) => {
    r.roles = ['earliest-located'];
  },
  'earliest located on R05 after the reclassifications above',
);
// The banquet speech is short (about 10% may be quoted): shorten one quotation.
fix(
  'rd-r08-hinton-2024-nobel-banquet',
  (r) => {
    const e = r.evidence.find((x) => x.source === 'hinton-2024-nobel-banquet');
    e.passage =
      'a longer term existential threat that will arise when we create digital beings that are more intelligent than ourselves.';
    e.note =
      'Shortened to keep the speech within its quotation limit. The next sentence reads, in paraphrase, that we do not know whether we can stay in control.';
  },
  'quotation shortened to the quotation limit of a short text',
);
// Sotos (2021) is not the earliest contesting record on R08 (the 2019 thread and earlier texts are);
// audit-fixes.mjs assigns the role.
fix(
  'rd-r08-sotos-2021-unimportance-superintelligence-contests',
  (r) => {
    r.roles = ['contesting'];
  },
  'earliest-located contesting role moves to the 2019 thread record',
);

for (const f of files)
  writeFileSync(join(DIR, f), JSON.stringify(drafts[f], null, 2) + '\n');
console.log(log.length ? log.join('\n') : 'no changes');
