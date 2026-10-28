# Chinese frontier-AI institutions, second collection: scope

A candidate research pack outside application data. It deepens the Chinese frontier-AI institutional history strand after the [first bounded collection](../../docs/china-atlas.md) (DeepSeek, Alibaba/Qwen, Zhipu). Nothing here is editorially accepted or admitted. Admission needs a cross-family check first ([editorial policy](../../docs/editorial-policy.md#machine-first-risk-based-editorial-workflow)); the brief for it is in this folder.

## Choice

Four developers and one governance group:

1. **Moonshot AI (月之暗面)**, developer of the Kimi models. Fixed technical reports on arXiv (Kimi k1.5, Kimi K2) and pinned model repositories with a stated modified-MIT licence.
2. **MiniMax (稀宇科技)**. Fixed arXiv reports (MiniMax-01, MiniMax-M1), pinned repositories, and a Hong Kong prospectus that documents backers, founders and model history in one filed text.
3. **Baidu (百度), ERNIE (文心)**, deferred in the first collection. ERNIE papers from 2019 onward on arXiv, the ERNIE Bot launch, and the June 2025 ERNIE 4.5 open-weight release under Apache 2.0.
4. **ByteDance Seed (字节跳动 Seed)**. Fixed arXiv reports (Seed1.5-VL, Seed1.5-Thinking and later), the Seed-OSS open-weight release, and Seed's own statements about its safety unit.
5. **Chinese AI governance texts that connect to existing Governance coverage**, each recorded as what the document states, never as implementation: the AI Safety Governance Framework (人工智能安全治理框架) published by the standardisation technical committee TC260 (name as the document gives it), versions 1.0 (2024) and 2.0 (2025); the AI safety commitments (人工智能安全承诺) announced by the AI Industry Alliance of China (AIIA) in December 2024 and their listed signatories; and safety frameworks or commitments published by Chinese developers themselves (for example Shanghai AI Laboratory's frontier risk framework), where the text could be retrieved.

Why these: each has a developer-published, dated documentary trail (fixed arXiv versions, Git or Hugging Face commits, filings) that supports release, licence and authorship records without resting on reporting. The lab genealogy admitted on 2026-10-17 already records the founders and leaders of Moonshot AI, MiniMax, StepFun and 01.AI, and some Baidu, ByteDance and Tencent roles; this pack reuses those records and adds what they lack: model releases, licences, technical-report authorship and affiliation, backers as documented, and published safety and governance statements.

Deferred: StepFun, 01.AI and Tencent Hunyuan, to keep each selected institution deep. Omission is not a judgement of importance or a claim that sources are unavailable.

## Questions

For each developer:

- Founding and founders as documented (reusing existing genealogy records; adding only what they lack).
- Parent and backer relations as documented: a filing's list of investors or a parent's statement. Never a round's full amount attributed to one investor; announced stays announced.
- Model releases with dates from the developer's own announcement, paper or repository.
- Licences as stated by the developer for named weights at a pinned version.
- Published safety and governance statements: what the document states, not implementation.
- People only as documented roles (authorship credit, named offices).

For the governance texts: who published which version when; a bounded selection of provisions quoted from the cited edition; who is listed as a signatory and on what date the list was published.

## Rules

- **Original language kept.** Chinese sources keep their original title, language tag (`zh-Hans`), URL and version. Quotes from Chinese sources are in Chinese; each carries an English rendering marked as machine translation. No human translation verification is claimed.
- **Fixed and mutable expressions distinguished.** arXiv versions (`v1`), Git commits and Hugging Face commits are fixed expressions and are cited by version. Company pages, blogs and news pages are mutable: read as they stood at retrieval, with the retrieval date; earlier wording is not authenticated. The Internet Archive refused connections from this environment (HTTP 403), so no archive capture was checked; the cross-family brief asks the checker to look for captures.
- **Dates keep kind and precision.** Publication, announcement, revision, signature and effective dates stay separate; an arXiv submission date is the date of that version, not of the model's release; unknown stays unknown.
- **Announced stays announced.** Commitments, plans and investments are recorded at the stage the source states.
- **No inference from proximity.** No ideology, state direction, influence or affiliation is inferred from funding, location, membership of an alliance or co-signature. A public body's framework is what it states; a company signing a commitment is a signature, not compliance. "Chinese AI" is never one actor: each record names its own organisation.
- **Wording.** "Earliest located", never "first"; no motives; no loaded words. Living people: public roles and public authorship only; no e-mail addresses.
- **Closest source.** The developer's paper, repository, announcement or filing; the public body's own text. Reporting only where no primary text could be retrieved, marked as such. Wikipedia, Baidu Baike and similar summaries are never evidence.

## Unit of record

The dataset's claim shape, so that a later admission would be mechanical: subject, predicate, object, topic, time (kind, date, basis, note), derivation, resolution, qualification, evidence (source, locator, source role, support, quote or labelled paraphrase, translation where Chinese). Predicates are the dataset's existing ones (`published`, `authored`, `founding_stated`, `co_founded`, `held_role`, `unit_of`, `investment_announced`, `participated_in_round`, `signed_commitment`, `states_provision`, `enacted`, `references_commitment`); this pack proposes none. Model releases are recorded as `published` from the developer to a document entity (the report, announcement or model card), as in the first collection.
