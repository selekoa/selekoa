"""Build review/absence-sweep-apply-2-2026-11-03.json, the spec that
scripts/apply-recheck.ts applies for part 2 of the textual absence-claims sweep
(review/absence-claims-sweep-2026-11-02.md and .json, Codex, branch
codex/absence-claims-sweep at b7b6bbe): every record marked "absence fails" or
"scope issue" that part 1 (review/absence-sweep-apply-part1-2026-11-02.md,
v0.26.2) did not apply is corrected to what the source supports, using the
sweep's passage and locator. Unverifiable and excluded (aib-, ab-) records are
left alone.

    python3 scripts/absence-sweep-apply-2-spec.py            write the spec
    python3 scripts/absence-sweep-apply-2-spec.py --verify   also check that each
                                                             quotation the spec
                                                             writes is in the
                                                             sweep report or the
                                                             stored evidence

Every patch names the value it replaces, so a patch built on stale data stops
the apply script. The spec is built against the stored data before the
corrections (the data reverted through the spec's own before-snapshot, if any).
"""
import copy, json, os, re, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SPEC = 'review/absence-sweep-apply-2-2026-11-03.json'
SNAP = 'review/absence-sweep-apply-2-before-2026-11-03.json'
DATE = '2026-11-03'
SWEEP = 'review/absence-claims-sweep-2026-11-02.md'
SWEEP_JSON = 'review/absence-claims-sweep-2026-11-02.json'
PART1_JSON = 'review/absence-claims-sweep-2026-11-02-part1.json'
RECORD = 'review/absence-sweep-apply-part2-2026-11-03.md'


def load(name):
    return json.load(open(os.path.join(ROOT, 'data', name + '.json'), encoding='utf8'))


tables = {n: load(n) for n in ['entities', 'claims', 'sources', 'evidence']}
if os.path.exists(os.path.join(ROOT, SNAP)):
    snap = json.load(open(os.path.join(ROOT, SNAP), encoding='utf8'))
    for n, rows in tables.items():
        before = {r['id']: r for r in snap['before'][n]}
        added = set(snap['added'][n])
        tables[n] = [before.get(r['id'], r) for r in rows if r['id'] not in added]
INDEX = {n: {r['id']: r for r in rows} for n, rows in tables.items()}
REPORT = {r['claimId']: r for r in json.load(open(os.path.join(ROOT, SWEEP_JSON), encoding='utf8'))['records']}
PART1 = {r['claimId'] for r in json.load(open(os.path.join(ROOT, PART1_JSON), encoding='utf8'))['records']
         if r.get('verdict') in ('absence fails', 'scope issue')}


def at(row, path):
    for k in path.split('.'):
        if row is None or k not in row:
            return None
        row = row[k]
    return row


def patch(table, rid, path, new=None, remove=False):
    row = INDEX[table][rid]
    p = {'table': table, 'id': rid, 'path': path}
    old = at(row, path)
    if old is not None:
        p['old'] = copy.deepcopy(old)
    if remove:
        p['remove'] = True
    else:
        if old == new:
            raise SystemExit(f'{table}/{rid} {path}: no change')
        p['new'] = new
    return p


def replace(table, rid, path, old_text, new_text):
    value = at(INDEX[table][rid], path)
    if value.count(old_text) != 1:
        raise SystemExit(f'{table}/{rid} {path}: {old_text!r} found {value.count(old_text)} times')
    return patch(table, rid, path, value.replace(old_text, new_text))


def sweep_ref(number):
    return f'the textual absence-claims sweep of 2026-11-02, completed 2026-11-03 ({SWEEP}, record {number})'


def evidence_fix(eid, number, what, reread):
    """checkedAt and a correction sentence appended to the evidence note."""
    how = (
        'The session applying the correction re-read the sweep’s passage in the source as served on 2026-11-03.'
        if reread
        else 'The session applying the correction took the passage and locator from the sweep, which read the source on 2026-11-03, and did not retrieve it again.'
    )
    note = INDEX['evidence'][eid]['note']
    dated = [] if INDEX['evidence'][eid]['checkedAt'] == DATE else [patch('evidence', eid, 'checkedAt', DATE)]
    return [
        *dated,
        patch('evidence', eid, 'note', f'{note} Corrected on {DATE} after {sweep_ref(number)}: {what} {how} Recorded in {RECORD}.'),
    ]


