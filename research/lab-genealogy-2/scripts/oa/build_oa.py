import json

import os
OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '..', 'drafts', 'oa.json')

def person(id, name, sort, desc, srcs, aliases=None):
    return {"id": id, "type": "person", "name": name, "sortName": sort,
            "subtype": "Institutional actor", "aliases": aliases or [],
            "description": desc, "sourceIds": srcs}

def src(id, key, title, authors, publisher, date, kind, url, route, cls, lang="en", dsid=None):
    s = {"id": id, "cacheKey": key, "title": title, "authors": authors,
         "publisher": publisher, "publicationDate": date, "kind": kind,
         "url": url, "route": route, "language": lang, "sourceClass": cls}
    if dsid:
        s["datasetSourceId"] = dsid
    return s

def ev(id, sid, locator, passage, anchor=None, role="primary", support="supports"):
    e = {"id": id, "sourceId": sid, "sourceRole": role, "support": support,
         "locator": locator}
    if anchor:
        e["passageType"] = "paraphrase"
        e["passage"] = passage
        e["anchor"] = anchor
    else:
        e["passageType"] = "quote"
        e["passage"] = passage
    return e

def claim(id, event, subj, pred, obj, statement, time, attrs, qual, evidence,
          related=None, reason=None, dup=None):
    c = {"id": id, "event": event, "subject": subj, "predicate": pred,
         "object": {"kind": "entity", "entityId": obj}, "topic": "people",
         "statement": statement, "time": time, "attributes": attrs,
         "derivation": "explicit", "resolution": "supported",
         "qualification": qual, "relatedExisting": related or [],
         "evidence": evidence}
    if reason:
        c["statedReason"] = reason
    if dup:
        c["duplicateCheck"] = dup
    return c

def snap(date, note):
    return {"kind": "snapshot", "date": date, "note": note}

def event_t(date, note):
    return {"kind": "event", "date": date, "note": note}

ANN = "Announcement date; not a start date."

sources = [
    src("lg2-src-brockman-sabbatical-x-2024", "oa-brockman-sabbatical-x", "Greg Brockman post on X, 6 August 2024 (UTC)", ["Greg Brockman"], "X", "2024-08-06", "post", "https://x.com/gdb/status/1820644694264791459", "x", "primary"),
    src("lg2-src-brockman-return-x-2024", "oa-brockman-return-x", "Greg Brockman post on X, 12 November 2024", ["Greg Brockman"], "X", "2024-11-12", "post", "https://x.com/gdb/status/1856441156281753908", "x", "primary"),
    src("lg2-src-80k-karnofsky-2025", "oa-karnofsky-80k", "#226 – Holden Karnofsky on dozens of opportunities to make AI safer lying on the table — and all his AGI takes", ["Robert Wiblin", "Holden Karnofsky"], "80,000 Hours", "2025-10-30", "article", "https://80000hours.org/podcast/episodes/holden-karnofsky-concrete-ai-safety-frontier-ai-companies/", "direct", "primary"),
    src("lg2-src-brooks-x-2024", "oa-brooks-gdm-x", "Tim Brooks post on X, 3 October 2024", ["Tim Brooks"], "X", "2024-10-03", "post", "https://x.com/_tim_brooks/status/1841982327431561528", "x", "primary"),
    src("lg2-src-carlini-career-2025", "oa-carlini-anthropic", "Career Update: Google DeepMind -> Anthropic", ["Nicholas Carlini"], "nicholas.carlini.com", "2025-03-05", "post", "https://nicholas.carlini.com/writing/2025/career-update.html", "direct", "primary"),
    src("lg2-src-jumper-x-2026", "oa-jumper-x", "John Jumper post on X, 19 June 2026", ["John Jumper"], "X", "2026-06-19", "post", "https://x.com/JohnJumperSci/status/2068001285173834106", "x", "primary"),
    src("lg2-src-schwarzer-x-2026", "oa-schwarzer-x", "Max Schwarzer post on X, 3 March 2026", ["Max Schwarzer"], "X", "2026-03-03", "post", "https://x.com/max_a_schwarzer/status/2028939154944585989", "x", "primary"),
    src("lg2-src-e4m-schwarzer-2026", "oa-schwarzer-e4m", "OpenAI’s VP of Research Max Schwarzer joins Anthropic", ["e4m Desk"], "exchange4media", "2026-03-05", "article", "https://www.exchange4media.com/people-movement-news/openais-vp-of-research-max-schwarzer-joins-anthropic-152582.html", "relay", "reporting"),
    src("lg2-src-karpathy-anthropic-x-2026", "oa-karpathy-anthropic-x", "Andrej Karpathy post on X, 19 May 2026", ["Andrej Karpathy"], "X", "2026-05-19", "post", "https://x.com/karpathy/status/2056753169888334312", "x", "primary"),
    src("lg2-src-trendforce-tworek-2026", "oa-tworek-trendforce", "OpenAI Loses Key Reasoning Leader Jerry Tworek: 7-Year VP Departs, Citing Research Limitations", ["TrendForce News"], "TrendForce", "2026-01-07", "article", "https://www.trendforce.com/news/2026/01/07/news-openai-loses-key-reasoning-leader-jerry-tworek-7-year-vp-departs-citing-research-limitations/", "direct", "reporting"),
    src("lg2-src-tworek-x-2026", "oa-tworek-x", "Jerry Tworek post on X, 5 January 2026", ["Jerry Tworek"], "X", "2026-01-05", "post", "https://x.com/MillionInt/status/2008237251751534622", "x", "primary"),
    src("lg2-src-decoder-vallone-2026", "oa-vallone-decoder", "OpenAI safety researcher joins Anthropic's alignment team", ["Maximilian Schreiner"], "The Decoder", "2026-01-16", "article", "https://the-decoder.com/openai-safety-researcher-joins-anthropics-alignment-team/", "direct", "reporting"),
    src("lg2-src-simo-return-x-2026", "oa-simo-return-x", "Fidji Simo post on X, 15 January 2026 (UTC)", ["Fidji Simo"], "X", "2026-01-15", "post", "https://x.com/fidjissimo/status/2011592010881446116", "x", "primary", dsid="lg-src-new-simo-x-2026"),
    src("lg2-src-ball-x-2026", "oa-strategic-futures-x", "Dean W. Ball post on X, 18 June 2026", ["Dean W. Ball"], "X", "2026-06-18", "post", "https://x.com/deanwball/status/2067634693441233118", "x", "primary"),
    src("lg2-src-heise-zurich-2024", "oa-zurich-heise", "OpenAI opens office in Switzerland – including new employees", ["Eva-Maria Weiß"], "heise online", "2024-12-04", "article", "https://www.heise.de/en/news/OpenAI-opens-office-in-Switzerland-including-new-employees-10187690.html", "direct", "reporting"),
    src("lg2-src-beyer-x-2025", "oa-beyer-meta-x", "Lucas Beyer post on X, 26 June 2025", ["Lucas Beyer"], "X", "2025-06-26", "post", "https://x.com/giffmana/status/1938299990922674352", "x", "primary"),
    src("lg2-src-maginative-bubeck-2024", "oa-bubeck-maginative", "Microsoft AI Heavyweight Sebastien Bubeck Joins OpenAI", ["Chris McKay"], "Maginative", "2024-10-14", "article", "https://www.maginative.com/article/microsoft-ai-heavyweight-sebastien-bubeck-joins-openai/", "direct", "reporting"),
    src("lg2-src-steinberger-blog-2026", "oa-steinberger-blog", "OpenClaw, OpenAI and the future", ["Peter Steinberger"], "steipete.me", "2026-02-14", "post", "https://steipete.me/posts/2026/openclaw", "direct", "primary"),
    src("lg2-src-sama-steinberger-x-2026", "oa-sama-steinberger-x", "Sam Altman post on X, 15 February 2026", ["Sam Altman"], "X", "2026-02-15", "post", "https://x.com/sama/status/2023150230905159801", "x", "primary"),
    src("lg2-src-qbitai-radford-2024", "oa-radford-qbitai", "突发！GPT论文一作Alec Radford离职，前两代GPT作者全部离开OpenAI", ["克雷西"], "量子位 (QbitAI)", "2024-12-20", "article", "https://www.qbitai.com/2024/12/235312.html", "direct", "reporting", lang="zh"),
    src("lg2-src-tnw-metz-2026", "oa-metz-meta-tnw", "Meta hired Luke Metz seven months after OpenAI hired him back", [], "The Next Web", "2026-08-25", "article", "https://thenextweb.com/news/luke-metz-meta-superintelligence-labs-openai", "direct", "reporting"),
    src("lg2-src-anthropic-emea-2025", "oa-anthropic-emea-2025", "Anthropic appoints Guillaume Princen as Head of EMEA and announces 100+ new roles across the region", ["Anthropic"], "Anthropic", "2025-04-08", "announcement", "https://www.anthropic.com/news/head-of-EMEA-new-roles", "direct", "primary"),
    src("lg2-src-brockman-katti-x-2025", "oa-katti-join-x", "Greg Brockman post on X, 10 November 2025", ["Greg Brockman"], "X", "2025-11-10", "post", "https://x.com/gdb/status/1987996461846659372", "x", "primary"),
    src("lg2-src-tomshw-katti-2025", "oa-katti-tomshw", "Intel's CTO and AI chief leaves for OpenAI after just seven months in role", [], "Tom's Hardware", "2025-11-10", "article", "https://www.tomshardware.com/tech-industry/intels-cto-and-ai-chief-leaves-for-openai-after-just-seven-months-in-role-follows-another-ai-data-center-exec-out-the-door-lip-bu-tan-to-take-up-the-slack", "direct", "reporting"),
    src("lg2-src-cryptobriefing-katti-2026", "oa-katti-cryptobriefing", "OpenAI infrastructure chief Sachin Katti to leave role in November", ["Diego Almada Lopez"], "Crypto Briefing", "2026-10-14", "article", "https://cryptobriefing.com/openai-sachin-katti-infrastructure-advisor/", "direct", "reporting"),
    src("lg2-src-e4m-ruddarraju-2026", "oa-ruddarraju-e4m", "Uday Ruddarraju elevated as Open AI CTO of Compute", ["e4m Desk"], "exchange4media", "2026-07-18", "article", "https://www.exchange4media.com/people-movement-news/uday-ruddarraju-elevated-as-open-ai-cto-of-compute-156451.html", "relay", "reporting"),
    src("lg2-src-qz-kilpatrick-2024", "oa-kilpatrick-qz", "Google just hired a former OpenAI executive to boost its AI efforts", [], "Quartz", "2024-04-03", "article", "https://qz.com/google-hires-ex-open-ai-leader-gemini-1851385096", "relay", "reporting"),
    src("lg2-src-cfodive-liberatore-2025", "oa-liberatore-cfodive", "OpenAI nabs former xAI CFO as business finance leader", ["Grace Noto"], "CFO Dive", "2025-09-16", "article", "https://www.cfodive.com/news/openai-nabs-former-xai-cfo-business-finance-leader/760299/", "direct", "reporting"),
]

