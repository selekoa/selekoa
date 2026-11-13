import type { PropositionsCollection } from '../domain/propositions';
import { aiAndMoneyFrame as frame } from './proposition-frames';
import { describeGroups } from './describe-groups';

/** Admitted on 2026-11-06 from the research pack of 2026-11-02 to 2026-11-04. */
const admitted = '2026-11-06';

export const aiAndMoney: PropositionsCollection = {
  id: frame.id,
  version: frame.version,
  title: frame.title,
  question: frame.question,
  editorialStatus: frame.editorialStatus,
  introduction:
    'This collection records what central banks, the Bank for International Settlements, the Financial Stability Board, the IMF, standard setters and supervisors have said about machine intelligence. Twelve propositions cover financial stability, monetary policy, payments, and supervision and central banks’ own work. Each text is labelled by whom it speaks for. An institution’s own text is the institution’s. A speech or remarks are the speaker’s, with the speaker’s office and any statement that the views are the speaker’s own. A staff paper is its authors’, and a committee report the committee’s. None of them is the institution’s policy unless the institution’s own text says so. One earliest located text is named for each proposition, whoever speaks in it. Where that text is a speech, a staff paper or a committee report, the earliest located text in an institution’s own voice is shown beside it. A list of institutional events follows the propositions: plans announced, work stated as under way and work stated as done, each dated by the text that states it. Texts are listed in date order; the order records no influence between them.',
  groups: describeGroups(frame.groups, {
    JA: 'Whether the use of AI by financial firms could make their behaviour more alike, concentrate their dependence on a few providers, add cyber, fraud and operational risk, or make their models harder to explain and supervise.',
    JB: 'Whether AI can improve forecasting and analysis at central banks, and whether AI’s effects on the economy matter for monetary policy.',
    JC: 'Whether AI agents will change how payments are made, and whether their transactions bear on tokenised money and stablecoins. No located text meets the second criterion; the texts that come close are shown as context.',
    JD: 'Whether supervisors should use AI, whether AI improves firms’ risk management, whether central banks need their own AI capacity, and whether existing financial rules broadly cover AI.',
  }),
  searchNote: {
    scope:
      'The collection records located texts dated from 1997 to 2026 by the bodies named below. “Earliest located” means the earliest text found by these searches that meets the criterion, judged by the date of its wording among texts of every voice. It is not a claim that no earlier text exists. A report of what others said, such as a summary of a workshop or of respondents to a consultation, never holds a headline. The systematic searches cover 2016 to 2026; a bounded search of the same bodies before 2016 followed. The headlines are only as good as that start date and that list of bodies, and they are weakest where the located date is close to 2016.',
    venues: [
      {
        period: '2016 to 2026, systematic',
        items: [
          'The BIS: Annual Economic Reports, working papers, FSI Insights, Irving Fisher Committee bulletins, Innovation Hub project pages and speeches by BIS management. The Basel Committee, the Financial Stability Board, the IMF, the ESRB, the EBA and EIOPA, where they state a proposition.',
          'The ECB and ECB Banking Supervision, the Bank of England with the PRA, the Bank of Finland, the Deutsche Bundesbank, the Riksbank, De Nederlandsche Bank, Norges Bank and Danmarks Nationalbank.',
          'The Federal Reserve Board, the People’s Bank of China, the Bank of Japan, the Monetary Authority of Singapore, the Hong Kong Monetary Authority and the Reserve Bank of India.',
          'Each body’s own publication search or speech index, for “artificial intelligence”, “machine learning”, “AI”, “generative AI”, “AI agents” and “agentic”, and the texts these cite.',
        ],
      },
      {
        period: 'Before 2016, bounded',
        items: [
          'Searches restricted to the same bodies’ sites, and unrestricted searches with the bodies’ names, for each proposition’s terms.',
          'Neural-network and machine-learning papers in the ECB, Bank of England, Bundesbank, Federal Reserve and Bank of Finland series; AI in BIS and Basel Committee papers on supervision; speeches of 2014 and 2015 on AI and monetary policy or financial stability.',
        ],
      },
    ],
    methods: [
      'Sources were retrieved directly by script, one request at a time, from 2026-11-02 to 2026-11-04, and again at admission on 2026-11-06. Each retrieved text is identified by its SHA-256 hash in the source record.',
      'Every quotation was matched mechanically against the retrieved text, both times. Paraphrases are labelled as such. Quotations in Chinese, Danish, Finnish, Norwegian and Swedish keep the original with a working English translation.',
      'A fresh-context audit by a Claude model re-read a sample of records. Two checks by an OpenAI model followed, each answering blind before it compared its answers with the records. The maintainer decided the disagreements on 2026-11-03 and 2026-11-04.',
      'After admission, a blind audit by an OpenAI model of a sample of admitted records (2026-11-09) led to corrections applied on 2026-11-10: the J12 headline above, a committee’s voice for the Bank of England’s Financial Stability in Focus, and three events re-filed from announced to stated as under way. The maintainer decided the held items on 2026-11-10.',
    ],
    gaps: [
      'Securities regulators enter only through IOSCO and the bodies named. Two speeches by Scott W. Bauguess of the US Securities and Exchange Commission (21 October 2016 and 21 June 2017), on the SEC’s use of machine learning in supervision, are not recorded.',
      'Central banks outside the named list are not recorded: a Czech National Bank working paper of December 2005 and a Bank of Canada working paper of January 1999, both on neural-network forecasting, are known and not recorded.',
      'BaFin’s report “Big data meets artificial intelligence” (July 2018) is not recorded, since BaFin alone is not among the bodies named; its joint paper of 2021 with the Bundesbank is recorded.',
      'The Bank of England’s “One Bank Research Agenda” (February 2015), whose Theme 4 describes machine-learning analysis of text, is recorded on J05 from 2026-11-07, as its earliest located institutional text. It was read by a model of another family in an archive capture of March 2015, the only copy found; its record paraphrases that reading. The Bundesbank’s discussion paper of November 2020 was not read.',
      'Not read: an IMF speech of 6 June 2024 and two IOSCO reports (the sites refused retrieval), two speeches by Fan Yifei of the People’s Bank of China (2020, 2021) and the record page of the Bank’s standard for evaluating AI algorithms.',
      'Industry papers convened by the Monetary Authority of Singapore (MindForge 2024, SAFR 2026), which the authority labels industry-led, are not recorded.',
      'The archives were not searched year by year in full text. Press reports, interviews, video without a transcript and social media were used for discovery only. A search that finds nothing does not show that nothing exists.',
    ],
    corrections:
      'A text found later that is earlier than an earliest located text becomes the new earliest located text, and the earlier headline stays on record as a correction.',
  },
  corrections: [
    {
      propositionId: 'ai-improves-nowcasting-policy-analysis',
      replaced:
        'Chakraborty and Joseph, Bank of England Staff Working Paper No. 674 (September 2017), headlined as earliest located by the research pack of 2026-11-02.',
      reason:
        'Earlier text found before admission, in the bounded search before 2016: McNelis and McAdam, ECB Working Paper No. 352 (April 2004).',
      claimIds: [
        'am-u05-boe-2017-swp674-ml-central-banks',
        'am-u05-ecb-wp-352',
      ],
      recordedAt: admitted,
    },
    {
      propositionId: 'ai-matters-for-monetary-policy',
      replaced:
        'Carney, Whitaker Lecture (14 September 2018), headlined as earliest located by the research pack of 2026-11-02.',
      reason:
        'Earlier text found before admission by a check of another model family: Haldane, “Labour’s Share”, a speech of 12 November 2015.',
      claimIds: [
        'am-u06-boe-2018-carney-future-of-work',
        'am-u06-boe-2015-haldane-labours-share',
      ],
      recordedAt: admitted,
    },
    {
      propositionId: 'ai-agents-change-payments',
      replaced:
        'Waller, a speech at Sibos (29 September 2025), headlined as earliest located by the research pack of 2026-11-02.',
      reason:
        'On a check of another model family, the speech names AI agents executing tasks, not payments or transactions, and is recorded as context; a report of workshop participants’ ideas cannot hold the headline. BIS Working Paper No. 1310 (10 November 2025) is earliest located.',
      claimIds: ['am-u07-frb-2025-waller-sibos-context', 'am-u07-bis-wp-1310'],
      recordedAt: admitted,
    },
    {
      propositionId: 'supervisors-should-use-ai',
      replaced:
        'The FSB report on the financial stability implications of FinTech (27 June 2017), headlined as earliest located by the research pack of 2026-11-02.',
      reason:
        'Earlier text found before admission, in the bounded search before 2016: Sahajwala and Van den Bergh, Basel Committee Working Paper No. 4 (December 2000), whose “artificial intelligence” is expert-system software. The FSB report stays the earliest located institutional text and the earliest located use of “SupTech”.',
      claimIds: [
        'am-u09-fsb-2017-fintech-fs',
        'am-u09-bcbs-2000-wp4-early-warning',
      ],
      recordedAt: admitted,
    },
    {
      propositionId: 'existing-frameworks-cover-ai',
      replaced:
        'Brainard, “What Are We Learning about Artificial Intelligence in Financial Services?”, a speech of 13 November 2018, headlined as earliest located at admission on 2026-11-06.',
      reason:
        'A blind audit by a model of another family, adjudicated on 2026-11-09, read the speech as a starting point: it calls existing guardrails “a good place to start” while the approach to AI is assessed, and does not state that existing rules broadly apply. Re-filed as context; Proudman, “Managing Machines: the governance of artificial intelligence”, a speech of 4 June 2019, is earliest located.',
      claimIds: [
        'am-u12-frb-2018-brainard-ai',
        'am-u12-boe-2019-proudman-managing-machines',
      ],
      recordedAt: '2026-11-10',
    },
  ],
  limits: [
    '“Earliest located” means the earliest text found by the searches described under “How we searched”. It is not a claim that no earlier text exists.',
    'A record documents what a text says, in its voice. It is not evidence that a risk has materialised, that a policy was adopted, or that the proposition is true.',
    'A speech, a staff paper or a committee report is not the institution’s position unless the institution’s own text says so.',
    'An event records what a text states about an authority’s own work. Announced stays announced, and work stated as under way is not shown as done.',
    'A machine selected and classified these records, and machine checks from two model families re-examined them.',
  ],
  axis: frame.axis,
  landing: frame.landing,
  landingAction: frame.landingAction,
  mostDevelopedEmpty: frame.mostDevelopedEmpty,
  earliestEmpty: frame.earliestEmpty,
  events: [
    { claimId: 'am-event-fsb-2017-ai-ml-monitoring', stage: 'under-way' },
    { claimId: 'am-event-mas-2018-feat-principles', stage: 'stated-done' },
    { claimId: 'am-event-pbc-2019-fintech-plan', stage: 'stated-done' },
    { claimId: 'am-event-ecb-2021-suptech-team', stage: 'stated-done' },
    {
      claimId: 'am-event-pbc-2021-fintech-plan-2022-2025',
      stage: 'stated-done',
    },
    { claimId: 'am-event-bcbs-2022-aiml-continued-work', stage: 'announced' },
    {
      claimId: 'am-event-pbc-2022-ai-algorithm-evaluation-standard',
      stage: 'stated-done',
    },
    { claimId: 'am-event-eba-2023-ml-irb-monitoring', stage: 'announced' },
    {
      claimId: 'am-event-bisih-2023-aurora-phase1-concluded',
      stage: 'stated-done',
    },
    {
      claimId: 'am-event-bisih-2024-gaia-proof-of-concept',
      stage: 'stated-done',
    },
    { claimId: 'am-event-bisih-2024-raven-launched', stage: 'stated-done' },
    { claimId: 'am-event-bisih-2024-eight-ai-projects', stage: 'stated-done' },
    { claimId: 'am-event-ecb-2024-ai-action-plan', stage: 'stated-done' },
    { claimId: 'am-event-boe-2024-ai-consortium', stage: 'under-way' },
    { claimId: 'am-event-frb-2024-ai-program', stage: 'stated-done' },
    { claimId: 'am-event-fsb-2024-ai-report-update', stage: 'under-way' },
    { claimId: 'am-event-rb-2025-ai-policy', stage: 'stated-done' },
    { claimId: 'am-event-bisih-2025-aurora-new-phase', stage: 'under-way' },
    { claimId: 'am-event-eiopa-2025-ai-opinion', stage: 'stated-done' },
    { claimId: 'am-event-rbi-2025-free-ai-report', stage: 'stated-done' },
    { claimId: 'am-event-boe-2025-internal-ai-strategy', stage: 'stated-done' },
    { claimId: 'am-event-bof-2025-data-ai-priority', stage: 'stated-done' },
    { claimId: 'am-event-bisih-2026-spectrum', stage: 'stated-done' },
    { claimId: 'am-event-ecb-2026-ai-research-lab', stage: 'under-way' },
    {
      claimId: 'am-event-ecb-2026-digitalisation-programme',
      stage: 'stated-done',
    },
    { claimId: 'am-event-bisih-2026-aise', stage: 'stated-done' },
    { claimId: 'am-event-fsb-2026-frontier-ai-cyber-work', stage: 'under-way' },
    {
      claimId: 'am-event-mas-2026-ai-risk-management-guidelines',
      stage: 'stated-done',
    },
    { claimId: 'am-event-fsb-2026-ai-sound-practices', stage: 'stated-done' },
    { claimId: 'am-event-hkma-2026-project-sage', stage: 'stated-done' },
    {
      claimId: 'am-event-ecb-2026-innovation-platform-ai-payments',
      stage: 'announced',
    },
  ],
};
