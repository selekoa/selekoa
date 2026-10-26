# OpenAI and DeepMind institutional atlas

This increment adds 40 individually evidenced exploratory seed claims, 26 entities,
20 source expressions and 40 evidence records to main at `6599cc2`.
No existing claim, entity, source or evidence record is changed. Human acceptance
and source-integrity records are unchanged. The unmerged Christiano pilot is not
included. The application dossiers are the deliverable; the review pack supports
later inspection.

## Coverage and projection

OpenAI's 15 additions cover the nonprofit launch, capped-profit announcement,
proposed and reported completed restructuring, November 2023 leadership events,
Gym, human preferences, scaling, Superalignment, robotics and the Charter.
The other 25 cover DeepMind research and researchers, AlphaFold compute,
Ethics & Society, the announced Streams team transition, Google Brain authorship,
and Google DeepMind research and governance. No model entities were added.

Existing acquisition, combination, personnel movement, Microsoft investment,
cloud-contract and framework-version claims are reused. In particular, OpenAI's
17 capital/compute claims already distinguish investment from infrastructure and
contract terms; repeating them would not improve explanation.

| Dossier                  | Distinct claims before → after | Sources before → after |
| ------------------------ | ------------------------------ | ---------------------- |
| OpenAI                   | 136 → 155                      | 58 → 70                |
| DeepMind                 | 41 → 64                        | 16 → 27                |
| Google Brain             | 28 → 33                        | 17 → 19                |
| Google DeepMind          | 19 → 26                        | 11 → 14                |
| Anthropic (context only) | 123 → 128                      | 53 → 56                |

Projection includes documented people and document context, so dossier totals
overlap and do not sum to new claims. Anthropic gains shared documentary context;
its curated reading selection is unchanged.

| Dossier         | Chronology | People  | Ideas/documents | Capital/compute | Governance |
| --------------- | ---------- | ------- | --------------- | --------------- | ---------- |
| OpenAI          | 57 → 71    | 64 → 67 | 45 → 55         | 17 → 17         | 11 → 18    |
| DeepMind        | 10 → 22    | 21 → 24 | 18 → 33         | 0 → 1           | 0 → 2      |
| Google DeepMind | 15 → 19    | 6 → 8   | 0 → 3           | 1 → 1           | 10 → 12    |

Section counts also overlap. DeepMind capital and governance remain thin;
the separate Google DeepMind dossier supplies later institutional context through
explicit combination links, not automatic identity or governance inheritance.
Google Brain retains its own sparse dossier rather than borrowing its successor's
records.

## Local exploration

From this branch's checkout run `pnpm install --frozen-lockfile`, `pnpm build`,
then `pnpm preview --port 4191 --strictPort`.
Open `http://127.0.0.1:4191/#/dossier/openai` or
`http://127.0.0.1:4191/#/dossier/deepmind`.

- OpenAI chronology: launch → capped-profit announcement → 2023 board events →
  proposed and reported completed 2025 changes. Inspect the evidence buttons.
- OpenAI ideas: human-preferences research explicitly credits DeepMind. Follow
  the paper and people records without treating collaboration as influence.
- DeepMind ideas: deep reinforcement learning → AlphaGo Zero; AlphaFold links
  researchers, the paper and reported TPU use. These are documented relationships,
  not an inferred causal chain between successive projects.
- DeepMind's connected-dossier control opens Google DeepMind with the exact
  combination evidence. From there Google Brain remains separately explorable.
- Capital and governance preserve announced terms, snapshots and version dates.
  Each claim opens its locator, source link, qualification and check status.

## Editorial limits and working pack

All additions remain `seed`, with `machine_checked` evidence, not editorially
accepted conclusions. Evidence is an identifiable primary expression, with
locator, paraphrase, relationship and temporal qualification. Corporate accounts
document what the institution said, not independent proof of implementation.

Risk-trigger handling: the PBC proposal and completion are separate claims;
leadership roles are dated snapshots; Streams is a team-transition announcement,
not DeepMind's succession; the current Charter has no invented historical date;
AlphaFold TPU use is internal infrastructure, not a priced transaction. Gemini's
institutional introduction is distinct from its later arXiv version and does not
claim sole institutional authorship. These narrow qualifications support seed
admission; curated structural or governance conclusions require human inspection.

Sources were inspected against their named passages. Alternative inaccessible
pages were not admitted as evidence. Current HTML expressions are not represented
as authenticated historical captures. Source availability can change; a valid
link and machine check do not establish enduring access or human review.

`review/institutional-atlas-increment.json` records the baseline IDs and hashes;
tests verify every pre-existing record remains unchanged. Historical review packs
remain preserved. Generate the new blank working pack with:

```sh
pnpm review:seed --order review/institutional-atlas-order.json --title "OpenAI and DeepMind institutional atlas" --output review/institutional-atlas-review.md
```

Add `--check` to verify reproduction while that pack remains blank. Never overwrite
entered review work. Decisions and notes remain blank; no acceptance is imported.

Independent human spot-checking is pending. A proposed three-claim sample is
`atlas-altman-return` (randomly selected from the increment),
`atlas-openai-pbc-plan` and `atlas-deepmind-alphafold-compute` (targeted structural
and infrastructure risks). Inspect each original passage, wording and qualification.
No independent machine audit or human review is claimed by this increment.

## Remaining gaps

DeepMind needs stronger acquisition economics, financing, early personnel and
external governance evidence. Google Brain needs its own formation, infrastructure
and governance treatment. OpenAI still needs fuller founding finance and legal
control-document coverage. Corporate research accounts are not independent
performance evaluation. Later appointments and current contractual status must
not be extrapolated from these dated records.

Validation includes domain preservation, duplicate dated relationships, seed/check
states, temporal limits, historical-pack reproduction, production build, browser
evidence navigation, accessibility and privacy checks. Browser captures and logs
belong in ignored local storage, never in commits.
