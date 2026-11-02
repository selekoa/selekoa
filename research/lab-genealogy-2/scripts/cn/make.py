import json
import os; OUT=os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '..', 'drafts', 'cn.json')
D='2026-10-29'
def P(name,sort,aliases,desc,srcs): return dict(id=None,type='person',name=name,sortName=sort,subtype='Institutional actor',aliases=aliases,description=desc,sourceIds=srcs)
ents=[{"id":i,"existing":True} for i in ["zhipu","li-juanzi","liu-debing","wang-shaolan","tsinghua","ant-group","minimax","xiaomi_placeholder"] if i!="xiaomi_placeholder"]
ents+= [{"id":i,"existing":True} for i in ["deepseek","baichuan","zero-one-ai","stepfun","tencent","moonshot-ai"]]
def addp(i,*a):
    e=P(*a); e['id']=i; ents.append(e)
def addo(i,name,aliases,desc,srcs):
    ents.append(dict(id=i,type='organisation',name=name,aliases=aliases,description=desc,sourceIds=srcs))
S={}
def src(i,**k):
    k['id']=i; S[i]=k
src('lg2-src-zhipu-prospectus-en',cacheKey='cn-zhipu-prospectus-en',title='Knowledge Atlas Technology Joint Stock Company Limited (北京智譜華章科技股份有限公司) — Global Offering (prospectus)',authors=['Knowledge Atlas Technology Joint Stock Company Limited'],publisher='Knowledge Atlas Technology Joint Stock Company Limited (via HKEXnews)',publicationDate='2025-12-30',kind='filing',url='https://www1.hkexnews.hk/listedco/listconews/sehk/2025/1230/2025123000017.pdf',route='direct',language='en',sourceClass='primary',datasetSourceId='lg-src-cn-zhipu-prospectus-en')
src('lg2-src-minimax-prospectus',cacheKey='cn-minimax-prospectus',title='MiniMax Group Inc. — Global Offering (prospectus)',authors=['MiniMax Group Inc.'],publisher='MiniMax Group Inc. (via HKEXnews)',publicationDate='2025-12-31',kind='filing',url='https://www1.hkexnews.hk/listedco/listconews/sehk/2025/1231/2025123100025.pdf',route='direct',language='en',sourceClass='primary',datasetSourceId='lg-src-cn-minimax-prospectus')
src('lg2-src-jiemian-luo-2025',cacheKey='cn-jiemian-luo-2025',title='“AI才女”罗福莉官宣加入小米，曾传雷军千万年薪挖角',authors=['陈小同'],publisher='Jiemian (界面新闻)',publicationDate='2025-11-12',kind='article',url='https://www.jiemian.com/article/13627855.html',route='direct',language='zh',sourceClass='reporting')
src('lg2-src-nbd-luo-2025',cacheKey='cn-nbd-luo-2025-12',title='小参数、高速度！罗福莉首秀解说AI新成果 从“不做通用大模型”到一年开源多款，小米为何改了主意？',authors=['杨卉'],publisher='National Business Daily (每日经济新闻)',publicationDate='2025-12-17',kind='article',url='https://www.nbd.com.cn/articles/2025-12-17/4184652.html',route='direct',language='zh',sourceClass='reporting')
src('lg2-src-jiemian-baichuan-2025',cacheKey='cn-jiemian-baichuan-2025-03',title='百川智能两位联合创始人被曝离职创业',authors=[],publisher='Jiemian (界面新闻)',publicationDate='2025-03-17',kind='article',url='https://m.jiemian.com/article/12478615.html',route='direct',language='zh',sourceClass='reporting')
src('lg2-src-36kr-baichuan-2026',cacheKey='cn-36kr-baichuan-2026',title='最后一个联合创始人离开，王小川身后空无一人',authors=['博望财经'],publisher='36Kr (36氪), republishing 博望财经 (Bowang Caijing)',publicationDate='2026-07-24',kind='article',url='https://www.36kr.com/p/3909039058015368',route='direct',language='zh',sourceClass='reporting')
src('lg2-src-jiemian-dai-2025',cacheKey='cn-jiemian-dai-2025',title='AI早报 | 零一万物联创戴宗宏离职创业；宇树科技回应机器狗Go1存在后门漏洞',authors=[],publisher='Jiemian (界面新闻)',publicationDate='2025-05-09',kind='article',url='https://m.jiemian.com/article/12755372.html',route='direct',language='zh',sourceClass='reporting')
src('lg2-src-thepaper-stepfun-2026',cacheKey='cn-thepaper-stepfun-2026',title='阶跃星辰完成超50亿元B+轮融资，印奇出任董事长',authors=['秦盛'],publisher='The Paper (澎湃新闻)',publicationDate='2026-01-26',kind='article',url='https://www.thepaper.cn/newsDetail_forward_32463044',route='direct',language='zh',sourceClass='reporting')
src('lg2-src-lanjing-moonshot-2025',cacheKey='cn-lanjing-moonshot-2025-12',title='Minimax、智谱冲刺上市之际，月之暗面杨植麟发声：5亿美元C轮大幅超募，手握百亿现金暂不急于IPO',authors=['朱俊熹'],publisher='Lanjing News (蓝鲸新闻)',publicationDate='2025-12-31',kind='article',url='https://www.lanjinger.com/d/1767172484246796876',route='direct',language='zh',sourceClass='reporting')

