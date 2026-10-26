import type { QuestionStarterDefinition } from '../domain/question-starter';

const organisationIds = [
  'anthropic',
  'openai',
  'google',
  'google-deepmind',
  'microsoft',
  'meta',
  'xai',
];
const earliestEditionIds = [
  'rsp-2023',
  'fsf-2024',
  'preparedness-beta-2023',
  'frontier-governance-2026',
  'faif-2025',
  'meta-faf-v1-1',
  'ms-fgf-2025',
];
const keyRevisionIds = [
  'rsp-v2-0',
  'rsp-v3-0',
  'fsf-v2-0',
  'fsf-v3-0',
  'preparedness-v2',
  'faif-2026',
  'meta-aasf-v2-0',
  'ms-fgf-2026',
];
const shared = [
  'wh-voluntary-ai-commitments-2023-07',
  'wh-voluntary-ai-commitments-2023-09',
  'frontier-ai-safety-commitments-2024',
];
const euCode = 'gpai-code-of-practice-2025';
const euGuidelines = 'eu-gpai-guidelines-2025';
const euTemplate = 'eu-gpai-training-summary-template-2025';
const euDraftProceedings =
  'eu-draft-implementing-regulation-gpai-proceedings-2026';
const nyChapter96 = 'new-york-raise-act-chapter-96-2026';
const cnMeasures = 'cn-generative-ai-interim-measures-2023';
const euOmnibus = 'eu-digital-omnibus-ai-2026';
const sb53 = 'california-sb-53';

