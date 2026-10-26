# Yudkowsky's argument history: research thread scope

A bounded special investigation: for common claims about advanced AI ("takes"), which documented Eliezer Yudkowsky passages state, answer or reject them, and when. It records one author's documented arguments over time. It is not a profile of the person, an assessment of whether the arguments are correct, or a claim of first use.

The output is a candidate research pack outside application data (`pack.json`, rendered as `pack.md`). Nothing here is editorially accepted. A downstream side project ("The Yudgment") may consume an exported pack; that project never becomes the source of truth.

## Unit of record

```text
take       a common claim, phrased generically (never a named person's post)
 premise   the assumption doing the work (one to three per take)
  passage  a short Yudkowsky quotation, its source expression, locator and date
           relation to the take, roles, context paraphrase, qualification
 open      premises no located passage addresses
```

Relations, always relative to the take:

| Relation       | Meaning                                                                                                                                                                                                                                                 |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `said-it`      | Yudkowsky stated the same proposition                                                                                                                                                                                                                   |
| `answered-it`  | He directly addresses this argument or premise and argues against it                                                                                                                                                                                    |
| `disagrees`    | He states the contrary conclusion without engaging this particular argument                                                                                                                                                                             |
| `related`      | Same topic, different claim                                                                                                                                                                                                                             |
| `earlier-self` | An earlier Yudkowsky text itself holds the take, premise included, and a located later Yudkowsky text explicitly rejects that proposition; the qualification says whether it refers back. A later retrospective reporting the earlier view is `related` |

Roles: `earliest-located` (earliest passage found within the stated search scope, never a priority claim), `strongest` (clearest short statement), `later-restatement`.

A passage may carry `cardUse: context-only` when its quotation alone would mislead, for example an earlier view shown without its later rejection. Downstream displays must not show such a passage on its own. Passage-level `expressionDate` overrides the source date when the quoted wording is later or earlier than the publication (a note added to an old post, a document written years before publication, a transcript of an earlier conversation).

A relation records what a passage says about a take. It does not establish that the passage is right, that the take is wrong, or that no one answered it.

## Search scope

- **LessWrong:** every post listed under the author's account through the public GraphQL API (1,076 posts, retrieved 2026-10-06), including imported 2006–2009 Overcoming Bias posts, 2015 book reposts and co-authored dialogues. Comments were not retrieved.
- **SIAI/MIRI documents:** current MIRI-hosted PDFs of _Creating Friendly AI_ (2001), "Artificial Intelligence as a Positive and Negative Factor in Global Risk" (2008), _Coherent Extrapolated Volition_ (2004), _Intelligence Explosion Microeconomics_ (2013) and "Corrigibility" (2015, four authors).
- **Other:** the TIME article of March 2023; the AI-box experiment page on yudkowsky.net; a 2000 Wayback capture of _Staring into the Singularity_; three Extropians and one SL4 message already identified by the thought-spine candidate pack; four Arbital pages through the GreaterWrong viewer.
- **SL4 mailing list (phase 2, retrieved 2026-10-07):** every message listed under his name in the author indexes of all 142 monthly folders of the Hypermail archive at sl4.org/archive (2000-02 to 2012-09): 1,876 messages, all retrieved in full (HTTP 200), 2000–2009. Three sub-agents searched the bodies with quoted (`>`) lines removed, take by take, for passages earlier than the pack's earliest located ones. Their per-take regexes and negative results are in each take's search notes. The served archive shows later URL rewriting, so it does not authenticate historical bytes. Quotations from short messages respect the ~10% cap, which shortened several.
- **Extropians mailing list (phase 2, retrieved 2026-10-07):** every message listed under his name in the author indexes of the Hypermail archive at extropians.weidai.com: 24 quarterly folders (1996 to 2Q02; 2Q02 returned HTTP 404) and the later monthly folders (2002-12 to 2003-09, and 2008-09): 3,012 messages, all retrieved in full (HTTP 200), 1996-11 to 2003-09. List traffic before 1996-07-25 is not in this archive. Three sub-agents searched the bodies offline, take by take. Some 1996 messages mark quoted text with `<...>` or reproduce a forwarded exchange without `>` marks, so authorship of each quoted paragraph was checked by hand in the audit.
- **Quotation cap for messages:** a message's length is its body including quoted lines, without archive headers, navigation or signature, as for admitted message sources. Quotations from short messages stay within about 10% of that length.
- **Not searched:** Twitter/X, podcasts and interviews, comments, the 2025 book _If Anyone Builds It, Everyone Dies_, HPMOR and other fiction except where a post is cited explicitly as a parable.

"Earliest located" therefore means earliest within this scope. Earlier mailing-list or website wording may exist.

## Validation checklist (each passage)

1. **Quote match:** the quotation (≤ 50 words, ideally under 35) occurs verbatim in the cached expression, checked by `node scripts/yudkowsky-arguments.mjs verify` after normalising whitespace, quotes and dashes. Elisions (`…`) stay within one paragraph.
2. **Version:** for edited LessWrong posts (content version above 1.0.0), the quote is checked against the posting-day version 1.0.0. A quote absent from that version is flagged as a later addition. PDFs are later MIRI reprints; their wording is not authenticated for the original year unless a capture was compared.
3. **Voice:** only Yudkowsky's own assertions. Turns by other participants in dialogues, quoted text, positions stated in order to reject them, fiction characters and co-authored text are excluded or labelled (`dialogue-turn`, `fiction`, `co-authored`, `retrospective`).
4. **Date:** the original publication date with precision and basis. Imported Overcoming Bias posts keep their 2006–2009 dates; 2015 book reposts and 2003–2006 placeholder import dates are never treated as first publication; a crossposted article uses its original venue's date.
5. **Context:** a one- or two-sentence paraphrase of what the passage argues and against what, kept separate from the quotation.
6. **Rights:** short attributed quotation with a link; no full texts are tracked. Retrieval bodies stay in the ignored `.local/yudkowsky-arguments/` cache with SHA-256 hashes.
7. **Audit:** a bounded fresh-context machine audit combining a recorded random sample with targeted risky items (earlier-self, dialogue turns, edited posts, earliest-located roles). A same-family check is recorded as such. Machine checks are not human review.

## Takes

The take list and premises live in `pack.json`. Takes are generic phrasings of widely repeated claims. They are never attributed to a named person.

## Reproduction

```sh
node scripts/yudkowsky-arguments.mjs lw-index
node scripts/yudkowsky-arguments.mjs fetch <url> <key>
node scripts/yudkowsky-arguments.mjs lw-version <postId…>
node scripts/yudkowsky-arguments.mjs verify
node scripts/yudkowsky-arguments.mjs render
```

Retrieval is paced (LessWrong ≥ 4 s, Wayback ≥ 8 s). Current pages may differ from the expressions cached on 2026-10-06; the pack records each body's SHA-256.
