/**
 * Every propositions collection without its reader text: what pages other
 * than a collection's own read (its ID, title, question, groups and start-page
 * wording), in the order of `propositionCollections`
 * (src/reading/human-thought.ts). The text a collection's page shows (its
 * introduction, search note, corrections, limits, related propositions,
 * exchanges and open premises) is in the whole collection, which only that
 * page loads (src/reading/proposition-loaders.ts), so that a new collection's
 * text does not add to every page's download.
 */
import type { PropositionsFrame } from '../domain/propositions';

/** The frame of `superintelligencePropositions` (src/reading/superintelligence.ts). */
export const superintelligenceFrame = {
  id: 'superintelligence',
  version: 5,
  title: 'Propositions about superintelligence, 1863–2025',
  question:
    'Which located texts from 1863 to 2025, and one earlier text, of 1637, recorded on C1 as context, state, dispute or bear on propositions about machine intelligence? The propositions concern intelligence rising faster than earlier change, and people’s means of observing and directing it becoming inadequate. For each, which text is the earliest located?',
  editorialStatus: 'machine-proposed',
  groups: [
    {
      id: 'A',
      label: 'Temporal compression',
      propositionIds: [
        'intelligence-explosion',
        'seed-ai',
        'recursive-self-improvement',
        'fast-or-hard-takeoff',
        'ai-automated-ai-research',
        'race-compression',
      ],
    },
    {
      id: 'B',
      label: 'Changing epistemic adequacy',
      propositionIds: [
        'treacherous-turn',
        'strategic-concealment',
        'deceptive-alignment',
        'scheming',
        'observed-behaviour-as-evidence',
        'control-or-purpose-specification',
      ],
    },
    {
      id: 'C',
      label: 'Wider senses recorded separately',
      propositionIds: [
        'behavioural-tests-as-evidence',
        'designed-deception-of-testers',
        'competition-defeats-restraint',
      ],
    },
  ],
  // Widened on 2026-11-04 from the default 1860–2025 for Descartes (1637), on C1.
  axis: {
    from: 1630,
    to: 2025,
    ticks: ['1637', '1863', '1950', '2000', '2022'],
  },
} satisfies PropositionsFrame;

/** The frame of `riskDebate` (src/reading/risk-debate.ts). */
export const riskDebateFrame = {
  id: 'risk-debate',
  version: 7,
  title: 'Arguments about catastrophic risk from advanced AI, 1863–2026',
  question:
    'Which published texts, from 1993 to 2026 and, on the two propositions shared with the superintelligence collection, from 1863, state, contest or bear on the arguments that advanced AI could cause catastrophe or human extinction, and on the arguments that the risk is lower, later, placed elsewhere or better handled otherwise? Which texts answer one another? For each proposition, which text is the earliest located?',
  editorialStatus: 'machine-proposed',
  groups: [
    {
      id: 'R1',
      label:
        'Arguments that advanced AI could pose catastrophic risk, and their premises',
      propositionIds: [
        'orthogonality',
        'instrumental-convergence',
        'inner-or-deceptive-misalignment',
        'treacherous-turn',
        'fast-or-hard-takeoff',
        'alignment-is-hard',
        'ai-extinction-risk',
        'loss-of-control-route',
        'misuse-route',
      ],
    },
    {
      id: 'R2',
      label:
        'Arguments that the risk is lower, later, placed elsewhere or better handled otherwise',
      propositionIds: [
        'benevolence-or-no-drive-to-dominate',
        'control-by-design',
        'risk-claims-speculative',
        'present-harms-priority',
        'capabilities-plateau',
        'llms-lack-agency',
        'open-models-reduce-risk',
        'gradual-takeoff',
        'incentives-produce-safety',
      ],
    },
  ],
  axis: {
    from: 1860,
    to: 2027,
    ticks: ['1863', '1900', '1950', '2000', '2026'],
  },
  landing:
    '{propositions} propositions about catastrophic risk from advanced AI, and {records} records from {texts} texts that state, contest or bear on them, with the published exchanges between them. Each proposition names its earliest located text. The page can be downloaded as a research starter, with the original sources first.',
  landingAction: 'Read the arguments about catastrophic risk →',
  mostDevelopedEmpty: null,
  earliestEmpty: 'No located text meets the criterion.',
} satisfies PropositionsFrame;