corrections = []


def add(cid, decision, patches, reread, disagreement=None):
    r = REPORT[cid]
    if r['verdict'] not in ('absence fails', 'scope issue'):
        raise SystemExit(f'{cid}: verdict {r["verdict"]}')
    c = {
        'id': f'sweep-{r["number"]}:{cid}',
        'item': r['number'],
        'verdict': r['verdict'],
        'finding': r['findings'],
        'decision': decision,
        'reread': reread,
        'patches': patches,
    }
    if disagreement:
        c['disagreement'] = disagreement
    corrections.append(c)


def first_ev(cid):
    return INDEX['claims'][cid]['evidenceIds'][0]


Q = 'the record’s qualification no longer states the absence the sweep found too broad or contradicted; this passage is unchanged.'
T = 'the record’s time note no longer says that no archive capture was available; this passage is unchanged.'
D = 'Brief 08 and the task of 2026-11-03: correct the qualification or note to what the source supports, using the sweep’s passage and locator.'
R = ' The earliest located role stays: the correction removes no passage the role rests on.'

# ---------------------------------------------------------------- risk debate (rd-)
cid = 'rd-r11-dair-2023-statement'
add(cid, D, [
    patch('claims', cid, 'qualification',
          'The statement criticises the letter’s framing: anthropomorphic language misattributes agency, which lies with the builders, and the focus on hypothetical risks distracts from current harms. It does not separately evaluate the technical evidence for a specified future-catastrophe mechanism.'),
    *evidence_fix(first_ev(cid), 254, Q, True),
], True)

cid = 'rd-r12-marcus-2023-ai-risk-agi-risk'
add(cid, D + R, [
    patch('claims', cid, 'qualification',
          'The concluding argument about the ranking of risks is general. The post also engages Hinton’s reported remarks, the Future of Life Institute letter and a named Europol report, without replying point by point to one text.'),
    *evidence_fix(first_ev(cid), 258, Q, True),
], True)

cid = 'rd-r13-altman-2024-intelligence-age'
add(cid, D, [
    replace('claims', cid, 'qualification',
            'it gives no argument against specific arguments for a plateau, and does not address risk.',
            'it gives no argument against specific arguments for a plateau. It does discuss risks and harms: it calls for navigating the risks and minimising harms, warns that without enough infrastructure AI could become a scarce resource fought over in wars and a tool mostly for the rich, and expects significant change in labour markets.'),
    *evidence_fix(first_ev(cid), 263, 'the record’s qualification no longer says that the essay does not address risk; this passage is unchanged.', True),
], True)

cid = 'rd-r15-kapoor-narayanan-2023-llama-out-of-bag'
add(cid, D, [
    replace('claims', cid, 'qualification',
            'Limited to disinformation and spam;',
            'Focused on disinformation and spam; the further reading also covers fraud, and an update discusses experiments with malware, saying that such misuse in actual attacks would count against open-sourcing;'),
    *evidence_fix(first_ev(cid), 273, Q, True),
], True)

cid = 'rd-r15-narayanan-kapoor-2024-not-model-property'
add(cid, D, [
    replace('claims', cid, 'qualification',
            'the authors call for a more rigorous assessment of marginal risk rather than concluding that it is low.',
            'the authors call for assessing marginal risk case by case, report it low for automated vulnerability detection and substantial for non-consensual intimate imagery (recommendation 2), and draw no general conclusion that it is low for open release.'),
    *evidence_fix(first_ev(cid), 277, Q, True),
], True)

