// Pass 2 of the predictions pack (decision 10a, 2026-11-04): the leads listed under
// "Retrieval outcomes and leads" in the review note. Adds sources to drafts/sources.json,
// writes the records to drafts/records-pass2.json and updates the search log
// (drafts/omissions.json). Run after adjudication/decisions-2026-11-04.mjs:
//   node research/predictions/followup/records-2026-11-05.mjs
// then `tools.mjs build`. Every record carries `pass: 2`; `tools.mjs brief <date> --pass 2`
// writes the cross-family brief for these records only.
//
// Copies read. The Simon and Newell scan and the Vinge scan were read visually by this
// session on 2026-11-05 (same SHA-256 as the checker's). The vetta.org posts, the FHI
// report, the OpenAI page of 2025 and the Metaculus capture are reachable only through
// web.archive.org or hosts that refuse this environment; their passages are the cross-family
// checker's transcriptions (cross-family-check-2026-11-02.json, retrieval_passages and
// metaculus_capture_grid), labelled as such. Because the checker's transcription of the
// Vinge column does not match the scan (see the review note), every record that rests on a
// checker transcription alone is held as `awaiting-confirmation` until the second check
// re-reads the capture.
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const DRAFTS = join(HERE, '..', 'drafts');
const readJson = (f) => JSON.parse(readFileSync(join(DRAFTS, f), 'utf8'));
const SELF = 'preparing session, visual reading, 2026-11-05';
const CHECKER = 'cross-family checker, 2026-11-03';
const HOLD =
  "Rests on the cross-family checker's transcription of a copy this environment cannot reach; held until the second check re-reads the copy (the checker's transcription of the 1983 Vinge column did not match the scan).";

const q = (source, locator, passage, checkedAt) => ({
  source,
  locator,
  passage,
  passageType: 'quote',
  sourceRole: 'primary',
  checkedAt,
});
const date = (d, kind, note) => ({ date: d, kind, ...(note ? { note } : {}) });
const records = [];
const add = (group, r) =>
  records.push({
    group,
    form: 'stated-forecast',
    register: 'nonfiction',
    pass: 2,
    ...r,
  });

// ---------------------------------------------------------------- sources
const { sources } = readJson('sources.json');
const byKey = new Map(sources.map((s) => [s.key, s]));
const addSource = (s) => {
  if (byKey.has(s.key)) throw new Error(`source ${s.key} exists`);
  sources.push(s);
  byKey.set(s.key, s);
};

// Simon and Newell: the three other predictions, read on the same scan.
const sn = byKey.get('simon-newell-1958');
const snReaders = `${CHECKER}; ${SELF}`;
for (const passage of [
  'That within ten years a digital computer will discover and prove an important new mathematical theorem.',
  'That within ten years a digital computer will write music that will be accepted by critics as possessing considerable aesthetic value.',
  'That within ten years most theories in psychology will take the form of computer programs, or of qualitative statements about the characteristics of computer programs.',
])
  sn.checkedCopy.passages.push({
    readBy: snReaders,
    locator: passage.includes('psychology')
      ? 'Printed pp. 7–8 / bundle PDF pp. 13–14'
      : 'Printed p. 7 / bundle PDF p. 13',
    passage,
  });

addSource({
  key: 'vinge1983',
  cacheKey: null,
  url: 'https://gwern.net/doc/transhumanism/1983-vinge.pdf',
  title: 'First Word',
  authors: ['Vernor Vinge'],
  publisher: 'Omni',
  date: {
    value: '1983-01',
    kind: 'published',
    note: 'Omni, January 1983, p. 10. The scanned page prints the page number and "OMNI" but no issue date; the month is the dataset\'s and the hosting site\'s.',
  },
  kind: 'column',
  version:
    'One-page image scan hosted by gwern.net; its text layer holds 41 words, so the page was read visually.',
  datasetSource: 'source-vinge-1983-omni-scan',
  paraphraseOnly:
    'The dataset records this source with "bibliographic metadata and labelled paraphrases only" (the scan is a third-party copy whose permission to host is not established). Records use labelled paraphrases; the column\'s words appear only in quotation marks inside them.',
  checkedCopy: {
    url: 'https://gwern.net/doc/transhumanism/1983-vinge.pdf',
    sha256: '6d2f9a0afec5bf4ca347e78c4326c88799d0e69e274197f669a121aca5c7d8a4',
    note: 'read visually at 300 dpi by the preparing session on 2026-11-05; same bytes as the copy the cross-family checker read on 2026-11-03',
    passages: [
      {
        readBy: SELF,
        locator: 'p. 10, middle column, last paragraph',
        passage:
          'Surprise—it is a future that will happen as soon as superhuman intelligences are created. And given our progress in computer and biological sciences, that should be between 20 and 100 years from now.',
      },
      {
        readBy: SELF,
        locator: 'p. 10, right column, first paragraph',
        passage:
          'So far there has been little progress in automating the distinct prerogatives of the human mind. During the next 20 years this will change.',
      },
    ],
  },
});

