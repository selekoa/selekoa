// Integrator's correction pass after the two same-family audits (audit/audit-A.json,
// audit/audit-B.json) and the change of propositions.json (R10 split into R10a and R10b;
// consequence clauses dropped from R13 and R14). Run after reconcile.mjs. Idempotent;
// prints one line per change. Dispositions of each finding: audit/dispositions.json.
// Usage: node research/risk-debate/reconcile.mjs && node research/risk-debate/audit-fixes.mjs
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
const same = (a, b) => JSON.stringify(a) === JSON.stringify(b);
const CAT = 'catastrophe-and-priorities.json';
const GOALS = 'goals-and-drives.json';
const MIS = 'misalignment.json';
const OPEN = 'openness-and-incentives.json';
const TAKE = 'takeoff.json';

const ev = (source, locator, passage, passageType = 'quote', note = null) => ({
  source,
  locator,
  passage,
  passageType,
  sourceRole: 'primary',
  support: 'supports',
  note,
});

// ---------------------------------------------------------------------------
// 1. Author names: one spelling per person, without role suffixes.
const NAMES = {
  'Joe Carlsmith': 'Joseph Carlsmith',
  'Rodney A. Brooks': 'Rodney Brooks',
  'Alex Turner': 'Alexander Matt Turner',
  'Yoshua Bengio (chair)': 'Yoshua Bengio',
  'Ben Pace (compiler)': 'Ben Pace',
  'Nature (editorial)': 'Nature',
};
for (const f of files) {
  const d = drafts[f];
  for (const [kind, field] of [
    ['documents', 'authors'],
    ['sources', 'authors'],
    ['debates', 'participants'],
  ])
    for (const x of d[kind] ?? []) {
      const before = x[field];
      if (!before) continue;
      const after = [...new Set(before.map((a) => NAMES[a] ?? a))];
      if (!same(before, after)) {
        x[field] = after;
        log.push(
          `${f}: ${kind} ${x.id ?? x.key}: ${field} normalised (${before.filter((a) => NAMES[a]).join(', ')})`,
        );
      }
    }
}

// ---------------------------------------------------------------------------
// 2. One document id and one source key per work and expression.
const DOC_RENAME = {
  'andreessen-2023-why-ai-will-save-the-world':
    'andreessen-2023-ai-will-save-the-world',
  'andreessen-2023-save-the-world': 'andreessen-2023-ai-will-save-the-world',
  'hendrycks-2023-overview': 'hendrycks-2023-overview-catastrophic',
  'bengio-2023-managing-extreme-risks': 'bengio-2023-managing-ai-risks',
  'narayanan-2025-normal-technology': 'narayanan-kapoor-2025-normal-technology',
  // Two expressions (Robohub repost, Edge response) of one essay: one document, two sources.
  'brooks-2014-edge-tool-not-threat': 'brooks-2014-tool-not-threat',
  // Dated by the report read (October 2013), not the unread journal version of 2016.
  'armstrong-2016-racing': 'armstrong-2013-racing',
};
const SRC_RENAME = {
  'andreessen-2023-why-ai-will-save-the-world':
    'andreessen-2023-ai-will-save-the-world',
  'andreessen-2023-save-the-world': 'andreessen-2023-ai-will-save-the-world',
  'hendrycks-2023-overview': 'hendrycks-2023-overview-catastrophic',
  'takeoff-bengio-2023-managing-extreme-risks': 'bengio-2023-managing-ai-risks',
  'narayanan-2025-normal-technology': 'narayanan-kapoor-2025-normal-technology',
  'armstrong-2016-racing': 'armstrong-2013-racing',
};
// Record id after a document rename: rd-<code>-<document id>[-contests|-context].
const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const renameRecordId = (id) => {
  for (const [from, to] of Object.entries(DOC_RENAME)) {
    const m = id.match(
      new RegExp(`^(rd-[a-z0-9]+)-${esc(from)}(-contests|-context)?$`),
    );
    if (m) return `${m[1]}-${to}${m[2] ?? ''}`;
  }
  return id;
};
const renameReplyId = (id) => {
  for (const [from, to] of Object.entries(DOC_RENAME))
    id = id
      .replace(new RegExp(`-to-${esc(from)}$`), `-to-${to}`)
      .replace(new RegExp(`^rd-reply-${esc(from)}-to-`), `rd-reply-${to}-to-`);
  return id;
};
const doc = (id) => DOC_RENAME[id] ?? id;
const src = (k) => SRC_RENAME[k] ?? k;
for (const f of files) {
  const d = drafts[f];
  const ch = [];
  for (const s of d.sources ?? []) {
    if (src(s.key) !== s.key)
      ch.push(`source ${s.key} -> ${(s.key = src(s.key))}`);
    if (doc(s.documentId) !== s.documentId)
      ch.push(
        `source ${s.key} documentId -> ${(s.documentId = doc(s.documentId))}`,
      );
  }
  for (const x of d.documents ?? [])
    if (doc(x.id) !== x.id)
      ch.push(`document ${x.id} -> ${(x.id = doc(x.id))}`);
  for (const r of d.records ?? []) {
    if (doc(r.document) !== r.document) {
      r.document = doc(r.document);
      const id = renameRecordId(r.id);
      ch.push(`record ${r.id} -> ${id}`);
      r.id = id;
    }
    for (const e of r.evidence ?? [])
      if (src(e.source) !== e.source) e.source = src(e.source);
  }
  for (const r of d.replies ?? []) {
    if (doc(r.from) !== r.from || doc(r.to) !== r.to) {
      r.from = doc(r.from);
      r.to = doc(r.to);
      const id = renameReplyId(r.id);
      ch.push(`reply ${r.id} -> ${id}`);
      r.id = id;
    }
    for (const e of r.evidence ?? [])
      if (src(e.source) !== e.source) e.source = src(e.source);
  }
  for (const x of d.debates ?? []) {
    const after = [...new Set(x.documents.map(doc))];
    if (!same(after, x.documents)) {
      x.documents = after;
      ch.push(`debate ${x.id} documents`);
    }
  }
  for (const c of ch) log.push(`${f}: ${c}`);
}
// Canonical definitions: the copy in the named draft, with the named fields set.
const CANON = {
  documents: {
    'andreessen-2023-ai-will-save-the-world': {
      from: CAT,
      set: {
        dateBasis: 'posting',
        dateNote:
          'The a16z page reads "Posted June 6, 2023"; its datePublished metadata is 2023-06-06.',
      },
    },
    'hendrycks-2023-overview-catastrophic': { from: CAT, set: {} },
    'bengio-2023-managing-ai-risks': {
      from: TAKE,
      set: { dateNote: 'arXiv v1 stamp "26 Oct 2023" (submission date).' },
    },
    'narayanan-kapoor-2025-normal-technology': { from: CAT, set: {} },
    'brooks-2014-tool-not-threat': {
      from: CAT,
      set: {
        shortName:
          'Brooks, Artificial intelligence is a tool, not a threat (2014)',
        authors: ['Rodney Brooks'],
        dateNote:
          'Robohub dates its repost 11 November 2014 and names Rethink Robotics as the original venue; Brooks also gave the essay as his response in the Edge Reality Club discussion "The Myth of AI" (conversation dated 14 November 2014), saying there that he wrote it a week earlier. The original Rethink Robotics posting date was not verified. Two expressions are recorded as sources: the Robohub repost and the Edge response.',
      },
    },
    'armstrong-2013-racing': {
      from: OPEN,
      set: {
        shortName:
          'Armstrong, Bostrom and Shulman, Racing to the Precipice (2013)',
        date: '2013-10',
        dateNote:
          'The title page reads "October 2013"; the cover gives "Technical Report #2013-1". The journal version of 2016 was not read.',
      },
    },
  },
  sources: {
    'andreessen-2023-ai-will-save-the-world': {
      from: CAT,
      set: {
        version:
          'Current web page, which reads "Posted June 6, 2023"; no revision note in the retrieved text; later edits not checked.',
      },
    },
    'hendrycks-2023-overview-catastrophic': { from: CAT, set: {} },
    'bengio-2023-managing-ai-risks': { from: CAT, set: {} },
    'narayanan-kapoor-2025-normal-technology': { from: CAT, set: {} },
    'brooks-2014-edge-tool-not-threat': {
      from: GOALS,
      set: {
        authors: ['Rodney Brooks'],
        documentId: 'brooks-2014-tool-not-threat',
      },
    },
    'armstrong-2013-racing': { from: OPEN, set: {} },
  },
};
for (const kind of ['documents', 'sources']) {
  const idOf = (x) => (kind === 'sources' ? x.key : x.id);
  for (const [id, { from, set }] of Object.entries(CANON[kind])) {
    const base = (drafts[from][kind] ?? []).find((x) => idOf(x) === id);
    if (!base) {
      log.push(`MISSING canonical ${kind} ${id} in ${from}`);
      continue;
    }
    const canon = { ...structuredClone(base), ...structuredClone(set) };
    for (const f of files) {
      const arr = drafts[f][kind] ?? [];
      const hits = arr.filter((x) => idOf(x) === id);
      if (!hits.length) continue;
      const keep = hits[0];
      if (!same(keep, canon)) {
        arr[arr.indexOf(keep)] = structuredClone(canon);
        log.push(`${f}: ${kind} ${id} set to the canonical definition`);
      }
      for (const extra of hits.slice(1)) {
        arr.splice(arr.indexOf(extra), 1);
        log.push(`${f}: duplicate ${kind} ${id} removed`);
      }
    }
  }
}