ZP='lg2-src-zhipu-prospectus-en'
addo('meituan','Meituan / 美团',['美团'],'Hong Kong-listed company whose wholly owned subsidiary Tianjin Sankuai is named in Zhipu’s December 2025 prospectus as a pre-IPO investor.',[ZP])
addo('prosperity7','Prosperity7 (P7 China Holdings PCC Limited)',['P7 China Holdings PCC Limited','Prosperity7 Ventures'],'Guernsey protected cell company described in Zhipu’s December 2025 prospectus as wholly owned by Aramco Ventures Company; a subscriber in Zhipu’s Series B5 financing.',[ZP])
addo('qiming-venture-partners','Qiming Venture Partners / 启明创投',['启明创投','启明','Qiming Venture'],'Venture capital firm; reported as an existing shareholder joining StepFun’s B+ round of January 2026.',['lg2-src-thepaper-stepfun-2026'])
addo('xiaomi','Xiaomi / 小米',['小米','Xiaomi Corporation','小米集团'],'Consumer-electronics company whose Xiaomi MiMo large-model team Luo Fuli was reported as leading from late 2025.',['lg2-src-jiemian-luo-2025','lg2-src-nbd-luo-2025'])
addp('luo-fuli','Luo Fuli','Luo, Fuli',['罗福莉','Fuli Luo'],'Former DeepSeek deep-learning researcher reported in November–December 2025 as working at, and leading, Xiaomi’s MiMo large-model team.',['lg2-src-jiemian-luo-2025','lg2-src-nbd-luo-2025'])
addp('hong-tao','Hong Tao','Hong, Tao',['洪涛'],'Baichuan Intelligence co-founder and head of commercialisation, reported as having left the company by December 2024.',['lg2-src-jiemian-baichuan-2025','lg2-src-36kr-baichuan-2026'])
addp('jiao-ke','Jiao Ke','Jiao, Ke',['焦可'],'Baichuan Intelligence co-founder, reported in March 2025 as having left the company.',['lg2-src-jiemian-baichuan-2025'])
addp('chen-weipeng','Chen Weipeng','Chen, Weipeng',['陈炜鹏'],'Baichuan Intelligence co-founder responsible for large-language-model work, reported as leaving the company in March 2025.',['lg2-src-jiemian-baichuan-2025','lg2-src-36kr-baichuan-2026'])
addp('xie-jian','Xie Jian','Xie, Jian',['谢剑'],'Baichuan Intelligence technical co-founder, reported as having resigned in July 2025.',['lg2-src-36kr-baichuan-2026'])
addp('ru-liyun','Ru Liyun','Ru, Liyun',['茹立云'],'Baichuan Intelligence co-founder and president, reported as having left the company on 16 July 2026.',['lg2-src-36kr-baichuan-2026'])
addp('dai-zonghong','Dai Zonghong','Dai, Zonghong',['戴宗宏'],'01.AI co-founder and vice president of technology, reported in May 2025 as having left to start a company.',['lg2-src-jiemian-dai-2025'])
addp('zhao-pengyu','Zhao Pengyu','Zhao, Pengyu',['趙鵬宇','赵鹏宇'],'MiniMax executive Director (from June 2025) and large language model research and engineering leader, per its December 2025 prospectus.',['lg2-src-minimax-prospectus'])
addp('zhou-yucong','Zhou Yucong','Zhou, Yucong',[],'MiniMax executive Director (from June 2025) and visual model research and engineering leader, per its December 2025 prospectus.',['lg2-src-minimax-prospectus'])

C=[]
def ev(cid,sid,loc,ptype,text,anchor=None,support='supports',role=None):
    s=S[sid]; r=role or ('primary' if s['sourceClass']=='primary' else 'secondary')
    e=dict(id=None,sourceId=sid,sourceRole=r,support=support,locator=loc,passageType=ptype,passage=text)
    if anchor: e['anchor']=anchor
    return e
def claim(slug,subj,pred,obj,topic,stmt,time,qual,evs,attrs=None,event=None,related=None):
    cid='lg2-cn-'+slug
    for n,e in enumerate(evs):
        e['id']='lg2-ev-cn-'+slug+('' if n==0 else f'-{n+1}')
    c=dict(id=cid,subject=subj,predicate=pred,object=obj,topic=topic,statement=stmt,time=time)
    if attrs: c['attributes']=attrs
    c.update(derivation='explicit',resolution='supported',qualification=qual,relatedExisting=related or [],evidence=evs)
    if event: c['event']=event
    C.append(c)
E=lambda i:{"kind":"entity","entityId":i}

