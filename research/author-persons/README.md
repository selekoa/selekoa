# Author persons: candidate person records for credited authors

A candidate pack that proposes person records for people credited as authors of texts that Selekoa's proposition collections record, and authorship records linking them to those texts. It answers the reader-test finding of 26 October 2026 that authors whose texts the collections quote (Robin Hanson, Nick Bostrom, Daron Acemoglu, William Nordhaus, Wassily Leontief and others) are missing from People A–Z and have no person page, and that Eliezer Yudkowsky's page shows two authorship records for an author with about 130 texts in the dataset.

**Status: admitted on 2026-10-27, with corrections and held records.** The maintainer's decisions of 27 October 2026 admitted the pack after the blind cross-family check ([report](codex-check-2026-10-27.md)), applying every correction of the report; [`admit.mjs`](admit.mjs) made the admission, [`admission-held-2026-10-27.json`](admission-held-2026-10-27.json) lists the records held back, and the [admission record](../../review/author-persons-admission-2026-10-27.md) gives the decisions, corrections and checks. The pack files below are kept as prepared, apart from the corrected Butler wording; the admitted records are in `data/`. No person has reviewed them. **Follow-up, 2026-10-28:** Katja Grace and her two records (A037, A091) were admitted on the identifying source found by the [cross-family identity check](codex-identity-2026-10-27.md), with “KatjaGrace” as an alias, and removed from the held list ([record](../../review/followups-2026-10-28.md)).

- [pack.md](pack.md): the readable pack: each proposed person with name, sort name, aliases, description, identity sources and authorship records; authorship records for four existing person records; the authors left out. Generated from [pack.json](pack.json).
- [verification.json](verification.json): for every authorship record, the retrieval (address, route, SHA-256, date) and where the credited name was found, with addresses removed from the context.
- [retrieval.json](retrieval.json): every retrieval attempt, including failures.
- [gpt-check-input-2026-10-27.md](gpt-check-input-2026-10-27.md): a blind brief for the cross-family check, with its separate [verdicts file](gpt-check-verdicts-2026-10-27.json). Run it locally; see "Cross-family check" below.
- [inventory.json](inventory.json): every author named in a source record's structured author list, with or without a person record, and the claims resting on their sources by collection.
- [selection.json](selection.json): the authors of studied texts, with each text, the source read for it and the records on it.
- Tools: [inventory.ts](inventory.ts), [select.ts](select.ts) (`pnpm exec tsx …`), [tools.mjs](tools.mjs) (`fetch`, `fetch --retry`), [build.mjs](build.mjs), [curation.mjs](curation.mjs) and [render.mjs](render.mjs). Retrieval bodies stay in the ignored `.local/author-persons/` cache.

```sh
pnpm exec tsx research/author-persons/inventory.ts
pnpm exec tsx research/author-persons/select.ts
node research/author-persons/tools.mjs fetch      # add --retry to retry failures
node research/author-persons/tools.mjs fetch-ocr  # OCR text of Internet Archive scans named in source records
node research/author-persons/build.mjs            # pack.json, verification.json
node research/author-persons/render.mjs           # pack.md, cross-family brief and verdicts
pnpm exec prettier --write research/author-persons
```

## Scope

**Studied texts.** A text is in scope when its document record is the subject of at least one proposition record (articulates, contests or bears on a proposition) in the superintelligence, Yudkowsky or economics collection. These are the texts the collections quote as objects of study, not texts used only as evidence for another fact. The source read for a text is the one its proposition records cite most.

**Authors.** Every person in the structured author list (`authorNames`) of that source. Organisations, committees and pseudonymous literals are not people and are not split. One printed form of a name is matched to another when the family names agree and the given names agree, or one is an initial of the other (so "A. M. Turing" and "Alan M. Turing" are one candidate, "Charles I. Jones" and "Benjamin F. Jones" are two).

**Threshold.** A person record is proposed for an author with at least two records on their texts (claims whose subject or object is the text), or with one record where the text holds an earliest-located or most-developed role, or where the maintainer's decision names the person (Walter P. Reuther). Samuel Butler is added by hand: the 1863 letter is signed “Cellarius” and the 1872 first edition was anonymous; his name is printed in the revised edition of 1901, whose signed preface claims the earlier texts.

**Existing person records.** Where an author already has a person record (Eliezer Yudkowsky, Paul Christiano, Holden Karnofsky, Rohin Shah), the pack proposes only the missing authorship records and the credited forms not yet among the record's aliases.

