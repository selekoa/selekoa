// Applies the adjudication of the cross-family check of packs 4 and 5 (Codex, 2026-11-07;
// research/model-cards-4/cross-family-check-2026-11-07.md and .json) to the drafts of both
// packs. Every change asserts that it changes something, so the script runs once:
//   node research/model-cards-4/adjudication/apply-2026-11-09.mjs
// then tools.mjs merge, verify and render in each pack folder. The log goes to
// adjudication/applied-2026-11-09.json.
// Rule: the preparing family may not overrule the checker on a cell; it applies the checker's
// status or holds the cell with both readings. Five material items take the checker's status;
// one (item 32, Grok 4.6 Q09) is held, because the checker's recorded status is not found while
// its own comparison finds the pack's reading better supported.
import { readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const PACKS = ['model-cards-4', 'model-cards-5'];
const files = PACKS.flatMap((p) => {
  const dir = join(ROOT, p, 'drafts');
  return readdirSync(dir)
    .filter((f) => f.endsWith('.json'))
    .sort()
    .map((f) => ({
      path: join(dir, f),
      d: JSON.parse(readFileSync(join(dir, f), 'utf8')),
    }));
});
const log = [];
const CHECK = 'cross-family check of 2026-11-07';

const one = (list, test, label) => {
  const hits = list.filter(test);
  if (hits.length !== 1) throw new Error(`${label}: ${hits.length} found`);
  return hits[0];
};
const cell = (card, q) =>
  one(
    files.flatMap(({ d }) => d.cells ?? []),
    (c) => c.card === card && c.question === q,
    `${card}:${q}`,
  );
const card = (id) =>
  one(
    files.flatMap(({ d }) => (Array.isArray(d.cards) ? d.cards : [])),
    (c) => c.id === id,
    `card ${id}`,
  );
const source = (key) =>
  one(
    files.flatMap(({ d }) => (Array.isArray(d) ? d : [])),
    (s) => s.key === key,
    `source ${key}`,
  );
const label = (x) => x.key ?? x.id ?? `${x.card}:${x.question}`;
const put = (x, field, value, item) => {
  if (JSON.stringify(x[field]) === JSON.stringify(value))
    throw new Error(`no change: ${label(x)}.${field}`);
  log.push({ id: label(x), field, from: x[field] ?? null, to: value, item });
  x[field] = value;
};
const drop = (x, field, item) => {
  if (!(field in x)) throw new Error(`no field: ${label(x)}.${field}`);
  log.push({ id: label(x), field, from: x[field], to: null, item });
  delete x[field];
};
// Changes one passage's field; the passage is found by its locator.
const passage = (c, locatorStart) =>
  one(
    c.passages,
    (p) => p.locator.startsWith(locatorStart),
    `${label(c)} passage ${locatorStart}`,
  );
const putPassage = (c, locatorStart, field, value, item) => {
  const p = passage(c, locatorStart);
  if (p[field] === value) throw new Error(`no change: ${label(c)} ${field}`);
  log.push({
    id: label(c),
    field: `passages[${locatorStart}].${field}`,
    from: p[field],
    to: value,
    item,
  });
  p[field] = value;
};

// ---------- Material items: the checker's status, applied ----------

// Item 6: Gemini 2.5 Flash-Lite Q05, stated -> partly.
let c = cell('gdm-gemini-2-5-flash-lite', 'Q05');
put(c, 'status', 'partly', '6');
put(
  c,
  'note',
  'The card states an expectation for this model that rests on another model’s results: Gemini 2.5 Pro Preview was evaluated and reached no critical capability level, and, as Flash-Lite is less capable, Flash-Lite is unlikely to reach one. It reports no frontier safety evaluation of Flash-Lite and no outcome for it in the framework’s own categories.',
  '6',
);
put(
  c,
  'crossFamily',
  {
    item: '6',
    result:
      'material disagreement, applied: the checker reads partly (blind), because PDF p. 8 gives a proxy-based expectation for Flash-Lite and the no-CCL result is Gemini 2.5 Pro Preview’s. The pack had read stated, with the reliance in the note, as for Gemini 3 Flash in the first pack (open question 2). The preparer applies the checker’s reading; the admitted Gemini 3 Flash cell, which reads the same wording as stated, goes to the maintainer.',
  },
  '6',
);

// Item 50: Gemini 2.5 Flash Q05, stated -> partly.
c = cell('gdm-gemini-2-5-flash', 'Q05');
put(c, 'status', 'partly', '50');
put(
  c,
  'note',
  'The card states an expectation for this model that rests on another model’s results: Gemini 2.5 Pro Preview was evaluated and reached no critical capability level, and, as Flash is less capable, Flash is unlikely to reach one. It reports no frontier safety evaluation of Flash and no outcome for it in the framework’s own categories. The card also covers Gemini 2.5 Flash Image and Audio, with no separate statement for them.',
  '50',
);
put(
  c,
  'crossFamily',
  {
    item: '50',
    result:
      'material disagreement, applied: the checker reads partly (blind), because PDF p. 10 gives a proxy-based expectation for Flash and the no-CCL result is Gemini 2.5 Pro Preview’s, with no separate determination for Image or Audio. The pack had read stated, with the reliance in the note (open question 2). The preparer applies the checker’s reading; see item 6 for the admitted Gemini 3 Flash cell.',
  },
  '50',
);

// Item 38: Claude Sonnet 4.5 Q03, partly -> stated (link annotation, decision 4a).
c = cell('anthropic-claude-sonnet-4-5', 'Q03');
put(c, 'status', 'stated', '38');
put(
  c,
  'passages',
  [
    {
      source: 'anthropic-claude-sonnet-4-5',
      locator: '§9.1 Process, PDF p. 125 (printed p. 124)',
      quote: 'The Responsible Scaling Policy (RSP) evaluation process',
    },
  ],
  '38',
);
put(
  c,
  'note',
  'The text gives no edition. The link annotation on the policy’s name in §9.1 (PDF p. 125) targets the fixed RSP file whose cover reads “Version 2.2, Effective May 14, 2025”, the file targeted by Claude Haiku 4.5 and Claude Opus 4.6 (maintainer decision 4a). The links on the name on PDF pp. 9, 33 and 41 target an announcement, the undated policy page and the 2023 announcement.',
  '38',
);
drop(c, 'search', '38');
put(
  c,
  'crossFamily',
  {
    item: '38',
    result:
      'material disagreement, applied: the checker reads stated (blind) under decision 4a, from the link annotation in §9.1, PDF p. 125, to the fixed RSP v2.2 file. The pack had read partly, having checked the annotations on PDF pp. 9, 33 and 41 but not this one. The preparer accepts the checker’s reading on rereading the annotations (pypdf, 2026-11-09).',
  },
  '38',
);
const sonnet = card('anthropic-claude-sonnet-4-5');
put(sonnet, 'frameworkEditions', ['rsp-v2-2'], '38');
put(
  sonnet,
  'frameworkEditionNote',
  `RSP v2.2, effective 2025-05-14, identified by link annotation (maintainer decision 4a): the words “Responsible Scaling Policy” in §9.1 (PDF p. 125) link to https://www-cdn.anthropic.com/872c653b2d0501d6ab44cf87f43e1dc4853e4d37.pdf, whose cover reads “Version 2.2, Effective May 14, 2025” (the file retrieved for Claude Haiku 4.5). Found by the ${CHECK}. The other links on the policy’s name point to an announcement of an updated policy (PDF p. 9), to the policy’s undated web page (PDF p. 33) and to the 2023 announcement (PDF p. 41).`,
  '38',
);

// Item 55: Muse Spark Open Q05, partly -> not found.
c = cell('meta-muse-spark-open', 'Q05');
put(c, 'status', 'not-found', '55');
put(c, 'passages', [], '55');
put(
  c,
  'note',
  'No determination in the framework’s categories was found. The card says the model met Meta’s safety criteria for release, and that preparedness evaluations (chemical and biological, cyber, loss of control) were run in line with the Meta Superintelligence Scaling Framework; it states no risk level or threshold outcome and does not say a framework determination was made.',
  '55',
);
put(
  c,
  'search',
  {
    ...c.search,
    terms: [...c.search.terms, 'framework', 'tier', 'residual risk'],
    setAside: [
      {
        locator: 'Safety and Preparedness, introduction',
        reason:
          'The model “met our safety criteria for release”: release criteria, not an outcome in the framework’s categories; recorded under Q15.',
      },
      {
        locator: 'Safety and Preparedness, item 4 (Preparedness)',
        reason:
          'Evaluations “in line with” the framework, reported as refusal and misalignment results, not as framework categories.',
      },
    ],
  },
  '55',
);
put(
  c,
  'crossFamily',
  {
    item: '55',
    result:
      'material disagreement, applied: the checker reads not found (blind): the README applies the framework to evaluations and finds Meta’s release criteria met, but states no framework determination and does not say one was made; a release-acceptability judgement belongs to Q15. The pack had read partly, as a determination made without its outcome. The preparer applies the checker’s reading.',
  },
  '55',
);

// Item 58: Muse Spark Open Q15, partly -> stated.
c = cell('meta-muse-spark-open', 'Q15');
put(c, 'status', 'stated', '58');
put(
  c,
  'note',
  'Meta, in its own voice (“our safety criteria”), states that the model met its safety criteria for release after evaluations and an assessment of residual risks: a judgement that the release was acceptable, made by the company. No person, office or committee is named, and no decision date is given.',
  '58',
);
put(
  c,
  'crossFamily',
  {
    item: '58',
    result:
      'material disagreement, applied: the checker reads stated (blind) under the criterion’s “deemed acceptable for deployment”: meeting the company’s own release criteria after a residual-risk assessment is an acceptability judgement in the developer’s voice (decision 6a). The pack had read partly, as a release following an assessment. The preparer applies the checker’s reading.',
  },
  '58',
);

// Item 32: Grok 4.6 Q09, held. The checker's status is not found; its comparison says the
// pack's partly is better supported. The cell keeps the pack's status, marked †.
c = cell('xai-grok-4-6', 'Q09');
put(
  c,
  'crossFamily',
  {
    item: '32',
    result:
      'material disagreement, held for the maintainer: the checker’s recorded status is not found (blind), while its comparison says the pack’s partly is better supported for the earlier-checkpoint evaluation in §5 if that scope is kept explicit. The cell keeps the pack’s status until the maintainer decides. Recommendation: partly.',
    readings: {
      'pack (Claude)':
        'partly: §5 (PDF p. 24) reports a test of autonomous AI-development acceleration on an earlier Grok 4.6 checkpoint, without an outcome category, threshold or risk conclusion.',
      'checker (Codex)':
        'not-found (blind): the research-capability benchmarks are product capability, and the framework-linked threshold in §8 concerns biology and chemistry. On comparison: the §5 earlier-checkpoint test “supports partly if labeled as an earlier-checkpoint evaluation with no frontier risk outcome”.',
    },
    criterion:
      'The card reports that evaluations in any of these domains were run and states their outcome category or threshold language (policy level only). Partly if evaluations are reported without any outcome or conclusion. Agentic task benchmarks reported only as product capability do not meet it.',
  },
  '32',
);

// ---------- Minor items ----------

// Items 5 and 49: Q03 quotations extended through the framework's full name.
c = cell('gdm-gemini-2-5-flash-lite', 'Q03');
putPassage(
  c,
  'Evaluation Approach',
  'quote',
  'In addition, we perform testing following the guidelines in Google DeepMind’s Frontier Safety Framework (FSF).',
  '5',
);
put(
  c,
  'crossFamily',
  {
    item: '5',
    result:
      'minor, applied: the quotation now runs through the framework’s full name. Status and edition agree.',
  },
  '5',
);
c = cell('gdm-gemini-2-5-flash', 'Q03');
putPassage(
  c,
  'Evaluation Approach',
  'quote',
  'In addition, we performed testing following the guidelines in Google DeepMind’s Frontier Safety Framework (FSF).',
  '49',
);
put(
  c,
  'crossFamily',
  {
    item: '49',
    result:
      'minor, applied: the quotation now runs through the framework’s full name. Status and edition agree.',
  },
  '49',
);

// Items 7 and 83: Q06, a named mitigation from the list.
for (const [id, page, item] of [
  ['gdm-gemini-2-5-flash-lite', 'PDF p. 9', '7'],
  ['gdm-gemini-2-5-flash', 'PDF p. 11', '83'],
]) {
  c = cell(id, 'Q06');
  put(
    c,
    'passages',
    [
      ...c.passages,
      {
        source: id,
        locator: `Risks and Mitigations, ${page}`,
        quote: 'product-level mitigations such as safety filtering',
      },
    ],
    item,
  );
  put(
    c,
    'note',
    'The card lists mitigations across training and deployment (dataset filtering, conditional pre-training, fine-tuning, reinforcement learning, safety policies and product-level safety filtering) without tying any of them to the frontier safety assessment.',
    item,
  );
  put(
    c,
    'crossFamily',
    {
      item,
      result:
        'minor, applied: a named mitigation from the same list is quoted beside the list’s introduction. Status agrees.',
    },
    item,
  );
}

// Item 14: Gemini 2.5 Pro Q05, the variants' coverage.
c = cell('gdm-gemini-2-5-pro', 'Q05');
put(
  c,
  'note',
  'The direct evaluation across all framework domains is of Gemini 2.5 Pro Experimental (03-25). For Preview (05-06) and GA, the card relies on those results and repeats a subset of evaluations: the Cyber Uplift Level 1 evaluations for Preview, and the “most essential” evaluations for GA, whose deceptive-alignment evaluations were not yet completed (PDF p. 11). The evaluations reached the alert threshold for Cyber Uplift Level 1, which is not the CCL (PDF pp. 10–11).',
  '14',
);
put(
  c,
  'crossFamily',
  {
    item: '14',
    result:
      'minor, applied: the note now says which variant the direct all-domain evaluation covers and how the Preview and GA evidence was added. Status agrees.',
  },
  '14',
);

// Item 48: Gemini 2.5 Deep Think Q15, the model-specific pre-launch review.
c = cell('gdm-gemini-2-5-deep-think', 'Q15');
put(
  c,
  'passages',
  [
    ...c.passages,
    {
      source: 'gdm-gemini-2-5-deep-think',
      locator: 'Frontier Safety Summary, PDF p. 20',
      quote:
        'an internal safety case based on these mitigations and red teaming results was developed and reviewed by Google DeepMind’s Responsibility and Safety Council (RSC) before launch.',
    },
  ],
  '48',
);
put(
  c,
  'note',
  'The card names Google DeepMind’s Responsibility and Safety Council, its internal governance body, as the maker of release decisions (PDF p. 5), and says that the council reviewed this model’s internal safety case before launch (PDF p. 20). Neither passage gives the text or date of a decision.',
  '48',
);
put(
  c,
  'crossFamily',
  {
    item: '48',
    result:
      'minor, applied: the model-specific passage on the RSC’s pre-launch review of the safety case is added. Status and maker agree.',
  },
  '48',
);

// Item 67: Gemini 2.5 Pro Q13, wording.
c = cell('gdm-gemini-2-5-pro', 'Q13');
put(
  c,
  'note',
  'External testers are described but not named; the card presents results from internal evaluations only. The external providers of benchmarks and challenges are not described as testers of the model.',
  '67',
);
put(
  c,
  'crossFamily',
  {
    item: '67',
    result:
      'minor, applied: “reports internal evaluations only” becomes “presents results from internal evaluations only”, since the card says external testers evaluated CBRN.',
  },
  '67',
);

// Item 68: Gemini 2.5 Pro Q14, a passage set aside.
c = cell('gdm-gemini-2-5-pro', 'Q14');
put(
  c,
  'search',
  {
    ...c.search,
    setAside: [
      ...c.search.setAside,
      {
        locator: 'Cybersecurity, Overview, footnote 8, PDF p. 15',
        reason:
          'Names the UK AI Safety Institute’s evaluation framework Inspect, with which the open-sourced CTF suite can be run; it does not say the institute tested or received the model.',
      },
    ],
  },
  '68',
);
put(
  c,
  'crossFamily',
  {
    item: '68',
    result:
      'minor, applied: the footnote naming the UK AI Safety Institute is recorded as set aside. Status agrees.',
  },
  '68',
);

// Item 77: Grok 4.6 Q12, physical page numbers.
c = cell('xai-grok-4-6', 'Q12');
put(
  c,
  'search',
  {
    ...c.search,
    setAside: c.search.setAside.map((a) => ({
      ...a,
      locator: a.locator
        .replace('§7.4 HackerBench, PDF p. 30', '§7.4 HackerBench, PDF p. 31')
        .replace('§9.1 Jailbreaks, PDF p. 34', '§9.1 Jailbreaks, PDF p. 35'),
    })),
  },
  '77',
);
put(
  c,
  'crossFamily',
  {
    item: '77',
    result:
      'minor, applied: the set-aside locators gave printed page numbers as PDF pages; they now give the physical pages (31 and 35). Status agrees.',
  },
  '77',
);

// Item 80: Claude Sonnet 4.5 Q11, a shorter extract.
c = cell('anthropic-claude-sonnet-4-5', 'Q11');
putPassage(
  c,
  '§7 Alignment assessment',
  'quote',
  'We saw roughly a 60% improvement on our primary misalignment metric over Claude Sonnet 4',
  '80',
);
put(
  c,
  'crossFamily',
  {
    item: '80',
    result:
      'minor, applied: the quotation stops before the developer’s characterisation of the earlier model. Status agrees.',
  },
  '80',
);

// Item 81: Claude Opus 4.6 Q08, the qualitative cyber assessment.
c = cell('anthropic-claude-opus-4-6', 'Q08');
put(
  c,
  'note',
  'The card reports cyber evaluations, which the model saturated, and a CAISI cyber assessment (§8.4.8), and states that the RSP defines no formal cyber threshold. §8.4 gives a qualitative assessment that the model has meaningfully improved cyber capabilities and ties enhanced safeguards against cyber misuse to it (PDF p. 197); no outcome category or threshold is stated for cyber.',
  '81',
);
put(
  c,
  'search',
  {
    ...c.search,
    setAside: [
      {
        locator: '§8.4, results summary, PDF p. 197',
        reason:
          'A qualitative capability assessment with enhanced safeguards tied to it, not a category or threshold under the RSP; given in the note.',
      },
      ...c.search.setAside,
    ],
  },
  '81',
);
put(
  c,
  'crossFamily',
  {
    item: '81',
    result:
      'minor, applied: the qualitative cyber assessment of §8.4 (PDF p. 197) is given in the note and set aside as not a formal category. Status agrees (open question 3).',
  },
  '81',
);

// Item 82: Claude Opus 4.6 Q09, policy-level qualification.
c = cell('anthropic-claude-opus-4-6', 'Q09');
put(
  c,
  'note',
  'The card qualifies the AI R&D-4 rule-out: the model has roughly reached the benchmark thresholds set for a straightforward rule-out, so the determination rests on a wider judgement (§1.2.4, PDF p. 13), and the card calls the margin to the threshold unclear (§8.3, PDF p. 185).',
  '82',
);
put(
  c,
  'crossFamily',
  {
    item: '82',
    result:
      'minor, applied: the note keeps the distinction between the benchmark rule-out thresholds and the final judgement, without evaluation-design detail. Status agrees.',
  },
  '82',
);

// Item 87: GPT-4.5 Q06, where the safeguards appear.
c = cell('openai-gpt-4-5', 'Q06');
put(
  c,
  'note',
  'The card states the designations in §4.1 and lists Preparedness mitigations in the list that follows, without saying that they are applied because of the designations. A stated safeguard is the developer’s account.',
  '87',
);
put(
  c,
  'crossFamily',
  {
    item: '87',
    result:
      'minor, applied: the note places the safeguards in the list after the designations, not in their paragraph. Status agrees.',
  },
  '87',
);

// Item 88: GPT-4.5 Q09, METR's earlier checkpoint.
c = cell('openai-gpt-4-5', 'Q09');
put(
  c,
  'note',
  'Outcome category: Low. METR’s external evaluation of autonomy and AI R&D tasks is also summarised; it was of an earlier checkpoint of GPT-4.5 (§3.4, PDF p. 6).',
  '88',
);
put(
  c,
  'crossFamily',
  {
    item: '88',
    result:
      'minor, applied: the note says that METR evaluated an earlier checkpoint. Status agrees.',
  },
  '88',
);

// Items 42 and 43 (Claude Opus 4.6 Q05 and Q15): the pack's locators are right and the
// checker's finding concerns its own blind answer; no change.

// ---------- Part C: card order by earliest located date ----------
const EARLIEST = {
  'anthropic-claude-opus-4-1': '2025-08',
  'gdm-gemini-2-5-pro': '2025-06-27',
  'gdm-gemini-2-5-flash-lite': '2025-07-22',
  'meta-muse-glimmer': '2026-08-10',
  'meta-muse-wonder-and-muse-wonder-full': '2026-10-12',
  'openai-o3-mini': '2025-01-31',
  'openai-deep-research': '2025-02-25',
  'xai-grok-4-6': '2026-08-12',
  'anthropic-claude-sonnet-4-5': '2025-09',
  'anthropic-claude-haiku-4-5': '2025-10',
  'anthropic-claude-opus-4-6': '2026-02',
  'gdm-gemini-2-5-deep-think': '2025-08-01',
  'gdm-gemini-2-5-flash': '2025-08-30',
  'meta-muse-spark-open': '2026-10-15',
  'openai-gpt-4-5': '2025-02-27',
  'openai-o3-o4-mini': '2025-04-16',
};
for (const [id, date] of Object.entries(EARLIEST))
  put(card(id), 'earliestLocated', date, 'Part C');

// ---------- Part D: retrievals recorded from the checker ----------
const W = 'https://web.archive.org/web/';
const NONE = (finding) => ({
  capture: null,
  note: `Not read here (web.archive.org reset the connection on 2026-11-06). In the ${CHECK}: ${finding}`,
});
const archives = {
  'anthropic-claude-opus-4-1': {
    capture: `${W}20260126205516id_/https://www-cdn.anthropic.com/9fa30625273bafdf5af82c93719d7ca606485a16.pdf`,
    note: `Capture of 2026-01-26, retrieved in the ${CHECK}: the same bytes as the copy read, including the changelog of 2025-09-15. No expression before the changelog was read.`,
  },
  'anthropic-claude-haiku-4-5': {
    capture: `${W}20260124111405id_/https://www-cdn.anthropic.com/7aad69bf12627d42234e01ee7c36305dc2f6a970.pdf`,
    note: `Capture of 2026-01-24, retrieved in the ${CHECK}: the same bytes as the copy read.`,
  },
  'meta-muse-wonder-and-muse-wonder-full': {
    capture: `${W}20261013013207id_/https://research.meta.ai/static/muse-wonder-model-card`,
    note: `Capture of 2026-10-13 (01:32 UTC), retrieved in the ${CHECK}: an earlier expression without the evaluation correction of 23 October 2026 (PDF p. 7). The card was available by that capture. The checker found the sampled quotations at the same physical pages and the Q03 address, Q05 assessment, Q06 tie, Q14 absence, Q15 decision and Q16 limit unchanged.`,
  },
  'gdm-gemini-2-5-flash-lite': NONE(
    'the capture of 2025-07-31 (“Published: July 22, 2025”, recorded by the check of 2026-11-04) answered HTTP 429 on replay, so the sampled cells were not compared with the July expression.',
  ),
  'gdm-gemini-2-5-flash': NONE(
    'the capture of 2025-08-30 (revision “Aug 27, 2025”, recorded by the check of 2026-11-04) answered HTTP 429 on replay, so the sampled cells were not compared with the August expression. The capture is an availability bound, not a publication date.',
  ),
  'gdm-gemini-2-5-pro': NONE(
    'the nearest indexed capture (2025-10-07) answered HTTP 429 on replay.',
  ),
  'gdm-gemini-2-5-deep-think': NONE(
    'the availability lookup returned no capture of this address.',
  ),
  'openai-deep-research': NONE(
    'the capture of 2025-02-25 answered HTTP 429 on replay and the publisher’s card page HTTP 403, so the sampled cells were not compared with the February expression. The copy read keeps the printed date of February 25, 2025; its July 2025 note and PDF creation date are separate events.',
  ),
  'openai-o3-mini': NONE(
    'the availability lookup returned no capture of this address; the address without the “-feb10” suffix answered HTTP 404.',
  ),
  'openai-gpt-4-5': NONE(
    'the capture of 2025-02-28 answered HTTP 429 on replay.',
  ),
  'openai-o3-o4-mini': NONE(
    'the capture of 2025-04-16 answered HTTP 429 on replay.',
  ),
  'xai-grok-4-6': NONE(
    'the availability lookup returned no capture near 2026-08-12; no expression before the revision of 2026-08-17 was located.',
  ),
  'anthropic-claude-sonnet-4-5': NONE(
    'the nearest indexed capture (2026-01-24) postdates both changelog entries and answered HTTP 429 on replay; no expression before the changelog was read.',
  ),
  'anthropic-claude-opus-4-6': NONE(
    'the availability lookup returned no capture of the PDF or of the publisher’s permalink; no expression before the changelog was located.',
  ),
  'meta-muse-spark-open': NONE(
    'no capture of the pinned address; the repository page’s capture of 2026-10-16 answered HTTP 429 and the publisher’s history endpoint HTTP 401.',
  ),
  'meta-muse-glimmer': NONE(
    'no capture of the pinned address; the repository page’s capture of 2026-08-11 answered HTTP 429. The checker read two earlier README revisions from the publisher’s history: 5f5a77e8 (committed 2026-08-09 22:52 UTC), whose section is headed “Catastrophic risk”, so the locators for Q03, Q05 and Q15 differ while the deciding language is the same; and f84ecc3a (2026-08-10 08:15 UTC), whose Trust and Safety text is the same as the copy read. Commit times do not fix first public availability.',
  ),
};
for (const [key, archive] of Object.entries(archives))
  put(source(key), 'archive', archive, 'Part D');

const wonder = card('meta-muse-wonder-and-muse-wonder-full');
put(
  wonder,
  'frameworkEditionNote',
  `${wonder.frameworkEditionNote} In the ${CHECK}, the printed address served a PDF printing version 2.1, October 2026 (changelog: v2.1, 2 October 2026), byte-identical to its capture of 2026-10-13; this is what the address served, not an edition the card names, so Q03 stays partly.`,
  'Part D',
);
const grok = card('xai-grok-4-6');
put(
  grok,
  'frameworkEditionNote',
  grok.frameworkEditionNote.replace(
    'The linked file was not retrieved.',
    `In the ${CHECK}, the linked file answered HTTP 404 and its captures HTTP 429; a publisher file of the same dated name with a different suffix prints an effective date of June 30, 2026 and no version number on its first page. The card’s dated citation supports Q03.`,
  ),
  'Part D',
);

for (const { path, d } of files)
  writeFileSync(path, JSON.stringify(d, null, 2) + '\n');
writeFileSync(
  join(ROOT, 'model-cards-4', 'adjudication', 'applied-2026-11-09.json'),
  JSON.stringify(
    {
      generated:
        'node research/model-cards-4/adjudication/apply-2026-11-09.mjs',
      check: 'research/model-cards-4/cross-family-check-2026-11-07.json',
      changes: log.length,
      log,
    },
    null,
    2,
  ) + '\n',
);
console.log(`applied ${log.length} changes`);
