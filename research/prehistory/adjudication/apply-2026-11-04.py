#!/usr/bin/env python3
"""Applies the adjudication of the cross-family check of the 2026-11-03 increment
(cross-family-check-2026-11-03.json, OpenAI Codex, checked 2026-11-04; branch
codex/prehistory-check-2 at 5cad926) to the drafts.

19 report items: 14 agree, 3 minor (A1.2 search scope, A2.2 engagement label,
B5 Vinge locator), 2 material (D1, D2: the second pass on decisions 5 and 7).
Corrections are applied here; the material items are decided by the maintainer
(5a) or settled by the second pass (7a) and are applied by decisions-2026-11-04.py.
Each record or link the check covered gets a `crossFamily2` field naming the items
and the result. Every change asserts that it alters a value.
Run once, from the repository root: python3 -I research/prehistory/adjudication/apply-2026-11-04.py
"""
import json
from pathlib import Path

D = Path(__file__).resolve().parent.parent / 'drafts'
REPORT = 'cross-family-check-2026-11-03'
changed = []


def load(name):
    return json.loads((D / name).read_text())


def save(name, j):
    (D / name).write_text(json.dumps(j, indent=1, ensure_ascii=False) + '\n')


def put(obj, key, new, label):
    assert obj.get(key) != new, f'no change: {label}.{key}'
    obj[key] = new
    changed.append(f'{label}.{key}')


def swap(obj, key, old, new, label):
    assert old in (obj.get(key) or ''), f'not found in {label}.{key}: {old[:60]}'
    put(obj, key, obj[key].replace(old, new), label)


def mark(obj, items, result, **extra):
    put(obj, 'crossFamily2', {'report': REPORT, 'items': items, 'result': result, **extra}, obj.get('id', 'row'))


def item(j, rid, kind='records'):
    (x,) = [x for x in j[kind] if x['id'] == rid]
    return x


# ---------------------------------------------------------------- singularity.json
s = load('singularity.json')

# B5 (minor): the Ulam quotation and Vinge's comment are on printed p. 13 (PDF page 3),
# not p. 12; reference [27] is on p. 22 (PDF page 12). Confirmed here on the text layer.
k = item(s, 'pre-link-vinge-1993-names-ulam-1958', 'links')
put(k['evidence'][0], 'locator', 'Printed p. 13 (PDF page 3), top: the paragraph that begins at the foot of p. 12 '
    '“In the 1950s there were very few who saw it”', k['id'] + '.evidence[0]')
put(k['evidence'][0], 'note', "Reference [27], printed p. 22 (PDF page 12): 'Ulam, S., Tribute to John von Neumann, "
    "Bulletin of the American Mathematical Society, vol 64, nr 3, part 2, May, 1958'.", k['id'] + '.evidence[0]')
put(k['evidence'][1], 'locator', 'Printed p. 13 (PDF page 3), after the quoted sentence', k['id'] + '.evidence[1]')
mark(k, ['B5'], 'corrected: locators p. 12 to p. 13 (PDF page 3); reference [27] on p. 22. Citation and quotations agreed.')

# C2 / B2 (agree): the checker read p. 5 on the archived and the live publisher PDF, byte-identical.
# Not reachable from this session (archive: connection reset; ams.org: HTTP 403, 2026-11-04).
(src,) = [x for x in s['sources'] if x['key'] == 'ulam-1958-bams-codex']
put(src, 'url', 'https://web.archive.org/web/20101225214230id_/http://www.ams.org/journals/bull/1958-64-03/'
    'S0002-9904-1958-10189-5/S0002-9904-1958-10189-5.pdf', src['key'])
put(src, 'httpStatus', 200, src['key'])
put(src, 'sha256', '7819f7b4b1acdd2399beb09ff122ea9dce9c28b129567a8e2c81228c31954280', src['key'])
put(src, 'retrievedAt', '2026-11-04', src['key'])
del src['unverifiedCopy']
changed.append(src['key'] + '.unverifiedCopy (removed)')
put(src, 'matchedElsewhere', 'Read by the cross-family check (item C2, 2026-11-04) on the page image of p. 5 in the '
    'archived publisher PDF (capture 2010-12-25T21:42:30Z) and in the live publisher PDF, which are byte-identical '
    '(SHA-256 above). Not read by the preparer: from this session ams.org answered HTTP 403 and web.archive.org '
    'reset the connection (2026-11-03 and 2026-11-04). Vinge (1993, p. 13) quotes the same words.', src['key'])
