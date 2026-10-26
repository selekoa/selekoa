import {
  Fragment,
  useDeferredValue,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import type { Repository } from '../domain/repository';
import {
  searchOrganisations,
  searchRecords,
  searchYears,
  type Highlight,
  type SearchField,
  type SearchHit,
  type SearchIndex,
  type SearchMode,
  type SearchRecordType,
} from '../domain/search';
import {
  derivationLabels,
  resolutionLabels,
  supportLabels,
} from '../domain/epistemics';
import {
  applicationCollections,
  collectionClaimIds,
  type CollectionKind,
} from '../release/collections';
import { entityStyle } from './entityStyle';
import { CopyLink } from './ReferenceActions';
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
const collectionKinds: Record<CollectionKind, string> = {
  documents: 'Document history',
  commitments: 'Commitments',
  control: 'Control structure',
  question: 'Guided reading',
  propositions: 'Propositions',
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
  repository: Repository;
  index: SearchIndex;
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
  /** The switch between the list, timeline and map of the results. */
  views?: ReactNode;
};

export function Search({
  repository,
  index,
  query,
  onQuery,
  mode,
  onMode,
  selectedClaimId,
  onClaim,
  onEntity,
  onPage,
  views,
}: Props) {
  const data = repository.data;
  const collections = useMemo(
    () =>
      [...applicationCollections]
        .sort(
          (a, b) =>
            Object.keys(collectionKinds).indexOf(a.kind) -
            Object.keys(collectionKinds).indexOf(b.kind),
        )
        .map((c) => {
          const title = String(c.definition.title);
          const institution =
            typeof c.definition.institutionId === 'string'
              ? repository.entities.get(c.definition.institutionId)?.name
              : undefined;
          const named = institution
            ? `${institution}, ${title.toLowerCase()}`
            : title;
          return {
            id: `${c.kind}:${c.definition.id}`,
            label: `${collectionKinds[c.kind]}: ${named}`,
            title: named,
            claimIds: new Set(collectionClaimIds(data, c)),
          };
        }),
    [data, repository],
  );
  /** The collections each claim appears in, by title. */
  const collectionsOf = useMemo(() => {
    const titles = new Map<string, string[]>();
    for (const c of collections)
      for (const id of c.claimIds)
        titles.set(id, [...(titles.get(id) ?? []), c.title]);
    return titles;
  }, [collections]);
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
  /** Document names shared by more than one document record. */
  const sharedNames = useMemo(() => {
    const seen = new Map<string, number>();
    for (const e of data.entities)
      if (e.type === 'document') seen.set(e.name, (seen.get(e.name) ?? 0) + 1);
    return new Set([...seen].filter(([, n]) => n > 1).map(([name]) => name));
  }, [data]);
  const organisations = useMemo(() => searchOrganisations(data), [data]);
  const years = useMemo(() => searchYears(data), [data]);
  const [type, setType] = useState<SearchRecordType | ''>('');
  const [collectionId, setCollectionId] = useState('');
  const [organisationId, setOrganisationId] = useState('');
  const [fromYear, setFromYear] = useState('');
  const [untilYear, setUntilYear] = useState('');
  const [expanded, setExpanded] = useState<SearchRecordType[]>([]);
  const [wholeWords, setWholeWords] = useState(false);
  // Filters start open on wide screens and folded on phones.
  const [filtersOpen, setFiltersOpen] = useState(
    () => window.matchMedia?.('(min-width: 721px)').matches ?? true,
  );
  const filtered =
    mode === 'all' &&
    !!(type || collectionId || organisationId || fromYear || untilYear);
  const deferredQuery = useDeferredValue(query);
  const results = useMemo(
    () =>
      searchRecords(
        index,
        deferredQuery,
        mode === 'names'
          ? { mode, wholeWords }
          : {
              wholeWords,
              types: type ? [type] : undefined,
              collection: collections.find((c) => c.id === collectionId)
                ?.claimIds,
              organisationId: organisationId || null,
              fromYear: fromYear ? Number(fromYear) : null,
              untilYear: untilYear ? Number(untilYear) : null,
            },
      ),
    [
      index,
      deferredQuery,
      mode,
      type,
      collections,
      collectionId,
      organisationId,
      fromYear,
      untilYear,
      wholeWords,
    ],
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
  const status = !shown
    ? null
    : !results.terms.length
      ? 'Enter a word, name or phrase.'
      : results.total && mode === 'names'
        ? `${results.total} ${results.total === 1 ? 'record matches' : 'records match'} “${shown}” by name or alias.`
        : results.total
          ? `${results.total} ${results.total === 1 ? 'record matches' : 'records match'} “${shown}”${filtered ? ' with these filters' : ''}: ${listSentence(results.groups.map((g) => count(g.hits.length, g.type)))}.`
          : mode === 'names'
            ? `No name or alias matches “${shown}”.`
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
        <button
          className={`search-hit${selected ? ' is-selected' : ''}`}
          onClick={() => onClaim(claim.id)}
          aria-pressed={selected}
          data-claim-id={claim.id}
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
          {collectionsOf.has(claim.id) && (
            <span className="search-hit-collection">
              In {collectionsOf.get(claim.id)!.join(' · ')}
            </span>
          )}
          <span className="search-hit-open">Inspect evidence ↗</span>
        </button>
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
            <button
              className="text-button"
              onClick={() => onPage(entity.id)}
              aria-label={`${entity.name}: ${entity.type} page`}
            >
              {entity.type === 'person' ? 'Person page' : 'Document page'} →
            </button>
          )}
          <button
            className="text-button"
            onClick={() => onEntity(entity.id)}
            aria-label={`${entity.name}: explore its records`}
          >
            {entity.type === 'organisation'
              ? 'Open in the explorer or dossier →'
              : 'Explore its records →'}
          </button>
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
            : 'Searches claim statements and qualifications, evidence passages and their locators, source titles, and the names and aliases of people, organisations and other records. Record IDs are searched too.'}
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
              '.search-hit button, button.search-hit',
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
            : 'A term matches the beginning of a word, so “critic” also finds “criticality”.'}
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
              checked={wholeWords}
              onChange={(e) => {
                setExpanded([]);
                setWholeWords(e.target.checked);
              }}
            />{' '}
            Whole words only
          </label>
        </fieldset>
        {mode === 'all' && (
          <details
            className="search-filter-panel"
            open={filtersOpen}
            onToggle={(e) => setFiltersOpen(e.currentTarget.open)}
          >
            <summary>
              Filters
              {filtered && <span className="search-count"> · in use</span>}
            </summary>
            <div className="filters search-filters">
              <label>
                Record type{' '}
                <select
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
      {shown && results.total > 0 && (
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
      <div className="search-page-results" ref={resultsRef}>
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
    </article>
  );
}
