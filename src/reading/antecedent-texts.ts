import type { PropositionsCollection } from '../domain/propositions';
import { antecedentTextsFrame as frame } from './proposition-frames';
import { describeGroups } from './describe-groups';

/** Admitted on 2026-11-04 from the research pack of 2026-11-02 to 2026-11-04. */
const admitted = '2026-11-04';

export const antecedentTexts: PropositionsCollection = {
  id: frame.id,
  version: frame.version,
  title: frame.title,
  question: frame.question,
  editorialStatus: frame.editorialStatus,
  introduction:
    'This collection records what texts written before 1965 say about whether machines can think or originate anything. Two propositions are stated and disputed in the located texts: that a machine can only do what it is ordered to do (U01), and that a machine could think (U02). The located texts run from Descartes’s Discours de la méthode (1637) to Kolmogorov’s letter to A. I. Berg (1961). A third proposition, that machine intelligence will bring a singularity (U03), appears in the located texts only from 1983. The year 1965 is an editorial boundary. It was chosen because the dataset already holds I. J. Good’s “Speculations Concerning the First Ultraintelligent Machine” (1965), which the superintelligence collection records. Nothing in the period itself marks that year, and several of Alan Turing’s texts of the 1950s could have served as the anchor instead. The boundary may be revised. Two texts are fiction and one is a satirical letter. Such a record documents what the work says, not its author’s view. Where a text survives only in a later copy, the date of its wording is shown beside the work’s date. The same texts also bear on propositions in other collections, such as machine succession (W01) and behavioural tests as evidence (C1). Those records appear in their own collections, and the links under each proposition lead to them. Texts are listed in date order; the order records no influence between them.',
  groups: describeGroups(frame.groups, {
    UA: 'Propositions that a machine can only do what it is ordered to do and that a machine could think. A text that contests the first often states the second, but each is recorded under its own criterion.',
    UB: 'The proposition that machine intelligence will bring a singularity. Its located texts are later than 1965; the collection holds it because no other collection has a place for it.',
  }),
  searchNote: {
    scope:
      'The collection records located texts dated from 1637 to 1961 on U01 and U02, and from 1983 to 1993 on U03, with Ulam’s report of 1958 as context. “Earliest located” means the earliest text found by the searches below that meets the criterion, judged by the date from which its quoted wording is attested. It is not a claim that no earlier text exists. On U02 the earliest located text is a satirical letter of 1863. Earliest located novel: Butler, Erewhon (1872). Earliest located non-fiction text: Turing, lecture to the London Mathematical Society (1947-02-20).',
    venues: [
      {
        period: '1637 to 1964',
        items: [
          'The Turing Digital Archive at King’s College, Cambridge: Turing’s lecture to the London Mathematical Society (1947, AMT/B/1), the typescript of Intelligent Machinery (AMT/C/11), his lecture of about 1951 (AMT/B/4), his broadcast script of 1951 (AMT/B/5) and the offprint of “Computing Machinery and Intelligence” (1950, AMT/B/19), read on the scans.',
          'The National Physical Laboratory’s facsimile of Turing’s report Intelligent Machinery (1948), read on the page images.',
          'Internet Archive scans: Scientific Memoirs, vol. III (1843), with the notes signed A. A. L. to Menabrea’s Sketch of the Analytical Engine; Butler’s Erewhon (1872); Hartree’s Calculating Instruments and Machines (1949).',
          'Papers Past: The Press, Christchurch, of 13 June 1863 and 29 July 1865.',
          'The 1637 edition of Descartes’s Discours de la méthode, in page images of the Bibliothèque nationale de France copy.',
          'The British Medical Journal of 25 June 1949, in page scans in PubMed Central.',
          'Čapek’s R.U.R. in the English version (copyright 1923), read in the Project Gutenberg transcription of a later printing; the Czech printing of 1920 was read only by a second check.',
          'Wiener’s Cybernetics (1948, second edition 1961), read in the MIT Press reissue of 2019, and his article in Science (1960); Samuel’s article on checkers (1959).',
          'Kolmogorov’s letter to A. I. Berg (1961), read in its publication of 2023.',
        ],
      },
      {
        period: '1958 to 1993, for U03',
        items: [
          'Vinge’s column “First Word” (Omni, January 1983) and his paper “The Coming Technological Singularity” (1993).',
          'Ulam’s memoir of John von Neumann (1958), which reports a conversation about technology in general. It is recorded on U03 as context, read in the publisher’s PDF on 2026-11-04 and 2026-11-06, after the copy could not be retrieved at admission.',
          'Good’s “Speculations Concerning the First Ultraintelligent Machine” (1965) was read against U03 and is not recorded on it.',
        ],
      },
    ],
    methods: [
      'Sources were retrieved directly by script, one request at a time, from 2026-11-02 to 2026-11-04. Each retrieved text is identified by its SHA-256 hash in the source record.',
      'Where a scan has no text layer, the passages were read on the page images, and the record says so. Every other quotation was matched mechanically against the retrieved text, and matched again in a fresh retrieval at admission on 2026-11-04.',
      'Each record gives the date its text is dated by. Where the quoted wording is known only from a later copy, the record also gives the date from which the wording is attested, and that date decides which text is earliest located.',
      'A fresh-context audit by a Claude model re-read every record. Two checks by an OpenAI model followed, the first answering blind before it compared its answers with the records. The maintainer decided the disagreements on 2026-11-03 and 2026-11-04.',
    ],
    gaps: [
      'The located texts are in English and French, with one Russian letter. The Czech text of R.U.R. was read by the second check only.',
      'Not read: Russian cosmism, Lem’s Summa Technologiae (1964), Wiener’s The Human Use of Human Beings (1950) and von Neumann’s own texts.',
      'Samuel’s reply to Wiener (Science, 1960) is not shown: only its indexed abstract could be read, and the abstract’s author is unknown.',
      'Wiener’s printings of 1948 and 1961, and Kolmogorov’s printed theses, were not available. Their wording is dated by later copies.',
      'The article of 1865 is read in OCR text; its page image could not be checked.',
      'No text disputing U03’s singular transition was located. The dataset holds later texts on the singularity, such as Allen and Greaves (2011), Walsh (2016) and Thorstad (2022), which were not read against U03.',
      'A search that finds nothing does not show that nothing exists.',
    ],
    corrections:
      'A text found later that is earlier than an earliest located text becomes the new earliest located text, and the earlier headline stays on record as a correction.',
  },
  corrections: [
    {
      propositionId: 'machines-could-think',
      replaced: 'Butler, Erewhon (1872), headlined as earliest located.',
      reason:
        'Earlier text found before admission: Butler’s satirical letter “Darwin among the Machines” (The Press, 13 June 1863), read on the newspaper’s column images by a second check of another model family. Erewhon is the earliest located novel.',
      claimIds: [
        'pre-u02-butler-1863-darwin-among-the-machines',
        'pre-u02-erewhon-1872',
      ],
      recordedAt: admitted,
    },
  ],
  limits: [
    '“Earliest located” means the earliest text found by the searches described under “How we searched”. It is not a claim that no earlier text exists.',
    'A record documents what a text says, in its register. It is not evidence that the proposition is true.',
    'The order of texts records their dates. Where a later text names an earlier one, a separate record says so; no other influence is recorded.',
    'A machine selected and classified these records, and machine checks from two model families re-examined them.',
  ],
  axis: frame.axis,
  landing: frame.landing,
  landingAction: frame.landingAction,
  mostDevelopedEmpty: frame.mostDevelopedEmpty,
  earliestEmpty: frame.earliestEmpty,
  related: {
    'machines-only-do-what-they-are-ordered': [
      {
        propositionId: 'control-or-purpose-specification',
        relation:
          'A different claim in the superintelligence collection: that people’s means of directing a machine or specifying its purpose may stop being adequate. Some texts contest U01 in order to argue it.',
      },
      {
        propositionId: 'tool-without-goals',
        relation:
          'A later claim, recorded in Eliezer Yudkowsky’s texts: that an advanced AI is a tool without wants. U01 concerns what a machine can produce, not its goals.',
      },
    ],
    'machines-could-think': [
      {
        propositionId: 'behavioural-tests-as-evidence',
        relation:
          'A narrower claim in the superintelligence collection: that behaviour in a test is weak evidence of what a system is.',
      },
      {
        propositionId: 'machine-intelligence-exceeds-humans-in-all-domains',
        relation:
          'A stronger claim in the economics collection: surpassing humans in essentially all cognitive tasks.',
      },
      {
        propositionId: 'machine-succession',
        relation:
          'A stronger claim in the collection on machine succession: that machines succeed humans as the leading intelligence.',
      },
    ],
    'technological-singularity': [
      {
        propositionId: 'intelligence-explosion',
        relation:
          'A different claim in the superintelligence collection: a runaway rise in intelligence through a machine’s own design.',
      },
      {
        propositionId: 'fast-or-hard-takeoff',
        relation:
          'A claim in the superintelligence collection about the speed of the transition, which U03 does not require.',
      },
      {
        propositionId: 'machine-succession',
        relation:
          'A different claim in the collection on machine succession: succession as the leading intelligence, which a singularity need not involve.',
      },
      {
        propositionId: 'accelerating-growth-from-automated-research',
        relation:
          'An economic claim in the economics collection: accelerating or finite-time growth from automated research.',
      },
    ],
  },
  exchanges: [
    {
      title: 'Lady Lovelace’s objection',
      period: '1843–1951',
      documentIds: [
        'lovelace-1843-notes',
        'hartree-1949-calculating-instruments',
        'turing-1950-computing-machinery',
        'turing-1951-can-digital-computers-think',
      ],
      note: 'The notes signed A. A. L. (1843) say that the Analytical Engine has no pretensions to originate anything. Hartree (1949) quotes them, and Turing quotes both in 1950 and answers the objection, as his broadcast script of 1951 does again. Each naming is its own record.',
    },
  ],
};
