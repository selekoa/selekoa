# Chinese AI histories

Two bounded collections, admitted separately. Each keeps its own scope, checks and
limits; together they are reached from the sidebar's **Chinese AI histories**
disclosure and from the Institutions & people hub.

## First bounded collection (2026-09-29)

This collection adds **36 exploratory claims, 27 entities, 17 source expressions
and 36 evidence records** to main `d3b19db`. All new claims remain seeds; every
new evidence record was passage-checked by machine. No human acceptance is
recorded. Existing records, metadata and historical review packs are preserved.

The sidebar's **Chinese AI histories** disclosure opens three separate dossiers.
It is editorial navigation, not a graph entity or an assertion of shared
ownership, strategy or lineage. DeepSeek supplies a founder/backer and training
history; Alibaba supplies a parent/business-group/research-team distinction;
Zhipu supplies a university research-commercialisation history. Baidu/ERNIE was
considered but deferred to preserve depth within this first collection. Its
omission is not a judgment of importance or a claim that sources are unavailable.

### Visible coverage

All three selected institutions had zero records before this increment. Counts
below are dossier projections, including relevant contextual claims. Section
counts overlap and must not be summed.

| Dossier                    | Before → after distinct claims | Sources | Chronology | People | Ideas | Capital/compute | Governance |
| -------------------------- | -----------------------------: | ------: | ---------: | -----: | ----: | --------------: | ---------: |
| DeepSeek                   |                         0 → 10 |       4 |          6 |      2 |     5 |               2 |          1 |
| Alibaba Group / Qwen entry |                         0 → 11 |       5 |          7 |      2 |     4 |               1 |          2 |
| Zhipu                      |                          0 → 9 |       6 |          6 |      2 |     5 |               1 |          1 |

Useful paths include Liang Wenfeng's High-Flyer founding credit and account of
DeepSeek's establishment; DeepSeek's reported H800 training configuration;
Alibaba's 2023 governance plan and Cloud Intelligence unit; Qwen authors and
explicit PPO use; and Zhipu's KEG origin credit, two dated CEO snapshots, joint
Tsinghua publication and contracted convertible financing. The Alibaba dossier
links to the separate Qwen Team dossier, where DeepSeek-R1's citation of the
actual Qwen2.5 announcement and the Chinese Qwen3 licensing statement are
inspectable. These are documentary paths, not inferred personnel transfers or
institution-wide adoption.

### Source quality and limits

Eight source expressions are original Chinese: the Liang interview, Alibaba
budget announcement, Qwen3 announcement, Zhipu profile, two Tsinghua accounts,
Zhipu prospectus and pinned GLM-4.5 README. Original titles, language, URL and
version are in the source records; English paraphrases explicitly identify
machine translation. No human translation verification is claimed. Fixed arXiv
versions and Git commits are distinguished from mutable corporate pages and
retrospective histories.

The proposing pass checked every new claim against its passage. One fresh-context
machine audit checked **14 claims and 11 source expressions**: ten targeted and
four random. The random draw used `crypto.randomInt` without replacement from the
26 non-targeted claims in the initial 34-claim frame; the two later Alibaba
institutional claims were both targeted. Random IDs were `cn-qwen-alibaba`,
`cn-jingren-zhou-alibaba`, `cn-r1-rl` and `cn-deepseek-v3`. Targeted IDs were
`cn-liang-deepseek`, `cn-high-flyer-backing`, `cn-alibaba-budget`,
`cn-zhipu-keg-origin`, `cn-zhipu-convertible`, `cn-r1-qwen`,
`cn-deepseek-r1-license`, `cn-qwen3-license`, `cn-alibaba-reorganisation` and
`cn-alibaba-cloud-unit`. No material disagreement or correction was identified.
This bounded audit does not certify the other 22 claims. Detailed generated
audit output and the random draw remain ignored local artifacts.

Retrieval failures: some GitHub web/API routes failed, but the exact pinned raw
files and public commit API were retrieved directly. HKEX PDF text and page
locators were accessible; its page-image retrieval failed. The Chinese DeepSeek
API-docs route redirected to unrelated introductory content, and Z.ai's GLM-4.5
blog exposed no usable text; pinned repository expressions were used instead.
A Zhipu financing-news page with inconsistent year/date context was excluded.

Material qualifications remain visible: High-Flyer is a named financial backer,
not an established legal owner; Alibaba's RMB 380 billion lower bound is a plan,
not spending or a Qwen allocation; Zhipu's RMB 400 million loan is contracted,
not established as disbursed or converted. 技术成果转化 denotes research-results
commercialisation, not proven corporate succession. DeepSeek's January README
licence section and older header badge differ; upstream Qwen/Llama licences are
retained. 开源 is narrowed to the specified model weights and licence, not an
external certification or training-data release.

Missing evidence includes exact incorporation and ownership histories, further
documented researcher movements, independently inspected compute operations,
Zhipu's consequential training infrastructure, allocation of Alibaba's budget,
and historical captures of mutable pages. Corporate technical reports do not
independently validate performance or implementation. Academic and journalistic
users must inspect the particular claims and original sources they rely on.

### Reproduction and exploration

`review/china-atlas-increment.json` preserves baseline IDs and content hashes.
The new blank working pack is optional, not a mandatory human-review queue:

```sh
pnpm review:seed --order review/china-atlas-order.json --title "Chinese AI histories" --output review/china-atlas-review.md --check
pnpm research:corpus --check
pnpm research:provenance --check
pnpm review:seed --corpus --check
pnpm check
pnpm test:browser
pnpm check:privacy
```

