# Roadmap

## Current foundation

Selekoa is a source-critical institutional memory and research base for machine
intelligence. “The biography of machine intelligence” remains the north star;
a substantial historical encyclopedia is the longer-term ambition. Machine-first
research supplies a sourced, inspectable, qualified bootstrap layer for academic
research, serious journalism, books, policy research and historical investigation.
Exploratory records remain distinct from human-curated interpretations; neither
machine agreement nor presentation is editorial acceptance.

Current counts are not copied here: the [development notes](development.md#research-sample) carries a
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
original baselines. See [development notes](development.md) for commands and
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
  ([app proposal](../research/lab-genealogy/app-proposal.md)). The five records held
  back for Adept's launch post were admitted on 2026-10-26
  ([record](../review/archive-admissions-2026-10-26.md)).

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
repository (`LICENSE`, `LICENSE-DATA.txt`, `LICENSING.md`). The site launched on
2026-10-26 at https://selekoa.org. Launch preparation, hosting and routine steps are in
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
- **Publication route:** a separate GitHub organisation holds the public repository
  `selekoa/selekoa`, with fresh history and snapshot commits only
  ([publishing](publishing.md)). This private repository and its history are not made
  public.
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

## Findability and scaling (decided 2026-10-27)

An external test on 2026-10-27 found that search engines and LLM/agent tools see only
the start page: every page is a hash route rendered in the browser.

1. **Phase 1, data at stable URLs:** the current release's files under `/data/`,
   an `llms.txt`, both in the sitemap.
2. **Phase 2, pre-rendered pages:** real paths (`/person/…`, `/document/…`,
   `/dossier/…`, `/claim/…`, collections and hubs), each built as plain HTML with its
   text present without scripts, listed in the sitemap; old `#/…` addresses redirect.
   Covers every existing record, not only new ones. Design constraint: URLs and page
   templates must be renderable by the same code either at build time or on request,
   so phase 3 changes nothing for readers or links.
   **Status (2026-10-27): built on branch `prerender-pages`, awaiting review and
   merge.** Every page type has a path; the build renders the app's own React
   components for every page with a renderer that runs in Node or a worker; the
   browser hydrates the built HTML; old hash links redirect; the sitemap lists every
   page. Design, URL scheme, sizes and open questions:
   [review/prerender-pages-2026-10-27.md](../review/prerender-pages-2026-10-27.md).
3. **Phase 3, on-demand rendering (when needed):** a Cloudflare Worker renders a page
   on its first request from the release data and caches it at the edge; search moves
   to the server (a database with full-text search, or a chunked static index).
   **Triggers:** about 10,000 pre-rendered pages, builds slow enough to hinder
   work, a deployment approaching the host's file limit (20,000 files per deployment
   on the free Pages plan), or the browser data bundle (about 6 MB in October 2026)
   becoming too heavy for phones. Check these at each dataset release.
   Data loading plan (measured 2026-10-30), a staged split before the pending packs:
   [data-loading-plan.md](data-loading-plan.md).

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
Chinese collections (the first of 2026-09-29 and the second of 2026-10-27) as the
start of enduring Chinese frontier-AI institutional history, preserving distinct
organizations, researchers and original-language expressions. StepFun, 01.AI and
Tencent Hunyuan were deferred from the second collection; the second collection's
open leads are in its [admission record](../review/china-labs-2-admission-2026-10-27.md#open-leads).

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

- Explorer map speed (maintainer decision, 2026-10-31): the map computes a
  layout of the whole dataset on the main thread before its first draw, at a cost
  that grows roughly with the square of the number of entities: about 14 s on
  `main` before the admissions of 2026-10-31 and about 20.5 s with the key papers
  admission, during which the page does not respond. Compute the layout at build
  time or in a Web Worker. Two map browser specs pass on an idle machine and time
  out under load until then.
- After the large admissions (maintainer note, 2026-10-31): rerun the 20 reader
  tasks (`review/reader-tasks-2026-10-29.md`) and the consistency audit
  (`pnpm audit:consistency`) on the grown dataset, and fix what they find.
- Citation export (BibTeX, RIS, CSL-JSON and Copy APA) uses the structured author
  names of schema 2.14. Open: six sources without them (unsigned, anonymous, edited or
  unnamed contributors), two group credits that hide named chairs, and an editor role
  for edited books; see `review/citation-authors-2026-10-15.md`.

### Interface work after the admissions (maintainer order, 2026-11-01)

Start once every current admission is on the live site. Items 1, 2 and 3 come
before any public mention of Selekoa.

**Items 1–3 done** on branch `prelaunch-interface` (2026-11-01), with the two
further maintainer decisions of 2026-11-01 recorded under item 3 below; see
[the review record](../review/prelaunch-interface-2026-11-01.md).

1. **Done (2026-11-01).** **Compare frameworks** (`/compare/frontier-safety-frameworks`). At 1440 px the
   table is 1,848 px wide inside a 748 px column. The question column and the
   framework headers scroll away with it.
   - Give the table the page width. Keep the question column and the framework
     headers in place while scrolling. Open the cell panel as a drawer only when a
     cell is inspected.
   - Add two ways to read it. **One question:** a single question, with every
     framework listed down the page and a link of its own. **Side by side:** two or
     three chosen frameworks as columns.
   - Offer a CSV download with one row per cell: framework, edition, question,
     status, the quotation or the marked paraphrase, page, source URL, date checked
     and the search notes for "not found". Build it from the same data as the page,
     and add a test that the two match.
   - Optional, and last: a landscape print style.
2. **Done (2026-11-01).** **Start page: a "Ways in" panel** directly under the search box.
   - It holds the "for example" questions, Compare frameworks, Browse by year, the
     map and Explore the records. It replaces the "For example" block and the
     separate year line.
   - Give tools (things a reader operates: comparison, years, map, explorer) one
     visual style, used the same way wherever a tool appears. Keep it distinct from
     readings (questions and guides).
   - Do not use square brackets as the marker: on this site they mark an editor's
     insertion in a quotation.
   - The start page title ("A documentary history of machine intelligence.") breaks
     before its last word on a laptop. Fix the size, measure or wrapping (for example
     `text-wrap: balance`) so that no line holds a single word, and check it at phone,
     laptop and desktop widths.
3. **Done (2026-11-01).** **About, start-page wording and review status** (maintainer decision, 2026-11-01).
   This item, like items 1 and 2, comes before any public mention.
   - **Start page introduction** (it replaces the current paragraph; the title line
     stays): "Selekoa is a documentary history of machine intelligence and of human
     thought about it. Machines built it: they find the sources, quote them and
     check each other's work, and every statement links to the passage it rests on.
     What they leave to **you** is the _human part_: the question, the point of
     view, the stance." Set "you" in bold and "human part" in italics.
   - **About, a new opening section, "Why machine-first",** signed "the maintainer"
     until the maintainer chooses to give a name. Text: "Selekoa tests a method:
     let machines do the research bootstrapping — finding, quoting, dating and
     cross-checking sources at a scale no single researcher could — and keep for
     people what machines can't decide for them. I think this changes how research
     is done. Collecting and checking sources used to take most of a researcher's
     time. When machines do much of that, what remains is the part they can't do for you,
     and it matters more than before: deciding what to ask, and from where. The same
     records could support a poststructuralist, decolonial futures-studies article
     or an accelerationist manifesto. **Selekoa doesn't choose between them.** It
     tries to make sure both argue from the same sources, which anyone can check.
     Choosing the standpoint is the human part of the work, and Selekoa leaves it
     to you." The bold is the maintainer's. The maintainer may still edit the text.
   - **About, on the choice of collections:** "The collections are not a survey of
     the field. They follow the maintainer's own research interests, so the
     selection is partly arbitrary, and its gaps say more about one person's
     curiosity than about what matters. Suggestions for new collections or projects
     are welcome; a good one may well become the next collection." Suggestions go
     to `maintainer@selekoa.org`, the address in `site.config.json` (maintainer
     decision, 2026-11-01). Today it appears only in About's corrections and
     rights paragraph and in `llms.txt`. Show it in this section and in the site
     footer, both read from `site.config.json`, never hard-coded. The public
     repository's issues may be offered as a second route if they are open.
   - **Review status.** Remove the "not yet human-reviewed" framing; it implies a
     review stage that is not planned.
     - The banner "Records found and checked by machines, not reviewed by an
       editor" becomes "Found and cross-checked by machines · How this works →".
     - Drop the per-page "machine-proposed" and "No human review of the selection
       or framing is recorded" notices.
     - About keeps one plain disclosure: "No person reads every record before
       publication. The maintainer sets the rules, reviews every batch of changes
       and decides what is admitted."
     - The `editorialStatus` field stays in the data; changing its values would
       be a schema change, and released datasets carry it.
     - Update the editorial policy, the style guide and `llms.txt` to match.
     - Drop human acceptance as a planned stage; editorial acceptance of single
       records is no longer a goal.
     - Earlier records and review notes keep their wording as history.
   - **About, a final paragraph for "Why machine-first"** (maintainer's addition,
     2026-11-01): "Selekoa does not replace library research. Most scholarly
     literature is still in subscription databases and publisher archives
     (Scopus, Web of Science, JSTOR and others, which now have AI tools of their
     own), and the machines that build Selekoa cannot get behind their paywalls.
     Selekoa uses openly available material: company and government documents,
     archived web pages, open-access papers and preprints, forums and blogs. For
     much of the recent history of AI, that material is the primary record. For
     questions that depend on paywalled scholarship, Selekoa is meant to
     complement the usual databases."
   - **Done (maintainer decision, 2026-11-01): "How this was built" merged into
     About** as its own section after "Why machine-first", with the maintainer's
     text and a short account of the pipeline (pack, cross-family check,
     adjudication, admission, review, merge) linking the operating guide in the
     public source repository. Sentences found inaccurate against the
     repository are reported in the review record with proposed corrections,
     not reworded.
   - **Done (maintainer decision, 2026-11-01): caveats trimmed on entry pages**
     (the start page, the three hubs, Compare frameworks, Browse by year, the
     explorer): at most one plain caveat line per section, the full wording one
     click away. Record, claim and evidence pages keep every qualification.
4. **Lab control timelines side by side.** Show the board, ownership and control
   changes of OpenAI, Anthropic, Google DeepMind and xAI on one shared time axis,
   from the existing control-structure records. This is design work, not new
   research.
5. **Propositions by thinker** (the maintainer's next choice). For each proposition,
   who articulated or contested it, and when, from the stored stances. It comes
   after the heterodox pack is admitted.
6. Less urgent:
   - **Laws compared:** laws as rows, questions as columns (scope and threshold,
     duties, start dates, penalties, enforcing body). This needs a research pack
     with a cross-family check, and every cell must quote the law.
   - **Commitments by developer:** who signed which external commitment, when and
     in which edition. A signature is never compliance.

### Next collections (maintainer order, 2026-11-02)

Recorded after launch. Quality work comes first: apply the absence-claims sweep ([brief 08](briefs/08-absence-sweep-apply.md)) and settle the headlines under re-check ([brief 09](briefs/09-recheck-remaining.md)).

**Most valuable**

1. **Model cards compared** (the maintainer's first choice). For each frontier model release with a published system or model card, what the card discloses about dangerous-capability evaluations, external testing, framework threshold determinations and safeguards, on the same questions, in the format of Compare frameworks. Every cell quotes the card or records a stated search. Evaluations are recorded at policy level only.
2. **Laws compared.** Admitted with its page at release 0.30.0 ([admission record](../review/laws-compared-admission-2-2026-11-05.md)); the jurisdictions not yet read (Korea first) are a later pack.
3. Release DOIs (Zenodo), later, as a maintainer decision.

**Most interesting**, in this order:

1. **Pre-history:** antecedent texts on machine intelligence before the modern record (Butler, Lovelace, Turing, Wiener, von Neumann and Ulam, Lem), as their own collection, so other collections need not stretch their periods. Cosmism and the cybernetics strands only where a text explicitly concerns machine intelligence.
2. **AI and money:** what central banks, the BIS, the IMF, the FSB and supervisors have said about machine intelligence in payments, monetary policy, financial stability and supervision.
3. **A dated record of AI predictions:** admitted with its page as "Predictions on record" at release 0.31.0 ([admission record](../review/predictions-admission-2026-11-05.md)). The leads it lists (Simon 1965, Minsky 1967, _Life_ 1970, Michie in _Nature_ 1973, Kurzweil's books) wait for readable copies.
4. Possibly later: Finland and the Nordics in AI governance.

### Backlog

- **AGI term provenance:** earliest located uses of 'artificial general intelligence' /
  'AGI' (candidate leads: Gubrud 1997; Goertzel and Pennachin (eds.) 2007, _Artificial
  General Intelligence_; Goertzel's account of Shane Legg suggesting the term).
  Admitting a Goertzel text gives him a person record; Shane Legg needs one too.
  Wording: earliest located, never first.
- **(B, next in line) Compute, power and orbit:** the documented build-out of AI
  compute — data-centre projects, power deals, chip supply, and orbital compute plans
  and the arguments for them (announced stays announced; arguments as propositions
  with earliest located sources).
- **(C) AI and biosecurity:** how frameworks treat biological risk, published
  bio-uplift evaluations, gene-synthesis screening rules and government measures.
- **Kinds of AI and technical history:** the families of machine intelligence (not
  only large language models) and a technical timeline, as a documentary subproject.
- **Key papers and publications on AI (maintainer note, 2026-10-28).** Papers and
  other publications that the record's own documents rely on — the quintessential
  example is “Attention Is All You Need” (2017). Belongs mainly to the
  technical-history strand, with links into the thought spine where a paper shaped a
  debate. Selection needs a stated basis that is not a judgement of importance (for
  example: cited by dataset documents or frameworks, or a stated citation count with
  its date and source); record what a paper states and its publication facts, never
  “first” or “landmark”.
- **AI in mathematics and science (maintainer note, 2026-10-30).** AI in biology
  is the first part (candidate pack on `ai-in-biology-pack`). Widen later to
  mathematics (theorem provers, formal proof assistants, AI-assisted results),
  physics, chemistry, materials, climate and astronomy, and to AI in space
  exploration and Earth observation, as one "AI in science" strand: institutions,
  models and papers, people, and attributed claims with their earliest located texts.
- **ASI in fiction (maintainer note, 2026-10-28; low priority).** Depictions of
  superintelligent machines in fiction, recorded as documents and what they state,
  with links into the thought spine only where a dataset document cites a work.

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
  Data fixes of 2026-10-26 (dataset v0.7.1;
  [record](../review/data-fixes-2026-10-26.md)). Open from them: a person-page
  date line that does not say which source it dates (UI).
  Archive admissions of 2026-10-26 (dataset v0.7.2;
  [record](../review/archive-admissions-2026-10-26.md)): the five held-back Adept
  records and the Stargate capacity quotation. Versioning rule revised the same day
  (patch for small additions within existing collections).
