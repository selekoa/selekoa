// Candidate pack tooling for research/china-labs-2 (forked from research/lab-genealogy/tools.mjs).
// Usage: node research/china-labs-2/tools.mjs <command> …
//   fetch <key> <url> [direct|relay|x|auto]   retrieve one source into the ignored cache
//   text <key> [from] [len]                   print the cached text layer
//   grep <key> <regex>                        search a cached text layer
//   words <key>                               approximate document length
//   check <draft.json>                        validate a draft fragment (records, quotes, limits)
//   merge                                     merge drafts/*.json into pack.json
//   verify [fresh]                            verify pack.json against cached (or fresh) copies
//   refetch                                   retrieve every pack source again into the fresh cache
//   sample <percent> <seed>                   reproducible random sample of claim IDs for the audit
//   render | crosscheck <date>
// Retrieval bodies stay in the ignored .local/china-labs-2/ cache.
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import {
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  rmSync,
  writeFileSync,
} from 'node:fs';
import { dirname, join } from 'node:path';
import { gunzipSync } from 'node:zlib';
import { fileURLToPath } from 'node:url';

const DIR = dirname(fileURLToPath(import.meta.url));
const ROOT = join(DIR, '..', '..');
const LOCAL = join(ROOT, '.local', 'china-labs-2');
const CACHES = {
  cached: join(LOCAL, 'doc'),
  fresh: join(LOCAL, 'fresh'),
  audit: join(LOCAL, 'audit'),
};
// LG_CACHE=audit routes fetch, text and grep to the auditor's own cache.
const CLI_CACHE = process.env.LG_CACHE ?? 'cached';
if (!CACHES[CLI_CACHE]) throw new Error(`unknown cache ${CLI_CACHE}`);
const PACK = join(DIR, 'pack.json');
const DRAFTS = join(DIR, 'drafts');
const UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36';
const RELAY = 'https://r.jina.ai/';
const PACE_MS = 8000;

const sha256 = (buf) => createHash('sha256').update(buf).digest('hex');
const readJson = (p) => JSON.parse(readFileSync(p, 'utf8'));
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
// Words for the quotation limits: whitespace-separated tokens, with each CJK character
// counted as one word (Chinese and Japanese text has no spaces between words).
const CJK = /[\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff]/g;
const words = (s) =>
  s
    .replace(CJK, ' ')
    .trim()
    .split(/\s+/)
    .filter((w) => /[\p{L}\p{N}]/u.test(w)).length +
  (s.match(CJK) ?? []).length;

// Per-host pacing shared by concurrent processes through a small state file.
async function pace(host) {
  mkdirSync(LOCAL, { recursive: true });
  const file = join(LOCAL, 'pace.json');
  for (;;) {
    let state = {};
    try {
      state = readJson(file);
    } catch {
      // No state yet.
    }
    const wait = (state[host] ?? 0) + PACE_MS - Date.now();
    if (wait <= 0) {
      state[host] = Date.now();
      writeFileSync(file, JSON.stringify(state));
      return;
    }
    await sleep(wait + Math.floor(Math.random() * 500));
  }
}

function curl(url, out) {
  const res = execFileSync(
    'curl',
    [
      '-sS',
      '-L',
      '--compressed',
      '-m',
      '120',
      '-A',
      UA,
      '-H',
      'Accept-Language: en-US,en;q=0.9',
      '-o',
      out,
      '-w',
      '%{http_code}\t%{url_effective}\t%{content_type}',
      url,
    ],
    { encoding: 'utf8' },
  );
  const [status, finalUrl, type] = res.split('\t');
  return { status: Number(status), finalUrl, type };
}

const ENTITIES = {
  amp: '&',
  lt: '<',
  gt: '>',
  quot: '"',
  apos: "'",
  nbsp: ' ',
  mdash: '—',
  ndash: '–',
  hellip: '…',
  rsquo: '’',
  lsquo: '‘',
  rdquo: '”',
  ldquo: '“',
};
function decodeEntities(s) {
  return s
    .replace(/&#x([0-9a-f]+);/gi, (_, h) =>
      String.fromCodePoint(parseInt(h, 16)),
    )
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(Number(d)))
    .replace(/&([a-z]+);/gi, (m, n) => ENTITIES[n.toLowerCase()] ?? m);
}
function htmlToText(html) {
  return decodeEntities(
    html
      .replace(/<(script|style|noscript|svg)[\s\S]*?<\/\1>/gi, ' ')
      .replace(
        /<br\s*\/?>|<\/(p|div|li|h\d|blockquote|tr|section|article)>/gi,
        '\n',
      )
      .replace(/<[^>]+>/g, ''),
  );
}
// Reader-relay output is Markdown: keep link and emphasis text, drop the markup.
function markdownToText(md) {
  return md
    .replace(/\u2060?\(opens in a new window\)/g, '')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/(\*\*|__)(.*?)\1/g, '$2')
    .replace(/(^|[\s(])[*_]([^*_\n]+)[*_](?=[\s).,;:!?]|$)/gm, '$1$2')
    .replace(/^#{1,6}\s*/gm, '')
    .replace(/^\s*[*-]\s+/gm, '')
    .replace(/^>\s?/gm, '');
}

