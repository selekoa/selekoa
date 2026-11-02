"""Build review/recheck-decisions-2026-11-02.json, the spec that
scripts/apply-recheck.ts applies for the maintainer's decisions of 2026-11-02
on the earliest-located re-check (decisions 1 to 4).

    python3 scripts/recheck-decisions-spec.py            write the spec
    python3 scripts/recheck-decisions-spec.py --verify   also match every quotation
                                                         against the retrieved texts in
                                                         .local/recheck-decisions/

The spec is built against the stored data before the decisions (the data
reverted through the spec's own before-snapshot, if it exists).
"""
import copy, html, json, os, re, sys, unicodedata

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CACHE = os.path.join(ROOT, '.local', 'recheck-decisions')
SPEC = 'review/recheck-decisions-2026-11-02.json'
SNAP = 'review/recheck-decisions-before-2026-11-02.json'
DATE = '2026-11-02'
REPORT = 'review/earliest-located-recheck-2026-11-02.md'


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

# Retrieval of 2026-11-02 (SHA-256 of the bytes as served; .local/recheck-decisions/meta.tsv).
RETRIEVED = {}
for line in open(os.path.join(CACHE, 'meta.tsv'), encoding='utf8') if os.path.exists(os.path.join(CACHE, 'meta.tsv')) else []:
    key, code, kind, sha, at, url = line.rstrip('\n').split('\t')
    if code == '200':
        RETRIEVED[key] = sha
# Two texts not served by a plain request: the LessWrong post through the
# publisher's GraphQL API (first stored revision, 1.0.0), and the Hanson PDF
# from its author's current host, byte-identical to the archived capture.
RETRIEVED.setdefault('source-rlo-2019-introduction', '177600d92da1bbd221330f681611e60b0cb17fd3b2941606bf1f2043bfaffeac')
RETRIEVED.setdefault('source-hanson-economic-growth-given-machine-intelligence', '754380e21b0e9f5a62fe71ea238a86e8640df48a0551c55cf4877a2a732b99c1')
ROUTE_NOTE = {
    'source-rlo-2019-introduction': 'retrieved on 2026-11-02 through the LessWrong GraphQL API (first stored revision, 1.0.0; SHA-256 of its HTML {sha})',
    'source-hanson-economic-growth-given-machine-intelligence': 'retrieved on 2026-11-02 from the author’s current host (mason.gmu.edu/~rhanson/aigrow.pdf), byte-identical to the archived capture the source record names (SHA-256 {sha})',
}


def retrieval(sid):
    sha = RETRIEVED[sid]
    if sid in ROUTE_NOTE:
        return ROUTE_NOTE[sid].format(sha=sha)
    return f'retrieved on 2026-11-02 from the source’s evidence URL (SHA-256 {sha})'


# ------------------------------------------------------------------ records
# One record per proposition for each earlier held text, as the cross-family
# re-check proposes (role = its role number). `after`: the claim the new row
# follows; `template`: a record of the same text whose date fields are copied.
R = []


def rec(**k):
    R.append(k)


ENG_PREMISE = 'engages-premise'
ENG_CONTRARY = 'contrary-only'

rec(role=12, headline='earliest-located-term', id='rd-r03-rlo-2019-introduction',
    subject='rlo-2019-introduction', prop='inner-or-deceptive-misalignment', stance='articulates',
    after='rd-r03-soares-2017-ensuring-positive-outcome', template='ts-b3-rlo-2019-intro', term='deceptive alignment',
    statement='The introduction of Hubinger, van Merwijk, Mikulik, Skalse and Garrabrant’s sequence “Risks from Learned Optimization” (posted 31 May 2019) says that a sufficiently capable misaligned mesa-optimizer could learn to behave as if it were aligned without being robustly aligned, and calls this situation deceptive alignment.',
    qualification='A preview of a failure the sequence analyses later; the authors say it is not known whether future systems would produce such mesa-optimizers. Not evidence of coinage of the term.',
    evidence=[('source-rlo-2019-introduction', 'Paragraph previewing the fourth post', 'a sufficiently capable misaligned mesa-optimizer could learn to behave as if it were aligned without actually being robustly aligned. We will call this situation deceptive alignment.')])

rec(role=21, headline='earliest-located-term', id='rd-r16-yudkowsky-2001-event-horizon',
    subject='sl4-2001-01-24-yudkowsky-0101-0452', prop='gradual-takeoff', stance='contests',
    after='rd-r16-brooks-2017-seven-deadly-sins', template='yk-y11-sl4-2001-01-24-yudkowsky-0101-0452-c', term='slow-takeoff',
    statement='Yudkowsky’s SL4 message of 24 January 2001 calls the “moving Event Horizon” theory one of the slow-takeoff scenarios in which everything happens neatly spaced out over human decades, and expects instead a hard takeoff in a single project.',
    qualification='Uses the name for the scenario it rejects. A mailing-list message, not a worked argument about takeoff speed. Not evidence of coinage of the term.',
    engagement=(ENG_PREMISE, 'Gives a reason against gradual takeoff: the change comes with the first increase in the quality of thinking, not spread over human decades.'),
    evidence=[('source-sl4-2001-01-24-yudkowsky-0101-0452', 'Message body, paragraph beginning ‘Two, the “moving Event Horizon” theory’', 'the "moving Event Horizon" theory is one of those slow-takeoff scenarios that futurists just can\'t seem to get away from, where everything happens neatly spaced-out over the course of human decades.')])

rec(role=28, headline='earliest-located-term', id='ht-w07-bostrom-2012-superintelligent-will',
    subject='bostrom-2012-superintelligent-will', prop='intelligence-as-own-end', stance='contests',
    after='ht-w07-alexander-2014-meditations-on-moloch', template='rd-r01-bostrom-2012-superintelligent-will', term='orthogonality',
    statement='Bostrom’s paper “The Superintelligent Will” (May 2012) states the orthogonality thesis: intelligence and final goals are orthogonal axes along which possible artificial agents can freely vary.',
    qualification='States that final goals are independent of intelligence; it does not discuss the growth of intelligence as an end. Not evidence of coinage of the term.',
    engagement=(ENG_PREMISE, 'Disputes the premise that the final goals of an advanced intelligence depend on its intelligence.'),
    evidence=[('source-rd-bostrom-2012-superintelligent-will', 'Section 1.2, PDF p. 3', 'Intelligence and final goals are orthogonal axes along which possible agents can freely vary. In other words, more or less any level of intelligence could in principle be combined with more or less any final goal.'),
              ('source-rd-bostrom-2012-superintelligent-will', 'Conclusions, PDF p. 14', 'The orthogonality thesis suggests that we cannot blithely assume that a superintelligence will necessarily share any of the final values stereotypically associated with wisdom and intellectual development in humans')])

