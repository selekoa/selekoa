# Launch runbook

For the maintainer. The site launched on 2026-10-26 at https://selekoa.org.
This page records how it is hosted and configured, and the steps for routine
changes and rollback. Every step marked **You** needs your action; sessions
push branches only. See [launch readiness](launch-readiness.md) for what was
checked and decided before launch, and [publishing](publishing.md) for the
public source repository.

## How the site is hosted

- **Host:** Cloudflare Pages, connected to `main` of
  `futurelightcone/selekoa-dev`. Build command `pnpm build`, output
  directory `dist`, environment variable `PNPM_VERSION=11.19.0`. Preview
  deployments of other branches are off, so only `main` builds.
- **Merging to `main` deploys.** Every merge rebuilds and replaces the live
  site. Sessions never push to `main`.
- **Domains:** `selekoa.org` serves the site. `selekoa.com` and the `www`
  addresses redirect to `https://selekoa.org/`.
- **Headers:** `public/_headers` (copied to `dist/`) sets caching: a year,
  immutable, for hashed files under `/assets/`; a long cache for dataset
  archives under `/release/`; revalidation for the page itself; an hour for
  `robots.txt` and `sitemap.xml`. A unit test checks the rules.
- **Analytics:** Cloudflare Web Analytics, installed manually through the
  snippet that `site.config.json` adds to `index.html`, not through
  Cloudflare's automatic injection. Keep automatic injection off, or the
  beacon loads twice.
- **Search engines:** Google Search Console and Bing Webmaster Tools are
  verified through DNS records, and the sitemap is submitted to both.
- **Contact:** `maintainer@selekoa.org`, delivered by Cloudflare Email
  Routing. Do not reply from a personal address until an outbound route for
  the role address exists.

## Settings in `site.config.json`

All site settings live in one file. Changing it changes the live site at the
next merge.

| Setting                     | Live value                       |
| --------------------------- | -------------------------------- |
| `indexing`                  | `true`                           |
| `baseUrl`                   | `"https://selekoa.org/"`         |
| `contact`                   | `"maintainer@selekoa.org"`       |
| `analytics.provider`        | `"cloudflare"`                   |
| `analytics.cloudflareToken` | the site's public beacon token   |
| `analytics.goatcounterCode` | `""` (GoatCounter is not in use) |

A production build (`pnpm build`) stops with an error when indexing or
analytics is on and `contact` is the placeholder, when `baseUrl` is not an
https address with a trailing slash, or when the chosen provider's setting is
missing. The unit tests check the same rules, so `pnpm check` fails too.

With indexing on, the build removes `noindex, nofollow` from `index.html`,
adds the canonical address and social preview tags (`og:` and
`twitter:card`, no image), and writes `robots.txt` with `Allow: /` and a
`sitemap.xml`. Every page is built as HTML at its own path, with its own
title, description and canonical address, and the sitemap lists every page
(since 2026-10-27; see `docs/architecture.md`).

The site moves between pages with the History API, which the Cloudflare
beacon counts as page views in its default single-page mode (it reports the
path and query, not a fragment). A change of open claim or search query
within a page replaces the address and is not counted. The About page's
Privacy section follows the provider setting.

## Routine changes

1. A session works on its own branch, runs `pnpm check`,
   `pnpm check:privacy` and, before a pull request, `pnpm test:browser`, and
   pushes the branch.
2. **You:** review and merge the pull request. Cloudflare Pages builds and
   deploys `main`.
3. **You:** after a merge that changes the interface or the settings, open
   the live start page, About & method, a dossier, the dataset download and
   "Copy APA", and check the browser console and network panel: the only
   third-party request is the analytics beacon.

## Dataset releases

`pnpm release <version>` writes a new release directory; review the diff and
merge it like any other change. The About page then offers the new archive.
Releases from format 1.4 state CC BY 4.0. After a release reaches `main`,
sync the public source ([publishing](publishing.md)).

## After launch

- Answer corrections at the published address. The About page says a
  correction keeps the claim's ID when its proposition is unchanged.
- Re-run `pnpm notices` whenever dependencies change. The tests fail if
  `THIRD-PARTY-NOTICES.md` is stale.
- Keep the version at 0.x until the roadmap's version policy is met.
- citeproc-js's licence (CPAL) asks that the source of the bundled form stay
  available for at least twelve months, so keep the public source repository
  public for that long.

## Rollback

- **A bad deploy:** revert the merge commit on `main` (through a pull
  request), or roll back to the previous deployment in the Cloudflare Pages
  dashboard; a rollback there lasts until the next build of `main`.
- **Take the site down quickly:** pause or remove the Pages project's custom
  domain, or point the domain away. Indexed pages disappear from search
  results only after crawlers revisit; use the engines' removal tools for
  urgency.
- **Stop indexing but keep the site:** set `indexing` back to `false` and
  merge. `robots.txt` then disallows all and `noindex` returns.
- **Stop analytics:** set `analytics.provider` to `"none"` and merge. Delete
  the site in the Cloudflare Web Analytics dashboard if you want its data
  removed.
- **A released dataset or licence cannot be withdrawn.** Anyone who received
  a CC BY 4.0 release may keep using that copy under the licence. Releases are
  immutable; a correction ships in a new release.
