# Authorship identity checks, 2026-10-27

| Item                                        | Verdict        | Direct evidence                                                                                                                    |
| ------------------------------------------- | -------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| KatjaGrace / Katja Grace (A037, A091)       | **identified** | A LessWrong post has the account byline and a full-name author credit in its own body; both target posts link to the same account. |
| AI Magazine 2006 Dartmouth proposal reprint | **supports**   | The publisher PDF prints all four full-name forms beneath the proposal title on printed p.12.                                      |

Checker: Codex, GPT family. Scope: authorship identity and printed names only.
Checked on 2026-10-27. Findings were derived from the source pages before any
review note about these items was opened; no such review note was needed or opened.
Search results were discovery aids, not identity evidence. This is a machine check,
not human editorial acceptance or authorization to change records.

The report branch starts at `origin/main`, `c215ab0`. That baseline has neither
`research/author-persons/` nor `source-aimag-2006-dartmouth-proposal`.
The source record and pack on `origin/author-persons-admission` were consulted to
locate the requested sources, without importing that branch's changes. Existing
source metadata on main supplied the two target LessWrong URLs. The item numbers
A037/A091 are the request's references; the source identifiers and URLs below
identify the two records unambiguously.

## 1. Katja Grace

**Verdict: identified.** The link is documentary, not an expansion inferred merely
from the spelling of the username.

Primary identity source: [Atari early — LessWrong](https://www.lesswrong.com/posts/ygb6ryKcScJxhmwQo/atari-early),
dated 2 April 2020. The exact relevant text is:

> by KatjaGrace

Locator: post header, directly below the title. The author link resolves to
[the KatjaGrace account](https://www.lesswrong.com/users/katjagrace?from=post_header).

> By Katja Grace

Locator: final author-credit line in the post body, immediately before the
acknowledgements and before “Notes” and comments. This is a full-name credit in
the same account's own post, rather than a comment referring to someone else.
Together, the account byline, author link and body credit identify KatjaGrace as
the author publishing under the name Katja Grace.

Both target posts were opened separately and their header author links followed:

| Source record                                       | Post                                                                                                                                                        | Header text     | Author-link destination              |
| --------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- | ------------------------------------ |
| `source-grace-2014-superintelligence-reading-group` | [Superintelligence reading group](https://www.lesswrong.com/posts/QDmzDZ9CEHrKQdvcn/superintelligence-reading-group), 31 August 2014                        | “by KatjaGrace” | `/users/katjagrace?from=post_header` |
| `source-grace-2014-superintelligence-11`            | [Superintelligence 11: The treacherous turn](https://www.lesswrong.com/posts/B39GNTsN3HocW8KFo/superintelligence-11-the-treacherous-turn), 25 November 2014 | “by KatjaGrace” | `/users/katjagrace?from=post_header` |

This connects the identity evidence to the account credited on both requested
posts. The [current profile](https://www.lesswrong.com/users/katjagrace) itself
displays only the username; it is not offered as a full-name profile source.
All evidence above is from current platform pages, read through the web retrieval
tool on the check date. No archived capture was used, so no capture timestamp is
claimed. The displayed post dates do not establish when the currently visible
full-name credit was added. No account-ownership history is inferred.

## 2. AI Magazine reprint

**Verdict: supports.** The printed article itself, rather than only its catalogue
metadata, supplies the four names.

Publisher [PDF](https://onlinelibrary.wiley.com/doi/pdf/10.1609/aimag.v27i4.1904)
and [full-text article](https://onlinelibrary.wiley.com/doi/10.1609/aimag.v27i4.1904):
_A Proposal for the Dartmouth Summer Research Project on Artificial Intelligence:
August 31, 1955_, AI Magazine 27(4), Winter 2006, pp.12–14,
DOI `10.1609/aimag.v27i4.1904`.

The PDF's three-line byline reads:

> John McCarthy, Marvin L. Minsky,
> Nathaniel Rochester,
> and Claude E. Shannon

Locator: **PDF page 1 of 3, printed p.12**, beneath the title and “August 31, 1955”,
above the article body. PDF page 3, printed p.14, repeats the same four name forms
as individual subheadings under “The Proposers”. The introductory editorial text on
p.12 explicitly attributes the proposal to those four people; p.13 reproduces the
first page of the original proposal. This is the 2006 reprint of the 1955 text,
not a newly authored 2006 proposal.

The printed forms resolve the requested initials to John McCarthy, Marvin L.
Minsky, Nathaniel Rochester and Claude E. Shannon. They do **not** expand the
middle initials L. and E.; no further expansion is asserted.

The [AAAI article record](https://ojs.aaai.org/aimagazine/index.php/aimagazine/article/view/1904)
also lists these four names under “Authors”. Its publication field reads
2006-12-15; Wiley displays 1 December 2006. That bibliographic date difference
does not alter the printed-name finding; this task does not adjudicate it.

Retrieval: the web tool returned the publisher PDF with a three-page text layer,
which was read for the title, byline and proposers' headings, and returned Wiley's
full-text article and the AAAI record. The AAAI PDF link yielded no readable body
through that tool. A separate direct curl request to Wiley returned HTTP 403;
it was not treated as a retrieved PDF. The finding relies on the readable PDF
returned by the web tool, corroborated by publisher HTML. No archive was used;
no local PDF hash or visual page inspection is claimed.

## Handoff

Only this report is added. No data, pack, code or prior review is changed. Applying
either finding to held records or stored identity evidence requires a separate
authorized task. Report formatting, focused editorial/review-generation tests and
the staged-content privacy scan are the handoff checks.
