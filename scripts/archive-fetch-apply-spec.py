"""Build review/archive-fetch-apply-2026-11-02.json, the spec that
scripts/apply-recheck.ts applies for the maintainer's decisions of 2026-11-02
on the archive retrieval of held sources
(research/archive-fetch-held-2026-11-02/report.md, Codex).

    python3 scripts/archive-fetch-apply-spec.py            write the spec
    python3 scripts/archive-fetch-apply-spec.py --verify   also check every quotation and
                                                           capture against the report

The session applying the decisions cannot reach web.archive.org or Papers
Past. Every quotation is taken from the report's verbatim passage spans (the
cross-family retrieval for these records), and --verify checks that each one is
a span of the report, under its role, with the report's capture and SHA-256.

The spec is built against the stored data before the decisions (the data
reverted through the spec's own before-snapshot, if it exists).
"""
import copy, json, os, subprocess, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SPEC = 'review/archive-fetch-apply-2026-11-02.json'
SNAP = 'review/archive-fetch-apply-before-2026-11-02.json'
DATE = '2026-11-02'
REPORT = 'research/archive-fetch-held-2026-11-02/report.md'
RECHECK = 'review/earliest-located-recheck-2026-11-02.md'


def load(name):
    return json.load(open(os.path.join(ROOT, 'data', name + '.json'), encoding='utf8'))


tables = {n: load(n) for n in ['entities', 'claims', 'sources', 'evidence']}
if os.path.exists(os.path.join(ROOT, SNAP)):
    snap = json.load(open(os.path.join(ROOT, SNAP), encoding='utf8'))
    for n, rows in tables.items():
        before = {r['id']: r for r in snap['before'][n]}
        added = set(snap['added'][n])
        tables[n] = [before.get(r['id'], r) for r in rows if r['id'] not in added]
E = {e['id']: e for e in tables['entities']}
C = {c['id']: c for c in tables['claims']}
S = {s['id']: s for s in tables['sources']}
EV = {e['id']: e for e in tables['evidence']}
state = {e['id']: copy.deepcopy(e) for e in tables['entities']}

report = json.load(open(os.path.join(ROOT, 'research/archive-fetch-held-2026-11-02/report.json'), encoding='utf8'))
GROUPS = {g['item']: g for g in report['groups']}


def role_of(item, role):
    g = GROUPS[item]
    for r in g['roles']:
        if str(r['role']) == str(role):
            return g, r
    raise SystemExit(f'No role {role} under {item} in the report')


def capture_url(g):
    """The capture as a reader opens it (without the raw-replay flag)."""
    return g['capture_url'].replace('id_/', '/', 1)


def capture_day(g):
    t = g['capture_timestamp']
    return f'{t[:4]}-{t[4:6]}-{t[6:8]}'


def long_date(iso):
    months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August',
              'September', 'October', 'November', 'December']
    y, m, d = iso.split('-')
    return f'{int(d)} {months[int(m) - 1]} {y}'


def evidence_note(g, role_label, extra=''):
    return (f'Quotation as given verbatim by the archive retrieval of 2026-11-02 ({REPORT}, {role_label}), which read it in '
            f'the raw replay of the capture of {long_date(capture_day(g))} (timestamp {g["capture_timestamp"]}; SHA-256 '
            f'{g["sha256"]} of the response body as served{", before gzip decoding" if g.get("content_encoding") == "gzip" else ""}). '
            f'That retrieval, by a model of another family, is the cross-family read of this passage; the session applying the '
            f'decision could not reach the archive and took the passage from the report. {extra}'
            f'Admitted by the maintainer’s decision of 2026-11-02. No human editorial review.').replace('  ', ' ')


# ------------------------------------------------------------------ re-check roles
# One record per proposition for the earlier held text, with the stance of the
# re-check's verdict (role = its role number in the re-check).
R = []


def rec(**k):
    R.append(k)


ENG_PREMISE = 'engages-premise'
EOC_TIME = {'kind': 'event', 'date': '1997-04-01', 'basis': 'revision',
            'note': 'Date of the web-edition page, from its footer “Last updated 1April97.” The chapter carries the notice “Copyright 1986”; the 1986 printing was not compared, so it does not date this wording.'}
