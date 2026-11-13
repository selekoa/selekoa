import type { PropositionsCollection } from '../domain/propositions';
import { yudkowskyArgumentsFrame as frame } from './proposition-frames';
import { describeGroups } from './describe-groups';

/** The maintainer's decisions of 2026-11-02 on the archive retrieval of held sources. */
const archiveApply = '2026-11-02';

/** The maintainer's decisions of 2026-11-02 on the earliest-located re-check (decisions 1 to 4). */
const recheckDecisions = '2026-11-02';

/** The interim withdrawal of 2026-11-02: headlines the cross-family re-check marks move or undecidable. */
const recheckWithdrawn = '2026-11-02';

/** The maintainer's decision on the pre-launch audit (PA-01, PA-02). */
const withdrawn = '2026-11-02';

/** The maintainer's decisions of 2026-11-02 on the cross-family audit sample. */
const auditSample = '2026-11-02';

/** The maintainer's answers of 2026-11-07 on the re-check sheet and the reads of that day. */
const settled = '2026-11-07';

export const yudkowskyArguments: PropositionsCollection = {
  id: frame.id,
  version: frame.version,
  title: frame.title,
  question: frame.question,
  editorialStatus: frame.editorialStatus,
  introduction:
    'Each claim is recorded as a proposition with one criterion. It is phrased generically and attributed to no one. A text of his that meets the criterion articulates the proposition. A text that disputes it, or a premise it depends on, contests it, and the record says whether the passage gives a reason against a premise or states the contrary only. A text that comes close bears on it, and its record names what is missing. Texts are listed in date order. The page records what he wrote and when. It does not assess whether he was right.',
  groups: describeGroups(frame.groups, {
    Y: 'Claims often made about advanced AI, phrased generically for this collection. The codes follow the numbers of the research pack the records come from, which has no Y23.',
  }),
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
      'Fresh-context machine audits by Claude Opus 5.5 models re-read every passage. A check by an OpenAI GPT-6 model re-examined 94 sampled passages and 13 comparison passages, and a correction pass settled each of its findings.',
      'An archive retrieval of 2026-11-02 by an OpenAI model read Staring into the Singularity in its capture of 4 December 2000 and gave the passage on timelines verbatim with the capture’s SHA-256 hash. The record admitted from it quotes that passage; the session that applied it could not reach the archive and did not retrieve it again.',
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
  corrections: [
    {
      propositionId: 'warning-signs-in-time',
      replaced:
        'His Extropians message of 1999-01-06 (0160), headlined as the earliest located text that contests the proposition.',
      reason:
        'Withdrawn on 2026-11-02 by the maintainer’s decision on the cross-family audit sample of 2026-11-02 (item 117), pending a re-check of the proposition’s candidate texts; no record holds the headline meanwhile. The message argues that superintelligent action will be too fast to notice, but does not explicitly address a recognisable warning before danger, failures first seen in weaker systems, or action on a warning. It is now recorded as bearing on the proposition, not contesting it.',
      claimIds: ['yk-y08-extropians-1999-01-06-yudkowsky-0160-c'],
      recordedAt: auditSample,
    },
    {
      propositionId: 'build-superintelligence-fast',
      replaced:
        'His SL4 message of 13 November 2000, headlined as the earliest located text that contests the proposition.',
      reason:
        'Withdrawn on 2026-11-02 by the maintainer’s decision on the pre-launch audit (PA-02), pending a cross-family re-check; no record holds the headline meanwhile. The record’s own qualification says the message rejects automatic goodness, not speed: in the next paragraph he is still “devoting my life to making the Singularity happen earlier”.',
      claimIds: ['yk-y22-sl4-2000-11-13-yudkowsky-0011-0181-c'],
      recordedAt: withdrawn,
    },
    {
      propositionId: 'short-instruction-suffices',
      replaced:
        'Yudkowsky, Extropians message of 1998-12-06 (2153), headlined as the earliest located text that contests the proposition.',
      reason:
        'Withdrawn on 2026-11-02 by the maintainer’s decision to withdraw every headline the cross-family re-check proposes to move or could not decide, pending adjudication; no record holds the headline meanwhile. The re-check proposes an earlier text the dataset holds: The author’s December 8, 1996 reply already rejects imprinting compact Three Laws as sufficient safe instructions, explaining that they could backfire. This meets the general short-goal criterion before the 1998 human-survival example.',
      claimIds: ['yk-y04-extropians-1998-12-06-yudkowsky-2153-c'],
      recordedAt: recheckWithdrawn,
    },
    {
      propositionId: 'feedback-instils-values',
      replaced:
        'Yudkowsky, Extropians message of 1999-08-04 (1587), headlined as the earliest located text that contests the proposition.',
      reason:
        'Withdrawn on 2026-11-02 by the maintainer’s decision to withdraw every headline the cross-family re-check proposes to move or could not decide, pending adjudication; no record holds the headline meanwhile. The re-check proposes an earlier text the dataset holds: The same-day message 1589 already states that parenting depends on human emotions absent in AI. Its sent header is 18:47:55 -0500, fifteen seconds before 1587 at 18:48:10; receipt order agrees.',
      claimIds: ['yk-y05-extropians-1999-08-04-yudkowsky-1587-c'],
      recordedAt: recheckWithdrawn,
    },
    {
      propositionId: 'slow-takeoff-time-to-adjust',
      replaced:
        'Yudkowsky, Extropians message of 1998-09-08 (2235), headlined as the earliest located text that contests the proposition.',
      reason:
        'Withdrawn on 2026-11-02 by the maintainer’s decision to withdraw every headline the cross-family re-check proposes to move or could not decide, pending adjudication; no record holds the headline meanwhile. The re-check proposes an earlier text the dataset holds: The September 7 message already contrasts a bottleneck and sharp upward snap with steady increase, passing human intelligence rapidly and reaching infrastructure capability. It explicitly opposes gradual-visible gains one day before the September 8 headline; no precise hours-to-months claim is needed for this different criterion.',
      claimIds: ['yk-y11-extropians-1998-09-08-yudkowsky-2235-c'],
      recordedAt: recheckWithdrawn,
    },
    {
      propositionId: 'evaluations-catch-danger',
      replaced:
        'Yudkowsky, Creating Friendly AI (2001), headlined as the earliest located text that contests the proposition.',
      reason:
        'Withdrawn on 2026-11-02 by the maintainer’s decision to withdraw every headline the cross-family re-check proposes to move or could not decide, pending adjudication; no record holds the headline meanwhile. The re-check proposes an earlier text the dataset holds: The December 31, 1996 own confinement reply already says an evil system can lie convincingly to gain release, explicitly challenging the inference from safe-looking assessed behavior. It precedes the 2001 flight-recorder passage, whose wording is attested June 17.',
      claimIds: ['yk-y12-creating-friendly-ai-2001-c'],
      recordedAt: recheckWithdrawn,
    },
    {
      propositionId: 'agi-decades-away',
      replaced:
        '“Artificial Intelligence as a Positive and Negative Factor in Global Risk” (2006), headlined as the earliest located text that contests the proposition.',
      reason:
        'Withdrawn on 2026-11-02 by the maintainer’s decision to withdraw every headline the cross-family re-check proposes to move or could not decide, pending adjudication; no record holds the headline meanwhile. The re-check proposes an earlier text the dataset holds: The held essay explicitly rejects a secure decades-long lower bound and waiting. Its December 4, 2000 capture precedes the 2006 draft and July 2006 capture, even though the inspected wording cannot be backdated to the essay’s 1996 creation. This contests the timeline-certainty premise; its positive Singularity strategy is distinct.',
      claimIds: ['yk-y13-ai-positive-negative-factor-global-risk-c'],
      recordedAt: recheckWithdrawn,
    },
    {
      propositionId: 'earth-not-worth-taking',
      replaced:
        'Yudkowsky, Extropians message of 1999-08-25 (2783), headlined as the earliest located text that contests the proposition.',
      reason:
        'Withdrawn on 2026-11-02 by the maintainer’s decision to withdraw every headline the cross-family re-check proposes to move or could not decide, pending adjudication; no record holds the headline meanwhile. The re-check proposes an earlier text the dataset holds: The September 7, 1998 own spare-atoms argument already gives an alternative use of human matter as a reason for erasing humanity without threat or hostility. It contests the premise that preserving humans is automatically costless or uninteresting to a superior mind, before the August 1999 atoms reply.',
      claimIds: ['yk-y18-extropians-1999-08-25-yudkowsky-2783-c'],
      recordedAt: recheckWithdrawn,
    },
    {
      propositionId: 'interpretability-reads-its-mind',
      replaced:
        'Yudkowsky, SL4 message of 2003-05-22 (6783), headlined as the earliest located text that contests the proposition.',
      reason:
        'Withdrawn on 2026-11-02 by the maintainer’s decision to withdraw every headline the cross-family re-check proposes to move or could not decide, pending adjudication; no record holds the headline meanwhile. The re-check proposes an earlier text the dataset holds: The original seed chapter already states that a poor recorder only works if an obscuring intention is visible, recognizable and recorded before obscuration. These are explicit limits on reading thought from records, before the May 2003 stronger warning about nonautomatic detection.',
      claimIds: ['yk-y25-sl4-2003-05-22-yudkowsky-0305-6783-c'],
      recordedAt: recheckWithdrawn,
    },
    {
      propositionId: 'experiment-and-see',
      replaced:
        'Yudkowsky, SL4 message of 2000-09-17 (0092), headlined as the earliest located text that contests the proposition.',
      reason:
        'Withdrawn on 2026-11-02 by the maintainer’s decision to withdraw every headline the cross-family re-check proposes to move or could not decide, pending adjudication; no record holds the headline meanwhile. The re-check proposes an earlier text the dataset holds: The September 5 own reply already rejects trying a superintelligence and putting it down afterward: the decision must occur before it becomes superintelligent. This contests learning from a dangerous frontier failure before the September 17 get-it-right argument.',
      claimIds: ['yk-y27-sl4-2000-09-17-yudkowsky-0009-0092-c'],
      recordedAt: recheckWithdrawn,
    },
    {
      propositionId: 'developers-know-what-they-are-doing',
      replaced:
        'Yudkowsky, Creating Friendly AI (2001), headlined as earliest located.',
      reason:
        'Withdrawn on 2026-11-02 by the maintainer’s decision to withdraw every headline the cross-family re-check proposes to move or could not decide, pending adjudication; no record holds the headline meanwhile. The re-check proposes an earlier text the dataset holds: The September 29, 2000 own reply already gives a project’s developers’ understanding and sustained Friendliness work as reasons to defer to their safety judgment. It predates the policy chapter attested June 17, 2001.',
      claimIds: ['yk-y28-creating-friendly-ai-2001-a'],
      recordedAt: recheckWithdrawn,
    },
    {
      propositionId: 'developers-know-what-they-are-doing',
      replaced:
        'Yudkowsky, SL4 message of 2001-08-01 (2031), headlined as the earliest located text that contests the proposition.',
      reason:
        'Withdrawn on 2026-11-02 by the maintainer’s decision to withdraw every headline the cross-family re-check proposes to move or could not decide, pending adjudication; no record holds the headline meanwhile. The re-check proposes an earlier text the dataset holds: The April 12, 2001 own closed-source explanation already says a competitor could outrun the main project merely with additional computation, creating Friendliness risk. This explicitly separates the leading project from superior safety competence before the August message.',
      claimIds: ['yk-y28-sl4-2001-08-01-yudkowsky-0108-2031-c'],
      recordedAt: recheckWithdrawn,
    },
    {
      propositionId: 'default-outcome-good',
      replaced:
        'Yudkowsky, SL4 message of 2000-11-13 (0181), headlined as the earliest located text that contests the proposition.',
      reason:
        'Withdrawn on 2026-11-02 by the maintainer’s decision to withdraw every headline the cross-family re-check proposes to move or could not decide, pending adjudication; no record holds the headline meanwhile. The re-check proposes an earlier text the dataset holds: The August 1, 1999 own reply already withdraws assured benevolence and gives uncertain survival odds around a coin flip. It contests the default-good expectation earlier than the explicit November 2000 retrospective explanation; the earlier posting dates its own argument rather than the belief’s unrecorded onset.',
      claimIds: ['yk-y30-sl4-2000-11-13-yudkowsky-0011-0181-c'],
      recordedAt: recheckWithdrawn,
    },
    {
      propositionId: 'short-instruction-suffices',
      replaced:
        'No earliest located contesting headline: under re-check from 2026-11-02. Before that, his message of 6 December 1998 was headlined.',
      reason:
        'Moved on 2026-11-02 to his message of 8 December 1996, by the maintainer’s decision on the cross-family re-check (role 80). The text contests the proposition and is dated before his message of 6 December 1998. The record was admitted on this proposition with a passage matched against the held text.',
      claimIds: [
        'yk-y04-extropians-1996-12-08-yudkowsky-3761-c',
        'yk-y04-extropians-1998-12-06-yudkowsky-2153-c',
      ],
      recordedAt: recheckDecisions,
    },
    {
      propositionId: 'slow-takeoff-time-to-adjust',
      replaced:
        'No earliest located contesting headline: under re-check from 2026-11-02. Before that, his message of 8 September 1998 was headlined.',
      reason:
        'Moved on 2026-11-02 to his message of 7 September 1998, by the maintainer’s decision on the cross-family re-check (role 87). The text contests the proposition and is dated before his message of 8 September 1998. The record was admitted on this proposition with a passage matched against the held text.',
      claimIds: [
        'yk-y11-extropians-1998-09-07-yudkowsky-2209-c',
        'yk-y11-extropians-1998-09-08-yudkowsky-2235-c',
      ],
      recordedAt: recheckDecisions,
    },
    {
      propositionId: 'evaluations-catch-danger',
      replaced:
        'No earliest located contesting headline: under re-check from 2026-11-02. Before that, Creating Friendly AI (2001; wording attested 17 June 2001) was headlined.',
      reason:
        'Moved on 2026-11-02 to his message of 31 December 1996, by the maintainer’s decision on the cross-family re-check (role 88). The text contests the proposition and is dated before Creating Friendly AI. The record was admitted on this proposition with a passage matched against the held text.',
      claimIds: [
        'yk-y12-extropians-1996-12-31-yudkowsky-5142-c',
        'yk-y12-creating-friendly-ai-2001-c',
      ],
      recordedAt: recheckDecisions,
    },
    {
      propositionId: 'earth-not-worth-taking',
      replaced:
        'No earliest located contesting headline: under re-check from 2026-11-02. Before that, his message of 25 August 1999 was headlined.',
      reason:
        'Moved on 2026-11-02 to his message of 7 September 1998, by the maintainer’s decision on the cross-family re-check (role 94). The text contests the proposition and is dated before his message of 25 August 1999. The record was admitted on this proposition with a passage matched against the held text.',
      claimIds: [
        'yk-y18-extropians-1998-09-07-yudkowsky-2171-c',
        'yk-y18-extropians-1999-08-25-yudkowsky-2783-c',
      ],
      recordedAt: recheckDecisions,
    },
    {
      propositionId: 'experiment-and-see',
      replaced:
        'No earliest located contesting headline: under re-check from 2026-11-02. Before that, his SL4 message of 17 September 2000 was headlined.',
      reason:
        'Moved on 2026-11-02 to his Extropians message of 5 September 2000, by the maintainer’s decision on the cross-family re-check (role 104). The text contests the proposition and is dated before his SL4 message of 17 September 2000. The record was admitted on this proposition with a passage matched against the held text.',
      claimIds: [
        'yk-y27-extropians-2000-09-05-yudkowsky-4277-c',
        'yk-y27-sl4-2000-09-17-yudkowsky-0009-0092-c',
      ],
      recordedAt: recheckDecisions,
    },
    {
      propositionId: 'default-outcome-good',
      replaced:
        'No earliest located contesting headline: under re-check from 2026-11-02. Before that, his SL4 message of 13 November 2000 was headlined.',
      reason:
        'Moved on 2026-11-02 to his Extropians message of 1 August 1999, by the maintainer’s decision on the cross-family re-check (role 108). The text contests the proposition and is dated before his SL4 message of 13 November 2000. The record was admitted on this proposition with a passage matched against the held text.',
      claimIds: [
        'yk-y30-extropians-1999-08-01-yudkowsky-1386-c',
        'yk-y30-sl4-2000-11-13-yudkowsky-0011-0181-c',
      ],
      recordedAt: recheckDecisions,
    },
    {
      propositionId: 'agi-decades-away',
      replaced:
        'No earliest located contesting headline: under re-check from 2026-11-02. Before that, “Artificial Intelligence as a Positive and Negative Factor in Global Risk” (draft of 5 February 2006) was headlined.',
      reason:
        'Moved on 2026-11-02 to “Staring into the Singularity”, version 1.2.1 (updated 31 August 2000; wording attested 4 December 2000), by the maintainer’s decision of 2026-11-02 on the cross-family re-check (role 89), once an archive retrieval of 2026-11-02 gave the passage from the capture. The text contests the proposition’s premise that AGI can be known to be decades away, and its wording is attested before the draft of 2006. Its own recommendation is to bring about the Singularity, not his later safety position. The record was admitted on this proposition with that passage.',
      claimIds: [
        'yk-y13-staring-into-the-singularity-c',
        'yk-y13-ai-positive-negative-factor-global-risk-c',
      ],
      recordedAt: archiveApply,
    },
    {
      propositionId: 'feedback-instils-values',
      replaced:
        'No earliest located contesting headline: under re-check from 2026-11-02. Before that, his Extropians message 1587 of 4 August 1999 was headlined.',
      reason:
        'Moved on 2026-11-07 to his message 1589 of the same day, by the maintainer’s decision on the re-check sheet (decision 9a), after the cross-family re-check of 2026-11-02 (role 81). The two near-identical messages are dated by day; the send times their headers print (18:47:55 and 18:48:10) put 1589 first, and both records now give them.',
      claimIds: [
        'yk-y05-extropians-1999-08-04-yudkowsky-1589-c',
        'yk-y05-extropians-1999-08-04-yudkowsky-1587-c',
      ],
      recordedAt: settled,
    },
    {
      propositionId: 'warning-signs-in-time',
      replaced:
        'No earliest located contesting headline: under re-check from 2026-11-02. Before that, his Extropians message of 6 January 1999 was headlined.',
      reason:
        'Set on 2026-11-07 to “Artificial Intelligence as a Positive and Negative Factor in Global Risk” (draft of 5 February 2006), by the maintainer’s decision on the re-check sheet (decision 18a). A witness check by a model of another family read the remaining contesting records in date order: his SL4 message of 13 July 2005 does not say whether a warning would come before danger, so it is now recorded as bearing on the proposition; the 2006 chapter meets the criterion.',
      claimIds: [
        'yk-y08-ai-positive-negative-factor-global-risk-c',
        'yk-y08-sl4-2005-07-13-yudkowsky-0507-11477-c',
      ],
      recordedAt: settled,
    },
    {
      propositionId: 'build-superintelligence-fast',
      replaced:
        'No earliest located contesting headline: under re-check from 2026-11-02. Before that, his SL4 message of 13 November 2000 was headlined.',
      reason:
        'Moved on 2026-11-07 to his Extropians message of 1 August 1999, by the maintainer’s decision on the re-check sheet (decision 10a), after the cross-family re-check of 2026-11-02 (role 99): the message withdraws his belief that the outcome would be good by default, the proposition’s premise. A challenge to the premise is counted as contesting, as elsewhere in the dataset.',
      claimIds: [
        'yk-y22-extropians-1999-08-01-yudkowsky-1386-c',
        'yk-y22-sl4-2000-11-13-yudkowsky-0011-0181-c',
      ],
      recordedAt: settled,
    },
    {
      propositionId: 'interpretability-reads-its-mind',
      replaced:
        'No earliest located contesting headline: under re-check from 2026-11-02. Before that, his SL4 message of 22 May 2003 was headlined.',
      reason:
        'Moved on 2026-11-07 to “Creating Friendly AI” (2001), by the maintainer’s decision on the re-check sheet (decision 3a), after the cross-family re-check of 2026-11-02 (role 102): its flight-recorder section states three conditions under which reading an AI’s intentions from a record works. A new contesting record quotes that passage; the document’s table of design assumptions stays recorded as context.',
      claimIds: [
        'yk-y25-creating-friendly-ai-2001-c',
        'yk-y25-sl4-2003-05-22-yudkowsky-0305-6783-c',
      ],
      recordedAt: settled,
    },
    {
      propositionId: 'developers-know-what-they-are-doing',
      replaced:
        'No earliest located headline: under re-check from 2026-11-02. Before that, “Creating Friendly AI” (2001) was headlined.',
      reason:
        'Moved on 2026-11-07 to his Extropians message of 29 September 2000, by the maintainer’s decision on the re-check sheet (decision 4a), after the cross-family re-check of 2026-11-02 (role 105): it gives builders’ understanding and sustained work on Friendliness as reasons to defer to their safety judgment. Its record, context until then, now states the proposition.',
      claimIds: [
        'yk-y28-extropians-2000-09-29-yudkowsky-6073-b',
        'yk-y28-creating-friendly-ai-2001-a',
      ],
      recordedAt: settled,
    },
    {
      propositionId: 'developers-know-what-they-are-doing',
      replaced:
        'No earliest located contesting headline: under re-check from 2026-11-02. Before that, his SL4 message of 1 August 2001 was headlined.',
      reason:
        'Moved on 2026-11-07 to his SL4 message of 12 April 2001, by the maintainer’s decision on the re-check sheet (decision 1a), after the cross-family re-check of 2026-11-02 (role 106): it says anyone could outrace the main project just by adding computing power. It is recorded as a paraphrase, because the message’s quotable words are already used.',
      claimIds: [
        'yk-y28-sl4-2001-04-12-yudkowsky-0104-1076-c',
        'yk-y28-sl4-2001-08-01-yudkowsky-0108-2031-c',
      ],
      recordedAt: settled,
    },
  ],
  limits: [
    '“Earliest located” means the earliest of his texts that the searches described under “How we searched” found. It is not a claim of first use.',
    'A record documents what a text says, in its register. It is not evidence that the proposition is true or false, and no record links one text to another.',
    'The propositions were phrased for this collection and are attributed to no one. Changing their criteria or premises would change the records.',
    'An earlier text of his that states a proposition is shown with his later texts that contest it. The pairing is computed from the records. Some later texts do not refer back to the earlier one, and their qualifications say so.',
    'A passage that would mislead on its own is marked “shown only with its context” and is never shown without that context.',
    'Codes such as T13-a in qualifications refer to the passages of the research pack the records come from; T01 corresponds to Y01.',
    'A machine selected and classified these records, and machine checks re-examined them.',
  ],
  axis: frame.axis,
  landing: frame.landing,
  landingAction: frame.landingAction,
  mostDevelopedEmpty: frame.mostDevelopedEmpty,
  earliestEmpty: frame.earliestEmpty,
  related: {
    'build-superintelligence-fast': [
      {
        propositionId: 'succession-acceptable',
        relation:
          'A related proposition in the collection on machine succession, scale and acceleration, recorded from texts by many authors.',
      },
      {
        propositionId: 'accelerate-machine-intelligence',
        relation:
          'A related proposition in the collection on machine succession, scale and acceleration, recorded from texts by many authors.',
      },
    ],
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
      {
        propositionId: 'intelligence-as-own-end',
        relation:
          'A related proposition in the collection on machine succession, scale and acceleration: that the growth of intelligence is its own end.',
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
      {
        propositionId: 'machines-only-do-what-they-are-ordered',
        relation:
          'An earlier claim in the collection of antecedent texts: that a machine can only do what it is ordered to do. It concerns what a machine can produce, not its goals.',
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
