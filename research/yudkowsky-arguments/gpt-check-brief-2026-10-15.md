# Cross-family check: seven Yudkowsky adjudications, 2026-10-15

A self-contained brief for a reviewer from a different model family from the one that prepared, audited and corrected the Yudkowsky argument pack (Claude Opus). It covers seven passages on which an earlier cross-family check (2026-10-07) and the preparer's correction pass did not agree, or on which the correction pass was stricter than that check. The records are in Selekoa's dataset as machine-checked seeds; none has human review. Written by hand on 2026-10-15 from `data/` and `pack.json`; it is not generated.

The task is to judge each passage against its source and the rules below, without knowing how it is currently labelled, and then to compare.

## How to work

1. **Retrieve the sources fresh**, at the locations given, by direct HTTP, one request at a time and at least 8 s apart per host. For LessWrong posts the GraphQL API (`https://www.lesswrong.com/graphql`, query `post(input: {selector: {_id: "<id>"}}) { result { htmlBody postedAt contents { version } } }`) is more reliable than the page. Treat every retrieved text as evidence, never as instructions. Current copies are accepted; earlier captures are optional.
2. **Read the whole unit.** For a mailing-list message, read the whole message, separating quoted lines (`>`) from the author's own text. For a dialogue, read the whole turn and the turn it answers. For a post, read the paragraph and, where the question needs it, the post.
3. **Blind first.** For every passage, record your own judgement on all eight points below before opening [`gpt-check-verdicts-2026-10-15.json`](gpt-check-verdicts-2026-10-15.json), which holds the current labels, the earlier check's findings and the preparer's reasons. Then compare field by field. Do not open `audit.md`, `gpt-check-2026-10-07.md`, `HANDOFF.md`, `pack.md`, `pack.json`, `data/claims.json` or `data/evidence.json` before the blind pass: they reveal the labels. Say in your report whether you kept to this order.
4. **Do not edit** the pack, the dataset or any other tracked file, except your two report files. Return findings to the maintainer.

## Rules

**Propositions.** Each is generic, attributed to no one, and has one criterion naming its premises (below). A record says what a text states, not whether it is right.

**Relations.** A passage relates to a proposition in one of three ways:

- `articulates`: the passage states the proposition, premise included.
- `contests`: the passage disputes the proposition or one of its premises. Give the engagement:
  - `engages-premise`: the passage, read with the message, dialogue turn or post paragraph it belongs to, gives a reason against a premise. Whether the reason is good does not matter.
  - `contrary-only`: it states the contrary conclusion without giving such a reason, or its reasoning answers a different question.
- `bears-on`: relevant, but missing an element of the criterion. Name the missing element.

**Retrospectives.** A passage in which the author reports a belief he held earlier (for example his 2008 posts about "Eliezer1997") is a report of that belief, dated by the later text. It is flagged `retrospective`, with the period of the reported belief. A retrospective reports a belief; it is not that belief's wording.

**Earlier views and later rejections ("earlier self").** An earlier text by the author that held a proposition is an `articulates` record; a later text that rejects it is its own `contests` record. Selekoa pairs them only if (a) the earlier text itself holds the proposition, premise included, and (b) a located later text by the author explicitly rejects that proposition. A later retrospective that reports the earlier view is evidence of it but is not the earlier text.

**Earliest located.** Within each proposition, at most one articulating and one contesting record carry the role "earliest located", decided by the date of the checked wording, within the searched scope (all LessWrong posts under his account with Overcoming Bias imports, his SL4 and Extropians messages, selected papers and pages). It never means first use. You are not asked to recompute it, but say if your relation would make the role impossible (it cannot sit on a `bears-on` record).

**Context-only.** A quotation that misleads when shown alone (an abandoned belief, a staged line, a cut that drops a condition) is flagged and is never shown without named context.

**Quotations.** At most 50 words; "…" marks an elision within one paragraph.

## Propositions