entities = [{"id": i, "existing": True} for i in [
    "openai", "anthropic", "google-deepmind", "google", "microsoft", "xai", "meta",
    "meta-superintelligence-labs", "greg-brockman", "holden-karnofsky", "john-jumper",
    "andrej-karpathy", "luke-metz", "sam-altman", "fidji-simo", "jan-leike", "mark-chen"]]
entities += [
    person("tim-brooks", "Tim Brooks", "Brooks, Tim", "Researcher who announced in October 2024 that he would join Google DeepMind to work on video generation and world simulators after two years at OpenAI working on Sora.", ["lg2-src-brooks-x-2024"]),
    person("nicholas-carlini", "Nicholas Carlini", "Carlini, Nicholas", "Machine-learning security researcher who announced in March 2025 that he was leaving Google DeepMind to join Anthropic.", ["lg2-src-carlini-career-2025"]),
    person("max-schwarzer", "Max Schwarzer", "Schwarzer, Max", "Researcher who announced in March 2026 that he was leaving OpenAI, where he was reported as a Vice President of Research; reported as joining Anthropic.", ["lg2-src-schwarzer-x-2026", "lg2-src-e4m-schwarzer-2026"]),
    person("jerry-tworek", "Jerry Tworek", "Tworek, Jerry", "Reported as an OpenAI Vice President of Research who announced his departure in January 2026.", ["lg2-src-trendforce-tworek-2026"]),
    person("andrea-vallone", "Andrea Vallone", "Vallone, Andrea", "Safety researcher reported in January 2026 as having moved from OpenAI, where she founded the Model Policy research team, to Anthropic’s alignment team.", ["lg2-src-decoder-vallone-2026"]),
    person("sam-schoenholz", "Sam Schoenholz", "Schoenholz, Sam", "Researcher whom Fidji Simo welcomed back to OpenAI in January 2026, alongside Barret Zoph and Luke Metz.", ["lg2-src-simo-return-x-2026"]),
    person("dean-ball", "Dean W. Ball", "Ball, Dean W.", "Policy writer who announced in June 2026 that he would join OpenAI to lead a new team called Strategic Futures.", ["lg2-src-ball-x-2026"], aliases=["Dean Ball"]),
    person("lucas-beyer", "Lucas Beyer", "Beyer, Lucas", "Researcher reported in December 2024 as joining OpenAI’s new Zurich office from Google DeepMind; announced in June 2025 that he would join Meta.", ["lg2-src-heise-zurich-2024", "lg2-src-beyer-x-2025"]),
    person("alexander-kolesnikov", "Alexander Kolesnikov", "Kolesnikov, Alexander", "Researcher reported in December 2024 as joining OpenAI’s new Zurich office from Google DeepMind.", ["lg2-src-heise-zurich-2024"]),
    person("xiaohua-zhai", "Xiaohua Zhai", "Zhai, Xiaohua", "Researcher reported in December 2024 as joining OpenAI’s new Zurich office from Google DeepMind.", ["lg2-src-heise-zurich-2024"], aliases=["翟晓华"]),
    person("sebastien-bubeck", "Sébastien Bubeck", "Bubeck, Sébastien", "Microsoft research executive reported in October 2024 as leaving Microsoft to join OpenAI.", ["lg2-src-maginative-bubeck-2024"], aliases=["Sebastien Bubeck"]),
    person("peter-steinberger", "Peter Steinberger", "Steinberger, Peter", "Developer of OpenClaw who announced in February 2026 that he was joining OpenAI.", ["lg2-src-steinberger-blog-2026", "lg2-src-sama-steinberger-x-2026"]),
    person("alec-radford", "Alec Radford", "Radford, Alec", "OpenAI researcher, first author of the first GPT paper, reported in December 2024 as leaving OpenAI.", ["lg2-src-qbitai-radford-2024"]),
    person("neil-houlsby", "Neil Houlsby", "Houlsby, Neil", "AI scientist named by Anthropic in April 2025 as leading its research-focused Zurich office.", ["lg2-src-anthropic-emea-2025"]),
    person("sachin-katti", "Sachin Katti", "Katti, Sachin", "Welcomed to OpenAI by Greg Brockman in November 2025 to work on compute infrastructure; reported in October 2026 as leaving his OpenAI role.", ["lg2-src-brockman-katti-x-2025", "lg2-src-cryptobriefing-katti-2026"]),
    person("uday-ruddarraju", "Uday Ruddarraju", "Ruddarraju, Uday", "Reported as a former head of infrastructure engineering at xAI who joined OpenAI in July 2025 and was named its CTO of Compute in July 2026.", ["lg2-src-e4m-ruddarraju-2026", "lg2-src-cryptobriefing-katti-2026"]),
    person("logan-kilpatrick", "Logan Kilpatrick", "Kilpatrick, Logan", "Reported as OpenAI’s former head of developer relations, who announced in April 2024 that he had joined Google to lead AI Studio.", ["lg2-src-qz-kilpatrick-2024"]),
    person("mike-liberatore", "Mike Liberatore", "Liberatore, Mike", "Reported as xAI’s finance chief for about four months in 2025 and appointed OpenAI’s business finance officer for AI infrastructure in September 2025.", ["lg2-src-cfodive-liberatore-2025"]),
]

