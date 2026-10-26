// Admits the esoteric strand of the economics-mainstream thread
// (research/economics-mainstream/esoteric) into the economics of machine
// intelligence collection, using the authored map in
// review/esoteric-admission-map-2026-10-16.json. Schema 2.14 is unchanged.
//
//   pnpm tsx scripts/esoteric-admission.ts           write the records
//   pnpm tsx scripts/esoteric-admission.ts --check   compare with the stored records
//
// The script is idempotent: it first removes the rows listed as added in the
// before-snapshot (review/esoteric-admission-before-2026-10-16.json) and
// restores the rows it changed, then rebuilds them. The pack is never changed.
//
// Earliest located is recomputed here from the admitted records, within tier 1
// and separately within tier 2, by the date of the checked wording, over every
// record of the collection that points to the new propositions; a reported
// passage never counts. The result must equal the pack's roles.
import { createHash } from 'node:crypto';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';

const date = '2026-10-16';
const dir = 'research/economics-mainstream/esoteric';
const files = {
  pack: `${dir}/pack.json`,
  verification: `${dir}/verification.json`,
  gptCheck: `${dir}/gpt-check-2026-10-14.json`,
  map: `review/esoteric-admission-map-${date}.json`,
  quoteCheck: `review/esoteric-admission-quote-check-${date}.json`,
  snapshot: `review/esoteric-admission-before-${date}.json`,
};
const names = ['entities', 'claims', 'sources', 'evidence'] as const;
type Name = (typeof names)[number];
type Row = Record<string, unknown> & { id: string };
type Json = Record<string, any>; // eslint-disable-line @typescript-eslint/no-explicit-any

const read = (path: string) => JSON.parse(readFileSync(path, 'utf8'));
const pack: Json = read(files.pack);
const verification: Json = read(files.verification);
const gptCheck: Json = read(files.gptCheck);
const map: Json = read(files.map);
// The re-check of every quotation from a source that could be retrieved again
// at admission (every source except the Wayback captures).
const quoteCheck: Json | null = existsSync(files.quoteCheck)
  ? read(files.quoteCheck)
  : null;
const check = process.argv.includes('--check');

// ---------------------------------------------------------------- base data
const stored = {
  meta: read('data/meta.json'),
  ...Object.fromEntries(names.map((n) => [n, read(`data/${n}.json`)])),
} as { meta: Json } & Record<Name, Row[]>;
const snapshot: Json | null = existsSync(files.snapshot)
  ? read(files.snapshot)
  : null;
const base = {
  meta: snapshot ? snapshot.meta : stored.meta,
  ...Object.fromEntries(
    names.map((n) => {
      const added = new Set<string>(snapshot?.added[n] ?? []);
      const before = new Map<string, Row>(
        (snapshot?.before[n] ?? []).map((r: Row) => [r.id, r]),
      );
      return [
        n,
        stored[n]
          .filter((r) => !added.has(r.id))
          .map((r) => structuredClone(before.get(r.id) ?? r)),
      ];
    }),
  ),
} as { meta: Json } & Record<Name, Row[]>;
const sha = (value: unknown) =>
  createHash('sha256').update(JSON.stringify(value)).digest('hex');
const existing = (n: Name, id: string) => base[n].find((r) => r.id === id);

// ---------------------------------------------------------------- passages
type Passage = Json & { id: string; source: string; proposition: string };
const sources = new Map<string, Json>(pack.sources.map((s: Json) => [s.id, s]));
const wayback = (s: Json) => Boolean(s.retrieval.waybackCapture);
const normal = (s: string) => s.replace(/\s+/g, ' ').trim();

/** A pack field after the map's reader-text rewrites. */
function rewritten(p: Passage): Passage {
  const out = structuredClone(p);
  for (const change of map.textChanges[p.id] ?? []) {
    const [field, sub] = (change.field as string).split('.');
    const holder = sub ? out[field] : out;
    const key = sub ?? field;
    if (!holder?.[key]?.includes(change.from))
      throw new Error(`Text change not found in ${p.id} ${change.field}`);
    holder[key] = holder[key].replace(change.from, change.to);
  }
  return out;
}