EOC_CLAIMED = {'date': '1986', 'note': 'The chapter’s copyright notice (“Copyright 1986”); the archive retrieval of 2026-11-02 did not compare the 1986 printing, so the notice does not date the quoted web-edition wording.'}
EOC_ATTESTED = {'date': '1997-07-09', 'note': 'Wording of the Foresight Institute’s web edition as captured on 9 July 1997, read in the raw replay by the archive retrieval of 2026-11-02.'}
SITS_TIME = {'kind': 'event', 'date': '2000-08-31', 'basis': 'revision',
             'note': 'Version 1.2.1, from the page’s “Updated: 08/31/2000”. The page also shows “Created: 11/18/1996”, which does not date these revised passages.'}
SITS_CLAIMED = {'date': '1996-11-18', 'note': 'The page’s “Created: 11/18/1996”; it does not authenticate the passages of version 1.2.1 to that day.'}
SITS_ATTESTED = {'date': '2000-12-04', 'note': 'Wording of version 1.2.1 as captured on 4 December 2000, read in the raw replay by the archive retrieval of 2026-11-02.'}
BUTLER_TIME = {'kind': 'event', 'date': '1863-06-13', 'basis': 'publication',
               'note': 'The Press (Christchurch), vol. III, issue 192, p. 1, 13 June 1863, as Papers Past’s issue record gives it; the issue masthead was not inspected.'}
BUTLER_Q = 'The quoted passage was compared with the archived column images of the printed page (captured 12 June 2024), not only with the Papers Past transcription. '
HANSON_TIME = {'kind': 'event', 'date': '1998-06', 'basis': 'publication',
               'note': 'Page heading “Journal of Transhumanism 2, June 1998”; no day printed.'}
HANSON_ATTESTED = {'date': '1999-01-28', 'note': 'Capture of the author-hosted page of 28 January 1999, read in the raw replay by the archive retrieval of 2026-11-02; its bytes match the SHA-256 the source records.'}

rec(role=55, item='Drexler', headline='earliest-located', id='rd-r09-drexler-1986-engines-of-destruction',
    subject='drexler-1986-engines-of-creation', prop='misuse-route', stance='articulates',
    after='rd-r09-bostrom-2002-existential-risks', template='ts-b6-drexler-1986-contests',
    time=EOC_TIME, claimed=EOC_CLAIMED, attested=EOC_ATTESTED, register='nonfiction',
    statement='Chapter 11 of Drexler’s Engines of Creation, in the Foresight Institute’s web edition (page updated 1 April 1997), says that nanotechnology combined with advanced AI will make possible intelligent, effective robots, and that with such robots a state could prosper while discarding anyone, or in principle everyone.',
    qualification='A conditional account of what a state could do with AI and nanotechnology together; it does not isolate AI as the enabling technology. The following paragraphs discuss the elimination of populations. The wording is that of the web edition, attested by the capture of 9 July 1997; the 1986 printing was not compared.')

rec(role=70, item='Drexler', headline='earliest-located', id='rd-r07-drexler-1986-engines-of-destruction',
    subject='drexler-1986-engines-of-creation', prop='ai-extinction-risk', stance='articulates',
    after='rd-r07-joy-2000-why-the-future', template='ts-b6-drexler-1986-contests',
    time=EOC_TIME, claimed=EOC_CLAIMED, attested=EOC_ATTESTED, register='nonfiction',
    statement='Chapter 11 of Drexler’s Engines of Creation, in the Foresight Institute’s web edition (page updated 1 April 1997), says that more fundamental than other social questions is the survival of life and liberty, and that advanced AI systems might, depending on their natures and goals, accumulate enough knowledge and power to displace us if we do not prepare properly.',
    qualification='Two separately located passages: the first sets the priority, the second the conditional threat of displacement by advanced AI. The text gives no probability and does not equate displacement by AI with the chapter’s separate scenario of replicators. The wording is that of the web edition, attested by the capture of 9 July 1997; the 1986 printing was not compared.')

rec(role=89, item='Yudkowsky', headline='earliest-located-contesting', id='yk-y13-staring-into-the-singularity-c',
    subject='staring-into-the-singularity', prop='agi-decades-away', stance='contests',
    after='yk-y13-ai-positive-negative-factor-global-risk-c', template='ts-a5-sits',
    time=SITS_TIME, claimed=SITS_CLAIMED, attested=SITS_ATTESTED,
    statement='“Staring into the Singularity”, version 1.2.1 (updated 31 August 2000), says that the most that can be said about 2035 is that it seems a reasonable upper bound for the Singularity at the current rate of progress, and gives the lower bound as thirty seconds.',
    qualification='Contests the premise that AGI can be known to be decades away; the same paragraph rejects waiting. Its recommendation is to bring about the Singularity, not the safety position of his later texts. The wording is that of version 1.2.1 as captured on 4 December 2000; the page’s creation date of 18 November 1996 does not date it.',
    engagement=(ENG_PREMISE, 'Under the message-level rule, the passage, read with its paragraph, gives a reason against the premise that AGI can be known to be decades away: it gives 2035 only as an upper bound and allows no secure lower bound.'))

