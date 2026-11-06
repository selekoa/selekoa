import { ClaimLink, NavLink } from './NavLink';
import { Fragment, useEffect, useId, useRef, useState } from 'react';
import { comparisonCsvPath, referencePath } from '../domain/addresses';
import { cellTextPath } from '../domain/slices';
import { furtherHeld, loadFurther, useHeldRecords } from './records';
import { islandHtml } from './islands';
import { useInBrowser, useMediaQuery } from './client';
import type { Repository } from '../domain/repository';
import type { Dataset, Entity } from '../domain/schema';
import { cardDevelopers, cardFacetNumber } from '../domain/model-card-facets';
import {
  cardCellNote,
  cardDate,
  cardDeveloper,
  cardEditions,
  cardSearchRecord,
  cardStandingText,
  cardStatusLabels,
  cardStatusShort,
  modelCardsView,
  type ModelCardsView,
} from '../domain/model-cards-view';
import type { CardCellStatus } from '../domain/model-cards';
import { modelCards } from '../reading/model-cards';
import { frameworkComparison } from '../reading/framework-comparison';
import { remember, type Remembered } from '../domain/memo';
import { CopyLink } from './ReferenceActions';
import { quoted } from './quote';
import './reading-first.css';
import './framework-comparison.css';
import './model-cards.css';

type Props = {
  repository: Repository;
  selectedClaimId: string | null;
  onClaim: (id: string) => void;
  /** Opens a card's own page. */
  onEntity: (id: string) => void;
  /** The question shown in the one-question layout; null for the table. */
  facet: string | null;
  onFacet: (facet: string | null) => void;
  /** The developer whose cards are shown, as in the address; null for all. */
  developer: string | null;
  onDeveloper: (developer: string | null) => void;
  /** Opens Compare frameworks at these editions. */
  onEditions: (editions: string[]) => void;
};

/** Wide screens start with the table; phones with one question at a time. */
const narrowQuery = '(max-width: 940px)';
const id = modelCards.id;
const facetCount = 16;

// Computed once per dataset, counting their reads for every page that
// uses them (src/domain/memo.ts).
const views = new WeakMap<Dataset, Remembered<ModelCardsView>>();
const viewOf = (data: Dataset) =>
  remember(views, data, () => modelCardsView(data, modelCards));
const editionsByCard = new WeakMap<
  Dataset,
  Remembered<Map<string, string[]>>
>();
const editionsOf = (data: Dataset) =>
  remember(editionsByCard, data, () =>
    cardEditions(data, frameworkComparison.families),
  );

const cardName = (card: Entity) => card.shortName ?? card.name;

/** The key of the built list of every cell (src/ui/islands.ts). */
export const cellsIsland = 'model-cards-cells';

/** The cards shown, by developer: every developer's, or one's. */
function cardGroups(
  data: Dataset,
  view: ModelCardsView,
  developer: string | null,
) {
  return cardDevelopers
    .filter((d) => !developer || d.id === developer)
    .map((d) => ({
      ...d,
      cards: view.rows.filter((card) => cardDeveloper(data, card).id === d.id),
    }))
    .filter((g) => g.cards.length);
}

/** The card's date and the framework editions it cites. */
function CardMeta({
  repository,
  card,
  onEditions,
}: {
  repository: Repository;
  card: Entity;
  onEditions: (editions: string[]) => void;
}) {
  const data = repository.data;
  const view = viewOf(data);
  const cited = (editionsOf(data).get(card.id) ?? []).map((e) =>
    repository.entities.get(e)!,
  );
  return (
    <>
      <span className="cmp-edition">
        {cardDate(card, view.cell(card.id, 'MC.Q01').claim)}
      </span>
      {cited.map((edition) => (
        <NavLink
          key={edition.id}
          className="mc-edition-link"
          href={referencePath({
            kind: 'compare',
            id: frameworkComparison.id,
            editions: [edition.id],
          })}
          onOpen={() => {
            onEditions([edition.id]);
            window.scrollTo(0, 0);
          }}
        >
          Cites {edition.shortName ?? edition.name}
          <span className="visually-hidden">
            : open that edition in Compare frameworks
          </span>
          <span aria-hidden="true"> →</span>
        </NavLink>
      ))}
    </>
  );
}

/**
 * Every cell, card by card: the list equivalent of the table. The build
 * draws it into the page (`cellsIsland`); the browser draws it once it has
 * loaded the cells' text (`cellTextPath`).
 */