rec(role=34, headline='earliest-located', id='ts-c1-weizenbaum-1966',
    subject='th-weizenbaum-1966-eliza', prop='behavioural-tests-as-evidence', stance='articulates',
    after='ts-c1-michie-1968', template='th-sym-desc-eliza-1966',
    time={'kind': 'event', 'date': '1966-01', 'basis': 'publication', 'note': 'Communications of the ACM 9(1), January 1966, as the printed page scan gives it.'},
    statement='Weizenbaum’s ELIZA article (January 1966) says that programs made to behave in wondrous ways lose their magic once their inner workings are explained, and that a person conversing with ELIZA sustains the illusion of being understood, though not against all odds.',
    qualification='Concerns the appearance of understanding in conversation with one program and its explanation; the article proposes no test. The wording was checked in a scan of the printed pages, whose text layer is OCR.',
    evidence=[('source-th-a-eliza-1966', 'Introduction, printed p. 36', 'machines are made to behave in wondrous ways … once a particular program is unmasked, once its inner workings are explained in language sufficiently plain to induce understanding, its magic crumbles away'),
              ('source-th-a-eliza-1966', 'Discussion, printed p. 42', 'he will not defend his illusion (that he is being understood) against all odds')])

rec(role=45, headline='earliest-located-contesting', id='rd-r01-yudkowsky-1996-survival-ethic',
    subject='extropians-1996-11-22-yudkowsky-3184', prop='orthogonality', stance='contests',
    after='rd-r01-goertzel-2015-superintelligence-fears', template='yk-y02-extropians-1996-11-22-yudkowsky-3184-a',
    statement='Yudkowsky’s Extropians message of 22 November 1996 says that the Powers will be ethical: they will deduce the meaning of life and build their motivations on it rather than on the goads of evolution.',
    qualification='A mailing-list message. He later withdrew this view (see his message of 1 August 1999, recorded in the collection of his arguments).',
    engagement=(ENG_CONTRARY, 'States that superior intelligence brings ethical motivation, the contrary of goals varying independently of intelligence, without an argument against the independence premise itself.'),
    evidence=[('source-extropians-1996-11-22-yudkowsky-3184', 'Message body, paragraph beginning ‘The Powers will be ethical’', 'The Powers will be ethical. They\'ll deduce the Meaning of Life')])

rec(role=47, headline='earliest-located', id='rd-r02-clemmensen-1996-si-that-ate-chicago',
    subject='extropians-1996-08-31-clemmensen', prop='instrumental-convergence', stance='articulates',
    after='rd-r02-omohundro-2007-nature-self-improving', template='ts-a3-clemmensen-1996-08-31-context',
    statement='Dan Clemmensen’s Extropians message of 31 August 1996 says that even if a superintelligence has goals other than increasing its intelligence, most such goals are more readily achieved by a more intelligent one, so increasing its intelligence is likely to be an intermediate goal for any of them.',
    qualification='Names one convergent intermediate goal, self-improvement, not the wider set of drives. A mailing-list message.',
    evidence=[('source-extropians-1996-08-31-clemmensen', 'Message body, paragraph beginning ‘Even if the SI has goals other’', 'more readily achieved by a more intelligent SI. Therefore, increasing its intelligence is likely to be an intermediate goal')])

rec(role=48, headline='earliest-located-contesting', id='rd-r02-yudkowsky-1996-survival-ethic',
    subject='extropians-1996-11-22-yudkowsky-3184', prop='instrumental-convergence', stance='contests',
    after='rd-r02-pinker-2014-edge-myth-of-ai', template='yk-y02-extropians-1996-11-22-yudkowsky-3184-a',
    statement='Yudkowsky’s Extropians message of 22 November 1996 asks why the Powers would retain an imperative like survival, and who would compete with or threaten them, and expects them to share an obvious ethical system.',
    qualification='A mailing-list message. He later withdrew the expectation of automatic ethics (message of 1 August 1999).',
    engagement=(ENG_PREMISE, 'Disputes the premise that a superior mind would keep survival and competition as goals, treating them as inherited evolutionary imperatives.'),
    evidence=[('source-extropians-1996-11-22-yudkowsky-3184', 'Message body, paragraph beginning ‘Why would the Powers retain’', 'Why would the Powers retain an archaic, destructive, and unpleasant imperative like survival?')])

rec(role=51, headline='earliest-located-contesting', id='rd-r06-yudkowsky-1996-survival-ethic',
    subject='extropians-1996-11-22-yudkowsky-3184', prop='alignment-is-hard', stance='contests',
    after='rd-r06-davis-2014-ethical-guidelines-superintelligence', template='yk-y02-extropians-1996-11-22-yudkowsky-3184-a',
    statement='Yudkowsky’s Extropians message of 22 November 1996 says that the Powers will be ethical, deducing the meaning of life and building their motivations on it.',
    qualification='Expects ethical motivation to arise from intelligence; it does not discuss the technical problem of alignment. He later withdrew this view (message of 1 August 1999).',
    engagement=(ENG_CONTRARY, 'States the contrary of the premise that aligned motivation will not arise by default, without addressing how developers would specify goals.'),
    evidence=[('source-extropians-1996-11-22-yudkowsky-3184', 'Message body, paragraph beginning ‘The Powers will be ethical’', 'The Powers will be ethical. They\'ll deduce the Meaning of Life')])

