# Lab genealogy: who went where in frontier AI labs, 2010–2026

The documentary history of who founded, led and moved between frontier AI labs, from DeepMind's founding in 2010 to the moves of 2026. Each record says that a source documents a founding, a role, a departure announcement or an arrangement between organisations at a date, with a verbatim passage from the closest source that could be retrieved. Records never say why something happened; where a person or organisation stated a reason, it is attributed to them.

**Admitted on 2026-10-17** (schema 2.15): 472 of its 477 records are in the dataset as machine-checked seeds, after two cross-family checks and the maintainer's decisions below; five records resting only on Adept's launch post are held back. See the [admission record](../../review/genealogy-admission-2026-10-17.md). The pack itself is unchanged and stays the source of the admission; it was machine-prepared and machine-audited (one model family, Claude) and cross-family-checked (GPT), with no human review. It reuses Selekoa's existing person and organisation entities and shows the dataset's existing personnel and governance records alongside its own.

- [pack.md](pack.md): the readable pack. Per-lab tables (founding, structure and deals, leadership and board, other roles, departures), a dated timeline, "who went where" paths for people documented at two or more organisations, pairs of organisations between consecutive dated records, stated reasons, proposed entities and sources. Generated from [pack.json](pack.json).
- [scope.md](scope.md): question, unit of record, proposed predicates, rules, retrieval routes, verification and limits.
- [audit.md](audit.md): the fresh-context audit (a recorded random 20% sample plus every record carrying a stated reason and targeted risky records), its findings and their dispositions.
- [verification.json](verification.json): every verbatim passage matched against the drafting retrieval and against a second, fresh retrieval of every source; quotation totals per source.
- [gpt-check-input-2026-10-16.md](gpt-check-input-2026-10-16.md): a blind brief for a cross-family check, with its separate [verdicts file](gpt-check-verdicts-2026-10-16.json). Run in two parts: [C001–C032](gpt-check-2026-10-16.md) and [C033–C213](gpt-check-2026-10-16-part2.md).
- [app-proposal.md](app-proposal.md): how person pages, lab pages and a "who went where" reading page could use the pack (a design proposal only).
- [drafting-brief.md](drafting-brief.md): the specification the drafting passes worked to; [drafts/](drafts/) holds the ten drafts, each with a `searched` note recording what was searched and what could not be retrieved.
- [tools.mjs](tools.mjs), [render.mjs](render.mjs), [crosscheck.mjs](crosscheck.mjs): retrieval, checking, merging, verification, rendering and the cross-family brief.

```sh
node research/lab-genealogy/tools.mjs merge     # drafts → pack.json
node research/lab-genealogy/tools.mjs verify    # passages against the drafting cache
node research/lab-genealogy/tools.mjs refetch && node research/lab-genealogy/tools.mjs verify fresh
node research/lab-genealogy/tools.mjs render    # pack.md
```

Retrieval bodies stay in the ignored `.local/lab-genealogy/` cache.

## What the pack documents (descriptive only)

The patterns below are what the dated records show when read together. They say nothing about why people moved, and coverage is selective: a missing move is not evidence that it did not happen.

