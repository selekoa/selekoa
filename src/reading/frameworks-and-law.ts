import type { FrameworksLawCollection } from '../domain/frameworks-law';
import { frameworkComparison } from './framework-comparison';
import { externalCommitments } from './commitments';

/**
 * The governance spine's flagship reading: developers' safety frameworks and
 * the laws and government texts that address developers of frontier or
 * general-purpose models. Every date, standing and link on the page is
 * computed from the records listed here; the text adds no claim.
 */
export const frontierFrameworksAndLaw: FrameworksLawCollection = {
  id: 'frontier-frameworks-and-law',
  version: 2,
  title: 'Frontier AI frameworks and law, 2023–2026',
  question:
    'What did frontier AI developers’ safety frameworks say, what did laws and government texts on frontier or general-purpose models state, with what standing and when, and which frameworks name which texts?',
  editorialStatus: 'machine-proposed',
  coverage:
    'The texts come from the European Union, China, the US federal government, four US states, the United Kingdom, the AI summits, the G7 and the OECD.',
  period: { from: 2023, to: 2026 },
  families: frameworkComparison.families,
  commitmentTextIds: externalCommitments.documentIds,
  orientation: [
    {
      id: 'binding',
      text: 'The EU AI Act sets duties for providers of general-purpose AI models, with further duties for models with systemic risk. Its chapter on these models applies from 2 August 2025, a year before the Act’s general date of application. China’s Interim Measures and Labelling Measures set duties for providers of generative AI services.',
      claimIds: [
        'aia-enacted',
        'aia-art113-chapter-v-applies',
        'aia-art113-general-date',
        'aia-art53-technical-documentation',
        'aia-art55-model-evaluation',
        'cn-genai-measures-issued',
        'fl-cn-genai-art7-training-data',
        'fl-cn-labelling-explicit-duty',
      ],
    },
    {
      id: 'framework-laws',
      text: 'California SB 53 requires a large frontier developer to write, implement, comply with and publish a frontier AI framework. New York’s RAISE Act of 2025 requires a written safety and security protocol, and its 2026 amendment requires a frontier AI framework from 1 January 2027.',
      claimIds: [
        'sb-framework-duty',
        'fl-us-ny-2025-safety-protocol-duty',
        'ny-ch96-framework-duty',
        'ny-ch96-effective-date',
      ],
    },
    {
      id: 'compliance-route',
      text: 'Under the AI Act, providers may rely on a code of practice to demonstrate compliance until a harmonised standard is published. The Commission published the final General-Purpose AI Code of Practice on 10 July 2025 and assessed it under Article 56 of the Act in an opinion of 1 August 2025.',
      claimIds: [
        'fl-eu-aia-art53-4-code-reliance',
        'aia-art55-code-reliance',
        'cm-eu-code-published',
        'fl-eu-opinion-issued',
      ],
    },
    {
      id: 'us-federal',
      text: 'At the US federal level, Executive Order 14148 revoked Executive Order 14110 in January 2025, and the Department of Commerce announced a rescission of the AI diffusion rule in May 2025. Executive Order 14365 directs the Attorney General to set up a task force to challenge state AI laws inconsistent with its policy. The White House’s legislative recommendations of March 2026 state that Congress should preempt state AI laws that impose undue burdens.',
      claimIds: [
        'fl-us-eo14110-revoked',
        'fl-us-bis-ai-diffusion-rescission-announced',
        'fl-us-eo14365-litigation-task-force',
        'fl-us-legislative-recommendations-ai-development',
      ],
    },
    {
      id: 'voluntary',
      text: 'The UK government’s memoranda with Anthropic, Cohere and OpenAI each state that they are voluntary and not legally binding. The G7’s Hiroshima code states that it provides voluntary guidance. The King’s Speech of 2024 said the government would seek legislation on developers of the most powerful models; a search of the 2026 briefing notes found none of the terms “frontier”, “most powerful” or “AI Bill”.',
      claimIds: [
        'fl-uk-anthropic-mou-not-binding',
        'fl-uk-cohere-mou-not-binding',
        'fl-uk-openai-mou-not-binding',
        'fl-intl-g7-code-scope-voluntary',
        'fl-uk-kings-speech-2024-frontier-legislation',
        'fl-uk-kings-speech-2026-no-frontier-bill',
      ],
    },
  ],
  sections: [
    {
      id: 'eu',
      title: 'European Union',
      tag: 'EU',
      instruments: [
        {
          documentId: 'eu-ai-act-2024',
          standing: 'binding',
          standingClaimIds: [
            'aia-enacted',
            'fl-eu-aia-art113-entry-into-force',
          ],
        },
        {
          documentId: 'gpai-code-of-practice-draft1-2024',
          standing: 'proposed',
          standingClaimIds: ['fl-eu-cop-draft1-published'],
        },
        {
          documentId: 'gpai-code-of-practice-2025',
          standing: 'compliance-route',
          standingClaimIds: [
            'cm-eu-code-published',
            'fl-eu-aia-art53-4-code-reliance',
            'aia-art55-code-reliance',
          ],
        },
        {
          documentId: 'eu-gpai-guidelines-communication-2025',
          standing: 'guidance',
          standingClaimIds: ['eugl-communication-published'],
        },
        {
          documentId: 'eu-gpai-training-summary-template-2025',
          standing: 'guidance',
          standingClaimIds: ['eutm-summary-updates'],
        },
        {
          documentId: 'eu-commission-opinion-code-2025',
          standing: 'guidance',
          standingClaimIds: ['fl-eu-opinion-issued'],
        },
        {
          documentId: 'eu-gpai-guidelines-2025',
          standing: 'guidance',
          standingClaimIds: ['eugl-guidelines-dated'],
        },
        {
          documentId: 'eu-draft-implementing-regulation-gpai-proceedings-2026',
          standing: 'proposed',
          standingClaimIds: ['eudraft-proceedings-published'],
        },
        {
          documentId: 'eu-digital-omnibus-ai-2026',
          standing: 'binding',
          standingClaimIds: ['omni-enacted'],
        },
      ],
    },
    {
      id: 'china',
      title: 'China',
      tag: 'China',
      note: 'Chinese texts are quoted in Chinese, with a working English translation marked as Selekoa’s. TC260’s AI Safety Governance Framework and Shanghai AI Laboratory’s Frontier AI Risk Management Framework, the only framework from a Chinese developer in the records, are on their own document pages and are not part of this page.',
      instruments: [
        {
          documentId: 'cn-generative-ai-interim-measures-2023',
          standing: 'binding',
          standingClaimIds: ['cn-genai-measures-issued'],
        },
        {
          documentId: 'cn-cac-genai-filings-announcement-2024',
          standing: 'statement',
          standingClaimIds: ['fl-cn-filings-2024-published'],
        },
        {
          documentId: 'cn-cac-genai-filings-announcement-2025',
          standing: 'statement',
          standingClaimIds: ['fl-cn-filings-2025-count'],
        },
        {
          documentId: 'cn-gb-45438-2025',
          standing: 'binding',
          standingClaimIds: ['fl-cn-gb45438-published'],
        },
        {
          documentId: 'cn-ai-content-labelling-measures-2025',
          standing: 'binding',
          standingClaimIds: ['fl-cn-labelling-issued'],
        },
        {
          documentId: 'cn-gbt-45654-2025',
          standing: 'guidance',
          standingClaimIds: ['fl-cn-gbt45654-published'],
        },
        {
          documentId: 'cn-cybersecurity-law-amendment-2025',
          standing: 'binding',
          standingClaimIds: ['fl-cn-csl-amendment-adopted'],
        },
      ],
    },
    {
      id: 'us-federal',
      title: 'United States: federal government',
      tag: 'US federal',
      instruments: [
        {
          documentId: 'wh-voluntary-ai-commitments-2023-07',
          standing: 'voluntary',
          standingClaimIds: ['prov-wh-2023-07-duration'],
          // The September text is the same commitments, signed by another
          // group of companies (maintainer decision, 2026-10-29).
          laterVersion: 'second-round',
        },
        {
          documentId: 'wh-voluntary-ai-commitments-2023-09',
          standing: 'voluntary',
          standingClaimIds: ['cm-wh-2023-09-published'],
        },
        {
          documentId: 'us-eo-14110-2023',
          standing: 'executive-order',
          standingClaimIds: ['fl-us-eo14110-signed'],
        },
        {
          documentId: 'nist-ai-800-1-ipd-2024',
          standing: 'proposed',
          standingClaimIds: ['fl-us-nist-ai-800-1-ipd-published'],
        },
        {
          documentId: 'us-bis-ai-reporting-nprm-2024',
          standing: 'proposed',
          standingClaimIds: ['fl-us-bis-reporting-nprm-published'],
        },
        {
          documentId: 'us-uk-aisi-preeval-claude-35-sonnet-2024',
          standing: 'guidance',
          standingClaimIds: ['fl-us-aisi-preeval-claude35-published'],
        },
        {
          documentId: 'us-uk-aisi-preeval-o1-2024',
          standing: 'guidance',
          standingClaimIds: ['fl-us-aisi-preeval-o1-published'],
        },
        {
          documentId: 'us-bis-ai-diffusion-ifr-2025',
          standing: 'binding',
          standingClaimIds: ['fl-us-bis-ai-diffusion-ifr-published'],
        },
        {
          documentId: 'nist-ai-800-1-2pd-2025',
          standing: 'proposed',
          standingClaimIds: ['fl-us-nist-ai-800-1-2pd-published'],
        },
        {
          documentId: 'us-eo-14148-2025',
          standing: 'executive-order',
          standingClaimIds: ['fl-us-eo14148-signed'],
        },
        {
          documentId: 'us-eo-14179-2025',
          standing: 'executive-order',
          standingClaimIds: ['fl-us-eo14179-signed'],
        },
        {
          documentId: 'us-ai-action-plan-2025',
          standing: 'guidance',
          standingClaimIds: ['fl-us-ai-action-plan-published'],
        },
        {
          documentId: 'us-eo-14365-2025',
          standing: 'executive-order',
          standingClaimIds: ['fl-us-eo14365-signed'],
        },
        {
          documentId: 'us-national-ai-legislative-recommendations-2026',
          standing: 'proposed',
          standingClaimIds: ['fl-us-legislative-recommendations-published'],
        },
        {
          documentId: 'us-eo-14409-2026',
          standing: 'executive-order',
          standingClaimIds: ['fl-us-eo14409-signed'],
        },
      ],
      relatedClaimIds: [
        'fl-us-aisi-agreement-anthropic-announced',
        'fl-us-aisi-agreement-openai-announced',
        'fl-us-caisi-security-work-anthropic',
        'fl-us-caisi-security-work-openai',
      ],
      relatedHeading:
        'The US AI Safety Institute and CAISI: agreements and reported work with developers',
    },
    {
      id: 'us-states',
      title: 'United States: states',
      tag: 'US states',
      instruments: [
        {
          documentId: 'ca-sb1047-2024',
          standing: 'proposed',
          standingClaimIds: ['fl-us-ca-sb1047-vetoed'],
        },
        {
          documentId: 'ca-frontier-ai-policy-report-2025',
          standing: 'guidance',
          standingClaimIds: ['fl-us-ca-frontier-report-published'],
        },
        {
          documentId: 'california-sb-53',
          standing: 'requires-framework',
          standingClaimIds: ['sb-enactment-2025-09-29', 'sb-framework-duty'],
        },
        {
          documentId: 'mi-hb-4668-2025',
          standing: 'proposed',
          standingClaimIds: ['fl-us-mi-hb4668-introduced'],
        },
        {
          documentId: 'ny-raise-act-chapter-699-2025',
          standing: 'requires-framework',
          standingClaimIds: [
            'fl-us-ny-s6953b-signed-chapter-699',
            'fl-us-ny-2025-safety-protocol-duty',
          ],
        },
        {
          documentId: 'new-york-raise-act',
          standing: 'announced',
          standingClaimIds: ['ny-raise-signing-announced'],
        },
        {
          documentId: 'new-york-raise-act-chapter-96-2026',
          standing: 'requires-framework',
          standingClaimIds: ['ny-chapter96-signed', 'ny-ch96-framework-duty'],
        },
        {
          documentId: 'il-ai-safety-measures-act',
          standing: 'announced',
          standingClaimIds: ['fl-us-il-ai-safety-measures-act-signed-stated'],
        },
      ],
    },
    {
      id: 'uk',
      title: 'United Kingdom',
      tag: 'UK',
      instruments: [
        {
          documentId: 'uk-us-ai-safety-mou-2024',
          standing: 'announced',
          standingClaimIds: ['fl-uk-us-aisi-mou-signed'],
        },
        {
          documentId: 'uk-kings-speech-2024',
          standing: 'statement',
          standingClaimIds: ['fl-uk-kings-speech-2024-frontier-legislation'],
        },
        {
          documentId: 'uk-anthropic-mou-2025',
          standing: 'voluntary',
          standingClaimIds: ['fl-uk-anthropic-mou-not-binding'],
        },
        {
          documentId: 'uk-aisi-rename-press-release-2025',
          standing: 'statement',
          standingClaimIds: ['fl-uk-aisi-renamed'],
        },
        {
          documentId: 'uk-cohere-mou-2025',
          standing: 'voluntary',
          standingClaimIds: ['fl-uk-cohere-mou-not-binding'],
        },
        {
          documentId: 'uk-openai-mou-2025',
          standing: 'voluntary',
          standingClaimIds: ['fl-uk-openai-mou-not-binding'],
        },
        {
          documentId: 'uk-google-deepmind-mou-2025',
          standing: 'agreement',
          standingClaimIds: ['fl-uk-gdm-mou-published', 'fl-uk-gdm-mou-term'],
        },
        {
          documentId: 'uk-kings-speech-2026-notes',
          standing: 'statement',
          standingClaimIds: ['fl-uk-kings-speech-2026-no-frontier-bill'],
        },
        {
          documentId: 'uk-ai-defences-press-release-2026',
          standing: 'statement',
          standingClaimIds: ['fl-uk-csr-bill-ai-incidents'],
        },
      ],
    },
    {
      id: 'international',
      title: 'Summits, the G7 and the OECD',
      tag: 'International',
      note: 'Being listed under a declaration or statement is not ratification, a signature of a treaty or evidence of implementation. A country absent from a list is recorded only as absent from that list.',
      instruments: [
        {
          documentId: 'g7-leaders-statement-haip-2023',
          standing: 'statement',
          standingClaimIds: ['fl-intl-g7-haip-leaders-call'],
        },
        {
          documentId: 'g7-hiroshima-code-of-conduct-2023',
          standing: 'voluntary',
          standingClaimIds: ['fl-intl-g7-code-scope-voluntary'],
        },
        {
          documentId: 'bletchley-declaration-2023',
          standing: 'statement',
          standingClaimIds: ['fl-intl-bletchley-published'],
        },
        {
          documentId: 'bletchley-chair-safety-testing-2023',
          standing: 'statement',
          standingClaimIds: ['fl-intl-bletchley-chair-testing-published'],
        },
        {
          documentId: 'seoul-declaration-2024',
          standing: 'statement',
          standingClaimIds: ['fl-intl-seoul-declaration-published'],
        },
        {
          documentId: 'frontier-ai-safety-commitments-2024',
          standing: 'voluntary',
          standingClaimIds: [
            'cm-seoul-published',
            'prov-fasc-2024-publish-framework',
          ],
        },
        {
          documentId: 'seoul-ministerial-statement-2024',
          standing: 'statement',
          standingClaimIds: ['fl-intl-seoul-ministerial-published'],
        },
        {
          documentId: 'haip-reporting-framework-2025',
          standing: 'voluntary',
          standingClaimIds: ['fl-intl-haip-reporting-framework-launched'],
        },
        {
          documentId: 'paris-ai-action-statement-2025-web',
          standing: 'statement',
          standingClaimIds: ['fl-intl-paris-statement-published'],
        },
        {
          documentId: 'paris-ai-action-statement-2025-pdf',
          standing: 'statement',
          standingClaimIds: ['fl-intl-paris-statement-signatories-pdf'],
        },
        {
          documentId: 'oecd-how-are-ai-developers-managing-risks-2025',
          standing: 'guidance',
          standingClaimIds: ['fl-intl-haip-first-round-listed'],
        },
        {
          documentId: 'new-delhi-declaration-2026',
          standing: 'statement',
          standingClaimIds: [
            'fl-intl-new-delhi-published',
            'fl-intl-new-delhi-endorsers',
          ],
        },
      ],
    },
  ],
  notCovered: [
    {
      id: 'compliance',
      category: 'scope',
      text: 'Whether any developer falls within a law’s categories, complies with a law, or follows its own framework. The records state what each text says and when; whether a named company is a “large frontier developer” or a provider of a model with systemic risk is legal application and is not recorded.',
      claimIds: [
        'sb-large-frontier-developer-threshold',
        'aia-art51-compute-presumption',
      ],
    },
    {
      id: 'selection',
      category: 'scope',
      text: 'The provisions of each text are a selection: definitions and thresholds that decide who is covered, duties of developers, dates, enforcement, and any provision that names a framework or code. A text without a recorded provision on a subject has not been shown to lack one.',
      claimIds: [],
    },
    {
      id: 'jurisdictions',
      category: 'scope',
      text: 'Laws and government texts of other jurisdictions are not covered here, among them those of Japan, South Korea, Canada and India. Those countries appear here only through the summits, the G7 and the OECD.',
      claimIds: ['fl-intl-new-delhi-published'],
    },
    {
      id: 'compliance-documents',
      category: 'gap',
      text: 'Developers’ compliance and transparency documents under these laws are left for a separate pass. Anthropic announced its Frontier Compliance Framework for SB 53 on 19 December 2025; the framework’s own text has not been inspected.',
      claimIds: ['sb-anthropic-fcf-published'],
    },
    {
      id: 'michigan-status',
      category: 'gap',
      text: 'Michigan HB 4668’s status is recorded only as of an archive capture of 23 March 2026. No later action is recorded.',
      claimIds: ['fl-us-mi-hb4668-introduced'],
    },
    {
      id: 'illinois-text',
      category: 'gap',
      text: 'The Illinois AI Safety Measures Act is known from the Governor’s Executive Order 2026-07, which states that it was passed and signed. Its bill record, dates and text are not recorded.',
      claimIds: ['fl-us-il-ai-safety-measures-act-signed-stated'],
    },
    {
      id: 'texts-not-inspected',
      category: 'gap',
      text: 'Some texts are known only from announcements: the UK–US memorandum of April 2024, the US AI Safety Institute’s memoranda with Anthropic and OpenAI, and the Cyber Security and Resilience Bill, whose text was not inspected. No Federal Register rule formalising the rescission of the AI diffusion rule was inspected.',
      claimIds: [
        'fl-uk-us-aisi-mou-signed',
        'fl-us-aisi-agreement-anthropic-announced',
        'fl-uk-csr-bill-ai-incidents',
        'fl-us-bis-ai-diffusion-rescission-announced',
      ],
    },
    {
      id: 'declarations-as-citations',
      category: 'gap',
      text: 'Where a governmental declaration names a commitment text, as the Seoul Declaration notes the Frontier AI Safety Commitments, it is recorded as a citation. Only frameworks that link themselves to a text appear in the table of framework links.',
      claimIds: [
        'fl-intl-seoul-declaration-notes-fasc',
        'fl-intl-g7-haip-leaders-welcome',
      ],
    },
    {
      id: 'eu-retrieval',
      category: 'retrieval',
      text: 'EUR-Lex returned empty responses, so the AI Act and the Digital Omnibus were read in the same Official Journal text through the Publications Office’s repository. The date of the Code’s initial draft rests on the cross-family check’s reading of the Commission’s library page, which refused this admission’s requests.',
      claimIds: [
        'fl-eu-aia-art113-entry-into-force',
        'fl-eu-cop-draft1-published',
      ],
    },
    {
      id: 'archive-retrieval',
      category: 'retrieval',
      text: 'The Internet Archive refused the admission’s connections. Captures of the NIST, BIS and Michigan pages rest on the cross-family check’s reading of them, and no archived copy is recorded for the Chinese and EU pages added in October 2026.',
      claimIds: [
        'fl-us-bis-ai-diffusion-ifr-model-weights',
        'fl-us-mi-hb4668-introduced',
      ],
    },
    {
      id: 'china-retrieval',
      category: 'retrieval',
      text: 'The Cyberspace Administration of China’s own site refused retrieval for some pages, so its January 2025 announcement is dated by the gov.cn repost.',
      claimIds: ['fl-cn-filings-2025-count'],
    },
  ],
  limits: [
    'A framework, a commitment or a legal duty is never evidence of compliance, implementation or effectiveness. When a framework says that it complies with, serves as or responds to a text, that is the framework’s own statement.',
    'The page arranges records by date and by jurisdiction. It records no cause, influence or response between them. Two texts close in date are not linked unless a record states the link.',
    'Each instrument’s standing is one of the labels below, chosen from the records shown with it. It describes the text’s form and recorded stage, not its legal effect.',
    'Dates keep their kind: signature, publication, announcement, effect and snapshot dates are kept apart, with their stated precision. A date after the latest evidence check is a date the text states for the future.',
  ],
};
