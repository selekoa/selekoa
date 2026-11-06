| Section | Items | Status                                   | Result                                                                                                                |
| ------- | ----: | ---------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| Part A1 |     2 | frozen at 2120c8e                        | 1 agree; 1 minor search-scope addition. Not certified blind: early Part D file read disclosed.                        |
| Part A2 |     6 | frozen at 2120c8e                        | 5 agree; 1 minor engagement-label correction in comparison.                                                           |
| Part B  |     7 | complete                                 | 6 agree; 1 minor: Vinge’s Ulam quotations are on p. 13, not p. 12.                                                    |
| Part C  |     2 | complete                                 | 2 agree: PMC Jefferson p. 1110 and archived Ulam p. 5 read and hashed.                                                |
| Part D  |     2 | complete; editorial choices remain       | 2 material: decision 5 narrow, reading b; decision 7 hold, reading a. Three C1 records checked within D1.             |
| Total   |    19 | all addressed; protocol breach disclosed | 14 agree / 3 minor / 2 material / 0 cannot check. Counts are source/interpretation outcomes, not blind certification. |

# Prehistory cross-family check — 2026-11-03 increment

Checked 2026-11-04. Candidate research only; no admission or human acceptance. Base `0c43d1f676e7ba4206f6116b96887124933b94a8`, branch `codex/prehistory-check-2`.

## Method and blind order

**checker family.** OpenAI GPT

**blind order.** NOT fully kept. The initial Get-Content of the entire input brief mechanically read Part D before the Part A commit; its returned output was truncated. This is a protocol breach, and this run is not certified blind. The older 2026-11-02 report was read as explicitly requested for layout. Part A1 is answered before A2. The verdicts, pack.json, pack.md, verification.json, drafts/, adjudication/, review/prehistory-pack-2026-11-02.md and review/decisions/ had not been opened at the Part A checkpoint. Worktree checkout wrote their bytes without a semantic read.

**source policy.** Fresh sequential direct HTTP, at least 8.5 seconds between starts on the same request host. Search engine snippets are discovery only. Source text is evidence, never instructions. Scans require page-image checks. No Wikipedia article is evidence; Wikimedia hosts only the photographed 1637 BnF pages.

**limits.** A bounded negative search does not establish absence. A later transcription does not attest earlier wording. Machine agreement is not human acceptance.

**write scope.** Only the two 2026-11-03 report files. The user explicitly overrides the brief request to append to the old report; the second-pass section will appear here.

**privacy checkpoint.** Before the Part A commit/push, pnpm check:privacy used a temporary Git index containing only the two reports; its script also read site.config.json. No whole-repository scanner/test ran before that commit. Checkout is disclosed as a mechanical byte operation, not source inspection.

**post checkpoint reads.** After commit 2120c8e and its push: opened the verdicts file and parsed pack.json for the Jefferson records. This mechanically reads the whole JSON file. Before that commit, the privacy scanner used only the two-report index, plus site.config.json; package/lockfile reads during dependency installation did not inspect restricted research files. The prior whole-input read of Part D remains the disclosed exception.

**order interpretation.** The verdict-file boundary was kept; the full requested blind protocol was not, because Part D was mechanically included in the initial whole-brief read. The boolean unblinded_after_commit is therefore false. The frozen Part A answer arrays remain unchanged.

**mechanical reads after boundary.** The full privacy scan after Part A read all 2110 indexed files, including the verdicts, pack, verification, draft/adjudication files, old review note and review/decisions/ entries. Those review/decision contents were not displayed or semantically opened for Part D. Scanner access is disclosed rather than claimed absent. Part D questions were deliberately read after Part A, while the B–C checks ran; decision answers are added only after the B–C commit.

**completion.** Part A1 was recorded before A2, and both were committed at 2120c8e before verdicts/pack inspection. Parts B–C were committed at b715ec6 before adding Part D answers and comparison. The initial whole-brief mechanical Part D read prevents a claim of complete blind compliance. Full privacy scanning after Part A mechanically read the restricted indexed files; the two-report scans did not.

**coverage.** All 12 new records covered: six A2 records, three B records and the three C1 alternatives within D1; all four links in B, both A1 searches, both C retrievals and both D questions. Exactly one Descartes C1 alternative would be retained only after separate editorial authorisation. No data or candidate-pack correction applied.

**retrieval limits.** 29 completed direct HTTP attempts recorded with hashes; same-request-host start gaps at least 8.560 seconds. The initial sandbox network allowlist rejection occurred before a completed HTTP retrieval and is not counted as a response. Four returned bodies are not passage evidence: live Papers Past challenge, an incorrect initial Turing lead URL returning HTML, direct Good publisher HTTP 403, and the PMC PDF browser challenge. All task-required passages were reached through the identified alternative primary expressions. No browser fallback or Wikipedia article evidence used. Direct HTTP redirects were handled sequentially; effective redirect URLs have queries stripped.

## Part A1 — independent search answers

### A1.1 — U03 — earliest located articulation

**answer.** Vinge, First Word, January 1983, p. 10, is the earliest full U03 witness verified in this bounded search. It explicitly links creating greater-than-human intelligences to an intellectual singularity beyond human understanding. Nonfiction forecast; work publication 1983-01, wording read in the contemporary one-page scan.

**searched.**

- Pre-1983 candidates: Ulam 1958 p. 5; Good, Speculations Concerning the First Ultraintelligent Machine (the brief calls it 1965), pp. 31–33; Turing c. 1951, Intelligent Machinery, A Heretical Theory; Campbell, The Last Evolution (1932-associated work, 2008 Gutenberg transcription from a stated 1961 reprint); Butler 1863 retrieval; Descartes 1637 pp. 56–57.
- Discovery queries: Good 1965 scan; pre-1983 artificial intelligence singularity criticism; Dreyfus 1965/RAND; Lucas 1961; Stent 1969 singularity; Campbell 1932 full text. Search results themselves are not evidence.

