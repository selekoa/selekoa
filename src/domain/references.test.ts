import { describe, expect, it } from 'vitest';
import { createHash } from 'node:crypto';
import { repository } from './repository';
import { researchPaths } from './research-path';
import {
  canonicalJson,
  claimReference,
  fingerprint,
  packetJson,
  packetMarkdown,
  researchPacket,
  sourceReference,
} from './references';
import {
  referenceHash,
  resolveReference,
  type ReferenceTarget,
} from './deep-links';

const data = repository.data;
const selection = researchPaths[0];

describe('stable reference targets', () => {
  const item = selection.items[3];
  const targets: ReferenceTarget[] = [
    { kind: 'claim', id: item.claimId },
    { kind: 'dossier', id: selection.institutionId! },
    { kind: 'person', id: 'jan-leike' },
    { kind: 'document', id: 'rsp-v2-0', inspect: 'issued-rsp-2-0' },
    { kind: 'question', id: selection.id, section: item.sectionId },
    { kind: 'reading', id: selection.id },
    { kind: 'reading', id: selection.id, section: item.sectionId },
    {
      kind: 'reading',
      id: selection.id,
      section: item.sectionId,
      claim: item.claimId,
      inspect: item.claimId,
    },
    { kind: 'search' },
    { kind: 'search', q: 'ASL-3 “Long-Term Benefit Trust” & board' },
    { kind: 'search', q: 'MIRI', mode: 'names', inspect: item.claimId },
  ];
  it.each(targets)('resolves $kind by stable identity', (target) => {
    expect(resolveReference(referenceHash(target), data)).toEqual({
      target,
      notice: null,
    });
  });
  it.each([
    '#/claim/missing',
    '#/claim/%ZZ',
    '#/dossier/dario-amodei',
    '#/reading/missing',
    '#/reading/' + selection.id + '?section=missing',
    '#/reading/' + selection.id + '?claim=missing',
    '#/reading/' + selection.id + '?inspect=missing',
    '#/claim/' + item.claimId + '?foo=bar',
    '#/reading/' + selection.id + '?section=a&section=b',
    '#/reading/' + selection.id + '?claim=',
    '#/search?mode=all',
    '#/search?q=a&q=b',
    '#/search?q=a&inspect=missing',
    '#/search?q=a&foo=bar',
    '#/search/extra',
  ])('rejects unavailable or malformed references: %s', (hash) => {
    expect(resolveReference(hash, data).target).toBeNull();
    expect(resolveReference(hash, data).notice).toContain(
      'does not match any record',
    );
  });
  it('rejects a claim paired with a different section', () => {
    expect(
      resolveReference(
        referenceHash({
          kind: 'reading',
          id: selection.id,
          claim: item.claimId,
          section: selection.sections.find((s) => s.id !== item.sectionId)!.id,
        }),
        data,
      ).target,
    ).toBeNull();
  });
  it('preserves a superseded record instead of silently redirecting', () => {
    const original = data.claims[0];
    const changed = structuredClone(data);
    changed.claims.push({
      ...original,
      id: 'replacement-test',
      supersedes: original.id,
    });
    const result = resolveReference(
      referenceHash({ kind: 'claim', id: original.id }),
      changed,
    );
    expect(result.target).toEqual({ kind: 'claim', id: original.id });
    expect(result.notice).toContain('A newer claim replaces this one');
  });
});