put(src, 'version', "Copy used: the publisher's PDF as retrieved and read by the cross-family check (Codex, "
    '2026-11-04), labelled as such.', src['key'])
r = item(s, 'pre-u03-ulam-1958-context')
swap(r, 'qualification', "The quotation was not verified here: it is the cross-family check's reading of the "
     'archived AMS PDF; Vinge (1993) quotes the same words.',
     'The quotation was read word for word on the page image by the cross-family check (items B2, C2), not by the '
     'preparer, whose requests to both hosts were refused.', r['id'])
put(r['evidence'][0], 'note', 'Verified by the cross-family check on the page image (C2); not read by the preparer '
    '(see the source).', r['id'] + '.evidence')
mark(r, ['B2', 'C2'], 'agreed: quotation verbatim on p. 5 of the publisher PDF (archived and live copies identical); '
     'a report of an undated conversation; context.')
n = len(s['codexRetrieval'])
s['codexRetrieval'] = [x for x in s['codexRetrieval'] if not x['item'].startswith('Ulam,')]
assert len(s['codexRetrieval']) == n - 1
changed.append('singularity.codexRetrieval (Ulam fulfilled)')
put(s['retrievalFailures'][0], 'fallback', "The cross-family check's copies (archived and live publisher PDF, "
    'identical), read by it on the page image; ams.org answered HTTP 403 again on 2026-11-04.', 'singularity.retrievalFailures[0]')

# A1.1 (agree) and A1.2 (minor): the checker read Good against U03 and searched for a contest.
(log,) = s['searchLog']
put(log, 'searched', log['searched'] + ' The cross-family check (2026-11-04, A1.1, A1.2) also read Good (pp. 31–33), '
    'Ulam p. 5, Turing c. 1951, Campbell, The Last Evolution (a 2008 transcription of a later reprint), Descartes '
    '1637 pp. 56–57, Lucas 1961 p. 112 and Dreyfus 1965 p. 6.', 'searchLog U03')
put(log, 'earliestNote', 'Vinge (1983-01) is the earliest located articulation in these bounded searches; the checker '
    'agrees. Ulam (1958) is earlier but names no machines and is context. Good (dated 1965 in the dataset; the '
    'publisher\'s metadata says 1966) is a near match read by the checker as bearing on U03: it states an '
    "'intelligence explosion' and a last invention, not a point beyond which human affairs could not continue or "
    'be foreseen. Contest: no text that disputes the singular transition itself was located. The checker reads '
    "Descartes (1637) as a qualified contest of a premise (that a constructed machine could reach general, "
    "human-like reason), which bears on the machine route only, not on amplified human intelligence; it is noted "
    'here and not recorded on U03. Earliest located means earliest found, not first; a negative search does not '
    'establish absence.', 'searchLog U03')
(good,) = [o for o in s['omissions'] if o['item'].startswith('Good,')]
put(good, 'reason', 'In the dataset on A1. Read against U03 by the cross-family check (A1.1, pp. 31–33): a near '
    'match that bears on U03 but does not state a point beyond which human affairs could not continue or be '
    'foreseen. Not recorded; a later increment could add it as context. Its printing year (1965 or 1966) is '
    'unresolved.', 'omission Good')
for rid, items in [('pre-u03-vinge-1983-first-word', ['A1.1', 'A2.1']), ('pre-u03-vinge-1993', ['B1'])]:
    r = item(s, rid)
    mark(r, items, 'agreed: classification, dates, locator and paraphrase or quotations.')
r = item(s, 'pre-u03-vinge-1983-first-word')
swap(r, 'qualification', "which read Vinge (1983, 1993) and Ulam (1958, as relayed)",
     'which read Vinge (1983, 1993) and Ulam (1958), and the cross-family check\'s search (Good, Turing, Campbell, '
     'Descartes, Lucas, Dreyfus)', r['id'])
save('singularity.json', s)

# ---------------------------------------------------------------- earliest.json
e = load('earliest.json')
rows = e['earliestLocated']


def row(prop, role):
    (x,) = [x for x in rows if x['proposition'] == prop and x['role'] == role]
    return x


