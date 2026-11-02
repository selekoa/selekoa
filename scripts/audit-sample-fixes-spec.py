"""Build review/audit-sample-fixes-2026-11-02.json, the spec that
scripts/apply-recheck.ts applies for the maintainer's decisions of 2026-11-02
on the blind cross-family audit sample
(review/cross-family-audit-sample-2026-11-02.md, Codex) and on the Turing 1951
lead (research/turing-1951-lead-2026-11-02/report.md, Codex).

    python3 scripts/audit-sample-fixes-spec.py            write the spec
    python3 scripts/audit-sample-fixes-spec.py --verify   also check that each
                                                          quotation the spec
                                                          writes is in the audit
                                                          or the Turing report

Every patch names the value it replaces, so a patch built on stale data stops
the apply script. The spec is built against the stored data before the
decisions (the data reverted through the spec's own before-snapshot, if any).
"""
import copy, json, os, re, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SPEC = 'review/audit-sample-fixes-2026-11-02.json'
SNAP = 'review/audit-sample-fixes-before-2026-11-02.json'
DATE = '2026-11-02'
AUDIT = 'review/cross-family-audit-sample-2026-11-02.md'
TURING = 'research/turing-1951-lead-2026-11-02/report.md'
RECORD = 'review/audit-sample-fixes-2026-11-02.md'


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


def audit_ref(item):
    return f'the cross-family audit sample of 2026-11-02 ({AUDIT}, item {item})'


def evidence_fix(eid, item, what, reread):
    """checkedAt and a correction sentence appended to the evidence note."""
    how = (
        'The session applying the correction re-read the passage in the source as served on 2026-11-02.'
        if reread
        else 'The session applying the correction took the passage and locator from the audit and did not retrieve the source again.'
    )
    note = INDEX['evidence'][eid]['note']
    return [
        patch('evidence', eid, 'checkedAt', DATE),
        patch(
            'evidence',
            eid,
            'note',
            f'{note} Corrected on {DATE} after {audit_ref(item)}: {what} {how} Recorded in {RECORD}.',
        ),
    ]


corrections = []


def add(cid, item, verdict, finding, decision, patches, added=None):
    c = {
        'id': f'audit-{item}:{cid}',
        'item': item,
        'verdict': verdict,
        'finding': finding,
        'decision': decision,
        'patches': patches,
    }
    if added:
        c['added'] = added
    corrections.append(c)


D1 = 'Maintainer decision 1 of 2026-11-02 on the cross-family audit sample: correct the qualification or statement as the audit shows, to what the source supports.'
D2 = 'Maintainer decision 2 of 2026-11-02 on the cross-family audit sample: fix the mechanical slips as the audit proposes.'

# ---------------------------------------------------------------- material errors
cid = 'rd-r06-pinker-2018-popsci-fear-robots'
add(
    cid, 80, 'material error',
    'The qualification says the article does not discuss systems produced by training; its value-alignment passage lists an AI “trained on the concept of happiness with pictures of smiling faces”.',
    D1,
    [
        replace(
            'claims', cid, 'qualification',
            'misread intelligence; it does not discuss systems produced by training.',
            'misread intelligence. Among those scenarios it lists an AI that, “if it had been trained on the concept of happiness with pictures of smiling faces”, would tile the galaxy with pictures of smiley faces; an earlier paragraph says that current programs are “trained on millions of examples”.',
        ),
        *evidence_fix(
            'evidence-rd-r06-pinker-2018-popsci-fear-robots-1', 80,
            'the record’s qualification no longer says that the article does not discuss systems produced by training; this passage is unchanged.',
            True,
        ),
    ],
)

cid = 'yk-y01-sl4-2002-05-03-yudkowsky-0205-3551-c'
add(
    cid, 86, 'material error',
    'The statement says only the CFAI semantics would keep goals as the programmers understood them; the message says they are “the only way I know of”, for “the kind of goals that humans would craft”.',
    D1 + ' “The only way I know of” stays a limit on known methods.',
    [
        replace(
            'claims', cid, 'statement',
            'and that only the CFAI semantics would keep goals as the programmers understood them.',
            'and that, for the kind of goals humans would craft, the CFAI semantics were the only way he knew of to create an AI that would implement those goals as the programmers originally understood them.',
        ),
        replace(
            'claims', cid, 'qualification',
            "Hedged ('It currently looks to me').",
            "Hedged ('It currently looks to me'), and limited to methods he knew of ('the only way I know of').",
        ),
        *evidence_fix(
            'evidence-yk-t01-s3', 86,
            'the record’s statement now keeps the next sentence’s limit to methods the author knew of (“the only way I know of”); this passage is unchanged.',
            True,
        ),
    ],
)

