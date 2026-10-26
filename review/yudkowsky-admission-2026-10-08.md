# Admission of the Yudkowsky argument pack, 2026-10-08

The maintainer authorised admitting the candidate pack in [`research/yudkowsky-arguments/`](../research/yudkowsky-arguments/README.md) (merged in #15) as schema 2.12 proposition records, on 2026-10-08. The pack is unchanged. The records are rebuilt from it by `scripts/yudkowsky-admission.ts`, using the authored map [`yudkowsky-admission-map-2026-10-08.json`](yudkowsky-admission-map-2026-10-08.json). `--check` confirms that the stored records match. The rows added are listed in [`yudkowsky-admission-before-2026-10-08.json`](yudkowsky-admission-before-2026-10-08.json).

All records are seeds with machine-checked evidence. No person has reviewed them.

## Schema 2.12

- `earliest-located` is allowed on contesting records, under the articulation rule: decided by the date of the wording, at most one per proposition, and never a claim of first use.
- `attributes.thought.engagement` on contesting records: `engages-premise` or `contrary-only`, with a one-sentence rationale. The message-level rule applies (maintainer, 2026-10-08): a passage engages a premise if its paragraph, message or dialogue turn gives a reason against it.
- `attributes.thought.retrospective` flags a report of the author's own earlier belief. `from` and `until` date the belief where the text dates it. The record stays dated by the report.
- `evidence.contextOnly` names why a passage misleads alone, the context it `requires` and the `claimIds` of the records that supply it. The page, the inspector, search and exports show such a passage only with that context.
- `later-restatement` is a role on any proposition record. "Strongest" is not stored.
- Release format 1.3 adds the evidence field `contextOnly` and its CSV column. Formats 1.1 and 1.2 still reproduce byte for byte.

## Mapping

| Pack                      | Selekoa                                                                                                                                  |
| ------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| Take T01–T30 (no T23)     | Proposition concept Y01–Y30 (no Y23), with a neutral name, the take's wording as an alias, and a criterion that includes the premises    |
| `said-it`, `earlier-self` | `articulates_proposition`                                                                                                                |
| `answered-it`             | `contests_proposition`, engagement `engages-premise`                                                                                     |
| `disagrees`               | `contests_proposition`, engagement `contrary-only`                                                                                       |
| `related`                 | `bears_on_proposition`, with an authored `missing` element                                                                               |
| Passage                   | Evidence `evidence-yk-<passage id>`: quotation, locator, check date. Several passages of one text, proposition and stance are one record |
| `context`                 | Claim statement, after a sentence naming the text, its date and its stance                                                               |
| `qualification`           | Claim qualification, after the premise the passage addresses                                                                             |
| `voice`                   | `retrospective` → retrospective flag; `fiction` → register; dialogue turns are named in the qualification                                |
| `cardUse: context-only`   | `evidence.contextOnly`, with authored `requires` and the records of the later texts the pack names                                       |
| `expressionDate`          | `attested` (T03-c, a later note), `claimed` (T21-b, T21-e, T24-c, T28-c) or the date note (forwarded replies)                            |
| Earlier-self pair         | Derived on the page and in exports: later contesting records by the same author. Never stored                                            |

Existing documents and sources are reused where the dataset already held them: ten pack sources, among them Staring into the Singularity, two Extropians messages of 1996-12-31, three LessWrong posts, the global-risk chapter, Intelligence Explosion Microeconomics and an Arbital page. Creating Friendly AI gains a source for MIRI's reprint. One stored row changed: the announcement message of 1996-11-19 now records its length (117 words), because the admission quotes it.

## Dating of wording known only from reprints

The pack quoted Creating Friendly AI (2001) and the global-risk chapter (2008) from MIRI's later, undated PDFs. Under schema 2.11 such wording cannot be earliest located. It also could not be dated as the pack dated it. On 2026-10-08 the admission retrieved, by direct HTTP from the Internet Archive:

| Copy                                                                  | Capture    | SHA-256                                                            |
| --------------------------------------------------------------------- | ---------- | ------------------------------------------------------------------ |
| Creating Friendly AI, challenge.html (2001 web edition)               | 2001-06-26 | `e910a4f4aec9673a1dc69d006a40d44315acb6279f10fc9e6e3d79f5701dc603` |
| Creating Friendly AI, anthro.html                                     | 2001-08-10 | `bb3cdcc34934a50b9a404600d9a0f412eae00f0a66f390d8110b0ad56cbd965a` |
| Creating Friendly AI, policy.html                                     | 2001-06-17 | `7cb989b7408e084950daf9cb6f758b79eb5bb85e3d5c652e0bca7aa746b632ca` |
| SIAI draft "Artificial Intelligence and Global Risk", 5 February 2006 | 2006-07-08 | `355633be995152c109d583baece357ea8bc76416552ffe65d4399c78037f4602` |

Eight of the nine Creating Friendly AI quotations appear in the 2001 pages: seven in the three pages above and T12-a in the seed-AI page already in the dataset. Those records carry the capture date as their attested date and a paraphrase evidence item from the capture. The exception is T25-a, a table cell not found in 2001: its wording is undated. All eleven chapter quotations appear in the 2006 draft, T13-a with one difference in punctuation around an inner quotation. As for the human-thought records of that chapter, those records are dated 2006-02-05 and carry a paraphrase evidence item from the draft, which asks not to be quoted. Coherent Extrapolated Volition (2004), the Arbital pages and the AI-box page keep undated or later attested wording. None of them held an earliest-located role.

With this dating, every earliest-located role of the pack on an articulating or contesting passage is kept, and validation confirms the order.

## Quotation changes under the per-document limit

The dataset already quoted five of the reused sources for the human-thought collection. Combined, the pack's quotations would have exceeded the limit per document. Nine evidence items changed:

| Passage             | Source                                    | Change                                                                                |
| ------------------- | ----------------------------------------- | ------------------------------------------------------------------------------------- |
| T06-a, T26-e1       | Extropians 1996-12-31 (5142), 299 words   | Shortened to “a Power will know _exactly_ what to say”                                |
| T06-b               | Extropians 1996-12-31 (5159), 248 words   | Labelled paraphrase                                                                   |
| T12-b               | Arbital “Programmer deception”, 440 words | Shortened to the part the existing quotation does not hold                            |
| T12-c               | AGI Ruin                                  | Replaced by the dataset's existing quotation of the same item, which holds both parts |
| T01-c               | AGI Ruin                                  | Shortened to its second sentence                                                      |
| T20-d, T24-d, T26-b | Global-risk chapter (MIRI reprint)        | Labelled paraphrases                                                                  |

Every other quotation is the pack's, verbatim. Per-document totals, counted across all sources of a document, are now within the limit.

## Not carried over

- **Earliest located on related passages (22).** Schema 2.12 allows the role on articulating and contesting records only: T01-a, T02-c, T03-b, T04-e2, T05-e2, T08-s1, T11-s3, T13-s1, T13-s2, T13-s3, T14-a, T17-b, T18-e2, T19-e2, T20-e2, T22-b, T24-s1, T25-a, T26-e2, T27-b, T28-e1, T30-b.
- **"Strongest" (43 passages).** Left to the consuming application, as decided.
- **Per-take search notes.** They stay in `pack.json` and are not shown in the application or a release, because they quote further passages that no quotation limit has counted. The two open premises (Y17, Y24) are shown.
- **Pack identifiers in text.** Contexts and qualifications keep references such as T13-a; the page says that T01 corresponds to Y01.

## Mapping self-audit

`scripts/yudkowsky-admission-audit.ts` drew 20 admitted records at random (seed 20261008) and compared each field with `pack.json`: proposition, predicate, quotation, locator, check date, context, qualification, premise, date and basis, roles, context-only flag, retrospective flag, register, engagement and missing element. The report is [`yudkowsky-admission-audit-2026-10-08.json`](yudkowsky-admission-audit-2026-10-08.json).

- **Drift:** none.
- **Mapped differences:** "strongest" not stored (4 records), earliest located on related passages not carried over (2), and one record of Staring into the Singularity dated 1996-11-18 with wording attested 2000-12-04, as the dataset already dates that essay, where the pack gave 2000-08-31 (1).
- **Limits:** the audit was run by the admitting session, not a fresh context, and it checks the mapping, not the sources. A unit test checks quotation, locator and context-only flag for all 216 passages.

## Open for the maintainer

1. **Earliest located on context records.** 22 pack roles were dropped. Allowing the role on `bears_on_proposition` would need another schema change.
2. **Engagement on the 26 contesting records of the human-thought collection.** The field is optional, so those records stay valid without it. Backfilling them is a separate editorial task.
3. **Y23.** Codes follow the pack's numbers, so Y23 is unused. Renumbering would break the correspondence with the pack, audit and GPT check.
4. **Search notes.** They are kept only in the pack (see above). Publishing them would need their quotations counted against the per-document limits.
5. **Earlier open questions from the pack** (HANDOFF.md): the overridden cross-family findings (T15-d, T15-e2, T19-s3, T22-b, T30-c, partly T24-e2 and T28-c), and the takes and premises, which have had no human review.
