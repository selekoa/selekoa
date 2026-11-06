# Applies the adjudication of the cross-family check (cross-family-check-2026-11-02.json,
# Codex) to the drafts. Run once from research/laws-compared/; each edit asserts the text it
# replaces. The adjudication is recorded in review/laws-compared-pack-2026-11-02.md.
# Rule (brief 07): the drafting family does not overrule the checker on a cell; it applies the
# checker's status or records the cell as held with both reasons.
import json
def load(g): return json.load(open(f'drafts/{g}.json'))
def save(g,d): json.dump(d,open(f'drafts/{g}.json','w'),ensure_ascii=False,indent=2)
def cell(d,i,q): return next(c for c in d['cells'] if c['instrument']==i and c['question']==q)
def rep(o,key,old,new):
    assert old in o[key], (key,old); o[key]=o[key].replace(old,new)

# questions.json: the Q01 criterion carried the capability ranking the checker flagged in a note.
q=json.load(open('questions.json'))
q01=next(x for x in q['questions'] if x['id']=='Q01')
rep(q01,'criterion','Where the instrument has tiers, the tier for the most capable models is given and the others are named in the note.',
    'Where the instrument has tiers, each tier is named in its own defined terms.')
q['legend']['held']='The cross-family checker and the preparer disagree on the status. The cell shows the preparer’s status and is held, with both reasons, for the maintainer’s decision.'
json.dump(q,open('questions.json','w'),ensure_ascii=False,indent=2)

# ---- EU
eu=load('eu')
c=cell(eu,'eu-ai-act','Q01')
rep(c,'note','providers of general-purpose AI models with systemic risk, the tier for the most capable models.',
    'providers of general-purpose AI models with systemic risk, the category defined in Article 51 (high-impact capabilities, presumed above a training-compute threshold, or a Commission decision).')
# Disagreement 1 (checker's status applied): Q04 is not applicable where Q03 finds no document.
c=cell(eu,'eu-ai-act','Q04'); assert c['status']=='not-found'; c['status']='not-applicable'
c['note']='Not applicable: Q03 finds a risk-management duty but no written framework document, and the Q04 criterion is not applicable where Q03 finds no such document. Technical documentation, which includes evaluation strategies for models with systemic risk, is kept for supply to the AI Office on request (Article 53(1)(a), Annex XI); it is recorded under Q08.'
c=cell(eu,'eu-code-ss','Q01')
rep(c,'note','The Code binds only providers that sign and adhere to it.',
    'The commitments are addressed to providers that sign the Code and choose to rely on it; the Code is not binding in itself (see the row’s standing).')
c=cell(eu,'eu-code-ss','Q08')
rep(c,'note','with updates within five business days of confirmation;',
    'and access to an updated Model Report is given within five business days of a confirmed update;')
save('eu',eu)

# ---- California and New York
us=load('us-states')
c=cell(us,'ny-ch699','Q04')
rep(c['passages'][0],'locator','p. 4, line 18','p. 4, lines 18–19')
# Disagreement 2 (checker's status applied): retention is not publication or supply.
c=cell(us,'ny-ch699','Q08'); assert c['status']=='partly'; old=c['passages'][0]
c['status']='not-found'; c['passages']=[]
c['note']='No duty to publish a report on each model, or to draw up and supply model documentation to an authority or to others, was found. Before deploying a frontier model, the large developer must record and retain information on tests and test results for as long as the model is deployed plus five years; retention is set aside below. The published protocol (Q04) is developer-level. No output-labelling duty was seen.'
c['search']['terms']+= ['retain','assessment']
c['search']['setAside'].insert(0,{'locator':old['locator'],'reason':f'“{old["quote"]}”: records to be retained, not published or supplied; does not meet the criterion.'})
c['search']['setAside'].append({'locator':'Proposed GBL § 1421(4), p. 4','reason':'Disclosure of each safety incident to the attorney general and the division of homeland security and emergency services: incident-triggered, recorded under Q07, not a report on each model.'})
c=cell(us,'ny-ch96','Q01')
c['note']=c['note'].rstrip()+' These duties are in Article 44-B as re-added, which takes effect on 1 January 2027 (Q11).'
c=cell(us,'ny-ch96','Q07')
c['note']=c['note'].rstrip()+' Article 44-B as re-added takes effect on 1 January 2027 (Q11).'
save('us-states',us)

