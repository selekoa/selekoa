# Conceptual provenance II: complete evidence appendix

Collection conceptual-provenance-ii, version 2; checked 2026-09-28. Fingerprint: sha256:e32152b0089ee10672552d7af38386001419f88a7382a0fae8ea243255691fb3.

Exploratory machine research; not editorially accepted. Human review is not recorded.

- Exploratory machine research, not editorially accepted; all human decisions remain blank.
- No atlas admission, deployment, publication or visibility change.
- Pinned source-integrity baseline and conceptual-provenance-i v1 remain unchanged.
- Private upstream has no tracked reuse licence; this private increment authorizes no redistribution.
- Generation reproduces frozen research assessments and inventories; it does not reproduce historical truth or require live network responses.

## Provenance and inherited history

Parent: conceptual-provenance-i v1 at 51a6db70555d5d1ebf4d9855043b0e3ed9c99482; fingerprint sha256:2cda4362df4062c9bc0cda6ce322e26e1efd20c1c1e90928e8eface47d543faf. Upstream: 54c62fc426d7b6ae008fd6acd3f53a0b993248ac. The parent collection remains byte-for-byte unchanged. Original records, evidence, source IDs and packet mappings are embedded without rewriting in collection.json under inherited. The corrections below are proposals against that baseline, not modifications to source-integrity.

## Findings and evidence

### CP2-F01 — PCR-010

Investigated proposition: **The currently retrieved arXiv v1 abstract attributes introduction of the term mesa-optimization to the paper’s authors.**

Machine resolution: supported; derivation: explicit. Admission: research_only; human review: not_recorded.

Qualification: This authenticates the currently served version’s wording, not independent historical priority. v3 repeats the substantive assertion.

#### CP2-E01