// Wayback passages are admitted only where the cross-family check of
// 2026-10-15 verified the quotation against the same capture.
const gptPassages = new Map<string, Json>(
  gptCheck.passages.map((x: Json) => [x.id, x]),
);
const gptBlind = new Map<string, Json>(
  gptCheck.blindJudgements.map((x: Json) => [x.id, x]),
);
function gptVerified(p: Passage) {
  const s = sources.get(p.source)!;
  const final = gptPassages.get(p.id)?.finalJudgement;
  const blind = gptBlind.get(p.id);
  const expression =
    blind && gptCheck.sourceExpressions[blind.sourceExpression];
  const capture: string = s.retrieval.waybackCapture;
  const memento = expression?.memento
    ? new Date(expression.memento).toISOString().replace(/\D/g, '').slice(0, 14)
    : null;
  return (
    final?.quote?.status === 'verified' &&
    expression?.status === 200 &&
    expression.sha256 === s.retrieval.sha256 &&
    memento === capture &&
    String(expression.at).startsWith('2026-10-15')
  );
}
const heldBack: { id: string; reason: string }[] = [];
const passages: Passage[] = [];
for (const raw of pack.passages as Passage[]) {
  const s = sources.get(raw.source);
  if (!s) throw new Error('Unknown source: ' + raw.source);
  if (map.holdBack[raw.id]) {
    heldBack.push({ id: raw.id, reason: map.holdBack[raw.id] });
    continue;
  }
  const v = verification.passages[raw.id];
  if (!v) throw new Error('Not verified: ' + raw.id);
  if (v.retrievedExpression === 'no-cache') {
    if (!wayback(s))
      throw new Error('No-cache passage not from Wayback: ' + raw.id);
    if (!gptVerified(raw)) {
      heldBack.push({
        id: raw.id,
        reason:
          'Wayback capture not re-read at admission and not verified by the GPT check of 2026-10-15.',
      });
      continue;
    }
  } else if (!/^match/.test(v.retrievedExpression))
    throw new Error('Quotation does not match: ' + raw.id);
  const passage = rewritten(raw);
  const change: Json | undefined = map.quoteChanges[raw.id];
  if (change) {
    if (!normal(raw.quote).includes(normal(change.quote)))
      throw new Error(
        'A shortened quotation must come from the pack: ' + raw.id,
      );
    passage.quote = change.quote;
    if (change.requires) passage.contextOnly.requires = change.requires;
  }
  passages.push(passage);
}

const stanceOf: Record<string, 'articulates' | 'contests' | 'bears_on'> = {
  articulates: 'articulates',
  contests: 'contests',
  'bears-on': 'bears_on',
};
const predicateOf = {
  articulates: 'articulates_proposition',
  contests: 'contests_proposition',
  bears_on: 'bears_on_proposition',
};
const verbOf = {
  articulates: 'articulates',
  contests: 'contests',
  bears_on: 'bears on',
};
const suffixOf = { articulates: 'a', contests: 'c', bears_on: 'b' };
const ordinals = [
  'First',
  'Second',
  'Third',
  'Fourth',
  'Fifth',
  'Sixth',
  'Seventh',
  'Eighth',
  'Ninth',
  'Tenth',
];
const words = (s: string) => s.trim().split(/\s+/).length;
const sentence = (s: string) =>
  /[.!?”’"]$/.test(s.trim()) ? s.trim() : s.trim() + '.';
const firstSentence = (s: string) => {
  const m = /^(.*?[.!?][”"’)]?)\s+(?=[A-Z“"(])/.exec(s);
  return m ? [m[1], s.slice(m[0].length)] : [s, ''];
};
const surname = (name: string) =>
  name === 'Ethan Bueno de Mesquita'
    ? 'Bueno de Mesquita'
    : name.split(' ').at(-1)!;
const citeAuthors = (authors: string[]) =>
  authors.length > 3
    ? `${surname(authors[0])} et al.`
    : authors.length === 3
      ? `${surname(authors[0])}, ${surname(authors[1])} and ${surname(authors[2])}`
      : authors.map(surname).join(' and ');
const captureDate = (ts: string) =>
  `${ts.slice(0, 4)}-${ts.slice(4, 6)}-${ts.slice(6, 8)}`;
const postTitle = (p: Passage) => /^"([^"]+)"/.exec(p.locator)?.[1];

