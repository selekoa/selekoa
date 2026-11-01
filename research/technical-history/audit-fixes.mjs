// The integrator's dispositions of the same-family audit (2026-10-29), applied to the drafts.
// Each change names the audit finding it answers; audit.md lists them with reasons.
// Usage: node research/technical-history/audit-fixes.mjs   (idempotent: re-running changes nothing)
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const DIR = join(dirname(fileURLToPath(import.meta.url)), 'drafts');
const FILES = {
  A: 'symbolic-search-logic.json',
  B: 'neural-deep-learning.json',
  C: 'transformers-llm-systems.json',
  D: 'probabilistic-evolutionary-rl-statistical-hybrid.json',
  E: 'agi-superintelligence-ai-terms.json',
};
const drafts = Object.fromEntries(
  Object.entries(FILES).map(([k, f]) => [
    k,
    JSON.parse(readFileSync(join(DIR, f), 'utf8')),
  ]),
);
const DATE = '2026-10-29';
const claim = (g, id) => {
  const c = drafts[g].claims.find((c) => c.id === id);
  if (!c) throw new Error(`no claim ${id} in ${g}`);
  return c;
};
const entity = (g, id) => {
  const e = drafts[g].entities.find((e) => e.id === id);
  if (!e) throw new Error(`no entity ${id} in ${g}`);
  return e;
};
const doc = (g, id) => {
  const d = drafts[g].documents.find((d) => d.id === id);
  if (!d) throw new Error(`no document ${id} in ${g}`);
  return d;
};
const addEvidence = (c, ev) => {
  if (!c.evidence.some((e) => e.passage === ev.passage)) c.evidence.push(ev);
};
const addOnce = (arr, x, key) => {
  if (!arr.some((y) => y[key] === x[key])) arr.push(x);
};
// Rule R1 (integrator, 2026-10-29): an earliest-located role needs wording read in the text
// itself and dated by that text. Where an earlier lead is known only as an unread index title,
// a citation in another text, or an undated later copy, the role is withheld (as in schema 2.16)
// with the reason naming the leads; the record that held it becomes a use.
function withhold(g, conceptId, recordId, reason, leads) {
  const e = entity(g, conceptId);
  e.withheld = {
    role: 'earliest-located-term',
    reason,
    leads,
    recordedAt: DATE,
  };
  const c = claim(g, recordId);
  c.attributes.term.roles = ['use'];
  addOnce(
    (e.corrections ??= []),
    {
      date: DATE,
      from: recordId,
      to: 'withheld',
      reason: `Same-family audit: ${reason}`,
    },
    'from',
  );
  if (!c.qualification.includes('withheld on'))
    c.qualification = `Held the earliest-located role in the draft; the role is withheld on ${DATE} (see the concept's note). ${c.qualification.replace(
      /^Earliest located(?: use)?(?: in [^,]*?)? by (?:this group's |this pack's |the recorded |this group's bounded |the )?(?:bounded )?(?:index )?search(?: recorded on [a-z-]+)?/i,
      'Found by the recorded search',
    )}`;
}

