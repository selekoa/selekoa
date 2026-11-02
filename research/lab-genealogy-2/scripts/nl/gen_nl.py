import json

CHK = "2026-10-29"
import os
OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "..", "drafts", "nl.json")

sources = []
def src(id, key, title, authors, publisher, date, kind, url, route, cls, **kw):
    s = dict(id=id, cacheKey=key, title=title, authors=authors, publisher=publisher,
             publicationDate=date, kind=kind, url=url, route=route, language="en",
             sourceClass=cls)
    s.update(kw)
    sources.append(s)

src("lg2-src-ssi-updates", "nl-ssi-updates", "Safe Superintelligence Inc. — Updates", ["Safe Superintelligence Inc."], "Safe Superintelligence Inc.", None, "announcement", "https://ssi.inc/updates", "direct", "primary",
    note="Mutable multi-date updates page; the records cite its entry dated September 4th, 2024. The dataset already holds this page as source-ssi-leadership-2025, scoped to the 3 July 2025 message; the coordinator decides whether to merge, and the quotation count then covers both.")
src("lg2-src-ssi-nvidia-2026", "nl-ssi-nvidia-2026", "Ilya Sutskever’s Safe Superintelligence Inc. and NVIDIA Announce Long-Term Strategic Partnership", ["Safe Superintelligence Inc.", "NVIDIA"], "GlobeNewswire (joint release of SSI and NVIDIA)", "2026-07-27", "announcement", "https://www.globenewswire.com/news-release/2026/07/27/3333561/0/en/ilya-sutskever-s-safe-superintelligence-inc-and-nvidia-announce-long-term-strategic-partnership.html", "relay", "primary",
    note="Linked from SSI’s updates page.")
src("lg2-src-tml-nvidia-2026", "nl-tml-nvidia-2026", "Thinking Machines Lab and NVIDIA Announce Long-Term Gigawatt-Scale Strategic Partnership", ["Thinking Machines Lab"], "Thinking Machines Lab", "2026-03-10", "announcement", "https://thinkingmachines.ai/news/nvidia-partnership/", "direct", "primary",
    datasetSourceId="lg-src-new-tml-nvidia-2026", note="Same document as the dataset source; retrieved again on 2026-10-29 (the served bytes differ from the dataset’s recorded hash; the quoted passage was matched in this retrieval).")
src("lg2-src-tc-tml-seed-2025", "nl-tc-tml-seed-2025", "Mira Murati’s Thinking Machines Lab is worth $12B in seed round", ["Maxwell Zeff"], "TechCrunch", "2025-07-15", "article", "https://techcrunch.com/?p=3028062", "direct", "reporting")
src("lg2-src-reflection-frontier-open", "nl-reflection-frontier-open", "Building Frontier Open Intelligence", ["Reflection AI"], "Reflection AI", "2025-08-09", "announcement", "https://reflection.ai/blog/building-frontier-open-intelligencence", "direct", "primary",
    note="The page displays the date August 9, 2025; TechCrunch reports the $2 billion raise on 9 October 2025. The displayed date is kept as published and the discrepancy is recorded in the claims.")
src("lg2-src-tc-reflection-2025", "nl-tc-reflection-2025", "Reflection AI raises $2B to be America’s open frontier AI lab, challenging DeepSeek", ["Rebecca Bellan"], "TechCrunch", "2025-10-09", "article", "https://techcrunch.com/2025/10/09/reflection-raises-2b-to-be-americas-open-frontier-ai-lab-challenging-deepseek/", "direct", "reporting")
src("lg2-src-periodic-intro", "nl-periodic-intro", "Introducing Periodic Labs", ["Periodic Labs"], "Periodic Labs", "2025-09-30", "announcement", "https://periodic.com/news/introducing-periodic-labs", "direct", "primary")
src("lg2-src-tc-periodic-2025", "nl-tc-periodic-2025", "Former OpenAI and DeepMind researchers raise whopping $300M seed to automate science", ["Julie Bort"], "TechCrunch", "2025-09-30", "article", "https://techcrunch.com/2025/09/30/former-openai-and-deepmind-researchers-raise-whopping-300m-seed-to-automate-science/", "direct", "reporting",
    datasetSourceId="lg-src-gw-tc-periodic-2025", note="Same document as the dataset source; retrieved again on 2026-10-29 (served bytes differ from the recorded hash; quoted passage matched in this retrieval). The dataset already quotes this source; the coordinator should recount the combined quotation.")
src("lg2-src-karpathy-eureka-x", "nl-karpathy-eureka-x", "Andrej Karpathy post on X, 16 July 2024", ["Andrej Karpathy"], "X", "2024-07-16", "post", "https://x.com/karpathy/status/1813263734707790301", "x", "primary",
    note="Long post; the syndication endpoint returns only its opening, which carries the quoted fragment.")
src("lg2-src-eureka-intro", "nl-eureka-home", "Introducing Eureka Labs", ["Eureka Labs"], "Eureka Labs", "2024-07-16", "announcement", "https://eurekalabs.ai/", "direct", "primary")
src("lg2-src-chollet-ndea-x", "nl-chollet-ndea-x", "François Chollet post on X, 15 January 2025", ["François Chollet"], "X", "2025-01-15", "post", "https://x.com/fchollet/status/1879583863368032432", "x", "primary")
src("lg2-src-ndea-about", "nl-ndea-about", "About Ndea", ["Ndea"], "Ndea", None, "announcement", "https://ndea.com/about", "direct", "primary",
    note="Undated page, retrieved on 2026-10-29.")
src("lg2-src-humansand-home", "nl-humansand-home", "humans& (home page with the introduction of 20 January 2026)", ["humans&"], "humans&", "2026-01-20", "announcement", "https://humansand.ai/", "direct", "primary",
    note="The introduction on the home page is dated January 20, 2026; the investor list may have been edited since. Team biographies naming further co-founders sit in a script block, not in the text layer, and are not quoted.")
src("lg2-src-tc-humansand-2026", "nl-tc-humansand-2026", "Humans&, a ‘human-centric’ AI startup founded by Anthropic, xAI, Google alums, raised $480M seed round", ["Rebecca Bellan"], "TechCrunch", "2026-01-20", "article", "https://techcrunch.com/2026/01/20/humans-a-human-centric-ai-startup-founded-by-anthropic-xai-google-alums-raised-480m-seed-round/", "direct", "reporting")
src("lg2-src-appliedcompute-specific", "nl-appliedcompute-specific", "It's time to get specific", ["Yash", "Rhythm", "Linden"], "Applied Compute", "2025-10-29", "announcement", "https://appliedcompute.com/company/its-time-to-get-specific", "direct", "primary",
    note="Byline gives first names only (YASH, RHYTHM, LINDEN).")
src("lg2-src-appliedcompute-fundraise", "nl-appliedcompute-fundraise", "The Advantage You Own: Applied Compute Raises $80M to Help Enterprises Advance from Generalized to Specific Intelligence", ["Yash", "Rhythm", "Linden"], "Applied Compute", "2026-04-08", "announcement", "https://appliedcompute.com/company/fundraise", "direct", "primary")
src("lg2-src-tc-appliedcompute", "nl-tc-appliedcompute", "TechCrunch list of startups founded by former OpenAI staff (entry “Rhythm Garg, Linden Li, and Yash Patil — Applied Compute”)", ["TechCrunch"], "TechCrunch", None, "article", "https://techcrunch.com/?p=2998812", "direct", "reporting",
    note="A running list updated over time; the publication date of the entry is not established. Used only for the founders’ full names.")
