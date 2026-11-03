"""Build review/absence-sweep-apply-1-2026-11-02.json, the spec that
scripts/apply-recheck.ts applies for part 1 of the textual absence-claims sweep
(review/absence-claims-sweep-2026-11-02-part1.md and .json, Codex, branch
codex/absence-claims-sweep at f8e00f7): every checked record marked "absence
fails" or "scope issue" is corrected to what the source supports, using the
sweep's passage and locator. Pending, unverifiable and excluded (aib-, ab-)
records are left alone.

    python3 scripts/absence-sweep-apply-1-spec.py            write the spec
    python3 scripts/absence-sweep-apply-1-spec.py --verify   also check that each
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
SPEC = 'review/absence-sweep-apply-1-2026-11-02.json'
SNAP = 'review/absence-sweep-apply-1-before-2026-11-02.json'
DATE = '2026-11-02'
SWEEP = 'review/absence-claims-sweep-2026-11-02-part1.md'
SWEEP_JSON = 'review/absence-claims-sweep-2026-11-02-part1.json'
RECORD = 'review/absence-sweep-apply-part1-2026-11-02.md'


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
    return f'the textual absence-claims sweep of 2026-11-02, part 1 ({SWEEP}, record {number})'


def evidence_fix(eid, number, what, reread):
    """checkedAt and a correction sentence appended to the evidence note."""
    how = (
        'The session applying the correction re-read the sweep’s passage in the source as served on 2026-11-02.'
        if reread
        else 'The session applying the correction took the passage and locator from the sweep, which read the source on 2026-11-02, and did not retrieve it again.'
    )
    note = INDEX['evidence'][eid]['note']
    dated = [] if INDEX['evidence'][eid]['checkedAt'] == DATE else [patch('evidence', eid, 'checkedAt', DATE)]
    return [
        *dated,
        patch('evidence', eid, 'note', f'{note} Corrected on {DATE} after {sweep_ref(number)}: {what} {how} Recorded in {RECORD}.'),
    ]


corrections = []
unchanged = {}


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
T = 'the record’s time note no longer states the absence the sweep found contradicted; this passage is unchanged.'
D = 'Brief 08 and the task of 2026-11-02: correct the qualification or note to what the source supports, using the sweep’s passage and locator.'

# ---------------------------------------------------------------- superintelligence (ts-)
cid = 'ts-b2-erewhon-1872-context'
add(cid, D, [
    patch('claims', cid, 'qualification',
          'Fiction inside a satirical novel. In the treatise the machines as yet receive their impressions through human senses (chapter XXI, pp. 196–197 of the 1872 printing); it goes on to consider machines that hear directly and develop a language of their own.'),
    *evidence_fix(first_ev(cid), 6, Q, False),
], False)

cid = 'ts-a4-turing-c1951-context'
add(cid, D, [
    patch('claims', cid, 'qualification',
          'The talk says that once machine thinking had started it would not take long to outstrip human powers; it gives no duration for the transition.'),
    *evidence_fix(first_ev(cid), 11, Q, False),
], False)

cid = 'ts-a4-turing-1951-context'
add(cid, D, [
    patch('claims', cid, 'qualification',
          'The script gives no duration for a transition after machines reach human level. It does give horizons: convincing question-answering by the end of the century, and, for the danger it discusses, “If it comes at all it will almost certainly be within the next millennium” (final printed p. 7).'),
    patch('evidence', first_ev(cid), 'passage',
          'Turing contemplates machines thinking more intelligently than people, without saying how long a transition to that state would take.'),
    *evidence_fix(first_ev(cid), 12, 'the record’s qualification no longer says that the script gives no timescale, and this paraphrase now says it gives no duration for the transition, not that it gives no time at all.', False),
], False)

cid = 'ts-a3-dartmouth-1955-context'
add(cid, D, [
    patch('claims', cid, 'qualification',
          'The self-improvement item names existing schemes as worth further study without describing them, and gives no mechanism for improving the improvement process. The attached research statements separately describe approaches to learning and internal models.'),
    *evidence_fix(first_ev(cid), 14, Q, False),
], False)

cid = 'ts-a3-minsky-1961-context'
add(cid, D + ' The sweep’s proposed sentence is an instruction to the editor (assess the proposal against A3); the record states what the text says and leaves the assessment to the A3 re-check.', [
    patch('claims', cid, 'qualification',
          'The summarising paragraph concerns heuristic improvement of problem solving through learning and planning. Section IV-D (Planning) also describes GPS as to be self-applied to discovering its own Differences: “bootstrapping”, “applying a problem-solving system to the task of improving some of its own methods”, which Minsky calls old and familiar. Whether that self-application improves the capacity to improve, as A3 requires, is not assessed here.'),
    *evidence_fix(first_ev(cid), 17, 'the record’s qualification no longer says categorically that the paper concerns heuristic improvement rather than self-improvement; this passage is unchanged.', True),
], True)

cid = 'ts-a1-good-1965'
add(cid, D + ' The earliest located and earliest located term roles stay: the sweep finds section 2 still meets A1.', [
    replace('claims', cid, 'qualification',
            'The chapter gives no timescale and says nothing about concealment.',
            'The chapter gives no duration for the intelligence explosion; its conclusions (section 9, printed p. 78) say it is “more probable than not that, within the twentieth century, an ultraintelligent machine will be built”. No passage on concealment was located in sections 1–2 and 9 or by full-text search; the technical sections were not read line by line.'),
    *evidence_fix(first_ev(cid), 18, 'the record’s qualification no longer says that the chapter gives no timescale; this passage is unchanged.', True),
], True)

cid = 'ts-c1-weizenbaum-1966'
add(cid, D + ' The earliest located role stays: the sweep finds the illusion-of-understanding passage still meets C1.', [
    replace('claims', cid, 'qualification',
            'Concerns the appearance of understanding in conversation with one program and its explanation; the article proposes no test.',
            'Concerns the appearance of understanding in conversation with one program and its explanation. The Discussion (printed pp. 42–43) proposes experiments, with ELIZA as the vehicle, on keeping its responses credible, and says the crucial test of understanding is not the ability to continue a conversation but to draw valid conclusions from what one is told.'),
    *evidence_fix('evidence-ts-c1-weizenbaum-1966-2', 21, 'the record’s qualification no longer says that the article proposes no test; this passage is unchanged.', True),
], True)

cid = 'ts-a1-moravec-1979'
add(cid, D, [
    patch('claims', cid, 'qualification',
          'In the cited paragraph the compounding brings capable systems sooner. Section 5 separately describes machines improving their own software and hardware over successive generations that “will be increasingly smarter”, and says there is no reason to assume human equivalence is an upper bound.'),
    *evidence_fix(first_ev(cid), 22, 'the record’s qualification no longer says that the essay does not describe a runaway beyond human level; this passage is unchanged.', False),
], False)

cid = 'ts-a4-drexler-1986-context'
add(cid, D, [
    patch('claims', cid, 'qualification',
          'Predicts that once automated engineering and assemblers operate many technologies will advance “in a brief time”; it gives no duration for a transition from human-level to superhuman AI.'),
    *evidence_fix(first_ev(cid), 26, Q, False),
], False)

cid = 'ts-a1-moravec-1989-context'
add(cid, D, [
    patch('claims', cid, 'qualification',
          'The text forecasts increasingly rapid self-improvement and describes mental components being created, tested, added and deleted; it does not derive how improved intelligence would accelerate the improvement itself.'),
    *evidence_fix(first_ev(cid), 31, Q, False),
], False)

cid = 'ts-a5-vinge-1993'
add(cid, D, [
    patch('claims', cid, 'qualification',
          'This paragraph leaves the creating entities at the general level of greater-than-human intelligence; the paper elsewhere distinguishes several routes to it (computers, networks, human–computer interfaces, biological improvement).'),
    *evidence_fix(first_ev(cid), 38, Q, True),
], True)

cid = 'ts-a6-vinge-1993'
add(cid, D + ' The earliest located role stays: the sweep finds p. 16 still meets A6, and the correction adds to its support.', [
    patch('claims', cid, 'qualification',
          'A conditional argument about incentives, not evidence that any developer gave up safety. The preceding section (p. 15, “Can the Singularity be avoided?”) also says that the competitive advantage of every advance in automation is such that forbidding it “merely assures that someone else will get them first”.'),
    *evidence_fix(first_ev(cid), 40, 'the record’s qualification no longer says that the paper names no first-mover advantage; this passage is unchanged.', True),
], True)

cid = 'ts-a4-hanson-1994-context'
add(cid, D, [
    patch('claims', cid, 'qualification',
          'About uploads. The article discusses how sudden the upload transition could be, and what would make it more sudden, but gives no duration for a transition in AI capability.'),
    *evidence_fix(first_ev(cid), 46, Q, False),
], False)

cid = 'ts-a4-miller-1995-context'
add(cid, D, [
    replace('claims', cid, 'qualification',
            'so the comment does not tie the singularity to AI;',
            'and his forecasts place AI and uploads among the events clustered around it, without a duration for an AI takeoff;'),
    *evidence_fix(first_ev(cid), 47, Q, False),
], False)

cid = 'ts-b5-loosemore-2015-contests'
add(cid, D, [
    patch('claims', cid, 'time.note',
          'Posting time 2015-05-05T02:46:34Z. The post names its author in the body; on 2026-11-02 the public Post API returned an account identifier with the posting time. An earlier response without an account is not reproduced.'),
    *evidence_fix(first_ev(cid), 67, T, False),
], False)

# ---------------------------------------------------------------- Yudkowsky arguments (yk-)
cid = 'yk-y11-extropians-1999-08-03-yudkowsky-1487-c'
add(cid, D, [
    replace('claims', cid, 'qualification',
            'the quoted paragraph concerns only takeoff speed.',
            'the quoted paragraph also says containment on a superintelligence is useless, a slow Transcend lasting only “as long as you can convince the Transcendee to remain slow”.'),
    *evidence_fix(first_ev(cid), 88, 'the record’s qualification no longer says that the quoted paragraph concerns only takeoff speed; this passage is unchanged.', True),
], True)

cid = 'yk-y20-staring-into-the-singularity-b'
add(cid, D, [
    replace('claims', cid, 'qualification',
            'In context the point reassures: the same paragraph says there is no point worrying that hostile Powers will inevitably wipe out humanity. Not the later "risk is real but not Terminator" argument.',
            'In context the point reassures: the same paragraph says there is no point worrying that hostile Powers will inevitably wipe out humanity, while allowing that a badly programmed Power is “an engineering risk, and minimizing it is an engineering task”. The conclusion stays reassuring, unlike his later texts.'),
    *evidence_fix(first_ev(cid), 100, Q, False),
], False)

cid = 'yk-y20-ai-positive-negative-factor-global-risk-b'
add(cid, D, [
    replace('claims', cid, 'qualification',
            'Methodological: avoid storyteller predictions, good or bad; it does not address hatred or rebellion as such.',
            'Methodological: the cited paragraph argues for choosing a particular optimization process rather than making storyteller predictions, good or bad. Elsewhere (section 10 of the reprint) the chapter describes harm from an optimization process without hatred.'),
    replace('claims', cid, 'attributes.thought.missing',
            'it does not address hatred or rebellion as the concern.',
            'this paragraph does not address hatred or rebellion as the concern.'),
    *evidence_fix(first_ev(cid), 101, 'the record’s qualification no longer says that the chapter does not address hatred or rebellion; this passage is unchanged.', False),
], False)

cid = 'yk-y24-ai-positive-negative-factor-global-risk-b'
add(cid, D, [
    replace('claims', cid, 'qualification',
            'His 2008 strategic view was that the first AI must be Friendly; this is not an argument for racing, and in 2023',
            'His 2008 strategic view was that the first AI must be Friendly: under the assumption of a large jump, the local strategy requires Friendly AI to be got right before anyone builds AI to a lower standard. That is a conditional claim about the order of development, with no guarantee of control by a builder or nation; in 2023'),
    replace('claims', cid, 'attributes.thought.missing',
            'or that racing improves the outcome.',
            'or that being first improves the outcome whoever builds.'),
    *evidence_fix(first_ev(cid), 106, 'the record’s qualification no longer says that the passage is not an argument for racing; this passage is unchanged.', False),
], False)

cid = 'yk-y24-sl4-2002-05-03-yudkowsky-0205-3551-a'
add(cid, D, [
    replace('claims', cid, 'qualification',
            'The message does not state that whoever builds advanced AI controls it, or that racing to be first improves the outcome.',
            'The message does not state that whoever builds advanced AI controls it; its proposal to finish first is limited to such projects, and it makes no general claim that being first improves the outcome.'),
    replace('claims', cid, 'attributes.thought.missing',
            'or that racing to be first improves it.',
            'or that being first improves it in general.'),
    *evidence_fix(first_ev(cid), 109, Q, True),
], True)

cid = 'yk-y24-extropians-2000-09-29-yudkowsky-6080-a'
add(cid, D, [
    replace('claims', cid, 'qualification',
            'It does not state that whoever builds advanced AI controls it, or that racing to be first improves the outcome.',
            'It proposes trying to be first, alongside writing up Friendly AI, as a way to affect the situation; it does not state that whoever builds advanced AI controls it, or that being first improves the outcome whoever builds.'),
    replace('claims', cid, 'attributes.thought.missing',
            'or that racing to be first improves it.',
            'or that being first improves it whoever builds.'),
    *evidence_fix(first_ev(cid), 110, Q, True),
], True)

cid = 'yk-y28-lw-2022-six-dimensions-of-operational-adequacy-in-c'
add(cid, D, [
    replace('claims', cid, 'qualification',
            'it does not refute the premise that the most advanced projects are the most competent.',
            'it treats a project’s resource advantage and its alignment mindset as separate dimensions and compares projects on each.'),
    *evidence_fix(first_ev(cid), 113, Q, False),
], False)

# ---------------------------------------------------------------- economics (ec-)
cid = 'ec-g05-clancy-besiroglu-2023-great-inflection-c'
add(cid, D, [
    replace('claims', cid, 'qualification',
            'On regulation the same turn says only that its effect "is plausible, but I\'m not confident it will" keep growth near historical rates.',
            'On regulation the same turn says that its effect "is plausible, but I\'m not confident it will" keep growth near historical rates, and discusses falling training costs, what enforcement would require, incentives to bypass constraints and possible political effects.'),
    *evidence_fix(first_ev(cid), 128, Q, False),
], False)

cid = 'ec-m01-nourse-1955-automation-hearings-statement-b'
add(cid, D, [
    patch('claims', cid, 'qualification', INDEX['claims'][cid]['qualification'].replace(
        '(First passage) The passage reports a view the author does not state as their own. On the next page',
        '(First passage) The passage summarises the witnesses’ account of automation as mechanization. On the next page', 1).replace(
        'while on p. 621 he treats',
        'on p. 620 he accepts the long-run economic evaluation as a prospect, and on pp. 621–622 he requires attention to adjustment and public policy; on p. 621 he treats', 1)),
    *evidence_fix(first_ev(cid), 133, Q, False),
], False)

cid = 'ec-m01-technology-and-the-american-economy-1966-b'
add(cid, D, [
    replace('claims', cid, 'qualification',
            'Puts the computer on a par with earlier general technologies and gives it no separate category.',
            'The opening paragraph declines to judge whether the computer, nuclear power and molecular biology are more “revolutionary” than the telephone, electric power and bacteriology; it does not put them on a par, and gives the computer no separate category there.'),
    *evidence_fix(first_ev(cid), 134, Q, False),
], False)

cid = 'ec-m01-mansfield-1966-technological-change-b'
add(cid, D, [
    replace('claims', cid, 'qualification',
            "The study takes up automation only through the Commission's acceleration question; it gives computers no separate treatment.",
            "The study takes up automation in a production-function example (\"Detroit automation\", printed p. II-100, explained by changing factor prices) and through the Commission's acceleration question; no separate treatment of computers was located in the study."),
    *evidence_fix(first_ev(cid), 135, Q, False),
], False)

cid = 'ec-m02-autor-2015-why-are-there-still-so-many-jobs-a'
add(cid, D, [
    replace('claims', cid, 'qualification',
            'Dated 2015; the abstract does not say whether the task framework is applied to AI specifically.',
            'Dated 2015. The abstract says the final section reflects on how advances in artificial intelligence and robotics should shape thinking about occupational change, then states the task argument; how the framework is applied to AI in the article was not read.'),
    *evidence_fix(first_ev(cid), 138, Q, True),
], True)

cid = 'ec-m06b-stevenson-2019-ai-income-employment-meaning-b'
add(cid, D, [
    patch('claims', cid, 'qualification',
          'Frames distribution as a political question and gives existing redistribution as examples (pensions, child tax credits and allowances, health-care subsidies, p. 193). The chapter closes by asking whether to increase funding for education, worker training, the arts and community service (p. 195), without setting out a redistribution design.'),
    replace('claims', cid, 'attributes.thought.missing',
            'Does not argue for a specific redistributive or compensating policy.',
            'Does not argue for a specific redistributive or compensating policy design.'),
    *evidence_fix(first_ev(cid), 145, Q, True),
], True)

COVER = ('Crossref record for doi:10.3386/w7136 (issued 1999-05); the retrieved PDF has no NBER cover page.',
         'Crossref record for doi:10.3386/w7136 (issued 1999-05). The retrieved PDF opens with the NBER cover (Working Paper 7136, May 1999) and abstract sheet, scanned pages without a text layer.')
cid = 'ec-m01-bresnahan-brynjolfsson-hitt-1999-it-workplace-organization-a'
add(cid, D, [
    replace('claims', cid, 'time.note', *COVER),
    replace('claims', cid, 'qualification',
            'the paper is about IT, not AI.',
            'the paper is about IT; it mentions artificial intelligence in its discussion of limited substitution (printed p. 11) but keeps its formal inputs to labour, IT and other capital.'),
    *evidence_fix(first_ev(cid), 148, 'the record’s time note no longer says that the PDF has no NBER cover page; this passage is unchanged.', False),
], False)

cid = 'ec-m09-bresnahan-brynjolfsson-hitt-1999-it-workplace-organization-b'
add(cid, D, [
    replace('claims', cid, 'time.note', *COVER),
    *evidence_fix(first_ev(cid), 149, T, False),
], False)

cid = 'ec-e04-korinek-stiglitz-2017-ai-income-distribution-b'
add(cid, D, [
    replace('claims', cid, 'qualification',
            'They do not analyse developer incentives in detail.',
            'The cited p. 38 paragraph asks whether AI progress could or should be halted. Elsewhere (pp. 19–21) the paper analyses innovators’ returns, contestable innovation, patent protection and taxation, but not developers’ incentives to invest in safety.'),
    replace('claims', cid, 'attributes.thought.missing',
            'does not analyse developers\' incentives.',
            'does not analyse developers\' incentives regarding safety.'),
    *evidence_fix(first_ev(cid), 162, Q, False),
], False)

cid = 'ec-e05-hyytinen-2017-kak-editorial-b'
add(cid, D, [
    replace('claims', cid, 'qualification',
            'it says nothing about the state of economics on the topic.',
            'it names earlier discussions (footnote 3) but does not assess how far economics has engaged with the topic.'),
    *evidence_fix(first_ev(cid), 166, Q, False),
], False)

# ---------------------------------------------------------------- compute, power and orbit
cid = 'cpo-orb-oc1-lumen-2024'
add(cid, D + ' The earliest located role stays: the sweep finds the Lumen text still meets O1; the correction narrows what the comparator search inspected.', [
    replace('claims', cid, 'qualification',
            'The check found 1978 solar-power literature that describes continuous solar supply in space without placing computing there,',
            'The check found the publisher’s abstract of a 1978 paper on solar power satellites, which describes near-continuous solar supply in space without mentioning computing (the full paper was not inspected),'),
    *evidence_fix(first_ev(cid), 172, Q, False),
], False)

# ---------------------------------------------------------------- risk debate (rd-)
cid = 'rd-r01-miller-yampolskiy-haggstrom-2020-agi-modifying-utility'
add(cid, D, [
    replace('claims', cid, 'qualification',
            'it works within, and does not dispute, the Omohundro-Bostrom account of instrumental goals.',
            'it reasons with the Omohundro–Bostrom account of instrumental goals but argues that competitive pressure can defeat goal preservation, and says its examples can be read either as counterexamples to the instrumental goal of goal integrity or to orthogonality, choosing the latter (PDF p. 4).'),
    *evidence_fix(first_ev(cid), 201, 'the record’s qualification no longer says that the paper does not dispute the Omohundro–Bostrom account; this passage is unchanged.', True),
], True)

cid = 'rd-r03-belrose-pope-2024-counting-arguments'
add(cid, D, [
    patch('claims', cid, 'qualification',
          'Records the essay’s critique of one argument for scheming. The essay draws on empirical results about training and generalisation; it does not measure hidden final goals or scheming motives in a trained system.'),
    *evidence_fix(first_ev(cid), 211, Q, True),
], True)

cid = 'rd-a4-altman-2015-machine-intelligence-part-1'
add(cid, D, [
    patch('claims', cid, 'qualification',
          'The post gives both possibilities (\'it also may be more gradual\') and no duration for the transition. It separately discusses whether arrival is ten or a hundred years away and looks forty years ahead.'),
    replace('claims', cid, 'attributes.thought.missing',
            'It names no period for the rise',
            'It names no duration for the rise'),
    *evidence_fix(first_ev(cid), 216, Q, True),
], True)

cid = 'rd-r08-altman-2015-machine-intelligence-part-1'
add(cid, D, [
    patch('claims', cid, 'qualification',
          'The post gives a qualitative argument from fitness functions, survival as a useful subgoal and competition for resources to unintended harm; it gives no formal model or detailed account of how control would be lost.'),
    *evidence_fix(first_ev(cid), 229, Q, True),
], True)

cid = 'rd-r08-dafoe-russell-2016-yes-we-are-worried'
add(cid, D, [
    patch('claims', cid, 'qualification',
          'A short statement of the argument in a reply essay. It names a general route, the unpredictability and possible irreversibility of an optimisation process more intelligent than its designers, but works through no extinction scenario.'),
    *evidence_fix(first_ev(cid), 230, Q, True),
], True)

cid = 'rd-r09-bostrom-2002-existential-risks'
add(cid, D, [
    replace('claims', cid, 'qualification',
            'it names no weapon or attack, and it presents the scenario as conceivable, not likely.',
            'it names no weapon or attack and presents the scenario as conceivable, giving it no separate probability; the paragraph after the list assigns substantial probability to the shriek scenarios together.'),
    *evidence_fix(first_ev(cid), 237, Q, False),
], False)

# ---------------------------------------------------------------- already corrected
for cid, why in {
    'yk-y11-sl4-2000-10-03-yudkowsky-0010-0125-c': 'Already corrected in v0.26.1 (cross-family audit sample, item 119): the qualification and engagement take account of the section “Webmind’s awakening”. The sweep read the v0.26.0 baseline (4627aa9).',
    'rd-r06-pinker-2018-popsci-fear-robots': 'Already corrected in v0.26.1 (cross-family audit sample, item 80): the qualification quotes the trained-on-smiling-faces scenario and the “trained on millions of examples” sentence. The sweep read the v0.26.0 baseline (4627aa9).',
}.items():
    if REPORT[cid]['verdict'] != 'absence fails':
        raise SystemExit(cid)
    unchanged[cid] = {'item': REPORT[cid]['number'], 'verdict': REPORT[cid]['verdict'], 'reason': why}

flagged = {r['claimId'] for r in REPORT.values() if r.get('verdict') in ('absence fails', 'scope issue')}
done = {c['id'].split(':', 1)[1] for c in corrections} | set(unchanged)
if flagged != done:
    raise SystemExit(f'not covered: {sorted(flagged - done)}; extra: {sorted(done - flagged)}')
for cid in done:
    if cid.startswith(('aib-', 'ab-')):
        raise SystemExit(f'{cid}: excluded by the maintainer')

spec = {
    'description': 'Part 1 of the textual absence-claims sweep of 2026-11-02 (review/absence-claims-sweep-2026-11-02-part1.md, Codex, branch codex/absence-claims-sweep at f8e00f7): every checked record marked “absence fails” or “scope issue” corrected to what the source supports, with the sweep’s passage and locator. Two of the 41 were already corrected in v0.26.1. No earliest located role is withdrawn. The full record is in review/absence-sweep-apply-part1-2026-11-02.md. Applied by scripts/apply-recheck.ts; built by scripts/absence-sweep-apply-1-spec.py.',
    'date': DATE,
    'schemaVersion': json.load(open(os.path.join(ROOT, 'data/meta.json'), encoding='utf8'))['schemaVersion'],
    'snapshotPath': SNAP,
    'snapshotDescription': 'Rows changed by part 1 of the textual absence-claims sweep of 2026-11-02 (scripts/apply-recheck.ts, review/absence-sweep-apply-1-2026-11-02.json). Reverting it (src/editorial/historical-views.ts) reproduces the dataset as it was at baseCommit.',
    'unchanged': unchanged,
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
print(f'Wrote {SPEC}: {len(corrections)} corrections, {sum(len(c["patches"]) for c in corrections)} patches, {len(unchanged)} unchanged.')
