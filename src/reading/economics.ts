import type { PropositionsCollection } from '../domain/propositions';

const growthChecked = '2026-10-10';
const mainstreamChecked = '2026-10-12';
const recheckDecided = '2026-10-25';

export const economicsOfMachineIntelligence: PropositionsCollection = {
  id: 'economics-of-machine-intelligence',
  version: 2,
  title: 'Economics of machine intelligence',
  question:
    'Which located texts, from 1952 to 2026, state, contest or bear on propositions about the economics of machine intelligence? Three strands are recorded. The first is the debate over whether machine intelligence could make economic growth explosive. The second is how mainstream economics treated automation, computers and AI. The third is how economists took up recursive self-improvement, superintelligence and existential risk from AI, ideas mostly discussed outside economics. For each proposition, which text by an economist is the earliest located, and which text outside that group?',
  editorialStatus: 'machine-proposed',
  introduction:
    'Each proposition has one criterion. It is phrased generically and attributed to no one. A text that meets the criterion articulates the proposition. A text that disputes it, or a premise it depends on, contests it, and the record says whether the passage gives a reason against a premise or states the contrary only. A text that comes close bears on it, and its record names what is missing. A result from a formal model is shown with the conditions under which the model derives it. Each text carries a tier: tier 1 for scholarly work by economists and for the core economics journals and working-paper series, tier 2 for other texts. Texts are listed in date order. The page records what texts say and when. It does not assess whether an argument or a model is right.',
  groups: [
    {
      id: 'G',
      label: 'The explosive-growth debate',
      description:
        'Whether machine intelligence could make growth far faster than historical rates, the constraints argued against it, the evidence offered on both sides, and each text’s own estimate. Thirteen texts from 1994 to 2024.',
      propositionIds: [
        'explosive-growth-from-labour-substitution',
        'accelerating-growth-from-automated-research',
        'long-run-history-suggests-acceleration',
        'unautomated-tasks-bottleneck-growth',
        'other-constraints-prevent-explosive-growth',
        'no-current-sign-of-explosive-growth',
        'machine-substitution-lowers-wages',
        'modest-near-term-ai-productivity-effect',
        'explosive-growth-estimates',
      ],
    },
    {
      id: 'M',
      label: 'Mainstream economics, automation and AI',
      description:
        'How economists and economics venues treated automation, computers and AI from 1952 to 2024: as ordinary technical change, as the automation of tasks, as a general-purpose technology or as cheaper prediction, and what they said about wages, policy, measurement and the field itself. M06 is split into M06a and M06b. M09 states the prior that mainstream economics took up machine intelligence only recently; it is tested against the dated record, not confirmed.',
      propositionIds: [
        'automation-as-ordinary-technical-change',
        'ai-as-task-automation',
        'ai-general-purpose-technology-with-lag',
        'ai-as-cheaper-prediction',
        'machines-cheaper-at-every-task',
        'automation-lowers-labour-income',
        'compensating-policy-for-ai',
        'task-based-exposure-measurement',
        'ai-productivity-over-next-decade',
        'recent-economics-engagement-with-ai',
      ],
    },
    {
      id: 'E',
      label: 'Superintelligence and existential risk',
      description:
        'Whether economists took up machine intelligence that improves itself, machine intelligence beyond human level in essentially all domains and existential risk from AI, how developers’ incentives bear on safety, and what texts say about the state of economics on these questions. Texts from 1998 to 2026, mostly NBER working papers, with Robin Hanson’s texts of 1998 to 2000 and posts from his 2008 debate with Eliezer Yudkowsky. E05 counts only explicit statements about the state of economics; economists’ engagement itself is recorded under E01 to E04.',
      propositionIds: [
        'ai-improving-ai-accelerates-capability',
        'machine-intelligence-exceeds-humans-in-all-domains',
        'ai-existential-risk-in-economic-analysis',
        'ai-developer-incentives-and-safety',
        'economics-engagement-with-superintelligence',
      ],
    },
  ],
  tiers: {
    1: 'Scholarly work by economists in any venue, including their essays in magazines, and any text in a core economics venue, whoever wrote it. An economist has an economics appointment, degree, address or affiliation shown in or near the text, or an established record as an economist when the text was written. The core venues are the five leading general economics journals, the Journal of Economic Perspectives, the Journal of Economic Literature, AER Papers and Proceedings, NBER working papers and the NBER Economics of AI volume, and Kansantaloudellinen aikakauskirja for the Finnish texts.',
    2: 'Texts by non-economists, whatever the venue, and short-form commentary even by economists: blog comments, forum replies, and magazine or online debates, unless a turn is itself a substantive scholarly argument.',
  },
  searchNote: {
    scope:
      'The collection records what located texts from 1952 to 2026 say about the propositions below. “Earliest located” means the earliest text found by the searches below, within tier 1 unless the page says tier 2. It is not a claim that no earlier text exists.',
    venues: [
      {
        period: 'The explosive-growth debate, 1994 to 2024',
        items: [
          'Robin Hanson: “If Uploads Come First” (1994), “Is a Singularity Just Around the Corner?” (1998, read for this strand on 2026-10-25), his comment on Vernor Vinge’s singularity concept (1998), “Economic Growth Given Machine Intelligence” (undated, attested 2000) and “Long-Term Growth As A Sequence of Exponential Modes” (2000).',
          'William D. Nordhaus, “Are We Approaching an Economic Singularity?” (2015); Philippe Aghion, Benjamin F. Jones and Charles I. Jones, “Artificial Intelligence and Economic Growth” (2017); Philip Trammell and Anton Korinek, “Economic Growth under Transformative AI” (2020, text of 2021); Daron Acemoglu, “The Simple Macroeconomics of AI” (2024).',
          'David Roodman, “Modeling the Human Trajectory” (2020), with Holden Karnofsky’s comment on it; Tom Davidson, “Could Advanced AI Drive Explosive Economic Growth?” (2021); the Asterisk debate between Matt Clancy and Tamay Besiroglu (2023); Ege Erdil and Tamay Besiroglu’s review of the arguments (arXiv, 2023).',
          'Texts were chosen from a starting list and from the texts these cite or answer directly. Each was read in an Internet Archive capture or a dated arXiv version, retrieved on 2026-10-08 and later re-checked.',
        ],
      },
      {
        period: 'Mainstream economics, 1952 to 2024',
        items: [
          'A census of titles: every Crossref record registered under the AER, QJE, JPE, Econometrica, REStud, JEP, JEL and AEA Papers and Proceedings, and under the NBER DOI prefix, 81,884 records, matched against terms for AI, machine learning, automation and computers. Crossref coverage is uneven: AER and JEL records start in 1999 and JEP in 1987.',
          'Full texts of NBER working papers on AI and automation, four chapters of the NBER volume The Economics of Artificial Intelligence (2019), Frey and Osborne (2013), Eloundou and others (arXiv, 2023), Nilsson (AI Magazine, 1984) and Bresnahan, Brynjolfsson and Hitt (1999). Agrawal, Gans and Goldfarb’s essay in the Harvard Business Review (2016) was added on 2026-10-25.',
          'Abstract pages only for articles in the JEP, the AER and AEA Papers and Proceedings, whose full texts were refused, and the publisher’s standfirst only for Leontief’s “Machines and Man” (Scientific American, 1952).',
          'The 1955 congressional hearings on automation and technological change, the 1966 report of the National Commission on Technology, Automation, and Economic Progress with its second appendix volume, Bowen and Mangum’s 1966 condensation, and Leontief and Duchin’s 1984 report to the National Science Foundation, read in Internet Archive text layers.',
          'Texts were retrieved directly from publishers, NBER, arXiv and the Internet Archive on 2026-10-09, as current copies. An archive capture was not available, so a current copy does not authenticate earlier bytes.',
        ],
      },
      {
        period: 'The Finnish strand',
        items: [
          'Kansantaloudellinen aikakauskirja: the archive of 147 issues was crawled on 2026-10-09 and searched in Finnish and English terms for automation, computers and AI (2,854 PDFs; 32 without a text layer). Issues from 3/2023 to 3/2026 were searched through their titles and abstracts only.',
          'The crawl found 247 texts on automation, computers or AI, listed with checked quotations in the research pack (research/economics-mainstream/kak.md). They were classified by subject, not against the propositions here, so they are not records on this page.',
          'ETLA Brief 22 (Pajarinen and Rouvinen, 2014), read in its abstract, is recorded under M07.',
        ],
      },
      {
        period: 'Superintelligence and existential risk, 1998 to 2026',
        items: [
          'Robin Hanson: “Is a Singularity Just Around the Corner?” (Journal of Transhumanism, 1998), his comment on Vernor Vinge’s singularity concept (1998) and “Economic Growth Given Machine Intelligence” (undated, attested 2000), read in Internet Archive captures. Posts from his 2008 debate with Eliezer Yudkowsky and two later posts, read in the Machine Intelligence Research Institute’s compilation of 2013; the date of “AI Go Foom” was checked on the original page.',
          'The NBER working papers on AGI, transformative AI or existential risk from AI that the title census found (2018 to 2026), among them Gans (2018, 2023), Jones (2023, 2025), Korinek and Suh (2024), and the October 2023 version and April 2026 revision of Trammell and Korinek, whose wording differs. Five papers of 2025 and 2026, whose full texts were refused (HTTP 403), and Jones’s article in AER: Insights (2024) were read as abstract pages only.',
          'Texts already in the collection, re-read for these propositions: Sachs and Kotlikoff (2012), Nordhaus (2015), Aghion, Jones and Jones (2017), Korinek and Stiglitz (2017), the introduction and Tyler Cowen’s chapter of the NBER volume (2019) and Acemoglu (2024). Ari Hyytinen’s editorial in Kansantaloudellinen aikakauskirja (4/2017).',
          'The title census of the mainstream strand, extended to AER: Insights, was searched for terms such as superintelligence, singularity, intelligence explosion, AGI, existential risk and takeoff, and the Finnish texts for their Finnish equivalents. Texts were retrieved on 2026-10-09 and 2026-10-11 and, except the Internet Archive captures, retrieved again on 2026-10-15 and 2026-10-16.',
        ],
      },
    ],
    methods: [
      'Machine searches read each text proposition by proposition: abstracts, introductions, conclusions and objection sections in full, and long texts by targeted search.',
      'Every quotation was compared by script with the checked copy of its text, after normalising spacing, quotation marks, dashes and line-break hyphenation. Quotations are at most 50 words, and the quoted words from one document stay within 400, or about a tenth of a short text.',
      'Each text is dated by its own date line, cover or title page. Where the quoted wording is known only from a later copy, such as an archive capture or a revision of a working paper, the record also gives the date from which that wording is attested, and that date decides which text is earliest located. A journal year never dates a working paper’s wording.',
      'Tiers follow the maintainer’s rule of 2026-10-11, with an author’s standing as an economist judged when the text was written (2026-10-12). Each record gives the basis of its tier.',
      'A passage engages a premise when its section, dialogue turn or message gives a reason against that premise. Otherwise it is recorded as stating the contrary.',
      'Results from formal models are recorded with their conditions. Model scenarios counted as articulating M05 are labelled as such and shown only with their context (maintainer decision of 2026-10-11). Estimates under G09 are recorded one per text and holder, as worded, and are never converted to a common threshold.',
      `Fresh-context audits by Claude models re-read every passage. Checks by an OpenAI GPT-6 model then re-examined 49 of 65 passages of the explosive-growth strand and 62 passages and four Finnish texts of the mainstream strand. Correction passes applied their findings on ${growthChecked} and ${mainstreamChecked}; for the mainstream strand the maintainer accepted every final disagreement. No person has reviewed the records.`,
      'The records were admitted on 2026-10-14 from two research packs. One quotation was shortened to keep it within 50 words; its wording is unchanged.',
      'On 2026-10-25 a same-family fresh-context machine check re-examined every tier and every earliest located role of the first two strands, and a blind cross-family machine check re-examined 19 of its items against the recorded captures and the hearing scans. The maintainer decided their disagreements the same day: one text was re-tiered, six records were added, five earliest located roles moved and one was withheld. In that correction pass web.archive.org refused connections, so passages read only in archive captures rest on the GPT check.',
      'For the strand on superintelligence and existential risk, an OpenAI GPT-6 model checked all 119 passages blind on 2026-10-15 and found every quotation matching. Its 22 disagreements on classification were decided on the evidence the same day, and the maintainer decided on 2026-10-15 how E05 is read. The 20 passages read in Internet Archive captures could not be read again at admission, because the archive refused connections; they rest on that check, which retrieved the same captures. The strand was admitted on 2026-10-16. Three passages were held back to keep within the quotation limit for Hanson’s 1998 comment, and one quotation was shortened to 50 words with its wording unchanged.',
    ],
    gaps: [
      'I. J. Good’s 1965 chapter could not be read in either archive capture, which are truncated. Good appears only as later texts relay him.',
      'Herbert Simon’s The Shape of Automation (1965) was not retrieved. Nordhaus (2015) and Armer (1966) relay its forecast that computers could do any work a person can do, and Simon may state M05 in his own voice.',
      'The journal versions of the working papers were not compared, among them Acemoglu’s article in Economic Policy (2025), whose publisher refused requests (HTTP 403). Whether that version changes the M08 figures is unknown.',
      'A review of 1931 in the Journal of Political Economy whose title names robots could not be retrieved (HTTP 403), so what “robots” means in it is unknown.',
      'Roodman’s technical paper behind his 2020 post was not retrieved. Davidson’s report and its appendices were searched, not read in full.',
      'Hanson’s 1994 essay was read in a web reprint captured in 1998. The printed issue of Extropy, which the dataset holds as a scan, was not compared with the quoted wording.',
      'Full texts of JEP, AER and AEA Papers and Proceedings articles, of JSTOR and of Google Books were not reachable. The AER and the JEL before 1999 were not covered at title level. OpenAlex, the IMF and the OECD were not searched.',
      'Books, podcasts, social media and comment threads were not searched, apart from one comment recorded under G03 and G09. The non-English literature was searched only in Kansantaloudellinen aikakauskirja and one ETLA search.',
      'A text found later that is earlier than an earliest located text, or written by an economist, would change the headlines. Twenty-one texts not retrieved are listed as leads in the research pack, among them Simon (1965) and Kai Husso’s 1992 chapter on the diffusion of AI in Finland.',
      'G09 has no earliest located tier-1 text for now (maintainer decision of 2026-10-25). Hanson’s “Long-Term Growth As A Sequence of Exponential Modes” (December 2000; first version September 1998), already recorded under G09, is an unchecked lead for the role: its attested wording and its link to machine intelligence have not been compared for this purpose, and the 1998 first version was not retrieved.',
      'For M05, Hanson’s “Economic Growth Given Machine Intelligence” models machines doing most jobs but says: “We have not, however, considered the possibility of creating new kinds of jobs” (p. 12), so it does not meet M05’s condition on tasks created later. Leontief’s “The Distribution of Work and Income” (Scientific American, 1982), which that paper cites, is an open lead; its text could not be retrieved.',
      'Institutional forecasts, such as those of Goldman Sachs (2023) and the McKinsey Global Institute (2023), both cited by Acemoglu (2024), give earlier ten-year estimates that would bear on M08. They are outside the collection’s scope until a rule for selecting institutional sources exists (maintainer decision of 2026-10-25).',
      'G06 has no tier-1 articulating text under its literal wording. Nordhaus (2015) reports two positive tests of seven and concludes that the singularity is not near, so his record bears on G06. Rewording the criterion is an open decision.',
      'M09’s tier-1 articulating record is a self-description of 2019. It must be read with the dated record from 1952 onward, which runs against a plain reading that economics took up the subject only recently.',
      'E05’s earliest located tier-1 text is Nordhaus (2015), a statement about the state of the field. It must be read with the records under E01 to E04, which show economists engaging with these ideas from 1998.',
      'For the strand on superintelligence and existential risk, books were not searched, among them Hanson’s The Age of Em (2016) and Cowen’s Average Is Over (2013), nor Hanson’s article in IEEE Spectrum (2008), economics blogs beyond the compiled debate, or journals outside the title census. Puhakka’s editorial in Kansantaloudellinen aikakauskirja 3/2024 was not read.',
    ],
    corrections:
      'A text found later that is earlier than the earliest located text becomes the new earliest located text. The earlier headline stays on record as a correction.',
  },
  corrections: [
    {
      propositionId: 'explosive-growth-from-labour-substitution',
      replaced:
        'Erdil and Besiroglu’s review (2023), headlined as the earliest located tier-2 text.',
      reason:
        'Re-tiered as tier 1 after the re-checks of 2026-10-25: Besiroglu held an economics degree before the text. Davidson’s report (2021), whose toy scenario of AI robots substituting for all human labour meets the criterion, is now the tier-2 earliest.',
      claimIds: [
        'ec-g01-erdil-besiroglu-2023-explosive-growth-review-a',
        'ec-g01-davidson-2021-explosive-economic-growth-a',
      ],
      recordedAt: recheckDecided,
    },
    {
      propositionId: 'long-run-history-suggests-acceleration',
      replaced:
        'Hanson’s undated “Economic Growth Given Machine Intelligence” (attested 2000-08-19), headlined as earliest located from 2026-10-10.',
      reason:
        'Earlier text found by the re-checks of 2026-10-25: Hanson’s “Is a Singularity Just Around the Corner?” (June 1998, attested 1999-01-28) makes the inference itself; the 2000 paper relays his own 1998 projection.',
      claimIds: [
        'ec-g03-hanson-economic-growth-given-machine-intelligence-a',
        'ec-g03-hanson-1998-is-a-singularity-just-around-the-corner-a',
      ],
      recordedAt: recheckDecided,
    },
    {
      propositionId: 'explosive-growth-estimates',
      replaced:
        'Hanson’s undated “Economic Growth Given Machine Intelligence” (attested 2000-08-19), headlined as earliest located from 2026-10-10.',
      reason:
        'Removed after the re-checks of 2026-10-25: the passage relays the author’s separate, self-cited projection, not an estimate the text makes itself. No tier-1 text holds the headline until the lead named under “How we searched” is checked (maintainer decision of 2026-10-25).',
      claimIds: ['ec-g09-hanson-economic-growth-given-machine-intelligence-a'],
      recordedAt: recheckDecided,
    },
    {
      propositionId: 'ai-as-cheaper-prediction',
      replaced:
        'Agrawal, Gans and Goldfarb’s working paper (January 2018), headlined as earliest located.',
      reason:
        'Earlier text found by the re-checks of 2026-10-25: the same authors’ essay in the Harvard Business Review (17 November 2016, attested 2016-11-25), an economists’ magazine essay and so tier 1.',
      claimIds: [
        'ec-m04-agrawal-gans-goldfarb-2018-prediction-judgment-complexity-a',
        'ec-m04-agrawal-gans-goldfarb-2016-simple-economics-of-machine-intelligence-a',
      ],
      recordedAt: recheckDecided,
    },
    {
      propositionId: 'automation-lowers-labour-income',
      replaced:
        'The report of the National Commission on Technology, Automation, and Economic Progress (1966), headlined as the earliest located tier-2 text.',
      reason:
        'Earlier text found by the re-checks of 2026-10-25: the condensation of Diebold’s book Automation printed with his statement of 14 October 1955 in the congressional hearings.',
      claimIds: [
        'ec-m06a-technology-and-the-american-economy-1966-a',
        'ec-m06a-diebold-1955-automation-condensation-a',
      ],
      recordedAt: recheckDecided,
    },
    {
      propositionId: 'compensating-policy-for-ai',
      replaced:
        'The report of the National Commission on Technology, Automation, and Economic Progress (1966), headlined as the earliest located tier-2 text.',
      reason:
        'Earlier texts found by the re-checks of 2026-10-25 in the 1955 congressional hearings: the Diebold condensation of 14 October, on management’s share of responsibility for retraining and restoring the earning power of displaced workers, which counts as another compensating policy as the criterion is written, and Reuther’s statement of 17 October.',
      claimIds: [
        'ec-m06b-technology-and-the-american-economy-1966-a',
        'ec-m06b-diebold-1955-automation-condensation-a',
        'ec-m06b-reuther-1955-automation-hearings-statement-a',
      ],
      recordedAt: recheckDecided,
    },
    {
      propositionId: 'long-run-history-suggests-acceleration',
      replaced:
        'Hanson’s “Long-Term Growth As A Sequence of Exponential Modes” (2000), headlined as earliest located in the first pass.',
      reason:
        'Earlier text found by the audit: Hanson’s undated “Economic Growth Given Machine Intelligence”, attested 2000-08-19.',
      claimIds: [
        'ec-g03-hanson-2000-long-term-growth-exponential-modes-a',
        'ec-g03-hanson-economic-growth-given-machine-intelligence-a',
      ],
      recordedAt: growthChecked,
    },
    {
      propositionId: 'explosive-growth-estimates',
      replaced:
        'Hanson’s “Long-Term Growth As A Sequence of Exponential Modes” (2000), headlined as earliest located in the first pass.',
      reason:
        'Earlier text found by the audit: Hanson’s undated “Economic Growth Given Machine Intelligence”, attested 2000-08-19.',
      claimIds: [
        'ec-g09-hanson-2000-long-term-growth-exponential-modes-a',
        'ec-g09-hanson-economic-growth-given-machine-intelligence-a',
      ],
      recordedAt: growthChecked,
    },
    {
      propositionId: 'other-constraints-prevent-explosive-growth',
      replaced:
        'Davidson’s report (2021), headlined as the earliest located text that contests it in the first pass.',
      reason:
        'Earlier text found by the audit: Nordhaus (2015) answers the physical-limits objection. Davidson’s report is tier 2 and is now the tier-2 earliest.',
      claimIds: [
        'ec-g05-davidson-2021-explosive-economic-growth-c',
        'ec-g05-nordhaus-2015-economic-singularity-c',
      ],
      recordedAt: growthChecked,
    },
    {
      propositionId: 'accelerating-growth-from-automated-research',
      replaced:
        'Hanson’s comment on Vinge (1998), headlined as the earliest located text that contests it before texts were sorted into tiers.',
      reason:
        'Short-form commentary is tier 2 under the rule of 2026-10-11, so it is now the tier-2 earliest. Aghion, Jones and Jones (2017) is the earliest located tier-1 text that contests it.',
      claimIds: [
        'ec-g02-hanson-1998-some-skepticism-c',
        'ec-g02-aghion-jones-jones-2017-ai-and-economic-growth-c',
      ],
      recordedAt: '2026-10-11',
    },
    {
      propositionId: 'long-run-history-suggests-acceleration',
      replaced:
        'The Asterisk debate (2023), headlined as the earliest located text that contests it in the first pass.',
      reason:
        'Reclassified as bearing on it after the cross-family check: the same turn grants that past acceleration is a reason to think it could happen again.',
      claimIds: ['ec-g03-clancy-besiroglu-2023-great-inflection-b'],
      recordedAt: growthChecked,
    },
    {
      propositionId: 'no-current-sign-of-explosive-growth',
      replaced:
        'Nordhaus (2015), headlined as earliest located in the first pass.',
      reason:
        'Reclassified as bearing on it after the cross-family check: he reports two positive tests of seven and concludes that the singularity is not near, which is not “no sign yet”. No tier-1 text now articulates G06.',
      claimIds: [
        'ec-g06-nordhaus-2015-economic-singularity-b',
        'ec-g06-davidson-2021-explosive-economic-growth-a',
      ],
      recordedAt: growthChecked,
    },
    {
      propositionId: 'machine-substitution-lowers-wages',
      replaced:
        'Hanson’s “If Uploads Come First” (1994), headlined as the earliest located tier-1 text on 2026-10-11.',
      reason:
        'An author’s standing is judged when the text was written (2026-10-12). In 1994 he held no economics degree or appointment, so the essay is tier 2 and is now the tier-2 earliest.',
      claimIds: [
        'ec-g07-hanson-1994-if-uploads-come-first-a',
        'ec-g07-hanson-economic-growth-given-machine-intelligence-a',
      ],
      recordedAt: '2026-10-12',
    },
    {
      propositionId: 'automation-as-ordinary-technical-change',
      replaced:
        'Nourse’s statement of 1955, headlined as the earliest located text that contests it.',
      reason:
        'Reclassified as bearing on it after the cross-family check. No tier-1 text now contests M01.',
      claimIds: ['ec-m01-nourse-1955-automation-hearings-statement-b'],
      recordedAt: mainstreamChecked,
    },
    {
      propositionId: 'ai-as-task-automation',
      replaced:
        'Agrawal, Gans and Goldfarb (2019), headlined as the earliest located text that contests it.',
      reason:
        'Reclassified as bearing on it after the cross-family check. No tier-1 text now contests M02.',
      claimIds: [
        'ec-m02-agrawal-gans-goldfarb-2019-ambiguous-labor-market-impact-b',
      ],
      recordedAt: mainstreamChecked,
    },
    {
      propositionId: 'machines-cheaper-at-every-task',
      replaced: 'Nordhaus (2015), headlined as earliest located.',
      reason:
        'Reclassified as bearing on it after the cross-family check. Acemoglu and Restrepo’s working paper, dated by its checked revision of June 2017, is now earliest located, as a model scenario.',
      claimIds: [
        'ec-m05-nordhaus-2015-economic-singularity-b',
        'ec-m05-acemoglu-restrepo-2016-race-between-machine-and-man-a',
      ],
      recordedAt: mainstreamChecked,
    },
    {
      propositionId: 'recent-economics-engagement-with-ai',
      replaced: 'Nordhaus (2015), headlined as earliest located.',
      reason:
        'Reclassified as bearing on it after the cross-family check: his remark concerns the singularity in macroeconomics. The introduction to the NBER volume of 2019 is now earliest located.',
      claimIds: [
        'ec-m09-nordhaus-2015-economic-singularity-b',
        'ec-m09-agrawal-gans-goldfarb-2019-economics-of-ai-introduction-a',
      ],
      recordedAt: mainstreamChecked,
    },
  ],
  limits: [
    '“Earliest located” means the earliest text found by the searches described under “How we searched”, by economists unless the page says tier 2. It is not a claim that no earlier text exists.',
    'A record documents what a text says. It is not evidence that the proposition is true or that a model is right, and no record links one text to another.',
    'A tier records who wrote a text and in which form, judged when it was written. It is not a ranking of quality.',
    'A model result holds only under its recorded conditions. An estimate is its author’s, under the author’s definition and horizon, and estimates from different texts are not comparable without them.',
    'Each record carries the date its work is dated by. Where the quoted wording is known only from a later copy or revision, the date from which it is attested is shown, and that date decides which text is earliest located.',
    'A passage that would mislead on its own is marked “shown only with its context” and is never shown without that context.',
    'Codes such as M05-20 in qualifications refer to the passages of the research packs the records come from.',
    'A machine selected and classified these records, and machine checks from two model families re-examined them. No person has reviewed them.',
  ],
  axis: {
    from: 1950,
    to: 2026,
    ticks: ['1952', '1966', '1984', '2000', '2015', '2024'],
  },
  landing:
    '{propositions} propositions on the economics of machine intelligence, and {records} records from {texts} texts, 1952–2026, that state, contest or bear on them: the explosive-growth debate, how mainstream economics treated automation and AI, and how economists took up superintelligence and existential risk from AI. Each text carries its tier, and model results their conditions. The page can be downloaded as a research starter, with the original sources first.',
  landingAction: 'Read the economics propositions →',
  mostDevelopedEmpty: null,
  earliestEmpty: 'No located tier-1 text meets the criterion.',
};
