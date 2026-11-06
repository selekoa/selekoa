# Model cards compared: scope

Written before drafting, 2026-11-02.

## Question

For each frontier model release with a published system card, model card or safety report, what does the card disclose, on the same sixteen questions for every card ([questions.json](questions.json))?

## Unit of record

One row per card: a document the developer itself published as the system card, model card or safety report of a named model or model family, including addenda and updates that the developer published as cards. Technical reports, research papers, blog posts and product pages are not cards; where a developer published one of these instead of a card it is recorded in the inventory as "no card located", with what was found.

## Population

Releases dated 2023-01-01 to 2026-11-01 by the six developers whose frameworks are in the Compare frameworks collection: Anthropic, Google DeepMind, Meta, Microsoft, OpenAI and xAI. Image, video, audio and embedding models, and products whose card covers no new model, are outside the population and listed only where located. Each group records every card it located in `drafts/inventory-<group>.json`: retrieved, not retrievable (with the HTTP result) or not compared.

## Rows compared in this pack (selection rule)

The population is about sixty cards; at sixteen questions each it is several times the size the operating guide allows one pack. This pack compares a stated subset:

> For each developer and each calendar year from 2023 to 2026, the latest-dated card published in that year that reports its own evaluations. Where every card of a year is an addendum that refers to an earlier card for its evaluations, the latest addendum. For 2026 the year runs to the check date.

The rule is mechanical so that it does not select by perceived importance. It gives at most four rows per developer and shows each developer's practice once a year. Cards located but not compared stay in the inventory for a later pack; the review note asks whether to extend.

## Rules

- **Hazard rule.** Dangerous-capability evaluations are recorded at policy level only: whether an evaluation was run, its domain, the stated outcome category and the threshold language. Never methods, prompts, task contents, uplift figures or other technical content. Where a card gives such detail, only its policy-level sentence is quoted.
- **The developer's account.** A card's statement records what the developer says. It is never an independent finding, and a stated safeguard is never evidence that the safeguard works. Announced stays announced.
- **Dates** keep their kind and precision. "Earliest located", never "first".
- **No motives, no loaded words, no ranking** of developers, and no counts that would rank them.
- **Framework links.** Where a card names a framework edition, the cell links it to the edition's identifier in the dataset (for example `rsp-v2-2`, `preparedness-v2`, `fsf-v3-0`).
- **Evidence** is the developer's own published card, with an archive capture where one exists. Quotes at most 50 words, with page and section, and within each card's quotation budget under the editorial policy.

## Out of scope

Data changes, schema, interface and any judgement of whether a card is adequate. Model releases by developers outside the six. Evaluations published by third parties (government institutes' own reports, external evaluators' reports) except as the card describes them.