events = [
    {"id": "ev-2024-08-brockman-sabbatical", "date": "2024-08-06", "title": "Greg Brockman announces a sabbatical from OpenAI through the end of 2024", "labs": ["openai"]},
    {"id": "ev-2024-11-brockman-return", "date": "2024-11-12", "title": "Greg Brockman posts that he is back at OpenAI", "labs": ["openai"]},
    {"id": "ev-2025-karnofsky-anthropic", "date": "2025-07", "title": "Holden Karnofsky describes his role at Anthropic", "labs": ["anthropic"]},
    {"id": "ev-2024-10-brooks-gdm", "date": "2024-10-03", "title": "Tim Brooks announces he will join Google DeepMind", "labs": ["openai", "google-deepmind"]},
    {"id": "ev-2025-03-carlini-anthropic", "date": "2025-03-05", "title": "Nicholas Carlini announces his move from Google DeepMind to Anthropic", "labs": ["google-deepmind", "anthropic"]},
    {"id": "ev-2026-06-jumper-anthropic", "date": "2026-06-19", "title": "John Jumper announces he will leave Google DeepMind and join Anthropic", "labs": ["google-deepmind", "anthropic"]},
    {"id": "ev-2026-03-schwarzer", "date": "2026-03-03", "title": "Max Schwarzer announces he is leaving OpenAI; reported as joining Anthropic", "labs": ["openai", "anthropic"]},
    {"id": "ev-2026-05-karpathy-anthropic", "date": "2026-05-19", "title": "Andrej Karpathy posts that he has joined Anthropic", "labs": ["anthropic"]},
    {"id": "ev-2026-01-tworek", "date": "2026-01-05", "title": "Jerry Tworek reported as announcing his departure from OpenAI", "labs": ["openai"]},
    {"id": "ev-2026-01-vallone", "date": "2026-01-16", "title": "Andrea Vallone reported as having moved from OpenAI to Anthropic", "labs": ["openai", "anthropic"]},
    {"id": "ev-2026-01-tml-returns", "date": "2026-01-15", "title": "Fidji Simo welcomes Barret Zoph, Luke Metz and Sam Schoenholz back to OpenAI", "labs": ["openai", "thinking-machines-lab"]},
    {"id": "ev-2026-06-ball-openai", "date": "2026-06-18", "title": "Dean W. Ball announces he will lead OpenAI's new Strategic Futures team", "labs": ["openai"]},
    {"id": "ev-2024-12-openai-zurich", "date": "2024-12-04", "title": "OpenAI announces a Zurich office and three researchers joining from Google DeepMind", "labs": ["openai", "google-deepmind"]},
    {"id": "ev-2025-06-beyer-meta", "date": "2025-06-26", "title": "Lucas Beyer posts that he will join Meta", "labs": ["openai", "meta"]},
    {"id": "ev-2024-10-bubeck-openai", "date": "2024-10-14", "title": "Sébastien Bubeck reported as leaving Microsoft to join OpenAI", "labs": ["microsoft", "openai"]},
    {"id": "ev-2026-02-steinberger-openai", "date": "2026-02-15", "title": "Peter Steinberger and Sam Altman announce that Steinberger is joining OpenAI", "labs": ["openai"]},
    {"id": "ev-2024-12-radford-departure", "date": "2024-12-20", "title": "Alec Radford reported as leaving OpenAI", "labs": ["openai"]},
    {"id": "ev-2026-08-metz-msl", "date": "2026-08-24", "title": "Luke Metz reported as joining Meta Superintelligence Labs from OpenAI", "labs": ["openai", "meta-superintelligence-labs"]},
    {"id": "ev-2025-04-anthropic-zurich", "date": "2025-04-08", "title": "Anthropic names Neil Houlsby as leader of its Zurich office", "labs": ["anthropic"]},
    {"id": "ev-2025-11-katti-openai", "date": "2025-11-10", "title": "Greg Brockman welcomes Sachin Katti to OpenAI", "labs": ["openai"]},
    {"id": "ev-2026-10-openai-compute-lead", "date": "2026-10-14", "title": "Sachin Katti reported as leaving his OpenAI role; Uday Ruddarraju to lead the compute organisation", "labs": ["openai"]},
    {"id": "ev-2026-07-ruddarraju-cto-compute", "date": "2026-07-18", "title": "Uday Ruddarraju reported as OpenAI's CTO of Compute", "labs": ["openai", "xai"]},
    {"id": "ev-2024-04-kilpatrick-google", "date": "2024-04-03", "title": "Logan Kilpatrick reported as having joined Google from OpenAI", "labs": ["openai", "google"]},
    {"id": "ev-2025-09-liberatore-openai", "date": "2025-09-16", "title": "Mike Liberatore reported as OpenAI business finance officer after leaving xAI", "labs": ["xai", "openai"]},
]

