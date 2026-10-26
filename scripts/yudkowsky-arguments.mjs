#!/usr/bin/env node
// Research thread "Yudkowsky's argument history": retrieval cache and pack validation.
// Retrieval bodies stay in .local/yudkowsky-arguments (ignored); only metadata and short quotes are tracked.
//
//   node scripts/yudkowsky-arguments.mjs lw-index            all LessWrong posts by the author, with bodies
//   node scripts/yudkowsky-arguments.mjs lw-version <postId> posting-day (1.0.0) content of one post
//   node scripts/yudkowsky-arguments.mjs fetch <url> <key>   any other document (PDF bodies also go through pdftotext)
//   node scripts/yudkowsky-arguments.mjs grep <regex> [--venue lw|doc]   search the cache
//   node scripts/yudkowsky-arguments.mjs build <fragment…>   merge passage-finding fragments into pack.json
//   node scripts/yudkowsky-arguments.mjs verify              check every passage in pack.json against the cache
//   node scripts/yudkowsky-arguments.mjs render              write pack.md from pack.json

import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import {
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  writeFileSync,
} from 'node:fs';
import { join } from 'node:path';
import { format, resolveConfig } from 'prettier';

const ROOT = new URL('..', import.meta.url).pathname.replace(
  /^\/([A-Za-z]:)/,
  '$1',
);
const CACHE = join(ROOT, '.local', 'yudkowsky-arguments');
const DIR = join(ROOT, 'research', 'yudkowsky-arguments');
const PACK = join(DIR, 'pack.json');
const LW = 'https://www.lesswrong.com/graphql';
const AUTHOR_ID = 'nmk3nLpQE89dMRzzN'; // LessWrong user eliezer_yudkowsky
const UA = 'selekoa-research/0.1 (private research; paced requests)';
const PACE_MS = { lw: 4000, web: 3500, archive: 8000 };

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const sha256 = (buf) => createHash('sha256').update(buf).digest('hex');
const ensure = (d) => (mkdirSync(d, { recursive: true }), d);
const readJson = (p) => JSON.parse(readFileSync(p, 'utf8'));
const writeJson = (p, v) => writeFileSync(p, JSON.stringify(v, null, 2) + '\n');
// Tracked outputs are formatted like the rest of the repository so format:check stays clean.
async function writeTracked(p, text) {
  writeFileSync(
    p,
    await format(text, { ...(await resolveConfig(p)), filepath: p }),
  );
}

async function lwQuery(query) {
  for (let attempt = 0; attempt < 4; attempt++) {
    const res = await fetch(LW, {
      method: 'POST',
      headers: { 'content-type': 'application/json', 'user-agent': UA },
      body: JSON.stringify({ query }),
    });
    if (res.status === 429 || res.status >= 500) {
      await sleep(20000 * (attempt + 1));
      continue;
    }
    const json = await res.json();
    if (json.errors) throw new Error(JSON.stringify(json.errors).slice(0, 500));
    return json.data;
  }
  throw new Error('LessWrong GraphQL kept failing');
}

async function lwIndex() {
  const dir = ensure(join(CACHE, 'lw'));
  const fields = `_id title slug postedAt pageUrl af isEvent question
    user { slug } coauthorStatuses { userId } contents { version editedAt wordCount } htmlBody`;
  const pageSize = 50;
  const index = [];
  for (let offset = 0; ; offset += pageSize) {
    const data =
      await lwQuery(`{ posts(input:{terms:{view:"userPosts", userId:"${AUTHOR_ID}",
      limit:${pageSize}, offset:${offset}, sortedBy:"old"}}) { results { ${fields} } } }`);
    const results = data.posts.results;
    for (const p of results) {
      const body = p.htmlBody ?? '';
      const meta = {
        ...p,
        htmlBody: undefined,
        bodySha256: sha256(body),
        retrievedAt: new Date().toISOString(),
      };
      writeFileSync(join(dir, `${p._id}.html`), body);
      writeJson(join(dir, `${p._id}.json`), meta);
      index.push(meta);
    }
    console.log(`offset ${offset}: ${results.length} posts`);
    if (results.length < pageSize) break;
    await sleep(PACE_MS.lw);
  }
  writeJson(join(dir, '_index.json'), index);
  console.log(`indexed ${index.length} posts`);
}

