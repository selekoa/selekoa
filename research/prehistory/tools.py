#!/usr/bin/env python3
"""Candidate pack tooling for research/prehistory.

Usage (from the repository root, python3 -I):
  research/prehistory/tools.py fetch <key> <url>    retrieve into .local/prehistory/doc (ignored)
  research/prehistory/tools.py text <key>           (re)extract text (pdftotext for PDF, html stripped)
  research/prehistory/tools.py grep <key> <regex> [context]
  research/prehistory/tools.py check                check every quote in drafts/*.json against the cache
  research/prehistory/tools.py merge                drafts -> pack.json, then verification.json
Retrieval bodies stay in the ignored cache; only hashes and statuses are tracked.
"""
import hashlib, html, json, os, re, subprocess, sys, time, unicodedata
from pathlib import Path

DIR = Path(__file__).resolve().parent
ROOT = DIR.parent.parent
CACHE = ROOT / '.local' / 'prehistory' / 'doc'
UA = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36'


def meta_path(key):
    return CACHE / f'{key}.json'


def fetch(key, url):
    CACHE.mkdir(parents=True, exist_ok=True)
    body = CACHE / f'{key}.bin'
    out = subprocess.run(['curl', '-sS', '-L', '--compressed', '-m', '240', '-A', UA, '-o', str(body),
                          '-w', '%{http_code}\t%{url_effective}\t%{content_type}', url],
                         capture_output=True, text=True)
    status, final, ctype = (out.stdout.split('\t') + ['', '', ''])[:3]
    data = body.read_bytes() if body.exists() else b''
    meta = {'key': key, 'url': url, 'finalUrl': final, 'httpStatus': int(status or 0), 'contentType': ctype,
            'sha256': hashlib.sha256(data).hexdigest(), 'bytes': len(data),
            'retrievedAt': time.strftime('%Y-%m-%d'), 'stderr': out.stderr.strip()[:300]}
    meta_path(key).write_text(json.dumps(meta, indent=1))
    extract(key)
    print(json.dumps(meta))


def extract(key):
    body = CACHE / f'{key}.bin'
    meta = json.loads(meta_path(key).read_text())
    data = body.read_bytes()
    if data[:4] == b'%PDF':
        subprocess.run(['pdftotext', '-layout', str(body), str(CACHE / f'{key}.txt')], check=False)
        return
    txt = data.decode('utf-8', 'replace')
    if 'html' in meta.get('contentType', '') or '<html' in txt[:2000].lower():
        txt = re.sub(r'(?is)<(script|style)[^>]*>.*?</\1>', ' ', txt)
        txt = re.sub(r'(?i)<br\s*/?>|</p>|</div>|</h\d>|</li>|</tr>', '\n', txt)
        txt = re.sub(r'<[^>]+>', ' ', txt)
        txt = html.unescape(txt)
    (CACHE / f'{key}.txt').write_text(txt)


def norm(s):
    s = unicodedata.normalize('NFKC', s)
    s = s.replace('\u00ad', '').replace('_', '')
    s = re.sub(r'-\s*\n\s*', '', s)  # rejoin hyphenated line breaks
    s = s.translate(str.maketrans({'‘': "'", '’': "'", '“': '"', '”': '"', '—': '-',
                                   '–': '-', ' ': ' ', 'ſ': 's'}))
    s = re.sub(r'\s+', ' ', s)
    s = re.sub(r'\s+([?!;:,.])', r'\1', s)
    return s.strip().lower()


def text(key):
    p = CACHE / f'{key}.txt'
    return p.read_text(errors='replace') if p.exists() else ''


def grep(key, pattern, ctx=200):
    t = re.sub(r'\s+', ' ', text(key))
    for m in re.finditer(pattern, t, flags=re.I):
        print('…' + t[max(0, m.start() - ctx):m.end() + ctx] + '…\n')


def drafts():
    return sorted((DIR / 'drafts').glob('*.json'))


def words(s):
    return len(re.findall(r"[\w’'-]+", s))


def check(write=False):
    results, problems = [], []
    per_source = {}
    sources = {}
    for d in drafts():
        j = json.loads(d.read_text())
        for s in j.get('sources', []):
            sources[s['key']] = s
    for d in drafts():
        j = json.loads(d.read_text())
        for r in j.get('records', []) + j.get('links', []):
            for i, ev in enumerate(r.get('evidence', [])):
                src = sources.get(ev['source'])
                res = {'record': r['id'], 'item': i, 'source': ev['source'], 'passageType': ev['passageType'],
                       'locator': ev['locator']}
                if ev['passageType'] == 'quote':
                    n = words(ev['passage'])
                    res['words'] = n
                    if n > 50:
                        problems.append(f"{r['id']}[{i}] quote has {n} words")
                    cache_key = (src or {}).get('cacheKey') or ev['source']
                    t = text(cache_key)
                    if (src or {}).get('unverifiedCopy'):
                        res['match'] = 'UNVERIFIED'
                        res['matchNote'] = src['unverifiedCopy']
                    elif (src or {}).get('visualOnly'):
                        res['match'] = 'page-image-read'
                        res['matchNote'] = src['visualOnly']
                    elif not t:
                        res['match'] = 'not-cached'
                        if not (src or {}).get('matchedElsewhere'):
                            problems.append(f"{r['id']}[{i}] source {cache_key} not cached")
                        else:
                            res['match'] = 'matched-elsewhere'
                            res['matchNote'] = src['matchedElsewhere']
                    else:
                        raw = ev.get('matchText') or ev['passage']
                        parts = [norm(p) for p in re.split(r'\s*\[(?:…|\.\.\.)\]\s*|\s*…\s*', raw) if p.strip()]
                        T = norm(t)
                        ok = all(p.strip() in T for p in parts)
                        res['match'] = 'exact-normalised' if ok else 'NOT-FOUND'
                        if not ok:
                            problems.append(f"{r['id']}[{i}] quote not found in {cache_key}: {ev['passage'][:80]}")
                    per_source.setdefault(ev['source'], {})[ev['passage']] = n
                results.append(res)
    ds_words = dataset_quoted_words()
    totals = {}
    for k, ps in per_source.items():
        dsid = (sources.get(k) or {}).get('datasetSource')
        prior = {q: n for q, n in ds_words.get(dsid, {}).items() if q not in ps} if dsid else {}
        w = sum(ps.values()) + sum(prior.values())
        dw = ((sources.get(k) or {}).get('documentWords') or {}).get('count')
        limit = None
        if dw:
            limit = min(800, max(400, dw * 0.05)) if dw >= 2000 else dw * 0.10
        totals[k] = {'quotedWords': w, 'packWords': sum(ps.values()), 'datasetWords': sum(prior.values()),
                     'documentWords': dw, 'limit': limit}
        if limit is not None and w > limit:
            problems.append(f'{k}: {w} quoted words over limit {limit:.0f}')
        if dw is None:
            problems.append(f'{k}: documentWords missing')
    return results, totals, problems


