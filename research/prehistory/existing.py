#!/usr/bin/env python3
"""Lists the dataset's proposition records of the pack's existing documents (drafts with existingEntity true),
so the pack does not re-record them. Writes drafts/existing.json (existingRecords only)."""
import json
from pathlib import Path
D = Path(__file__).resolve().parent
ROOT = D.parents[1]
docs = set()
for f in sorted((D / 'drafts').glob('*.json')):
    if f.name == 'existing.json':
        continue
    for d in json.loads(f.read_text()).get('documents', []):
        if d.get('existingEntity'):
            docs.add(d['id'])
docs |= {'butler-1863-darwin-among-machines', 'good-1965', 'minsky-1961-steps', 'dartmouth-proposal-1955'}
ents = {e['id']: e for e in json.load(open(ROOT / 'data/entities.json'))}
out = []
for c in json.load(open(ROOT / 'data/claims.json')):
    if c['predicate'] in ('articulates_proposition', 'contests_proposition', 'bears_on_proposition') and c['subject'] in docs:
        th = (c.get('attributes') or {}).get('thought') or {}
        out.append({'claimId': c['id'], 'document': c['subject'],
                    'proposition': ents[c['object']['entityId']]['proposition'].get('code'),
                    'predicate': c['predicate'], 'date': (c.get('time') or {}).get('date'),
                    'roles': th.get('roles'), 'register': th.get('register')})
out.sort(key=lambda x: (x['date'] or '', x['document'], x['proposition']))
(D / 'drafts' / 'existing.json').write_text(json.dumps({'group': 'existing', 'note': 'Dataset records of the antecedent texts the pack reads, at the branch base; not re-recorded.', 'existingRecords': out}, indent=2) + '\n')
print(len(out), 'existing records')
