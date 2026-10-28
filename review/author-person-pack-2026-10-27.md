# Author-person candidate pack, 2026-10-27

A candidate pack in [`research/author-persons/`](../research/author-persons/README.md), prepared under the maintainer's decision of 27 October 2026. The decision follows the reader test of 26 October ([fresh-eyes report](../docs/fresh-eyes-2026-10-26.md), ranked fix 4): authors whose texts the collections quote have no person record, so People A–Z and person pages miss them. **Nothing was admitted.** `data/`, the application, the schema and the releases are unchanged. The pack was machine-prepared by one model family. The cross-family check has not been run, and no person has reviewed the pack.

## Counts

The counts are the pack's, taken against the dataset at the start of the pass.

|                                                    |                                                                                 |
| -------------------------------------------------- | ------------------------------------------------------------------------------- |
| Studied texts (subjects of proposition records)    | 280                                                                             |
| Personal authors credited on them                  | 119 (114 without a person record, 5 with one)                                   |
| Candidate person records                           | 88 (87 by rule, plus Samuel Butler by hand)                                     |
| Authorship records for candidates                  | 179, on 116 texts                                                               |
| Identification records                             | 4 (full names of the 1955 Dartmouth proposal's authors)                         |
| Existing person records gaining authorship records | 4: Eliezer Yudkowsky 130, Paul Christiano 4, Holden Karnofsky 1, Rohin Shah 1   |
| Authorship records in all                          | 315, on 248 texts                                                               |
| Authors left out under the threshold               | 27                                                                              |
| Proposed new source                                | 1 (AI Magazine's 2006 reprint of the Dartmouth proposal, as an identity source) |

The candidates by collection are 55 in economics (524 records on their texts), 32 in superintelligence (151) and 2 in Yudkowsky (4). Robin Hanson is in two collections.

**Check results for the 315 authorship records.** These come from a direct retrieval on 27 October.

- 277: the name was matched in a byline position.
- 20: not retrieved.
- 7: the name was not found.
- 5: credited under a username.
- 3: the name was found only outside the byline.
- 2: the given name differs.
- 1: only the family name was found.

The 38 records that are not "matched" restate the source record's author list as a labelled paraphrase. Each needs a check before admission, and all 38 are in the cross-family brief.

## Who is in

- **Economics:** Acemoglu, Aghion, Agrawal, Armer, Autor, Benzell, Besiroglu, Bresnahan, Brynjolfsson, Buckingham, Calvano, Calzolari, Clancy, Cowen, Davidson, Denicolò, Diebold, Duchin, Eloundou, Erdil, Frey, Furman, Gans, Goldfarb, Hanson, Hitt, Hyytinen, B. F. Jones, C. I. Jones, Korinek, Kotlikoff, Krueger (Alan B.), LaGarda, Leontief, Manning, Mansfield, Mishkin, Nilsson, Nordhaus, Nourse, Osborne, Pajarinen, Pastorello, Restrepo, Reuther, Rock, Rouvinen, Sachs, Seamans, Stevenson, Stiglitz, Suh, Syverson, Trajtenberg and Trammell.
- **Superintelligence:** Armstrong, Bostrom, Burkhead, Butler, Clemmensen, Cotra, Crocker, Drexler, Eder, Fallenstein, Garrabrant, Grace, Hanson, Hubinger, McCarthy, McKinstry, Michie, Mikulik, Minsky, Moravec, More, Rochester, Rosenfelder, Shannon, Shulman, Skalse, Soares, Solomonoff, Turing, van Merwijk, Vinge and Wiener.
- **Yudkowsky:** Rob Bensinger and Richard Ngo.

All of the reader test's examples are covered except Ben Goertzel; see "Open questions". Holden Karnofsky and Yudkowsky already have person records and receive authorship records instead.

## Who is out, and why

- **One record, no role (27).** Each has one record on one text, and the text holds no earliest-located or most-developed role. The 27 are A. L. Samuel; the Usenet and mailing-list authors Gudeman, Franzen, McCullough, Sandberg, Finney, Atkins, Hibbard and Loosemore; Scott Alexander; Roodman; and in economics Sporn, Haggerty, Lynn, Newhouse, Mullainathan, Spiess, Levitan, Pratt, Mokyr, Vickers, Ziebarth, Bueno de Mesquita, Dziuda, Polborn, Andrews and Farboodi. Walter P. Reuther also has one record, and is in because the decision names him.
- **Co-authors of texts that are not studied (174 names).** These are co-authors on technical papers and company accounts that the dataset records for other reasons: method use, citation, or another person's role or affiliation. The largest groups are the Qwen report (46), the AlphaFold paper (29), Chinchilla (17), InstructGPT (16), LLaMA (11) and Weak-to-Strong (10). Admitting them would fill People A–Z with names that no collection studies.
- **Bylines on evidence-only sources (69 names).** These sources have no document record. Most are reporters (for example TechCrunch, CNBC, WIRED and Caixin). Some are company executives who wrote company posts used as evidence, such as Sundar Pichai (14 records) and Satya Nadella (5); see "Open questions".
- **Group and organisational credits.** These are committees, commissions, "Team" credits and the EU Code of Practice chapter chairs, which are credited with role notes. They are not split into persons.
- **Samuel Butler's 1865 "Lucubratio Ebria"** is not proposed. It is unsigned, and its attribution rests on a textual match; see `pack.md`.

## Retrieval failures

- **web.archive.org refused every connection** from this environment. Two Yudkowsky pages survive only as archive captures (`source-sits-2000-capture`, `source-catai-2001-capture`); their original host returns 404. `source-eder-1994-sandberg-relay` and `source-eoc-1997-references` also failed.
- **Other hosts refused connections, returned 403 or 418, or returned no text:**
  - arbital.greaterwrong.com: five Yudkowsky Arbital pages.
  - frc.ri.cmu.edu: two Moravec texts.
  - Open Philanthropy: Davidson 2021 and Roodman 2020, both 403.
  - cold-takes.com: Karnofsky 2020, 403.
  - diyhpl.us: Extropy 13 scan, 418.
  - hanson.gmu.edu (1998).
- **Scans without a text layer:** the Dartmouth facsimile and Nilsson's 1984 AI Magazine article. No OCR tool was available, and the 2006 AI Magazine article PDF came back empty.
- **Internet Archive item pages** gave no byline. The OCR texts named in the source records were read instead. The 1955 hearings statements were matched in their "STATEMENT OF …" headings, with OCR errors kept verbatim (for example "WALTER ?. REUTHER").

The maintainer can retry the failures locally with `node research/author-persons/tools.mjs fetch --retry`.

## Findings worth noting

- **Vinge's 1998 Extropians message** was sent by Robin Hanson. It forwards Vinge's text ("Vinge asks me to forward the following to the list:"), signed "Vernor". The record credits Vinge with the forwarded text only and names Hanson as the sender.
- **Bostrom's 1996 messages** show only an address in the header. The name appears in the signature as "Nicholas Bostrom", while the source records print "Nick Bostrom". Both records are flagged "given name differs". Whether "Nicholas Bostrom" becomes an alias is a cross-check question.
- **Alignment Forum and LessWrong usernames.** Christiano's three posts credit "paulfchristiano", Katja Grace's two credit "KatjaGrace", and Evan Hubinger's three credit "evhub". The publisher's data records no full name. Linking a username to a person needs a source; the arXiv version of _Risks from Learned Optimization_ would serve for Hubinger.
- **Yudkowsky's messages** mostly credit "Eliezer S. Yudkowsky". That form is proposed as an alias of the existing record.
- **Local paths in early commits.** Two early commits on this branch carried the container's working-directory path inside curl error messages, in `retrieval.json` and then `verification.json`. Both pushes went out although the privacy check had failed on them. The path is not personal. Later commits scrub it, and the privacy check passes on the current files. The branch history is unchanged.

## Open questions for the maintainer

1. **Admission unit and threshold.** Should the threshold be two records, or one where the text holds a role, as here? Should the 27 single-record authors join, at least Hibbard, Sandberg and Scott Alexander, whose texts the Yudkowsky collection engages?
2. **Interlocutors without a text of their own.** Ben Goertzel is named in 23 Yudkowsky records as the person replied to, but no text of his is in the dataset. Others named this way include Samantha Atkins (4) and James Higgins (3). A person record for him would need either one of his own messages admitted or a new predicate (for example "replies to"). Neither is proposed here.
3. **Usernames as credits.** Accept a username plus an identifying source (a profile, or the same text under the person's name elsewhere), or hold those records?
4. **Subtype "Author" and no discipline.** No source was inspected for disciplines, so none is stated, and the economics collection's tier rule is not used to label anyone an economist. Keep it this way, or source a discipline separately?
5. **Identification roles.** Only the four Dartmouth authors receive identification records, to expand initialled credits. They use one new source, AI Magazine (2006). Printed affiliations, such as Nordhaus at Yale or Davidson at Open Philanthropy, are not proposed. They would need organisation records, and a printed affiliation does not establish employment.
6. **Executives' posts.** Authors of company posts used as evidence (Pichai, Nadella and others) are outside this pack. Do they belong in a separate institutional pass?
7. **Run the cross-family check** (`gpt-check-input-2026-10-27.md`, 172 items) before any admission, as the editorial policy requires.

## Checks run

`pnpm install --frozen-lockfile`, `pnpm -s check:privacy`, and Prettier on the task-owned files. No data, schema or UI file was changed, so `pnpm check` and the browser tests were not required.
