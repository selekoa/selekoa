import { ClaimLink, NavLink } from './NavLink';
import { Fragment, useEffect, useId, useRef, useState } from 'react';
import { comparisonCsvPath, referencePath } from '../domain/addresses';
import { useInBrowser, useMediaQuery } from './client';
import type { Repository } from '../domain/repository';
import type { Dataset } from '../domain/schema';
import { lawFacetNumber } from '../domain/law-questions';
import type { LawCellStatus } from '../domain/law-comparison';
import {
  columnName,
  lawCellNote,
  lawSearchRecord,
  lawStandingText,
  lawStatusLabels,
  lawStatusShort,
  lawsComparedView,
  type LawViewColumn,
  type LawsComparedView,
} from '../domain/law-comparison-view';
import { lawsCompared } from '../reading/laws-compared';
import { frameworkComparison } from '../reading/framework-comparison';
import { remember, type Remembered } from '../domain/memo';
import { CopyLink } from './ReferenceActions';
import { quoted } from './quote';
import './reading-first.css';
import './framework-comparison.css';
import './model-cards.css';
import './laws-compared.css';

type Props = {
  repository: Repository;
  selectedClaimId: string | null;
  onClaim: (id: string) => void;
  /** Opens an instrument's own page. */
  onEntity: (id: string) => void;
  /** The question shown in the one-question layout; null for the table. */
  facet: string | null;
  onFacet: (facet: string | null) => void;
  /** Earlier texts shown in place of a column's latest, as in the address. */
  editions: string[];
  onEditions: (editions: string[]) => void;
  /** Opens Compare frameworks. */
  onFrameworks: () => void;
};

/** Wide screens start with the table; phones with one question at a time. */
const narrowQuery = '(max-width: 940px)';
const id = lawsCompared.id;

// Computed once per dataset and choice of texts, counting their reads for
// every page that uses them (src/domain/memo.ts).
const views = new WeakMap<Dataset, Map<string, Remembered<LawsComparedView>>>();
const viewOf = (data: Dataset, editions: string[]) => {
  let byChoice = views.get(data);
  if (!byChoice) views.set(data, (byChoice = new Map()));
  return remember(byChoice, editions.join(','), () =>
    lawsComparedView(data, lawsCompared, editions),
  );
};

/** One cell: status, passages with locators, the search or reason, the note. */
function CellBody({
  view,
  repository,
  col,
  facetId,
  selectedClaimId,
  onClaim,
  secondary = false,
}: {
  view: LawsComparedView;
  repository: Repository;
  col: LawViewColumn;
  facetId: string;
  selectedClaimId: string | null;
  onClaim: (id: string) => void;
  /** A further copy of the cell, as in the list. */
  secondary?: boolean;
}) {
  const cell = view.cell(col.text, facetId);
  const claim = cell.claim;
  const facet = view.facets.find((f) => f.id === facetId)!;
  const items = claim
    ? claim.evidenceIds
        .map((e) => repository.evidence.get(e)!)
        .filter(
          (e) =>
            e.passageType === 'quote' ||
            (cell.status !== 'not-found' && e.support === 'supports'),
        )
    : [];
  const search =
    claim && cell.status === 'not-found' ? lawSearchRecord(claim) : null;
  const note = claim ? lawCellNote(claim) : '';
  const computed = claim?.attributes?.provision?.computed;
  return (
    <div className={'cmp-cell mc-cell-body mc-status-' + cell.status}>
      <p className="cmp-status">{lawStatusLabels[cell.status]}</p>
      {items.length > 0 && (
        <ul className="cmp-passages">
          {items.map((e) => (
            <li key={e.id}>
              {e.passageType === 'quote' ? (
                <blockquote>{quoted(e.passage)}</blockquote>
              ) : (
                <p className="lc-paraphrase">
                  <span className="cmp-note-label">Paraphrase: </span>
                  {e.passage}
                </p>
              )}
              {e.translation && (
                <p className="lc-translation">
                  <span className="cmp-note-label">Working translation: </span>
                  {e.translation}
                </p>
              )}
              <p className="cmp-locator">
                {e.support === 'context' ? 'Context: ' : ''}
                {e.locator}
              </p>
            </li>
          ))}
        </ul>
      )}
      {search && (
        <dl className="mc-search">
          <div>
            <dt>Read</dt>
            <dd>{search.scope}</dd>
          </div>
          <div>
            <dt>Terms searched</dt>
            <dd>{search.terms}</dd>
          </div>
          {search.setAside && (
            <div>
              <dt>Passages read and set aside</dt>
              <dd>{search.setAside}</dd>
            </div>
          )}
        </dl>
      )}
      {cell.status === 'not-applicable' && (
        <p className="cmp-note">{cell.reason}</p>
      )}
      {computed && claim && (
        <p className="cmp-note">
          <span className="cmp-note-label">Computed date: </span>
          {claim.time.kind === 'event' ? claim.time.date : ''}, counted from the
          rule; the text states no calendar date.
        </p>
      )}
      {note && (
        <p className="cmp-note">
          <span className="cmp-note-label">Note: </span>
          {note}
        </p>
      )}
      {claim && (
        <ClaimLink
          className="doc-inspect"
          secondary={secondary}
          pressed={selectedClaimId === claim.id}
          claimId={claim.id}
          onOpen={() => onClaim(claim.id)}
        >
          {cell.status === 'not-found'
            ? 'Open the search record'
            : 'Inspect sources and checks'}
          <span className="visually-hidden">
            : {columnName(col)}, {lawFacetNumber(facet.id)} {facet.label}
          </span>
          <span aria-hidden="true"> ↗</span>
        </ClaimLink>
      )}
    </div>
  );
}

