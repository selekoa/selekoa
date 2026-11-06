#!/usr/bin/env python3
"""Applies the maintainer's decisions of 2026-11-03 on the antecedent-texts pack to the drafts.

Decisions (review/decisions/answers-2026-11-03.md): 1a 2a 3b 4a 6a 8a 9a 10a 11a 12a 13a.
Decisions 5 and 7 are not decided and go to a Codex second pass; nothing here chooses them.
The records drafted under 3b and 13a are in drafts/checker-located.json and drafts/singularity.json
(written as drafts, not by this script). This script changes existing drafts only, and asserts that
each change alters a value. Run once, from the repository root: python3 -I <this file>.
"""
import json
from pathlib import Path

D = Path(__file__).resolve().parent.parent / 'drafts'
INC = '2026-11-03'
changes = 0


def load(name):
    return json.loads((D / name).read_text())


def save(name, j):
    (D / name).write_text(json.dumps(j, indent=1, ensure_ascii=False) + '\n')


def setv(obj, key, value):
    global changes
    assert obj.get(key) != value, (key, value)
    obj[key] = value
    changes += 1


def rec(j, rid):
    (r,) = [r for r in j['records'] if r['id'] == rid]
    return r


def decide(r, decision, effect):
    setv(r, 'maintainerDecision', {'decision': decision, 'effect': effect})


# 4a: Lucubratio Ebria becomes W01's earliest located contesting text, read in the OCR text.
b = load('butler.json')
r = rec(b, 'pre-w01-butler-1865-lucubratio-ebria-contests')
setv(r, 'roles', ['contesting', 'earliest-located'])
decide(r, '4a', "W01's earliest located contesting text at admission (replacing Lanier, 2000-11-10), with the qualification that the quotation is read in the OCR text; the page image is unchecked.")
# 2a: Erewhon's civil war stays context on W04.
decide(rec(b, 'pre-w04-erewhon-1872-context'), '2a', 'Kept as context; W04 keeps de Garis (1989) as its earliest located text.')
# 12a: Erewhon is listed under the U02 headline as the earliest located novel.
decide(rec(b, 'pre-u02-erewhon-1872'), '12a', 'Listed under the U02 headline as the earliest located novel.')
b['codexRetrieval'] = [c for c in b['codexRetrieval'] if not c['item'].startswith("Butler, 'Darwin among the Machines'")]
changes += 1
save('butler.json', b)

# 7 is not decided: the R.U.R. records stay as drafted; only the fulfilled retrieval item goes.
c = load('capek.json')
n = len(c['codexRetrieval'])
c['codexRetrieval'] = [x for x in c['codexRetrieval'] if not x['item'].startswith('Čapek, R.U.R. (Prague')]
assert len(c['codexRetrieval']) == n - 1
changes += 1
save('capek.json', c)

# 6a and 9a: Wiener's Cybernetics admitted with the 2019 attested date; Samuel 1960 held.
w = load('wiener-samuel.json')
for rid in ('pre-m06a-wiener-1948-cybernetics', 'pre-c3-wiener-1948-cybernetics-context', 'pre-w01-wiener-1948-cybernetics-context',
            'pre-u01-wiener-1961-cybernetics-contests'):
    decide(rec(w, rid), '6a', 'Admitted with the attested date (2019) and no headline change; a library is asked for the 1948 printing.')
decide(rec(w, 'pre-u01-samuel-1960'), '9a', 'Held until the article itself is read; not admitted.')
for x in w['codexRetrieval']:
    if x['item'].startswith('Wiener, Cybernetics'):
        setv(x, 'task', 'Library request (decision 6a): compare the three introduction passages (devalue the human brain; nothing to sell; suppression) with the 1948 printing, with page numbers, so the records can carry 1948 as the date of the wording. The Internet Archive copies are marked private; no lending restriction is to be bypassed.')
save('wiener-samuel.json', w)

# 11a: Kolmogorov admitted with the 2023 attested date; the 1963 printing of the theses is sought.
s = load('soviet-and-others.json')
decide(rec(s, 'pre-u02-kolmogorov-1961-letter'), '11a', 'Admitted with the attested date (2023); the 1963 printing of the theses is sought.')
n = len(s['codexRetrieval'])
s['codexRetrieval'] = [x for x in s['codexRetrieval'] if not x['item'].startswith(('Ulam,', 'Jefferson,', 'Hartree,'))]
assert len(s['codexRetrieval']) == n - 3
changes += 1
s['codexRetrieval'].append({'item': "Kolmogorov, theses 'Avtomaty i zhizn'' as printed (1961 or 1963)",
                            'url': "Library: Vozmozhnoe i nevozmozhnoe v kibernetike (Moscow, 1963), as the 2023 commentary reports",
                            'task': 'Library request (decision 11a): locate the printed theses and compare the passage quoted from the letter to Berg, with page numbers.'})
