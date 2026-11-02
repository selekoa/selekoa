// Corrections after the same-family audits (audit/audit-{1,2,3}.json), applied to the drafts.
// Run after the generator scripts under scripts/ (which reproduce the pre-audit drafts):
//   node research/lab-genealogy-2/corrections.mjs
// Every change is made by claim, evidence or source ID and sets a final value, so running the
// script twice changes nothing. Dispositions of each audit finding: audit/dispositions.json.
// New passages were copied from texts retrieved with tools.mjs (drafting and fresh caches).
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const DRAFTS = join(dirname(fileURLToPath(import.meta.url)), 'drafts');
const GROUPS = ['nl', 'eu', 'oa', 'gm', 'xa', 'dl', 'cn'];
const docs = Object.fromEntries(
  GROUPS.map((g) => [
    g,
    JSON.parse(readFileSync(join(DRAFTS, `${g}.json`), 'utf8')),
  ]),
);
const CHECKED = '2026-10-29';

const claim = (g, id) => {
  const c = docs[g].claims.find((x) => x.id === id);
  if (!c) throw new Error(`${g}: no claim ${id}`);
  return c;
};
const evidence = (c, id) => {
  const e = c.evidence.find((x) => x.id === id);
  if (!e) throw new Error(`${c.id}: no evidence ${id}`);
  return e;
};
// eslint-disable-next-line @typescript-eslint/no-unused-vars -- kept for later correction passes
const source = (g, id) => {
  const s = docs[g].sources.find((x) => x.id === id);
  if (!s) throw new Error(`${g}: no source ${id}`);
  return s;
};
// Adds or replaces by id.
const upsert = (arr, item, after) => {
  const i = arr.findIndex((x) => x.id === item.id);
  if (i >= 0) arr[i] = item;
  else {
    const j = after ? arr.findIndex((x) => x.id === after) : -1;
    if (j >= 0) arr.splice(j + 1, 0, item);
    else arr.push(item);
  }
};
const removeEvidence = (c, id) => {
  c.evidence = c.evidence.filter((e) => e.id !== id);
};
const addEvidence = (c, e) => upsert(c.evidence, { ...e, checkedAt: CHECKED });
const addSource = (g, s) => upsert(docs[g].sources, s);
// Shallow-merges fields into a claim; attributes are merged; a value of undefined deletes.
const patch = (g, id, fields) => {
  const c = claim(g, id);
  for (const [k, v] of Object.entries(fields)) {
    if (k === 'attributes') {
      c.attributes = { ...(c.attributes ?? {}) };
      for (const [ak, av] of Object.entries(v))
        if (av === undefined) delete c.attributes[ak];
        else c.attributes[ak] = av;
    } else if (k === 'time') c.time = { ...c.time, ...v };
    else if (v === undefined) delete c[k];
    else c[k] = v;
  }
  return c;
};
const OPEN_REPORTED =
  'Open question for the maintainer: the departure is reported, not announced by the person or the company, and is kept under departure_announced pending a decision on that predicate.';

// ------------------------------------------------------------------ new sources

addSource('oa', {
  id: 'lg2-src-cnbc-katti-2026',
  cacheKey: 'oa-katti-cnbc-2026',
  title:
    'OpenAI’s Sachin Katti to leave infrastructure role, stay on as advisor',
  authors: ['Ashley Capoot'],
  publisher: 'CNBC',
  publicationDate: '2026-10-14',
  kind: 'article',
  url: 'https://www.cnbc.com/2026/10/14/openais-sachin-katti-to-leave-infrastructure-role-stay-on-as-advisor.html',
  route: 'relay',
  language: 'en',
  sourceClass: 'reporting',
});
addSource('oa', {
  id: 'lg2-src-bloomberg-bubeck-2024',
  cacheKey: 'oa-bubeck-fortune-2024',
  title: 'Microsoft artificial intelligence VP Bubeck to join OpenAI',
  authors: ['Dina Bass'],
  publisher: 'Bloomberg (as carried by Fortune)',
  publicationDate: '2024-10-14',
  kind: 'article',
  url: 'https://fortune.com/2024/10/14/microsoft-artificial-intelligence-vp-sebastien-bubeck-openai-agi-small-language-models',
  route: 'direct',
  language: 'en',
  sourceClass: 'reporting',
});
addSource('gm', {
  id: 'lg2-src-gm-semafor-hsiao-2025',
  cacheKey: 'gm-semafor-hsiao-2025',
  title:
    'Google Gemini shakes up AI leadership, Sissie Hsiao steps down, replaced by Josh Woodward',
  authors: ['Reed Albergotti'],
  publisher: 'Semafor',
  publicationDate: '2025-04-02',
  kind: 'article',
  url: 'https://www.semafor.com/article/04/02/2025/google-gemini-shakes-up-ai-leadership-sissie-hsiao-steps-down-replaced-by-josh-woodward',
  route: 'direct',
  language: 'en',
  sourceClass: 'reporting',
});
addSource('gm', {
  id: 'lg2-src-gm-google-woodward-author',
  cacheKey: 'gm-google-woodward-author',
  title: 'Josh Woodward (author page, The Keyword)',
  authors: [],
  publisher: 'Google (The Keyword)',
  publicationDate: null,
  kind: 'announcement',
  url: 'https://blog.google/authors/josh-woodward/',
  route: 'direct',
  language: 'en',
  sourceClass: 'primary',
});
addSource('gm', {
  id: 'lg2-src-gm-radical-discovery-loop-2026',
  cacheKey: 'gm-radical-discovery-loop-2026',
  title: 'Radical Reads: Jeff Dean on Launching Discovery Loop',
  authors: ['Jeff Dean', 'Jordan Jacobs'],
  publisher:
    'Radical Ventures (reproducing excerpts of Jeff Dean’s announcement thread)',
  publicationDate: '2026-08-09',
  kind: 'post',
  url: 'https://radical.vc/articles/radical-reads-jeff-dean-on-launching-discovery-loop/',
  route: 'direct',
  language: 'en',
  sourceClass: 'primary',
});
addSource('cn', {
  id: 'lg2-src-huxiu-xie-jian-2025',
  cacheKey: 'cn-huxiu-xie-jian-2025',
  title: '又走了一位联创？王小川快成“光杆司令”了',
  authors: ['新浪科技《BUG》栏目'],
  publisher: 'Huxiu (虎嗅), republishing Sina Tech (新浪科技)',
  publicationDate: '2025-07-17',
  kind: 'article',
  url: 'https://www.huxiu.com/article/4586792.html',
  route: 'direct',
  language: 'zh',
  sourceClass: 'reporting',
});

// ------------------------------------------------------------------ oa

// Audit 3: role attribute must not import the 2022 title. (The record itself is held: integration.json.)
patch('oa', 'lg2-oa-brockman-openai-sabbatical-2024', {
  attributes: { role: 'Not stated in the post' },
});
// Coordinator decision 1: the return record must not rest on the held sabbatical record's framing.
patch('oa', 'lg2-oa-brockman-openai-return-2024', {
  attributes: { role: 'not stated (back to building at OpenAI, in his words)' },
  qualification:
    'A first-person post; it names no title or role and does not give the date of his return. His post of August 2024 announcing a sabbatical is held for the maintainer (no leave predicate exists) and is not a premise of this record.',
});

{
  const c = patch('oa', 'lg2-oa-carlini-gdm-departure-2025', {
    statement:
      'Nicholas Carlini announced on 5 March 2025 that he had decided to leave Google DeepMind after seven years; he stated that he no longer believed DeepMind (and DeepMind leadership) supported the type of high-impact security and privacy research he likes to do.',
  });
  c.statedReason = {
    ...c.statedReason,
    text: 'Carlini wrote that he no longer believed DeepMind (and DeepMind leadership) supported the type of high-impact security and privacy research he likes to do.',
  };
  Object.assign(evidence(c, 'lg2-ev-oa-carlini-gdm-departure-2025-2'), {
    locator:
      'Section “Why am I leaving?”, first paragraph (the footnote [a] that interrupts the sentence is omitted)',
    passage:
      'I no longer believe DeepMind (and DeepMind leadership … ) supports the type of high-impact security and privacy research I like to do',
  });
}