cid = 'yk-y11-sl4-2000-10-03-yudkowsky-0010-0125-c'
c = INDEX['claims'][cid]
add(
    cid, 119, 'material error',
    'The record says the message states the contrary expectation without engaging any argument for gradual takeoff; later in the same message the author answers Goertzel’s observation-and-catch-up premise with independent self-improvement in accelerated subjective time.',
    D1 + ' The contesting relation and the quoted opening are kept; the engagement becomes engages-premise, as the audit proposes.',
    [
        replace(
            'claims', cid, 'qualification',
            'States the contrary expectation without engaging any argument for gradual takeoff.',
            'The opening paragraph states the contrary expectation. Later in the same message (section “Webmind’s awakening”, “How fast would a Webmind wake up?”), answering Goertzel’s view that others would observe a “real AI” and play catch-up, he argues that once an AI can enhance itself independently of its programmers it can “redesign itself radically in accelerated subjective time and walk out as a transhuman”, passing from a prehuman to a transhuman state before observation and catch-up would matter. This records the argument, not its validity.',
        ),
        patch('claims', cid, 'attributes.thought.engagement', {
            'kind': 'engages-premise',
            'rationale': 'Under the message-level rule, the message gives a reason against the premise that capability gains will be gradual and visible: an AI that improves itself independently, in accelerated subjective time, could pass from a prehuman to a transhuman state before others observe it and catch up.',
        }),
        *evidence_fix(
            'evidence-yk-t11-s1', 119,
            'the record’s engagement and qualification now take account of the later section “Webmind’s awakening” of the same message; this passage is unchanged.',
            True,
        ),
    ],
)

cid = 'yk-y08-extropians-1999-01-06-yudkowsky-0160-c'
reason = (
    f'{audit_ref(117)[0].upper()}{audit_ref(117)[1:]} found the record’s contesting relation to Y08, and so its earliest located role, unsupported: '
    'the message argues that superintelligent action will be too fast to notice, but does not explicitly address a recognisable warning before danger, '
    'failures first seen in weaker systems, or action on a warning. The record now bears on the proposition. '
    'The headline is withdrawn until a re-check of the proposition’s candidate texts; it is assigned to no other record.'
)
add(
    cid, 117, 'material error',
    'The quotation and date are correct, but the explicit contesting relation to Y08, and therefore the earliest located role, are unsupported by the message.',
    'Maintainer decision 1 of 2026-11-02 on the cross-family audit sample: withdraw the role with underRecheck (reason: the cross-family audit of 2026-11-02, item 117) and correct the stance or qualification as the source supports; assign no role elsewhere.',
    [
        patch('claims', cid, 'predicate', 'bears_on_proposition'),
        replace('claims', cid, 'statement', 'contests Y08.', 'bears on Y08.'),
        patch(
            'claims', cid, 'qualification',
            'Premise addressed: There will be a recognisable, consensus-forming signal in time to act. '
            'The message argues that the forces of a Singularity are vast and dominated by positive feedback, and that superintelligent action will be too fast to notice once it can be noticed at all. '
            'It does not explicitly address a recognisable warning before danger, failures first seen in weaker systems, or action on a warning, so it is recorded as context. '
            f'It was recorded as contesting the proposition, and headlined as the earliest located contesting text, until {audit_ref(117)}.',
        ),
        patch('claims', cid, 'attributes.thought.roles', ['context']),
        patch('claims', cid, 'attributes.thought.engagement', remove=True),
        patch(
            'claims', cid, 'attributes.thought.missing',
            'Argues that superintelligent action will be too fast to notice; it does not explicitly claim that no recognisable warning will come before danger, that failures will not first appear in weaker systems, or that a warning would not lead to effective action.',
        ),
        patch('entities', 'warning-signs-in-time', 'proposition.underRecheck', [
            {'headline': 'earliest-located-contesting', 'reason': reason, 'recordedAt': DATE},
        ]),
        *evidence_fix(
            'evidence-yk-t08-e1', 117,
            'the record now bears on Y08 instead of contesting it, and its earliest located role is withdrawn; this passage is unchanged.',
            True,
        ),
    ],
)

