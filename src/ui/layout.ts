import type { Entity, Claim } from '../domain/schema';
export type Point = { x: number; y: number };
const hash = (id: string) =>
  [...id].reduce((n, c) => (n * 31 + c.charCodeAt(0)) >>> 0, 7);

// Use a sequence only when the visible claims explicitly form one complete,
// unbranched succession chain. Dates alone never manufacture succession.
export function documentSequence(
  entities: Entity[],
  claims: Claim[],
): Entity[] | null {
  // A commitment text or law that a family edition explicitly links itself
  // to stays outside the sequence; any other second family means no sequence.
  const linked = new Set(
    claims
      .filter(
        (c) =>
          c.predicate === 'references_commitment' && c.object.kind === 'entity',
      )
      .map((c) => (c.object.kind === 'entity' ? c.object.entityId : '')),
  );
  const docs = entities.filter((e) => e.documentVersion && !linked.has(e.id));
  if (
    docs.length < 3 ||
    new Set(docs.map((e) => e.documentVersion!.family)).size !== 1
  )
    return null;
  const publishers = new Set(docs.map((e) => e.documentVersion!.publisherId));
  if (entities.some((e) => !e.documentVersion && !publishers.has(e.id)))
    return null;
  const ids = new Set(docs.map((e) => e.id));
  const next = new Map<string, string>(),
    previous = new Map<string, string>();
  for (const c of claims)
    if (
      c.predicate === 'supersedes_document' &&
      c.object.kind === 'entity' &&
      ids.has(c.subject) &&
      ids.has(c.object.entityId)
    ) {
      if (
        (next.has(c.object.entityId) &&
          next.get(c.object.entityId) !== c.subject) ||
        (previous.has(c.subject) &&
          previous.get(c.subject) !== c.object.entityId)
      )
        return null;
      next.set(c.object.entityId, c.subject);
      previous.set(c.subject, c.object.entityId);
    }
  const roots = docs.filter((e) => !previous.has(e.id));
  if (roots.length !== 1) return null;
  const ordered: Entity[] = [];
  let cursor: string | undefined = roots[0].id;
  while (cursor && !ordered.some((e) => e.id === cursor)) {
    ordered.push(docs.find((e) => e.id === cursor)!);
    cursor = next.get(cursor);
  }
  return ordered.length === docs.length && !cursor ? ordered : null;
}

/** Deterministic label-spacing layout, not a community or influence analysis.
 * Unique endpoint pairs exert one spring regardless of claim count. All nodes
 * have equal spacing; pinned labs are navigational landmarks only.
 * Positions are a function of the records drawn alone: the same records give
 * the same positions in every release, whatever else the dataset holds. A
 * centred map pins its focus at the origin. A reference (a larger layout of
 * the same neighbourhood) seeds a narrower map so that records keep their
 * bearings when filters change.
 */
