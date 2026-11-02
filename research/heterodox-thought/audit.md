# Same-family audit, 2026-10-31

A fresh-context audit of the candidate pack by the family that prepared it (Claude). It is not the cross-family check that the editorial policy requires before admission; that check's brief is [`cross-family-input-2026-10-31.md`](cross-family-input-2026-10-31.md). Machine agreement here is neither historical certainty nor human acceptance.

## Who and how

- **Auditors.** Fourteen fresh-context agents of the preparing family, run as one orchestrated workflow on 2026-10-31. None had seen the drafting passes. Each received the scope, the propositions, the drafting rules and the editorial policy's sections on quotation, interpretation and earliest located texts, read its items from `pack.json`, and checked them against the cached retrieved texts (`tools.mjs text` and `grep`), fetching live pages where useful.
- **Sample** ([audit-sample.json](audit-sample.json), drawn by `tools.mjs sample 20261031 45` from the merged pack of 151 records and 61 links before the audit). Targeted: every record holding an earliest-located or most-developed role, every contesting record, every record in a register other than nonfiction, every record with an attested or claimed date and every record with a hazard note (104 records). Random: 45 of the remaining 47 records, by a seeded shuffle. All 61 links. Ten auditors took the 149 sampled records in batches of 15; two took the links.
- **Whole-pack readers.** One auditor read every statement, qualification, engagement rationale, missing element and document title for wording: labels, characterisation, political description in the pack's own words, evaluative verbs, priority words, motives, inferred influence and overstatement. One read the whole pack for scope discipline (Land's later political writing; political texts by others), for any quoted passage advocating violence, for the handling of the adjacent strands, for stretched criteria (at least 30 records across all propositions) and for attribution of pseudonymous or unsigned texts.
- **Adversarial verification.** Each finding went to a further fresh agent told to refute it against the source and the pack's rules, defaulting to "not upheld" where the finding misread a rule or the source did not bear it out.
- **Coverage.** The auditors report having checked 295 distinct record and link ids (the sampled records and links, plus records the whole-pack readers examined). Unsampled records are covered only by the whole-pack wording and scope reading and by mechanical verification. A bounded sample does not certify unsampled records.
- **Full findings**, with each verifier's reasoning, are in [audit/findings.json](audit/findings.json) (numbered `n`).

## Findings

140 findings: 20 material and 120 minor. Verification upheld 120 (16 material, 104 minor) and did not uphold 20 (4 material, 16 minor). Upheld findings by aspect: statement 29, wording 25, locator 17, stance 12, date 11, earliest located 7, scope 5, quotation 3, attribution 2, influence 1, other 8.

Material findings upheld (all applied):

- **Statements that said more than the text** (1, 43, 44, 45, 122): de Garis 1989 on W01 (a forecast of what will commonly be said, and a scenario the article calls popular in science fiction, had become his own statement); Moravec 1989 on W05 (the comparison is with a well-trained human, not a typist); Goertzel's hedged mention of Kurzweil had become Goertzel's own claim (W04); Negarestani's "pure contradictions" refers to holding two views together (W06); Williams and Srnicek's relay of Land states no identity of capital and intelligence (W06).
- **Stances** (3, 4, 25, 26, 35, 52, 134, 135): Faggella's quoted passage named no machine intelligence and was replaced by the essay's own passage on AGI (W01, stance kept); the Williams–Srnicek relay of Land becomes bears-on (W01, W06); Bostrom 2004's contest of W02 narrowed to what follows the quoted passage; de Garis 2009 concerns augmentation, not transfer (W03, now bears-on); Warwick's foreword does not dispute W04 (now bears-on); de Garis 1989 does not state W09 in its own voice (now bears-on); the 2007 "Old Nick" post joins two passages, neither of which states W06 (now bears-on).
- **Earliest-located notes** (11, 27, 36): the integration note said an earlier dated text had been found where the role had moved because another text's wording is attested earlier; the usual-name role sat on a text attested only from 2026.

Not upheld: 4 material (5: Dennett's contest of W01 kept; 46: the 2026 LessWrong post's contest of W06 kept; 89 and 133: the second part of Lê's 2026 conversation with Land, see below) and 16 minor.

## Dispositions

Each finding has an entry in `audit/fixes-<draft>.json`: 120 applied, 0 held, 20 not applied. A fresh agent per draft wrote the entries; a second fresh agent per draft checked each entry against the sources and the rules, corrected the patch where needed (de Garis 3 corrections, Land 3, Moravec 1, accelerationism 5, further texts none) and dry-ran it. [audit-fixes.mjs](audit-fixes.mjs) applies the entries to the drafts; `pack.json` is never edited by hand.

## Integrator's decisions after the audit

Made in [reconcile.mjs](reconcile.mjs) (steps 6–8) and logged in [reconcile-log.json](reconcile-log.json):

- **Lê's 2026 conversation with Land, part 2, removed.** Findings 89 and 133 were not upheld by their verifiers, who read the W08 criterion's "technological and economic process" as covering the passages. The integrator removed the record and its link anyway: the record's own missing element says the passages do not mention machine intelligence, and the part concerns Land's political views, which the scope excludes. The review note asks the maintainer to confirm.
- **Earliest located reassigned** across groups by the date of the wording after stance and date changes: W06 now rests on Land's remarks of March 2014, W09 on Moravec's "Genetic Takeover" (wording attested 2001).
- **Usual names narrowed** and the earliest-located-term role assigned mechanically, as the dataset's validation checks it (see [scope.md](scope.md)).

## Integration before the audit

[reconcile.mjs](reconcile.mjs) steps 1–5, run after drafting: two records on Moravec's undated preview page for _Robot_ removed (no event date); the 2007 Hyperstition post signed "Old Nick" kept under that name, not attributed to Land; the hazard note removed from three de Garis records where only forecast-war detail had been left unquoted (stated in the qualification instead) and kept on "Meltdown"; earliest-located roles reassigned across the five groups; two dataset links split into lists; Rees's word "precursor" put in quotation marks.

## Mechanical checks after all changes

[verification.json](verification.json): 321 quotations, each found in the retrieved text of its own source; no quotation over 50 words; every source within its quotation budget, counting the dataset's existing quotations of the same expression; no structural or merge problems (one earliest-located articulation per proposition, none dated after another; at most one earliest-located contesting record; one usual-name record where a name is used; roles allowed per stance; no loaded word outside quotation marks). Three warnings for "first" were read: "twenty-first century", "unless humans destroy themselves first" and de Garis's "the first true artilect" in a paraphrase of his argument; none is a priority claim by the pack.

## Retrieval limits

`web.archive.org` refuses this environment, so no archive capture was compared. Where a text is known only from a page retrieved in 2026, its wording is attested from 2026 and it cannot hold earliest located; the captures that could change a role are listed in the pack's retrieval failures and in the cross-family brief. "Circuitries" (1992) has no text layer; its passages are paraphrases checked by two auditors against page images. Land's posts of 2013–2017 on xenosystems.net, "Machinic Desire" (1993), "Teleoplexy" (2014) and the 2017 Jacobite essay were not read; W07 therefore rests on a 2024 relay.
