import type { PropositionsCollection } from '../domain/propositions';
import { yudkowskyArgumentsFrame as frame } from './proposition-frames';

export const yudkowskyArguments: PropositionsCollection = {
  id: frame.id,
  version: frame.version,
  title: frame.title,
  question: frame.question,
  editorialStatus: frame.editorialStatus,
  introduction:
    'Each claim is recorded as a proposition with one criterion. It is phrased generically and attributed to no one. A text of his that meets the criterion articulates the proposition. A text that disputes it, or a premise it depends on, contests it, and the record says whether the passage gives a reason against a premise or states the contrary only. A text that comes close bears on it, and its record names what is missing. Texts are listed in date order. The page records what he wrote and when. It does not assess whether he was right.',
  groups: frame.groups,
  searchNote: {
    scope:
      'The collection records passages from Yudkowsky’s own writing only. “Earliest located” means the earliest of his texts that the searches below found. It does not mean that he made the point before anyone else, and an earlier text of his may exist outside these searches.',
    venues: [
      {
        period: 'Mailing lists, 1996 to 2009',
        items: [
          'The Extropians mailing list: all 3,012 messages listed under his name in the author indexes of the archive at extropians.weidai.com, from 1996-11 to 2003-09 and 2008-09, read in full.',
          'The SL4 mailing list: all 1,876 messages listed under his name in the author indexes of the 142 monthly folders of the archive at sl4.org, from 2000 to 2009, read in full.',
        ],
      },
      {
        period: 'Posts, papers and pages, 1996 to 2026',
        items: [
          'LessWrong: every post listed under his account on 2026-10-06, 1,076 posts, including his Overcoming Bias posts of 2006–2009 imported to LessWrong, book reposts of 2015 and co-authored dialogues.',
          'Five MIRI publications, read in MIRI’s PDFs: Creating Friendly AI (2001), Coherent Extrapolated Volition (2004), his chapter in Global Catastrophic Risks (2008), Intelligence Explosion Microeconomics (2013) and Corrigibility (2015, with three co-authors).',
          'His TIME article of 29 March 2023, the AI-box experiment page on yudkowsky.net, Staring into the Singularity as captured on 2000-12-04, and four Arbital pages read through a third-party viewer.',
        ],
      },
    ],
    methods: [
      'Sources were retrieved directly by script on 2026-10-06 and 2026-10-07, one request at a time. Each retrieved text is identified by its SHA-256 hash in the source record.',
      'Machine searches read the retrieved texts proposition by proposition, with regular expressions for each premise. Lines quoting other writers were removed from messages first. Each proposition’s search record, with the expressions used and the passages seen but not used, is kept with the research pack in the Selekoa repository (research/yudkowsky-arguments).',
      'Every quotation was compared with the retrieved text. Quotations from LessWrong posts edited after posting were also compared with the version stored on the day of posting.',
      'A passage engages a premise when its paragraph, message or dialogue turn gives a reason against that premise. A passage that states the contrary conclusion without such a reason is recorded as stating the contrary. This message-level rule is a maintainer decision of 2026-10-08.',
      'Wording known only from MIRI’s later reprints was compared on 2026-10-08 with the 2001 web edition of Creating Friendly AI and the 2006 draft of the Global Catastrophic Risks chapter. Where the same wording was found, the record is dated by that copy. Otherwise it says that its wording is known only from a later copy, and it cannot be the earliest located text.',
      'Fresh-context machine audits by Claude Opus 5.5 models re-read every passage. A check by an OpenAI GPT-6 model re-examined 94 sampled passages and 13 comparison passages, and a correction pass settled each of its findings. No person has reviewed the records.',
      'Quotations are at most 50 words. Nine were shortened or replaced by paraphrases because the dataset already quotes the same sources, and together the quotations would exceed the limit per document.',
    ],
    gaps: [
      'Not searched: comments on LessWrong and the Alignment Forum, social media, podcasts and interviews, his books, including If Anyone Builds It, Everyone Dies (2025, with Nate Soares), and his fiction, except posts cited as parables.',
      'Extropians list messages before 1996-07-25 are not in the archive used, and its folder for the second quarter of 2002 returned HTTP 404.',
      'His early pages on sysopmind.com and yudkowsky.net were read only in the copies named above. Other Singularity Institute and MIRI papers and most of Arbital were not searched.',
      'The mailing-list archives serve pages with later rewriting of addresses, so they do not authenticate the historical bytes of a message.',
      'Coherent Extrapolated Volition, one table of Creating Friendly AI and the AI-box page are known only from later copies, which were not compared with copies of their original years.',
      'Arbital pages could be edited after creation; their dates are those the viewer shows.',
      'No search was made for other writers who made the same arguments, so the page says nothing about who made a point earlier or later than he did.',
    ],
    corrections:
      'A text of his found later that is earlier than an earliest located text becomes the new earliest located text, and the earlier headline stays on record as a correction.',
  },
  corrections: [],
  limits: [
    '“Earliest located” means the earliest of his texts that the searches described under “How we searched” found. It is not a claim of first use.',
    'A record documents what a text says, in its register. It is not evidence that the proposition is true or false, and no record links one text to another.',
    'The propositions were phrased for this collection and are attributed to no one. Their criteria and premises have had no human review, and changing them would change the records.',
    'An earlier text of his that states a proposition is shown with his later texts that contest it. The pairing is computed from the records. Some later texts do not refer back to the earlier one, and their qualifications say so.',
    'A passage that would mislead on its own is marked “shown only with its context” and is never shown without that context.',
    'Codes such as T13-a in qualifications refer to the passages of the research pack the records come from; T01 corresponds to Y01.',
    'A machine selected and classified these records, and machine checks re-examined them. No person has reviewed them.',
  ],
  axis: frame.axis,
  landing: frame.landing,
  landingAction: frame.landingAction,
  mostDevelopedEmpty: frame.mostDevelopedEmpty,
  earliestEmpty: frame.earliestEmpty,
  related: {
    'intelligence-brings-benevolence': [
      {
        propositionId: 'orthogonality',
        relation:
          'The contrary proposition in the collection on catastrophic risk, recorded from texts by many authors.',
      },
      {
        propositionId: 'benevolence-or-no-drive-to-dominate',
        relation:
          'A related proposition in the collection on catastrophic risk, recorded from texts by many authors.',
      },
    ],
    'harm-requires-hostility': [
      {
        propositionId: 'instrumental-convergence',
        relation:
          'A related proposition in the collection on catastrophic risk, recorded from texts by many authors.',
      },
    ],
    'risk-is-film-fiction': [
      {
        propositionId: 'risk-claims-speculative',
        relation:
          'A related proposition in the collection on catastrophic risk, recorded from texts by many authors.',
      },
    ],
    'agi-decades-away': [
      {
        propositionId: 'capabilities-plateau',
        relation:
          'A related proposition in the collection on catastrophic risk, recorded from texts by many authors.',
      },
    ],
    'next-word-prediction-is-shallow': [
      {
        propositionId: 'llms-lack-agency',
        relation:
          'A related proposition in the collection on catastrophic risk, recorded from texts by many authors.',
      },
    ],
    'tool-without-goals': [
      {
        propositionId: 'llms-lack-agency',
        relation:
          'A related proposition in the collection on catastrophic risk, recorded from texts by many authors.',
      },
    ],
    'slow-takeoff-time-to-adjust': [
      {
        propositionId: 'gradual-takeoff',
        relation:
          'A related proposition in the collection on catastrophic risk, recorded from texts by many authors.',
      },
    ],
  },
  openPremises: {
    'pause-or-regulation-suffices': [
      'No located passage discusses whether a fixed but longer pause, short of an indefinite halt, would suffice.',
    ],
    'build-it-before-rivals': [
      'T24-P1 is addressed only through "no true owner" (2023) and the 2008 first-mover definition; no located passage argues the control point at length.',
    ],
  },
};
