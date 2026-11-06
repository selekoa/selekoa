# Draft format (model-cards)

Each drafting group writes three files in `drafts/`:

## `inventory-<group>.json`

Every card located for the group's developers, 2023-01-01 to 2026-11-01, and every model release searched for without a card being located.

```json
{
  "group": "anthropic",
  "searched": "where and how the inventory was built: index pages read, search terms, date",
  "cards": [
    {
      "developer": "Anthropic",
      "model": "Claude 3.7 Sonnet",
      "title": "Claude 3.7 Sonnet System Card",
      "kind": "system card | model card | safety report | addendum",
      "url": "https://…",
      "cardDate": "2025-02 (kind: date printed on the card) or null",
      "retrieved": "yes | no (HTTP 403) | not attempted",
      "cacheKey": "anthropic-claude-3-7-sonnet or null",
      "compared": true,
      "selectionNote": "latest card of 2025 reporting its own evaluations | not the latest of its year | addendum, …"
    }
  ],
  "noCardLocated": [
    {
      "developer": "Meta",
      "model": "…",
      "search": "pages and terms searched; what was found instead (technical report, blog post)"
    }
  ]
}
```

## `sources-<group>.json`

One entry per retrieved card that has a compared row (and any other document quoted).

```json
[
  {
    "key": "anthropic-claude-3-7-sonnet",
    "cacheKey": "anthropic-claude-3-7-sonnet",
    "developer": "Anthropic",
    "model": "Claude 3.7 Sonnet",
    "title": "Claude 3.7 Sonnet System Card",
    "kind": "system card",
    "url": "address fetched",
    "finalUrl": "address after redirects, query string stripped",
    "httpStatus": 200,
    "sha256": "from .local/model-cards/doc/<key>.json",
    "retrievedAt": "2026-11-02",
    "documentWords": {
      "count": 17492,
      "basis": "Whitespace-separated words in the UTF-8 text layer of the retrieved PDF (tools.mjs words), 2026-11-02."
    },
    "datasetSource": "source-ab-claude37-card (only if the dataset already has this exact document; check data/sources.json)",
    "frameworkEditions": ["rsp-v2-0"],
    "archive": {
      "capture": null,
      "note": "Not checked: web.archive.org refused connections from this environment. (Or the dataset source's archivedUrl, marked unchecked.)"
    }
  }
]
```

## `<group>.json` (cells)

```json
{
  "group": "anthropic",
  "drafter": "fresh-context drafting pass, 2026-11-02",
  "cards": [
    {
      "id": "anthropic-claude-3-7-sonnet",
      "developer": "Anthropic",
      "model": "Claude 3.7 Sonnet",
      "year": 2025,
      "source": "anthropic-claude-3-7-sonnet",
      "frameworkEditions": ["rsp-v2-0"],
      "frameworkEditionNote": "how the edition was identified from the card's own words"
    }
  ],
  "cells": [
    {
      "card": "anthropic-claude-3-7-sonnet",
      "question": "Q05",
      "status": "stated | partly | not-found | not-applicable",
      "passages": [
        {
          "source": "anthropic-claude-3-7-sonnet",
          "locator": "Section 1.4 'Release decision process', p. 6",
          "quote": "exact words from the cached text"
        }
      ],
      "note": "Scope and condition, neutral, one or two sentences. Never a judgement.",
      "search": {
        "read": "sections read",
        "terms": ["term", "term"],
        "setAside": [
          { "locator": "…", "reason": "why it does not meet the criterion" }
        ]
      }
    }
  ],
  "omissions": ["passages seen but not used, with reason"],
  "retrievalFailures": [],
  "openQuestions": ["for the maintainer, each with a recommendation"]
}
```

- Exactly one cell per card × question (Q01–Q16).
- `passages` is required for `stated` and `partly` (one to three passages); `search` is required for `not-found` and recommended for `partly`.
- `not-applicable` needs a `note` with the reason.
- A quote is a contiguous run of the card's text; `…` joins fragments that occur in order in the same section. At most 50 words, usually far fewer.
- Locators give the section heading or number and the PDF page (`tools.mjs grep` prints `PDF p. N`; give the printed page too if it differs). For HTML cards give the section heading.