// ---------------------------------------------------------------------------
// Record lookup tolerant of the id changes this script makes.
const allRecs = () =>
  files.flatMap((f) => (drafts[f].records ?? []).map((r) => ({ f, r })));
const allReplies = () =>
  files.flatMap((f) => (drafts[f].replies ?? []).map((r) => ({ f, r })));
const ALIAS = {}; // explicit old -> new ids (reclassifications, R10 split)
const variants = (id) => {
  const out = [id, renameRecordId(id), renameReplyId(id)];
  if (ALIAS[id]) out.push(...[ALIAS[id]].flat());
  for (const x of [...out]) {
    out.push(`${x}-context`, x.replace(/-(contests|context)$/, ''));
    out.push(x.replace(/-contests$/, '-context'));
    if (/^rd-r10-/.test(x))
      out.push(
        x.replace(/^rd-r10-/, 'rd-r10a-'),
        x.replace(/^rd-r10-/, 'rd-r10b-'),
      );
  }
  return [...new Set(out)];
};
const findRec = (id) => {
  const recs = allRecs();
  for (const v of variants(id)) {
    const hit = recs.find((x) => x.r.id === v);
    if (hit) return hit;
  }
  return null;
};
const findReply = (id) => {
  const reps = allReplies();
  for (const v of variants(id)) {
    const hit = reps.find((x) => x.r.id === v);
    if (hit) return hit;
  }
  return null;
};
const fix = (id, change, why) => {
  const hit = findRec(id) ?? findReply(id);
  if (!hit) return log.push(`MISSING ${id}`);
  const before = JSON.stringify(hit.r);
  change(hit.r);
  if (JSON.stringify(hit.r) !== before)
    log.push(`${hit.f}: ${hit.r.id}: ${why}`);
};
// New records: added once; on later runs, reset to this definition if it differs.
const RECORD_KEYS = [
  'id',
  'proposition',
  'document',
  'predicate',
  'statement',
  'time',
  'attested',
  'claimed',
  'roles',
  'term',
  'register',
  'engagement',
  'missing',
  'comparative',
  'qualification',
  'datasetLink',
  'evidence',
];
const upsert = (f, rec, why) => {
  const full = Object.fromEntries(
    RECORD_KEYS.map((k) => [
      k,
      rec[k] ??
        (k === 'register' ? 'nonfiction' : k === 'time' ? undefined : null),
    ]),
  );
  const hit = findRec(rec.id);
  if (!hit) {
    (drafts[f].records ??= []).push(full);
    return log.push(`${f}: ${rec.id}: added (${why})`);
  }
  if (!same(hit.r, full)) {
    const arr = drafts[hit.f].records;
    arr[arr.indexOf(hit.r)] = full;
    log.push(`${hit.f}: ${rec.id}: reset to its definition (${why})`);
  }
};
// Text edits in log, omission and question entries: replace once, then no-op.
const edit = (obj, field, from, to, where) => {
  if (!obj) return log.push(`MISSING entry for ${where}`);
  if (obj[field]?.includes(to)) return;
  if (!obj[field]?.includes(from)) return log.push(`MISSING text in ${where}`);
  obj[field] = obj[field].replace(from, to);
  log.push(`${where}: ${field} edited`);
};
const reclassify = (r, { id, missing, roles = ['context'] }) => {
  r.predicate = 'bears_on_proposition';
  r.roles = roles;
  r.engagement = null;
  r.missing = missing;
  r.id = id;
};

// ---------------------------------------------------------------------------
// 3. Audit A.
const DATED_EVENT = (date, basis, note = null) => ({
  kind: 'event',
  date,
  basis,
  note,
});
// R01: Brooks 2017 quotation restored to its negation; Goertzel 2015 is earlier.
fix(
  'rd-r01-brooks-2017-seven-deadly-sins-contests',
  (r) => {
    r.roles = ['contesting'];
    r.statement =
      "Brooks's post of 7 September 2017 argues that no real program could be smart enough to subvert human society to achieve goals set for it by humans without understanding how it was causing problems for those humans.";
    r.evidence = [
      ev(
        'brooks-2017-seven-deadly-sins',
        'Section C, Misaligned Values',
        'We would never get to a situation in any version of the real world where such a program could exist.',
      ),
      ev(
        'brooks-2017-seven-deadly-sins',
        'Section C, Misaligned Values (next sentence)',
        'One smart enough that it would be able to invent ways to subvert human society to achieve goals set for it by humans, without understanding the ways in which it was causing problems for those same humans.',
      ),
    ];
    r.qualification =
      "Brooks answers a quoted passage whose author he leaves unnamed; the post's argument concerns understanding of human goals, not whether such understanding brings concern for them.";
  },
  'quotation restored to include the negation; earliest-located role moves to Goertzel 2015 (audit A)',
);
upsert(
  GOALS,
  {
    id: 'rd-r01-goertzel-2015-superintelligence-fears-contests',
    proposition: 'R01',
    document: 'goertzel-2015-superintelligence-fears',
    predicate: 'contests_proposition',
    statement:
      "Goertzel's paper of 2015, discussing Bostrom's Superintelligence, argues that the orthogonality thesis concerns only what is possible in principle, which is of little direct interest, and that some pairings of intelligence and goals, though physically possible, would be extremely unlikely under reasonable assumptions.",
    time: DATED_EVENT('2015-11', 'publication'),
    roles: ['earliest-located', 'contesting'],
    engagement: {
      kind: 'engages-premise',
      rationale:
        'Disputes the relevance of in-principle independence by arguing that physically realisable minds constrain which goals go with which levels of intelligence.',
    },
    qualification:
      "The paper asks which goals are likely to accompany which kinds of intelligence in practice; it does not argue that intelligence brings benevolent goals. Earliest located among contesting records after the same-family audit, which found it among the pack's sources.",
    evidence: [
      ev(
        'goertzel-2015-superintelligence-fears',
        'Section 6, "The \'Scary Idea\' redux"',
        'This seems a strange sort of statement to preoccupy on.',
        'quote',
        "Follows the paper's quotation of the orthogonality thesis.",
      ),
      ev(
        'goertzel-2015-superintelligence-fears',
        'Section 6',
        'Some intelligence/goal pairings might be physically possible but extremely unlikely to occur under reasonable assumptions',
      ),
    ],
  },
  'audit A: earlier contesting text on R01',
);
// R02: Russell's comment concerns one specified reward.
fix(
  'rd-r02-russell-2019-instrumental-convergence-thread',
  (r) => {
    r.qualification =
      "A toy model offered as a mathematical observation, for a single specified reward (fetching coffee); the generalisation to almost any goal is stated in the question that opens the thread, not in Russell's comment. Each comment is the participant's own words in a relayed copy; the record states what the comment says in this thread, not the author's view at another date.";
  },
  'qualification: single specified reward (audit A)',
);
// R04: Ngo's v1 phase overview replaces the fragment.
fix(
  'rd-r04-ngo-2022-alignment-problem-deep-learning',
  (r) => {
    r.statement =
      "Ngo's report of August 2022 states that situationally aware policies will learn to pursue misaligned goals deceptively while still getting high training reward, and that policies too capable for humans to supervise effectively will generalise towards actions that give them more power over the world rather than following human intentions.";
    const kept = r.evidence.find((e) => e.locator.startsWith('Section 2.2.2'));
    r.evidence = [
      ev(
        'ngo-2022-alignment-problem-deep-learning',
        'Section 2 overview, Phase 2, PDF p. 3',
        'Once policies can reason about their training processes and deployment contexts (an ability which I’ll call situational awareness), they’ll learn to deceptively pursue misaligned goals while still getting high training reward.',
      ),
      ev(
        'ngo-2022-alignment-problem-deep-learning',
        'Section 2 overview, Phase 3, PDF p. 3',
        'Policies which are too capable for humans to effectively supervise will generalize towards taking actions which give them more power over the world, rather than following human intentions.',
      ),
      ...(kept ? [kept] : []),
    ];
  },
  'statement and evidence from the v1 phase overview; §2.3.2 fragment removed (audit A)',
);
// R05: Yudkowsky 2017 meets the criterion only through the name.
fix(
  'rd-r05-yudkowsky-2017-alphago-zero-foom',
  (r) => {
    r.qualification =
      "The post treats a narrow, closed domain (Go) as evidence about general capability gains and says so ('AlphaGo clearly isn't a general AI'). It holds the earliest-located role only through its use of the name “foom” for the transition, not through a stated period (the Go comparison spans two years, and the three days are of self-play in Go). It is the author's reading of one result, not a measurement of general takeoff speed. Texts by Yudkowsky already recorded on A4 (Hard Takeoff, 2008; Intelligence Explosion Microeconomics, 2013) are linked.";
  },
  'qualification: meets R05 only through the name “foom” (audit A)',
);
// R06: Russell 2014 is earlier than Yudkowsky 2016; the rhetorical half-question goes.
fix(
  'rd-r06-yudkowsky-2016-alignment-why-its-hard',
  (r) => {
    r.roles = ['articulation'];
    r.evidence = r.evidence.filter(
      (e) => !e.passage.startsWith('Why expect that their attempts'),
    );
  },
  'earliest-located role moves to Russell 2014; half of a rhetorical question removed (audit A)',
);
upsert(
  MIS,
  {
    id: 'rd-r06-russell-2014-edge-myths-and-moonshine',
    proposition: 'R06',
    document: 'russell-2014-edge-myths-and-moonshine',
    predicate: 'articulates_proposition',
    statement:
      "Russell's Edge response of 2014 states that a system's utility function may not be aligned with human values, which are very difficult to pin down, that this is not a minor difficulty, and that AI research, which has aimed at better decisions whatever the utility function, needs to change its goals to building intelligence provably aligned with human values.",
    time: DATED_EVENT('2014', 'posting'),
    roles: ['earliest-located'],
    qualification:
      "The response states that there is cause for optimism if alignment is treated as intrinsic to AI; it argues for a change in the field's goals, not that alignment cannot be achieved. Earliest located after the same-family audit, which found it among the pack's sources; the Edge responses carry no dates of their own. The second item is a paraphrase because the response's quotation limit is nearly reached.",
    evidence: [
      ev(
        'russell-2014-edge-myths-and-moonshine',
        'Reality Club response "Of Myths And Moonshine", paragraph after the numbered points',
        'This is not a minor difficulty.',
      ),
      ev(
        'russell-2014-edge-myths-and-moonshine',
        'Same response, numbered point 1 and closing paragraphs',
        "Russell writes that the values of the human race are at best very difficult to pin down, that improving decision quality irrespective of the utility function has been the mainstream goal of AI research, and that the right response is to change the field's goals to building intelligence provably aligned with human values.",
        'paraphrase',
      ),
    ],
  },
  'audit A: earlier articulation of R06',
);
// R07: Ng's wording; earlier contesting texts.
fix(
  'rd-r07-ng-2023-existential-risk-dont-get-it-contests',
  (r) => {
    r.roles = ['contesting'];
    r.statement =
      "Ng's letter in The Batch of 7 June 2023, responding to the CAIS statement, states that he struggles to see how AI could pose any meaningful risk of human extinction, lists the risks he does recognise, and says he is speaking with people who might have a thoughtful perspective on how AI creates such a risk.";
  },
  'statement follows the letter; earliest-located role moves to an earlier text (audit A)',
);
upsert(
  CAT,
  {
    id: 'rd-r07-hawkins-2015-terminator-not-coming-contests',
    proposition: 'R07',
    document: 'hawkins-2015-terminator-not-coming',
    predicate: 'contests_proposition',
    statement:
      "Hawkins's essay of 2 March 2015 states that there is no existential threat for the coming decades and that machine intelligence does not represent a threat to humanity any more than computers do.",
    time: DATED_EVENT('2015-03-02', 'publication'),
    roles: ['contesting'],
    engagement: {
      kind: 'engages-premise',
      rationale:
        'Grounds its rejection of an existential threat in the claim that neocortex-based machines will lack desires of their own.',
    },
    qualification:
      'The essay limits its claim to "the future we can see and control today" and the coming decades, and calls concern about irreversible steps towards extinction legitimate.',
    evidence: [
      ev(
        'hawkins-2015-terminator-not-coming',
        'Closing section',
        'There is no existential threat. This is the reality for the coming decades, and we can easily change direction should new existential threats appear.',
      ),
      ev(
        'hawkins-2015-terminator-not-coming',
        'Closing section',
        'Machine intelligence does not represent a threat to humanity any more than computers do.',
      ),
    ],
  },
  'audit A: earlier contesting text on R07',
);
const PINKER14_NOTE =
  "Paraphrase because Pinker's 526-word response already has 48 quoted words.";
