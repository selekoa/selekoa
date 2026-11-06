import { useId, useMemo, useState } from 'react';
import { referencePath } from '../domain/addresses';
import type { Repository } from '../domain/repository';
import type { PredictionForm } from '../domain/prediction-fields';
import {
  predictionDecades,
  predictionRows,
  type PredictionRow,
} from '../domain/predictions';
import { predictionsOnRecord as collection } from '../reading/predictions';
import { predictionsCsvPath } from '../reading/predictions-page';
import { ClaimLink, NavLink } from './NavLink';
import { CopyLink } from './ReferenceActions';
import './reading-first.css';
import './predictions.css';

type Props = {
  repository: Repository;
  selectedClaimId: string | null;
  onClaim: (id: string) => void;
  /** Opens the dataset's page for a year. */
  onYear: (year: string) => void;
};

const formLabel = new Map(collection.forms.map((f) => [f.id, f.label]));
const markLabel = new Map(collection.marks.map((m) => [m.id, m.label]));

/**
 * The shape of a form's mark on the chart, centred on (x, y). Forms are told
 * apart by shape, not colour; the legend and the table name them.
 */
function Mark({
  form,
  x,
  y,
  r = 4,
}: {
  form: PredictionForm;
  x: number;
  y: number;
  r?: number;
}) {
  switch (form) {
    case 'expert-survey':
      return <rect x={x - r} y={y - r} width={2 * r} height={2 * r} />;
    case 'public-bet':
      return (
        <polygon
          points={`${x},${y - r * 1.3} ${x + r * 1.3},${y} ${x},${y + r * 1.3} ${x - r * 1.3},${y}`}
        />
      );
    case 'platform-question':
      return (
        <polygon
          points={`${x},${y - r * 1.3} ${x + r * 1.2},${y + r} ${x - r * 1.2},${y + r}`}
        />
      );
    case 'reported-statement':
      return (
        <path
          d={`M${x - r},${y - r}L${x + r},${y + r}M${x - r},${y + r}L${x + r},${y - r}`}
        />
      );
    default:
      return <circle cx={x} cy={y} r={r} />;
  }
}

/** A source date as a fractional year, for the chart's across axis. */
const fraction = (date: string) => {
  const [y, m, d] = date.split('-').map(Number);
  return y + ((m ?? 7) - 1) / 12 + ((d ?? 15) - 1) / 365;
};

// The chart's frame, in its own units; the SVG scales to its box.
const W = 720;
const H = 420;
const M = { top: 16, right: 28, bottom: 44, left: 84 };

function Chart({
  rows,
  selectedClaimId,
  onClaim,
}: {
  rows: PredictionRow[];
  selectedClaimId: string | null;
  onClaim: (id: string) => void;
}) {
  const plotted = rows.filter((r) => r.years.length > 0);
  // Fixed domains, so that filtering never rescales the axes.
  const [x0, x1] = [1945, 2030];
  const [y0, y1] = [1990, 2160];
  const x = (v: number) =>
    M.left + ((v - x0) / (x1 - x0)) * (W - M.left - M.right);
  const y = (v: number) =>
    H - M.bottom - ((v - y0) / (y1 - y0)) * (H - M.top - M.bottom);
  const xTicks = [1950, 1960, 1970, 1980, 1990, 2000, 2010, 2020, 2030];
  const yTicks = [2000, 2025, 2050, 2075, 2100, 2125, 2150];
  return (
    <svg
      className="pred-chart"
      viewBox={`0 0 ${W} ${H}`}
      aria-hidden="true"
      focusable="false"
    >
      <g className="pred-axis">
        {xTicks.map((t) => (
          <g key={t}>
            <line x1={x(t)} x2={x(t)} y1={H - M.bottom} y2={H - M.bottom + 4} />
            <text x={x(t)} y={H - M.bottom + 16} textAnchor="middle">
              {t}
            </text>
          </g>
        ))}
        {yTicks.map((t) => (
          <g key={t}>
            <line
              className="pred-grid"
              x1={M.left}
              x2={W - M.right}
              y1={y(t)}
              y2={y(t)}
            />
            <text x={M.left - 6} y={y(t) + 4} textAnchor="end">
              {t}
            </text>
          </g>
        ))}
        <line
          x1={M.left}
          x2={W - M.right}
          y1={H - M.bottom}
          y2={H - M.bottom}
        />
        <line x1={M.left} x2={M.left} y1={M.top} y2={H - M.bottom} />
        <text x={(M.left + W - M.right) / 2} y={H - 4} textAnchor="middle">
          Source date: when the prediction was made
        </text>
        <text
          transform={`translate(20 ${(M.top + H - M.bottom) / 2}) rotate(-90)`}
          textAnchor="middle"
        >
          Printed target year
        </text>
      </g>
      {plotted.map((r) => {
        const cx = x(fraction(r.sourceDate));
        const ys = r.years.map(y);
        const selected = r.claimId === selectedClaimId;
        return (
          <g
            key={r.claimId}
            className={`pred-point${selected ? ' is-selected' : ''}`}
            data-form={r.form}
            data-claim={r.claimId}
            onClick={() => {
              // Through the record's link in the table, so that its record
              // loads first, as a link's does (src/ui/hold-until-records.ts).
              const link = document.querySelector<HTMLElement>(
                `.pred-table [data-claim-id="${CSS.escape(r.claimId)}"]`,
              );
              if (link) link.click();
              else onClaim(r.claimId);
            }}
          >
            <title>{`${r.sourceDate} · ${r.predictor} · ${r.horizon}`}</title>
            {ys.length > 1 && (
              <line
                className="pred-join"
                x1={cx}
                x2={cx}
                y1={Math.min(...ys)}
                y2={Math.max(...ys)}
              />
            )}
            {ys.map((py, i) => (
              <Mark key={i} form={r.form} x={cx} y={py} />
            ))}
          </g>
        );
      })}
    </svg>
  );
}