// Retrieval routes: direct (curl), relay (a reader service that renders the
// publisher's page, used where the publisher refuses direct retrieval) and x
// (X's own syndication endpoint for a post).
async function fetchDoc(key, url, via = 'auto', cacheName = 'cached') {
  const CACHE = CACHES[cacheName];
  mkdirSync(CACHE, { recursive: true });
  const tmp = join(CACHE, `${key}.download`);
  let route = via;
  let r = { status: 0, finalUrl: url, type: '' };
  const attempt = async (target, host) => {
    for (let i = 0; i < 3; i++) {
      await pace(host);
      try {
        r = curl(target, tmp);
        if (r.status !== 429 && r.status < 500 && r.status !== 0) return;
      } catch (e) {
        console.log(`attempt ${i + 1} failed: ${e.message.split('\n')[0]}`);
      }
      await sleep(15000 * (i + 1));
    }
  };
  if (via === 'x') {
    const id = /status(?:es)?\/(\d+)/.exec(url)?.[1];
    if (!id) throw new Error('not a post URL');
    await attempt(
      `https://cdn.syndication.twimg.com/tweet-result?id=${id}&token=a`,
      'cdn.syndication.twimg.com',
    );
  } else {
    if (via === 'direct' || via === 'auto') {
      await attempt(url, new URL(url).host);
      const small = existsSync(tmp) ? readFileSync(tmp).length < 2500 : true;
      if (via === 'auto' && (r.status >= 400 || r.status === 0 || small))
        route = 'relay';
      else route = 'direct';
    }
    if (route === 'relay') {
      await attempt(RELAY + url, 'r.jina.ai');
      r.finalUrl = url;
    }
  }
  if (!existsSync(tmp)) throw new Error(`no response: ${url}`);
  const buf = readFileSync(tmp);
  rmSync(tmp);
  const isPdf =
    r.type.includes('pdf') || buf.subarray(0, 5).toString() === '%PDF-';
  let text;
  let raw;
  if (route === 'x') {
    raw = join(CACHE, `${key}.x.json`);
    writeFileSync(raw, buf);
    const j = JSON.parse(buf.toString('utf8'));
    const t = (j.note_tweet?.note_tweet_results?.result?.text ?? j.text ?? '')
      .replace(/https:\/\/t\.co\/\w+/g, '')
      .trim();
    text = `${j.user?.name} (@${j.user?.screen_name}), ${j.created_at}\n\n${decodeEntities(t)}\n`;
    if (j.quoted_tweet)
      text += `\n[quoted post by @${j.quoted_tweet.user?.screen_name}]\n${decodeEntities(j.quoted_tweet.text ?? '')}\n`;
  } else if (isPdf) {
    raw = join(CACHE, `${key}.pdf`);
    writeFileSync(raw, buf);
    try {
      execFileSync(
        'pdftotext',
        ['-enc', 'UTF-8', raw, join(CACHE, `${key}.txt`)],
        {
          stdio: 'ignore',
        },
      );
      text = readFileSync(join(CACHE, `${key}.txt`), 'utf8');
    } catch {
      console.log(`${key}: pdftotext failed`);
      text = '';
    }
  } else {
    let b = buf;
    if (b[0] === 0x1f && b[1] === 0x8b) b = gunzipSync(b);
    const s = b.toString('utf8');
    raw = join(CACHE, `${key}.${route === 'relay' ? 'md' : 'html'}`);
    writeFileSync(raw, b);
    text = route === 'relay' ? markdownToText(s) : htmlToText(s);
  }
  writeFileSync(join(CACHE, `${key}.txt`), text);
  const meta = {
    key,
    requestedUrl: url,
    route,
    finalUrl: r.finalUrl,
    httpStatus: r.status,
    contentType: r.type,
    bytes: buf.length,
    sha256: sha256(buf),
    textSha256: sha256(Buffer.from(text)),
    retrievedAt: new Date().toISOString(),
  };
  writeFileSync(join(CACHE, `${key}.json`), JSON.stringify(meta, null, 2));
  console.log(
    `${key}: ${route} HTTP ${r.status}, ${buf.length} bytes, text ${words(text)} words${r.status >= 400 ? '  ** FAILED **' : ''}`,
  );
  return meta;
}