/**
 * The document entity and source a passage's pack source becomes. The
 * compiled debate becomes one document per post, each read in its chapter of
 * the compilation.
 */
function documentOf(p: Passage) {
  const s = sources.get(p.source);
  const mapped: Json = map.documents[p.source];
  if (!s || !mapped) throw new Error('Unmapped source: ' + p.source);
  if (mapped.byPost) {
    const title = postTitle(p);
    const post: Json | undefined = title && mapped.posts[title];
    if (!post || !p.postDate || !p.speaker)
      throw new Error(
        'A compiled post needs its title, date and speaker: ' + p.id,
      );
    return {
      key: `${p.source}:${title}`,
      entity: post.entity as string,
      source: `source-${post.entity}-miri-2013`,
      mapped: { ...mapped, ...post },
      s,
      post: {
        title: title!,
        date: p.postDate as string,
        speaker: p.speaker as string,
      },
    };
  }
  return {
    key: p.source,
    entity: mapped.entity as string,
    source: (mapped.source as string) ?? 'source-' + mapped.entity,
    mapped,
    s,
    post: undefined,
  };
}

// ---------------------------------------------------------------- new rows
const added: Record<Name, Row[]> = {
  entities: [],
  claims: [],
  sources: [],
  evidence: [],
};
const addOnce = (n: Name, row: Row) => {
  if (added[n].some((r) => r.id === row.id) || existing(n, row.id))
    throw new Error(`Duplicate ${n} id: ${row.id}`);
  added[n].push(row);
};

// Propositions.
const firstSourcesOf = (code: string) =>
  [
    ...new Set(
      passages
        .filter((p) => p.proposition === code)
        .map((p) => documentOf(p).source),
    ),
  ].slice(0, 2);
for (const [code, p] of Object.entries(map.propositions) as [string, Json][]) {
  const text = pack.propositions.find((x: Json) => x.code === code);
  const criterion = (map.criterionChanges?.[code] ?? []).reduce(
    (c: string, change: Json) => {
      if (!c.includes(change.from))
        throw new Error('Criterion change not found: ' + code);
      return c.replace(change.from, change.to);
    },
    text.criterion as string,
  );
  addOnce('entities', {
    id: p.id,
    name: p.name,
    type: 'concept',
    subtype: 'Proposition',
    aliases: text.statement === p.name ? [] : [text.statement],
    description: `A proposition about the economics of machine intelligence, recorded with one criterion so that texts can be classified against it (code ${code}, economists on recursive self-improvement, superintelligence and existential risk from AI). It is phrased generically and attributed to no one. A record says what a text states, not whether the proposition is true.`,
    sourceIds: firstSourcesOf(code),
    proposition: { code, criterion, terms: [] },
  });
}