async function lwVersion(id) {
  const dir = ensure(join(CACHE, 'lw-v1'));
  const data =
    await lwQuery(`{ post(input:{selector:{_id:"${id}"}}) { result { _id title postedAt
    contents { version editedAt } first: contents(version:"1.0.0") { version editedAt html } } } }`);
  const r = data.post.result;
  const html = r.first?.html ?? '';
  writeFileSync(join(dir, `${id}.html`), html);
  writeJson(join(dir, `${id}.json`), {
    _id: r._id,
    title: r.title,
    postedAt: r.postedAt,
    current: r.contents,
    first: { version: r.first?.version, editedAt: r.first?.editedAt },
    bodySha256: sha256(html),
    retrievedAt: new Date().toISOString(),
  });
  console.log(
    `${id}: current ${r.contents?.version}, first ${r.first?.version ?? 'unavailable'} (${html.length} chars)`,
  );
}

async function fetchDoc(url, key) {
  const dir = ensure(join(CACHE, 'doc'));
  const res = await fetch(url, {
    headers: { 'user-agent': UA },
    redirect: 'follow',
  });
  const buf = Buffer.from(await res.arrayBuffer());
  const type = res.headers.get('content-type') ?? '';
  const isPdf =
    type.includes('pdf') || buf.subarray(0, 5).toString() === '%PDF-';
  const raw = join(dir, `${key}.${isPdf ? 'pdf' : 'html'}`);
  writeFileSync(raw, buf);
  if (isPdf)
    execFileSync('pdftotext', ['-enc', 'UTF-8', raw, join(dir, `${key}.txt`)]);
  writeJson(join(dir, `${key}.json`), {
    key,
    requestedUrl: url,
    finalUrl: res.url,
    httpStatus: res.status,
    contentType: type,
    bytes: buf.length,
    sha256: sha256(buf),
    retrievedAt: new Date().toISOString(),
  });
  console.log(
    `${key}: HTTP ${res.status}, ${buf.length} bytes, ${isPdf ? 'pdf' : 'html'}`,
  );
}

// Hypermail mailing-list archives. Every message listed under the author in each folder's
// author index is retrieved in full; the index lines supply subject and sent date.
const ARCHIVES = {
  sl4: {
    base: 'http://sl4.org/archive/',
    venue: 'SL4 mailing list',
    folders: (html) =>
      [...html.matchAll(/href="(\d{4})\/date\.html"/g)].map((m) => m[1]),
  },
  ext: {
    base: 'http://extropians.weidai.com/',
    venue: 'Extropians mailing list',
    folders: (html) =>
      [...html.matchAll(/href="(extropians[^"/]*)\/"/g)].map((m) => m[1]),
  },
};
const PACE_LIST_MS = 3000;

async function getText(url) {
  for (let attempt = 0; attempt < 4; attempt++) {
    const res = await fetch(url, { headers: { 'user-agent': UA } });
    if (res.status === 429 || res.status >= 500) {
      await sleep(30000 * (attempt + 1));
      continue;
    }
    const buf = Buffer.from(await res.arrayBuffer());
    return { status: res.status, buf, text: buf.toString('latin1') };
  }
  throw new Error(`kept failing: ${url}`);
}

function authorEntries(html) {
  const entries = [];
  let author = null;
  for (const line of html.split('\n')) {
    const name = /<(?:strong|b)>([^<]+)<\/(?:strong|b)>/i.exec(line);
    if (name && /<li>/i.test(line)) author = name[1].trim();
    // Three Hypermail layouts: date after the link in <em>/<i>, or before it in <t>.
    const after =
      /<a href="(\d+)\.html">([^<]*)<\/a>.*?<(?:em|i)>\(?([^<)]+)\)?<\/(?:em|i)>/i.exec(
        line,
      );
    const before = /<t>([^<]+)<\/t>\s*<a href="(\d+)\.html">([^<]*)<\/a>/i.exec(
      line,
    );
    const msg = after
      ? [after[1], after[2], after[3]]
      : before
        ? [before[2], before[3], before[1]]
        : null;
    if (msg && author && /yudkowsky/i.test(author))
      entries.push({
        n: msg[0],
        subject: htmlToText(msg[1]).trim(),
        sent: msg[2].trim(),
        author,
      });
  }
  return entries;
}