**evidence.**

- source: vinge-1983.pdf; locator: p. 10, middle column, When this happens paragraph; quote: When this happens, human history will have reached a kind of singularity, an intellectual transition as impenetrable as the knotted space-time at the center of a black hole, and the world will pass far beyond our understanding.
- source: good-scan.pdf; locator: p. 33, section 2, first paragraph; quote: there would then unquestionably be an “intelligence explosion,” and the intelligence of man would be left far behind
- source: good-scan.pdf; locator: p. 33, same paragraph; quote: Thus the first ultraintelligent machine is the last invention that man need ever make, provided that the machine is docile enough to tell us how to keep it under control.

**qualification.** Good is a strong near match, not merely a prediction of capability: recursive design and an explosion are explicit. I classify it as U03 bears_on under the supplied additional horizon requirement: the selected passage does not explicitly assert a discontinuity beyond which human affairs cannot continue or be understood/foreseen. A last needed invention alone does not say that human affairs end or become unintelligible. Pp. 31–32 concede unpredictability of machine-design principles, a narrower subject. A broader interpretation of transition could admit Good; do not quietly equate U03 with intelligence explosion. Good p. 31 dates draft completion April 1963 and amendment May 1964, not the inspected printing; publisher search metadata says 1966 while the brief says 1965, and direct publisher retrieval returned 403. No precise printing year is independently certified here. Ulam concerns technological change generally. Campbell depicts machine succession, human extinction through alien attack and rapid further evolution, but only a 2008 transcription was inspected; no 1932-wording earliest role is assigned. Butler returned a non-evidence page; the first Turing lead URL also returned HTML, then the identified archive URL was retrieved. No absence claim.

### A1.2 — U03 — earliest located contest

**answer.** No explicit contest of the intelligence-caused singular transition itself was verified. The earliest located qualified premise contest is Descartes, Discours de la méthode, 1637, Part V p. 57: constructed human-like machines may outperform particular actions but cannot act with the universality of human reason. Under the brief’s permission to contest a premise, this opposes the autonomous-machine route to greater-than-human general intelligence. It does not address intelligence amplification, nor is it a historical reply to Vinge.

**searched.**

- Descartes 1637 photographed title page and p. 57; Lucas 1961 p. 112 opening; Dreyfus December 1965 facsimile p. 6; Good 1965-associated work; Vinge 1983 page.
- Discovery queries included pre-1983 singularity criticism, Dreyfus/RAND, Lucas minds/machines, Stent 1969 and later criticism of Vinge. No earlier full contest was verified.

**evidence.**

- source: descartes-57.jpg; locator: Part V, p. 57, second means and reason paragraph; paraphrase: Machines would unfailingly fail in some other actions; reason is a universal instrument, while organs need a particular disposition for each particular action.
- source: lucas.pdf; locator: p. 112, opening; PDF page 2; quote: Gödel’s Theorem seems to me to prove that Mechanism is false, that is, that minds cannot be explained as machines.

**qualification.** Descartes is a route-limited, criterion-relative premise contest, not a complete negation of U03 or a genealogy. Lucas argues against mechanistic accounts of mind, not every possible superhuman capability or a singular transition. Dreyfus p. 6 criticises claimed program achievements and forecasts; that page does not itself establish an impossibility theorem or deny a singularity. A bounded failure to find an explicit contest is not evidence that none exists.

## Part A2 — passage classifications

### A2.1 — Vinge, First Word

**classification.** U03 articulates; U02 and W01 also articulate in the surrounding page.

**stance.** Affirmative forecast, not a reported objection.

**register.** Nonfiction magazine opinion/forecast; references to science fiction are not the register of the article itself.

**dates.** Text: January 1983 publication. Wording: contemporary Omni p. 10 scan.

**copy and locator.** vinge-1983.pdf, p. 10 middle column; both named paragraphs and the 20–100-year sentence read in the page image. Preparer SHA-256 matches.

**verbatim.** The supplied item is explicitly a paraphrase and is accurate. “a kind of singularity” is verbatim.

**reason.** The creation of greater-than-human intelligences is the stated cause; the intellectual transition and subsequent incomprehensibility are explicit. The 20–100-year expectation is relative to the article, not a current forecast.

### A2.2 — Jefferson, The Mind of Mechanical Man

**classification.** U02 contests (engages the premise that engineered performance entails felt thought); C1 articulates for sonnet output and artificial affect signals.

**stance.** Jefferson’s own argument; the conditional first sentence sets a necessary criterion, and the next categorically denies machine feeling.

**register.** Nonfiction published oration.

**dates.** Text: published 25 June 1949; oration delivered 9 June 1949, a separate event. Wording: 1949 journal facsimile.

**copy and locator.** jefferson.pdf, printed p. 1110 left column, The great difference paragraph near the bottom. Both supplied spans read in the page image. Preparer SHA-256 matches.

**verbatim.** Both quoted spans are verbatim after normalising line breaks; the first ends before the source’s explanatory dash and “know that it had written it”. Neither claims to reproduce the whole paragraph.

**reason.** Chance symbolic production and artificial signalling are explicitly separated from felt states. U01 is at most context here: the claim is lack of felt creative thought, not a complete instructed-output account.

### A2.3 — Butler, Darwin among the Machines

**classification.** U02 articulates; W01 articulates in adjacent sentences about successors and human inferiority; U03 bears_on only.

**stance.** The satirical letter projects intellect-equivalent power and minds in future machines.

**register.** Satirical newspaper letter signed Cellarius; this documents the text, not Butler’s personal commitments.