{
  const c = patch('oa', 'lg2-oa-schwarzer-anthropic-2026', {
    time: {
      note: 'Date of Schwarzer’s X post (3 March 2026, 21:02 UTC) as retrieved through X’s syndication endpoint, which truncates the post before the part exchange4media quotes; not a start date.',
    },
    qualification:
      'The record rests on reporting (exchange4media, 5 March 2026), which quotes the later part of Schwarzer’s X post that X’s syndication endpoint did not return; the date is that of the post as retrieved. The report’s subheading gives the title Member of Technical Staff without a source.',
  });
  addEvidence(c, {
    id: 'lg2-ev-oa-schwarzer-anthropic-2026-x',
    sourceId: 'lg2-src-schwarzer-x-2026',
    sourceRole: 'primary',
    support: 'context',
    locator: 'Post text, first sentence (post dated 2026-03-03T21:02:45Z)',
    passageType: 'paraphrase',
    passage:
      'Schwarzer writes that he has decided to leave OpenAI; the retrieved text ends before the part about Anthropic that the report quotes.',
    anchor: 'leave OpenAI',
  });
}

{
  const c = patch('oa', 'lg2-oa-tworek-openai-departure-2026', {
    qualification:
      'The record rests on reporting at two removes: TrendForce relays The Verge (“According to The Verge, citing Jerry Tworek’s X”), which reports the note Tworek shared on X as an image; The Verge’s report was not retrieved and the image cannot be machine-checked. The departure was announced by Tworek; the stated reason is relayed and attributed to him, not checked against his own words.',
  });
  c.statedReason = {
    ...c.statedReason,
    text: 'As relayed by TrendForce, which cites The Verge’s report of Tworek’s X post, Tworek said he wanted to pursue research that is difficult to carry out within OpenAI.',
  };
}

patch('oa', 'lg2-oa-vallone-anthropic-2026', {
  qualification:
    'The record rests on reporting (The Decoder), which names no source for the move; no announcement by Vallone or Anthropic was retrieved. No title or start date is given.',
});
patch('oa', 'lg2-oa-vallone-openai-model-policy-prior', {
  qualification:
    'The record rests on reporting (The Decoder), which names no source; it does not establish dates, a title or the end of her OpenAI role.',
});

for (const id of [
  'lg2-oa-beyer-openai-2024',
  'lg2-oa-kolesnikov-openai-2024',
  'lg2-oa-zhai-openai-2024',
])
  patch('oa', id, {
    qualification:
      'The record rests on reporting of an OpenAI press release that was not retrieved. The quotations are from heise online’s English edition, which the page says was originally published in German and translated with technical assistance and editorially reviewed. No OpenAI title or start date is given.',
  });

{
  const c = patch('oa', 'lg2-oa-bubeck-microsoft-departure-2024', {
    statement:
      'Bloomberg reported on 14 October 2024 that Microsoft had said that Sébastien Bubeck, one of its artificial intelligence vice presidents, was leaving to join OpenAI; Maginative reported the same day a Microsoft spokesperson’s statement that he had decided to leave Microsoft to further his work toward developing artificial general intelligence.',
    qualification:
      'The record rests on reporting of Microsoft’s statements: Bloomberg (as carried by Fortune), which says The Information first reported the departure, and Maginative, which names no source for the spokesperson’s words. The stated reason is Microsoft’s account, attributed. The title (VP of AI and Distinguished Scientist) is Maginative’s.',
  });
  Object.assign(evidence(c, 'lg2-ev-oa-bubeck-microsoft-departure-2024'), {
    locator: 'Paragraph beginning “It’s currently unclear what specific role”',
  });
  Object.assign(evidence(c, 'lg2-ev-oa-bubeck-microsoft-departure-2024-2'), {
    locator: 'Paragraph 1',
  });
  addEvidence(c, {
    id: 'lg2-ev-oa-bubeck-microsoft-departure-2024-bloomberg',
    sourceId: 'lg2-src-bloomberg-bubeck-2024',
    sourceRole: 'secondary',
    support: 'supports',
    locator: 'Paragraph 1',
    passageType: 'quote',
    passage:
      'Microsoft Corp. said one of its artificial intelligence vice presidents, Sebastien Bubeck, is leaving to join OpenAI',
  });
}
{
  const c = patch('oa', 'lg2-oa-bubeck-openai-2024', {
    statement:
      'Bloomberg reported on 14 October 2024 that Microsoft had said that Sébastien Bubeck was leaving to join OpenAI; Maginative reported the same day that his role at OpenAI was unclear.',
    qualification:
      'The record rests on reporting (Bloomberg, as carried by Fortune, and Maginative); no OpenAI title or start date is given.',
  });
  Object.assign(evidence(c, 'lg2-ev-oa-bubeck-openai-2024'), {
    locator: 'Paragraph beginning “It’s currently unclear what specific role”',
  });
  addEvidence(c, {
    id: 'lg2-ev-oa-bubeck-openai-2024-bloomberg',
    sourceId: 'lg2-src-bloomberg-bubeck-2024',
    sourceRole: 'secondary',
    support: 'supports',
    locator: 'Paragraph 1',
    passageType: 'quote',
    passage:
      'Microsoft Corp. said one of its artificial intelligence vice presidents, Sebastien Bubeck, is leaving to join OpenAI',
  });
}

patch('oa', 'lg2-oa-katti-openai-2025', {
  qualification:
    'The post names him by his X handle; the identification with Sachin Katti rests on reporting (Tom’s Hardware, which follows Reuters). No title is given. His move from Intel is not recorded here.',
});
{
  const c = patch('oa', 'lg2-oa-katti-openai-departure-2026', {
    statement:
      'CNBC reported on 14 October 2026 that Sachin Katti, OpenAI’s infrastructure and compute lead, had announced that he was departing his role and would continue to support OpenAI as an advisor after his last day on 15 November.',
    time: {
      note: 'Date of the report and of Katti’s announcement as reported; the last day of 15 November 2026 is prospective.',
    },
    qualification:
      'The record rests on reporting (CNBC), which relays Katti’s LinkedIn post; LinkedIn is not cited as evidence. The departure is announced by Katti and known here from the report; the last day is announced, not confirmed. His plan to build something new is not recorded as a reason.',
  });
  removeEvidence(c, 'lg2-ev-oa-katti-openai-departure-2026');
  addEvidence(c, {
    id: 'lg2-ev-oa-katti-openai-departure-2026-cnbc',
    sourceId: 'lg2-src-cnbc-katti-2026',
    sourceRole: 'secondary',
    support: 'supports',
    locator: 'Key Points, first item',
    passageType: 'quote',
    passage:
      'Sachin Katti, OpenAI’s infrastructure and compute lead, announced he is departing his role and will continue supporting the company as an advisor.',
  });
  addEvidence(c, {
    id: 'lg2-ev-oa-katti-openai-departure-2026-cnbc-date',
    sourceId: 'lg2-src-cnbc-katti-2026',
    sourceRole: 'secondary',
    support: 'supports',
    locator: 'Paragraph 1',
    passageType: 'quote',
    passage:
      'he’ll continue to support OpenAI as an advisor after his last day on Nov. 15',
  });
}
{
  const c = patch('oa', 'lg2-oa-ruddarraju-openai-compute-lead-2026', {
    statement:
      'CNBC reported on 14 October 2026 that, according to an OpenAI spokesperson, Uday Ruddarraju, OpenAI’s CTO of compute, would replace Sachin Katti and lead the company’s overall compute organisation.',
    qualification:
      'The record rests on reporting (CNBC) of a company spokesperson’s statement; it does not establish a title for the new remit or that the handover took place.',
  });
  removeEvidence(c, 'lg2-ev-oa-ruddarraju-openai-compute-lead-2026');
  addEvidence(c, {
    id: 'lg2-ev-oa-ruddarraju-openai-compute-lead-2026-cnbc',
    sourceId: 'lg2-src-cnbc-katti-2026',
    sourceRole: 'secondary',
    support: 'supports',
    locator: 'Key Points, second item',
    passageType: 'quote',
    passage:
      'Uday Ruddarraju, OpenAI’s CTO of compute, will replace Katti and lead the company’s overall compute organization, according to a spokesperson.',
  });
}
{
  const c = patch('oa', 'lg2-oa-ruddarraju-openai-cto-compute-2026', {
    qualification:
      'The 18 July 2026 snapshot rests on an unsourced trade people-movement brief (exchange4media); no OpenAI announcement was found. CNBC reported on 14 October 2026, in a sentence attributed to an OpenAI spokesperson, that he had been serving as CTO of compute; that later report supports the title, not the July date.',
  });
  addEvidence(c, {
    id: 'lg2-ev-oa-ruddarraju-openai-cto-compute-2026-cnbc',
    sourceId: 'lg2-src-cnbc-katti-2026',
    sourceRole: 'secondary',
    support: 'supports',
    locator: 'Paragraph 2',
    passageType: 'quote',
    passage: 'Uday Ruddarraju, who has been serving as OpenAI’s CTO of compute',
  });
}

