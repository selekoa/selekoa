import { MultiDirectedGraph } from 'graphology';
import { expect, it } from 'vitest';
import { repository } from '../domain/repository';
import { relationshipClaims } from '../domain/query';
import { addClaimEdges } from './claimEdges';

it('keeps every graph edge keyed by its claim ID, including parallel version deltas', () => {
  const graph = new MultiDirectedGraph();
  repository.data.entities.forEach((e) => graph.addNode(e.id));
  addClaimEdges(graph, repository.data.claims);
  const claims = relationshipClaims(repository.data.claims);
  expect(graph.edges()).toEqual(claims.map((c) => c.id));
  for (const c of claims)
    expect(graph.extremities(c.id)).toEqual([c.subject, c.object.entityId]);
  // Four changelog-era claims plus two provision comparisons and one
  // contested assessment, each its own edge.
  expect(graph.directedEdges('rsp-v3-0', 'rsp-v2-2')).toHaveLength(7);
  expect(graph.hasEdge('xai-round-total-2024')).toBe(false);
});
