# Policy review, 15 October 2026

The maintainer asked to question the reasons for Selekoa's standing policies and whether they still hold. This is a reading document, not a decision. Nothing in it is applied. Each section gives what the policy says, where it is recorded, why it was adopted, what has happened since, what it costs, whether the reason still holds, and a recommendation.

Summary of recommendations:

| Policy                                  | Recommendation                                                          |
| --------------------------------------- | ----------------------------------------------------------------------- |
| Quote limits                            | Adjust: keep per document (edition); scale the 400-word cap with length |
| Economics tier rule                     | Keep for now; separate author standing from form if it keeps costing    |
| "Earliest located", never "first"       | Keep; say "in tier 1" wherever a tier-1 role is shown                   |
| No ranking or comparison of developers  | Already adjusted (compare yes, rank no); keep the no-ranking part       |
| Machine-first; review-notice wording    | Keep the policy; change the notice                                      |
| Context-only passages never shown alone | Keep; watch for overuse                                                 |
| No browser storage (theme memory)       | Adjust: allow one stored theme choice, say so on About                  |
| Publication from a fresh-history repo   | Keep, but fix the policies that rely on Git history as the record       |
| Wikipedia never as evidence             | Keep                                                                    |
| Cross-family GPT check                  | Keep; tighten who adjudicates disagreements                             |

## 1. Quote limits

