import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { repository } from './repository';
import { questionStarterView } from './question-starter';
import {
  questionGapsMarkdown,
  questionStarter,
  questionStarterMarkdown,
} from './question-starter-export';
import { resolveReference } from './deep-links';
import { frameworkVersions } from './versions';
import { selfGovernance } from '../reading/self-governance';
import { externalCommitments } from '../reading/commitments';
import { frontierSafetyFrameworks } from '../reading/frontier-safety-frameworks';

const data = repository.data;
const view = questionStarterView(data, selfGovernance);
const section = (id: string) => view.sections.find((s) => s.id === id)!;
const idsIn = (id: string) =>
  section(id).groups.flatMap((g) => g.claims.map((c) => c.id));

describe('frameworks-to-obligations question', () => {
  it('uses only existing records, each once, with evidence and a source', () => {
    expect(new Set(view.claimIds).size).toBe(view.claimIds.length);
    for (const id of view.claimIds) {
      const claim = repository.claims.get(id);
      // The same object as the dataset's record, not a copy.
      expect(claim).toBe(data.claims.find((c) => c.id === id));
      expect(claim!.evidenceIds.length).toBeGreaterThan(0);
      for (const e of claim!.evidenceIds)
        expect(
          repository.sources.get(repository.evidence.get(e)!.sourceId)
            ?.evidenceUrl,
        ).toMatch(/^https?:\/\//);
    }
  });

  it('lists the earliest recorded edition of every framework in scope', () => {
    expect(
      selfGovernance.families.map((f) => frameworkVersions(data, f)[0].id),
    ).toEqual(selfGovernance.earliestEditionIds);
    for (const id of selfGovernance.earliestEditionIds)
      expect(
        section('frameworks').groups[0].claims.some(
          (c) => c.object.kind === 'entity' && c.object.entityId === id,
        ),
      ).toBe(true);
  });

  it('keeps every disputed record of the selected editions in the open part', () => {
    const editions = new Set([
      ...selfGovernance.earliestEditionIds,
      ...selfGovernance.keyRevisionIds,
    ]);
    const disputed = data.claims.filter(
      (c) => editions.has(c.subject) && c.resolution !== 'supported',
    );
    expect(disputed.length).toBeGreaterThan(0);
    for (const c of disputed) expect(idsIn('open')).toContain(c.id);
    for (const c of view.disputed) expect(idsIn('open')).toContain(c.id);
  });

  it('places every framework link to an in-scope text, and nothing else, as a link', () => {
    const links = data.claims.filter(
      (c) =>
        c.predicate === 'references_commitment' &&
        c.object.kind === 'entity' &&
        selfGovernance.commitmentIds.includes(c.object.entityId),
    );
    for (const c of links) expect(view.claimIds).toContain(c.id);
    expect(
      view.chronology.filter((e) => e.kind === 'link').map((e) => e.claim.id),
    ).toEqual(expect.arrayContaining(links.map((c) => c.id)));
  });

  it('builds a dated chronology with SB 53 enactment and entry into force', () => {
    const dates = view.chronology.map((e) => e.date);
    expect(dates).toEqual([...dates].sort());
    const sb53 = view.chronology.filter(
      (e) => e.documentId === 'california-sb-53',
    );
    expect(sb53.map((e) => [e.kind, e.date, e.basis])).toEqual(
      expect.arrayContaining([
        ['enacted', '2025-09-29', 'signature'],
        ['effective', '2026-01-01', 'effective'],
      ]),
    );
    // Entry into force rests on the enactment record's context evidence.
    const effective = sb53.find((e) => e.kind === 'effective')!;
    expect(
      effective.claim.evidenceIds.some(
        (id) => repository.evidence.get(id)!.support === 'context',
      ),
    ).toBe(true);
    for (const id of [
      'cm-wh-2023-07-published',
      'cm-seoul-published',
      'cm-eu-code-published',
    ])
      expect(view.chronology.map((e) => e.claim.id)).toContain(id);
  });

  it('reuses open questions and set-aside questions verbatim', () => {
    const stored = [
      ...externalCommitments.openQuestions,
      ...externalCommitments.stops,
      ...frontierSafetyFrameworks.openQuestions,
    ].map((s) => s.text);
    for (const q of [...view.openQuestions, ...view.setAside])
      expect(stored).toContain(q.text);
    expect(view.setAside.map((s) => s.id)).toContain('sb53-alleged-violations');
  });

  it('computes coverage gaps from the records', () => {
    const gap = (id: string) => view.gaps.find((g) => g.id === id)!;
    const enacted = data.claims.filter((c) => c.predicate === 'enacted');
    expect(gap('jurisdictions').detail!.claimIds).toEqual(
      enacted.map((c) => c.id),
    );
    // No signatory listed here has a framework family in scope.
    for (const id of gap('other-signatories').detail!.claimIds)
      expect(selfGovernance.organisationIds).not.toContain(
        repository.claims.get(id)!.subject,
      );
    for (const g of view.gaps)
      for (const id of g.claimIds) expect(repository.claims.has(id)).toBe(true);
  });

  it('resolves its address and part links, and rejects unknown parts', () => {
    expect(
      resolveReference('#/question/frameworks-to-obligations', data),
    ).toMatchObject({
      target: { kind: 'question', id: 'frameworks-to-obligations' },
    });
    expect(
      resolveReference(
        '#/question/frameworks-to-obligations?section=law-and-code&inspect=sb-framework-duty',
        data,
      ).target,
    ).toMatchObject({ section: 'law-and-code', inspect: 'sb-framework-duty' });
    expect(
      resolveReference(
        '#/question/frameworks-to-obligations?section=nope',
        data,
      ).target,
    ).toBeNull();
    expect(
      resolveReference(
        '#/question/frameworks-to-obligations?claim=sb-framework-duty',
        data,
      ).target,
    ).toBeNull();
  });
});

describe('frameworks-to-obligations starter export', async () => {
  const starter = await questionStarter(data, selfGovernance);
  const markdown = questionStarterMarkdown(starter);

  it('cites the original source before Selekoa identifiers', () => {
    for (const c of starter.citations) {
      expect(Object.keys(c)).toEqual(['original', 'selekoa']);
      expect(c.original.length).toBeGreaterThan(0);
      expect(c.original[0].url).toMatch(/^https?:\/\//);
    }
    for (const id of ['sb-framework-duty', 'cm-link-rsp-v2-0-wh']) {
      const block = markdown.slice(
        markdown.indexOf(repository.claims.get(id)!.statement.slice(0, 40)),
      );
      expect(block.indexOf('Original source: [')).toBeGreaterThan(-1);
      expect(block.indexOf('Original source: [')).toBeLessThan(
        block.indexOf('Selekoa: claim ' + id),
      );
    }
  });

  it('includes every record, its qualification and the gap list', () => {
    expect(starter.question.orderedClaimIds).toEqual(view.claimIds);
    for (const id of view.claimIds) {
      expect(markdown).toContain('Selekoa: claim ' + id + ' ');
    }
    expect(markdown).toContain('## What Selekoa cannot answer here');
    expect(markdown).toContain('## Chronology');
    for (const g of view.gaps) expect(markdown).toContain(g.area);
  });

  it('omits quotes the source reuse note does not permit', () => {
    for (const e of starter.evidence)
      if (!e.passageIncluded) expect(e).not.toHaveProperty('passage');
  });

  it('matches the stored candidate research tasks', () => {
    // Run `pnpm question:gaps` after a data or definition change.
    expect(readFileSync('review/essay-starter-gaps.md', 'utf8')).toBe(
      questionGapsMarkdown(data, selfGovernance),
    );
  });
});
