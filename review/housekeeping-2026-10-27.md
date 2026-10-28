# Housekeeping, 2026-10-27

Branch `housekeeping-2026-10-27` from `origin/main` (`6035cc7`). No pull
request opened, nothing deployed, no data records, `site.config.json` or the
public repository touched.

## 1. Caching headers

- New `public/_headers` (Cloudflare Pages format); Vite copies it to
  `dist/_headers` (checked after `pnpm build`).
- `/assets/*`: `public, max-age=31536000, immutable` (hashed file names).
- `/release/*`: `public, max-age=2592000` (30 days). Not `immutable`: a
  release's records never change, but each archive also carries the current
  `LICENSE-DATA.txt` and `LICENSING.md`, so its bytes can change if those do.
- `/` and `/index.html`: `no-cache`.
- `/robots.txt`, `/sitemap.xml`: `public, max-age=3600`.
- `/*`: `X-Content-Type-Options: nosniff` and
  `Referrer-Policy: strict-origin-when-cross-origin`. Both match the host's
  defaults; the beacon script is served with a script type and the fonts are
  system stacks, so neither is affected. No Content-Security-Policy, no
  cross-origin policies and no `Cache-Control` on `/*`.
- `src/site/headers.test.ts` parses the file and checks these rules.

## 2. Docs from "pre-release" to "launched"

- `AGENTS.md`: the private/pre-release line now states the launch, the private
  dev repository and the public snapshot repository; the authorization rule
  now covers domains, hosting, analytics, licences and the public repository;
  "Nothing is published, deployed or licensed" now says sessions do none of
  these. New rule: merging to `main` deploys the live site, so sessions never
  push to `main`. Other rules unchanged.
- `README.md`: live at selekoa.org since 2026-10-26; the local-run note says
  the page loads the analytics beacon under the current settings; the release
  note no longer says "Nothing is published"; link to `docs/publishing.md`.
- `docs/launch-runbook.md`: rewritten for the launched state (hosting, build
  settings, domains, headers, analytics install, search consoles, contact,
  live settings, routine changes, releases, rollback). The pre-launch steps
  were removed from it; they remain in Git history.
- `docs/launch-readiness.md`: pre-launch sections kept as written, with an
  intro note, a caching bullet under "Static hosting" and a new "Status after
  launch" section listing what changed and what is still open.
- `docs/roadmap.md`: two sentences that said nothing was published and the
  public repository was future.

## 3. Public source sync routine

New `docs/publishing.md`: the two repositories, when to sync, and the steps
(attach both, `git archive origin/main` into the public checkout, privacy
audit, tree-ID equality with dev main, one commit "Selekoa source at dataset
release vX.Y.Z" with the repository-local identity and no trailers, never
rewrite public history). It notes that the different repository names let a
session check out both.

## 4. Summers date line

`PathRow` in `src/ui/PersonPage.tsx` printed one "Source published …" phrase
per source without naming it. A row with several sources now names each
source (title in `<cite>`), so Lawrence Summers' board row reads "Sam Altman
returns as CEO, OpenAI has a new initial board: published 2023-11-29 · Our
structure: publication date unknown". A row with one source keeps "Source
published …". The phrase logic is `publicationPhrases` in
`src/domain/person-profile.ts`; `readingDates` now also carries the source
title. Tests: a unit test in `src/domain/person-profile.test.ts` (Summers row,
and every person-path row: one source unnamed, several named) and a browser
test in `tests/browser/reader-fixes.spec.ts`.

## Checks

- `pnpm install --frozen-lockfile`: done.
- `pnpm -s check` (format, lint, types, unit tests, build): passed.
  `dist/_headers` present after the build.
- `pnpm -s check:privacy`: passed. A first run flagged a Windows home-path
  example in `docs/publishing.md`; the wording was changed to describe the
  paths instead.
- `pnpm test:browser` with Chromium (untracked copy of `playwright.config.ts`
  without the Edge `channel` line, deleted afterwards), 160 tests: the first
  run reached test 102 without a failure before the session's 30-minute
  background limit stopped it; a second run of the remaining files, from
  `reader-fixes.spec.ts` on (64 tests, including the new Summers test),
  passed. Every test ran at least once; none failed.
