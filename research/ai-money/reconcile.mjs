// Integration across source groups (2026-11-02). Edits the drafts in place and logs
// every change to reconcile-log.json. Rules:
// 1. "most-developed" is removed: each group assigned it within its own texts, and
//    across groups it is an editorial judgement the maintainer has not asked for.
// 2. Earliest located is reassigned per proposition and stance to the eligible record
//    whose wording is dated earliest. Not eligible: relays (a report of other bodies'
//    or participants' views), later restatements and records whose wording is known only
//    from an undated later copy. Records whose date cannot be ordered against the
//    holder at the precision both give are logged as ties.
// 3. The earliest located use of a usual name goes to the earliest record whose evidence
//    contains the name.
// 4. Attribution and wording fixes named in FIXES.
import { readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const DIR = dirname(fileURLToPath(import.meta.url));
const DRAFTS = join(DIR, 'drafts');
const props = JSON.parse(readFileSync(join(DIR, 'propositions.json'), 'utf8'));
const files = readdirSync(DRAFTS).filter((f) => f.endsWith('.json'));
const drafts = files.map((f) => ({
  f,
  d: JSON.parse(readFileSync(join(DRAFTS, f), 'utf8')),
}));
const log = [];
const recs = drafts.flatMap(({ f, d }) => d.records.map((r) => ({ f, r })));
const STANCE = {
  articulates_proposition: 'articulates',
  contests_proposition: 'contests',
  bears_on_proposition: 'bears_on',
};
const wd = (r) => (r.attested ? (r.attested.date ?? null) : r.time?.date);
const dk = (d) => (d ? String(d).padEnd(10, '~') : '9999');
const before = (a, b) => {
  if (!a || !b) return false;
  const n = Math.min(a.length, b.length);
  return a.slice(0, n) < b.slice(0, n);
};
// Roles are set silently and logged once, as the net change per record, at the end.
const initialRoles = new Map(recs.map(({ r }) => [r.id, [...r.roles]]));
const why = new Map();
const setRoles = (r, roles, reason) => {
  r.roles = [...new Set(roles)];
  why.set(r.id, reason);
};

// 4. Fixes.
const FIXES = {
  statements: [
    [
      'FSI Insights No 63 of December 2024 states',
      'FSI Insights No 63 of December 2024, by Crisanto, Leuterio, Prenio and Yong, states',
    ],
    [
      'BIS Working Paper No 1194 of June 2024 lists',
      'BIS Working Paper No 1194 of June 2024, by Aldasoro, Gambacorta, Korinek, Shreeti and Stein, lists',
    ],
    [
      'early identification, warning and handling of risks',
      'early identification, alerting and handling of risks',
    ],
  ],
  documents: {
    'pbc-2026-pan-jrjlt': { authors: ['Pan Gongsheng (潘功胜)'] },
    'rbi-2025-free-ai-report': {
      voice: 'committee',
      dateNote:
        "The RBI press release of August 13, 2025 states the committee submitted its report and that it is being placed on the RBI website; the report is the committee's text (members listed PDF p. 13), not stated by the RBI to be its policy. Voice set to 'committee' at integration (2026-11-02).",
    },
  },
};
for (const { r } of recs)
  for (const [a, b] of FIXES.statements)
    for (const k of ['statement', 'qualification'])
      if (r[k]?.includes(a) && !r[k].includes(b)) {
        r[k] = r[k].replace(a, b);
        log.push({
          id: r.id,
          field: k,
          from: a,
          to: b,
          why: 'attribution or wording fix',
        });
      }
for (const [id, patch] of Object.entries(FIXES.documents))
  for (const { d } of drafts)
    for (const x of d.documents)
      if (x.id === id)
        for (const [k, v] of Object.entries(patch))
          if (JSON.stringify(x[k]) !== JSON.stringify(v)) {
            log.push({
              document: id,
              field: k,
              from: x[k],
              to: v,
              why: 'attribution fix',
            });
            x[k] = v;
          }

// 1. most-developed.
for (const { r } of recs)
  if (r.roles.includes('most-developed')) {
    const rest = r.roles.filter((x) => x !== 'most-developed');
    setRoles(
      r,
      rest.length ? rest : ['articulation'],
      'most-developed removed at integration',
    );
  }

// 2. Earliest located.
const ties = [];
for (const p of props.propositions)
  for (const stance of ['articulates', 'contests']) {
    const rs = recs
      .map((x) => x.r)
      .filter(
        (r) => r.proposition === p.code && STANCE[r.predicate] === stance,
      );
    if (!rs.length) continue;
    const base = stance === 'articulates' ? 'articulation' : 'contesting';
    for (const r of rs)
      if (r.roles.includes('earliest-located')) {
        const rest = r.roles.filter((x) => x !== 'earliest-located');
        setRoles(
          r,
          rest.length ? rest : [base],
          'earliest located reassigned across groups',
        );
      }
    const eligible = rs.filter(
      (r) =>
        r.register === 'nonfiction' &&
        !r.roles.includes('later-restatement') &&
        wd(r),
    );
    if (!eligible.length) continue;
    eligible.sort(
      (a, b) => dk(wd(a)).localeCompare(dk(wd(b))) || a.id.localeCompare(b.id),
    );
    const h = eligible[0];
    setRoles(
      h,
      ['earliest-located', ...h.roles.filter((x) => x !== base)],
      `earliest located: wording dated ${wd(h)}, earliest eligible ${stance} record across groups`,
    );
    for (const r of eligible.slice(1))
      if (!before(wd(h), wd(r)))
        ties.push({
          proposition: p.code,
          stance,
          holder: h.id,
          holderDate: wd(h),
          other: r.id,
          otherDate: wd(r),
        });
    for (const r of rs.filter((x) => !eligible.includes(x)))
      if (before(wd(r), wd(h)))
        log.push({
          id: r.id,
          note: `dated ${wd(r)}, before the holder, but not eligible (${r.register}${r.roles.includes('later-restatement') ? ', later restatement' : ''})`,
        });
  }

// 3. Usual names.
for (const p of props.propositions) {
  const terms = (p.terms ?? []).map((t) => t.toLowerCase());
  const rs = recs.map((x) => x.r).filter((r) => r.proposition === p.code);
  for (const r of rs)
    if (r.roles.includes('earliest-located-term')) {
      const rest = r.roles.filter((x) => x !== 'earliest-located-term');
      setRoles(
        r,
        rest.length ? rest : ['articulation'],
        'name role reassigned across groups',
      );
      r.term = null;
    }
  const users = rs
    .map((r) => ({
      r,
      t: terms.find((t) =>
        r.evidence.some((e) => e.passage.toLowerCase().includes(t)),
      ),
    }))
    .filter((x) => x.t)
    .sort((a, b) => dk(wd(a.r)).localeCompare(dk(wd(b.r))));
  if (users.length) {
    const { r, t } = users[0];
    r.term = p.terms.find((x) => x.toLowerCase() === t);
    setRoles(
      r,
      [...r.roles, 'earliest-located-term'],
      `earliest record whose evidence uses "${r.term}"`,
    );
  }
}

const same = (a, b) => [...a].sort().join(',') === [...b].sort().join(',');
for (const { r } of recs)
  if (!same(initialRoles.get(r.id), r.roles))
    log.push({
      id: r.id,
      from: initialRoles.get(r.id),
      to: r.roles,
      why: why.get(r.id),
    });

for (const { f, d } of drafts)
  writeFileSync(join(DRAFTS, f), JSON.stringify(d, null, 2) + '\n');
// A rerun on reconciled drafts changes nothing and keeps the first run's log.
if (log.length)
  writeFileSync(
    join(DIR, 'reconcile-log.json'),
    JSON.stringify({ runAt: '2026-11-02', changes: log, ties }, null, 2) + '\n',
  );
console.log(`${log.length} changes, ${ties.length} ties`);
for (const t of ties) console.log('tie', JSON.stringify(t));
