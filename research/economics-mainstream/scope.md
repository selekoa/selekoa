# Mainstream economics and machine intelligence: research thread scope

A bounded special investigation that tests one prior: "Only very recently has machine intelligence begun to enter mainstream economics." It asks how and when mainstream economics engaged with AI, machine intelligence and automation by AI, as distinct from the explosive-growth and singularity strand, which the separate `economics-growth` pack covers. It records what dated texts say. It neither confirms the prior nor assesses whether any model is right, and it never claims first use.

The output is a candidate research pack outside application data (`pack.json`, rendered as `pack.md`), a dated timeline (`timeline.md`) and a list of Finnish texts (`kak.md`). Nothing here is editorially accepted.

## State on 2026-10-09

Pass 0 (morning) was blocked: the network policy refused every source host. The policy was opened at about 16:37 UTC, and pass 1 retrieved the texts listed in `pack.json`. The Wayback Machine still reset every connection, so texts were retrieved directly from publishers, NBER, arXiv and the Internet Archive, and each is recorded as a current copy, not an authenticated historical capture.

## Maintainer decisions applied on 2026-10-11

Decisions D1–D7 (README, 2026-10-10 and 2026-10-11) were applied on 2026-10-11:

- **D1.** Current copies are acceptable for admission. Texts not retrieved, or retrieved only as an abstract page or another version, carry a full APA 7 reference (with DOI where one exists, checked against Crossref on 2026-10-11).
- **D2.** The tier rule below replaces the rule of 2026-10-09. Every source and lead was re-tiered with a one-line basis.
- **D3.** Model scenarios counted under M05 carry the flag "model scenario" and stay context-only.
- **D4.** [library-list.md](library-list.md) lists every text not retrieved, why it matters and what to check.
- **D5.** KAK full texts for 2023–2026 stay optional.
- **D6.** A cross-family GPT check is required before any admission ([gpt-check-input-2026-10-11.md](gpt-check-input-2026-10-11.md), merged on 2026-10-11 with the packet a parallel session generated the same morning; run in Codex on 2026-10-12 and applied the same day, below).
- **D7.** Admission comes later; nothing goes into `data/`.

## Maintainer decisions applied on 2026-10-12

The maintainer accepted all final disagreements of the GPT cross-family check ([gpt-check-2026-10-11.md](gpt-check-2026-10-11.md), [gpt-check-2026-10-11.json](gpt-check-2026-10-11.json)) and decided the borderline tier calls. Applied on 2026-10-12:

- **Relations:** M01-04, M02-17, M05-18 and M09-11 changed to bears-on, and their earliest-located roles removed.
- **Earliest located** recomputed across the whole pack, not only the 62 checked passages. M05 moved to M05-20 (NBER w22252, by its checked June 2017 revision; D3 lets a model scenario hold the role when it meets the all-tasks criterion as a conditional model). M09 moved to M09-27 (2019). M01 and M02 have no tier-1 contest left. The tier-2 earliest is now recorded as a separate role.
- **Engagement:** six legacy explicit/implicit values replaced (M05-03, M05-09, M05-11, M05-12 engages-premise; M05-04, M05-07 contrary-only).
- **Context only** on 13 more passages; **locators** corrected (M05-29) or tightened (Mansfield, Leontief–Duchin); **attribution** notes for M01-07, the chairman's introduction, M05-42 and the Leontief 1952 standfirst.
- **Tier calls** (below, under Tiers).
- **Open, not chased:** the Acemoglu journal-version figures (OUP 403), the meaning of "robots" in the 1931 JPE review (403) and Simon's 1965 original (unread). Follow-up leads: Simon 1965 (L01) and Husso 1992 (L21).

## Unit of record

```text
proposition  a neutral claim with one criterion, attributed to no one (M01…M09; M06a, M06b)
 passage     a short quotation from one text, with locator, relation,
             engagement (for contests), context paraphrase and qualification
source       one text: tier, work date, attested date, versions, retrieval record
```

Relations, as in the `economics-growth` pack and schema 2.11–2.12: `articulates` (meets the criterion), `contests` (disputes it or a premise; `engagement` is `engages-premise` or `contrary-only`, judged at the level of the section or paper the passage belongs to), `bears-on` (relevant without meeting the criterion; `missing` names the gap). A passage that misleads when shown alone carries `contextOnly` with the reason and the context it requires.

All propositions are `posed`: Selekoa frames them, and texts take positions on them. M09 is the maintainer's prior itself. It is assessed from the dated record of what tier-1 venues published and from tier-1 texts' own statements about the field, never from the absence of a search hit.

## Tiers and earliest located

Maintainer rule of 2026-10-11 (decision D2), shared with the economics-growth pack. It replaces the rule of 2026-10-09, under which magazine pieces were tier 2 whatever their author.