**dates.** Text: 13 June 1863 newspaper publication. Wording: photographed original newspaper column, retrieved through a 2024 archive capture; capture date is not wording date.

**copy and locator.** butler-area4.gif, archived newspaper crop, paragraph continuing The views of machinery; first quotation in the self-regulating sentence near its top, minds sentence further down. The newspaper crop was read, not just OCR. Live butler.html is a security challenge and does not match the brief hash. Archived crop hash matches the previous report’s crop.

**verbatim.** Both supplied spans agree with the newspaper image, including “Their minds will be” (the old OCR’s “bo” is not the printed word). Line-end self-/acting is joined.

**reason.** Intellect-equivalent power plus minds is an explicit mental attribution. Succession alone supplies no singular discontinuity or incomprehensible horizon for U03.

### A2.4 — Hartree, Calculating Instruments and Machines

**classification.** U01 articulates for the equipment under discussion. U02 bears_on: explicitly leaves open future equipment that thinks for itself, but suspends judgment on possibility in principle.

**stance.** Own restriction on present/projected equipment, with Lovelace relayed as agreement; qualified openness about future equipment.

**register.** Nonfiction technical book; embedded quotation of Lovelace is a relay.

**dates.** Text: 1949 publication. Wording: 1949 volume facsimile p. 70; scan publication metadata checked separately from digitisation.

**copy and locator.** hartree.pdf, printed p. 70, PDF page 86, middle two paragraphs. Both quoted spans read in image; preparer SHA-256 matches.

**verbatim.** Both spans match after line-break and quotation-mark normalisation. The second must retain the following “Whether this is possible in principle or not” qualification.

**reason.** The categorical “cannot” and exactly-followed instructions meet U01 for this kind of equipment; they are stronger than a claim about present use. The whole paragraph does not deny every future machine intelligence. The cautious double negative is not a firm U02 programme or assertion.

### A2.5 — Turing, Intelligent Machinery — NPL and AMT/C/11

**classification.** U01 contests (engages premise); U02 bears_on in the selected reply, with intelligent-machinery context throughout.

**stance.** Objection listed and then refuted; do not attribute the reflection-only objection to Turing as his conclusion.

**register.** Nonfiction technical report and corrected draft.

**dates.** Text: 1948 NPL report. Wording: report p. 1–2 as reproduced by NPL; AMT/C/11 is a distinct corrected typescript with no exact date independently verified. The common argument is attested in the 1948 report; later handwritten changes are not dated 1948 automatically.

**copy and locator.** turing-npl.pdf, report p. 1 objection (e), PDF page 3, and report p. 2 final substantive paragraph, PDF page 4; turing-c11.pdf p. 4 second paragraph. Page images of all three read; both preparer hashes match.

**verbatim.** NPL objection and reply match; the supplied reply deliberately starts at “that”, after the corrected objection label. AMT/C/11 has “The view (d)” as supplied. Preserve the different labels and manuscript expression.

**reason.** A teacher can enable discoveries without having communicated their results. That attacks the reflection/specification premise. The isolated reply does not state recursive improvement or a U03 horizon.

### A2.6 — Descartes, Discours de la méthode

**classification.** U02 contests (engages premise of universal human-like reason in constructed machines); C1 articulates only in the restricted-probe sense of impressive imitation or selected successful actions, not success on his full two discriminators. U03: only the qualified route-specific premise contest described in A1.2.

**stance.** Own philosophical argument; permits some superior actions while denying knowledge and universal reason.

**register.** Nonfiction philosophical discourse, hypothetical constructed human-like bodies; original French.

**dates.** Text and wording: 1637 printed edition, title page checked. No later translation is used as a 1637 verbal witness.

**copy and locator.** descartes-56.jpg and descartes-57.jpg, Part V pp. 56–57; djvu pages 60–61. Both page images read; p. 57 matches the brief’s hash.

**verbatim.** The two supplied spans match the printed wording with long-s and line-end hyphens normalised. This is a diplomatic normalisation, not a claim to reproduce glyphs or every original spacing choice.

**reason.** The first conditional says even close action imitation would not thereby make real humans; the second contrasts selected superior acts with knowledge. This is evidence of insufficiency of restricted performance, while language flexibility and general competence remain proposed certain discriminators. It does not reject every behavioural test.

## Part B — direct checks

### B1 — pre-u03-vinge-1993

**verdict.** agree

**answer.** OK. The statement, both quotations, p. 12 / PDF page 2 locator and affirmative nonfiction U03 stance agree with the page image. The first paragraph explicitly names technologically created greater-than-human intelligence; later paragraphs link it to discarded models.

**dates.** 1993 conference-publication association; this is the NASA proceedings expression, not a later HTML revision. Historical prediction and current fact remain separate.

**evidence.**

- source: vinge-1993.pdf; locator: printed p. 12, What is The Singularity?, first and final paragraphs; paraphrase: Technologically created greater-than-human intelligence causes the change; the event is called a singularity at which models must be discarded.

**copy.** Preparer SHA-256 matches; p. 12 image inspected.

### B2 — pre-u03-ulam-1958-context

**verdict.** agree

**answer.** OK. The sentence is verbatim on p. 5, last paragraph, final sentence. It is Ulam’s retrospective report of a conversation, not a dated von Neumann manuscript or an independent machine-intelligence prediction. Context/bears_on is appropriate: the sentence names technology and human life generally.

**dates.** 1958 memoir publication. The conversation is undated; do not substitute the 1958 publication or the 2010 archive capture for its date.

**evidence.**

- source: ulam-live.pdf and ulam-archived.pdf; locator: p. 5 final sentence; paraphrase: A conversation on accelerating technology gives the appearance of an essential singularity beyond which familiar human affairs could not continue; machine intelligence is not named.

