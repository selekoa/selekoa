# Illinois Public Act 104-0538: check of 2026-11-04

**16/16 items answered:** all 15 Part A cells are **stated**; the Part B standing record is fully supported. Full answers, verbatim passages (each at most 50 words), section/page locators and retrieval records are in [the JSON report](cross-family-check-2026-11-04.json).

**Blind order kept.** All Part A answers were committed and pushed in [`c981803`](https://github.com/futurelightcone/selekoa-dev/commit/c981803b6c4e19219a6459deead4917ece3efc76) before the verdict file was opened. The pack, verification, audit, drafts and review note were not opened for research. The required privacy scan processed indexed files without exposing their contents. The final comparison preserves every blind status, answer and passage.

| Cell         | Question             | Status | Comparison                     |
| ------------ | -------------------- | ------ | ------------------------------ |
| il-aisma:Q01 | Who is covered       | stated | New answer; pack not retrieved |
| il-aisma:Q02 | Threshold            | stated | Agree                          |
| il-aisma:Q03 | Safety framework     | stated | New answer; pack not retrieved |
| il-aisma:Q04 | Framework published  | stated | New answer; pack not retrieved |
| il-aisma:Q05 | Risk evaluation      | stated | New answer; pack not retrieved |
| il-aisma:Q06 | Outside assessment   | stated | New answer; pack not retrieved |
| il-aisma:Q07 | Incident reporting   | stated | New answer; pack not retrieved |
| il-aisma:Q08 | Model information    | stated | New answer; pack not retrieved |
| il-aisma:Q09 | Whistleblowers       | stated | New answer; pack not retrieved |
| il-aisma:Q10 | Adopted or signed    | stated | New answer; pack not retrieved |
| il-aisma:Q11 | In force             | stated | New answer; pack not retrieved |
| il-aisma:Q12 | Duties apply from    | stated | New answer; pack not retrieved |
| il-aisma:Q13 | Penalties            | stated | New answer; pack not retrieved |
| il-aisma:Q14 | Enforcer             | stated | New answer; pack not retrieved |
| il-aisma:Q15 | Frameworks and codes | stated | New answer; pack not retrieved |

Part A counts: **1 agree, 0 disagree, 0 partly; 14 not comparable** because the pack recorded retrieval failures rather than legal answers. Those 14 cells have now been answered from the Act, not treated as agreements with missing evidence. Part B adds **1 agree**: verbatim **yes**, locator **yes**, support **full**, dates/kinds **yes**, misleading alone **no**, overstatement **none**. Combined comparable items: **2 agree, 0 disagree, 0 partly**.

Conditions to preserve: the compute and revenue tiers; the 2028 framework start and later-of audit trigger; 72-hour reporting from the specified knowledge trigger and the conditional 24-hour disclosure; necessary redactions; separate general and disclosure penalties. Approval is **July 6, 2026**; effect is **January 1, 2027**. The order's September 22 date is not a signing date for the Act. No developer compliance is inferred.

The Act has **10,499 words**: all 56 pages, including repeated amended FOIA versions, excluding running identifiers; exponent typography normalized and whitespace-delimited tokens counted. Unfiltered extraction: **11,060**. The JSON gives the reproducible method.

Sequential direct HTTP returned **200 for all three sources**, using the listed Act and bill-history archive captures with an eight-second pause between archive requests. **No source retrieval failures**; an initial sandbox access block was resolved. SHA-256 of every retrieved copy:

| Copy                        | SHA-256                                                            | Preparer match                     |
| --------------------------- | ------------------------------------------------------------------ | ---------------------------------- |
| Act PDF                     | `f10cd7d854d5a6e1ab2c5e982e458d744abbfbdafde97f897ae03d1d8069f71f` | Yes                                |
| Bill history, gzip response | `4a6854587c2e36e0eeec90a2ad14f4108a6a4281058b90deef712e8c8b40b859` | Encoded response; see decoded copy |
| Bill history, decoded HTML  | `2aa768a35f7ef8e069b100c34bbc29af444ce8139c39cc1e9e57eca9176c6e4e` | Yes                                |
| Executive order HTML        | `913468f996ec852497d82ab29dc07811e9df413f7316d08f55b7c2a36ed7be6b` | No; fresh copy checked             |

Checks before each push: `npx prettier --check` on both reports, `pnpm check:privacy` against the staged index, and whitespace checks. Passage matching and length checks also passed. pnpm dependency auto-installation is disabled for the privacy invocation; the check script is unchanged.

Only these two reports changed. No pull request, pack edit or application admission. Next decision: separately authorize reconciliation of the 14 previously unretrieved cells.