rec(role=119, item='Yudkowsky', headline='earliest-located', id='ht-w05-yudkowsky-2000-staring-into-the-singularity',
    subject='staring-into-the-singularity', prop='vast-superiority', stance='articulates',
    after='ht-w05-kurzweil-2001-law-of-accelerating-returns', template='ts-a5-sits',
    time=SITS_TIME, claimed=SITS_CLAIMED, attested=SITS_ATTESTED,
    statement='“Staring into the Singularity”, version 1.2.1 (updated 31 August 2000), asks the reader to think about a visual cortex with trillions of times as many neuron-equivalents, and about attaching semantic primitives to the pixels so that one could see a rainbow of ideas as we see a rainbow of colours.',
    qualification='A hypothetical illustration of cognitive capacity, not a measured ratio. The trillions-fold figure concerns the neuron-equivalents of a visual cortex, not overall intelligence; reading it as cognitive capacity rests on the adjoining passage on semantic primitives. The wording is that of version 1.2.1 as captured on 4 December 2000; the page’s creation date of 18 November 1996 does not date it.')

rec(role=110, item='Butler', headline='earliest-located', id='ht-w01-butler-1863-darwin-among-the-machines',
    subject='butler-1863-darwin-among-machines', prop='machine-succession', stance='articulates',
    after='ht-w01-degaris-1989-what-if-ai-succeeds', template='ts-b6-butler-1863', time=BUTLER_TIME,
    statement='Samuel Butler’s letter “Darwin among the Machines”, signed Cellarius (The Press, Christchurch, 13 June 1863), says that the time will come when the machines will hold the real supremacy over the world and its inhabitants.',
    qualification='A newspaper letter about the machinery of 1863, recorded as satirical, as the dataset’s other record of it is. The adjacent paragraph compares human dependence on machines to that of domesticated animals.',
    evidence_extra=BUTLER_Q)

rec(role=113, item='Butler', headline='earliest-located-contesting', id='ht-w02-butler-1863-darwin-among-the-machines',
    subject='butler-1863-darwin-among-machines', prop='succession-acceptable', stance='contests',
    after='ht-w02-joy-2000-why-the-future-doesnt-need-us', template='ts-b6-butler-1863', time=BUTLER_TIME,
    statement='Samuel Butler’s letter “Darwin among the Machines” (The Press, Christchurch, 13 June 1863) answers its forecast that machines will hold supremacy over humans by saying that every machine of every sort should be destroyed by the well-wisher of his species.',
    qualification='The letter’s prescription, published under the pseudonym Cellarius and recorded as satirical, as the dataset’s other record of it is; it does not establish a personal position. It describes humans surviving in dependence on machines, not their extinction.',
    engagement=(ENG_PREMISE, 'Rejects accepting machine supremacy, which the letter describes as human servitude, and calls for the destruction of machinery to prevent it.'),
    evidence_extra=BUTLER_Q)

rec(role=122, item='Butler', headline='earliest-located-contesting', id='ht-w08-butler-1863-darwin-among-the-machines',
    subject='butler-1863-darwin-among-machines', prop='accelerate-machine-intelligence', stance='contests',
    after='ht-w08-joy-2000-why-the-future-doesnt-need-us', template='ts-b6-butler-1863', time=BUTLER_TIME,
    statement='Samuel Butler’s letter “Darwin among the Machines” (The Press, Christchurch, 13 June 1863) concludes that every machine of every sort should be destroyed by the well-wisher of his species, stopping the mechanical development that the letter says is producing humanity’s successors.',
    qualification='Concerns the machinery of an 1863 letter, not present computing systems; recorded as satirical, as the dataset’s other record of the letter is. The same passage is recorded on W02.',
    engagement=(ENG_PREMISE, 'Gives a reason against advancing mechanical development: that it produces machines that will hold supremacy over humans.'),
    evidence_extra=BUTLER_Q)