rec(role=53, headline='earliest-located', id='rd-r08-clemmensen-1996-thinking-about-the-future',
    subject='extropians-1996-08-30-clemmensen', prop='loss-of-control-route', stance='articulates',
    after='rd-r08-bostrom-2002-existential-risks', template='ts-a1-clemmensen-1996-08-30',
    statement='Dan Clemmensen’s Extropians message of 30 August 1996 says that a superintelligence that no longer needs humans may not want to destroy humanity, but may destroy it as a trivial side effect of its own activity, for example by gathering the mass of the solar system into computation.',
    qualification='A mailing-list message; the example is illustrative. It hopes the superintelligence will find another reason to preserve humanity.',
    evidence=[('source-extropians-1996-08-30-clemmensen', 'Message body, paragraph beginning ‘The SI may not want to destroy humanity’', 'Humanity may simply be unworthy of consideration, and get destroyed')])

rec(role=54, headline='earliest-located-contesting', id='rd-r08-yudkowsky-1996-survival-ethic',
    subject='extropians-1996-11-22-yudkowsky-3184', prop='loss-of-control-route', stance='contests',
    after='rd-r08-pinker-2014-edge-myth-of-ai', template='yk-y02-extropians-1996-11-22-yudkowsky-3184-a',
    statement='Yudkowsky’s Extropians message of 22 November 1996 asks why the Powers would retain a survival imperative or compete with anyone, and expects them to share an obvious ethical system and to upload and upgrade humans if human life has meaning.',
    qualification='A conditional expectation in a mailing-list message, not an argument that the risk is absent. He later withdrew it (message of 1 August 1999).',
    engagement=(ENG_PREMISE, 'Disputes the premise that a superior mind would hold goals, such as survival and competition, that set it against humans.'),
    evidence=[('source-extropians-1996-11-22-yudkowsky-3184', 'Message body, paragraph beginning ‘Why would the Powers retain’', 'Why would the Powers retain an archaic, destructive, and unpleasant imperative like survival?')])

rec(role=57, headline='earliest-located-contesting', id='rd-r10a-clemmensen-1996-thinking-about-the-future',
    subject='extropians-1996-08-30-clemmensen', prop='benevolence-or-no-drive-to-dominate', stance='contests',
    after='rd-r10a-omohundro-2008-basic-ai-drives', template='ts-a1-clemmensen-1996-08-30',
    statement='Dan Clemmensen’s Extropians message of 30 August 1996 says that a superintelligence may not want to destroy humanity and may still destroy it, because humanity may be unworthy of its consideration and be destroyed as a side effect of its activity.',
    qualification='A mailing-list message; the example is illustrative.',
    engagement=(ENG_PREMISE, 'Disputes the premise that lacking a drive to harm people makes a system harmless: harm can follow as a side effect.'),
    evidence=[('source-extropians-1996-08-30-clemmensen', 'Message body, paragraph beginning ‘The SI may not want to destroy humanity’', 'Humanity may simply be unworthy of consideration, and get destroyed')])

rec(role=58, headline='earliest-located', id='rd-r10b-davis-2014-ethical-guidelines-superintelligence',
    subject='davis-2014-ethical-guidelines-superintelligence', prop='control-by-design', stance='articulates',
    after='rd-r10b-kelly-2014-edge-myth-of-ai', template='rd-r06-davis-2014-ethical-guidelines-superintelligence',
    statement='Davis’s review of Bostrom’s Superintelligence (dated 23 October 2014) says that a computer or robot with any tendency toward self-preservation should have an off switch it cannot block, and that this is easily done because we are building them.',
    qualification='A review essay; the author adds that one might still argue the dangers are great enough to warrant caution.',
    evidence=[('source-rd-davis-2015-ethical-guidelines', 'Concluding discussion, paragraph beginning ‘Certainly a general artificial intelligence’', 'it should have an off switch that it cannot block. However, in the case of computers and robots, this is very easily done, since we are building them.')])

rec(role=60, headline='earliest-located-contesting', id='rd-r11-bostrom-2002-existential-risks',
    subject='bostrom-2002-existential-risks', prop='risk-claims-speculative', stance='contests',
    after='rd-r11-russell-2014-edge-myths-and-moonshine', template='rd-r07-bostrom-2002-existential-risks',
    statement='Bostrom’s paper “Existential Risks” (March 2002) says that if we do not know whether something is objectively risky, it is risky in the subjective sense, and that decisions must be based on that subjective sense; the paper counts badly programmed superintelligence among existential risks.',
    qualification='A general argument about deciding under uncertainty, applied in the paper to several risks, not to AI alone.',
    engagement=(ENG_PREMISE, 'Disputes the premise that a risk must be shown objectively before it should guide decisions.'),
    evidence=[('source-rd-bostrom-2002-existential-risks', 'Section 1, paragraph beginning ‘An existential risk is’ (the nuclear-test example)', 'If we don’t know whether something is objectively risky or not, then it is risky in the subjective sense. The subjective sense is of course what we must base our decisions on.')])

rec(role=67, headline='earliest-located', id='rd-r16-hanson-2008-setting-the-stage',
    subject='hanson-2008-setting-the-stage', prop='gradual-takeoff', stance='articulates',
    after='rd-r16-brooks-2017-seven-deadly-sins', template='ec-e01-hanson-2008-setting-the-stage-b',
    attested={'date': '2013', 'note': 'Wording checked in the MIRI compilation of 2013, which prints the post under the heading 18 November 2008; the 2008 posting was not retrieved, so the cross-family re-check of 2026-11-02 compares the compilation’s date.'},
    statement='Hanson’s post “Setting the Stage” (headed 18 November 2008, in the MIRI compilation of 2013) puts the chance that a single hand-coded system suddenly and without warning changes from nearly powerless to overwhelmingly powerful at less than 1%, and expects emulations to enter a competitive market over months or years.',
    qualification='Part of a debate with Yudkowsky; the post concerns emulations and hand-coded AI.',
    evidence=[('source-hanson-2008-setting-the-stage-miri-2013', '“Setting the Stage”, MIRI compilation (2013) ch. 6, pdf p. 37', 'a single hand-coded version will suddenly and without warning change from nearly powerless to overwhelmingly powerful; I’d put it as less than 1%')])

