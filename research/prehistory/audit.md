# Fresh-context audit: prehistory candidate pack

- **Auditor:** a Claude-family model in a fresh context. It is the same model family as the preparer, so this is not a cross-family check.
- **Date:** 2026-11-02.
- **Pack audited:** `research/prehistory/pack.json` on branch `prehistory-pack` (29 records, 9 links).
- **Method:** I judged each sampled item against its cited source and against the criterion in `propositions.json` (U01, U02) or in `baseline.json` (`criterion`; W01, W02, W04, W08, B6, C1, C3, M06a). The rules came from `docs/editorial-policy.md` ("Short quotation", "Interpretation", "Earliest located texts") and `research/heterodox-thought/drafts/FORMAT.md`. I did not consult the review sections of `pack.md`, any `review/prehistory-pack-*` file or any `cross-family-*` file.
  - **Quotes in text-layer sources** were checked with a script that normalises whitespace, quotation marks and line-break hyphens, and then searches the cached `.txt`. Each `[…]` segment was searched separately. For each hit I read the surrounding text for context, page and chapter.
  - **Scans** were rendered with `pdftoppm -r 110 -gray`, and the PNG images were read.
  - **Dataset references** (entity and claim IDs in `datasetLink`, `to` and `existingEntity`) were checked against `data/entities.json` and `data/claims.json`.
- **Sample, random:** 24 of 38, seed 20261102.
  - pre-b6-capek-rur-1923
  - pre-c1-turing-c1951
  - pre-c3-wiener-1948-cybernetics
  - pre-link-turing-1950-names-hartree-1949
  - pre-link-turing-c1951-names-erewhon-1872
  - pre-link-wiener-1948-names-butler
  - pre-link-wiener-1960-names-butler
  - pre-link-wiener-1961-names-samuel-1959
  - pre-m06a-wiener-1948-cybernetics
  - pre-u01-samuel-1959-contests
  - pre-u01-turing-1951-contests
  - pre-u01-turing-c11-contests
  - pre-u01-wiener-1960-contests
  - pre-u01-wiener-1961-cybernetics-contests
  - pre-u02-erewhon-1872
  - pre-u02-kolmogorov-1961-letter
  - pre-u02-turing-1947
  - pre-u02-turing-1950
  - pre-u02-turing-c1951
  - pre-w01-capek-rur-1923
  - pre-w01-turing-c11-context
  - pre-w01-wiener-1948-cybernetics-context
  - pre-w02-erewhon-1872-contests
  - pre-w04-erewhon-1872-context
- **Sample, targeted:** 8 items that are consequential or risky.
  - pre-u01-lovelace-1843-notes
  - pre-u01-turing-1947-contests
  - pre-w01-butler-1865-lucubratio-ebria-contests
  - pre-u01-turing-1950-contests
  - pre-u01-samuel-1960
  - pre-w08-erewhon-1872-contests
  - pre-u01-turing-c1951-contests
  - pre-link-samuel-1960-names-wiener-1960
- **Coverage, compared with the text layer:**
  - Lovelace 1843: Internet Archive OCR, p. 722, Note G.
  - Lucubratio Ebria 1865: Papers Past OCR. No column image exists in the cache.
  - Erewhon 1872: Internet Archive OCR, pp. 187, 191 and 200–201. Chapter headings were checked.
  - R.U.R. 1923: Gutenberg text, Acts Two and Three.
  - Kolmogorov letter: PDF text layer, pp. 199–201, including the commentary.
  - Wiener, Cybernetics: 2019 reissue OCR, pp. 39–42, chapter IX and the chapter IX notes.
  - Samuel 1959: reprint text layer, abstract and reprint footer.
  - Samuel 1960: PubMed XML title and abstract.
- **Coverage, compared with the page image:**
  - AMT/B/1: PDF pp. 29–30 (typescript pp. 22–23).
  - AMT/B/19: PDF pp. 10, 18 and 27 (printed pp. 442, 450 and 459).
  - AMT/B/4: PDF pp. 7, 8, 9 and 16 (typescript pp. 1–3 and 10).
  - AMT/B/5: PDF pp. 1–2.
  - AMT/C/11: PDF pp. 1–4.
  - Wiener 1960: PDF p. 2 (printed p. 1355).
