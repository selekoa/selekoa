# Data qualifications that conflict with the style guide

Prepared 2026-10-04 on branch `reader-voice` against
[docs/style-guide.md](../docs/style-guide.md). Nothing here has been applied.
Claims, qualifications, evidence passages and quotes are data records; changing
them needs a separately authorised pass under the
[editorial policy](../docs/editorial-policy.md), with the reason recorded in
Git and claim IDs kept stable.

Selection method: every one of the 627 qualifications in `data/claims.json` was
scored for internal jargon (expression, scoped, work-level, keyed, edge, node,
literal, stop list, pass), stacked negations, semicolon chains, em-dashes and
sentence length, then reviewed by hand. No qualification uses the banned words
(crucially, notably, delve, landscape, robust, nuanced and similar). The main
problems are templated jargon repeated across many records and editorial or
interface notes that leaked into reader text.

Templated wording is listed once, as a family, with its record count. The
proposed wording is a starting point. Every rewrite must keep the original
scope, date basis and attribution, and must be checked against the record's
evidence before it is applied.

## Templated families

### 1. Framework provisions: "cited expression" (152 records, `prov-*`)

Current: "What the edition states, quoted from the cited expression. It is not
evidence of implementation, compliance or effectiveness."

Issue: "expression" is internal (a specific textual version). The sentence is
repeated on every provision row.

Proposed: "Quoted from the cited version of this edition. It records what the
text says and is not evidence of implementation, compliance or effect."

### 2. California SB 53 provisions: "chaptered expression" (19 records, `sb-*`)

Current opening: "What the enacted text states, quoted from the chaptered
expression. It is not evidence that the statute applies to any named
developer, or of compliance, enforcement or effect."

Issue: "chaptered expression" is jargon, and "or of compliance" reads awkwardly.
The family also restates this opening before long record-specific text, which
buries the record-specific limit.

Proposed opening: "Quoted from the statute as chaptered. It records what the
law says. It is not evidence that the law applies to any named developer, or
that anyone complied with it, enforced it or was affected by it."

### 3. Edition issue records: "public document expression" (20 records, `issued-*`)

Current: "Publication means a public document expression exists. The date is
labelled effective; publication is not evidence that its requirements were
implemented or effective in practice."

Issue: jargon, and "labelled effective" is opaque. Variants say
`publication` or `revision`.

Proposed: "This record shows that a public version of the document exists. The
date shown is its effective date. Publication does not show that the
requirements were implemented or worked in practice." (Substitute publication
or revision date as stored.)

### 4. Provision changes: "keyed provision" (29 records, `provchange-*`)

Current: "A textual difference between the two editions’ wording of this keyed
provision. It is not an assessment of whether the change strengthened or
weakened the framework, and not evidence of implementation."

Issue: "keyed provision" is internal; two stacked negations.

Proposed: "The two editions word this provision differently. The record does
not judge whether the change strengthened or weakened the framework. It is not
evidence of implementation."

### 5. Recorded absences (20 records, `absent-*`)

Current: "A recorded absence within the stated scope: not a claim that the
provision was deleted, and not a statement about practice or intent."

Issue: noun-phrase fragment after a colon, stacked negations, "stated scope"
without saying where the scope is stated.

Proposed: "The provision was not found in the part of the edition named in the
locator. This is not a claim that it was deleted, and it says nothing about
practice or intent."

### 6. Lineage citations: "work-level reference" (12 records)

`lineage-scaling-cites-batch`, `lineage-scaling-cites-attention`,
`lineage-chinchilla-cites-scaling`, `lineage-ppo-cites-trpo`,
`lineage-ppo-cites-adam`, `lineage-attention-cites-adam`,
`lineage-preferences-cites-trpo`, `lineage-summaries-cites-preferences`,
`lineage-summaries-cites-ppo`, `lineage-instruct-cites-summaries`,
`lineage-instruct-cites-ppo`, `lineage-instruct-cites-preferences`.

