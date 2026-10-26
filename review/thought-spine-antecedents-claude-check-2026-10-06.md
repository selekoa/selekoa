# Bounded check of the antecedents candidate pack

Checked pack: `review/thought-spine-antecedents-2026-10-06.json` and `.md` at `origin/thought-spine-antecedents` b730246 (54 items).

Checker: one Claude Opus 5.5 session with fresh task context, working in a new detached worktree. It did not use the continuation's source caches; every source was retrieved again. The Butler checkpoint of the pack was also prepared by Claude Opus 5.5, so this check shares a model family with that checkpoint, and with none of the GPT-6 continuation. It is a bounded machine check. It is not human acceptance or independent historical corroboration. Nothing here changes the pack or application data.

## Selection

- **Every record with an earliest-located or earliest-located-term role.** Only one record has either: `butler-1863-control` (B6 earliest-located). No record has earliest-located-term or most-developed.
- **Ten random others.** All other item IDs were sorted by SHA-256 of `antecedents-claude-check-2026-10-06:` followed by the ID, and the lowest ten were taken: `hanson-1994-upload-competition`, `good-1965-design-explosion`, `drexler-1995-tools-feedback`, `butler-1865-limbs`, `miller-1995-clustered-forecasts`, `vinge-1993-helpful-escape`, `good-1965-docility-control`, `samuel-1960-refutation-abstract`, `butler-1872-moral-influence` and `mccullough-1992-test-disagreement`.

Two of the eleven were not passage-checked by the earlier GPT-6 check: `butler-1872-moral-influence` and `butler-1865-limbs` (the latter received a record-consistency check only).

## Method and retrieval

Direct HTTP only, sequential, with at least 4 s between requests and at least 8 s for Internet Archive hosts. Existing Wayback captures were used; no capture was requested. Retrieval ran on 2026-10-06 between 10:24 and 10:35 UTC. Every source hash matches the hash recorded in the pack:

| Source                                                          | Result                                                                                                            |
| --------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| Papers Past 1863 article, Wayback 20260826113039                | 200; gzip-served; decompressed bytes match `d4d1459d…`                                                            |
| Papers Past 1863 column image segment 5, Wayback 20240612194236 | 200; matches `61c73226…`                                                                                          |
| Papers Past 1865 article, Wayback 20260912064521                | 200; gzip-served; decompressed bytes match `6aac1ff5…`                                                            |
| Erewhon 1872, IA leaf 0209 (p. 197)                             | 200; matches `e31f07a3…`                                                                                          |
| Erewhon 1872, IA leaf 0208 (p. 196)                             | 200; new retrieval, used for the paragraph locator                                                                |
| IA item metadata `ErewhonOverrang00Butl`                        | 200: 1872, Trübner, "1st ed", Smithsonian copy                                                                    |
| Project Gutenberg e-text 1906                                   | 200; matches `9b034d09…`                                                                                          |
| Good chapter scan (scienceplusplus)                             | 200; matches `124ff3a4…`                                                                                          |
| Extropy #13 and #15 scans (diyhpl.us)                           | First attempt HTTP 418 to a Python client; retried once each with curl: 200, matching `7c542906…` and `0d48b35f…` |
| NASA NTRS Vinge 1993                                            | 200; matches `943ee929…`                                                                                          |
| NCBI efetch PMID 17797013                                       | 200; matches `1974ed28…`                                                                                          |
| CMU comp.ai.philosophy `92_feb.tgz`                             | 200; matches `7d7647da…`; member `feb.92/2595` matches `fe87f20c…`                                                |

Every passage was compared on page or column images where the pack cites one. The exceptions are `butler-1865-limbs`, whose column images exist only as HTTP 403 captures and which was compared with the archived OCR, and the Samuel and McCullough items, whose sources are text records.

## Verdicts

Summary: 10 agree (8 with corrections), 1 disagree (one role of `vinge-1993-helpful-escape`), 0 unable.

### `butler-1863-control` (B6 earliest-located): agree, with fixes