/** The frame of `yudkowskyArguments` (src/reading/yudkowsky-arguments.ts). */
export const yudkowskyArgumentsFrame = {
  id: 'yudkowsky-arguments',
  version: 6,
  title: 'Eliezer Yudkowsky’s arguments on common claims about AI, 1996–2026',
  question:
    'Which located texts by Eliezer Yudkowsky, from 1996 to 2026, state, contest or bear on 29 claims often made about advanced AI? For each claim, which of his located texts is the earliest to contest it, and which earlier views of his did later texts of his contest?',
  editorialStatus: 'machine-proposed',
  groups: [
    {
      id: 'Y',
      label: 'Common claims about advanced AI',
      propositionIds: [
        'switch-off-if-dangerous',
        'intelligence-brings-benevolence',
        'understanding-implies-compliance',
        'short-instruction-suffices',
        'feedback-instils-values',
        'confinement-keeps-it-safe',
        'ai-solves-alignment',
        'warning-signs-in-time',
        'next-word-prediction-is-shallow',
        'diminishing-returns-to-intelligence',
        'slow-takeoff-time-to-adjust',
        'evaluations-catch-danger',
        'agi-decades-away',
        'fix-problems-as-they-arise',
        'tool-without-goals',
        'give-it-human-values',
        'pause-or-regulation-suffices',
        'earth-not-worth-taking',
        'harm-requires-hostility',
        'risk-is-film-fiction',
        'human-data-humanlike-mind',
        'build-superintelligence-fast',
        'build-it-before-rivals',
        'interpretability-reads-its-mind',
        'no-body-no-danger',
        'experiment-and-see',
        'developers-know-what-they-are-doing',
        'many-ais-balance',
        'default-outcome-good',
      ],
    },
  ],
  axis: {
    from: 1994,
    to: 2028,
    ticks: ['1996', '2000', '2005', '2010', '2015', '2020', '2026'],
  },
  landing:
    '{propositions} claims often made about advanced AI, each recorded as a proposition with one criterion, and {records} records from {texts} texts by Eliezer Yudkowsky, 1996–2026, that state, contest or bear on them. Each claim names his earliest located text that contests it, and his earlier views appear with his later texts that contest them. The page can be downloaded as a research starter, with the original sources first.',
  landingAction: 'Read his arguments, claim by claim →',
  mostDevelopedEmpty: null,
  earliestEmpty: 'None of his located texts states it.',
  // Premises that no located passage addresses, as the research pack states
  // them. The pack's per-proposition search notes stay in the pack, because
  // they quote further passages that no quotation limit has counted.
} satisfies PropositionsFrame;

/** The frame of `machineSuccession` (src/reading/machine-succession.ts). */
export const machineSuccessionFrame = {
  id: 'machine-succession',
  version: 8,
  title:
    'Machine succession, scale and acceleration: propositions in located texts, 1863–2026',
  question:
    'Which located texts, from 1863 to 2026, state, contest or bear on ten propositions about machine intelligence: that machines succeed humans, that this would be acceptable, that minds move into machines, that building such machines brings conflict, that machine intelligence vastly exceeds human intelligence, that capital is itself a machine intelligence, that intelligence is its own end, that development should be accelerated, and that machine intelligence is a cosmic process that spreads beyond Earth? For each proposition, which text is the earliest located?',
  editorialStatus: 'machine-proposed',
  groups: [
    {
      id: 'WA',
      label: 'Machine intelligence and the human succession',
      propositionIds: [
        'machine-succession',
        'succession-acceptable',
        'mind-transfer',
        'species-dominance-conflict',
      ],
    },
    {
      id: 'WB',
      label: 'Scale, direction and cosmic setting of machine intelligence',
      propositionIds: [
        'vast-superiority',
        'cosmic-process',
        'cosmic-expansion',
      ],
    },
    {
      id: 'WC',
      label: 'Machine intelligence, capital, values and acceleration',
      propositionIds: [
        'capital-as-machine-intelligence',
        'intelligence-as-own-end',
        'accelerate-machine-intelligence',
      ],
    },
  ],
  axis: {
    from: 1860,
    to: 2027,
    ticks: ['1863', '1900', '1950', '1979', '2000', '2026'],
  },
  landing:
    '{propositions} propositions about machine succession, scale and acceleration, and {records} records from {texts} texts that state, contest or bear on them. Each proposition names its earliest located text where one is settled. The page can be downloaded as a research starter, with the original sources first.',
  landingAction: 'Read the texts on machine succession →',
  mostDevelopedEmpty: null,
  earliestEmpty: 'No located text meets the criterion.',
} satisfies PropositionsFrame;