Build and run `pnpm preview --port 4193 --strictPort` from this feature checkout.
Open `http://127.0.0.1:4193/#/dossier/deepseek`,
`http://127.0.0.1:4193/#/dossier/alibaba-group` or
`http://127.0.0.1:4193/#/dossier/zhipu`. Desktop/mobile browser checks cover every
section, evidence links, keyboard inspection, accessibility, console errors and
horizontal overflow. Screenshots are saved only under ignored `.local/`.

Validation completed with 216 unit tests and 63 browser tests passing across the
full runs and focused corrections. Reproduction, build, formatting, lint,
type-checking and staged privacy checks passed. The larger corpus required
updating count fixtures and adding diagonal positions for crowded map landmark
labels. The privacy path matcher was narrowed to distinguish absolute home
paths from a public news URL containing `/news/home/`; quoted paths, Markdown
paths and file URLs remain checked. No human decisions or prior records changed.

## Second collection (2026-10-27)

The second collection deepens the strand with four developers and three Chinese AI
governance texts. It was prepared as a candidate pack in
[`research/china-labs-2/`](../research/china-labs-2/README.md), audited by a
fresh-context machine pass of the same model family, checked blind by a model of
another family ([report](../research/china-labs-2/codex-check-2026-10-27.md)) and
admitted under the maintainer's decisions of 2026-10-27. The
[admission record](../review/china-labs-2-admission-2026-10-27.md) gives the
counts as admitted, the mapping, every correction and the open leads. All records
remain seeds; no human acceptance is recorded.

### What it covers

- **Moonshot AI (月之暗面)**: the Kimi k1.5, Kimi-VL, Kimi K2 and Kimi K3 reports and
  model cards, their licences as each text states them, and authorship credits for
  people already in the dataset.
- **MiniMax (稀宇科技)**: the MiniMax-01 and M1 reports, the M2 and M3 releases, the
  licence texts and their dated changes, and its Hong Kong prospectus of
  31 December 2025: named pre-IPO investors, model milestones and the company's own
  account of its safety measures.
- **Baidu (百度), ERNIE (文心)**: ERNIE papers from 2019 to 2026, the ERNIE Bot and
  ERNIE 4.5/X1 announcements, the ERNIE 4.5 open-weight licence and two annual
  reports on Form 20-F.
- **ByteDance Seed (字节跳动 Seed)**: technical reports and model cards from
  Seed-Thinking-v1.5 to Seed2.0, the Seed-OSS, Seed-Coder and Seed-X licences, and
  the planned work of its Alignment & Preparedness department as announced.
- **Governance texts**: TC260's AI Safety Governance Framework (人工智能安全治理框架)
  in versions 1.0 (2024), 2.0 (2025) and 3.0 (2026), with quoted provisions keyed
  across versions; the AI Industry Alliance's AI Safety Commitments
  (人工智能安全承诺, December 2024) with its 17 initially listed companies; and
  Shanghai AI Laboratory's Frontier AI Risk Management Framework (v1.0, July 2025).

The sidebar lists Moonshot AI, MiniMax, Baidu/ERNIE and ByteDance Seed beside the
first collection's three dossiers. The governance texts have their own document
pages, reached from the dossiers of their publishers and signatories. Every
organisation and document has a pre-rendered page.

### How records are mapped

- **What a document states.** Framework and commitment texts carry quoted
  provisions. A licence, a prospectus or a technical report does not: what it
  states is an ordinary record of its publisher's publication, worded as what the
  document says (maintainer decision 3).
- **Credited, not published.** Peng Cheng Laboratory (author affiliation on the
  ERNIE 3.0 Titan paper), CNCERT/CC (named on the cover and in the preface of the
  governance framework 2.0) and Concordia AI (named with Shanghai AI Laboratory on
  its framework) are recorded as credited by the document, not as its publishers
  (decision 4). CNCERT/CC is typed as an organisation so that the existing relation
  fits; no legal status is asserted. No schema change was needed.
- **Signatories.** Each listed legal entity is mapped to the group-level entity,
  with the legal name kept as an alias and in the record's qualification
  (decision 5). A listing is dated by the post that published it; it is not a
  signature date or evidence of compliance.
- **Image-only text.** The AIIA commitments and their signatory list exist only as
  an image. Quotations from it are transcriptions, and each evidence record says so
  (decision 2). People's Daily Online's reproduction omits 红队 (red-team) in
  Commitment II; the image includes it.
- **Language.** Chinese passages are quoted in Chinese. English renderings are
  machine translations, marked as such in each evidence note; no human translation
  verification is claimed (decision 6).

### Limits

- No state direction, ideology, influence or affiliation is inferred from funding,
  location, alliance membership, co-signature or co-naming. Each record names its
  own organisation.
- A framework, commitment or licence states terms. It is not evidence of adoption,
  implementation, compliance or enforcement. A technical report does not validate
  performance; a prospectus statement is the issuer's own account.
- Prospectus investor records name the investing vehicles and their stated parents.
  No round total is attributed to any one investor.
- Repository commit dates date a file's expression, not the moment a model or
  repository became public. arXiv submission dates are not release dates.
- Mutable pages were read on 2026-10-27; where the cross-family check located an
  Internet Archive capture, the source links it. A capture shows only what the
  archive retrieved that day.

### Reproduction

```sh
pnpm tsx scripts/china-labs-2-admission.ts --check
pnpm vitest run src/domain/china-labs-2-admission.test.ts
pnpm check
pnpm check:privacy
```
