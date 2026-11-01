/**
 * Lays out a map off the main thread (src/ui/map-layout.ts): the page stays
 * usable, its list of connections included, while the positions are found.
 */
import type { Claim, Entity } from '../domain/schema';
import { networkLayout, type Point } from './layout';

export type LayoutRequest = {
  n: number;
  entities: Entity[];
  claims: Claim[];
  anchors: string[];
  focusId: string | null;
  reference: [string, Point][] | null;
};
export type LayoutAnswer = { n: number; positions: [string, Point][] };

self.onmessage = (event: MessageEvent<LayoutRequest>) => {
  const { n, entities, claims, anchors, focusId, reference } = event.data;
  const positions = networkLayout(
    entities,
    claims,
    anchors,
    focusId,
    reference ? new Map(reference) : undefined,
  );
  self.postMessage({ n, positions: [...positions] } satisfies LayoutAnswer);
};
