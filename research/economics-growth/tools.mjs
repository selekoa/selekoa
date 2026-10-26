// Candidate pack tooling for research/economics-growth.
// Usage: node research/economics-growth/tools.mjs fetch <key> <url>
//        node research/economics-growth/tools.mjs verify | render | grep <key> <regex>
// Retrieval bodies stay in the ignored .local/economics-growth/ cache.
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import {
  existsSync,
  mkdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from 'node:fs';
import { dirname, join } from 'node:path';
import { gunzipSync } from 'node:zlib';
import { fileURLToPath } from 'node:url';

const DIR = dirname(fileURLToPath(import.meta.url));
const ROOT = join(DIR, '..', '..');
const CACHE = join(ROOT, '.local', 'economics-growth', 'doc');
const PACK = join(DIR, 'pack.json');
const UA = 'Mozilla/5.0 (compatible; selekoa-research; paced retrieval)';

const sha256 = (buf) => createHash('sha256').update(buf).digest('hex');
const readJson = (p) => JSON.parse(readFileSync(p, 'utf8'));
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// Retrieval uses curl: it honours the session's HTTPS proxy, which Node's fetch does not.
async function fetchDoc(key, url) {
  mkdirSync(CACHE, { recursive: true });
  const tmp = join(CACHE, `${key}.download`);
  let status = 0;
  let finalUrl = url;
  let type = '';
  for (let attempt = 0; attempt < 5; attempt++) {
    try {
      const out = execFileSync(
        'curl',
        [
          '-sS',
          '-L',
          '--compressed',
          '-m',
          '180',
          '-A',
          UA,
          '-o',
          tmp,
          '-w',
          '%{http_code}\t%{url_effective}\t%{content_type}',
          url,
        ],
        { encoding: 'utf8' },
      );
      [status, finalUrl, type] = out.split('\t');
      status = Number(status);
      if (status !== 429 && status < 500 && status !== 0) break;
    } catch (e) {
      console.log(`attempt ${attempt + 1} failed: ${e.message.split('\n')[0]}`);
    }
    await sleep(20000 * (attempt + 1));
  }
  if (!existsSync(tmp)) throw new Error(`no response: ${url}`);
  const buf = readFileSync(tmp);
  const isPdf =
    type.includes('pdf') || buf.subarray(0, 5).toString() === '%PDF-';
  const raw = join(CACHE, `${key}.${isPdf ? 'pdf' : 'html'}`);
  writeFileSync(raw, buf);
  rmSync(tmp);
  if (isPdf)
    try {
      execFileSync(
        'pdftotext',
        ['-enc', 'UTF-8', raw, join(CACHE, `${key}.txt`)],
        { stdio: 'ignore' },
      );
    } catch {
      console.log(`${key}: pdftotext failed (damaged or truncated PDF)`);
    }
  const capture = /web\.archive\.org\/web\/(\d{14})/.exec(finalUrl)?.[1];
  writeFileSync(
    join(CACHE, `${key}.json`),
    JSON.stringify(
      {
        key,
        requestedUrl: url,
        finalUrl,
        waybackCapture: capture ?? null,
        httpStatus: status,
        contentType: type,
        bytes: buf.length,
        sha256: sha256(buf),
        retrievedAt: new Date().toISOString(),
      },
      null,
      2,
    ),
  );
  console.log(
    `${key}: HTTP ${status}, ${buf.length} bytes, ${isPdf ? 'pdf' : 'html'}, capture ${capture ?? '-'}`,
  );
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
function htmlToText(html) {
  return html
    .replace(/<(script|style)[\s\S]*?<\/\1>/gi, ' ')
    .replace(/<br\s*\/?>|<\/(p|div|li|h\d|blockquote|tr)>/gi, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&#x([0-9a-f]+);/gi, (_, h) =>
      String.fromCodePoint(parseInt(h, 16)),
    )
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(Number(d)))
    .replace(/&([a-z]+);/gi, (m, n) => ENTITIES[n.toLowerCase()] ?? m);
}
// Normalisation for quote matching: Unicode compatibility forms (PDF ligatures),
// quotes, dashes, PDF line-break hyphenation and whitespace.
function normalise(text) {
  return text
    .normalize('NFKC')
    .replace(/[‘’‛′]/g, "'")
    .replace(/[“”‟″]/g, '"')
    .replace(/[–—−]/g, '-')
    .replace(/…/g, '...')
    .replace(/(\w)-\s*\n\s*(\w)/g, '$1$2') // soft hyphen at a PDF line break
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();
}
function cachedText(key) {
  const base = join(CACHE, key);
  if (existsSync(base + '.txt')) return readFileSync(base + '.txt', 'utf8');
  if (existsSync(base + '.html')) {
    // Wayback id_ captures can keep the original gzip transfer encoding.
    let buf = readFileSync(base + '.html');
    if (buf[0] === 0x1f && buf[1] === 0x8b) buf = gunzipSync(buf);
    return htmlToText(buf.toString('utf8'));
  }
  return null;
}
const words = (s) => s.trim().split(/\s+/).filter(Boolean).length;

function quoteFound(quote, text) {
  // A hyphen at a PDF line break may be soft or part of a compound: try both.
  const hays = [normalise(text), normalise(text.replace(/-\s*\n\s*/g, '-'))];
  const frags = quote
    .split(/\s*(?:…|\.\.\.)\s*/)
    .map(normalise)
    .filter(Boolean);
  let missing = frags[0];
  for (const hay of hays) {
    let from = 0;
    missing = null;
    for (const frag of frags) {
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

function verify() {
  const pack = readJson(PACK);
  const sources = new Map(pack.sources.map((s) => [s.id, s]));
  const quoted = new Map();
  const problems = [];
  const unchecked = [];
  const results = {};
  const ids = new Set();
  for (const prop of pack.propositions) {
    for (const p of prop.passages) {
      const where = `${prop.id}/${p.id}`;
      if (ids.has(p.id)) problems.push(`${where}: duplicate passage id`);
      ids.add(p.id);
      const src = sources.get(p.source);
      if (!src) {
        problems.push(`${where}: unknown source ${p.source}`);
        continue;
      }
      for (const f of ['relation', 'locator', 'quote', 'context', 'checkedAt'])
        if (!p[f]) problems.push(`${where}: missing ${f}`);
      if (!pack.relations[p.relation])
        problems.push(`${where}: unknown relation ${p.relation}`);
      if (p.relation === 'contests' && !pack.engagement[p.engagement])
        problems.push(`${where}: contesting passage needs engagement`);
      for (const r of p.roles ?? [])
        if (!pack.roles[r]) problems.push(`${where}: unknown role ${r}`);
      if (prop.kind === 'estimates' && p.estimate)
        for (const f of [
          'holder',
          'value',
          'horizon',
          'definition',
          'conditions',
        ])
          if (!p.estimate[f]) problems.push(`${where}: estimate needs ${f}`);
      const n = words(p.quote);
      if (n > 50) problems.push(`${where}: quote has ${n} words (max 50)`);
      const seen = quoted.get(src.id) ?? new Map();
      seen.set(normalise(p.quote), n);
      quoted.set(src.id, seen);
      const result = { words: n };
      // The checked expression is the first recorded key. When it is not cached (for example
      // when the Wayback Machine is unreachable), a current copy is matched instead and the
      // result says which key it was checked against.
      const currentKeys = (src.currentCopies ?? []).map((c) => c.key);
      for (const key of [...src.cacheKeys, ...currentKeys]) {
        const text = cachedText(key);
        if (text == null) {
          result[key] = 'not cached';
          continue;
        }
        const found = quoteFound(p.quote, text);
        result[key] = found === true ? 'match' : 'absent';
        if (found !== true && key === src.cacheKeys[0])
          problems.push(
            `${where}: fragment not found in ${key}: "${found.slice(0, 60)}"`,
          );
      }
      const checked = src.cacheKeys[0];
      if (result[checked] === 'match') result.checkedAgainst = checked;
      else if (result[checked] === 'not cached') {
        const hit = currentKeys.find((k) => result[k] === 'match');
        if (hit) result.checkedAgainst = hit;
        else
          unchecked.push(
            `${where}: checked expression ${checked} not cached and no current copy matches`,
          );
      }
      results[p.id] = result;
    }
  }
  for (const src of pack.sources)
    if (![1, 2].includes(src.tier?.value) || !src.tier.basis)
      problems.push(`${src.id}: tier 1 or 2 with a basis is required`);
  // Earliest located: per proposition, relation and tier, exactly one text holds the role
  // (tier 1: earliest-located; tier 2: earliest-located-tier-2), and no other text of that
  // tier with that relation has an earlier attested date (ISO strings compare in order).
  const tierOf = (p) => sources.get(p.source)?.tier?.value;
  for (const prop of pack.propositions) {
    for (const rel of ['articulates', 'contests'])
      for (const [tier, role] of [
        [1, 'earliest-located'],
        [2, 'earliest-located-tier-2'],
      ]) {
        const recs = prop.passages.filter((p) => p.relation === rel);
        for (const p of recs)
          if (p.roles?.includes(role) && tierOf(p) !== tier)
            problems.push(
              `${prop.id}/${p.id}: ${role} on a tier-${tierOf(p)} text`,
            );
        const inTier = recs.filter((p) => tierOf(p) === tier);
        if (!inTier.length) continue;
        const holders = new Set(
          inTier.filter((p) => p.roles?.includes(role)).map((p) => p.source),
        );
        if (holders.size !== 1) {
          problems.push(
            `${prop.id}: ${holders.size} texts hold ${role} for ${rel}`,
          );
          continue;
        }
        const holder = sources.get([...holders][0]);
        for (const p of inTier) {
          const other = sources.get(p.source);
          if (other.attested.value < holder.attested.value)
            problems.push(
              `${prop.id}: ${other.id} (${other.attested.value}) is attested before ${role} ${holder.id} (${holder.attested.value})`,
            );
        }
      }
    // Estimate collections: every articulating text gives at least one estimate.
    if (prop.kind === 'estimates')
      for (const id of new Set(
        prop.passages
          .filter((p) => p.relation === 'articulates')
          .map((p) => `${p.source}|${p.speaker ?? ''}`),
      ))
        if (
          !prop.passages.some(
            (p) => `${p.source}|${p.speaker ?? ''}` === id && p.estimate,
          )
        )
          problems.push(`${prop.id}: ${id} has no estimate record`);
    for (const p of prop.passages)
      if (p.relation === 'bears-on' && p.roles?.includes('earliest-located'))
        problems.push(`${prop.id}/${p.id}: earliest-located on bears-on`);
  }
  for (const [id, seen] of quoted) {
    const n = [...seen.values()].reduce((a, b) => a + b, 0);
    const src = sources.get(id);
    const cap =
      src.documentWords && src.documentWords.count < 2000
        ? Math.floor(src.documentWords.count * 0.1)
        : 400;
    if (n > cap) problems.push(`${id}: ${n} quoted words exceed cap ${cap}`);
  }
  writeFileSync(
    join(DIR, 'verification.json'),
    JSON.stringify(
      {
        checkedWith: 'research/economics-growth/tools.mjs verify',
        note: 'Each passage is matched against every cached expression of its source and its current copies; the first listed expression is the checked one, and checkedAgainst names the key actually matched. A current copy byte-identical to a recorded capture is cached under the recorded key. "absent" in a later key records a wording difference between versions; "not cached" means the expression could not be retrieved in this run.',
        problems,
        unchecked,
        passages: results,
      },
      null,
      1,
    ) + '\n',
  );
  console.log(
    `${pack.propositions.length} propositions, ${ids.size} passages, ${pack.sources.length} sources`,
  );
  if (unchecked.length)
    console.log(
      `not re-checked (no cached expression):\n${unchecked.join('\n')}`,
    );
  if (problems.length) {
    console.log(problems.join('\n'));
    process.exitCode = 1;
  } else
    console.log(
      'all cached quotes match their checked expressions or a current copy; caps and roles kept',
    );
}

function docWords(key) {
  const t = cachedText(key);
  console.log(`${key}: ${t ? words(t) : 'missing'} words`);
}

function grep(key, pattern) {
  const t = cachedText(key);
  if (!t) return console.log('missing');
  const flat = t.replace(/\s+/g, ' ');
  const re = new RegExp(pattern, 'gi');
  let last = -Infinity;
  for (const m of flat.matchAll(re)) {
    if (m.index - last < 500) continue;
    last = m.index;
    console.log(
      `@${m.index}: …${flat.slice(Math.max(0, m.index - 250), m.index + 350)}…\n`,
    );
  }
}

const fmtDate = (d) =>
  d ? `${d.value}${d.precision ? ` (${d.precision})` : ''}` : 'unknown';

function render() {
  const pack = readJson(PACK);
  const sources = new Map(pack.sources.map((s) => [s.id, s]));
  const out = [
    `# ${pack.title}`,
    '',
    `${pack.status} Prepared ${pack.prepared}. Scope: [scope.md](scope.md). Audit: [audit.md](audit.md). Generated from \`pack.json\` by \`tools.mjs render\`; do not edit by hand.`,
    '',
    '## Propositions',
    '',
  ];
  for (const prop of pack.propositions) {
    out.push(
      `### ${prop.id}. ${prop.label}${prop.kind === 'estimates' ? ' (estimate records)' : ''}`,
      '',
      `**Criterion:** ${prop.criterion}`,
      '',
    );
    if (prop.searchNote) out.push(`_Search note:_ ${prop.searchNote}`, '');
    for (const p of prop.passages) {
      const s = sources.get(p.source);
      const roles = p.roles?.length ? ` · ${p.roles.join(', ')}` : '';
      const tier = ` · tier ${s.tier.value}`;
      const eng = p.engagement ? ` · ${p.engagement}` : '';
      const ctx = p.contextOnly ? ' · context-only' : '';
      out.push(
        `- **${p.id}** · ${p.relation}${eng}${roles}${ctx}${tier} · ${s.shortCite}${p.formerly ? ` (formerly ${p.formerly})` : ''}`,
        `  - Dated ${fmtDate(s.date)} · wording attested ${s.attested.value}${s.claimed ? ` · claimed ${s.claimed.value}` : ''}${p.speaker ? ` · speaker: ${p.speaker}` : ''}`,
        `  - Locator: ${p.locator}`,
        `  - > ${p.quote}`,
        `  - Context: ${p.context}`,
      );
      if (p.estimate) {
        const e = p.estimate;
        out.push(
          `  - Estimate: ${e.holder}: ${e.value}. Horizon: ${e.horizon}. Definition: ${e.definition}. ${e.conditional ? 'Conditional' : 'Unconditional'}: ${e.conditions}`,
        );
      }
      if (p.conditions) out.push(`  - Conditions: ${p.conditions}`);
      if (p.engagementRationale)
        out.push(`  - Engagement: ${p.engagementRationale}`);
      if (p.missing) out.push(`  - Missing element: ${p.missing}`);
      if (p.contextOnly) out.push(`  - Context-only: ${p.contextOnly.reason}`);
      if (p.qualification) out.push(`  - Qualification: ${p.qualification}`);
    }
    out.push('');
  }
  out.push('## Sources', '');
  for (const s of pack.sources) {
    out.push(
      `### ${s.id}`,
      '',
      `${s.authors.join(', ')}, ${s.title}. ${s.venue}.`,
      '',
      `- Tier ${s.tier.value}. ${s.tier.basis}`,
      `- Published version: ${s.publishedVersion.apa} ${s.publishedVersion.note}`,
      `- Date: ${fmtDate(s.date)}. ${s.date.basis}`,
      `- Wording attested: ${s.attested.value}. ${s.attested.basis}`,
      ...(s.claimed
        ? [`- Claimed: ${s.claimed.value}. ${s.claimed.basis}`]
        : []),
      `- Checked expression: ${s.checkedExpression}`,
    );
    if (s.notes) out.push(`- Note: ${s.notes}`);
    if (s.versions?.length)
      out.push(
        `- Versions: ${s.versions.map((v) => `${v.version}, ${v.date} (${v.status})`).join('; ')}`,
      );
    if (s.otherVersions?.length)
      out.push(`- Other versions: ${s.otherVersions.join('; ')}`);
    for (const r of s.retrieval ?? [])
      out.push(
        `- Retrieved ${r.retrievedAt} via ${r.via}: ${r.url} (HTTP ${r.httpStatus}${r.waybackCapture ? `, capture ${r.waybackCapture}` : ''}, sha256 ${r.sha256.slice(0, 16)}…)`,
      );
    for (const c of s.currentCopies ?? [])
      out.push(
        `- Current copy ${c.retrievedAt}: ${c.url} (HTTP ${c.httpStatus}, sha256 ${c.sha256.slice(0, 16)}…${c.identicalTo ? `, byte-identical to ${c.identicalTo}` : ', differs from the recorded capture'})`,
      );
    if (s.documentWords)
      out.push(
        `- Length: about ${s.documentWords.count} words (${s.documentWords.method})`,
      );
    out.push('');
  }
  if (pack.retrievalFailures?.length) {
    out.push('## Retrieval failures and substitutions', '');
    for (const f of pack.retrievalFailures) out.push(`- ${f}`);
    out.push('');
  }
  writeFileSync(join(DIR, 'pack.md'), out.join('\n'));
  console.log('pack.md written');
}

const [cmd, ...args] = process.argv.slice(2);
if (cmd === 'fetch') await fetchDoc(args[0], args[1]);
else if (cmd === 'verify') verify();
else if (cmd === 'render') render();
else if (cmd === 'grep') grep(args[0], args[1]);
else if (cmd === 'words') docWords(args[0]);
else if (cmd === 'meta')
  console.log(readFileSync(join(CACHE, `${args[0]}.json`), 'utf8'));
else
  console.log(
    'commands: fetch <key> <url> | verify | render | grep <key> <re> | words <key> | meta <key>',
  );
