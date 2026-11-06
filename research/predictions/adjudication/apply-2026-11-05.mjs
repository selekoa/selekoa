// Applies the adjudication of the second cross-family check (2026-11-05;
// research/predictions/cross-family-check-2026-11-05.md, Codex, branch
// codex/predictions-check-2 at 837dad9) to the drafts: the agreed corrections of
// Part C, the release of the held pass-2 records the check confirms, and the
// retrieval answers of Part B for decisions 7a (archive copies of live pages) and
// 11c (the Kurzweil date). Every change asserts that it changes something.
// Run after followup/records-2026-11-05.mjs:
//   node research/predictions/adjudication/apply-2026-11-05.mjs
// then `tools.mjs build`. The log goes to adjudication/applied-2026-11-05.json.
//
// No change here judges whether a prediction came true. Horizons and probabilities
// stay in the source's words. Passages added below are the checker's transcriptions
// of 2026-11-05 (Part B), each under 50 words, from captures this environment cannot
// reach (web.archive.org); the build matches each quotation against them.
import { readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const DRAFTS = join(HERE, '..', 'drafts');
const files = readdirSync(DRAFTS)
  .filter((f) => /^(records-[a-f]|records-pass2|sources)\.json$/.test(f))
  .sort()
  .map((f) => ({ f, d: JSON.parse(readFileSync(join(DRAFTS, f), 'utf8')) }));
const log = [];
let current = null;

const rec = (id) => {
  current = id;
  const hits = files.flatMap(({ d }) =>
    (d.records ?? []).filter((x) => x.id === id),
  );
  if (hits.length !== 1) throw new Error(`record ${id}: ${hits.length} found`);
  return hits[0];
};
const src = (key) => {
  current = `source ${key}`;
  const hits = files.flatMap(({ d }) =>
    (d.sources ?? []).filter((x) => x.key === key),
  );
  if (hits.length !== 1) throw new Error(`source ${key}: ${hits.length} found`);
  return hits[0];
};
const put = (x, field, value, item) => {
  if (JSON.stringify(x[field]) === JSON.stringify(value))
    throw new Error(`no change: ${current}.${field}`);
  log.push({ id: current, field, from: x[field] ?? null, to: value, item });
  if (value === undefined) delete x[field];
  else x[field] = value;
};
const swap = (x, field, a, b, item) => {
  if (!String(x[field] ?? '').includes(a))
    throw new Error(`not found in ${current}.${field}: ${a.slice(0, 60)}`);
  put(x, field, x[field].replace(a, b), item);
};
const addEvidence = (x, ev, item) =>
  put(x, 'evidence', [...x.evidence, ev], item);
const release = (x, item) => put(x, 'status', undefined, item);

const CHECKER2 = 'cross-family checker, 2026-11-05';
const q = (source, locator, passage) => ({
  source,
  locator,
  passage,
  passageType: 'quote',
  sourceRole: 'primary',
  checkedAt: '2026-11-05',
});
// A second transcription of a capture, with the second check's response hash.
// Replayed archive pages differ in their bytes between fetches (the replay banner
// and timestamps); the passages are compared, not the hashes.
const recheck = (key, sha256, passages, item) => {
  const s = src(key);
  const cc = s.checkedCopy;
  put(
    s,
    'checkedCopy',
    {
      ...cc,
      note:
        sha256 === cc.sha256
          ? `${cc.note}; read again by the cross-family checker on 2026-11-05 (HTTP 200, same SHA-256)`
          : `${cc.note}; read again by the cross-family checker on 2026-11-05 (HTTP 200, SHA-256 of that response ${sha256}; a replayed archive page differs in its bytes between fetches, so the passages, not the hashes, are compared)`,
      passages: [
        ...cc.passages,
        ...passages.map(([locator, passage]) => ({
          readBy: CHECKER2,
          locator,
          passage,
        })),
      ],
    },
    item,
  );
};
const CONFIRMED =
  "Rests on the cross-family checker's transcriptions of a copy this environment cannot reach; the second check (2026-11-05) read the copy again and confirms the quoted wording.";
const HOLD =
  "Rests on the cross-family checker's transcription of a copy this environment cannot reach; held until the second check re-reads the copy (the checker's transcription of the 1983 Vinge column did not match the scan).";
const copyAgain = (x, item) =>
  swap(
    x,
    'copyRead',
    'read by the cross-family checker on 2026-11-03;',
    'read by the cross-family checker on 2026-11-03 and again on 2026-11-05;',
    item,
  );

// ---------- Items 1–3: Simon and Newell, the stated basis and the speaker's commitment ----------
// The checker: the shared introduction says "I am willing to make the following
// predictions" and grounds them "On the basis of these developments, and the speed
// with which research in this field is progressing"; keep both as context, not as a
// probability or a logical condition. Both lie in the record's second quotation.
for (const [id, item] of [
  ['pr-a-simon-newell-1958-theorem', 'C1'],
  ['pr-a-simon-newell-1958-music', 'C2'],
  ['pr-a-simon-newell-1958-psychology', 'C3'],
]) {
  const r = rec(id);
  put(
    r,
    'confidence',
    {
      asStated: '"I am willing to make the following predictions"',
      words: 'I am willing to make the following predictions',
    },
    item,
  );
  put(
    r,
    'conditions',
    'Grounded in "On the basis of these developments, and the speed with which research in this field is progressing" (the stated basis of all four predictions, not a condition).',
    item,
  );
}
// The chess record (first pass) has the same introduction in its quotation; its
// commitment words are added for consistency. Its own condition is unchanged.
put(
  rec('pr-a-simon-newell-1958-chess'),
  'confidence',
  {
    asStated: '"I am willing to make the following predictions"',
    words: 'I am willing to make the following predictions',
  },
  'C1–C3 (consistency)',
);

// ---------- Item 4: Vinge, 20 to 100 years ----------
// The two families read one word differently: the preparing family "given our
// progress" (scan at 300 and 600 dpi, 2026-11-05, twice), the checker "given the
// progress" (2026-11-05). Neither overrules the other: the record stops quoting the
// disputed word, and both readings are recorded. Everything else agrees.
const vs = src('vinge1983');
put(
  vs,
  'checkedCopy',
  {
    ...vs.checkedCopy,
    note: `${vs.checkedCopy.note}; read again by the preparing family at 600 dpi and by the cross-family checker on 2026-11-05 (same SHA-256). The two readings differ on one word, "our" (preparing family) or "the" (checker), before "progress in computer and biological sciences"`,
    passages: [
      ...vs.checkedCopy.passages,
      {
        readBy: CHECKER2,
        locator: 'p. 10, middle column, last paragraph',
        passage:
          'Surprise—it is a future that will happen as soon as superhuman intelligences are created. And given the progress in computer and biological sciences, that should be between 20 and 100 years from now.',
      },
    ],
  },
  'B1.1',
);
let r = rec('pr-b-vinge-1983-twenty-to-hundred-years');
put(
  r,
  'evidence',
  [
    {
      ...r.evidence[0],
      passage:
        'Vinge writes that this future “will happen as soon as superhuman intelligences are created” and, citing “progress in computer and biological sciences”, that this “should be between 20 and 100 years from now”.',
    },
  ],
  'C4',
);
put(
  r,
  'conditions',
  'Grounded in "progress in computer and biological sciences" (the column\'s words; the word before "progress" is not quoted, see the copy note).',
  'C4',
);
put(
  r,
  'copyRead',
  'One-page image scan (gwern.net, SHA-256 6d2f9a0a…), read visually by the preparing session on 2026-11-05 and by the cross-family checker on 2026-11-05. The two readings agree on every quoted word. They differ on the word before "progress": the preparing family reads "given our progress", the checker "given the progress"; the record does not quote that word. The checker\'s first transcription (2026-11-03) gave a different sentence, which the second check withdraws: "Neither “computer hardware and software” nor “I feel this is likely” appears anywhere on the one-page scan."',
  'C4',
);

// ---------- Item 5: Vinge, next 20 years ----------
r = rec('pr-b-vinge-1983-next-twenty-years');
put(
  r,
  'copyRead',
  'One-page image scan (gwern.net), read visually by the preparing session on 2026-11-05 and by the cross-family checker on 2026-11-05, who agree on the quoted words.',
  'C5',
);

// ---------- Items 6–8: Legg, vetta.org, 2009–2011 ----------
recheck(
  'legg2009',
  '81273d9fc71b9fd915d1045d1f01ff823d345b8e9a9d83d07771b59973d8d1c0',
  [
    [
      'Final main-post paragraph, first sentence',
      'Right, so my prediction for the last 10 years has been for roughly human level AGI in the year 2025',
    ],
  ],
  'B1.2',
);
recheck(
  'legg2010',
  'e2baf3b7d54789efd9ded633a1da9550f71a19133cb37c07cbee15c11444d17e',
  [
    [
      'Human-level AGI paragraph, first sentence',
      'My longest running prediction, since 1999, has been the time until roughly human level AGI.',
    ],
    [
      'Same paragraph, later sentence',
      'I was toying with the idea of moving the prediction very slightly closer, but decided to play it safe and keep the prediction unmoved at 2028.',
    ],
    [
      'Next paragraph, first sentence',
      'One thing I screwed up last year was the 90% credibility region.',
    ],
  ],
  'B1.2',
);
recheck(
  'legg2011blog',
  'db9c9eeffa2550adeff6963ecb280932b52fb452a4670527dac19618c0fe06fc',
  [
    [
      'Opening paragraph, first sentence',
      'I’ve decided to once again leave my prediction for when human level AGI will arrive unchanged.',
    ],
  ],
  'B1.2',
);

r = rec('pr-e-legg-2009-mode-2025');
put(r, 'event', 'roughly human level AGI', 'C6');
put(
  r,
  'eventNote',
  'The distribution\'s subject, named in the paragraph\'s first sentence: "my prediction for the last 10 years has been for roughly human level AGI in the year 2025"; the post goes on: "This year I\'ve tried to come up with something a bit more precise."',
  'C6',
);
addEvidence(
  r,
  q(
    'legg2009',
    'Final main-post paragraph, first sentence',
    'Right, so my prediction for the last 10 years has been for roughly human level AGI in the year 2025',
  ),
  'C6',
);
swap(
  r,
  'qualification',
  HOLD,
  `${CONFIRMED} The post of 10 December 2010 says "One thing I screwed up last year was the 90% credibility region"; this record keeps the 2009 interval as posted.`,
  'C6',
);
copyAgain(r, 'C6');
release(r, 'C6');

r = rec('pr-e-legg-2010-log-normal');
put(r, 'event', 'roughly human level AGI', 'C7');
put(
  r,
  'eventNote',
  'The paragraph\'s subject: "My longest running prediction, since 1999, has been the time until roughly human level AGI."',
  'C7',
);
put(
  r,
  'retrospective',
  {
    estimateOf: '2009-12',
    note: 'The post reports the distribution given "last year" (the post of 7 December 2009) and keeps it: "keep the prediction unmoved at 2028". The record dates the restatement by this post; the 2009 estimate is recorded separately (pr-e-legg-2009-mode-2025).',
  },
  'C7',
);
addEvidence(
  r,
  q(
    'legg2010',
    'Human-level AGI paragraph, first sentence',
    'My longest running prediction, since 1999, has been the time until roughly human level AGI.',
  ),
  'C7',
);
addEvidence(
  r,
  q(
    'legg2010',
    'Same paragraph, later sentence',
    'I was toying with the idea of moving the prediction very slightly closer, but decided to play it safe and keep the prediction unmoved at 2028.',
  ),
  'C7',
);
swap(
  r,
  'qualification',
  `${HOLD} "I gave it" is in the past tense; whether the post restates the 2009 estimate or reports a new one is for the second check to read in context.`,
  `${CONFIRMED} "I gave it" reports the 2009 distribution; the post keeps the mean "unmoved at 2028". The next paragraph corrects the 2009 credibility region, which this record does not carry.`,
  'C7',
);
copyAgain(r, 'C7');
release(r, 'C7');

r = rec('pr-e-legg-2011-log-normal');
put(r, 'event', 'human level AGI', 'C8');
put(
  r,
  'eventNote',
  'The sentence before the quotation: "I’ve decided to once again leave my prediction for when human level AGI will arrive unchanged." The quotation follows "That is,".',
  'C8',
);
addEvidence(
  r,
  q(
    'legg2011blog',
    'Opening paragraph, first sentence',
    'I’ve decided to once again leave my prediction for when human level AGI will arrive unchanged.',
  ),
  'C8',
);
swap(
  r,
  'qualification',
  HOLD,
  `${CONFIRMED} The post leaves the estimate "unchanged"; a separate estimate in the same post, of proto-AGI, is not recorded here.`,
  'C8',
);
copyAgain(r, 'C8');
release(r, 'C8');

// ---------- Item 9: FHI 2011-1, the catastrophe assumption (material) ----------
recheck(
  'fhi2011-1',
  '7c6679ca2bb66ce8d1e5d1647bdd358d3fa46ab722758d2e85899add27d8ddb9',
  [
    [
      'Printed p. 1 / PDF p. 2, question 1',
      'Assuming no global catastrophe halts progress, by what year would you assign a 10%/50%/90% chance of the development of human-level machine intelligence?',
    ],
    [
      'PDF p. 12, appended questionnaire, definition before question 1',
      'Define a human-level machine intelligence to be one that can substitute for humans in virtually all cognitive tasks, including those requiring scientific creativity, common sense, or social skills.',
    ],
    [
      'Printed p. 1 / PDF p. 2, paragraph before the estimates',
      'There were 35 collected surveys, suggesting a response rate of ≈41%.',
    ],
    [
      'Printed p. 1 / PDF p. 2, question 1, next sentence',
      'Feel free to answer ‘never’ if you believe such a milestone will never be reached.',
    ],
  ],
  'B1.3',
);
r = rec('pr-c-fhi-2011-hlmi');
put(
  r,
  'conditions',
  '"Assuming no global catastrophe halts progress" (the question as put to respondents).',
  'C9',
);
put(
  r,
  'eventNote',
  'Human-level machine intelligence, defined in the appended questionnaire: "one that can substitute for humans in virtually all cognitive tasks, including those requiring scientific creativity, common sense, or social skills".',
  'C9',
);
put(
  r,
  'survey',
  {
    ...r.survey,
    respondents:
      'participants of the FHI Winter Intelligence conference on machine intelligence; "35 collected surveys, suggesting a response rate of ≈41%"',
    question:
      'Assuming no global catastrophe halts progress, by what year would you assign a 10%/50%/90% chance of the development of human-level machine intelligence?',
  },
  'C9',
);
addEvidence(
  r,
  q(
    'fhi2011-1',
    'Printed p. 1 / PDF p. 2, question 1',
    'Assuming no global catastrophe halts progress, by what year would you assign a 10%/50%/90% chance of the development of human-level machine intelligence?',
  ),
  'C9',
);
addEvidence(
  r,
  q(
    'fhi2011-1',
    'PDF p. 12, appended questionnaire, definition before question 1',
    'Define a human-level machine intelligence to be one that can substitute for humans in virtually all cognitive tasks, including those requiring scientific creativity, common sense, or social skills.',
  ),
  'C9',
);
addEvidence(
  r,
  q(
    'fhi2011-1',
    'Printed p. 1 / PDF p. 2, paragraph before the estimates',
    'There were 35 collected surveys, suggesting a response rate of ≈41%.',
  ),
  'C9',
);
swap(
  r,
  'qualification',
  `${HOLD} The report calls the poll "informal". The checker reports that the estimates assume no global catastrophe; that sentence was not transcribed and is requested. The figures belong to the report, not to any respondent.`,
  `${CONFIRMED} The report calls the poll "informal". The question assumed that no global catastrophe halts progress and allowed the answer "never". Each figure is the median of the respondents' estimates for one probability level, not a forecast by the authors or a combined distribution. The figures belong to the report, not to any respondent. The poll date (16 January 2011), the report year (2011) and the capture (2016) are separate dates.`,
  'C9',
);
copyAgain(r, 'C9');
release(r, 'C9');

// ---------- Item 10: Metaculus 5121, capture of 5 January 2025 ----------
recheck(
  'metaculus5121-20250105',
  'c351ff6408ed4224dfa7e60e7080e3b5fb2082be94987bd155ca0597f6a7f338',
  [
    [
      'Forecast summary above the prediction panel',
      'Community Prediction 2031-06-14 (2027-05-10 - 2041-08-31)',
    ],
    ['Community table, column labels', 'lower 25% median upper 75%'],
    ['Forecast summary', 'Total Forecasters 1442'],
  ],
  'B1.5',
);
r = rec('pr-d-metaculus-5121-capture-2025-01-05');
put(
  r,
  'horizon',
  {
    ...r.horizon,
    asStated:
      '2031-06-14 (the community prediction as displayed; the community table\'s "median", between "lower 25%" 2027-05-10 and "upper 75%" 2041-08-31)',
  },
  'C10',
);
put(
  r,
  'probability',
  { asStated: 'median (community table)', words: 'median' },
  'C10',
);
addEvidence(
  r,
  q(
    'metaculus5121-20250105',
    'Forecast summary above the prediction panel',
    'Community Prediction 2031-06-14 (2027-05-10 - 2041-08-31)',
  ),
  'C10',
);
addEvidence(
  r,
  q(
    'metaculus5121-20250105',
    'Community table, column labels',
    'lower 25% median upper 75%',
  ),
  'C10',
);
addEvidence(
  r,
  q('metaculus5121-20250105', 'Forecast summary', 'Total Forecasters 1442'),
  'C10',
);
swap(
  r,
  'qualification',
  `${HOLD} The figure is the platform's aggregate of its forecasters on one day, not a prediction by any named person. Which statistic the displayed date is (the checker's serialised table suggests a median between quartiles of 2027-05-10 and 2041-08-31) is for the second check to confirm from the page; the pack records only the displayed date.`,
  `${CONFIRMED} The figure is the platform's aggregate of its forecasters on one day ("Total Forecasters 1442"), not a prediction by any named person. The capture displays the date as the community prediction and labels it "median" in the community table, with the quartiles shown; no date is derived from a serialised distribution. The question's opening date is not displayed on the capture and is not recorded.`,
  'C10',
);
copyAgain(r, 'C10');
release(r, 'C10');

// ---------- Items 11–12: OpenAI, November 2025 ----------
recheck(
  'openai-2025-progress',
  '1d4ad46cc4c932bb676c2d53babc25ee5c08c7c48df7431ddaa0818b7970cf1f',
  [
    [
      'Main text, paragraph beginning "In 2026"',
      'In 2026, we expect AI to be capable of making very small discoveries. In 2028 and beyond, we are pretty confident we will have systems that can make more significant discoveries (though we could of course be wrong, this is what our research progress appears to indicate).',
    ],
  ],
  'B1.4',
);
for (const [id, item] of [
  ['pr-f-openai-2025-very-small-discoveries', 'C11'],
  ['pr-f-openai-2025-more-significant-discoveries', 'C12'],
]) {
  r = rec(id);
  swap(r, 'qualification', HOLD, CONFIRMED, item);
  copyAgain(r, item);
  release(r, item);
}
// Item 12 (material for the checker): the record already carries the parenthesis as
// its `hedge`; the brief's answers file omitted it (build.mjs wrote conditions only
// into conditions_hedges, now fixed). No record change beyond the release.

// ---------- Decision 7a: archive copies near publication (Part B2) ----------
const attest = (id, date, note, item) => {
  const x = rec(id);
  put(x, 'attested', { date, note }, item);
};
attest(
  'pr-b-bostrom-1998-hardware-2004-2008',
  '2000-12-10',
  'The quoted sentence is in the earliest located Internet Archive capture of the page (20001210012600), read by the cross-family checker on 2026-11-05. That copy is titled "(1997)", "[Revised 25 October, 1998, and provided with a postscript]" and "[A second postscript added 28 August, 2000]": it attests the wording in December 2000, not in 1998.',
  'B2.7',
);
for (const id of [
  'pr-e-brooks-2018-next-big-thing',
  'pr-e-brooks-2018-mouse',
  'pr-e-brooks-2018-dog',
])
  attest(
    id,
    '2018-01-02',
    'The quoted wording, and the "NET" and "BY" conventions, are in the earliest located Internet Archive capture of January–February 2018 (20180102073550), dated "January 1, 2018", read by the cross-family checker on 2026-11-05.',
    'B2.8',
  );
attest(
  'pr-f-ai2027-2025-next-decade',
  '2025-04-03',
  'The quoted sentences are in the earliest located Internet Archive capture of April 2025 (20250403163539), dated "April 3rd 2025", read by the cross-family checker on 2026-11-05.',
  'B2.9',
);
attest(
  'pr-b-kurzweil-2001-brain-capacity',
  '2001-08-04',
  'The quoted sentence is in an Internet Archive capture of the essay\'s address on kurzweilai.net of 4 August 2001 (20010804224404), read by the cross-family checker on 2026-11-05. That copy is headed "The Singularity is Near" and "A Book Précis by Raymond Kurzweil", with "Copyright ( C ) Raymond Kurzweil 2001"; it attests the sentence at that address in August 2001, not the title or version read on the live page. The earliest indexed capture (April 2001) redirects to it.',
  'B2.6',
);
// Kurzweil, the other record: its sentence was not among those the check
// transcribed; its attested date stays the retrieval date.

// ---------- Decision 11c: the Kurzweil date ----------
// The check found no copy that prints a date: the August 2001 copy prints neither
// "January 2001" nor 7 March 2001, and the April 2001 index entry redirects to it.
// The plan's rule for that case: keep the page's "January 2001", give the dataset's
// date in the note, leave the dataset's records unchanged.
const K11C =
  "An Internet Archive capture of the essay's address of 4 August 2001 (the earliest indexed, of April 2001, redirects to it) prints neither date, read by the cross-family checker on 2026-11-05; no copy read settles the publication date (decision 11c). The dataset's existing records keep 2001-03-07.";
r = rec('pr-b-kurzweil-2001-brain-capacity');
put(
  r,
  'sourceDate',
  {
    ...r.sourceDate,
    note: `The live page reads "January 2001"; the dataset dates the essay 2001-03-07. ${K11C}`,
  },
  'B2.6 (11c)',
);
const ks = src('kurzweil2001');
put(ks, 'date', { ...ks.date, note: `${ks.date.note} ${K11C}` }, 'B2.6 (11c)');

// ---------- Long Bet 1: the 2002 copy words the bet differently ----------
// The capture of 7 June 2002 states the bet as "A computer - or "machine
// intelligence" - will pass the Turing Test by 2029.", with Kapor as "initiator" and
// Kurzweil as "responder", and stakes "$20,000 ($10,000 each)". The record quotes the
// live page's negative wording, so the 2002 copy does not attest it: the attested
// date stays the retrieval date, and the qualification records the earlier wording.
// Whether to add a record for the 2002 wording is put to the maintainer.
r = rec('pr-d-longbets-1-turing-test-2029');
swap(
  r,
  'qualification',
  "The bet's statement is a negative prediction made by Kapor; Kurzweil is the challenger.",
  "On the live page, the bet's statement is a negative prediction made by Kapor; Kurzweil is the challenger.",
  'B2.10',
);
swap(
  r,
  'qualification',
  "The live page does not authenticate the wording of 2002; the cross-family check's bounded archive searches returned no usable capture of 2002, which does not establish that none exists.",
  'The live page does not authenticate the wording of 2002. An Internet Archive capture of 7 June 2002 (20020607200712), read by a reviewer from a different model family on 2026-11-05, states the bet differently: "A computer - or "machine intelligence" - will pass the Turing Test by 2029.", with "Mitchell Kapor (mkapor) initiator", "Ray Kurzweil (rkurzweil) responder" and "Stakes $20,000 ($10,000 each)". The record keeps the live wording, attested from 2026-11-02.',
  'B2.10',
);
put(
  r,
  'attested',
  {
    ...r.attested,
    note: "Wording read on the live bet page on 2026-11-02 and again on 2026-11-03. The capture of 7 June 2002 words the bet differently (see the qualification), so it does not attest this wording. The source date is the bet's own; the wording is attested only from the retrieval date.",
  },
  'B2.10',
);

// ---------- Live pages with no earlier copy of their quoted words ----------
// Bostrom's abstract ("within the first third of the next century") and Kurzweil's
// "$1,000 ... around the year 2023" were not among the passages the check
// transcribed from the early copies; their attested date stays 2026-11-02, and the
// note no longer says a copy is requested.
for (const [id, words] of [
  [
    'pr-b-bostrom-1998-first-third',
    'the earliest located copy, of December 2000',
  ],
  ['pr-b-kurzweil-2001-1000-dollars-2023', 'the copy of August 2001'],
]) {
  r = rec(id);
  const note = r.attested.note.replace(
    'an archive copy near publication is requested from Codex (decision 7a).',
    `the cross-family check of 2026-11-05 found ${words} but did not transcribe this passage from it (decision 7a).`,
  );
  if (note === r.attested.note)
    throw new Error(`${id}: attested note unchanged`);
  put(r, 'attested', { ...r.attested, note }, 'B2.6–B2.7 (7a)');
}

const ls = src('longbets1');
swap(
  ls,
  'version',
  'the archive capture of 2002 is listed for Codex.',
  'an Internet Archive capture of 7 June 2002 (20020607200712), read by the cross-family checker on 2026-11-05, words the bet differently.',
  'B2.10',
);

// ---------- the search log ----------
const omFile = join(DRAFTS, 'omissions.json');
const om = JSON.parse(readFileSync(omFile, 'utf8'));
const dispose = (prefix, a, b, item) => {
  const hit = om.items.filter((x) => x.text.startsWith(prefix));
  if (hit.length !== 1) throw new Error(`omission ${prefix}: ${hit.length}`);
  current = `omission ${prefix}`;
  swap(hit[0], 'disposition', a, b, item);
};
dispose(
  'Vernor Vinge, "First Word"',
  "The checker's transcription of the 20-to-100-years sentence differs from the scan; the second check is asked to re-read it.",
  'The second check (2026-11-05) re-read the scan: both families agree on every quoted word and differ on one word that is not quoted ("our" or "the" before "progress").',
  'C4–C5',
);
for (const [prefix, a] of [
  [
    'Shane Legg, posts on vetta.org',
    'held until the second check re-reads them',
  ],
  ['Sandberg and Bostrom', 'held until the second check re-reads it'],
  [
    'Metaculus questions on general AI',
    'held until the second check re-reads it',
  ],
  [
    'OpenAI, "AI progress and recommendations"',
    'held until the second check re-reads it',
  ],
])
  dispose(
    prefix,
    a,
    'confirmed by the second check (2026-11-05), which read the copy again',
    'C6–C12',
  );

// ---------- write ----------
writeFileSync(omFile, JSON.stringify(om, null, 2) + '\n');
for (const { f, d } of files)
  writeFileSync(join(DRAFTS, f), JSON.stringify(d, null, 2) + '\n');
writeFileSync(
  join(HERE, 'applied-2026-11-05.json'),
  JSON.stringify({ applied: '2026-11-05', changes: log }, null, 2) + '\n',
);
console.log(`${log.length} changes applied`);
