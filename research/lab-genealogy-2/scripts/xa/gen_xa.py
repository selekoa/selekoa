import json, sys

OUT = sys.argv[1]
G = "xa"

def ent(id, name, sort=None, typ="person", desc="", src=None, aliases=None):
    e = {"id": id, "type": typ, "name": name}
    if typ == "person":
        e["sortName"] = sort
        e["subtype"] = "Institutional actor"
    e["aliases"] = aliases or []
    e["description"] = desc
    e["sourceIds"] = src or []
    return e

def ex(id):
    return {"id": id, "existing": True}

entities = [ex(i) for i in [
    "xai", "amazon", "apple", "openai", "pieter-abbeel", "david-luan", "john-giannandrea",
    "toby-pohlen", "kyle-kosic", "nvidia"]]
entities += [
    ent("valor-equity-partners", "Valor Equity Partners", typ="organisation", desc="Investment firm named by xAI among participants in its Series B (2024) and Series E (2026) rounds.", src=["lg2-src-xai-series-b"]),
    ent("vy-capital", "Vy Capital", typ="organisation", desc="Investment firm named by xAI among participants in its Series B round (2024).", src=["lg2-src-xai-series-b"]),
    ent("andreessen-horowitz", "Andreessen Horowitz", typ="organisation", aliases=["a16z"], desc="Venture capital firm named by xAI among participants in its Series B round (2024).", src=["lg2-src-xai-series-b"]),
    ent("fidelity-management-research", "Fidelity Management & Research Company", typ="organisation", desc="Investment manager named by xAI among participants in its Series B (2024) and Series E (2026) rounds.", src=["lg2-src-xai-series-b"]),
    ent("kingdom-holding", "Kingdom Holding", typ="organisation", aliases=["Kingdom Holding Company", "Kingdom Holdings"], desc="Saudi investment company named by xAI, together with Prince Alwaleed Bin Talal, among participants in its Series B round (2024).", src=["lg2-src-xai-series-b"]),
    ent("amd", "AMD", typ="organisation", aliases=["Advanced Micro Devices"], desc="Chip company named by xAI as a strategic investor in its Series C round (2024).", src=["lg2-src-xai-series-c"]),
    ent("stepstone-group", "StepStone Group", typ="organisation", aliases=["Stepstone Group"], desc="Investment firm named by xAI among participants in its Series E round (2026).", src=["lg2-src-xai-series-e"]),
    ent("qatar-investment-authority", "Qatar Investment Authority", typ="organisation", aliases=["QIA"], desc="Sovereign investor named by xAI among participants in its Series E round (2026).", src=["lg2-src-xai-series-e"]),
    ent("mgx", "MGX", typ="organisation", desc="Abu Dhabi investment company named by xAI among participants in its Series E round (2026).", src=["lg2-src-xai-series-e"]),
    ent("baron-capital-group", "Baron Capital Group", typ="organisation", desc="Investment firm named by xAI among participants in its Series E round (2026).", src=["lg2-src-xai-series-e"]),
    ent("cisco-investments", "Cisco Investments", typ="organisation", desc="Investment arm of Cisco, named by xAI as a strategic investor in its Series E round (2026).", src=["lg2-src-xai-series-e"]),
    ent("humain", "HUMAIN", typ="organisation", desc="AI company owned by Saudi Arabia's Public Investment Fund; announced in February 2026 a $3 billion investment in xAI's Series E round.", src=["lg2-src-humain-xai-2026"]),
    ent("rohit-prasad", "Rohit Prasad", "Prasad, Rohit", desc="Amazon executive identified in December 2024 as SVP of Amazon Artificial General Intelligence; Amazon announced in December 2025 that he would leave the company.", src=["lg2-src-amazon-nova-2024", "lg2-src-amazon-desantis-2025"]),
    ent("peter-desantis", "Peter DeSantis", "DeSantis, Peter", desc="Amazon executive named in December 2025 to lead a new organisation covering Amazon's largest AI models, silicon development and quantum computing.", src=["lg2-src-amazon-desantis-2025"]),
    ent("robert-keele", "Robert Keele", "Keele, Robert", aliases=["Rob Keele"], desc="Reported as xAI's first head of legal (from May 2024); posted in August 2025 that he was leaving xAI.", src=["lg2-src-x-keele-2025", "lg2-src-tc-keele-2025"]),
    ent("lily-lim", "Lily Lim", "Lim, Lily", desc="Lawyer reported in August 2025 as taking over as xAI's head of legal.", src=["lg2-src-tc-keele-2025"]),
    ent("james-burnham", "James Burnham", "Burnham, James", desc="Lawyer reported in November 2025 as general counsel of xAI.", src=["lg2-src-bgov-burnham-2025"]),
    ent("mike-liberatore", "Mike Liberatore", "Liberatore, Mike", desc="Reported as xAI's chief financial officer from April to July 2025 and appointed by OpenAI in September 2025 as business finance officer for AI infrastructure.", src=["lg2-src-cfodive-liberatore-2025"]),
    ent("anthony-armstrong", "Anthony Armstrong", "Armstrong, Anthony", desc="Former Morgan Stanley banker reported in October 2025 as xAI's chief financial officer.", src=["lg2-src-tc-armstrong-2025"]),
    ent("michael-nicolls", "Michael Nicolls", "Nicolls, Michael", desc="Former Starlink executive reported as president of xAI from April 2026.", src=["lg2-src-36kr-xai-org-2026"]),
    ent("uday-ruddarraju", "Uday Ruddarraju", "Ruddarraju, Uday", desc="Reported as head of infrastructure at xAI until 2025 and as joining OpenAI in July 2025 as head of compute and infrastructure.", src=["lg2-src-dcd-ruddarraju-2026"]),
    ent("ke-yang", "Ke Yang", "Yang, Ke", desc="Reported in October 2025 as head of Apple's Answers, Knowledge, and Information team and as leaving Apple for Meta.", src=["lg2-src-appleinsider-keyang-2025"]),
]