/** The frame of `antecedentTexts` (src/reading/antecedent-texts.ts). */
export const antecedentTextsFrame = {
  id: 'antecedent-texts',
  version: 2,
  title: 'Antecedent texts: machine intelligence before 1965',
  question:
    'Which located texts state, contest or bear on three propositions about machines that recur before 1965: that a machine can only do what it is ordered to do, that a machine could think, and that machine intelligence will bring a singularity? For each proposition, which text is the earliest located?',
  editorialStatus: 'machine-proposed',
  groups: [
    {
      id: 'UA',
      label: 'Whether machines can think or originate',
      propositionIds: [
        'machines-only-do-what-they-are-ordered',
        'machines-could-think',
      ],
    },
    {
      id: 'UB',
      label: 'A point beyond which human affairs could not continue',
      propositionIds: ['technological-singularity'],
    },
  ],
  axis: {
    from: 1630,
    to: 1995,
    ticks: ['1637', '1843', '1900', '1950', '1965', '1993'],
  },
  landing:
    '{propositions} propositions about whether machines can think or originate anything, and {records} records from {texts} texts that state, contest or bear on them. Each proposition names its earliest located text. The page can be downloaded as a research starter, with the original sources first.',
  landingAction: 'Read the antecedent texts →',
  mostDevelopedEmpty: null,
  earliestEmpty: 'No located text meets the criterion.',
} satisfies PropositionsFrame;

/** The frame of `economicsOfMachineIntelligence` (src/reading/economics.ts). */
export const economicsFrame = {
  id: 'economics-of-machine-intelligence',
  version: 7,
  title:
    'Economics of machine intelligence: texts from 1952 to 2026 that state, contest or bear on its propositions',
  question:
    'Which located texts, from 1952 to 2026, and one earlier text, Wiener’s Cybernetics (1948, wording attested 2019), recorded on M06a, state, contest or bear on propositions about the economics of machine intelligence? Three strands are recorded. The first is the debate over whether machine intelligence could make economic growth explosive. The second is how mainstream economics treated automation, computers and AI. The third is how economists took up recursive self-improvement, superintelligence and existential risk from AI, ideas mostly discussed outside economics. For each proposition, which text by an economist is the earliest located, and which text outside that group?',
  editorialStatus: 'machine-proposed',
  groups: [
    {
      id: 'G',
      label: 'The explosive-growth debate',
      propositionIds: [
        'explosive-growth-from-labour-substitution',
        'accelerating-growth-from-automated-research',
        'long-run-history-suggests-acceleration',
        'unautomated-tasks-bottleneck-growth',
        'other-constraints-prevent-explosive-growth',
        'no-current-sign-of-explosive-growth',
        'machine-substitution-lowers-wages',
        'modest-near-term-ai-productivity-effect',
        'explosive-growth-estimates',
      ],
    },
    {
      id: 'M',
      label: 'Mainstream economics, automation and AI',
      propositionIds: [
        'automation-as-ordinary-technical-change',
        'ai-as-task-automation',
        'ai-general-purpose-technology-with-lag',
        'ai-as-cheaper-prediction',
        'machines-cheaper-at-every-task',
        'automation-lowers-labour-income',
        'compensating-policy-for-ai',
        'task-based-exposure-measurement',
        'ai-productivity-over-next-decade',
        'recent-economics-engagement-with-ai',
      ],
    },
    {
      id: 'E',
      label: 'Superintelligence and existential risk',
      propositionIds: [
        'ai-improving-ai-accelerates-capability',
        'machine-intelligence-exceeds-humans-in-all-domains',
        'ai-existential-risk-in-economic-analysis',
        'ai-developer-incentives-and-safety',
        'economics-engagement-with-superintelligence',
      ],
    },
  ],
  tiers: {
    1: 'Scholarly work by economists in any venue, including their essays in magazines, and any text in a core economics venue, whoever wrote it. An economist has an economics appointment, degree, address or affiliation shown in or near the text, or an established record as an economist when the text was written. The core venues are the five leading general economics journals, the Journal of Economic Perspectives, the Journal of Economic Literature, AER Papers and Proceedings, NBER working papers and the NBER Economics of AI volume, and Kansantaloudellinen aikakauskirja for the Finnish texts.',
    2: 'Texts by non-economists, whatever the venue, and short-form commentary even by economists: blog comments, forum replies, and magazine or online debates, unless a turn is itself a substantive scholarly argument.',
  },
  // Widened on 2026-11-04 from 1950 for Wiener’s Cybernetics (1948), on M06a.
  axis: {
    from: 1945,
    to: 2026,
    ticks: ['1948', '1966', '1984', '2000', '2015', '2024'],
  },
  landing:
    '{propositions} propositions on the economics of machine intelligence, and {records} records from {texts} texts, 1952–2026, that state, contest or bear on them: the explosive-growth debate, how mainstream economics treated automation and AI, and how economists took up superintelligence and existential risk from AI. Each text carries its tier, and model results their conditions. The page can be downloaded as a research starter, with the original sources first.',
  landingAction: 'Read the economics propositions →',
  mostDevelopedEmpty: null,
  earliestEmpty: 'No located tier-1 text meets the criterion.',
} satisfies PropositionsFrame;

