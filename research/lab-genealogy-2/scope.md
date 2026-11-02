# Lab genealogy 2, 2023–2026: scope and method

A candidate research pack outside application data. It extends the admitted [lab genealogy](../lab-genealogy/README.md) (admitted 2026-10-17, schema 2.15) for the years 2023 to 2026: labs and companies founded by people from frontier labs, moves between frontier labs, and licensing-and-hiring arrangements. Nothing here is admitted or editorially accepted. It changes nothing in `data/`, the application, the schema or any release. Written on 2026-10-29, before research began, from the dataset's existing records.

## What the dataset already holds

The first pack admitted 472 records (plus five later), so most headline events of 2023–2026 are already records: the founding of Mistral AI, SSI, Thinking Machines Lab, Reflection AI, Periodic Labs and AMI Labs with their best-known co-founders; the xAI launch team and its 2025–2026 departures; Meta Superintelligence Labs as named in the memo of 30 June 2025; Microsoft AI's formation; the Microsoft–Inflection, Amazon–Adept, Google–Character.AI and Google–Windsurf agreements; OpenAI's and Anthropic's main 2024–2026 leadership changes. This pack does not re-record any of them. Each drafting pass reads the inventory of existing records (`.local/lab-genealogy-2/existing-claims.txt`, generated from `data/claims.json`) and `tools.mjs check` rejects a record with the same subject, predicate, object and date as an existing one.

The parallel people pack (`research/people/` on branch `people-pack`) records executives of parent companies (Alphabet, Microsoft, Meta, NVIDIA, SoftBank, Oracle, Alibaba) and some single-record people (Poolside, Magic, Imbue, 01.AI, an Anthropic board member). Their roles are not drafted here; where a record here touches one of those people, it names the people-pack candidate in `relatedCandidate`.

## In scope

1. **New labs and companies, 2023–2026,** founded by people whose earlier roles were at frontier labs (OpenAI, Anthropic, Google DeepMind and its predecessors, Meta's AI organisations, xAI, Microsoft AI, the Chinese labs). For each: the founding as stated, co-founders in the source's own wording (one record per person), stated funding rounds and named participants, and dated roles. Examples: Safe Superintelligence, Thinking Machines Lab, Reflection AI, Periodic Labs, Mistral AI, Eureka Labs, Humans&, Applied Compute, Ndea, Latent Labs, Adaption Labs, and Inflection's founders' moves.
2. **Departures and moves between frontier labs,** 2023–2026: OpenAI, Anthropic, Google DeepMind, Meta (including Meta Superintelligence Labs), xAI, Microsoft AI, Apple and Amazon's frontier-model units, and the founders and leads of Chinese labs. Each move is recorded as a dated role, or a dated departure announcement, from the closest primary source: the person's own post, the company's announcement, a filing.
3. **Acqui-hires and licensing-plus-hiring deals,** recorded as the parties state them: licensing, hiring, investment or acquisition, never an acquisition unless a party or a regulator says so. Examples beyond those already admitted: Amazon–Covariant (2024), Meta–Scale AI (2025), and later agreements of the same shape.

About 200 records. Omissions are listed with their reasons in `pack.md`; an omission is not a judgement of importance.

## Out of scope

- Staff directories: researchers who are not founders, executives, team leads, board members or the subject of an announced move.
- Product launches, model releases, valuations as such, compensation, private life, litigation beyond an organisation's own governance documents.
- Roles of parent-company executives (the people pack).

## Unit of record

As in the first pack: one proposition per record in the dataset's claim shape (`subject`, `predicate`, `object`, `time`, `attributes`, `derivation`, `resolution`, `qualification`, evidence). Predicates are those in `src/domain/predicates.ts` since schema 2.15: `held_role`, `co_founded`, `departure_announced`, `launched`, `founding_stated`, `licensing_hiring_agreement`, `unit_of`, `unit_disbanded`, `acquired`, `combined_into`, `name_transition_announced`, and for funding the existing capital predicates `announced_funding` (organisation → the round total as a literal), `participated_in_round` (investor → organisation; the round total is never attributed to one investor) and `investment_announced`. No new predicate or schema change is proposed.

## Rules

- **Documented events, not motives.** A reason enters only where the person or organisation concerned states it in a cited source (`statedReason`), and is attributed. No loaded words or ideological labels.
- **Announced stays announced.** A departure or appointment is `stage: announced` until a source states it as effective; an agreement known only from an announcement is dated by the announcement.
- **Dates keep kind and precision.** An announcement date is not a start date or last working day; a snapshot is not a start date; unknown stays unknown; no role is extended to the present.
- **Founders as stated.** One record per person and organisation, in the source's wording (founder, co-founder, founding team). A retrospective credit gives no founding date.
- **Funding.** The round total is one `announced_funding` record; each named investor is one `participated_in_round` record with no amount; "led by" is kept in the role wording only where the source says it. An announcement is not a closing unless the source says closed.
- **Closest source.** Company announcements, filings, official biographies and the person's own posts first; reporting only where no primary text could be retrieved, marked as resting on reporting. Wikipedia, Wikidata, Crunchbase, LinkedIn, Baidu Baike and similar summaries are never evidence.
- **Living people:** public professional roles only.

## Retrieval and checks

- `tools.mjs fetch` retrieves each source into the ignored `.local/lab-genealogy-2/` cache: direct, through a reader relay (`r.jina.ai`) where a publisher refuses this environment, or X's syndication endpoint for posts. The route is recorded. The Internet Archive refuses connections from this environment; captures are not cited as checked, and the cross-family brief asks the checker to open archive copies of the pages that refused.
- `tools.mjs check`/`verify` match every verbatim passage against the retrieved text, check record shape, entity references, dates, loaded wording, funding attributes and duplicates of existing records, and enforce the quotation limits (50 words a quote; per source 10% under 2,000 words, otherwise 400). `refetch` + `verify fresh` repeat the matching against a second retrieval. Results in `verification.json`.
- A same-family fresh-context audit (`audit.md`) of a recorded random sample plus targeted records.
- A cross-family brief: Part A blind (role dates, co-founders as stated), Part B direct, with the pack's answers in a separate verdicts file.
