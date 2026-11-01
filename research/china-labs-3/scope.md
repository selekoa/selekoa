# Chinese frontier-AI institutions, third collection: scope

A candidate research pack outside application data. It continues the Chinese frontier-AI institutional history strand after the [first collection](../../docs/china-atlas.md#first-bounded-collection-2026-09-29) (DeepSeek, Alibaba/Qwen, Zhipu) and the [second](../china-labs-2/README.md) (Moonshot AI, MiniMax, Baidu/ERNIE, ByteDance Seed, and three groups of governance texts). Nothing here is editorially accepted or admitted. Admission needs a cross-family check first ([editorial policy](../../docs/editorial-policy.md#machine-first-risk-based-editorial-workflow)); the brief for it is in this folder.

## Choice

Seven developers and research institutes, and one governance group:

1. **StepFun (阶跃星辰)**, deferred in the second collection. Step model reports on arXiv, pinned Hugging Face repositories, and its legal entity as named in the regulator's filing lists.
2. **01.AI (零一万物)**, deferred in the second collection. The Yi technical report and model repositories with their licence texts, and the company's own pages.
3. **iFlytek (科大讯飞)**, listed on the Shenzhen Stock Exchange (002230). Spark (星火) model announcements and the company's annual reports, which name its legal entity, its officers and its AI programme in its own words.
4. **SenseTime (商汤科技)**, listed in Hong Kong (0020). Its 2021 prospectus and annual reports, the SenseNova (日日新) announcements and its published AI ethics and governance statements.
5. **Tencent (腾讯), Hunyuan (混元)**, deferred in the second collection. Hunyuan technical reports and model repositories with their licence texts, and Tencent's annual reports for the entity and officers.
6. **Beijing Academy of Artificial Intelligence (BAAI, 北京智源人工智能研究院)**. Its founding as it states it, its Wu Dao (悟道), Aquila, Emu and BGE releases, and the Beijing AI Principles (人工智能北京共识, 2019) it published.
7. **Shanghai Artificial Intelligence Laboratory (上海人工智能实验室)**. The InternLM (书生·浦语) and Intern-S1 reports and repositories, its legal entity as the filing lists name it, and its safety publications other than the Frontier AI Risk Management Framework already in the dataset.
8. **Governance texts.** The Cyberspace Administration of China's (CAC) announcements of filed generative-AI services and its lists of filed deep-synthesis algorithms, as dated listings, each with its count basis, and which of the covered developers appear in them. TC260's AI Safety Governance Framework v1.0 (2024), v2.0 (2025) and v3.0 (2026) are already in the dataset from the second collection: this pack links to them and adds only provisions not yet recorded. National standards and measures already in the dataset (the Interim Measures of 2023, the Labelling Measures of 2025, GB 45438-2025, GB/T 45654-2025) get links, not duplicates.

Why these: each has a dated documentary trail of its own (arXiv versions, Hugging Face and Git commits, exchange filings, the developer's own announcements, the public body's own lists). The lab genealogy admitted on 2026-10-17 already records the founders and leaders of StepFun and 01.AI, some Tencent and SenseTime roles, and Zhou Bowen's role at Shanghai AI Laboratory; the second collection records iFlytek, SenseTime, Tencent and 01.AI as listed signatories of the AI Industry Alliance commitments. This pack reuses those records and adds what they lack.

## Questions

For each developer:

- Founding as documented, at the precision the source gives (reusing existing records, adding only what they lack).
- Legal entities from filings and registry-derived statements: the legal name and form a filing or the developer's own statement gives, and the legal entity a regulator's list names as filer. The CAC lists name the filing entity (备案单位); that names a legal entity, not ownership or group structure.
- Leaders' public roles with dated intervals, as a filing or the organisation's own page states them. Snapshots stay snapshots; no current appointment is extrapolated.
- Model releases from the developer's own posts, arXiv and Hugging Face, at pinned versions.
- Stated funding rounds, at the stage and scope the source states; never a round total attributed to one investor.
- Published safety or governance statements: what the document states, not implementation.

For the governance texts: who published which listing when; its count basis (cumulative or incremental, as of which date, services or algorithms, filed or registered); which covered developers' services appear, under which legal entity, model name, filing number and filing date. A listing is dated by its publication; an entry's filing date is a separate date. Absence from a list is not recorded as refusal or as non-compliance.

## Rules

- **Original language kept.** Chinese sources keep their original title, language tag (`zh-Hans`), URL and version. Quotes from Chinese sources are in Chinese, each with a working English translation marked as machine translation. No human translation verification is claimed.
- **Fixed and mutable expressions distinguished.** arXiv versions, Git commits, Hugging Face commits and filed documents are fixed expressions, cited by version. Company pages, blogs and news pages are mutable: read as they stood at retrieval. The Internet Archive refused connections from this environment, so no capture was checked; the cross-family brief asks the checker to open archive copies of every page that refused the preparer.
- **Dates keep kind and precision.** Publication, announcement, filing, listing, revision and effective dates stay separate; an arXiv submission date is the date of that version, not of a model's release; a month stays a month; unknown stays unknown.
- **Announced stays announced.** Commitments, plans and investments are recorded at the stage the source states.
- **No inference from proximity.** No state direction, ideology, influence or affiliation is inferred from funding, location, a public body's list, a laboratory's founding sponsors or co-signature. "Chinese AI" is never one actor: each record names its own organisation.
- **Wording.** "Earliest located", never "first"; no motives; no loaded words. Living people: public roles and public authorship only; no e-mail addresses.
- **Closest source.** The developer's paper, repository, announcement or filing; the public body's own text. Reporting only where no primary text could be retrieved, marked as such. Wikipedia, Baidu Baike, Qichacha, Tianyancha and similar summaries are never evidence.

## Unit of record

The dataset's claim shape and its existing predicates (`src/domain/predicates.ts`): `published`, `authored`, `explicitly_credits`, `founding_stated`, `co_founded`, `held_role`, `unit_of`, `has_legal_form`, `formed_entity`, `holds_control_right`, `investment_announced`, `participated_in_round`, `announced_funding`, `signed_commitment`, `lists_participants`, `states_provision`, `enacted`, `supersedes_document`, `references_commitment`, `cites`. The pack proposes no new predicate. A regulator's list of filed services is recorded with `lists_participants` from the listing document (its count and basis), and each covered developer's entry as a `lists_participants` record naming that developer in `attributes.listedEntity`; whether that mapping should stand is an open question in the review note.