changes += 1
save('soviet-and-others.json', s)

# 8a: Turing 1950 stays context on U02. 10a: the NPL report of 1948 is the dated text, AMT/C/11 its draft.
t = load('turing.json')
decide(rec(t, 'pre-u02-turing-1950'), '8a', 'Kept as context on U02.')
decide(rec(t, 'pre-u02-turing-1947'), '12a', 'Listed under the U02 headline as the earliest located non-fiction text.')
old = {r['id']: r for r in t['records'] if r['id'] in ('pre-u01-turing-c11-contests', 'pre-w01-turing-c11-context')}
assert len(old) == 2
t['records'] = [r for r in t['records'] if r['id'] not in old]
changes += 1
(c11doc,) = [d for d in t['documents'] if d['id'] == 'turing-amt-c-11-intelligent-machinery']
setv(c11doc, 'dateNote', "The archive catalogues the typescript as n.d. It is the draft of the National Physical Laboratory report 'Intelligent Machinery' (1948), on which the pack records the text (decision 10a); the report's date does not date this typescript or its corrections.")
t['documents'].insert(2, {
    'id': 'turing-1948-npl-intelligent-machinery', 'existingEntity': False, 'increment': INC,
    'title': 'Intelligent Machinery (National Physical Laboratory report)',
    'shortName': 'Turing, Intelligent Machinery (NPL report, 1948)', 'subtype': 'Report', 'authors': ['Alan Turing'],
    'date': '1948', 'dateBasis': 'report',
    'dateNote': "Year typed on the report's title sheet ('National Physical Laboratory / Intelligent Machinery / A Report by A. M. Turing / (1948)'); exact day unknown. A pencilled note on the cover records a printing in Machine Intelligence 5 (Edinburgh, 1969), not read. The undated typescript AMT/C/11 is its draft."})
changes += 1
t['sources'].insert(2, {
    'key': 'turing-npl-1948-report', 'cacheKey': 'turing-npl-1948', 'datasetSource': None, 'increment': INC,
    'documentId': 'turing-1948-npl-intelligent-machinery', 'title': "'Intelligent Machinery', a report by A. M. Turing (1948)", 'authors': ['Alan Turing'],
    'publisher': 'National Physical Laboratory, facsimile of the report (PDF)',
    'url': 'https://www.npl.co.uk/getattachment/84156b8e-1b00-45b7-9f5e-3179cfa458c5/80916595-Intelligent-Machinery.pdf?lang=en-US',
    'catalogueUrl': 'https://www.npl.co.uk/about-us/history/famous/alan-turing',
    'httpStatus': 200, 'sha256': '8751a5e654f17de3684856d8ccff6c81bb31f22a28cc9f2d6ee55202b7d78088', 'retrievedAt': INC, 'language': 'en',
    'documentWords': {'count': 10000, 'basis': 'Not counted; estimated as for its draft AMT/C/11 (about 10,000 words). Any count above 8,000 gives the same limit (400 words).'},
    'visualOnly': 'Facsimile without a text layer; quotations read from the page images (pdftoppm at 100 dpi, PDF pages 1–4) on 2026-11-03. Same SHA-256 as the copy the cross-family check read.',
    'version': "Facsimile of the typed report: cover label 'Intelligent Machinery / A.M. Turing / (1948)', title sheet with '(1948)', report pp. 1–2 (PDF pages 3–4) read; on p. 2 the objection label is corrected by hand.",
    'kind': 'report'})
