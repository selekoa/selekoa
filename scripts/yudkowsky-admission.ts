// Admits the Yudkowsky argument pack (research/yudkowsky-arguments/pack.json)
// as schema 2.12 proposition records, using the authored map in
// review/yudkowsky-admission-map-2026-10-08.json.
//
//   pnpm tsx scripts/yudkowsky-admission.ts           write the records
//   pnpm tsx scripts/yudkowsky-admission.ts --check   compare with the stored records
//
// The script is idempotent: it first removes the rows listed as added in the
// before-snapshot (review/yudkowsky-admission-before-2026-10-08.json), then
// rebuilds them. The pack itself is never changed.
import { createHash } from 'node:crypto';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';

const date = '2026-10-08';
const files = {
  pack: 'research/yudkowsky-arguments/pack.json',
  verification: 'research/yudkowsky-arguments/verification.json',
  map: `review/yudkowsky-admission-map-${date}.json`,
  snapshot: `review/yudkowsky-admission-before-${date}.json`,
};
const names = ['entities', 'claims', 'sources', 'evidence'] as const;
type Name = (typeof names)[number];
type Row = Record<string, unknown> & { id: string };
type Json = Record<string, any>; // eslint-disable-line @typescript-eslint/no-explicit-any

const read = (path: string) => JSON.parse(readFileSync(path, 'utf8'));
const pack: Json = read(files.pack);
const verification: Json = read(files.verification);
const map: Json = read(files.map);
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