- **Not compared:**
  - The paraphrase evidence of pre-u02-turing-1950 was compared with the page image. The paraphrases of pre-u01-samuel-1960 and pre-link-samuel-1960-names-wiener-1960 were compared with the XML.
  - No passage was compared with an expression other than the cached one: no 1948 or 1961 printing of Cybernetics, no IBM Journal printing of Samuel 1959, no Czech R.U.R. and no 2001 Kolmogorov edition.
- **Retrieval failures:** no file needed for the sample was missing, and nothing was fetched from the web. The cache confirms the pack's recorded failures:
  - `butler-1863-papers-past`: a 212-byte bot-protection page, with an empty text file.
  - `jefferson-1949-pmc` and `hartree-1949-*`: JavaScript challenge pages.

## Results

| Item                                          | Quote                                                        | Date/identity                                               | Criterion & stance                                                                                                 | Register/wording                                          | Verdict | Note                                                                                                    |
| --------------------------------------------- | ------------------------------------------------------------ | ----------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------- | ------- | ------------------------------------------------------------------------------------------------------- |
| pre-b6-capek-rur-1923                         | ✓ text (Act Three, l. 2824)                                  | 1923 copyright ✓; claimed 1920 unsourced                    | Thin: a four-word line about stopping the unloading of firearms                                                    | fiction ✓                                                 | minor   | F1, F14                                                                                                 |
| pre-c1-turing-c1951                           | ✓ image (scan 9)                                             | c. 1951 (see F15)                                           | Meets C1: test performance "would hardly be considered an adequate proof"                                          | ✓                                                         | OK      | The flag over Weizenbaum (1966) follows from the dates                                                  |
| pre-c3-wiener-1948-cybernetics                | ✓ text (p. 42); truncation disclosed in note                 | 1948, attested 2019 ✓; the flag's condition is correct      | Borderline: has "others will develop it anyway" but not "competition between developers or states"                 | "the most anyone can do" paraphrases "any of us"          | minor   | F2                                                                                                      |
| pre-link-turing-1950-names-hartree-1949       | ✓ image (p. 450)                                             | ✓                                                           | cites ✓; external text ✓                                                                                           | ✓                                                         | OK      |                                                                                                         |
| pre-link-turing-c1951-names-erewhon-1872      | ✓ image (scan 16)                                            | ✓                                                           | cites ✓                                                                                                            | ✓                                                         | OK      |                                                                                                         |
| pre-link-wiener-1948-names-butler             | ✓ text (page break at pp. 39/40 disclosed)                   | 1948, attested 2019                                         | cites ✓; `samuel-butler` entity exists                                                                             | ✓                                                         | OK      |                                                                                                         |
| pre-link-wiener-1960-names-butler             | ✓ image (p. 1355, left column)                               | ✓                                                           | cites ✓                                                                                                            | ✓                                                         | OK      |                                                                                                         |
| pre-link-wiener-1961-names-samuel-1959        | ✓ text (ch. IX, note 8)                                      | 1961, attested 2019                                         | cites ✓                                                                                                            | ✓                                                         | OK      |                                                                                                         |
| pre-m06a-wiener-1948-cybernetics              | ✓ text                                                       | 1948, attested 2019 ✓; tier 2 as stated                     | Meets M06a                                                                                                         | ✓                                                         | minor   | F3 (locator)                                                                                            |
| pre-u01-samuel-1959-contests                  | ✓ text ("playa" OCR)                                         | Read in a later reprint (pp. 535 ff.), not the journal scan | contrary-only is defensible                                                                                        | ✓                                                         | minor   | F4                                                                                                      |
| pre-u01-turing-1951-contests                  | ✓ image (script p. 2)                                        | ✓                                                           | engages-premise ✓                                                                                                  | ✓; "A different" correction confirmed                     | OK      |                                                                                                         |
| pre-u01-turing-c11-contests                   | ✓ image (pp. 2 and 4; (e)/(d) mislabelling confirmed)        | undated ✓; claimed 1948 (see F14)                           | engages-premise ✓; objection (e) states U01                                                                        | ✓                                                         | OK      |                                                                                                         |
| pre-u01-wiener-1960-contests                  | ✓ image (left and middle columns)                            | ✓                                                           | engages-premise ✓                                                                                                  | ✓                                                         | OK      | p. 1355 footnote: adapted from a lecture of 27 Dec 1959. An optional claimed note                       |
| pre-u01-wiener-1961-cybernetics-contests      | ✓ text (ch. IX, p. 239)                                      | 1961, attested 2019 ✓                                       | contrary-only ✓                                                                                                    | ✓                                                         | OK      |                                                                                                         |
| pre-u02-erewhon-1872                          | ✓ text (p. 191; the omission is the narrator's interjection) | ✓                                                           | Meets U02 on a reading; see F5                                                                                     | fiction ✓                                                 | minor   | F5 (holds earliest-located)                                                                             |
| pre-u02-kolmogorov-1961-letter                | ✓ text (p. 199, theses 2–3)                                  | 1961 composition ✓; attested 2023 ✓                         | Thesis 3 meets U02 (conditional); thesis 2 is about modelling                                                      | The attested note adds details not in the source          | minor   | F6                                                                                                      |
| pre-u02-turing-1947                           | ✓ image (p. 22)                                              | ✓                                                           | Meets U02 ("obliged to regard the machine as showing intelligence")                                                | ✓                                                         | OK      | Qualification's Gödel remark matches p. 23 (Gödel is not named there)                                   |
| pre-u02-turing-1950                           | ✓ image (p. 442); paraphrase ✓                               | ✓                                                           | Evidence is a prediction about usage; the record discloses this                                                    | ✓                                                         | minor   | F7                                                                                                      |
| pre-u02-turing-c1951                          | ✓ image (scans 7–8)                                          | c. 1951 (F15)                                               | Both passages are weak for U02: one questions a commonplace, the other is "simulate", which the criterion excludes | ✓                                                         | minor   | F8                                                                                                      |
| pre-w01-capek-rur-1923                        | ✓ text (Act Three l. 3523; Act Two l. 2614)                  | 1923 ✓; claimed 1920 unsourced (F14)                        | Meets W01 (fiction)                                                                                                | fiction ✓; hazardNote apt (the handbill's next paragraph) | OK      |                                                                                                         |
| pre-w01-turing-c11-context                    | ✓ image (p. 1)                                               | undated ✓                                                   | bears_on ✓; "missing" accurate                                                                                     | ✓                                                         | OK      |                                                                                                         |
| pre-w01-wiener-1948-cybernetics-context       | ✓ text                                                       | ✓                                                           | bears_on ✓; "missing" accurate ("mechanical slaves")                                                               | ✓                                                         | OK      |                                                                                                         |
| pre-w02-erewhon-1872-contests                 | ✓ text (pp. 200–201, ch. XXII)                               | ✓                                                           | contrary-only ✓                                                                                                    | fiction ✓                                                 | minor   | F9 (ellipsis)                                                                                           |
| pre-w04-erewhon-1872-context                  | ✓ text (p. 187, ch. XX)                                      | ✓                                                           | bears_on ✓; "missing" accurate                                                                                     | fiction ✓                                                 | OK      | Quote is wholly on p. 187 (locator gives 187–188)                                                       |
| pre-u01-lovelace-1843-notes                   | ✓ text (p. 722, Note G; "re- lations" OCR)                   | 1843 ✓; signed A. A. L.                                     | Meets U01 ✓; earliest-located follows from the dates                                                               | ✓                                                         | minor   | F10                                                                                                     |
| pre-u01-turing-1947-contests                  | ✓ image (p. 22, both quotes)                                 | 1947-02-20 delivery ✓                                       | engages-premise ✓; earliest-located contesting follows from the dates                                              | ✓                                                         | OK      | Rationale omits the first concession ("certainly true in the sense that … made some mistake"). Optional |
| pre-w01-butler-1865-lucubratio-ebria-contests | ✓ text (omission "to animalise them," honest)                | ✓                                                           | contests W01 ✓ ("final triumph over mankind" is supremacy); engages-premise ✓                                      | dream ✓ (valid schema value)                              | OK      | The flag over Lanier (2000) follows from the dates                                                      |
| pre-u01-turing-1950-contests                  | ✓ image (pp. 450 and 459)                                    | ✓                                                           | engages-premise ✓; earliest-located-term follows                                                                   | Qualification "relays … through Hartree" is inexact       | minor   | F11                                                                                                     |
| pre-u01-samuel-1960                           | paraphrase ✓ against the XML                                 | ✓                                                           | "only the logical consequences of its input" meets U01, but the abstract's authorship is unknown                   | ✓                                                         | minor   | F12                                                                                                     |
| pre-w08-erewhon-1872-contests                 | ✓ text                                                       | ✓                                                           | engages-premise ✓                                                                                                  | fiction ✓                                                 | minor   | F9 (same passage)                                                                                       |
| pre-u01-turing-c1951-contests                 | ✓ image (scans 8–9; page break as noted)                     | c. 1951 (F15)                                               | contrary-only ✓                                                                                                    | ✓                                                         | OK      |                                                                                                         |
| pre-link-samuel-1960-names-wiener-1960        | paraphrase ✓ against the XML                                 | ✓                                                           | Identification by identical title only; no quoted name                                                             | ✓                                                         | minor   | F13                                                                                                     |

## Findings

**F1, pre-b6-capek-rur-1923 (minor).**

- **Issue:** The only evidence is "We can't stop them." In context (Act Three, ll. 2819–2824) it answers Busman's "How can I _stop_ them?" about unloading firearms. The record's B6 reading rests on the play's plot rather than on the line. The qualification also lacks the caveat in the W01 record that the Robots are synthetic living beings, not mechanisms, although the play does call them machines (l. 799: "You can't kill machines").
- **Correction:** Add the caveat, and either add a passage that states the loss of control or accept the record as a thin staged instance.

**F2, pre-c3-wiener-1948-cybernetics (minor).**

- **Issue:** The passage says suppression would hand development to "the most irresponsible and most venal of our engineers". That is the "others will develop them anyway" mechanism. It names no competition between developers or states, which C3's criterion puts first. The statement also renders "the most any of us can do" as "the most anyone can do".
- **Correction:** Keep it as an articulation only if the maintainer reads C3 to cover displacement to other engineers. Otherwise record it as bears_on, with missing set to "competition between developers or states". Restore "any of us".

**F3, pre-m06a-wiener-1948-cybernetics (minor).**

- **Issue:** The first quote ("The modern industrial revolution … routine decisions.") is wholly on reissue p. 40.
- **Correction:** Change the locator from "pp. 40–41" to "p. 40".

**F4, pre-u01-samuel-1959-contests (minor).**

- **Issue 1, the copy read:** The cached `samuel-1959-mit` file is a later reprint in an unidentified collection, numbered 4.3.3 with pp. 535–554, and its footer reads "Originally published in IBM Journal, Vol. 3, No.3. July, 1959". It is not a scan of the journal. The pack source's `version` ("Scan of the journal article with a text layer") is wrong. The dataset source `source-th-d-samuel-1959` describes it correctly.
- **Issue 2, the date rule:** Under the FORMAT reprint rule, the wording is read in a later expression whose date is unknown.
- **Issue 3, the stance:** The contrariety is the pack's reading of the criterion's "know how to specify" clause. Samuel's own 1960 reply (pre-u01-samuel-1960) treats machine output as consequences of input.
- **Correction:** Correct the source `version`. Add a note that the wording is read in a later reprint, or an attested note if the maintainer applies the rule strictly; no role depends on it. Add one sentence to the qualification saying that the contrariety is read against the criterion, not stated by Samuel.

**F5, pre-u02-erewhon-1872 (minor; the record holds earliest-located).**

- **Issue:** Just before the quoted sentence (pp. 190–191), the treatise speculates about "some new phase of mind which shall be as different from all present known forms of consciousness as the consciousness of animals is from that of vegetables". It then points to the higher machines as its possible seat. U02 requires consciousness or mind "in the sense in which these are ascribed to people".
- **Correction:** Say in the qualification that the mechanical consciousness the treatise envisages may be unlike human consciousness, and ask the cross-family check to confirm the criterion is met. Optionally add the treatise's "who can say that the vapour engine has not a kind of consciousness?" (p. 192) as context.

**F6, pre-u02-kolmogorov-1961-letter (minor).**

- **Issue 1, the statement:** The statement says the letter "restates his theses for the lecture". The letter says these are theses as he formulated them for _Tekhnika — molodezhi_. The commentary says the five theses of that preface were carried into the letter unchanged.
- **Issue 2, the attested note:** The note says the theses were printed in 1961 "(rotaprint)" and in _Vozmozhnoe i nevozmozhnoe v kibernetike_ "(1963)". The source says only that the theses were duplicated (размноженные) before the lecture, and names the collection without a year.
- **Issue 3, thesis 2:** Thesis 2 concerns modelling, which U02 excludes on its own, but it is marked `supports`.
- **Correction:** Reword the statement as "restates, as formulated for _Tekhnika — molodezhi_, five theses of his lecture". Remove or source "rotaprint" and "1963". Set thesis 2's support to `context`.

**F7, pre-u02-turing-1950 (minor).**

- **Issue:** The quoted sentence predicts a change in word use and opinion. In the same paragraph Turing calls "Can machines think?" too meaningless to deserve discussion. The record discloses this, but its evidence does not itself say that a machine could think.
- **Correction:** Add a passage from section 6 in which the paper answers a contrary view on its merits. Otherwise accept the record knowingly, as the qualification already asks.

**F8, pre-u02-turing-c1951 (minor).**

- **Issue:** The evidence is (a) the stated purpose of questioning "You cannot make a machine to think for you" and (b) "simulate the behaviour of the human mind very closely". U02's criterion excludes simulation that is not claimed to amount to thinking. The talk's clearer statement is on p. 10 (scan 16): "once the machine thinking method had started, it would not take long to outstrip our feeble powers". The dataset already quotes it in ht-w01-turing-c1951-heretical-theory, so it is counted once.
- **Correction:** Add the p. 10 passage as supporting evidence, and set the "simulate" passage to `context`.

**F9, pre-w02-erewhon-1872-contests and pre-w08-erewhon-1872-contests (minor).**

- **Issue:** `[…]` marks a page break where no words are omitted. An ellipsis signals an omission. The note discloses it, but the quote as displayed misleads.
- **Correction:** Remove the `[…]` from `passage` and use `matchText` for the page break, as the Wiener records do.

**F10, pre-u01-lovelace-1843-notes (minor).**

- **Issue:** The document's `authors` field reads "Ada Lovelace (signed A. A. L.)". The qualification says that the attribution to Lovelace is not established by the volume.
- **Correction:** Use "A. A. L. (attributed to Ada Lovelace)" in `authors`, on the pattern of the Butler 1865 document. Leave the statement as written: "signed A. A. L." is accurate.

**F11, pre-u01-turing-1950-contests (minor).**

- **Issue:** The qualification says the section "relays Lovelace's statement through Hartree (1949)". On p. 450 Turing quotes the statement from "a memoir by Lady Lovelace" and then says that Hartree quotes it. It is the 1951 script that says "as Hartree has already quoted".
- **Correction:** Reword as "quotes Lovelace's statement, and notes that Hartree (1949, p. 70) also quotes it".

**F12, pre-u01-samuel-1960 (minor; consequential if admitted).**

- **Issue:** The articulation rests on a PubMed abstract whose author is unknown. It may be the journal's summary. `sourceRole: primary` is therefore uncertain.
- **Correction:** Do not admit the record until the article body is read, as the qualification already says. Until then, consider `sourceRole: secondary`, or a note that the abstract's authorship is unverified.

**F13, pre-link-samuel-1960-names-wiener-1960 (minor).**

- **Issue 1, the evidence:** FORMAT requires a link to have "a quotation containing the name". The evidence is a paraphrase, and Samuel's indexed title names Wiener's title but not Wiener. The identification with Wiener's article rests on identical titles in the same journal and year, which is strong but inferred.
- **Issue 2, the quote limit:** A verbatim title is limited by the under-2,000-word rule for this 45-word source.
- **Correction:** Keep the link as a candidate that depends on reading the article body. State in the qualification that the identification is by identical title.

**F14, cross-cutting (minor; verdicts above not downgraded for it alone).**

- **Issue:** Some claimed dates rest on "commonly given" or "usual" dating, with no cited source: R.U.R. Czech 1920 (pre-w01-capek-rur-1923, pre-b6-capek-rur-1923), and the NPL report 1948 for AMT/C/11 (pre-u01-turing-c11-contests, pre-w01-turing-c11-context). FORMAT asks that a claimed date name the page or source that states it.
- **Correction:** Cite the authority for each claimed date, or mark it as unsourced.

**F15, cross-cutting (note).**

- **Issue:** AMT/B/4 records use `date: "1951"` with `basis: "delivery"`. The archive's catalogue dating is c. 1951, and no delivery date is attested in the typescript. The C1 flag over Weizenbaum (1966) is unaffected.
- **Correction:** Keep the "c." in the structured date or in the display, consistently with the dataset entity.

**Observation (outside the sample).** AMT/C/11 p. 1 quotes Dorothy Sayers (_The Mind of the Maker_, p. 46): "we have no experience of machines that produce variety of their own accord: the nature of a machine is to do the same thing over and over again". As Turing quotes it, the passage may bear on U01. Sayers (1941) is named only in a link, and it does not appear in the omissions or the U01 search log. Recommended: add it to the omissions or the Codex list.

No stretching was found: every sampled text meets, contests or plausibly bears on the stated criterion. The weakest fits are F1, F2, F7 and F8. No sampled statement uses priority words, evaluative verbs or labels for people. All sampled quotes are at most 50 words; the longest is 43.

## Summary

- OK: 18 of 32.
- Minor: 14 of 32 (F1–F13; F9 covers two records). F14 and F15 are cross-cutting.
- Material: 0 of 32.

## Dispositions (preparer, 2026-11-02)

Applied in the drafts and regenerated (`tools.py merge`, `render.py`, `brief.py`); the cross-family brief was regenerated before any check began.

- **F1** Čapek B6: qualification now notes the synthetic beings and the single line. Kept as an articulation in fiction (review note, question 7).
- **F2** Wiener C3: now `bears_on` (context) with the missing element (competition between developers or states); "any of us" restored; flag removed.
- **F3** Locator corrected to p. 40.
- **F4** Samuel 1959: the source is now described as a later reprint; the qualification says the contrary reading is the pack's.
- **F5** Erewhon U02: qualification notes "some new phase of mind"; left to the cross-family check.
- **F6** Kolmogorov: statement names the Tekhnika — molodezhi formulation; the unsupported "rotaprint" and "1963" removed from the attested note; thesis 2 is context.
- **F7** Turing 1950 U02: kept; the qualification records the point for the cross-family check.
- **F8** Turing c. 1951 U02: the p. 10 sentence on the "machine thinking method" is now the supporting evidence; the "simulate" passage is context.
- **F9** Erewhon W02/W08: the quotation is now continuous, matched with `matchText` skipping the page break.
- **F10** Lovelace source authors now read "attributed to Ada Lovelace".
- **F11** Turing 1950 U01 qualification corrected (Turing quotes Lovelace and says Hartree also quotes her).
- **F12** Samuel 1960: qualification notes the uncertain authorship of the abstract; recommended hold stands.
- **F13** Samuel → Wiener link dropped (no quoted name); recorded as an omission.
- **F14** Claimed dates without a source removed (R.U.R. 1920, AMT/C/11 1948); both dates now appear only in notes as "usually given, not established here".
- **F15** AMT/B/4 records now carry basis "catalogue" (c. 1951, approximate); the C1 flag is unchanged.
- **Sayers** added to the U01 search log and the omissions as a lead.
