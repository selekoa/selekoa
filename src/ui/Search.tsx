import {
  Fragment,
  use,
  useDeferredValue,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { useInBrowser, useMediaQuery } from './client';
import {
  createPageIndex,
  searchPages,
  type Highlight,
  type SearchField,
  type SearchHit,
  type SearchMode,
  type SearchRecordType,
} from '../domain/search';
import type { SearchOutcome, SearchSource } from './search-source';
import type { SearchFacets } from './search-facets';
import {
  derivationLabels,
  resolutionLabels,
  supportLabels,
} from '../domain/epistemics';
import { entityStyle } from './entityStyle';
import { CopyLink } from './ReferenceActions';
import { RecordLink, ClaimLink, NavLink, RecordHref } from './NavLink';
import { recordPath } from './record-path';
import { ArchiveLink } from './SourceArchive';
import './search.css';
import { quoted } from './quote';

const groupLabels: Record<SearchRecordType, string> = {
  claim: 'Claims',
  passage: 'Evidence passages',
  source: 'Sources',
  entity: 'People, organisations and other records',
};
const countLabels: Record<SearchRecordType, [string, string]> = {
  claim: ['claim', 'claims'],
  passage: ['evidence passage', 'evidence passages'],
  source: ['source', 'sources'],
  entity: [
    'person, organisation or other record',
    'people, organisations or other records',
  ],
};
const fieldLabels: Record<SearchField, string> = {
  statement: 'Statement',
  qualification: 'Qualification',
  passage: 'Passage',
  locator: 'Locator',
  title: 'Title',
  name: 'Name',
  shortName: 'Short name',
  alias: 'Also known as',
  id: 'Record ID',
};
const examples = ['whistleblower', 'ASL-3', 'Responsible Scaling Officer'];
/** Results shown per group before “Show all”. */
const pageSize = 20;

const count = (n: number, type: SearchRecordType) =>
  `${n} ${countLabels[type][n === 1 ? 0 : 1]}`;
const clip = (text: string, length = 240) =>
  text.length <= length
    ? text
    : text.slice(0, text.lastIndexOf(' ', length)).replace(/[,;:]$/, '') + '…';
const listSentence = (items: string[]) =>
  items.length < 2
    ? items.join('')
    : `${items.slice(0, -1).join(', ')} and ${items.at(-1)}`;

function Snippet({ segments }: { segments: Highlight[] }) {
  return (
    <>
      {segments.map((s, i) =>
        s.match ? (
          <mark key={i}>{s.text}</mark>
        ) : (
          <Fragment key={i}>{s.text}</Fragment>
        ),
      )}
    </>
  );
}

type Props = {
  /** Facets and results: the static index in the browser (search-source.ts). */
  source: SearchSource;
  query: string;
  onQuery: (query: string) => void;
  mode: SearchMode;
  onMode: (mode: SearchMode) => void;
  selectedClaimId: string | null;
  onClaim: (id: string) => void;
  /** Opens a record in the explorer, or an organisation's dossier. */
  onEntity: (id: string) => void;
  /** Opens a person or document page. */
  onPage: (id: string) => void;
  /** Opens a reading page, such as a hub or a collection, by its address. */
  onPagePath: (path: string) => void;
  /** The switch between the list, timeline and map of the results. */
  views?: ReactNode;
};

export function Search({
  source,
  query,
  onQuery,
  mode,
  onMode,
  selectedClaimId,
  onClaim,
  onEntity,
  onPage,
  onPagePath,
  views,
}: Props) {
  const facets = use(source.facets() as Promise<SearchFacets>);
  const pageIndex = useMemo(() => createPageIndex(facets.pages), [facets]);
  const collections = facets.collections;
  /** Document names shared by more than one document record. */
  const sharedNames = useMemo(() => new Set(facets.sharedNames), [facets]);
  const { organisations, years } = facets;
  const [type, setType] = useState<SearchRecordType | ''>('');
  const [collectionId, setCollectionId] = useState('');
  const [organisationId, setOrganisationId] = useState('');
  const [fromYear, setFromYear] = useState('');
  const [untilYear, setUntilYear] = useState('');
  const [expanded, setExpanded] = useState<SearchRecordType[]>([]);
  const [wholeWords, setWholeWords] = useState(false);
  const [order, setOrder] = useState<'match' | 'date'>('match');
  // Filters start open on wide screens and folded on phones, until the
  // reader opens or folds them. The built page shows them open.
  const wide = useMediaQuery('(min-width: 721px)', true);
  // Controls in a built page answer once the page runs in the browser.
  const live = useInBrowser();
  const [filtersToggled, setFiltersToggled] = useState<boolean | null>(null);
  const filtersOpen = filtersToggled ?? wide;
  const filtered =
    mode === 'all' &&
    !!(type || collectionId || organisationId || fromYear || untilYear);
  // A new query or filter is looked up while the results in view stay; the
  // index loads only the files it needs (src/domain/search-index.ts).
  const request = useMemo(
    () => ({
      query,
      filters:
        mode === 'names'
          ? { mode, wholeWords, order }
          : {
              wholeWords,
              order,
              types: type ? [type] : undefined,
              collectionId: collectionId || null,
              organisationId: organisationId || null,
              fromYear: fromYear ? Number(fromYear) : null,
              untilYear: untilYear ? Number(untilYear) : null,
            },
    }),
    [
      query,
      mode,
      type,
      collectionId,
      organisationId,
      fromYear,
      untilYear,
      wholeWords,
      order,
    ],
  );
  const deferred = useDeferredValue(request);
  const deferredQuery = deferred.query;
  const searching = deferred !== request;
  const { results, repository, memberOf, failed } = use(
    source.search(deferred) as Promise<SearchOutcome>,
  );
  /** The collections a claim in the results appears in, by title. */
  const collectionsOf = (claimId: string) =>
    (memberOf.get(claimId) ?? []).map((i) => collections[i].title);
  const data = repository.data;
  /** The page of a record in the results, as the search page links it. */
  const recordHref = (id: string) =>
    recordPath(repository.entities.get(id), false);
  /**
   * The publisher of the document a claim is about, so that two frameworks of
   * the same name (Microsoft's and OpenAI's) can be told apart.
   */
  const publisherOf = (claimId: string) => {
    const subject = repository.entities.get(
      repository.claims.get(claimId)!.subject,
    );
    const publisherId = subject?.documentVersion?.publisherId;
    return publisherId ? repository.entities.get(publisherId)?.name : undefined;
  };
  // Pages are listed with every record, not with names only or filters.
  const pages = useMemo(
    () =>
      mode === 'all' && !filtered
        ? searchPages(pageIndex, deferredQuery, { wholeWords })
        : [],
    [pageIndex, deferredQuery, mode, filtered, wholeWords],
  );
  const resultsRef = useRef<HTMLDivElement>(null);
  const resetFilters = () => {
    setType('');
    setCollectionId('');
    setOrganisationId('');
    setFromYear('');
    setUntilYear('');
  };
  const changeQuery = (text: string) => {
    setExpanded([]);
    onQuery(text);
  };
  const shown = query.trim();
  const pageCount = pages.length
    ? `${pages.length} ${pages.length === 1 ? 'page' : 'pages'}`
    : '';
  const recordCount = `${results.total} ${results.total === 1 ? 'record' : 'records'}`;
  const matchVerb = pages.length + results.total === 1 ? 'matches' : 'match';
  const status = !shown
    ? null
    : searching
      ? 'Searching…'
      : failed
        ? 'Search could not load its index. Check the connection and search again, or reload the page.'
        : !results.terms.length
          ? 'Enter a word, name or phrase.'
          : results.total && mode === 'names'
            ? `${results.total} ${results.total === 1 ? 'record matches' : 'records match'} “${shown}” by name or alias.`
            : results.total
              ? `${pageCount ? `${pageCount} and ` : ''}${recordCount} ${matchVerb} “${shown}”${filtered ? ' with these filters' : ''}: ${listSentence(results.groups.map((g) => count(g.hits.length, g.type)))}.`
              : mode === 'names'
                ? `No name or alias matches “${shown}”.`
                : pageCount
                  ? `${pageCount} ${matchVerb} “${shown}”. No claim statement or qualification, evidence passage or locator, source title, name, alias or record ID matches it.`
                  : `No claim statement or qualification, evidence passage or locator, source title, name, alias or record ID matches “${shown}”${filtered ? ' with these filters' : ''}.`;

  const sourceLine = (hit: SearchHit) => {
    const [first, ...rest] = hit.sourceIds.map((id) =>
      repository.sources.get(id)!,
    );
    if (!first) return null;
    return (
      <span className="search-hit-source">
        {hit.type === 'passage' ? 'Source' : rest.length ? 'Sources' : 'Source'}
        : {first.title}
        {rest.length
          ? ` and ${rest.length} other${rest.length === 1 ? '' : 's'}`
          : ''}
        {hit.type === 'passage' &&
          ` · ${repository.evidence.get(hit.id)!.locator}`}
      </span>
    );
  };
  const context = (hit: SearchHit, main: SearchField[], text: string) =>
    main.includes(hit.field) ? (
      <span className="search-hit-text">
        <Snippet segments={hit.snippet} />
      </span>
    ) : (
      <>
        <span className="search-hit-text">{clip(text)}</span>
        <span className="search-hit-context">
          <span className="search-field">{fieldLabels[hit.field]}:</span>{' '}
          <Snippet segments={hit.snippet} />
        </span>
      </>
    );

  const renderHit = (hit: SearchHit) => {
    if (hit.type === 'claim' || hit.type === 'passage') {
      const claim = repository.claims.get(hit.claimId!)!;
      const evidence =
        hit.type === 'passage' ? repository.evidence.get(hit.id)! : null;
      const selected = selectedClaimId === claim.id;
      return (
        <ClaimLink
          className={`search-hit${selected ? ' is-selected' : ''}`}
          claimId={claim.id}
          onOpen={() => onClaim(claim.id)}
          pressed={selected}
        >
          <span className="search-hit-meta">
            {publisherOf(claim.id) && `${publisherOf(claim.id)} · `}
            {hit.date} · {derivationLabels[claim.derivation]} ·{' '}
            {resolutionLabels[claim.resolution]}
            {evidence && ` · ${supportLabels[evidence.support]}`}
          </span>
          {evidence
            ? context(
                hit,
                ['passage'],
                evidence.passageType === 'quote'
                  ? quoted(evidence.passage)
                  : evidence.passage,
              )
            : context(hit, ['statement'], claim.statement)}
          {evidence?.contextOnly && (
            <span className="search-hit-claim">
              Shown only with its context: {evidence.contextOnly.requires}
            </span>
          )}
          {evidence && (
            <span className="search-hit-claim">
              Claim: {clip(claim.statement, 160)}
            </span>
          )}
          {sourceLine(hit)}
          {collectionsOf(claim.id).length > 0 && (
            <span className="search-hit-collection">
              In {collectionsOf(claim.id).join(' · ')}
            </span>
          )}
          <span className="search-hit-open">Inspect evidence ↗</span>
        </ClaimLink>
      );
    }
    if (hit.type === 'source') {
      const source = repository.sources.get(hit.id)!;
      const citing = [
        ...new Set(
          data.evidence
            .filter((e) => e.sourceId === source.id)
            .map((e) => e.claimId),
        ),
      ];
      return (
        <div className="search-hit search-hit-static">
          <span className="search-hit-meta">
            {source.publicationDate ?? 'Publication date unknown'} ·{' '}
            {source.publisher}
          </span>
          {context(hit, ['title'], source.title)}
          <span className="search-hit-actions">
            <a href={source.canonicalUrl} target="_blank" rel="noreferrer">
              Open the source ↗
            </a>
            <ArchiveLink source={source} />
          </span>
          {citing.length > 0 && (
            <details className="search-citing">
              <summary>
                {citing.length === 1
                  ? 'One claim cites this source'
                  : `${citing.length} claims cite this source`}
              </summary>
              <ul>
                {citing.map((id) => (
                  <li key={id}>
                    <button
                      className="text-button"
                      onClick={() => onClaim(id)}
                      aria-pressed={selectedClaimId === id}
                    >
                      {clip(repository.claims.get(id)!.statement, 160)}
                    </button>
                  </li>
                ))}
              </ul>
            </details>
          )}
        </div>
      );
    }
    const entity = repository.entities.get(hit.id)!;
    return (
      <div className="search-hit search-hit-static">
        <span className="search-hit-meta">
          {entityStyle[entity.type].label} · {entity.subtype}
          {sharedNames.has(entity.name) &&
            ` · ${
              (entity.documentVersion &&
                repository.entities.get(entity.documentVersion.publisherId)
                  ?.name) ??
              entity.shortName ??
              entity.id
            }`}
        </span>
        {context(hit, ['name'], entity.name)}
        <span className="search-hit-actions">
          {(entity.type === 'person' || entity.type === 'document') && (
            <RecordLink
              className="text-button"
              id={entity.id}
              onOpen={() => onPage(entity.id)}
              aria-label={`${entity.name}: ${entity.type} page`}
            >
              {entity.type === 'person' ? 'Person page' : 'Document page'} →
            </RecordLink>
          )}
          {entity.type === 'organisation' ? (
            // An organisation opens its dossier, which has an address.
            <RecordLink
              className="text-button"
              id={entity.id}
              onOpen={() => onEntity(entity.id)}
              aria-label={`${entity.name}: explore its records`}
            >
              Open in the explorer or dossier →
            </RecordLink>
          ) : (
            <button
              className="text-button"
              onClick={() => onEntity(entity.id)}
              aria-label={`${entity.name}: explore its records`}
            >
              Explore its records →
            </button>
          )}
        </span>
      </div>
    );
  };

  return (
    <article className="search-page" aria-label="Search the records">
      <header className="doc-lede">
        <span className="eyebrow">Search</span>
        <h1>Search the records</h1>
        <p className="doc-intro">
          {mode === 'names'
            ? 'Looks up people, organisations, documents and other records by name or alias.'
            : 'Searches claim statements and qualifications, evidence passages and their locators, source titles, and the names and aliases of people, organisations and other records. Record IDs are searched too. Reading pages whose title, question or summary match are listed first.'}
        </p>
      </header>
      <form
        className="search-form"
        role="search"
        aria-label="Records"
        onSubmit={(event) => {
          event.preventDefault();
          resultsRef.current
            ?.querySelector<HTMLElement>(
              '.search-hit button, a.search-hit, button.search-hit',
            )
            ?.focus();
        }}
      >
        <label className="eyebrow" htmlFor="record-search">
          Search terms
        </label>
        <div className="search-box">
          <span aria-hidden="true">⌕</span>
          <input
            id="record-search"
            readOnly={!live}
            type="search"
            value={query}
            onChange={(e) => changeQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Escape') changeQuery('');
            }}
            placeholder={
              mode === 'names'
                ? 'Name or alias…'
                : 'Word, name, phrase or record ID…'
            }
            autoComplete="off"
            // Opening the search page starts in the search field.
            autoFocus
            aria-describedby="search-status search-help"
          />
        </div>
        <p className="small-note search-help" id="search-help">
          {wholeWords
            ? 'Each term matches whole words only.'
            : 'A term matches the beginning of a word, so “critic” also finds “criticality”.'}{' '}
          {order === 'date'
            ? 'Results are in date order, undated records last. Evidence passages hold the sources’ own words; a claim can match on Selekoa’s wording alone. The earliest result is the earliest in these records, not a first use.'
            : 'Closer matches come first, then dated records in date order.'}
        </p>
        <fieldset className="search-mode">
          <legend className="visually-hidden">Search in</legend>
          {(
            [
              ['all', 'All records'],
              ['names', 'Names and aliases only'],
            ] as const
          ).map(([value, label]) => (
            <label key={value}>
              <input
                type="radio"
                disabled={!live}
                name="search-mode"
                value={value}
                checked={mode === value}
                onChange={() => {
                  setExpanded([]);
                  onMode(value);
                }}
              />{' '}
              {label}
            </label>
          ))}
          <label className="search-whole">
            <input
              type="checkbox"
              disabled={!live}
              checked={wholeWords}
              onChange={(e) => {
                setExpanded([]);
                setWholeWords(e.target.checked);
              }}
            />{' '}
            Whole words only
          </label>
          <label className="search-order">
            Order{' '}
            <select
              disabled={!live}
              aria-label="Order"
              value={order}
              onChange={(e) => {
                setExpanded([]);
                setOrder(e.target.value as 'match' | 'date');
              }}
            >
              <option value="match">Closest matches first</option>
              <option value="date">Earliest first</option>
            </select>
          </label>
        </fieldset>
        {mode === 'all' && (
          <details
            className="search-filter-panel"
            open={filtersOpen}
            onToggle={(e) => setFiltersToggled(e.currentTarget.open)}
          >
            <summary>
              Filters
              {filtered && <span className="search-count"> · in use</span>}
            </summary>
            <div className="filters search-filters">
              <label>
                Record type{' '}
                <select
                  disabled={!live}
                  aria-label="Record type"
                  value={type}
                  onChange={(e) =>
                    setType(e.target.value as SearchRecordType | '')
                  }
                >
                  <option value="">All types</option>
                  {(Object.keys(groupLabels) as SearchRecordType[]).map((t) => (
                    <option key={t} value={t}>
                      {groupLabels[t]}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                Collection{' '}
                <select
                  disabled={!live}
                  aria-label="Collection"
                  value={collectionId}
                  onChange={(e) => setCollectionId(e.target.value)}
                >
                  <option value="">All records</option>
                  {collections.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.label}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                Organisation{' '}
                <select
                  disabled={!live}
                  aria-label="Organisation"
                  value={organisationId}
                  onChange={(e) => setOrganisationId(e.target.value)}
                  aria-describedby="search-organisation-note"
                >
                  <option value="">Any</option>
                  {organisations.map((o) => (
                    <option key={o.id} value={o.id}>
                      {o.name}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                From{' '}
                <select
                  disabled={!live}
                  value={fromYear}
                  onChange={(e) => setFromYear(e.target.value)}
                  aria-label="From year"
                >
                  <option value="">Any year</option>
                  {years.map((y) => (
                    <option key={y} value={y}>
                      {y}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                To{' '}
                <select
                  disabled={!live}
                  value={untilYear}
                  onChange={(e) => setUntilYear(e.target.value)}
                  aria-label="To year"
                >
                  <option value="">Any year</option>
                  {years.map((y) => (
                    <option key={y} value={y}>
                      {y}
                    </option>
                  ))}
                </select>
              </label>
              {filtered && (
                <button
                  type="button"
                  className="text-button reset-filters"
                  onClick={resetFilters}
                >
                  Reset filters
                </button>
              )}
              <p className="small-note" id="search-organisation-note">
                An organisation keeps the claims that name it or a document
                version it published, with their passages and sources, the
                sources it published and the records those claims name. It
                implies no affiliation. A year range uses each claim’s dates and
                each source’s publication date, and leaves out undated records.
              </p>
            </div>
          </details>
        )}
      </form>
      <p className="search-status" id="search-status" role="status">
        {status}
      </p>
      {views}
      {shown && results.total + pages.length > 0 && (
        <CopyLink
          target={{
            kind: 'search',
            q: shown,
            mode: mode === 'names' ? 'names' : undefined,
          }}
          label="Copy link to this search"
        />
      )}
      {!shown && (
        <p className="search-examples">
          Examples:{' '}
          {examples.map((example, i) => (
            <Fragment key={example}>
              {i > 0 && ' · '}
              <button
                type="button"
                className="text-button"
                onClick={() => changeQuery(example)}
              >
                {example}
              </button>
            </Fragment>
          ))}
        </p>
      )}
      {/* Record links read the records the results came with. */}
      <RecordHref.Provider value={recordHref}>
        <div className="search-page-results" ref={resultsRef}>
          {pages.length > 0 && (
            <section
              className="search-group search-pages"
              aria-labelledby="search-group-pages"
            >
              <h2 id="search-group-pages">
                Pages <span className="search-count">{pages.length}</span>
              </h2>
              <ol>
                {pages.map((hit) => (
                  <li key={hit.page.path}>
                    <NavLink
                      className="search-hit"
                      href={hit.page.path}
                      onOpen={() => onPagePath(hit.page.path)}
                    >
                      <span className="search-hit-meta">{hit.page.kind}</span>
                      <span className="search-hit-title">
                        {hit.field === 'title' ? (
                          <Snippet segments={hit.snippet} />
                        ) : (
                          hit.page.title
                        )}
                      </span>
                      {hit.field !== 'title' ? (
                        <span className="search-hit-text">
                          <Snippet segments={hit.snippet} />
                        </span>
                      ) : (
                        hit.page.question && (
                          <span className="search-hit-text">
                            {clip(hit.page.question)}
                          </span>
                        )
                      )}
                      <span className="search-hit-open">Open the page →</span>
                    </NavLink>
                  </li>
                ))}
              </ol>
            </section>
          )}
          {results.groups.map((group) => {
            const all = expanded.includes(group.type);
            const hits = all ? group.hits : group.hits.slice(0, pageSize);
            return (
              <section
                key={group.type}
                className="search-group"
                aria-labelledby={`search-group-${group.type}`}
              >
                <h2 id={`search-group-${group.type}`}>
                  {groupLabels[group.type]}{' '}
                  <span className="search-count">{group.hits.length}</span>
                </h2>
                <ol>
                  {hits.map((hit) => (
                    <li key={hit.id}>{renderHit(hit)}</li>
                  ))}
                </ol>
                {group.hits.length > hits.length && (
                  <button
                    type="button"
                    className="text-button search-more"
                    onClick={() => {
                      setExpanded([...expanded, group.type]);
                      // Keep the reader's place: focus the first added result.
                      requestAnimationFrame(() =>
                        document
                          .querySelector<HTMLElement>(
                            `#search-group-${group.type} + ol > li:nth-child(${pageSize + 1}) :is(button, a)`,
                          )
                          ?.focus(),
                      );
                    }}
                  >
                    Show all {count(group.hits.length, group.type)}
                  </button>
                )}
              </section>
            );
          })}
        </div>
      </RecordHref.Provider>
    </article>
  );
}
