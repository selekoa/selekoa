// Prediction records for the pack, by group. `node drafts/records.src.mjs`
// writes drafts/records-<group>.json. Every predicted event, horizon wording
// and probability wording must lie inside a quoted passage (build.mjs checks).
// Horizons are recorded as worded: `years` only where the source prints them;
// relative intervals keep their amount and unit and are never converted.
import { writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
const DIR = dirname(fileURLToPath(import.meta.url));
const CHECKED = '2026-11-02';

const q = (source, locator, passage, sourceRole = 'primary') => ({
  source,
  locator,
  passage,
  passageType: 'quote',
  sourceRole,
  checkedAt: CHECKED,
});
const person = (name, entityId) => ({
  name,
  kind: 'person',
  ...(entityId ? { entityId } : {}),
});
const persons = (name) => ({ name, kind: 'persons' });
const org = (name, entityId) => ({
  name,
  kind: 'organisation',
  ...(entityId ? { entityId } : {}),
});
const survey = (name) => ({ name, kind: 'survey' });
const date = (d, kind, note) => ({ date: d, kind, ...(note ? { note } : {}) });

const R = { A: [], B: [], C: [], D: [], E: [], F: [] };
const add = (g, r) =>
  R[g].push({
    group: g,
    form: 'stated-forecast',
    register: 'nonfiction',
    ...r,
  });

// ---------------------------------------------------------------- A. 1950–1979
add('A', {
  id: 'pr-a-turing-1950-imitation-game',
  predictor: person('Alan Turing', 'alan-turing'),
  sourceDate: date('1950-10', 'published'),
  event:
    'it will be possible, to programme computers, with a storage capacity of about 109, to make them play the imitation game so well that an average interrogator will not have more than 70 per cent chance of making the right identification',
  eventNote:
    'The sentence continues "after five minutes of questioning" (second quotation).',
  horizon: {
    asStated: "in about fifty years' time",
    words: "in about fifty years' time",
    kind: 'relative',
    interval: { amount: 'about fifty', unit: 'years', from: 'the source date' },
    precision: 'approximate',
  },
  probability: null,
  hedge: 'Introduced as the author\'s belief ("I believe that").',
  qualification:
    'The "70 per cent" is a threshold inside the predicted event (the interrogator\'s chance of a right identification), not a probability attached to the prediction. "109" is the transcription\'s rendering of 10 to the ninth power, printed with a superscript in Mind. The transcription read is a later typeset copy; the dataset holds the Mind offprint scan.',
  evidence: [
    q(
      'turing1950-ox',
      '§6, opening paragraph (transcription PDF p. 8)',
      "I believe that in about fifty years' time it will be possible, to programme computers, with a storage capacity of about 109, to make them play the imitation game so well that an average interrogator will not have more than 70 per cent chance of making the right identification",
    ),
    q(
      'turing1950-ox',
      'Same sentence',
      'the right identification after five minutes of questioning.',
    ),
  ],
  dataset: { sourceIds: ['source-turing-1950-amt-b-19'] },
});
add('A', {
  id: 'pr-a-turing-1950-end-of-century',
  predictor: person('Alan Turing', 'alan-turing'),
  sourceDate: date('1950-10', 'published'),
  event:
    'the use of words and general educated opinion will have altered so much that one will be able to speak of machines thinking without expecting to be contradicted',
  horizon: {
    asStated: 'at the end of the century',
    words: 'at the end of the century',
    kind: 'period',
    precision: 'end of a century',
  },
  probability: null,
  hedge: 'Introduced as the author\'s belief ("I believe that").',
  qualification:
    'The predicted event concerns usage and educated opinion, not a machine capability. The same paragraph calls the question "Can machines think?" "too meaningless to deserve discussion".',
  evidence: [
    q(
      'turing1950-ox',
      '§6, opening paragraph (transcription PDF p. 8)',
      'Nevertheless I believe that at the end of the century the use of words and general educated opinion will have altered so much that one will be able to speak of machines thinking without expecting to be contradicted.',
    ),
  ],
  dataset: { sourceIds: ['source-turing-1950-amt-b-19'] },
});
add('A', {
  id: 'pr-a-dartmouth-1955-summer',
  predictor: persons(
    "John McCarthy, Marvin Minsky, Nathaniel Rochester and Claude Shannon (the proposal's signatories)",
  ),
  sourceDate: date('1955-08-31', 'dated-typescript'),
  event: 'a significant advance can be made in one or more of these problems',
  horizon: {
    asStated:
      'for a summer (a "2 month, 10 man study" during the summer of 1956)',
    words: 'work on it together for a summer',
    kind: 'relative',
    interval: { amount: 'one', unit: 'summer', from: 'the proposed study' },
    precision: 'season',
  },
  probability: null,
  conditions:
    'if a carefully selected group of scientists work on it together for a summer',
  hedge: 'Introduced as "We think that".',
  qualification:
    '"These problems" are the aims listed in the preceding sentence: making machines use language, form abstractions and concepts, solve kinds of problems now reserved for humans, and improve themselves. The statement is part of a funding proposal.',
  evidence: [
    q(
      'dartmouth-jmc',
      'Opening section, second paragraph (transcription p. 1)',
      'We think that a significant advance can be made in one or more of these problems if a carefully selected group of scientists work on it together for a summer.',
    ),
    q(
      'dartmouth-jmc',
      'Opening section, first sentence',
      'We propose that a 2 month, 10 man study of artificial intelligence be carried out during the summer of 1956',
    ),
  ],
  dataset: { sourceIds: ['source-dartmouth-1955-facsimile'] },
});
add('A', {
  id: 'pr-a-simon-newell-1958-chess',
  status: 'awaiting-retrieval',
  predictor: persons('Herbert A. Simon and Allen Newell'),
  sourceDate: date(
    '1958-01',
    'published',
    "Operations Research 6 (1), January–February 1958. Simon's 1998 email dates the prediction to an ORSA meeting in 1957 (claimed date: the lecture, not the printed wording).",
  ),
  event:
    "within ten years a digital computer will be the world's chess champion, unless the rules bar it from competition",
  horizon: {
    asStated: 'within ten years',
    words: 'within ten years',
    kind: 'relative',
    interval: { amount: 'ten', unit: 'years', from: 'the source date' },
    precision: 'year',
  },
  probability: null,
  conditions: 'unless the rules bar it from competition',
  qualification:
    'Quotation not yet checked against the article: the wording is the form usually cited and is held until a retrieval of Operations Research 6 (1), pp. 1–10, confirms it (codex-retrieval.md, item 1). Simon\'s 1998 email refers to "our (four) predictions"; the other three are not recorded until the article is read.',
  evidence: [
    q(
      'simon-newell-1958',
      'p. 7 (to be confirmed)',
      "within ten years a digital computer will be the world's chess champion, unless the rules bar it from competition",
    ),
    {
      source: 'simon-email-1998',
      locator: "Simon's reply of 24 September 1998, first paragraph",
      passage:
        "Simon's reply dates the prediction to an ORSA meeting in 1957 and gives its publication as Simon and Newell, Operations Research 6:1-10 (1958).",
      passageType: 'paraphrase',
      sourceRole: 'primary',
      checkedAt: CHECKED,
    },
  ],
});
add('A', {
  id: 'pr-a-good-1965-ultraintelligent-machine',
  predictor: person('I. J. Good', 'ij-good'),
  sourceDate: date('1965', 'published'),
  event:
    'an ultraintelligent machine will be built and that it will be the last invention that man need make',
  horizon: {
    asStated: 'within the twentieth century',
    words: 'within the twentieth century',
    kind: 'period',
    precision: 'century',
  },
  probability: {
    asStated: '"more probable than not"',
    words: 'It is more probable than not',
  },
  qualification:
    'Stated in section 9, "Conclusions", which the author introduces as "primarily the opinions of the writer". The same sentence gives the reason ("since it will lead to an \'intelligence explosion\'").',
  evidence: [
    q(
      'good1965',
      '§9, "Conclusions", first item (printed p. 78; PDF p. 48)',
      'It is more probable than not that, within the twentieth century, an ultraintelligent machine will be built and that it will be the last invention that man need make',
    ),
  ],
  dataset: { sourceIds: ['source-good'] },
});
add('A', {
  id: 'pr-a-michie-1973-opinion-poll',
  form: 'expert-survey',
  predictor: survey(
    'Opinion poll reported by Donald Michie, "Machines and the theory of intelligence" (Nature, 1973)',
  ),
  sourceDate: date(
    '1973',
    'published',
    'Chapter heading "(1973)"; first published in Nature 241 (1973): 507–512. The poll was "taken last year", that is in 1972.',
  ),
  attested: {
    date: '1986',
    note: 'Wording read in the 1986 second edition of On Machine Intelligence (chapter 11).',
  },
  event: 'computing system exhibiting intelligence at adult human level',
  horizon: {
    asStated:
      'Given only in Fig. 11.4, as the frequency of answers over "Estimated number of years before" the event, in bands from 10 to more than 50 years',
    kind: 'figure',
    precision: 'figure; values not read off by the pack',
  },
  probability: null,
  survey: {
    respondents: 'sixty-seven British and American computer scientists',
    conducted: '1972 ("last year")',
    question: 'Estimated number of years before the event (figure caption)',
  },
  qualification:
    'The text states no aggregate number; the horizon is given only in the figure, whose values the pack does not read off. AI Impacts\' reading of the figure (secondary, below) is recorded as that site\'s reading. The text calls the poll a sample of "subjective opinion".',
  evidence: [
    q(
      'michie1986',
      'Chapter 11, "Implications and forecasting", printed pp. 146–147',
      'Fig. 11.4 summarizes some of the results of an opinion',
    ),
    q(
      'michie1986',
      'Fig. 11.4 caption, printed p. 146',
      'Opinion poll on machine intelligence. Estimated number of years before: , computing system exhibiting intelligence at adult human level',
    ),
    q(
      'michie1986',
      'Chapter 11, text after Fig. 11.4, printed p. 146',
      'poll taken last year among sixty-seven British and American computer scientists working in, or close to, the machine intelligence field',
    ),
    q(
      'aiimpacts-michie',
      'Summary paragraph',
      'respondents were roughly divided between expecting human-level intelligence in 20 years, in 50 years and in more than 50 years',
      'secondary',
    ),
  ],
  dataset: { sourceIds: ['source-michie-1986-on-machine-intelligence'] },
});
const lighthillPassage =
  'possibilities in the nineteen-eighties include an all-purpose intelligence on a human-scale knowledge base; that awe-inspiring possibilities suggest themselves based on machine intelligence exceeding human intelligence by the year 2000';
add('A', {
  id: 'pr-a-lighthill-1973-correspondents-1980s',
  form: 'reported-statement',
  predictor: persons(
    'Unnamed correspondents of James Lighthill ("able and respected scientists"), as reported by Lighthill',
  ),
  sourceDate: date(
    '1973',
    'published',
    'The report says the predictions were "made in 1972".',
  ),
  event: 'an all-purpose intelligence on a human-scale knowledge base',
  horizon: {
    asStated: 'in the nineteen-eighties',
    words: 'in the nineteen-eighties',
    kind: 'period',
    precision: 'decade',
  },
  probability: null,
  hedge: 'Worded as "possibilities".',
  qualification:
    'Lighthill reports, without naming them, what "able and respected scientists write in letters to the present author"; the wording is his paraphrase of the letters. The same sentence introduces his own call to compare past predictions with performance; that comment is his, not the correspondents\'.',
  evidence: [
    q(
      'lighthill1973',
      'Part I, §3 "Past disappointments"',
      `When able and respected scientists write in letters to the present author that AI, the major goal of computing science, represents another step in the general process of evolution; that ${lighthillPassage.split(';')[0]}`,
    ),
  ],
  dataset: { sourceIds: ['source-th-a-lighthill-1973'] },
});
add('A', {
  id: 'pr-a-lighthill-1973-correspondents-2000',
  form: 'reported-statement',
  predictor: persons(
    'Unnamed correspondents of James Lighthill ("able and respected scientists"), as reported by Lighthill',
  ),
  sourceDate: date(
    '1973',
    'published',
    'The report says the predictions were "made in 1972".',
  ),
  event: 'machine intelligence exceeding human intelligence',
  horizon: {
    asStated: 'by the year 2000',
    words: 'by the year 2000',
    kind: 'absolute',
    years: [2000],
    precision: 'year',
  },
  probability: null,
  hedge: 'Worded as "awe-inspiring possibilities suggest themselves".',
  qualification:
    "As for the companion record: Lighthill's unnamed report of letters he received, in his words.",
  evidence: [
    q(
      'lighthill1973',
      'Part I, §3 "Past disappointments"',
      `${lighthillPassage}; when such predictions are made in 1972`,
    ),
  ],
  dataset: { sourceIds: ['source-th-a-lighthill-1973'] },
});

// ---------------------------------------------------------------- B. 1980–2008
add('B', {
  id: 'pr-b-degaris-1989-commonplace',
  predictor: person('Hugo de Garis'),
  sourceDate: date('1989', 'published'),
  event:
    'it will be commonplace to say that the twenty-first century will be dominated by the machine if humanity so chooses—and maybe even if not',
  horizon: {
    asStated: 'In 20 years time',
    words: 'In 20 years time',
    kind: 'relative',
    interval: { amount: '20', unit: 'years', from: 'the source date' },
    precision: 'year',
  },
  probability: null,
  qualification:
    "The predicted event is a change in what people will say, not a machine capability. Checked against the dataset's passage from the same article.",
  evidence: [
    q(
      'degaris1989',
      'Article text (as in the dataset record ht-w01-degaris-1989-what-if-ai-succeeds)',
      'In 20 years time, it will be commonplace to say that the twenty-first century will be dominated by the machine if humanity so chooses—and maybe even if not.',
    ),
  ],
  dataset: {
    sourceIds: ['source-ht-degaris-1989-what-if-ai-succeeds'],
    claimIds: ['ht-w01-degaris-1989-what-if-ai-succeeds'],
  },
});
add('B', {
  id: 'pr-b-vinge-1993-thirty-years',
  predictor: person('Vernor Vinge', 'vernor-vinge'),
  sourceDate: date(
    '1993-12',
    'published',
    'NASA conference publication of the VISION-21 symposium (March 1993).',
  ),
  event: 'the creation of greater than human intelligence will occur',
  horizon: {
    asStated: 'during the next thirty years',
    words: 'during the next thirty years',
    kind: 'relative',
    interval: { amount: 'thirty', unit: 'years', from: 'the source date' },
    precision: 'year',
  },
  probability: null,
  hedge: 'Introduced as "I believe that".',
  qualification:
    'The sentence gives its basis ("Based largely on this trend", the steady progress of computer hardware). The next sentence restates the horizon as calendar years (companion record).',
  evidence: [
    q(
      'vinge1993',
      'Section "What is the Singularity?" (proceedings p. 12; PDF p. 2)',
      'Based largely on this trend, I believe that the creation of greater than human intelligence will occur during the next thirty years.',
    ),
  ],
  dataset: {
    sourceIds: ['source-vinge-1993-ntrs'],
    claimIds: ['ht-w01-vinge-1993-coming-technological-singularity'],
  },
});
add('B', {
  id: 'pr-b-vinge-1993-2005-2030',
  predictor: person('Vernor Vinge', 'vernor-vinge'),
  sourceDate: date('1993-12', 'published'),
  event: 'this event occurs',
  eventNote:
    '"This event" is the creation of greater than human intelligence (preceding sentence).',
  horizon: {
    asStated:
      "I'll be surprised if this event occurs before 2005 or after 2030",
    words: 'before 2005 or after 2030',
    kind: 'absolute',
    years: [2005, 2030],
    relation: 'window',
    precision: 'year',
  },
  probability: null,
  qualification:
    'The author gives the calendar window himself, "so I\'m not guilty of a relative-time ambiguity". Worded as what would surprise him, not as a probability.',
  evidence: [
    q(
      'vinge1993',
      'Same paragraph (PDF p. 2)',
      "let me more specific: I'll be surprised if this event occurs before 2005 or after 2030.",
    ),
  ],
  dataset: { sourceIds: ['source-vinge-1993-ntrs'] },
});
add('B', {
  id: 'pr-b-yudkowsky-2000-2035-upper-bound',
  predictor: person('Eliezer Yudkowsky', 'eliezer-yudkowsky'),
  sourceDate: date(
    '2000-08-31',
    'captured',
    'Version 1.2.1 ("Updated: 08/31/2000"); the page was first posted on 1996-11-18 (claimed date; the checked wording is that of version 1.2.1).',
  ),
  event: 'the Singularity (the subject of the section "Sooner Than You Think")',
  eventType: 'paraphrase',
  horizon: {
    asStated:
      '2035 "seems like a reasonable upper bound"; "The lower bound? Thirty seconds."',
    words:
      'The most we can say about 2035 is that it seems like a reasonable upper bound',
    kind: 'absolute',
    years: [2035],
    relation: 'upper bound',
    precision: 'year',
  },
  probability: null,
  hedge: '"The most we can say".',
  qualification:
    "The quoted sentence names a bound, not an expected date; its event is the section's subject and is paraphrased. Checked against the dataset's passage from the 2000 capture; the author has since repudiated this text, which the dataset records separately.",
  evidence: [
    q(
      'sits',
      '§3 "Sooner Than You Think", final paragraph',
      'The most we can say about 2035 is that it seems like a reasonable upper bound, given the current rate of progress. The lower bound? Thirty seconds.',
    ),
  ],
  dataset: {
    sourceIds: ['source-sits-2000-capture'],
    claimIds: ['yk-y13-staring-into-the-singularity-c'],
  },
});
add('B', {
  id: 'pr-b-bostrom-1998-first-third',
  predictor: person('Nick Bostrom', 'nick-bostrom'),
  sourceDate: date('1998', 'published'),
  event: 'we will have superhuman artificial intelligence',
  horizon: {
    asStated: 'within the first third of the next century',
    words: 'within the first third of the next century',
    kind: 'period',
    precision: 'third of a century',
  },
  probability: null,
  hedge: 'Worded as "the case for believing that".',
  qualification:
    'The abstract describes what the paper "outlines the case for"; it is the author\'s framing of the argument, not a stated probability. The page is a live copy with a later reprint note.',
  evidence: [
    q(
      'bostrom1998',
      'Abstract',
      'This paper outlines the case for believing that we will have superhuman artificial intelligence within the first third of the next century.',
    ),
  ],
  dataset: { sourceIds: ['source-th-e-bostrom-how-long-before-si'] },
});
add('B', {
  id: 'pr-b-bostrom-1998-hardware-2004-2008',
  predictor: person('Nick Bostrom', 'nick-bostrom'),
  sourceDate: date('1998', 'published'),
  event: 'the required computational power will be reached',
  horizon: {
    asStated:
      'sometime between 2004 and 2008, depending on whether we assume a doubling time of 12 or 18 months',
    words: 'sometime between 2004 and 2008',
    kind: 'absolute',
    years: [2004, 2008],
    relation: 'window',
    precision: 'year',
  },
  probability: null,
  conditions:
    'If we need 100 Tops to simulate the human brain; doubling time of 12 or 18 months.',
  qualification:
    'A conditional projection of hardware, in "the best experimental supercomputers in the world, not necessarily the computers available to AI researchers" (next sentence).',
  evidence: [
    q(
      'bostrom1998',
      'Section on hardware requirements',
      'If we need 100 Tops to simulate the human brain then the required computational power will be reached sometime between 2004 and 2008, depending on whether we assume a doubling time of 12 or 18 months.',
    ),
  ],
  dataset: { sourceIds: ['source-th-e-bostrom-how-long-before-si'] },
});
add('B', {
  id: 'pr-b-moravec-1998-hardware-2020s',
  predictor: person('Hans Moravec', 'hans-moravec'),
  sourceDate: date('1998', 'published'),
  event: 'the required hardware will be available in cheap machines',
  eventNote:
    'Hardware "to match general intellectual performance of the human brain" (abstract).',
  horizon: {
    asStated: 'in the 2020s',
    words: 'in the 2020s',
    kind: 'period',
    precision: 'decade',
  },
  probability: null,
  qualification:
    'The abstract states the basis: "extrapolation of past trends and on examination of technologies under development". The prediction concerns hardware, not the software that would use it.',
  evidence: [
    q(
      'moravec1998jet',
      'Abstract',
      'Based on extrapolation of past trends and on examination of technologies under development, it is predicted that the required hardware will be available in cheap machines in the 2020s.',
    ),
  ],
});
add('B', {
  id: 'pr-b-moravec-1999-before-2050',
  predictor: person('Hans Moravec', 'hans-moravec'),
  sourceDate: date('1999-12', 'published'),
  event: 'robot intelligence will surpass our own',
  horizon: {
    asStated: 'well before 2050',
    words: 'well before 2050',
    kind: 'absolute',
    years: [2050],
    relation: 'before',
    precision: 'year',
  },
  probability: null,
  hedge: '"It suggests that".',
  qualification:
    '"It" is the comparison the article draws in the preceding text. Checked against the dataset\'s passage.',
  evidence: [
    q(
      'moravec1999',
      'Section "Fast Replay", final paragraph',
      'It suggests that robot intelligence will surpass our own well before 2050.',
    ),
  ],
  dataset: {
    sourceIds: ['source-ht-moravec-1999-rise-of-the-robots'],
    claimIds: ['ht-w01-moravec-1999-rise-of-the-robots'],
  },
});
add('B', {
  id: 'pr-b-kurzweil-2001-brain-capacity',
  predictor: person('Ray Kurzweil'),
  sourceDate: date(
    '2001-03-07',
    'published',
    'The page reads "January 2001"; the dataset dates the essay 2001-03-07.',
  ),
  event:
    'supercomputers will achieve one human brain capacity by 2010, and personal computers will do so by around 2020',
  horizon: {
    asStated: 'by 2010 (supercomputers); by around 2020 (personal computers)',
    words: 'by around 2020',
    kind: 'absolute',
    years: [2010, 2020],
    precision: 'year',
  },
  probability: null,
  qualification:
    '"Human brain capacity" is the author\'s computational estimate for the brain, stated in the same section. Introduced as "In line with my earlier predictions".',
  evidence: [
    q(
      'kurzweil2001',
      "Section on the human brain's capacity",
      'In line with my earlier predictions, supercomputers will achieve one human brain capacity by 2010, and personal computers will do so by around 2020.',
    ),
  ],
  dataset: { sourceIds: ['source-ht-kurzweil-2001-loar'] },
});
add('B', {
  id: 'pr-b-kurzweil-2001-1000-dollars-2023',
  predictor: person('Ray Kurzweil'),
  sourceDate: date('2001-03-07', 'published'),
  event: 'We achieve one Human Brain capability (2 * 10^16 cps) for $1,000',
  horizon: {
    asStated: 'around the year 2023',
    words: 'around the year 2023',
    kind: 'absolute',
    years: [2023],
    relation: 'around',
    precision: 'year',
  },
  probability: null,
  qualification:
    'One of the dates the essay lists as output of its own model ("Some prominent dates from this analysis"); the model\'s assumptions are stated in the essay.',
  evidence: [
    q(
      'kurzweil2001',
      'Model section, "Some prominent dates from this analysis"',
      'Some prominent dates from this analysis include the following: We achieve one Human Brain capability (2 * 10^16 cps) for $1,000 around the year 2023.',
    ),
  ],
  dataset: { sourceIds: ['source-ht-kurzweil-2001-loar'] },
});
add('B', {
  id: 'pr-b-legg-2011-human-level',
  predictor: person('Shane Legg', 'shane-legg'),
  sourceDate: date(
    '2011-06-17',
    'posted',
    'Answers by email, posted by the interviewer (XiXiDu) on LessWrong.',
  ),
  event: 'the development of human-level machine intelligence',
  horizon: {
    asStated: '10%: 2018; 50%: 2028; 90%: 2050',
    words: '2018, 2028, 2050',
    kind: 'quantile',
    years: [2018, 2028, 2050],
    precision: 'year',
  },
  probability: {
    asStated: "10%, 50% and 90% (the question's levels)",
    words: '10%/50%/90% chance',
  },
  conditions:
    "Assuming no global catastrophe halts progress (the question's wording).",
  qualification:
    'The question, its levels and its condition are the interviewer\'s wording; the answer is the three years. The interviewer\'s explanatory remark adds "no wars", "no disasters" and "beneficially political and economic development".',
  evidence: [
    q(
      'legg2011-lw',
      'The Interview, Q1',
      'Assuming no global catastrophe halts progress, by what year would you assign a 10%/50%/90% chance of the development of human-level machine intelligence?',
    ),
    q(
      'legg2011-lw',
      'The Interview, answer to Q1',
      'Shane Legg: 2018, 2028, 2050',
    ),
  ],
});

// ---------------------------------------------------------------- C. Surveys
add('C', {
  id: 'pr-c-baum-2011-agi09',
  form: 'expert-survey',
  predictor: survey('Baum, Goertzel and Goertzel, expert assessment at AGI-09'),
  sourceDate: date(
    '2011',
    'survey-report',
    'Assessment conducted at the AGI-09 conference (2009).',
  ),
  event: 'human-level AI to be reached',
  horizon: {
    asStated: 'within upcoming decades',
    words: 'within upcoming decades',
    kind: 'vague',
    precision: 'decades',
  },
  probability: null,
  survey: {
    respondents: 'participants of the AGI-09 conference',
    conducted: '2009',
  },
  qualification:
    'The abstract\'s summary; the paper\'s table gives medians by milestone and confidence level, which the text layer of the read file scrambles, so they are not recorded here. The abstract also reports disagreement on "timing and ordering of key milestones".',
  evidence: [
    q(
      'baum2011',
      'Abstract',
      'we did find that most experts expect human-level AI to be reached within upcoming decades',
    ),
  ],
});
add('C', {
  id: 'pr-c-muller-bostrom-2014-hlmi',
  form: 'expert-survey',
  predictor: survey('Müller and Bostrom, survey of expert opinion'),
  sourceDate: date(
    '2014',
    'survey-report',
    'File reads "forthcoming 2014"; questionnaire distributed 2012/2013; volume published 2016.',
  ),
  event: 'high-level machine intelligence will be developed',
  horizon: {
    asStated: '50%: around 2040-2050; 90%: by 2075 (median estimates)',
    words: 'around 2040-2050, rising to a nine in ten chance by 2075',
    kind: 'quantile',
    years: [2040, 2050, 2075],
    precision: 'year',
  },
  probability: {
    asStated: '"a one in two chance"; "a nine in ten chance"',
    words: 'a one in two chance',
  },
  survey: {
    respondents: 'four groups of experts',
    conducted: '2012/2013',
    statistic: "median of respondents' estimates",
  },
  qualification:
    "The figure is the median of respondents' estimates across the four groups; the paper reports each group separately.",
  evidence: [
    q(
      'muller-bostrom',
      'Abstract (PDF p. 1)',
      'The median estimate of respondents was for a one in two chance that high-level machine intelligence will be developed around 2040-2050, rising to a nine in ten chance by 2075.',
    ),
  ],
});
add('C', {
  id: 'pr-c-muller-bostrom-2014-superintelligence',
  form: 'expert-survey',
  predictor: survey('Müller and Bostrom, survey of expert opinion'),
  sourceDate: date('2014', 'survey-report'),
  event: 'systems will move on to superintelligence',
  horizon: {
    asStated:
      'in less than 30 years thereafter (after high-level machine intelligence)',
    words: 'in less than 30 years thereafter',
    kind: 'relative',
    interval: {
      amount: 'less than 30',
      unit: 'years',
      from: 'high-level machine intelligence',
    },
    precision: 'year',
  },
  probability: null,
  survey: { respondents: 'four groups of experts', conducted: '2012/2013' },
  qualification:
    'The interval runs from the arrival of high-level machine intelligence, not from the survey date.',
  evidence: [
    q(
      'muller-bostrom',
      'Abstract (PDF p. 1)',
      'Experts expect that systems will move on to superintelligence in less than 30 years thereafter.',
    ),
  ],
});
const grace17 =
  'Researchers believe there is a 50% chance of AI outperforming humans in all tasks in 45 years and of automating all human jobs in 120 years';
add('C', {
  id: 'pr-c-grace-2017-all-tasks',
  form: 'expert-survey',
  predictor: survey(
    'Grace et al., survey of machine learning researchers (2016)',
  ),
  sourceDate: date(
    '2017-05-24',
    'survey-report',
    'Survey of researchers who published at NIPS and ICML 2015, conducted in 2016.',
  ),
  event: 'AI outperforming humans in all tasks',
  horizon: {
    asStated: '50% chance in 45 years',
    words: 'in 45 years',
    kind: 'quantile',
    interval: { amount: '45', unit: 'years', from: 'the survey (2016)' },
    precision: 'year',
  },
  probability: { asStated: '50%', words: '50% chance' },
  survey: {
    respondents: 'researchers who published at NIPS and ICML 2015',
    conducted: '2016',
    statistic: 'aggregate forecast (mean of fitted individual distributions)',
  },
  qualification:
    "The paper's aggregate, not any respondent's view; it reports that Asian respondents expected the event sooner than North American respondents. The interval is not converted to a year.",
  evidence: [q('grace2017', 'Abstract', grace17)],
});
add('C', {
  id: 'pr-c-grace-2017-all-jobs',
  form: 'expert-survey',
  predictor: survey(
    'Grace et al., survey of machine learning researchers (2016)',
  ),
  sourceDate: date('2017-05-24', 'survey-report'),
  event: 'automating all human jobs',
  horizon: {
    asStated: '50% chance in 120 years',
    words: 'in 120 years',
    kind: 'quantile',
    interval: { amount: '120', unit: 'years', from: 'the survey (2016)' },
    precision: 'year',
  },
  probability: { asStated: '50%', words: '50% chance' },
  survey: {
    respondents: 'researchers who published at NIPS and ICML 2015',
    conducted: '2016',
  },
  qualification:
    'Same sentence as the companion record; a separately framed question (full automation of labour).',
  evidence: [q('grace2017', 'Abstract', grace17)],
});
add('C', {
  id: 'pr-c-grace-2017-ten-years',
  form: 'expert-survey',
  predictor: survey(
    'Grace et al., survey of machine learning researchers (2016)',
  ),
  sourceDate: date('2017-05-24', 'survey-report'),
  event: 'AI will outperform humans in many activities',
  horizon: {
    asStated:
      'in the next ten years (examples: translating languages by 2024, writing high-school essays by 2026, driving a truck by 2027)',
    words: 'in the next ten years',
    kind: 'relative',
    interval: { amount: 'ten', unit: 'years', from: 'the survey' },
    precision: 'year',
  },
  probability: null,
  survey: {
    respondents: 'researchers who published at NIPS and ICML 2015',
    conducted: '2016',
  },
  qualification:
    "The abstract does not state the probability level of the listed dates; the paper's body defines the statistic.",
  evidence: [
    q(
      'grace2017',
      'Abstract',
      'Researchers predict AI will outperform humans in many activities in the next ten years, such as translating languages (by 2024), writing high-school essays (by 2026), driving a truck (by 2027)',
    ),
  ],
});
add('C', {
  id: 'pr-c-zhang-2022-hlmi-2060',
  form: 'expert-survey',
  predictor: survey('Zhang et al., survey of AI/ML researchers (2019)'),
  sourceDate: date('2022-06-08', 'survey-report', 'Survey conducted in 2019.'),
  event: 'human-level machine intelligence being achieved',
  horizon: {
    asStated: '50% likelihood by 2060',
    words: 'by 2060',
    kind: 'quantile',
    years: [2060],
    precision: 'year',
  },
  probability: { asStated: '50% likelihood', words: '50% likelihood' },
  survey: {
    respondents: 'AI/ML researchers',
    conducted: '2019',
    statistic: 'aggregate',
  },
  qualification:
    'The report states that the result does not differ significantly from the 2016 survey.',
  evidence: [
    q(
      'zhang2022',
      'Abstract',
      'AI/ML researchers surveyed placed a 50% likelihood of human-level machine intelligence being achieved by 2060',
    ),
  ],
});
add('C', {
  id: 'pr-c-espai-2022-hlmi-2059',
  form: 'expert-survey',
  predictor: survey('AI Impacts, 2022 Expert Survey on Progress in AI'),
  sourceDate: date(
    '2022-08',
    'survey-report',
    'Live wiki page; wording attested from retrieval on 2026-11-02.',
  ),
  event: 'HLMI',
  eventNote: 'High-level machine intelligence as the survey defines it.',
  horizon: {
    asStated: 'aggregate forecast time to a 50% chance: 37 years, i.e. 2059',
    words: '37 years, i.e. 2059',
    kind: 'quantile',
    years: [2059],
    precision: 'year',
  },
  probability: { asStated: '50% chance', words: '50% chance' },
  conditions:
    'Conditional on "human scientific activity continu[ing] without major negative disruption" (the page\'s wording of the question\'s condition).',
  survey: { conducted: '2022', statistic: 'aggregate forecast' },
  qualification:
    "The calendar year is the page's own. The page notes that the figure excludes the questions on full automation of labour.",
  evidence: [
    q(
      'espai2022',
      'Summary of results',
      'The aggregate forecast time to a 50% chance of HLMI was 37 years, i.e. 2059',
    ),
    q(
      'espai2022',
      'High-level machine intelligence (HLMI) timelines',
      'The aggregate forecast time to HLMI was 36.6 years, conditional on "human scientific activity continu[ing] without major negative disruption."',
    ),
  ],
});
add('C', {
  id: 'pr-c-grace-2024-every-task',
  form: 'expert-survey',
  predictor: survey('Grace et al., survey of AI authors (2023)'),
  sourceDate: date(
    '2024-01-05',
    'survey-report',
    'Survey conducted in October 2023.',
  ),
  event: 'unaided machines outperforming humans in every possible task',
  horizon: {
    asStated: '10% by 2027, and 50% by 2047',
    words: '10% by 2027, and 50% by 2047',
    kind: 'quantile',
    years: [2027, 2047],
    precision: 'year',
  },
  probability: { asStated: '10%; 50%', words: '10% by 2027' },
  conditions: 'If science continues undisrupted.',
  survey: { conducted: '2023', statistic: 'aggregate forecast' },
  qualification:
    "The report compares the 50% year with the 2022 survey's; that comparison is the report's.",
  evidence: [
    q(
      'grace2024',
      'Abstract',
      'If science continues undisrupted, the chance of unaided machines outperforming humans in every possible task was estimated at 10% by 2027, and 50% by 2047.',
    ),
  ],
});
add('C', {
  id: 'pr-c-grace-2024-occupations',
  form: 'expert-survey',
  predictor: survey('Grace et al., survey of AI authors (2023)'),
  sourceDate: date('2024-01-05', 'survey-report'),
  event: 'all human occupations becoming fully automatable',
  horizon: {
    asStated: '10% by 2037, and 50% as late as 2116',
    words: '10% by 2037, and 50% as late as 2116',
    kind: 'quantile',
    years: [2037, 2116],
    precision: 'year',
  },
  probability: { asStated: '10%; 50%', words: '10% by 2037' },
  survey: { conducted: '2023', statistic: 'aggregate forecast' },
  qualification: '"As late as" is the report\'s wording.',
  evidence: [
    q(
      'grace2024',
      'Abstract',
      'the chance of all human occupations becoming fully automatable was forecast to reach 10% by 2037, and 50% as late as 2116',
    ),
  ],
});

// ---------------------------------------------------------------- D. Bets and platforms
add('D', {
  id: 'pr-d-longbets-1-turing-test-2029',
  form: 'public-bet',
  predictor: persons(
    'Mitchell Kapor (predictor) and Ray Kurzweil (challenger), on Long Bets',
  ),
  parties: [
    {
      name: 'Mitchell Kapor',
      position:
        'predictor: that by 2029 no computer will have passed the Turing Test',
    },
    { name: 'Ray Kurzweil', position: 'challenger: the contrary' },
  ],
  sourceDate: date(
    '2002',
    'bet-made',
    'Bet duration "27 years (02002-02029)"; the page read is the live bet page.',
  ),
  event:
    'By 2029 no computer - or "machine intelligence" - will have passed the Turing Test.',
  horizon: {
    asStated: 'By 2029',
    words: 'By 2029',
    kind: 'absolute',
    years: [2029],
    relation: 'by',
    precision: 'year',
  },
  probability: null,
  stakes:
    '$20,000, to the Electronic Frontier Foundation if Kapor wins or the Kurzweil Foundation if Kurzweil wins (as stated on the page)',
  qualification:
    'The bet\'s statement is a negative prediction made by Kapor; Kurzweil is the challenger. The "detailed terms" (judges and procedure) are on a linked page not read in this pass. No outcome is recorded.',
  evidence: [
    q(
      'longbets1',
      'Bet header',
      'Duration 27 years (02002-02029) “By 2029 no computer - or "machine intelligence" - will have passed the Turing Test.”',
    ),
    q(
      'longbets1',
      'Bet header, parties and stakes',
      'PREDICTOR Mitchell Kapor CHALLENGER Ray Kurzweil STAKES $20,000 will go to The Electronic Frontier Foundation if Kapor wins, or The Kurzweil Foundation if Kurzweil wins.',
    ),
  ],
});

// ---------------------------------------------------------------- E. Researchers 2009–2024
add('E', {
  id: 'pr-e-brooks-2018-next-big-thing',
  predictor: person('Rodney Brooks'),
  sourceDate: date(
    '2018-01-01',
    'posted',
    'Live page; the author publishes yearly reviews of these predictions separately.',
  ),
  event:
    'Emergence of the generally agreed upon "next big thing" in AI beyond deep learning.',
  horizon: {
    asStated: 'NET 2023, BY 2027 ("No Earlier Than" 2023, "By" 2027)',
    words: 'NET 2023 BY 2027',
    kind: 'absolute',
    years: [2023, 2027],
    relation: 'window',
    precision: 'year',
  },
  probability: null,
  qualification:
    'The author defines NET as "No Earlier Than" and BY as "By" on the same page.',
  evidence: [
    q(
      'brooks-predictions',
      'Predictions table, AI and machine learning section',
      'Emergence of the generally agreed upon "next big thing" in AI beyond deep learning. NET 2023 BY 2027',
    ),
    q(
      'brooks-predictions',
      'Introduction, date conventions',
      'NET some date, meaning “No Earlier Than” that date. BY some date, meaning “By” that date.',
    ),
  ],
});
add('E', {
  id: 'pr-e-brooks-2018-mouse',
  predictor: person('Rodney Brooks'),
  sourceDate: date('2018-01-01', 'posted'),
  event:
    'An AI system with an ongoing existence (no day is the repeat of another day as it currently is for all AI systems) at the level of a mouse.',
  horizon: {
    asStated: 'NET 2030 ("No Earlier Than")',
    words: 'NET 2030',
    kind: 'absolute',
    years: [2030],
    relation: 'no earlier than',
    precision: 'year',
  },
  probability: null,
  qualification:
    'A "No Earlier Than" date: a lower bound, not an expected date.',
  evidence: [
    q(
      'brooks-predictions',
      'Predictions table, AI and machine learning section',
      'An AI system with an ongoing existence (no day is the repeat of another day as it currently is for all AI systems) at the level of a mouse. NET 2030',
    ),
  ],
});
add('E', {
  id: 'pr-e-brooks-2018-dog',
  predictor: person('Rodney Brooks'),
  sourceDate: date('2018-01-01', 'posted'),
  event:
    'A robot that seems as intelligent, as attentive, and as faithful, as a dog.',
  horizon: {
    asStated: 'NET 2048 ("No Earlier Than")',
    words: 'NET 2048',
    kind: 'absolute',
    years: [2048],
    relation: 'no earlier than',
    precision: 'year',
  },
  probability: null,
  qualification:
    'A "No Earlier Than" date: a lower bound, not an expected date.',
  evidence: [
    q(
      'brooks-predictions',
      'Predictions table, robotics and AI section',
      'A robot that seems as intelligent, as attentive, and as faithful, as a dog. NET 2048',
    ),
  ],
});
add('E', {
  id: 'pr-e-karnofsky-2021-transformative-ai',
  predictor: person('Holden Karnofsky', 'holden-karnofsky'),
  sourceDate: date('2021-09-07', 'posted'),
  event: 'transformative AI',
  eventNote:
    'Defined in the next sentence as "AI powerful enough to bring us into a new, qualitatively different future".',
  horizon: {
    asStated:
      'more than 10% within 15 years (by 2036); ~50% within 40 years (by 2060); ~2/3 this century (by 2100)',
    words: 'within 15 years (by 2036)',
    kind: 'quantile',
    years: [2036, 2060, 2100],
    precision: 'year',
  },
  probability: {
    asStated: 'more than a 10% chance; a ~50% chance; a ~2/3 chance',
    words: 'more than a 10% chance',
  },
  qualification:
    "The author's own estimate, with his calendar years in parentheses.",
  evidence: [
    q(
      'karnofsky-2021',
      'Opening summary',
      "I estimate that there is more than a 10% chance we'll see transformative AI within 15 years (by 2036); a ~50% chance we'll see it within 40 years (by 2060); and a ~2/3 chance we'll see it this century (by 2100).",
    ),
  ],
});
add('E', {
  id: 'pr-e-carlsmith-2022-catastrophe-2070',
  predictor: person('Joseph Carlsmith'),
  sourceDate: date(
    '2022-06-16',
    'published',
    "Report made public in April 2021 (claimed: the abstract's own statement); the read version carries a May 2022 update.",
  ),
  event: 'an existential catastrophe of this kind will occur',
  eventNote:
    '"Of this kind": from power-seeking AI systems, as the report\'s six-premise argument specifies.',
  horizon: {
    asStated: 'by 2070',
    words: 'by 2070',
    kind: 'absolute',
    years: [2070],
    relation: 'by',
    precision: 'year',
  },
  probability: {
    asStated: '~5% (April 2021); ">10%" (May 2022 update)',
    words: '~5%',
  },
  qualification:
    "The estimate is derived from the author's credences in six premises. Both the original figure and the update are in the same passage.",
  evidence: [
    q(
      'carlsmith2022',
      'Abstract',
      'I end up with an overall estimate of ~5% that an existential catastrophe of this kind will occur by 2070. (May 2022 update: since making this report public in April 2021, my estimate here has gone up, and is now at >10%.)',
    ),
  ],
  dataset: {
    sourceIds: ['source-rd-carlsmith-2022-power-seeking'],
    claimIds: ['rd-r08-carlsmith-2022-power-seeking'],
  },
});
add('E', {
  id: 'pr-e-cotra-2020-bio-anchors-as-reported-2022',
  predictor: person('Ajeya Cotra', 'ajeya-cotra'),
  sourceDate: date('2022-08-02', 'posted'),
  retrospective: {
    estimateOf: '2020-09',
    note: 'The 2022 post reports the bottom line of the draft report posted in September 2020. The 2020 report (a linked document) was not read in this pass.',
  },
  event: 'transformative AI',
  horizon: {
    asStated: '~15% by 2036; a median of ~2050',
    words: 'A median of ~2050',
    kind: 'quantile',
    years: [2036, 2050],
    precision: 'year',
  },
  probability: { asStated: '~15%; median', words: 'Roughly ~15% probability' },
  qualification:
    "A retrospective report of an earlier estimate, dated by the 2022 post; it is not the 2020 report's wording.",
  evidence: [
    q(
      'cotra-2022-update',
      'Opening section',
      'Roughly ~15% probability of transformative AI by 2036 … A median of ~2050 for transformative AI',
    ),
  ],
});
add('E', {
  id: 'pr-e-cotra-2022-update',
  predictor: person('Ajeya Cotra', 'ajeya-cotra'),
  sourceDate: date('2022-08-02', 'posted'),
  event: 'transformative AI',
  horizon: {
    asStated: '~15% by 2030; ~35% by 2036; a median of ~2040',
    words: 'A median of ~2040',
    kind: 'quantile',
    years: [2030, 2036, 2040],
    precision: 'year',
  },
  probability: {
    asStated: '~15%; ~35%; median',
    words: '~15% probability by 2030',
  },
  hedge: '"something roughly like this".',
  qualification:
    'The post\'s subject is transformative AI; the 2022 figures are given as a list after "I now expect something roughly like this".',
  evidence: [
    q(
      'cotra-2022-update',
      'Section on the updated estimates',
      'I now expect something roughly like this: ~15% probability by 2030 (a decrease of ~6 years from 2036). ~35% probability by 2036',
    ),
    q(
      'cotra-2022-update',
      'Same list',
      'A median of ~2040 (a decrease of ~10 years from 2050).',
    ),
    q(
      'cotra-2022-update',
      'Opening section',
      'A median of ~2050 for transformative AI',
    ),
  ],
});
add('E', {
  id: 'pr-e-aschenbrenner-2024-agi-2027',
  predictor: person('Leopold Aschenbrenner', 'leopold-aschenbrenner'),
  sourceDate: date('2024-06', 'published'),
  event: 'AGI',
  horizon: {
    asStated: 'by 2027',
    words: 'AGI by 2027',
    kind: 'absolute',
    years: [2027],
    relation: 'by',
    precision: 'year',
  },
  probability: {
    asStated: '"strikingly plausible"',
    words: 'strikingly plausible',
  },
  qualification:
    'The chapter\'s opening sentence; the chapter gives its basis as trend lines in compute, algorithmic efficiency and "unhobbling".',
  evidence: [
    q(
      'aschenbrenner2024',
      'Chapter I, opening sentence',
      'AGI by 2027 is strikingly plausible.',
    ),
  ],
  dataset: {
    sourceIds: ['source-rd-aschenbrenner-2024-gpt4-to-agi'],
    claimIds: ['rd-r13-aschenbrenner-2024-situational-awareness'],
  },
});
add('E', {
  id: 'pr-e-bengio-et-al-2023-this-decade-or-next',
  predictor: persons(
    'Yoshua Bengio, Geoffrey Hinton, Andrew Yao and co-authors',
  ),
  sourceDate: date('2023-10-26', 'published'),
  event:
    'generalist AI systems will outperform human abilities across many critical domains',
  horizon: {
    asStated: 'within this decade or the next',
    words: 'within this decade or the next',
    kind: 'period',
    precision: 'decade',
  },
  probability: {
    asStated: '"we must take seriously the possibility"',
    words: 'we must take seriously the possibility',
  },
  qualification:
    'Worded as a possibility to be taken seriously, not as an expectation; joint text of many authors.',
  evidence: [
    q(
      'bengio2023',
      'Section "Rapid progress", PDF p. 2',
      'we must take seriously the possibility that generalist AI systems will outperform human abilities across many critical domains within this decade or the next.',
    ),
  ],
  dataset: { sourceIds: ['source-rd-bengio-2023-managing-ai-risks'] },
});

// ---------------------------------------------------------------- F. Laboratories and leaders
add('F', {
  id: 'pr-f-openai-2023-governance-ten-years',
  status: 'awaiting-retrieval',
  predictor: persons('Sam Altman, Greg Brockman and Ilya Sutskever (OpenAI)'),
  sourceDate: date('2023-05-22', 'published'),
  event: 'AI systems will exceed expert skill level in most domains',
  horizon: {
    asStated: 'within the next ten years',
    words: 'within the next ten years',
    kind: 'relative',
    interval: { amount: 'ten', unit: 'years', from: 'the source date' },
    precision: 'year',
  },
  probability: { asStated: '"it\'s conceivable"', words: 'it’s conceivable' },
  qualification:
    'Quotation not yet checked: openai.com returns HTTP 403 to this environment (codex-retrieval.md, item 8). "Given the picture as we see it now" is part of the sentence.',
  evidence: [
    q(
      'oai-governance-si',
      'Opening paragraph (to be confirmed)',
      'Given the picture as we see it now, it’s conceivable that within the next ten years, AI systems will exceed expert skill level in most domains',
    ),
  ],
});
add('F', {
  id: 'pr-f-openai-2023-superalignment-this-decade',
  status: 'awaiting-retrieval',
  predictor: org('OpenAI (post by Jan Leike and Ilya Sutskever)', 'openai'),
  sourceDate: date('2023-07-05', 'published'),
  event: 'it could arrive',
  eventNote: '"It" is superintelligence.',
  horizon: {
    asStated: 'this decade',
    words: 'this decade',
    kind: 'period',
    precision: 'decade',
  },
  probability: { asStated: '"could"', words: 'could arrive' },
  qualification:
    'Quotation not yet checked: openai.com returns HTTP 403 to this environment (codex-retrieval.md, item 8). The dataset holds the source without this passage.',
  evidence: [
    q(
      'oai-superalignment',
      'Opening section (to be confirmed)',
      'While superintelligence seems far off now, we believe it could arrive this decade.',
    ),
  ],
  dataset: { sourceIds: ['source-superalignment-announcement'] },
});
add('F', {
  id: 'pr-f-altman-2024-few-thousand-days',
  predictor: person('Sam Altman', 'sam-altman'),
  sourceDate: date('2024-09-23', 'published'),
  event: 'we will have superintelligence',
  horizon: {
    asStated: 'in a few thousand days (!); it may take longer',
    words: 'in a few thousand days',
    kind: 'relative',
    interval: {
      amount: 'a few thousand',
      unit: 'days',
      from: 'the source date',
    },
    precision: 'vague',
  },
  probability: {
    asStated: '"It is possible"; "I\'m confident we\'ll get there"',
    words: 'It is possible',
  },
  qualification:
    'The sentence pairs a possibility ("It is possible") with a hedge on timing ("it may take longer") and confidence in the eventual event.',
  evidence: [
    q(
      'altman-ia-2024',
      'Paragraph after the opening section',
      'It is possible that we will have superintelligence in a few thousand days (!); it may take longer, but I’m confident we’ll get there.',
    ),
  ],
  dataset: { sourceIds: ['source-rd-altman-2024-intelligence-age'] },
});
add('F', {
  id: 'pr-f-amodei-2024-powerful-ai-2026',
  predictor: person('Dario Amodei', 'dario-amodei'),
  sourceDate: date('2024-10', 'published'),
  event: 'powerful AI',
  eventNote: 'Defined in the essay ("powerful AI").',
  horizon: {
    asStated:
      'as early as 2026, though there are also ways it could take much longer',
    words: 'as early as 2026',
    kind: 'absolute',
    years: [2026],
    relation: 'as early as',
    precision: 'year',
  },
  probability: {
    asStated: '"I think it could"',
    words: 'I think it could come',
  },
  qualification:
    'A lower bound ("as early as") with an explicit hedge. The essay then sets the timing question aside to "assume it will come reasonably soon".',
  evidence: [
    q(
      'amodei-mlg-2024',
      'Basic assumptions and framework',
      'many people are skeptical that powerful AI will be built soon and some are skeptical that it will ever be built at all. I think it could come as early as 2026, though there are also ways it could take much longer.',
    ),
  ],
});
add('F', {
  id: 'pr-f-altman-2025-agents-join-workforce',
  predictor: person('Sam Altman', 'sam-altman'),
  sourceDate: date('2025-01-05', 'posted'),
  event:
    'we may see the first AI agents “join the workforce” and materially change the output of companies',
  horizon: {
    asStated: 'in 2025',
    words: 'in 2025',
    kind: 'absolute',
    years: [2025],
    relation: 'in',
    precision: 'year',
  },
  probability: {
    asStated: '"We believe that ... we may"',
    words: 'we may see',
  },
  qualification: 'Signed by Altman in the first person plural, on his blog.',
  evidence: [
    q(
      'altman-reflections',
      'Closing section',
      'We believe that, in 2025, we may see the first AI agents “join the workforce” and materially change the output of companies.',
    ),
  ],
});
add('F', {
  id: 'pr-f-altman-2025-2035-capacity',
  predictor: person('Sam Altman', 'sam-altman'),
  sourceDate: date('2025-02-09', 'posted'),
  event:
    'Anyone in 2035 should be able to marshall the intellectual capacity equivalent to everyone in 2025',
  horizon: {
    asStated: 'in 2035',
    words: 'in 2035',
    kind: 'absolute',
    years: [2035],
    relation: 'in',
    precision: 'year',
  },
  probability: null,
  qualification:
    '"Should be able to" in the source; the next clause ("everyone should have access to unlimited genius") is part of the same sentence.',
  evidence: [
    q(
      'altman-three-obs',
      'Closing section',
      'Anyone in 2035 should be able to marshall the intellectual capacity equivalent to everyone in 2025; everyone should have access to unlimited genius to direct however they can imagine.',
    ),
  ],
});
add('F', {
  id: 'pr-f-anthropic-2025-late-2026-early-2027',
  predictor: org('Anthropic', 'anthropic'),
  sourceDate: date('2025-03-06', 'published'),
  event: 'powerful AI systems will emerge',
  horizon: {
    asStated: 'in late 2026 or early 2027',
    words: 'in late 2026 or early 2027',
    kind: 'period',
    precision: 'part of a year',
  },
  probability: { asStated: '"we expect"', words: 'we expect' },
  qualification:
    "The company's submission attributes the expectation to its CEO's essay (\"As our CEO Dario Amodei writes\"); the essay's own wording is recorded separately (pr-f-amodei-2024-powerful-ai-2026). The page then lists the properties it gives powerful AI systems.",
  evidence: [
    q(
      'anthropic-ostp-2025',
      'Opening section',
      'As our CEO Dario Amodei writes in ‘Machines of Loving Grace’, we expect powerful AI systems will emerge in late 2026 or early 2027.',
    ),
  ],
});
add('F', {
  id: 'pr-f-ai2027-2025-next-decade',
  predictor: persons(
    'Daniel Kokotajlo, Scott Alexander, Thomas Larsen, Eli Lifland and Romeo Dean (AI 2027)',
  ),
  sourceDate: date('2025-04-03', 'published'),
  event:
    'the impact of superhuman AI over the next decade will be enormous, exceeding that of the Industrial Revolution',
  horizon: {
    asStated: 'over the next decade',
    words: 'over the next decade',
    kind: 'relative',
    interval: { amount: 'a', unit: 'decade', from: 'the source date' },
    precision: 'decade',
  },
  probability: null,
  qualification:
    'The opening sentence of the site; the authors call the scenario that follows "our best guess" at what that might look like. The scenario\'s dated steps are not recorded here.',
  evidence: [
    q(
      'ai2027',
      'Opening paragraph',
      'We predict that the impact of superhuman AI over the next decade will be enormous, exceeding that of the Industrial Revolution. We wrote a scenario that represents our best guess about what that might look like.',
    ),
  ],
});
add('F', {
  id: 'pr-f-google-deepmind-2025-by-2030',
  predictor: org(
    'Google DeepMind (paper by Rohin Shah and co-authors)',
    'google-deepmind',
  ),
  sourceDate: date('2025-04-02', 'published'),
  event: 'powerful AI systems are developed',
  horizon: {
    asStated: 'by 2030',
    words: 'by 2030',
    kind: 'absolute',
    years: [2030],
    relation: 'by',
    precision: 'year',
  },
  probability: {
    asStated: '"we find it plausible"',
    words: 'we find it plausible',
  },
  qualification:
    'Stated as an assumption of the paper\'s safety approach, with "highly uncertain" in the same sentence.',
  evidence: [
    q(
      'gdm-agi-safety-2025',
      'Executive summary, assumption 2 "Timelines" (PDF p. 3)',
      'We are highly uncertain about the timelines until powerful AI systems are developed, but crucially, we find it plausible that they will be developed by 2030.',
    ),
  ],
});
add('F', {
  id: 'pr-f-amodei-2025-country-of-geniuses',
  predictor: person('Dario Amodei', 'dario-amodei'),
  sourceDate: date('2025-04', 'published'),
  event:
    'we could have AI systems equivalent to a “country of geniuses in a datacenter”',
  horizon: {
    asStated: 'as soon as 2026 or 2027',
    words: 'as soon as 2026 or 2027',
    kind: 'absolute',
    years: [2026, 2027],
    relation: 'as soon as',
    precision: 'year',
  },
  probability: { asStated: '"could"', words: 'we could have' },
  qualification:
    'A lower bound ("as soon as"); introduced as "As I’ve written elsewhere".',
  evidence: [
    q(
      'amodei-interp-2025',
      'Section on timing',
      'As I’ve written elsewhere, we could have AI systems equivalent to a “country of geniuses in a datacenter” as soon as 2026 or 2027.',
    ),
  ],
});
add('F', {
  id: 'pr-f-altman-2025-novel-insights-2026',
  predictor: person('Sam Altman', 'sam-altman'),
  sourceDate: date('2025-06-10', 'posted'),
  event: 'the arrival of systems that can figure out novel insights',
  horizon: {
    asStated: '2026',
    words: '2026 will likely see',
    kind: 'absolute',
    years: [2026],
    relation: 'in',
    precision: 'year',
  },
  probability: { asStated: '"will likely"', words: 'will likely see' },
  qualification:
    'One of three dated sentences in sequence (2025, 2026, 2027); the 2025 sentence describes the present.',
  evidence: [
    q(
      'altman-gentle',
      'Section on the coming years',
      '2026 will likely see the arrival of systems that can figure out novel insights.',
    ),
  ],
});
add('F', {
  id: 'pr-f-altman-2025-robots-2027',
  predictor: person('Sam Altman', 'sam-altman'),
  sourceDate: date('2025-06-10', 'posted'),
  event: 'the arrival of robots that can do tasks in the real world',
  horizon: {
    asStated: '2027',
    words: '2027 may see',
    kind: 'absolute',
    years: [2027],
    relation: 'in',
    precision: 'year',
  },
  probability: { asStated: '"may"', words: '2027 may see' },
  qualification:
    'Worded with "may", against "will likely" in the preceding sentence.',
  evidence: [
    q(
      'altman-gentle',
      'Section on the coming years',
      '2027 may see the arrival of robots that can do tasks in the real world.',
    ),
  ],
});
add('F', {
  id: 'pr-f-amodei-2026-one-to-two-years',
  predictor: person('Dario Amodei', 'dario-amodei'),
  sourceDate: date('2026-01', 'published'),
  event: 'powerful AI',
  horizon: {
    asStated:
      'as little as 1–2 years away, although it could also be considerably further out',
    words: 'as little as 1–2 years away',
    kind: 'relative',
    interval: { amount: '1–2', unit: 'years', from: 'the source date' },
    relation: 'as little as',
    precision: 'year',
  },
  probability: { asStated: '"could be"', words: 'powerful AI could be' },
  qualification:
    'The author presents this as restating Machines of Loving Grace ("As I wrote in"); the earlier essay\'s own wording is a separate record.',
  evidence: [
    q(
      'amodei-adolescence',
      'Section defining powerful AI',
      'As I wrote in Machines of Loving Grace, powerful AI could be as little as 1–2 years away, although it could also be considerably further out.',
    ),
  ],
});
add('F', {
  id: 'pr-f-amodei-2026-few-years-everything',
  predictor: person('Dario Amodei', 'dario-amodei'),
  sourceDate: date('2026-01', 'published'),
  event: 'AI is better than humans at essentially everything',
  horizon: {
    asStated: 'it cannot possibly be more than a few years before',
    words: 'more than a few years',
    kind: 'vague',
    precision: 'years',
  },
  probability: null,
  conditions:
    'If the exponential continues ("which is not certain, but now has a decade-long track record supporting it").',
  qualification:
    'A conditional: the horizon holds only if the stated trend continues. The next sentence adds that "that picture probably underestimates the likely rate of progress".',
  evidence: [
    q(
      'amodei-adolescence',
      'Same section',
      'If the exponential continues—which is not certain, but now has a decade-long track record supporting it—then it cannot possibly be more than a few years before AI is better than humans at essentially everything.',
    ),
  ],
});

for (const [g, records] of Object.entries(R))
  writeFileSync(
    join(DIR, `records-${g.toLowerCase()}.json`),
    JSON.stringify({ group: g, records }, null, 2) + '\n',
  );
console.log(
  Object.entries(R)
    .map(([g, r]) => `${g} ${r.length}`)
    .join(', '),
);
