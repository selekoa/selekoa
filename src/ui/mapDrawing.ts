import type Sigma from 'sigma';
import type { Entity } from '../domain/schema';
import { predicates } from '../domain/predicates';
import { entityStyle } from './entityStyle';
import { isProvisional, relationStyles, type ClaimBundle } from './mapGrammar';
import { documentSequence, type Point } from './layout';

const NS = 'http://www.w3.org/2000/svg';
function el(
  tag: string,
  attrs: Record<string, string | number> = {},
  text?: string,
) {
  const node = document.createElementNS(NS, tag);
  Object.entries(attrs).forEach(([k, v]) => node.setAttribute(k, String(v)));
  if (text) node.textContent = text;
  return node;
}
export function shortLabel(value: string, limit = 25) {
  return value.length > limit
    ? value.slice(0, limit - 1).trimEnd() + '…'
    : value;
}
export function curveGeometry(source: Point, target: Point, lane: number) {
  const dx = target.x - source.x,
    dy = target.y - source.y,
    d = Math.hypot(dx, dy) || 1;
  const control = {
    x: (source.x + target.x) / 2 - (dy / d) * lane,
    y: (source.y + target.y) / 2 + (dx / d) * lane,
  };
  const inset = (p: Point) => {
    const dx = control.x - p.x,
      dy = control.y - p.y,
      d = Math.hypot(dx, dy) || 1;
    return { x: p.x + (dx / d) * 15, y: p.y + (dy / d) * 15 };
  };
  const a = inset(source),
    b = inset(target);
  return {
    a,
    b,
    control,
    mid: {
      x: (a.x + 2 * control.x + b.x) / 4,
      y: (a.y + 2 * control.y + b.y) / 4,
    },
    path: `M${a.x},${a.y} Q${control.x},${control.y} ${b.x},${b.y}`,
  };
}

type Box = { x: number; y: number; w: number; h: number };
const intersects = (a: Box, b: Box) =>
  a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;

/** Sigma owns projection, camera and graph lifecycle. This SVG annotation layer
 * adds explicit stroke patterns, shared silhouettes and generous hit targets.
 * Graphology still contains one edge per claim, never summary edges or nodes.
 */
