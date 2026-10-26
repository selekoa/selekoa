import type { ControlStructureCollection } from '../domain/control-structures';

const controlLimit =
  'A control right is recorded as the document states it: who holds it, over which entity, through which instrument and at which stage. It is not an ownership share, and rows are never joined into a chain of control.';
const archiveLimit =
  'Archived copies are existing Internet Archive captures. A capture shows only what the archive retrieved that day. It does not prove what the document said earlier.';

export const openaiControl: ControlStructureCollection = {
  id: 'openai',
  version: 1,
  title: 'OpenAI’s control structure, 2015–2026',
  organisationId: 'openai',
  question:
    'Which entity has controlled OpenAI’s for-profit business, through which instrument and from when, and how did its boards change from November 2023?',
  editorialStatus: 'machine-proposed',
  entityIds: [
    'openai-inc',
    'openai-lp',
    'openai-gp-llc',
    'openai-opco-llc',
    'openai-global-llc',
    'openai-group-pbc',
    'delaware-attorney-general',
    'openai-lp-announcement',
    'openai-structure-evolve-2024',
    'openai-pbc-plan',
    'openai-recapitalization',
    'openai-group-pbc-certificate-2025',
    'delaware-ag-openai-statement-2025',
  ],
  extraClaimIds: ['atlas-altman-departure', 'atlas-altman-return'],
  introduction:
    'OpenAI was founded in 2015 as a nonprofit. The records below follow how the nonprofit and its subsidiaries have held control of the for-profit business: the capped-profit partnership announced in 2019, the operating company it became in 2023, and the public benefit corporation incorporated in October 2025. They also cover the board changes of November 2023 and after, the published restructuring plans, the Delaware Attorney General’s conditions and one open question: whether the Foundation can exercise effective control in practice. The sources are tax and court filings, a regulator’s decision, the filed certificate of incorporation and OpenAI’s own announcements.',
  limits: [
    controlLimit,
    'Announcements, plans and representations to regulators record what OpenAI said it would do. The certificate of incorporation records what the filed text provides. Neither shows how the rights are used in practice.',
    'Tax filings report relationships in the form’s own terms, such as “direct controlling entity”. The records do not interpret those terms under corporate or partnership law.',
    'The Delaware Attorney General’s letter records OpenAI’s representations and the conditions for not objecting. Whether the conditions were met, and whether the representations bind OpenAI, needs legal interpretation and is not recorded.',
    'Board records cover documented roles and announced changes only. The reasons for the November 2023 events, and later reviews of them, are not recorded.',
    'OpenAI LP, OpenAI OpCo and OpenAI Group PBC keep separate identities. How one led to the next is recorded only as far as the sources state it.',
    archiveLimit,
  ],
  openQuestions: [
    {
      id: 'openai-general-partner',
      text: 'OpenAI’s 2019 announcement says its paperwork calls OpenAI Nonprofit the general partner, while the 2019 tax filing lists OpenAI GP LLC as the partnership’s direct controlling entity. Both statements are recorded. Neither settles which entity was the general partner in law.',
      claimIds: [
        'cs-openai-lp-board-control-2019',
        'cs-openai-990-2019-gp-llc-controls-lp',
      ],
    },
    {
      id: 'openai-holding-company',
      text: 'The UK Competition and Markets Authority calls OpenAI Global, LLC the holding company of OpenAI, while the 2024 tax filing also lists a separate OpenAI Holdings LLC. Which entity held which interest is not resolved here.',
      claimIds: ['cs-openai-990-2024-gp-llc-controls-global'],
    },
    {
      id: 'openai-microsoft-observer',
      text: 'OpenAI said in November 2023 that its new board would include a non-voting observer for Microsoft. An observer seat is not a control right and is not recorded as one. In March 2025 the Competition and Markets Authority found that Microsoft had material influence over OpenAI’s commercial policy but did not exercise de facto control over it.',
      claimIds: [
        'cs-taylor-chair-initial-board-2023',
        'cs-openai-gp-llc-manages-opco',
      ],
    },
    {
      id: 'openai-safety-committee-contract',
      text: 'OpenAI represented to the Delaware Attorney General that a contract would give the nonprofit’s Safety and Security Committee an effective approval right over the public benefit corporation’s safety and security actions. That contract was not inspected.',
      claimIds: ['prov-delaware-ag-ssc-authority'],
    },
  ],
  stops: [
    {
      id: 'openai-ag-representations',
      category: 'legal_effect',
      text: 'Whether the representations recorded by the Delaware and California Attorneys General bind OpenAI, whether the stated conditions were met, and whether the Safety and Security Committee contract was signed and is enforceable.',
      claimIds: [
        'cs-delaware-ag-openai-statement-2025',
        'prov-delaware-ag-nfp-control',
        'prov-delaware-ag-ssc-authority',
      ],
    },
    {
      id: 'openai-control-in-law',
      category: 'legal_effect',
      text: 'Whether the Foundation’s Class N rights amount to control in law, for example under Delaware corporate law, tax-exemption rules or competition law, and how the for-profit business came to sit in OpenAI Group PBC (by merger, conversion or contribution).',
      claimIds: [
        'cs-openai-foundation-elects-pbc-directors',
        'cs-openai-group-pbc-legal-form-2025',
      ],
    },
    {
      id: 'openai-safety-clause-wording',
      category: 'legal_effect',
      text: 'The Delaware letter records OpenAI’s representation that the charter’s safety clause covers the nonprofit’s Safety and Security Committee, while the filed charter refers to the public benefit corporation’s own board and committees. Whether the difference matters in law needs interpretation.',
      claimIds: [
        'prov-openai-group-pbc-cert-safety-mission',
        'prov-delaware-ag-ssc-authority',
      ],
    },
    {
      id: 'openai-board-separation',
      category: 'legal_effect',
      text: 'Whether Paul Christiano’s appointment meets OpenAI’s representation that, within a year of the recapitalization, at least one current nonprofit director besides the committee chair would serve only on the nonprofit board.',
      claimIds: ['cs-christiano-openai-foundation-board-2026'],
    },
    {
      id: 'openai-lp-to-opco',
      category: 'legal_effect',
      text: 'Whether the 2023 change from OpenAI, L.P. to OpenAI OpCo, L.L.C. was a conversion, a merger or another transaction, and what continuity of assets and obligations it implies.',
      claimIds: ['cs-openai-lp-to-opco-2023'],
    },
    {
      id: 'openai-november-2023-reasons',
      category: 'living_person',
      text: 'The reasons the board gave for removing Sam Altman in November 2023, the findings of the review OpenAI summarised in March 2024, and commentary on the people involved.',
      claimIds: [
        'cs-altman-board-departure-2023',
        'cs-brockman-chair-departure-2023',
      ],
    },
  ],
};

