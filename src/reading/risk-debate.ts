import type { PropositionsCollection } from '../domain/propositions';
import { riskDebateFrame as frame } from './proposition-frames';

const admitted = '2026-10-31';
const pack = 'the research pack of 2026-10-29';

export const riskDebate: PropositionsCollection = {
  id: frame.id,
  version: frame.version,
  title: frame.title,
  question: frame.question,
  editorialStatus: frame.editorialStatus,
  introduction:
    'Each argument is recorded as a proposition with one criterion. It is phrased generically and attributed to no one. A text that meets the criterion articulates the proposition. A text that disputes it, or a premise it depends on, contests it, and the record says whether the passage gives a reason or states the contrary only. A text that comes close bears on it, and its record names what is missing. A record says what one text states on its date. It does not place its author in a camp, and one author can have records that articulate and records that contest the same proposition. Texts are listed in date order; the order records no influence between them. The page records what texts say. It does not assess whether any argument is right.',
  groups: frame.groups,
  searchNote: {
    scope:
      'The collection records published texts dated from 2000 to October 2026 on sixteen propositions of its own and on two propositions it shares with the superintelligence collection (B1 and A4), whose earlier texts, from 1863, also appear here. “Earliest located” means the earliest text found by the searches below that meets the criterion. It is not a claim that no earlier text exists.',
    venues: [
      {
        period: 'Texts by named authors, 2000 to 2026',
        items: [
          'A starting list of authors, read in their own published texts: Nick Bostrom, Stuart Russell, Geoffrey Hinton, Yoshua Bengio, Stephen Omohundro, Paul Christiano, Evan Hubinger, Joseph Carlsmith, Richard Ngo, Dan Hendrycks, Yann LeCun, Anthony Zador, Gary Marcus, Emily M. Bender, Timnit Gebru, Robin Hanson, Steven Pinker, Andrew Ng, Marc Andreessen, Arvind Narayanan and Sayash Kapoor, Melanie Mitchell, Rodney Brooks, Oren Etzioni and Kevin Kelly, among others. Eliezer Yudkowsky’s texts were added only where not already recorded in the collection of his arguments.',
          'Texts by others where a text on the starting list answers them, and texts the arXiv searches found.',
          'The Edge Reality Club discussion of 2014 (four responses), the essays in MIT Technology Review of 2016, and a public Facebook thread of 2019, read in a compiler’s copy of 4 October 2019.',
        ],
      },
      {
        period: 'Signed statements, letters and reports',
        items: [
          'The Future of Life Institute’s letters on research priorities (2015) and on a pause (March 2023), the DAIR statement (March 2023), the Center for AI Safety statement (May 2023), the Mozilla joint statement (October 2023), Meta’s statement of support for Llama 2 (July 2023), the consensus paper on managing extreme AI risks (2023) and the International AI Safety Report (January 2025).',
          'A statement is recorded as a text. No stance is attributed to its signatories, and no list of signatories is recorded.',
        ],
      },
      {
        period: 'arXiv and posts',
        items: [
          'The arXiv API, searched for each proposition’s usual names in titles and abstracts, sorted by submission date, first 50 results read by title and abstract.',
          'Selected LessWrong and Alignment Forum posts, where a text on the starting list answers them or a search named them; not searched in full, and comments not read.',
        ],
      },
      {
        period: 'A cross-family check, 2026-10-31',
        items: [
          'A model of another family answered 18 earliest-located questions and classified 50 passages blind, then re-read 52 records against fresh retrievals and dated archive captures.',
          'It located earlier dated texts for six propositions, proposed seven records on six texts to balance the propositions, and found two stances that it read as bearing on rather than contesting or articulating. The maintainer adopted these on 2026-10-31; they are applied here.',
        ],
      },
    ],
    methods: [
      'Sources were retrieved directly by script, one request at a time, on 2026-10-29, by the check on 2026-10-31 and, for the texts added at admission, again on 2026-10-31. Each retrieved text is identified by its SHA-256 hash in the source record.',
      'Every quotation was compared with the retrieved text of its own source. Two LessWrong posts that refused direct retrieval were read through LessWrong’s own interface for programs.',
      'Each record gives the date its text is dated by. Where the quoted wording is known only from a later copy, the record also gives the date from which the wording is attested, and that date decides which text is earliest located. Passages of the Edge responses of 2014 and of two of Bengio’s posts are attested by archive captures.',
      'Each record was applied against its proposition’s criterion as worded. On B1 and A4 the texts were classified against those propositions’ own criteria, and the roles those propositions already had were kept.',
      'Two fresh-context machine audits by Claude models and a check by an OpenAI GPT-6 model re-read these records. No person has reviewed them.',
    ],
    gaps: [
      'The records are not balanced proposition by proposition. Texts contesting R09 (misuse), R17 (incentives) and R03 (misalignment learned in training) are few, and so are texts articulating some counter-propositions. The causes are the search: LessWrong and the Alignment Forum refused direct retrieval during the search, and much published disagreement about extinction and misuse risk is in posts on X, interviews and debates without transcripts, which were out of scope. The imbalance is a result of the search, not a finding.',
      'Not recorded yet, though located: “On the Dangers of Stochastic Parrots” (2021), Chollet’s essay of November 2017 on intelligence explosion (recorded only as the text Yudkowsky’s reply answers), LeCun’s position paper of June 2022 and his written Senate testimony of September 2023. A check retrieved them from archive captures after the search; they await a separate decision.',
      'Four texts the research pack recorded on its fast-takeoff proposition (Yudkowsky 2017, Drexler 2019, Eth and Davidson 2025, the AI 2027 scenario) do not meet A4’s criterion as worded, which names only a hard or fast takeoff or a period of hours to months. They are not recorded on A4 until a decision on where they belong; Yudkowsky’s post of 2017 is recorded here as contesting gradual takeoff.',
      'Leads not admitted as headlines because their historical wording could not be dated: the Arbital page on optimization daemons, last updated in March 2016 (recorded elsewhere as context); Creating Friendly AI as served in a later reflow (recorded on A4 as an articulation of 2001). Yudkowsky’s essay “What is Friendly AI?” (republished 3 May 2001) is a lead for R10b that awaits a decision.',
      'Not read: books not available in full text (among them Bostrom’s Superintelligence, Russell’s Human Compatible and Marcus and Davis’s Rebooting AI, except a published excerpt), paywalled journals without an author copy, video and audio without a transcript, and reports of what someone said.',
      'The written Senate testimony of Russell, Amodei and Marcus (2023) was refused; Amodei’s oral statement is read in the printed hearing record.',
      'Most web texts were read in their current copies; a record says where a page states a later modification.',
    ],
    corrections:
      'A text found later that is earlier than an earliest located text becomes the new earliest located text, and the earlier headline stays on record as a correction.',
  },
  corrections: [
    {
      propositionId: 'orthogonality',
      replaced: `Bostrom’s paper of May 2012, headlined as earliest located by ${pack}.`,
      reason:
        'Correction: the wording of Bostrom’s paper of 2003 is attested by an archive capture of 6 August 2003, which a cross-family check found; the 2012 paper keeps the earliest located use of the name.',
      claimIds: [
        'rd-r01-bostrom-2003-ethical-issues',
        'rd-r01-bostrom-2012-superintelligent-will',
      ],
      recordedAt: admitted,
    },
    {
      propositionId: 'treacherous-turn',
      replaced: `Ngo’s report of August 2022, headlined as earliest located for the pack’s own treacherous-turn proposition by ${pack}.`,
      reason:
        'The pack’s proposition had the same criterion as B1, so its records were admitted on B1, where Creating Friendly AI (2001) is earliest located.',
      claimIds: [
        'rd-b1-ngo-2022-alignment-problem-deep-learning',
        'ts-b1-cfai',
      ],
      recordedAt: admitted,
    },
    {
      propositionId: 'fast-or-hard-takeoff',
      replaced: `Yudkowsky’s post of 20 October 2017, headlined as earliest located for the pack’s own fast-takeoff proposition by ${pack}, through its use of the name “foom” only.`,
      reason:
        'The pack’s proposition was nearly the same as A4, so its records were admitted on A4, where Vinge’s paper of 1993 is earliest located. That post is not recorded on A4, which does not count “foom” as a usual name; it is recorded here as contesting gradual takeoff.',
      claimIds: ['ts-a4-vinge-1993'],
      recordedAt: admitted,
    },
    {
      propositionId: 'alignment-is-hard',
      replaced: `Russell’s Edge response of 2014, headlined as earliest located by ${pack}.`,
      reason:
        'Earlier text found: Goertzel’s essay of May 2002, located by a cross-family check.',
      claimIds: [
        'rd-r06-russell-2014-edge-myths-and-moonshine',
        'rd-r06-goertzel-2002-thoughts-on-ai-morality',
      ],
      recordedAt: admitted,
    },
    {
      propositionId: 'ai-extinction-risk',
      replaced: `Bostrom’s paper of March 2002, headlined as earliest located by ${pack}.`,
      reason:
        'Earlier text found: Joy’s essay in Wired of April 2000, located by a cross-family check.',
      claimIds: [
        'rd-r07-bostrom-2002-existential-risks',
        'rd-r07-joy-2000-why-the-future',
      ],
      recordedAt: admitted,
    },
    {
      propositionId: 'benevolence-or-no-drive-to-dominate',
      replaced: `Pinker’s Edge response of 2014, headlined as earliest located by ${pack} on the page order of undated responses.`,
      reason:
        'Earlier text found: Goertzel’s essay of 17 February 2004, located by a cross-family check.',
      claimIds: [
        'rd-r10a-pinker-2014-edge-myth-of-ai',
        'rd-r10a-goertzel-2004-positive-transcension',
      ],
      recordedAt: admitted,
    },
    {
      propositionId: 'control-by-design',
      replaced: `Bengio’s comments in the 2019 thread, headlined as the earliest located contesting text by ${pack}.`,
      reason:
        'Earlier text found: the paper Corrigibility of January 2015, which a cross-family check proposed for this proposition.',
      claimIds: [
        'rd-r10b-bengio-2019-instrumental-convergence-thread',
        'rd-r10b-corrigibility-2015',
      ],
      recordedAt: admitted,
    },
    {
      propositionId: 'present-harms-priority',
      replaced: `The DAIR statement of 31 March 2023, headlined as earliest located by ${pack}.`,
      reason:
        'Earlier text found: Crawford’s essay in The New York Times of 25 June 2016, located by a cross-family check in an archive capture.',
      claimIds: [
        'rd-r12-dair-2023-statement',
        'rd-r12-crawford-2016-white-guy-problem',
      ],
      recordedAt: admitted,
    },
    {
      propositionId: 'llms-lack-agency',
      replaced: `Marcus’s essay of January 2020, headlined as earliest located by ${pack}.`,
      reason:
        'Earlier text found: Marcus and Davis’s excerpt in Wired of 10 September 2019, located by a cross-family check.',
      claimIds: [
        'rd-r14-marcus-2020-gpt2-nature-of-intelligence',
        'rd-r14-marcus-davis-2019-computers-cant-read',
      ],
      recordedAt: admitted,
    },
  ],
  limits: [
    '“Earliest located” means the earliest text found by the searches described under “How we searched”. It is not a claim of first use or first statement, and the order of texts records no influence.',
    'A record documents what one text says on its date. It is not evidence that the proposition is true, and it does not say what the author holds at another date.',
    'No author is placed on a side. A proposition is phrased generically and attributed to no one, and texts grouped under one proposition disagree about much else.',
    'A signed statement is recorded as a text; no record attributes a stance to its signatories.',
    'An answer from one text to another is recorded as a citation. It is not agreement.',
    'B1 and A4 are shared with the superintelligence collection, and the texts recorded there from 1863 appear here too. The codes R04 and R05 of the research pack correspond to B1 and A4.',
    'A machine selected and classified these records, and machine checks from two model families re-examined them. No person has reviewed them.',
  ],
  axis: frame.axis,
  landing: frame.landing,
  landingAction: frame.landingAction,
  mostDevelopedEmpty: frame.mostDevelopedEmpty,
  earliestEmpty: frame.earliestEmpty,
  related: {
    orthogonality: [
      {
        propositionId: 'intelligence-brings-benevolence',
        relation:
          'The contrary claim, recorded in Eliezer Yudkowsky’s texts only.',
      },
    ],
    'instrumental-convergence': [
      {
        propositionId: 'harm-requires-hostility',
        relation: 'Recorded in Eliezer Yudkowsky’s texts only.',
      },
    ],
    'inner-or-deceptive-misalignment': [
      {
        propositionId: 'deceptive-alignment',
        relation:
          'A narrower case; texts recorded there are not recorded again here.',
      },
      {
        propositionId: 'scheming',
        relation:
          'A narrower case; texts recorded there are not recorded again here.',
      },
    ],
    'benevolence-or-no-drive-to-dominate': [
      {
        propositionId: 'intelligence-brings-benevolence',
        relation: 'Recorded in Eliezer Yudkowsky’s texts only.',
      },
    ],
    'risk-claims-speculative': [
      {
        propositionId: 'risk-is-film-fiction',
        relation: 'Recorded in Eliezer Yudkowsky’s texts only.',
      },
    ],
    'capabilities-plateau': [
      {
        propositionId: 'agi-decades-away',
        relation: 'Recorded in Eliezer Yudkowsky’s texts only.',
      },
    ],
    'llms-lack-agency': [
      {
        propositionId: 'next-word-prediction-is-shallow',
        relation: 'Recorded in Eliezer Yudkowsky’s texts only.',
      },
      {
        propositionId: 'tool-without-goals',
        relation: 'Recorded in Eliezer Yudkowsky’s texts only.',
      },
    ],
    'gradual-takeoff': [
      {
        propositionId: 'slow-takeoff-time-to-adjust',
        relation: 'Recorded in Eliezer Yudkowsky’s texts only.',
      },
    ],
    'incentives-produce-safety': [
      {
        propositionId: 'ai-developer-incentives-and-safety',
        relation:
          'A wider proposition in the economics collection: texts that analyse how developers’ incentives affect safety.',
      },
    ],
  },
  exchanges: [
    {
      title: 'Edge Reality Club responses to “The Myth of AI”',
      period: '2014',
      documentIds: [
        'pinker-2014-edge-myth-of-ai',
        'brooks-2014-tool-not-threat',
        'kelly-2014-edge-myth-of-ai',
        'russell-2014-edge-myths-and-moonshine',
      ],
      note: 'Four of the eighteen responses on the conversation page dated 14 November 2014. The responses carry no dates of their own; archive captures attest some of their passages.',
    },
    {
      title:
        'Whether intelligent machines would seek self-preservation and power',
      period: '2014–2019',
      documentIds: [
        'pinker-2015-thinking-does-not-imply-subjugating',
        'brooks-2017-seven-deadly-sins',
        'russell-2019-ieee-spectrum',
        'turner-2019-optimal-farsighted-agents',
      ],
      note: 'Russell (2019) quotes Pinker’s wording of 2015 and Brooks (2017); Turner (2019) cites Pinker (2015).',
    },
    {
      title: 'Etzioni, and Dafoe and Russell, in MIT Technology Review',
      period: '2016',
      documentIds: [
        'etzioni-2016-experts-dont-think',
        'dafoe-russell-2016-yes-we-are-worried',
      ],
      note: 'Dafoe and Russell’s essay answers Etzioni’s by name. Etzioni’s short response printed with it is not recorded separately.',
    },
    {
      title: 'Chollet and Yudkowsky on intelligence explosion',
      period: '2017',
      documentIds: [
        'chollet-2017-impossibility-intelligence-explosion',
        'yudkowsky-2017-reply-to-chollet',
      ],
      note: 'Yudkowsky’s reply quotes Chollet’s essay passage by passage. No stance of Chollet’s essay is recorded yet.',
    },
    {
      title: 'Hanson and Yudkowsky on fast takeoff, after their debate',
      period: '2008–2022',
      documentIds: [
        'hanson-2008-ai-go-foom',
        'yudkowsky-2008-hard-takeoff',
        'hanson-2013-foom-debate-again',
        'hanson-2014-i-still-dont-get-foom',
        'yudkowsky-2017-alphago-zero-foom',
        'hanson-2022-foom-update',
      ],
      note: 'The debate of 2008–2013 is recorded in the superintelligence collection; later posts by the two participants are recorded here. Hanson’s reply to Yudkowsky’s post of 2017 could not be retrieved.',
    },
    {
      title: 'Christiano and Yudkowsky on takeoff speeds',
      period: '2018–2022',
      documentIds: [
        'christiano-2018-takeoff-speeds',
        'lw-2021-yudkowsky-and-christiano-discuss-takeoff-speeds',
        'christiano-2022-where-i-agree-and-disagree',
      ],
      note: 'Recorded on A4 and in the collection of Yudkowsky’s arguments; Christiano’s post of 2018 is also recorded here on gradual takeoff.',
    },
    {
      title: 'A public Facebook thread on instrumental convergence',
      period: 'September–October 2019',
      documentIds: [
        'zador-lecun-2019-dont-fear-the-terminator',
        'lecun-2019-instrumental-convergence-thread',
        'russell-2019-instrumental-convergence-thread',
        'bengio-2019-instrumental-convergence-thread',
        'zador-2019-instrumental-convergence-thread',
        'pace-2019-instrumental-convergence-debate',
      ],
      note: 'Started by a post of Zador and LeCun’s essay in Scientific American. Read in a compiler’s copy of 4 October 2019, which states that it fixed typos and formatting; each participant’s comments are recorded as their own text.',
    },
    {
      title: 'Meaning, form and reference in language models',
      period: '2020–2022',
      documentIds: [
        'bender-koller-2020-climbing-nlu',
        'piantadosi-hill-2022-meaning-without-reference',
      ],
      note: 'Piantadosi and Hill’s paper answers Bender and Koller’s by name.',
    },
    {
      title: 'Orthogonality and general intelligence',
      period: '2021',
      documentIds: [
        'muller-cannon-2021-existential-risk-orthogonality',
        'haggstrom-2021-muller-cannon-distinction',
      ],
      note: 'Häggström’s reply of September 2021 answers Müller and Cannon’s paper; a further reply was not searched for.',
    },
    {
      title: 'The singularity hypothesis',
      period: '2010–2022',
      documentIds: [
        'chalmers-singularity',
        'thorstad-2022-against-singularity-hypothesis',
      ],
      note: 'Thorstad’s working paper answers Chalmers (2010). A reply by Chalmers was not searched for.',
    },
    {
      title: 'Openness and the founding of OpenAI',
      period: 'December 2015',
      documentIds: [
        'openai-launch-announcement',
        'alexander-2015-should-ai-be-open',
      ],
      note: 'Alexander’s post answers OpenAI’s announcement.',
    },
    {
      title: 'The pause letter and the DAIR statement',
      period: 'March 2023',
      documentIds: ['fli-2023-pause-letter', 'dair-2023-statement'],
      note: 'The DAIR statement answers the Future of Life Institute’s letter. Yudkowsky’s TIME essay of 29 March 2023 is recorded in the collection of his arguments.',
    },
    {
      title: 'Answers to the Center for AI Safety statement',
      period: 'May–July 2023',
      documentIds: [
        'cais-2023-statement',
        'ng-2023-existential-risk-dont-get-it',
        'richards-2023-illusion-existential-risk',
      ],
      note: 'Texts that name the statement and answer it. A statement records what it says, not each signatory’s view.',
    },
    {
      title: 'Licensing and open models',
      period: '2023',
      documentIds: ['time-2023-shut-it-all-down', 'howard-2023-dislightenment'],
      note: 'Howard’s essay answers Yudkowsky’s TIME essay, which is recorded in the collection of his arguments.',
    },
    {
      title: 'The marginal risk of open model weights',
      period: '2023–2024',
      documentIds: [
        'gopal-2023-pandemic-agents',
        'seger-open-sourcing-2023-09',
        'kapoor-open-foundation-models-2024-02',
      ],
      note: 'Kapoor and co-authors cite Gopal and co-authors and Seger and co-authors, and answer the case on biological misuse by marginal risk; only the answer to Gopal and co-authors is recorded as a reply.',
    },
    {
      title: 'The counting argument for scheming',
      period: '2023–2024',
      documentIds: [
        'carlsmith-2023-scheming-ais',
        'belrose-pope-2024-counting-arguments',
        'turner-2024-many-arguments-wrong',
      ],
      note: 'Belrose and Pope’s essay answers the counting argument of Carlsmith’s report by name; Turner’s post says that a draft of their essay prompted it.',
    },
    {
      title: 'Scaling to AGI',
      period: '2024',
      documentIds: [
        'aschenbrenner-2024-situational-awareness',
        'narayanan-kapoor-2024-ai-scaling-myths',
      ],
      note: 'Narayanan and Kapoor’s post names Aschenbrenner’s essay and states that most of it was drafted before the essay appeared.',
    },
  ],
};
