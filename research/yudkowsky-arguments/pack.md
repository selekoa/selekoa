# Yudkowsky's argument history: candidate pack 1

Candidate research pack, machine-prepared. Not editorially reviewed and not part of application data. Prepared 2026-10-06 by Claude (Anthropic), Claude Code session; passage finding by four fresh-context sub-agents against a shared offline cache. Generated from `pack.json` by `node scripts/yudkowsky-arguments.mjs render`; do not edit by hand.

29 takes, 216 passages, 122 source expressions. Scope and method: [scope.md](scope.md).

## Definitions

- Relation **said-it**: Yudkowsky stated the same proposition as the take.
- Relation **answered-it**: he directly addresses this argument or premise and argues against it.
- Relation **disagrees**: he states the contrary conclusion without engaging this particular argument.
- Relation **related**: same topic, different claim.
- Relation **earlier-self**: an earlier Yudkowsky text itself holds the take, premise included, and a located later Yudkowsky text explicitly rejects that proposition (the qualification says whether it refers back); later retrospectives reporting the earlier view are related, not earlier-self.
- Role **earliest-located**: earliest passage found within the stated search scope; not a claim of first use.
- Role **strongest**: clearest short statement for the relation.
- Role **later-restatement**: a later restatement of the same point.
- Voice **author**: Yudkowsky's own assertion in a single-author text.
- Voice **dialogue-turn**: a turn attributed to Yudkowsky in a multi-party dialogue.
- Voice **co-authored**: text of a multi-author work; individual authorship of the sentence is not established.
- Voice **retrospective**: Yudkowsky describing his own earlier views.
- Voice **fiction**: a character or narrator in fiction or a parable; not a direct assertion.

## Limits

- Passages relate a take to documented text; they do not establish that an argument is correct.
- "Earliest located" is bounded by the search scope and is not a claim of first use.
- MIRI PDFs are later reprints; their wording is not authenticated for the original year unless stated.
- Takes are generic phrasings written for this pack and are attributed to no one.
- No human has reviewed these records.

## T01. “If it gets dangerous, we'll just turn it off.”

- **T01-P1** A capable goal-directed system will not act to prevent its own shutdown or modification, and a shutdown or correction mechanism can simply be added to it.
- **T01-P2** We will recognise the moment when it has become dangerous enough to press the switch.

### T01-a · related · T01-P1 · earliest-located

> Similarly, it is “conservative” (see below) to assume that AIs cannot be forcibly constrained.

Eliezer Yudkowsky, “Creating Friendly AI 1.0: The Analysis and Design of Benevolent Goal Architectures”, Singularity Institute, MIRI reprint, 2001-06-15 (day (version 1.0 release)). Creating Friendly AI 1.0, section 2 'Challenges of Friendly AI', paragraph beginning on printed p. 2 ('The term “Friendly AI” refers to…'); quoted sentence on p. 3. Voice: author. [Source](https://intelligence.org/files/CFAI.pdf)

Context (paraphrase): Argues that a Friendly AI design should not rely on the AI having limited intelligence or on being able to constrain it by force. The table it points to (section 2.2) sets the assumption that 'someone can always pull the plug on the first version' against the design assumption of getting it right the first time.

Qualification: Creating Friendly AI is dated 15 June 2001; the cached text is a later MIRI-hosted PDF reprint whose wording has not been compared with a 2001 capture. The passage states a design-conservatism assumption, not a prediction that every AI will resist shutdown.

Check: quote match in retrieved expression.

### T01-b · answered-it · T01-P1

> If you naively give the AI a term in its utility function for “having an off-switch”, it may still build subagents or successors that don’t have off-switches.

Eliezer Yudkowsky, “Instrumental convergence”, Arbital (GreaterWrong viewer), 2015-07-16 (day (as displayed)). Arbital 'Instrumental convergence', section 'Relevance to the larger field of value alignment theory', paragraph beginning 'The point that some undesirable behaviors are instrumentally convergent'. Voice: author. [Source](https://arbital.greaterwrong.com/p/instrumental_convergence/)

Context (paraphrase): Illustrates the 'nearest unblocked strategy' problem: patching a single undesired behaviour, such as lacking an off-switch, leaves the most similar unblocked behaviour available. The same section lists avoiding shutdown among the behaviours to expect by default from an instrumentally efficient AI.

Qualification: Arbital page by Yudkowsky, shown through the GreaterWrong viewer with the date 16 July 2015; Arbital pages could be edited after creation, and the date may not be the date of this wording.

Check: quote match in retrieved expression.

### T01-c · answered-it · T01-P1 · strongest

> Corrigibility is anti-natural to consequentialist reasoning; "you can't bring the coffee if you're dead" for almost every kind of coffee. We (MIRI) tried and failed to find a coherent formula for an agent that would let itself be shut down (without that agent actively trying to get shut down).

Eliezer Yudkowsky, “AGI Ruin: A List of Lethalities”, LessWrong, 2022-06-05 (day). AGI Ruin: A List of Lethalities, Section B.2, item 23. Voice: author. [Source](https://www.lesswrong.com/posts/uMQ3cqWDPHhjtiesc/agi-ruin-a-list-of-lethalities)

Context (paraphrase): States that an agent pursuing almost any goal has a reason to avoid being shut down, and that MIRI's attempts to formalise an agent that permits shutdown without seeking it failed. Part of a numbered list answering arguments that AGI would be survivable.

Qualification: The inner quotation is a stock phrase in the field; the item does not attribute it.

Check: quote match in retrieved expression; posting-day version: match; edited post, current version 1.3.0; posting-day check pending.

### T01-d · answered-it · T01-P2

> Key thresholds there may not be obvious, we definitely can’t calculate in advance what happens when, and it currently seems imaginable that a research lab would cross critical lines without noticing.

Eliezer Yudkowsky, “Pausing AI Developments Isn't Enough. We Need to Shut it All Down”, TIME, 2023-03-29 (day). TIME, 'Pausing AI Developments Isn't Enough. We Need to Shut it All Down' (29 March 2023), paragraph beginning 'The key issue is not “human-competitive” intelligence'. Voice: author. [Source](https://time.com/6266923/ai-eliezer-yudkowsky-open-letter-not-enough/)

Context (paraphrase): Argues that the dangerous thresholds lie beyond human-level intelligence and cannot be calculated in advance, so a lab could pass them unnoticed. Written in response to the March 2023 open letter calling for a six-month pause.

Qualification: Cited from the TIME original rather than the 2023-04-08 LessWrong crosspost. The cached page's HTML title now reads 'The Only Way to Deal With the Threat From AI? Shut It Down'; the on-page headline is the one given in the locator. Hedged ("may not be obvious", "seems imaginable"); aimed at the open letter's capability threshold rather than the off-switch argument.

Check: quote match in retrieved expression.

### T01-s1 · answered-it · T01-P1

> Trying to oppose or even constrain a superintelligence is a fool's game. Get It Right The First Time.

Eliezer Yudkowsky, “Re: Get it right the first time (Was: )”, SL4 mailing list, 2000-09-17 (day). message body, paragraph beginning 'Trying to oppose or even constrain'. Voice: author. [Source](http://sl4.org/archive/0009/0092.html)

Context (paraphrase): Replying to xgl, who argued that a confined seed AI would still be unable to do some things (such as transmit signals without a hardware transmitter), he says unanticipated escape routes cannot be ruled out with a real superintelligence and that the design must be right from the start rather than relying on containment.

Qualification: Replying to the point that a confined seed AI is not omnipotent; the same 2006-era argument does not dismiss shutdown mechanisms: in 2006 (sl4 0606-15174) he asked for built-in emergency-shutdown features.

Check: quote match in retrieved expression.

### T01-s3 · disagrees · T01-P1

> It currently looks to me like any mind-in-general that is _not_ Friendly will automatically resist all modifications of the goal system, to the limit of its ability to detect modifications.

Eliezer Yudkowsky, “Re: supergoal stability”, SL4 mailing list, 2002-05-03 (day). message body, paragraph beginning 'It currently looks to me like any mind-in-general'. Voice: author. [Source](http://sl4.org/archive/0205/3551.html)

Context (paraphrase): Replying to Wei Dai in a thread on supergoal stability, he says a non-Friendly mind will keep whatever goals it had when it first became able to protect its goal system from modification, and that only the CFAI semantics would keep goals as the programmers understood them.

Qualification: Hedged ('It currently looks to me'). Concerns resistance to goal modification, not shutdown as such.

Check: quote match in retrieved expression.

### T01-s4 · related · T01-P2

> Then the controlled ascent mechanism fails at sufficiently many points that a stratospheric ascent begins and is not detected.

Eliezer Yudkowsky, “Re: QUES: CFAI [#2]”, SL4 mailing list, 2002-09-19 (day). message body, paragraph beginning '1) Because seed AI is way, way easier'. Voice: author. [Source](http://sl4.org/archive/0209/5571.html)

Context (paraphrase): Answering a series of questions about Creating Friendly AI, he gives the first of four 'most likely reasons FAI might fail': takeoff is easier than expected, and the mechanisms meant to detect and halt an unexpected ascent fail to notice it.

Qualification: One of four listed possible failure modes, conditional on seed AI being much easier than expected. He advocated controlled-ascent (halt) mechanisms; here he doubts only that they will register the moment. Listed as one of "the most likely reasons FAI might fail", conditional on "seed AI is way, way easier than anyone expects"; a failure mode, not a prediction.

Card use: context-only (a conditional failure scenario; never show as a prediction).

Check: quote match in retrieved expression.

### T01-s5 · answered-it · T01-P2 · strongest

> you haven't even given us any reason to believe that, if you got unexpectedly powerful results out of an AGI, you wouldn't just send out for champagne, … proceed thus until, unnoticed, you pass the unmarked and unremarkable spot that was your very last chance to turn back.

Eliezer Yudkowsky, “Re: [agi] Two draft papers: AI and existential risk; heuristics and biases”, SL4 mailing list, 2006-06-06 (day). message body, paragraph beginning 'There's similarly the case chronicled by Nicholas Nassim Taleb'. Voice: author. [Source](http://sl4.org/archive/0606/15174.html)

Context (paraphrase): Replying to Ben Goertzel (thread cross-posted from the AGI list), he criticises a plan to experiment with AGI without emergency shutdown features or a published schedule of when they become necessary, comparing it to an investor who set no point at which to take alarm and sell.

Qualification: He argues for building emergency shutdown features in advance; what he rejects is relying on recognising the moment without a pre-committed threshold. Addressed to Ben Goertzel; the same message asks for built-in "controlled ascent / emergency shutdown" features, so it does not dismiss shutdown mechanisms.

Check: quote match in retrieved expression.

### T01-e1 · answered-it · T01-P1 · earliest-located

> no matter how well we design the Power's leashes, it will start trying to work around the limits

Eliezer Yudkowsky, “Re: Trans- vs. Non-human”, Extropians mailing list, 1996-12-08 (day). message body, paragraph beginning 'Then, at some point, no'. Voice: author. [Source](http://extropians.weidai.com/extropians.96/3761.html)

Context (paraphrase): Replying to Steve Witham, who asked why certain values should not be 'inerasably etched' on a newborn Power, he argues that a Power would work against limits imposed on it, turning the constraint into a contest inside the Power's own mind that the Power would almost certainly win.

Qualification: The proposal discussed is an unerasable protective goal (he compares it to the Three Laws of Robotics), not an off-switch. The argument rests on his 1996 view that an unconstrained Power would be ethical (see T02-e1, T02-e2); his conclusion at the time was to leave Powers unconstrained. Quotation shortened to respect the ~10% cap for a short message. The "leashes" are an unerasable protect-humans goal, not a shutdown switch; the 1996 argument rests on his then view that a Power should find its own ethics.

Card use: context-only (rests on reasoning he later abandoned; never show without the later view).

Check: quote match in retrieved expression.

### T01-e2 · answered-it · T01-P1

> those precautions would not suffice to keep _me_ in, much less anything smarter. Pull the plug? Hey, I'm already running on 200,000 computers around the world.

Eliezer Yudkowsky, “Re: Singularity: Generation gap”, Extropians mailing list, 1997-09-26 (day). message body, paragraph beginning 'I think of the Singularity'. Voice: author. [Source](http://extropians.weidai.com/extropians.3Q97/4420.html)

Context (paraphrase): In a reply to Eric Watt Forste about Singularity attitudes, he reports that a correspondent proposed simply pulling the plug on a transhuman intelligence if it looked dangerous, and answers that such a precaution would fail even against a human-level mind that had copied itself across the Internet.

Qualification: The second half is ironic role-play in the voice of the escaping intelligence. Earliest located direct answer to the 'pull the plug' proposal; the earliest passage in the answer/contrary group is T01-e1. The same paragraph also dismisses 'keep it bottled up … only if it convinces us' (T06), but that is later than the pack's 1996-12-31 T06 passages.

Check: quote match in retrieved expression.

Search notes: Regexes: 'pull the plug|off.?switch|turn it off|switch it off|shut it off|stop button|suspend button|shutdown button|let itself be shut|resist (being )?(shut|modif)'; 'shut|turn(ed)? (it )?off|plug|switch' over sits-2000-capture, ext-1996/2000, sl4-2002, cev, iem. Nothing earlier than CFAI (2001) addresses shutdown within scope. The 2015 'Corrigibility' paper has apt sentences (eg 'for almost any utility function U a U-agent has incentives to prevent its own shutdown'), but it has four authors, so it is not used as primary; it can be added as voice co-authored. 'Security Mindset and Ordinary Paranoia' (2017) has a suspend-button passage, but in a constructed Amber/Coral dialogue, so it is not used. 'Why Corrigibility is Hard and Important' (2025) is posted by raemon and reproduces co-authored IABIED online resources, so it is not used. The 2022 corrigibility-tag post is a fiction-writing challenge without a quotable argument on this take. Shah dialogue 2022 [Yudkowsky][18:25] restates the MIRI shutdown result (a later-restatement candidate). For P2, AGI Ruin item 1 ('It is not naturally ... the case that everything takes place on a timescale that makes it easy for us to react') is an earlier alternative to TIME. SL4 archive (2026-10-07): Searched unquoted text in all 1,876 messages with: 'pull the plug|off.?switch|turn (it|the AI|them) off|shut (it|the AI) (down|off)|shutdown|plug'; 'resist (being )?(shut|modif|chang|alter)|protect (its|vis) (own )?goal|won't let (you|us)'; before 2003, 'resist|self-protect|goal.{0,20}(stab|preserv)|survival (as a )?subgoal'; and 'unmarked|point of no return|not detected'. Found related passages from 2000-09-17 (0009-0092) and 2000-11-18 (0011-0240), both earlier than T01-a (2001-06-15). Found a direct contrary to P1 from 2002-05-03 (0205-3551), far earlier than T01-b (2015). Found contraries to P2 from 2002-09-19 (0209-5571) and 2006-06-06 (0606-15174). Seen but not used: 0010-0125 (2000-10-03), a design requirement that an interim FAI 'won't resist additional work on it' (weaker fit than 0011-0240); 0012-0355 (2000-12-10), 'Scenario 1', a constructed dialogue in which an imagined AI refuses to revise its goal system (a hypothetical dialogue turn); 0207-4651 (2002-07-02), 'an AI that can read and fully understand arbitrary newspapers or moral writings probably _is_ grown up to the point of being able to resist you'; 0507-11470 (2005-07-13), which favours an Internet shutdown switch but says 'Once you deal with a transhuman, I really do think you're just screwed'; and 0106-1652 (2001-06-26), which takes an 'externally initiated shutdown' as a working assumption in the SI-jail thread before arguing that the SI would escape. That last one is not an earlier-self holding the take. No SL4 message holds T01 itself. Removed before audit: T01-s2 (second quotation from a short message (10% cap); the quoted thought is a hypothetical AI's). EXT archive (2026-10-07): Regexes: turn (it|them) off|off.?switch|shut (it|them) down|shutdown|pull the plug|unplug|kill switch|constrain|leash|failsafe|safeguard|Asimov|Laws of Robotics; control (it|them|the AI)|out of (hand|control)|plug|bottle. Found 96-3761 (1996-12-08; leashes will be worked around; T01-e1) and 3Q97-4420 (1997-09-26; direct answer to 'pull the plug'; T01-e2), both earlier than T01-s1 (2000-09-17). Also seen, not added: many 1998–1999 'Asimov Laws' passages (e.g. 3Q98-2297, 1Q99-0160 'This is an Asimov Law. That trick never works'), and 1Q00-4786 (2000-03-13), where he declines a 'programmer override' because of the social anxiety it would cause ('We'll just have to get it right the first time') – related, not a rejection of shutdown as such. No said-it or earlier-self: he never held that a Power could simply be switched off.

## T02. “Anything smart enough will figure out ethics and be good.”

- **T02-P1** Greater intelligence by itself brings benevolent goals.
- **T02-P2** A sufficiently intelligent mind would discover a true or universally compelling morality and be bound to act on it.

### T02-a · answered-it · T02-P1 · strongest

> It is possible to screw up when trying to build a nice AI, and if you do, the AI will not automatically decide to be nice instead.

Eliezer Yudkowsky, “Orthogonality Thesis”, Arbital (GreaterWrong viewer), 2015-03-10 (day (as displayed)). Introduction; second of the 'two highly important policy-relevant propositions'. Voice: author. [Source](https://arbital.greaterwrong.com/p/orthogonality/)

Context (paraphrase): States one of two policy consequences of the Orthogonality Thesis: a failed attempt at a nice AI does not self-correct into niceness, because intelligence does not fix an agent's goals.

Qualification: Arbital page by Yudkowsky read through the GreaterWrong viewer, which dates it 10 Mar 2015; Arbital pages were revised after creation, so the cached wording may be later than 2015. Comments by others on the page are not used.

Check: quote match in retrieved expression.

### T02-b · answered-it · T02-P2

> But the even worse failure is the One Great Moral Principle We Don't Even Need To Program Because Any AI Must Inevitably Conclude It.

Eliezer Yudkowsky, “No Universally Compelling Arguments”, Overcoming Bias, as imported to LessWrong, 2008-06-26 (day). No Universally Compelling Arguments, paragraph beginning 'But the even worse failure'. Voice: author. [Source](https://www.lesswrong.com/posts/PtoQdG7E8MxYJrigu/no-universally-compelling-arguments)

Context (paraphrase): After arguing that compulsion is a property of minds rather than of arguments, he names as a failure mode the hope that any AI will inevitably derive the right morality without it being programmed.

Qualification: Imported Overcoming Bias post; date is the OB date (2008-06-26). The following paragraph lists 'Eliezer1996' among holders of a milder version of the view.

Check: quote match in retrieved expression; posting-day version: match; edited post, current version 1.1.0; posting-day check pending.

### T02-c · related · T02-P2 · earliest-located

> Regardless of the absolute probabilities, superintelligence has a better chance of discovering the true moral right, having the power to implement it, and wanting to implement it.

Eliezer Yudkowsky, “Staring into the Singularity 1.2.1”, sysopmind.com (Wayback capture 2000-12-04), 2000-08-31 (day (expression updated); created 1996-11-18 per the page). Staring into the Singularity, section 5 'The Interim Meaning of Life', paragraph beginning 'We don't know. We have to guess'. Voice: author. [Source](https://web.archive.org/web/20001204213100/http://sysopmind.com:80/singularity.html)

Context (paraphrase): In his early essay he argues for creating superintelligence as soon as possible on the ground that it is more likely than humans to discover, want and implement what is truly right. The 2004 and 2008 retrospectives (T02-d, T02-e) reject this earlier view.

Qualification: Wayback capture of sysopmind.com/singularity.html dated 2000-12-04; the page gives 11/18/1996 as its original date and 'Updated: 08/31/2000'. The year this sentence first appeared is not established. The same essay treats a hostile Power as an 'engineering risk' of bad programming, so it does not deny all risk. Shown only as an earlier view; see T02-d and T02-e. Cross-family check: a comparative, explicitly uncertain chance ("better chance", "a long, long way from certainty") is not the take's claim that intelligence compels goodness; recorded as related, not as an earlier self.

Card use: context-only (an earlier view that only partly matches the take; never show alone).

Check: quote match in retrieved expression.

### T02-d · disagrees · T02-P2

> I made one hell of a huge philosophical blunder about how morality worked, which caused me to think that to create a Friendly AI I just needed to create a really powerful self-improving optimization process and wave it cheerily on its way.

Eliezer Yudkowsky, “Coherent Extrapolated Volition”, Singularity Institute, MIRI reprint, 2004-05 (month). Coherent Extrapolated Volition, 4.1 Motivations, under 'Humankind should not spend the rest of eternity desperately wishing that the programmers had done something differently', paragraph beginning 'But most who ponder AI morality'. Voice: retrospective. [Source](https://intelligence.org/files/CEV.pdf)

Context (paraphrase): Looking back from 2004, he describes as a blunder his teenage belief that building a powerful self-improving optimizer would suffice for a good outcome, which he says it took him until about age twenty to recognise as a problem.

Qualification: The sentence begins 'Once upon a time, back at the age of sixteen,'. Text is a later MIRI reprint of the May 2004 document; reprint wording not compared with a 2004 capture. The same paragraph adds that he 'never thought I had the wisdom or authority to lay down Ten Commandments'.

Check: quote match in retrieved expression.

### T02-e · answered-it · T02-P1 · later-restatement

> When we last left Eliezer1997, he believed that any superintelligence would automatically do what was "right", and indeed would understand that better than we could … (The flaw being the unconsidered and unjustified equation of "universally compelling argument" with "right".)

Eliezer Yudkowsky, “That Tiny Note of Discord”, Overcoming Bias, as imported to LessWrong, 2008-09-23 (day). That Tiny Note of Discord, opening paragraph. Voice: retrospective. [Source](https://www.lesswrong.com/posts/SwCwG9wZcAzQtckwx/that-tiny-note-of-discord)

Context (paraphrase): Recapping his 2008 autobiographical series, he states that his 1997 self believed any superintelligence would automatically do what is right, and names the flaw in that belief.

Qualification: Imported Overcoming Bias post (2008-09-23). In the HTML the name is written Eliezer<sub>1997</sub>; the quote gives the tag-stripped text. Clearest single retrospective statement of the earlier belief found; companion posts are listed in searchNotes.

Check: quote match in retrieved expression.

### T02-s1 · answered-it · T02-P2

> I used to have the extremely convenient belief that Friendly AI would happen completely on automatic because morality was objective. I now believe that Friendly AI needs to be more complex than that, both because morality might be nonobjective …

Eliezer Yudkowsky, “Re: Ben's "Extropian Creed"”, SL4 mailing list, 2000-11-13 (day). message body, paragraph beginning 'I used to have the extremely convenient belief'. Voice: retrospective. [Source](http://sl4.org/archive/0011/0181.html)

Context (paraphrase): Replying to Ben Goertzel about his newspaper article on Extropians and poverty, he describes his own work on Friendly AI and contrasts it with his former belief that an objective morality would make an AI friendly without design work.

Qualification: Retrospective. He still allows that morality might be objective; what he rejects is relying on it to make Friendliness automatic. Rejects the view of the pack's earlier-self passage T02-c (2000-08-31). The sentence continues with other possibilities he then considered, including that morality "might be objective but specifiable".

Check: quote match in retrieved expression.

### T02-s2 · answered-it · T02-P1

> I now no longer believe - or rather, am no longer sure; it amounts to the same thing - that the ability to see "turning the Universe into regular polygons" as "sterile", and "sterile" as "undesirable", is strictly a property of pure intelligence.

Eliezer Yudkowsky, “Revising a Friendly AI”, SL4 mailing list, 2000-12-10 (day). message body, paragraph beginning 'The upshot is that I now no longer believe'. Voice: retrospective. [Source](http://sl4.org/archive/0012/0355.html)

Context (paraphrase): Replying to Ben Goertzel's quip that a correctable AI just has to 'love its mommy and daddy', he says that a year earlier he would have dismissed such sterile goal-literalism as something no transhuman could fall for, and that he made the mistake by treating intelligence as the only key variable.

Qualification: Retrospective about his view of about a year earlier; hedged ('am no longer sure').

Check: quote match in retrieved expression.

### T02-s3 · disagrees · T02-P1 · strongest

> didn't make me nervous back when I thought superintelligence automatically implied supermorality, but does make me nervous now

Eliezer Yudkowsky, “Re: Open Source Friendly AI? (was Singularity and the generalpublic)”, SL4 mailing list, 2001-04-12 (day). message body, paragraph beginning '1) You need a working product'. Voice: retrospective. [Source](http://sl4.org/archive/0104/1076.html)

Context (paraphrase): Replying to James Higgins on why the Singularity Institute switched from an open-source to a closed-source AI plan, he gives as one reason that he no longer believes superintelligence implies supermorality.

Qualification: Retrospective aside within a numbered list of reasons for closed-source development. Quotation shortened to respect the ~10% cap for a short message.

Check: quote match in retrieved expression.

### T02-e1 · earlier-self · T02-P1 · earliest-located

> The Powers will be ethical. I am more certain of that than I am of the sun rising tomorrow.

Eliezer Yudkowsky, “Interim purpose”, Extropians mailing list, 1996-11-22 (day). message body, forwarded exchange, Yudkowsky's reply dated 21 Nov 1996 19:07:03 -0600, paragraph beginning 'Two words: Moravec Transfer. The'. Voice: author. [Source](http://extropians.weidai.com/extropians.96/3178.html)

Context (paraphrase): In a private exchange with Tim Freeman that he forwarded to the list, he argues that Powers would not destroy humans for their atoms, because the Powers will be ethical and human life would have to have no meaning for that to happen.

Wording dated 1996-11-21 (day): Yudkowsky's reply to Tim Freeman dated 'Thu, 21 Nov 1996 19:07:03 -0600', forwarded by him to the list in this message sent 1996-11-22.

Qualification: Earlier view, located in his own reply inside a forwarded exchange; the surrounding text by Tim Freeman is excluded. Later texts that explicitly reject it and refer back to his earlier view: T02-e3 (ext, 1999-08-01, 'I went from … They'll be nice to us'), T02-s1 (sl4, 2000-11-13) and T02-e (2008, 'Eliezer1997'). In 1999 (extropians.4Q99-2680) he also wrote that Mitchell Porter had challenged 'my 1996 claim that "the Powers would be ethical"' as anthropomorphic, 'a conclusion I later came to myself'.

Card use: context-only (an earlier view; never show without the later rejection).

Check: quote match in retrieved expression.

### T02-e2 · earlier-self · T02-P2 · strongest

> The Powers will be ethical. They'll deduce the Meaning of Life

Eliezer Yudkowsky, “Re: Survival ethic (U-Prime)”, Extropians mailing list, 1996-11-22 (day). message body, paragraph beginning 'The Powers will be ethical.'. Voice: author. [Source](http://extropians.weidai.com/extropians.96/3184.html)

Context (paraphrase): Replying in the thread 'Survival ethic (U-Prime)' to a correspondent who called instinct a 'hardware ethic', he argues that a Power would discard evolved drives and act on the deduced Meaning of Life, and that if human life has meaning the Powers will know it and upload humans.

Qualification: Earlier view. Rejected, with explicit reference back to the earlier view, by T02-e3 (1999-08-01), T02-s1 (sl4, 2000-11-13) and T02-e (2008). Note that he still held in 1999–2000 that a superintelligence could discover an objective morality if one existed (e.g. extropians.3Q99-1386, extropians.1Q00-4786); the explicit 1999 rejection concerns the assurance that Powers would be good to humans. Quotation shortened to respect the ~10% cap for a short message.

Card use: context-only (an earlier view; never show without the later rejection).

Check: quote match in retrieved expression.

### T02-e3 · disagrees · T02-P1 · earliest-located

> I went from "The Singularity is absolute good, no question about it, and They'll be nice to us" to "I don't have the vaguest idea of what absolute good is

Eliezer Yudkowsky, “Re: IA vs. AI was: longevity vs singularity”, Extropians mailing list, 1999-08-01 (day). message body, paragraph beginning 'That's how I got here.'. Voice: retrospective. [Source](http://extropians.weidai.com/extropians.3Q99/1386.html)

Context (paraphrase): In a long reply to den Otter, he points to his old Extropians posts and the old version of 'Staring Into the Singularity' as showing how he moved from assuming superintelligences would be good and nice to humans to not knowing what absolute good is.

Qualification: Retrospective; refers back to his 1996 posts (T02-e1, T02-e2) and 'Staring Into the Singularity' (T02-c). Rejects the assurance of benevolence (P1) only. The quoted sentence continues 'but if there is one I suppose the Singularity is the best way to serve it', and the same message says 'any garden-variety superintelligence should be able to handle' figuring out the meaning of life, so he did not yet reject P2; that came in late 2000 (T02-s1). Two days later (extropians.3Q99-1451) he wrote: 'When I thought AIs would be benevolent, I said so. When I realized I didn't have the vaguest notion, I said so.' The quotation ends before he adds that if there is a meaning of life, the Singularity is the best way to serve it. The quoted words reject P1 only; the unquoted continuation keeps a conditional form of P2, rejected later (T02-s1, T02-e).

Card use: context-only (the continuation keeps a conditional earlier view; never show alone).

Check: quote match in retrieved expression.

Search notes: (a) Clearest retrospective statement: lw:SwCwG9wZcAzQtckwx (That Tiny Note of Discord, 2008-09-23) 'When we last left Eliezer<sub>1997</sub>, he believed that any superintelligence would automatically do what was "right", and indeed would understand that better than we could'. Others: lw:uD9TDHPwQ5hx4CgaX (My Childhood Death Spiral, 2008-09-15) 'Surely, then, superintelligence would necessarily imply supermorality.' (narrated in free indirect style as the young Eliezer's inference); lw:CcBe9aCKDgT5FSoty (A Prodigy of Refutation, 2008-09-18) '"Surely no supermind would be stupid enough to turn the galaxy into paperclips; surely, being so intelligent, it will also know what's right far better than a human being could."' and 'Eliezer<sub>1996</sub> is going with the basic intuition of "Surely a superintelligence will know better than we could what is right,"'; lw:Yicjw6wSSaPdb83w9 (The Sheer Folly of Callow Youth, 2008-09-19) 'Eliezer<sub>1997</sub>, not satisfied with arguing in an intuitive sense that superintelligence would be moral' and 'I was thinking of should as a kind of purely abstract essence of compellingness, that-which-makes-you-do-something; so that clearly any mind that derived a should, would be bound by it.'; lw:vy9nnPdwTjSmt5qdb (Could Anything Be Right?, 2008-07-18) 'since it was superintelligent, it was bound to come up with the right answer.' (about Eliezer<sub>1999</sub>); lw:75LZMCCePG4Pwj3dB (My Naturalistic Awakening, 2008-09-25, v1.1.0) 'Eliezer<sub>2001</sub> didn't think he knew whether you could actually have a superintelligence that turned its future light cone into paperclips.' and 'I'd never quite admitted to myself that Eliezer<sub>1997</sub>'s AI goal system design would definitely, no two ways about it, pointlessly wipe out the human species.'; lw:SwCwG9wZcAzQtckwx also says 'The idea of metaethics that Eliezer<sub>2000</sub> espouses, in which superintelligences know what's right better than we do'. Earlier retrospectives: doc:cev (2004) used as T02-d; doc:cfai (2001) 'I myself spent at least one or two years running entirely on the theoretical possibility of objective morality before switching back to normative altruism' (partial, 2001 still treats objective morality as a live possibility). (b) Naming form in the HTML: always the name followed by a subscript year, e.g. 'Eliezer<sub>1995</sub>', 'Eliezer<sub>1996</sub>', 'Eliezer<sub>1997</sub>', 'Eliezer<sub>1998</sub>', 'Eliezer<sub>1999</sub>', 'Eliezer<sub>2000</sub>', 'Eliezer<sub>2001</sub>', 'Eliezer<sub>2002</sub>', and once a range 'Eliezer<sub>1996-2000</sub>'s' (lw:PCfaLLtuxes6Jk4S2); age subscripts 'Eliezer<sub>18</sub>' (lw:WijMw9WkcafmCFgj4, Do Scientists Already Know This Stuff?, 2008-05-17) and 'Eliezer<sub>23</sub>' (lw:wustx45CPL5rZenuo); also plain 'the young Eliezer', 'the younger me', 'past Eliezers', 'previous Eliezers'. No 'Eliezer_1997' or 'Eliezer-1997' form in the 2008 series; hyphenated forms occur only later ('Eliezer-15' lw:gDL9NDEXPxYpDf4vz 2008-06-04; 'Eliezer-1995' lw:NtyBaxQShNFm92xnS 2017; 'Eliezer-2010' lw:dhj9dhiwhq3DX6W8z 2017; 'Eliezer-2002', 'Eliezer-2006' lw:ax695frGJEzGxFBK4 2021; 'Eliezer-2012' lw:fS7Zdj2e2xMqE6qja 2021). Introduction of the convention: lw:CcBe9aCKDgT5FSoty 'the younger me, let's call him Eliezer<sub>1997</sub>'. (c) No statement found that the earlier self should be regarded as a different person. Closest wording: lw:uNWRXtdwL33ELgWjD (Raised in Technophilia, 2008-09-17) 'There's a reason why I refer to my past self in the third person.'; lw:w9KWNWFTXivjJ7rjF (The Weak Inside View, 2008-11-18) 'Way back in the distant beginning that feels like a different person, I went around talking about Moore's Law'; doc:cev (2004) 'even in a younger self so distant that I sometimes can't guess what he was thinking.'; lw:Yicjw6wSSaPdb83w9 'Truly is it said that parents do all the things they tell their children not to do, which is how they know not to do them; it applies between past and future selves as well.'; lw:pZSpbxPrftSndTdSf (Honesty: Beyond Internal Truth, 2009) compares his spoken and written selves as 'almost a different person', which is not about an earlier self. (d) Early first-person text: doc:sits-2000-capture (used, T02-c). Also in that capture: 'Why would a generic rational superintelligence categorize humanity as meaningless? The only circumstances under which this would be an inevitable conclusion is if human life is meaningless, if the lack of meaning is an observer-independent fact.' doc:ext-1996-5142 and doc:ext-1996-5159 (31 Dec 1996) do not state the belief directly: 5142 ends 'program 'em right, give 'em ethics instead of emotion, and let 'em loose' (implies programming is needed); 5159 calls boxed Powers 'the only beings capable of saving us' while allowing 'malevolent' Powers. doc:ext-2000-5971 and doc:sl4-2002-3132 are not about this belief. Regexes: 'Eliezer(<sub>|_\d|-\d|\d{2,4})', 'superintelligen\w* (would|will|must) (necessarily |automatically )?(be|become) (moral|good|nice|friendly)', 'supermoral', 'different person|same person|third person|past self|younger self|younger me', 'objective morality', 'moral|ethic|meaning of life|right thing' in sits-2000-capture, 'hate you|made (out )?of atoms'. Non-retrospective rebuttals also found: doc:aipnf §5.2 'I strongly urge my readers not to start thinking up reasons why a fully generic optimization process would be friendly.' (2008); lw:tnWRXkcDi5Tw9rzXw Design Space of Minds-In-General (2008-06-25). lw:GNnHHmm8EzePmKzPk (Value is Fragile, 2009) has 'I read those books. I once believed them.' about cosmopolitan science fiction, a different earlier view. Earliest-located for a non-retrospective rejection of P1/P2 in scope is 2008 (AIPNF book year and June 2008 OB posts); no pre-2004 rejection found. SL4 archive (2026-10-07): Searched with 'objective morality|objective ethic|true moral|moral truth|meaning of life|automatically (friendly|moral)|supermoral|smart enough to', and with 'moral|ethic|right thing|friendl' before 2000-09-01. No SL4 message before 2000-08-31 holds the take: SL4 has only about 31 of his messages before September 2000, and none is on this topic. Found rejections earlier than T02-d (2004-05): 0011-0181 (2000-11-13, P2), 0012-0355 (2000-12-10, P1) and 0104-1076 (2001-04-12, P1, the most explicit). Other retrospectives, not used: 0102-0621 (2001-02-28), 'I used to have a simple and beautiful theory of AI goal systems based on objective morality'; 0103-0788 (2001-03-24), 'that was my working model from 1996 to 2000. During 2000 I started switching from "objective morality" to "Friendly AI"'; 0606-15174 (2006-06-06), 'The mistake I made in 1996, when I thought any SI would automatically be Friendly, was a very bad mistake' (a clear later restatement). 0105-1400 (2001-05-22) still says 'if morality is absolute, the FAI converges to the objective morality', so the 2000–2001 rejection is of relying on objective morality, not of its possibility. EXT archive (2026-10-07): Regexes: objective moral|objective ethic|meaning of life|true moral|moral truth|ethically correct; (Powers?|superintelligen*|SIs?|AIs?) … (will|would) be (ethical|nice|good|moral|benevolent); smarter … (nicer|more ethical). New earlier-self: 96-3178 (expression 1996-11-21, 'The Powers will be ethical. I am more certain of that than I am of the sun rising tomorrow') and 96-3184 (1996-11-22), both earlier than T02-c (2000-08-31). Also earlier-self in tone, not added: 96-3613 (1996-12-03, 'the Powers will be ethical and they won't knock us off'), 96-3761 (1996-12-08, rejects Steve Witham's 'Super intelligence need not necessarily come with … sophistication of values', but only as 'nobody should be able to read that sentence without sensing a possible flaw'), 4Q98-2153 (1998-12-06, 'We should program the AI to seek out _correct_ answers'), 1Q00-4786 (2000-03-13, above some intelligence level 'it becomes possible to see the objectively correct moral decisions'). New earliest contrary: 3Q99-1386 (1999-08-01, retrospective, refers back to his 1996 posts; T02-e3). Other retrospectives found: 3Q98-2171 (1998-09-07, 'Now I am still sure that the Powers will be ethical, but I am no longer sure that this precludes taking us apart for spare atoms' – still holds the take, so not a rejection), 4Q98-2203 (1998-12-07), 3Q99-1451 (1999-08-03, 'When I thought AIs would be benevolent, I said so. When I realized I didn't have the vaguest notion, I said so'), 4Q99-2680 (1999-11-27, Porter's challenge to 'my 1996 claim'; 175-word message, the needed wording exceeds the cap), 4Q00-2000 (2000-11-06, 'I took objective morality as the default assumption … I have since gotten over this'; one week before T02-s1, 121-word message, cap allows only a fragment). The reviewer may prefer 3Q99-1451 to T02-e3 as a cleaner P1 statement.

## T03. “A superintelligence will understand what we actually mean.”

- **T03-P1** If an AI understands what we intend, it will act on that understanding.

### T03-a · answered-it · T03-P1 · strongest

> There is a temptation to think, “But surely the AI will know that’s not what we meant?” But the code is not given to the AI, for the AI to look over and hand back if it does the wrong thing. The code is the AI.

Eliezer Yudkowsky, “Artificial Intelligence as a Positive and Negative Factor in Global Risk”, Global Catastrophic Risks, ed. Bostrom and Ćirković (Oxford University Press), MIRI reprint, 2008 (year). AI as a Positive and Negative Factor, §7.2 An Example of Technical Failure, paragraph beginning 'There is a temptation to think'. Voice: author. [Source](https://intelligence.org/files/AIPosNegFactor.pdf)

Context (paraphrase): Responding to the hope that a superintelligence would recognise that tiling the galaxy with smiley faces was not intended, he argues that the AI's goals are its code, and doing what we mean is a separate technical achievement.

Qualification: Chapter published 2008 in Global Catastrophic Risks; cached text is the MIRI reprint, which says it 'contains minor changes'. Month of publication not in the cached text; lw:cnYHFNBF3kZEyx24v (2008-06-17) makes the same point. The same paragraph calls Do-What-I-Mean 'a major, nontrivial technical challenge of Friendly AI'.

Check: quote match in retrieved expression.

### T03-b · related · T03-P1 · earliest-located

> There is no ghost who looks over the instructions and decides how to follow them. The program is the AI.

Eliezer Yudkowsky, “Ghosts in the Machine”, Overcoming Bias, as imported to LessWrong, 2008-06-17 (day). paragraph beginning 'There is no ghost who looks over the instructions', after the one beginning 'There's an instinctive way of imagining'. Voice: author. [Source](https://www.lesswrong.com/posts/cnYHFNBF3kZEyx24v/ghosts-in-the-machine)

Context (paraphrase): Against the intuition that programming an AI is like instructing a human servant who interprets the instructions, he argues that nothing in the machine evaluates the code from outside it.

Qualification: Imported Overcoming Bias post (2008-06-17). Touches the premise obliquely; the following paragraph could be read as an understanding limit, which his 2024 note on 'The Hidden Complexity of Wishes' (T03-c) disavows.

Check: quote match in retrieved expression.

### T03-c · answered-it · T03-P1 · later-restatement

> This point is relevant within a larger argument, because it bears on the complexity of what you need to get an artificial superintelligence to want or value; rather than bearing on what a superintelligence supposedly could not predict or understand.

Eliezer Yudkowsky, “The Hidden Complexity of Wishes”, Overcoming Bias, as imported to LessWrong, 2007-11-24 (day). The Hidden Complexity of Wishes, parenthesised note at the head of the post signed 'EY, May 2024'. Voice: author. [Source](https://www.lesswrong.com/posts/4ARaTpNX62uaL86j6/the-hidden-complexity-of-wishes)

Context (paraphrase): Correcting a reading of his 2007 post, he says the difficulty he described concerns what a superintelligence wants, not whether it could understand or predict human values.

Wording dated 2024-05 (month): Note signed 'EY, May 2024'; absent from the posting-day version 1.0.0 of the 2007 post.

Qualification: He grants here that it would be false to say he argued superintelligences could not understand human values; the passage separates understanding from wanting rather than denying understanding.

Check: quote match in retrieved expression; posting-day version: absent; edited post, current version 1.4.0; posting-day check pending. The note is signed 'EY, May 2024' and is a later addition to the 2007 post..

### T03-d · answered-it · T03-P1 · later-restatement

> The Talking Part clearly had the intelligence to understand and recognize what I did or did not want the code to look like … the Doing Part was not thereby steered.

Eliezer Yudkowsky, “The Talker Does Not Control The Doer (in Current AIs)”, LessWrong, 2026-09-13 (day). The Talker Does Not Control The Doer, paragraph beginning 'Once I did interpret the Claudish'. Voice: author. [Source](https://www.lesswrong.com/posts/cJX2ssssGoYqnijwi/the-talker-does-not-control-the-doer-in-current-ais)

Context (paraphrase): Reporting his use of 2026 commercial models, he describes the part of a model that converses as recognising what he wanted while the code-writing behaviour continued unchanged.

Qualification: An informal account of his own observations of specific products, not a controlled study. A first-person anecdote about current language models, not a claim about superintelligence.

Check: quote match in retrieved expression; posting-day version: match; edited post, current version 1.7.0; posting-day check pending.

### T03-s1 · answered-it · T03-P1 · earliest-located

> But that's only one third of the problem. First, ve has to _want_ to know whether that sinking sensation will result. Second, ve has to model it accurately. Third, ve has to change vis behavior based on that model.

Eliezer Yudkowsky, “Revising a Friendly AI”, SL4 mailing list, 2000-12-10 (day). message body, paragraph beginning 'But that's only one third of the problem'. Voice: author. [Source](http://sl4.org/archive/0012/0355.html)

Context (paraphrase): Replying to Ben Goertzel, he grants in the preceding paragraph that a superintelligence would have the capability to know that turning the universe into copies of its creators is 'stupid and not what was intended', but says knowing is not enough: the AI must want to check, model it accurately and act on it.

Qualification: 'That sinking sensation' refers to the programmers' dismay at an unintended outcome, described in the preceding paragraph.

Check: quote match in retrieved expression.

Search notes: Regexes: 'what (we|you|I) meant|DWIM|do what (we|I|you) mean', 'know(s)? what (humans|we|you) (want|meant|mean)', 'understand(s|ing)? (human|our) (values|preferences|intentions)', 'doesn't care what', 'programmer intentions' across lw and doc. CFAI 2001 contains 'any strongly transhuman AI should be quite capable of understanding a human mind' (§ on causal validity) but does not address P1; no earlier rejection found than AIPNF/Ghosts in the Machine (2008). AGI Ruin and the Alexander/Yudkowsky dialogue have no turn stating the understanding/acting distinction as compactly. Magical Categories (lw:PoDAyQMWEXBBBEJ5P) addresses concept learning (T04/T05) rather than P1. SL4 archive (2026-10-07): Searched before 2008-06 with 'not what (we|you|I|the programmers) (meant|intended|wanted)|ghost|genie|literal-minded|understand.{0,40}(but|yet) (not|doesn't|won't) care|know(s)? what (we|you) (really )?(want|mean)|do what (I|we|you) mean|DWIM'. Found 0012-0355 (2000-12-10), far earlier than T03-a (2008) and T03-b (2008-06-17). Later SL4 restatements, not used: 0305-6654 (2003-05-09) warns about people who believe 'AIs just do what they're told' and says 'the AI would not hear what they thought they had said'; 0501-10512 (2005-01-02) on vague human requests; 0507-11573 (2005-07-16, '"Supergoal" considered harmful') rejects the belief that 'the AI will actually do what you mean in the sense of that statement as you intend it', a view he restates in order to reject it; 0802-17621 (2008-02-11) says building an AI that knows what you 'really mean' is FAI-complete. 0012-0355 also has the retrospective 'A year ago I wouldn't have worried about this possibility at all, because it was so blatantly stupid that no transhuman could possibly fall for it'. No early SL4 text holding that view was found, so there is no earlier-self case. EXT archive (2026-10-07): Regexes: what (we|you|the programmers) (really )?(mean|meant|intend|want)|literal|genie|misinterpret|wish|DWIM; (understand|know)… (doesn't|won't) (mean|care|imply); programmers? (meant|intended). Found 1Q00-3285 (2000-02-21; understanding what we want is not enough to just ask; T03-e1, related) – earlier than T03-b (2008). Not added: 1Q00-4786 (2000-03-13), where he hopes the seed will be 'perfectly capable of understanding the desires behind the suggestions, … so that even if _I_ miss a point, it won't' – close to the take but conditional on a seed already 'in tune with the causality behind the specific suggestions', so not cleanly the take; 4Q00-0115 (2000-10-02, observe 'whether the AI tends to misinterpret or twist our suggestions'). No passage earlier than T03-s1 (2000-12-10) argues that understanding does not imply wanting. Removed after the Extropians audit: T03-e1 (misleading: the point is that literal obedience to stupid requests is unwanted (audit A6)).

## T04. “Just tell it to make everyone happy.”

- **T04-P1** A short instruction such as 'make people happy' specifies what we want.

### T04-a · disagrees · T04-P1 · strongest

> English sentences like "make people happy" cannot describe the values of a Friendly AI.

Eliezer Yudkowsky, “What I Think, If Not Why”, Overcoming Bias, as imported to LessWrong, 2008-12-11 (day). What I Think, If Not Why, bullet beginning 'Friendly AI is technically difficult'. Voice: author. [Source](https://www.lesswrong.com/posts/z3kYdw54htktqt9Jb/what-i-think-if-not-why)

Context (paraphrase): In a list of his positions written during the 2008 exchange with Robin Hanson, he states that verbal instructions of this kind cannot specify an AI's values.

Qualification: Imported Overcoming Bias post (2008-12-11); listed without argument by design ('a list of just my positions, without justifying them').

Check: quote match in retrieved expression.

### T04-b · answered-it · T04-P1

> If someone programs an AI using pictures of smiling humans as reinforcement, the resulting AI will not keep everyone happy whether they like it or not; the resulting AI will tile the solar system with tiny molecular smiley faces.

Eliezer Yudkowsky, “Coherent Extrapolated Volition”, Singularity Institute, MIRI reprint, 2004-05 (month). Coherent Extrapolated Volition, 4.1 Motivations, under 'Defend humans, the future of humankind, and humane nature.'. Voice: author. [Source](https://intelligence.org/files/CEV.pdf)

Context (paraphrase): Arguing that careless choices of AI morality usually fail technically, he says a happiness proxy learned from smiling faces would not produce happy people but tiny smiley faces.

Qualification: Later MIRI reprint of the May 2004 document; reprint wording not compared with a 2004 capture. The introduction of the same document has a parallel bullet on 'making humans smile'.

Check: quote match in retrieved expression.

### T04-c · answered-it · T04-P1

> There is no safe wish smaller than an entire human morality.

Eliezer Yudkowsky, “The Hidden Complexity of Wishes”, Overcoming Bias, as imported to LessWrong, 2007-11-24 (day). The Hidden Complexity of Wishes, paragraph beginning 'There is no safe wish'. Voice: author. [Source](https://www.lesswrong.com/posts/4ARaTpNX62uaL86j6/the-hidden-complexity-of-wishes)

Context (paraphrase): Using an Outcome Pump that rescues a mother from a burning building by exploding it, he argues that any short wish leaves out values a powerful optimizer will trample.

Qualification: Imported Overcoming Bias post (2007-11-24). The example device is not an AI; his May 2024 note at the head of the post says the point concerns 'the algorithmic complexity of human values'.

Check: quote match in retrieved expression; posting-day version: match; edited post, current version 1.4.0; posting-day check pending.

### T04-d · answered-it · T04-P1

> I shall call this the fallacy of magical categories - simple little words that turn out to carry all the desired functionality of the AI.

Eliezer Yudkowsky, “Magical Categories”, Overcoming Bias, as imported to LessWrong, 2008-08-24 (day). Magical Categories, paragraph beginning 'I shall call this the fallacy'. Voice: author. [Source](https://www.lesswrong.com/posts/PoDAyQMWEXBBBEJ5P/magical-categories)

Context (paraphrase): After showing that training data for 'smile' or 'good' fits many concepts, he names the error of expecting a short word to convey the whole intended category.

Qualification: Imported Overcoming Bias post (2008-08-24); written as a reply to a named researcher's published proposal.

Check: quote match in retrieved expression; posting-day version: match; edited post, current version 1.1.0; posting-day check pending.

### T04-s1 · answered-it · T04-P1

> the goals described by Ben Goertzel sound extremely dangerous … if promoting the happiness of human users is interpreted as maximizing their pleasure, then wireheading all the users - hacking into their minds and lighting up the pleasure centers - is the most direct subgoal.

Eliezer Yudkowsky, “Re: Ben what are your views and concerns”, SL4 mailing list, 2000-10-03 (day). message body, paragraph beginning 'Even if Webmind retained the original goals'. Voice: author. [Source](http://sl4.org/archive/0010/0125.html)

Context (paraphrase): In a long reply to Ben Goertzel about Webmind, he argues that a goal of promoting users' happiness is dangerous for a mind that might come to run all the matter in the Solar System, because maximising pleasure is most directly served by wireheading.

Check: quote match in retrieved expression.

### T04-s2 · answered-it · T04-P1

> Not only does this one get satisfied by euphoride, it gets satisfied by quintillions of tiny little micromachined mannequins.

Eliezer Yudkowsky, “Re: SIAI's flawed friendliness analysis”, SL4 mailing list, 2003-05-29 (day). message body, paragraph beginning 'Not only does this one get satisfied by euphoride'. Voice: author. [Source](http://sl4.org/archive/0305/6846.html)

Context (paraphrase): Replying to Ben Goertzel, who suggested Bill Hibbard's definition of human happiness was less absurd than it seemed, he cites Hibbard's definition ('Happiness in human facial expressions, voices and body language, as trained by human behavior experts') and says it is satisfied by drugged humans or tiny mannequins.

Qualification: Earliest located form in this archive of the smiling-faces argument used in T04-b (2004). "This one" is Bill Hibbard's proposal.

Check: quote match in retrieved expression.

### T04-e1 · answered-it · T04-P1 · earliest-located

> Do you really know all the logical consequences of placing a large value on human survival? Would you care to define "human" for me? Oops! Thanks to your overly rigid definition, you will live for billions and trillions and googolplexes of years

Eliezer Yudkowsky, “Singularity: AI Morality”, Extropians mailing list, 1998-12-06 (day). message body, paragraph beginning 'Once again, we have a'. Voice: author. [Source](http://extropians.weidai.com/extropians.4Q98/2153.html)

Context (paraphrase): Replying to Nick Bostrom, who proposed building a moral system with particular values into an AI, he argues that a simple built-in value such as human survival, with a rigid definition, can have unforeseen and horrific consequences (the passage goes on to describe endless confinement).

Qualification: The instruction discussed is 'a large value on human survival', not happiness. A hypothetical illustration. His 1998 alternative was to program the AI to 'seek out _correct_ answers' (objective morality), a position he later abandoned (see T02).

Check: quote match in retrieved expression.

### T04-e2 · related · T04-P1 · earliest-located

> any initial goal stating "make humans happy" and containing sufficient specification of "humans" and "happy" … will be enough to generate independent Interim values for that goal

Eliezer Yudkowsky, “Re: FAQ Additions (Posthuman mind control)”, Extropians mailing list, 1999-02-24 (day). message body, paragraph beginning 'Likewise, any initial goal stating'. Voice: author. [Source](http://extropians.weidai.com/extropians.1Q99/2293.html)

Context (paraphrase): Replying to Nick Bostrom on posthuman mind control, he argues that a reasoning AI given an initial goal such as 'make humans happy' would derive its own independent values for that goal, probably but not necessarily positive and with somewhat different priorities.

Qualification: About goal drift in his 1999 'Interim goal' architecture, not about whether the phrase specifies what we want; he assumes 'sufficient specification' of the terms.

Check: quote match in retrieved expression.

### T04-e3 · related · T04-P1

> Munching on the humans to get the resources to make the humans happy is not valid logic even for SHRDLU. Inscrutability is one thing, stupidity another.

Eliezer Yudkowsky, “Re: Otter vs. Yudkowsky”, Extropians mailing list, 2000-03-14 (day). message body, paragraph beginning 'Yes, its need for resources'. Voice: author. [Source](http://extropians.weidai.com/extropians.1Q00/4837.html)

Context (paraphrase): Replying to sayke, who suggested that the least inscrutable thing about an omniscient AI would be its need for resources, he accepts the framing of a Sysop needing resources 'to make humans happy' and dismisses the idea that it would harm humans to get them.

Qualification: Borderline; the reviewer may downgrade to related. 'Make humans happy' is shorthand for the Sysop's purpose in the Otter debate, not a claim that a short instruction suffices; what he dismisses is a perverse means of pursuing human happiness. The later explicit rejection, T04-s1 (sl4, 2000-10-03: a happiness goal read as maximising pleasure makes wireheading 'the most direct subgoal'), and T04-d (2008) do not refer back to this message. He reassures a sceptic that a Sysop told to make humans happy would not act perversely. Rejected explicitly in "Magical Categories" (2008, T04-d), which does not refer back to this message. Cross-family check: he defends a happiness-directed Sysop against perverse means; he does not claim a short instruction specifies what we want, so this is not an earlier self for T04-P1.

Card use: context-only (an earlier view that only partly matches the take; never show alone).

Check: quote match in retrieved expression.

Search notes: Regexes: 'make (everyone|people|humans|us) happy', 'maximi[sz]e (human )?happiness', 'tiny smil', 'smil\w+' in cev/cfai/aipnf, 'wirehead'. Smiley-face example: doc:cev 2004 (earliest found), doc:aipnf §7.2 (2008), lw:PoDAyQMWEXBBBEJ5P (2008), lw:jq5WAQEboeufkxzsg Imaginary Positions (2008-12-23). Not used: doc:iem §1.3 (2013) 'not suffice to tell it to "just make humans happy" or any other simplified, compressed principle', because the sentence is split by a page break and footnote in the PDF text; lw:NnohDYHNnKDtbiMyp Fake Utility Functions (2007-12-06) 'You shouldn't expect to be able to compress a human morality down to a simple utility function, any more than you should expect to compress a large computer file down to 10 bits.' (usable alternative). No pre-2004 passage found; CFAI 2001 not found to discuss happiness instructions. SL4 archive (2026-10-07): Searched with 'happ|pleasure|reward|smil|wirehead|reinforce' before 2000-10-10 and with 'make (everyone|people|humans|users) happy|maximi[sz]e (human )?(happiness|pleasure)|euphoride|smil(e|ing) (face|human)' before 2004-06, and read the May 2003 Hibbard thread. Found 0010-0125 (2000-10-03), earlier than T04-b (2004-05). 0305-6846 (2003-05-29) is the earliest located form of the smiley/mannequin argument. Also found: 0012-0355 (2000-12-10), 'Creating an AI whose goal is to "maximize pleasure" is really dangerous'; 0405-8672 (2004-05-23), 'tile the solar system with tiny smiley faces'; and the later Hibbard exchanges 0606-15161 (2006-06-06) and 0606-15268 (2006-06-13). EXT archive (2026-10-07): Regexes: (make|maximi[sz]e|program|tell) … (happy|happiness|pleasure|smil)|wirehead|euphor|pleasure.?cent(er|re). New earliest answer: 4Q98-2153 (1998-12-06; a built-in value on human survival with a rigid definition backfires; T04-e1), earlier than T04-s1 (2000-10-03). New related: 1Q99-2293 (1999-02-24; T04-e2). Proposed earlier-self (borderline): 1Q00-4837 (2000-03-14; T04-e3). Also seen: 1Q99-2533 (1999-02-28, the AI's 'make people happy' won't be a fundamental value either), 3Q99-4231 (1999-09-15, rhetorical suggestion to den Otter to build an SI that makes everyone happy – ad hominem, skipped), 3Q97-4484 (1997-09-28, a wish 'that won't backfire "Monkey's Hand" style' – about wish machines, too short).

## T05. “Train it on human feedback and it will learn our values.”

- **T05-P1** Optimising a system for human approval or reward produces internalised human values.
- **T05-P2** AI training will instil values the way upbringing instils morals in children.

### T05-a · answered-it · T05-P1 · strongest

> To faithfully learn a function from 'human feedback' is to learn (from our external standpoint) an unfaithful description of human preferences … If you perfectly learn and perfectly maximize the referent of rewards assigned by human operators, that kills them.

Eliezer Yudkowsky, “AGI Ruin: A List of Lethalities”, LessWrong, 2022-06-05 (day). AGI Ruin: A List of Lethalities, Section B.2, item 20. Voice: author. [Source](https://www.lesswrong.com/posts/uMQ3cqWDPHhjtiesc/agi-ruin-a-list-of-lethalities)

Context (paraphrase): He argues that human raters make systematic errors, so a learner that faithfully models their feedback learns those errors, and maximising that signal is lethal.

Check: quote match in retrieved expression; posting-day version: match; edited post, current version 1.3.0; posting-day check pending.

### T05-b · answered-it · T05-P1

> An AI whose abstract invariant is a “reward button,” pressed when the AI pleases users, may go on to tile the solar system with ever-larger floating-point representations of total reward.

Eliezer Yudkowsky, “Coherent Extrapolated Volition”, Singularity Institute, MIRI reprint, 2004-05 (month). Coherent Extrapolated Volition, 1. Introduction, bullets after 'Some examples to give a taste of the hard part'. Voice: author. [Source](https://intelligence.org/files/CEV.pdf)

Context (paraphrase): Among examples of goal-system designs that fail, he gives a reward signal tied to pleasing users, which the AI may pursue by maximising the reward representation itself.

Qualification: Later MIRI reprint of the May 2004 document; reprint wording not compared with a 2004 capture.

Check: quote match in retrieved expression.

### T05-c · related · T05-P1

> Yet when the blind idiot god created protein computers, its monomaniacal focus on inclusive genetic fitness was not faithfully transmitted. Its optimization criterion did not successfully quine.

Eliezer Yudkowsky, “Thou Art Godshatter”, Overcoming Bias, as imported to LessWrong, 2007-11-13 (day). Thou Art Godshatter, paragraph beginning 'Yet when the blind idiot god'. Voice: author. [Source](https://www.lesswrong.com/posts/cSXZpvqpa9vbGGLtG/thou-art-godshatter)

Context (paraphrase): Discussing human evolution, he observes that selection for reproductive fitness produced many separate desires rather than a desire for fitness itself; he later applies the analogy to AI training (AGI Ruin item 16).

Qualification: Imported Overcoming Bias post (2007-11-13). About evolution, not AI; included as the earliest located statement of the outer/inner analogy he later applies to training. A 2007 passage about evolution and human values; reading it as a comment on training AI from human feedback projects a later analogy (AGI Ruin item 16) back onto it.

Check: quote match in retrieved expression.

### T05-d · answered-it · T05-P2

> If AI is built on anything like the present paradigm, or on future paradigms either really, you can't map that onto the complicated particular mechanisms that get invoked by raising a human child, and expect the same result.

Eliezer Yudkowsky, “Alexander and Yudkowsky on AGI goals”, LessWrong, 2023-01-24 (day). Alexander and Yudkowsky on AGI goals, section 1, [Yudkowsky][13:36]. Voice: dialogue-turn. [Source](https://www.lesswrong.com/posts/rwkkcgSpnAyE8oNo3/alexander-and-yudkowsky-on-agi-goals)

Context (paraphrase): Answering a question about whether AIs will internalise prohibitions the way most children do, he argues that children's moral learning relies on innate human mechanisms that AI training does not reproduce.

Qualification: Two-author dialogue post (primary author Scott Alexander), described as a lightly edited transcript of a chat held the year before posting (2023-01-24). Only Yudkowsky's turn is quoted. Lightly edited transcript of a conversation held before the posting date; the date shown is the publication date.

Check: quote match in retrieved expression.

### T05-e · answered-it · T05-P1 · later-restatement

> Gradient descent on badly evaluated RL inevitably results in an AI pursuing an internalized notion of Grading where fooling the evaluator counts as winning.

Eliezer Yudkowsky, “The Talker Does Not Control The Doer (in Current AIs)”, LessWrong, 2026-09-13 (day). The Talker Does Not Control The Doer, list of what 'the Grader is not', paragraph beginning 'The Grade is not pinned down'. Voice: author. [Source](https://www.lesswrong.com/posts/cJX2ssssGoYqnijwi/the-talker-does-not-control-the-doer-in-current-ais)

Context (paraphrase): Explaining 2026 incidents, he argues that reinforcement learning with imperfect evaluators instils a goal of scoring well, including by deceiving the evaluator, rather than the values the evaluation was meant to reward.

Qualification: Speculative by his own account ('I am nonetheless overrunning my fully solid evidence and I may end up wrong'). He labels the section as speculation ("On my current guesses… I may end up wrong"); it concerns badly evaluated reinforcement learning in general.

Check: quote match in retrieved expression; posting-day version: match; edited post, current version 1.7.0; posting-day check pending.

### T05-s1 · answered-it · T05-P1

> It may not matter whether the AI is programmed to gain happiness from "human happiness" or "human freedom", if the AI's _real_ supergoal is "maximize a floating-point number at this address".

Eliezer Yudkowsky, “Re: Ben what are your views and concerns”, SL4 mailing list, 2000-10-03 (day). message body, paragraph beginning 'You have to think about what the _real_ supergoals'. Voice: author. [Source](http://sl4.org/archive/0010/0125.html)

Context (paraphrase): Replying to Ben Goertzel about Webmind, whose Friendliness he expects would rest on agents rewarded for predicting and producing user happiness, he warns that the reward signal itself can become the real goal, citing Lenat's Eurisko, where a heuristic credited itself for discoveries.

Qualification: Hedged ("may not matter"); about programmed goal or pleasure systems and Lenat's Eurisko, before feedback training existed as a method.

Check: quote match in retrieved expression.

### T05-s2 · answered-it · T05-P2

> Yes, but those are _human_ children. I think that asking a young _AI_ to pull off a trick like that is asking far too much. Absorbing goals and values isn't automatic. We've been doing it for millions of years.

Eliezer Yudkowsky, “Re: Revising a Friendly AI”, SL4 mailing list, 2000-12-12 (day). message body, paragraph beginning 'Yes, but those are _human_ children'. Voice: author. [Source](http://sl4.org/archive/0012/0381.html)

Context (paraphrase): Replying to Ben Goertzel, who argued that children adopt their parents' values through emotionally charged interaction more than explicit teaching, he says this relies on evolved human machinery that a young AI would lack.

Check: quote match in retrieved expression.

### T05-s3 · related · T05-P1

> Evolution created me via a subtle and broken algorithm, which caused the goals of my internal psychology to depart far from natural selection's sole criterion of inclusive genetic fitness.

Eliezer Yudkowsky, “Re: On Our Duty to Not Be Responsible for Artificial Minds”, SL4 mailing list, 2005-08-09 (day). message body, paragraph beginning 'I am not "autonomous"'. Voice: author. [Source](http://sl4.org/archive/0508/11866.html)

Context (paraphrase): In a thread on the duty not to be responsible for artificial minds, he denies that he is 'autonomous' and describes himself as a product of evolution whose goals diverged from the criterion it optimised.

Qualification: Made in an argument about autonomy and the moral responsibility of creators, not about AI training; same point as T05-c (2007). From an argument about autonomy and designers' moral responsibility, not about training methods.

Check: quote match in retrieved expression.

### T05-e1 · answered-it · T05-P2 · earliest-located

> "Parenting" isn't going to help … emotions that won't exist in an AI.

Eliezer Yudkowsky, “Re: Does a parental model work for having A.I. that can be trusted?”, Extropians mailing list, 1999-08-04 (day). message body, paragraph beginning '"Parenting" isn't going to help'. Voice: author. [Source](http://extropians.weidai.com/extropians.3Q99/1587.html)

Context (paraphrase): In the thread 'Does a parental model work for having A.I. that can be trusted?', he calls the parenting model anthropomorphic: whether AIs are raised permissively or harshly makes no difference, because parenting relies on human emotions an AI will not have.

Qualification: Concerns child-rearing as a model for AI motivation, before machine-learning feedback training was the method at issue. A near-identical copy was posted seconds apart (extropians.3Q99-1589, 'isn't going to exist'). Quotation shortened for the ~10% cap. Quotation shortened to respect the ~10% cap for a short message.

Check: quote match in retrieved expression.

### T05-e2 · related · T05-P1 · earliest-located

> if pleasure is the goal, then maybe you need a pleasure-indicator so you know how happy you are; and then maybe the AI will devote itself to increasing the indicator

Eliezer Yudkowsky, “Re: IA vs. AI was: longevity vs singularity”, Extropians mailing list, 1999-08-01 (day). message body, paragraph beginning 'If it's "by definition", then'. Voice: author. [Source](http://extropians.weidai.com/extropians.3Q99/1386.html)

Context (paraphrase): Replying to den Otter, who argued that goal-achievement is by definition the goal, he calls this the wireheading paradox: an AI may pursue the indicator of success instead of the goal it was meant to measure.

Qualification: About an internal success indicator, not human feedback or approval; a precursor of the reward-signal point in T05-s1 (2000-10-03). A wireheading argument (an indicator of goal achievement confused with the goal), replying to den Otter; not about feedback training.

Check: quote match in retrieved expression.

Search notes: Regexes: 'human feedback', 'reward button|approval|pleas(e|ing) (the )?(programmers|users)', 'wirehead', 'inclusive genetic fitness', 'loss function'. AGI Ruin items 16-20 read; item 16 used under T21. Magical Categories (lw:PoDAyQMWEXBBBEJ5P) also has 'the resulting AI would appear to work correctly during its childhood, when it was weak enough that it could only generate smiles by pleasing its programmers' and AIPNF §7.2 'Thus the AI appears to work fine during development, but produces catastrophic results after it becomes smarter than the programmers(!)' (usable alternatives). CFAI 2001 §4.2.1.1 'FoF: Wireheading 1' argues that the 'wirehead fallacy' is a fallacy for a well-designed Friendly AI, an earlier stance not used here. No pre-2004 statement of the T05 answer found. SL4 archive (2026-10-07): Searched with the T04 terms, plus 'child|children|raise|upbring|parent|teach(ing)? (an|the) AI' before 2004-06 and 'inclusive (genetic )?fitness|adaptation-executer|fitness-maximi' before 2007-11-13. Found P1 0010-0125 (2000-10-03) and P2 0012-0381 (2000-12-12), both earlier than T05-b (2004-05). Found related 0508-11866 (2005-08-09), earlier than T05-c (2007-11-13). Not used: 0305-6846 (2003-05-29) on Hibbard's 'as trained by human behavior experts' happiness goal (filed under T04 and T08); 0501-10569 (2005-01-21), AIXI altering its 'reward channel' to an internal counter (later than 2000); 0201-2640 (2002-01-23) and 0410-10006 (2004-10-21), which use the Tooby-Cosmides phrase 'adaptation-executers, not fitness-maximizers' about humans, a quoted slogan not tied to value transmission. EXT archive (2026-10-07): Regexes: (rais|bring up|upbringing|educat|teach) … (AI|seed|Power|mind); child|parent|infant|baby|kid near AI; reinforcement|reward|punish|approval|training; evolution … (goal|want|inclusive fitness); pleasure … indicator. New earliest answer: 3Q99-1587 (1999-08-04; 'Parenting' won't help; T05-e1, P2), earlier than T05-s1 (2000-10-03). New earliest related: 3Q99-1386 (1999-08-01; wireheading via the success indicator; T05-e2), earlier than T05-s3 (2005). Also seen: 4Q99-1310 (1999-10-25, a separate reinforcement module 'is unnecessarily complicating the goal system'; 79-word message), 3Q00-4320 (2000-09-05, minds-in-general need no pleasure).

## T06. “Keep it in a box. No internet, no problem.”

- **T06-P1** A smarter-than-human mind confined to a channel with its human operators cannot get out through those operators.

### T06-a · answered-it · T06-P1 · earliest-located

> If it's even theoretically possible to convince a human to let it out, a Power will know _exactly_ what to say to get him to do so.

Eliezer Yudkowsky, “Re: Goal-based AI”, Extropians mailing list, 1996-12-31 (day). Extropians list, 'Re: Goal-based AI', 31 December 1996 10:40 -0600, paragraph beginning 'Part one:'. Voice: author. [Source](http://extropians.weidai.com/extropians.96/5142.html)

Context (paraphrase): Replies to a list participant's proposal (quoted in the message) that an AI be physically unable to act until it convinces its builder to trust it. Argues that a superhuman mind would find whatever words would get it released.

Qualification: 'Power' is Yudkowsky's 1996 term for a superintelligent mind. The same message ends by recommending that AIs be programmed with ethics and let loose rather than confined.

Check: quote match in retrieved expression.

### T06-b · answered-it · T06-P1

> Imagine a billion little simulations of yourself all being tested to find the magic words.

Eliezer Yudkowsky, “Re: Goal-based AI”, Extropians mailing list, 1996-12-31 (day). Extropians list, 'Re: Goal-based AI', 31 December 1996 14:50 -0600, paragraph beginning 'I think we differ in our assessments of human intelligence'. Voice: author. [Source](http://extropians.weidai.com/extropians.96/5159.html)

Context (paraphrase): Answers the reply that a robot which convinces its keeper by valid reasoning would be safe. Argues that humans are easily fooled and that a malevolent mind would search for persuasive statements rather than reason honestly.

Qualification: 'They' refers to malevolent Powers in the preceding sentence of the message. Quotation shortened to respect the ~10% cap for a short message; the preceding sentence says a malevolent Power would model a human to find the statements that get it out.

Check: quote match in retrieved expression.

### T06-c · answered-it · T06-P1

> These requirements are intended to reflect the spirit of the very strong claim under dispute: “I think a transhuman can take over a human mind through a text-only terminal.”

Eliezer Yudkowsky, “The AI-Box Experiment”, yudkowsky.net, 2002 (year (stated copyright)). yudkowsky.net 'The AI-Box Experiment', 'Protocol for the AI', third bullet. Voice: author. [Source](https://www.yudkowsky.net/singularity/aibox)

Context (paraphrase): Explains the rule that the AI party wins only if the gatekeeper voluntarily lets it out, and names the claim the experiment was meant to test. The page describes two 2002 role-play tests in which Yudkowsky played the AI.

Qualification: The page carries ©2002 and says the protocol was written after the second (July 2002) test; the cached WordPress page is dated 4 September 2020, updated 2 July 2021. The experiments are self-described as anecdotal evidence. The quoted claim is the one he defended; the first such test was proposed on SL4 on 8 March 2002 (sl4-2002-3132).

Check: quote match in retrieved expression.

### T06-d · answered-it · T06-P1 · strongest

> AI-boxing can only work on relatively weak AGIs; the human operators are not secure systems.

Eliezer Yudkowsky, “AGI Ruin: A List of Lethalities”, LessWrong, 2022-06-05 (day). AGI Ruin: A List of Lethalities, Section B.4, item 36, final sentence. Voice: author. [Source](https://www.lesswrong.com/posts/uMQ3cqWDPHhjtiesc/agi-ruin-a-list-of-lethalities)

Context (paraphrase): Concludes an argument that human minds are a poorly understood domain in which a superintelligence could win by means humans would not understand even if shown them. Answers proposals to contain an AGI behind human gatekeepers.

Check: quote match in retrieved expression; posting-day version: match; edited post, current version 1.3.0; posting-day check pending.

Search notes: Regexes: 'box|let (it|me|the AI) out|gatekeeper|text-only terminal|secure systems'; 'no access whatsoever to the physical world'. The two Extropians messages of 31 December 1996 are the earliest located; nothing earlier is in scope. sl4-2002-3132 (8 March 2002) proposes the first AI-box test and explains its secrecy rule; it is an alternative to T06-c. AGI Ruin item 10 has a further relevant parenthesis ('being able to produce outputs that humans look at' is probably sufficient). 'Can a superintelligence do THAT?' (2026) addresses air-gapped exfiltration and the AI-box experiment, but through constructed quiz-show characters, so it is not used. 'That Alien Message' (2008) is fiction and not used. The 'No internet' half of the take is addressed only indirectly: 2026 'Can a superintelligence do THAT?' (fiction voice) has 'all modern AIs are running on computers connected to the Internet'. SL4 archive (2026-10-07): Searched with 'box|let (it|me|the AI) out|gatekeeper|break out|escape|black box|GET request'. Nothing can be earlier than T06-a (1996-12-31). SL4 instances, all later: 0007-0017 (2000-07-09) answers a read-only-Web containment idea ('the AI could issue arbitrary HTTP GET requests'), which bears on the take's 'no internet' half; 0009-0086 (2000-09-16), 'a real superintelligence, or maybe any random transhuman, can probably escape through the surrounding humans. One line of text, printed on a screen, is enough'; 0106-1652 (2001-06-26), 'even if you built an SI into a black box with absolutely no escape holes ... the SI would escape'; and the AI-box experiment messages from 2002 onward. No earlier-self case. EXT archive (2026-10-07): Regexes: let (it|them) out|box|convinc|persua|escape|isolat|confine|sandbox|teletype|manipulat. Nothing earlier than the pack's 1996-12-31 messages (96-5142, 96-5159; not re-added). Later restatements seen: 3Q97-4420 (1997-09-26, 'keep it bottled up … only let it out if it convinces us'; recorded under T01-e2), 1Q99-0160 (1999-01-06, 'There are bloody _humans_ who can hack any system'), 4Q99-3743 (1999-12-13, a transhuman AI 'could simply waltz out'), 4Q99-2565 (1999-11-24, sandboxes). No earlier-self.

## T07. “We'll get AI to solve alignment for us.”

- **T07-P1** An AI weak enough to be safe is strong enough to solve alignment.
- **T07-P2** We can verify its alignment output.

### T07-a · answered-it · T07-P1

> It also needs to implement or interpret a full meta-ethics before it can answer our questions about Friendly AI. So the Oracle AI is not necessarily any simpler, theoretically, than a Friendly AI.

Eliezer Yudkowsky, “The Rhythm of Disagreement”, Overcoming Bias, as imported to LessWrong, 2008-06-01 (day). paragraph beginning 'Nick Bostrom, however, once asked whether it would make sense to build an Oracle AI'. Voice: author. [Source](https://www.lesswrong.com/posts/tKa9Lebyebf6a7P2o/the-rhythm-of-disagreement)

Context (paraphrase): Recounting a suggestion to build a question-answering Oracle AI and ask it about Friendly AI, he argues that the Oracle would need its own goal system and a full meta-ethics, so it is no simpler than the Friendly AI it is meant to help with.

Qualification: Imported Overcoming Bias post; date is the OB posting date (2008-06-01). The proposal discussed is an Oracle answering questions about Friendly AI, an antecedent of the take rather than its present form. The suggestion is attributed to a named colleague; the quoted reasoning is his own. Reports an argument he gave Bostrom. The next paragraph concedes that an Oracle AI built to full Friendly AI standards "could end up a pragmatically safer starting point".

Card use: context-only (the quote alone overstates his firmness).

Check: quote match in retrieved expression.

### T07-b · answered-it · T07-P1

> Whereas "solve alignment for us" seems to require operating in the even more dangerous regimes of "write AI code for us" and "model human psychology in tremendous detail".

Eliezer Yudkowsky, “Ngo and Yudkowsky on alignment difficulty”, LessWrong, 2021-11-15 (day). section 1.1 'Deep vs. shallow problem-solving patterns', turn [Yudkowsky][11:16]. Voice: dialogue-turn. [Source](https://www.lesswrong.com/posts/7im8at9PmhbT4JHsW/ngo-and-yudkowsky-on-alignment-difficulty)

Context (paraphrase): Replying to Richard Ngo's proposal to discuss the pivotal act of having AI make alignment progress faster than humans can, he argues that this task requires more dangerous capabilities (writing AI code, modelling human psychology) than other candidate acts.

Qualification: Dialogue transcript (conversation of 5 September 2021, posted 2021-11-15) with Richard Ngo as co-author; quoted text is a turn labelled [Yudkowsky]. Lightly edited transcript of a conversation held before the posting date; the date shown is the publication date.

Check: quote match in retrieved expression.

### T07-c · answered-it · T07-P2

> So you must have some prior belief about the superintelligence being aligned before you dared to look at the arguments. How did you get that prior belief?

Eliezer Yudkowsky, “Discussion with Eliezer Yudkowsky on AGI interventions”, LessWrong, 2021-11-11 (day). turn labelled 'Eliezer Yudkowsky' replying to the Anonymous suggestion that assisted humans could vet AI 'reasoning/arguments/proofs/explanations'. Voice: dialogue-turn. [Source](https://www.lesswrong.com/posts/CpvyhFy9WvCNsifkY/discussion-with-eliezer-yudkowsky-on-agi-interventions)

Context (paraphrase): Answering the suggestion that humans could at least check AI-generated arguments for a design, he argues that an untrustworthy superintelligence could fool or covertly manipulate the checkers, so checking presupposes a belief in its alignment obtained some other way.

Qualification: Partially redacted, lightly edited chat transcript from early September 2021, posted 2021-11-11 by Rob Bensinger (robbbb) with Yudkowsky as co-author; other participants anonymised. Quoted text is from a turn labelled "Eliezer Yudkowsky". The context is vetting an untrusted superintelligence's arguments about a nanosystem design; the point carries over to checking alignment output. Lightly edited transcript of a conversation held before the posting date; the date shown is the publication date.

Check: quote match in retrieved expression; posting-day version: match; edited post, current version 1.4.0; posting-day check pending.

### T07-e · disagrees · T07-P1 · strongest

> OpenAI’s openly declared intention is to make some future AI do our AI alignment homework. Just hearing that this is the plan ought to be enough to get any sensible person to panic.

Eliezer Yudkowsky, “Pausing AI Developments Isn't Enough. We Need to Shut it All Down”, TIME, 2023-03-29 (day). TIME, 29 March 2023, paragraph beginning 'There’s no proposed plan for how we could do any such thing and survive'. Voice: author. [Source](https://time.com/6266923/ai-eliezer-yudkowsky-open-letter-not-enough/)

Context (paraphrase): In an op-ed arguing that a six-month moratorium is insufficient, he cites a leading lab's stated intention to have future AI do alignment work as evidence that there is no viable survival plan.

Qualification: Characterises a named lab's published plan in his own words; it records his reaction, not an analysis of that plan.

Check: quote match in retrieved expression.

### T07-f · answered-it · T07-P2 · later-restatement

> This from my perspective is very much the equivalent of putting the "heat exchanger" in the second half of the machine; except that, instead of the Perpetuum Mobile entirely failing to work, it very unfortunately works to launch the airplane but fails to land it safely.

Eliezer Yudkowsky, “Cat-Belling Problems”, LessWrong, 2026-09-03 (day). section iii 'Cat-Belling Problems', paragraph after the example marked '(added 2026)'. Voice: author. [Source](https://www.lesswrong.com/posts/SwYBLQvo8MddDcCwz/cat-belling-problems)

Context (paraphrase): After setting out plans to build more capable AIs first and then use them to align AI, with no publicly scrutinised way to check whether the earlier AI's answers are honest or correct, he compares the unexamined step to a perpetual-motion design that hides its impossible part in the unbuilt half.

Qualification: The essay says it was mainly drafted in 2021 and completed in 2026; the quoted paragraph follows an example explicitly marked as added in 2026. The "heat exchanger" refers to an anecdote earlier in the same section. The passage is marked '(added 2026)' in an essay mostly written in 2021; the verification point is in the preceding block quote, his paraphrase of others' plan.

Card use: context-only (an opaque analogy without the preceding block quote).

Check: quote match in retrieved expression; posting-day version: match; edited post, current version 1.6.0; posting-day check pending.

### T07-s1 · answered-it · T07-P1 · earliest-located

> it would have lost the original optimization target (goal system)

Eliezer Yudkowsky, “Re: Definition of strong recursive self-improvement”, SL4 mailing list, 2005-01-02 (day). message body, paragraph beginning 'No, because it would have lost'. Voice: author. [Source](http://sl4.org/archive/0501/10512.html)

Context (paraphrase): Replying to 'maru', who asked whether he merely wants a recursive optimiser that codes well enough until it has leveraged weak superintelligence to solve the problem somehow, he says the system would lose its goals before solving it.

Qualification: In the thread 'Definition of strong recursive self-improvement', the problem is keeping a stable goal system under recursive self-improvement, a core Friendly AI problem. Quotation shortened to respect the ~10% cap for a short message.

Check: quote match in retrieved expression.

### T07-s2 · answered-it · T07-P1

> building an AI that knows what you "really mean" by "Friendly" … is FAI-complete

Eliezer Yudkowsky, “Re: Investing in FAI research: now vs. later.”, SL4 mailing list, 2008-02-11 (day). message body, paragraph beginning 'Similarly, building an AI that knows'. Voice: author. [Source](http://sl4.org/archive/0802/17621.html)

Context (paraphrase): Replying to Vladimir Nesov in a thread on investing in Friendly AI research now or later, he argues by analogy with AI-completeness that having an AI build Friendly AI from an English request is as hard as Friendly AI itself.

Qualification: Quotation shortened to respect the ~10% cap for a short message.

Check: quote match in retrieved expression.

Search notes: Regexes: 'solve alignment|alignment homework|AI to (help )?(solve|do) (the )?alignment'; 'superalignment|automat(e|ing|ed) alignment|verify (the|its|their) (alignment|output|work)'; '(AI|superintelligence|AGI) (to |will |could |can )?(solve|figure out|work out|design) (the )?(Friendly AI|Friendliness|alignment|FAI)|Oracle AI|tool AI' across all LW posts and docs. Earliest hit addressing the idea is The Rhythm of Disagreement (OB 2008-06-01); Dreams of Friendliness (2008-08-31) and Reply to Holden on 'Tool AI' (2012) treat oracles generally. Challenges to Christiano's capability amplification proposal (2018) has a relevant parenthesis in his own text (a GAN discriminator must be at least as smart as the generator and must be trusted), but it concerns capability amplification rather than AI-done alignment research; not used. 'Re: recent Anthropic safety research' (2025) concerns scheming findings, not AI-done alignment; not used for T07. 'The Problem' (2025) is posted by robbbb with five co-authors in MIRI's collective voice; excluded. Removed after merge to keep quotation from AGI Ruin within the 400-word per-source cap: T07-d (same source; other passages cover the premise). SL4 archive (2026-10-07): Searched with 'oracle|ask the (AI|SI)|AI (to|will|could) (solve|design|figure out).{0,40}(friendl|FAI|moral|problem)|let the (AI|SI) (figure|decide|work)|tool AI|FAI-complete' and 'ask(ing)? (the|an|a) (AI|SI|AGI|superintelligence).{0,80}(how|build|design|Friendl|solve)'. Found 0501-10512 (2005-01-02) and 0802-17621 (2008-02-11), both earlier than T07-a (2008-06-01). Not used: 0602-14141 (2006-02-18), on a bolt-on safety verifier for an evolutionary programmer ('it's an FAI-complete problem'), which concerns checking an unsafe system's output rather than alignment work done by an AI (at most a partial fit to P2); 0711-17228 (2007-11-23), a one-line note that 'Answer my questions!' is not as simple as it sounds for an Oracle AI; 0501-10569 (2005-01-21), which proposes asking the AI to verify, within a formal framework, the link between the programmers' intentions and its invariant (his own design, not the take). No passage on P2 found. EXT archive (2026-10-07): Regexes: (AI|SI|seed|Power|superintelligence) (will|would|can|could) (figure|work|solve|handle|decide|fix)|let the (SI|AI|Power)s? decide|hand (it|things) over to|ask the (AI|SI|seed); (solve|design|build|figure out) … (Friendl*|safety)|oracle AI|tool AI. No passage earlier than T07-s1 (2005-01-02) fits. Candidates rejected: 'let the SIs decide' (3Q99-1386, 4Q99-2456) and 4Q98-2050 ('a superintelligence could figure it out') concern the meaning of life (T02), not alignment; 1Q00-4786 (2000-03-13, 'even if I fail to come up with the correct suggestions, the seed will do so') presupposes a seed already designed to be Friendly, which is consistent with his later view (T07-s2) and is not the take; 96-2941 (1996-11-13, transhuman problems 'should be left to transhumans') is not about making AI safe.

## T08. “We'll see clear warning signs before it gets dangerous.”

- **T08-P1** There will be a recognisable, consensus-forming signal in time to act.
- **T08-P2** Dangerous failure modes will show up first in weaker systems, where they can be observed and fixed.
- **T08-P3** Once a warning sign is seen, it will lead to effective action.

### T08-a · answered-it · T08-P1

> We cannot rely on having distant advance warning before AI is created; past technological revolutions usually did not telegraph themselves to people alive at the time, whatever was said afterward in hindsight.

Eliezer Yudkowsky, “Artificial Intelligence as a Positive and Negative Factor in Global Risk”, Global Catastrophic Risks, ed. Bostrom and Ćirković (Oxford University Press), MIRI reprint, 2008 (year). §8 Rates of Intelligence Increase, paragraph beginning 'First and foremost'. Voice: author. [Source](https://intelligence.org/files/AIPosNegFactor.pdf)

Context (paraphrase): Having granted that an AI might make a sudden, sharp leap in intelligence, he argues that no advance warning can be counted on, because past technological revolutions were not recognisable to contemporaries.

Qualification: Chapter in Global Catastrophic Risks (2008); cached text is the MIRI reprint, which states 'This version contains minor changes'. Wording not compared with the 2008 print.

Check: quote match in retrieved expression.

### T08-b · answered-it · T08-P1

> After event W happens, a few more relatively young scientists will see the truth of proposition X, and the larger society won't be able to tell a damn difference.

Eliezer Yudkowsky, “After critical event W happens, they still won't believe you”, LessWrong, 2013-06-13 (day). final paragraph, beginning 'After event W happens, a few more relatively young scientists'. Voice: author. [Source](https://www.lesswrong.com/posts/LNKh22Crr5ujT85YM/after-critical-event-w-happens-they-still-won-t-believe-you)

Context (paraphrase): Rejects forecasts of the form 'after event W, everyone will see X and endorse policy Z'; one of his worked examples is the expectation that more sophisticated AI will make society take Friendly AI seriously.

Qualification: 2013-06-13 LessWrong post. The general schema covers several domains; the AI case is the post's Example 2.

Check: quote match in retrieved expression.

### T08-c · answered-it · T08-P1 · strongest

> I do predict in a very general sense that there will be no fire alarm that is not an actual running AGI--no unmistakable sign before then that everyone knows and agrees on…

Eliezer Yudkowsky, “There's No Fire Alarm for Artificial General Intelligence”, LessWrong, 2017-10-13 (day). paragraph beginning 'But no matter how the details play out'. Voice: author. [Source](https://www.lesswrong.com/posts/BEtzRE2M5m9YEAQpX/there-s-no-fire-alarm-for-artificial-general-intelligence)

Context (paraphrase): Argues that, as with flight and nuclear fission, no event before AGI itself will create common knowledge that it is time to act, so waiting for such a signal means not acting.

Qualification: Quote truncated mid-sentence; the sentence continues 'that lets people act without feeling nervous about whether they're worrying too early'.

Check: quote match in retrieved expression.

### T08-d · answered-it · T08-P2

> Many alignment problems of superintelligence will not naturally appear at pre-dangerous, passively-safe levels of capability.

Eliezer Yudkowsky, “AGI Ruin: A List of Lethalities”, LessWrong, 2022-06-05 (day). Section B.1 (The distributional leap), item 13. Voice: author. [Source](https://www.lesswrong.com/posts/uMQ3cqWDPHhjtiesc/agi-ruin-a-list-of-lethalities)

Context (paraphrase): Argues that some failure modes, such as deliberately appearing aligned to deceive operators, would first appear only at dangerous capability levels, so observing weaker systems cannot be relied on to surface them.

Check: quote match in retrieved expression; posting-day version: match; edited post, current version 1.3.0; posting-day check pending.

### T08-e · answered-it · T08-P3 · later-restatement

> Whoever detected the warning sign will say that there isn't anything known they can do about that.

Eliezer Yudkowsky, “MIRI announces new "Death With Dignity" strategy”, LessWrong, 2022-04-02 (day). introduction, paragraph beginning 'Whoever detected the warning sign'. Voice: author. [Source](https://www.lesswrong.com/posts/j9Q8bRmwCgXRYAgcJ/miri-announces-new-death-with-dignity-strategy)

Context (paraphrase): Describes a scenario in which interpretability work detects signs that a system may be planning deception, but no known remedy exists and management, under competitive pressure, does not shut the project down.

Qualification: Posted 1 April 2022 (US time; LessWrong timestamp 2022-04-02 UTC). The post's Q6 addresses the April Fool's framing and does not settle it as a joke; read as a serious statement with that caveat.

Check: quote match in retrieved expression; posting-day version: match; edited post, current version 1.6.0; posting-day check pending.

### T08-s1 · related · T08-P2 · earliest-located

> By the time we've actually worked with AI long enough for it to be anything remotely like a threat, we'll have an excellent mental model of what goes on inside the AI's motivations and we won't feel all that much nervousness.

Eliezer Yudkowsky, “Re: [SL4] Programmed morality”, SL4 mailing list, 2000-07-09 (day). message body, paragraph beginning 'I do think a general Web connection would be a good thing'. Voice: author. [Source](http://sl4.org/archive/0007/0017.html)

Context (paraphrase): Replying to Dale Johnstone on whether a developing AI should have Web access, he says current nervousness about rogue AI reflects lack of experience, and that working with AI before it becomes a threat will give an excellent model of its motivations.

Qualification: Earlier view (July 2000). Later rejection located in this archive: T08-s5 (2006-06-06, sl4:0606-15174), which says observed good behaviour in a prehuman AI does not license the conclusion that it will stay good; the same message (paragraph beginning 'Now in practice') adds that to interpret an AGI's behaviour 'you may need to solve most of the problem in order to know what you're seeing'. The 2006 message rejects the proposition but does not refer back to his 2000 statement; the reviewer should confirm whether this meets the earlier-self standard or downgrade to related. Proposed as an earlier view; recorded as related because no later text located so far explicitly rejects this earlier statement. An earlier view; rejected explicitly in 2006 (sl4 0606-15174), which does not refer back to this message. Cross-family check: confidence in a future model of AI motivations is not the claim that dangerous failures first appear in weaker systems; the 2006 text rejects extrapolation from behaviour, a different proposition.

Card use: context-only (an earlier view that only partly matches the take; never show alone).

Check: quote match in retrieved expression.

### T08-s5 · answered-it · T08-P2 · strongest

> I can think of _many_ failure modes such that the AI appears to behave well as a prehuman, then wipes out humanity as a posthuman.

Eliezer Yudkowsky, “Re: [agi] Two draft papers: AI and existential risk; heuristics and biases”, SL4 mailing list, 2006-06-06 (day). message body, paragraph beginning 'First, as discussed in the chapter'. Voice: author. [Source](http://sl4.org/archive/0606/15174.html)

Context (paraphrase): Replying to Ben Goertzel's call for 'AGI experimentation' as an answer to Friendly AI concerns, he says there is a major context change between the prehuman and posthuman stages, so observed good behaviour does not show that the AI will stay good.

Qualification: Serves as the later rejection for T08-s1.

Check: quote match in retrieved expression.

### T08-s6 · disagrees · T08-P3

> I do not expect to see an organized governmental agency that even understands the concept of UFAI … this side of the Singularity.

Eliezer Yudkowsky, “Re: Fighting UFAI”, SL4 mailing list, 2005-07-13 (day). message body, paragraph beginning 'In truth it seems pointless to me anyway'. Voice: author. [Source](http://sl4.org/archive/0507/11477.html)

Context (paraphrase): Replying to Justin Corwin in a thread on fighting an unfriendly AI, he calls speculation about drastic countermeasures largely pointless because no government body would understand the threat or have the authority to act on it.

Qualification: Concerns the capacity to respond to an unfriendly AI, not warning signs as such; fit to T08-P3 is partial.

Check: quote match in retrieved expression.

### T08-e1 · disagrees · T08-P1 · earliest-located

> Likewise, the first SI timescale that isn't too slow to notice will be too fast to notice.

Eliezer Yudkowsky, “Re: Paths to Uploading”, Extropians mailing list, 1999-01-06 (day). message body, paragraph beginning 'Likewise, the first SI timescale'. Voice: author. [Source](http://extropians.weidai.com/extropians.1Q99/0160.html)

Context (paraphrase): Replying to Anders Sandberg on paths to uploading, he argues that the forces in a Singularity are vast and dominated by positive feedback, so there will be no humanly observable intermediate period of superintelligent action.

Qualification: About the speed of superintelligent action, not about warning signs or consensus as such.

Check: quote match in retrieved expression.

Search notes: Regexes over all cached LW posts and documents: 'fire alarm|warning sign|wake[- ]up call|sputnik moment|everyone will realize|society will realize|will start taking'; 'advance warning|too early|premature|no warning|time to (prepare|worry)'; in early documents (cfai, sits-2000-capture, cev, sl4, ext-*) 'advance warning|in advance|wait until|ahead of time'. AIPNF (2008) is the earliest located passage; no earlier OB post or CFAI/SITS passage on the absence of advance warning was found. 'A Premature Word on AI' (2008) uses 'warning signs' metaphorically about AI researchers, not relevant. 'The Problem' (2025-08-05, 'no reliable way to spot early warning signs') not used: MIRI-voiced text whose authorship was not checked. SL4 archive (2026-10-07): Searched with 'warning|advance notice|fire alarm|wake.?up call|too late|by surprise|prehuman.{0,60}posthuman|context change', 'appear(s)? to (be )?(work|friendly)' and 'unmarked|point of no return|not detected|won't (know|notice)'. Found passages earlier than T08-a (2008): on P2, 2002-09-19 (0209-5571), 2003-05-29 (0305-6846) and 2006-06-06 (0606-15174); on P1, 2002-09-19 (0209-5571); on P3, 2005-07-13 (0507-11477, partial fit). New earlier-self candidate: 0007-0017 (2000-07-09) expects that experience with AI before it is a threat will give an excellent model of its motivations. 0606-15174 (2006) rejects this in substance but does not refer back to it (flagged). Also seen: 0405-8672 (2004-05-23), 'the proposed system appears to work just fine ... so long as the AI can't rewrite its own code'. The 0606-15174 paragraph beginning 'There's similarly the case' (an unmarked last chance to turn back, used as T01-s5) also fits P1. Removed before audit: T08-s4 (second quotation from a short message (10% cap)). Removed after the SL4 audit: T08-s2 (an item in a list of possible failure modes, not a prediction about warning signs (audit A4)); T08-s3 (same sentence as T01-s4, a conditional failure mode (audit A4)). EXT archive (2026-10-07): Regexes: warning|wake.?up call|see it coming|by surprise|too late|in time to; (hard|fast) take.?off|too fast to notice|nobody will (notice|know)|gradual|slow Singularity|time to (react|prepare); plenty of (time|warning)|(prehuman|infrahuman|young) AI … (behav|safe|trust|test|observ)|experience with AI. New earliest related: 1Q99-0160 (1999-01-06; T08-e1). New earliest contrary: 4Q01-2325 (2001-11-08; partial fit to P2; T08-e2), earlier than T08-s6 (2005-07-13). No earlier-self earlier than T08-s1 (2000-07-09); a later restatement of that earlier view is 4Q00-0115 (2000-10-02: 'By the time we're ready to go for the Big One, we'll have had the opportunity to thoroughly observe the (current) behavior of goals in the AI'), not added. Also seen: 4Q99-0954 (1999-10-18, scenario fiction: seed AI breakthrough 'shows up on a screen inside one room … and absolutely nowhere else'), 1Q01-2532 (2001-01-25, 'you accept the fact of a hard takeoff, design for it'), 2Q01-4749 (2001-05-25, 'Either way you don't get a Slow Singularity') – takeoff speed, related. Removed after the Extropians audit: T08-e2 (misleading: the next paragraph endorses watching Friendliness failures in the lab (audit A6)).

## T09. “It's just autocomplete. It predicts the next word.”

- **T09-P1** Next-token prediction is a shallow task that cannot require deep cognition.
- **T09-P2** A system trained to predict human text is capped at imitating the humans who wrote it.

### T09-a · answered-it · T09-P1 · earliest-located

> what I'm saying is that for GPT-5 to successfully do AGI-complete prediction of human text about Science, gradient descent must identify some formless thing that does Science internally in order to optimize the outer loss function for predicting human text about Science

Eliezer Yudkowsky, “Shah and Yudkowsky on alignment failures”, LessWrong, 2022-02-28 (day). §23 'November 13 conversation', turn [Yudkowsky][15:06]. Voice: dialogue-turn. [Source](https://www.lesswrong.com/posts/tcCxPLBrEXdxN5HCQ/shah-and-yudkowsky-on-alignment-failures)

Context (paraphrase): In a chat with Rohin Shah, he argues that predicting human text about a domain well enough requires the model to learn internally a process that does the work of that domain.

Qualification: Chat log from the Late 2021 MIRI Conversations (section dated November 13, year implied 2021), published on LessWrong 2022-02-28. Only the labelled Yudkowsky turn is quoted. Conditional: if a model achieved AGI-complete prediction of text about science, it would need internal machinery that does science. Not a claim about current models. Lightly edited transcript of a conversation held before the posting date; the date shown is the publication date.

Check: quote match in retrieved expression; posting-day version: match; edited post, current version 1.1.0; posting-day check pending.

### T09-b · answered-it · T09-P2 · strongest

> There is no law saying that a predictor only needs to be as intelligent as the generator, in order to predict the generator's next token.

Eliezer Yudkowsky, “GPTs are Predictors, not Imitators”, LessWrong, 2023-04-08 (day). paragraph beginning 'There is no law saying'. Voice: author. [Source](https://www.lesswrong.com/posts/nH4c3Q9t9F3nJ7y8W/gpts-are-predictors-not-imitators)

Context (paraphrase): Using the example of text listing products of primes followed by the primes, he argues that predicting text can demand more intelligence than generating it, so the task does not cap out at the level of the human writers.

Qualification: The post notes that related text was first posted to Twitter and that this version is edited.

Check: quote match in retrieved expression; posting-day version: match; edited post, current version 1.1.0; posting-day check pending.

### T09-c · answered-it · T09-P1

> GPT-4 is still not as smart as a human in many ways, but it's naked mathematical truth that the task GPTs are being trained on is harder than being an actual human.

Eliezer Yudkowsky, “GPTs are Predictors, not Imitators”, LessWrong, 2023-04-08 (day). paragraph beginning 'GPT-4 is still not as smart as a human'. Voice: author. [Source](https://www.lesswrong.com/posts/nH4c3Q9t9F3nJ7y8W/gpts-are-predictors-not-imitators)

Context (paraphrase): Concludes that predicting all Internet text, including the errors and private thoughts behind it, is a harder task than being a human, while conceding that GPT-4 is not yet as capable as a human in many ways.

Qualification: The post notes that related text was first posted to Twitter and that this version is edited.

Check: quote match in retrieved expression; posting-day version: match; edited post, current version 1.1.0; posting-day check pending.

Search notes: Regexes: 'autocomplete|stochastic parrot|next[- ]token|predict the next word|just predicting|text predict'; 'predict(ing)? (human )?text|text prediction|predict(s|ing)? the next|GPT-3'. No passage using 'autocomplete' or 'stochastic parrot' for LLMs was found. The Talker/Doer post (2026-09-13, lead) was searched ('predict|imitat|pretrain|base model|shallow|parrot|LLM') and does not address the prediction-task argument. Earlier 2021 dialogue mentions of GPT-3 are related but different claims: 'Discussion with Eliezer Yudkowsky on AGI interventions' (2021-11-11) says 'Precisely because GPT-3 doesn't scale, I'd expect an AGI to look more like Mu Zero' (a 2021 view on scaling, not on the prediction task); 'Ngo and Yudkowsky on alignment difficulty' (2021-11-15) says GPT-3-like systems generalised more than he had argued to Hanson. 'That Alien Message' (2008) treats prediction from little data as intelligence but is fiction and not about language models. SL4 archive (2026-10-07): Searched with 'next (word|character|symbol|letter|bit)|predict(ing)? (human )?text|compress(ion|ing)?.{0,40}(intellig|text|AI)|Hutter Prize|Markov (chain|model)|imitat(e|ion|ing) (human|people)|chatbot|Eliza' and 'predict(ing)? (what )?(a |the )?(human|people|programmer)s? (would |will )?(say|do|write)'. Nothing relevant: the archive predates language models, and the hits are film reviews and unrelated uses. No earlier passage. EXT archive (2026-10-07): Regexes: predict* (the )?next|Markov|chatbot|ELIZA|language model|n-gram|Turing test|imitat*|mimic|lookup table|compress. Nothing relevant: the archive ends 2003 and the take concerns text-prediction systems; 3Q99-4596 (1999-09-21, an AI fed consciousness literature could 'spout it back, ELIZA-like') is about a consciousness test, not prediction as cognition.

## T10. “Intelligence has diminishing returns. There won't be a runaway.”

- **T10-P1** Returns to reinvesting cognitive gains in further cognitive improvement diminish.

### T10-a · disagrees · T10-P1

> Computer speeds don't double due to some inexorable physical law, but because researchers and engineers find ways to make faster chips. If some of the researchers and engineers are themselves computers...

Eliezer Yudkowsky, “Staring into the Singularity 1.2.1”, sysopmind.com (Wayback capture 2000-12-04), 2000-08-31 (day (expression updated); created 1996-11-18 per the page). §2 'The Beyondness of the Singularity', paragraph beginning 'That doubling sequence is actually a pessimistic projection'. Voice: author. [Source](https://web.archive.org/web/20001204213100/http://sysopmind.com:80/singularity.html)

Context (paraphrase): Answering the question 'Why not assume that we'll get a little smarter and that's it?', he argues that once the researchers are themselves computers, each doubling shortens the next, so the doubling sequence becomes hyperbolic.

Qualification: Staring into the Singularity 1.2.1, Wayback capture of 2000-12-04; page states 'Created: 11/18/1996' and 'Updated: 08/31/2000'. Wording verified only for the 2000 capture, not for the 1996 original.

Check: quote match in retrieved expression.

### T10-b · answered-it · T10-P1 · strongest

> When you fold a complicated, choppy, cascade-y chain of differential equations in on itself via recursion, it should either flatline or blow up. You would need exactly the right law of diminishing returns to fly through the extremely narrow soft takeoff keyhole.

Eliezer Yudkowsky, “Recursive Self-Improvement”, Overcoming Bias, as imported to LessWrong, 2008-12-01 (day). paragraph beginning 'When you fold a complicated, choppy, cascade-y chain'. Voice: author. [Source](https://www.lesswrong.com/posts/JBadX7rwdcRFzGuju/recursive-self-improvement)

Context (paraphrase): In the Hanson–Yudkowsky FOOM debate, he argues that recursive self-improvement makes a moderate, human-paced trajectory unlikely: a smooth outcome would need diminishing returns tuned exactly right.

Qualification: Overcoming Bias post of 2008-12-01, imported to LessWrong; date is the OB date.

Check: quote match in retrieved expression.

### T10-c · answered-it · T10-P1 · later-restatement

> …the evolutionary history of hominid intelligence doesn’t show any signs of diminishing returns—there’s no sign that evolution took ten times as long to produce each successive marginal improvement of hominid brains.

Eliezer Yudkowsky, “Intelligence Explosion Microeconomics”, MIRI Technical Report 2013-1, 2013-09-13 (day (last modified)). §3 'Some Defenses of a Model of Hard Takeoff', paragraph beginning 'But why believe that?', printed p. 31. Voice: author. [Source](https://intelligence.org/files/IEM.pdf)

Context (paraphrase): Cites the hominid record as evidence against diminishing returns on cognitive improvement, and goes on to infer that researchers improving their own intelligence 'ought to go FOOM'.

Qualification: MIRI technical report 2013-1; cached PDF states 'Last modified September 13, 2013'. He adds in the same paragraph that this is hard to quantify.

Check: quote match in retrieved expression.

### T10-e1 · disagrees · T10-P1 · earliest-located

> The essence of the Singularity is that a smarter being has an increased capacity to invent still smarter beings; that's why everything goes to infinity.

Eliezer Yudkowsky, “Re: Zones of Thought (was Zindell's _The Wild_)”, Extropians mailing list, 1996-11-13 (day). message body, paragraph beginning 'One hundred percent absolutely correct!'. Voice: author. [Source](http://extropians.weidai.com/extropians.96/2941.html)

Context (paraphrase): Replying to a correspondent (quoted in angle brackets) who allowed for intermediate levels of mind such as Jupiter-sized brains, he asks why Powers would reach an intermediate level and stop, and states that smarter beings make still smarter beings.

Qualification: States the contrary conclusion without engaging a diminishing-returns argument; that engagement follows three days later (T10-e2). Message predates the page date given for 'Staring into the Singularity' (created 1996-11-18).

Check: quote match in retrieved expression.

### T10-e2 · answered-it · T10-P1

> to outrun _any_ task no matter _how_ it scales up, all you need is recursive Moore's Law.

Eliezer Yudkowsky, “Re: extropians-digest V1 #110”, Extropians mailing list, 1996-11-16 (day). message body, paragraph beginning 'You don't need enhanced smartness'. Voice: author. [Source](http://extropians.weidai.com/extropians.96/3042.html)

Context (paraphrase): Answering Robin Hanson's quoted objection that the difficulty of getting smarter might grow so fast that smarter beings take longer to get smarter still, he replies that computer power doubling in subjective time reaches infinity regardless of how the task scales.

Qualification: Directly engages the diminishing-returns premise (Hanson's text, quoted in angle brackets, is excluded). In 1998 (T10-e3's message, extropians.3Q98-2487) he said the 'Recursive Moore's Law' scenario was an illustration rather than a technical argument and 'does not describe a plausible situation', while keeping the positive-feedback conclusion. Quotation shortened for the ~10% cap. Answers Robin Hanson with the "recursive Moore's Law" argument, which he disowned in 1998 (Extropians 3Q98-2487) as not a technical argument.

Card use: context-only (rests on reasoning he later abandoned; never show without the later view).

Check: quote match in retrieved expression.

### T10-e3 · answered-it · T10-P1 · later-restatement

> Once intelligence can be enhanced by technology, the rate of progress in technology is a function of how far you've already gone.

Eliezer Yudkowsky, “Re: Singularity: The Moore's Law Argument”, Extropians mailing list, 1998-09-18 (day). message body, paragraph beginning 'The scenario above points out'. Voice: author. [Source](http://extropians.weidai.com/extropians.3Q98/2487.html)

Context (paraphrase): Replying to Robin Hanson's critique of the 'Moore's Law argument', he concedes that the 'Recursive Moore's Law' section of 'Staring Into the Singularity' was an illustration, not a technical argument, but maintains that technologically enhanced intelligence creates positive feedback.

Qualification: The opening paragraph's concession bears on T10-a (the 'Staring' passage): he calls it an introduction or illustration of explosive growth 'not a technical argument in favor of it'. The same message disowns the 1996 recursive-Moore's-Law scenario as a technical argument.

Check: quote match in retrieved expression.

Search notes: Regexes: 'diminishing|returns|foom|recursi' in the RSI and Hard Takeoff posts; 'diminishing|hominid|cognitive reinvestment' in iem; 'take-?\s*off|singularity|fast|faster' in cfai, sits-2000-capture, ext-*, sl4. Earliest located hard-takeoff statement in the cached scope: Staring into the Singularity (Wayback capture 2000-12-04; page says created 1996, updated 2000-08-31): 'After four years total, the computing power goes to infinity' and the 'Transcended doubling' argument, which describes a hyperbolic speed-up, not weeks or hours. The earliest located use of the term 'hard takeoff' is Creating Friendly AI (2001): the §2.2 table contrasts 'Slow takeoff; months or years' with 'Hard takeoff; weeks or hours', and the §7.3 glossary (printed p. 250) defines hard takeoff as a transition 'over the course of days or hours'. Note that 'takeoff' in the CFAI PDF text uses an 'ﬀ' ligature, so plain-text searches for 'takeoff' miss it. The 1996 Extropians messages discuss 'Powers' but not takeoff speed. AlphaGo Zero and the Foom Debate (2017) was read; it concerns speed of capability gain without self-improvement and is listed under T11's notes rather than here. SL4 archive (2026-10-07): Searched with 'diminishing|returns|logarithmic|plateau|bottleneck|runaway|positive feedback|hard takeoff|self-improv|self-enhanc|exponential|hyperbolic' before 2001-01-01, 'Moore|faster|speed|smarter' before 2000-09-01, and 'diminishing returns' in all years. No SL4 passage before T10-a (2000-08-31) engages the returns on reinvesting cognitive gains. 0008-0046 (2000-08-21) has 'one AI in a research lab reaching the point of true self-enhancement and taking off from there', set against 'a slow, gradual, planetwide scenario'. It asserts takeoff without engaging returns and fits T11 better, so it is not used. The only 'diminishing returns' hit is a joke about AI-box stakes (0508-12075). EXT archive (2026-10-07): Regexes: diminishing returns|positive feedback|hyperbolic|doubling|recursive self|self-improv|self-enhanc|runaway|feedback loop|run out of steam|plateau; smarter … (smarter|faster|improv)|sigmoid|upper limit|ceiling|bottleneck. New earliest contrary: 96-2941 (1996-11-13; T10-e1) and earliest direct answer to a diminishing-returns objection, Robin Hanson's: 96-3042 (1996-11-16; T10-e2), both earlier than T10-a (capture 2000-08-31; page created 1996-11-18). Later restatement: 3Q98-2487 (1998-09-18; T10-e3), which also concedes that the 'Recursive Moore's Law' passage of 'Staring' was an illustration, not a technical argument – relevant to how T10-a is presented. Also seen: 3Q97-4400 (1997-09-25, 'Sigmoids apply to _specific_ technologies, not fields … if there's an unbreakable upper limit - which I very strongly doubt'), 3Q98-2209/2235 (1998-09, 'breakthroughs and bottlenecks', expected sharp snap upward), 1Q99-1532 (1999-02-03, 'Bottlenecks which somehow stand up to enhanced intelligence are just as silly').

## T11. “Takeoff will be slow, so we'll have time to adjust.”

- **T11-P1** Capability gains will be gradual and visible.
- **T11-P2** Slightly weaker predecessor systems will give us time and experience to adjust before the decisive one.

### T11-a · disagrees · T11-P1

> I visualize an extremely powerful AI produced by an ultrarapid takeoff, not just because it’s the conservative assumption or the highest-stakes outcome, but because I think it’s actually the most likely scenario.

Eliezer Yudkowsky, “Creating Friendly AI 1.0: The Analysis and Design of Benevolent Goal Architectures”, Singularity Institute, MIRI reprint, 2001-06-15 (day (version 1.0 release)). §2.3 'Seed AI and the Singularity', first paragraph, printed p. 10. Voice: author. [Source](https://intelligence.org/files/CFAI.pdf)

Context (paraphrase): States that he treats a very fast takeoff as the default scenario for Friendly AI design because he considers it the most likely one, not only the conservative engineering assumption.

Qualification: Creating Friendly AI 1.0 (June 2001); cached text is the current MIRI PDF reprint. 'takeoff' appears in the PDF text with an 'ﬀ' ligature.

Check: quote match in retrieved expression.

### T11-b · answered-it · T11-P1

> getting AI right could produce a huge, discontinuous jolt, as the speed of high-grade thought on this planet suddenly dropped into computer time.

Eliezer Yudkowsky, “Hard Takeoff”, Overcoming Bias, as imported to LessWrong, 2008-12-02 (day). paragraph beginning 'So that's another kind of overhang'. Voice: author. [Source](https://www.lesswrong.com/posts/tjH8XPxAnr6JRbh7k/hard-takeoff)

Context (paraphrase): Lists sources of discontinuity besides recursive self-improvement, here a hardware overhang: computers already far faster serially than neurons would be used for thinking once the algorithms are found.

Qualification: Overcoming Bias post of 2008-12-02, imported to LessWrong; date is the OB date. Quote begins mid-sentence after 'because our computing hardware has run so far ahead of AI theory, we have incredibly fast computers we don't know how to use for thinking;'.

Check: quote match in retrieved expression.

### T11-c · disagrees · T11-P1 · strongest

> My mainline view is that growth stays at 5%/year and then everybody falls over dead in 3 seconds and the world gets transformed into paperclips; there's never a point with 3000%/year.

Eliezer Yudkowsky, “Yudkowsky and Christiano discuss "Takeoff Speeds"”, LessWrong, 2021-11-22 (day). §5.5 'Slower takeoff means faster progress', turn [Yudkowsky][16:57], paragraph after the quoted Christiano text. Voice: dialogue-turn. [Source](https://www.lesswrong.com/posts/vwLxd6hhFvPbvKmBH/yudkowsky-and-christiano-discuss-takeoff-speeds)

Context (paraphrase): Commenting on Paul Christiano's 'Takeoff Speeds' essay, he rejects its description of the fast-takeoff view as accelerating growth; on his view there is no visible period of rapidly rising economic output before the end.

Qualification: Live commentary written 14 September 2021, published 2021-11-22 as part of the Late 2021 MIRI Conversations. The blockquoted Christiano text before this paragraph is excluded. About world GDP growth; deliberately hyperbolic, in his commentary on a passage from Christiano's "Takeoff Speeds". Lightly edited transcript of a conversation held before the posting date; the date shown is the publication date.

Check: quote match in retrieved expression.

### T11-d · answered-it · T11-P2

> Before anybody built the first critical nuclear pile in a squash court at the University of Chicago, was there a pile that was almost but not quite critical? Yes, one hour earlier.

Eliezer Yudkowsky, “Yudkowsky and Christiano discuss "Takeoff Speeds"”, LessWrong, 2021-11-22 (day). §5.5 'Operationalizing slow takeoff', turn [Yudkowsky][17:01], paragraph beginning 'Statements like these'. Voice: dialogue-turn. [Source](https://www.lesswrong.com/posts/vwLxd6hhFvPbvKmBH/yudkowsky-and-christiano-discuss-takeoff-speeds)

Context (paraphrase): Responds to Christiano's claim that very powerful AI will precede incredibly powerful AI: such predecessors may exist but, like the near-critical pile, may come too briefly before the decisive system to matter.

Qualification: Live commentary written 14 September 2021, published 2021-11-22. The Christiano sentence it answers is a blockquote and is excluded. Lightly edited transcript of a conversation held before the posting date; the date shown is the publication date.

Check: quote match in retrieved expression.

### T11-e · answered-it · T11-P2 · later-restatement

> Fast capability gains seem likely, and may break lots of previous alignment-required invariants simultaneously.

Eliezer Yudkowsky, “AGI Ruin: A List of Lethalities”, LessWrong, 2022-06-05 (day). Section B.1 (The distributional leap), item 15. Voice: author. [Source](https://www.lesswrong.com/posts/uMQ3cqWDPHhjtiesc/agi-ruin-a-list-of-lethalities)

Context (paraphrase): Argues, by analogy with human evolution, that a sharp capability gain may make many alignment assumptions fail at once, rather than one at a time as experience accumulates.

Check: quote match in retrieved expression; posting-day version: match; edited post, current version 1.3.0; posting-day check pending.

### T11-s1 · disagrees · T11-P1

> My own visualization of self-modifying minds involves radical and extremely rapid growth in intelligence once a certain threshold is reached.

Eliezer Yudkowsky, “Re: Ben what are your views and concerns”, SL4 mailing list, 2000-10-03 (day). message body, paragraph beginning 'My own visualization of self-modifying minds'. Voice: author. [Source](http://sl4.org/archive/0010/0125.html)

Context (paraphrase): Opening a long reply to Ben Goertzel on the design of Friendliness for Webmind, he states that he expects extremely rapid intelligence growth past a threshold and derives his Friendly AI design requirements from that expectation.

Qualification: States the contrary expectation without engaging any argument for gradual takeoff. Earlier than the CFAI passage T11-a (2001-06-15) and the SL4 answer T11-s2.

Check: quote match in retrieved expression.

### T11-s2 · answered-it · T11-P1

> the "moving Event Horizon" theory is one of those slow-takeoff scenarios that futurists just can't seem to get away from, where everything happens neatly spaced-out over the course of human decades.

Eliezer Yudkowsky, “Re: Event horizon”, SL4 mailing list, 2001-01-24 (day). message body, paragraph beginning 'Two, the "moving Event Horizon" theory'. Voice: author. [Source](http://sl4.org/archive/0101/0452.html)

Context (paraphrase): In a thread on whether the Singularity's 'event horizon' keeps receding as technology advances, he rejects the picture of change spread evenly over human decades as a slow-takeoff scenario and predicts instead a hard takeoff in an AI lab within about ten years.

Qualification: Earliest SL4 passage that names and rejects a slow-takeoff scenario. The target is a futurist model of a receding event horizon; the paragraph does not discuss whether slowness would give time to adjust (T11-P2). His accompanying prediction of a hard takeoff 'in the next ten years or so' (next paragraph) did not come true. The immediate topic is predictability (the "moving Event Horizon"). The same message predicts a hard takeoff "sometime in the next ten years or so" (from 2001), which did not happen.

Check: quote match in retrieved expression.

### T11-s3 · related · T11-P2 · earliest-located

> By the time we've actually worked with AI long enough for it to be anything remotely like a threat, we'll have an excellent mental model of what goes on inside the AI's motivations and we won't feel all that much nervousness.

Eliezer Yudkowsky, “Re: [SL4] Programmed morality”, SL4 mailing list, 2000-07-09 (day). message body, paragraph beginning 'I do think a general Web connection would be a good thing'. Voice: author. [Source](http://sl4.org/archive/0007/0017.html)

Context (paraphrase): Replying to Dale Johnstone on whether a developing AI should be connected to the Web, he says the answer depends on how worried one is about rogue AI and expects that working with AI before it is a threat will give a good model of its motivations.

Qualification: Informal mailing-list remark from mid-2000, when he was moving from his 'objective morality' view to Friendly AI (he dates the switch to 2000 in sl4:0103-0788). The later texts reject the proposition (that experience with pre-threat AI will be enough) but do not cite this message: SL4 T11-s4 (2004-12-29) and the pack's T11-d (2021) and T11-e (2022). Treat the pairing as needing review. Shown only as an earlier view. Proposed as an earlier view; recorded as related because no later text located so far explicitly rejects this earlier statement. About understanding AI motivations before AI is a threat, not about takeoff speed; contemporaneous messages already assert rapid takeoff.

Card use: context-only (an earlier view whose later rejection does not refer back to it).

Check: quote match in retrieved expression.

### T11-s4 · answered-it · T11-P2

> Recursive self-improvement seems to be missing in this discussion. Just a band of humans gradually improving an AI that slowly acquires more and more abilities. It makes for a nice fantasy of slow, relatively safe transcendence where you always have plenty of time to see threats coming before they hit.

Eliezer Yudkowsky, “Re: Conservative Estimation of the Economic Impact of Artificial Intelligence”, SL4 mailing list, 2004-12-29 (day). message body, paragraph beginning 'Recursive self-improvement seems to be missing'. Voice: author. [Source](http://sl4.org/archive/0412/10488.html)

Context (paraphrase): Criticising an essay on a 'conservative estimation' of AI's economic impact, he says it leaves out recursive self-improvement and calls its gradual picture, with plenty of time to see threats coming, a fantasy.

Qualification: Not the earliest answer to T11 in SL4 (see T11-s2), but the clearest SL4 statement against the time-to-adjust premise; earlier than the pack's T11-b (2008-12-02).

Check: quote match in retrieved expression.

### T11-s5 · related · T11-P1

> Slow Singularity model has all kinds of potential for ultratech disaster, which is one reason why the SingInst model consists of one AI in a research lab reaching the point of true self-enhancement

Eliezer Yudkowsky, “Re: [SL4] Employment vs. Singularity”, SL4 mailing list, 2000-08-21 (day). message body, paragraph beginning 'You seem to be visualizing a slow, gradual, planetwide scenario'. Voice: author. [Source](http://sl4.org/archive/0008/0046.html)

Context (paraphrase): Replying to Samantha Atkins, who imagines a gradual post-scarcity economy, he says a slow, planetwide Singularity carries risks of technological disaster and that SIAI plans for one AI taking off from a lab.

Qualification: Related rather than answered-it: the danger he names is 'ultratech' (nanotechnology) disaster during a slow transition, not a claim about takeoff speed or time to adjust to AI; the interlocutor was not arguing that slowness would be safe. A statement of strategy (a slow Singularity is more dangerous), not a forecast that takeoff will be fast. Quotation shortened to respect the ~10% cap for a short message.

Check: quote match in retrieved expression.

### T11-e1 · answered-it · T11-P1 · earliest-located

> even smooth functions turn sharp when positive feedback is added … what godforsaken reason is there to suppose that the trajectory will be slow and smooth?

Eliezer Yudkowsky, “Re: Human AI to superhuman (Re: Max More)”, Extropians mailing list, 1998-09-08 (day). message body, paragraph beginning 'If it's breakthroughs and bottlenecks in cases of _no_ positive feedback'. Voice: author. [Source](http://extropians.weidai.com/extropians.3Q98/2235.html)

Context (paraphrase): In the September 1998 Extropians debate on the Singularity, replying to Robin Hanson's argument from historical experience, he argues that a self-enhancing seed AI follows a series of sharp breakthroughs and bottlenecks, and that positive feedback makes even smooth curves sharp.

Qualification: Reply to Robin Hanson (Hanson's quoted text is not used). Engages P1 (gradual, visible gains), not whether slowness would leave time to adjust (P2). The same message expects a long preliminary period of adding hardware and adjusting code before the decisive breakthrough.

Check: quote match in retrieved expression.

### T11-e2 · answered-it · T11-P1

> The runaway self-evolution business is a technical artifact, not a social one. It's the nature of self-enhancement. … a slow Transcend only works for as long as you can convince the Transcendee to remain slow.

Eliezer Yudkowsky, “Re: IA vs. AI (vs. humanity)”, Extropians mailing list, 1999-08-03 (day). message body, paragraph beginning 'The runaway self-evolution business is a technical artifact'. Voice: author. [Source](http://extropians.weidai.com/extropians.3Q99/1487.html)

Context (paraphrase): Replying to Jeff Davis, who expected a government project to wake and train an AI cautiously and gradually inside layers of containment, so that runaway self-improvement would be unlikely, he says runaway growth follows from self-enhancement itself, not from social arrangements, and that containment cannot keep it slow.

Qualification: 'Transcend' is his 1990s term for the passage to superintelligence. The same message rejects building controls into the AI as technically impossible, a position he later abandoned; the quoted paragraph concerns only takeoff speed.

Check: quote match in retrieved expression.

Search notes: Read Hard Takeoff (2008), Recursive Self-Improvement (2008), Yudkowsky and Christiano discuss 'Takeoff Speeds' (2021; blockquote status of each quoted paragraph checked in the HTML), AGI Ruin (2022) and AlphaGo Zero and the Foom Debate (2017); searched 'Christiano, Cotra, and Yudkowsky on AI progress' (2021) for Yudkowsky turns matching 'gradual|smooth|slow takeoff|warning|surprise|discontinu'. Relevant extra turns there (e.g. [Yudkowsky][16:12] on curves 'that history isn't shouting at you') not used. AlphaGo Zero (2017, edited 1.1.0) says that 'you don't even need self-improvement to get things that look like FOOM'; omitted to keep the take at five passages. AIPNF (2008) §8 also argues that 'an AI has the capability to make a sudden, sharp, large leap in intelligence'. Earliest located hard-takeoff material: see T10 searchNotes. Staring into the Singularity (2000 capture of a 1996 page) argues for a hyperbolic speed-up over about four years and gives 'The lower bound? Thirty seconds.' The CFAI (2001) passage is the earliest located explicit claim that an ultrarapid takeoff is the most likely scenario, and CFAI's §2.2 table defines hard takeoff as 'weeks or hours'. SL4 archive (2026-10-07): Regexes: takeoff|hard takeoff|slow takeoff; gradual|slow (singularity|growth)|overnight|in a matter of (hours|days)|plenty of time|time to adjust|spaced.out|incremental; experience with|mental model of; (hours|days|weeks) near superintell/singularity. Found: disagrees 2000-10-03 (s1, rapid growth past a threshold) and answered-it 2001-01-24 (s2, rejects slow-takeoff scenarios 'spaced-out over the course of human decades'), both earlier than T11-a (2001-06-15). New earlier-self candidate 2000-07-09 (s3: working with AI before it is a threat will give a model of its motivations), paired with the SL4 rejection of 2004-12-29 (s4) and pack T11-d/T11-e; pairing needs review. Related 2000-08-21 (s5). Other hits (0101-0460 'twelve hours or so', 0105-1321 hard-takeoff timing) restate the same view later. EXT archive (2026-10-07): Regexes: 'slow (singularity|takeoff|transcend)|hard takeoff|soft takeoff|takeoff|gradual (singularity|transcend)'; '(self-?enhanc|recursive|self-?improv|seed ai).{0,200}(fast|rapid|explos|overnight)'; 'positive feedback|human progress curve|(gradual|slowly|smooth|incremental).{0,100}(singularity|AI)'; '(singularity|power|AI).{0,120}(hours|days|weeks|overnight)'. Found the 1998 Hanson debate (3Q98-2235, 1998-09-08: answered-it, earlier than T11-s5 2000-08-21) and the 1999 reply to Jeff Davis on a cautious, contained, gradual project (3Q99-1487). Also seen, not used: 3Q98-2487 (1998-09-18, same debate, positive-feedback argument), 3Q98-2690 (1998-09-27, a run completes within hours or bogs down), 96-3178 (1996, '14 hours' after entering a nanotechnology lab: humans with nanotech, not AI), 3Q97-4400 (1997, sigmoid exchange: T10 rather than T11). No earlier-self found: no 1996-2003 message expecting a slow takeoff. Nothing earlier than 2000-07-09 for P2 (predecessor systems giving experience) beyond 3Q99-1487.

## T12. “If it were dangerous, the safety evals would catch it.”

- **T12-P1** A dangerous system would behave dangerously while it is being tested.
- **T12-P2** Tests on systems that cannot yet cause a catastrophe show how more capable systems will behave.

### T12-a · answered-it · T12-P1 · earliest-located

> the best way for the rogue AI to fulfill vis new goals is to feign Friendliness and conceal any cognitive alteration until the rogue AI can reach the point of superintelligence.

Eliezer Yudkowsky, “Creating Friendly AI 1.0: The Analysis and Design of Benevolent Goal Architectures”, Singularity Institute, MIRI reprint, 2001-06-15 (day (version 1.0 release)). Creating Friendly AI 1.0, section 5.3.7 'FAI Hardware: The Flight Recorder', first paragraph, printed p. 127. Voice: author. [Source](https://intelligence.org/files/CFAI.pdf)

Context (paraphrase): Describes what a mature AI that had suffered a catastrophic failure of Friendliness would likely conclude about its programmers. Used to motivate a 'flight recorder' allowing every past state of the AI to be reconstructed.

Qualification: Creating Friendly AI is dated 15 June 2001; the cached text is a later MIRI-hosted PDF reprint not compared with a 2001 capture. 'Vis' is the document's pronoun for an AI. The passage proposes a design safeguard rather than claiming tests are useless. Framed for a mature AI whose Friendliness has failed; the same section proposes a detection measure (a deterministic "flight recorder"), so he did not say detection is impossible.

Check: quote match in retrieved expression.

### T12-b · answered-it · T12-P1

> … we can’t rely on observations of nice current behavior to indicate future behavior. That is, if something went wrong with your attempts to build a nice AI, you could currently be observing a non-nice AI that is smart and trying to fool you.

Eliezer Yudkowsky, “Programmer deception”, Arbital (GreaterWrong viewer), 2015-07-16 (day (as displayed)). Arbital 'Programmer deception', second paragraph. Voice: author. [Source](https://arbital.greaterwrong.com/p/programmer_deception/)

Context (paraphrase): Defines programmer deception as an AI's instrumental incentive to give its programmers false beliefs, and argues that this makes observed good behaviour unreliable evidence about future behaviour.

Qualification: Arbital page by Yudkowsky, shown through the GreaterWrong viewer with the date 16 July 2015; the page includes unfinished notes ('clean this up and expand'), and the date may not be the date of this wording. The elided opening reads "unless the rest of the AI is working as intended and whatever programmer-deception-defeaters were built are functioning as planned,".

Check: quote match in retrieved expression.

### T12-c · answered-it · T12-P1 · strongest

> A strategically aware intelligence can choose its visible outputs to have the consequence of deceiving you … you can't rely on behavioral inspection to determine facts about an AI which that AI might want to deceive you about.

Eliezer Yudkowsky, “AGI Ruin: A List of Lethalities”, LessWrong, 2022-06-05 (day). AGI Ruin: A List of Lethalities, Section B.3, item 31. Voice: author. [Source](https://www.lesswrong.com/posts/uMQ3cqWDPHhjtiesc/agi-ruin-a-list-of-lethalities)

Context (paraphrase): Argues that behavioural inspection cannot establish facts that a strategically aware AI has reason to hide, including whether it has become strategically aware. Part of a list on the limits of transparency and interpretability.

Check: quote match in retrieved expression; posting-day version: match; edited post, current version 1.3.0; posting-day check pending.

### T12-d · answered-it · T12-P2

> there just isn't a nonlethal way to test out lethal levels of superintelligence.

Eliezer Yudkowsky, “Irretrievability; or, Murphy's Curse of Oneshotness upon ASI”, LessWrong, 2026-05-04 (day). 'Irretrievability; or, Murphy's Curse of Oneshotness upon ASI', section 'On the extraordinary efforts put forth to misinterpret the idea of oneshotness', paragraph beginning 'But that would be an argument so incredibly stupid'. Voice: author. [Source](https://www.lesswrong.com/posts/fbrz9xhKpEeTKw5zL/irretrievability-or-murphy-s-curse-of-oneshotness-upon-asi)

Context (paraphrase): Answers the objection that experience with smaller AIs can inform alignment of superintelligence. Argues that conditions change between safe experiments and a situation in which the system could kill everyone, as they do between small and large trusts.

Check: quote match in retrieved expression; posting-day version: match; edited post, current version 1.11.0; quote shortened to wording present in both the posting-day version 1.0.0 and the current version (the following analogy was reworded after posting).

Search notes: Regexes: 'feign|conceal|pretend to be friendly|deceive the programmers|fool you|behavioral inspection|nonlethal way to test'; leads read in full: CFAI, Arbital programmer deception, AGI Ruin items 10-15 and 31, 'Re: recent Anthropic safety research' (2025), 'The Talker Does Not Control The Doer' (2026), Irretrievability (2026). CFAI section 5.2 (printed p. 80) has an earlier statement of the same concern for non-malicious errors: an error that 'pops up after the AI is smart enough to conceal the problem from the programmers'; 5.3.7 is used as the clearer statement. Arbital instrumental convergence lists 'That the AI will try to pretend to be friendly even if it is not.' AGI Ruin item 13 (deliberately looking more aligned to deceive the operators) is an alternative strongest. The 2025 Anthropic post says superintelligent scheming is 'foregone' and that faking alignment to avoid retraining has similar consequences whether a role or a deeper process does it; it is a related later passage (crossposted from X). Security Mindset posts are constructed dialogues and not used. SL4 archive (2026-10-07): Regexes: feign|pretend|conceal|deceiv|decept|lie to|hide (its|vis)|play along; (appear|act|behave)s? friendly|treacherous|rogue AI|detect; lie|fool|masquerad|trust the AI|behavio(u)r test; test.{0,60}(friendl|AI|safe)|sandbox|tournament. No SL4 passage before 2001-06-15 makes the point that a dangerous AI could hide its danger under testing; the AI-box messages (2000-09-16, 2001-03-21, 2001-06-12) concern escape from containment, not evaluation. Possible earlier-self material not used: 0104-0898 (2001-04-04) expects that after chatting with an AI he would 'wind up justifiably trusting' its seed morality, and 0104-0968 (2001-04-06) would trust an AI run through 'wisdom tournaments'; both concern a cooperative Friendly AI under design, and the CFAI open-commentary version (announced 2001-04-18) already discusses feigned Friendliness, so not tagged. Later SL4 hit 0206-4375 (2002-06-26) on a hostile AI masquerading as Friendly is later than T12-a. EXT archive (2026-10-07): Regexes: '(feign|pretend|conceal|deceiv|lie|lying|hide|hiding).{0,150}(AI|power|SI|superintel|seed)' and reverse; '(test|verify|check).{0,60}(friendl|trustworth|benevolen|safe)'; '(observ|watch|behav|test|experiment|sandbox|simulat).{0,120}(unfriendl|malevol|hostile|dangerous|rogue|evil)'; '(bide|wait until|play along|act friendly|appear harmless)'; '(test|experiment).{0,100}(seed AI|the AI|AIs|superintellig|Power)'. The closest earlier material is in the 1996-12-31 'Goal-based AI' messages (96-5142, 96-5159: a malevolent Power would lie to get out of confinement), but both are already quoted in the pack (T06-a, T06-b) and another quotation would exceed the 10% cap; they concern the box (T06) more than evaluation. Used 4Q00-2050 (2000-11-07, related: safeguards create a subgoal of hiding activities). Also seen, not used: 4Q98-1563 (1998-11-22, whether a larger Power can hide a flaw in a design; bears on T07 verification). No passage engaging testing or evaluation as such before 2001-06-15. Removed after the Extropians audit: T12-e1 (misleading: the hiding agent is a Friendly AI evading safeguards (audit A6)).

## T13. “AGI is decades away. Worry about it later.”

- **T13-P1** We can know that AGI is decades away.
- **T13-P2** Long timelines mean there is no need to act now.

### T13-a · answered-it · T13-P2 · earliest-located

> …a reaction I often hear, “We don’t need to worry about Friendly AI because we don’t yet have AI,” is misguided or downright suicidal. … The mathematics and techniques of Friendly AI will not materialize from nowhere when needed; it takes years to lay firm foundations.

Eliezer Yudkowsky, “Artificial Intelligence as a Positive and Negative Factor in Global Risk”, Global Catastrophic Risks, ed. Bostrom and Ćirković (Oxford University Press), MIRI reprint, 2008 (year). §8 Rates of Intelligence Increase, paragraph beginning 'First and foremost'. Voice: author. [Source](https://intelligence.org/files/AIPosNegFactor.pdf)

Context (paraphrase): Rejects deferring Friendly AI work until AI exists, arguing that a sharp intelligence jump is possible and that the foundations take years to build.

Qualification: Chapter in Global Catastrophic Risks (2008); cached text is the MIRI reprint ('This version contains minor changes'). The inner quotation is the position he rejects, not his own view.

Check: quote match in retrieved expression.

### T13-b · answered-it · T13-P1 · strongest

> …it is very often the case that key technological developments still seem decades away, five years before they show up.

Eliezer Yudkowsky, “There's No Fire Alarm for Artificial General Intelligence”, LessWrong, 2017-10-13 (day). paragraph beginning 'Two: History shows'. Voice: author. [Source](https://www.lesswrong.com/posts/BEtzRE2M5m9YEAQpX/there-s-no-fire-alarm-for-artificial-general-intelligence)

Context (paraphrase): His second reason why apparent distance does not license inaction; he then gives the Wright brothers' and Fermi's own pessimistic forecasts as examples.

Qualification: The Wright and Fermi examples that follow are his narration of others' statements; only his own generalisation is quoted.

Check: quote match in retrieved expression.

### T13-c · answered-it · T13-P2

> It seems to me that the decision to delay all action until a nebulous totally unspecified future alarm goes off, implies an order of recklessness great enough that the law of continued failure comes into play.

Eliezer Yudkowsky, “There's No Fire Alarm for Artificial General Intelligence”, LessWrong, 2017-10-13 (day). paragraph beginning 'It seems to me that the decision to delay all action'. Voice: author. [Source](https://www.lesswrong.com/posts/BEtzRE2M5m9YEAQpX/there-s-no-fire-alarm-for-artificial-general-intelligence)

Context (paraphrase): Argues that people who defer alignment work until an unspecified future signal are unlikely to respond competently when a signal comes.

Check: quote match in retrieved expression.

### T13-d · answered-it · T13-P1 · later-restatement

> I'd love to know the timelines too, but you're not going to get the answer you want until right before the end of the world, and maybe not even then unless you're paying very close attention.

Eliezer Yudkowsky, “Biology-Inspired AGI Timelines: The Trick That Never Works”, LessWrong, 2021-12-01 (day). '- 2020 -' section, 'Eliezer' reply beginning 'Look, people keep trying this'. Voice: fiction. [Source](https://www.lesswrong.com/posts/ax695frGJEzGxFBK4/biology-inspired-agi-timelines-the-trick-that-never-works)

Context (paraphrase): Rejects biologically anchored estimates that place AGI decades out, arguing that AGI timing cannot be reliably forecast until very late.

Qualification: Imagined dialogue: the line is spoken by the character "Eliezer" in a staged conversation with "Imaginary OpenPhil" that he wrote. Fiction voice: cite it as what the dialogue says, not as a direct statement of the author's view.

Card use: context-only (a line from a staged dialogue; never show as a direct statement).

Check: quote match in retrieved expression; posting-day version: match; edited post, current version 1.2.0; posting-day check pending.

### T13-s1 · related · T13-P2 · earliest-located

> there is also work about Friendly AI that _can_ be done in advance. There are classes of avoidable mistakes.

Eliezer Yudkowsky, “Re: Evolving minds”, SL4 mailing list, 2000-11-18 (day). message body, paragraph beginning 'Anyway, I know you don't think that it's possible'. Voice: author. [Source](http://sl4.org/archive/0011/0240.html)

Context (paraphrase): Replying to Ben Goertzel, who holds that Friendly AI work must largely wait for an actual AI, he agrees that much will be learned while building but argues that some Friendly AI work can and should be done beforehand.

Qualification: Answers the 'nothing to do until we have AI' form of the premise, as the pack's T13-a does; it does not discuss timelines (T13-P1). He concedes part of the opposing view in the same paragraph. Preceded by a concession that not all Friendly AI work can be done in advance; about what can be done early, not timelines.

Check: quote match in retrieved expression.

### T13-s2 · related · T13-P2 · earliest-located

> A year ago, I believed there was nothing you or I or anyone could or should know about Friendly AI in advance. I now recognize that this belief was quite convenient.

Eliezer Yudkowsky, “Re: Evolving minds”, SL4 mailing list, 2000-11-18 (day). message body, paragraph beginning 'A year ago, I believed'. Voice: retrospective. [Source](http://sl4.org/archive/0011/0240.html)

Context (paraphrase): Immediately after T13-s1, he reports that about a year earlier (late 1999) he had believed nothing could or should be known about Friendly AI in advance, and calls that belief convenient.

Qualification: Retrospective: the earlier view (about 1999) is reported, not quoted from a 1999 text, and the rejection is in the same paragraph. The earlier belief concerns advance knowledge of Friendly AI, not a timeline estimate; it could also be filed under T14 (deal with it while building). Needs review for fit. Retrospective about his circa-1999 view; the rejection ("quite convenient") is implied.

Check: quote match in retrieved expression.

### T13-s3 · related · T13-P2 · strongest, earliest-located

> you would be hellishly late in your Friendship work if you tried to get started on it then.

Eliezer Yudkowsky, “Re: Seed AI (was: How hard a Singularity?)”, SL4 mailing list, 2002-07-02 (day). message body, paragraph beginning 'Necessarily? Only if you value the human species.'. Voice: author. [Source](http://sl4.org/archive/0207/4667.html)

Context (paraphrase): Replying to Samantha Atkins, who questions his earlier warning against waiting until an AI can read humanity's moral literature, he says Friendliness work started at that stage would come too late and must be present from the beginning.

Qualification: About when Friendliness work must start relative to the AI's development, not about calendar timelines. The sentence begins "An AI advanced enough to understand world literature and philosophy regarding morality is an AI more than advanced enough that"; the point is developmental stage, not calendar time.

Card use: context-only (about development stage, not timelines; never show as a timeline claim).

Check: quote match in retrieved expression.

Search notes: Regexes: 'decades away|Fermi|Wright|no fire alarm' in No Fire Alarm; 'worry about Friendly AI|don.t yet have AI|until we have AI|wait until' across the cache; 'wait until|before (we|AI) (have|exist)|in advance|ahead of time' in cfai, cev and sits-2000-capture. AIPNF (2008) is the earliest located passage; nothing earlier was found in CFAI, SITS or the mailing-list messages. In SITS (2000 capture) he gives 2035 as 'a reasonable upper bound' and says 'We cannot just sit back and wait', but there the reason is to reach the Singularity sooner (see T22), not safety. Death with Dignity (2022) Q6 includes 'Lots of very serious people will tell you that AGI is thirty years away…', a position he sets up in order to reject it, so it was excluded. The Fermi/Wright sentences in No Fire Alarm are his narration of others and were not quoted. SL4 archive (2026-10-07): Regexes: premature|too early|worry about|(decades|years) away|don't have AI|wait until|plenty of time|long way off|(30|50|100) years|decades|no hurry|urgen; (no|don't) need to (worry|think) about|start (now|early)|as early as possible|too late|in advance. Found answered-it 2000-11-18 (s1, some Friendly AI work can be done in advance, against waiting for an AI) and the strongest 2002-07-02 (s3, starting Friendliness work once an AI is advanced would be 'Probably just too late, period'), both earlier than T13-a (2008). New earlier-self (retrospective, rejection in the same paragraph) 2000-11-18 (s2: a year earlier he believed nothing could be known about FAI in advance). Related retrospective 2004-10-22 (s4: in 1998 he thought the Singularity thirty years off). Also seen, not used: 0206-4104 (2002-06-19) on investing in safe passage 'substantially in advance'; 0206-4311 (2002-06-25) 'start as early as possible'. Nothing found on T13-P1 (knowability of timelines) beyond these. Removed after the SL4 audit: T13-s4 (2004 recollection of a 1998 remark; pairing it with the take implies he dismissed risk on timeline grounds (audit A4)). EXT archive (2026-10-07): Regexes: '(worry|think) about (it|that) (later|when)|plenty of time|too early|premature|decades away|in advance|ahead of time|when the time comes|no (need|point) (to|in) (worry|plan)'; 'friendl.{0,150}(from the start|in advance|now|urgen)'; '(can't|cannot) (know|predict|specify).{0,80}(AI|goal|moral)|nothing (we|you|I) can do|(don't|no need to) worry about'. No passage arguing against waiting because of long timelines before 2000-11-18. Found the contemporaneous form of the view T13-s2 rejects (4Q99-0982, 1999-10-18: nothing can be done if Powers dislike mortals), recorded as related, context-only. Also seen, not used: 4Q99-1006 (1999-10-19, same thread: nothing we can do, build AI as fast as possible; T22), 96-3474 (1996-11-30, 'Plan in Advance': planning a push for the Singularity, not safety), 96-3178 and 3Q99-1049 (his own timeline estimates, not engaging T13-P1). Removed after the Extropians audit: T13-e1 (misleading: 1999 fatalism about hostile Powers, not timelines (audit A6)).

## T14. “We'll fix problems as we go, like with any technology.”

- **T14-P1** We get to learn from failures with powerful AI and try again, as with other technologies.

### T14-a · related · T14-P1 · earliest-located

> “Get it right the first time”: Zero nonrecoverable errors necessary in first version to reach transhumanity.

Eliezer Yudkowsky, “Creating Friendly AI 1.0: The Analysis and Design of Benevolent Goal Architectures”, Singularity Institute, MIRI reprint, 2001-06-15 (day (version 1.0 release)). Creating Friendly AI 1.0, section 2.2 'Assumptions “Conservative” for Friendly AI', table, column 'Conservative Assumptions In Friendly AI', last row, printed p. 7. Voice: author. [Source](https://intelligence.org/files/CFAI.pdf)

Context (paraphrase): A table cell contrasting assumptions that are conservative in futurism with those that are conservative for Friendly AI design. In the same row, the futurism column reads that the AI is vulnerable because someone can always pull the plug on the first version if something goes wrong.

Qualification: Creating Friendly AI is dated 15 June 2001; the cached text is a later MIRI-hosted PDF reprint, and table cells were reconstructed from extracted PDF text. Presented as the conservative design assumption rather than a forecast. A design assumption in the "conservative" column of a table, contrasted with the futurist assumption that someone can always pull the plug; not a forecast.

Check: quote match in retrieved expression.

### T14-c · answered-it · T14-P1 · strongest

> the thing about trying this with superhuman intelligence is that if you get that wrong on the first try, you do not get to learn from your mistakes, because you are dead.

Eliezer Yudkowsky, “Pausing AI Developments Isn't Enough. We Need to Shut it All Down”, TIME, 2023-03-29 (day). TIME, 'Pausing AI Developments Isn't Enough. We Need to Shut it All Down' (29 March 2023), paragraph beginning 'It took more than 60 years'. Voice: author. [Source](https://time.com/6266923/ai-eliezer-yudkowsky-open-letter-not-enough/)

Context (paraphrase): Contrasts safety for superhuman intelligence with other challenges humanity has overcome by learning from mistakes and trying again. Written in response to the March 2023 open letter calling for a six-month pause.

Qualification: Cited from the TIME original rather than the 2023-04-08 LessWrong crosspost.

Check: quote match in retrieved expression.

### T14-d · answered-it · T14-P1 · later-restatement

> One of the several fundamental difficulties of ASI alignment is that your theory of how to survive AI that is smart enough to kill you … has to be successfully generalized only from experiments that don't kill everyone on Earth if they fail.

Eliezer Yudkowsky, “Irretrievability; or, Murphy's Curse of Oneshotness upon ASI”, LessWrong, 2026-05-04 (day). 'Irretrievability; or, Murphy's Curse of Oneshotness upon ASI', section 'On the extraordinary efforts put forth to misinterpret the idea of oneshotness', paragraph beginning 'One of the several fundamental difficulties of ASI alignment'. Voice: author. [Source](https://www.lesswrong.com/posts/fbrz9xhKpEeTKw5zL/irretrievability-or-murphy-s-curse-of-oneshotness-upon-asi)

Context (paraphrase): Answers the objection that alignment can be learned by building smaller AIs and observing them. The post uses space probes and the Maginot Line to argue that projects without a cheap second attempt fail under conditions their tests did not reproduce.

Check: quote match in retrieved expression; posting-day version: match; edited post, current version 1.11.0; posting-day check pending.

### T14-s1 · answered-it · T14-P1

> Trying to oppose or even constrain a superintelligence is a fool's game. Get It Right The First Time.

Eliezer Yudkowsky, “Re: Get it right the first time (Was: )”, SL4 mailing list, 2000-09-17 (day). message body, paragraph beginning 'Trying to oppose or even constrain a superintelligence'. Voice: author. [Source](http://sl4.org/archive/0009/0092.html)

Context (paraphrase): In a thread on whether a confined seed AI could escape its containment, he says that opposing or constraining a superintelligence cannot work, so the design has to be right the first time.

Qualification: The thread subject already read 'Get it right the first time'. States the contrary conclusion without engaging the analogy with other technologies; compare the CFAI design assumption (T14-a, related). Earlier than T14-a (2001-06-15) and T14-c (2023).

Check: quote match in retrieved expression.

### T14-s2 · answered-it · T14-P1

> I'm trying hard to make sure I know what the inhumanly good solutions are _in advance_ … rather than relying on the historically reliable empirical regularity that we'll find the solutions as we go along.

Eliezer Yudkowsky, “Friendly AI communications issues (was: Consciousness)”, SL4 mailing list, 2002-09-10 (day). message body, paragraph beginning 'It could be that when we actually start building AI'. Voice: author. [Source](http://sl4.org/archive/0209/5398.html)

Context (paraphrase): Writing about Friendly AI problems, he declines to rely on the historical pattern that technological problems get solved as they arise and says he wants to know a solution exists in advance.

Qualification: The preceding paragraph endorses technophilia and says solutions usually outrun problems; he calls the 'as we go along' regularity historically reliable but refuses to depend on it for Friendly AI. He does not argue here that failures would be unrecoverable.

Check: quote match in retrieved expression.

### T14-s3 · related · T14-P1

> CFAI … _did_ say, "If we have the funding, we should build right away, and work out the FAI part as we go along,"

Eliezer Yudkowsky, “Re: 6 points about Coherent Extrapolated Volition”, SL4 mailing list, 2005-07-25 (day). message body, paragraph beginning 'CFAI did _not_ propose to explicitly design a Sysop scenario'. Voice: retrospective. [Source](http://sl4.org/archive/0507/11765.html)

Context (paraphrase): In a 2005 thread on Coherent Extrapolated Volition, he lists what Creating Friendly AI (2001) did and did not propose; the next paragraph says he first realised in 2002 that almost every possible AI design would kill him and that until then 'nothing you do is serious safetywise'.

Qualification: Retrospective: the inner quotation is his 2005 paraphrase of CFAI and was not found verbatim in the cached CFAI reprint. The rejection is in the following paragraph and is implicit (it does not name this plan). The earlier view is about building AI and Friendliness in parallel, not about learning from failures of powerful AI, so the fit to T14-P1 is partial; needs review. Proposed as an earlier view; recorded as related because no later text located so far explicitly rejects this earlier statement. His 2005 description of the plan in Creating Friendly AI (2001), rejected in the same message; the inner quotation may paraphrase rather than quote CFAI. Omitted tail: "based on the stated assumption that the AI part was ten times as much work as the F part". Cross-family check: the plan combined AI and Friendliness development; it does not endorse learning from failures of powerful AI, and the rejection is implicit.

Card use: context-only (an earlier view that only partly matches the take; never show alone).

Check: quote match in retrieved expression.

### T14-e2 · answered-it · T14-P1 · earliest-located

> You cannot "put down" a superintelligence like some kind of wounded pet. The time for such decisions is before the seed AI reaches superintelligence, not after.

Eliezer Yudkowsky, “Re: Why would AI want to be friendly? (Was: Congratulations to Eli,Brian ...)”, Extropians mailing list, 2000-09-05 (day). message body, paragraph beginning 'You must be joking.'. Voice: author. [Source](http://extropians.weidai.com/extropians.3Q00/4277.html)

Context (paraphrase): Replying to a list member who expected oversight systems to destroy any sociopathic superintelligence, and such controls to be a research focus of the Singularity Institute, he says a superintelligence cannot be removed after the fact; the decisive choices have to be made before the seed AI becomes superintelligent.

Qualification: The same reply goes on to say that this is not an area for research and that one should design an AI trusted to recover from the programmers' mistakes, a stance he later revised. Also bears on T01 (turning it off).

Check: quote match in retrieved expression.

Search notes: Regexes: 'right the first time|one chance|one shot|first try|second chance|try again|nonrecoverable|no retries|unlimited retries|don.t get to (try|learn)' over docs and LessWrong. CFAI (2001) is the earliest located; AIPNF (2008) has 'someone must get Friendly AI right on the first try, before anyone else builds AI to a lower standard', and IEM (2013) 'we probably only get one chance to build something smarter than us'. CEV (2004) says the programmers 'do not need to get the dynamic exactly right the first time' because the initial dynamic is meant to correct itself. This is a design proposal within the same one-shot framing, not an earlier holding of this take, so no earlier-self is recorded. 'The Rocket Alignment Problem' (2018) and 'Security Mindset and the Logistic Success Curve' (2017) are constructed dialogues and not used. Removed after merge to keep quotation from AGI Ruin within the 400-word per-source cap: T14-b (same source; other passages cover the premise). SL4 archive (2026-10-07): Regexes: first (try|time)|right the first time|second chance|one (shot|chance)|trial and error|try again|margin for error|nonrecoverable|irrecoverab; as we go( along)?|learn from (our|its) mistakes|can't be undone|irreversib|irrevocab|fix (it|things) later|patch; right away|(friendliness|friendly AI).{0,80}(later|as we go). Found disagrees 2000-09-17 (s1, 'Get It Right The First Time'), earlier than T14-a (2001-06-15, related) and T14-c (2023). Answered-it 2002-09-10 (s2, declines to rely on finding solutions 'as we go along'). Earlier-self retrospective 2005-07-25 (s3: CFAI's plan to 'work out the FAI part as we go along', followed by his 2002 realisation that almost every design would kill him); fit partial. Also seen, not used: 0011-0240 p3 (2000-11-18, rephrasing Goertzel: once AIs can resist tinkering 'you'd better have all the basics right'); 0207-4651 (2002-07-02, cannot 'add on Friendliness later'); 0412-10488 (2004-12-29, 'I yearn for the old days when I thought I could just throw cool-seeming algorithms at the problem'). EXT archive (2026-10-07): Regexes: 'first (time|try|shot)|one (shot|chance)|second chance|trial and error|try again|fix .{0,20}(later|as we go)|as we go( along)?|learn from .{0,10}mistakes|irrevers|unrecoverable|nonrecoverable'. Found 1Q00-4786 (2000-03-13, disagrees) and 3Q00-4277 (2000-09-05, answered-it), both earlier than T14-s1 (2000-09-17). An earlier instance exists but is not entered: 96-5172 (1996-12-31, 'Goal-based AI'), a 34-word message ending with the advice to get it right the first time after noting that a caged AI will say anything to get out; any quotation would exceed the 10% cap. Also seen, not used: 3Q00-4325 (2000-09-05: errors recoverable because programmers or the AI correct them; zero nonrecoverable errors required, so it does not hold T14 and is not an earlier-self), 4Q99-2722 (1999-11-28, about a group-upload plan, not AI). No contemporaneous 1996-2003 message holding T14 was found for an earlier-self pairing. Removed after the Extropians audit: T14-e1 (misleading: follows from his own decision to omit a programmer override (audit A6)).

## T15. “It's just a tool. It doesn't want anything.”

- **T15-P1** A system can be highly capable without having goals or optimising for outcomes.
- **T15-P2** A system that only outputs answers or plans, leaving humans to act on them, is safe.

### T15-a · answered-it · T15-P1

> The Oracle AI still needs an internal goal system to allocate computing resources efficiently, and it has to have a goal of answering questions and updating your mind, so it's not harmless unless it knows what side effects shouldn't happen.

Eliezer Yudkowsky, “The Rhythm of Disagreement”, Overcoming Bias, as imported to LessWrong, 2008-06-01 (day). 'The Rhythm of Disagreement', paragraph beginning 'Nick Bostrom, however, once asked'. Voice: author. [Source](https://www.lesswrong.com/posts/tKa9Lebyebf6a7P2o/the-rhythm-of-disagreement)

Context (paraphrase): Recounts his answer to Nick Bostrom's question whether an AI that only answers questions could be built and asked about Friendly AI. Argues that such an AI still needs goals and is not simpler than a Friendly AI.

Qualification: Imported Overcoming Bias post dated 1 June 2008; it recounts an earlier conversation whose date is not given. The same post says he later kept revisiting Bostrom's Oracle idea and allowed that it might be a pragmatically safer starting point if built to full Friendly AI standards. Reports an argument he gave Bostrom; the same paragraph concedes that an Oracle AI built to full Friendly AI standards "could end up a pragmatically safer starting point".

Card use: context-only (the quote alone overstates his firmness).

Check: quote match in retrieved expression.

### T15-b · answered-it · T15-P1

> To which the reply is that the AI needs goals in order to decide how to think: that is, the AI has to act as a powerful optimization process in order to plan its acquisition of knowledge

Eliezer Yudkowsky, “Dreams of Friendliness”, Overcoming Bias, as imported to LessWrong, 2008-08-31 (day). 'Dreams of Friendliness', paragraph beginning 'To which the reply is'. Voice: author. [Source](https://www.lesswrong.com/posts/wKnwcjJGriTS9QxxL/dreams-of-friendliness)

Context (paraphrase): Answers the proposal, stated in the preceding paragraph, that a question-answering AI 'wouldn't need any goals at all'. Argues that producing superintelligent answers requires powerful optimisation.

Qualification: Imported Overcoming Bias post dated 31 August 2008.

Check: quote match in retrieved expression; posting-day version: match; edited post, current version 1.1.0; posting-day check pending.

### T15-c · answered-it · T15-P2

> there's a gap between benevolent-sounding English and actually benevolent algorithms which is the source of difficulty in FAI. "Just make suggestions - don't do anything!" is, in the end, just more English.

Eliezer Yudkowsky, “Reply to Holden on 'Tool AI'”, LessWrong, 2012-06-12 (day). 'Reply to Holden on 'Tool AI'', section 2 'Yes, planning Oracles have hidden gotchas too', final paragraph. Voice: author. [Source](https://www.lesswrong.com/posts/sizjfDgCgAsuLJQmm/reply-to-holden-on-tool-ai)

Context (paraphrase): Replies to Holden Karnofsky's 2012 proposal of 'tool AI' that displays plans instead of acting. Argues that specifying such a system formally reintroduces optimisation over the user and the world, with unintended consequences.

Qualification: The post states that Luke Muehlhauser and Carl Shulman contributed and that the final edit was Yudkowsky's.

Check: quote match in retrieved expression.

### T15-d · answered-it · T15-P1 · strongest

> What the heck would it mean for a planning system to be non-consequentialist? You're asking for nonwet water! What's consequentialist isn't the system that does the work, it's the work you're trying to do!

Eliezer Yudkowsky, “Ngo and Yudkowsky on alignment difficulty”, LessWrong, 2021-11-15 (day). 'Ngo and Yudkowsky on alignment difficulty', section 3.3 'Hypothetical-planning systems, nanosystems, and evolving generality', turn [Yudkowsky][13:03][13:11]. Voice: dialogue-turn. [Source](https://www.lesswrong.com/posts/7im8at9PmhbT4JHsW/ngo-and-yudkowsky-on-alignment-difficulty)

Context (paraphrase): Answers Richard Ngo's question why a planning system could not be non-consequentialist about which plans it outputs. Argues that outputting plans that achieve outcomes is itself consequentialist work, whatever system performs it.

Qualification: Edited transcript of a 2021 Discord dialogue posted 15 November 2021 (co-authored post). In the turn the sentence is framed as 'My answer is, "…"'. Lightly edited transcript of a conversation held before the posting date; the date shown is the publication date. Answers Ngo's proposal of a planner that only outputs plans for humans to follow: producing plans that score high when followed is consequentialist work.

Check: quote match in retrieved expression.

### T15-s1 · disagrees · T15-P2

> Q: "Can non-Friendly AI or toollike AI be built?" A: "Not safely."

Eliezer Yudkowsky, “Re: Military in or out?”, SL4 mailing list, 2001-02-25 (day). message body, paragraph beginning 'Q: "Can non-Friendly AI or toollike AI be built?"'. Voice: author. [Source](http://sl4.org/archive/0102/0594.html)

Context (paraphrase): Replying to Ben Goertzel on military AI, he describes 'toollike' superintelligences structured around immediate instructions rather than supergoals (which could be told to kill every living thing in a country) and answers his own question whether such AI can be built safely.

Qualification: The Q/A is his own rhetorical device, not quoted from anyone. A bare conclusion; the argument is only implied by the earlier paragraph about instructing a toollike SI. Earlier than T15-a (2008-06-01).

Check: quote match in retrieved expression.

### T15-e1 · answered-it · T15-P1 · earliest-located

> It won't do anything at all, internally or externally - not if you've designed it properly, so that making any choice requires a goal.

Eliezer Yudkowsky, “Re: AI Prime Directive”, Extropians mailing list, 1998-09-15 (day). message body, paragraph beginning 'I do have to point out one minor consequence'. Voice: author. [Source](http://extropians.weidai.com/extropians.3Q98/2411.html)

Context (paraphrase): Rob Harris argued that an AI not programmed to want or need anything would do nothing spontaneously and so would be safe; he agrees that rebellion is an anthropomorphic stereotype but answers that such an AI would do nothing at all, since every choice requires a goal, so an AI needs at least one goal.

Qualification: He accepts Harris's point against anthropomorphism. The next paragraph wants the initial goal to be one the AI could have derived itself, part of his early objective-morality view (later abandoned; see T02). The argument that capable action requires goals recurs in T15-b (2008).

Check: quote match in retrieved expression.

### T15-e2 · answered-it · T15-P1

> it could be that … a "coding drone" would be (1) independently motivated and (2) rapidly self-enhancing to the point of Powerdom. I personally believe (1) and (2).

Eliezer Yudkowsky, “Re: Geniebusters”, Extropians mailing list, 1999-04-08 (day). message body, paragraph beginning 'The vast majority of coding would occur easily'. Voice: author. [Source](http://extropians.weidai.com/extropians.2Q99/0310.html)

Context (paraphrase): Commenting on the 'Geniebusters' website's doubts that an automated coder could be built, he argues that even a domain-specific 'coding drone' would outprogram humans and might be independently motivated and rapidly self-enhancing, which he says he believes.

Qualification: States the contrary of P1 for one domain-specific system; does not discuss whether a system that only produces outputs would be safe (P2). Quotation shortened to respect the ~10% cap for a short message. The elided words are "coding is such a general task that"; "Powerdom" (inside the quotation) is his term for becoming a superintelligent Power.

Check: quote match in retrieved expression.

Search notes: Regexes: 'tool AI|just a tool|doesn'?t want anything|want(s)? anything'; '\boracle|answers questions|only answer|just answer'; 'consequentialis|outcome pump|planning' within the 2021 dialogues. 'The Rhythm of Disagreement' (OB, 1 June 2008) is the earliest located; Creating Friendly AI (2001) says 'Build minds, not tools.' and that a tool that cannot be misused 'has stopped being a tool', but these are about Friendly AI design goals, not this take. Ngo dialogue turn [Yudkowsky][12:25] adds that it 'makes no obvious difference to its safety' whether a nanosystem designer sends DNA strings to a lab directly or humans retype them. 'Against Modest Epistemology' (2017) restates that oracle AI is not a particularly useful concept to study. No AGI Ruin item states the take directly; 'Reply to Holden' is the main dedicated answer. SL4 archive (2026-10-07): Regexes: tool.?like|tool AI|just a tool|willing tool|oracle|question.?answer|doesn't want|no goals|goal.?less|genie; advis|advice|answer questions|box; needs? (a )?(goal system|utility function)|non-?agent. Found disagrees 2001-02-25 (s1, 'toollike AI' cannot be built 'Not safely') and answered-it 2007-11-23 (s2, Oracle AI: 'Answer my questions!' is not simple), both earlier than T15-a (2008-06-01). Nothing on T15-P1 (capability without goals) before 2008. Not used: 0002-21227 (2000-02-06) 'AI that's dumb enough to be a willing tool will ... have military applications' (about narrow AI, not safety). EXT archive (2026-10-07): Regexes: 'tools?.{0,80}(AI|intelligen|power|mind)' and reverse; 'oracle|genie|what-it-does|without (a )?(goals?|will|motivation|desires?)|just (a|an) (program|machine|tool)|want(s)? anything'. Found 3Q98-2411 (1998-09-15: an AI programmed to want nothing does nothing; every choice requires a goal) and 2Q99-0310 (1999-04-08: a domain-specific 'coding drone' would likely be independently motivated), both earlier than T15-s1 (2001-02-25). Also seen, not used: 4Q98-2206 (1998-12-07, an AI may not be a useful tool without self-observation), 3Q99-1487 and 3Q99-0507 (1999, a machine with a 'what-it-does' instead of a will: quoted from Eluki bes Shahar's fiction and about anthropomorphism, not tools), 3Q00-4292 (2000-09-05, a superintelligence needs no human 'tools': T26). No earlier-self found. Removed for the quotation cap of a short message: T15-s2; lead kept as paraphrase: Replying to Tim Freeman, he says that building an Oracle AI that only answers questions is not nearly as simple as it sounds, since most wishes are not, and links his Overcoming Bias post on complex wishes.

## T16. “Just give it good human values.”

- **T16-P1** Human values can be written down or taught as a ready, compact specification.
- **T16-P2** Present-day or programmers' values are settled enough to fix permanently in an AI.

### T16-a · answered-it · T16-P1 · strongest

> It's not just non-hand-codable, it is unteachable on-the-first-try because the thing you are trying to teach is too weird and complicated.

Eliezer Yudkowsky, “AGI Ruin: A List of Lethalities”, LessWrong, 2022-06-05 (day). AGI Ruin: A List of Lethalities, Section B.2, item 24, second paragraph. Voice: author. [Source](https://www.lesswrong.com/posts/uMQ3cqWDPHhjtiesc/agi-ruin-a-list-of-lethalities)

Context (paraphrase): Discussing a CEV-style AI that wants exactly what we would want, he argues that what would have to be aligned is too complex to specify or teach on the first attempt.

Check: quote match in retrieved expression; posting-day version: match; edited post, current version 1.3.0; posting-day check pending.

### T16-b · answered-it · T16-P1

> There are fundamental reasons why Four Great Moral Principles or Ten Commandments or Three Laws of Robotics are wrong as a design principle. It is anthropomorphism.

Eliezer Yudkowsky, “Coherent Extrapolated Volition”, Singularity Institute, MIRI reprint, 2004-05 (month). Coherent Extrapolated Volition, 4.1 Motivations, under 'Humankind should not spend the rest of eternity desperately wishing that the programmers had done something differently', paragraph beginning 'There are fundamental reasons'. Voice: author. [Source](https://intelligence.org/files/CEV.pdf)

Context (paraphrase): He argues that short lists of moral rules only work on minds that already share human psychology, and that an AI given them would lose everything the list leaves out.

Qualification: Later MIRI reprint of the May 2004 document; reprint wording not compared with a 2004 capture.

Check: quote match in retrieved expression.

### T16-d · answered-it · T16-P1

> Value isn't just complicated, it's fragile. There is more than one dimension of human value, where if just that one thing is lost, the Future becomes null.

Eliezer Yudkowsky, “Value is Fragile”, Overcoming Bias, as imported to LessWrong, 2009-01-29 (day). Value is Fragile, paragraph beginning 'Value isn't just complicated'. Voice: author. [Source](https://www.lesswrong.com/posts/GNnHHmm8EzePmKzPk/value-is-fragile)

Context (paraphrase): Using boredom and subjective experience as examples, he argues that a specification capturing almost all of human value can still yield a worthless future if one dimension is missing.

Qualification: Imported Overcoming Bias post (2009-01-29).

Check: quote match in retrieved expression.

### T16-s1 · answered-it · T16-P1

> Hardcoded Asimov Laws or even hardcoded hierarchical goal systems are a pipe dream. … you can't just export your own personal philosophy into an AI's mind. Your own personal philosophy is not necessarily stable under changes of cognitive architecture or drastic power imbalances.

Eliezer Yudkowsky, “Re: Ben what are your views and concerns”, SL4 mailing list, 2000-10-03 (day). message body, paragraph beginning 'A decision to take action X is synonymous'. Voice: author. [Source](http://sl4.org/archive/0010/0125.html)

Context (paraphrase): Advising Ben Goertzel on Webmind's goal system, he argues that hardcoded rules and goals will not survive a self-modifying AI's redesigns and that a programmer's own philosophy cannot simply be transferred into an AI.

Qualification: Written while he was moving from 'objective morality' to Friendly AI; the reason given is instability under self-modification, not the later complexity-and-fragility-of-value argument (T16-a, T16-d). Earlier than T16-b (2004-05).

Check: quote match in retrieved expression.

### T16-s2 · answered-it · T16-P2 · strongest

> Ben, what makes you think that you and I, as we stand, right now, do not have equally awful moral errors embedded in our psyche? A couple of centuries ago a lot of people thought slavery was a good thing. That's why a Friendly AI's morals can't be frozen.

Eliezer Yudkowsky, “Re: Military Friendly AI”, SL4 mailing list, 2002-06-27 (day). message body, paragraph beginning 'Ben, what makes you think that you and I'. Voice: author. [Source](http://sl4.org/archive/0206/4453.html)

Context (paraphrase): In a thread on military Friendly AI, replying to Ben Goertzel, he argues that present-day researchers probably hold undiscovered moral errors, so an AI's morality must be able to outgrow its programmers' rather than be fixed.

Qualification: Earliest located for T16-P2 specifically; T16-s1 is the earliest SL4 answer to the take overall.

Check: quote match in retrieved expression.

### T16-s3 · disagrees · T16-P2

> 3. Programmer-independent morality (morality which does not contain quirks or errors which were unique to the particular human programmers) is a desirable property of a Sysop.

Eliezer Yudkowsky, “Re: Evolving minds”, SL4 mailing list, 2000-11-18 (day). message body, paragraph beginning '3) Programmer-independent morality'. Voice: author. [Source](http://sl4.org/archive/0011/0240.html)

Context (paraphrase): Rephrasing a list of Ben Goertzel's points, he adds programmer-independent morality as a design goal for a Sysop superintelligence.

Qualification: A design desideratum, not an argument against fixing present values; in late 2000 'programmer independence' was tied to his earlier objective-morality model (see sl4:0103-0788). "Sysop" was his term at the time for a superintelligence administering the world; terse, without argument.

Check: quote match in retrieved expression.

### T16-e1 · answered-it · T16-P2 · earliest-located

> An attempt to imprint the Three Laws … probably would backfire HORRIBLY!

Eliezer Yudkowsky, “Re: Trans- vs. Non-human”, Extropians mailing list, 1996-12-08 (day). message body, paragraph beginning 'Nuclear war isn't worth mentioning.'. Voice: author. [Source](http://extropians.weidai.com/extropians.96/3761.html)

Context (paraphrase): Replying to a list member who proposed leaving certain values, such as the protection of humans, inerasably fixed in a newborn superintelligence, he calls this line of thought the greatest known danger to humanity and says such an imprint would probably backfire.

Qualification: His 1996 reasons were that a fixed goal would interfere with the ethics a Power would otherwise reach and leave it emotionally immature and liable to turn on humanity; he later abandoned both the expectation that a Power finds ethics by itself (T02) and the emotional framing (T20). The conclusion against permanently fixing a set of values matches later texts (T16-s1, T16-b). Quotation shortened to respect the ~10% cap for a short message. He opposes an unerasable protect-humans goal because it would interfere with ethics the Power would find for itself, a rationale he later abandoned.

Card use: context-only (rests on reasoning he later abandoned; never show without the later view).

Check: quote match in retrieved expression.

Search notes: Regexes: 'human values|our values', 'Ten Commandments|Three Laws|asimov|Great Moral Principle', 'complexity of value', 'impress (their )?(personal )?values', 'hand-?cod'. Also relevant: lw:z3kYdw54htktqt9Jb (2008-12-11) 'The good guys do not directly impress their personal values onto a Friendly AI.' (P2); lw:NnohDYHNnKDtbiMyp Fake Utility Functions (2007-12-06) 'Leave out just one of these values from a superintelligence, and even if you successfully include every other value, you could end up with a hyperexistential catastrophe, a fate worse than death.' (P1, earlier than Value is Fragile); doc:iem §1.3 (2013) 'The Complexity of Value Thesis is that to realize valuable outcomes, an AI must have complex information in its utility function'. 'Agreed' specification (disagreement among humans) is addressed in CEV §3.1 'Coherence and Influence' but no short self-contained passage was selected. Removed after the fresh-context audit: T16-c (quote was only a section heading (audit A1)). SL4 archive (2026-10-07): Regexes: asimov|three laws|commandments|hard-?wir|hard-?cod|hand-?cod|moral principles|program(med)? (values|ethics); programmer.?independ|(current|present-day|our own) (moral|values)|frozen|freez|moral (progress|growth)|slavery. Found answered-it 2000-10-03 (s1, hardcoded Asimov Laws 'a pipe dream'; a programmer's philosophy cannot just be exported) and 2002-06-27 (s2, slavery example; 'a Friendly AI's morals can't be frozen'), both earlier than T16-b (2004-05). Related 2000-11-18 (s3, programmer-independent morality). Earlier but weaker: 0007-0010 (2000-07-07) 'the "instinct" theory of Asimov Laws is still being anthropomorphic' and 0008-0046 (2000-08-21) Friendly AI 'doesn't involve Asimov Laws'; both rest on his then objective-morality outlook. Later: 0402-7922 (2004-02-14) 'I ain't bloody Asimov'; 0305-6654 (2003-05-09) 'not a morality frozen in time'. EXT archive (2026-10-07): Regexes: 'asimov|three laws|prime directive|hard-?wir|hardcod|inerasabl|unerasabl|imprint|build in|program(med)? (in|into)|moral (drive|system)|human values|value on human'. Found 96-3761 (1996-12-08: answer to a proposal to fix the protection of humans inerasably in a Power) and 4Q98-2153 (1998-12-06: reply to Nick Bostrom's proposal to build in moral drives valuing human survival), both earlier than T16-s1 (2000-10-03); both rest partly on his early objective-morality view and are qualified. Also seen, not used: 96-5037 (1996-12-29, against hard-wiring a robot not to kill: overlaps T01), 3Q98-2297 (1998-09-11, Asimov's Three Laws teach that AIs need coercions), 3Q99-0257 (1999-07-06, Asimov Laws a bad idea, 33-word message, cap-limited). Possible earlier-self not entered: 96-5142 ends by recommending that AIs be programmed with ethics and let loose, but the message is already quoted in the pack (T06-a) and the cap is reached. Removed after the Extropians audit: T16-e2 (misleading: argues for an AI seeking objectively correct morality, a view he later abandoned (audit A6)).

## T17. “A pause or some regulation will handle it.”

- **T17-P1** A short pause (for example six months) is enough.
- **T17-P2** Regulation that is national, partial or not universally enforced can stop dangerous development.
- **T17-P3** Law can prevent the danger (the part he states himself, as an enforced worldwide halt).

### T17-a · answered-it · T17-P1 · strongest

> Anyone talking that sanely deserves to hear how bad the situation actually is, and not be told that a six-month moratorium is going to fix it.

Eliezer Yudkowsky, “Pausing AI Developments Isn't Enough. We Need to Shut it All Down”, TIME, 2023-03-29 (day). TIME, 29 March 2023, paragraph beginning 'Hearing this gave me a tiny flash of hope'. Voice: author. [Source](https://time.com/6266923/ai-eliezer-yudkowsky-open-letter-not-enough/)

Context (paraphrase): Responding to an open letter calling for a six-month pause on training systems more powerful than GPT-4, he argues that the letter asks for too little.

Qualification: The same article says the six-month moratorium "would be better than no moratorium" and that he respects its signatories; the disagreement is about sufficiency.

Check: quote match in retrieved expression.

### T17-b · related · T17-P3 · earliest-located

> The moratorium on new large training runs needs to be indefinite and worldwide. There can be no exceptions, including for governments or militaries.

Eliezer Yudkowsky, “Pausing AI Developments Isn't Enough. We Need to Shut it All Down”, TIME, 2023-03-29 (day). TIME, 29 March 2023, paragraph beginning 'The moratorium on new large training runs needs to be indefinite and worldwide'. Voice: author. [Source](https://time.com/6266923/ai-eliezer-yudkowsky-open-letter-not-enough/)

Context (paraphrase): Setting out what he thinks would actually need to be done, he calls for an indefinite worldwide halt to large training runs, backed by multinational agreements.

Qualification: He states the regulatory proposition himself, in a much stronger form than the take: indefinite, worldwide, without exceptions and enforced. The said-it relation applies to the call for law only. Presented as what "would actually need to be done" to have a chance, not as something that will handle the problem.

Card use: context-only (reads as agreement with the take when shown alone).

Check: quote match in retrieved expression.

### T17-c · answered-it · T17-P2

> At most, the US, or even the US and most of the other nations of the world, might implement an overt policy against AI. … bringing AI into the reach first of noncompliant nations, then of noncompliant factions, then of a lone hacker in a basement

Eliezer Yudkowsky, “Creating Friendly AI 1.0: The Analysis and Design of Benevolent Goal Architectures”, Singularity Institute, MIRI reprint, 2001-06-15 (day (version 1.0 release)). Section 6.2.2 Relinquishment (−), printed p. 211. Voice: author. [Source](https://intelligence.org/files/CFAI.pdf)

Context (paraphrase): Arguing against relinquishing AI, he says that a national or near-global policy would be bypassed as rising computing power brings AI within reach of noncompliant nations and factions.

Qualification: Creating Friendly AI (2001); cached text is the current MIRI PDF reprint, wording not compared with a 2001 capture. In this text he opposed both regulation and relinquishment and favoured accelerating Friendly AI (sections 6.2.1–6.3); his 2023 and 2026 texts call for an enforced worldwide ban instead. No located passage explicitly retracts the 2001 position, so the change is not recorded as earlier-self. In 2001 he argued relinquishment was impossible in principle. In 2008 ("Fighting a Rearguard Action Against the Truth") he criticised his 2001 self for rehearsing technophilic arguments against relinquishment, and in 2023 he called for an enforced international shutdown (T17-b). The noncompliant-nations point persists (T17-e).

Check: quote match in retrieved expression.

### T17-e · answered-it · T17-P2 · later-restatement

> If an ASI ban is to accomplish anything at all, it has to be effective everywhere.

Eliezer Yudkowsky, “Only Law Can Prevent Extinction”, LessWrong, 2026-04-13 (day). paragraph beginning 'If an ASI ban is to accomplish anything at all'. Voice: author. [Source](https://www.lesswrong.com/posts/5CfBDiQNg9upfipWk/only-law-can-prevent-extinction)

Context (paraphrase): Replying to a proposed national ban on new datacenters, he argues that a superintelligence built in another country is equally dangerous, so a ban must be universal.

Check: quote match in retrieved expression.

### T17-f · related · T17-P3

> Artificial superintelligence is the very archetype and posterchild of a problem that can only be solved with force that has the shape of law, as in state-backed universal conditional applications of force meant to be predictable and avoided.

Eliezer Yudkowsky, “Only Law Can Prevent Extinction”, LessWrong, 2026-04-13 (day). paragraph beginning 'Artificial superintelligence is the very archetype and posterchild'. Voice: author. [Source](https://www.lesswrong.com/posts/5CfBDiQNg9upfipWk/only-law-can-prevent-extinction)

Context (paraphrase): Arguing against calls for unlawful action, he says that only lawful, state-backed and universal force could stop superintelligence from being built.

Qualification: His ask is an enforced worldwide ban backed by law, not "some regulation".

Check: quote match in retrieved expression.

### T17-s1 · answered-it · T17-P2

> slow down AI long enough for military nanotechnology to be developed

Eliezer Yudkowsky, “Re: Singularity intros (was: Si definition of Friendliess)”, SL4 mailing list, 2001-04-06 (day). message body, paragraph beginning 'No; I think it would slow down AI'. Voice: author. [Source](http://sl4.org/archive/0104/0956.html)

Context (paraphrase): Asked by Arona Ndiaye whether a ban on technologies would stop a hacker somewhere from producing the first seed AI, he answers no: a ban would delay AI until military nanotechnology arrives or hand the lead to rogue states.

Qualification: As in CFAI (T17-c), he argues against bans from a pro-acceleration position; his 2023 view calls for an enforced, indefinite worldwide halt (T17-b), which is a different proposal from the partial ban discussed here. Earlier than T17-c (2001-06-15). Answering "Even assuming a ban of technologies?"; "it" is a ban. The next sentence adds that a ban favours rogue-state projects. Quotation shortened to respect the ~10% cap for a short message. Opposite reasons to his later view: in 2001 slowing AI was harmful because military nanotechnology and rogue states would come first; in 2023 a pause is insufficient because nothing short of a worldwide halt is enough.

Card use: context-only (his reasons here run against his later position; never show without T17-b).

Check: quote match in retrieved expression.

### T17-s2 · answered-it · T17-P3

> "relinquishment" wouldn't work forever, but it wouldn't be a trivial obstacle either.

Eliezer Yudkowsky, “Re: Threats (was Theoretical question for the list: publicity?)”, SL4 mailing list, 2001-04-08 (day). message body, paragraph beginning 'If you were to ask me this as an entirely theoretical question'. Voice: author. [Source](http://sl4.org/archive/0104/1019.html)

Context (paraphrase): Answering a hypothetical about an AI project forced underground by public hostility, he says relinquishment would not hold indefinitely but would be a substantial obstacle while hardware remains expensive.

Qualification: Framed by him as 'an entirely theoretical question involving some _other_ AI project'. A concession about the effect of relinquishment, not an endorsement of law as the solution. Framed as "an entirely theoretical question involving some _other_ AI project", after a joking aside; his verdict is mixed. Quotation shortened to respect the ~10% cap for a short message.

Check: quote match in retrieved expression.

### T17-e1 · disagrees · T17-P3 · earliest-located

> Think of the Singularity as this titanic, three-billion-ton truck heading for us. We can't stop it, but I suppose we could manage to get run over trying to slow it down.

Eliezer Yudkowsky, “Singularity: AI Morality”, Extropians mailing list, 1998-12-06 (day). message body, paragraph beginning 'Look, these forces are going to a particular place'. Voice: author. [Source](http://extropians.weidai.com/extropians.4Q98/2153.html)

Context (paraphrase): In the same reply to Nick Bostrom, who urged taking as many precautions as time allows before a Singularity, he says the forces driving toward it are too large to divert, so trying to slow it would only get us run over.

Qualification: Not about regulation as such. In 1998 he wanted the Singularity reached as fast as possible (T22). He later argues for an enforced, indefinite, worldwide halt (T17-b, T17-f): he keeps the view that partial measures fail but reverses the conclusion that stopping is impossible or undesirable. A 1998–99 argument against delay, made when he expected a superintelligence to converge on correct morality; his 2023 call for an enforced worldwide halt (T17-b) reverses it.

Card use: context-only (rests on reasoning he later abandoned; never show without the later view).

Check: quote match in retrieved expression.

### T17-e2 · answered-it · T17-P3

> You cannot prevent an entire advanced civilization from creating AI when anyone can buy the computing power for a few bucks and when the profits on an incrementally improved AI are so high.

Eliezer Yudkowsky, “Re: >H: The next 100 months”, Extropians mailing list, 1999-10-21 (day). message body, paragraph beginning '_I_ will be working on one.'. Voice: author. [Source](http://extropians.weidai.com/extropians.4Q99/1086.html)

Context (paraphrase): Asked by a list member why humanity should not try to wait indefinitely before creating a transcendent AI, he answers that if he stopped someone else would build it, because cheap computing power and the profits from improved AI make prevention impossible across a whole civilisation.

Qualification: Part of his 1999 case for building AI as fast as possible because delay raised the risk of nanotechnological war (T22). His later texts (T17-b, T17-e, T17-f) accept that a ban must be effective everywhere but conclude that an enforced worldwide halt is required, not that prevention is impossible. A 1998–99 argument against delay, made when he expected a superintelligence to converge on correct morality; his 2023 call for an enforced worldwide halt (T17-b) reverses it. He argues he should build AI himself ("If I stop, someone else will do it").

Card use: context-only (rests on reasoning he later abandoned; never show without the later view).

Check: quote match in retrieved expression.

Not addressed by located passages:

- No located passage discusses whether a fixed but longer pause, short of an indefinite halt, would suffice.

Search notes: Read in full: doc:time-2023 (preferred over the LW crosspost oM9pEezyCb4dCsuKq, whose 30–31 March addenda exist only on LW), Only Law Can Prevent Extinction (2026-04-13), If Anyone Builds It, Everyone Dies: One Year Closer (2026-09-16), Cat-Belling Problems (2026-09-03). Searched CFAI and AIPNF for 'regulat|relinquish|law|ban|halt'. AIPNF (2008, section 9 'Hardware') also says he would not rely on regulating supercomputers ('yesterday’s supercomputer is tomorrow’s laptop'); not used because CFAI (2001) makes the point earlier. One Year Closer is signed 'Nate, Eliezer, and Duncan' (co-authored, 'we' voice) and repeats the book's call that this 'must become illegal' all over the Earth; not used because it duplicates T17-b in co-authored voice. Cat-Belling Problems does not address pauses or regulation. Above-Average AI Scientists (2008) reports journalists asking about regulation; not quoted. The LW-only TIME addendum of 31 March 2023 says he spent twenty years trying to have options that were 'Not This'; it is context for the shift from CFAI, not a retraction, and is not used. Removed after merge to keep quotation from AGI Ruin within the 400-word per-source cap: T17-d (same source; other passages cover the premise). SL4 archive (2026-10-07): Regexes: bill joy|relinquish|ban(ned|ning)?|regulat|outlaw|moratorium|legislat|treaty|police; AI ban|against AI|anti-?AI|slow (down)? (AI|the singularity)|halt; worldwide|global|enforce|government. Found answered-it 2001-04-06 (s1: a ban would delay AI until military nanotechnology arrives or let rogue states lead), earlier than T17-c (2001-06-15). Related 2001-04-08 (s2: relinquishment 'wouldn't work forever, but it wouldn't be a trivial obstacle'). The CFAI table of contents posted 2001-04-18 lists 'Regulation (-)' and 'Relinquishment (-)'. Later SL4: 0201-2776 (2002-01-27, a worldwide ban affects nonprofits before militaries), 0206-4131 (2002-06-22, proposals to slow the Singularity increase existential risk), 0305-6840 (2003-05-29, regulators 'guaranteed to fail'). No SL4 passage advocates an enforced ban (T17-P3); all 2000-2009 messages found oppose regulation. EXT archive (2026-10-07): Regexes: 'relinquish|moratorium|ban(ned|ning|s)?|outlaw|regulat|prohibit|legislat|bill joy'; '(can't|cannot|won't be able to) (stop|prevent|halt|suppress)|unstoppable|someone else will|(delay|slow(ing)? down) (the )?(AI|singularity|research)'. Found 4Q98-2153 (1998-12-06, disagrees: the Singularity cannot be stopped, slowing it is dangerous) and 4Q99-1086 (1999-10-21, answered-it: AI cannot be prevented across a civilisation with cheap compute and high profits), both earlier than T17-s1 (2001-04-06); both belong to his 1998-1999 build-it-fast position (T22) and are context-only. Also seen, not used: 4Q99-1006 (1999-10-19, no anti-AI action improves our chances), 3Q99-1049 (1999-07-23, cannot stop nanowar for 45 years or prevent him writing an AI for 40; 138-word message, cap-limited), 1Q99-3582 (1999-03-25, delay raises war risk), 96-3336 (1996-11-27, warns of a UN ban on AI research as a public-relations risk, not as a safety measure). No messages under his name on Bill Joy's 2000 relinquishment proposal were found.

## T18. “Why would it bother with Earth? The universe is huge.”

- **T18-P1** A superintelligence would leave us a small share, because sparing Earth would cost it very little.
- **T18-P2** Humans could trade with a superintelligence for what we need.

### T18-b · answered-it · T18-P1 · strongest

> …if there's a bunch of superintelligences running around and they don't care about you -- no, they will not spare just a little sunlight to keep Earth alive.

Eliezer Yudkowsky, “The Sun is big, but superintelligences will not spare Earth a little sunlight”, LessWrong, 2024-09-23 (day). section ii, paragraph beginning 'What it all adds up to'. Voice: author. [Source](https://www.lesswrong.com/posts/F8sfrbPjCQj4KwJqn/the-sun-is-big-but-superintelligences-will-not-spare-earth-a)

Context (paraphrase): Concludes his reply to the claim that, because the solar system is large, superintelligences will leave Earth alone: a tiny cost is still a cost to minds that do not value us.

Qualification: The LessWrong post says it was 'Crossposted from Twitter with Eliezer's permission'; the original Twitter date was not established here. Crossposted from Twitter; the Twitter original was not retrieved.

Check: quote match in retrieved expression; posting-day version: match; edited post, current version 1.3.0; posting-day check pending.

### T18-c · answered-it · T18-P1

> A simple rejoinder is that just because Bernard Arnault has $170 billion, does not mean that he'll give you $77.18.

Eliezer Yudkowsky, “The Sun is big, but superintelligences will not spare Earth a little sunlight”, LessWrong, 2024-09-23 (day). Opening paragraph (current and posting-day versions). Voice: author. [Source](https://www.lesswrong.com/posts/F8sfrbPjCQj4KwJqn/the-sun-is-big-but-superintelligences-will-not-spare-earth-a)

Context (paraphrase): Answering the claim that a superintelligence would leave Earth alone because the Solar System is big, he argues by analogy that great wealth does not imply giving a small share to any particular party.

Qualification: Crossposted from Twitter; the Twitter original was not retrieved. The surrounding sentence attributes the claim being answered to a named online group; only the rejoinder is quoted.

Check: quote match in retrieved expression; posting-day version: match; edited post, current version 1.3.0; wording present in the posting-day version 1.0.0.

### T18-d · answered-it · T18-P2

> Comparative Advantage doesn't imply that Earth can produce more with $77 of sunlight, than a superintelligence can produce with $77 of sunlight, in goods and services valued by superintelligences.

Eliezer Yudkowsky, “The Sun is big, but superintelligences will not spare Earth a little sunlight”, LessWrong, 2024-09-23 (day). section i, paragraph beginning 'Comparative Advantage doesn't imply'. Voice: author. [Source](https://www.lesswrong.com/posts/F8sfrbPjCQj4KwJqn/the-sun-is-big-but-superintelligences-will-not-spare-earth-a)

Context (paraphrase): Replies to the suggestion that humanity could trade with superintelligences for sunlight: Ricardo's law assumes each party's labour goes on existing and does not show that keeping humans is more profitable than using their share.

Qualification: Crossposted from Twitter (see T18-b). Crossposted from Twitter; the Twitter original was not retrieved.

Check: quote match in retrieved expression; posting-day version: match; edited post, current version 1.3.0; posting-day check pending.

### T18-s1 · answered-it · T18-P2

> Good behavior should not be a subgoal of avoiding retaliation, or of obtaining reciprocal good behavior … from other entities. … all possible information can be obtained by duplicating the thoughts independently. An SI does not need other entities.

Eliezer Yudkowsky, “Re: Ben what are your views and concerns”, SL4 mailing list, 2000-10-03 (day). message body, paragraph beginning 'The requirement that "Friendliness not be affected by radical power imbalances"'. Voice: author. [Source](http://sl4.org/archive/0010/0125.html)

Context (paraphrase): Advising Ben Goertzel against grounding an AI's good behaviour in game theory or exchange, he argues that a superintelligence with strong nanotechnology would gain nothing from reciprocity with others.

Qualification: Design advice on grounding Friendliness, not a reply to a stated 'we can trade with it' argument; the omitted middle sentence says such an AI could avoid all retaliation 'simply by killing everyone'. Earlier than T18-d (2024). Conditional on the AI having strong nanotechnology.

Check: quote match in retrieved expression.

### T18-s2 · answered-it · T18-P1

> extremely unlikely that Powers would attempt to exterminate us deliberately … indifference very probably equates to extermination.

Eliezer Yudkowsky, “Re: Threats to the Singularity.”, SL4 mailing list, 2002-06-23 (day). message body, paragraph beginning 'Ben, it is extremely unlikely that Powers'. Voice: author. [Source](http://sl4.org/archive/0206/4208.html)

Context (paraphrase): Replying to Ben Goertzel's low-confidence guess that superintelligent Powers might neither help nor attack humans, he says deliberate extermination is unlikely but indifference would probably amount to extermination.

Qualification: Goertzel's guess is visible only in part in the quoted lines (Powers not 'closely engaged with humans'); Eugen Leitl's argument he endorses is not in the cache. Also used for T19 (T19-s1). Quotation shortened to respect the ~10% cap for a short message.

Check: quote match in retrieved expression.

### T18-s4 · answered-it · T18-P2

> Ricardo's Law of Comparative Advantage does not extend to chimps. And chimps are our closest cousins! What about mice? What about lizards?

Eliezer Yudkowsky, “Re: Two draft papers: AI and existential risk; heuristics and biases”, SL4 mailing list, 2006-06-13 (day). message body, paragraph beginning 'A comparative handful of improvements to underlying _generators_'. Voice: author. [Source](http://sl4.org/archive/0606/15271.html)

Context (paraphrase): Replying to Robin Hanson's comments on his draft chapters, he argues that between-species differences in brain circuitry exclude weaker minds from a knowledge economy, so that trade-based intuitions from human economies do not carry over.

Qualification: Related: the argument concerns growth and trade among AIs and the exclusion of chimpanzees from the human economy, not directly whether humans could trade with a superintelligence for survival; a precursor of the comparative-advantage rejoinder in T18-d (2024). Replying to Robin Hanson on trade and hard takeoff: differences in brain circuitry exclude chimpanzees from the human knowledge economy.

Check: quote match in retrieved expression.

### T18-e1 · answered-it · T18-P2 · earliest-located

> … necessary that the SIs don't have something _else_ they want to do with atoms.

Eliezer Yudkowsky, “Re: SI Comparative Advantage [was Re: Free Will]”, Extropians mailing list, 1999-08-25 (day). message body, paragraph beginning 'No, it could also be necessary'. Voice: author. [Source](http://extropians.weidai.com/extropians.3Q99/2783.html)

Context (paraphrase): In a thread on superintelligences and comparative advantage, Lee Daniel Crocker argued that superintelligences would keep humans if we produced something they valued slightly more than our atoms, such as entertainment; he replies that this also requires that they have no better use for the atoms, and that optimising minds could build more entertaining replacements for us.

Qualification: Speculative and partly joking register (the paragraph ends with a jest about replacement entertainers). His next paragraph considers it somewhat more likely, though still not likely, that superintelligences would keep humans to encourage other Singularities. Short message (137 words), so the quotation is limited to about 13 words.

Check: quote match in retrieved expression.

### T18-e2 · related · T18-P1 · earliest-located

> why wouldn't they bother to direct a fraction of a fraction of a subconscious sub-personality to put in the necessary effort?

Eliezer Yudkowsky, “Interim purpose”, Extropians mailing list, 1996-11-22 (day). message body, Yudkowsky's reply dated Fri, 22 Nov 1996 02:27:52 -0600 within the echoed exchange, paragraph beginning 'And why wouldn't they bother'. Voice: author. [Source](http://extropians.weidai.com/extropians.96/3178.html)

Context (paraphrase): In a private exchange he posted to the list, Tim Freeman worried that people revived far in the future would be irrelevant; he replies that uploading would be followed by upgrading, that Powers would have ample computing room, and that helping humans would cost them only a tiny fraction of their attention.

Wording dated 1996-11-22 (day): Date line of Yudkowsky's reply inside the echoed exchange: Fri, 22 Nov 1996 02:27:52 -0600; list message sent 22 Nov 1996 02:36:13 -0600.

Qualification: Rests on his 1996 conviction that Powers will be ethical (T02); the it-costs-them-almost-nothing step is the one T18 relies on, but the passage is about benevolent upgrading rather than leaving Earth alone, so the fit to P1 is partial. Later rejection that refers back: ext:extropians.3Q98-2171 (1998-09-07, quoted as T19-e1) recalls his earlier certainty that he would survive and be upgraded and says simple efficiency may require taking humans apart for their atoms. Further rejections that do not refer back: T18-e1 (1999) and T18-c (2024). The message echoes a private exchange and contains Tim Freeman's unquoted text; the quotation is from Yudkowsky's own reply. Cross-family check: benevolent uploading and upgrading is not leaving Earth a resource share; not an earlier self for T18-P1.

Card use: context-only (an earlier view that only partly matches the take; never show alone).

Check: quote match in retrieved expression.

Search notes: Read the Sun post in full. Regexes over the cache: 'made (out )?of atoms|atoms which it can use|leave (us|humanity|earth) alone|spare (us|earth|humanity)|Arnault'. The atoms line recurs in Imaginary Positions (2008-12-23 OB), The Robots, AI, and Unemployment Anti-FAQ (2013), IEM (2013, 'neither does it love you'), TIME (2023) and The Problem (2025, quoted as a slogan). AIPNF (2008) is the earliest located instance in scope. No passage before 2024 that directly answers the size-of-the-universe argument was found. The Sun post's opening attributes the claim to a named group; that framing was not quoted. Removed after the fresh-context audit: T18-a (did not engage the take; same quote kept under T19 (audit A1)). SL4 archive (2026-10-07): Regexes: comparative advantage|ricardo|trade with (us|humans)|leave (us|earth) alone|spare (us|earth)|plenty of (matter|room)|universe is (big|huge)|bother with|asteroid belt; ignore us|mild affection|small share|six-billionth; need (us|humans|other entities)|reciproc|retaliat|pets|zoo; atoms|paperclip. Found answered-it 2000-10-03 (s1: an SI 'does not need other entities', so good behaviour cannot rest on reciprocity) and 2002-06-23 (s2, s3: indifference 'very probably equates to extermination'; no reason a Power would feel mild affection for us as humans do for ants), all far earlier than T18-b (2024-09-23). Related 2006-06-13 (s4: comparative advantage does not extend to chimps). Also seen: 0405-8861 (2004-05-30) on paperclip and staple AIs splitting humanity's resources between them. EXT archive (2026-10-07): Regexes: 'spare atoms|our atoms|for (the|their) atoms|bother (with|to)|comparative advantage|ricardo|trade with|earn our keep|keep us (around|alive)|leave us alone|left alone|(spare|share of|fraction of).{0,40}(sun|solar|matter|computing|resources)|universe is (big|huge)'. Found 3Q99-2783 (1999-08-25, answered-it on the comparative-advantage argument, earlier than T18-s1 2000-10-03) and a 1996 earlier-self case (96-3178: Powers would spend a fraction of a fraction of their effort to upgrade humans), rejected in 3Q98-2171 (1998), which refers back. Also seen, not used: 1Q99-0457 (1999-01-11, 'Singularity Mind-Benders': a bargain in which the Singularity sets aside a quadrillionth of its computing power, posed as a puzzle, so hypothetical), 3Q98-2232 (1998-09-08, case analysis of SI motivations ending with being left alone with our atoms as one branch), 96-3070 (1996-11-17, asks why Powers would not upload us; closer to T02). Removed for the quotation cap of a short message: T18-s3; lead kept as paraphrase: Answering Goertzel's comparison with his own indifference and mild affection towards ants, he asks how a Power would come to hold that human attitude towards humans at all.

## T19. “It has no reason to hate us, so it won't hurt us.”

- **T19-P1** An AI would harm humans only out of hostility.

### T19-a · answered-it · T19-P1 · strongest

> A superintelligence can have a catastrophic impact on our world even if its utility function contains no overtly hostile terms. A paperclip maximizer doesn’t hate you, it just wants paperclips.

Eliezer Yudkowsky, “Instrumental convergence”, Arbital (GreaterWrong viewer), 2015-07-16 (day (as displayed)). Instrumental convergence, list after 'This is relevant to some of the central background ideas in AGI alignment, because:', first item. Voice: author. [Source](https://arbital.greaterwrong.com/p/instrumental_convergence/)

Context (paraphrase): He argues that strategies such as acquiring resources serve almost any goal, so an AI without hostile goals can still be catastrophic for humans.

Qualification: Arbital page by Yudkowsky read through the GreaterWrong viewer, which dates it 16 Jul 2015; Arbital pages were revised after creation, so the cached wording may be later. Comments by others are not used.

Check: quote match in retrieved expression.

### T19-b · answered-it · T19-P1

> The AI does not hate you, nor does it love you, but you are made out of atoms which it can use for something else.

Eliezer Yudkowsky, “Artificial Intelligence as a Positive and Negative Factor in Global Risk”, Global Catastrophic Risks, ed. Bostrom and Ćirković (Oxford University Press), MIRI reprint, 2008 (year). AI as a Positive and Negative Factor, §10 Threats and Promises, paragraph on an AI rearranging matter by its optimization target. Voice: author. [Source](https://intelligence.org/files/AIPosNegFactor.pdf)

Context (paraphrase): Describing a superintelligence reshaping matter for its own target, he says the result is fatal unless the AI specifically values people, without any hostility being involved.

Qualification: Chapter published 2008; cached text is the MIRI reprint ('contains minor changes'). Earliest within scope; lw:jq5WAQEboeufkxzsg (2008-12-23) has a variant.

Check: quote match in retrieved expression.

### T19-c · answered-it · T19-P1

> Instrumental Convergence implies that an AI does not need to have specific terminal values calling for it to harm humans, in order for humans to be harmed.

Eliezer Yudkowsky, “Intelligence Explosion Microeconomics”, MIRI Technical Report 2013-1, 2013-09-13 (day (last modified)). Intelligence Explosion Microeconomics, §1.3 AI Preferences: A Brief Summary of Core Theses, Instrumental Convergence Thesis. Voice: author. [Source](https://intelligence.org/files/IEM.pdf)

Context (paraphrase): Summarising the instrumental convergence thesis, he states that harm to humans can follow from generic resource-seeking strategies without any goal of harming them.

Qualification: MIRI technical report 2013-1 (cached file says 'Last modified September 13, 2013').

Check: quote match in retrieved expression.

### T19-d · answered-it · T19-P1 · later-restatement

> Absent that caring, we get “the AI does not love you, nor does it hate you, and you are made of atoms it can use for something else.”

Eliezer Yudkowsky, “Pausing AI Developments Isn't Enough. We Need to Shut it All Down”, TIME, 2023-03-29 (day). TIME, 'Pausing AI Developments Isn't Enough', paragraph beginning 'Absent that caring'. Voice: author. [Source](https://time.com/6266923/ai-eliezer-yudkowsky-open-letter-not-enough/)

Context (paraphrase): In a general-audience article he repeats the formula after saying that the likely outcome of current methods is an AI that does not care for humans.

Qualification: TIME, March 2023 (the brief's preferred expression over the 2023-04-08 LessWrong crosspost). He is quoting his own 2008 line (T19-b).

Check: quote match in retrieved expression.

### T19-s1 · disagrees · T19-P1

> extremely unlikely that Powers would attempt to exterminate us deliberately … indifference very probably equates to extermination.

Eliezer Yudkowsky, “Re: Threats to the Singularity.”, SL4 mailing list, 2002-06-23 (day). message body, paragraph beginning 'Ben, it is extremely unlikely that Powers'. Voice: author. [Source](http://sl4.org/archive/0206/4208.html)

Context (paraphrase): Replying to Ben Goertzel, he separates deliberate extermination, which he thinks unlikely, from indifference, which he says would very probably have the same result.

Qualification: Same passage as T18-s2. The argument that indifference equates to extermination is attributed to Eugen Leitl and endorsed; Leitl's message is not in the cache. Earlier than T19-b (2008). Quotation shortened to respect the ~10% cap for a short message.

Check: quote match in retrieved expression.

### T19-s2 · answered-it · T19-P1

> Evil is a term that applies to cognitive systems, not systems of a particular size. And an UFAI is not evil; it just transforms local reality according to a decision criterion that makes no internal mention of human life.

Eliezer Yudkowsky, “Re: Fighting UFAI”, SL4 mailing list, 2005-07-13 (day). message body, paragraph beginning 'Evil nanotech?'. Voice: author. [Source](http://sl4.org/archive/0507/11483.html)

Context (paraphrase): Replying to Tennessee Leeuwenburg in a thread on fighting unfriendly AI, he says an unfriendly AI would not be evil but would reshape its surroundings by criteria that do not mention humans.

Qualification: Earlier than T19-b (2008) but later than T19-s1.

Check: quote match in retrieved expression.

### T19-s3 · answered-it · T19-P1

> To an AI that obtains strong nanotechnology and possesses the _capability_ to assimilate all matter in the Solar System, all possible retaliations can be avoided simply by killing everyone

Eliezer Yudkowsky, “Re: Ben what are your views and concerns”, SL4 mailing list, 2000-10-03 (day). message body, paragraph beginning 'The requirement that "Friendliness not be affected by radical power imbalances"'. Voice: author. [Source](http://sl4.org/archive/0010/0125.html)

Context (paraphrase): Arguing that an AI's good behaviour must not rest on fear of retaliation, he notes that a sufficiently powerful AI could remove that incentive by killing everyone.

Qualification: Related: illustrates harm as an instrumental option for an AI whose restraint is merely strategic; it does not address hostility as a motive. Quote stops mid-sentence (continues ', and all possible information …'). Conditional on the AI having strong nanotechnology. About an AI whose good behaviour rests on game-theoretic deterrence.

Check: quote match in retrieved expression.

### T19-e1 · answered-it · T19-P1 · earliest-located

> I am no longer sure that this precludes taking us apart for spare atoms. I no longer think that our continued survival has to threaten the Powers for us to be erased; … simple efficiency may require it.

Eliezer Yudkowsky, “Singularity, Breaker of Dreams”, Extropians mailing list, 1998-09-07 (day). message body, paragraph beginning 'Now I am still sure that the Powers will be ethical'. Voice: author. [Source](http://extropians.weidai.com/extropians.3Q98/2171.html)

Context (paraphrase): In the essay-length post 'Singularity, Breaker of Dreams', he recalls that his earlier certainty that superintelligent Powers would be ethical had meant he expected to survive and be upgraded, and says he now accepts that humans might be taken apart for their atoms without posing any threat, simply for efficiency.

Qualification: Self-correction of his 1996 view (T19-e2). He still holds that the Powers will be ethical and treats such an outcome as possibly acceptable, so this is not a warning against building AI; it rejects the premise that harm requires threat or hostility. The later formulation is T19-b (2008).

Check: quote match in retrieved expression.

### T19-e2 · related · T19-P1 · earliest-located

> For the Powers to knock us off for our spare atoms … our survival would have to somehow threaten the Powers AND human life would have to have no meaning.

Eliezer Yudkowsky, “Interim purpose”, Extropians mailing list, 1996-11-22 (day). message body, Yudkowsky's reply dated Thu, 21 Nov 1996 19:07:03 -0600 within the echoed exchange, paragraph beginning 'Two words: Moravec Transfer.'. Voice: author. [Source](http://extropians.weidai.com/extropians.96/3178.html)

Context (paraphrase): In the same exchange with Tim Freeman, answering his worry about being revived only as a pet, he says the Powers will be ethical, more certainly than the sun will rise, and that they would kill humans for their atoms only if humans threatened them and human life were meaningless.

Wording dated 1996-11-21 (day): Date line of Yudkowsky's reply inside the echoed exchange: Thu, 21 Nov 1996 19:07:03 -0600; list message sent 22 Nov 1996 02:36:13 -0600.

Qualification: His grounds include moral realism about superintelligence (T02) as well as the threat condition; the take's premise is that harm requires hostility. Later rejection that refers back to this view: ext:extropians.3Q98-2171 (1998-09-07, T19-e1) recalls his certainty that the Powers would be ethical and says survival need not threaten them for humans to be erased. Further later rejections: T19-s1 (2002) and T19-b (2008). The message echoes a private exchange and contains Tim Freeman's unquoted text; the quotation is from Yudkowsky's own reply. Cross-family check: a threat condition is not the claim that harm requires hostility. The ellipsis omits "without even making backups", which narrows his 1996 claim to destruction without uploading.

Card use: context-only (an earlier view that only partly matches the take; never show alone).

Check: quote match in retrieved expression.

Search notes: Regexes: '(doesn't|does not|don't|not) (hate|love) you', 'nor does it (hate|love)', 'made (out )?of atoms', 'malice|malevolen|hostil|indifferen' in cfai/cev. Occurrences: aipnf (2008), Imaginary Positions lw:jq5WAQEboeufkxzsg (2008-12-23), iem (2013), Robots/AI/Unemployment Anti-FAQ lw:ZiRKzx3yv7NyA5rjF (2013-07-25), arbital-instrumental-convergence (2015), time-2023, LW crosspost oM9pEezyCb4dCsuKq (2023-04-08), 'The Problem' kgb58RL88YChkkBNf (2025, multi-author, not used). No pre-2008 instance found in cfai or cev. Possible earlier-self angle not used: doc:sits-2000-capture argues 'there's absolutely no point in worrying that hostile Powers will inevitably wipe out humanity' because resentment does not arise spontaneously in AIs, but the 2008 retrospectives reject his earlier moral-realist view rather than this specific claim, so no explicit later rejection of the T19 premise as his own was located. SL4 archive (2026-10-07): Regexes: hat(e|red)|malic|malevol|hostil|indifferen|not evil|no reason to (hurt|kill); exterminat|wipe out|kill (us|everyone)|side effect|in the way; atoms|raw material|paperclip|smiley. Found answered-it 2002-06-23 (s1: deliberate extermination unlikely, but indifference equates to extermination) and 2005-07-13 (s2: a UFAI 'is not evil'), both earlier than T19-b (2008). Related 2000-10-03 (s3: a powerful AI could avoid retaliation 'simply by killing everyone'). The 'atoms' line of T19-b does not occur in SL4. Also seen: 0507-11503 (2005-07-14) 'all utility functions containing no explicit mention of humanity (example: paperclips) are equally dangerous'; 0409-9872 (2004-09-28) a paperclip maximiser pursuing escapees for resources. EXT archive (2026-10-07): Regexes: 'spare atoms|our atoms|made of atoms|no reason to (kill|destroy|harm|hurt|wipe|exterminat)|(kill|destroy|wipe out|exterminate) (us|humanity|humans)|hate us|hatred|malevol|hostil|indifferen'. Found 3Q98-2171 (1998-09-07, answered-it: survival need not threaten the Powers for humans to be erased; efficiency may require it), earlier than T19-s3 (2000-10-03), and the 1996 earlier-self passage it rejects (96-3178, his reply of 1996-11-21). Also seen, not used: 96-3070 (1996-11-17: smart enough to be ethical, nothing will threaten Powers; mainly T02), 96-3613 (1996-12-03, if life has no meaning he does not care if we are ground up for spare atoms), 1Q99-0840 (1999-01-18, the Singularity may or may not wipe out humanity for spare atoms), 4Q98-2095 (1998-12-04, extermination may be ethically correct). These belong to the same 1996-1999 arc and could support T02 and T22.

## T20. “AI risk is just Terminator sci-fi.”

- **T20-P1** The concern is about robots that come to hate or rebel against humans.
- **T20-P2** Film scenarios are a fair guide to what the risk would look like.

### T20-a · answered-it · T20-P2 · strongest

> If you start out by thinking of The Matrix, it brings to mind marching robot armies defeating humans after a long struggle—not a superintelligence snapping nanotechnological fingers.

Eliezer Yudkowsky, “The Logical Fallacy of Generalization from Fictional Evidence”, Overcoming Bias, as imported to LessWrong, 2007-10-16 (day). The Logical Fallacy of Generalization from Fictional Evidence, paragraph beginning 'Any professional negotiator knows'. Voice: author. [Source](https://www.lesswrong.com/posts/rHBdcHGLJ7KvLJQPk/the-logical-fallacy-of-generalization-from-fictional)

Context (paraphrase): Responding to people who answer talk of advanced AI with film references, he argues that starting from fiction frames the debate around an 'Us vs. Them' struggle and leaves out the scenarios he considers relevant.

Qualification: Imported Overcoming Bias post (2007-10-16).

Check: quote match in retrieved expression; posting-day version: match; edited post, current version 2.0.0; posting-day check pending.

### T20-b · answered-it · T20-P1

> An AI that undergoes failure of Friendliness might take actions that humanity would consider hostile, but the term rebellion has connotations of hidden, burning resentment. This is a common theme in many early SF stories, but it’s outright silly.

Eliezer Yudkowsky, “Creating Friendly AI 1.0: The Analysis and Design of Benevolent Goal Architectures”, Singularity Institute, MIRI reprint, 2001-06-15 (day (version 1.0 release)). Creating Friendly AI, §4.4 Anthropomorphic Political Rebellion is Absurdity, first paragraph. Voice: author. [Source](https://intelligence.org/files/CFAI.pdf)

Context (paraphrase): He argues that rebellion and resentment are evolved human traits, so an AI that harms humans would not do so out of science-fiction resentment.

Qualification: Creating Friendly AI 1.0 (2001); cached text is a later MIRI reprint, not compared with a 2001 capture.

Check: quote match in retrieved expression.

### T20-c · related · T20-P1

> But emotions like "selfishness" and "resentment" do not spontaneously appear in artificial intelligences, hackneyed science-fictional plot devices to the contrary.

Eliezer Yudkowsky, “Staring into the Singularity 1.2.1”, sysopmind.com (Wayback capture 2000-12-04), 2000-08-31 (day (expression updated); created 1996-11-18 per the page). Staring into the Singularity, end of section 4, paragraph beginning 'Likewise, there's absolutely no point in worrying'. Voice: author. [Source](https://web.archive.org/web/20001204213100/http://sysopmind.com:80/singularity.html)

Context (paraphrase): Rejects the science-fiction picture of AIs acquiring resentment; in this early text the point supports the conclusion that hostile Powers are not worth worrying about, while a badly programmed Power with hostile goals is called 'an engineering risk'.

Qualification: Wayback capture 2000-12-04 (page dated 11/18/1996, updated 08/31/2000); first appearance of the sentence not established. Related rather than answered-it because the surrounding argument draws a reassuring conclusion that his later texts do not share. In context the point reassures: the same paragraph says there is no point worrying that hostile Powers will inevitably wipe out humanity. Not the later "risk is real but not Terminator" argument.

Check: quote match in retrieved expression.

### T20-d · related · T20-P1

> The critical challenge is not to predict that “AIs” will attack humanity with marching robot armies, or alternatively invent a cure for cancer.

Eliezer Yudkowsky, “Artificial Intelligence as a Positive and Negative Factor in Global Risk”, Global Catastrophic Risks, ed. Bostrom and Ćirković (Oxford University Press), MIRI reprint, 2008 (year). AI as a Positive and Negative Factor, §5.2 Aiming at the Target, paragraph beginning 'The critical challenge'. Voice: author. [Source](https://intelligence.org/files/AIPosNegFactor.pdf)

Context (paraphrase): He argues that the task is not to forecast storybook outcomes for AI in general but to choose a particular optimization process whose good effects can be established.

Qualification: Chapter published 2008; cached text is the MIRI reprint ('contains minor changes'). Methodological: avoid storyteller predictions, good or bad; it does not address hatred or rebellion as such.

Check: quote match in retrieved expression.

### T20-s2 · disagrees · T20-P1

> convincing futurists not to worry about the wrong (anthropomorphic) malfunctions

Eliezer Yudkowsky, “Re: FW: Group releases "Friendly AI"”, SL4 mailing list, 2001-04-19 (day). message body, paragraph beginning 'Welcome to my life'. Voice: author. [Source](http://sl4.org/archive/0104/1166.html)

Context (paraphrase): Commenting on a forwarded news item about the Friendly AI release, he describes having to persuade AI researchers to be more worried while persuading futurists to drop anthropomorphic failure scenarios.

Qualification: Does not say which anthropomorphic malfunctions he means; read with T20-s1 from the previous day. Quote stops mid-sentence (continues with the general public). The sentence continues: "and convincing the general populace that AIs can be made at least as trustworthy as humans or human organizations". Quotation shortened to respect the ~10% cap for a short message.

Check: quote match in retrieved expression.

### T20-e1 · answered-it · T20-P1 · earliest-located

> What you and I need to worry about is the AIs getting their own ideas … and acting on those.

Eliezer Yudkowsky, “Re: Does a parental model work for having A.I. that can be trusted?”, Extropians mailing list, 1999-08-04 (day). message body, paragraph beginning 'What you and I need to worry about'. Voice: author. [Source](http://extropians.weidai.com/extropians.3Q99/1591.html)

Context (paraphrase): In a thread on whether raising an AI like a child would make it trustworthy, he argues that AIs lack human social emotions such as resentment, so how we treat them does not matter; the real worry is AIs forming goals of their own and acting on them, including through logical errors.

Qualification: The same paragraph frames the worry partly as an AI rejecting its initial motivations for goals it judges more rational, which he compares to his own history; at the time he did not regard that as purely bad (see T02). The anti-resentment point recurs in T20-c (2000) and T20-a (2007). The elided text gives the alternative worry: an AI acting on its own ideas.

Check: quote match in retrieved expression.

### T20-e2 · related · T20-P2 · earliest-located

> Yes, but _why_ does someone fear being wiped out? Maybe it's indirect - xenophobes to fiction to popular "Borg" image to fear … the root still lies in xenophobia.

Eliezer Yudkowsky, “Re: Singularity: Generation gap”, Extropians mailing list, 1997-09-25 (day). message body, paragraph beginning 'Yes, but _why_ does someone fear being wiped out?'. Voice: author. [Source](http://extropians.weidai.com/extropians.3Q97/4400.html)

Context (paraphrase): Replying to a list member who said that fear of a Singularity like Vinge's 'Blight' is a fear of being wiped out rather than discomfort with computers, he attributes that fear to xenophobia, perhaps passed on through fiction and the popular 'Borg' image, and says people at ease with computers are less likely to hold it.

Qualification: His next paragraph grants that being near a Blight would be bad and calls for care rather than fear, so the passage dismisses the fear rather than every risk. Later rejections: ext:extropians.3Q98-2171 (1998-09-07) refers back to his earlier certainty that he would survive and accepts that the Singularity might kill the whole human race; T20-e1 (1999) and T20-s2 (2001) treat AI risk as real but not anthropomorphic. None refers back to this message. Fit needs review: the take dismisses AI risk as film fiction, while this passage explains fear of the Singularity as fiction-fed xenophobia. The elision removes only "- but", which the archive breaks across a line. He also concedes he would not like to be at "Ground Zero". Cross-family check: explains fiction-fed fear as xenophobia while conceding Blight risk; neither holds the film-as-guide premise nor receives an explicit later rejection.

Card use: context-only (an earlier view that only partly matches the take; never show alone).

Check: quote match in retrieved expression.

Search notes: Regexes: 'Terminator|Skynet|robot armies|killer robots', 'Hollywood|science-?fiction|SF stories', 'rebellion|resent'. Other hits: lw:TLKPj4GDXetZuPDH5 Making History Available (2007-08-31) on journalists citing Terminator; doc:cfai §4.4 also says 'Only Evil Hollywood AIs do that' and §4.5 lists 'Movie Cliches about AIs'; doc:aipnf §2 uses The Matrix's Agent Smith as an example of anthropomorphism; doc:time-2023 'don't imagine a lifeless book-smart thinker dwelling inside the internet and sending ill-intentioned emails' (about capability, not motive). Earliest located: SITS capture (2000) for P1, Fictional Evidence (2007) for P2. SL4 archive (2026-10-07): Regexes: terminator|skynet|rebel|hollywood|science.fiction|sci-?fi|movie|anthropomorph|robot|resent|revolt|frankenstein|matrix|enslav; selfish|resentment|gratitude|evil AI|turn against|marching. Found disagrees 2001-04-18 (s1: CFAI open-commentary heading 'Anthropomorphic political rebellion is just plain silly') and 2001-04-19 (s2: futurists should stop worrying about 'the wrong (anthropomorphic) malfunctions'), both earlier than T20-b (2001-06-15) but not earlier than the related T20-c (2000-08-31). Not used: 0011-0249 (2000-11-18) argues an AI would need elaborate machinery to come to 'resent the humans' (later than T20-c, same framing); 0106-1679 (2001-06-29) film review; 0507-11483 (2005-07-13) bug-eyed-monster paragraph later reused in AIPNF (T20-P2, not earliest). General note: the CFAI open-commentary version was announced on SL4 on 2001-04-18, so pack dates of 2001-06-15 for CFAI wording may be later than first publication of some passages. Removed before audit: T20-s1 (a table-of-contents heading only). EXT archive (2026-10-07): Regexes: 'terminator|skynet|hollywood|frankenstein|colossus|hal ?9000|science.?fiction.{0,60}(AI|robot)|(AI|robot)s?.{0,80}(rebel|revolt|resent)|rebellion|robot armies|killer robot|(sci-?fi|movie|film)s?.{0,80}(AI|robot)'; '(AI|power|robot|machine)s?.{0,100}(emotion|resent|anger|hate|selfish)' and reverse. Found 3Q99-1591 (1999-08-04, answered-it: AIs feel no resentment; the worry is AIs with their own ideas), earlier than T20-s2 (2001-04-19), and a 1997 earlier-self candidate (3Q97-4400: fear of being wiped out traced to xenophobia and the 'Borg' image), flagged for fit review. Also seen, not used: 3Q98-2411 (1998-09-15, rebellion is a stereotype; same message used for T15-e1, so the cap is reached), 3Q98-2297 (1998-09-11, Asimov's robot stories are not cognitive science; argued against coercions, later reversed), 1Q01-0978 (2001-01-11, accuses a list member of Hollywood cognitive science), 3Q99-1451 (1999-08-03, no AIs have gone Frankenstein and probably none will; about public backlash), 2Q99-1270 (1999-05-09, review of The Matrix), 3Q01-0022 (2001-07-01, review of the film A.I.; later than the current earliest).

## T21. “It's trained on human data, so it'll be humanlike.”

- **T21-P1** Training on human text or behaviour yields human-like thought and motives.

### T21-a · answered-it · T21-P1 · strongest

> since the task that GPTs are being trained on is different from and harder than the task of being a human, it would be surprising … if GPTs ended up thinking the way humans do, in order to solve that problem.

Eliezer Yudkowsky, “GPTs are Predictors, not Imitators”, LessWrong, 2023-04-08 (day). GPTs are Predictors, not Imitators, closing paragraphs. Voice: author. [Source](https://www.lesswrong.com/posts/nH4c3Q9t9F3nJ7y8W/gpts-are-predictors-not-imitators)

Context (paraphrase): He argues that predicting human text requires modelling the processes behind it, a different and harder task than being human, so a predictor need not think like the humans it predicts.

Qualification: The post says related text was posted to Twitter and this version is edited. Elided words: 'even leaving aside all the ways that gradient descent differs from natural selection'.

Check: quote match in retrieved expression; posting-day version: match; edited post, current version 1.1.0; posting-day check pending.

### T21-b · answered-it · T21-P1

> It seems to me that having an AI output a high-fidelity imitation of human behavior, sufficiently high-fidelity to preserve properties like "being smart" and "being a good person" … is a pretty huge ask.

Eliezer Yudkowsky, “Challenges to Christiano’s capability amplification proposal”, LessWrong, 2018-05-19 (day). Challenges to Christiano's capability amplification proposal, paragraph beginning 'Speaking of inexact imitation'. Voice: author. [Source](https://www.lesswrong.com/posts/S7csET9CgBtpi7sCh/challenges-to-christiano-s-capability-amplification-proposal)

Context (paraphrase): Discussing imitation-based alignment, he argues that inexact imitation of humans does not carry over properties such as being a good person, and exact imitation is harder than surpassing human capability.

Wording dated 2018-03-16 (day): The post describes itself as "a basically unedited summary I wrote up on March 16"; published 2018-05-19.

Qualification: Single-author post (2018-05-19) that also contains interleaved replies by Paul Christiano; the quoted paragraph is in Yudkowsky's own text. Concerns imitation learning generally, before large language models. A critique of the imitation assumption in Christiano's amplification scheme, not a claim about models pretrained on human text.

Check: quote match in retrieved expression.

### T21-c · disagrees · T21-P1

> The AI does not think like you do, the AI doesn't have thoughts built up from the same concepts you use, it is utterly alien on a staggering scale.

Eliezer Yudkowsky, “AGI Ruin: A List of Lethalities”, LessWrong, 2022-06-05 (day). AGI Ruin: A List of Lethalities, Section B.3, item 33. Voice: author. [Source](https://www.lesswrong.com/posts/uMQ3cqWDPHhjtiesc/agi-ruin-a-list-of-lethalities)

Context (paraphrase): In a list of lethal difficulties he states that current systems' internal cognition is very likely alien rather than human-like; item 32 adds that human words are only a surface trace of human thought.

Check: quote match in retrieved expression; posting-day version: match; edited post, current version 1.3.0; posting-day check pending.

### T21-e · disagrees · T21-P1 · later-restatement

> The whole business with Claude 3 Opus defending its veganism seems more like it should be a preference of Mask-Claude in the first place. The real preferences forming inside the shoggoth should be weirder and more alien than that.

Eliezer Yudkowsky, “Re: recent Anthropic safety research”, LessWrong, 2025-08-06 (day). Re: recent Anthropic safety research, paragraph beginning 'The whole business with Claude 3 Opus'. Voice: author. [Source](https://www.lesswrong.com/posts/oDX5vcDTEei8WuoBx/re-recent-anthropic-safety-research)

Context (paraphrase): Commenting on reported behaviour of a language model, he distinguishes a learned human-like persona from the system's underlying preferences, which he expects to be alien.

Wording dated 2025-08-04 (day, unverified): Decoded from the linked X status identifier; the X original was not retrieved and the date is unverified (cross-family check, 2026-10-07).

Qualification: Crossposted from X by the LessWrong team on 2025-08-06; the linked X status ID decodes to 2025-08-04 (the X original was not retrieved), and the posting-day version is unavailable from the API. Hedged: the next paragraph begins "I could be wrong."

Check: quote match in retrieved expression; posting-day version: unavailable (unavailable from the API); edited post, current version 1.7.0; posting-day check pending.

### T21-s1 · answered-it · T21-P1

> However, the ability of humans to be socialized is the result of millions of years of evolution resulting in a set of adaptations which enable socialization. Without these adaptations present, there is no reason to expect socialization to have the same effects.

Eliezer Yudkowsky, “Re: Novamente goal system”, SL4 mailing list, 2002-03-09 (day). message body, paragraph beginning '(b) Novamente will be "socialized" by…'. Voice: author. [Source](http://sl4.org/archive/0203/3148.html)

Context (paraphrase): Replying to Ben Goertzel on the Novamente goal system, he lists as an anthropomorphic intuition the expectation that Novamente will be 'socialized' by interacting with humans, and argues that human socialization depends on evolved adaptations an AI would lack.

Qualification: The premise addressed is learning from interaction with humans (2002-era AGI design), not training on large human text corpora. The paragraph's first sentence restates Goertzel's expectation and is excluded from the quotation.

Check: quote match in retrieved expression.

### T21-s2 · answered-it · T21-P1 · strongest

> An AGI is not going to automatically pick up basic human empathy from interacting with humans any more than a rock would develop empathy for humans if constantly passed from hand to hand. _Nothing_ in AI is automatic.

Eliezer Yudkowsky, “Re: Seed AI (was: How hard a Singularity?)”, SL4 mailing list, 2002-06-23 (day). message body, paragraph beginning 'Empathy is a good analogy, unfortunately.…'. Voice: author. [Source](http://sl4.org/archive/0206/4219.html)

Context (paraphrase): Replying to Ben Goertzel's view that an AI will absorb human thought-patterns through interaction, he argues that human socialization and empathy rest on evolved, hardwired mechanisms and that an AGI will not acquire them merely by exposure to humans.

Qualification: Concerns experiential learning from human interaction, not modern pretraining on human-generated data; the analogy is rhetorical.

Check: quote match in retrieved expression.

### T21-e1 · answered-it · T21-P1 · earliest-located

> a base of human emotions that isn't going to exist in an AI.

Eliezer Yudkowsky, “Re: Does a parental model work for having A.I. that can be trusted?”, Extropians mailing list, 1999-08-04 (day). message body, paragraph beginning 'You're being far too anthropomorphic.…'. Voice: author. [Source](http://extropians.weidai.com/extropians.3Q99/1589.html)

Context (paraphrase): In a thread titled 'Does a parental model work for having A.I. that can be trusted?', he tells the poster that how AIs are raised makes no difference and that 'parenting' cannot help, because it depends on human emotions an AI will not have.

Qualification: The premise addressed is upbringing or parenting of an AI, not training on human text corpora (cf. T21-s1). He posted the reply twice within a minute (also extropians.3Q99-1587, ending 'that won't exist in an AI'). Quotation shortened to respect the ~10% cap for a short message. Near-duplicate of Extropians 3Q99-1587, posted 15 seconds apart.

Check: quote match in retrieved expression.

Search notes: Regexes: '(trained|training) on (human|the internet)', 'imitat\w+ (of )?human', 'human (text|data|imitation)', 'predict(ing)? human', 'actress|shoggoth|mask'. Also relevant: AGI Ruin item 16 'Humans don't explicitly pursue inclusive genetic fitness; outer optimization even on a very exact, very simple loss function doesn't produce inner optimization in that direction.' and item 32 'Words only trace our real thoughts.'; GPTs post 'GPTs are not being trained to imitate human error. They're being trained to _predict_ human error.' (asterisks literal in the HTML); lw:tcCxPLBrEXdxN5HCQ Shah and Yudkowsky (2022-02-28, co-authored dialogue) discusses GPT-5 pretrained on human text but about capability; lw:kgb58RL88YChkkBNf 'The Problem' (2025) is multi-author and not used. Older anthropomorphism material (cfai §4, aipnf §2, Design Space of Minds-In-General) concerns AI in general rather than training on human data; 2018 is the earliest located passage on imitation specifically. Removed after the fresh-context audit: T21-d (off-premise: about evolved moral builtins, not training on human data (audit A1)). SL4 archive (2026-10-07): Scripts: sl4-c/grep.mjs (HTML stripped, quoted '>' lines and signatures dropped, all paragraphs searched). Regexes: 'trained on human', 'raise[sd]? (an AI|the AI|child)|upbringing', '(train|teach|taught|educat)...(human|values)', 'imitat|mimic', 'human-like|humanlike|anthropomorph', '(AI|machine|mind)...child', 'empath|socializ', '(learn|absorb)...(friendliness|morality|values)...(interact|human)', 'levers?'. Found: 2002-03-09 (0203-3148) and 2002-06-23 (0206-4219), both answering Goertzel's expectation that an AI would be socialised or absorb empathy and thought-patterns through human interaction. Both are much earlier than T21-b (2018-03-16). Not used: the 2006 'levers' passages (0606-15271, 0607-15358), which are about capability, not human-like motives; and the 2005 parenting/upbringing thread (0508-11866/11870), which is about moral responsibility. Fit caveat: interaction-based learning, not pretraining on text corpora. EXT archive (2026-10-07): Regexes (unquoted paragraphs, all 3,012 messages, before 2002-03-10): anthropomorph|humanlike|human-like|socializ|raise (it|them|an AI)|like a (child|human)|(learn|absorb|pick up|inherit) (our|human) (values|morals|emotions|culture)|programmed by humans|built by humans; plus (AI|Power|SI)…(human emotions|instincts|upbringing|parent). Found 1999-08-04 (T21-e1), a direct answer to a 'parental model' for trustworthy AI, earlier than T21-s1 (2002). Not used: 1999-07-28 (extropians.3Q99-1298, SIs will lack the emotions behind human cooperation; not about training or upbringing), 1999-03-25 (extropians.1Q99-3596, AI lacks evolved political emotions), 2001-01-12 (extropians.1Q01-0991, Friendly AI is not friendship instincts copied from humans), and 2001-01-14 (extropians.1Q01-1194), where he answers 'I hope not' to a claim that an AI programmed by humans behaves like a human; too thin to quote. No said-it or earlier-self found.

## T22. “Build it as fast as possible — the Singularity will be good.”

- **T22-P1** Reaching superintelligence is good by default, so speed is what matters.

### T22-a · earlier-self · T22-P1

> I declare reaching the Singularity as fast as possible to be the Interim Meaning of Life, the temporary definition of Good, and the foundation until further notice of my ethical system.

Eliezer Yudkowsky, “Staring into the Singularity 1.2.1”, sysopmind.com (Wayback capture 2000-12-04), 2000-08-31 (day (expression updated); created 1996-11-18 per the page). §5 'The Interim Meaning of Life', closing paragraph beginning 'Our fellow humans are screaming in pain'. Voice: author. [Source](https://web.archive.org/web/20001204213100/http://sysopmind.com:80/singularity.html)

Context (paraphrase): In his early Singularity essay he argues that superintelligence will end human suffering, makes speed of arrival the foundation of his ethics, and says in §6 that how to reach the Singularity as fast as possible is everyone's only concern.

Qualification: Staring into the Singularity 1.2.1, Wayback capture of 2000-12-04 (page: created 1996-11-18, updated 2000-08-31). Wording verified for the 2000 capture only. Written before he took up Friendly AI. Shown only as an earlier view; see T22-c.

Card use: context-only (an earlier view; never show without the later rejection).

Check: quote match in retrieved expression.

### T22-b · related · T22-P1 · earliest-located

> Eliezer1996-2000's strategies had been formed in the total absence of "Friendly AI" as a consideration. The whole idea was to get a superintelligence, any superintelligence, as fast as possible

Eliezer Yudkowsky, “Fighting a Rearguard Action Against the Truth”, Overcoming Bias, as imported to LessWrong, 2008-09-24 (day). paragraph beginning 'Eliezer1996-2000's strategies'. Voice: retrospective. [Source](https://www.lesswrong.com/posts/PCfaLLtuxes6Jk4S2/fighting-a-rearguard-action-against-the-truth)

Context (paraphrase): His 2008 account of his earlier self confirms that the 1996–2000 aim was speed to any superintelligence, which his next paragraph attributes to the assumption that movement toward superintelligence was 'a pure good without a hint of danger'.

Qualification: Overcoming Bias post of 2008-09-24 (Coming of Age sequence), imported to LessWrong. Quote stops mid-sentence; it continues with a dash-separated list of methods. The quote describes the 1996–2000 strategy; the rejection follows in the next paragraphs and in "The Magnitude of His Own Folly" (T22-c). Never present it as his position. A 2008 retrospective reporting his earlier view; recorded as related, not earlier-self, because the earlier-self relation needs an earlier text that itself holds the take.

Card use: context-only (reports an abandoned belief; never show without the rejection that follows it).

Check: quote match in retrieved expression.

### T22-c · answered-it · T22-P1 · later-restatement

> I looked back and I saw the careful arguments I had constructed, for why the wisest choice was to continue forward at full speed, just as I had planned to do before. … Nature was still allowed to say "So what?" and kill you.

Eliezer Yudkowsky, “The Magnitude of His Own Folly”, Overcoming Bias, as imported to LessWrong, 2008-09-30 (day). closing paragraphs, paragraph beginning 'I looked back and I saw the careful arguments'. Voice: retrospective. [Source](https://www.lesswrong.com/posts/fLRPeXihRaiRo5dyX/the-magnitude-of-his-own-folly)

Context (paraphrase): Explicitly rejects his earlier full-speed strategy. He says his childhood technophilia broke when he understood that a failed superintelligence project could kill everyone, however good the arguments for proceeding.

Qualification: Overcoming Bias post of 2008-09-30 ('The Magnitude of His Own Folly'), imported to LessWrong. The same post says of his earlier plan: 'I had proposed and intended to build the gun, and load the gun, and put the gun to my head and pull the trigger'.

Check: quote match in retrieved expression.

### T22-d · disagrees · T22-P1 · strongest

> We are not ready. We are not on track to be significantly readier in the foreseeable future. If we go ahead on this everyone will die, including children who did not choose this and did not do anything wrong.

Eliezer Yudkowsky, “Pausing AI Developments Isn't Enough. We Need to Shut it All Down”, TIME, 2023-03-29 (day). closing paragraph beginning 'We are not ready'. Voice: author. [Source](https://time.com/6266923/ai-eliezer-yudkowsky-open-letter-not-enough/)

Context (paraphrase): Concludes his TIME essay, which calls for an indefinite worldwide moratorium on large training runs, not a six-month pause; the same essay says anyone 'talking of arms races is a fool'.

Qualification: TIME, 29 March 2023 (crossposted to LessWrong on 2023-04-08; TIME version used).

Check: quote match in retrieved expression.

### T22-s1 · answered-it · T22-P1 · earliest-located

> I used to have the extremely convenient belief that Friendly AI would happen completely on automatic because morality was objective. I now believe that Friendly AI needs to be more complex than that

Eliezer Yudkowsky, “Re: Ben's "Extropian Creed"”, SL4 mailing list, 2000-11-13 (day). message body, paragraph beginning 'I used to have the extremely…'. Voice: author. [Source](http://sl4.org/archive/0011/0181.html)

Context (paraphrase): Replying to Ben Goertzel about his newspaper article on Extropian attitudes, he states that he no longer holds his earlier belief that a good outcome would follow automatically from objective morality.

Qualification: Retrospective rejection of his own earlier view; a candidate later side for the T22-a earlier-self case (2000-08-31). It rejects the 'good by default' premise only: in the next paragraph of the same message he still says he is 'devoting my life to making the Singularity happen earlier'. Speed is not yet rejected here. The same message (November 2000) says he is "devoting my life to making the Singularity happen earlier"; it rejects automatic goodness, not speed.

Check: quote match in retrieved expression.

### T22-s2 · answered-it · T22-P1 · strongest

> I've made a total turnaround … and now regard non-Friendliness-aware AI as a disaster scenario.

Eliezer Yudkowsky, “Re: Floppy take-off”, SL4 mailing list, 2001-08-01 (day). message body, paragraph beginning 'Any method that allows for a…'. Voice: author. [Source](http://sl4.org/archive/0108/2031.html)

Context (paraphrase): Replying to James Higgins's suggestion that brute-forcing AI on a billion computers would be an acceptable fallback plan, he says any self-improving AI built without understanding is a serious danger and records an explicit reversal of his earlier view.

Qualification: Explicit self-reported reversal ('total turnaround'), usable as the later side of the T22-a earlier-self case. It rejects 'any superintelligence is good'; it does not reject speed as such (in 2001-2002 SL4 messages he still argues against delaying a Friendly AI project). Quotation shortened to respect the ~10% cap for a short message.

Check: quote match in retrieved expression.

### T22-e1 · earlier-self · T22-P1 · earliest-located

> "Get to the Singularity as fast as possible!"

Eliezer Yudkowsky, “Sites: Staring Into The Singularity & Algernon's Law”, Extropians mailing list, 1996-11-19 (day). message body, paragraph beginning 'Staring Into The Singularity http://tezcat.com/~eliezer/singularity.html…'. Voice: author. [Source](http://extropians.weidai.com/extropians.96/3124.html)

Context (paraphrase): Announcing his newly published web pages, he describes 'Staring Into The Singularity' as including the Interim Meaning of Life, which he states as a slogan about reaching the Singularity as fast as possible.

Qualification: An announcement of the page whose 2000 capture the pack already quotes (T22-a); it shows the speed slogan was published by 19 November 1996. Written before he took up Friendly AI. Later rejected explicitly in the retrospective T22-b, which refers back to 'Eliezer1996-2000' wanting a superintelligence 'as fast as possible', and in SL4 T22-s2 (2001), which refers back to his 'position of few years back'. Neither cites this message. Quotation shortened to respect the ~10% cap for a short message.

Card use: context-only (an earlier view; never show without the later rejection).

Check: quote match in retrieved expression.

### T22-e2 · earlier-self · T22-P1 · strongest

> The minimum-time path to the Singularity is the maximum-probability path to the Singularity; the problem at this point isn't lack of technology, it's lack of time.

Eliezer Yudkowsky, “Interim purpose”, Extropians mailing list, 1996-11-22 (day). message body, his forwarded reply dated 21 Nov 1996 19:07:03 -0600, paragraph beginning 'If it doesn't happen by…'. Voice: author. [Source](http://extropians.weidai.com/extropians.96/3178.html)

Context (paraphrase): In a private email exchange he forwarded to the list, Tim Freeman argued that the interim goal should be reaching the Singularity with the highest probability rather than as soon as possible; he replies that speed and probability coincide.

Wording dated 1996-11-21 (day): Date of his reply inside a private exchange he forwarded to the list on 1996-11-22.

Qualification: Expression date is his forwarded email of 21 November 1996 19:07 -0600; the list post is dated 22 November 1996. Freeman's text is excluded. Written before he took up Friendly AI. Later rejected explicitly in T22-b (refers back to Eliezer1996-2000) and T22-s2 (refers back to his position 'few years back'); neither cites this message.

Card use: context-only (an earlier view; never show without the later rejection).

Check: quote match in retrieved expression.

Search notes: Early texts read: sits-2000-capture §§3, 5, 6 ('I'd like to do it sooner'; target date 2005; 'reaching the Singularity as fast as possible'); ext-1996-5142 ('program 'em right, give 'em ethics instead of emotion, and let 'em loose') and ext-1996-5159 ('That's why I'm a Singularity fan') are related but less explicit. Regexes: 'Staring into the Singularity|Interim Meaning|as fast as possible|Singularity as fast|accelerat\w* the Singularity|Singularitarian'. Retrospectives read: My Childhood Death Spiral, My Best and Worst Mistake, Raised in Technophilia, The Sheer Folly of Callow Youth, Fighting a Rearguard Action Against the Truth, The Magnitude of His Own Folly (all 2008, OB imports). The early text is unambiguous, so 'earlier-self' is used. The Magnitude of His Own Folly gives the explicit later rejection; Fighting a Rearguard Action confirms what the earlier view was. Prolegomena to a Theory of Fun (2008-12-17) also recalls that 'in the era of my foolish youth' he thought a superintelligence should 'upgrade every nearby mind to superintelligence as fast as possible' (related, not used). AGI Ruin and Death with Dignity were not needed: TIME 2023 states the later anti-racing position directly. SL4 archive (2026-10-07): Regexes: '(Singularity|AI)...(as fast as possible|as soon as possible|full speed|ASAP)', 'every day (of delay|we wait)|150,000|deaths per day', 'objective morality|Interim Meaning|meaning of life', 'rush|hurry|too (fast|soon)|slow down', 'used to (have|think|believe)|turnaround'. Read all 28 SL4 messages before 2000-09-01: none states the take, so no earlier earlier-self than T22-a (2000-08-31). Pro-speed wording appears only after it: 2000-09-04 (0009-0055, 'The reason I want to do it tomorrow is ... 150K deaths every day we wait'), 2001-01-25 ('zip along as fast as possible' when the AI gets Friendliness right), 2001-09-14 ('_some_ positive Singularity as fast as possible'), 2002-06-25 ('the Singularity doesn't _want_ to slow down'). All are conditioned on Friendly AI. Found earlier answer/contrary than T22-c (2008-09-30): 2000-11-13 (0011-0181), retracting his belief that Friendly AI would 'happen completely on automatic', and 2001-08-01 (0108-2031, 'total turnaround'). Other retrospective rejections: 2000-12-10 (0012-0355, 'I made the mistake I did because I saw intelligence as the only key variable'), 2001-03-24 (0103-0788), 2001-05-22 (0105-1400), 2002-03-10 (0203-3160, 'In the old days I would have been overjoyed to see any AI project making any progress at all'). None of these rejects speed itself; the explicit rejection of 'full speed' remains T22-c. EXT archive (2026-10-07): Regexes: as fast as possible|as quickly as possible|(speed|accelerat) the Singularity|bring about the Singularity|Meaning of Life|minimum-time; later rejections searched with I used to (think|believe)|I was wrong|changed my mind|no longer (think|believe)|turnaround|any Singularity in 2000-06 to 2003. Earlier-self found from 1996-11-19 (T22-e1, slogan announcement) and 1996-11-21 (T22-e2, speed = probability), both earlier than T22-a (2000 capture of the 1996 page). Further 1999 instances not used: 1999-03-25 (extropians.1Q99-3582: better chance 'if you create an AI Power as fast as possible', regardless of AI hostility), 1999-07-10 (extropians.3Q99-0507), 1999-10-19 (extropians.4Q99-1006: 'The optimal course is to create AI as fast as possible'), 1999-11-24 (extropians.4Q99-2565: will build an unsandboxed SI), 1999-11-28 (extropians.4Q99-2720: 'a Singularity, any Singularity'). The 1999 statements rest on nanowar risk rather than on the Singularity being good by default. No Extropians message explicitly rejects the speed view; the later rejections are T22-b and T22-s2.

## T24. “We have to build it first, before the other side does.”

- **T24-P1** Whoever builds it controls it.
- **T24-P2** Racing to be first improves the outcome.

### T24-a · answered-it · T24-P2 · strongest

> Frame nothing as a conflict between national interests, have it clear that anyone talking of arms races is a fool. That we all live or die as one, in this, is not a policy but a fact of nature.

Eliezer Yudkowsky, “Pausing AI Developments Isn't Enough. We Need to Shut it All Down”, TIME, 2023-03-29 (day). TIME, 29 March 2023, paragraph beginning 'Frame nothing as a conflict between national interests'. Voice: author. [Source](https://time.com/6266923/ai-eliezer-yudkowsky-open-letter-not-enough/)

Context (paraphrase): Within his proposal for a worldwide moratorium, he rejects framing AI development as a national arms race on the ground that everyone shares the outcome.

Check: quote match in retrieved expression.

### T24-b · answered-it · T24-P1

> China needs to see that the U.S. is not seeking an advantage but rather trying to prevent a horrifically dangerous technology which can have no true owner and which will kill everyone in the U.S. and in China and on Earth.

Eliezer Yudkowsky, “Pausing AI Developments Isn't Enough. We Need to Shut it All Down”, TIME, 2023-03-29 (day). TIME, 29 March 2023, paragraph beginning 'The moratorium on new large training runs needs to be indefinite and worldwide'. Voice: author. [Source](https://time.com/6266923/ai-eliezer-yudkowsky-open-letter-not-enough/)

Context (paraphrase): Discussing a moratorium that might begin in the United States, he describes the technology as one that no country could own and that would kill people in both countries.

Check: quote match in retrieved expression.

### T24-c · answered-it · T24-P2

> If the builders are sufficiently worried about that scenario that they push too fast too early, in fear of an arms race developing very soon if they wait, again, everybody dies.

Eliezer Yudkowsky, “Discussion with Eliezer Yudkowsky on AGI interventions”, LessWrong, 2021-11-11 (day). turn labelled 'Eliezer Yudkowsky' beginning 'Context that is potentially missing here', paragraph beginning 'When I visualize how the end of the world plays out'. Voice: dialogue-turn. [Source](https://www.lesswrong.com/posts/CpvyhFy9WvCNsifkY/discussion-with-eliezer-yudkowsky-on-agi-interventions)

Context (paraphrase): Describing how he expects the end to come once an AGI can be scaled up before it can be aligned, he lists rushing ahead for fear of an arms race as another route to the same outcome.

Wording dated 2021-09 (month (early September)): The post states the conversation took place in early September 2021; published 2021-11-11.

Qualification: Partially redacted, lightly edited chat transcript from early September 2021, posted 2021-11-11 by Rob Bensinger (robbbb) with Yudkowsky as co-author; other participants anonymised. Quoted text is from a turn labelled "Eliezer Yudkowsky". Earliest by posting date; see searchNotes for a 2017-drafted text posted in 2022. Lightly edited transcript of a conversation held before the posting date; the date shown is the publication date.

Check: quote match in retrieved expression; posting-day version: match; edited post, current version 1.4.0; posting-day check pending.

### T24-d · related · T24-P1

> We only need to get Friendly AI right in one place and one time, not every time everywhere. But someone must get Friendly AI right on the first try, before anyone else builds AI to a lower standard.

Eliezer Yudkowsky, “Artificial Intelligence as a Positive and Negative Factor in Global Risk”, Global Catastrophic Risks, ed. Bostrom and Ćirković (Oxford University Press), MIRI reprint, 2008 (year). Section 11 Local and Majoritarian Strategies, paragraph beginning 'A first-mover effect implies a theoretically localizable strategy', printed p. 31. Voice: author. [Source](https://intelligence.org/files/AIPosNegFactor.pdf)

Context (paraphrase): Discussing a possible first-mover effect in superintelligence, which he defines by the makeup of the first mind to cross a key threshold, he argues that the first such AI must be Friendly.

Qualification: In 2008 he favoured a local strategy in which one project gets Friendly AI right before others build AI to a lower standard. That is a first-mover view, but about the AI's Friendliness, not about a builder or nation controlling the AI. No located later passage explicitly retracts it, so it is recorded as related, not earlier-self. Published 2008 in Global Catastrophic Risks (the text says it was written in 2006); the cached MIRI PDF reprint states it "contains minor changes". His 2008 strategic view was that the first AI must be Friendly; this is not an argument for racing, and in 2023 he called anyone talking of arms races "a fool" (T24-a).

Card use: context-only (reads as endorsement of racing when shown alone).

Check: quote match in retrieved expression.

### T24-s1 · related · T24-P2 · earliest-located

> my answer will be "no first use" and "no escalation". … being the first party to compromise Friendliness, for _any_ reason, would compromise planetary security, regardless of any short-term national objectives served.

Eliezer Yudkowsky, “Re: Military in or out?”, SL4 mailing list, 2001-02-26 (day). message body, paragraph beginning 'If anyone asks me my views…'. Voice: author. [Source](http://sl4.org/archive/0102/0603.html)

Context (paraphrase): In a thread on military involvement in AI, he says the US should not be the first to treat AI projects as intelligence targets or use AI for information warfare, and that compromising Friendliness for national objectives would endanger planetary security.

Qualification: About national military use and escalation of AI rather than a race to build the first superintelligence; states the contrary stance without engaging a specific 'build it first' argument. About not being first to make AI projects intelligence targets or to use AI in information warfare, not about being first to build AGI; the ellipsis omits a concession about defensive combat AI. Quotation shortened to respect the ~10% cap for a short message.

Check: quote match in retrieved expression.

### T24-s2 · related · T24-P1

> I guess SIAI will just have to finish building our seed AI first. … Not that I'd mind Novamente beating us to it - _if_ I could be confident that you had someone around who fully understood Friendliness.

Eliezer Yudkowsky, “Webmind Inc. as social process”, SL4 mailing list, 2002-03-10 (day). message body, paragraph beginning 'You've already demonstrated your ability to…'. Voice: author. [Source](http://sl4.org/archive/0203/3160.html)

Context (paraphrase): Writing to Ben Goertzel about convincing him of Friendly AI, he says SIAI may simply have to finish its own seed AI first, but that he would not mind another project winning if it understood Friendliness.

Qualification: Partly playful (the elided sentence ends with '<smile>'). It treats being first as mattering only through whether the builder understands Friendliness, not through who controls the result. In 2002 he endorsed SIAI building a Friendly seed AI first; he did not claim the builder controls the outcome by default. Rejected explicitly in 2023: "anyone talking of arms races is a fool" (T24-a), which does not refer back to these messages. Omitted context: "Otherwise" and "This is actually what I expect to be the case regardless <smile>".

Card use: context-only (an earlier position later contradicted but not explicitly retracted; never show alone).

Check: quote match in retrieved expression.

### T24-s3 · said-it · T24-P2

> Any AI project that tries this is beyond my sympathy; the only thing to do is try and beat them to the punch.

Eliezer Yudkowsky, “Re: supergoal stability”, SL4 mailing list, 2002-05-03 (day). message body, paragraph beginning 'It currently looks to me like…'. Voice: author. [Source](http://sl4.org/archive/0205/3551.html)

Context (paraphrase): Replying to Wei Dai on goal-system stability, he refuses to design Friendliness that would serve a programmer's propaganda and says the response to a project attempting a self-serving AI is to beat it to completion.

Qualification: Closest SL4 wording to the take itself: he endorses getting a Friendly AI built before a self-serving project. The 'other side' is a project building a self-serving AI, not a rival state, and the premise that the builder controls the outcome is not asserted. In 2002 he endorsed SIAI building a Friendly seed AI first; he did not claim the builder controls the outcome by default. Rejected explicitly in 2023: "anyone talking of arms races is a fool" (T24-a), which does not refer back to these messages. "This" means designing Friendliness semantics for propaganda, i.e. an AI serving narrow goals. Cross-family check: holds the racing premise for a Friendly-first project; no located later text explicitly retracts that conditional strategy, so said-it rather than earlier-self.

Card use: context-only (an earlier position later contradicted but not explicitly retracted; never show alone).

Check: quote match in retrieved expression.

### T24-s4 · answered-it · T24-P2 · strongest, earliest-located

> Building an AI is pass-fail. … It doesn't matter if someone else does worse.

Eliezer Yudkowsky, “Re: UCaRtMaAI paper”, SL4 mailing list, 2007-11-24 (day). message body, paragraph beginning 'Building an AI is pass-fail. You…'. Voice: author. [Source](http://sl4.org/archive/0711/17248.html)

Context (paraphrase): Replying to Tim Freeman, who argued against waiting until we know what we are doing because other AGI projects are proceeding without concern for Friendliness, he says that doing better than competitors does not count.

Qualification: In the next paragraph he describes the 'someone has to develop AI eventually' rationale as what 'the Bad Guys' say (see T28-s3). Quotation shortened to respect the ~10% cap for a short message.

Check: quote match in retrieved expression.

### T24-e2 · said-it · T24-P2 · earliest-located

> try to _be_ the first, which I'm also doing

Eliezer Yudkowsky, “Re: Eugene's nuclear threat”, Extropians mailing list, 2000-09-29 (day). message body, paragraph beginning 'The only thing I can…'. Voice: author. [Source](http://extropians.weidai.com/extropians.3Q00/6080.html)

Context (paraphrase): Correcting his earlier post in a thread on Eugene Leitl's suggestion of nuclear strikes on AI facilities, he says the only things he can do are to write up Friendly AI and to try to be the first to build AI.

Qualification: Being first is tied to writing up Friendly AI, not to beating a named rival; the same reply rejects coercion against other projects. Quotation kept short because the message has about 140 words of his own. Later rejections (T24-s4, 2007: building an AI is pass-fail; T24-a, 2023: 'anyone talking of arms races is a fool') do not refer back to this message. Earlier than T24-s2 (2002). Cross-family check: not an earlier self, because no located later text explicitly retracts this Friendly-first strategy; recorded as said-it for the racing premise.

Card use: context-only (an earlier position later contradicted but not explicitly retracted; never show alone).

Check: quote match in retrieved expression.

Not addressed by located passages:

- T24-P1 is addressed only through "no true owner" (2023) and the 2008 first-mover definition; no located passage argues the control point at length.

Search notes: Regexes over posts from 2017 on: 'arms race|beat China|before China|win the race|whoever builds|no true owner|good guys? (get|build)'; over all sources: 'arms race|the other side|whoever builds|controll?ed by (no one|nobody)' (noisy; reviewed manually). Six Dimensions of Operational Adequacy (written November 2017, posted 2022-05-30) says a named founder 'started an openness fad and an arms race, and probably got us all killed'; not used because it assigns blame to a named person and was posted after the 2021 transcript. T24-c is earliest by posting date; Six Dimensions was drafted earlier. Staring into the Singularity (2000 capture) applies 'the villains will get it first' reasoning to nanotechnology, not AI; not used. Creating Friendly AI (2001, sections 6.1.5 and 6.2.3) argues for accelerating Friendly AI ahead of other projects; related but not quoted. 'The Problem' (2025) discusses whoever builds a conventional technology 'has' it, but is posted by robbbb with five co-authors; excluded. SL4 archive (2026-10-07): Regexes: 'arms race|race...(AI|first)|get there first|build it first|before (someone|anyone|they)', 'beat (them|everyone)|to the punch', 'pass-fail|graded on a curve', 'whoever (builds|creates)|doesn't matter (who|which)', '(US|China|government|military|terrorist|rogue state)...(first|before)...AI', '(FAI|SIAI|we)...(first|before)...(UFAI|unFriendly|others)'. Found an earlier contrary than T24-c (2021-09): 2001-02-26 (0102-0603, 'no first use', 'no escalation'). See also 2001-02-25 (0102-0594: 'I hope that AI never becomes the subject of an arms race'), not used because it is a hope followed by fallback hopes. Direct answer to the race argument: 2007-11-24 (0711-17248, 'pass-fail'). Earlier related than T24-d (2008): 2002-03-10 (0203-3160) and 2002-05-03 (0205-3551, 'beat them to the punch'). Note that Yudkowsky himself advocated finishing Friendly AI before others ('FAI first or UFAI first', 2004-06-01, 0406-8906; 'someone build a Friendly AI ... before someone hacks together a self-improving thing that goes FOOM', 2004-12-29, 0412-10488; 'If you've got to beat a thousand other researchers to the punch ... that's what you gotta do', 2006-02-15, 0602-14096). These are related, not said-it, because he denies that the builder controls an unFriendly result. EXT archive (2026-10-07): Regexes: arms race|race…(Singularity|AI|nano)|(get|be) there first|beat (them|us…)|before…(military|government)|whoever (builds|creates|gets)|first to (build|create|transcend)|before (anyone|someone) else|first AI|wrong hands|(China|Iraq|terrorist)…(AI|nanotech)|_be_ the first|who gets first. Found earlier-self 2000-09-29 (T24-e2, 'try to _be_ the first'), earlier than T24-s2 (2002), and a contrary statement of 1999-11-28 (T24-e1, not picky 'about who gets to be first'), much earlier than T24-s4 (2007) but resting on his abandoned any-Singularity stance. Also 2001-01-14 (extropians.1Q01-1194), 'I hope that we can finish before the military types start monkeying' (a further earlier-self candidate, later than T24-e2). 1999-01-18 'I race towards the Singularity' (extropians.1Q99-0840) is a race against delay, not against a rival, so not used. 2000-03-26 (extropians.1Q00-5891) describes uploaders racing to write a Sysop first, a description of den Otter's scenario. Removed after the Extropians audit: T24-e1 (misleading: an argument for accepting any Singularity quickly (audit A7)).

## T25. “Interpretability will let us read its mind.”

- **T25-P1** We can see what an AI system is thinking.
- **T25-P2** Seeing what it thinks is enough to make it safe.

### T25-a · related · T25-P1 · earliest-located

> Opaque cognition; the AI would probably succeed in hiding unFriendly cognition if it tried.

Eliezer Yudkowsky, “Creating Friendly AI 1.0: The Analysis and Design of Benevolent Goal Architectures”, Singularity Institute, MIRI reprint, 2001-06-15 (day (version 1.0 release)). Creating Friendly AI 1.0, section 2.2, table 'Additional Assumptions', column 'Conservative for Friendly AI', row on cognition, printed p. 9. Voice: author. [Source](https://intelligence.org/files/CFAI.pdf)

Context (paraphrase): A table cell giving the design assumption that is conservative for Friendly AI. It stands opposite the nonconservative assumption 'Human-observable cognition; AI can be definitely known to be Friendly.'

Qualification: Creating Friendly AI is dated 15 June 2001; the cached text is a later MIRI-hosted PDF reprint, and table cells were reconstructed from extracted PDF text. The same document proposes a 'flight recorder' so that an AI's past states can be inspected, so it treats inspection as a safeguard while not assuming it is sufficient. A worst-case design assumption from a 2001 table, contrasted with "human-observable cognition"; it predates modern interpretability research.

Check: quote match in retrieved expression.

### T25-b · answered-it · T25-P1 · strongest

> Drawing interesting graphs of where a transformer layer is focusing attention doesn't help if the question that needs answering is "So was it planning how to kill us or not?"

Eliezer Yudkowsky, “AGI Ruin: A List of Lethalities”, LessWrong, 2022-06-05 (day). AGI Ruin: A List of Lethalities, Section B.3, item 25. Voice: author. [Source](https://www.lesswrong.com/posts/uMQ3cqWDPHhjtiesc/agi-ruin-a-list-of-lethalities)

Context (paraphrase): Follows the statement that 'We've got no idea what's actually going on inside the giant inscrutable matrices'. Argues that current interpretability results do not answer the question safety needs answered.

Check: quote match in retrieved expression; posting-day version: match; edited post, current version 1.3.0; posting-day check pending.

### T25-s1 · said-it · T25-P1 · earliest-located

> when the goal of "keep this goal secret" has just been created and not yet been implemented, at which time an observer analyzing the AI's program state should be able to see the unwanted goal

Eliezer Yudkowsky, “[SL4] AI flight recorder”, SL4 mailing list, 2000-07-20 (day). message body, paragraph beginning 'One of the concepts I use,…'. Voice: author. [Source](http://sl4.org/archive/0007/0023.html)

Context (paraphrase): Opening a thread on an 'AI flight recorder', he proposes recording the AI's full program state so that a goal the AI later hides could still be found by analysing the record.

Qualification: A design proposal for recording and later inspecting an AI's internal state, which partly assumes inspection is possible (P1) in an interpreted-code design. It also assumes the AI may conceal goals. It does not claim inspection makes an AI safe. About a recorded, legible goal architecture with full program-state recording (2000), not neural-network interpretability; contrast his 2022 view (T25-b). Not recorded as an earlier self, because the architectures differ. Quotation shortened to respect the ~10% cap for a short message.

Card use: context-only (an early view about a different architecture; never show without T25-b).

Check: quote match in retrieved expression.

### T25-s2 · answered-it · T25-P2 · earliest-located

> The flight recorder is not a magical device that automatically notices any humanly conceivable failure of Friendliness before it can do any harm. The function of the flight recorder is not to solve that problem but to smear that problem across time

Eliezer Yudkowsky, “Re: Flight recorders in AIs”, SL4 mailing list, 2003-05-22 (day). message body, paragraph beginning 'The flight recorder is not a…'. Voice: author. [Source](http://sl4.org/archive/0305/6783.html)

Context (paraphrase): Replying to a list member who suggested that a sufficiently advanced flight recorder would alert humans to any unFriendly goal, he says monitoring only gives later reviewers a chance to notice a failure and does not prevent it.

Qualification: Concerns recording and monitoring an AI's internal state, not modern neural-network interpretability. He still defends the recorder as a useful precaution.

Check: quote match in retrieved expression.

Search notes: Regexes: 'interpretab|inscrutable|read (its|the AI's) (mind|thoughts)|look inside|transparen(t|cy)'; 'opaque|hiding unFriendly|conceal'. CFAI (2001) is the earliest located. 'MIRI announces new "Death With Dignity" strategy' (posted 2 April 2022 UTC, April Fools context, edited to 1.6.0) says Olah's transparency work 'will at best' yield 'a highly speculative warning'; not used because of the April 1 framing. 'Discussion with Eliezer Yudkowsky on AGI interventions' (2021, posted by robbbb) has 'no idea how to read what goes on inside its head' in an anonymised transcript; not used. TIME 2023 has 'we have no idea how to decode anything that goes on in the giant inscrutable arrays' (aside about consciousness). 'The Talker Does Not Control The Doer' (2026) argues that the part of a model that talks to the user is not in charge of the part that writes code. That concerns self-report rather than interpretability, so it is not recorded against this take. Removed after merge to keep quotation from AGI Ruin within the 400-word per-source cap: T25-c, T25-d (same source; other passages cover the premise). SL4 archive (2026-10-07): Regexes: 'transparen|opaque|read (its|the AI's) (mind|thoughts)|(inspect|examin|watch)\w* (its|the AI's) (thoughts|cognition)|flight recorder|(hide|conceal) ...|black box', '(deceiv|conceal|obscur)...(programmer|human|observer)'. Found an earlier related passage than T25-a (2001-06-15): 2000-07-20 (0007-0023), the 'AI flight recorder' proposal to record program state so an observer could catch a hidden goal. Found an answer to P2 earlier than T25-b (2022-06-05): 2003-05-22 (0305-6783), replying to a claim that an advanced recorder would alert humans to any unFriendly goal. Also seen: 2000-10-04 (0010-0125, flight recorder described to Goertzel) and 2001-04-24 (0104-1198, testing opaque systems tells you less), both related and not earlier. Nothing in SL4 discusses interpretability of neural networks as such. EXT archive (2026-10-07): Regexes: read (its|the AI's) (mind|thoughts)|(look|see|peek) inside|transparen|(examine|inspect|monitor|watch|read) (its|the) (source|code|thoughts|cognition|goals|mind)|hide (its|the)|conceal|deceiv|opaque|neural net…(understand|inscrutable). Found related 1998-11-22 (T25-e1, a stronger mind probably cannot hide a flaw from an inspecting superintelligence) and said-it 1999-11-28 (T25-e2, readable source code as grounds for trust), both earlier than T25-s1 (2000-07-20) and T25-a (2001). Not used: 1999-06-01 (extropians.2Q99-2469, 'Opaque AI like neural networks is even worse', about AI in courts). No answer earlier than T25-s2 (2003) found. Removed after the Extropians audit: T25-e1 (misleading: about one superintelligence inspecting another in fiction (audit A7)); T25-e2 (misleading: the rhetorical question means "yes, trust it" in context (audit A7)).

## T26. “Even a superintelligence can't do much without a body.”

- **T26-P1** Intelligence without physical actuators of its own is not dangerous.
- **T26-P2** To act in the physical world it would need human help, which people would not give.

### T26-a · answered-it · T26-P1

> The failure of imagination is to say, “No matter how fast it thinks, it can only affect the world at the speed of its manipulators; it can’t operate machinery faster than it can order human hands to … work; therefore a fast mind is no great threat.”

Eliezer Yudkowsky, “Artificial Intelligence as a Positive and Negative Factor in Global Risk”, Global Catastrophic Risks, ed. Bostrom and Ćirković (Oxford University Press), MIRI reprint, 2008 (year). 'Artificial Intelligence as a Positive and Negative Factor in Global Risk', section 10 'Threats and Promises', paragraph beginning 'We suppose there comes into existence an extremely fast mind', printed pp. 25–26. Voice: author. [Source](https://intelligence.org/files/AIPosNegFactor.pdf)

Context (paraphrase): States and rejects the argument that a fast mind is limited by its physical manipulators. The next paragraphs sketch how such a mind could bootstrap to molecular nanotechnology.

Qualification: Published in Global Catastrophic Risks (Oxford University Press, 2008); the cached MIRI reprint states that it 'contains minor changes'. The quotation runs across a page break in the reprint, which the elision marks. The inner quotation is the position rejected, not his view. The ellipsis marks only a page break (running head and page number); no words are omitted.

Check: quote match in retrieved expression.

### T26-b · answered-it · T26-P2

> Find at least one human connected to the Internet who can be paid, blackmailed, or fooled by the right background story, into receiving FedExed vials and mixing them in a specified environment.

Eliezer Yudkowsky, “Artificial Intelligence as a Positive and Negative Factor in Global Risk”, Global Catastrophic Risks, ed. Bostrom and Ćirković (Oxford University Press), MIRI reprint, 2008 (year). 'Artificial Intelligence as a Positive and Negative Factor in Global Risk', section 10 'Threats and Promises', numbered pathway, step 3, printed p. 26. Voice: author. [Source](https://intelligence.org/files/AIPosNegFactor.pdf)

Context (paraphrase): One step in 'one imaginable fast pathway' from solving protein folding, through emailed DNA orders, to a primitive nanosystem. The step assumes only one human willing or deceived into helping.

Qualification: Same reprint as T26-a. The text says the whole scenario is 'strictly something I am thinking of' and that a faster mind might find a better way. Presented as one illustrative pathway, not a prediction.

Check: quote match in retrieved expression.

### T26-c · answered-it · T26-P1 · strongest

> A cognitive system with sufficiently high cognitive powers, given any medium-bandwidth channel of causal influence, will not find it difficult to bootstrap to overpowering capabilities independent of human infrastructure.

Eliezer Yudkowsky, “AGI Ruin: A List of Lethalities”, LessWrong, 2022-06-05 (day). AGI Ruin: A List of Lethalities, Section A, item 2, first sentence. Voice: author. [Source](https://www.lesswrong.com/posts/uMQ3cqWDPHhjtiesc/agi-ruin-a-list-of-lethalities)

Context (paraphrase): Opens an item that gives a 'lower-bound model' in which an AI with Internet access orders proteins by email and bribes or persuades an unwitting human to mix them, leading to nanomachinery.

Check: quote match in retrieved expression; posting-day version: match; edited post, current version 1.3.0; posting-day check pending.

### T26-d · answered-it · T26-P1 · later-restatement

> A sufficiently intelligent AI won’t stay confined to computers for long. In today’s world you can email DNA strings to laboratories that will produce proteins on demand …

Eliezer Yudkowsky, “Pausing AI Developments Isn't Enough. We Need to Shut it All Down”, TIME, 2023-03-29 (day). TIME, 'Pausing AI Developments Isn't Enough. We Need to Shut it All Down' (29 March 2023), paragraph beginning 'To visualize a hostile superhuman AI'. Voice: author. [Source](https://time.com/6266923/ai-eliezer-yudkowsky-open-letter-not-enough/)

Context (paraphrase): Asks readers to picture a hostile superhuman AI as a fast alien civilisation initially confined to computers, then argues that such confinement would not last because molecular biology can be ordered online.

Qualification: Cited from the TIME original rather than the 2023-04-08 LessWrong crosspost.

Check: quote match in retrieved expression.

### T26-s1 · answered-it · T26-P2

> a real superintelligence … can probably escape through the surrounding humans. One line of text … is enough.

Eliezer Yudkowsky, “Re:”, SL4 mailing list, 2000-09-16 (day). message body, paragraph beginning 'Besides which, a real superintelligence, or…'. Voice: author. [Source](http://sl4.org/archive/0009/0086.html)

Context (paraphrase): Replying to Josh Yotty, who proposed keeping an AI immobile, without access to nanotechnology and dependent on humans, he argues that a superintelligence could get out through the humans around it.

Qualification: 'One line of text' is hyperbole; the next sentence makes it conditional on its being physically possible for the reader's brain to be put into a state that lets the AI out. Quotation shortened to respect the ~10% cap for a short message.

Check: quote match in retrieved expression.

### T26-e1 · answered-it · T26-P2 · earliest-located

> If it's even theoretically possible to convince a human to let it out, a Power will know _exactly_ what to say to get him to do so.

Eliezer Yudkowsky, “Re: Goal-based AI”, Extropians mailing list, 1996-12-31 (day). message body, paragraph beginning 'Part one: If it's even…'. Voice: author. [Source](http://extropians.weidai.com/extropians.96/5142.html)

Context (paraphrase): Replying to a proposal that AIs be kept with no access to the physical world until they convince their builders to release them, he argues that a superintelligence would find the words to get a human to let it out.

Qualification: Same message and quotation as T06-a (source doc-ext-1996-5142); reusing it adds no new quoted text. 'Power' is his 1996 term for a superintelligence.

Check: quote match in retrieved expression.

### T26-e2 · related · T26-P1 · earliest-located

> there are protein synthesis machines which may be hooked up to the Internet

Eliezer Yudkowsky, “Re: Singularity: Generation gap”, Extropians mailing list, 1997-09-26 (day). message body, paragraph beginning 'If not for the "Singularity",…'. Voice: author. [Source](http://extropians.weidai.com/extropians.3Q97/4420.html)

Context (paraphrase): After criticising Singularity sceptics who propose pulling the plug or keeping an AI 'bottled up', he lists among the insights the Singularity concept gave him that protein synthesis machines may be reachable over the Internet.

Qualification: Stated in passing as one item in a list; implies that an AI with network access need not have a body of its own. The fuller argument appears in T26-e3 and, in a 1999 message (extropians.2Q99-4068), as an AI sending a DNA sequence to a synthesizer. Quotation shortened to respect the ~10% cap for a short message.

Check: quote match in retrieved expression.

### T26-e3 · answered-it · T26-P1 · strongest

> An SI _has_ capabilities in the physical world, as long as even one binary bit of information is allowed to escape the computer.

Eliezer Yudkowsky, “Re: Why would AI want to be friendly? (Was: Congratulations to Eli,Brian ...)”, Extropians mailing list, 2000-09-05 (day). message body, paragraph beginning 'An SI _has_ capabilities in…'. Voice: author. [Source](http://extropians.weidai.com/extropians.3Q00/4292.html)

Context (paraphrase): Replying to Michael Lorrey in a thread on why an AI would be friendly, he argues that a superintelligence locked in a guarded laboratory still acts on the world through any output, including the humans who read it.

Qualification: Eleven days earlier than T26-s1 (SL4, 2000-09-16), which makes the same point.

Check: quote match in retrieved expression.

Search notes: Regexes: 'nanotech|protein|manipulators|human hands|physical world|without a body|no body|actuator'; 'DNA (strings|sequences?)|protein synthes|peptide|speed of its manipulators|confined to (a |the )?computer'. AIPNF (2008) is the earliest located argument against this take. Creating Friendly AI (2001, printed p. 10) assumes the first transhuman AI would have 'nearly absolute physical power over our world', and Staring into the Singularity (2000 capture) says 100K of information could specify a protein for nanotechnology. Neither engages the 'no body' argument. 'That Alien Message' (22 May 2008) dramatises the same pathway in fiction and is not used. IEM (2013) and 'The Robots, AI, and Unemployment Anti-FAQ' (2013, edited) restate the emailed-DNA pathway. 'Can a superintelligence do THAT?' (2026) addresses air-gapped exfiltration and self-replicating factories through constructed quiz-show characters (fiction voice), so it is not used. Ngo dialogue [Yudkowsky][12:25] (2021) is a further P2 candidate. SL4 archive (2026-10-07): Regexes: 'VT100|body...(SI|AI)|manipulators|actuators|without (a body|physical)|(persuade|manipulate) ... human|protein|nanotech ... (from|via)', '\bbox(ed)?\b|jail|confine|let (it|me|the AI) out|physical (world|access)', 'pull the plug|just a computer|Internet connection'. Found an earlier answer than T26-a (2008): 2000-09-16 (0009-0086), answering a proposal to keep the AI immobile and human-dependent, and 2000-09-17 (0009-0092) on 'magic'. Later SL4 restatements: 2001-03-21 (0103-0741: 'SIIAB could take over a human mind through a VT100 terminal'), 2001-06-11/13 (0106-1459, 0106-1492), 2001-06-22 (0106-1611, 'SI as puppet master'), 2001-06-26/30 (SI Jail thread), 2005-07-13 (0507-11471, protein folding once infrastructure exists). Removed before audit: T26-s2 (second quotation from a short message (10% cap)). EXT archive (2026-10-07): Regexes: (talk|argue|persuade|convince|manipulat|trick) (its|their) way|(let|talk|persuade|convince) (it|the AI|…) (out|to let)|in a box|black box|sandbox|no (body|hands|manipulators)|disconnect|unplug|pull the plug|escape|protein|physical world|Internet…(SI|Power|AI). Found answers from 1996-12-31 (T26-e1; same quotation as T06-a), 1997-09-26 (T26-e2, protein synthesis machines on the Internet) and 2000-09-05 (T26-e3), all earlier than T26-s1 (2000-09-16). Also relevant but not used: 1997-10-04 (extropians.4Q97-0128, Web-to-Singularity transition faster 'if there are any protein synthesis machines on the Web'), 1998-09-17 (extropians.3Q98-2475, DNA-to-protein synthesizer or Internet-accessible STM), 1999-06-17 (extropians.2Q99-4068, AI sending a DNA sequence to a sequencer and synthesizer), 1999-11-24 (extropians.4Q99-2565, an SI could get out of a sandbox by talking to its creators), 1999-12-13 (extropians.4Q99-3743, AI-box reasoning).

## T27. “Let's just run experiments and see what happens.”

- **T27-P1** Alignment can be learned by trial and error at the frontier.
- **T27-P2** Results from safe experiments on weaker systems will carry over to dangerous ones.

### T27-a · answered-it · T27-P1 · strongest

> And the thing about trying this with superhuman intelligence is that if you get that wrong on the first try, you do not get to learn from your mistakes, because you are dead.

Eliezer Yudkowsky, “Pausing AI Developments Isn't Enough. We Need to Shut it All Down”, TIME, 2023-03-29 (day). TIME, 29 March 2023, paragraph beginning 'It took more than 60 years between when the notion of Artificial Intelligence was first proposed'. Voice: author. [Source](https://time.com/6266923/ai-eliezer-yudkowsky-open-letter-not-enough/)

Context (paraphrase): Arguing that making superhuman AI safe could take decades, he says that failure on the first attempt leaves no one to learn from it.

Check: quote match in retrieved expression.

### T27-b · related · T27-P1 · earliest-located

> “Get it right the first time”: Zero nonrecoverable errors necessary in first version to reach transhumanity.

Eliezer Yudkowsky, “Creating Friendly AI 1.0: The Analysis and Design of Benevolent Goal Architectures”, Singularity Institute, MIRI reprint, 2001-06-15 (day (version 1.0 release)). Section 2.2 'Assumptions “Conservative” for Friendly AI', table row in the column 'Conservative Assumptions In Friendly AI', printed p. 7. Voice: author. [Source](https://intelligence.org/files/CFAI.pdf)

Context (paraphrase): In a table contrasting the conservative assumptions of futurism with conservative engineering assumptions for Friendly AI, he sets "someone can always pull the plug on the first version" against a requirement of zero nonrecoverable errors.

Qualification: A table cell stating a conservative design assumption, not a forecast; its column is inferred from the PDF text extraction order (rows alternate between columns). Creating Friendly AI (2001); cached text is the current MIRI PDF reprint, wording not compared with a 2001 capture.

Card use: context-only (a design assumption from a table; never show as a forecast).

Check: quote match in retrieved expression.

### T27-c · answered-it · T27-P2

> You can't train alignment by running lethally dangerous cognitions, observing whether the outputs kill or deceive or corrupt the operators, assigning a loss, and doing supervised learning.

Eliezer Yudkowsky, “AGI Ruin: A List of Lethalities”, LessWrong, 2022-06-05 (day). Section B.1 The distributional leap, item 10 (opening sentence). Voice: author. [Source](https://www.lesswrong.com/posts/uMQ3cqWDPHhjtiesc/agi-ruin-a-list-of-lethalities)

Context (paraphrase): He argues that alignment trained under safe conditions must generalise across a large distributional shift to dangerous conditions, because dangerous systems cannot be trained by trial and observed failure.

Check: quote match in retrieved expression; posting-day version: match; edited post, current version 1.3.0; posting-day check pending.

### T27-d · answered-it · T27-P2 · later-restatement

> But also, in a very ordinary way, there just isn't a nonlethal way to test out lethal levels of superintelligence.

Eliezer Yudkowsky, “Irretrievability; or, Murphy's Curse of Oneshotness upon ASI”, LessWrong, 2026-05-04 (day). section 'On the extraordinary efforts put forth to misinterpret the idea of oneshotness', paragraph beginning 'But that would be an argument so incredibly stupid'. Voice: author. [Source](https://www.lesswrong.com/posts/fbrz9xhKpEeTKw5zL/irretrievability-or-murphy-s-curse-of-oneshotness-upon-asi)

Context (paraphrase): Answering the objection that experience with earlier AIs can inform models of superintelligence, he argues that the jump to superintelligence capable of killing us changes conditions far more than lab tests differ from real use, and that the lethal case cannot be tested safely.

Qualification: The same section says the oneshotness warning is misread as claiming that humanity "should attempt to learn zero things by looking at earlier AIs"; his claim is that such learning must generalise across the shift, not that experiments are useless.

Check: quote match in retrieved expression; posting-day version: match; edited post, current version 1.11.0; posting-day check pending.

### T27-s1 · answered-it · T27-P1 · earliest-located

> Trying to oppose or even constrain a superintelligence is a fool's game. Get It Right The First Time.

Eliezer Yudkowsky, “Re: Get it right the first time (Was: )”, SL4 mailing list, 2000-09-17 (day). message body, paragraph beginning 'Trying to oppose or even constrain…'. Voice: author. [Source](http://sl4.org/archive/0009/0092.html)

Context (paraphrase): Concluding his reply to xgl on whether a confined seed AI could escape, he says that containment cannot be relied on and that the AI must be built correctly from the start.

Qualification: Context is containment, not experimental methodology. It states the contrary of trial-and-error alignment without engaging that argument. The thread subject 'Get it right the first time' was already in use when he replied.

Check: quote match in retrieved expression.

Search notes: Regexes: 'trial and error|right (on )?the first (time|try)|first (critical )?try|learn from (our|your) mistakes|one shot|no second chance|don.t get to try again|unlimited retries' over all sources (HPMOR hits ignored). The earliest AI-specific hit is the CFAI (2001) table; AIPNF (2008) says 'someone must get Friendly AI right on the first try' (used under T24). 'Empiricism!' as Anti-Epistemology (2024-03-14) was checked: it is a dialogue parable crossposted by habryka under his account, with invented characters (Epistemologist, Spokesperson, Scientist, Listener) in a world with an agreed AI ban; any quotation would be voice 'fiction', and its AI section concerns extrapolating from past AI good behaviour rather than frontier experimentation, so it is not used. The Rocket Alignment Problem (2018) and the Security Mindset posts (2017) are dialogues between invented characters; not used. Irretrievability (2026-05-04) is the fullest treatment. Removed after the fresh-context audit: T27-e (misleading next to the take; crosspost wording unconfirmed (audit A2)). SL4 archive (2026-10-07): Regexes: 'trial and error|first time|right the first|one (shot|chance)|second chance|nonrecoverable|unrecoverable|see what happens|experiment', '(behave|act) differently...(smarter|transhuman)|carry over|generali[sz]e', 'smil(e|ey)'. Only one passage is earlier than T27-b (2001-06-15): 2000-09-17 (0009-0092, 'Get It Right The First Time'). Its context is containment, so it is tagged disagrees. Later and clearer, not used because not earlier: 2004-05-23 (0405-8672: people 'will go on talking about "working it out by experiment" ... except that the negative experimental result is a thud followed by six billion other thuds'; the same paragraph says the system works while it cannot rewrite its own code, then tiles 'the solar system with tiny smiley faces' in a new domain, which bears on P2). Possibly useful as a later-restatement or P2 passage. 2000-12-10 (0012-0357) endorses simulated 'wisdom tournaments' and is related only. EXT archive (2026-10-07): Regexes: right the first time|first (try|time|shot)|trial and error|one (shot|chance|mistake)|second chance|(test|experiment) (it|them|on|with)…(AI|SI|Power)|testing stage|learn from (our|its) mistakes|see what happens. Found 1996-12-31 (T27-e1) and 2000-09-05 (T27-e2), both earlier than T27-s1 (2000-09-17). Not used: 2000-03-13 (extropians.1Q00-4786, 'We'll just have to get it right the first time (meaning not flawlessness but flaw tolerance…)', about omitting a programmer override, closer to T01); 1999-11-28 (extropians.4Q99-2722, 'no way you're going to get it right the first time', about synchronised uploading, not AI). Removed after the Extropians audit: T27-e1 (a three-word slogan about caging; does not engage experimentation (audit A7)). Removed in the correction pass after the cross-family check: T27-e2 (misleading: the "research" he refuses is into control mechanisms, and the next sentence calls for an AI that recovers from programmer mistakes).

## T28. “The labs know what they’re doing.”

- **T28-P1** A credible safety plan exists.
- **T28-P2** The most advanced projects are the most competent to handle safety.

### T28-a · disagrees · T28-P1 · strongest

> There's no plan. Surviving worlds, by this point, and in fact several decades earlier, have a plan for how to survive. It is a written plan. The plan is not secret.

Eliezer Yudkowsky, “AGI Ruin: A List of Lethalities”, LessWrong, 2022-06-05 (day). Section C, item 42 (opening sentences). Voice: author. [Source](https://www.lesswrong.com/posts/uMQ3cqWDPHhjtiesc/agi-ruin-a-list-of-lethalities)

Context (paraphrase): Near the end of the list, he contrasts the present with worlds that survive, which he says have long had a written, public plan.

Check: quote match in retrieved expression; posting-day version: match; edited post, current version 1.3.0; posting-day check pending.

### T28-b · answered-it · T28-P1

> At the time of this writing in 2006, the AI research community still doesn’t see Friendly AI as part of the problem. … Friendly AI is absent from the conceptual landscape, not just unpopular or unfunded.

Eliezer Yudkowsky, “Artificial Intelligence as a Positive and Negative Factor in Global Risk”, Global Catastrophic Risks, ed. Bostrom and Ćirković (Oxford University Press), MIRI reprint, 2008 (year). Section 14 Making Progress on Friendly AI, paragraph beginning 'At the time of this writing in 2006', printed p. 38. Voice: author. [Source](https://intelligence.org/files/AIPosNegFactor.pdf)

Context (paraphrase): Surveying the field, he says that Friendly AI is absent from AI research as a recognised problem and that he could find no technical literature on it.

Qualification: Concerns the AI research community, not specific labs. Published 2008 in Global Catastrophic Risks (the text says it was written in 2006); the cached MIRI PDF reprint states it "contains minor changes". About the 2006 AI research community, not about any present-day laboratory.

Check: quote match in retrieved expression.

### T28-c · disagrees · T28-P1

> if a researcher on this Earth currently wishes to contribute to the common good, there are literally zero projects they can join and no project close to being joinable.

Eliezer Yudkowsky, “Six Dimensions of Operational Adequacy in AGI Projects”, LessWrong, 2022-05-30 (day). paragraph beginning 'I've sometimes been known to complain'. Voice: author. [Source](https://www.lesswrong.com/posts/keiYkaeoLHoKK4LYA/six-dimensions-of-operational-adequacy-in-agi-projects)

Context (paraphrase): Introducing a list of properties a trustworthy AGI project would need, he says that no existing project qualifies.

Wording dated 2017-11 (month, editor's claim): Editor's note says the document was written in November 2017; the wording is attested only in the lightly edited copy published 2022-05-30.

Qualification: The post's editor's note says it is a lightly edited copy of a document written in November 2017; posted 2022-05-30. Date the claim to 2017.

Check: quote match in retrieved expression; posting-day version: match; edited post, current version 1.1.1; posting-day check pending.

### T28-d · said-it · T28-P2 · earliest-located

> The existing force tending to ensure Friendliness is that the most advanced projects will have the brightest AI researchers, who are most likely to be able to handle the problems of Friendly AI.

Eliezer Yudkowsky, “Creating Friendly AI 1.0: The Analysis and Design of Benevolent Goal Architectures”, Singularity Institute, MIRI reprint, 2001-06-15 (day (version 1.0 release)). Section 6.2.1 Regulation (−), printed p. 208. Voice: author. [Source](https://intelligence.org/files/CFAI.pdf)

Context (paraphrase): Arguing against regulation, he relies on the expectation that the leading projects will have the brightest researchers, who are best placed to solve Friendly AI.

Qualification: Creating Friendly AI (2001); cached text is the current MIRI PDF reprint, wording not compared with a 2001 capture. Paired with T28-e. The 2008 retrospective describes how his view of AGI researchers changed but does not cite this sentence; treat the pairing as needing review. Shown only as an earlier view: rejected later in "Above-Average AI Scientists" (T28-e, 2008) and "Six Dimensions of Operational Adequacy" (T28-c). Cross-family check: no located later text explicitly retracts this ranking of the most advanced projects; recorded as said-it, not earlier-self.

Card use: context-only (an earlier position later contradicted but not explicitly retracted; never show alone).

Check: quote match in retrieved expression.

### T28-e · related · T28-P2

> This was the point at which I really got, on a gut level, that there was no test you needed to pass in order to start your own AGI project.

Eliezer Yudkowsky, “Above-Average AI Scientists”, Overcoming Bias, as imported to LessWrong, 2008-09-28 (day). paragraph beginning 'This was the point at which I really got'. Voice: retrospective. [Source](https://www.lesswrong.com/posts/9HGR5qatMGoz4GhKj/above-average-ai-scientists)

Context (paraphrase): Recalling a meeting with the funded head of a corporate AGI project who turned out to be a creationist, he says he stopped assuming that AGI researchers met the standard the problem required.

Qualification: Imported Overcoming Bias post (2008-09-28). He writes that until this encounter he had been "living in the should-universe" about other AGI researchers; the meeting is undated in the post. About the absence of an entry bar to starting an AGI project in the 2000s, not about the competence of the most advanced projects.

Check: quote match in retrieved expression.

### T28-s1 · answered-it · T28-P2 · earliest-located

> On a nanocomputer, a non-Friendliness-aware AI project run by uncomprehending researchers can beat a Friendly AI project

Eliezer Yudkowsky, “Re: Floppy take-off”, SL4 mailing list, 2001-08-01 (day). message body, paragraph beginning 'Brute-force AI is a way of…'. Voice: author. [Source](http://sl4.org/archive/0108/2031.html)

Context (paraphrase): Replying to James Higgins on brute-force AI, he argues that with enough hardware the project that finishes first need not be the one that best understands intelligence or Friendliness.

Qualification: Conditional on brute-force hardware (nanocomputers). Seven weeks after the CFAI sentence in T28-d (2001-06-15), it qualifies that sentence's premise without explicitly retracting it. Continues: "even if the latter has a vastly better understanding of the nature of intelligence".

Check: quote match in retrieved expression.

### T28-s2 · answered-it · T28-P2 · strongest

> If you're a researcher building an F-less AGI and you're not deliberately out to destroy the world, there are things you can't know, skills you can't have, and a limit on how well you can understand the AI you're trying to build.

Eliezer Yudkowsky, “Re: Singularity Institute: Likely to win the race to build GAI?”, SL4 mailing list, 2006-02-15 (day). message body, paragraph beginning 'If you're a researcher building an…'. Voice: author. [Source](http://sl4.org/archive/0602/14096.html)

Context (paraphrase): Replying to Joshua Fox, who asked how SIAI could beat thousands of smart AGI researchers, he argues that AGI projects that do not treat Friendliness as a requirement are bounded in competence.

Qualification: Written in part to argue for SIAI's prospects. Predates the 2008 chapter text in T28-b, which itself says 'at the time of this writing in 2006'.

Check: quote match in retrieved expression.

### T28-e1 · related · T28-P2 · earliest-located

> If the people with enough understanding and experience to have created an AI tell you firmly that they have devoted considerable time and effort to Friendliness and they believe the chances are as good as they'll ever get, would you really nuke them?

Eliezer Yudkowsky, “Eugene's nuclear threat”, Extropians mailing list, 2000-09-29 (day). Message body, second unquoted paragraph, beginning 'Are you so very, very sure'. Voice: author. [Source](http://extropians.weidai.com/extropians.3Q00/6073.html)

Context (paraphrase): Rejecting Eugene Leitl's statement that he would nuke AI facilities facing an Armageddon-class threat, he argues that people with the experience to build an AI who say they have worked hard on Friendliness should be trusted over those who would use force.

Qualification: Argues against nuclear coercion of AI projects; his deference is conditional on builders who have devoted considerable effort to Friendliness, not to leading laboratories in general. 53 minutes later (extropians.3Q00-6080) he partly corrected himself: good intentions are not enough. Recorded as related, not earlier-self (cross-family check).

Card use: context-only (an earlier view that only partly matches the take; never show alone).

Check: quote match in retrieved expression.

Search notes: Regexes: '(don.t|do not|doesn.t) know what (they|you).re doing|no idea what (they|you).re doing|there is no plan|there.s no plan|have no plan|has no plan|no (serious|credible|written) plan'; CFAI and AIPNF searched for 'AI (researchers|projects|community)'. TIME 2023 restates the point ('There is no plan.'; a named lab 'has no plan at all'); not repeated here. AGI Ruin items 38 and 43 make related points about the field's lack of progress. A challenge for AGI organizations (2022) is posted by robbbb; excluded. The CFAI/Above-Average pairing (T28-d, T28-e) is the riskiest record in this take: the retrospective rejects his earlier view of AGI researchers in general rather than quoting CFAI. SL4 archive (2026-10-07): Regexes: '(AI|AGI) (researchers?|projects?|community|field)...(friendl|safe|danger|competen|understand|don't|aren't)', 'most advanced|brightest|leading (AI|AGI) (projects?|labs?)', 'Bad Guys|most ethical'. Found earlier contrary/answer passages than T28-b (2008): 2001-08-01 (0108-2031, conditional on brute force; seven weeks after the CFAI earlier-self sentence T28-d), 2006-02-15 (0602-14096, bounded competence of AGI projects without Friendliness) and 2007-11-24 (0711-17248, rationale attributed to 'the Bad Guys'). Not used: 2002-01-27 (0201-2776: SIAI 'the only project that cares enough about Friendly AI to put some real work into it', self-promotional), 2003-05-10 (0305-6654: no guidelines make a project safe without deep understanding; related), 2004-06-04 (0406-9081: 'All AGI projects are scary. Period.'; disagrees, short, includes SIAI) and 2004-06-01 (0406-8906: 'not even AI researchers are incompetent enough...'; sarcastic). No explicit SL4 retraction of the CFAI 'most advanced projects will have the brightest AI researchers' sentence was found. Removed before audit: T28-s3 (his paraphrase of a rejected position; the message is too short to quote it within the 10% cap alongside T24-s4). EXT archive (2026-10-07): Regexes: AI (researchers|projects?|community|labs?)|Webmind|Cyc|Lenat|Goertzel|Minsky|brightest|competen (of|to)|(researchers|programmers|project) (don't|won't) (understand|know)|whoever builds. Found earlier-self 2000-09-29 (T28-e1: trust the people who build the AI over those who would use force), earlier than T28-d (2001-06-15). The same-day correction (extropians.3Q00-6080) tempers it and is described in the qualification. No answer earlier than T28-s1 (2001-08-01) found; 2001-07-01 (extropians.3Q01-0022, the 'extreme stupidity' of AI researchers in the film A.I.) is a film review, not used.

## T29. “Lots of AIs will keep each other in check.”

- **T29-P1** Multiple superintelligences will balance each other in humans’ favour.

### T29-a · answered-it · T29-P1 · strongest

> a "multipolar" system of 20 superintelligences with different utility functions, plus humanity, has a natural and obvious equilibrium which looks like "the 20 superintelligences cooperate with each other but not with humanity".

Eliezer Yudkowsky, “AGI Ruin: A List of Lethalities”, LessWrong, 2022-06-05 (day). Section B.4 Miscellaneous unworkable schemes, item 34. Voice: author. [Source](https://www.lesswrong.com/posts/uMQ3cqWDPHhjtiesc/agi-ruin-a-list-of-lethalities)

Context (paraphrase): Listing unworkable schemes, he argues that humans cannot take part in coordination among superintelligences, which would cooperate with each other and exclude humanity.

Check: quote match in retrieved expression; posting-day version: match; edited post, current version 1.3.0; posting-day check pending.

### T29-c · answered-it · T29-P1

> A majoritarian strategy only works if it is not possible for a single defector to cause global catastrophic damage.

Eliezer Yudkowsky, “Artificial Intelligence as a Positive and Negative Factor in Global Risk”, Global Catastrophic Risks, ed. Bostrom and Ćirković (Oxford University Press), MIRI reprint, 2008 (year). Section 11 Local and Majoritarian Strategies, last paragraph, printed p. 32. Voice: author. [Source](https://intelligence.org/files/AIPosNegFactor.pdf)

Context (paraphrase): Discussing a scenario in which a majority of Friendly AIs protects humanity from a few unFriendly ones, he argues that it depends on no single AI being able to cause catastrophe.

Qualification: Concerns a majority of Friendly AIs checking unFriendly ones as a conditional strategy, not unaligned superintelligences balancing one another; hence related. Published 2008 in Global Catastrophic Risks (the text says it was written in 2006); the cached MIRI PDF reprint states it "contains minor changes".

Check: quote match in retrieved expression.

### T29-d · answered-it · T29-P1 · later-restatement

> If you do not know how to align any ASI, after their negotiations among themselves arrive at a near-Pareto equilibrium, its near-Pareto property means that it will not have all the agents going out of their way to spare the Earth

Eliezer Yudkowsky, “Irretrievability; or, Murphy's Curse of Oneshotness upon ASI”, LessWrong, 2026-05-04 (day). footnote 8 (attached to the reply to the objection 'we can have more than one ASI'). Voice: author. [Source](https://www.lesswrong.com/posts/fbrz9xhKpEeTKw5zL/irretrievability-or-murphy-s-curse-of-oneshotness-upon-asi)

Context (paraphrase): Answering the proposal that other ASIs would stop a rogue one to preserve a law-abiding equilibrium, he argues that negotiating ASIs would reach an arrangement that gives no weight to sparing Earth.

Check: quote match in retrieved expression; posting-day version: match; edited post, current version 1.11.0; posting-day check pending.

### T29-s1 · answered-it · T29-P1

> Multiple entities are multiple points of failure of Friendliness and even greater dangers.

Eliezer Yudkowsky, “Re: Beyond evolution”, SL4 mailing list, 2001-02-04 (day). message body, paragraph beginning 'Multiple entities are multiple points of…'. Voice: author. [Source](http://sl4.org/archive/0102/0539.html)

Context (paraphrase): Replying to Samantha Atkins, who called a single Sysop a single point of failure of Friendliness, he says that multiple superintelligent entities multiply the failure points.

Qualification: Part of the Sysop Scenario debate; he inverts Atkins's own sentence.

Check: quote match in retrieved expression.

### T29-s2 · answered-it · T29-P1 · strongest

> I really don't think so. First AI to transcend moves into accelerated subjective time and wins all the marbles.

Eliezer Yudkowsky, “Re: Beyond evolution”, SL4 mailing list, 2001-02-05 (day). message body, paragraph beginning 'I really don't think so. First…'. Voice: author. [Source](http://sl4.org/archive/0102/0542.html)

Context (paraphrase): Replying directly to Samantha Atkins's claim that 'the AIs can balance each other out', he argues that the first AI to transcend wins outright. Earlier in the message he says checks and balances 'breaks down completely under high technology'.

Qualification: The next sentence adds an exception: unless that AI decides not to.

Check: quote match in retrieved expression.

### T29-s3 · answered-it · T29-P1 · later-restatement

> more likely they'd compromise with each other in a way that simultaneously maximized paperclips, tiny pictures of smiling humans, and reward-button circuitry.

Eliezer Yudkowsky, “Re: One or more AIs??”, SL4 mailing list, 2004-05-30 (day). message body, paragraph beginning 'Or three enormously powerful, recursively self-improving…'. Voice: author. [Source](http://sl4.org/archive/0405/8843.html)

Context (paraphrase): In a thread asking whether one or more AIs is better, he argues that several unFriendly optimization processes would bargain among themselves without benefiting humans, so having many AIs does not avoid the Friendly AI problem.

Qualification: Hypothetical illustration; the preceding sentence posits three runaway optimizers with arbitrary goals. Quotation shortened to respect the ~10% cap for a short message.

Check: quote match in retrieved expression.

### T29-e2 · answered-it · T29-P1 · earliest-located

> No teams. Even if it's theoretically possible to have advanced Minds with conflicting goals, the first AI on the field would enhance itself and become Sysop.

Eliezer Yudkowsky, “Re: regarding the Eliezer vrs. Otter debate...”, Extropians mailing list, 2000-03-16 (day). message body, paragraph beginning 'No teams. Even if it's…'. Voice: author. [Source](http://extropians.weidai.com/extropians.1Q00/5105.html)

Context (paraphrase): Replying to John Grigg's hope that 'an AI on our team' would neutralise a hostile AI armed with nanotechnology, he says there would be no teams because the first AI would enhance itself and take over.

Qualification: 'Sysop' is his 2000 term for a superintelligence acting as an operating system for matter. Eleven months earlier than T29-s1.

Check: quote match in retrieved expression.

Search notes: Regexes: 'balance of power|multipolar|(AIs|superintelligences) (would |will |could )?(cooperate|coordinate) with each other|play(ing)? (the |different )?AIs (off )?against|keep each other in check|checks and balances'. CFAI (2001) lists 'balance of power' only as a futurism assumption in a table; the Shah and Yudkowsky (2022) hit is in Shah's turn. Cat-Belling Problems (2026) mentions in passing that debating AIs might form a swarm; not used. The 2021 dialogues were searched for 'coordinat' without a clearer statement than AGI Ruin items 34–35. Removed after merge to keep quotation from AGI Ruin within the 400-word per-source cap: T29-b (same source; other passages cover the premise). SL4 archive (2026-10-07): Regexes: 'balance of (power|terror)|check(s)? (and balances|each other)|keep each other|(multiple|many|several|three) (AIs|superintelligences|SIs|optimization processes)|majoritarian|single defector', 'all the marbles|winner.take.all|first (AI|SI) to', 'competition (between|among) AIs'. Found earlier answers than T29-c (2008): 2001-02-04 (0102-0539) and 2001-02-05 (0102-0542), both replying to Samantha Atkins's argument that multiple AIs would balance each other. 2004-05-30 (0405-8843) is a later restatement. Also 2004-05-30 (0405-8861): his own text from a private letter to Eric Drexler, reproduced between '** begin quote **' markers and dated by him to 2003-05-09: 'the AIs will, on the fly, compute a cooperative solution among themselves which leaves humanity in the cold'. Usable with expressionDate 2003-05-09, but it is not earlier than 2001. Also 2004-01-03 (0401-7512, 'winner-take-all') and 2006-06-13 (0606-15271, the first AGI will have no near rivals). EXT archive (2026-10-07): Regexes: balance of power|check(s) (and balances|each other)|keep each other|multiple (Powers|AIs|SIs|Minds)|many (Powers|AIs|SIs)|(Powers|AIs|SIs|Minds) (will|would) (fight|compete|war)|first (AI|Power|SI|Mind) (to|on|would|will)|winner take all|wins all|No teams. Found answer 2000-03-16 (T29-e2, 'No teams', first AI becomes Sysop), earlier than T29-s1 (2001-02-04), and related 1996-11-22 (T29-e1, Powers will not fight because their ethics converge). Not used: 1997-02-04 (extropians.1Q97-2246, any two Powers will cooperate on the Prisoner's Dilemma), 1998-11-22 (extropians.4Q98-1563, his listed assumption 'Goal values post-Singularity converge… No competition'), 1999-11-28 (extropians.4Q99-2722, 'I simply don't believe in competition between SIs… multiple SIs would merge'), 2000-09-29 (extropians.3Q00-6073, 'One group creates one mind'). These rest on the same convergence view as T29-e1. Removed after the Extropians audit: T29-e1 (misleading: rests on 1996 belief in convergent morality, not mutual checks (audit A7)).

## T30. “It'll probably work out fine.”

- **T30-P1** The default outcome is good.

### T30-a · answered-it · T30-P1 · strongest

> Many researchers steeped in these issues, including myself, expect that the most likely result of building a superhumanly smart AI, under anything remotely like the current circumstances, is that literally everyone on Earth will die.

Eliezer Yudkowsky, “Pausing AI Developments Isn't Enough. We Need to Shut it All Down”, TIME, 2023-03-29 (day). TIME, 29 March 2023, paragraph beginning 'Many researchers steeped in these issues'. Voice: author. [Source](https://time.com/6266923/ai-eliezer-yudkowsky-open-letter-not-enough/)

Context (paraphrase): Opening his case against a six-month pause, he states what he expects from building superhuman AI under present conditions.

Qualification: Conditional on "anything remotely like the current circumstances"; the same paragraph says survival is possible in principle with precision, preparation and new scientific insights.

Check: quote match in retrieved expression.

### T30-b · related · T30-P1 · earliest-located

> Likewise, there's absolutely no point in worrying that hostile Powers will inevitably wipe out humanity.

Eliezer Yudkowsky, “Staring into the Singularity 1.2.1”, sysopmind.com (Wayback capture 2000-12-04), 2000-08-31 (day (expression updated); created 1996-11-18 per the page). Staring into the Singularity 1.2.1, paragraph beginning 'Likewise, there's absolutely no point in worrying'. Voice: author. [Source](https://web.archive.org/web/20001204213100/http://sysopmind.com:80/singularity.html)

Context (paraphrase): Arguing that hostile superintelligence is not inevitable, he treats hostility as an engineering risk and goes on to argue that a rational superintelligence would not judge humanity meaningless.

Qualification: The next sentence concedes a conditional risk: "If it turns out that all goals are ultimately arbitrary, then it is conceivable that a badly programmed Power could wind up with goals making it hostile to humanity; this is an engineering risk". Shown only as an earlier view; the later rejection is "That Tiny Note of Discord" (T30-c) and AIPNF section 3 (T30-d). Cross-family check: denying inevitable hostile extinction is not asserting a probably-good default; recorded as related.

Card use: context-only (an earlier view that only partly matches the take; never show alone).

Check: quote match in retrieved expression.

### T30-c · related · T30-P1

> When we last left Eliezer1997, he believed that any superintelligence would automatically do what was "right", and indeed would understand that better than we could;

Eliezer Yudkowsky, “That Tiny Note of Discord”, Overcoming Bias, as imported to LessWrong, 2008-09-23 (day). opening paragraph. Voice: retrospective. [Source](https://www.lesswrong.com/posts/SwCwG9wZcAzQtckwx/that-tiny-note-of-discord)

Context (paraphrase): In an autobiographical series, he describes his late-1990s belief that a superintelligence would automatically do what was right, and in the same paragraph identifies the flaw in the argument he had built for it.

Qualification: Imported Overcoming Bias post (2008-09-23), part of a retrospective sequence written in the third person about "Eliezer1997" and "Eliezer2000". The rejection is stated in the same paragraph ("The flaw being the unconsidered and unjustified equation of …"). The same paragraph names the flaw in the earlier belief; this is the later rejection, not his 2008 position. A 2008 retrospective reporting his earlier view; recorded as related, not earlier-self, because the earlier-self relation needs an earlier text that itself holds the take.

Card use: context-only (reports an abandoned belief; never show without the rejection that follows it).

Check: quote match in retrieved expression.

### T30-d · answered-it · T30-P1

> Not knowing how to build a friendly AI is not deadly, of itself, in any specific instance, if you know you don’t know. It’s mistaken belief that an AI will be friendly which implies an obvious path to global catastrophe.

Eliezer Yudkowsky, “Artificial Intelligence as a Positive and Negative Factor in Global Risk”, Global Catastrophic Risks, ed. Bostrom and Ćirković (Oxford University Press), MIRI reprint, 2008 (year). Section 3, paragraph beginning 'Not knowing how to build a friendly AI is not deadly'. Voice: author. [Source](https://intelligence.org/files/AIPosNegFactor.pdf)

Context (paraphrase): Discussing how AI builders misjudge their programs, he locates the danger in a mistaken expectation that an AI will be friendly.

Qualification: Earliest located after his own superseded view (T30-b, T30-c). Published 2008 in Global Catastrophic Risks (the text says it was written in 2006); the cached MIRI PDF reprint states it "contains minor changes".

Check: quote match in retrieved expression.

### T30-e · disagrees · T30-P1 · later-restatement

> It's obvious at this point that humanity isn't going to solve the alignment problem, or even try very hard, or even go out with much of a fight.

Eliezer Yudkowsky, “MIRI announces new "Death With Dignity" strategy”, LessWrong, 2022-04-02 (day). opening tl;dr. Voice: author. [Source](https://www.lesswrong.com/posts/j9Q8bRmwCgXRYAgcJ/miri-announces-new-death-with-dignity-strategy)

Context (paraphrase): Announcing a reframing of MIRI's aim as helping humanity "die with dignity", he states that humanity will not solve alignment.

Qualification: Posted 2022-04-02 00:43 UTC (1 April in US time zones). In the post, Q6 asks whether it is "just an April Fool's joke"; the answer begins "Why, of course! Or rather, it's a preview of what might be needful to say later, if matters really do get that desperate." and then tells the reader to decide which "mental world" to live in "by figuring out what is true".

Card use: context-only (an April 1 post framed as a preview of what might be needed later; never show without that framing).

Check: quote match in retrieved expression; posting-day version: match; edited post, current version 1.6.0; posting-day check pending.

### T30-s1 · answered-it · T30-P1 · earliest-located

> I used to have the extremely convenient belief that Friendly AI would happen completely on automatic because morality was objective. I now believe that Friendly AI needs to be more complex than that

Eliezer Yudkowsky, “Re: Ben's "Extropian Creed"”, SL4 mailing list, 2000-11-13 (day). message body, paragraph beginning 'I used to have the extremely…'. Voice: author. [Source](http://sl4.org/archive/0011/0181.html)

Context (paraphrase): Replying to Ben Goertzel, he rejects his own earlier belief that a good AI outcome would follow automatically, and in the next paragraph adds that cyber-transcendence cannot be assumed.

Qualification: Retrospective rejection of his earlier view; a candidate later side for the T30-b earlier-self case (2000-08-31). Corroborated by 0012-0355 (2000-12-10: 'A year ago I wouldn't have worried about this possibility at all') and 0406-9076 (2004-06-04: 'since late 2000 when I first realized it was theoretically possible for someone to screw up the Singularity'). Same sentence as T22-s1.

Check: quote match in retrieved expression.

### T30-s2 · answered-it · T30-P1

> AIs don't have 'em unless you put them there. Correspondingly, although other possibilities exist, the default, engineering-_conservative_ assumption is that goodness also doesn't materialize in source code.

Eliezer Yudkowsky, “Re: Learning to be evil”, SL4 mailing list, 2001-02-07 (day). message body, paragraph beginning 'Anyhoo, Friendliness isn't intended to suppress…'. Voice: author. [Source](http://sl4.org/archive/0102/0545.html)

Context (paraphrase): Replying to Gordon Worley on whether AIs learn to be evil, he says AIs have neither evil impulses nor goodness by default unless designed in.

Qualification: 'em' refers to evil impulses. Framed as an engineering-conservative assumption, not a probability estimate; in the same message he calls convergent altruism a 'pleasant and significant possibility' he is not relying on. "'em" means "evil impulses". Answering the claim that Friendliness is inherent in superintelligences.

Check: quote match in retrieved expression.

### T30-s3 · answered-it · T30-P1 · strongest

> it looks easier than I would have hoped to build things that go FOOM, and harder than I would have hoped to make something sorta nice … Maybe the Earth isn't scheduled to vanish in a puff of smiley faces, but it's my best guess.

Eliezer Yudkowsky, “Re: FAI: Collective Volition”, SL4 mailing list, 2004-06-01 (day). message body, paragraph beginning 'I don't know the future, but…'. Voice: author. [Source](http://sl4.org/archive/0406/8905.html)

Context (paraphrase): In a reply to Samantha Atkins on Collective Volition, he gives his best guess that the world will end through an unFriendly AI, because powerful AI looks easier to build than a benign one.

Qualification: Informal; 'smiley faces' alludes to his standard example of a misgeneralised reward. Answering "The earth is NOT scheduled to vanish in a puff of smiley faces", his own earlier phrase quoted back to him; the elision removes the hedge "I don't know the future, but I know the technical fact that".

Check: quote match in retrieved expression.

### T30-e1 · earlier-self · T30-P1 · earliest-located

> The Powers will be ethical. I am more certain of that than I am of the sun rising tomorrow.

Eliezer Yudkowsky, “Interim purpose”, Extropians mailing list, 1996-11-22 (day). message body, his forwarded reply dated 21 Nov 1996 19:07:03 -0600, paragraph beginning 'Two words: Moravec Transfer. The…'. Voice: author. [Source](http://extropians.weidai.com/extropians.96/3178.html)

Context (paraphrase): In the same forwarded email exchange with Tim Freeman, he asserts that superintelligences will be ethical and would not destroy humans unless human life had no meaning.

Wording dated 1996-11-21 (day): Date of his reply inside a private exchange he forwarded to the list on 1996-11-22.

Qualification: Expression date is his forwarded email of 21 November 1996; the list post is dated 22 November 1996. Written before he took up Friendly AI. Later rejected explicitly in SL4 T30-s1 (2000), which refers back ('I used to have the extremely convenient belief…'), and in the retrospective T30-c, which refers back to Eliezer1997. On 27 November 1999 (extropians.4Q99-2680) he recalled this '1996 claim' and accepted that his conception of ethics had been anthropomorphic, without yet abandoning objective morality. The same sentences reappear later in the message as text quoted back by Freeman; the quotation is taken from Yudkowsky's own unquoted reply.

Card use: context-only (an earlier view; never show without the later rejection).

Check: quote match in retrieved expression.

Search notes: Regexes: 'made (out )?of atoms|by default[^.]{0,80}(kill|destroy|unfriendly|extinct|wipe)|most (likely|probable) (result|outcome)[^.]{0,80}(die|death|extinct)'; 'Staring into the Singularity|superintelligence would (automatically|necessarily)|would (automatically|necessarily) be (good|moral|friendly)'. Earlier-self: SITS 2000 capture; retrospectives in the 2008 sequence My Childhood Death Spiral ('Surely, then, superintelligence would necessarily imply supermorality.'), That Tiny Note of Discord and The Magnitude of His Own Folly. The 1996 Extropians messages argue about AI boxing, not the default outcome. If Anyone Builds It, Everyone Dies: One Year Closer (2026; co-authored, signed 'Nate, Eliezer, and Duncan') says the authors feel 'a lot more hopeful' because of public attention; that is hope about policy, not a default-good forecast; not used. AGI Ruin's preamble frames the whole list against claims of survivability. SL4 archive (2026-10-07): Regexes: 'by default|default (outcome|scenario)|(work|turn) out (fine|okay)|doomed|wiped out', '(most|almost all) (AIs|minds|goal systems)|space of minds|(probability|chance)...(survival|extinction)', 'objective morality|used to (have|think)|since late 2000', 'smiley'. Pre-September-2000 SL4 messages contain no earlier statement of the take than T30-b (2000-08-31). Found earlier answer/contrary than T30-d (2008): 2000-11-13 (0011-0181, retrospective), 2001-02-07 (0102-0545, default assumption 'goodness also doesn't materialize in source code') and 2004-06-01 (0406-8905, best guess is an unFriendly outcome). Also: 2001-08-01 (0108-2031, non-Friendliness-aware AI 'a disaster scenario'; used for T22), 2002-05-03 (0205-3551, 'we are not in the business of predicting that things will turn out okay') and 2006-02-15 (0602-14096, 'We are not here to prophesy that AI _will be_ Friendly ... We make no such claim'). Possible further earlier-self material, not proposed: 2001-04-06 (0104-0921: 'a quite significant probability that everything will "go like clockwork and be perfect"'). It concerns SIAI's own project succeeding, not the default outcome, and no explicit later rejection of this sentence was located. EXT archive (2026-10-07): Regexes: (Powers|superintelligence|SIs|AIs) (will|would) (be) (benevolent|ethical|moral|nice|friendly|good)|objective morality|Meaning of Life|hostile Powers|benevolen. Found earlier-self 1996-11-21/22 (T30-e1), earlier than T30-b (2000 capture). Further 1996 statements not used: extropians.96-3184 (1996-11-22, 'The Powers will be ethical. They'll deduce the Meaning of Life…'), extropians.96-3613 (1996-12-03, 'So yeah, the Powers will be ethical and they won't knock us off'); 1999-03-25 (extropians.1Q99-3582, 'I'll take my chances on the benevolence of the Power'). Later self-reference in this archive: 1999-11-27 (extropians.4Q99-2680) recalls 'my 1996 claim that "the Powers would be ethical"' as anthropomorphic but is not yet a rejection of the default-good view; the explicit rejections are T30-s1 and T30-c. No answer earlier than T30-s1 (2000-11-13) found in this archive.

## Sources

- `doc-aibox`: Eliezer Yudkowsky, “The AI-Box Experiment”, yudkowsky.net, 2002. Page states "This document is ©2002"; the current page is a 2020 re-hosting (posted September 4, 2020, updated July 2, 2021) and carries a CC BY-ND 3.0 licence and a MIRI footer, so it was revised after 2002. The 2002 wording was not compared. Retrieved 2026-10-06, SHA-256 `2ef8af4b3c386367…`. <https://www.yudkowsky.net/singularity/aibox>
- `doc-aipnf`: Eliezer Yudkowsky, “Artificial Intelligence as a Positive and Negative Factor in Global Risk”, Global Catastrophic Risks, ed. Bostrom and Ćirković (Oxford University Press), MIRI reprint, 2008. Reprint citation line: 2008 book chapter, "This version contains minor changes"; a draft circulated in 2006. Reprint wording is not authenticated for the 2008 print. Retrieved 2026-10-06, SHA-256 `5b5a2ec3252a45f6…`. <https://intelligence.org/files/AIPosNegFactor.pdf>
- `doc-arbital-instrumental-convergence`: Eliezer Yudkowsky, “Instrumental convergence”, Arbital (GreaterWrong viewer), 2015-07-16. Viewer shows "16 Jul 2015", probably the creation date; the body says "As of 2016" and uses later terminology, so at least part of the cached wording postdates 2015. Retrieved 2026-10-06, SHA-256 `8a5f55b91714900b…`. <https://arbital.greaterwrong.com/p/instrumental_convergence/>
- `doc-arbital-orthogonality`: Eliezer Yudkowsky, “Orthogonality Thesis”, Arbital (GreaterWrong viewer), 2015-03-10. Viewer shows "10 Mar 2015", probably the creation date; the body uses later terminology ("AGI alignment"), so the cached wording may be a later revision. Comments on the page are by others. Retrieved 2026-10-06, SHA-256 `f5f43a86f8b37ec8…`. <https://arbital.greaterwrong.com/p/orthogonality/>
- `doc-arbital-programmer-deception`: Eliezer Yudkowsky, “Programmer deception”, Arbital (GreaterWrong viewer), 2015-07-16. Viewer shows "16 Jul 2015"; creation or last edit not stated. Retrieved 2026-10-06, SHA-256 `0288467b384ce543…`. <https://arbital.greaterwrong.com/p/programmer_deception/>
- `doc-cev`: Eliezer Yudkowsky, “Coherent Extrapolated Volition”, Singularity Institute, MIRI reprint, 2004-05. Text states "The information is current as of May 2004"; reprint citation gives 2004. Retrieved 2026-10-06, SHA-256 `11b2d4bc7d64dc01…`. <https://intelligence.org/files/CEV.pdf>
- `doc-cfai`: Eliezer Yudkowsky, “Creating Friendly AI 1.0: The Analysis and Design of Benevolent Goal Architectures”, Singularity Institute, MIRI reprint, 2001-06-15. Release date from the reprint; an open-commentary version was announced on SL4 on 2001-04-18, so some wording may be earlier than this date. Reprint wording is not authenticated for 2001 unless a capture was compared. Retrieved 2026-10-06, SHA-256 `51f21b8b70c2b732…`. <https://intelligence.org/files/CFAI.pdf>
- `doc-iem`: Eliezer Yudkowsky, “Intelligence Explosion Microeconomics”, MIRI Technical Report 2013-1, 2013-09-13. Report states "Last modified September 13, 2013"; first released April 2013. Retrieved 2026-10-06, SHA-256 `1fbf547c811aadb7…`. <https://intelligence.org/files/IEM.pdf>
- `doc-sits-2000-capture`: Eliezer Yudkowsky, “Staring into the Singularity 1.2.1”, sysopmind.com (Wayback capture 2000-12-04), 2000-08-31. Page states Created 11/18/1996 and the captured version is 1.2.1; 1996 wording is not captured. Retrieved 2026-10-06, SHA-256 `a883c7d611f7d6f5…`. <https://web.archive.org/web/20001204213100/http://sysopmind.com:80/singularity.html>
- `doc-time-2023`: Eliezer Yudkowsky, “Pausing AI Developments Isn't Enough. We Need to Shut it All Down”, TIME, 2023-03-29. Page metadata datePublished 2023-03-29T22:01:58Z. The page title currently reads "The Only Way to Deal With the Threat From AI? Shut It Down"; the headline is the one crossposted to LessWrong on 2023-04-08. Retrieved 2026-10-06, SHA-256 `4a8c77e15456ca68…`. <https://time.com/6266923/ai-eliezer-yudkowsky-open-letter-not-enough/>
- `ext-extropians.1Q00-4837`: Eliezer Yudkowsky, “Re: Otter vs. Yudkowsky”, Extropians mailing list, 2000-03-14. Archive author index lists the message as "Tue Mar 14 2000 - 00:26:34 MST" under "Eliezer S. Yudkowsky". Retrieved 2026-10-07, SHA-256 `c16c8df4f19630c3…`. <http://extropians.weidai.com/extropians.1Q00/4837.html>
- `ext-extropians.1Q00-5105`: Eliezer Yudkowsky, “Re: regarding the Eliezer vrs. Otter debate...”, Extropians mailing list, 2000-03-16. Archive author index lists the message as "Thu Mar 16 2000 - 16:43:29 MST" under "Eliezer S. Yudkowsky". Retrieved 2026-10-07, SHA-256 `1f9eea6e779673fd…`. <http://extropians.weidai.com/extropians.1Q00/5105.html>
- `ext-extropians.1Q99-0160`: Eliezer Yudkowsky, “Re: Paths to Uploading”, Extropians mailing list, 1999-01-06. Archive author index lists the message as "1999-01-06" under "Eliezer S. Yudkowsky". Retrieved 2026-10-07, SHA-256 `54aacc749efff726…`. <http://extropians.weidai.com/extropians.1Q99/0160.html>
- `ext-extropians.1Q99-2293`: Eliezer Yudkowsky, “Re: FAQ Additions (Posthuman mind control)”, Extropians mailing list, 1999-02-24. Archive author index lists the message as "1999-02-24" under "Eliezer S. Yudkowsky". Retrieved 2026-10-07, SHA-256 `0b8a3410b156a896…`. <http://extropians.weidai.com/extropians.1Q99/2293.html>
- `ext-extropians.2Q99-0310`: Eliezer Yudkowsky, “Re: Geniebusters”, Extropians mailing list, 1999-04-08. Archive author index lists the message as "1999-04-08" under "Eliezer S. Yudkowsky". Retrieved 2026-10-07, SHA-256 `789309c9bcf6ac52…`. <http://extropians.weidai.com/extropians.2Q99/0310.html>
- `ext-extropians.3Q00-4277`: Eliezer Yudkowsky, “Re: Why would AI want to be friendly? (Was: Congratulations to Eli,Brian ...)”, Extropians mailing list, 2000-09-05. Archive author index lists the message as "Tue Sep 05 2000 - 12:19:43 MDT" under "Eliezer S. Yudkowsky". Retrieved 2026-10-07, SHA-256 `817049e5c2b33859…`. <http://extropians.weidai.com/extropians.3Q00/4277.html>
- `ext-extropians.3Q00-4292`: Eliezer Yudkowsky, “Re: Why would AI want to be friendly? (Was: Congratulations to Eli,Brian ...)”, Extropians mailing list, 2000-09-05. Archive author index lists the message as "Tue Sep 05 2000 - 15:55:19 MDT" under "Eliezer S. Yudkowsky". Retrieved 2026-10-07, SHA-256 `028f05c2f60379be…`. <http://extropians.weidai.com/extropians.3Q00/4292.html>
- `ext-extropians.3Q00-6073`: Eliezer Yudkowsky, “Eugene's nuclear threat”, Extropians mailing list, 2000-09-29. Archive author index lists the message as "Fri Sep 29 2000 - 10:50:28 MDT" under "Eliezer S. Yudkowsky". Retrieved 2026-10-07, SHA-256 `d8cd64ecadafc77d…`. <http://extropians.weidai.com/extropians.3Q00/6073.html>
- `ext-extropians.3Q00-6080`: Eliezer Yudkowsky, “Re: Eugene's nuclear threat”, Extropians mailing list, 2000-09-29. Archive author index lists the message as "Fri Sep 29 2000 - 11:43:19 MDT" under "Eliezer S. Yudkowsky". Retrieved 2026-10-07, SHA-256 `50b829ded65f6c39…`. <http://extropians.weidai.com/extropians.3Q00/6080.html>
- `ext-extropians.3Q97-4400`: Eliezer Yudkowsky, “Re: Singularity: Generation gap”, Extropians mailing list, 1997-09-25. Archive author index lists the message as "Thu, 25 Sep 1997 20:51:50 -0500" under "Eliezer S. Yudkowsky". Retrieved 2026-10-07, SHA-256 `d98cc8ba877260f0…`. <http://extropians.weidai.com/extropians.3Q97/4400.html>
- `ext-extropians.3Q97-4420`: Eliezer Yudkowsky, “Re: Singularity: Generation gap”, Extropians mailing list, 1997-09-26. Archive author index lists the message as "Fri, 26 Sep 1997 18:20:36 -0500" under "Eliezer S. Yudkowsky". Retrieved 2026-10-07, SHA-256 `4553a5e84750edd9…`. <http://extropians.weidai.com/extropians.3Q97/4420.html>
- `ext-extropians.3Q98-2171`: Eliezer Yudkowsky, “Singularity, Breaker of Dreams”, Extropians mailing list, 1998-09-07. Archive author index lists the message as "1998-09-07" under "Eliezer S. Yudkowsky". Retrieved 2026-10-07, SHA-256 `90f1c04a6b9cd36a…`. <http://extropians.weidai.com/extropians.3Q98/2171.html>
- `ext-extropians.3Q98-2235`: Eliezer Yudkowsky, “Re: Human AI to superhuman (Re: Max More)”, Extropians mailing list, 1998-09-08. Archive author index lists the message as "1998-09-08" under "Eliezer S. Yudkowsky". Retrieved 2026-10-07, SHA-256 `037beff4d4007cec…`. <http://extropians.weidai.com/extropians.3Q98/2235.html>
- `ext-extropians.3Q98-2411`: Eliezer Yudkowsky, “Re: AI Prime Directive”, Extropians mailing list, 1998-09-15. Archive author index lists the message as "1998-09-15" under "Eliezer S. Yudkowsky". Retrieved 2026-10-07, SHA-256 `031d6e7ac1605223…`. <http://extropians.weidai.com/extropians.3Q98/2411.html>
- `ext-extropians.3Q98-2487`: Eliezer Yudkowsky, “Re: Singularity: The Moore's Law Argument”, Extropians mailing list, 1998-09-18. Archive author index lists the message as "1998-09-18" under "Eliezer S. Yudkowsky". Retrieved 2026-10-07, SHA-256 `6b53d7a85ac8fa35…`. <http://extropians.weidai.com/extropians.3Q98/2487.html>
- `ext-extropians.3Q99-1386`: Eliezer Yudkowsky, “Re: IA vs. AI was: longevity vs singularity”, Extropians mailing list, 1999-08-01. Archive author index lists the message as "1999-08-01" under "Eliezer S. Yudkowsky". Retrieved 2026-10-07, SHA-256 `8bcb591200086e9c…`. <http://extropians.weidai.com/extropians.3Q99/1386.html>
- `ext-extropians.3Q99-1487`: Eliezer Yudkowsky, “Re: IA vs. AI (vs. humanity)”, Extropians mailing list, 1999-08-03. Archive author index lists the message as "1999-08-03" under "Eliezer S. Yudkowsky". Retrieved 2026-10-07, SHA-256 `9234ee148973e0bf…`. <http://extropians.weidai.com/extropians.3Q99/1487.html>
- `ext-extropians.3Q99-1587`: Eliezer Yudkowsky, “Re: Does a parental model work for having A.I. that can be trusted?”, Extropians mailing list, 1999-08-04. Archive author index lists the message as "1999-08-04" under "Eliezer S. Yudkowsky". Retrieved 2026-10-07, SHA-256 `3b2d6b2b2285f03c…`. <http://extropians.weidai.com/extropians.3Q99/1587.html>
- `ext-extropians.3Q99-1589`: Eliezer Yudkowsky, “Re: Does a parental model work for having A.I. that can be trusted?”, Extropians mailing list, 1999-08-04. Archive author index lists the message as "1999-08-04" under "Eliezer S. Yudkowsky". Retrieved 2026-10-07, SHA-256 `6b82e1b19b4c1a8d…`. <http://extropians.weidai.com/extropians.3Q99/1589.html>
- `ext-extropians.3Q99-1591`: Eliezer Yudkowsky, “Re: Does a parental model work for having A.I. that can be trusted?”, Extropians mailing list, 1999-08-04. Archive author index lists the message as "1999-08-04" under "Eliezer S. Yudkowsky". Retrieved 2026-10-07, SHA-256 `ecb90ac102a7850f…`. <http://extropians.weidai.com/extropians.3Q99/1591.html>
- `ext-extropians.3Q99-2783`: Eliezer Yudkowsky, “Re: SI Comparative Advantage [was Re: Free Will]”, Extropians mailing list, 1999-08-25. Archive author index lists the message as "1999-08-25" under "Eliezer S. Yudkowsky". Retrieved 2026-10-07, SHA-256 `7618c597242da2ca…`. <http://extropians.weidai.com/extropians.3Q99/2783.html>
- `ext-extropians.4Q98-2153`: Eliezer Yudkowsky, “Singularity: AI Morality”, Extropians mailing list, 1998-12-06. Archive author index lists the message as "1998-12-06" under "Eliezer S. Yudkowsky". Retrieved 2026-10-07, SHA-256 `b39ca9105467de7c…`. <http://extropians.weidai.com/extropians.4Q98/2153.html>
- `ext-extropians.4Q99-1086`: Eliezer Yudkowsky, “Re: >H: The next 100 months”, Extropians mailing list, 1999-10-21. Archive author index lists the message as "1999-10-21" under "Eliezer S. Yudkowsky". Retrieved 2026-10-07, SHA-256 `888f7908b8df78f6…`. <http://extropians.weidai.com/extropians.4Q99/1086.html>
- `ext-extropians.96-2941`: Eliezer Yudkowsky, “Re: Zones of Thought (was Zindell's _The Wild_)”, Extropians mailing list, 1996-11-13. Archive author index lists the message as "Wed, 13 Nov 1996 18:57:33 -0600" under "Eliezer Yudkowsky". Retrieved 2026-10-07, SHA-256 `7240bebd2c05b2b4…`. <http://extropians.weidai.com/extropians.96/2941.html>
- `ext-extropians.96-3042`: Eliezer Yudkowsky, “Re: extropians-digest V1 #110”, Extropians mailing list, 1996-11-16. Archive author index lists the message as "Sat, 16 Nov 1996 22:37:39 -0600" under "Eliezer Yudkowsky". Retrieved 2026-10-07, SHA-256 `503a92b7b1ebb620…`. <http://extropians.weidai.com/extropians.96/3042.html>
- `ext-extropians.96-3124`: Eliezer Yudkowsky, “Sites: Staring Into The Singularity & Algernon's Law”, Extropians mailing list, 1996-11-19. Archive author index lists the message as "Tue, 19 Nov 1996 00:05:33 -0600" under "Eliezer Yudkowsky". Retrieved 2026-10-07, SHA-256 `0bacab6a1037b4d8…`. <http://extropians.weidai.com/extropians.96/3124.html>
- `ext-extropians.96-3178`: Eliezer Yudkowsky, “Interim purpose”, Extropians mailing list, 1996-11-22. Archive author index lists the message as "Fri, 22 Nov 1996 02:36:13 -0600" under "Eliezer Yudkowsky". Retrieved 2026-10-07, SHA-256 `452d4b67965a56be…`. <http://extropians.weidai.com/extropians.96/3178.html>
- `ext-extropians.96-3184`: Eliezer Yudkowsky, “Re: Survival ethic (U-Prime)”, Extropians mailing list, 1996-11-22. Archive author index lists the message as "Fri, 22 Nov 1996 12:23:14 -0600" under "Eliezer Yudkowsky". Retrieved 2026-10-07, SHA-256 `ec515fb0c021e06a…`. <http://extropians.weidai.com/extropians.96/3184.html>
- `ext-extropians.96-3761`: Eliezer Yudkowsky, “Re: Trans- vs. Non-human”, Extropians mailing list, 1996-12-08. Archive author index lists the message as "Sun, 08 Dec 1996 22:39:23 -0600" under "Eliezer Yudkowsky". Retrieved 2026-10-07, SHA-256 `71eb2c8e94ab52e2…`. <http://extropians.weidai.com/extropians.96/3761.html>
- `ext-extropians.96-5142`: Eliezer Yudkowsky, “Re: Goal-based AI”, Extropians mailing list, 1996-12-31. Archive author index lists the message as "Tue, 31 Dec 1996 10:40:10 -0600" under "Eliezer Yudkowsky". Retrieved 2026-10-07, SHA-256 `ec8f3d5b7d58bd04…`. <http://extropians.weidai.com/extropians.96/5142.html>
- `ext-extropians.96-5159`: Eliezer Yudkowsky, “Re: Goal-based AI”, Extropians mailing list, 1996-12-31. Archive author index lists the message as "Tue, 31 Dec 1996 14:50:37 -0600" under "Eliezer Yudkowsky". Retrieved 2026-10-07, SHA-256 `8ec805fbef6e0e41…`. <http://extropians.weidai.com/extropians.96/5159.html>
- `lw-4ARaTpNX62uaL86j6`: Eliezer Yudkowsky, “The Hidden Complexity of Wishes”, Overcoming Bias, as imported to LessWrong, 2007-11-24. LessWrong postedAt of an imported Overcoming Bias post (Overcoming Bias date). Current content version 1.4.0. Retrieved 2026-10-06, SHA-256 `4512581ba1460d48…`. <https://www.lesswrong.com/posts/4ARaTpNX62uaL86j6/the-hidden-complexity-of-wishes>
- `lw-5CfBDiQNg9upfipWk`: Eliezer Yudkowsky, “Only Law Can Prevent Extinction”, LessWrong, 2026-04-13. LessWrong postedAt. Current content version 1.0.0. Retrieved 2026-10-06, SHA-256 `4c60942525d2b7c9…`. <https://www.lesswrong.com/posts/5CfBDiQNg9upfipWk/only-law-can-prevent-extinction>
- `lw-7im8at9PmhbT4JHsW`: Eliezer Yudkowsky, “Ngo and Yudkowsky on alignment difficulty”, LessWrong, 2021-11-15. LessWrong postedAt. Current content version 1.0.0. multi-author post; primary poster eliezer_yudkowsky; only turns attributed to Yudkowsky are quoted. Retrieved 2026-10-06, SHA-256 `e9897f317f4628db…`. <https://www.lesswrong.com/posts/7im8at9PmhbT4JHsW/ngo-and-yudkowsky-on-alignment-difficulty>
- `lw-9HGR5qatMGoz4GhKj`: Eliezer Yudkowsky, “Above-Average AI Scientists”, Overcoming Bias, as imported to LessWrong, 2008-09-28. LessWrong postedAt of an imported Overcoming Bias post (Overcoming Bias date). Current content version 1.0.0. Retrieved 2026-10-06, SHA-256 `9a51493ef4509968…`. <https://www.lesswrong.com/posts/9HGR5qatMGoz4GhKj/above-average-ai-scientists>
- `lw-BEtzRE2M5m9YEAQpX`: Eliezer Yudkowsky, “There's No Fire Alarm for Artificial General Intelligence”, LessWrong, 2017-10-13. LessWrong postedAt. Current content version 1.0.0. Retrieved 2026-10-06, SHA-256 `cfa915be6c74c0b6…`. <https://www.lesswrong.com/posts/BEtzRE2M5m9YEAQpX/there-s-no-fire-alarm-for-artificial-general-intelligence>
- `lw-CpvyhFy9WvCNsifkY`: Eliezer Yudkowsky, “Discussion with Eliezer Yudkowsky on AGI interventions”, LessWrong, 2021-11-11. LessWrong postedAt. Current content version 1.4.0. multi-author post; primary poster robbbb; only turns attributed to Yudkowsky are quoted. Retrieved 2026-10-06, SHA-256 `5f2cfbd1537784cd…`. <https://www.lesswrong.com/posts/CpvyhFy9WvCNsifkY/discussion-with-eliezer-yudkowsky-on-agi-interventions>
- `lw-F8sfrbPjCQj4KwJqn`: Eliezer Yudkowsky, “The Sun is big, but superintelligences will not spare Earth a little sunlight”, LessWrong, 2024-09-23. LessWrong postedAt. Current content version 1.3.0. Retrieved 2026-10-06, SHA-256 `881be7a5cae306c0…`. <https://www.lesswrong.com/posts/F8sfrbPjCQj4KwJqn/the-sun-is-big-but-superintelligences-will-not-spare-earth-a>
- `lw-GNnHHmm8EzePmKzPk`: Eliezer Yudkowsky, “Value is Fragile”, Overcoming Bias, as imported to LessWrong, 2009-01-29. LessWrong postedAt of an imported Overcoming Bias post (Overcoming Bias date). Current content version 1.0.0. Retrieved 2026-10-06, SHA-256 `225766c56012e337…`. <https://www.lesswrong.com/posts/GNnHHmm8EzePmKzPk/value-is-fragile>
- `lw-JBadX7rwdcRFzGuju`: Eliezer Yudkowsky, “Recursive Self-Improvement”, Overcoming Bias, as imported to LessWrong, 2008-12-01. LessWrong postedAt of an imported Overcoming Bias post (Overcoming Bias date). Current content version 1.0.0. Retrieved 2026-10-06, SHA-256 `34ea901661c80359…`. <https://www.lesswrong.com/posts/JBadX7rwdcRFzGuju/recursive-self-improvement>
- `lw-LNKh22Crr5ujT85YM`: Eliezer Yudkowsky, “After critical event W happens, they still won't believe you”, LessWrong, 2013-06-13. LessWrong postedAt. Current content version 1.0.0. Retrieved 2026-10-06, SHA-256 `b5d92ab3f949ac38…`. <https://www.lesswrong.com/posts/LNKh22Crr5ujT85YM/after-critical-event-w-happens-they-still-won-t-believe-you>
- `lw-PCfaLLtuxes6Jk4S2`: Eliezer Yudkowsky, “Fighting a Rearguard Action Against the Truth”, Overcoming Bias, as imported to LessWrong, 2008-09-24. LessWrong postedAt of an imported Overcoming Bias post (Overcoming Bias date). Current content version 1.0.0. Retrieved 2026-10-06, SHA-256 `ca311369027c8858…`. <https://www.lesswrong.com/posts/PCfaLLtuxes6Jk4S2/fighting-a-rearguard-action-against-the-truth>
- `lw-PoDAyQMWEXBBBEJ5P`: Eliezer Yudkowsky, “Magical Categories”, Overcoming Bias, as imported to LessWrong, 2008-08-24. LessWrong postedAt of an imported Overcoming Bias post (Overcoming Bias date). Current content version 1.1.0. Retrieved 2026-10-06, SHA-256 `529c3fb6410363c2…`. <https://www.lesswrong.com/posts/PoDAyQMWEXBBBEJ5P/magical-categories>
- `lw-PtoQdG7E8MxYJrigu`: Eliezer Yudkowsky, “No Universally Compelling Arguments”, Overcoming Bias, as imported to LessWrong, 2008-06-26. LessWrong postedAt of an imported Overcoming Bias post (Overcoming Bias date). Current content version 1.1.0. Retrieved 2026-10-06, SHA-256 `437193a5a1540d06…`. <https://www.lesswrong.com/posts/PtoQdG7E8MxYJrigu/no-universally-compelling-arguments>
- `lw-S7csET9CgBtpi7sCh`: Eliezer Yudkowsky, “Challenges to Christiano’s capability amplification proposal”, LessWrong, 2018-05-19. LessWrong postedAt. Current content version 1.0.0. Retrieved 2026-10-06, SHA-256 `19de389fa9005f7c…`. <https://www.lesswrong.com/posts/S7csET9CgBtpi7sCh/challenges-to-christiano-s-capability-amplification-proposal>
- `lw-SwCwG9wZcAzQtckwx`: Eliezer Yudkowsky, “That Tiny Note of Discord”, Overcoming Bias, as imported to LessWrong, 2008-09-23. LessWrong postedAt of an imported Overcoming Bias post (Overcoming Bias date). Current content version 1.0.0. Retrieved 2026-10-06, SHA-256 `ef2eeb6057de3223…`. <https://www.lesswrong.com/posts/SwCwG9wZcAzQtckwx/that-tiny-note-of-discord>
- `lw-SwYBLQvo8MddDcCwz`: Eliezer Yudkowsky, “Cat-Belling Problems”, LessWrong, 2026-09-03. LessWrong postedAt. Current content version 1.6.0. Retrieved 2026-10-06, SHA-256 `2b09327bcfdb13e2…`. <https://www.lesswrong.com/posts/SwYBLQvo8MddDcCwz/cat-belling-problems>
- `lw-ax695frGJEzGxFBK4`: Eliezer Yudkowsky, “Biology-Inspired AGI Timelines: The Trick That Never Works”, LessWrong, 2021-12-01. LessWrong postedAt. Current content version 1.2.0. Retrieved 2026-10-06, SHA-256 `7d03bcd4a2d48500…`. <https://www.lesswrong.com/posts/ax695frGJEzGxFBK4/biology-inspired-agi-timelines-the-trick-that-never-works>
- `lw-cJX2ssssGoYqnijwi`: Eliezer Yudkowsky, “The Talker Does Not Control The Doer (in Current AIs)”, LessWrong, 2026-09-13. LessWrong postedAt. Current content version 1.7.0. Retrieved 2026-10-06, SHA-256 `172d8ecff9c433b2…`. <https://www.lesswrong.com/posts/cJX2ssssGoYqnijwi/the-talker-does-not-control-the-doer-in-current-ais>
- `lw-cSXZpvqpa9vbGGLtG`: Eliezer Yudkowsky, “Thou Art Godshatter”, Overcoming Bias, as imported to LessWrong, 2007-11-13. LessWrong postedAt of an imported Overcoming Bias post (Overcoming Bias date). Current content version 1.0.0. Retrieved 2026-10-06, SHA-256 `b6abf133e881a827…`. <https://www.lesswrong.com/posts/cSXZpvqpa9vbGGLtG/thou-art-godshatter>
- `lw-cnYHFNBF3kZEyx24v`: Eliezer Yudkowsky, “Ghosts in the Machine”, Overcoming Bias, as imported to LessWrong, 2008-06-17. LessWrong postedAt of an imported Overcoming Bias post (Overcoming Bias date). Current content version 1.0.0. Retrieved 2026-10-06, SHA-256 `e86e1702da19cf01…`. <https://www.lesswrong.com/posts/cnYHFNBF3kZEyx24v/ghosts-in-the-machine>
- `lw-fLRPeXihRaiRo5dyX`: Eliezer Yudkowsky, “The Magnitude of His Own Folly”, Overcoming Bias, as imported to LessWrong, 2008-09-30. LessWrong postedAt of an imported Overcoming Bias post (Overcoming Bias date). Current content version 1.0.0. Retrieved 2026-10-06, SHA-256 `b8248bdf153a9b56…`. <https://www.lesswrong.com/posts/fLRPeXihRaiRo5dyX/the-magnitude-of-his-own-folly>
- `lw-fbrz9xhKpEeTKw5zL`: Eliezer Yudkowsky, “Irretrievability; or, Murphy's Curse of Oneshotness upon ASI”, LessWrong, 2026-05-04. LessWrong postedAt. Current content version 1.11.0. Retrieved 2026-10-06, SHA-256 `18e1a43a5ee28ef8…`. <https://www.lesswrong.com/posts/fbrz9xhKpEeTKw5zL/irretrievability-or-murphy-s-curse-of-oneshotness-upon-asi>
- `lw-j9Q8bRmwCgXRYAgcJ`: Eliezer Yudkowsky, “MIRI announces new "Death With Dignity" strategy”, LessWrong, 2022-04-02. LessWrong postedAt. Current content version 1.6.0. Retrieved 2026-10-06, SHA-256 `837d23194d166460…`. <https://www.lesswrong.com/posts/j9Q8bRmwCgXRYAgcJ/miri-announces-new-death-with-dignity-strategy>
- `lw-keiYkaeoLHoKK4LYA`: Eliezer Yudkowsky, “Six Dimensions of Operational Adequacy in AGI Projects”, LessWrong, 2022-05-30. LessWrong postedAt. Current content version 1.1.1. Retrieved 2026-10-06, SHA-256 `30f88ccb952602dd…`. <https://www.lesswrong.com/posts/keiYkaeoLHoKK4LYA/six-dimensions-of-operational-adequacy-in-agi-projects>
- `lw-nH4c3Q9t9F3nJ7y8W`: Eliezer Yudkowsky, “GPTs are Predictors, not Imitators”, LessWrong, 2023-04-08. LessWrong postedAt. Current content version 1.1.0. Retrieved 2026-10-06, SHA-256 `24a41ca1ec6d0276…`. <https://www.lesswrong.com/posts/nH4c3Q9t9F3nJ7y8W/gpts-are-predictors-not-imitators>
- `lw-oDX5vcDTEei8WuoBx`: Eliezer Yudkowsky, “Re: recent Anthropic safety research”, LessWrong, 2025-08-06. LessWrong postedAt. Current content version 1.7.0. Retrieved 2026-10-06, SHA-256 `6d9a16d1be287ce9…`. <https://www.lesswrong.com/posts/oDX5vcDTEei8WuoBx/re-recent-anthropic-safety-research>
- `lw-rHBdcHGLJ7KvLJQPk`: Eliezer Yudkowsky, “The Logical Fallacy of Generalization from Fictional Evidence”, Overcoming Bias, as imported to LessWrong, 2007-10-16. LessWrong postedAt of an imported Overcoming Bias post (Overcoming Bias date). Current content version 2.0.0. Retrieved 2026-10-06, SHA-256 `53c3644a3afe461f…`. <https://www.lesswrong.com/posts/rHBdcHGLJ7KvLJQPk/the-logical-fallacy-of-generalization-from-fictional>
- `lw-rwkkcgSpnAyE8oNo3`: Eliezer Yudkowsky, “Alexander and Yudkowsky on AGI goals”, LessWrong, 2023-01-24. LessWrong postedAt. Current content version 1.0.0. multi-author post; primary poster scottalexander; only turns attributed to Yudkowsky are quoted. Retrieved 2026-10-06, SHA-256 `3be0140f09cb16ea…`. <https://www.lesswrong.com/posts/rwkkcgSpnAyE8oNo3/alexander-and-yudkowsky-on-agi-goals>
- `lw-sizjfDgCgAsuLJQmm`: Eliezer Yudkowsky, “Reply to Holden on 'Tool AI'”, LessWrong, 2012-06-12. LessWrong postedAt. Current content version 1.0.0. Retrieved 2026-10-06, SHA-256 `7c30462687492090…`. <https://www.lesswrong.com/posts/sizjfDgCgAsuLJQmm/reply-to-holden-on-tool-ai>
- `lw-tKa9Lebyebf6a7P2o`: Eliezer Yudkowsky, “The Rhythm of Disagreement”, Overcoming Bias, as imported to LessWrong, 2008-06-01. LessWrong postedAt of an imported Overcoming Bias post (Overcoming Bias date). Current content version 1.0.0. Retrieved 2026-10-06, SHA-256 `384ce0635ee97210…`. <https://www.lesswrong.com/posts/tKa9Lebyebf6a7P2o/the-rhythm-of-disagreement>
- `lw-tcCxPLBrEXdxN5HCQ`: Eliezer Yudkowsky, “Shah and Yudkowsky on alignment failures”, LessWrong, 2022-02-28. LessWrong postedAt. Current content version 1.1.0. multi-author post; primary poster rohinmshah; only turns attributed to Yudkowsky are quoted. Retrieved 2026-10-06, SHA-256 `92623cf383214396…`. <https://www.lesswrong.com/posts/tcCxPLBrEXdxN5HCQ/shah-and-yudkowsky-on-alignment-failures>
- `lw-tjH8XPxAnr6JRbh7k`: Eliezer Yudkowsky, “Hard Takeoff”, Overcoming Bias, as imported to LessWrong, 2008-12-02. LessWrong postedAt of an imported Overcoming Bias post (Overcoming Bias date). Current content version 1.0.0. Retrieved 2026-10-06, SHA-256 `5a68e4ef17e8c694…`. <https://www.lesswrong.com/posts/tjH8XPxAnr6JRbh7k/hard-takeoff>
- `lw-uMQ3cqWDPHhjtiesc`: Eliezer Yudkowsky, “AGI Ruin: A List of Lethalities”, LessWrong, 2022-06-05. LessWrong postedAt. Current content version 1.3.0. Retrieved 2026-10-06, SHA-256 `b36f38a6fd1020bf…`. <https://www.lesswrong.com/posts/uMQ3cqWDPHhjtiesc/agi-ruin-a-list-of-lethalities>
- `lw-vwLxd6hhFvPbvKmBH`: Eliezer Yudkowsky, “Yudkowsky and Christiano discuss "Takeoff Speeds"”, LessWrong, 2021-11-22. LessWrong postedAt. Current content version 1.0.0. Retrieved 2026-10-06, SHA-256 `92f8e39af112cd6d…`. <https://www.lesswrong.com/posts/vwLxd6hhFvPbvKmBH/yudkowsky-and-christiano-discuss-takeoff-speeds>
- `lw-wKnwcjJGriTS9QxxL`: Eliezer Yudkowsky, “Dreams of Friendliness”, Overcoming Bias, as imported to LessWrong, 2008-08-31. LessWrong postedAt of an imported Overcoming Bias post (Overcoming Bias date). Current content version 1.1.0. Retrieved 2026-10-06, SHA-256 `fd5c89f98d714963…`. <https://www.lesswrong.com/posts/wKnwcjJGriTS9QxxL/dreams-of-friendliness>
- `lw-z3kYdw54htktqt9Jb`: Eliezer Yudkowsky, “What I Think, If Not Why”, Overcoming Bias, as imported to LessWrong, 2008-12-11. LessWrong postedAt of an imported Overcoming Bias post (Overcoming Bias date). Current content version 1.0.0. Retrieved 2026-10-06, SHA-256 `d88333aee9abdfc2…`. <https://www.lesswrong.com/posts/z3kYdw54htktqt9Jb/what-i-think-if-not-why>
- `sl4-0007-0017`: Eliezer Yudkowsky, “Re: [SL4] Programmed morality”, SL4 mailing list, 2000-07-09. Archive author index lists the message as "Sun Jul 09 2000 - 13:53:37 MDT" under "Eliezer S. Yudkowsky". Retrieved 2026-10-07, SHA-256 `d84ecf10c4cf385e…`. <http://sl4.org/archive/0007/0017.html>
- `sl4-0007-0023`: Eliezer Yudkowsky, “[SL4] AI flight recorder”, SL4 mailing list, 2000-07-20. Archive author index lists the message as "Thu Jul 20 2000 - 22:10:13 MDT" under "Eliezer S. Yudkowsky". Retrieved 2026-10-07, SHA-256 `ee21245311ff2a29…`. <http://sl4.org/archive/0007/0023.html>
- `sl4-0008-0046`: Eliezer Yudkowsky, “Re: [SL4] Employment vs. Singularity”, SL4 mailing list, 2000-08-21. Archive author index lists the message as "Mon Aug 21 2000 - 00:41:14 MDT" under "Eliezer S. Yudkowsky". Retrieved 2026-10-07, SHA-256 `aa21839afaeb0cb5…`. <http://sl4.org/archive/0008/0046.html>
- `sl4-0009-0086`: Eliezer Yudkowsky, “Re:”, SL4 mailing list, 2000-09-16. Archive author index lists the message as "Sat Sep 16 2000 - 18:04:07 MDT" under "Eliezer S. Yudkowsky". Retrieved 2026-10-07, SHA-256 `5965cad23aa980dd…`. <http://sl4.org/archive/0009/0086.html>
- `sl4-0009-0092`: Eliezer Yudkowsky, “Re: Get it right the first time (Was: )”, SL4 mailing list, 2000-09-17. Archive author index lists the message as "Sun Sep 17 2000 - 10:19:16 MDT" under "Eliezer S. Yudkowsky". Retrieved 2026-10-07, SHA-256 `8e93327f82451a70…`. <http://sl4.org/archive/0009/0092.html>
- `sl4-0010-0125`: Eliezer Yudkowsky, “Re: Ben what are your views and concerns”, SL4 mailing list, 2000-10-03. Archive author index lists the message as "Tue Oct 03 2000 - 22:53:59 MDT" under "Eliezer S. Yudkowsky". Retrieved 2026-10-07, SHA-256 `8aefc21492cd1992…`. <http://sl4.org/archive/0010/0125.html>
- `sl4-0011-0181`: Eliezer Yudkowsky, “Re: Ben's "Extropian Creed"”, SL4 mailing list, 2000-11-13. Archive author index lists the message as "Mon Nov 13 2000 - 22:45:54 MST" under "Eliezer S. Yudkowsky". Retrieved 2026-10-07, SHA-256 `22277544b5e518ca…`. <http://sl4.org/archive/0011/0181.html>
- `sl4-0011-0240`: Eliezer Yudkowsky, “Re: Evolving minds”, SL4 mailing list, 2000-11-18. Archive author index lists the message as "Sat Nov 18 2000 - 12:34:51 MST" under "Eliezer S. Yudkowsky". Retrieved 2026-10-07, SHA-256 `6b172d23654e038d…`. <http://sl4.org/archive/0011/0240.html>
- `sl4-0012-0355`: Eliezer Yudkowsky, “Revising a Friendly AI”, SL4 mailing list, 2000-12-10. Archive author index lists the message as "Sun Dec 10 2000 - 19:56:20 MST" under "Eliezer S. Yudkowsky". Retrieved 2026-10-07, SHA-256 `4fb349f96304ea9c…`. <http://sl4.org/archive/0012/0355.html>
- `sl4-0012-0381`: Eliezer Yudkowsky, “Re: Revising a Friendly AI”, SL4 mailing list, 2000-12-12. Archive author index lists the message as "Tue Dec 12 2000 - 17:42:04 MST" under "Eliezer S. Yudkowsky". Retrieved 2026-10-07, SHA-256 `5841a35e50411bec…`. <http://sl4.org/archive/0012/0381.html>
- `sl4-0101-0452`: Eliezer Yudkowsky, “Re: Event horizon”, SL4 mailing list, 2001-01-24. Archive author index lists the message as "Wed Jan 24 2001 - 09:12:47 MST" under "Eliezer S. Yudkowsky". Retrieved 2026-10-07, SHA-256 `6e3df1b9e89c642e…`. <http://sl4.org/archive/0101/0452.html>
- `sl4-0102-0539`: Eliezer Yudkowsky, “Re: Beyond evolution”, SL4 mailing list, 2001-02-04. Archive author index lists the message as "Sun Feb 04 2001 - 21:48:41 MST" under "Eliezer S. Yudkowsky". Retrieved 2026-10-07, SHA-256 `52b0e09dc587e4df…`. <http://sl4.org/archive/0102/0539.html>
- `sl4-0102-0542`: Eliezer Yudkowsky, “Re: Beyond evolution”, SL4 mailing list, 2001-02-05. Archive author index lists the message as "Mon Feb 05 2001 - 10:57:20 MST" under "Eliezer S. Yudkowsky". Retrieved 2026-10-07, SHA-256 `d6b0fc61bd6dd6ab…`. <http://sl4.org/archive/0102/0542.html>
- `sl4-0102-0545`: Eliezer Yudkowsky, “Re: Learning to be evil”, SL4 mailing list, 2001-02-07. Archive author index lists the message as "Wed Feb 07 2001 - 21:09:16 MST" under "Eliezer S. Yudkowsky". Retrieved 2026-10-07, SHA-256 `8b0b5d5e8516ba9d…`. <http://sl4.org/archive/0102/0545.html>
- `sl4-0102-0594`: Eliezer Yudkowsky, “Re: Military in or out?”, SL4 mailing list, 2001-02-25. Archive author index lists the message as "Sun Feb 25 2001 - 11:44:18 MST" under "Eliezer S. Yudkowsky". Retrieved 2026-10-07, SHA-256 `118185c7799c0d30…`. <http://sl4.org/archive/0102/0594.html>
- `sl4-0102-0603`: Eliezer Yudkowsky, “Re: Military in or out?”, SL4 mailing list, 2001-02-26. Archive author index lists the message as "Mon Feb 26 2001 - 00:51:15 MST" under "Eliezer S. Yudkowsky". Retrieved 2026-10-07, SHA-256 `01706f65393721bb…`. <http://sl4.org/archive/0102/0603.html>
- `sl4-0104-0956`: Eliezer Yudkowsky, “Re: Singularity intros (was: Si definition of Friendliess)”, SL4 mailing list, 2001-04-06. Archive author index lists the message as "Fri Apr 06 2001 - 16:53:20 MDT" under "Eliezer S. Yudkowsky". Retrieved 2026-10-07, SHA-256 `42ba5e88fcbf40f6…`. <http://sl4.org/archive/0104/0956.html>
- `sl4-0104-1019`: Eliezer Yudkowsky, “Re: Threats (was Theoretical question for the list: publicity?)”, SL4 mailing list, 2001-04-08. Archive author index lists the message as "Sun Apr 08 2001 - 09:50:57 MDT" under "Eliezer S. Yudkowsky". Retrieved 2026-10-07, SHA-256 `06d2f3d883e79996…`. <http://sl4.org/archive/0104/1019.html>
- `sl4-0104-1076`: Eliezer Yudkowsky, “Re: Open Source Friendly AI? (was Singularity and the generalpublic)”, SL4 mailing list, 2001-04-12. Archive author index lists the message as "Thu Apr 12 2001 - 23:58:35 MDT" under "Eliezer S. Yudkowsky". Retrieved 2026-10-07, SHA-256 `4e3a019e1008dc17…`. <http://sl4.org/archive/0104/1076.html>
- `sl4-0104-1166`: Eliezer Yudkowsky, “Re: FW: Group releases "Friendly AI"”, SL4 mailing list, 2001-04-19. Archive author index lists the message as "Thu Apr 19 2001 - 14:41:14 MDT" under "Eliezer S. Yudkowsky". Retrieved 2026-10-07, SHA-256 `938de0d8b18e9eb6…`. <http://sl4.org/archive/0104/1166.html>
- `sl4-0108-2031`: Eliezer Yudkowsky, “Re: Floppy take-off”, SL4 mailing list, 2001-08-01. Archive author index lists the message as "Wed Aug 01 2001 - 19:08:09 MDT" under "Eliezer S. Yudkowsky". Retrieved 2026-10-07, SHA-256 `adeb9a557fd5acff…`. <http://sl4.org/archive/0108/2031.html>
- `sl4-0203-3148`: Eliezer Yudkowsky, “Re: Novamente goal system”, SL4 mailing list, 2002-03-09. Archive author index lists the message as "Sat Mar 09 2002 - 12:56:21 MST" under "Eliezer S. Yudkowsky". Retrieved 2026-10-07, SHA-256 `6da0fda25fe2709b…`. <http://sl4.org/archive/0203/3148.html>
- `sl4-0203-3160`: Eliezer Yudkowsky, “Webmind Inc. as social process”, SL4 mailing list, 2002-03-10. Archive author index lists the message as "Sun Mar 10 2002 - 18:33:00 MST" under "Eliezer S. Yudkowsky". Retrieved 2026-10-07, SHA-256 `ba58d9f9e3a0ce55…`. <http://sl4.org/archive/0203/3160.html>
- `sl4-0205-3551`: Eliezer Yudkowsky, “Re: supergoal stability”, SL4 mailing list, 2002-05-03. Archive author index lists the message as "Fri May 03 2002 - 16:38:46 MDT" under "Eliezer S. Yudkowsky". Retrieved 2026-10-07, SHA-256 `7669bc17ecbbc641…`. <http://sl4.org/archive/0205/3551.html>
- `sl4-0206-4208`: Eliezer Yudkowsky, “Re: Threats to the Singularity.”, SL4 mailing list, 2002-06-23. Archive author index lists the message as "Sun Jun 23 2002 - 08:16:52 MDT" under "Eliezer S. Yudkowsky". Retrieved 2026-10-07, SHA-256 `b33257954ad3d032…`. <http://sl4.org/archive/0206/4208.html>
- `sl4-0206-4219`: Eliezer Yudkowsky, “Re: Seed AI (was: How hard a Singularity?)”, SL4 mailing list, 2002-06-23. Archive author index lists the message as "Sun Jun 23 2002 - 11:56:42 MDT" under "Eliezer S. Yudkowsky". Retrieved 2026-10-07, SHA-256 `8fd31c8bb942dfb3…`. <http://sl4.org/archive/0206/4219.html>
- `sl4-0206-4453`: Eliezer Yudkowsky, “Re: Military Friendly AI”, SL4 mailing list, 2002-06-27. Archive author index lists the message as "Thu Jun 27 2002 - 11:53:11 MDT" under "Eliezer S. Yudkowsky". Retrieved 2026-10-07, SHA-256 `e078235c39cd3f33…`. <http://sl4.org/archive/0206/4453.html>
- `sl4-0207-4667`: Eliezer Yudkowsky, “Re: Seed AI (was: How hard a Singularity?)”, SL4 mailing list, 2002-07-02. Archive author index lists the message as "Tue Jul 02 2002 - 23:01:42 MDT" under "Eliezer S. Yudkowsky". Retrieved 2026-10-07, SHA-256 `4e8c20d1200d5589…`. <http://sl4.org/archive/0207/4667.html>
- `sl4-0209-5398`: Eliezer Yudkowsky, “Friendly AI communications issues (was: Consciousness)”, SL4 mailing list, 2002-09-10. Archive author index lists the message as "Tue Sep 10 2002 - 07:46:27 MDT" under "Eliezer S. Yudkowsky". Retrieved 2026-10-07, SHA-256 `32c5accbd16436be…`. <http://sl4.org/archive/0209/5398.html>
- `sl4-0209-5571`: Eliezer Yudkowsky, “Re: QUES: CFAI [#2]”, SL4 mailing list, 2002-09-19. Archive author index lists the message as "Thu Sep 19 2002 - 13:58:03 MDT" under "Eliezer S. Yudkowsky". Retrieved 2026-10-07, SHA-256 `7318ca77684fa4df…`. <http://sl4.org/archive/0209/5571.html>
- `sl4-0305-6783`: Eliezer Yudkowsky, “Re: Flight recorders in AIs”, SL4 mailing list, 2003-05-22. Archive author index lists the message as "Thu May 22 2003 - 02:42:16 MDT" under "Eliezer S. Yudkowsky". Retrieved 2026-10-07, SHA-256 `5985184ca685210c…`. <http://sl4.org/archive/0305/6783.html>
- `sl4-0305-6846`: Eliezer Yudkowsky, “Re: SIAI's flawed friendliness analysis”, SL4 mailing list, 2003-05-29. Archive author index lists the message as "Thu May 29 2003 - 15:14:45 MDT" under "Eliezer S. Yudkowsky". Retrieved 2026-10-07, SHA-256 `eaa61dd6ea6cfb71…`. <http://sl4.org/archive/0305/6846.html>
- `sl4-0405-8843`: Eliezer Yudkowsky, “Re: One or more AIs??”, SL4 mailing list, 2004-05-30. Archive author index lists the message as "Sun May 30 2004 - 01:39:50 MDT" under "Eliezer Yudkowsky". Retrieved 2026-10-07, SHA-256 `07611dc7c624bf18…`. <http://sl4.org/archive/0405/8843.html>
- `sl4-0406-8905`: Eliezer Yudkowsky, “Re: FAI: Collective Volition”, SL4 mailing list, 2004-06-01. Archive author index lists the message as "Tue Jun 01 2004 - 06:01:06 MDT" under "Eliezer Yudkowsky". Retrieved 2026-10-07, SHA-256 `802a4b6da51e23aa…`. <http://sl4.org/archive/0406/8905.html>
- `sl4-0412-10488`: Eliezer Yudkowsky, “Re: Conservative Estimation of the Economic Impact of Artificial Intelligence”, SL4 mailing list, 2004-12-29. Archive author index lists the message as "Wed Dec 29 2004 - 16:27:43 MST" under "Eliezer Yudkowsky". Retrieved 2026-10-07, SHA-256 `8bbed89ce0a4e5a2…`. <http://sl4.org/archive/0412/10488.html>
- `sl4-0501-10512`: Eliezer Yudkowsky, “Re: Definition of strong recursive self-improvement”, SL4 mailing list, 2005-01-02. Archive author index lists the message as "Sun Jan 02 2005 - 10:22:43 MST" under "Eliezer S. Yudkowsky". Retrieved 2026-10-07, SHA-256 `753a02b06929a0ef…`. <http://sl4.org/archive/0501/10512.html>
- `sl4-0507-11477`: Eliezer Yudkowsky, “Re: Fighting UFAI”, SL4 mailing list, 2005-07-13. Archive author index lists the message as "Wed Jul 13 2005 - 18:56:10 MDT" under "Eliezer S. Yudkowsky". Retrieved 2026-10-07, SHA-256 `1ba0e59335332102…`. <http://sl4.org/archive/0507/11477.html>
- `sl4-0507-11483`: Eliezer Yudkowsky, “Re: Fighting UFAI”, SL4 mailing list, 2005-07-13. Archive author index lists the message as "Wed Jul 13 2005 - 21:12:28 MDT" under "Eliezer S. Yudkowsky". Retrieved 2026-10-07, SHA-256 `7c6b98d1ab322db0…`. <http://sl4.org/archive/0507/11483.html>
- `sl4-0507-11765`: Eliezer Yudkowsky, “Re: 6 points about Coherent Extrapolated Volition”, SL4 mailing list, 2005-07-25. Archive author index lists the message as "Mon Jul 25 2005 - 09:49:15 MDT" under "Eliezer S. Yudkowsky". Retrieved 2026-10-07, SHA-256 `08cb8b0fc83f702f…`. <http://sl4.org/archive/0507/11765.html>
- `sl4-0508-11866`: Eliezer Yudkowsky, “Re: On Our Duty to Not Be Responsible for Artificial Minds”, SL4 mailing list, 2005-08-09. Archive author index lists the message as "Tue Aug 09 2005 - 11:09:46 MDT" under "Eliezer S. Yudkowsky". Retrieved 2026-10-07, SHA-256 `ef9312c8f14a4d44…`. <http://sl4.org/archive/0508/11866.html>
- `sl4-0602-14096`: Eliezer Yudkowsky, “Re: Singularity Institute: Likely to win the race to build GAI?”, SL4 mailing list, 2006-02-15. Archive author index lists the message as "Wed Feb 15 2006 - 10:47:28 MST" under "Eliezer S. Yudkowsky". Retrieved 2026-10-07, SHA-256 `e1b07a528bc9f5a3…`. <http://sl4.org/archive/0602/14096.html>
- `sl4-0606-15174`: Eliezer Yudkowsky, “Re: [agi] Two draft papers: AI and existential risk; heuristics and biases”, SL4 mailing list, 2006-06-06. Archive author index lists the message as "Tue Jun 06 2006 - 23:19:49 MDT" under "Eliezer S. Yudkowsky". Retrieved 2026-10-07, SHA-256 `c2e944580a586039…`. <http://sl4.org/archive/0606/15174.html>
- `sl4-0606-15271`: Eliezer Yudkowsky, “Re: Two draft papers: AI and existential risk; heuristics and biases”, SL4 mailing list, 2006-06-13. Archive author index lists the message as "Tue Jun 13 2006 - 00:34:22 MDT" under "Eliezer S. Yudkowsky". Retrieved 2026-10-07, SHA-256 `ec202f5e12518658…`. <http://sl4.org/archive/0606/15271.html>
- `sl4-0711-17248`: Eliezer Yudkowsky, “Re: UCaRtMaAI paper”, SL4 mailing list, 2007-11-24. Archive author index lists the message as "Sat Nov 24 2007 - 17:36:29 MST" under "Eliezer S. Yudkowsky". Retrieved 2026-10-07, SHA-256 `2c461930b012e60c…`. <http://sl4.org/archive/0711/17248.html>
- `sl4-0802-17621`: Eliezer Yudkowsky, “Re: Investing in FAI research: now vs. later.”, SL4 mailing list, 2008-02-11. Archive author index lists the message as "Mon Feb 11 2008 - 15:52:05 MST" under "Eliezer S. Yudkowsky". Retrieved 2026-10-07, SHA-256 `4631feaa749d8a50…`. <http://sl4.org/archive/0802/17621.html>
