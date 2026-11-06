# Adds the Illinois row (decision 7a) to the laws-compared drafts. Run once,
# from this folder, on 2026-11-04. Writes drafts/us-illinois.json and edits
# drafts/instruments.json, drafts/integrator.json and drafts/sources.json.
#
# The enacted text (Public Act 104-0538) could not be retrieved from the
# preparer's environment: www.ilga.gov answered HTTP 403 ("Access Denied")
# after its certificate chain was completed with the issuer's published
# intermediate, and web.archive.org reset every connection. The one quotation
# from the act is the cross-family checker's, from its copy of 2026-11-03
# (second-pass-codex-report-2026-11-03.json, case 5), and is labelled so.
import json

CHECKER_COPY = (
    "second-pass-codex-report-2026-11-03.json, case 5 (checker's copy, "
    "SHA-256 f10cd7d854d5a6e1ab2c5e982e458d744abbfbdafde97f897ae03d1d8069f71f)"
)
NOT_READ = (
    "Text not retrieved by the preparer (2026-11-04): www.ilga.gov HTTP 403 "
    "Access Denied; web.archive.org connection reset. The question could not "
    "be checked against the act."
)


def load(p):
    with open(p, encoding="utf-8") as f:
        return json.load(f)


def save(p, d):
    with open(p, "w", encoding="utf-8") as f:
        json.dump(d, f, ensure_ascii=False, indent=2)
        f.write("\n")


def nr(q, lead=None):
    c = {
        "instrument": "il-aisma",
        "question": q,
        "status": "not-retrieved",
        "note": NOT_READ,
    }
    if lead:
        c["lead"] = lead
    return c


LEAD = "The checker's second pass reports "
NO_READING = "The checker's second pass records no reading on this question."
UNVERIFIED = " (checker's paraphrase of its copy; not quoted, not verified by the preparer, not evidence for this cell)."

cells = [
    nr(
        "Q01",
        LEAD
        + "that section 5 (PDF pp. 3–4) defines frontier developers by training or initiating training of a frontier model, and large frontier developers by an added revenue condition"
        + UNVERIFIED,
    ),
    {
        "instrument": "il-aisma",
        "question": "Q02",
        "status": "stated",
        "passages": [
            {
                "source": "il-pa104-0538",
                "locator": "Section 5, definition of “frontier model”, first sentence, PDF p. 4 (checker’s copy)",
                "quote": "“Frontier model” means a foundation model that was trained using a quantity of computing power greater than 10²⁶ integer or floating-point operations.",
                "copy": CHECKER_COPY,
            }
        ],
        "note": "Quotation as recorded by the cross-family checker from its copy of the enacted text, with PDF line breaks collapsed; the preparer could not retrieve the text and has not matched it. The checker also reports that the compute count includes later fine-tuning, reinforcement learning or other material modifications, and that a large frontier developer also exceeds $500 million in prior-year gross revenue with its affiliates (section 5; paraphrase, not verified here).",
    },
    nr(
        "Q03",
        LEAD
        + "a framework duty for large frontier developers in section 10(a), PDF pp. 4–5, beginning 1 January 2028"
        + UNVERIFIED,
    ),
    nr(
        "Q04",
        "Depends on Q03, which could not be checked, so not marked not applicable. "
        + NO_READING,
    ),
    nr("Q05", NO_READING),
    nr(
        "Q06",
        LEAD
        + "an annual independent-audit duty for large frontier developers in section 10(d), PDF p. 8, beginning on 1 January 2028 or 90 days after the developer first qualifies, whichever is later"
        + UNVERIFIED,
    ),
    nr(
        "Q07",
        LEAD
        + "incident-report duties on frontier developers in section 15. Executive Order 2026-07 describes a duty to report critical safety incidents within 72 hours; that is the Governor's description, not the act's text"
        + UNVERIFIED,
    ),
    nr(
        "Q08",
        LEAD
        + "transparency-report duties on frontier developers in section 10(c), and large-developer disclosure duties in section 18 beginning on 1 January 2027"
        + UNVERIFIED,
    ),
    nr(
        "Q09",
        LEAD
        + "whistleblower duties on frontier developers in section 20, and amendments to the Whistleblower Act"
        + UNVERIFIED,
    ),
    nr(
        "Q10",
        LEAD
        + "that the official bill history (Actions table) records passage by both houses on 29 May 2026 and the Governor's approval on 6 July 2026, with Public Act 104-0538 assigned. Executive Order 2026-07 (issued 22 September 2026) states that the Governor signed the act, without a date"
        + UNVERIFIED,
    ),
    nr(
        "Q11",
        LEAD
        + "a general effective date of 1 January 2027 in section 99, PDF p. 56"
        + UNVERIFIED,
    ),
    nr(
        "Q12",
        LEAD
        + "separate start dates: section 10(a), 1 January 2028 (framework duty); section 10(d), 1 January 2028 or 90 days after first qualifying, whichever is later (audit); section 18, 1 January 2027 (disclosure). These are dates the act sets; no source read says that any duty has taken effect"
        + UNVERIFIED,
    ),
    nr("Q13", NO_READING),
    nr("Q14", NO_READING),
    nr("Q15", NO_READING),
]

