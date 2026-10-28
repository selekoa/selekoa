# Author-person admission, 2026-10-27

The maintainer's decisions of 27 October 2026 admitted the [author-person pack](../research/author-persons/README.md) after the blind cross-family check ([Codex report](../research/author-persons/codex-check-2026-10-27.md): 172 items, 152 supported, 20 partly, 0 not supported). This record gives the decisions, what was admitted and held, every correction applied and the checks. [`admit.mjs`](../research/author-persons/admit.mjs) made the admission; the rows it added and the two person records it changed are in [`author-persons-before-2026-10-27.json`](author-persons-before-2026-10-27.json), the first entry in the chain of `src/editorial/historical-views.ts`.

All admitted records are seeds with machine-checked evidence. No person has reviewed them.

## Decisions (maintainer, 2026-10-27)

- Admit the candidate person records and authorship records, applying every correction of the cross-family report: printed name forms as aliases of the usual name, without an invented identity bridge; the locator and attribution-level fixes for A041, A053, A058, A085, A141, A025, A131–A133 and A134; the corrected Butler note; and the passages the check inspected in place of fallback evidence.
- Keep the threshold as prepared: no single-record authors.
- Hold Ben Goertzel: no person record now. A text of his will come with the AGI term provenance item in the roadmap backlog.
- Accept a username credit only with an inspected identifying source, keeping the printed username as an alias; otherwise hold the record.
- Leave company executives (Pichai, Nadella) out of this pass.
- Admit the 136 authorship records for existing persons and the alias “Eliezer S. Yudkowsky” with the same checks.
- Follow-up decision, the same day: admit A108 on the publisher's author-ID match. Keep Katja Grace held.

## Admitted

- **87 person records**, subtype “Author”, of the 88 candidates. Katja Grace is held (below). Each record has the name, a sort name, aliases for other printed forms, a description that says only which collection records the person's texts, and identity sources already in the dataset. No discipline, affiliation, role or private detail is recorded.
- **312 authorship records** (`authored`, person → document) of the pack's 315, with 314 evidence passages. 177 are on the new persons and 135 on existing ones: Eliezer Yudkowsky 130, Paul Christiano 3, Holden Karnofsky 1, Rohin Shah 1.
- **Aliases on existing persons:** “Eliezer S. Yudkowsky” (Eliezer Yudkowsky) and “paulfchristiano” (Paul Christiano).
- **One source:** `source-aimag-2006-dartmouth-proposal`, AI Magazine's 2006 reprint of the 1955 Dartmouth proposal. It is an identity source for the full names of the four authors whose typescript prints initials. It carries no claim evidence. The cross-family check did not audit it. The pack's separate identification claims were not admitted, because no predicate records them; the full names rest on the person records' identity sources.

No schema change.

## Held

| Record                                                | Reason                                                                                                                                 |
| ----------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| Katja Grace (person) and her two records (A037, A091) | Both posts credit only the username “KatjaGrace”. No inspected source identifies the account.                                          |
| Christiano, “Takeoff speeds” (A105)                   | The blog byline prints only “paulfchristiano”. The Alignment Forum capture that identifies the account (A107) does not cover the blog. |
| Butler, “Lucubratio Ebria” (1865)                     | As prepared: unsigned, and the attribution rests on a textual match, not on a cited authority.                                         |
| Ben Goertzel                                          | Maintainer decision: held until a text of his is admitted with the AGI term provenance item.                                           |
| Executives' company posts (Pichai, Nadella)           | Maintainer decision: not in this pass.                                                                                                 |
| 27 single-record authors                              | Threshold kept as prepared.                                                                                                            |

The held records are also listed in [`admission-held-2026-10-27.json`](../research/author-persons/admission-held-2026-10-27.json).

## Corrections applied

Item numbers are the cross-family brief's.

**Printed name forms.** The usual name is kept and printed forms are aliases. The statement and passage quote the printed form.