src("lg2-src-tc-ricursive-seriesa-2026", "nl-tc-ricursive-seriesa", "AI chip startup Ricursive hits $4B valuation 2 months after launch", ["Julie Bort"], "TechCrunch", "2026-01-26", "article", "https://techcrunch.com/2026/01/26/ai-chip-startup-ricursive-hits-4b-valuation-two-months-after-launch/", "direct", "reporting")
src("lg2-src-tc-ricursive-2026", "nl-tc-ricursive-2026", "How Ricursive Intelligence raised $335M at a $4B valuation in 4 months", ["Julie Bort"], "TechCrunch", "2026-02-16", "article", "https://techcrunch.com/2026/02/16/how-ricursive-intelligence-raised-335m-at-a-4b-valuation-in-4-months/", "direct", "reporting",
    note="Linked from Ricursive Intelligence’s home page.")

entities = [{"id": i, "existing": True} for i in [
    "ssi", "ilya-sutskever", "nvidia", "sequoia", "thinking-machines-lab", "reflection-ai", "periodic-labs", "andrej-karpathy", "openai"]]

def org(id, name, desc, sids):
    entities.append(dict(id=id, type="organisation", name=name, aliases=[], description=desc, sourceIds=sids))
def person(id, name, sort, desc, sids, aliases=None):
    entities.append(dict(id=id, type="person", name=name, sortName=sort, subtype="Institutional actor", aliases=aliases or [], description=desc, sourceIds=sids))

org("eureka-labs", "Eureka Labs", "AI and education company announced by Andrej Karpathy on 16 July 2024.", ["lg2-src-eureka-intro"])
org("ndea", "Ndea", "AI research lab announced by François Chollet and Mike Knoop in January 2025.", ["lg2-src-chollet-ndea-x", "lg2-src-ndea-about"])
org("humans-and", "humans&", "AI lab introduced on 20 January 2026 (“humans& ai, inc.” in its terms of use).", ["lg2-src-humansand-home"])
org("applied-compute", "Applied Compute", "AI company founded by three former OpenAI researchers, public from October 2025.", ["lg2-src-appliedcompute-specific"])
org("ricursive-intelligence", "Ricursive Intelligence", "AI lab for chip design founded by Anna Goldie and Azalia Mirhoseini, launched in late 2025.", ["lg2-src-tc-ricursive-seriesa-2026"])
org("andreessen-horowitz", "Andreessen Horowitz (a16z)", "Venture capital firm, named as “a16z” or “Andreessen Horowitz” in the cited funding announcements.", ["lg2-src-ssi-updates", "lg2-src-tc-tml-seed-2025"])
org("dst-global", "DST Global", "Investment firm, named as “DST Global” or “DST” in the cited funding announcements.", ["lg2-src-ssi-updates"])
org("sv-angel", "SV Angel", "Venture investment firm named in SSI’s and humans&’ funding announcements.", ["lg2-src-ssi-updates", "lg2-src-humansand-home"])
org("nfdg", "NFDG", "Investor named “NFDG” in SSI’s funding update of 4 September 2024; the source does not expand the name.", ["lg2-src-ssi-updates"])
org("accel", "Accel", "Venture capital firm named among participants in the cited funding rounds.", ["lg2-src-tc-tml-seed-2025"])
org("servicenow", "ServiceNow", "Software company named among participants in Thinking Machines Lab’s seed round.", ["lg2-src-tc-tml-seed-2025"])
org("cisco", "Cisco", "Technology company (written “CISCO” in the source) named among participants in Thinking Machines Lab’s seed round.", ["lg2-src-tc-tml-seed-2025"])
org("amd", "AMD", "Semiconductor company named among participants in Thinking Machines Lab’s seed round.", ["lg2-src-tc-tml-seed-2025"])
org("jane-street", "Jane Street", "Trading firm named among participants in Thinking Machines Lab’s seed round.", ["lg2-src-tc-tml-seed-2025"])
org("b-capital", "B Capital", "Investment firm named among Reflection AI’s investors.", ["lg2-src-reflection-frontier-open"])
org("citi", "Citi", "Financial company named among Reflection AI’s investors.", ["lg2-src-reflection-frontier-open"])
org("crv", "CRV", "Venture capital firm named among investors in Reflection AI and humans&.", ["lg2-src-reflection-frontier-open"])
org("lightspeed", "Lightspeed", "Venture capital firm (Lightspeed Venture Partners) named as “Lightspeed” in the cited funding announcements.", ["lg2-src-reflection-frontier-open", "lg2-src-tc-ricursive-seriesa-2026"])
org("kleiner-perkins", "Kleiner Perkins", "Venture capital firm; named as lead of Applied Compute’s April 2026 financing.", ["lg2-src-appliedcompute-fundraise"])
org("lux-capital", "Lux", "Venture capital firm (Lux Capital) named as “Lux” in Applied Compute’s announcements.", ["lg2-src-appliedcompute-fundraise"])
org("greenoaks", "Greenoaks", "Investment firm named in Applied Compute’s April 2026 financing and among SSI’s investors.", ["lg2-src-appliedcompute-fundraise"])
org("gv", "GV (Google Ventures)", "Venture capital firm, named as “GV (Google Ventures)” by humans&.", ["lg2-src-humansand-home"])
org("emerson-collective", "Emerson Collective", "Organisation named among humans&’ investors.", ["lg2-src-humansand-home"])
person("francois-chollet", "François Chollet", "Chollet, François", "Named by Ndea as one of its founders; announced Ndea on 15 January 2025.", ["lg2-src-ndea-about"])
person("mike-knoop", "Mike Knoop", "Knoop, Mike", "Named by Ndea as one of its founders.", ["lg2-src-ndea-about"])
person("eric-zelikman", "Eric Zelikman", "Zelikman, Eric", "Named by humans& as a co-founder; reported as a former xAI researcher.", ["lg2-src-humansand-home"])
person("georges-harik", "Georges Harik", "Harik, Georges", "Named by humans& as a co-founder who co-led its seed round; reported as Google’s seventh employee.", ["lg2-src-humansand-home"])
person("andi-peng", "Andi Peng", "Peng, Andi", "Reported as a founder of humans& and a former Anthropic researcher.", ["lg2-src-tc-humansand-2026"])
person("yuchen-he", "Yuchen He", "He, Yuchen", "Reported as a founder of humans& and a former xAI researcher.", ["lg2-src-tc-humansand-2026"])
person("noah-goodman", "Noah Goodman", "Goodman, Noah", "Reported as a founder of humans&; a Stanford professor of psychology and computer science.", ["lg2-src-tc-humansand-2026"], ["Noah D. Goodman"])
person("yash-patil", "Yash Patil", "Patil, Yash", "Co-founder of Applied Compute and former OpenAI researcher (company text gives “Yash”; full name from reporting).", ["lg2-src-appliedcompute-specific", "lg2-src-tc-appliedcompute"])
person("rhythm-garg", "Rhythm Garg", "Garg, Rhythm", "Co-founder of Applied Compute and former OpenAI researcher (company text gives “Rhythm”; full name from reporting).", ["lg2-src-appliedcompute-specific", "lg2-src-tc-appliedcompute"])
person("linden-li", "Linden Li", "Li, Linden", "Co-founder of Applied Compute and former OpenAI researcher (company text gives “Linden”; full name from reporting).", ["lg2-src-appliedcompute-specific", "lg2-src-tc-appliedcompute"])
person("anna-goldie", "Anna Goldie", "Goldie, Anna", "Reported as co-founder and CEO of Ricursive Intelligence; former Google researcher.", ["lg2-src-tc-ricursive-seriesa-2026"])
person("azalia-mirhoseini", "Azalia Mirhoseini", "Mirhoseini, Azalia", "Reported as co-founder and CTO of Ricursive Intelligence; former Google researcher.", ["lg2-src-tc-ricursive-seriesa-2026"])

