import type { MultiDirectedGraph } from 'graphology';
import type { Claim } from '../domain/schema';
import { relationshipClaims } from '../domain/query';
import { relationLabel } from '../domain/predicates';

export function addClaimEdges(graph: MultiDirectedGraph, claims: Claim[]) {
  relationshipClaims(claims).forEach((c) => {
    graph.addDirectedEdgeWithKey(c.id, c.subject, c.object.entityId, {
      label: relationLabel(c),
      color: '#a7afa8',
      size: 1.25,
      type: 'curved',
      curvature: 0.08,
    });
  });
}
