# Re-check of the capital and compute verifications in the research-debt pass (#42), 2026-10-26

**Status: complete for its scope (below).** Report only: no dataset record was changed. Corrections are proposals for a later PR after adjudication.

## Summary

| Items                                     | Count  | Agree | Disagree | Cannot verify |
| ----------------------------------------- | ------ | ----- | -------- | ------------- |
| Microsoft–OpenAI, October 2025 (05, 06)   | 2      | 2     | 0        | 0             |
| OpenAI–Oracle Stargate, July 2025 (11–13) | 3      | 0     | 0        | 3             |
| Amazon Q3 2025, Project Rainier (19, 20)  | 2      | 1     | 1        | 0             |
| Amazon–Anthropic, April 2026 (21–23)      | 3      | 3     | 0        | 0             |
| Anthropic–Google and Broadcom (28–30)     | 3      | 3     | 0        | 0             |
| **Total**                                 | **13** | **9** | **1**    | **3**         |

Scope: the 13 capital and compute claims whose evidence was re-checked in #42 (commit 7ea5778, `review/capital-compute-research-more-2026-10-15.md`), numbered as in that report. For each claim this check compared the claim and its evidence with the cited source. The fields checked were amount and bound, quantity, stage (announced, planned, committed, contracted, delivered, deployed, operational), date kind and precision, parties and direction, and the qualification. It also checked that no round's full amount is attributed to one participating investor.

Findings:

- **No amount, bound, stage or party error was found in the ten claims whose source could be re-read.** Every stored quotation matches the current publisher page verbatim. Every amount and bound matches its passage: $250B contracted; $5 billion announced; up to $20 billion conditional; more than $100 billion over ten years; up to 5 GW; up to one million TPUs; nearly 500,000 Trainium2 chips. Announced and planned arrangements stay announced or planned. No claim adds the Google and Broadcom capacities, sums Amazon's investments, or treats a commitment as spending.
- **One disagreement (minor): claim 19, `anthropic-rainier-2025`.** The edge records Anthropic using Project Rainier as of 2025-10-30. The cited passage states the cluster's launch and purpose ("to build and deploy Anthropic's leading Claude AI models"), not that Anthropic was using it. The statement's own wording is accurate. The qualification should say what the passage does and does not state.
- **Wording point, claim 23.** The unit "GW of Trainium capacity" rests on the page's summary bullet, not on the cited paragraph. The #42 note already says this. The locator should name both.
- **Cannot verify: claims 11–13 (OpenAI, Stargate and Oracle, 2025-07-22).** openai.com returned HTTP 403 to direct retrieval and to WebFetch. A reader-relay route, as #42 used, was not used here. web.archive.org is unreachable from this environment: `needs-archive-check`. Neither this check nor #42 has authenticated the July 2025 text against a dated copy. Claim 11's statement says "US" capacity, which the stored quotation does not contain. That word needs checking when the page is re-read.

## Method

