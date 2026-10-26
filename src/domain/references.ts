import type { Claim, Dataset, Source } from './schema';
import type { PathSelection } from './research-path';
import { referenceHash } from './deep-links';
import { timeLabel } from './query';

/** Sorted object keys, original array ordering, no clock or locale dependency. */
export function canonicalJson(value: unknown): string {
  if (Array.isArray(value))
    return '[' + value.map(canonicalJson).join(',') + ']';
  if (value !== null && typeof value === 'object')
    return (
      '{' +
      Object.entries(value)
        .filter(([, v]) => v !== undefined)
        .sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0))
        .map(([k, v]) => JSON.stringify(k) + ':' + canonicalJson(v))
        .join(',') +
      '}'
    );
  return JSON.stringify(value);
}

export async function fingerprint(value: unknown) {
  const digest = await globalThis.crypto.subtle.digest(
    'SHA-256',
    new TextEncoder().encode(canonicalJson(value)),
  );
  return (
    'sha256:' +
    [...new Uint8Array(digest)]
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('')
  );
}

export function sourceReference(source: Source) {
  return `${source.authors.join('; ')}. ${source.title}. ${source.publisher}. Publication: ${source.publicationDate ?? 'unknown'}. Version: ${source.version}${source.versionDate ? ' (version date: ' + source.versionDate + ')' : ''}. Canonical URL: ${source.canonicalUrl}. Inspected expression URL: ${source.evidenceUrl}.${source.language ? ' Language (BCP 47): ' + source.language + '.' : ''}${source.archivedUrl ? ' Archive URL: ' + source.archivedUrl + (source.archivedAt ? ' (captured ' + source.archivedAt + ')' : '') + '.' : ''} Recorded access: ${source.accessedAt}. Source ID: ${source.id}. Access dates, URLs and archive captures do not authenticate an earlier document expression.`;
}

export async function claimReference(data: Dataset, claim: Claim, url: string) {
  return `Selekoa claim record ${claim.id}: ${claim.statement} Qualification: ${claim.qualification} ${timeLabel(claim)}; ${claim.time.note} Derivation: ${claim.derivation}; resolution: ${claim.resolution}; editorial state: ${claim.editorialState}. Dataset updated: ${data.meta.updatedAt}; schema: ${data.meta.schemaVersion}; dataset fingerprint: ${await fingerprint(data)}. ${url} This cites a stored claim record, not an original publication or a human review.`;
}

const limits = [
  'The reading’s text is machine-written interpretation. No human review of the selection, source paths or framing is recorded, and it is not editorially accepted.',
  'Each claim’s editorial status and each evidence record’s check status are kept, separately. “Supported” does not mean that no contrary evidence exists.',
  'Source passages are omitted, including stored quotes and paraphrases. Follow the locators to inspect original material. No third-party documents are included; source reuse restrictions still apply.',
  'Fingerprints identify the complete loaded dataset and selection using canonical JSON (sorted object keys, preserved array order, UTF-8) and SHA-256. The packet is a subset, not a full dataset archive.',
  'Dataset update dates and selection version numbers alone are not immutable identifiers. URLs resolve against the installed dataset; they do not retrieve historical releases.',
  'An access date, a current URL, an archive URL or a fingerprint of metadata does not prove what an earlier version of a document said. Inspect the exact original version before relying on it in academic work.',
];

export async function researchPacket(data: Dataset, selection: PathSelection) {
  const ids = [
    ...new Set([
      ...selection.items.map((i) => i.claimId),
      ...selection.introduction.flatMap((p) => p.claimIds),
      ...selection.sections.flatMap((s) =>
        s.passages.flatMap((p) => p.claimIds),
      ),
    ]),
  ];
  const claims = ids.map((id) => {
    const claim = data.claims.find((c) => c.id === id);
    if (!claim) throw new Error('Missing selected claim: ' + id);
    return claim;
  });
  const evidenceIds = new Set(claims.flatMap((c) => c.evidenceIds));
  const originalEvidence = [...evidenceIds].map((id) => {
    const item = data.evidence.find((e) => e.id === id);
    if (!item || !ids.includes(item.claimId))
      throw new Error('Missing or mismatched evidence: ' + id);
    return item;
  });
  const entityIds = new Set([
    ...(selection.institutionId ? [selection.institutionId] : []),
    ...claims.flatMap((c) => [
      c.subject,
      ...(c.object.kind === 'entity' ? [c.object.entityId] : []),
    ]),
  ]);
  const entities = data.entities.filter((e) => entityIds.has(e.id));
  const sourceIds = new Set([
    ...originalEvidence.map((e) => e.sourceId),
    ...entities.flatMap((e) => e.sourceIds),
  ]);
  const sources = [...sourceIds].sort().map((id) => {
    const source = data.sources.find((s) => s.id === id);
    if (!source) throw new Error('Missing source: ' + id);
    return source;
  });
  const evidence = originalEvidence.map(({ passage, ...record }) => ({
    ...record,
    passageOmitted: true,
    // Reading a packet must never be mistaken for checking a source passage.
    passageOmissionReason:
      'Source text omitted; inspect the original at the stored locator.',
    originalPassagePresent: passage.length > 0,
  }));
  const packet = {
    format: 'selekoa-research-packet',
    formatVersion: 1,
    dataset: { metadata: data.meta, fingerprint: await fingerprint(data) },
    selection: {
      definition: selection,
      fingerprint: await fingerprint(selection),
      interpretationStatus:
        'machine-authored; not human-reviewed or editorially accepted',
      orderedClaimIds: ids,
    },
    claims,
    evidence,
    sources,
    entities,
    limits,
  };
  // Snapshot the input so later caller mutations cannot change the export.
  return JSON.parse(canonicalJson(packet)) as typeof packet;
}

