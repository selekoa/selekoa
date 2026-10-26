import { readFile } from 'node:fs/promises';
import { describe, expect, it } from 'vitest';
import { format } from 'prettier';
import input from '../../research/collections/conceptual-provenance-ii/research.json';
import parent from '../../research/collections/conceptual-provenance-i/collection.json';
import { buildFollowup, randomFinding } from './followup';
import { followupArtifacts, followupHumanReview } from './followup-render';
import { assertSafeReviewOutput } from '../editorial/seed-review';

const clone = () => structuredClone(input);
describe('versioned documentary research increment', () => {
  it('reproduces the complete exports and blank sample from frozen inputs', async () => {
    const c = await buildFollowup(input);
    for (const [file, text] of Object.entries(followupArtifacts(c))) {
      expect(
        await readFile(
          new URL(
            '../../research/collections/conceptual-provenance-ii/' + file,
            import.meta.url,
          ),
          'utf8',
        ),
      ).toBe(
        await format(text, {
          parser: file.endsWith('.json') ? 'json' : 'markdown',
        }),
      );
    }
    const pack = await format(followupHumanReview(c), { parser: 'markdown' });
    expect(pack).not.toMatch(
      /\*\*Human decision:\*\*\s+(YES|EDIT|RESEARCH MORE|REJECT)/,
    );
    expect(() =>
      assertSafeReviewOutput(
        pack.replace('**Notes:**', '**Notes:** inspected'),
        pack,
      ),
    ).toThrow('Nothing was overwritten');
  });
  it('preserves the original propositions, evidence, source IDs and complete packet mapping cells', async () => {
    const c = await buildFollowup(input);
    for (const r of c.inherited.records)
      expect(r).toEqual(parent.records.find((p) => p.id === r.id));
    for (const e of c.inherited.evidence)
      expect(e).toEqual(parent.evidence.find((p) => p.id === e.id));
    for (const m of c.inherited.mappings)
      expect(m).toEqual(parent.mappings.find((p) => p.id === m.id));
    expect(c.inherited.records.map((r) => r.upstreamId)).toEqual([
      'PCR-002',
      'PCR-010',
      'PCR-028',
    ]);
    expect(c.inherited.mappings.length).toBeGreaterThan(0);
    expect(
      c.inherited.sources.find((s) => s.id === 'EXP-SRC-C4858D4EF280D8')
        ?.catalogExpressionUrl,
    ).toContain('v4');
  });
  it('does not depend on source/finding input order or current time', async () => {
    const d = clone();
    d.sources.reverse();
    d.findings.reverse();
    d.evidence.reverse();
    d.corrections.reverse();
    expect(await buildFollowup(d)).toEqual(await buildFollowup(input));
  });
  it('rejects substitution of a nearby version or a plausible slug with the wrong post ID', async () => {
    const d = clone();
    d.sources.find((s) => s.id === 'arxiv-v1-pdf')!.resolvedUrl =
      'https://arxiv.org/pdf/1906.01820v3';
    await expect(buildFollowup(d)).rejects.toThrow('identity/version');
    const e = clone();
    e.sources.find((s) => s.id === 'af-intended')!.resolvedUrl = e.sources.find(
      (s) => s.id === 'af-wrong',
    )!.resolvedUrl;
    await expect(buildFollowup(e)).rejects.toThrow('Forum identity');
  });
  it('retains submission, displayed and file dates as different values', async () => {
    const c = await buildFollowup(input);
    const s = c.sources.find((s) => s.id === 'arxiv-v1-pdf')!;
    expect(s.dates.submissionStamp).toBe('2019-06-05');
    expect(s.dates.displayedTitleDate).toBe('2022-03-24');
    expect(s.archiveCapture).toBeNull();
    expect(c.findings.find((f) => f.id === 'CP2-F02')?.derivation).toBe(
      'inferred',
    );
  });
  it('rejects rewritten before-values, a different upstream commit or altered parent content', async () => {
    const d = clone();
    d.corrections[0].before = 'https://arxiv.org/abs/1906.01820v3';
    await expect(buildFollowup(d)).rejects.toThrow('Correction history');
    const e = clone();
    e.corrections[0].upstreamCommit = 'HEAD';
    await expect(buildFollowup(e)).rejects.toThrow('wrong upstream baseline');
    const p = structuredClone(parent);
    p.records[0].investigatedProposition = 'Changed';
    await expect(buildFollowup(input, p)).rejects.toThrow('Parent content');
  });
  it('keeps contradictory wrong-object evidence and rejects positive historical support from retrieval failure', async () => {
    const d = clone();
    d.evidence.find(
      (e) => e.findingId === 'CP2-F04' && e.role === 'contradicts',
    )!.role = 'context';
    await expect(buildFollowup(d)).rejects.toThrow('loses contradiction');
    const e = clone();
    const failed = e.evidence.find((e) => e.sourceId === 'af-other')!;
    failed.role = 'supports';
    await expect(buildFollowup(e)).rejects.toThrow('Retrieval failure');
    const c = await buildFollowup(input);
    expect(c.audit.disagreements.some((d) => d.id === 'CP2-D01')).toBe(true);
  });
  it('enforces the search boundaries and inventory rather than interpreting a zero as priority', async () => {
    const d = clone();
    d.search.throughDate = '2005-12-31';
    await expect(buildFollowup(d)).rejects.toThrow('boundary');
    const e = clone();
    e.search.manifest.pop();
    await expect(buildFollowup(e)).rejects.toThrow('count mismatch');
    const f = clone();
    f.search.manifest[0].url = 'http://sl4.org/archive/0501/date.html';
    await expect(buildFollowup(f)).rejects.toThrow('outside corpus');
    const c = await buildFollowup(input);
    expect(c.search.priority).toBe('unresolved');
    expect(c.search.bodyCount).toBe(355);
    expect(c.audit.independentSearch.selectedBodies).toBe(107);
  });
  it('reproduces the random draw over all findings and preserves separate human states', async () => {
    const c = await buildFollowup(input);
    expect(await randomFinding(c.sample.seed, c.sample.population)).toBe(
      c.sample.randomFindingId,
    );
    expect(new Set(c.sample.targetedFindingIds).size).toBeGreaterThanOrEqual(3);
    const d = clone();
    d.sample.population.pop();
    await expect(buildFollowup(d)).rejects.toThrow('Sample excludes');
    const e = clone();
    Object.assign(e.findings[0], { humanReview: 'accepted' });
    await expect(buildFollowup(e)).rejects.toThrow();
    const f = clone();
    Object.assign(f.corrections[0], { status: 'applied' });
    await expect(buildFollowup(f)).rejects.toThrow();
  });
  it('requires separately attributed audit coverage without making it human acceptance', async () => {
    const d = clone();
    d.audit.coverage.pop();
    await expect(buildFollowup(d)).rejects.toThrow('Missing attributed');
    const c = await buildFollowup(input);
    expect(c.audit.humanReview).toBe('not_recorded');
    expect(
      c.findings.every((f) => f.editorialAdmission === 'research_only'),
    ).toBe(true);
    expect(c.evidence.every((e) => e.humanReview === 'not_recorded')).toBe(
      true,
    );
  });
});