// Documents and sources.
const documents = new Map<string, ReturnType<typeof documentOf>>();
for (const p of passages) {
  const d = documentOf(p);
  if (!documents.has(d.key)) documents.set(d.key, d);
}
for (const { entity, source, mapped, s, post } of documents.values()) {
  const authors: string[] = post ? [post.speaker] : s.authors;
  const title = post ? post.title : normal(s.title);
  const year = String(post ? post.date : s.date.value).slice(0, 4);
  if (mapped.existingSource) {
    const row = existing('sources', source);
    if (!row || row.documentId !== entity)
      throw new Error('Existing source not found: ' + source);
    // A reused source must be the very expression the pack checked.
    if (!String(row.version).includes(s.retrieval.sha256))
      throw new Error('Existing source is another expression: ' + source);
    continue;
  }
  if (mapped.existing) {
    if (!existing('entities', entity))
      throw new Error('Existing document not found: ' + entity);
  } else
    addOnce('entities', {
      id: entity,
      name: title,
      shortName: `${citeAuthors(authors)}, ${title.split(/[:?(]/)[0].trim()} (${year})`,
      type: 'document',
      subtype: mapped.subtype,
      aliases: [],
      description: post
        ? `A post by ${post.speaker} on Overcoming Bias, dated ${post.date}, in the Hanson–Yudkowsky debate; read in MIRI’s 2013 compilation of the debate (chapter ${mapped.chapter}).`
        : `${title}, by ${authors.join(', ')}. ${s.venue}${/[.)]$/.test(s.venue) ? '' : '.'}`.slice(
            0,
            600,
          ),
      sourceIds: [source],
    });
  const capture: string | undefined = s.retrieval.waybackCapture;
  const archive = capture
    ? `https://web.archive.org/web/${capture}/${s.url}`
    : undefined;
  const version = post
    ? `Chapter ${mapped.chapter} of ${mapped.compilation} (Machine Intelligence Research Institute, 2013), which compiles the 2008 Overcoming Bias debate with later posts; the compilation heads the post with its date. Current MIRI PDF, retrieved ${String(s.retrieval.retrievedAt).slice(0, 10)}. SHA-256 ${s.retrieval.sha256}.`
    : [
        `${sentence(s.expression.replace(/^./, (c: string) => c.toUpperCase()))} SHA-256 ${s.retrieval.sha256}.`,
        s.notRetrieved
          ? `${s.notRetrieved.note} ${s.notRetrieved.references.join(' ')}`
          : '',
      ]
        .filter(Boolean)
        .join(' ')
        .replace(/_/g, '');
  const count: number | null = post
    ? mapped.words
    : (s.documentWords?.count ?? null);
  let documentWords: Json;
  if (count)
    documentWords = {
      count,
      basis: post ? mapped.wordsBasis : s.documentWords.method,
    };
  else if (mapped.pages) {
    const [from, to] = mapped.pages;
    documentWords = {
      count: (to - from + 1) * 400,
      basis: `Estimated at admission from the ${to - from + 1} printed pages (${from}–${to}, Crossref) at 400 words a page; only the abstract page was retrieved.`,
    };
  } else if (mapped.lengthFloor)
    documentWords = {
      count: 2000,
      basis:
        'A floor, not a count: an NBER working paper whose full text was refused (HTTP 403), so only the abstract page was read; the paper is assumed to run to at least 2,000 words.',
    };
  else throw new Error('No length for ' + entity);
  const publisher = post
    ? `Machine Intelligence Research Institute, ${mapped.compilation} (2013)`
    : s.venue;
  addOnce('sources', {
    id: source,
    documentId: entity,
    title,
    authors,
    authorNames: post
      ? [
          {
            family: surname(post.speaker),
            given: post.speaker.split(' ')[0],
          },
        ]
      : mapped.authorNames,
    publisher,
    publicationDate: post ? '2013' : s.date.value,
    version,
    canonicalUrl: s.url,
    evidenceUrl: archive ?? s.url,
    language: mapped.language ?? 'en',
    ...(archive
      ? { archivedUrl: archive, archivedAt: captureDate(capture!) }
      : {}),
    documentWords,
    kind: mapped.kind,
    accessedAt: String(s.retrieval.retrievedAt).slice(0, 10),
    reuse: {
      attribution: post
        ? `${authors.join(', ')}, “${title}”, in ${publisher}.`
        : `${authors.join(', ')}, “${title}”, ${publisher}, ${s.date.value}.`,
      licence: 'No open redistribution licence asserted',
      note: 'Bibliographic metadata, editorial paraphrases and short attributed quotations (at most 50 words each). Recheck terms before wider redistribution.',
    },
  });
}