const capture = (key, o) =>
  addSource({
    key,
    cacheKey: null,
    ...o,
    checkedCopy: {
      ...o.checkedCopy,
      note: `${o.checkedCopy.note}; read by the cross-family checker on 2026-11-03 (HTTP 200); not reachable from this environment`,
    },
  });
capture('legg2009', {
  url: 'http://www.vetta.org/2009/12/tick-tock-tick-tock-bing/',
  title: 'Tick, tock, tick, tock… BING',
  authors: ['Shane Legg'],
  publisher: 'vetta.org (author’s blog)',
  date: {
    value: '2009-12-07',
    kind: 'posted',
    note: 'Post date "December 7th, 2009" as read by the checker in a capture of 2009-12-13.',
  },
  kind: 'post',
  version:
    'Internet Archive capture 20091213040508, read by the cross-family checker; vetta.org returns HTTP 403 and web.archive.org does not answer this environment.',
  checkedCopy: {
    url: 'https://web.archive.org/web/20091213040508/http://www.vetta.org:80/2009/12/tick-tock-tick-tock-bing/',
    capture: '20091213040508',
    sha256: '3b97f8c7c51614738e5e4a1fc2777a9f38e257753e60fc5f041b3a14b1faaba0',
    note: 'capture of 2009-12-13',
    passages: [
      {
        readBy: CHECKER,
        locator: 'Main post, AGI-distribution paragraph',
        passage:
          'while my mode is about 2025, my expected value is actually a bit higher at 2028.',
      },
      {
        readBy: CHECKER,
        locator: 'Same paragraph',
        passage:
          'my 90% credibility region, which from my current belief distribution comes out at 2018 to 2036.',
      },
    ],
  },
});
capture('legg2010', {
  url: 'http://www.vetta.org/2010/12/goodbye-2010/',
  title: 'Goodbye 2010',
  authors: ['Shane Legg'],
  publisher: 'vetta.org (author’s blog)',
  date: {
    value: '2010-12-10',
    kind: 'posted',
    note: 'Post date as reported by the checker (10 December 2010), read in a capture of 2010-12-14.',
  },
  kind: 'post',
  version:
    'Internet Archive capture 20101214110948, read by the cross-family checker; not reachable from this environment.',
  checkedCopy: {
    url: 'https://web.archive.org/web/20101214110948/http://www.vetta.org:80/2010/12/goodbye-2010/',
    capture: '20101214110948',
    sha256: '57c1f62da8e5cd90560cc76eebc7b6701991cdb9b24112d7dbc25142855826f7',
    note: 'capture of 2010-12-14',
    passages: [
      {
        readBy: CHECKER,
        locator: 'Main post, human-level AGI paragraph',
        passage:
          'Basically, I gave it a log-normal distribution with a mean of 2028, and a mode of 2025.',
      },
    ],
  },
});
capture('legg2011blog', {
  url: 'http://www.vetta.org/2011/12/goodbye-2011-hello-2012/',
  title: 'Goodbye 2011, hello 2012',
  authors: ['Shane Legg'],
  publisher: 'vetta.org (author’s blog)',
  date: {
    value: '2011-12-31',
    kind: 'posted',
    note: 'Post date as reported by the checker (31 December 2011), read in a capture of 2012-04-06.',
  },
  kind: 'post',
  version:
    'Internet Archive capture 20120406082032, read by the cross-family checker; not reachable from this environment.',
  checkedCopy: {
    url: 'https://web.archive.org/web/20120406082032/http://www.vetta.org:80/2011/12/goodbye-2011-hello-2012/',
    capture: '20120406082032',
    sha256: '6ce2124dd0b52f29776d61d446fba6bc891e68573deda2cd624b86257d85c9d2',
    note: 'capture of 2012-04-06',
    passages: [
      {
        readBy: CHECKER,
        locator: 'Main post, opening paragraph',
        passage:
          'I give it a log-normal distribution with a mean of 2028 and a mode of 2025, under the assumption that nothing crazy happens like a nuclear war.',
      },
    ],
  },
});
capture('fhi2011-1', {
  url: 'http://www.fhi.ox.ac.uk/reports/2011-1.pdf',
  title: 'Machine Intelligence Survey (FHI Technical Report #2011-1)',
  authors: ['Anders Sandberg', 'Nick Bostrom'],
  publisher: 'Future of Humanity Institute, University of Oxford',
  date: {
    value: '2011',
    kind: 'survey-report',
    note: 'Technical report 2011-1; the poll was taken at the FHI Winter Intelligence conference on 16 January 2011.',
  },
  kind: 'report',
  version:
    'Internet Archive capture 20161224100323 of the PDF, read by the cross-family checker; fhi.ox.ac.uk refuses this environment.',
  checkedCopy: {
    url: 'https://web.archive.org/web/20161224100323/http://www.fhi.ox.ac.uk/reports/2011-1.pdf',
    capture: '20161224100323',
    sha256: '7c6679ca2bb66ce8d1e5d1647bdd358d3fa46ab722758d2e85899add27d8ddb9',
    note: 'capture of 2016-12-24 of the report PDF',
    passages: [
      {
        readBy: CHECKER,
        locator: 'Printed p. 1 / PDF p. 2',
        passage:
          'At the FHI Winter Intelligence conference on machine intelligence 16/1 2011 an informal poll was conducted',
      },
      {
        readBy: CHECKER,
        locator: 'Printed p. 1 / PDF p. 2',
        passage:
          'The median estimate of when there will be 10% chance of HLMI was 2028',
      },
      {
        readBy: CHECKER,
        locator: 'Printed p. 1 / PDF p. 2',
        passage:
          'The median estimate of when there will be 50% chance of HLMI was 2050',
      },
      {
        readBy: CHECKER,
        locator: 'Printed p. 1 / PDF p. 2',
        passage:
          'The median estimate of when there will be 90% chance of HLMI was 2150',
      },
    ],
  },
});
capture('openai-2025-progress', {
  url: 'https://openai.com/index/ai-progress-and-recommendations/',
  title: 'AI progress and recommendations',
  authors: ['OpenAI'],
  publisher: 'OpenAI',
  date: {
    value: '2025-11-06',
    kind: 'published',
    note: 'The capture bears 6 November 2025 (checker’s reading).',
  },
  kind: 'announcement',
  version:
    'Internet Archive capture 20251107162450, read by the cross-family checker; openai.com returns HTTP 403 to this environment.',
  datasetSource: undefined,
  checkedCopy: {
    url: 'https://web.archive.org/web/20251107162450/https://openai.com/index/ai-progress-and-recommendations/',
    capture: '20251107162450',
    sha256: '9230648568d82bb725b38a1c5cae448534376f0ef667493930fbcb38915e55a5',
    note: 'capture of 2025-11-07',
    passages: [
      {
        readBy: CHECKER,
        locator: 'Main text, dated expectations',
        passage:
          'In 2026, we expect AI to be capable of making very small discoveries.',
      },
      {
        readBy: CHECKER,
        locator: 'Next sentence',
        passage:
          'In 2028 and beyond, we are pretty confident we will have systems that can make more significant discoveries (though we could of course be wrong, this is what our research progress appears to indicate).',
      },
    ],
  },
});
capture('metaculus5121-20250105', {
  url: 'https://www.metaculus.com/questions/5121/date-of-artificial-general-intelligence/',
  title:
    'When will the first general AI system be devised, tested, and publicly announced? (Metaculus question 5121, capture of 5 January 2025)',
  authors: ['Metaculus'],
  publisher: 'Metaculus',
  date: {
    value: '2025-01-05',
    kind: 'captured',
    note: "Internet Archive capture 20250105212836. The question was opened earlier; its title and resolution criteria changed between captures, so the record uses this capture's own.",
  },
  kind: 'platform question page',
  version:
    'Internet Archive capture 20250105212836, read by the cross-family checker; live Metaculus pages were not used, and neither the site nor the archive answers this environment.',
  checkedCopy: {
    url: 'https://web.archive.org/web/20250105212836/https://www.metaculus.com/questions/5121/date-of-artificial-general-intelligence/',
    capture: '20250105212836',
    sha256: '59b428158708ca419c1d2ae39199a43145995dd88439caf9239799a4fb77cc13',
    note: 'capture of 2025-01-05; resolution criteria text SHA-256 ce9fbea8adda21f3…, 3,081 characters (checker)',
    passages: [
      {
        readBy: CHECKER,
        locator: 'Question title',
        passage:
          'When will the first general AI system be devised, tested, and publicly announced?',
      },
      {
        readBy: CHECKER,
        locator: 'Community prediction as displayed',
        passage: '2031-06-14',
      },
    ],
  },
});
for (const s of sources)
  if (s.datasetSource === undefined) delete s.datasetSource;