upsert(
  CAT,
  {
    id: 'rd-r07-pinker-2014-edge-myth-of-ai-contests',
    proposition: 'R07',
    document: 'pinker-2014-edge-myth-of-ai',
    predicate: 'contests_proposition',
    statement:
      "Pinker's Edge response of 2014 argues that there are reasons not to worry about killer robots and machines running amok: disaster scenarios are cheap to play out in the imagination, where no probabilities apply, and AI dystopias project a dominance psychology onto intelligence.",
    time: DATED_EVENT('2014', 'posting'),
    roles: ['earliest-located', 'contesting'],
    engagement: {
      kind: 'engages-premise',
      rationale:
        'Disputes that AI catastrophe scenarios warrant concern, by arguing that they are imagined without probabilities and assume a will to dominate that intelligence does not entail.',
    },
    qualification:
      'The response speaks of machines running amok and of disaster scenarios, not of extinction in those words. Recorded after the same-family audit, which named it as earlier than Hawkins (2015); the Edge responses carry no dates of their own. ' +
      PINKER14_NOTE,
    evidence: [
      ev(
        'pinker-2014-edge-myth-of-ai',
        'Reality Club response by Steven Pinker, paras. 1–2 and 4',
        'Pinker writes that besides the distance to human-level AI there are other reasons not to worry about killer robots and machines running amok: disaster scenarios are cheap to play out in a probability-free imagination and always find an audience, and AI dystopias project a parochial alpha-male psychology onto the concept of intelligence.',
        'paraphrase',
      ),
    ],
  },
  'audit A alternative: earlier contesting text on R07',
);
// R08: earlier contesting texts than the 2019 thread.
fix(
  'rd-r08-lecun-2019-instrumental-convergence-thread-contests',
  (r) => {
    r.roles = ['contesting'];
  },
  'earliest-located role moves to an earlier text (audit A)',
);
upsert(
  CAT,
  {
    id: 'rd-r08-hawkins-2015-terminator-not-coming-contests',
    proposition: 'R08',
    document: 'hawkins-2015-terminator-not-coming',
    predicate: 'contests_proposition',
    statement:
      "Hawkins's essay of 2 March 2015 states that the machine-intelligence technology being created, based on neocortical principles, will not lead to self-replicating robots with uncontrollable intentions, and that there is no existential threat.",
    time: DATED_EVENT('2015-03-02', 'publication'),
    roles: ['contesting'],
    engagement: {
      kind: 'engages-premise',
      rationale:
        'Disputes the premise that capable machines would come to pursue goals of their own at odds with ours, since neocortex-based machines lack desires.',
    },
    qualification:
      'The essay limits its claim to "the future we can see and control today" and the coming decades. The opening item is a paraphrase because a line break in the retrieved text splits "self-replicating".',
    evidence: [
      ev(
        'hawkins-2015-terminator-not-coming',
        'Closing section',
        'Hawkins writes that the machine-intelligence technology being created today, based on neocortical principles, will not lead to self-replicating robots with uncontrollable intentions.',
        'paraphrase',
      ),
      ev(
        'hawkins-2015-terminator-not-coming',
        'Closing section',
        'There won’t be an intelligence explosion. There is no existential threat.',
      ),
    ],
  },
  'audit A: earlier contesting text on R08',
);
upsert(
  CAT,
  {
    id: 'rd-r08-pinker-2014-edge-myth-of-ai-contests',
    proposition: 'R08',
    document: 'pinker-2014-edge-myth-of-ai',
    predicate: 'contests_proposition',
    statement:
      "Pinker's Edge response of 2014 asks why superhumanly intelligent robots would want to depose their masters, massacre bystanders or take over the world, holding that goals are extraneous to intelligence.",
    time: DATED_EVENT('2014', 'posting'),
    roles: ['earliest-located', 'contesting'],
    engagement: {
      kind: 'contrary-only',
      rationale:
        'States that intelligent robots would have no reason to take over, without addressing goals acquired as means to other goals.',
    },
    qualification:
      'The same passage is recorded on R10a, which it states; it is recorded here because it disputes that capable machines would pursue goals at odds with human interests. Recorded after the same-family audit, which named it as earlier than Hawkins (2015); the Edge responses carry no dates of their own.',
    evidence: [
      ev(
        'pinker-2014-edge-myth-of-ai',
        'Reality Club response by Steven Pinker, para. 4',
        'Even if we did have superhumanly intelligent robots, why would they want to depose their masters, massacre bystanders, or take over the world?',
      ),
    ],
  },
  'audit A alternative: earlier contesting text on R08',
);
fix(
  'rd-r08-bengio-2023-rogue-ais',
  (r) => {
    r.attested = {
      date: '2026-10-29',
      note: 'The page metadata records a modification on 2025-12-03; the quoted wording is attested from the retrieval of 2026-10-29 and was not compared with a 2023 copy.',
    };
  },
  'attested date set to the retrieval (audit A)',
);
// R09.
fix(
  'rd-r09-bostrom-2002-existential-risks',
  (r) => {
    r.statement =
      'Bostrom\'s paper of March 2002 states that a small group in control of the initial superintelligence could conceivably select its goals and form a world government reflecting only the idiosyncratic values of its owners or designers, which, depending on those values, the paper would count as an existential catastrophe (a "shriek").';
    r.claimed = {
      date: '2001-04',
      note: 'An earlier version was presented in April 2001 (acknowledgements); it does not date the quoted wording.',
    };
  },
  "statement keeps the paper's condition; claimed date added (audit A)",
);
fix(
  'rd-r09-sotos-2021-unimportance-superintelligence',
  (r) => {
    r.qualification =
      "The paper's ranking rests on stated assumptions and a quantitative model of its own; it is the author's argument, not a risk assessment by others. The software it ranks highest is narrow 'savant' software, which it says is not generally superintelligent, and its human-derived risk is a capability to engineer pandemic microbes, without separating deliberate from accidental release.";
  },
  'qualification: narrow software; deliberate and accidental release not separated (audit A)',
);
fix(
  'rd-r09-marcus-2023-ai-risk-agi-risk',
  (r) => {
    r.statement =
      "Marcus's post of 28 March 2023 states that in the near term he is worried less about superintelligent machines beyond human control than about unreliable but widely deployed AI, that criminals and terrorists using it could contribute to nuclear war or the deliberate spread of pathogens, and that people need to stop worrying only about takeover scenarios and think more about such misuse.";
    const q =
      'I am not worried, immediately, about “AGI risk” (the risk of superintelligent machines beyond our control), in the near term I am worried about what I will call “MAI risk”';
    if (!r.evidence.some((e) => e.passage === q))
      r.evidence.unshift(
        ev(
          'marcus-2023-ai-risk-agi-risk',
          'Opening section, after the Hinton tweet',
          q,
        ),
      );
    r.qualification =
      'The ranking is stated for the near term. The post gives no estimate ("We have no earthly idea") and says its 1% figure was a thought experiment; it also states that future technology may be harder to control. Its "MAI risk" covers unreliability as well as misuse.';
  },
  'statement keeps "(just)" and the near-term scope; passage added (audit A)',
);
fix(
  'rd-r09-bengio-2023-rogue-ais',
  (r) => {
    const q =
      'The fastest route to a rogue AI system is if a human with the appropriate technical skills and means intentionally builds it with the objective of destroying humanity or a part of it set explicitly as a goal.';
    if (!r.evidence.some((e) => e.passage === q))
      r.evidence.push(
        ev('bengio-2023-rogue-ais', 'Section "Genocidal Humans"', q),
      );
    r.attested = {
      date: '2026-10-29',
      note: 'The page metadata records a modification on 2025-12-03; the quoted wording is attested from the retrieval of 2026-10-29 and was not compared with a 2023 copy.',
    };
  },
  '"fastest route" passage added; attested date set (audit A)',
);
fix(
  'rd-r09-mouton-2024-rand-bio-red-team-contests',
  (r) =>
    reclassify(r, {
      id: 'rd-r09-mouton-2024-rand-bio-red-team-context',
      missing:
        'Does not dispute that advanced AI could enable mass-casualty misuse; reports no measurable uplift in biological attack planning from the models tested as of summer 2023 and states that the distance to the capability frontier was not measured.',
    }),
  'reclassified as bearing on R09 (audit A)',
);
upsert(
  CAT,
  {
    id: 'rd-r09-pinker-2014-edge-myth-of-ai-contests',
    proposition: 'R09',
    document: 'pinker-2014-edge-myth-of-ai',
    predicate: 'contests_proposition',
    statement:
      "Pinker's Edge response of 2014 argues that a deliberately designed and released battalion of robots for mass destruction would require a chain of improbable conditions (a malevolent technological genius, a secret and loyal team, and survival of detection and blunders), and that while it could happen in theory there are more pressing things to worry about.",
    time: DATED_EVENT('2014', 'posting'),
    roles: ['earliest-located', 'contesting'],
    engagement: {
      kind: 'engages-premise',
      rationale:
        'Disputes the likelihood of deliberate mass-casualty use by multiplying the conditions it requires.',
    },
    qualification:
      'The passage concerns robots built and released by one malevolent designer and his team; it does not discuss states or other routes of misuse. Recorded after the same-family audit; the Edge responses carry no dates of their own. ' +
      PINKER14_NOTE,
    evidence: [
      ev(
        'pinker-2014-edge-myth-of-ai',
        'Reality Club response by Steven Pinker, final paragraph',
        'Pinker writes that an evil genius deliberately designing and releasing robots to sow mass destruction would need a thirst for mass murder and a genius for innovation, a team with perfect secrecy, loyalty and competence, and to survive detection, betrayal, stings, blunders and bad luck; it could happen in theory, but there are more pressing things to worry about.',
        'paraphrase',
      ),
    ],
  },
  'audit A: contesting text on R09',
);
// R11.
fix(
  'rd-r11-dafoe-russell-2016-yes-we-are-worried-contests',
  (r) => {
    r.roles = ['contesting'];
  },
  'earliest-located role moves to Russell 2014 (audit A)',
);
upsert(
  CAT,
  {
    id: 'rd-r11-russell-2014-edge-myths-and-moonshine-contests',
    proposition: 'R11',
    document: 'russell-2014-edge-myths-and-moonshine',
    predicate: 'contests_proposition',
    statement:
      "Russell's Edge response of 2014, answering Brooks, argues that the time from authoritative statements of impossibility to a breakthrough can be hours rather than centuries, and that a convincing argument for a more-than-infinitesimal possibility of catastrophe is enough, without proof.",
    time: DATED_EVENT('2014', 'posting'),
    roles: ['earliest-located', 'contesting'],
    engagement: {
      kind: 'engages-premise',
      rationale:
        'Disputes the premise that the absence of proof or a long expected timescale makes risk claims unfit to guide attention.',
    },
    qualification:
      'The response states that none of this proves AI will be the end of the world. Recorded after the same-family audit; the Edge responses carry no dates of their own.',
    evidence: [
      ev(
        'russell-2014-edge-myths-and-moonshine',
        'Reality Club response "Of Myths And Moonshine", fourth paragraph',
        'there is no need for a proof, just a convincing argument pointing to a more-than-infinitesimal possibility.',
      ),
    ],
  },
  'audit A: earlier contesting text on R11',
);
fix(
  'rd-r11-narayanan-kapoor-2024-xrisk-probabilities',
  (r) => {
    r.statement =
      'The essay by Narayanan and Kapoor of 26 July 2024 argues that probability estimates of AI-caused extinction are far too unreliable to be useful for policy, since there is no reference class for the event, and states that the authors have no objection to AI x-risk forecasting as an academic activity.';
  },
  'statement follows the essay ("no objection"), not "unchallenged" (audit A)',
);
// R12.
fix(
  'rd-r12-crawford-calo-2016-blind-spot',
  (r) => {
    reclassify(r, {
      id: 'rd-r12-crawford-calo-2016-blind-spot-context',
      missing:
        "The authors' own wording: only the journal's standfirst, which summarises the argument in the third person, was readable.",
    });
    r.register = 'relay';
    r.qualification =
      "The evidence is the published standfirst, which summarises the authors' argument in the third person; the full text is closed access and was not read. Recorded as context, without a role, pending a read of the full text.";
  },
  'reclassified as context without a role (audit A)',
);
fix(
  'rd-r12-zador-2019-instrumental-convergence-thread',
  (r) => {
    reclassify(r, {
      id: 'rd-r12-zador-2019-instrumental-convergence-thread-context',
      missing:
        'Documented present harms of AI systems: the serious issues are unforeseen future consequences of AI, illustrated by other technologies.',
    });
    r.statement =
      "Zador's comment in the 2019 thread states that focusing on killer robots that dominate humans is a distraction from much more serious issues, which he presents as the unintended societal consequences that improvements in AI will have, by analogy with books, food production technology and social media.";
    r.qualification =
      "In the same comment Zador states that value alignment is important and not a solved problem. Each comment is the participant's own words in a relayed copy; the record states what the comment says in this thread, not the author's view at another date.";
  },
  'reclassified as context: no present harms of AI named (audit A)',
);
fix(
  'rd-r12-dair-2023-statement',
  (r) => {
    r.roles = ['earliest-located'];
  },
  'earliest located on R12 after the two reclassifications (audit A)',
);
// R13: the page's own last date attests the wording.
fix(
  'rd-r13-gwern-2020-scaling-hypothesis-contests',
  (r) => {
    r.attested = {
      date: '2022-01-02',
      note: 'The page dates itself "2020-05-28–2022-01-02", the second date being its stated last modification; the quoted wording is read in the current page, which states no later revision; no earlier copy was compared.',
    };
    r.roles = ['contesting', 'earliest-located'];
    r.qualification =
      "Read in the current page, which the author dates 2020-05-28 to 2022-01-02; the wording is attested from the later date. The essay states the hypothesis as the author's own expectation, not as demonstrated.";
  },
  'attested note made consistent; earliest located among R13 contesting records (audit A)',
);
// R17: dated by the report read.
fix(
  'rd-r17-armstrong-2016-racing-contests',
  (r) => {
    r.time = DATED_EVENT(
      '2013-10',
      'publication',
      'Title page of the FHI technical report; journal version (2016) not read.',
    );
    r.qualification =
      "A stylised game-theoretic model with assumptions the authors state (a powerful AI built by the winning team, a disaster probability rising as precautions fall); it does not measure any developer's incentives.";
  },
  'dated 2013-10 from the title page (audit A)',
);

