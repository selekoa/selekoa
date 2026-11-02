import json

CHK = "2026-10-29"
import os
OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "..", "drafts", "eu.json")

def src(id, key, title, authors, publisher, date, kind, url, route, cls, note=None, lang="en", dsid=None):
    s = {"id": "lg2-src-" + id, "cacheKey": "eu-" + key, "title": title, "authors": authors,
         "publisher": publisher, "publicationDate": date, "kind": kind, "url": url, "route": route,
         "language": lang, "sourceClass": cls}
    if dsid:
        s["datasetSourceId"] = dsid
    if note:
        s["note"] = note
    return s

def ev(slug, source, locator, para, anchor=None, quote=None, support="supports", role=None, srcmap=None):
    e = {"id": "lg2-ev-eu-" + slug, "sourceId": "lg2-src-" + source,
         "sourceRole": role or ("secondary" if SRC[source]["sourceClass"] != "primary" else "primary"),
         "support": support, "locator": locator}
    if quote:
        e["passageType"] = "quote"
        e["passage"] = quote
    else:
        e["passageType"] = "paraphrase"
        e["passage"] = para
        e["anchor"] = anchor
    e["checkedAt"] = CHK
    return e

def claim(slug, event, subj, pred, obj, topic, statement, time, attrs, qual, evidence, related=None, extra=None):
    c = {"id": "lg2-eu-" + slug, "event": event, "subject": subj, "predicate": pred,
         "object": ({"kind": "entity", "entityId": obj} if isinstance(obj, str) else obj),
         "topic": topic, "statement": statement, "time": time, "attributes": attrs,
         "derivation": "explicit", "resolution": "supported", "qualification": qual,
         "relatedExisting": related or [], "evidence": evidence}
    if extra:
        c.update(extra)
    return c

def lit(v, unit):
    return {"kind": "literal", "value": v, "unit": unit}

def fund(value, cur, bound, stage, period):
    return {"transactionType": "funding_round", "transactionStage": stage, "relationshipContext": "external",
            "amount": {"value": value, "currency": cur, "bound": bound, "scope": "round_total"}, "period": period}

def part(stage, period, role=None):
    a = {"transactionType": "funding_round", "transactionStage": stage, "relationshipContext": "external", "period": period}
    if role:
        a["role"] = role
    return a

def ent(id, type, name, desc, sources, aliases=None, sort=None):
    e = {"id": id, "type": type, "name": name}
    if type == "person":
        e["sortName"] = sort
        e["subtype"] = "Institutional actor"
    e["aliases"] = aliases or []
    e["description"] = desc
    e["sourceIds"] = ["lg2-src-" + s for s in sources]
    return e

sources = [
    src("lsvp-mistral-seed-2023", "lsvp-mistral-seed", "Building With Mistral—Europe’s Next Great Generative AI Startup", ["Lightspeed Venture Partners"], "Lightspeed Venture Partners", "2023-06-13", "announcement", "https://lsvp.com/stories/meet-europes-next-great-generative-ai-startup-mistral-ai/", "direct", "primary", "The lead investor’s own post on the round; Mistral AI’s own seed announcement was not located."),
    src("a16z-mistral-2023", "a16z-mistral", "Investing in Mistral", ["Anjney Midha", "Matt Bornstein", "Rajko Radovanovic"], "Andreessen Horowitz", "2023-12-10", "announcement", "https://a16z.com/announcement/investing-in-mistral/", "direct", "primary", "The investor’s own announcement of its Series A investment; it gives no round total."),
    src("techeu-mistral-seriesa-2023", "techeu-mistral-a", "Mistral AI confirms €385M Series A funding round", ["Dan Taylor"], "Tech.eu", "2023-12-11", "article", "https://tech.eu/2023/12/11/mistral-ai-confirms-385m-series-a-funding-round/", "direct", "reporting", "Reporting; relays Mistral AI’s confirmation of the round. Mistral AI’s own text was not located."),
    src("tc-mistral-seriesb-2024", "tc-mistral-b", "Paris-based AI startup Mistral AI raises $640M", ["Romain Dillet"], "TechCrunch", "2024-06-11", "article", "https://techcrunch.com/2024/06/11/paris-based-ai-startup-mistral-ai-raises-640-million/", "direct", "reporting", "Reporting; no Mistral AI or General Catalyst announcement of the round was located."),
    src("mistral-seriesc-2025", "mistral-seriesc", "Mistral raises 1.7B€ to accelerate technological progress with AI", ["Mistral AI"], "Mistral AI", "2025-09-09", "announcement", "https://mistral.ai/news/mistral-ai-raises-1-7-b-to-accelerate-technological-progress-with-ai", "direct", "primary", "Short page (about 260 words by the tool’s count); quotation kept to short anchors."),
    src("tc-inflection-2023", "tc-inflection-2023", "Inflection lands $1.3B investment to build more ‘personal’ AI", ["Kyle Wiggers"], "TechCrunch", "2023-06-29", "article", "https://techcrunch.com/2023/06/29/inflection-ai-lands-1-3b-investment-to-build-more-personal-ai/", "direct", "reporting", "Reporting (citing Forbes and Inflection’s statement). Inflection’s own press release (Business Wire, 29 June 2023) could not be retrieved; see retrievalFailures."),
    src("inflection-exec-2024", "inflection-redefining", "Redefining the Future of AI", ["Sean White"], "Inflection AI", "2024-05-20", "post", "https://inflection.ai/blog/redefining-the-future-of-ai", "direct", "primary", "The dataset already holds this post as lg-src-deal-inflection-exec-2024 (quoting 25 words for the Mittal and White records); the coordinator should merge the source records so the quotation count covers both.", dsid="lg-src-deal-inflection-exec-2024"),
    src("ms-ai-london-2024", "ms-ai-london-2024", "Announcing new Microsoft AI Hub in London", ["Mustafa Suleyman"], "Microsoft", "2024-04-07", "announcement", "https://blogs.microsoft.com/blog/2024/04/07/announcing-new-microsoft-ai-hub-in-london/", "direct", "primary", "Official Microsoft Blog. Retrieved directly on 2026-10-29; the r.jina.ai relay refused (HTTP 401)."),
    src("ms-copilot-leadership-2026", "ms-copilot-leadership-2026", "Announcing Copilot leadership update", ["Satya Nadella", "Mustafa Suleyman"], "Microsoft", "2026-03-17", "announcement", "https://blogs.microsoft.com/blog/2026/03/17/announcing-copilot-leadership-update/", "direct", "primary", "Official Microsoft Blog post reproducing two internal messages, by Satya Nadella and by Mustafa Suleyman, sent to employees that morning."),
    src("latent-50m-2025", "latent-50m", "Latent Labs secures $50M in funding to realize the potential of AI-powered, programmable biology", ["Latent Labs"], "Latent Labs", "2025-02-13", "announcement", "https://www.latentlabs.com/press-release/latent-labs-secures-50m-in-funding/", "direct", "primary"),
    src("adaption-larochelle-2026", "adaption-larochelle", "Hugo Larochelle Joins Adaption as Scientific Lead", ["Sara Hooker", "Sudip Roy"], "Adaption", "2026-07-02", "post", "https://adaptionlabs.ai/blog/hugo-larochelle", "direct", "primary", "Short post (about 290 words by the tool’s count)."),
    src("emcap-adaption-2026", "emcap-adaption", "Adaptable AI for an Adapting World", ["Yaz El-Baba"], "Emergence Capital", "2026-02-04", "announcement", "https://www.emcap.com/thoughts/adaptable-ai-for-an-adapting-world", "direct", "primary", "The lead investor’s own post; Adaption’s own funding announcement was not located."),
    src("tc-cohere-pineau-2025", "tc-cohere-pineau", "Cohere hires long-time Meta research head Joelle Pineau as its chief AI officer", ["TechCrunch"], "TechCrunch", "2025-08-14", "article", "https://techcrunch.com/2025/08/14/cohere-hires-long-time-meta-research-head-joelle-pineau-as-its-chief-ai-officer/", "direct", "reporting", "Reporting; mentions Sara Hooker’s departure announcement in passing. Her own post was not located."),
    src("ineffable-home", "ineffable-home", "Ineffable Intelligence (home page, including “A Note from Dave”, dated 15 January 2026)", ["David Silver"], "Ineffable Intelligence", "2026-01-15", "post", "https://www.ineffable.ai/", "direct", "primary", "The home page carries a dated note by David Silver; the page itself is otherwise undated. Short page (about 270 words by the tool’s count)."),
    src("fortune-silver-2026", "fortune-silver", "Exclusive: Longtime Google DeepMind researcher David Silver leaves to found his own AI startup", ["Jeremy Kahn"], "Fortune", "2026-01-30", "article", "https://fortune.com/2026/01/30/google-deepmind-ai-researcher-david-silver-leaves-to-found-ai-startup-ineffable-intelligence/", "direct", "reporting", "Reporting; relays a Google DeepMind spokesperson’s confirmation and Companies House records."),
    src("ch-ineffable", "ch-ineffable", "INEFFABLE INTELLIGENCE LTD (16865241): company overview", ["Companies House"], "Companies House", None, "filing", "https://find-and-update.company-information.service.gov.uk/company/16865241", "direct", "primary", "UK public register; current page, retrieved 2026-10-29."),
    src("ch-ineffable-officers", "ch-ineffable-officers", "INEFFABLE INTELLIGENCE LTD (16865241): officers", ["Companies House"], "Companies House", None, "filing", "https://find-and-update.company-information.service.gov.uk/company/16865241/officers", "direct", "primary", "UK public register; current page, retrieved 2026-10-29. The page also shows personal particulars (month of birth, nationality, residence); none is recorded or quoted here."),
    src("cooley-ineffable-2026", "cooley-ineffable", "Ineffable Intelligence Announces $1.1 Billion Seed Financing", ["Cooley LLP"], "Cooley LLP", "2026-04-27", "announcement", "https://www.cooley.com/news/coverage/2026/2026-04-27-ineffable-intelligence-announces-$1-1-billion-seed-financing", "direct", "secondary", "Press release of the company’s legal adviser on the financing, not the company’s own announcement; classed secondary. Ineffable Intelligence’s own announcement was not located."),
    src("cmacgm-kyutai-2023", "cmacgm-kyutai", "Launch of Kyutai – Europe’s first independent research lab dedicated to AI open science, co-founded by the iliad Group, CMA CGM and Schmidt Futures", ["CMA CGM Group"], "CMA CGM Group", "2023-11-17", "announcement", "https://cmacgm-group.com/en/news-media/launch-kyutai-europes-first-independent-research-lab-dedicated-ai-open-science", "direct", "primary", "Launch announcement published by one of Kyutai’s three founding organisations."),
]
SRC = {s["id"][len("lg2-src-"):]: s for s in sources}