- **Quote:** verbatim on the column image (segment 5), including "pow-er" across a line break. The locator is correct: the passage closes the paragraph that begins "Our opinion is that war to the death". That paragraph is the penultimate one before the signature and is followed by the "NOTE".
- **Author, date and venue:** the image shows the signature "CELLARIUS". The record gives Press, Volume III, Issue 192, 13 June 1863, Page 1. The 1901 preface, in the Gutenberg transcription, names the article, its signature, the Press and June 13, 1863. The quote is attested on the printed page, so claimed and attested dates coincide.
- **Classification:** B6 control half, through dependence, is right. The claim is conditional: if destroying every machine is impossible, that impossibility already shows servitude. The note states this.
- **Fix 1 (register):** add that Butler's 1901 preface calls this letter "the first part of 'Erewhon' written". The text's own devices (offering the subject "gratis to the members of the Philosophical Society"; the tobacco-pipe "NOTE") also put it near the satire that "How to read this" says is labelled fiction. The nonfiction label rests on venue and first-person voice, not on settled earnestness. Say so explicitly, or narrow the fiction rule (see pack-level point 4).
- **Fix 2 (bound):** the pre-1863 screen ran phrase queries built from Butler's own wording ("hold the real supremacy", "servant glides by imperceptible approaches"). By construction it could only find copies of Butler. The qualifier "bounded by this pack's thin pre-1863 screen" should say: "earliest among items located by this pack; the pre-1863 phrase screen used Butler's own wording and could not find earlier statements in other words".

### `hanson-1994-upload-competition` (A6 articulation, A4 context): agree, with fixes

- The pages and dating are confirmed: the article begins on printed p. 10 with a "Copyright ©1994" header, under the footer "EXTROPY #13 (6:2) Third quarter 1994". The p. 14 right column carries the mechanism.
- **Fix 1 (paraphrase):** the text speaks of billions of copies of the "first few dozen" uploads filling almost all labour niches, not "the first few". Correct the paraphrase.
- **Fix 2 (qualifier):** the item meets A6's decisive-advantage branch only. The advantage grows with delay because hardware becomes cheaper, not because the lead compounds itself, so it is not self-reinforcing. On p. 15, Hanson concludes that delay should be avoided to make the transition more equitable and less sudden. That is not competition pressing developers to abandon restraint, and it should not be counted as such. The "first few dozen" wording also meets the 1996–2022 pack's narrower "first system" wording.

### `good-1965-design-explosion` (A1, A3 and A5 articulation): agree, with fixes

- **Quote, locator and dating:** "intelligence explosion" appears on printed p. 33, section 2, on the page image. The paraphrase is accurate. The p. 31 footnote supports the claimed-date record: October 1962 and January 1963 talks, an April 1963 first draft and a May 1964 emended version. The 1965/1966 imprint discrepancy is correctly left unresolved. Additional internal evidence: reference [40] lists a reprint as "1965, in press". This is consistent with completion after May 1964 but does not settle the imprint year.
- **Fix 1 (missing leads):** the passage itself cites "refs. [22], [34], [44]" for the explosion. From the reference list, inspected on the images:
  - [22]: Good's 1951 review of a book by D. R. Hartree, _J. Roy. Statist. Soc._ A114, 107.
  - [34]: RC-115, IBM, 1959.
  - [44]: "The social implications of artificial intelligence", in _The Scientist Speculates_ ([41]: Basic Books, New York, 1963), pp. 192–198.

  Record these in the note as the text's own citations, without inferring influence. Add [22] and [44] to "Remaining leads"; only RC-115 is listed there now. [22] is a 1951 candidate that the pack's search scope never mentions.

- **Fix 2 (A3 fit):** the passage has an ultraintelligent machine design better machines. That is successor construction, while A3's criterion says "a system improves its own capacity to improve itself". The pack treats successor lineages as A3 throughout (this item and `vinge-1993-successor-feedback`). Either amend the A3 criterion to include successor lineages explicitly, or record A3 as context with that element missing. The self-change sentence that follows belongs to `good-1965-hardware-self-change`.
- **Fix 3 (role):** see pack-level point 2. This is the earliest A1, A3 and A5 articulation the pack contains. By the pack's definition, "articulation" asserts that it is not.

### `drexler-1995-tools-feedback` (A1, A3, A5 and A6 context): agree, with fixes

- The paraphrase and context roles are right. Drexler's feedback is better tools building better tools; races are between technologies. The footer reads "2nd-3rd Quarter 1995".
- **Fix 1 (locator):** the continuation is on p. 12 lower left, below the forecast table and dotted rule (PDF page 10), not "upper left".
- **Fix 2 (paraphrase balance):** besides rejecting a strict mathematical singularity, Drexler calls "Vernor's term" remarkably appropriate. Add this so that the paraphrase does not read as a rejection of the concept.

