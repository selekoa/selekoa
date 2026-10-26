# Yudkowsky corpus

A major focus project: a source-critical record of Eliezer Yudkowsky's documented arguments about machine intelligence, dated and versioned, with his later corrections kept beside his earlier views. It belongs to the spine on [human thought and institutions around machine intelligence](../project-positioning.md#human-thought-and-institutions-around-machine-intelligence). It records what one author wrote and when. It does not assess whether he was right, and it is not a profile of the person.

## Goal

Eventually the corpus should cover all of his public writing on the subject, built in phased scopes. Each phase states exactly what was searched and how, in a "How we searched" note. Coverage claims never go beyond those notes. "Earliest located" always means earliest within the searched scope, never first use.

| Phase | Scope                                                                                                                                                                                                                          | Status                                                            |
| ----- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------- |
| 1     | All LessWrong posts under his account (with Overcoming Bias imports), five MIRI papers, the 2023 TIME article, the AI-box page, one capture of _Staring into the Singularity_, four mailing-list messages, three Arbital pages | Candidate pack 1, audited (same model family)                     |
| 2     | Every message listed under his name in the SL4 and Extropians Hypermail archives, full bodies                                                                                                                                  | Done 2026-10-07: SL4 1,876 and Extropians 3,012 messages; audited |
| 3     | Other early pages (sysopmind.com and yudkowsky.net captures), remaining SIAI/MIRI papers, the full Arbital corpus                                                                                                              | Candidate pack 2: audited, cross-family checked, corrected        |
| 4     | LessWrong and Alignment Forum comments, later mailing lists                                                                                                                                                                    | Planned; needs a bounded method, because comment volume is large  |
| 5     | Books, including _Rationality: From AI to Zombies_ and _If Anyone Builds It, Everyone Dies_ (with Nate Soares), plus fiction                                                                                                   | Planned; short quotation only; fiction keeps its register         |
| 6     | Social media, podcasts and interviews                                                                                                                                                                                          | Open; access, transcript provenance and version stability first   |

The working material is in [`research/yudkowsky-arguments/`](../../research/yudkowsky-arguments/README.md) and, for phase 3, [`research/yudkowsky-arguments-phase3/`](../../research/yudkowsky-arguments-phase3/README.md). Its scope note, audit report and per-passage verification are the current "How we searched" record.

## Where records live

Selekoa holds the records. A separate application, currently the side project "The Yudgment", consumes a **pinned Selekoa release**: first the JSON dataset export, later the planned read-only MCP server. It never reads working files.

The application keeps its own voice outside Selekoa. Jokes, verdict wording and generated text belong to it and never enter Selekoa records. It must show quotation, Selekoa paraphrase and its own text as visibly different things. It must link each quotation to its source and Selekoa record, and state the release it uses.

## Data model: takes as propositions