export function LawsCompared(props: Props) {
  const {
    repository,
    facet,
    onFacet,
    editions,
    onEditions,
    selectedClaimId,
    onClaim,
  } = props;
  const data = repository.data;
  const view = viewOf(data, editions);
  const { facets, groups } = view;
  const live = useInBrowser();
  // The built page is the table, readable without JavaScript; a phone
  // switches to one question once the page runs, unless the reader chose
  // the table. A question's own page is built in the one-question layout.
  const narrow = useMediaQuery(narrowQuery, false);
  const [tableOnPhone, setTableOnPhone] = useState(false);
  const layout: 'table' | 'question' =
    facet || (narrow && !tableOnPhone) ? 'question' : 'table';
  const current = facets.find((f) => f.id === facet) ?? facets[0];
  // The cell open below its row in the table, as `column facet`.
  const [open, setOpen] = useState<{ column: string; facet: string } | null>(
    null,
  );
  const detailId = useId();
  const scroller = useRef<HTMLDivElement>(null);
  const [frameWidth, setFrameWidth] = useState<number | null>(null);
  useEffect(() => {
    const element = scroller.current;
    if (layout !== 'table' || !element) return;
    // The fixed header row and question column keep a focused cell in view,
    // and an open cell's text is as wide as the visible part of the table.
    const measure = () => {
      const head = element.querySelector('thead');
      const first = element.querySelector('thead th');
      element.style.scrollPaddingTop = `${head?.offsetHeight ?? 0}px`;
      element.style.scrollPaddingLeft = `${(first as HTMLElement | null)?.offsetWidth ?? 0}px`;
      setFrameWidth(element.clientWidth);
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(element);
    return () => observer.disconnect();
  }, [layout]);

  const columns = groups.flatMap((g) => g.columns);
  const questionHref = (facetId: string) =>
    referencePath({
      kind: 'compare',
      id,
      facet: facetId,
      editions: editions.length ? editions : undefined,
    });
  const openQuestion = (facetId: string) => {
    onFacet(facetId);
    setOpen(null);
    window.scrollTo(0, 0);
  };

  /** The instrument's name, the text shown and its standing records. */
  const columnMeta = (col: LawViewColumn, compact = false) => (
    <>
      <NavLink
        className="lc-instrument"
        href={referencePath({ kind: 'document', id: col.text })}
        onOpen={() => props.onEntity(col.text)}
      >
        {col.column.label}
      </NavLink>
      {col.texts.length > 1 && (
        <span className="cmp-edition">
          {col.column.textLabels![col.texts.indexOf(col.text)]}
        </span>
      )}
      <span className="lc-standing">{col.column.standing}</span>
      {!compact && (
        <span className="lc-standing-records">
          {col.standing.length > 1 ? 'Standing records: ' : ''}
          {col.standing.map((claimId, i) => (
            <Fragment key={claimId}>
              {i > 0 && ' '}
              <ClaimLink
                className="lc-standing-link"
                secondary
                pressed={selectedClaimId === claimId}
                claimId={claimId}
                onOpen={() => onClaim(claimId)}
              >
                {col.standing.length > 1 ? i + 1 : 'Standing record'}
                <span className="visually-hidden">
                  {col.standing.length > 1 ? ': standing record' : ''} of{' '}
                  {col.column.label}
                </span>
                <span aria-hidden="true"> ↗</span>
              </ClaimLink>
            </Fragment>
          ))}
        </span>
      )}
    </>
  );

  const versionSwitch = view.columns
    .filter((col) => col.texts.length > 1)
    .map((col) => (
      <label className="mc-developer lc-version" key={col.column.id}>
        <span>{col.column.label}</span>
        <select
          value={col.text}
          disabled={!live}
          onChange={(event) => {
            setOpen(null);
            const chosen = event.target.value;
            const others = editions.filter(
              (e) => !col.column.texts.includes(e),
            );
            onEditions(
              chosen === col.column.texts.at(-1) ? others : [...others, chosen],
            );
          }}
        >
          {[...col.texts].reverse().map((t) => (
            <option key={t} value={t}>
              {col.column.textLabels![col.texts.indexOf(t)]}
            </option>
          ))}
        </select>
      </label>
    ));

  const legend = (
    <div className="cmp-reading">
      <details className="cmp-legend">
        <summary>What the statuses mean</summary>
        <dl>
          {(Object.keys(lawStatusLabels) as LawCellStatus[]).map((s) => (
            <div key={s}>
              <dt>{lawStatusLabels[s]}</dt>
              <dd>{lawsCompared.legend[s]}</dd>
            </div>
          ))}
        </dl>
        <p className="cmp-hint">
          Four rules decide “partly” in borderline cases:
        </p>
        <ol className="lc-rules">
          {lawsCompared.partlyRules.map((r) => (
            <li key={r}>{r}</li>
          ))}
        </ol>
        <p className="cmp-hint">{lawsCompared.reading}</p>
        <p className="cmp-hint">{lawStandingText.paraphrased}</p>
        {layout === 'table' && (
          <p className="cmp-hint">
            Select a cell to open its passages, locator and note below the row.
            Each question links to a page of its own, and every cell is also
            listed instrument by instrument below the table.
          </p>
        )}
      </details>
      <details className="doc-limits-box">
        <summary>Limits of this comparison</summary>
        <ul className="doc-limits">
          {lawsCompared.limits.map((limit) => (
            <li key={limit}>{limit}</li>
          ))}
        </ul>
      </details>
      <details className="doc-limits-box">
        <summary>How we searched</summary>
        {lawsCompared.howWeSearched.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </details>
    </div>
  );

  const openFacet = open ? facets.find((f) => f.id === open.facet)! : null;
  const openCol = open
    ? columns.find((c) => c.column.id === open.column)!
    : null;
  const table = (
    <section
      className="cmp-table mc-table lc-table"
      aria-label="Questions by instrument"
    >
      <div
        className="cmp-scroll"
        ref={scroller}
        role="region"
        aria-label="Comparison table: questions by instrument"
        tabIndex={0}
      >
        <table>
          <thead>
            <tr className="lc-group-row">
              <td />
              {groups.map((g) => (
                <th scope="colgroup" colSpan={g.columns.length} key={g.heading}>
                  {g.heading}
                </th>
              ))}
            </tr>
            <tr>
              <th scope="col">Question</th>
              {columns.map((col) => (
                <th scope="col" key={col.column.id}>
                  {columnMeta(col)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {facets.map((f) => (
              <Fragment key={f.id}>
                <tr id={'law-' + f.id.replace('.', '-')}>
                  <th scope="row">
                    <NavLink
                      className="cmp-question-link"
                      href={questionHref(f.id)}
                      onOpen={() => openQuestion(f.id)}
                    >
                      <span className="mc-number">{lawFacetNumber(f.id)}</span>{' '}
                      {f.label}
                    </NavLink>
                  </th>
                  {columns.map((col) => {
                    const cell = view.cell(col.text, f.id);
                    const isOpen =
                      open?.column === col.column.id && open.facet === f.id;
                    return (
                      <td key={col.column.id}>
                        <button
                          type="button"
                          className={'mc-cell mc-status-' + cell.status}
                          aria-expanded={isOpen}
                          aria-controls={isOpen ? detailId : undefined}
                          disabled={!live}
                          data-claim-id={cell.claim?.id}
                          onClick={() =>
                            setOpen(
                              isOpen
                                ? null
                                : { column: col.column.id, facet: f.id },
                            )
                          }
                        >
                          {lawStatusShort[cell.status]}
                          <span className="visually-hidden">
                            : {columnName(col)}, {lawFacetNumber(f.id)}{' '}
                            {f.label}
                          </span>
                        </button>
                      </td>
                    );
                  })}
                </tr>
                {open?.facet === f.id && openFacet && openCol && (
                  <tr className="mc-detail-row">
                    <td colSpan={columns.length + 1}>
                      <div
                        className="mc-detail"
                        id={detailId}
                        role="group"
                        aria-label={`${columnName(openCol)}, ${lawFacetNumber(openFacet.id)} ${openFacet.label}`}
                        style={frameWidth ? { width: frameWidth } : undefined}
                      >
                        <div className="mc-detail-head">
                          <h3>
                            <span className="cmp-dimension">
                              {columnName(openCol)}
                            </span>
                            {lawFacetNumber(openFacet.id)} {openFacet.label}
                          </h3>
                          <button
                            type="button"
                            className="text-button"
                            onClick={() => {
                              setOpen(null);
                              requestAnimationFrame(() =>
                                document
                                  .querySelector<HTMLElement>(
                                    `#${CSS.escape('law-' + f.id.replace('.', '-'))} td:nth-child(${columns.indexOf(openCol) + 2}) button`,
                                  )
                                  ?.focus(),
                              );
                            }}
                          >
                            Close
                          </button>
                        </div>
                        <p className="cmp-criterion">
                          {lawsCompared.questions[openFacet.id].question}
                        </p>
                        <CellBody
                          {...props}
                          view={view}
                          col={openCol}
                          facetId={openFacet.id}
                          secondary
                        />
                        <NavLink
                          className="mc-question-more"
                          href={questionHref(openFacet.id)}
                          onOpen={() => openQuestion(openFacet.id)}
                        >
                          Every instrument on {lawFacetNumber(openFacet.id)}{' '}
                          {openFacet.label.toLowerCase()} →
                        </NavLink>
                      </div>
                    </td>
                  </tr>
                )}
              </Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );

  // The list equivalent of the table: every cell, instrument by instrument.
  const list = (
    <details className="mc-list">
      <summary>
        Every cell as a list, instrument by instrument (both New York texts)
      </summary>
      {groups.map((g) => (
        <section key={g.heading} aria-label={g.heading}>
          <h2>{g.heading}</h2>
          {g.note && <p className="cmp-hint">{g.note}</p>}
          {g.columns
            .flatMap((c) => c.texts.map((text) => ({ ...c, text })))
            .map((col) => (
              <section key={col.text} className="mc-list-card">
                <h3>{columnName(col)}</h3>
                <p className="cmp-edition-links">{col.column.standingNote}</p>
                <dl>
                  {facets.map((f) => (
                    <div key={f.id}>
                      <dt>
                        {lawFacetNumber(f.id)} {f.label}
                      </dt>
                      <dd>
                        <CellBody
                          {...props}
                          view={view}
                          col={col}
                          facetId={f.id}
                          secondary
                        />
                      </dd>
                    </div>
                  ))}
                </dl>
              </section>
            ))}
        </section>
      ))}
    </details>
  );

  const question = (
    <section className="cmp-question" aria-labelledby="lc-question-title">
      <label className="cmp-question-pick">
        <span>Question</span>
        <select
          value={current.id}
          disabled={!live}
          onChange={(event) => onFacet(event.target.value)}
        >
          {facets.map((f) => (
            <option key={f.id} value={f.id}>
              {lawFacetNumber(f.id)} {f.label}
            </option>
          ))}
        </select>
      </label>
      <h2 id="lc-question-title">
        <span className="cmp-dimension">
          Question {lawFacetNumber(current.id)}
        </span>
        {current.label}
      </h2>
      <p>{lawsCompared.questions[current.id].question}</p>
      <p className="cmp-criterion">
        <span className="cmp-note-label">Criterion: </span>
        {lawsCompared.questions[current.id].criterion}
      </p>
      {legend}
      {groups.map((g) => (
        <section key={g.heading} className="mc-group" aria-label={g.heading}>
          <h3 className="mc-group-name">{g.heading}</h3>
          {g.note && <p className="cmp-hint">{g.note}</p>}
          <ol className="cmp-rows">
            {g.columns
              .flatMap((c) =>
                [c.text, ...c.texts.filter((t) => t !== c.text)].map(
                  (text) => ({ ...c, text }),
                ),
              )
              .map((col) => (
                <li key={col.text}>
                  <h4>{columnName(col)}</h4>
                  <p className="cmp-edition-links lc-meta">
                    {columnMeta(col, true)}
                  </p>
                  <CellBody
                    {...props}
                    view={view}
                    col={col}
                    facetId={current.id}
                  />
                </li>
              ))}
          </ol>
        </section>
      ))}
      <nav className="cmp-question-nav" aria-label="Every question">
        <h2>Every question</h2>
        <ul>
          {facets.map((f) => (
            <li key={f.id}>
              <NavLink
                href={questionHref(f.id)}
                aria-current={f.id === current.id ? 'page' : undefined}
                onOpen={() => openQuestion(f.id)}
              >
                {lawFacetNumber(f.id)} {f.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </section>
  );

  const earlier = view.columns.filter((c) => c.earlier);
  return (
    <article className="doc-history cmp mc lc" aria-label={lawsCompared.title}>
      <header className="doc-lede">
        <span className="eyebrow">
          Comparison · {facets.length} questions · {view.columns.length}{' '}
          instruments
        </span>
        <h1>{lawsCompared.title}</h1>
        <p className="cmp-scope">
          A cell records what a text requires of the parties it defines. It does
          not show that any developer falls within them, or complied.
        </p>
        <p className="doc-intro">
          {lawsCompared.question} {lawsCompared.introduction}
        </p>
        <p className="lc-related">
          <NavLink
            href={referencePath({
              kind: 'compare',
              id: frameworkComparison.id,
            })}
            onOpen={() => props.onFrameworks()}
          >
            The same kind of questions put to developers’ own frameworks:
            Compare frameworks →
          </NavLink>
        </p>
      </header>
      <section className="cmp-controls" aria-label="Choose what to show">
        <div className="cmp-toolbar">
          <div
            className="view-switch"
            role="group"
            aria-label="Show the comparison as"
          >
            <button
              aria-pressed={layout === 'table'}
              onClick={() => {
                setTableOnPhone(true);
                if (facet) onFacet(null);
              }}
            >
              All questions
            </button>
            <button
              aria-pressed={layout === 'question'}
              onClick={() => onFacet(current.id)}
            >
              One question
            </button>
          </div>
          {versionSwitch}
          <CopyLink
            target={{
              kind: 'compare',
              id,
              facet: layout === 'question' ? current.id : undefined,
              editions: editions.length ? editions : undefined,
            }}
            label={
              layout === 'question'
                ? 'Copy link to this question'
                : 'Copy link to this comparison'
            }
          />
          <a className="cmp-download" href={comparisonCsvPath(id)} download>
            Download every cell as CSV
          </a>
        </div>
        {earlier.length > 0 && (
          <p className="cmp-hint" role="status">
            Showing an earlier text:{' '}
            {earlier.map((c) => columnName(c)).join('; ')}. The CSV file holds
            both texts.
          </p>
        )}
      </section>
      {layout === 'question' ? (
        question
      ) : (
        <>
          {legend}
          {table}
          {list}
        </>
      )}
    </article>
  );
}