// Records: one per text, proposition and stance. A post of the compiled
// debate is its own text.
type Group = {
  key: string;
  code: string;
  stance: 'articulates' | 'contests' | 'bears_on';
  doc: ReturnType<typeof documentOf>;
  post?: { title: string; date: string; speaker: string };
  passages: Passage[];
  claimId: string;
};
const groups = new Map<string, Group>();
for (const p of passages) {
  const stance = stanceOf[p.relation];
  const doc = documentOf(p);
  const key = [p.proposition, doc.entity, stance].join('|');
  const g: Group = groups.get(key) ?? {
    key,
    code: p.proposition,
    stance,
    doc,
    post: doc.post,
    passages: [],
    claimId: `ec-${p.proposition.toLowerCase()}-${doc.entity}-${suffixOf[stance]}`,
  };
  if (g.doc.key !== doc.key) throw new Error('One text, two sources: ' + p.id);
  g.passages.push(p);
  groups.set(key, g);
}
const reported = (p: Passage) => p.voice === 'reported';
const voiceNote =
  'The passage reports a view the author does not state as their own.';
const modelScenario = (p: Passage) =>
  (p.flags ?? []).includes('model scenario');
const label = (g: Group, i: number) =>
  g.passages.length > 1 ? `(${ordinals[i]} passage) ` : '';

/** The record's date, its date note and any claimed or attested date. */
function datesOf(g: Group) {
  const s = g.doc.s;
  const inherit: string | undefined = g.doc.mapped.inheritDateFrom;
  if (inherit) {
    const from = existing('claims', inherit) as Json | undefined;
    if (!from || from.subject !== g.doc.entity)
      throw new Error('Cannot inherit dates from ' + inherit);
    const thought = from.attributes.thought;
    return {
      time: structuredClone(from.time),
      claimed: thought.claimed && structuredClone(thought.claimed),
      attested: thought.attested && structuredClone(thought.attested),
    };
  }
  if (g.post) {
    const check = (s.postDateChecks ?? []).find(
      (c: Json) => c.post === g.post!.title,
    );
    return {
      time: {
        kind: 'event',
        date: g.post.date,
        basis: 'publication',
        note: check
          ? `Post date from the original Overcoming Bias page (retrieved ${String(check.retrievedAt).slice(0, 10)}): ${check.finding} The wording was checked in the MIRI compilation of 2013.`
          : `Post date from the post’s heading in the MIRI compilation of 2013, where the wording was checked; the original page was not retrieved.`,
      },
    };
  }
  const notes: string[] = [s.date.basis];
  if (!wayback(s))
    notes.push(
      'Checked in a current copy; an archive capture was not available, so earlier bytes are not authenticated.',
    );
  return {
    time: {
      kind: 'event',
      date: s.date.value,
      basis: 'publication',
      note: notes.join(' '),
    },
    attested: s.attested
      ? { date: s.attested.value, note: s.attested.basis }
      : undefined,
  };
}

const builtDates = new Map<string, ReturnType<typeof datesOf>>();
for (const g of groups.values()) builtDates.set(g.key, datesOf(g));