async function archiveIndex(name) {
  const a = ARCHIVES[name];
  const dir = ensure(join(CACHE, name));
  const top = [...new Set(a.folders((await getText(a.base)).text))].sort();
  // A folder may itself hold monthly subfolders (the later Extropians archive does).
  const folders = [];
  for (const folder of top) {
    await sleep(PACE_LIST_MS);
    const listing = (await getText(`${a.base}${folder}/`)).text;
    const nested = [
      ...new Set(
        [...listing.matchAll(/href="(\d{4})\/author\.html"/gi)].map(
          (m) => m[1],
        ),
      ),
    ];
    folders.push(
      ...(nested.length ? nested.map((n) => `${folder}/${n}`) : [folder]),
    );
  }
  const index = [];
  for (const folder of folders) {
    await sleep(PACE_LIST_MS);
    const { status, text } = await getText(`${a.base}${folder}/author.html`);
    const found = status === 200 ? authorEntries(text) : [];
    for (const e of found)
      index.push({
        key: `${folder.replace('/', '_')}-${e.n}`,
        url: `${a.base}${folder}/${e.n}.html`,
        folder,
        ...e,
      });
    console.log(
      `${folder}: HTTP ${status}, ${found.length} messages by the author`,
    );
  }
  writeJson(join(dir, '_index.json'), {
    archive: a.base,
    folders,
    retrievedAt: new Date().toISOString(),
    messages: index,
  });
  console.log(`${index.length} messages in ${folders.length} folders`);
}

async function archiveFetch(name) {
  const dir = join(CACHE, name);
  const index = readJson(join(dir, '_index.json'));
  const logPath = join(dir, '_retrievals.json');
  const log = existsSync(logPath) ? readJson(logPath) : {};
  let done = 0;
  for (const m of index.messages) {
    if (log[m.key]?.status === 200) continue;
    const { status, buf } = await getText(m.url);
    writeFileSync(join(dir, `${m.key}.html`), buf);
    log[m.key] = {
      status,
      sha256: sha256(buf),
      retrievedAt: new Date().toISOString(),
    };
    if (++done % 50 === 0) {
      writeJson(logPath, log);
      console.log(
        `${done} fetched (${Object.keys(log).length}/${index.messages.length})`,
      );
    }
    await sleep(PACE_LIST_MS);
  }
  writeJson(logPath, log);
  const failed = Object.entries(log).filter(([, r]) => r.status !== 200);
  console.log(
    `done: ${Object.keys(log).length} retrieved, ${failed.length} not HTTP 200`,
  );
}

// Text normalisation shared by search and quote verification.
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
function normalise(text) {
  return text
    .normalize('NFKC')
    .replace(/[‘’‛′]/g, "'")
    .replace(/[“”‟″]/g, '"')
    .replace(/[–—−]/g, '-')
    .replace(/…/g, '...')
    .replace(/-\s*\n\s*/g, '-') // PDF line-break hyphenation of compounds
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();
}
function cachedText(ref) {
  // ref: { cache: "lw" | "lw-v1" | "doc" | "sl4" | "ext", key }
  const base = join(CACHE, ref.cache, ref.key);
  if (existsSync(base + '.txt')) return readFileSync(base + '.txt', 'utf8');
  if (!existsSync(base + '.html')) return null;
  const text = htmlToText(readFileSync(base + '.html', 'utf8'));
  // Mailing-list messages: keep only the author's own lines, never quoted (">") text.
  const message =
    ref.cache === 'sl4' || ref.cache === 'ext' || /^(ext|sl4)-/.test(ref.key);
  return message
    ? text
        .split('\n')
        .filter((l) => !/^\s*>/.test(l))
        .join('\n')
    : text;
}
const words = (s) => s.trim().split(/\s+/).filter(Boolean).length;

function grep(pattern, venue) {
  const re = new RegExp(pattern, 'i');
  const dirs = venue ? [venue] : ['lw', 'doc', 'sl4', 'ext'];
  for (const d of dirs) {
    const dir = join(CACHE, d);
    if (!existsSync(dir)) continue;
    for (const f of readdirSync(dir).filter(
      (f) => /\.(html|txt)$/.test(f) && !f.startsWith('_'),
    )) {
      const key = f.replace(/\.(html|txt)$/, '');
      if (f.endsWith('.html') && existsSync(join(dir, key + '.txt'))) continue;
      const text = cachedText({ cache: d, key }).replace(/\s+/g, ' ');
      const m = re.exec(text);
      if (!m) continue;
      const meta = existsSync(join(dir, key + '.json'))
        ? readJson(join(dir, key + '.json'))
        : {};
      const at = Math.max(0, m.index - 160);
      console.log(
        `\n[${d}/${key}] ${meta.postedAt?.slice(0, 10) ?? ''} ${meta.title ?? meta.requestedUrl ?? ''}`,
      );
      console.log('  …' + text.slice(at, m.index + m[0].length + 200) + '…');
    }
  }
}

