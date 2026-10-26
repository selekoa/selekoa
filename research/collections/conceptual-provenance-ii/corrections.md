# Source-integrity: separate upstream correction proposal

Collection conceptual-provenance-ii, version 2; checked 2026-09-28. Fingerprint: sha256:e32152b0089ee10672552d7af38386001419f88a7382a0fae8ea243255691fb3.

Exploratory machine research; not editorially accepted. Human review is not recorded.

Target repository: futurelightcone/source-integrity, commit 54c62fc426d7b6ae008fd6acd3f53a0b993248ac. Status: **proposed, not applied**. This is a reviewable proposal in Selekoa; no upstream working-tree changes, private drafts or later report revisions were imported. The upstream maintainer must choose expression-ID migrations and apply corrections in a separately versioned change.

Keep old cells, original packet mappings, wrong-object evidence and unresolved assertions as history. Adding a correct intended expression does not rehabilitate the erroneous identifier.

## CP2-C01

Target: reports/canonical-sources.csv, data-record ordinal 28; projected row sha256:3348dba8a94093403d06b9d196fdf2e7ef9b16880d677decbdb1994a7b3d1546. Parent sources/EXP-SRC-C4858D4EF280D8/catalogExpressionUrl.

Before:

```json
"https://arxiv.org/abs/1906.01820v4"
```

Proposed representation:

```json
"https://arxiv.org/abs/1906.01820v1"
```

Split v1 from the unsubstantiated v4 catalog label and separately observed v3. Preserve old catalog value in a correction history; retain stable source/work IDs only with expression-level migration rules.

Evidence decisions: CP2-F01, CP2-F03. Status: proposed_not_applied.

## CP2-C02

Target: reports/canonical-sources.csv, data-record ordinal 28; projected row sha256:3348dba8a94093403d06b9d196fdf2e7ef9b16880d677decbdb1994a7b3d1546. Parent sources/EXP-SRC-C4858D4EF280D8/expressionDateAsReported.

Before:

```json
"2019-06-05"
```

Proposed representation:

```json
{
  "submission": "2019-06-05",
  "currentPdfTitle": "2022-03-24",
  "pdfCreated": "D:20220324092906Z"
}
```

Replace the overloaded date field with explicitly typed dates; original submission date is not erroneous. Do not date the underlying work to 2022.

Evidence decisions: CP2-F02. Status: proposed_not_applied.

## CP2-C03

Target: reports/canonical-sources.csv, data-record ordinal 14; projected row sha256:33d1dbf0a91c5d418e04906ab4b77ff38c27bc881b4f8140fa22ebb9ba1eac80. Parent sources/EXP-SRC-5F06443CBCE60C/catalogExpressionUrl.

Before:

```json
"https://www.alignmentforum.org/posts/7W8HqksjBXDcKkrD7/ea-vegan-advocacy-is-not-truthseeking"
```

Proposed representation:

```json
"https://www.alignmentforum.org/posts/aW288uWABwTruBmgF/ea-vegan-advocacy-is-not-truthseeking-and-it-s-everyone-s-1"
```

Keep this source as the wrong-object evidence. Quarantine 7W as unidentified. Create a separate GNh expression for the intended work; never relabel the wrong-object record as Soares.

Evidence decisions: CP2-F04, CP2-F05. Status: proposed_not_applied.

## CP2-C04

Target: reports/canonical-sources.csv, data-record ordinal 14; projected row sha256:33d1dbf0a91c5d418e04906ab4b77ff38c27bc881b4f8140fa22ebb9ba1eac80. Parent sources/EXP-SRC-5F06443CBCE60C/expressionDateAsReported.

Before:

```json
"2022-02-17T12:00:00Z"
```

Proposed representation:

```json
{
  "currentEmbeddedPostedAt": "2023-09-28T23:30:03.390Z",
  "historicalCapture": null
}
```

The baseline 2022 date conflicts with the matched wrong-object post metadata. Preserve it as superseded reporting; this correction is not a publication-day archive authentication.

Evidence decisions: CP2-F04. Status: proposed_not_applied.

## CP2-C05

Target: reports/canonical-claims.csv, data-record ordinal 2; projected row sha256:34f8a5761dcea914407e934860184dcebe3b469c9352d0fe172f355e7e9a5a8e. Parent records/si-pcr-002/search.earliestPositiveEvidenceAsReported.

Before:

```json
"2004 (positive occurrence only)"
```

Proposed representation:

```json
"2004-attributed work in a later reprint; no authenticated contemporary exact-name occurrence found in the bounded 2001–2004 search"
```

Qualify expression provenance without converting the already unresolved priority proposition into a positive priority claim. Attach the bounded search and date anomaly.

Evidence decisions: CP2-F06, CP2-F07, CP2-F09, CP2-F11. Status: proposed_not_applied.

## Adoption conditions

Validate the proposal against the pinned cells and reconcile any newer upstream edits separately. Introduce expression-specific identities for v1, v3, the unsubstantiated v4 label, the two disputed forum IDs and the intended forum post. Retain the parent evidence and packet mappings; add correction links rather than rewriting their history. Keep CEV priority and transmission unresolved. Re-run upstream generation and review in its own repository only after a separately authorized correction task.