// --- 'artificial general intelligence' (E) ---------------------------------------------
{
  const c = claim('E', 'th-term-agi-gubrud-1997');
  c.statement =
    "Gubrud's paper for the Fifth Foresight Conference on Molecular Nanotechnology (November 1997) uses 'artificial general intelligence' for AI systems that rival or surpass the human brain in complexity and speed.";
  addEvidence(c, {
    source: 'e-gubrud-1997-paper',
    locator: "Section 'Artificial intelligence as a factor'",
    passage:
      'By advanced artificial general intelligence, I mean AI systems that rival or surpass the human brain in complexity and speed, that can acquire, manipulate and reason with general knowledge',
    passageType: 'quote',
    sourceRole: 'primary',
    support: 'supports',
    note: 'The definition that carries the statement’s sense (audit A).',
  });
  c.attributes.term.attested =
    'undated: the Foresight Archives’ current copy, retrieved 2026-10-29';
  withhold(
    'E',
    'th-term-agi',
    'th-term-agi-gubrud-1997',
    'Gubrud (1997) is read only in the Foresight Archives’ current, undated copy; under the editorial policy a text known only from an undated later copy cannot be earliest located. A 1997–1998 capture of http://www.foresight.org/Conferences/MNT05/Papers/Gubrud/ (or the conference’s printed proceedings) would decide the role. Goertzel (2011) separately reports a 1997 article by Gubrud.',
    [
      'th-gubrud-1997 (capture of the original address)',
      'texts before 1997 not reached by this search (books, magazines, Usenet)',
    ],
  );
}
{
  const c = claim('E', 'th-credit-goertzel-2011-gubrud');
  c.statement = c.statement.replace(
    /the term ['‘]AGI['’]/,
    'the term (in context, “Artificial General Intelligence”)',
  );
  if (!/does not name the article/.test(c.qualification))
    c.qualification +=
      ' The post does not name the article; Gubrud’s paper uses the full phrase, not the abbreviation.';
}
{
  const c = claim('E', 'th-credit-goertzel-2011-self');
  c.statement =
    'In his 2011 post Goertzel says he is responsible for spreading the term AGI around the world and “did sort of commission its creation”, but did not coin the phrase.';
  c.attributes.credit.contribution =
    'spreading the term AGI and, by his account, commissioning its creation; disclaiming its coinage';
  c.evidence = [
    {
      source: 'e-goertzel-2011-who-coined',
      locator: 'Second paragraph of the post',
      passage:
        'Goertzel writes that he is the one responsible for spreading the term around the world.',
      passageType: 'paraphrase',
      sourceRole: 'primary',
      support: 'supports',
      note: 'Paraphrased to keep the post within its quotation limit.',
    },
    {
      source: 'e-goertzel-2011-who-coined',
      locator: 'Second paragraph of the post',
      passage:
        'and I did sort of commission its creation! But I didn’t actually coin the phrase',
      passageType: 'quote',
      sourceRole: 'primary',
      support: 'supports',
      note: 'Follows the post’s own ellipsis after “around the world”; the draft’s quotation had dropped this clause (audit B).',
    },
  ];
}
{
  const c = claim('E', 'th-term-agi-goertzel-wang-2007');
  c.time = {
    ...c.time,
    basis: 'claimed',
    note: 'Year as Legg and Hutter’s reference list gives it (claimed); the volume was not read.',
  };
}
{
  const c = claim('E', 'th-term-ai-dartmouth-1955');
  const ev = c.evidence[1];
  ev.passage =
    'The opening paragraph proposes a 2 month, 10 man study of artificial intelligence during the summer of 1956 at Dartmouth College; the next line introduces the list that follows as some aspects of "the artificial intelligence problem".';
  ev.note = 'Read from the page image of the annotated facsimile (audit A).';
}
for (const g of ['B', 'E'])
  for (const s of drafts[g].sources.filter((s) => /dartmouth-1955/.test(s.key)))
    if (!/handwritten/.test(s.version))
      s.version +=
        ' The facsimile carries handwritten annotations from PDF p. 3 on.';

// --- 'machine learning' (D) --------------------------------------------------------------
{
  const c = claim('D', 'th-ml-campaigne-1959');
  c.attributes.term.sense = 'unverified';
  withhold(
    'D',
    'th-term-machine-learning',
    'th-ml-campaigne-1959',
    'Campaigne’s paper (Western Joint Computer Conference, 3–5 March 1959) is known here only from its title as indexed by Crossref; its text was not read (ACM refused), so its sense is unverified. Its text decides the role; if it does not meet the criterion, the earliest located text read is Samuel (IBM Journal, July 1959).',
    ['Campaigne 1959 (ACM Digital Library, doi 10.1145/1457838.1457868)'],
  );
}