describe('citations and documentary exports', () => {
  it('retains bibliographic metadata and unknown publication dates without deriving them from access', () => {
    const source = {
      ...data.sources[0],
      publicationDate: null,
      versionDate: '2020',
      archivedUrl: 'https://example.org/archive',
    };
    const citation = sourceReference(source);
    for (const value of [
      ...source.authors,
      source.title,
      source.publisher,
      source.version,
      source.canonicalUrl,
      source.evidenceUrl,
      source.accessedAt,
      source.archivedUrl,
      'Publication: unknown',
      'version date: 2020',
    ])
      expect(citation).toContain(value);
    expect(sourceReference({ ...source, publicationDate: '1999' })).toContain(
      'Publication: 1999.',
    );
    expect(citation).not.toContain('Publication: ' + source.accessedAt);
  });
  it('identifies a claim separately from a publication', async () => {
    const claim = data.claims[0];
    const text = await claimReference(
      data,
      claim,
      'https://example.org/' + referenceHash({ kind: 'claim', id: claim.id }),
    );
    for (const value of [
      claim.id,
      claim.statement,
      claim.qualification,
      claim.editorialState,
      await fingerprint(data),
      'not an original publication',
    ])
      expect(text).toContain(value);
  });
  it('is deterministic and uses standard SHA-256 on canonical UTF-8 JSON', async () => {
    const packet = await researchPacket(data, selection);
    expect(
      packetJson(
        await researchPacket(structuredClone(data), structuredClone(selection)),
      ),
    ).toBe(packetJson(packet));
    expect(packetMarkdown(await researchPacket(data, selection))).toBe(
      packetMarkdown(packet),
    );
    expect(await fingerprint(data)).toBe(
      'sha256:' +
        createHash('sha256').update(canonicalJson(data), 'utf8').digest('hex'),
    );
    expect(await fingerprint({ b: 1, a: 2 })).toBe(
      await fingerprint({ a: 2, b: 1 }),
    );
    expect(
      await fingerprint({ ...data, meta: { ...data.meta, scope: 'Changed' } }),
    ).not.toBe(packet.dataset.fingerprint);
  });
  it('preserves selection, support, complete claims, temporal records and separate evidence verification', async () => {
    const modified = structuredClone(data);
    const id = selection.items[0].claimId;
    const claim = modified.claims.find((c) => c.id === id)!;
    claim.editorialState = 'accepted';
    const reviewed = modified.evidence.find(
      (e) => e.id === claim.evidenceIds[0],
    )!;
    reviewed.verification = 'human_reviewed';
    reviewed.reviewer = 'test-reviewer';
    const before = canonicalJson(modified);
    const packet = await researchPacket(modified, selection);
    expect(canonicalJson(modified)).toBe(before);
    expect(packet.selection.definition).toEqual(selection);
    expect(packet.selection.orderedClaimIds).toEqual(
      selection.items.map((i) => i.claimId),
    );
    expect(packet.selection.interpretationStatus).toContain(
      'not human-reviewed',
    );
    for (const c of packet.claims) {
      expect(c).toEqual(
        modified.claims.find((original) => original.id === c.id),
      );
      for (const id of c.evidenceIds)
        expect(packet.evidence.find((e) => e.id === id)?.claimId).toBe(c.id);
    }
    expect(packet.claims.some((c) => c.time.kind === 'unknown')).toBe(true);
    for (const e of packet.evidence) {
      const original = modified.evidence.find((o) => o.id === e.id)!;
      expect(e.verification).toBe(original.verification);
      expect(e.reviewer).toBe(original.reviewer);
      expect(e.note).toBe(original.note);
      expect(e).not.toHaveProperty('passage');
      expect(packet.sources.find((s) => s.id === e.sourceId)).toEqual(
        modified.sources.find((s) => s.id === e.sourceId),
      );
    }
    const markdown = packetMarkdown(packet);
    expect(markdown).toContain('reviewer: test-reviewer');
    expect(markdown).toContain('Editorial state: accepted');
    expect(markdown).toContain('Authored reading prose');
    expect(markdown).toContain('original passages omitted');
    for (const e of packet.evidence)
      expect(markdown).not.toContain(
        modified.evidence.find((o) => o.id === e.id)!.passage,
      );
    expect(JSON.parse(packetJson(packet))).toEqual(packet);
  });
  it('fails closed for missing selected claims, evidence and sources', async () => {
    for (const collection of ['claims', 'evidence', 'sources'] as const) {
      const broken = structuredClone(data);
      broken[collection] = [];
      await expect(researchPacket(broken, selection)).rejects.toThrow(
        'Missing',
      );
    }
  });
});
