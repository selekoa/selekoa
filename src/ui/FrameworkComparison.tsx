import { ClaimLink, NavLink } from './NavLink';
import { useEffect, useId, useRef, useState } from 'react';
import { comparisonCsvPath, referencePath } from '../domain/addresses';
import { useInBrowser, useMediaQuery } from './client';
import type { Repository } from '../domain/repository';
import {
  cellNote,
  cellStatusLabels,
  comparisonFacets,
  type CellStatus,
  type ComparisonView,
} from '../domain/framework-comparison';
import type { Entity } from '../domain/schema';
import { CopyLink } from './ReferenceActions';
import { ArchiveLink } from './SourceArchive';
import { cardDeveloper, cardEditions } from '../domain/model-cards-view';
import { modelCardsFrame } from '../reading/model-cards-frame';
import {
  lawsComparedId,
  lawsComparedTitle,
} from '../reading/laws-compared-page';
import { quoted } from './quote';
import './reading-first.css';
import './framework-comparison.css';

const statusLabels = cellStatusLabels;

type Props = {
  view: ComparisonView;
  repository: Repository;
  selectedClaimId: string | null;
  onClaim: (id: string) => void;
  /** The question shown in the one-question layout; null for every question. */
  facet: string | null;
  onFacet: (facet: string | null) => void;
  /** Editions shown in place of each framework's latest, as in the address. */
  editions: string[];
  onEditions: (editions: string[]) => void;
  /** Frameworks shown side by side, as in the address; null when not chosen. */
  frameworks: string[] | null;
  onFrameworks: (frameworks: string[] | null) => void;
  /** Opens Model cards compared at one developer's cards. */
  onCards?: (developer: string) => void;
  /** Opens Laws compared. */
  onLaws?: () => void;
};

type Layout = 'table' | 'side' | 'question';
const minPaired = 2;
const maxPaired = 3;

const editionLabel = (e: Entity) => e.documentVersion?.label ?? e.name;
const editionDate = (e: Entity) => {
  const v = e.documentVersion!;
  return v.effectiveAt
    ? `effective ${v.effectiveAt}`
    : v.publishedAt
      ? `published ${v.publishedAt}`
      : v.revisedAt
        ? `revised ${v.revisedAt}`
        : 'date unknown';
};

/** Wide screens start with the table; phones with one question at a time. */
const narrowQuery = '(max-width: 940px)';

function Cell({
  view,
  editionId,
  facetId,
  facetLabel,
  repository,
  selectedClaimId,
  onClaim,
}: Omit<
  Props,
  | 'facet'
  | 'onFacet'
  | 'editions'
  | 'onEditions'
  | 'frameworks'
  | 'onFrameworks'
  | 'onCards'
  | 'onLaws'
> & {
  editionId: string;
  facetId: string;
  facetLabel: string;
}) {
  const cell = view.cell(editionId, facetId);
  const edition = repository.entities.get(editionId)!;
  const name = edition.shortName ?? edition.name;
  const claim = cell.claim;
  const evidence = claim
    ? claim.evidenceIds.map((id) => repository.evidence.get(id)!)
    : [];
  const passages = evidence.filter((e) => e.passageType === 'quote');
  // A recorded absence's paraphrase is its search record, opened below.
  const paraphrases =
    claim?.predicate === 'states_provision'
      ? evidence.filter((e) => e.passageType === 'paraphrase')
      : [];
  const note = claim ? cellNote(claim) : '';
  return (
    <div className={'cmp-cell cmp-cell-' + cell.status}>
      <p className="cmp-status" title={view.collection.legend[cell.status]}>
        {statusLabels[cell.status]}
      </p>
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
      {paraphrases.length > 0 && (
        <ul className="cmp-passages cmp-paraphrases">
          {paraphrases.map((e) => (
            <li key={e.id}>
              <p className="cmp-paraphrase">
                <span className="cmp-paraphrase-label">Paraphrase: </span>
                {e.passage}
              </p>
              <p className="cmp-locator">{e.locator}</p>
            </li>
          ))}
        </ul>
      )}
      {(cell.status === 'not-checked' || cell.status === 'not-applicable') && (
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
          pressed={selectedClaimId === claim.id}
          claimId={claim.id}
          onOpen={() => onClaim(claim.id)}
        >
          {cell.status === 'not-found'
            ? 'Open the search record'
            : 'Inspect sources and checks'}
          <span className="visually-hidden">
            : {name}, {facetLabel}
          </span>
          <span aria-hidden="true"> ↗</span>
        </ClaimLink>
      )}
    </div>
  );
}