// --- Families --------------------------------------------------------------------------
withhold(
  'B',
  'th-fam-connectionism',
  'th-cn-name-dartmouth-1955',
  'Titles before 1955 found by a Crossref search name nets of neurons as formal models: W. Pitts, “The linear theory of neuron networks: The static problem” (Bull. Math. Biophys., 1942); H. D. Landahl, “A note on neural nets” (1944); Landahl and Runge, “Outline of a matrix calculus for neural nets” (1946); D. Studley, “Algebra of neural nets” (1949); A. Rapoport, “Contribution to the probabilistic theory of neural nets” (1950). None was read, so whether each meets the criterion (a model of computation, memory or learning, not a physiological description) is open.',
  [
    'Pitts 1942',
    'Landahl 1944',
    'Landahl and Runge 1946',
    'Studley 1949',
    'Rapoport 1950',
    'Minsky 1954 (dissertation)',
  ],
);
withhold(
  'D',
  'th-fam-evolutionary',
  'th-evo-burgin-1973',
  'Koza (1990), quoted in th-evo-koza-fogel, cites Fogel, Owens and Walsh, Artificial Intelligence through Simulated Evolution (1966), whose title names a listed name; the book was not read. Burgin’s 1973 title is itself known only from Crossref. The 1958–1967 texts cited for the family (Friedberg, Bremermann, Rechenberg, Holland) were not reached.',
  [
    'Fogel, Owens and Walsh 1966 (as cited by Koza 1990)',
    'Holland 1962',
    'Rechenberg 1965',
  ],
);
{
  const c = claim('D', 'th-evo-burgin-1973');
  c.attributes.term.sense = 'unverified';
}
withhold(
  'D',
  'th-fam-statistical-learning',
  'th-stat-cortes-vapnik-1995',
  'Cortes and Vapnik (1995) is known here only from its title as indexed; Boser, Guyon and Vapnik (COLT 1992, “optimal margin classifiers”, one of the family’s listed names) is earlier and was not read, and Vapnik and Chervonenkis’s earlier work was not reached. Valiant (1984), read, does not use a listed name for the family.',
  [
    'Boser, Guyon and Vapnik 1992',
    'Vapnik and Chervonenkis (1960s–1970s, in Russian)',
  ],
);
withhold(
  'D',
  'th-fam-neurosymbolic',
  'th-ns-towell-1994-term',
  'Titles before 1992 found by a Crossref search name a hybrid of symbolic and connectionist models: Nenov and Dyer, “DETE: connectionist/symbolic model of visual and verbal association” (1988); J. Hendler, “Marker-passing over microfeatures: towards a hybrid symbolic/connectionist model” (Cognitive Science, 1989); Wermter and Lehnert, “A Hybrid Symbolic/Connectionist Model for Noun Phrase Understanding” (Connection Science, 1989); Kasabov (1990); Rose and Belew (1991). None was read.',
  ['Hendler 1989', 'Wermter and Lehnert 1989', 'Nenov and Dyer 1988'],
);
withhold(
  'A',
  'th-fam-search-planning',
  'th-sp-name-gps-1959',
  'Simon and Newell, “Heuristic Problem Solving: The Next Advance in Operations Research” (Operations Research 6(1), 1958), names heuristic problem solving in its title and is earlier; it was not read. The 1956 Logic Theory Machine report (RAND P-868) was read only on its opening page images and has no text layer, and the 1956–1957 Logic Theory papers in the IRE Transactions and the Western Joint Computer Conference were not reached.',
  [
    'Simon and Newell 1958 (Operations Research)',
    'Newell and Simon 1956 (RAND P-868, full text)',
    'Newell, Shaw and Simon 1957 (WJCC)',
  ],
);
withhold(
  'A',
  'th-fam-symbolic-ai',
  'th-sym-name-malhotra-1975',
  'Malhotra’s paper cites his MIT Sloan thesis of February 1975, “Design Requirements for a Knowledge-Based English Language System for Management: An Experimental Analysis” (reference 4, not read), which is earlier than the September 1975 conference; Buchanan and Shortliffe (1984) say the names came into general use about 1975, and the 1969–1974 Stanford DENDRAL and MYCIN reports were not searched.',
  [
    'Malhotra, February 1975 thesis (as cited)',
    'Stanford Heuristic Programming Project reports 1969–1974',
  ],
);
{
  const c = claim('A', 'th-sym-name-malhotra-1975');
  addEvidence(c, {
    source: 'a-malhotra-1975-ijcai',
    locator: 'PDF p. 2, left column',
    passage:
      'The paper says that each piece of work in a knowledge-based system has a significant amount of knowledge attached to it, without which it cannot be processed correctly.',
    passageType: 'paraphrase',
    sourceRole: 'primary',
    support: 'supports',
    note: 'Paraphrased because the two-column text layer interleaves the columns (audit A).',
  });
}