claims = [
    # Brockman
    claim("lg2-oa-brockman-openai-sabbatical-2024", "ev-2024-08-brockman-sabbatical", "greg-brockman", "departure_announced", "openai",
          "Greg Brockman posted on X on 6 August 2024 (UTC) that he was taking a sabbatical through the end of the year.",
          event_t("2024-08-06", "UTC date of the post (5 August in US Pacific time); an announcement date. The sabbatical's start and end dates are not stated beyond “through end of year”."),
          {"role": "Not stated in the post (President of OpenAI per the existing 2022 record)", "stage": "announced"},
          "A first-person announcement of a temporary leave, not of a departure from OpenAI; recorded with departure_announced for want of a leave predicate, and the coordinator should decide whether to keep that predicate. The post gives no role and no effective date. The personal reason given in the post is left out.",
          [ev("lg2-ev-oa-brockman-openai-sabbatical-2024", "lg2-src-brockman-sabbatical-x-2024", "Post text, first sentence", "Brockman writes that he is taking a sabbatical through the end of the year.", "taking a sabbatical")],
          related=["lg-oai-brockman-president-2022"]),
    claim("lg2-oa-brockman-openai-return-2024", "ev-2024-11-brockman-return", "greg-brockman", "held_role", "openai",
          "Greg Brockman posted on X on 12 November 2024 that his vacation was complete and that he was back to building at OpenAI.",
          snap("2024-11-12", "Date of the post; the post does not give the date of his return."),
          {"role": "not stated (returning to OpenAI after the sabbatical)"},
          "A first-person post; it does not name a title or role. Reporting at the time described a new role being discussed; that is not recorded here.",
          [ev("lg2-ev-oa-brockman-openai-return-2024", "lg2-src-brockman-return-x-2024", "Post text", "Brockman writes that the longest vacation of his life is complete and that he is back to building at OpenAI.", "vacation")],
          related=["lg-oai-brockman-president-2022"]),
    # Karnofsky
    claim("lg2-oa-karnofsky-anthropic-mts-2025", "ev-2025-karnofsky-anthropic", "holden-karnofsky", "held_role", "anthropic",
          "In an 80,000 Hours interview recorded in July 2025, Holden Karnofsky stated that his title at Anthropic was “member of technical staff” and that he reported to the chief science officer, Jared Kaplan.",
          snap("2025-07", "Interview recorded on 25 and 28 July 2025, published on 30 October 2025; the host says he joined Anthropic about six months earlier, which gives no exact start date."),
          {"role": "Member of technical staff (advising the company on preparing for risks from advanced AI; reporting to the chief science officer)"},
          "A first-person statement in a published interview. It establishes the role as described at recording time, not a start date or a continuing role. Statements about his family are not recorded.",
          [ev("lg2-ev-oa-karnofsky-anthropic-mts-2025-1", "lg2-src-80k-karnofsky-2025", "Transcript, section “What Holden now does at Anthropic” [00:28:30]", "My title is “member of technical staff” — which is almost everybody’s title, so that tells you nothing. I report to the chief science officer, Jared [Kaplan], and my job is basically to advise the company on preparing for risks from advanced AI."),
           ev("lg2-ev-oa-karnofsky-anthropic-mts-2025-2", "lg2-src-80k-karnofsky-2025", "Episode page, production notes", "This episode was recorded on July 25 and 28, 2025.", support="context")],
          related=["lg-oai-holden-karnofsky-nonprofit-board-2019"]),
    # Brooks
    claim("lg2-oa-brooks-gdm-2024", "ev-2024-10-brooks-gdm", "tim-brooks", "held_role", "google-deepmind",
          "Tim Brooks posted on X on 3 October 2024 that he would be joining Google DeepMind to work on video generation and world simulators, after two years at OpenAI working on Sora.",
          snap("2024-10-03", ANN),
          {"role": "not stated (to work on video generation and world simulators)", "stage": "announced"},
          "An announced move in a first-person post; no title or start date is given. The post refers to his two years at OpenAI in the past tense but does not announce a departure as such, so no separate departure record is drafted.",
          [ev("lg2-ev-oa-brooks-gdm-2024", "lg2-src-brooks-x-2024", "Post text", "Brooks writes that he will join Google DeepMind to work on video generation and world simulators, and refers to two years at OpenAI making Sora.", "joining @GoogleDeepMind")]),
    # Carlini
    claim("lg2-oa-carlini-gdm-departure-2025", "ev-2025-03-carlini-anthropic", "nicholas-carlini", "departure_announced", "google-deepmind",
          "Nicholas Carlini announced on 5 March 2025 that he had decided to leave Google DeepMind after seven years; he stated that he no longer believed DeepMind leadership supported the type of security and privacy research he wanted to do.",
          event_t("2025-03-05", "Date of the post; the last working day is not stated."),
          {"role": "Not stated (researcher; he joined Google Brain in 2018)", "stage": "announced"},
          "A first-person announcement; it does not name his title or a leaving date. The stated reason is his own and is attributed; the post notes that his disagreement is with DeepMind leadership, not his immediate colleagues.",
          [ev("lg2-ev-oa-carlini-gdm-departure-2025-1", "lg2-src-carlini-career-2025", "Opening paragraph", "I have decided to leave Google DeepMind after seven years, and will be joining Anthropic for a year to continue my research on adversarial machine learning."),
           ev("lg2-ev-oa-carlini-gdm-departure-2025-2", "lg2-src-carlini-career-2025", "Section “Why am I leaving?”, first paragraph", "Brain merged into DeepMind, and I no longer believe DeepMind (and DeepMind leadership", support="supports")],
          reason={"by": "nicholas-carlini", "text": "Carlini stated that he no longer believed DeepMind leadership supported the type of high-impact security and privacy research he wanted to do.", "evidenceId": "lg2-ev-oa-carlini-gdm-departure-2025-2"}),
    claim("lg2-oa-carlini-anthropic-2025", "ev-2025-03-carlini-anthropic", "nicholas-carlini", "held_role", "anthropic",
          "Nicholas Carlini announced on 5 March 2025 that he would be joining Anthropic for a year to continue his research on adversarial machine learning.",
          snap("2025-03-05", ANN),
          {"role": "not stated (research on adversarial machine learning, for a stated period of one year)", "stage": "announced"},
          "An announced move; the post names no title or start date, and the stated one-year term is a plan, not an end date.",
          [ev("lg2-ev-oa-carlini-anthropic-2025", "lg2-src-carlini-career-2025", "Opening paragraph", "will be joining Anthropic for a year to continue my research on adversarial machine learning")]),
    # Jumper
    claim("lg2-oa-jumper-gdm-departure-2026", "ev-2026-06-jumper-anthropic", "john-jumper", "departure_announced", "google-deepmind",
          "John Jumper posted on X on 19 June 2026 that, after nearly nine years, he had decided to leave Google DeepMind.",
          event_t("2026-06-19", "Date of the post; no leaving date is given."),
          {"role": "Not stated in the retrieved post text (he writes that he led the AlphaFold team)", "stage": "announced"},
          "A first-person announcement; the retrieved text (X's syndication endpoint, which truncates long posts) names no title or leaving date. The existing record lists him as a Director in October 2024.",
          [ev("lg2-ev-oa-jumper-gdm-departure-2026", "lg2-src-jumper-x-2026", "Post text, first sentence", "Jumper writes that after nearly nine years he has decided to leave Google DeepMind.", "leave Google")],
          related=["atlas-jumper-gdm"]),
    claim("lg2-oa-jumper-anthropic-2026", "ev-2026-06-jumper-anthropic", "john-jumper", "held_role", "anthropic",
          "John Jumper posted on X on 19 June 2026 that he would join Anthropic after taking some time off.",
          snap("2026-06-19", ANN),
          {"role": "not stated", "stage": "announced"},
          "An announced move; no title or start date is given in the retrieved text.",
          [ev("lg2-ev-oa-jumper-anthropic-2026", "lg2-src-jumper-x-2026", "Post text, first sentence", "Jumper writes that he will join Anthropic after taking some time to recharge.", "join Anthropic")],
          related=["atlas-jumper-gdm"]),
    # Schwarzer
    claim("lg2-oa-schwarzer-openai-departure-2026", "ev-2026-03-schwarzer", "max-schwarzer", "departure_announced", "openai",
          "Max Schwarzer posted on X on 3 March 2026 that he had decided to leave OpenAI.",
          event_t("2026-03-03", "Date of the post; no leaving date is given."),
          {"role": "Not stated in the retrieved post text (reported as Vice President of Research)", "stage": "announced"},
          "A first-person announcement; the retrieved text (X's syndication endpoint, which truncates long notes) does not name his title. The title rests on reporting (exchange4media, 5 March 2026).",
          [ev("lg2-ev-oa-schwarzer-openai-departure-2026-1", "lg2-src-schwarzer-x-2026", "Post text, first sentence", "Schwarzer writes that he has decided to leave OpenAI and lists work he took part in there, including on reasoning models.", "leave OpenAI"),
           ev("lg2-ev-oa-schwarzer-openai-departure-2026-2", "lg2-src-e4m-schwarzer-2026", "Article, first paragraph", "Max Schwarzer, Vice President of Research at OpenAI, has announced his departure from the company.", role="secondary")]),
    claim("lg2-oa-schwarzer-anthropic-2026", "ev-2026-03-schwarzer", "max-schwarzer", "held_role", "anthropic",
          "exchange4media reported on 5 March 2026, quoting Max Schwarzer's post on X, that he would join Anthropic to work on reinforcement-learning research.",
          snap("2026-03-03", "Date of the post the report quotes; not a start date."),
          {"role": "not stated in the quoted post (reported as Member of Technical Staff)", "stage": "announced"},
          "The record rests on reporting that relays the later part of Schwarzer's X post, which X's syndication endpoint did not return. The report's subheading gives the title Member of Technical Staff without a source.",
          [ev("lg2-ev-oa-schwarzer-anthropic-2026", "lg2-src-e4m-schwarzer-2026", "Article, quotation of the post", "I'm proud to be joining AnthropicAI to get back into the weeds in RL research", role="secondary")]),
    # Karpathy
    claim("lg2-oa-karpathy-anthropic-2026", "ev-2026-05-karpathy-anthropic", "andrej-karpathy", "held_role", "anthropic",
          "Andrej Karpathy posted on X on 19 May 2026 that he had joined Anthropic and would get back to R&D.",
          snap("2026-05-19", "Date of the post; the start date is not stated."),
          {"role": "not stated (to get back to R&D)"},
          "A first-person post; it names no title or team. Reporting described a pre-training research team; that is not recorded here. The post does not say what becomes of Eureka Labs beyond his plan to resume work on education in time.",
          [ev("lg2-ev-oa-karpathy-anthropic-2026", "lg2-src-karpathy-anthropic-x-2026", "Post text, first sentence", "Karpathy writes that he has joined Anthropic and wants to get back to R&D.", "I've joined Anthropic")],
          related=["lg-oai-karpathy-departure-2024"]),
    # Tworek
    claim("lg2-oa-tworek-openai-departure-2026", "ev-2026-01-tworek", "jerry-tworek", "departure_announced", "openai",
          "TrendForce reported on 7 January 2026, relaying The Verge and Jerry Tworek's post on X, that Tworek, OpenAI's Vice President of Research, had announced his departure after seven years; he stated that he wanted to pursue research that is difficult to carry out within OpenAI.",
          event_t("2026-01-05", "Date of Tworek's X post (UTC), which shares a note to his team as an image; the report is dated 7 January 2026. No leaving date is given."),
          {"role": "Vice President of Research (as reported)", "stage": "announced"},
          "The record rests on reporting: Tworek's own post carries the note only as an image, which cannot be machine-checked, and the report relays it through The Verge. The stated reason is relayed by the report and attributed to Tworek.",
          [ev("lg2-ev-oa-tworek-openai-departure-2026", "lg2-src-trendforce-tworek-2026", "Article, first paragraph", "the company’s Vice President of Research officially announced his departure after a seven-year tenure at the company, explaining that he wants to pursue research that is difficult to carry out within OpenAI", role="secondary"),
           ev("lg2-ev-oa-tworek-openai-departure-2026-x", "lg2-src-tworek-x-2026", "Post text (the note itself is an image)", "Tworek writes that he is sharing the note he gave his team that day; the note is an image and is not quoted.", "note", support="context")],
          reason={"by": "jerry-tworek", "text": "As relayed by the report, Tworek said he wanted to pursue research that is difficult to carry out within OpenAI.", "evidenceId": "lg2-ev-oa-tworek-openai-departure-2026"}),
    # Vallone
    claim("lg2-oa-vallone-anthropic-2026", "ev-2026-01-vallone", "andrea-vallone", "held_role", "anthropic",
          "The Decoder reported on 16 January 2026 that Andrea Vallone had moved from OpenAI to Anthropic, where she would work on the alignment team and report to Jan Leike.",
          snap("2026-01-16", "Date of the report; not a start date."),
          {"role": "alignment team member, reporting to Jan Leike (as reported)"},
          "The record rests on reporting; Vallone's own announcement (reported as a LinkedIn post) was not retrieved. No title or start date is given.",
          [ev("lg2-ev-oa-vallone-anthropic-2026-1", "lg2-src-decoder-vallone-2026", "Article, first paragraph", "The report states that Vallone, a senior safety researcher at OpenAI, has moved to Anthropic to work on its alignment team.", "has moved to Anthropic", role="secondary"),
           ev("lg2-ev-oa-vallone-anthropic-2026-2", "lg2-src-decoder-vallone-2026", "Article, fourth paragraph", "At Anthropic, Vallone will report to Jan Leike.", role="secondary")],
          related=["leike-anthropic-alignment-science"]),
    claim("lg2-oa-vallone-openai-model-policy-prior", "ev-2026-01-vallone", "andrea-vallone", "held_role", "openai",
          "The Decoder reported on 16 January 2026 that Andrea Vallone had spent three years at OpenAI, where she founded the Model Policy research team.",
          {"kind": "unknown", "note": "The report gives a duration of three years but no dates."},
          {"role": "founder of the Model Policy research team (as reported)"},
          "The record rests on reporting; it does not establish dates, a title or the end of her OpenAI role.",
          [ev("lg2-ev-oa-vallone-openai-model-policy-prior", "lg2-src-decoder-vallone-2026", "Article, second paragraph", "Vallone spent three years at OpenAI, where she founded the \"Model Policy\" research team", role="secondary")]),
    # Schoenholz
    claim("lg2-oa-schoenholz-openai-return-2026", "ev-2026-01-tml-returns", "sam-schoenholz", "held_role", "openai",
          "Fidji Simo posted on X on 15 January 2026 (UTC) that Sam Schoenholz was coming back to OpenAI and would report to Barret Zoph.",
          snap("2026-01-15", "Post dated 2026-01-15 00:11 UTC (14 January in US Pacific time); an announcement date, not a start date."),
          {"role": "not stated (rejoining OpenAI, reporting to Barret Zoph)", "stage": "announced"},
          "An announced return; the post gives no title or start date and does not name his previous organisation. Records for Zoph and Metz from the same post are in the dataset.",
          [ev("lg2-ev-oa-schoenholz-openai-return-2026", "lg2-src-simo-return-x-2026", "Post text", "Simo welcomes Barret Zoph, Luke Metz and Sam Schoenholz back to OpenAI and writes that Luke and Sam will report to Barret.", "Sam Schoenholz back")],
          related=["lg-new-zoph-openai-return-2026", "lg-new-metz-openai-return-2026"]),
    # Dean Ball
    claim("lg2-oa-ball-openai-strategic-futures-2026", "ev-2026-06-ball-openai", "dean-ball", "held_role", "openai",
          "Dean W. Ball posted on X on 18 June 2026 that on 6 July he would join OpenAI as leader of a new team called Strategic Futures, with a mandate to help the company's leadership shape frontier AI policy.",
          snap("2026-06-18", "Date of the post; the post gives 6 July (2026) as the joining date, a stated plan, not a confirmed start."),
          {"role": "Leader of the Strategic Futures team", "stage": "announced"},
          "An announced appointment in a first-person post; the record does not establish that the role began or continues.",
          [ev("lg2-ev-oa-ball-openai-strategic-futures-2026", "lg2-src-ball-x-2026", "Post text", "Ball writes that on 6 July he will join OpenAI to lead a new team, Strategic Futures, to help company leadership shape frontier AI policy.", "new team called Strategic Futures")]),
    # Zurich trio
    claim("lg2-oa-beyer-openai-2024", "ev-2024-12-openai-zurich", "lucas-beyer", "held_role", "openai",
          "heise online reported on 4 December 2024, on the basis of an OpenAI press release, that Lucas Beyer, previously a Staff Research Scientist at Google DeepMind, was joining OpenAI's new Zurich team.",
          snap("2024-12-04", "Date of the report; not a start date."),
          {"role": "not stated (joining the Zurich team)", "stage": "announced"},
          "The record rests on reporting of an OpenAI press release that was not retrieved; no OpenAI title or start date is given.",
          [ev("lg2-ev-oa-beyer-openai-2024-1", "lg2-src-heise-zurich-2024", "Article, second paragraph", "Lucas Beyer, Alexander Kolesnikov and Xiaohua Zhai are three leading researchers in the field of multimodal AI, according to OpenAI.", role="secondary"),
           ev("lg2-ev-oa-beyer-openai-2024-2", "lg2-src-heise-zurich-2024", "Article, third paragraph", "Beyer was previously a Staff Research Scientist at DeepMind", role="secondary")]),
    claim("lg2-oa-kolesnikov-openai-2024", "ev-2024-12-openai-zurich", "alexander-kolesnikov", "held_role", "openai",
          "heise online reported on 4 December 2024, on the basis of an OpenAI press release, that Alexander Kolesnikov, previously a Staff Research Scientist at Google DeepMind, was joining OpenAI's new Zurich team.",
          snap("2024-12-04", "Date of the report; not a start date."),
          {"role": "not stated (joining the Zurich team)", "stage": "announced"},
          "The record rests on reporting of an OpenAI press release that was not retrieved; no OpenAI title or start date is given.",
          [ev("lg2-ev-oa-kolesnikov-openai-2024", "lg2-src-heise-zurich-2024", "Article, second paragraph", "Lucas Beyer, Alexander Kolesnikov and Xiaohua Zhai are three leading researchers in the field of multimodal AI, according to OpenAI.", role="secondary"),
           ev("lg2-ev-oa-kolesnikov-openai-2024-2", "lg2-src-heise-zurich-2024", "Article, third paragraph", "Kolesnikov held the same job title", role="secondary")]),
    claim("lg2-oa-zhai-openai-2024", "ev-2024-12-openai-zurich", "xiaohua-zhai", "held_role", "openai",
          "heise online reported on 4 December 2024, on the basis of an OpenAI press release, that Xiaohua Zhai, previously a Senior Staff researcher at Google DeepMind, was joining OpenAI's new Zurich team.",
          snap("2024-12-04", "Date of the report; not a start date."),
          {"role": "not stated (joining the Zurich team)", "stage": "announced"},
          "The record rests on reporting of an OpenAI press release that was not retrieved; no OpenAI title or start date is given.",
          [ev("lg2-ev-oa-zhai-openai-2024", "lg2-src-heise-zurich-2024", "Article, third paragraph", "Zhai was Senior Staff Research at DeepMind", role="secondary"),
           ev("lg2-ev-oa-zhai-openai-2024-2", "lg2-src-heise-zurich-2024", "Article, second paragraph", "Lucas Beyer, Alexander Kolesnikov and Xiaohua Zhai are three leading researchers in the field of multimodal AI, according to OpenAI.", role="secondary")]),
    claim("lg2-oa-beyer-meta-2025", "ev-2025-06-beyer-meta", "lucas-beyer", "held_role", "meta",
          "Lucas Beyer posted on X on 26 June 2025 that “we” would be joining Meta, copying Alexander Kolesnikov and Xiaohua Zhai.",
          snap("2025-06-26", ANN),
          {"role": "not stated", "stage": "announced"},
          "An announced move; the post names no title, unit or start date and does not itself say that he left OpenAI. It copies Kolesnikov and Zhai, but no separate records are drafted for them from it. Remarks on compensation in the post are not recorded.",
          [ev("lg2-ev-oa-beyer-meta-2025", "lg2-src-beyer-x-2025", "Post text, point 1", "Beyer writes that “we” will be joining Meta, and copies Kolesnikov and Zhai.", "joining Meta")]),
    # Bubeck
    claim("lg2-oa-bubeck-microsoft-departure-2024", "ev-2024-10-bubeck-openai", "sebastien-bubeck", "departure_announced", "microsoft",
          "Maginative reported on 14 October 2024 that Sébastien Bubeck, Microsoft's VP of AI and Distinguished Scientist, was leaving Microsoft to join OpenAI; a Microsoft spokesperson stated that he had decided to leave to further his work toward developing artificial general intelligence.",
          event_t("2024-10-14", "Date of the report and of Microsoft's statement as reported; no leaving date is given."),
          {"role": "VP of AI and Distinguished Scientist (as reported)", "stage": "announced"},
          "The record rests on reporting of a Microsoft spokesperson's statement; the stated reason is Microsoft's account, attributed.",
          [ev("lg2-ev-oa-bubeck-microsoft-departure-2024", "lg2-src-maginative-bubeck-2024", "Article, first and third paragraphs", "he had \"decided to leave Microsoft to further his work toward developing\" artificial general intelligence", role="secondary"),
           ev("lg2-ev-oa-bubeck-microsoft-departure-2024-2", "lg2-src-maginative-bubeck-2024", "Article, first paragraph", "VP of AI and Distinguished Scientist", role="secondary")],
          reason={"by": "microsoft", "text": "A Microsoft spokesperson stated that Bubeck had decided to leave Microsoft to further his work toward developing artificial general intelligence.", "evidenceId": "lg2-ev-oa-bubeck-microsoft-departure-2024"}),
    claim("lg2-oa-bubeck-openai-2024", "ev-2024-10-bubeck-openai", "sebastien-bubeck", "held_role", "openai",
          "Maginative reported on 14 October 2024 that Sébastien Bubeck was leaving Microsoft to join OpenAI, in a role not yet known.",
          snap("2024-10-14", "Date of the report; not a start date."),
          {"role": "not stated (the report says the role was unclear)", "stage": "announced"},
          "The record rests on reporting; no OpenAI title or start date is given.",
          [ev("lg2-ev-oa-bubeck-openai-2024", "lg2-src-maginative-bubeck-2024", "Article, opening and third paragraphs", "unclear what specific role Bubeck will take on at OpenAI", role="secondary")]),
    # Steinberger
    claim("lg2-oa-steinberger-openai-2026", "ev-2026-02-steinberger-openai", "peter-steinberger", "held_role", "openai",
          "Peter Steinberger announced in a blog post dated 14 February 2026 that he was joining OpenAI to work on bringing agents to everyone, and Sam Altman posted on X on 15 February 2026 that Steinberger was joining OpenAI to drive the next generation of personal agents.",
          snap("2026-02-15", "Date of Altman's post; Steinberger's post is dated 14 February 2026. Not a start date."),
          {"role": "not stated (to drive the next generation of personal agents)", "stage": "announced"},
          "An announced hire; neither text names a title or start date. Steinberger writes that OpenClaw will move to a foundation; that arrangement is not recorded here.",
          [ev("lg2-ev-oa-steinberger-openai-2026-1", "lg2-src-steinberger-blog-2026", "Opening summary (tl;dr)", "I’m joining OpenAI to work on bringing agents to everyone. OpenClaw will move to a foundation and stay open and independent."),
           ev("lg2-ev-oa-steinberger-openai-2026-2", "lg2-src-sama-steinberger-x-2026", "Post text, first sentence", "Altman writes that Steinberger is joining OpenAI to drive the next generation of personal agents.", "Steinberger is joining OpenAI")]),
    # Radford
    claim("lg2-oa-radford-openai-departure-2024", "ev-2024-12-radford-departure", "alec-radford", "departure_announced", "openai",
          "QbitAI reported on 20 December 2024, relaying The Information, that Alec Radford, first author of the first GPT paper, was leaving OpenAI to pursue independent research, and quoted Mark Chen as saying OpenAI looked forward to continuing to collaborate with him.",
          event_t("2024-12-20", "Date of the QbitAI report; The Information's underlying report is cited but was not retrieved. No leaving date is given."),
          {"role": "Not stated (researcher; joined OpenAI in 2016 per the report)", "stage": "announced"},
          "The record rests on reporting in Chinese that relays The Information and Mark Chen's statement; no first-person announcement by Radford was found.",
          [ev("lg2-ev-oa-radford-openai-departure-2024-1", "lg2-src-qbitai-radford-2024", "Article, first paragraph", "The Information消息，初代GPT论文第一作者Alec Radford也要离开OpenAI，转向独立研究。", role="secondary"),
           ev("lg2-ev-oa-radford-openai-departure-2024-2", "lg2-src-qbitai-radford-2024", "Article, third paragraph", "OpenAI研究负责人Mark Chen表示，“我们对Alec和他的贡献深表敬意和赞赏，并期待在他探索独立研究的过程中继续与他合作。”", role="secondary")]),
    # Metz to MSL
    claim("lg2-oa-metz-msl-2026", "ev-2026-08-metz-msl", "luke-metz", "held_role", "meta-superintelligence-labs",
          "The Next Web reported on 25 August 2026, relaying Axios, that Luke Metz had joined Meta Superintelligence Labs, seven months after rejoining OpenAI, and would report to Alexandr Wang.",
          snap("2026-08-24", "Date of the Axios report the article relays (published 25 August 2026); the article says he starts that week."),
          {"role": "not stated (reporting to Alexandr Wang)"},
          "The record rests on reporting that relays an unnamed source's confirmation to Axios; the Axios article could not be retrieved. No title is given, and no announcement by Metz or Meta was found.",
          [ev("lg2-ev-oa-metz-msl-2026", "lg2-src-tnw-metz-2026", "Article, first paragraph", "Luke Metz has joined Meta Superintelligence Labs, seven months after rejoining OpenAI. A source familiar with the matter confirmed the hire to Axios.", role="secondary"),
           ev("lg2-ev-oa-metz-msl-2026-2", "lg2-src-tnw-metz-2026", "Article, first paragraph", "Metz starts this week and reports to Alexandr Wang", role="secondary")],
          related=["lg-new-metz-openai-return-2026"]),
    # Houlsby
    claim("lg2-oa-houlsby-anthropic-zurich-2025", "ev-2025-04-anthropic-zurich", "neil-houlsby", "held_role", "anthropic",
          "Anthropic's announcement of 8 April 2025 describes a small research-focused office in Zurich, opened earlier that year, as led by AI scientist Neil Houlsby.",
          snap("2025-04-08", "Date of the announcement; the office's opening date and his start date are not given."),
          {"role": "Leader of the Zurich research office"},
          "A company announcement; it does not give a title or start date or name his previous employer. Reporting describes him as coming from Google DeepMind; that is not recorded here.",
          [ev("lg2-ev-oa-houlsby-anthropic-zurich-2025", "lg2-src-anthropic-emea-2025", "Paragraph beginning “Today's announcement builds on”", "expanded earlier this year with the opening of a small research-focused office in Zurich led by AI scientist Neil Houlsby")]),
    # Katti
    claim("lg2-oa-katti-openai-2025", "ev-2025-11-katti-openai", "sachin-katti", "held_role", "openai",
          "Greg Brockman posted on X on 10 November 2025 welcoming Sachin Katti to OpenAI to work on designing and building its compute infrastructure.",
          snap("2025-11-10", "Date of the post; not a start date."),
          {"role": "not stated (designing and building compute infrastructure)"},
          "The post names him by his X handle; the identification with Sachin Katti rests on reporting (Tom's Hardware). No title is given. His move from Intel is not recorded here.",
          [ev("lg2-ev-oa-katti-openai-2025-1", "lg2-src-brockman-katti-x-2025", "Post text", "Brockman welcomes @sk7037 to OpenAI to work with him on designing and building its compute infrastructure.", "Welcome @sk7037"),
           ev("lg2-ev-oa-katti-openai-2025-2", "lg2-src-tomshw-katti-2025", "Article, opening paragraphs", "President Greg Brockman did say on Twitter/X that Katti would be taking over OpenAI's compute infrastructure planning and building", role="secondary")]),
    claim("lg2-oa-katti-openai-departure-2026", "ev-2026-10-openai-compute-lead", "sachin-katti", "departure_announced", "openai",
          "Crypto Briefing reported on 14 October 2026, relaying CNBC, that Sachin Katti would leave his role as OpenAI's infrastructure and compute lead on 15 November and remain an advisor, and that he had announced the move on LinkedIn.",
          event_t("2026-10-14", "Date of the report; the reported leaving date of 15 November 2026 is prospective."),
          {"role": "Infrastructure and compute lead (as reported)", "stage": "announced"},
          "The record rests on reporting that relays CNBC and Katti's LinkedIn post, neither retrieved. The leaving date is announced, not confirmed. His plan to build something new is not recorded as a reason.",
          [ev("lg2-ev-oa-katti-openai-departure-2026", "lg2-src-cryptobriefing-katti-2026", "Article, first paragraph", "OpenAI infrastructure and compute lead Sachin Katti will leave his role on November 15 and remain an advisor, CNBC reported on Wednesday.", role="secondary")]),
    # Ruddarraju
    claim("lg2-oa-ruddarraju-openai-cto-compute-2026", "ev-2026-07-ruddarraju-cto-compute", "uday-ruddarraju", "held_role", "openai",
          "exchange4media reported on 18 July 2026 that Uday Ruddarraju had been elevated to Chief Technology Officer, Compute at OpenAI, having earlier been Head of Compute and Infrastructure.",
          snap("2026-07-18", "Date of the report; the date of the change is not given."),
          {"role": "Chief Technology Officer, Compute (as reported)"},
          "The record rests on reporting with no named source; no OpenAI announcement was found.",
          [ev("lg2-ev-oa-ruddarraju-openai-cto-compute-2026", "lg2-src-e4m-ruddarraju-2026", "Article, first paragraph", "Open AI's Uday Ruddarraju has been elevated as the Chief Technology Officer, Compute. He was earlier Head of Compute and Infrastructure.", role="secondary")]),
    claim("lg2-oa-ruddarraju-xai-infra-prior", "ev-2026-07-ruddarraju-cto-compute", "uday-ruddarraju", "held_role", "xai",
          "exchange4media reported on 18 July 2026 that Uday Ruddarraju joined OpenAI in July 2025 after stepping down as Head of Infrastructure Engineering at xAI.",
          {"kind": "interval", "until": "2025-07", "note": "End bound as reported (he joined OpenAI in July 2025 after stepping down); the start is not given in this source."},
          {"role": "Head of Infrastructure Engineering (as reported)"},
          "The record rests on reporting with no named source (Crypto Briefing cites his LinkedIn profile for the July 2025 OpenAI start); it does not establish a start date at xAI.",
          [ev("lg2-ev-oa-ruddarraju-xai-infra-prior", "lg2-src-e4m-ruddarraju-2026", "Article, first paragraph", "Ruddarraju joined OpenAI in July 2025 after stepping down as Head of Infrastructure Engineering at xAI.", role="secondary")]),
    claim("lg2-oa-ruddarraju-openai-compute-lead-2026", "ev-2026-10-openai-compute-lead", "uday-ruddarraju", "held_role", "openai",
          "Crypto Briefing reported on 14 October 2026 that an OpenAI spokesperson said Uday Ruddarraju, its CTO of compute, would take over the overall compute organisation from Sachin Katti.",
          snap("2026-10-14", "Date of the report; the handover is prospective (Katti's reported leaving date is 15 November 2026)."),
          {"role": "Leader of the overall compute organisation (as reported)", "stage": "announced"},
          "The record rests on reporting of a spokesperson's statement; it does not establish a title or that the handover took place.",
          [ev("lg2-ev-oa-ruddarraju-openai-compute-lead-2026", "lg2-src-cryptobriefing-katti-2026", "Article, first paragraph", "Uday Ruddarraju, the company’s CTO of compute, will take over the overall compute organization, an OpenAI spokesperson said.", role="secondary")]),
    # Kilpatrick
    claim("lg2-oa-kilpatrick-google-2024", "ev-2024-04-kilpatrick-google", "logan-kilpatrick", "held_role", "google",
          "Quartz reported on 3 April 2024 that Logan Kilpatrick, OpenAI's former head of developer relations, had announced that he had joined Google, where he would lead AI Studio and help with Gemini.",
          snap("2024-04-03", "Date of the report; his announcement is reported as made that week (on LinkedIn). Not a start date."),
          {"role": "Lead of AI Studio (as reported)"},
          "The record rests on reporting; his LinkedIn announcement was not retrieved and LinkedIn is not cited as evidence.",
          [ev("lg2-ev-oa-kilpatrick-google-2024", "lg2-src-qz-kilpatrick-2024", "Article, first paragraph", "announced this week that he has joined Google", role="secondary"),
           ev("lg2-ev-oa-kilpatrick-google-2024-2", "lg2-src-qz-kilpatrick-2024", "Article, first paragraph", "Logan Kilpatrick will lead its AI Studio and help with Gemini", role="secondary")]),
    claim("lg2-oa-kilpatrick-openai-devrel-prior", "ev-2024-04-kilpatrick-google", "logan-kilpatrick", "held_role", "openai",
          "Quartz reported on 3 April 2024 that Logan Kilpatrick had been OpenAI's head of developer relations and had left OpenAI in March 2024.",
          {"kind": "interval", "until": "2024-03", "note": "End month as reported; the start is not given in this source."},
          {"role": "Head of developer relations (as reported)"},
          "The record rests on reporting; it does not establish a start date or an exact leaving date.",
          [ev("lg2-ev-oa-kilpatrick-openai-devrel-prior", "lg2-src-qz-kilpatrick-2024", "Article, first paragraph", "OpenAI’s former head of developer relations, who left the Sam Altman-helmed startup in March", role="secondary")]),
    # Liberatore
    claim("lg2-oa-liberatore-openai-bfo-2025", "ev-2025-09-liberatore-openai", "mike-liberatore", "held_role", "openai",
          "CFO Dive reported on 16 September 2025 that an OpenAI spokesperson confirmed the appointment of Mike Liberatore, formerly xAI's finance chief, as business finance officer for AI infrastructure, effective that day, reporting to CFO Sarah Friar.",
          snap("2025-09-16", "Date of the report; the report gives the appointment as effective that Tuesday."),
          {"role": "Business finance officer (BFO) for AI infrastructure (as reported)"},
          "The record rests on reporting of a company spokesperson's confirmation; no OpenAI announcement was retrieved.",
          [ev("lg2-ev-oa-liberatore-openai-bfo-2025", "lg2-src-cfodive-liberatore-2025", "Dive Brief, first paragraph", "OpenAI has appointed the former finance chief of xAI, Mike Liberatore, to the role of business finance officer (BFO) for AI infrastructure, effective Tuesday, a company spokesperson confirmed to CFO Dive via email.", role="secondary")]),
    claim("lg2-oa-liberatore-xai-cfo-2025", "ev-2025-09-liberatore-openai", "mike-liberatore", "held_role", "xai",
          "CFO Dive reported on 16 September 2025, relaying The Wall Street Journal, that Mike Liberatore had left xAI in July 2025 after about four months as its finance chief.",
          {"kind": "interval", "until": "2025-07", "note": "End month as reported; a start about four months earlier is implied but not dated."},
          {"role": "Finance chief (CFO) (as reported)"},
          "The record rests on reporting that relays The Wall Street Journal's account citing unnamed people; it does not establish start or end dates beyond the month.",
          [ev("lg2-ev-oa-liberatore-xai-cfo-2025", "lg2-src-cfodive-liberatore-2025", "Dive Brief, second paragraph", "Liberatore abruptly departed from xAI in July after serving only four months as its finance chief", role="secondary")]),
]

