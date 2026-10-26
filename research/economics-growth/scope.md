# The explosive-growth debate: research thread scope

Phase 1 of the draft [Economics of Machine Intelligence](../../docs/projects/economics-of-machine-intelligence.md) project. It asks which documented texts state, answer or bear on a set of generic propositions about whether machine intelligence produces explosive economic growth, when, and under which conditions. It records what texts say. It does not assess whether a model or an argument is right, and it never claims first use.

The output is a candidate research pack outside application data (`pack.json`, rendered as `pack.md`). Nothing here is editorially accepted.

## Unit of record

```text
proposition  a generic claim with a neutral criterion, attributed to no one (G01…G09)
 passage     a short quotation from one text, with locator, relation, conditions,
             context paraphrase, engagement (for contests) and qualification
source       one text: dates, checked expression, other versions, retrieval records
```

Several passages from one text on one proposition with the same relation form one record, as in schema 2.11 (one record per text, proposition and stance). A two-person dialogue (the Asterisk debate) is one text; each passage names its speaker, and the two speakers can hold opposite stances on the same proposition.

## Relations and fields

| Pack relation | Schema record             | Meaning                                                                                     |
| ------------- | ------------------------- | ------------------------------------------------------------------------------------------- |
| `articulates` | `articulates_proposition` | The passage meets the criterion                                                             |
| `contests`    | `contests_proposition`    | The passage disputes the proposition or a premise it depends on; `engagement` is required   |
| `bears-on`    | `bears_on_proposition`    | The passage bears on the proposition without meeting the criterion; `missing` names the gap |