cid = 'rd-r16-brooks-2017-seven-deadly-sins'
add(cid, D, [
    replace('claims', cid, 'qualification',
            "Brooks names no timescale beyond 'over time'.",
            "for the adaptation it describes, Brooks gives an order (increasingly capable systems, a world already changed) and no duration beyond 'over time'; the article discusses other timing horizons elsewhere."),
    *evidence_fix(first_ev(cid), 280, Q, True),
], True)

cid = 'rd-r17-askell-2019-cooperation'
add(cid, D, [
    replace('claims', cid, 'qualification',
            'it does not address catastrophic risk specifically and proposes cooperation strategies rather than measuring incentives.',
            'it discusses irreversible or catastrophic safety failures, the limits of liability for very large harms and discontinuous progress (introduction and section 1.4), and proposes cooperation strategies from an analytical account of incentives rather than measuring them.'),
    *evidence_fix(first_ev(cid), 281, 'the record’s qualification no longer says that the paper does not address catastrophic risk; this passage is unchanged.', True),
], True)

cid = 'rd-r14-bubeck-2023-sparks-agi'
add(cid, D, [
    replace('claims', cid, 'qualification',
            'the paper concerns understanding and capability, not whether the model pursues goals of its own.',
            'the paper assesses understanding and capability. It distinguishes these from inner motivation and goals (section 1) and treats equipping language models with agency and intrinsic motivation as future work (section 10.1); it does not establish that GPT-4 pursues goals of its own.'),
    *evidence_fix(first_ev(cid), 364, 'the record’s qualification no longer says that the paper does not concern goals; this passage is unchanged.', True),
], True)

# ---------------------------------------------------------------- heterodox thought (ht-)
cid = 'ht-w02-faggella-2023-worthy-successor'
add(cid, D, [
    replace('claims', cid, 'qualification',
            'the cross-family check did not find them in the archive capture of 26 February 2024, which states the successor aim in other words.',
            'their wording (the opening note, the sentence mentioning BCI and the concluding sentence) is absent from the archive capture of 26 February 2024, whose opening already states the core worthy-successor aim, without BCI, in other words.'),
    *evidence_fix(first_ev(cid), 301, 'the record’s qualification now limits what the archive capture lacks to the exact wording; this passage is unchanged.', False),
], False)

cid = 'ht-w06-land-2014-teleological-identity'
add(cid, D, [
    replace('claims', cid, 'qualification',
            'the remarks pose the identity as a thesis and a question for discussion and give no argument for it.',
            'the remarks pose the identity as a thesis and a question for discussion; they sketch supporting analogies (spontaneous order, Kelly and the Santa Fe work, markets, distributed computation) without demonstrating the identity.'),
    *evidence_fix(first_ev(cid), 313, Q, False),
], False)

cid = 'ht-w07-bostrom-2012-superintelligent-will'
add(cid, D + R, [
    replace('claims', cid, 'qualification',
            'it does not discuss the growth of intelligence as an end.',
            'it does not advocate the growth of intelligence as a final end; section 2.3 treats cognitive enhancement as an instrumental goal and notes that an agent “might not value knowledge and understanding for their own sakes”.'),
    *evidence_fix(first_ev(cid), 318, Q, True),
], True)

cid = 'ht-w09-degaris-2001-building-gods'
add(cid, D, [
    patch('claims', cid, 'qualification',
          "States an evolutionary framing as the author's own view; the 'cosmic tragedy' paragraph is a personal judgement not derived from physics. Earlier paragraphs separately argue for artilect capacity from Moore's law, atomic-scale storage and switching speed."),
    *evidence_fix(first_ev(cid), 327, Q, True),
], True)

# ---------------------------------------------------------------- economics (ec-)
OLD_T = 'Checked in a current copy; an archive capture was not available, so earlier bytes are not authenticated.'
NEW_T = 'Checked in a current copy. The textual absence-claims sweep (2026-11-03) found the live PDF byte-identical to the archive capture of 8 October 2026; no 2013-era copy is authenticated.'