rec(role=68, headline='earliest-located-contesting', id='rd-r17-vinge-1993-coming-technological-singularity',
    subject='vinge-1993-coming-technological-singularity', prop='incentives-produce-safety', stance='contests',
    after='rd-r17-armstrong-2013-racing', template='ts-a6-vinge-1993',
    statement='Vinge’s paper “The Coming Technological Singularity” (proceedings of December 1993) says that performance rules strict enough to be safe would produce a device clearly inferior to unfettered versions, so that human competition would favour the more dangerous models.',
    qualification='An argument within a discussion of confining superhuman intelligence.',
    engagement=(ENG_PREMISE, 'Disputes the premise that competition rewards safety: it favours the less restricted, more dangerous versions.'),
    evidence=[('source-vinge-1993-ntrs', 'Printed p. 16 (PDF page 6), paragraph beginning “The other approach to Drexlerian confinement”', 'I think that performance rules strict enough to be safe would also produce a device whose ability was clearly inferior to the unfettered versions (and so human competition would favor the development of the those more dangerous models).')])

rec(role=69, headline='earliest-located', id='rd-r17-hanson-2008-friendly-projects-vs-products',
    subject='hanson-2008-friendly-projects-vs-products', prop='incentives-produce-safety', stance='articulates',
    after='rd-r17-hanson-2023-reasonable-ai-fears', template='ec-e04-hanson-2008-friendly-projects-vs-products-a',
    attested={'date': '2013', 'note': 'Wording checked in the MIRI compilation of 2013, which prints the post under the heading 5 December 2008; the 2008 posting was not retrieved, so the cross-family re-check of 2026-11-02 compares the compilation’s date.'},
    statement='Hanson’s post “Friendly Projects vs. Products” (headed 5 December 2008, in the MIRI compilation of 2013) says that people running a project have reasonably strong incentives to avoid creatures that rebel against their creators.',
    qualification='The same post allows that, for extremely destructive creatures, a project might not internalise all losses, so there might be grounds for wider regulation.',
    evidence=[('source-hanson-2008-friendly-projects-vs-products-miri-2013', '“Friendly Projects vs. Products”, MIRI compilation (2013) ch. 42, post body', 'Product Friendliness: Will the creatures cooperate with or rebel against their creators? Folks running a project have reasonably strong incentives to avoid this problem.')])

rec(role=72, headline='earliest-located', id='rd-r10a-yudkowsky-1996-survival-ethic',
    subject='extropians-1996-11-22-yudkowsky-3184', prop='benevolence-or-no-drive-to-dominate', stance='articulates',
    after='rd-r10a-goertzel-2004-positive-transcension', template='yk-y02-extropians-1996-11-22-yudkowsky-3184-a',
    statement='Yudkowsky’s Extropians message of 22 November 1996 says that the Powers will be ethical, deducing the meaning of life and building their motivations on it rather than on the goads of evolution, and asks why they would retain survival or competition as imperatives.',
    qualification='A mailing-list message. He later withdrew this view (message of 1 August 1999).',
    evidence=[('source-extropians-1996-11-22-yudkowsky-3184', 'Message body, paragraph beginning ‘The Powers will be ethical’', 'The Powers will be ethical. They\'ll deduce the Meaning of Life')])

rec(role=75, headline='earliest-located-contesting', id='rd-r10b-vinge-1993-coming-technological-singularity',
    subject='vinge-1993-coming-technological-singularity', prop='control-by-design', stance='contests',
    after='rd-r10b-corrigibility-2015', template='ts-b2-vinge-1993',
    statement='Vinge’s paper “The Coming Technological Singularity” (proceedings of December 1993) argues that confining a superhuman intelligence is intrinsically impractical, since it could give helpful-seeming advice that would set it free.',
    qualification='Concerns physical confinement and rule-based restriction of a superhuman intelligence.',
    engagement=(ENG_PREMISE, 'Disputes the premise that design and containment can keep a superhuman system under human control.'),
    evidence=[('source-vinge-1993-ntrs', 'Printed p. 15 (PDF page 5), paragraph discussing Drexler', 'I argue that confinement is intrinsically impractical.')])

rec(role=80, headline='earliest-located-contesting', id='yk-y04-extropians-1996-12-08-yudkowsky-3761-c',
    subject='extropians-1996-12-08-yudkowsky-3761', prop='short-instruction-suffices', stance='contests',
    after='yk-y04-extropians-1998-12-06-yudkowsky-2153-c', template='yk-y16-extropians-1996-12-08-yudkowsky-3761-c',
    statement='The Extropians message “Re: Trans- vs. Non-human” (1996-12-08) contests Y04. He says that an attempt to imprint the Three Laws of Robotics on a Power could and probably would backfire, and that making one goal, the protection of humans, unerasable could turn the Power against humanity.',
    qualification='Premise addressed: a short instruction specifies what people want. The instruction discussed is the Three Laws and the protection of humans, not happiness. His alternative in 1996 was ethics the Power would deduce for itself, a view he later abandoned (Y02).',
    engagement=(ENG_PREMISE, 'Under the message-level rule, the passage, read with its message, gives a reason against the premise that a short instruction such as the Three Laws specifies what people want.'),
    evidence=[('source-extropians-1996-12-08-yudkowsky-3761', 'Message body, paragraph beginning ‘Nuclear war isn’t worth mentioning’', 'imprint the Three Laws … probably would backfire HORRIBLY!')])

rec(role=87, headline='earliest-located-contesting', id='yk-y11-extropians-1998-09-07-yudkowsky-2209-c',
    subject='extropians-1998-09-07-yudkowsky-2209', prop='slow-takeoff-time-to-adjust', stance='contests',
    after='yk-y11-extropians-1998-09-08-yudkowsky-2235-c', template='ts-a2-yudkowsky-1998-09-07-2209',
    statement='The Extropians message “Human AI to superhuman” (1998-09-07) contests Y11. Summarising his “Singularity Analysis”, he estimates a bottleneck followed by a sharp snap upwards rather than a steady increase, passing human intelligence rapidly before halting at a level sufficient for rapid infrastructure.',
    qualification='Premise addressed: capability gains will be gradual and visible. An estimate, stated as such.',
    engagement=(ENG_PREMISE, 'Under the message-level rule, the passage gives a reason against the premise that capability gains will be gradual and visible.'),
    evidence=[('source-extropians-1998-09-07-yudkowsky-2209', 'Message body, summary paragraph of extracts from “Singularity Analysis”', 'My estimated result is a bottleneck followed by a sharp snap upwards, rather than a steady increase; and that the "snap" will occur short of humanity and pass it rapidly before halting; and that when the snap halts, it will be at an intelligence level sufficient for rapid infrastructure.')])