## What a candidate contains

- **Person record**: proposed ID, the name printed most often (other printed forms as aliases), a sort name in "Family, Given" form under the ontology's rule, the subtype "Author", a description that says only which collections record the person's texts and names one of them, and up to three identity sources, all already in the dataset. No discipline, nationality, birth date, affiliation history, photograph or contact detail is recorded. A discipline is not stated because no source was inspected for it.
- **Authorship records** (`authored`, person → document): one per text, explicit and supported, dated as an event by the source's publication date, with one primary passage: the name as printed in the byline, title page, post author data or message header, quoted verbatim. Addresses in message headers are never reproduced. Each record carries the check result: "name matched" only where the name was found in a byline position of a fresh retrieval.
- **Identification records**: only where a text prints initials. The 1955 Dartmouth proposal credits "J. McCarthy", "M. L. Minsky", "N. Rochester" and "C. E. Shannon"; AI Magazine's 2006 reprint (proposed as a new identity source in `pack.json`) gives their full names, which become the record names, with the printed forms as aliases. No affiliation or role is proposed: a printed affiliation does not establish employment (see `docs/person-profiles.md`), most would need organisation records the dataset does not have, and the authorship records already identify each person by the texts they are credited on. See the open questions in the [review note](../../review/author-person-pack-2026-10-27.md).
- **Overrides**: three bylines the matcher cannot read are read by the preparer and recorded in `curation.mjs` (Solomonoff's dropped ligature, Vinge's OCR title page, and Vinge's 1998 text forwarded by Robin Hanson). Samuel Butler is built by hand there, because the matcher cannot read the preface's claims to the earlier texts. (Corrected on 2026-10-27 after the cross-family check: this note earlier said that none of his texts prints his name, but the revised edition's title page does.)

## Method

1. `inventory.ts` lists every structured author name in the source records and matches it against person records by family name and compatible given name.
2. `select.ts` keeps the authors of studied texts and records, per text, the source read, the printed form, the author position and count, the records on the text by collection, and any earliest-located or most-developed role.
3. `tools.mjs fetch` retrieves each selected source sequentially, at least 4 s apart per host: the evidence address first, then the archive copy, then the canonical address. LessWrong and Alignment Forum posts are read through the publisher's GraphQL API, which returns the post's author and co-authors. PDFs are converted with `pdftotext` (first three pages).
4. `build.mjs` searches each retrieval for the credited name (as printed, as "Family, Given", given and family, initial and family) and counts a match only in a byline position: a message header (the name followed by its address or after "From:"), a message signature, the first two pages of a PDF, the head of a web page, a "STATEMENT OF" or "by" heading in an OCR text, or the post data. Addresses are blanked before matching. A post credited only under a username, a different given name, a family name alone or a name found elsewhere in the text is not counted as matched. The passage is the matched text, verbatim.
5. `render.mjs` writes the readable pack and the blind cross-family brief.

## Limits

- **Archive copies could not be retrieved.** web.archive.org refused connections from this environment throughout the pass, so sources whose only addresses are archive captures are "not retrieved"; where a canonical address worked, the current copy was read instead and the check says so. The maintainer can retry locally with `node research/author-persons/tools.mjs fetch --retry`.
- **A name match is not an identity check.** It shows that the text credits the name, not that two texts with the same name are by the same person. Merges across printed forms are listed per candidate and are all in the cross-family brief.
- **Mailing-list sender names** are the names the archive shows in the message header. They are what the list credited; they are not verified identities.
- **Selection is by structure, not judgement.** Authors are included because the collections record their texts; the pack does not rank them or claim that the list of people who wrote on these questions is complete.
- **Counts are as of the pack's baseline.** Records on a text change when the collections change; the numbers in `pack.md` are the pack's, not the dataset's current ones.

## Cross-family check

The editorial policy requires a check by a model of a different family before any admission. The brief is blind: each item gives a source, its address and a neutral question; the pack's answers are in the separate verdicts file, to be opened only after the blind pass. It covers each proposed person once, every record not matched in the preparer's retrieval, every record resting on more than one passage or on a later statement, every person with more than one printed form and a random 20% of the rest. The reviewer returns `gpt-check-2026-10-27.json` and `gpt-check-2026-10-27.md` in this folder. The check was run blind by Codex on 2026-10-27 and returned as one report, [`codex-check-2026-10-27.md`](codex-check-2026-10-27.md): 152 items supported, 20 partly, none not supported. The admission applied its corrections.