// ---------------------------------------------------------------- A. Simon and Newell, the other three
const snOccasion = {
  date: '1957-11-14',
  kind: 'address',
  note: 'Banquet address at the Twelfth National Meeting of the Operations Research Society of America, Pittsburgh (footnote, printed p. 1); the passage says "As of the present—1957".',
};
const snShared = {
  predictor: { name: 'Herbert A. Simon and Allen Newell', kind: 'persons' },
  sourceDate: date(
    '1958',
    'published',
    'Operations Research 6 (1), January–February 1958; the text of an address of 14 November 1957.',
  ),
  occasion: snOccasion,
  horizon: {
    asStated: 'within ten years',
    words: 'within ten years',
    kind: 'relative',
    interval: { amount: 'ten', unit: 'years', from: 'occasion' },
    precision: 'year',
  },
  probability: null,
  copyRead:
    'Scan of the printed article in a 2007 course-readings PDF (cse.buffalo.edu), no text layer; read visually by the cross-family checker on 2026-11-03 and by the preparing session on 2026-11-05.',
};
const snIntro = q(
  'simon-newell-1958',
  'Printed p. 7 / bundle PDF p. 13',
  'On the basis of these developments, and the speed with which research in this field is progressing, I am willing to make the following predictions, to be realized within the next ten years:',
  '2026-11-05',
);
const snQual = (n) =>
  `Prediction ${n} of the four numbered predictions introduced by "I am willing to make the following predictions"; the speaker is Simon, and the opening footnote says "its content is a joint product of the authors". The first is recorded as pr-a-simon-newell-1958-chess.`;