events = [
    dict(id="ev-2024-07-eureka-labs", date="2024-07-16", title="Andrej Karpathy announces Eureka Labs", labs=["eureka-labs"]),
    dict(id="ev-2024-09-ssi-round", date="2024-09-04", title="SSI announces it has raised $1B", labs=["ssi"]),
    dict(id="ev-2025-01-ndea", date="2025-01-15", title="François Chollet and Mike Knoop announce Ndea", labs=["ndea"]),
    dict(id="ev-2025-07-tml-seed", date="2025-07-15", title="Thinking Machines Lab’s $2 billion seed round reported closed", labs=["thinking-machines-lab"]),
    dict(id="ev-2025-09-periodic-launch", date="2025-09-30", title="Periodic Labs introduced, with a reported $300 million seed round", labs=["periodic-labs"]),
    dict(id="ev-2025-10-reflection-round", date="2025-10-09", title="Reflection AI announces it has raised $2 billion", labs=["reflection-ai"]),
    dict(id="ev-2025-10-applied-compute", date="2025-10-29", title="Applied Compute introduces itself and its founders", labs=["applied-compute"]),
    dict(id="ev-2026-01-humansand", date="2026-01-20", title="humans& introduced with a seed round", labs=["humans-and"]),
    dict(id="ev-2026-01-ricursive-series-a", date="2026-01-26", title="Ricursive Intelligence’s $300 million Series A reported", labs=["ricursive-intelligence"]),
    dict(id="ev-2026-03-tml-nvidia", date="2026-03-10", title="Thinking Machines Lab and NVIDIA partnership with an NVIDIA investment", labs=["thinking-machines-lab"]),
    dict(id="ev-2026-04-applied-compute-round", date="2026-04-08", title="Applied Compute announces $80M in new financing", labs=["applied-compute"]),
    dict(id="ev-2026-07-ssi-nvidia", date="2026-07-27", title="SSI and NVIDIA partnership with an NVIDIA investment", labs=["ssi"]),
]

claims = []
def ev(slug, sid, role, loc, ptype, passage, anchor=None, support="supports"):
    e = dict(id=f"lg2-ev-nl-{slug}", sourceId=sid, sourceRole=role, support=support, locator=loc, passageType=ptype, passage=passage, checkedAt=CHK)
    if anchor: e["anchor"] = anchor
    return e
def claim(slug, subject, pred, obj, topic, statement, time, qual, evidence, attributes=None, event=None, related=None, **kw):
    c = dict(id=f"lg2-nl-{slug}")
    if event: c["event"] = event
    c.update(subject=subject, predicate=pred, object=obj, topic=topic, statement=statement, time=time)
    if attributes: c["attributes"] = attributes
    c.update(derivation="explicit", resolution="supported", qualification=qual, relatedExisting=related or [], evidence=evidence)
    c.update(kw)
    claims.append(c)
def ent(i): return {"kind": "entity", "entityId": i}
def usd(v): return {"kind": "literal", "value": v, "unit": "USD"}
def fund_attrs(v, stage, period, bound="exact"):
    return dict(transactionType="funding_round", transactionStage=stage, relationshipContext="external",
                amount=dict(value=v, currency="USD", bound=bound, scope="round_total"), period=period)
def part_attrs(stage, period, role=None):
    a = dict(transactionType="funding_round", transactionStage=stage, relationshipContext="external", period=period)
    if role: a["role"] = role
    return a

# ---------------------------------------------------------------- SSI
claim("ssi-founding-stated-2024", "ssi", "founding_stated", {"kind": "literal", "value": "2024"}, "institutions",
      "The joint SSI–NVIDIA release of 27 July 2026 states that Safe Superintelligence Inc. was founded in 2024.",
      dict(kind="event", date="2024", note="Year as stated in a 2026 company description; the release gives no day or month."),
      "A company’s own description of its founding year; it does not establish a legal incorporation date.",
      [ev("ssi-founding-stated-2024", "lg2-src-ssi-nvidia-2026", "primary", "“About SSI” paragraph", "quote", "Founded in 2024, the company is led by Ilya Sutskever and Daniel Levy.")],
      related=["lg-new-sutskever-ssi-launch-2024"], event="ev-2026-07-ssi-nvidia")
claim("sutskever-ssi-cofounder-primary", "ilya-sutskever", "co_founded", ent("ssi"), "people",
      "The joint SSI–NVIDIA release of 27 July 2026 identifies Ilya Sutskever as cofounder and CEO of SSI.",
      dict(kind="unknown", note="Retrospective credit in a 27 July 2026 release; it gives no founding date for the person (the release dates SSI’s founding to 2024)."),
      "A company description of its own co-founder; it does not establish the full founder roster.",
      [ev("sutskever-ssi-cofounder-primary", "lg2-src-ssi-nvidia-2026", "primary", "Paragraph 4 (quotation attribution)", "quote", "said Ilya Sutskever, cofounder and CEO of SSI.")],
      related=["ilya-sutskever-ssi-cofounder-2024"], event="ev-2026-07-ssi-nvidia",
      duplicateCheck="The dataset holds Sutskever’s SSI co-founding only from Reuters reporting (ilya-sutskever-ssi-cofounder-2024); this record cites the company’s own release.")
claim("ssi-round-2024-09", "ssi", "announced_funding", usd(1000000000), "capital",
      "SSI’s updates page records on 4 September 2024 that SSI had raised $1B from NFDG, a16z, Sequoia, DST Global and SV Angel.",
      dict(kind="event", date="2024-09-04", note="Date of the update entry; not a closing date."),
      "A company announcement of an amount raised; it does not establish the round’s name, closing, instruments or the split between investors.",
      [ev("ssi-round-2024-09", "lg2-src-ssi-updates", "primary", "Entry dated “September 4th, 2024”", "paraphrase",
          "SSI states in its update of 4 September 2024 that it has raised $1B from five named investors.",
          anchor="We've raised $1B from NFDG, a16z, Sequoia, DST Global, and SV Angel")],
      attributes=fund_attrs(1000000000, "announced", "Not named (update of 4 September 2024)"), event="ev-2024-09-ssi-round")
for inv, name in [("nfdg", "NFDG"), ("andreessen-horowitz", "a16z"), ("sequoia", "Sequoia"), ("dst-global", "DST Global"), ("sv-angel", "SV Angel")]:
    claim(f"ssi-round-2024-09-{inv}", inv, "participated_in_round", ent("ssi"), "capital",
          f"SSI’s update of 4 September 2024 names {name} among the investors from whom it had raised $1B.",
          dict(kind="event", date="2024-09-04", note="Date of the update entry; not a closing date."),
          "Names the investor as a participant only; the source gives no individual amount, and the round total is not attributed to this investor.",
          [ev(f"ssi-round-2024-09-{inv}", "lg2-src-ssi-updates", "primary", "Entry dated “September 4th, 2024”", "paraphrase",
              f"SSI lists {name} among five investors in the funds it announced on 4 September 2024.",
              anchor="We've raised $1B from NFDG, a16z, Sequoia, DST Global, and SV Angel")],
          attributes=part_attrs("announced", "Funds announced on 4 September 2024 (round not named)"), event="ev-2024-09-ssi-round")
claim("nvidia-ssi-investment-2026", "nvidia", "investment_announced", ent("ssi"), "capital",
      "SSI and NVIDIA announced on 27 July 2026 that NVIDIA had made an investment in SSI.",
      dict(kind="event", date="2026-07-27", note="Announcement date of the joint release."),
      "An announced investment without a stated amount or instrument; it does not establish the terms. The release’s compute partnership is a separate matter not recorded here.",
      [ev("nvidia-ssi-investment-2026", "lg2-src-ssi-nvidia-2026", "primary", "Paragraph 1", "quote", "NVIDIA has additionally made an investment in SSI.")],
      attributes=dict(transactionType="investment", transactionStage="announced", relationshipContext="external"), event="ev-2026-07-ssi-nvidia")

