import { readFile } from 'node:fs/promises';
import { describe, expect, it } from 'vitest';
import { format } from 'prettier';
import frozen from '../../research/collections/conceptual-provenance-i/upstream.json';
import selection from '../../research/collections/conceptual-provenance-i/selection.json';
import { canonicalJson, fingerprint } from '../domain/references';
import { buildCollection, collectionJson } from './collection';
import {
  captureSnapshot,
  columns,
  parseCsv,
  paths,
  type Snapshot,
  type Table,
  upstreamCommit,
} from './upstream';
import {
  crosswalkMarkdown,
  inventoryMarkdown,
  starterMarkdown,
} from './render';

const clone = () => structuredClone(frozen) as Snapshot;
const result = () => buildCollection(frozen, selection);

describe('bounded research collection', () => {
  it('reproduces every committed projection byte for byte', async () => {
    const c = await result();
    for (const [name, rendered] of Object.entries({
      'collection.json': collectionJson(c),
      'starter.md': starterMarkdown(c),
      'inventory.md': inventoryMarkdown(c),
      'crosswalk.md': crosswalkMarkdown(c),
    })) {
      const file = new URL(
        '../../research/collections/conceptual-provenance-i/' + name,
        import.meta.url,
      );
      expect(await readFile(file, 'utf8')).toBe(
        await format(rendered, {
          parser: name.endsWith('.json') ? 'json' : 'markdown',
        }),
      );
    }
    expect(c.upstream.commit).toBe(upstreamCommit);
    expect(c.records).toHaveLength(11);
    expect(c.evidence).toHaveLength(18);
    expect(c.sources).toHaveLength(12);
  });

  it('is independent of input ordering and wall-clock time', async () => {
    const input = clone();
    for (const key of [
      'claims',
      'evidence',
      'sources',
      'mappings',
      'files',
    ] as const)
      input[key].reverse();
    const reordered = structuredClone(selection);
    reordered.records.reverse();
    reordered.evidenceInterpretations.reverse();
    expect(canonicalJson(await buildCollection(input, reordered))).toBe(
      canonicalJson(await result()),
    );
  });

  it('rejects duplicate selectors, addresses, identities and evidence content', async () => {
    const duplicateSelection = structuredClone(selection);
    duplicateSelection.records.push(duplicateSelection.records[0]);
    await expect(buildCollection(frozen, duplicateSelection)).rejects.toThrow(
      'Duplicate selection',
    );
    const address = clone();
    address.evidence.push(address.evidence[0]);
    await expect(buildCollection(address, selection)).rejects.toThrow(
      'Duplicate upstream row',
    );
    const content = clone();
    content.evidence.push({ ...content.evidence[0], ordinal: 999 });
    await expect(buildCollection(content, selection)).rejects.toThrow(
      'Duplicate evidence content',
    );
    const source = clone();
    source.sources.push({ ...source.sources[0], ordinal: 999 });
    await expect(buildCollection(source, selection)).rejects.toThrow(
      'Duplicate expression',
    );
  });

  it('rejects tampering and broken source/claim mappings', async () => {
    const tampered = clone();
    tampered.claims[0].values.ATOMIC_CLAIM = 'changed';
    await expect(buildCollection(tampered, selection)).rejects.toThrow(
      'fingerprint',
    );
    const broken = clone();
    broken.evidence[0].values.EXPRESSION_ID = 'unknown';
    broken.evidence[0].fingerprint = await fingerprint(
      broken.evidence[0].values,
    );
    await expect(buildCollection(broken, selection)).rejects.toThrow(
      'Broken evidence',
    );
    const wrongAnnotation = structuredClone(selection);
    wrongAnnotation.evidenceInterpretations[0].upstreamClaimId = 'PCR-002';
    await expect(buildCollection(frozen, wrongAnnotation)).rejects.toThrow(
      'interpretation mapping',
    );
  });

  it('preserves false investigated assertions, partial support and contextual evidence', async () => {
    const c = await result();
    const wrong = c.records.find((r) => r.upstreamId === 'PCR-017')!;
    expect(wrong.investigatedProposition).toContain('Robin Hanson-authored');
    expect(wrong.machineFinding.status).toBe('CONTRADICTS');
    const mixed = c.records.find((r) => r.upstreamId === 'PCR-036')!;
    expect(
      c.evidence
        .filter((e) => e.recordId === mixed.id)
        .map((e) => e.assessment.status),
    ).toEqual(['UNRESOLVED', 'CONTRADICTS']);
    expect(mixed.machineFinding.status).toBe('CONTRADICTS');
    expect(
      c.evidence
        .filter((e) => e.recordId === 'si-pcr-010')
        .map((e) => e.assessment.status),
    ).toEqual(['SUPPORTS', 'PARTIALLY_SUPPORTS']);
    expect(
      c.evidence
        .filter((e) => e.recordId === 'si-pcr-045')
        .every((e) => e.relationship.role === 'context'),
    ).toBe(true);
    expect(starterMarkdown(c)).toContain(
      'Investigated proposition (not an accepted fact)',
    );
  });

  it('retains opposing evidence on one proposition without voting or erasure', async () => {
    const input = clone();
    const row = input.evidence.find((r) => r.ordinal === 62)!;
    row.values.MACHINE_PRELIMINARY_STATUS = 'CONTRADICTS';
    row.fingerprint = await fingerprint(row.values);
    const c = await buildCollection(input, selection);
    expect(
      c.records.find((r) => r.upstreamId === 'PCR-010')!.machineFinding.status,
    ).toBe('SUPPORTS');
    expect(
      c.evidence
        .filter((e) => e.recordId === 'si-pcr-010')
        .map((e) => e.assessment.status),
    ).toEqual(['SUPPORTS', 'CONTRADICTS']);
    // Selekoa's manually recorded role remains independent of an upstream status.
    expect(
      c.evidence.find((e) => e.id === 'si-evidence-062')!.relationship.role,
    ).toBe('partially_supports');
  });

  it('preserves unknown dates and conflicting expression URLs without date inference', async () => {
    const c = await result();
    expect(
      c.sources.find((s) => s.sourceId === 'SRC-0AE9913B1E4386')!
        .publicationDateAsReported,
    ).toBeNull();
    expect(c.evidence.every((e) => e.originalCheckDate === null)).toBe(true);
    expect(c.records.every((r) => r.eventDate === null)).toBe(true);
    const paper = c.sources.find((s) => s.sourceId === 'SRC-C4858D4EF280D8')!;
    expect(paper.catalogExpressionUrl).toContain('v4');
    expect(
      c.evidence.find((e) => e.id === 'si-evidence-010')!
        .expressionUrlInspectedByUpstream,
    ).toContain('v1');
    expect(paper.versionLimits.join(' ')).toContain('differs');
    expect(
      c.evidence.find((e) => e.id === 'si-evidence-017')!.captureDateAsReported,
    ).toBe('2025-04-27');
  });

  it('cannot promote upstream machine statuses or human fields into graph acceptance', async () => {
    const c = await result();
    expect(
      c.records.every(
        (r) =>
          r.editorialAdmission === 'research_only' &&
          r.humanReview.evidence === 'not_recorded',
      ),
    ).toBe(true);
    expect(
      c.evidence.every((e) => e.humanEvidenceReview.state === 'not_recorded'),
    ).toBe(true);
    expect(
      c.records.some((r) => 'resolution' in r || 'editorialState' in r),
    ).toBe(false);
    const input = clone();
    input.claims[0].values.HUMAN_VERDICT = 'YES';
    input.claims[0].fingerprint = await fingerprint(input.claims[0].values);
    await expect(buildCollection(input, selection)).rejects.toThrow(
      'separate task',
    );
  });

  it('preserves row mapping identities without redistributing private packet prose', async () => {
    const c = await result();
    expect(c.mappings.length).toBeGreaterThan(0);
    expect(
      c.mappings.every(
        (m) =>
          m.packetClaimId.startsWith('CLM-') &&
          m.packetOccurrenceId.startsWith('OCC-'),
      ),
    ).toBe(true);
    expect(JSON.stringify(frozen)).not.toContain('ORIGINAL_RAW_CITATION_TEXT');
    expect(
      c.records.every((r) =>
        r.upstream.projectedRowFingerprint.startsWith('sha256:'),
      ),
    ).toBe(true);
    expect(
      c.records.find((r) => r.upstreamId === 'PCR-002')!.search
        .earliestPositiveEvidenceAsReported,
    ).toBe('2004 (positive occurrence only)');
  });
});