entities = [
    {"id": e, "existing": True} for e in ["mistral-ai", "nvidia", "microsoft", "microsoft-ai", "inflection-ai", "deepmind", "google-deepmind", "mustafa-suleyman", "cohere", "sequoia", "david-silver", "fair"]
] + [
    {"id": "andreessen-horowitz", "type": "organisation", "name": "Andreessen Horowitz (a16z)", "aliases": [], "description": "Venture capital firm, named as “a16z” or “Andreessen Horowitz” in the cited funding announcements.", "sourceIds": ["lg2-src-a16z-mistral-2023", "lg2-src-mistral-seriesc-2025"]},
    {"id": "dst-global", "type": "organisation", "name": "DST Global", "aliases": [], "description": "Investment firm, named as “DST Global” or “DST” in the cited funding announcements.", "sourceIds": ["lg2-src-mistral-seriesc-2025"]},
    {"id": "lightspeed", "type": "organisation", "name": "Lightspeed", "aliases": [], "description": "Venture capital firm (Lightspeed Venture Partners) named as “Lightspeed” in the cited funding announcements.", "sourceIds": ["lg2-src-lsvp-mistral-seed-2023", "lg2-src-mistral-seriesc-2025", "lg2-src-cooley-ineffable-2026"]},
    ent("general-catalyst", "organisation", "General Catalyst", "Venture capital firm named as lead of Mistral AI’s 2024 Series B in reporting and as an existing investor in Mistral AI’s 2025 Series C announcement.", ["tc-mistral-seriesb-2024", "mistral-seriesc-2025"]),
    ent("asml", "organisation", "ASML", "Semiconductor equipment manufacturer (ASML Holding NV) named by Mistral AI as lead investor of its September 2025 Series C.", ["mistral-seriesc-2025"], aliases=["ASML Holding NV"]),
    ent("bpifrance", "organisation", "Bpifrance", "French public investment bank named by Mistral AI among existing investors participating in its September 2025 Series C.", ["mistral-seriesc-2025"]),
    ent("index-ventures", "organisation", "Index Ventures", "Venture capital firm named by Mistral AI among existing investors participating in its September 2025 Series C.", ["mistral-seriesc-2025"]),
    ent("ted-shelton", "person", "Ted Shelton", "Announced by Inflection AI’s CEO in May 2024 as having joined as Chief Operating Officer.", ["inflection-exec-2024"], sort="Shelton, Ted"),
    ent("ian-mccarthy", "person", "Ian McCarthy", "Announced by Inflection AI’s CEO in May 2024 as having joined as Chief Product Officer.", ["inflection-exec-2024"], sort="McCarthy, Ian"),
    ent("microsoft-ai-london", "organisation", "Microsoft AI London", "AI hub of Microsoft AI in London announced by Mustafa Suleyman in April 2024.", ["ms-ai-london-2024"]),
    ent("jordan-hoffmann", "person", "Jordan Hoffmann", "Named by Microsoft in April 2024 as the leader of the new Microsoft AI London hub; described there as having worked at Inflection and DeepMind.", ["ms-ai-london-2024"], sort="Hoffmann, Jordan"),
    ent("jacob-andreou", "person", "Jacob Andreou", "Microsoft AI’s CVP of Product and Growth, announced by Microsoft in March 2026 as EVP, Copilot.", ["ms-copilot-leadership-2026"], sort="Andreou, Jacob"),
    ent("latent-labs", "organisation", "Latent Labs", "London and San Francisco company building AI models for protein design, founded by Simon Kohl; emerged from stealth in February 2025.", ["latent-50m-2025"]),
    ent("simon-kohl", "person", "Simon Kohl", "Founder and CEO of Latent Labs; previously a co-lead of DeepMind’s protein design team, according to Latent Labs.", ["latent-50m-2025"], sort="Kohl, Simon"),
    ent("radical-ventures", "organisation", "Radical Ventures", "Venture capital firm named by Latent Labs as co-lead of its February 2025 Series A.", ["latent-50m-2025"]),
    ent("sofinnova-partners", "organisation", "Sofinnova Partners", "Venture capital firm named by Latent Labs as co-lead of its February 2025 Series A.", ["latent-50m-2025"]),
    ent("adaption", "organisation", "Adaption", "AI company co-founded by Sara Hooker and Sudip Roy, also named Adaption Labs in investor and adviser announcements.", ["adaption-larochelle-2026", "emcap-adaption-2026"], aliases=["Adaption Labs", "Adaption, Inc."]),
    ent("sara-hooker", "person", "Sara Hooker", "Co-founder of Adaption; reported in August 2025 as Cohere’s VP of AI Research announcing her departure.", ["adaption-larochelle-2026", "tc-cohere-pineau-2025"], sort="Hooker, Sara"),
    ent("sudip-roy", "person", "Sudip Roy", "Co-founder of Adaption.", ["adaption-larochelle-2026"], sort="Roy, Sudip"),
    ent("hugo-larochelle", "person", "Hugo Larochelle", "Announced by Adaption in July 2026 as its Scientific Lead in an advisory capacity, while Scientific Director of Mila.", ["adaption-larochelle-2026"], sort="Larochelle, Hugo"),
    ent("emergence-capital", "organisation", "Emergence Capital", "Venture capital firm (Emergence Capital Partners) that announced it was leading Adaption’s $50 million seed round in February 2026.", ["emcap-adaption-2026"], aliases=["Emergence Capital Partners"]),
    ent("ineffable-intelligence", "organisation", "Ineffable Intelligence", "London AI company set up by David Silver; incorporated in the UK on 19 November 2025 as INEFFABLE INTELLIGENCE LTD.", ["ineffable-home", "ch-ineffable"], aliases=["INEFFABLE INTELLIGENCE LTD", "Ineffable"]),
    ent("kyutai", "organisation", "Kyutai", "Non-profit open-science AI research laboratory in Paris, launched on 17 November 2023 and founded jointly by the iliad Group, the CMA CGM Group and Schmidt Futures.", ["cmacgm-kyutai-2023"]),
    ent("neil-zeghidour", "person", "Neil Zeghidour", "Named in Kyutai’s launch announcement of November 2023 as joining its scientific team from Google DeepMind.", ["cmacgm-kyutai-2023"], sort="Zeghidour, Neil"),
    ent("herve-jegou", "person", "Hervé Jégou", "Named in Kyutai’s launch announcement of November 2023 as a member of its scientific team; earlier manager and then director at Facebook AI Research in Paris.", ["cmacgm-kyutai-2023"], aliases=["Herve Jegou"], sort="Jégou, Hervé"),
]