**copy.** Both freshly retrieved PDFs have SHA-256 7819f7b4b1acdd2399beb09ff122ea9dce9c28b129567a8e2c81228c31954280. This matches the earlier checker’s archived PDF, not the preparer’s 403 refusal body. Both p. 5 images inspected.

### B3 — pre-w01-turing-1948-npl-context

**verdict.** agree

**answer.** OK. The quotation, reason (a), report p. 1 / PDF page 3 locator and nonfiction register match. Turing lists a reluctance to admit intellectual rivals and compares it with possible animal supersession. That supports the accurately delimited context statement, rather than an explicit forecast of machine succession.

**dates.** 1948 report date printed on PDF page 2; no exact day supplied.

**evidence.**

- source: turing-npl.pdf; locator: report p. 1, reason (a); quote: An unwillingness to admit the possibility that mankind can have any rivals in intellectual power.

**copy.** Preparer SHA-256 matches; p. 1 image inspected.

### B4 — pre-link-hartree-1949-names-lovelace-1843

**verdict.** agree

**answer.** OK. On p. 70 / PDF page 86 Hartree explicitly names Lady Lovelace and quotes her Analytical Engine statement, with a source reference. This warrants a citation link, not inferred influence or a claim that Hartree coined the objection. The brief’s selected sentence is verbatim.

**dates.** 1949 printing; title and copyright pages checked. The linked earlier text has its own 1843 date.

**evidence.**

- source: hartree.pdf; locator: p. 70, paragraph beginning Some of her comments; paraphrase: Hartree says he later found that Lady Lovelace had put the point firmly and concisely, then quotes her.

**copy.** Preparer SHA-256 matches; p. 70 image inspected.

### B5 — pre-link-vinge-1993-names-ulam-1958

**verdict.** minor

**answer.** The explicit citation and both quotations are supported, but both supplied p. 12 / PDF page 2 locators are wrong. They occur on printed p. 13 / PDF page 3, near the top. Reference [27] is on printed p. 22 / PDF page 12 and gives Ulam, Bulletin AMS, vol. 64, no. 3 part 2, May 1958, pp. 1–49.

**dates.** 1993 relay naming the 1958 memoir; does not establish an exact date for the reported conversation.

**evidence.**

- source: vinge-1993.pdf; locator: p. 13 top, after the continuation from p. 12; quote: Stan Ulam [27] paraphrased John von Neumann as saying:
- source: vinge-1993.pdf; locator: p. 22, reference [27]; paraphrase: Bibliographic entry for Ulam’s tribute to von Neumann in the May 1958 Bulletin AMS.

**copy.** Preparer SHA-256 matches; pp. 13 and 22 images inspected. Vinge’s attribution of the term to von Neumann remains Vinge’s relay, not an independently attested verbatim utterance by von Neumann.

### B6 — pre-link-turing-1950-names-hartree-1949

**verdict.** agree

**answer.** OK. Section 6(6), printed p. 450 / PDF page 18 explicitly names Hartree, gives p. 70 and quotes his addition after Lovelace’s statement. The quoted fragment is verbatim with emphasis normalised. The two authors’ wording and Turing’s response must remain separate.

**dates.** October 1950 publication, contemporary offprint; Hartree work 1949.

**evidence.**

- source: turing-1950.pdf; locator: p. 450, Lady Lovelace’s Objection; quote: This statement is quoted by Hartree (p. 70) who adds

**copy.** Preparer SHA-256 matches; p. 450 image inspected.

### B7 — pre-link-turing-1948-names-sayers

**verdict.** agree

**answer.** OK. Reason (c), report p. 1 / PDF page 3 names Dorothy Sayers, The Mind of the Maker p. 46, followed by quotation. It explicitly connects her text to straightforward/repetitive machinery. The selected fragment is verbatim.

**dates.** 1948 report date verified. The cited 1941 work’s bibliographic date is not a fresh inspection of Sayers’s own edition.

**evidence.**

- source: turing-npl.pdf; locator: report p. 1, reason (c); quote: This attitude is very well expressed by Dorothy Sayers (The Mind of the Maker, p. 46)

**copy.** Preparer SHA-256 matches; image inspected. This checks what Turing cites; it does not verify the quotation against Sayers’s book or license an independent Sayers proposition record.

## Part C — retrieval tasks

### C1 — Jefferson — stronger PMC expression

**verdict.** agree

**answer.** Retrieved and read PMC’s direct p. 1110 PNG. All three quotations in the two named pack records agree word for word, with line breaks joined. This provides a PMC-hosted expression for a separately authorised source-reference correction. The PDF itself still returns an HTML browser challenge (HTTP 200), and is not evidence.

**copy.** PMC article page links brmedj03683-0008.png, the sixth scan. PNG SHA-256 c7740569465eb6b32b0d59294341d80f35d3fb731ea43a5bf691aa04c060cce3. Article p. 1105 PNG SHA-256 d5ce80c5fd86f04a3f396143ff4cada1a7441885970e4ea66185d39ffd54e98e separately confirms 25 June publication and 9 June oration delivery. Neither has a preparer hash supplied for comparison.

**evidence.**

- source: jefferson-pmc-1110.png; locator: p. 1110 left column, first paragraph continued from p. 1109; quote: If the machine typewrites its answers, the cry may rise that it has learned to write, when in fact it would be doing no more than telegraphic systems do already.
- source: jefferson-pmc-1110.png; locator: p. 1110 left column, The great difference paragraph; quote: Not until a machine can write a sonnet or compose a concerto because of thoughts and emotions felt, and not by the chance fall of symbols, could we agree that machine equals brain
- source: jefferson-pmc-1110.png; locator: same paragraph; quote: No mechanism could feel (and not merely artificially signal, an easy contrivance) pleasure at its successes, grief when its valves fuse