- Nick Bostrom (A010, A089): both 1996 messages are signed “Nicholas Bostrom”, which becomes the alias. The pack's restatement of “Nick Bostrom” is replaced by the signature. No other text links the forms. Bostrom has no other admitted record, and the record says it uses the usual form of the name.
- Timothy F. Bresnahan (A011) and Lorin M. Hitt (A039): the forms printed on the NBER cover become aliases. The cover was checked visually, because the scan has no text layer.
- Alan Turing (A085): the record name is the usual “Alan Turing”, with the alias “A. M. Turing”, the offprint's credit. The pack's “Alan M. Turing” and the website heading “Alan Turing” used as a byline are dropped.
- Charles I. Jones (A043): the passage is “Charles I. Jones”, as printed. The matcher's reordered form “Jones Charles I.” is removed from the passage, the statement and the aliases.
- Vernor Vinge (A134): the forwarding sentence is removed from the aliases. The record and passage are unchanged: Hanson sent the message, which forwards Vinge's text signed “Vernor”.
- Walter S. Buckingham Jr.: the sort name becomes “Buckingham, Walter S. Jr.”, because the sort-name rule allows one comma.

**Locators and attribution level.**

- A041 (Hyytinen): the PDF byline on page 1 (printed page 459), not a message header.
- A053 (Michie): the book title page on PDF page 6 (“DONALD MICHIE”). The chapter opens on PDF page 245 without a byline of its own, and the qualification says so. The 1968 original was not inspected.
- A058 (More): the heading “Comment by Max More” above the contribution, not the page head.
- A141 (Hanson): the chapter byline on PDF page 504 (printed page 493), not the collection cover. The qualification notes the chapter's own date, 3 July 2011.
- A025 (Diebold): the statement says that the condensation condenses Diebold's book and was prepared by the Controllership Foundation. The passage is the condensation's heading, “A Condensation of the Book Automation, by John Diebold”. This agrees with the existing Diebold condensation records.
- A131–A133 (Turing typescripts): each statement now says that the King's College archive catalogue attributes the typescript to Turing, or lists it among his papers. The qualification says that this is the catalogue's attribution, not a byline: the inspected pages print no personal name, and interior pages were not searched. The handwritten “TURING” on one version of A132 is mentioned, and its writer and date are left open. The evidence is a paraphrase of the catalogue with source role “secondary”, so these three records show as resting on secondary evidence.
- A134 (Vinge): kept as qualified.
- Butler: the README, `pack.json`, `pack.md` and a comment in `curation.mjs` no longer say that none of his texts prints his name. The 1901 revised edition prints it on its title page. The pack's records were already bounded.

**Username credits.**

- Evan Hubinger (A040, A094, A095): admitted with the alias “evhub”. The inspected identifying sources are the full-name bylines in the Internet Archive captures of 2019-09-23 and 2022-08-30, and the opening paragraph of the Risks from Learned Optimization introduction, which credits the paper to Evan Hubinger.
- Paul Christiano (A106, A107): A107 quotes the full-name byline of the 2019-06-08 capture, linked to the account “paulfchristiano”. A106 is on the same forum and quotes the username, and its qualification names A107's capture as the identifying source.
- Paul Christiano (A108), admitted by the maintainer's follow-up decision of 2026-10-27 on the publisher's author-ID match. The LessWrong GraphQL API, queried on 2026-10-27, returns the same author ID (`gb44edJjXhte8DA3A`, username `paulfchristiano`) for this post (`CoZhXrhpQxpy9xw9y`) and for “What failure looks like” (`HBxe6wdjxK239zajf`), on both lesswrong.com and alignmentforum.org. A106 (`nyCHnY7T5PHPLjxmN`) returns the same ID. The response SHA-256 values are `608ec85a…076d` (A108) and `5307c935…cc5` (A107). The record quotes the username, and its qualification names the match. The responses themselves were not kept. The query was run by the preparing model family; the cross-family check had inspected the byline.