# ---------------------------------------------------------------- minor slips (mechanical)
add(
    'lg-mx-lecun-ami-chair-2025', 2, 'minor',
    'The quoted sentence is in the third article-body paragraph, not the second.', D2,
    [
        patch('evidence', 'lg-ev-mx-lecun-ami-chair-2025', 'locator', 'Article body, paragraph 3, quoting LeCun’s post (quotation beginning “Yes, AMI Labs”)'),
        *evidence_fix('lg-ev-mx-lecun-ami-chair-2025', 2, 'locator changed from paragraph 2 to paragraph 3.', True),
    ],
)
add(
    'kp-cites-llama-paper-natural-questions-benchmark-question-answering-2019', 19, 'minor',
    'The locator “reference or mention by title” does not identify a section or entry.', D2,
    [
        patch('evidence', 'evidence-kp-cites-llama-paper-natural-questions-benchmark-question-answering-2019-1', 'locator',
              'References, Kwiatkowski et al. (2019), “Natural questions: a benchmark for question answering research”; also §3.2 Closed-book Question Answering'),
        *evidence_fix('evidence-kp-cites-llama-paper-natural-questions-benchmark-question-answering-2019-1', 19,
                      'locator changed from “reference or mention by title” to the reference entry and §3.2.', True),
    ],
)
eid = 'evidence-rd-r06-belrose-pope-2023-ai-easy-to-control-1'
add(
    'rd-r06-belrose-pope-2023-ai-easy-to-control', 28, 'minor',
    'The quotation uses straight quotation marks around “alignment” where the source has curly marks.', D2,
    [
        replace('evidence', eid, 'passage', '"alignment."', '“alignment.”'),
        *evidence_fix(eid, 28, 'quotation marks around “alignment” changed to the source’s curly marks.', True),
    ],
)
eid = 'c2-ev-bytedance-seed-20-model-card-aliases'
add(
    'c2-bytedance-seed-20-model-card', 29, 'minor',
    'The contributor quotation has a straight apostrophe in “authors’”.', D2,
    [
        replace('evidence', eid, 'passage', "authors'", 'authors’'),
        patch('evidence', eid, 'locator', 'PDF p. 58, Section 7, Contributors, introductory sentences'),
        *evidence_fix(eid, 29, 'apostrophe in “authors’” as in the source; locator given the PDF page.', True),
    ],
)
eid = 'evidence-aib-labs-iso-founding-stated-2'
add(
    'aib-labs-iso-founding-stated', 59, 'minor',
    'The Novartis release quotation is on PDF p. 2, not p. 1, and changes the source’s curly apostrophe.', D2,
    [
        patch('evidence', eid, 'locator', 'PDF p. 2, "About Isomorphic Labs"'),
        replace('evidence', eid, 'passage', "Alphabet's", 'Alphabet’s'),
        replace('claims', 'aib-labs-iso-founding-stated', 'statement', "Alphabet's DeepMind", 'Alphabet’s DeepMind'),
        *evidence_fix(eid, 59, 'locator changed from PDF p. 1 to p. 2; apostrophe in “Alphabet’s” as in the source, also in the statement’s quotation.', True),
    ],
)
# The same passage of the same release, quoted for a sibling record with the
# same page and apostrophe; the quotation limit counts the two as one passage
# only when they are identical.
eid = 'evidence-aib-labs-iso-alphabet-subsidiary-2024-1'
add(
    'aib-labs-iso-alphabet-subsidiary-2024', 59, 'minor (same passage, not sampled)',
    'The sibling record quotes the same passage of the Novartis release with the same page and apostrophe slips as item 59.', D2,
    [
        patch('evidence', eid, 'locator', 'PDF p. 2, "About Isomorphic Labs"'),
        replace('evidence', eid, 'passage', "Alphabet's", 'Alphabet’s'),
        replace('claims', 'aib-labs-iso-alphabet-subsidiary-2024', 'statement', "Alphabet's DeepMind", 'Alphabet’s DeepMind'),
        *evidence_fix(eid, 59, 'the same passage as in the sampled record evidence-aib-labs-iso-founding-stated-2: locator changed from PDF p. 1 to p. 2; apostrophe in “Alphabet’s” as in the source, also in the statement’s quotation.', True),
    ],
)
eid = 'evidence-aib-labs-dm-2018-casp13-ranking-1'
add(
    'aib-labs-dm-2018-casp13-ranking', 72, 'minor',
    'The quotation normalises the live source’s apostrophe and quotation marks.', D2,
    [
        patch('evidence', eid, 'passage',
              INDEX['evidence'][eid]['passage'].replace("We're", 'We’re').replace('"unprecedented', '“unprecedented').replace('structure,"', 'structure,”')),
        *evidence_fix(eid, 72, '“We’re” and the curly quotation marks as in the page as served.', True),
    ],
)
cid = 'th-ns-garcez-lamb-term'
add(
    cid, 73, 'minor',
    'The recorded date is arXiv version 1’s submission date, but both evidence items cite version 2 (16 December 2020) without distinguishing it.', D2 + ' The audit’s alternative is taken: the time note distinguishes the version 1 date from the cited version 2.',
    [
        patch('claims', cid, 'time.note',
              'Submission date of arXiv version 1 (10 December 2020). The quotations are read in version 2 (stamped 16 December 2020); the title and the abstract’s wording are the same in version 1, as the cross-family audit sample of 2026-11-02 (item 73) found and as re-read on 2026-11-02.'),
    ],
)
cid = 'rd-r10a-brooks-2014-tool-not-threat'
add(
    cid, 78, 'minor',
    'The month comes from the Robohub repost, a separate expression; the Edge response carries no date of its own.', D2,
    [
        patch('claims', cid, 'time.date', '2014'),
        patch('claims', cid, 'time.note',
              'Year only. The Edge response carries no date of its own; the Robohub repost of 11 November 2014 is a separate expression with small differences of wording and does not date it.'),
    ],
)
eid = 'evidence-kp-states-lamda-language-models-dialog-applications-2022-2-1'
add(
    'kp-states-lamda-language-models-dialog-applications-2022-2', 79, 'minor',
    'The quotation drops the hyphen in “Transformer-based” when joining a PDF line break.', D2,
    [
        replace('evidence', eid, 'passage', 'Transformerbased', 'Transformer-based'),
        *evidence_fix(eid, 79, '“Transformerbased” corrected to “Transformer-based”, as in the arXiv abstract page.', True),
    ],
)
cid = 'ts-a1-shulman-2009'
add(
    cid, 112, 'minor',
    'The record turns the opening day of the conference interval (2–4 July 2009) into an exact publication day.', D2,
    [
        patch('claims', cid, 'time.date', '2009-07'),
        patch('claims', cid, 'time.note',
              'Month only: presented at ECAP, 2–4 July 2009, according to the reprint’s citation line, which gives no day for the paper. The MIRI reprint, marked as containing minor changes, is a separate, undated expression.'),
    ],
)
eid = 'evidence-ts-a6-grace-2014-treacherous-turn'
add(
    'ts-a6-grace-2014-treacherous-turn', 120, 'minor',
    'The quotation joins two bullets with a slash the source does not have.', D2 + ' The sub-bullet is quoted alone.',
    [
        patch('evidence', eid, 'passage', 'First mover advantage implies the AI is in a position to do what it wants'),
        patch('evidence', eid, 'locator', 'Section "Summary", first sub-bullet of the first bullet (which cites pp. 115–6)'),
        *evidence_fix(eid, 120, 'the sub-bullet is quoted alone, without the first bullet and the joining slash.', True),
    ],
)