// --- 'large language model' (C): correction ----------------------------------------------
{
  const C = drafts.C;
  addOnce(
    C.sources,
    {
      key: 'c-hu-1996',
      cacheKey: 'b-audit-hu-1996',
      datasetSource: null,
      documentId: 'th-hu-turin-brown-1996',
      title: 'Language Modeling with Stochastic Automata',
      authorsAsPrinted: ['Jianying Hu', 'William Turin', 'Michael K. Brown'],
      publisher: 'ISCA Archive (ICSLP 96 proceedings)',
      url: 'https://www.isca-archive.org/icslp_1996/hu96_icslp.pdf',
      httpStatus: 200,
      sha256:
        'e37289026474f08587a9ece70be1ea9e6d70939d38958df6930426a665222303',
      retrievedAt: '2026-10-29',
      language: 'en',
      documentWords: { count: 3560, basis: 'PDF text layer' },
      version:
        'Proceedings paper as hosted by the ISCA Archive (doi 10.21437/ICSLP.1996-79); retrieved by the same-family audit (pass B).',
      kind: 'paper',
      archive: null,
    },
    'key',
  );
  addOnce(
    C.documents,
    {
      id: 'th-hu-turin-brown-1996',
      existing: 'new',
      title: 'Language Modeling with Stochastic Automata',
      subtype: 'Research paper',
      authorsAsPrinted: ['Jianying Hu', 'William Turin', 'Michael K. Brown'],
      publisherId: null,
      timeline: false,
      dates: [
        {
          kind: 'presentation',
          date: '1996-10',
          label: 'ICSLP 96, Philadelphia, 3–6 October 1996',
          source: 'c-hu-1996',
          locator: 'ISCA Archive record (doi 10.21437/ICSLP.1996-79)',
          passage:
            'The paper is in the proceedings of the Fourth International Conference on Spoken Language Processing (ICSLP 96), held in Philadelphia on 3–6 October 1996.',
          passageType: 'paraphrase',
          sourceRole: 'secondary',
          note: 'The conference dates are from the archive’s record, not printed on the paper.',
        },
      ],
      families: [],
      note: 'Found by the same-family audit through a Semantic Scholar abstract search and read in the ISCA Archive copy.',
    },
    'id',
  );
  addOnce(
    C.claims,
    {
      id: 'th-term-llm-hu-1996',
      group: 'transformers-llm-systems',
      section: 'terms',
      subject: 'th-hu-turin-brown-1996',
      predicate: 'uses_term',
      proposedPredicate: true,
      object: { kind: 'entity', entityId: 'th-term-large-language-model' },
      statement:
        'Hu, Turin and Brown (ICSLP 96) say that large language models are often required to achieve low perplexity with adequate coverage in speech and handwriting recognition.',
      time: {
        kind: 'event',
        date: '1996-10',
        basis: 'presentation',
        note: 'ICSLP 96, 3–6 October 1996.',
      },
      derivation: 'explicit',
      resolution: 'supported',
      qualification:
        'Earliest located by the recorded search after the audit’s correction; not evidence of coinage. The sense is statistical (stochastic language models distinguished by size), as for Brants et al. (2007).',
      extends: null,
      attributes: {
        term: {
          string: 'large language models',
          sense: 'meets',
          roles: ['earliest-located-term'],
          register: 'nonfiction',
          attested: null,
          claimed: null,
        },
      },
      evidence: [
        {
          source: 'c-hu-1996',
          locator: 'PDF p. 1, abstract',
          passage:
            'large language models are often required to achieve low model perplexity (or entropy) and still have adequate language coverage.',
          passageType: 'quote',
          sourceRole: 'primary',
          support: 'supports',
          note: null,
        },
      ],
    },
    'id',
  );
  const b = claim('C', 'th-term-llm-brants-2007');
  b.attributes.term.roles = ['use'];
  b.qualification =
    'Use. Held the earliest-located role in the draft; displaced on 2026-10-29 by Hu, Turin and Brown (1996). The sense is statistical: n-gram models with up to 300 billion n-grams, not neural networks. The paper uses the phrase as its title and in its conclusion; it does not define it.';
  const e = entity('C', 'th-term-large-language-model');
  addOnce(
    (e.corrections ??= []),
    {
      date: DATE,
      from: 'th-term-llm-brants-2007',
      to: 'th-term-llm-hu-1996',
      reason:
        'The same-family audit found Hu, Turin and Brown (ICSLP 96, October 1996) through a Semantic Scholar abstract search; the draft’s search had not covered the ISCA Archive of speech conferences.',
    },
    'from',
  );
  if (!/ISCA/.test(e.search.venues))
    e.search.venues +=
      ' After the audit: the ISCA Archive (ICSLP 96 found through Semantic Scholar’s abstract search); other speech venues (Eurospeech, ICASSP) were not searched systematically.';
}
{
  const c = claim('C', 'th-term-fm-bommasani-2021');
  addEvidence(c, {
    source: 'c-bommasani-v1',
    locator: 'PDF p. 1, abstract',
    passage:
      'AI is undergoing a paradigm shift with the rise of models (e.g., BERT, DALL-E, GPT-3) that are trained on broad data at scale and are adaptable to a wide range of downstream tasks.',
    passageType: 'quote',
    sourceRole: 'primary',
    support: 'supports',
    note: 'The sentence that “these models” refers to (audit B).',
  });
}
{
  const c = claim('C', 'th-fam-tllm-gpt4-def');
  addEvidence(c, {
    source: 'c-gpt4-v1',
    locator: 'PDF p. 2, section 2',
    passage:
      'The model was then fine-tuned using Reinforcement Learning from Human Feedback (RLHF)',
    passageType: 'quote',
    sourceRole: 'primary',
    support: 'supports',
    note: 'Audit B.',
  });
}
{
  const c = claim('C', 'th-fam-tllm-gpt2-uses-transformer');
  c.time = { ...c.time, basis: 'claimed' };
}

