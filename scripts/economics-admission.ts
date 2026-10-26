// Admits the two economics candidate packs (research/economics-growth and
// research/economics-mainstream, without its esoteric sub-pack) as schema 2.13
// proposition records, using the authored map in
// review/economics-admission-map-2026-10-14.json.
//
//   pnpm tsx scripts/economics-admission.ts           write the records
//   pnpm tsx scripts/economics-admission.ts --check   compare with the stored records
//
// The script is idempotent: it first removes the rows listed as added in the
// before-snapshot (review/economics-admission-before-2026-10-14.json), then
// rebuilds them. The packs themselves are never changed.
import { createHash } from 'node:crypto';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';

const date = '2026-10-14';
const files = {
  growth: 'research/economics-growth/pack.json',
  growthVerification: 'research/economics-growth/verification.json',
  mainstream: 'research/economics-mainstream/pack.json',
  mainstreamVerification: 'research/economics-mainstream/verification.json',
  map: `review/economics-admission-map-${date}.json`,
  quoteCheck: `review/economics-admission-quote-check-${date}.json`,
  snapshot: `review/economics-admission-before-${date}.json`,
};
const names = ['entities', 'claims', 'sources', 'evidence'] as const;
type Name = (typeof names)[number];
type Row = Record<string, unknown> & { id: string };
type Json = Record<string, any>; // eslint-disable-line @typescript-eslint/no-explicit-any