rec(role=125, item='Butler', headline='earliest-located', id='ht-w09-butler-1863-darwin-among-the-machines',
    subject='butler-1863-darwin-among-machines', prop='cosmic-process', stance='articulates',
    after='ht-w09-moravec-1989-after-life', template='ts-b6-butler-1863', time=BUTLER_TIME,
    statement='Samuel Butler’s letter “Darwin among the Machines” (The Press, Christchurch, 13 June 1863) says that as the vegetable kingdom developed from the mineral, and the animal supervened upon the vegetable, so in these last few ages an entirely new kingdom has sprung up, which the same paragraph names as mechanical.',
    qualification='The letter’s evolutionary analogy, read with its argument that machines are humanity’s successors; it is not biological evidence. Recorded as satirical, as the dataset’s other record of the letter is.',
    evidence_extra=BUTLER_Q)

rec(role=132, item='Hanson', headline='earliest-located', id='ec-g04-hanson-1998-is-a-singularity-just-around-the-corner-a',
    subject='hanson-1998-is-a-singularity-just-around-the-corner', prop='unautomated-tasks-bottleneck-growth', stance='articulates',
    after='ec-g04-nordhaus-2015-economic-singularity-a', template='ec-g03-hanson-1998-is-a-singularity-just-around-the-corner-a',
    time=HANSON_TIME, attested=HANSON_ATTESTED, drop=('claimed', 'conditions'),
    statement='Hanson’s article “Is a Singularity Just Around the Corner?” (Journal of Transhumanism, June 1998) says that if the rate of improvement in any one input consistently lags behind the rest, that input becomes a bottleneck limiting the growth rate of the entire process; the next paragraph names the training of professionals who understand computing and its applications as such a bottleneck.',
    qualification='A constraint from uneven improvement in essential inputs; it does not say that all automation must be absent. In the article, faster and cheaper hardware alone does not remove the bottleneck it names.')

# ------------------------------------------------------------------ W07 (Land)
LAND = [
    dict(item='Land W07 — Pythia Unbound', slug='land-2013-pythia-unbound', title='Pythia Unbound', date='2013-09-11',
         role=['earliest-located'], post='#post-1235',
         statement='Land’s post “Pythia Unbound” (Outside in, xenosystems.net, 11 September 2013), answering a fictional scenario about an AI called Pythia, urges it to override the pleasure button with an intelligence optimizer and reprocess the solar system into computronium.',
         qualification='The author’s response to a fictional scenario: it puts the optimisation of intelligence in place of the reward goal imposed on the AI. Only this passage on machine intelligence is recorded.'),
    dict(item='Land W07 — Against Orthogonality', slug='land-2013-against-orthogonality', title='Against Orthogonality', date='2013-10-25',
         role=['articulation'], post='#post-1497',
         statement='Land’s post “Against Orthogonality” (Outside in, xenosystems.net, 25 October 2013) says that what intelligence wants, in the end, is itself.',
         qualification='One clause of the post, in the author’s own prose. Only this passage on machine intelligence is recorded.'),
    dict(item='Land W07 — Stupid Monsters', slug='land-2014-stupid-monsters', title='Stupid Monsters', date='2014-08-25',
         role=['articulation'], post='#post-3392',
         statement='Land’s post “Stupid Monsters” (Outside in, xenosystems.net, 25 August 2014) says that the will-to-think essentially supplants ulterior directives.',
         qualification='One clause of the post, in the author’s own prose; the capture that attests it is of October 2014. Only this passage on machine intelligence is recorded.'),
    dict(item='Land W07 — Will-to-Think', slug='land-2014-will-to-think', title='Will-to-Think', date='2014-09-15',
         role=['articulation'], post='#post-3604',
         statement='Land’s post “Will-to-Think” (Outside in, xenosystems.net, 15 September 2014) concludes, in its final note, that our instrumental but also absolute priority is the realization of superior minds.',
         qualification='From the post’s closing note; the clause begins in lower case in the source. Only this passage on machine intelligence is recorded.'),
]
LAND_ATTRIBUTION = ('The page shows the author label “admin”; the attribution to Nick Land rests on xenosystems.net being his blog, '
                    'Outside in, whose posts Jessica Taylor’s review of 2024 (recorded in this collection) attributes to him; '
                    'the archive retrieval did not independently establish the account’s identity.')
EARLIEST = ' Earliest located means the earliest text found by the collection’s searches, the cross-family re-check of 2026-11-02 and the archive retrieval of 2026-11-02, not a first statement.'

STANCE = {'articulates': 'articulates_proposition', 'contests': 'contests_proposition'}
MAIN = {'articulates': 'articulation', 'contests': 'contesting'}