add('A', {
  id: 'pr-a-simon-newell-1958-theorem',
  ...snShared,
  event:
    'a digital computer will discover and prove an important new mathematical theorem',
  qualification: snQual(2),
  evidence: [
    q(
      'simon-newell-1958',
      'Printed p. 7 / bundle PDF p. 13, prediction 2',
      'That within ten years a digital computer will discover and prove an important new mathematical theorem.',
      '2026-11-05',
    ),
    snIntro,
  ],
});
add('A', {
  id: 'pr-a-simon-newell-1958-music',
  ...snShared,
  event:
    'a digital computer will write music that will be accepted by critics as possessing considerable aesthetic value',
  qualification: `${snQual(3)} The page before the predictions reports that the ILLIAC "composes music" and that "a competent judge" called the result "aesthetically interesting"; that is the author's description of the present, not part of the prediction.`,
  evidence: [
    q(
      'simon-newell-1958',
      'Printed p. 7 / bundle PDF p. 13, prediction 3',
      'That within ten years a digital computer will write music that will be accepted by critics as possessing considerable aesthetic value.',
      '2026-11-05',
    ),
    snIntro,
  ],
});
add('A', {
  id: 'pr-a-simon-newell-1958-psychology',
  ...snShared,
  event:
    'most theories in psychology will take the form of computer programs, or of qualitative statements about the characteristics of computer programs',
  qualification: `${snQual(4)} The sentence runs over the page break.`,
  evidence: [
    q(
      'simon-newell-1958',
      'Printed pp. 7–8 / bundle PDF pp. 13–14, prediction 4',
      'That within ten years most theories in psychology will take the form of computer programs, or of qualitative statements about the characteristics of computer programs.',
      '2026-11-05',
    ),
    snIntro,
  ],
});