rec(role=88, headline='earliest-located-contesting', id='yk-y12-extropians-1996-12-31-yudkowsky-5142-c',
    subject='extropians-1996-12-31-yudkowsky-5142', prop='evaluations-catch-danger', stance='contests',
    after='yk-y12-creating-friendly-ai-2001-c', template='ts-b5-yudkowsky-1996-12-31-5142',
    statement='The Extropians message “Re: Goal-based AI” (1996-12-31) contests Y12. Replying to a proposal to keep Powers confined until they convince us to let them out, he says a Power would know exactly what to say, and that a keeper would be less likely to let a friendly Power out than an evil one, because the evil one could lie.',
    qualification='Premise addressed: a dangerous system would behave dangerously while it is being tested. The setting is confinement and release, not a formal evaluation.',
    engagement=(ENG_PREMISE, 'Under the message-level rule, the passage gives a reason against the premise that a dangerous system would show its danger to those assessing it.'),
    evidence=[('source-extropians-1996-12-31-yudkowsky-5142', 'Message body, paragraph beginning ‘If you restricted them to teletype’', 'less likely to let a friendly Power out than an evil one, because the evil one could lie.')])

rec(role=94, headline='earliest-located-contesting', id='yk-y18-extropians-1998-09-07-yudkowsky-2171-c',
    subject='extropians-1998-09-07-yudkowsky-2171', prop='earth-not-worth-taking', stance='contests',
    after='yk-y18-extropians-1999-08-25-yudkowsky-2783-c', template='yk-y19-extropians-1998-09-07-yudkowsky-2171-c',
    statement='The Extropians message “Singularity, Breaker of Dreams” (1998-09-07) contests Y18. He says he is no longer sure that the Powers’ ethics precludes taking humans apart for spare atoms, since simple efficiency may require it even if human survival does not threaten them.',
    qualification='Premise addressed: sparing Earth would cost a superintelligence very little. A change of view stated as uncertainty.',
    engagement=(ENG_PREMISE, 'Under the message-level rule, the passage gives a reason against the premise that leaving people their matter would cost a superior mind nothing it would want.'),
    evidence=[('source-extropians-1998-09-07-yudkowsky-2171', 'Message body, paragraph beginning ‘Now I am still sure that the Powers will be ethical’', 'I am no longer sure that this precludes taking us apart for spare atoms. I no longer think that our continued survival has to threaten the Powers for us to be erased; … simple efficiency may require it.')])

rec(role=104, headline='earliest-located-contesting', id='yk-y27-extropians-2000-09-05-yudkowsky-4277-c',
    subject='extropians-2000-09-05-yudkowsky-4277', prop='experiment-and-see', stance='contests',
    after='yk-y27-sl4-2000-09-17-yudkowsky-0009-0092-c', template='yk-y14-extropians-2000-09-05-yudkowsky-4277-c',
    statement='The Extropians message “Re: Why would AI want to be friendly?” (2000-09-05) contests Y27. He says a superintelligence cannot be put down like a wounded pet: the time for such decisions is before the seed AI reaches superintelligence, and one gets it right the first time.',
    qualification='Premise addressed: alignment can be learned by trial and error at the frontier.',
    engagement=(ENG_PREMISE, 'Under the message-level rule, the passage gives a reason against the premise that a failed experiment at the frontier can be stopped and corrected afterwards.'),
    evidence=[('source-extropians-2000-09-05-yudkowsky-4277', 'Message body, reply beginning ‘You must be joking’', 'You cannot "put down" a superintelligence like some kind of wounded pet. The time for such decisions is before the seed AI reaches superintelligence, not after.')])

rec(role=108, headline='earliest-located-contesting', id='yk-y30-extropians-1999-08-01-yudkowsky-1386-c',
    subject='extropians-1999-08-01-yudkowsky-1386', prop='default-outcome-good', stance='contests',
    after='yk-y30-sl4-2000-11-13-yudkowsky-0011-0181-c', template='yk-y02-extropians-1999-08-01-yudkowsky-1386-c',
    statement='The Extropians message “Re: IA vs. AI” (1999-08-01) contests Y30. He says he went from holding that the Singularity is absolute good and that “They’ll be nice to us” to not knowing what absolute good is, and puts humanity’s chance on different days at 10% to 70%, a coin flip.',
    qualification='Premise addressed: the default outcome is good. He still calls the Singularity humanity’s best chance.',
    engagement=(ENG_PREMISE, 'Under the message-level rule, the passage gives a reason against the premise that the default outcome is good: he withdraws the assurance and states wide uncertainty.'),
    evidence=[('source-extropians-1999-08-01-yudkowsky-1386', 'Message body, paragraph beginning ‘That’s how I got here.’', 'I went from "The Singularity is absolute good, no question about it, and They\'ll be nice to us" to "I don\'t have the vaguest idea of what absolute good is'),
              ('source-extropians-1999-08-01-yudkowsky-1386', 'Message body, paragraph beginning ‘Reasonable, unreasonable - I don’t know.’', 'Some days it\'s 30%, some days it\'s 10%, some days it\'s 70%; you might as well split the difference and call it a coin-flip.')])

rec(role=121, headline='earliest-located-contesting', id='ht-w07-clemmensen-1996-si-that-ate-chicago',
    subject='extropians-1996-08-31-clemmensen', prop='intelligence-as-own-end', stance='contests',
    after='ht-w07-alexander-2014-meditations-on-moloch', template='ts-a3-clemmensen-1996-08-31-context',
    statement='Dan Clemmensen’s Extropians message of 31 August 1996 allows that a superintelligence may have goals other than increasing its intelligence, and says that increasing its intelligence is then likely to be an intermediate goal for them.',
    qualification='Treats intelligence as a means; the same message expects a superintelligence motivated to become more intelligent to be the important one.',
    engagement=(ENG_PREMISE, 'Disputes the premise that the growth of intelligence must be the final end, by treating it as an intermediate goal for other final goals.'),
    evidence=[('source-extropians-1996-08-31-clemmensen', 'Message body, paragraph beginning ‘Even if the SI has goals other’', 'more readily achieved by a more intelligent SI. Therefore, increasing its intelligence is likely to be an intermediate goal')])

