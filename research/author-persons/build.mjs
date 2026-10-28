// Builds the candidate pack from selection.json, retrieval.json and the
// retrieval cache in .local/author-persons.
//   node research/author-persons/build.mjs
// Writes verification.json and pack.json. Curation (names, inclusion, Butler,
// identification) lives in curation.mjs.
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import {
  curation,
  CENTRAL,
  EXTRA_CANDIDATES,
  OVERRIDES,
  PROPOSED_SOURCES,
} from './curation.mjs';

const ROOT = new URL('../..', import.meta.url).pathname;
const DIR = join(ROOT, 'research', 'author-persons');
const CACHE = join(ROOT, '.local', 'author-persons');
const readJson = (p) => JSON.parse(readFileSync(p, 'utf8'));
const writeJson = (p, v) => writeFileSync(p, JSON.stringify(v, null, 1) + '\n');
const PREPARED = '2026-10-27';

const selection = readJson(join(DIR, 'selection.json'));
// Error texts from earlier runs can carry the curl command line with local paths.
const scrub = (e) =>
  e
    ? /^Command failed: curl/.test(e)
      ? 'curl failed (connection refused or reset)'
      : e.replaceAll(ROOT, '')
    : e;
const retrieval = readJson(join(DIR, 'retrieval.json'));
for (const r of Object.values(retrieval))
  for (const a of r.attempts ?? []) if (a.error) a.error = scrub(a.error);
if (!process.argv.includes('--no-scrub'))
  writeJson(join(DIR, 'retrieval.json'), retrieval);
const data = Object.fromEntries(
  ['entities', 'claims', 'sources', 'evidence'].map((k) => [
    k,
    readJson(join(ROOT, 'data', `${k}.json`)),
  ]),
);
const entities = new Map(data.entities.map((e) => [e.id, e]));
const sources = new Map(data.sources.map((s) => [s.id, s]));

const EMAIL = /[\w.+-]+@[\w-]+(\.[\w-]+)+/g;
const redact = (s) => s.replace(EMAIL, '[address not reproduced]');
const escape = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
// Length-preserving fold: each non-ASCII code unit becomes its base letter, so
// match positions in the folded text are positions in the original.
const fold = (s) =>
  s.replace(
    /[^\u0020-\u007e\n\r\t\f]/g,
    (c) => c.normalize('NFKD').replace(/[\u0300-\u036f]/g, '')[0] ?? c,
  );

