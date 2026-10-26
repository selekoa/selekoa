# How the lab genealogy could appear in the app (design proposal only)

A proposal for the maintainer. Nothing here is implemented, and the pack is not application data. It answers the fresh-eyes finding that person pages are dead ends ([fresh-eyes test, problem 2](../../docs/fresh-eyes-2026-10-14.md)) and uses the existing person-page structure (`src/ui/PersonPage.tsx`: "Documented path", "What this record cannot tell you", governance roles) and the existing personnel predicates.

## What the pack adds that the app can use

- Many more `held_role`, `co_founded` and `departure_announced` records with dated evidence, for people already in the dataset and for proposed new people.
- Organisation-level founding dates (`founding_stated`) and licensing-and-hiring agreements (`licensing_hiring_agreement`): two proposed predicates.
- Lab families: a lab and its units (Google with DeepMind, Brain and Google DeepMind; OpenAI with OpenAI, Inc., OpenAI Group PBC and its committees), so that a move between a parent and its unit is not shown as a move between labs.
- Stated reasons, attributed to the person or organisation that gave them, as a separate field (`statedReason`), never mixed into the statement of the event.

## 1. Person pages that lead somewhere

The current "Documented path" lists a person's dated records. Proposed changes, all on the existing page:

```text
Jan Leike                                          Person · N recorded claims

Documented path
  DeepMind        Alignment research (undated)                 [Inspect]
  OpenAI          Superalignment co-lead · as of 5 July 2023   [Inspect]
  OpenAI          Departure announced · 17 May 2024            [Inspect]
                  Stated reason (his own post): …  [show]
  Anthropic       Joining announced · 28 May 2024              [Inspect]

  People at the same organisations, same years →
    OpenAI 2023–2024: Ilya Sutskever (co-lead), John Schulman, …
  Lab pages: DeepMind · OpenAI · Anthropic

What this record cannot tell you
  Dates are announcement or snapshot dates, not start or last days. Gaps are unknown.
  A move is not a statement of why it happened; reasons appear only where the person
  or organisation stated them.
```

- **Next and previous organisation links** on each path step: "Also at OpenAI before this: …", linking to the lab page.
- **Stated reasons collapsed by default**, labelled with who stated them and where ("his own post, 17 May 2024"), never as a heading. A reason is not shown in lists or tooltips without its attribution.
- **"People at the same organisation, same years"**: computed from dated records only, labelled as co-presence in the records, not as collaboration or influence.
- **"Appears in"**: the genealogy view and the lab pages the person appears on (the same mechanism as the fresh-eyes proposal for collections).
- **Proposed new people get pages** with the same structure. A person with only one record gets a short page that says so, not an empty one.

## 2. A genealogy view per lab

On each institutional dossier (or a new lab page in the restructure), a "People and founding" section built from the pack's per-lab tables:

```text
Anthropic · founded beginning of 2021 (company statement)

Founders (as credited by the company)
  Dario Amodei — before: OpenAI (VP of Research, as of Dec 2020)
  Daniela Amodei — before: OpenAI (VP of Safety, undated)
  Chris Olah — before: Google Brain (2017), OpenAI (undated)
  …

Leadership over time            Board and trust over time
  2021  CEO Dario Amodei          2023  LTBT initial trustees …
  2024  CPO Mike Krieger          2024  Jay Kreps (LTBT appointee)
  …                               …

Arrivals from other labs (dated records)    Departures announced
  2024  Jan Leike (from OpenAI)               2025  John Schulman
  …                                           …
```

- **Lists first, not a graph.** The fresh-eyes readers used lists; a graph of moves invites reading influence into topology. A small, optional "lab-to-lab" diagram can follow, with the same caveat line and a keyboard-accessible list equivalent.
- **"Before" and "after" are labelled by their records**, for example "before: OpenAI (VP of Research, as of December 2020)", never "came from" without a date.
- **Founder lists keep the source's wording** ("co-founder", "founding member", "founding team") and say whose list it is ("as credited by the company in 2024").
- **No counts as rankings.** No "most departures", no league tables, no colour scales by number of people.

## 3. A "Who went where" reading page

A reading path on the frontier-lab spine, generated from the pack's timeline and between-organisation pairs:

- **By year:** founding events, leadership changes and announced moves, each one line with its date, source owner and an Inspect button.
- **Between labs:** for each pair of lab families, the people with dated records at both, in date order, each with the two records. The page states once that a pair is the order of dated records, not a documented transfer.
- **Filters:** lab, year, record type (founding, leadership, board, departure, deal), primary only / include reporting.
- **Export:** the research starter for the page, with each line's source, locator, quote and qualification, and the reporting mark.

## 4. Marks the view needs

- **Reporting**: records resting on news reporting carry a visible "reporting" mark and say what the report relays (a memo, a LinkedIn post). A filter can hide them.
- **Snapshot from an undated page**: "role as shown on the company page when retrieved on 15 October 2026", so a reader does not take it for a dated appointment.
- **Announced**: prospective appointments and deals keep "announced".
- **Status line** as elsewhere: a machine found and checked these records; no editor has reviewed them.

## 5. Admission path (for the maintainer)

1. Decide on the two proposed predicates (`founding_stated`, `licensing_hiring_agreement`) and on `statedReason` as a claim attribute, or map them to existing ones.
2. Run the cross-family check (`gpt-check-input-2026-10-16.md`) and adjudicate.
3. Admit by lab family, starting where the dataset already has dossiers (OpenAI, Anthropic, Google DeepMind, Meta, xAI, the Chinese labs), with their entities.
4. Then the person-page changes (1) and the lab section (2); the reading page (3) after the restructure.