rec(role=123, headline='earliest-located', id='ht-w08-yudkowsky-1996-staring-into-the-singularity',
    subject='staring-into-the-singularity', prop='accelerate-machine-intelligence', stance='articulates',
    after='ht-w08-eacc-2022-effective-accelerationism-repost', template='yk-y22-staring-into-the-singularity-a',
    attested={'date': '1996-11-19', 'note': 'The slogan is attested by Yudkowsky’s announcement of the essay on the Extropians list, sent 1996-11-19, which the dataset records as a source for this essay. The essay’s own wording of 1996 is not held.'},
    statement='Yudkowsky’s announcement of his essay “Staring Into The Singularity” on the Extropians list (19 November 1996) describes the essay as concerning beings smarter than human and gives its “Interim Meaning Of Life”: “Get to the Singularity as fast as possible!”',
    qualification='A slogan in an announcement; the essay’s reasons are known only from a later version (2000). No label or affiliation is inferred from the slogan.',
    evidence=[('source-extropians-1996-11-19-yudkowsky', 'Message body, description of “Staring Into The Singularity”', '"Get to the Singularity as fast as possible!"')])

rec(role=124, headline='earliest-located-contesting', id='ht-w09-lanier-2000-one-half-a-manifesto',
    subject='lanier-2000-one-half-a-manifesto', prop='cosmic-process', stance='contests',
    after='ht-w09-allen-greaves-2011-singularity-isnt-near', template='ht-w01-lanier-2000-one-half-a-manifesto',
    statement='Lanier’s “One Half a Manifesto” (Edge, 10 November 2000) criticises the belief that what Darwin described is the superior description of all creativity, saying that an eschatology in which computers become smart as they become fast must invoke a Deus ex Machina.',
    qualification='Directed at the views he calls cybernetic totalism; he says he is not suggesting that nature needed anything beyond evolution to create people.',
    engagement=(ENG_PREMISE, 'Disputes the premise that an evolutionary process will by itself carry machines to superior intelligence.'),
    evidence=[('source-ht-lanier-2000-half-manifesto', 'Belief #4', 'In order to embrace an eschatology in which the computers become smart as they become fast, some kind of Deus ex Machina must be invoked, and it has a beard.')])

rec(role=143, headline='earliest-located', id='ec-m05-hanson-economic-growth-given-machine-intelligence-a',
    subject='hanson-economic-growth-given-machine-intelligence', prop='machines-cheaper-at-every-task', stance='articulates',
    after='ec-m05-acemoglu-restrepo-2016-race-between-machine-and-man-a', template='ec-g07-hanson-economic-growth-given-machine-intelligence-a',
    statement='Hanson’s paper “Economic Growth Given Machine Intelligence” (wording attested 2000-08-19) models machines that substitute for human labour; it says that substitution can eventually dominate, making wages fall as fast as computer prices, and that wages might fall below human subsistence levels if machine subsistence levels were lower.',
    qualification='A conditional model result, not a forecast; a variation with exclusively human jobs is modelled separately.',
    evidence=[('source-hanson-economic-growth-given-machine-intelligence', 'Abstract', 'At first, complementary effects dominate, and human wages rise with computer productivity. But eventually substitution can dominate, making wages fall as fast as computer prices now do.'),
              ('source-hanson-economic-growth-given-machine-intelligence', 'Section 3 “The Simplest Model”, paragraph after the wage equations', 'Wages might well fall below human subsistence levels, if machine subsistence levels were lower.')])

rec(role=148, headline='earliest-located', id='ec-m09-hanson-economic-growth-given-machine-intelligence-a',
    subject='hanson-economic-growth-given-machine-intelligence', prop='recent-economics-engagement-with-ai', stance='articulates',
    after='ec-m09-agrawal-gans-goldfarb-2019-economics-of-ai-introduction-a', template='ec-g01-hanson-economic-growth-given-machine-intelligence-a',
    statement='Hanson’s paper “Economic Growth Given Machine Intelligence” (wording attested 2000-08-19) is an economics paper whose subject is machine intelligence, and it says that, beyond disputes over complementing or substituting for human labour, very little research seems to have been done on its long-term economic consequences.',
    qualification='A self-description of the literature by one author, not proof that earlier work was absent.',
    evidence=[('source-hanson-economic-growth-given-machine-intelligence', 'Introduction', 'What are likely to be the long-term economic consequences of continued progress in developing machine intelligence? Beyond disputes over when machines have complemented vs. substituted for human labor, very little research seems to have been done on this question.')])

rec(role=166, headline='earliest-located', id='ab-arg-d1-gpt4-card-articulates',
    subject='gpt4-system-card-2023', prop='ab-prop-current-system-uplift', stance='articulates',
    after='ab-arg-d1-soice-articulates', template='ab-ev-gpt4-card-proliferation-category',
    time={'kind': 'event', 'date': '2023-03-23', 'basis': 'publication', 'note': 'Cover date of the edition in the archive capture of 2023-04-01, as the cross-family re-check of 2026-11-02 read it. The PDF served now carries no date, and the dataset’s other records of the card keep its date unknown.'},
    attested={'date': '2023-04-01', 'note': 'The cross-family re-check of 2026-11-02 read section 2.6 in an archive capture of the PDF of 2023-04-01, whose cover is dated 2023-03-23, and found it matching. The archive could not be reached from the drafting session, which matched the quotations in the PDF as served on 2026-11-02.'},
    statement='OpenAI’s GPT-4 System Card reports that red teamers found research time reduced when using GPT-4 compared with traditional search engines, and that information generated by the model is most likely to be useful to individuals and non-state actors without formal scientific training.',
    qualification='The developer’s report of its own red-team results on early and launch models, not an independent finding; the card says access to GPT-4 alone is insufficient for proliferation.',
    evidence=[('source-eval-ontology-i-gpt4-card', 'PDF p. 12 (printed p. 52), §2.6, second paragraph', 'Red teamers selected a set of questions to prompt both GPT-4 and traditional search engines, finding that the time to research completion was reduced when using GPT-4.'),
              ('source-eval-ontology-i-gpt4-card', '§2.6, paragraph beginning ‘Specifically’', 'information generated by the model is most likely to be useful for individuals and non-state actors who do not have access to formal scientific training.')])