export const selfGovernance: QuestionStarterDefinition = {
  id: 'frameworks-to-obligations',
  version: 1,
  title: 'Frameworks, commitments and legal obligations, 2023–2026',
  question:
    'From voluntary frameworks to legal obligations: how did frontier-AI developers’ self-governance change, 2023–2026?',
  editorialStatus: 'machine-proposed',
  scope:
    'Selekoa records on the developers’ own safety frameworks, the shared commitments of 2023 and 2024, the EU General-Purpose AI Code of Practice, the EU AI Act as published in 2024 and amended in 2026, California SB 53, the New York RAISE Act and one Chinese measure on generative AI services. It includes the Commission’s guidance on the AI Act and a draft rule on proceedings. Each record links to its claim, its evidence and the original source. The page lists records and adds no claim or conclusion of its own.',
  organisationIds,
  families: [
    'anthropic-rsp',
    'deepmind-fsf',
    'openai-preparedness',
    'openai-frontier-governance',
    'xai-faif',
    'meta-frontier-ai',
    'microsoft-frontier-governance',
  ],
  earliestEditionIds,
  keyRevisionIds,
  commitmentIds: [...shared, euCode, sb53],
  sections: [
    {
      id: 'frameworks',
      title: 'Developers’ own frameworks',
      description:
        'The earliest edition recorded here of each developer’s safety framework. Selekoa has not established that each is the first one its developer published.',
      groups: [
        {
          title: 'Earliest recorded edition of each framework',
          match: [{ predicates: ['published'], objects: earliestEditionIds }],
        },
      ],
    },
    {
      id: 'shared-commitments',
      title: 'Shared external commitments, 2023–2024',
      description:
        'The White House texts of July and September 2023 and the Frontier AI Safety Commitments of May 2024, with the listings of the developers whose frameworks are recorded here and a selection of quoted provisions.',
      groups: [
        {
          title: 'Texts issued',
          match: [{ predicates: ['published'], objects: shared }],
        },
        {
          title: 'Developers listed as signatories',
          match: [
            {
              predicates: ['signed_commitment'],
              subjects: organisationIds,
              objects: shared,
            },
          ],
        },
        {
          title: 'Quoted provisions',
          claimIds: [
            'prov-wh-2023-07-scope',
            'prov-wh-2023-07-duration',
            'prov-wh-2023-07-red-teaming',
            'prov-wh-2023-07-model-weights',
            'prov-wh-2023-07-public-reporting',
            'prov-wh-2023-09-scope',
            'provchange-wh-2023-09-scope',
            'prov-fasc-2024-intolerable-thresholds',
            'prov-fasc-2024-threshold-input',
            'prov-fasc-2024-no-development',
            'prov-fasc-2024-transparency-exception',
          ],
        },
      ],
    },
    {
      id: 'pointing',
      title: 'Where commitments and frameworks name each other',
      description:
        'Provisions that ask for a framework, and framework editions that name the shared commitments in their own words. A framework’s statement about a commitment is the framework’s own claim.',
      groups: [
        {
          title: 'Texts that ask for a framework',
          claimIds: [
            'prov-fasc-2024-publish-framework',
            'prov-eu-code-ss-framework',
            'sb-framework-duty',
          ],
        },
        {
          title: 'Framework editions that name the shared commitments',
          match: [{ predicates: ['references_commitment'], objects: shared }],
        },
      ],
    },
    {
      id: 'law-and-code',
      title: 'Laws, guidance and codes: EU, California, New York and China',
      description:
        'The EU AI Act is a regulation, adopted in 2024 and amended in 2026. The Commission’s guidelines and template explain how it reads the Act and are not binding. California SB 53 is a statute, enacted in 2025. New York’s RAISE Act is recorded through the Governor’s announcements and through the legislature’s record of its 2026 amendment, Chapter 96. China’s Interim Measures on generative AI services date from 2023. Organisations sign the EU Code, a voluntary text whose own wording says that adherence is not conclusive evidence of compliance with the AI Act. Provisions are quoted from each text, which states duties and dates. A duty or a date of application is not evidence of compliance or enforcement.',
      groups: [
        {
          title: 'EU AI Act: adoption',
          claimIds: ['aia-enacted'],
        },
        {
          title:
            'EU AI Act: definitions, classification and duties of general-purpose AI model providers',
          claimIds: [
            'aia-art3-systemic-risk-definition',
            'aia-art51-compute-presumption',
            'aia-art52-notification',
            'aia-art53-technical-documentation',
            'aia-art53-open-source-exception',
            'aia-art55-model-evaluation',
            'aia-art55-assess-mitigate',
            'aia-art55-incident-reporting',
            'aia-art55-cybersecurity',
          ],
        },
        {
          title: 'EU AI Act: codes of practice, fines and dates of application',
          claimIds: [
            'aia-art55-code-reliance',
            'aia-art56-code-deadline',
            'aia-art56-adequacy-assessment',
            'aia-art56-fallback-implementing-acts',
            'aia-art101-gpai-fines',
            'aia-art113-general-date',
            'aia-art113-chapter-v-date',
            'aia-art111-earlier-models',
          ],
        },
        {
          title: 'EU Digital Omnibus on AI (2026): amendments to the AI Act',
          match: [{ subjects: [euOmnibus], predicates: ['states_provision'] }],
          claimIds: ['omni-enacted'],
        },
        {
          title: 'EU Commission guidelines on general-purpose AI models (2025)',
          claimIds: ['eugl-communication-published', 'eugl-guidelines-dated'],
          match: [
            { subjects: [euGuidelines], predicates: ['states_provision'] },
          ],
        },
        {
          title: 'EU template for the public summary of training content',
          match: [{ subjects: [euTemplate], predicates: ['states_provision'] }],
        },
        {
          title:
            'EU AI Office procedure: a draft implementing regulation (2026)',
          claimIds: ['eudraft-proceedings-published'],
          match: [
            {
              subjects: [euDraftProceedings],
              predicates: ['states_provision'],
            },
          ],
        },
        {
          title:
            'EU Code of Practice: issue, signatures, a refusal and the Signatory Taskforce',
          claimIds: ['cm-eu-code-published', 'cm-eu-code-taskforce'],
          match: [
            {
              predicates: ['signed_commitment', 'declined_commitment'],
              subjects: organisationIds,
              objects: [euCode],
            },
          ],
        },
        {
          title:
            'EU Code of Practice: quoted provisions (Safety and Security, Transparency and Copyright chapters)',
          match: [
            {
              predicates: ['states_provision'],
              subjects: [euCode],
              except: ['prov-eu-code-ss-framework'],
            },
          ],
        },
        {
          title: 'EU Code of Practice: framework editions that name it',
          match: [{ predicates: ['references_commitment'], objects: [euCode] }],
        },
        {
          title: 'California SB 53: enactment',
          claimIds: ['sb-enactment-2025-09-29'],
        },
        {
          title: 'California SB 53: quoted provisions',
          match: [
            {
              predicates: ['states_provision'],
              subjects: [sb53],
              except: ['sb-framework-duty'],
            },
          ],
        },
        {
          title: 'California SB 53: documents that name it',
          claimIds: ['sb-anthropic-fcf-published'],
          match: [{ predicates: ['references_commitment'], objects: [sb53] }],
        },
        {
          title: 'New York RAISE Act: signing announced, and Chapter 96 (2026)',
          claimIds: ['ny-raise-signing-announced', 'ny-chapter96-signed'],
          match: [
            { subjects: [nyChapter96], predicates: ['states_provision'] },
          ],
        },
        {
          title: 'China: Interim Measures on generative AI services (2023)',
          claimIds: ['cn-genai-measures-issued'],
          match: [{ subjects: [cnMeasures], predicates: ['states_provision'] }],
        },
      ],
    },
    {
      id: 'revisions',
      title: 'Framework revisions in the same period',
      description:
        'Key revisions only: each publisher’s new major version or new framework, or the later edition where editions carry no version number. A revision recorded near a commitment’s date is not recorded as a response to it.',
      groups: [
        {
          title: 'Key revisions and what they replace',
          claimIds: ['fgf-applies-preparedness'],
          match: [
            { predicates: ['published'], objects: keyRevisionIds },
            {
              predicates: ['supersedes_document'],
              subjects: keyRevisionIds,
              resolutions: ['supported'],
            },
          ],
        },
        {
          title: 'Recorded changes from the previous edition',
          match: [
            {
              predicates: ['changes_from'],
              subjects: keyRevisionIds,
              resolutions: ['supported'],
            },
          ],
        },
        {
          title: 'Provisions not found in the inspected text',
          match: [
            { predicates: ['provision_not_found'], subjects: keyRevisionIds },
          ],
        },
      ],
    },
    {
      id: 'open',
      title: 'Open questions and unresolved records',
      description:
        'Records marked contested or unresolved, followed by open questions and questions set aside on the commitments and document histories pages that concern a record listed here.',
      groups: [
        {
          title: 'Contested and unresolved records',
          match: [
            {
              subjects: [...earliestEditionIds, ...keyRevisionIds],
              resolutions: ['contested', 'unresolved'],
            },
          ],
        },
      ],
    },
  ],
  gaps: [
    {
      id: 'implementation',
      area: 'Implementation',
      text: 'Whether any developer did what its framework or a commitment says. No record here states that a framework threshold was assessed, reached or acted on for a particular model.',
      claimIds: [],
      task: 'Find primary documents that state how a framework was applied to a named model, such as system cards or capability reports that report a threshold determination. Propose whether stated application needs its own record type. A developer’s statement that it applied its framework is its own claim and is not independent proof.',
    },
    {
      id: 'compliance',
      area: 'Compliance',
      text: 'Whether any developer complied with a commitment, the EU Code or SB 53. Where a framework says that it fulfils, complies with or serves as a framework under a text, that is the framework’s own statement. The Commission’s guidelines say how adherence to the EU Code bears on its enforcement approach. No statement about a named developer is recorded.',
      claimIds: [
        'cm-link-rsp-v2-0-wh',
        'cm-link-rsp-v2-0-seoul',
        'cm-link-frontier-governance-2026-eu-code',
        'eugl-code-adherence-enforcement-focus',
        'sb-link-openai-fgf',
        'sb-link-faif-2025',
      ],
      task: 'Identify dated statements by the AI Office, the California Office of Emergency Services or the California Attorney General about named developers. Record each as the authority’s statement, with its date and scope. Do not infer compliance from a designation or a signature.',
    },
    {
      id: 'enforcement',
      area: 'Enforcement',
      text: 'Whether SB 53 or the EU AI Act has been enforced against any developer. SB 53’s penalty and enforcement provisions and the AI Act’s fine provision for providers of general-purpose AI models, with its dates of application, are recorded. No enforcement action is. The Commission’s guidelines state that its enforcement powers apply from 2 August 2026, and a draft implementing regulation on evaluations and proceedings was published for feedback in March 2026 and is not recorded as adopted. An alleged SB 53 violation is listed above as a question set aside.',
      claimIds: [
        'sb-attorney-general-enforcement',
        'sb-civil-penalty-cap',
        'aia-art101-gpai-fines',
        'aia-art113-chapter-v-date',
        'eugl-enforcement-timing',
        'eudraft-proceedings-published',
      ],
      task: 'Search official records of the California Attorney General and the courts for actions under the Transparency in Frontier Artificial Intelligence Act, and AI Office decisions under the AI Act, and check the Official Journal for an adopted implementing regulation on proceedings. Admit only dated official documents. An allegation stays an attributed allegation.',
    },
    {
      id: 'eu-ai-act',
      area: 'Law',
      text: 'Parts of the EU AI Act that are not recorded. Selekoa quotes selected provisions of the Act as published in the Official Journal in 2024 and three amendments made in 2026. It does not hold the consolidated text, the annexes (including the documentation items in Annex XI) or the full duties in Article 53(1) on downstream information, copyright and training-data summaries. Commission guidance is recorded in part: the guidelines of 2025, the training-content template and the Transparency and Copyright chapters of the Code, each with selected provisions. The Commission’s questions-and-answers pages and the remaining guidance are not.',
      claimIds: [
        'aia-art55-code-reliance',
        'omni-art56-adequacy-assessment',
        'prov-eu-code-ss-adherence-not-conclusive',
        'eugl-non-binding',
      ],
      task: 'Retrieve the consolidated Act and record the annexes and the remaining Article 53 duties as quoted provisions, with exact editions. Record the Commission’s questions-and-answers pages and other AI Office documents on general-purpose AI model providers as the Commission’s statements. Compare the guidelines of November 2025 with the content approved in July 2025. Keep entry into force and dates of application apart.',
    },
    {
      id: 'jurisdictions',
      area: 'Other jurisdictions',
      text: 'Law and regulation beyond California SB 53, the EU AI Act, the EU Code and the New York RAISE Act. The New York RAISE Act is recorded through two announcements by the Governor and through the legislature’s printed bill for its 2026 amendment (Chapter 96), from which provisions are quoted. The 2025 chapter’s own text and the session-law print were not inspected. China’s Interim Measures on generative AI services (2023) are recorded in part, in Chinese. No United Kingdom text is recorded: a search on 2026-10-11 found no bill text. No other statute, regulation or official code on frontier AI developers is recorded.',
      claimIds: [],
      task: 'Obtain the session-law print of Chapter 96 and the text of the 2025 chapter from an official source, and compare them with the printed bill. Scope candidate texts in other jurisdictions, such as other US states, US federal measures and the United Kingdom, and further Chinese texts, without assuming their status. Check each against the editorial policy before admission and keep original-language expressions.',
      computed: { kind: 'enacted-laws' },
    },
    {
      id: 'reception',
      area: 'Reception',
      text: 'How governments, researchers, journalists or developers’ staff responded to these texts. Published commentary appears only as evidence in the contested and unresolved records above.',
      claimIds: [
        'rsp-v2-0-assessed-weakening',
        'rsp-v3-0-assessed-weakening',
        'assessed-preparedness-v2-high-deployment-mitigation',
      ],
      task: 'Collect dated published responses to each text: government consultations, academic analyses, company statements and reporting. Admit them as attributed statements and keep disagreement visible.',
    },
    {
      id: 'causation',
      area: 'Causes of change',
      text: 'Whether a commitment or a law led a developer to revise its framework. Only links that a framework states in its own words are recorded. Closeness in date never creates a link.',
      claimIds: ['sb-link-rsp-v3-0', 'faif-2026-compliance-sentence'],
      task: 'Look for developers’ own explanations of revisions, such as changelogs and announcements that name a commitment or law. Record them as stated reasons and keep them separate from any causal assessment.',
    },
    {
      id: 'framework-links',
      area: 'Coverage',
      text: 'Links not yet recorded. A missing link is a gap in coverage. The framework may still name one of these texts.',
      claimIds: [],
      task: 'Re-read each edition of the listed frameworks for explicit references to the White House commitments, the Seoul commitments, the EU Code or SB 53, and record any with exact locators.',
      computed: { kind: 'frameworks-without-links' },
    },
    {
      id: 'other-signatories',
      area: 'Coverage',
      text: 'Frameworks of other signatories. The Frontier AI Safety Commitments ask each listed organisation to publish a safety framework. Whether these organisations did so is not recorded.',
      claimIds: ['prov-fasc-2024-publish-framework'],
      task: 'For each listed organisation, find the safety framework it published, if any, with the exact edition and date. Zhipu, MiniMax and 01.AI also bear on the Chinese frontier-AI programme.',
      computed: {
        kind: 'signatories-without-framework',
        textIds: ['frontier-ai-safety-commitments-2024'],
      },
    },
    {
      id: 'earliest-editions',
      area: 'Coverage',
      text: 'Whether the earliest recorded edition of each framework is the first its developer published. Earlier drafts or differently named documents may exist.',
      claimIds: [],
      task: 'Check each developer’s publications and archive captures for earlier safety-framework drafts or versions, for example any xAI framework document published before December 2025.',
    },
    {
      id: 'uninspected',
      area: 'Documents not inspected',
      text: 'Anthropic’s Frontier Compliance Framework is recorded only through its announcement. Which document, if any, OpenAI designated under SB 53 between 2026-01-01 and 2026-05-28 has not been established. Attempts on 2026-10-10 and 2026-10-11 found that the portal that serves the Frontier Compliance Framework loads its content by script, that archived captures of its pages hold only the page shell, and that a forum comment of January 2026 describes the framework as page images that cannot be copied. Searches on 2026-10-11 of OpenAI’s published pages found no statement that designates a document under SB 53 before 28 May 2026. The only dated designation recorded is the Frontier Governance Framework’s own statement.',
      claimIds: ['sb-anthropic-fcf-published', 'sb-link-openai-fgf'],
      task: 'Verify the archived copy of the Frontier Compliance Framework noted in the commitments page’s open question, and record its own text. Establish OpenAI’s designation under SB 53 for January–May 2026 from OpenAI’s own publications.',
    },
  ],
  limits: [
    'A framework, a commitment, a signature or a legal duty is never evidence of implementation, compliance or effectiveness. A document’s statement that it fulfils or complies with a text is that document’s own claim.',
    'Records are placed side by side in date order. Order and closeness in date do not show that one led to another.',
    'Signatures and framework links are listed only for the developers whose frameworks are recorded here. Google DeepMind publishes the frameworks, and the commitment lists name Google.',
    'Framework revisions are limited to key revisions: each publisher’s new major version or new framework, or the later edition where editions carry no version number. The document histories page has every recorded edition and change.',
    'Provisions are a limited, quoted selection under the quotation policy. They are not a summary of any text, and a text without a recorded provision has not been shown to lack it.',
    'The EU AI Act records quote the Official Journal text of 2024, and the amendment records quote the text of Regulation (EU) 2026/1744. The consolidated Act was not inspected. The New York provisions are quoted from the legislature’s printed bill S8828 as shown on the Assembly’s site, and the 2025 chapter is known only through announcements. The Commission’s guidelines and template state its interpretation and are not binding. The Chinese measure is quoted in Chinese, and English statements about it are translations by a machine agent.',
    'Open questions and questions set aside are reused from the commitments and document histories pages when they concern a record listed here.',
  ],
};

export const questionStarters = [selfGovernance];
