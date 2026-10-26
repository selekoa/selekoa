import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { format } from 'prettier';

const root = fileURLToPath(new URL('../', import.meta.url));
const directory = 'research/collections/research-baseline-supplement-v1/';
const parent = '09c17e5183fd5717518f3091b974df199b7d9939';
const protectedPaths = [
  'research/collections/conceptual-provenance-i',
  'research/collections/conceptual-provenance-ii',
  'review',
  'data',
];
const git = (...args) =>
  execFileSync(
    'git',
    ['-c', `safe.directory=${root.replaceAll('\\', '/')}`, ...args],
    {
      cwd: root,
      encoding: 'utf8',
    },
  );
const canonical = (v) => {
  if (Array.isArray(v)) return v.map(canonical);
  if (v && typeof v === 'object')
    return Object.fromEntries(
      Object.keys(v)
        .sort()
        .map((k) => [k, canonical(v[k])]),
    );
  return v;
};
export const fingerprint = (s) =>
  createHash('sha256')
    .update(JSON.stringify(canonical(s)))
    .digest('hex');

export function validateSupplement(s) {
  assert.equal(s.id, 'research-baseline-supplement');
  assert.equal(s.version, 1);
  assert.equal(s.parents.reconnaissanceCommit, parent);
  assert.equal(
    s.parents.conceptualProvenanceCommit,
    'f9a787e696fdc0a5cea819c3cf2e2d646997dccc',
  );
  assert.equal(
    s.parents.mainCommit,
    '51a6db70555d5d1ebf4d9855043b0e3ed9c99482',
  );
  assert.equal(
    s.parents.collectionFingerprint,
    'sha256:e32152b0089ee10672552d7af38386001419f88a7382a0fae8ea243255691fb3',
  );
  assert.equal(s.status, 'research_only');
  assert.equal(s.editorialAcceptance, 'not_recorded');
  assert.equal(s.exactNamePriority, 'unresolved');
  assert.deepEqual(s.employmentInterval, {
    start: null,
    end: null,
    continuity: 'unverified',
  });
  for (const rows of [
    s.sources,
    s.findings,
    s.evidence,
    s.humanObservations,
    s.correctionHistory,
    s.retrievalFailures,
  ])
    assert.equal(
      new Set(rows.map((r) => r.id)).size,
      rows.length,
      'Duplicate ID',
    );
  const sources = new Map(s.sources.map((r) => [r.id, r]));
  const findings = new Map(s.findings.map((r) => [r.id, r]));
  const evidence = new Map(s.evidence.map((r) => [r.id, r]));
  assert.equal(s.humanObservations.length, 1);
  const h = s.humanObservations[0];
  assert.equal(h.id, 'RBS1-H01');
  assert.equal(h.sourceId, 'RBS1-S1');
  assert.equal(h.reviewer, 'futurelightcone');
  assert.equal(h.scope, 'title_presentation_only');
  assert.equal(h.locator, 'Archived page title/heading');
  assert.equal(h.observedAt, null);
  assert.equal(h.editorialDecision, null);
  assert.deepEqual(h.notReviewed, [
    'capture authenticity',
    'response hash or byte identity',
    'complete document text',
    'negative exact-name search',
    'first use or naming priority',
    'employment evidence',
    'other CP II findings',
    'editorial acceptance',
  ]);
  for (const [id, timestamp] of Object.entries({
    'RBS1-S1': '2004-06-23T15:30:32Z',
    'RBS1-S2': '2013-05-29T22:11:23Z',
    'RBS1-S3': '2013-05-29T22:11:23Z',
    'RBS1-S6': '2013-07-01T05:24:40Z',
    'RBS1-S7': '2015-03-17T13:35:52Z',
  })) {
    const r = sources.get(id);
    assert.equal(r.captureTimestamp, timestamp, 'Capture identity changed');
    assert.equal(
      new Date(r.mementoDatetime).toISOString(),
      new Date(timestamp).toISOString(),
    );
    assert.ok(
      r.resolvedUrl.includes(timestamp.replaceAll(/[-:TZ]/g, '')),
      'Replay identity changed',
    );
  }
  assert.equal(
    sources.get('RBS1-S1').originalUrl,
    'http://www.singinst.org/friendly/collective-volition.html',
  );
  assert.equal(sources.get('RBS1-S1').displayedPublicationDate, '2004-05');
  for (const r of s.sources) {
    assert.match(r.responseSha256, /^[a-f0-9]{64}$/);
    assert.ok(r.responseBytes > 0);
    assert.equal(r.httpStatus, 200);
    assert.equal(r.machineVerification, 'machine_checked');
    assert.deepEqual(
      r.humanObservationIds,
      r.id === 'RBS1-S1' ? ['RBS1-H01'] : [],
    );
  }
  for (const f of s.findings) {
    if (f.derivation === 'inferred') {
      assert.ok(
        f.premises?.length && f.rationale,
        'Inference requires premises and rationale',
      );
    }
    assert.deepEqual(
      f.humanObservationIds,
      f.id === 'RBS1-F01' ? ['RBS1-H01'] : [],
    );
    for (const id of f.evidenceIds)
      assert.equal(evidence.get(id)?.findingId, f.id, 'Cross-finding evidence');
  }
  for (const e of s.evidence) {
    assert.ok(
      sources.has(e.sourceId) && findings.has(e.findingId),
      'Broken evidence reference',
    );
    assert.equal(e.verification, 'machine_checked');
    assert.equal(e.checkedAt, '2026-09-28');
    assert.equal(e.checkedBy, 'Codex');
    assert.deepEqual(
      e.humanObservationIds,
      e.id === 'RBS1-E01' ? ['RBS1-H01'] : [],
    );
  }
  assert.equal(findings.get('RBS1-F02').resolution, 'unresolved');
  assert.equal(findings.get('RBS1-F04').resolution, 'unresolved');
  assert.ok(
    s.retrievalFailures.every((r) => r.httpStatus === null),
    'Do not invent reader HTTP failures',
  );
}

