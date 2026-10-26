# Chinese AI histories: first bounded collection

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

## Visible coverage

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

## Source quality and limits

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

## Reproduction and exploration

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