def src(id, key, title, publisher, date, kind, url, route, cls, lang="en", authors=None, dsid=None, words=None):
    s = {"id": id, "cacheKey": key, "title": title, "authors": authors or [], "publisher": publisher,
         "publicationDate": date, "kind": kind, "url": url, "route": route, "language": lang, "sourceClass": cls}
    if dsid:
        s["datasetSourceId"] = dsid
    return s

sources = [
    src("lg2-src-xai-series-b", "xa-series-b", "Series B funding round", "xAI", "2024-05-26", "announcement", "https://x.ai/news/series-b", "direct", "primary", dsid="source-xai-series-b"),
    src("lg2-src-xai-series-c", "xa-series-c", "xAI raises $6B Series C", "xAI", "2024-12-23", "announcement", "https://x.ai/news/series-c", "direct", "primary", dsid="source-xai-series-c-2024"),
    src("lg2-src-xai-series-e", "xa-series-e", "xAI Raises $20B Series E", "xAI", "2026-01-06", "announcement", "https://x.ai/news/series-e", "direct", "primary", dsid="source-xm-series-e"),
    src("lg2-src-humain-xai-2026", "xa-humain-xai-2026", "HUMAIN Backs xAI with $3 Billion Series E Investment Ahead of Historic SpaceX Merger", "HUMAIN (press release distributed by PR Newswire, as carried by Kyodo News PR Wire)", "2026-02-18", "announcement", "https://kyodonewsprwire.jp/release/202602184291", "direct", "primary"),
    src("lg2-src-amazon-desantis-2025", "xa-amazon-desantis-2025", "Andy Jassy makes Amazon leadership announcement", "Amazon", "2025-12-17", "message", "https://www.aboutamazon.com/news/company-news/andy-jassy-peter-desantis-amazon-leadership-update", "direct", "primary", authors=["Andy Jassy"]),
    src("lg2-src-amazon-nova-2024", "xa-amazon-nova-2024", "Amazon Nova: Meet our new foundation models in Amazon Bedrock", "Amazon", "2024-12-03", "announcement", "https://www.aboutamazon.com/news/aws/amazon-nova-artificial-intelligence-bedrock-aws", "direct", "primary"),
    src("lg2-src-reuters-agi-cuts-2026", "xa-reuters-agi-cuts-2026", "Amazon cuts jobs in its artificial general intelligence group", "Reuters (as carried by StreetInsider)", "2026-07-22", "article", "https://www.streetinsider.com/Reuters/Amazon+cuts+jobs+in+its+artificial+general+intelligence+group/26799952.html", "relay", "reporting", authors=["Greg Bensinger"]),
    src("lg2-src-nextink-luan-2026", "xa-nextink-luan-2026", "Amazon perd le responsable de son AI Lab, qui part en quête de l’IA générale (AGI)", "Next", "2026-02-25", "article", "https://next.ink/brief-article/amazon-perd-le-responsable-de-son-ai-lab-qui-va-se-consacrer-a-la-quete-de-lia-generale-agi/", "direct", "reporting", lang="fr", authors=["Sébastien Gavois"]),
    src("lg2-src-x-keele-2025", "xa-x-keele-2025", "Post by Rob Keele (@keelelaw_io)", "X", "2025-08-05", "post", "https://x.com/keelelaw_io/status/1952880645216289178", "x", "primary", authors=["Robert Keele"]),
    src("lg2-src-tc-keele-2025", "xa-tc-keele-2025", "xAI's legal chief steps down after whirlwind year", "TechCrunch", "2025-08-07", "article", "https://techcrunch.com/2025/08/07/xais-legal-chief-steps-down-after-whirlwind-year/", "direct", "reporting", authors=["Connie Loizos"]),
    src("lg2-src-tc-armstrong-2025", "xa-tc-p3054883", "xAI hires former Morgan Stanley banker Anthony Armstrong as CFO", "TechCrunch", "2025-10-07", "article", "https://techcrunch.com/2025/10/07/xai-hires-former-morgan-stanley-banker-anthony-armstrong-as-cfo/", "direct", "reporting", authors=["Ram Iyer"]),
    src("lg2-src-cfodive-liberatore-2025", "xa-cfodive-liberatore-2025", "OpenAI nabs former xAI CFO as business finance leader", "CFO Dive", "2025-09-16", "article", "https://www.cfodive.com/news/openai-nabs-former-xai-cfo-business-finance-leader/760299/", "direct", "reporting", authors=["Grace Noto"]),
    src("lg2-src-fortune-kosic-2024", "xa-fortune-kosic-2024", "One of xAI's original employees has left Elon Musk's AI startup to return to OpenAI", "Fortune", "2024-06-28", "article", "https://fortune.com/2024/06/28/xai-original-employee-departure-kyle-kosic-engineer/", "direct", "reporting"),
    src("lg2-src-tc-xai-allhands-2026", "xa-tc-allhands-2026", "xAI lays out interplanetary ambitions in public all-hands", "TechCrunch", "2026-02-11", "article", "https://techcrunch.com/2026/02/11/xai-lays-out-interplanetary-ambitions-in-public-all-hands/", "direct", "reporting", authors=["Russell Brandom"]),
    src("lg2-src-36kr-xai-org-2026", "xa-36kr-nicolls-2026", "马斯克重建xAI组织图曝光，12名旧臣空降，三线大换血", "36Kr (republishing 新智元)", "2026-05-22", "article", "https://www.36kr.com/p/3820403238343042", "direct", "reporting", lang="zh"),
    src("lg2-src-dcd-ruddarraju-2026", "xa-dcd-ruddarraju-2026", "Uday Ruddarraju named OpenAI's CTO of Compute", "DatacenterDynamics", "2026-07-20", "article", "https://www.datacenterdynamics.com/en/news/uday-ruddarraju-named-openais-cto-of-compute/", "relay", "reporting", authors=["Sebastian Moss"]),
    src("lg2-src-apple-giannandrea-2025", "xa-apple-giannandrea-2025", "John Giannandrea to retire from Apple", "Apple", "2025-12-01", "announcement", "https://www.apple.com/newsroom/2025/12/john-giannandrea-to-retire-from-apple/", "direct", "primary", dsid="lg-src-gw-apple-giannandrea-2025"),
    src("lg2-src-appleinsider-keyang-2025", "xa-appleinsider-keyang-2025", "Apple AI team loses another executive to Meta", "AppleInsider", "2025-10-15", "article", "https://appleinsider.com/articles/25/10/15/apple-ai-team-loses-another-executive-to-meta", "relay", "reporting", authors=["Wesley Hilliard"]),
    src("lg2-src-bgov-burnham-2025", "xa-bgov-burnham-2025", "Elon Musk's xAI Taps Former Top DOGE Lawyer as General Counsel", "Bloomberg Government", "2025-11-21", "article", "https://news.bgov.com/bloomberg-government-news/elon-musks-xai-taps-former-top-doge-lawyer-as-general-counsel", "direct", "reporting", authors=["Brian Baxter"]),
]
SRC = {s["id"]: s for s in sources}