// Documents outside LessWrong: bibliographic records written from the retrieved expressions.
const DOCS = {
  aipnf: {
    title:
      'Artificial Intelligence as a Positive and Negative Factor in Global Risk',
    venue:
      'Global Catastrophic Risks, ed. Bostrom and Ćirković (Oxford University Press), MIRI reprint',
    date: {
      value: '2008',
      precision: 'year',
      basis:
        'Reprint citation line: 2008 book chapter, "This version contains minor changes"; a draft circulated in 2006. Reprint wording is not authenticated for the 2008 print.',
    },
  },
  cfai: {
    title:
      'Creating Friendly AI 1.0: The Analysis and Design of Benevolent Goal Architectures',
    venue: 'Singularity Institute, MIRI reprint',
    date: {
      value: '2001-06-15',
      precision: 'day (version 1.0 release)',
      basis:
        'Release date from the reprint; an open-commentary version was announced on SL4 on 2001-04-18, so some wording may be earlier than this date. Reprint wording is not authenticated for 2001 unless a capture was compared.',
    },
  },
  cev: {
    title: 'Coherent Extrapolated Volition',
    venue: 'Singularity Institute, MIRI reprint',
    date: {
      value: '2004-05',
      precision: 'month',
      basis:
        'Text states "The information is current as of May 2004"; reprint citation gives 2004.',
    },
  },
  iem: {
    title: 'Intelligence Explosion Microeconomics',
    venue: 'MIRI Technical Report 2013-1',
    date: {
      value: '2013-09-13',
      precision: 'day (last modified)',
      basis:
        'Report states "Last modified September 13, 2013"; first released April 2013.',
    },
  },
  corrigibility: {
    title: 'Corrigibility',
    authors: [
      'Nate Soares',
      'Benja Fallenstein',
      'Eliezer Yudkowsky',
      'Stuart Armstrong',
    ],
    venue: 'AAAI-15 Workshop on AI and Ethics',
    date: {
      value: '2015-01-25',
      precision: 'day (workshop 25–26 January 2015)',
      basis: 'PDF header.',
    },
  },
  'time-2023': {
    title: "Pausing AI Developments Isn't Enough. We Need to Shut it All Down",
    venue: 'TIME',
    date: {
      value: '2023-03-29',
      precision: 'day',
      basis:
        'Page metadata datePublished 2023-03-29T22:01:58Z. The page title currently reads "The Only Way to Deal With the Threat From AI? Shut It Down"; the headline is the one crossposted to LessWrong on 2023-04-08.',
    },
  },
  aibox: {
    title: 'The AI-Box Experiment',
    venue: 'yudkowsky.net',
    date: {
      value: '2002',
      precision: 'year (stated copyright)',
      basis:
        'Page states "This document is ©2002"; the current page is a 2020 re-hosting (posted September 4, 2020, updated July 2, 2021) and carries a CC BY-ND 3.0 licence and a MIRI footer, so it was revised after 2002. The 2002 wording was not compared.',
    },
  },
  'ext-1996-5142': {
    title: 'Re: Goal-based AI',
    venue: 'Extropians mailing list',
    date: {
      value: '1996-12-31',
      precision: 'day',
      basis: 'Sent header: Tue, 31 Dec 1996 10:40:10 -0600.',
    },
  },
  'ext-1996-5159': {
    title: 'Re: Goal-based AI',
    venue: 'Extropians mailing list',
    date: {
      value: '1996-12-31',
      precision: 'day',
      basis: 'Sent header: Tue, 31 Dec 1996 14:50:37 -0600.',
    },
  },
  'ext-2000-5971': {
    title: 'Extropians message 3Q00/5971',
    venue: 'Extropians mailing list',
    date: {
      value: '2000-09-28',
      precision: 'day',
      basis: 'Archive header: Thu Sep 28 2000 - 09:45:16 MDT.',
    },
  },
  'sl4-2002-3132': {
    title: 'The "AI Box" experiment',
    venue: 'SL4 mailing list',
    date: {
      value: '2002-03-08',
      precision: 'day',
      basis: 'Archive header: Fri Mar 08 2002 - 05:13:21 MST.',
    },
  },
  'sits-2000-capture': {
    title: 'Staring into the Singularity 1.2.1',
    venue: 'sysopmind.com (Wayback capture 2000-12-04)',
    date: {
      value: '2000-08-31',
      precision: 'day (expression updated); created 1996-11-18 per the page',
      basis:
        'Page states Created 11/18/1996 and the captured version is 1.2.1; 1996 wording is not captured.',
    },
  },
  'arbital-orthogonality': {
    title: 'Orthogonality Thesis',
    venue: 'Arbital (GreaterWrong viewer)',
    date: {
      value: '2015-03-10',
      precision: 'day (as displayed)',
      basis:
        'Viewer shows "10 Mar 2015", probably the creation date; the body uses later terminology ("AGI alignment"), so the cached wording may be a later revision. Comments on the page are by others.',
    },
  },
  'arbital-instrumental-convergence': {
    title: 'Instrumental convergence',
    venue: 'Arbital (GreaterWrong viewer)',
    date: {
      value: '2015-07-16',
      precision: 'day (as displayed)',
      basis:
        'Viewer shows "16 Jul 2015", probably the creation date; the body says "As of 2016" and uses later terminology, so at least part of the cached wording postdates 2015.',
    },
  },
  'arbital-programmer-deception': {
    title: 'Programmer deception',
    venue: 'Arbital (GreaterWrong viewer)',
    date: {
      value: '2015-07-16',
      precision: 'day (as displayed)',
      basis: 'Viewer shows "16 Jul 2015"; creation or last edit not stated.',
    },
  },
};

