import { z } from 'zod';
import { canonicalJson, fingerprint } from '../domain/references';
import parentInput from '../../research/collections/conceptual-provenance-i/collection.json';

const text = z.string().min(1);
const sha = z.string().regex(/^[a-f0-9]{64}$/);
const texts = z.array(text);
const date = z.string().regex(/^\d{4}-\d{2}-\d{2}$/);
const source = z.strictObject({
  id: text,
  title: text,
  family: text,
  version: text,
  requestedUrl: z.url(),
  resolvedUrl: z.url(),
  httpStatus: z.number().int(),
  sha256: sha,
  bytes: z.number().int().positive(),
  accessedAt: date,
  archiveCapture: z.null(),
  dates: z.record(text, text),
  limits: text,
  rights: text,
});
const finding = z.strictObject({
  id: text,
  upstreamId: z.enum(['PCR-002', 'PCR-010', 'PCR-028']),
  statement: text,
  resolution: z.enum(['supported', 'contested', 'unresolved']),
  derivation: z.enum(['explicit', 'inferred']),
  premises: texts,
  qualification: text,
  evidenceIds: texts.min(1),
  editorialAdmission: z.literal('research_only'),
  humanReview: z.literal('not_recorded'),
});
const evidence = z.strictObject({
  id: text,
  findingId: text,
  sourceId: text,
  role: z.enum(['supports', 'contradicts', 'context']),
  sourceRole: text,
  locator: text,
  passage: z.strictObject({ kind: z.literal('paraphrase'), text }),
  checkedAt: date,
  checkedBy: text,
  verification: z.literal('machine_checked'),
  humanReview: z.literal('not_recorded'),
});
const correction = z.strictObject({
  id: text,
  status: z.literal('proposed_not_applied'),
  upstreamCommit: text,
  target: z.strictObject({
    section: z.enum(['sources', 'records']),
    id: text,
    field: text,
    upstream: z.strictObject({
      path: text,
      projectedRowFingerprint: text,
      recordOrdinal: z.number().int().positive(),
    }),
  }),
  before: z.unknown(),
  proposed: z.unknown(),
  rationale: text,
  findingIds: texts.min(1),
});
export const followupSchema = z.strictObject({
  id: z.literal('conceptual-provenance-ii'),
  version: z.literal(2),
  checkedAt: date,
  parentFingerprint: text,
  parentCommit: z.literal('51a6db70555d5d1ebf4d9855043b0e3ed9c99482'),
  investigatedIds: z.array(z.enum(['PCR-002', 'PCR-010', 'PCR-028'])).length(3),
  sources: z.array(source).min(1),
  findings: z.array(finding).min(1),
  evidence: z.array(evidence).min(1),
  corrections: z.array(correction).min(1),
  search: z.strictObject({
    id: text,
    question: text,
    fromDate: date,
    throughDate: date,
    venues: texts.min(1),
    aliases: texts.min(1),
    selection: text,
    normalization: text,
    indexCount: z.number().int().positive(),
    bodyCount: z.number().int().positive(),
    exactHits: z.number().int().nonnegative(),
    manifest: z
      .array(
        z.strictObject({
          id: text,
          url: z.url(),
          status: z.number().int(),
          sha256: sha,
          kind: z.enum(['message', 'monthly_index']),
          subject: text.nullable(),
          exactTermHits: z.number().int().nonnegative().nullable(),
        }),
      )
      .min(1),
    earlierCandidates: texts,
    unsuccessfulSearches: z.array(
      z.strictObject({ query: text, result: text }),
    ),
    exclusions: texts.min(1),
    earliestFound: text,
    priority: z.literal('unresolved'),
    transmission: z.literal('unresolved'),
    limits: texts.min(1),
  }),
  sample: z.strictObject({
    seed: z.string().regex(/^[a-f0-9]{32}$/),
    algorithm: text,
    population: texts.min(3),
    randomFindingId: text,
    targetedFindingIds: texts.min(2),
    rationale: text,
    humanDecisions: z.literal('not_recorded'),
  }),
  audit: z.strictObject({
    actor: text,
    model: text,
    checkedAt: date,
    method: text,
    independenceLimits: text,
    coverage: z
      .array(
        z.strictObject({
          id: text,
          findingIds: texts.min(1),
          correctionIds: texts,
          verdict: z.enum(['supported_with_limits', 'qualification_required']),
          assessment: text,
          sources: texts.min(1),
        }),
      )
      .min(1),
    independentSearch: z.strictObject({
      fromDate: date,
      throughDate: date,
      indexes: z.number().int(),
      numericMessageLinks: z.number().int(),
      selectedBodies: z.number().int(),
      subjectFilter: text,
      exactPhraseHits: z.number().int(),
      scope: text,
    }),
    disagreements: z
      .array(
        z.strictObject({
          id: text,
          subject: text,
          investigatorInitial: text,
          auditor: text,
          disposition: text,
        }),
      )
      .min(1),
    accessLimits: texts,
    humanReview: z.literal('not_recorded'),
  }),
  limits: texts.min(1),
});
export type Followup = z.infer<typeof followupSchema>;
type Parent = typeof parentInput;
const sorted = <T extends { id: string }>(rows: T[]) =>
  [...rows].sort((a, b) => a.id.localeCompare(b.id, 'en'));