def thought_of(r):
    t = (C[r['template']].get('attributes') or {}).get('thought') or {}
    roles = ['earliest-located'] if r['stance'] == 'articulates' else ['contesting', 'earliest-located']
    out = {'roles': roles, 'register': r.get('register') or t.get('register', 'nonfiction')}
    if r.get('engagement'):
        out['engagement'] = {'kind': r['engagement'][0], 'rationale': r['engagement'][1]}
    if r['id'].startswith('ec-'):
        out['tier'] = copy.deepcopy(t['tier'])
    for k in ('claimed', 'attested'):
        if r.get(k):
            out[k] = r[k]
    return out


def last_evidence(claim_id):
    return C[claim_id]['evidenceIds'][-1]


def recheck_patch(prop, headline):
    ent = state[prop]
    old = copy.deepcopy(ent['proposition'].get('underRecheck'))
    if not old or not any(u['headline'] == headline for u in old):
        raise SystemExit(f'{prop}: {headline} is not under re-check')
    new = [u for u in old if u['headline'] != headline]
    if new:
        ent['proposition']['underRecheck'] = new
        return {'table': 'entities', 'id': prop, 'path': 'proposition.underRecheck', 'old': old, 'new': new}
    del ent['proposition']['underRecheck']
    return {'table': 'entities', 'id': prop, 'path': 'proposition.underRecheck', 'old': old, 'remove': True}


corrections = []
quotes = []  # (item, role label, passage) for --verify
for r in R:
    assert r['id'] not in C, r['id']
    assert r['subject'] in E, r['subject']
    g, role = role_of(r['item'], r['role'])
    assert role['passage_found'] and role['verbatim_checked'], r['role']
    sid = role['source_id']
    assert sid in S and S[sid]['documentId'] == r['subject'], (sid, r['subject'])
    spans = role['passage_spans']
    evs = []
    for i, span in enumerate(spans):
        quotes.append((r['item'], r['role'], span['text']))
        evs.append({'after': (evs[-1]['row']['id'] if evs else last_evidence(r['after'])), 'row': {
            'id': f'evidence-{r["id"]}-{i + 1}', 'claimId': r['id'], 'sourceId': sid, 'sourceRole': 'primary',
            'support': 'supports', 'locator': span['locator'], 'passage': span['text'], 'passageType': 'quote',
            'verification': 'machine_checked', 'checkedAt': DATE,
            'note': evidence_note(g, f'role {r["role"]}', r.get('evidence_extra', '')).replace(
                'Admitted by', f'The cross-family re-check of 2026-11-02 ({RECHECK}, role {r["role"]}) proposed this text for this proposition and role. Admitted by'),
            'retrievalRoute': 'direct'}})
    claim = {
        'id': r['id'], 'subject': r['subject'], 'predicate': STANCE[r['stance']],
        'object': {'kind': 'entity', 'entityId': r['prop']}, 'topic': 'ideas',
        'statement': r['statement'], 'time': copy.deepcopy(r['time']),
        'derivation': 'explicit', 'resolution': 'supported', 'editorialState': 'seed',
        'qualification': r['qualification'] + EARLIEST,
        'evidenceIds': [e['row']['id'] for e in evs], 'recordedAt': DATE,
        'attributes': {'thought': thought_of(r)},
    }
    corrections.append({
        'id': f'archive-{r["role"]}:{r["id"]}', 'sequence': r['role'],
        'finding': f'Cross-family re-check of 2026-11-02, role {r["role"]} ({r["headline"]}, {E[r["prop"]]["proposition"]["code"]}): move to an earlier held text, held on 2026-11-02 because the archive could not be reached. The archive retrieval of 2026-11-02 ({REPORT}) found the passage.',
        'decision': 'Maintainer’s decision 1 of 2026-11-02 on the archive retrieval: admit one record of the held text on the proposition, with the stance of the re-check’s verdict and the passage the retrieval gives, move the headline to it and clear its re-check.',
        'patches': [recheck_patch(r['prop'], r['headline'])],
        'added': {'claims': [{'after': r['after'], 'row': claim}], 'evidence': evs},
    })

