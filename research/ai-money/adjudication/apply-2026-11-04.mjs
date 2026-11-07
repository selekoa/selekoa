// Applies the adjudication of the second cross-family check (Codex, 2026-11-04;
// research/ai-money/cross-family-check-2026-11-04.md and .json) to the drafts, and records the
// maintainer's answer of 2026-11-04 on the follow-up pass's open question 1 (BaFin). Every
// change asserts that it changes something, so the script runs once, after
// pre2016-2026-11-04.mjs:
//   node research/ai-money/adjudication/apply-2026-11-04.mjs
// then tools.mjs merge, verify and render. The log goes to adjudication/applied-2026-11-04.json.
// Rule: the preparing family may not overrule the checker on an earliest-located role or a
// headline. Item A1.3 (U07, BIS Working Paper 1194) is such a case and is held with both
// readings; no role moves on it here.
import { readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const DIR = join(dirname(fileURLToPath(import.meta.url)), '..');
const DRAFTS = join(DIR, 'drafts');
const drafts = readdirSync(DRAFTS)
  .filter((f) => f.endsWith('.json'))
  .sort()
  .map((f) => ({ f, d: JSON.parse(readFileSync(join(DRAFTS, f), 'utf8')) }));
const followUp = drafts.find(({ f }) => f === 'follow-up.json').d;
const log = [];
const C = '2026-11-04'; // the second check's item labels are prefixed with its date

const find = (kind, id) => {
  const hits = drafts.flatMap(({ d }) =>
    (d[kind] ?? []).filter((x) => (x.id ?? x.key) === id),
  );
  if (hits.length !== 1) throw new Error(`${kind} ${id}: ${hits.length} found`);
  return hits[0];
};
const findBy = (kind, test, label) => {
  const hits = drafts.flatMap(({ d }) => (d[kind] ?? []).filter(test));
  if (hits.length !== 1)
    throw new Error(`${kind} ${label}: ${hits.length} found`);
  return hits[0];
};
const put = (x, field, value, item) => {
  if (JSON.stringify(x[field]) === JSON.stringify(value))
    throw new Error(
      `no change: ${x.id ?? x.key ?? x.item ?? x.question}.${field}`,
    );
  log.push({
    id: x.id ?? x.key ?? (x.item ?? x.question).slice(0, 60),
    field,
    from: x[field] ?? null,
    to: value,
    item,
  });
  x[field] = value;
};
const swap = (x, field, a, b, item) => {
  if (!String(x[field] ?? '').includes(a))
    throw new Error(
      `not found in ${x.id ?? x.key}.${field}: ${a.slice(0, 60)}`,
    );
  put(x, field, x[field].replace(a, b), item);
};
const add = (kind, x, item) => {
  followUp[kind].push(x);
  log.push({ id: x.id ?? x.key, field: `${kind}[+]`, from: null, to: x, item });
};
// Agreed: the record or event keeps its content; its mark states the second check's result.
const agreed = (kind, id, items, result) => {
  const x = find(kind, id);
  put(
    x,
    'crossFamily',
    {
      ...x.crossFamily,
      items: [
        ...(x.crossFamily?.items ?? []),
        ...items.map((i) => `${C} ${i}`),
      ],
      result: `${x.crossFamily ? `${x.crossFamily.result.replace(/ Not checked by the other family before; in the short check of 2026-11-04\.$/, '').replace(/; in the short check of 2026-11-04\.$/, '.')} ` : ''}Second check (2026-11-04): ${result}`,
    },
    items.join(', '),
  );
  return x;
};

// ---------- U07: held under the override rule (A1.3) ----------
let r = find('records', 'am-u07-bis-wp-1194');
put(
  r,
  'crossFamily',
  {
    items: [`${C} A1.3`],
    result:
      'held for the maintainer under the override rule (earliest-located role). The checker reads this paper as U07’s earliest located text; the preparer reads bears on. The record stays context and BIS Working Paper 1310 keeps the role until the maintainer decides.',
    readings: {
      checker:
        'articulates, qualified, at whole-document level: Table 1 (PDF p. 14) puts “faster payment flows” under the opportunities of AI agents in payments, and the text (PDF pp. 15–16) says that AI agents “could soon autonomously design, market, and sell financial products and services”; together these meet the transactions limb. The checker adds that the table alone is insufficient and that, if the criterion requires an explicit statement that agents initiate payments, the paper bears on U07 and the role should be held.',
      preparer:
        'bears on: the selling sentence concerns AI agents in finance in general (it extends autonomous action “from trading to other parts of finance”), not payments, and states no change to how payments are made or to the demands on payment systems; the payments link is a table cell without explanation. WP 1310 (November 2025) states agent-run payment management directly.',
    },
  },
  'A1.3',
);

r = find('records', 'am-u07-bis-wp-1310');
put(
  r,
  'time',
  {
    ...r.time,
    note: 'Date printed on the title page (the cover gives November 2025): the date of the wording, used for the headline. The BIS page gives “Date Published 26 November 2025” (source bis-wp-1310-page); 10 November is not a verified release day.',
  },
  'A2.9',
);
put(
  r,
  'crossFamily',
  {
    items: [...r.crossFamily.items, `${C} A1.3`, `${C} A2.9`],
    result:
      'earliest-located role assigned under decisions 15a and 6a. Second check (2026-11-04): articulation, staff disclaimer and simulation limits agreed (A2.9); the date note now separates the title-page date from the BIS release date. The role is held for the maintainer on A1.3 (see am-u07-bis-wp-1194).',
    headline: `${r.crossFamily.headline} The second check (A1.3) proposes BIS Working Paper 1194 (June 2024) instead, on a whole-document reading; held for the maintainer under the override rule, both readings under am-u07-bis-wp-1194.`,
  },
  'A1.3, A2.9',
);
let doc = find('documents', 'bis-wp-1310');
swap(
  doc,
  'dateNote',
  'the title page gives 10 November 2025.',
  'the title page gives 10 November 2025, the date of the wording. The BIS page (source bis-wp-1310-page, read 2026-11-04) gives publication on 26 November 2025.',
  'A2.9',
);
add(
  'sources',
  {
    key: 'bis-wp-1310-page',
    cacheKey: 'bis-wp-1310-page',
    documentId: 'bis-wp-1310',
    title:
      'AI agents for cash management in payment systems (BIS Working Paper 1310, landing page)',
    publisher: 'Bank for International Settlements',
    url: 'https://www.bis.org/publications/working-paper-1310-ai-agents-cash-management-payment-systems',
    httpStatus: 200,
    sha256: 'ec1bbe94af9a24f450c87ea29e5541615a9dd1b3aa9496d0ed5333e75560c4ba',
    retrievedAt: '2026-11-04',
    language: 'en',
    documentWords: {
      count: 1545,
      basis: 'words of the cached text, counted 2026-11-04',
    },
    version:
      'HTML landing page as served on 2026-11-04 (“Date Published 26 November 2025”); the same bytes as the cross-family checker’s copy (item A2.9)',
    kind: 'webpage',
  },
  'A2.9',
);

// ---------- U12: RBI FREE-AI Committee, contests to bears on (A2.6, the checker's reading) ----------
r = find('records', 'am-u12-rbi-2025-free-ai-report-contests');
put(r, 'id', 'am-u12-rbi-2025-free-ai-report-context', 'A2.6');
put(r, 'predicate', 'bears_on_proposition', 'A2.6');
put(r, 'roles', ['context'], 'A2.6');
put(r, 'engagement', null, 'A2.6');
put(
  r,
  'missing',
  'The committee asks for incremental additions to existing regulations in named areas and for amendments “where existing regulations fail to adequately cover AI-specific risks”, and recommends a dedicated institutional framework (a standing committee and an AI-safety body) to assess risks, coordinate and issue standards and guidance. It does not state that existing frameworks broadly fail to cover AI or that a separate regulatory framework is needed.',
  'A2.6',
);
put(
  r,
  'qualification',
  'Second check (2026-11-04, A2.6), the checker’s reading agreed: the dedicated institutional framework of paragraph 4.4.33 is an institution for risk assessment, coordination and standard-setting, not a separate regulatory regime; with the incremental additions and conditional amendments (decision 18a) it does not contest broad coverage. The report also recommends guiding regulated entities on how existing regulations apply to AI. The committee’s text, not stated by the RBI to be its policy.',
  'A2.6',
);
for (const e of r.evidence) {
  if (e.support !== 'context') {
    log.push({
      id: r.id,
      field: 'evidence.support',
      from: e.support,
      to: 'context',
      item: 'A2.6',
    });
    e.support = 'context';
  }
  if (e.note === 'Supports the contesting stance.') {
    log.push({
      id: r.id,
      field: 'evidence.note',
      from: e.note,
      to: null,
      item: 'A2.6',
    });
    e.note = null;
  }
}
put(
  r,
  'crossFamily',
  {
    items: ['decision 18a', 'follow-up 2026-11-04', `${C} A2.6`],
    result:
      'contests to bears on (context), the checker’s reading (second check, A2.6), agreed by the preparer; no earliest-located role or headline is affected (U12’s earliest located contesting text stays PBoC 2019). Former id am-u12-rbi-2025-free-ai-report-contests.',
  },
  'A2.6',
);

// ---------- U12: Breeden 2026 stays bears on (A2.8) ----------
r = find('records', 'am-u12-boe-2026-breeden-agents-of-change-context');
put(
  r,
  'qualification',
  `${r.qualification} The cross-family checker (second check, A2.8) reads the passage as a qualified, prospective contest of continuing sufficiency for autonomous agents (frameworks not built for them; a human in the loop unlikely to be realistic), while noting that the pack’s distinction is reasonable and that the next sentence allows adapted governance frameworks. The record keeps that uncertainty.`,
  'A2.8',
);
put(
  r,
  'crossFamily',
  {
    items: [...r.crossFamily.items, `${C} A2.8`],
    result:
      're-read: contests to bears on (context). Former id am-u12-boe-2026-breeden-agents-of-change-contests. Second check (2026-11-04, A2.8): the checker’s blind answer is a qualified prospective contest; its comparison accepts the pack’s reading under decision 18a and asks that the uncertainty be kept, not that the classification be overridden. Kept as bears on, with the checker’s reading in the qualification; no earliest-located role or headline is affected.',
  },
  'A2.8',
);

// ---------- U12: IMF Departmental Paper 2021, credits (A2.11) ----------
r = agreed(
  'records',
  'am-u12-imf-2021-dp-ai-finance-context',
  ['A2.11'],
  'bears on agreed under decision 18a; the checker verified the passages in the official IMF PDF (Chapter 3, section F, printed p. 19, PDF p. 22). Authors corrected from the PDF cover, read here (the same bytes as the checker’s copy).',
);
swap(
  r,
  'statement',
  'Boukherouaa, AlAjmi, Deodoro, Farias and Ravikumar write',
  'Boukherouaa and Shabsigh, with AlAjmi, Deodoro, Farias, Iskender, Mirestean and Ravikumar, write',
  'A2.11',
);
doc = find('documents', 'imf-2021-dp-ai-finance');
put(
  doc,
  'authors',
  [
    'El Bachir Boukherouaa',
    'Ghiath Shabsigh',
    'Khaled AlAjmi',
    'Jose Deodoro',
    'Aquiles Farias',
    'Ebru S. Iskender',
    'Alin T. Mirestean',
    'Rangachary Ravikumar',
  ],
  'A2.11',
);
put(
  doc,
  'shortName',
  'IMF Departmental Paper 2021/024 (Boukherouaa, Shabsigh and others)',
  'A2.11',
);
put(
  doc,
  'dateNote',
  'Publication date given on the IMF eLibrary page. The PDF (source imf-2021-dp-ai-finance-pdf, read 2026-11-04, the same bytes as the cross-family checker’s copy) is dated October 2021; its cover reads “Prepared by El Bachir Boukherouaa and Ghiath Shabsigh in collaboration with” six others, listed here after them; the eLibrary list read earlier omitted Shabsigh, Iskender and Mirestean (second check, A2.11). The PDF carries the series disclaimer (p. 3); the eLibrary HTML expression carries none.',
  'A2.11',
);
put(
  doc,
  'disclaimer',
  {
    source: 'imf-2021-dp-ai-finance-pdf',
    locator: 'PDF p. 3, series note',
    passage:
      'The views expressed in this paper are those of the author(s) and do not necessarily represent the views of the IMF, its Executive Board, or IMF management.',
  },
  'A2.11',
);
add(
  'sources',
  {
    key: 'imf-2021-dp-ai-finance-pdf',
    cacheKey: 'imf-2021-dp-ai-finance-pdf',
    documentId: 'imf-2021-dp-ai-finance',
    title:
      'Powering the Digital Economy: Opportunities and Risks of Artificial Intelligence in Finance (DP/2021/024, PDF)',
    publisher: 'International Monetary Fund',
    url: 'https://www.imf.org/-/media/files/publications/dp/2021/english/pdeoraifea.pdf',
    httpStatus: 200,
    sha256: '1c331597155263949e804d936735ca13bfc0ca1f69b32c75b806eac70349dc71',
    retrievedAt: '2026-11-04',
    language: 'en',
    documentWords: {
      count: 13523,
      basis: 'words of the pdftotext output, counted 2026-11-04',
    },
    version:
      'PDF as served on 2026-11-04 to plain curl with its default user agent (`tools.mjs fetch`, with a browser user agent, receives HTTP 403; the cache entry was made by hand); the same SHA-256 as the cross-family checker’s copy (A2.11)',
    kind: 'paper',
  },
  'A2.11',
);

// ---------- U12: DNB 2019, publication day (A1.5, A2.16, B24, C28, C29) ----------
r = agreed(
  'records',
  'am-u12-dnb-2019-ai-principles',
  ['A1.5', 'A2.16', 'B24', 'C28', 'C29'],
  'institutional comparator and preliminary-view articulation agreed; publication day 25 July 2019 from DNB’s release, read by the checker and here; loopholes and possible AI-specific policy kept.',
);
put(
  r,
  'time',
  {
    ...r.time,
    date: '2019-07-25',
    note: 'Publication day from DNB’s release “DNB komt met richtlijnen voor gebruik kunstmatige intelligentie”, read here on 2026-11-04 (source dnb-2019-release: “Gepubliceerd: 25 juli 2019”, the paper “vandaag … gepubliceerde”), as the cross-family checker reported (second check, B24 and C29). The PDF prints ©2019.',
  },
  'B24, C29',
);
swap(
  r,
  'statement',
  'discussion paper of 2019',
  'discussion paper of 25 July 2019',
  'B24',
);
put(
  r,
  'qualification',
  `${r.qualification} The paper names an author, Joost van der Burgt (PDF p. 2), and presents DNB’s view; the English wording is not authenticated against a July 2019 capture.`,
  'B24',
);
put(
  r,
  'crossFamily',
  {
    ...r.crossFamily,
    headline: r.crossFamily.headline.replace(
      'this paper (2019)',
      'this paper (25 July 2019)',
    ),
  },
  'A1.5',
);
doc = find('documents', 'dnb-2019-ai-principles');
put(doc, 'date', '2019-07-25', 'B24, C29');
put(
  doc,
  'dateNote',
  'DNB’s release (source dnb-2019-release, read 2026-11-04) is dated 25 July 2019 and calls the paper published that day, as the cross-family checker reported (second check, B24 and C29). The PDF prints ©2019 and an author (Joost van der Burgt, PDF p. 2), and a comment deadline of 18 October 2019 (p. 5).',
  'B24, C29',
);
add(
  'sources',
  {
    key: 'dnb-2019-release',
    cacheKey: 'dnb-2019-release',
    documentId: 'dnb-2019-ai-principles',
    title: 'DNB komt met richtlijnen voor gebruik kunstmatige intelligentie',
    publisher: 'De Nederlandsche Bank',
    url: 'https://www.dnb.nl/algemeen-nieuws/nieuws-2019/dnb-komt-met-richtlijnen-voor-gebruik-kunstmatige-intelligentie/',
    httpStatus: 200,
    sha256: '8742de10f8f02b1b1ed2c50244bb3230af593d6adf5645ca86dc29e67660ebff',
    retrievedAt: '2026-11-04',
    language: 'nl',
    documentWords: {
      count: 2213,
      basis: 'words of the cached page text, counted 2026-11-04',
    },
    version:
      'HTML news release as served on 2026-11-04 to plain curl with its default user agent (`tools.mjs fetch`, with a browser user agent, receives HTTP 403; the cache entry was made by hand). Page markup differs per request, so the SHA-256 differs from the cross-family checker’s copy (C29)',
    kind: 'webpage',
  },
  'B24, C29',
);
let src = find('sources', 'dnb-2019-ai-principles');
put(
  src,
  'version',
  `${src.version} On 2026-11-04 the cross-family checker (curl, C28) and this environment (plain curl with its default user agent; a browser user agent receives HTTP 403) retrieved the same address with the same SHA-256.`,
  'C28',
);

// ---------- U12, U10, U04: Bundesbank–BaFin consultation (A2.15, A2.17, A2.19) ----------
agreed(
  'records',
  'am-u10-buba-2021-ml-risk-models-consultation',
  ['A2.15'],
  'articulation agreed; a consultation, no measured performance claim.',
);
agreed(
  'records',
  'am-u12-buba-2021-ml-risk-models-consultation',
  ['A2.17'],
  'articulation agreed (broad transferability of technology-neutral foundations, few possible adaptations).',
);
agreed(
  'records',
  'am-u04-buba-2021-ml-risk-models-consultation',
  ['A2.19'],
  'articulation agreed, with the model-performance trade-offs kept.',
);

// ---------- U05 ----------
r = agreed(
  'records',
  'am-u05-ecb-wp-352',
  ['A1.1', 'A2.14'],
  'earliest located text and articulation agreed (blind search A1.1 found the same paper; gains specific to index, country and period).',
);
put(
  r,
  'crossFamily',
  {
    ...r.crossFamily,
    headline: `${r.crossFamily.headline} Agreed by the second check’s blind search (A1.1). The checker also read the Bank of Canada working paper of January 1999 (a lead, decision 16a) and the Bank of England’s One Bank Research Agenda of February 2015 (C32), which is later than this paper.`,
  },
  'A1.1, C32, C33',
);
agreed(
  'records',
  'am-u05-nb-2026-bache-models',
  ['A2.7'],
  'articulation agreed; preliminary work, no adopted model.',
);

r = agreed(
  'records',
  'am-u05-dn-2019-text-ml-bankruptcy',
  ['A2.18', 'B25', 'C30'],
  'articulation agreed; the PDF, now read, credits two staff analysts and prints no views disclaimer, so the voice stays institution, qualified.',
);
put(
  r,
  'qualification',
  'Quoted from the Danish summary on the landing page; the PDF of the Analysis (No. 3, read 2026-11-04, the same bytes as the cross-family checker’s copy) states the same finding in its summary (“Det øger nøjagtigheden af de beregnede konkurssandsynligheder”). The PDF credits Anna Kirstine Hvid and Pia Mølgaard, Quantitative Risk Analysts, Financial Stability (p. 7), and prints no statement that the views are theirs alone: the voice is the Nationalbank’s analytical series, with staff credits, not a claim that the text is anonymous. The modelling serves the Nationalbank’s financial-stability analysis; the underlying working paper of November 2018 is a separate document, not recorded.',
  'B25, C30',
);
doc = find('documents', 'dn-2019-text-ml-bankruptcy');
put(
  doc,
  'dateNote',
  'Publication day printed on the PDF (21. januar 2019, nr. 3) and on the landing page; editorial close 18 January 2019 (PDF p. 7). The PDF (source dn-2019-text-ml-bankruptcy-pdf) credits Anna Kirstine Hvid and Pia Mølgaard, Quantitative Risk Analysts, Financial Stability (p. 7), and prints no staff-views disclaimer; the voice is kept as institution (the Nationalbank’s Analysis series), qualified (second check, B25 and C30).',
  'B25, C30',
);
add(
  'sources',
  {
    key: 'dn-2019-text-ml-bankruptcy-pdf',
    cacheKey: 'dn-2019-text-ml-bankruptcy-pdf',
    documentId: 'dn-2019-text-ml-bankruptcy',
    title:
      'Tekstbaseret machine learning forbedrer konkursmodellering (Analyse nr. 3, PDF)',
    publisher: 'Danmarks Nationalbank',
    url: 'https://www.nationalbanken.dk/media/wksfsbkg/analyse-nr-3-tekstbaseret-machine-learning-forbedrer-konkursmodellering.pdf',
    httpStatus: 200,
    sha256: 'c9522edff1ce7caa7d691c8d3b107b3381879f2d9203280a2165e14021586f66',
    retrievedAt: '2026-11-04',
    language: 'da',
    documentWords: {
      count: 2448,
      basis: 'words of the pdftotext output, counted 2026-11-04',
    },
    version:
      'PDF of the Analysis (seven pages) as served on 2026-11-04; located by the cross-family checker (C30); the same SHA-256 as its copy',
    kind: 'report',
  },
  'C30',
);
src = find('sources', 'dn-2019-text-ml-bankruptcy');
swap(
  src,
  'version',
  '; the PDF of the Analysis was not read',
  '; the PDF is source dn-2019-text-ml-bankruptcy-pdf',
  'C30',
);

// U05 institutional comparator: Bank of England, One Bank Research Agenda (C32), agreed, to draft.
r = find('records', 'am-u05-fsb-2017-ai-ml');
put(
  r,
  'crossFamily',
  {
    items: [`${C} C32`],
    result:
      'earliest located institutional text for U05 (derived) for now; an earlier institutional text, agreed, is to be drafted (C32).',
    headline:
      'Second check (C32): the checker read the Bank of England’s One Bank Research Agenda discussion paper (February 2015; launched 25 February 2015) in a March 2015 capture of the official address (web.archive.org; the official addresses now return 404) and finds that its Theme 4 (printed pp. 23–24, PDF pp. 24–25) meets U05 in the Bank’s voice: machine-learning analysis of textual information, including central-bank communications. Agreed. The record is to be drafted from the archived copy before admission part 2; this environment could not reach web.archive.org on 2026-11-04 (connection closed by the proxy). It would replace this report as the earliest located institutional text for U05; it does not displace ECB Working Paper 352 (April 2004).',
  },
  'C32',
);
add(
  'leads',
  {
    proposition: 'U05',
    item: 'Bank of England, “One Bank Research Agenda”, discussion paper, February 2015 (launched 25 February 2015), read by the cross-family checker in a capture of 19 March 2015 of https://www.bankofengland.co.uk/research/Documents/onebank/discussion.pdf (web.archive.org; SHA-256 a1963d08…15e2), Theme 4, printed pp. 23–24: “textual information has been quantified systematically using machine-learning algorithms”.',
    reason:
      'Agreed with the checker (second check, C32): it meets U05 in institution voice and would be U05’s earliest located institutional text. Not yet recorded: web.archive.org could not be reached from this environment on 2026-11-04, so the passage is not checked against a cached copy. To be drafted before admission part 2 (U05–U08). The checker’s caution stands: the adjacent Google-query nowcasting example is not stated to use machine learning.',
  },
  'C32',
);

// ---------- U06 ----------
agreed(
  'records',
  'am-u06-boe-2015-haldane-labours-share',
  ['A1.2', 'A2.12'],
  'earliest located text and qualified whole-text articulation agreed (blind search A1.2 found the same speech; a scenario, not a causal finding).',
);

r = agreed(
  'records',
  'am-u06-nb-2026-bech-moen-speech',
  ['A2.10', 'B26'],
  'articulation and delivery date agreed; the Norwegian speaking notes, located by the checker, are recorded as the original published expression and the English text as Norges Bank’s post-edited machine translation.',
);
put(
  r,
  'qualification',
  'The Norwegian speaking notes (“Talepunkter til presentasjonen”, published with the Norwegian page on 29 January 2026 at 16:00) are the original published expression; the English text, on the English page published on 2 February 2026, is a machine translation post-edited by Norges Bank, as it states, so its wording is not the delivered wording. Both are published notes, not a transcript of the delivered speech. The speech illustrates possibilities with model simulations and states no policy decision. No disclaimer is printed.',
  'A2.10, B26',
);
r.evidence.push({
  source: 'nb-2026-bech-moen-notes-no',
  locator:
    'PDF p. 8, plansje on the neutral real rate (Norwegian speaking notes)',
  passage:
    'I den grad KI løfter produktiviteten fremover – eller at aktørene i økonomien tror sterkt nok på at det vil skje – kan KI bidra til en oppgang i den nøytrale renten.',
  passageType: 'quote',
  sourceRole: 'primary',
  support: 'supports',
  note: 'The original Norwegian of the second English quotation.',
});
log.push({
  id: r.id,
  field: 'evidence[+]',
  from: null,
  to: r.evidence.at(-1),
  item: 'B26',
});
doc = find('documents', 'nb-2026-bech-moen-speech');
put(
  doc,
  'dateNote',
  `${doc.dateNote} The Norwegian page (published 29 January 2026, 16:00) links the Norwegian speaking notes (source nb-2026-bech-moen-notes-no), the original expression; the English notes are the post-edited translation (second check, A2.10 and B26).`,
  'A2.10, B26',
);
add(
  'sources',
  {
    key: 'nb-2026-bech-moen-notes-no',
    cacheKey: 'nb-2026-bech-moen-notes-no',
    documentId: 'nb-2026-bech-moen-speech',
    title:
      'Hvordan kan KI påvirke pengepolitikken? (talepunkter til presentasjonen)',
    publisher: 'Norges Bank',
    url: 'https://www.norges-bank.no/contentassets/93003c5a459f4961bad556a1c444a8e2/talepunkter_valutaseminaret2026-002.pdf?v=29012026160421',
    httpStatus: 200,
    sha256: '5e44d9fd01730542c551cc37afd38a154febcfe3d2c4171e19bed081aab23a5c',
    retrievedAt: '2026-11-04',
    language: 'no',
    documentWords: {
      count: 3305,
      basis: 'words of the pdftotext output, counted 2026-11-04',
    },
    version:
      'PDF of the Norwegian speaking notes, linked from the Norwegian page (https://www.norges-bank.no/aktuelt/nyheter/Foredrag-og-taler/2026/2026-01-29-ocbm/, “Publisert 29. januar 2026 16:00”); located by the cross-family checker (B26); the same SHA-256 as its copy',
    kind: 'speech',
  },
  'B26',
);

// ---------- U09 ----------
agreed(
  'records',
  'am-u09-bcbs-2000-wp4-early-warning',
  ['A1.4', 'A2.13', 'B27'],
  'earliest located text, staff voice, December 2000 wording date (landing page 27 December 2000) and expert-system meaning agreed; the locators (PDF pp. 19 and 45) verified. The checker’s own A1 locators were wrong (A1.4); no pack change.',
);

// ---------- Events ----------
agreed(
  'events',
  'am-event-rb-2025-ai-policy',
  ['B20'],
  'agreed: adoption stated done on 26 May 2025, in force 1 June 2025; no inference of implementation.',
);
agreed(
  'events',
  'am-event-fsb-2017-ai-ml-monitoring',
  ['B21'],
  'agreed: under way; the observation date is not a start date.',
);
agreed(
  'events',
  'am-event-fsb-2026-frontier-ai-cyber-work',
  ['B23'],
  'agreed: under way; letter date 28 August 2026.',
);
let e = agreed(
  'events',
  'am-event-fsb-2024-ai-report-update',
  ['B22'],
  'text, date and stage agreed; the kind “project-launched” was too strong for an update stated as in progress and is now “other”, as for the other two FSB events stated as under way.',
);
put(e, 'kind', 'other', 'B22');
put(
  e,
  'qualification',
  `${e.qualification} The text shows an update in progress, not a launch; the speech’s disclaimer states that the views are not necessarily those of the FSB or its members, and a later paragraph calls the work analytical, with no policy options then.`,
  'B22',
);

// ---------- Omissions and leads ----------
let o = findBy(
  'omissions',
  (x) => x.item?.includes('Payments Innovation Roundtable'),
  'roundtable',
);
put(
  o,
  'reason',
  `${o.reason} The cross-family checker could not settle its posting date either (second check, C31): 26 May 2026 is the meeting date; the note is linked from Waller’s speech dated 29 September 2026 (footnote 7), which dates the link, not the note. Publication stays unknown; the filename and the server’s last-modified date are not used.`,
  'C31',
);
o = findBy(
  'leads',
  (x) => x.item?.startsWith('Bank of Canada Working Paper 99-3'),
  'Bank of Canada',
);
put(
  o,
  'item',
  'Bank of Canada Working Paper 99-3, “Forecasting GDP Growth Using Artificial Neural Networks”, by Greg Tkacz and Sarah Hu (January 1999, staff, with an authors’ views disclaimer), reported by the cross-family checker after its blind search (A1.5, first check) and read by it in the second check (C33) from the Bank of Canada repository PDF: neural networks improve four-quarter GDP growth forecasts significantly, one-quarter forecasts not significantly. Not read in this environment (empty HTTP 202 responses).',
  'C33',
);
put(
  o,
  'reason',
  'The Bank of Canada is outside the named bodies (decision 16a); a lead, with no role. Agreed by the checker (C33).',
  'C33',
);

// ---------- Maintainer answer of 2026-11-04 on the follow-up's open question 1 (BaFin) ----------
o = findBy(
  'leads',
  (x) => x.item?.startsWith('BaFin, “Big data meets artificial intelligence'),
  'BaFin',
);
put(
  o,
  'reason',
  `${o.reason} Maintainer decision of 2026-11-04 (open question 1 of the follow-up pass): as recommended, the BDAI report stays a lead, on the logic of decision 16a.`,
  'maintainer 2026-11-04',
);
o = findBy(
  'openQuestions',
  (x) => x.question?.startsWith('BaFin’s own texts'),
  'BaFin question',
);
put(
  o,
  'recommended',
  `${o.recommended} Decided by the maintainer on 2026-11-04: as recommended.`,
  'maintainer 2026-11-04',
);

for (const { f, d } of drafts)
  writeFileSync(join(DRAFTS, f), JSON.stringify(d, null, 2) + '\n');
writeFileSync(
  join(DIR, 'adjudication', 'applied-2026-11-04.json'),
  JSON.stringify(log, null, 2) + '\n',
);
console.log(`${log.length} changes`);
