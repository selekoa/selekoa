# Draft format (laws-compared)

One file per drafting group: `drafts/<group>.json`.

```json
{
  "group": "eu",
  "drafter": "fresh-context drafting pass, 2026-11-01",
  "cells": [
    {
      "instrument": "eu-ai-act",
      "question": "Q13",
      "status": "stated | partly | not-found | not-applicable | not-retrieved",
      "passages": [
        {
          "source": "eu-ai-act",
          "locator": "Article 101(1), first subparagraph",
          "quote": "exact words from the cached text",
          "translation": "Selekoa's working English translation (Chinese passages only)",
          "datasetClaim": "aia-art101-gpai-fines (only when the quote is reused verbatim from the dataset)"
        }
      ],
      "note": "Conditions and scope, neutral, one or two sentences. Never a judgement.",
      "search": {
        "read": "sections read",
        "terms": ["term", "term"],
        "setAside": [
          {
            "locator": "Article 92(1)",
            "reason": "why it does not meet the criterion"
          }
        ]
      }
    }
  ],
  "omissions": ["provisions seen but not used, with reason"],
  "retrievalFailures": [],
  "openQuestions": ["for the maintainer, each with a recommendation"]
}
```

- `passages` is required for `stated` and `partly`; it may hold one to three passages.
- `search` is required for `not-found` and recommended for `partly` (what was read to find the stronger form).
- `not-applicable` needs a `note` giving the reason.
- Exactly one cell per instrument × question (Q01–Q15).
- A quote is a contiguous run of the source text; `…` joins fragments that occur in order in the same provision. Keep each quote to the shortest passage that carries the point.