// ---------------------------------------------------------------- B. Vinge, Omni, 1983
const para = (source, locator, passage, checkedAt) => ({
  source,
  locator,
  passage,
  passageType: 'paraphrase',
  sourceRole: 'primary',
  checkedAt,
});
add('B', {
  id: 'pr-b-vinge-1983-twenty-to-hundred-years',
  predictor: {
    name: 'Vernor Vinge',
    kind: 'person',
    entityId: 'vernor-vinge',
  },
  sourceDate: date(
    '1983-01',
    'published',
    'Omni, January 1983, p. 10 (issue month from the dataset and the hosting site; the page prints no date).',
  ),
  event: 'superhuman intelligences are created',
  eventNote:
    'The column says the future it describes "will happen as soon as superhuman intelligences are created"; "that should be" refers back to that creation.',
  horizon: {
    asStated: 'between 20 and 100 years from now',
    words: 'between 20 and 100 years from now',
    kind: 'relative',
    interval: {
      amount: 'between 20 and 100',
      unit: 'years',
      from: 'the source date',
    },
    relation: 'window',
    precision: 'decades',
  },
  probability: null,
  confidence: { asStated: '"should be"', words: 'should be' },
  conditions:
    'Grounded in "our progress in computer and biological sciences" (the column\'s wording).',
  copyRead:
    'One-page image scan (gwern.net), read visually by the preparing session on 2026-11-05. The cross-family checker\'s transcription of 2026-11-03 gives a different sentence ("given our progress in computer hardware and software, I feel this is likely to happen between 20 and 100 years from now"), which the scan does not show; the second check is asked to read the page again.',
  qualification:
    "Recorded as a labelled paraphrase, as the dataset does for this source; the column's words are in quotation marks. The column is a magazine opinion page; the dataset already holds it (claims on the singularity and on its 20-to-100-year projection, as paraphrases). Vinge's 1993 paper is recorded separately.",
  dataset: { sourceIds: ['source-vinge-1983-omni-scan'] },
  evidence: [
    para(
      'vinge1983',
      'p. 10, middle column, last paragraph',
      'Vinge writes that this future “will happen as soon as superhuman intelligences are created” and, “given our progress in computer and biological sciences”, that this “should be between 20 and 100 years from now”.',
      '2026-11-05',
    ),
  ],
});
add('B', {
  id: 'pr-b-vinge-1983-next-twenty-years',
  predictor: {
    name: 'Vernor Vinge',
    kind: 'person',
    entityId: 'vernor-vinge',
  },
  sourceDate: date(
    '1983-01',
    'published',
    'Omni, January 1983, p. 10 (issue month from the dataset and the hosting site; the page prints no date).',
  ),
  event: 'this will change',
  eventNote:
    '"This" is the state described in the previous sentence: "little progress in automating the distinct prerogatives of the human mind". The column goes on to programs for symbolic processing and students\' hand computers.',
  horizon: {
    asStated: 'During the next 20 years',
    words: 'During the next 20 years',
    kind: 'relative',
    interval: { amount: '20', unit: 'years', from: 'the source date' },
    relation: 'within',
    precision: 'year',
  },
  probability: null,
  copyRead:
    'One-page image scan (gwern.net), read visually by the preparing session on 2026-11-05; not among the passages the cross-family checker transcribed.',
  qualification:
    'Recorded as a labelled paraphrase, as the dataset does for this source. The sentence opens the column\'s description of a gradual passage ("The passage into this great singularity should not be abrupt").',
  dataset: { sourceIds: ['source-vinge-1983-omni-scan'] },
  evidence: [
    para(
      'vinge1983',
      'p. 10, right column, first paragraph',
      'Vinge writes that “so far there has been little progress in automating the distinct prerogatives of the human mind” and that “during the next 20 years this will change”.',
      '2026-11-05',
    ),
  ],
});

// ---------------------------------------------------------------- E. Legg, vetta.org, 2009–2011
const legg = { name: 'Shane Legg', kind: 'person', entityId: 'shane-legg' };
const leggNote =
  'The passage\'s "it" is, in the checker\'s description of the paragraph, the arrival of human-level AGI; the antecedent sentence was not transcribed, and the second check is asked for it.';