[Risks from Learned Optimization — currently served v1 PDF](https://arxiv.org/pdf/1906.01820v1) — arxiv-v1-pdf; 1906.01820v1.

Locator: PDF physical/printed page 1, Abstract.

**Paraphrase:** The authors describe mesa-optimization and explicitly present its name as their newly introduced term.

Relationship to this proposition: supports. Source role: Primary for the scoped source statement or retrieval observation; not independent proof of priority.

Checked 2026-09-28 by Selekoa investigation agent; machine_checked; human review not_recorded.

Expression limits: 39 pages. First page visually inspected. Current bytes differ in date function from original submission dating; no original 2019 PDF capture obtained.

#### CP2-E02

[Risks from Learned Optimization — v3 PDF](https://arxiv.org/pdf/1906.01820v3) — arxiv-v3-pdf; 1906.01820v3.

Locator: PDF physical/printed page 1, Abstract.

**Paraphrase:** The v3 abstract repeats the same substantive introduction claim; it is a distinct later expression.

Relationship to this proposition: context. Source role: Primary for the scoped source statement or retrieval observation; not independent proof of priority.

Checked 2026-09-28 by Selekoa investigation agent; machine_checked; human review not_recorded.

Expression limits: 39 pages. First page visually inspected. Same substantive abstract self-attribution as v1; distinct version and bytes.

#### CP2-E03

[Risks from Learned Optimization — v1 TeX archive](https://arxiv.org/src/1906.01820v1) — arxiv-v1-source; 1906.01820v1.

Locator: inner_optimization.tex lines 103–104, abstract.

**Paraphrase:** The source abstract contains the same authorial introduction wording.

Relationship to this proposition: supports. Source role: Primary for the scoped source statement or retrieval observation; not independent proof of priority.

Checked 2026-09-28 by Selekoa investigation agent; machine_checked; human review not_recorded.

Expression limits: Gzip tar inspected in memory. Source line numbers refer to inner_optimization.tex. No compilation log or historical source capture obtained.

### CP2-F02 — PCR-010

Investigated proposition: **The 2022 date displayed by the currently served v1 PDF is consistent with later typesetting rather than a 2022 initial submission.**

Machine resolution: supported; derivation: inferred. Admission: research_only; human review: not_recorded.

Qualification: Compilation-dependent source date and creation metadata explain the discrepancy plausibly. No compilation log or original 2019 PDF proves the precise regeneration history. Submission, title and file dates remain separate.

Inference premises and rationale:

- Version-specific arXiv submission metadata
- Compilation-dependent TeX date
- Current PDF title and creation metadata agreement

#### CP2-E04

[Risks from Learned Optimization — v1 metadata](https://arxiv.org/abs/1906.01820v1) — arxiv-v1; 1906.01820v1.

Locator: Submission history [v1] and [v2].

**Paraphrase:** arXiv dates v1 to 5 June 2019 and v2 to 11 June 2019.

Relationship to this proposition: supports. Source role: Primary for the scoped source statement or retrieval observation; not independent proof of priority.

Checked 2026-09-28 by Selekoa investigation agent; machine_checked; human review not_recorded.

Expression limits: Live version-specific metadata, not an authenticated 2019 capture. History lists v1, v2 and v3 only.

#### CP2-E05

[Risks from Learned Optimization — currently served v1 PDF](https://arxiv.org/pdf/1906.01820v1) — arxiv-v1-pdf; 1906.01820v1.

Locator: Page 1 date/stamp; PDF metadata CreationDate and ModDate.

**Paraphrase:** Title date is 24 March 2022, side stamp identifies v1 on 5 June 2019, and file metadata records 24 March 2022.

Relationship to this proposition: supports. Source role: Primary for the scoped source statement or retrieval observation; not independent proof of priority.

Checked 2026-09-28 by Selekoa investigation agent; machine_checked; human review not_recorded.

Expression limits: 39 pages. First page visually inspected. Current bytes differ in date function from original submission dating; no original 2019 PDF capture obtained.

#### CP2-E06

[Risks from Learned Optimization — v1 TeX archive](https://arxiv.org/src/1906.01820v1) — arxiv-v1-source; 1906.01820v1.

Locator: inner_optimization.tex line 90; line 101 maketitle.

**Paraphrase:** The date command uses the compilation-day macro today before the title is typeset.

Relationship to this proposition: supports. Source role: Primary for the scoped source statement or retrieval observation; not independent proof of priority.

Checked 2026-09-28 by Selekoa investigation agent; machine_checked; human review not_recorded.

Expression limits: Gzip tar inspected in memory. Source line numbers refer to inner_optimization.tex. No compilation log or historical source capture obtained.

### CP2-F03 — PCR-010

Investigated proposition: **The upstream catalog’s alleged arXiv v4 supports the recorded abstract wording.**

Machine resolution: unresolved; derivation: explicit. Admission: research_only; human review: not_recorded.

Qualification: No v4 expression was obtained. Both paths fail and current history ends at v3. Treat v4 as an unsubstantiated catalog identity; do not fabricate a comparison or infer historical nonexistence.

#### CP2-E07

[Alleged arXiv v4 metadata path](https://arxiv.org/abs/1906.01820v4) — arxiv-v4; unidentified alleged v4.

Locator: HTTP status and Article not found body.

**Paraphrase:** The metadata request returns 404.

Relationship to this proposition: context. Source role: Primary for the scoped source statement or retrieval observation; not independent proof of priority.

Checked 2026-09-28 by Selekoa investigation agent; machine_checked; human review not_recorded.

Expression limits: HTTP 404 Article not found. No v4 expression authenticated; no claim of historical nonexistence from failure alone.

#### CP2-E08

[Alleged arXiv v4 PDF path](https://arxiv.org/pdf/1906.01820v4) — arxiv-v4-pdf; unidentified alleged v4.

Locator: HTTP status.

**Paraphrase:** The PDF request returns 404.

Relationship to this proposition: context. Source role: Primary for the scoped source statement or retrieval observation; not independent proof of priority.

Checked 2026-09-28 by Selekoa investigation agent; machine_checked; human review not_recorded.

Expression limits: HTTP 404; response hash identifies failure bytes, not a paper.

#### CP2-E09

[Risks from Learned Optimization — v3 metadata](https://arxiv.org/abs/1906.01820v3) — arxiv-v3; 1906.01820v3.

Locator: Submission history.

**Paraphrase:** The current version history lists only v1, v2 and v3.

Relationship to this proposition: context. Source role: Primary for the scoped source statement or retrieval observation; not independent proof of priority.

Checked 2026-09-28 by Selekoa investigation agent; machine_checked; human review not_recorded.

Expression limits: Comparison expression, never substituted silently for alleged v4.

### CP2-F04 — PCR-028

Investigated proposition: **The originally cited post ID aW288uWABwTruBmgF identifies Soares’s Sharp Left Turn post.**

Machine resolution: contested; derivation: explicit. Admission: research_only; human review: not_recorded.

Qualification: The retained original proposition is contradicted by the retrieved wrong object. The conflicting catalog ID 7W8HqksjBXDcKkrD7 remains unidentified, not an alias proved by its slug.

#### CP2-E10

[EA Vegan Advocacy is not truthseeking, and it’s everyone’s problem](https://www.alignmentforum.org/posts/aW288uWABwTruBmgF/a-central-ai-alignment-problem-capabilities-generalization-and-the-sharp-left-turn) — af-wrong; aW288uWABwTruBmgF; current page.

Locator: HTML title, post byline and matching post object postedAt.

**Paraphrase:** The ID yields Elizabeth’s vegan advocacy post, with embedded postedAt 28 September 2023.

Relationship to this proposition: contradicts. Source role: Primary for the scoped source statement or retrieval observation; not independent proof of priority.

Checked 2026-09-28 by Selekoa investigation agent; machine_checked; human review not_recorded.

Expression limits: Elizabeth. Requested misleading Sharp Left Turn slug resolves by stable post ID to this unrelated object. Current page metadata, not a 2023 capture.

#### CP2-E11

[Unresolved alternate Alignment Forum identifier](https://www.alignmentforum.org/posts/7W8HqksjBXDcKkrD7/ea-vegan-advocacy-is-not-truthseeking) — af-other; 7W8HqksjBXDcKkrD7.

Locator: HTTP status.

**Paraphrase:** The alternate catalog ID returns 404; its past identity is unsettled.

Relationship to this proposition: context. Source role: Primary for the scoped source statement or retrieval observation; not independent proof of priority.

Checked 2026-09-28 by Selekoa investigation agent; machine_checked; human review not_recorded.

Expression limits: HTTP 404. Cannot identify historical or deleted object. Do not equate it with aW288uWABwTruBmgF.

### CP2-F05 — PCR-028

Investigated proposition: **GNhMPAWcfBCASy8e6 is the intended identifiable Sharp Left Turn expression by Nate Soares.**

Machine resolution: supported; derivation: inferred. Admission: research_only; human review: not_recorded.

Qualification: Title, opening self-attribution and relevant argument match the intended citation. Displayed publication is 15 June 2022. Original publication-day bytes and first use of the phrase remain unestablished.

Inference premises and rationale:

- Matching intended title
- Opening author attribution
- Matching argument and phrase

#### CP2-E12

[A central AI alignment problem: capabilities generalization, and the sharp left turn](https://www.alignmentforum.org/posts/GNhMPAWcfBCASy8e6/a-central-ai-alignment-problem-capabilities-generalization) — af-intended; GNhMPAWcfBCASy8e6; current page.

Locator: Title/byline/date; opening parenthetical; Discussion of a problem, paragraph beginning So, flatly summarizing.

**Paraphrase:** The page matches the intended title, identifies Nate Soares with help from Rob Bensinger, and describes capabilities generalizing while alignment fails to generalize.

Relationship to this proposition: supports. Source role: Primary for the scoped source statement or retrieval observation; not independent proof of priority.

Checked 2026-09-28 by Selekoa investigation agent; machine_checked; human review not_recorded.

Expression limits: By So8res; opening identifies Nate Soares and assistance/posting by Rob Bensinger. Mutable current expression, not an authenticated publication-day snapshot.

### CP2-F06 — PCR-002

Investigated proposition: **The current CEV institutional reprint attributes the work to 2004 and contains the exact full name.**

Machine resolution: supported; derivation: explicit. Admission: research_only; human review: not_recorded.

Qualification: Earliest bibliographically dated exact-name candidate found in this selected corpus: the work attributed to 2004, observed only in a later reprint. This is not an authenticated 2004 exact-name occurrence or an unrestricted first use.

#### CP2-E13

[Coherent Extrapolated Volition — institutional reprint](https://intelligence.org/files/CEV.pdf) — cev; current MIRI reprint.

Locator: Cover; Introduction printed p. 1 (physical p. 2); §3 printed p. 5 (physical p. 6).

**Paraphrase:** The cover attributes the work to 2004, the introduction dates the account to May 2004, and section 3 uses the full name.

Relationship to this proposition: supports. Source role: Primary for the scoped source statement or retrieval observation; not independent proof of priority.

Checked 2026-09-28 by Selekoa investigation agent; machine_checked; human review not_recorded.

Expression limits: 38 pages. Cover visually inspected. 2013 PDF metadata is not proof of public availability in 2013 or literal wording in 2004. No contemporary original obtained.

#### CP2-E14

[Coherent Extrapolated Volition — institutional reprint](https://intelligence.org/files/CEV.pdf) — cev; current MIRI reprint.

Locator: PDF metadata CreationDate; MIRI cover branding.

**Paraphrase:** The retrieved file was generated in 2013 according to metadata and presents later institutional branding; neither supplies a publication date for these bytes.

Relationship to this proposition: context. Source role: Primary for the scoped source statement or retrieval observation; not independent proof of priority.

Checked 2026-09-28 by Selekoa investigation agent; machine_checked; human review not_recorded.

Expression limits: 38 pages. Cover visually inspected. 2013 PDF metadata is not proof of public availability in 2013 or literal wording in 2004. No contemporary original obtained.

### CP2-F07 — PCR-002

Investigated proposition: **The exact term Coherent Extrapolated Volition had its first historical use in 2004.**

Machine resolution: unresolved; derivation: explicit. Admission: research_only; human review: not_recorded.

Qualification: No authenticated contemporary exact-name occurrence was found in the bounded 2001–2004 corpus. Zero matches in 355 subject-selected SL4 bodies is a screen result, not archive-wide absence. Reprint attribution cannot settle literal period wording or priority.

#### CP2-E15

[Coherent Extrapolated Volition — institutional reprint](https://intelligence.org/files/CEV.pdf) — cev; current MIRI reprint.

Locator: Cover and §3 printed p. 5.

**Paraphrase:** A later exact-name candidate attributes its underlying work to 2004.

Relationship to this proposition: context. Source role: Primary for the scoped source statement or retrieval observation; not independent proof of priority.

Checked 2026-09-28 by Selekoa investigation agent; machine_checked; human review not_recorded.

Expression limits: 38 pages. Cover visually inspected. 2013 PDF metadata is not proof of public availability in 2013 or literal wording in 2004. No contemporary original obtained.

#### CP2-E16

[FAI: Collective Volition — Yudkowsky announcement](http://sl4.org/archive/0405/8881.html) — sl4-0405-8881; current Hypermail rendering of message 8881.

Locator: Subject, date header and complete short announcement.

**Paraphrase:** The period-labelled announcement uses Collective Volition and links the unavailable wiki.

Relationship to this proposition: context. Source role: Primary for the scoped source statement or retrieval observation; not independent proof of priority.

Checked 2026-09-28 by Selekoa investigation agent; machine_checked; human review not_recorded.

Expression limits: Body links the CollectiveVolition wiki. Current archive rendering, no independent period capture. Header dates are not guaranteed send/receipt ordering.

#### CP2-E17

[CollectiveVolition wiki link exactly as announced](http://www.sl4.org/bin/wiki.pl?CollectiveVolition) — sl4-wiki-original; unretrieved.

Locator: HTTP status after redirect.

**Paraphrase:** The original linked wiki path returns 404.

Relationship to this proposition: context. Source role: Primary for the scoped source statement or retrieval observation; not independent proof of priority.

Checked 2026-09-28 by Selekoa investigation agent; machine_checked; human review not_recorded.

Expression limits: HTTP 404 after redirect from www.sl4.org. Historical content remains unavailable in this pass.

#### CP2-E18

[Bounded Wayback CDX query for CollectiveVolition](https://web.archive.org/cdx/search/cdx?url=sl4.org/wiki/CollectiveVolition&output=json&filter=statuscode:200&filter=mimetype:text/html&collapse=timestamp:6&from=2001&to=2004) — wayback-cv; query 2001–2004.

Locator: Bounded CDX query response.

**Paraphrase:** Archive query returns 503, leaving captures unknown.

Relationship to this proposition: context. Source role: Primary for the scoped source statement or retrieval observation; not independent proof of priority.

Checked 2026-09-28 by Selekoa investigation agent; machine_checked; human review not_recorded.

Expression limits: HTTP 503. This is a failed query, not a zero-capture result. No archive capture evidence established.

### CP2-F08 — PCR-002

Investigated proposition: **Creating Friendly AI 1.0 is an earlier conceptual candidate involving volition-based Friendliness.**

Machine resolution: supported; derivation: inferred. Admission: research_only; human review: not_recorded.

Qualification: Bibliographically dated 15 June 2001, inspected in a later reprint. Conceptual antecedence is a research classification, not exact-term use or proof of transmission.

Inference premises and rationale:

- Earlier bibliographic release date
- Explicit treatment of volition and goal content
- Exact full-name screen negative in current extracted text

#### CP2-E19

[Creating Friendly AI 1.0 — institutional reprint](https://intelligence.org/files/CFAI.pdf) — cfai; current MIRI reprint.

Locator: Cover; §2.3 printed pp. 11–12 (physical pp. 15–16); §5.5.1 printed p. 139 (physical p. 143); §7.4 printed p. 276.

**Paraphrase:** The reprint describes volition-based Friendliness, external referents beyond descriptive goal content, and a June 2001 release. Full-PDF exact-term screen found no match.

Relationship to this proposition: supports. Source role: Primary for the scoped source statement or retrieval observation; not independent proof of priority.

Checked 2026-09-28 by Selekoa investigation agent; machine_checked; human review not_recorded.

Expression limits: 282 physical pages. Later presentation; only an earlier conceptual candidate, not an authenticated 2001 byte snapshot.

### CP2-F09 — PCR-002

Investigated proposition: **Surviving period-labelled announcements identify the 2004 essay as Collective Volition.**

Machine resolution: supported; derivation: explicit. Admission: research_only; human review: not_recorded.

Qualification: SL4 announcement is dated 31 May; Foresight is dated 11 June. Both are current renderings, not independently authenticated 2004 captures. A reply’s contradictory date prevents ranking all message headers as reliable chronology.

#### CP2-E20

[FAI: Collective Volition — Yudkowsky announcement](http://sl4.org/archive/0405/8881.html) — sl4-0405-8881; current Hypermail rendering of message 8881.

Locator: Subject, date header, first paragraph and wiki link.

**Paraphrase:** Yudkowsky announces an update and links CollectiveVolition.

Relationship to this proposition: supports. Source role: Primary for the scoped source statement or retrieval observation; not independent proof of priority.

Checked 2026-09-28 by Selekoa investigation agent; machine_checked; human review not_recorded.

Expression limits: Body links the CollectiveVolition wiki. Current archive rendering, no independent period capture. Header dates are not guaranteed send/receipt ordering.

#### CP2-E21

[Update to Friendly AI theory](https://foresight.org/update_to_friendly_ai_theory/) — foresight; current migrated article.

Locator: Article body; displayed publication; structured datePublished/dateModified.

**Paraphrase:** The article quotes the author’s announcement of an essay named Collective Volition on the SL4 wiki; the current page records a later modification.

Relationship to this proposition: supports. Source role: Primary for the scoped source statement or retrieval observation; not independent proof of priority.

Checked 2026-09-28 by Selekoa investigation agent; machine_checked; human review not_recorded.

Expression limits: Quotes an author announcement naming Collective Volition. Migrated, modified current page; no 2004 capture authenticated.

#### CP2-E22

[RE: Collective Volition — reply with conflicting dates](http://sl4.org/archive/0405/8894.html) — sl4-0405-8894; current Hypermail rendering of message 8894.

Locator: Date header versus quoted original Sent header.

**Paraphrase:** The reply is labelled 30 May although it quotes an original sent 31 May.

Relationship to this proposition: context. Source role: Primary for the scoped source statement or retrieval observation; not independent proof of priority.

Checked 2026-09-28 by Selekoa investigation agent; machine_checked; human review not_recorded.

Expression limits: The reply header displays an earlier calendar date than its quoted original, whose timezone is absent. Temporal ordering cannot be normalized securely; no timestamp error or cause is established.

### CP2-F10 — PCR-002

Investigated proposition: **A documented transmission chain connects the 2001 conceptual treatment to the exact later CEV name.**

Machine resolution: unresolved; derivation: explicit. Admission: research_only; human review: not_recorded.

Qualification: Shared authorship and conceptual similarity do not establish that chain. SL4 replies and Foresight’s quotation document particular carriers of the Collective Volition announcement only; they do not date a renaming or establish broad influence.

#### CP2-E23

[Creating Friendly AI 1.0 — institutional reprint](https://intelligence.org/files/CFAI.pdf) — cfai; current MIRI reprint.

Locator: §2.3 and §5.5.1.

**Paraphrase:** Earlier conceptual material supplies a comparison candidate.

Relationship to this proposition: context. Source role: Primary for the scoped source statement or retrieval observation; not independent proof of priority.

Checked 2026-09-28 by Selekoa investigation agent; machine_checked; human review not_recorded.

Expression limits: 282 physical pages. Later presentation; only an earlier conceptual candidate, not an authenticated 2001 byte snapshot.

#### CP2-E24

[Re: FAI: Collective Volition — response](http://sl4.org/archive/0405/8884.html) — sl4-0405-8884; current Hypermail rendering of message 8884.

Locator: Reply body opening and discussion.

**Paraphrase:** The respondent explicitly addresses the linked essay, documenting this exchange.

Relationship to this proposition: context. Source role: Primary for the scoped source statement or retrieval observation; not independent proof of priority.

Checked 2026-09-28 by Selekoa investigation agent; machine_checked; human review not_recorded.

Expression limits: Response addresses the linked essay. Documents this exchange, not broader diffusion or exact-name priority.

#### CP2-E25

[Re: FAI: Collective Volition — Yudkowsky reply](http://sl4.org/archive/0405/8885.html) — sl4-0405-8885; current Hypermail rendering of message 8885.

Locator: Reply body on collective background rules.

**Paraphrase:** Yudkowsky answers the respondent’s interpretation.

Relationship to this proposition: context. Source role: Primary for the scoped source statement or retrieval observation; not independent proof of priority.

Checked 2026-09-28 by Selekoa investigation agent; machine_checked; human review not_recorded.

Expression limits: Discusses collective background rules and self-determination; do not equate conceptual discussion with exact full-name use.

#### CP2-E26

[Update to Friendly AI theory](https://foresight.org/update_to_friendly_ai_theory/) — foresight; current migrated article.

Locator: Article body and quoted author announcement.

**Paraphrase:** A named announcement was carried by this venue; wider transmission is not inferred.

Relationship to this proposition: context. Source role: Primary for the scoped source statement or retrieval observation; not independent proof of priority.

Checked 2026-09-28 by Selekoa investigation agent; machine_checked; human review not_recorded.

Expression limits: Quotes an author announcement naming Collective Volition. Migrated, modified current page; no 2004 capture authenticated.

### CP2-F11 — PCR-002

Investigated proposition: **SL4 reply 8894 displays an apparent calendar-date discrepancy.**

Machine resolution: supported; derivation: explicit. Admission: research_only; human review: not_recorded.

Qualification: The archive header displays 30 May; the quoted original displays 31 May without a timezone. These cannot be normalized confidently. A timezone difference could explain the apparent ordering; no chronological impossibility, error cause or corrected date is established. Do not rank priority using either header alone.

#### CP2-E27

[RE: Collective Volition — reply with conflicting dates](http://sl4.org/archive/0405/8894.html) — sl4-0405-8894; current Hypermail rendering of message 8894.

Locator: Top Date header; quoted original message Sent line.

**Paraphrase:** The archive header displays Sun May 30 2004, 16:42:31 MDT. The quoted original displays Monday May 31 2004, 6:48 AM, with no timezone supplied.

Relationship to this proposition: supports. Source role: Primary for the scoped source statement or retrieval observation; not independent proof of priority.

Checked 2026-09-28 by Selekoa investigation agent; machine_checked; human review not_recorded.

Expression limits: The reply header displays an earlier calendar date than its quoted original, whose timezone is absent. Temporal ordering cannot be normalized securely; no timestamp error or cause is established.

## Historical search protocol and result

```json
{
  "id": "CP2-SEARCH-01",
  "question": "What exact-name occurrences and earlier conceptual candidates can this bounded author/venue corpus establish?",
  "fromDate": "2001-01-01",
  "throughDate": "2004-12-31",
  "venues": [
    "Author/SIAI works represented by current CEV and CFAI institutional reprints",
    "SL4 monthly archive indexes and subject-selected bodies",
    "Foresight’s author-announcement article"
  ],
  "aliases": [
    "Coherent Extrapolated Volition",
    "coherent extrapolated volition",
    "CEV (discovery alias only; acronym alone is not an exact-name hit)",
    "Collective Volition",
    "CollectiveVolition",
    "volition",
    "volitional Friendliness",
    "summary of current FAI"
  ],
  "selection": "All 48 monthly date indexes; retrieve numeric message links with subjects matching /volition|summary of current FAI/i. This is a title-screened subset, not full-text search of the entire archive.",
  "normalization": "Strip HTML tags in Hypermail body markers (fallback whole page), collapse whitespace, case-insensitive /coherent\\s+extrapolated\\s+volition/; manually inspect positive/candidate contexts. HTML entities and PDF extraction may hide variants.",
  "indexCount": 48,
  "bodyCount": 355,
  "exactHits": 0,
  "earlierCandidates": [
    "cfai",
    "sl4-0405-8881",
    "sl4-0405-8884",
    "sl4-0405-8885",
    "sl4-0405-8894",
    "foresight"
  ],
  "unsuccessfulSearches": [
    {
      "query": "\"Coherent Extrapolated Volition\" \"2004\" site:sl4.org/archive/04",
      "result": "No qualifying contemporary primary body identified by discovery search."
    },
    {
      "query": "\"Coherent Extrapolated Volition\" \"renamed\"",
      "result": "Later references and secondary leads did not authenticate the renaming date."
    },
    {
      "query": "\"coherent extrapolated volition\" \"2003\" site:yudkowsky.net",
      "result": "No qualifying primary occurrence identified."
    }
  ],
  "exclusions": [
    "Other mailing lists, private correspondence and private drafts",
    "Most SL4 messages whose subjects do not match the filter",
    "Search years outside 2001–2004 except expression metadata needed to identify later reprints",
    "Unrecovered historical wiki revisions and unauthenticated archive captures"
  ],
  "earliestFound": "The current exact-name CEV reprint attributes its work to 2004. This is the earliest bibliographic attribution found among the selected exact-name candidates, not a securely dated 2004 literal occurrence. No authenticated contemporary exact-name positive was found.",
  "priority": "unresolved",
  "transmission": "unresolved",
  "limits": [
    "Current archive/header dates do not authenticate period bytes; message 8894 demonstrates a date anomaly.",
    "No finding of first use follows from a finite, title-filtered and partly inaccessible corpus.",
    "PDF full-text screens were performed on current reprints, not original editions.",
    "Search engine discovery is non-exhaustive and unstable; negative results are retrieval observations.",
    "Source hashes identify downloaded response bytes, not original publication dates; failure hashes are not source expressions."
  ]
}
```

All 403 searched index/body URLs, hashes, subjects and outcomes appear in [inventory.md](inventory.md) and collection.json. Unsuccessful discovery searches are recorded above. Failure response hashes never authenticate historical source content.

## Original identifiers and packet mappings

```json
{
  "upstream": {
    "attribution": "source-integrity baseline v1; maintained by futurelightcone",
    "commit": "54c62fc426d7b6ae008fd6acd3f53a0b993248ac",
    "files": [
      {
        "gitBlob": "7a3d447329f99f084da024b68e7ad31da7387e4b",
        "path": "reports/canonical-claims.csv",
        "sha256": "sha256:90ef2fa4d9ac550bd3d3a302c3e65b22918970b78a2a32c73fccf4371237bdc0"
      },
      {
        "gitBlob": "be5ca72639e3b57e33b1f5bc86fd24709a996ddd",
        "path": "reports/canonical-sources.csv",
        "sha256": "sha256:626fd7522f515ba14d4e7f9d6c33a1436eb47aee9660942fbf1a6307e5899419"
      },
      {
        "gitBlob": "d8e5639d6b49c129e6a2c7af8b62271ede3a045c",
        "path": "reports/claim-atomization-crosswalk.csv",
        "sha256": "sha256:2ebd2a2dcd0113aec35523621bc6a2c8503dfa3295a6c15838bb4932279980a2"
      },
      {
        "gitBlob": "7729bfc72cff278a176a8389880e7c9410618839",
        "path": "reports/claim-evidence.csv",
        "sha256": "sha256:8db7399c3ba11c6bd21eed9f45e9f08f906bebe1cef4c8fd090eb822f7009927"
      }
    ],
    "importedAt": "2026-09-28",
    "reportDate": "2026-08-21",
    "repository": "futurelightcone/source-integrity",
    "terms": "No tracked licence at pinned commit; bounded private reuse authorized for this prototype."
  },
  "records": [
    {
      "assertionClassAsReported": "SOURCE_FACT",
      "concept": "CEV",
      "editorialAdmission": "research_only",
      "eventDate": null,
      "evidenceIds": ["si-evidence-002"],
      "humanReview": {
        "evidence": "not_recorded",
        "interpretation": "not_recorded",
        "reliance": "not_recorded"
      },
      "id": "si-pcr-002",
      "investigatedProposition": "The retained 2004 CEV document is an observed strict-focal use of the full name, not an established first use without a documented corpus search.",
      "machineFinding": {
        "actor": "source-integrity baseline machine research",
        "model": null,
        "originalCheckDate": null,
        "rationale": "Direct source-identity, wording, or conceptual-content check; see linked expression evidence.",
        "status": "UNRESOLVED"
      },
      "openQuestions": [
        "Define the strict-focal corpus and search dates before testing priority; distinguish full-name use from value-extrapolation antecedents."
      ],
      "propositionKindAsReported": "priority",
      "provenanceTaxonomyAsReported": null,
      "qualification": "The upstream proposition is already qualified; its UNRESOLVED finding concerns priority, not denial of the observed bibliographic occurrence.",
      "search": {
        "boundary": "No documented strict-focal corpus search.",
        "earlierCandidatesAsReported": "Not assessed.",
        "earliestPositiveEvidenceAsReported": "2004 (positive occurrence only)",
        "networkScope": null,
        "prioritySensitive": true,
        "priorityStatusAsReported": "UNRESOLVED",
        "scope": "Strict-focal priority requires a documented corpus search.",
        "venueScope": null
      },
      "selectionReason": "Separate a dated positive occurrence from historical priority.",
      "upstream": {
        "path": "reports/canonical-claims.csv",
        "projectedRowFingerprint": "sha256:34f8a5761dcea914407e934860184dcebe3b469c9352d0fe172f355e7e9a5a8e",
        "recordOrdinal": 2
      },
      "upstreamId": "PCR-002"
    },
    {
      "assertionClassAsReported": "SOURCE_FACT",
      "concept": "Mesa-optimization",
      "editorialAdmission": "research_only",
      "eventDate": null,
      "evidenceIds": ["si-evidence-010", "si-evidence-062"],
      "humanReview": {
        "evidence": "not_recorded",
        "interpretation": "not_recorded",
        "reliance": "not_recorded"
      },
      "id": "si-pcr-010",
      "investigatedProposition": "Hubinger et al.'s arXiv v1 calls mesa-optimization a neologism introduced in that paper.",
      "machineFinding": {
        "actor": "source-integrity baseline machine research",
        "model": null,
        "originalCheckDate": null,
        "rationale": "Direct source-identity, wording, or conceptual-content check; see linked expression evidence.",
        "status": "SUPPORTS"
      },
      "openQuestions": [
        "Compare v1 and v4 and split expression identities in a future authorized correction; search earlier usage separately from authorial self-attribution."
      ],
      "propositionKindAsReported": "wording",
      "provenanceTaxonomyAsReported": null,
      "qualification": "The authors' introduction claim is evidence of their own wording, not an independently established coinage priority. The source catalog points to v4 while the evidence specifies v1.",
      "search": {
        "boundary": null,
        "earlierCandidatesAsReported": null,
        "earliestPositiveEvidenceAsReported": null,
        "networkScope": null,
        "prioritySensitive": false,
        "priorityStatusAsReported": null,
        "scope": "Full retained arXiv v1 PDF; abstract, page 1.",
        "venueScope": null
      },
      "selectionReason": "Supported authorial self-description with a source-version mismatch.",
      "upstream": {
        "path": "reports/canonical-claims.csv",
        "projectedRowFingerprint": "sha256:c6cca2ad592a6dfa45777a9f783168ac40e1fa5243adb2ead2e1945b4411a4a6",
        "recordOrdinal": 10
      },
      "upstreamId": "PCR-010"
    },
    {
      "assertionClassAsReported": "SOURCE_FACT",
      "concept": "Sharp left turn",
      "editorialAdmission": "research_only",
      "eventDate": null,
      "evidenceIds": ["si-evidence-028"],
      "humanReview": {
        "evidence": "not_recorded",
        "interpretation": "not_recorded",
        "reliance": "not_recorded"
      },
      "id": "si-pcr-028",
      "investigatedProposition": "The cited Alignment Forum URL aW288uWABwTruBmgF identifies Nate Soares's Sharp Left Turn post.",
      "machineFinding": {
        "actor": "source-integrity baseline machine research",
        "model": null,
        "originalCheckDate": null,
        "rationale": "Direct source-identity, wording, or conceptual-content check; see linked expression evidence.",
        "status": "CONTRADICTS"
      },
      "openQuestions": [
        "Resolve both recorded post IDs and locate the intended original Sharp Left Turn expression before making a historical claim."
      ],
      "propositionKindAsReported": "identifier",
      "provenanceTaxonomyAsReported": null,
      "qualification": "The alleged Sharp Left Turn assertion remains an investigated proposition only. Upstream catalog and evidence URLs use different post IDs; the relationship between those retrieved objects needs rechecking.",
      "search": {
        "boundary": null,
        "earlierCandidatesAsReported": null,
        "earliestPositiveEvidenceAsReported": null,
        "networkScope": null,
        "prioritySensitive": false,
        "priorityStatusAsReported": null,
        "scope": "Retrieved object is titled EA Vegan Advocacy is not truthseeking, and it is everyone's problem.",
        "venueScope": null
      },
      "selectionReason": "A wrong-object finding with conflicting source-expression identifiers.",
      "upstream": {
        "path": "reports/canonical-claims.csv",
        "projectedRowFingerprint": "sha256:cd13b38225ab46fb6c7f4c476f05251514fe5a31f9e4d53f71b2ad0f8eef41ac",
        "recordOrdinal": 28
      },
      "upstreamId": "PCR-028"
    }
  ],
  "evidence": [
    {
      "assessment": {
        "confidenceAsReported": "HIGH",
        "rationale": "One positive expression cannot establish priority without the documented corpus boundary.",
        "roleAdequacyAsReported": "PARTIAL",
        "sourceEstablishes": "A 2004 strict-focal occurrence, not a first-use result.",
        "status": "UNRESOLVED",
        "temporalAdequacyAsReported": "YES"
      },
      "captureDateAsReported": null,
      "expressionId": "EXP-SRC-0EA45CE29F2E19",
      "expressionUrlInspectedByUpstream": "https://intelligence.org/files/CEV.pdf",
      "humanEvidenceReview": {
        "state": "not_recorded"
      },
      "id": "si-evidence-002",
      "locator": "PDF page 1",
      "originalCheckDate": null,
      "passage": {
        "quotationAuthenticatedBySelekoa": false,
        "text": "Yudkowsky, Eliezer. 2004. Coherent Extrapolated Volition.",
        "upstreamComposition": "SOURCE_QUOTE_OR_SUMMARY"
      },
      "recordId": "si-pcr-002",
      "relationship": {
        "assignedBy": "Selekoa machine selection",
        "checkedAt": "2026-09-28",
        "rationale": "An observed occurrence is context for priority; the bounded historical search is missing.",
        "role": "context",
        "scope": "upstream report assessment; not a new original-source verification"
      },
      "sourceId": "SRC-0EA45CE29F2E19",
      "sourceRoleAsReported": "later re-typeset edition",
      "upstream": {
        "path": "reports/claim-evidence.csv",
        "projectedRowFingerprint": "sha256:e51ae3d076e852ffa3733d79d99dcb1b0513c106159c9e19d010ce3665641a95",
        "recordOrdinal": 2
      }
    },
    {
      "assessment": {
        "confidenceAsReported": "HIGH",
        "rationale": "Direct abstract wording.",
        "roleAdequacyAsReported": "YES",
        "sourceEstablishes": "The paper explicitly says it introduces the neologism.",
        "status": "SUPPORTS",
        "temporalAdequacyAsReported": "YES"
      },
      "captureDateAsReported": null,
      "expressionId": "EXP-SRC-C4858D4EF280D8",
      "expressionUrlInspectedByUpstream": "https://arxiv.org/pdf/1906.01820v1.pdf",
      "humanEvidenceReview": {
        "state": "not_recorded"
      },
      "id": "si-evidence-010",
      "locator": "PDF abstract, page 1",
      "originalCheckDate": null,
      "passage": {
        "quotationAuthenticatedBySelekoa": false,
        "text": "a situation we refer to as mesa-optimization, a neologism we introduce in this paper",
        "upstreamComposition": "SOURCE_QUOTE_OR_SUMMARY"
      },
      "recordId": "si-pcr-010",
      "relationship": {
        "assignedBy": "Selekoa machine selection",
        "checkedAt": "2026-09-28",
        "rationale": "Reported abstract wording supports authorial self-description, with version identity still qualified.",
        "role": "supports",
        "scope": "upstream report assessment; not a new original-source verification"
      },
      "sourceId": "SRC-C4858D4EF280D8",
      "sourceRoleAsReported": "original publication",
      "upstream": {
        "path": "reports/claim-evidence.csv",
        "projectedRowFingerprint": "sha256:60674568097b8a8cbf713019db09d69819e164136a872f1080f8a0e6fa9e3be7",
        "recordOrdinal": 10
      }
    },
    {
      "assessment": {
        "confidenceAsReported": "HIGH",
        "rationale": "Object identity directly contradicts the claimed Sharp Left Turn source.",
        "roleAdequacyAsReported": "NO",
        "sourceEstablishes": "A different object at the cited stable post ID.",
        "status": "CONTRADICTS",
        "temporalAdequacyAsReported": "YES"
      },
      "captureDateAsReported": null,
      "expressionId": "EXP-SRC-5F06443CBCE60C",
      "expressionUrlInspectedByUpstream": "https://www.alignmentforum.org/posts/aW288uWABwTruBmgF/a-central-ai-alignment-problem-capabilities-generalization-and-the-sharp-left-turn",
      "humanEvidenceReview": {
        "state": "not_recorded"
      },
      "id": "si-evidence-028",
      "locator": "Retrieved page title",
      "originalCheckDate": null,
      "passage": {
        "quotationAuthenticatedBySelekoa": false,
        "text": "EA Vegan Advocacy is not truthseeking, and it's everyone's problem",
        "upstreamComposition": "SOURCE_QUOTE_OR_SUMMARY"
      },
      "recordId": "si-pcr-028",
      "relationship": {
        "assignedBy": "Selekoa machine selection",
        "checkedAt": "2026-09-28",
        "rationale": "The reported retrieved title challenges source identity; conflicting post IDs require rechecking.",
        "role": "contradicts",
        "scope": "upstream report assessment; not a new original-source verification"
      },
      "sourceId": "SRC-5F06443CBCE60C",
      "sourceRoleAsReported": "wrong object",
      "upstream": {
        "path": "reports/claim-evidence.csv",
        "projectedRowFingerprint": "sha256:dd7be8b51af4caf8289ff6e3821b2f875689391af75d439cbe56254f7df5057c",
        "recordOrdinal": 28
      }
    },
    {
      "assessment": {
        "confidenceAsReported": "HIGH",
        "rationale": "It corroborates an associated expression but cannot establish the paper's v1 wording or priority.",
        "roleAdequacyAsReported": "PARTIAL",
        "sourceEstablishes": "A navigation/sequence expression for the named paper.",
        "status": "PARTIALLY_SUPPORTS",
        "temporalAdequacyAsReported": "YES"
      },
      "captureDateAsReported": null,
      "expressionId": "EXP-SRC-ABABC71FC66115",
      "expressionUrlInspectedByUpstream": "https://www.alignmentforum.org/s/r9tYkB2a8Fp4DN8yB",
      "humanEvidenceReview": {
        "state": "not_recorded"
      },
      "id": "si-evidence-062",
      "locator": "Rendered Alignment Forum sequence-page heading",
      "originalCheckDate": null,
      "passage": {
        "quotationAuthenticatedBySelekoa": false,
        "text": "Risks from Learned Optimization",
        "upstreamComposition": "SOURCE_QUOTE_OR_SUMMARY"
      },
      "recordId": "si-pcr-010",
      "relationship": {
        "assignedBy": "Selekoa machine selection",
        "checkedAt": "2026-09-28",
        "rationale": "A sequence navigation page identifies related material but is not the paper's abstract expression.",
        "role": "partially_supports",
        "scope": "upstream report assessment; not a new original-source verification"
      },
      "sourceId": "SRC-ABABC71FC66115",
      "sourceRoleAsReported": "sequence page",
      "upstream": {
        "path": "reports/claim-evidence.csv",
        "projectedRowFingerprint": "sha256:17e328e2218a373d057b849ea02eacb7147bd759ef22fbef7bffc42c2044a4fc",
        "recordOrdinal": 62
      }
    }
  ],
  "sources": [
    {
      "authorsAsReported": "Eliezer Yudkowsky",
      "bibliographicIdentityAsReported": "Eliezer Yudkowsky — Coherent Extrapolated Volition — 2004",
      "canonicalUrl": "https://intelligence.org/files/CEV.pdf",
      "captureDateAsReported": null,
      "catalogExpressionUrl": "https://intelligence.org/files/CEV.pdf",
      "expressionDateAsReported": "2004",
      "historicalOrganizationContext": null,
      "id": "EXP-SRC-0EA45CE29F2E19",
      "identityEvidenceAsReported": null,
      "originalPacketUrl": "https://intelligence.org/files/CEV.pdf",
      "publicationDateAsReported": "2004",
      "rights": {
        "status": "unassessed",
        "termsUrl": null
      },
      "roleAsReported": "later re-typeset edition",
      "sourceId": "SRC-0EA45CE29F2E19",
      "title": "Coherent Extrapolated Volition",
      "upstream": {
        "path": "reports/canonical-sources.csv",
        "projectedRowFingerprint": "sha256:37070663f87abf63ad657084c88bc2b0997e7a23761bf3b69f562fe059915060",
        "recordOrdinal": 4
      },
      "venueAsReported": null,
      "versionLimits": [
        "Upstream expression identifier is retained; it is not an authenticated hash of original source bytes. Date labels are upstream values and have not been resolved into historical version dates."
      ],
      "workIdAsReported": "WORK-SRC-0EA45CE29F2E19"
    },
    {
      "authorsAsReported": null,
      "bibliographicIdentityAsReported": "EA Vegan Advocacy is not truthseeking, and it's everyone's problem",
      "canonicalUrl": "https://www.alignmentforum.org/posts/aW288uWABwTruBmgF/ea-vegan-advocacy-is-not-truthseeking-and-it-s-everyone-s-1",
      "captureDateAsReported": null,
      "catalogExpressionUrl": "https://www.alignmentforum.org/posts/7W8HqksjBXDcKkrD7/ea-vegan-advocacy-is-not-truthseeking",
      "expressionDateAsReported": "2022-02-17T12:00:00Z",
      "historicalOrganizationContext": null,
      "id": "EXP-SRC-5F06443CBCE60C",
      "identityEvidenceAsReported": null,
      "originalPacketUrl": "https://www.alignmentforum.org/posts/aW288uWABwTruBmgF/a-central-ai-alignment-problem-capabilities-generalization-and-the-sharp-left-turn",
      "publicationDateAsReported": null,
      "rights": {
        "status": "unassessed",
        "termsUrl": null
      },
      "roleAsReported": "wrong object",
      "sourceId": "SRC-5F06443CBCE60C",
      "title": "EA Vegan Advocacy is not truthseeking, and it's everyone's problem",
      "upstream": {
        "path": "reports/canonical-sources.csv",
        "projectedRowFingerprint": "sha256:33d1dbf0a91c5d418e04906ab4b77ff38c27bc881b4f8140fa22ebb9ba1eac80",
        "recordOrdinal": 14
      },
      "venueAsReported": "Alignment Forum",
      "versionLimits": [
        "Upstream expression identifier is retained; it is not an authenticated hash of original source bytes. Date labels are upstream values and have not been resolved into historical version dates.",
        "Evidence URL differs from the source catalog expression URL. Preserve both; format, archive and revision differences require inspection."
      ],
      "workIdAsReported": "WORK-AF-EA-VEGAN-ADVOCACY"
    },
    {
      "authorsAsReported": null,
      "bibliographicIdentityAsReported": "Risks from Learned Optimization",
      "canonicalUrl": "https://www.alignmentforum.org/s/r9tYkB2a8Fp4DN8yB",
      "captureDateAsReported": null,
      "catalogExpressionUrl": "https://www.alignmentforum.org/s/r9tYkB2a8Fp4DN8yB",
      "expressionDateAsReported": "2019-05-31T02:18:02.737Z",
      "historicalOrganizationContext": null,
      "id": "EXP-SRC-ABABC71FC66115",
      "identityEvidenceAsReported": null,
      "originalPacketUrl": "https://www.alignmentforum.org/s/r9tYkB2a8Fp4DN8yB",
      "publicationDateAsReported": null,
      "rights": {
        "status": "unassessed",
        "termsUrl": null
      },
      "roleAsReported": "sequence page",
      "sourceId": "SRC-ABABC71FC66115",
      "title": "Risks from Learned Optimization",
      "upstream": {
        "path": "reports/canonical-sources.csv",
        "projectedRowFingerprint": "sha256:55aef60ffb375714a6b6bf610ac44a5309acbefeb8c785710d95cf7eeed94bee",
        "recordOrdinal": 22
      },
      "venueAsReported": "Alignment Forum",
      "versionLimits": [
        "Upstream expression identifier is retained; it is not an authenticated hash of original source bytes. Date labels are upstream values and have not been resolved into historical version dates."
      ],
      "workIdAsReported": "WORK-RISKS-LEARNED-OPTIMIZATION-SEQUENCE"
    },
    {
      "authorsAsReported": "Evan Hubinger; Chris van Merwijk; Vladimir Mikulik; Joar Skalse; Scott Garrabrant",
      "bibliographicIdentityAsReported": "Evan Hubinger; Chris van Merwijk; Vladimir Mikulik; Joar Skalse; Scott Garrabrant — Risks from Learned Optimization in Advanced Machine Learning Systems — 2019-06-05",
      "canonicalUrl": "https://arxiv.org/abs/1906.01820",
      "captureDateAsReported": null,
      "catalogExpressionUrl": "https://arxiv.org/abs/1906.01820v4",
      "expressionDateAsReported": "2019-06-05",
      "historicalOrganizationContext": null,
      "id": "EXP-SRC-C4858D4EF280D8",
      "identityEvidenceAsReported": null,
      "originalPacketUrl": "https://arxiv.org/abs/1906.01820",
      "publicationDateAsReported": "2019-06-05",
      "rights": {
        "status": "unassessed",
        "termsUrl": null
      },
      "roleAsReported": "original paper",
      "sourceId": "SRC-C4858D4EF280D8",
      "title": "Risks from Learned Optimization in Advanced Machine Learning Systems",
      "upstream": {
        "path": "reports/canonical-sources.csv",
        "projectedRowFingerprint": "sha256:3348dba8a94093403d06b9d196fdf2e7ef9b16880d677decbdb1994a7b3d1546",
        "recordOrdinal": 28
      },
      "venueAsReported": "arXiv",
      "versionLimits": [
        "Upstream expression identifier is retained; it is not an authenticated hash of original source bytes. Date labels are upstream values and have not been resolved into historical version dates.",
        "Evidence URL differs from the source catalog expression URL. Preserve both; format, archive and revision differences require inspection."
      ],
      "workIdAsReported": "WORK-SRC-C4858D4EF280D8"
    }
  ],
  "mappings": [
    {
      "basis": "source-expression relationships",
      "id": "si-mapping-018",
      "packetClaimId": "CLM-1EF9627F8EEFAB",
      "packetLevelAtomicIds": ["PCR-028", "PCR-045", "PCR-061"],
      "packetOccurrenceId": "OCC-PKT-AUDIT-001-0039-01",
      "provenanceClassificationIds": ["PCR-045", "PCR-061"],
      "selectedRecordIds": ["si-pcr-028", "si-pcr-045"],
      "sourceGroupedAtomicIds": ["PCR-028", "PCR-045", "PCR-061"],
      "sourceIdAsReported": "SRC-5F06443CBCE60C",
      "treatment": "mapped to curated source-specific atomic claim(s)",
      "upstream": {
        "path": "reports/claim-atomization-crosswalk.csv",
        "projectedRowFingerprint": "sha256:a7e36069f62863bf0995de518fdeca9ab8b34012c3839f15dc5d735c93490188",
        "recordOrdinal": 18
      }
    },
    {
      "basis": "source-expression relationships",
      "id": "si-mapping-032",
      "packetClaimId": "CLM-516438628E13B3",
      "packetLevelAtomicIds": ["PCR-049", "PCR-010", "PCR-011", "PCR-014"],
      "packetOccurrenceId": "OCC-PKT-DOSSIER-002-0014-01",
      "provenanceClassificationIds": [],
      "selectedRecordIds": ["si-pcr-010"],
      "sourceGroupedAtomicIds": ["PCR-049", "PCR-010", "PCR-011", "PCR-014"],
      "sourceIdAsReported": "SRC-ABABC71FC66115",
      "treatment": "mapped to curated source-specific atomic claim(s)",
      "upstream": {
        "path": "reports/claim-atomization-crosswalk.csv",
        "projectedRowFingerprint": "sha256:7bed9340e881bef267a9fcaa30de11848ed9814dda7f1fe6fe2b48cbb24d791b",
        "recordOrdinal": 32
      }
    },
    {
      "basis": "source-expression relationships",
      "id": "si-mapping-046",
      "packetClaimId": "CLM-647F3FEB51206F",
      "packetLevelAtomicIds": [
        "PCR-010",
        "PCR-011",
        "PCR-014",
        "PCR-045",
        "PCR-056",
        "PCR-057"
      ],
      "packetOccurrenceId": "OCC-PKT-AUDIT-001-0035-01",
      "provenanceClassificationIds": ["PCR-045", "PCR-056", "PCR-057"],
      "selectedRecordIds": ["si-pcr-010", "si-pcr-045"],
      "sourceGroupedAtomicIds": [
        "PCR-010",
        "PCR-011",
        "PCR-014",
        "PCR-045",
        "PCR-056",
        "PCR-057"
      ],
      "sourceIdAsReported": "SRC-C4858D4EF280D8",
      "treatment": "mapped to curated source-specific atomic claim(s)",
      "upstream": {
        "path": "reports/claim-atomization-crosswalk.csv",
        "projectedRowFingerprint": "sha256:d25b579406d1023266e2f1a43c12f8bc82ffb77558684ff6defa6b87e0f24b38",
        "recordOrdinal": 46
      }
    },
    {
      "basis": "source-expression relationships",
      "id": "si-mapping-051",
      "packetClaimId": "CLM-6D3C12B1B80381",
      "packetLevelAtomicIds": [
        "PCR-010",
        "PCR-011",
        "PCR-014",
        "PCR-045",
        "PCR-056",
        "PCR-057"
      ],
      "packetOccurrenceId": "OCC-PKT-DOSSIER-002-0014-02",
      "provenanceClassificationIds": ["PCR-045", "PCR-056", "PCR-057"],
      "selectedRecordIds": ["si-pcr-010", "si-pcr-045"],
      "sourceGroupedAtomicIds": [
        "PCR-010",
        "PCR-011",
        "PCR-014",
        "PCR-045",
        "PCR-056",
        "PCR-057"
      ],
      "sourceIdAsReported": "SRC-C4858D4EF280D8",
      "treatment": "mapped to curated source-specific atomic claim(s)",
      "upstream": {
        "path": "reports/claim-atomization-crosswalk.csv",
        "projectedRowFingerprint": "sha256:eaa2345c3706d9efc296eb2418e229aa7818b5a10c1cfda85b26553294376a24",
        "recordOrdinal": 51
      }
    },
    {
      "basis": "source-expression relationships",
      "id": "si-mapping-063",
      "packetClaimId": "CLM-84B0CBEA4ACE2F",
      "packetLevelAtomicIds": [
        "PCR-010",
        "PCR-011",
        "PCR-014",
        "PCR-045",
        "PCR-056",
        "PCR-057"
      ],
      "packetOccurrenceId": "OCC-PKT-AUDIT-001-0034-02",
      "provenanceClassificationIds": ["PCR-045", "PCR-056", "PCR-057"],
      "selectedRecordIds": ["si-pcr-010", "si-pcr-045"],
      "sourceGroupedAtomicIds": [
        "PCR-010",
        "PCR-011",
        "PCR-014",
        "PCR-045",
        "PCR-056",
        "PCR-057"
      ],
      "sourceIdAsReported": "SRC-C4858D4EF280D8",
      "treatment": "mapped to curated source-specific atomic claim(s)",
      "upstream": {
        "path": "reports/claim-atomization-crosswalk.csv",
        "projectedRowFingerprint": "sha256:c30338a603a678ee99f838aef1377a3a95d77fc6bfd9f0844476835d5dd19335",
        "recordOrdinal": 63
      }
    },
    {
      "basis": "source-expression relationships",
      "id": "si-mapping-064",
      "packetClaimId": "CLM-8C8E75D850B0CD",
      "packetLevelAtomicIds": ["PCR-001", "PCR-002", "PCR-052"],
      "packetOccurrenceId": "OCC-PKT-DOSSIER-001-0014-01",
      "provenanceClassificationIds": ["PCR-052"],
      "selectedRecordIds": ["si-pcr-001", "si-pcr-002"],
      "sourceGroupedAtomicIds": ["PCR-001", "PCR-002", "PCR-052"],
      "sourceIdAsReported": "SRC-0EA45CE29F2E19",
      "treatment": "mapped to curated source-specific atomic claim(s)",
      "upstream": {
        "path": "reports/claim-atomization-crosswalk.csv",
        "projectedRowFingerprint": "sha256:83848a44fe26885559c9fa9ecaaba19041eef23e38aa2b8ee394cb26ceb6921a",
        "recordOrdinal": 64
      }
    },
    {
      "basis": "packet-level assertion mapping",
      "id": "si-mapping-067",
      "packetClaimId": "CLM-945A26EFB19D6B",
      "packetLevelAtomicIds": [
        "PCR-049",
        "PCR-010",
        "PCR-011",
        "PCR-014",
        "PCR-056"
      ],
      "packetOccurrenceId": "OCC-PKT-AUDIT-001-0034-01",
      "provenanceClassificationIds": ["PCR-056"],
      "selectedRecordIds": ["si-pcr-010"],
      "sourceGroupedAtomicIds": ["PCR-049", "PCR-010", "PCR-011", "PCR-014"],
      "sourceIdAsReported": "SRC-ABABC71FC66115",
      "treatment": "mapped to curated source-specific atomic claim(s)",
      "upstream": {
        "path": "reports/claim-atomization-crosswalk.csv",
        "projectedRowFingerprint": "sha256:f4d9f2539bbbc531d828bb10f9fe585488d25d8fb047117b9e5b6a2f216042cf",
        "recordOrdinal": 67
      }
    },
    {
      "basis": "source-expression relationships",
      "id": "si-mapping-077",
      "packetClaimId": "CLM-AAAF566841D6FF",
      "packetLevelAtomicIds": ["PCR-001", "PCR-002", "PCR-052"],
      "packetOccurrenceId": "OCC-PKT-AUDIT-001-0030-01",
      "provenanceClassificationIds": ["PCR-052"],
      "selectedRecordIds": ["si-pcr-001", "si-pcr-002"],
      "sourceGroupedAtomicIds": ["PCR-001", "PCR-002", "PCR-052"],
      "sourceIdAsReported": "SRC-0EA45CE29F2E19",
      "treatment": "mapped to curated source-specific atomic claim(s)",
      "upstream": {
        "path": "reports/claim-atomization-crosswalk.csv",
        "projectedRowFingerprint": "sha256:a278d372ad3621704253695f54b01368b525227bcadb6b58d189333589c631ee",
        "recordOrdinal": 77
      }
    },
    {
      "basis": "source-expression relationships",
      "id": "si-mapping-083",
      "packetClaimId": "CLM-B29FA94B23766C",
      "packetLevelAtomicIds": [
        "PCR-010",
        "PCR-011",
        "PCR-014",
        "PCR-045",
        "PCR-056",
        "PCR-057"
      ],
      "packetOccurrenceId": "OCC-PKT-DOSSIER-002-0054-01",
      "provenanceClassificationIds": ["PCR-045", "PCR-056", "PCR-057"],
      "selectedRecordIds": ["si-pcr-010", "si-pcr-045"],
      "sourceGroupedAtomicIds": [
        "PCR-010",
        "PCR-011",
        "PCR-014",
        "PCR-045",
        "PCR-056",
        "PCR-057"
      ],
      "sourceIdAsReported": "SRC-C4858D4EF280D8",
      "treatment": "mapped to curated source-specific atomic claim(s)",
      "upstream": {
        "path": "reports/claim-atomization-crosswalk.csv",
        "projectedRowFingerprint": "sha256:da5d0dc7e6480082452d2a66d42cc7c50479ac49e6c71672504da2af01250ef4",
        "recordOrdinal": 83
      }
    },
    {
      "basis": "source-expression relationships",
      "id": "si-mapping-089",
      "packetClaimId": "CLM-CCB42656A07662",
      "packetLevelAtomicIds": ["PCR-049", "PCR-010", "PCR-011", "PCR-014"],
      "packetOccurrenceId": "OCC-PKT-DOSSIER-002-0024-01",
      "provenanceClassificationIds": [],
      "selectedRecordIds": ["si-pcr-010"],
      "sourceGroupedAtomicIds": ["PCR-049", "PCR-010", "PCR-011", "PCR-014"],
      "sourceIdAsReported": "SRC-ABABC71FC66115",
      "treatment": "mapped to curated source-specific atomic claim(s)",
      "upstream": {
        "path": "reports/claim-atomization-crosswalk.csv",
        "projectedRowFingerprint": "sha256:ddfc4baa93761aa71ea2439fab629208d2ec3ac39b493119cd213f5b6e1d0a10",
        "recordOrdinal": 89
      }
    },
    {
      "basis": "source-expression relationships",
      "id": "si-mapping-091",
      "packetClaimId": "CLM-D07AFEB2ADC4C7",
      "packetLevelAtomicIds": [
        "PCR-010",
        "PCR-011",
        "PCR-014",
        "PCR-045",
        "PCR-056",
        "PCR-057"
      ],
      "packetOccurrenceId": "OCC-PKT-AUDIT-001-0067-03",
      "provenanceClassificationIds": ["PCR-045", "PCR-056", "PCR-057"],
      "selectedRecordIds": ["si-pcr-010", "si-pcr-045"],
      "sourceGroupedAtomicIds": [
        "PCR-010",
        "PCR-011",
        "PCR-014",
        "PCR-045",
        "PCR-056",
        "PCR-057"
      ],
      "sourceIdAsReported": "SRC-C4858D4EF280D8",
      "treatment": "mapped to curated source-specific atomic claim(s)",
      "upstream": {
        "path": "reports/claim-atomization-crosswalk.csv",
        "projectedRowFingerprint": "sha256:2cfeb7b73f10e51bbb5324ef7b95906e6589781324553f0caaaa4b0ff0c08209",
        "recordOrdinal": 91
      }
    },
    {
      "basis": "source-expression relationships",
      "id": "si-mapping-094",
      "packetClaimId": "CLM-D678F56C12432D",
      "packetLevelAtomicIds": ["PCR-028", "PCR-045", "PCR-061"],
      "packetOccurrenceId": "OCC-PKT-DOSSIER-002-0060-01",
      "provenanceClassificationIds": ["PCR-045", "PCR-061"],
      "selectedRecordIds": ["si-pcr-028", "si-pcr-045"],
      "sourceGroupedAtomicIds": ["PCR-028", "PCR-045", "PCR-061"],
      "sourceIdAsReported": "SRC-5F06443CBCE60C",
      "treatment": "mapped to curated source-specific atomic claim(s)",
      "upstream": {
        "path": "reports/claim-atomization-crosswalk.csv",
        "projectedRowFingerprint": "sha256:ea3cdc467912516a7b825da74751f1293b86df0d303068c2c511dc4b8a0744bd",
        "recordOrdinal": 94
      }
    },
    {
      "basis": "source-expression relationships",
      "id": "si-mapping-099",
      "packetClaimId": "CLM-DCABF9CB405B2C",
      "packetLevelAtomicIds": ["PCR-028", "PCR-045", "PCR-061"],
      "packetOccurrenceId": "OCC-PKT-AUDIT-001-0067-04",
      "provenanceClassificationIds": ["PCR-045", "PCR-061"],
      "selectedRecordIds": ["si-pcr-028", "si-pcr-045"],
      "sourceGroupedAtomicIds": ["PCR-028", "PCR-045", "PCR-061"],
      "sourceIdAsReported": "SRC-5F06443CBCE60C",
      "treatment": "mapped to curated source-specific atomic claim(s)",
      "upstream": {
        "path": "reports/claim-atomization-crosswalk.csv",
        "projectedRowFingerprint": "sha256:75b802f6ff68f24b9e49d369df3bf9dbd80c501017db7f5bd0f702ccdde851df",
        "recordOrdinal": 99
      }
    },
    {
      "basis": "source-expression relationships",
      "id": "si-mapping-107",
      "packetClaimId": "CLM-FD236DEB4271B8",
      "packetLevelAtomicIds": [
        "PCR-010",
        "PCR-011",
        "PCR-014",
        "PCR-045",
        "PCR-056",
        "PCR-057"
      ],
      "packetOccurrenceId": "OCC-PKT-DOSSIER-002-0024-02",
      "provenanceClassificationIds": ["PCR-045", "PCR-056", "PCR-057"],
      "selectedRecordIds": ["si-pcr-010", "si-pcr-045"],
      "sourceGroupedAtomicIds": [
        "PCR-010",
        "PCR-011",
        "PCR-014",
        "PCR-045",
        "PCR-056",
        "PCR-057"
      ],
      "sourceIdAsReported": "SRC-C4858D4EF280D8",
      "treatment": "mapped to curated source-specific atomic claim(s)",
      "upstream": {
        "path": "reports/claim-atomization-crosswalk.csv",
        "projectedRowFingerprint": "sha256:cebbad7f0147db01786b223d5648df07bcd2767cb7e176caeb13f30262f0582e",
        "recordOrdinal": 107
      }
    }
  ]
}
```

## Correction history

See [corrections.md](corrections.md) for exact baseline cells, proposed changes, reasons and linked findings. Before-values are validated against the unchanged parent.

## Review separation

The [machine audit](audit.md) records separate inspection and disagreements. The human sample is [a blank working pack](../../../review/conceptual-provenance-ii.md); no decision importer or admission path exists. Sample protocol:

```json
{
  "seed": "5bc745e84dc14e0952d7bf53f90b76c1",
  "algorithm": "Minimum SHA-256 of UTF-8 seed:ID over the complete finding population; seed drawn once with cryptographic random bytes, frozen before human review.",
  "population": [
    "CP2-F01",
    "CP2-F02",
    "CP2-F03",
    "CP2-F04",
    "CP2-F05",
    "CP2-F06",
    "CP2-F07",
    "CP2-F08",
    "CP2-F09",
    "CP2-F10",
    "CP2-F11"
  ],
  "randomFindingId": "CP2-F09",
  "targetedFindingIds": ["CP2-F01", "CP2-F04", "CP2-F07", "CP2-F11"],
  "rationale": "Random selection plus arXiv, forum, institutional-PDF/mail/archive families; include source identity, priority uncertainty and contradictory date evidence.",
  "humanDecisions": "not_recorded"
}
```