# ---- China
cn=load('china')
c=cell(cn,'cn-genai-measures','Q13')
rep(c,'note','where those are silent, the authorities may give a warning, circulate a notice of criticism and order correction within a time limit,',
    'where those are silent, the Measures provide for a warning, a notice of criticism and an order to correct within a time limit by the competent authorities,')
save('china',cn)

# ---- US federal
fed=load('us-federal')
# Disagreement 3 (checker's status applied): reporting results of tests conducted is not a duty to test.
c=cell(fed,'us-eo14110','Q05'); assert c['status']=='partly'; old=c['passages']
c['status']='not-found'; c['passages']=[]
c['note']='No duty on companies to evaluate or test their models was found. The Secretary of Commerce is directed to require reports that include the results of any red-team testing a company has conducted, on named risk categories including biological weapons (recorded at policy level only); a duty to report results of testing conducted is not a duty to test, and is set aside below.'
c['search']['terms']+= ['results','shall require']
for p in reversed(old):
    c['search']['setAside'].insert(0,{'locator':p['locator'],'reason':f'“{p["quote"]}”: a reporting duty on results of testing conducted, imposed through the Secretary; no command to conduct testing.'})
# Partial agreement, status held: the checker recommends partly for Sec. 4.4(a)(i); the preparer keeps not-found.
c=cell(fed,'us-eo14110','Q06'); assert c['status']=='not-found'
for a in c['search']['setAside']:
    if a['locator'].startswith('Sec. 4.4(a)(i)'):
        a['locator']='Sec. 4.4(a)(i), including (A), 88 FR 75200'
        a['reason']='Directs the Secretary of Homeland Security to evaluate the potential for AI to be misused for CBRN threats and, under (A), to consult experts including third-party model evaluators “to evaluate AI model capabilities to present CBRN threats”: a policy-level evaluation by a public authority, not an assessment of a covered company’s model or practices. Held: see the cell’s held record.'
        break
else: raise AssertionError('4.4 set-aside')
c['search']['terms'].append('model capabilities')
c['held']={
  'preparerStatus':'not-found',
  'checkerStatus':'partly',
  'checkerReason':'Sec. 4.4(a)(i) requires a government threat assessment that includes evaluating AI model capabilities; partly, with a policy-level scope, rather than omitting the operative agency evaluation direction. Not evidence that a particular developer’s model was evaluated (cross-family check, item 67).',
  'preparerReason':'Q06 asks for assessment of the model or of the developer’s practices. Sec. 4.4(a)(i)(A) evaluates AI model capabilities in general for one threat domain; it names no covered company, model or practice to be assessed, and the criterion’s partly route covers a power to assess or an assessment of filings, not a general capability study.',
  'recommendation':'Keep not-found, with Sec. 4.4(a)(i)(A) set aside by name; or, if the maintainer reads Q06 as covering policy-level capability evaluation by an authority, apply partly and add that reading to the legend.'
}
# Disagreement 4 (checker's status applied): required model-weight security measures are partly.
c=cell(fed,'us-bis-ifr','Q03'); assert c['status']=='not-found'
c['status']='partly'
c['passages']=[
  {'source':'us-bis-ifr','locator':'Supplement No. 10 to part 748, para. 14(e), 90 FR 4566 (PDF p. 23)','quote':'Plans for the secure operation of data centers supporting a VEU shall be implemented in accordance with a security management defense-in-depth framework'},
  {'source':'us-bis-ifr','locator':'Supplement No. 10 to part 748, para. 15, 90 FR 4566 (PDF p. 23)','quote':'The VEU will establish and bear responsibility for the following additional practices for AI security'},
]
c['note']='Partly: the rule requires security measures, including AI-specific security practices covering model weights (para. 15), as conditions of validated end-user authorisation and, under § 740.27(a)(3)(ii), for facilities storing specified model weights. No written framework on the risks of models is required, and the data-centre plans are not a developer’s safety framework. The regulated party is the validated end user or facility, not necessarily a model developer. Status applied from the cross-family check; the boundary (whether model-weight security risks count as risks of models) is raised for the maintainer.'
c['search']['setAside']=[a for a in c['search']['setAside'] if not (a['locator'].startswith('Supplement No. 10 to part 748, para. 14(e)'))]
for a in c['search']['setAside']:
    if a['locator'].startswith('§ 740.27(a)(3)(ii)'):
        a['reason']='“stored in a facility that complies with paragraphs 14, 15 and 18”: extends the security conditions to facilities storing specified model weights; scope of the measures quoted above, not a written framework on model risks.'
