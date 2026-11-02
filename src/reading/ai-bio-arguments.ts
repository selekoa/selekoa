import type { PropositionsCollection } from '../domain/propositions';
import { aiBioArgumentsFrame as frame } from './proposition-frames';

/** The maintainer's decisions of 2026-11-02 on the earliest-located re-check (decisions 1 to 4). */
const recheckDecisions = '2026-11-02';

/** The interim withdrawal of 2026-11-02: headlines the cross-family re-check marks move or undecidable. */
const recheckWithdrawn = '2026-11-02';

const admitted = '2026-10-30';

export const aiBioArguments: PropositionsCollection = {
  id: frame.id,
  version: frame.version,
  title: frame.title,
  question: frame.question,
  editorialStatus: frame.editorialStatus,
  introduction:
    'Each argument is recorded as a proposition with one criterion. It is phrased generically and attributed to no one. A text that meets the criterion articulates the proposition. A text that disputes it contests it. A text that comes close bears on it, and its record names what is missing. Every record stays at the policy and evaluation level: it says what a text argues, not how anything could be done. Texts are listed in date order. The page records what texts say and when; it does not assess whether an argument is right, and it is not evidence about any risk.',
  groups: frame.groups,
  searchNote: {
    scope:
      'The collection records what located texts say about seven propositions on AI and biological risk. The propositions were written from the texts the search found, not from a list supplied in advance. “Earliest located” means the earliest text found by the searches below. It is not a claim that no earlier text exists.',
    venues: [
      {
        period: 'Texts on AI and biological risk, 2023 to 2026',
        items: [
          'Preprints and papers: Soice and others on large language models and dual-use biotechnology (June 2023), Sandbrink on biological design tools and language models (June 2023), Seger and others on open-sourcing highly capable models (September 2023), Moulange and others on the governance of biological design tools (November 2023), Kapoor and others on open foundation models (February 2024) and Peppin and others on the reality of AI and biorisk (December 2024).',
          'Research organisations and think tanks: CSET’s explainer on AI and biorisk (December 2023), RAND’s red-team report (January 2024) and working paper on foundation models (June 2025), and ITIF’s commentary (April 2024).',
          'A developer’s own research post: Anthropic on language models and biological risk (September 2025).',
          'Found by web discovery searches and retrieved directly on 2026-10-28, and again at admission on 2026-10-30.',
        ],
      },
      {
        period: 'A cross-family check, 2026-10-30',
        items: [
          'A model from another family re-read every argument record against its proposition’s criterion and searched for earlier texts.',
          'It found three roles not established by the passages cited, which were downgraded to context at admission; the roles then moved to the next qualifying text, on passages already quoted.',
        ],
      },
    ],
    methods: [
      'Sources were retrieved directly by script, one request at a time, on 2026-10-28 and again at admission on 2026-10-30. Each retrieved text is identified by its SHA-256 hash in the source record.',
      'Every quotation was compared with the retrieved text, both times. Paraphrases are labelled as such, including passages from PDFs whose text layer displaces characters.',
      'Each record was applied against its proposition’s criterion as worded. A text that argues something adjacent bears on the proposition and its record says what is missing.',
      'Two fresh-context machine audits by Claude models and a check by an OpenAI GPT model re-read these records.',
    ],
    gaps: [
      'The physical-bottleneck proposition carries no articulation: the one text the research pack headlined was downgraded to context by its own audit, and the paywalled venues the pass could not reach were not searched. Three contesting texts and one context record stand; the imbalance is a result of the search, not a finding.',
      'The screening-control-point proposition carries no contesting text after the check found that potential evadability does not contest the control point.',
      'Not recorded: a 2022 commentary on dual-use drug discovery, whose full text no route served at the time of the pack; the cross-family check later reached an author manuscript, and it is left for a separate pass.',
      'Not searched: conference talks, podcasts and social media; texts not in English; and the paywalled journals whose articles the pass could not retrieve.',
    ],
    corrections:
      'A text found later that is earlier than an earliest located text becomes the new earliest located text, and the earlier headline stays on record as a correction.',
  },
  corrections: [
    {
      propositionId: 'ab-prop-synthesis-screening-control-point',
      replaced:
        'The preprint of 6 June 2023 on large language models and dual-use biotechnology, headlined as earliest located by the research pack of 2026-10-28.',
      reason:
        'The cross-family check found that proposing screening among three promising measures does not state the dependence the criterion asks for. Sandbrink’s preprint of 24 June 2023, which states that reducing the risks depends on enhanced screening of gene synthesis, holds the role.',
      claimIds: ['ab-arg-d5-soice-context', 'ab-arg-d5-sandbrink-articulates'],
      recordedAt: admitted,
    },
    {
      propositionId: 'ab-prop-skilled-actor-scope',
      replaced:
        'Sandbrink’s preprint of 24 June 2023, headlined as earliest located by the research pack of 2026-10-28.',
      reason:
        'The cross-family check found that stating that design tools expand the capabilities of sophisticated actors does not state that assessment must cover them. RAND’s working paper of 12 June 2025, which states that safety assessments fail to account for skilled actors, holds the role.',
      claimIds: ['ab-arg-d7-sandbrink-context', 'ab-arg-d7-brent-articulates'],
      recordedAt: admitted,
    },
    {
      propositionId: 'ab-prop-synthesis-screening-control-point',
      replaced:
        'The workshop paper of 27 November 2023, headlined as the earliest located contesting text by the research pack of 2026-10-28.',
      reason:
        'The cross-family check found that stating that design capabilities could be used to evade screening does not contest screening’s role as a control point. No contesting text holds the role.',
      claimIds: ['ab-arg-d5-moulange-context'],
      recordedAt: admitted,
    },
    {
      propositionId: 'ab-prop-current-system-uplift',
      replaced:
        '“Can large language models democratize access to dual-use biotechnology?” (2023), headlined as earliest located.',
      reason:
        'Withdrawn on 2026-11-02 by the maintainer’s decision to withdraw every headline the cross-family re-check proposes to move or could not decide, pending adjudication; no record holds the headline meanwhile. The re-check proposes an earlier text the dataset holds: The held GPT-4 system card already reports reduced research time versus ordinary search and useful assistance to nonexperts in its unconventional-weapons assessment, including biology. A matching April 1, 2023 capture predates Soice’s June 6 v1.',
      claimIds: ['ab-arg-d1-soice-articulates'],
      recordedAt: recheckWithdrawn,
    },
    {
      propositionId: 'ab-prop-synthesis-screening-control-point',
      replaced:
        '“Artificial intelligence and biological misuse: Differentiating risks of language models and biological design tools” (2023), headlined as earliest located.',
      reason:
        'Withdrawn on 2026-11-02 by the maintainer’s decision to withdraw every headline the cross-family re-check proposes to move or could not decide, pending adjudication; no record holds the headline meanwhile. The re-check proposes an earlier text the dataset holds: Soice’s June 6 v1 already recommends verified screening of synthesized DNA as a nonproliferation control for chatbot-enabled biological misuse. It precedes Sandbrink’s June 24 v1 and is a direct mitigation recommendation, not a relay or a general screening history.',
      claimIds: ['ab-arg-d5-sandbrink-articulates'],
      recordedAt: recheckWithdrawn,
    },
    {
      propositionId: 'ab-prop-open-weights-bio-risk',
      replaced:
        '“Open-Sourcing Highly Capable Foundation Models: An evaluation of risks, benefits, and alternative methods for pursuing open-source objectives” (2023), headlined as earliest located.',
      reason:
        'Withdrawn on 2026-11-02 by the maintainer’s decision to withdraw every headline the cross-family re-check proposes to move or could not decide, pending adjudication; no record holds the headline meanwhile. The re-check proposes an earlier text the dataset holds: Sandbrink’s June 24 v1 already recommends structured access and considering limits on open-sourcing powerful LLMs for biological-risk mitigation, and restricted release for relevant design tools. This qualifies under the criterion’s model-should-not-be-openly-released arm before Seger’s recorded September 29 submission date.',
      claimIds: ['ab-arg-d6-seger-articulates'],
      recordedAt: recheckWithdrawn,
    },
    {
      propositionId: 'ab-prop-evaluation-validity',
      replaced:
        '“The Reality of AI and Biorisk” (2024), headlined as earliest located.',
      reason:
        'Withdrawn on 2026-11-02 by the maintainer’s decision to withdraw every headline the cross-family re-check proposes to move or could not decide, pending adjudication; no record holds the headline meanwhile. The re-check proposes an earlier text the dataset holds: The GPT-4 system card already separates assessed capabilities from the probability of a user employing them, and identifies physical-access requirements that information assistance alone does not satisfy. This explicitly limits inference from its evaluation to real-world proliferation risk before the December 2024 methodological review. It is a bounded caveat about this evaluation, not a verdict on every later benchmark.',
      claimIds: ['ab-arg-d3-peppin-articulates'],
      recordedAt: recheckWithdrawn,
    },
    {
      propositionId: 'ab-prop-skilled-actor-scope',
      replaced:
        '“Contemporary AI foundation models increase biological weapons risk” (2025), headlined as earliest located.',
      reason:
        'Withdrawn on 2026-11-02 by the maintainer’s decision to withdraw every headline the cross-family re-check proposes to move or could not decide, pending adjudication; no record holds the headline meanwhile. The re-check proposes an earlier text the dataset holds: Sandbrink’s June 2023 v1 already differentiates nonexpert assistance from capability gains for sophisticated actors, requires monitoring design-tool risk and discusses actor-specific interventions. That puts skilled actors within the required risk-assessment scope before Brent–McKelvey’s June 2025 critique of incomplete benchmarks. It is not evidence that every earlier evaluation actually covered them.',
      claimIds: ['ab-arg-d7-brent-articulates'],
      recordedAt: recheckWithdrawn,
    },
    {
      propositionId: 'ab-prop-current-system-uplift',
      replaced:
        'No earliest located headline: under re-check from 2026-11-02. Before that, Soice and others (arXiv v1, 6 June 2023) was headlined.',
      reason:
        'Moved on 2026-11-02 to OpenAI’s GPT-4 System Card (dated 23 March 2023; wording attested by a capture of 1 April 2023 that the re-check read), by the maintainer’s decision on the cross-family re-check (role 166). The text meets the criterion and is dated before Soice and others. The record was admitted on this proposition with a passage matched against the held text. A developer’s report of its own red-team results, not an independent finding.',
      claimIds: [
        'ab-arg-d1-gpt4-card-articulates',
        'ab-arg-d1-soice-articulates',
      ],
      recordedAt: recheckDecisions,
    },
    {
      propositionId: 'ab-prop-open-weights-bio-risk',
      replaced:
        'No earliest located headline: under re-check from 2026-11-02. Before that, Seger and others (arXiv v1, 29 September 2023) was headlined.',
      reason:
        'Moved on 2026-11-02 to Sandbrink (arXiv v1, 24 June 2023), by the maintainer’s decision on the cross-family re-check (role 170). The text meets the criterion and is dated before Seger and others. The record was admitted on this proposition with a passage matched against the held text.',
      claimIds: [
        'ab-arg-d6-sandbrink-articulates',
        'ab-arg-d6-seger-articulates',
      ],
      recordedAt: recheckDecisions,
    },
  ],
  limits: [
    '“Earliest located” means the earliest text found by the searches described under “How we searched”. It is not a claim of first use or first statement.',
    'A record documents what a text says. It is not evidence that the proposition is true, that any system can do what a text says, or that any measure works.',
    'A proposition is phrased generically and attributed to no one. Texts grouped under one proposition disagree with each other about much else.',
    'Every record stays at the policy and evaluation level. No record carries a method, a protocol, an agent or a screening criterion, and where a source holds such content the record cites only its policy-level passages.',
    'The codes D1 to D7 correspond to B1 to B7 in the research pack the records come from, which clashed with the dataset’s own B codes.',
    'A machine selected and classified these records, and machine checks from two model families re-examined them.',
  ],
  axis: frame.axis,
  landing: frame.landing,
  landingAction: frame.landingAction,
  mostDevelopedEmpty: frame.mostDevelopedEmpty,
  earliestEmpty: frame.earliestEmpty,
};
