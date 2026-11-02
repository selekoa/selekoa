import type { PropositionsCollection } from '../domain/propositions';
import { orbitalComputeFrame as frame } from './proposition-frames';

/** The interim withdrawal of 2026-11-02: headlines the cross-family re-check marks move or undecidable. */
const recheckWithdrawn = '2026-11-02';

const admitted = '2026-10-30';

export const orbitalCompute: PropositionsCollection = {
  id: frame.id,
  version: frame.version,
  title: frame.title,
  question: frame.question,
  editorialStatus: frame.editorialStatus,
  introduction:
    'Each argument is recorded as a proposition with one criterion. It is phrased generically and attributed to no one. A text that meets the criterion articulates the proposition. A text that disputes it contests it. A text that comes close bears on it, and its record names what is missing. Companies that propose orbital data centres also state limits of their own designs, and their records say that they come from a proponent. Texts are listed in date order. The page records what texts say and when. It does not assess whether an argument is right or whether any system was built.',
  groups: frame.groups,
  searchNote: {
    scope:
      'The collection records what located texts say about eleven propositions on compute in orbit. “Earliest located” means the earliest text found by the searches below. It is not a claim that no earlier text exists.',
    venues: [
      {
        period: 'Texts on orbital compute, 2019 to 2026',
        items: [
          'Company texts: the Lumen Orbit (now Starcloud) white paper of September 2024, Thales Alenia Space’s ASCEND results of June 2024, Axiom Space’s release of April 2025, NVIDIA’s post on Starcloud of October 2025, Google’s Project Suncatcher post and paper of November 2025, and SpaceX’s update of February 2026.',
          'Critical and independent texts: the Accademia dei Lincei’s comment to the FCC (March 2026), preprints by Geoffrey W. Marcy (March 2026) and Slava G. Turyshev (April 2026), Secure World Foundation’s post on its FCC filings (May 2026) and Andrew Cavalier’s article in IEEE Spectrum (June 2026).',
          'Found by web discovery searches and retrieved directly on 2026-10-28.',
        ],
      },
      {
        period: 'A bounded search for earlier texts, 2026-10-29 and 2026-10-30',
        items: [
          'A cross-family check searched every criterion for earlier texts, including pre-2024 literature on space solar power, radiation in space electronics and orbital edge computing.',
          'It located a 1989 paper on space radiation and electronic microcircuits (radiation), ESPI Report 98 of November 2025 (repair and cost) and a 2025 Perspective on carbon-neutral data centres in space (debris), each read again at admission. The 1989 paper is recorded as context, since the radiation criterion was narrowed on 2026-10-30.',
        ],
      },
    ],
    methods: [
      'Sources were retrieved directly by script, one request at a time, on 2026-10-28 and again at admission on 2026-10-30. Each retrieved text is identified by its SHA-256 hash in the source record.',
      'Every quotation was compared with the retrieved text, both times. Paraphrases are labelled as such.',
      'Where the quoted wording is known only from a later copy, the date from which an Internet Archive capture attests it is shown, and that date decides which text is earliest located.',
      'Fresh-context machine audits by Claude models re-read a sample of 64 records of the research pack, and a check by an OpenAI GPT-6 model re-examined every argument record and searched for earlier texts.',
    ],
    gaps: [
      'Two earlier texts that the check read could not be retrieved at admission and are not recorded: an abstract of 2019 by Periola and Kolawole on space-based data centres (terrestrial constraints) and an ASPLOS 2020 paper on orbital edge computing (links to the ground). Until they are read, the roles they may change stand as recorded.',
      'A 2025 Perspective in Nature Electronics discusses passive cooling as insufficient; whether it states heat rejection as a significant constraint, and in which expression, is not confirmed, so it is not recorded under that proposition.',
      'Not searched: conference talks, podcasts and social media; patents; filings to regulators other than the texts named; and texts not in English.',
      'The FCC applications by SpaceX, Starcloud and Blue Origin and the AAS petition were not read.',
    ],
    corrections:
      'A text found later that is earlier than an earliest located text becomes the new earliest located text, and the earlier headline stays on record as a correction.',
  },
  corrections: [
    {
      propositionId: 'oc7-radiation-effects',
      replaced:
        'The Lumen Orbit white paper (September 2024), headlined as earliest located by the research pack of 2026-10-28.',
      reason:
        'Earlier text found by the cross-family check: Kolasinski’s paper on space radiation and electronic microcircuits (May 1989) meets the criterion as worded.',
      claimIds: ['cpo-orb-oc7-lumen-2024', 'cpo-orb-oc7-kolasinski-1989'],
      recordedAt: admitted,
    },
    {
      propositionId: 'oc7-radiation-effects',
      replaced:
        'Kolasinski’s paper on space radiation and electronic microcircuits (May 1989), headlined as earliest located by part 1 of the admission of 2026-10-30.',
      reason:
        'The criterion was narrowed by the maintainer on 2026-10-30 to texts that discuss computing placed in orbit for this purpose, such as orbital data centres or orbital compute. The paper concerns spacecraft electronics in general and is recorded as context; the Lumen Orbit white paper (September 2024) is earliest located again.',
      claimIds: ['cpo-orb-oc7-kolasinski-1989', 'cpo-orb-oc7-lumen-2024'],
      recordedAt: '2026-10-30',
    },
    {
      propositionId: 'oc8-no-repair',
      replaced:
        'The Suncatcher paper (22 November 2025), headlined as earliest located by the research pack of 2026-10-28.',
      reason:
        'Earlier text found by the cross-family check: ESPI Report 98, published on 19 November 2025.',
      claimIds: ['cpo-orb-oc8-suncatcher-paper-2025', 'cpo-orb-oc8-espi-2025'],
      recordedAt: admitted,
    },
    {
      propositionId: 'oc9-launch-cost-too-high',
      replaced:
        'Turyshev’s preprint (April 2026), headlined as earliest located by the research pack of 2026-10-28.',
      reason:
        'Earlier text found by the cross-family check: ESPI Report 98 (November 2025), whose cost model is specific to the architectures it models.',
      claimIds: ['cpo-orb-oc9-turyshev-2026', 'cpo-orb-oc9-espi-2025'],
      recordedAt: admitted,
    },
    {
      propositionId: 'oc11-sky-and-debris',
      replaced:
        'The Accademia dei Lincei’s comment to the FCC (March 2026), headlined as earliest located by the research pack of 2026-10-28.',
      reason:
        'Earlier text found by the cross-family check: a Perspective on carbon-neutral data centres in space, whose wording an Internet Archive capture attests from 25 November 2025.',
      claimIds: ['cpo-orb-oc11-lincei-2026', 'cpo-orb-oc11-aili-2025'],
      recordedAt: admitted,
    },
    {
      propositionId: 'oc6-heat-rejection-limit',
      replaced:
        'Google Research, Project Suncatcher post (2025), headlined as earliest located.',
      reason:
        'Withdrawn on 2026-11-02 by the maintainer’s decision to withdraw every headline the cross-family re-check proposes to move or could not decide, pending adjudication; no record holds the headline meanwhile. The re-check proposes an earlier text the dataset holds: Lumen’s held v1.01 already explicitly requires rejecting gigawatts through very large deployable radiators because conduction/convection to the environment are unavailable. It is a substantial engineering requirement even though the text argues it can be met. Its December 2024 witness predates the November 2025 blog.',
      claimIds: ['cpo-orb-oc6-suncatcher-blog-2025'],
      recordedAt: recheckWithdrawn,
    },
    {
      propositionId: 'oc10-ground-bandwidth',
      replaced:
        'Google Research, Project Suncatcher post (2025), headlined as earliest located.',
      reason:
        'Withdrawn on 2026-11-02 by the maintainer’s decision to withdraw every headline the cross-family re-check proposes to move or could not decide, pending adjudication; no record holds the headline meanwhile. The re-check could not decide: The cited blog conclusion names high-bandwidth ground communications as an engineering challenge, but does not explicitly state which orbital-compute workloads are excluded or limited, as the criterion requires. Lumen’s 2024 ground links/data shuttles and Axiom’s April 2025 latency benefits likewise do not clearly supply that workload-limitation claim. The later November 22 preprint cannot date additional wording to the November 4 blog.',
      claimIds: ['cpo-orb-oc10-suncatcher-blog-2025'],
      recordedAt: recheckWithdrawn,
    },
    {
      propositionId: 'oc11-sky-and-debris',
      replaced:
        'Aili, Choi, Ong and Wen, Carbon-neutral data centres in space (2025), headlined as earliest located.',
      reason:
        'Withdrawn on 2026-11-02 by the maintainer’s decision to withdraw every headline the cross-family re-check proposes to move or could not decide, pending adjudication; no record holds the headline meanwhile. The re-check proposes an earlier text the dataset holds: Lumen’s held 2024 text already identifies orbital-debris mitigation and collision probability as hurdles for large data centers and links their large size to avoidance responsibilities. This meets the collision/debris arm of the criterion before Aili’s October 2025 publication and November proof witness. It does not establish an astronomical-observation finding.',
      claimIds: ['cpo-orb-oc11-aili-2025'],
      recordedAt: recheckWithdrawn,
    },
  ],
  limits: [
    '“Earliest located” means the earliest text found by the searches described under “How we searched”. It is not a claim of first use.',
    'A record documents what a text says. It is not evidence that the proposition is true, that a design works or that any system was built or launched.',
    'Figures in arguments, such as launch prices or radiator areas, are each text’s own, under its own assumptions, and are not compared across texts.',
    'Each record carries the date its work is dated by. Where the quoted wording is known only from a later copy, the date from which it is attested is shown.',
    'The radiation proposition (O7) counts only texts that discuss computing placed in orbit for this purpose. Texts on radiation effects in space electronics in general are not counted; the 1989 paper recorded as context is one.',
    'The codes O1 to O11 correspond to OC1 to OC11 in the research pack the records come from.',
    'A machine selected and classified these records, and machine checks from two model families re-examined them.',
  ],
  axis: frame.axis,
  landing: frame.landing,
  landingAction: frame.landingAction,
  mostDevelopedEmpty: frame.mostDevelopedEmpty,
  earliestEmpty: frame.earliestEmpty,
};
