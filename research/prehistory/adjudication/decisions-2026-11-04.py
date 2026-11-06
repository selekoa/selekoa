#!/usr/bin/env python3
"""Applies the maintainer decisions on the antecedent-texts pack that are complete on 2026-11-04.

Answers (review/decisions/answers-2026-11-03.md): 1a 2a 3b 4a 6a 8a 9a 10a 11a 12a 13a were given on
2026-11-03 and applied by decisions-2026-11-03.py, except that 1a and 13a waited for the bounded check
of the checker-located records, which is now done (cross-family-check-2026-11-03, adjudicated by
apply-2026-11-04.py). New here:
- 5a, the maintainer's answer "P5 a" of 2026-11-04: Jefferson 1949 heads C1; Descartes 1637 is context.
  The checker's narrower reading b, held in both its reports, is kept on the C1 row.
- 7a, settled without a maintainer decision because the second pass agrees with the recommendation:
  R.U.R. states W01, B6 and U02 as fiction, with the synthetic-organism qualification.
Each change asserts that it alters a value. Run once, from the repository root:
python3 -I research/prehistory/adjudication/decisions-2026-11-04.py
"""
import json
from pathlib import Path

D = Path(__file__).resolve().parent.parent / 'drafts'
DATE = '2026-11-04'
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


def drop(obj, key):
    global changes
    assert key in obj, key
    del obj[key]
    changes += 1


def swap(obj, key, old, new):
    assert old in (obj.get(key) or ''), (key, old[:60])
    setv(obj, key, obj[key].replace(old, new))


def rec(j, rid):
    (r,) = [r for r in j['records'] if r['id'] == rid]
    return r


def decide(r, decision, effect, date=DATE):
    setv(r, 'maintainerDecision2' if r.get('maintainerDecision') else 'maintainerDecision',
         {'decision': decision, 'date': date, 'effect': effect})


# ------------------------------------------------------------------ 5a
c = load('checker-located.json')
art = rec(c, 'pre-c1-descartes-1637-articulates')
c['records'] = [r for r in c['records'] if r is not art]
art = dict(art)
art.pop('pendingDecision')
c['withdrawn'] = [{'record': art, 'decision': '5a', 'date': DATE,
                   'reason': 'Drafted for reading 5b; decision 5a keeps pre-c1-descartes-1637-context instead. Kept '
                             'here, outside the pack, as the text the checker would have admitted.'}]
changes += 1

r = rec(c, 'pre-c1-descartes-1637-context')
drop(r, 'pendingDecision')
setv(r, 'missing', 'A claim that apparent capability or understanding shown in a test is weak or misleading '
     'evidence, on the reading of C1 adopted by decision 5a: a behavioural test is a procedure for telling what a '
     'system is, and Descartes proposes two such tests and holds them reliable. That some performances would not '
     'show knowledge is, on this reading, said of performances, not of evidence from a test.')
setv(r, 'qualification', "Context under decision 5a. The cross-family check read the passage as meeting C1 for "
     "restricted probes (a machine's words in response, or some tasks done as well as people, would not show "
     "knowledge) and would have it head C1 (reading b, held in both its reports); it called reading a a restriction "
     "beyond C1's present wording, to be stated in C1 if intended. The admission plan proposes that scope note. "
     'Spelling as printed, long s as s.')
decide(r, '5a', 'Descartes (1637) is context on C1; Jefferson (1949) heads C1. The checker\'s narrower reading b '
       'is noted.')

r = rec(c, 'pre-c1-jefferson-1949')
setv(r, 'roles', ['articulation', 'earliest-located'])
setv(r, 'earliestLocatedFlag', "Decided (5a): C1's earliest located articulation at admission, replacing Weizenbaum "
     '(1966-01). Earlier than Turing (c. 1951). Descartes (1637) is context; the checker would have Descartes head C1 '
     '(reading b).')
decide(r, '5a', "C1's earliest located articulation at admission; Descartes (1637) is context.")
for x in c['searchLog']:
    if x['proposition'] == 'C1':
        setv(x, 'earliestNote', 'Jefferson (1949-06-25) is the earliest located C1 articulation (decision 5a); '
             'Descartes (1637) is earlier and is context on the reading of C1 that decision adopts. Both are earlier '
             'than Turing (c. 1951) and Weizenbaum (1966-01).')
setv(c, 'note', c['note'] + ' Decision 5a (2026-11-04) keeps pre-c1-descartes-1637-context; the alternative record '
     'is under "withdrawn".')
save('checker-located.json', c)

t = load('turing.json')
r = rec(t, 'pre-c1-turing-c1951')
setv(r, 'earliestLocatedFlag', "Superseded: Jefferson's oration (BMJ, 1949-06-25) heads C1 under decision 5a. This "
     'record is a later C1 articulation.')
save('turing.json', t)

