import type { LawsComparedCollection } from '../domain/law-comparison';
import { lawsComparedFrame } from './laws-compared-frame';

const column = (id: string) => {
  const c = lawsComparedFrame.columns.find((c) => c.id === id);
  if (!c) throw new Error('Unknown column: ' + id);
  return c;
};

/**
 * "Laws compared" (schema 2.31), from the adjudicated candidate pack
 * (research/laws-compared, review note review/laws-compared-pack-2026-11-02.md)
 * under the maintainer's decisions of 2026-11-03, 2026-11-04 and 2026-11-05.
 * The questions and criteria are the pack's, verbatim: every cell was
 * classified against them (the admission script and a test check this).
 * Shared code reads only the frame (./laws-compared-frame.ts).
 */
export const lawsCompared: LawsComparedCollection = {
  ...lawsComparedFrame,
  columns: [
    {
      ...column('eu-ai-act'),
      label: 'EU AI Act',
      jurisdiction: 'European Union',
      standing: 'Binding regulation',
      standingNote:
        'Regulation (EU) 2024/1689, adopted by the European Parliament and the Council. The provisions compared are those on general-purpose AI models (Chapter V, Articles 51 to 56) and Article 101, read with Regulation (EU) 2026/1744 (the Digital Omnibus on AI) where it amends them.',
    },
    {
      ...column('eu-code-ss'),
      label: 'EU Code of Practice, Safety and Security',
      jurisdiction: 'European Union',
      standing: 'Compliance route, not binding',
      standingNote:
        'The Safety and Security chapter of the General-Purpose AI Code of Practice is not binding in itself. Under Articles 53(4) and 55(2) of the AI Act, providers may rely on codes of practice to demonstrate compliance. Its commitments are those of the signatories that adhere to it. It is never counted among the laws. The chapter is undated; the Commission’s Code page gives 10 July 2025.',
    },
    {
      ...column('ca-sb53'),
      label: 'California SB 53',
      jurisdiction: 'United States: California',
      standing: 'Binding statute',
      standingNote:
        'The Transparency in Frontier Artificial Intelligence Act, approved by the Governor on 2025-09-29 and chaptered as Chapter 138, Statutes of 2025.',
    },
    {
      ...column('ny-raise-act'),
      label: 'New York RAISE Act',
      jurisdiction: 'United States: New York',
      standing:
        'Binding statute; the amended duties take effect on 1 January 2027',
      standingNote:
        'Signed as Chapter 699 of 2025 (2025-12-19) and amended by Chapter 96 of 2026 (signed 2026-03-27), which repeals and re-adds Article 44-B, the article holding the duties compared. Article 44-B as re-added takes effect on 1 January 2027. The table shows the amended text; the text as signed in 2025 is the earlier version. Whether the 2025 text took effect before the amendment is not settled by the texts read.',
      textLabels: [
        'As signed, Chapter 699 of 2025',
        'As amended, Chapter 96 of 2026',
      ],
    },
    {
      ...column('il-aisma'),
      label: 'Illinois AI Safety Measures Act',
      jurisdiction: 'United States: Illinois',
      standing: 'Binding statute',
      standingNote:
        'Public Act 104-0538 (SB 315), the Artificial Intelligence Safety Measures Act. The Governor’s Executive Order 2026-07 states that the act was passed and signed. The cells were read in a saved copy of the enacted text, taken from an Internet Archive capture of the official PDF. The approval date rests on the cross-family checker’s copy of the official bill status record, which the preparer could not open.',
    },
    {
      ...column('cn-genai-measures'),
      label: 'China, generative AI services (2023)',
      jurisdiction: 'China',
      standing: 'Binding measures, addressed to service providers',
      standingNote:
        'Interim Measures for the Management of Generative Artificial Intelligence Services (生成式人工智能服务管理暂行办法), issued by joint Order No. 15 of seven authorities. They address providers of generative AI services to the public in China, not model developers as such. Quotations are in Chinese with Selekoa’s working translation.',
    },
    {
      ...column('cn-labelling-measures'),
      label: 'China, AI content labelling (2025)',
      jurisdiction: 'China',
      standing: 'Binding measures, addressed to service providers and others',
      standingNote:
        'Measures for Labelling Artificial Intelligence-Generated Synthetic Content (人工智能生成合成内容标识办法), issued by notice of four authorities. They address service providers and others. The mandatory national standard on labelling methods (GB 45438-2025) is not compared: its text was not retrieved. Quotations are in Chinese with Selekoa’s working translation.',
    },
    {
      ...column('us-eo14110'),
      label: 'US Executive Order 14110',
      jurisdiction: 'United States: federal',
      standing: 'Revoked by Executive Order 14148 (2025-01-20)',
      standingNote:
        'An executive order of 30 October 2023 directing federal agencies; its reporting duties for developers were to be imposed by the Secretary of Commerce. Executive Order 14148 revoked it on 2025-01-20. A historical column.',
    },
    {
      ...column('us-bis-ifr'),
      label: 'US BIS AI diffusion rule',
      jurisdiction: 'United States: federal',
      standing:
        'Rescission announced on 2025-05-13; no formal rescission rule inspected',
      standingNote:
        'The Framework for Artificial Intelligence Diffusion, an export-control interim final rule published on 2025-01-15. On 2025-05-13 the Department of Commerce announced a rescission. No Federal Register rule formalising the rescission was inspected, so its formal status after May 2025 is not recorded here. An announcement is not a rescission.',
    },
  ],
  groups: [
    { heading: 'European Union', columns: ['eu-ai-act', 'eu-code-ss'] },
    {
      heading: 'United States: states',
      columns: ['ca-sb53', 'ny-raise-act', 'il-aisma'],
    },
    {
      heading: 'China',
      note: 'These measures address providers of services, not developers as such.',
      columns: ['cn-genai-measures', 'cn-labelling-measures'],
    },
    {
      heading: 'Revoked, or rescission announced',
      note: 'Kept as part of the record, each with its standing shown.',
      columns: ['us-eo14110', 'us-bis-ifr'],
    },
  ],
  introduction:
    'Each column is one instrument; each row is one question, worded so that it fits every instrument. The questions are Selekoa’s; an instrument’s own terms appear only in quotation marks. Some instruments address providers of services rather than developers, and the first row quotes the party each one defines.',
  reading:
    'Every stated or partly cell quotes the instrument’s own text with its article, section or page; Chinese passages carry Selekoa’s working translation. Three cells give a paraphrase with its locator instead, and say so. A not-found cell lists the sections read, the terms searched and every passage set aside, with the reason.',
  questions: {
    'L.Q01': {
      question:
        'On whom does the instrument place the duties compared here, in its own defined terms?',
      criterion:
        'The defined term for the party that bears the duties (developer, provider, company, exporter), quoted from its definition or from the provision that imposes the duties. Where the instrument has tiers, each tier is named in its own defined terms.',
    },
    'L.Q02': {
      question:
        'What threshold or condition brings a model, or its developer, within those duties?',
      criterion:
        'A stated condition, quoted with its figure where there is one: training compute, compute cost, revenue, capability, number of users, or designation by an authority. Stated if a threshold or designation condition is quoted; partly if the instrument covers a broad class (for example, all public services of a kind) without any model-level threshold.',
    },
    'L.Q03': {
      question:
        'Must the covered party write or adopt a document setting out how it assesses and manages risks from its models?',
      criterion:
        'A provision requiring the covered party to have a written framework, policy or protocol on the risks of its models. A policy on a single other subject (copyright, content labelling) does not meet it. Partly if a risk-management system or measures are required without a written document.',
    },
    'L.Q04': {
      question:
        'Must that document be published, or given to a public authority?',
      criterion:
        'A provision requiring the document in Q03 to be published, or submitted or made available to a public authority. Not applicable where Q03 finds no such document.',
    },
    'L.Q05': {
      question: 'Must the covered party evaluate or test its models for risks?',
      criterion:
        'A duty to assess, evaluate or test the model for risks, before or after it is made available. Partly if the duty is to assess something other than the model (for example, a service or a content category) or is stated only as an aim.',
    },
    'L.Q06': {
      question:
        'Does the instrument require, or provide for, assessment of the model or of the developer’s practices by anyone other than the developer?',
      criterion:
        'Stated if the instrument requires an assessment by an independent or external party or by a public authority. Partly if it only permits or empowers one (an authority “may” evaluate or request access), or provides for an assessment of filings or documents rather than of the model.',
    },
    'L.Q07': {
      question:
        'Must the covered party report incidents to a public authority, and within what time?',
      criterion:
        'A duty to report incidents, defined however the instrument defines them, to a named public authority. The deadline is quoted where stated. Partly if a reporting duty has no stated deadline, or runs to someone other than a public authority.',
    },
    'L.Q08': {
      question:
        'Must the covered party publish, or give an authority, information about each model?',
      criterion:
        'A duty to publish a report on a model, or to draw up and supply documentation on it to an authority or to others, quoted with its trigger (for example, before deployment). A labelling or watermark duty on outputs does not meet it; it is noted where present.',
    },
    'L.Q09': {
      question:
        'Does the instrument protect people who report risks or violations?',
      criterion:
        'A provision prohibiting retaliation against employees or others who disclose risks or violations, or requiring a channel for such disclosures. A general complaint mechanism for users is noted but does not meet the criterion. Partly if the protection applies only by reference to another law.',
    },
    'L.Q10': {
      question:
        'When was the instrument adopted, signed, approved or issued, according to its own text or official record?',
      criterion:
        'A date with its kind, quoted from the instrument or the official legislative or gazette record. Dates of other kinds (publication, entry into force) go in Q11 and Q12.',
    },
    'L.Q11': {
      question:
        'When does the instrument enter into force or take effect, by its own provision?',
      criterion:
        'The instrument’s own provision on entry into force, taking effect or operative date, quoted. A date computed from a rule (“the twentieth day following publication”) is quoted as the rule; any computed date is marked as computed.',
    },
    'L.Q12': {
      question:
        'From when do the duties compared here apply, where the instrument sets a date or period different from entry into force?',
      criterion:
        'A provision setting a separate application date or transition period for the duties compared here, including for models already on the market. Not found if no separate date is located; the cell does not infer one.',
    },
    'L.Q13': {
      question:
        'What is the maximum penalty for breaching the duties, and on what basis is it set?',
      criterion:
        'A quoted maximum (amount, share of turnover, or other measure) with its basis, such as per violation or a percentage of turnover. Partly if the instrument provides for penalties without a stated maximum, or by reference to another law.',
    },
    'L.Q14': {
      question: 'Which public body enforces or supervises the duties?',
      criterion:
        'A named public body given power to enforce, supervise or penalise breaches of the duties compared here, quoted.',
    },
    'L.Q15': {
      question:
        'Does the instrument require, recognise or refer to a developer’s own safety framework, or to a code of practice or standard, and how?',
      criterion:
        'A provision that requires a developer’s framework, names a code of practice or standard as a means of showing compliance, deems compliance with another regime to be compliance, or otherwise refers to such documents. The relation is recorded in the instrument’s own words: requires, may rely on, deemed, refers to.',
    },
  },
  legend: {
    stated:
      'A passage of the instrument meets the question’s criterion as worded, however conditional or narrow its scope. The condition or scope is in the note.',
    partly:
      'A passage has what the criterion asks for, but in a weaker form than the criterion’s own words: for example, a power (“may”) where the criterion asks for a duty (“shall”), or a duty without the deadline the question asks about.',
    'not-found':
      'No passage meeting the criterion was found. The cell lists the sections read, the search terms and every passage set aside, with the reason. It does not show that the instrument lacks such a provision elsewhere, or that no other law imposes one.',
    'not-applicable':
      'The question does not arise for this instrument, for the reason given (for example, there is no framework document whose publication could be asked about).',
  },
  partlyRules: [
    'An order to an agency to impose a duty counts as partly.',
    'Protection only by reference to another law counts as partly.',
    '“Without undue delay” counts as a stated deadline.',
    'Required security measures for model weights count as risk-management measures under Q03.',
  ],
  limits: [
    'A cell records what the text requires of the parties it defines. It does not show that any named developer falls within them, or that anyone complied.',
    'A not-found cell is bounded by its search: the sections read and the terms searched. Another provision, or another law, may still impose the duty.',
    'The Code of Practice is a compliance route, not a law. Executive Order 14110 is revoked, and the BIS rule’s rescission was announced; each column shows its standing.',
    'The table compares and does not rank. Statuses are not scores and are not to be summed.',
    'Biological and chemical risk provisions are recorded at policy level only.',
    'Dates keep their kind: adoption, signature, approval, publication, entry into force and application are different events. A computed date is marked as computed.',
  ],
  howWeSearched: [
    'The instruments started from those on the frameworks-and-law page. A column was kept where the instrument is binding, or is the AI Act’s stated means of compliance (the Code), and places duties on developers or providers of frontier or general-purpose AI models. Fifty other instruments on that page were set aside, each with its reason, in the research pack: proposed or vetoed texts, guidance and reports, voluntary commitments, binding texts that place no duty on developers, and one standard whose text was not retrieved (GB 45438-2025).',
    'United Kingdom: within the searches made, no UK law or other binding instrument placing duties on developers of such models was located. This is not a finding that none exists. The 2024 King’s Speech announced an intent to legislate; the 2026 briefing notes contain none of the searched terms; the memoranda with developers state that they are not legally binding; and title searches of legislation.gov.uk for 2023 to 2026 found one instrument, which places a duty on the Information Commissioner.',
    'Other US federal texts: as read, none places a binding duty on developers. Executive Order 14409 of 2 June 2026 provides for a voluntary access framework and says that its section 3 authorises no licensing requirement.',
    'Not yet read: the Republic of Korea’s AI Basic Act, Japan’s AI Promotion Act (2025), China’s provisions on deep synthesis (2022) and on algorithm recommendation (2021), and Colorado SB 24-205 (2024). They are not in the dataset; a later pack starts with Korea.',
    'Illinois: the act’s official website refused the preparer’s requests, and the Internet Archive reset the connections. The cross-family checker’s session saved the enacted text from an Internet Archive capture of the official PDF (2026-09-08), and the cells were drafted from that saved text. The two model families read the act independently and agreed on the status of 13 of 15 cells. The approval date rests on the checker’s copy of the official bill status record, which the preparer could not open; it is given as a paraphrase, labelled as that copy.',
    'Texts were read in official copies: the EU texts through the Publications Office’s repository, because EUR-Lex returned empty responses; California SB 53 from the Legislative Counsel’s database file, because its website refused requests; New York’s chapters in the Senate print and the Assembly’s bill records, not the session laws; the Chinese measures in the gov.cn policy library. Six web pages served changed bytes between retrievals; every quotation still matched.',
    'Roles: one model family (Claude) drafted the cells, audited 50 of them in a fresh context and adjudicated. A model from another family (GPT, through Codex) checked 122 items, answering 85 of them blind before seeing the drafted answers. Where it disagreed, its status was applied. One cell it disputed (Executive Order 14110, Q06) was settled as not found after its second pass. For Illinois the roles were reversed: the checker read the act first, blind, and the drafter then wrote all fifteen cells without seeing its answers. The maintainer decided the remaining questions, including the four rules for “partly” and Illinois Q05 (partly, as for California’s identical wording). No person has checked the cells against the texts.',
  ],
  notApplicable: [
    {
      textId: 'eu-ai-act-2024',
      facetIds: ['L.Q04'],
      reason:
        'Q03 finds a risk-management duty but no written framework document, so there is no document whose publication could be asked about. Technical documentation, which includes evaluation strategies for models with systemic risk, is kept for supply to the AI Office on request (Article 53(1)(a), Annex XI); it is recorded under Q08.',
    },
    {
      textId: 'cn-generative-ai-interim-measures-2023',
      facetIds: ['L.Q04'],
      reason:
        'Q03 found no framework document whose publication or submission could be asked about. Article 17 algorithm filing is recorded under Q05 and Q08.',
    },
    {
      textId: 'cn-ai-content-labelling-measures-2025',
      facetIds: ['L.Q04'],
      reason:
        'Q03 found no framework document whose publication or submission could be asked about.',
    },
    {
      textId: 'us-eo-14110-2023',
      facetIds: ['L.Q04'],
      reason:
        'Q03 found no framework document whose publication or submission could be asked about.',
    },
    {
      textId: 'us-bis-ai-diffusion-ifr-2025',
      facetIds: ['L.Q04'],
      reason:
        'Q03 finds security measures but no written framework document on model risks. Records of data-centre security are to be made available to BIS on request (Supplement No. 10 to part 748, paragraph 11), and the third-party certification under paragraph 14(b) is made available to BIS.',
    },
  ],
};