**What it says.** At most 50 words per quote; at most 400 quoted words from any one source document across the dataset; for a document under about 2,000 words, about 10% of it. Validation enforces both. Recorded in [editorial-policy](editorial-policy.md#short-quotation) (approved 2026-10-03; it replaced about five passages and 250 words per document).

**Original reason.** Selekoa quotes without permission. Its position rests on short, attributed quotation for commentary (fair use in the US; the quotation exception in the EU and UK). A fixed, machine-checked number keeps many agents from drifting into heavy copying, and keeps quotes out of the CC BY licence cleanly.

**What has happened since.**

- The [source-terms check](source-terms.md) (2026-10-12) found no publisher that forbids quotation; several have general "no copying" terms that do not address quotation. Everything depends on the statutory exceptions, as expected.
- The pre-launch trims (2026-10-13) cut 22 sources at or near their limits. For short mailing-list posts the 10% rule pushed quotes into fragments; several could not be cut further without losing a claim's subject or negation.
- The frontier-framework comparison needs 391–561 quoted words per edition once its passages are combined with the dataset's (`quotedWordsWithDataset`). The editions are 7,900–10,500 words, so 560 words is about 5–7% of the document. The flat 400 blocks this, even though the proportion is small.
- One author accounts for about a third of all quoted words; the policy does not cap that, and probably should not.

**Costs.** The flat cap penalises long documents and versioned history, which is the core product. The 10% rule fragments very short texts.

**Does the reason hold?** Yes for the purpose; the numbers are arbitrary. Neither the US nor the EU exception sets a word count: both look at amount relative to the whole and to the purpose. A flat 400 ignores length, which is the factor that matters.

**Options.**

- _Per edition_ (current: each edition is its own source). Keep. Each edition is a distinct work and is what a reader cites.
- _Per source family_ (all editions of one framework together). Reject. It would make edition-by-edition history impossible, and successive editions largely repeat each other's text, so quoting both does not take more of the publisher's work.
- _Fair-use reasoning plus takedown only._ Reject as the sole rule. It works for one careful author, not for many machine agents; a number that validation can check is the useful part. Keep the takedown contact as the backstop.
- _Scale with length._ For example: at most 400 words or 5% of the document, whichever is larger, with a hard ceiling (say 800); keep about 10% under 2,000 words, but allow one complete sentence of up to 25 words where 10% would leave a misleading fragment.

**Recommendation: adjust** (scale with length, per edition, short-text floor). Until decided, the comparison pack follows the working approach of 2026-10-15: reuse existing quotes, admit the most important facets first.

**Decided 2026-10-15.** Adjusted as recommended. Counting stays per document (each edition separately). From 2,000 words: 400 words or 5%, whichever is larger, at most 800. Under 2,000 words: about 10%, or one complete sentence of up to 25 words as the only quoted passage where 10% would leave a misleading fragment. Recorded in [editorial-policy](editorial-policy.md#short-quotation) and enforced by `withinQuotationLimit` in `src/domain/schema.ts`; every existing record still validates.

## 2. Tier rule for economics

**What it says.** Tier 1 is scholarly work by economists in any venue, with standing judged at the time of writing, plus anything in core economics venues; tier 2 is non-economists and short-form commentary even by economists. Earliest located is computed within tier 1; the tier-2 earliest is shown separately. Recorded as decision D2 in [the economics README](../research/economics-mainstream/README.md) and in [ontology](ontology.md); decisions of 2026-10-11 and 2026-10-12.

**Original reason.** The question is when and how _economics_ engaged with machine intelligence. A blog post by a physicist and an article in the _American Economic Review_ are different evidence for that.

**What has happened since.** The rule needed repeated adjudication within a week: Hanson 1994 (tier 2, no standing yet), Hanson 1998 (article tier 1, symposium comment tier 2 by form), the 2008 debate (tier 2), Hyytinen's KAK editorial (tier 2, then tier 1 by the core-venue clause). In the esoteric strand the tier-1 earliest holders date from 2015–2017 while tier-2 texts by an economist date from 1998–2008.

**Costs.** Judgement calls about who counts as an economist, made from homepages and vitae, sometimes through archive captures that cannot be re-read. Tier mixes two things, author standing and form, so a reader cannot tell which one placed a text in tier 2. A tier-1 headline can be misread as "economics started here".

**Does the reason hold?** Yes: the disciplinary question is real and the tier separates it honestly. The rule is not wrong, only compound.

**Options.** Keep. Or record standing and form as two separate attributes and derive the tier from them. Or drop tiers and show every text with labels.

**Recommendation: keep for now.** If more tier disputes come up, split standing and form into two attributes; the tier then follows mechanically and the reader sees why.

## 3. "Earliest located", never "first"

**What it says.** A collection names "Earliest located: …", meaning the earliest text the recorded searches found that meets the criterion. No "first", "coined" or "originated" unless a competent authority says so, attributed. Recorded in [editorial-policy](editorial-policy.md#earliest-located-texts).

**Original reason.** Searches are bounded. Priority claims are the most common error in intellectual history, and a machine-made priority claim would be the most damaging kind.

**What has happened since.** The policy has proved itself. The esoteric strand's E05 role (Nordhaus, 2015) would have read as "economists first noticed in 2015" while Hanson wrote on the topic in 1998; the economics-growth pack moved roles as earlier texts were found and tiers were settled. Each move was a correction, not an embarrassment, because nothing claimed priority.

**Costs.** Slightly clumsy headlines; some readers will read "earliest located" as "first" anyway.

**Recommendation: keep.** One adjustment: wherever a tier-1 role is shown, say "earliest located in tier 1" and show the tier-2 earliest beside it, so the 2015/1998 kind of gap is visible.

## 4. No ranking or comparison of developers

**What it says.** The frameworks page says it "does not compare or rank developers" (`src/reading/frontier-safety-frameworks.ts`).

**Original reason.** A published framework shows what a developer stated, not what it did. Comparisons invite scorecards and suggest equivalence between provisions that differ.

**What has happened since.** The fresh-eyes test found the missing cross-lab view was the main gap for a policy researcher. The comparison pack showed that provisions can be placed side by side without scores. On 2026-10-15 the maintainer decided yes to comparison in principle, after the restructure.

**Recommendation.** Already adjusted: compare, never rank. Keep the no-ranking part firmly: no totals, no colour scales, no ordering by counts, "not found" never shown as a failure.

## 5. Machine-first, no human review status, and the review notice

**What it says.** Research is machine-first; routine human spot-checks are not required. Records show "Not reviewed by an editor" (1,471 of 1,472 claims). A boxed notice on every page says the records "were found, dated and checked by machines… Selekoa offers them as a public service, and what you make of them is up to you." Recorded in [editorial-policy](editorial-policy.md#machine-first-risk-based-editorial-workflow) and `src/ui/ReviewNotice.tsx` (2026-10-13).

**Original reason.** A single maintainer cannot review thousands of claims. Saying so plainly is more honest than a review label that implies scrutiny that did not happen.

**What has happened since.** The fresh-eyes readers understood the machine-first status but found the repeated notice "wallpaper", read "Supported" next to "machine-checked" as authority, and found "Seed" jargon (since renamed).

**Costs.** A label that is the same on almost every record carries no information per record. "What you make of them is up to you" reads as a disclaimer, which works against the trust the rest of the site earns.

**Does the reason hold?** Yes. The policy is right; the presentation is not.

**Recommendation: keep the policy, change the notice.** One status line in the header (as the fresh-eyes proposal suggests), per-claim marks only for the exceptions (accepted claims, human-checked evidence), and drop "what you make of them is up to you" in favour of the concrete instruction to read the original source before relying on a claim.

**Decided 2026-10-15.** Changed as recommended. The boxed notice and the inner-page notice lines are gone, with the phrase "what you make of them is up to you". One line in the site header, on every page, reads: "Most records were found and checked by machines and have not been reviewed by an editor. Read the original source before you rely on a claim. How this was checked →"; the link opens the About section of that name (formerly "How records are made"). Per-claim marks stay limited to the exceptions (editorially accepted claims, human-reviewed evidence), which About lists under Current coverage.

## 6. Context-only passages are never shown alone

**What it says.** A passage flagged `contextOnly` (152 of 1,831 evidence items) is never shown without the context it requires, in the interface or in exports. Recorded in [ontology](ontology.md) (schema 2.12) and [dataset-format](dataset-format.md).

**Original reason.** A short quote can reverse its meaning when cut from a concession, a reported view or a conditional. The rule moves that risk out of every consuming application into the data.

**What has happened since.** The cross-family checks added many flags (20 in the esoteric strand) and refused almost as many (18). Most flags are justified. The short-quote limits make the problem worse: shorter quotes need context more often.

**Costs.** Every export and downstream app (for example "The Yudgment") must carry the context. If the flag spreads, it becomes a way of keeping a weak quote instead of choosing a better one.

**Recommendation: keep.** Add one editorial rule: before flagging, try a quote that does not need the flag.

## 7. No browser storage (theme memory)

**What it says.** The About page says the site "sets no cookies and stores nothing in your browser". The theme follows the system setting; a manual choice is forgotten on reload. Raised as open in [launch-readiness](launch-readiness.md).

**Original reason.** A clean privacy promise, simple to state and to check.

**Costs.** A reader who switches theme has to do it again on every visit; small, but noticeable.

**Does the reason hold?** Only in absolute form. Storing a reader's own theme choice in `localStorage` sends nothing anywhere and is the kind of user-requested interface preference that EU guidance treats as not needing consent. Not legal advice.

**Recommendation: adjust.** Store the theme choice only, and change the sentence to say the site stores one thing in the browser, the reader's theme choice, which never leaves the device. Or keep the promise and accept the cost; both are defensible.

**Decided 2026-10-15.** Adjusted. Only the reader's explicit light or dark choice is stored, in `localStorage` under `selekoa-theme`, with every access wrapped so the toggle still works where storage is blocked. Until the reader chooses, the theme follows the system. The About page now says: "This site sets no cookies. It stores one item in your browser: your light or dark theme choice, if you press the Dark mode button. It never leaves your device."

## 8. Publication route: fresh-history public repository

**What it says.** Publish later from a separate GitHub organisation as a public repository with fresh history; this repository and its history stay private. Recorded in [roadmap](roadmap.md) and [launch-runbook](launch-runbook.md).

**Original reason.** The private history may contain material that must not be public: early identifying details, session links, private inputs. Auditing 129+ commits is costly and error-prone; fresh history is the safe default.

**The problem.** Several policies treat Git as the record: the editorial policy says the maintainer's disposition of each disagreement is recorded "in Git", and corrections after merge are "recorded in Git with their reason". With fresh history, a public reader cannot see any of that.

**Recommendation: keep the route, fix the dependence.** Before launch, check that every correction, disposition and admission is recorded in tracked files (`review/`, the research audits, release changelogs), which is already mostly true, and change "recorded in Git" in the editorial policy to "recorded in the repository". Optionally publish a generated changelog of the private history's commit subjects after a privacy scan.

**Decided 2026-10-15.** Route kept. The editorial policy now says "recorded in the repository" and defines it as a tracked file, not a commit message. The [record audit](../review/repository-record-audit-2026-10-15.md) found 17 of 19 data changes recorded in prose; the other two are now described there. Open for the maintainer: release changelogs stop at v0.4.0, and several cross-family checks have no recorded maintainer disposition.

## 9. Wikipedia never as evidence

**What it says.** Wikipedia and similar tertiary summaries are for discovery only, never evidence for an admitted claim. Recorded in [editorial-policy](editorial-policy.md#atomic-claims-and-sources) and [positioning](project-positioning.md).

**Reason and since.** The reason is Selekoa's whole point: go to the closest documentary source. Nothing since has cost much; no admitted claim has needed it.

**Recommendation: keep.**

## 10. Cross-family GPT check

**What it says.** Contested and assessment records need a bounded check by a model from another family before merge; each research pack has extended this to "before any admission" (D6). Recorded in [editorial-policy](editorial-policy.md#machine-first-risk-based-editorial-workflow) and pack decisions.

**Original reason.** Same-family audits share blind spots with the preparer.

**What has happened since.** Every run found real problems the same-family audit missed: 22 relation disagreements in 119 esoteric passages, including three contests that were not contests and a wrong post date; 4 relation disagreements and 22 passages disagreeing on some field among 62 mainstream passages. In the Yudkowsky corpus, seven GPT findings were overridden in adjudication and those overrides still await a GPT re-check.

**Costs.** No other model family is reachable from the preparing sessions, so the maintainer runs the check by hand in Codex. Disagreements are then adjudicated by a Claude session, the same family the check was meant to balance.

**Does the reason hold?** Yes, more strongly than when it was adopted.

**Recommendation: keep, and tighten the adjudication.** Write the "before admission" scope into the editorial policy, not only into pack decisions. Where Claude overrides GPT on a role-bearing or headline passage, send that override back to GPT (a short second pass) or flag it for the maintainer. Automate the check if an API from another family becomes reachable.

**Decided 2026-10-15.** Tightened as recommended. The [editorial policy](editorial-policy.md#machine-first-risk-based-editorial-workflow) now requires the cross-family check before any admission of a research pack. A Claude adjudication that overrides the GPT check on a passage bearing an earliest-located role or a headline goes back to GPT for a short second pass, or is flagged for the maintainer, before admission.
