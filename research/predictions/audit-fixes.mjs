// Applies the dispositions of the same-family audit (audit/findings.json,
// 2026-11-02) to the generated drafts, by record ID. Run after
// drafts/records.src.mjs and drafts/sources.src.mjs, before `tools.mjs build`.
// Each fix names the finding it answers; audit.md lists the dispositions.
import { readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const DIR = join(dirname(fileURLToPath(import.meta.url)), 'drafts');
const CHECKED = '2026-11-02';
const q = (source, locator, passage) => ({
  source,
  locator,
  passage,
  passageType: 'quote',
  sourceRole: 'primary',
  checkedAt: CHECKED,
});

// Verbal expressions of confidence ("could", "we expect", "plausible") move
// from `probability` to `confidence`; numeric or probability phrases stay.
const VERBAL = [
  'pr-e-aschenbrenner-2024-agi-2027',
  'pr-e-bengio-et-al-2023-this-decade-or-next',
  'pr-f-openai-2023-governance-ten-years',
  'pr-f-openai-2023-superalignment-this-decade',
  'pr-f-altman-2024-few-thousand-days',
  'pr-f-amodei-2024-powerful-ai-2026',
  'pr-f-altman-2025-agents-join-workforce',
  'pr-f-anthropic-2025-late-2026-early-2027',
  'pr-f-google-deepmind-2025-by-2030',
  'pr-f-amodei-2025-country-of-geniuses',
  'pr-f-altman-2025-novel-insights-2026',
  'pr-f-altman-2025-robots-2027',
  'pr-f-amodei-2026-one-to-two-years',
];

const FIXES = {
  // Wording sweep: "funding proposal" could be read as implying a motive.
  'pr-a-dartmouth-1955-summer': (r) => {
    r.qualification = r.qualification.replace(
      'The statement is part of a funding proposal.',
      'The statement is part of the proposal for the summer study.',
    );
  },
  // Material finding: the abstract summarises a probability question.
  'pr-c-muller-bostrom-2014-superintelligence': (r) => {
    r.horizon.asStated +=
      '; the question asked for probabilities "within (2 years / 30 years) thereafter"';
    r.probability = {
      asStated:
        'Not in the abstract. The body reports, for all respondents, a median of 75% within 30 years and 10% within 2 years (means 62% and 19%), in a table (PDF p. 12), and summarises it as "a significant probability"',
      words: 'a significant probability for superintelligence within 30 years',
    };
    r.conditions =
      'The question assumes that high-level machine intelligence "will at some point exist".';
    r.qualification =
      "The abstract's sentence summarises answers to a probability question, not a firm expectation: respondents chose a probability for each interval. The interval runs from the arrival of high-level machine intelligence, not from the survey date. The table's figures are given here in paraphrase.";
    r.evidence.push(
      q(
        'muller-bostrom',
        '§3.3 "From HLMI to superintelligence", question 3 (PDF p. 11)',
        'Assume for the purpose of this question that such HLMI will at some point exist. How likely do you then think it is that within (2 years / 30 years) thereafter',
      ),
      q(
        'muller-bostrom',
        '§3.3, text after the table (PDF p. 12)',
        'Experts allocate a low probability for a fast takeoff, but a significant probability for superintelligence within 30 years after HLMI.',
      ),
    );
  },
  'pr-c-muller-bostrom-2014-hlmi': (r) => {
    r.conditions =
      'The question assumes "that human scientific activity continues without major negative disruption".';
    r.qualification =
      'The question asks about "such HLMI" as defined in the paper\'s preceding question. ' +
      r.qualification;
    r.evidence.push(
      q(
        'muller-bostrom',
        '§3.2 "When HLMI?", question 2 (PDF p. 9)',
        'For the purposes of this question, assume that human scientific activity continues without major negative disruption.',
      ),
    );
  },
  'pr-a-lighthill-1973-correspondents-1980s': (r) => {
    r.qualification =
      'Lighthill reports in indirect speech, without naming them, what "able and respected scientists write in letters to the present author"; the letters\' own wording is not shown. The same sentence goes on to his own call to compare past predictions with performance, and elsewhere in the report he refers to "wild predictions"; those comments are his, not the correspondents\'.';
  },
  'pr-a-lighthill-1973-correspondents-2000': (r) => {
    r.qualification =
      "As for the companion record: Lighthill's report, in indirect speech, of letters from unnamed correspondents; the letters' own wording is not shown. The comments around it are his.";
  },
  'pr-f-amodei-2026-few-years-everything': (r) => {
    r.horizon.words = 'it cannot possibly be more than a few years before';
    r.evidence[0].locator =
      'Section on the timing of powerful AI, paragraph on the exponential';
  },
  'pr-b-yudkowsky-2000-2035-upper-bound': (r) => {
    r.sourceDate = {
      date: '2000-08-31',
      kind: 'published',
      note: 'Revision date of version 1.2.1 ("Updated: 08/31/2000"), read in an Internet Archive capture of 2000-12-04; the page was first posted on 1996-11-18 (claimed date; the checked wording is that of version 1.2.1).',
    };
    r.conditions = '"given the current rate of progress"';
    r.qualification =
      "The quoted sentence names a bound, not an expected date; its event is the section's subject and is paraphrased. Checked against the dataset's passage from the 2000 capture.";
  },
  'pr-e-cotra-2022-update': (r) => {
    r.horizon.asStated += '; ~60% by 2050';
    r.horizon.years.push(2050);
    r.evidence.push(
      q(
        'cotra-2022-update',
        'Same list, last item',
        '~60% probability by 2050 (a ~1.5x likelihood ratio vs 50%).',
      ),
    );
    r.qualification +=
      ' The post discusses how much these numbers have moved and how uncertain they are; read the post before relying on any single figure.';
  },
  'pr-e-cotra-2020-bio-anchors-as-reported-2022': (r) => {
    r.hedge =
      '"Roughly"; the next sentence says these were "roughly close to my all-things-considered probabilities at the time".';
  },
  'pr-e-bengio-et-al-2023-this-decade-or-next': (r) => {
    r.qualification +=
      ' The sentence opens with its basis: "Combined with the ongoing growth and automation in AI R&D".';
  },
  'pr-f-anthropic-2025-late-2026-early-2027': (r) => {
    r.qualification =
      'The company\'s submission attributes the expectation to its CEO\'s essay ("As our CEO Dario Amodei writes"). The essay\'s own wording, recorded separately (pr-f-amodei-2024-powerful-ai-2026), is "as early as 2026, though there are also ways it could take much longer", a different horizon from the submission\'s. The page then lists the properties it gives powerful AI systems.';
  },
  'pr-c-zhang-2022-hlmi-2060': (r) => {
    r.qualification =
      "The report compares the result with the 2016 survey of Grace et al. in a separate statement; that comparison is the report's.";
  },
  'pr-b-kurzweil-2001-brain-capacity': (r) => {
    r.sourceDate = {
      date: '2001-01',
      kind: 'published',
      note: 'The page reads "January 2001"; the dataset dates the essay 2001-03-07. Live page.',
    };
  },
  'pr-b-kurzweil-2001-1000-dollars-2023': (r) => {
    r.sourceDate = {
      date: '2001-01',
      kind: 'published',
      note: 'As for the companion record.',
    };
  },
  'pr-b-moravec-1999-before-2050': (r) => {
    r.qualification =
      '"It" refers to text before the quoted sentence, which this pass could not read (the host refused the TLS check); checked against the dataset\'s passage only.';
  },
  'pr-f-altman-2025-2035-capacity': (r) => {
    r.qualification =
      '"Should be able to" can be read as a forecast or as an aim; the record keeps the wording. ' +
      r.qualification.replace(/^"Should be able to" in the source; /, '');
  },
  'pr-f-openai-2023-superalignment-this-decade': (r) => {
    r.confidence = {
      asStated: '"we believe it could"',
      words: 'we believe it could arrive',
    };
  },
};

let applied = 0;
for (const f of readdirSync(DIR).filter((f) => /^records-.*\.json$/.test(f))) {
  const path = join(DIR, f);
  const d = JSON.parse(readFileSync(path, 'utf8'));
  for (const r of d.records) {
    if (VERBAL.includes(r.id) && r.probability) {
      r.confidence = r.probability;
      r.probability = null;
      applied++;
    }
    if (FIXES[r.id]) {
      FIXES[r.id](r);
      applied++;
    }
  }
  writeFileSync(path, JSON.stringify(d, null, 2) + '\n');
}
const expected = VERBAL.length + Object.keys(FIXES).length;
console.log(`${applied} fixes applied of ${expected}`);
if (applied !== expected) process.exit(1);