events = [
    {"id": "ev-2023-06-mistral-seed", "date": "2023-06-13", "title": "Mistral AI seed round led by Lightspeed", "labs": ["mistral-ai"]},
    {"id": "ev-2023-12-mistral-series-a", "date": "2023-12-10", "title": "Mistral AI Series A", "labs": ["mistral-ai"]},
    {"id": "ev-2024-06-mistral-series-b", "date": "2024-06-11", "title": "Mistral AI Series B", "labs": ["mistral-ai"]},
    {"id": "ev-2025-09-mistral-series-c", "date": "2025-09-09", "title": "Mistral AI Series C led by ASML", "labs": ["mistral-ai"]},
    {"id": "ev-2023-06-inflection-round", "date": "2023-06-29", "title": "Inflection AI $1.3 billion round", "labs": ["inflection-ai"]},
    {"id": "ev-2024-05-inflection-executives", "date": "2024-05-20", "title": "Inflection AI’s new executive team", "labs": ["inflection-ai"]},
    {"id": "ev-2024-04-microsoft-ai-london", "date": "2024-04-07", "title": "Microsoft AI London hub announced", "labs": ["microsoft-ai"]},
    {"id": "ev-2026-03-copilot-leadership", "date": "2026-03-17", "title": "Microsoft Copilot leadership update and Microsoft AI restructuring", "labs": ["microsoft-ai", "microsoft"]},
    {"id": "ev-2025-02-latent-labs", "date": "2025-02-13", "title": "Latent Labs emerges from stealth with Series A", "labs": ["latent-labs"]},
    {"id": "ev-adaption", "date": "2026-02-04", "title": "Adaption: founders, seed round and scientific lead", "labs": ["adaption"]},
    {"id": "ev-2026-ineffable", "date": "2026-01-30", "title": "David Silver leaves Google DeepMind; Ineffable Intelligence", "labs": ["ineffable-intelligence", "google-deepmind"]},
    {"id": "ev-2023-11-kyutai", "date": "2023-11-17", "title": "Kyutai launched in Paris", "labs": ["kyutai"]},
]

ann = lambda d, extra="": {"kind": "event", "date": d, "note": "Announcement date; not a closing date unless the source says closed." + extra}
snap = lambda d, note="Announcement date; not a start date.": {"kind": "snapshot", "date": d, "note": note}
unk = lambda note: {"kind": "unknown", "note": note}

PART_Q = "Names the investor as a participant only; the source gives no individual amount, and the round total is not attributed to this investor."
claims = []

# --- Mistral AI ---
A_SEED = "closed a seed round of over €105 million, led by Lightspeed"
claims.append(claim("mistral-seed-2023", "ev-2023-06-mistral-seed", "mistral-ai", "announced_funding", lit(105000000, "EUR"), "capital",
    "Lightspeed announced on 13 June 2023 that Mistral AI had closed a seed round of over €105 million, led by Lightspeed.",
    {"kind": "event", "date": "2023-06-13", "note": "Date of Lightspeed’s post; the post says the round had closed, but gives no closing date."},
    fund(105000000, "EUR", "more_than", "closed", "Seed"),
    "The lead investor’s account, not Mistral AI’s own announcement (not located). It names no other participants and does not establish instruments or the closing date.",
    [ev("mistral-seed-2023", "lsvp-mistral-seed-2023", "Standfirst under the title (post dated 06/13/2023)", "Lightspeed states that Mistral AI has closed a seed round of over €105 million led by Lightspeed.", A_SEED)],
    related=["lg-new-mistral-founding-2023"]))
claims.append(claim("mistral-seed-2023-lightspeed", "ev-2023-06-mistral-seed", "lightspeed", "participated_in_round", "mistral-ai", "capital",
    "Lightspeed announced on 13 June 2023 that it led Mistral AI’s seed round.",
    {"kind": "event", "date": "2023-06-13", "note": "Date of Lightspeed’s post."},
    part("closed", "Seed", "lead investor"), PART_Q,
    [ev("mistral-seed-2023-lightspeed", "lsvp-mistral-seed-2023", "Standfirst under the title (post dated 06/13/2023)", "Lightspeed states that it led Mistral AI’s seed round of over €105 million.", A_SEED)]))
claims.append(claim("mistral-seriesa-2023-a16z", "ev-2023-12-mistral-series-a", "andreessen-horowitz", "participated_in_round", "mistral-ai", "capital",
    "Andreessen Horowitz announced on 10 December 2023 its Series A investment in Mistral.",
    {"kind": "event", "date": "2023-12-10", "note": "Date of the a16z post."},
    part("announced", "Series A"),
    PART_Q + " The a16z post does not say that it led the round; Tech.eu reported that it did (see lg2-eu-mistral-seriesa-2023).",
    [ev("mistral-seriesa-2023-a16z", "a16z-mistral-2023", "Paragraph beginning “AI is no different”", "Andreessen Horowitz announces its Series A investment in Mistral.", "announce our Series A investment in Mistral")]))
claims.append(claim("mistral-seriesa-2023", "ev-2023-12-mistral-series-a", "mistral-ai", "announced_funding", lit(385000000, "EUR"), "capital",
    "Tech.eu reported on 11 December 2023 that Mistral AI had confirmed a €385 million Series A round led by Andreessen Horowitz.",
    ann("2023-12-11", " Date of the report of Mistral AI’s confirmation."),
    fund(385000000, "EUR", "exact", "announced", "Series A"),
    "The record rests on reporting, which relays Mistral AI’s confirmation of the figure; Mistral AI’s own text was not located. It does not establish closing, instruments or valuation.",
    [ev("mistral-seriesa-2023", "techeu-mistral-seriesa-2023", "Paragraph beginning “Following last week's rumours”", "Tech.eu reports that the company confirmed the figure at €385 million and that the round was led by Andreessen Horowitz.", "The €385 million round was led by Andreessen-Horowitz")]))
