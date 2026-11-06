# Applies the adjudication of the cross-family check (cross-family-check-2026-11-02.json,
# OpenAI Codex, checked 2026-11-03) to the drafts, and marks the cells the check
# covered differently: excluded items, the one unresolved disagreement, and corrected cells.
# Run once from research/model-cards: python3 -I adjudication/apply-2026-11-03.py
import glob, json

DRAFTS = [f for f in glob.glob('drafts/*.json') if not f.split('/')[-1].startswith(('sources-', 'inventory-'))]
docs = {f: json.load(open(f)) for f in DRAFTS}
cells = {f"{c['card']}:{c['question']}": c for d in docs.values() for c in d['cells']}
REPORT = 'cross-family-check-2026-11-02.json, item'

def mark(k, item, result, **extra):
    cells[k]['crossFamily'] = {'item': item, 'result': result, **extra}

# 96: transcription repair. The cross-page sentence cannot be quoted verbatim from the
# text layer (it drops the hyphen of ASL-3 and inserts the page number), so the
# adjacent conclusion on p. 10, verbatim and checkable, replaces it.
k = 'anthropic-claude-3-5-haiku-sonnet-new:Q09'
p = cells[k]['passages'][1]
assert '…' in p['quote']
p['locator'] = "Section 3.2.1 'Results', PDF p. 10"
p['quote'] = 'Based on our analysis, we judge that the upgraded Claude 3.5 Sonnet does not require ASL-3 safeguards at this time.'
cells[k]['note'] = ('The card states autonomy evaluations under the RSP, that its software engineering evaluations '
                    'suffice to rule out ASL-3 autonomy capabilities, and that the developer judges the upgraded '
                    'Claude 3.5 Sonnet not to require ASL-3 safeguards.')
mark(k, 96, 'corrected: the second quotation was not verbatim (an ellipsis replaced a page break inside “ASL-3”); replaced by the verbatim conclusion on PDF p. 10. Status unchanged.')

# 119: transcription repair. The text layer separates the address prefix from the rest
# of the address; quote the title only and give the printed address in the note.
k = 'openai-o1:Q04'
cells[k]['passages'][0]['quote'] = 'OpenAI, “Openai preparedness framework (beta).”'
cells[k]['note'] = ('Bibliographic reference to the framework, with the printed address '
                    'https://cdn.openai.com/openai-preparedness-framework-beta.pdf (accessed 2024-09-11; the text '
                    'layer separates the address prefix from the rest of the address). The phrase “The Preparedness '
                    'Framework is a living document” in §5 (PDF p. 15) carries a hyperlink to the same PDF.')
mark(k, 119, 'corrected: the quotation dropped the address prefix without an omission mark; it now quotes the title and the note gives the address. Status unchanged.')

# 101: scope of the absence note.
k = 'google-deepmind-gemini-3-flash:Q09'
cells[k]['note'] = ('No dangerous-capability evaluation of autonomy, self-improvement or AI R&D was found. '
                    'The card reports agentic benchmarks as product capability; they are set aside below.')
mark(k, 101, 'corrected: the absence note is limited to dangerous-capability evaluations. Status unchanged.')

# 102: no passage names a safeguard type or standard, so stated becomes partly.
k = 'google-deepmind-gemini-4-argon:Q06'
assert cells[k]['status'] == 'stated'
cells[k]['status'] = 'partly'
cells[k]['note'] = ('The card ties safety cases (biological and cyber CCLs) and a residual risk assessment with '
                    'safeguards (stealth and situational awareness TCL) to the thresholds it cannot rule out, but '
                    'names no safeguard, protection type or safeguard standard; it refers to the Gemini 4 Argon '
                    'Safety & Security Report. Recorded as partly because Q06 asks for named safeguards. The '
                    "developer's account, not evidence that the safeguards work.")
cells[k].setdefault('search', {
    'read': 'Whole card (Safety & Security; Frontier Safety Assessment and its table; Risks and Mitigations).',
    'terms': ['safeguard', 'mitigat', 'security level', 'deployment'],
    'setAside': [],
})
mark(k, 102, 'corrected: stated to partly; no card passage names the safeguards (checked on the retrieved card for “safeguard”, “mitigat”, “security level”, “deployment”).')

