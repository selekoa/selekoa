# Lab genealogy: audit

A bounded fresh-context machine audit of the candidate records, run on 2026-10-15/16 under the [editorial policy](../../docs/editorial-policy.md#machine-first-risk-based-editorial-workflow). The auditors and the preparer are the same model family (Claude), so this is a same-family audit; it does not satisfy the cross-family check, which is prepared separately ([gpt-check-input-2026-10-16.md](gpt-check-input-2026-10-16.md)) and has not been run. A sample does not certify the records outside it.

## Stages before the audit

1. **Mechanical checks while drafting.** Every draft passed `tools.mjs check`: record shape, entity references, date kinds and formats, required role on roles and departures, rejected sources (Wikipedia and similar), loaded wording, reason wording without an attributed `statedReason`, and every verbatim passage (quote or paraphrase anchor) found in the retrieved text, within the quotation limits.
2. **Editorial consistency pass** (one fresh-context pass over all seven first drafts, before the two gap-fill drafts). It split five records that each carried two propositions (a trustee appointment and a later step-down, for example), removed one duplicate across drafts (Leike joining Anthropic), aligned statement form, dates and reporting qualifications in about 240 records, removed private matters (health and personal circumstances) in three places and expressions of feeling or judgement in seven, attributed every stated reason, brought two sources within the quotation limit, and removed two author e-mail addresses that had come in with quoted paper text. The gap-fill passes were then briefed with the resulting conventions ([drafting-brief.md](drafting-brief.md#conventions-added-after-the-editorial-consistency-pass)).

## Selection

446 records at the time of the audit. Selected: 116.

| Reason for selection                                                                 | Records |
| ------------------------------------------------------------------------------------ | ------: |
| Random sample, 20% of 446 (seed 20261016, `tools.mjs sample 20 20261016`)            |      90 |
| Every record carrying a reason stated by the person or organisation (`statedReason`) |      10 |
| Departures and structural events dated 2026 (most recent, least corroborated)        |      24 |
| Licensing-and-hiring agreements (proposed predicate)                                 |       4 |
| Consequential 2026 moves (Dean, Shazeer, Hassabis)                                   |       4 |
| Inferred or not-supported records                                                    |       2 |

A record selected for several reasons is counted once in the 116; 80 were selected only at random. All ten stated-reason records were audited: Leike's and Schulman's departures from OpenAI, Muehlhauser's step-down from Anthropic's board, the four Long-Term Benefit Trust step-downs (Matheny, Bahl, Robinson, Cuéllar), Adept's June 2024 update, Hassabis's move to Chair of Google DeepMind and Weil's departure from OpenAI.

## Method

Three separate fresh-context auditor passes (Claude subagents; model as served in this session, not otherwise identified), each given about a third of the selection as a file of records (statement, subject, predicate, object, time, role, qualification, derivation, resolution, stated reason, evidence with locator, passage and source metadata) and a written brief. They were told not to read the drafts, the pack, the drafting notes or any verification output. Each retrieved every cited source again into its own audit cache (`LG_CACHE=audit`), by the source's route, and checked: quote verbatim at the locator; support for the statement (identity, role wording, organisation, date and its kind and precision, stage); anything in the statement or qualification beyond the source; source role; attribution of any reason; loaded or private content. Results were written as JSON to the ignored local cache and are summarised here.

## Results

| Verdict | Records |
| ------- | ------: |
| ok      |      84 |
| minor   |      31 |
| problem |       1 |

Two of the minor verdicts are "not verified": the source could not be retrieved by the auditor (Adept's 2022 launch post returns a Cloudflare challenge to every route; the second post of a Threads thread was not returned by the relay). No auditor found a loaded word, an inferred motive or private content in any record. Every stated reason was found to be the speaker's own wording, attributed to the person or organisation that stated it. Health reasons present in three sources (Greg Yang's and Fidji Simo's posts; TechCrunch on Lilian Weng) were confirmed to be left out of the records.

### The problem

`lg-gc-tongyi-division-token-foundry-2026`. The Paper's sentence reads "6月8日，澎湃新闻记者获悉，阿里巴巴宣布合并…" (on 8 June our reporter learned that Alibaba announced the merger). The record dated Alibaba's announcement to 8 June. That date is when the reporter learned of it. **Fixed:** the statement now says that The Paper reported on 14 June 2026 that its reporter had learned on 8 June that Alibaba had announced the merger; the date kind is unknown, with a note that the announcement was on or before 8 June; the quote now includes the 获悉 clause.

### Minor findings and dispositions

| Record                                          | Finding                                                                                      | Disposition                                                                                                       |
| ----------------------------------------------- | -------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| `lg-deal-microsoft-inflection-agreement-2024`   | CMA summary carries no date (publication date from GOV.UK); "announced" understates          | Fixed: date basis stated; stage removed, qualification explains                                                   |
| `lg-gw-le-google-experiments-2012`              | Locator slightly off; role predicate vs. unestablished employment                            | Locator fixed; predicate kept (Google's post presents the work as led by him), qualification says so              |
| `lg-gw-weng-thinking-machines-departure-2026`   | Qualification said the post "says only" what it summarised                                   | Fixed; the source title (TechCrunch's, naming a health reason) is kept as bibliographic data: maintainer decision |
| `lg-mx-kroiss-cofounded-xai`                    | Quoted passage lacks "cofounder"                                                             | Fixed: supporting quote from the preceding paragraph added                                                        |
| `lg-mx-nordeen-xai-departure-2026`              | Event date on the report day; source says "this week"                                        | Fixed: the record is about the report; note says the departure was on or before that date, day unknown            |
| `lg-new-mensch-deepmind-2022`                   | ★ means "Equal contributions", on four authors, not "lead authors" (three)                   | Fixed in the inference rationale; contact address replaced by a paraphrase with a domain anchor                   |
| `lg-new-tay-reka-departure-2024`                | Locator paragraph 1 → 2                                                                      | Fixed; co-founder context added                                                                                   |
| `lg-oai-simo-departure-2026`                    | Role title not carried by the record's evidence                                              | Fixed: role names its source, which is added as context                                                           |
| `lg-oai-weil-cpo-2024`                          | Qualification asserted a later move without evidence                                         | Fixed: sentence removed; pointer to the departure record                                                          |
| `lg-deal-google-character-ai-agreement-2024`    | Qualification said the source does not call it an acquisition; it says "reverse acqui-hires" | Fixed as suggested; context anchors added                                                                         |
| `lg-deal-parmar-cofounded-adept`                | Not verified (source blocked)                                                                | Unchanged; drafting retrieval matched; fresh retrieval also blocked (see verification)                            |
| `lg-gc-jia-lei-baidu-application-model-2025`    | Same "reporter learned" dating as the problem                                                | Fixed (see family expansion)                                                                                      |
| `lg-gc-wu-yonghui-google-deepmind-2023`         | Locator slightly off                                                                         | Fixed                                                                                                             |
| `lg-goo-hassabis-alphabet-chief-scientist-2026` | Undated author page used as support for an announcement                                      | Fixed: moved to context                                                                                           |
| `lg-goo-model-teams-to-gdm-2024`                | Section heading wrong                                                                        | Fixed                                                                                                             |
| `lg-mx-aldahle-departure-2026`                  | Role title from a source not in the record                                                   | Fixed: role names its source, added as context                                                                    |
| `lg-mx-dai-xai-departure-2026`                  | Quote spans two paragraphs                                                                   | Locator fixed to paragraphs 2–3                                                                                   |
| `lg-mx-lecun-fair-chief-scientist-2025`         | Not verified (second post of the thread not returned)                                        | Unchanged; drafting retrieval matched; fresh retrieval matched                                                    |
| `lg-mx-xai-spacexai-name-2026`                  | Nothing retrieved states the posting account is the former xAI account                       | Fixed: statement names the account as displayed; basis recorded; identity of the account left unestablished       |
| `lg-new-goshen-ai21-cofounder`                  | "Roster not complete" stated as fact; rests on reporting                                     | Fixed (and the same in `lg-new-shoham-ai21-cofounder`)                                                            |
| `lg-oai-schulman-departure-2024`                | Role title from a source not in the record                                                   | Fixed: role names its source, added as context                                                                    |
| `lg-deal-google-windsurf-agreement-2025`        | Licence stated in The Verge's own voice, not as Google's statement                           | Fixed as suggested                                                                                                |
| `lg-deal-perella-character-ai-interim-ceo-2024` | Qualification asserted a later CEO appointment without evidence                              | Fixed: pointer to the record that carries it                                                                      |
| `lg-goo-dean-departure-google-2026`             | Statement added "at Google" to "after a 27-year run"                                         | Fixed: statement keeps the source's words; reading as Google tenure stays marked inferred                         |
| `lg-goo-suleyman-leaves-deepmind-2019`          | Role "head of Applied AI" rests on reporting about 2014, not about 2019                      | Fixed: role "not stated in the post", reporting moved to context                                                  |
| `lg-gw-laskin-deepmind-reward-models`           | Gemini post-training is Google DeepMind-era; linked to DeepMind                              | Relinked to Google DeepMind; the source's "At DeepMind" kept in the quote; an editorial reading, noted            |
| `lg-mx-lebrun-cofounded-ami`                    | Qualification said no titles; the page markup gives roles on hover                           | Fixed                                                                                                             |
| `lg-mx-wu-xai-departure-2026`                   | Role "Co-founder" not in the cited post                                                      | Fixed: role names its source, added as context                                                                    |
| `lg-mx-yang-cofounded-xai`                      | Quote spans paragraphs 2–3                                                                   | Locator fixed (and in the four other records that use the same passage)                                           |
| `lg-mx-zhang-cofounded-xai`                     | Same                                                                                         | Locator fixed                                                                                                     |
| `lg-new-zoph-tml-cofounder`                     | Locator paragraph 5 → 6                                                                      | Fixed                                                                                                             |

## Expansion to the affected families

The policy requires a material error to widen checking to the affected relation family. The problem and three recurring kinds of minor finding were checked across all 446 records by a separate correction pass, which read the cached source texts:

- **Dates that rest on a report "learning" of something** (获悉, 了解到, "has learned", "according to people familiar"): about 85 records reviewed. Changed: four more Chinese reporting records (Zhou Jingren's Chief Scientist appointment, now dated to the report; Wang Haifeng and Wu Tian at Baidu, as for Jia Lei), and the time notes of Shashua's reported departure and Murati's 2024 departure.
- **Role wording carried by the record's own evidence:** all 356 records with a role checked, 146 flagged automatically and read. About 20 changed: invented roles replaced by "not named in the source", titles from another source marked as such with that source added as context, quotes extended to carry the title.
- **Qualifications asserting facts the evidence does not carry:** all 446 read. About 45 now have context evidence for what they assert; about 15 assertions were removed (for example search-snippet claims, "reports differ" without a cited report, extra career facts, an advisor credit not found in the retrieved launch text).

In all, about 120 records changed and 80 evidence items were added (mostly context). After the corrections every draft passed `check`; `verify` matched all 623 verbatim passages against the drafting retrieval.

## Fresh re-verification

Every one of the 212 sources was retrieved a second time into a separate cache (`tools.mjs refetch`, by the route that worked for the drafting retrieval), and every passage was matched again (`tools.mjs verify fresh`): 618 of 623 matched. The five others are from one source, Adept's 2022 launch post, which now returns a Cloudflare challenge to every route; they are recorded as not retrieved, not as mismatches. 33 sources' text layers differ from the drafting retrieval (mostly page furniture such as related-article lists); none of the differences removed a quoted passage. See [verification.json](verification.json).

## Addendum: safety and policy leadership records

After the audit above, a tenth drafting pass added 31 records on safety, alignment, preparedness and policy leadership changes in 2023–2026 (OpenAI's 2024 departures among them; prefix `lg-gs-`). It proposed a further predicate, `unit_disbanded`, for teams that ceased to exist within their parent (the pass had first used `combined_into`, which means an organisational combination; the coordinator replaced it). Every one of the 31 records was audited by a fourth fresh-context auditor pass, with the same brief, retrieving all 23 cited sources again: 22 ok, 9 minor, no problem. Three of the 31 carry stated reasons (Kokotajlo, Brundage, Campbell); the auditor found each to be the person's own professional reason in their own cited text. Two departure notes whose reasons are given only in an image or in a relayed note have no reason recorded.

| Record                                        | Finding                                                                                | Disposition                                                                               |
| --------------------------------------------- | -------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| `lg-gs-superalignment-team-absorbed-2024`     | OpenAI's confirmation covers "no more"; "absorbed" is WIRED's own sentence             | Fixed: statement and qualification attribute each part to its speaker                     |
| `lg-gs-candela-openai-preparedness-2024`      | Qualification said Altman's statement was "on X"; the report does not say where        | Fixed                                                                                     |
| `lg-gs-weng-openai-preparedness-2024`         | Same                                                                                   | Fixed                                                                                     |
| `lg-gs-agi-readiness-team-distributed-2024`   | The cited post states a plan, not that the team ended                                  | Fixed: stage announced; Campbell's later reference to "the dissolution" added as evidence |
| `lg-gs-kokotajlo-openai-departure-2024`       | Locator; Business Insider quoted the same profile wording in May 2024                  | Fixed                                                                                     |
| `lg-gs-campbell-openai-departure-2024`        | Role is a team she moved to earlier, not stated as current when she left               | Fixed: role "not named in the post"                                                       |
| `lg-gs-sharma-anthropic-departure-2026`       | Role from a source not in the record                                                   | Fixed: role names its source, added as context                                            |
| `lg-gs-mission-alignment-team-disbanded-2026` | Note cited a report (Platformer) not in the record; shortlink instead of canonical URL | Fixed                                                                                     |
| `lg-gs-glaese-openai-head-of-alignment-2026`  | The title may be WIRED's description, not the memo's                                   | Fixed: statement attributes the title to WIRED                                            |

The auditor also noted a dating conflict for Quiñonero Candela's move from Preparedness (Engadget: July 2025; his own post and Obsolete: April–June 2025); both records now name it. After the fixes all 678 passages matched the drafting retrieval and 673 the fresh retrieval (the other five are Adept's blocked 2022 post).

## Limits

- Same-family audit. A machine audit is not human review, and agreement between passes of one model family is not independent confirmation.
- The sample is 20% random plus targeted records; records outside it rely on the mechanical checks and the family-wide expansion above.
- Sources read through the reader relay are the publisher's current pages as the relay rendered them; no archive capture authenticates earlier wording. Undated company pages give roles as shown at retrieval.
- 131 of 477 records (after the addendum) have no supporting primary passage and rest on news reporting or other secondary sources (mostly Meta and xAI, the later gap-fill labs and Chinese labs, where primary texts could not be retrieved). Each says so; they are listed in the cross-family brief as targeted items.