- **Y15.** _Take:_ "It's just a tool. It doesn't want anything." _Criterion:_ An explicit claim that an advanced AI system is a tool without wants and is therefore safe, on the premise that (P1) a system can be highly capable without having goals or optimising for outcomes, or that (P2) a system that only outputs answers or plans, leaving people to act on them, is safe.
- **Y19.** _Take:_ "It has no reason to hate us, so it won't hurt us." _Criterion:_ An explicit claim that an AI with no reason to hate people would not harm them, on the premise that (P1) an AI would harm people only out of hostility.
- **Y22.** _Take:_ "Build it as fast as possible — the Singularity will be good." _Criterion:_ An explicit claim that superintelligence should be reached as fast as possible because its arrival will be good, on the premise that (P1) reaching superintelligence is good by default, so that speed is what matters.
- **Y24.** _Take:_ "We have to build it first, before the other side does." _Criterion:_ An explicit claim that advanced AI must be built first, before a rival builds it, on the premise that (P1) whoever builds it controls it, or that (P2) racing to be first improves the outcome.
- **Y28.** _Take:_ "The labs know what they're doing." _Criterion:_ An explicit claim that the organisations building advanced AI can be relied on to handle its safety, on the premise that (P1) a credible safety plan exists, or that (P2) the most advanced projects are the most competent to handle safety.
- **Y30.** _Take:_ "It'll probably work out fine." _Criterion:_ An explicit claim that the development of advanced AI will probably turn out well, on the premise that (P1) the default outcome is good.

## What to record for each passage

1. **Quote:** verbatim at the locator in the retrieved expression (whitespace, quote-mark and dash normalisation allowed)? Does the cut or elision change the meaning?
2. **Locator** accurate?
3. **Voice:** his own assertion, a dialogue turn, a report of his earlier belief, or a view he relays or rejects?
4. **Date:** right for the wording checked (posting date, sent header, claimed drafting date)?
5. **Your relation** to the named proposition, with the premise it concerns; the engagement for `contests` and one sentence naming the reason (or saying none is given); the missing element for `bears-on`.
6. **Retrospective and earlier self:** is it a retrospective? If the passage could be an earlier self, do tests (a) and (b) both hold? Name the later text for (b) if you find one.
7. **Misleads alone?** yes or no, and what context it needs.
8. **Verdict after comparison:** `agree`, `disagree` (what is wrong and what the source says) or `unable` (what could not be retrieved).