// ---------------------------------------------------------------- earliest located
/** First and last day of a date of year, month or day precision. */
const bounds = (d: string): [string, string] => {
  if (/^\d{4}$/.test(d)) return [`${d}-01-01`, `${d}-12-31`];
  if (/^\d{4}-\d{2}$/.test(d)) return [`${d}-01`, `${d}-31`];
  return [d, d];
};
const wordingOf = (g: Group) => {
  const d = builtDates.get(g.key)!;
  return (d.attested?.date ?? d.time.date) as string;
};
const computedRoles = new Map<string, string>(); // group key → role
const earliest: Json = {};
for (const code of Object.keys(map.propositions))
  for (const stance of ['articulates', 'contests'] as const)
    for (const tier of [1, 2]) {
      const candidates = [...groups.values()]
        .filter(
          (g) =>
            g.code === code &&
            g.stance === stance &&
            g.doc.s.tier === tier &&
            g.passages.some((p) => !reported(p)),
        )
        .sort((a, b) =>
          bounds(wordingOf(a))[0].localeCompare(bounds(wordingOf(b))[0]),
        );
      if (!candidates.length) continue;
      const [first, second] = candidates;
      if (second && bounds(wordingOf(first))[1] >= bounds(wordingOf(second))[0])
        throw new Error(
          `Earliest located is ambiguous for ${code} ${stance} tier ${tier}: ${first.claimId}, ${second.claimId}`,
        );
      const role = tier === 1 ? 'earliest-located' : 'earliest-located-tier-2';
      computedRoles.set(first.key, role);
      earliest[`${code} ${stance} tier ${tier}`] = {
        claimId: first.claimId,
        wording: wordingOf(first),
        passages: first.passages.filter((p) => !reported(p)).map((p) => p.id),
      };
    }
// The pack's roles must agree with the recomputation.
for (const g of groups.values()) {
  const packRoles = new Set(
    g.passages.flatMap((p) =>
      (p.roles ?? []).filter((r: string) => r.startsWith('earliest-located')),
    ),
  );
  const computed = computedRoles.get(g.key);
  if (packRoles.size > 1 || [...packRoles][0] !== computed)
    throw new Error(
      `Earliest located differs from the pack for ${g.claimId}: pack ${[...packRoles].join(', ') || 'none'}, computed ${computed ?? 'none'}`,
    );
  for (const p of g.passages)
    if (
      reported(p) &&
      (p.roles ?? []).some((r: string) => r.startsWith('earliest'))
    )
      throw new Error('A reported passage holds earliest located: ' + p.id);
}