patch('oa', 'lg2-oa-radford-openai-departure-2024', {
  qualification:
    'The record rests on reporting in Chinese: QbitAI relays The Information’s report (not retrieved) and a statement by Mark Chen, OpenAI’s head of research; no first-person announcement by Radford was found. Mark Chen’s words are recorded from QbitAI’s Chinese translation; the original English wording was not retrieved, and the English paraphrase in the statement is a back-translation, not his wording.',
});
patch('oa', 'lg2-oa-kilpatrick-google-2024', {
  qualification:
    'The record rests on reporting (Quartz, which says the move was first reported by Business Insider and Gizmochina); his LinkedIn announcement was not retrieved and LinkedIn is not cited as evidence.',
});
patch('oa', 'lg2-oa-kilpatrick-openai-devrel-prior', {
  qualification:
    'The record rests on reporting (Quartz, which says the move was first reported by Business Insider and Gizmochina); it does not establish a start date or an exact leaving date.',
});
patch('oa', 'lg2-oa-karpathy-anthropic-2026', {
  qualification:
    'A first-person post; it names no title or team. The post does not say what becomes of Eureka Labs beyond his plan to resume work on education in time.',
});
patch('oa', 'lg2-oa-houlsby-anthropic-zurich-2025', {
  qualification:
    'A company announcement; it does not give a title or start date or name his previous employer.',
});

// ------------------------------------------------------------------ gm

patch('gm', 'lg2-gm-vinyals-leaves-google-2026', {
  attributes: { stage: 'announced' },
});

{
  const c = patch('gm', 'lg2-gm-le-leaves-google-2026', {
    attributes: { stage: 'effective' },
    qualification: `${OPEN_REPORTED} The record rests on reporting (VnExpress International); Le’s own post as relayed concerns co-founding Discovery Loop, and the retrieved texts do not quote him or Google on his leaving Google. VnExpress, following TechCrunch, reports that Alphabet is among the venture’s funders, and Jeff Dean’s announcement thread names Alphabet (Google) among the participants in the first round, so “left Google” should not be read as a break with Alphabet. Neither a last working day nor his last title at Google is established.`,
  });
  addEvidence(c, {
    id: 'lg2-ev-gm-le-leaves-google-2026-alphabet',
    sourceId: 'lg2-src-gm-vnexpress-le-2026',
    sourceRole: 'secondary',
    support: 'context',
    locator: 'Paragraph beginning “TechCrunch reported”',
    passageType: 'quote',
    passage:
      "the venture has secured funding from several sources, including Google's parent company, Alphabet",
  });
  addEvidence(c, {
    id: 'lg2-ev-gm-le-leaves-google-2026-dean',
    sourceId: 'lg2-src-gm-radical-discovery-loop-2026',
    sourceRole: 'primary',
    support: 'context',
    locator: 'Jeff Dean’s thread as reproduced, post 3',
    passageType: 'quote',
    passage:
      'participation from Lightspeed, Kleiner Perkins, Doerr Capital (John Doerr), and Alphabet (Google)',
  });
}

{
  // Coordinator decision 2: departure_announced scoped explicitly to the CEO title.
  const c = patch('gm', 'lg2-gm-hassabis-steps-down-ceo-2026', {
    statement:
      'Google published on 5 August 2026 Demis Hassabis’s note stating that he would hand over his day-to-day operational responsibilities at Google DeepMind and take the roles of Chair of Google DeepMind and Chief Scientist of Alphabet; CNBC reported the same day that Hassabis, the CEO of Google DeepMind, was moving into a chairman role of that unit. The record concerns the CEO title only: he does not leave Google DeepMind.',
    attributes: {
      role: 'CEO, Google DeepMind',
      stage: 'announced',
      scope:
        'The CEO title only; he remains at Google DeepMind as Chair and becomes Chief Scientist of Alphabet',
    },
    qualification:
      'Scoped to the CEO title: Google’s text gives Hassabis the roles of Chair of Google DeepMind and Chief Scientist of Alphabet, and he does not leave Google DeepMind (the Chair role is the existing record lg-goo-hassabis-gdm-chair-2026). Google’s published messages describe the change as a handover of his day-to-day operational responsibilities and do not use the word CEO; the CEO title rests on CNBC’s report. An announced change; the record does not establish when it took effect.',
  });
  Object.assign(evidence(c, 'lg2-ev-gm-hassabis-steps-down-ceo-2026-2'), {
    support: 'supports',
  });
}

{
  const c = patch('gm', 'lg2-gm-hsiao-leaves-gemini-app-role-2025', {
    statement:
      'Semafor reported on 2 April 2025, from staff memos it reviewed, that Sissie Hsiao, who led the Gemini app, would step down immediately; 9to5Google reported the same day, following Semafor, that she was leaving her role as Vice President and General Manager, Gemini app and Speech, and would remain at Google.',
    attributes: { stage: 'announced' },
    qualification:
      'The record rests on reporting: Semafor, which cites staff memos by Hsiao and Demis Hassabis that it reviewed and that were not published, and 9to5Google, which follows Semafor (“According to Semafor”). The change was announced internally, not publicly; no public announcement by Hsiao or Google was retrieved. She leaves the role, not Google; her later role is not recorded.',
  });
  addEvidence(c, {
    id: 'lg2-ev-gm-hsiao-leaves-gemini-app-role-2025-semafor',
    sourceId: 'lg2-src-gm-semafor-hsiao-2025',
    sourceRole: 'secondary',
    support: 'supports',
    locator: 'The Scoop, paragraph 2',
    passageType: 'quote',
    passage:
      'Sissie Hsiao, who led Google’s effort to create an AI chatbot, originally called Bard and now dubbed Gemini, will step down immediately.',
  });
}
{
  const c = patch('gm', 'lg2-gm-woodward-gemini-app-2025', {
    qualification:
      'The record rests on reporting: Semafor, which cites staff memos it reviewed (not published), and 9to5Google, which follows Semafor. The reports do not give Woodward’s own new title; the record does not establish a start date or a continuing role.',
  });
  addEvidence(c, {
    id: 'lg2-ev-gm-woodward-gemini-app-2025-semafor',
    sourceId: 'lg2-src-gm-semafor-hsiao-2025',
    sourceRole: 'secondary',
    support: 'supports',
    locator: 'The Scoop, paragraph 2',
    passageType: 'quote',
    passage: 'Josh Woodward, who leads Google Labs … will replace her',
  });
}
{
  const c = patch('gm', 'lg2-gm-woodward-google-labs-vp-2025', {
    statement:
      '9to5Google reported on 2 April 2025, following Semafor, that Josh Woodward would remain VP of Google Labs while taking over the Gemini app role; Semafor reported the same day that, according to Demis Hassabis’s staff memo, he would remain head of Google Labs.',
    qualification:
      'The record rests on reporting: 9to5Google (“According to Semafor”) and Semafor, which relays a staff memo by Demis Hassabis that it reviewed. Google’s author page, as retrieved on 29 October 2026, gives his title as VP, Google Labs, Gemini app & AI Studio; that later, undated snapshot is context, not evidence of the April 2025 title. The record does not establish when the role began or ended.',
  });
  addEvidence(c, {
    id: 'lg2-ev-gm-woodward-google-labs-vp-2025-semafor',
    sourceId: 'lg2-src-gm-semafor-hsiao-2025',
    sourceRole: 'secondary',
    support: 'supports',
    locator: 'The Scoop, paragraph 3',
    passageType: 'quote',
    passage:
      'He said Woodward will remain head of Google Labs while shaping the next chapter of Gemini.',
  });
  addEvidence(c, {
    id: 'lg2-ev-gm-woodward-google-labs-vp-2025-author',
    sourceId: 'lg2-src-gm-google-woodward-author',
    sourceRole: 'primary',
    support: 'context',
    locator: 'Author biography (page undated; retrieved 2026-10-29)',
    // The page has about 65 words of running text, so at most 6 quoted words.
    passageType: 'paraphrase',
    passage:
      'The author page gives Woodward’s title as VP, Google Labs, Gemini app & AI Studio, and says that he leads Google Labs, the Gemini app and AI Studio.',
    anchor: 'VP, Google Labs',
  });
}

