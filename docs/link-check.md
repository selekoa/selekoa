# Source link check

Run on 2026-10-12. For the maintainer, before launch. Nothing in the data was
changed. The broken-link fix below was applied in the interface on 2026-10-13;
the other fixes are proposals.

## What was checked

`pnpm check:links` (`scripts/check-links.mjs`) requested every distinct
address in `data/sources.json`: each record's `canonicalUrl`, `evidenceUrl`
and, where it has one, `archivedUrl`. That is 651 distinct addresses, 156 of
them on web.archive.org.

Each address was requested once, HEAD first and GET if HEAD failed, with a
30-second timeout and a plain `selekoa-link-check` user agent. Redirects were
followed by hand so the final address is known. At most four hosts were
checked at a time, one request per host at a time, with a pause between
requests. Failures were retried once after ten seconds. The full results are
in the ignored `review/.local/` folder, not in the repository.

The run went out from a cloud machine through a proxy. Some sites treat such
traffic as a bot, so "blocked" below means "could not be checked from there",
not "broken". The web.archive.org results are a limit of the tool, not of the
archive (see below).

## Results

| Class        | Count | Meaning                                                                      |
| ------------ | ----: | ---------------------------------------------------------------------------- |
| ok           |   423 | Page answered. Includes redirects to the same page (http to https, `www.`).  |
| redirect     |     5 | Page now lives at another address. None lands on a homepage.                 |
| client error |     6 | The page is gone (HTTP 404).                                                 |
| dead domain  |     6 | The site's name no longer exists (no DNS record).                            |
| server error |     1 | The site answered with an error (HTTP 500), on both tries.                   |
| network      |     6 | No answer: connection timed out, on both tries.                              |
| blocked      |    48 | A bot wall or a refusal (HTTP 403). Needs a check in a normal browser.       |
| tool limit   |   156 | Every web.archive.org address. The Archive refused the connection; untested. |
| **Total**    |   651 |                                                                              |

Three rules keep false alarms out of the "redirect" row. ProPublica's Form 990
pages hand out a short-lived signed storage address; Nature runs a login
handshake that returns to the same article. Both count as ok. A Cloudflare
script on a real "Page not found" page is not a bot wall; that page counts as
a 404.

## Broken links

All twelve dead or missing pages are historical addresses: the original
location of a text from 1994 to 2006. Each record already carries an
`archivedUrl` to a capture from the time, and the
[Wayback capture check of 2026-10-09](../review/wayback-capture-check-2026-10-09.md)
found every one of those captures served exactly as recorded. The evidence
holds. The problem was what a reader saw. The source panel in the Inspector
showed the capture next to "Open the canonical source", but the plain source
lists (an entity's sources in the Inspector, person pages, document
descriptions, search results) linked only the `canonicalUrl`, so there these
links led to an error page.

| Record(s)                                                                                                                                                         | Address in `canonicalUrl`                                 | Result                                         | Recorded capture         |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------- | ---------------------------------------------- | ------------------------ |
| `source-cfai-2001-seed-html`, `source-cfai-2001-glossary-html`, `source-cfai-2001-challenge-html`, `source-cfai-2001-anthro-html`, `source-cfai-2001-policy-html` | `http://singinst.org/CFAI/…` (five pages)                 | Dead domain                                    | 2001-06-17 to 2001-08-10 |
| `source-aipnfgr-2006-draft`                                                                                                                                       | `http://www.singinst.org/AIRisk.pdf`                      | Dead domain                                    | 2006-07-08               |
| `source-eoc-1997-chapter-5`, `source-eoc-1997-chapter-11`, `source-eoc-1997-references`                                                                           | `http://www.foresight.org/EOC/…` (three pages)            | 404 (after a redirect to `foresight.org`)      | 1997-07-09               |
| `source-eder-1994-sandberg-relay`                                                                                                                                 | `http://www.aleph.se/Trans/Global/Singularity/singul.txt` | 404                                            | 1997-07-12               |
| `source-sits-2000-capture`                                                                                                                                        | `http://sysopmind.com/singularity.html`                   | 404 (redirects to yudkowsky.net, page missing) | 2000-12-04               |
| `source-catai-2001-capture`                                                                                                                                       | `http://sysopmind.com/AI_design.temp.html`                | 404 (redirects to yudkowsky.net, page missing) | 2001-01-26               |

**Fix applied (2026-10-13).** The maintainer chose to keep the original
address as the citation and show the capture next to it. Every place that
links a source now adds the archived copy, with its capture date, when the
record has an `archivedUrl` (`ArchiveLink`): an entity's sources in the
Inspector, person pages, document descriptions, search results, institution
dossiers, question pages, research paths, the commitments page and document
histories. No data record changed: the original address is the correct
bibliographic address of the historical text.

## Moved pages