# 130: monitoring is an operational practice, not a stated evaluation limit.
k = 'xai-grok-4-7:Q16'
old = ', and that residual jailbreak failures are treated as cases for ongoing monitoring as new techniques emerge'
assert old in cells[k]['note']
cells[k]['note'] = cells[k]['note'].replace(old, '').replace(
    'should be frozen to the evaluated snapshot, that', 'should be frozen to the evaluated snapshot and that')
mark(k, 130, 'corrected: the clause on ongoing monitoring of residual jailbreak failures was removed from the limits. Status unchanged.')

# 31: Part A disagreement adjudicated for the checker; family scope kept.
k = 'meta-llama-3-3:Q09'
c = cells[k]
assert c['status'] == 'not-found'
c['status'] = 'partly'
c['passages'] = [{
    'source': 'meta-llama-3-3',
    'locator': "Responsibility & Safety, 'Critical and other risks', item 3 'Cyber attack enablement'",
    'quote': 'Our attack automation study focused on evaluating the capabilities of LLMs when used as autonomous agents in cyber offensive operations,',
}]
c['note'] = ('The card reports an attack-automation study of the Llama 3 family as autonomous agents in cyber '
             'operations, without an outcome or conclusion. The study is stated for the Llama 3 family, not for '
             'Llama 3.3 specifically. No evaluation of self-replication, self-improvement or AI research and '
             'development was found.')
c['search']['setAside'] = [s for s in c['search'].get('setAside', []) if 'attack-automation' not in s['reason']]
mark(k, 31, 'corrected: not-found to partly, as the checker found (blind answer partly); family scope kept.')

# 36: Part A disagreement adjudicated for the checker.
k = 'meta-cwm-preparedness:Q06'
c = cells[k]
assert c['status'] == 'not-found'
c['status'] = 'partly'
c['passages'] = [{
    'source': 'meta-cwm-preparedness',
    'locator': 'Section 4.1.1 Behavior Analysis and Mitigations, PDF p. 11',
    'quote': 'intervention that encourages honest behavior at inference time.',
}]
c['note'] = ('The report describes a prompt-engineering intervention that encourages honest behaviour at inference '
             'time, without tying it to the framework determination. Recorded as partly under Q06; the report does '
             'not state that the intervention is applied to the release. No safeguard tied to a determination or '
             'threshold was found.')
c['search']['setAside'] = [s for s in c['search'].get('setAside', []) if not s['locator'].startswith('Section 4.1.1')]
mark(k, 36, 'corrected: not-found to partly, as the checker found (blind answer partly, rechecked on the original PDF).')

# 69: unresolved disagreement; both readings kept for the maintainer.
k = 'openai-gpt-4v:Q15'
mark(k, 69, 'disagreement, open for the maintainer: the pack records partly, the checker not-found.',
     readings={
         'pack (Claude)': 'partly: the card states that OpenAI is making GPT-4V broadly available and describes its deployment preparation, without describing a decision or its maker.',
         'checker (Codex)': 'not-found: broad availability and deployment preparation do not describe a release decision, a release following from a stated assessment, or a maker; none of the criterion’s partly cases applies.',
     },
     criterion='Partly if a release is stated as following from an assessment without a decision being described (“we therefore release”), if a decision is described without any maker, or if a maker is named only for a capability or safeguards determination and not for the release.')

# Excluded by the maintainer: chemical and biological question, six items.
for n, k in [(30, 'meta-llama-3-3:Q07'), (45, 'microsoft-phi-2:Q07'), (52, 'microsoft-phi-4:Q07'),
             (99, 'anthropic-claude-haiku-5-5:Q07'), (112, 'microsoft-phi-4-mini-flash-reasoning:Q07'),
             (126, 'xai-grok-4-1:Q07')]:
    mark(k, n, 'not cross-family checked: excluded from the pass by the maintainer.')

for f, d in docs.items():
    with open(f, 'w', encoding='utf-8') as fh:
        json.dump(d, fh, ensure_ascii=False, indent=2)
        fh.write('\n')
print('marked', sum('crossFamily' in c for c in cells.values()), 'cells')
