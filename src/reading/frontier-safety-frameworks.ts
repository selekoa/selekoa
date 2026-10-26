import type { DocumentHistoryCollection } from '../domain/document-history';

export const frontierSafetyFrameworks: DocumentHistoryCollection = {
  id: 'frontier-safety-frameworks',
  version: 5,
  title: 'Frontier safety frameworks',
  question:
    'What did each developer’s published safety framework say, when, what replaced it, and what changed between editions?',
  editorialStatus: 'machine-proposed',
  families: [
    'anthropic-rsp',
    'deepmind-fsf',
    'openai-preparedness',
    'openai-frontier-governance',
    'xai-faif',
    'meta-frontier-ai',
    'microsoft-frontier-governance',
  ],
  introduction:
    'Each framework below lists the editions recorded here, oldest first, with the date each edition is identified by. An edition is shown as replacing another only where a record documents it from the publisher’s own version sequence. Date order alone never implies replacement. Recorded changes are selected, sourced differences between two editions. They describe what the documents say. They do not show whether any requirement was implemented, followed or effective. Each edition also lists a limited set of quoted provisions: thresholds, required actions, who decides and stated exceptions. Where competent sources disagree about what a provision or change means, the disagreement is kept as a separate assessment record, marked contested or unresolved.',
  limits: [
    'A published framework shows what its publisher stated. It does not show implementation, compliance, effectiveness or relative safety. This page does not compare or rank developers.',
    'Recorded changes are a selection of documented differences. They are not a full list of amendments, and an edition with no recorded change has not been shown to be unchanged.',
    'Effective, publication and revision dates are kept apart. Each edition shows only the dates that have been established. A missing date is unknown.',
    'Editions are grouped by publisher and framework name for navigation. A different framework from the same publisher counts as a successor only where a record says so.',
    'Provisions are a limited, quoted selection for each edition, within the quotation policy’s limit for each document. They are not a full summary. An edition without a recorded provision has not been shown to lack it. A “not found” record states exactly which text was inspected and never claims that a provision was deleted.',
    'Contested records show competing assessments side by side. Secondary commentary is admitted only as evidence of the disagreement, and the page does not decide between the sides.',
    'Archived copies are the existing Internet Archive captures nearest each edition’s date. A capture shows only what the archive retrieved that day. It does not prove what the document said earlier, and it can differ from the copy checked for the evidence.',
  ],
  openQuestions: [
    {
      id: 'pf-v2-replacement',
      family: 'openai-preparedness',
      text: 'No OpenAI text inspected so far names the December 2023 Beta as the edition that Version 2 replaces, so the replacement record is unresolved and carries context evidence only. A separate question is contested: whether Version 2’s governance arrangements let OpenAI Leadership deploy High-capability models without sufficient safeguards. The two sides are an academic analysis of leadership discretion and OpenAI’s stated predeployment requirement. The rule’s text itself is recorded as a supported provision.',
      claimIds: [
        'supersedes-pf-2',
        'assessed-preparedness-v2-high-deployment-mitigation',
      ],
    },
    {
      id: 'meta-v1-1-expressions',
      family: 'meta-frontier-ai',
      text: 'Two different texts carry the Version 1.1 label: the earliest archive capture (2025-02-13) and a revised wording captured from 2025-03-28 onwards. The provisions quote the earlier text. No announcement of the revision was found.',
      claimIds: ['issued-meta-faf-v1-1'],
    },
    {
      id: 'ms-fgf-2026-date',
      family: 'microsoft-frontier-governance',
      text: 'The February 2026 edition is identified by its version month. Its publication date is not established. The file was last modified on 2026-03-24 and first captured on 2026-04-24.',
      claimIds: ['issued-ms-fgf-2026'],
    },
    {
      id: 'rsp-assessed-changes',
      family: 'anthropic-rsp',
      text: 'Two questions remain open. Did the v2.0 revision make Anthropic’s commitments less verifiable? Do v3.0’s roadmap and transparency mechanisms compensate for its reduced unilateral commitments? Each record keeps the published assessments as context, because none directly opposes another on the same question. The changes to the text are recorded separately.',
      claimIds: ['rsp-v2-0-assessed-weakening', 'rsp-v3-0-assessed-weakening'],
    },
    {
      id: 'xai-faif-succession',
      family: 'xai-faif',
      text: 'No record links the June 2026 edition to the December 2025 edition as its replacement, because no explicit statement that one supersedes the other was found. The one recorded difference was inferred by comparing the two documents. It is not based on a statement by xAI.',
      claimIds: [
        'faif-2026-compliance-sentence',
        'issued-faif-2025',
        'issued-faif-2026',
      ],
    },
    {
      id: 'xai-faif-dates',
      family: 'xai-faif',
      text: 'The December 2025 edition is identified by its printed “last updated” date. The file name carries a different day, as the date note records. Neither edition has an established publication day of its own.',
      claimIds: ['issued-faif-2025', 'issued-faif-2026'],
    },
    {
      id: 'fgf-preparedness-version',
      family: 'openai-frontier-governance',
      text: 'The Frontier Governance Framework is recorded as applying relevant parts of the continuing Preparedness approach. Its announcement names no Preparedness version. The link therefore points to the Preparedness framework as a whole rather than to Version 2, and the new framework is not recorded as its successor.',
      claimIds: ['fgf-applies-preparedness'],
    },
    {
      id: 'rsp-publication-days',
      family: 'anthropic-rsp',
      text: 'Most Responsible Scaling Policy revisions are identified by their effective dates. Where no publication day was established, none is inferred.',
      claimIds: [
        'issued-rsp-2-0',
        'issued-rsp-2-1',
        'issued-rsp-2-2',
        'issued-rsp-3-1',
        'issued-rsp-3-2',
        'issued-rsp-3-3',
        'issued-rsp-3-4',
      ],
    },
  ],
};

export const documentHistories = [frontierSafetyFrameworks];
