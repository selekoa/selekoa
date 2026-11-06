# Applies the integrator's dispositions of the same-family audit (audit/findings.json)
# to the drafts. Run once; each edit asserts the text it replaces.
import json
def load(g): return json.load(open(f'drafts/{g}.json'))
def save(g,d): json.dump(d,open(f'drafts/{g}.json','w'),ensure_ascii=False,indent=2)
def cell(d,i,q): return next(c for c in d['cells'] if c['instrument']==i and c['question']==q)
def rep(c,key,old,new):
    assert old in c[key], (c['instrument'],c['question'],old); c[key]=c[key].replace(old,new)

eu=load('eu')
c=cell(eu,'eu-ai-act','Q09'); c['note']=c['note'].rstrip()+' Partly because the protection is applied by reference to another law, not stated in this Regulation.'
c=cell(eu,'eu-code-ss','Q09'); c['passages'][0]['locator']='Measure 3.5, paragraph on independent external evaluators, sentence before conditions (1)–(5) (PDF p. 14)'
save('eu',eu)

us=load('us-states')
c=cell(us,'ny-ch699','Q05'); c['passages'][0]['locator']='Proposed GBL § 1420(12)(c), p. 3, lines 31–32'
if len(c['passages'])>1: c['passages'][1]['locator']='Proposed GBL § 1421(1)(d), p. 4, lines 28–30'
c=cell(us,'ny-ch699','Q08'); c['passages'][0]['locator']='Proposed GBL § 1421(1)(d), p. 4, lines 28–30'
c=cell(us,'ca-sb53','Q02'); rep(c,'note','to recommend annually, from 1 January 2027,','to recommend, on or before 1 January 2027 and annually thereafter,')
c=cell(us,'ny-ch96','Q15'); rep(c,'note','to the extent it meets it','to the extent it meets the standards of, or complies with, the designated federal law, regulation or guidance document')
save('us-states',us)

cn=load('china')
c=cell(cn,'cn-genai-measures','Q03')
for a in c['search']['setAside']:
    if a['locator'].startswith('Article 4'):
        a['reason']+=' Point (2) requires effective measures against discrimination in algorithm design, training-data selection, model generation and optimisation and service provision: measures on a single other subject (discrimination), not a framework or system on model risks.'
save('china',cn)

fed=load('us-federal')
c=cell(fed,'us-eo14110','Q12'); c['status']='not-found'; c['passages']=[]
c['search']['setAside'].append({'locator':'Sec. 4.2(a), 88 FR 75197','reason':'“Within 90 days of the date of this order” is the period for the Secretary of Commerce to require reporting; not an application date for companies’ duties.'})
c=cell(fed,'us-bis-ifr','Q03'); old=c['passages']; c['status']='not-found'; c['passages']=[]
for p in old: c['search']['setAside'].insert(0,{'locator':p['locator'],'reason':f'“{p["quote"]}”: security plans for VEU data centres and model-weight storage (paras. 14, 15 and 18), a single other subject (security of chips, data and weights), not a framework on model risks.'})
c['note']='No provision requiring a written framework, policy or protocol on the risks of models was found. The rule requires security plans and measures for data centres, including model-weight storage; these are set aside as a single other subject.'
c=cell(fed,'us-bis-ifr','Q04'); old=c['passages']; c['status']='not-applicable'; c['passages']=[]
c['note']='Q03 finds no framework document on model risks. For the data-centre security records, VEU records are to be made available to BIS on request (Supplement No. 10 to part 748, para. 11, quoted in the audit record), and the third-party certification under para. 14(b) is made available to BIS.'
c['search']=None
c=cell(fed,'us-bis-ifr','Q10'); old=c['passages']; c['status']='not-found'; c['passages']=[]
c['search']['setAside'].append({'locator':'Filing line, 90 FR 4584 (PDF p. 41)','reason':'“FR Doc. 2025–00636 Filed 1–13–25”: the date of filing with the Office of the Federal Register, a publication-process date, not adoption, signature or issue; the signature block is undated.'})
c=cell(fed,'us-bis-ifr','Q06'); c['note']=c['note'].rstrip()+' Partly because the assessed party is a data-centre end user under a VEU authorisation, not necessarily a model developer, and the subject is facility security.'
save('us-federal',fed)

ins=json.load(open('drafts/instruments.json'))
for i in ins['instruments']:
    if i['id']=='ny-ch699':
        i['standing']='binding'
        i['standingNote']='Signed as Chapter 699 of 2025. Chapter 96 of 2026 repeals and re-adds Article 44-B, which Chapter 699 added, and amends its section 3 on effect, according to the S8828 summary line. The cells record the Chapter 699 text as signed. Whether that text took effect before Chapter 96 was signed is not settled by the texts read (see Q11).'
json.dump(ins,open('drafts/instruments.json','w'),ensure_ascii=False,indent=2)

q=json.load(open('questions.json'))
for x in q['questions']:
    if x['id']=='Q09': x['criterion']+=' Partly if the protection applies only by reference to another law.'
json.dump(q,open('questions.json','w'),ensure_ascii=False,indent=2)
print('applied')