for (const id of [
  'lg2-gm-kavukcuoglu-chief-ai-architect-2025-06',
  'lg2-gm-kavukcuoglu-gdm-cto-2025-06',
]) {
  const c = claim('gm', id);
  const base =
    id === 'lg2-gm-kavukcuoglu-gdm-cto-2025-06'
      ? 'The record rests on reporting (CNBC, which says Semafor first reported the executive change). A snapshot; the record does not establish when the CTO role began.'
      : 'The record rests on reporting (CNBC, which says Semafor first reported the executive change, and relays Sundar Pichai’s memo to employees and the company’s confirmation). Google’s November 2025 announcement already in the dataset shows the title later in use.';
  c.qualification = base;
}

for (const id of [
  'lg2-gm-wang-tbd-lab-lead-2025',
  'lg2-gm-friedman-products-applied-research-2025',
  'lg2-gm-fergus-continues-fair-2025-08',
])
  patch('gm', id, { attributes: { stage: 'announced' } });

patch('gm', 'lg2-gm-ramani-leaves-meta-2026', {
  attributes: { stage: 'announced' },
  qualification:
    'The record rests on reporting (WinBuzzer, relaying The Information’s account of an unpublished internal memo by Ramani); the announcement is known only from that reporting. No last working day is given.',
});
patch('gm', 'lg2-gm-pang-joins-meta-2025', {
  qualification:
    'The record rests on reporting (TechCrunch relaying Bloomberg, whose report rests on unnamed sources: “Sources told Bloomberg”). The report names no title or unit at Meta; the record does not establish a start date.',
});

{
  const c = patch('gm', 'lg2-gm-velloso-leaves-google-2025', {
    attributes: {
      role: 'vice-presidente de produto e desenvolvimento de plataforma at Google DeepMind (as reported: “o mesmo cargo”, the same post he was taking at Meta)',
      stage: 'effective',
    },
    qualification:
      'The record rests on reporting (Baguete, relaying his LinkedIn farewell, which is not itself evidence). The title is given by reference: the report says he held the same post at Google DeepMind as the one he was taking at Meta. The month is that of the report; his last day is not given.',
  });
  addEvidence(c, {
    id: 'lg2-ev-gm-velloso-leaves-google-2025-role',
    sourceId: 'lg2-src-gm-baguete-velloso-2025',
    sourceRole: 'secondary',
    support: 'supports',
    locator: 'Paragraph 2',
    passageType: 'quote',
    passage: 'Velloso ocupava o mesmo cargo na Google DeepMind',
  });
}
patch('gm', 'lg2-gm-velloso-gdm-vp-product-prior', {
  qualification:
    'The record rests on reporting (Baguete, which spells the name “Matt Velloso” and draws on his interview with Radar Big Tech). The title is given by reference: the report says he held the same position at Google DeepMind; dates are not established. Google bylines or a first-person post with his Google DeepMind title were not retrieved.',
});
patch('gm', 'lg2-gm-velloso-meta-vp-product-2025', {
  qualification:
    'The record rests on reporting (Baguete, which spells the name “Matt Velloso” and draws on his interview with Radar Big Tech; the career details match Mat Velloso). The report places him in Meta’s superintelligence team; his exact unit is not otherwise established. The report gives both “after seven months” and a start of July 2025; neither an end date nor a duration is adopted.',
});
patch('gm', 'lg2-gm-velloso-leaves-meta-2026', {
  statement:
    'Baguete reported on 8 June 2026 that Mat Velloso had left Meta’s superintelligence team; Velloso said in an interview it relays that Meta was not the right place for him to influence things in the way he considered necessary.',
  attributes: { stage: 'effective' },
  qualification:
    'The record rests on reporting (Baguete, which spells the name “Matt Velloso”, relaying an interview with Radar Big Tech). The report gives both “after seven months” and a start of July 2025; the duration is not adopted. Only the professional reason he gave is recorded.',
});

{
  const c = patch('gm', 'lg2-gm-agarwal-leaves-meta-2025', {
    attributes: { stage: 'announced' },
  });
  // The post has 54 words, so at most 5 quoted words: two anchors of 2 and 3 words.
  Object.assign(evidence(c, 'lg2-ev-gm-agarwal-leaves-meta-2025'), {
    passage:
      'Agarwal writes that this is his last week at Meta and that he decided not to continue with the new Superintelligence TBD Lab.',
    anchor: 'last week',
  });
  addEvidence(c, {
    id: 'lg2-ev-gm-agarwal-leaves-meta-2025-reason',
    sourceId: 'lg2-src-gm-agarwal-x-2025',
    sourceRole: 'primary',
    support: 'supports',
    locator: 'Post text, last sentence',
    passageType: 'paraphrase',
    passage:
      'Agarwal writes that after 7.5 years across Google Brain, DeepMind and Meta he “felt the pull” to take on a different kind of risk.',
    anchor: 'felt the pull',
  });
  c.statedReason = {
    by: 'rishabh-agarwal',
    text: 'Agarwal wrote that, after 7.5 years across Google Brain, DeepMind and Meta, he “felt the pull” to take on a different kind of risk.',
    evidenceId: 'lg2-ev-gm-agarwal-leaves-meta-2025-reason',
  };
}
patch('gm', 'lg2-gm-patel-leaves-meta-2026', {
  attributes: { stage: 'announced' },
  qualification: `${OPEN_REPORTED} The record rests on reporting (TechCrunch, which says it “has exclusively learned” of the departure and names no source). The founding of Ndoc, an office-software startup outside the pack’s lab scope, is not recorded.`,
});

// ------------------------------------------------------------------ eu