Current opening: "An explicit work-level reference only; neither agreement nor
a causal influence claim. The citing text does not identify a particular arXiv
revision of the target."

Issue: "work-level" and "target" are internal; the first sentence is a
fragment.

Proposed: "The citing paper refers to this work explicitly. A citation does not
show agreement or influence. The citing text does not say which arXiv revision
of the cited work it used."

### 7. Lineage II citations (11 records, `lineage-ii-*-cites-*`)

Current opening: "Work-level citation; the cited revision is unspecified. Does
not establish agreement, causal influence, implementation or institutional
adoption."

Issue: same jargon, subjectless fragments.

Proposed: "The citing paper refers to this work without naming a revision. A
citation does not show agreement, influence, implementation or adoption by an
institution."

### 8. Policy changes: "scoped change" (5 records)

`rsp-v2-asl-meaning`, `rsp-v2-1-rd-thresholds`, `rsp-v3-2-reviewer-approval`,
`fsf-v3-1-cbrn-tcls`, `pf-v2-research-categories`.

Current: "This is a scoped change in the policy text. It does not establish
implementation, compliance, risk reduction or a comparative safety ranking."

Proposed: "The record covers this one change in the policy text. It does not
show implementation, compliance, reduced risk or that one developer is safer
than another."

### 9. Graph vocabulary: "edge" and "node" (12 records)