claims.append(claim("mistral-seriesb-2024", "ev-2024-06-mistral-series-b", "mistral-ai", "announced_funding", lit(600000000, "EUR"), "capital",
    "TechCrunch reported on 11 June 2024 that Mistral AI had closed its Series B funding round, raising €600 million in a mix of equity and debt.",
    {"kind": "event", "date": "2024-06-11", "note": "Date of the report; it says the round had closed, but gives no closing date."},
    fund(600000000, "EUR", "exact", "closed", "Series B"),
    "The record rests on reporting; no Mistral AI announcement was located. The report describes the total as a mix of equity and debt; the split it gives is from the Financial Times and is not recorded here.",
    [ev("mistral-seriesb-2024", "tc-mistral-seriesb-2024", "Opening paragraph", "TechCrunch reports that Mistral AI closed its Series B round, raising €600 million in equity and debt.", "closed its much-rumored Series B funding round, raising €600 million")]))
claims.append(claim("mistral-seriesb-2024-general-catalyst", "ev-2024-06-mistral-series-b", "general-catalyst", "participated_in_round", "mistral-ai", "capital",
    "TechCrunch reported on 11 June 2024 that General Catalyst led Mistral AI’s Series B round.",
    {"kind": "event", "date": "2024-06-11", "note": "Date of the report."},
    part("closed", "Series B", "lead investor"),
    PART_Q + " The record rests on reporting.",
    [ev("mistral-seriesb-2024-general-catalyst", "tc-mistral-seriesb-2024", "Opening paragraph", "TechCrunch reports that General Catalyst led the round.", "General Catalyst led the round")]))
A_C = "Series C funding round of 1.7B€"
A_LEAD = "is led by leading semiconductor equipment manufacturer, ASML"
A_PART = "DST Global, Andreessen Horowitz, Bpifrance, General Catalyst, Index Ventures, Lightspeed and NVIDIA"
claims.append(claim("mistral-seriesc-2025", "ev-2025-09-mistral-series-c", "mistral-ai", "announced_funding", lit(1700000000, "EUR"), "capital",
    "Mistral AI announced on 9 September 2025 a Series C funding round of €1.7 billion.",
    ann("2025-09-09"), fund(1700000000, "EUR", "exact", "announced", "Series C"),
    "A company announcement of the round; it does not establish closing, instruments or each investor’s share. The valuation it states is not recorded.",
    [ev("mistral-seriesc-2025", "mistral-seriesc-2025", "Opening paragraph", "Mistral AI announces a Series C funding round of €1.7 billion.", A_C)]))
claims.append(claim("mistral-seriesc-2025-asml", "ev-2025-09-mistral-series-c", "asml", "participated_in_round", "mistral-ai", "capital",
    "Mistral AI announced on 9 September 2025 that its Series C round was led by ASML.",
    ann("2025-09-09"), part("announced", "Series C", "lead investor"),
    PART_Q + " The announcement also describes a strategic partnership between the two companies, which is not recorded here.",
    [ev("mistral-seriesc-2025-asml", "mistral-seriesc-2025", "Second paragraph", "Mistral AI states that the Series C round is led by the semiconductor equipment manufacturer ASML Holding NV.", A_LEAD)]))
for inv, name in [("dst-global", "DST Global"), ("andreessen-horowitz", "Andreessen Horowitz"), ("bpifrance", "Bpifrance"), ("general-catalyst", "General Catalyst"), ("index-ventures", "Index Ventures"), ("lightspeed", "Lightspeed"), ("nvidia", "NVIDIA")]:
    slug = "mistral-seriesc-2025-" + inv
    claims.append(claim(slug, "ev-2025-09-mistral-series-c", inv, "participated_in_round", "mistral-ai", "capital",
        f"Mistral AI announced on 9 September 2025 that its Series C round included participation from {name}, an existing investor.",
        ann("2025-09-09"), part("announced", "Series C", "existing investor (participant)"), PART_Q,
        [ev(slug, "mistral-seriesc-2025", "Paragraph beginning “It includes participation from existing investors”", f"Mistral AI lists {name} among seven existing investors participating in the Series C round.", A_PART)]))

# --- Inflection AI ---
A_INF = "has closed a $1.3 billion funding round led by Microsoft, Reid Hoffman, Bill Gates, Eric Schmidt and new investor Nvidia"
claims.append(claim("inflection-round-2023", "ev-2023-06-inflection-round", "inflection-ai", "announced_funding", lit(1300000000, "USD"), "capital",
    "TechCrunch reported on 29 June 2023 that Inflection AI had closed a $1.3 billion funding round led by Microsoft, Reid Hoffman, Bill Gates, Eric Schmidt and new investor Nvidia.",
    {"kind": "event", "date": "2023-06-29", "note": "Date of the report; it says the round had closed, but gives no closing date."},
    fund(1300000000, "USD", "exact", "closed", "Not named (June 2023 round)"),
    "The record rests on reporting (TechCrunch, citing Forbes and Inflection’s statement); Inflection’s own press release could not be retrieved. It does not establish the split between cash and other forms of investment, or each investor’s share.",
    [ev("inflection-round-2023", "tc-inflection-2023", "Opening paragraph", "TechCrunch reports that Inflection AI closed a $1.3 billion round led by Microsoft, three named individuals and new investor Nvidia.", A_INF)]))
for inv, name, role in [("microsoft", "Microsoft", "named among the round’s leads"), ("nvidia", "Nvidia", "new investor; named among the round’s leads")]:
    slug = "inflection-round-2023-" + inv
    claims.append(claim(slug, "ev-2023-06-inflection-round", inv, "participated_in_round", "inflection-ai", "capital",
        f"TechCrunch reported on 29 June 2023 that {name} was among those leading Inflection AI’s $1.3 billion funding round.",
        {"kind": "event", "date": "2023-06-29", "note": "Date of the report."},
        part("closed", "Not named (June 2023 round)", role),
        PART_Q + " The record rests on reporting.",
        [ev(slug, "tc-inflection-2023", "Opening paragraph", f"TechCrunch names {name} among the leads of Inflection AI’s $1.3 billion round.", A_INF)]))
A_EXEC = "Ted Shelton as Chief Operating Officer, and Ian McCarthy as Chief Product Officer"
for slug, person, name, role in [("shelton-inflection-coo-2024", "ted-shelton", "Ted Shelton", "Chief Operating Officer"), ("mccarthy-inflection-cpo-2024", "ian-mccarthy", "Ian McCarthy", "Chief Product Officer")]:
    claims.append(claim(slug, "ev-2024-05-inflection-executives", person, "held_role", "inflection-ai", "people",
        f"Inflection’s CEO Sean White announced on 20 May 2024 that {name} had joined Inflection as {role}.",
        snap("2024-05-20", "Date of the post, which says the person had joined; not a start date."), {"role": role},
        "Records the announced role at the date of the post; it does not establish a start date or a continuing role.",
        [ev(slug, "inflection-exec-2024", "Paragraph 4", f"Sean White announces that {name} has joined Inflection’s executive team as {role}.", A_EXEC)],
        related=["lg-deal-mittal-inflection-cto-2024", "lg-deal-white-inflection-ceo-2024"]))

# --- Microsoft AI ---
claims.append(claim("mai-london-unit-2024", "ev-2024-04-microsoft-ai-london", "microsoft-ai-london", "unit_of", "microsoft-ai", "institutions",
    "Mustafa Suleyman announced on 7 April 2024 that Microsoft AI was opening an AI hub in London, Microsoft AI London.",
    snap("2024-04-07", "Announcement date; not an opening date."), {"stage": "announced"},
    "An announced hub; the record does not establish when it opened, its size or its continued existence.",
    [ev("mai-london-unit-2024", "ms-ai-london-2024", "Opening paragraph", "Suleyman announces that Microsoft AI is opening a new AI hub in London, named Microsoft AI London.", "opening a new AI hub in the heart of London. Microsoft AI London")],
    related=["lg-deal-microsoft-ai-unit-2024"]))
