import { useEffect, useRef, useState } from 'react';
import { useInBrowser, useMediaQuery } from './client';
import type { Repository } from '../domain/repository';
import {
  cellNote,
  comparisonFacets,
  type CellStatus,
  type ComparisonView,
} from '../domain/framework-comparison';
import type { Entity } from '../domain/schema';
import { CopyLink } from './ReferenceActions';
import { ArchiveLink } from './SourceArchive';
import { quoted } from './quote';
import './reading-first.css';
import './framework-comparison.css';

const statusLabels: Record<CellStatus, string> = {
  stated: 'Stated',
  partly: 'Stated, partly',
  recorded: 'Recorded, not re-checked',
  'not-found': 'Not found in the recorded search',
  'not-checked': 'Not checked',
  'not-applicable': 'Does not apply',
};

type Props = {
  view: ComparisonView;
  repository: Repository;
  selectedClaimId: string | null;
  onClaim: (id: string) => void;
  /** The question shown in the one-question layout. */
  facet: string | null;
  onFacet: (facet: string) => void;
};

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
}: Omit<Props, 'facet' | 'onFacet'> & {
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
      <p className="cmp-status">{statusLabels[cell.status]}</p>
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
        <button
          className="doc-inspect"
          data-claim-id={claim.id}
          aria-pressed={selectedClaimId === claim.id}
          onClick={() => onClaim(claim.id)}
        >
          {cell.status === 'not-found'
            ? 'Open the search record'
            : 'Inspect sources and checks'}
          <span className="visually-hidden">
            : {name}, {facetLabel}
          </span>
          <span aria-hidden="true"> ↗</span>
        </button>
      )}
    </div>
  );
}

export function FrameworkComparison(props: Props) {
  const { view, repository, facet, onFacet } = props;
  const { collection, columns, dimensions } = view;
  const [chosen, setChosen] = useState<Record<string, string>>(() =>
    Object.fromEntries(
      columns.map((c) => [c.family, c.editions.at(-1)!.id] as const),
    ),
  );
  // The built page is the wide table, readable without JavaScript; a phone,
  // or an address at one question, switches once the page runs.
  const narrow = useMediaQuery(narrowQuery, false);
  const live = useInBrowser();
  const [chosenLayout, setLayout] = useState<'table' | 'question' | null>(null);
  const layout = chosenLayout ?? (narrow || facet ? 'question' : 'table');
  const current =
    comparisonFacets.find((f) => f.id === facet) ?? comparisonFacets[0];
  const scroller = useRef<HTMLDivElement>(null);
  const [clipped, setClipped] = useState(false);
  useEffect(() => {
    const element = scroller.current;
    if (layout !== 'table' || !element) return;
    const measure = () =>
      setClipped(element.scrollWidth > element.clientWidth + 1);
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
  const shown = columns.map((c) => ({
    ...c,
    edition: c.editions.find((e) => e.id === chosen[c.family])!,
  }));
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
  return (
    <article className="doc-history cmp" aria-label={collection.title}>
      <header className="doc-lede">
        <span className="eyebrow">
          Comparison · {comparisonFacets.length} questions · {columns.length}{' '}
          frameworks
        </span>
        <h1>{collection.title}</h1>
        <p className="landing-deck">{collection.question}</p>
        <p className="doc-intro">{collection.introduction}</p>
        <p className="cmp-scope">
          A status records what an edition states. It does not show
          implementation, compliance or effectiveness, and a shared row does not
          make two provisions equivalent.
        </p>
        <p className="doc-status">
          A machine selected and arranged these records. No human review of the
          selection or framing is recorded.
        </p>
        <div className="doc-actions">
          <CopyLink
            target={{ kind: 'compare', id: collection.id }}
            label="Copy link to this comparison"
          />
        </div>
      </header>
      <section className="cmp-legend" aria-labelledby="cmp-legend-title">
        <h2 id="cmp-legend-title">What the statuses mean</h2>
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
      </section>
      <details className="doc-limits-box">
        <summary>Limits of this comparison</summary>
        <ul className="doc-limits">
          {collection.limits.map((limit) => (
            <li key={limit}>{limit}</li>
          ))}
        </ul>
      </details>
      <section className="cmp-controls" aria-label="Choose what to compare">
        <details className="cmp-editions-box" open={!narrow}>
          <summary>
            Editions shown:{' '}
            {shown.every((c) => c.edition === c.editions.at(-1))
              ? 'the latest of each framework'
              : 'your choice'}
          </summary>
          <fieldset className="cmp-editions">
            <legend>Edition shown for each framework</legend>
            {columns.map((c) => (
              <label key={c.family}>
                <span>{c.label}</span>
                <select
                  value={chosen[c.family]}
                  disabled={!live}
                  onChange={(event) =>
                    setChosen((prev) => ({
                      ...prev,
                      [c.family]: event.target.value,
                    }))
                  }
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
        </details>
        <div
          className="view-switch"
          role="group"
          aria-label="Show the comparison as"
        >
          <button
            aria-pressed={layout === 'table'}
            onClick={() => setLayout('table')}
          >
            All questions in a table
          </button>
          <button
            aria-pressed={layout === 'question'}
            onClick={() => setLayout('question')}
          >
            One question at a time
          </button>
        </div>
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
          <ol className="cmp-rows">
            {shown.map((c) => (
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
                <Cell
                  {...props}
                  editionId={c.edition.id}
                  facetId={current.id}
                  facetLabel={current.label}
                />
              </li>
            ))}
          </ol>
        </section>
      ) : (
        <section className="cmp-table" aria-label="All questions">
          {clipped && (
            <p className="doc-alignment-cue" aria-hidden="true">
              Scroll sideways to see all {columns.length} frameworks →
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
                    </th>
                  ))}
                </tr>
              </thead>
              {dimensions.map((d) => (
                <tbody key={d.id}>
                  <tr className="cmp-dimension-row">
                    <th scope="colgroup" colSpan={shown.length + 1}>
                      {d.label}
                    </th>
                  </tr>
                  {d.facets.map((f) => (
                    <tr key={f.id}>
                      <th scope="row">
                        {f.label}
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
      )}
    </article>
  );
}