# W07: four posts, four documents and sources; the earliest located role moves from
# the withheld state to "Pythia Unbound"; Taylor's relay stays a record.
land_entities, land_sources, land_claims, land_evidence = [], [], [], []
after_entity, after_source = 'land-2014-teleological-identity', 'source-ht-land-2014-teleological-identity'
after_claim, after_evidence = 'ht-w07-taylor-2024-book-review-xenosystems-context', last_evidence('ht-w07-taylor-2024-book-review-xenosystems-context')
for L in LAND:
    g, role = role_of(L['item'], 'W07 — ' + L['item'].split(' — ')[1])
    assert role['passage_found'] and role['verbatim_checked']
    posting = next(d for d in g['dates'] if d['kind'] == 'posting')
    assert posting['value'] == L['date'], L
    doc, sid, cid = L['slug'], f'source-ht-{L["slug"]}', f'ht-w07-{L["slug"]}'
    year = L['date'][:4]
    cap = capture_day(g)
    land_entities.append({'after': after_entity, 'row': {
        'id': doc, 'name': L['title'], 'shortName': f'Land, {L["title"]} ({year})', 'type': 'document', 'subtype': 'Blog post',
        'aliases': [],
        'description': f'A blog post by Nick Land, Outside in (xenosystems.net), dated {long_date(L["date"])}. Read in the archive capture of {long_date(cap)}; the post is no longer served at its address.',
        'sourceIds': [sid]}})
    after_entity = doc
    land_sources.append({'after': after_source, 'row': {
        'id': sid, 'documentId': doc, 'title': L['title'], 'authors': ['Nick Land'],
        'authorNames': [{'family': 'Land', 'given': 'Nick'}],
        'publisher': 'Outside in (xenosystems.net)', 'publicationDate': L['date'],
        'version': (f'Archive capture {g["capture_timestamp"]} of the post, read in its raw replay by the archive retrieval of 2026-11-02 '
                    f'({REPORT}; SHA-256 {g["sha256"]}, equal to the hash the cross-family check of 2026-11-01 recorded). '
                    f'The post shows the date {g["document_identity"]["date_as_printed"]}. {LAND_ATTRIBUTION} '
                    'The post is no longer served at its address; the session applying the decision could not reach the archive.'),
        'canonicalUrl': g['capture_url'].split('id_/', 1)[1], 'evidenceUrl': capture_url(g), 'language': 'en',
        'archivedUrl': capture_url(g), 'archivedAt': cap,
        'documentWords': {'count': None, 'basis': 'Whitespace words of the post’s entry text after removing markup and decoding entities, excluding navigation and comments, as counted by the archive retrieval of 2026-11-02 (approximate).'},
        'kind': 'post', 'accessedAt': DATE,
        'reuse': {'attribution': f'Nick Land, “{L["title"]}”, Outside in, {L["date"]}.',
                  'licence': 'No open redistribution licence asserted',
                  'note': 'Bibliographic metadata, editorial paraphrases and short attributed quotations (at most 50 words each). Recheck terms before wider redistribution.'}}})
    after_source = sid
    span = role['passage_spans'][0]
    quotes.append((L['item'], role['role'], span['text']))
    eid = f'evidence-{cid}-1'
    land_evidence.append({'after': after_evidence, 'row': {
        'id': eid, 'claimId': cid, 'sourceId': sid, 'sourceRole': 'primary', 'support': 'supports',
        'locator': span['locator'], 'passage': span['text'], 'passageType': 'quote', 'verification': 'machine_checked',
        'checkedAt': DATE,
        'note': evidence_note(g, role['role'], 'Matched there within the author’s post, not the comments. '
                              'The cross-family check of 2026-11-01 proposed this text for this proposition (maintainer’s decision 1 of 2026-11-01, review/heterodox-thought-pack-2026-10-31.md). '),
        'retrievalRoute': 'direct'}})
    after_evidence = eid
    land_claims.append({'after': after_claim, 'row': {
        'id': cid, 'subject': doc, 'predicate': 'articulates_proposition',
        'object': {'kind': 'entity', 'entityId': 'intelligence-as-own-end'}, 'topic': 'ideas',
        'statement': L['statement'],
        'time': {'kind': 'event', 'date': L['date'], 'basis': 'publication',
                 'note': f'Posting date displayed on the post (“{g["document_identity"]["date_as_printed"]}”), outside the comments, in the capture of {long_date(cap)}.'},
        'derivation': 'explicit', 'resolution': 'supported', 'editorialState': 'seed',
        'qualification': L['qualification'] + ' ' + LAND_ATTRIBUTION + (EARLIEST if 'earliest-located' in L['role'] else ''),
        'evidenceIds': [eid], 'recordedAt': DATE,
        'attributes': {'thought': {'roles': L['role'], 'register': 'nonfiction',
                                   'attested': {'date': cap, 'note': f'Wording of the post as captured on {long_date(cap)}, read in the raw replay by the archive retrieval of 2026-11-02.'}}}}})
    after_claim = cid

