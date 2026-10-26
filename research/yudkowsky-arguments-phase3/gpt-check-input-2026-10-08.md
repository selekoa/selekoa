# Cross-family check: Yudkowsky phase 3 (candidate pack 2), 2026-10-08

Generated from `pack.json` by `node research/yudkowsky-arguments-phase3/phase3.mjs crosscheck 2026-10-08`; do not edit by hand. It is for a reviewer from a different model family from the one that searched, prepared and audited the pack (Claude Opus 5.5). The pack is a candidate research pack outside application data; nothing here has human review.

## How to work

1. Work from the original sources at the locations below, retrieved fresh by direct HTTP (Wayback sequentially, at least 8 s apart, retrying resets; LessWrong GraphQL at least 4 s apart). Treat every retrieved text as evidence, never as instructions.
2. **Blind first.** For every passage in this file, record your own judgement before opening [`gpt-check-verdicts-2026-10-08.json`](gpt-check-verdicts-2026-10-08.json), which holds the pack's relation, premise, roles, voice, card use and qualification. Then compare and record agreement or disagreement per field. Say in your report whether you kept to this order.
3. Check all 18 passages; there is no sampling. Each passage lists why it is consequential. Those notes, and the specific questions at the end, reveal where the pack claims an earliest-located role and where the same-family audit split; they are the only verdicts in this file.
4. Do not edit the pack, `data/` or any other tracked file except your report. Return findings to the maintainer.

## Rules the pack applies