c=cell(fed,'us-bis-ifr','Q04'); assert c['status']=='not-applicable'
rep(c,'note','Q03 finds no framework document on model risks.','Q03 finds security measures but no written framework document on model risks.')
save('us-federal',fed)

# ---- Integrator: standing, findings, exclusions
it=load('integrator')
s=next(x for x in it['standing'] if x['instrument']=='eu-ai-act')
assert s['passages'][0]['locator']=='Enacting formula before the recitals'
s['passages'][0]['locator']='Enacting formula, after recital (180), before Chapter I and Article 1'
s=next(x for x in it['standing'] if x['instrument']=='ny-ch96')
s['note']='Signed as Chapter 96 of 2026. Signature is distinct from application: Article 44-B as re-added, which holds the duties compared, takes effect on 1 January 2027 (Q11).'
f=next(x for x in it['findings'] if x['id']=='uk-no-binding-instrument')
rep(f,'statement','No UK law or other binding instrument placing duties on developers of frontier or general-purpose AI models was located.',
    'Within the searches stated below, no UK law or other binding instrument placing duties on developers of frontier or general-purpose AI models was located; this is not a finding that no such instrument exists.')
f['limits']=f['limits'].rstrip()+' The cross-family check confirmed the three quoted passages but did not reproduce the title searches or read the 2026 briefing notes.'
f=next(x for x in it['findings'] if x['id']=='us-federal-other')
rep(f,'statement','Apart from the two rows, the federal texts on the frameworks-and-law page place no binding duty on developers:',
    'Apart from the two rows, no binding duty on developers was found in the federal texts on the frameworks-and-law page, as read for this pack:')
f['statement']=f['statement'].rstrip()+' The no-licensing clause concerns the voluntary framework in section 3; it does not displace other law. The cross-family check confirmed the section 3(c) passage only, not the reading of the other texts.'
x=next(x for x in it['excluded'] if x['documentId']=='cn-gb-45438-2025')
rep(x,'reason','Its text is offered only through an online viewer and was not retrieved,',
    'Its text was not retrieved: the catalogue page offers preview and download, but the download address returned the catalogue page again (cross-family check),')
save('integrator',it)

# ---- Instruments and sources
ins=load('instruments')
i=next(x for x in ins['instruments'] if x['id']=='eu-code-ss')
rep(i,'title',' (10 July 2025)','')
rep(i,'standingNote','Its duties bind only signatories that adhere to it, as commitments.',
    'Its commitments are those of signatories that choose to adhere to it. The chapter itself is undated; the dataset’s Code sources give 10 July 2025 as the publication date on the Commission’s Code page, which this pack did not re-inspect.')
save('instruments',ins)
src=json.load(open('drafts/sources.json'))
s=next(x for x in src if x['cacheKey']=='cn-gb45438')
rep(s,'version','the standard’s text is offered only through an online viewer and was not retrieved.',
    'the standard’s text was not retrieved (the download address returned the catalogue page).')
json.dump(src,open('drafts/sources.json','w'),ensure_ascii=False,indent=2)
