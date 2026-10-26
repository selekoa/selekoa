# Reader-facing style guide

This guide covers every word a reader sees: the start page, navigation, page
introductions, labels, badges, empty states, notices, the About & method page,
collection definitions in `src/reading`, and the headings and fixed prose of
exported research starters. It does not cover data records (claims,
qualifications, evidence passages, quotes, entity descriptions), which change
only under the [editorial policy](editorial-policy.md). Repository
documentation for maintainers may stay more technical, but should follow the
same defaults where it can.

## Audience

Write for two readers at once. An intelligent non-specialist must understand
each sentence on first reading. An expert, such as a historian, lawyer or AI
governance researcher, must find nothing vague and nothing condescending.

If a sentence needs a second reading, shorten it or split it. If an expert
would ask "which one?" or "since when?", add the specific term or date.

## Tone

Modern and professional: precise, calm and trustworthy. Academic without
pretension. State what the record shows and where it stops. Do not sell,
dramatise or apologise.

## Precision comes first

The editorial policy overrides this guide. Never simplify away:

- a qualification or scope limit;
- date precision, a date's basis (announced, effective, published) or the fact
  that a date is unknown;
- an attribution ("the framework states", "OpenAI disputes");
- the separation between what a document says and what happened;
- the separation between derivation, resolution, editorial state and evidence
  verification.

Plain wording that loses one of these is wrong, however readable it is. When a
precise term is unavoidable, keep it and explain it once, on the page or on the
About & method page.

## Earliest, first and origin

Collections that order texts follow the editorial policy's rule on earliest located texts.

- Headline the earliest text as "Earliest located: Good, Speculations Concerning the First Ultraintelligent Machine (1965)". Never write "first", "coined", "originated", "introduced", "invented" or "pioneered" about a text or person, unless a competent authority says so; then name the authority: "According to …".
- State the scope once per collection, in a "How we searched" note. Do not repeat "within the searches" next to every item.
- Show both dates where they differ, with the middle dot: `1998 · wording attested 2000-08-17`, `1965 · claimed 1962-10`.
- Label the register next to the passage: fiction, satirical, dream, relay.
- Write "earlier text found" or "correction" when a later find replaces a headline; never present the new text as a discovery.

## Strong defaults

Follow these about 99 per cent of the time. A deliberate exception is allowed
when the alternative would lose precision or read worse; record recurring
exceptions in the self-check report for the change.

1. **No "not A but B" contrasts for effect.** "This is not a database. It is a
   memory." is out. A negative statement that blocks a likely misreading is
   fine and often required: "Signing is not compliance." Prefer stating the
   positive scope first: "The record shows what the framework says. It does not
   show whether anyone followed it."
2. **No rhythmic triplets.** Do not group three adjectives or clauses for
   cadence ("precise, rigorous, transparent"). A list of three real items is
   fine when there are exactly three.
3. **Avoid these words:** crucially, notably, it's worth noting, delve,
   landscape, robust, nuanced. Also avoid their relatives: importantly,
   interestingly, key (as an adjective of emphasis), leverage, seamless,
   comprehensive (unless literally true).
4. **No padded hedging.** One qualifier per claim, placed where it applies.
   Not "may possibly suggest". If something is unknown, say "unknown".
5. **No sentences that only announce the next.** Cut "Here is what you need to
   know:", "The following section explains". Start with the content.
6. **Sparing em-dashes and colons.** Use a full stop or a comma first. A colon
   is fine after a label ("Locator: p. 4") and before a list. An em-dash in
   running prose needs a reason.

## Sentences and words

- Prefer short declarative sentences, concrete nouns and the active voice.
  "The publisher replaced Version 1 with Version 2" rather than "Version 1 was
  superseded".
- One idea per sentence. Split sentences over about 30 words.
- Say each caveat once per page, next to the thing it qualifies. Do not repeat
  the same disclaimer in every panel.
- Use sentence case for headings, buttons and labels.
- British spelling with -ise endings, as elsewhere in the interface
  (organisation, recognised).
- Dates appear as stored (`2025-04-15`, `2024-10`, `2021`). Never pad a year
  to a day.
- Use the actor's own name for their documents and statements. Use quotation
  marks only for exact quotation.

## Interface conventions

- A button or link says what happens: "Read the document histories",
  "Download Markdown". Use → for moving to another page or section and ↗ for
  opening evidence or an external source.
- Metadata lines use the middle dot: `2021-05 · snapshot · Inferred`.
- Empty states say what is missing and what that means, in one sentence:
  "No authorship record yet. A missing record is a gap in coverage."
- Status badges use the reader terms below, and every badge is explained on
  the About & method page.

## Internal terms and reader terms

Replace internal terms in reader-facing text, or explain them where a precise
label is required.

| Internal term                                 | Reader-facing wording                                                                                                                                                                                            |
| --------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| seed (`editorialState: seed`)                 | "not reviewed by an editor" (maintainer decision of 2026-10-15); "not editorially accepted" where a person has checked some of the claim's evidence; on the About page, "exploratory record". Never show "Seed". |
| accepted                                      | "editorially accepted"                                                                                                                                                                                           |
| `machine_checked`                             | "machine-checked": an automated research pass compared the claim with the source passage. Always say that no person has confirmed it.                                                                            |
| `human_reviewed`                              | "human-reviewed", with the reviewer's pseudonym and date                                                                                                                                                         |
| claim derivation: explicit / inferred / posed | "Stated in source" / "Inferred" (with the reasoning shown) / "Question posed by Selekoa"; never show "Stated in source" for an assessment or an unresolved question                                              |
| claim resolution                              | "Supported", "Contested", "Unresolved", each explained                                                                                                                                                           |
| literal value, literal claim                  | "a claim about a value" (an amount, a legal form, a quoted provision)                                                                                                                                            |
| entity                                        | "person, organisation or document" or "record", unless the general term is needed                                                                                                                                |
| projection                                    | "computed from stored claims"                                                                                                                                                                                    |
| increment, pass, week 4c                      | "a later update"                                                                                                                                                                                                 |
| research anchors                              | "core institutions"                                                                                                                                                                                              |
| stop, stopped item                            | "question set aside", with the reason                                                                                                                                                                            |
| keyed provision                               | "provision tracked across editions"                                                                                                                                                                              |
| snapshot / interval / event                   | keep, and explain: a snapshot is one dated report of a state; an interval has only the start and end a source states; an event is a dated action                                                                 |
| machine-proposed selection                    | "a machine selected and arranged these records"; keep "no human review of the selection or framing is recorded"                                                                                                  |

## Self-check

Before handing off a change to reader-facing text, search the touched files for
the banned patterns and review each match:

```sh
rg -n -i "crucially|notably|worth noting|delve|landscape|robust|nuanced|importantly|interestingly|seamless" src index.html
rg -n "—" src/ui src/reading src/App.tsx
rg -n -i "\bseeds?\b|machine_checked|literal|projection|increment|anchors?" src/ui src/reading src/App.tsx
rg -n -i "\bfirst to\b|\bcoined\b|\boriginated\b|\bpioneered\b|\binvented\b" src/ui src/reading
```

Matches inside data-handling code, comments, identifiers and data records are
not reader-facing. Report the reader-facing matches you keep, and why.
