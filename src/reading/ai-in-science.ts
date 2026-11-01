import type { PropositionsCollection } from '../domain/propositions';
import { aiInScienceFrame as frame } from './proposition-frames';

const admitted = '2026-10-31';

/**
 * "AI in science" (maintainer decision of 2026-10-30, question 2 of
 * review/ai-in-biology-pack-2026-10-30.md): one collection, field by field,
 * with biology as its first and only section for now. This definition orders
 * the attributed claims; the institutions, papers and people of each field
 * are dataset records reached from their own pages.
 */
export const aiInScience: PropositionsCollection = {
  id: frame.id,
  version: frame.version,
  title: frame.title,
  question: frame.question,
  editorialStatus: frame.editorialStatus,
  introduction:
    'The collection records AI in the sciences field by field: the institutions and programmes, the models and papers, the people credited with them and the claims made about what AI does to the field. It is not a survey of any field. Biology is the first field recorded. This page sets out the claims. Each is a proposition with one criterion, phrased generically and attributed to no one. A text that meets the criterion articulates the proposition. A text that disputes it contests it. A text that comes close bears on it, and its record names what is missing. The institutions, papers and people are recorded as dated statements of the documents that state them, on their own pages. Texts are listed in date order, and the order records no influence between them.',
  groups: frame.groups,
  searchNote: {
    scope:
      'The collection records what located texts say about six propositions on AI in biology. The propositions were written before the search, each with one criterion. “Earliest located” means the earliest text found by the searches below. It is not a claim that no earlier text exists.',
    venues: [
      {
        period: 'Biology, texts from 1987 to 2026',
        items: [
          'Europe PMC searches by title and abstract terms, sorted by date, for structure prediction with drug design (1960–1995), “virtual cell” and whole-cell models with machine learning (1960–2023), and the other propositions’ terms; then the core records for abstracts and dates.',
          'Article pages on nature.com, arXiv abstract pages and the bioRxiv records, retrieved directly.',
          'Company newsrooms and releases: Sumitomo Dainippon Pharma and Exscientia, Insilico Medicine, Isomorphic Labs, EvolutionaryScale and Google DeepMind.',
          'Several texts were looked up by title as candidates rather than found by the term searches. Such lookups find what is already known and favour well-cited texts.',
          'Sources were retrieved directly by script on 2026-10-30.',
        ],
      },
      {
        period: 'A cross-family check, 2026-10-30',
        items: [
          'A model from another family answered each proposition blind from its criterion and searched for earlier texts, then compared its answers with the records.',
          'It located earlier texts for two propositions, a 1990 paper on cell signalling and a 2013 company announcement of a trial, which hold those roles from the admission of 2026-10-31. For two others it located earlier candidates whose fit to the criterion is unsettled, so no earliest located text is named for them yet.',
        ],
      },
    ],
    methods: [
      'Every quotation was compared with the retrieved text of its own source. Paraphrases are labelled as such.',
      'Abstracts read in PubMed or Europe PMC records are the authors’ own text. The publishers’ pages of several papers refused retrieval, and the check read their dates in Internet Archive captures.',
      'Each record was applied against its proposition’s criterion as worded. A text that argues something adjacent bears on the proposition and its record says what is missing.',
      'A fresh-context machine audit by Claude models re-read a sample of 72 records of the research pack, and a check by an OpenAI GPT model re-examined 120 items. No person has reviewed the records.',
    ],
    gaps: [
      'The searches for the virtual-cell, protein-design and information propositions were weakly bounded. Two 2019 preprints on protein design were read only by the check.',
      'The check read the main text of the 2024 analysis of clinical-trial success rates through an author-uploaded copy relayed by a web reader; the publisher’s text and its supplementary tables were not read.',
      'Not searched: clinical-trial registries, conference talks, patents and texts not in English.',
      'Other sciences are not yet recorded.',
    ],
    corrections:
      'A text found later that is earlier than an earliest located text becomes the new earliest located text, and the earlier headline stays on record as a correction.',
  },
  corrections: [
    {
      propositionId: 'aib-prop-ai-virtual-cell',
      replaced:
        'Ma and others in Nature Methods (5 March 2018), headlined as earliest located by the research pack of 2026-10-30.',
      reason:
        'Earlier text found by the cross-family check: Bray’s paper of 22 March 1990, which describes how a parallel distributed processing network could simulate a cell signalling pathway. The criterion covers a cell’s responses and does not require a whole-cell model.',
      claimIds: ['aib-arg-p2-ma-2018', 'aib-arg-p2-bray-1990'],
      recordedAt: admitted,
    },
    {
      propositionId: 'aib-prop-ai-drug-candidate-in-trials',
      replaced:
        'The release of Sumitomo Dainippon Pharma and Exscientia of 30 January 2020, headlined as earliest located by the research pack of 2026-10-30.',
      reason:
        'Earlier text found by the cross-family check: Berg’s release of 21 November 2013, which announces a trial of a compound it describes as discovered with an AI-based platform. It is the company’s own statement.',
      claimIds: ['aib-arg-p3-sumitomo-2020', 'aib-arg-p3-berg-2013'],
      recordedAt: admitted,
    },
    {
      propositionId: 'aib-prop-ml-designs-new-proteins',
      replaced:
        'The preprint of 23 July 2020 on protein design by network hallucination, headlined as earliest located by the research pack of 2026-10-30.',
      reason:
        'The cross-family check located earlier candidates, from 1994 and 2018, whose fit to the criterion is unsettled. No text holds the role until the criterion is decided.',
      claimIds: ['aib-arg-p4-anishchenko-2020'],
      recordedAt: admitted,
    },
    {
      propositionId: 'aib-prop-biology-as-information-for-ai',
      replaced:
        'The Isomorphic Labs launch article of November 2021, headlined as earliest located by the research pack of 2026-10-30.',
      reason:
        'The cross-family check located an earlier candidate, a 1988 conference paper that treats genetic information as a knowledge representation for symbolic AI, whose fit to the criterion is unsettled. No text holds the role until the criterion is decided.',
      claimIds: ['aib-arg-p5-isomorphic-2021'],
      recordedAt: admitted,
    },
  ],
  limits: [
    '“Earliest located” means the earliest text found by the searches described under “How we searched”. It is not a claim of first use or first statement.',
    'A record documents what a text says. It is not evidence that the proposition is true, that any model can do what a text says, or that any drug works.',
    'A company’s statement that a drug candidate entered a trial, or of how it was found, is the company’s. No trial registry was read.',
    'The first criterion is not limited to machine learning: computational prediction of protein structure predates it, and the earliest located text shows this.',
    'A machine selected and classified these records, and machine checks from two model families re-examined them. No person has reviewed them.',
  ],
  axis: frame.axis,
  landing: frame.landing,
  landingAction: frame.landingAction,
  mostDevelopedEmpty: frame.mostDevelopedEmpty,
};