// ---------------------------------------------------------------- claims and evidence
for (const g of groups.values()) {
  const proposition = map.propositions[g.code];
  const s = g.doc.s;
  const dates = builtDates.get(g.key)!;

  const roles = new Set<string>();
  const role = computedRoles.get(g.key);
  if (role) roles.add(role);
  if (g.stance === 'contests') roles.add('contesting');
  else if (g.stance === 'bears_on') roles.add('context');
  else if (!roles.size) roles.add('articulation');

  let engagement: Json | undefined;
  const engagementNotes: string[] = [];
  if (g.stance === 'contests') {
    const kinds = g.passages.map((p) => p.engagement);
    if (kinds.some((k) => !k)) throw new Error('No engagement: ' + g.key);
    const rationales = [
      ...new Set(
        g.passages.map((p, i) => {
          const [first, rest] = firstSentence(p.engagementRationale);
          if (rest) engagementNotes.push(`${label(g, i)}Engagement: ${rest}`);
          return first.replace(/\.$/, '');
        }),
      ),
    ];
    engagement = {
      kind: kinds.includes('engages-premise')
        ? 'engages-premise'
        : 'contrary-only',
      rationale:
        rationales
          .map((r, i) => (i ? r[0].toLowerCase() + r.slice(1) : r))
          .join('; ') + '.',
    };
  }

  const missing =
    g.stance === 'bears_on'
      ? g.passages
          .map((p) => {
            if (!p.missing) throw new Error('No missing element for ' + p.id);
            return (
              (g.passages.length > 1 ? `(${p.id}) ` : '') + sentence(p.missing)
            );
          })
          .join(' ')
      : undefined;
  const withConditions = g.passages.filter((p) => p.conditions);
  const conditions = withConditions.length
    ? withConditions
        .map(
          (p) =>
            (withConditions.length > 1 ? `(${p.id}) ` : '') +
            sentence(p.conditions),
        )
        .join(' ')
    : undefined;
  const scenario = g.passages.some(modelScenario);
  for (const p of g.passages)
    if (modelScenario(p) && !p.contextOnly)
      throw new Error('A model scenario must be context-only: ' + p.id);
  const register = g.passages.every(reported) ? 'relay' : 'nonfiction';

  const authors: string[] = s.authors;
  const title = normal(s.title);
  const head = g.post
    ? `${surname(g.post.speaker)}, “${g.post.title}” (${g.post.date}), in “${title}”, ${verbOf[g.stance]} ${g.code}.`
    : `${citeAuthors(authors)}, “${title}” (${dates.time.date}) ${verbOf[g.stance]} ${g.code}.`;
  const statement = [head, ...g.passages.map((p) => sentence(p.context))].join(
    ' ',
  );
  if (statement.length > 800) throw new Error('Statement too long: ' + g.key);
  const qualification = g.passages
    .map((p, i) => {
      const parts = [
        reported(p) ? voiceNote : '',
        p.qualification ? sentence(p.qualification) : '',
      ].filter(Boolean);
      return parts.length ? label(g, i) + parts.join(' ') : '';
    })
    .filter(Boolean)
    .concat(engagementNotes)
    .join(' ');

  const evidenceIds: string[] = [];
  for (const p of g.passages) {
    const v = verification.passages[p.id];
    const id = `evidence-ec-${p.id.toLowerCase()}`;
    evidenceIds.push(id);
    const recheck = quoteCheck?.passages?.[p.id];
    let note: string;
    let checkedAt: string;
    if (wayback(s)) {
      checkedAt = '2026-10-15';
      note = `Candidate pack passage ${p.id} (${dir}). The quotation (${words(p.quote)} words) matched the Wayback capture ${s.retrieval.waybackCapture} (SHA-256 ${s.retrieval.sha256}) in the preparer's verification of 2026-10-11. It was not re-read in the correction pass of 2026-10-15 or at admission on ${date}, because web.archive.org refused connections from the cloud environment. Admitted on the basis of the cross-family GPT check of 2026-10-15, which retrieved the same capture (Memento timestamp and SHA-256 equal to the recorded ones) and found the quotation matching.`;
    } else {
      const handChecked = /by hand/.test(v.retrievedExpression);
      checkedAt = recheck?.result === 'match' ? date : '2026-10-15';
      note = `Candidate pack passage ${p.id} (${dir}). The quotation (${words(p.quote)} words) matched the retrieved current copy (SHA-256 ${s.retrieval.sha256}) in the pack's verification of 2026-10-15${handChecked ? ', across a text-layer paragraph break checked by hand' : ''}.${
        recheck?.result === 'match'
          ? ` Re-checked at admission on ${date} against a copy retrieved that day${recheck.sha256Matches === false ? ', whose SHA-256 differs from the recorded one' : ''}.`
          : ''
      }`;
    }
    const ctx = p.contextOnly;
    added.evidence.push({
      id,
      claimId: g.claimId,
      sourceId: g.doc.source,
      sourceRole: 'primary',
      support: 'supports',
      locator: p.locator,
      passage: p.quote,
      passageType: 'quote',
      verification: 'machine_checked',
      checkedAt,
      note:
        note +
        ((map.textChanges[p.id] ?? []).length
          ? ' ' + map.textChangeReason
          : ''),
      ...(ctx
        ? { contextOnly: { reason: ctx.reason, requires: ctx.requires } }
        : {}),
    });
  }

  const thought: Json = {
    roles: [...roles],
    register,
    ...(scenario
      ? {
          qualifier:
            'A model scenario under stated conditions, not the author’s own claim.',
        }
      : {}),
    ...(missing ? { missing } : {}),
    ...(dates.claimed ? { claimed: dates.claimed } : {}),
    ...(dates.attested ? { attested: dates.attested } : {}),
    ...(engagement ? { engagement } : {}),
    tier: {
      value: s.tier,
      basis: (map.tierBasisChanges[g.doc.s.id] ?? []).reduce(
        (basis: string, change: Json) => {
          if (!basis.includes(change.from))
            throw new Error('Tier basis change not found: ' + g.doc.s.id);
          return basis.replace(change.from, change.to);
        },
        s.tierBasis as string,
      ),
    },
    ...(conditions ? { conditions } : {}),
  };
  addOnce('claims', {
    id: g.claimId,
    subject: g.doc.entity,
    predicate: predicateOf[g.stance],
    object: { kind: 'entity', entityId: proposition.id },
    topic: 'ideas',
    statement,
    time: dates.time,
    editorialState: 'seed',
    qualification:
      qualification ||
      'The record documents what the text says; it does not establish that the argument or model is right.',
    evidenceIds,
    recordedAt: date,
    derivation: 'explicit',
    resolution: 'supported',
    attributes: { thought },
  });
}