events = [
    {"id": "ev-2024-05-xai-series-b", "date": "2024-05-26", "title": "xAI announces its Series B round and names participating investors", "labs": ["xai"]},
    {"id": "ev-2024-12-xai-series-c", "date": "2024-12-23", "title": "xAI announces the close of its Series C round, naming NVIDIA and AMD as strategic investors", "labs": ["xai"]},
    {"id": "ev-2026-01-xai-series-e", "date": "2026-01-06", "title": "xAI announces the completion of its Series E round and names participating investors", "labs": ["xai"]},
    {"id": "ev-2025-12-amazon-agi-reorganisation", "date": "2025-12-17", "title": "Andy Jassy's message: Peter DeSantis to lead a new AI models, silicon and quantum organisation; Pieter Abbeel to lead frontier model research; Rohit Prasad to leave", "labs": ["amazon"]},
    {"id": "ev-2025-xai-legal-finance-leadership", "date": "2025", "title": "Changes in xAI's legal and finance leadership reported during 2025", "labs": ["xai"]},
]

def evid(slug, sid, loc, ptype, passage, anchor=None, support="supports"):
    s = SRC[sid]
    e = {"id": f"lg2-ev-{G}-{slug}", "sourceId": sid,
         "sourceRole": "secondary" if s["sourceClass"] == "reporting" else "primary",
         "support": support, "locator": loc, "passageType": ptype, "passage": passage}
    if anchor:
        e["anchor"] = anchor
    return e

claims = []
def claim(slug, subj, pred, obj, topic, stmt, time, qual, ev, attrs=None, event=None, related=None, **kw):
    c = {"id": f"lg2-{G}-{slug}"}
    if event:
        c["event"] = event
    c.update({"subject": subj, "predicate": pred,
              "object": {"kind": "entity", "entityId": obj} if isinstance(obj, str) else obj,
              "topic": topic, "statement": stmt, "time": time})
    if attrs:
        c["attributes"] = attrs
    c.update({"derivation": "explicit", "resolution": "supported", "qualification": qual,
              "relatedExisting": related or [], "evidence": ev})
    c.update(kw)
    claims.append(c)