- **Engagement** follows the schema 2.12 message-level rule. `engages-premise`: the passage, with the turn or section it belongs to, gives a reason against a premise. `contrary-only`: it states the contrary without such a reason. A one-sentence rationale names the premise.
- **Conditions** record the model assumptions or stated conditions under which the passage holds. A conditional model result is never recorded as an unconditional forecast. This field has no schema home yet (see the project document's open decisions).
- **Context-only** marks a passage that misleads when shown alone, with the reason and the context it requires.
- **Tier** (maintainer decision 2026-10-11, superseding the venue-first rule of 2026-10-09; the same rule applies to the `economics-mainstream-pass1` pack). The author decides, not the venue.
  - Tier 1: scholarly work by economists in any venue (journals, working papers, books, chapters, commission reports, and essays or articles they wrote in magazines), plus any text in a core economics venue whoever wrote it. An economist is an author with an economics appointment, degree, address or affiliation shown in or near the text, or an established record as an economist at the time the text was written (maintainer decision 2026-10-12).
  - Tier 2: texts by non-economists, whatever the venue; and short-form commentary even by economists (blog comments, forum replies, magazine or online debates), unless a turn is itself a substantive scholarly argument. That judgement is recorded in the source's basis.
  - Each source records its tier and a one-line basis. Tier 1: Hanson's two working papers, Nordhaus, Aghion–Jones–Jones, Roodman's post, Trammell–Korinek, Acemoglu. Tier 2: Hanson's 1994 essay (no economics degree or appointment in 1994) and 1998 comment, Karnofsky's comment, Davidson, the Asterisk debate, Erdil–Besiroglu.
- **Earliest located** is computed within tier 1 (`earliest-located`) and separately within tier 2 (`earliest-located-tier-2`, shown alongside, never instead). Each is held by exactly one articulating text and at most one contesting text per proposition and tier, never by a bears-on text. `tools.mjs verify` checks this.
- **G04 and G05** are separated by one test: would the constraint still bind if every task were automated? No (it keeps tasks in human hands or slows their automation, including regulation of AI training or deployment): G04. Yes: G05. A passage is classified by the mechanism its own conclusion names.
- **G09** records each text's own estimate (holder, estimate as worded, horizon, definition, conditions). Estimates are never converted to a common threshold or combined.

## Dates

Each source records:

- **date:** the work's own date (title page, date line, copyright line or publication line), with precision and basis;
- **attested:** the earliest retrieved copy of the checked wording. Every text here was checked against a Wayback Machine capture or a dated arXiv version, so the attested date is usually later than the work's date;
- **claimed:** an earlier date given for the work that does not date the checked wording, such as a first version or a talk.

Following the [editorial policy](../../docs/editorial-policy.md#earliest-located-texts), earliest located is decided by the attested date of the wording actually checked, never by a journal year. This has a visible effect here: Hanson's "If Uploads Come First" is dated 1994 but its wording is attested from a 1998 capture, and his "Economic Growth Given Machine Intelligence" is an undated file, now dated by its 2000-08-19 capture (maintainer decision 2026-10-09), with his claimed 1998 kept separately. Working papers and their later journal versions are separate expressions; each source lists its versions with dates and an APA citation of the published version. Journal versions were not retrieved.

## Search scope

This is a bounded first pass, not a literature survey.

- **Texts.** Twelve documents, 1994–2024, plus one comment on one of them by a different author (thirteen authored records):
  - Robin Hanson: "If Uploads Come First" (1994), his comment "Some Skepticism" in the online discussion of Vinge's singularity concept (1998), "Economic Growth Given Machine Intelligence" (dated 1998 by the author), "Long-Term Growth As A Sequence of Exponential Modes" (December 2000).
  - William D. Nordhaus, "Are We Approaching an Economic Singularity?" (September 2015, Cowles and NBER working papers).
  - Philippe Aghion, Benjamin F. Jones and Charles I. Jones, "Artificial Intelligence and Economic Growth" (NBER working paper, October 2017).
  - David Roodman, "Modeling the Human Trajectory" (Open Philanthropy blog, June 2020), and Holden Karnofsky's comment on it (same day).
  - Philip Trammell and Anton Korinek, "Economic Growth under Transformative AI" (GPI working paper, October 2020; text dated February 2021).
  - Tom Davidson, "Could Advanced AI Drive Explosive Economic Growth?" (Open Philanthropy, June 2021).
  - Matt Clancy and Tamay Besiroglu, "The Great Inflection? A Debate About AI and Explosive Growth" (Asterisk, June 2023).
  - Ege Erdil and Tamay Besiroglu, "Explosive growth from AI automation: A review of the arguments" (arXiv, September 2023; v2 checked).
  - Daron Acemoglu, "The Simple Macroeconomics of AI" (April 2024).
- **Selection.** The starting list came from the task brief. Hanson's 1994 and 1998 texts were added because his later papers and his December 2000 vita point to them; Roodman, Karnofsky and the Asterisk debate were added because they directly engage the starting texts. Other texts cited by these (Hanson's "Is a Singularity Just Around the Corner?" (Journal of Transhumanism, June 1998), Kremer 1993, von Foerster et al. 1960, Korinek and Suh 2024, Jones 2022 and 2024, Roodman's technical paper (tier 1 by author if retrieved), Davidson 2023, Epoch's later models, Goldman Sachs and McKinsey forecasts) were not retrieved.
- **Method.** Each text was read for each proposition through targeted searches of the cached text (model terms, growth terms, objection headings) and reading of the surrounding sections. Abstracts, introductions, conclusions and objection sections were read in full. Long appendices (Davidson's report, Erdil and Besiroglu's appendices) were searched, not read in full.
- **Retrieval.** Direct HTTP from this environment to every publisher host was refused by the network policy. Each text was retrieved from the Wayback Machine (`id_` captures, sequential, at least 8 seconds apart) on 2026-10-08. Each source records the requested URL, the capture timestamp, HTTP status and SHA-256 of the body. Retrieval failures and substitutions are listed in `pack.json` and `pack.md`. On 2026-10-10 the Wayback Machine reset every connection; current copies were fetched and are listed per source with their SHA-256 (eight are byte-identical to the recorded captures). The Open Philanthropy pages could not be fetched that day.
- **Seen and not recorded:** some further passages in the twelve texts that bear on the propositions (for example Hanson 1994 on the historical acceleration of growth, the further points of Karnofsky's comment, and parts of Davidson's appendices) were seen during the audit and not recorded. A pack records the passages selected, not every relevant sentence.
- **Not searched:** books, podcasts and video, social media, comment threads other than the one comment recorded, journal versions, and the non-English literature.

"Earliest located" therefore means earliest within these twelve documents. The pack's own texts cite earlier work, such as Kremer (1993) and von Foerster et al. (1960), that was not retrieved.

## Validation checklist (each passage)

1. **Quote match:** the quotation (≤ 50 words) occurs verbatim in the checked expression after normalising whitespace, quotes, dashes, Unicode compatibility forms and PDF line-break hyphenation; `…` separates fragments that must occur in order within one paragraph. Every other cached version of the source is checked too, and a difference is recorded in the qualification.
2. **Caps:** at most 400 quoted words per source, and about 10% for sources under 2,000 words (Hanson's 1998 comment, Karnofsky's comment). A passage used under two propositions counts once.
3. **Voice:** dialogue turns name their speaker. Relayed models or quotations of other authors are not recorded as the relaying author's view.
4. **Conditions:** model-derived passages carry their conditions.
5. **Dates:** date, attested and claimed recorded separately; earliest located checked by `verify`.
6. **Audit:** a fresh-context machine audit of every passage, recorded in `audit.md`. A same-family audit is recorded as such.

## Reproduction

From the repository root:

```sh
node research/economics-growth/tools.mjs fetch <key> <wayback-url>   # paced by hand, one at a time
node research/economics-growth/tools.mjs grep <key> "<regex>"
node research/economics-growth/tools.mjs verify    # quotes, versions, caps, earliest located -> verification.json
node research/economics-growth/tools.mjs render    # pack.md
npx prettier --write research/economics-growth/
```

The cache lives in the ignored `.local/economics-growth/` folder. A fresh checkout must re-fetch each source from the URLs recorded in `pack.json` (captures or the listed current copies) before `verify` can match it. Current responses may differ; compare SHA-256 values. A current copy byte-identical to a recorded capture can be cached under the recorded key. `verify` lists passages whose checked expression is not cached and matches no current copy as not re-checked; they are not failures.
