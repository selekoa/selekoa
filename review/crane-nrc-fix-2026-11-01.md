# Correction: the NRC's Crane Clean Energy Center fuel amendment, 2026-11-01

A patch correction of one record, `cpo-pw-crane-nrc-fuel-amendment` (subject the U.S. Nuclear Regulatory Commission, predicate `regulator_decision`), shown in the compute build-out guide under “Regulator decisions”.

- **Script:** [`scripts/crane-nrc-fix.ts`](../scripts/crane-nrc-fix.ts). `--verify` retrieves the NRC's texts and matches the quotations, writing [`crane-nrc-fix-verification-2026-11-01.json`](crane-nrc-fix-verification-2026-11-01.json); without flags it writes the records and the before-snapshot; `--check` compares them with the stored data.
- **Before-snapshot:** [`crane-nrc-fix-before-2026-11-01.json`](crane-nrc-fix-before-2026-11-01.json), first in the chain in `src/editorial/historical-views.ts`. Base: branch `heterodox-admission` (v0.23.0); rebuilt on it after `control-timelines` (v0.22.1) was merged there, below.
- **Schema:** unchanged. **Editorial state:** the record stays a seed; no evidence is human-reviewed.

## What was wrong

The record rested on Constellation's statement of 6 August 2026 (its second-quarter results) that “the NRC has approved a fuel license amendment request for the Crane Clean Energy Center — a major milestone moving us closer to restarting operations in 2027”. Its statement, date (6 August 2026, basis announcement) and object were Constellation's account, and its qualification said the NRC approval document had not been retrieved.

The admission record of the compute, power and orbit pack, part 2 ([`cpo-admission-2-2026-10-30.md`](cpo-admission-2-2026-10-30.md), item 34), promised the correction from the NRC's own record: Amendment No. 307, dated 1 July 2026, concerns the receipt and possession of new fuel, not a restart. The two passages from the NRC's facility page were added as evidence, but the statement, date, object and qualification were not changed. **Cause:** in `review/cpo-admission-map-2026-10-30.json` the record's entry under `claims` was written as a one-element list, and `scripts/cpo-admission.ts` reads each entry as an object, so the fields were silently ignored. The historical map and script are left as they are (they reproduce the earlier release); this correction applies the change on its own.

## What changed

