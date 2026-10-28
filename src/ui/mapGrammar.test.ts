import { expect, it } from 'vitest';
import { repository } from '../domain/repository';
import { queryDataset, relationshipClaims } from '../domain/query';
import { networkLayout, documentSequence } from './layout';
import {
  compactClaims,
  isProvisional,
  relationFamily,
  stageLabel,
} from './mapGrammar';
import { entityStyle } from './entityStyle';
import { curveGeometry, shortLabel } from './mapDrawing';

const data = repository.data;
it('compacts actual claims without losing IDs, direction, family or exact stage', () => {
  const bundles = compactClaims(data.claims);
  expect(bundles.flatMap((b) => b.claims.map((c) => c.id)).sort()).toEqual(
    relationshipClaims(data.claims)
      .map((c) => c.id)
      .sort(),
  );
  for (const b of bundles)
    for (const c of b.claims) {
      expect(c.subject).toBe(b.source);
      expect(c.object).toEqual({ kind: 'entity', entityId: b.target });
      expect(relationFamily(c)).toBe(b.family);
      expect(stageLabel(c)).toBe(b.stage);
    }
  expect(
    bundles.find((b) => b.source === 'rsp-v3-0' && b.target === 'rsp-v2-2')
      ?.claims,
  ).toHaveLength(7);
  expect(
    bundles.some((b) => b.claims.some((c) => c.id === 'xai-round-total-2024')),
  ).toBe(false);
  expect(
    bundles.some((b) => b.source === 'openai' && b.target === 'microsoft'),
  ).toBe(true);
  expect(
    bundles.some((b) => b.source === 'microsoft' && b.target === 'openai'),
  ).toBe(true);
});
it('separates announced capital and planned compute from reported realisation', () => {
  for (const c of data.claims)
    if (
      [
        'announced',
        'planned',
        'committed',
        'contracted',
        'undisclosed',
      ].includes(stageLabel(c))
    )
      expect(isProvisional(c), c.id).toBe(true);
  for (const c of data.claims)
    if (
      ['invested', 'completed', 'deployed', 'operational'].includes(
        stageLabel(c),
      )
    )
      expect(isProvisional(c), c.id).toBe(false);
  expect(
    relationFamily(
      data.claims.find((c) => c.predicate === 'supersedes_document')!,
    ),
  ).toBe('governance');
  expect(
    relationFamily(data.claims.find((c) => c.predicate === 'cites')!),
  ).toBe('intellectual');
});
it('gives every primary and secondary entity type a distinct non-letter silhouette', () => {
  // Nine types since schema 2.19 added countries.
  expect(new Set(Object.values(entityStyle).map((s) => s.path)).size).toBe(9);
});
// Four full force layouts: CPU-bound, and slow while test files run in parallel.
it('keeps the four atlas landmarks pinned and layouts independent of input order or parallel counts', () => {
  const positions = networkLayout(
    data.entities,
    data.claims,
    data.meta.anchors,
    null,
  );
  const reordered = networkLayout(
    [...data.entities].reverse(),
    [...data.claims].reverse(),
    data.meta.anchors,
    null,
  );
  expect(reordered).toEqual(positions);
  expect(
    networkLayout(
      data.entities,
      [...data.claims, ...data.claims],
      data.meta.anchors,
      null,
    ),
  ).toEqual(positions);
  data.meta.anchors.forEach((id, i) =>
    expect(positions.get(id)).toEqual({
      x: i % 2 ? 300 : -300,
      y: 220 - Math.floor(i / 2) * 440,
    }),
  );
  const visible = queryDataset(data, {
    topic: 'all',
    throughYear: 2026,
    entityType: 'all',
    focusId: 'anthropic',
  });
  const focus = networkLayout(
    visible.entities,
    visible.claims,
    data.meta.anchors,
    'anthropic',
    positions,
  );
  expect([...focus.keys()].sort()).toEqual(
    visible.entities.map((e) => e.id).sort(),
  );
  expect(focus.get('anthropic')).toEqual(positions.get('anthropic'));
  for (const p of focus.values())
    expect(Number.isFinite(p.x) && Number.isFinite(p.y)).toBe(true);
}, 20000);
it('retains exact target direction in offset reciprocal paths and bounds long labels', () => {
  const a = { x: 0, y: 0 },
    b = { x: 200, y: 0 };
  const forward = curveGeometry(a, b, 40),
    reverse = curveGeometry(b, a, 40);
  expect(forward.b.x).toBeGreaterThan(forward.a.x);
  expect(reverse.b.x).toBeLessThan(reverse.a.x);
  expect(forward.mid.y).not.toBe(reverse.mid.y);
  expect(
    shortLabel(
      'A very long document title that would otherwise obscure its neighbours',
    ),
  ).toHaveLength(25);
  expect(shortLabel('RSP · v3.0')).toBe('RSP · v3.0');
});

it('orders the RSP family by explicit succession only, with every version retained', () => {
  const visible = queryDataset(data, {
    topic: 'governance',
    throughYear: 2026,
    entityType: 'all',
    focusId: null,
    frameworkFamily: 'anthropic-rsp',
  });
  const sequence = documentSequence(visible.entities, visible.claims)!;
  expect(sequence[0].id).toBe('rsp-2023');
  expect(sequence.at(-1)?.id).toBe('rsp-v3-4');
  expect(new Set(sequence.map((e) => e.id)).size).toBe(9);
  for (let i = 1; i < sequence.length; i++)
    expect(
      visible.claims.some(
        (c) =>
          c.predicate === 'supersedes_document' &&
          c.subject === sequence[i].id &&
          c.object.kind === 'entity' &&
          c.object.entityId === sequence[i - 1].id,
      ),
    ).toBe(true);
  expect(
    documentSequence(
      visible.entities,
      visible.claims.filter((c) => c.predicate !== 'supersedes_document'),
    ),
  ).toBeNull();
});
