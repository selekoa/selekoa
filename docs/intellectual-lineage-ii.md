# Intellectual Lineage II — oversight and documented reception

Checked 2026-09-25 against corrected baseline `95f9d26`. This bounded increment adds **9 entities, 21 claims, 9 sources and 21 evidence records**. Every new claim is a seed and every new passage is machine-checked. No earlier record, human decision or audit is replaced. Schema remains **2.4**; there are no UI changes.

## What the increment establishes

| Question                                                             | Admitted evidence                                                                                                                                               | Limit                                                                                                                                         |
| -------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| How do amplification, debate and recursive reward modelling connect? | Amplification cites and compares debate; reward modelling cites amplification and describes a conceptual variant. Selected author blocks identify contributors. | Comparison and reformulation are not reports of implementing another paper's method.                                                          |
| How do these proposals appear in later oversight research?           | Self-critiquing models cites all three; Weak-to-Strong Generalization cites all three and the critique study.                                                   | The latter distinguishes improving supervision from generalizing beyond it. A branching citation structure is not a single adopted algorithm. |
| Is there a documented historical-to-lab path?                        | The DeepMind-affiliated reward-modelling paper cites MIRI's 2016 ML agenda, including its informed-oversight questions.                                         | This is specific documentary reception, not adoption of an entire institutional agenda or a Good/IEM-to-Superalignment bridge.                |
| Is programme context explicit?                                       | OpenAI's release page identifies the weak-to-strong paper as a Superalignment output; the earlier programme announcement discusses assisted evaluation.         | Retrieved mutable pages do not authenticate their exact wording on the displayed historical dates.                                            |

See the dossiers: [amplification and reward modelling](../research/lineages/oversight-amplification-reward.md), [assisted evaluation and weak-to-strong](../research/lineages/oversight-critique-weak-strong.md), and [MIRI agenda reception](../research/lineages/miri-ml-agenda-reception.md). [U1–U3 remain unresolved](../research/intellectual-lineage-unresolved.md), with the new search bounds recorded there.

## Selection and relation discipline

The admitted predicates are 4 `authored`, 11 `cites`, 4 `discusses` and 2 `published`. Each claim has its own passage, locator, qualification and stable ID. The selection is explanatory, not a census of authors, references or oversight methods.

No new `uses_method_from` edge is admitted. The recursive reward-modelling paper's classification of its proposal as an instance of amplification is a conceptual reformulation, not a report of implementation. Critique and weak-to-strong citations likewise do not establish methodological adoption. The reformulation and contrast remain in qualifications and dossiers; neither requires a new predicate. Actor credit is not inferred from a document citation or an author list. Unresolved similarity remains outside application data.

## Expressions and dates

Six paper sources pin arXiv v1: Concrete Problems `1606.06565v1`, debate `1805.00899v1`, amplification `1810.08575v1`, reward modelling `1811.07871v1`, critique `2206.05802v1`, and weak-to-strong `2312.09390v1`. Event dates mean first submission, not method invention. Work-level citations do not prove which target revision was read.

The MIRI PDF has no authenticated revision date. Its publisher's dated announcement establishes the work's 2016 identity; the 2018 citing paper independently fixes its historical reception. Claims about the retrieved PDF's author block retain that version limitation. MIRI and OpenAI announcement sources are current expressions with displayed historical dates. No historical web capture was authenticated. RSP v1.0 and v2.0 were inspected through the document reader when direct local downloads returned HTTP 403; no blocked download is treated as source evidence.

## Review and preservation

[The separate review pack](../review/intellectual-lineage-ii-review.md) contains **21 new claims, zero context repeats**, with blank human fields. The [order](../review/intellectual-lineage-ii-order.json) fixes numbering; claim IDs remain authoritative. The [increment manifest](../review/intellectual-lineage-ii-increment.json) fingerprints all four baseline collections, including the authorized corrections and their limited human-review states. Historical tests reconstruct the pre-correction view without rewriting old packs.

The original generation command is retained below. After audit annotation, use the focused editorial test to reproduce the blank body without overwriting the working pack:

```sh
pnpm exec vitest run src/editorial/lineage-ii.test.ts
```

Original blank-pack command (the overwrite guard intentionally rejects the annotated working pack):

```sh
pnpm review:seed --lineage --increment review/intellectual-lineage-ii-increment.json --order review/intellectual-lineage-ii-order.json --title "intellectual lineage II — oversight and documented reception" --output review/intellectual-lineage-ii-review.md --check
```

Human inspection should prioritize `lineage-ii-reward-cites-amplification` (reformulation versus use), `lineage-ii-reward-cites-miri-agenda` (scope of reception), `lineage-ii-openai-published-weak` (programme attribution and mutable version), and one of each grouped critique/weak-to-strong citation set. All 21 still require editorial decisions; the review pack now preserves the supplied Claude and Grok audits, each reporting 21 YES and zero other verdicts. These are attributed machine assessments, not human review.

## Future lineage view

Show citation direction and the exact claim wording; do not label a connected path as causal influence. Keep authorship separate from document transmission. Expose contrast/reformulation qualifications next to citations and source versions next to dates. A path through several cited works must not silently promote U1–U3 to established history. The existing interface is unchanged.
