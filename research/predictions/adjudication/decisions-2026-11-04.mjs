// Applies the maintainer's decisions on the predictions sheet (answered 2026-11-04;
// review/decisions/answers-2026-11-03.md, "Answered on 2026-11-04") to the drafts:
// decision 1a's six smallest changes to the record shape, 4a and 13a (the copy read),
// 7a (wording attested from the first retrieval of a live page) and 14a (forecast or aim).
// Every change asserts that it changes something. Run after apply-2026-11-03.mjs:
//   node research/predictions/adjudication/decisions-2026-11-04.mjs
// then `tools.mjs build`. The log goes to adjudication/decisions-2026-11-04.json.
import { readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const DRAFTS = join(HERE, '..', 'drafts');
const drafts = readdirSync(DRAFTS)
  .filter((f) => /^(records-[a-f]|sources)\.json$/.test(f))
  .sort()
  .map((f) => ({ f, d: JSON.parse(readFileSync(join(DRAFTS, f), 'utf8')) }));
const log = [];
let current = null;

const rec = (id) => {
  current = id;
  const hits = drafts.flatMap(({ d }) =>
    (d.records ?? []).filter((x) => x.id === id),
  );
  if (hits.length !== 1) throw new Error(`record ${id}: ${hits.length} found`);
  return hits[0];
};
const put = (x, field, value, decision) => {
  if (JSON.stringify(x[field]) === JSON.stringify(value))
    throw new Error(`no change: ${current}.${field}`);
  log.push({ id: current, field, from: x[field] ?? null, to: value, decision });
  x[field] = value;
};
const swap = (x, field, a, b, decision) => {
  if (!String(x[field] ?? '').includes(a))
    throw new Error(`not found in ${current}.${field}: ${a.slice(0, 60)}`);
  put(x, field, x[field].replace(a, b), decision);
};

// ---------- 1a, change 1: a paraphrased event carries a note ----------
let r = rec('pr-b-yudkowsky-2000-2035-upper-bound');
put(r, 'event', 'the Singularity', '1a (change 1)');
put(
  r,
  'eventNote',
  'Paraphrase: the quoted sentence says "it seems like a reasonable upper bound"; "it" refers back to the subject of the section "Sooner Than You Think", the Singularity. The horizon words lie in the quotation.',
  '1a (change 1)',
);

// ---------- 1a, change 2 and 14a: forecast or aim ----------
r = rec('pr-f-altman-2025-2035-capacity');
put(r, 'mode', 'forecast-or-aim', '14a');
swap(
  r,
  'qualification',
  'the record keeps the wording. the next clause',
  'the record keeps the wording and is marked "forecast or aim". The next clause',
  '14a',
);

// ---------- 1a, change 3: several points, each tied to its own words ----------
const points = {
  'pr-b-kurzweil-2001-brain-capacity': [
    { subject: 'supercomputers', horizon: 'by 2010' },
    { subject: 'personal computers', horizon: 'by around 2020' },
  ],
  'pr-b-legg-2011-human-level': [
    { probability: '10%', horizon: '2018' },
    { probability: '50%', horizon: '2028' },
    { probability: '90%', horizon: '2050' },
  ],
  'pr-c-muller-bostrom-2014-hlmi': [
    { probability: 'a one in two chance', horizon: 'around 2040-2050' },
    { probability: 'a nine in ten chance', horizon: 'by 2075' },
  ],
  'pr-c-grace-2024-every-task': [
    { probability: '10%', horizon: 'by 2027' },
    { probability: '50%', horizon: 'by 2047' },
  ],
  'pr-c-grace-2024-occupations': [
    { probability: '10%', horizon: 'by 2037' },
    { probability: '50%', horizon: 'as late as 2116' },
  ],
  'pr-e-karnofsky-2021-transformative-ai': [
    {
      probability: 'more than a 10% chance',
      horizon: 'within 15 years (by 2036)',
    },
    { probability: 'a ~50% chance', horizon: 'within 40 years (by 2060)' },
    { probability: 'a ~2/3 chance', horizon: 'this century (by 2100)' },
  ],
  'pr-e-carlsmith-2022-catastrophe-2070': [
    {
      probability: '~5%',
      horizon: 'by 2070',
      version: 'the report as made public in April 2021',
      date: '2021-04',
    },
    {
      probability: '>10%',
      horizon: 'by 2070',
      version:
        'May 2022 update (the horizon is carried over from "my estimate here")',
      date: '2022-05',
    },
  ],
  'pr-e-cotra-2020-bio-anchors-as-reported-2022': [
    { probability: '~15% probability', horizon: 'by 2036' },
    { probability: 'A median', horizon: '~2050' },
  ],
  'pr-e-cotra-2022-update': [
    { probability: '~15% probability', horizon: 'by 2030' },
    { probability: '~35% probability', horizon: 'by 2036' },
    { probability: 'A median', horizon: '~2040' },
    { probability: '~60% probability', horizon: 'by 2050' },
  ],
};
for (const [id, pts] of Object.entries(points))
  put(rec(id), 'points', pts, '1a (change 3)');

// ---------- 1a, change 4: unnamed predictors with their reporter ----------
for (const id of [
  'pr-a-lighthill-1973-correspondents-1980s',
  'pr-a-lighthill-1973-correspondents-2000',
])
  put(
    rec(id),
    'predictor',
    {
      name: 'Unnamed correspondents ("able and respected scientists")',
      kind: 'unnamed',
      reporter: { name: 'James Lighthill', role: 'author of the report' },
    },
    '1a (change 4), 5a',
  );

// ---------- 1a, change 5: horizons counted from a dated occasion ----------
r = rec('pr-a-simon-newell-1958-chess');
put(
  r,
  'occasion',
  {
    date: '1957-11-14',
    kind: 'address',
    note: 'Banquet address at the Twelfth National Meeting of the Operations Research Society of America, Pittsburgh (footnote, printed p. 1); the passage says "As of the present—1957".',
  },
  '1a (change 5)',
);
put(
  r,
  'horizon',
  {
    ...r.horizon,
    interval: { amount: 'ten', unit: 'years', from: 'occasion' },
  },
  '1a (change 5)',
);
r = rec('pr-a-michie-1973-opinion-poll');
put(
  r,
  'occasion',
  {
    date: '1972',
    kind: 'poll',
    note: 'The text says the poll was "taken last year"; the chapter is dated 1973.',
  },
  '1a (change 5)',
);

// ---------- 4a and 13a: label the copy that was read ----------
const copies = {
  'pr-a-simon-newell-1958-chess':
    'Scan of the printed article in a 2007 course-readings PDF (cse.buffalo.edu), no text layer; read visually by the cross-family checker and by the adjudicating session on 2026-11-03.',
  'pr-f-openai-2023-governance-ten-years':
    'Internet Archive capture 20230522175341, read by the cross-family checker on 2026-11-03; not reachable from the preparing environment.',
  'pr-f-openai-2023-superalignment-this-decade':
    'Internet Archive capture 20230705170451, read by the cross-family checker on 2026-11-03; not reachable from the preparing environment.',
  'pr-b-degaris-1989-commonplace':
    "Checked against the dataset's passage; the article could not be retrieved on 2 and 3 November 2026.",
};
for (const [id, text] of Object.entries(copies))
  put(rec(id), 'copyRead', text, id.includes('degaris') ? '13a' : '4a');

// ---------- 7a: live pages, wording attested from the first retrieval ----------
const live = {
  'pr-b-bostrom-1998-first-third': 'author-hosted page',
  'pr-b-bostrom-1998-hardware-2004-2008': 'author-hosted page',
  'pr-b-kurzweil-2001-brain-capacity': "page on the author's site",
  'pr-b-kurzweil-2001-1000-dollars-2023': "page on the author's site",
  'pr-d-longbets-1-turing-test-2029': 'live bet page',
  'pr-e-brooks-2018-next-big-thing': 'live post, updated by its author',
  'pr-e-brooks-2018-mouse': 'live post, updated by its author',
  'pr-e-brooks-2018-dog': 'live post, updated by its author',
  'pr-f-ai2027-2025-next-decade': 'live page',
};
for (const [id, what] of Object.entries(live))
  put(
    rec(id),
    'attested',
    {
      date: '2026-11-02',
      note: `Wording read on the ${what} on 2026-11-02 and again on 2026-11-03; an archive copy near publication is requested from Codex (decision 7a). The source date is the document's own; the wording is attested only from the retrieval date.`,
    },
    '7a',
  );

// ---------- 11c: the Kurzweil date waits for an archive copy ----------
for (const id of [
  'pr-b-kurzweil-2001-brain-capacity',
  'pr-b-kurzweil-2001-1000-dollars-2023',
]) {
  r = rec(id);
  put(
    r,
    'dateQuestion',
    'The page reads "January 2001"; the dataset dates the essay 2001-03-07. Unchanged until Codex reports an archive copy near publication (decision 11c).',
    '11c',
  );
}

for (const { f, d } of drafts)
  writeFileSync(join(DRAFTS, f), JSON.stringify(d, null, 2) + '\n');
writeFileSync(
  join(HERE, 'decisions-2026-11-04.json'),
  JSON.stringify(
    {
      decisions:
        '1a 2a 3a 4a 5a 6a 7a 8a 9a 10a 11c 12a 13a 14a 15a (maintainer, 2026-11-04)',
      changes: log,
    },
    null,
    2,
  ) + '\n',
);
console.log(`${log.length} changes applied`);