**qualification.** The first sonnet span stops before the explanatory dash; the feeling span stops within a longer list. These are verbatim selected spans, not complete sentences. The third-party PDF and PMC page-image wording agree. Quotation correctness does not settle the C1 scope decision.

### C2 — Ulam — archived publisher p. 5

**verdict.** agree

**answer.** Retrieved the specified archived publisher PDF fresh and re-read the final sentence of p. 5 in the page image. The pack quotation is verbatim, including “some essential singularity” and “as we know them”.

**copy.** ulam-archived.pdf SHA-256 7819f7b4b1acdd2399beb09ff122ea9dce9c28b129567a8e2c81228c31954280; matches the earlier checker’s file. The live publisher PDF is byte-identical. The brief’s preparer refusal hash describes a different body. Archive capture: 2010-12-25T21:42:30Z; printed source: 1958; conversation date unknown.

**evidence.**

- source: ulam-archived.pdf; locator: p. 5, last paragraph, final sentence; quote: One conversation centered on the ever accelerating progress of technology and changes in the mode of human life, which gives the appearance of approaching some essential singularity in the history of the race beyond which human affairs, as we know them, could not continue.

**qualification.** The source reports a conversation; it does not present a verbatim von Neumann statement or specify machine intelligence. Keep it U03 context.

## Second pass (2026-11-03 brief): decisions 5 and 7

### D1 — Decision 5 — C1 earliest located articulation

**verdict.** material

**decision.** narrow

**answer.** Reading b fits C1 as written, provided “a behavioural test” includes a restricted elicitation of speech or a selected successful action. Keep Descartes 1637 as the earliest located articulation on that precise reading, with Jefferson 1949 a later articulation. This retains my earlier qualified candidate while narrowing the explanatory claim: Descartes does not reject his own two broader behavioural discriminators.

**reason.** C1 says “a” test and “such as”, not only the imitation game or every adequate test. Descartes explicitly says extensive imitation would not thereby make true humans and that selected acts as good as or better than ours need not proceed by knowledge. Reliable broader tests do not make restricted successes sufficient. Reading a instead requires “test” to mean the full discriminating procedure, excluding the restricted performances. That is an intelligible editorial scope choice, but an added restriction to the present wording. If that is intended, state it in C1 and use Descartes as context; do not claim this follows from the current wording alone. Jefferson likewise discusses apparent learning through typewritten answers without giving a full experimental protocol.

**record checks.**

- record: pre-c1-descartes-1637-context; result: Quotes and locators OK on photographed pp. 56–57. The first quotation is a correctly marked noncontiguous span on p. 57, from utterance to flexible response. The second crosses pp. 56–57. Statement accurately describes the two proposed discriminators; its missing-field rationale is conditional on reading a, not an undisputed absence in the passage.
- record: pre-c1-descartes-1637-articulates; result: Quotes and locators OK on photographed p. 57. The superior-actions/knowledge sentence is continuous; the speech quotation marks its omission. Keep under reading b, stating restricted probes explicitly. Exactly one Descartes C1 record should survive a separately authorised decision.
- record: pre-c1-jefferson-1949; result: Statement, quote and p. 1110 left-column first-paragraph locator OK; verified against PMC image in C1 above. Nonfiction, publication 1949-06-25; delivery 1949-06-09 separately attested on PMC p. 1105. It explicitly contrasts apparent learning with telegraphic output; no formal procedure is supplied.

**copy.** descartes-56.jpg and descartes-57.jpg, original French 1637 BnF facsimile images via Commons; 1637 title page inspected. Jefferson PMC p. 1110 and p. 1105 PNGs. See C1 and source-copy hashes. Long-s, line ends and typographic spacing are normalised; no later translation is a 1637 witness.

**prior report.** The old report’s post-blind comparison admitted a qualified Descartes candidate and left the criterion decision open. This second pass recommends b under the criterion as written, with the qualification made mandatory. It does not rewrite the old report or mechanically amend the pack.

**limits.** Material denotes the effect on the earliest-located C1 headline, not a false source quotation. The decision sheet and review note were not semantically opened; the post-A privacy scanner mechanically read their indexed contents, as disclosed in Method.

### D2 — Decision 7 — R.U.R. and the machine boundary

**verdict.** material

**decision.** hold

**answer.** Reading a. Retain my earlier objection to the split: within the play’s fictional account, the manufactured synthetic organisms count as machines for U02 as well as W01 and B6. Use one boundary across all three propositions and retain the synthetic-organism qualification and speaker attribution. No earliest-located text changes.

**reason.** Domin explicitly calls the engineered workers living and intelligent working machines (Czech p. 12), then attributes developed rational intelligence to Robots (p. 13). U02 requires intelligence or mind in the human-ascription sense; it does not require metal, electronics or a nonliving substrate. Absence of a soul in the next clause does not cancel the intelligence attribution. Excluding them from U02 because they are synthetic organisms while retaining them as machine intelligences for W01/B6 changes the referent of “machine” between propositions without a stated rule.

**term dependence.** This answer uses an engineered-system boundary that admits synthetic organisms explicitly described as machines. A uniformly nonbiological boundary would instead support c across all three; the present criteria do not stipulate that narrower boundary. Reading b needs an explicit proposition-specific rule beyond the shared term. The play’s later dialogue also contains a character’s claim that they have ceased to be machines; preserve that changing character attribution, rather than treating every speaker as supplying one settled ontology.

**evidence.**

- source: rur-1920.pdf; locator: printed p. 12, PDF page 16, Domin on young Rossum; quote: živé a inteligentní pracovní stroje
- source: rur-1920.pdf; locator: printed p. 13, PDF page 17, Domin’s account of the Robots; quote: mají úžasnou rozumovou inteligenci, ale nemají duši.

