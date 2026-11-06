# Applies the adjudication of the cross-family check (cross-family-check-2026-11-02.json,
# OpenAI Codex, checked 2026-11-03) to the drafts, and marks what the check covered
# differently: corrected records and rows, the two held disagreements, and items the
# check could not complete. Every change asserts that it changes something.
# Run once from research/prehistory: python3 -I adjudication/apply-2026-11-03.py
import glob, json

DRAFTS = sorted(glob.glob('drafts/*.json'))
docs = {f: json.load(open(f, encoding='utf-8')) for f in DRAFTS}
recs = {r['id']: r for d in docs.values() for r in d.get('records', []) + d.get('links', [])}
documents = {x['id']: x for d in docs.values() for x in d.get('documents', [])}
el = docs['drafts/earliest.json']['earliestLocated']
changed = []


def put(obj, key, new, label):
    assert obj.get(key) != new, f'no change: {label} {key}'
    obj[key] = new
    changed.append(f'{label}.{key}')


def swap(obj, key, old, new, label):
    assert old in (obj.get(key) or ''), f'not found in {label}.{key}: {old[:60]}'
    put(obj, key, obj[key].replace(old, new), label)


def mark(obj, items, result, **extra):
    obj['crossFamily'] = {'items': items, 'result': result, **extra}


def row(prop, role):
    m = [e for e in el if e['proposition'] == prop and e['role'] == role]
    assert len(m) == 1, (prop, role)
    return m[0]


# A2.11: locator. The quotation opens Note G's second paragraph, after the warning
# against exaggerated ideas, not its opening paragraph.
r = recs['pre-u01-lovelace-1843-notes']
swap(r['evidence'][0], 'locator', 'p. 722, opening paragraph', 'p. 722, second paragraph', r['id'])
mark(r, ['A2.11', 'F10'], 'corrected: locator (second paragraph of Note G); document authors aligned with the source record. Classification agreed.')

# F10: the document's authors still named Ada Lovelace; the volume prints the initials.
d = documents['lovelace-1843-notes']
put(d, 'authors', ['A. A. L. (attributed to Ada Lovelace)'], d['id'])

# B8 / F7: the quoted prediction about usage and the imitation game does not state that a
# machine could think; recorded as bears on, with the missing element stated.
r = recs['pre-u02-turing-1950']
put(r, 'predicate', 'bears_on_proposition', r['id'])
put(r, 'roles', ['context'], r['id'])
put(r, 'missing', 'The quoted sentences predict how well computers will play the imitation game and how '
    'educated usage will change; they do not state that a machine could think. Turing calls the original '
    'question too meaningless to deserve discussion. A separately located passage stating the claim, with its '
    'own locator, would be needed for an articulation.', r['id'])
put(r, 'qualification', "In the same paragraph Turing calls the original question 'Can machines think?' 'too "
    "meaningless to deserve discussion'. Recorded as context after the cross-family check (item B8), which "
    'found that the prediction alone does not meet U02 as worded; the same-family audit (F7) had noted the '
    'same gap.', r['id'])
for e in r['evidence']:
    put(e, 'support', 'context', r['id'] + '.evidence')
mark(r, ['B8', 'F7'], 'corrected: articulates to bears on (context), as the checker found; quotation and paraphrase confirmed.')

# B3 / F-English-RUR / A2.4 / A2.13: the English copy is an undated later Samuel French
# printing with a 1923 copyright notice and an ISBN, transcribed in 2019. 1923 is a
# copyright date; the English wording is attested by the 2019 transcription. The Czech
# counterparts are attested in the 1920 Aventinum printing, read by the checker only.
d = documents['capek-rur-1923-english']
put(d, 'dateBasis', 'copyright', d['id'])
put(d, 'dateNote', 'Copyright year printed in the English version (Doubleday, Page and Company, 1923). The copy '
    'read is an undated later Samuel French printing (it carries ISBN 0 573 61497 0 and later publisher notices), '
    'transcribed by Project Gutenberg in 2019; 1923 is not the date of this printing. The Czech play was printed '
    'by Aventinum, Prague, in 1920 (title imprint and colophon read by the cross-family check, not by the '
    'preparer).', d['id'])