patch('eu', 'lg2-eu-silver-deepmind-departure-2026', {
  attributes: { stage: 'effective' },
  time: {
    note: 'Date of the report; Fortune says, citing an unnamed person with direct knowledge of Silver’s plans, that Google DeepMind informed staff earlier in January 2026. The last working day is not established.',
  },
  qualification:
    'The record rests on reporting (Fortune), which relays a Google DeepMind spokesperson’s confirmation of the departure in an emailed statement; no public announcement by Silver or Google DeepMind was retrieved. The report’s account of the staff notice and of his plans rests on an unnamed person. The source states the departure as effective (“has left”) but does not date it.',
});
for (const id of [
  'lg2-eu-inflection-round-2023',
  'lg2-eu-inflection-round-2023-microsoft',
  'lg2-eu-inflection-round-2023-nvidia',
]) {
  const c = claim('eu', id);
  c.qualification =
    id === 'lg2-eu-inflection-round-2023'
      ? 'The record rests on reporting: TechCrunch’s sentence relays Forbes’s first report (“As first reported by Forbes”), and its valuation figure rests on an unnamed source (not recorded). Inflection’s own announcement could not be retrieved. It does not establish the split between cash and other forms of investment, or each investor’s share.'
      : 'Names the investor as a participant only; the source gives no individual amount, and the round total is not attributed to this investor. The record rests on reporting: TechCrunch’s sentence relays Forbes’s first report. Inflection’s own announcement could not be retrieved.';
}
patch('eu', 'lg2-eu-hooker-cohere-departure-2025', {
  qualification:
    'The record rests on reporting: TechCrunch reports that Hooker announced her departure but does not quote or link the announcement, which was not located. An announced departure; the record does not establish her last working day.',
});
patch('eu', 'lg2-eu-zeghidour-kyutai-2023', {
  qualification:
    'Records the announced team membership at launch; it gives no title and does not establish a continuing role. Later roles are not recorded here.',
});
patch('eu', 'lg2-eu-jegou-kyutai-2023', {
  qualification:
    'Records the announced team membership at launch; it gives no title and does not establish a continuing role or its end.',
});

// ------------------------------------------------------------------ xa

{
  // Coordinator decision 4: participation without amount, plus a separate investment record.
  const c = patch('xa', 'lg2-xa-humain-series-e', {
    statement:
      'HUMAIN announced on 18 February 2026 that its investment in xAI was part of xAI’s Series E financing round.',
    attributes: {
      transactionType: 'funding_round',
      amount: undefined,
    },
    qualification:
      'Named participation as announced by HUMAIN; no amount is attributed here (HUMAIN’s own stated amount is the separate record lg2-xa-humain-investment-2026), and the round total is a separate existing record. xAI’s announcement of 6 January 2026 does not name HUMAIN. The record does not establish when the funds were paid.',
  });
  const inv = structuredClone(c);
  Object.assign(inv, {
    id: 'lg2-xa-humain-investment-2026',
    predicate: 'investment_announced',
    statement:
      'HUMAIN announced on 18 February 2026 a $3 billion strategic investment in xAI as part of xAI’s Series E financing round.',
    attributes: {
      transactionType: 'investment',
      transactionStage: 'announced',
      relationshipContext: 'external',
      period: 'Series E',
      amount: {
        value: 3000000000,
        currency: 'USD',
        bound: 'exact',
        scope: 'transaction',
      },
    },
    qualification:
      'HUMAIN’s own announcement of its own amount; the amount is HUMAIN’s stated investment, not the round total, and is recorded at the stage the announcement words it (“announced”). The release’s summary also describes the investment in the past tense; the record does not establish when the funds were paid.',
    evidence: [
      {
        ...c.evidence[0],
        id: 'lg2-ev-xa-humain-investment-2026',
        checkedAt: CHECKED,
      },
    ],
  });
  upsert(docs.xa.claims, inv, c.id);
}

patch('xa', 'lg2-xa-burnham-xai-general-counsel-2025', {
  statement:
    'Bloomberg Government reported on 21 November 2025 that James Burnham was general counsel of xAI, a role listed in a press release of 19 November 2025 on the xAI–HUMAIN partnership.',
  qualification:
    'The record rests on reporting, which relays a press release of 19 November 2025 on the partnership that was not retrieved. It does not establish a start date or a continuing role.',
});

{
  const c = claim('xa', 'lg2-xa-liberatore-xai-cfo-2025');
  evidence(c, 'lg2-ev-xa-liberatore-xai-cfo-2025-end').passage =
    'departed from xAI in July after serving only four months as its finance chief';
  c.qualification =
    'The record rests on reporting: CFO Dive relays the Wall Street Journal’s report of 3 September 2025, which cites unnamed people familiar with the matter, for the departure; no announcement by xAI or Liberatore was retrieved.';
}
{
  const c = patch('xa', 'lg2-xa-liberatore-xai-departure-2025', {
    statement:
      'CFO Dive reported on 16 September 2025, relaying The Wall Street Journal’s report of 3 September 2025, that Mike Liberatore had departed from xAI in July 2025.',
    attributes: { stage: 'effective' },
    qualification: `${OPEN_REPORTED} The record rests on reporting: CFO Dive relays the Wall Street Journal’s report of 3 September 2025, which cites unnamed people familiar with the matter. No announcement by xAI or Liberatore was retrieved. It does not establish the exact date.`,
  });
  evidence(c, 'lg2-ev-xa-liberatore-xai-departure-2025').passage =
    'departed from xAI in July after serving only four months as its finance chief';
}
patch('xa', 'lg2-xa-armstrong-xai-cfo-2025', {
  attributes: { stage: 'announced' },
  qualification:
    'The record rests on reporting that relays the Financial Times, which cited anonymous sources; xAI did not immediately respond to TechCrunch. The report says he will take over and oversee the finances of xAI and X; it does not establish a start date or a continuing role.',
});
patch('xa', 'lg2-xa-ke-yang-apple-departure-2025', {
  qualification: `${OPEN_REPORTED} The record rests on reporting: AppleInsider relays Bloomberg, whose report rests on unnamed people familiar with the matter; no statement by Apple or Yang was retrieved. It does not establish a last working day or Yang’s role at Meta.`,
});
{
  const c = patch('xa', 'lg2-xa-luan-amazon-departure-2026', {
    attributes: { stage: 'effective' },
    qualification:
      'The record rests on reporting: Next relays a LinkedIn message by Luan in French translation and itself follows The Verge (“Selon The Verge”); Reuters states the departure month. The English original quoted by The Verge, and the post itself, were not retrieved; the stated reason is an English rendering of Next’s French. The record does not establish his last working day or later role.',
  });
  c.statedReason = {
    ...c.statedReason,
    text: 'Luan wrote, in a LinkedIn message relayed in French translation by Next, that with artificial general intelligence so close he had decided to spend 100 percent of his time teaching AI systems entirely new capabilities (an English rendering of the French translation).',
  };
}
patch('xa', 'lg2-xa-keele-xai-departure-2025', {
  attributes: { stage: 'effective' },
});
patch('xa', 'lg2-xa-lim-xai-head-of-legal-2025', {
  attributes: { stage: 'announced' },
});

// ------------------------------------------------------------------ dl

