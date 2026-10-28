# Start-page tweaks, 2026-10-26

Implements the maintainer decisions of 2026-10-26 for the start page. No
dataset records, docs or site configuration changed.

## What changed

1. **Heading.** The start page `h1` is now the tagline "A documentary history
   of machine intelligence." The approved sentence follows unchanged as the
   lead paragraph (`.landing-deck`, the deck style already used on hub pages).
2. **Header tagline.** With the tagline as the page heading, the header line
   next to the wordmark repeated it word for word directly above. The header
   tagline and its divider are now hidden on the start page only
   (`SiteHeader` with `current === 'home'`); every other page keeps them.
3. **"Machine-first" once.** The only other reader-facing use was the term
   "Machine-first research" in the "How this was checked" list on About &
   method. It is renamed "Automated research"; its definition is unchanged.
   The lead sentence is now the only reader-facing occurrence (a browser test
   asserts one match on the start page).
4. **Shorter "Not yet covered".** The start page now says: "Coverage is
   selective. The largest gaps are whether developers followed their own
   frameworks, model capabilities, chip export controls and most AI
   developers. What is not covered →". It is two lines at 1440 px (measured);
   at 390 px it wraps to four lines, as any text of this length must. The
   link opens About & method and focuses a new "Not yet covered" subheading
   (`#about-not-covered`) under Current coverage, which holds the previous
   fuller text, including the economics note. "Those named on the About &
   method page" became "those named above", since the list of covered
   institutions now sits directly before it.
5. **Featured question.** "Who controlled OpenAI, and when? →" sits above the
   hub cards, under "What's covered", and opens the OpenAI control-structure
   page ("OpenAI's control structure, 2015–2026"). That page answers it: its
   stated question is which entity has controlled OpenAI's for-profit
   business, through which instrument and from when. The link renders only if
   that collection exists. The Governance card no longer shows its OpenAI
   control question; the Governance hub page still lists it.

Mechanics: a `not-covered` start action mirrors `how-checked`; both now use
one `showAboutSection(id)` helper in `Workspace.tsx`. The unused
`.landing-opening` styles were removed and `.landing-featured` added (serif,
minor-heading size, underlined accent link; no box or decoration).

## Checks

- `pnpm install --frozen-lockfile`: ok.
- `pnpm -s check`: passed.
- `pnpm -s check:privacy`: passed.
- `pnpm test:browser` (Chromium via an untracked config without the Edge
  `channel` line): see result below.
- Axe (wcag2a, wcag2aa, wcag21aa) on the start page and About & method at
  390 and 1440 px, light and dark: no violations.
- App inspected at both widths and themes: no horizontal overflow. Console
  shows only the Cloudflare Web Analytics beacon being refused by CORS on
  localhost, which predates this change and does not occur on the live
  origin.
- Style-guide self-check on changed lines: no matches.
- `pnpm -s check` and `pnpm -s check:privacy` re-run after the test edits: passed.

Browser suite: 148 passed, 1 failed on the full run; the failure was then
fixed and the test passes on its own (details below).

- First full run: 98 failed. Every failure was the same console error. The
  production build includes the Cloudflare Web Analytics beacon (#62), and
  its request fails CORS on `127.0.0.1`, which the suites' `collectErrors`
  records. This happens on `main` too. For the re-run, the beacon tag was
  stripped from the local, untracked `dist/index.html` only. Nothing tracked
  changed. Open question: the suites probably need the beacon excluded from
  test builds, or its console errors filtered.
- Second full run: 148 passed, 1 failed (`explorer.spec.ts`, "About & method
  states coverage…"). It clicked the old start-page link "About Selekoa and
  its method →", which this change replaced; it now uses the primary
  navigation. The same test still expected the pre-launch placeholder
  contact and `noindex`, which fails on `main` since #58/#62. It now checks
  the contact and robots state from `site.config.json`. Re-run: passed.

## Open questions

- The gaps line says "most AI developers" without naming the covered ones;
  the link target names them. If the maintainer prefers the line to name
  them, it will run past two lines at 1440 px.
- The featured question sits inside the "What's covered" section, under its
  heading, rather than above that heading, so no new section was added.