# ---- Zhipu rounds
rounds=[('b1','B1','2023-02','February 2023',208000000,'208,000,000','We completed the series B1 financing (the “Series B1 Financing”) in February 2023.','1,461,020 208,000,000 Subscriber Total','Series B1 Financing'),
('b2','B2','2023-08','August 2023',410112528,'410,112,528','We completed the series B2 financing (the “Series B2 Financing”) in August 2023.','2,308,830 410,112,528 Subscriber Total','Series B2 Financing'),
('b3','B3','2024-01','January 2024',608973038,'608,973,038','We completed the series B3 financing (the “Series B3 Financing”) in January 2024.','2,687,632 608,973,038 Subscriber','Series B3 Financing'),
('b4','B4','2024-08','August 2024',1228809303,'1,228,809,303','We completed the series B4 financing (the “Series B4 Financing”) in August 2024.','4,269,218 1,228,809,303 Subscriber','Series B4 Financing'),
('b5','B5','2024-11','November 2024',1358934041,'1,358,934,041','together with Series B5-1 Financing and Series B5-2 Financing, the “Series B5 Financing”) in November 2024.','3,160,131 1,358,934,041','Series B5 Financing (B5-1, B5-2 and B5-3)'),
('b6-1-2','B6-1 and B6-2','2024-12','December 2024',1922000000,'1,922,000,000','We completed the series B6-1 (the “Series B6-1 Financing”) and series B6-2 financing (the “Series B6-2 Financing”) in December 2024.','Total 3,175,953 1,922,000,000','Series B6-1 and Series B6-2 Financing'),
('b6-3-4','B6-3, B6-3+ and B6-4','2025-05','May 2025',2454999968,'2,454,999,968','together with Series B6-1 Financing, Series B6-2 Financing, Series B6-3 Financing, Series B6-3+ Financing, the “Series B6 Financing”) in May 2025.','4,056,694 2,454,999,968','Series B6-3, Series B6-3+ and Series B6-4 Financing')]
for slug,name,date,mon,amt,amts,q1,anc,period in rounds:
    extra=''
    if slug=='b6-3-4': extra=' The table includes subscribers listed under “Series B6 Convertible Notes”, whose notes were issued under agreements of September 2024 to February 2025; the total therefore is not new money raised in May 2025 alone.'
    claim(f'zhipu-round-{slug}','zhipu','announced_funding',{"kind":"literal","value":amt,"unit":"CNY"},'capital',
      f'Zhipu’s Hong Kong prospectus of 30 December 2025 states that the company completed its Series {name} financing in {mon}, with a total consideration of RMB{amts} for the newly subscribed registered capital listed.',
      {"kind":"event","date":date,"note":"Completion month as stated in the prospectus; not an announcement date."},
      'The amount is the total consideration in the prospectus’s table of subscriptions for new registered capital in this round; transfers of existing registered capital between shareholders in the same period are listed separately and are not included. The prospectus’s text layer interleaves table columns; the total was read from the row labelled “Total”. A company filing records what the company states; the record does not independently verify payment.'+extra,
      [ev(0,ZP,f'History, Development and Corporate Structure — Pre-IPO Investments — {period} (pp. 116–123)','quote',q1),
       ev(0,ZP,f'Same section, table of subscribers for the {period}, row “Total”','paraphrase',f'The table’s total consideration for the subscriptions in this round is RMB{amts}.',anchor=anc)],
      attrs={"transactionType":"funding_round","transactionStage":"completed","relationshipContext":"external","amount":{"value":amt,"currency":"CNY","bound":"exact","scope":"round_total"},"period":period},
      related=['lg-cn-zhipu-established-2019'])
# participants
claim('zhipu-meituan-b2','meituan','participated_in_round',E('zhipu'),'capital',
 'Zhipu’s Hong Kong prospectus of 30 December 2025 lists Tianjin Sankuai, which it describes as wholly owned by Meituan, as the subscriber in Stage 1 of its Series B2 financing, completed in July 2023.',
 {"kind":"event","date":"2023-07","note":"Completion month of Stage 1 as stated in the prospectus."},
 'The prospectus names Tianjin Sankuai, a wholly owned subsidiary of Meituan, as the subscriber; the record attributes no amount to Meituan (the table’s column order is garbled in the text layer) and does not say that Meituan led the round.',
 [ev(0,ZP,'History, Development and Corporate Structure — Series B2 Financing (p. 117)','quote','Stage 1 (completed in July 2023) Tianjin Sankuai Technology Co., Ltd.'),
  ev(0,ZP,'Information about Our Pre-IPO Investors — (ii) Tianjin Sankuai (“Meituan SII”) (p. 130)','quote','Tianjin Sankuai is wholly owned by Meituan')],
 attrs={"transactionType":"funding_round","transactionStage":"completed","relationshipContext":"external","period":"Series B2 Financing, Stage 1"})
