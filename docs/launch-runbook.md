# Launch runbook

For the maintainer. The site is prepared but not published. Every step marked
**You** needs your action; nothing here runs without you. Preparation covers:
licence files, third-party notices, version wording, and three switches in
`site.config.json` (indexing, analytics, corrections address). See
[launch-readiness](launch-readiness.md) for what was checked and decided.

All launch settings live in one file, `site.config.json`:

| Setting                     | Before launch               | At launch                                        |
| --------------------------- | --------------------------- | ------------------------------------------------ |
| `indexing`                  | `false`                     | `true`                                           |
| `baseUrl`                   | `""`                        | `"https://your-domain/"` (https, trailing slash) |
| `contact`                   | `"CONTACT-ADDRESS-NOT-SET"` | the corrections address                          |
| `analytics.provider`        | `"none"`                    | `"cloudflare"` or `"goatcounter"`                |
| `analytics.cloudflareToken` | `""`                        | the 32-character token (Cloudflare only)         |
| `analytics.goatcounterCode` | `""`                        | the site code (GoatCounter only)                 |

A production build (`pnpm build`) stops with an error when indexing or
analytics is on and `contact` is still the placeholder, when `baseUrl` is not
an https address with a trailing slash, or when the chosen provider's setting
is missing. The unit tests check the same rules, so `pnpm check` fails too.

## Before launch day

1. **You: buy the domain.** Nothing else depends on it except steps 3 to 5.
2. **You: create the corrections mailbox** on the new domain and decide how
   quickly you can answer. The About page promises no response time; add one
   only if you can keep it.
3. **You: choose where to host** a static site. Options that fit: Cloudflare
   Pages, GitHub Pages, Netlify. Requirements are in the "Static hosting"
   section of [launch-readiness](launch-readiness.md). The build works from a
   host root or a sub-path.

## Launch day, in order

1. **You: set the contact address.** In `site.config.json` set `contact` to
   the real address. The About page then shows it in the Corrections section.
   Run `pnpm check:privacy`; the scanner accepts the address named there.
2. **You: set the base URL.** Set `baseUrl` to the public address, with
   `https://` and a trailing slash.
3. **You: pick and enable analytics (optional).** Free, cookieless options.
   Register with the provider yourself, then edit `site.config.json`:
   - Cloudflare Web Analytics: `"provider": "cloudflare"` and
     `"cloudflareToken": "<token from the Cloudflare dashboard>"`. The build
     adds
     `<script defer src="https://static.cloudflareinsights.com/beacon.min.js" data-cf-beacon='{"token": "..."}'></script>`.
   - GoatCounter: `"provider": "goatcounter"` and
     `"goatcounterCode": "<site code>"`. The build adds
     `<script data-goatcounter="https://<code>.goatcounter.com/count" async src="https://gc.zgo.at/count.js"></script>`.

   Check the provider's current snippet and privacy statement before you
   enable it; the snippets above are the documented forms at preparation time.
   The site uses hash addresses (`#/about`), so a counter may record only the
   first page load of a visit and not each page a reader opens. Whether it
   follows hash changes depends on the provider; test it after launch. The
   About page's Privacy section changes with the provider (cookieless count,
   one script contacts the provider) and needs no editing. If you leave
   analytics off, the page says the site loads nothing from other sites.

4. **You: flip indexing.** Set `indexing` to `true`. The build then removes
   `noindex, nofollow` from `index.html`, adds the canonical address and
   social preview tags (`og:` and `twitter:card`, no image), writes
   `robots.txt` with `Allow: /` and a `sitemap.xml`. With indexing off the
   build writes a `robots.txt` that disallows everything and keeps `noindex`.
   Only the start page is a separate indexable address, because every other
   page is a hash address; expect search engines to list one URL.
5. **You: check and build.**

   ```sh
   pnpm check
   pnpm check:privacy
   pnpm build
   ```

   `dist/` is the site.

6. **You: tag a dataset release that states the licence.** Releases made
   before the licence say that none is granted, and are immutable. To publish
   a release whose manifest and README state CC BY 4.0, run
   `pnpm release 0.5.0` (or the next number), review the diff, and commit it.
   The generator uses release format 1.4 for that. Then rebuild so the About
   page offers it.
7. **You: deploy `dist/`** to the host over HTTPS. Set long caching on
   `assets/`, short caching on `index.html`, compression for text, and correct
   types for `.js`, `.css`, `.svg` and `.zip`. Point the domain at the host.
8. **You: publish the source.** The publication route in the
   [roadmap](roadmap.md) is a fresh public repository under a separate
   organisation, with fresh history, containing `LICENSE`, `LICENSE-DATA.txt`,
   `LICENSING.md` and `THIRD-PARTY-NOTICES.md`. citeproc-js's licence (CPAL)
   asks that the source of the bundled form stay available for at least twelve
   months, so keep that repository public for that long. Check the new
   repository for private material before the first push.
9. **You: verify the live site.** Open the start page, About & method (check
   the Corrections address, Licences and credits links, Privacy text), a
   dossier, the dataset download and "Copy APA". Open the browser console and
   network panel and confirm the only third-party request is the analytics
   script you enabled. Request `robots.txt` and the page source for the
   canonical tag.
10. **You: ask search engines to index** (optional): submit the sitemap in
    each engine's webmaster console.
11. **You: announce.** Link the start page. Say plainly that it is a research
    preview, version 0.x and a work in progress.

## After launch

- Answer corrections at the published address. The About page says a
  correction keeps the claim's ID when its proposition is unchanged.
- Re-run `pnpm notices` whenever dependencies change. The tests fail if
  `THIRD-PARTY-NOTICES.md` is stale.
- Keep the version at 0.x until the roadmap's version policy is met.

## Rollback

- **Take the site down quickly:** remove or replace the deployed files at the
  host, or point the domain away. Indexed pages disappear from search results
  only after crawlers revisit; use the engines' removal tools for urgency.
- **Stop indexing but keep the site:** set `indexing` back to `false`,
  rebuild and redeploy. `robots.txt` then disallows all and `noindex` returns.
- **Stop analytics:** set `analytics.provider` to `"none"`, rebuild and
  redeploy. Delete the site in the provider's dashboard if you want its data
  removed.
- **A released dataset or licence cannot be withdrawn.** Anyone who received
  a CC BY 4.0 release may keep using that copy under the licence. Releases are
  immutable; a correction ships in a new release.
- **A bad deploy:** redeploy the previous `dist/`, or revert the commit and
  rebuild.