// ---------------------------------------------------------------- helpers
const sources = new Map<string, Json>(pack.sources.map((s: Json) => [s.id, s]));
const passages: Json[] = pack.takes.flatMap((t: Json) =>
  t.passages.map((p: Json) => ({ ...p, take: t.id })),
);
const premiseText = new Map<string, string>(
  pack.takes.flatMap((t: Json) =>
    t.premises.map((p: Json) => [p.id, p.text as string]),
  ),
);
const takeCode = (take: string) => 'Y' + take.slice(1);
const stanceOf: Record<string, 'articulates' | 'contests' | 'bears_on'> = {
  'said-it': 'articulates',
  'earlier-self': 'articulates',
  'answered-it': 'contests',
  disagrees: 'contests',
  related: 'bears_on',
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
const slug = (s: string, words = 6) =>
  s
    .normalize('NFKD')
    .replace(/\p{Mn}/gu, '')
    .toLowerCase()
    .replace(/['’]/g, '')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()
    .split(' ')
    .slice(0, words)
    .join('-');
// "A capable…" → "a capable…"; "AI training…" stays.
const lowerFirst = (s: string) =>
  /^[A-Z][A-Z]/.test(s) ? s : s[0].toLowerCase() + s.slice(1);
const premiseClause = (id: string) =>
  lowerFirst(premiseText.get(id)!.replace(/\.$/, ''));

/** The document entity and source a pack source becomes. */
function documentOf(packSourceId: string) {
  const s = sources.get(packSourceId)!;
  const mapped: Json = map.documents[packSourceId] ?? {};
  if (mapped?.source)
    return {
      entity: mapped.entity as string,
      source: mapped.source as string,
      mapped,
      s,
    };
  if (mapped?.newSource)
    return { entity: mapped.entity, source: mapped.newSource, mapped, s };
  let entity: string;
  if (mapped?.entity) entity = mapped.entity;
  else if (packSourceId.startsWith('sl4-'))
    entity = `sl4-${s.date.value}-yudkowsky-${packSourceId.slice(4)}`;
  else if (packSourceId.startsWith('ext-'))
    entity = `extropians-${s.date.value}-yudkowsky-${packSourceId.split('-').at(-1)}`;
  else if (packSourceId.startsWith('lw-'))
    entity = `lw-${s.date.value.slice(0, 4)}-${slug(s.title)}`;
  else throw new Error('Unmapped document: ' + packSourceId);
  return { entity, source: 'source-' + entity, mapped, s };
}

const venueKind = (id: string) =>
  id.startsWith('sl4-')
    ? 'SL4 message'
    : id.startsWith('ext-')
      ? 'Extropians message'
      : id.startsWith('lw-')
        ? 'post'
        : 'text';

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
for (const take of pack.takes) {
  const p = map.propositions[take.id];
  if (!p) throw new Error('No proposition for ' + take.id);
  const firstSources = [
    ...new Set(
      take.passages.map((x: Json) => documentOf(x.source).source as string),
    ),
  ].slice(0, 2) as string[];
  addOnce('entities', {
    id: p.id,
    name: p.name,
    type: 'concept',
    subtype: 'Proposition',
    aliases: [take.take],
    description: `A proposition about advanced AI, recorded with one criterion so that texts can be classified against it (code ${takeCode(take.id)} in the collection of Eliezer Yudkowsky’s arguments). It is phrased generically and attributed to no one. A record says what a text states, not whether the proposition is true.`,
    sourceIds: firstSources,
    proposition: {
      code: takeCode(take.id),
      criterion: p.criterion,
      terms: [],
    },
  });
}

// Documents and sources.
const captureSourcesAdded = new Set<string>();
for (const packSource of pack.sources) {
  const { entity, source, mapped, s } = documentOf(packSource.id);
  if (mapped?.source) continue; // existing document and source
  const authors: string[] = map.coauthors[packSource.id] ?? s.authors;
  const message = /^(sl4|ext)-/.test(packSource.id);
  const list = packSource.id.startsWith('sl4-') ? 'SL4' : 'Extropians';
  const isLw = packSource.id.startsWith('lw-');
  const title: string = (mapped?.name ?? s.title).replace(/\s+/g, ' ');
  if (!existing('entities', entity)) {
    addOnce('entities', {
      id: entity,
      name: title,
      shortName: message
        ? `Yudkowsky, ${list} message of ${s.date.value} (${packSource.id.split(/[-.]/).at(-1)})`
        : `${authors.length > 1 ? authors.map((a) => a.split(' ').at(-1)).join(' and ') : 'Yudkowsky'}, ${title} (${s.date.value.slice(0, 4)})`,
      type: 'document',
      subtype: message
        ? 'Mailing-list message'
        : isLw
          ? 'Forum post'
          : mapped.subtype,
      aliases: [],
      description: message
        ? `A message by Eliezer Yudkowsky to the ${list} mailing list, dated ${s.date.value} by the archive’s author index, in the thread “${s.title.replace(/^(Re: )+/, '').replace(/^\[SL4\] /, '')}”.`
        : isLw
          ? `A post ${authors.length > 1 ? 'by ' + authors.join(' and ') : 'by Eliezer Yudkowsky'} dated ${s.date.value}${s.venue === 'LessWrong' ? ' on LessWrong' : ', first published on Overcoming Bias and now hosted on LessWrong'}.`
          : `${title}, by ${authors.join(' and ')}, dated ${s.date.value}; read in the copy described by its source record.`,
      sourceIds: [source],
    });
  }
  const words = s.documentWords ?? mapped?.words;
  const version = isLw
    ? `Post body retrieved through the LessWrong GraphQL API on ${s.retrieval.retrievedAt} (SHA-256 ${s.retrieval.sha256}), content version ${s.version.current}${s.version.postingDay ? `; quotations also compared with the posting-day version ${s.version.postingDay}` : ''}.`
    : message
      ? `Archive HTML as served, retrieved ${s.retrieval.retrievedAt} (SHA-256 ${s.retrieval.sha256}); quoted lines excluded when reading the author’s text. The served archive shows later URL rewriting and does not authenticate historical bytes.`
      : `${s.venue}, retrieved ${s.retrieval.retrievedAt} (SHA-256 ${s.retrieval.sha256}). ${s.date.basis}`;
  addOnce('sources', {
    id: source,
    documentId: entity,
    title: message ? `${title} (${list} mailing list)` : title,
    authors,
    publisher: message
      ? list === 'SL4'
        ? 'SL4 mailing list (archive at sl4.org)'
        : 'Extropians mailing list (archive at extropians.weidai.com)'
      : (mapped?.publisher ?? s.venue),
    publicationDate: s.date.value,
    version,
    canonicalUrl: s.url,
    evidenceUrl: s.url,
    language: 'en',
    documentWords: { count: words.count, basis: words.basis },
    kind: message ? 'message' : isLw ? 'post' : mapped.kind,
    accessedAt: s.retrieval.retrievedAt,
    reuse: {
      attribution: `${authors.join(' and ')}, “${title}”, ${message ? list + ' mailing list' : s.venue}, ${s.date.value}.`,
      licence: mapped?.licence ?? 'No open redistribution licence asserted',
      note: 'Bibliographic metadata, editorial paraphrases and short attributed quotations (at most 50 words each). Recheck terms before wider redistribution.',
    },
  });
  for (const capture of Object.values(
    (mapped?.captures ?? {}) as Record<string, Json>,
  )) {
    if (!capture.title || captureSourcesAdded.has(capture.source)) continue;
    captureSourcesAdded.add(capture.source);
    addOnce('sources', {
      id: capture.source,
      documentId: entity,
      title: capture.title,
      authors: ['Eliezer Yudkowsky'],
      publisher: 'Singularity Institute for Artificial Intelligence',
      publicationDate: '2001-06-15',
      version: `Raw Internet Archive capture of ${capture.archivedAt}, retrieved ${date} (SHA-256 ${capture.sha256}); used to date wording also quoted from MIRI’s reprint, not quoted itself.`,
      canonicalUrl: capture.canonicalUrl,
      evidenceUrl: capture.archivedUrl,
      language: 'en',
      archivedUrl: capture.archivedUrl,
      archivedAt: capture.archivedAt,
      kind: 'report',
      accessedAt: date,
      reuse: {
        attribution:
          'Eliezer Yudkowsky, Creating Friendly AI 1.0 (Singularity Institute for Artificial Intelligence, 2001).',
        licence: 'No open redistribution licence asserted',
        note: 'Bibliographic metadata and labelled paraphrases. Recheck terms before wider redistribution.',
      },
    });
  }
}

// Records: one per text, proposition and stance.
type Group = {
  key: string;
  take: string;
  stance: 'articulates' | 'contests' | 'bears_on';
  doc: ReturnType<typeof documentOf>;
  passages: Json[];
};
const groups = new Map<string, Group>();
for (const p of passages) {
  const stance = stanceOf[p.relation];
  const doc = documentOf(p.source);
  const key = [p.take, doc.entity, stance].join('|');
  const g: Group = groups.get(key) ?? {
    key,
    take: p.take,
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
      `yk-${takeCode(g.take).toLowerCase()}-${g.doc.entity}-${suffixOf[g.stance]}`,
    );

const claimedIds = new Set(['T21-b', 'T21-e', 'T24-c', 'T28-c']);
const attestedIds = new Set(['T03-c']);
const unmapped: Json[] = [];

for (const g of groups.values()) {
  const proposition = map.propositions[g.take];
  const code = takeCode(g.take);
  const claimId = claimIdOf.get(g.passages[0].id)!;
  const s = g.doc.s;
  const mapped = g.doc.mapped;

  // Dates: the work's date, then any attested or claimed date.
  let workDate: string = s.date.value;
  const notes: string[] = [];
  let attested: { date?: string; note: string } | undefined;
  let claimed: { date: string; note: string } | undefined;
  const evidenceExtra: Row[] = [];
  if (mapped?.date) {
    workDate = mapped.date;
    notes.push(mapped.dateNote);
  } else if (mapped?.draft) {
    workDate = mapped.draft.date;
    notes.push(mapped.draft.note);
  } else {
    notes.push(
      `${s.date.basis}${/^day/.test(s.date.precision) ? '' : ` Precision: ${s.date.precision}.`}`,
    );
  }
  const attestations: { date?: string; note: string }[] = [];
  for (const p of g.passages) {
    const own = documentOf(p.source);
    const mapped = own.mapped;
    if (p.sentHeader) notes.push(`Sent header: ${p.sentHeader}.`);
    if (p.expressionDate) {
      if (attestedIds.has(p.id))
        attestations.push({
          date: p.expressionDate.value,
          note: p.expressionDate.basis,
        });
      else if (claimedIds.has(p.id))
        claimed = {
          date: p.expressionDate.value,
          note: p.expressionDate.basis,
        };
      else notes.push(p.expressionDate.basis);
    }
    const capture = mapped?.passageCaptures?.[p.id];
    if (own.s.id === 'doc-cfai') {
      if (capture) {
        const c = mapped.captures[capture];
        attestations.push({
          date: c.archivedAt,
          note: `The quoted wording also appears in the 2001 HTML edition as captured on ${c.archivedAt}; the quotation itself is taken from MIRI’s later reprint.`,
        });
        evidenceExtra.push({
          id: `evidence-yk-${p.id.toLowerCase()}-2001`,
          claimId,
          sourceId: c.source,
          sourceRole: 'primary',
          support: 'supports',
          locator: `The 2001 HTML edition, page ${c.canonicalUrl.split('/').at(-1)}`,
          passage: `The same wording as the quotation from MIRI’s reprint appears in the 2001 HTML edition captured on ${c.archivedAt}.`,
          passageType: 'paraphrase',
          verification: 'machine_checked',
          checkedAt: date,
          note: `Compared on ${date} after normalising quotation marks, dashes and whitespace.`,
        });
      } else attestations.push(mapped.attested);
    } else if (mapped?.draft) {
      evidenceExtra.push({
        id: `evidence-yk-${p.id.toLowerCase()}-draft`,
        claimId,
        sourceId: mapped.draft.source,
        sourceRole: 'primary',
        support: 'supports',
        locator: 'Draft of 5 February 2006, as captured on 2006-07-08',
        passage:
          p.id === 'T13-a'
            ? 'The same wording, with one difference in punctuation around the inner quotation, appears in the draft dated 5 February 2006.'
            : 'The same wording appears in the draft dated 5 February 2006.',
        passageType: 'paraphrase',
        verification: 'machine_checked',
        checkedAt: date,
        note: `Compared on ${date} with the draft's PDF text layer after normalising quotation marks, dashes and whitespace. The draft asks not to be quoted without permission, so it is cited for the presence and date of the wording only.`,
      });
    } else if (mapped?.attested) attestations.push(mapped.attested);
  }
  if (attestations.length) {
    const dated = attestations
      .filter((a) => a.date)
      .sort((a, b) => a.date!.localeCompare(b.date!));
    attested = {
      ...(dated[0] ? { date: dated[0].date } : {}),
      note: [
        ...new Set(
          [...attestations]
            .sort((a, b) => (a.date ?? '9999').localeCompare(b.date ?? '9999'))
            .map((a) => a.note),
        ),
      ].join(' '),
    };
  }

  // Roles: earliest located where the schema allows it; "strongest" stays out.
  const roles = new Set<string>();
  roles.add(
    g.stance === 'articulates'
      ? 'articulation'
      : g.stance === 'contests'
        ? 'contesting'
        : 'context',
  );
  for (const p of g.passages) {
    for (const role of p.roles) {
      if (role === 'later-restatement') roles.add(role);
      else if (role === 'earliest-located') {
        if (g.stance === 'bears_on')
          unmapped.push({
            passage: p.id,
            item: 'earliest-located role on a related passage',
            reason:
              'Schema 2.12 allows earliest located on articulating and contesting records only.',
          });
        else roles.add(role);
      }
    }
  }
  if (roles.has('earliest-located') && g.stance === 'articulates')
    roles.delete('articulation');

  // Engagement: the message-level rule.
  let engagement: Json | undefined;
  if (g.stance === 'contests') {
    const engaging = g.passages.filter((p) => p.relation === 'answered-it');
    const contrary = g.passages.filter((p) => p.relation === 'disagrees');
    const premiseOf = (ps: Json[]) =>
      [...new Set(ps.map((p) => p.premise as string))]
        .map((id) => `the premise that ${premiseClause(id)}`)
        .join(', and against ');
    engagement =
      engaging.length && contrary.length
        ? {
            kind: 'engages-premise',
            rationale: `Under the message-level rule, one passage, read with the message or dialogue turn it belongs to, gives a reason against ${premiseOf(engaging)}, while another states the contrary conclusion only.`,
          }
        : engaging.length
          ? {
              kind: 'engages-premise',
              rationale: `Under the message-level rule, the passage, read with the paragraph, message or dialogue turn it belongs to, gives a reason against ${premiseOf(engaging)}.`,
            }
          : {
              kind: 'contrary-only',
              rationale: `Under the message-level rule, the passage states the contrary conclusion without giving a reason against ${premiseOf(contrary)}, even when read with its message or dialogue turn.`,
            };
  }

  // Retrospective self-report.
  const retro = g.passages
    .map((p) => map.retrospective[p.id])
    .filter(Boolean) as Json[];
  const retrospective = retro.length
    ? {
        ...(retro[0].from ? { from: retro[0].from } : {}),
        ...(retro[0].until ? { until: retro[0].until } : {}),
        note: retro.map((r) => r.note).join(' '),
      }
    : undefined;

  const missing =
    g.stance === 'bears_on'
      ? g.passages
          .map((p) => {
            const m = map.missing[p.id];
            if (!m) throw new Error('No missing element for ' + p.id);
            return m;
          })
          .join(' ')
      : undefined;

  const register = g.passages.some((p) => p.voice === 'fiction')
    ? 'fiction'
    : 'nonfiction';
  const title = (mapped?.name ?? s.title).replace(/\s+/g, ' ');
  const label =
    g.doc.entity === 'staring-into-the-singularity'
      ? 'Staring into the Singularity'
      : g.doc.entity === 'creating-friendly-ai-2001'
        ? 'Creating Friendly AI'
        : g.doc.entity === 'ai-positive-negative-factor-global-risk'
          ? 'Artificial Intelligence as a Positive and Negative Factor in Global Risk'
          : g.doc.entity === 'iem-2013'
            ? 'Intelligence Explosion Microeconomics'
            : title;
  const statement = `${venueKind(s.id) === 'text' ? '' : 'The ' + venueKind(s.id) + ' '}“${label}” (${workDate}) ${verbOf[g.stance]} ${code}. ${g.passages.map((p) => p.context).join(' ')}`;
  const qualification = g.passages
    .map((p) => {
      const premise = `Premise addressed: ${premiseText.get(p.premise)}`;
      const voice =
        p.voice === 'dialogue-turn'
          ? ' The quotation is a turn attributed to Yudkowsky in a dialogue.'
          : p.voice === 'fiction'
            ? ' The quotation is spoken by a character in a staged dialogue he wrote.'
            : '';
      const own = documentOf(p.source).mapped;
      const checked = own?.passageCaptures?.[p.id]
        ? ` Admission check, ${date}: the quoted wording also appears in the 2001 HTML edition, so it is dated by that capture.`
        : own?.draft
          ? ` Admission check, ${date}: the quoted wording also appears in the draft of 5 February 2006, so the record is dated by the draft.`
          : '';
      return `${g.passages.length > 1 ? `(${p.locator}) ` : ''}${premise}${voice}${p.qualification ? ' ' + p.qualification : ''}${checked}`;
    })
    .join(' ');

  const evidenceIds: string[] = [];
  for (const p of g.passages) {
    const own = documentOf(p.source);
    const s = own.s;
    const v = verification.passages[p.id];
    const id = `evidence-yk-${p.id.toLowerCase()}`;
    evidenceIds.push(id);
    const ctx = map.contextOnly[p.id];
    if (!!p.cardUse !== !!ctx)
      throw new Error('Context-only mapping mismatch for ' + p.id);
    const posting =
      v.postingDayVersion === 'match'
        ? ` It also matched the posting-day version ${s.version?.postingDay ?? '1.0.0'}.`
        : v.postingDayVersion === 'absent'
          ? ` It is absent from the posting-day version ${s.version?.postingDay ?? '1.0.0'}, so it is a later addition.`
          : v.postingDayVersion
            ? ` The posting-day version was ${v.postingDayVersion}.`
            : '';
    const change: Json | undefined = map.quoteChanges[p.id];
    if (change?.quote) {
      const normal = (x: string) => x.replace(/\s+/g, ' ').trim();
      const reused = base.evidence.some(
        (e) => e.sourceId === own.source && e.passage === change.quote,
      );
      if (!reused && !normal(p.quote).includes(normal(change.quote)))
        throw new Error(
          'A shortened quotation must come from the pack: ' + p.id,
        );
    }
    added.evidence.push({
      id,
      claimId,
      sourceId: own.source,
      sourceRole: 'primary',
      support: 'supports',
      locator: p.locator,
      passage: change?.paraphrase ?? change?.quote ?? p.quote,
      passageType: change?.paraphrase ? 'paraphrase' : 'quote',
      verification: 'machine_checked',
      checkedAt: p.checkedAt,
      note: `Candidate pack passage ${p.id}. The quotation (${v.words} words) matched the retrieved expression (${s.retrieval.sha256 ? 'SHA-256 ' + s.retrieval.sha256 : 'hash in the pack'}) when checked on ${p.checkedAt}.${posting}${p.versionNote ? ' Pack version note: ' + p.versionNote + '.' : ''}${change ? ' ' + change.reason : ''}`,
      ...(ctx
        ? {
            contextOnly: {
              reason: p.cardUse.reason.replace(/^./, (c: string) =>
                c.toUpperCase(),
              ),
              requires: ctx.requires,
              ...(ctx.passages
                ? {
                    claimIds: [
                      ...new Set(
                        (ctx.passages as string[]).map((x) => {
                          const target = claimIdOf.get(x);
                          if (!target)
                            throw new Error(`Unknown context ${x} for ${p.id}`);
                          return target;
                        }),
                      ),
                    ].filter((x) => x !== claimId),
                  }
                : {}),
            },
          }
        : {}),
    });
  }
  for (const e of evidenceExtra) {
    evidenceIds.push(e.id);
    added.evidence.push(e);
  }

  const thought: Json = {
    roles: [...roles],
    register,
    ...(missing ? { missing } : {}),
    ...(claimed ? { claimed } : {}),
    ...(attested ? { attested } : {}),
    ...(engagement ? { engagement } : {}),
    ...(retrospective ? { retrospective } : {}),
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
      date: workDate,
      ...(mapped?.draft ? {} : { basis: 'publication' }),
      note: [...new Set(notes)].join(' '),
    },
    editorialState: 'seed',
    qualification,
    evidenceIds,
    recordedAt: date,
    derivation: 'explicit',
    resolution: 'supported',
    attributes: { thought },
  });
}

// Context-only claimIds may point to a record of the same group; drop empty lists.
for (const e of added.evidence) {
  const c = (e as Json).contextOnly;
  if (c?.claimIds && !c.claimIds.length) delete c.claimIds;
}

// ---------------------------------------------------------------- output
const meta = {
  ...base.meta,
  schemaVersion: '2.12',
  updatedAt: date,
  scope:
    base.meta.scope +
    ' Schema 2.12 adds a collection of Eliezer Yudkowsky’s documented arguments about common claims on advanced AI, 1996–2026: dated passages that state, contest or bear on 29 generically phrased propositions, with engagement, retrospective reports and context-only passages marked, admitted 2026-10-08 from a machine-prepared and machine-audited candidate pack. A record says what a text states, not whether it is right.',
};
const patched: Row[] = [];
const patchedSources = base.sources.map((r) => {
  const patch: Json | undefined = map.sourcePatches[r.id];
  if (!patch) return r;
  patched.push(r);
  const { reason, ...fields } = patch;
  void reason;
  return { ...structuredClone(r), ...fields };
});
const result = {
  meta,
  ...Object.fromEntries(names.map((n) => [n, [...base[n], ...added[n]]])),
  sources: [...patchedSources, ...added.sources],
} as unknown as { meta: Json } & Record<Name, Row[]>;

const newSnapshot = {
  description:
    'Records as stored at main e35af2d (schema 2.11) before the admission of the Yudkowsky argument pack on 2026-10-08: the earlier metadata and the IDs the admission added. The admission changed one stored row: it recorded the length of the source source-extropians-1996-11-19-yudkowsky, which it quotes. The test-only historical view removes these rows and restores the earlier metadata.',
  baseCommit: 'e35af2d',
  meta: base.meta,
  added: Object.fromEntries(names.map((n) => [n, added[n].map((r) => r.id)])),
  before: { entities: [], claims: [], sources: patched, evidence: [] },
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
    `Added ${names.map((n) => `${added[n].length} ${n}`).join(', ')}; ${unmapped.length} pack roles not carried over.`,
  );
  for (const u of unmapped)
    console.log(`Not carried over: ${u.passage}, ${u.item}.`);
}