omitted = [
    {"item": "Greg Brockman's role on return (November 2024)", "reason": "Reporting described a new role under discussion; no first-person or company text naming it was retrieved."},
    {"item": "Jason Wei and Hyung Won Chung, OpenAI to Meta Superintelligence Labs (July 2025)", "reason": "Known only from reporting relaying unnamed sources (Wired); no announcement by the person or company was found."},
    {"item": "Avi Verma and Ethan Knight, brief move to Meta Superintelligence Labs and return to OpenAI (2025)", "reason": "Reporting only, from unnamed sources; researchers without a documented lead role."},
    {"item": "Alexander Kolesnikov and Xiaohua Zhai joining Meta (June 2025)", "reason": "Only copied on Lucas Beyer's post (“we will be joining Meta”); no separate statement retrieved."},
    {"item": "Departures from OpenAI of Beyer, Kolesnikov, Zhai, Brooks and Karpathy (2026) as separate records", "reason": "The retrieved texts announce the new role, not the departure; a departure is not inferred from a new role."},
    {"item": "Jerry Tworek's co-founding of Core Automation (2026)", "reason": "A new-lab founding; left to the new-labs pass."},
    {"item": "Alec Radford and Bob McGrew as Thinking Machines Lab advisers (2025)", "reason": "Roles at Thinking Machines, not moves into or out of OpenAI or Anthropic; left to the new-labs pass."},
    {"item": "Dylan Scandinaro's role at Anthropic before joining OpenAI (2026)", "reason": "His post thanks colleagues from his time at Anthropic without naming a role or departure; existing record covers his OpenAI appointment."},
    {"item": "Kyle Kosic's return to OpenAI (2024)", "reason": "Rests on the same 2026 retrospective report as the existing xAI departure record; nothing stronger was found."},
    {"item": "Sam Schoenholz's departure from Thinking Machines Lab", "reason": "No source for the departure itself; only the return announcement was retrieved."},
    {"item": "Holden Karnofsky's start date at Anthropic (reported as January 2025)", "reason": "The reporting (Fortune, February 2025) rests on a spokesperson and his LinkedIn profile and discusses his family; the interview record is first-person and suffices for the role."},
    {"item": "Neil Houlsby's departure from Google DeepMind (2025)", "reason": "Known from reporting only (Euronews); the Anthropic announcement does not name his previous employer."},
    {"item": "Sachin Katti's departure from Intel (2025)", "reason": "Intel is outside the frontier-lab scope; only his OpenAI role is drafted."},
    {"item": "Guillaume Princen (Head of EMEA, 2025) and Chris Ciauri (Anthropic international) appointments", "reason": "Commercial executives hired from outside the frontier labs; outside this group's research, safety and policy focus."},
    {"item": "Rohan Anil and Jascha Sohl-Dickstein, Google to Anthropic", "reason": "No dated primary text found; only profile aggregators, which are not evidence."},
    {"item": "Steven Adler, Richard Ngo, William Saunders, Leopold Aschenbrenner (OpenAI departures 2024–2025)", "reason": "Researchers without a documented lead role; not pursued within this pass's budget."},
    {"item": "Hannah Wong, Kate Rouch, Dane Stuckey, Ronnie Chatterji, Chris Lehane (OpenAI executive appointments or departures)", "reason": "Not pursued within this pass's budget; candidates for a later gap-filling pass."},
    {"item": "Uday Ruddarraju's and David Lau's 2025 move from xAI with other engineers (reported by Wired)", "reason": "Only Ruddarraju is drafted, from reporting naming him; the group report was not retrieved."},
    {"item": "Compensation statements in Lucas Beyer's post and in reporting on Meta offers", "reason": "Compensation of individuals is out of scope."},
]

