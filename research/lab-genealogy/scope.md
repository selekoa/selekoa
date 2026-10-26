# Lab genealogy: scope and method

A candidate research pack outside application data: the documentary "who went where" history of frontier AI labs from 2010 to 2026. It records founding events and founders, leadership and governance changes, licensing-and-hiring arrangements and the documented moves of people with a public role, each as one dated record with a verbatim passage from the closest source that could be retrieved. It reuses Selekoa's existing person and organisation entities and links its records to the dataset's existing personnel and governance records.

Nothing here is editorially accepted. The pack was drafted and audited by machine (one model family, Claude); a cross-family check brief is included and has not been run. It does not change `data/` or the application.

## Question

Who founded each frontier lab, who led it, and where did the people with documented public roles come from and go to? The pack answers with records of what sources state. It does not explain why anything happened.

## Unit of record

```text
record     one proposition: a person's role, founding credit or announced departure at an
           organisation, or a relation between two organisations, at a date
date       event (founding, launch, acquisition, announcement), snapshot (a role shown on a
           dated document), interval (bounds exactly as a source states them) or unknown;
           precision kept (2023, 2023-04, 2023-04-20)
evidence   one or more passages, each with source, locator, source role and, for short
           posts, a labelled paraphrase plus a verbatim anchor fragment
```

The records use the dataset's claim shape (`subject`, `predicate`, `object`, `time`, `attributes.role`, `derivation`, `resolution`, `qualification`, evidence) so that admission would be a mechanical step. Three predicates are proposed by this pack and are not in `src/domain/predicates.ts`:

- `founding_stated` (organisation → literal): a source states the organisation's founding date or year. Neither legal incorporation nor a complete founder roster is implied.
- `licensing_hiring_agreement` (organisation → organisation): an announced arrangement under which the subject licenses the object's technology and hires some of its staff. It is not an acquisition, and the record does not establish which staff moved or the terms.
- `unit_disbanded` (organisation → organisation): a source documents that a team or unit ceased to exist as a separate unit within its parent (subject: the unit; object: the parent). Where its members or work went is not established; a planned change carries `stage: announced`.

## Rules

- **Documented events, not motives.** A record says that a move or event happened and when. A reason enters only where the person or organisation concerned stated it in a cited source; the record then carries `statedReason` and attributes it. No inferred motives and no loaded words (poached, ousted, defected, exodus, rival) or ideological labels; `tools.mjs check` rejects them in statements.
- **Closest source.** Company announcements, filings, official biographies and the person's own posts first. News reporting only where no primary source could be retrieved; such records are marked "reporting" and the source role is secondary. Wikipedia and other tertiary or profile summaries (Wikidata, Crunchbase, LinkedIn, Baidu Baike) are never evidence; `check` rejects their addresses.
- **Living people:** public professional roles only.
- **Dates:** an announcement date is not a start date or a last working day; a snapshot is not a start date; unknown stays unknown; no role is extended to the present.
- **Announced is not realised:** prospective appointments and agreements carry `stage: announced`.
- **Founder rosters:** one record per person per organisation, in the source's wording (co-founder, founding member, founding team). A retrospective credit gives no founding date.
- **Scope of people:** founders, chief executives, presidents, chief scientists and technology officers, heads of safety or alignment, board members and trustees, and others whose move the lab or the person announced. Not a staff directory.

## Retrieval and verification

- Each source was retrieved by `tools.mjs fetch` and read from its retrieved text. Three routes: **direct** (curl); **relay**, a third-party reader service (`r.jina.ai`) that renders the publisher's page, used where the publisher refuses direct retrieval from this environment (openai.com, x.ai and some others); **x**, X's own syndication endpoint for a post's text. The route is recorded for each source (`retrieval.route`). A relay rendering is the publisher's current page as the relay saw it; it is not an archive copy and does not authenticate earlier wording.
- The Internet Archive refused connections from this environment throughout the run. No archive capture was retrieved; none is cited as checked.
- `tools.mjs check` and `verify` match every verbatim passage (a quote, or a paraphrase's anchor) against the retrieved text (normalised for whitespace, case, quotation marks, dashes, Unicode compatibility forms and invisible characters; a last fallback ignores spaces for words that a page renderer glued together), check record shape, entity references, dates and loaded wording, and enforce the quotation limits. `refetch` retrieves every source again into a separate cache, and `verify fresh` repeats the matching against those fresh copies. Results are in `verification.json`.
- **Quotation limits** ([editorial policy](../../docs/editorial-policy.md#short-quotation)): at most 50 words per quote; per source at most 400 words, or 10% of a document under about 2,000 words. Document length is approximated from the retrieved text (words in text blocks of ten or more words). Where a source is already in the dataset, `verification.json` also reports quoted words if the pack's quotations were added to the dataset's.
- Notes posted as images (for example some departure notes on X) cannot be machine-matched and are not quoted; where the note itself was the closest source, the record rests on reporting that quotes it.
- Chinese and Japanese text has no spaces between words, so for the quotation limits each CJK character counts as one word (stricter than the dataset's whitespace count).
- X posts were read through X's syndication endpoint, which truncates long notes; a claim never rests on text beyond what was returned.

## Preparation and audit

- **Drafting.** Seven fresh-context drafting passes of the same model family, one per lab group (OpenAI; Anthropic; Google, DeepMind and the Transformer authors; Meta and xAI; licensing-and-hiring deals; independent labs; Chinese labs), worked to [drafting-brief.md](drafting-brief.md). An editorial consistency pass then split two-proposition records, removed duplicates and aligned wording across them, and three gap-filling passes (later US and European labs with Google Brain's founding; further Chinese labs; safety, alignment and policy leadership changes) worked to the tightened brief. Each pass recorded what it searched and what it could not retrieve (in `drafts/*.json`, field `searched`). `tools.mjs merge` combines the drafts into `pack.json`.
- **Audit.** Three separate fresh-context passes of the same family checked a recorded random 20% sample, every record carrying a stated reason, and targeted 2026 and licensing-and-hiring records against freshly retrieved sources, without the drafting notes. A correction pass applied every finding and widened three kinds of finding to all records. See [audit.md](audit.md).
- **Cross-family check.** [gpt-check-input-2026-10-16.md](gpt-check-input-2026-10-16.md) is a blind brief for a reviewer from another model family, covering every stated-reason record, every record without a primary supporting passage, every inferred record and a random 20% of the rest; not yet run.

## Limits

- Coverage is selective. The pack follows founders, top executives and research or safety leads of the labs named in the scope, and the moves those labs or people announced. Absence of a person or move is not evidence that it did not happen.
- Mutable pages (company "about" pages, biographies) are read as they stood at retrieval; their earlier wording is not authenticated.
- A sequence of roles for one person is a set of separate records, not an employment history; gaps are unknown.