**Replaced fallback evidence.** For the 35 admitted records that the preparer had not matched (three of the 38 are held), the pack's restatement of the source record's author list is replaced by the passage and locator the cross-family check inspected, with the capture date where it read an archive copy. These are A010, A011, A023, A026, A027, A028, A039, A040, A048, A050, A051, A055, A057, A060, A068, A074, A089, A090, A092–A104, A106–A108 and A109. A085 and A131–A133 were replaced as well (above). Each evidence note says so. The preparer's failure record stays in `retrieval.json` and `verification.json`.

**Discrepancies noted, not resolved.** These are recorded in the evidence notes. No date was changed.

- A010: the message header reads “04 Sep 95”, while the record is dated 1996.
- A057: Moravec's header dates the text July 1988; the record date is 1989.
- A096: the page prints “July 21, 1976” and “this version 1978”; the record date is February 1979.

**Quotation limits.** In 17 passages a quoted name would exceed a short document's quotation limit, or its source records no document length. These passages are labelled paraphrases that still give the printed form (“Credited as “J. McCarthy” (…)”), and each note says why. The sources are seven short messages and pages and eight scans: the Dartmouth facsimile, Extropy 13, the Eder relay, the Michie, Minsky and McKinstry sources, Turing's AMT/B/1 and Vinge's Omni scan. No source row was changed.

## Release

Patch release **v0.8.1**. The admission adds records to existing collections' texts and a new set of people, but no collection and no schema change. Under the version rule of 2026-10-26, a minor version needs a new collection or a schema change, and neither applies. The addition is larger than earlier patches, and the changelog lists it.

## Checks

- `pnpm install --frozen-lockfile`; `pnpm -s validate:data`: valid (937 entities, 2,483 claims, 782 sources, 3,127 evidence records).
- `pnpm -s check`: format, lint, typecheck, 597 unit tests passed (1 skipped), build and pre-render of 3,342 pages.
- `pnpm -s check:privacy`: passed.
- `pnpm release 0.8.1 --check`: reproduces byte for byte.
- `pnpm test:browser` (Chromium, through an untracked copy of the Playwright configuration without the Edge channel, deleted afterwards): 200 passed and 2 failed on the first run. Both failures came from frozen expectations that the admission changes. The OpenAI dossier now includes Christiano's two new authorship records, and the example document without an authorship record (Hanson 1994) now has one. `tests/browser/dossier-count.ts` now leaves out `ap-` records, as it does `lg-` records, and the example is now a held Grace post. The affected specs then passed (22 passed).
- Six unit tests froze counts or search results that the admission changes. They now leave out the admitted rows through the before-snapshot: `query`, `search`, `research-path`, `versions` and `transactions`, plus the regenerated README coverage block.
- Inspected in the app (production preview): People A–Z, in the browser and in the pre-rendered `institutions.html`, lists the new people, among them Robin Hanson, Daron Acemoglu, Alan Turing, Nick Bostrom and Walter S. Buckingham Jr. Katja Grace is absent, as held. The person pages (`/person/robin-hanson`, pre-rendered and live) show the authorship records, and Eliezer Yudkowsky's page lists his texts. The only console errors came from the analytics beacon, which this ad-hoc look did not stub.

After the A108 follow-up the data and release were regenerated from the base, and v0.8.1 was rewritten before any merge. Checks on the result: `pnpm -s check` passed (600 unit tests, build and pre-render). `pnpm release 0.8.1 --check` reproduces it. `pnpm -s check:privacy` passed. The data-dependent browser specs passed (quick-wins, research-path, dossier and search: 27 passed), and Christiano's pre-rendered person page lists the post.

## Open for the maintainer

- Katja Grace (kept held by the maintainer's follow-up decision): an identifying source for the account “KatjaGrace”, such as a full-name byline in an archive capture, would allow her two records.
- The three date discrepancies above (A010, A057, A096) belong to the document records, not to this admission.
- The 2006 AI Magazine identity source was not audited by the cross-family check.