claim('zhipu-ant-b3','ant-group','participated_in_round',E('zhipu'),'capital',
 'Zhipu’s Hong Kong prospectus of 30 December 2025 lists Shanghai Yunya, which it describes as an investment vehicle of Ant Group, among the subscribers in its Series B3 financing, completed in January 2024.',
 {"kind":"event","date":"2024-01","note":"Completion month of the round as stated in the prospectus; the round had two stages (November 2023 and January 2024)."},
 'The subscriber is Shanghai Yunya, which the prospectus calls an investment vehicle of Ant Group; the record attributes no amount to Ant Group and does not establish in which stage Shanghai Yunya subscribed.',
 [ev(0,ZP,'History, Development and Corporate Structure — Series B3 Financing (p. 118)','quote','Shanghai Yunya Enterprise Management Consulting Co., Ltd.'),
  ev(0,ZP,'Information about Our Pre-IPO Investors — Shanghai Yunya and Shanghai Feiya (p. 131)','paraphrase','The prospectus describes Shanghai Yunya as an investment vehicle of Ant Group Co., Ltd.',anchor='vehicle of Ant Group Co., Ltd.')],
 attrs={"transactionType":"funding_round","transactionStage":"completed","relationshipContext":"external","period":"Series B3 Financing"})
claim('zhipu-ant-b5','ant-group','participated_in_round',E('zhipu'),'capital',
 'Zhipu’s Hong Kong prospectus of 30 December 2025 lists Shanghai Feiya, which it describes as wholly owned, through Accelerator VIII Ltd., by Ant Unicorn Fund, L.P., whose general partner is an indirect wholly owned subsidiary of Ant Group, among the subscribers in its Series B5 financing, completed in November 2024.',
 {"kind":"event","date":"2024-11","note":"Completion month as stated in the prospectus."},
 'The subscriber is Shanghai Feiya; the record assigns the participation to Ant Group because the prospectus traces Shanghai Feiya to a fund whose general partner is an Ant Group subsidiary. Shanghai Feiya appears among subscribers in the Series B5 table; the record attributes no amount to Ant Group and does not establish in which sub-round (B5-1, B5-2) each listed subscription was made.',
 [ev(0,ZP,'History, Development and Corporate Structure — Series B5 Financing (p. 120)','quote','Shanghai Feiya 465,090 200,000,000'),
  ev(0,ZP,'Information about Our Pre-IPO Investors — Shanghai Yunya and Shanghai Feiya (p. 132)','quote','managed by its general partner, Ant Unicorn Ltd., an indirect wholly owned subsidiary of Ant Group.')],
 attrs={"transactionType":"funding_round","transactionStage":"completed","relationshipContext":"external","period":"Series B5 Financing"})
claim('zhipu-prosperity7-b5','prosperity7','participated_in_round',E('zhipu'),'capital',
 'Zhipu’s Hong Kong prospectus of 30 December 2025 lists P7 China Holdings PCC Limited (“Prosperity7”), which it describes as wholly owned by Aramco Ventures Company, among the subscribers in its Series B5 financing, completed in November 2024.',
 {"kind":"event","date":"2024-11","note":"Completion month as stated in the prospectus."},
 'The record attributes no amount to Prosperity7 and does not establish the sub-round of its subscription.',
 [ev(0,ZP,'History, Development and Corporate Structure — Series B5 Financing (p. 120)','quote','P7 China Holdings PCC Limited (“Prosperity7”)'),
  ev(0,ZP,'Information about Our Pre-IPO Investors — Prosperity7 (p. 133)','quote','Prosperity7 is a protected cell company established in Guernsey, and is wholly-owned by Aramco Ventures Company')],
 attrs={"transactionType":"funding_round","transactionStage":"completed","relationshipContext":"external","period":"Series B5 Financing"})
# Zhipu roles
claim('li-juanzi-zhipu-ned-2025','li-juanzi','held_role',E('zhipu'),'governance',
 'Zhipu’s Hong Kong prospectus of 30 December 2025 identifies Li Juanzi as co-founder and non-executive Director, with her current appointment as Director dated 28 June 2025.',
 {"kind":"snapshot","date":"2025-12-30","note":"Role as shown in the prospectus of 30 December 2025; the appointment date of 28 June 2025 is the prospectus’s own."},
 'A snapshot from the company’s filing; the record does not establish a continuing role after the prospectus date.',
 [ev(0,ZP,'Directors, Supervisor and Senior Management — Non-executive Directors (p. 225)','quote','is our co-founder and non-executive Director.'),
  ev(0,ZP,'Directors, Supervisor and Senior Management — table of Directors (p. 223)','paraphrase','The table lists Li Juanzi as non-executive Director, joining the group on 11 June 2019, appointed Director on 28 June 2025.',anchor='June 11, ( ) 2019 June 28, 2025')],
 attrs={"role":"co-founder and non-executive Director"},related=['lg-cn-li-juanzi-zhipu-cofounder'])