export type ResearchPacket = Awaited<ReturnType<typeof researchPacket>>;
export function packetJson(packet: ResearchPacket) {
  return JSON.stringify(packet, null, 2) + '\n';
}
export const md = (text: string) => text.replace(/[\\`*_{}[\]<>#|]/g, '\\$&');
export function packetMarkdown(packet: ResearchPacket) {
  const selection = packet.selection.definition;
  const lines = [
    '# ' + md(selection.title),
    '',
    `Selection: ${selection.id} · version ${selection.version} · ${selection.editorialStatus}`,
    `Selection fingerprint: ${packet.selection.fingerprint}`,
    `Dataset: ${md(packet.dataset.metadata.title)} · schema ${packet.dataset.metadata.schemaVersion} · updated ${packet.dataset.metadata.updatedAt}`,
    `Dataset fingerprint: ${packet.dataset.fingerprint}`,
    '',
    '## Limits',
    '',
    ...packet.limits.map((s) => '- ' + s),
    '',
    '## Authored reading prose',
    '',
    md(selection.question),
    '',
    'Status: ' + packet.selection.interpretationStatus,
    '',
  ];
  const passage = (p: PathSelection['introduction'][number]) => {
    lines.push(
      md(p.text),
      '',
      `Passage: ${p.id}. Supporting claims: ${p.claimIds.join(', ')}.`,
      '',
    );
  };
  selection.introduction.forEach(passage);
  for (const section of selection.sections) {
    lines.push(
      '### ' + md(section.title),
      '',
      `${section.id} · ${section.kind}`,
      '',
      md(section.description),
      '',
      'Interpretive limit: ' + md(section.gap),
      '',
    );
    section.passages.forEach(passage);
    for (const item of selection.items.filter(
      (i) => i.sectionId === section.id,
    ))
      lines.push(
        `- ${item.claimId}: ${md(item.rationale)}${item.warning ? ' Interpretive gap: ' + md(item.warning) : ''}`,
      );
    lines.push('');
  }
  lines.push('## Stored claim records (selection order)', '');
  for (const claim of packet.claims) {
    lines.push(
      `### ${claim.id}`,
      '',
      md(claim.statement),
      '',
      'Qualification: ' + md(claim.qualification),
      '',
      `Temporal record: ${timeLabel(claim)}. ${md(claim.time.note)}`,
      '',
      `Derivation: ${claim.derivation}. Resolution: ${claim.resolution}. Editorial state: ${claim.editorialState}. Recorded: ${claim.recordedAt}.`,
      '',
      `Evidence references: ${claim.evidenceIds.join(', ')}.`,
      '',
      `Application link (relative to an installed Selekoa): ${referenceHash({ kind: 'claim', id: claim.id })}`,
      '',
    );
    if (claim.inferenceRationale)
      lines.push('Inference rationale: ' + md(claim.inferenceRationale), '');
    if (claim.supersedes) lines.push('Supersedes: ' + claim.supersedes, '');
    if (claim.attributes)
      lines.push(
        'Stored attributes:',
        '',
        '```json',
        JSON.stringify(claim.attributes, null, 2),
        '```',
        '',
      );
  }
  lines.push('## Evidence references (original passages omitted)', '');
  for (const e of packet.evidence)
    lines.push(
      `### ${e.id}`,
      '',
      `Claim: ${e.claimId}. Source: ${e.sourceId}.`,
      '',
      `${e.sourceRole} source; ${e.support}; original passage type: ${e.passageType}.`,
      '',
      'Locator: ' + md(e.locator),
      '',
      `Verification: ${e.verification}; checked ${e.checkedAt}${e.reviewer ? '; reviewer: ' + md(e.reviewer) : ''}.`,
      '',
      'Stored verification note: ' + md(e.note),
      '',
    );
  lines.push('## Original source metadata', '');
  for (const s of packet.sources) {
    lines.push(
      '### ' + s.id,
      '',
      md(sourceReference(s)),
      '',
      'Attribution: ' + md(s.reuse.attribution),
      '',
      'Reuse: ' + md(s.reuse.licence + '. ' + s.reuse.note),
      '',
    );
    if (s.upstream)
      lines.push(
        'Upstream metadata:',
        '',
        '```json',
        JSON.stringify(s.upstream, null, 2),
        '```',
        '',
      );
  }
  return lines.join('\n').trimEnd() + '\n';
}