claims.append(claim("hoffmann-mai-london-lead-2024", "ev-2024-04-microsoft-ai-london", "jordan-hoffmann", "held_role", "microsoft-ai-london", "people",
    "Mustafa Suleyman announced on 7 April 2024 that the new Microsoft AI London hub would be led by Jordan Hoffmann.",
    snap("2024-04-07"), {"role": "Leader of the Microsoft AI London hub", "stage": "announced"},
    "An announced appointment; the record does not establish a start date, a formal title or a continuing role.",
    [ev("hoffmann-mai-london-lead-2024", "ms-ai-london-2024", "Second paragraph", "Suleyman states that the new hub will be led by Jordan Hoffmann.", "The new AI hub will be led by Jordan Hoffmann")]))
A_HOFF = "Hoffmann distinguished himself as an AI pioneer at Inflection and DeepMind"
for slug, org, name in [("hoffmann-inflection-prior", "inflection-ai", "Inflection"), ("hoffmann-deepmind-prior", "deepmind", "DeepMind")]:
    claims.append(claim(slug, "ev-2024-04-microsoft-ai-london", "jordan-hoffmann", "held_role", org, "people",
        f"Microsoft’s announcement of 7 April 2024 states that, before joining Microsoft AI, Jordan Hoffmann worked at {name}.",
        unk("A retrospective description; the source gives no dates for the earlier role."), {"role": "Not stated (described as an AI pioneer at " + name + ")"},
        "A retrospective description in the hiring company’s announcement; it gives no title or dates. Whether this is the Jordan Hoffmann who authored DeepMind papers is not established by the source.",
        [ev(slug, "ms-ai-london-2024", "Second paragraph", f"The announcement states that before joining Microsoft AI, Hoffmann worked at Inflection and DeepMind.", A_HOFF)]))
A_AND = "Jacob Andreou will lead the Copilot experience across consumer and commercial … as EVP, Copilot, reporting to me"
claims.append(claim("andreou-microsoft-evp-copilot-2026", "ev-2026-03-copilot-leadership", "jacob-andreou", "held_role", "microsoft", "people",
    "Microsoft published on 17 March 2026 Satya Nadella’s message announcing that Jacob Andreou would lead the Copilot experience across consumer and commercial as EVP, Copilot, reporting to Nadella.",
    snap("2026-03-17"), {"role": "EVP, Copilot", "stage": "announced"},
    "An announced appointment; the record does not establish a start date or a continuing role.",
    [ev("andreou-microsoft-evp-copilot-2026", "ms-copilot-leadership-2026", "Satya Nadella message, paragraph beginning “Jacob Andreou will lead”", "Nadella states that Andreou will lead the Copilot experience across consumer and commercial as EVP, Copilot, reporting to him.", A_AND)]))
claims.append(claim("andreou-microsoft-ai-cvp-2026", "ev-2026-03-copilot-leadership", "jacob-andreou", "held_role", "microsoft-ai", "people",
    "Satya Nadella’s message published by Microsoft on 17 March 2026 describes Jacob Andreou as CVP of Product and Growth at Microsoft AI.",
    snap("2026-03-17", "Role as described in the message of that date; not a start date."), {"role": "CVP of Product and Growth, Microsoft AI"},
    "Shows the role as described on 17 March 2026; it does not establish when he took it up.",
    [ev("andreou-microsoft-ai-cvp-2026", "ms-copilot-leadership-2026", "Satya Nadella message, paragraph beginning “Jacob Andreou will lead”", "Nadella describes Andreou as CVP of Product and Growth at Microsoft AI.", "As CVP of Product and Growth at Microsoft AI")]))
claims.append(claim("suleyman-superintelligence-remit-2026", "ev-2026-03-copilot-leadership", "mustafa-suleyman", "held_role", "microsoft-ai", "people",
    "Microsoft published on 17 March 2026 messages by Satya Nadella and Mustafa Suleyman announcing that Suleyman would continue to lead Microsoft’s superintelligence work, reporting to Nadella.",
    snap("2026-03-17"), {"role": "Executive Vice President and CEO of Microsoft AI; leads the superintelligence work, reporting to Satya Nadella", "stage": "announced"},
    "Records an announced change of remit; it does not establish implementation, the end of any earlier responsibility, or a continuing role.",
    [ev("suleyman-superintelligence-remit-2026", "ms-copilot-leadership-2026", "Satya Nadella message, paragraph beginning “Progress at the AI model layer”", "Nadella states that Suleyman will continue to lead the superintelligence work, reporting to him.", "he will continue to lead this high ambition work, reporting to me"),
     ev("suleyman-superintelligence-remit-2026-own", "ms-copilot-leadership-2026", "Mustafa Suleyman message, paragraph beginning “With our ambitious, long-term”", "Suleyman writes that the restructuring will let him concentrate on Microsoft AI’s superintelligence efforts.", "restructure our organization to enable me to focus all my energy on our Superintelligence efforts")],
    related=["lg-deal-suleyman-microsoft-ai-ceo-2024", "lg-gw-mai-superintelligence-team-unit-2025"]))

# --- Latent Labs ---
claims.append(claim("kohl-latent-founder", "ev-2025-02-latent-labs", "simon-kohl", "co_founded", "latent-labs", "people",
    "Latent Labs’ announcement of 13 February 2025 states that the company was founded by Simon Kohl.",
    unk("The source gives no founding date; 13 February 2025 is the date the company emerged from stealth."), {"role": "founder"},
    "The source’s wording is “founded by” (a single founder named); the record does not establish a founding date or whether others are credited as co-founders elsewhere.",
    [ev("kohl-latent-founder", "latent-50m-2025", "Opening paragraph (dateline London & San Francisco, February 13, 2025)", "Latent Labs states that the company was founded by Simon Kohl.", "The company was founded by Dr Simon Kohl")]))
claims.append(claim("kohl-deepmind-prior", "ev-2025-02-latent-labs", "simon-kohl", "held_role", "deepmind", "people",
    "Latent Labs’ announcement of 13 February 2025 states that Simon Kohl was previously a co-lead of DeepMind’s protein design team and a senior research scientist on AlphaFold2.",
    unk("A retrospective description; the source gives no dates for the earlier role."), {"role": "Co-lead of DeepMind’s protein design team; senior research scientist on AlphaFold2"},
    "A retrospective description in the company’s own announcement; it gives no dates.",
    [ev("kohl-deepmind-prior", "latent-50m-2025", "Opening paragraph", "Latent Labs describes Kohl’s earlier roles at DeepMind.", "previously a co-lead of DeepMind's protein design team and a senior research scientist on DeepMind's AlphaFold2")]))
claims.append(claim("kohl-latent-ceo-2025", "ev-2025-02-latent-labs", "simon-kohl", "held_role", "latent-labs", "people",
    "Latent Labs’ announcement of 13 February 2025 identifies Simon Kohl as its CEO and founder.",
    snap("2025-02-13", "Role as shown in the announcement of that date; not a start date."), {"role": "CEO"},
    "Shows the role on the announcement date; it does not establish a start date or a continuing role.",
    [ev("kohl-latent-ceo-2025", "latent-50m-2025", "Paragraph introducing Simon Kohl’s quotation", "The announcement identifies Simon Kohl as CEO and founder of Latent Labs.", "Latent Labs CEO and founder, Simon Kohl")]))
A_LAT = "a $40M Series A co-led by Radical Ventures and Sofinnova Partners"
claims.append(claim("latent-seriesa-2025", "ev-2025-02-latent-labs", "latent-labs", "announced_funding", lit(40000000, "USD"), "capital",
    "Latent Labs announced on 13 February 2025 a $40M Series A co-led by Radical Ventures and Sofinnova Partners.",
    ann("2025-02-13"), fund(40000000, "USD", "exact", "announced", "Series A"),
    "A company announcement; the $50M total funding it states is cumulative and is not recorded as a round. It does not establish closing or each investor’s share.",
    [ev("latent-seriesa-2025", "latent-50m-2025", "Second paragraph", "Latent Labs states that its funding includes a $40M Series A co-led by Radical Ventures and Sofinnova Partners.", A_LAT)]))