/** The years the dataset has a page for: up to its own last year. */
const linkableYear = (year: number, lastYear: number) =>
  year >= 1950 && year <= lastYear;

export function Predictions({
  repository,
  selectedClaimId,
  onClaim,
  onYear,
}: Props) {
  const rows = useMemo(() => predictionRows(repository.data), [repository]);
  const lastYear = Number(repository.data.meta.updatedAt.slice(0, 4));
  const decades = useMemo(() => predictionDecades(rows), [rows]);
  const [forms, setForms] = useState<Set<PredictionForm>>(
    () => new Set(collection.forms.map((f) => f.id)),
  );
  const [decade, setDecade] = useState<number | null>(null);
  const [order, setOrder] = useState<'source' | 'target'>('source');
  const formsId = useId();
  const shown = useMemo(() => {
    const kept = rows.filter(
      (r) => forms.has(r.form) && (decade === null || r.decade === decade),
    );
    if (order === 'source') return kept;
    // By earliest printed year; records without one keep source order, last.
    return kept
      .map((r, i) => [r, i] as const)
      .sort(([a, i], [b, j]) => {
        const ay = a.years[0] ?? Infinity;
        const by = b.years[0] ?? Infinity;
        return ay === by ? i - j : ay - by;
      })
      .map(([r]) => r);
  }, [rows, forms, decade, order]);
  const onChart = shown.filter((r) => r.years.length > 0).length;
  const toggle = (f: PredictionForm) =>
    setForms((prev) => {
      const next = new Set(prev);
      if (next.has(f)) next.delete(f);
      else next.add(f);
      return next;
    });

  return (
    <article className="doc-history pred" aria-label={collection.title}>
      <header className="doc-lede">
        <span className="eyebrow">
          Predictions · {rows.length} records · {collection.forms.length} forms
        </span>
        <h1>{collection.title}</h1>
        <p className="doc-intro">{collection.question}</p>
        <p className="doc-intro">{collection.introduction}</p>
        <ul className="pred-not">
          {collection.doesNot.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      </header>

      <section className="pred-controls" aria-label="Choose what to show">
        <fieldset className="pred-forms">
          <legend id={formsId}>Form</legend>
          {collection.forms.map((f) => (
            <label key={f.id} className="pred-form-option">
              <input
                type="checkbox"
                data-in-page=""
                checked={forms.has(f.id)}
                onChange={() => toggle(f.id)}
              />
              <svg
                className="pred-key"
                viewBox="0 0 14 14"
                width="14"
                height="14"
                aria-hidden="true"
                focusable="false"
              >
                <Mark form={f.id} x={7} y={7} />
              </svg>
              {f.label}
            </label>
          ))}
        </fieldset>
        <div className="pred-selects">
          <label>
            Decade of the source date{' '}
            <select
              data-in-page=""
              value={decade === null ? '' : String(decade)}
              onChange={(e) =>
                setDecade(e.target.value ? Number(e.target.value) : null)
              }
            >
              <option value="">All decades</option>
              {decades.map((d) => (
                <option key={d} value={d}>
                  {d}s
                </option>
              ))}
            </select>
          </label>
          <label>
            Order the table by{' '}
            <select
              data-in-page=""
              value={order}
              onChange={(e) => setOrder(e.target.value as 'source' | 'target')}
            >
              <option value="source">Source date</option>
              <option value="target">Printed target year</option>
            </select>
          </label>
        </div>
        <p className="pred-count" role="status">
          Showing {shown.length} of {rows.length} records; {onChart} with a
          printed target year on the chart.
        </p>
        <div className="pred-actions">
          <CopyLink
            target={{ kind: 'predictions', id: collection.id }}
            label="Copy link to this page"
          />
          <a className="cmp-download" href={predictionsCsvPath} download>
            Download every record as CSV
          </a>
        </div>
      </section>

      <figure className="pred-figure">
        <Chart
          rows={shown}
          selectedClaimId={selectedClaimId}
          onClaim={onClaim}
        />
        <figcaption>
          Each mark is a printed target year, placed by the date the prediction
          was made. A thin line joins the printed years of one record. There is
          no line for the present and no marking of past target dates. The table
          below lists the same records, with every horizon in the text’s words.
        </figcaption>
        <ul className="pred-legend" aria-label="Forms on the chart">
          {collection.forms.map((f) => (
            <li key={f.id}>
              <svg
                className="pred-key"
                viewBox="0 0 14 14"
                width="14"
                height="14"
                aria-hidden="true"
                focusable="false"
              >
                <Mark form={f.id} x={7} y={7} />
              </svg>
              <strong>{f.label}.</strong> {f.description}
            </li>
          ))}
        </ul>
      </figure>

      <section aria-labelledby="pred-table-title">
        <h2 id="pred-table-title">Every record</h2>
        <div
          className="pred-table-wrap"
          tabIndex={0}
          role="region"
          aria-label="Every record, as a table"
        >
          <table className="pred-table">
            <caption className="visually-hidden">
              Predictions on record: source date, predictor, predicted event,
              horizon and probability as stated, and form
            </caption>
            <thead>
              <tr>
                <th scope="col">Source date</th>
                <th scope="col">Predictor</th>
                <th scope="col">Predicted event</th>
                <th scope="col">Horizon as stated</th>
                <th scope="col">Probability as stated</th>
                <th scope="col">Form</th>
              </tr>
            </thead>
            <tbody>
              {shown.map((r) => (
                <tr
                  key={r.claimId}
                  className={
                    r.claimId === selectedClaimId ? 'is-selected' : undefined
                  }
                >
                  <td className="pred-date">
                    {r.sourceDate}
                    {r.marks.map((m) => (
                      <span key={m} className="pred-mark">
                        {m === 'attested' && r.attested
                          ? `Wording attested ${r.attested}`
                          : m === 'reported-later' && r.estimateOf
                            ? `Reported later · estimate of ${r.estimateOf}`
                            : markLabel.get(m)}
                      </span>
                    ))}
                  </td>
                  <th scope="row" className="pred-predictor">
                    {r.predictor}
                  </th>
                  <td>
                    <ClaimLink
                      claimId={r.claimId}
                      onOpen={() => onClaim(r.claimId)}
                      pressed={r.claimId === selectedClaimId}
                      className="pred-event"
                    >
                      {r.eventType === 'quote' ? (
                        <q>{r.event}</q>
                      ) : (
                        <>
                          {r.event}{' '}
                          <span className="pred-para">(paraphrase)</span>
                        </>
                      )}
                    </ClaimLink>
                    <span className="pred-doc">{r.document}</span>
                  </td>
                  <td>
                    {r.horizon}
                    {r.years
                      .filter((yr) => linkableYear(yr, lastYear))
                      .map((yr) => (
                        <span key={yr} className="pred-year-link">
                          <NavLink
                            href={referencePath({
                              kind: 'year',
                              id: String(yr),
                            })}
                            onOpen={() => onYear(String(yr))}
                          >
                            What the dataset records for {yr} →
                          </NavLink>
                        </span>
                      ))}
                  </td>
                  <td>{r.probability ?? 'Not stated'}</td>
                  <td>{formLabel.get(r.form)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {shown.length === 0 && (
          <p className="pred-empty">
            No record matches these choices. Choose another form or decade.
          </p>
        )}
      </section>

      <section className="pred-notes" aria-labelledby="pred-marks-title">
        <h2 id="pred-marks-title">Marks in the table</h2>
        <dl>
          {collection.marks.map((m) => (
            <div key={m.id}>
              <dt>{m.label}</dt>
              <dd>{m.description}</dd>
            </div>
          ))}
        </dl>
        <h2>Limits</h2>
        <ul>
          {collection.limits.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
        <details className="pred-search">
          <summary data-in-page="">How we searched</summary>
          <p>{collection.searchNote.scope}</p>
          <h3>Methods</h3>
          <ul>
            {collection.searchNote.methods.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
          <h3>Gaps</h3>
          <ul>
            {collection.searchNote.gaps.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
          <h3>Read and not recorded</h3>
          <ul>
            {collection.searchNote.notRecorded.map((n) => (
              <li key={n.text}>
                <strong>{n.text}.</strong> {n.reason}
              </li>
            ))}
          </ul>
        </details>
      </section>
    </article>
  );
}