export function networkLayout(
  entities: Entity[],
  claims: Claim[],
  anchors: string[],
  focusId: string | null,
  reference?: Map<string, Point>,
) {
  const sequence = !focusId ? documentSequence(entities, claims) : null;
  if (sequence) {
    const positions = new Map<string, Point>();
    sequence.forEach((e, i) => {
      const row = Math.floor(i / 3),
        col = row % 2 ? 2 - (i % 3) : i % 3;
      positions.set(e.id, { x: col * 220, y: -row * 170 });
    });
    entities
      .filter((e) => !positions.has(e.id))
      .forEach((e, i) => positions.set(e.id, { x: 220 + i * 220, y: 180 }));
    return positions;
  }
  const ordered = [...entities].sort((a, b) => a.id.localeCompare(b.id));
  const ids = new Set(ordered.map((e) => e.id));
  const pairs = new Map<string, [string, string]>();
  for (const c of claims)
    if (
      c.object.kind === 'entity' &&
      ids.has(c.subject) &&
      ids.has(c.object.entityId) &&
      c.subject !== c.object.entityId
    ) {
      const pair = [c.subject, c.object.entityId].sort() as [string, string];
      pairs.set(JSON.stringify(pair), pair);
    }
  const links = [...pairs.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([, v]) => v);
  const pinned = new Set(
    focusId ? [focusId] : anchors.filter((id) => ids.has(id)),
  );
  const positions = new Map<string, Point>();
  ordered.forEach((e) => {
    const a = anchors.indexOf(e.id);
    const seed = hash(e.id);
    const ref = reference?.get(e.id);
    positions.set(
      e.id,
      ref
        ? { ...ref }
        : e.id === focusId
          ? { x: 0, y: 0 }
          : a >= 0
            ? { x: a % 2 ? 300 : -300, y: 220 - Math.floor(a / 2) * 440 }
            : { x: (seed % 997) - 498, y: ((seed >>> 10) % 797) - 398 },
    );
  });
  // Fixed iterations make filtering reproducible and avoid force animation.
  // The loops index arrays aligned with `ordered` (the same Point objects as
  // in `positions`), so the arithmetic and its order match a keyed version.
  const n = ordered.length;
  const index = new Map(ordered.map((e, i) => [e.id, i]));
  const points = ordered.map((e) => positions.get(e.id)!);
  const springs = links.map(([a, b]) => [index.get(a)!, index.get(b)!]);
  const free = ordered.map((e) => !pinned.has(e.id));
  // Weak memory, strong collision spacing. No new topology is constructed.
  const centres = ordered.map((e) => reference?.get(e.id) ?? { x: 0, y: 0 });
  const deltaX = new Float64Array(n),
    deltaY = new Float64Array(n);
  for (let step = 0; step < 220; step++) {
    deltaX.fill(0);
    deltaY.fill(0);
    for (let i = 0; i < n; i++) {
      const p = points[i];
      for (let j = i + 1; j < n; j++) {
        const q = points[j];
        const dx = p.x - q.x || 0.01,
          dy = p.y - q.y || 0.01,
          d = Math.hypot(dx, dy);
        const force = Math.min(12, 2200 / (d * d) + Math.max(0, 110 - d) * 0.1);
        deltaX[i] += (dx / d) * force;
        deltaY[i] += (dy / d) * force;
        deltaX[j] -= (dx / d) * force;
        deltaY[j] -= (dy / d) * force;
      }
    }
    for (const [a, b] of springs) {
      const p = points[a],
        q = points[b],
        dx = q.x - p.x,
        dy = q.y - p.y,
        d = Math.hypot(dx, dy) || 1;
      const force = (d - (focusId ? 240 : 190)) * 0.012;
      deltaX[a] += (dx / d) * force;
      deltaY[a] += (dy / d) * force;
      deltaX[b] -= (dx / d) * force;
      deltaY[b] -= (dy / d) * force;
    }
    for (let i = 0; i < n; i++)
      if (free[i]) {
        const p = points[i],
          centre = centres[i];
        p.x += Math.max(
          -10,
          Math.min(10, deltaX[i] + (centre.x - p.x) * 0.004),
        );
        p.y += Math.max(
          -10,
          Math.min(10, deltaY[i] + (centre.y - p.y) * 0.004),
        );
      }
  }
  return positions;
}

/**
 * Changes when `networkLayout` changes, so that a layout built by an earlier
 * build is never taken for the current one.
 */
const layoutVersion = 1;

/**
 * What a layout is a function of, as one short string: the records drawn,
 * the pairs of records their claims join, the landmarks among them, the
 * focus and, when no record is in focus, the recorded sequence of document
 * versions. Two drawings with the same key have the same positions,
 * whatever order the records come in.
 */
export function layoutKey(
  entities: Entity[],
  claims: Claim[],
  anchors: string[],
  focusId: string | null,
) {
  const ids = entities.map((e) => e.id).sort();
  const held = new Set(ids);
  const pairs = [
    ...new Set(
      claims
        .filter(
          (c) =>
            c.object.kind === 'entity' &&
            held.has(c.subject) &&
            held.has(c.object.entityId) &&
            c.subject !== c.object.entityId,
        )
        .map((c) =>
          [c.subject, c.object.kind === 'entity' ? c.object.entityId : '']
            .sort()
            .join(' '),
        ),
    ),
  ].sort();
  const sequence = focusId
    ? null
    : (documentSequence(entities, claims)?.map((e) => e.id) ?? null);
  const text = JSON.stringify([
    layoutVersion,
    focusId,
    anchors.filter((id) => held.has(id)),
    ids,
    pairs,
    sequence,
  ]);
  // Two FNV-1a hashes with different offsets: 64 bits, written in base 36.
  let a = 0x811c9dc5,
    b = 0x01000193 ^ 0x5bd1e995;
  for (let i = 0; i < text.length; i++) {
    a = Math.imul(a ^ text.charCodeAt(i), 0x01000193);
    b = Math.imul(b ^ text.charCodeAt(i), 0x01000193);
  }
  return `${(a >>> 0).toString(36)}-${(b >>> 0).toString(36)}`;
}

/**
 * A layout as the build writes it (src/ui/map-layout.ts): positions rounded
 * to a tenth of a unit, in the order of the IDs.
 */
export type StoredLayout = { key: string; ids: string[]; xy: number[] };

export function storeLayout(
  key: string,
  positions: Map<string, Point>,
): StoredLayout {
  const ids = [...positions.keys()].sort();
  return {
    key,
    ids,
    xy: ids.flatMap((id) => {
      const p = positions.get(id)!;
      return [Math.round(p.x * 10) / 10, Math.round(p.y * 10) / 10];
    }),
  };
}

export function readLayout(stored: StoredLayout) {
  return new Map<string, Point>(
    stored.ids.map((id, i) => [
      id,
      { x: stored.xy[2 * i], y: stored.xy[2 * i + 1] },
    ]),
  );
}

/** A file of layouts, of one version of the records. */
export type LayoutFile = { version: string; layouts: StoredLayout[] };