claim('liu-debing-tsinghua-prior','liu-debing','held_role',E('tsinghua'),'people',
 'Zhipu’s Hong Kong prospectus of 30 December 2025 states that Liu Debing, after working at the Beijing institute of Technicolor (China) until December 2012, worked as senior engineer at Tsinghua University.',
 {"kind":"unknown","note":"The prospectus gives no dates for the Tsinghua role beyond “subsequently” (after December 2012)."},
 'A prior role stated in the company’s filing; dates are not given and the record does not extend it to the present.',
 [ev(0,ZP,'Directors, Supervisor and Senior Management — Executive Directors, Dr. Liu Debing (p. 224)','quote','Dr. Liu subsequently worked as senior engineer at Tsinghua University.')],
 attrs={"role":"senior engineer"},related=['lg-cn-liu-debing-zhipu-cofounder'])
claim('wang-shaolan-tsinghua-2018-2019','wang-shaolan','held_role',E('tsinghua'),'people',
 'Zhipu’s Hong Kong prospectus of 30 December 2025 states that Wang Shaolan worked at Tsinghua University from March 2018 to June 2019.',
 {"kind":"interval","from":"2018-03","until":"2019-06","note":"Interval as stated in the prospectus."},
 'The prospectus gives no position for this period; the record does not establish one.',
 [ev(0,ZP,'Directors, Supervisor and Senior Management — Senior Management, Mr. Wang Shaolan (p. 230); the text layer interleaves a company name into the sentence','quote','From March 2018 to June … 2019, he worked at Tsinghua University.')],
 attrs={"role":"worked at Tsinghua University (position not stated)"},related=['lg-cn-wang-shaolan-zhipu-cofounder'])
# MiniMax
MP='lg2-src-minimax-prospectus'
claim('zhao-pengyu-minimax-2025','zhao-pengyu','held_role',E('minimax'),'people',
 'MiniMax’s Hong Kong prospectus of 31 December 2025 identifies Zhao Pengyu as an executive Director appointed in June 2025 and the company’s large language model research and engineering leader.',
 {"kind":"snapshot","date":"2025-12-31","note":"Role as shown in the prospectus of 31 December 2025."},
 'A snapshot from the company’s filing; it does not establish when the leadership role began or that it continued.',
 [ev(0,MP,'Directors and Senior Management — Executive Directors, Mr. Zhao Pengyu (p. 352)','quote','is our executive Director appointed in June 2025 and the large language model research and engineering leader.')],
 attrs={"role":"executive Director (appointed June 2025); large language model research and engineering leader"})
claim('zhao-pengyu-minimax-joined-2023','zhao-pengyu','held_role',E('minimax'),'people',
 'MiniMax’s Hong Kong prospectus of 31 December 2025 states that Zhao Pengyu joined the company as a natural language processing researcher and engineer in August 2023.',
 {"kind":"interval","from":"2023-08","note":"Start month as stated; the prospectus does not say until when he held this position."},
 'The record does not establish when the position changed.',
 [ev(0,MP,'Directors and Senior Management — Executive Directors, Mr. Zhao Pengyu (p. 352)','quote','joined our Company as a natural language processing researcher and engineer since August 2023.')],
 attrs={"role":"natural language processing researcher and engineer"})
claim('zhou-yucong-minimax-2025','zhou-yucong','held_role',E('minimax'),'people',
 'MiniMax’s Hong Kong prospectus of 31 December 2025 identifies Zhou Yucong as an executive Director appointed in June 2025 and the company’s visual model research and engineering leader.',
 {"kind":"snapshot","date":"2025-12-31","note":"Role as shown in the prospectus of 31 December 2025."},
 'A snapshot from the company’s filing; it does not establish when the leadership role began or that it continued.',
 [ev(0,MP,'Directors and Senior Management — Executive Directors, Mr. Zhou Yucong (p. 352)','quote','is our executive Director appointed in June 2025 and the visual model research and engineering leader.')],
 attrs={"role":"executive Director (appointed June 2025); visual model research and engineering leader"})
# Luo Fuli
JL='lg2-src-jiemian-luo-2025'; NB='lg2-src-nbd-luo-2025'
claim('luo-fuli-xiaomi-mimo-2025-11','luo-fuli','held_role',E('xiaomi'),'people',
 'Jiemian reported on 12 November 2025, according to The Paper, that Luo Fuli had posted on WeChat Moments that day that she was at Xiaomi MiMo.',
 {"kind":"snapshot","date":"2025-11-12","note":"Date of the reported post; not a start date."},
 'The record rests on reporting that relays a WeChat Moments post, which was not retrieved; the post as quoted gives no title and no start date.',
 [ev(0,JL,'Opening paragraph','quote','罗福莉在朋友圈发文：“智能终将从语言迈向物理世界。我正在Xiaomi MiMo')],
 attrs={"role":"working at Xiaomi MiMo (no title stated in the post)"},event='ev-2025-11-luo-fuli-xiaomi')
