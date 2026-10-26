# Conceptual provenance II: documentary research increment

**Additive follow-up:** [research baseline supplement v1](research/research-baseline-handoff.md) records recovered Collective Volition archival evidence and a narrow maintainer observation. The original version 2 collection, findings, corrections and review packet described below remain unchanged; exact-name priority remains unresolved.

The increment turns three imported documentary problems into a source-backed research starter. It resolves current source identities where possible and keeps historical priority and transmission questions unresolved. Read the [concise guide](../research/collections/conceptual-provenance-ii/guide.md), then the [complete appendix](../research/collections/conceptual-provenance-ii/appendix.md) for evidence and qualifications.

## Version and storage boundaries

Main was fast-forwarded from `5041e12` to Reborn Genesis I `51a6db70555d5d1ebf4d9855043b0e3ed9c99482` after ancestry, reproduction and privacy checks. The new increment is on `codex/conceptual-provenance-ii`, to remain unmerged.

`conceptual-provenance-i` v1 is unchanged. The new collection has its own version 2, parent commit/fingerprint, source access records, findings, evidence, search boundary, correction history, machine audit and frozen human sampling protocol. It embeds the three original propositions and their complete related evidence/source/mapping cells without rewriting them. Source-grouped packet associations retain their original broader mappings; they are not converted into one-to-one historical assertions.

The separately versioned upstream is `futurelightcone/source-integrity` at `54c62fc426d7b6ae008fd6acd3f53a0b993248ac`. This increment reads the already frozen Selekoa projection; it never reads current upstream reports or private drafts during generation. The upstream checkout, its local changes and the separate Research Plan workspace are outside the write set. The [correction proposal](../research/collections/conceptual-provenance-ii/corrections.md) is for a later, separately authorized upstream change.

No application records, schema, graph admission or human review state changed. The research modules remain outside the application import graph. No deployment, publication or visibility change is part of this task.

## Research result and its limits

- **PCR-010:** currently served v1 supports the authors’ self-attribution; it does not establish priority. Current arXiv history lists v1–v3; v4 paths return 404. Submission dates and PDF title/file dates are different fields. Compilation-dependent TeX plus PDF metadata support later typesetting as an inference; the original submission-day bytes remain unverified.
- **PCR-028:** preserve the wrong-object ID, the unidentified second ID and the intended Soares expression as separate identities. The wrong-object date also conflicts with the baseline date. The correction does not erase the earlier error or claim a historical object never existed.
- **PCR-002:** the earliest bibliographically dated exact-name candidate found is a 2004-attributed work in a later institutional reprint. No authenticated contemporary exact-name occurrence was found. A 2001 conceptual candidate and 2004 Collective Volition announcements are distinct. The SL4 search covers 48 monthly indexes and 355 subject-selected bodies, not the entire archive. Wiki retrieval and archive-query failures leave material gaps.

The separate machine auditor inspected the three questions before receiving proposed corrections, then reviewed those corrections. Its independently selected 107 SL4 bodies are a different sample from the investigator’s 355. It objected to treating a reply’s apparent calendar-date discrepancy as proven chronological impossibility because the quoted timestamp lacks timezone. The revised finding preserves that objection and leaves chronology unresolved. See the [attributed audit](../research/collections/conceptual-provenance-ii/audit.md); agreement does not imply independence of models or human acceptance.

## Reproduction and review

From the repository root:

```powershell
pnpm research:corpus --check
pnpm research:provenance --check
pnpm review:seed --corpus --check
```

Omit `--check` on `research:provenance` to regenerate the six projections from `research.json`. Generation is offline, validates the parent fingerprint and exact correction before-values, and uses no current timestamp. It reproduces recorded assessments, not historical truth. The source/search inventory records URLs, versions, response hashes, dates with distinct meanings, locators and retrieval limits; current source bytes may change and are not redistributed.

The optional `node scripts/research-sl4-search.mjs --replay` repeats the documented index/subject/body protocol against live public pages and exclusively creates ignored `.local/sl4-replay.json`. It never changes the frozen collection. Different live response hashes or changed counts require investigation, not automatic replacement. The script retains metadata rather than complete message bodies or email addresses. PDF and forum checks remain locator-guided research rather than a general crawler.

The human sample was generated with `pnpm review:seed --corpus`. It includes a random draw over all 11 findings, with a once-drawn frozen cryptographic seed and a reproducible hash ranking, plus targeted source-family and risk selections. Every human field is blank. The generator refuses to replace any differing pack. To check after human annotations exist, preserve the annotated pack and generate a separate ignored blank reference under `review/`, or use the historical-render test; do not overwrite review work. Decisions require a separately authorized follow-up and never import automatically.

## Validation contract and remaining usability work

Tests cover exact source/version mappings, preserved upstream history, deterministic exports, unsupported v4 retrieval, opposing evidence, typed date separation, bounded search inventory, audit coverage, random sampling and human-state isolation. The standard application and browser suites provide integration regression checks; they do not validate the historical conclusions.

Validation on 2026-09-28 passed: both collection reproduction checks, blank corpus sample reproduction, `pnpm check` (203 tests plus formatting, lint, type checking and production build), all 49 installed-Edge browser tests, staged-content privacy scanning and Git whitespace checks. The actual localhost build was visually inspected in Edge with no console errors; the browser-control kernel failed at sandbox setup, so Playwright supplied that inspection. The existing large-bundle build warning remains. Atlas counts remain 120 entities, 277 claims, 124 sources and 296 evidence records.

The starter is now readable without first navigating the full evidence table, but research remains a Markdown/JSON workflow. There is no corpus browser, source-version comparison UI, human decision importer or automatic upstream patch application. Those omissions preserve review boundaries but limit discovery and review convenience. External source availability and historical snapshots remain the largest documentary usability gaps. Further investigations should version their own search expansion and retain this unresolved result.