for inv, name in [("radical-ventures", "Radical Ventures"), ("sofinnova-partners", "Sofinnova Partners")]:
    slug = "latent-seriesa-2025-" + inv
    claims.append(claim(slug, "ev-2025-02-latent-labs", inv, "participated_in_round", "latent-labs", "capital",
        f"Latent Labs announced on 13 February 2025 that {name} co-led its $40M Series A.",
        ann("2025-02-13"), part("announced", "Series A", "co-lead investor"), PART_Q,
        [ev(slug, "latent-50m-2025", "Second paragraph", f"Latent Labs names {name} as one of two co-leads of its Series A.", A_LAT)]))

# --- Adaption ---
A_ADF = "Sara Hooker, Co-founder and Sudip Roy, Co-founder"
for slug, person, name in [("hooker-adaption-cofounder", "sara-hooker", "Sara Hooker"), ("roy-adaption-cofounder", "sudip-roy", "Sudip Roy")]:
    claims.append(claim(slug, "ev-adaption", person, "co_founded", "adaption", "people",
        f"Adaption’s post of 2 July 2026 credits its authorship to {name} as a co-founder of Adaption.",
        unk("A credit in a post of 2 July 2026; the source gives no founding date."), {"role": "Co-founder"},
        "A later credit; it does not establish a founding date or a complete founder roster.",
        [ev(slug, "adaption-larochelle-2026", "Author block at the foot of the post", f"The post lists its authors as Sara Hooker and Sudip Roy, each as co-founder.", A_ADF)]))
claims.append(claim("larochelle-adaption-scientific-lead-2026", "ev-adaption", "hugo-larochelle", "held_role", "adaption", "people",
    "Adaption announced on 2 July 2026 that Hugo Larochelle was joining as Scientific Lead in an advisory capacity, while continuing as Scientific Director of Mila.",
    snap("2026-07-02"), {"role": "Scientific Lead (advisory capacity)", "stage": "announced"},
    "An announced advisory role; the record does not establish a start date, employment or a continuing role. His Mila role is not recorded here.",
    [ev("larochelle-adaption-scientific-lead-2026", "adaption-larochelle-2026", "Opening sentence and paragraph beginning “Hugo joins Adaption”", "Adaption welcomes Hugo Larochelle as Scientific Lead and states that he joins in an advisory capacity while continuing as Scientific Director of Mila.", "welcome Hugo Larochelle, Ph.D., as Scientific Lead … in an advisory capacity")]))
A_EM = "we are thrilled to be leading Adaption's $50 million seed round"
claims.append(claim("adaption-seed-2026", "ev-adaption", "adaption", "announced_funding", lit(50000000, "USD"), "capital",
    "Emergence Capital announced on 4 February 2026 that it was leading Adaption’s $50 million seed round.",
    ann("2026-02-04"), fund(50000000, "USD", "exact", "announced", "Seed"),
    "The lead investor’s account, not Adaption’s own announcement (not located). It does not establish closing or each investor’s share.",
    [ev("adaption-seed-2026", "emcap-adaption-2026", "Paragraph beginning “Sara and Sudip’s frontier backgrounds”", "Emergence Capital states that it is leading Adaption’s $50 million seed round.", A_EM)]))
claims.append(claim("adaption-seed-2026-emergence", "ev-adaption", "emergence-capital", "participated_in_round", "adaption", "capital",
    "Emergence Capital announced on 4 February 2026 that it was leading Adaption’s seed round.",
    ann("2026-02-04"), part("announced", "Seed", "lead investor"), PART_Q,
    [ev("adaption-seed-2026-emergence", "emcap-adaption-2026", "Paragraph beginning “Sara and Sudip’s frontier backgrounds”", "Emergence Capital states that it is leading the round.", A_EM)]))
claims.append(claim("hooker-cohere-departure-2025", "ev-adaption", "sara-hooker", "departure_announced", "cohere", "people",
    "TechCrunch reported on 14 August 2025 that Cohere’s VP of AI Research, Sara Hooker, had announced her departure that week.",
    {"kind": "event", "date": "2025-08", "note": "The report of 14 August 2025 says the announcement was made “this week”; the exact date is not established."},
    {"role": "VP of AI Research", "stage": "announced"},
    "The record rests on reporting; Hooker’s own announcement was not located. An announced departure; the record does not establish her last working day.",
    [ev("hooker-cohere-departure-2025", "tc-cohere-pineau-2025", "Paragraph beginning “One immediate challenge for Pineau”", "TechCrunch reports that Cohere’s VP of AI Research, Sara Hooker, announced her departure that week.", "Cohere's VP of AI Research, Sara Hooker, who announced her departure this week")],
    related=["xm-pineau-cohere"]))

# --- Ineffable Intelligence ---
claims.append(claim("silver-ineffable-founder", "ev-2026-ineffable", "david-silver", "co_founded", "ineffable-intelligence", "people",
    "David Silver wrote in a note dated 15 January 2026, published on Ineffable Intelligence’s website, that he had decided to set up Ineffable Intelligence.",
    unk("The note is dated 15 January 2026 but gives no founding date; the company was incorporated on 19 November 2025 (see lg2-eu-ineffable-incorporated-2025)."),
    {"role": "founder (in his words, set up the company)"},
    "Silver’s wording is “set up”; the note names no co-founders, and the record does not establish a complete founder roster or a founding date. The Cooley release describes the company as founded by David Silver.",
    [ev("silver-ineffable-founder", "ineffable-home", "Blog section, “A Note from Dave”, dated 15th January 2026", "Silver writes that the note was written when he was deciding to set up Ineffable Intelligence.", "I wrote the following note for myself when deciding to set up Ineffable Intelligence"),
     ev("silver-ineffable-founder-cooley", "cooley-ineffable-2026", "Opening paragraph", "Cooley describes Ineffable Intelligence as a London-based lab founded by David Silver.", "founded by David Silver")]))
claims.append(claim("silver-deepmind-departure-2026", "ev-2026-ineffable", "david-silver", "departure_announced", "google-deepmind", "people",
    "Fortune reported on 30 January 2026 that David Silver had left Google DeepMind and that a Google DeepMind spokesperson had confirmed his departure.",
    {"kind": "event", "date": "2026-01-30", "note": "Date of the report; it says staff were told earlier in January 2026. The last working day is not established."},
    {"role": "Researcher (described by Fortune as a longtime Google DeepMind researcher)"},
    "The record rests on reporting, which relays a Google DeepMind spokesperson’s confirmation; no statement by Silver or Google DeepMind was retrieved. The source states the departure as effective (“has left”) but does not date it.",
    [ev("silver-deepmind-departure-2026", "fortune-silver-2026", "Paragraph beginning “Google DeepMind informed staff”", "Fortune reports that a Google DeepMind spokesperson confirmed Silver’s departure.", "A Google DeepMind spokesperson confirmed Silver's departure in an emailed statement to Fortune")],
    related=["atlas-david-silver-deepmind"]))
claims.append(claim("silver-ineffable-director-2026", "ev-2026-ineffable", "david-silver", "held_role", "ineffable-intelligence", "governance",
    "The Companies House register lists David Silver as an active director of Ineffable Intelligence Ltd, appointed on 16 January 2026.",
    {"kind": "interval", "from": "2026-01-16", "note": "Appointment date as registered; the register showed the appointment as active when retrieved on 29 October 2026. No end is recorded."},
    {"role": "Director"},
    "The register entry names “SILVER, David” without other identification; the identification with the former Google DeepMind researcher rests on Fortune’s report that Silver was appointed a director on that date.",
    [ev("silver-ineffable-director-2026", "ch-ineffable-officers", "Officers list, entry “SILVER, David”", "The register lists SILVER, David as an active director appointed on 16 January 2026.", "SILVER, David … Director … Appointed on 16 January 2026"),
     ev("silver-ineffable-director-2026-fortune", "fortune-silver-2026", "Paragraph beginning “Ineffable Intelligence was formed”", "Fortune reports that Silver was appointed a director of the company on 16 January, according to Companies House.", "Silver was appointed a director of the company on Jan. 16", support="context")]))