// ---------------------------------------------------------------------------
// 4. Audit B.
fix(
  'rd-r14-mahowald-2023-dissociating-language-thought-context',
  (r) => {
    r.qualification =
      'The paper reviews evidence on current models and does not argue that such systems cannot acquire functional competence.';
  },
  'qualification: a review, not a benchmark study (audit B)',
);
fix(
  'rd-r05-narayanan-kapoor-2025-normal-technology-contests',
  (r) => {
    const q =
      'But note that AI development already relies heavily on AI. It is more likely that we will continue to see a gradual increase in the role of automation in AI development than a singular, discontinuous moment when recursive self-improvement is achieved.';
    if (!r.evidence.some((e) => e.passage === q))
      r.evidence.push(
        ev(
          'narayanan-kapoor-2025-normal-technology',
          'Part I, section "The External world puts a speed limit on AI innovation", paragraph on AI-conducted AI research',
          q,
        ),
      );
  },
  'Part I passage added as the reason against R05 (audit B)',
);
// Pinker 2018: the passages dispute R06 and state R10a, not dispute R01.
ALIAS['rd-r01-pinker-2018-popsci-fear-robots-contests'] =
  'rd-r06-pinker-2018-popsci-fear-robots-contests';
fix(
  'rd-r01-pinker-2018-popsci-fear-robots-contests',
  (r) => {
    r.id = 'rd-r06-pinker-2018-popsci-fear-robots-contests';
    r.proposition = 'R06';
    r.statement =
      "Pinker's article of 14 February 2018, adapted from Enlightenment Now, argues that scenarios of an AI literal-mindedly pursuing a given goal against human interests are, in its words, “self-refuting”, because choosing actions that best satisfy conflicting goals and interpreting the intentions of a language user are part of intelligence itself, and that AI, like any other technology, is developed incrementally and tested before it is implemented.";
    r.engagement = {
      kind: 'engages-premise',
      rationale:
        'Disputes that a capable system would pursue a given objective in a way harmful through misunderstanding, and that safety will not come from ordinary incremental design and testing.',
    };
    r.qualification =
      'The article argues that the alignment scenarios it describes misread intelligence; it does not discuss systems produced by training. The same article states that a designed AI need not have dominating goals, which is recorded on R10a.';
    r.evidence = [
      r.evidence.find((e) => e.passage.startsWith('The ability to choose')) ??
        ev(
          'pinker-2018-popsci-fear-robots',
          'Section on the Value Alignment Problem',
          'The ability to choose an action that best satisfies conflicting goals is not an add-on to intelligence that engineers might slap themselves in the forehead for forgetting to install; it is intelligence. So is the ability to interpret the intentions of a language user in context.',
        ),
      ev(
        'pinker-2018-popsci-fear-robots',
        'Section on the Value Alignment Problem, after the Get Smart example',
        'It is developed incrementally, designed to satisfy multiple conditions, tested before it is implemented, and constantly tweaked for efficacy and safety.',
      ),
    ];
  },
  're-recorded on R06 (audit B)',
);
upsert(
  GOALS,
  {
    id: 'rd-r10a-pinker-2018-popsci-fear-robots',
    proposition: 'R10a',
    document: 'pinker-2018-popsci-fear-robots',
    predicate: 'articulates_proposition',
    statement:
      "Pinker's article of 14 February 2018 argues that the drive to dominate belongs to a circuit in the limbic brain of one primate species, not to the nature of intelligence, so that an AI designed rather than evolved could as easily be altruistic and need not turn into a “ruthless conquistador”.",
    time: DATED_EVENT('2018-02-14', 'publication'),
    roles: ['articulation'],
    qualification:
      "A statement of the author's argument, not evidence about future systems. The passage also states that goals are independent of intelligence, the independence that R01 asserts. Moved here from the former R01 record after the same-family audit.",
    evidence: [
      ev(
        'pinker-2018-popsci-fear-robots',
        'Section on the first fallacy',
        'An artificially intelligent system that was designed rather than evolved could just as easily think like shmoos',
      ),
      ev(
        'pinker-2018-popsci-fear-robots',
        'Section on the first fallacy',
        'There is no law of complex systems that says intelligent agents must turn into ruthless conquistadors.',
      ),
    ],
  },
  'audit B: the "conquistadors" passage states R10a',
);
fix(
  'rd-r14-kambhampati-2024-llms-cant-plan',
  (r) => {
    reclassify(r, {
      id: 'rd-r14-kambhampati-2024-llms-cant-plan-context',
      missing:
        'Argues that LLMs cannot plan or self-verify by themselves; does not state that they lack goals, agency or understanding.',
    });
    r.qualification =
      "The paper argues that LLMs can help planning inside frameworks with external verifiers; its description of LLMs as n-gram models on steroids bears on the criterion's element of systems that model or reproduce text only.";
  },
  'reclassified as bearing on R14 (audit B)',
);
fix(
  'rd-r14-browning-lecun-2022-limits-of-language',
  (r) => {
    reclassify(r, {
      id: 'rd-r14-browning-lecun-2022-limits-of-language-context',
      missing:
        'Holds that systems trained on language alone have a shallow understanding, not that they lack understanding, and does not discuss goals or agency.',
    });
    r.statement =
      "Browning and LeCun's essay of August 2022 argues that a system trained on words and sentences alone will never approximate human understanding, because language is a limited kind of knowledge representation, so that such systems are, in the essay's words, “doomed to a shallow understanding”.";
  },
  "reclassified as bearing on R14; the authors' word quoted (audit B)",
);
fix(
  'rd-r12-gebru-torres-2024-tescreal',
  (r) => {
    r.statement =
      'The paper by Gebru and Torres of April 2024 argues that those it calls “TESCREALists” use the language of “safety” to drive resources into building AGI, which harms marginalised groups, and then to dissuade investigations into those harms and divert resources into preventing a “hypothetical AGI apocalypse”, and that their influence has led policy-makers and researchers to prioritise the AGI agenda while siphoning resources away from task-specific systems.';
    const q =
      'TESCREALists use the language of “safety” to first drive resources into the goal of building AGI, which in turn causes harm to marginalized groups, and then use the language of “safety” to dissuade investigations into those harms and once again divert resources into preventing a hypothetical AGI apocalypse.';
    if (!r.evidence.some((e) => e.passage === q))
      r.evidence.unshift(
        ev('gebru-torres-2024-tescreal', 'Section 6, closing paragraph', q),
      );
  },
  'diversion passage added as the main evidence; statement rests on quoted text (audit B)',
);
fix(
  'rd-r06-leike-2022-optimistic-alignment-approach-contests',
  (r) =>
    reclassify(r, {
      id: 'rd-r06-leike-2022-optimistic-alignment-approach-context',
      missing:
        'Argues that aligning a system able to do alignment research is tractable with a deliberate research programme; does not hold that alignment is easy or will be solved by default.',
    }),
  'reclassified as bearing on R06 (audit B)',
);
fix(
  'rd-r05-grace-2022-counterarguments-contests',
  (r) => {
    r.claimed = {
      date: '2022-08-31',
      note: 'Date in the byline; the post was published on 14 October 2022.',
    };
  },
  'byline date recorded as claimed (audit B)',
);
fix(
  'rd-reply-kapoor-2024-open-foundation-models-to-gopal-2023-pandemic-agents',
  (r) => {
    r.statement =
      "Kapoor, Bommasani and co-authors' paper of February 2024 cites Gopal and co-authors' paper as finding that open language models can generate accurate information about pandemic pathogens, and states that such information is publicly available without open language models.";
    r.qualification =
      'A citation is not agreement; it records that the text addresses the other. The paper cites Gopal et al. and Guha et al. together as an example of researchers reaching different conclusions without a marginal-risk framework, and cites Seger et al. (2023) in the same passage as one of the works arguing that open weights enable misuse.';
  },
  'statement follows the passage (audit B)',
);
fix(
  'rd-reply-howard-2023-dislightenment-to-time-2023-shut-it-all-down',
  (r) => {
    r.qualification =
      "Derivation: inferred, not explicit. The essay names Yudkowsky and his proposal of airstrikes on unauthorised data centres, not the TIME article. Premise: Yudkowsky's TIME essay of 29 March 2023 sets out that proposal. Rationale: the essay's description matches it and it was published four months earlier; the essay cites no other text. Admitted, the cites claim would be inferred, or the reply would be recorded as naming Yudkowsky with the TIME article as context. The essay's main object is the white paper \"Frontier AI Regulation\", which is not recorded here.";
  },
  'target identification marked as inferred (audit B)',
);

