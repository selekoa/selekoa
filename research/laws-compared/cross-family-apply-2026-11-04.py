# Applies the comparison with the cross-family check of the Illinois row
# (cross-family-check-2026-11-04.json, Codex) to the drafts. Run once from
# research/laws-compared/; each edit asserts the state it replaces. The comparison is recorded
# in review/laws-compared-pack-2026-11-02.md ("Illinois row (2026-11-04)").
# Rule (2026-11-02): the drafting family does not overrule the checker on a cell; it applies the
# checker's status or records the cell as held with both reasons.
import json


def load(g):
    return json.load(open(f'drafts/{g}.json', encoding='utf8'))


def save(g, d):
    with open(f'drafts/{g}.json', 'w', encoding='utf8') as f:
        json.dump(d, f, ensure_ascii=False, indent=2)
        f.write('\n')


def cell(d, i, q):
    return next(c for c in d['cells'] if c['instrument'] == i and c['question'] == q)


il = load('us-illinois')
check = json.load(open('cross-family-check-2026-11-04.json', encoding='utf8'))
items = {v['cell_id']: v for v in check['items'].values()}

# Q05: checker stated, preparer partly. Held for the maintainer with both readings.
c = cell(il, 'il-aisma', 'Q05')
assert c['status'] == 'partly' and items['il-aisma:Q05']['status'] == 'stated'
c['note'] += ' Held: see the cell’s held record.'
c['held'] = {
    'preparerStatus': 'partly',
    'checkerStatus': 'stated',
    'checkerReason': 'Large frontier developers must implement and comply with a framework addressing model-capability assessment (Section 10(a)(2)), mitigations based on those assessments and review of assessments and mitigations when deciding to deploy or use a model extensively internally (Section 10(a)(4)): a duty concerning frontier-model risks, not evidence that evaluations occurred (cross-family check 2026-11-04, item 5).',
    'preparerReason': 'The act sets no free-standing duty to assess or test each model; the assessment duty runs through the framework, which describes how the developer “approaches” assessment. The wording is the same as California SB 53 § 22757.12(a), (a)(2) and (a)(4), which the pack records as partly and which the checker, reading it blind on 2026-11-02 (item 17), also read as partly.',
    'recommendation': 'Partly, so that identical wording in the Illinois and California rows has one status (Quick: OK the recommendation). Alternatively stated, and California SB 53 Q05 then goes back to the checker for the same question.',
}

# Q10: checker stated from the official bill status record, which the preparer could not open.
# The checker's status is applied; the quotation is the checker's, labelled as its copy.
c = cell(il, 'il-aisma', 'Q10')
assert c['status'] == 'not-retrieved' and items['il-aisma:Q10']['status'] == 'stated'
copy = 'cross-family-check-2026-11-04.json, item 10 (checker’s copy of the archive capture of 2026-07-31, decoded HTML SHA-256 2aa768a35f7ef8e069b100c34bbc29af444ce8139c39cc1e9e57eca9176c6e4e)'
quotes = [p['quote'] for p in items['il-aisma:Q10']['passages']]
assert quotes == ['7/06/2026 Senate Governor Approved', '5/29/2026 Senate Passed Both Houses'], quotes
c['status'] = 'stated'
c['passages'] = [
    {'source': 'il-sb315-history', 'locator': 'Actions table, “Governor Approved” row (checker’s copy)', 'quote': quotes[0], 'copy': copy},
    {'source': 'il-sb315-history', 'locator': 'Actions table, “Passed Both Houses” row (checker’s copy)', 'quote': quotes[1], 'copy': copy},
]
c['note'] = ('Approval by the Governor, 6 July 2026; passage by both houses, 29 May 2026 (official bill status record of SB 315). '
             'The act’s own text carries no date. Status applied from the cross-family check: the preparer could not retrieve the record, so the quotations are the checker’s and are not matched by the preparer. '
             'Executive Order 2026-07 (22 September 2026) states that the Governor signed the act, without a date; its date is the order’s, not the act’s.')
del c['lead']
il['openQuestions'] = [
    'Q10 quotes the official bill status record from the cross-family checker’s copy (its SHA-256 matches the registry); no preparer session has opened it. Recommendation: accept the checker’s copy as the retrieval for admission, with the passage labelled as such, unless a session can open the capture first.'
]
save('us-illinois', il)

# Word count: the page footer is 10 words, not 9; the checker counts 10,499 (exponent joined).
src = load('sources')
s = next(x for x in src if x['key'] == 'il-pa104-0538')
assert s['documentWords']['count'] == 10556
s['documentWords'] = {
    'count': 10500,
    'basis': 'tools.mjs words on the saved text below its header: 11,060 words over 56 PDF pages, less the two-line page footer (“SB0315 Enrolled LRB104 06438 SPS 16474 b / Public Act 104-0538”, 10 words) on every page. Includes the three printed versions of FOIA Sec. 7.5 (Section 80). The cross-family checker counts 10,499 by the same exclusion, joining “10 26” as one token (check of 2026-11-04).',
}
h = next(x for x in src if x['key'] == 'il-sb315-history')
assert h['version'].startswith('Not retrieved by the preparer.')
h['version'] += ' The checker retrieved the same capture again on 2026-11-04 (HTTP 200; decoded HTML with the same SHA-256) and quotes its Actions rows for Q10; the preparer’s attempts on 2026-11-04 failed (connection reset).'
save('sources', src)

ins = load('instruments')
lst = ins if isinstance(ins, list) else ins['instruments']
i = next(x for x in lst if x['id'] == 'il-aisma')
assert 'not retrieved by the preparer' in i['standingNote']
i['standingNote'] = 'Cells drafted from the saved text of the enacted act (sources/il-pa-104-0538.txt, from the Internet Archive capture of the official PDF). The approval date (Q10) quotes the bill status record from the cross-family checker’s copy.'
save('instruments', ins)
print('applied')
