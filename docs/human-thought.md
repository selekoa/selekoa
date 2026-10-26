# Human-thought collection: propositions about superintelligence

The page `#/propositions/superintelligence` is the first collection of the human-thought spine. It records which located texts from 1863 to 2022 state, dispute or bear on a set of propositions about machine intelligence, and which text is the earliest located for each. Group A concerns temporal compression (intelligence explosion, seed AI, recursive self-improvement, fast or hard takeoff, AI-automated AI research, race compression); group B concerns changing epistemic adequacy (treacherous turn, strategic concealment, deceptive alignment, scheming, observed behaviour as evidence, control or purpose specification). Group C holds three wider senses kept apart from B5, B2 and A6.

The collection definition is `src/reading/human-thought.ts`; the page is `src/ui/Propositions.tsx`, computed by `src/domain/propositions.ts`. The data model (schema 2.11) is described in the [ontology](ontology.md#propositions-and-texts-that-articulate-them-schema-211) and the [release format](dataset-format.md); the earliest-located rule is in the [editorial policy](editorial-policy.md#earliest-located-texts).

## How the records were made

Two candidate packs proposed the texts: one for 1996–2022 and one for the 19th century to mid-1996. Each was checked by a separate machine check, one by an OpenAI GPT-6 model and one by a Claude Opus 5.5 model. The admission on 2026-10-06:

1. unified the definitions into one list with one criterion each, restoring the narrow B2, B5 and A6 and recording their wider senses as C1–C3;
2. assigned roles (earliest located, earliest located use of the name, articulation, most developed, contesting, context) across both packs and the whole period;
3. applied every finding of both checks, re-verified the three items the GPT check could not settle, and re-read the quotations against retrieved copies or page images;
4. wrote the records as schema 2.11 rows.

These four steps are recorded in [`review/thought-spine-admission-2026-10-06.json`](../review/thought-spine-admission-2026-10-06.json), with a Markdown companion. The candidate packs and both checks are kept unchanged beside it. The rows the admission added or changed are listed in [`review/thought-spine-before-2026-10-06.json`](../review/thought-spine-before-2026-10-06.json), from which the test-only historical view reproduces the earlier dataset.

## Reading a record

A record relates one text to one proposition. Its predicate says whether the text articulates the proposition, contests it or bears on it without meeting the criterion; a context record names the missing element. Its `attributes.thought` gives the roles and the register. Fiction, satire, dream framing and relays of another author are labelled, and a passage in fiction records what the work says, not its author's view.

Each record carries the date its work is dated by. Where the quoted wording survives only in a later copy, the record also gives the date from which it is attested, and that date decides which text is earliest located. An earlier claimed date that does not date the wording, such as a lecture or draft, is shown as claimed.

"Earliest located" means the earliest text the recorded searches found. The page's "How we searched" note states the venues, methods and known gaps once. When a later search finds an earlier text, it becomes the earliest located text and the replaced headline stays on the page as a correction. The headlines that the combined search replaced during admission are recorded the same way.

## Further work and checks

- [`review/thought-spine-leads.md`](../review/thought-spine-leads.md) lists the texts, copies and searches not yet retrieved, grouped by what they could change.
- `pnpm review:earliest` regenerates the packet of earliest-located records for a different-model check, [`review/thought-spine-earliest-for-cross-model-2026-10-06.md`](../review/thought-spine-earliest-for-cross-model-2026-10-06.md), from the records as they were before that check's corrections; append `--check` to verify it. The packet holds no verdicts. The check's report is [`review/thought-spine-earliest-gpt-check-2026-10-06.md`](../review/thought-spine-earliest-gpt-check-2026-10-06.md).
- No person has reviewed the records; all are seeds with machine-checked evidence.
