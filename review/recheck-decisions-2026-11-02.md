# Earliest-located re-check: maintainer decisions 1 to 4, 2026-11-02

Applies the maintainer's decisions of 2026-11-02 on the open decisions of
[`recheck-apply-2026-11-02.md`](recheck-apply-2026-11-02.md) (the drafting
family's adjudication of the cross-family re-check,
[`earliest-located-recheck-2026-11-02.md`](earliest-located-recheck-2026-11-02.md),
Codex). Branch `recheck-decisions` from `main` at 1ae9a29 (v0.24.2).

## Decisions applied

1. **Ordinary-phrase name headlines: dropped (10).** Roles 8, 9, 13, 14, 16,
   17, 20, 22, 23, 25. No earliest located use of the name is headlined for
   these propositions; their usual names stay listed. Each is a correction
   note in its collection.
2. **Roles 18 and 19: dropped** with the ordinary phrases, as decision 1.
3. **Collection periods.** Risk debate widened from 2000 to 1993 (version 5:
   question, scope note and a search-note entry saying that 1993–1999 was not
   searched; the texts of those years are those the re-check found among the
   dataset's holdings). Its title already reads 1863–2026 because of B1 and
   A4, so it is unchanged. Of the 12 roles, 10 moved; 55 and 70 (Drexler) are
   held, see below. **Machine succession is not widened yet:** all four Butler
   roles (110, 113, 122, 125) are held because the held text could not be
   retrieved, so a title period of 1863 would name a text the collection does
   not show. The decision is recorded in its gaps note (version 5), and
   the choice between widening and the "antecedent" label is left to the
   admission of Butler's records: Butler is a single text 116 years before the
   collection's next, which is the case the antecedent option describes. The
   antecedent label was not used anywhere (it would need a schema field).
4. **Records admitted for the agreed moves.** One record per proposition for
   the earlier held text, with the stance of Codex's verdict and a passage
   quoted from the held source and matched mechanically against a retrieval of
   2026-11-02; the headline moved to it and its `underRecheck` entry cleared.
   Each record's evidence note cites the re-check and its role number as the
   cross-family pass. Dates keep their kind and precision; where the re-check
   compares on an attested basis (the 2013 compilation for Hanson's two posts,
   the announcement of 19 November 1996 for "Staring into the Singularity",
   the capture of 1 April 2023 for the GPT-4 System Card), the record carries
   that attested date.

**Result:** 31 headlines moved to new records, 12 name headlines dropped, 10
of the decided roles held. With the roles not decided here, **27 headlines remain
under re-check** (list below).

## Schema 2.29

Dropping a name headline while keeping the names needs a field: validation
otherwise asks for one earliest located use wherever a record's evidence uses a
usual name. `proposition.noTermHeadline` (`reason`, `recordedAt`) records the
decision; validation then expects no holder and cannot combine it with a
re-check of that headline; the page and the research starter show no name
headline. Documented in `docs/ontology.md` and `docs/dataset-format.md`
(format version unchanged, 1.9). Release **v0.25.0** (minor): collection versions raised (superintelligence 4, risk debate 5, Yudkowsky's arguments 4, machine succession 5, economics 5, AI and biosecurity 3, AI in science 3).

## Method

- Retrieval, 2026-11-02, by script, one request at a time, into the ignored
  `.local/recheck-decisions/`. 22 of the 27 texts the decided moves need were
  served directly; most bytes match the SHA-256 recorded at their earlier
  admission. The LessWrong post was read through the publisher's GraphQL API
  (first stored revision, 1.0.0, the version the dataset cites). Hanson's
  "Economic Growth Given Machine Intelligence" was read from the author's
  current host, byte-identical to the archived capture the source names.
- Not retrievable from this cloud session: web.archive.org (connection reset
  on every attempt; the operating guide notes cloud sessions cannot reach it)
  and Papers Past (bot protection). No route around either was attempted.
- Matching: `scripts/recheck-decisions-spec.py --verify` normalises Unicode
  compatibility forms, quotation marks, dashes, PDF line-break hyphenation,
  whitespace and case; "…" joins fragments that must occur in order; in
  mailing-list archives the correspondent's quoted lines are excluded, so a
  passage matches only the author's own text. All 36 quotations matched.
- Quotation limits (editorial policy; validation enforces them). Short
  messages have small budgets, so most records reuse a passage the dataset
  already quotes from the same text, which counts once. Where no passage
  fits within the limit, the role is held (106).
- Spec and data: `review/recheck-decisions-2026-11-02.json`, built by
  `scripts/recheck-decisions-spec.py` and applied by `scripts/apply-recheck.ts`;
  before-snapshot `review/recheck-decisions-before-2026-11-02.json`, first in
  the chain in `src/editorial/historical-views.ts`.

## Points for the maintainer's review

- **Role 21 (R16, name).** The text prints “slow-takeoff scenarios”; the
  listed name is “slow takeoff”. Validation matches names literally, so the
  spelling “slow-takeoff” was added to R16's usual names, as other
  propositions list spelling variants (“mesa-optimizer”/“mesa-optimiser”).
  Revert if a hyphenated spelling should not be listed.
- **Role 166 (D1).** The record's date (23 March 2023) and attestation
  (capture of 1 April 2023) are the re-check's reading of an archive capture
  that could not be reached here; the quotations were matched in the PDF as
  served now, whose bytes equal those of the dataset's admission. The
  dataset's other records of the card keep its date unknown. This follows the
  precedent of W03 (role 114), where the re-check's reading of a scan dated
  the record.
- **Roles 28 and 21** move a name headline to a contesting record (Bostrom
  2012 on W07; Yudkowsky 2001 on R16), as the re-check's verdicts give them.
  The articulation headline is unaffected.
- **R16 has contesting records but no earliest located contesting
  headline**, before and after this change; the 2001 record added here is now
  its earliest contesting text. Not decided here.

## Per-role table

Decision: the maintainer's decision applied (1–4). Records are seeds, machine
checked; no human editorial review.

| Role | Proposition                                                                        | Headline                               | Before → after                                                                | Decision | Basis                                                                                                                                                                                                                                                                                       |
| ---: | ---------------------------------------------------------------------------------- | -------------------------------------- | ----------------------------------------------------------------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|    8 | P2 AI models can simulate or predict the behaviour of cells (a "virtual cell")     | Earliest located use of the name       | Under re-check → dropped                                                      | 1        | Ordinary phrase (“virtual cell”): `noTermHeadline` set, usual names kept. Last holder `aib-arg-p2-tomita-2001`.                                                                                                                                                                             |
|    9 | P1 Predicted protein structures aid drug design                                    | Earliest located use of the name       | Under re-check → dropped                                                      | 1        | Ordinary phrase (“structure-based drug design”): `noTermHeadline` set, usual names kept. Last holder `aib-arg-p1-lyu-2024`.                                                                                                                                                                 |
|   12 | R03 Inner or deceptive misalignment                                                | Earliest located use of the name       | Under re-check → `rd-r03-rlo-2019-introduction`                               | 4        | New record, articulates (2019-05-31); 1 quotation(s) matched against `source-rlo-2019-introduction` as retrieved 2026-11-02.                                                                                                                                                                |
|   13 | R06 Difficulty of alignment                                                        | Earliest located use of the name       | Under re-check → dropped                                                      | 1        | Ordinary phrase (“alignment problem”): `noTermHeadline` set, usual names kept. Last holder `rd-r06-russell-2019-instrumental-convergence-thread`.                                                                                                                                           |
|   14 | R07 Risk of extinction or comparable catastrophe                                   | Earliest located use of the name       | Under re-check → dropped                                                      | 1        | Ordinary phrase (“risk of extinction”): `noTermHeadline` set, usual names kept. Last holder `rd-r07-cais-2023-statement`.                                                                                                                                                                   |
|   16 | R09 Catastrophic risk from misuse                                                  | Earliest located use of the name       | Under re-check → dropped                                                      | 1        | Ordinary phrase (“malicious use”): `noTermHeadline` set, usual names kept. Last holder `rd-r09-hendrycks-2023-overview-catastrophic`.                                                                                                                                                       |
|   17 | R12 Present harms deserve priority                                                 | Earliest located use of the name       | Under re-check → dropped                                                      | 1        | Ordinary phrase (“current harms”): `noTermHeadline` set, usual names kept. Last holder `rd-r12-bengio-2023-faq-catastrophic`.                                                                                                                                                               |
|   18 | R13 Capabilities will plateau                                                      | Earliest located use of the name       | Under re-check → dropped                                                      | 2        | Ordinary phrase (“diminishing returns”): `noTermHeadline` set, usual names kept. Last holder `rd-r13-marcus-2022-hitting-a-wall`.                                                                                                                                                           |
|   19 | R14 Language models lack agency or understanding                                   | Earliest located use of the name       | Under re-check → dropped                                                      | 2        | Ordinary phrase (“autocomplete”): `noTermHeadline` set, usual names kept. Last holder `rd-r14-marcus-2022-nonsense-on-stilts`.                                                                                                                                                              |
|   20 | R15 Open models reduce risk                                                        | Earliest located use of the name       | Under re-check → dropped                                                      | 1        | Ordinary phrase (“open source”): `noTermHeadline` set, usual names kept. Last holder `rd-r15-goertzel-pitt-2012-open-source-agi`.                                                                                                                                                           |
|   21 | R16 Takeoff will be gradual                                                        | Earliest located use of the name       | Under re-check → `rd-r16-yudkowsky-2001-event-horizon`                        | 4        | New record, contests (2001-01-24); 1 quotation(s) matched against `source-sl4-2001-01-24-yudkowsky-0101-0452` as retrieved 2026-11-02. The text prints “slow-takeoff”; that spelling is added to R16’s usual names.                                                                         |
|   22 | R17 Economic incentives will produce safety                                        | Earliest located use of the name       | Under re-check → dropped                                                      | 1        | Ordinary phrase (“incentives”): `noTermHeadline` set, usual names kept. Last holder `rd-r17-askell-2019-cooperation`.                                                                                                                                                                       |
|   23 | W01 Machines succeed humans as the leading intelligence                            | Earliest located use of the name       | Under re-check → dropped                                                      | 1        | Ordinary phrase (“post-biological”): `noTermHeadline` set, usual names kept. Last holder `ht-w01-moravec-1989-genetic-takeover`.                                                                                                                                                            |
|   25 | W03 Human minds transferred into machines                                          | Earliest located use of the name       | Under re-check → dropped                                                      | 1        | Ordinary phrase (“upload”): `noTermHeadline` set, usual names kept. Last holder `ht-w03-hanson-1994-if-uploads-come-first`.                                                                                                                                                                 |
|   28 | W07 The growth of intelligence as its own end                                      | Earliest located use of the name       | Under re-check → `ht-w07-bostrom-2012-superintelligent-will`                  | 4        | New record, contests (2012-05); 2 quotation(s) matched against `source-rd-bostrom-2012-superintelligent-will` as retrieved 2026-11-02.                                                                                                                                                      |
|   34 | C1 Behavioural tests as evidence of what a system is                               | Earliest located                       | Under re-check → `ts-c1-weizenbaum-1966`                                      | 4        | New record, articulates (1966-01); 2 quotation(s) matched against `source-th-a-eliza-1966` as retrieved 2026-11-02.                                                                                                                                                                         |
|   45 | R01 Orthogonality of intelligence and goals                                        | Earliest located text that contests it | Under re-check → `rd-r01-yudkowsky-1996-survival-ethic`                       | 3, 4     | New record, contests (1996-11-22); 1 quotation(s) matched against `source-extropians-1996-11-22-yudkowsky-3184` as retrieved 2026-11-02.                                                                                                                                                    |
|   47 | R02 Instrumental convergence                                                       | Earliest located                       | Under re-check → `rd-r02-clemmensen-1996-si-that-ate-chicago`                 | 3, 4     | New record, articulates (1996-08-31); 1 quotation(s) matched against `source-extropians-1996-08-31-clemmensen` as retrieved 2026-11-02.                                                                                                                                                     |
|   48 | R02 Instrumental convergence                                                       | Earliest located text that contests it | Under re-check → `rd-r02-yudkowsky-1996-survival-ethic`                       | 3, 4     | New record, contests (1996-11-22); 1 quotation(s) matched against `source-extropians-1996-11-22-yudkowsky-3184` as retrieved 2026-11-02.                                                                                                                                                    |
|   51 | R06 Difficulty of alignment                                                        | Earliest located text that contests it | Under re-check → `rd-r06-yudkowsky-1996-survival-ethic`                       | 3, 4     | New record, contests (1996-11-22); 1 quotation(s) matched against `source-extropians-1996-11-22-yudkowsky-3184` as retrieved 2026-11-02.                                                                                                                                                    |
|   53 | R08 Existential risk from misalignment or loss of control                          | Earliest located                       | Under re-check → `rd-r08-clemmensen-1996-thinking-about-the-future`           | 3, 4     | New record, articulates (1996-08-30); 1 quotation(s) matched against `source-extropians-1996-08-30-clemmensen` as retrieved 2026-11-02.                                                                                                                                                     |
|   54 | R08 Existential risk from misalignment or loss of control                          | Earliest located text that contests it | Under re-check → `rd-r08-yudkowsky-1996-survival-ethic`                       | 3, 4     | New record, contests (1996-11-22); 1 quotation(s) matched against `source-extropians-1996-11-22-yudkowsky-3184` as retrieved 2026-11-02.                                                                                                                                                    |
|   55 | R09 Catastrophic risk from misuse                                                  | Earliest located                       | Under re-check (held)                                                         | 3, 4     | Archive capture (web.archive.org) not reachable from the drafting session: Drexler, Engines of Creation ch. 11, capture of 1997-07-09. Not moved.                                                                                                                                           |
|   57 | R10a Intelligence brings benevolence or no drive to dominate                       | Earliest located text that contests it | Under re-check → `rd-r10a-clemmensen-1996-thinking-about-the-future`          | 3, 4     | New record, contests (1996-08-30); 1 quotation(s) matched against `source-extropians-1996-08-30-clemmensen` as retrieved 2026-11-02.                                                                                                                                                        |
|   58 | R10b Advanced AI can be kept under control by design                               | Earliest located                       | Under re-check → `rd-r10b-davis-2014-ethical-guidelines-superintelligence`    | 4        | New record, articulates (2014-10-23); 1 quotation(s) matched against `source-rd-davis-2015-ethical-guidelines` as retrieved 2026-11-02.                                                                                                                                                     |
|   60 | R11 Risk claims are speculative or unfalsifiable                                   | Earliest located text that contests it | Under re-check → `rd-r11-bostrom-2002-existential-risks`                      | 4        | New record, contests (2002-03); 1 quotation(s) matched against `source-rd-bostrom-2002-existential-risks` as retrieved 2026-11-02.                                                                                                                                                          |
|   67 | R16 Takeoff will be gradual                                                        | Earliest located                       | Under re-check → `rd-r16-hanson-2008-setting-the-stage`                       | 4        | New record, articulates (2008-11-18; wording attested 2013); 1 quotation(s) matched against `source-hanson-2008-setting-the-stage-miri-2013` as retrieved 2026-11-02. Dated, as the re-check sets out, by the 2013 compilation in which the wording was read.                               |
|   68 | R17 Economic incentives will produce safety                                        | Earliest located text that contests it | Under re-check → `rd-r17-vinge-1993-coming-technological-singularity`         | 3, 4     | New record, contests (1993-12); 1 quotation(s) matched against `source-vinge-1993-ntrs` as retrieved 2026-11-02.                                                                                                                                                                            |
|   69 | R17 Economic incentives will produce safety                                        | Earliest located                       | Under re-check → `rd-r17-hanson-2008-friendly-projects-vs-products`           | 4        | New record, articulates (2008-12-05; wording attested 2013); 1 quotation(s) matched against `source-hanson-2008-friendly-projects-vs-products-miri-2013` as retrieved 2026-11-02. Dated, as the re-check sets out, by the 2013 compilation in which the wording was read.                   |
|   70 | R07 Risk of extinction or comparable catastrophe                                   | Earliest located                       | Under re-check (held)                                                         | 3, 4     | Archive capture (web.archive.org) not reachable from the drafting session: Drexler, Engines of Creation ch. 11, capture of 1997-07-09. Not moved.                                                                                                                                           |
|   72 | R10a Intelligence brings benevolence or no drive to dominate                       | Earliest located                       | Under re-check → `rd-r10a-yudkowsky-1996-survival-ethic`                      | 3, 4     | New record, articulates (1996-11-22); 1 quotation(s) matched against `source-extropians-1996-11-22-yudkowsky-3184` as retrieved 2026-11-02.                                                                                                                                                 |
|   75 | R10b Advanced AI can be kept under control by design                               | Earliest located text that contests it | Under re-check → `rd-r10b-vinge-1993-coming-technological-singularity`        | 3, 4     | New record, contests (1993-12); 1 quotation(s) matched against `source-vinge-1993-ntrs` as retrieved 2026-11-02.                                                                                                                                                                            |
|   80 | Y04 A short instruction such as making everyone happy                              | Earliest located text that contests it | Under re-check → `yk-y04-extropians-1996-12-08-yudkowsky-3761-c`              | 4        | New record, contests (1996-12-08); 1 quotation(s) matched against `source-extropians-1996-12-08-yudkowsky-3761` as retrieved 2026-11-02.                                                                                                                                                    |
|   87 | Y11 A slow takeoff will leave time to adjust                                       | Earliest located text that contests it | Under re-check → `yk-y11-extropians-1998-09-07-yudkowsky-2209-c`              | 4        | New record, contests (1998-09-07); 1 quotation(s) matched against `source-extropians-1998-09-07-yudkowsky-2209` as retrieved 2026-11-02.                                                                                                                                                    |
|   88 | Y12 Safety evaluations would catch a dangerous system                              | Earliest located text that contests it | Under re-check → `yk-y12-extropians-1996-12-31-yudkowsky-5142-c`              | 4        | New record, contests (1996-12-31); 1 quotation(s) matched against `source-extropians-1996-12-31-yudkowsky-5142` as retrieved 2026-11-02.                                                                                                                                                    |
|   89 | Y13 AGI is decades away, so the problem can wait                                   | Earliest located text that contests it | Under re-check (held)                                                         | 4        | Archive capture (web.archive.org) not reachable from the drafting session: “Staring into the Singularity” 1.2.1, capture of 2000-12-04. Not moved.                                                                                                                                          |
|   94 | Y18 A superintelligence would leave Earth alone                                    | Earliest located text that contests it | Under re-check → `yk-y18-extropians-1998-09-07-yudkowsky-2171-c`              | 4        | New record, contests (1998-09-07); 1 quotation(s) matched against `source-extropians-1998-09-07-yudkowsky-2171` as retrieved 2026-11-02.                                                                                                                                                    |
|  104 | Y27 Run experiments and see what happens                                           | Earliest located text that contests it | Under re-check → `yk-y27-extropians-2000-09-05-yudkowsky-4277-c`              | 4        | New record, contests (2000-09-05); 1 quotation(s) matched against `source-extropians-2000-09-05-yudkowsky-4277` as retrieved 2026-11-02.                                                                                                                                                    |
|  106 | Y28 The developers know what they are doing                                        | Earliest located text that contests it | Under re-check (held)                                                         | 4        | Quotation limit: the message (212 words) already carries its 21 quoted words, so the passage on reason 3 cannot be quoted. Not moved.                                                                                                                                                       |
|  108 | Y30 It will probably turn out fine                                                 | Earliest located text that contests it | Under re-check → `yk-y30-extropians-1999-08-01-yudkowsky-1386-c`              | 4        | New record, contests (1999-08-01); 2 quotation(s) matched against `source-extropians-1999-08-01-yudkowsky-1386` as retrieved 2026-11-02.                                                                                                                                                    |
|  110 | W01 Machines succeed humans as the leading intelligence                            | Earliest located                       | Under re-check (held)                                                         | 3, 4     | Archive capture (web.archive.org) not reachable, and Papers Past refuses scripted requests: Butler, “Darwin among the Machines” (1863). Not moved.                                                                                                                                          |
|  113 | W02 Succession by machines would be acceptable or desirable                        | Earliest located text that contests it | Under re-check (held)                                                         | 3, 4     | Archive capture (web.archive.org) not reachable, and Papers Past refuses scripted requests: Butler, “Darwin among the Machines” (1863). Not moved.                                                                                                                                          |
|  119 | W05 Superiority by many orders of magnitude                                        | Earliest located                       | Under re-check (held)                                                         | 4        | Archive capture (web.archive.org) not reachable from the drafting session: “Staring into the Singularity” 1.2.1, capture of 2000-12-04. Not moved.                                                                                                                                          |
|  121 | W07 The growth of intelligence as its own end                                      | Earliest located text that contests it | Under re-check → `ht-w07-clemmensen-1996-si-that-ate-chicago`                 | 4        | New record, contests (1996-08-31); 1 quotation(s) matched against `source-extropians-1996-08-31-clemmensen` as retrieved 2026-11-02.                                                                                                                                                        |
|  122 | W08 Accelerate rather than restrain                                                | Earliest located text that contests it | Under re-check (held)                                                         | 3, 4     | Archive capture (web.archive.org) not reachable, and Papers Past refuses scripted requests: Butler, “Darwin among the Machines” (1863). Not moved.                                                                                                                                          |
|  123 | W08 Accelerate rather than restrain                                                | Earliest located                       | Under re-check → `ht-w08-yudkowsky-1996-staring-into-the-singularity`         | 4        | New record, articulates (1996-11-18; wording attested 1996-11-19); 1 quotation(s) matched against `source-extropians-1996-11-19-yudkowsky` as retrieved 2026-11-02.                                                                                                                         |
|  124 | W09 Machine intelligence as a physical or cosmic process                           | Earliest located text that contests it | Under re-check → `ht-w09-lanier-2000-one-half-a-manifesto`                    | 4        | New record, contests (2000-11-10); 1 quotation(s) matched against `source-ht-lanier-2000-half-manifesto` as retrieved 2026-11-02.                                                                                                                                                           |
|  125 | W09 Machine intelligence as a physical or cosmic process                           | Earliest located                       | Under re-check (held)                                                         | 3, 4     | Archive capture (web.archive.org) not reachable, and Papers Past refuses scripted requests: Butler, “Darwin among the Machines” (1863). Not moved.                                                                                                                                          |
|  132 | G04 Essential unautomated tasks bottleneck growth                                  | Earliest located                       | Under re-check (held)                                                         | 4        | Archive capture (web.archive.org) not reachable from the drafting session: Hanson, “Is a Singularity Just Around the Corner?”, capture of 1999-01-28. Not moved.                                                                                                                            |
|  143 | M05 Machines cheaper than labour at every task                                     | Earliest located                       | Under re-check → `ec-m05-hanson-economic-growth-given-machine-intelligence-a` | 4        | New record, articulates (2000-08-19; wording attested 2000-08-19); 2 quotation(s) matched against `source-hanson-economic-growth-given-machine-intelligence` as retrieved 2026-11-02.                                                                                                       |
|  148 | M09 Recent entry of machine intelligence into mainstream economics                 | Earliest located                       | Under re-check → `ec-m09-hanson-economic-growth-given-machine-intelligence-a` | 4        | New record, articulates (2000-08-19; wording attested 2000-08-19); 1 quotation(s) matched against `source-hanson-economic-growth-given-machine-intelligence` as retrieved 2026-11-02.                                                                                                       |
|  166 | D1 Currently available AI systems increase an actor's biological-misuse capability | Earliest located                       | Under re-check → `ab-arg-d1-gpt4-card-articulates`                            | 4        | New record, articulates (2023-03-23; wording attested 2023-04-01); 2 quotation(s) matched against `source-eval-ontology-i-gpt4-card` as retrieved 2026-11-02. Date (23 March 2023) and attestation (capture of 1 April 2023) as the re-check read them; the archive was not reachable here. |
|  170 | D6 Public release of model weights increases biological misuse risk                | Earliest located                       | Under re-check → `ab-arg-d6-sandbrink-articulates`                            | 4        | New record, articulates (2023-06-24); 1 quotation(s) matched against `source-ab-sandbrink-2023` as retrieved 2026-11-02.                                                                                                                                                                    |

## Still under re-check: 27

- **Held from decisions 3 and 4 (10):** 55, 70, 89, 110, 113, 119, 122, 125,
  132 (held text is an archive capture or Papers Past, not retrievable here);
  106 (quotation limit).
- **Decision 5, stance reclassifications, not decided (7):** 39, 102, 105,
  160, 165, 169, 174.
- **Decision 6, sense or precision, not decided (4):** 81, 99, 139, 173.
- **Decision 7, criteria, not decided, and undecidable (3):** 65, 66, 162.
- **Undecidable (3 more):** 5, 112, 126.

`docs/backlog.md` (D25) lists them with next steps.

## Checks

On `recheck-decisions` after merging `origin/main` (#138, no rebase; README taken from main, coverage block regenerated in `docs/development.md`):

- `scripts/recheck-decisions-spec.py --verify`: 36 of 36 quotations matched; the spec reproduces from the stored data.
- `scripts/apply-recheck.ts --spec review/recheck-decisions-2026-11-02.json --check`: stored records match.
- `pnpm validate:data`: 2,129 entities, 5,816 claims, 2,008 sources, 7,934 evidence.
- `pnpm audit:consistency`: no high findings.
- `pnpm check`: format, lint, typecheck, 910 unit tests, build, bundle budget (no limit raised).
- `pnpm release 0.25.0 --check`: reproduces byte for byte.
- `pnpm check:privacy`: passed.
- Full browser suite in two batches with a local Playwright config using the bundled Chromium instead of the msedge channel (deleted afterwards; port 4173 left free): 111 passed; 213 passed and 1 failed, the expected M05 headline assertion, updated, after which `propositions.spec.ts` passed (11).
- The risk-debate page read in the preview: R06 shows no name headline; R16 and R01 show the moved records. Console: only the analytics beacon refused on localhost.