cid = 'ec-m07-frey-osborne-2013-future-of-employment-a'
add(cid, D + R + ' The qualification is unchanged: it already states technical susceptibility, not actual job losses; the sweep’s finding concerns archival coverage, which the time note states.', [
    replace('claims', cid, 'time.note', OLD_T, NEW_T),
    *evidence_fix(first_ev(cid), 357, T, False),
], False, 'The sweep marks the qualification as a scope issue too; its finding concerns only archival coverage, which belongs in the time note. The qualification already says the figure is technical susceptibility, not a forecast of job loss, so it is left unchanged.')

cid = 'ec-m09-frey-osborne-2013-future-of-employment-b'
add(cid, D, [
    replace('claims', cid, 'qualification',
            'A gap claim about quantification of future employment effects, not about economic study of machine intelligence generally;',
            'A gap claim the authors qualify (“To our knowledge”), about quantification of future employment effects, not an established absence of such studies and not about economic study of machine intelligence generally;'),
    replace('claims', cid, 'time.note', OLD_T, NEW_T),
    *evidence_fix(first_ev(cid), 358, 'the record’s qualification now says the gap claim is the authors’ knowledge-qualified statement, and its time note no longer says that no archive capture was available; this passage is unchanged.', False),
], False)

flagged = {cid for cid, r in REPORT.items() if r.get('verdict') in ('absence fails', 'scope issue')} - PART1
done = {c['id'].split(':', 1)[1] for c in corrections}
if flagged != done:
    raise SystemExit(f'not covered: {sorted(flagged - done)}; extra: {sorted(done - flagged)}')
for cid in done:
    if cid.startswith(('aib-', 'ab-')):
        raise SystemExit(f'{cid}: excluded by the maintainer')

spec = {
    'description': 'Part 2 of the textual absence-claims sweep of 2026-11-02, completed 2026-11-03 (review/absence-claims-sweep-2026-11-02.md, Codex, branch codex/absence-claims-sweep at b7b6bbe): every record marked “absence fails” or “scope issue” that part 1 did not apply, corrected to what the source supports, with the sweep’s passage and locator. No earliest located role is withdrawn. The full record is in review/absence-sweep-apply-part2-2026-11-03.md. Applied by scripts/apply-recheck.ts; built by scripts/absence-sweep-apply-2-spec.py.',
    'date': DATE,
    'schemaVersion': json.load(open(os.path.join(ROOT, 'data/meta.json'), encoding='utf8'))['schemaVersion'],
    'snapshotPath': SNAP,
    'snapshotDescription': 'Rows changed by part 2 of the textual absence-claims sweep of 2026-11-02 (scripts/apply-recheck.ts, review/absence-sweep-apply-2-2026-11-03.json). Reverting it (src/editorial/historical-views.ts) reproduces the dataset as it was at baseCommit.',
    'corrections': corrections,
}

if '--verify' in sys.argv:
    sweep = open(os.path.join(ROOT, SWEEP_JSON), encoding='utf8').read()
    evidence = json.dumps(tables['evidence'], ensure_ascii=False)
    norm = lambda s: re.sub(r'\s+', ' ', s).replace('’', "'").replace('“', '"').replace('”', '"').lower()
    quotes = []
    for c in corrections:
        for p in c['patches']:
            if p['table'] == 'claims' and isinstance(p.get('new'), str):
                old = p.get('old') or ''
                for q in re.findall(r'“([^”]+)”', p['new']):
                    if q not in old:
                        quotes.append((c['id'], q))
    for cid, q in quotes:
        if norm(q) not in norm(sweep) and norm(q) not in norm(evidence):
            raise SystemExit(f'{cid}: {q!r} is neither in the sweep nor in stored evidence')
    print(f'Verified: {len(quotes)} new quotations are in the sweep report or stored evidence.')

with open(os.path.join(ROOT, SPEC), 'w', encoding='utf8') as f:
    json.dump(spec, f, ensure_ascii=False, indent=2)
    f.write('\n')
print(f'Wrote {SPEC}: {len(corrections)} corrections, {sum(len(c["patches"]) for c in corrections)} patches.')
