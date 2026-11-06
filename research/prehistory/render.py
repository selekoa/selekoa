#!/usr/bin/env python3
"""Renders pack.md and codex-retrieval.md from pack.json (run tools.py merge first)."""
import json
from pathlib import Path
D = Path(__file__).resolve().parent
p = json.loads((D / 'pack.json').read_text())
docs = {d['id']: d for d in p['documents']}
srcs = {s['key']: s for s in p['sources']}
pred = {'articulates_proposition': 'articulates', 'contests_proposition': 'contests', 'bears_on_proposition': 'bears on'}
L = [f"# {p['title']}", '', p['status'], '',
     f"Prepared {p['prepared']}. Scope and method: [scope.md](scope.md). New propositions: [propositions.json](propositions.json). "
     "Mechanical checks: [verification.json](verification.json). Audit: [audit.md](audit.md). Retrieval list: [codex-retrieval.md](codex-retrieval.md).", '',
     f"{len(p['records'])} records, {len(p['links'])} links, {len(p['sources'])} sources, {len(p['documents'])} documents; merge problems: {len(p['mergeProblems'])}.", '',
     '## Records by text', '']
order = sorted(p['records'], key=lambda r: ((r['time'].get('date') or (r.get('claimed') or {}).get('date') or '9999'), r['document'], r['proposition']))
def cross(x, ind='  '):
    out = []
    for key, label in (('crossFamily', 'Cross-family check'), ('crossFamily2', 'Cross-family check of the 2026-11-03 increment')):
        c = x.get(key)
        if not c:
            continue
        out.append(f"{ind}- {label} ({', '.join(c['items'])}): {c['result']}")
        for who, text in (c.get('readings') or {}).items():
            out.append(f"{ind}  - Reading, {who}: {text}")
    return out


cur = None
for r in order:
    if r['document'] != cur:
        cur = r['document']; d = docs[cur]
        L += [f"### {d['shortName']}", '', f"`{cur}` · {d['subtype']} · {d.get('date') or 'undated'} ({d['dateBasis']}). {d.get('dateNote') or ''}", '']
    t = r['time']
    dates = f"{t.get('date') or 'undated'} ({t.get('basis')})"
    if r.get('attested'): dates += f"; attested {r['attested']['date']}"
    if r.get('claimed'): dates += f"; claimed {r['claimed']['date']}"
    L.append(f"- **{r['proposition']} — {pred[r['predicate']]}** (`{r['id']}`; {', '.join(r['roles'])}; register {r['register']}; {dates})")
    L.append(f"  - {r['statement']}")
    if r.get('engagement'): L.append(f"  - Engagement: {r['engagement']['kind']} — {r['engagement']['rationale']}")
    if r.get('missing'): L.append(f"  - Missing: {r['missing']}")
    if r.get('earliestLocatedFlag'): L.append(f"  - **Earliest-located flag:** {r['earliestLocatedFlag']}")
    if r.get('pendingDecision'): L.append(f"  - **Pending maintainer decision {r['pendingDecision']['decision']}:** {r['pendingDecision']['note']}")
    for md in (r.get('maintainerDecision'), r.get('maintainerDecision2')):
        if md: L.append(f"  - **Maintainer decision {md['decision']} ({md.get('date', '2026-11-03')}):** {md['effect']}")
    L.append(f"  - Qualification: {r['qualification']}")
    for e in r['evidence']:
        q = f"“{e['passage']}”" if e['passageType'] == 'quote' else f"Paraphrase: {e['passage']}"
        uv = ' **Unverified here:** ' + srcs[e['source']]['unverifiedCopy'] if srcs.get(e['source'], {}).get('unverifiedCopy') else ''
        L.append(f"  - {e['locator']} ({e['support']}): {q}{uv}")
    L += cross(r)
    L.append('')
L += ['## Named predecessors (links)', '']
for k in p['links']:
    to = k['to'] or (k.get('toExternal') or {}).get('name')
    L.append(f"- `{k['id']}`: {k['from']} → {to} ({k['predicate']}). {k['statement']} — “{k['evidence'][0]['passage']}”" if k['evidence'][0]['passageType'] == 'quote' else f"- `{k['id']}`: {k['from']} → {to} ({k['predicate']}). {k['statement']}")
headlines = []
L += ['', '## Earliest-located implications', '', '| Proposition | Role | Current | Antecedent | Deciding date | Outcome |', '| --- | --- | --- | --- | --- | --- |']
for e in p['earliestLocated']:
    L.append(f"| {e['proposition']} | {e['role']} | {e['current'] or '—'} | {e['antecedent']} | {e['deciding']} | {e['outcome']}{' †' if (e.get('crossFamily') or {}).get('readings') or (e.get('crossFamily2') or {}).get('readings') or e.get('pendingDecision') else ''} |")
    if e.get('headline'): headlines.append(e)
if headlines:
    L += ['', '**Headline forms** (decisions 3b, 5a and 12a):', '']
    for e in headlines:
        L.append(f"- {e['proposition']}: {e['headline']}")
held = [e for e in p['earliestLocated'] if (e.get('crossFamily') or {}).get('readings') or (e.get('crossFamily2') or {}).get('readings') or e.get('pendingDecision')]
if held:
    L += ['', '† Decided by the maintainer against or beside a recorded reading, or pending a decision; readings below.', '']
    for e in held:
        L.append(f"- **{e['proposition']}, {e['role']}.** {e.get('note') or ''}")
        if e.get('pendingDecision'): L.append(f"  - Pending maintainer decision {e['pendingDecision']['decision']}: {e['pendingDecision']['note']}")
        L += cross(e)
L += ['', '## Dataset records of these texts (not re-recorded)', '', '| Date | Document | Proposition | Stance | Roles | Record |', '| --- | --- | --- | --- | --- | --- |']
for x in p['existingRecords']:
    L.append(f"| {x['date']} | {x['document']} | {x['proposition']} | {pred[x['predicate']]} | {', '.join(x['roles'] or [])} | `{x['claimId']}` |")
L += ['', '## Search log', '']
for s in p['searchLog']:
    L.append(f"- **{s['proposition']}.** {s['searched']} {s['earliestNote']}")
L += ['', '## Searched and not included', '']
for o in p['omissions']:
    L.append(f"- **{o['item']}.** {o['reason']}")
L += ['', '## Retrieval failures', '']
for f in p['retrievalFailures']:
    L.append(f"- {f['url']}: {f['result']}. Fallback: {f['fallback']}")
L += ['', '## Sources', '']
for s in p['sources']:
    L.append(f"- `{s['key']}`: {s['title']}. {s['publisher']}. Retrieved {s['retrievedAt']} from {s['url']} (HTTP {s['httpStatus']}, sha256 `{s['sha256'][:16]}…`). Version: {s['version']}" + (f" Dataset source: `{s['datasetSource']}`." if s.get('datasetSource') else ''))
(D / 'pack.md').write_text('\n'.join(L) + '\n')
C = ['# Items for Codex retrieval', '', 'Cloud sessions here could not read these (HTTP 403, bot-protection pages, lending-only copies or no copy located). Each item says what to quote and why. Report verbatim spans with locators, the capture or file hash and the HTTP status, as in `research/archive-fetch-held-2026-11-02/`.', '']
for i, c in enumerate(p['codexRetrieval'], 1):
    C += [f"{i}. **{c['item']}**", f"   - Where: {c['url']}", f"   - Task: {c['task']}", '']
(D / 'codex-retrieval.md').write_text('\n'.join(C))
print('ok', len(L), 'lines')