const read = (path: string) => JSON.parse(readFileSync(path, 'utf8'));
const growth: Json = read(files.growth);
const mainstream: Json = read(files.mainstream);
const verification: Record<'g' | 'm', Json> = {
  g: read(files.growthVerification),
  m: read(files.mainstreamVerification),
};
const map: Json = read(files.map);
// The re-check of every quotation against freshly retrieved copies at
// admission, where one was possible.
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
type Pack = 'g' | 'm';
type Passage = Json & { pack: Pack; code: string };
const packName = {
  g: 'research/economics-growth',
  m: 'research/economics-mainstream',
};
const passages: Passage[] = [
  ...growth.propositions.flatMap((p: Json) =>
    p.passages.map((x: Json) => ({ ...x, pack: 'g', code: p.id })),
  ),
  ...mainstream.passages.map((x: Json) => ({
    ...x,
    pack: 'm',
    code: x.proposition,
  })),
];
const packSources = new Map<string, Json & { pack: Pack }>([
  ...growth.sources.map((s: Json) => [`g:${s.id}`, { ...s, pack: 'g' }]),
  ...mainstream.sources.map((s: Json) => [`m:${s.id}`, { ...s, pack: 'm' }]),
] as [string, Json & { pack: Pack }][]);
const propositionText = new Map<string, Json>([
  ...growth.propositions.map((p: Json) => [
    p.id,
    { code: p.id, statement: p.label, criterion: p.criterion },
  ]),
  ...mainstream.propositions.map((p: Json) => [p.code, p]),
] as [string, Json][]);

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
const words = (s: string) => s.trim().split(/\s+/).length;
const normal = (s: string) => s.replace(/\s+/g, ' ').trim();
const sentence = (s: string) =>
  /[.!?”’"]$/.test(s.trim()) ? s.trim() : s.trim() + '.';
const firstSentence = (s: string) => {
  const m = /^(.*?[.!?][”"’)]?)\s+(?=[A-Z“"(])/.exec(s);
  return m ? [m[1], s.slice(m[0].length)] : [s, ''];
};
const surname = (name: string) =>
  name
    .replace(/\s*\(ed\.\)$/, '')
    .replace(/,? Jr\.$/, '')
    .split(' ')
    .at(-1)!;
const citeAuthors = (authors: string[]) =>
  authors.length > 3
    ? `${surname(authors[0])} et al.`
    : authors.map(surname).join(authors.length === 2 ? ' and ' : ', ');
const unWayback = (url: string) =>
  url.replace(/^https:\/\/web\.archive\.org\/web\/\d+(id_)?\//, '');
const viewable = (url: string) => url.replace(/(\/web\/\d{14})id_\//, '$1/');
const captureDate = (ts: string) =>
  `${ts.slice(0, 4)}-${ts.slice(4, 6)}-${ts.slice(6, 8)}`;

/** The document entity and source a pack source becomes. */
function documentOf(key: string) {
  const s = packSources.get(key);
  const mapped: Json = map.documents[key];
  if (!s || !mapped) throw new Error('Unmapped source: ' + key);
  return {
    entity: mapped.entity as string,
    source: (mapped.source as string) ?? 'source-' + mapped.entity,
    mapped,
    s,
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
  if (added[n].some((r) => r.id === row.id) || existing(n, row.id)) return;
  added[n].push(row);
};

// Propositions.
const firstSourcesOf = (code: string) =>
  [
    ...new Set(
      passages
        .filter((p) => p.code === code)
        .map((p) => documentOf(`${p.pack}:${p.source}`).source),
    ),
  ].slice(0, 2);
for (const [code, p] of Object.entries(map.propositions) as [string, Json][]) {
  const text = propositionText.get(code)!;
  const strand =
    code[0] === 'G'
      ? 'the explosive-growth debate'
      : 'mainstream economics and machine intelligence';
  addOnce('entities', {
    id: p.id,
    name: p.name,
    type: 'concept',
    subtype: 'Proposition',
    aliases: text.statement === p.name ? [] : [text.statement],
    description: `A proposition about the economics of machine intelligence, recorded with one criterion so that texts can be classified against it (code ${code}, ${strand}). It is phrased generically and attributed to no one. A record says what a text states, not whether the proposition is true.`,
    sourceIds: firstSourcesOf(code),
    proposition: { code, criterion: text.criterion, terms: [] },
  });
}

// Documents and sources.
const quoteCheckOf = (p: Passage) => quoteCheck?.passages?.[p.id];
for (const [key, s] of packSources) {
  const { entity, source, mapped } = documentOf(key);
  const authors: string[] = mapped.authors ?? s.authors;
  const title = normal(s.title);
  const year = String(s.date.value).slice(0, 4);
  if (!mapped.existing && !added.entities.some((e) => e.id === entity))
    addOnce('entities', {
      id: entity,
      name: title,
      shortName: `${citeAuthors(authors)}, ${title.split(/[:?]/)[0].trim()} (${s.date.attested ? 'undated' : year})`,
      type: 'document',
      subtype: mapped.subtype,
      aliases: [],
      description:
        `${title}, by ${authors.join(', ')}. ${s.venue}${/[.)]$/.test(s.venue) ? '' : '.'}`.slice(
          0,
          600,
        ),
      sourceIds: [source],
    });
  else if (mapped.existing) {
    // An existing document gains a source: record it in a patch below.
  } else {
    const e = added.entities.find((x) => x.id === entity)!;
    (e.sourceIds as string[]).push(source);
  }
  let version: string;
  let canonicalUrl: string;
  let evidenceUrl: string;
  let archived: Json = {};
  let accessedAt: string;
  if (s.pack === 'g') {
    const r: Json =
      s.retrieval.find((x: Json) => x.key === s.cacheKeys[0]) ?? s.retrieval[0];
    canonicalUrl = unWayback(r.url);
    evidenceUrl = viewable(r.url);
    archived = {
      archivedUrl: viewable(r.url),
      archivedAt: captureDate(r.waybackCapture),
    };
    accessedAt = r.retrievedAt;
    const versions = (s.versions ?? [])
      .map((v: Json) => `${v.version} (${v.date}): ${v.status}`)
      .join('; ');
    version = [
      `${sentence(s.checkedExpression)} Capture retrieved ${r.retrievedAt} (SHA-256 ${r.sha256}).`,
      versions ? `Versions: ${versions}.` : '',
      s.publishedVersion
        ? `Published version: ${s.publishedVersion.apa} ${s.publishedVersion.note ?? ''}`
        : '',
    ]
      .filter(Boolean)
      .join(' ')
      .trim();
  } else {
    canonicalUrl = s.url;
    evidenceUrl = s.url;
    accessedAt = String(s.retrieval.retrievedAt).slice(0, 10);
    version = [
      `${sentence(s.expression.replace(/^./, (c: string) => c.toUpperCase()))} SHA-256 ${s.retrieval.sha256}.`,
      s.notRetrieved
        ? `${s.notRetrieved.note} ${s.notRetrieved.references.join(' ')}`
        : '',
    ]
      .filter(Boolean)
      .join(' ')
      .replace(/_/g, '');
  }
  const count: number | null = s.documentWords?.count ?? null;
  let documentWords: Json;
  if (count) documentWords = { count, basis: s.documentWords.method };
  else {
    const [from, to] = mapped.pages;
    const perPage = mapped.wordsPerPage ?? 400;
    documentWords = {
      count: (to - from + 1) * perPage,
      basis: `Estimated at admission from the ${to - from + 1} printed pages (${from}–${to}) at ${perPage} words a page; ${s.documentWords?.method ?? 'the full text was not retrieved'}.`,
    };
  }
  addOnce('sources', {
    id: source,
    documentId: entity,
    title,
    authors,
    publisher: s.venue,
    publicationDate: s.date.attested ? null : s.date.value,
    version,
    canonicalUrl,
    evidenceUrl,
    language: 'en',
    ...archived,
    documentWords,
    kind: mapped.kind,
    accessedAt,
    reuse: {
      attribution: `${authors.join(', ')}, “${title}”, ${s.venue}${s.date.attested ? '' : ', ' + s.date.value}.`,
      licence: 'No open redistribution licence asserted',
      note: 'Bibliographic metadata, editorial paraphrases and short attributed quotations (at most 50 words each). Recheck terms before wider redistribution.',
    },
  });
}

// Records: one per text, proposition and stance.
type Group = {
  key: string;
  code: string;
  stance: 'articulates' | 'contests' | 'bears_on';
  doc: ReturnType<typeof documentOf>;
  passages: Passage[];
};
const groups = new Map<string, Group>();
for (const p of passages) {
  const stance = stanceOf[p.relation];
  const doc = documentOf(`${p.pack}:${p.source}`);
  const key = [p.code, doc.entity, stance].join('|');
  const g: Group = groups.get(key) ?? {
    key,
    code: p.code,
    stance,
    doc,
    passages: [],
  };
  g.passages.push(p);
  groups.set(key, g);
}
const claimIdOf = new Map<string, string>(); // pack passage → claim
for (const g of groups.values())
  for (const p of g.passages)
    claimIdOf.set(
      p.id,
      `ec-${g.code.toLowerCase()}-${g.doc.entity}-${suffixOf[g.stance]}`,
    );

const voiced = (p: Passage) =>
  ['relay', 'reported', 'rejected-view'].includes(p.voice) ||
  p.register === 'relay';
const voiceNote: Record<string, string> = {
  reported:
    'The passage reports a view the author does not state as their own.',
  'rejected-view': 'The passage characterises a view the authors reject.',
  relay: 'The passage relays another author’s words.',
};
const modelScenario = (p: Passage) =>
  (p.flags ?? []).includes('model scenario');

for (const g of groups.values()) {
  const proposition = map.propositions[g.code];
  const claimId = claimIdOf.get(g.passages[0].id)!;
  const s = g.doc.s;

  // Dates: the work's date, then any attested or claimed date.
  const notes: string[] = [s.date.basis];
  if (s.pack === 'm')
    notes.push(
      'Checked in a current copy; an archive capture was not available, so earlier bytes are not authenticated.',
    );
  const attested = s.attested
    ? { date: s.attested.value, note: s.attested.basis }
    : undefined;
  const claimed = s.claimed
    ? { date: s.claimed.value, note: s.claimed.basis }
    : undefined;

  // Roles: earliest located within tier 1, and separately within tier 2.
  const roles = new Set<string>();
  for (const p of g.passages)
    for (const role of p.roles ?? [])
      if (role === 'earliest-located' || role === 'earliest-located-tier-2') {
        if (g.stance === 'bears_on')
          throw new Error('Earliest located on a bears-on passage: ' + p.id);
        roles.add(role);
      }
  if (g.stance === 'contests') roles.add('contesting');
  else if (g.stance === 'bears_on') roles.add('context');
  else if (!roles.size) roles.add('articulation');
  const tier = s.pack === 'g' ? s.tier : { value: s.tier, basis: s.tierBasis };

  // Engagement: the message-level rule. A record engages a premise when any of
  // its passages, read with its section, turn or message, does.
  let engagement: Json | undefined;
  const engagementNotes: string[] = [];
  if (g.stance === 'contests') {
    const kinds = g.passages.map((p) => p.engagement);
    if (kinds.some((k) => !k)) throw new Error('No engagement: ' + g.key);
    const rationales = [
      ...new Set(
        g.passages.map((p) => {
          const [first, rest] = firstSentence(p.engagementRationale);
          if (rest) engagementNotes.push(`Engagement (${p.id}): ${rest}`);
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
  const estimates = g.passages
    .filter((p) => p.estimate)
    .map((p) => {
      const { holder, value, horizon, definition, conditional, conditions } =
        p.estimate;
      return {
        holder,
        value,
        horizon,
        definition,
        conditional,
        ...(conditions ? { conditions } : {}),
      };
    });
  const scenario = g.passages.some(modelScenario);
  const register = g.passages.every(voiced) ? 'relay' : 'nonfiction';

  const authors: string[] = g.doc.mapped.authors ?? s.authors;
  const speakers = [
    ...new Set(g.passages.map((p) => p.speaker).filter(Boolean)),
  ] as string[];
  const title = normal(s.title);
  const parts = (named: boolean) => [
    `${citeAuthors(authors)}${named ? `, “${title}”` : ''} (${s.date.value}) ${verbOf[g.stance]} ${g.code}.`,
    speakers.length
      ? `${speakers.length > 1 ? 'Speakers' : 'Speaker'}: ${speakers.join('; ')}.`
      : '',
    ...g.passages.map((p) => sentence(p.context)),
  ];
  // The title is left out where the statement would exceed its length limit.
  const statement = [true, false]
    .map((named) => parts(named).filter(Boolean).join(' '))
    .find((x, i) => i === 1 || x.length <= 800)!;
  const qualification = g.passages
    .map((p) => {
      const parts = [
        p.voice && voiceNote[p.voice] ? voiceNote[p.voice] : '',
        p.voice === 'dialogue-turn' && p.speaker
          ? `The quotation is a turn by ${p.speaker} in a dialogue.`
          : '',
        p.qualification ? sentence(p.qualification) : '',
        modelScenario(p) ? sentence(p.modelScenario) : '',
        p.formerly
          ? `Recorded under ${p.formerly.split('-')[0]} as ${p.formerly} before the correction pass of 2026-10-10.`
          : '',
      ].filter(Boolean);
      return parts.length
        ? (g.passages.length > 1 ? `(${p.id}) ` : '') + parts.join(' ')
        : '';
    })
    .filter(Boolean)
    .concat(engagementNotes)
    .join(' ');

  const evidenceIds: string[] = [];
  for (const p of g.passages) {
    const v = verification[p.pack].passages[p.id];
    if (!v) throw new Error('Not verified: ' + p.id);
    const id = `evidence-ec-${p.id.toLowerCase()}`;
    evidenceIds.push(id);
    const change: Json | undefined = map.quoteChanges[p.id];
    if (change?.quote && !normal(p.quote).includes(normal(change.quote)))
      throw new Error('A shortened quotation must come from the pack: ' + p.id);
    const quote = change?.quote ?? p.quote;
    const recheck = quoteCheckOf(p);
    const checkedAt: string =
      recheck?.result === 'match'
        ? date
        : (p.checkedAt ?? verification[p.pack].checkedAt ?? '2026-10-12');
    const matched =
      p.pack === 'g'
        ? `matched the checked expression (${v.checkedAgainst}) in the pack's verification${
            Object.entries(v).some(([, x]) => x === 'absent')
              ? '; one other cached version lacks it'
              : ''
          }.`
        : `matched the retrieved current copy (SHA-256 ${s.retrieval.sha256}) in the pack's verification.`;
    const ctx = p.contextOnly;
    added.evidence.push({
      id,
      claimId,
      sourceId: g.doc.source,
      sourceRole: 'primary',
      support: 'supports',
      locator: p.locator,
      passage: quote,
      passageType: 'quote',
      verification: 'machine_checked',
      checkedAt,
      note: `Candidate pack passage ${p.id} (${packName[p.pack]}). The quotation (${words(quote)} words) ${matched}${
        recheck?.result === 'match'
          ? ` Re-checked at admission on ${date} against a copy retrieved that day${recheck.sha256Matches === false ? ', whose SHA-256 differs from the recorded one' : ''}.`
          : ''
      }${change ? ' ' + change.reason : ''}`,
      ...(ctx
        ? {
            contextOnly: {
              reason: ctx.reason,
              requires: ctx.requires,
              ...(ctx.claimIds
                ? {
                    claimIds: (ctx.claimIds as string[]).map((x) => {
                      const target = claimIdOf.get(x);
                      if (!target)
                        throw new Error(`Unknown context ${x} for ${p.id}`);
                      return target;
                    }),
                  }
                : {}),
            },
          }
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
    ...(claimed ? { claimed } : {}),
    ...(attested ? { attested } : {}),
    ...(engagement ? { engagement } : {}),
    tier: { value: tier.value, basis: tier.basis },
    ...(conditions ? { conditions } : {}),
    ...(estimates.length ? { estimates } : {}),
  };
  added.claims.push({
    id: claimId,
    subject: g.doc.entity,
    predicate: predicateOf[g.stance],
    object: { kind: 'entity', entityId: proposition.id },
    topic: 'ideas',
    statement,
    time: {
      kind: 'event',
      date: s.date.value,
      ...(s.date.attested || /^hearings/.test(s.id)
        ? {}
        : { basis: 'publication' }),
      note: [...new Set(notes)].join(' '),
    },
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

// Context-only claimIds may point to a record of the same group.
for (const e of added.evidence) {
  const c = (e as Json).contextOnly;
  if (c?.claimIds) {
    c.claimIds = c.claimIds.filter((x: string) => x !== e.claimId);
    if (!c.claimIds.length) delete c.claimIds;
  }
}

// Quotation limits per document, counted across its sources, with a passage
// quoted twice counted once (editorial policy, short quotation).
const quoted = new Map<string, Map<string, number>>();
for (const e of added.evidence) {
  const source = added.sources.find((s) => s.id === e.sourceId)!;
  const doc = source.documentId as string;
  const set = quoted.get(doc) ?? new Map<string, number>();
  set.set(normal(e.passage as string), words(e.passage as string));
  quoted.set(doc, set);
}
const overLimit: string[] = [];
for (const [doc, set] of quoted) {
  const passagesOf = [...set.keys()];
  // A quotation contained in another quotation of the same document is not
  // counted again.
  const total = [...set.entries()]
    .filter(
      ([q]) =>
        !passagesOf.some(
          (other) =>
            other !== q &&
            other.replace(/ … /g, ' ').includes(q.replace(/ … /g, ' ')),
        ),
    )
    .reduce((n, [, w]) => n + w, 0);
  const lengths = added.sources
    .filter((s) => s.documentId === doc)
    .map((s) => (s.documentWords as Json).count as number);
  const limit = Math.min(
    ...lengths.map((l) => (l < 2000 ? Math.floor(l / 10) : 400)),
  );
  if (total > limit) overLimit.push(`${doc}: ${total} > ${limit}`);
}
if (overLimit.length)
  throw new Error('Quoted words over the limit: ' + overLimit.join('; '));

// ---------------------------------------------------------------- output
const meta = {
  ...base.meta,
  schemaVersion: '2.13',
  updatedAt: date,
  scope:
    base.meta.scope +
    ' Schema 2.13 adds a collection on the economics of machine intelligence: dated passages from 1952 to 2024 that state, contest or bear on 19 generically phrased propositions about explosive growth and about how mainstream economics treated automation and AI, with each text’s source tier, model conditions and stated estimates, admitted 2026-10-14 from two machine-prepared, machine-audited and cross-family-checked candidate packs. A record says what a text states, not whether an argument or model is right.',
};
const patched: Row[] = [];
const patchedEntities = base.entities.map((r) => {
  const sourcesAdded = [...packSources.keys()]
    .map((key) => documentOf(key))
    .filter((d) => d.mapped.existing && d.entity === r.id)
    .map((d) => d.source);
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
    'Records as stored at main 9aec14d (schema 2.12) before the admission of the economics candidate packs on 2026-10-14: the earlier metadata and the IDs the admission added. The admission changed one stored row: the document hanson-1994-if-uploads-come-first gained the source for the web reprint the growth pack quotes. The test-only historical view removes these rows and restores the earlier metadata and row.',
  baseCommit: '9aec14d',
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
  } else console.log('Stored records match the packs and the map.');
} else {
  for (const [path, value] of Object.entries(outputs))
    writeFileSync(path, JSON.stringify(value, null, 2) + '\n');
  execFileSync(
    process.platform === 'win32' ? 'pnpm.cmd' : 'pnpm',
    ['prettier', '--write', ...Object.keys(outputs)],
    { stdio: 'ignore', shell: process.platform === 'win32' },
  );
  console.log(
    `Added ${names.map((n) => `${added[n].length} ${n}`).join(', ')}; ${groups.size} records from ${passages.length} passages.`,
  );
}
