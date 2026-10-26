# Governance framework versioning

This increment adds 16 exact document versions, one necessary framework-family referent, 45 claims, 25 sources and 61 evidence records. The complete sample has 59 entities, 103 claims, 53 sources and 120 evidence records. Research cut-off: 2026-09-18. All additions remain seeds with machine-checked evidence.

## Identity and dates

A document version is an Entity with a stable ID and documentVersion metadata: family key, publisher, version label, and independently sourced publication, effective and revision dates. Missing dates remain missing. Access and machine-check dates belong to Source and Evidence, not to the policy's validity.

The initial RSP and FSF retain rsp-2023 and fsf-2024. Their structural metadata and identity-source lists are extended; their existing claims are unchanged. The existing o1 System Card is not duplicated.

Family keys support grouping and navigation without requiring an abstract entity for every family. OpenAI's Preparedness family earns a concept node because the FGF announcement refers to the continuing framework without naming a version. Linking that statement specifically to Version 2 would introduce unsupported precision. Validation restricts this relation to exact versions or framework-family concepts, and rejects conflicting publishers within a family.

A Source describes an inspected expression. Optional documentId connects a fixed PDF to its exact document node. Announcements and mutable indexes remain distinct bibliographic sources. Version labels alone cannot identify interchangeable documents across publishers.

## Documented sequences

| Family                     | Represented editions                                | Date meaning                                                                                               |
| -------------------------- | --------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| Anthropic RSP              | 1.0 → 2.0 → 2.1 → 2.2 → 3.0 → 3.1 → 3.2 → 3.3 → 3.4 | Effective dates, September 2023–July 2026; separately sourced publication dates retained where established |
| Google DeepMind FSF        | 1.0 → 2.0 → 3.0 → 3.1                               | Publication dates, May 2024–April 2026                                                                     |
| OpenAI Preparedness        | Beta → Version 2                                    | December 2023 publication; April 2025 publication and revision                                             |
| OpenAI Frontier Governance | May 2026 edition                                    | Publication established by release announcement                                                            |
| xAI FAIF                   | December 2025 and June 2026 editions                | December 30 revision and June 30 effective date; no asserted replacement edge                              |

The arrows in this table read from older to newer. Stored supersedes_document claims point the other way: newer version → predecessor. The relation means replacement within the publisher's documented policy sequence, supported by its official version history and update descriptions. Date order alone is insufficient. It does not assert legal repeal, completed implementation or retirement of historical dataset claims.

The FGF applies relevant parts of the Preparedness approach; it is not a Preparedness successor. Its framework-specific regulatory purpose is retained without interpreting legal compliance.

## Change claims

changes_from expresses one bounded difference between two versions of the same framework. Multiple deltas and the replacement claim can share endpoints; their claim IDs remain distinct graph edge keys.

The evidence modes are:

- publisher_statement: the publisher explicitly characterizes the change;
- changelog: a version-specific official changelog establishes it;
- document_comparison: a researcher-derived comparison, necessarily inferred and supported by evidence linked to both exact versions.

Fifteen added change claims use explicit statements or changelogs. They cover RSP ASL terminology, AI R&D thresholds, insider threat scope, company/industry plans, Roadmaps, Risk Reports, reviewer approval, report distribution and coverage dates; FSF security recommendations, harmful manipulation and CBRN TCLs; and Preparedness threshold terminology, Research Categories and persuasion-risk scope. This is a selection, not an exhaustive inventory of amendments.

One comparison records that the June 2026 xAI FAIF lacks the December edition's explicit TFAIA-compliance sentence. The older introduction and all nine text-bearing pages of the later document were inspected. The later edition still discusses applicable laws and compliance reviews. No inference about actual compliance, intent, weakened governance or safety performance follows.

No automatic semantic-diff utility was added: official changelogs supplied the useful deltas. Local PDF text extraction helped locate passages; neither extraction nor textual differences create accepted claims. Downloaded PDFs and research notes remain outside tracked/public application assets.

## Source durability and limitations

Historical official PDFs are preferred to a changing latest-policy link. Mutable indexes establish the publisher's version sequence; individual PDFs establish version text and dates. Changelog locators name the relevant dated entry. New passages are explicitly attributed paraphrases. No document is re-hosted or assumed openly licensed.

