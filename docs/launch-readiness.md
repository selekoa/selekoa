# Launch readiness

For the maintainer. This records the readiness pass on the application and
documents before launch, and the decisions taken. The site launched on
2026-10-26 at https://selekoa.org; the sections below keep what was true when
they were written, and [Status after launch](#status-after-launch) records
what changed. Current hosting and settings are in the
[launch runbook](launch-runbook.md). Current counts are not copied here; the
About & method page and the latest release manifest carry them.

## What was checked

Method: the production build served locally, driven by a headless browser at
1440 px and 390 px wide, in light and dark themes. Pages walked: the start page,
About & method, the explorer, search (with and without a query), a document
history, a control-structure page, the external commitments page, both
proposition collections, a guided reading, a research question, an institution
dossier and several person pages, plus two addresses that match no record.

- **Console and network.** No console errors or warnings on any page. No
  request left the page's own origin, so there are no external fonts, scripts,
  analytics or runtime fetches. Fonts are system serif and sans stacks.
- **Links inside the app.** Every link and button on the start page leads to a
  page that opens. An address that matches no record shows a notice and the
  explorer, and does not substitute another record.
- **Layout.** No horizontal overflow on any walked page at either width.
- **Accessibility.** An automated scan (axe) over nine page types, both widths
  and both themes found two defects, both fixed (below). Keyboard tabbing
  through the start page, explorer and About page showed no trap. Images have
  alt text or are decorative. The stylesheet disables animation and smooth
  scrolling under reduced motion, and the code runs no camera or graph
  animation.
- **Reader-facing wording.** The style guide's self-check patterns were run
  over the interface and collection text. The remaining matches are code
  identifiers or data handling, or the deliberate "Seed · not editorially
  accepted" label that the style guide keeps in the Evidence Inspector.
- **Hygiene of tracked files.** The privacy scan passes. A separate search found
  no personal email, home path, token or private research input in tracked
  files. The only address in the repository is the provisional role address
  `maintainer@selekoa.org` in the roadmap and the privacy scanner. The
  maintainer's pseudonym `futurelightcone` appears as the reviewer name on the
  human-reviewed evidence records and as the package author, which is what the
  project instructions designate as maintainer identity.
- **Review status on the About page.** It states plainly that the records are
  exploratory, that nearly all claims are not editorially accepted, that
  nearly all evidence is machine-checked only, what each label means, and where
  coverage and checking stop. The start page and every collection page repeat
  the status with a notice. No overstated wording was found beyond the
  explorer tagline fixed below.

## Static hosting

- Addresses are real paths (`/about`, `/person/<id>`; see
  `docs/architecture.md`, "Addresses and pre-rendered pages"; changed
  2026-10-27). The build writes one HTML file per page,
  `person/<id>.html` for `/person/<id>`, which Cloudflare Pages serves at the
  path without `.html` and without a redirect, and a `404.html` that the host
  sends for any other path. Earlier `#/…` addresses are moved to their paths
  in the browser.
- The build uses an absolute asset base (`/`), so it must be served from a
  host root. (Before 2026-10-27 it used a relative base and also worked from
  a sub-path.)
- A host needs to: serve `dist/` as-is over HTTPS from the root; serve
  `x.html` at `/x`; send `404.html` for unknown paths; send correct types for
  `.js`, `.css`, `.svg` and `.zip`; compress text (the records bundle is about
  3 MB raw and roughly 0.5 MB compressed); and cache hashed files under
  `assets/` for a long time and the pages briefly.
- Caching on Cloudflare Pages (added 2026-10-27): `public/_headers`, copied
  to `dist/`, caches `/assets/*` for a year as immutable, `/release/*` for 30
  days (not immutable, because each archive also carries the current licence
  files), and `robots.txt` and `sitemap.xml` for an hour, and sends
  `no-cache` for every page (`/`, `/index.html`, `/404.html`, the hubs,
  About, Search, the explorer and one splat rule per page prefix such as
  `/person/*`) so a deploy reaches readers at once; a unit test checks that
  each built page matches exactly one rule.
  It also states `X-Content-Type-Options: nosniff` and
  `Referrer-Policy: strict-origin-when-cross-origin`, which match the host's
  defaults and do not affect the analytics beacon or the system fonts. It sets
  no Content-Security-Policy, which would have to follow the analytics
  setting. A unit test checks the rules.
- Machine-readable addresses (added 2026-10-27): the build copies the latest
  release directory's files, byte for byte, with `manifest.json` and the two
  licence files, to `dist/data/` (`/data/claims.json`, `/data/README.md` and
  so on), and writes `/llms.txt` from `site.config.json` and the release
  manifest (`src/site/machine-readable.ts`). With indexing on, `sitemap.xml`
  lists both; `robots.txt` allows them. `_headers` caches `/data/*` and
  `/llms.txt` for a day, sends `Access-Control-Allow-Origin: *` on them so
  browser-based tools can fetch the public records (no cookies or credentials
  are involved), and gives each data file a UTF-8 `Content-Type`, one rule per
  file because two matching rules would join their values. Earlier releases
  are not copied file by file (about 80 MB more per build); their ZIP archives
  under `/release/` are the versioned route.
- Dataset ZIP archives are built into `dist/release/` from the `release/`
  directories. The first load fetches the records bundle only when a page other
  than the start page is opened.
- `index.html` carries `noindex, nofollow`, and the build writes a
  `robots.txt` that disallows everything. Setting `indexing` to `true` in
  `site.config.json` removes `noindex`, adds the canonical address and social
  preview tags and writes an allowing `robots.txt` and a `sitemap.xml` (see
  the [launch runbook](launch-runbook.md)).
- Nothing was configured, deployed or contacted during this pass.

## What was fixed

Commits on branch `launch-readiness` (no pull request opened):

1. Relative build base, so the build works from a root or a sub-path.
2. Phone navigation: the primary navigation was hidden below 720 px, leaving a
   phone reader without a route to About, Search or the document histories.
   It is now a second header row that scrolls sideways.
3. Research question and guided reading pages: the question was a third-level
   heading directly under the page title (heading order defect). It is now a
   second-level heading, with the same appearance.
4. Explorer tagline said "Every claim is dated and sourced". Some records are
   undated, so it now says each claim links to its source passage, its dates
   where known and its limits.
5. Dark mode: the numbered index on the explorer's start guide failed
   contrast. It now uses the muted text colour in both themes.
6. A plain `noscript` message instead of a blank page.

Checks run: `pnpm check` (formatting, lint, types, unit tests, build) and
`pnpm check:privacy` before each push; the browser suite once (installed Edge, against the production
preview, on a private port) after the last interface change; it passed.

## Dark mode and design tokens (2026-10-14)

Branch `design-tokens-dark-mode`, no pull request opened. The maintainer
reported dark mode as "another light mode with some areas darkened" and pages
as "a tad all over the place".

- **Cause.** Dark mode was a set of overrides on top of light colours. About
  80 distinct colours were written directly into the stylesheets, so status labels,
  the preview badge, hover states, filters and boxes kept light backgrounds or
  dark text in dark mode. The theme also ignored the system setting and
  always started light.
- **Change.** One token layer, `src/tokens.css`, defines every colour with a
  light and a dark value, plus the type, spacing and radius scales. All
  stylesheets use the tokens; the per-selector dark rules are gone. The theme
  follows the system setting until the header toggle is pressed and stores
  nothing in the browser. See [design tokens](design-tokens.md).
- **Consistency.** Section headings on reading pages share one size, entry
  and edition headings another; reading pages share top padding and section
  spacing; notice and box styles match; the review notice no longer sits
  indented on search and other reading pages. No page structure or content
  was moved or removed.
- **Guard.** A unit test fails if a stylesheet under `src/` uses a literal
  colour outside the token file.
- **Checks.** Screenshots of every page type at 1440 px and 390 px in both
  themes, before and after (kept locally, not committed). A computed-style
  sweep over 18 pages found no light backgrounds or dark text in dark mode
  and no dark patches in light mode. An axe scan of twelve page types at
  both widths in both themes found no violations. `pnpm check`,
  `pnpm check:privacy` and the browser suite (Chromium, against the production
  preview) passed: 129 tests.
- **Open.** Remembering a reader's theme choice between visits would need
  browser storage, which the About page currently rules out ("stores nothing
  in your browser"). That is the maintainer's call. Decided 2026-10-15: the
  explicit choice is stored in `localStorage`, and the About page says so
  ([policy review, section 7](policy-review-2026-10-15.md#7-no-browser-storage-theme-memory)).

## Licence and attribution gaps

Status after the launch-preparation pass of 2026-10-10 (branch `launch-prep`).

- **Licence files: done.** `LICENSE` (MIT, code), `LICENSE-DATA.txt` (CC BY 4.0
  legal code) and `LICENSING.md` (scope) exist. Dataset releases from format
  1.4 state the licence in their manifest. Earlier releases are immutable and
  still say none is granted; `LICENSING.md` states the terms for them and the
  downloadable archives carry the licence files.
- **Source terms: open.** Every source record has an attribution string and a
  reuse note. Most notes say "no open redistribution licence asserted", which
  is accurate but is not a terms check. No source's own terms of use were
  reviewed for whether they allow short quotation beyond ordinary
  fair-dealing practice. The editorial policy says publisher terms that forbid
  quotation override its quoting rules. Checked on 2026-10-12 for the 15 most
  quoted terms owners, including LessWrong, the Alignment Forum and the SL4 and
  Extropians archives: see [source terms](source-terms.md). No terms read forbid
  short quotation; OpenAI, Meta and the English EUR-Lex notice still need a manual
  read, and its proposals await a decision.
- **Open-licence sources: open.** Sources under a stated open licence
  (Creative Commons, Open Government Licence) carry the licence name but no
  licence link. Some licences ask for a link or a notice.
- **BY-ND and all-rights-reserved sources: open.** A few sources state a BY-ND
  licence or "all rights reserved". Short attributed quotation is the practice
  for all of them. A rights owner can still object, which is the takedown
  question.
- **"Copy APA": done, with a reading that is not legal advice.** citeproc-js
  offers CPAL-1.0 or AGPL-1.0; Selekoa uses it under CPAL-1.0. The
  distribution names no attribution requirement (Exhibit B is empty), but
  CPAL asks for a source-availability notice and a copy of the licence, and
  treats network deployment as distribution. The APA style file is CC BY-SA
  3.0 and is credited. The About page carries the credit, and
  `THIRD-PARTY-NOTICES.md` (generated by `pnpm notices`, checked by the unit
  tests) lists every shipped dependency with its licence text. The source of
  the bundled form must stay available for at least twelve months, which is
  why the runbook says to keep the public repository up.
- **Upstream datasets:** none imported, so none to attribute.
- **npm dependency licences: audited for the runtime closure.** All are MIT or
  BSD-3-Clause apart from citeproc-js. A new dependency with another licence
  stops `pnpm notices` until it is reviewed.

## What remains

- The corrections and takedown address. `site.config.json` holds a placeholder
  that a public build refuses.
- A short takedown and correction policy beyond the About page's current
  wording, and a response time, if wanted.
- Dataset evidence notes on many records say a passage was "inspected by
  Codex". That names a tool, not a person. Data records were not edited; the
  count is in the preparation report, not here.
- The corpus names living people in career and funding records, and one
  collection concerns one named living author's published arguments. The
  maintainer chose to show everything.
- Source links were checked on 2026-10-12 ([link check](link-check.md)): twelve
  historical addresses are dead but have recorded captures, five pages moved,
  and nine hosts block automated checks and need a browser check. The
  web.archive.org links could not be tested from the cloud machine.
- Not tested: real phones, screen readers, print, slow connections, and a live
  deployment.
- The roadmap's provisional contact `maintainer@selekoa.org` is superseded by
  the address on the new domain.

## Decisions

Recorded 2026-10-10 by the maintainer.

1. **Publish later, on his go.** "Prepare the launch, don't go live." The
   branch `launch-prep` is not merged and nothing is deployed. The final
   switch is the [launch runbook](launch-runbook.md).
2. **Show everything.** All collections launch. No subset was held back.
3. **Review-status framing.** Keep "research preview" and the machine-first,
   unreviewed-status statements as they stand. Say plainly that the project is
   version 0.x and a work in progress. Done: the start page, footer and About
   page derive the wording from the latest dataset release.
4. **Licences.** MIT for code; CC BY 4.0 for Selekoa's own data and text, with
   third-party quotations excluded. Done (see above). The copyright holder is
   the pseudonym `futurelightcone`.
5. **"Copy APA" stays,** with citeproc-js's obligations met as far as they can
   be met before publication (see above).
6. **Pseudonym.** `futurelightcone` may appear publicly as holder, reviewer
   and package author.
7. **Indexing.** The site is public and indexable once published. One setting
   (`indexing` in `site.config.json`) switches it, with the canonical address
   and preview tags. It is off.
8. **Analytics.** Wanted, free or low cost and privacy-preserving (Cloudflare
   Web Analytics or GoatCounter). A build-time setting adds the script; it is
   off and loads nothing from third parties until the maintainer sets it.
9. **Contact.** An address on the maintainer's new domain, not yet known. A
   configurable value with a placeholder that a public build refuses.

Recorded 2026-10-17 by the maintainer:

10. **Tagline.** "A documentary history of machine intelligence."
11. **Host.** Cloudflare Pages, with the domains (`selekoa.org`, and `selekoa.com`
    if taken) registered at Cloudflare. Contact `maintainer@selekoa.org` through
    Cloudflare Email Routing; replies must not be sent from a personal address
    until an outbound route for the role address exists.
12. **Analytics.** Cloudflare Web Analytics.
13. **Positioning on the start page.** The opening sentence says that Selekoa
    is machine-first and that this is the point: a starting point for research,
    for an academic or for any interested reader, with every record linked to
    its source to verify and build on. About & method may say plainly that the
    selection also reflects the maintainer's own interests within the field, a
    little like a research diary. Later on 2026-10-17 the maintainer chose
    the opening sentence, to be implemented in the restructure (the app is
    not yet changed): "Selekoa is a machine-first starting point for research
    on the history of machine intelligence: machines find and check the
    records, and every one links to its source, for you to verify and build
    on."
14. **Timing.** Go public after the maintainer's return from a short break,
    not before it, so the first days after launch can be watched. The
    structure proposal in [fresh-eyes-2026-10-14.md](fresh-eyes-2026-10-14.md)
    is to be decided before launch, since restructuring afterwards breaks
    saved links.

Still the maintainer's: register the domains, set up mail routing, connect the
host, register with the analytics provider, optionally review publisher terms,
publish the source, decide the structure proposal, and flip the switches in the
runbook.

## Status after launch

Recorded 2026-10-27. The site launched on 2026-10-26.

- **Hosting:** Cloudflare Pages builds `main` of
  `futurelightcone/selekoa-dev` (`pnpm build`, output `dist`,
  `PNPM_VERSION=11.19.0`, preview deployments off). Merging to `main`
  deploys.
- **Domains:** `selekoa.org` serves the site; `selekoa.com` and the `www`
  addresses redirect to it.
- **Analytics:** Cloudflare Web Analytics through the snippet added by
  `site.config.json` (manual install, not automatic injection).
- **Search engines:** Google Search Console and Bing Webmaster Tools verified
  through DNS; the sitemap is submitted.
- **Contact:** `maintainer@selekoa.org` through Cloudflare Email Routing. The
  "What remains" item on the contact address is done; the provisional address
  became the real one.
- **Source:** the public repository `selekoa/selekoa` holds snapshot commits
  of the source; the routine is in [publishing](publishing.md).
- Still open from "What remains": a takedown and correction policy beyond the
  About page and a response time, if wanted; the publisher terms still to be
  read by hand ([source terms](source-terms.md)); licence links for
  open-licence sources; the "inspected by Codex" notes; and tests on real
  phones, screen readers, print and slow connections. This record does not
  say whether the live site was checked after deployment.
