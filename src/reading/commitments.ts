import type { CommitmentsCollection } from '../domain/commitments';

export const externalCommitments: CommitmentsCollection = {
  id: 'external-commitments',
  version: 3,
  title: 'External commitments and obligations',
  question:
    'What do external safety commitments and laws on frontier AI require, who signed them, when and in what scope, and which published frameworks link themselves to them in their own words?',
  editorialStatus: 'machine-proposed',
  documentIds: [
    'wh-voluntary-ai-commitments-2023-07',
    'wh-voluntary-ai-commitments-2023-09',
    'frontier-ai-safety-commitments-2024',
    'gpai-code-of-practice-2025',
    'california-sb-53',
  ],
  introduction:
    'Five texts are covered, in date order: the White House voluntary AI commitments of July and September 2023, the Frontier AI Safety Commitments of the AI Seoul Summit (May 2024), the EU General-Purpose AI Code of Practice (July 2025) and California SB 53 as chaptered (September 2025). Each comes with the record of its issue or enactment, the exact version inspected, a limited set of quoted provisions and the published framework editions that explicitly link themselves to it. Announcing an intent to sign, signing and appearing on a published list are recorded as separate stages, with any stated scope, such as a single chapter, and refusals are recorded as statements.',
  limits: [
    'A commitment, a signature or a legal duty is never evidence of compliance, implementation or effectiveness. When a framework says that it complies with, serves as or responds to a text, that is the framework’s own claim and is recorded as such.',
    'A listing is the convener’s or the Commission’s statement, dated by the list’s publication. It does not give the date on which an organisation signed, which is unknown unless the organisation announced it.',
    'Signatories are recorded for every organisation on the White House and Seoul lists. For the EU Code of Practice they are recorded only for organisations the dataset covers for other reasons; the Commission’s list names others, has lost names as well as gained them, and a signatory may withdraw at any time.',
    'A statute’s text sets out what it requires of the categories it defines. Whether a named company falls within a category, such as “large frontier developer” or a provider of a general-purpose AI model with systemic risk, is a question of legal application and is not recorded.',
    'Provisions are a limited, quoted selection, within the quotation policy’s limit for each document. They are not a summary of the text. A text without a recorded provision has not been shown to lack it.',
    'Enactment, publication and effective dates are kept apart and labelled. Conditions on which a provision depends, such as an appropriation, are recorded where stated and are not assumed to be met.',
    'Only links that a framework edition states in its own words are recorded. A missing link does not show that a framework does not respond to a text, and closeness in date never creates a link.',
    'Archived copies are existing Internet Archive captures. A capture shows only what the archive retrieved that day. It does not prove what the document said earlier.',
  ],
  openQuestions: [
    {
      id: 'wh-apple-2024',
      documentId: 'wh-voluntary-ai-commitments-2023-07',
      text: 'The White House announced on 26 July 2024 that Apple had signed onto the voluntary commitments. The announcement does not say whether Apple took up the July or the September 2023 text, so no record links Apple to either.',
      claimIds: ['cm-wh-2023-07-published', 'cm-wh-2023-09-published'],
    },
    {
      id: 'wh-scope-change',
      documentId: 'wh-voluntary-ai-commitments-2023-09',
      text: 'The September 2023 text measures which models are in scope against each company’s own most advanced model, where the July text uses the industry frontier. The September text does not say whether its clause also applies to the seven companies of July 2023.',
      claimIds: ['provchange-wh-2023-09-scope'],
    },
    {
      id: 'seoul-google-identity',
      documentId: 'frontier-ai-safety-commitments-2024',
      text: 'The GOV.UK text lists “Google”, while the UK government’s press release of the same day lists “Google / Google DeepMind”. Neither says which legal entity agreed.',
      claimIds: ['cm-seoul-google'],
    },
    {
      id: 'seoul-framework-deadline',
      documentId: 'frontier-ai-safety-commitments-2024',
      text: 'The commitments ask for a safety framework by “the upcoming AI Summit in France” without giving a date; the UK government’s press release of the same day places that summit in early 2025. Whether each organisation published a framework in time is not recorded.',
      claimIds: ['prov-fasc-2024-publish-framework'],
    },
    {
      id: 'eu-chapters',
      documentId: 'gpai-code-of-practice-2025',
      text: 'The Commission’s list does not say which chapters each organisation signed. The exception is xAI: the Commission says it signed up to the Safety and Security chapter and must show compliance on transparency and copyright by other means. The provisions recorded here are quoted from that chapter.',
      claimIds: ['cm-eu-code-xai', 'cm-eu-code-intent-xai'],
    },
    {
      id: 'eu-list-changes',
      documentId: 'gpai-code-of-practice-2025',
      text: 'Of the 26 organisations listed on 1 August 2025, eight are absent from the page as last updated on 31 July 2026, which adds three others. The Commission gives no reasons; its questions and answers say a signatory may withdraw at any time. Every organisation recorded here is still listed.',
      claimIds: ['cm-eu-code-published'],
    },
    {
      id: 'anthropic-fcf-text',
      documentId: 'california-sb-53',
      text: 'Anthropic announced its Frontier Compliance Framework on 19 December 2025 as its compliance framework for SB 53. The framework is served from a portal that loads its content by script, and its own text was not inspected for this page. No record therefore links the framework itself to SB 53. An archived copy has since been found and awaits verification.',
      claimIds: ['sb-anthropic-fcf-published'],
    },
    {
      id: 'sb53-rsp-separate-documentation',
      documentId: 'california-sb-53',
      text: 'Responsible Scaling Policy v3.0 names SB 53 only to say that statutory requirements with specific thresholds are addressed in separate compliance documentation. It does not present itself as Anthropic’s framework under the statute.',
      claimIds: ['sb-link-rsp-v3-0', 'sb-anthropic-fcf-published'],
    },
    {
      id: 'sb53-faif-compliance-sentence',
      documentId: 'california-sb-53',
      text: 'xAI’s December 2025 framework states that it complies with the statute; the June 2026 edition does not contain that sentence. Neither the sentence nor its absence establishes compliance or non-compliance.',
      claimIds: ['sb-link-faif-2025', 'faif-2026-compliance-sentence'],
    },
  ],
  stops: [
    {
      id: 'wh-status-and-effect',
      category: 'legal_effect',
      text: 'Whether the 2023 White House commitments bind or ever bound the companies, and whether they remain in effect. The July text calls them voluntary and says the companies intend them to remain in effect until regulations covering substantially the same issues come into force.',
      claimIds: ['prov-wh-2023-07-duration'],
    },
    {
      id: 'seoul-effect',
      category: 'legal_effect',
      text: 'Whether being listed for the Frontier AI Safety Commitments creates any obligation, and whether “agreed to”, “signed up to” and “endorse” (the wording of the text, of the UK press release and of company statements quoted in it) describe the same act.',
      claimIds: ['cm-seoul-published'],
    },
    {
      id: 'eu-signing-effect',
      category: 'legal_effect',
      text: 'The legal effect of signing or adhering to the EU Code of Practice, the consequence of xAI’s chapter-limited signature, and whether the Code goes beyond the AI Act, as Meta said in refusing to sign. The Commission’s opinion concludes that the Code adequately covers the obligations in Articles 53 and 55 of the Act; that is a different question.',
      claimIds: [
        'cm-eu-code-published',
        'cm-eu-code-xai',
        'cm-eu-code-declined-meta',
      ],
    },
    {
      id: 'eu-provider-status',
      category: 'legal_effect',
      text: 'Whether any named company is a provider of a general-purpose AI model with systemic risk under the AI Act, to which the Safety and Security chapter is addressed.',
      claimIds: ['prov-eu-code-ss-scope'],
    },
    {
      id: 'sb53-applicability',
      category: 'legal_effect',
      text: 'Whether SB 53 applies to a named company is a question of legal application, for example whether OpenAI, Google, Anthropic or xAI is a “frontier developer” or a “large frontier developer”. A competent secondary reference (METR, January 2026) states that such developers are governed by the statute. That statement is not recorded as a finding.',
      claimIds: [
        'sb-frontier-developer-definition',
        'sb-large-frontier-developer-threshold',
      ],
    },
    {
      id: 'sb53-alleged-violations',
      category: 'legal_effect',
      text: 'An advocacy organisation has alleged that OpenAI violated SB 53 in connection with model releases in 2026; OpenAI disputes this, partly by contesting how its own framework wording should be read. Whether any violation occurred is a question of legal effect and compliance and is not recorded.',
      claimIds: ['sb-link-openai-fgf', 'sb-framework-duty'],
    },
    {
      id: 'sb53-company-designations',
      category: 'legal_effect',
      text: 'Company designations are recorded as the companies’ own statements, never as legal fact: OpenAI’s designation of its Frontier Governance Framework as its framework under the Act (and of an OpenAI operating company as responsible for compliance), xAI’s statement that its December 2025 framework complies, and Anthropic’s designation of its Frontier Compliance Framework.',
      claimIds: [
        'sb-link-openai-fgf',
        'sb-link-faif-2025',
        'sb-anthropic-fcf-published',
      ],
    },
    {
      id: 'sb53-preemption-carve-outs',
      category: 'legal_effect',
      text: 'The Act’s carve-outs for strict conflicts with federal contracts, federal preemption and local regulation (SEC. 5) and the federal-equivalence pathway’s effect on obligations require legal interpretation and are not recorded beyond the quoted text.',
      claimIds: ['sb-federal-equivalence-pathway'],
    },
    {
      id: 'sb53-own-framework-compliance',
      category: 'legal_effect',
      text: 'What it means to comply with one’s own framework when the framework uses discretionary or hedged language, and what counts as a material modification or a substantially modified model, are questions of interpretation and are not recorded.',
      claimIds: [
        'sb-framework-duty',
        'sb-framework-modification-30-days',
        'sb-civil-penalty-cap',
      ],
    },
  ],
};

export const commitmentCollections = [externalCommitments];