OLD_CZ = 'The Czech original (1920, the date usually given; not checked here) was not read.'
NEW_CZ = ('The Czech printing of 1920 (Aventinum) carries the counterpart passage, as read by the cross-family '
          'check on page images; the English wording is not dated from it.')
for rid, czloc in [('pre-w01-capek-rur-1923', 'pp. [80] and 57'), ('pre-b6-capek-rur-1923', 'p. 61'),
                   ('pre-u02-capek-rur-1923-context', 'p. 13')]:
    r = recs[rid]
    put(r, 'time', {'kind': 'event', 'date': '1923', 'basis': 'copyright',
                    'note': 'Copyright year of the English version as printed; not the date of the printing read.'}, rid)
    put(r, 'attested', {'date': '2019', 'note': 'English wording read in the Project Gutenberg transcription (2019) '
                        'of an undated later Samuel French printing.'}, rid)
    swap(r, 'qualification', OLD_CZ, NEW_CZ.replace('counterpart passage', f'counterpart passage ({czloc})'), rid)
mark(recs['pre-w01-capek-rur-1923'], ['A2.13', 'B3', 'F-English-RUR'],
     'corrected: 1923 is a copyright date; English wording attested 2019; Czech 1920 counterparts noted. Classification agreed.')

# B3: the line's immediate object is the unloading of arms; keep it a narrow staged instance.
r = recs['pre-b6-capek-rur-1923']
swap(r, 'qualification', 'The evidence is a single line of dialogue at the point the Robots arm themselves.',
     'The evidence is a single line of dialogue whose immediate object is the Robots unloading arms; it is a '
     'narrow staged instance, not a general statement about control of machines.', r['id'])
mark(r, ['B3', 'F1', 'F-English-RUR'], 'corrected: dates as for the W01 record; narrow staged instance stated. Classification agreed.')

# B4: the letter is undated; 1961 is the commentary's reconstruction.
r = recs['pre-u02-kolmogorov-1961-letter']
put(r['time'], 'note', "Undated letter; 1961 is the editorial commentary's dating (p. 201), from the lecture of "
    'spring 1961 and the journal chronology. Exact day unknown.', r['id'])
mark(r, ['B4', 'F6'], 'corrected: date note (1961 is an editorial reconstruction). Classification agreed: thesis 3 articulates, thesis 2 is context.')

# B13: a criterion-relative counterexample, not a claim of unprogrammed computation.
r = recs['pre-u01-wiener-1961-cybernetics-contests']
put(r, 'qualification', r['qualification'] + ' That a machine plays better than its programmer is contrary to a '
    'strong reading of U01 (no capability beyond its maker\'s); the chapter does not claim that the machine\'s '
    'output goes beyond its instructions and their consequences. Wording read in the 2019 reissue only; not '
    'compared with a 1961 printing.', r['id'])
mark(r, ['B13'], 'corrected: the inferential distinction is stated in the qualification.')

# B14 / F4: the reprint is undated; the contrary reading is an interpretation.
r = recs['pre-u01-samuel-1959-contests']
swap(r, 'qualification', 'Read in a later reprint whose wording',
     'Read in an undated later reprint that attributes the article to July 1959, whose wording', r['id'])
swap(r, 'qualification', "not a claim the article makes.",
     "not a claim the article makes: a program that learns to beat its author still follows the learning rules it "
     'was given.', r['id'])
mark(r, ['B14', 'F4'], 'corrected: undated reprint stated; the contrary reading kept as an interpretation.')

# B6 / C6: the NPL report facsimile carries a 1948 title sheet and both passages.
d = documents['turing-amt-c-11-intelligent-machinery']
swap(d, 'dateNote', 'that date was not established from a source here and does not date this typescript.',
     'the cross-family check read a National Physical Laboratory facsimile of the report with a 1948 title sheet, '
     'carrying both quoted passages (report pp. 1–2). That dates the report, not this typescript or its '
     'corrections.', d['id'])
r = recs['pre-u01-turing-c11-contests']
swap(r, 'qualification', 'The report this typescript drafts is usually dated 1948; that date was not established from a source here (Codex list).',
     'The NPL report it drafts, read by the cross-family check in a facsimile with a 1948 title sheet, carries both '
     'passages; the report is a separate dated expression and does not date this typescript.', r['id'])
