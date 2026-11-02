import { useMemo, type CSSProperties } from 'react';
import type { Repository } from '../domain/repository';
import { referencePath } from '../domain/addresses';
import {
  controlTimelines,
  inYear,
  timelineKindLabels,
  timelineStatusLabels,
  type ControlTimelines as Timelines,
  type TimelineEvent,
  type TimelineStatus,
} from '../domain/control-timelines';
import { controlTimelinesCsvPath } from '../reading/control-timelines-page';
import { controlTimelines as definition } from '../reading/control-timelines';
import { ClaimLink, NavLink } from './NavLink';
import { CopyLink } from './ReferenceActions';
import './reading-first.css';
import './control-commitments.css';
import './control-timelines.css';

type Props = {
  view: Timelines;
  repository: Repository;
  selectedClaimId: string | null;
  onClaim: (id: string) => void;
  onControl: (id: string) => void;
  onDossier: (id: string) => void;
};

const gapText = 'No control record in this period';

/** What a mark says to a screen reader and on pointing. */
const markLabel = (e: TimelineEvent) =>
  `${e.organisation.name} · ${e.dateText} · ${timelineKindLabels[e.kind]} · ${e.stage}: ${e.claim.statement}`;

/** The line above a record in the list: date, its kind, what it records. */
const metaLine = (e: TimelineEvent) =>
  [
    e.dateText,
    e.precision && e.precision !== 'day' ? `${e.precision} only` : null,
    e.dateKind,
    timelineKindLabels[e.kind],
    e.stage,
  ]
    .filter(Boolean)
    .join(' · ');

function Legend() {
  const statuses: [TimelineStatus, string][] = [
    [
      'announced',
      'The record marks the change as announced, planned or agreed. It does not show that the change took effect.',
    ],
    [
      'effective',
      'The record marks the change as in effect, or the transaction as completed, at that date.',
    ],
    [
      'dated',
      'A snapshot (one dated report of a state) or a document’s date. The record does not mark the change as announced or in effect.',
    ],
  ];
  return (
    <section className="tl-legend" aria-labelledby="tl-legend-title">
      <h2 id="tl-legend-title">How to read the marks</h2>
      <dl className="tl-legend-list">
        {statuses.map(([status, text]) => (
          <div key={status}>
            <dt>
              <span
                className={`tl-swatch tl-${status} tl-day`}
                aria-hidden="true"
              />
              {timelineStatusLabels[status]}
            </dt>
            <dd>{text}</dd>
          </div>
        ))}
        <div>
          <dt>
            <span className="tl-swatch tl-dated tl-day" aria-hidden="true" />
            <span className="tl-swatch tl-dated tl-month" aria-hidden="true" />
            <span className="tl-swatch tl-dated tl-year" aria-hidden="true" />
            Day, month, year
          </dt>
          <dd>
            A dot is a date to the day. A narrow bar covers the month of a date
            stored to the month, and a wide band the year of a date stored to
            the year. Neither is placed on a day.
          </dd>
        </div>
      </dl>
      <p className="small-note">
        Select a mark to open its record: the statement, the evidence passage
        and the source. Marks that sit close together are not connected by that
        alone. No line is drawn between organisations, because no record here
        states a relation between them.
      </p>
    </section>
  );
}

function Mark({
  event,
  years,
  ...props
}: {
  event: TimelineEvent;
  years: number[];
} & Pick<Props, 'selectedClaimId' | 'onClaim'>) {
  const first = years[0];
  const span = years.length;
  const point = event.start === event.end;
  const style = {
    '--tl-left': `${((event.start - first) / span) * 100}%`,
    '--tl-width': point ? '0%' : `${((event.end - event.start) / span) * 100}%`,
    '--tl-row': event.row,
  } as CSSProperties;
  return (
    <span
      className={`tl-mark-slot tl-${event.status} tl-${event.precision}`}
      style={style}
    >
      <ClaimLink
        className="tl-mark"
        claimId={event.claim.id}
        pressed={props.selectedClaimId === event.claim.id}
        aria-label={markLabel(event)}
        data-status={event.status}
        data-precision={event.precision ?? undefined}
        data-date={event.date ?? undefined}
        onOpen={() => props.onClaim(event.claim.id)}
      >
        <span className="tl-mark-shape" aria-hidden="true" />
      </ClaimLink>
    </span>
  );
}