const MONTHS = {
  Jan: 1,
  Feb: 2,
  Mar: 3,
  Apr: 4,
  May: 5,
  Jun: 6,
  Jul: 7,
  Aug: 8,
  Sep: 9,
  Oct: 10,
  Nov: 11,
  Dec: 12,
};
// Hypermail index dates: "Sat Mar 23 2002 - 10:09:49 MST", "Sat, 30 Nov 1996 17:49:47 -0600" or "1999-03-26".
function hypermailDate(sent) {
  const iso = /^(\d{4})-(\d{2})-(\d{2})/.exec(sent);
  if (iso) return iso.slice(1).join('-');
  const m =
    /(\d{1,2}) (\w{3}) (\d{4})/.exec(sent) ??
    /(\w{3}) (\d{1,2}) (\d{4})/.exec(sent);
  if (!m) return null;
  const [day, mon] = MONTHS[m[1]] ? [m[2], m[1]] : [m[1], m[2]];
  return `${m[3]}-${String(MONTHS[mon]).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

// Words of a message body, quoted lines included: drops Hypermail headers and navigation, CSS, address lines and
// everything after a "-- " signature separator (until the trailing navigation).
const NAV =
  /^\s*(From:|Date:|Next message|Previous message|In reply to|Maybe in reply to|Next in thread|Reply:|Messages sorted by|\[ |This archive was generated|: \w{3} \w{3} \d)/;
function messageWords(text, subject) {
  let inSignature = false;
  const kept = [];
  for (const line of text.split('\n')) {
    const l = line.trim();
    if (!l) continue;
    if (l === '--') inSignature = true;
    if (NAV.test(l)) {
      inSignature = false;
      continue;
    }
    if (inSignature || l.includes('@') || /[{}]/.test(l)) continue;
    if (l === subject || l.endsWith(`: ${subject}`)) continue;
    if (/^\w{3},? \d{1,2} \w{3} \d{4}|^\w{3} \w{3} \d{1,2} \d{4}/.test(l))
      continue;
    kept.push(l);
  }
  return words(kept.join(' '));
}

function archiveSource(kind, key) {
  const index = readJson(join(CACHE, kind, '_index.json'));
  const m = index.messages.find((x) => x.key === key);
  if (!m) throw new Error(`no ${kind} index entry for ${key}`);
  const log = readJson(join(CACHE, kind, '_retrievals.json'))[key];
  const html = readFileSync(join(CACHE, kind, `${key}.html`), 'latin1');
  // Some index layouts lose the subject; the message page's own title carries it.
  const title = /[A-Za-z0-9]/.test(m.subject)
    ? m.subject
    : htmlToText(/<title>([^<]*)<\/title>/i.exec(html)?.[1] ?? '')
        .replace(/^\s*(extropians|SL4):\s*/i, '')
        .trim();
  return {
    id: `${kind}-${key}`,
    authors: ['Eliezer Yudkowsky'],
    title,
    venue: ARCHIVES[kind].venue,
    date: {
      value: hypermailDate(m.sent),
      precision: 'day',
      basis: `Archive author index lists the message as "${m.sent}" under "${m.author}".`,
    },
    url: m.url,
    retrieval: {
      via: 'direct HTTP (Hypermail archive)',
      retrievedAt: log.retrievedAt.slice(0, 10),
      httpStatus: log.status,
      sha256: log.sha256,
    },
    documentWords: {
      count: messageWords(htmlToText(html), m.subject),
      basis:
        'Approximate words of the message body including quoted lines (as for admitted message sources); archive headers, navigation and the signature excluded',
    },
    cacheRefs: [{ cache: kind, key }],
  };
}

function sourceRecord(ref) {
  const [kind, key] = ref.split(':');
  if (kind === 'sl4' || kind === 'ext') return archiveSource(kind, key);
  if (kind === 'lw') {
    const meta = readJson(join(CACHE, 'lw', `${key}.json`));
    const year = Number(meta.postedAt.slice(0, 4));
    const imported = year >= 2006 && year <= 2009;
    const placeholder = /^(2003|2005|2006)-01-01/.test(meta.postedAt);
    const repost = meta.postedAt.startsWith('2015-03-11');
    const basis = placeholder
      ? 'LessWrong postedAt is a placeholder import date for an older essay; original date not established here.'
      : repost
        ? 'LessWrong postedAt is a 2015 repost from the book Rationality: From AI to Zombies; the original publication date is earlier.'
        : imported
          ? 'LessWrong postedAt of an imported Overcoming Bias post (Overcoming Bias date).'
          : 'LessWrong postedAt.';
    const v1 = join(CACHE, 'lw-v1', `${key}.json`);
    const refs = [{ cache: 'lw', key }];
    const firstVersion = existsSync(v1)
      ? (readJson(v1).first?.version ?? 'unavailable from the API')
      : null;
    if (firstVersion === '1.0.0') refs.push({ cache: 'lw-v1', key });
    return {
      id: `lw-${key}`,
      authors: ['Eliezer Yudkowsky'],
      ...(meta.coauthorStatuses?.length ||
      meta.user?.slug !== 'eliezer_yudkowsky'
        ? {
            coauthored: `multi-author post; primary poster ${meta.user?.slug}; only turns attributed to Yudkowsky are quoted`,
          }
        : {}),
      title: meta.title,
      venue: imported
        ? 'Overcoming Bias, as imported to LessWrong'
        : 'LessWrong',
      date: {
        value: meta.postedAt.slice(0, 10),
        precision: placeholder || repost ? 'repost or import date' : 'day',
        basis,
      },
      url: meta.pageUrl,
      version: {
        current: meta.contents?.version ?? null,
        editedAt: meta.contents?.editedAt ?? null,
        ...(firstVersion ? { postingDay: firstVersion } : {}),
      },
      retrieval: {
        via: 'LessWrong GraphQL htmlBody',
        retrievedAt: meta.retrievedAt.slice(0, 10),
        sha256: meta.bodySha256,
      },
      documentWords: meta.contents?.wordCount
        ? {
            count: meta.contents.wordCount,
            basis: 'LessWrong contents.wordCount',
          }
        : null,
      cacheRefs: refs,
    };
  }
  const doc = DOCS[key];
  if (!doc) throw new Error(`no DOCS metadata for ${key}`);
  const meta = readJson(join(CACHE, 'doc', `${key}.json`));
  return {
    id: `doc-${key}`,
    authors: doc.authors ?? ['Eliezer Yudkowsky'],
    title: doc.title,
    venue: doc.venue,
    date: doc.date,
    url: meta.requestedUrl.replace(
      /^https:\/\/web\.archive\.org\/web\/(\d+)id_\//,
      'https://web.archive.org/web/$1/',
    ),
    retrieval: {
      via: 'direct HTTP',
      retrievedAt: meta.retrievedAt.slice(0, 10),
      httpStatus: meta.httpStatus,
      sha256: meta.sha256,
    },
    cacheRefs: [{ cache: 'doc', key }],
  };
}

// Merge fragment files (one per passage-finding group) into pack.json; takes keep their numeric order.
// Without arguments, refresh header and source records for the takes already in pack.json.
async function build(fragmentFiles) {
  const pack = readJson(join(DIR, 'pack-header.json'));
  const takes = fragmentFiles.length
    ? fragmentFiles.flatMap((f) => readJson(f).takes)
    : readJson(PACK).takes;
  takes.sort((a, b) => a.id.localeCompare(b.id, 'en', { numeric: true }));
  const toRef = (s) => s.replace(/^(lw|doc|sl4|ext)-/, '$1:');
  const refs = new Set(
    takes.flatMap((t) => t.passages.map((p) => toRef(p.source))),
  );
  pack.sources = [...refs].sort().map(sourceRecord);
  pack.takes = takes.map((t) => ({
    ...t,
    passages: t.passages.map((p) => ({
      ...p,
      source: toRef(p.source).replace(':', '-'),
      checkedAt: p.checkedAt ?? pack.prepared,
    })),
  }));
  await writeTracked(PACK, JSON.stringify(pack));
  console.log(
    `pack.json: ${pack.takes.length} takes, ${pack.sources.length} sources`,
  );
}

function quoteFound(quote, text) {
  const hay = normalise(text);
  let from = 0;
  for (const frag of quote
    .split(/\s*(?:…|\.\.\.)\s*/)
    .map(normalise)
    .filter(Boolean)) {
    const at = hay.indexOf(frag, from);
    if (at < 0) return frag;
    from = at + frag.length;
  }
  return true;
}

async function verify() {
  const pack = readJson(PACK);
  const sources = new Map(pack.sources.map((s) => [s.id, s]));
  const quotedBySource = new Map();
  const problems = [];
  const results = {};
  const ids = new Set();
  for (const take of pack.takes) {
    for (const p of take.passages) {
      const where = `${take.id}/${p.id}`;
      if (ids.has(p.id)) problems.push(`${where}: duplicate passage id`);
      ids.add(p.id);
      const src = sources.get(p.source);
      if (!src) {
        problems.push(`${where}: unknown source ${p.source}`);
        continue;
      }
      for (const f of [
        'relation',
        'premise',
        'locator',
        'quote',
        'context',
        'voice',
        'checkedAt',
      ])
        if (!p[f]) problems.push(`${where}: missing ${f}`);
      if (!take.premises.some((x) => x.id === p.premise))
        problems.push(`${where}: unknown premise ${p.premise}`);
      if (!pack.relations[p.relation])
        problems.push(`${where}: unknown relation ${p.relation}`);
      if (!pack.voices[p.voice])
        problems.push(`${where}: unknown voice ${p.voice}`);
      for (const r of p.roles ?? [])
        if (!pack.roles[r]) problems.push(`${where}: unknown role ${r}`);
      const n = words(p.quote);
      if (n > 50) problems.push(`${where}: quote has ${n} words (max 50)`);
      // The same quotation reused under several takes counts once towards the per-source cap.
      const seen = quotedBySource.get(src.id) ?? new Map();
      seen.set(normalise(p.quote), n);
      quotedBySource.set(src.id, seen);
      // The quote may elide with "…"; each fragment must occur in order. A missing posting-day
      // version is reported, not failed: the passage then carries a later-addition flag.
      const result = { words: n };
      for (const ref of src.cacheRefs) {
        const text = cachedText(ref);
        if (text == null) {
          problems.push(`${where}: cache missing ${ref.cache}/${ref.key}`);
          continue;
        }
        const found = quoteFound(p.quote, text);
        result[
          ref.cache === 'lw-v1' ? 'postingDayVersion' : 'retrievedExpression'
        ] = found === true ? 'match' : 'absent';
        if (found !== true && ref.cache !== 'lw-v1')
          problems.push(
            `${where}: quote fragment not found in ${ref.cache}/${ref.key}: "${found.slice(0, 60)}"`,
          );
      }
      if (
        src.version?.current &&
        src.version.current !== '1.0.0' &&
        !result.postingDayVersion
      )
        result.postingDayVersion = src.version.postingDay
          ? `unavailable (${src.version.postingDay})`
          : 'not retrieved';
      results[p.id] = result;
    }
  }
  for (const [id, seen] of quotedBySource) {
    const n = [...seen.values()].reduce((a, b) => a + b, 0);
    const src = sources.get(id);
    const cap =
      src.documentWords && src.documentWords.count < 2000
        ? Math.floor(src.documentWords.count * 0.1)
        : 400;
    if (n > cap) problems.push(`${id}: ${n} quoted words exceed cap ${cap}`);
  }
  await writeTracked(
    join(DIR, 'verification.json'),
    JSON.stringify({
      checkedWith: 'scripts/yudkowsky-arguments.mjs verify',
      cacheDate: pack.prepared,
      problems,
      passages: results,
    }),
  );
  const passages = pack.takes.reduce((a, t) => a + t.passages.length, 0);
  console.log(
    `${pack.takes.length} takes, ${passages} passages, ${pack.sources.length} sources`,
  );
  const later = Object.entries(results)
    .filter(([, r]) => r.postingDayVersion === 'absent')
    .map(([id]) => id);
  if (later.length)
    console.log(`absent from posting-day version: ${later.join(', ')}`);
  const pending = Object.entries(results)
    .filter(([, r]) => r.postingDayVersion === 'not retrieved')
    .map(([id]) => id);
  if (pending.length)
    console.log(`posting-day version not retrieved: ${pending.join(', ')}`);
  if (problems.length) {
    console.log(problems.join('\n'));
    process.exitCode = 1;
  } else
    console.log(
      'all quotes match their retrieved expressions; limits respected',
    );
}

async function render() {
  const pack = readJson(PACK);
  const sources = new Map(pack.sources.map((s) => [s.id, s]));
  const checks = existsSync(join(DIR, 'verification.json'))
    ? readJson(join(DIR, 'verification.json')).passages
    : {};
  const passages = pack.takes.reduce((a, t) => a + t.passages.length, 0);
  const out = [
    `# ${pack.title}`,
    '',
    `${pack.status} Prepared ${pack.prepared} by ${pack.preparer}. Generated from \`pack.json\` by \`node scripts/yudkowsky-arguments.mjs render\`; do not edit by hand.`,
    '',
    `${pack.takes.length} takes, ${passages} passages, ${pack.sources.length} source expressions. Scope and method: [scope.md](scope.md).`,
    '',
    '## Definitions',
    '',
    ...Object.entries(pack.relations).map(
      ([k, v]) => `- Relation **${k}**: ${v}.`,
    ),
    ...Object.entries(pack.roles).map(([k, v]) => `- Role **${k}**: ${v}.`),
    ...Object.entries(pack.voices).map(([k, v]) => `- Voice **${k}**: ${v}.`),
    '',
    '## Limits',
    '',
    ...pack.limits.map((l) => `- ${l}`),
    '',
  ];
  for (const t of pack.takes) {
    out.push(`## ${t.id}. “${t.take}”`, '');
    for (const pr of t.premises) out.push(`- **${pr.id}** ${pr.text}`);
    out.push('');
    for (const p of t.passages) {
      const s = sources.get(p.source);
      const c = checks[p.id] ?? {};
      out.push(
        `### ${p.id} · ${p.relation} · ${p.premise}${p.roles?.length ? ' · ' + p.roles.join(', ') : ''}`,
        '',
      );
      out.push(`> ${p.quote}`, '');
      out.push(
        `${s.authors.join(', ')}, “${s.title}”, ${s.venue}, ${s.date.value} (${s.date.precision}). ${p.locator}. Voice: ${p.voice}. [Source](${s.url})`,
        '',
      );
      out.push(`Context (paraphrase): ${p.context}`, '');
      if (p.expressionDate)
        out.push(
          `Wording dated ${p.expressionDate.value} (${p.expressionDate.precision}): ${p.expressionDate.basis}`,
          '',
        );
      if (p.qualification) out.push(`Qualification: ${p.qualification}`, '');
      if (p.cardUse)
        out.push(`Card use: ${p.cardUse.value} (${p.cardUse.reason}).`, '');
      const ver = [
        c.retrievedExpression &&
          `quote ${c.retrievedExpression} in retrieved expression`,
        c.postingDayVersion && `posting-day version: ${c.postingDayVersion}`,
        p.versionNote,
      ].filter(Boolean);
      if (ver.length) out.push(`Check: ${ver.join('; ')}.`, '');
    }
    if (t.open?.length) {
      out.push('Not addressed by located passages:', '');
      for (const o of t.open) out.push(`- ${o}`);
      out.push('');
    }
    if (t.searchNotes) out.push(`Search notes: ${t.searchNotes}`, '');
  }
  out.push('## Sources', '');
  for (const s of pack.sources)
    out.push(
      `- \`${s.id}\`: ${s.authors.join(', ')}, “${s.title}”, ${s.venue}, ${s.date.value}. ${s.date.basis}${s.version?.current ? ` Current content version ${s.version.current}.` : ''}${s.coauthored ? ` ${s.coauthored}.` : ''} Retrieved ${s.retrieval.retrievedAt}, SHA-256 \`${s.retrieval.sha256.slice(0, 16)}…\`. <${s.url}>`,
    );
  out.push('');
  await writeTracked(join(DIR, 'pack.md'), out.join('\n'));
  console.log('wrote pack.md');
}

const [cmd, ...args] = process.argv.slice(2);
const commands = {
  'lw-index': () => lwIndex(),
  build: () => build(args),
  'archive-index': () => archiveIndex(args[0]),
  'archive-fetch': () => archiveFetch(args[0]),
  'lw-version': async () => {
    for (const [i, id] of args.entries()) {
      if (i) await sleep(PACE_MS.lw);
      await lwVersion(id);
    }
  },
  fetch: () => fetchDoc(args[0], args[1]),
  grep: () =>
    grep(
      args[0],
      args.includes('--venue') ? args[args.indexOf('--venue') + 1] : undefined,
    ),
  verify: () => verify(),
  render: () => render(),
};
if (!commands[cmd]) {
  console.error(
    'usage: lw-index | lw-version <id…> | fetch <url> <key> | grep <regex> | build <fragment.json…> | verify | render',
  );
  process.exit(2);
}
await commands[cmd]();