# ---------------------------------------------------------------- Thinking Machines Lab
TML_SEED_T = dict(kind="event", date="2025-07-14", note="TechCrunch’s report of Tuesday 15 July 2025 says the round closed “on Monday”, that is 14 July 2025; the date rests on that report.")
claim("tml-seed-2025", "thinking-machines-lab", "announced_funding", usd(2000000000), "capital",
      "TechCrunch reported on 15 July 2025, relaying a company spokesperson, that Thinking Machines Lab had officially closed a $2 billion seed round led by Andreessen Horowitz.",
      TML_SEED_T,
      "The record rests on reporting (TechCrunch, relaying a company spokesperson); Mira Murati’s X post of 15 July 2025 on the round could be retrieved only in truncated form. It does not establish instruments or the split between investors.",
      [ev("tml-seed-2025", "lg2-src-tc-tml-seed-2025", "secondary", "Paragraph 1", "quote", "officially closed a $2 billion seed round led by Andreessen Horowitz on Monday")],
      attributes=fund_attrs(2000000000, "closed", "seed round"), event="ev-2025-07-tml-seed")
claim("tml-seed-2025-andreessen-horowitz", "andreessen-horowitz", "participated_in_round", ent("thinking-machines-lab"), "capital",
      "TechCrunch reported on 15 July 2025 that Andreessen Horowitz led Thinking Machines Lab’s seed round.",
      TML_SEED_T,
      "The record rests on reporting (TechCrunch, relaying a company spokesperson). No individual amount is stated; the round total is not attributed to this investor.",
      [ev("tml-seed-2025-andreessen-horowitz", "lg2-src-tc-tml-seed-2025", "secondary", "Paragraph 1", "quote", "officially closed a $2 billion seed round led by Andreessen Horowitz on Monday")],
      attributes=part_attrs("closed", "seed round", "lead investor"), event="ev-2025-07-tml-seed")
for inv, name in [("nvidia", "Nvidia"), ("accel", "Accel"), ("servicenow", "ServiceNow"), ("cisco", "Cisco"), ("amd", "AMD"), ("jane-street", "Jane Street")]:
    claim(f"tml-seed-2025-{inv}", inv, "participated_in_round", ent("thinking-machines-lab"), "capital",
          f"TechCrunch reported on 15 July 2025 that Thinking Machines Lab’s seed round included participation from {name}.",
          TML_SEED_T,
          "The record rests on reporting (TechCrunch, relaying a company spokesperson). No individual amount is stated; the round total is not attributed to this investor.",
          [ev(f"tml-seed-2025-{inv}", "lg2-src-tc-tml-seed-2025", "secondary", "Paragraph 2", "quote", "includes participation from Nvidia, Accel, ServiceNow, CISCO, AMD, and Jane Street")],
          attributes=part_attrs("closed", "seed round"), event="ev-2025-07-tml-seed")
claim("nvidia-tml-investment-2026", "nvidia", "investment_announced", ent("thinking-machines-lab"), "capital",
      "Thinking Machines Lab announced on 10 March 2026 that NVIDIA had made a significant investment in the company.",
      dict(kind="event", date="2026-03-10", note="Announcement date."),
      "An announced investment without a stated amount or instrument; the partnership itself is not recorded here.",
      [ev("nvidia-tml-investment-2026", "lg2-src-tml-nvidia-2026", "primary", "Paragraph 2", "paraphrase",
          "The announcement states that NVIDIA has also made a significant investment in Thinking Machines Lab.",
          anchor="NVIDIA has also made a significant investment in Thinking Machines Lab")],
      attributes=dict(transactionType="investment", transactionStage="announced", relationshipContext="external"), event="ev-2026-03-tml-nvidia",
      related=["lg-new-murati-tml-ceo-2026"])

# ---------------------------------------------------------------- Reflection AI
claim("reflection-founding-stated-2024", "reflection-ai", "founding_stated", {"kind": "literal", "value": "2024 (launched March 2024)"}, "institutions",
      "TechCrunch reported on 9 October 2025 that Reflection AI was founded the previous year and launched in March 2024 by Misha Laskin and Ioannis Antonoglou.",
      dict(kind="event", date="2024-03", note="Month of launch as reported; the report also says the company was founded “last year” (2024)."),
      "The record rests on reporting (TechCrunch); no company text giving the founding date was retrieved. It does not establish a legal incorporation date.",
      [ev("reflection-founding-stated-2024", "lg2-src-tc-reflection-2025", "secondary", "Paragraph 1", "quote", "a startup founded just last year by two former Google DeepMind researchers"),
       ev("reflection-founding-stated-2024-b", "lg2-src-tc-reflection-2025", "secondary", "Paragraph 3", "quote", "The startup was launched in March 2024 by Misha Laskin")],
      related=["lg-gw-laskin-cofounded-reflection", "lg-gw-antonoglou-cofounded-reflection"], event="ev-2025-10-reflection-round")
REF_T = dict(kind="event", date="2025-10-09", note="Date of TechCrunch’s report of the raise. Reflection’s own post displays the date August 9, 2025; the discrepancy is unresolved. Not a closing date.")
REF_Q = "Reflection’s post states the amount; the date rests on TechCrunch, because the post’s displayed date (August 9, 2025) conflicts with the October 2025 reporting. The record does not establish round name, closing or instruments."
claim("reflection-round-2025", "reflection-ai", "announced_funding", usd(2000000000), "capital",
      "Reflection AI announced that it had raised $2 billion; TechCrunch reported the raise on 9 October 2025.",
      REF_T, REF_Q,
      [ev("reflection-round-2025", "lg2-src-reflection-frontier-open", "primary", "Opening paragraphs", "quote", "We've assembled an extraordinary AI team, built a frontier LLM training stack, and raised $2 billion."),
       ev("reflection-round-2025-b", "lg2-src-tc-reflection-2025", "secondary", "Byline and paragraph 1", "paraphrase", "TechCrunch reports on 9 October 2025 that Reflection AI has raised $2 billion.", anchor="has raised $2 billion")],
      attributes=fund_attrs(2000000000, "announced", "Not named (TechCrunch: “latest round”)"), event="ev-2025-10-reflection-round")
for inv, name, tcname in [("b-capital", "B Capital", "B Capital"), ("citi", "Citi", "Citi"), ("crv", "CRV", "CRV"), ("dst-global", "DST", "DST"), ("lightspeed", "Lightspeed", "Lightspeed"), ("nvidia", "NVIDIA", "Nvidia"), ("sequoia", "Sequoia", "Sequoia")]:
    claim(f"reflection-round-2025-{inv}", inv, "participated_in_round", ent("reflection-ai"), "capital",
          f"Reflection AI names {name} among its investors in the post announcing its $2 billion raise, and TechCrunch reported on 9 October 2025 that {tcname} was an investor in the latest round.",
          REF_T,
          "The company names its investors without tying each to the round; the round link rests on TechCrunch. No individual amount is stated; the round total is not attributed to this investor." + (" The sources write “DST”; the identification with DST Global is the pack’s." if inv == "dst-global" else ""),
          [ev(f"reflection-round-2025-{inv}", "lg2-src-reflection-frontier-open", "primary", "“Join Us” section", "quote", "We are thankful for the support of our investors including B Capital, Citi, CRV, Disruptive, DST, Eric Schmidt, Zoom Ventures, Lightspeed, NVIDIA, Sequoia, 1789 and others."),
           ev(f"reflection-round-2025-{inv}-b", "lg2-src-tc-reflection-2025", "secondary", "Final paragraph", "quote", "Investors in Reflection AI’s latest round include Nvidia, Disruptive, DST, 1789, B Capital, Lightspeed, GIC, Eric Yuan, Eric Schmidt, Citi, Sequoia, CRV, and others.")],
          attributes=part_attrs("announced", "Latest round as of October 2025 (TechCrunch)"), event="ev-2025-10-reflection-round")