// ---------------------------------------------------------------------------
// 5. R10 split: each record goes where its passage puts it.
const r10split = (oldId, outs) => {
  const hit = findRec(oldId);
  if (hit && hit.r.proposition === 'R10') {
    const arr = drafts[hit.f].records;
    const made = outs.map((o) => {
      const r = structuredClone(hit.r);
      r.id = o.id;
      r.proposition = o.id.startsWith('rd-r10a-') ? 'R10a' : 'R10b';
      o.patch?.(r);
      return r;
    });
    arr.splice(arr.indexOf(hit.r), 1, ...made);
    log.push(`${hit.f}: ${oldId} -> ${outs.map((o) => o.id).join(' + ')}`);
    ALIAS[oldId] = outs.map((o) => o.id);
    return;
  }
  ALIAS[oldId] = outs.map((o) => o.id);
  for (const o of outs)
    if (o.patch) fix(o.id, o.patch, 'R10 split');
    else if (!findRec(o.id)) log.push(`MISSING ${o.id}`);
};
const keepEv = (r, ...starts) => {
  const pick = r.evidence.filter((e) =>
    starts.some((s) => e.passage.startsWith(s)),
  );
  if (pick.length) r.evidence = pick;
};
r10split('rd-r10-omohundro-2008-basic-ai-drives-contests', [
  {
    id: 'rd-r10a-omohundro-2008-basic-ai-drives-contests',
    patch: (r) => {
      r.roles = ['earliest-located', 'contesting'];
      r.engagement = {
        kind: 'engages-premise',
        rationale:
          'Disputes the premise that a system given harmless goals will lack harmful drives, by deriving drives such as self-preservation and resource acquisition from goal-seeking itself rather than from evolved motives.',
      };
      r.qualification =
        "Earliest located among the contesting records of this group's search. The paper contests harmlessness by default; it also holds that careful design can prevent harmful behaviour, so it is not recorded as contesting R10b.";
    },
  },
]);
r10split('rd-r10-bostrom-2012-superintelligent-will-contests', [
  {
    id: 'rd-r10a-bostrom-2012-superintelligent-will-contests',
    patch: (r) => {
      r.roles = ['contesting'];
      r.qualification =
        'The paper gives reasons against the claim that intelligence brings benevolence; it does not argue that safeguards are impossible.';
    },
  },
]);
r10split('rd-r10-brooks-2014-tool-not-threat-context', [
  {
    id: 'rd-r10a-brooks-2014-tool-not-threat-context',
    patch: (r) => {
      r.roles = ['context'];
      r.time = DATED_EVENT('2014-11', 'posting');
      r.attested = {
        date: '2014',
        note: "The quoted wording is read in Brooks's Edge Reality Club response, which carries no date of its own; the conversation it answers is dated 14 November 2014.",
      };
      r.missing =
        'Argues that intentional, malevolent AI is far off, not that sufficiently intelligent AI would be benevolent or would lack a drive to harm people.';
      r.qualification =
        'The passage concerns timescale and the absence of intent in current methods. Read in the Edge copy of the essay; its Robohub repost of 11 November 2014 is the other recorded expression.';
    },
  },
]);
r10split('rd-r10-kelly-2014-edge-myth-of-ai', [
  {
    id: 'rd-r10b-kelly-2014-edge-myth-of-ai',
    patch: (r) => {
      r.roles = ['earliest-located'];
      r.qualification =
        "Earliest located among the texts this group's search found; the Edge responses carry no dates of their own. A statement of the author's expectation, not evidence that AI systems will remain alterable; the response says a locked-out scenario is possible but one of many.";
    },
  },
]);
r10split('rd-r10-pinker-2014-edge-myth-of-ai', [
  {
    id: 'rd-r10a-pinker-2014-edge-myth-of-ai',
    patch: (r) => {
      r.roles = ['earliest-located'];
      r.qualification =
        "Earliest located among the texts this group's search found; the Edge responses carry no dates of their own. The passage also states that goals are extraneous to intelligence, which is the independence that R01 asserts.";
    },
  },
]);
r10split('rd-r10-hawkins-2015-terminator-not-coming', [
  {
    id: 'rd-r10a-hawkins-2015-terminator-not-coming',
    patch: (r) => {
      r.roles = ['articulation'];
    },
  },
]);
r10split('rd-r10-pinker-2015-thinking-does-not-imply-subjugating', [
  {
    id: 'rd-r10a-pinker-2015-thinking-does-not-imply-subjugating',
    patch: (r) => {
      r.roles = ['articulation'];
      r.statement =
        "Pinker's Edge response of 2015 argues that an artificially intelligent system would have no reason to want to disable safeguards against harm, because goals are extraneous to intelligence and dominance-seeking is a product of natural selection in one primate species, not a feature of intelligent systems.";
      const q = 'Being smart is not the same as wanting something.';
      keepEv(r, 'Would an artificially intelligent system');
      if (!r.evidence.some((e) => e.passage === q))
        r.evidence.push(
          ev(
            'pinker-2015-thinking-does-not-imply-subjugating',
            'Response, para. 7',
            q,
          ),
        );
      r.qualification =
        "A statement of the author's argument, not evidence about future systems. The response repeats much of the wording of Pinker's Edge response of 2014.";
    },
  },
  {
    id: 'rd-r10b-pinker-2015-thinking-does-not-imply-subjugating',
    patch: (r) => {
      r.roles = ['articulation'];
      r.statement =
        "Pinker's Edge response of 2015 argues that roboticists will build in safeguards against harm as they proceed, with the common sense that went into the design of other machines, and that slow progress leaves time for feedback from incremental implementations.";
      keepEv(r, "Also, it's bizarre", 'there will be plenty of time');
      r.qualification =
        "A statement of the author's expectation, not evidence that safeguards will work. The response's argument that an AI would have no reason to disable the safeguards is recorded on R10a.";
    },
  },
]);
r10split('rd-r10-zador-lecun-2019-dont-fear-the-terminator', [
  {
    id: 'rd-r10a-zador-lecun-2019-dont-fear-the-terminator',
    patch: (r) => {
      r.roles = ['articulation'];
      r.statement =
        "Zador and LeCun's essay of 26 September 2019 argues that intelligence does not by itself generate a drive for domination, and that AI systems, which did not pass through natural selection, did not need to evolve a survival instinct.";
      keepEv(r, 'But intelligence per se');
      r.qualification =
        "A statement of the authors' argument, not evidence about future systems. The essay also states that intelligence can serve whatever goals are set for it, the independence that R01 asserts, and lists weaponisation and economic disruption as risks.";
    },
  },
  {
    id: 'rd-r10b-zador-lecun-2019-dont-fear-the-terminator',
    patch: (r) => {
      r.roles = ['articulation'];
      r.statement =
        "Zador and LeCun's essay of 26 September 2019 states that even in the worst case, in which wars might be fought by armies of superintelligent robots, the robots will remain under human command.";
      keepEv(r, 'Even in the worst case');
      r.qualification =
        "A statement of the authors' expectation, closing a passage on the worst case; the essay gives its reasons on the absence of a drive to dominate, recorded on R10a.";
    },
  },
]);
r10split('rd-r10-bengio-2019-instrumental-convergence-thread-contests', [
  {
    id: 'rd-r10b-bengio-2019-instrumental-convergence-thread-contests',
    patch: (r) => {
      r.roles = ['contesting', 'earliest-located'];
    },
  },
]);
r10split('rd-r10-lecun-2019-instrumental-convergence-thread', [
  {
    id: 'rd-r10b-lecun-2019-instrumental-convergence-thread',
    patch: (r) => {
      r.roles = ['articulation'];
      r.qualification =
        "Each comment is the participant's own words in a relayed copy; the record states what the comment says in this thread, not the author's view at another date.";
    },
  },
]);
r10split('rd-r10-russell-2019-ieee-spectrum-contests', [
  {
    id: 'rd-r10b-russell-2019-ieee-spectrum-contests',
    patch: (r) => {
      r.roles = ['contesting'];
    },
  },
]);
r10split('rd-r10-andreessen-2023-ai-will-save-the-world', [
  {
    id: 'rd-r10a-andreessen-2023-ai-will-save-the-world',
    patch: (r) => {
      r.roles = ['articulation'];
      r.statement =
        "Andreessen's essay of 6 June 2023 argues that the idea that AI will decide to kill humanity is a category error, because AI is not a living being primed by billions of years of evolution to take part in the battle for the survival of the fittest.";
      const q =
        'AI is not a living being that has been primed by billions of years of evolution to participate in the battle for the survival of the fittest, as animals are, and as we are.';
      keepEv(r, 'My view is that');
      if (!r.evidence.some((e) => e.passage === q))
        r.evidence.push(
          ev(
            'andreessen-2023-ai-will-save-the-world',
            'Section "AI Risk #1: Will AI Kill Us All?"',
            q,
          ),
        );
    },
  },
  {
    id: 'rd-r10b-andreessen-2023-ai-will-save-the-world',
    patch: (r) => {
      r.roles = ['articulation'];
      r.statement =
        "Andreessen's essay of 6 June 2023 argues that the idea that AI will decide to kill humanity is a category error, because AI is code built, owned, used and controlled by people.";
      keepEv(r, 'My view is that', 'It is math');
    },
  },
]);
r10split('rd-r10-belrose-pope-2023-ai-easy-to-control', [
  {
    id: 'rd-r10b-belrose-pope-2023-ai-easy-to-control',
    patch: (r) => {
      r.roles = ['articulation', 'most-developed'];
    },
  },
]);
r10split('rd-r10-bengio-2024-reasoning-through-arguments-contests', [
  {
    id: 'rd-r10a-bengio-2024-reasoning-through-arguments-contests',
    patch: (r) => {
      r.roles = ['contesting'];
      r.engagement = {
        kind: 'engages-premise',
        rationale:
          'Disputes that advanced AI would be benevolent, by arguing that self-preservation goals can arise instrumentally or be given by humans and would lead an AI to resist being turned off.',
      };
      r.qualification =
        'The post addresses positions it reports from conversations rather than named texts; it does not claim certainty of harm. The passage also bears on control (an AI resisting being turned off); it is recorded once, on R10a, under the section heading on AGI being kind.';
    },
  },
]);