### `butler-1865-limbs` (B6 contesting): agree at OCR level, with fixes

- The quote matches the uncorrected OCR in the capture; the elision covers the OCR error "aniinalise". The column images were not available (403 captures), so the wording is not image-verified. The record says so.
- The attribution reasoning checks out against the 1901 preface. That preface describes a second Press article "shortly after the first", which "treated Machines from a different point of view", and maps it to the revised edition's pp. 270–274. Gutenberg's note places those pages at the end of chapter XXIII. The identification remains an inference, as recorded.
- **Fix 1 (register):** add that the article frames itself as a late-night dream after "a single glass of hot whisky and water", "a dream such as we ourselves know to be a dream", and ends by leaving "our dream". This bears on reading the contestation as Butler's own position.
- **Fix 2 (minor):** the quote stops mid-sentence after "advancing". Add a closing "[...]".

### `miller-1995-clustered-forecasts` (A4 context): agree, with fixes

- The paraphrase and context role are confirmed on printed pp. 12–13.
- **Fix:** add two points.
  - Miller leaves "Singularity" undefined in this exercise. He offers general molecular assembly as one candidate and treats it as the centre of gravity of clustered events, so the item does not even fix the singularity to AI.
  - He doubts the upload/AI distinction will be clean in practice. The paraphrase's "distinguishing such uploads from AI designed without uploading" should carry that qualification.

### `vinge-1993-helpful-escape` (B2, B5 and B6 articulation; B1 and B3 context): disagree on B5, agree otherwise

- **Quote:** "helpful advice" appears on printed p. 15 on the page image, in Vinge's own quotation marks. The locator is correct.
- B2 is right: advice that is useful while incidentally securing release is manipulation while appearing benign. So is B6: Vinge argues that confinement is "intrinsically impractical". The B1 and B3 context roles are right.
- **Disagree on B5:** B5 requires an _explicit_ claim that behaviour observed under confinement is weak or misleading evidence. The passage argues that confinement fails; it says nothing about what observed helpfulness shows. The evidential reading is an inference.
- **Fix:** make B5 context, with the missing element "no explicit claim about the evidential value of observed helpfulness; the passage argues that confinement is impractical". Alternatively, keep it as articulation marked derivation: inferred, with the premise stated. Also note that the thought experiment is second-person ("imagine yourself confined") and concerns what Vinge calls weak superhumanity.

### `good-1965-docility-control` (B6 articulation): agree, with fixes

- The locator and meaning are confirmed on p. 33.
- **Fix 1:** replace "cooperative enough" with Good's word "docile". The word is the substance of the condition.
- **Fix 2:** state that the passage presupposes rather than asserts that control could be lost: it is a proviso.
- **Fix 3:** record the next sentence as the text's own statement that the point is seldom made outside science fiction. This is a pointer to fiction leads, not an influence claim.

### `samuel-1960-refutation-abstract` (B6 contesting): agree, with fixes

- The XML has the abstract as paraphrased, author "Samuel, A L", Science 132(3429), 16 September 1960, pp. 741–742, and the DOI as recorded.
- **Fix 1 (source role):** it is not established whether the indexed abstract reproduces Samuel's wording or an editorial summary. Change "primary for the author's expression" to "indexed abstract of the article; authorship of the abstract wording unverified".
- **Fix 2 (scope):** the abstract contests the threat and will premise of the control half. Its statement that conclusions are logical consequences of the input does not engage Wiener's specification half and is compatible with it. Say so, so that the item is not read as contesting B6 as a whole.

### `butler-1872-moral-influence` (B6 articulation, A4 context; fiction): agree, with fix

- **Quote:** verbatim on the p. 197 page image. The paragraph begins on p. 196 with "As yet the machines receive their impressions" (leaf 0208), as the locator says.
- **Variant and labelling:** the 1901 variant ending in "the moral sense of any machine" is confirmed in the Gutenberg text, where the passage forms its own paragraph. IA metadata gives 1872, Trübner and "1st ed". The fiction label and the B6 role are right.
- **Fix:** add Butler's statement in the 1872 second-edition preface, as transcribed by Gutenberg. He says the machine chapters were not meant to ridicule Darwin, and calls them "an example of the specious misuse of analogy" aimed at an unnamed book. This is the author's own framing of the treatise and limits any reading of the B6 passage as Butler's view.