function Axis({ view, ...props }: Props) {
  const { years } = view;
  const first = years[0];
  const at = (year: number) => `${((year - first) / years.length) * 100}%`;
  return (
    <section className="tl-axis" aria-labelledby="tl-axis-title">
      <h2 id="tl-axis-title">
        {years[0]}–{years.at(-1)} on one axis
      </h2>
      <div className="tl-grid">
        <div className="tl-years" aria-hidden="true">
          <span className="tl-label-cell" />
          <div className="tl-track tl-year-track">
            {years.map((y) => (
              <span key={y} className="tl-year-label" style={{ left: at(y) }}>
                {y}
              </span>
            ))}
          </div>
        </div>
        {view.lanes.map((lane) => (
          <div
            key={lane.organisation.id}
            className="tl-lane"
            data-organisation={lane.organisation.id}
            role="group"
            aria-label={`${lane.organisation.name}, in date order`}
          >
            <div className="tl-label-cell">
              <NavLink
                className="tl-lane-name"
                href={referencePath({
                  kind: 'dossier',
                  id: lane.organisation.id,
                })}
                onOpen={() => props.onDossier(lane.organisation.id)}
              >
                {lane.organisation.name}
              </NavLink>
            </div>
            <div
              className="tl-track"
              style={{ '--tl-rows': lane.rows } as CSSProperties}
            >
              {years.slice(1).map((y) => (
                <span
                  key={y}
                  className="tl-rule"
                  style={{ left: at(y) }}
                  aria-hidden="true"
                />
              ))}
              {lane.gaps.map((g) => (
                <p
                  key={g.from}
                  className="tl-gap"
                  style={{
                    left: at(g.from),
                    width: `${((g.to - g.from + 1) / years.length) * 100}%`,
                  }}
                >
                  {gapText}
                  <span className="visually-hidden">
                    {' '}
                    ({g.from === g.to ? g.from : `${g.from}–${g.to}`})
                  </span>
                </p>
              ))}
              {lane.events.map((e) => (
                <Mark key={e.claim.id} event={e} years={years} {...props} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/** The phone layout, and a list of the same records: year by year. */
function ByYear({ view, ...props }: Props) {
  return (
    <section className="tl-by-year" aria-labelledby="tl-by-year-title">
      <h2 id="tl-by-year-title">Year by year</h2>
      {view.years.map((year) => {
        const lanes = view.lanes.map((lane) => ({
          lane,
          events: lane.events.filter((e) => inYear(e, year)),
        }));
        const empty = lanes.filter((l) => !l.events.length);
        return (
          <section key={year} className="tl-year-block">
            <h3>{year}</h3>
            {lanes
              .filter((l) => l.events.length)
              .map(({ lane, events }) => (
                <div key={lane.organisation.id} className="tl-year-lane">
                  <h4>{lane.organisation.name}</h4>
                  <ul>
                    {events.map((e) => (
                      <li key={e.claim.id}>
                        <ClaimLink
                          className={`tl-item tl-${e.status}`}
                          claimId={e.claim.id}
                          pressed={props.selectedClaimId === e.claim.id}
                          data-status={e.status}
                          onOpen={() => props.onClaim(e.claim.id)}
                        >
                          <span
                            className={`tl-swatch tl-${e.status} tl-${e.precision}`}
                            aria-hidden="true"
                          />
                          <span className="tl-item-meta">{metaLine(e)}</span>
                          <span className="tl-item-statement">
                            {e.claim.statement}
                          </span>
                        </ClaimLink>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            {empty.length > 0 && (
              <p className="tl-gap-line">
                {gapText}:{' '}
                {empty.map((l) => l.lane.organisation.name).join(', ')}.
              </p>
            )}
          </section>
        );
      })}
    </section>
  );
}

/**
 * The page computes its records here, in its own module, rather than in the
 * workspace, which every page loads.
 */
export function ControlTimelines(page: Omit<Props, 'view'>) {
  const { repository } = page;
  const view = useMemo(
    () => controlTimelines(repository.data, definition),
    [repository],
  );
  const props: Props = { ...page, view };
  const undated = view.lanes.flatMap((l) => l.undated);
  return (
    <article
      className="doc-history control-page timelines-page"
      aria-label={definition.title}
    >
      <header className="doc-lede">
        <span className="eyebrow">
          Control structures ·{' '}
          {view.lanes.map((l) => l.organisation.name).join(', ')}
        </span>
        <h1>{definition.title}</h1>
        <p className="landing-deck">{definition.question}</p>
        <p className="doc-intro">{definition.introduction}</p>
        <div className="doc-actions">
          <a
            className="text-button"
            href={controlTimelinesCsvPath}
            download="selekoa-control-timelines.csv"
          >
            Download the records shown (CSV)
          </a>
          <CopyLink
            target={{ kind: 'control', id: definition.id }}
            label="Copy link to this page"
          />
        </div>
      </header>
      <Legend />
      <Axis {...props} />
      <ByYear {...props} />
      <section className="tl-undated" aria-labelledby="tl-undated-title">
        <h2 id="tl-undated-title">Undated records</h2>
        {undated.length ? (
          <ul>
            {undated.map((e) => (
              <li key={e.claim.id}>
                <ClaimLink
                  className="tl-item"
                  claimId={e.claim.id}
                  pressed={props.selectedClaimId === e.claim.id}
                  onOpen={() => props.onClaim(e.claim.id)}
                >
                  <span className="tl-item-meta">
                    {e.organisation.name} · {metaLine(e)}
                  </span>
                  <span className="tl-item-statement">{e.claim.statement}</span>
                </ClaimLink>
              </li>
            ))}
          </ul>
        ) : (
          <p className="small-note">
            Every record shown has a stored date, so none is listed here. A
            record without a date would be listed here, not placed on the axis.
          </p>
        )}
      </section>
      <section className="tl-sources" aria-labelledby="tl-sources-title">
        <h2 id="tl-sources-title">Where each row comes from</h2>
        <ul>
          {view.lanes.map((lane) => (
            <li key={lane.organisation.id}>
              <strong>{lane.organisation.name}.</strong>{' '}
              {lane.collection ? (
                <>
                  The records of{' '}
                  <NavLink
                    href={referencePath({
                      kind: 'control',
                      id: lane.collection.id,
                    })}
                    onOpen={() => props.onControl(lane.collection!.id)}
                  >
                    {lane.collection.title} →
                  </NavLink>
                  , without its provisions and assessments.
                </>
              ) : (
                lane.selection
              )}
            </li>
          ))}
        </ul>
        <ul className="tl-limits">
          {definition.limits.map((text) => (
            <li key={text}>{text}</li>
          ))}
        </ul>
      </section>
    </article>
  );
}