# ---------------------------------------------------------------- Periodic Labs
PER_T = dict(kind="event", date="2025-09-30", note="Date of the company’s introduction and of TechCrunch’s report; not a closing date.")
claim("periodic-seed-2025", "periodic-labs", "announced_funding", usd(300000000), "capital",
      "TechCrunch reported on 30 September 2025 that Periodic Labs came out of stealth with $300 million as a seed round.",
      PER_T,
      "The record rests on reporting (TechCrunch); Periodic Labs’ own introduction names backers but no amount. It does not establish closing, instruments or the split between investors.",
      [ev("periodic-seed-2025", "lg2-src-tc-periodic-2025", "secondary", "Paragraph 1", "quote", "a war chest of $300 million as a seed round, backed by a tech industry who’s who: Andreessen Horowitz, DST, Nvidia, Accel")],
      attributes=fund_attrs(300000000, "announced", "seed round"), event="ev-2025-09-periodic-launch")
for inv, name in [("andreessen-horowitz", "a16z (Andreessen Horowitz)"), ("dst-global", "DST"), ("nvidia", "NVIDIA (through NVentures, NVIDIA’s venture capital arm)"), ("accel", "Accel")]:
    claim(f"periodic-seed-2025-{inv}", inv, "participated_in_round", ent("periodic-labs"), "capital",
          f"Periodic Labs’ introduction of 30 September 2025 names {name} among its backers, and TechCrunch reported the same day that the investor backed its $300 million seed round.",
          PER_T,
          "The company names its backers without naming the round; the round link rests on TechCrunch. No individual amount is stated; the round total is not attributed to this investor." +
          (" The sources write “DST”; the identification with DST Global is the pack’s." if inv == "dst-global" else "") +
          (" The company names NVentures, TechCrunch names Nvidia; the record uses NVIDIA as the investor and keeps the company’s wording in the role." if inv == "nvidia" else ""),
          [ev(f"periodic-seed-2025-{inv}", "lg2-src-periodic-intro", "primary", "“Our backers” section", "quote", "We’re fortunate to be backed by investors who share our vision, including a16z, as well as Felicis, DST, NVentures (NVIDIA’s venture capital arm), Accel"),
           ev(f"periodic-seed-2025-{inv}-b", "lg2-src-tc-periodic-2025", "secondary", "Paragraph 1", "quote", "a war chest of $300 million as a seed round, backed by a tech industry who’s who: Andreessen Horowitz, DST, Nvidia, Accel")],
          attributes=part_attrs("announced", "seed round", "NVentures (NVIDIA’s venture capital arm)" if inv == "nvidia" else None), event="ev-2025-09-periodic-launch",
          related=["lg-gw-fedus-cofounded-periodic-labs"])

# ---------------------------------------------------------------- Eureka Labs
claim("karpathy-eureka-launch-2024", "andrej-karpathy", "launched", ent("eureka-labs"), "people",
      "Andrej Karpathy announced on X on 16 July 2024 that he was starting an AI and education company called Eureka Labs.",
      dict(kind="event", date="2024-07-16", note="Date of the post and of Eureka Labs’ introduction page."),
      "A public launch announcement; it does not establish incorporation, a founder roster or Karpathy’s title.",
      [ev("karpathy-eureka-launch-2024", "lg2-src-karpathy-eureka-x", "primary", "Post, first sentence", "paraphrase",
          "Karpathy writes that he is starting an AI+Education company called Eureka Labs.", anchor="starting an AI+Education company"),
       ev("karpathy-eureka-launch-2024-b", "lg2-src-eureka-intro", "primary", "“Introducing Eureka Labs”, dated July 16, 2024, first paragraph", "quote", "We are Eureka Labs and we are building a new kind of school that is AI native.")],
      related=["lg-oai-karpathy-departure-2024"], event="ev-2024-07-eureka-labs")

# ---------------------------------------------------------------- Ndea
claim("chollet-ndea-launch-2025", "francois-chollet", "launched", ent("ndea"), "people",
      "François Chollet announced on X on 15 January 2025 that he was joining forces with Mike Knoop to start Ndea, a new AI lab.",
      dict(kind="event", date="2025-01-15", note="Date of the post (UTC)."),
      "A public launch announcement; it does not establish incorporation or titles.",
      [ev("chollet-ndea-launch-2025", "lg2-src-chollet-ndea-x", "primary", "Post, first sentence", "paraphrase",
          "Chollet writes that he is joining forces with @mikeknoop to start Ndea, a new AI lab.", anchor="to start Ndea")],
      event="ev-2025-01-ndea")
claim("chollet-ndea-founder", "francois-chollet", "co_founded", ent("ndea"), "people",
      "Ndea’s About page lists François Chollet under “Founders”.",
      dict(kind="unknown", note="Undated page retrieved on 2026-10-29; the launch was announced on 15 January 2025 (separate record)."),
      "A company description of its founders; it gives no founding date.",
      [ev("chollet-ndea-founder", "lg2-src-ndea-about", "primary", "“Founders” heading, first entry", "paraphrase", "The About page lists François Chollet first under the heading Founders.", anchor="Founders François Chollet")],
      event="ev-2025-01-ndea")
claim("knoop-ndea-founder", "mike-knoop", "co_founded", ent("ndea"), "people",
      "Ndea’s About page lists Mike Knoop under “Founders”, and François Chollet’s post of 15 January 2025 names him as Chollet’s partner in starting Ndea.",
      dict(kind="unknown", note="Undated page retrieved on 2026-10-29; the launch post is dated 15 January 2025."),
      "A company description of its founders; it gives no founding date for the person.",
      [ev("knoop-ndea-founder", "lg2-src-ndea-about", "primary", "“Founders” heading, second entry", "paraphrase", "The About page lists Mike Knoop second under the heading Founders.", anchor="Mike Knoop"),
       ev("knoop-ndea-founder-b", "lg2-src-chollet-ndea-x", "primary", "Post, first sentence", "paraphrase", "Chollet writes that he is joining forces with @mikeknoop to start Ndea.", anchor="to start Ndea")],
      event="ev-2025-01-ndea")

# ---------------------------------------------------------------- humans&
HUM_FOUNDER_Q = "The record rests on reporting (TechCrunch, relaying The New York Times and the company); the report says the founders “include” the people named, so it does not establish a complete roster or a founding date."
for pid, name, passage, loc in [
    ("andi-peng", "Andi Peng", "Humans&’s founders include Andi Peng, a former Anthropic researcher", "Paragraph 3"),
    ("yuchen-he", "Yuchen He", "Eric Zelikman and Yuchen He, two former xAI researchers", "Paragraph 3"),
    ("noah-goodman", "Noah Goodman", "and Noah Goodman, a Stanford professor of psychology and computer science", "Paragraph 3")]:
    extra = ""
    if pid == "noah-goodman":
        extra = " Some other reports describe Goodman as an adviser; not resolved here."
    claim(f"{pid}-humansand-founder", pid, "co_founded", ent("humans-and"), "people",
          f"TechCrunch reported on 20 January 2026 that the founders of humans& include {name}.",
          dict(kind="unknown", note="Description in a 20 January 2026 report; no founding date for the person is given."),
          HUM_FOUNDER_Q + extra,
          [ev(f"{pid}-humansand-founder", "lg2-src-tc-humansand-2026", "secondary", loc, "quote", passage)]
          + ([ev(f"{pid}-humansand-founder-b", "lg2-src-tc-humansand-2026", "secondary", loc, "quote", "Humans&’s founders include Andi Peng, a former Anthropic researcher")] if pid != "andi-peng" else []),
          event="ev-2026-01-humansand")