describe('CSV capture', () => {
  it('preserves quoted delimiters, newlines, Unicode and empty final cells', () => {
    expect(
      parseCsv('\uFEFFid,text,empty\r\n1,"α, ""quoted""\r\nline",\r\n'),
    ).toEqual([{ id: '1', text: 'α, "quoted"\nline', empty: '' }]);
    expect(() => parseCsv('id,id\n1,2')).toThrow('duplicate');
    expect(() => parseCsv('id,text\n1,"oops')).toThrow('Unclosed');
    expect(() => parseCsv('id,text\n1,"x"oops')).toThrow('Malformed');
  });

  it('selects all linked evidence and expressions and allowlists crosswalk cells', async () => {
    const csv = (rows: Record<string, string>[], keys: readonly string[]) =>
      [keys, ...rows.map((r) => keys.map((k) => r[k]))]
        .map((row) =>
          row.map((cell) => '"' + cell.replaceAll('"', '""') + '"').join(','),
        )
        .join('\n') + '\n';
    const files = (Object.keys(paths) as Table[]).map((key) => {
      const keys = [
        ...columns[key],
        ...(key === 'mappings' ? ['ORIGINAL_RAW_CITATION_TEXT'] : []),
      ];
      const rows = frozen[key].map((r) => ({
        ...r.values,
        ORIGINAL_RAW_CITATION_TEXT: 'private text excluded',
      }));
      return {
        path: paths[key],
        content: csv(rows, keys),
        sha256: 'sha256:' + 'a'.repeat(64),
        gitBlob: 'b'.repeat(40),
      };
    });
    const captured = await captureSnapshot(
      files,
      selection.records.map((r) => r.upstreamId),
    );
    expect(captured.evidence).toHaveLength(18);
    expect(captured.sources).toHaveLength(12);
    expect(JSON.stringify(captured)).not.toContain('private text excluded');
    await expect(captureSnapshot(files, ['PCR-999'])).rejects.toThrow(
      'Missing',
    );
  });
});