/** The frame of `orbitalCompute` (src/reading/orbital-compute.ts). */
export const orbitalComputeFrame = {
  id: 'orbital-compute-arguments',
  version: 3,
  title: 'Arguments about compute in orbit',
  question:
    'Which located texts, from 1989 to 2026, state, contest or bear on the reasons given for placing computing in orbit and on the limits and objections raised against it? For each proposition, which text is the earliest located?',
  editorialStatus: 'machine-proposed',
  groups: [
    {
      id: 'R',
      label: 'Reasons given for orbital compute',
      propositionIds: [
        'oc1-orbital-solar-supply',
        'oc2-radiative-cooling-advantage',
        'oc3-terrestrial-constraints',
        'oc4-launch-cost-condition',
        'oc5-lifecycle-emissions',
      ],
    },
    {
      id: 'L',
      label: 'Limits and objections',
      propositionIds: [
        'oc6-heat-rejection-limit',
        'oc7-radiation-effects',
        'oc8-no-repair',
        'oc9-launch-cost-too-high',
        'oc10-ground-bandwidth',
        'oc11-sky-and-debris',
      ],
    },
  ],
  axis: {
    from: 1986,
    to: 2027,
    ticks: ['1989', '2000', '2010', '2019', '2024', '2026'],
  },
  landing:
    '{propositions} propositions about the reasons for and the limits of placing computing in orbit, and {records} records from {texts} texts, 1989–2026, that state, contest or bear on them. Each proposition names its earliest located text. The page can be downloaded as a research starter, with the original sources first.',
  landingAction: 'Read the arguments about compute in orbit →',
  mostDevelopedEmpty: null,
  earliestEmpty: 'No located text meets the criterion.',
} satisfies PropositionsFrame;

/** The frame of `aiBioArguments` (src/reading/ai-bio-arguments.ts). */
export const aiBioArgumentsFrame = {
  id: 'ai-bio-arguments',
  version: 3,
  title: 'Arguments about AI and biological risk',
  question:
    'Which located texts, from 2023 to 2026, state, contest or bear on the published arguments about AI and biological risk: whether current systems already help an actor seeking biological harm, where the binding barrier lies, what published evaluations establish, whether design tools are a distinct case, whether synthesis screening is the control point, whether open weights raise the risk, and whom assessment must cover? For each proposition, which text is the earliest located?',
  editorialStatus: 'machine-proposed',
  groups: [
    {
      id: 'R',
      label: 'What current systems and evaluations show',
      propositionIds: [
        'ab-prop-current-system-uplift',
        'ab-prop-physical-bottleneck',
        'ab-prop-evaluation-validity',
      ],
    },
    {
      id: 'G',
      label: 'What follows for governance',
      propositionIds: [
        'ab-prop-design-tools-distinct',
        'ab-prop-synthesis-screening-control-point',
        'ab-prop-open-weights-bio-risk',
        'ab-prop-skilled-actor-scope',
      ],
    },
  ],
  axis: {
    from: 2023,
    to: 2026,
    ticks: ['2023', '2024', '2025', '2026'],
  },
  landing:
    '{propositions} propositions about AI and biological risk, and {records} records from {texts} texts, 2023–2026, that state, contest or bear on them. Each proposition names its earliest located text. The page can be downloaded as a research starter, with the original sources first.',
  landingAction: 'Read the arguments about AI and biological risk →',
  mostDevelopedEmpty: null,
  earliestEmpty: 'No located text meets the criterion.',
} satisfies PropositionsFrame;