{
  // Held (coordinator decision 7); corrected as the auditor proposed in case it is reinstated.
  const c = patch('dl', 'lg2-dl-cma-microsoft-inflection-assets-2024', {
    time: {
      note: 'The CMA states that the Transaction completed and was made public on 19 March 2024 (para 132); its decision was given on 4 September 2024.',
    },
    qualification:
      'The regulator’s characterisation for merger-control purposes: an acquisition of certain assets (the hired team and associated arrangements, including a non-exclusive licence), not of Inflection AI as a company; the CMA records Microsoft’s account that the remaining Inflection business pivoted towards a B2B (enterprise) business. Microsoft and Inflection did not describe the arrangement as an acquisition in the sources recorded. The CMA found no realistic prospect of a substantial lessening of competition.',
  });
  addEvidence(c, {
    id: 'lg2-ev-dl-cma-microsoft-inflection-completed',
    sourceId: 'lg2-src-cma-inflection-full-2024',
    sourceRole: 'primary',
    support: 'supports',
    locator: 'Section 5.4, Conclusion on jurisdiction, paragraph 132',
    passageType: 'quote',
    passage: 'The Transaction completed and was made public on 19 March 2024.',
  });
  addEvidence(c, {
    id: 'lg2-ev-dl-cma-microsoft-inflection-pivot',
    sourceId: 'lg2-src-cma-inflection-full-2024',
    sourceRole: 'primary',
    support: 'context',
    locator: 'Background, paragraph 33',
    passageType: 'quote',
    passage:
      'the remaining Inflection business pivoted towards a B2B (enterprise) business',
  });
}
docs.dl.evidenceForExisting = [
  {
    existingClaimId: 'lg-deal-microsoft-inflection-agreement-2024',
    note: 'The CMA’s characterisation of the arrangement as an acquisition by Microsoft of certain assets of Inflection AI, proposed as additional evidence for the existing agreement record instead of an `acquired` edge between the companies (held record lg2-dl-cma-microsoft-inflection-assets-2024).',
    evidence: {
      id: 'lg2-ev-dl-existing-cma-inflection-assets',
      sourceId: 'lg2-src-cma-inflection-full-2024',
      sourceRole: 'primary',
      support: 'context',
      locator: 'Summary, section 1, paragraph 1',
      passageType: 'quote',
      passage:
        'the transaction described below involving the acquisition by Microsoft Corporation (Microsoft) of certain assets of Inflection AI, Inc. (Inflection), is a relevant merger situation',
      checkedAt: CHECKED,
    },
    source: 'lg2-src-cma-inflection-full-2024',
  },
  {
    existingClaimId: 'lg-deal-microsoft-inflection-agreement-2024',
    note: 'The completion date the CMA states for the transaction (para 132).',
    evidence: {
      id: 'lg2-ev-dl-existing-cma-inflection-completed',
      sourceId: 'lg2-src-cma-inflection-full-2024',
      sourceRole: 'primary',
      support: 'supports',
      locator: 'Section 5.4, Conclusion on jurisdiction, paragraph 132',
      passageType: 'quote',
      passage:
        'The Transaction completed and was made public on 19 March 2024.',
      checkedAt: CHECKED,
    },
    source: 'lg2-src-cma-inflection-full-2024',
  },
];

const humanloopContext = (who) => ({
  id: `lg2-ev-dl-${who}-anthropic-spokesperson`,
  sourceId: 'lg2-src-tc-humanloop-2025',
  sourceRole: 'secondary',
  support: 'context',
  locator: 'Paragraph 3',
  passageType: 'quote',
  passage:
    'an Anthropic spokesperson confirmed that the AI firm did not acquire Humanloop’s assets or its intellectual property',
});
{
  const c = claim('dl', 'lg2-dl-habib-anthropic-2025');
  addEvidence(c, humanloopContext('habib'));
}
for (const [who, name] of [
  ['hayes', 'Peter Hayes'],
  ['burgess', 'Jordan Burgess'],
]) {
  const c = patch('dl', `lg2-dl-${who}-anthropic-2025`, {
    qualification: `The person-level record rests on reporting; Humanloop’s own announcement says that its team is joining Anthropic and is signed by the three co-founders’ first names, so it does not name ${name} in full. TechCrunch reports that an Anthropic spokesperson said Anthropic did not acquire Humanloop’s assets or intellectual property; no acquisition of the company, its assets or its IP is stated. The record does not establish a title, a start date or a continuing role.`,
  });
  addEvidence(c, {
    id: `lg2-ev-dl-${who}-anthropic-humanloop`,
    sourceId: 'lg2-src-humanloop-joins-anthropic',
    sourceRole: 'primary',
    support: 'supports',
    locator: 'Announcement, first sentence and signature',
    passageType: 'paraphrase',
    passage:
      'Humanloop announces that the Humanloop team is joining Anthropic; the announcement is signed by Raza, Jordan and Peter and the whole Humanloop team.',
    anchor: 'the Humanloop team is joining Anthropic',
  });
  addEvidence(c, humanloopContext(who));
}
patch('dl', 'lg2-dl-habib-anthropic-2025', {
  qualification:
    'The person-level record rests on reporting; Humanloop’s own announcement says that its team is joining Anthropic and is signed by the three co-founders’ first names. TechCrunch reports that an Anthropic spokesperson said Anthropic did not acquire Humanloop’s assets or intellectual property; no acquisition of the company, its assets or its IP is stated. The record does not establish a title, a start date or a continuing role.',
});
{
  const c = patch('dl', 'lg2-dl-edwards-groq-ceo-2025', {
    qualification:
      'An announced appointment; the record does not establish a start date or a continuing role. CNBC described Edwards the same day as Groq’s finance chief; that earlier role is not recorded as a separate record.',
  });
  addEvidence(c, {
    id: 'lg2-ev-dl-edwards-groq-ceo-2025-cnbc',
    sourceId: 'lg2-src-cnbc-nvidia-groq-2025',
    sourceRole: 'secondary',
    support: 'context',
    locator: 'Paragraph relaying Groq’s blog post',
    passageType: 'quote',
    passage: 'led by finance chief Simon Edwards as CEO',
  });
}
{
  const c = claim('dl', 'lg2-dl-ross-groq-ceo-2025');
  addEvidence(c, {
    id: 'lg2-ev-dl-ross-groq-ceo-2025-groq',
    sourceId: 'lg2-src-groq-nvidia-2025',
    sourceRole: 'primary',
    support: 'context',
    locator: 'Paragraphs 2–3',
    passageType: 'paraphrase',
    passage:
      'Groq’s announcement calls Jonathan Ross its founder, says he will join Nvidia, and names Simon Edwards as stepping into the CEO role.',
    anchor: 'will join Nvidia',
  });
}

// ------------------------------------------------------------------ cn

for (const [id, s1, s2] of [
  ['lg2-cn-zhipu-round-b2', 'July 2023', 'August 2023'],
  ['lg2-cn-zhipu-round-b3', 'November 2023', 'January 2024'],
]) {
  const c = claim('cn', id);
  const base =
    'The amount is the total consideration in the prospectus’s table of subscriptions for new registered capital in this round; transfers of existing registered capital between shareholders in the same period are listed separately and are not included. The prospectus’s text layer interleaves table columns; the total was read from the row labelled “Total”. A company filing records what the company states; the record does not independently verify payment.';
  c.qualification = `${base} The prospectus divides the round into Stage 1 (completed in ${s1}) and Stage 2 (completed in ${s2}); the date is the completion of the round as a whole.`;
}
{
  const c = claim('cn', 'lg2-cn-zhipu-round-b6-3-4');
  Object.assign(evidence(c, 'lg2-ev-cn-zhipu-round-b6-3-4'), {
    passage:
      'We completed the series B6-3 (the “Series B6-3 Financing”), series B6-3+ … and series B6-4 financing … in May 2025.',
  });
  c.qualification =
    'The amount is the total consideration in the prospectus’s table of subscriptions for new registered capital in the three named financings (B6-3, B6-3+ and B6-4); transfers of existing registered capital between shareholders in the same period are listed separately and are not included. The prospectus’s text layer interleaves table columns; the total was read from the row labelled “Total”. A company filing records what the company states; the record does not independently verify payment. The table includes subscribers listed under “Series B6 Convertible Notes”, whose notes were issued under agreements of September 2024 to March 2025 and converted on 29 May 2025; the total therefore is not new money raised in May 2025 alone.';
}