export function FrameworkComparison(props: Props) {
  const {
    view,
    repository,
    facet,
    onFacet,
    editions,
    onEditions,
    frameworks,
    onFrameworks,
  } = props;
  const { collection, columns, dimensions } = view;
  // Each framework shows its latest edition unless the address names another.
  const chosen: Record<string, string> = Object.fromEntries(
    columns.map((c) => [
      c.family,
      c.editions.find((e) => editions.includes(e.id))?.id ??
        c.editions.at(-1)!.id,
    ]),
  );
  /** The address keeps only the editions that differ from the latest. */
  const choose = (family: string, editionId: string) =>
    onEditions(
      columns.flatMap((c) => {
        const id = c.family === family ? editionId : chosen[c.family];
        return id === c.editions.at(-1)!.id ? [] : [id];
      }),
    );
  // The built page is the wide table, readable without JavaScript; a phone
  // switches to one question once the page runs. A question's own page
  // (`/compare/<id>/<question>`) is built in the one-question layout.
  const narrow = useMediaQuery(narrowQuery, false);
  const live = useInBrowser();
  // The address decides the layout: a question's page shows one question,
  // `?frameworks=` shows them side by side, and the comparison's own address
  // shows the table. A phone shows one question there unless the reader
  // chose the table, the one choice kept outside the address.
  const [tableOnPhone, setTableOnPhone] = useState(false);
  const layout: Layout = facet
    ? 'question'
    : frameworks
      ? 'side'
      : narrow && !tableOnPhone
        ? 'question'
        : 'table';
  const current =
    comparisonFacets.find((f) => f.id === facet) ?? comparisonFacets[0];
  // Side by side: two or three frameworks, the first two to begin with, kept
  // in the address in column order (`?frameworks=a,b`).
  const paired = frameworks ?? [];
  const inOrder = (list: string[]) =>
    columns.map((c) => c.family).filter((f) => list.includes(f));
  const pick = (next: Layout) => {
    if (next === 'table') setTableOnPhone(true);
    onFrameworks(
      next === 'side' ? columns.slice(0, minPaired).map((c) => c.family) : null,
    );
    if (next === 'question') onFacet(current.id);
    else if (facet) onFacet(null);
  };
  const pair = (family: string, on: boolean) =>
    onFrameworks(
      inOrder(
        on
          ? [...paired, family].slice(0, maxPaired)
          : paired.length > minPaired
            ? paired.filter((f) => f !== family)
            : paired,
      ),
    );
  // The edition pickers stay behind one control, opened by the reader or by
  // an address that chooses editions other than the latest.
  // Until the reader toggles it, it is open exactly when editions are chosen
  // (after the page runs, so the built page and its takeover agree).
  const [editionsToggled, setEditionsToggled] = useState<boolean | null>(null);
  const editionsOpen = editionsToggled ?? (live && editions.length > 0);
  const editionsPanel = useId();
  const scroller = useRef<HTMLDivElement>(null);
  const [clipped, setClipped] = useState(false);
  useEffect(() => {
    const element = scroller.current;
    if (layout === 'question' || !element) return;
    // The fixed header row and question column keep a focused cell in view.
    const measure = () => {
      setClipped(element.scrollWidth > element.clientWidth + 1);
      const head = element.querySelector('thead');
      const first = element.querySelector('thead th');
      element.style.scrollPaddingTop = `${head?.offsetHeight ?? 0}px`;
      element.style.scrollPaddingLeft = `${(first as HTMLElement | null)?.offsetWidth ?? 0}px`;
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(element);
    return () => observer.disconnect();
  }, [layout]);
  // The legend explains only the statuses some edition's cell carries.
  const present = new Set(
    columns.flatMap((c) =>
      c.editions.flatMap((e) =>
        comparisonFacets.map((f) => view.cell(e.id, f.id).status),
      ),
    ),
  );
  const all = columns.map((c) => ({
    ...c,
    edition: c.editions.find((e) => e.id === chosen[c.family])!,
  }));
  const shown =
    layout === 'side' ? all.filter((c) => paired.includes(c.family)) : all;
  const questionHref = (facetId: string) =>
    referencePath({
      kind: 'compare',
      id: collection.id,
      facet: facetId,
      editions: editions.length ? editions : undefined,
    });
  // The cards of Model cards compared that cite each edition.
  const shownCards = new Set(modelCardsFrame.cards);
  const citedBy = new Map<string, Entity[]>();
  for (const [card, cited] of cardEditions(
    repository.data,
    collection.families,
  ))
    if (shownCards.has(card))
      for (const edition of cited)
        citedBy.set(edition, [
          ...(citedBy.get(edition) ?? []),
          repository.entities.get(card)!,
        ]);
  const cardsCiting = (editionId: string) => {
    const cards = citedBy.get(editionId) ?? [];
    return cards.length ? (
      <span className="cmp-cited-by">
        Model cards citing this edition:{' '}
        {cards.map((card, i) => {
          const developer = cardDeveloper(repository.data, card).id;
          return (
            <span key={card.id}>
              {i > 0 && ', '}
              <NavLink
                href={referencePath({
                  kind: 'compare',
                  id: modelCardsFrame.id,
                  developer,
                })}
                onOpen={() => {
                  props.onCards?.(developer);
                  window.scrollTo(0, 0);
                }}
              >
                {card.shortName ?? card.name}
              </NavLink>
            </span>
          );
        })}
      </span>
    ) : null;
  };
  const sourceOf = (editionId: string) =>
    repository.data.sources.find((s) => s.documentId === editionId);
  const editionLinks = (editionId: string) => {
    const source = sourceOf(editionId);
    return source ? (
      <>
        <a href={source.evidenceUrl} target="_blank" rel="noreferrer">
          Edition text
          <span className="visually-hidden">: {source.title}</span>
          <span aria-hidden="true"> ↗</span>
        </a>
        {source.archivedUrl && <ArchiveLink source={source} />}
      </>
    ) : null;
  };
  const table = (
    <section className="cmp-table" aria-label="Questions by framework">
      {clipped && (
        <p className="doc-alignment-cue" aria-hidden="true">
          Scroll sideways to see all {shown.length} frameworks →
        </p>
      )}
      <div
        className="cmp-scroll"
        ref={scroller}
        role="region"
        aria-label="Comparison table: questions by framework"
        tabIndex={0}
      >
        <table>
          <thead>
            <tr>
              <th scope="col">Question</th>
              {shown.map((c) => (
                <th scope="col" key={c.family}>
                  {c.label}
                  <span className="cmp-edition">
                    {editionLabel(c.edition)} · {editionDate(c.edition)}
                  </span>
                  <span className="cmp-edition-links">
                    {editionLinks(c.edition.id)}
                  </span>
                  {cardsCiting(c.edition.id)}
                </th>
              ))}
            </tr>
          </thead>
          {dimensions.map((d) => (
            <tbody key={d.id}>
              <tr className="cmp-dimension-row">
                <th scope="colgroup" colSpan={shown.length + 1}>
                  <span>{d.label}</span>
                </th>
              </tr>
              {d.facets.map((f) => (
                <tr key={f.id}>
                  <th scope="row">
                    <NavLink
                      className="cmp-question-link"
                      href={questionHref(f.id)}
                      onOpen={() => {
                        onFacet(f.id);
                        window.scrollTo(0, 0);
                      }}
                    >
                      {f.label}
                    </NavLink>
                    <span className="cmp-criterion">{f.criterion}</span>
                  </th>
                  {shown.map((c) => (
                    <td key={c.family}>
                      <Cell
                        {...props}
                        editionId={c.edition.id}
                        facetId={f.id}
                        facetLabel={f.label}
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          ))}
        </table>
      </div>
    </section>
  );
  const legend = (
    <div className="cmp-reading">
      <details className="cmp-legend">
        <summary>What the statuses mean</summary>
        <p>{collection.reading}</p>
        <dl>
          {(Object.keys(statusLabels) as CellStatus[])
            .filter((s) => present.has(s))
            .map((s) => (
              <div key={s}>
                <dt>{statusLabels[s]}</dt>
                <dd>{collection.legend[s]}</dd>
              </div>
            ))}
        </dl>
        {layout !== 'question' && (
          <p className="cmp-hint">
            Select “Inspect sources and checks” in a cell to open its record in
            a panel; Escape closes it. Each question links to a page of its own.
          </p>
        )}
      </details>
      <details className="doc-limits-box">
        <summary>Limits of this comparison</summary>
        <ul className="doc-limits">
          {collection.limits.map((limit) => (
            <li key={limit}>{limit}</li>
          ))}
        </ul>
      </details>
    </div>
  );
  return (
    <article className="doc-history cmp" aria-label={collection.title}>
      <header className="doc-lede">
        <span className="eyebrow">
          Comparison · {comparisonFacets.length} questions · {columns.length}{' '}
          frameworks
        </span>
        <h1>{collection.title}</h1>
        <p className="cmp-scope">
          A status records what an edition states. It does not show
          implementation, compliance or effectiveness, and a shared row does not
          make two provisions equivalent.
        </p>
        <p className="doc-intro">
          {collection.question} {collection.introduction}
        </p>
        <p className="cmp-hint">
          <NavLink
            href={referencePath({ kind: 'compare', id: lawsComparedId })}
            onOpen={() => {
              props.onLaws?.();
              window.scrollTo(0, 0);
            }}
          >
            How laws treat the same questions: {lawsComparedTitle} →
          </NavLink>
        </p>
      </header>
      <section className="cmp-controls" aria-label="Choose what to compare">
        <div className="cmp-toolbar">
          <div
            className="view-switch"
            role="group"
            aria-label="Show the comparison as"
          >
            <button
              aria-pressed={layout === 'table'}
              onClick={() => pick('table')}
            >
              All frameworks
            </button>
            <button
              aria-pressed={layout === 'side'}
              onClick={() => pick('side')}
            >
              Side by side
            </button>
            <button
              aria-pressed={layout === 'question'}
              onClick={() => pick('question')}
            >
              One question
            </button>
          </div>
          <button
            type="button"
            className="cmp-editions-toggle"
            aria-expanded={editionsOpen}
            aria-controls={editionsPanel}
            disabled={!live}
            onClick={() => setEditionsToggled(!editionsOpen)}
          >
            Choose editions ({editions.length} chosen)
          </button>
          <CopyLink
            target={{
              kind: 'compare',
              id: collection.id,
              facet: layout === 'question' ? current.id : undefined,
              editions: editions.length ? editions : undefined,
              frameworks: layout === 'side' ? paired : undefined,
            }}
            label={
              layout === 'question'
                ? 'Copy link to this question'
                : layout === 'side'
                  ? 'Copy link to these frameworks side by side'
                  : 'Copy link to this comparison'
            }
          />
          <a
            className="cmp-download"
            href={comparisonCsvPath(collection.id)}
            download
          >
            Download every cell as CSV
          </a>
        </div>
        <fieldset
          className="cmp-editions"
          id={editionsPanel}
          hidden={!editionsOpen}
        >
          <legend>Edition shown for each framework</legend>
          {columns.map((c) => (
            <label key={c.family}>
              <span>{c.label}</span>
              <select
                value={chosen[c.family]}
                disabled={!live}
                onChange={(event) => choose(c.family, event.target.value)}
              >
                {c.editions.map((e, i) => (
                  <option key={e.id} value={e.id}>
                    {editionLabel(e)} · {editionDate(e)}
                    {i === c.editions.length - 1 ? ' (latest)' : ''}
                  </option>
                ))}
              </select>
            </label>
          ))}
        </fieldset>
        {layout === 'side' && (
          <fieldset className="cmp-pair">
            <legend>Frameworks side by side (two or three)</legend>
            {columns.map((c) => {
              const on = paired.includes(c.family);
              return (
                <label key={c.family}>
                  <input
                    type="checkbox"
                    checked={on}
                    disabled={
                      on
                        ? paired.length <= minPaired
                        : paired.length >= maxPaired
                    }
                    onChange={(event) => pair(c.family, event.target.checked)}
                  />{' '}
                  {c.label}
                </label>
              );
            })}
          </fieldset>
        )}
      </section>
      {layout === 'question' ? (
        <section className="cmp-question" aria-labelledby="cmp-question-title">
          <label className="cmp-question-pick">
            <span>Question</span>
            <select
              value={current.id}
              disabled={!live}
              onChange={(event) => onFacet(event.target.value)}
            >
              {dimensions.map((d) => (
                <optgroup key={d.id} label={d.label}>
                  {d.facets.map((f) => (
                    <option key={f.id} value={f.id}>
                      {f.label}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
          </label>
          <h2 id="cmp-question-title">
            <span className="cmp-dimension">{current.dimension.label}</span>
            {current.label}
          </h2>
          <p className="cmp-criterion">
            <span className="cmp-note-label">Criterion: </span>
            {current.criterion}
          </p>
          {legend}
          <ol className="cmp-rows">
            {all.map((c) => (
              <li key={c.family}>
                <h3>
                  {c.label}
                  <span className="cmp-edition">
                    {editionLabel(c.edition)} · {editionDate(c.edition)}
                  </span>
                </h3>
                <p className="cmp-edition-links">
                  {editionLinks(c.edition.id)}
                </p>
                {cardsCiting(c.edition.id)}
                <Cell
                  {...props}
                  editionId={c.edition.id}
                  facetId={current.id}
                  facetLabel={current.label}
                />
              </li>
            ))}
          </ol>
          <nav className="cmp-question-nav" aria-label="Every question">
            <h2>Every question</h2>
            {dimensions.map((d) => (
              <div key={d.id}>
                <h3>{d.label}</h3>
                <ul>
                  {d.facets.map((f) => (
                    <li key={f.id}>
                      <NavLink
                        href={questionHref(f.id)}
                        aria-current={f.id === current.id ? 'page' : undefined}
                        onOpen={() => {
                          onFacet(f.id);
                          window.scrollTo(0, 0);
                        }}
                      >
                        {f.label}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </section>
      ) : (
        <>
          {legend}
          {table}
        </>
      )}
    </article>
  );
}