# ---- Capital: Series B participants (2024-05-26) ----
B_TIME = {"kind": "event", "date": "2024-05-26", "note": "Date of xAI's announcement; not a closing date."}
B_LOC = "Paragraph 2 (list of key investors)"
for slug, eid, name, anchor in [
    ("valor-series-b", "valor-equity-partners", "Valor Equity Partners", "Valor Equity Partners"),
    ("vy-series-b", "vy-capital", "Vy Capital", "Vy Capital"),
    ("a16z-series-b", "andreessen-horowitz", "Andreessen Horowitz", "Andreessen Horowitz"),
    ("fidelity-series-b", "fidelity-management-research", "Fidelity Management & Research Company", "Fidelity Management & Research Company"),
    ("kingdom-series-b", "kingdom-holding", "Kingdom Holding", "Kingdom Holding"),
]:
    claim(slug, eid, "participated_in_round", "xai", "capital",
          f"xAI announced on 26 May 2024 that {name} was among the key investors participating in its Series B funding round.",
          B_TIME,
          "Named participation as announced by xAI; the round total is a separate existing record and no amount is attributed to this investor. The announcement does not state that the round had closed.",
          [evid(slug, "lg2-src-xai-series-b", B_LOC, "paraphrase",
                f"xAI lists {name} among the key investors participating in its $6 billion Series B round, amongst others.", anchor)],
          attrs={"transactionType": "funding_round", "transactionStage": "announced", "relationshipContext": "external", "period": "Series B"},
          event="ev-2024-05-xai-series-b", related=["xai-round-total-2024", "sequoia-xai-2024"])

# ---- Capital: AMD in Series C ----
claim("amd-series-c", "amd", "participated_in_round", "xai", "capital",
      "xAI announced on 23 December 2024 that AMD had participated as a strategic investor in its closed Series C funding round.",
      {"kind": "event", "date": "2024-12-23", "note": "Date of xAI's announcement; the source describes the round as closed."},
      "Named participation as announced by xAI; no amount is attributed to AMD, and the round total is a separate existing record.",
      [evid("amd-series-c", "lg2-src-xai-series-c", "Paragraph 2", "quote", "Strategic investors NVIDIA and AMD also participated")],
      attrs={"transactionType": "funding_round", "transactionStage": "closed", "relationshipContext": "external", "period": "Series C", "role": "strategic investor"},
      event="ev-2024-12-xai-series-c", related=["xai-series-c-total-2024", "nvidia-xai-series-c-2024"])

# ---- Capital: Series E participants ----
E_TIME = {"kind": "event", "date": "2026-01-06", "note": "Date of xAI's announcement; the source describes the round as completed."}
for slug, eid, name, anchor, role in [
    ("valor-series-e", "valor-equity-partners", "Valor Equity Partners", "Valor Equity Partners", None),
    ("stepstone-series-e", "stepstone-group", "StepStone Group", "Stepstone Group", None),
    ("fidelity-series-e", "fidelity-management-research", "Fidelity Management & Research Company", "Fidelity Management & Research Company", None),
    ("qia-series-e", "qatar-investment-authority", "the Qatar Investment Authority", "Qatar Investment Authority", None),
    ("mgx-series-e", "mgx", "MGX", "MGX and Baron Capital Group", None),
    ("baron-series-e", "baron-capital-group", "Baron Capital Group", "MGX and Baron Capital Group", None),
    ("cisco-series-e", "cisco-investments", "Cisco Investments", "NVIDIA and Cisco Investments", "strategic investor"),
]:
    if role:
        stmt = f"xAI announced on 6 January 2026 that {name} was a strategic investor in its completed Series E funding round."
        para = "xAI names NVIDIA and Cisco Investments as strategic investors in the Series E round."
        loc = "Paragraph 2 (strategic investors)"
    else:
        stmt = f"xAI announced on 6 January 2026 that {name} was among the investors participating in its completed Series E funding round."
        para = f"xAI lists {name.replace('the ', '', 1) if name.startswith('the ') else name} among the investors participating in the Series E round, amongst other key partners."
        loc = "Paragraph 1 (investors participating in the round)"
    a = {"transactionType": "funding_round", "transactionStage": "closed", "relationshipContext": "external", "period": "Series E"}
    if role:
        a["role"] = role
    claim(slug, eid, "participated_in_round", "xai", "capital", stmt, E_TIME,
          "Named participation as announced by xAI; no amount is attributed to this investor, and the $20 billion round total is a separate existing record.",
          [evid(slug, "lg2-src-xai-series-e", loc, "paraphrase", para, anchor)],
          attrs=a, event="ev-2026-01-xai-series-e", related=["xm-series-e-total", "xm-nvidia-series-e"])

# ---- Capital: HUMAIN's stated investment in Series E ----
claim("humain-series-e", "humain", "participated_in_round", "xai", "capital",
      "HUMAIN announced on 18 February 2026 a $3 billion strategic investment in xAI as part of xAI's Series E financing round.",
      {"kind": "event", "date": "2026-02-18", "note": "Date of HUMAIN's announcement, after xAI's own announcement of the completed round on 6 January 2026; not a transaction date."},
      "HUMAIN's own announcement of its own amount; the amount is HUMAIN's stated investment, not the round total. xAI's announcement of 6 January 2026 does not name HUMAIN. The record does not establish when the funds were paid.",
      [evid("humain-series-e", "lg2-src-humain-xai-2026", "Paragraph 1 (dateline RIYADH, 18 February 2026)", "quote",
            "today announced a $3 billion strategic investment in xAI as part of the company's Series E financing round")],
      attrs={"transactionType": "investment", "transactionStage": "announced", "relationshipContext": "external", "period": "Series E",
             "amount": {"value": 3000000000, "currency": "USD", "bound": "exact", "scope": "transaction"}},
      event="ev-2026-01-xai-series-e", related=["xm-series-e-total"])