| Record(s)                                          | Old address                                                       | Now                                                                                          | Proposal                                                                                                                    |
| -------------------------------------------------- | ----------------------------------------------------------------- | -------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| `source-google-eu-code-2025`                       | `blog.google/around-the-globe/google-europe/eu-ai-code-practice/` | `blog.google/company-news/inside-google/around-the-globe/google-europe/eu-ai-code-practice/` | Same post, new path. Optional: update both URLs. The redirect works today.                                                  |
| `source-hanson-2008-core-argument` (`evidenceUrl`) | `www.overcomingbias.com/2008/12/what-core-argument.html`          | `www.overcomingbias.com/p/what-core-argumenthtml`                                            | The blog moved to Substack; same post. `canonicalUrl` already has the new address. Optional: update `evidenceUrl` to match. |
| `source-rsp-3-0`                                   | `anthropic.com/responsible-scaling-policy/rsp-v3-0`               | A PDF on `www-cdn.anthropic.com`                                                             | Check in a browser that the PDF is version 3.0, not a later version. If it is, no change.                                   |
| `source-xai-eu-code-post-2025`                     | `x.com/xai/status/1950828488405254268`                            | `x.com/SpaceXSI/status/1950828488405254268`                                                  | The account was renamed; same post number. Record the rename in the source's note; keep the URL.                            |
| `source-xai-eu-code-post-2025` (`evidenceUrl`)     | `publish.twitter.com/oembed?url=…`                                | `publish.x.com/oembed?url=…`                                                                 | Host rename only. No change needed.                                                                                         |

## Not reached: check by hand

| Record(s)                                                                                                    | Address                                                   | Result          | Proposal                                                                                                                                                                                                                                 |
| ------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------- | --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `source-meta-faf-v1-1`, `source-meta-faf-v1-1-revised`                                                       | `ai.meta.com/static-resource/meta-frontier-ai-framework/` | HTTP 500 twice  | Open in a browser. Both records have captures (2025-02-13, 2025-03-28). If the page stays down, the same decision as the broken links applies.                                                                                           |
| `source-arbital-orthogonality`, `source-arbital-instrumental-convergence`, `source-arbital-context-disaster` | `arbital.greaterwrong.com/p/…`                            | Timed out twice | The whole greaterwrong.com site timed out from the cloud machine, so this may be the network. Open in a browser. These three have no `archivedUrl`; look for a capture near 2026-10-06 at `https://web.archive.org/web/2026*/<address>`. |
| `source-arbital-optimization-daemons`, `source-arbital-programmer-deception`                                 | `arbital.greaterwrong.com/p/…`                            | Timed out twice | As above. Both have captures (2021-12-04, 2022-08-16).                                                                                                                                                                                   |
| `source-cn-alibaba-results`                                                                                  | `www.businesswire.com/news/home/20230517005640/en/…`      | Timed out twice | Open in a browser. No capture recorded.                                                                                                                                                                                                  |

The capture lookup could not be done from the cloud machine: web.archive.org
reset or timed out every connection, and the Archive's availability service
answered "429 Too Many Requests". Run it from the maintainer's machine.

## Blocked hosts

These refused the checker. Open a few pages from each in a normal browser.

| Host                          | Addresses | Response                                                                 |
| ----------------------------- | --------: | ------------------------------------------------------------------------ |
| `openai.com`                  |        28 | Cloudflare bot wall                                                      |
| `leginfo.legislature.ca.gov`  |        10 | Bot wall (403)                                                           |
| `github.com`                  |         2 | 403                                                                      |
| `www.sec.gov`                 |         2 | 403 (SEC asks automated clients for a contact address in the user agent) |
| `www.investing.com`           |         2 | Bot wall (403)                                                           |
| `ca.investing.com`            |         1 | Bot wall (403)                                                           |
| `doi.org` → `www.science.org` |         1 | Bot wall (403)                                                           |
| `www.axios.com`               |         1 | Bot wall (403)                                                           |
| `www.cnbc.com`                |         1 | Bot wall (403)                                                           |

The two GitHub addresses are pinned commits (`source-cn-r1-readme`,
`source-cn-glm45-readme`); pinned commit pages do not rot unless the repository
is deleted.

## Web.archive.org

All 156 archive addresses are untested in this run. The first five requests
timed out or were reset, so the script stopped asking the Archive and recorded
the rest as a tool limit. The 2026-10-09 capture check (run from a different
network) found 151 of 154 captures exact; its open items are listed in that
record. To test the archive links, run `pnpm check:links` or
`node scripts/check-wayback.mjs` from the maintainer's machine.

## Limits

- One run from one network. Sites change, and some answer bots differently
  from browsers.
- "ok" means the address answered. It does not mean the page still says what
  the evidence quotes. The quote checks are separate.
- A page that answers 200 with a "not found" message would count as ok. None
  was spotted, but the check does not read page text.