add('E', {
  id: 'pr-e-legg-2009-mode-2025',
  status: 'awaiting-confirmation',
  predictor: legg,
  sourceDate: date(
    '2009-12-07',
    'posted',
    'Post date as read by the checker in a capture of 2009-12-13.',
  ),
  attested: {
    date: '2009-12-13',
    note: 'Internet Archive capture 20091213040508, read by the cross-family checker.',
  },
  event: 'human-level AGI',
  eventType: 'paraphrase',
  eventNote: leggNote,
  horizon: {
    asStated:
      'mode "about 2025"; expected value "a bit higher at 2028"; 90% credibility region "2018 to 2036"',
    kind: 'quantile',
    years: [2025, 2028, 2018, 2036],
    precision: 'year',
  },
  probability: {
    asStated: 'mode; expected value; "90% credibility region"',
    words: '90% credibility region',
  },
  points: [
    { probability: 'mode', horizon: 'about 2025' },
    { probability: 'expected value', horizon: 'a bit higher at 2028' },
    { probability: '90% credibility region', horizon: '2018 to 2036' },
  ],
  copyRead:
    'Internet Archive capture 20091213040508, read by the cross-family checker on 2026-11-03; not reachable from the preparing environment.',
  qualification: `${HOLD} An expected value is not a median; the record keeps the post's terms. The 2011 interview (pr-b-legg-2011-human-level) is a separate source and is not merged with this distribution.`,
  evidence: [
    q(
      'legg2009',
      'Main post, AGI-distribution paragraph',
      'while my mode is about 2025, my expected value is actually a bit higher at 2028.',
      '2026-11-03',
    ),
    q(
      'legg2009',
      'Same paragraph',
      'my 90% credibility region, which from my current belief distribution comes out at 2018 to 2036.',
      '2026-11-03',
    ),
  ],
});
add('E', {
  id: 'pr-e-legg-2010-log-normal',
  status: 'awaiting-confirmation',
  predictor: legg,
  sourceDate: date(
    '2010-12-10',
    'posted',
    'Post date as reported by the checker, read in a capture of 2010-12-14.',
  ),
  attested: {
    date: '2010-12-14',
    note: 'Internet Archive capture 20101214110948, read by the cross-family checker.',
  },
  event: 'human-level AGI',
  eventType: 'paraphrase',
  eventNote: leggNote,
  horizon: {
    asStated: 'log-normal distribution with a mean of 2028, and a mode of 2025',
    kind: 'quantile',
    years: [2028, 2025],
    precision: 'year',
  },
  probability: { asStated: 'mean; mode', words: 'log-normal distribution' },
  points: [
    { probability: 'a mean', horizon: '2028' },
    { probability: 'a mode', horizon: '2025' },
  ],
  copyRead:
    'Internet Archive capture 20101214110948, read by the cross-family checker on 2026-11-03; not reachable from the preparing environment.',
  qualification: `${HOLD} "I gave it" is in the past tense; whether the post restates the 2009 estimate or reports a new one is for the second check to read in context.`,
  evidence: [
    q(
      'legg2010',
      'Main post, human-level AGI paragraph',
      'Basically, I gave it a log-normal distribution with a mean of 2028, and a mode of 2025.',
      '2026-11-03',
    ),
  ],
});
add('E', {
  id: 'pr-e-legg-2011-log-normal',
  status: 'awaiting-confirmation',
  predictor: legg,
  sourceDate: date(
    '2011-12-31',
    'posted',
    'Post date as reported by the checker, read in a capture of 2012-04-06.',
  ),
  attested: {
    date: '2012-04-06',
    note: 'Internet Archive capture 20120406082032, read by the cross-family checker.',
  },
  event: 'human-level AGI',
  eventType: 'paraphrase',
  eventNote: leggNote,
  horizon: {
    asStated: 'log-normal distribution with a mean of 2028 and a mode of 2025',
    kind: 'quantile',
    years: [2028, 2025],
    precision: 'year',
  },
  probability: { asStated: 'mean; mode', words: 'log-normal distribution' },
  points: [
    { probability: 'a mean', horizon: '2028' },
    { probability: 'a mode', horizon: '2025' },
  ],
  conditions:
    '"under the assumption that nothing crazy happens like a nuclear war"',
  copyRead:
    'Internet Archive capture 20120406082032, read by the cross-family checker on 2026-11-03; not reachable from the preparing environment.',
  qualification: `${HOLD} The capture is three months after the post date.`,
  evidence: [
    q(
      'legg2011blog',
      'Main post, opening paragraph',
      'I give it a log-normal distribution with a mean of 2028 and a mode of 2025, under the assumption that nothing crazy happens like a nuclear war.',
      '2026-11-03',
    ),
  ],
});