claim('luo-fuli-xiaomi-mimo-head-2025-12','luo-fuli','held_role',E('xiaomi'),'people',
 'National Business Daily reported on 17 December 2025 that Luo Fuli presented Xiaomi MiMo-V2-Flash at Xiaomi’s partner conference in Beijing that day as head of the Xiaomi MiMo large model team.',
 {"kind":"snapshot","date":"2025-12-17","note":"Date of the reported conference; not a start date."},
 'The record rests on reporting from the conference; no Xiaomi announcement naming her title was retrieved. It does not establish a start date or a continuing role.',
 [ev(0,NB,'Second paragraph of the report','quote','Xiaomi MiMo 大模型负责人罗福莉“首秀”上台')],
 attrs={"role":"Xiaomi MiMo 大模型负责人 (head of Xiaomi MiMo large model)"},event='ev-2025-11-luo-fuli-xiaomi')
claim('luo-fuli-deepseek-prior','luo-fuli','held_role',E('deepseek'),'people',
 'Jiemian reported on 12 November 2025 that Luo Fuli had joined High-Flyer, DeepSeek’s parent company, in 2022 and later served as a deep-learning researcher at DeepSeek.',
 {"kind":"unknown","note":"The report gives 2022 for joining High-Flyer but no dates for the DeepSeek role."},
 'The record rests on reporting (Jiemian’s summary of public information); it does not establish the dates of the DeepSeek role or of her departure, and no departure announcement was located.',
 [ev(0,JL,'Paragraph on her career (“罗福莉的职业生涯…”)','quote','后又担任DeepSeek的深度学习研究员，参与研发DeepSeek-V2等模型')],
 attrs={"role":"深度学习研究员 (deep-learning researcher)"},event='ev-2025-11-luo-fuli-xiaomi')
# Baichuan
JB='lg2-src-jiemian-baichuan-2025'; KB='lg2-src-36kr-baichuan-2026'
qJ='百川智能的联合创始人焦可已经离职，另一位联合创始人陈炜鹏也将离职'
qH='前百川智能联合创始人、商业化负责人洪涛已经离职'
claim('hong-tao-baichuan-cofounder','hong-tao','co_founded',E('baichuan'),'people',
 'Jiemian reported on 17 March 2025 that Hong Tao was a co-founder of Baichuan Intelligence and its head of commercialisation.',
 {"kind":"unknown","note":"A retrospective co-founder designation; no personal founding date. Baichuan’s establishment date is recorded separately."},
 'The record rests on reporting; Baichuan’s own website, as retrieved for the first pack, names only Wang Xiaochuan as founder.',
 [ev(0,JB,'Fifth paragraph','quote',qH)],related=['lg-cn-baichuan-founded-2023'])
claim('hong-tao-baichuan-departure-2024','hong-tao','departure_announced',E('baichuan'),'people',
 'Jiemian reported on 17 March 2025 that 36Kr had reported in December 2024 that Hong Tao had left Baichuan Intelligence some time before.',
 {"kind":"event","date":"2024-12","note":"Month of the 36Kr report and Baichuan’s reply as relayed; not his last working day."},
 'The record rests on reporting that relays a 36Kr report, not retrieved; Jiemian also relays a reply from Baichuan confirming the departure, whose stated reason is left out. 36Kr’s republished commentary of 24 July 2026 also dates his departure to December 2024.',
 [ev(0,JB,'Fifth paragraph','paraphrase','Relaying 36Kr’s December 2024 report: Hong Tao no longer took part in Baichuan’s day-to-day management and had left some time before.',anchor='已离职有一段时间'),
  ev(0,KB,'Timeline paragraph','quote','2024年12月，洪涛出走')],
 attrs={"role":"联合创始人、商业化负责人 (co-founder, head of commercialisation)"})
claim('jiao-ke-baichuan-cofounder','jiao-ke','co_founded',E('baichuan'),'people',
 'Jiemian reported on 17 March 2025, relaying Lanjing News, that Jiao Ke was a co-founder of Baichuan Intelligence.',
 {"kind":"unknown","note":"A retrospective co-founder designation; no personal founding date."},
 'The record rests on reporting that relays another outlet.',
 [ev(0,JB,'Second paragraph','quote',qJ)],related=['lg-cn-baichuan-founded-2023'])
claim('jiao-ke-baichuan-departure-2025','jiao-ke','departure_announced',E('baichuan'),'people',
 'Jiemian reported on 17 March 2025, relaying a Lanjing News report of the same day, that Baichuan Intelligence co-founder Jiao Ke had left the company.',
 {"kind":"event","date":"2025-03-17","note":"Date of the report; not a last working day."},
 'The record rests on reporting that relays another outlet; Jiemian stated that Baichuan had not responded officially when it published. Reports on his next venture are left out.',
 [ev(0,JB,'Second paragraph','quote',qJ)],
 attrs={"role":"联合创始人 (co-founder); responsible for internet business, per the report"})