// ---------------------------------------------------------------------------
// 6. R13 and R14 without consequence clauses.
fix(
  'rd-r13-marcus-2018-critical-appraisal',
  (r) => {
    r.qualification =
      "The paper argues that deep learning alone is insufficient for general intelligence; it does not address catastrophic risk. Yudkowsky's texts on the overlapping dataset concept Y13 contest that AGI is decades away and are linked.";
  },
  'qualification no longer refers to the removed consequence clause',
);
fix(
  'rd-r14-janus-2022-simulators-context',
  (r) => {
    r.missing =
      'The post holds that GPT is not itself an agent but can simulate goal-directed agents and act like one, so it does not state that language models lack goals or agency.';
  },
  'missing element restated against the current criterion',
);

// ---------------------------------------------------------------------------
// 7. Wording (audit B).
fix(
  'rd-r02-thorstad-2026-instrumental-convergence-contests',
  (r) => {
    r.statement = r.statement.replace(
      'none of the leading defences,',
      'none of the defences it examines (the paper calls them “leading defenses”),',
    );
  },
  'wording: "leading" quoted as the author\'s',
);
fix(
  'rd-r15-mozilla-2023-joint-statement',
  (r) => {
    r.qualification = r.qualification.replace(
      'It grants that open models can be abused.',
      'It also states that open models can be abused.',
    );
  },
  'wording: "grants" replaced',
);
fix(
  'rd-r15-widder-2024-open-closed-contests',
  (r) => {
    r.qualification = r.qualification.replace(
      'and grants that open AI allows some oversight and experimentation',
      'and states that maximally open AI allows some forms of oversight and experimentation',
    );
  },
  'wording: "grants" replaced',
);
fix(
  'rd-r15-bengio-2024-reasoning-arguments-contests',
  (r) => {
    r.qualification = r.qualification.replace(
      'The post grants a present net benefit of open-sourcing and contests it for future systems',
      'The post states that open-sourcing may currently be more beneficial than detrimental to safety and argues otherwise for future systems',
    );
  },
  'wording: "grants" replaced',
);
fix(
  'rd-r17-hanson-2023-reasonable-ai-fears',
  (r) => {
    r.qualification = r.qualification.replace(
      'The essay grants that competition',
      'The essay also states that competition',
    );
  },
  'wording: "grants" replaced',
);
fix(
  'rd-r15-seger-2023-open-sourcing-contests',
  (r) => {
    r.engagement.rationale = r.engagement.rationale.replace(
      'Grants the benefits attributed to openness',
      'States the benefits attributed to openness',
    );
  },
  'wording: "Grants" replaced',
);
fix(
  'rd-r17-hendrycks-2023-natural-selection-contests',
  (r) => {
    r.engagement.rationale = r.engagement.rationale.replace(
      'Grants that economic incentives',
      'States that economic incentives',
    );
  },
  'wording: "Grants" replaced',
);
fix(
  'rd-r02-andreessen-2023-why-ai-will-save-the-world-contests',
  (r) => {
    r.qualification = r.qualification.replace(
      'The passage denies that AI has goals at all;',
      'The passage states that AI has no goals at all;',
    );
    r.engagement.rationale = r.engagement.rationale.replace(
      'Denies that AI systems have goals,',
      'States that AI systems have no goals,',
    );
  },
  'wording: "denies" replaced',
);
fix(
  'rd-r13-bengio-2023-managing-extreme-risks-contests',
  (r) => {
    r.engagement.rationale = r.engagement.rationale.replace(
      'It denies that there is a fundamental limit at human level without',
      'It states that there is no fundamental limit at human level, without',
    );
  },
  'wording: "denies" replaced',
);
fix(
  'rd-r13-altman-2024-intelligence-age-contests',
  (r) => {
    r.qualification = r.qualification.replace(
      'An assertion by the chief executive of a developer of the systems in question;',
      'A statement by the chief executive of OpenAI, a developer of the systems in question;',
    );
    r.engagement.rationale = r.engagement.rationale.replace(
      'It asserts continued gains from scaling without',
      'It states that gains from scaling will continue, without',
    );
  },
  'wording: discounting "assertion" removed',
);
fix(
  'rd-r11-andreessen-2023-ai-will-save-the-world',
  (r) => {
    r.qualification = r.qualification.replace(
      '(a term it uses for advocates of AI regulation)',
      '(the essay\'s term, from its analogy of "Baptists" and "Bootleggers", for "the true believer social reformers" who feel that "new restrictions, regulations, and laws are required to prevent societal disaster")',
    );
  },
  "wording: Andreessen's own term quoted",
);
// One date basis per work after the merge of duplicate documents.
{
  const docs = new Map(
    files.flatMap((f) => (drafts[f].documents ?? []).map((d) => [d.id, d])),
  );
  for (const id of new Set(Object.values(DOC_RENAME)))
    for (const { f, r } of allRecs().filter((x) => x.r.document === id)) {
      const d = docs.get(id);
      if (!d) continue;
      const before = JSON.stringify(r.time);
      if (r.time.basis !== d.dateBasis) r.time.basis = d.dateBasis;
      if (
        id === 'andreessen-2023-ai-will-save-the-world' &&
        r.time.note === 'Day not confirmed from the retrieved text.'
      )
        r.time.note = null;
      if (JSON.stringify(r.time) !== before)
        log.push(
          `${f}: ${r.id}: date basis set to the document's (${d.dateBasis})`,
        );
    }
}