draft = {
    "group": "us-illinois",
    "drafter": "drafting session, 2026-11-04 (decision 7a); text not retrieved, one quotation from the cross-family checker's copy",
    "cells": cells,
    "omissions": [
        "Executive Order 2026-07 describes the act's duties (frameworks, annual audits, 72-hour incident reports, public disclosure). It is the Governor's description, not the act, so no cell quotes it; its passage on the signature is the row's standing evidence."
    ],
    "retrievalFailures": [
        "2026-11-04: https://www.ilga.gov/Documents/Legislation/PublicActs/104/PDF/104-0538.pdf failed certificate verification (the server sends no intermediate certificate). With the issuer's published intermediate (Sectigo Public Server Authentication CA OV R40, verified against the trusted root) the request completed and returned HTTP 403, an \u201cAccess Denied\u201d page. Not retried with altered request headers.",
        "2026-11-04: the Internet Archive capture https://web.archive.org/web/20260908054441id_/https://www.ilga.gov/Documents/Legislation/PublicActs/104/PDF/104-0538.pdf, read by the checker on 2026-11-03, could not be opened: every connection to web.archive.org was reset; archive.org's availability service answered HTTP 429.",
    ],
    "openQuestions": [
        "Fourteen Illinois cells are not retrieved and the Q02 quotation is unmatched. Recommendation: draft the row from the captured PDF in a session that can open it (for example a local session on the maintainer's machine), before the cross-family checker's blind answers for this row are opened; then compare the two readings."
    ],
}
save("drafts/us-illinois.json", draft)

# Instrument row: after New York (jurisdiction United States, then date).
inst = load("drafts/instruments.json")
assert not any(i["id"] == "il-aisma" for i in inst["instruments"])
pos = max(k for k, i in enumerate(inst["instruments"]) if i["id"].startswith("ny-")) + 1
inst["instruments"].insert(
    pos,
    {
        "id": "il-aisma",
        "group": "us-illinois",
        "jurisdiction": "United States: Illinois",
        "title": "Illinois Public Act 104-0538 (SB 315, 104th General Assembly), Artificial Intelligence Safety Measures Act",
        "documentIds": ["il-ai-safety-measures-act"],
        "sources": ["il-pa104-0538", "il-eo-2026-07"],
        "standing": "binding; signed according to Executive Order 2026-07",
        "standingNote": "Enacted text not retrieved by the preparer; the cells rest on the cross-family checker's copy where they quote at all.",
    },
)
save("drafts/instruments.json", inst)

integ = load("drafts/integrator.json")
integ["excluded"] = [
    x for x in integ["excluded"] if x["documentId"] != "il-ai-safety-measures-act"
]
integ["standing"].append(
    {
        "instrument": "il-aisma",
        "passages": [
            {
                "source": "il-eo-2026-07",
                "locator": "Recitals",
                "quote": "the Illinois General Assembly passed and I signed into law the AI Safety Measures Act",
                "datasetClaim": "fl-us-il-ai-safety-measures-act-signed-stated",
            }
        ],
        "note": "The Governor states that the act was passed and signed; the order gives no date for either. The checker's second pass reports approval on 6 July 2026 from the official bill history (not verified here; see Q10).",
    }
)
save("drafts/integrator.json", integ)

src = load("drafts/sources.json")
assert not any(s["key"].startswith("il-") for s in src)
src += [
    {
        "key": "il-pa104-0538",
        "datasetSource": None,
        "documentId": "il-ai-safety-measures-act",
        "url": "https://web.archive.org/web/20260908054441id_/https://www.ilga.gov/Documents/Legislation/PublicActs/104/PDF/104-0538.pdf",
        "officialUrl": "https://www.ilga.gov/Documents/Legislation/PublicActs/104/PDF/104-0538.pdf",
        "language": "en",
        "title": "Illinois Public Act 104-0538 (SB 315), Artificial Intelligence Safety Measures Act, enacted text (PDF)",
        "publisher": "Illinois General Assembly (ilga.gov)",
        "version": "Not retrieved by the preparer (see the Illinois draft's retrieval failures). Recorded from the cross-family checker's second pass: the enacted-text PDF read on 2026-11-03T21:06:25Z through the Internet Archive capture of 2026-09-08T05:44:41Z, HTTP 200, without redirect to another capture. The hash, status and date below are the checker's. No word count, so no quotation budget can be computed.",
        "cacheKey": None,
        "httpStatus": 200,
        "sha256": "f10cd7d854d5a6e1ab2c5e982e458d744abbfbdafde97f897ae03d1d8069f71f",
        "retrievedAt": "2026-11-03 (checker)",
        "documentWords": {"count": None, "basis": "not counted: text not retrieved by the preparer"},
        "archive": {
            "capture": "https://web.archive.org/web/20260908054441id_/https://www.ilga.gov/Documents/Legislation/PublicActs/104/PDF/104-0538.pdf",
            "capturedAt": "2026-09-08",
            "via": "cross-family checker's second pass, 2026-11-03",
            "checked": False,
        },
    },
    {
        "key": "il-eo-2026-07",
        "datasetSource": "source-il-eo-2026-07",
        "documentId": None,
        "url": "https://www.illinois.gov/government/executive-orders/executive-order.executive-order-2026-07.2026.html",
        "language": "en",
        "title": "Illinois Executive Order 2026-07: Executive Order to Create Illinois Artificial Intelligence Cabinet (September 22, 2026)",
        "publisher": "State of Illinois (illinois.gov)",
        "version": "Executive order page served on 2026-11-04; same SHA-256 as the checker's copy of 2026-11-03. The dataset source's copy of 2026-10-27 had another SHA-256; the reused quotation still matches.",
        "cacheKey": "il-eo-2026-07",
        "httpStatus": 200,
        "sha256": "eb1787197fa9e997fe19c1f0faa96b853880ffaeae8ee3e3838764ff36d520a9",
        "retrievedAt": "2026-11-04",
        "documentWords": {"count": 950, "basis": "Taken over from dataset source source-il-eo-2026-07."},
        "archive": {"capture": None, "capturedAt": None, "via": "not looked up: archive.org unreachable on 2026-11-04", "checked": False},
    },
]
save("drafts/sources.json", src)
print("done")