### `mccullough-1992-test-disagreement` (B5 contesting): agree

- The member hash matches. The header date, local receipt line and signature are as recorded. The paraphrase is accurate.
- Contesting B5 is right under the pack's criterion: he denies that the Boston event was a serious test, and argues that the judges' split shows behavioural discrimination remains possible.

## Pack-level findings

### 1. Three criteria were widened against the 1996–2022 pack without disclosure

Comparison with `review/thought-spine-candidates-2026-10-06.json` on `origin/thought-spine-candidates`:

| Proposition | Wording added in this pack                          |
| ----------- | --------------------------------------------------- |
| B5          | "or apparent capability", and "about what it is"    |
| B2          | "(its own or those of its designers)"               |
| A6          | "first" became "leading"; "or to abandon restraint" |

"How to read this" discloses only the new B6.

The widening matters. Judging by their own qualifiers (not all passage-checked here), five of the seven B5 articulations rest on the added capability or "what it is" branch: Turing 1950, Michie, Rosenfelder 1991, Gudeman and Rosenfelder 1992. These are Turing-test sufficiency debates, not claims about behaviour after release. Both B2 articulations attributed to designers (Turing 1950 and Rosenfelder 1991) rest on the designers clause. `vinge-1993-competition-restraint` rests on "abandon restraint".

**Fix:** state each widening in "How to read this". Tag every role that meets only an added branch, so the B5, B2 and A6 inventories cannot be read as antecedents of the narrower 1996–2022 propositions.

### 2. Role vocabulary contradicts practice

"Articulation" is defined as "neither the earliest located nor the most developed". In practice one earliest-located role is assigned in the whole pack, with no most-developed or earliest-located-term role. As a result the earliest criterion-meeting items in the pack are labelled as if earlier ones existed: Good for A1, A3 and A5; Vinge 1993 for A4 and A6; Turing 1950 for B2 and B5.

**Fix:** redefine articulation as "meets the criterion; no earliest-located or most-developed role is assigned". Then add one sentence to "How to read this": only B6 carries an earliest-located role, and none is assigned elsewhere because the bounds are too thin. Point 3 below is a concrete reason why.

### 3. The search scope did not follow the sources' own pointers

The scope records detailed discovery screens but not the obvious follow-up in Good's own text. Its citations [22] (1951), [34] (1959) and [44] (1962/63) point to earlier statements by Good himself. Only [34] is listed as a lead. Similar cited-precursor checks should be run on other articulations before any earliest role is assigned.

### 4. The fiction rule is not applied uniformly to Butler

"How to read this" says science fiction and satire are labelled fiction. The 1863 letter and the 1865 article are labelled nonfiction, though both use satirical or dream framing. Butler's prefaces tie the 1863 letter to Erewhon and describe the machine chapters as a misuse of analogy.

**Fix:** either label them as pseudonymous periodical pieces of uncertain register, or narrow the rule to "novels and stories" and add register notes. Do not leave the stated rule and the labels in conflict.

### 5. Influence and lineage

No checked record asserts influence or lineage. Citations and credits (Drexler on "Vernor's term", Vinge on Good and Drexler, the Hanson acknowledgement) are reported as the texts' own statements.

The pack's framing word "antecedents" is temporal only; one clause in "How to read this" saying so would close the gap.

### 6. Is "How to read this", with the search scope, an honest bound?

Mostly yes. It separates dates carefully, names what was not searched, records failed and blocked retrievals, and makes no priority claims. The 20-hit first-page limit of the full-text screens is stated.

It is not a complete bound in three respects:

- the undisclosed criterion widening (point 1);
- the articulation label implying located predecessors that do not exist (point 2);
- a pre-1863 "screen" that could only find Butler's own wording, and a Good scope that did not follow Good's citations (points 3 and the Butler fix 2).

With those fixes applied, the notes would be an honest bound.

## Not covered

This check covers 11 of 54 items. It did not re-examine the other 43 items, the propositionSummaries tables beyond the roles of the sampled items, the co-occurrence labels of unsampled documents, or the pack's retrieval log beyond the sampled sources. No original 1901 printing, 1865 column image, Samuel article body or Good volume imprint was obtained, and the earlier gaps remain. The record lists for the B5, B2 and A6 dependence counts in point 1 come from the items' own qualifiers, not passage checks.