claim("zelikman-humansand-cofounder", "eric-zelikman", "co_founded", ent("humans-and"), "people",
      "humans& names Eric Zelikman as a co-founder in the investor list of its introduction dated 20 January 2026.",
      dict(kind="unknown", note="Credit on a page dated 20 January 2026; no founding date for the person is given."),
      "A company description; it does not establish a founding date or the complete roster.",
      [ev("zelikman-humansand-cofounder", "lg2-src-humansand-home", "primary", "Investor paragraph, list of individuals", "quote", "Eric Zelikman (co-founder)"),
       ev("zelikman-humansand-cofounder-b", "lg2-src-tc-humansand-2026", "secondary", "Paragraph 3", "quote", "Eric Zelikman and Yuchen He, two former xAI researchers")],
      event="ev-2026-01-humansand")
claim("harik-humansand-cofounder", "georges-harik", "co_founded", ent("humans-and"), "people",
      "humans& names Georges Harik as a co-founder in its introduction dated 20 January 2026.",
      dict(kind="unknown", note="Credit on a page dated 20 January 2026; no founding date for the person is given."),
      "A company description; it does not establish a founding date or the complete roster.",
      [ev("harik-humansand-cofounder", "lg2-src-humansand-home", "primary", "Investor paragraph, first sentence", "quote", "our seed round is led by SV Angel & co-founder Georges Harik"),
       ev("harik-humansand-cofounder-b", "lg2-src-tc-humansand-2026", "secondary", "Paragraph 3", "quote", "Georges Harik, Google’s seventh employee")],
      event="ev-2026-01-humansand")
HUM_T = dict(kind="event", date="2026-01-20", note="Date of the company’s introduction and of TechCrunch’s report; not a closing date.")
claim("humansand-seed-2026", "humans-and", "announced_funding", usd(480000000), "capital",
      "TechCrunch reported on 20 January 2026, relaying The New York Times, that humans& had raised $480 million in seed funding.",
      HUM_T,
      "The record rests on reporting (TechCrunch relaying The New York Times); the company’s introduction names the seed round’s leads and investors but no amount. It does not establish closing or the split between investors.",
      [ev("humansand-seed-2026", "lg2-src-tc-humansand-2026", "secondary", "Paragraph 1", "paraphrase", "TechCrunch reports, citing The New York Times, that humans& has raised $480 million in seed funding.", anchor="has raised $480 million in seed funding"),
       ev("humansand-seed-2026-b", "lg2-src-humansand-home", "primary", "Investor paragraph, first sentence", "quote", "our seed round is led by SV Angel & co-founder Georges Harik", support="context")],
      attributes=fund_attrs(480000000, "announced", "seed round"), event="ev-2026-01-humansand")
claim("humansand-seed-2026-sv-angel", "sv-angel", "participated_in_round", ent("humans-and"), "capital",
      "humans& stated in its introduction of 20 January 2026 that its seed round was led by SV Angel and co-founder Georges Harik.",
      HUM_T,
      "A company statement of who led the round; no individual amount is stated and the round total is not attributed to this investor. Georges Harik’s co-lead is not recorded as a separate participation (the predicate takes organisations).",
      [ev("humansand-seed-2026-sv-angel", "lg2-src-humansand-home", "primary", "Investor paragraph, first sentence", "quote", "our seed round is led by SV Angel & co-founder Georges Harik"),
       ev("humansand-seed-2026-sv-angel-b", "lg2-src-tc-humansand-2026", "secondary", "Paragraph 1", "quote", "Investors in the round include chipmaker Nvidia, Amazon founder Jeff Bezos, and VC firms SV Angel, GV, and Laurene Powell Jobs’ firm Emerson Collective.")],
      attributes=part_attrs("announced", "seed round", "lead investor (with co-founder Georges Harik)"), event="ev-2026-01-humansand")
for inv, name in [("nvidia", "NVIDIA"), ("gv", "GV (Google Ventures)"), ("emerson-collective", "Emerson Collective")]:
    claim(f"humansand-seed-2026-{inv}", inv, "participated_in_round", ent("humans-and"), "capital",
          f"humans& names {name} among its investors in its introduction of 20 January 2026, and TechCrunch reported the same day that the investor took part in the seed round.",
          HUM_T,
          "The company lists investors after naming the seed round’s leads; the round link is explicit in TechCrunch. No individual amount is stated; the round total is not attributed to this investor.",
          [ev(f"humansand-seed-2026-{inv}", "lg2-src-humansand-home", "primary", "Investor paragraph, second sentence", "quote", "Our investors include NVIDIA & Jeff Bezos & GV (Google Ventures) & Emerson Collective"),
           ev(f"humansand-seed-2026-{inv}-b", "lg2-src-tc-humansand-2026", "secondary", "Paragraph 1", "quote", "Investors in the round include chipmaker Nvidia, Amazon founder Jeff Bezos, and VC firms SV Angel, GV, and Laurene Powell Jobs’ firm Emerson Collective.")],
          attributes=part_attrs("announced", "seed round"), event="ev-2026-01-humansand")

# ---------------------------------------------------------------- Applied Compute
AC_ANCHOR = "Our founders all worked on different parts of this problem while they were researchers at OpenAI"
AC_TC = "Three ex-OpenAI staffers (Rhythm Garg, Linden Li, and Yash Patil) have reportedly raised $20 million for a startup called Applied Compute"
for pid, first, full, frag, work in [
    ("yash-patil", "Yash", "Yash Patil", "Yash as a key member", "a key member of the agentic software engineer effort (Codex)"),
    ("rhythm-garg", "Rhythm", "Rhythm Garg", "Rhythm as a core contributor", "a core contributor to the first RL-trained reasoning model (o1)"),
    ("linden-li", "Linden", "Linden Li", "Linden as a core contributor on ML systems", "a core contributor on ML systems and infrastructure for RL training")]:
    claim(f"{pid}-applied-compute-founder", pid, "co_founded", ent("applied-compute"), "people",
          f"Applied Compute’s post of 29 October 2025 names “{first}” among its founders; TechCrunch gives the full name {full}.",
          dict(kind="unknown", note="Credit in a 29 October 2025 post; no founding date is given."),
          "The company text gives first names only; the full name rests on TechCrunch reporting, which names the three founders. No founding date or title is established.",
          [ev(f"{pid}-applied-compute-founder", "lg2-src-appliedcompute-specific", "primary", "Paragraph beginning “Our team has high density”", "paraphrase",
              f"The post states that the founders all worked on the problem as researchers at OpenAI and names {first} among them.", anchor=AC_ANCHOR),
           ev(f"{pid}-applied-compute-founder-b", "lg2-src-appliedcompute-specific", "primary", "Same paragraph", "paraphrase",
              f"The post names {first} as one of the founders and describes the OpenAI work.", anchor=frag),
           ev(f"{pid}-applied-compute-founder-c", "lg2-src-tc-appliedcompute", "secondary", "Entry “Rhythm Garg, Linden Li, and Yash Patil — Applied Compute”", "quote", AC_TC)],
          event="ev-2025-10-applied-compute")
    claim(f"{pid}-openai-researcher-prior", pid, "held_role", ent("openai"), "people",
          f"Applied Compute’s post of 29 October 2025 states that its founder {first} ({full}) was a researcher at OpenAI, as {work}.",
          dict(kind="unknown", note="Prior role stated retrospectively in a 29 October 2025 post; no dates are given."),
          "A company statement of a founder’s earlier role; it gives no start or end date, and the full name rests on TechCrunch reporting.",
          [ev(f"{pid}-openai-researcher-prior", "lg2-src-appliedcompute-specific", "primary", "Paragraph beginning “Our team has high density”", "paraphrase",
              "The post states that the founders were researchers at OpenAI.", anchor=AC_ANCHOR),
           ev(f"{pid}-openai-researcher-prior-b", "lg2-src-appliedcompute-specific", "primary", "Same paragraph", "paraphrase",
              f"The post describes {first}’s OpenAI work as {work}.", anchor=frag)],
          attributes=dict(role=f"Researcher ({work})"), event="ev-2025-10-applied-compute")