changes += 1
c11_ev = {e['locator']: e for r in old.values() for e in r['evidence']}
NPL = 'turing-npl-1948-report'
t['records'] += [
    {'id': 'pre-u01-turing-1948-npl-contests', 'proposition': 'U01', 'document': 'turing-1948-npl-intelligent-machinery', 'predicate': 'contests_proposition',
     'statement': "Turing's National Physical Laboratory report 'Intelligent Machinery' (1948) lists, among reasons for assuming that machinery cannot show intelligent behaviour, the view that any intelligence a machine shows is nothing but a reflection of its creator's, and answers that this view is like giving a teacher the credit for a pupil's discoveries.",
     'time': {'kind': 'event', 'date': '1948', 'basis': 'report', 'note': "Year on the report's title sheet."},
     'attested': None, 'claimed': None, 'roles': ['contesting'], 'term': None, 'register': 'nonfiction',
     'engagement': {'kind': 'engages-premise', 'rationale': 'Argues that a teacher would not claim the results of a pupil he had not foreseen, and that machines already exist where this arises in a small degree.'},
     'missing': None, 'hazardNote': None, 'increment': INC,
     'qualification': "Recorded on the dated report (decision 10a); the undated typescript AMT/C/11 is its draft and carries the same two passages (pp. 2 and 4). On report p. 2 the objection's label is corrected by hand. Later than Turing's lecture of 1947, the earliest located contesting text.",
     'datasetLink': None,
     'maintainerDecision': {'decision': '10a', 'effect': 'The text is recorded on the 1948 report, with the typescript as its draft; it appears as 1948.'},
     'evidence': [
         {'source': NPL, 'locator': 'Report p. 1 (PDF page 3), objection (e)', 'passage': 'In so far as a machine can show intelligence this is to be regarded as nothing but a reflection of the intelligence of its creator.',
          'passageType': 'quote', 'sourceRole': 'primary', 'support': 'context', 'note': 'Read here on the page image. The objection as the report states it.'},
         {'source': NPL, 'locator': "Report p. 2 (PDF page 4), paragraph beginning 'The view'", 'passage': 'that intelligence in machinery is merely a reflection of that of its creator is rather similar to the view that the credit for the discoveries of a pupil should be given to his teacher.',
          'passageType': 'quote', 'sourceRole': 'primary', 'support': 'supports', 'note': 'Read here on the page image; the label before these words is corrected by hand.'},
         dict(c11_ev['p. 4 (AMT/C/11/4), second paragraph'], support='context', note="The draft's wording (typescript AMT/C/11, n.d.); quoted in the earlier draft record, counted once.")]},
    {'id': 'pre-w01-turing-1948-npl-context', 'proposition': 'W01', 'document': 'turing-1948-npl-intelligent-machinery', 'predicate': 'bears_on_proposition',
     'statement': "Turing's National Physical Laboratory report 'Intelligent Machinery' (1948) gives, as a reason why people assume that machinery cannot show intelligent behaviour, an “unwillingness to admit the possibility that mankind can have any rivals in intellectual power”, and compares it with the possibility of being superseded by another animal species.",
     'time': {'kind': 'event', 'date': '1948', 'basis': 'report', 'note': "Year on the report's title sheet."},
     'attested': None, 'claimed': None, 'roles': ['context'], 'term': None, 'register': 'nonfiction', 'engagement': None,
     'missing': 'A statement that machine intelligence will or could succeed people as the leading intelligence; the passage describes an attitude towards the possibility of rivals.',
     'hazardNote': None, 'increment': INC,
     'qualification': "Turing calls objections (a) and (b) 'purely emotional' (report p. 2). Recorded on the dated report (decision 10a); the typescript AMT/C/11 is its draft and carries the same passage (p. 1).",
     'datasetLink': 'ht-w01-turing-1951-can-digital-computers-think',
     'maintainerDecision': {'decision': '10a', 'effect': 'The text is recorded on the 1948 report, with the typescript as its draft.'},
     'evidence': [{'source': NPL, 'locator': 'Report p. 1 (PDF page 3), reason (a)', 'passage': 'An unwillingness to admit the possibility that mankind can have any rivals in intellectual power.',
                   'passageType': 'quote', 'sourceRole': 'primary', 'support': 'context', 'note': 'Read here on the page image; the typescript (p. 1) has the same words.'}]}]
changes += 1
(sayers,) = [k for k in t['links'] if k['id'] == 'pre-link-turing-c11-names-sayers']
t['links'] = [k for k in t['links'] if k is not sayers]
t['links'].append({'id': 'pre-link-turing-1948-names-sayers', 'from': 'turing-1948-npl-intelligent-machinery', 'to': None, 'toExternal': sayers['toExternal'],
                   'predicate': 'cites', 'increment': INC,
                   'statement': "Turing's National Physical Laboratory report 'Intelligent Machinery' (1948) names Dorothy Sayers's The Mind of the Maker as expressing the belief that machinery is limited to straightforward, even repetitive, jobs.",
                   'qualification': "Turing quotes Sayers's sentence that the nature of a machine is to do the same thing over and over again; Sayers's book was not read. Replaces the link drafted from the typescript AMT/C/11 (decision 10a).",
                   'evidence': [{'source': NPL, 'locator': 'Report p. 1 (PDF page 3), reason (c)', 'passage': 'This attitude is very well expressed by Dorothy Sayers (The Mind of the Maker, p. 46)',
                                 'passageType': 'quote', 'sourceRole': 'primary', 'support': 'supports', 'note': 'Read here on the page image.'}]})