/** The frame of `aiInScience` (src/reading/ai-in-science.ts). */
export const aiInScienceFrame = {
  id: 'ai-in-science',
  version: 3,
  title: 'AI in science',
  question:
    'Which located texts state, contest or bear on what AI does, or will do, in a science? In biology, from 1987 to 2026: whether predicted protein structures help to design drugs, whether AI models can simulate cells, whether drug candidates found with AI have entered clinical trials and pass them more often, whether machine learning makes new proteins designable, and whether biology is information that AI can read or program. For each proposition, which text is the earliest located?',
  editorialStatus: 'machine-proposed',
  groups: [
    {
      id: 'biology',
      label: 'Biology',
      propositionIds: [
        'aib-prop-predicted-structures-aid-drug-design',
        'aib-prop-ai-virtual-cell',
        'aib-prop-ai-drug-candidate-in-trials',
        'aib-prop-ai-drugs-higher-trial-success',
        'aib-prop-ml-designs-new-proteins',
        'aib-prop-biology-as-information-for-ai',
      ],
    },
  ],
  axis: {
    from: 1985,
    to: 2026,
    ticks: ['1990', '2000', '2010', '2020'],
  },
  landing:
    'AI in science, field by field. Biology first: {propositions} propositions about AI in biology, and {records} records from {texts} texts, 1987–2026, that state, contest or bear on them. Each proposition names its earliest located text where one is settled. The page can be downloaded as a research starter, with the original sources first.',
  landingAction: 'Read AI in science →',
  mostDevelopedEmpty: null,
} satisfies PropositionsFrame;

/** The frame of `aiAndMoney` (src/reading/ai-and-money.ts). */
export const aiAndMoneyFrame = {
  id: 'ai-and-money',
  version: 1,
  title:
    'AI and money: what central banks and financial authorities have said, 1997–2026',
  question:
    'Which located texts by central banks, the BIS, the FSB, the IMF, standard setters and supervisors, from 1997 to 2026, state, contest or bear on propositions about machine intelligence in financial stability, monetary policy, payments and supervision? For each proposition, which text is the earliest located, whoever speaks in it, and which is the earliest located text in an institution’s own voice? Which institutional events do these bodies state?',
  editorialStatus: 'machine-proposed',
  groups: [
    {
      id: 'JA',
      label: 'Machine intelligence and financial stability',
      propositionIds: [
        'ai-correlated-behaviour-financial-stability',
        'ai-provider-concentration-risk',
        'ai-cyber-fraud-operational-risk',
        'ai-opacity-limits-accountability',
      ],
    },
    {
      id: 'JB',
      label: 'Monetary policy and the economy',
      propositionIds: [
        'ai-improves-nowcasting-policy-analysis',
        'ai-matters-for-monetary-policy',
      ],
    },
    {
      id: 'JC',
      label: 'Payments and money',
      propositionIds: [
        'ai-agents-change-payments',
        'ai-agents-tokenised-money',
      ],
    },
    {
      id: 'JD',
      label: 'Supervision, risk management and central banks’ own work',
      propositionIds: [
        'supervisors-should-use-ai',
        'ai-improves-financial-risk-management',
        'central-banks-build-ai-capacity',
        'existing-frameworks-cover-ai',
      ],
    },
  ],
  axis: {
    from: 1995,
    to: 2027,
    ticks: ['1997', '2004', '2015', '2020', '2026'],
  },
  landing:
    '{propositions} propositions on what central banks and financial authorities have said about machine intelligence, and {records} records from {texts} texts, 1997–2026, that state, contest or bear on them, with institutional events. Each text is labelled by whom it speaks for: the institution, an official, its staff or a committee. The page can be downloaded as a research starter, with the original sources first.',
  landingAction: 'Read AI and money →',
  mostDevelopedEmpty: null,
  earliestEmpty: 'No located text meets the criterion.',
} satisfies PropositionsFrame;

export const propositionFrames: readonly PropositionsFrame[] = [
  antecedentTextsFrame,
  superintelligenceFrame,
  riskDebateFrame,
  yudkowskyArgumentsFrame,
  machineSuccessionFrame,
  economicsFrame,
  orbitalComputeFrame,
  aiBioArgumentsFrame,
  aiInScienceFrame,
  aiAndMoneyFrame,
];
