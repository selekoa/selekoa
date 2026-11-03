# Decision sheet: Laws compared

The pack compares what nine binding instruments that address developers of frontier or general-purpose AI models (EU AI Act and its Code of Practice, California SB 53, New York's RAISE Act in two versions, two Chinese measures, and two US federal texts since revoked or announced for rescission) say on the same fifteen questions; every answer quotes the text. The decision that matters most is **5, the four rules for "partly"**: they decide how a whole set of cells reads and go into the page's legend.

Source: review note `review/laws-compared-pack-2026-11-02.md` on branch `laws-compared-apply`, section "Open decisions for the maintainer" (numbers below match it). Files in `research/laws-compared/` on the same branch.

**State.** Nothing is admitted. The cross-family check is done and applied: a model from a different maker (GPT, through Codex) checked what Claude drafted, without seeing the drafted answers first. It disagreed on four cells; Claude applied the checker's answer on all four, and holds one further cell for you (decision 6).

## Decisions

### 1. California SB 53: quotation limit

Selekoa quotes at most 400 words from one source. The dataset already quotes 393 words of SB 53; the pack adds 15, so it is 8 over.

- **a.** Give two cells (questions 5 and 6) as paraphrases with the section number, and cite the existing approval record for the date.
- **b.** Raise the limit for SB 53.
- **c.** Drop other SB 53 quotations elsewhere in the dataset to make room.

_Recommendation: a._ SB 53 stays within the limit without changing the policy.

- a: two SB 53 cells show a paraphrase and section instead of a quote.
- b: needs a policy change; all cells quote.
- c: other pages lose SB 53 quotes.

### 2. The EU Code of Practice as a row

The Code is not binding in itself; providers "may rely on" it to show compliance with the AI Act.

- **a.** Keep it, directly under the AI Act, labelled "Compliance route, not binding", never counted among the laws, with its standing in every cell's note.
- **b.** Remove it from the table.

_Recommendation: a._ Readers comparing EU duties need it, and the label prevents it being read as law.

- a: one labelled column next to the AI Act.
- b: the Code appears only as a link from the AI Act column.

### 3. New York: one row or two

Chapter 699 (the RAISE Act as signed, 2025) and Chapter 96 (as amended, 2026) differ.

- **a.** One row, "New York RAISE Act", showing the amended version by default, with the signed version as an earlier version the reader can switch to (as Compare frameworks switches editions). The row says the amended duties take effect on 1 January 2027.
- **b.** Two separate rows.

_Recommendation: a._ They are one law in two versions.

- a: one column with a version switch.
- b: two columns side by side.

### 4. Revoked and rescission-announced texts

Executive Order 14110 was revoked on 20 January 2025. A rescission of the BIS rule was announced on 13 May 2025; no formal rescission was inspected.

- **a.** Keep both in a separate group at the end, headed "Revoked, or rescission announced", with each one's standing and its evidence shown on the row. Never present the announcement as a rescission.
- **b.** Remove both.

_Recommendation: a._ They are part of the record and are clearly marked.

- a: two columns at the end under their own heading.
- b: the table shows only texts currently in force or adopted.

### 5. The four rules for "partly"

Four rules now decide cells:

1. An order to an agency to impose a duty counts as "partly" (EO 14110).
2. Protection only by reference to another law counts as "partly" (AI Act, whistleblowers).
3. "Without undue delay" counts as a stated deadline (AI Act, incident reporting).
4. Required security measures for model weights count as risk-management measures (BIS rule, question 3; applied from the check).

- **a.** Accept all four and write them into the legend.
- **b.** Accept 1–3; reject 4 (BIS question 3 returns to "not found").
- **c.** Other (say which to reject).

_Recommendation: a._ All four follow the questions' written criteria, and the checker proposed rule 4.

- a: the legend lists the four rules; cells as in the pack.
- b: one BIS cell changes to "not found".
- c: the cells affected by the rejected rules change.

### 6. The held cell: EO 14110, question 6 (outside assessment)

Section 4.4(a)(i) directs Homeland Security to evaluate AI misuse for chemical, biological, radiological and nuclear threats, including "to evaluate AI model capabilities". The checker reads this as "partly"; the drafting session reads it as "not found", because question 6 asks for assessment of the model or the developer's practices, and this is a general study that names no company or model.

- **a.** "Not found", with the section listed as read and set aside.
- **b.** "Partly", and add to the legend that a government's own capability evaluation counts.

_Recommendation: a._ The passage names no covered developer or model. The question is yours because the drafting family differs from the checker.

- a: the cell reads "not found" with its search.
- b: the cell reads "partly", and the legend gains a sentence.

### 7. Illinois

The Governor's Executive Order 2026-07 says the AI Safety Measures Act was signed. Its text was not read: the state's website failed here.

- **a.** Authorise a short Codex retrieval of the act before the collection is built; add a row only if it places duties on frontier developers, otherwise list it as excluded with the reason.
- **b.** Build without Illinois and note it as not read.

_Recommendation: a._ It may be a binding state law in scope.

- a: possibly one more column, or one more listed exclusion.
- b: the "How we searched" note lists Illinois as not read.

### 8. Chinese rows addressed to service providers

The two Chinese measures address providers of services, not developers as such.

- **a.** Keep them; their first cell quotes the defined party, and the page introduction says some texts address service providers.
- **b.** Remove them.

_Recommendation: a._ They are the binding texts that reach model providers in China.

- a: two Chinese columns, with the introduction's note.
- b: the table has no Chinese text.

### 9. Whether New York Chapter 699 took effect

- **a.** Hold: record the effect rule and the computed date (19 March 2026), marked as computed, and do not say whether it took effect.
- **b.** State that it took effect on that date.

_Recommendation: a._ No source inspected says it took effect, and the checker also left it open.

- a: the cell shows the rule and a date marked "computed".
- b: the cell states an effect the sources do not state.

### 10. Countries not yet in the dataset

Korea's AI Basic Act, Japan's AI Promotion Act, China's deep-synthesis and recommendation-algorithm provisions and Colorado SB 24-205 were not read.

- **a.** A separate small pack later, starting with Korea; this pack goes ahead without them.
- **b.** Read them before admitting this pack.

_Recommendation: a._ They do not change any existing cell.

- a: the page lists them as not yet read.
- b: admission waits.

---

Reply with, for example: 1a 2a 3a 4a 5a 6a 7a 8a 9a 10a