# ---------------------------------------------------------------- Turing 1951
B4 = 'At some stage therefore we should have to expect the machines to take control, in the way that is mentioned in Samuel Butler\'s \'Erewhon\'.'
B5 = 'If a machine can think, it might think more intelligently than we do, and then where should we be?'
turing_note = (
    'Read on the archive’s scan, {where}, by the Turing 1951 lead report of 2026-11-02 ({t}, {p}), which gives the passage verbatim; '
    'that report, by a model of another family, is the cross-family pass for this record. The session admitting it re-read the passage on the same scan on 2026-11-02. '
    'The scan has no text layer. Admitted by the maintainer’s decision of 2026-11-02. No human editorial review.'
)
w01_b4 = {
    'id': 'ht-w01-turing-c1951-heretical-theory',
    'subject': 'turing-c1951-heretical-theory',
    'predicate': 'articulates_proposition',
    'object': {'kind': 'entity', 'entityId': 'machine-succession'},
    'topic': 'ideas',
    'statement': 'Alan Turing’s lecture typescript “Intelligent Machinery, a Heretical Theory” (c. 1951) says that once the machine thinking method had started it would not take long to outstrip human powers, and that at some stage “we should have to expect the machines to take control”, as mentioned in Butler’s Erewhon.',
    'time': {
        'kind': 'event',
        'date': '1951',
        'note': 'Approximate year: the King’s College catalogue dates the lecture typescript (AMT/B/4), a lecture to the ’51 Society at Manchester, c. 1951. No lecture day is established. The wording is dated by the typescript, not by its printing in Philosophia Mathematica (September 1996).',
    },
    'derivation': 'explicit',
    'resolution': 'supported',
    'editorialState': 'seed',
    'qualification': 'A conditional forecast: the lecture assumes that thinking machines can be made. The reference to Erewhon is the typescript’s own citation of Butler; it is not evidence of influence and does not carry over Butler’s other arguments. The same sentence is recorded on A1 in the superintelligence collection. Later than Butler’s letter of 1863, which holds the earliest located role.',
    'evidenceIds': ['evidence-ht-w01-turing-c1951-heretical-theory-1'],
    'recordedAt': DATE,
    'attributes': {'thought': {'roles': ['articulation'], 'register': 'nonfiction'}},
}
w01_b5 = {
    'id': 'ht-w01-turing-1951-can-digital-computers-think',
    'subject': 'turing-1951-can-digital-computers-think',
    'predicate': 'bears_on_proposition',
    'object': {'kind': 'entity', 'entityId': 'machine-succession'},
    'topic': 'ideas',
    'statement': 'Alan Turing’s broadcast script “Can Digital Computers Think?” (1951) asks where we should be if a machine thought more intelligently than we do, says that even if machines were kept subservient we should as a species feel greatly humbled, and compares the possibility of being superseded by the pig or the rat.',
    'time': {
        'kind': 'event',
        'date': '1951',
        'note': 'The King’s College catalogue identifies the annotated script (AMT/B/5) with the BBC Third Programme broadcast of 15 May 1951; the script’s composition and annotations are not dated to that day, and it is not a recording of what was said.',
    },
    'derivation': 'explicit',
    'resolution': 'supported',
    'editorialState': 'seed',
    'qualification': 'The script introduces these points as features that make the idea of a thinking machine unpleasant, in a paragraph on irrational opposition to it. The supersession it names is by pigs or rats, not machines. Do not substitute the stronger prediction of the Heretical Theory lecture for this script.',
    'evidenceIds': ['evidence-ht-w01-turing-1951-can-digital-computers-think-1'],
    'recordedAt': DATE,
    'attributes': {'thought': {
        'roles': ['context'],
        'register': 'nonfiction',
        'missing': 'Considers machines more intelligent than people and keeping them subservient; it does not state that machines would replace or succeed humans as the dominant intelligence.',
    }},
}
ev_b4 = {
    'id': 'evidence-ht-w01-turing-c1951-heretical-theory-1',
    'claimId': w01_b4['id'],
    'sourceId': 'source-turing-c1951-amt-b-4',
    'sourceRole': 'primary',
    'support': 'supports',
    'locator': 'Typescript p. 10, final sentence (AMT/B/4/16, scan 16); the same sentence on carbon p. 101 (AMT/B/4/6, scan 6)',
    'passage': B4,
    'passageType': 'quote',
    'verification': 'machine_checked',
    'checkedAt': DATE,
    'note': turing_note.format(where='typescript p. 10 (scan 16), compared with carbon p. 101 (scan 6)', t=TURING, p='B4-P1'),
    'retrievalRoute': 'direct',
}
ev_b5 = {
    'id': 'evidence-ht-w01-turing-1951-can-digital-computers-think-1',
    'claimId': w01_b5['id'],
    'sourceId': 'source-turing-1951-amt-b-5',
    'sourceRole': 'primary',
    'support': 'supports',
    'locator': 'Script p. 6a (AMT/B/5/7, scan 7), paragraph on irrational opposition to the idea',
    'passage': B5,
    'passageType': 'quote',
    'verification': 'machine_checked',
    'checkedAt': DATE,
    'note': turing_note.format(where='script p. 6a (scan 7)', t=TURING, p='B5-P1'),
    'retrievalRoute': 'direct',
}
for row, table in [(w01_b4, 'claims'), (w01_b5, 'claims'), (ev_b4, 'evidence'), (ev_b5, 'evidence')]:
    if row['id'] in INDEX[table]:
        raise SystemExit(f'{table}/{row["id"]} exists already')