// ---------------------------------------------------------------- C. FHI Technical Report 2011-1
add('C', {
  id: 'pr-c-fhi-2011-hlmi',
  status: 'awaiting-confirmation',
  form: 'expert-survey',
  predictor: {
    name: 'Sandberg and Bostrom, informal poll at the FHI Winter Intelligence conference (FHI Technical Report 2011-1)',
    kind: 'survey',
  },
  sourceDate: date(
    '2011',
    'survey-report',
    'Poll taken on 16 January 2011 ("16/1 2011"); the report is numbered 2011-1.',
  ),
  attested: {
    date: '2016-12-24',
    note: 'Internet Archive capture 20161224100323 of the report PDF, read by the cross-family checker.',
  },
  event: 'HLMI',
  eventNote:
    'Human-level machine intelligence as the report defines it; the definition was not transcribed and is requested from the second check.',
  horizon: {
    asStated:
      'median estimates: 10% chance of HLMI 2028; 50% chance 2050; 90% chance 2150',
    kind: 'quantile',
    years: [2028, 2050, 2150],
    precision: 'year',
  },
  probability: { asStated: '10%; 50%; 90%', words: '50% chance of HLMI' },
  points: [
    { probability: '10% chance of HLMI', horizon: 'was 2028' },
    { probability: '50% chance of HLMI', horizon: 'was 2050' },
    { probability: '90% chance of HLMI', horizon: 'was 2150' },
  ],
  survey: {
    respondents:
      "participants of the FHI Winter Intelligence conference on machine intelligence; 35 collected surveys, a response rate of about 41% (checker's reading)",
    conducted: '2011-01-16',
    statistic: 'median estimate',
  },
  copyRead:
    'Internet Archive capture 20161224100323, read by the cross-family checker on 2026-11-03; not reachable from the preparing environment.',
  qualification: `${HOLD} The report calls the poll "informal". The checker reports that the estimates assume no global catastrophe; that sentence was not transcribed and is requested. The figures belong to the report, not to any respondent.`,
  evidence: [
    q(
      'fhi2011-1',
      'Printed p. 1 / PDF p. 2',
      'At the FHI Winter Intelligence conference on machine intelligence 16/1 2011 an informal poll was conducted',
      '2026-11-03',
    ),
    q(
      'fhi2011-1',
      'Printed p. 1 / PDF p. 2',
      'The median estimate of when there will be 10% chance of HLMI was 2028',
      '2026-11-03',
    ),
    q(
      'fhi2011-1',
      'Printed p. 1 / PDF p. 2',
      'The median estimate of when there will be 50% chance of HLMI was 2050',
      '2026-11-03',
    ),
    q(
      'fhi2011-1',
      'Printed p. 1 / PDF p. 2',
      'The median estimate of when there will be 90% chance of HLMI was 2150',
      '2026-11-03',
    ),
  ],
});

// ---------------------------------------------------------------- D. Metaculus (decision 15a)
add('D', {
  id: 'pr-d-metaculus-5121-capture-2025-01-05',
  status: 'awaiting-confirmation',
  form: 'platform-question',
  predictor: {
    name: 'Metaculus community prediction, question 5121',
    kind: 'platform',
  },
  sourceDate: date(
    '2025-01-05',
    'captured',
    'The figure is the one displayed on this capture; the question page changes continually.',
  ),
  capture: {
    date: '2025-01-05',
    timestamp: '20250105212836',
    note: 'Internet Archive capture, read by the cross-family checker. Of 16 dated captures of questions 5121 and 3479 that the checker read, this is the only one with a readable community figure in its first-of-January slot.',
  },
  event:
    'When will the first general AI system be devised, tested, and publicly announced?',
  eventNote:
    'The question\'s title on this capture; its resolution criteria (about 3,000 characters on the capture) define "general AI system" and changed over time. The record points to the capture for them.',
  horizon: {
    asStated: '2031-06-14 (community prediction as displayed)',
    words: '2031-06-14',
    kind: 'absolute',
    years: [2031],
    precision: 'day',
  },
  probability: null,
  copyRead:
    'Internet Archive capture 20250105212836, read by the cross-family checker on 2026-11-03; not reachable from the preparing environment.',
  qualification: `${HOLD} The figure is the platform's aggregate of its forecasters on one day, not a prediction by any named person. Which statistic the displayed date is (the checker's serialised table suggests a median between quartiles of 2027-05-10 and 2041-08-31) is for the second check to confirm from the page; the pack records only the displayed date. Decision 15a: the page session may drop the platform point if a single figure looks out of place.`,
  evidence: [
    q(
      'metaculus5121-20250105',
      'Question title',
      'When will the first general AI system be devised, tested, and publicly announced?',
      '2026-11-03',
    ),
    q(
      'metaculus5121-20250105',
      'Community prediction as displayed',
      '2031-06-14',
      '2026-11-03',
    ),
  ],
});

