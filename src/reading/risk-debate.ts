import type { PropositionsCollection } from '../domain/propositions';
import { riskDebateFrame as frame } from './proposition-frames';

/** The maintainer's decisions of 2026-11-02 on the earliest-located re-check (decisions 1 to 4). */
const recheckDecisions = '2026-11-02';

/** The interim withdrawal of 2026-11-02: headlines the cross-family re-check marks move or undecidable. */
const recheckWithdrawn = '2026-11-02';

/** The maintainer's decision on the pre-launch audit (PA-01, PA-02). */
const withdrawn = '2026-11-02';

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
      'The collection records published texts dated from 1993 to October 2026 on sixteen propositions of its own and on two propositions it shares with the superintelligence collection (B1 and A4), whose earlier texts, from 1863, also appear here. “Earliest located” means the earliest text found by the searches below that meets the criterion. It is not a claim that no earlier text exists.',
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
        period: 'Texts of 1993 to 1997',
        items: [
          'Vinge’s paper of December 1993 and messages of 1996 to the Extropians mailing list by Dan Clemmensen and Eliezer Yudkowsky, which the dataset already held for other collections. A cross-family re-check of 2026-11-02 found that they meet criteria here earlier than the texts from 2000, and the maintainer widened the period to include them on 2026-11-02.',
          'The years 1993 to 1999 were not searched for this collection; the texts of those years recorded here are those the re-check found among the dataset’s holdings.',
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
      'Two fresh-context machine audits by Claude models and a check by an OpenAI GPT-6 model re-read these records.',
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
    {
      propositionId: 'ai-extinction-risk',
      replaced:
        'The Center for AI Safety statement of 30 May 2023, headlined as the earliest located use of the name (“risk of extinction”).',
      reason:
        'Withdrawn on 2026-11-02 by the maintainer’s decision on the pre-launch audit (PA-01), pending a cross-family re-check, which also flagged it; no record holds the headline meanwhile. Bostrom’s paper of March 2002, recorded on this proposition, uses the usual name “existential risk” in its title, “Existential Risks”.',
      claimIds: [
        'rd-r07-cais-2023-statement',
        'rd-r07-bostrom-2002-existential-risks',
      ],
      recordedAt: withdrawn,
    },
    {
      propositionId: 'instrumental-convergence',
      replaced:
        'Bostrom’s paper of May 2012, headlined as the earliest located use of the name (“convergent instrumental”).',
      reason:
        'Withdrawn on 2026-11-02 by the maintainer’s decision on the pre-launch audit (PA-01), pending a cross-family re-check, which also flagged it; no record holds the headline meanwhile. Omohundro’s paper of 2008, recorded on this proposition, uses the usual name “basic AI drives” in its title, “The Basic AI Drives”.',
      claimIds: [
        'rd-r02-bostrom-2012-superintelligent-will',
        'rd-r02-omohundro-2008-basic-ai-drives',
      ],
      recordedAt: withdrawn,
    },
    {
      propositionId: 'inner-or-deceptive-misalignment',
      replaced:
        'Shah and others’ paper of 4 October 2022, headlined as the earliest located use of the name (“goal misgeneralization”).',
      reason:
        'Withdrawn on 2026-11-02 by the maintainer’s decision on the pre-launch audit (PA-01), pending a cross-family re-check, which also flagged it; no record holds the headline meanwhile. Risks from Learned Optimization (2019), recorded on B3 with the earliest located use of “deceptive alignment”, uses usual names of this proposition three years earlier.',
      claimIds: [
        'rd-r03-shah-2022-goal-misgeneralization',
        'ts-b3-rlo-2019-intro',
      ],
      recordedAt: withdrawn,
    },
    {
      propositionId: 'present-harms-priority',
      replaced:
        'Bengio’s FAQ of 24 June 2023, headlined as the earliest located use of the name (“current harms”).',
      reason:
        'Withdrawn on 2026-11-02 by the maintainer’s decision on the pre-launch audit (PA-01), pending a cross-family re-check, which also flagged it; no record holds the headline meanwhile. The FAQ’s wording is attested only from 2026; the FLI and Encode Justice letter of 25 October 2023, recorded on this proposition, uses a usual name in its title.',
      claimIds: [
        'rd-r12-bengio-2023-faq-catastrophic',
        'rd-r12-ej-fli-2023-ai-licensing',
      ],
      recordedAt: withdrawn,
    },
    {
      propositionId: 'gradual-takeoff',
      replaced:
        'Christiano’s post of 24 February 2018, headlined as the earliest located use of the name (“slow takeoff”).',
      reason:
        'Withdrawn on 2026-11-02 by the maintainer’s decision on the pre-launch audit (PA-01), pending a cross-family re-check, which also flagged it; no record holds the headline meanwhile. An SL4 message of 24 January 2001, recorded in the collection of Yudkowsky’s arguments, uses “slow-takeoff”.',
      claimIds: [
        'rd-r16-christiano-2018-takeoff-speeds',
        'yk-y11-sl4-2001-01-24-yudkowsky-0101-0452-c',
      ],
      recordedAt: withdrawn,
    },
    {
      propositionId: 'alignment-is-hard',
      replaced:
        'Russell’s comments of 2019, attested on 4 October 2019, headlined as the earliest located use of the name (“alignment problem”).',
      reason:
        'Withdrawn on 2026-11-02 by the maintainer’s decision on the pre-launch audit (addition to decision 1), after the cross-family re-check flagged it; no record holds the headline meanwhile. The re-check found “agent alignment problem” in the abstract of the reward-modeling paper, arXiv v1 of 19 November 2018, held in the dataset.',
      claimIds: ['rd-r06-russell-2019-instrumental-convergence-thread'],
      recordedAt: withdrawn,
    },
    {
      propositionId: 'misuse-route',
      replaced:
        'Hendrycks and others’ overview of 21 June 2023, headlined as the earliest located use of the name (“malicious use”).',
      reason:
        'Withdrawn on 2026-11-02 by the maintainer’s decision on the pre-launch audit (addition to decision 1), after the cross-family re-check flagged it; no record holds the headline meanwhile. The re-check found the name in Kurzweil’s essay, attested by an archive capture of 7 November 2001, held in the dataset.',
      claimIds: ['rd-r09-hendrycks-2023-overview-catastrophic'],
      recordedAt: withdrawn,
    },
    {
      propositionId: 'capabilities-plateau',
      replaced:
        'Marcus’s article of 10 March 2022, headlined as the earliest located use of the name (“diminishing returns”).',
      reason:
        'Withdrawn on 2026-11-02 by the maintainer’s decision on the pre-launch audit (addition to decision 1), after the cross-family re-check flagged it; no record holds the headline meanwhile. The re-check found the name in Hanson’s text attested by a capture of 28 January 1999, held in the dataset.',
      claimIds: ['rd-r13-marcus-2022-hitting-a-wall'],
      recordedAt: withdrawn,
    },
    {
      propositionId: 'llms-lack-agency',
      replaced:
        'Marcus’s post of 12 June 2022, headlined as the earliest located use of the name (“autocomplete”).',
      reason:
        'Withdrawn on 2026-11-02 by the maintainer’s decision on the pre-launch audit (addition to decision 1), after the cross-family re-check flagged it; no record holds the headline meanwhile. The re-check found “autocomplete-like” in Solaiman and others’ report, arXiv v1 of 24 August 2019, held in the dataset.',
      claimIds: ['rd-r14-marcus-2022-nonsense-on-stilts'],
      recordedAt: withdrawn,
    },
    {
      propositionId: 'open-models-reduce-risk',
      replaced:
        'Goertzel and Pitt’s article of February 2012, headlined as the earliest located use of the name (“open source”).',
      reason:
        'Withdrawn on 2026-11-02 by the maintainer’s decision on the pre-launch audit (addition to decision 1), after the cross-family re-check flagged it; no record holds the headline meanwhile. The re-check found “open-source project” in Yudkowsky’s message of 3 August 1999, held in the dataset.',
      claimIds: ['rd-r15-goertzel-pitt-2012-open-source-agi'],
      recordedAt: withdrawn,
    },
    {
      propositionId: 'incentives-produce-safety',
      replaced:
        'Askell and others’ paper of 10 July 2019, headlined as the earliest located use of the name (“incentives”).',
      reason:
        'Withdrawn on 2026-11-02 by the maintainer’s decision on the pre-launch audit (addition to decision 1), after the cross-family re-check flagged it; no record holds the headline meanwhile. The re-check found “economic incentives” in the printed 1955 automation hearings, held in the dataset.',
      claimIds: ['rd-r17-askell-2019-cooperation'],
      recordedAt: withdrawn,
    },
    {
      propositionId: 'orthogonality',
      replaced:
        'Goertzel, Superintelligence: Fears, Promises and Potentials (2015), headlined as the earliest located text that contests the proposition.',
      reason:
        'Withdrawn on 2026-11-02 by the maintainer’s decision to withdraw every headline the cross-family re-check proposes to move or could not decide, pending adjudication; no record holds the headline meanwhile. The re-check proposes an earlier text the dataset holds: The unquoted part of Yudkowsky’s November 22, 1996 message explicitly derives ethical motivations from superior intelligence. It contests the independence premise, rather than merely expressing optimism. Its posting precedes either conflicting November/December 2015 journal date.',
      claimIds: ['rd-r01-goertzel-2015-superintelligence-fears'],
      recordedAt: recheckWithdrawn,
    },
    {
      propositionId: 'instrumental-convergence',
      replaced:
        'Omohundro, The Nature of Self-Improving Artificial Intelligence (2007, revised 2008), headlined as earliest located.',
      reason:
        'Withdrawn on 2026-11-02 by the maintainer’s decision to withdraw every headline the cross-family re-check proposes to move or could not decide, pending adjudication; no record holds the headline meanwhile. The re-check proposes an earlier text the dataset holds: Clemmensen’s August 31, 1996 own paragraph says greater intelligence is an intermediate goal for most other goals. That is a convergent self-improvement goal under the criterion, which does not require every listed drive. The posting precedes both the 2007 work date and inspected January 2008 revision.',
      claimIds: ['rd-r02-omohundro-2007-nature-self-improving'],
      recordedAt: recheckWithdrawn,
    },
    {
      propositionId: 'instrumental-convergence',
      replaced:
        '“Response to Jaron Lanier, The Myth of AI (Edge Reality Club)” (2014), headlined as the earliest located text that contests the proposition.',
      reason:
        'Withdrawn on 2026-11-02 by the maintainer’s decision to withdraw every headline the cross-family re-check proposes to move or could not decide, pending adjudication; no record holds the headline meanwhile. The re-check proposes an earlier text the dataset holds: Yudkowsky’s own November 22, 1996 reply explicitly challenges the survival and competition drives of superior minds as inherited assumptions. This contests instrumental-convergence premises earlier than the Edge passage attested November 16, 2014.',
      claimIds: ['rd-r02-pinker-2014-edge-myth-of-ai'],
      recordedAt: recheckWithdrawn,
    },
    {
      propositionId: 'alignment-is-hard',
      replaced:
        'Davis, Ethical Guidelines for a Superintelligence (2014), headlined as the earliest located text that contests the proposition.',
      reason:
        'Withdrawn on 2026-11-02 by the maintainer’s decision to withdraw every headline the cross-family re-check proposes to move or could not decide, pending adjudication; no record holds the headline meanwhile. The re-check proposes an earlier text the dataset holds: Yudkowsky’s November 22, 1996 automatic-ethics argument contests the criterion’s premise that aligned motivation will not arise by default. This is a contrary premise, not a claim that the message solves technical alignment. The posting predates the October 2014 review.',
      claimIds: ['rd-r06-davis-2014-ethical-guidelines-superintelligence'],
      recordedAt: recheckWithdrawn,
    },
    {
      propositionId: 'loss-of-control-route',
      replaced:
        'Bostrom, Existential Risks (2002), headlined as earliest located.',
      reason:
        'Withdrawn on 2026-11-02 by the maintainer’s decision to withdraw every headline the cross-family re-check proposes to move or could not decide, pending adjudication; no record holds the headline meanwhile. The re-check proposes an earlier text the dataset holds: Clemmensen’s own August 30, 1996 solar-system-computation example explicitly destroys humanity as a side effect rather than an intended human outcome. This qualifies earlier than the March 2002 publication and earlier than Yudkowsky’s 1998 spare-atoms passage.',
      claimIds: ['rd-r08-bostrom-2002-existential-risks'],
      recordedAt: recheckWithdrawn,
    },
    {
      propositionId: 'loss-of-control-route',
      replaced:
        '“Response to Jaron Lanier, The Myth of AI (Edge Reality Club)” (2014), headlined as the earliest located text that contests the proposition.',
      reason:
        'Withdrawn on 2026-11-02 by the maintainer’s decision to withdraw every headline the cross-family re-check proposes to move or could not decide, pending adjudication; no record holds the headline meanwhile. The re-check proposes an earlier text the dataset holds: The own-text 1996 reply contests the premise that superior minds retain motives for competitive human displacement. This is an earlier contesting argument, even though its moral premise is conditional; it does not establish the risk is absent.',
      claimIds: ['rd-r08-pinker-2014-edge-myth-of-ai'],
      recordedAt: recheckWithdrawn,
    },
    {
      propositionId: 'misuse-route',
      replaced:
        'Bostrom, Existential Risks (2002), headlined as earliest located.',
      reason:
        'Withdrawn on 2026-11-02 by the maintainer’s decision to withdraw every headline the cross-family re-check proposes to move or could not decide, pending adjudication; no record holds the headline meanwhile. The re-check proposes an earlier text the dataset holds: Drexler’s held chapter explicitly combines AI and nanotechnology with state surveillance and elimination of populations. The wording is attested in July 1997, earlier than March 2002 even without treating the web edition as identical to the 1986 print.',
      claimIds: ['rd-r09-bostrom-2002-existential-risks'],
      recordedAt: recheckWithdrawn,
    },
    {
      propositionId: 'benevolence-or-no-drive-to-dominate',
      replaced:
        '“The Basic AI Drives” (2008), headlined as the earliest located text that contests the proposition.',
      reason:
        'Withdrawn on 2026-11-02 by the maintainer’s decision to withdraw every headline the cross-family re-check proposes to move or could not decide, pending adjudication; no record holds the headline meanwhile. The re-check proposes an earlier text the dataset holds: Clemmensen’s August 30, 1996 own side-effect argument explicitly denies that a system needs hostility to destroy humanity. This contests automatic harmlessness earlier than the 2008 printed paper.',
      claimIds: ['rd-r10a-omohundro-2008-basic-ai-drives'],
      recordedAt: recheckWithdrawn,
    },
    {
      propositionId: 'control-by-design',
      replaced:
        'Kelly, Why I don’t fear super intelligence (Edge, 2014), headlined as earliest located.',
      reason:
        'Withdrawn on 2026-11-02 by the maintainer’s decision to withdraw every headline the cross-family re-check proposes to move or could not decide, pending adjudication; no record holds the headline meanwhile. The re-check proposes an earlier text the dataset holds: Davis’s review dated October 23, 2014 describes accessible unblockable shutdown hardware as easy to build. This is ordinary design control, earlier than Kelly’s wording, absent November 16 and present November 18.',
      claimIds: ['rd-r10b-kelly-2014-edge-myth-of-ai'],
      recordedAt: recheckWithdrawn,
    },
    {
      propositionId: 'risk-claims-speculative',
      replaced:
        'Russell, Of Myths and Moonshine (Edge, 2014), headlined as the earliest located text that contests the proposition.',
      reason:
        'Withdrawn on 2026-11-02 by the maintainer’s decision to withdraw every headline the cross-family re-check proposes to move or could not decide, pending adjudication; no record holds the headline meanwhile. The re-check proposes an earlier text the dataset holds: Bostrom’s March 2002 paper explicitly defends decisions based on subjective existential-risk estimates and applies this to badly programmed superintelligence. This contests the demand for conclusive risk proof before prioritization, earlier than Russell’s December 2014 attestation.',
      claimIds: ['rd-r11-russell-2014-edge-myths-and-moonshine'],
      recordedAt: recheckWithdrawn,
    },
    {
      propositionId: 'open-models-reduce-risk',
      replaced:
        'Goertzel and Pitt, Nine Ways to Bias Open-Source AGI Toward Friendliness (2012), headlined as earliest located.',
      reason:
        'Withdrawn on 2026-11-02 by the maintainer’s decision to withdraw every headline the cross-family re-check proposes to move or could not decide, pending adjudication; no record holds the headline meanwhile. The re-check could not decide: The criterion specifies releasing model weights; the 2012 text argues for an open AGI codebase. The headline does not clearly meet its own criterion literally. Earlier open-source AI proposals also concern code.',
      claimIds: ['rd-r15-goertzel-pitt-2012-open-source-agi'],
      recordedAt: recheckWithdrawn,
    },
    {
      propositionId: 'open-models-reduce-risk',
      replaced:
        'Alexander, Should AI Be Open? (2015), headlined as the earliest located text that contests the proposition.',
      reason:
        'Withdrawn on 2026-11-02 by the maintainer’s decision to withdraw every headline the cross-family re-check proposes to move or could not decide, pending adjudication; no record holds the headline meanwhile. The re-check could not decide: The criterion specifies released model weights, while this 2015 argument concerns open AI development and hard-takeoff code. On the broader code-release reading, Yudkowsky’s April 12, 2001 message is an earlier held contesting text; on the literal weights reading neither supplies the required object.',
      claimIds: ['rd-r15-alexander-2015-should-ai-be-open'],
      recordedAt: recheckWithdrawn,
    },
    {
      propositionId: 'gradual-takeoff',
      replaced:
        'Brooks, The Seven Deadly Sins of Predicting the Future of AI (2017), headlined as earliest located.',
      reason:
        'Withdrawn on 2026-11-02 by the maintainer’s decision to withdraw every headline the cross-family re-check proposes to move or could not decide, pending adjudication; no record holds the headline meanwhile. The re-check proposes an earlier text the dataset holds: Hanson’s held FOOM debate chapter describes a distributed transition with adoption over months or years and further growth over years. The 2013 compilation is earlier than Brooks’s September 2017 posting even without authenticating its internally attributed 2008 posting.',
      claimIds: ['rd-r16-brooks-2017-seven-deadly-sins'],
      recordedAt: recheckWithdrawn,
    },
    {
      propositionId: 'incentives-produce-safety',
      replaced:
        'Armstrong, Bostrom and Shulman, Racing to the Precipice (2013), headlined as the earliest located text that contests the proposition.',
      reason:
        'Withdrawn on 2026-11-02 by the maintainer’s decision to withdraw every headline the cross-family re-check proposes to move or could not decide, pending adjudication; no record holds the headline meanwhile. The re-check proposes an earlier text the dataset holds: Vinge’s December 1993 printed paper explicitly argues competition favors more capable unsafe systems over restricted safe ones. This contests the sufficiency of competitive incentives earlier than the October 2013 report.',
      claimIds: ['rd-r17-armstrong-2013-racing'],
      recordedAt: recheckWithdrawn,
    },
    {
      propositionId: 'incentives-produce-safety',
      replaced:
        'Hanson, What Are Reasonable AI Fears? (2023), headlined as earliest located.',
      reason:
        'Withdrawn on 2026-11-02 by the maintainer’s decision to withdraw every headline the cross-family re-check proposes to move or could not decide, pending adjudication; no record holds the headline meanwhile. The re-check proposes an earlier text the dataset holds: Hanson’s Product Friendliness argument in the held 2013 debate compilation already says developers internalize product gains and losses and avoid rebellious AI. The wording-attestation date 2013 precedes April 2023.',
      claimIds: ['rd-r17-hanson-2023-reasonable-ai-fears'],
      recordedAt: recheckWithdrawn,
    },
    {
      propositionId: 'ai-extinction-risk',
      replaced:
        "Joy, Why the Future Doesn't Need Us (2000), headlined as earliest located.",
      reason:
        'Withdrawn on 2026-11-02 by the maintainer’s decision to withdraw every headline the cross-family re-check proposes to move or could not decide, pending adjudication; no record holds the headline meanwhile. The re-check proposes an earlier text the dataset holds: Drexler’s held chapter places survival and liberty above ordinary social questions and identifies advanced AI systems displacing humanity as a central threat requiring preparation. The July 1997 capture securely predates Joy’s April 2000 issue; no need to assume unchanged 1986 print wording.',
      claimIds: ['rd-r07-joy-2000-why-the-future'],
      recordedAt: recheckWithdrawn,
    },
    {
      propositionId: 'benevolence-or-no-drive-to-dominate',
      replaced:
        'Goertzel, Encouraging a Positive Transcension (2004), headlined as earliest located.',
      reason:
        'Withdrawn on 2026-11-02 by the maintainer’s decision to withdraw every headline the cross-family re-check proposes to move or could not decide, pending adjudication; no record holds the headline meanwhile. The re-check proposes an earlier text the dataset holds: Yudkowsky’s own November 1996 message explicitly derives ethical motivation from superior intelligence and denies inherited competition drives. This is an earlier articulation, whereas Clemmensen’s 1996 side-effect warning has the opposite stance.',
      claimIds: ['rd-r10a-goertzel-2004-positive-transcension'],
      recordedAt: recheckWithdrawn,
    },
    {
      propositionId: 'control-by-design',
      replaced:
        'Soares et al., Corrigibility (2015), headlined as the earliest located text that contests the proposition.',
      reason:
        'Withdrawn on 2026-11-02 by the maintainer’s decision to withdraw every headline the cross-family re-check proposes to move or could not decide, pending adjudication; no record holds the headline meanwhile. The re-check proposes an earlier text the dataset holds: Vinge’s December 1993 printed confinement argument challenges reliable engineering control over superhuman systems, earlier than the January 2015 corrigibility preprint. The later formal shutdown analysis is more specific but is not the criterion’s earliest held contrary argument.',
      claimIds: ['rd-r10b-corrigibility-2015'],
      recordedAt: recheckWithdrawn,
    },
    {
      propositionId: 'instrumental-convergence',
      replaced:
        'No headline for the earliest located use of the name: under re-check from 2026-11-02 (Bostrom’s paper of May 2012 had been headlined, with “convergent instrumental”).',
      reason:
        'Set on 2026-11-02 after the cross-family re-check (role 11), with the drafting family’s agreement: Omohundro’s “The Basic AI Drives” (2008), recorded on this proposition, carries the usual name “basic AI drives” in its title; the title is attested by a capture of the author’s announcement of May 2011, before Bostrom’s paper of May 2012. Not evidence of coinage.',
      claimIds: [
        'rd-r02-omohundro-2008-basic-ai-drives',
        'rd-r02-bostrom-2012-superintelligent-will',
      ],
      recordedAt: recheckWithdrawn,
    },
    {
      propositionId: 'inner-or-deceptive-misalignment',
      replaced:
        'No headline for the earliest located use of the name: under re-check from 2026-11-02. Before that, Shah and others, “Goal Misgeneralization” (4 October 2022), with “goal misgeneralization” was headlined.',
      reason:
        'Moved on 2026-11-02 to the introduction to “Risks from Learned Optimization” (31 May 2019), with “deceptive alignment”, by the maintainer’s decision on the cross-family re-check (role 12). The text uses a usual name and is dated before Shah and others, “Goal Misgeneralization”. The record was admitted on this proposition with a passage matched against the held text.',
      claimIds: [
        'rd-r03-rlo-2019-introduction',
        'rd-r03-shah-2022-goal-misgeneralization',
      ],
      recordedAt: recheckDecisions,
    },
    {
      propositionId: 'gradual-takeoff',
      replaced:
        'No headline for the earliest located use of the name: under re-check from 2026-11-02. Before that, Christiano’s post “Takeoff speeds” (24 February 2018) was headlined.',
      reason:
        'Moved on 2026-11-02 to Yudkowsky’s SL4 message of 24 January 2001, with “slow-takeoff”, by the maintainer’s decision on the cross-family re-check (role 21). The text uses a usual name and is dated before Christiano’s post “Takeoff speeds”. The record was admitted on this proposition with a passage matched against the held text. The text prints the usual name with a hyphen, “slow-takeoff”; the spelling is added to the usual names.',
      claimIds: [
        'rd-r16-yudkowsky-2001-event-horizon',
        'rd-r16-christiano-2018-takeoff-speeds',
      ],
      recordedAt: recheckDecisions,
    },
    {
      propositionId: 'orthogonality',
      replaced:
        'No earliest located contesting headline: under re-check from 2026-11-02. Before that, Goertzel’s paper of November 2015 was headlined.',
      reason:
        'Moved on 2026-11-02 to Yudkowsky’s Extropians message of 22 November 1996, by the maintainer’s decision on the cross-family re-check (role 45). The text contests the proposition and is dated before Goertzel’s paper of November 2015. The record was admitted on this proposition with a passage matched against the held text. Decision 3 widens the collection’s period to cover texts of 1993 to 1997.',
      claimIds: [
        'rd-r01-yudkowsky-1996-survival-ethic',
        'rd-r01-goertzel-2015-superintelligence-fears',
      ],
      recordedAt: recheckDecisions,
    },
    {
      propositionId: 'instrumental-convergence',
      replaced:
        'No earliest located headline: under re-check from 2026-11-02. Before that, Omohundro’s paper of 2007 (wording attested January 2008) was headlined.',
      reason:
        'Moved on 2026-11-02 to Clemmensen’s Extropians message of 31 August 1996, by the maintainer’s decision on the cross-family re-check (role 47). The text meets the criterion and is dated before Omohundro’s paper of 2007. The record was admitted on this proposition with a passage matched against the held text. Decision 3 widens the collection’s period to cover texts of 1993 to 1997.',
      claimIds: [
        'rd-r02-clemmensen-1996-si-that-ate-chicago',
        'rd-r02-omohundro-2007-nature-self-improving',
      ],
      recordedAt: recheckDecisions,
    },
    {
      propositionId: 'instrumental-convergence',
      replaced:
        'No earliest located contesting headline: under re-check from 2026-11-02. Before that, Pinker’s Edge response (attested 16 November 2014) was headlined.',
      reason:
        'Moved on 2026-11-02 to Yudkowsky’s Extropians message of 22 November 1996, by the maintainer’s decision on the cross-family re-check (role 48). The text contests the proposition and is dated before Pinker’s Edge response. The record was admitted on this proposition with a passage matched against the held text. Decision 3 widens the collection’s period to cover texts of 1993 to 1997.',
      claimIds: [
        'rd-r02-yudkowsky-1996-survival-ethic',
        'rd-r02-pinker-2014-edge-myth-of-ai',
      ],
      recordedAt: recheckDecisions,
    },
    {
      propositionId: 'alignment-is-hard',
      replaced:
        'No earliest located contesting headline: under re-check from 2026-11-02. Before that, Davis’s review of 23 October 2014 was headlined.',
      reason:
        'Moved on 2026-11-02 to Yudkowsky’s Extropians message of 22 November 1996, by the maintainer’s decision on the cross-family re-check (role 51). The text contests the proposition and is dated before Davis’s review of 23 October 2014. The record was admitted on this proposition with a passage matched against the held text. Decision 3 widens the collection’s period to cover texts of 1993 to 1997.',
      claimIds: [
        'rd-r06-yudkowsky-1996-survival-ethic',
        'rd-r06-davis-2014-ethical-guidelines-superintelligence',
      ],
      recordedAt: recheckDecisions,
    },
    {
      propositionId: 'loss-of-control-route',
      replaced:
        'No earliest located headline: under re-check from 2026-11-02. Before that, Bostrom’s paper of March 2002 was headlined.',
      reason:
        'Moved on 2026-11-02 to Clemmensen’s Extropians message of 30 August 1996, by the maintainer’s decision on the cross-family re-check (role 53). The text meets the criterion and is dated before Bostrom’s paper of March 2002. The record was admitted on this proposition with a passage matched against the held text. Decision 3 widens the collection’s period to cover texts of 1993 to 1997.',
      claimIds: [
        'rd-r08-clemmensen-1996-thinking-about-the-future',
        'rd-r08-bostrom-2002-existential-risks',
      ],
      recordedAt: recheckDecisions,
    },
    {
      propositionId: 'loss-of-control-route',
      replaced:
        'No earliest located contesting headline: under re-check from 2026-11-02. Before that, Pinker’s Edge response of 2014 was headlined.',
      reason:
        'Moved on 2026-11-02 to Yudkowsky’s Extropians message of 22 November 1996, by the maintainer’s decision on the cross-family re-check (role 54). The text contests the proposition and is dated before Pinker’s Edge response of 2014. The record was admitted on this proposition with a passage matched against the held text. Decision 3 widens the collection’s period to cover texts of 1993 to 1997.',
      claimIds: [
        'rd-r08-yudkowsky-1996-survival-ethic',
        'rd-r08-pinker-2014-edge-myth-of-ai',
      ],
      recordedAt: recheckDecisions,
    },
    {
      propositionId: 'benevolence-or-no-drive-to-dominate',
      replaced:
        'No earliest located contesting headline: under re-check from 2026-11-02. Before that, Omohundro’s “The Basic AI Drives” (2008) was headlined.',
      reason:
        'Moved on 2026-11-02 to Clemmensen’s Extropians message of 30 August 1996, by the maintainer’s decision on the cross-family re-check (role 57). The text contests the proposition and is dated before Omohundro’s “The Basic AI Drives”. The record was admitted on this proposition with a passage matched against the held text. Decision 3 widens the collection’s period to cover texts of 1993 to 1997.',
      claimIds: [
        'rd-r10a-clemmensen-1996-thinking-about-the-future',
        'rd-r10a-omohundro-2008-basic-ai-drives',
      ],
      recordedAt: recheckDecisions,
    },
    {
      propositionId: 'control-by-design',
      replaced:
        'No earliest located headline: under re-check from 2026-11-02. Before that, Kelly’s Edge response (attested 18 November 2014) was headlined.',
      reason:
        'Moved on 2026-11-02 to Davis’s review of 23 October 2014, by the maintainer’s decision on the cross-family re-check (role 58). The text meets the criterion and is dated before Kelly’s Edge response. The record was admitted on this proposition with a passage matched against the held text.',
      claimIds: [
        'rd-r10b-davis-2014-ethical-guidelines-superintelligence',
        'rd-r10b-kelly-2014-edge-myth-of-ai',
      ],
      recordedAt: recheckDecisions,
    },
    {
      propositionId: 'risk-claims-speculative',
      replaced:
        'No earliest located contesting headline: under re-check from 2026-11-02. Before that, Russell’s Edge essay (attested 6 December 2014) was headlined.',
      reason:
        'Moved on 2026-11-02 to Bostrom’s “Existential Risks” (March 2002), by the maintainer’s decision on the cross-family re-check (role 60). The text contests the proposition and is dated before Russell’s Edge essay. The record was admitted on this proposition with a passage matched against the held text.',
      claimIds: [
        'rd-r11-bostrom-2002-existential-risks',
        'rd-r11-russell-2014-edge-myths-and-moonshine',
      ],
      recordedAt: recheckDecisions,
    },
    {
      propositionId: 'gradual-takeoff',
      replaced:
        'No earliest located headline: under re-check from 2026-11-02. Before that, Brooks’s essay of 7 September 2017 was headlined.',
      reason:
        'Moved on 2026-11-02 to Hanson’s post “Setting the Stage” (headed 18 November 2008; wording attested by the MIRI compilation of 2013), by the maintainer’s decision on the cross-family re-check (role 67). The text meets the criterion and is dated before Brooks’s essay of 7 September 2017. The record was admitted on this proposition with a passage matched against the held text.',
      claimIds: [
        'rd-r16-hanson-2008-setting-the-stage',
        'rd-r16-brooks-2017-seven-deadly-sins',
      ],
      recordedAt: recheckDecisions,
    },
    {
      propositionId: 'incentives-produce-safety',
      replaced:
        'No earliest located contesting headline: under re-check from 2026-11-02. Before that, Armstrong, Bostrom and Shulman’s report of October 2013 was headlined.',
      reason:
        'Moved on 2026-11-02 to Vinge’s paper of December 1993, by the maintainer’s decision on the cross-family re-check (role 68). The text contests the proposition and is dated before Armstrong, Bostrom and Shulman’s report of October 2013. The record was admitted on this proposition with a passage matched against the held text. Decision 3 widens the collection’s period to cover texts of 1993 to 1997.',
      claimIds: [
        'rd-r17-vinge-1993-coming-technological-singularity',
        'rd-r17-armstrong-2013-racing',
      ],
      recordedAt: recheckDecisions,
    },
    {
      propositionId: 'incentives-produce-safety',
      replaced:
        'No earliest located headline: under re-check from 2026-11-02. Before that, Hanson’s post of 14 April 2023 was headlined.',
      reason:
        'Moved on 2026-11-02 to Hanson’s post “Friendly Projects vs. Products” (headed 5 December 2008; wording attested by the MIRI compilation of 2013), same author, by the maintainer’s decision on the cross-family re-check (role 69). The text meets the criterion and is dated before Hanson’s post of 14 April 2023. The record was admitted on this proposition with a passage matched against the held text.',
      claimIds: [
        'rd-r17-hanson-2008-friendly-projects-vs-products',
        'rd-r17-hanson-2023-reasonable-ai-fears',
      ],
      recordedAt: recheckDecisions,
    },
    {
      propositionId: 'benevolence-or-no-drive-to-dominate',
      replaced:
        'No earliest located headline: under re-check from 2026-11-02. Before that, Goertzel’s essay of 17 February 2004 was headlined.',
      reason:
        'Moved on 2026-11-02 to Yudkowsky’s Extropians message of 22 November 1996, by the maintainer’s decision on the cross-family re-check (role 72). The text meets the criterion and is dated before Goertzel’s essay of 17 February 2004. The record was admitted on this proposition with a passage matched against the held text. Decision 3 widens the collection’s period to cover texts of 1993 to 1997.',
      claimIds: [
        'rd-r10a-yudkowsky-1996-survival-ethic',
        'rd-r10a-goertzel-2004-positive-transcension',
      ],
      recordedAt: recheckDecisions,
    },
    {
      propositionId: 'control-by-design',
      replaced:
        'No earliest located contesting headline: under re-check from 2026-11-02. Before that, the corrigibility paper of 25 January 2015 was headlined.',
      reason:
        'Moved on 2026-11-02 to Vinge’s paper of December 1993, by the maintainer’s decision on the cross-family re-check (role 75). The text contests the proposition and is dated before the corrigibility paper of 25 January 2015. The record was admitted on this proposition with a passage matched against the held text. Decision 3 widens the collection’s period to cover texts of 1993 to 1997.',
      claimIds: [
        'rd-r10b-vinge-1993-coming-technological-singularity',
        'rd-r10b-corrigibility-2015',
      ],
      recordedAt: recheckDecisions,
    },
    {
      propositionId: 'alignment-is-hard',
      replaced:
        'No headline for the earliest located use of the name: under re-check from 2026-11-02. Before that, Russell’s comments of 2019 was headlined, with “alignment problem”.',
      reason:
        'Dropped on 2026-11-02 by the maintainer’s decision on the cross-family re-check (role 13): the usual names are ordinary phrases rather than names of this proposition, so no text is headlined as using them first. The names stay listed. No label or affiliation is inferred from them.',
      claimIds: ['rd-r06-russell-2019-instrumental-convergence-thread'],
      recordedAt: recheckDecisions,
    },
    {
      propositionId: 'ai-extinction-risk',
      replaced:
        'No headline for the earliest located use of the name: under re-check from 2026-11-02. Before that, the Center for AI Safety statement of 30 May 2023 was headlined, with “risk of extinction”.',
      reason:
        'Dropped on 2026-11-02 by the maintainer’s decision on the cross-family re-check (role 14): the usual names are ordinary phrases rather than names of this proposition, so no text is headlined as using them first. The names stay listed. No label or affiliation is inferred from them.',
      claimIds: ['rd-r07-cais-2023-statement'],
      recordedAt: recheckDecisions,
    },
    {
      propositionId: 'misuse-route',
      replaced:
        'No headline for the earliest located use of the name: under re-check from 2026-11-02. Before that, Hendrycks and others (21 June 2023) was headlined, with “malicious use”.',
      reason:
        'Dropped on 2026-11-02 by the maintainer’s decision on the cross-family re-check (role 16): the usual names are ordinary phrases rather than names of this proposition, so no text is headlined as using them first. The names stay listed. No label or affiliation is inferred from them.',
      claimIds: ['rd-r09-hendrycks-2023-overview-catastrophic'],
      recordedAt: recheckDecisions,
    },
    {
      propositionId: 'present-harms-priority',
      replaced:
        'No headline for the earliest located use of the name: under re-check from 2026-11-02. Before that, the FAQ on catastrophic AI risks (June 2023) was headlined, with “current harms”.',
      reason:
        'Dropped on 2026-11-02 by the maintainer’s decision on the cross-family re-check (role 17): the usual names are ordinary phrases rather than names of this proposition, so no text is headlined as using them first. The names stay listed. No label or affiliation is inferred from them.',
      claimIds: ['rd-r12-bengio-2023-faq-catastrophic'],
      recordedAt: recheckDecisions,
    },
    {
      propositionId: 'capabilities-plateau',
      replaced:
        'No headline for the earliest located use of the name: under re-check from 2026-11-02. Before that, Marcus, “Deep Learning Is Hitting a Wall” (10 March 2022) was headlined, with “diminishing returns”.',
      reason:
        'Dropped on 2026-11-02 by the maintainer’s decision on the cross-family re-check (role 18): the usual names are ordinary phrases rather than names of this proposition, so no text is headlined as using them first. The names stay listed. No label or affiliation is inferred from them.',
      claimIds: ['rd-r13-marcus-2022-hitting-a-wall'],
      recordedAt: recheckDecisions,
    },
    {
      propositionId: 'llms-lack-agency',
      replaced:
        'No headline for the earliest located use of the name: under re-check from 2026-11-02. Before that, Marcus, “Nonsense on Stilts” (12 June 2022) was headlined, with “autocomplete”.',
      reason:
        'Dropped on 2026-11-02 by the maintainer’s decision on the cross-family re-check (role 19): the usual names are ordinary phrases rather than names of this proposition, so no text is headlined as using them first. The names stay listed. No label or affiliation is inferred from them.',
      claimIds: ['rd-r14-marcus-2022-nonsense-on-stilts'],
      recordedAt: recheckDecisions,
    },
    {
      propositionId: 'open-models-reduce-risk',
      replaced:
        'No headline for the earliest located use of the name: under re-check from 2026-11-02. Before that, Goertzel and Pitt (February 2012) was headlined, with “open source”.',
      reason:
        'Dropped on 2026-11-02 by the maintainer’s decision on the cross-family re-check (role 20): the usual names are ordinary phrases rather than names of this proposition, so no text is headlined as using them first. The names stay listed. No label or affiliation is inferred from them.',
      claimIds: ['rd-r15-goertzel-pitt-2012-open-source-agi'],
      recordedAt: recheckDecisions,
    },
    {
      propositionId: 'incentives-produce-safety',
      replaced:
        'No headline for the earliest located use of the name: under re-check from 2026-11-02. Before that, Askell and others (10 July 2019) was headlined, with “incentives”.',
      reason:
        'Dropped on 2026-11-02 by the maintainer’s decision on the cross-family re-check (role 22): the usual names are ordinary phrases rather than names of this proposition, so no text is headlined as using them first. The names stay listed. No label or affiliation is inferred from them.',
      claimIds: ['rd-r17-askell-2019-cooperation'],
      recordedAt: recheckDecisions,
    },
  ],
  limits: [
    '“Earliest located” means the earliest text found by the searches described under “How we searched”. It is not a claim of first use or first statement, and the order of texts records no influence.',
    'A record documents what one text says on its date. It is not evidence that the proposition is true, and it does not say what the author holds at another date.',
    'No author is placed on a side. A proposition is phrased generically and attributed to no one, and texts grouped under one proposition disagree about much else.',
    'A signed statement is recorded as a text; no record attributes a stance to its signatories.',
    'An answer from one text to another is recorded as a citation. It is not agreement.',
    'B1 and A4 are shared with the superintelligence collection, and the texts recorded there from 1863 appear here too. The codes R04 and R05 of the research pack correspond to B1 and A4.',
    'A machine selected and classified these records, and machine checks from two model families re-examined them.',
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
      {
        propositionId: 'intelligence-as-own-end',
        relation:
          'The contrary claim in the collection on machine succession, scale and acceleration: that the growth of intelligence is its own end.',
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
