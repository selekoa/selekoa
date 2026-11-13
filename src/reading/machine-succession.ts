import type { PropositionsCollection } from '../domain/propositions';
import { machineSuccessionFrame as frame } from './proposition-frames';
import { describeGroups } from './describe-groups';

/** The maintainer's decisions of 2026-11-02 on the archive retrieval of held sources. */
const archiveApply = '2026-11-02';

/** The maintainer's decisions of 2026-11-02 on the earliest-located re-check (decisions 1 to 4). */
const recheckDecisions = '2026-11-02';

/** The interim withdrawal of 2026-11-02: headlines the cross-family re-check marks move or undecidable. */
const recheckWithdrawn = '2026-11-02';

/** The maintainer's decision on the pre-launch audit (PA-01, PA-02). */
const withdrawn = '2026-11-02';

const admitted = '2026-11-01';

/** The admission of the antecedent-texts collection, with the maintainer's decision 4a. */
const antecedents = '2026-11-04';
const pack = 'the research pack of 2026-10-31';

/** The maintainer's answers of 2026-11-07 on the re-check sheet and the reads of that day. */
const settled = '2026-11-07';

export const machineSuccession: PropositionsCollection = {
  id: frame.id,
  version: frame.version,
  title: frame.title,
  question: frame.question,
  editorialStatus: frame.editorialStatus,
  introduction:
    'Each proposition is recorded with one criterion. It is phrased generically and attributed to no one. A text that meets the criterion articulates the proposition. A text that disputes it contests it, and the record says whether the passage gives a reason or states the contrary only. A text that comes close bears on it, and its record names what is missing. A record says what one text states on its date. It does not place its author in a school or camp, and the group names describe subjects, not movements. Where a text frames a passage as a story or reports another author’s view, the record says so. Texts are listed in date order; the order records no influence between them. Where a later text names an earlier text or author, that naming is recorded on its own, and it is not agreement. The page records what texts say. It does not assess whether any proposition is right.',
  groups: describeGroups(frame.groups, {
    WA: 'Propositions that machines succeed humans as the leading intelligence, that this would be acceptable or desirable, that human minds could move into machines, and that building superhuman machines would bring conflict among humans.',
    WB: 'Propositions that machine intelligence could exceed human intelligence by many orders of magnitude, that its rise is a physical or cosmic process, and that it spreads beyond Earth.',
    WC: 'Propositions that capital or the techno-economic process is itself a machine intelligence, that the growth of intelligence is its own end, and that its development should be accelerated rather than restrained.',
  }),
  searchNote: {
    scope:
      'The collection records texts dated from 1863 to October 2026 on ten propositions of its own. Its texts before 1979 are Samuel Butler’s letter of 1863, two texts by Alan Turing of about 1951, and texts of 1865 to 1948 from the searches for the antecedent texts (see “How we searched”). “Earliest located” means the earliest text found by the searches below that meets the criterion, judged by the date from which its quoted wording is attested. It is not a claim that no earlier text exists.',
    venues: [
      {
        period: 'Named authors and texts',
        items: [
          'Hugo de Garis’s texts on artilects from 1989 onwards: journal and magazine articles, his own web pages and the posted text of The Artilect War.',
          'Nick Land’s texts on machine intelligence, technology, capital and acceleration, read in retrievable copies: “Circuitries” (1992, read from page images), “Machinic Desire” (1993), “Meltdown” (dated 1997) and later essays and posts. His later political writing is outside the search, and only the passages on machine intelligence, technology and acceleration are recorded. Where a text contains other material, the record says that it was excluded. His posts of 2013–2014 on his blog Outside in (xenosystems.net), no longer served, were read in archive captures.',
          'Hans Moravec’s texts on his own site from 1979 to 2008. His texts of 1979 and 1989 that the dataset already held are recorded here on the new propositions only.',
          'Further texts that state or dispute a proposition, found from the named texts and by web search: among them Vernor Vinge (1993), Robin Hanson (1994), Marvin Minsky (1994), Ray Kurzweil (2001, 2011), Nick Bostrom (2003, 2004), David Chalmers (2010), Richard Sutton (2013, 2023), Martin Rees and Frank Tipler (2015) and Daniel Faggella (2023).',
          'Texts on acceleration and effective acceleration that name their predecessors: the #Accelerate manifesto (2013), the e/acc newsletter and its authors’ posts (from 2022), Marc Andreessen’s two essays of 2023, Vitalik Buterin’s essays of 2023 and 2025, and texts that answer them by name.',
          'Texts that dispute a proposition as a text in the collection states it, found from named replies and by web search.',
          'Samuel Butler’s letter “Darwin among the Machines” (The Press, Christchurch, 13 June 1863), which the dataset already held for the superintelligence collection. A cross-family re-check of 2026-11-02 found that it meets W01 and W09 and contests W02 and W08 before the texts from 1979, and the maintainer widened the period to 1863 on 2026-11-02 to include it. Texts between 1863 and 1979 were not searched for this collection; besides the letter, the texts recorded from those years are the two by Turing below, which the dataset already held, and those found by the searches for the antecedent texts.',
          'The searches for the collection of antecedent texts (2026-11-02 to 2026-11-04) read Butler’s “Lucubratio Ebria” (The Press, 1865, in OCR text) and Erewhon (1872), Čapek’s R.U.R. in its English version (1923), Turing’s report Intelligent Machinery (1948) and Wiener’s Cybernetics (1948, wording attested 2019). Their records on W01, W02, W04 and W08 are shown here; “Lucubratio Ebria” is W01’s earliest located contesting text.',
          'Alan Turing’s lecture typescript “Intelligent Machinery, a Heretical Theory” (c. 1951) and his broadcast script “Can Digital Computers Think?” (1951), held in the Turing Digital Archive (AMT/B/4, AMT/B/5) and already in the dataset for the superintelligence collection. A report of 2026-11-02 by an OpenAI model read both scans against W01–W10; the maintainer admitted the lecture as articulating W01 and the script as bearing on it on 2026-11-02. They come after Butler’s letter, which keeps the earliest located role.',
          'Pseudonymous and collective bylines (“Beff Jezos”, “bayes”, “e/acc”, a LessWrong user name) are recorded as the bylines show. A pseudonym is not joined to a legal name except where the text itself does so.',
        ],
      },
      {
        period: 'Searched and not included',
        items: [
          'Russian cosmism: web searches for primary texts by Fedorov or Tsiolkovsky on machines found secondary accounts only; the check read the passages on machines, the artificial and reason, and on settling the universe, in Tsiolkovsky’s Monism of the Universe (1925, as republished), which do not identify the expanding agents as machine intelligence. “God-building”: web searches found secondary scholarship only; the check read the accessible preface of Lunacharsky’s Religion and Socialism (1908, before the Soviet state), and scanned a later transcription of Bogdanov’s Red Star (1908) for passages on thinking machines, finding none. Soviet cybernetics: Kolmogorov’s theses of 1961, read in Russian, concern only whether machine thought is possible; Glushkov’s text of 1963 was not retrieved. Chilean cybernetics (Project Cybersyn): the check read Stafford Beer’s lecture “Fanfare for Effective Freedom” (1973, in a later reprint), which describes computers as quasi-intelligent machines but keeps human management and computer advice distinct; it meets no criterion. These searches were bounded as stated and do not establish that no qualifying text exists in any of these strands. Shared vocabulary, such as de Garis’s “Cosmists”, is not a link.',
          'Names the texts give that have no record of their own, and are not recorded as links: Karl Marx, Gilles Deleuze and Félix Guattari (and their Anti-Oedipus), Lenin’s “Left-Wing” Childishness, Kurzweil’s The Age of Spiritual Machines, Kevin Kelly’s Out of Control, A. G. Cairns-Smith, Barrow and Tipler’s The Anthropic Cosmological Principle, Land’s Xenosystems as a compilation, a K-Punk post, and two X accounts.',
        ],
      },
      {
        period: 'A cross-family check, 2026-11-01',
        items: [
          'A model of another family answered the earliest-located questions and classified 45 passages blind, then re-read 45 further records and all 60 namings against fresh retrievals and dated archive captures: 90 of the research pack’s 150 records in all.',
          'It agreed with 41 of the 45 blind classifications and 43 of the 45 records. Where it found a capture holding a record’s wording, that capture dates the wording, and the earliest located texts were recomputed from those dates. It located Land’s “Machinic Desire” (1993) and four of his posts of 2013–2014. The maintainer adopted its findings on 2026-11-01; they are applied here except where stated under the gaps.',
        ],
      },
    ],
    methods: [
      'Sources were retrieved directly by script, one request at a time, on 2026-10-31, by the check on 2026-11-01 and, for the text added at admission, again on 2026-11-01. Each retrieved text is identified by its SHA-256 hash in the source record.',
      'Every quotation was compared with the retrieved text of its own source. “Circuitries” has no text layer; its records are paraphrases read from page images.',
      'Each record gives the date its text is dated by. Where the quoted wording is known only from a later copy, the record also gives the date from which the wording is attested, and that date decides which text is earliest located. Several of Moravec’s texts, Kurzweil’s essay of 2001 and “Meltdown” are attested by archive captures that the check compared. Hanson’s article of 1994 is dated by the printed issue, read in a scan.',
      'An archive retrieval of 2026-11-02 by an OpenAI model read Butler’s letter (its passages compared with archived images of the printed columns), “Staring into the Singularity” in its capture of 4 December 2000, and Land’s four posts of 2013–2014 in their captures, and gave each passage verbatim with the capture’s SHA-256 hash. The records admitted from it quote those passages; the session that applied them could not reach the archive and did not retrieve them again.',
      'The two Turing records quote passages that a report of 2026-11-02 by an OpenAI model gave verbatim from the archive’s scans (research/turing-1951-lead-2026-11-02/report.md); the session that admitted them re-read both passages on the same scans.',
      'A fresh-context machine audit by Claude models re-read a sample of these records, and a check by an OpenAI GPT-6 model re-read 90 of the research pack’s 150 records and all its namings.',
    ],
    gaps: [
      'W10 has no contesting text. The check’s search found texts that dispute only physical colonisation or that keep the possibility open; they are not recorded.',
      'W05’s earliest located text, “Staring into the Singularity” (version 1.2.1, captured 4 December 2000), gives its trillions-fold figure for the neuron-equivalents of a visual cortex, not for overall intelligence; reading it as cognitive capacity rests on the adjoining passage on semantic primitives, and the record says so.',
      'The records are uneven: many texts by de Garis and Moravec, few contesting texts on several propositions. The imbalance is a result of the search, not a finding.',
      'The check and the research pack disagree on Moravec’s text of 1979 on W08: the check reads it as articulating the proposition, and it is recorded as bearing on it. De Garis’s texts of 1989 and 1990 are recorded as bearing on W03 and W05, as the check read them; they no longer hold the earliest located role there.',
      'Not read: Moravec’s Mind Children (1988); the printed edition of 2005 of de Garis’s The Artilect War (read in his posted text of 2014); the printing of 1990 of his “Moral Dilemmas” (read in a print of his page of 1999); Land’s “Teleoplexy” (2014) beyond its publisher’s excerpt; and the printed Abstract Culture swarm that carried “Meltdown”.',
      'Drexler’s Engines of Creation, chapter 5, in its web version (copyright 1986, revised 2004), could articulate W01, W03 and W09. It is not recorded until its printed wording of 1986 is checked.',
      'A blog post contesting Land on orthogonality, dated 24 August 2018, is not recorded until a capture confirms its date.',
      'Where a later text names a person rather than a text, the naming is not recorded yet: the dataset records a citation only of a text. It is listed with the admission for a decision.',
      'Hanson’s article of 1994 on W03 is dated by the printed issue of Extropy (third quarter 1994), which the dataset holds as a scan without a text layer; machine reads of its page images, the last by the cross-family re-check of 2026-11-02, found the abstract’s wording there. Its quotations are matched in a reprint captured in February 1998.',
      'Most web texts were read in their current copies; a record says where a page states a later modification. Daniel Faggella’s essay gives two posting dates, 24 November 2023 on the current page and 22 December 2023 in a capture of February 2024; both are given, and its passages absent from that capture are dated by the current page.',
    ],
    corrections:
      'A text found later that is earlier than an earliest located text becomes the new earliest located text, and the earlier headline stays on record as a correction.',
  },
  corrections: [
    {
      propositionId: 'mind-transfer',
      replaced: `De Garis’s article of 1989, headlined as earliest located by ${pack}.`,
      reason:
        'The cross-family check read its passage as bearing on the proposition: it names modifying bodies and brains, not moving a mind into a machine. Minsky’s essay of 1994, with wording attested from January 1997, is earliest located.',
      claimIds: [
        'ht-w03-degaris-1989-what-if-ai-succeeds',
        'ht-w03-minsky-1994-will-robots-inherit-the-earth',
      ],
      recordedAt: admitted,
    },
    {
      propositionId: 'vast-superiority',
      replaced: `De Garis’s paper of 1990, headlined as earliest located by ${pack}.`,
      reason:
        'The cross-family check read its passage as bearing on the proposition: it says “orders of magnitude” without the criterion’s scale. Kurzweil’s essay of 7 March 2001, whose wording an archive capture of 7 November 2001 attests, is earliest located.',
      claimIds: [
        'ht-w05-degaris-1990-moral-dilemmas',
        'ht-w05-kurzweil-2001-law-of-accelerating-returns',
      ],
      recordedAt: admitted,
    },
    {
      propositionId: 'capital-as-machine-intelligence',
      replaced: `Land’s text of March 2014 on teleological identity, headlined as earliest located by ${pack}.`,
      reason:
        'Earlier text found: Land’s article “Machinic Desire” (1993), located by the cross-family check.',
      claimIds: [
        'ht-w06-land-2014-teleological-identity',
        'ht-w06-land-1993-machinic-desire',
      ],
      recordedAt: admitted,
    },
    {
      propositionId: 'intelligence-as-own-end',
      replaced: `Taylor’s review of September 2024, which reports Land’s posts, headlined as earliest located by ${pack}.`,
      reason:
        'The cross-family check read Land’s own posts of 2013–2014 in archive captures, and the maintainer decided that “Pythia Unbound” (11 September 2013) is earliest located. Its quotations could not be matched again at admission, so the role is held open until it is recorded.',
      claimIds: ['ht-w07-taylor-2024-book-review-xenosystems'],
      recordedAt: admitted,
    },
    {
      propositionId: 'accelerate-machine-intelligence',
      replaced: `The post of 10 July 2022 by “Beff Jezos” and “bayes”, headlined as earliest located by ${pack}.`,
      reason:
        'Earlier text found: the original e/acc post of 1 June 2022, which the cross-family check read in an archive capture of 2 June 2022; the research pack had read only its repost of 31 October 2022.',
      claimIds: [
        'ht-w08-jezos-bayes-2022-notes-eacc-principles',
        'ht-w08-eacc-2022-effective-accelerationism-repost',
      ],
      recordedAt: admitted,
    },
    {
      propositionId: 'cosmic-process',
      replaced: `Moravec’s “Human Culture—A Genetic Takeover Underway” (1989), with wording attested from March 2001, headlined as earliest located by ${pack}.`,
      reason:
        'Earlier attested wording found: Moravec’s “After Life” (1989), whose wording an archive capture of 10 November 1999 attests. The cross-family check compared that capture.',
      claimIds: [
        'ht-w09-moravec-1989-genetic-takeover',
        'ht-w09-moravec-1989-after-life',
      ],
      recordedAt: admitted,
    },
    {
      propositionId: 'accelerate-machine-intelligence',
      replaced:
        'Andreessen’s manifesto of 16 October 2023, headlined as the earliest located use of the name (“accelerationism”).',
      reason:
        'Withdrawn on 2026-11-02 by the maintainer’s decision on the pre-launch audit (PA-01), pending a cross-family re-check, which also flagged it; no record holds the headline meanwhile. The e/acc post of 1 June 2022, the proposition’s earliest located text, uses the usual name “e/acc”.',
      claimIds: [
        'ht-w08-andreessen-2023-techno-optimist-manifesto',
        'ht-w08-eacc-2022-effective-accelerationism-repost',
      ],
      recordedAt: withdrawn,
    },
    {
      propositionId: 'mind-transfer',
      replaced:
        'Minsky’s essay of 1994, with wording attested from January 1997, headlined as earliest located.',
      reason:
        'Withdrawn on 2026-11-02 by the maintainer’s decision on the pre-launch audit (PA-02), pending a cross-family re-check; no record holds the headline meanwhile. Minsky’s page is dated by its own “Last modified” footer, while Moravec’s pages are dated by their first archive capture; by captures, Hanson’s article (captured 20 February 1998) would precede Minsky’s (first captures found 1999).',
      claimIds: ['ht-w03-minsky-1994-will-robots-inherit-the-earth'],
      recordedAt: withdrawn,
    },
    {
      propositionId: 'machine-succession',
      replaced:
        'Moravec’s text of 1989, headlined as the earliest located use of the name (“post-biological”).',
      reason:
        'Withdrawn on 2026-11-02 by the maintainer’s decision on the pre-launch audit (addition to decision 1), after the cross-family re-check flagged it; no record holds the headline meanwhile. The re-check found “post-biological” in Land’s printed article of October 1992, earlier than the 2001 capture that attests Moravec’s wording.',
      claimIds: ['ht-w01-moravec-1989-genetic-takeover'],
      recordedAt: withdrawn,
    },
    {
      propositionId: 'mind-transfer',
      replaced:
        'Hanson’s article of 1994, headlined as the earliest located use of the name (“upload”).',
      reason:
        'Withdrawn on 2026-11-02 by the maintainer’s decision on the pre-launch audit (addition to decision 1), after the cross-family re-check flagged it; no record holds the headline meanwhile. The re-check read the name in the printed Extropy issue of the third quarter of 1994, which may change the date that decides the role.',
      claimIds: ['ht-w03-hanson-1994-if-uploads-come-first'],
      recordedAt: withdrawn,
    },
    {
      propositionId: 'intelligence-as-own-end',
      replaced:
        'Alexander’s post of 30 July 2014, headlined as the earliest located use of the name (“orthogonality”).',
      reason:
        'Withdrawn on 2026-11-02 by the maintainer’s decision on the pre-launch audit (addition to decision 1), after the cross-family re-check flagged it; no record holds the headline meanwhile. The re-check found the name in Bostrom’s paper, attested by a capture of 9 February 2014, before Alexander’s post of 30 July 2014.',
      claimIds: ['ht-w07-alexander-2014-meditations-on-moloch'],
      recordedAt: withdrawn,
    },
    {
      propositionId: 'machine-succession',
      replaced:
        'de Garis, What If AI Succeeds? (1989), headlined as earliest located.',
      reason:
        'Withdrawn on 2026-11-02 by the maintainer’s decision to withdraw every headline the cross-family re-check proposes to move or could not decide, pending adjudication; no record holds the headline meanwhile. The re-check proposes an earlier text the dataset holds: Butler’s held June 13, 1863 newspaper text explicitly predicts machines becoming the superior race with real supremacy over the world and humans. The printed page predates the 1989 magazine text; the criterion does not require modern electronic implementation.',
      claimIds: ['ht-w01-degaris-1989-what-if-ai-succeeds'],
      recordedAt: recheckWithdrawn,
    },
    {
      propositionId: 'succession-acceptable',
      replaced:
        'Minsky, Will Robots Inherit the Earth? (1994), headlined as earliest located.',
      reason:
        'Withdrawn on 2026-11-02 by the maintainer’s decision to withdraw every headline the cross-family re-check proposes to move or could not decide, pending adjudication; no record holds the headline meanwhile. The re-check could not decide: Earlier-attributed Moravec texts welcome machine succession, but the held Robot as Liberation file is a later author-hosted LaTeX text, not inspected December 1989 print, and Genetic Takeover is attested March 6, 2001. Minsky’s wording is itself a revised page self-dated January 2, 1997, not compared with October 1994 print. The earlier work dates do not decide exact-wording priority on a common basis.',
      claimIds: ['ht-w02-minsky-1994-will-robots-inherit-the-earth'],
      recordedAt: recheckWithdrawn,
    },
    {
      propositionId: 'succession-acceptable',
      replaced:
        "Joy, Why the Future Doesn't Need Us (2000), headlined as the earliest located text that contests the proposition.",
      reason:
        'Withdrawn on 2026-11-02 by the maintainer’s decision to withdraw every headline the cross-family re-check proposes to move or could not decide, pending adjudication; no record holds the headline meanwhile. The re-check proposes an earlier text the dataset holds: Butler’s 1863 newspaper text opposes accepting machine supremacy by calling for immediate destruction of machinery. It is an earlier held contesting response to the prospect, even though it also describes domesticated human survival rather than extinction.',
      claimIds: ['ht-w02-joy-2000-why-the-future-doesnt-need-us'],
      recordedAt: recheckWithdrawn,
    },
    {
      propositionId: 'vast-superiority',
      replaced:
        'Kurzweil, The Law of Accelerating Returns (2001), headlined as earliest located.',
      reason:
        'Withdrawn on 2026-11-02 by the maintainer’s decision to withdraw every headline the cross-family re-check proposes to move or could not decide, pending adjudication; no record holds the headline meanwhile. The re-check proposes an earlier text the dataset holds: The held Staring into the Singularity capture already describes a vastly expanded machine-like visual cortex, higher-dimensional thinking and semantic/mathematical cognition beyond human capacity. Its December 2000 attestation is earlier than Kurzweil’s March 2001 work and November 2001 witness. This is cognitive processing, not a robot’s actuator count.',
      claimIds: ['ht-w05-kurzweil-2001-law-of-accelerating-returns'],
      recordedAt: recheckWithdrawn,
    },
    {
      propositionId: 'intelligence-as-own-end',
      replaced:
        'Alexander, Meditations On Moloch (2014), headlined as the earliest located text that contests the proposition.',
      reason:
        'Withdrawn on 2026-11-02 by the maintainer’s decision to withdraw every headline the cross-family re-check proposes to move or could not decide, pending adjudication; no record holds the headline meanwhile. The re-check proposes an earlier text the dataset holds: Clemmensen’s August 31, 1996 own paragraph explicitly allows final goals other than increasing intelligence and derives intelligence as an intermediate means. It contests the criterion’s claim that intelligence itself must be the final end, earlier than Alexander’s 2014 invocation of orthogonality.',
      claimIds: ['ht-w07-alexander-2014-meditations-on-moloch'],
      recordedAt: recheckWithdrawn,
    },
    {
      propositionId: 'accelerate-machine-intelligence',
      replaced:
        "Joy, Why the Future Doesn't Need Us (2000), headlined as the earliest located text that contests the proposition.",
      reason:
        'Withdrawn on 2026-11-02 by the maintainer’s decision to withdraw every headline the cross-family re-check proposes to move or could not decide, pending adjudication; no record holds the headline meanwhile. The re-check proposes an earlier text the dataset holds: Butler’s held newspaper conclusion calls for stopping the machinery whose development is producing human successors. It is an earlier contesting prescription under this criterion, which includes restraining the process that produces machine intelligence.',
      claimIds: ['ht-w08-joy-2000-why-the-future-doesnt-need-us'],
      recordedAt: recheckWithdrawn,
    },
    {
      propositionId: 'accelerate-machine-intelligence',
      replaced:
        'e/acc, Effective Accelerationism — e/acc (2022), headlined as earliest located.',
      reason:
        'Withdrawn on 2026-11-02 by the maintainer’s decision to withdraw every headline the cross-family re-check proposes to move or could not decide, pending adjudication; no record holds the headline meanwhile. The re-check proposes an earlier text the dataset holds: The November 19, 1996 announcement explicitly prescribes reaching the technological Singularity as quickly as possible and identifies it with beings smarter than humans. This is earlier held acceleration advocacy, distinct from use of the later e/acc name. The longer 2000 essay need not be backdated for the slogan.',
      claimIds: ['ht-w08-eacc-2022-effective-accelerationism-repost'],
      recordedAt: recheckWithdrawn,
    },
    {
      propositionId: 'cosmic-process',
      replaced:
        'Allen and Greaves, The Singularity Isn’t Near (2011), headlined as the earliest located text that contests the proposition.',
      reason:
        'Withdrawn on 2026-11-02 by the maintainer’s decision to withdraw every headline the cross-family re-check proposes to move or could not decide, pending adjudication; no record holds the headline meanwhile. The re-check proposes an earlier text the dataset holds: Lanier’s 2000 manifesto contests the extension of biological evolution and Moore-law extrapolation into a necessary autonomous technological destiny. That is an earlier held challenge to the larger-process premise, before the 2011 criticism of accelerating-returns laws.',
      claimIds: ['ht-w09-allen-greaves-2011-singularity-isnt-near'],
      recordedAt: recheckWithdrawn,
    },
    {
      propositionId: 'cosmic-process',
      replaced: 'Moravec, After Life (1989), headlined as earliest located.',
      reason:
        'Withdrawn on 2026-11-02 by the maintainer’s decision to withdraw every headline the cross-family re-check proposes to move or could not decide, pending adjudication; no record holds the headline meanwhile. The re-check proposes an earlier text the dataset holds: Butler’s held 1863 newspaper explicitly places the emerging mechanical kingdom in a sequence from mineral to vegetable and animal life, producing human successors. That supplies the larger evolutionary-process criterion well before the 1989 work and its 1999 archive witness.',
      claimIds: ['ht-w09-moravec-1989-after-life'],
      recordedAt: recheckWithdrawn,
    },
    {
      propositionId: 'cosmic-expansion',
      replaced:
        'de Garis, What If AI Succeeds? (1989), headlined as earliest located.',
      reason:
        'Withdrawn on 2026-11-02 by the maintainer’s decision to withdraw every headline the cross-family re-check proposes to move or could not decide, pending adjudication; no record holds the headline meanwhile. The re-check could not decide: Moravec’s held work attributed to February 1979 explicitly places self-improving machine societies in space and predicts their expansion beyond human colonies. But the inspected HTML is a later author-hosted version with a 1978 internal header, not the February 1979 print. No pre-1989 matching witness was established. Earlier work attribution versus fixed 1989 print cannot decide exact-wording priority.',
      claimIds: ['ht-w10-degaris-1989-what-if-ai-succeeds'],
      recordedAt: recheckWithdrawn,
    },
    {
      propositionId: 'accelerate-machine-intelligence',
      replaced:
        'No headline for the earliest located use of the name: under re-check from 2026-11-02 (Andreessen’s manifesto of 16 October 2023 had been headlined, with “accelerationism”).',
      reason:
        'Set on 2026-11-02 after the cross-family re-check (role 29), with the drafting family’s agreement: the e/acc post of 1 June 2022, recorded on this proposition, is titled “Effective Accelerationism”, read in a capture of 2 June 2022, before Andreessen’s manifesto. No label or affiliation is inferred from the name.',
      claimIds: [
        'ht-w08-eacc-2022-effective-accelerationism-repost',
        'ht-w08-andreessen-2023-techno-optimist-manifesto',
      ],
      recordedAt: recheckWithdrawn,
    },
    {
      propositionId: 'mind-transfer',
      replaced:
        'No earliest located headline: under re-check from 2026-11-02 (Minsky’s essay of 1994, with wording attested from January 1997, had been headlined).',
      reason:
        'Set on 2026-11-02 after the cross-family re-check (role 114), with the drafting family’s agreement: Hanson’s “If Uploads Come First” is dated by the printed issue of Extropy (third quarter 1994), held as a scan, in which the re-check read the abstract’s wording. That print precedes both Minsky’s issue of October 1994 and his revised page of January 1997, so the order does not depend on comparing captures with self-dated pages.',
      claimIds: [
        'ht-w03-hanson-1994-if-uploads-come-first',
        'ht-w03-minsky-1994-will-robots-inherit-the-earth',
      ],
      recordedAt: recheckWithdrawn,
    },
    {
      propositionId: 'intelligence-as-own-end',
      replaced:
        'No headline for the earliest located use of the name: under re-check from 2026-11-02. Before that, Alexander’s “Meditations On Moloch” (30 July 2014) was headlined.',
      reason:
        'Moved on 2026-11-02 to Bostrom’s “The Superintelligent Will” (May 2012), with “orthogonality”, by the maintainer’s decision on the cross-family re-check (role 28). The text uses a usual name and is dated before Alexander’s “Meditations On Moloch”. The record was admitted on this proposition with a passage matched against the held text.',
      claimIds: [
        'ht-w07-bostrom-2012-superintelligent-will',
        'ht-w07-alexander-2014-meditations-on-moloch',
      ],
      recordedAt: recheckDecisions,
    },
    {
      propositionId: 'intelligence-as-own-end',
      replaced:
        'No earliest located contesting headline: under re-check from 2026-11-02. Before that, Alexander’s “Meditations On Moloch” (30 July 2014) was headlined.',
      reason:
        'Moved on 2026-11-02 to Clemmensen’s Extropians message of 31 August 1996, by the maintainer’s decision on the cross-family re-check (role 121). The text contests the proposition and is dated before Alexander’s “Meditations On Moloch”. The record was admitted on this proposition with a passage matched against the held text.',
      claimIds: [
        'ht-w07-clemmensen-1996-si-that-ate-chicago',
        'ht-w07-alexander-2014-meditations-on-moloch',
      ],
      recordedAt: recheckDecisions,
    },
    {
      propositionId: 'accelerate-machine-intelligence',
      replaced:
        'No earliest located headline: under re-check from 2026-11-02. Before that, the e/acc post of 1 June 2022 was headlined.',
      reason:
        'Moved on 2026-11-02 to Yudkowsky’s “Staring into the Singularity”, its slogan attested by his announcement of 19 November 1996, by the maintainer’s decision on the cross-family re-check (role 123). The text meets the criterion and is dated before the e/acc post of 1 June 2022. The record was admitted on this proposition with a passage matched against the held text.',
      claimIds: [
        'ht-w08-yudkowsky-1996-staring-into-the-singularity',
        'ht-w08-eacc-2022-effective-accelerationism-repost',
      ],
      recordedAt: recheckDecisions,
    },
    {
      propositionId: 'cosmic-process',
      replaced:
        'No earliest located contesting headline: under re-check from 2026-11-02. Before that, Allen and Greaves (12 October 2011) was headlined.',
      reason:
        'Moved on 2026-11-02 to Lanier’s “One Half a Manifesto” (10 November 2000), by the maintainer’s decision on the cross-family re-check (role 124). The text contests the proposition and is dated before Allen and Greaves. The record was admitted on this proposition with a passage matched against the held text.',
      claimIds: [
        'ht-w09-lanier-2000-one-half-a-manifesto',
        'ht-w09-allen-greaves-2011-singularity-isnt-near',
      ],
      recordedAt: recheckDecisions,
    },
    {
      propositionId: 'machine-succession',
      replaced:
        'No headline for the earliest located use of the name: under re-check from 2026-11-02. Before that, Moravec’s essay of 1989 (wording attested March 2001) was headlined, with “post-biological”.',
      reason:
        'Dropped on 2026-11-02 by the maintainer’s decision on the cross-family re-check (role 23): the usual names are ordinary phrases rather than names of this proposition, so no text is headlined as using them first. The names stay listed. No label or affiliation is inferred from them.',
      claimIds: ['ht-w01-moravec-1989-genetic-takeover'],
      recordedAt: recheckDecisions,
    },
    {
      propositionId: 'mind-transfer',
      replaced:
        'No headline for the earliest located use of the name: under re-check from 2026-11-02. Before that, Hanson’s “If Uploads Come First” (1994) was headlined, with “upload”.',
      reason:
        'Dropped on 2026-11-02 by the maintainer’s decision on the cross-family re-check (role 25): the usual names are ordinary phrases rather than names of this proposition, so no text is headlined as using them first. The names stay listed. No label or affiliation is inferred from them.',
      claimIds: ['ht-w03-hanson-1994-if-uploads-come-first'],
      recordedAt: recheckDecisions,
    },
    {
      propositionId: 'machine-succession',
      replaced:
        'No earliest located headline: under re-check from 2026-11-02. Before that, de Garis’s What If AI Succeeds? (1989) was headlined.',
      reason:
        'Moved on 2026-11-02 to Butler’s letter “Darwin among the Machines” (13 June 1863), by the maintainer’s decision of 2026-11-02 on the cross-family re-check (role 110), once an archive retrieval of 2026-11-02 gave the passage from the held text. The text meets the criterion and is dated before de Garis’s article; the collection’s period was widened to 1863 for it. The record was admitted on this proposition with that passage.',
      claimIds: [
        'ht-w01-butler-1863-darwin-among-the-machines',
        'ht-w01-degaris-1989-what-if-ai-succeeds',
      ],
      recordedAt: archiveApply,
    },
    {
      propositionId: 'succession-acceptable',
      replaced:
        'No earliest located contesting headline: under re-check from 2026-11-02. Before that, Joy’s “Why the Future Doesn’t Need Us” (April 2000) was headlined.',
      reason:
        'Moved on 2026-11-02 to Butler’s letter “Darwin among the Machines” (13 June 1863), by the maintainer’s decision of 2026-11-02 on the cross-family re-check (role 113), once an archive retrieval of 2026-11-02 gave the passage from the held text. The text contests the proposition and is dated before Joy’s essay. The record was admitted on this proposition with that passage.',
      claimIds: [
        'ht-w02-butler-1863-darwin-among-the-machines',
        'ht-w02-joy-2000-why-the-future-doesnt-need-us',
      ],
      recordedAt: archiveApply,
    },
    {
      propositionId: 'vast-superiority',
      replaced:
        'No earliest located headline: under re-check from 2026-11-02. Before that, Kurzweil’s “The Law of Accelerating Returns” (7 March 2001; wording attested 7 November 2001) was headlined.',
      reason:
        'Moved on 2026-11-02 to “Staring into the Singularity”, version 1.2.1 (wording attested 4 December 2000), by the maintainer’s decision of 2026-11-02 on the cross-family re-check (role 119), once an archive retrieval of 2026-11-02 gave the passage from the held text. The text meets the criterion and its wording is attested before Kurzweil’s; its figure concerns a visual cortex, as the record says. The record was admitted on this proposition with that passage.',
      claimIds: [
        'ht-w05-yudkowsky-2000-staring-into-the-singularity',
        'ht-w05-kurzweil-2001-law-of-accelerating-returns',
      ],
      recordedAt: archiveApply,
    },
    {
      propositionId: 'accelerate-machine-intelligence',
      replaced:
        'No earliest located contesting headline: under re-check from 2026-11-02. Before that, Joy’s “Why the Future Doesn’t Need Us” (April 2000) was headlined.',
      reason:
        'Moved on 2026-11-02 to Butler’s letter “Darwin among the Machines” (13 June 1863), by the maintainer’s decision of 2026-11-02 on the cross-family re-check (role 122), once an archive retrieval of 2026-11-02 gave the passage from the held text. The text contests the proposition and is dated before Joy’s essay. The record was admitted on this proposition with that passage.',
      claimIds: [
        'ht-w08-butler-1863-darwin-among-the-machines',
        'ht-w08-joy-2000-why-the-future-doesnt-need-us',
      ],
      recordedAt: archiveApply,
    },
    {
      propositionId: 'cosmic-process',
      replaced:
        'No earliest located headline: under re-check from 2026-11-02. Before that, Moravec’s “After Life” (1989; wording attested 10 November 1999) was headlined.',
      reason:
        'Moved on 2026-11-02 to Butler’s letter “Darwin among the Machines” (13 June 1863), by the maintainer’s decision of 2026-11-02 on the cross-family re-check (role 125), once an archive retrieval of 2026-11-02 gave the passage from the held text. The text meets the criterion and is dated before Moravec’s essay. The record was admitted on this proposition with that passage.',
      claimIds: [
        'ht-w09-butler-1863-darwin-among-the-machines',
        'ht-w09-moravec-1989-after-life',
      ],
      recordedAt: archiveApply,
    },
    {
      propositionId: 'intelligence-as-own-end',
      replaced:
        'No earliest located headline: held open from 2026-11-01 until Land’s post “Pythia Unbound” was recorded. Before that, Taylor’s review of September 2024 was headlined by the research pack.',
      reason:
        'Set on 2026-11-02 on Land’s “Pythia Unbound” (11 September 2013; wording attested by the capture of 14 September 2013), as the maintainer decided on 2026-11-01, once an archive retrieval of 2026-11-02 gave its passage from the capture. “Against Orthogonality” (25 October 2013), “Stupid Monsters” (25 August 2014) and “Will-to-Think” (15 September 2014) were recorded with it as further articulations. Taylor’s review stays on record as a report of Land’s posts.',
      claimIds: [
        'ht-w07-land-2013-pythia-unbound',
        'ht-w07-taylor-2024-book-review-xenosystems',
      ],
      recordedAt: archiveApply,
    },
    {
      propositionId: 'machine-succession',
      replaced:
        'Lanier, One Half of a Manifesto (2000-11-10), headlined as the earliest located text that contests it.',
      reason:
        'Earlier text found: the unsigned article “Lucubratio Ebria” (The Press, 29 July 1865) rejects the view that machines are a separate kind of being whose final triumph over mankind should be expected. Its passage is read in the newspaper’s OCR text; the page image could not be checked.',
      claimIds: [
        'pre-w01-butler-1865-lucubratio-ebria-contests',
        'ht-w01-lanier-2000-one-half-a-manifesto',
      ],
      recordedAt: antecedents,
    },
    {
      propositionId: 'succession-acceptable',
      replaced:
        'No earliest located headline: under re-check from 2026-11-02. Before that, Minsky’s article of October 1994, with wording attested from January 1997, was headlined.',
      reason:
        'Set on 2026-11-07 to Moravec’s chapter of 1989, by the maintainer’s decision on the re-check sheet (decision 16a). A witness check by a model of another family read its opening, p. 167, in the publisher’s copy of the printed volume; that print attests the wording of the record’s first passage, which had been known only from the author’s file of 2001. Minsky’s magazine pages were read only in a copy Selekoa does not cite, as was Moravec’s essay of February 1979, whose wording stays attested from 2001.',
      claimIds: [
        'ht-w02-moravec-1989-genetic-takeover',
        'ht-w02-minsky-1994-will-robots-inherit-the-earth',
      ],
      recordedAt: settled,
    },
  ],
  limits: [
    '“Earliest located” means the earliest text found by the searches described under “How we searched”. It is not a claim of first use or first statement, and the order of texts records no influence.',
    'A record documents what one text says on its date. It is not evidence that the proposition is true, and it does not say what the author holds at another date.',
    'No author is placed in a school, movement or camp. A proposition is phrased generically and attributed to no one, and texts grouped under one proposition disagree about much else.',
    'A naming of an earlier text or author is recorded as a citation, or as a credit where the passage credits the author. It is not agreement and not evidence of influence.',
    'Passages that a text frames as a story, and passages that report another author’s view, are labelled. No passage that advocates violence is quoted.',
    'A machine selected and classified these records, and machine checks from two model families re-examined a sample of them.',
  ],
  axis: frame.axis,
  landing: frame.landing,
  landingAction: frame.landingAction,
  mostDevelopedEmpty: frame.mostDevelopedEmpty,
  earliestEmpty: frame.earliestEmpty,
  related: {
    'machine-succession': [
      {
        propositionId: 'machine-intelligence-exceeds-humans-in-all-domains',
        relation:
          'A narrower claim in the economics collection: exceeding humans in all domains, without succession.',
      },
      {
        propositionId: 'machines-could-think',
        relation:
          'A narrower claim in the collection of antecedent texts: that a machine could think at all.',
      },
      {
        propositionId: 'technological-singularity',
        relation:
          'A different claim in the collection of antecedent texts: a point beyond which human affairs could not continue or be foreseen, which need not involve succession.',
      },
    ],
    'succession-acceptable': [
      {
        propositionId: 'build-superintelligence-fast',
        relation: 'Recorded in Eliezer Yudkowsky’s texts only.',
      },
    ],
    'vast-superiority': [
      {
        propositionId: 'intelligence-explosion',
        relation:
          'A different claim in the superintelligence collection: a runaway rise through the machine’s own design, whatever the size of the eventual gap.',
      },
    ],
    'intelligence-as-own-end': [
      {
        propositionId: 'orthogonality',
        relation:
          'The contrary claim, in the collection on catastrophic risk from advanced AI.',
      },
      {
        propositionId: 'intelligence-brings-benevolence',
        relation:
          'A related claim, recorded in Eliezer Yudkowsky’s texts only: that intelligence brings good values.',
      },
    ],
    'accelerate-machine-intelligence': [
      {
        propositionId: 'build-superintelligence-fast',
        relation: 'Recorded in Eliezer Yudkowsky’s texts only.',
      },
      {
        propositionId: 'competition-defeats-restraint',
        relation:
          'A different claim in the superintelligence collection: that competition defeats restraint, whether or not acceleration is urged.',
      },
    ],
  },
};