AC_T = dict(kind="event", date="2026-04-08", note="Date of the announcement; not a closing date.")
claim("applied-compute-round-2026-04", "applied-compute", "announced_funding", usd(80000000), "capital",
      "Applied Compute announced on 8 April 2026 $80 million in new financing led by Kleiner Perkins.",
      AC_T,
      "A company announcement; it does not establish the round name, closing or the split between investors. The company states that its total funding is $160 million; the earlier $80 million it described in October 2025 is not recorded as a round.",
      [ev("applied-compute-round-2026-04", "lg2-src-appliedcompute-fundraise", "primary", "Paragraph beginning “Today”", "paraphrase", "Applied Compute states that it is announcing $80 million in new financing.", anchor="we’re announcing $80 million in new financing")],
      attributes=fund_attrs(80000000, "announced", "new financing (April 2026; round not named)"), event="ev-2026-04-applied-compute-round")
AC_PART = "led by Kleiner Perkins with continued participation from Elad Gil, Lux, Greenoaks, Neo, Hanabi"
claim("applied-compute-round-2026-04-kleiner-perkins", "kleiner-perkins", "participated_in_round", ent("applied-compute"), "capital",
      "Applied Compute announced on 8 April 2026 that its $80 million financing was led by Kleiner Perkins.",
      AC_T, "A company statement of the lead; no individual amount is stated and the round total is not attributed to this investor.",
      [ev("applied-compute-round-2026-04-kleiner-perkins", "lg2-src-appliedcompute-fundraise", "primary", "Paragraph beginning “Today”", "paraphrase", "The financing is led by Kleiner Perkins, with continued participation from named investors.", anchor=AC_PART)],
      attributes=part_attrs("announced", "new financing (April 2026)", "lead investor"), event="ev-2026-04-applied-compute-round")
for inv, name in [("lux-capital", "Lux"), ("greenoaks", "Greenoaks")]:
    claim(f"applied-compute-round-2026-04-{inv}", inv, "participated_in_round", ent("applied-compute"), "capital",
          f"Applied Compute announced on 8 April 2026 continued participation from {name} in its $80 million financing.",
          AC_T, "A company statement of participation; no individual amount is stated and the round total is not attributed to this investor.",
          [ev(f"applied-compute-round-2026-04-{inv}", "lg2-src-appliedcompute-fundraise", "primary", "Paragraph beginning “Today”", "paraphrase", f"The announcement lists {name} among investors with continued participation.", anchor=AC_PART)],
          attributes=part_attrs("announced", "new financing (April 2026)"), event="ev-2026-04-applied-compute-round")

# ---------------------------------------------------------------- Ricursive Intelligence
RIC_FOUND = "Ricursive was founded by former Google researchers CEO Anna Goldie and CTO Azalia Mirhoseini."
for pid, name, title in [("anna-goldie", "Anna Goldie", "CEO"), ("azalia-mirhoseini", "Azalia Mirhoseini", "CTO")]:
    claim(f"{pid}-ricursive-founder", pid, "co_founded", ent("ricursive-intelligence"), "people",
          f"TechCrunch reported on 26 January 2026 that Ricursive Intelligence was founded by Anna Goldie and Azalia Mirhoseini. This record is {name}’s co-founding.",
          dict(kind="unknown", note="Description in a 26 January 2026 report; the report says the company formally launched about two months earlier, without a date."),
          "The record rests on reporting (TechCrunch); the company’s home page names no founders. No founding date is established.",
          [ev(f"{pid}-ricursive-founder", "lg2-src-tc-ricursive-seriesa-2026", "secondary", "Paragraph 2", "quote", RIC_FOUND),
           ev(f"{pid}-ricursive-founder-b", "lg2-src-tc-ricursive-2026", "secondary", "Paragraph 1", "quote", "Anna Goldie, CEO, and Azalia Mirhoseini, CTO")],
          event="ev-2026-01-ricursive-series-a")
    claim(f"{pid}-ricursive-{title.lower()}-2026", pid, "held_role", ent("ricursive-intelligence"), "people",
          f"TechCrunch reported on 26 January 2026 that {name} was {title} of Ricursive Intelligence.",
          dict(kind="snapshot", date="2026-01-26", note="Date of the report; not a start date."),
          "The record rests on reporting (TechCrunch); it does not establish a start date or a continuing role.",
          [ev(f"{pid}-ricursive-{title.lower()}-2026", "lg2-src-tc-ricursive-seriesa-2026", "secondary", "Paragraph 2", "quote", RIC_FOUND)],
          attributes=dict(role=title), event="ev-2026-01-ricursive-series-a")
RIC_T = dict(kind="event", date="2026-01-26", note="Date of TechCrunch’s report, which says the company announced the round that Monday (26 January 2026); not a closing date.")
claim("ricursive-series-a-2026", "ricursive-intelligence", "announced_funding", usd(300000000), "capital",
      "TechCrunch reported on 26 January 2026 that Ricursive Intelligence had raised $300 million, in a round the company said was led by Lightspeed; a TechCrunch report of 16 February 2026 calls it a Series A.",
      RIC_T,
      "The record rests on reporting (TechCrunch); no company announcement of the round was retrieved (the company’s home page links reports of it). It does not establish closing or the split between investors.",
      [ev("ricursive-series-a-2026", "lg2-src-tc-ricursive-2026", "secondary", "Paragraph 3", "paraphrase", "TechCrunch reports that Ricursive announced a $300 million Series A round led by Lightspeed in January 2026.", anchor="a $300 million Series A round at a $4 billion valuation led by Lightspeed"),
       ev("ricursive-series-a-2026-b", "lg2-src-tc-ricursive-seriesa-2026", "secondary", "Paragraph 1", "quote", "The company said Monday the round was led by Lightspeed.")],
      attributes=fund_attrs(300000000, "announced", "Series A"), event="ev-2026-01-ricursive-series-a")
claim("ricursive-series-a-2026-lightspeed", "lightspeed", "participated_in_round", ent("ricursive-intelligence"), "capital",
      "TechCrunch reported on 26 January 2026 that Ricursive Intelligence said its round was led by Lightspeed.",
      RIC_T,
      "The record rests on reporting (TechCrunch, relaying the company). No individual amount is stated; the round total is not attributed to this investor.",
      [ev("ricursive-series-a-2026-lightspeed", "lg2-src-tc-ricursive-seriesa-2026", "secondary", "Paragraph 1", "quote", "The company said Monday the round was led by Lightspeed.")],
      attributes=part_attrs("announced", "Series A", "lead investor"), event="ev-2026-01-ricursive-series-a")
RIC_SEED_T = dict(kind="unknown", note="TechCrunch places the seed round about two months before January 2026 and at the company’s formal launch; no date is given.")
claim("ricursive-seed", "ricursive-intelligence", "announced_funding", usd(35000000), "capital",
      "TechCrunch reported on 16 February 2026 that Ricursive Intelligence had earlier raised a $35 million seed round led by Sequoia.",
      RIC_SEED_T,
      "The record rests on reporting (TechCrunch); no company announcement of the seed round was retrieved, and its date is not established.",
      [ev("ricursive-seed", "lg2-src-tc-ricursive-2026", "secondary", "Paragraph 3", "quote", "a $35 million seed round led by Sequoia")],
      attributes=fund_attrs(35000000, "announced", "seed round"))