- **Blind first.** For each claim, a packet was built from `data/claims.json` and `data/sources.json`. It held the statement, time, qualification, attributes, source address and locator, but not the stored evidence passage, its note or the #42 outcome table. Each source was read and its passage located, and each claim was judged against it. The stored passage, notes and #42 outcomes were read only after that. Blindness was partial: before the packets, this session had read the opening paragraph and retrieval table of the #42 report, which list the sources and say that all 13 were found supported.
- **Sources.** Re-retrieved on 2026-10-26 by direct HTTP, sequentially with pauses of about four seconds. Microsoft blog, 2025-10-28 (HTTP 200; `datePublished` 2025-10-28). Amazon Q3 2025 results page (200; the forward-looking-statements notice is dated October 30, 2025, and the CMS `datePublished` 2025-10-16 was not used, as in #42). Amazon–Anthropic page, 2026-04-20 (200). Anthropic, Expanding our use of Google Cloud TPUs and Services (200; `datePublished` 2025-10-23, `dateModified` 2026-09-28). Anthropic, Google and Broadcom compute (200; `datePublished` 2026-04-06, `dateModified` 2026-09-28). OpenAI, Stargate advances with 4.5 GW partnership with Oracle (403). Quotations were matched after normalising whitespace and markup. The Anthropic pages' current copies were modified after publication. The cited sentences were compared as served on 2026-10-26, not against dated captures.
- **Not done.** No archive copy was read (`needs-archive-check`). No secondary source was used to support any claim. Later events (for example reports about Abilene in 2026) are outside these records, as in #42.
- This is a machine check by the preparing model family ("same-family check"). It is not a cross-family check, not human source review and not editorial acceptance. A company announcement documents what the company announced, not payment, delivery or compliance.

## Disagreements to adjudicate

1. **Claim 19, `anthropic-rainier-2025`** (anthropic `uses_infrastructure` project-rainier; stage `deployed`; snapshot 2025-10-30). Source: "Launched Project Rainier, a massive AI compute cluster containing nearly 500,000 Trainium2 chips, to build and deploy Anthropic's leading Claude AI models." (Amazon, Amazon.com announces third quarter results, 2025-10-30, under "Some other highlights since the company's last earnings announcement include that Amazon:", second bullet). The passage reports that Amazon launched the cluster and states what it is for. It does not say that Anthropic was using it at that date. The statement ("Amazon reported launching Project Rainier to build and deploy Anthropic's Claude models") is accurate. The edge's predicate and stage go slightly further than the passage. A later page of the same publisher says use explicitly: "Anthropic is now actively using it to train and deploy Claude models" (Amazon, Amazon announces $5B Anthropic investment, up to $20B more, 2026-04-20, Project Rainier paragraph). That is a later snapshot, not evidence for 2025-10-30.  
   Proposed: Add to the qualification: "The cited passage states the cluster's launch and purpose; it does not state Anthropic's use at this date. Amazon's 2026-04-20 page states active use (later snapshot)." Optionally add the 2026-04-20 passage as a second evidence record for a separate 2026-04-20 snapshot. Keep the stage `deployed` for the cluster; whether the use edge needs its own stage is the maintainer's decision.

## Could not be verified

- **Claims 11, 12, 13** (`openai-oracle-capacity-2025`, `openai-abilene-use-2025`, `abilene-nvidia-gb200-2025`; source `source-oracle-stargate-2025`, OpenAI, 2025-07-22). Direct HTTP and WebFetch returned 403 on 2026-10-26. `needs-archive-check` for a dated capture near 2025-07-22. When re-read, confirm:
  - (11) that the passage or title supports "US" in the statement ("4.5 GW of additional US Stargate datacenter capacity"); the stored quotation reads "4.5 gigawatts of additional Stargate data center capacity";
  - (12) the "parts of the facility are now up and running" and "early training and inference workloads" sentences;
  - (13) the page's own date, since "June 2025" is derived from "last month" in a post dated 2025-07-22 (month precision, correctly not narrowed to a day).

## Per-item findings

Each entry gives the claim, this check's blind reading, the comparison and any proposed correction. Quotations are from the current publisher page retrieved 2026-10-26.

### Microsoft, The next chapter of the Microsoft–OpenAI partnership (2025-10-28)

- **05 `openai-azure-contract-oct-2025`** (openai `compute_capacity` microsoft; $250,000,000,000 exact; `contracted`; event 2025-10-28): **agree**. "OpenAI has contracted to purchase an incremental $250B of Azure services, and Microsoft will no longer have a right of first refusal to be OpenAI's compute provider." ("What has evolved:" list, bullet on Azure services). "Contracted" supports the stage. "Incremental" supports "additional". No duration is given, as the qualification says. The amount is a contract value from OpenAI to Microsoft. It is not an investment and is not confused with the same page's "$135 billion" stake valuation.
- **06 `openai-azure-rofr-oct-2025`** (openai `cloud_terms` microsoft; `contracted`; event 2025-10-28): **agree**. Same bullet. The page keeps "Azure API exclusivity until Artificial General Intelligence (AGI)" and "API products developed with third parties will be exclusive to Azure", which the qualification reflects. "Will no longer have" belongs to a "new definitive agreement" the companies say they signed, so `contracted` fits.

### OpenAI, Stargate advances with 4.5 GW partnership with Oracle (2025-07-22)

- **11 `openai-oracle-capacity-2025`**: **cannot verify** (`needs-archive-check`). See above.
- **12 `openai-abilene-use-2025`**: **cannot verify** (`needs-archive-check`).
- **13 `abilene-nvidia-gb200-2025`**: **cannot verify** (`needs-archive-check`).

### Amazon, Amazon.com announces third quarter results (2025-10-30)

- **19 `anthropic-rainier-2025`**: **disagree (minor)**. See Disagreement 1. The date kind (snapshot at the report date, no launch day inferred) is right. The bullet sits under highlights "since the company's last earnings announcement", so the launch falls between the Q2 and Q3 releases.
- **20 `rainier-trainium2-2025`** (project-rainier `uses_hardware_from` aws; 500,000 Trainium2 chips, approximate; `deployed`; snapshot 2025-10-30): **agree**. Same passage: "nearly 500,000 Trainium2 chips". "Nearly" is a figure just under 500,000. The `approximate` bound and the qualification ("not … exactly 500,000 installed chips") cover it. Trainium2 is named on the page as Amazon's "custom AI chip", so AWS as the hardware platform is supported.

### Amazon, Amazon announces $5B Anthropic investment, up to $20B more (2026-04-20)

- **21 `amazon-anthropic-five-billion-2026`** (amazon `investment_announced` anthropic; $5,000,000,000 exact; `announced`; event 2026-04-20): **agree**. "Separately, Amazon will invest $5 billion in Anthropic today and up to an additional $20 billion in the future tied to certain commercial milestones. This is in addition to the $8 billion Amazon previously invested in Anthropic." (paragraph beginning "Separately"). Amazon is the only investor the page names. The amount is Amazon's own and not a round total. "Will invest … today" is future-tense intent, so `announced` holds. No cumulative total is recorded, correctly.
- **22 `amazon-anthropic-conditional-2026`** (up to $20,000,000,000; `announced`; conditional): **agree**. Same passage. The `up_to` bound and the conditions ("Certain commercial milestones; details not disclosed") match. It is kept separate from the $5 billion, correctly.
- **23 `anthropic-aws-commitment-2026`** (anthropic `compute_capacity` aws; more than $100,000,000,000; up to 5 GW; `committed`; event 2026-04-20): **agree**, with a wording point. "today Amazon and Anthropic are deepening their collaboration with a commitment from Anthropic to spend more than $100 billion over the next ten years on AWS technologies. This encompasses current and future generations of Trainium … and tens of millions of Graviton cores … Anthropic will secure up to 5 gigawatts (GW) of capacity to train and power their advanced AI models, including significant Trainium3 capacity expected to come online this year." (paragraph beginning "Expanding on this success"). The bounds (`more_than`, `up_to`) and the stage match. The cited paragraph does not tie the 5 GW to Trainium. The summary bullet does: "Anthropic to secure up to 5 gigawatts (GW) of current and future generations of Amazon's Trainium chips". The period "Next ten years from April 2026" takes the start from the announcement date. The page says only "over the next ten years".  
  Proposed: Extend the locator to "Summary bullets (5 GW of Trainium chips) and paragraph beginning 'Expanding on this success'". Optionally change the period to "Over the next ten years (from the 2026-04-20 announcement; start date not stated)".

### Anthropic, Expanding our use of Google Cloud TPUs and Services (2025-10-23)

- **28 `anthropic-google-tpu-plan-2025`** (anthropic `compute_capacity` google; up to 1,000,000 TPUs; `planned`; event 2025-10-23): **agree**. "Today, we are announcing that we plan to expand our use of Google Cloud technologies, including up to one million TPUs, dramatically increasing our compute resources … The expansion is worth tens of billions of dollars and is expected to bring well over a gigawatt of capacity online in 2026." (opening paragraph). "Plan" supports `planned`, and "up to" supports the bound. The dollar and gigawatt figures stay qualitative in the record, correctly. The current copy was modified on 2026-09-28 and carries an unrelated related-story link. The cited sentences are unaffected.

### Anthropic, Anthropic expands partnership with Google and Broadcom for multiple gigawatts of next-generation compute (2026-04-06)

- **29 `anthropic-google-capacity-2026`** (anthropic `compute_capacity` google; `contracted`; event 2026-04-06): **agree**. "We have signed a new agreement with Google and Broadcom for multiple gigawatts of next-generation TPU capacity that we expect to come online starting in 2027." (opening paragraph). "Signed" supports `contracted`. No quantity, spend or split is given, and the record invents none. The note against adding the two counterparty edges is right.
- **30 `anthropic-broadcom-capacity-2026`** (anthropic `compute_capacity` broadcom; `contracted`; event 2026-04-06): **agree**. Same passage and the same qualification.