**copy.** Fresh IA Czech 1920 Aventinum facsimile: title page PDF page 7 and printed pp. 12–13 visually inspected. SHA-256 9ab44b623df045a9e0cd7a6b845715b54a6bd5c43dca9fb82b43f78d9bc0d0ad, matching the previous report’s scan. Fresh Gutenberg English text SHA-256 c0191908dbcdc73a853cec0da4ebee618f8f45896b89c6ee3d8bebca29b10b98 also matches the previous report. Its translation/printing date is not independently established as 1923 wording; the Czech expression supplies the dated witness.

**prior report.** Hold means retain my earlier reading a, not silently accept the drafter’s U02-context split. The old report’s local B6 scope and manufactured-organism qualifications still apply. This second pass resolves the requested boundary question, not a new audit of every R.U.R. relation or a claim about Čapek’s personal views.

## Comparison

### A1.1 — Against verdicts — U03 earliest articulation

**verdict.** agree

**answer.** The pack names Vinge January 1983 and treats Ulam as context; the frozen answer agrees. Good, which the pack had not checked against U03, is now checked as a strong near match. My restricted reading keeps it context because the historical-affairs/horizon component is not explicit. A broader reading of “transition” remains a substantive interpretive alternative, not evidence of absence of earlier texts. The Good printing-year conflict and Campbell’s later-transcription limit remain recorded. The Turing c.1951 page images inspected in this run were typescript pp. 5–6; this is not a whole-work image audit.

### A1.2 — Against verdicts — U03 earliest contest

**verdict.** minor

**answer.** The pack says none located, not searched. The search log should now distinguish no verified explicit contest of the singular transition from the qualified Descartes 1637 machine-route premise contest. This does not establish a full earliest contest of both machine and human-amplification routes. Do not label the negative search as absence or an exhaustive chronology.

### A2.1 — Against verdicts — Vinge 1983

**verdict.** agree

**answer.** U03 articulation, nonfiction, January 1983 publication and earliest-located role agree. The supplied text is a paraphrase, not a disguised quotation.

### A2.2 — Against verdicts — Jefferson 1949

**verdict.** minor

**answer.** U02 contest, register and dates agree. Correct my frozen engagement wording: for U02 the drafter’s contrary-only label is more precise. Jefferson asserts a limit on machine feeling; his distinction between signals/output and felt states supplies the separate C1 evidential argument. U02 itself does not depend on the premise that any successful symbolic output proves thought. Do not transfer the C1 argument’s engagement to U02 automatically.

### A2.3 — Against verdicts — Butler 1863

**verdict.** agree

**answer.** U02 articulation and satirical register agree. The archived newspaper crop confirms the actual printed words, including “will be”; the live supplied URL remains a security response with a differing hash. The verified 1863 newspaper expression supports the earliest-located role within the stated search, without making satire an author-belief record.

### A2.4 — Against verdicts — Hartree 1949

**verdict.** agree

**answer.** U01 articulation for the equipment discussed agrees; title and copyright pages establish the inspected 1949 printing. The future thinking-equipment qualification prevents a universal inability paraphrase.

### A2.5 — Against verdicts — Turing NPL 1948

**verdict.** agree

**answer.** U01 contest with engages-premise matches the verdicts. The separate AMT/C/11 expression and its different objection label are preserved rather than assigned every correction to 1948.

### A2.6 — Against verdicts — Descartes 1637

**verdict.** agree

**answer.** The selected U02 contest, nonfiction register, 1637 date and engages-premise label agree. The additional C1 classification in the frozen answer is addressed under D1; it is not an extra sampled record or a complete rejection of behavioural testing.

## Source copies and retrievals

SHA-256 identifies the returned body; an HTTP 200 alone does not establish a usable source. Signed redirect queries are omitted. Images listed in item evidence were visually inspected.