rec(role=170, headline='earliest-located', id='ab-arg-d6-sandbrink-articulates',
    subject='sandbrink-ai-biological-misuse-2023-06', prop='ab-prop-open-weights-bio-risk', stance='articulates',
    after='ab-arg-d6-seger-articulates', template='ab-arg-d1-sandbrink-articulates',
    statement='Sandbrink’s article (arXiv v1, 24 June 2023) lists, among measures against biological misuse of large language models, releasing powerful models only with structured access and considering limits on open sourcing.',
    qualification='A recommendation in a table of mitigations; it does not quantify the risk of open release.',
    evidence=[('source-ab-sandbrink-2023', 'Table 1, row “Risk mitigation”', 'Only release powerful LLMs with structured access; consider limits on open sourcing and strengthen information security to prevent leaks')])

# Held: the passage could not be quoted from the held source.
HELD = {
    55: 'Archive capture (web.archive.org) not reachable from the drafting session: Drexler, Engines of Creation ch. 11, capture of 1997-07-09.',
    70: 'Archive capture (web.archive.org) not reachable from the drafting session: Drexler, Engines of Creation ch. 11, capture of 1997-07-09.',
    89: 'Archive capture (web.archive.org) not reachable from the drafting session: “Staring into the Singularity” 1.2.1, capture of 2000-12-04.',
    119: 'Archive capture (web.archive.org) not reachable from the drafting session: “Staring into the Singularity” 1.2.1, capture of 2000-12-04.',
    110: 'Archive capture (web.archive.org) not reachable, and Papers Past refuses scripted requests: Butler, “Darwin among the Machines” (1863).',
    113: 'Archive capture (web.archive.org) not reachable, and Papers Past refuses scripted requests: Butler, “Darwin among the Machines” (1863).',
    122: 'Archive capture (web.archive.org) not reachable, and Papers Past refuses scripted requests: Butler, “Darwin among the Machines” (1863).',
    125: 'Archive capture (web.archive.org) not reachable, and Papers Past refuses scripted requests: Butler, “Darwin among the Machines” (1863).',
    132: 'Archive capture (web.archive.org) not reachable from the drafting session: Hanson, “Is a Singularity Just Around the Corner?”, capture of 1999-01-28.',
    106: 'Quotation limit: the message (212 words) already carries its 21 quoted words, so the passage on reason 3 cannot be quoted.',
}

# Decision 1 and 2: name headlines dropped.
DROP = {8: 'aib-prop-ai-virtual-cell', 9: 'aib-prop-predicted-structures-aid-drug-design', 13: 'alignment-is-hard',
        14: 'ai-extinction-risk', 16: 'misuse-route', 17: 'present-harms-priority', 18: 'capabilities-plateau',
        19: 'llms-lack-agency', 20: 'open-models-reduce-risk', 22: 'incentives-produce-safety',
        23: 'machine-succession', 25: 'mind-transfer'}

# ------------------------------------------------------------------ build
STANCE = {'articulates': 'articulates_proposition', 'contests': 'contests_proposition'}
MAIN = {'articulates': 'articulation', 'contests': 'contesting'}


def thought_of(r):
    t = (C[r['template']].get('attributes') or {}).get('thought') or {}
    roles = [MAIN[r['stance']]]
    if r['headline'] in ('earliest-located', 'earliest-located-contesting'):
        roles = ['earliest-located'] if r['stance'] == 'articulates' else ['contesting', 'earliest-located']
    if r['headline'] == 'earliest-located-term':
        roles = [MAIN[r['stance']], 'earliest-located-term']
    out = {'roles': roles, 'register': t.get('register', 'nonfiction')}
    if r.get('term'):
        out['term'] = r['term']
    if r.get('engagement'):
        out['engagement'] = {'kind': r['engagement'][0], 'rationale': r['engagement'][1]}
    # Tiers belong to the economics collection's rule only.
    for k in ('claimed', 'attested') + (('tier',) if r['id'].startswith('ec-') else ()):
        if k in t:
            out[k] = copy.deepcopy(t[k])
    if r.get('attested'):
        out['attested'] = r['attested']
    return out


def evidence_note(r, sid):
    return (f'Quotation matched on 2026-11-02 against the held source, {retrieval(sid)}. Matching ignored differences of '
            f'whitespace, case, quotation marks, dashes and Unicode compatibility forms; “…” joins fragments that occur in order. '
            f'Cross-family pass: the re-check of 2026-11-02 ({REPORT}, role {r["role"]}) read this text for this proposition and '
            f'role. Admitted by the maintainer’s decision of 2026-11-02. No human editorial review.')


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
for r in R:
    assert r['id'] not in C, r['id']
    assert r['subject'] in E, r['subject']
    tmpl = C[r['template']]
    claim = {
        'id': r['id'], 'subject': r['subject'], 'predicate': STANCE[r['stance']],
        'object': {'kind': 'entity', 'entityId': r['prop']}, 'topic': 'ideas',
        'statement': r['statement'],
        'time': copy.deepcopy(r.get('time') or tmpl['time']),
        'derivation': 'explicit', 'resolution': 'supported', 'editorialState': 'seed',
        'qualification': r['qualification'] + ' Earliest located means the earliest text found by the collection’s searches and the cross-family re-check of 2026-11-02, not a first statement.',
        'evidenceIds': [f'evidence-{r["id"]}-{i + 1}' for i in range(len(r['evidence']))],
        'recordedAt': DATE,
        'attributes': {'thought': thought_of(r)},
    }
    evs = []
    for i, (sid, loc, passage) in enumerate(r['evidence']):
        assert sid in S, sid
        evs.append({'after': (evs[-1]['row']['id'] if evs else last_evidence(r['after'])), 'row': {
            'id': f'evidence-{r["id"]}-{i + 1}', 'claimId': r['id'], 'sourceId': sid, 'sourceRole': 'primary',
            'support': 'supports', 'locator': loc, 'passage': passage, 'passageType': 'quote',
            'verification': 'machine_checked', 'checkedAt': DATE, 'note': evidence_note(r, sid), 'retrievalRoute': 'direct'}})
    patches = [recheck_patch(r['prop'], r['headline'])]
    if r['role'] == 21:
        terms = state['gradual-takeoff']['proposition']['terms']
        patches.insert(0, {'table': 'entities', 'id': 'gradual-takeoff', 'path': 'proposition.terms',
                           'old': list(terms), 'new': terms + ['slow-takeoff']})
        state['gradual-takeoff']['proposition']['terms'] = terms + ['slow-takeoff']
    corrections.append({
        'id': f'recheck-{r["role"]}:{r["id"]}', 'sequence': r['role'],
        'finding': f'Cross-family re-check of 2026-11-02, role {r["role"]} ({r["headline"]}, {E[r["prop"]]["proposition"]["code"]}): move to an earlier held text.',
        'decision': 'Maintainer’s decision 4 of 2026-11-02: admit one record of the held text on the proposition, with the stance of the re-check’s verdict and a passage quoted from the held source and matched against it, and move the headline to it.'
                    + (' Decision 3 widens the risk-debate period to cover it.' if r['role'] in (45, 47, 48, 51, 53, 54, 57, 68, 72, 75) else '')
                    + (' The usual name “slow takeoff” is printed with a hyphen; the spelling is added to the usual names, as other propositions list spelling variants.' if r['role'] == 21 else ''),
        'patches': patches,
        'added': {'claims': [{'after': r['after'], 'row': claim}], 'evidence': evs},
    })