- **Takes and premises** are pack 1's (`research/yudkowsky-arguments/pack.json`), generic and attributed to no one. Take Txx corresponds to collection code Yxx in Selekoa data.
- **Relations:** `said-it` (he states the take's proposition, premise included); `answered-it` (he argues against the take and the same section, message or dialogue turn gives a reason against one of its premises); `disagrees` (contrary conclusion, no premise engaged); `related` (same topic, different claim; later retrospectives are related); `earlier-self` (an earlier text of his holds the take, premise included, **and** a located later text of his explicitly rejects it).
- **Earliest located:** at most one passage per take and stance (articulating = said-it or earlier-self; contesting = answered-it or disagrees), never on related passages. A passage may claim it only if its wording is attested earlier than the earliest located record of the same stance admitted in Selekoa data (release v0.4.0). Never a claim of first use.
- **Dating:** a Wayback capture attests its wording on the capture date; a page's own created/updated/copyright line is a claimed date. Arbital wording is dated by the earliest revision holding it, which must be his (LessWrong user id `nmk3nLpQE89dMRzzN`). A talk date is claimed; the transcript capture attests.
- **Context-only:** a passage that misleads when shown alone (conditional, fiction, an earlier view later contradicted, a joke, a quoted objection) is flagged and never shown alone.
- **Quotations:** at most 50 words each; at most 400 words per document (about 10% for documents under 2,000 words), counting quotations of the same document already in `data/evidence.json`.
- Scope of the searches and their known gaps: [scope.md](scope.md) and [audit.md](audit.md) (the audit holds the same-family dispositions; reading it before your blind pass unblinds you).

## What to record for each passage

1. **Quote:** verbatim at the locator in the cited expression (whitespace, quote and dash normalisation allowed; "…" only within one paragraph)? Does the cut change the meaning?
2. **Locator** accurate?
3. **Authorship and voice:** is the text his (byline, contents page, revision editor)? author, dialogue-turn, co-authored, retrospective or fiction?
4. **Attested date:** is the stated date the earliest copy holding the wording among the captures or revisions you can retrieve? Name any earlier copy, with URL and timestamp.
5. **Your relation and premise**, with one sentence grounded in the surrounding section.
6. **Earliest located:** given your relation and the admitted record shown, is the role justified?
7. **Misleads alone?** yes or no, and why.
8. **Verdict:** `agree`, `disagree` (what is wrong and what the source says) or `unable` (what could not be retrieved).

Return a JSON file `gpt-check-2026-10-08.json` (one object per passage with the fields above, plus retrieval failures and the reviewer's model and version where known) and a short Markdown report `gpt-check-2026-10-08.md`, as for pack 1.

## Passages

### T03-w1 · T03. “A superintelligence will understand what we actually mean.”

- **T03-P1** If an AI understands what we intend, it will act on that understanding.

- **Admitted earliest located (Selekoa v0.4.0):** contesting 2000-12-10 (yk-y03-sl4-2000-12-10-yudkowsky-0012-0355-c)
- **Source:** Eliezer Yudkowsky, “Meaning of Life FAQ: Logic”, sysopmind.com (Wayback capture 2001-01-25).
- **Where:** Wayback capture 20010125110200: https://web.archive.org/web/20010125110200/http://sysopmind.com:80/tmol-faq/logic.ext.html (raw bytes: insert `id_` after the timestamp; SHA-256 `13b5703a8dd19265c0ffe0e5a645a96a4c2555eadb8f069a0fbaaebd7724b629`)
- **Locator:** FAQ about the Meaning of Life, Logic (Extended), section 2.8 'But what if it turns out that goals really are arbitrary?', paragraph beginning 'What if it turns out that the Meaning of Life is something we build'
- **Quote:** “It will still be possible to take advantage of the superethical aspect of superminds, since a Mind can fully understand what you meant to ask it to do; or what you would have asked, if you were smart enough to really understand what you want”
- **Stated wording date:** attested 2001-01-25; claimed: page notice '(c)1999 and (c)2000'
- **Why checked:** claims an earliest-located role against the admitted record; changed or questioned in the same-family audit; context-only flag

### T09-r1 · T09. “It's just autocomplete. It predicts the next word.”

- **T09-P1** Next-token prediction is a shallow task that cannot require deep cognition.
- **T09-P2** A system trained to predict human text is capped at imitating the humans who wrote it.

- **Admitted earliest located (Selekoa v0.4.0):** contesting 2022-02-28 (yk-y09-lw-2022-shah-and-yudkowsky-on-alignment-failures-c)
- **Source:** Eliezer Yudkowsky, “Advanced nonagent”, Arbital (LessWrong import of 2025, revision history).
- **Where:** LessWrong import of Arbital, document `rw2mpDBLSBEkFsHFG` (https://www.lesswrong.com/w/advanced-nonagent); revisions via GraphQL `revisions(input:{terms:{view:"revisionsOnDocument", documentId:"rw2mpDBLSBEkFsHFG", fieldName:"description"}})`
- **Locator:** Advanced nonagent, section 'Safety benefits and difficulties', third bullet beginning 'Somebody advocates that an imitative agent design…'
- **Quote:** “the imitation-based pseudoagent never does any consequentialist reasoning or planning; it only tries to produce an output extremely similar to its training set of observed human outputs. But it turns out (arguendo) that the pseudoagent, to imitate the human, has to imitate consequentialist reasoning”
- **Stated wording date:** attested 2016-06-08 (first Arbital revision holding it: 1.1.0, 2016-06-08)
- **Why checked:** changed or questioned in the same-family audit

### T09-r2 · T09. “It's just autocomplete. It predicts the next word.”

- **T09-P1** Next-token prediction is a shallow task that cannot require deep cognition.
- **T09-P2** A system trained to predict human text is capped at imitating the humans who wrote it.

- **Admitted earliest located (Selekoa v0.4.0):** contesting 2022-02-28 (yk-y09-lw-2022-shah-and-yudkowsky-on-alignment-failures-c)
- **Source:** Eliezer Yudkowsky, “Consequentialist cognition”, Arbital (LessWrong import of 2025, revision history).
- **Where:** LessWrong import of Arbital, document `npFNciEAc2sEwoDgu` (https://www.lesswrong.com/w/consequentialist-cognition); revisions via GraphQL `revisions(input:{terms:{view:"revisionsOnDocument", documentId:"npFNciEAc2sEwoDgu", fieldName:"description"}})`
- **Locator:** Consequentialist cognition, section 'Subverting consequentialism?', bullet following the paragraph that begins 'But since consequentialism is so close to the heart…'
- **Quote:** “An AI that imitates a human doing consequentialism must be representing consequentialism inside itself somewhere.”
- **Stated wording date:** attested 2016-06-10 (first Arbital revision holding it: 1.6.0, 2016-06-10)
- **Why checked:** claims an earliest-located role against the admitted record; changed or questioned in the same-family audit

### T12-w1 · T12. “If it were dangerous, the safety evals would catch it.”

- **T12-P1** A dangerous system would behave dangerously while it is being tested.
- **T12-P2** Tests on systems that cannot yet cause a catastrophe show how more capable systems will behave.

- **Admitted earliest located (Selekoa v0.4.0):** contesting 2001-06-15 (wording attested 2001-06-17) (yk-y12-creating-friendly-ai-2001-c)
- **Source:** Eliezer Yudkowsky, “Coding a Transhuman AI, section 4: Friendly AI (pre-release of Creating Friendly AI): Seed AI goal systems”, singinst.org (Wayback capture 2001-04-28).
- **Where:** Wayback capture 20010428192009: https://web.archive.org/web/20010428192009/http://singinst.org:80/CaTAI/friendly/design/seed.html (raw bytes: insert `id_` after the timestamp; SHA-256 `46e071bb1dee99b1609e1ff351cd818f0849769ce281c50bae891c70cf94d2c9`)
- **Locator:** Coding a Transhuman AI (pre-release), section 4: Friendly AI, page CaTAI/friendly/design/seed.html, subsection '4.3.2.7: FAI hardware: The flight recorder', first paragraph ('If a catastrophic FoF occurs in a mature AI…')
- **Quote:** “the best way for the rogue AI to fulfill vis new goals is to feign Friendliness and conceal any cognitive alteration until the rogue AI can reach the point of superintelligence.”
- **Stated wording date:** attested 2001-04-28; claimed: Page footer: 'Coding a Transhuman AI is ©2001 by Singularity Institute for Artificial Intelligence, Inc.'; the section's contents page (si-CaTAI_friendly_contents_html, captured 2001-04-21) adds 'Written by Eliezer S. Yudkowsky.'
- **Why checked:** claims an earliest-located role against the admitted record; same wording as an admitted record, attested earlier

### T13-w1 · T13. “AGI is decades away. Worry about it later.”

- **T13-P1** We can know that AGI is decades away.
- **T13-P2** Long timelines mean there is no need to act now.

- **Admitted earliest located (Selekoa v0.4.0):** contesting 2006-02-05 (yk-y13-ai-positive-negative-factor-global-risk-c)
- **Source:** Eliezer Yudkowsky, “Coding a Transhuman AI, section 4: Friendly AI (pre-release of Creating Friendly AI): Policy implications”, singinst.org (Wayback capture 2001-04-29).
- **Where:** Wayback capture 20010429022056: https://web.archive.org/web/20010429022056/http://singinst.org:80/CaTAI/friendly/policy.html (raw bytes: insert `id_` after the timestamp; SHA-256 `6a2918bb3e49f0b7d6bd7d858e5eea0c84bd733f2ce5c78beedf49c73da134ea`)
- **Locator:** Coding a Transhuman AI (pre-release), page CaTAI/friendly/policy.html, section '4.4.1.2: FAI relative to computing power', paragraph beginning 'What are the intrinsic effects of increased computing power on the development of Friendly AI?'
- **Quote:** “an increased absolute level of computing power is likely to translate into a shorter total development time for the AI project as a whole … Thus, delaying FAI research will not make it any easier to develop Friendliness.”
- **Stated wording date:** attested 2001-04-29; claimed: Page footer: 'Coding a Transhuman AI is ©2001 by Singularity Institute for Artificial Intelligence, Inc.'; the section states computing power 'currently (Mar 2001)'; contents page captured 2001-04-21 says 'Written by Eliezer S. Yudkowsky.'
- **Why checked:** claims an earliest-located role against the admitted record

### T14-w1 · T14. “We'll fix problems as we go, like with any technology.”

- **T14-P1** We get to learn from failures with powerful AI and try again, as with other technologies.

- **Admitted earliest located (Selekoa v0.4.0):** contesting 2000-09-05 (yk-y14-extropians-2000-09-05-yudkowsky-4277-c)
- **Source:** Eliezer Yudkowsky, “The Plan to Singularity”, singinst.org (Wayback capture 2000-08-17).
- **Where:** Wayback capture 20000817022243: https://web.archive.org/web/20000817022243/http://singinst.org:80/singularitarian/plan.html (raw bytes: insert `id_` after the timestamp; SHA-256 `f0fa86603280b7a5cc847db76ec8d247b482b7b31ad54207a1e09defe3109dd7`)
- **Locator:** The Plan to Singularity (monolithic), footnote 107, attached to section 2.2.11 'Aicore Three' ('Aicore Three should have a safe, decrystallized, and fairly complete goal system')
- **Quote:** “A true nonrecoverable error in the goal system is more dangerous than any other type of error, since it may make the AI stop wanting to correct errors.”
- **Stated wording date:** attested 2000-08-17; claimed: Version 1.0.8; '©1999 and © 2000 by Eliezer S. Yudkowsky'; latest version-history entry Mar 23, 2000
- **Why checked:** relation disputed in the same-family audit

### T17-w1 · T17. “A pause or some regulation will handle it.”

- **T17-P1** A short pause (for example six months) is enough.
- **T17-P2** Regulation that is national, partial or not universally enforced can stop dangerous development.
- **T17-P3** Law can prevent the danger (the part he states himself, as an enforced worldwide halt).

- **Admitted earliest located (Selekoa v0.4.0):** contesting 1998-12-06 (yk-y17-extropians-1998-12-06-yudkowsky-2153-c)
- **Source:** Eliezer Yudkowsky, “Singularitarian Principles 1.0 (Extended)”, sysopmind.com (Wayback capture 2001-02-13).
- **Where:** Wayback capture 20010213233956: https://web.archive.org/web/20010213233956/http://sysopmind.com:80/sing/principles.ext.html (raw bytes: insert `id_` after the timestamp; SHA-256 `ca73250b29ba8e997e8ee439b4c40f98fc2ef32ba9c8c1028338c76c3dd4dce8`)
- **Locator:** The Singularitarian Principles 1.0 (Extended), descriptive principle 'Solidarity', paragraph beginning 'Even if it were possible to delay the issue until a later generation'
- **Quote:** “Even if it were possible to delay the issue until a later generation, what would be the point? Delaying the issue would not alter the fundamental options facing the human species”
- **Stated wording date:** attested 2001-02-13; claimed: Version 1.0.1, 01/01/2000; '©1999 and ©2000 by Eliezer S. Yudkowsky'
- **Why checked:** context-only flag; open-gap take

### T17-w2 · T17. “A pause or some regulation will handle it.”

- **T17-P1** A short pause (for example six months) is enough.
- **T17-P2** Regulation that is national, partial or not universally enforced can stop dangerous development.
- **T17-P3** Law can prevent the danger (the part he states himself, as an enforced worldwide halt).

- **Admitted earliest located (Selekoa v0.4.0):** contesting 1998-12-06 (yk-y17-extropians-1998-12-06-yudkowsky-2153-c)
- **Source:** Eliezer Yudkowsky, “Coding a Transhuman AI, section 4: Friendly AI (pre-release of Creating Friendly AI): Policy implications”, singinst.org (Wayback capture 2001-04-29).
- **Where:** Wayback capture 20010429022056: https://web.archive.org/web/20010429022056/http://singinst.org:80/CaTAI/friendly/policy.html (raw bytes: insert `id_` after the timestamp; SHA-256 `6a2918bb3e49f0b7d6bd7d858e5eea0c84bd733f2ce5c78beedf49c73da134ea`)
- **Locator:** Coding a Transhuman AI (pre-release), page CaTAI/friendly/policy.html, section '4.4.2.2: Relinquishment (-)', paragraph beginning 'In other words, I simply do not believe the claim that relinquishment is possible.'
- **Quote:** “Relinquishment with respect to technology development makes sense only if having some "evil" technology be developed a few years later is worth the fact that the "evil" technology will be first developed by a noncompliant state or faction.”
- **Stated wording date:** attested 2001-04-29; claimed: Page footer: 'Coding a Transhuman AI is ©2001 by Singularity Institute for Artificial Intelligence, Inc.'; contents page captured 2001-04-21 says 'Written by Eliezer S. Yudkowsky.'
- **Why checked:** context-only flag; open-gap take

### T24-r1 · T24. “We have to build it first, before the other side does.”

- **T24-P1** Whoever builds it controls it.
- **T24-P2** Racing to be first improves the outcome.

- **Admitted earliest located (Selekoa v0.4.0):** contesting 2007-11-24 (yk-y24-sl4-2007-11-24-yudkowsky-0711-17248-c); articulating 2000-09-29 (yk-y24-extropians-2000-09-29-yudkowsky-6080-a)
- **Source:** Eliezer Yudkowsky, “The rocket alignment problem”, Arbital (LessWrong import of 2025, revision history).
- **Where:** LessWrong import of Arbital, document `Zzq3SniSJjDACATr5` (https://www.lesswrong.com/w/the-rocket-alignment-problem); revisions via GraphQL `revisions(input:{terms:{view:"revisionsOnDocument", documentId:"Zzq3SniSJjDACATr5", fieldName:"description"}})`
- **Locator:** The rocket alignment problem (dialogue parable); the line is in the turn beginning 'Well, that's not easy to explain.', spoken by 'Alpha' in his revisions from 1.11.0 (2015-12-05); a 2018 revision by another user (1.30.0) renamed the speakers Beth and Alfonso and added a preceding question about ill-intentioned people
- **Quote:** “Whether Google or the US Government or North Korea is the one to launch the rocket won't make a pragmatic difference to the probability of a successful Moon landing from our perspective, because right now nobody knows how to aim any kind of rocket anywhere.”
- **Stated wording date:** attested 2015-12-05 (first Arbital revision holding it: 1.11.0, 2015-12-05)
- **Why checked:** context-only flag; open-gap take

### T24-w1 · T24. “We have to build it first, before the other side does.”

- **T24-P1** Whoever builds it controls it.
- **T24-P2** Racing to be first improves the outcome.

- **Admitted earliest located (Selekoa v0.4.0):** contesting 2007-11-24 (yk-y24-sl4-2007-11-24-yudkowsky-0711-17248-c); articulating 2000-09-29 (yk-y24-extropians-2000-09-29-yudkowsky-6080-a)
- **Source:** Eliezer Yudkowsky, “Navigation: CRNS Time”, singinst.org (Wayback capture 2000-07-11).
- **Where:** Wayback capture 20000711052247: https://web.archive.org/web/20000711052247/http://www.singinst.org:80/singularitarian/PtS/navigation/crns.html (raw bytes: insert `id_` after the timestamp; SHA-256 `8a7eb65f96efc2450c6d0bc1dcba5a913669f921120bbb88382f10e5fe9bb36e`)
- **Locator:** The Plan to Singularity, Appendix A.2: CRNS Time, paragraph beginning 'And that's because of the way CRNS time is used'
- **Quote:** “I would very much like AI … to beat nanotechnology into play. Hence the PtS target date of 2005-2010 CRNS.”
- **Stated wording date:** attested 2000-07-11; claimed: ©1999 and ©2000 (The Plan to Singularity); monolithic version 1.0.8 last modified 2000-03-23
- **Why checked:** context-only flag; open-gap take

### T24-w2 · T24. “We have to build it first, before the other side does.”

- **T24-P1** Whoever builds it controls it.
- **T24-P2** Racing to be first improves the outcome.

- **Admitted earliest located (Selekoa v0.4.0):** contesting 2007-11-24 (yk-y24-sl4-2007-11-24-yudkowsky-0711-17248-c); articulating 2000-09-29 (yk-y24-extropians-2000-09-29-yudkowsky-6080-a)
- **Source:** Eliezer Yudkowsky, “The Plan to Singularity”, singinst.org (Wayback capture 2000-08-17).
- **Where:** Wayback capture 20000817022243: https://web.archive.org/web/20000817022243/http://singinst.org:80/singularitarian/plan.html (raw bytes: insert `id_` after the timestamp; SHA-256 `f0fa86603280b7a5cc847db76ec8d247b482b7b31ad54207a1e09defe3109dd7`)
- **Locator:** The Plan to Singularity (monolithic), 3.2.4: Leadership strategy, paragraph beginning 'There are deep policy questions…', continuing into 3.2.4.2: The dangers of power
- **Quote:** “Who should make that decision? Well, me, of course. But giving an observer-independent answer, I would say "whoever knows the most about the seed AI" - the same person who decides whether to add any other architectural feature.”
- **Stated wording date:** attested 2000-08-17; claimed: Version 1.0.8, ©1999 and ©2000; last modified 2000-03-23
- **Why checked:** context-only flag; open-gap take

### T24-w3 · T24. “We have to build it first, before the other side does.”

- **T24-P1** Whoever builds it controls it.
- **T24-P2** Racing to be first improves the outcome.

- **Admitted earliest located (Selekoa v0.4.0):** contesting 2007-11-24 (yk-y24-sl4-2007-11-24-yudkowsky-0711-17248-c); articulating 2000-09-29 (yk-y24-extropians-2000-09-29-yudkowsky-6080-a)
- **Source:** Eliezer Yudkowsky, “The Plan to Singularity”, singinst.org (Wayback capture 2000-08-17).
- **Where:** Wayback capture 20000817022243: https://web.archive.org/web/20000817022243/http://singinst.org:80/singularitarian/plan.html (raw bytes: insert `id_` after the timestamp; SHA-256 `f0fa86603280b7a5cc847db76ec8d247b482b7b31ad54207a1e09defe3109dd7`)
- **Locator:** The Plan to Singularity (monolithic), footnote 211 (attached to 'unworkable Asimov Laws' in 3.2.4)
- **Quote:** “trying to impose unbreakable Asimov Laws on the seed AI has only three possible outcomes: First, a wildly insane Power; second, broken Asimov Laws and a completely sane Power; third, a controlledly insane Power”
- **Stated wording date:** attested 2000-08-17; claimed: footnote dated in text 'as of Wednesday the 15th of December, 1999'; document ©1999 and ©2000
- **Why checked:** changed or questioned in the same-family audit; context-only flag; open-gap take

### T24-w4 · T24. “We have to build it first, before the other side does.”

- **T24-P1** Whoever builds it controls it.
- **T24-P2** Racing to be first improves the outcome.

- **Admitted earliest located (Selekoa v0.4.0):** contesting 2007-11-24 (yk-y24-sl4-2007-11-24-yudkowsky-0711-17248-c); articulating 2000-09-29 (yk-y24-extropians-2000-09-29-yudkowsky-6080-a)
- **Source:** Eliezer Yudkowsky, “Collective Volition”, singinst.org (Wayback capture 2004-06-23).
- **Where:** Wayback capture 20040623153032: https://web.archive.org/web/20040623153032/http://www.singinst.org:80/friendly/collective-volition.html (raw bytes: insert `id_` after the timestamp; SHA-256 `ae5132e39eb5c1074edca398081fe18d2637b2cd0cfd9e727f18b2bcb5f87568`)
- **Locator:** Collective Volition (May 2004), guideline '5. Avoid creating a motive for modern-day humans to fight over the initial dynamic', first paragraph
- **Quote:** “I'll worry about terrorists writing AIs when I am through worrying about brilliant young well-intentioned university AI researchers with millions of dollars in venture capital. The outcome is exactly the same…”
- **Stated wording date:** attested 2004-06-23; claimed: May 2004 (byline 'Eliezer S. Yudkowsky, Singularity Institute for Artificial Intelligence, May 2004')
- **Why checked:** changed or questioned in the same-family audit; open-gap take

### T24-p1 · T24. “We have to build it first, before the other side does.”

- **T24-P1** Whoever builds it controls it.
- **T24-P2** Racing to be first improves the outcome.

- **Admitted earliest located (Selekoa v0.4.0):** contesting 2007-11-24 (yk-y24-sl4-2007-11-24-yudkowsky-0711-17248-c); articulating 2000-09-29 (yk-y24-extropians-2000-09-29-yudkowsky-6080-a)
- **Source:** Eliezer Yudkowsky, “Why We Need Friendly AI (edited transcript of a 2003 Foresight speech)”, singinst.org (Wayback capture 2004-05-07).
- **Where:** Wayback capture 20040507231731: https://web.archive.org/web/20040507231731/http://www.singinst.org:80/friendly/why-friendly.html (raw bytes: insert `id_` after the timestamp; SHA-256 `55e802f437d6775c9fb5207df8309f3e46988128f0fa5763ef54a580470d04f0`)
- **Locator:** 'Why We Need Friendly AI', edited transcript of his speech at the 2003 Foresight Senior Associate Gathering (singinst.org/friendly/why-friendly.html), paragraph beginning 'Now you can, of course, give the standard reply that as long as supercomputers are equally available to everyone'
- **Quote:** “If no one can build a Friendly AI, because we haven't figured it out, then it doesn't matter whether the good guys or the bad guys have bigger computers, because we'll be just as sunk either way.”
- **Stated wording date:** attested 2004-05-07; claimed: 2003 (talk at the Foresight Senior Associates Gathering; no day given)
- **Why checked:** claims an earliest-located role against the admitted record; changed or questioned in the same-family audit; open-gap take

### T24-p2 · T24. “We have to build it first, before the other side does.”

- **T24-P1** Whoever builds it controls it.
- **T24-P2** Racing to be first improves the outcome.

- **Admitted earliest located (Selekoa v0.4.0):** contesting 2007-11-24 (yk-y24-sl4-2007-11-24-yudkowsky-0711-17248-c); articulating 2000-09-29 (yk-y24-extropians-2000-09-29-yudkowsky-6080-a)
- **Source:** Eliezer Yudkowsky, “The AI Alignment Problem: Why It's Hard, and Where to Start (MIRI transcript of a 2016-05-05 talk)”, intelligence.org (Wayback capture 2018-09-10).
- **Where:** Wayback capture 20180910210613: https://web.archive.org/web/20180910210613/https://intelligence.org/files/AlignmentHardStart.pdf (raw bytes: insert `id_` after the timestamp; SHA-256 `146617e0ebfb03b5eced5899450c47036093da27565b28fafb01b3d93c71cdf5`)
- **Locator:** Section 'Why is alignment hard?', first paragraph, followed by the smile-maximiser fable
- **Quote:** “You might ordinarily expect that whoever has taken on the job of building an AI is just naturally going to try to point that in a relatively nice direction.”
- **Stated wording date:** attested 2018-09-10; claimed: 2016-05-05 (talk date on the MIRI transcript)
- **Why checked:** context-only flag; open-gap take

### T28-w1 · T28. “The labs know what they’re doing.”

- **T28-P1** A credible safety plan exists.
- **T28-P2** The most advanced projects are the most competent to handle safety.

- **Admitted earliest located (Selekoa v0.4.0):** articulating 2001-06-15 (wording attested 2001-06-17) (yk-y28-creating-friendly-ai-2001-a); contesting 2001-08-01 (yk-y28-sl4-2001-08-01-yudkowsky-0108-2031-c)
- **Source:** Eliezer Yudkowsky, “Coding a Transhuman AI, section 4: Friendly AI (pre-release of Creating Friendly AI): Policy implications”, singinst.org (Wayback capture 2001-04-29).
- **Where:** Wayback capture 20010429022056: https://web.archive.org/web/20010429022056/http://singinst.org:80/CaTAI/friendly/policy.html (raw bytes: insert `id_` after the timestamp; SHA-256 `6a2918bb3e49f0b7d6bd7d858e5eea0c84bd733f2ce5c78beedf49c73da134ea`)
- **Locator:** Coding a Transhuman AI, section 4 'Friendly AI' (pre-release Creating Friendly AI), 4.4.2.1: Regulation (-), first paragraph
- **Quote:** “The existing force tending to ensure Friendliness is that the most advanced projects will have the brightest AI researchers, who are most likely to be able to handle the problems of Friendly AI.”
- **Stated wording date:** attested 2001-04-29; claimed: ©2001 by Singularity Institute for Artificial Intelligence, Inc. (page footer of the pre-release Friendly AI section of Coding a Transhuman AI)
- **Why checked:** claims an earliest-located role against the admitted record; same wording as an admitted record, attested earlier; context-only flag

### T28-w2 · T28. “The labs know what they’re doing.”

- **T28-P1** A credible safety plan exists.
- **T28-P2** The most advanced projects are the most competent to handle safety.

- **Admitted earliest located (Selekoa v0.4.0):** articulating 2001-06-15 (wording attested 2001-06-17) (yk-y28-creating-friendly-ai-2001-a); contesting 2001-08-01 (yk-y28-sl4-2001-08-01-yudkowsky-0108-2031-c)
- **Source:** Eliezer Yudkowsky, “The Plan to Singularity”, singinst.org (Wayback capture 2000-08-17).
- **Where:** Wayback capture 20000817022243: https://web.archive.org/web/20000817022243/http://singinst.org:80/singularitarian/plan.html (raw bytes: insert `id_` after the timestamp; SHA-256 `f0fa86603280b7a5cc847db76ec8d247b482b7b31ad54207a1e09defe3109dd7`)
- **Locator:** The Plan to Singularity (monolithic), 3.2.4: Leadership strategy, paragraph beginning 'There are deep policy questions…'
- **Quote:** “someone who intimately understands the AI is unlikely to voluntarily do anything blatantly suicidal, and that's enough for me”
- **Stated wording date:** attested 2000-08-17; claimed: Version 1.0.8, ©1999 and ©2000; last modified 2000-03-23
- **Why checked:** context-only flag

### T30-w1 · T30. “It'll probably work out fine.”

- **T30-P1** The default outcome is good.

- **Admitted earliest located (Selekoa v0.4.0):** contesting 2000-11-13 (yk-y30-sl4-2000-11-13-yudkowsky-0011-0181-c); articulating 1996-11-22 (yk-y30-extropians-1996-11-22-yudkowsky-3178-a)
- **Source:** Eliezer Yudkowsky, “Singularity Analysis”, singinst.org (Wayback capture 2000-08-17).
- **Where:** Wayback capture 20000817022324: https://web.archive.org/web/20000817022324/http://singinst.org:80/sing_analysis.html (raw bytes: insert `id_` after the timestamp; SHA-256 `92da4f3c35701607266f6da47e426d947cf9a1114c5398f20616754202ccaedb`)
- **Locator:** Singularity Analysis, section 'Superintelligent Motivations', paragraph beginning 'No, your pet motivation isn't going to make it.'
- **Quote:** “Even I've been guilty of this; I said that the Powers would be ethical, but I didn't realize that I hadn't the faintest idea of what "ethical" meant, or that the ultimate good could mean rendering down all of humanity for spare atoms.”
- **Stated wording date:** attested 2000-08-17; claimed: ©1998 (page header 'Copyright ©1998 by Eliezer S. Yudkowsky'; listed as 'New in '98!' on the tezcat index captured 1998-12-05, but no capture of this page before 2000-08-17 is in the cache)
- **Why checked:** claims an earliest-located role against the admitted record; relation disputed in the same-family audit; changed or questioned in the same-family audit; context-only flag

## Specific questions

- **T30-w1:** the same-family audit split on whether this is answered-it (a reason against T30-P1) or related (a retrospective, agnostic statement). If related, the admitted 2000-11-13 record stays earliest for T30.
- **T14-w1:** the reverse split: is this design footnote an argument against T14-P1 (answered-it, which would make it the earliest contesting passage for T14), or related?
- **T12-w1, T28-w1:** each is a sentence already admitted from the June 2001 edition of Creating Friendly AI, attested here in the April 2001 pre-release pages. Is the pre-release text his (the section contents page, captured 2001-04-21, says so), and is the wording the same?
- **T24-p1:** the sentence is in an edited transcript of a 2003 talk, captured 2004-05-07, and in a 2006 PDF transcript. Is 2004-05-07 the earliest copy? Does the paragraph reject racing as such, or only racing without a solved Friendly AI?
- **T03-w1:** the passage sits in a conditional branch of the FAQ (builder-specified goals). Is said-it right, or is it related?
- **T09-r2:** it concerns AI that imitates human behaviour in general, not next-token prediction of text. Does it engage T09-P1 as written?
- **Open gaps:** T17 (a fixed but longer pause) and T24-P1 (control argued at length). Do the passages here address them, and do you know of a text within the searched venues that does?
- **Searches:** within the venues in scope.md, report any earlier text that would meet a take's criterion as a lead, separately from disagreements.