export async function renderSupplement(s) {
  validateSupplement(s);
  const lines = [
    '# Research baseline supplement v1',
    `Recorded ${s.recordedOn}. Fingerprint: sha256:${fingerprint(s)}.`,
    'Exploratory research; not editorially accepted. One narrow human observation is recorded separately. Existing CP II findings and review packets remain unchanged.',
    'Read the [integration handoff](../../../docs/research/research-baseline-handoff.md) and [structured supplement](supplement.json) for the preservation manifest.',
    '## Findings',
  ];
  for (const f of s.findings)
    lines.push(
      `### ${f.id}`,
      f.statement,
      `Derivation: ${f.derivation}; resolution: ${f.resolution}. Related records: ${f.relatedIds.join(', ')}.`,
      f.qualification,
      `Evidence: ${f.evidenceIds.join(', ')}. Human observation: ${f.humanObservationIds.join(', ') || 'none'}.`,
    );
  for (const f of s.findings.filter((f) => f.derivation === 'inferred')) {
    lines.push(
      `**${f.id} inference:** ${f.rationale}`,
      ...f.premises.map((p) => `- Premise: ${p}`),
    );
  }
  lines.push('## Human observation — title only');
  for (const h of s.humanObservations)
    lines.push(
      `**${h.id} / ${h.reviewer}** — reported ${h.reportedOn}; inspection date unknown. Source: ${h.sourceId}; locator: ${h.locator}.`,
      h.observation,
      h.basis,
      `Scope: ${h.scope}. Not reviewed: ${h.notReviewed.join('; ')}. No editorial decision recorded.`,
    );
  lines.push('## Source expressions and access');
  for (const r of s.sources)
    lines.push(
      `### ${r.id}: ${r.title}`,
      `[Original identity](${r.originalUrl}) · [Requested expression](${r.requestedUrl}) · [Resolved expression](${r.resolvedUrl})`,
      `Access: ${r.accessedAt}; HTTP ${r.httpStatus}; ${r.responseBytes} response bytes; SHA-256 ${r.responseSha256}.`,
      `Capture: ${r.captureTimestamp || 'none'}; Memento-Datetime: ${r.mementoDatetime || 'none'}; displayed publication/document date: ${r.displayedPublicationDate || 'unknown'}.`,
      `Locator: ${r.locator}. **Paraphrase:** ${r.paraphrase}`,
      r.limits,
      `Attributed author/publisher: ${r.attribution}. Discovery: ${r.discoveredVia.map((u) => `[source path](${u})`).join('; ')}.`,
      `Source role: ${r.sourceRole}; verification: ${r.machineVerification}; human observation: ${r.humanObservationIds.join(', ') || 'none'}.`,
      r.rights,
    );
  lines.push('## Evidence relationships');
  for (const e of s.evidence)
    lines.push(
      `- **${e.id}**: ${e.findingId} ← ${e.sourceId}, ${e.supportRole}. ${e.locator}. Paraphrase: ${e.paraphrase} Checked ${e.checkedAt} by ${e.checkedBy}. Verification: ${e.verification}; human observation: ${e.humanObservationIds.join(', ') || 'none'}.`,
    );
  lines.push('## Retrieval failures');
  for (const r of s.retrievalFailures)
    lines.push(
      `- **${r.id}**: [requested URL](${r.requestedUrl}), ${r.accessedOn}, ${r.method}. ${r.result}`,
    );
  lines.push('## Additive correction history');
  for (const c of s.correctionHistory)
    lines.push(
      `### ${c.id}: ${c.target}`,
      `Action: ${c.action}.`,
      `Before: ${c.before}`,
      `Supplement: ${c.after}`,
      c.preserved,
    );
  lines.push(
    '## Limits',
    ...s.limits.map((v) => `- ${v}`),
    '## Reproduction',
    'Run `node scripts/research-supplement.mjs --check` from the repository root. Generation without `--check` writes only this packet; human observations belong in the versioned JSON, never in a generated review decision field. No network is used. A changed observation requires an explicitly authorized versioned edit.',
  );
  return format(lines.join('\n\n') + '\n', { parser: 'markdown' });
}

async function main() {
  assert.ok(process.argv.slice(2).every((v) => v === '--check'));
  const s = JSON.parse(
    await readFile(resolve(root, directory, 'supplement.json'), 'utf8'),
  );
  validateSupplement(s);
  const manifest = git('ls-tree', '-r', parent, '--', ...protectedPaths)
    .trim()
    .split('\n')
    .map((line) => {
      const [meta, path] = line.split('\t');
      return { path, gitBlob: meta.split(' ')[2] };
    });
  assert.deepEqual(
    s.protectedFiles,
    manifest,
    'Protected manifest differs from pinned parent',
  );
  assert.equal(
    git('diff', parent, '--', ...protectedPaths),
    '',
    'Original packet, review or application data changed',
  );
  const body = await renderSupplement(s);
  const output = resolve(root, directory, 'packet.md');
  if (process.argv.includes('--check'))
    assert.equal(
      await readFile(output, 'utf8'),
      body,
      'Supplement packet is stale',
    );
  else await writeFile(output, body);
  console.log(
    `Supplement v1 verified; ${manifest.length} protected files unchanged; one title-only human observation; no admission.`,
  );
}
if (
  process.argv[1] &&
  pathToFileURL(resolve(process.argv[1])).href === import.meta.url
)
  await main();