retrieval_failures = [
    {"url": "https://www.axios.com/2026/08/24/meta-hires-openai-luke-metz", "what": "Axios report on Luke Metz joining Meta Superintelligence Labs", "result": "Direct refused; relay (r.jina.ai) HTTP 401, anonymous queries blocked for this IP"},
    {"url": "https://www.geekwire.com/2024/tech-moves-openai-nabs-top-microsoft-ai-researcher-lime-taps-amazon-vp-as-cto/", "what": "GeekWire report on Sébastien Bubeck joining OpenAI", "result": "Relay HTTP 401 (blocked)"},
    {"url": "https://www.datacenterdynamics.com/en/news/intel-chief-technology-and-ai-officer-leaves-role-after-six-months-for-openai/", "what": "DCD report on Sachin Katti joining OpenAI", "result": "Relay HTTP 401 (blocked)"},
    {"url": "https://www.neowin.net/amp/google-reportedly-set-to-lose-two-key-gemini-and-deepmind-researchers-to-anthropic/", "what": "Neowin report on Google researchers moving to Anthropic", "result": "Cloudflare challenge page"},
    {"url": "https://x.com/MillionInt/status/2008237251751534622", "what": "Jerry Tworek's departure note", "result": "Retrieved, but the note is an image; text not machine-checkable"},
    {"url": "https://x.com/max_a_schwarzer/status/2028939154944585989", "what": "Max Schwarzer's full post (part naming Anthropic)", "result": "Syndication endpoint truncates the long note"},
    {"url": "https://x.com/JohnJumperSci/status/2068001285173834106", "what": "John Jumper's full post", "result": "Syndication endpoint truncates the long note"},
]

