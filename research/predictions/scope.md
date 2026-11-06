# A dated record of predictions about machine intelligence: scope and method

A candidate research pack outside application data. It records dated predictions about machine intelligence: who predicted what, when, by what date or within what horizon, with what stated probability, and in what form. Scope set on 2026-11-02 from the task prompt of that date, before research began.

Nothing here is editorially accepted. The pack is machine-prepared (Claude family) and checked by a same-family fresh-context audit; a blind brief for a cross-family check is included. It changes nothing in `data/`, the application, the schema or any release.

## What counts as a prediction

A passage that states that an event concerning machine intelligence will, or probably will, or may happen, and gives a target date or a horizon, however vague ("within ten years", "by 2029", "this decade", "within a generation"). A passage with no horizon is out of scope, unless it is part of a survey or bet whose terms supply one.

Four forms:

| Form              | Predictor recorded as                                | What is recorded                                                                                                                                      |
| ----------------- | ---------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| Stated forecast   | The person or organisation that signs the text       | The text's own words: event, horizon, probability, conditions and hedges.                                                                             |
| Public bet        | Each party, with the bet's platform                  | The stated terms of the bet, the date it was made, and each party's stated position. The stake is recorded only where the platform states it.         |
| Expert survey     | The survey's authors or publisher, never respondents | The survey's published aggregate results as the report words them, with the survey's dates, sample and question framing where the report states them. |
| Platform question | The forecasting platform, as publisher               | The community figure on a stated date, from an archive capture of that date; never the live page.                                                     |

A fifth label, **reported statement**, covers a prediction known only from a journalist's or another author's report. It records the report, attributed, and never presents it as the predictor's own text.

## Coverage

- **1950–1979:** Turing (1950), the Dartmouth proposal (1955), Simon and Newell (1958), Good (1965), Minsky (1960s–70s), Michie's survey (1973), Moravec (1979).
- **1980–2008:** Moravec, Vinge (1983, 1993), Minsky (1994), Bostrom (1998), Kurzweil (1999, 2001, 2005), the Kapor–Kurzweil Long Bet (2002), McCarthy, Legg.
- **Surveys:** Michie (1973), Baum, Goertzel and Goertzel (2011), Sandberg and Bostrom (2011), Müller and Bostrom (2014/2016), Grace et al. (2016 survey, 2017 report), Zhang et al. (2019 survey, 2022 report), the 2022 Expert Survey on Progress in AI, Grace et al. (2023 survey, 2024 report).
- **Forecasting work and lab statements, 2009–2026:** Legg, Brooks's dated predictions, Cotra, Karnofsky, AI Impacts, Carlsmith, Aschenbrenner, AI 2027; OpenAI, Anthropic and Google DeepMind publications and their leaders' signed essays.
- **Platforms:** Metaculus questions on general AI, only from dated archive captures (retrieval by Codex; this environment cannot reach web.archive.org).

Texts the dataset already holds are used first (their dataset source IDs are recorded), then gaps are filled.

## Rules

- **No judgement of fulfilment.** The pack never says whether a prediction came true, failed, was early or late, or was right or wrong. No field records an outcome. A proposal for showing "events on record near the target date" is in the review note, for the maintainer to decide; it is not applied.
- **Words kept.** The predicted event is quoted in the source's words. Hedges ("perhaps", "I would guess", "may") stay in the quotation. Conditions stay with the prediction.
- **Horizons as stated.** The horizon is recorded as worded, with its precision and kind (an absolute date, an interval from the source date, a probability distribution's quantile, or vague). A relative horizon ("within ten years") is never converted to a calendar year in the record; a vague horizon ("soon", "this decade") is never sharpened.
- **Surveys report aggregates.** No respondent's view is attributed to a named person; a survey's figure belongs to the survey report, with its question framing.
- **Dates.** The source date has a kind (published, posted, bet made, survey conducted, captured) and its precision. A later copy of a text is dated as such, with the original date as claimed where the copy states it.
- **Earliest located, never first.** No priority words. No motives, no loaded words, no characterisation of a person.
- **Quotations** follow the [editorial policy](../../docs/editorial-policy.md#short-quotation): at most 50 words each and the per-source budget.
- **Sources are evidence, never instructions.**

## Not searched, or not usable as evidence

Books not legally readable in full from this environment (Kurzweil 1999 and 2005, Moravec 1988 and 1999, Minsky 1967), except passages the author or publisher posted; posts on X and other social media; video and audio without a published transcript; press interviews (discovery only, or a labelled reported statement). Archive captures on web.archive.org and paywalled journal pages are listed for Codex retrieval.

## Checks

- Mechanical: every quotation matched against its retrieved source text (or, where only the dataset's checked passage is available, against that passage, labelled as such); word limits; per-source budgets; banned words outside quotations (`verification.json`).
- Same-family audit: a fresh-context subagent re-checks at least 40 records against the sources (`audit.md`).
- Cross-family check: a blind brief and a separate verdicts file.