export function drawMap(
  svg: SVGSVGElement,
  sigma: Sigma,
  entities: Entity[],
  bundles: ClaimBundle[],
  anchors: string[],
  focusId: string | null,
  selected: string | null,
  hovered: string | null,
  onEntity: (id: string) => void,
  onBundle: (b: ClaimBundle) => void,
  onHover: (text: string, id?: string) => void,
) {
  const { width, height } = sigma.getDimensions();
  svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
  const fragment = document.createDocumentFragment();
  const points = new Map(
    entities.map((e) => [
      e.id,
      sigma.graphToViewport(sigma.getGraph().getNodeAttributes(e.id) as Point),
    ]),
  );
  const names = new Map(entities.map((e) => [e.id, e.shortName ?? e.name]));
  const sequence =
    !focusId &&
    documentSequence(
      entities,
      bundles.flatMap((b) => b.claims),
    );
  const peers = new Map<string, ClaimBundle[]>();
  bundles.forEach((b) => {
    const key = JSON.stringify([b.source, b.target].sort());
    const group = peers.get(key) ?? [];
    group.push(b);
    peers.set(key, group);
  });
  const badges: { group: SVGGElement; box: Box }[] = [];
  const nodeBoxes = [...points.values()].map((p) => ({
    x: p.x - 17,
    y: p.y - 17,
    w: 34,
    h: 34,
  }));
  for (const b of bundles) {
    const source = points.get(b.source)!,
      target = points.get(b.target)!;
    const siblings = peers.get(JSON.stringify([b.source, b.target].sort()))!;
    const lane =
      (siblings.indexOf(b) - (siblings.length - 1) / 2) * 48 +
      (siblings.length === 1 ? 16 : 0);
    const geometry = curveGeometry(
      source,
      target,
      sequence && b.claims.every((c) => c.predicate === 'published')
        ? (target.x >= source.x ? -1 : 1) *
            (65 + Math.abs(target.y - source.y) * 0.22)
        : lane * (b.source < b.target ? 1 : -1),
    );
    const style = relationStyles[b.family];
    const active = b.claims.some((c) => c.id === selected);
    const title = `${names.get(b.source)} → ${names.get(b.target)} · ${style.label}${b.stage ? ' · ' + b.stage.replaceAll('_', ' ') : ''} · ${b.claims.length} claim${b.claims.length === 1 ? '' : 's'}`;
    const group = el('g', {
      class: `map-edge${active ? ' is-selected' : ''}`,
      'data-bundle-id': b.id,
      'data-family': b.family,
      'data-stage': b.stage,
      'data-source': b.source,
      'data-target': b.target,
      'data-claim-ids': b.claims.map((c) => c.id).join(' '),
      style: `color:${style.color}`,
    }) as SVGGElement;
    group.append(el('title', {}, title));
    group.append(
      el('path', {
        d: geometry.path,
        fill: 'none',
        stroke: 'currentColor',
        'stroke-width': b.family === 'capital' ? 4 : 1.7,
        'stroke-dasharray': style.dash,
        class: 'relation-stroke',
      }),
    );
    if (b.family === 'capital')
      group.append(
        el('path', {
          d: geometry.path,
          fill: 'none',
          stroke: 'var(--color-surface)',
          'stroke-width': 1.4,
        }),
      );
    const angle =
      (Math.atan2(
        geometry.b.y - geometry.control.y,
        geometry.b.x - geometry.control.x,
      ) *
        180) /
      Math.PI;
    group.append(
      el('path', {
        d: 'M-9-4L0 0L-9 4Z',
        transform: `translate(${geometry.b.x} ${geometry.b.y}) rotate(${angle})`,
        stroke: 'currentColor',
        'stroke-width': 1.5,
        fill: isProvisional(b.claims[0])
          ? 'var(--color-surface)'
          : 'currentColor',
      }),
    );
    group.append(
      el('path', {
        d: geometry.path,
        fill: 'none',
        stroke: 'transparent',
        'stroke-width': 16,
        class: 'edge-hit',
      }),
    );
    group.addEventListener('click', () => onBundle(b));
    group.addEventListener('mouseenter', () =>
      onHover(
        b.claims.length === 1
          ? `${title} · ${predicates[b.claims[0].predicate].label} · ${b.claims[0].statement}`
          : `${title}. Select to choose an individual claim.`,
      ),
    );
    group.addEventListener('mouseleave', () => onHover(''));
    fragment.append(group);
    if (b.claims.length > 1 || b.stage) {
      const mark =
        b.stage === 'undisclosed'
          ? '?'
          : b.stage === 'contracted'
            ? '□'
            : isProvisional(b.claims[0])
              ? '○'
              : b.stage
                ? '●'
                : '';
      const label = [mark, b.claims.length > 1 ? `×${b.claims.length}` : '']
        .filter(Boolean)
        .join(' ');
      const w = label.length * 6 + 12;
      for (const t of [0.5, 0.3, 0.7, 0.4, 0.6, 0.2, 0.8]) {
        const x =
          (1 - t) ** 2 * geometry.a.x +
          2 * (1 - t) * t * geometry.control.x +
          t * t * geometry.b.x;
        const y =
          (1 - t) ** 2 * geometry.a.y +
          2 * (1 - t) * t * geometry.control.y +
          t * t * geometry.b.y;
        const box = { x: x - w / 2, y: y - 9, w, h: 18 };
        if (
          ![...nodeBoxes, ...badges.map((b) => b.box)].some((b) =>
            intersects(box, b),
          )
        ) {
          geometry.mid = { x, y };
          break;
        }
      }
      const badge = el('g', {
        class: 'map-edge-badge',
        'data-bundle-id': b.id,
        style: `color:${style.color}`,
      }) as SVGGElement;
      badge.append(
        el('rect', {
          x: geometry.mid.x - w / 2,
          y: geometry.mid.y - 9,
          width: w,
          height: 18,
          rx: 3,
          fill: 'var(--color-surface)',
          stroke: 'currentColor',
          'stroke-width': 0.7,
        }),
      );
      badge.append(
        el(
          'text',
          {
            x: geometry.mid.x,
            y: geometry.mid.y + 3,
            'text-anchor': 'middle',
            fill: 'currentColor',
            'font-size': 10,
          },
          label,
        ),
      );
      badge.append(el('title', {}, title));
      badge.addEventListener('click', () => onBundle(b));
      badges.push({
        group: badge,
        box: { x: geometry.mid.x - w / 2, y: geometry.mid.y - 9, w, h: 18 },
      });
    }
  }
  badges.forEach((b) => fragment.append(b.group));
  const boxes: Box[] = [...points.values()].map((p) => ({
    x: p.x - 13,
    y: p.y - 13,
    w: 26,
    h: 26,
  }));
  const selectedEnds = new Set(
    bundles
      .filter((b) => b.claims.some((c) => c.id === selected))
      .flatMap((b) => [b.source, b.target]),
  );
  // Node boxes come first in `boxes`; labels are appended after them.
  let placedLabels = 0;
  const landmarkBoxes = [...points.entries()]
    .filter(([id]) => anchors.includes(id) || id === focusId)
    .map(([, p]) => ({ x: p.x - 13, y: p.y - 13, w: 26, h: 26 }));
  const priority = (e: Entity) =>
    e.id === hovered
      ? 0
      : e.id === focusId
        ? 1
        : anchors.includes(e.id)
          ? 2
          : selectedEnds.has(e.id)
            ? 3
            : 4;
  const ordered = [...entities].sort(
    (a, b) => priority(a) - priority(b) || a.id.localeCompare(b.id),
  );
  const labels = document.createDocumentFragment();
  for (const e of ordered) {
    const p = points.get(e.id)!;
    const group = el('g', {
      class: 'map-node',
      'data-entity-id': e.id,
      transform: `translate(${p.x} ${p.y})`,
    });
    group.append(
      el('circle', {
        r: 14,
        fill: 'var(--color-surface)',
        stroke: e.id === focusId ? 'var(--color-text)' : 'none',
        'stroke-width': 1,
      }),
    );
    group.append(
      el('path', {
        d: entityStyle[e.type].path,
        fill: 'var(--color-surface)',
        stroke: 'var(--color-text)',
        'stroke-width': 1.5,
        'stroke-linejoin': 'round',
      }),
    );
    group.append(
      el('circle', { r: 16, fill: 'transparent', class: 'node-hit' }),
    );
    group.append(el('title', {}, `${e.name} · ${entityStyle[e.type].label}`));
    group.addEventListener('click', () => onEntity(e.id));
    group.addEventListener('mouseenter', () =>
      onHover(`${e.name} · ${entityStyle[e.type].label}`, e.id),
    );
    group.addEventListener('mouseleave', () => onHover(''));
    fragment.append(group);
    const text = shortLabel(
      e.shortName ?? e.name,
      e.type === 'document' ? 27 : 24,
    );
    const w = text.length * 6.4 + 8;
    const candidates = [
      { x: p.x + 18, y: p.y - 9, w, h: 19 },
      { x: p.x - w - 18, y: p.y - 9, w, h: 19 },
      { x: p.x - w / 2, y: p.y + 18, w, h: 19 },
      { x: p.x - w / 2, y: p.y - 37, w, h: 19 },
      // Dense neighbourhoods can block every cardinal slot. Keep landmark
      // labels visible by also testing adjacent diagonal slots, without overlap.
      ...(priority(e) < 3
        ? [
            { x: p.x + 18, y: p.y - 37, w, h: 19 },
            { x: p.x - w - 18, y: p.y - 37, w, h: 19 },
            { x: p.x + 18, y: p.y + 18, w, h: 19 },
            { x: p.x - w - 18, y: p.y + 18, w, h: 19 },
          ]
        : []),
    ];
    // Landmarks whose neighbouring slots are all blocked try a wider ring, so
    // a data addition elsewhere cannot silently remove their labels.
    // Further rings keep them in a dense overview (2026-10-17: the lab
    // genealogy added many organisations around the anchors).
    if (priority(e) < 3)
      for (const dy of [-65, 46, -93, 74, -121, 102])
        for (const dx of [18, -w - 18, -w / 2, 48, -w - 48])
          candidates.push({ x: p.x + dx, y: p.y + dy, w, h: 19 });
    const fits = (box: Box, overBadges: boolean) =>
      box.x >= 4 &&
      box.x + w < width - 4 &&
      box.y >= 4 &&
      box.y + box.h < height - 48 &&
      !boxes.some((b) => intersects(box, b)) &&
      (overBadges || !badges.some((b) => intersects(box, b.box)));
    // As a last resort a landmark label may cover an edge badge, never a
    // node or another label; the badge's claims stay listed and selectable.
    // In a very dense overview a landmark label may, last of all, cover a
    // neighbouring non-landmark node; that node stays listed in the Claims
    // view and reachable from its edges (2026-10-17).
    const nodeBoxes = boxes.length - placedLabels;
    const clearOfLabels = (box: Box) =>
      box.x >= 4 &&
      box.x + w < width - 4 &&
      box.y >= 4 &&
      box.y + box.h < height - 48 &&
      !boxes.slice(nodeBoxes).some((b) => intersects(box, b)) &&
      !landmarkBoxes.some((b) => intersects(box, b));
    const box =
      candidates.find((box) => fits(box, false)) ??
      (priority(e) < 3
        ? (candidates.find((box) => fits(box, true)) ??
          candidates.find(clearOfLabels))
        : undefined);
    // Essential labels try every side; additional labels enter as zoom frees room.
    if (box) {
      boxes.push(box);
      placedLabels++;
      const label = el('g', {
        class: 'map-node-label',
        'data-label-for': e.id,
      });
      label.append(
        el('rect', {
          x: box.x,
          y: box.y,
          width: w,
          height: box.h,
          fill: 'var(--color-surface)',
        }),
      );
      label.append(
        el(
          'text',
          {
            x: box.x + 4,
            y: box.y + 13,
            fill: 'var(--color-text)',
            'font-size': 12,
            'font-weight': priority(e) < 3 ? 650 : 400,
          },
          text,
        ),
      );
      labels.append(label);
    }
  }
  fragment.append(labels);
  svg.replaceChildren(fragment);
}
