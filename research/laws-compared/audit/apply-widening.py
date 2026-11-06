# Integrator's edits after widening the audit to all Q10 and Q12 cells.
import json
def load(g): return json.load(open(f'drafts/{g}.json'))
def save(g,d): json.dump(d,open(f'drafts/{g}.json','w'),ensure_ascii=False,indent=2)
def cell(d,i,q): return next(c for c in d['cells'] if c['instrument']==i and c['question']==q)
eu=load('eu'); c=cell(eu,'eu-ai-act','Q12')
old='Article 101 (fines) is excepted from that date and so falls under the general date of 2 August 2026.'
assert old in c['note']
c['note']=c['note'].replace(old,'Article 101 (fines) is excepted from that date; read with the general date in the second paragraph, it applies from 2 August 2026. The text states no separate date for Article 101; this is a reading of the two quoted provisions.')
save('eu',eu)
fed=load('us-federal'); c=cell(fed,'us-eo14110','Q12')
c['note']='No provision setting a date from which companies’ reporting duties apply was found. The 90-day period in Sec. 4.2(a) is set for the Secretary of Commerce to require the reporting and is set aside.'
save('us-federal',fed); print('ok')