# ---- Amazon ----
claim("prasad-amazon-svp-agi-2024", "rohit-prasad", "held_role", "amazon", "people",
      "Amazon's announcement of Amazon Nova on 3 December 2024 identifies Rohit Prasad as SVP of Amazon Artificial General Intelligence.",
      {"kind": "snapshot", "date": "2024-12-03", "note": "Role as shown in the announcement of this date; not a start date."},
      "A dated title in a company announcement; it does not establish when he took the role or how the AGI organisation was structured.",
      [evid("prasad-amazon-svp-agi-2024", "lg2-src-amazon-nova-2024", "Quotation attributed to Rohit Prasad, section introducing the Nova models", "quote",
            "said Rohit Prasad, SVP of Amazon Artificial General Intelligence")],
      attrs={"role": "SVP of Amazon Artificial General Intelligence"})

claim("prasad-amazon-departure-2025", "rohit-prasad", "departure_announced", "amazon", "people",
      "Amazon CEO Andy Jassy announced in a message to employees published on 17 December 2025 that Rohit Prasad had decided to leave Amazon at the end of the year.",
      {"kind": "event", "date": "2025-12-17", "note": "Date of the published message; the departure was stated as prospective (end of the year)."},
      "An announced departure. Reuters reported on 22 July 2026 that he had left at the end of 2025; the record does not establish his last working day or any later role.",
      [evid("prasad-amazon-departure-2025", "lg2-src-amazon-desantis-2025", "Paragraph beginning 'Finally, I want to recognize Rohit Prasad'", "quote",
            "Rohit Prasad, who has decided to leave Amazon at the end of this year"),
       evid("prasad-amazon-departure-2025-role", "lg2-src-amazon-desantis-2025", "Same paragraph", "quote",
            "For the past two years, Rohit has led the creation of Amazon Nova and our AGI organization"),
       evid("prasad-amazon-departure-2025-reuters", "lg2-src-reuters-agi-cuts-2026", "Paragraph 4", "quote",
            "Rohit Prasad, a top Amazon executive overseeing AGI, left the company at the end of last year and the head of its AGI Lab, David Luan, left in February",
            support="context")],
      attrs={"role": "led the creation of Amazon Nova and Amazon's AGI organization (as worded in the message)", "stage": "announced"},
      event="ev-2025-12-amazon-agi-reorganisation")

claim("desantis-amazon-ai-org-2025", "peter-desantis", "held_role", "amazon", "people",
      "Amazon CEO Andy Jassy announced on 17 December 2025 that he had asked Peter DeSantis to lead a new organisation covering Amazon's most expansive AI models, including Nova and the AGI team, silicon development and quantum computing, reporting to him.",
      {"kind": "snapshot", "date": "2025-12-17", "note": "Date of the published message; not a start date."},
      "An announced appointment; the record does not establish a start date, the organisation's later structure or a continuing role.",
      [evid("desantis-amazon-ai-org-2025", "lg2-src-amazon-desantis-2025", "Paragraph 2", "quote",
            "I’ve asked Peter DeSantis to lead a new organization that drives our most expansive AI models"),
       evid("desantis-amazon-ai-org-2025-reports", "lg2-src-amazon-desantis-2025", "Paragraph 5", "quote", "Peter will report directly to me.")],
      attrs={"role": "leader of a new organisation for Amazon's most expansive AI models (Nova and the AGI team), silicon development and quantum computing; reporting to the CEO", "stage": "announced"},
      event="ev-2025-12-amazon-agi-reorganisation")

claim("abbeel-amazon-frontier-research-2025", "pieter-abbeel", "held_role", "amazon", "people",
      "Amazon CEO Andy Jassy announced on 17 December 2025 that Pieter Abbeel would lead Amazon's frontier model research team, the team that builds the base model, in AGI.",
      {"kind": "snapshot", "date": "2025-12-17", "note": "Date of the published message; not a start date."},
      "An announced appointment; the message says he would also continue his work with Amazon's Robotics team. The record does not establish a start date or a continuing role.",
      [evid("abbeel-amazon-frontier-research-2025", "lg2-src-amazon-desantis-2025", "Paragraph 6", "quote",
            "Pieter Abbeel will lead our frontier model research team (the team that builds the base model) in AGI")],
      attrs={"role": "lead, frontier model research team in AGI", "stage": "announced"},
      event="ev-2025-12-amazon-agi-reorganisation")