// Normalisation for quote matching: Unicode compatibility forms, quotes, dashes,
// invisible characters, PDF line-break hyphenation, whitespace and case.
function normalise(text) {
  return text
    .normalize('NFKC')
    .replace(/[\u00ad\u200b-\u200f\u202a-\u202e\u2060-\u2064\ufeff]/g, '')
    .replace(/[\u2018\u2019\u201b\u2032`]/g, "'")
    .replace(/[\u201c\u201d\u201f\u2033]/g, '"')
    .replace(/[\u2013\u2014\u2212\u2011]/g, '-')
    .replace(/…/g, '...')
    .replace(/(\w)-\s*\n\s*(\w)/g, '$1$2')
    .replace(/\s+/g, ' ')
    .replace(/ ([,.;:)!?])/g, '$1')
    .trim()
    .toLowerCase();
}
function cachedText(key, cacheName = 'cached') {
  const p = join(CACHES[cacheName], `${key}.txt`);
  return existsSync(p) ? readFileSync(p, 'utf8') : null;
}
function cachedMeta(key, cacheName = 'cached') {
  const p = join(CACHES[cacheName], `${key}.json`);
  return existsSync(p) ? readJson(p) : null;
}
// Fragments separated by … must occur in order.
const fragments = (quote) =>
  quote
    .split(/\s*(?:…|\.\.\.)\s*/)
    .map(normalise)
    .filter(Boolean);
// A last fallback ignores spaces, for text runs that a page renderer glued together.
function quoteFound(quote, text) {
  const r = quoteFoundIn(quote, text);
  if (r === true) return true;
  const squash = (s) => normalise(s).replace(/ /g, '');
  const hay = squash(text);
  let from = 0;
  for (const frag of fragments(quote).map((f) => f.replace(/ /g, ''))) {
    const at = hay.indexOf(frag, from);
    if (at < 0) return r;
    from = at + frag.length;
  }
  return true;
}
function quoteFoundIn(quote, text) {
  const hays = [normalise(text), normalise(text.replace(/-\s*\n\s*/g, '-'))];
  let missing = null;
  for (const hay of hays) {
    let from = 0;
    missing = null;
    for (const frag of fragments(quote)) {
      const at = hay.indexOf(frag, from);
      if (at < 0) {
        missing = frag;
        break;
      }
      from = at + frag.length;
    }
    if (!missing) return true;
  }
  return missing;
}

// Approximate length: words in text blocks of ten or more words (navigation excluded).
function documentWords(key, cacheName = 'cached') {
  const t = cachedText(key, cacheName);
  if (t == null) return null;
  return t
    .split(/\n+/)
    .map((l) => words(l))
    .filter((n) => n >= 10)
    .reduce((a, b) => a + b, 0);
}
// Editorial policy (2026-10-15): under 2,000 words about 10%; otherwise 400 words or 5%,
// whichever is larger, never more than 800.
const maxQuoted = (len) =>
  len < 2000
    ? Math.floor(len / 10)
    : Math.min(800, Math.max(400, Math.floor(len * 0.05)));

function grep(key, pattern) {
  const t = cachedText(key, CLI_CACHE);
  if (t == null) return console.log('missing');
  const flat = t.replace(/\s+/g, ' ');
  const re = new RegExp(pattern, 'gi');
  let last = -Infinity;
  for (const m of flat.matchAll(re)) {
    if (m.index - last < 300) continue;
    last = m.index;
    console.log(
      `[${key} @${m.index}] …${flat.slice(Math.max(0, m.index - 250), m.index + 350)}…\n`,
    );
  }
}

// ---------------------------------------------------------------- records

const PREDICATES = {
  held_role: ['person', 'organisation'],
  co_founded: ['person', 'organisation'],
  departure_announced: ['person', 'organisation'],
  launched: ['person', 'organisation'],
  acquired: ['organisation', 'organisation'],
  unit_of: ['organisation', 'organisation'],
  combined_into: ['organisation', 'organisation'],
  formed_entity: ['organisation', 'organisation'],
  converted_into: ['organisation', 'organisation'],
  has_legal_form: ['organisation', 'literal'],
  holds_control_right: ['organisation', 'organisation'],
  name_transition_announced: ['organisation', 'organisation'],
  separation_announced: ['organisation', 'organisation'],
  founding_stated: ['organisation', 'literal'],
  // Document, commitment and capital predicates of the dataset (src/domain/predicates.ts).
  published: [['organisation', 'public_body', 'person'], 'document'],
  authored: ['person', 'document'],
  cites: ['document', 'document'],
  signed_commitment: ['organisation', 'document'],
  references_commitment: ['document', 'document'],
  states_provision: ['document', 'literal'],
  enacted: ['public_body', 'document'],
  supersedes_document: ['document', 'document'],
  investment_announced: [['organisation', 'person', 'fund'], 'organisation'],
  participated_in_round: [['organisation', 'person', 'fund'], 'organisation'],
};
const TOPICS = [
  'people',
  'institutions',
  'ideas',
  'governance',
  'capital',
  'compute',
];
const TIME_KINDS = ['event', 'snapshot', 'interval', 'unknown'];
const DATE = /^\d{4}(-\d{2}(-\d{2})?)?$/;
const KINDS = [
  'announcement',
  'paper',
  'report',
  'article',
  'filing',
  'post',
  'message',
  'book',
  'dataset',
];
const ROUTES = ['direct', 'relay', 'x'];
const BASES = [
  'publication',
  'announcement',
  'revision',
  'signature',
  'effective',
  'filing',
];
const VERSION_KINDS = [
  'arxiv',
  'git-commit',
  'hf-commit',
  'filing',
  'pdf',
  'mutable-page',
];
const ENTITY_TYPES = [
  'person',
  'organisation',
  'document',
  'public_body',
  'fund',
];
const hasCjk = (s) => /[\u3400-\u4dbf\u4e00-\u9fff]/.test(s ?? '');
// Words that name a motive, judgement or label rather than a documented event.
const LOADED =
  /\bpoach|\bdefect|\bexodus|\blured?\b|\braid|\btalent war|\bousted?\b|\bdoomers?\b|\baccelerationists?\b|\bEA\b|effective altruis|\brival|\bfled\b|\bsnubb|\bin protest\b|\bfrustrat|\bclash|\brift\b|\bfeud\b|\bpower struggle\b|\bcoup\b|\bstar\b|\bfirst\b|\bpioneer|\bcoined\b|\bstate[- ](?:backed|directed|controlled|run)\b|\bnational champion|\bregime\b|\bpropaganda\b|\bCCP\b|\bChinese AI\b|\bbreakthrough|\brevolutionar|\bgroundbreaking|\bstate[- ]of[- ]the[- ]art\b/i;
const REASON =
  /\bbecause\b|\bdue to\b|\bover concerns?\b|\bto focus on\b|\bin order to\b|\breason\b|\bcit(?:ed|ing)\b|\bamid\b|\bafter disagree/i;

function loadEntities(pack) {
  const ents = new Map();
  for (const e of readJson(join(ROOT, 'data', 'entities.json')))
    ents.set(e.id, { ...e, existing: true });
  for (const e of pack.entities ?? []) if (!e.existing) ents.set(e.id, e);
  return ents;
}

// Checks a pack or draft: entity references, record shape, quotes against the cache, limits.
function checkRecords(doc, { cacheName = 'cached', extraEntities = [] } = {}) {
  const problems = [];
  const results = {};
  const ents = loadEntities({
    entities: [...(doc.entities ?? []), ...extraEntities],
  });
  const existingClaims = new Set(
    readJson(join(ROOT, 'data', 'claims.json')).map((c) => c.id),
  );
  const sources = new Map((doc.sources ?? []).map((s) => [s.id, s]));
  const seenClaims = new Set();
  const seenEvidence = new Set();
  const quoted = new Map();
  for (const e of doc.entities ?? []) {
    if (e.existing) {
      if (!ents.get(e.id)?.sourceIds)
        problems.push(
          `entity ${e.id}: marked existing but not in data/entities.json`,
        );
      continue;
    }
    for (const f of ['id', 'type', 'name', 'description'])
      if (!e[f]) problems.push(`entity ${e.id}: missing ${f}`);
    if (!ENTITY_TYPES.includes(e.type))
      problems.push(`entity ${e.id}: type ${e.type}`);
    if (e.type === 'document' && !e.documentKind)
      problems.push(`entity ${e.id}: document needs documentKind`);
    if (e.type === 'person' && !e.sortName)
      problems.push(`entity ${e.id}: person needs sortName`);
  }
  for (const s of doc.sources ?? []) {
    for (const f of [
      'id',
      'cacheKey',
      'title',
      'publisher',
      'url',
      'kind',
      'route',
      'language',
      'sourceClass',
    ])
      if (!s[f]) problems.push(`source ${s.id}: missing ${f}`);
    if (s.kind && !KINDS.includes(s.kind))
      problems.push(`source ${s.id}: kind ${s.kind}`);
    if (!s.version || !VERSION_KINDS.includes(s.version.kind))
      problems.push(
        `source ${s.id}: version.kind must be one of ${VERSION_KINDS.join(', ')}`,
      );
    else if (s.version.kind !== 'mutable-page' && !s.version.id)
      problems.push(
        `source ${s.id}: fixed version needs version.id (arXiv vN, commit hash, filing reference)`,
      );
    if (s.language && !/^(en|zh-Hans|zh-Hant|ja|ko|fr|de)$/.test(s.language))
      problems.push(
        `source ${s.id}: language ${s.language} (use a BCP 47 tag such as zh-Hans)`,
      );
    if (s.language?.startsWith('zh') && !s.originalTitle)
      problems.push(`source ${s.id}: Chinese source needs originalTitle`);
    if (s.route && !ROUTES.includes(s.route))
      problems.push(`source ${s.id}: route ${s.route}`);
    if (!['primary', 'reporting', 'secondary'].includes(s.sourceClass))
      problems.push(`source ${s.id}: sourceClass ${s.sourceClass}`);
    if (
      /wikipedia|wikiwand|wikidata|britannica|crunchbase|linkedin\.com|grokipedia|baike\.baidu/i.test(
        s.url ?? '',
      )
    )
      problems.push(
        `source ${s.id}: tertiary or profile site not admissible as evidence`,
      );
    if (
      s.publicationDate !== null &&
      s.publicationDate !== undefined &&
      !DATE.test(s.publicationDate)
    )
      problems.push(`source ${s.id}: publicationDate ${s.publicationDate}`);
    if (!cachedMeta(s.cacheKey, cacheName))
      problems.push(`source ${s.id}: ${s.cacheKey} not in ${cacheName} cache`);
  }
  for (const c of doc.claims ?? []) {
    const where = `claim ${c.id}`;
    if (seenClaims.has(c.id) || existingClaims.has(c.id))
      problems.push(`${where}: duplicate id`);
    seenClaims.add(c.id);
    for (const f of [
      'id',
      'subject',
      'predicate',
      'object',
      'topic',
      'statement',
      'time',
      'qualification',
    ])
      if (!c[f]) problems.push(`${where}: missing ${f}`);
    const sig = PREDICATES[c.predicate];
    if (!sig) problems.push(`${where}: unknown predicate ${c.predicate}`);
    const subj = ents.get(c.subject);
    if (!subj) problems.push(`${where}: unknown subject ${c.subject}`);
    else if (
      sig &&
      ![sig[0]].flat().includes(subj.type) &&
      !([sig[0]].flat().includes('organisation') && subj.type === 'public_body')
    )
      problems.push(`${where}: subject type ${subj.type} for ${c.predicate}`);
    if (c.object?.kind === 'entity') {
      const obj = ents.get(c.object.entityId);
      if (!obj) problems.push(`${where}: unknown object ${c.object.entityId}`);
      else if (sig && ![sig[1]].flat().includes(obj.type))
        problems.push(`${where}: object type ${obj.type} for ${c.predicate}`);
    } else if (c.object?.kind === 'literal') {
      if (sig && sig[1] !== 'literal')
        problems.push(`${where}: literal object for ${c.predicate}`);
    } else problems.push(`${where}: bad object`);
    if (!TOPICS.includes(c.topic)) problems.push(`${where}: topic ${c.topic}`);
    const t = c.time ?? {};
    if (!TIME_KINDS.includes(t.kind))
      problems.push(`${where}: time kind ${t.kind}`);
    if (!t.note) problems.push(`${where}: time needs a note`);
    if (t.basis && !BASES.includes(t.basis))
      problems.push(`${where}: time basis ${t.basis}`);
    if (['event', 'snapshot'].includes(t.kind) && !DATE.test(t.date ?? ''))
      problems.push(`${where}: date ${t.date}`);
    if (t.kind === 'interval') {
      if (t.from && !DATE.test(t.from))
        problems.push(`${where}: from ${t.from}`);
      if (t.until && !DATE.test(t.until))
        problems.push(`${where}: until ${t.until}`);
      if (!t.from && !t.until)
        problems.push(`${where}: interval without bounds`);
    }
    if (
      c.predicate === 'departure_announced' &&
      (t.kind !== 'event' || !c.attributes?.role)
    )
      problems.push(`${where}: departure needs event date and role`);
    if (
      [
        'co_founded',
        'launched',
        'acquired',
        'founding_stated',
        'unit_disbanded',
      ].includes(c.predicate) &&
      !['event', 'unknown'].includes(t.kind)
    )
      problems.push(
        `${where}: founding/launch/acquisition needs event or unknown date`,
      );
    if (c.predicate === 'held_role' && !c.attributes?.role)
      problems.push(`${where}: held_role needs attributes.role`);
    if (!['explicit', 'inferred'].includes(c.derivation))
      problems.push(`${where}: derivation ${c.derivation}`);
    if (c.derivation === 'inferred' && !c.inferenceRationale)
      problems.push(`${where}: inferred without rationale`);
    if (!['supported', 'contested', 'unresolved'].includes(c.resolution))
      problems.push(`${where}: resolution ${c.resolution}`);
    const text = `${c.statement} ${c.attributes?.role ?? ''} ${c.qualification ?? ''} ${c.time?.note ?? ''}`;
    if (LOADED.test(text))
      problems.push(`${where}: loaded wording "${LOADED.exec(text)[0]}"`);
    if (REASON.test(c.statement) && !c.statedReason)
      problems.push(
        `${where}: statement gives a reason ("${REASON.exec(c.statement)[0]}") without statedReason`,
      );
    if (c.statedReason) {
      const sr = c.statedReason;
      if (!sr.by || !ents.get(sr.by))
        problems.push(`${where}: statedReason.by ${sr.by}`);
      if (
        !sr.evidenceId ||
        !(c.evidence ?? []).some((e) => e.id === sr.evidenceId)
      )
        problems.push(
          `${where}: statedReason.evidenceId not among the claim's evidence`,
        );
      if (!sr.text) problems.push(`${where}: statedReason needs text`);
    }
    for (const r of c.relatedExisting ?? [])
      if (!existingClaims.has(r))
        problems.push(`${where}: relatedExisting ${r} not in data/claims.json`);
    const ev = c.evidence ?? [];
    if (!ev.length) problems.push(`${where}: no evidence`);
    if (
      c.resolution === 'supported' &&
      !ev.some((e) => e.support === 'supports')
    )
      problems.push(`${where}: supported without supporting evidence`);
    if (
      c.resolution === 'contested' &&
      !ev.some((e) => e.support === 'contradicts')
    )
      problems.push(`${where}: contested without contradicting evidence`);
    for (const e of ev) {
      const w = `${where}/${e.id}`;
      if (seenEvidence.has(e.id)) problems.push(`${w}: duplicate evidence id`);
      seenEvidence.add(e.id);
      for (const f of [
        'id',
        'sourceId',
        'sourceRole',
        'support',
        'locator',
        'passageType',
        'passage',
      ])
        if (!e[f]) problems.push(`${w}: missing ${f}`);
      if (!['primary', 'secondary'].includes(e.sourceRole))
        problems.push(`${w}: sourceRole ${e.sourceRole}`);
      if (!['supports', 'contradicts', 'context'].includes(e.support))
        problems.push(`${w}: support ${e.support}`);
      const s = sources.get(e.sourceId);
      if (!s) {
        problems.push(`${w}: unknown source ${e.sourceId}`);
        continue;
      }
      if (s.sourceClass === 'reporting' && e.sourceRole === 'primary')
        problems.push(`${w}: reporting source used as primary`);
      if (hasCjk(e.passage) || hasCjk(e.anchor)) {
        const tr = e.translation;
        if (!tr?.text || tr.method !== 'machine' || tr.humanVerified !== false)
          problems.push(
            `${w}: Chinese passage needs translation {text, method: 'machine', humanVerified: false}`,
          );
      }
      if (e.passageType === 'paraphrase') {
        if (!e.anchor)
          problems.push(
            `${w}: paraphrase needs an anchor (a short verbatim fragment)`,
          );
      } else if (e.passageType !== 'quote')
        problems.push(`${w}: passageType ${e.passageType}`);
      const verbatim = e.passageType === 'quote' ? e.passage : e.anchor;
      if (!verbatim) continue;
      const n = words(verbatim);
      if (n > 50) problems.push(`${w}: quote has ${n} words (max 50)`);
      const q = quoted.get(s.id) ?? new Map();
      q.set(normalise(verbatim), n);
      quoted.set(s.id, q);
      let txt = cachedText(s.cacheKey, cacheName);
      // A challenge or error page from the publisher is a retrieval failure, not a mismatch.
      const blocked =
        txt != null &&
        cacheName !== 'cached' &&
        (/Just a moment|Enable JavaScript and cookies|requiring CAPTCHA/.test(
          txt,
        ) ||
          (words(txt) < 40 &&
            cachedMeta(s.cacheKey, cacheName)?.route !== 'x'));
      if (blocked) txt = null;
      const r = {
        words: n,
        source: s.id,
        kind: e.passageType === 'quote' ? 'quote' : 'anchor',
      };
      if (e.visualReading) r.visual = true;
      if (txt == null)
        r.match = blocked ? 'not retrieved (block page)' : 'not cached';
      else {
        const found = quoteFound(verbatim, txt);
        r.match = found === true ? 'match' : 'absent';
        if (found !== true)
          problems.push(
            `${w}: not found in ${s.cacheKey}: "${String(found).slice(0, 80)}"`,
          );
      }
      results[e.id] = r;
    }
  }
  const totals = {};
  for (const [sid, q] of quoted) {
    const s = sources.get(sid);
    const n = [...q.values()].reduce((a, b) => a + b, 0);
    const len = s.documentWords?.count ?? documentWords(s.cacheKey, cacheName);
    totals[sid] = {
      quoted: n,
      documentWords: len,
      limit: len ? maxQuoted(len) : null,
    };
    if (len && n > maxQuoted(len))
      problems.push(
        `source ${sid}: ${n} quoted words exceed limit ${maxQuoted(len)} (document ~${len} words)`,
      );
  }
  return { problems, results, totals };
}

