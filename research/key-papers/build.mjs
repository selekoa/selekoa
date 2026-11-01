// Assembles the key-papers candidate pack from selection.json, facts.json and the drafts.
//   node research/key-papers/build.mjs   -> pack.json, persons.json
// Nothing here is written to data/.
import { existsSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { DIR, ROOT, readJson, writeJson } from './tools.mjs';

const CHECK_DATE = '2026-10-28';
import { CURATION } from './curation.mjs';
const selRaw = readJson(join(DIR, 'selection.json'));
const sel = {
  ...selRaw,
  papers: selRaw.papers.map((p) => {
    const c = CURATION[p.id] ?? {};
    const { reason, ...fields } = c;
    return { ...p, ...fields, curation: reason ?? null };
  }),
};
const facts = new Map(readJson(join(DIR, 'facts.json')).map((f) => [f.id, f]));
const ents = readJson(join(ROOT, 'data', 'entities.json'));
const entById = new Map(ents.map((e) => [e.id, e]));
const dataSources = new Map(
  readJson(join(ROOT, 'data', 'sources.json')).map((s) => [s.id, s]),
);
const corpus = readJson(join(DIR, 'corpus.json'));
const entryName = new Map(
  corpus.map((d) => [d.document ?? d.sources[0].id, d.name]),
);
const claimsData = readJson(join(ROOT, 'data', 'claims.json'));

const strip = (s) =>
  s
    .replace(/[Łł]/g, (c) => (c === 'Ł' ? 'L' : 'l'))
    .replace(/[Øø]/g, (c) => (c === 'Ø' ? 'O' : 'o'))
    .normalize('NFD')
    .replace(/\p{M}/gu, '');
const nameKey = (n) =>
  strip(n)
    .toLowerCase()
    .replace(/[^a-z ]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
const slug = (n) => nameKey(n).replace(/ /g, '-');

// ---- documents and their versions -------------------------------------------------------------
const MONTH = (n) => String(n).padStart(2, '0');
function dateParts(parts) {
  if (!parts?.length) return null;
  const [y, m, d] = parts;
  return {
    date: [y, m && MONTH(m), d && MONTH(d)].filter(Boolean).join('-'),
    precision: d ? 'day' : m ? 'month' : 'year',
  };
}
const NOT_VENUE =
  /^(arxiv(\.org)?|corr|ssrn( electronic journal)?|social science research network|research square|biorxiv|medrxiv)$/i;

function documentRecord(p, f) {
  const versions = [];
  const sources = [];
  if (f?.abs) {
    const key = `${p.id}--abs`;
    sources.push({
      key,
      kind: 'arXiv abstract page',
      url: f.abs.url,
      httpStatus: f.abs.status,
      sha256: f.abs.sha256,
      retrievedAt: f.abs.retrievedAt,
      role: 'primary (submission history as recorded by arXiv)',
    });
    for (const v of f.arxivHistory?.versions ?? [])
      versions.push({
        kind: 'arXiv submission',
        label: `arXiv:${p.arxiv}${v.version}`,
        date: v.date,
        precision: 'day',
        basis: 'arXiv submission history (UTC)',
        source: key,
      });
  }
  if (f?.text) {
    const key = f.text.read.startsWith('dataset source')
      ? f.text.read.replace('dataset source ', '')
      : f.text.read;
    sources.push({
      key,
      kind: f.text.read.startsWith('dataset source')
        ? 'dataset source (corpus retrieval)'
        : f.arxiv
          ? 'arXiv PDF, v1'
          : 'text as published',
      url: f.text.url,
      httpStatus: f.text.status,
      sha256: f.text.sha256,
      words: f.text.words,
      retrievedAt: f.text.retrievedAt,
      role: 'primary',
    });
  }
  const s2 = f?.semanticScholar;
  if (s2) {
    const key = `${p.id}--s2`;
    sources.push({
      key,
      kind: 'Semantic Scholar record',
      url: `https://api.semanticscholar.org/graph/v1/paper/${s2.id}`,
      retrievedAt: CHECK_DATE,
      role: 'index (bibliographic dataset; venue and year as the index gives them)',
    });
    // Semantic Scholar's venue and year are not used: the same-family audit found the arXiv year
    // given as the publication year in most sampled cases.
  }
  const cr = f?.crossref;
  if (cr?.doi) {
    const key = `${p.id}--crossref`;
    sources.push({
      key,
      kind: 'Crossref record',
      url: `https://api.crossref.org/works/${cr.doi}`,
      retrievedAt: CHECK_DATE,
      role: 'index (publisher-deposited metadata)',
    });
    const d0 =
      dateParts(cr.publishedPrint) ??
      dateParts(cr.publishedOnline) ??
      dateParts(cr.issued);
    // Crossref day and month are often deposit placeholders; the year is kept.
    const d = d0 && { date: d0.date.slice(0, 4), precision: 'year' };
    if (d && cr.container && !NOT_VENUE.test(cr.container))
      versions.push({
        kind:
          cr.type === 'proceedings-article'
            ? 'conference publication'
            : cr.type === 'journal-article'
              ? 'journal publication'
              : cr.type.replace(/-/g, ' '),
        label: [
          cr.container,
          cr.volume && `vol. ${cr.volume}`,
          cr.issue && `no. ${cr.issue}`,
          cr.page && `pp. ${cr.page}`,
        ]
          .filter(Boolean)
          .join(', '),
        date: d.date,
        precision: d.precision,
        basis: `Crossref ${cr.publishedPrint ? 'published-print' : cr.publishedOnline ? 'published-online' : 'issued'} date (year kept; publisher-deposited, not checked against the issue)`,
        doi: cr.doi,
        source: key,
      });
  }
  // The dataset's own date for a document it already holds, and versions the preparer checked.
  const existingDoc = p.datasetDocument ? entById.get(p.datasetDocument) : null;
  for (const sid of existingDoc?.sourceIds ?? []) {
    const ds = dataSources.get(sid);
    if (
      ds?.publicationDate &&
      !versions.some(
        (v) =>
          (v.kind === 'arXiv submission' ||
            v.kind === 'as recorded in the dataset') &&
          v.date === ds.publicationDate,
      )
    )
      versions.push({
        kind: 'as recorded in the dataset',
        label: `${ds.title} (${ds.version ?? ds.publisher ?? sid})`.slice(
          0,
          200,
        ),
        date: ds.publicationDate,
        precision:
          ds.publicationDate.length === 10
            ? 'day'
            : ds.publicationDate.length === 7
              ? 'month'
              : 'year',
        basis: `dataset source ${sid}`,
        source: sid,
      });
  }
  for (const v of p.versions ?? [])
    versions.push({ ...v, source: v.source ?? `${p.id}--text` });
  const out = versions;
  out.sort((a, b) => a.date.localeCompare(b.date));
  const existing = p.datasetDocument ? entById.get(p.datasetDocument) : null;
  return {
    id: p.id,
    existingEntity: !!existing,
    title: p.titleAsPrinted ?? existing?.name ?? p.title,
    subtype: existing?.subtype ?? 'Research paper (work)',
    externalIds: Object.fromEntries(
      Object.entries({ arxiv: p.arxiv, doi: p.doi }).filter(([, v]) => v),
    ),
    year: out[0]?.date.slice(0, 4) ?? (p.year ? String(p.year) : null),
    versions: out,
    arxivComments: f?.arxivHistory?.comments ?? null,
    arxivJournalRef: f?.arxivHistory?.journalRef ?? null,
    read: f?.text?.read ?? null,
    curation: p.curation ?? f?.curation ?? null,
    sources,
  };
}

// The date a record carries: arXiv v1 where the work is on arXiv, else the earliest dated version.
const dated = (d) =>
  d.versions.find((v) => v.kind === 'arXiv submission') ??
  d.versions[0] ??
  null;

// ---- persons and authorship ---------------------------------------------------------------------
const personIndex = new Map();
for (const e of ents.filter((x) => x.type === 'person'))
  for (const n of [e.name, ...(e.aliases ?? [])]) {
    const k = nameKey(n);
    if (!personIndex.has(k)) personIndex.set(k, new Set());
    personIndex.get(k).add(e.id);
  }
const existingAuthored = new Set(
  claimsData
    .filter((c) => c.predicate === 'authored')
    .map((c) => `${c.subject}|${c.object.entityId}`),
);

function persons(papers) {
  // printed name key -> papers
  const credited = new Map();
  for (const p of papers)
    for (const n of p.byline.names)
      if (n.printed && !n.collective) {
        const k = nameKey(
          n.printed.includes(' ') && !/^[A-Z]\.?\s/.test(n.printed)
            ? n.printed
            : n.name,
        );
        const list = credited.get(k) ?? [];
        list.push({
          paper: p.id,
          printed: n.printed,
          indexName: n.name,
          where: n.where,
        });
        credited.set(k, list);
      }
  const reused = [];
  const proposed = [];
  const listed = [];
  for (const [k, list] of credited) {
    const papersN = new Set(list.map((x) => x.paper)).size;
    const hit = personIndex.get(k);
    if (hit && hit.size === 1)
      reused.push({ id: [...hit][0], key: k, credits: list });
    else if (hit && hit.size > 1)
      listed.push({
        key: k,
        credits: list,
        reason: `Printed name matches ${hit.size} existing person records (${[...hit].join(', ')}); not linked.`,
      });
    else if (papersN >= 2) {
      // the name as printed: the fullest printed form among the credits
      const best = [...list.map((x) => x.printed)].sort(
        (a, b) => b.length - a.length,
      )[0];
      proposed.push({ id: slug(best), name: best, key: k, credits: list });
    } else
      listed.push({
        key: k,
        credits: list,
        reason: 'Credited on one pack paper; no person record proposed.',
      });
  }
  // proposed IDs must not collide with existing entity IDs
  for (const pr of proposed) if (entById.has(pr.id)) pr.id = `${pr.id}-author`;
  // possible same person under two printed forms: family name and first initial agree
  const fi = (k) => {
    const t = k.split(' ');
    return `${t.at(-1)}|${t[0][0]}`;
  };
  const byFi = new Map();
  for (const x of [
    ...reused.map((r) => ({ id: r.id, key: r.key })),
    ...proposed.map((r) => ({ id: r.id, key: r.key })),
    ...listed.map((r) => ({ id: null, key: r.key })),
  ]) {
    const g = byFi.get(fi(x.key)) ?? [];
    g.push(x);
    byFi.set(fi(x.key), g);
  }
  const variants = [...byFi.values()]
    .filter((g) => g.length > 1)
    .map((g) => g.map((x) => x.id ?? x.key));
  return { reused, proposed, listed, variants };
}

// ---- drafts -------------------------------------------------------------------------------------
function loadDrafts(prefix) {
  const dir = join(DIR, 'drafts');
  if (!existsSync(dir)) return [];
  return readdirSync(dir)
    .filter((f) => f.startsWith(prefix) && f.endsWith('.json'))
    .sort()
    .flatMap((f) => readJson(join(dir, f)).map((x) => ({ ...x, draft: f })));
}

const PRIORITY =
  /\b(first(?![- ]?(order|generation))|landmark|seminal|foundational|pioneer\w*|breakthrough|influential|revolutionar\w*|key paper|coined|invented)\b/i;

function retrievalFailures() {
  const L = join(DIR, '..', '..', '.local', 'key-papers');
  const out = [];
  const cl = existsSync(join(L, 'corpus-log.json'))
    ? readJson(join(L, 'corpus-log.json'))
    : {};
  for (const [id, v] of Object.entries(cl))
    if (!v.ok)
      out.push({
        item: `corpus source ${id}`,
        result: v.attempts
          .map(
            (a) =>
              `${new URL(a.url).host}: ${a.status ? `HTTP ${a.status}${a.status < 400 ? ` (${a.words} words of text)` : ''}` : (a.error ?? 'no response')}`,
          )
          .join('; '),
      });
  const pl = existsSync(join(L, 'paper-log.json'))
    ? readJson(join(L, 'paper-log.json'))
    : {};
  for (const [id, v] of Object.entries(pl))
    if (!v.ok && !v.note?.startsWith('dataset sources'))
      out.push({
        item: `paper ${id}`,
        result:
          v.note ??
          Object.entries(v.steps)
            .map(([k, st]) => `${k}: HTTP ${st}`)
            .join('; '),
      });
  return out;
}

function main() {
  const docs = [];
  const claims = [];
  const papers = [];
  const statesDrafts = new Map(loadDrafts('states-').map((d) => [d.paper, d]));
  const selectedIds = new Set(sel.papers.map((p) => p.id));
  const shapingDrafts = loadDrafts('shaping-').filter((s) =>
    selectedIds.has(s.paper),
  );
  for (const p of sel.papers) {
    const f = facts.get(p.id);
    const doc = documentRecord(p, f);
    const byline = f?.bylines ?? { read: null, names: [] };
    papers.push({ ...p, byline });
    docs.push({
      ...doc,
      basis: p.basis,
      citationBasis:
        p.basis === 1
          ? {
              count: p.count,
              basis:
                'distinct dataset documents whose retrieved text cites the work (identifier or title match)',
              checkDate: CHECK_DATE,
            }
          : {
              count: p.count,
              note: 'Dataset documents citing the work (below the basis-1 threshold, shown for orientation).',
              checkDate: CHECK_DATE,
            },
      basis2: p.basis2 ?? null,
      authorsAsPrinted: byline.names
        .filter((n) => n.printed)
        .map((n) => n.printed),
      authorsNotOnFirstPage: byline.names
        .filter((n) => !n.printed)
        .map((n) => n.name),
      bylineRead: byline.read,
      bylineCollective: byline.collective ? byline.names[0].printed : null,
    });
    // states
    const st = statesDrafts.get(p.id);
    for (const [i, q] of (st?.quotes ?? []).entries())
      claims.push({
        id: `kp-states-${p.id.replace(/^kp-/, '')}-${i + 1}`,
        kind: 'states',
        subject: p.id,
        predicate: 'states_contribution',
        proposedPredicate: true,
        object: { kind: 'literal', value: q.statement },
        statement: q.statement,
        time: {
          kind: 'snapshot',
          date: dated(doc)?.date ?? null,
          basis: dated(doc) ? dated(doc).kind : 'unknown',
          note: `What the ${doc.read?.includes('--v1') ? 'arXiv v1 text' : 'text read'} states; later versions may word it differently.`,
        },
        derivation: 'explicit',
        resolution: 'supported',
        qualification: q.priorityClaim
          ? "The paper's own statement, including its claim of priority or novelty; Selekoa does not assess the claim."
          : "The paper's own description of its contribution; not an assessment of it.",
        evidence: [
          {
            source: st.text,
            locator: q.locator,
            passage: q.passage,
            passageType: 'quote',
            sourceRole: 'primary',
            support: 'supports',
          },
        ],
        priorityClaim: !!q.priorityClaim,
        draft: st.draft,
      });
    if (st && !st.quotes?.length)
      docs[docs.length - 1].statesOmitted = st.omitted;
    // authorship (only for persons with records; filled after persons())
  }
  const pr = persons(papers);
  const personOf = new Map();
  for (const r of pr.reused)
    for (const c of r.credits)
      personOf.set(`${c.paper}|${r.key}`, { id: r.id, existing: true });
  for (const r of pr.proposed)
    for (const c of r.credits)
      personOf.set(`${c.paper}|${r.key}`, { id: r.id, existing: false });
  const docOf = new Map(docs.map((d) => [d.id, d]));
  for (const p of papers) {
    const d = docOf.get(p.id);
    for (const n of p.byline.names) {
      if (!n.printed || n.collective) continue;
      const k = nameKey(
        n.printed.includes(' ') && !/^[A-Z]\.?\s/.test(n.printed)
          ? n.printed
          : n.name,
      );
      const who = personOf.get(`${p.id}|${k}`);
      if (!who) continue;
      if (existingAuthored.has(`${who.id}|${p.id}`)) continue;
      const src = d.sources.find(
        (s) => s.role === 'primary' && !s.kind.startsWith('arXiv abstract'),
      );
      claims.push({
        id: `kp-authored-${who.id}-${p.id.replace(/^kp-/, '')}`.slice(0, 120),
        kind: 'authored',
        subject: who.id,
        subjectExisting: who.existing,
        predicate: 'authored',
        proposedPredicate: false,
        object: { kind: 'entity', entityId: p.id },
        statement: `${n.printed} is a credited author of ${d.title}.`,
        time: {
          kind: 'event',
          date: dated(d)?.date ?? null,
          basis: dated(d)?.kind ?? 'unknown',
          note: 'Date of the earliest dated version recorded for the work.',
        },
        derivation: 'explicit',
        resolution: 'supported',
        qualification:
          'Authorship as credited in the byline of the text read; it implies neither sole authorship nor a role, and no affiliation is recorded.',
        evidence: [
          {
            source: src?.key ?? null,
            locator: `${n.where}, byline`,
            passage: n.printed,
            passageType: 'quote',
            sourceRole: 'primary',
            support: 'supports',
          },
        ],
      });
    }
  }
  // citations (basis-1 evidence)
  for (const p of sel.papers)
    for (const t of p.citingTexts)
      for (const e of t.entries.slice(0, 1)) {
        const citingDoc = entById.has(e.entry) ? e.entry : null;
        claims.push({
          id: `kp-cites-${e.entry}-${p.id.replace(/^kp-/, '')}`.slice(0, 140),
          kind: 'cites',
          subject: citingDoc ?? `source:${e.source}`,
          predicate: 'cites',
          proposedPredicate: false,
          object: { kind: 'entity', entityId: p.id },
          statement: `${entryName.get(e.entry) ?? e.entry} cites ${p.title}.`,
          time: {
            kind: 'event',
            date: dataSources.get(e.source)?.publicationDate ?? null,
            basis: 'publication of the citing text',
            note: 'Date of the citing source as recorded in the dataset; unknown where the dataset has none.',
          },
          derivation: 'explicit',
          resolution: 'supported',
          qualification:
            'An explicit reference only; neither agreement nor influence. The citing text does not identify which version of the work was read.',
          evidence: [
            {
              source: e.source,
              datasetSource: true,
              locator: [
                e.page ? `PDF p. ${e.page}` : null,
                e.how === 'title' || e.how === 'title with author and year'
                  ? 'reference or mention by title'
                  : e.how === 'DOI'
                    ? 'reference by DOI'
                    : 'reference by arXiv identifier',
              ]
                .filter(Boolean)
                .join(', '),
              passage: `The text ${e.how === 'arXiv identifier' ? `gives the arXiv identifier ${p.arxiv}` : e.how === 'DOI' ? `gives the DOI ${p.doi}` : 'names the work by its title'}.`,
              passageType: 'paraphrase',
              sourceRole: 'primary',
              support: 'supports',
            },
          ],
          match: e.how,
        });
      }
  // attributed shaping
  for (const s of shapingDrafts)
    claims.push({
      id: s.id,
      kind: 'shaping',
      subject: s.citing,
      predicate: s.predicate,
      proposedPredicate: s.predicate !== 'uses_method_from',
      object: { kind: 'entity', entityId: s.paper },
      statement: s.statement,
      time: {
        kind: 'event',
        date: dataSources.get(s.source)?.publicationDate ?? null,
        basis: 'publication of the citing text',
        note: null,
      },
      derivation: 'explicit',
      resolution: 'supported',
      qualification: s.qualification,
      evidence: [
        {
          source: s.source,
          datasetSource: true,
          locator: s.locator,
          passage: s.passage,
          passageType: s.passageType ?? 'quote',
          note: s.note ?? null,
          sourceRole: 'primary',
          support: 'supports',
        },
      ],
      attribution: s.attribution ?? null,
      attested: s.attested ?? null,
      draft: s.draft,
    });
  // priority-word guard on Selekoa's own wording
  const flagged = claims.filter(
    (c) => c.kind !== 'cites' && PRIORITY.test(c.statement) && !c.priorityClaim,
  );
  const pack = {
    title: 'Key papers and publications on AI: candidate pack',
    status:
      'Candidate research pack outside application data. Machine-prepared and audited by the same model family; not editorially accepted; no human review; cross-family check not yet run.',
    prepared: CHECK_DATE,
    checkDate: CHECK_DATE,
    rule: sel.rule,
    counts: {
      papers: docs.length,
      basis1: docs.filter((d) => d.basis === 1).length,
      basis2: docs.filter((d) => d.basis === 2).length,
      existingDocuments: docs.filter((d) => d.existingEntity).length,
      claims: claims.length,
      byKind: Object.fromEntries(
        ['states', 'authored', 'cites', 'shaping'].map((k) => [
          k,
          claims.filter((c) => c.kind === k).length,
        ]),
      ),
      proposedPersons: pr.proposed.length,
      reusedPersons: pr.reused.length,
      authorsListedWithoutRecord: pr.listed.length,
      priorityWordFlags: flagged.length,
    },
    documents: docs,
    persons: {
      proposed: pr.proposed,
      reused: pr.reused.map((r) => ({ id: r.id, credits: r.credits })),
      variants: pr.variants,
    },
    authorsWithoutRecord: pr.listed,
    claims,
    retrievalFailures: retrievalFailures(),
    sharedBodies: existsSync(
      join(DIR, '..', '..', '.local', 'key-papers', 'shared.json'),
    )
      ? readJson(
          join(DIR, '..', '..', '.local', 'key-papers', 'shared.json'),
        ).map((b) => ({ url: b.url, entries: b.entries, sha256: b.sha256 }))
      : [],
    nearMisses: sel.nearMisses,
    excluded: sel.excluded,
    basis2Skipped: sel.basis2Skipped,
  };
  writeJson(join(DIR, 'pack.json'), pack);
  console.log(JSON.stringify(pack.counts));
  if (flagged.length)
    console.log('priority words:', flagged.map((c) => c.id).join(', '));
}

main();
