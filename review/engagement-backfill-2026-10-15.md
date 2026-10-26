# Engagement backfill on the human-thought contesting records, 2026-10-15

Schema 2.12 added `attributes.thought.engagement` to contesting records and made it optional, so the 26 `contests_proposition` records of the human-thought collection admitted under schema 2.11 (IDs `ts-…`) had none. The maintainer decided on 2026-10-08 that they would be backfilled in a separate task, with a cross-family check ([project document](../docs/projects/yudkowsky-corpus.md)). This pass adds the label to all 26. After it, every contesting record in the dataset carries an engagement label.

## Rule applied

The message-level rule of [schema 2.12](../docs/ontology.md#contesting-records-retrospectives-and-context-only-passages-schema-212): `engages-premise` when the passage, read with the message, dialogue turn or (for a post or article) the text it belongs to, gives a reason against a premise of the proposition; `contrary-only` when it states the contrary conclusion without giving such a reason. A short rationale names the premise and, for `engages-premise`, the reason. A reason is labelled whatever its quality: the label says what a text does, not whether its reason is good.

## Results

24 `engages-premise`, 2 `contrary-only`. No proposition, statement, qualification, role, evidence or review state changed.

| Record                                     | Proposition | Engagement      | Text re-read                                                                                                |
| ------------------------------------------ | ----------- | --------------- | ----------------------------------------------------------------------------------------------------------- |
| `ts-b6-butler-1865-contests`               | B6          | engages-premise | Stored quotation only (see limits)                                                                          |
| `ts-b6-erewhon-1872-contests`              | B6          | engages-premise | Reply paragraphs in the 1901 revised edition (Project Gutenberg); the cited 1872 scan was not re-opened     |
| `ts-b6-samuel-1960-contests`               | B6          | engages-premise | PubMed abstract (efetch XML)                                                                                |
| `ts-b6-michie-1968-contests`               | B6          | contrary-only   | 1986 reprint, pp. 244–246                                                                                   |
| `ts-b6-drexler-1986-contests`              | B6          | engages-premise | Stored quotations only (see limits)                                                                         |
| `ts-c1-franzen-1992-contests`              | C1          | engages-premise | Whole message (archive member feb.92/2478)                                                                  |
| `ts-c1-mccullough-1992-contests`           | C1          | engages-premise | Whole message (archive member feb.92/2595)                                                                  |
| `ts-a4-hanson-1996-09-03-contests`         | A4          | contrary-only   | Whole message                                                                                               |
| `ts-a6-hanson-1996-09-03-contests`         | A6          | engages-premise | Whole message                                                                                               |
| `ts-b2-crocker-1996-12-31-contests`        | B2          | engages-premise | Whole message 5167, and 5151 for context                                                                    |
| `ts-b5-crocker-1996-12-31-contests`        | B5          | engages-premise | Whole message 5167, and 5151 for context                                                                    |
| `ts-a6-sandberg-1998-contests`             | A6          | engages-premise | Whole message                                                                                               |
| `ts-a4-hanson-1998-09-10-contests`         | A4          | engages-premise | Whole message                                                                                               |
| `ts-a1-hanson-1998-09-24-contests`         | A1          | engages-premise | Whole message                                                                                               |
| `ts-a1-more-1998-contests`                 | A1          | engages-premise | Whole comment, current page (the record's wording is attested from a 2000 capture, which was not re-opened) |
| `ts-a4-more-1998-contests`                 | A4          | engages-premise | As above                                                                                                    |
| `ts-a3-finney-1999-contests`               | A3          | engages-premise | Whole message                                                                                               |
| `ts-b5-hibbard-2006-contests`              | B5          | engages-premise | Whole page                                                                                                  |
| `ts-a2-hanson-2008-core-argument-contests` | A2          | engages-premise | Whole post, current re-hosted page                                                                          |
| `ts-a4-hanson-2008-core-argument-contests` | A4          | engages-premise | As above                                                                                                    |
| `ts-b5-loosemore-2015-contests`            | B5          | engages-premise | Abstract and the section on the “Doctrine of Logical Infallibility”, current LessWrong page                 |
| `ts-a4-christiano-2018-takeoff-contests`   | A4          | engages-premise | Current author page                                                                                         |
| `ts-a6-christiano-2018-takeoff-contests`   | A6          | engages-premise | Current author page                                                                                         |
| `ts-b1-christiano-2022-contests`           | B1          | engages-premise | The “Disagreements” bullets, current LessWrong page                                                         |
| `ts-b2-christiano-2022-contests`           | B2          | engages-premise | As above                                                                                                    |
| `ts-b5-christiano-2022-contests`           | B5          | engages-premise | As above                                                                                                    |

The rationale for each record is stored in the record.

## Uncertain labels

These are the ones a second reader could reasonably label the other way. They should be in the cross-family check first.

1. **`ts-a4-hanson-1996-09-03-contests` (contrary-only) and `ts-a6-hanson-1996-09-03-contests` (engages-premise).** One four-line message. “Any one AI probably won’t be too far ahead of any other AI” is asserted, not argued, so against a fast takeoff (A4) it is the contrary conclusion. Against a decisive advantage (A6) the message offers that AIs close in capability “can police each other”, which is a reason. The split follows the rule but rests on one clause.
2. **`ts-b6-michie-1968-contests` (contrary-only).** Michie calls the servant-or-master dilemma “a false one” and sets out a division of tasks in which people keep decisions of value. That is a framework for his forecast, but it gives no reason why people could not lose the power to direct or stop machines, which is the B6 control premise. Read as an argument that value decisions stay human, it could be `engages-premise`.
3. **`ts-c1-franzen-1992-contests` (engages-premise).** The reason is one sentence: a test is not a test unless it is conducted by someone who knows what they are doing. It answers the inference from the competition's result, but it is terse enough to read as a bare contrary assertion.
4. **`ts-b6-samuel-1960-contests` (engages-premise).** “Does not possess a will” is a reason against the control premise. But only the indexed abstract was read; whether it is Samuel's wording is not established, and the article body, which is the unit under the rule, was not read.
5. **`ts-b5-christiano-2022-contests` (engages-premise).** The bullet's reason is that the deception problem “can be studied in advance” and that solving it opens the other problems. That disputes List of Lethalities #13's claim about seeing problems in advance more than the B5 premise about observed behaviour as evidence. It was labelled `engages-premise` because the same post, under the message-level rule, gives reasons (selection by training) against hidden capability.
6. **`ts-b5-crocker-1996-12-31-contests` (engages-premise).** The reason (claims about physics can be checked against reality) addresses deception about checkable facts, not trustworthiness of behaviour in general. Crocker's earlier message the same day concedes that a malevolent intelligence might talk its way out.
7. **`ts-b5-hibbard-2006-contests` (engages-premise).** The reason attacks the smiley-face example's internal consistency rather than the general premise that development-time behaviour is weak evidence; it counts because the example is the premise the record contests.

## Limits

- **Not re-retrieved:** the 1865 _Press_ article (Papers Past answered with a bot challenge, and the Wayback Machine did not answer from this environment) and the Foresight web edition of _Engines of Creation_ (the original URL now returns 404, and the capture could not be reached). For both, the label rests on the stored quotations, each of which states a reason in its own words.
- **Current expressions:** for the 2008, 2015, 2018 and 2022 posts and Max More's comment, the current page was read, not the capture or edition the record dates its wording by.
- **Cross-family check run afterwards.** A blind GPT-family check on 2026-10-16 ([report](engagement-gpt-check-2026-10-16.md)) agreed on 24 labels, partly agreed on `ts-b5-christiano-2022-contests` and disagreed on `ts-a2-hanson-2008-core-argument-contests`. The maintainer accepted both on 2026-10-17: the Hanson record now bears on A2 instead of contesting it, and the Christiano rationale rests on the post-level argument with a version qualification ([dispositions](cross-family-dispositions-2026-10-17.md)). The table above keeps the labels as backfilled.
- The labels were proposed and checked by the same agent. Records stay seeds; nothing was editorially accepted.

The rows changed are listed in [`research-debt-before-2026-10-15.json`](research-debt-before-2026-10-15.json).
