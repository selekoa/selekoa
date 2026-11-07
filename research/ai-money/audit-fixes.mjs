// Dispositions of the same-family audit of 2026-11-02 (audit.md, audit/findings.json),
// applied to the drafts after reconcile.mjs. Every change is logged to
// audit/fixes.json. Idempotent: a rerun on fixed drafts changes nothing.
import { readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const DIR = dirname(fileURLToPath(import.meta.url));
const DRAFTS = join(DIR, 'drafts');
const drafts = readdirSync(DRAFTS)
  .filter((f) => f.endsWith('.json'))
  .map((f) => ({ f, d: JSON.parse(readFileSync(join(DRAFTS, f), 'utf8')) }));
const log = [];
const find = (kind, id) => {
  for (const { d } of drafts) {
    const x = (d[kind] ?? []).find((y) => y.id === id);
    if (x) return { x, d };
  }
  return { x: null, d: null };
};
const set = (kind, id, field, value, finding) => {
  const { x } = find(kind, id);
  if (!x) return;
  if (JSON.stringify(x[field]) === JSON.stringify(value)) return;
  log.push({ kind, id, field, from: x[field] ?? null, to: value, finding });
  x[field] = value;
};
const replaceIn = (kind, id, field, a, b, finding) => {
  const { x } = find(kind, id);
  if (!x || !x[field]?.includes(a)) return;
  set(kind, id, field, x[field].replace(a, b), finding);
};
const addEvidence = (id, ev, finding) => {
  const { x } = find('records', id);
  if (!x || x.evidence.some((e) => e.passage === ev.passage)) return;
  log.push({ kind: 'records', id, field: 'evidence', added: ev, finding });
  x.evidence.push(ev);
};
// Re-code a contesting record as a context (bears_on) record under a new id.
const toContext = (id, newId, missing, finding) => {
  const { x } = find('records', id);
  if (!x) return;
  log.push({
    kind: 'records',
    id,
    renamed: newId,
    predicate: 'bears_on_proposition',
    finding,
  });
  Object.assign(x, {
    id: newId,
    predicate: 'bears_on_proposition',
    roles: ['context'],
    engagement: null,
    missing,
  });
};

// Material 1: the earliest located use of "agentic commerce" (U07).
set(
  'records',
  'am-u07-hkma-2026-project-sage-release',
  'roles',
  ['articulation'],
  'M1',
);
set('records', 'am-u07-hkma-2026-project-sage-release', 'term', null, 'M1');
addEvidence(
  'am-u07-boe-2026-breeden-agents-of-change',
  {
    source: 'boe-2026-breeden-agents-of-change',
    locator: "Section 'Agentic payments and commerce', closing paragraph",
    passage:
      'What these two examples – agentic commerce and agentic trading – both highlight is that, as AI capabilities increase, we must keep asking whether existing, technology-agnostic regulatory frameworks remain sufficient.',
    passageType: 'quote',
    sourceRole: 'primary',
    support: 'supports',
    note: 'Added at the audit (2026-11-02) as the passage that uses the usual name.',
  },
  'M1',
);
set(
  'records',
  'am-u07-boe-2026-breeden-agents-of-change',
  'roles',
  ['articulation', 'earliest-located-term'],
  'M1',
);
set(
  'records',
  'am-u07-boe-2026-breeden-agents-of-change',
  'term',
  'agentic commerce',
  'M1',
);
replaceIn(
  'records',
  'am-u07-boe-2026-breeden-agents-of-change',
  'statement',
  'and that consent, liability and protocol fragmentation are the main issues.',
  'and that the biggest issues are likely to be for regulation and industry standards, naming consent, liability and the fragmentation of protocols.',
  'minor: dropped hedge',
);

// Material 2: the ECB innovation platform call prints 28 September 2026 under its title.
const callNote =
  'The page prints “28 September 2026” directly under its title (corrected at the audit of 2026-11-02; the drafting note had said the page printed no date). It sets an application deadline of “Monday, 9 November 2026”.';
set('documents', 'ecb-2026-ip-call-ai-agents', 'date', '2026-09-28', 'M2');
set(
  'documents',
  'ecb-2026-ip-call-ai-agents',
  'dateBasis',
  'publication',
  'M2',
);
set('documents', 'ecb-2026-ip-call-ai-agents', 'dateNote', callNote, 'M2');
for (const [kind, id] of [
  ['records', 'am-u08-ecb-2026-ip-call-ai-agents-context'],
  ['events', 'am-event-ecb-2026-innovation-platform-ai-payments'],
])
  set(
    kind,
    id,
    'time',
    { kind: 'event', date: '2026-09-28', basis: 'publication', note: callNote },
    'M2',
  );

// U09: the June 2017 FSB report uses "SupTech" in its glossary, earlier than November 2017.
addEvidence(
  'am-u09-fsb-2017-fintech-fs',
  {
    source: 'fsb-2017-fintech-fs',
    locator: 'Glossary, entry "RegTech", PDF p. 38',
    passage:
      'There is also a close link with “SupTech,” or the use of FinTech by supervisory authorities.',
    passageType: 'quote',
    sourceRole: 'primary',
    support: 'context',
    note: 'A glossary definition that does not mention AI; recorded only for the earliest located use of the name (audit, 2026-11-02).',
  },
  'minor: full-text check of the usual name',
);
set(
  'records',
  'am-u09-fsb-2017-fintech-fs',
  'roles',
  ['earliest-located', 'earliest-located-term'],
  'minor: full-text check of the usual name',
);
set(
  'records',
  'am-u09-fsb-2017-fintech-fs',
  'term',
  'suptech',
  'minor: full-text check of the usual name',
);
set(
  'records',
  'am-u09-fsb-2017-ai-ml',
  'roles',
  ['articulation'],
  'minor: full-text check of the usual name',
);
set(
  'records',
  'am-u09-fsb-2017-ai-ml',
  'term',
  null,
  'minor: full-text check of the usual name',
);

// Stretched stances, re-coded as context.
toContext(
  'am-u05-frb-2023-cook-genai-contests',
  'am-u05-frb-2023-cook-genai-context',
  'A statement that AI or machine learning does not, or cannot, improve policy analysis; the passage conditions the value of AI forecasts on an explanation of their drivers.',
  'minor: stretched contest',
);
toContext(
  'am-u10-bcbs-2018-sound-practices-fintech-contests',
  'am-u10-bcbs-2018-sound-practices-fintech-context',
  'A statement that AI or machine-learning models do not, or cannot, improve risk management; the passage calls their accuracy and validity for the termination of credit limits unproven.',
  'minor: stretched contest',
);
replaceIn(
  'records',
  'am-u10-bcbs-2018-sound-practices-fintech-context',
  'statement',
  'used for credit limits',
  'used for the termination of credit limits',
  'minor: printed wording',
);
toContext(
  'am-u02-fsb-2026-bailey-g20-letter',
  'am-u02-fsb-2026-bailey-g20-letter-context',
  'The concentrated third-party service providers are not stated to be providers of AI models, data or computing; the concentration is named as an amplifier of cyber risk from frontier AI.',
  'minor: stretched stance',
);

// Group-scoped earliest notes made stale by the merge.
const STALE = {
  'am-u01-bis-2024-aer-ch3':
    " The earliest located institution-voice text on U01 within this group's search.",
  'am-u04-frb-2021-ai-rfi':
    " Earliest located U04 text in the institution voice within this group's search.",
  'am-u04-bcbs-2022-newsletter-aiml':
    "The earliest located institution-voice text on U04 within this group's search. ",
  'am-u05-bis-2024-aer-ch3':
    " The earliest located institution-voice text on U05 within this group's search.",
  'am-u06-frb-2023-cook-genai':
    " Earliest located within this group's search of Federal Reserve Board, PBoC, BoJ, MAS, HKMA and RBI texts;",
  'am-u11-bis-2024-aer-ch3':
    " The earliest located institution-voice text on U11 within this group's search.",
};
for (const [id, s] of Object.entries(STALE)) {
  const { x } = find('records', id);
  if (!x) continue;
  for (const v of [s, s.trim()])
    if (x.qualification.includes(v)) {
      set(
        'records',
        id,
        'qualification',
        x.qualification.replace(v, '').replace(/\s+/g, ' ').trim(),
        'minor: stale group-scoped note',
      );
      break;
    }
}
// Remaining group-scoped wording, checked by hand.
replaceIn(
  'records',
  'am-u09-fsb-2017-ai-ml',
  'qualification',
  'this record holds the earliest located use of the term together with AI within this group’s search, not a claim of coinage.',
  'it uses the term together with AI; the earliest located use of the name in the pack is the June 2017 FSB report.',
  'minor: stale group-scoped note',
);
replaceIn(
  'records',
  'am-u09-bcbs-2018-sound-practices-fintech',
  'qualification',
  "Earliest located within this group's search only;",
  'Not earliest located in the pack;',
  'minor: stale group-scoped note',
);
replaceIn(
  'records',
  'am-u11-frb-2025-barr-ai-central-banking',
  'qualification',
  'Most developed in this group in tying',
  'Ties',
  'minor: stale group-scoped note',
);
replaceIn(
  'records',
  'am-u12-boe-2026-breeden-agents-of-change-contests',
  'qualification',
  ' Compare her speech of 31 October 2024 in this group.',
  ' Compare her speech of 31 October 2024 (am-u12-boe-2024-breeden-engaging-machine).',
  'minor: stale group-scoped note',
);

// Pan Gongsheng: the timing point is introduced as raised in discussions of others.
replaceIn(
  'records',
  'am-u06-pbc-2026-pan-jrjlt',
  'statement',
  "Governor Pan Gongsheng said that AI's demand and supply effects may differ in timing",
  "Governor Pan Gongsheng said that, in the discussions of international organisations and central banks, issues worth attention include that AI's demand and supply effects may differ in timing",
  'minor: attribution of a reported point',
);

// Documents: voice and disclaimers.
set(
  'documents',
  'esrb-2025-asc-ai',
  'voice',
  'committee',
  'minor: voice (ASC members and Secretariat staff)',
);
set(
  'documents',
  'imf-2021-dp-ai-finance',
  'subtype',
  'Departmental paper',
  'minor: subtype',
);
set(
  'documents',
  'bis-2026-aer-ch1',
  'disclaimer',
  {
    source: 'bis-2026-aer-pdf',
    locator: 'PDF p. 4, imprint page',
    passage:
      'The views expressed here do not necessarily reflect the views of the BIS member central banks.',
  },
  'minor: disclaimer not recorded',
);
set(
  'documents',
  'imf-2024-gfsr-ch3',
  'voiceNote',
  'Kept as institution voice: the GFSR is the IMF’s flagship report, published without named chapter authors in the copy read; its disclaimer attributes the views to IMF staff, and statements say “prepared by IMF staff”. Open question in the review note.',
  'minor: voice',
);

// Events.
set(
  'events',
  'am-event-bisih-2023-aurora-phase1-concluded',
  'candidatePredicate',
  null,
  'minor: no candidate predicate fits a conclusion',
);
for (const id of [
  'am-event-bisih-2024-gaia-proof-of-concept',
  'am-event-bisih-2026-spectrum',
  'am-event-bisih-2026-aise',
])
  set(
    'events',
    id,
    'candidatePredicate',
    null,
    'minor: the page states work done, not a launch',
  );
set(
  'events',
  'am-event-ecb-2024-ai-action-plan',
  'kind',
  'other',
  'minor: "has developed", not adopted',
);
set(
  'events',
  'am-event-bof-2025-data-ai-priority',
  'kind',
  'other',
  'minor: existence stated, adoption not',
);
set(
  'events',
  'am-event-bof-2025-data-ai-priority',
  'candidatePredicate',
  null,
  'minor: fields disagreed',
);
// The standard's number and year are not evidenced by the text that states the issuance.
{
  const { x } = find('events', 'am-event-pbc-2021-jrt-0221-standard');
  if (x) {
    log.push({
      kind: 'events',
      id: x.id,
      renamed: 'am-event-pbc-2022-ai-algorithm-evaluation-standard',
      finding: 'minor: unevidenced number in id and subject',
    });
    x.id = 'am-event-pbc-2022-ai-algorithm-evaluation-standard';
    x.subject =
      '《人工智能算法金融应用评价规范》 (evaluation specification for AI algorithms in financial applications; the number JR/T 0221-2021 is not evidenced here)';
  }
}
// The ECB digitalisation programme: developed (stated) versus lab and studio (announced).
{
  const { x, d } = find('events', 'am-event-ecb-2026-digitalisation-programme');
  const newId = 'am-event-ecb-2026-ai-research-lab';
  if (x && !find('events', newId).x) {
    const ev = x.evidence;
    x.subject = 'Central banking digitalisation programme';
    x.candidatePredicate = null;
    x.kind = 'other';
    x.statement =
      'In a keynote speech of 23 March 2026, Philip R. Lane, Member of the Executive Board of the ECB, said that the ECB has developed a central banking digitalisation programme to move from AI experimentation to systematic implementation across the ECB in 2026 and 2027.';
    x.evidence = [x.evidence[0]];
    x.qualification =
      'The programme is stated as developed; its components that are being established or designed are recorded separately as announced. The speaker states that the views are his own.';
    const lab = JSON.parse(JSON.stringify({ ...x }));
    Object.assign(lab, {
      id: newId,
      kind: 'unit-established',
      subject: 'ECB AI research lab',
      candidatePredicate: 'unit_of',
      stage: 'announced',
      statement:
        'In the same speech, Lane said that the ECB is establishing an AI research lab which fosters innovation, applied economic research and staff upskilling.',
      evidence: [ev[1]],
      qualification:
        'Announced stays announced: the lab is “being established”; no start of operation is inferred. The speaker states that the views are his own.',
    });
    log.push({
      kind: 'events',
      id: x.id,
      split: newId,
      finding: 'minor: mixed stage',
    });
    d.events.push(lab);
  }
}

for (const { f, d } of drafts)
  writeFileSync(join(DRAFTS, f), JSON.stringify(d, null, 2) + '\n');
if (log.length)
  writeFileSync(
    join(DIR, 'audit', 'fixes.json'),
    JSON.stringify({ appliedAt: '2026-11-02', changes: log }, null, 2) + '\n',
  );
console.log(`${log.length} changes`);