# ------------------------------------------------------------------ 7a
k = load('capek.json')
r = rec(k, 'pre-u02-capek-rur-1923-context')
setv(r, 'formerId', r['id'])
setv(r, 'id', 'pre-u02-capek-rur-1923')
setv(r, 'predicate', 'articulates_proposition')
setv(r, 'roles', ['articulation'])
setv(r, 'missing', None)
setv(r, 'statement', 'In the English version of R. U. R. (1923), Domin says that all work will be done by living '
     'machines, and tells Helena that the Robots are mechanically more perfect than people and have an enormously '
     'developed intelligence, but no soul.')
setv(r, 'qualification', "Fiction; characters' lines document what the play stages, not Čapek's view. The Robots "
     'are synthetic organisms made from a living substance; the play calls them machines and ascribes them '
     'intelligence, and under decision 7a they count as machines on U02 as on W01 and B6. Later in the play Dr Gall '
     "says that they have 'ceased to be machines', one character's claim. The Czech printing of 1920 (Aventinum) "
     "calls them 'živé a inteligentní pracovní stroje' (p. 12) and carries the counterpart of the intelligence line "
     '(p. 13), as read by the cross-family check on page images; the English wording is not dated from it.')
setv(r['evidence'][0], 'support', 'supports')
r['evidence'].insert(0, {'source': 'capek-rur-1923-english', 'locator': 'Act One, Domin to Helena and the managers, '
                         "on what the Robots will produce", 'passage': 'All work will be done by living machines.',
                         'passageType': 'quote', 'sourceRole': 'primary', 'support': 'supports',
                         'note': 'The play\'s word for the Robots (decision 7a).'})
changes += 1
decide(r, '7a', 'Recorded as articulating U02, as fiction, with the synthetic-organism qualification (settled by the '
       'second pass agreeing with the recommendation).')
OLD_W01 = ("The Robots are manufactured workers made from a synthetic living substance, not mechanisms; the record "
           "treats them as artificial beings of the play, which meets the criterion's 'machine intelligence' only on "
           "that reading (see the review note).")
NEW_W01 = ('The Robots are manufactured workers made from a synthetic living substance; the play calls them machines, '
           'and under decision 7a they count as machine intelligence on W01, B6 and U02 alike.')
r = rec(k, 'pre-w01-capek-rur-1923')
swap(r, 'qualification', OLD_W01, NEW_W01)
decide(r, '7a', 'Kept as fiction on W01; one boundary across W01, B6 and U02.')
r = rec(k, 'pre-b6-capek-rur-1923')
swap(r, 'qualification', 'The Robots are manufactured from a synthetic living substance, not mechanisms (see the W01 record).',
     'The Robots are manufactured from a synthetic living substance; under decision 7a they count as machines (see the W01 record).')
decide(r, '7a', 'Kept as fiction on B6; one boundary across W01, B6 and U02.')
save('capek.json', k)

# ------------------------------------------------------------------ earliest-located rows: 1a, 3b, 5a, 12a, 13a
e = load('earliest.json')
rows = e['earliestLocated']


def row(prop, role):
    (x,) = [x for x in rows if x['proposition'] == prop and x['role'] == role]
    return x


DONE = 'decided (1a; checked under 13a)'
for prop, role in [('U01 (new)', 'earliest located articulation'), ('U01 (new)', 'earliest located contesting text'),
                   ("U01 (new)", "earliest located use of the usual name ('Lady Lovelace's objection')")]:
    setv(row(prop, role), 'outcome', DONE)
setv(row('U02 (new)', 'earliest located articulation'), 'outcome', 'decided (1a, 12a; checked under 13a)')
setv(row('U02 (new)', 'earliest located contesting text'), 'outcome', DONE)
setv(row('U03 (new)', 'earliest located articulation'), 'outcome', 'decided (3b; checked under 13a)')
x = row('C1', 'earliest located articulation')
setv(x, 'antecedent', 'pre-c1-jefferson-1949 (1949-06-25); Turing c. 1951 superseded; Descartes 1637 context')
setv(x, 'deciding', '1949-06-25 (publication; delivered 1949-06-09)')
setv(x, 'outcome', 'decided (5a): Jefferson becomes C1\'s earliest located articulation at admission, replacing '
     'Weizenbaum (1966-01)')
setv(x, 'note', 'Descartes (1637) is earlier and is context (pre-c1-descartes-1637-context) on the reading of C1 '
     'adopted by decision 5a: a behavioural test is a procedure for telling what a system is. The checker held, in '
     'both its reports, that Descartes meets C1 as worded for restricted probes (reading b); its reading is printed '
     'below. The admission plan proposes a scope note on C1 stating reading a.')
drop(x, 'pendingDecision')
setv(x, 'maintainerDecision', {'decision': '5a', 'date': DATE, 'words': 'P5 a'})
setv(x, 'headline', 'Earliest located: Jefferson, The Mind of Mechanical Man (1949). Descartes, Discours de la '
     'méthode (1637), shown as context.')
save('earliest.json', e)

# 7a has no earliest-located effect (Butler 1863 heads W01, B6 and U02).
print('changes', changes)
