# Wayback capture check — 2026-10-09

Run of `node scripts/check-wayback.mjs` against the 154 sources in `data/sources.json` whose `archivedUrl` is on web.archive.org. Each request was `https://web.archive.org/web/<timestamp>id_/<url>` without following redirects.

## Method and limits

- Sequential requests, 1.5 s pacing, up to three attempts per source with a 20 s and 40 s backoff.
- The first run at 1 s pacing was refused by the Archive after about 40 sources (connection refused), so its later results were discarded as retrieval failures. The script now paces at 1.5 s and backs off between attempts.
- Results are not stable between runs. An earlier partial run flagged `source-fsf-archive` and `source-pf-beta` as redirects, and two sources reported by the maintainer as redirecting (`source-meta-aasf-announcement`, `source-california-ag-openai-mou-2025`) were exact in the complete run; `source-ca-bpc-22757-12` and `source-ca-bpc-22757-13` returned 404 in an earlier run and `-13` was exact later. Treat one clean run as a snapshot, not proof.

## Complete run (154 sources)

| Result            | Count |
| ----------------- | ----: |
| exact             |   151 |
| redirect          |     2 |
| 404               |     0 |
| failed (timeouts) |     1 |

A targeted re-run of nine sources (the two redirects, the sources flagged in any run, and the failure) gave: 6 exact, 2 redirects (same two), 1 404 (`source-ca-bpc-22757-12`), 0 failed.

## Changes made

Both served captures were fetched and every evidence passage of type `quote` for the source was found word for word (after Unicode, quote-mark, hyphen and whitespace normalisation) in the text layer of the served PDF.

| Source                                    | Recorded `archivedUrl` timestamp | Served capture | `archivedAt`                     |
| ----------------------------------------- | -------------------------------- | -------------- | -------------------------------- |
| `source-fsf-3-0`                          | 20250922133155                   | 20250922134959 | unchanged (2025-09-22; same day) |
| `source-openai-chatgpt-agent-system-card` | 20250717201643                   | 20250717225133 | unchanged (2025-07-17; same day) |

Quote checks: `source-fsf-3-0` 10 of 10 quote passages found; `source-openai-chatgpt-agent-system-card` 1 of 1. The remaining 12 evidence records of `source-fsf-3-0` are paraphrases or absence statements and cannot be matched verbatim; they were not re-checked and are unchanged.

## Not changed — for the maintainer

- `source-ca-bpc-22757-12` (20260130073345): 404 in one run and the targeted re-run, exact in the complete run. Inconsistent; no data change.
- `source-openai-leadership-transition-2023` (20231117203025): connect timeout after three attempts in the complete run; exact in the targeted re-run.
- `source-meta-aasf-announcement` and `source-california-ag-openai-mou-2025`: reported by the maintainer as redirecting (the latter to a different day, 20251029090302); exact in both runs here. No change; re-run the script when the Archive is quiet.

Historical files (`review/week4a-before-2026-10-03.json` and others) keep the earlier timestamps as recorded.

The correction changes stored rows that earlier packs depend on, so it is recorded as the before-snapshot `review/wayback-capture-dates-before-2026-10-09.json` and one entry in `src/editorial/historical-views.ts`.
