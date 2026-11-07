// Applies the adjudication of the cross-family check (cross-family-check-2026-11-02.json,
// OpenAI Codex, checked 2026-11-03) to the drafts, and marks what the check touched:
// corrected records and events, the held disagreements (both readings) and the headlines
// for which the checker located an earlier text that has no pack record yet. Every change
// asserts that it changes something. Run once, after reconcile.mjs and audit-fixes.mjs:
//   node research/ai-money/adjudication/apply-2026-11-03.mjs
// then tools.mjs merge, verify and render. The log goes to adjudication/applied-2026-11-03.json.
import { readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const DIR = join(dirname(fileURLToPath(import.meta.url)), '..');
const DRAFTS = join(DIR, 'drafts');
const drafts = readdirSync(DRAFTS)
  .filter((f) => f.endsWith('.json'))
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
const label = (x) => x.id ?? x.key;
const put = (x, field, value, items) => {
  if (JSON.stringify(x[field]) === JSON.stringify(value))
    throw new Error(`no change: ${label(x)}.${field}`);
  log.push({ id: label(x), field, from: x[field] ?? null, to: value, items });
  x[field] = value;
};
const swap = (x, field, a, b, items) => {
  if (!String(x[field] ?? '').includes(a))
    throw new Error(`not found in ${label(x)}.${field}: ${a.slice(0, 60)}`);
  put(x, field, x[field].replace(a, b), items);
};
const mark = (x, items, result, extra = {}) =>
  put(x, 'crossFamily', { items, result, ...extra }, items);
// Re-code a record as bears on (context) under a context id; unmerged ids may change
// before admission, with the reason recorded (editorial policy, review states).
const toContext = (x, newId, missing, items) => {
  put(x, 'id', newId, items);
  put(x, 'predicate', 'bears_on_proposition', items);
  put(x, 'roles', ['context'], items);
  if (x.engagement) put(x, 'engagement', null, items);
  put(x, 'missing', missing, items);
  for (const e of x.evidence)
    if (e.support !== 'context') {
      log.push({
        id: newId,
        field: 'evidence.support',
        from: e.support,
        to: 'context',
        items,
      });
      e.support = 'context';
    }
};

// ---------- Agreed corrections ----------

// B52: the ESRB ASC report says it is "almost surely necessary to consider significant
// reforms"; the statement had strengthened that to "significant reforms are necessary".
let r = find('records', 'am-u12-esrb-2025-asc-ai-contests');
swap(
  r,
  'statement',
  'but that significant reforms are almost surely necessary',
  'but that it is almost surely necessary to consider significant reforms',
  ['B52'],
);
swap(
  r,
  'qualification',
  'the record holds their statements that the current framework needs significant reform.',
  'the record holds their statements that significant reforms need to be considered and that some AI risks may require changes beyond the current prudential framework.',
  ['B52'],
);
mark(
  r,
  ['B52'],
  'corrected: modality restored ("necessary to consider significant reforms"). Stance agreed: contests, with the authors’ statement that existing tools are likely sufficient kept as evidence.',
);

// B67: the section heading at PDF p. 17 is "3.2.4 Artificial intelligence and the digital
// euro"; "AI-powered wallets for smarter, more efficient transactions" is the margin caption.
r = find('records', 'am-u07-ecb-2025-de-ip-outcome-report');
swap(
  r.evidence[0],
  'locator',
  'section 3.2.4 “AI-powered wallets for smarter, more efficient transactions”',
  'section 3.2.4 “Artificial intelligence and the digital euro” (margin caption “AI-powered wallets for smarter, more efficient transactions”)',
  ['B67'],
);
mark(
  r,
  ['B67', 'A1.7'],
  'corrected: section heading in the locator. Relay classification agreed. Whether a relay is eligible for an earliest-located role is held with U07 (see the Waller record).',
);

// B71: Machado speaks of individual banks' dependencies; no system-wide channel is stated.
r = find('records', 'am-u02-ssm-2026-machado-ai-governance');
toContext(
  r,
  'am-u02-ssm-2026-machado-ai-governance-context',
  'The speech states that generative AI is sourced from a few major providers and that this raises supervisory concerns about concentration risk for banks; it does not state that many firms’ common dependence could make one provider’s failure or disruption affect many firms at once, or the financial system.',
  ['B71'],
);
swap(
  r,
  'qualification',
  'The speech addresses risks to individual banks from a supervisory perspective;',
  'The speech addresses risks to individual banks from a supervisory perspective; its one mention of systemic scale concerns AI usage, not provider dependence. Recorded as context after the cross-family check (B71);',
  ['B71'],
);
mark(
  r,
  ['B71'],
  'corrected: articulates to bears on (context), as the checker found; quotations agreed. Former id am-u02-ssm-2026-machado-ai-governance.',
);

// B77: the qualification's "it uses the term together with AI" had no clear subject.
r = find('records', 'am-u09-fsb-2017-ai-ml');
swap(
  r,
  'qualification',
  'without reference to AI; it uses the term together with AI; the earliest located use of the name in the pack is the June 2017 FSB report.',
  'without reference to AI. This November 2017 report uses the term together with AI. The earliest located use of the name in the pack is the June 2017 FSB report.',
  ['B77'],
);
mark(r, ['B77'], 'corrected: qualification wording. Stance agreed.');

// B78, B93, B103: the texts state work under way; "announced" is the pack's coarse stage
// for work not stated as done. The stage vocabulary is a decision for the maintainer.
const ONGOING =
  ' The text states the work as under way at its date; the stage "announced" is the pack’s coarse label for work not stated as done (cross-family check; stage vocabulary held for the maintainer). No start or completion date is stated.';
for (const [id, items] of [
  ['am-event-fsb-2017-ai-ml-monitoring', ['B78']],
  ['am-event-fsb-2024-ai-report-update', ['B93']],
  ['am-event-fsb-2026-frontier-ai-cyber-work', ['B103']],
]) {
  const e = find('events', id);
  put(e, 'qualification', e.qualification + ONGOING, items);
  mark(
    e,
    items,
    'corrected: qualification states that the work is under way. Text, date and kind agreed; the stage vocabulary (announced or a stated-ongoing stage) is held for the maintainer.',
  );
}

// A2.46: the FSI Insights 63 passages call for guidance in specific areas and for direct
// oversight of providers; neither disputes broad coverage of firms' AI use by existing rules.
r = find('records', 'am-u12-fsi-2024-insights-63-contests');
toContext(
  r,
  'am-u12-fsi-2024-insights-63-context',
  'The passages say that guidance may be needed in specific areas and that provider concentration strengthens the case for direct oversight of cloud and AI service providers; they do not dispute that existing rules broadly cover financial institutions’ use of AI, and the same summary states that they do (see the articulating record).',
  ['A2.46'],
);
swap(
  r,
  'statement',
  'FSI Insights No 63 of December 2024, by Crisanto, Leuterio, Prenio and Yong, states that',
  'FSI Insights No 63 of December 2024, by Crisanto, Leuterio, Prenio and Yong, also states that',
  ['A2.46'],
);
swap(
  r,
  'qualification',
  'A partial contest within a text that also articulates U12;',
  'Recorded as context after the cross-family check (A2.46): further guidance and the oversight of providers coexist with broad coverage. The text also articulates U12;',
  ['A2.46'],
);
mark(
  r,
  ['A2.46'],
  'corrected: contests to bears on (context), as the checker found. Former id am-u12-fsi-2024-insights-63-contests.',
);
r = find('records', 'am-u12-fsi-2024-insights-63');
swap(
  r,
  'qualification',
  'the same text also contests U12 in part (see the contesting record).',
  'the same summary says that guidance may be needed in specific areas (see the context record am-u12-fsi-2024-insights-63-context).',
  ['A2.46'],
);
mark(
  r,
  ['A2.46'],
  'qualification updated: the companion record is now context, not contesting.',
);

// A2.25: the ellipsis in the FSB 2024 quotation stands for the PDF page break only. A
// continuous quotation does not match the cached text, which carries the printed page
// number ("1") at the break, so the ellipsis stays and the note says what it replaces.
r = find('records', 'am-u04-fsb-2024-ai');
put(
  r.evidence[0],
  'note',
  'The ellipsis marks the page break between PDF pp. 5 and 6 and the printed page number there; no words of the sentence are omitted (cross-family check, A2.25).',
  ['A2.25'],
);
mark(
  r,
  ['A2.25'],
  'corrected: the evidence note says the ellipsis omits no words. Classification agreed.',
);

// A2.30: the selected FSB 2026 sentences (technology-neutral approaches; non-binding sound
// practices) do not state that existing regulatory frameworks broadly cover AI. The report
// speaks of firms adapting their own existing frameworks (PDF pp. 6, 37), not of the
// sufficiency of financial regulation. No explicit coverage passage was found on rereading.
r = find('records', 'am-u12-fsb-2026-ai-sound-practices');
toContext(
  r,
  'am-u12-fsb-2026-ai-sound-practices-context',
  'The passages state technology-neutral, proportionate approaches and that the sound practices are non-binding; they do not state that existing financial regulatory and supervisory frameworks broadly cover AI. Where the report speaks of existing frameworks (PDF pp. 6 and 37), it means financial institutions’ own risk frameworks, which they adapt to AI.',
  ['A2.30'],
);
swap(
  r,
  'qualification',
  'The report also notes',
  'Recorded as context after the cross-family check (A2.30). The report also notes',
  ['A2.30'],
);
mark(
  r,
  ['A2.30'],
  'corrected: articulates (later restatement) to bears on (context), as the checker found. Former id am-u12-fsb-2026-ai-sound-practices.',
);

// B104: the release phases the expectations; the qualification now says how.
let ev = find('events', 'am-event-mas-2026-ai-risk-management-guidelines');
put(
  ev,
  'evidence',
  [
    ...ev.evidence,
    {
      source: 'mas-2026-airm-final-release',
      locator: 'Paragraph 5, second sentence',
      passage:
        'FIs may implement the Guidelines in phases: they should meet the expectations set out in Sections 3 to 4 from 07 October 2027, and Sections 5 and 6 by 07 October 2028.',
      passageType: 'quote',
      sourceRole: 'primary',
      support: 'supports',
      note: null,
    },
  ],
  ['B104'],
);
swap(
  ev,
  'qualification',
  'the guidelines take effect on 7 October 2027 with phased expectations to 2028, so no compliance is implied.',
  'the guidelines take effect on 7 October 2027, and the release phases the expectations: Sections 3 to 4 from 7 October 2027, Sections 5 and 6 by 7 October 2028. No compliance is implied.',
  ['B104'],
);
mark(
  ev,
  ['B104'],
  'corrected: the phasing sentence is quoted and the qualification states it. Issuance and commencement date agreed.',
);

// B96: the checker's request for the press-release PDF returned a human-verification page
// (HTTP 200); it checked the RBI's HTML release instead. Re-fetched here on 2026-11-03, the
// PDF returned the same bytes as on 2026-11-02 (SHA-256 8765ee95…). The source keeps the PDF
// and records the HTML release as the checker's copy.
const src = find('sources', 'rbi-2025-free-ai-press');
put(
  src,
  'alternateCopy',
  {
    url: 'https://www.rbi.org.in/Scripts/BS_PressReleaseDisplay.aspx?prid=61018',
    note: 'RBI HTML press release dated Aug 13, 2025, read by the cross-family check on 2026-11-03 after the PDF address returned a human-verification page to it; the PDF re-fetched here on 2026-11-03 matched the recorded SHA-256.',
  },
  ['B96'],
);
ev = find('events', 'am-event-rbi-2025-free-ai-report');
mark(
  ev,
  ['B96'],
  'agreed: text, date and stage confirmed in the RBI HTML release (prid=61018); the source records it as an alternate copy. The second passage is a paraphrase, as the pack marks it.',
);

// ---------- Held for the maintainer (both readings; no change of stance or role) ----------

r = find('records', 'am-u07-frb-2025-waller-sibos');
mark(
  r,
  ['A1.7', 'A2.42'],
  'held: earliest-located role on a criterion boundary.',
  {
    headline:
      'Held. The checker reads Waller (29 September 2025) as bears on: agents "executing tasks" in a payments-efficiency passage do not state that agents initiate, negotiate or execute payments. If so, the next articulation is the ECB outcome report (September 2025, a relay of workshop participants) if relays are eligible, otherwise BIS Working Paper 1310 (10 November 2025, staff).',
    readings: {
      checker:
        'bears on (A2.42); the role needs reconsidering, and whether a relay is eligible for earliest located is not stated in the brief or scope note.',
      preparer:
        'articulates: the tasks are named as a way AI agents improve the efficiency of payments, on behalf of a person or company. On rereading, the checker’s narrower reading fits the criterion’s wording ("payments and transactions") better; the preparing family may not overrule the checker on a headline in either direction, so the role stays until the maintainer decides.',
    },
  },
);

r = find('records', 'am-u08-bis-2025-aer-ch3');
swap(
  r,
  'missing',
  "the passage does not state that agents' transactions use, require or favour tokenised money or stablecoins.",
  "the passage does not state that agents' transactions use, require or favour tokenised money or stablecoins (first limb). On the second limb, the agents act in compliance reporting (Box B describes them as copilots for suspicious-activity reports), not in a way the text says matters for the monetary system.",
  ['A1.8'],
);
mark(r, ['A1.8'], 'held: criterion boundary on the second limb of U08.', {
  headline:
    'Held. The checker reads this passage as an articulation of U08’s second limb (AI interacting with tokenised money), which would make it the earliest located text for U08; the pack records no articulation.',
  readings: {
    checker:
      'articulates the second limb: AI agents are embedded in payment instructions and compliance reporting on a tokenised correspondent-banking platform, in a chapter on the next-generation monetary system; no need for stablecoins is stated.',
    preparer:
      'bears on: the agents do compliance work on a tokenised platform; the passage does not say that this interaction matters for the monetary system. The preparer’s missing element, which had addressed only the first limb, now addresses both.',
  },
});

r = find('records', 'am-u05-boe-2017-swp674-ml-central-banks');
mark(
  r,
  ['A1.5'],
  'held: earlier text located by the checker outside the named bodies.',
  {
    headline:
      'Held. The checker located Hlaváček, Koňák and Čada, Czech National Bank Working Paper 11/2005 (December 2005, staff), whose official abstract reports better neural-network forecasts of currency in circulation for liquidity forecasting; the paper itself was not read. The Czech National Bank is not among the bodies the scope names. A Bank of Canada working paper of January 1999 is a lead only (empty responses). No pack record of either.',
  },
);

r = find('records', 'am-u06-boe-2018-carney-future-of-work');
mark(
  r,
  ['A1.6'],
  'earlier text located by the checker; agreed; record to draft.',
  {
    headline:
      'Earlier text agreed, record to draft. Haldane (Bank of England), "Labour’s Share", speech of 12 November 2015 (views not necessarily the Bank’s or the MPC’s): AI and smarter machines (PDF p. 14) feed the labour-share discussion, and he asks what these trends imply "for the economy and monetary policy" (p. 16), then links machine substitution to wages and the MPC’s inflation projections (p. 17). Read by the adjudicator on 2026-11-03; it meets U06 on the standard applied to Carney (AI one part of a wider technological change). Until a record is drafted and checked, Carney keeps the role in this pack. Wilkins (Bank of Canada, 18 April 2017) is later and outside the named bodies.',
  },
);

r = find('records', 'am-u09-fsb-2017-fintech-fs');
mark(
  r,
  ['A1.9'],
  'held: earlier text located by the checker in a body whose inclusion is open question 10.',
  {
    headline:
      'Held. The checker located Bauguess (SEC, Deputy Director and Deputy Chief Economist, DERA), "Has Big Data Made Us Lazy?", speech of 21 October 2016 (own views), on machine learning for market-risk assessment and to direct examination and investigative staff; and his speech of 21 June 2017. Both precede this record. The FSB report stays the earliest located institutional text and the earliest located use of "SupTech". Whether securities regulators other than IOSCO are in scope is open question 10.',
  },
);

r = find('records', 'am-u12-boe-2022-dp5-22');
mark(
  r,
  ['A1.12', 'R4'],
  'earlier institutional text located by the checker; agreed; record to draft.',
  {
    headline:
      'Earlier institutional text agreed, record to draft. De Nederlandsche Bank, "General principles for the use of Artificial Intelligence in the financial sector" (discussion paper, published 25 July 2019 per DNB’s release; presented as DNB’s preliminary views, author named), section 4, p. 33: "many of the prerequisites for a responsible application of AI are already covered by existing regulations". Read by the checker; dnb.nl refused this environment. DNB is a Eurosystem central bank, within scope. Until a record is drafted, DP5/22 stays the derived institutional comparator.',
  },
);

// ---------- Write ----------
for (const { f, d } of drafts)
  writeFileSync(join(DRAFTS, f), JSON.stringify(d, null, 2) + '\n');
writeFileSync(
  join(DIR, 'adjudication', 'applied-2026-11-03.json'),
  JSON.stringify(log, null, 2) + '\n',
);
console.log(`${log.length} changes applied`);