export const anthropicControl: ControlStructureCollection = {
  id: 'anthropic',
  version: 1,
  title: 'Anthropic’s control structure, 2021–2026',
  organisationId: 'anthropic',
  question:
    'How do Anthropic’s certificates of incorporation allocate the right to elect directors, which powers does the Long-Term Benefit Trust hold, and how have these changed?',
  editorialStatus: 'machine-proposed',
  entityIds: [
    'anthropic',
    'anthropic-ltbc',
    'anthropic-ltbt',
    'anthropic-coi-2021-01-26',
    'anthropic-coi-2021-05-24',
    'anthropic-coi-2023-03-31',
    'anthropic-coi-2023-09-21',
    'anthropic-coi-2024-01-29',
    'anthropic-coi-2025-07-03',
    'anthropic-ltbt-announcement-2023',
  ],
  extraClaimIds: [],
  introduction:
    'Anthropic was incorporated in Delaware in January 2021 as a public benefit corporation. The records below cover its legal form, the director-election and consent rights in the certificates of incorporation filed from 2021 to 2025, and the Long-Term Benefit Trust’s rights as the certificates state them and as Anthropic describes them. They also list the directors the Trust appointed and one open question: whether the Trust is independent enough of stockholders to provide effective oversight in practice. The certificates are Delaware-stamped copies published by AI Lab Watch. The Trust Agreement itself is not public.',
  limits: [
    controlLimit,
    'The certificates give rights to classes of stock. That the Long-Term Benefit Trust holds the Class T stock rests on Anthropic’s statements; no share register was inspected.',
    'The certificate copies were obtained from the State of Delaware by AI Lab Watch and were read from page images. Certificates filed after 3 July 2025 were not inspected.',
    'The phase-in dates depend on board determinations that were not published, so the dates on which the Trust could elect its second and third directors are not recorded.',
    'Board and Trustee records cover documented roles only. Trustees have their own records only when the person is already in the dataset. The announcement record names the initial Trustees.',
    'The certificate copies have no Internet Archive capture. ' + archiveLimit,
  ],
  openQuestions: [
    {
      id: 'anthropic-board-size',
      text: 'The latest inspected certificate fixes the board at five directors, but Anthropic’s announcement of April 2026 names seven. A later certificate, which might explain the difference, was not inspected.',
      claimIds: [
        'cs-narasimhan-anthropic-board-2026',
        'cs-anthropic-ltbt-elects-directors',
      ],
    },
    {
      id: 'anthropic-private-agreements',
      text: 'The Trust Agreement, the Voting Agreement and the Investors’ Rights Agreement are referred to in the certificates and by Anthropic but are not public. The Trust’s own terms, including how it can be enforced or amended, are known only from Anthropic’s and its counsel’s descriptions.',
      claimIds: [
        'cs-anthropic-ltbt-described-2023',
        'cs-assessed-anthropic-ltbt-independence',
      ],
    },
    {
      id: 'anthropic-committee-to-trust',
      text: 'The 2021 certificate’s Long-Term Benefit Committee could approve or reject director candidates. The Class T stock created in 2023 instead elects directors. Anthropic describes the committee as an earlier version of the Trust; the records do not establish continuity between the two bodies.',
      claimIds: [
        'cs-anthropic-ltbc-director-approval-2021',
        'cs-anthropic-ltbt-elects-directors',
      ],
    },
  ],
  stops: [
    {
      id: 'anthropic-stockholder-failsafe',
      category: 'legal_effect',
      text: 'Whether stockholders can change or end the Long-Term Benefit Trust and its powers without the Trustees’ consent. Anthropic describes “failsafe” supermajority provisions, and Fried and Reiter call them a kill switch. The Trust Agreement is not public, and the certificate’s amendment thresholds would need legal interpretation.',
      claimIds: [
        'cs-anthropic-ltbt-described-2023',
        'cs-anthropic-ltbt-class-t-consent',
      ],
    },
    {
      id: 'anthropic-trust-control',
      category: 'legal_effect',
      text: 'Whether the Trust’s director-election rights amount to control of Anthropic in law. Fried and Reiter describe the Trust as a controlling mission entity; the records state the rights without drawing that conclusion.',
      claimIds: ['cs-anthropic-ltbt-elects-directors'],
    },
    {
      id: 'anthropic-phase-in-dates',
      category: 'conflicting_dates',
      text: 'The dates on which the Trust became entitled to elect a second and a third director. The certificates tie them to unpublished board determinations. AI Lab Watch wrote in June 2024 that the Final Phase-In Date was in November 2024, and Anthropic said in April 2026 that Trust-appointed directors had become a majority of the board. No decisive source was found.',
      claimIds: [
        'prov-anthropic-coi-2024-01-29-class-t-phase-in',
        'cs-narasimhan-anthropic-board-2026',
      ],
    },
    {
      id: 'anthropic-investor-approval-clause',
      category: 'legal_effect',
      text: 'Whether the clause in the certificates filed in 2024 and 2025, under which board approval of matters listed in the Investors’ Rights Agreement may require the vote of the director elected by certain preferred stockholders or of 61% of the directors, gives those investors a veto. The Investors’ Rights Agreement is not public.',
      claimIds: [],
    },
  ],
};

/** Per-organisation control-structure timelines. */
export const controlStructures: ControlStructureCollection[] = [
  openaiControl,
  anthropicControl,
];