x = row('U03 (new)', 'earliest located articulation')
put(x, 'note', "Within the bounded searches of the increment and the cross-family check. Ulam's 1958 report of a "
    'conversation with von Neumann is earlier and is context: it names no machines. Good (1965) was read by the '
    'checker as bearing on U03, not meeting it (A1.1).', 'EL U03 articulation')
mark(x, ['A1.1'], 'agreed.')
x = row('U03 (new)', 'earliest located contesting text')
put(x, 'outcome', 'none located in a bounded search (cross-family check A1.2); no headline', 'EL U03 contest')
put(x, 'note', "No text was located that disputes the singular transition itself. The checker reads Descartes "
    '(1637) as a qualified contest of a premise of the machine route only; it is noted in the search log, not '
    'recorded. A negative search does not establish absence.', 'EL U03 contest')
mark(x, ['A1.2'], 'minor: the search scope is stated; the qualified Descartes premise contest is noted, not recorded.')
x = row('C1', 'earliest located articulation')
put(x, 'crossFamily2', {'report': REPORT, 'items': ['D1'], 'result': 'material, second pass: the checker narrows to '
    'reading b (Descartes 1637 heads C1, qualified) under C1 as worded; it gives reading a if "a behavioural test" '
    'is read as the full discriminating procedure and C1 says so. Left to the maintainer.',
    'readings': {'checker (Codex), second pass': 'C1 says "a" test, "such as" the imitation game; a restricted '
                 'elicitation of speech or a selected successful action is a test, so Descartes 1637 meets C1, '
                 'qualified by his two broader discriminators, with Jefferson 1949 a later articulation. Reading a '
                 'adds a restriction to the present wording; if intended, state it in C1 and use Descartes as context.'}},
    'EL C1')
save('earliest.json', e)

# ---------------------------------------------------------------- checker-located.json
c = load('checker-located.json')

# C1 (agree): the PMC page images of p. 1110 and p. 1105 carry the same wording and the dates.
# Fetched and read here on 2026-11-04; the hashes match the checker's.
c['sources'].append({
    'key': 'jefferson-1949-pmc-scans', 'cacheKey': 'jefferson-pmc-1110', 'datasetSource': None, 'increment': '2026-11-04',
    'documentId': 'jefferson-1949-mind-of-mechanical-man', 'title': 'The Mind of Mechanical Man (BMJ, 25 June 1949), page scans',
    'authors': ['Geoffrey Jefferson'], 'publisher': 'British Medical Journal 1 (4616), pp. 1105–1110; page scans in PubMed Central (PMC2050428)',
    'url': 'https://cdn.ncbi.nlm.nih.gov/pmc/blobs/00e8/2050428/1e370ebbd4ad/brmedj03683-0008.png',
    'catalogueUrl': 'https://pmc.ncbi.nlm.nih.gov/articles/PMC2050428/',
    'httpStatus': 200, 'sha256': 'c7740569465eb6b32b0d59294341d80f35d3fb731ea43a5bf691aa04c060cce3', 'retrievedAt': '2026-11-04',
    'language': 'en',
    'documentWords': {'count': 9000, 'basis': 'Not counted; estimated from six two-column journal pages. Any count above 8,000 gives the same limit (400 words).'},
    'visualOnly': 'Page image of p. 1110 (PMC scan brmedj03683-0008.png), read here on 2026-11-04 and by the cross-family check (C1), same SHA-256. '
                  'The p. 1105 scan (brmedj03683-0003.png, SHA-256 d5ce80c5fd86f04a…) gives the issue date and the delivery date. '
                  "The PMC PDF still answers a browser challenge.",
    'version': 'PubMed Central scans of the journal pages; replaces the third-party facsimile as the evidence source (same wording).',
    'kind': 'article'})
changed.append('source jefferson-1949-pmc-scans (new)')
(fac,) = [x for x in c['sources'] if x['key'] == 'jefferson-1949-bmj-facsimile']
put(fac, 'version', fac.get('version', '') + ' Superseded as the evidence source by the PubMed Central scans '
    '(jefferson-1949-pmc-scans), whose wording agrees (cross-family check C1; read here 2026-11-04).', fac['key'])