// ---------------------------------------------------------------------------
// 8. Search log, omissions, retrieval failures, open questions.
const entry = (f, kind, pred) => (drafts[f][kind] ?? []).find(pred);
const sl = (f, p) => entry(f, 'searchLog', (s) => s.proposition === p);
{
  const g = drafts[GOALS];
  const props = ['R01', 'R02', 'R10a', 'R10b'];
  if (!same(g.propositions, props)) {
    g.propositions = props;
    log.push(`${GOALS}: propositions -> ${props.join(', ')}`);
  }
  const old = sl(GOALS, 'R10');
  if (old) {
    const i = g.searchLog.indexOf(old);
    g.searchLog.splice(
      i,
      1,
      {
        proposition: 'R10a',
        searched:
          "Seed texts read: the Edge 'Myth of AI' responses (2014), Pinker 2015 and 2018, Hawkins 2015, Zador and LeCun 2019, Andreessen 2023; contesting: Omohundro 2008, Bostrom 2012, Bengio 2024. No arXiv search was run, since the proposition has no usual name; arXiv results of the R01 and R02 searches were checked for texts arguing benevolence, and none was found among their abstracts. Split from the R10 entry on 2026-10-29, when R10 was divided into R10a and R10b.",
        earliestNote:
          "Pinker's Edge response of 2014 is the earliest located among texts found; the Edge responses carry no dates of their own. The search did not reach earlier texts in 2000–2014 stating the proposition; the dataset's Yudkowsky records contesting Y02 from November 2000 show that the benevolence claim was argued on the SL4 list before then, in messages not recorded here. Earliest contesting located: Omohundro (2008).",
      },
      {
        proposition: 'R10b',
        searched:
          "Seed texts read: the Edge 'Myth of AI' responses (2014), Pinker 2015, Zador and LeCun 2019, the 2019 thread (recorded by the debates group), Andreessen 2023, Belrose and Pope 2023; contesting: Bengio's comments in the 2019 thread, Russell 2019. LeCun's 'A Path Towards Autonomous Machine Intelligence' (2022) was not retrievable. No arXiv search was run, since the proposition has no usual name; arXiv results of the R01 and R02 searches were checked for texts arguing controllability, and none was found among their abstracts. Split from the R10 entry on 2026-10-29, when R10 was divided into R10a and R10b.",
        earliestNote:
          "Kelly's Edge response of 2014 is the earliest located among texts found; the Edge responses carry no dates of their own. Earliest contesting located: Bengio's comments in the 2019 thread (LessWrong copy of 4 October 2019).",
      },
    );
    log.push(`${GOALS}: searchLog R10 split into R10a and R10b`);
  }
}
edit(
  sl(GOALS, 'R01'),
  'earliestNote',
  'they precede Bostrom 2012 and are linked, not re-recorded.',
  "they precede Bostrom 2012 and are linked, not re-recorded. Earliest contesting located: Goertzel (November 2015), found by the same-family audit among the pack's sources; Brooks (September 2017) was the earliest found by the group's own search. Pinker (2018) is recorded on R06 and R10a instead.",
  'searchLog R01',
);
edit(
  sl(TAKE, 'R05'),
  'earliestNote',
  "Bostrom (2003) is the earliest text found within 2000–2026 outside the dataset that meets the criterion (a transition from roughly human-level AI to superintelligence 'perhaps a matter of days rather than years').",
  "Bostrom (2003) meets the criterion (a transition from roughly human-level AI to superintelligence 'perhaps a matter of days rather than years') but is read only in an undated revised copy, so it does not hold the earliest-located role. Yudkowsky (20 October 2017) holds it, and meets the criterion only through the name “foom”, not through a stated period. Chalmers (2010) and Muehlhauser and Salamon (2012) are recorded as bearing on it, since neither states a period of hours to months.",
  'searchLog R05',
);
{
  const s = sl(MIS, 'R06');
  edit(
    s,
    'earliestNote',
    "Yudkowsky's transcript of December 2016 (talk of May 2016) is the earliest located text in this search that states",
    "Russell's Edge response of 2014 (Of Myths and Moonshine), found by the same-family audit among the pack's sources, is the earliest located text that meets the criterion. Yudkowsky's transcript of December 2016 (talk of May 2016) was the earliest found by this group's own search that states",
    'searchLog R06',
  );
  edit(
    s,
    'earliestNote',
    "Davis's review of October 2014 is the earliest located contesting text.",
    "Davis's review of October 2014 is the earliest located contesting text. Leike (2022) is recorded as bearing on the proposition after the same-family audit; Pinker (2018) was moved here from R01.",
    'searchLog R06',
  );
}
edit(
  sl(CAT, 'R07'),
  'earliestNote',
  'The arXiv search returned nothing earlier than 2014 on these terms.',
  "The arXiv search returned nothing earlier than 2014 on these terms. Earliest contesting located: Pinker's Edge response of 2014, found by the same-family audit among the pack's sources, ahead of Hawkins (2 March 2015); Ng (7 June 2023) was the earliest found by the group's own search.",
  'searchLog R07',
);
edit(
  sl(CAT, 'R08'),
  'earliestNote',
  'Earliest contesting located: Sotos (August 2021).',
  "Earliest contesting located: Pinker's Edge response of 2014, found by the same-family audit among the pack's sources; Hawkins (2 March 2015) and the 2019 thread are also earlier than Sotos (August 2021), the earliest found by the group's own search.",
  'searchLog R08',
);
edit(
  sl(CAT, 'R09'),
  'earliestNote',
  'without a catastrophe-scale claim and was therefore not recorded.',
  "without a catastrophe-scale claim and was therefore not recorded. Earliest contesting located: Pinker's Edge response of 2014 (paraphrased), found by the same-family audit among the pack's sources; the RAND red-team study (2024) is recorded as bearing on the proposition, since it reports no measurable uplift from the models tested without disputing the proposition.",
  'searchLog R09',
);
edit(
  sl(CAT, 'R11'),
  'earliestNote',
  'Earliest contesting located: Dafoe and Russell (November 2016).',
  "Earliest contesting located: Russell's Edge response of 2014, which answers Brooks, found by the same-family audit among the pack's sources; Dafoe and Russell (November 2016) was the earliest found by the group's own search.",
  'searchLog R11',
);
edit(
  sl(CAT, 'R12'),
  'earliestNote',
  'is the earliest text found, but only its standfirst could be read, so the record is labelled a relay.',
  "is the earliest text found, but only the journal's standfirst could be read, so it is recorded as context (a relay) without a role. Zador's comment in the 2019 thread is recorded as context, since it names no documented present harms of AI systems.",
  'searchLog R12',
);
edit(
  sl(TAKE, 'R13'),
  'earliestNote',
  'but not about the limits of current approaches and were recorded on R05 or R16 instead.',
  'but not about the limits of current approaches and were recorded on R05 or R16 instead. Earliest contesting located: Gwern, The Scaling Hypothesis (page dated 2020-05-28 to 2022-01-02; wording attested from 2022-01-02).',
  'searchLog R13',
);
edit(
  sl(MIS, 'R14'),
  'earliestNote',
  'since the paper that names it could not be retrieved.',
  'since the paper that names it could not be retrieved. Browning and LeCun (2022) and Kambhampati et al. (2024) are recorded as bearing on the proposition after the same-family audit.',
  'searchLog R14',
);
// Omissions and retrieval failures that the records contradict.
const THREAD_COPY =
  'the debates group retrieved the LessWrong post through the LessWrong GraphQL API (source pace-2019-instrumental-convergence-debate) and records the thread (debate facebook-2019-instrumental-convergence)';
{
  const o = entry(GOALS, 'omissions', (x) =>
    x.item.startsWith('Facebook discussion on instrumental convergence'),
  );
  edit(
    o,
    'reason',
    'Both copies returned HTTP 403 and the GreaterWrong mirror reset the connection; the original Facebook thread is outside the scope (posts on Facebook are used only in a retrievable verbatim copy). Not recorded; no debate entry made for it.',
    `Not retrieved by this group: both copies returned HTTP 403 and the GreaterWrong mirror reset the connection. Recorded instead from the LessWrong copy: ${THREAD_COPY}. The original Facebook thread is outside the scope and was not compared.`,
    'omission (goals): 2019 thread',
  );
  for (const rf of (drafts[GOALS].retrievalFailures ?? []).filter((x) =>
    x.url.includes('WxW6Gc6f2z3mzmqKs'),
  ))
    edit(
      rf,
      'fallback',
      'none',
      `none by this group; ${THREAD_COPY}`,
      `retrieval failure (goals): ${rf.url}`,
    );
  const q = entry(GOALS, 'openQuestions', (x) =>
    x.question.startsWith('The Facebook discussion of October 2019'),
  );
  edit(
    q,
    'recommended',
    'with replies among LeCun, Russell, Bengio and Zador.',
    `with replies among LeCun, Russell, Bengio and Zador. Done on 2026-10-29: ${THREAD_COPY}.`,
    'open question (goals): 2019 thread',
  );
}
edit(
  entry(MIS, 'omissions', (x) =>
    x.item.startsWith('LeCun, A Path Towards Autonomous Machine Intelligence'),
  ),
  'reason',
  'Retrieved by the goals-and-drives group; its passages on autoregressive LLMs could bear on R14 but were left to that group to avoid a second source entry.',
  'Not retrieved: OpenReview returned HTTP 403 to the goals-and-drives group (see its retrieval failures), and the cached response is the error page; its passages on autoregressive LLMs, which could bear on R14, were not read.',
  'omission (misalignment): LeCun 2022',
);
edit(
  entry(OPEN, 'omissions', (x) =>
    x.item.startsWith('Ng, letters in The Batch'),
  ),
  'reason',
  'Only press reports of the 2023 remarks were found; the July 2024 letter is recorded instead.',
  'The letters of 7 June and 25 October 2023 on extinction-risk claims are recorded by the catastrophe-and-priorities group (R07, R11). On open models this group found no 2023 letter beyond press reports of his remarks, and records the July 2024 letter instead.',
  'omission (openness): Ng letters',
);
// Open questions overtaken by the changes of 2026-10-29.
edit(
  entry(GOALS, 'openQuestions', (x) =>
    x.question.startsWith('R10 earliest located rests on page order'),
  ),
  'recommended',
  'or drop the role and mark both 2014 responses as articulations with a note.',
  "or drop the role and mark both 2014 responses as articulations with a note. Overtaken on 2026-10-29: after the split, Pinker's response is recorded on R10a and Kelly's on R10b, so page order no longer decides an earliest-located role.",
  'open question (goals): page order',
);
{
  const q = entry(GOALS, 'openQuestions', (x) =>
    x.question.startsWith('Pinker 2014 and Zador and LeCun 2019 state'),
  );
  edit(
    q,
    'question',
    'while arguing R10.',
    'while arguing R10a.',
    'open question (goals): R01',
  );
  edit(
    q,
    'recommended',
    'each R10 record',
    'each R10a record',
    'open question (goals): R01',
  );
}
edit(
  entry(TAKE, 'openQuestions', (x) =>
    x.question.startsWith('The R13 criterion joins'),
  ),
  'recommended',
  'or reword the criterion so that the second clause is a consequence rather than a requirement.',
  'or reword the criterion so that the second clause is a consequence rather than a requirement. Resolved on 2026-10-29: the consequence clause was removed from the R13 criterion.',
  'open question (takeoff): R13 criterion',
);
edit(
  entry(TAKE, 'openQuestions', (x) =>
    x.question.startsWith('This pass re-fetched arXiv 2310.17688v1'),
  ),
  'recommended',
  'if it used a different expression under that key.',
  'if it used a different expression under that key. Checked 2026-10-29: both cache files hold the same bytes (SHA-256 d6ec9c8b…), and the two source entries are merged into bengio-2023-managing-ai-risks.',
  'open question (takeoff): Bengio cache',
);
{
  const r = findRec(
    'rd-r08-lecun-2019-instrumental-convergence-thread-contests',
  );
  if (r)
    edit(
      r.r.engagement,
      'rationale',
      'in his other comments on R02 and R10.',
      'in his other comments on R02 and R10b.',
      `${r.r.id} engagement`,
    );
}

