import type { ResearchCollection } from './collection';

const md = (text: string | null) =>
  (text ?? 'unknown')
    .replace(/[\\`*_{}[\]<>#|]/g, '\\$&')
    .replace(/\r?\n/g, ' ');
const link = (label: string, url: string) => `[${md(label)}](${url})`;
const upstreamLink = (c: ResearchCollection, path: string) =>
  `https://github.com/${c.upstream.repository}/blob/${c.upstream.commit}/${path}`;
const top = (c: ResearchCollection, title: string) => [
  '# ' + title,
  '',
  `Collection: ${c.id} · v${c.selectionVersion}`,
  `Upstream: ${link(c.upstream.repository + '@' + c.upstream.commit, upstreamLink(c, 'reports/BASELINE-v1.md'))}`,
  `Collection fingerprint: ${c.fingerprint}`,
  '',
  '**Preliminary machine research. Investigated propositions are not accepted facts. Human review is not recorded.**',
  '',
];

export function starterMarkdown(c: ResearchCollection) {
  const lines = [
    ...top(c, c.title),
    '## How to use this starter',
    '',
    'Start with the investigated proposition, then compare the claim-level finding with each evidence-level assessment. Open the exact evidence URL at its locator; use the source inventory to check authorship and competing version URLs. The crosswalk identifies upstream records without reproducing private packet prose.',
    '',
    'This selection tests occurrence versus priority, partial conceptual support, wrong identifiers, attribution correction, mutable historical expressions and an unestablished transmission pathway. Read PCR-001 with PCR-002; PCR-035 with PCR-036; and PCR-045 against its separate component evidence. Do not turn that reading order into a lineage claim.',
    '',
    '[Source and evidence inventory](inventory.md) · [Upstream crosswalk](crosswalk.md) · [Structured collection](collection.json) · [Method and review limits](../../../docs/research-corpus.md)',
    '',
    '## Limits',
    '',
    ...c.limits.map((s) => '- ' + s),
    '',
    '## Investigated propositions',
    '',
  ];
  for (const r of c.records) {
    lines.push(
      `### ${r.upstreamId} — ${md(r.concept)}`,
      '',
      `**Investigated proposition (not an accepted fact):** ${md(r.investigatedProposition)}`,
      '',
      `**Upstream preliminary machine finding:** ${r.machineFinding.status}. ${md(r.machineFinding.rationale)}`,
      '',
      `**Qualification:** ${md(r.qualification)}`,
      '',
      `Selection reason: ${md(r.selectionReason)}`,
      `Search scope: ${md(r.search.scope)}`,
      `Search boundary: ${md(r.search.boundary)}`,
      `Venue / network scope: ${md(r.search.venueScope)} / ${md(r.search.networkScope)}`,
      `Priority-sensitive: ${r.search.prioritySensitive ? 'yes' : 'no'}; priority status: ${md(r.search.priorityStatusAsReported)}; earliest positive evidence as reported: ${md(r.search.earliestPositiveEvidenceAsReported)}; earlier candidates: ${md(r.search.earlierCandidatesAsReported)}.`,
      'Event date: unknown. Original evidence-check date: unknown. Human evidence, interpretation and reliance reviews: not recorded.',
      '',
      'Evidence (upstream reports; each assessment retained separately):',
      '',
    );
    for (const id of r.evidenceIds) {
      const e = c.evidence.find((item) => item.id === id)!;
      const s = c.sources.find((item) => item.id === e.expressionId)!;
      lines.push(
        `- **${e.id}: ${e.assessment.status}** — ${link(s.title, e.expressionUrlInspectedByUpstream)}. Locator: ${md(e.locator)}. Expression: ${e.expressionId}.`,
        `  Upstream passage (${e.passage.upstreamComposition}; not authenticated here as a verbatim quotation): ${md(e.passage.text)}`,
        `  Upstream assessment of what it establishes: ${md(e.assessment.sourceEstablishes)} Rationale: ${md(e.assessment.rationale)}`,
        `  Selekoa evidence relationship: ${e.relationship.role}. ${md(e.relationship.rationale)} Assigned 2026-09-28 from upstream reports; this is separate from original-source verification.`,
        `  Source role: ${md(e.sourceRoleAsReported)}. Temporal adequacy: ${md(e.assessment.temporalAdequacyAsReported)}; role adequacy: ${md(e.assessment.roleAdequacyAsReported)}. Capture: ${md(e.captureDateAsReported)}.`,
        `  Catalog expression URL: ${link('compare catalog expression', s.catalogExpressionUrl)}. ${s.versionLimits.map(md).join(' ')}`,
      );
    }
    lines.push(
      '',
      '**Open questions / next checks:**',
      '',
      ...r.openQuestions.map((q) => '- ' + md(q)),
      '',
      `Upstream claim: ${link(r.upstream.path, upstreamLink(c, r.upstream.path))}, CSV data-record ordinal ${r.upstream.recordOrdinal}. Local stable ID: ${r.id}.`,
      '',
    );
  }
  lines.push(
    '## Human inspection before reliance',
    '',
    'No decisions are collected in this generated file. Keep review records separately; the generator overwrites these projections. No command imports decisions or admits corpus records to the graph.',
    '',
    'The policy requires an independent human sample of at least three propositions, including one randomly selected and one from a different source or relation family. That sample has not been performed. The same-agent source rechecks documented in the method are limited machine spot-checks only. Historical priority, negative evidence, identifier conflicts and transmission framing require targeted human triage before curated use.',
    '',
  );
  return lines.join('\n');
}

export function inventoryMarkdown(c: ResearchCollection) {
  const lines = [
    ...top(c, 'Source and evidence inventory'),
    `${c.sources.length} distinct upstream expression IDs; ${c.evidence.length} evidence records. Counts do not measure independence or corroboration.`,
    '',
    'Dates below are the exact upstream strings. Publication, expression and capture dates are separate; an unknown value stays unknown. No row-level original checking date is supplied.',
    '',
  ];
  for (const s of c.sources) {
    lines.push(
      '## ' + s.id,
      '',
      `**${md(s.title)}**`,
      '',
      `Authors: ${md(s.authorsAsReported)}. Venue: ${md(s.venueAsReported)}.`,
      `Bibliographic identity: ${md(s.bibliographicIdentityAsReported)}`,
      `Source: ${s.sourceId}; work key as reported: ${s.workIdAsReported}.`,
      `Publication: ${md(s.publicationDateAsReported)}; expression date: ${md(s.expressionDateAsReported)}; catalog capture: ${md(s.captureDateAsReported)}.`,
      `Canonical: ${link('source', s.canonicalUrl)}. Catalog expression: ${link('expression', s.catalogExpressionUrl)}. Original packet URL: ${link('identifier as cited', s.originalPacketUrl)}.`,
      `Role: ${md(s.roleAsReported)}. Historical organization: ${md(s.historicalOrganizationContext)}. Identity evidence: ${md(s.identityEvidenceAsReported)}.`,
      ...s.versionLimits.map((v) => '- ' + md(v)),
      'Source reuse rights: unassessed; terms URL unknown. No original source bytes redistributed.',
      '',
      '| Evidence | Proposition | Upstream assessment | Exact evidence URL / locator | Capture |',
      '| --- | --- | --- | --- | --- |',
    );
    for (const e of c.evidence.filter((item) => item.expressionId === s.id))
      lines.push(
        `| ${e.id} | ${e.recordId} | ${e.assessment.status} | ${link('open', e.expressionUrlInspectedByUpstream)}; ${md(e.locator)} | ${md(e.captureDateAsReported)} |`,
      );
    lines.push('');
  }
  return lines.join('\n');
}

export function crosswalkMarkdown(c: ResearchCollection) {
  const lines = [
    ...top(c, 'Pinned upstream crosswalk'),
    'All addresses refer to the pinned commit. Ordinals count CSV data records after the header, not physical lines. Evidence has no upstream evidence ID: its pinned file and ordinal are its address; Selekoa assigns si-evidence-NNN from that ordinal. A changed upstream commit requires an explicit new mapping.',
    '',
    'The upstream atomization crosswalk includes source-grouped and packet-level associations. These are not necessarily semantic equivalence or evidence for every mapped proposition. Selected atomic propositions are reproduced verbatim; raw packet prose and dissertation drafts are excluded. Follow the private upstream repository to inspect packet assertions.',
    '',
    '## Inputs',
    '',
    '| File | Git blob | SHA-256 of exact upstream bytes |',
    '| --- | --- | --- |',
    ...c.upstream.files.map(
      (f) =>
        `| ${link(f.path, upstreamLink(c, f.path))} | ${f.gitBlob} | ${f.sha256} |`,
    ),
    '',
    '## Proposition and evidence addresses',
    '',
    '| Local ID | Upstream ID / CSV ordinal | Projected row fingerprint |',
    '| --- | --- | --- |',
    ...c.records.map(
      (r) =>
        `| ${r.id} | ${r.upstreamId}; canonical-claims.csv #${r.upstream.recordOrdinal} | ${r.upstream.projectedRowFingerprint} |`,
    ),
    ...c.evidence.map(
      (e) =>
        `| ${e.id} | claim-evidence.csv #${e.upstream.recordOrdinal}; ${e.recordId}; ${e.sourceId}; ${e.expressionId} | ${e.upstream.projectedRowFingerprint} |`,
    ),
    '',
    '## Packet mappings',
    '',
    '| Upstream crosswalk ordinal | Packet claim / occurrence | Mapping basis | Selected records |',
    '| --- | --- | --- | --- |',
    ...c.mappings.map(
      (m) =>
        `| ${m.upstream.recordOrdinal} | ${m.packetClaimId} / ${m.packetOccurrenceId} | ${md(m.basis)} | ${m.selectedRecordIds.join('; ')} |`,
    ),
    '',
    'The JSON preserves all three original mapping lists, original source IDs and treatment text. No source ID is silently collapsed into another expression or work. Unmapped selected propositions remain visible in the collection; a source-grouped mapping is not invented for them.',
    '',
  ];
  return lines.join('\n');
}