claim('chen-weipeng-baichuan-cofounder','chen-weipeng','co_founded',E('baichuan'),'people',
 'Jiemian reported on 17 March 2025, relaying Lanjing News, that Chen Weipeng was a co-founder of Baichuan Intelligence.',
 {"kind":"unknown","note":"A retrospective co-founder designation; no personal founding date."},
 'The record rests on reporting that relays another outlet.',
 [ev(0,JB,'Second paragraph','quote',qJ)],related=['lg-cn-baichuan-founded-2023'])
claim('chen-weipeng-baichuan-departure-2025','chen-weipeng','departure_announced',E('baichuan'),'people',
 'Jiemian reported on 17 March 2025, relaying Lanjing News, that Baichuan Intelligence co-founder Chen Weipeng was going to leave and was still going through internal procedures.',
 {"kind":"event","date":"2025-03-17","note":"Date of the report of a pending departure; not a last working day."},
 'The record rests on reporting of a pending departure (“也将离职”); 36Kr’s republished commentary of 24 July 2026 states that he left in March 2025. No announcement by Baichuan or by Chen was located.',
 [ev(0,JB,'Second paragraph','quote',qJ),
  ev(0,KB,'Timeline paragraph','quote','模型研发负责人陈炜鹏双双离职')],
 attrs={"role":"联合创始人 (co-founder); responsible for large-language-model technology, per the report","stage":"announced"})
claim('xie-jian-baichuan-cofounder','xie-jian','co_founded',E('baichuan'),'people',
 '36Kr, republishing a Bowang Caijing commentary on 24 July 2026, described Xie Jian as a technical co-founder of Baichuan Intelligence.',
 {"kind":"unknown","note":"A retrospective co-founder designation; no personal founding date."},
 'The record rests on a republished commentary piece.',
 [ev(0,KB,'Timeline paragraph','quote','同年7月，技术联合创始人谢剑')],related=['lg-cn-baichuan-founded-2023'])
claim('xie-jian-baichuan-departure-2025','xie-jian','departure_announced',E('baichuan'),'people',
 '36Kr, republishing a Bowang Caijing commentary on 24 July 2026, reported that Baichuan Intelligence technical co-founder Xie Jian submitted his resignation in July 2025.',
 {"kind":"event","date":"2025-07","note":"Month as given in a retrospective account; not a last working day."},
 'The record rests on a republished commentary’s retrospective timeline; no contemporaneous announcement or report was retrieved.',
 [ev(0,KB,'Timeline paragraph','quote','同年7月，技术联合创始人谢剑')],
 attrs={"role":"技术联合创始人 (technical co-founder)","stage":"announced"})
claim('ru-liyun-baichuan-cofounder','ru-liyun','co_founded',E('baichuan'),'people',
 '36Kr, republishing a Bowang Caijing commentary on 24 July 2026, described Ru Liyun as the last remaining co-founder of Baichuan Intelligence and stated that he joined at its creation in April 2023.',
 {"kind":"unknown","note":"A retrospective co-founder designation; the commentary places his joining at Baichuan’s creation in April 2023, which the record does not adopt as a founding date."},
 'The record rests on a republished commentary piece.',
 [ev(0,KB,'Third paragraph','quote','他是最后一个联合创始人'),
  ev(0,KB,'Section 01','quote','2023年4月百川智能创立时，茹立云是第一批入伙的人')],related=['lg-cn-baichuan-founded-2023'])
claim('ru-liyun-baichuan-departure-2026','ru-liyun','departure_announced',E('baichuan'),'people',
 '36Kr, republishing a Bowang Caijing commentary on 24 July 2026, reported that Ru Liyun, president of Baichuan Intelligence, formally left the company on 16 July 2026.',
 {"kind":"event","date":"2026-07-16","note":"Date of departure as given in the commentary."},
 'The record rests on a republished commentary piece; no Baichuan announcement was located. The commentary’s statements on his next role and on reasons are left out: the next role was not found in the filings of the named listed company retrieved through cninfo (June–October 2026).',
 [ev(0,KB,'Opening','quote','7月16日，茹立云正式离职'),
  ev(0,KB,'Timeline paragraph','quote','2026年7月16日，前搜狗COO、百川智能总裁，转身离去')],
 attrs={"role":"百川智能总裁 (president, Baichuan Intelligence)"})
# 01.AI
JD='lg2-src-jiemian-dai-2025'
claim('dai-zonghong-01ai-cofounder','dai-zonghong','co_founded',E('zero-one-ai'),'people',
 'Jiemian reported on 9 May 2025 that 01.AI, replying to a 36Kr report, described Dai Zonghong as its co-founder and vice president of technology.',
 {"kind":"unknown","note":"A retrospective co-founder designation; no personal founding date. 01.AI’s establishment month is recorded separately."},
 'The record rests on reporting that relays 01.AI’s reply; 01.AI’s management-team page as retrieved for the first pack does not list him.',
 [ev(0,JD,'Item “零一万物联创戴宗宏离职创业”','quote','零一万物回复称，零一万物联合创始人、技术副总裁戴宗宏数月前在创新工场支持下再次创业')],
 related=['lg-cn-01ai-founded-2023'])
