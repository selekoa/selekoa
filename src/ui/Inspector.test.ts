import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { expect, it } from 'vitest';
import { createRepository, repository } from '../domain/repository';
import { Inspector } from './Inspector';
import { reviewExceptions } from './ReviewMarkers';

it('shows inference, dispute, rationale and review independently in the Inspector', () => {
  const data = structuredClone(repository.data);
  const claim = data.claims[0];
  claim.derivation = 'inferred';
  claim.resolution = 'contested';
  claim.inferenceRationale =
    'Synthetic premise leading to an explicitly qualified inference.';
  const counter = {
    ...data.evidence[0],
    id: 'synthetic-counter',
    support: 'contradicts' as const,
    sourceRole: 'secondary' as const,
  };
  data.evidence.push(counter);
  claim.evidenceIds.push(counter.id);
  const html = renderToStaticMarkup(
    createElement(Inspector, {
      repository: createRepository(data),
      claimId: claim.id,
      entityId: null,
      visibleClaims: [],
      onClaim() {},
      onEntity() {},
      onClose() {},
      onTopic() {},
    }),
  );
  for (const text of [
    'Inferred',
    'Contested',
    claim.inferenceRationale,
    'Counterevidence: secondary',
    'An exploratory record that no editor has accepted',
    'Machine-checked',
  ])
    expect(html).toContain(text);
});

it('labels each claim’s review status in plain words, never “Seed”', () => {
  const render = (claimId: string, data = repository.data) =>
    renderToStaticMarkup(
      createElement(Inspector, {
        repository: createRepository(data),
        claimId,
        entityId: null,
        visibleClaims: [],
        onClaim() {},
        onEntity() {},
        onClose() {},
        onTopic() {},
      }),
    );
  const seed = repository.data.claims.find(
    (c) =>
      c.editorialState === 'seed' &&
      c.evidenceIds.every(
        (id) => repository.evidence.get(id)!.verification !== 'human_reviewed',
      ),
  )!;
  const html = render(seed.id);
  const statusLine = html.slice(
    html.indexOf('class="status-line"'),
    html.indexOf('aria-label="Evidence coverage"'),
  );
  expect(statusLine).toContain('Machine-checked, not reviewed by an editor');
  expect(statusLine).not.toContain('Seed');
  const details = html.slice(html.indexOf('class="semantics"'));
  expect(details).toContain('Not reviewed by an editor');
  expect(details).not.toContain('Seed');
  const accepted = repository.data.claims.find(
    (c) => c.editorialState === 'accepted',
  )!;
  const reviewed = render(accepted.id);
  expect(reviewed).toContain(
    'Editorially accepted · human-reviewed evidence</span>',
  );
  expect(reviewExceptions(seed, repository)).toEqual([]);
});

it('lists the archived copy next to the original in an entity’s sources', () => {
  const html = renderToStaticMarkup(
    createElement(Inspector, {
      repository,
      claimId: null,
      entityId: 'diminishing-returns-to-intelligence',
      visibleClaims: [],
      onClaim() {},
      onEntity() {},
      onClose() {},
      onTopic() {},
    }),
  );
  const source = repository.sources.get('source-sits-2000-capture')!;
  expect(html).toContain(`href="${source.canonicalUrl}"`);
  expect(html).toContain(`href="${source.archivedUrl}"`);
  expect(html).toContain('Archived copy, captured 2000-12-04');
});
