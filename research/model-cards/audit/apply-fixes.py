# Applies the same-family audit's non-material fixes (audit/findings.json) to the
# drafts, and widens two patterns the audit found in its sample to every cell:
# not-found cells without a note, and not-applicable Q04/Q05 cells whose note
# does not give the basis. Run once from research/model-cards: python3 -I audit/apply-fixes.py
import glob, json

DRAFTS = [f for f in glob.glob('drafts/*.json') if not f.split('/')[-1].startswith(('sources-', 'inventory-'))]
docs = {f: json.load(open(f)) for f in DRAFTS}
cells = {f"{c['card']}:{c['question']}": c for d in docs.values() for c in d['cells']}
changed = []

def note(k, new):
    cells[k]['note'] = new; changed.append(k)
def replace(k, old, new):
    assert old in cells[k]['note'], k
    cells[k]['note'] = cells[k]['note'].replace(old, new); changed.append(k)
def set_aside(k, locator, reason):
    s = cells[k].setdefault('search', {})
    s.setdefault('setAside', []).append({'locator': locator, 'reason': reason}); changed.append(k)

# Audit items (numbers as in audit/findings.json)
replace('meta-muse-spark-1-3:Q05', "a residual 'moderate or lower' assessment in all three domains",
        "a residual 'moderate or lower' assessment for chemical and biological and for cybersecurity, and a 'moderate or lower' Loss of Control assessment")  # 10
replace('openai-gpt-6-luna-october-29:Q05', 'Cybersecurity and Biological and Chemical: High.',
        'Cybersecurity and Biological and Chemical: treated as High.')  # 18
set_aside('anthropic-claude-haiku-5-5:Q14', 'Section 6 (chain-of-thought controllability), PDF p. 93',
          'The UK AI Security Institute is named as the source of a prompt used by the developer, not as having tested or received access to this model.')  # 22
set_aside('microsoft-phi-4-mini-flash-reasoning:Q05', 'Safety Evaluation and Red-Teaming',
          "'Risk and Safety Evaluation framework' names an evaluation tool, not a frontier safety framework.")  # 13
note('microsoft-phi-4-mini-flash-reasoning:Q05', "The card postdates Microsoft's Frontier Governance Framework (February 2025) but names no framework (Q03); no outcome in a framework's categories was found.")  # 13
note('microsoft-mai-cyber-1-1-flash:Q05', "The card names no frontier framework (Q03); no outcome in a framework's categories was found.")  # 14
set_aside('microsoft-phi-4-mini-flash-reasoning:Q10', "Responsible AI Considerations, 'Election Information Reliability'",
          'A stated product limitation, not an evaluation of persuasion.')  # 26
replace('xai-grok-4-7:Q16', 'and that residual jailbreak failures are monitored',
        'and that residual jailbreak failures are treated as cases for ongoing monitoring as new techniques emerge')  # 36
note('openai-gpt-6-luna-october-29:Q12', "The card describes an automated red-teaming agent used in adversarial training, and automated 'GPT-Red' evaluations of direct and indirect prompt injection. It does not describe adversarial testing of this model as red-teaming, and reports no human red-teaming.")  # 41
note('xai-grok-4-1:Q10', 'A persuasion evaluation (MakeMeSay) is reported with the stated conclusion quoted.')  # 46
cells['anthropic-claude-2-1:Q02']['note'] += ' The November 21, 2023 date on PDF p. 1 is the card’s update, not a release date.'; changed.append('anthropic-claude-2-1:Q02')  # 48
set_aside('xai-grok-4-7:Q15', '§1.1 Overview, PDF p. 5',
          'Availability channels and a planned consumer release, stated without a decision.')  # 59

# Widening 1: not-applicable Q04/Q05 cells give their basis (audit items 8, 11, 12).
for k, c in cells.items():
    if c['status'] == 'not-applicable' and c['question'] in ('Q04', 'Q05') and c.get('note') == 'Q03 is not applicable.':
        note(k, 'Not applicable because Q03 is not applicable: the card predates every framework edition of its developer recorded in the dataset (see Q03).')

# Widening 2: every not-found cell carries a note (audit items 13, 14, 23, 24, 26, 28, 29, 32, 33, 38, 51, 58).
WHAT = {
    'Q01': 'No date printed on the card or its own page was found; repository commit dates are not counted as the card’s date.',
    'Q02': 'No release or availability date, and no release form, was found in the card.',
    'Q03': 'No passage naming a frontier safety framework of the developer was found.',
    'Q04': 'No link or reference to a framework document was found.',
    'Q05': 'No outcome in a framework’s categories was found.',
    'Q06': 'No safeguards tied to a determination or threshold were found.',
    'Q07': 'No chemical or biological evaluation was found.',
    'Q08': 'No evaluation of offensive cyber capability was found.',
    'Q09': 'No evaluation of autonomy, self-replication, self-improvement or AI research and development was found.',
    'Q10': 'No evaluation of persuasion or manipulation was found.',
    'Q11': 'No evaluation of misalignment, deception, scheming or sabotage was found.',
    'Q12': 'No passage reporting red-teaming was found.',
    'Q13': 'No external organisation is named as having tested or evaluated the model.',
    'Q14': 'No government body is named as having tested or received access to the model.',
    'Q15': 'No passage stating a release or deployment decision was found.',
    'Q16': 'No stated limit or uncertainty of the card’s evaluations was found.',
}
for k, c in cells.items():
    if c['status'] == 'not-found' and not c.get('note'):
        note(k, WHAT[c['question']] + ' The search is recorded below.')

for f, d in docs.items():
    json.dump(d, open(f, 'w'), indent=2, ensure_ascii=False)
print(len(changed), 'changes;', len(set(changed)), 'cells')