`anthropic-rsp-2023` ("not represented by this node"),
`karpathy-brain-intern-2011`, `karpathy-deepmind-intern-2015` ("no mentorship
or influence edge inferred"), `karpathy-openai-return-2023-2024` ("transfer
edge"), `leike-deepmind-alignment-prior` ("transfer edge"),
`atlas-feedback-credits-openai` ("inferred influence edge"),
`lineage-ppo-cites-trpo` ("this edge does not equate PPO with TRPO"),
`lineage-iem-credits-good` ("the existing citation edge"),
`lineage-ii-weak-cites-amplification`, `-debate`, `-reward`, `-critique` ("no
method-use edge is justified").

Issue: "edge" and "node" describe the graph, not the history. Readers of a
person page or a document page never see an edge.

Proposed pattern: replace "no influence edge inferred" with "No influence is
inferred", "this node" with "this record", and "the existing citation edge"
with "the separate citation record".

## Individual records

### 10. `xai-round-total-2024`

Current: "This is the total announced round, not valuation, realised spending,
or an individual investor’s contribution. Literal claims appear in the
inspector and timeline, without invented graph nodes."

Issue: the second sentence is an interface note, not a qualification of the
claim.

Proposed: keep the first sentence; delete the second.

### 11. `anthropic-google-capacity-2026` and `anthropic-broadcom-capacity-2026`

Current: "One joint agreement with Google and Broadcom, represented by two
counterparty edges; do not add their capacities. Responsibility split, exact
quantity, spend and ownership are not disclosed."

Issue: graph jargon and an instruction to editors ("do not add").

Proposed: "One joint agreement with Google and Broadcom, recorded once for each
company. Both records describe the same capacity, so their figures cannot be
added. The split of responsibilities, the exact quantity, the spend and
ownership are not disclosed."

### 12. `capital-ii-openai-multicloud-2026`

Current: "Party description of amended terms; not evidence that all products
were deployed elsewhere. Does not cancel other Azure commitments. Retrieved
page is mutable; historical expression is not independently authenticated."

Issue: telegraphic fragments; "historical expression is not independently
authenticated" is jargon.

Proposed: "A description of the amended terms by one of the parties. It is not
evidence that all products were deployed elsewhere, and it does not cancel
other Azure commitments. The page can change, and its earlier wording has not
been independently confirmed." Check against the evidence that "does not
cancel" refers to the amended terms before applying.

### 13. `abilene-nvidia-gb200-2025`

Current: "Delivery report, not a rack count, direct NVIDIA purchase or
ownership claim; use of the supplier relation is scoped to equipment arriving
at the asset."

Issue: fragment, and "use of the supplier relation is scoped to" describes the
data model.

Proposed: "A report of deliveries. It does not give a rack count or show a
direct purchase from NVIDIA or ownership. The supplier link covers only
equipment arriving at this site."

### 14. `lineage-ii-openai-published-weak`

Current: "Publisher’s attribution of programme output. Mutable expression
displaying 2023-12-14, not authenticated wording from that day; not
independent verification of results or derivation from Good/MIRI."

Issue: "mutable expression" and "authenticated wording" are jargon; semicolon
chain.

Proposed: "The publisher attributes this work to the programme. The page shows
the date 2023-12-14, but its wording on that day has not been confirmed. The
record does not verify the results or show that the work derives from Good or
MIRI."

### 15. `rsp-credits-arc-2023`

Current (second half): "Internet Archive captures of the announcement’s
original address show the acknowledgement paragraph absent at 14:15 and 16:17
UTC on 2023-09-19 and present from about 20:15 UTC: the credit was added within
hours of first publication and is not in the earliest captured text. Timing
qualification added 2026-10-03."

Issue: a 43-word sentence joined by a colon, and an editorial log line ("Timing
qualification added") in reader text. The date of the change belongs in Git.

Proposed: "Internet Archive captures of the announcement’s original address show
no acknowledgement paragraph at 14:15 and 16:17 UTC on 2023-09-19. The
paragraph appears from about 20:15 UTC. The credit was therefore added within
hours of first publication and is not in the earliest captured text."

### 16. `sb-link-faif-2025`

Issue: the qualification carries maintainer notes: "legal questions left to the
stop list", "complements the existing record … and does not duplicate it", and
"the overlap counts against this document's quotation budget". It also says
twice that the statement is not evidence of compliance.

Proposed: keep the attribution, the compliance limit (once) and the footnote
note. Replace "left to the stop list" with "set aside as questions of legal
interpretation". Move the duplication and quotation-budget notes to the
evidence note or the Git record.

### 17. `sb-anthropic-fcf-published`

Issue: "not inspected in this pass" refers to internal workflow; seven
negations in 112 words, including two near-identical statements that the
designation does not show compliance.

Proposed: replace "in this pass" with "for this record"; state the compliance
limit once.

### 18. `rsp-v3-0-assessed-weakening`

Issue: 283 words. The qualification retells every side of the assessment,
which the evidence passages already carry, and opens with "Unresolved open
question, not a finding". A reader has to read a long paragraph to find the
record's own limit.

Proposed: keep the limit and the list of sides in two or three short sentences
("Unresolved. The sources agree on the main textual changes but not on whether
the new mechanisms compensate. Each assessment is context; the record does not
decide the question.") and leave the attributed positions to the evidence
records. This needs the different-model check required for assessment records
before it is applied.

### 19. `assessed-preparedness-v2-high-deployment-mitigation`

Issue: a 43-word second sentence and two semicolon chains in a contested
record, where the two positions should be easiest to tell apart.

Proposed: one sentence per side, attributed: "Coggins et al. read …", "OpenAI's
Version 2 announcement states …", then the limit. Wording of each side must stay
as close to the evidence as it is now. This also needs the different-model
check before it is applied.

### 20. `risks-discusses-deception-2021`

Current: "The paper was first submitted in 2019, but this claim is scoped to
the inspected 2021 HTML version. No earliest-use claim is made."

Issue: "scoped to the inspected" and "earliest-use claim" are internal phrasing.

Proposed: "The paper was first submitted in 2019. This record covers only the
2021 HTML version that was checked, and it does not claim that the paper was
the first to use the term."

## Also noted, outside qualifications

Entity descriptions are data records too and show the same jargon on person
and document pages. For example, `human-preferences-paper` opens with
"Work-level identity. Evidence is scoped to the inspected arXiv v1
expression". A later pass could review descriptions with the same method.