changes += 1
(hl,) = [k for k in t['links'] if k['id'] == 'pre-link-turing-1950-names-hartree-1949']
setv(hl, 'to', 'hartree-1949-calculating-instruments')
setv(hl, 'toExternal', None)
setv(hl, 'qualification', "Hartree's p. 70 was read in the increment of 2026-11-03 (pre-u01-hartree-1949); the addition Turing quotes is there.")
t['codexRetrieval'] = []
changes += 1
for x in t['searchLog']:
    if x['proposition'] == 'U02':
        x['earliestNote'] = 'Turing 1947 is the earliest located non-fiction articulation; Butler (1863, satirical letter) the earliest located articulation and Erewhon (1872) the earliest located novel (decision 12a).'
        changes += 1
save('turing.json', t)

# Earliest-located rows.
e = load('earliest.json')
rows = e['earliestLocated']


def row(prop, role):
    (x,) = [x for x in rows if x['proposition'] == prop and x['role'] == role]
    return x


x = row('U02 (new)', 'earliest located articulation')
setv(x, 'antecedent', 'pre-u02-butler-1863-darwin-among-the-machines (1863-06-13, satirical letter signed Cellarius)')
setv(x, 'deciding', '1863-06-13 (publication; OCR text matched here, wording read on the column images by the cross-family check)')
setv(x, 'outcome', 'proposed (decisions 1a, 12a)')
setv(x, 'headline', 'Earliest located: Butler, Darwin among the Machines (1863), satirical letter. Under it: earliest located novel, Erewhon (1872); earliest located non-fiction text, Turing, LMS lecture (1947).')
x = row('U02 (new)', 'earliest located contesting text')
setv(x, 'antecedent', 'pre-u02-descartes-1637-contests (1637)')
setv(x, 'deciding', '1637 (publication; wording read on the page images of the 1637 edition, here and by the cross-family check)')
setv(x, 'outcome', 'proposed (decision 1a)')
setv(x, 'note', 'Descartes says machines built to resemble human bodies would not act by knowledge but only by the disposition of their organs. Jefferson (BMJ, 1949-06-25) is a later contesting text (pre-u02-jefferson-1949-contests).')
x = row('W01', 'earliest located contesting text')
setv(x, 'outcome', 'decided (4a): becomes W01\'s earliest located contesting text at admission, with the qualification that the quotation is read in the OCR text')
x = row('W04', 'earliest located articulation')
setv(x, 'outcome', 'no change (2a): kept as context')
setv(x, 'note', None)
x = row('C1', 'earliest located articulation')
setv(x, 'antecedent', 'pre-c1-jefferson-1949 (1949-06-25) or pre-c1-descartes-1637-articulates (1637); Turing c. 1951 superseded')
setv(x, 'deciding', '1949-06-25 (publication; delivered 1949-06-09) or 1637 (publication)')
setv(x, 'outcome', 'PENDING decision 5 (Codex second pass): Jefferson 1949 under 5a, Descartes 1637 under 5b')
setv(x, 'note', 'Both texts are earlier than Weizenbaum (1966-01) and Turing (c. 1951). Records for both readings are drafted: pre-c1-descartes-1637-context (5a) and pre-c1-descartes-1637-articulates (5b); exactly one is kept.')
setv(x, 'pendingDecision', {'decision': 5, 'note': 'Not decided by the maintainer on 2026-11-03; sent to a Codex second pass with decision 7.'})
setv(x, 'headline', 'Pending decision 5. Under 5a: earliest located, Jefferson, The Mind of Mechanical Man (1949); Descartes (1637) as context. Under 5b: earliest located, Descartes, Discours de la méthode (1637), qualified by his two tests.')
x = row('M06a', 'earliest located tier-2 text')
setv(x, 'outcome', 'no change (6a): admitted with the attested date 2019; would become the earliest located tier-2 text only if a 1948 printing carries the wording (library request)')
rows[5:5] = [
    {'proposition': 'U03 (new)', 'role': 'earliest located articulation', 'current': None, 'antecedent': 'pre-u03-vinge-1983-first-word (1983-01)',
     'deciding': '1983-01 (publication; read on the page image of the column)', 'outcome': 'proposed (decision 3b)',
     'note': "Within this increment's bounded search. Ulam's 1958 report of a conversation with von Neumann is earlier and is context: it names no machines. Good (1965) was not read against U03 (cross-family brief).",
     'headline': 'Earliest located: Vinge, First Word (Omni, 1983). Ulam (1958) shown as context.'},
    {'proposition': 'U03 (new)', 'role': 'earliest located contesting text', 'current': None, 'antecedent': 'none recorded', 'deciding': '—',
     'outcome': 'none located; not searched in this increment', 'note': None}]
changes += 2
save('earliest.json', e)
print('changes', changes)
