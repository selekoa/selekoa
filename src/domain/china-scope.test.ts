import { describe, expect, it } from 'vitest';
import { repository } from './repository';
import { chinaScope, chineseHistories, landingSummary } from './landing';
import { frameworkVersions } from './versions';
import { chinaScopeNote } from '../reading/china-scope';
import { frontierFrameworksAndLaw } from '../reading/frameworks-and-law';

const data = repository.data;

describe('China scope note (maintainer decision of 2026-10-29)', () => {
  it('counts what it states from the records', () => {
    const scope = chinaScope(data);
    expect(scope.dossiers).toBe(chineseHistories.length);
    expect(scope.guideTexts).toBe(
      frontierFrameworksAndLaw.sections.find((s) => s.id === 'china')!
        .instruments.length,
    );
    const note = chinaScopeNote(scope);
    expect(note).toContain(`${scope.dossiers} institutional dossiers`);
    expect(note).toContain(
      `TC260’s AI Safety Governance Framework (${frameworkVersions(data, 'tc260-ai-safety-governance-framework').length} versions)`,
    );
    expect(landingSummary(data).china).toEqual(scope);
  });

  it('names the only framework from a Chinese developer in the records', () => {
    const framework = data.entities.find(
      (e) => e.id === 'sail-frontier-ai-risk-management-framework-v1-0',
    )!;
    expect(framework.documentVersion!.publisherId).toBe('shanghai-ai-lab');
    const developers = new Set([
      ...chineseHistories.map(([id]) => id),
      'shanghai-ai-lab',
    ]);
    const frameworks = data.entities.filter(
      (e) =>
        e.subtype === 'Framework edition' &&
        developers.has(e.documentVersion?.publisherId ?? ''),
    );
    expect(frameworks.map((e) => e.id)).toEqual([framework.id]);
  });
});