const assert = (ok: unknown, message: string) => {
  if (!ok) throw new Error(message);
};
const same = (a: unknown, b: unknown) => canonicalJson(a) === canonicalJson(b);
const unique = (values: string[]) => new Set(values).size === values.length;
export async function randomFinding(seed: string, population: string[]) {
  const ranked = population.map((id) => ({ id, rank: '' }));
  const encoder = new TextEncoder();
  for (const item of ranked) {
    const bytes = await crypto.subtle.digest(
      'SHA-256',
      encoder.encode(seed + ':' + item.id),
    );
    item.rank = Array.from(new Uint8Array(bytes), (b) =>
      b.toString(16).padStart(2, '0'),
    ).join('');
  }
  return ranked.sort(
    (a, b) =>
      a.rank.localeCompare(b.rank, 'en') || a.id.localeCompare(b.id, 'en'),
  )[0].id;
}
export async function buildFollowup(
  input: unknown,
  parent: Parent = parentInput,
) {
  const d = followupSchema.parse(input);
  const { fingerprint: parentHash, ...parentBody } = parent;
  assert(
    parentHash === (await fingerprint(parentBody)),
    'Parent content fingerprint mismatch',
  );
  assert(parentHash === d.parentFingerprint, 'Wrong parent version');
  for (const rows of [
    d.findings,
    d.evidence,
    d.sources,
    d.corrections,
    d.search.manifest,
    d.audit.coverage,
    d.audit.disagreements,
  ])
    assert(unique(rows.map((r) => r.id)), 'Duplicate record identity');
  assert(unique(d.investigatedIds), 'Duplicate upstream selection');
  const sources = new Map(d.sources.map((s) => [s.id, s]));
  const identities: Record<string, string> = {
    'arxiv-v1': '/abs/1906.01820v1',
    'arxiv-v1-pdf': '/pdf/1906.01820v1',
    'arxiv-v1-upstream': '/pdf/1906.01820v1',
    'arxiv-v1-source': '/src/1906.01820v1',
    'arxiv-v3': '/abs/1906.01820v3',
    'arxiv-v3-pdf': '/pdf/1906.01820v3',
    'arxiv-v4': '/abs/1906.01820v4',
    'arxiv-v4-pdf': '/pdf/1906.01820v4',
  };
  for (const [id, pathname] of Object.entries(identities)) {
    const s = sources.get(id);
    assert(s, 'Missing versioned source');
    const url = new URL(s!.resolvedUrl);
    assert(
      url.hostname === 'arxiv.org' && url.pathname === pathname,
      'Source identity/version substitution',
    );
  }
  for (const [id, postId] of Object.entries({
    'af-wrong': 'aW288uWABwTruBmgF',
    'af-other': '7W8HqksjBXDcKkrD7',
    'af-intended': 'GNhMPAWcfBCASy8e6',
  })) {
    const s = sources.get(id);
    assert(s, 'Missing forum identity');
    const url = new URL(s!.resolvedUrl);
    assert(
      url.hostname === 'www.alignmentforum.org' &&
        url.pathname.split('/')[2] === postId,
      'Forum identity substitution',
    );
  }
  assert(
    sources.get('arxiv-v1-upstream')!.sha256 ===
      sources.get('arxiv-v1-pdf')!.sha256,
    'Access alias does not match inspected bytes',
  );
  const findings = new Map(d.findings.map((f) => [f.id, f]));
  const evidence = new Map(d.evidence.map((e) => [e.id, e]));
  for (const f of d.findings) {
    assert(
      d.investigatedIds.includes(f.upstreamId),
      'Finding outside increment',
    );
    const items = f.evidenceIds.map((id) => evidence.get(id));
    assert(
      unique(f.evidenceIds) && items.every((e) => e?.findingId === f.id),
      'Broken finding evidence mapping',
    );
    if (f.derivation === 'inferred')
      assert(f.premises.length > 0, 'Inference requires premises');
    if (f.resolution === 'supported')
      assert(
        items.some((e) => e?.role === 'supports'),
        'Supported finding without support',
      );
    if (f.resolution === 'unresolved')
      assert(
        items.every((e) => e?.role !== 'supports'),
        'Unresolved finding cannot imply positive support',
      );
    if (f.resolution === 'contested')
      assert(
        items.some((e) => e?.role === 'contradicts'),
        'Contested finding loses contradiction',
      );
  }
  for (const e of d.evidence) {
    assert(
      findings.get(e.findingId)?.evidenceIds.includes(e.id),
      'Orphan evidence',
    );
    const s = sources.get(e.sourceId);
    assert(s, 'Missing source expression');
    if (s!.httpStatus !== 200)
      assert(
        e.role === 'context',
        'Retrieval failure is contextual, not historical proof',
      );
    assert(e.checkedAt === s!.accessedAt, 'Evidence/source check dates differ');
  }
  for (const c of d.corrections) {
    assert(
      c.upstreamCommit === parent.upstream.commit,
      'Correction targets wrong upstream baseline',
    );
    const row = parent[c.target.section].find((r) => r.id === c.target.id);
    assert(
      row && same(row.upstream, c.target.upstream),
      'Unknown correction address',
    );
    let value: unknown = row;
    for (const part of c.target.field.split('.'))
      value = (value as Record<string, unknown>)[part];
    assert(same(value, c.before), 'Correction history differs from parent');
    assert(
      c.findingIds.every((id) => findings.has(id)),
      'Correction finding missing',
    );
  }
  const indices = d.search.manifest.filter((r) => r.kind === 'monthly_index');
  const bodies = d.search.manifest.filter((r) => r.kind === 'message');
  assert(
    d.search.fromDate === '2001-01-01' && d.search.throughDate === '2004-12-31',
    'Changed priority search boundary requires a new version',
  );
  assert(
    indices.length === 48 &&
      indices.length === d.search.indexCount &&
      bodies.length === d.search.bodyCount,
    'Search inventory/count mismatch',
  );
  assert(
    bodies.reduce((n, r) => n + (r.exactTermHits ?? 0), 0) ===
      d.search.exactHits,
    'Search hit count mismatch',
  );
  for (const r of d.search.manifest) {
    const m =
      /^http:\/\/sl4.org\/archive\/(0[1-4])(0[1-9]|1[0-2])\/(date|\d+)\.html$/.exec(
        r.url,
      );
    assert(m, 'Search URL outside corpus boundary');
    assert(
      (r.kind === 'monthly_index') === (m![3] === 'date'),
      'Index/body mapping mismatch',
    );
    if (r.kind === 'message')
      assert(
        r.subject && /volition|summary of current FAI/i.test(r.subject),
        'Candidate outside subject filter',
      );
  }
  assert(
    unique(d.search.manifest.map((r) => r.url)),
    'Duplicate search access path',
  );
  assert(
    d.search.earlierCandidates.every((id) => sources.has(id)),
    'Missing earlier candidate',
  );
  assert(
    unique(d.sample.population) &&
      same([...d.sample.population].sort(), [...findings.keys()].sort()),
    'Sample excludes findings',
  );
  assert(
    d.sample.randomFindingId ===
      (await randomFinding(d.sample.seed, d.sample.population)),
    'Random selection not reproducible',
  );
  const sample = [
    ...new Set([d.sample.randomFindingId, ...d.sample.targetedFindingIds]),
  ];
  assert(
    sample.length >= 3 && sample.every((id) => findings.has(id)),
    'Invalid human sample',
  );
  const families = new Set(
    sample.flatMap((id) =>
      findings
        .get(id)!
        .evidenceIds.map(
          (eid) => sources.get(evidence.get(eid)!.sourceId)!.family,
        ),
    ),
  );
  assert(families.size >= 2, 'Human sample needs a different source family');
  for (const a of d.audit.coverage) {
    assert(
      a.findingIds.every((id) => findings.has(id)) &&
        a.sources.every((id) => sources.has(id)),
      'Broken audit reference',
    );
    assert(
      a.correctionIds.every((id) => d.corrections.some((c) => c.id === id)),
      'Broken audit correction reference',
    );
  }
  assert(
    d.findings.every((f) =>
      d.audit.coverage.some((a) => a.findingIds.includes(f.id)),
    ),
    'Missing attributed finding audit',
  );
  assert(
    d.corrections.every((c) =>
      d.audit.coverage.some((a) => a.correctionIds.includes(c.id)),
    ),
    'Missing correction audit',
  );
  const records = parent.records.filter((r) =>
    d.investigatedIds.includes(
      r.upstreamId as Followup['investigatedIds'][number],
    ),
  );
  const oldEvidence = parent.evidence.filter((e) =>
    records.some((r) => r.id === e.recordId),
  );
  const inherited = {
    upstream: parent.upstream,
    records,
    evidence: oldEvidence,
    sources: parent.sources.filter((s) =>
      oldEvidence.some((e) => e.expressionId === s.id),
    ),
    mappings: parent.mappings.filter((m) =>
      m.selectedRecordIds.some((id) => records.some((r) => r.id === id)),
    ),
  };
  const body = {
    ...d,
    sources: sorted(d.sources),
    findings: sorted(d.findings),
    evidence: sorted(d.evidence),
    corrections: sorted(d.corrections),
    inherited,
  };
  return { ...body, fingerprint: await fingerprint(body) };
}
export type FollowupCollection = Awaited<ReturnType<typeof buildFollowup>>;
