# Drafting brief (laws-compared)

You are a fresh-context drafting pass for a candidate research pack in `research/laws-compared/` of the Selekoa repository. Selekoa is a source-critical research base on the history of machine intelligence. The pack compares binding government instruments that address frontier or general-purpose AI developers: rows are instruments, columns are fifteen questions.

Read first: `research/laws-compared/questions.json` (questions, criteria, legend), `research/laws-compared/drafts/FORMAT.md` (output format), `research/laws-compared/drafts/instruments.json` (rows and their sources), `research/laws-compared/drafts/sources.json` (source registry). Skim `docs/editorial-policy.md` (sections "Short quotation" and "Interpretation").

## Your task

Write one cell for each of your instruments × Q01–Q15 into `research/laws-compared/drafts/<group>.json`. Do not edit any other file. Do not commit or push.

## Tools (run from the repository root)

```sh
node research/laws-compared/tools.mjs text <cacheKey>            # whole cached text
node research/laws-compared/tools.mjs grep <cacheKey> "<regex>"  # context around matches (PDF page given)
node research/laws-compared/tools.mjs page <cacheKey> <n>        # one PDF page
node research/laws-compared/tools.mjs dsquotes <cacheKey>        # quotes the dataset already holds from this source, with claim IDs and locators
node research/laws-compared/tools.mjs checkcells research/laws-compared/drafts/<group>.json   # match every quote; per-source budget
```

The texts are already cached; do not fetch anything. Never use the web.

## Rules

1. **Quote the instrument's own text.** Every `stated` or `partly` cell has at least one passage copied exactly from the cached text, with a precise locator (article, paragraph, point; section and subdivision; for PDFs also the page). `checkcells` must report "no problems" except budget overruns you have flagged.
2. **Reuse before you add.** Run `dsquotes` for each source first. A dataset quote that meets the criterion is reused verbatim and its claim ID put in `datasetClaim`; a quote that is a contiguous part of a dataset quote also costs nothing. New quotes count against a per-source budget that is nearly spent for some sources (see `checkcells` output). Keep each new quote to the shortest words that carry the point: figures, deadlines, who decides, the operative verb. Aim for 5–20 words in English, 10–40 characters in Chinese; never over 50 words or 100 characters.
3. **Neutral wording.** Notes state conditions and scope only. No adjectives that characterise an instrument (no "strict", "weak", "broad", "landmark", "notably"), no motives, no comparisons between instruments.
4. **Dates keep their kind.** Q10 is adoption/signature/approval/issue; Q11 is entry into force or taking effect; Q12 is a separate application date for the duties. A date computed from a rule is marked "computed". Never fill Q12 by inference.
5. **Not found is a finding.** For `not-found`, record in `search` the sections read, the regex terms searched (exactly as run) and every passage set aside with the reason. Search the whole text for the obvious terms. A not-found cell says nothing about other laws.
6. **No compliance inferences.** A duty is not evidence that anyone complied or falls within a category.
7. **Chinese text.** Quote in Chinese; give Selekoa's working English translation in `translation`, marked as such in the note if needed. Instruments addressed to service providers are recorded as such; do not restate them as duties of model developers.
8. **Hazard rule.** Provisions on biological, chemical or similar weapons risks are recorded at policy level only (that a category is named), with no technical detail.
9. **Status discipline.** Use `partly` exactly as the legend in `questions.json` defines it. `not-applicable` only where the question cannot arise (Q04 when Q03 is not found; Q12 never — use not-found).
10. Record in `omissions` provisions you saw but did not use, in `retrievalFailures` anything you could not read, and in `openQuestions` borderline calls, each with a recommendation.

Finish by running `checkcells` on your file and reporting, in at most 10 lines: cells by status, budget per source, and any open questions.
