# Research baseline: integration handoff

Checked 2026-09-28. Ready for an authorized local integration as an **exploratory research baseline**, not editorial acceptance or publication. No merge was performed.

## Branch and preservation checks

The local history is linear: `main` / Reborn Genesis I at `51a6db7` → Conceptual Provenance II `f9a787e` → Issa Rice reconnaissance `09c17e5` → this supplement on `codex/research-baseline-supplement`. Both increments are already ancestors of this branch; do not cherry-pick duplicate copies. A future authorized fast-forward from the inspected main is possible. Recheck main and worktree state before integration if other work advances.

All seven local worktrees were inspected. CP II, main, evaluation-institutions, evaluation-ontology, Reborn Genesis and reconnaissance were clean. The root remained on network-cartography with unrelated edits to `README.md` and `docs/capital-compute.md`; they were untouched. Other local branches and local remote-tracking tips were inventoried. No fetch or claim about current server state is implied. `git merge-tree --write-tree main codex/upstream-reconnaissance` reported no conflicts without changing a branch or checkout. This work reuses the clean reconnaissance worktree on a new branch, preserving both original tips.

## Supplement and human scope

Read the [versioned packet](../../research/collections/research-baseline-supplement-v1/packet.md) and [structured record](../../research/collections/research-baseline-supplement-v1/supplement.json). The original CP II collection remains version 2; the additive supplement has its own ID/version 1 and `RBS1-*` identifiers. It references PCR-002 and CP2 findings without rewriting them. A 59-file Git-blob manifest and checker protect both original collections, every existing review file and application data.

The June 23, 2004 Wayback replay was retrieved again at its requested timestamp, with a matching Memento header. The page identifies **Collective Volition** and gives May 2004 as its document date. `RBS1-H01` records **futurelightcone's reported personal inspection confirming title presentation only**. The actual inspection date is unknown; September 28 is the report/recording date. It does not confirm capture authenticity, fetched byte identity, the complete document, the negative exact-name search, naming priority, employment findings or editorial acceptance. Existing human decision fields remain untouched.

The machine's exact-name screen found no Coherent Extrapolated Volition match in this HTML expression. First use and the renaming date remain unresolved. This supplements CP II's search boundary rather than retroactively changing its historical result or claiming an exhaustive search.

## Christiano reference: accessible alternatives and limits

The reported broken May snapshot is an access-method problem in this pass, not demonstrated loss of the archived source. The web reader returned an internal error with no HTTP status; direct retrieval of both the [normal replay](https://web.archive.org/web/20130529221123/http://intelligence.org/team/) and [raw replay](https://web.archive.org/web/20130529221123id_/http://intelligence.org/team/) returned HTTP 200 and the same May 29, 2013 Memento timestamp. Different response hashes reflect different replay representations; these are not independent witnesses.

The archive-advertised [July 1, 2013 alternative](https://web.archive.org/web/20130701052440id_/http://intelligence.org/team/) also lists Paul Christiano as Research Associate and a Berkeley graduate student. These are confirmed **institutional affiliation snapshots**, not proof of a paid employment contract, exclusivity or continuous service. The [March 17, 2015 capture](https://web.archive.org/web/20150317133552id_/http://intelligence.org:80/team/) returned no name match; an omission does not establish when or whether employment ended.

Two institutional articles add separate dated attributions: the [April 2012 progress report, published May 8](https://intelligence.org/2012/05/08/singularity-institute-progress-report-april-2012/), SPARC paragraph, calls him an SI research associate; the [June 23, 2014 announcement](https://intelligence.org/2014/06/23/new-report-non-omniscience-probabilistic-inference-metamathematics/), opening paragraph, calls him a MIRI research associate. These are current expressions of period-dated posts, with original publication-day bytes unverified. They support the historical attribution, not exact appointment boundaries. In particular, do not use the first May 2013 team capture as a start date. The original live team URL now redirects to the current team and cannot substitute for either archive.

The reconnaissance's original reference and historical account are preserved with a prominent qualification link. The supplement records successful requests, reader failures, original/resolved identities, response hashes, access timestamps, distinct document/capture dates, locators, paraphrases, evidence roles and additive correction history. No upstream dataset correction was sent.

## Checks and remaining limits

Reproduction commands from the repository root:

```sh
pnpm research:corpus --check
pnpm research:provenance --check
pnpm review:seed --corpus --check
node scripts/research-supplement.mjs --check
node --test scripts/research-supplement.test.mjs
```

Validation in this pass: both original collection reproductions and the blank corpus review reproduction passed; 36 focused editorial/research tests and six supplement regressions passed. Supplement tooling lint passed. The preservation check confirms all 59 protected files unchanged. Staged formatting, privacy and whitespace checks are the final commit gates; results are reported with the commit handoff.

Use historical-render tests or a separate ignored blank reference if review packs acquire annotations; never replace review work. The supplement checker is offline; it verifies packet reproduction and preservation, not historical truth or continuing link availability. Application/browser suites are not required for this documentation and isolated research-tooling change; application data, schema, querying and UI are unchanged.

Integration readiness concerns provenance and reproducibility. Exact CEV priority, renaming, Christiano's employment interval and original bytes of the 2012/2014 posts remain unresolved. The maintainer's one title observation does not complete the policy's broader human sample or constitute curated-history acceptance. The additional-review triggers are handled by retaining these limits; no human review, source access or independent machine audit is manufactured. Source-integrity, the atlas and existing review decisions were not changed. No merge, push, deployment, publication or visibility change is authorized by this handoff.