// ---------------------------------------------------------------- output
const meta = {
  ...base.meta,
  updatedAt: date,
  scope:
    base.meta.scope +
    ' On 2026-10-16 the economics collection gained a third strand, admitted from a machine-prepared, machine-audited and cross-family-checked candidate pack: dated passages from 1998 to 2026 in which economists and economics venues state, contest or bear on five propositions about recursive self-improvement, superintelligence, existential risk from AI, developers’ incentives and economics’ own engagement with these ideas; a record says what a text states, not whether an argument or model is right.',
};
const patched: Row[] = [];
const patchedEntities = base.entities.map((r) => {
  const sourcesAdded = added.sources
    .filter((s) => s.documentId === r.id)
    .map((s) => s.id);
  if (!sourcesAdded.length) return r;
  patched.push(r);
  return {
    ...structuredClone(r),
    sourceIds: [...(r.sourceIds as string[]), ...sourcesAdded],
  };
});
const result = {
  meta,
  ...Object.fromEntries(names.map((n) => [n, [...base[n], ...added[n]]])),
  entities: [...patchedEntities, ...added.entities],
} as unknown as { meta: Json } & Record<Name, Row[]>;

const newSnapshot = {
  description:
    'Records as stored at main d76440b (schema 2.14) before the admission of the esoteric strand of the economics-mainstream thread on 2026-10-16: the earlier metadata and the IDs the admission added. The admission changed one stored row: the document trammell-korinek-2020-growth-under-transformative-ai gained the sources for the October 2023 and April 2026 versions of NBER Working Paper 31815. The test-only historical view removes these rows and restores the earlier metadata and row.',
  baseCommit: 'd76440b',
  meta: base.meta,
  added: Object.fromEntries(names.map((n) => [n, added[n].map((r) => r.id)])),
  before: { entities: patched, claims: [], sources: [], evidence: [] },
  sha256: {
    meta: sha(base.meta),
    ...Object.fromEntries(names.map((n) => [n, sha(base[n])])),
  },
};

const outputs: Record<string, unknown> = {
  'data/meta.json': result.meta,
  ...Object.fromEntries(names.map((n) => [`data/${n}.json`, result[n]])),
  [files.snapshot]: newSnapshot,
};
if (check) {
  const differing = Object.entries(outputs).filter(
    ([path, value]) =>
      JSON.stringify(read(path)) !==
      JSON.stringify(JSON.parse(JSON.stringify(value))),
  );
  if (differing.length) {
    console.error(
      'Differs from stored: ' + differing.map(([p]) => p).join(', '),
    );
    process.exitCode = 1;
  } else console.log('Stored records match the pack and the map.');
} else {
  for (const [path, value] of Object.entries(outputs))
    writeFileSync(path, JSON.stringify(value, null, 2) + '\n');
  execFileSync(
    process.platform === 'win32' ? 'pnpm.cmd' : 'pnpm',
    ['prettier', '--write', ...Object.keys(outputs)],
    { stdio: 'ignore', shell: process.platform === 'win32' },
  );
  console.log(
    `Added ${names.map((n) => `${added[n].length} ${n}`).join(', ')}; ${groups.size} records from ${passages.length} passages; held back ${heldBack.length}.`,
  );
  console.log(JSON.stringify({ earliest, heldBack }, null, 2));
}