| Field         | Before                                                                                             | After                                                                                                                                                                                                                                                             |
| ------------- | -------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Statement     | Constellation stated on 6 August 2026 that the NRC had approved a fuel licence amendment request … | By Amendment No. 307, dated 1 July 2026, the NRC staff approved Constellation's request to revise the Crane Clean Energy Center facility licence and technical specifications to allow receipt and possession of new nuclear fuel and new sealed neutron sources. |
| Object        | Approval of a fuel licence amendment request for the Crane Clean Energy Center                     | Amendment No. 307 to the Crane Clean Energy Center facility licence: receipt and possession of new nuclear fuel and new sealed neutron sources                                                                                                                    |
| Time          | 2026-08-06, basis announcement (Constellation's statement)                                         | 2026-07-01, the amendment's date as both NRC texts give it; no basis, because neither says whether it is the date of issuance, signature or effect, and the amendment itself was not read                                                                         |
| Qualification | Rests on Constellation's report; the NRC approval document was not retrieved …                     | Rests on the NRC's own record; the facility page lists the approvals a restart would need separately; the amendment document refused; Constellation's statement is attributed context, and its 2027 target is Constellation's, not the NRC's                      |
| Evidence      | Constellation (context), facility page ×2 (supports)                                               | Facility page ×2 (supports, matched again, locators corrected), the NRC's Federal Register notice (supports, new), the facility page's list of restart approvals (context, new), Constellation (context, attributed to Constellation)                             |
| Attributes    | `statedDates`: 2027 operation target, stated by Constellation; `power`: nuclear, restart           | `statedDates` removed; `power`: nuclear, other                                                                                                                                                                                                                    |

- **New source:** `source-nrc-fr-2026-08-04-biweekly-notice`, the NRC's “Biweekly Notice; Applications and Amendments to Facility Operating Licenses …”, Federal Register 91 FR 49452–49458 (4 August 2026, FR Doc. 2026-15750), retrieved from govinfo.gov, recorded as a filing as the dataset's other Federal Register sources are. Its “License Amendment Issuances” entry for the Crane Clean Energy Center (Docket No. 50–289, on p. 49456) gives the amendment date (July 1, 2026), the ADAMS accession number (ML26135A004), Amendment No. 307 and the brief description quoted.
- **Constellation's 2027 target** is no longer a stated date of this record. It was shown under the NRC's decision, dated by it (the compute guide's list of stated dates read “Constellation Energy Corporation, 2026-07-01”) and without its author in the record panel. It stays in the qualification and in Constellation's quoted passage; a record of Constellation's own target would be a new record and a separate decision.
- **`power`** now says `other`: the amendment concerns receiving fuel, not a restart, and the sibling regulator decisions use `power` for what the decision concerns.
- **Identifier kept.** The record documents the same regulatory event (the NRC's approval of the fuel amendment that Constellation reported); only its basis and wording change, so its ID stays, as for other corrections of a live record.
- **Order.** The branch is built on `heterodox-admission` (v0.23.0) and merges after it; its before-snapshot is first in the chain only after that branch's.

## Retrieval

- **The NRC facility page** (`nrc.gov/…/ccec`) was retrieved again; both quoted passages match, and so does the context passage on the restart approvals. The page embeds per-request tokens, so its SHA-256 differs between retrievals of the same text; the hash in the source record is that of the correction's retrieval.
- **The amendment** (`nrc.gov/docs/ML2613/ML26135A004.pdf`, and the same path on `pbadupws.nrc.gov`) answered HTTP 403 from the NRC's server (Akamai “Access Denied”); the ADAMS search service refused the connection (HTTP 502 from the session's network policy). The amendment's own text is therefore not quoted; the NRC's published notice of it is. No other route was tried.
- **The Federal Register notice** was found through the Federal Register's own search interface and retrieved from govinfo.gov as PDF; its quoted description matches.

## Release

Dataset release **v0.23.1**, a patch release: a correction within an existing collection.

## Fresh-context review (2026-11-01)

A fresh-context machine review (Claude family) found the three NRC quotations verbatim, the statement, object and date supported by them, and the account of the cause accurate (the list-shaped map entry is the only one in any admission map). Its findings, all fixed:

- **Constellation's 2027 target** was a stated date of the NRC's record, dated by the NRC's action in the compute guide and shown without its author in the record panel (medium). Removed; see above.
- **Script.** A rerun overwrote the snapshot's `baseCommit`; `--verify` could restamp the verification file without checking the HTTP status; a stored snapshot that no longer applied would have been treated as foreign. The script now keeps the stored base, refuses to overwrite the verification file or to accept a non-200 retrieval, and stops when a stored snapshot does not describe the data.
- **Locators** of the two facility-page passages named a heading the page does not have (“Other Licensing Actions”); they now name the “Additional Activities” list. The Federal Register locator gives the page and section.
- **Notes.** The earlier notes of the facility-page passages are kept, with the correction's sentences after them; Constellation's passage says the check agreed with the record as admitted on 2026-10-30, and that reading its statement as Amendment No. 307 is Selekoa's; the facility source's access date and hash are explained.
- **Source record.** Kind `filing` and publisher the NRC, as for the dataset's other Federal Register sources; its length counts the notice's own pages, less page furniture.
- **Restart.** “Not an approval to restart” was an unanchored inference; the qualification now says what the facility page shows (the restart approvals are listed separately), with that passage as context.
- **Date basis.** The time note now says why no basis is given.

## Tests changed

- `transactions.test.ts`, `versions.test.ts` and the chain in `src/editorial/historical-views.ts` list the new snapshot first.
- `src/release/release.test.ts` (first made here; since the rebuild below it also comes from `heterodox-admission`, which needed it after the merge of v0.22.1): the changelog test read every release's files at once; with v0.23.1 the releases passed about 690 MB and the test worker ran out of heap (twice, reproducibly). It now reads only each release's manifest, which is all it compares. No limit was changed.
- The README coverage block was regenerated.

## Checks

- `pnpm tsx scripts/crane-nrc-fix.ts --verify`: the three NRC quotations and the context passage matched (facility page HTTP 200, Federal Register PDF HTTP 200). `--check`: the stored records match the correction.
- `pnpm -s validate:data`: valid (2,001 entities, 5,532 claims, 1,886 sources, 7,498 evidence records).
- `pnpm -s check`: format, lint, typecheck, 814 unit tests passed; 7,501 pages pre-rendered, 2,093 slice files (80.4 MB), no page needing the relation core.
- Bundle budgets: all sixteen pass, no limit changed. Start 112.9 of 115 KB; Hub 234.7 of 295; About 287.9 of 330; **Search 274.2 of 275** (the tightest); Explorer 266.0 of 330; Dossier 314.6 of 360; Person 234.6 of 295; Document 249.5 of 310; Claim 276.0 of 325; Collection 307.7 of 370; Comparison 287.8 of 520; Guide 328.6 of 630; Compute guide 277.3 of 340; Propositions 337.4 of 455; Year 340.2 of 400; Years index 230.9 of 305.
- `pnpm release 0.23.1 --check`: reproduces byte for byte. `pnpm -s check:privacy`: passed.
- Browser, affected specs (installed Chromium through an untracked copy of the configuration without the Edge channel, deleted afterwards; port 4173 otherwise free): compute build-out, chronicle and record pages, 24 passed. The full suite runs on the last branch of the chain.

## After the merges with control-timelines and main (2026-11-01)

The planning thread asked for `control-timelines` (release v0.22.1, the OpenAI control collection's version 2) to be merged into `heterodox-admission` and carried up the chain, then for `main` instead, which by then held `control-timelines` and the pre-launch interface (pull requests #124 and #125). `heterodox-admission` merged both, was rebuilt on `main` at e7f372c and re-released as v0.23.0 (see its admission record); it was merged in here each time, without rebase and without conflict.

- **Data:** neither branch changed the data this correction starts from, so its records are unchanged. The script was rerun with `--base` (an option added for rebuilds on a new base): the before-snapshot is the same except that its `baseCommit` names the new base, `heterodox-admission` at 9afc109.
- **Release:** v0.23.1 was re-cut against the re-cut v0.23.0 (3 added, 5 changed, as in the first cut). It differs from the first cut only in the collections as `main` has them (the OpenAI control collection's version 2, and the limits the pre-launch interface reworded) and in the checksums.
- **Code from the base:** the control timelines page and the pre-launch interface from `main`, and the people index without sort names from `heterodox-admission`.

### Checks after the merge with main

The checks after the merge of `control-timelines` alone (Search 274.9 of 275 KB, 834 unit tests, 31 browser tests) are superseded by these.

- `pnpm tsx scripts/crane-nrc-fix.ts --check`: the stored records match the correction. `pnpm -s validate:data`: valid (2,001 entities, 5,532 claims, 1,886 sources, 7,498 evidence records).
- `pnpm -s check`: format, lint, typecheck, 838 unit tests passed; 7,520 pages pre-rendered, 2,112 slice files (88.0 MB), no page needing the relation core.
- Bundle budgets: all seventeen pass, no limit changed. Start 110.8 of 115 KB; Hub 233.0 of 295; About 288.3 of 330; **Search 272.6 of 275** (the tightest); Explorer 264.2 of 330; Dossier 312.6 of 360; Person 232.8 of 295; Document 247.7 of 310; Claim 274.2 of 325; Collection 305.9 of 370; Comparison 287.2 of 520; Guide 327.3 of 630; Compute guide 275.5 of 340; Propositions 335.5 of 455; Control timelines 257.8 of 285; Year 338.5 of 400; Years index 229.2 of 305.
- `pnpm release 0.23.1 --check`: reproduces byte for byte. `pnpm -s check:privacy`: passed.
- Browser, affected specs against the new interface (as above): compute build-out, chronicle and record pages, 24 passed.