- **Google's research units as a source of founders.** Records place founders or leaders of Anthropic (Olah), Character.AI (Shazeer), Cohere (Gomez, Blunsom), Essential AI (Vaswani, Parmar), Inceptive (Uszkoreit), Sakana AI (Jones), Mistral AI (Mensch), Reka (Yogatama, de Masson d'Autume), Inflection AI (Suleyman) and the xAI launch team (Szegedy, Zhang) at Google Brain, Google Research or DeepMind before those labs' founding records. Seven of the eight authors of the 2017 Transformer paper have later co-founder records at other organisations (Cohere, Character.AI, Adept and Essential AI, Sakana AI, Inceptive, NEAR); the eighth has a later OpenAI author affiliation.
- **OpenAI as a source of founders.** Dated OpenAI roles precede founding or leadership records at Anthropic (several co-founders and later the heads of alignment work), Safe Superintelligence (Sutskever), Thinking Machines Lab (Murati) and xAI (Musk, as co-chair); in the other direction, Thinking Machines co-founders announced returns to OpenAI in 2026.
- **Licensing-and-hiring agreements, 2024–2025.** Microsoft–Inflection (March 2024), Amazon–Adept (June 2024), Google–Character.AI (August 2024) and Google–Windsurf (July 2025) each combine a licence with the hiring of founders, as the companies or reporting describe them; none is recorded as an acquisition of the company.
- **Meta's 2025 reorganisation** brought in leaders announced with prior roles at Scale AI, SSI, OpenAI and Google DeepMind (from a memo published by reporting).
- **Safety and policy leadership, 2024–2026.** OpenAI's records show the Superalignment team (May 2024), the AGI Readiness team (October 2024) and the Mission Alignment team (February 2026) each ending as a unit, with announced departures of their leads or members; several of those who left state their own reasons, which the pack attributes to them. Two of the 2024 departures from OpenAI's alignment leadership, Leike and Schulman, are followed by announced Anthropic roles.
- **Chinese labs** are documented mainly through Hong Kong prospectuses (Zhipu, MiniMax), US annual filings (Alibaba, Baidu) and Chinese reporting; their founders' recorded prior roles are at Tsinghua, SenseTime, Sogou, Microsoft, Google and Meta.

## Decisions for the maintainer

Decided on 2026-10-16/17 and applied at admission ([record](../../review/genealogy-admission-2026-10-17.md)): (1) admit by lab family, all families; (2) the three predicates and `statedReason` accepted (schema 2.15); (3) reader relay and X syndication accepted, with the route shown on every passage; (4) records resting on reporting admitted and marked; (5) snapshots from undated pages kept, dated to the retrieval day; (6) the TechCrunch title kept as bibliographic data, the reason never repeated; (7) resolved; (8) the cross-family check run and every "partly" finding applied; (9) the Kreps, Ben Mann and Tang Jie records updated without deleting history. The questions as they were put:

1. **Admission at all, and by which unit.** The pack is outside application data. Admission would be by lab family, starting where dossiers exist; each family would bring its proposed entities.
2. **Three proposed predicates and one attribute:** `founding_stated` (organisation → literal founding date as stated), `licensing_hiring_agreement` (organisation → organisation), `unit_disbanded` (a team or unit → its parent), and `statedReason` on a claim (who stated a reason, a neutral paraphrase, the evidence). Accept, map to existing ones, or reject.
3. **Reader relay as a retrieval route.** openai.com, x.ai and some others refuse direct retrieval from this environment, so their pages were read through a third-party reader service (`r.jina.ai`) and X posts through X's own syndication endpoint. Is this acceptable for evidence, and should the source record say so visibly?
4. **Records resting on reporting.** 131 of 477 records have no primary supporting passage (mostly Meta, xAI, the later labs and Chinese labs). Admit them marked as reporting, hold them back until a primary source is found, or admit only those where the primary text exists but could not be retrieved (image notes, paywalls)?
5. **Snapshots from undated company pages** are dated to the retrieval day (15 October 2026). Keep, or admit only roles with a dated source?
6. **Source titles that name private matters.** One cited TechCrunch article's title names a health reason; the record does not. Keep the title as bibliographic data, or shorten its display?
7. **E-mail addresses in branch history.** Two paper authors' work e-mail addresses (from quoted paper text) were in earlier commits on this branch and were removed before the audit; the privacy check passes on the current files. Rewrite the branch history, or accept it since the branch will be squash-merged or not merged?
8. **Run the cross-family check** (`gpt-check-input-2026-10-16.md`, 213 items) before any admission.
9. **Existing records touched by new evidence:** Anthropic's Company page retrieved on 15 October 2026 does not list Jay Kreps on the board (the dataset records his 2024 appointment; no departure statement was found), and its Leadership page does not list Ben Mann among the co-founders (a 2024 company slide does); Zhipu's prospectus credits Tang Jie as a co-founder, while the dataset's `tang-jie` description says no corporate founding role is inferred. Update those existing records' descriptions or qualifications in a separate authorised task?