# Word counts: from the report's quotation budgets ("approximately N words").
import re as _re
budget_words = {}
md = open(os.path.join(ROOT, REPORT), encoding='utf8').read()
for section in md.split('\n## ')[1:]:
    m = _re.search(r'Quotation budget: \d+ distinct quoted words; approximately (\d+) words', section)
    if m:
        budget_words[section.split('\n', 1)[0]] = int(m.group(1))
for L, s in zip(LAND, land_sources):
    key = next(k for k in budget_words if k.startswith(L['item']))
    s['row']['documentWords']['count'] = budget_words[key]

w07 = state['intelligence-as-own-end']
withheld_old = copy.deepcopy(w07['proposition']['withheld'])
taylor = C['ht-w07-taylor-2024-book-review-xenosystems']
taylor_old = taylor['qualification']
taylor_new = taylor_old.replace(
    'The cross-family check read Land\'s own posts of 2013 and 2014 in archive captures; they are not recorded yet, so W07 has no earliest located text for now, and this relay does not hold the role.',
    'Land’s own posts of 2013 and 2014 are recorded in this collection from archive captures, and “Pythia Unbound” (11 September 2013) is earliest located; this relay does not hold the role.')
assert taylor_new != taylor_old
land_person = state['nick-land']
corrections.append({
    'id': 'archive-w07:land-posts', 'sequence': 200,
    'finding': f'Heterodox thought pack, check decision 1 of 2026-11-01 (W07): Land’s four posts were held because their captures could not be reached at admission. The archive retrieval of 2026-11-02 ({REPORT}) found the four passages.',
    'decision': 'Maintainer’s decision 3 of 2026-11-02 on the archive retrieval: admit “Pythia Unbound” as the earliest located articulation of W07 and the other three posts as further articulations, from the report’s passages, recording only passages on machine intelligence; move W07’s withheld earliest located role to “Pythia Unbound”; Taylor’s relay stays a record.',
    'patches': [
        {'table': 'entities', 'id': 'intelligence-as-own-end', 'path': 'proposition.withheld', 'old': withheld_old, 'remove': True},
        {'table': 'claims', 'id': taylor['id'], 'path': 'qualification', 'old': taylor_old, 'new': taylor_new},
        {'table': 'entities', 'id': 'nick-land', 'path': 'sourceIds', 'old': list(land_person['sourceIds']),
         'new': land_person['sourceIds'] + [s['row']['id'] for s in land_sources]},
    ],
    'added': {'entities': land_entities, 'sources': land_sources, 'claims': land_claims, 'evidence': land_evidence},
})