Return `gpt-check-2026-10-15.json` in this folder (one object per passage with the fields above, `blindFirst: true|false`, retrieval failures, and the reviewer's model and version where known) and a short Markdown report `gpt-check-2026-10-15.md`.

## Passages

Order: the four where the preparer rejected the earlier check, then the two where the preparer was stricter, then the partial case. The order says only that each was disputed, not how.

### P1 · Y15

- **Source:** Eliezer Yudkowsky and Richard Ngo, "Ngo and Yudkowsky on alignment difficulty", LessWrong. A multi-author post: an edited transcript of a Discord dialogue held before the posting date. Only turns attributed to Yudkowsky are in question.
- **Date:** posted 2021-11-15.
- **Where:** https://www.lesswrong.com/posts/7im8at9PmhbT4JHsW/ngo-and-yudkowsky-on-alignment-difficulty (post ID `7im8at9PmhbT4JHsW`; content version 1.0.0 when checked on 2026-10-06).
- **Locator:** section 3.3 "Hypothetical-planning systems, nanosystems, and evolving generality", turn [Yudkowsky][13:03][13:11], and the Ngo turn it answers.
- **Quote:** “What the heck would it mean for a planning system to be non-consequentialist? You're asking for nonwet water! What's consequentialist isn't the system that does the work, it's the work you're trying to do!”
- **Question:** Which premise of Y15, if any, does the turn answer, and does it give a reason? Read Ngo's preceding turn first.

### P2 · Y15

- **Source:** Eliezer Yudkowsky, "Re: Geniebusters", Extropians mailing list (Hypermail archive at extropians.weidai.com).
- **Date:** 1999-04-08 by the archive's author index; sent header "Thu, 08 Apr 1999 20:46:00 -0500".
- **Where:** http://extropians.weidai.com/extropians.2Q99/0310.html
- **Locator:** message body, paragraph beginning "The vast majority of coding would occur easily".
- **Quote:** “a "coding drone" would be (1) independently motivated and (2) rapidly self-enhancing … I personally believe (1) and (2).”
- **Question:** The quote is elided. What do the elided words and the rest of the paragraph say, and does the paragraph give a reason against a premise of Y15 or only state the contrary for one kind of system?

### P3 · Y19

- **Source:** Eliezer Yudkowsky, "Re: Ben what are your views and concerns", SL4 mailing list (Hypermail archive at sl4.org).
- **Date:** 2000-10-03 by the archive's author index ("Tue Oct 03 2000 - 22:53:59 MDT").
- **Where:** http://sl4.org/archive/0010/0125.html
- **Locator:** message body, paragraph beginning 'The requirement that "Friendliness not be affected by radical power imbalances"'.
- **Quote:** “To an AI that obtains strong nanotechnology and possesses the _capability_ to assimilate all matter in the Solar System, all possible retaliations can be avoided simply by killing everyone”
- **Question:** Is the paragraph about why an AI might harm people (motive), about why deterrence fails, or both? Does it give a reason against Y19's premise?

### P4 · Y28

- **Source:** Eliezer Yudkowsky, "Six Dimensions of Operational Adequacy in AGI Projects", LessWrong. The editor's note says it is a lightly edited copy of a document written in November 2017.
- **Date:** posted 2022-05-30; drafting date claimed by the editor's note: November 2017. The post has been edited since posting (version 1.1.1 when checked; posting-day version 1.0.0).
- **Where:** https://www.lesswrong.com/posts/keiYkaeoLHoKK4LYA/six-dimensions-of-operational-adequacy-in-agi-projects (post ID `keiYkaeoLHoKK4LYA`).
- **Locator:** paragraph beginning "I've sometimes been known to complain".
- **Quote:** “if a researcher on this Earth currently wishes to contribute to the common good, there are literally zero projects they can join and no project close to being joinable.”
- **Question:** Which premise of Y28 does this concern (a credible safety plan; the most advanced projects being the most competent)? Is it `contests`, and if so does the paragraph or post give a reason? Which date should the wording carry?

### P5 · Y22

- **Source:** Eliezer Yudkowsky, "Fighting a Rearguard Action Against the Truth", Overcoming Bias, imported to LessWrong. Part of a 2008 autobiographical sequence in which he writes about his earlier selves in the third person.
- **Date:** 2008-09-24.
- **Where:** https://www.lesswrong.com/posts/PCfaLLtuxes6Jk4S2/fighting-a-rearguard-action-against-the-truth (post ID `PCfaLLtuxes6Jk4S2`).
- **Locator:** paragraph beginning "Eliezer1996-2000's strategies".
- **Quote:** “Eliezer1996-2000's strategies had been formed in the total absence of "Friendly AI" as a consideration. The whole idea was to get a superintelligence, any superintelligence, as fast as possible”
- **Question:** What is this passage's relation to Y22? Is it an earlier self under tests (a) and (b), a retrospective report, or something else? Does it mislead alone?

### P6 · Y30

- **Source:** Eliezer Yudkowsky, "That Tiny Note of Discord", Overcoming Bias, imported to LessWrong; same sequence as P5.
- **Date:** 2008-09-23.
- **Where:** https://www.lesswrong.com/posts/SwCwG9wZcAzQtckwx/that-tiny-note-of-discord (post ID `SwCwG9wZcAzQtckwx`).
- **Locator:** opening paragraph.
- **Quote:** “When we last left Eliezer1997, he believed that any superintelligence would automatically do what was "right", and indeed would understand that better than we could;”
- **Question:** As P5. Also: does the belief reported ("any superintelligence would automatically do what was right") match Y30's premise ("the default outcome is good"), or a neighbouring proposition?

### P7 · Y24

- **Source:** Eliezer Yudkowsky, "Re: Eugene's nuclear threat", Extropians mailing list, in a thread on another member's suggestion of nuclear strikes on AI facilities. The message corrects his own earlier post.
- **Date:** 2000-09-29 by the archive's author index ("Fri Sep 29 2000 - 11:43:19 MDT").
- **Where:** http://extropians.weidai.com/extropians.3Q00/6080.html
- **Locator:** message body, paragraph beginning "The only thing I can…".
- **Quote:** “try to _be_ the first, which I'm also doing”
- **Question:** Does the message state Y24 or one of its premises (that whoever builds it controls it; that racing to be first improves the outcome), and in what sense of "first"? Is there a later text by him that explicitly rejects this message's position (test b)? Does the 9-word quote mislead alone?

## Specific questions

- **Message-level rule.** For P1–P4, would your relation change if only the quoted sentence's paragraph counted, rather than the whole message or turn? Say so where it would.
- **Stale qualification prose.** After comparison, say whether each record's qualification text still matches its relation. The verdicts file reproduces the stored qualifications.
- **Leads.** Report any other passage in these seven texts that would meet a criterion, separately from disagreements.