def dataset_quoted_words():
    ev = json.loads((ROOT / 'data' / 'evidence.json').read_text())
    out = {}
    for e in ev:
        if e.get('passageType') == 'quote' and e.get('passage'):
            out.setdefault(e['sourceId'], {})[e['passage']] = words(e['passage'])
    return out


BANNED = r'\b(first|coined|originat\w*|invent\w*|pioneer\w*|seminal|landmark|visionary|prophet\w*|admits?|concedes?|debunk\w*|dismiss\w*|rightly|warns?|famous\w*|extreme|fringe|dangerous)\b'


def merge():
    pack = {'title': 'Antecedent texts: machine intelligence before 1965 (candidate pack)',
            'status': 'Candidate research pack, outside application data. Machine-prepared (Claude family); same-family audit in audit.md; cross-family check by OpenAI Codex (2026-11-03) adjudicated in the review note. Nothing here is admitted or editorially accepted.',
            'prepared': time.strftime('%Y-%m-%d'), 'drafts': [], 'sources': [], 'documents': [], 'records': [],
            'links': [], 'existingRecords': [], 'earliestLocated': [], 'searchLog': [], 'omissions': [],
            'retrievalFailures': [], 'codexRetrieval': [], 'openQuestions': []}
    for d in drafts():
        j = json.loads(d.read_text())
        pack['drafts'].append(d.name)
        for k in ['sources', 'documents', 'records', 'links', 'existingRecords', 'earliestLocated', 'searchLog',
                  'omissions', 'retrievalFailures', 'codexRetrieval', 'openQuestions']:
            for x in j.get(k, []):
                if isinstance(x, dict) and k in ('records', 'links'):
                    x = dict(x, draft=d.name)
                pack[k].append(x)
    ids = [r['id'] for r in pack['records'] + pack['links']]
    dup = sorted({i for i in ids if ids.count(i) > 1})
    docs = {x['id'] for x in pack['documents']}
    probs = [f'duplicate id {i}' for i in dup]
    for r in pack['records']:
        if r['document'] not in docs:
            probs.append(f"{r['id']}: document {r['document']} not in pack documents")
        for fld in ('statement', 'qualification'):
            screened = re.sub(r"“[^”]*”|'[^']*'|\"[^\"]*\"|not a first statement", '', r.get(fld) or '')
            for m in re.finditer(BANNED, screened, flags=re.I):
                probs.append(f"{r['id']}: banned word '{m.group(0)}' in {fld}")
    results, totals, qprobs = check()
    pack['mergeProblems'] = probs + qprobs
    (DIR / 'pack.json').write_text(json.dumps(pack, indent=2, ensure_ascii=False) + '\n')
    ver = {'checkedAt': time.strftime('%Y-%m-%d'),
           'method': 'Each quoted passage is normalised (Unicode NFKC, curly quotes and dashes folded, hyphenated line breaks rejoined, whitespace collapsed, case folded) and searched as a substring of the text extracted from the retrieved expression (pdftotext -layout for PDFs; tags stripped for HTML). Ellipses split a quote into parts that must each match. Word limits: 50 per quote; per-source totals against the editorial policy limits using documentWords. Banned-word screen over statements and qualifications.',
           'cache': '.local/prehistory/doc (ignored); hashes in pack sources',
           'results': results, 'perSource': totals, 'problems': pack['mergeProblems']}
    (DIR / 'verification.json').write_text(json.dumps(ver, indent=2, ensure_ascii=False) + '\n')
    print(f"records {len(pack['records'])}, links {len(pack['links'])}, sources {len(pack['sources'])}, problems {len(pack['mergeProblems'])}")
    for p in pack['mergeProblems']:
        print(' -', p)


if __name__ == '__main__':
    cmd = sys.argv[1]
    if cmd == 'fetch':
        fetch(sys.argv[2], sys.argv[3])
    elif cmd == 'text':
        extract(sys.argv[2])
    elif cmd == 'grep':
        grep(sys.argv[2], sys.argv[3], int(sys.argv[4]) if len(sys.argv) > 4 else 200)
    elif cmd == 'check':
        r, t, p = check()
        print(len(r), 'evidence items;', len(p), 'problems')
        for x in p:
            print(' -', x)
    elif cmd == 'merge':
        merge()
