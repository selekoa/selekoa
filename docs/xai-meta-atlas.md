# xAI and Meta atlas increment

Exploratory application data, checked 2026-09-29 against main `4d71375`.
Adds **39 claims, 27 entities, 20 source expressions and 39 evidence records**.
All additions remain seeds with machine-checked passages. No human acceptance,
source-integrity changes or existing review decisions are included.

## Visible coverage

Counts use the existing bounded dossier projection, including documented people
and one-step documentary context. Sections overlap; do not sum them.

| Dossier / section              |  Before |   After |
| ------------------------------ | ------: | ------: |
| xAI distinct claims / sources  | 28 / 15 | 44 / 23 |
| xAI chronology                 |      16 |      26 |
| xAI people and paths           |      12 |      16 |
| xAI ideas and documents        |       5 |      11 |
| xAI capital and compute        |       7 |      10 |
| xAI governance                 |       3 |       4 |
| Meta distinct claims / sources |   0 / 0 | 22 / 12 |
| Meta chronology                |       0 |      15 |
| Meta people and paths          |       0 |       6 |
| Meta ideas and documents       |       0 |       8 |
| Meta capital and compute       |       0 |       3 |
| Meta governance                |       0 |       3 |

xAI reuses existing launch, predecessor-role, Series B/C, Colossus and safety
framework records. New paths connect Szegedy's Google affiliation and Batch
Normalization authorship to his launch-roster entry; Yang's pre-xAI paper to his
documented role; and xAI to X and SpaceX through explicitly qualified acquisition
announcements. The initial research agenda and open-weight policy are visible
alongside Series E and the separately scoped Colossus I/II capacity report.

Meta is now a navigation anchor. FAIR and the historical Facebook company name
have their own linked dossiers. LeCun's historical leadership, Pineau's Meta role
and announced Cohere appointment, Touvron's LLaMA authorship, Transformer method
use and Chinchilla citation provide inspectable paths. RSC's initial operation,
expansion target and reported completion remain separate. Governance documents
cover PyTorch's foundation transition and Meta's model-access strategy.

The increment has 16 xAI-side and 23 Meta-side claims. Meta's 22-claim dossier
does not recursively absorb FAIR's historical Facebook membership; that record
is accessible through the institutional connection. Existing dossiers can gain
context without edits to their records: OpenAI becomes 156 claims and DeepMind
67; Anthropic remains 128 and Google DeepMind 26.

## Machine checking and bounded audit

The proposing machine pass checked all 39 claims against the cited passages.
An additional fresh-context agent, `xai_meta_audit`, received the bounded records
and policy without the proposing pass's verdicts. Audit date: 2026-09-29. No model
identifier/version was supplied to that audit context; none is invented here.
This was separate reasoning context, not a claim of independent execution or
historical certainty.

Actual source-audit coverage: **13 of 39 claims across 10 retrieved URLs**.
Targets: `xm-x-acquisition`, `xm-spacex-acquisition`, `xm-series-e-total`,
`xm-colossus-aggregate`, `xm-fair-meta`, `xm-rsc-plan`, `xm-rsc-completion`,
`xm-pineau-cohere`.

Random selection: sort the remaining 31 IDs with PowerShell `Sort-Object`, use
`[System.Random]::new(20260929)`, then draw `Next(pool.Count)` and remove the chosen
ID three times. Selected: `xm-yang-tensor-programs`, `xm-open-weights`,
`xm-szegedy-google`. The affiliation objection expanded checking to
`xm-szegedy-batch-normalization` and `xm-batch-normalization-method`.

The auditor reported four concrete disagreements:

- `xm-szegedy-google`: the paper supports Google Inc., not the internal Google
  Research unit. Corrected the endpoint to the existing `google` parent and
  removed the unsupported unit mapping.
- `source-xm-rsc-2023`: corrected the stored title to the retrieved headline.
- `source-xm-x-acquisition`: replaced a title derived from the URL slug with the
  retrieved Reuters headline.
- `evidence-xm-fair-meta`: corrected the section heading to “The present”. The
  retrospective locator was also shortened to its actual “The past decade”
  heading.

The audit supported the scoped passages, dates and distinctions in the remaining
sample, including reported totals, planned versus completed capacity and the
future tense of Pineau's appointment. The auditor did not reread the corrected
records; the proposing pass applied the corrections. The other 26 claims were
not part of this fresh-context source audit.

Retrieval limits: Cohere's web extractor omitted the article body; the auditor
recovered the original embedded article with direct HTTP retrieval. No unresolved
retrieval failures remained among its ten URLs. During initial research, direct
AP/Yahoo retrieval for Pineau's departure failed and Bloomberg returned no usable
departure passage; those sources and the proposed departure claim were not
admitted. Cohere's own appointment announcement supplies the narrower path.

## Limits and reproduction

Validation completed: 212 unit tests; all 57 browser cases passed (53 existing
cases in the full run, then the four new cases after correcting their JSON
loader, scoped locator and seed-count expectation). No successful browser cases
were repeated. Formatting, lint, type checking, production build, research
reproduction and blank-pack reproduction passed. Desktop and mobile inspection
covered both dossiers, all five sections, source links, dates, keyboard return,
accessibility, overflow and console errors. The build retains its existing large
bundle advisory. Privacy checking includes all staged additions.

xAI retains one previously accepted contextual claim; its dossier contains 43
seeds among 44 claims. All 22 Meta dossier claims are seeds. The original xAI
identity blurb remains a description of its earlier source slice; the dated
dossier claims now extend that coverage. No prior identity or review record was
silently rewritten.

Mutable xAI pages now carry SpaceXAI branding. Their dated bodies are evidence;
historical captures, exact legal counterparties and subsequent legal continuity
remain unverified. GPU equivalents are not physical H100 counts. Corporate
capacity and financing reports are not independent operational or closing audits.
Meta licence announcements are not external open-source certifications. FAIR's
later restructuring, further personnel movements, xAI's intervening financing
and infrastructure contracts, and non-English/independent institutional histories
remain gaps. No absence or current-employment conclusion follows from them.

`review/xai-meta-increment.json` records baseline IDs and content hashes; tests
preserve every baseline record. Historical packs remain unchanged. The new blank
pack is an optional working artifact, not a mandatory human-review queue:

```sh
pnpm review:seed --order review/xai-meta-order.json --title "xAI and Meta atlas" --output review/xai-meta-review.md --check
pnpm research:corpus --check
pnpm research:provenance --check
pnpm review:seed --corpus --check
pnpm check
pnpm test:browser
pnpm check:privacy
```

Build and preview from this feature checkout with `pnpm build` and
`pnpm preview --port 4192 --strictPort`. Open
`http://127.0.0.1:4192/#/dossier/xai` or
`http://127.0.0.1:4192/#/dossier/meta`. Browser checks save desktop/mobile dossier
and source-inspector screenshots under ignored `.local/`; no screenshots or
generated tool logs are committed. Academic and journalistic users must inspect
the particular original sources and claims they rely upon.