mark(r, ['B6', 'C6'], 'corrected: the 1948 NPL report is noted as a separate dated expression. Classification agreed.')

# A2.3 / F5 / C1 / EL4: Erewhon meets U02; the 1863 letter is earlier, so Erewhon loses
# the overall earliest-located role.
r = recs['pre-u02-erewhon-1872']
put(r, 'roles', ['articulation'], r['id'])
put(r, 'qualification', "Fiction: the narrator quotes the Erewhonian treatise's 'own words'. The passage documents "
    'what the novel says, not Butler\'s view. The dataset records the same passage on B5 as context '
    "(ts-b5-erewhon-1872-context). Just before the quoted passage the treatise imagines 'some new phase of mind' "
    'unlike any consciousness known; the cross-family check reads mechanical consciousness as a literal mental '
    'state that meets U02 (audit F5), with that difference kept. The earlier satirical letter of 1863 (Darwin '
    'among the Machines) was located by the cross-family check and is the earliest located U02 articulation; '
    'Erewhon is the earliest located novel.', r['id'])
mark(r, ['A2.3', 'C1', 'F5'], 'corrected: earliest located role moved to the 1863 letter (checker-located); classification agreed.')

# A1.3 / A2.14 / F-Butler-1865-image: the newspaper image is unchecked by both families.
r = recs['pre-w01-butler-1865-lucubratio-ebria-contests']
put(r, 'qualification', r['qualification'] + ' The quotation is read in the Papers Past OCR text; the newspaper page '
    'image was not checked (Papers Past image requests answered HTTP 403 to the cross-family check and on '
    '2026-11-03 here).', r['id'])
mark(r, ['A1.3', 'A2.14', 'F-Butler-1865-image'],
     'not checkable on the page image; reading agreed (the passage disputes separate succession). OCR-only qualification added.')

# B15 / C7: body unavailable; the hold stands.
mark(recs['pre-u01-samuel-1960'], ['B15', 'C7', 'F12'],
     'not checkable: article body unavailable (403); paraphrase matches the indexed abstract; the hold on admission stands.')

# Held disagreement, A2.4: R.U.R. on U02.
mark(recs['pre-u02-capek-rur-1923-context'], ['A2.4', 'C2'],
     'disagreement, open for the maintainer: the pack records context, the checker articulates.',
     readings={
         'pack (Claude)': 'context: the Robots are made from a synthetic living substance; the play ascribes '
                          'intelligence to them but does not state that a machine could think.',
         'checker (Codex)': 'articulates: the play calls the Robots machines (Czech p. 12, “živé a inteligentní '
                            'pracovní stroje”) and ascribes them intelligence; a mechanism-only boundary for U02 '
                            'while W01 and B6 are recorded for the same beings needs a stated scope decision.',
     })

# Earliest-located rows.
e = row('U01 (new)', 'earliest located articulation')
put(e, 'note', 'Within this pack\'s searches. The cross-family check searched Babbage (1833) and Menabrea for '
    'discovery and verified no earlier passage.', 'EL U01 articulation')
mark(e, ['A1.1', 'EL1'], 'agreed.')
e = row('U01 (new)', 'earliest located contesting text')
put(e, 'note', e['note'] + ' The NPL report dated 1948 (checker C6) is later than the 1947 lecture.', 'EL U01 contest')
mark(e, ['A1.1', 'EL2', 'C6'], 'agreed.')

e = row('U02 (new)', 'earliest located articulation')
put(e, 'antecedent', 'Butler, “Darwin among the Machines” (The Press, 1863-06-13, satirical letter signed '
    'Cellarius), located by the cross-family check; no pack record yet', 'EL U02 articulation')
put(e, 'deciding', '1863-06-13 (publication; wording read on page images of an archived capture by the checker)',
    'EL U02 articulation')
put(e, 'outcome', 'proposed (corrected): record to be drafted', 'EL U02 articulation')
put(e, 'note', 'The checker read on the newspaper image that future machines\' “minds will be in a state of '
    'perpetual calm” and that a self-acting power “will be to them what intellect has been to the human race”. '
    'Satirical letter; its register must be stated in any headline. Erewhon (1872) is the earliest located novel '
    "and Turing's lecture (1947) the earliest located nonfiction text. Contesting texts: see the next row.",
    'EL U02 articulation')