for rid in ('pre-c1-jefferson-1949', 'pre-u02-jefferson-1949-contests'):
    r = item(c, rid)
    for ev in r['evidence']:
        put(ev, 'source', 'jefferson-1949-pmc-scans', rid + '.evidence')
        put(ev, 'note', 'Read here on the PubMed Central page image (2026-11-04) and by the cross-family check (C1); '
            'the third-party facsimile read on 2026-11-03 has the same wording.', rid + '.evidence')
n = len(c['codexRetrieval'])
c['codexRetrieval'] = [x for x in c['codexRetrieval'] if not x['item'].startswith('Jefferson,')]
assert len(c['codexRetrieval']) == n - 1
changed.append('checker-located.codexRetrieval (Jefferson fulfilled)')

# A2.2 (minor): the checker corrects its own blind engagement label; the pack's contrary-only stands.
mark(item(c, 'pre-u02-jefferson-1949-contests'), ['A2.2', 'C1'],
     "agreed after comparison: contests U02; the checker withdraws its blind engages-premise label and calls the "
     "pack's contrary-only label more precise. No change.")
mark(item(c, 'pre-c1-jefferson-1949'), ['D1', 'C1'], 'agreed: statement, quotation, locator and dates; evidence source moved to the PMC scans.')
mark(item(c, 'pre-u02-butler-1863-darwin-among-the-machines'), ['A2.3'],
     'agreed: articulates U02, satirical letter; both quotations confirmed on the archived column image, including "Their minds will be".')
r = item(c, 'pre-u02-butler-1863-darwin-among-the-machines')
swap(r, 'qualification', "and the image readings ('self-acting', 'the') are the cross-family check's.",
     "and the image readings ('self-acting', 'the') are the cross-family check's, made twice (2026-11-03 and, for "
     'this record, 2026-11-04, A2.3).', r['id'])
mark(item(c, 'pre-u01-hartree-1949'), ['A2.4'], 'agreed: articulates U01 for the equipment discussed; the openness about future equipment is kept.')
r = item(c, 'pre-u01-hartree-1949')
swap(r, 'qualification', "The next paragraph leaves open whether electronic equipment could be built that would "
     "'think for itself' or learn;",
     "The next paragraph leaves open whether electronic equipment could be built that would 'think for itself' or "
     "learn, and adds 'Whether this is possible in principle or not' (cross-family check A2.4);", r['id'])
mark(item(c, 'pre-u02-descartes-1637-contests'), ['A2.6'], 'agreed: contests U02 (engages premise), nonfiction, 1637; quotations match the printed wording.')
mark(item(c, 'pre-c1-descartes-1637-context'), ['D1'], "quotations and locators agreed. The checker notes that the "
     "missing-element rationale holds only under reading a of C1, not as an undisputed absence in the passage.")
mark(item(c, 'pre-c1-descartes-1637-articulates'), ['D1'], 'quotations and locators agreed; the checker keeps this '
     'record under reading b, with the restricted probes stated. Exactly one of the two Descartes C1 records survives.')
mark(item(c, 'pre-link-hartree-1949-names-lovelace-1843', 'links'), ['B4'], 'agreed: a citation link, not influence.')
save('checker-located.json', c)

# ---------------------------------------------------------------- turing.json
t = load('turing.json')
mark(item(t, 'pre-u01-turing-1948-npl-contests'), ['A2.5'], 'agreed: contests U01 (engages premise); the typescript AMT/C/11 keeps its own wording and label.')
mark(item(t, 'pre-w01-turing-1948-npl-context'), ['B3'], 'agreed: context; the report states an attitude, not a forecast of succession.')
mark(item(t, 'pre-link-turing-1950-names-hartree-1949', 'links'), ['B6'], 'agreed.')
mark(item(t, 'pre-link-turing-1948-names-sayers', 'links'), ['B7'], "agreed; Sayers's book itself not checked.")
save('turing.json', t)

# ---------------------------------------------------------------- capek.json (D2: marked; applied by the decisions script)
k = load('capek.json')
mark(item(k, 'pre-u02-capek-rur-1923-context'), ['D2'], 'material, second pass: the checker holds reading a (the '
     'Robots count as machines for U02 as for W01 and B6, with the synthetic-organism qualification and speaker '
     'attribution); a uniformly non-biological boundary would give c on all three. Settles decision 7 as recommended.')
save('capek.json', k)

print(len(changed), 'changes')