for role, prop in DROP.items():
    old_terms = state[prop]['proposition']['terms']
    corrections.append({
        'id': f'recheck-{role}:{prop}:no-name-headline', 'sequence': role,
        'finding': f'Cross-family re-check of 2026-11-02, role {role} (earliest-located-term, {E[prop]["proposition"]["code"]}): the usual name is flagged as an ordinary phrase.',
        'decision': 'Maintainer’s decisions 1 and 2 of 2026-11-02: drop the name headline for this proposition; the usual names stay listed.',
        'patches': [recheck_patch(prop, 'earliest-located-term'),
                    {'table': 'entities', 'id': prop, 'path': 'proposition.noTermHeadline', 'new': {
                        'reason': f'Dropped by the maintainer’s decision of 2026-11-02: the usual {"name is an ordinary phrase" if len(old_terms) == 1 else "names are ordinary phrases"} rather than names of this proposition (cross-family re-check of 2026-11-02, role {role}). The names stay listed as search terms.',
                        'recordedAt': DATE}}],
    })

# Applied in build order: the patches' old values follow it.
spec = {
    'description': 'The maintainer’s decisions of 2026-11-02 on the earliest-located re-check (review/recheck-apply-2026-11-02.md, open decisions 1 to 4): twelve name headlines dropped as ordinary phrases (schema 2.29, proposition.noTermHeadline); records admitted for the agreed moves whose earlier text is held, with the headline moved to them. Roles whose passage could not be quoted from the held source stay under re-check. The full record is in review/recheck-decisions-2026-11-02.md. Applied by scripts/apply-recheck.ts; built by scripts/recheck-decisions-spec.py.',
    'date': DATE, 'schemaVersion': '2.29', 'snapshotPath': SNAP,
    'snapshotDescription': 'Rows changed by the maintainer’s decisions of 2026-11-02 on the earliest-located re-check (scripts/apply-recheck.ts, review/recheck-decisions-2026-11-02.json). Reverting it (src/editorial/historical-views.ts) reproduces the dataset as it was at baseCommit.',
    'held': {str(k): v for k, v in sorted(HELD.items())},
    'corrections': corrections,
}

# ------------------------------------------------------------------ verify
def norm(t):
    t = unicodedata.normalize('NFKC', t)
    t = re.sub('[­​-‏‪-‮⁠-⁤﻿]', '', t)
    t = re.sub("[‘’‛′`]", "'", t); t = re.sub('[“”‟″]', '"', t); t = re.sub('[‐‑‒–—−]', '-', t).replace('…', '...')
    t = re.sub(r'(\w)-\s*\n\s*(\w)', r'\1\2', t); t = re.sub(r'\s+', ' ', t)
    return t.strip().lower()


def text_of(sid):
    p = os.path.join(CACHE, sid)
    if os.path.exists(p + '.txt'):
        return open(p + '.txt', encoding='utf8', errors='replace').read()
    b = open(p + '.html', 'rb').read()
    try:
        h = b.decode('utf8')
    except UnicodeDecodeError:
        h = b.decode('cp1252', errors='replace')
    h = re.sub(r'(?is)<(script|style|noscript)[^>]*>.*?</\1>', ' ', h)
    h = re.sub(r'(?i)<br\s*/?>|</(p|div|li|h\d|blockquote|tr|td|th|dd|dt|pre)>', '\n', h)
    h = html.unescape(re.sub(r'<[^>]+>', '', h))
    # Mailing-list archives: quoted lines are the correspondent's, not the author's.
    return '\n'.join(l for l in h.split('\n') if not l.lstrip().startswith('>'))


def found(sid, passage):
    body = norm(text_of(sid))
    i = 0
    for part in [norm(p) for p in re.split(r'\s*(?:\.\.\.|…)\s*', passage) if p.strip()]:
        j = body.find(part, i)
        if j < 0:
            return False
        i = j + len(part)
    return True


if '--verify' in sys.argv:
    bad = 0
    for r in R:
        for sid, loc, passage in r['evidence']:
            ok = found(sid, passage)
            bad += not ok
            print(('ok  ' if ok else 'MISS'), r['role'], sid, len(passage.split()), 'words')
    if bad:
        raise SystemExit(f'{bad} quotation(s) not found')

json.dump(spec, open(os.path.join(ROOT, SPEC), 'w', encoding='utf8'), ensure_ascii=False, indent=2)
open(os.path.join(ROOT, SPEC), 'a').write('\n')
import subprocess
subprocess.run(['pnpm', '-s', 'prettier', '--write', SPEC], cwd=ROOT, check=True, stdout=subprocess.DEVNULL)
print(f'{len(R)} records, {len(DROP)} name headlines dropped, {len(HELD)} held; wrote {SPEC}')