claim("ricursive-seed-sequoia", "sequoia", "participated_in_round", ent("ricursive-intelligence"), "capital",
      "TechCrunch reported in January and February 2026 that Sequoia led Ricursive Intelligence’s seed round.",
      RIC_SEED_T,
      "The record rests on reporting (TechCrunch). No individual amount is stated; the round total is not attributed to this investor.",
      [ev("ricursive-seed-sequoia", "lg2-src-tc-ricursive-2026", "secondary", "Paragraph 3", "quote", "a $35 million seed round led by Sequoia"),
       ev("ricursive-seed-sequoia-b", "lg2-src-tc-ricursive-seriesa-2026", "secondary", "Paragraph 2", "quote", "The Series A comes just two months since the company formally launched with a seed investment led by Sequoia.")],
      attributes=part_attrs("announced", "seed round", "lead investor"))

draft = dict(
    group="nl",
    searched=("Searched (web search for discovery only; never quoted) and retrieved with tools.mjs on 2026-10-29: ssi.inc (home, updates) and the SSI–NVIDIA GlobeNewswire release linked from it; thinkingmachines.ai (home, news, NVIDIA partnership); Mira Murati’s X post of 15 July 2025 on the seed round (syndication returned only the first 280 characters; relay refused); TechCrunch on the TML seed; reflection.ai (home, about, newsroom, blog, “Building Frontier Open Intelligence”) and TechCrunch of 9 October 2025; periodic.com (home, news, “Introducing Periodic Labs”) and TechCrunch of 30 September 2025; Karpathy’s X post of 16 July 2024 and eurekalabs.ai; karpathy.ai (no Eureka Labs mention); ndea.com (home, about) and Chollet’s X post of 15 January 2025; humansand.ai (direct and relay) and TechCrunch of 20 January 2026; appliedcompute.com (home, blog, two company posts) and a TechCrunch list entry for full names; ricursive.com, its newsletter page (empty shell) and two TechCrunch reports. Existing records were checked in existing-claims.txt for every person and organisation; most SSI, TML, Reflection and Periodic founders and roles are already in the dataset and are not redrafted."),
    existingUsed=["ilya-sutskever-ssi-cofounder-2024", "daniel-levy-ssi-cofounder-2024", "daniel-gross-ssi-cofounder-2024", "sutskever-ssi-ceo-2025", "levy-ssi-president-2025", "gross-ssi-departure-announced-2025", "lg-new-sutskever-ssi-launch-2024",
                  "lg-new-murati-tml-launch-2025", "lg-new-murati-tml-cofounder", "lg-new-zoph-tml-cofounder", "lg-new-metz-tml-cofounder", "lg-new-tulloch-tml-cofounder", "schulman-thinking-machines-cofounder", "lg-gw-weng-cofounded-thinking-machines", "lg-new-zoph-tml-cto-2025", "lg-new-murati-tml-ceo-2026", "lg-new-chintala-tml-cto-2026",
                  "lg-gw-laskin-cofounded-reflection", "lg-gw-antonoglou-cofounded-reflection", "lg-gw-laskin-reflection-ceo-2025",
                  "lg-gw-fedus-cofounded-periodic-labs", "lg-gw-cubuk-cofounded-periodic-labs",
                  "lg-oai-karpathy-departure-2024", "karpathy-openai-return-2023-2024"],
    entities=entities, sources=sources, events=events, claims=claims,
    omitted=[
        dict(item="Periodic Labs’ further founding-team members (21 others listed by the company, e.g. Dzmitry Bahdanau, Costa Huang, Rishabh Agarwal)", reason="The company lists a 23-person “founding team” without founder titles; recording each would build a staff directory. Cubuk and Fedus are already in the dataset as founders."),
        dict(item="Periodic Labs: Felicis as a seed participant; individual backers (Jeff Bezos, Elad Gil, Eric Schmidt, Jeff Dean)", reason="Felicis is named only by the company, without a round; participated_in_round takes organisations, so individuals are left out."),
        dict(item="Reflection AI: Disruptive, 1789, Zoom Ventures, GIC; individuals Eric Schmidt and Eric Yuan", reason="Identity of “Disruptive” and “1789” not established from the sources; Zoom Ventures and GIC appear in only one of the two sources (company vs TechCrunch); individuals are not organisations."),
        dict(item="Reflection AI’s 2026 funding round (newsroom links a report that the CEO confirmed its close)", reason="Only an external report was linked; amount not stated in retrieved company text; not pursued within this pass."),
        dict(item="Thinking Machines Lab: founding team as listed by the company in February 2025; Mira Murati’s 15 July 2025 post text on the seed round", reason="The current site no longer lists the team and the Internet Archive is unreachable; the X post is retrievable only in truncated form. Funding rests on TechCrunch instead."),
        dict(item="SSI: Daniel Levy as co-leader in the 2026 release; Ilya Sutskever as CEO on 27 July 2026", reason="Already recorded as President and CEO from SSI’s July 2025 update; a later snapshot adds little."),
        dict(item="SSI investors Greenoaks (named in the 2026 release’s investor list)", reason="Not tied to a round in the source."),
        dict(item="humans&: further investors (Forerunner, S32, DCVC, Human Capital, Liquid 2, Felicis, CRV and others); individuals including Jeff Bezos and Georges Harik as co-lead", reason="Not named in TechCrunch’s round report; organisation-only predicate; kept to investors corroborated or named as lead."),
        dict(item="humans&: Eric Zelikman as CEO; Yuchen He and Noah D. Goodman as co-founders from the company’s own biographies", reason="These appear only in a script data block of the page, not in the retrieved text layer, so they cannot be machine-checked."),
        dict(item="humans&: Andi Peng’s reported departure (July 2026)", reason="Only a low-profile outlet was found; no primary statement retrieved."),
        dict(item="Applied Compute: $80m described in October 2025 (Benchmark, Sequoia, Lux, Hanabi, Neo, Definition and individuals)", reason="Stated as cumulative funding, not as a round; predicate requires a round total."),
        dict(item="Applied Compute April 2026 participants Neo and Hanabi; Elad Gil", reason="Identity of “Neo” and “Hanabi” not established from the source; Elad Gil is an individual."),
        dict(item="Ricursive Intelligence: Google Brain and Anthropic priors of the founders; other investors (DST Global, NVentures, Felicis Ventures, 49 Palms Ventures, Radical Ventures)", reason="Priors appear only in a reported anecdote without roles or dates; other investors are named without a round."),
        dict(item="François Chollet’s departure from Google (November 2024); Mike Knoop’s Zapier roles", reason="Not stated in Ndea’s founding text; Zapier is not a frontier lab."),
        dict(item="Eureka Labs founding date, Karpathy title", reason="The launch post and page give a launch date only; recorded as launched."),
        dict(item="Poolside, Magic, Imbue, Microsoft AI, Mistral, Inflection, Latent Labs, Adaption Labs, acqui-hire deals", reason="Assigned to other passes."),
        dict(item="Unconventional AI (Naveen Rao, $475M seed, December 2025)", reason="Founder came from Databricks, not a frontier lab as defined in scope."),
    ],
    retrievalFailures=[
        dict(url="https://x.com/miramurati/status/1945166365834535247", what="Mira Murati’s post of 15 July 2025 on the seed round (full text)", result="Syndication endpoint returns only the first 280 characters of a long post; r.jina.ai relay HTTP 401 (blocked)"),
        dict(url="https://ssi.inc/", what="SSI launch statement of 19 June 2024 with its signatories", result="The current page is a revised, undated text without signatures; the June 2024 version needs an archive copy"),
        dict(url="https://thinkingmachines.ai/", what="Founding team list of February 2025", result="Current page no longer lists the team; archive copy needed"),
        dict(url="https://ricursive-news.beehiiv.com/", what="Ricursive Intelligence news", result="Empty shell (14 words)"),
    ],
)
json.dump(draft, open(OUT, "w"), ensure_ascii=False, indent=2)
print(len(claims), "claims", len(sources), "sources", len(entities), "entities")