searched = ("Searched the existing-claims inventory for every person and organisation named in the brief and found here (Brockman, Karnofsky, Karpathy, Metz, Zoph, Weng, Scandinaro, Kosic, Jumper and others). "
            "Web searches (discovery only) for 2023–2026 moves into, out of and between OpenAI and Anthropic: Brockman's 2024 sabbatical and return; Karnofsky at Anthropic; Tim Brooks to Google DeepMind; Logan Kilpatrick to Google; Andrea Vallone to Anthropic; Sam Schoenholz's return; OpenAI researchers to Meta Superintelligence Labs and back (Beyer, Kolesnikov, Zhai, Jason Wei, Hyung Won Chung, Verma, Knight, Metz); Google DeepMind researchers to Anthropic (Carlini, Jumper, Houlsby, Sohl-Dickstein, Anil); 2026 moves (Schwarzer, Karpathy, Tworek, Steinberger, Dean Ball); xAI to OpenAI (Ruddarraju, Liberatore); Microsoft to OpenAI (Bubeck); Sachin Katti; Alec Radford. "
            "X posts were read through X's syndication endpoint (which truncates long notes and cannot read image notes); company pages and reports directly or through the reader relay. The relay was intermittently blocked (HTTP 401) for this IP, which defeated Axios, GeekWire and DCD; The Verge and LinkedIn were not attempted as evidence. Primary texts were used wherever retrieved; 15 records rest on reporting and say so.")

draft = {"group": "oa", "searched": searched,
         "existingUsed": ["lg-oai-brockman-president-2022", "lg-new-zoph-openai-return-2026", "lg-new-metz-openai-return-2026", "lg-oai-karpathy-departure-2024", "atlas-jumper-gdm", "lg-oai-holden-karnofsky-nonprofit-board-2019", "lg-oai-scandinaro-preparedness-2026", "lg-mx-kosic-xai-departure-2024", "leike-anthropic-alignment-science"],
         "entities": entities, "sources": sources, "events": events, "claims": claims,
         "omitted": omitted, "retrievalFailures": retrieval_failures}
json.dump(draft, open(OUT, 'w'), ensure_ascii=False, indent=2)
print(len(claims), 'claims')