D3 = 'Maintainer decision 3 of 2026-11-02 on the Turing 1951 lead: admit a W01 articulation from AMT/B/4 with the report’s passage and locator, dated c. 1951, with no earliest located role; add the AMT/B/5 record if it bears on W01 as the report says.'
add(
    w01_b4['id'], 'turing-B4', 'admission',
    'The Turing 1951 lead report (B4-P1) finds that the typescript articulates W01; Butler (1863) holds the earliest located role.', D3, [],
    {'claims': [{'row': w01_b4, 'after': 'ht-w01-butler-1863-darwin-among-the-machines'}],
     'evidence': [{'row': ev_b4, 'after': 'evidence-ht-w01-butler-1863-darwin-among-the-machines-1'}]},
)
add(
    w01_b5['id'], 'turing-B5', 'admission',
    'The Turing 1951 lead report (B5-P1, B5-P3) finds that the broadcast script bears on W01 but lacks a statement of succession.', D3, [],
    {'claims': [{'row': w01_b5, 'after': w01_b4['id']}],
     'evidence': [{'row': ev_b5, 'after': ev_b4['id']}]},
)

spec = {
    'description': 'The maintainer’s decisions of 2026-11-02 on the blind cross-family audit sample (review/cross-family-audit-sample-2026-11-02.md): the four material errors corrected, Y08’s earliest located contesting headline withdrawn under re-check, and eleven of the thirteen minor slips fixed (with one unsampled record quoting the same passage as item 59); and on the Turing 1951 lead (research/turing-1951-lead-2026-11-02/report.md): a W01 articulation from AMT/B/4 and a W01 context record from AMT/B/5. The full record is in review/audit-sample-fixes-2026-11-02.md. Applied by scripts/apply-recheck.ts; built by scripts/audit-sample-fixes-spec.py.',
    'date': DATE,
    'schemaVersion': json.load(open(os.path.join(ROOT, 'data/meta.json'), encoding='utf8'))['schemaVersion'],
    'snapshotPath': SNAP,
    'snapshotDescription': 'Rows changed by the maintainer’s decisions of 2026-11-02 on the cross-family audit sample and the Turing 1951 lead (scripts/apply-recheck.ts, review/audit-sample-fixes-2026-11-02.json). Reverting it (src/editorial/historical-views.ts) reproduces the dataset as it was at baseCommit.',
    'held': {
        'lg-cn-tang-jie-zhipu-cofounder': 'Audit item 22 (minor): needs judgement. The audit could not locate the KEG/GLM account in the cited prospectus pages, while the pack’s retrieval of 2026-10-15 matched its anchor “KEG與唐傑博士”; withdrawing an evidence item and rewording the qualification is not mechanical.',
        'kp-authored-quoc-le-natural-questions-benchmark-question-answering-2019': 'Audit item 66 (minor): needs judgement. The July 2019 date is shared by every authorship record and the states record of the paper, and a record citing the work is dated January 2019; the date belongs to the work’s expression and is corrected for the family, not one record.',
    },
    'corrections': corrections,
}