function checkDraft(file) {
  const d = readJson(file);
  // Entities proposed in other drafts may be referenced.
  const others = existsSync(DRAFTS)
    ? readdirSync(DRAFTS)
        .filter((f) => f.endsWith('.json') && join(DRAFTS, f) !== file)
        .flatMap((f) => readJson(join(DRAFTS, f)).entities ?? [])
        .filter((e) => !e.existing)
    : [];
  const { problems, results, totals } = checkRecords(d, {
    extraEntities: others,
  });
  console.log(
    `${d.claims?.length ?? 0} claims, ${Object.keys(results).length} verbatim passages`,
  );
  for (const [sid, t] of Object.entries(totals))
    if (t.limit && t.quoted > t.limit * 0.8)
      console.log(`  near limit: ${sid} ${t.quoted}/${t.limit}`);
  console.log(problems.length ? problems.join('\n') : 'no problems');
  if (problems.length) process.exitCode = 1;
}

// Merges every draft into pack.json, keeping pack-level fields and sorting records.
function merge() {
  const pack = readJson(PACK);
  const files = readdirSync(DRAFTS)
    .filter((f) => f.endsWith('.json'))
    .sort();
  const byId = (arr) => new Map(arr.map((x) => [x.id, x]));
  const ents = byId([]);
  const srcs = byId([]);
  const claims = [];
  const events = byId([]);
  pack.searched = {};
  pack.existingUsed = {};
  for (const f of files) {
    const d = readJson(join(DRAFTS, f));
    pack.searched[d.group] = d.searched;
    pack.existingUsed[d.group] = d.existingUsed ?? [];
    for (const e of d.entities ?? []) {
      const prev = ents.get(e.id);
      if (
        prev &&
        !prev.existing &&
        !e.existing &&
        prev.description !== e.description
      )
        console.log(`entity ${e.id} proposed twice; kept the first (${f})`);
      if (!prev || (prev.existing && !e.existing)) ents.set(e.id, e);
    }
    for (const s of d.sources ?? []) {
      if (srcs.has(s.id) && srcs.get(s.id).url !== s.url)
        console.log(`source ${s.id} differs across drafts (${f})`);
      if (!srcs.has(s.id)) srcs.set(s.id, s);
    }
    for (const c of d.claims ?? []) claims.push({ ...c, group: d.group });
    for (const ev of d.events ?? [])
      if (!events.has(ev.id)) events.set(ev.id, ev);
  }
  for (const s of srcs.values()) {
    const m = cachedMeta(s.cacheKey);
    if (m) {
      s.retrieval = {
        route: m.route,
        httpStatus: m.httpStatus,
        retrievedAt: m.retrievedAt.slice(0, 10),
        sha256: m.sha256,
        textSha256: m.textSha256,
      };
      if (!s.documentWords)
        s.documentWords = {
          count: documentWords(s.cacheKey),
          basis:
            'Approximate: words in text blocks of ten or more words in the retrieved text layer (navigation and menus excluded).',
        };
    }
  }
  // Keep only entities that a merged claim references (drafts may list removed records' entities).
  const used = new Set(
    claims.flatMap((c) => [
      c.subject,
      c.object.kind === 'entity' ? c.object.entityId : null,
    ]),
  );
  for (const id of [...ents.keys()]) if (!used.has(id)) ents.delete(id);
  const date = (c) => c.time.date ?? c.time.from ?? c.time.until ?? '9999';
  pack.entities = [...ents.values()].sort((a, b) =>
    a.existing === b.existing ? a.id.localeCompare(b.id) : a.existing ? -1 : 1,
  );
  pack.sources = [...srcs.values()].sort((a, b) => a.id.localeCompare(b.id));
  pack.claims = claims.sort(
    (a, b) => date(a).localeCompare(date(b)) || a.id.localeCompare(b.id),
  );
  pack.events = [...events.values()].sort((a, b) =>
    a.date.localeCompare(b.date),
  );
  writeFileSync(PACK, JSON.stringify(pack, null, 1) + '\n');
  console.log(
    `${files.length} drafts: ${pack.entities.length} entities, ${pack.sources.length} sources, ${pack.claims.length} claims, ${pack.events.length} events`,
  );
}