Candidate pack 1 uses a provisional structure (take → premise → passage). It was admitted on 2026-10-08 into the [proposition model](../ontology.md#propositions-and-texts-that-articulate-them-schema-211), extended by [schema 2.12](../ontology.md#contesting-records-retrospectives-and-context-only-passages-schema-212), as the collection Y01–Y30. The admission record, with its mapping, quotation changes, items not carried over and self-audit, is [`review/yudkowsky-admission-2026-10-08.md`](../../review/yudkowsky-admission-2026-10-08.md).

- **Take:** a proposition concept in its own collection (codes `Y01`…), with a neutral `criterion`. Takes are generic phrasings attributed to no one, and the criterion states the proposition, not its truth.
- **Premise:** included in the criterion where it decides classification. Otherwise it is recorded in qualifications. Premises are not separate entities.
- **Passage:** an evidence item. Several passages from one text become several evidence items of one record, because the schema allows one record per text, proposition and stance.

| Pack relation  | Schema 2.11 record                                                                                                                                                                       |
| -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `said-it`      | `articulates_proposition`                                                                                                                                                                |
| `answered-it`  | `contests_proposition`, engaging the premise                                                                                                                                             |
| `disagrees`    | `contests_proposition`, stating the contrary without engaging the premise                                                                                                                |
| `related`      | `bears_on_proposition`, naming the `missing` element                                                                                                                                     |
| `earlier-self` | `articulates_proposition` from his earlier text, plus the later rejecting text as its own `contests_proposition` record. The pairing is derived, never stored as a text-to-text relation |

Roles map to `thought.roles`: `earliest-located` for articulations, `contesting` and `context` for the others. Voice maps to `register` (`fiction` for staged dialogues and parables) and to qualifications (dialogue turns, co-authorship). Wording dates map to `claimed` and `attested`.

**Gaps decided before admission** (resolved by schema 2.12 on 2026-10-08: `earliest-located` on contesting records, `engagement` under the message-level rule, a `retrospective` flag, `contextOnly` on evidence, and no selection roles):

1. **Earliest located for contests.** Schema 2.11 allows `earliest-located` only on articulations. The project needs the earliest located _answer_ to a take; this is what a "years late" statement rests on.
2. **Engagement.** The distinction between answering a premise and stating the contrary is not in the schema. A candidate is `thought.engagement`.
3. **Retrospective self-report** (his 2008 accounts of his 1996–2000 views). This could be a register or a flag.
4. **Standalone use.** The pack's `cardUse: context-only` marks a quotation that misleads when shown alone. It is a property of the passage, not of the app.
5. **Selection roles** such as "strongest". These stay in the consuming app and are never stored in Selekoa.

**Maintainer decisions (approved 2026-10-07; implemented in schema 2.12 on 2026-10-08, with the message-level engagement rule decided the same day):**

- `earliest-located` is allowed on answering and contesting records in Selekoa, under the same rules as for articulations: decided by the date of the wording, within the recorded search scope, and never a claim of first use.
- "Strongest" is not carried into Selekoa at admission. It remains a selection made by the consuming app.
- A "years late" statement needs a named later interlocutor who made the same argument, and the same premise as the earlier passage. Timestamps alone do not support it. Locating those interlocutors is a separate search, outside the current scope.

**Maintainer decisions after admission (2026-10-08):**

- `earliest-located` stays limited to articulating and contesting records; it is not extended to bears-on records.
- The engagement field will be backfilled on the earlier human-thought contesting records in a separate task, with a cross-family check. (Backfilled on 2026-10-15: [record](../../review/engagement-backfill-2026-10-15.md). Cross-family check run 2026-10-16; dispositions applied 2026-10-17: [record](../../review/cross-family-dispositions-2026-10-17.md).)
- Code Y23 stays unused, so collection codes keep matching the pack's take numbers.
- The pack's per-proposition search notes are not published.
- The seven adjudications that overrode or went stricter than the cross-family check (T15-d, T15-e2, T19-s3, T22-b, T30-c, and parts of T24-e2 and T28-c) get a small independent GPT check later. (Blind brief and verdicts file prepared 2026-10-15: [`gpt-check-brief-2026-10-15.md`](../../research/yudkowsky-arguments/gpt-check-brief-2026-10-15.md); run 2026-10-16, all six disagreements accepted and applied 2026-10-17: [record](../../review/cross-family-dispositions-2026-10-17.md).)

**Maintainer decisions on candidate pack 2 (phase 3), 2026-10-08:**

- Unsigned SIAI pages are excluded unless authorship evidence is found for the page.
- Where pack 2 finds an earlier copy of a sentence already admitted (T12, T28), the existing record is re-dated at admission and keeps both dates; no second record is made.
- T30-w1 and T14-w1 are settled by the correction pass after the cross-family check ([`audit.md`](../../research/yudkowsky-arguments-phase3/audit.md#corrections-after-cross-family-check-2026-10-08)).

## Living-person rules

- **Earlier views travel with later corrections.** An earlier view is never shown without the later text that revises or rejects it. His own convention for earlier selves (Eliezer<sub>1997</sub>, from his 2008 posts) may be cited, quoted as his.
- **Context-only passages are never shown alone.**
- **No ideological labels.** Record self-description, explicit terminology, documents and disagreement, per the [editorial policy](../editorial-policy.md#interpretation).
- **No inferred motives.** No claims about what he "would" say, and no presentation of generated text as his.
- **Correct attribution.** Dialogue turns, co-authored texts, crossposts, reposts and later-added notes are attributed and dated as such.
- **Corrections from him** or anyone else go through the normal correction route and are recorded in the repository.

## Quotation and licence limits

- **Short quotations only:** at most 50 words each, and within the per-document limit of the [quotation policy](../editorial-policy.md#short-quotation). No full-text redistribution.
- **Retrieval caches:** retrieval bodies stay in ignored local caches with their SHA-256 hashes.
- **Before publication:** check the LessWrong and Alignment Forum terms and the licence of each other venue (yudkowsky.net, MIRI publications, the mailing-list archives, TIME), and record the result per source. Publisher terms that forbid quotation override the policy. Nothing here authorises publication.
- **The consuming app** inherits these limits. It shows short quotations with links, not texts.

## Quality

- **Checks:** machine-first, per the editorial policy. Every passage is checked verbatim against its retrieved expression and, for edited posts, the posting-day version.
- **Audits:** each candidate pack gets a fresh-context audit of all passages or a recorded targeted and random sample. A cross-family check is required before admission of contested records.
- **High-reliance use:** users who rely on a passage verify it in the original.