claim("luan-amazon-departure-2026", "david-luan", "departure_announced", "amazon", "people",
      "Next reported on 25 February 2026 that David Luan had announced his departure from Amazon in a LinkedIn message; Reuters reported in July 2026 that he left in February.",
      {"kind": "event", "date": "2026-02", "note": "Month of the reported LinkedIn announcement and of the departure as reported; the exact date of his post was not retrieved."},
      "The record rests on reporting: Next relays a LinkedIn message by Luan (in French translation) and Reuters states the departure month. The post itself was not retrieved; the record does not establish his last working day or later role.",
      [evid("luan-amazon-departure-2026", "lg2-src-nextink-luan-2026", "Paragraph 1", "quote",
            "C’est via un message sur LinkedIn que David Luan annonce son départ d’Amazon"),
       evid("luan-amazon-departure-2026-reason", "lg2-src-nextink-luan-2026", "Paragraph 2 (quotation of the LinkedIn message, in translation)", "quote",
            "j’ai décidé de consacrer 100 % de mon temps à enseigner aux systèmes d’IA de toutes nouvelles capacités"),
       evid("luan-amazon-departure-2026-reuters", "lg2-src-reuters-agi-cuts-2026", "Paragraph 4", "quote",
            "Rohit Prasad, a top Amazon executive overseeing AGI, left the company at the end of last year and the head of its AGI Lab, David Luan, left in February")],
      attrs={"role": "head of Amazon's AGI Lab (Reuters' wording)"},
      related=["lg-deal-luan-amazon-agi-sf-2024", "lg-deal-amazon-agi-sf-lab-unit-2024"],
      statedReason={"by": "david-luan", "text": "Luan wrote, as relayed in French translation by Next, that he had decided to spend all of his time on teaching AI systems new capabilities.", "evidenceId": f"lg2-ev-{G}-luan-amazon-departure-2026-reason"})

# ---- xAI legal ----
claim("keele-xai-departure-2025", "robert-keele", "departure_announced", "xai", "people",
      "Robert Keele posted on X on 5 August 2025 that he was leaving xAI; TechCrunch reported that he had stepped down as xAI's head of legal.",
      {"kind": "event", "date": "2025-08-05", "note": "UTC timestamp of the post (23:53 on 5 August 2025)."},
      "First-person post; the role comes from TechCrunch's report of 7 August 2025. The record does not establish his last working day. A personal reason given in the post is not recorded.",
      [evid("keele-xai-departure-2025", "lg2-src-x-keele-2025", "Post, first line", "paraphrase",
            "Keele writes that he is leaving xAI.", "I'm leaving xAI."),
       evid("keele-xai-departure-2025-role", "lg2-src-tc-keele-2025", "Paragraph 1", "quote",
            "Robert Keele said this week that he has stepped down as xAI’s head of legal after just over a year")],
      attrs={"role": "head of legal"}, event="ev-2025-xai-legal-finance-leadership")

claim("lim-xai-head-of-legal-2025", "lily-lim", "held_role", "xai", "people",
      "TechCrunch reported on 7 August 2025 that Lily Lim was taking over from Robert Keele as xAI's head of legal.",
      {"kind": "snapshot", "date": "2025-08-07", "note": "Date of the report; not a start date."},
      "The record rests on reporting; no announcement by xAI or Lim was retrieved. It does not establish her title, start date or how long she held the role.",
      [evid("lim-xai-head-of-legal-2025", "lg2-src-tc-keele-2025", "Paragraph 6", "quote", "Taking over is Lily Lim")],
      attrs={"role": "head of legal (succeeding Robert Keele, as reported)"}, event="ev-2025-xai-legal-finance-leadership")

claim("burnham-xai-general-counsel-2025", "james-burnham", "held_role", "xai", "people",
      "Bloomberg Government reported on 21 November 2025 that James Burnham was general counsel of xAI, a role listed in an xAI press release of 19 November 2025.",
      {"kind": "snapshot", "date": "2025-11-21", "note": "Date of the report; not a start date."},
      "The record rests on reporting, which relays a press release of 19 November 2025 that was not retrieved. It does not establish a start date or a continuing role.",
      [evid("burnham-xai-general-counsel-2025", "lg2-src-bgov-burnham-2025", "Paragraph 1 (sentence beginning 'James Burnham')", "paraphrase",
            "Bloomberg Government reports that James Burnham is now general counsel of xAI.",
            "is now general counsel for the technology mogul’s artificial intelligence startup xAI"),
       evid("burnham-xai-general-counsel-2025-release", "lg2-src-bgov-burnham-2025", "Paragraph 2", "quote",
            "listed at the bottom of a Nov. 19 press release", support="context")],
      attrs={"role": "general counsel"}, event="ev-2025-xai-legal-finance-leadership")

# ---- xAI finance ----
claim("liberatore-xai-cfo-2025", "mike-liberatore", "held_role", "xai", "people",
      "CFO Dive reported on 16 September 2025 that Mike Liberatore had taken the CFO seat at xAI in April 2025 and departed in July 2025.",
      {"kind": "interval", "from": "2025-04", "until": "2025-07", "note": "Months as reported; the exact start and end dates are not established."},
      "The record rests on reporting, which relays The Wall Street Journal for the departure; no announcement by xAI or Liberatore was retrieved.",
      [evid("liberatore-xai-cfo-2025", "lg2-src-cfodive-liberatore-2025", "Dive Insight, paragraph 2", "quote",
            "leaving to take the CFO seat at xAI in April"),
       evid("liberatore-xai-cfo-2025-end", "lg2-src-cfodive-liberatore-2025", "Dive Brief, paragraph 3", "quote",
            "Liberatore abruptly departed from xAI in July after serving only four months as its finance chief")],
      attrs={"role": "chief financial officer"}, event="ev-2025-xai-legal-finance-leadership")