// Distinct quoted words when the dataset's quotations from the same source are added.
function withDataset(pack) {
  const ev = readJson(join(ROOT, 'data', 'evidence.json'));
  const out = {};
  for (const s of pack.sources) {
    if (!s.datasetSourceId) continue;
    const dq = ev
      .filter(
        (e) => e.sourceId === s.datasetSourceId && e.passageType === 'quote',
      )
      .map((e) => normalise(e.passage));
    const pq = pack.claims
      .flatMap((c) => c.evidence)
      .filter((e) => e.sourceId === s.id)
      .map((e) => normalise(e.passageType === 'quote' ? e.passage : e.anchor));
    const all = new Map([...dq, ...pq].map((q) => [q, words(q)]));
    out[s.id] = {
      datasetSourceId: s.datasetSourceId,
      union: [...all.values()].reduce((a, b) => a + b, 0),
    };
  }
  return out;
}

function verify(cacheName = 'cached') {
  const pack = readJson(PACK);
  const { problems, results, totals } = checkRecords(pack, { cacheName });
  const hashChanges = [];
  for (const s of pack.sources) {
    const m = cachedMeta(s.cacheKey, cacheName);
    if (m && s.retrieval && m.textSha256 !== s.retrieval.textSha256)
      hashChanges.push({
        source: s.id,
        note: `text layer differs from the drafting retrieval (${s.retrieval.retrievedAt})`,
      });
  }
  const union = withDataset(pack);
  for (const [sid, u] of Object.entries(union)) {
    const t = totals[sid];
    if (t?.documentWords && u.union > maxQuoted(t.documentWords))
      problems.push(
        `source ${sid}: with dataset quotations ${u.union} words exceed limit if admitted`,
      );
  }
  const out = {
    checkedWith: `research/china-labs-2/tools.mjs verify${cacheName === 'fresh' ? ' fresh' : ''}`,
    cache: cacheName,
    checkedAt: new Date().toISOString().slice(0, 10),
    note: 'Each verbatim passage (a quote, or the anchor fragment of a paraphrase) is matched against the text layer of its source as retrieved (normalised for whitespace, case, quotation marks, dashes, Unicode compatibility forms, invisible characters and line-break hyphenation; … separates fragments that must occur in order). Quoted words per source are checked against the editorial-policy limits (50 words per quote; per document 400 words or 5%, whichever is larger, at most 800, or about 10% of a document under 2,000 words; each CJK character counts as one word).',
    claims: pack.claims.length,
    passages: Object.keys(results).length,
    matched: Object.values(results).filter((r) => r.match === 'match').length,
    visualReadings: Object.entries(results)
      .filter(([, r]) => r.visual)
      .map(([id]) => id),
    problems,
    textChangedSinceDrafting: hashChanges,
    quotedWordsPerSource: totals,
    quotedWordsWithDataset: union,
    passagesChecked: results,
  };
  if (cacheName === 'fresh') {
    const prev = existsSync(join(DIR, 'verification.json'))
      ? readJson(join(DIR, 'verification.json'))
      : {};
    prev.fresh = out;
    writeFileSync(
      join(DIR, 'verification.json'),
      JSON.stringify(prev, null, 1) + '\n',
    );
  } else {
    const prev = existsSync(join(DIR, 'verification.json'))
      ? readJson(join(DIR, 'verification.json'))
      : {};
    writeFileSync(
      join(DIR, 'verification.json'),
      JSON.stringify({ ...out, fresh: prev.fresh }, null, 1) + '\n',
    );
  }
  console.log(
    `${out.claims} claims, ${out.passages} passages, ${out.matched} matched (${cacheName}); ${hashChanges.length} text layers changed`,
  );
  if (problems.length) {
    console.log(problems.join('\n'));
    process.exitCode = 1;
  } else console.log('no problems');
}