// ---------------------------------------------------------------------------
// 9. One record per text, proposition and stance.
{
  const groups = new Map();
  for (const x of allRecs()) {
    const k = `${x.r.document}|${x.r.proposition}|${x.r.predicate}`;
    groups.set(k, [...(groups.get(k) ?? []), x]);
  }
  for (const list of groups.values()) {
    if (list.length < 2) continue;
    const keep =
      list.find((x) => x.r.roles.includes('earliest-located')) ?? list[0];
    for (const x of list) {
      if (x === keep) continue;
      for (const e of x.r.evidence)
        if (!keep.r.evidence.some((k) => k.passage === e.passage))
          keep.r.evidence.push(e);
      keep.r.roles = [...new Set([...keep.r.roles, ...x.r.roles])];
      if (keep.r.roles.includes('earliest-located'))
        keep.r.roles = keep.r.roles.filter((y) => y !== 'later-restatement');
      if (x.r.statement.length > keep.r.statement.length)
        keep.r.statement = x.r.statement;
      const arr = drafts[x.f].records;
      arr.splice(arr.indexOf(x.r), 1);
      log.push(`${x.f}: ${x.r.id} merged into ${keep.r.id} (${keep.f})`);
    }
  }
}

for (const f of files)
  writeFileSync(join(DIR, f), JSON.stringify(drafts[f], null, 2) + '\n');
console.log(log.length ? log.join('\n') : 'no changes');