claims.append(claim("ineffable-incorporated-2025", "ev-2026-ineffable", "ineffable-intelligence", "founding_stated", {"kind": "literal", "value": "19 November 2025 (incorporation)"}, "institutions",
    "The Companies House register states that Ineffable Intelligence Ltd was incorporated on 19 November 2025.",
    {"kind": "event", "date": "2025-11-19", "note": "Incorporation date as registered."},
    {},
    "An incorporation date, not a statement of when the research effort began; Fortune reports that the company was formed in November 2025.",
    [ev("ineffable-incorporated-2025", "ch-ineffable", "Company overview, “Incorporated on”", "The register gives the incorporation date as 19 November 2025.", "Incorporated on 19 November 2025"),
     ev("ineffable-incorporated-2025-fortune", "fortune-silver-2026", "Paragraph beginning “Ineffable Intelligence was formed”", "Fortune reports that the company was formed in November 2025.", "Ineffable Intelligence was formed in November 2025", support="context")]))
A_IN = "$1.1 billion seed financing led by Sequoia Capital and Lightspeed Venture Partners"
claims.append(claim("ineffable-seed-2026", "ev-2026-ineffable", "ineffable-intelligence", "announced_funding", lit(1100000000, "USD"), "capital",
    "Cooley, Ineffable Intelligence’s legal adviser, announced on 27 April 2026 the company’s $1.1 billion seed financing led by Sequoia Capital and Lightspeed Venture Partners.",
    ann("2026-04-27"), fund(1100000000, "USD", "exact", "announced", "Seed"),
    "Rests on the legal adviser’s release, not the company’s own announcement (not located). It does not establish closing or each investor’s share; the valuation stated is not recorded.",
    [ev("ineffable-seed-2026", "cooley-ineffable-2026", "Opening paragraph", "Cooley states that it advised Ineffable Intelligence on its $1.1 billion seed financing led by Sequoia Capital and Lightspeed Venture Partners.", A_IN)]))
for inv, name in [("sequoia", "Sequoia Capital"), ("lightspeed", "Lightspeed Venture Partners")]:
    slug = "ineffable-seed-2026-" + inv
    claims.append(claim(slug, "ev-2026-ineffable", inv, "participated_in_round", "ineffable-intelligence", "capital",
        f"Cooley announced on 27 April 2026 that Ineffable Intelligence’s seed financing was led by Sequoia Capital and Lightspeed Venture Partners, including {name}.",
        ann("2026-04-27"), part("announced", "Seed", "co-lead investor"), PART_Q + " Rests on the legal adviser’s release.",
        [ev(slug, "cooley-ineffable-2026", "Opening paragraph", f"Cooley names {name} as one of the two leads of the seed financing.", A_IN)]))

# --- Kyutai ---
A_TEAM = "An exceptional scientific team based in Paris"
claims.append(claim("kyutai-launch-2023", "ev-2023-11-kyutai", "kyutai", "founding_stated", {"kind": "literal", "value": "17 November 2023 (launch)"}, "institutions",
    "The CMA CGM Group announced on 17 November 2023 that Kyutai had been launched that day at Station F in Paris.",
    {"kind": "event", "date": "2023-11-17", "note": "Launch date as announced; not a legal incorporation date."},
    {},
    "A launch date stated by one of the three founding organisations; it does not establish when the organisation was legally formed.",
    [ev("kyutai-launch-2023", "cmacgm-kyutai-2023", "Opening paragraph", "The announcement states that Kyutai was launched that day at Station F, Paris.", "was launched today at Station F (Paris)")]))
A_ZEG = "Neil joins Kyutai from Google DeepMind, where he started and led a team working on generative audio"
claims.append(claim("zeghidour-gdm-prior", "ev-2023-11-kyutai", "neil-zeghidour", "held_role", "google-deepmind", "people",
    "Kyutai’s launch announcement of 17 November 2023 states that Neil Zeghidour joined Kyutai from Google DeepMind, where he started and led a team working on generative audio.",
    unk("A retrospective description in the announcement of 17 November 2023, which says he joins Kyutai from Google DeepMind; no start date or last working day is given."),
    {"role": "Started and led a team working on generative audio"},
    "A retrospective description in the launch announcement; it gives no title or dates.",
    [ev("zeghidour-gdm-prior", "cmacgm-kyutai-2023", "Section “An exceptional scientific team based in Paris”, entry Neil Zeghidour", "The announcement states that Zeghidour joins from Google DeepMind, where he started and led a generative-audio team.", A_ZEG)]))
claims.append(claim("zeghidour-kyutai-2023", "ev-2023-11-kyutai", "neil-zeghidour", "held_role", "kyutai", "people",
    "Kyutai’s launch announcement of 17 November 2023 names Neil Zeghidour as a member of its scientific team.",
    snap("2023-11-17", "Role as announced at the launch; not a start date."), {"role": "Member of the scientific team"},
    "Records the announced team membership at launch; it gives no title and does not establish a continuing role. Kyutai’s team page retrieved on 29 October 2026 lists him as Audio Research Advisor; that later role is not recorded here.",
    [ev("zeghidour-kyutai-2023", "cmacgm-kyutai-2023", "Section “An exceptional scientific team based in Paris”, entry Neil Zeghidour", "The announcement lists Zeghidour in Kyutai’s scientific team, joining from Google DeepMind.", A_TEAM + " … " + A_ZEG)]))
claims.append(claim("jegou-fair-2015", "ev-2023-11-kyutai", "herve-jegou", "held_role", "fair", "people",
    "Kyutai’s launch announcement of 17 November 2023 states that Hervé Jégou joined Facebook AI Research when its Paris laboratory was founded in 2015, serving as manager and then as director.",
    {"kind": "interval", "from": "2015", "note": "Start year as stated; the source gives no end date."},
    {"role": "Manager, then director (Facebook AI Research, Paris)"},
    "A retrospective description; it does not date the change from manager to director or the end of the role.",
    [ev("jegou-fair-2015", "cmacgm-kyutai-2023", "Section “An exceptional scientific team based in Paris”, entry Hervé Jégou", "The announcement states that Jégou joined Facebook AI Research at the founding of its Paris laboratory in 2015, as manager and then director.", "He joined Facebook AI Research when the Paris laboratory was founded in 2015, serving as manager and then as director")]))
claims.append(claim("jegou-kyutai-2023", "ev-2023-11-kyutai", "herve-jegou", "held_role", "kyutai", "people",
    "Kyutai’s launch announcement of 17 November 2023 names Hervé Jégou as a member of its scientific team.",
    snap("2023-11-17", "Role as announced at the launch; not a start date."), {"role": "Member of the scientific team"},
    "Records the announced team membership at launch; it gives no title and does not establish a continuing role. He is not listed on Kyutai’s team page as retrieved on 29 October 2026; no departure is recorded here.",
    [ev("jegou-kyutai-2023", "cmacgm-kyutai-2023", "Section “An exceptional scientific team based in Paris”, entry Hervé Jégou", "The announcement lists Jégou in Kyutai’s scientific team.", A_TEAM + " … Hervé Jégou")]))