claim('dai-zonghong-01ai-departure-2025','dai-zonghong','departure_announced',E('zero-one-ai'),'people',
 'Jiemian reported on 9 May 2025 that 36Kr had reported on 8 May that 01.AI co-founder and vice president of technology Dai Zonghong had recently left to start a company, and that 01.AI replied that he had started a new company some months earlier with the support of Sinovation Ventures.',
 {"kind":"event","date":"2025-05-08","note":"Date of the 36Kr report as relayed; 01.AI’s reply places the new venture “数月前” (some months earlier); no last working day is given."},
 'The record rests on reporting that relays a 36Kr report and 01.AI’s reply; neither was retrieved directly. Investment in his new company is left out.',
 [ev(0,JD,'Item “零一万物联创戴宗宏离职创业”','quote','零一万物联合创始人、技术副总裁戴宗宏于近日离职创业'),
  ev(0,JD,'Same item','quote','零一万物回复称，零一万物联合创始人、技术副总裁戴宗宏数月前在创新工场支持下再次创业')],
 attrs={"role":"联合创始人、技术副总裁 (co-founder, vice president of technology)"})
# StepFun
TP='lg2-src-thepaper-stepfun-2026'
qS='阶跃星辰（StepFun）完成超50亿元B+轮融资'
claim('stepfun-round-bplus-2026','stepfun','announced_funding',{"kind":"literal","value":5000000000,"unit":"CNY"},'capital',
 'The Paper reported on 26 January 2026 that its reporter had learned that StepFun had completed a B+ round of more than RMB5 billion.',
 {"kind":"event","date":"2026-01-26","note":"Date of the report; not a closing date stated by the company."},
 'The record rests on reporting; no StepFun announcement was retrieved. The amount is a lower bound (“超50亿元”).',
 [ev(0,TP,'Second paragraph','quote',qS)],
 attrs={"transactionType":"funding_round","transactionStage":"completed","relationshipContext":"external","amount":{"value":5000000000,"currency":"CNY","bound":"more_than","scope":"round_total"},"period":"B+轮 (Series B+)"},
 related=['lg-cn-yin-qi-stepfun-chairman-2026'])
for inv,slug,nm in [('tencent','tencent','腾讯'),('qiming-venture-partners','qiming','启明')]:
    claim(f'stepfun-{slug}-bplus-2026',inv,'participated_in_round',E('stepfun'),'capital',
     f'The Paper reported on 26 January 2026 that {"Tencent" if slug=="tencent" else "Qiming"}, an existing shareholder, invested further in StepFun’s B+ round.',
     {"kind":"event","date":"2026-01-26","note":"Date of the report."},
     'The record rests on reporting; no amount is attributed to this investor, and the report does not name a lead investor.',
     [ev(0,TP,'Second paragraph','quote','腾讯、启明、五源等老股东进一步跟投')],
     attrs={"transactionType":"funding_round","transactionStage":"completed","relationshipContext":"external","role":"existing shareholder following on (老股东跟投)","period":"B+轮 (Series B+)"})
# Moonshot
LJ='lg2-src-lanjing-moonshot-2025'
claim('moonshot-round-c-2025','moonshot-ai','announced_funding',{"kind":"literal","value":500000000,"unit":"USD"},'capital',
 'Lanjing News reported on 31 December 2025 that Moonshot AI CEO Yang Zhilin had stated in an internal letter that day that the company had recently completed a USD 500 million Series C round.',
 {"kind":"event","date":"2025-12-31","note":"Date of the reported internal letter; the letter as relayed says the round closed recently (“近期”), without a date."},
 'The record rests on reporting that relays an internal letter, which was not retrieved. The report names no investors; reports naming a lead investor rest on other outlets and are not recorded.',
 [ev(0,LJ,'Opening paragraph','quote','确认公司已于近期完成5亿美元C轮融资且大幅超募')],
 attrs={"transactionType":"funding_round","transactionStage":"completed","relationshipContext":"external","amount":{"value":500000000,"currency":"USD","bound":"exact","scope":"round_total"},"period":"C轮 (Series C)"},
 related=['lg-cn-yang-zhilin-moonshot-ceo-2024'])

events=[{"id":"ev-2025-11-luo-fuli-xiaomi","date":"2025-11-12","title":"Luo Fuli, formerly of DeepSeek, reported at Xiaomi MiMo","labs":["deepseek","xiaomi"]}]
doc=dict(group='cn',searched='',existingUsed=[],entities=ents,sources=list(S.values()),events=events,claims=C,omitted=[],retrievalFailures=[])
try:
    old=json.load(open(OUT)); 
    for k in ('searched','existingUsed','omitted','retrievalFailures'): doc[k]=old.get(k,doc[k])
except Exception: pass
json.dump(doc,open(OUT,'w'),ensure_ascii=False,indent=2)
print(len(C))