// Find a credited name in retrieved text. Every match of every variant is
// collected; a match counts as a credit only where a byline sits: in a
// message header (after "From:" or followed by an address), in a message
// signature, on the first two pages of a PDF, at the head of a web page, in
// a "STATEMENT OF" heading of an OCR text, or in a post's author data.
const SUFFIX = /,?\s+(Jr\.?|Sr\.?|II|III)$/;
function findName(text, printed, family, given, r) {
  if (r.route === 'lesswrong_graphql') {
    const list =
      /Authors \(post data\): (.*)/.exec(text)?.[1]?.split(', ') ?? [];
    const f = fold(family).toLowerCase();
    const entry =
      list.find((e) =>
        fold(e).toLowerCase().replace(/_/g, ' ').split(/\s+/).includes(f),
      ) ?? list.find((e) => fold(e).toLowerCase().includes(f));
    if (!entry) return null;
    const display =
      /[\s_]/.test(entry) ||
      entry.toLowerCase() === fold(printed).toLowerCase();
    return {
      how: display ? 'post data display name' : 'post data username',
      index: text.indexOf(entry),
      passage: entry,
      place: display ? 'postdata' : 'username',
    };
  }
  // Addresses are blanked before matching, so no part of one can be a match.
  text = text.replace(EMAIL, (m) => ' '.repeat(m.length));
  const t = fold(text);
  const variants = [];
  const tokens = printed
    .replace(/\s*\(.*\)\s*$/, '')
    .replace(SUFFIX, '')
    .split(/\s+/)
    .filter(Boolean);
  const tokRe = (w) => escape(fold(w)).replace(/\\\./g, '\\.?');
  const ini = '[A-Z0-9?]\\.?';
  variants.push(['as printed', tokens.map(tokRe).join('[\\s.]+')]);
  if (given) {
    variants.push([
      'family, given',
      `${tokRe(family)},\\s*${given.split(/\s+/).map(tokRe).join('[\\s.]+')}`,
    ]);
    variants.push([
      'family given',
      `${tokRe(family)}\\s+${given.split(/\s+/).map(tokRe).join('[\\s.]+')}`,
    ]);
  }
  const first = (given ?? '').split(/\s+/)[0] ?? '';
  if (first)
    variants.push([
      'given and family',
      `${tokRe(first)}(?:[\\s.]+${ini})*[\\s.]+${tokRe(family)}`,
    ]);
  if (first && first.length > 1)
    variants.push([
      'other given name, same initial',
      `${escape(first[0])}[a-z]{2,}\\s+${tokRe(family)}`,
    ]);
  if (first && first.length > 1)
    variants.push([
      'initial and family',
      `${escape(first[0])}\\.(?:\\s*[A-Z]\\.)*\\s*${tokRe(family)}`,
    ]);
  const hits = [];
  for (const [how, re] of variants)
    for (const m of t.matchAll(new RegExp(`(?<![A-Za-z])${re}(?![a-z])`, 'gi')))
      hits.push({
        how,
        index: m.index,
        passage: text
          .slice(m.index, m.index + m[0].length)
          .replace(/\s+/g, ' '),
      });
  if (!hits.length) {
    const fam = new RegExp(`(?<![A-Za-z])${tokRe(family)}(?![a-z])`, 'i').exec(
      t,
    );
    return fam
      ? {
          how: 'family name only',
          index: fam.index,
          passage: text.slice(fam.index, fam.index + fam[0].length),
          place: 'other',
        }
      : null;
  }
  const pageEnd = (() => {
    let i = -1;
    for (let k = 0; k < 2; k++) {
      const j = text.indexOf('\f', i + 1);
      if (j < 0) return text.length;
      i = j;
    }
    return i;
  })();
  const bodyEnd = (() => {
    const i = text.search(/\n\s*(Next message|\[ Next \]|Next in thread)/g);
    const j = text.lastIndexOf('Next message');
    return j > 400 ? j : i > 400 ? i : text.length;
  })();
  for (const h of hits) {
    const after = text.slice(
      h.index + h.passage.length,
      h.index + h.passage.length + 6,
    );
    const lineStart = text.lastIndexOf('\n', h.index) + 1;
    const lineEnd = text.indexOf('\n', h.index);
    const line = text.slice(lineStart, lineEnd < 0 ? undefined : lineEnd);
    const isUpper = h.passage === h.passage.toUpperCase();
    if (r.ocr)
      h.place =
        /STATEMENT\s+OF|^\s*by\s/i.test(line) ||
        (isUpper && line.trim().length < 90)
          ? 'heading'
          : 'other';
    else if (
      /^\s*[(<]/.test(after) ||
      /From:/i.test(line.slice(0, h.index - lineStart))
    )
      h.place = 'header';
    else if (
      !r.pdf &&
      h.index > bodyEnd - 600 &&
      h.index < bodyEnd &&
      h.index > 400 &&
      line.trim().length < 60
    )
      h.place = 'signature';
    else if ((r.pdf && h.index < pageEnd) || (!r.pdf && h.index < 4000))
      h.place = 'head';
    else h.place = 'other';
  }
  const rank = { header: 0, heading: 0, head: 1, signature: 2, other: 3 };
  hits.sort((a, b) => rank[a.place] - rank[b.place] || a.index - b.index);
  return hits[0];
}

function locatorFor(doc, r, hit) {
  if (hit.place === 'postdata' || hit.place === 'username')
    return 'Post author list in the publisher’s post data (LessWrong GraphQL API)';
  if (hit.place === 'heading')
    return 'OCR text of the scanned volume: heading of the statement or paper';
  if (
    doc.kind === 'message' ||
    hit.place === 'header' ||
    hit.place === 'signature'
  )
    return hit.place === 'header'
      ? 'Message header, sender name (address not reproduced)'
      : hit.place === 'signature'
        ? 'Message signature, at the end of the sender’s text'
        : 'Message page, outside the sender line';
  if (r.pdf)
    return hit.place === 'head'
      ? 'PDF text layer, first two pages: author name on the title page or first page'
      : 'PDF text layer, pp. 1–3, outside the first two pages';
  return hit.place === 'head'
    ? 'Page head: author byline'
    : 'Page text, outside the page head';
}

function context(text, hit) {
  const s = Math.max(0, hit.index - 70);
  return redact(
    text.slice(s, hit.index + hit.passage.length + 70).replace(/\s+/g, ' '),
  ).trim();
}

const verification = [];
function verify(person, doc) {
  const r = retrieval[doc.sourceId];
  const v = {
    personKey: person.key,
    documentId: doc.documentId,
    sourceId: doc.sourceId,
    printed: doc.printedAuthor,
  };
  if (!r?.ok) {
    Object.assign(v, {
      status: 'not retrieved',
      attempts: r?.attempts?.map((a) => ({
        url: a.url,
        status: a.status,
        error: a.error,
      })),
    });
    verification.push(v);
    return v;
  }
  const path = join(CACHE, `${doc.sourceId}.txt`);
  const text = existsSync(path) ? readFileSync(path, 'utf8') : '';
  const hit =
    OVERRIDES[`${doc.sourceId}|${person.key}`] ??
    findName(text, doc.printedAuthor, person.family, person.given, r);
  Object.assign(v, {
    retrieved: {
      url: r.url,
      route: r.route,
      sha256: r.sha256,
      date: r.retrievedAt,
      viaArchive: /web\.archive\.org/.test(r.url),
      canonicalFallback: r.url !== doc.evidenceUrl && r.url !== doc.archivedUrl,
    },
  });
  if (!hit) {
    v.status = 'name not found';
    const pd = /Authors \(post data\): .*/.exec(text)?.[0];
    if (pd) v.postData = pd;
  } else {
    const byline =
      [
        'header',
        'heading',
        'head',
        'signature',
        'postdata',
        'override',
      ].includes(hit.place) &&
      !(doc.kind === 'message' && hit.place === 'head');
    v.status =
      hit.how === 'family name only'
        ? 'family name only'
        : hit.how.startsWith('other given') && byline
          ? 'given name differs'
          : hit.place === 'username'
            ? 'credited under a username'
            : byline
              ? 'matched'
              : 'name outside byline';
    if (hit.note) v.note = hit.note;
    if (hit.statement) v.statement = hit.statement;
    v.match = {
      how: hit.how,
      passage: redact(hit.passage),
      passageType: hit.passageType ?? 'quote',
      context: hit.place === 'override' ? undefined : context(text, hit),
      locator: hit.locator ?? locatorFor(doc, r, hit),
    };
  }
  verification.push(v);
  return v;
}

// Credited forms found verbatim in bylines, beyond those in the source records.
function printedForms_(claims) {
  return claims
    .filter(
      (c) =>
        c.verificationStatus === 'matched' &&
        c.evidence[0].passageType === 'quote',
    )
    .map((c) => c.evidence[0].passage)
    .filter((f) => f !== f.toUpperCase() && !f.includes(','));
}
const slug = (s) =>
  fold(s)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

function collectionsOf(person) {
  const out = {};
  for (const d of person.documents)
    for (const [k, n] of Object.entries(d.collections))
      out[k] = (out[k] ?? 0) + n;
  return out;
}
const COLLECTION_NAMES = {
  superintelligence: 'propositions about superintelligence',
  'yudkowsky-arguments': 'Yudkowsky’s arguments',
  'economics-of-machine-intelligence': 'economics of machine intelligence',
};

function canonical(person) {
  const c = curation[person.key] ?? {};
  const counts = new Map();
  for (const d of person.documents) {
    const f = d.printedAuthor.replace(/\s*\(.*\)\s*$/, '');
    counts.set(f, (counts.get(f) ?? 0) + 1);
  }
  const forms = [...counts.entries()]
    .sort((a, b) => b[1] - a[1] || b[0].length - a[0].length)
    .map(([f]) => f);
  const name = c.name ?? forms.find((f) => !/^[A-Z]\.\s/.test(f)) ?? forms[0];
  const aliases = [
    ...new Set([...(c.aliases ?? []), ...forms.filter((f) => f !== name)]),
  ];
  const given = c.sortGiven ?? person.given;
  const sortName =
    c.sortName ??
    `${person.family}, ${given}${person.suffix ? `, ${person.suffix}` : ''}`;
  return {
    id: c.id ?? slug(name.replace(/\bJr\.?$/, '')),
    name,
    aliases,
    sortName,
  };
}

function statementFor(name, doc, entity, credited = doc.printedAuthor) {
  const title = entity.name;
  const date = doc.date ?? 'undated';
  if (doc.kind === 'message')
    return `The mailing-list message “${title}” (${date}) is sent under the name ${credited}.`;
  if (doc.authorCount > 1)
    return `“${title}” (${date}) credits ${credited} as one of its ${doc.authorCount} authors.`;
  return `“${title}” (${date}) credits ${credited} as its author.`;
}

function authoredClaim(personId, name, doc, v, idPrefix) {
  const entity = entities.get(doc.documentId);
  const id = `${idPrefix}-${personId}-${doc.documentId}`.slice(0, 120);
  const src = sources.get(doc.sourceId);
  const ok = v.status === 'matched';
  const evidence = {
    id: `evidence-${id}`,
    sourceId: doc.sourceId,
    sourceRole: 'primary',
    support: 'supports',
    locator: ok
      ? v.match.locator
      : 'Byline as recorded in the source record; not matched in a retrieval of this pass',
    passage: ok ? v.match.passage : doc.printedAuthor,
    passageType: ok ? v.match.passageType : 'paraphrase',
    retrievalRoute: 'direct',
    check: ok
      ? `${v.note ? v.note + ' ' : ''}Name matched (${v.match.how}) in a direct retrieval of ${v.retrieved.url} on ${v.retrieved.date} (SHA-256 ${v.retrieved.sha256}).${v.retrieved.canonicalFallback ? ' Read in the canonical address because the evidence and archive addresses could not be retrieved; the current copy may differ from the inspected expression.' : ''}`
      : `Not verified in this pass: ${v.status}. The passage restates the source record's author list and must be checked before admission.`,
  };
  const qualification =
    doc.kind === 'message'
      ? 'A sender name on a mailing-list message as archived; it does not establish identity beyond the credited name, and quoted text by others inside the message is not the sender’s.'
      : doc.authorCount > 1
        ? 'Credited co-authorship; it does not allocate parts of the text between authors or imply agreement with every passage.'
        : 'Credited authorship of this expression; it says nothing about priority for the ideas discussed.';
  return {
    id,
    subject: personId,
    predicate: 'authored',
    object: { kind: 'entity', entityId: doc.documentId },
    topic: 'ideas',
    statement:
      v.statement ??
      statementFor(
        name,
        doc,
        entity,
        ok &&
          v.match.passageType === 'quote' &&
          v.match.passage !== v.match.passage.toUpperCase() &&
          !v.match.passage.includes(',')
          ? v.match.passage
          : doc.printedAuthor,
      ),
    time: {
      kind: doc.date ? 'event' : 'unknown',
      ...(doc.date ? { date: doc.date, basis: 'publication' } : {}),
      note: doc.date
        ? 'Date the source record gives for this text; authorship is credited in the inspected expression.'
        : 'The source record gives no date.',
    },
    derivation: 'explicit',
    resolution: 'supported',
    editorialState: 'seed',
    qualification,
    evidence: [evidence],
    verificationStatus: v.status,
    context: {
      documentName: entity.name,
      sourceTitle: src.title,
      publisher: src.publisher,
      records: doc.records,
      collections: doc.collections,
      roles: doc.roles,
    },
  };
}

const candidates = [];
const backfill = [];
const excluded = [];
for (const person of selection) {
  const records = person.records;
  const c = curation[person.key] ?? {};
  if (person.personEntity) {
    const e = entities.get(person.personEntity);
    const missing = person.documents.filter((d) => !d.authoredClaimExists);
    if (!missing.length) continue;
    const printedForms = [
      ...new Set(
        person.documents.map((d) =>
          d.printedAuthor.replace(/\s*\(.*\)\s*$/, ''),
        ),
      ),
    ];
    const claims = missing.map((d) =>
      authoredClaim(e.id, e.name, d, verify(person, d), 'ap'),
    );
    const forms = [...new Set([...printedForms, ...printedForms_(claims)])];
    backfill.push({
      personId: e.id,
      name: e.name,
      proposedAliases: forms.filter(
        (f) => f !== e.name && !(e.aliases ?? []).includes(f),
      ),
      claims,
    });
    continue;
  }
  const central = CENTRAL[person.key];
  const roleHolder = person.documents.some((d) =>
    d.roles.some((r) => r.startsWith('earliest') || r === 'most-developed'),
  );
  if (c.exclude || (records < 2 && !central && !roleHolder)) {
    excluded.push({
      key: person.key,
      name: canonical(person).name,
      records,
      documents: person.documents.map((d) => d.documentId),
      reason:
        c.exclude ??
        'One record on texts in the proposition collections, and the text holds no earliest-located or most-developed role.',
    });
    continue;
  }
  const { id, name, aliases: recordAliases, sortName } = canonical(person);
  const claims = person.documents.map((d) =>
    authoredClaim(id, name, d, verify(person, d), 'ap'),
  );
  const aliases = [
    ...new Set([...recordAliases, ...printedForms_(claims)]),
  ].filter((f) => f !== name);
  const collections = collectionsOf(person);
  const main = [...person.documents].sort((a, b) => b.records - a.records)[0];
  const colNames = Object.keys(collections)
    .map((k) => COLLECTION_NAMES[k])
    .filter(Boolean);
  candidates.push({
    key: person.key,
    entity: {
      id,
      name,
      sortName,
      type: 'person',
      subtype: 'Author',
      aliases,
      description:
        c.description ??
        `Credited author of texts recorded in the ${colNames.join(' and ')} collection${colNames.length > 1 ? 's' : ''}, among them “${entities.get(main.documentId).name}” (${main.date ?? 'undated'}).`,
      sourceIds: [
        ...new Set([
          ...person.documents.map((d) => d.sourceId).slice(0, 3),
          ...(c.identification ?? []).flatMap((i) =>
            i.evidence.map((e) => e.sourceId),
          ),
        ]),
      ],
    },
    inclusion:
      records >= 2
        ? `${records} records on ${person.documents.length} text${person.documents.length > 1 ? 's' : ''}`
        : (central ?? 'Text holds an earliest-located or most-developed role.'),
    records,
    collections,
    claims,
    identification: c.identification ?? [],
    notes: c.notes ?? [],
  });
}
for (const extra of EXTRA_CANDIDATES) {
  const docs = new Set(
    [...extra.claims, ...(extra.held ?? [])].map((c) => c.object.entityId),
  );
  const records = data.claims.filter(
    (c) =>
      docs.has(c.subject) ||
      (c.object.kind === 'entity' && docs.has(c.object.entityId)),
  ).length;
  candidates.push({
    ...extra,
    records,
    inclusion: `${records} records on ${docs.size} texts. ${extra.inclusion}`,
  });
}

// Entity-id collisions with the dataset or within the pack.
const seen = new Set(data.entities.map((e) => e.id));
for (const c of candidates) {
  if (seen.has(c.entity.id)) throw new Error(`id collision: ${c.entity.id}`);
  seen.add(c.entity.id);
}
candidates.sort((a, b) => a.entity.sortName.localeCompare(b.entity.sortName));

const allClaims = [
  ...candidates.flatMap((c) => c.claims),
  ...backfill.flatMap((b) => b.claims),
];
const statusCount = {};
for (const c of allClaims)
  statusCount[c.verificationStatus ?? 'curated'] =
    (statusCount[c.verificationStatus ?? 'curated'] ?? 0) + 1;

writeJson(join(DIR, 'verification.json'), {
  prepared: PREPARED,
  method:
    'Each selected source was retrieved directly (LessWrong and Alignment Forum posts through the publisher’s GraphQL API) and the credited name searched for in the text: first as printed in the source record, then as “Family, Given”, given and family, and initial and family. A family-name-only match is not counted as verified. Addresses in matched context are not reproduced.',
  statusCount,
  items: verification,
});
writeJson(join(DIR, 'pack.json'), {
  title: 'Author persons: candidate person records for credited authors',
  status:
    'Candidate research pack outside application data. Machine-prepared (same family as earlier packs); cross-family check not yet run; no human review. Nothing here is admitted.',
  prepared: PREPARED,
  datasetBaseline: 'origin/main at the start of the pass (2026-10-27)',
  counts: {
    candidates: candidates.length,
    candidateClaims: candidates.reduce((a, c) => a + c.claims.length, 0),
    identificationRecords: candidates.reduce(
      (a, c) => a + c.identification.length,
      0,
    ),
    backfillPersons: backfill.length,
    backfillClaims: backfill.reduce((a, b) => a + b.claims.length, 0),
    excluded: excluded.length,
    verification: statusCount,
  },
  proposedSources: PROPOSED_SOURCES,
  candidates,
  backfill,
  excluded,
});
console.log(
  JSON.stringify({
    candidates: candidates.length,
    backfill: backfill.length,
    excluded: excluded.length,
    statusCount,
  }),
);