mark(e, ['A1.2', 'C1', 'EL4'], 'corrected: 1872 replaced by the checker-located 1863 letter; preparer agrees.')

i = el.index(e)
contest = {'proposition': 'U02 (new)', 'role': 'earliest located contesting text', 'current': None,
           'antecedent': 'Descartes, Discours de la méthode (Leiden, 1637), Part V, pp. 56–58, located by the '
                         'cross-family check; no pack record yet',
           'deciding': '1637 (publication; wording read on images of the original-edition facsimile by the checker)',
           'outcome': 'proposed (new): record to be drafted',
           'note': 'Descartes says constructed human-like machines would not act by knowledge but only by the '
                   'disposition of their organs. Jefferson\'s oration (BMJ, 1949-06-25) is a later located '
                   'contesting text. The draft said no contesting text was recorded.'}
mark(contest, ['A1.2', 'F-Descartes'], 'new row from the checker\'s finding; preparer agrees.')
el.insert(i + 1, contest)
changed.append('EL U02 contest (new row)')

e = row('W01', 'earliest located contesting text')
put(e, 'note', e['note'] + ' The cross-family check agrees that the passage contests succession, on the OCR text; '
    'the newspaper page image remains unchecked, so the flag carries that qualification.', 'EL W01 contest')
mark(e, ['A1.3', 'A2.14', 'EL5'], 'agreed, with the page-image hold.')

e = row('C1', 'earliest located articulation')
put(e, 'outcome', 'FLAG (corrected): Turing c. 1951 is superseded; the earlier text is held for the maintainer '
    '(Jefferson 1949 or Descartes 1637)', 'EL C1')
put(e, 'note', "Jefferson's oration (delivered 1949-06-09, published in the BMJ, 1949-06-25; passages on p. 1110) precedes Turing "
    'c. 1951 and was read on page images by the cross-family check. Which text heads C1 is held: see the '
    'disagreement recorded on this row.', 'EL C1')
mark(e, ['A1.4', 'C4', 'F-Descartes', 'EL10'], 'disagreement, open for the maintainer, on which earlier text heads C1.',
     readings={
         'pack (Claude)': 'Jefferson 1949: “If the machine typewrites its answers, the cry may rise that it has learned '
                          'to write” states that apparent capability is misleading evidence. Descartes describes '
                          'performances rather than a test and holds two behavioural tests to be reliable; record him '
                          'as context for C1.',
         'checker (Codex)': 'Descartes 1637, qualified: responsive words and tasks done as well as or better than people '
                            'are said not to show knowledge, which meets C1 for restricted probes; record that he '
                            'endorses two broader tests. Under a narrower unrestricted-test reading, Jefferson 1949 '
                            'heads C1 and Descartes is context.',
     })
r = recs['pre-c1-turing-c1951']
put(r, 'earliestLocatedFlag', "Superseded: Jefferson's oration (BMJ, 1949-06-25), read by the cross-family check, "
    'is earlier and meets C1; Descartes (1637) is a further candidate held for the maintainer. This record is a '
    'later C1 articulation.', r['id'])
mark(r, ['A2.10', 'A1.4', 'EL10'], 'corrected: flag superseded by the checker-located Jefferson 1949; classification agreed.')

e = row('C3', 'earliest located articulation')
put(e, 'note', e['note'] + ' The cross-family check agrees the passage is context; it found no pre-1993 C3 text '
    '(a search limit, not absence), and the 1948 and 1961 printings are marked private in the archive.', 'EL C3')
mark(e, ['A1.5', 'B11', 'C8', 'EL11'], 'agreed; early printings not checkable.')
e = row('M06a', 'earliest located tier-2 text')
put(e, 'note', 'The 1948 and 1961 printings are marked private in the archive (cross-family check C8); the flag '
    'stays conditional on reading the wording in a 1948 printing.', 'EL M06a')
mark(e, ['A2.8', 'C8', 'EL12'], 'agreed; early printings not checkable.')

for f, d in docs.items():
    with open(f, 'w', encoding='utf-8') as fh:
        json.dump(d, fh, ensure_ascii=False, indent=2)
        fh.write('\n')
print(len(changed), 'changes;', sum('crossFamily' in x for x in list(recs.values()) + el), 'marked')
