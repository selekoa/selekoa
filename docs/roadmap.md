# Roadmap

## Current foundation

Selekoa is a source-critical institutional memory and research base for machine
intelligence. “The biography of machine intelligence” remains the north star;
a substantial historical encyclopedia is the longer-term ambition. Machine-first
research supplies a sourced, inspectable, qualified bootstrap layer for academic
research, serious journalism, books, policy research and historical investigation.
Exploratory records remain distinct from human-curated interpretations; neither
machine agreement nor presentation is editorial acceptance.

Current counts are not copied here: the [README](../README.md#research-sample) carries a
block generated from the stored records (`pnpm docs:coverage`), the About & method page
computes them in the app, and each [dataset release](../release/CHANGELOG.md) records its
own in its manifest. Meaningful institutional coverage now spans Anthropic, OpenAI,
DeepMind / Google Brain / Google DeepMind, xAI, Meta / FAIR, DeepSeek,
Alibaba / Qwen and Zhipu, alongside existing MIRI and alignment-history material.
Coverage is selective and uneven, not a comprehensive institutional inventory.
Parents, research units and programmes remain distinct where evidence requires it.

Implemented capabilities include:

- Institutional dossiers with chronology, people, ideas/documents,
  capital/compute and governance; shared evidence inspection and bounded reading
  paths. Chinese AI histories has a shared discovery entry, not a shared graph identity.
- Personnel continuity and diaspora, explicit intellectual relationships,
  versioned governance documents, and qualified capital/compute transactions.
  Topology does not establish influence, transfers, traced cash or dependency.
- Stable references, deep links and research-packet exports, plus bounded research
  corpora and starters. These preserve source paths and verification limits.
- Reproducible data/reference checks, desktop/mobile browser coverage, privacy
  scanning and machine-first research QA.

Historical increment documents retain the counts, decisions and limits of their
original baselines. See [README](../README.md) for commands and
[positioning](project-positioning.md) for product boundaries.

## Direction (agreed 2026-10-04)

- Selekoa is a machine-only research instrument. Its records remain claims; human
  checks are recorded per claim, never as crowd votes.
- No hosted “ask a question” feature is planned for the foreseeable future.
- Order of work: a versioned, downloadable dataset release with a stable record
  format; then new research spines; then a read-only MCP server (search over
  claims, evidence, document histories and open questions); then thin wrappers
  such as a Claude skill or a custom GPT.

## Major focus projects

Bounded, long-running investigations that deepen a research spine. Each has its own
project document with phased scopes and "How we searched" notes.

- [Yudkowsky corpus](projects/yudkowsky-corpus.md): the dated, versioned record of
  Eliezer Yudkowsky's documented arguments about machine intelligence, with later
  corrections kept beside earlier views. A separate application ("The Yudgment")
  consumes a pinned release.
- [Economics of Machine Intelligence](projects/economics-of-machine-intelligence.md):
  how economics has approached machine intelligence. The explosive-growth and
  mainstream-economics packs were admitted on 2026-10-14 as one propositions
  collection (G01–G09, M01–M09). The esoteric strand (E01–E05: recursive
  self-improvement, superintelligence, existential risk, developers' incentives and
  economics' own engagement) was admitted into the same collection on 2026-10-16,
  after its cross-family check and the maintainer's E05 decision (option A) of
  2026-10-15 ([admission record](../review/esoteric-admission-2026-10-16.md)).

- **Lab genealogy** (who founded, led, joined and left frontier AI labs, 2010–2026):
  admitted on 2026-10-17 as schema 2.15 from the candidate pack in
  [`research/lab-genealogy/`](../research/lab-genealogy/README.md), after two
  cross-family checks ([admission record](../review/genealogy-admission-2026-10-17.md)).
  Person and organisation pages show its records with announced, reporting and
  retrieval-route marks and attributed stated reasons. Next, after the site
  restructure: the "who went where" reading page, a "People and founding" section on
  lab dossiers and next/previous organisation links on person pages
  ([app proposal](../research/lab-genealogy/app-proposal.md)); recheck Adept's launch
  post for the five held-back records.

## Maintainer decisions (2026-10-15)

- **Cross-developer comparison in the app: yes in principle, when the time is
  right.** A side-by-side view of what each developer's safety framework states on
  the same question (proposal: [app-proposal](../research/frontier-framework-comparison/app-proposal.md))
  is wanted, after the planned restructure of the site's structure (the
  [fresh-eyes structure proposal](fresh-eyes-2026-10-14.md)). Once implemented, it
  supersedes the frameworks page's current line "This page does not compare or rank
  developers"; ranking stays out. The app text is not changed until then.
- **Quotation budget for the comparison pack (working approach).** Reuse the
  dataset's existing quotations where they cover a facet, and admit the most
  important facets first, within the current per-source limit.
- **E05 boundary** of the esoteric economics strand: option A (see its
  [README](../research/economics-mainstream/esoteric/README.md)).
- **Policy review.** The maintainer asked to question the reasons and validity of
  earlier policy decisions: [policy review of 2026-10-15](policy-review-2026-10-15.md),
  for reading and decision. Nothing in it is applied.

## Version policy (recorded 2026-10-05)

Selekoa stays at 0.x until it has real outside users: at least a couple each month
who find genuine value in it. Version 1.0 must be earned through that use. It is not
a milestone of features, coverage or time.

## Publication decisions (recorded 2026-10-04; licences and launch preparation 2026-10-10)

The licence choices below were confirmed on 2026-10-10 and the licence files are in the
repository (`LICENSE`, `LICENSE-DATA.txt`, `LICENSING.md`). Nothing is published yet.
Launch preparation and the maintainer's launch-day steps are in
[launch-readiness](launch-readiness.md) and [launch-runbook](launch-runbook.md).

- **Code:** MIT licence.
- **Selekoa's own data and text:** CC BY 4.0. This covers Selekoa's records and the
  text written for Selekoa; the [dataset format](dataset-format.md) gives every field a
  text class.
- **Third-party quotes:** excluded from the CC BY licence. Verbatim source passages are
  kept in the evidence `quote` field, and short quoted phrases inside Selekoa's text
  are marked by quotation marks, so the licence can exclude them cleanly. They remain
  subject to their publishers' rights.
- **Contact:** an address on the maintainer's own domain, for corrections, takedown
  requests and questions (the earlier provisional address is superseded). It is one
  setting in `site.config.json`; a placeholder stays until it is chosen, and a public
  build refuses the placeholder.
- **Publication route:** publish later from a separate GitHub organisation, as a
  public repository with fresh history. This private repository and its history are
  not made public.
- **Citation formatting licence (decided 2026-10-10):** "Copy APA" stays. citeproc-js
  is used under CPAL-1.0 (it offers CPAL-1.0 or AGPL-1.0), which has no attribution
  display requirement here but asks for a source-availability notice and a copy of the
  licence; the APA style is CC BY-SA 3.0 and is credited. Both are in
  `THIRD-PARTY-NOTICES.md` (generated by `pnpm notices`, checked by the tests) and on
  the About & method page. Not legal advice.
- **Visibility after launch (decided 2026-10-10):** once published, the site is public
  in full: indexing on, canonical address and social preview text set, and
  privacy-friendly analytics enabled (free or low cost, cookieless: GoatCounter or
  Cloudflare Web Analytics). Public copy says the site is version 0.x and a work in
  progress. The steps are in the [launch runbook](launch-runbook.md).
- **Source terms (decided 2026-10-10):** launch on the short-quotation practice with a
  corrections and takedown contact. Before launch, check the terms of LessWrong and
  the Alignment Forum and of the SL4 and Extropians mailing-list archives, which hold
  most quotations of one living author; record the result per source. Result:
  [source terms](source-terms.md) (2026-10-12).
- **Public tagline (open):** decide whether to keep “the biography of machine
  intelligence” as the stated aim or to describe the current scope instead. A
  candidate phrase is “a route to the sources”.

Dataset releases ([format](dataset-format.md), `release/`) carry the field classes and
the separate quote field these decisions rely on. Releases before format 1.4 say that no
licence is granted and stay unchanged; `LICENSING.md` states the terms for them.

## Next major development phase

Prioritize visible research usefulness in this order:

1. A polished, immediately legible public-facing experience. Make purpose, coverage,
   evidence and verification limits understandable on first use. This is a design
   priority, not authorization to publish.
2. Researcher-friendly entry points beyond institutions: people, topics, documents
   and historical questions. Choose dossiers, person views, document/version
   histories, timelines, source inspection or maps according to the task.
3. Deep flagship research paths, especially Frontier AI Governance: frameworks,
   charters, constitutions, boards/control, restructurings, safety/deployment
   frameworks, documented commitments, policy changes and explanatory regulatory
   or contractual relationships. Show what a document said, when, what replaced it
   and what changed; do not equate revisions with implementation.
4. Exportable research starters containing claims, primary and other source paths,
   relevant passages, qualifications, disagreements and open questions. Existing
   [atlas exports](research-references.md) omit passages; corpus starters preserve
   qualified passages. Fuller packets are development work, subject to source reuse
   conditions, not a claim about current export completeness.
5. Continued corpus growth after these capabilities are useful. Keep adding bounded,
   source-backed claims that answer concrete questions; record quotas and catalogue
   expansion must not substitute for a usable research product.

The [research spines](project-positioning.md#flagship-research-spines) are current
strategic directions, not finished products. Alongside governance, deepen the
documented history of human thought, institutions and disagreement around machine
intelligence without inferred ideological classification. Retain the bounded
Chinese collection as the start of enduring Chinese frontier-AI institutional
history, preserving distinct organizations, researchers and original-language
expressions.

The corpus and its research semantics are the durable asset. The graph is one
interface, with no obligation to compete visually with adjacent network projects;
reduce or omit graph functionality if it does not improve historical understanding.

Major work should make Selekoa materially deeper as documentary history or
materially more useful to a researcher. Generic infrastructure, preparatory reports
and repetitive audits need a concrete deliverable or failure to address. Required
[machine-first editorial QA](editorial-policy.md) remains part of research: passage
checks, version/date qualification, reproducible validation and bounded fresh-context
random/targeted audits. Human curation and high-reliance verification remain separate.

Upstream candidate imports require a defined historical question, terms/version
checks and separately authorized admission. Historical knowledge/as-of queries,
monitoring and an API remain potential later work. Event dates alone cannot
establish when a fact became knowable. Deployment, publication, visibility changes
and paid infrastructure require separate decisions.

### Next steps

- Citation export (BibTeX, RIS, CSL-JSON and Copy APA) uses the structured author
  names of schema 2.14. Open: six sources without them (unsigned, anonymous, edited or
  unnamed contributors), two group credits that hide named chairs, and an editor role
  for edited books; see `review/citation-authors-2026-10-15.md`.

### Parked work

- **Christiano institutional episode:** re-verified on 2026-10-15; the 2017 OpenAI author
  affiliation and the 2024 U.S. AI Safety Institute appointment announcement are now
  records. The 2013 MIRI listing waits for one successful retrieval of its Wayback
  capture ([record](../review/christiano-episode-admission-2026-10-15.md)). The old
  branch `codex/christiano-institutional-episode` was not merged; the maintainer
  deletes it.
- **Capital/compute pack:** Audit B's 13 RESEARCH MORE items were re-checked against
  their primary sources on 2026-10-15; all 13 are supported and remain machine-checked
  seeds ([record](../review/capital-compute-research-more-2026-10-15.md)). Open: replace
  the relay-read OpenAI–Oracle page with a dated capture; editorial acceptance is a
  separate human decision.
- **Yudkowsky corpus follow-ups:** both cross-family checks (the engagement backfill
  and the seven overridden adjudications) have run, and the maintainer's dispositions
  were applied on 2026-10-17 ([record](../review/cross-family-dispositions-2026-10-17.md)).
  The same test, applied on 2026-10-17 to the Y24 record that had become earliest
  located, left Y24 with no articulation ([record](../review/y24-followup-2026-10-17.md)).
  Open: four leads listed in the dispositions record as candidates.
- **Economics follow-ups (admissions of 2026-10-14 and 2026-10-16):** the esoteric
  strand is admitted; re-read its 17 admitted Wayback passages when web.archive.org
  answers (they rest on the GPT check of 2026-10-15), and decide whether to raise
  the quotation room for Hanson's 1998 comment, which held back three passages (see
  the [esoteric admission record](../review/esoteric-admission-2026-10-16.md)); read
  The Age of Em, Average Is Over and Puhakka's 3/2024 KAK editorial; read Simon (1965) and the 1931 JPE review; compare
  Acemoglu's journal version; decide the G06 wording; re-check the Davidson and
  Roodman passages when the Wayback Machine answers; decide whether the KAK list
  becomes records (see the
  [admission record](../review/economics-admission-2026-10-14.md)).
  Re-check corrections applied on 2026-10-25 (schema 2.16, dataset v0.7.0;
  [record](../review/recheck-corrections-2026-10-25.md)). Open from them: check
  Hanson's "Long-Term Growth As A Sequence of Exponential Modes" for the withheld
  tier-1 G09 role; Leontief (1982) for M05; a source-selection rule for institutional
  forecasts (M08); a key for the audit letters in economics qualifications; the stale
  retrieval note on Davidson's G06 record; re-read the passages added from captures
  when web.archive.org answers.
