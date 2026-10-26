# Christiano institutional episode: candidates re-verified, 2026-10-15

The parked branch `codex/christiano-institutional-episode` (commit `c93d07e`, 2026-09-28) proposed three unadmitted `held_role` candidates with no independent audit, and changed `scripts/review-seed.ts` to add an `--episode` mode. This pass re-verified each candidate against its primary source on current main (`02c5698`) and added those that held as ordinary records under current conventions. Nothing was merged or copied from the branch: its script change, research module, packet, starter and review sample are not used. The maintainer will delete the branch.

## Outcomes

| Candidate | Proposition                                                                                | Outcome                                       | Record                                      |
| --------- | ------------------------------------------------------------------------------------------ | --------------------------------------------- | ------------------------------------------- |
| PCI1-C01  | The 29 May 2013 MIRI team page capture lists Paul Christiano as Research Associate.        | **Not admitted: source not retrievable**      | none                                        |
| PCI1-C02  | Deep reinforcement learning from human preferences, arXiv v1, lists him with OpenAI.       | **Added**                                     | `christiano-openai-affiliation-2017`        |
| PCI1-C03  | NIST's announcement of 16 April 2024 says he was named head of AI safety at the U.S. AISI. | **Added**, with a new organisation and source | `christiano-us-aisi-head-of-ai-safety-2024` |

### PCI1-C01: 2013 MIRI listing

The only evidence is the Wayback Machine capture `20130529221123` of `intelligence.org/team/`. On 2026-10-15 every connection from this environment to web.archive.org was reset, in repeated attempts paced several minutes apart; archive.ph also failed, and a reader relay of the capture was refused (HTTP 403). The proposition could not be re-checked against the capture, so it was not admitted. The branch's 2026-09-28 check (HTTP 200, SHA-256 `0b470a80…`, Research Associates heading) is a prior machine record, not a re-verification.

Two currently served MIRI pages carry the same description with dates of 2012-05-08 and 2014-06-23. They were not used: they are current expressions, not dated captures, and they would make different propositions. Admitting C01 needs one successful retrieval of the capture; the record would follow the C02 pattern (`held_role`, role “Research Associate (team page listing)”, snapshot 2013-05-29, qualification that a listing is not employment, pay, exclusivity or an interval).

### PCI1-C02: 2017 OpenAI author affiliation

- **Checked:** `https://arxiv.org/pdf/1706.03741v1`, retrieved 2026-10-15 (HTTP 200, 3,238,650 bytes, SHA-256 `10d47f15…`, identical to the branch's recorded hash). Page 1 prints “Paul F Christiano / OpenAI” in the first author block and the stamp “arXiv:1706.03741v1 [stat.ML] 12 Jun 2017”. Contact details on the page were not recorded.
- **Record:** follows the existing paper-affiliation records (`jared-kaplan-openai-affiliation-2020`, `atlas-vaswani-brain`): `held_role` to the existing `openai` entity, role “Paper affiliation”, snapshot dated by the v1 stamp, reusing `source-human-preferences-paper-v1`. The evidence is a paraphrase, because a printed author block is not prose.
- **Qualification:** an author affiliation is not employment, a title, a start date or tenure.

### PCI1-C03: 2024 U.S. AI Safety Institute appointment announcement

- **Checked:** the NIST news page, retrieved directly 2026-10-15 (HTTP 200). First body paragraph: “Raimondo named Paul Christiano as head of AI safety”, among other members of the institute's executive leadership team, and describes the institute as “housed at the National Institute of Standards and Technology (NIST)”. Footer: “Released April 16, 2024, Updated April 8, 2026”.
- **Closer source tried:** the Department of Commerce release that the page links to (`commerce.gov/node/6681`) returned HTTP 403 directly and a challenge page through a reader relay. It was not used. Search-result summaries of it were not used as evidence.
- **New source:** `source-nist-us-aisi-leadership-2024`, with the footer dates and the limit that the 2026 update's scope and the release-day text are not authenticated.
- **New organisation:** `us-ai-safety-institute`, under its 2024 name only. Its description records that NIST describes it as housed at NIST, and that later names, reorganisation and legal continuity are not recorded. It is typed `organisation` because `held_role` takes organisations; no `unit_of` relation to NIST was added.
- **Qualification:** an announced appointment is not evidence of service, its length or a current role, and does not establish a departure from ARC.

## Effect on other views

Linking Christiano to OpenAI through C02 makes him one of OpenAI's people in its institutional dossier. The dossier now shows ten more records about him and his papers (181 instead of 171), and the test that fixes this count was updated with the reason.

## Status and limits

- Both new claims are seeds with `machine_checked` evidence. Nothing was editorially accepted.
- The check was made by the agent that wrote the records. It is not a fresh-context audit or human review. The branch's own review sample was never completed and is not imported.
- The rows added are listed in [`research-debt-before-2026-10-15.json`](research-debt-before-2026-10-15.json).