// Coordinator decision 6: participation through a subscriber vehicle is an inference.
{
  const c = patch('cn', 'lg2-cn-zhipu-meituan-b2', {
    derivation: 'inferred',
    inferenceRationale:
      'Premises: (1) the prospectus names Tianjin Sankuai Technology Co., Ltd. as the subscriber in Stage 1 of the Series B2 financing (p. 117); (2) the prospectus states that Tianjin Sankuai is wholly owned by Meituan (p. 130). Therefore Meituan participated in the round through Tianjin Sankuai. The prospectus does not itself say that Meituan subscribed.',
    qualification:
      'The prospectus names Tianjin Sankuai, a wholly owned subsidiary of Meituan, as the subscriber; the attribution to Meituan is inferred from that ownership (see the rationale). The record attributes no amount to Meituan (the table’s column order is garbled in the text layer) and does not say that Meituan led the round.',
  });
  void c;
}
patch('cn', 'lg2-cn-zhipu-ant-b3', {
  derivation: 'inferred',
  inferenceRationale:
    'Premises: (1) the prospectus names Shanghai Yunya Enterprise Management Consulting Co., Ltd. among the subscribers in the Series B3 financing (p. 118); (2) it describes Shanghai Yunya as an investment vehicle of Ant Group Co., Ltd. (p. 131) and states that under the SFO Ant Group is deemed to be interested in the shares held by Shanghai Yunya (p. 240). Therefore Ant Group participated in the round through Shanghai Yunya. The prospectus does not itself say that Ant Group subscribed.',
  qualification:
    'The subscriber is Shanghai Yunya; the attribution to Ant Group is inferred from the prospectus’s description of Shanghai Yunya as Ant Group’s investment vehicle (see the rationale). The record attributes no amount to Ant Group and does not establish in which stage (November 2023 or January 2024) Shanghai Yunya subscribed.',
});
{
  const c = patch('cn', 'lg2-cn-zhipu-ant-b5', {
    derivation: 'inferred',
    inferenceRationale:
      'Premises: (1) the prospectus names Shanghai Feiya among the subscribers in the Series B5 financing (p. 120); (2) it states that Shanghai Feiya is wholly owned by Ant Unicorn Fund, L.P., whose general partner is an indirect wholly owned subsidiary of Ant Group (p. 132), and that under the SFO Ant Group is deemed to be interested in the shares held by Shanghai Feiya (p. 240). Therefore Ant Group participated in the round through Shanghai Feiya. The prospectus does not itself say that Ant Group subscribed.',
    qualification:
      'The subscriber is Shanghai Feiya; the attribution to Ant Group is inferred from the ownership chain the prospectus gives (see the rationale). Shanghai Feiya appears in two rows of the Series B5 table with the same figures; the record attributes no amount to Ant Group and does not establish in which sub-round (B5-1, B5-2 or B5-3) each subscription was made.',
  });
  evidence(c, 'lg2-ev-cn-zhipu-ant-b5').locator =
    'History, Development and Corporate Structure — Series B5 Financing (p. 120), table of subscribers; Shanghai Feiya appears in two rows with the same figures';
  addEvidence(c, {
    id: 'lg2-ev-cn-zhipu-ant-b5-3',
    sourceId: 'lg2-src-zhipu-prospectus-en',
    sourceRole: 'primary',
    support: 'supports',
    locator:
      'Substantial Shareholders, note on Shanghai Yunya and Shanghai Feiya (p. 240)',
    passageType: 'quote',
    passage:
      'under the SFO, Ant Group is deemed to be interested in the Shares held by Shanghai Yunya and Shanghai Feiya',
  });
}

patch('cn', 'lg2-cn-luo-fuli-xiaomi-mimo-2025-11', {
  statement:
    'Jiemian reported on 12 November 2025 that, according to The Paper’s report that day, Luo Fuli had posted on WeChat Moments that she was at Xiaomi MiMo.',
  time: {
    note: 'Date of the report relayed (12 November 2025); the post’s own date is not given. Not a start date.',
  },
});
patch('cn', 'lg2-cn-luo-fuli-deepseek-prior', {
  qualification:
    'The record rests on reporting: Jiemian introduces the career passage as a summary of public information (“公开资料显示”) without naming a source. It does not establish the dates of the DeepSeek role or of her departure, and no departure announcement was located.',
});

const NOTE_36KR =
  '36Kr’s republished commentary lists its sources only in general terms (Baichuan’s official releases and statements, public evaluation data, public talks, interviews with several unnamed people familiar with the matter, and Wang Xiaochuan’s public remarks) and does not attribute each item of its timeline.';
patch('cn', 'lg2-cn-hong-tao-baichuan-cofounder', {
  qualification:
    'The record rests on reporting (Jiemian); no Baichuan text naming him as co-founder was retrieved.',
});
patch('cn', 'lg2-cn-hong-tao-baichuan-departure-2024', {
  attributes: { stage: 'effective' },
  qualification: `The record rests on reporting: Jiemian relays a 36Kr report of December 2024 (not retrieved) and a reply from Baichuan confirming the departure, whose stated reason is left out. The departure is known from reporting and the company’s reply as relayed, not from an announcement. ${NOTE_36KR}`,
});
patch('cn', 'lg2-cn-jiao-ke-baichuan-cofounder', {
  qualification:
    'The record rests on reporting: Jiemian relays Lanjing News’s report of 17 March 2025, which was not retrieved.',
});
patch('cn', 'lg2-cn-jiao-ke-baichuan-departure-2025', {
  attributes: { stage: 'effective' },
  qualification: `${OPEN_REPORTED} The record rests on reporting: Jiemian relays Lanjing News’s report of the same day (not retrieved), which cites unnamed people familiar with the matter (知情人士); Jiemian stated that Baichuan had not responded officially when it published. Reports on his next venture are left out.`,
});
patch('cn', 'lg2-cn-chen-weipeng-baichuan-cofounder', {
  qualification:
    'The record rests on reporting: Jiemian relays Lanjing News’s report of 17 March 2025, which was not retrieved.',
});
{
  const c = patch('cn', 'lg2-cn-chen-weipeng-baichuan-departure-2025', {
    qualification: `${OPEN_REPORTED} The record rests on reporting of a pending departure (“也将离职”): Jiemian relays Lanjing News’s report (not retrieved), which cites unnamed people familiar with the matter (知情人士); Baichuan had not commented when Jiemian published. 36Kr’s republished commentary of 24 July 2026 later states that he left in March 2025 (context, not support for the announcement). ${NOTE_36KR}`,
  });
  evidence(c, 'lg2-ev-cn-chen-weipeng-baichuan-departure-2025-2').support =
    'context';
}
{
  const c = patch('cn', 'lg2-cn-xie-jian-baichuan-cofounder', {
    statement:
      'Huxiu, republishing Sina Tech’s “BUG” column on 17 July 2025, described Xie Jian as a technical co-founder of Baichuan Intelligence; 36Kr, republishing a Bowang Caijing commentary on 24 July 2026, used the same designation.',
    qualification: `The record rests on reporting: a contemporaneous column republished by Huxiu and a later republished commentary. No Baichuan text naming him as co-founder was retrieved. ${NOTE_36KR}`,
  });
  addEvidence(c, {
    id: 'lg2-ev-cn-xie-jian-baichuan-cofounder-huxiu',
    sourceId: 'lg2-src-huxiu-xie-jian-2025',
    sourceRole: 'secondary',
    support: 'supports',
    locator: 'Opening paragraph',
    passageType: 'quote',
    passage: '近日有消息称，百川智能技术联合创始人谢剑可能离职。',
  });
}
{
  const c = patch('cn', 'lg2-cn-xie-jian-baichuan-departure-2025', {
    qualification: `${OPEN_REPORTED} The record rests on a republished commentary’s retrospective timeline (36Kr, 24 July 2026). A contemporaneous column of 17 July 2025 (Sina Tech’s “BUG”, republished by Huxiu) reports only that he might leave, citing an unnamed person close to Baichuan’s senior management, and says that neither Baichuan nor Xie had responded. ${NOTE_36KR}`,
  });
  addEvidence(c, {
    id: 'lg2-ev-cn-xie-jian-baichuan-departure-2025-huxiu',
    sourceId: 'lg2-src-huxiu-xie-jian-2025',
    sourceRole: 'secondary',
    support: 'context',
    locator: 'Opening paragraphs',
    passageType: 'quote',
    passage: '近日有消息称，百川智能技术联合创始人谢剑可能离职。',
  });
  addEvidence(c, {
    id: 'lg2-ev-cn-xie-jian-baichuan-departure-2025-huxiu-2',
    sourceId: 'lg2-src-huxiu-xie-jian-2025',
    sourceRole: 'secondary',
    support: 'context',
    locator: 'Second paragraph',
    passageType: 'quote',
    passage: '截至发稿，百川智能及谢剑均未回应。',
  });
}
patch('cn', 'lg2-cn-ru-liyun-baichuan-cofounder', {
  qualification: `The record rests on a republished commentary piece. ${NOTE_36KR}`,
});
patch('cn', 'lg2-cn-ru-liyun-baichuan-departure-2026', {
  attributes: { stage: 'effective' },
  qualification: `${OPEN_REPORTED} The record rests on a republished commentary piece; no Baichuan announcement was located. ${NOTE_36KR} The commentary’s statements on his next role and on reasons are left out.`,
});
patch('cn', 'lg2-cn-dai-zonghong-01ai-cofounder', {
  qualification:
    'The record rests on reporting that relays 01.AI’s reply to a 36Kr report; no 01.AI text naming him as co-founder was retrieved directly.',
});
patch('cn', 'lg2-cn-dai-zonghong-01ai-departure-2025', {
  attributes: { stage: 'effective' },
  qualification:
    'The record rests on reporting: Jiemian relays a 36Kr report (not retrieved) and 01.AI’s reply, which confirms that he had started a new company some months earlier but is not itself an announcement of his departure. Investment in his new company is left out.',
});
{
  const c = patch('cn', 'lg2-cn-moonshot-round-c-2025', {
    statement:
      'Moonshot AI CEO Yang Zhilin wrote in an internal letter, reproduced in full by Lanjing News on 31 December 2025, that the company had recently completed a USD 500 million Series C round.',
    qualification:
      'The letter is known from Lanjing’s reproduction of its full text; the original was not retrieved separately. The letter’s remark that the round was heavily oversubscribed (大幅超募) is its own and does not mean that more than USD 500 million was raised; the amount is recorded as stated. Lanjing names no investors, and none is recorded.',
  });
  Object.assign(evidence(c, 'lg2-ev-cn-moonshot-round-c-2025'), {
    locator:
      'Lanjing’s reproduction of the full letter (after “以下是杨植麟的内部信全文”), paragraph beginning “得益于上述突破”',
    passage: '公司近期完成了5亿美元C轮融资且大幅超募',
  });
}