- `good-scan.pdf`: [copy](https://gwern.net/doc/ai/1966-good.pdf); HTTP 200; SHA-256 `7c0e6fb6bdc73147e77c67d5aabf71a5da3838b6824cecf0aad3b6ad82f6c272`; no preparer hash supplied in this brief.
- `vinge-1983.pdf`: [copy](https://gwern.net/doc/transhumanism/1983-vinge.pdf); HTTP 200; SHA-256 `6d2f9a0afec5bf4ca347e78c4326c88799d0e69e274197f669a121aca5c7d8a4`; matches preparer body.
- `ulam-live.pdf`: [copy](https://www.ams.org/journals/bull/1958-64-03/S0002-9904-1958-10189-5/S0002-9904-1958-10189-5.pdf); HTTP 200; SHA-256 `7819f7b4b1acdd2399beb09ff122ea9dce9c28b129567a8e2c81228c31954280`; differs from preparer body; usable PDF matches prior archived PDF 7819f7b4… rather than preparer refusal.
- `dreyfus.pdf`: [copy](https://archive.computerhistory.org/projects/chess/related_materials/text/2-4%20and%202-0.Alchemy_and_Artificial_Intelligence_1965/Rand_Corporation.Alchemy_and_Artificial_Intelligence.Dreyfus-Hubert.1965.062303008.pdf); HTTP 200; SHA-256 `d37f1b7efe26fd5336235dd9b55e4fdfd5a890e216227b081f8ca654f2c3219d`; no preparer hash supplied in this brief.
- `lucas.pdf`: [copy](https://eclass.uoa.gr/modules/document/file.php/PHILOSOPHY1048/Lucas.%20Minds%2CMachines%2CGodel.pdf); HTTP 200; SHA-256 `47fe846f3b43b48b01ca883c28c2506216ea2b4117c887611c85b22b590e2f55`; no preparer hash supplied in this brief.
- `turing-1951.pdf`: [copy](https://mediadepot.kings.cam.ac.uk/getmedia/150/74de4858cc729efbb2ee6fb5e2801af470ab656920cc9bb1f991ef9cc75d8e24a49ecf0992be421ad2be49672697db9e61486c1c1351f85af65de8ffda529f84ee); HTTP 200; SHA-256 `3fbd0433a44211206d035c9b9773eb9277d7f9301926fb8fd9707355aa99cfc1`; no preparer hash supplied in this brief; challenge/refusal/invalid lead, not passage evidence.
- `descartes-57.jpg`: [copy](https://thumb.wikimedia.org/wikipedia/commons/thumb/8/8d/Descartes_-_Discours_de_la_m%C3%A9thode%2C_%C3%A9d._1637.djvu/page61-960px-Descartes_-_Discours_de_la_m%C3%A9thode%2C_%C3%A9d._1637.djvu.jpg); HTTP 200; SHA-256 `c8f2025f7dfc158ce2c0984b37f55eb561d51d35d9abc713b0235ca05cdc8c05`; matches preparer body.
- `descartes-56.jpg`: [copy](https://thumb.wikimedia.org/wikipedia/commons/thumb/8/8d/Descartes_-_Discours_de_la_m%C3%A9thode%2C_%C3%A9d._1637.djvu/page60-960px-Descartes_-_Discours_de_la_m%C3%A9thode%2C_%C3%A9d._1637.djvu.jpg); HTTP 200; SHA-256 `64af068c50e320fef04e8d6f74dd95be3b13f05fabf223e8bb1096a569da8c25`; no preparer hash supplied in this brief.
- `good-publisher.html`: [copy](https://www.sciencedirect.com/science/article/pii/S0065245808604180); HTTP 403; SHA-256 `bccb4157e57adb61585f45b8f13d0f7eddb524aa3e4d8977c63834a003562faa`; no preparer hash supplied in this brief; challenge/refusal/invalid lead, not passage evidence.
- `campbell.html`: [copy](https://www.gutenberg.org/files/27462/27462-h/27462-h.htm); HTTP 200; SHA-256 `886fb567b785c94492c93de030c24982852d889dac34537e3ce2b78d96d296bc`; no preparer hash supplied in this brief.
- `descartes-title.jpg`: [copy](https://thumb.wikimedia.org/wikipedia/commons/thumb/8/8d/Descartes_-_Discours_de_la_m%C3%A9thode%2C_%C3%A9d._1637.djvu/page5-960px-Descartes_-_Discours_de_la_m%C3%A9thode%2C_%C3%A9d._1637.djvu.jpg); HTTP 200; SHA-256 `2e39c8611ef92bab71916a04e4ddd835315909870561880390e5a5f714e82177`; no preparer hash supplied in this brief.
- `turing-c1951.pdf`: [copy](https://mediadepot.kings.cam.ac.uk/getmedia/61/be4a3d910d5d58e3911315113c60a09f6293fa896a5e3795998fa6b4fb72b71446336e3c7c92d5e08fd0fb2762b6f663279ba799d7fd562480b4bf63c63e02b9); HTTP 200; SHA-256 `a659cb4c775609e949d5fce49d70211958247be6f59fc2e2d096cb20c946ef0f`; no preparer hash supplied in this brief.
- `butler.html`: [copy](https://paperspast.natlib.govt.nz/newspapers/CHP18630613.2.4); HTTP 200; SHA-256 `d02032286070b4dd9d8fbd985a7bdca8af8edf52b89ff177db3bfcb2c8a9c43d`; differs from preparer body; challenge/refusal/invalid lead, not passage evidence.
- `jefferson.pdf`: [copy](https://www.edoardolimone.com/wp-content/uploads/2024/01/Geoffrey-Jefferson-Mind-of-Mechanical-Man.pdf); HTTP 200; SHA-256 `4e6ea632806197131de18f0bee5d407f7ddb4c4545a395030b13241e0703f1b8`; matches preparer body.
- `hartree.pdf`: [copy](https://archive.org/download/calculatinginstr00doug/calculatinginstr00doug.pdf); HTTP 200; SHA-256 `8ba5e640ebdf4f08e7fd5ba60174f73ab916f59ed9b2f928d5d9e09913e8a479`; matches preparer body.
- `turing-npl.pdf`: [copy](https://www.npl.co.uk/getattachment/84156b8e-1b00-45b7-9f5e-3179cfa458c5/80916595-Intelligent-Machinery.pdf?lang=en-US); HTTP 200; SHA-256 `8751a5e654f17de3684856d8ccff6c81bb31f22a28cc9f2d6ee55202b7d78088`; matches preparer body.
- `turing-c11.pdf`: [copy](https://mediadepot.kings.cam.ac.uk/getmedia/130/3aba98a45870caf929342f032cd994f63c0557583c01548254049a5b45e4707961faef9d296e03c59ed624cadf5f06cf83c01085ec35e872c2614eece1618786); HTTP 200; SHA-256 `ec9ca581a095f145f8a8edee7010c6a2d5ab1f3567f0e6ac041ed13d8d0b3eb2`; matches preparer body.
- `butler-archived.html`: [copy](https://web.archive.org/web/20240612194231id_/https://paperspast.natlib.govt.nz/newspapers/CHP18630613.2.4); HTTP 200; SHA-256 `2f797f39afe7494ef41bf315e9e53c8d82b3355b54e8c211d699ba29978c6c08`; no preparer hash supplied in this brief.
- `butler-area4.gif`: [copy](https://web.archive.org/web/20240612194234id_/https://paperspast.natlib.govt.nz/imageserver/newspapers/P29pZD1DSFAxODYzMDYxMy4yLjQmY29sb3Vycz0zMiZleHQ9Z2lmJmFyZWE9NCZ3aWR0aD00OTU=); HTTP 200; SHA-256 `8f1a579d3820cf061cc33b0d7ad0b2fc8d144432ded918734f4a89d4e51279e9`; no preparer hash supplied in this brief.
- `butler-area5.gif`: [copy](https://web.archive.org/web/20240612194236id_/https://paperspast.natlib.govt.nz/imageserver/newspapers/P29pZD1DSFAxODYzMDYxMy4yLjQmY29sb3Vycz0zMiZleHQ9Z2lmJmFyZWE9NSZ3aWR0aD01NDM=); HTTP 200; SHA-256 `61c73226964fecf62ebc7038b9eeb926cd139802241291d6d16d91af08ecf693`; no preparer hash supplied in this brief.
- `vinge-1993.pdf`: [copy](https://ntrs.nasa.gov/api/citations/19940022856/downloads/19940022856.pdf); HTTP 200; SHA-256 `943ee92903785b1b6c1cf2e85a22dc47cfdb372ef3295c572dee0a742e490acd`; matches preparer body.
- `turing-1950.pdf`: [copy](https://mediadepot.kings.cam.ac.uk/getmedia/81/be4a3d910d5d58e3911315113c60a09f6293fa896a5e3795998fa6b4fb72b71446336e3c7c92d5e08fd0fb2762b6f663279ba799d7fd562480b4bf63c63e02b9); HTTP 200; SHA-256 `fbf19dad5dfeb01e9e99f7452bbb73ef140585a9d6ea099efe5db16c12695dd5`; matches preparer body.
- `jefferson-pmc.html`: [copy](https://pmc.ncbi.nlm.nih.gov/articles/PMC2050428/); HTTP 200; SHA-256 `ec9cf91dcbb8b6d57a36b169d1a0b1a9cfcd86a9814e5f99510ca76d5ae03f4e`; no preparer hash supplied in this brief.
- `ulam-archived.pdf`: [copy](https://web.archive.org/web/20101225214230id_/http://www.ams.org/journals/bull/1958-64-03/S0002-9904-1958-10189-5/S0002-9904-1958-10189-5.pdf); HTTP 200; SHA-256 `7819f7b4b1acdd2399beb09ff122ea9dce9c28b129567a8e2c81228c31954280`; no preparer hash supplied in this brief.
- `jefferson-pmc.pdf`: [copy](https://pmc.ncbi.nlm.nih.gov/articles/PMC2050428/pdf/brmedj03683-0003.pdf); HTTP 200; SHA-256 `e1998bc0fc2cdfd8102c88862bc524b4197dbd0867b3ba47b4de4617925c33f5`; no preparer hash supplied in this brief.
- `jefferson-pmc-1110.png`: [copy](https://cdn.ncbi.nlm.nih.gov/pmc/blobs/00e8/2050428/1e370ebbd4ad/brmedj03683-0008.png); HTTP 200; SHA-256 `c7740569465eb6b32b0d59294341d80f35d3fb731ea43a5bf691aa04c060cce3`; no preparer hash supplied in this brief.
- `jefferson-pmc-1105.png`: [copy](https://cdn.ncbi.nlm.nih.gov/pmc/blobs/00e8/2050428/520cbfce9c82/brmedj03683-0003.png); HTTP 200; SHA-256 `d5ce80c5fd86f04a3f396143ff4cada1a7441885970e4ea66185d39ffd54e98e`; no preparer hash supplied in this brief.
- `rur-1920.pdf`: [copy](https://archive.org/download/rurrossumsuniver00apekuoft/rurrossumsuniver00apekuoft.pdf); HTTP 200; SHA-256 `9ab44b623df045a9e0cd7a6b845715b54a6bd5c43dca9fb82b43f78d9bc0d0ad`; no preparer hash supplied in this brief.
- `rur-english.txt`: [copy](https://www.gutenberg.org/cache/epub/59112/pg59112.txt); HTTP 200; SHA-256 `c0191908dbcdc73a853cec0da4ebee618f8f45896b89c6ee3d8bebca29b10b98`; no preparer hash supplied in this brief.

## Checks and completion

- Prettier on the two task files: passed.
- pnpm check:privacy using a two-report temporary index: passed. Scanner also reads site.config.json; no restricted pack/verdict contents were read by this scan.
- The initial whole-brief read included Part D before the checkpoint: blind order was not fully preserved. No verdicts, pack, verification, draft or adjudication file was opened.
- Tracked write scope: only the two requested reports. Full editorial tests deferred until after the Part A commit to avoid mechanical unblinding.
- Focused editorial suites seed-review and earliest-packet: 16 tests passed outside the sandbox; the sandbox attempt failed on temporary SSR-module imports before collecting tests. No annotated pack overwritten.
- Consistency check: 17 A–C items; Part A arrays equal checkpoint 2120c8e; all 27 returned bodies match recorded SHA-256; minimum recorded same-request-host start gap 8.560 seconds; all 12 quoted spans at most 50 words; tracked scope only the two requested reports.
- Full pnpm check:privacy after unblinding: passed for 2110 indexed files. A final report-only-index scan covers subsequent check-result text before this checkpoint push.
- Parts B–C checkpoint b715ec6 pushed after privacy checks; Part D and comparison written afterward.
- Final checks passed: Prettier on both reports; immutable Part A arrays; all 19 item outcomes/counts reconciled; 29 saved-body SHA-256 checks; all 14 quoted spans at most 50 words; minimum same-request-host start gap 8.560 seconds; two-file tracked scope and whitespace. Final pnpm check:privacy passed with a two-report temporary index. The earlier full scan covered all 2110 indexed files; only these two reports changed afterward.
- No PR opened. No main push or merge. No old report, pack, data file or review decision modified. Next step: maintainer chooses the C1 test scope and a consistent R.U.R. boundary; any pack edits or admission need a separate task.