// ---------------------------------------------------------------- F. OpenAI, November 2025
const oai = { name: 'OpenAI', kind: 'organisation', entityId: 'openai' };
const oaiShared = {
  status: 'awaiting-confirmation',
  predictor: oai,
  sourceDate: date(
    '2025-11-06',
    'published',
    "The capture of 2025-11-07 bears 6 November 2025 (checker's reading).",
  ),
  attested: {
    date: '2025-11-07',
    note: 'Internet Archive capture 20251107162450, read by the cross-family checker.',
  },
  probability: null,
  copyRead:
    'Internet Archive capture 20251107162450, read by the cross-family checker on 2026-11-03; not reachable from the preparing environment.',
};
add('F', {
  id: 'pr-f-openai-2025-very-small-discoveries',
  ...oaiShared,
  event: 'AI to be capable of making very small discoveries',
  horizon: {
    asStated: 'In 2026',
    words: 'In 2026',
    kind: 'absolute',
    years: [2026],
    relation: 'in',
    precision: 'year',
  },
  confidence: { asStated: '"we expect"', words: 'we expect' },
  qualification: `${HOLD} The page is unsigned and published under the company's name. Altman's "The Gentle Singularity" (June 2025) is recorded separately.`,
  evidence: [
    q(
      'openai-2025-progress',
      'Main text, dated expectations',
      'In 2026, we expect AI to be capable of making very small discoveries.',
      '2026-11-03',
    ),
  ],
});
add('F', {
  id: 'pr-f-openai-2025-more-significant-discoveries',
  ...oaiShared,
  event: 'we will have systems that can make more significant discoveries',
  horizon: {
    asStated: 'In 2028 and beyond',
    words: 'In 2028 and beyond',
    kind: 'absolute',
    years: [2028],
    relation: 'from',
    precision: 'year',
  },
  confidence: {
    asStated: '"we are pretty confident"',
    words: 'we are pretty confident',
  },
  hedge:
    '"though we could of course be wrong, this is what our research progress appears to indicate"',
  qualification: `${HOLD} The page is unsigned and published under the company's name; the hedge is part of the sentence.`,
  evidence: [
    q(
      'openai-2025-progress',
      'Next sentence',
      'In 2028 and beyond, we are pretty confident we will have systems that can make more significant discoveries (though we could of course be wrong, this is what our research progress appears to indicate).',
      '2026-11-03',
    ),
  ],
});

// ---------------------------------------------------------------- search log
const om = readJson('omissions.json');
const setDisposition = (prefix, text) => {
  const hit = om.items.filter((x) => x.text.startsWith(prefix));
  if (hit.length !== 1) throw new Error(`omission ${prefix}: ${hit.length}`);
  hit[0].disposition = text;
};
setDisposition(
  'Simon and Newell (1958), the other three',
  'Recorded in pass 2 (2026-11-05): pr-a-simon-newell-1958-theorem, -music and -psychology, from the scan read by the checker and by the preparing session.',
);
setDisposition(
  'Vernor Vinge, "First Word"',
  "Recorded in pass 2 (2026-11-05) as labelled paraphrases (the dataset's rule for this source): pr-b-vinge-1983-twenty-to-hundred-years and pr-b-vinge-1983-next-twenty-years. The checker's transcription of the 20-to-100-years sentence differs from the scan; the second check is asked to re-read it.",
);
setDisposition(
  'Shane Legg, posts on vetta.org',
  "Recorded in pass 2 (2026-11-05) from the checker's transcriptions of captures, held until the second check re-reads them: pr-e-legg-2009-mode-2025, pr-e-legg-2010-log-normal, pr-e-legg-2011-log-normal. Separate from the 2011 interview.",
);
setDisposition(
  'Sandberg and Bostrom',
  "Recorded in pass 2 (2026-11-05) from the checker's transcription of a 2016 capture, held until the second check re-reads it: pr-c-fhi-2011-hlmi (a survey report).",
);
setDisposition(
  'Metaculus questions on general AI',
  "Decision 15a: one figure recorded in pass 2 (2026-11-05), from the checker's reading of capture 20250105212836 of question 5121, held until the second check re-reads it: pr-d-metaculus-5121-capture-2025-01-05. The other 15 dated slots show no readable figure; nothing is converted from serialised distributions.",
);
setDisposition(
  'OpenAI, "AI progress and recommendations"',
  "Recorded in pass 2 (2026-11-05) from the checker's transcription of capture 20251107162450, held until the second check re-reads it: pr-f-openai-2025-very-small-discoveries and pr-f-openai-2025-more-significant-discoveries.",
);

writeFileSync(
  join(DRAFTS, 'sources.json'),
  JSON.stringify({ sources }, null, 2) + '\n',
);
writeFileSync(
  join(DRAFTS, 'records-pass2.json'),
  JSON.stringify({ pass: 2, records }, null, 2) + '\n',
);
writeFileSync(
  join(DRAFTS, 'omissions.json'),
  JSON.stringify(om, null, 2) + '\n',
);
console.log(`pass 2: ${records.length} records`);