claim("liberatore-xai-departure-2025", "mike-liberatore", "departure_announced", "xai", "people",
      "CFO Dive reported on 16 September 2025, according to The Wall Street Journal, that Mike Liberatore had departed from xAI in July 2025.",
      {"kind": "event", "date": "2025-07", "note": "Departure month as reported; no announcement date is known."},
      "The record rests on reporting; no announcement by xAI or Liberatore was retrieved. It does not establish the exact date.",
      [evid("liberatore-xai-departure-2025", "lg2-src-cfodive-liberatore-2025", "Dive Brief, paragraph 3", "quote",
            "Liberatore abruptly departed from xAI in July after serving only four months as its finance chief")],
      attrs={"role": "chief financial officer"}, event="ev-2025-xai-legal-finance-leadership")

claim("liberatore-openai-bfo-2025", "mike-liberatore", "held_role", "openai", "people",
      "CFO Dive reported on 16 September 2025 that an OpenAI spokesperson had confirmed Mike Liberatore's appointment as business finance officer for AI infrastructure, effective that day, reporting to CFO Sarah Friar.",
      {"kind": "snapshot", "date": "2025-09-16", "note": "Date of the report, which gives the appointment as effective that Tuesday."},
      "The record rests on reporting of a spokesperson's confirmation; no OpenAI announcement was retrieved. It does not establish a continuing role.",
      [evid("liberatore-openai-bfo-2025", "lg2-src-cfodive-liberatore-2025", "Dive Brief, paragraph 1", "quote",
            "has appointed the former finance chief of xAI, Mike Liberatore, to the role of business finance officer (BFO) for AI infrastructure, effective Tuesday"),
       evid("liberatore-openai-bfo-2025-reports", "lg2-src-cfodive-liberatore-2025", "Dive Brief, paragraph 2", "quote",
            "Liberatore will report to OpenAI CFO Sarah Friar in the new role")],
      attrs={"role": "business finance officer (BFO) for AI infrastructure"})

claim("armstrong-xai-cfo-2025", "anthony-armstrong", "held_role", "xai", "people",
      "TechCrunch reported on 7 October 2025, relaying the Financial Times, that former Morgan Stanley banker Anthony Armstrong was xAI's new chief financial officer.",
      {"kind": "snapshot", "date": "2025-10-07", "note": "Date of the report; not a start date."},
      "The record rests on reporting that relays the Financial Times and its anonymous sources; xAI had not commented. It does not establish a start date or a continuing role.",
      [evid("armstrong-xai-cfo-2025", "lg2-src-tc-armstrong-2025", "Paragraph 1", "quote",
            "xAI, now has a new chief financial officer: Former Morgan Stanley banker Anthony Armstrong, the Financial Times reported")],
      attrs={"role": "chief financial officer"}, event="ev-2025-xai-legal-finance-leadership")

# ---- xAI other ----
claim("kosic-openai-rejoined-2024", "kyle-kosic", "held_role", "openai", "people",
      "Fortune reported on 28 June 2024 that OpenAI had confirmed that Kyle Kosic, a founding engineer of xAI, had rejoined OpenAI.",
      {"kind": "snapshot", "date": "2024-06-28", "note": "Date of the report; not a start date."},
      "The record rests on reporting of OpenAI's confirmation; no title is given. Fortune dates his departure from xAI to April 2024 from his LinkedIn profile; that departure is an existing record.",
      [evid("kosic-openai-rejoined-2024", "lg2-src-fortune-kosic-2024", "Paragraph 2", "quote",
            "OpenAI confirmed Kosic had rejoined the company, but declined to comment further.")],
      attrs={"role": "rejoined OpenAI (title not stated)"},
      related=["lg-mx-kosic-xai-departure-2024"])

claim("pohlen-xai-macrohard-lead-2026", "toby-pohlen", "held_role", "xai", "people",
      "TechCrunch reported on 11 February 2026, from the all-hands meeting video xAI published on X, that Toby Pohlen would lead the Macrohard project under xAI's new organisational structure.",
      {"kind": "snapshot", "date": "2026-02-11", "note": "Date of the report and of xAI's publication of the meeting video; not a start date."},
      "The record rests on reporting of a published meeting video, which was not itself machine-checked. It does not establish a start date; Pohlen's departure later that month is an existing record.",
      [evid("pohlen-xai-macrohard-lead-2026", "lg2-src-tc-xai-allhands-2026", "Paragraph 5", "quote",
            "Toby Pohlen, who will lead the project under the new organizational structure"),
       evid("pohlen-xai-macrohard-lead-2026-team", "lg2-src-tc-xai-allhands-2026", "Paragraph 5", "quote",
            "finally a team focused on the Macrohard project", support="context")],
      attrs={"role": "lead, Macrohard project", "stage": "announced"},
      related=["lg-mx-pohlen-xai-departure-2026"])