// ------------------------------------------------------------------ nl

// Coordinator decision 3: the SSI release becomes evidence for the existing dataset record.
docs.nl.evidenceForExisting = [
  {
    existingClaimId: 'ilya-sutskever-ssi-cofounder-2024',
    note: 'The joint SSI–NVIDIA release identifies Sutskever as cofounder and CEO of SSI; proposed as additional primary evidence for the existing record, which rests on Reuters (dropped draft record lg2-nl-sutskever-ssi-cofounder-primary).',
    evidence: {
      id: 'lg2-ev-nl-existing-sutskever-ssi-cofounder',
      sourceId: 'lg2-src-ssi-nvidia-2026',
      sourceRole: 'primary',
      support: 'supports',
      locator: 'Paragraph 4 (quotation attribution)',
      passageType: 'quote',
      passage: 'said Ilya Sutskever, cofounder and CEO of SSI.',
      checkedAt: CHECKED,
    },
    source: 'lg2-src-ssi-nvidia-2026',
  },
];

for (const [slug, name] of [
  ['yash-patil', 'Yash Patil'],
  ['rhythm-garg', 'Rhythm Garg'],
  ['linden-li', 'Linden Li'],
]) {
  const tc = evidence(
    claim('nl', `lg2-nl-${slug}-applied-compute-founder`),
    `lg2-ev-nl-${slug}-applied-compute-founder-c`,
  );
  const prior = patch('nl', `lg2-nl-${slug}-openai-researcher-prior`, {
    qualification: `A company statement of a founder’s earlier role; it gives no start or end date. The post gives first names only; the full name ${name} rests on TechCrunch, which reports the founders’ names as reported by Upstarts Media.`,
  });
  const { checkedAt, ...rest } = tc;
  void checkedAt;
  addEvidence(prior, {
    ...rest,
    id: `lg2-ev-nl-${slug}-openai-researcher-prior-c`,
    support: 'context',
  });
  patch('nl', `lg2-nl-${slug}-applied-compute-founder`, {
    qualification:
      'The company text gives first names only; the full name rests on TechCrunch, which names the three founders as reported by Upstarts Media. No founding date or title is established.',
  });
}

patch('nl', 'lg2-nl-ricursive-series-a-2026', {
  statement:
    'TechCrunch reported on 26 January 2026 that Ricursive Intelligence had raised $300 million in a Series A round the company said was led by Lightspeed.',
  qualification:
    'The record rests on reporting (TechCrunch, 26 January and 16 February 2026); no company announcement of the round was retrieved. It does not establish closing or the split between investors.',
});
{
  const seedNote =
    'TechCrunch reported on 26 January 2026 that the company formally launched with a seed investment led by Sequoia about two months before the Series A, and on 16 February 2026 that the seed round came a couple of months before it; no date is given.';
  const seed = patch('nl', 'lg2-nl-ricursive-seed', {
    time: { note: seedNote },
  });
  addEvidence(seed, {
    id: 'lg2-ev-nl-ricursive-seed-b',
    sourceId: 'lg2-src-tc-ricursive-seriesa-2026',
    sourceRole: 'secondary',
    support: 'context',
    locator: 'Paragraph 2',
    passageType: 'quote',
    passage:
      'The Series A comes just two months since the company formally launched with a seed investment led by Sequoia.',
  });
  patch('nl', 'lg2-nl-ricursive-seed-sequoia', { time: { note: seedNote } });
}
for (const id of [
  'lg2-nl-anna-goldie-ricursive-founder',
  'lg2-nl-azalia-mirhoseini-ricursive-founder',
])
  patch('nl', id, {
    qualification:
      'The record rests on reporting (TechCrunch); no company text naming the founders was retrieved. No founding date is established.',
  });
patch('nl', 'lg2-nl-noah-goodman-humansand-founder', {
  qualification:
    'The record rests on reporting (TechCrunch, relaying The New York Times and the company); the report says the founders “include” the people named, so it does not establish a complete roster or a founding date. Other descriptions of his role were not checked.',
});
for (const id of [
  'lg2-nl-humansand-seed-2026-sv-angel',
  'lg2-nl-humansand-seed-2026-nvidia',
  'lg2-nl-humansand-seed-2026-gv',
  'lg2-nl-humansand-seed-2026-emerson-collective',
]) {
  const c = claim('nl', id);
  const base = c.qualification.replace(
    / TechCrunch’s round link follows The New York Times’s report\.$/,
    '',
  );
  c.qualification = `${base} TechCrunch’s round link follows The New York Times’s report.`;
}

// The schema's activityStage has no "effective" value: a departure stated as effective
// carries no stage (only prospective ones are announced); its statement and time note say so.
for (const g of GROUPS)
  for (const c of docs[g].claims ?? [])
    if (c.attributes?.stage === 'effective') delete c.attributes.stage;

// ------------------------------------------------------------------ write

// Written in the repository's Prettier style, so a second run leaves the files byte-identical.
const prettier = await import('prettier');
for (const g of GROUPS) {
  const file = join(DRAFTS, `${g}.json`);
  const options = (await prettier.resolveConfig(file)) ?? {};
  writeFileSync(
    file,
    await prettier.format(JSON.stringify(docs[g], null, 2), {
      ...options,
      filepath: file,
    }),
  );
}
console.log('corrections applied to', GROUPS.join(', '));