async function refetch() {
  const pack = readJson(PACK);
  for (const s of pack.sources) {
    // The route that worked for the drafting retrieval.
    const route = cachedMeta(s.cacheKey)?.route ?? s.route ?? 'auto';
    try {
      await fetchDoc(s.cacheKey, s.url, route, 'fresh');
    } catch (e) {
      console.log(`${s.cacheKey}: ${e.message}`);
    }
  }
}

// Mulberry32: a reproducible sample from a recorded seed.
function sample(percent, seed) {
  const pack = readJson(PACK);
  let a = Number(seed) >>> 0;
  const rand = () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  const ids = pack.claims.map((c) => c.id);
  for (let i = ids.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [ids[i], ids[j]] = [ids[j], ids[i]];
  }
  const n = Math.ceil((ids.length * Number(percent)) / 100);
  console.log(JSON.stringify(ids.slice(0, n).sort()));
}

const [cmd, ...args] = process.argv.slice(2);
if (cmd === 'fetch')
  await fetchDoc(args[0], args[1], args[2] ?? 'auto', CLI_CACHE);
else if (cmd === 'text') {
  const t = cachedText(args[0], CLI_CACHE);
  console.log(
    t == null
      ? 'missing'
      : t.slice(
          Number(args[1] ?? 0),
          Number(args[1] ?? 0) + Number(args[2] ?? 20000),
        ),
  );
} else if (cmd === 'grep') grep(args[0], args[1]);
else if (cmd === 'words') console.log(documentWords(args[0]));
else if (cmd === 'meta')
  console.log(JSON.stringify(cachedMeta(args[0]), null, 2));
else if (cmd === 'check') checkDraft(args[0]);
else if (cmd === 'merge') merge();
else if (cmd === 'verify') verify(args[0] === 'fresh' ? 'fresh' : 'cached');
else if (cmd === 'refetch') await refetch();
else if (cmd === 'sample') sample(args[0], args[1]);
else if (cmd === 'render')
  (await import('./render.mjs')).render(readJson(PACK), DIR);
else if (cmd === 'crosscheck')
  (await import('./crosscheck.mjs')).crosscheck(readJson(PACK), DIR, args[0]);
else
  console.log(
    'commands: fetch <key> <url> [direct|relay|x|auto] | text <key> [from] [len] | grep <key> <re> | words <key> | meta <key> | check <draft> | merge | verify [fresh] | refetch | sample <pct> <seed> | render | crosscheck <date>',
  );