export function ModelCardsCells({
  repository,
  developer,
  selectedClaimId,
  onClaim,
  onEditions,
}: {
  repository: Repository;
  developer: string | null;
  selectedClaimId: string | null;
  onClaim: (id: string) => void;
  onEditions: (editions: string[]) => void;
}) {
  const data = repository.data;
  const view = viewOf(data);
  return cardGroups(data, view, developer).map((g) => (
    <section key={g.id} aria-label={g.name}>
      <h2>{g.name}</h2>
      {g.cards.map((card) => (
        <section key={card.id} className="mc-list-card">
          <h3>{cardName(card)}</h3>
          <p className="cmp-edition-links">
            <CardMeta
              repository={repository}
              card={card}
              onEditions={onEditions}
            />
          </p>
          <dl>
            {view.facets.map((f) => (
              <div key={f.id}>
                <dt>
                  {cardFacetNumber(f.id)} {f.label}
                </dt>
                <dd>
                  <CellBody
                    view={view}
                    repository={repository}
                    card={card}
                    facetId={f.id}
                    selectedClaimId={selectedClaimId}
                    onClaim={onClaim}
                    secondary
                  />
                </dd>
              </div>
            ))}
          </dl>
        </section>
      ))}
    </section>
  ));
}

/** One cell: status, quotations with locators, the search or reason, the note. */
function CellBody({
  view,
  repository,
  card,
  facetId,
  selectedClaimId,
  onClaim,
  secondary = false,
}: {
  view: ModelCardsView;
  repository: Repository;
  card: Entity;
  facetId: string;
  selectedClaimId: string | null;
  onClaim: (id: string) => void;
  /** A further copy of the cell, as in the list: no row marker. */
  secondary?: boolean;
}) {
  const cell = view.cell(card.id, facetId);
  const claim = cell.claim;
  const facet = view.facets.find((f) => f.id === facetId)!;
  const passages = claim
    ? claim.evidenceIds
        .map((e) => repository.evidence.get(e)!)
        .filter((e) => e.passageType === 'quote')
    : [];
  const search =
    claim && cell.status === 'not-found' ? cardSearchRecord(claim) : null;
  const note = claim ? cardCellNote(claim) : '';
  return (
    <div className={'cmp-cell mc-cell-body mc-status-' + cell.status}>
      <p className="cmp-status">{cardStatusLabels[cell.status]}</p>
      {passages.length > 0 && (
        <ul className="cmp-passages">
          {passages.map((e) => (
            <li key={e.id}>
              <blockquote>{quoted(e.passage)}</blockquote>
              <p className="cmp-locator">{e.locator}</p>
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
            : {cardName(card)}, {cardFacetNumber(facet.id)} {facet.label}
          </span>
          <span aria-hidden="true"> ↗</span>
        </ClaimLink>
      )}
    </div>
  );
}

export function ModelCards(props: Props) {
  const { repository, facet, onFacet, developer, onDeveloper, onEditions } =
    props;
  const data = repository.data;
  const view = viewOf(data);
  const { facets } = view;
  const live = useInBrowser();
  // The built page is the table, readable without JavaScript; a phone
  // switches to one question once the page runs, unless the reader chose
  // the table. A question's own page is built in the one-question layout.
  const narrow = useMediaQuery(narrowQuery, false);
  const [tableOnPhone, setTableOnPhone] = useState(false);
  const layout: 'table' | 'question' =
    facet || (narrow && !tableOnPhone) ? 'question' : 'table';
  const current = facets.find((f) => f.id === facet) ?? facets[0];
  // The cell open below its row in the table, as `card facet`.
  const [open, setOpen] = useState<{ card: string; facet: string } | null>(
    null,
  );
  const detailId = useId();
  const scroller = useRef<HTMLDivElement>(null);
  const [frameWidth, setFrameWidth] = useState<number | null>(null);
  useEffect(() => {
    const element = scroller.current;
    if (layout !== 'table' || !element) return;
    // The fixed header row and card column keep a focused cell in view, and
    // an open cell's text is as wide as the visible part of the table.
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

  const groups = cardGroups(data, view, developer);
  // The cells' text (quotations, locators, notes, searches) is not in the
  // page's slice: it loads once the table is drawn. Until then the list is
  // the one the build drew, and an open cell says that its text is loading.
  // Drawn again when it is held (`useHeldRecords`); never while the
  // browser takes over the built page, whose list it keeps.
  useHeldRecords();
  const textPath = cellTextPath(id);
  const cellsReady = live && furtherHeld(textPath);
  useEffect(() => {
    if (live && layout === 'table' && !furtherHeld(textPath))
      void loadFurther(textPath);
  }, [live, layout, textPath]);
  const shownCards = groups.flatMap((g) => g.cards);
  const questionHref = (facetId: string) =>
    referencePath({
      kind: 'compare',
      id,
      facet: facetId,
      developer: developer ?? undefined,
    });
  const openQuestion = (facetId: string) => {
    onFacet(facetId);
    setOpen(null);
    window.scrollTo(0, 0);
  };

  /** The card's date and the framework editions it cites. */
  const cardMeta = (card: Entity) => (
    <CardMeta repository={repository} card={card} onEditions={onEditions} />
  );
  const cardLink = (card: Entity) => (
    <NavLink
      href={referencePath({ kind: 'document', id: card.id })}
      onOpen={() => props.onEntity(card.id)}
    >
      {cardName(card)}
    </NavLink>
  );

  const developerFilter = (
    <label className="mc-developer">
      <span>Developer</span>
      <select
        value={developer ?? ''}
        disabled={!live}
        onChange={(event) => {
          setOpen(null);
          onDeveloper(event.target.value || null);
        }}
      >
        <option value="">All developers</option>
        {cardDevelopers.map((d) => (
          <option key={d.id} value={d.id}>
            {d.name}
          </option>
        ))}
      </select>
    </label>
  );

  const legend = (
    <div className="cmp-reading">
      <details className="cmp-legend">
        <summary>What the statuses mean</summary>
        <dl>
          {(Object.keys(cardStatusLabels) as CardCellStatus[]).map((s) => (
            <div key={s}>
              <dt>{cardStatusLabels[s]}</dt>
              <dd>{modelCards.legend[s]}</dd>
            </div>
          ))}
        </dl>
        <p className="cmp-hint">{cardStandingText.stated}</p>
        {layout === 'table' && (
          <p className="cmp-hint">
            Select a cell to open its quotation, locator and note below the row.
            Each question links to a page of its own, and every cell is also
            listed card by card below the table.
          </p>
        )}
      </details>
      <details className="doc-limits-box">
        <summary>Limits of this comparison</summary>
        <ul className="doc-limits">
          {modelCards.limits.map((limit) => (
            <li key={limit}>{limit}</li>
          ))}
        </ul>
      </details>
      <details className="doc-limits-box">
        <summary>How we searched</summary>
        {modelCards.howWeSearched.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </details>
    </div>
  );

  const openFacet = open ? facets.find((f) => f.id === open.facet)! : null;
  const openCard = open ? repository.entities.get(open.card)! : null;
  const table = (
    <section className="cmp-table mc-table" aria-label="Cards by question">
      <div
        className="cmp-scroll"
        ref={scroller}
        role="region"
        aria-label="Comparison table: cards by question"
        tabIndex={0}
      >
        <table>
          <thead>
            <tr>
              <th scope="col">Card</th>
              {facets.map((f) => (
                <th scope="col" key={f.id}>
                  <NavLink
                    className="cmp-question-link"
                    href={questionHref(f.id)}
                    onOpen={() => openQuestion(f.id)}
                  >
                    <span className="mc-number">{cardFacetNumber(f.id)}</span>{' '}
                    {f.label}
                  </NavLink>
                </th>
              ))}
            </tr>
          </thead>
          {groups.map((g) => (
            <tbody key={g.id}>
              <tr className="cmp-dimension-row">
                <th scope="colgroup" colSpan={facets.length + 1}>
                  <span>{g.name}</span>
                </th>
              </tr>
              {g.cards.map((card) => (
                <Fragment key={card.id}>
                  <tr id={'card-' + card.id}>
                    <th scope="row">
                      {cardLink(card)}
                      {cardMeta(card)}
                    </th>
                    {facets.map((f) => {
                      const cell = view.cell(card.id, f.id);
                      const isOpen =
                        open?.card === card.id && open.facet === f.id;
                      return (
                        <td key={f.id}>
                          <button
                            type="button"
                            className={'mc-cell mc-status-' + cell.status}
                            aria-expanded={isOpen}
                            aria-controls={isOpen ? detailId : undefined}
                            disabled={!live}
                            data-claim-id={cell.claim?.id}
                            onClick={() =>
                              setOpen(
                                isOpen ? null : { card: card.id, facet: f.id },
                              )
                            }
                          >
                            {cardStatusShort[cell.status]}
                            <span className="visually-hidden">
                              : {cardName(card)}, {cardFacetNumber(f.id)}{' '}
                              {f.label}
                            </span>
                          </button>
                        </td>
                      );
                    })}
                  </tr>
                  {open?.card === card.id && openFacet && openCard && (
                    <tr className="mc-detail-row">
                      <td colSpan={facets.length + 1}>
                        <div
                          className="mc-detail"
                          id={detailId}
                          role="group"
                          aria-label={`${cardName(openCard)}, ${cardFacetNumber(openFacet.id)} ${openFacet.label}`}
                          style={frameWidth ? { width: frameWidth } : undefined}
                        >
                          <div className="mc-detail-head">
                            <h3>
                              <span className="cmp-dimension">
                                {cardName(openCard)}
                              </span>
                              {cardFacetNumber(openFacet.id)} {openFacet.label}
                            </h3>
                            <button
                              type="button"
                              className="text-button"
                              onClick={() => {
                                setOpen(null);
                                requestAnimationFrame(() =>
                                  document
                                    .querySelector<HTMLElement>(
                                      `#${CSS.escape('card-' + card.id)} td:nth-child(${facets.indexOf(openFacet) + 2}) button`,
                                    )
                                    ?.focus(),
                                );
                              }}
                            >
                              Close
                            </button>
                          </div>
                          <p className="cmp-criterion">
                            {modelCards.questions[openFacet.id].question}
                          </p>
                          {cellsReady ? (
                            <CellBody
                              {...props}
                              view={view}
                              card={openCard}
                              facetId={openFacet.id}
                              secondary
                            />
                          ) : (
                            <p className="cmp-hint" role="status">
                              Loading the cell’s quotations and notes…
                            </p>
                          )}
                          <NavLink
                            className="mc-question-more"
                            href={questionHref(openFacet.id)}
                            onOpen={() => openQuestion(openFacet.id)}
                          >
                            Every card on {cardFacetNumber(openFacet.id)}{' '}
                            {openFacet.label.toLowerCase()} →
                          </NavLink>
                        </div>
                      </td>
                    </tr>
                  )}
                </Fragment>
              ))}
            </tbody>
          ))}
        </table>
      </div>
    </section>
  );

  // The list equivalent of the table: every cell, card by card. The built
  // page holds it whole, readable without JavaScript (src/ui/islands.ts).
  const list = (
    <details className="mc-list">
      <summary>Every cell as a list, card by card</summary>
      {cellsReady ? (
        <div className="mc-list-cells" key="cells">
          <ModelCardsCells
            repository={repository}
            developer={developer}
            selectedClaimId={props.selectedClaimId}
            onClaim={props.onClaim}
            onEditions={onEditions}
          />
        </div>
      ) : developer ? (
        <p className="cmp-hint" role="status" key="loading">
          Loading every cell…
        </p>
      ) : (
        <div
          className="mc-list-cells"
          key="built"
          dangerouslySetInnerHTML={{ __html: islandHtml(cellsIsland) }}
        />
      )}
    </details>
  );

  const question = (
    <section className="cmp-question" aria-labelledby="mc-question-title">
      <label className="cmp-question-pick">
        <span>Question</span>
        <select
          value={current.id}
          disabled={!live}
          onChange={(event) => onFacet(event.target.value)}
        >
          {facets.map((f) => (
            <option key={f.id} value={f.id}>
              {cardFacetNumber(f.id)} {f.label}
            </option>
          ))}
        </select>
      </label>
      <h2 id="mc-question-title">
        <span className="cmp-dimension">
          Question {cardFacetNumber(current.id)}
        </span>
        {current.label}
      </h2>
      <p>{modelCards.questions[current.id].question}</p>
      <p className="cmp-criterion">
        <span className="cmp-note-label">Criterion: </span>
        {modelCards.questions[current.id].criterion}
      </p>
      {legend}
      {groups.map((g) => (
        <section key={g.id} className="mc-group" aria-label={g.name}>
          <h3 className="mc-group-name">{g.name}</h3>
          <ol className="cmp-rows">
            {g.cards.map((card) => (
              <li key={card.id}>
                <h4>{cardName(card)}</h4>
                <p className="cmp-edition-links">{cardMeta(card)}</p>
                <CellBody
                  {...props}
                  view={view}
                  card={card}
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
                {cardFacetNumber(f.id)} {f.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </section>
  );

  return (
    <article className="doc-history cmp mc" aria-label={modelCards.title}>
      <header className="doc-lede">
        <span className="eyebrow">
          Comparison · {facetCount} questions · {view.rows.length} cards
        </span>
        <h1>{modelCards.title}</h1>
        <p className="cmp-scope">
          A cell records what a card states. It does not show that an evaluation
          was run as described or that a safeguard works, and a shared question
          does not make two cards’ answers equivalent.
        </p>
        <p className="doc-intro">
          {modelCards.question} {modelCards.introduction}
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
          {developerFilter}
          <CopyLink
            target={{
              kind: 'compare',
              id,
              facet: layout === 'question' ? current.id : undefined,
              developer: developer ?? undefined,
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
        {developer && (
          <p className="cmp-hint" role="status">
            Showing {shownCards.length} of {view.rows.length} cards:{' '}
            {cardDevelopers.find((d) => d.id === developer)!.name}.
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
