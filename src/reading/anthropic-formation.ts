import type { QuestionSelection } from '../domain/research-path';

export const anthropicFormation: QuestionSelection = {
  id: 'anthropic-formation',
  version: 3,
  institutionId: 'anthropic',
  title: 'Founding and early leadership',
  question:
    "What can the documentary record establish about Anthropic's formation and its preceding personnel and intellectual networks?",
  editorialStatus: 'machine-proposed',
  introduction: [
    {
      id: 'formation-introduction',
      text: 'Anthropic’s formation comes into view through two kinds of testimony: an early announcement naming its leadership, and later accounts crediting its founders. Reading these together distinguishes participation in founding from executive office. The surrounding history reaches into earlier research institutions and publications; those connections help locate the people and their work, but leave open how the company took shape and why its founders chose to form it.',
      claimIds: [
        'dario-anthropic-2021',
        'daniela-anthropic-2021',
        'dario-cofounded-anthropic-2021',
        'daniela-cofounded-anthropic-2021',
        'chris-olah-cofounded-anthropic-2021',
        'jack-clark-cofounded-anthropic-2021',
        'tom-brown-cofounded-anthropic-2021',
        'jared-kaplan-anthropic-cofounder',
        'sam-mccandlish-anthropic-cofounder',
        'dario-openai-vp-2020',
        'olah-brain-team-2017',
        'lineage-dario-amodei-preferences',
        'lineage-kaplan-authored-scaling',
        'lineage-mccandlish-authored-batch',
      ],
    },
  ],
  sections: [
    {
      id: 'formation',
      kind: 'principal',
      title: 'Founding & early leadership',
      description:
        'Seven founding attributions and two early leadership snapshots.',
      gap: 'These seven attributions do not establish an exhaustive historical roster, simultaneous participation or a legal incorporation date.',
      groups: [
        { title: 'Founding participation', predicates: ['co_founded'] },
        { title: 'Early leadership' },
      ],
      passages: [
        {
          id: 'founding-testimony',
          text: 'The founding accounts were written after the events they describe. Anthropic’s 2022 Series B announcement credits Dario and Daniela Amodei; a 2024 founder slide credits Chris Olah, Jack Clark and Tom Brown alongside its 2021 founding panel. These five records retain only year-level dates. The October 2024 Responsible Scaling Policy announcement also identifies Jared Kaplan and Sam McCandlish as co-founders, without dating their founding participation.',
          claimIds: [
            'dario-cofounded-anthropic-2021',
            'daniela-cofounded-anthropic-2021',
            'chris-olah-cofounded-anthropic-2021',
            'jack-clark-cofounded-anthropic-2021',
            'tom-brown-cofounded-anthropic-2021',
            'jared-kaplan-anthropic-cofounder',
            'sam-mccandlish-anthropic-cofounder',
          ],
        },
        {
          id: 'early-leadership',
          text: 'The May 2021 Series A announcement offers a different view: Dario Amodei as CEO and Daniela Amodei as president. It documents leadership at that moment, while the later founding accounts credit participation in creating the institution. These snapshots establish neither appointment dates nor the other founders’ responsibilities.',
          claimIds: [
            'dario-anthropic-2021',
            'daniela-anthropic-2021',
            'dario-cofounded-anthropic-2021',
            'daniela-cofounded-anthropic-2021',
          ],
        },
      ],
    },
    {
      id: 'personnel',
      kind: 'context',
      title: 'Prior institutional roles',
      description: 'Dario Amodei, Daniela Amodei and Chris Olah.',
      gap: 'The departure announcement’s new project remains unnamed here; Daniela’s fuller prior title and the employment boundaries remain open questions.',
      passages: [
        {
          id: 'personnel-context',
          text: 'The personnel accounts place research and safety responsibilities in earlier institutional settings. OpenAI named Dario Amodei as VP of Research when announcing his departure in December 2020. Daniela’s prior safety role appears in a later founder slide, while Olah’s biography recalls leading interpretability research at OpenAI; a separate 2017 Google account places him on the Brain team. This is a history of documented roles with uneven dates, not a shared departure chronology or an explanation of Anthropic’s formation.',
          claimIds: [
            'dario-openai-vp-2020',
            'dario-openai-departure-announced-2020',
            'daniela-openai-safety-prior',
            'olah-openai-interpretability-prior',
            'olah-brain-team-2017',
          ],
        },
      ],
    },
    {
      id: 'feedback',
      kind: 'context',
      title: 'Human-feedback publications',
      description: 'Authorship and two explicit citations.',
      gap: 'Authorship and citation leave institutional adoption and the founders’ motives unestablished.',
      passages: [
        {
          id: 'feedback-context',
          text: 'The publication trail places Dario Amodei among the co-authors of Deep reinforcement learning from human preferences in 2017. That paper cites TRPO in its policy-optimisation procedure and is itself cited in Learning to summarize from human feedback in 2020. The interest of this branch lies in the connections the documents actually name: a research contribution and references across works. It provides an intellectual setting for one founder’s work without turning that setting into Anthropic’s research programme.',
          claimIds: [
            'lineage-dario-amodei-preferences',
            'lineage-preferences-cites-trpo',
            'lineage-summaries-cites-preferences',
            'dario-cofounded-anthropic-2021',
          ],
        },
      ],
    },
    {
      id: 'scaling',
      kind: 'context',
      title: 'Scaling publications',
      description:
        'Earlier papers by Kaplan and McCandlish; reported method use.',
      gap: 'The reported method use concerns the named study. Its adoption at Anthropic, and its part in the decision to found the company, remain unestablished.',
      passages: [
        {
          id: 'scaling-context',
          text: 'Kaplan and McCandlish’s later co-founder attributions make their earlier publications relevant to this history. McCandlish is credited on An Empirical Model of Large-Batch Training (2018), and Kaplan on Scaling Laws for Neural Language Models (2020). Scaling Laws reports using the large-batch model to adjust training-step and compute estimates. This supplies a more specific documentary connection than citation alone: the authors describe a use within their study. Whether that work entered the new company remains open.',
          claimIds: [
            'jared-kaplan-anthropic-cofounder',
            'sam-mccandlish-anthropic-cofounder',
            'lineage-mccandlish-authored-batch',
            'lineage-kaplan-authored-scaling',
            'lineage-scaling-uses-batch',
          ],
        },
      ],
    },
  ],
  branchNote:
    'Choose a separate branch. These are reading categories, not stages in the company’s formation.',
  items: [
    {
      claimId: 'dario-cofounded-anthropic-2021',
      sectionId: 'formation',
      rationale:
        'A direct founding attribution, distinct from the CEO snapshot.',
    },
    {
      claimId: 'daniela-cofounded-anthropic-2021',
      sectionId: 'formation',
      rationale:
        'A direct founding attribution, distinct from the president snapshot.',
    },
    {
      claimId: 'chris-olah-cofounded-anthropic-2021',
      sectionId: 'formation',
      rationale:
        'A further founding credit whose retrospective documentation must remain visible.',
    },
    {
      claimId: 'jack-clark-cofounded-anthropic-2021',
      sectionId: 'formation',
      rationale:
        'Includes an existing founding attribution previously omitted from the guided selection; the 2024 documentation remains visible.',
    },
    {
      claimId: 'tom-brown-cofounded-anthropic-2021',
      sectionId: 'formation',
      rationale:
        'Includes an existing founding attribution previously omitted from the guided selection; the 2024 documentation remains visible.',
    },
    {
      claimId: 'jared-kaplan-anthropic-cofounder',
      sectionId: 'formation',
      rationale:
        'Places Kaplan’s retrospective co-founder attribution alongside the dated founding records; no event date is supplied.',
    },
    {
      claimId: 'sam-mccandlish-anthropic-cofounder',
      sectionId: 'formation',
      rationale:
        'Places McCandlish’s retrospective co-founder attribution alongside the dated founding records; no event date is supplied.',
    },
    {
      claimId: 'dario-anthropic-2021',
      sectionId: 'formation',
      rationale:
        'A dated early leadership snapshot alongside the separately documented founding credit.',
    },
    {
      claimId: 'daniela-anthropic-2021',
      sectionId: 'formation',
      rationale:
        'A dated early leadership snapshot alongside the separately documented founding credit.',
    },
    {
      claimId: 'dario-openai-vp-2020',
      sectionId: 'personnel',
      rationale:
        'Documents the prior institution’s role description separately from the departure announcement.',
    },
    {
      claimId: 'dario-openai-departure-announced-2020',
      sectionId: 'personnel',
      rationale: 'Retains the departure announcement within its actual scope.',
      warning:
        'The unnamed new project in this announcement is not identified as Anthropic. This record cannot explain the company’s formation.',
    },
    {
      claimId: 'daniela-openai-safety-prior',
      sectionId: 'personnel',
      rationale:
        'Retains the source-attributed prior title and its missing dates.',
      warning:
        'The fuller-title question remains unresolved in the existing review history. This record retains the slide’s “VP of Safety” wording.',
    },
    {
      claimId: 'olah-brain-team-2017',
      sectionId: 'personnel',
      rationale:
        'Provides a dated institutional snapshot for Olah, distinct from his undated OpenAI record.',
    },
    {
      claimId: 'olah-openai-interpretability-prior',
      sectionId: 'personnel',
      rationale:
        'Adds a retrospective description of prior responsibility without constructing a transfer timeline.',
    },
    {
      claimId: 'lineage-dario-amodei-preferences',
      sectionId: 'feedback',
      rationale:
        'Documents authorship by Dario Amodei, whose founding credit is in the principal reading.',
    },
    {
      claimId: 'lineage-preferences-cites-trpo',
      sectionId: 'feedback',
      rationale:
        'Provides an explicit reference in the selected human-feedback paper.',
    },
    {
      claimId: 'lineage-summaries-cites-preferences',
      sectionId: 'feedback',
      rationale: 'Documents reception of that paper in a separate publication.',
    },
    {
      claimId: 'lineage-mccandlish-authored-batch',
      sectionId: 'scaling',
      rationale: 'Identifies a co-author of the large-batch paper.',
    },
    {
      claimId: 'lineage-kaplan-authored-scaling',
      sectionId: 'scaling',
      rationale: 'Identifies a co-author of the scaling paper.',
    },
    {
      claimId: 'lineage-scaling-uses-batch',
      sectionId: 'scaling',
      rationale:
        'Distinguishes reported method use in a named study from citation alone.',
    },
  ],
};
