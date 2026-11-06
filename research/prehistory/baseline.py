#!/usr/bin/env python3
"""Baseline for the antecedent-texts pack: for every proposition in data/entities.json, the current
earliest-located articulation and contesting records (date, attested date) and every record dated before 1966.
Writes research/prehistory/baseline.json. Reads data/ only."""
import json
from pathlib import Path
ROOT = Path(__file__).resolve().parents[2]
ents = json.load(open(ROOT / 'data/entities.json'))
claims = json.load(open(ROOT / 'data/claims.json'))
props = {e['id']: e for e in ents if e.get('proposition')}
P = ('articulates_proposition', 'contests_proposition', 'bears_on_proposition')
out = {'generatedFrom': 'data/ at the branch base (main, v0.26.1)', 'propositions': []}
by = {}
for c in claims:
    if c['predicate'] in P and c['object'].get('entityId') in props:
        by.setdefault(c['object']['entityId'], []).append(c)
for pid, e in props.items():
    recs = by.get(pid, [])
    def info(c):
        th = (c.get('attributes') or {}).get('thought') or {}
        t = c.get('time') or {}
        return {'id': c['id'], 'subject': c['subject'], 'predicate': c['predicate'], 'date': t.get('date'),
                'attested': (th.get('attested') or {}).get('date') if isinstance(th.get('attested'), dict) else th.get('attested'),
                'roles': th.get('roles'), 'register': th.get('register')}
    el = [info(c) for c in recs if 'earliest-located' in (((c.get('attributes') or {}).get('thought') or {}).get('roles') or [])]
    pre = [info(c) for c in recs if ((c.get('time') or {}).get('date') or '9999')[:4] < '1966']
    out['propositions'].append({'code': e['proposition'].get('code'), 'id': pid, 'name': e['name'],
                                'criterion': e['proposition']['criterion'], 'terms': e['proposition'].get('terms'),
                                'earliestLocated': el, 'recordsBefore1966': pre, 'recordCount': len(recs)})
(Path(__file__).parent / 'baseline.json').write_text(json.dumps(out, indent=2, ensure_ascii=False) + '\n')
for p in out['propositions']:
    print(p['code'], p['id'], [(x['date'], x['attested'], x['predicate'][:4], x['subject']) for x in p['earliestLocated']])