if '--verify' in sys.argv:
    audit = open(os.path.join(ROOT, AUDIT), encoding='utf8').read()
    turing = open(os.path.join(ROOT, TURING), encoding='utf8').read()
    norm = lambda s: re.sub(r'\s+', ' ', s)
    for text, where, name in [(B4, turing, 'B4-P1'), (B5, turing, 'B5-P1'),
                              ('“alignment.”', audit, '28'), ('authors’ internal aliases', audit, '29'),
                              ('Alphabet’s DeepMind in 2021', audit, '59'), ('We’re proud to be part', audit, '72'),
                              ('Transformer-based neural language models', audit, '79'),
                              ('implies the AI is in a position to do what it wants', audit, '120'),
                              ('if it had been trained on the concept of happiness with pictures of smiling faces', audit, '80'),
                              ('the CFAI semantics are the only way I know of', audit, '86'),
                              ('The AI can redesign itself radically in accelerated subjective time and walk out as a transhuman', audit, '119')]:
        if norm(text) not in norm(where):
            raise SystemExit(f'{name}: {text!r} not found')
    print('Verified: every quotation the spec relies on is in the audit or the Turing report.')

with open(os.path.join(ROOT, SPEC), 'w', encoding='utf8') as f:
    json.dump(spec, f, ensure_ascii=False, indent=2)
    f.write('\n')
print(f'Wrote {SPEC}: {len(corrections)} corrections, {sum(len(c["patches"]) for c in corrections)} patches.')
