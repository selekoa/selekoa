// Applies the adjudication of the cross-family check (cross-family-check-2026-11-02.json,
// OpenAI Codex, checked 2026-11-03) to the drafts, and marks each record the check
// changed with a `crossFamily` field naming the report items and the result. Every change
// asserts that it changes something. Run once, after drafts/*.src.mjs and audit-fixes.mjs:
//   node research/predictions/adjudication/apply-2026-11-03.mjs
// then `tools.mjs build`. The log goes to adjudication/applied-2026-11-03.json.
// Needs the ignored cache entry `moravec1999` (fetched 2026-11-03; see the review note).
import { readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const DRAFTS = join(HERE, '..', 'drafts');
const CHECKED = '2026-11-03';
const drafts = readdirSync(DRAFTS)
  .filter((f) => /^(records-.*|sources)\.json$/.test(f))
  .sort()
  .map((f) => ({ f, d: JSON.parse(readFileSync(join(DRAFTS, f), 'utf8')) }));
const log = [];

const find = (kind, id) => {
  const key = kind === 'sources' ? 'key' : 'id';
  const hits = drafts.flatMap(({ d }) =>
    (d[kind] ?? []).filter((x) => x[key] === id),
  );
  if (hits.length !== 1) throw new Error(`${kind} ${id}: ${hits.length} found`);
  return hits[0];
};
let current = null;
const put = (x, field, value, items) => {
  if (JSON.stringify(x[field]) === JSON.stringify(value))
    throw new Error(`no change: ${current}.${field}`);
  log.push({
    id: current,
    field,
    from: x[field] ?? null,
    to: value ?? null,
    items,
  });
  if (value === undefined) delete x[field];
  else x[field] = value;
};
const swap = (x, field, a, b, items) => {
  if (!String(x[field] ?? '').includes(a))
    throw new Error(`not found in ${current}.${field}: ${a.slice(0, 60)}`);
  put(x, field, x[field].replace(a, b), items);
};
const rec = (id) => ((current = id), find('records', id));
const src = (key) => ((current = key), find('sources', key));
const mark = (x, items, result) =>
  put(x, 'crossFamily', { items, result }, items);
const quote = (source, locator, passage) => ({
  source,
  locator,
  passage,
  passageType: 'quote',
  sourceRole: 'primary',
  checkedAt: CHECKED,
});

// Copies the checker verified (retrieval_passages in the report's JSON), with the
// response-body hashes it recorded. Passages are copied verbatim from the report.
const CHECKER = 'cross-family checker, 2026-11-03';

// ---------- Item 4: Simon and Newell, released from "awaiting retrieval" ----------

let s = src('simon-newell-1958');
put(
  s,
  'date',
  {
    value: '1958',
    kind: 'published',
    note: 'Operations Research 6 (1), issue dated "January - February 1958" on printed p. 1. The opening footnote dates the address to 14 November 1957.',
  },
  [4],
);
put(
  s,
  'version',
  'Scan of the printed article (pp. 1–10) in a course-readings PDF of 2007 at cse.buffalo.edu, without a text layer; read visually by the cross-family checker and by the adjudicating session. The publisher page (doi.org) returned HTTP 403.',
  [4],
);
put(s, 'awaitingRetrieval', undefined, [4]);
put(
  s,
  'checkedCopy',
  {
    url: 'https://cse.buffalo.edu/~rapaport/584/S07/02Feb2007Readings.pdf',
    sha256: '252860da138c9851a79f207f748de56f9f0e82414b397d97daa59abcf9a80836',
    note: 'scan of the printed article in a 2007 course-readings PDF (printed p. 1 = bundle PDF p. 7), no text layer; the adjudicating session fetched the same bytes on 2026-11-03',
    passages: [
      {
        readBy: CHECKER,
        locator: 'Printed p. 7 / bundle PDF p. 13',
        passage:
          "That within ten years a digital computer will be the world's chess champion, unless the rules bar it from competition.",
      },
      {
        readBy: 'adjudicating session, visual reading, 2026-11-03',
        locator: 'Printed p. 7 / bundle PDF p. 13',
        passage:
          'On the basis of these developments, and the speed with which research in this field is progressing, I am willing to make the following predictions, to be realized within the next ten years:',
      },
      {
        readBy: 'adjudicating session, visual reading, 2026-11-03',
        locator: 'Printed p. 1 / bundle PDF p. 7, footnote',
        passage:
          'Address at the banquet of the Twelfth National Meeting of the Operations Research Society of America, Pittsburgh, Pennsylvania, November 14, 1957. Mr. Simon presented the paper; its content is a joint product of the authors.',
      },
    ],
  },
  [4],
);

let r = rec('pr-a-simon-newell-1958-chess');
put(r, 'status', undefined, [4]);
put(
  r,
  'sourceDate',
  {
    date: '1958',
    kind: 'published',
    note: 'Operations Research 6 (1), January–February 1958 (the issue names two months). The article is the text of an address of 14 November 1957 (footnote, printed p. 1); the passage dates its own "present" to 1957.',
  },
  [4],
);
put(
  r,
  'horizon',
  {
    ...r.horizon,
    interval: {
      amount: 'ten',
      unit: 'years',
      from: 'the address of 14 November 1957 (the text: "As of the present—1957"), not the 1958 issue',
    },
  },
  [4],
);
put(
  r,
  'qualification',
  'The first of four numbered predictions introduced by "I am willing to make the following predictions, to be realized within the next ten years"; the speaker is Simon, and the footnote states that "its content is a joint product of the authors". The other three predictions (a mathematical theorem, music, theories in psychology) are listed in the review note for drafting. Checked against a scan of the printed article in a later course-readings PDF, read visually; no text layer.',
  [4],
);
put(
  r,
  'evidence',
  [
    quote(
      'simon-newell-1958',
      'Printed p. 7 (bundle PDF p. 13), predictions list, item 1',
      "within ten years a digital computer will be the world's chess champion, unless the rules bar it from competition",
    ),
    quote(
      'simon-newell-1958',
      'Printed p. 7, sentence introducing the list',
      'I am willing to make the following predictions, to be realized within the next ten years',
    ),
    quote(
      'simon-newell-1958',
      'Printed p. 1, footnote',
      'Mr. Simon presented the paper; its content is a joint product of the authors.',
    ),
    r.evidence[1],
  ],
  [4],
);
mark(
  r,
  [4],
  'released from "awaiting retrieval": the wording agrees with the checker\'s reading of the scan of the printed article (bundle PDF p. 13) and with this session\'s reading of the same file. Source date coarsened to 1958 (the issue is January–February); the horizon is anchored to the 1957 address, not the print date.',
);

// ---------- Items 40 and 41: OpenAI pages, released from "awaiting retrieval" ----------

s = src('oai-governance-si');
put(
  s,
  'version',
  'Internet Archive capture of 2023-05-22 (20230522175341) of the original openai.com/blog address, read by the cross-family checker; the live page returned HTTP 403 to both environments, and web.archive.org did not answer this environment.',
  [40],
);
put(s, 'awaitingRetrieval', undefined, [40]);
put(
  s,
  'checkedCopy',
  {
    url: 'https://web.archive.org/web/20230522175341/https://openai.com/blog/governance-of-superintelligence',
    capture: '20230522175341',
    sha256: '31b0930b03f5b642d85d455f10b0c0301fe3988b206aab6697a9428aa06fd1e7',
    note: 'capture read by the cross-family checker on 2026-11-03 (HTTP 200); not reachable from this environment',
    passages: [
      {
        readBy: CHECKER,
        locator: 'Opening paragraph',
        passage:
          'Given the picture as we see it now, it’s conceivable that within the next ten years, AI systems will exceed expert skill level in most domains',
      },
    ],
  },
  [40],
);
r = rec('pr-f-openai-2023-governance-ten-years');
put(r, 'status', undefined, [40]);
put(
  r,
  'attested',
  {
    date: '2023-05-22',
    note: 'Internet Archive capture 20230522175341 of the original address, read by the cross-family checker.',
  },
  [40],
);
put(
  r,
  'qualification',
  'Checked against the capture of the publication day as read by the cross-family checker; this environment could not reach the page or the capture. The sentence opens with "Given the picture as we see it now" and states a possibility ("it’s conceivable"). In the checker\'s reading it continues "and carry out as much productive activity as one of today’s largest corporations"; the record\'s event is the first part only.',
  [40],
);
swap(
  r.evidence[0],
  'locator',
  'Opening paragraph (to be confirmed)',
  'Opening paragraph',
  [40],
);
mark(
  r,
  [40],
  'released from "awaiting retrieval": the quotation, date and named authors agree with the checker\'s reading of the 2023-05-22 capture. The productive-activity clause and the possibility wording are recorded in the qualification.',
);

s = src('oai-superalignment');
put(
  s,
  'version',
  'Internet Archive capture of 2023-07-05 (20230705170451) of the original openai.com/blog address, read by the cross-family checker; the live page returned HTTP 403 to both environments, and web.archive.org did not answer this environment.',
  [41],
);
put(s, 'awaitingRetrieval', undefined, [41]);
put(
  s,
  'checkedCopy',
  {
    url: 'https://web.archive.org/web/20230705170451/https://openai.com/blog/introducing-superalignment',
    capture: '20230705170451',
    sha256: '4a9a3a2a63dfd1359b1f5b3cb2e93cac6682fa8a1c422d0403422ac9bfde991e',
    note: 'capture read by the cross-family checker on 2026-11-03 (HTTP 200); not reachable from this environment',
    passages: [
      {
        readBy: CHECKER,
        locator: 'Opening section',
        passage:
          'While superintelligence seems far off now, we believe it could arrive this decade.',
      },
    ],
  },
  [41],
);
r = rec('pr-f-openai-2023-superalignment-this-decade');
put(r, 'status', undefined, [41]);
put(
  r,
  'attested',
  {
    date: '2023-07-05',
    note: 'Internet Archive capture 20230705170451 of the original address, read by the cross-family checker.',
  },
  [41],
);
put(
  r,
  'qualification',
  "Checked against the capture of the publication day as read by the cross-family checker; this environment could not reach the page or the capture. A footnote marker follows the sentence in the page; it does not change the wording. The post's separate four-year goal for its alignment research is not this prediction. The dataset holds the source without this passage.",
  [41],
);
swap(
  r.evidence[0],
  'locator',
  'Opening section (to be confirmed)',
  'Opening section',
  [41],
);
mark(
  r,
  [41],
  'released from "awaiting retrieval": the quotation and named authors agree with the checker\'s reading of the 2023-07-05 capture. Possible arrival "this decade" is kept apart from the four-year research goal.',
);

// ---------- Locators ----------

for (const [id, item] of [
  ['pr-a-turing-1950-imitation-game', 1],
  ['pr-a-turing-1950-end-of-century', 2],
]) {
  r = rec(id);
  swap(
    r.evidence[0],
    'locator',
    '§6, opening paragraph',
    '§6, second paragraph',
    [item],
  );
  mark(
    r,
    [item],
    item === 1
      ? 'corrected: the passage is in the second paragraph of §6 (transcription PDF p. 8). The rest agreed.'
      : 'agreed; locator corrected with the companion record (same paragraph).',
  );
}

r = rec('pr-a-dartmouth-1955-summer');
put(
  r.evidence[0],
  'locator',
  'Opening paragraph, last sentence (PDF p. 2, printed page number 2; p. 1 is the title page)',
  [3],
);
put(
  r.evidence[1],
  'locator',
  'Opening paragraph, first sentence (PDF p. 2)',
  [3],
);
mark(
  r,
  [3],
  'corrected: both sentences are in the single opening paragraph on PDF p. 2, after the title page. The reading agreed.',
);

// ---------- Item 16: Moravec 1999, context of "It" now read ----------

s = src('moravec1999');
put(s, 'cacheKey', 'moravec1999', [16]);
put(
  s,
  'version',
  'Author-hosted scan transcription, retrieved 2026-11-03 (the host omits its intermediate certificate; the certificate named in its Authority Information Access field was added to the CA bundle, verification on). The page renders the dash as a replacement character.',
  [16],
);
r = rec('pr-b-moravec-1999-before-2050');
put(
  r,
  'qualification',
  '"It" refers to the preceding sentence: "The path I\'ve outlined roughly recapitulates the evolution of human intelligence—but 10 million times more rapidly." The forecast rests on that outlined path of robot development.',
  [16],
);
mark(
  r,
  [16],
  'corrected: the surrounding text, unread on 2026-11-02, was read by the checker and on 2026-11-03 here; the obsolete retrieval limitation is replaced. Forecast wording agreed.',
);

// ---------- Item 26: Zhang et al., the survey's definition ----------

r = rec('pr-c-zhang-2022-hlmi-2060');
put(
  r,
  'eventNote',
  'For the cross-sectional sample that gives 2060, the report defines human-level machine intelligence as machines collectively performing "almost all tasks (>90% of all tasks) that are economically relevant" better than the median paid human (second quotation).',
  [26],
);
put(
  r,
  'qualification',
  'The 2060 result is the cross-sectional sample\'s. The recontacted panel was asked about "high-level machine intelligence" with the 2016 definition ("every task") and an assumption that scientific activity continues without major negative disruption; neither belongs to this record. The report compares the result with the 2016 survey of Grace et al. in a separate statement; that comparison is the report\'s.',
  [26],
);
put(
  r,
  'evidence',
  [
    ...r.evidence,
    quote(
      'zhang2022',
      'Appendix B.1, definition for the cross-sectional sample (PDF p. 18)',
      'Human-level machine intelligence (HLMI) is reached when machines are collectively able to perform almost all tasks (>90% of all tasks) that are economically relevant',
    ),
  ],
  [26],
);
mark(
  r,
  [26],
  "clarified: the survey's operational definition for the 2060 sample is quoted. The checker withdrew its own blind condition: the nondisruption assumption attaches to the panel, not to this result.",
);

// ---------- Item 27: ESPAI 2022, attested by a capture of August 2022 ----------

r = rec('pr-c-espai-2022-hlmi-2059');
put(
  r,
  'attested',
  {
    date: '2022-08-04',
    note: 'Internet Archive capture 20220804162728 of the results post at aiimpacts.org, read by the cross-family checker: it carries the "37 years, i.e. 2059" summary and the 36.6-year figure with its condition. The record\'s quotations are from the live wiki page.',
  },
  [27],
);
mark(
  r,
  [27],
  'agreed; the wording is now attested by a capture of 4 August 2022 (the figure is unchanged).',
);

// ---------- Item 30: Long Bet 1, terms on the same page ----------

r = rec('pr-d-longbets-1-turing-test-2029');
swap(
  r,
  'qualification',
  'The "detailed terms" (judges and procedure) are on a linked page not read in this pass.',
  'The same page carries the "Detailed Terms" ("A Wager on the Turing Test: The Rules", "As prepared by Ray Kurzweil in consultation with Mitchell Kapor"), which set the judges and procedure. The live page does not authenticate the wording of 2002; the cross-family check\'s bounded archive searches returned no usable capture of 2002, which does not establish that none exists.',
  [30],
);
mark(
  r,
  [30],
  'corrected: the terms are on the same page and were read; statement, parties and stakes agreed. Historical wording stays unauthenticated.',
);

// ---------- Item 36: Cotra's retrospective, two passages instead of an ellipsis ----------

r = rec('pr-e-cotra-2020-bio-anchors-as-reported-2022');
put(
  r,
  'evidence',
  [
    quote(
      'cotra-2022-update',
      'Opening section, bottom line estimates, first item',
      'Roughly ~15% probability of transformative AI by 2036',
    ),
    quote(
      'cotra-2022-update',
      'Same list, second item',
      'A median of ~2050 for transformative AI',
    ),
  ],
  [36],
);
mark(
  r,
  [36],
  'corrected: the ellipsised composite is split into the two passages it joined (a footnote marker and a parenthetical lie between them). Retrospective attribution agreed.',
);

// ---------- Item 37: Cotra's update, the fourth point in the probability ----------

r = rec('pr-e-cotra-2022-update');
swap(
  r.probability,
  'asStated',
  '~15%; ~35%; median',
  '~15%; ~35%; median; ~60%',
  [37],
);
mark(
  r,
  [37],
  'corrected: the stated probabilities now include "~60% probability by 2050", as the horizon and the evidence already did. The ~2040 median stays the current one.',
);

// ---------- Item 9: de Garis, not checkable ----------

r = rec('pr-b-degaris-1989-commonplace');
swap(
  r,
  'qualification',
  "Checked against the dataset's passage from the same article.",
  "Checked against the dataset's passage from the same article. The cross-family check could not retrieve the article either (a bot challenge, a refused copy and no matching archive capture).",
  [9],
);
mark(
  r,
  [9],
  "not checkable: an access gap, not evidence that the quotation is wrong. Admission on the dataset's checked passage is a decision for the maintainer.",
);

// ---------- Search log: retrieval outcomes (report groups 1–15) ----------
// omissions.json is maintained by hand, not generated, so this step is skipped
// where the outcome is already recorded (a rerun after regenerating the drafts).

const OMISSIONS = join(DRAFTS, 'omissions.json');
const om = JSON.parse(readFileSync(OMISSIONS, 'utf8'));
const OUTCOMES = [
  [
    'Simon and Newell (1958), the other three',
    'Read by the cross-family check (2026-11-03, group 1) in a scan of the printed article, printed pp. 7–8: a new mathematical theorem, music "accepted by critics as possessing considerable aesthetic value", and theories in psychology as computer programs, each "within ten years". Not yet recorded; listed for drafting in the review note.',
  ],
  [
    'Herbert Simon, The Shape of Automation',
    'Codex, 2026-11-03 (group 4): catalogue records only; the scan returned HTTP 401. Not read; not recorded.',
  ],
  [
    'Marvin Minsky, Computation: Finite',
    'Codex, 2026-11-03 (group 5): ACM HTTP 403; an archived 2016 printout of a catalogue excerpt from the preface does not contain the sentence, which does not show that the book lacks it. Not read; not recorded.',
  ],
  [
    'Brad Darrach, "Meet Shaky"',
    "Codex, 2026-11-03 (group 6): the issue's Google Books index returns the sentence at indexed p. 58; both page-image requests returned a placeholder. Jonathan Grudin's revised 2012 chapter reports that Minsky later told him he was misquoted. Not recorded until the page is read; then as a reported statement, with Grudin's report beside it.",
  ],
  [
    'Vernor Vinge, "First Word"',
    'Codex, 2026-11-03 (group 8): the scan (Omni p. 10) read visually: "I feel this is likely to happen between 20 and 100 years from now", with the creation of superhuman intelligences as its antecedent; January 1983 is issue metadata, not printed on the page. Listed for drafting.',
  ],
  [
    'Ray Kurzweil, The Age of Spiritual Machines',
    "Codex, 2026-11-03 (group 9): the publishers' pages give catalogue text and a prologue excerpt; the 2029 and 2045 passages were not found in those previews. Not recorded.",
  ],
  [
    'Shane Legg, posts on vetta.org',
    'Codex, 2026-11-03 (group 10): captures of the posts of 7 December 2009, December 2010 and December 2011 read: mode about 2025 and expected value or mean 2028, with a 90% credibility region of 2018 to 2036 (2009); the 2011 post conditions on "nothing crazy happens like a nuclear war". Listed for drafting as separate records; the 2011 Q&A record is unchanged.',
  ],
  [
    'Sandberg and Bostrom',
    'Codex, 2026-11-03 (group 11): capture 20161224100323 of the report read: an informal poll at the FHI Winter Intelligence conference of 16 January 2011, 35 surveys collected; median estimates 2028, 2050 and 2150 for a 10%, 50% and 90% chance of HLMI. Listed for drafting.',
  ],
  [
    "Michie's poll in Nature 241",
    "Codex, 2026-11-03 (group 7): the publisher's preview confirms 23 February 1973 and pp. 507–512, not the poll paragraph or figure. The record stays on the 1986 reprint.",
  ],
  [
    'Metaculus questions on general AI',
    'Codex, 2026-11-03 (group 15): 16 dated capture slots for questions 5121 and 3479 attempted; one displays a community forecast (5121, capture 20250105212836: "2031-06-14"); the others show unrendered or serialized distributions, which are not converted. No record yet; see the review note.',
  ],
  [
    'OpenAI, "AI progress and recommendations"',
    'Codex, 2026-11-03 (group 14): capture 20251107162450 read: "In 2026, we expect AI to be capable of making very small discoveries.", with a separate statement for "2028 and beyond". Listed for drafting.',
  ],
];
let omChanged = 0;
for (const [start, outcome] of OUTCOMES) {
  const hits = om.items.filter((x) => x.text.startsWith(start));
  if (hits.length !== 1)
    throw new Error(`omission ${start}: ${hits.length} found`);
  const x = hits[0];
  if (x.disposition.includes(outcome)) {
    log.push({
      id: `omission: ${start}`,
      field: 'disposition',
      alreadyRecorded: true,
    });
    continue;
  }
  const to =
    start === 'Simon and Newell (1958), the other three'
      ? outcome
      : `${x.disposition} ${outcome}`;
  log.push({
    id: `omission: ${start}`,
    field: 'disposition',
    from: x.disposition,
    to,
  });
  x.disposition = to;
  omChanged++;
}
if (omChanged) writeFileSync(OMISSIONS, JSON.stringify(om, null, 2) + '\n');

// ---------- Write ----------

for (const { f, d } of drafts)
  writeFileSync(join(DRAFTS, f), JSON.stringify(d, null, 2) + '\n');
writeFileSync(
  join(HERE, 'applied-2026-11-03.json'),
  JSON.stringify(log, null, 2) + '\n',
);
console.log(`${log.length} changes applied`);
