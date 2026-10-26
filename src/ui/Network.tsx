import { useEffect, useMemo, useRef, useState } from 'react';
import { MultiDirectedGraph } from 'graphology';
import Sigma from 'sigma';
import type { Entity, Claim } from '../domain/schema';
import { repository } from '../domain/repository';
import { predicates } from '../domain/predicates';
import { timeLabel } from '../domain/query';
import { addClaimEdges } from './claimEdges';
import { networkLayout, documentSequence } from './layout';
import { compactClaims, relationStyles, type ClaimBundle } from './mapGrammar';
import { drawMap } from './mapDrawing';

const atlas = networkLayout(
  repository.data.entities,
  repository.data.claims,
  repository.data.meta.anchors,
  null,
);
type Props = {
  theme: 'light' | 'dark';
  entities: Entity[];
  claims: Claim[];
  anchors: string[];
  focusId: string | null;
  selectedClaimId: string | null;
  onEntity: (id: string) => void;
  onClaim: (id: string) => void;
};
export function Network({
  theme,
  entities,
  claims,
  anchors,
  focusId,
  selectedClaimId,
  onEntity,
  onClaim,
}: Props) {
  const container = useRef<HTMLDivElement>(null),
    overlay = useRef<SVGSVGElement>(null);
  const renderer = useRef<Sigma | null>(null);
  const draw = useRef<() => void>(() => {});
  const selected = useRef(selectedClaimId);
  const [failed, setFailed] = useState(false);
  const [hover, setHover] = useState('');
  const [bundleId, setBundleId] = useState<string | null>(null);
  const chooser = useRef<HTMLDivElement>(null);
  const bundles = useMemo(() => compactClaims(claims), [claims]);
  const bundle = bundles.find((b) => b.id === bundleId);
  const names = useMemo(
    () => new Map(entities.map((e) => [e.id, e.name])),
    [entities],
  );
  useEffect(() => {
    selected.current = selectedClaimId;
    draw.current();
  }, [selectedClaimId, theme]);
  useEffect(() => {
    if (!container.current || !overlay.current || !entities.length) return;
    const overlayElement = overlay.current;
    const graph = new MultiDirectedGraph();
    const positions = networkLayout(entities, claims, anchors, focusId, atlas);
    entities.forEach((e) =>
      graph.addNode(e.id, {
        ...positions.get(e.id),
        size: 10,
        color: '#00000000',
        label: e.shortName ?? e.name,
      }),
    );
    addClaimEdges(graph, claims);
    graph.forEachEdge((id) =>
      graph.mergeEdgeAttributes(id, { type: 'line', color: '#00000000' }),
    );
    let sigma: Sigma;
    try {
      sigma = new Sigma(graph, container.current, {
        renderLabels: false,
        renderEdgeLabels: false,
        enableEdgeEvents: false,
        stagePadding: 65,
        minCameraRatio: 0.15,
        maxCameraRatio: 3,
        allowInvalidContainer: true,
        zoomDuration: 0,
        doubleClickZoomingDuration: 0,
        inertiaDuration: 0,
      });
    } catch {
      requestAnimationFrame(() => setFailed(true));
      return;
    }
    renderer.current = sigma;
    let hovered: string | null = null;
    const choose = (b: ClaimBundle) => {
      setHover('');
      if (b.claims.length === 1) {
        container.current?.focus({ preventScroll: true });
        onClaim(b.claims[0].id);
      } else {
        setBundleId(b.id);
        requestAnimationFrame(() => {
          chooser.current?.focus({ preventScroll: true });
          chooser.current?.scrollIntoView({ block: 'nearest' });
        });
      }
    };
    draw.current = () => {
      if (overlay.current)
        drawMap(
          overlay.current,
          sigma,
          entities,
          bundles,
          anchors,
          focusId,
          selected.current,
          hovered,
          onEntity,
          choose,
          (text, id) => {
            hovered = id ?? null;
            setHover(text);
          },
        );
    };
    sigma.on('afterRender', draw.current);
    draw.current();
    return () => {
      draw.current = () => {};
      sigma.kill();
      renderer.current = null;
      overlayElement.replaceChildren();
    };
  }, [entities, claims, anchors, focusId, bundles, onEntity, onClaim]);
  const moveCamera = (action: 'in' | 'out' | 'reset') => {
    const camera = renderer.current?.getCamera();
    if (!camera) return;
    camera.setState(
      action === 'reset'
        ? { x: 0.5, y: 0.5, ratio: 1, angle: 0 }
        : {
            ratio: Math.max(
              0.15,
              Math.min(
                3,
                camera.getState().ratio * (action === 'in' ? 0.7 : 1.4),
              ),
            ),
          },
    );
  };
  return (
    <>
      <div className="network-wrap">
        <div
          ref={container}
          className="network"
          data-testid="network"
          tabIndex={-1}
          role="img"
          aria-label={`Relationship map with ${entities.length} records. The Claims view and search give full keyboard access.`}
        />
        <svg ref={overlay} className="map-drawing" aria-hidden="true" />
        {failed && (
          <p className="graph-notice" role="status">
            The map needs WebGL. Use the Claims view to explore every
            relationship and source.
          </p>
        )}
        {!entities.length && (
          <p className="graph-notice">
            No records match these filters. Try another view or reset the
            filters.
          </p>
        )}
        <div className="graph-controls" aria-label="Map controls">
          <button onClick={() => moveCamera('in')} aria-label="Zoom in">
            +
          </button>
          <button onClick={() => moveCamera('out')} aria-label="Zoom out">
            −
          </button>
          <button
            onClick={() => moveCamera('reset')}
            aria-label="Reset map position"
          >
            Fit
          </button>
        </div>
        <p className="map-help">
          Drag to pan · Zoom for labels · Select a line or count
        </p>
        {hover && (
          <div className="map-tooltip" role="status">
            {hover}
          </div>
        )}
      </div>
      <div className="map-connections">
        {!focusId && documentSequence(entities, claims) && (
          <p className="sequence-note">
            Each row of documents follows the recorded sequence of versions,
            oldest to newest, in alternating directions. Arrows point from each
            newer version to the one it replaces. Publication lines start at the
            publisher.
          </p>
        )}
        {bundle && (
          <div
            ref={chooser}
            className="bundle-chooser"
            tabIndex={-1}
            role="region"
            aria-label="Choose an individual claim"
          >
            <div className="bundle-heading">
              <strong>
                {names.get(bundle.source)} → {names.get(bundle.target)}
              </strong>
              <button
                onClick={() => setBundleId(null)}
                aria-label="Close claim chooser"
              >
                Close ×
              </button>
            </div>
            <p>
              {relationStyles[bundle.family].label} ·{' '}
              {bundle.stage.replaceAll('_', ' ') || 'No stage recorded'} ·{' '}
              {bundle.claims.length} separate claims
            </p>
            {bundle.claims.map((c) => (
              <button
                key={c.id}
                className="bundle-claim"
                data-map-claim-id={c.id}
                onClick={() => onClaim(c.id)}
                aria-pressed={selectedClaimId === c.id}
              >
                <strong>
                  {predicates[c.predicate].label} · {timeLabel(c)}
                </strong>
                <span>{c.statement}</span>
                <small>{c.id} · Inspect evidence ↗</small>
              </button>
            ))}
          </div>
        )}
        <details>
          <summary>Connections in this view · {bundles.length} groups</summary>
          <p>
            Claims are grouped only when they share both ends, a relation family
            and a stage. Select a group to reach each claim. Claims about
            values, such as amounts, appear only in the Claims view.
          </p>
          <div className="connection-index">
            {bundles.map((b) => (
              <button
                key={b.id}
                onClick={() => {
                  if (b.claims.length === 1) onClaim(b.claims[0].id);
                  else {
                    setBundleId(b.id);
                    requestAnimationFrame(() => chooser.current?.focus());
                  }
                }}
              >
                <span>
                  {names.get(b.source)} → {names.get(b.target)}
                </span>
                <small>
                  {relationStyles[b.family].label} ·{' '}
                  {b.stage.replaceAll('_', ' ') || 'No stage recorded'} ·{' '}
                  {b.claims.length} {b.claims.length === 1 ? 'claim' : 'claims'}
                </small>
              </button>
            ))}
          </div>
        </details>
      </div>
      <div className="relation-legend" aria-label="Relationship family legend">
        {Object.entries(relationStyles).map(([key, s]) => (
          <span key={key}>
            <svg width="34" height="12" aria-hidden="true">
              <path
                d="M1 6H33"
                stroke={s.color}
                strokeWidth={key === 'capital' ? 4 : 1.7}
                strokeDasharray={s.dash}
              />
              {key === 'capital' && (
                <path
                  d="M1 6H33"
                  stroke="var(--color-surface)"
                  strokeWidth="1.4"
                />
              )}
            </svg>
            {s.label}
          </span>
        ))}
        <p>
          Arrows run from subject to object. Stage marks: ○ proposed, announced,
          planned or committed; □ contracted; ? undisclosed; ● performed,
          realised or deployed, as reported. A hollow arrowhead never means
          delivery. Hover over or choose a claim to see its exact stage.
          Reported work is not independent verification. A line without a mark
          makes no claim about stage.
        </p>
        <p>
          The core institutions anchor the layout. Positions and equal-size
          symbols help navigation. They do not show clusters, affiliation or
          importance. Focusing on a name shows only the directly connected
          claims that pass the filters.
        </p>
      </div>
    </>
  );
}