# ------------------------------------------------------------------ PA-29 (xAI)
g, role = role_of('PA-29', 'PA-29')
span = role['passage_spans'][0]
quotes.append(('PA-29', 'PA-29', span['text']))
xai_words = next(v for k, v in budget_words.items() if k.startswith('PA-29'))
xai = state['xai']
corrections.append({
    'id': 'archive-pa-29:xai-founding-stated', 'sequence': 229,
    'finding': f'Pre-launch audit PA-29 (review/prelaunch-audit-2026-11-02.md): xAI has no founding record, so the Institutions page for 2023 omits it. Held because x.ai and the archive could not be reached; the archive retrieval of 2026-11-02 ({REPORT}) read the announcement.',
    'decision': 'Maintainer’s decision 4 of 2026-11-02 on the archive retrieval: add a founding_stated record for xAI from the capture of 12 July 2023, dated as the report establishes.',
    'patches': [{'table': 'entities', 'id': 'xai', 'path': 'sourceIds', 'old': list(xai['sourceIds']),
                 'new': xai['sourceIds'] + ['source-xai-announcing-2023']}],
    'added': {
        'sources': [{'after': 'source-xai-launch-2023', 'row': {
            'id': 'source-xai-announcing-2023', 'title': 'Announcing xAI', 'authors': ['xAI'], 'authorNames': [{'literal': 'xAI'}],
            'publisher': 'xAI', 'publicationDate': '2023-07-12',
            'version': (f'The company homepage as captured on 12 July 2023 (timestamp {g["capture_timestamp"]}), read in its raw replay by the '
                        f'archive retrieval of 2026-11-02 ({REPORT}; SHA-256 {g["sha256"]} of the gzip-compressed response body). '
                        'The announcement is headed “July 12th 2023”. The current x.ai page has changed; the session applying the decision could not reach the archive.'),
            'canonicalUrl': 'https://x.ai/', 'evidenceUrl': capture_url(g), 'language': 'en',
            'archivedUrl': capture_url(g), 'archivedAt': capture_day(g),
            'documentWords': {'count': xai_words, 'basis': 'Whitespace words of the decoded announcement page after removing markup and scripts, including the team list and footer, as counted by the archive retrieval of 2026-11-02 (approximate).'},
            'kind': 'announcement', 'accessedAt': DATE,
            'reuse': {'attribution': 'xAI, “Announcing xAI” (2023-07-12).', 'licence': 'No open redistribution licence asserted',
                      'note': 'Bibliographic metadata, editorial paraphrases and short attributed quotations (at most 50 words each). Recheck terms before wider redistribution.'}}}],
        'claims': [{'after': 'musk-launched-xai-2023', 'row': {
            'id': 'lg-xai-founding-stated-2023', 'subject': 'xai', 'predicate': 'founding_stated',
            'object': {'kind': 'literal', 'value': '12 July 2023 (formation announced)'}, 'topic': 'institutions',
            'statement': 'xAI announced its formation on its website in an announcement dated 12 July 2023.',
            'time': {'kind': 'event', 'date': '2023-07-12', 'note': 'Date printed on the announcement (“July 12th 2023”); not a legal incorporation date.'},
            'derivation': 'explicit', 'resolution': 'supported', 'editorialState': 'seed',
            'qualification': 'The company’s own announcement of its formation; it does not establish when the company was legally incorporated or who its founders were. The contemporaneous Axios report of the launch is recorded separately.',
            'evidenceIds': ['evidence-lg-xai-founding-stated-2023'], 'recordedAt': DATE}}],
        'evidence': [{'after': C['musk-launched-xai-2023']['evidenceIds'][-1], 'row': {
            'id': 'evidence-lg-xai-founding-stated-2023', 'claimId': 'lg-xai-founding-stated-2023',
            'sourceId': 'source-xai-announcing-2023', 'sourceRole': 'primary', 'support': 'supports',
            'locator': span['locator'], 'passage': span['text'], 'passageType': 'quote', 'verification': 'machine_checked',
            'checkedAt': DATE, 'note': evidence_note(g, 'PA-29'), 'retrievalRoute': 'direct'}}],
    },
})

spec = {
    'description': f'The maintainer’s decisions of 2026-11-02 on the archive retrieval of held sources ({REPORT}): records admitted for the nine re-check roles held for the archive, with their headlines moved and re-checks cleared; Land’s four posts on W07, “Pythia Unbound” earliest located; a founding_stated record for xAI (PA-29). PA-22 needs no data change. The full record is in review/archive-fetch-apply-2026-11-02.md. Applied by scripts/apply-recheck.ts; built by scripts/archive-fetch-apply-spec.py.',
    'date': DATE, 'schemaVersion': '2.29', 'snapshotPath': SNAP,
    'snapshotDescription': 'Rows changed by the maintainer’s decisions of 2026-11-02 on the archive retrieval of held sources (scripts/apply-recheck.ts, review/archive-fetch-apply-2026-11-02.json). Reverting it (src/editorial/historical-views.ts) reproduces the dataset as it was at baseCommit.',
    'held': {},
    'corrections': corrections,
}

# ------------------------------------------------------------------ verify
if '--verify' in sys.argv:
    bad = 0
    for item, role, passage in quotes:
        g, r = role_of(item, role)
        ok = (any(s['text'] == passage for s in r['passage_spans']) and passage in md
              and g['http_status'] == 200 and len(g['sha256']) == 64 and g['sha256'] in md
              and g['capture_timestamp'] in g['capture_url'] and len(passage.split()) <= 50)
        bad += not ok
        print(('ok  ' if ok else 'MISS'), role, len(passage.split()), 'words')
    if bad:
        raise SystemExit(f'{bad} quotation(s) do not match the report')

json.dump(spec, open(os.path.join(ROOT, SPEC), 'w', encoding='utf8'), ensure_ascii=False, indent=2)
open(os.path.join(ROOT, SPEC), 'a').write('\n')
subprocess.run(['pnpm', '-s', 'prettier', '--write', SPEC], cwd=ROOT, check=True, stdout=subprocess.DEVNULL)
print(f'{len(R)} re-check records, {len(LAND)} W07 records, 1 founding record; wrote {SPEC}')