- RSP v2.0's cover lacks its version number; the official archive and subsequent dated changelogs establish that identity.
- The RSP archive's August 14, 2026 page update concerns a Risk Report. It does not change v3.4's July 8 effective date.
- Separate publication days are not established for every RSP revision. The timeline labels the effective date instead of silently treating it as publication.
- FSF's September 2025 announcement was updated in April 2026. Evidence distinguishes the original v3.0 section from the appended v3.1 section.
- xAI's December PDF filename says December 31; its visible last-updated date is December 30. The June PDF's stale embedded draft metadata is not treated as authoritative over its visible public cover.
- No explicit xAI supersession notice or comprehensive FAIF archive was located. December 2025 is the earliest FAIF edition identified in this bounded pass, not a claim that xAI had no earlier governance. An official [August 2025 Risk Management Framework](https://data.x.ai/2025-08-20-xai-risk-management-framework.pdf) exists; its precise succession into FAIF and the first-publication date of the earlier RMF draft remain unresolved.
- FGF's Preparedness reference does not specify a version. The family reference preserves that ambiguity.

Schema 2.7 adds the nearest existing Internet Archive capture to each framework source. Some current files differ from their nearest capture: FSF v2.0 now carries a publisher-documented link correction, and the Preparedness Version 2 PDF was later copy-edited. A capture shows what the archive held on its date; neither it nor a current URL authenticates earlier bytes. See the [audit record](../review/framework-evidence-audit-2026-10-03.json).

A policy publication establishes what the publisher documented. It does not establish implementation, compliance, effectiveness, or relative safety. There is no cross-lab scorecard.

## Review and navigation

The Inspector shows version dates, publisher, evidenced predecessor/successor links and a family timeline. All family editions are also discoverable without implying replacement, including xAI. The timeline labels the date basis; Through year remains cumulative, including unknown dates, rather than active-at-date.

The separate [governance review pack](../review/governance-version-review.md) contains only these 45 claims, grouped by family and then version identity, replacement relations and scoped changes. Every Human decision and Notes field is empty. The inferred comparison is labelled prominently and exposes both sources.

```sh
pnpm review:seed --order review/governance-version-order.json --title "governance version review" --output review/.local/governance-version-blank.md
```

The working pack now preserves two independently attributed external machine audits received 2026-09-19 and a separate targeted Codex source reconciliation. Audit B’s six original RESEARCH MORE results remain recorded, even though fresh source inspection verified those six claims as written. Its claim 44 metadata objection was not reproduced: the existing xAI source already states the correct effective date. No dataset or human-review state changed.

The original dataset-derived body remains reproducible. Preserve this annotated working copy and use review/.local/governance-version-blank.md as a fresh output path; append --check to check that fresh reference. Compare it with the body before the machine-QA appendix marker. The generator still refuses to overwrite the annotated pack.

The original 28-claim review and the personnel review are preserved. Personnel decisions remain 29 working YES and one pending EDIT on daniela-openai-safety-prior. Both machine-audit positions remain recorded; the underlying personnel data is unchanged. No claim or evidence was promoted.

## Provisions, new families and first disputes (week 4a)

Each edition now carries a bounded set of quoted provisions — capability thresholds and their triggers, required actions, who decides, recommends, can overrule or is informed, and stated exceptions — one claim per provision with a verbatim quote of at most 50 words, an exact locator and the cited edition. Provision keys line the same provision up across a family’s editions. Where a keyed provision could not be found in a later edition, the record is an absence bounded by an inspected scope and search method, never a deletion. A provision change is recorded only where both editions’ texts are quoted; publisher change-log statements are explicit, other comparisons inferred. Under the original quotation cap of about five quotations per document, most editions carried two to five provisions and the remainder were listed as stops in the QA record; the follow-up below re-examined them under the revised rule. Provisions describe what documents say, not implementation.

Two families are added. Meta’s Frontier AI Framework, Version 1.1 (February 3, 2025) was renamed the Advanced AI Scaling Framework in Version 2 (April 8, 2026); Meta calls Version 2 the second iteration of the same framework, so a replacement is recorded. The Version 1.1 file is no longer served; two expressions carry its label, the earliest archive capture (2025-02-13) and a revised wording captured from 2025-03-28, and provisions quote the earlier one. Microsoft’s Frontier Governance Framework has a first version (February 2025) and a February 2026 edition, which its change log calls a one-year update; the 2026 edition’s publication date is not established.

The OpenAI Preparedness replacement record is now unresolved: no inspected OpenAI text names the December 2023 Beta as the edition Version 2 replaces. After a same-model-family check ([report](../review/week4a-cross-model-check-2026-10-04.md)) and a different-model check ([report](../review/week4a-gpt-check-2026-10-04.md)), one record is contested: whether Preparedness Version 2’s governance arrangements let OpenAI Leadership deploy High-capability models without sufficient safeguards, with Coggins et al. against OpenAI’s stated predeployment requirement and no side chosen. The two RSP assessments are open questions with context evidence only: whether v2.0 made Anthropic’s commitments less verifiable, and whether v3.0’s roadmap and transparency mechanisms compensate for its reduced unilateral commitments. See the [QA record](../review/week4a-provisions-qa-2026-10-03.json) and the [stop-case decisions](../review/week4a-stop-case-decisions-2026-10-03.json).

**Follow-up: revised quotation rule and re-examined stops.** A maintainer-approved rule replaces the cap of about five quotes and 250 words per document: at most 50 words per quote and 400 quoted words per document, with quoted text kept to about 10% of a document under about 2,000 words, and no count cap. Every quoted source now records its approximate length, and validation enforces the rule; no quote admitted under the old cap needed trimming. Re-examining the stops added 67 quoted provisions, 6 recorded absences and 12 provision changes, beginning with the four the maintainer named: RSP v1.0’s emergency-loosening clause, the v2.0–v2.2 footnote on lowering Required Safeguards if another actor passes a threshold, FSF v2.0’s disclosure to government authorities, and RSP v3.3/v3.4’s operationalisation of the Automated R&D threshold with its v3.4 change. The Preparedness Version 2 rule is now recorded as a supported provision; the dispute about it is a separate `provision_assessed` record, and both RSP weakening assessments were narrowed so that each side addresses the same proposition. The three contested records are written out for a different-model reader in [`review/week4a-contested-for-cross-model.md`](../review/week4a-contested-for-cross-model.md); that reader has not been run. See the [follow-up record](../review/week4a-followup-2026-10-03.json). (Note of 2026-10-15: the different-model check and its recheck were run on 2026-10-04; see [`review/week4a-gpt-check-2026-10-04.md`](../review/week4a-gpt-check-2026-10-04.md) and [`review/week4a-gpt-recheck-2026-10-04.md`](../review/week4a-gpt-recheck-2026-10-04.md).)

## Commitment links (week 4b)

Framework editions now also list their own quoted statements about external commitments and laws: OpenAI’s Frontier Governance Framework (May 2026), xAI’s December 2025 framework, Microsoft’s February 2026 framework and RSP v3.0 each refer to California SB 53 in different terms, recorded with the kind of link each states. Such a link is the edition’s own claim, never evidence of compliance, and is not a version relation. See [control structures and external commitments](control-commitments.md).