draft = {
    "group": "eu",
    "searched": (
        "Searched 29 October 2026 (web search for discovery only; every passage read from the retrieved text). Mistral AI: mistral.ai news for 2023–2026 rounds; Lightspeed and a16z posts; tech.eu and TechCrunch for the Series A and B, for which no Mistral AI text was located. "
        "Inflection AI: inflection.ai blog index (the June 2023 funding release is no longer on the site), Business Wire (refused), TechCrunch; Inflection’s May 2024 and July 2026 posts. Reid Hoffman’s later roles: only Manas AI found (a drug-discovery company; omitted). "
        "Microsoft AI: Official Microsoft Blog posts of April 2024 (London hub) and March 2026 (Copilot leadership update); microsoft.ai news and about pages (no leadership roster; no text on Karén Simonyan’s later remit). Hires from Google DeepMind to Microsoft AI (Dominic King, Amar Subramanya and others) were found only in reporting or LinkedIn posts. "
        "European and new labs founded by frontier-lab people: Latent Labs press releases; Adaption blog, Emergence Capital post, Wilson Sonsini note; Ineffable Intelligence site, Companies House register, Cooley release, Fortune; Kyutai site and the CMA CGM launch release. "
        "The r.jina.ai relay refused all requests from this environment during this pass (HTTP 401, IP reputation), so publishers that need the relay were retrieved directly where possible. Not searched: Black Forest Labs (founders from Stability AI, not a frontier lab in scope), Bioptimus, Reka (founded 2022; already recorded)."
    ),
    "existingUsed": [
        "lg-new-mistral-founding-2023", "lg-new-mensch-mistral-cofounder", "lg-new-lample-mistral-cofounder", "lg-new-lacroix-mistral-cofounder",
        "lg-new-mensch-deepmind-2022", "lg-new-lample-meta-2023", "lg-new-lacroix-meta-2023",
        "lg-deal-suleyman-cofounded-inflection-2022", "lg-deal-hoffman-cofounded-inflection-2022", "lg-deal-simonyan-cofounded-inflection-2022",
        "lg-deal-white-inflection-ceo-2024", "lg-deal-mittal-inflection-cto-2024", "lg-deal-white-inflection-ceo-2026",
        "lg-deal-microsoft-ai-unit-2024", "lg-deal-suleyman-microsoft-ai-ceo-2024", "lg-deal-simonyan-microsoft-ai-chief-scientist-2024",
        "lg-gw-mai-superintelligence-team-unit-2025", "lg-gw-subramanya-microsoft-cvp-ai-prior", "xm-pineau-cohere", "atlas-david-silver-deepmind",
    ],
    "entities": entities,
    "sources": sources,
    "events": events,
    "claims": claims,
    "omitted": [
        {"item": "Inflection AI June 2023 round: Reid Hoffman, Bill Gates and Eric Schmidt as named leads", "reason": "participated_in_round takes an organisation as investor; the three are individuals and the report does not name investment vehicles. Recorded only Microsoft and Nvidia."},
        {"item": "Mistral AI Series A participants other than a16z (Lightspeed, Salesforce, Motier Ventures)", "reason": "Named only in tech.eu reporting; no primary text located. Left for the coordinator to add from reporting if wanted."},
        {"item": "Mistral AI Series B participants other than General Catalyst (Lightspeed, a16z, Bpifrance, BNP Paribas, Nvidia, Salesforce, Samsung, IBM, as summarised in search results)", "reason": "Not in the retrieved TechCrunch text; no primary list located."},
        {"item": "ASML CFO joining Mistral AI’s strategic committee (September 2025)", "reason": "Reported only (SiliconANGLE); a governance role of a parent-company executive belongs with the people pack."},
        {"item": "Latent Labs Series A participants Flying Fish, Isomer, 8VC, Kindred Capital, Pillar VC, and angel investors (Jeff Dean, Aidan Gomez, Mati Staniszewski)", "reason": "Named in the same Latent Labs release; left out to keep the group near its target size; individuals cannot be round participants under the predicate. Can be added from lg2-src-latent-50m-2025."},
        {"item": "Adaption seed participants Mozilla Ventures, Fifty Years, Threshold Ventures, Alpha Intelligence Capital, E14 Fund, Neo", "reason": "Named only in the Wilson Sonsini client note (about 110 words, quotation limit about 10 words); left out to keep the group near target. The note is cached as eu-wsgr-adaption."},
        {"item": "Sara Hooker’s and Sudip Roy’s earlier roles at Google Brain, Google and Cohere", "reason": "Stated only by the investor (Emergence Capital), not by the founders or a company page; Hooker’s departure from Cohere is recorded from reporting."},
        {"item": "Ineffable Intelligence directors Alfred Lin and Ravi Mhatre (appointed 17 April 2026)", "reason": "Investor-appointed directors; the register does not identify their firms, and identification would rest on addresses. Left out."},
        {"item": "Ineffable Intelligence’s other reported co-founders and the seed participants beyond the two leads (NVIDIA, DST Global, Index Ventures, Google and others)", "reason": "Named only in reporting or aggregators; no primary text located."},
        {"item": "Manas AI (Reid Hoffman and Siddhartha Mukherjee, 2025)", "reason": "A drug-discovery company, not a lab founded by frontier-lab staff; outside scope. manas.ai is an unrelated business."},
        {"item": "Dominic King, Christopher Kelly and other Google DeepMind staff joining Microsoft AI’s health unit (December 2024)", "reason": "Found only in reporting relaying the Financial Times, without primary text; the retrieved Semafor summary names none of them."},
        {"item": "Amar Subramanya’s move from Google to Microsoft AI (July 2025)", "reason": "Announced on LinkedIn (not admissible); the dataset already records his Microsoft CVP role from Apple’s announcement (lg-gw-subramanya-microsoft-cvp-ai-prior)."},
        {"item": "Karén Simonyan’s remit in the MAI Superintelligence Team (2025–2026)", "reason": "No Microsoft or Simonyan text naming his later role could be retrieved; microsoft.ai pages give no roster."},
        {"item": "Kyutai scientific team members Alexandre Défossez, Edouard Grave, Laurent Mazaré and CEO Patrick Pérez", "reason": "Named in the same launch release; left out to keep the group near target (Grave’s Meta work is in the people pack as pp-au-edouard-grave-llama-paper; Mazaré and Pérez came from outside frontier labs, apart from Mazaré’s 2017–2018 DeepMind stint). Can be added from lg2-src-cmacgm-kyutai-2023."},
        {"item": "Kyutai’s founding organisations (iliad, CMA CGM, Schmidt Futures) and their €100 million contributions", "reason": "co_founded takes a person as subject; the contributions are donations to a non-profit, not a funding round."},
        {"item": "Hugo Larochelle’s earlier roles at Google Brain and DeepMind", "reason": "Stated in Adaption’s post as “nearly a decade leading AI research” without titles or dates; the post’s quotation limit (about 28 words) is already largely used."},
    ],
    "retrievalFailures": [
        {"url": "https://inflection.ai/inflection-ai-announces-1-3-billion-of-funding", "what": "Inflection AI’s June 2023 funding announcement", "result": "HTTP 200 with a 404 page via relay; also tried /blog/ path (404 page)"},
        {"url": "https://www.businesswire.com/news/home/20230629810313/en/", "what": "Inflection AI press release of 29 June 2023 (Business Wire)", "result": "direct HTTP 403; relay HTTP 422 and 401"},
        {"url": "https://blogs.microsoft.com/blog/2024/04/07/announcing-new-microsoft-ai-hub-in-london/", "what": "Microsoft AI London announcement", "result": "relay HTTP 401 (r.jina.ai: blocked for IP reputation); direct retrieval succeeded"},
        {"url": "https://www.kingsfund.org.uk/about-us/our-people/dominic-king", "what": "Dominic King biography", "result": "HTTP 403"},
        {"url": "https://www.wsgr.com/en/insights/wilson-sonsini-advises-adaption-labs-on-dollar50-million-seed-funding.html", "what": "Wilson Sonsini note on Adaption’s seed round (HTML)", "result": "HTTP 403; the PDF print version was retrieved"},
        {"url": "https://cyber-valley.org/de/news/launch-kyutai", "what": "Cyber Valley news item on Kyutai’s launch", "result": "HTTP 404 (English and German paths)"},
        {"url": "https://kyutai.org/about/", "what": "Kyutai about page", "result": "HTTP 404; kyutai.org has no about or press page"},
    ],
}

with open(OUT, "w") as f:
    json.dump(draft, f, ensure_ascii=False, indent=2)
    f.write("\n")
print(len(claims), "claims")