claim("nicolls-xai-president-2026", "michael-nicolls", "held_role", "xai", "people",
      "36Kr reported on 22 May 2026, describing an xAI organisation chart published by Bloomberg, that former Starlink executive Michael Nicolls had taken over as president of xAI in April 2026.",
      {"kind": "interval", "from": "2026-04", "note": "Start month as reported; no end is stated and none is implied."},
      "The record rests on reporting at two removes: 36Kr republishes a 新智元 article describing a Bloomberg report. No announcement by xAI, SpaceX or Nicolls was retrieved. It does not establish a continuing role.",
      [evid("nicolls-xai-president-2026", "lg2-src-36kr-xai-org-2026", "Opening list of executives", "quote",
            "Michael Nicolls，前Starlink高管，2026年4月接任xAI总裁")],
      attrs={"role": "president (总裁)"})

claim("ruddarraju-xai-infrastructure-prior", "uday-ruddarraju", "held_role", "xai", "people",
      "DatacenterDynamics reported on 20 July 2026 that Uday Ruddarraju was the head of infrastructure at xAI until 2025.",
      {"kind": "interval", "until": "2025", "note": "End year as reported ('until last year' in a 2026 report); start not stated."},
      "The record rests on retrospective reporting; no announcement by xAI or Ruddarraju was retrieved. It does not establish the start of the role.",
      [evid("ruddarraju-xai-infrastructure-prior", "lg2-src-dcd-ruddarraju-2026", "Paragraph 2", "quote",
            "Ruddarraju was the head of infrastructure at xAI until last year")],
      attrs={"role": "head of infrastructure"})

claim("ruddarraju-openai-compute-2025", "uday-ruddarraju", "held_role", "openai", "people",
      "DatacenterDynamics reported on 20 July 2026 that Uday Ruddarraju had joined OpenAI in July 2025 as head of compute and infrastructure.",
      {"kind": "interval", "from": "2025-07", "note": "Start month as reported ('last July' in a July 2026 report); the report records a later change of title, so no end of this title is inferred or extended."},
      "The record rests on retrospective reporting. Its later appointment as CTO of Compute (July 2026) is not recorded here.",
      [evid("ruddarraju-openai-compute-2025", "lg2-src-dcd-ruddarraju-2026", "Paragraph 3", "quote",
            "Ruddarraju joined OpenAI last July as head of compute and infrastructure")],
      attrs={"role": "head of compute and infrastructure"})

# ---- Apple ----
claim("giannandrea-apple-advisor-2025", "john-giannandrea", "held_role", "apple", "people",
      "Apple announced on 1 December 2025 that John Giannandrea would serve as an advisor to the company before retiring in the spring of 2026.",
      {"kind": "snapshot", "date": "2025-12-01", "note": "Announcement date; not a start date."},
      "A prospective role as announced; the record does not establish its start, end or the retirement as realised.",
      [evid("giannandrea-apple-advisor-2025", "lg2-src-apple-giannandrea-2025", "Paragraph 1", "quote",
            "John Giannandrea, Apple’s senior vice president for Machine Learning and AI Strategy, is stepping down from his position and will serve as an advisor to the company before retiring in the spring of 2026.")],
      attrs={"role": "advisor to the company", "stage": "announced"},
      related=["lg-gw-giannandrea-apple-departure-2025"], relatedCandidate="pp-er-giannandrea-apple-svp-2025")

claim("ke-yang-apple-departure-2025", "ke-yang", "departure_announced", "apple", "people",
      "AppleInsider reported on 15 October 2025, relaying Bloomberg, that Ke Yang, head of Apple's Answers, Knowledge, and Information team, would leave for Meta.",
      {"kind": "event", "date": "2025-10-15", "note": "Date of the report; the departure was reported as prospective."},
      "The record rests on reporting that relays Bloomberg; no statement by Apple or Yang was retrieved. It does not establish a last working day or his role at Meta.",
      [evid("ke-yang-apple-departure-2025", "lg2-src-appleinsider-keyang-2025", "Paragraph 2", "quote",
            "the next departure is Ke Yang, who headed the Answers, Knowledge, and Information team"),
       evid("ke-yang-apple-departure-2025-meta", "lg2-src-appleinsider-keyang-2025", "Standfirst", "quote",
            "Ke Yang, will leave for Meta")],
      attrs={"role": "head of the Answers, Knowledge, and Information team", "stage": "announced"})

draft = {
    "group": "xa",
    "searched": "",
    "existingUsed": [],
    "entities": entities, "sources": sources, "events": events, "claims": claims,
    "omitted": [], "retrievalFailures": [],
}
meta = json.load(open(sys.argv[2]))
draft["searched"] = meta["searched"]
draft["existingUsed"] = meta["existingUsed"]
draft["omitted"] = meta["omitted"]
draft["retrievalFailures"] = meta["retrievalFailures"]
json.dump(draft, open(OUT, "w"), ensure_ascii=False, indent=2)
open(OUT, "a").write("\n")
print(len(claims), "claims")