// --- Connectionism and deep learning (B) -------------------------------------------------
{
  const c = claim('B', 'th-cn-def-rosenblatt-1957');
  c.statement =
    'The preface of Rosenblatt’s report 85-460-1 (January 1957) says that the work was supported by the Cornell Aeronautical Laboratory’s internal research program, that its concepts came from the author’s research in physiological psychology aimed at a brain analogue, that the perceptron concept is “a recent product of this research program”, and that the current effort aims at the perceptron’s technical and economic feasibility.';
  c.object = {
    kind: 'literal',
    value:
      'The perceptron concept, from the author’s brain-analogue research, developed under the laboratory’s internal research program',
  };
  if (!/ambiguous/.test(c.qualification))
    c.qualification +=
      ' “This research program” in the preface is ambiguous between the laboratory’s programme and the author’s own research (audit A).';
}
{
  const c = claim('B', 'th-cn-credit-pdp8-parker');
  const ev = c.evidence[0];
  ev.note =
    'The text layer runs “learning-” and “logic” together across a line break; the page image prints “learning-” at the line end. The quotation follows the matched text layer; the printed form is “learning-logic” (audit B).';
}
{
  const B = drafts.B;
  const d = doc('B', 'th-schmidhuber-bp');
  addOnce(
    d.dates,
    {
      kind: 'event',
      date: '2025',
      label:
        'latest update the page states; the wording read is attested from this state',
      source: 'b-schmidhuber-bp',
      locator: 'page header and opening paragraph',
      passage:
        'The page states updates in 2020, 2022 and 2025 and refers to events of the 2020s; the wording read on 2026-10-29 is therefore at least 2020 wording, most likely of the 2025 update.',
      passageType: 'paraphrase',
      sourceRole: 'primary',
      note: 'Audit B: the records quoting the page are dated by this, not by 2014.',
    },
    'date',
  );
  for (const id of [
    'th-cn-credit-schmidhuberbp-linnainmaa',
    'th-cn-credit-schmidhuberbp-werbos',
  ]) {
    const c = claim('B', id);
    c.time = {
      kind: 'event',
      date: '2025',
      basis: 'claimed',
      note: 'Wording attested in the page as served on 2026-10-29, which states updates in 2020, 2022 and 2025; the page’s first version (2014) was not retrieved.',
    };
  }
  const w = claim('B', 'th-cn-credit-schmidhuberbp-werbos');
  if (!/2014 survey/.test(w.qualification))
    w.qualification +=
      ' The same author’s 2014 survey (arXiv v4, PDF p. 11) gave 1981 for the application and cited “preliminary, NN-specific discussion” in Werbos 1974, so the author’s own account changed between versions (audit B).';
  void B;
}
{
  const c = claim('B', 'th-dl-credit-schmidhuber2014-2006');
  c.attributes.credit.contribution =
    'unsupervised pre-training of deep feedforward networks, cited where the survey places the coinage of “Deep Learning” around 2006; the survey does not credit this paper with the term';
  if (!c.qualification.includes('not a credit for the term'))
    c.qualification +=
      ' The edge records a citation in that passage, not a credit for the term: the survey cites the paper for unsupervised pre-training (audit B).';
}

// --- Logic programming, neurosymbolic (A, D) ---------------------------------------------
{
  const d = doc('A', 'th-colmerauer-roussel-1992-birth-of-prolog');
  for (const x of d.dates)
    if (x.kind === 'publication' && x.date === '1992-11') {
      x.kind = 'event';
      x.label = 'date printed on the author-hosted text';
      x.note =
        'The date the text bears, not a publication date; the paper appeared in the HOPL-II proceedings (1993), which were not retrieved (audit B).';
    }
  const c = claim('A', 'th-lp-name-colmerauer-1992');
  c.time = {
    ...c.time,
    basis: 'claimed',
    note: 'Date printed on the author-hosted text (November 1992); published in the HOPL-II proceedings in 1993 (not retrieved).',
  };
}
{
  const c = claim('D', 'th-ns-garcez-lamb-credits-kautz');
  if (!/lecture/.test(c.qualification.slice(-120)))
    c.qualification +=
      ' The object th-kautz-2022 records the lecture (presented 2020-02-10) together with its 2022 article version; the credit is to the lecture (audit A).';
}

for (const [k, f] of Object.entries(FILES))
  writeFileSync(join(DIR, f), JSON.stringify(drafts[k], null, 2) + '\n');
console.log('audit fixes applied');