- **Tier 1:** scholarly work by economists, in any venue: journal articles, working papers, books, chapters, commission reports, and their essays or articles in magazines (Leontief's 1952 Scientific American article is tier 1). "Economist" means an economics appointment, degree, address or affiliation shown in or near the text, or an established record as an economist. Anything in a core economics venue is tier 1 regardless of author: the "top five" journals, the Journal of Economic Perspectives, the Journal of Economic Literature, AER Papers & Proceedings, NBER working papers and the NBER Economics of AI volume.
- **Tier 2:** texts by non-economists, whatever the venue (for example Nilsson, an AI scientist, in 1984), and short-form commentary even by economists: blog comments, forum replies, magazine or online debates, unless a turn is itself a substantive scholarly argument.

Each source and lead in `pack.json` has a `tierBasis`; `pack.md` lists them under "Sources and tiers". Changes on 2026-10-11:

- Leontief, "Machines and Man" (1952): tier 2 to tier 1.
- Leontief, "The distribution of work and income" (1982, lead L04): tier 2 to tier 1.
- Einzig (1956, lead L06): tier 1 to tier 2.
- Newhouse (1966): stays tier 1, now on an established record as an economist (economics degrees, Harvard, per his Harvard Kennedy School faculty page, retrieved 2026-10-11). The 1966 text shows only the byline "Harvard University".
- Frey and Osborne (2013) and Eloundou et al. (2023): tier 1 confirmed.
- Keynes (1930, lead L18): tier 1 as an economist's magazine essay (context only).
- Two census title records cited in the timeline became leads: L19 (JPE review, 1931) and L20 (REStud, 1969), tier 1 as core-venue texts.

Borderline calls decided by the maintainer on 2026-10-12, under the same rule (an author's standing as an economist is judged at the time of writing):

- Economists' testimony in the 1955 hearings (Buckingham, Nourse): tier 1. The hearings stay split by witness; other witnesses are tier 2.
- The 1966 Commission main report: tier 2 (was tier 1). Its economist-written appendix studies are tier 1 (Mansfield, Newhouse); Lynn stays tier 2. The chairman's introduction, outside the official report, stays under the report's source at tier 2 (maintainer, 2026-10-12); its passages hold no role.
- ETLA Brief 22: tier 1.
- The Triple Revolution memorandum (1964, lead L17): tier 2.
- KAK texts: tier 1. Kansantaloudellinen aikakauskirja is a core venue for the Finnish strand.
- The Hanson–Yudkowsky blog debate (2008): tier 2, shown as the tier-2 earliest where relevant. It is not in this pack.

None of these propositions has a usual name, so the separate role "earliest located use of the usual name" does not apply; it will if a term such as "task-based framework" or "productivity J-curve" is adopted as a name.

Earliest located is computed within tier 1 by default, by the date of the checked wording (the attested date where one is recorded), separately for articulations and contests and only among passages in the author's own voice. Tier 2 is shown separately, with the role `earliest-located-tier-2` (since 2026-10-12). Where two passages share a source and date, the one earlier in the text holds the role. It was recomputed on 2026-10-11 after the re-tiering. No proposition-level role moved, because no re-tiered source holds an articulating or contesting passage. At timeline level, the earliest located tier-1 text on machines and employment is now Leontief (September 1952), known only from a standfirst that may be editorial wording. Buckingham's 1955 statement remains the earliest tier-1 text whose checked wording is the author's own. A working paper and its journal version are separate expressions; both dates are recorded, and the working-paper date decides earliest located only if its own wording was checked. Recomputed again on 2026-10-12 after the GPT check: M05 moved from M05-18 (Nordhaus, September 2015) to M05-20 (Acemoglu and Restrepo, dated June 2017 by its checked revision rather than May 2016), and M09 from M09-11 (Nordhaus 2015) to M09-27 (the 2019 NBER introduction). M01 and M02 lost their tier-1 contests (M01-04, M02-17). The tier-2 earliest roles are M01-10 and M05-14 (Nilsson 1984), and M05-11, M06a-04 and M06b-05 (the Commission report, February 1966).

## Search scope

Searched on 2026-10-09:

- **Discovery (pass 0):** twelve web searches (S1–S12), logged in `pack.md`. Discovery only.
- **Title census (pass 1):** every Crossref record registered under the ISSNs of AER, QJE, JPE, Econometrica, REStud, JEP, JEL and AEA Papers & Proceedings, and under the NBER DOI prefix (10.3386): 81,884 records. Titles were matched against four term classes (AI, machine learning, automation, computers/IT). Crossref coverage is uneven: AER and JEL records start in 1999, JEP in 1987; QJE, JPE, Econometrica and REStud reach back to their first volumes; NBER from 1973. Kansantaloudellinen aikakauskirja has no Crossref records under its ISSNs.
- **Full texts (pass 1):** NBER working papers and four chapters of the NBER Economics of AI volume (2019); AEA abstract pages for JEP, AER and AEA P&P articles (full PDFs refused); Frey and Osborne (2013); Eloundou et al. (arXiv v1, 2023); Nilsson (AI Magazine, 1984); Leontief's 1952 Scientific American page (standfirst only); and from the Internet Archive, the OCR text of the 1955 Joint Committee hearings on automation, the 1966 National Commission report (Vol. I and Appendix Vol. II), Bowen and Mangum's 1966 condensation, and Leontief and Duchin's 1984 report to the National Science Foundation.
- **Passage finding:** four fresh-context sub-agents read the cached texts, proposition by proposition (abstracts, introductions, conclusions and relevant sections; long texts searched, not read in full). Every quotation was then checked by script.
- **Kansantaloudellinen aikakauskirja:** see `kak.md` for the archive crawl and term search.
- **Library catalogue records** for books that the Internet Archive lends only (Simon, Einzig, Buckingham, Dunlop, Leontief and Duchin 1986): bibliographic data only.

Not searched or not reachable: AER and JEL before 1999 and AER P&P before 2018 at title level (JSTOR returned a bot challenge; the Internet Archive's scholarly index reset connections); full texts of journal articles behind AEA, OUP, Chicago and JSTOR; Google Books (rate-limited); OpenAlex (daily budget exhausted); IMF and OECD (HTTP 403); ETLA's publication list (not attempted after the KAK crawl took priority); JEL classification history. The economics-growth strand (explosive growth and singularity) belongs to the separate economics-growth pack and was searched here only where a text also bears on these propositions.

## Retrieval rules

- Direct HTTP, sequential per host: at least 8 seconds between requests to a document host, 6 seconds for the Finnish Economic Association's archive (3 seconds after 18:10 UTC) and 1.5 seconds for the Crossref API (`tools.mjs` enforces the pacing).
- Wayback captures, when used, need an explicit 14-digit timestamp and the `id_` flag. The tool never follows redirects. It refuses a capture whose served timestamp (the redirect target or the `Memento-Datetime` header) differs from the requested one and prints the served timestamp, so it can be requested explicitly and recorded. This guards against the mislabelled-capture bug reported in the brief.
- Each retrieval records the requested URL, requested and served capture, HTTP status, SHA-256 and time. Failures are written to the cache and copied into `pack.json`.
- An abstract page is acceptable when the full text is unavailable; the source says so and carries a 40-word quotation cap.
- Plain-text downloads (Internet Archive OCR) are stored as served. An earlier version of the tool passed them through an HTML stripper, which dropped text between stray `<` and `>` characters; the affected caches were regenerated from the raw downloads before verification.
- A redirect is never followed silently: the target is requested explicitly and both URLs are recorded.
- Lending-only Internet Archive items were not opened; their full text and search-inside service were not used.
- Wikipedia and web-search summaries are for discovery only. No quotation comes from memory or from a search summary.

## Validation checklist (each passage)

1. **Quote match:** at most 50 words, verbatim in the cached text after normalising whitespace, quotes, dashes, Unicode compatibility forms and PDF line-break hyphenation; `…` separates fragments that occur in order within one paragraph (`tools.mjs verify`).
2. **Caps:** at most 400 quoted words per source; about 10% for sources under 2,000 words (`documentWords`). A passage used under two propositions counts once.
3. **Version:** working paper and journal version recorded separately, with both dates; the quoted wording's version named.
4. **Dates:** work date, attested date and claimed date kept separate; wording date versus publication date where they differ.
5. **Engagement and context:** contests carry engagement and a one-sentence rationale; passages that mislead alone are context-only.
6. **Audit:** a fresh-context machine audit of every passage and timeline entry, recorded in `audit.md`, plus a list of passages for a cross-family (GPT) check.
7. **Tier and flags:** every source and lead has a tier basis; a model scenario must be context-only (`tools.mjs verify`, since 2026-10-11).
8. **Earliest located:** for each proposition, relation (articulates, contests) and tier, exactly one own-voice passage holds the role and none in the group is dated earlier (`tools.mjs verify`, extended to contests and tier 2 on 2026-10-12).

## Reproduction

From the repository root:

```sh
node research/economics-mainstream/tools.mjs probe <url>
node research/economics-mainstream/tools.mjs fetch <key> <url>
node research/economics-mainstream/tools.mjs grep <key> "<regex>"
node research/economics-mainstream/tools.mjs census <key> "issn:XXXX-XXXX"   # Crossref title census
node research/economics-mainstream/tools.mjs census-report                     # -> pack.json census
node research/economics-mainstream/tools.mjs kak-crawl                         # KAK archive text layers
node research/economics-mainstream/tools.mjs kak-search
node research/economics-mainstream/tools.mjs verify    # -> verification.json
node research/economics-mainstream/tools.mjs render    # -> pack.md
node research/economics-mainstream/tools.mjs crosscheck 2026-10-11  # -> gpt-check-input-<date>.md, gpt-check-verdicts-<date>.json
npx prettier --write research/economics-mainstream/
```

The cache lives in the ignored `.local/economics-mainstream/` folder. A fresh checkout has no cache: on 2026-10-11 it was rebuilt with `fetch` from the URLs recorded in `pack.json` (for Internet Archive texts, the `_djvu.txt` URL named in each source's expression) before `verify` was re-run.
