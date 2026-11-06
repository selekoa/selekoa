import type { PropositionsCollection } from '../domain/propositions';
import { superintelligenceFrame as frame } from './proposition-frames';
import { describeGroups } from './describe-groups';

/** The maintainer's decisions of 2026-11-02 on the earliest-located re-check (decisions 1 to 4). */
const recheckDecisions = '2026-11-02';

/** The interim withdrawal of 2026-11-02: headlines the cross-family re-check marks move or undecidable. */
const recheckWithdrawn = '2026-11-02';

/** The maintainer's decision on the pre-launch audit (PA-01, PA-02). */
const withdrawn = '2026-11-02';

/** The admission of the antecedent-texts collection, with the maintainer's decision 5a. */
const antecedents = '2026-11-04';

const found = '2026-10-06';
const candidates = 'the 1996–2022 candidate search';

export const superintelligencePropositions: PropositionsCollection = {
  id: frame.id,
  version: frame.version,
  title: frame.title,
  question: frame.question,
  editorialStatus: frame.editorialStatus,
  introduction:
    'Each proposition has one criterion. A text that meets it articulates the proposition. A text that disputes it, or a premise it depends on, contests it. A text that comes close bears on it, and its record names what is missing. Every record links to the passage it rests on and gives the text’s register: fiction, satire, a dream frame or a relay of another author is labelled. Texts are listed in date order. The order records no influence between them.',
  groups: describeGroups(frame.groups, {
    A: 'Propositions that machine intelligence could rise, or be raced towards, much faster than earlier technological change.',
    B: 'Propositions that what people can observe of a capable system, or their means of directing it, may stop being adequate as the system becomes more capable.',
    C: 'Three propositions kept apart from B5, B2 and A6, whose criteria are narrower. They were looked for only before mid-1996.',
  }),
  searchNote: {
    scope:
      'The collection records what located texts from 1863 to 2022 say about the propositions below; texts to 2025 on two of them (A4 and B1) come from the collection on catastrophic risk, which shares them. One earlier text, Descartes’s Discours de la méthode (1637), is recorded on C1 as context. “Earliest located” means the earliest text found by the searches below. It is not a claim that no earlier text exists.',
    venues: [
      {
        period: '1863 to mid-1996',
        items: [
          'Samuel Butler’s letters in The Press, Christchurch (1863, 1865), read in archived Papers Past pages; the 1863 letter was compared with column images.',
          'Erewhon: the 1872 printing in Internet Archive page images, and the revised text of 1901 in the Project Gutenberg transcription.',
          'Alan Turing’s typescripts in the King’s College archive (1947–1951) and Turing’s 1950 paper in Mind.',
          'Norbert Wiener’s 1960 article in Science and the indexed abstract of Arthur Samuel’s reply.',
          'I. J. Good’s 1965 chapter in two public scans; the Dartmouth proposal (1955), Marvin Minsky (1961), Donald Michie (1968, read in the 1986 reprint) and Ray Solomonoff (1985, read in the author’s later typesetting).',
          'Vernor Vinge’s 1983 Omni column and 1993 NASA proceedings paper; Hans Moravec (1979, 1989); K. Eric Drexler’s Engines of Creation (1986, read in the 1997 web edition) and 1995 forecast.',
          'Extropy magazine, issues 7–16 (1991–1996): selected articles.',
          'Usenet: ten bundles of the Carnegie Mellon comp.ai and comp.ai.philosophy archives (3,901 files) and one relayed sci.nanotech post.',
        ],
      },
      {
        period: 'Antecedent texts, 1637 to 1951',
        items: [
          'The searches for the collection of antecedent texts (2026-11-02 to 2026-11-04) read Descartes’s Discours de la méthode in page images of the 1637 edition, Jefferson’s Lister Oration in the British Medical Journal of 25 June 1949, Turing’s lecture of about 1951 and Čapek’s R.U.R. in its English version (1923). Their records on B6, C1 and C3 are shown here, with Wiener’s Cybernetics (1948, wording attested 2019) on C3. Descartes’s text is shown on C1 as context; it is the only text here before 1863.',
        ],
      },
      {
        period: 'mid-1996 to 2022',
        items: [
          'The Extropians mailing list from 1996-07-25: all subject lines to 2002-02 screened, and 1,854 matching messages of 1996–2000 searched in full, with 28 more found by following threads.',
          'The SL4 mailing list, 2000–2012: subjects screened in all 142 monthly indexes, and 647 matching messages searched.',
          'Eliezer Yudkowsky’s early web pages, through Internet Archive captures.',
          'Publications of the Singularity Institute and MIRI, mostly in later reprints, with the 2001 web editions compared where they are cited.',
          'The 2008 Hanson–Yudkowsky debate on Overcoming Bias.',
          'LessWrong and the Alignment Forum: selected posts with their first stored versions, and seven topic tags listed by date.',
          'Arbital pages, read through a third-party viewer.',
          'Personal sites of Robin Hanson, Nick Bostrom, Paul Christiano and Bill Hibbard, Ajeya Cotra’s guest post on Cold Takes, and two formally published papers.',
        ],
      },
    ],
    methods: [
      'Sources were retrieved directly by script, one request at a time, using archive captures where the original page is gone.',
      'Every quotation was compared with the retrieved text, or with page images where a scan has no text layer or its OCR is unreliable.',
      'Internet Archive full-text screens looked for selected wordings before the earliest located texts. Each screen read the first 20 hits and finds only the phrasings searched.',
      'Each record gives the date its work is dated by. Where the quoted wording survives only in a later copy, the record also gives the date from which that wording is attested, and that date decides which text is earliest located.',
      'Two separate machine checks re-examined the candidate records, one by an OpenAI GPT-6 model for 1996–2022 and one by a Claude Opus 5.5 model for the earlier texts. A third, by an OpenAI GPT-6 model, re-read every earliest located record in its sources. Their corrections are applied.',
      'The third check verified the article text of Butler’s 1863 letter but could not retrieve the column images (HTTP 403), so it did not recheck the printed wording.',
    ],
    gaps: [
      'The Extropians list before 1996-07-25, from 1991, is not in the public archive used and was not searched.',
      'HathiTrust full-text search and the Google Books API refused scripted requests on 2026-10-06 (HTTP 403 and 429), so neither library was searched.',
      'Good’s 1965 chapter cites three earlier texts by Good for the explosion argument: a 1951 review of a book by D. R. Hartree, an IBM report of 1959 (RC-115) and “The social implications of artificial intelligence” (The Scientist Speculates, 1962–63). None was retrieved, nor were Good’s talks and drafts of 1962–64.',
      'The search before 1863 used Butler’s own wording, so it could not find earlier statements in other words. The searches for the antecedent texts later found Descartes’s Discours de la méthode (1637) on C1, recorded as context.',
      'Google Groups refused requests (HTTP 429), and Usenet beyond the ten Carnegie Mellon bundles was not searched.',
      'LessWrong and the Alignment Forum were not searched in full text; comments and linked posts were not read.',
      'Bostrom’s Superintelligence (2014), which later texts credit for the term “treacherous turn”, was not read in a legally accessible copy. Christiano’s ai-alignment.com posts (2016–2018) were not searched.',
      'Moravec’s Mind Children (1988) and the 1986 printing of Engines of Creation were not obtained.',
      'Many texts survive only in later versions: reprints marked as changed, archive captures and posts edited after posting. Each record names the version checked.',
      'B6 and C1–C3 were looked for only before mid-1996, so no most-developed text is named for them.',
      'Fiction was not surveyed. Erewhon is the only novel recorded; Čapek’s play R.U.R. (English version, 1923) is recorded on B6 from the searches for the antecedent texts.',
    ],
    corrections:
      'A text found later that is earlier than the earliest located text becomes the new earliest located text. The earlier headline stays on record as a correction.',
  },
  corrections: [
    {
      propositionId: 'intelligence-explosion',
      replaced: `Clemmensen’s Extropians message of 1996-08-30, headlined as earliest located by ${candidates}.`,
      reason:
        'Earlier text found: Good’s chapter of 1965, located by the pre-1996 candidate search.',
      claimIds: ['ts-a1-clemmensen-1996-08-30', 'ts-a1-good-1965'],
      recordedAt: found,
    },
    {
      propositionId: 'intelligence-explosion',
      replaced: `Burkhead’s Extropians message of 1996-08-10, a relay of Good, headlined as earliest located by ${candidates}.`,
      reason: 'Earlier text found: Good’s chapter of 1965 itself.',
      claimIds: ['ts-a1-burkhead-1996', 'ts-a1-good-1965'],
      recordedAt: found,
    },
    {
      propositionId: 'intelligence-explosion',
      replaced: `More’s comment of 1998 on Vinge, headlined as the earliest located use of “intelligence explosion” by ${candidates}.`,
      reason:
        'Its wording is attested only from 2000-08-17, and Good’s chapter of 1965 uses the name.',
      claimIds: ['ts-a1-more-1998-contests', 'ts-a1-good-1965'],
      recordedAt: found,
    },
    {
      propositionId: 'seed-ai',
      replaced: `Coding a Transhuman AI (1998), headlined as earliest located by ${candidates}.`,
      reason:
        'Its wording is attested only from 2001-01-26. Yudkowsky’s Extropians message of 1998-09-07 describes a seed AI in dated words.',
      claimIds: ['ts-a2-catai', 'ts-a2-yudkowsky-1998-09-07-2209'],
      recordedAt: found,
    },
    {
      propositionId: 'recursive-self-improvement',
      replaced: `Clemmensen’s Extropians message of 1996-08-30, headlined as earliest located by ${candidates}.`,
      reason:
        'Reclassified as context: it asserts positive feedback but not that the system improves its own capacity to improve. Clemmensen’s message of 1996-09-03 states the feedback.',
      claimIds: [
        'ts-a3-clemmensen-1996-08-30-context',
        'ts-a3-clemmensen-1996-09-03',
      ],
      recordedAt: found,
    },
    {
      propositionId: 'fast-or-hard-takeoff',
      replaced: `Clemmensen’s Extropians message of 1996-09-07, headlined as earliest located by ${candidates}.`,
      reason:
        'Earlier texts found: Clemmensen’s own message of 1996-09-04 and, before both, Vinge’s paper of 1993.',
      claimIds: [
        'ts-a4-clemmensen-1996-09-07',
        'ts-a4-clemmensen-1996-09-04',
        'ts-a4-vinge-1993',
      ],
      recordedAt: found,
    },
    {
      propositionId: 'fast-or-hard-takeoff',
      replaced: `Bostrom’s Extropians message of 1996-09-04, headlined as earliest located by ${candidates}.`,
      reason:
        'Reclassified as context: the rapid scenario gives no period and names no hard or fast takeoff.',
      claimIds: ['ts-a4-bostrom-1996-09-04-context', 'ts-a4-vinge-1993'],
      recordedAt: found,
    },
    {
      propositionId: 'ai-automated-ai-research',
      replaced: `Staring into the Singularity, headlined as earliest located by ${candidates}.`,
      reason:
        'Its wording is attested only from 2000-12-04. Earlier texts found: Bostrom’s message of 1996-09-04 and Good’s chapter of 1965.',
      claimIds: ['ts-a5-sits', 'ts-a5-bostrom-1996-09-04', 'ts-a5-good-1965'],
      recordedAt: found,
    },
    {
      propositionId: 'ai-automated-ai-research',
      replaced: `Burkhead’s Extropians message of 1996-08-10, a relay of Good, headlined as earliest located by ${candidates}.`,
      reason: 'Earlier text found: Good’s chapter of 1965 itself.',
      claimIds: ['ts-a5-burkhead-1996', 'ts-a5-good-1965'],
      recordedAt: found,
    },
    {
      propositionId: 'race-compression',
      replaced: `Bostrom’s Extropians message of 1996-09-04 and den Otter’s of 1998-06-23, each headlined as earliest located for one branch of the criterion by ${candidates}.`,
      reason: 'Earlier text found: Vinge’s paper of 1993.',
      claimIds: [
        'ts-a6-bostrom-1996-09-04',
        'ts-a6-denotter-1998',
        'ts-a6-vinge-1993',
      ],
      recordedAt: found,
    },
    {
      propositionId: 'treacherous-turn',
      replaced: `Yudkowsky’s Extropians message of 1996-12-31, headlined as earliest located by ${candidates}.`,
      reason:
        'Reclassified as context: it states persuasive lying to gain release, not a later change of behaviour. Creating Friendly AI (2001) is now earliest located.',
      claimIds: ['ts-b1-yudkowsky-1996-12-31-5142-context', 'ts-b1-cfai'],
      recordedAt: found,
    },
    {
      propositionId: 'treacherous-turn',
      replaced: `Grace’s summary of 2014-11-25, headlined as the earliest located defining use of “treacherous turn” by ${candidates}.`,
      reason:
        'The same reading group’s schedule of 2014-08-31 uses the name as a session title. A comment of 2014-07-29 links a title with the name; comments were not searched.',
      claimIds: [
        'ts-b1-grace-2014-treacherous-turn',
        'ts-b1-grace-2014-schedule-context',
      ],
      recordedAt: found,
    },
    {
      propositionId: 'strategic-concealment',
      replaced: `Bostrom’s Extropians message of 1996-09-03, headlined as earliest located by ${candidates}.`,
      reason: 'Earlier text found: Vinge’s paper of 1993.',
      claimIds: ['ts-b2-bostrom-1996-09-03', 'ts-b2-vinge-1993'],
      recordedAt: found,
    },
    {
      propositionId: 'observed-behaviour-as-evidence',
      replaced: `Bostrom’s Extropians message of 1996-09-03, headlined as earliest located by ${candidates}.`,
      reason:
        'Reclassified as context: it discusses apparent decency in deployment without saying that behaviour under evaluation fails to carry over.',
      claimIds: [
        'ts-b5-bostrom-1996-09-03-context',
        'ts-b5-yudkowsky-1996-12-31-5142',
      ],
      recordedAt: found,
    },
    {
      propositionId: 'observed-behaviour-as-evidence',
      replaced: `Yudkowsky’s chapter on AI and global risk (2008), headlined as earliest located by ${candidates}.`,
      reason:
        'Earlier text found: Yudkowsky’s Extropians message of 1996-12-31. The chapter’s wording is dated by its draft of 2006-02-05.',
      claimIds: ['ts-b5-aipnfgr', 'ts-b5-yudkowsky-1996-12-31-5142'],
      recordedAt: found,
    },
    {
      propositionId: 'deceptive-alignment',
      replaced: `Christiano’s post of 2018-05-05, headlined as earliest located by ${candidates}.`,
      reason:
        'Reclassified as context by the check of the earliest located records: it describes good prediction under selection, not a learned system behaving as aligned during training. Christiano’s post of 2019-03-17 is now earliest located.',
      claimIds: ['ts-b3-christiano-2018-daemons', 'ts-b3-christiano-2019-wflf'],
      recordedAt: found,
    },
    {
      propositionId: 'treacherous-turn',
      replaced:
        'Grace’s page of 31 August 2014, headlined as the earliest located use of the name (“treacherous turn”).',
      reason:
        'Withdrawn on 2026-11-02 by the maintainer’s decision on the pre-launch audit (addition to decision 1), after the cross-family re-check flagged it; no record holds the headline meanwhile. The re-check could not order Grace’s page, whose schedule wording is not dated by its stored posting date, against Danaher’s post of 2014 and the book of July 2014 (undecidable).',
      claimIds: ['ts-b1-grace-2014-schedule-context'],
      recordedAt: withdrawn,
    },
    {
      propositionId: 'behavioural-tests-as-evidence',
      replaced:
        'Michie, Computer—servant or master (1968), headlined as earliest located.',
      reason:
        'Withdrawn on 2026-11-02 by the maintainer’s decision to withdraw every headline the cross-family re-check proposes to move or could not decide, pending adjudication; no record holds the headline meanwhile. The re-check proposes an earlier text the dataset holds: Weizenbaum’s held January 1966 journal article explicitly describes the illusion of being understood in ELIZA conversation. Its printed wording predates both Michie’s attributed 1968 publication and the inspected 1986 reprint.',
      claimIds: ['ts-c1-michie-1968'],
      recordedAt: recheckWithdrawn,
    },
    {
      propositionId: 'recursive-self-improvement',
      replaced:
        'Clemmensen, Extropians message of 1996-09-03, headlined as earliest located.',
      reason:
        'Withdrawn on 2026-11-02 by the maintainer’s decision to withdraw every headline the cross-family re-check proposes to move or could not decide, pending adjudication; no record holds the headline meanwhile. The re-check proposes an earlier text the dataset holds: Good’s same-machine equipment alternative, read together with its machine-design intelligence feedback, meets the criterion independently of his better-successor scenario. Both candidate publication years, 1965 and 1966, precede the September 1996 posting. McCarthy’s 1959 improving-mechanism wording is also relevant but the held retyped copy is not a verified 1959 textual witness.',
      claimIds: ['ts-a3-clemmensen-1996-09-03'],
      recordedAt: recheckWithdrawn,
    },
    {
      propositionId: 'behavioural-tests-as-evidence',
      replaced:
        'No earliest located headline: under re-check from 2026-11-02. Before that, Michie’s essay of 1968 (wording attested in the reprint of 1986) was headlined.',
      reason:
        'Moved on 2026-11-02 to Weizenbaum’s ELIZA article (January 1966), read in a scan of the printed pages, by the maintainer’s decision on the cross-family re-check (role 34). The text meets the criterion and is dated before Michie’s essay of 1968. The record was admitted on this proposition with a passage matched against the held text.',
      claimIds: ['ts-c1-weizenbaum-1966', 'ts-c1-michie-1968'],
      recordedAt: recheckDecisions,
    },
    {
      propositionId: 'behavioural-tests-as-evidence',
      replaced:
        'Weizenbaum’s ELIZA article (January 1966), headlined as earliest located.',
      reason:
        'Earlier text found on 2026-11-04: Jefferson’s Lister Oration, published in the BMJ on 25 June 1949, says that a machine that typewrites its answers may seem to have learned to write when it does no more than telegraphic systems already do. Descartes’s Discours de la méthode (1637) is earlier and is shown as context: he holds that two tests would always tell such machines from people. A second check by a model of another family read Descartes as meeting the criterion for narrower probes; the maintainer chose Jefferson, and C1’s criterion now says that a text holding a behavioural test reliable does not meet it.',
      claimIds: [
        'pre-c1-jefferson-1949',
        'ts-c1-weizenbaum-1966',
        'pre-c1-descartes-1637-context',
      ],
      recordedAt: antecedents,
    },
  ],
  limits: [
    '“Earliest located” means the earliest text found by the searches described under “How we searched”. It is not a claim that no earlier text exists.',
    'A record documents what a text says, in its register. It is not evidence that the proposition is true, and no record links one text to another.',
    'Most developed is an editorial judgement among the located texts. None is named for B6 and C1–C3, which were looked for only before mid-1996.',
    'Quotations are short and come from sources whose reuse permits them. Other passages are labelled paraphrases, including every in-copyright text read in a third-party copy.',
    'Each record carries the date its work is dated by. Where the quoted wording survives only in a later copy, the date from which it is attested is shown, and that date decides which text is earliest located.',
    'A machine selected and classified these records, and three machine checks re-examined them.',
    'B1 and A4 also hold texts after 2022, recorded by the search on catastrophic risk from advanced AI; they did not change the earliest located texts.',
  ],
  related: {
    'intelligence-explosion': [
      {
        propositionId: 'vast-superiority',
        relation:
          'A different claim in the collection on machine succession, scale and acceleration: the size of the eventual gap, whatever its route.',
      },
      {
        propositionId: 'technological-singularity',
        relation:
          'A different claim in the collection of antecedent texts: a point beyond which human affairs could not continue or be foreseen.',
      },
    ],
    'fast-or-hard-takeoff': [
      {
        propositionId: 'technological-singularity',
        relation:
          'A claim in the collection of antecedent texts that requires no stated speed: a point beyond which human affairs could not continue or be foreseen.',
      },
    ],
    'control-or-purpose-specification': [
      {
        propositionId: 'machines-only-do-what-they-are-ordered',
        relation:
          'A different claim in the collection of antecedent texts: that a machine can only do what it is ordered to do. Some texts contest it in order to argue B6.',
      },
    ],
    'behavioural-tests-as-evidence': [
      {
        propositionId: 'machines-could-think',
        relation:
          'A wider claim in the collection of antecedent texts: that a machine could think. A text can contest it on the ground C1 states.',
      },
    ],
    'competition-defeats-restraint': [
      {
        propositionId: 'accelerate-machine-intelligence',
        relation:
          'A different claim in the collection on machine succession, scale and acceleration: that development should be accelerated rather than restrained.',
      },
    ],
    'deceptive-alignment': [
      {
        propositionId: 'inner-or-deceptive-misalignment',
        relation:
          'A wider proposition in the collection on catastrophic risk; texts recorded here are not recorded again there.',
      },
    ],
    scheming: [
      {
        propositionId: 'inner-or-deceptive-misalignment',
        relation:
          'A wider proposition in the collection on catastrophic risk; texts recorded here are not recorded again there.',
      },
    ],
  },
};
