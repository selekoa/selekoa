import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { Repository } from '../domain/repository';
import type { LandingSummary } from '../domain/landing';
import { listedPerson } from '../domain/people-index';
import {
  authorFor,
  dateLine,
  propositionStances,
  stanceLine,
  type PropositionStances as Stances,
  type StanceRow,
} from '../domain/proposition-stances';
import { propositionFrames } from '../reading/proposition-frames';
import {
  stancesCsvPath,
  stancesQuestion,
  stancesTitle,
} from '../reading/proposition-stances-page';
import { useHeldRecords } from './records';
import { ClaimLink, NavLink, RecordLink, SectionLink } from './NavLink';
import { startHref, type StartAction } from './SiteChrome';
import { startIds } from './start-ids';
import { CopyLink } from './ReferenceActions';
import './reading-first.css';
import './control-commitments.css';
import './propositions.css';
import './stances.css';

type Props = {
  /** The collection shown; null for the index of the collections. */
  collectionId: string | null;
  /** The start page's summary: the collections and the people listed. */
  summary: LandingSummary;
  repository: Repository;
  selectedClaimId: string | null;
  onClaim: (id: string) => void;
  onEntity: (id: string) => void;
  onAction: (action: StartAction) => void;
  /** Byline keys, joined by "|": the view opens at the first that matches. */
  focus?: string | null;
  onFocused?: () => void;
};

type Mode = 'proposition' | 'author';

/** An address's fragment, decoded; empty if it cannot be decoded. */
function fragment(hash: string) {
  try {
    return decodeURIComponent(hash.slice(1));
  } catch {
    return '';
  }
}

const bylineText = (r: StanceRow) =>
  r.bylines.length ? r.bylines.join('; ') : 'Byline not recorded';

function Row({
  row,
  heading,
  selectedClaimId,
  onClaim,
}: {
  row: StanceRow;
  /** What the row names besides its stance: the author or the proposition. */
  heading: string;
  selectedClaimId: string | null;
  onClaim: (id: string) => void;
}) {
  return (
    <li>
      <ClaimLink
        className="dossier-claim doc-claim stance-row"
        aria-label={`Inspect the record: ${stanceLine(row)} · ${heading} · ${row.text} · ${dateLine(row)}`}
        pressed={selectedClaimId === row.claimId}
        claimId={row.claimId}
        onOpen={() => onClaim(row.claimId)}
      >
        <span className="record-row-heading">
          <span className="control-kind">{stanceLine(row)}</span>
          <span className="control-route">{heading}</span>
        </span>
        <span className="stance-text">{row.text}</span>
        <span className="dossier-relation">{dateLine(row)}</span>
        <span className="dossier-evidence-link">Inspect the record ↗</span>
      </ClaimLink>
    </li>
  );
}

/** The first letter of a name, without marks, for the A–Z jumps. */
const initial = (name: string) =>
  name
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
    .charAt(0)
    .toLocaleUpperCase('en');

function ByProposition({
  view,
  ...props
}: {
  view: Stances;
  selectedClaimId: string | null;
  onClaim: (id: string) => void;
}) {
  return (
    <div className="stances-view" data-mode="proposition">
      {view.groups.map((g) => (
        <section key={g.id} aria-labelledby={`stances-group-${g.id}`}>
          <h2 id={`stances-group-${g.id}`}>
            {g.id} · {g.label}
          </h2>
          {g.propositions.map((p) => (
            <section
              key={p.id}
              className="stances-proposition"
              aria-labelledby={`stances-${p.id}`}
            >
              <h3 id={`stances-${p.id}`} tabIndex={-1}>
                {p.code} {p.name}
              </h3>
              {p.rows.length ? (
                <ol className="record-rows prop-rows stances-rows">
                  {p.rows.map((r) => (
                    <Row
                      key={r.claimId}
                      row={r}
                      heading={bylineText(r)}
                      {...props}
                    />
                  ))}
                </ol>
              ) : (
                <p className="small-note">
                  No text located for this proposition yet. A missing record is
                  a gap in coverage.
                </p>
              )}
            </section>
          ))}
        </section>
      ))}
    </div>
  );
}

function ByAuthor({
  view,
  onEntity,
  ...props
}: {
  view: Stances;
  selectedClaimId: string | null;
  onClaim: (id: string) => void;
  onEntity: (id: string) => void;
}) {
  const letters = [...new Set(view.authors.map((a) => initial(a.name)))];
  const firstOf = (letter: string) =>
    view.authors.find((a) => initial(a.name) === letter)!.anchor;
  const heading = (r: StanceRow) => `${r.code} ${r.proposition}`;
  return (
    <div className="stances-view" data-mode="author">
      <nav className="stances-letters" aria-label="Authors A–Z">
        <ul>
          {letters.map((l) => (
            <li key={l}>
              <SectionLink id={firstOf(l)} className="text-button">
                {l}
              </SectionLink>
            </li>
          ))}
          {view.unattributed.length > 0 && (
            <li>
              <SectionLink id="stances-no-byline" className="text-button">
                No byline
              </SectionLink>
            </li>
          )}
        </ul>
      </nav>
      {view.authors.map((a) => (
        <section
          key={a.key}
          className="stances-author"
          aria-labelledby={a.anchor}
        >
          <h3 id={a.anchor} tabIndex={-1}>
            {a.name}
          </h3>
          {(a.alsoPrinted.length > 0 || a.personId) && (
            <p className="small-note">
              {a.alsoPrinted.length > 0 &&
                `Also printed as ${a.alsoPrinted.join('; ')}. `}
              {a.personId && (
                <RecordLink
                  className="text-button"
                  id={a.personId}
                  onOpen={() => onEntity(a.personId!)}
                >
                  Person page →
                </RecordLink>
              )}
            </p>
          )}
          <ol className="record-rows prop-rows stances-rows">
            {a.rows.map((r) => (
              <Row key={r.claimId} row={r} heading={heading(r)} {...props} />
            ))}
          </ol>
        </section>
      ))}
      {view.unattributed.length > 0 && (
        <section className="stances-author" aria-labelledby="stances-no-byline">
          <h3 id="stances-no-byline" tabIndex={-1}>
            Texts without a recorded byline
          </h3>
          <p className="small-note">
            Only a source about these texts is recorded, and its authors are not
            the texts’ authors. The titles name the speakers as recorded.
          </p>
          <ol className="record-rows prop-rows stances-rows">
            {view.unattributed.map((r) => (
              <Row key={r.claimId} row={r} heading={heading(r)} {...props} />
            ))}
          </ol>
        </section>
      )}
    </div>
  );
}

/** The index: one entry per propositions collection. */
function StancesIndex({
  summary,
  onAction,
}: {
  summary: LandingSummary;
  onAction: (action: StartAction) => void;
}) {
  return (
    <article className="doc-history stances-page" aria-label={stancesTitle}>
      <header className="doc-lede">
        <span className="eyebrow">Tool · propositions</span>
        <h1>{stancesTitle}</h1>
        <p className="landing-deck">{stancesQuestion}</p>
        <p className="doc-intro">
          Each collection lists its propositions with the texts that articulate,
          contest or bear on them, in date order, and lists the same texts by
          the authors their bylines name. A stance belongs to a text: a later
          text by the same author can take another.
        </p>
      </header>
      <ul className="stances-index">
        {summary.propositions.map((p) => (
          <li key={p.id}>
            <NavLink
              className="text-button"
              href={startHref({ kind: 'stances', id: p.id }, startIds)}
              onOpen={() => onAction({ kind: 'stances', id: p.id })}
            >
              {p.title} →
            </NavLink>
            <span className="small-note">
              {p.propositions} propositions · {p.records} records · {p.texts}{' '}
              texts
            </span>
          </li>
        ))}
      </ul>
    </article>
  );
}

export function PropositionStances({
  collectionId,
  summary,
  repository,
  selectedClaimId,
  onClaim,
  onEntity,
  onAction,
  focus,
  onFocused,
}: Props) {
  const frame = collectionId
    ? (propositionFrames.find((c) => c.id === collectionId) ?? null)
    : null;
  if (!frame) return <StancesIndex summary={summary} onAction={onAction} />;
  return (
    <CollectionStances
      frame={frame}
      summary={summary}
      repository={repository}
      selectedClaimId={selectedClaimId}
      onClaim={onClaim}
      onEntity={onEntity}
      onAction={onAction}
      focus={focus}
      onFocused={onFocused}
    />
  );
}

function CollectionStances({
  frame,
  summary,
  selectedClaimId,
  onClaim,
  onEntity,
  onAction,
  focus,
  onFocused,
}: Omit<Props, 'collectionId'> & {
  frame: (typeof propositionFrames)[number];
}) {
  const records = useHeldRecords();
  const view = useMemo(
    () =>
      propositionStances(
        records.data,
        frame,
        // The people with person pages, as every page holds them.
        summary.people.flatMap((g) => g.people.map(listedPerson)),
      ),
    [records, frame, summary],
  );
  const [mode, setMode] = useState<Mode>('proposition');
  /** An author's section to move to once the author view has rendered. */
  const jumpTo = useRef<string | null>(null);
  /** Counts requests to show the author view, so each one moves focus. */
  const [shown, setShown] = useState(0);
  const showAuthors = useCallback((anchor: string | null) => {
    jumpTo.current = anchor;
    setMode('author');
    setShown((n) => n + 1);
  }, []);
  // From a person page: the author view, at the first matching byline.
  useEffect(() => {
    if (!focus) return;
    const keys = focus.split('|');
    requestAnimationFrame(() => {
      showAuthors(authorFor(view, keys)?.anchor ?? null);
      onFocused?.();
    });
  }, [focus, view, onFocused, showAuthors]);
  // An address with an author's fragment opens the author view there:
  // `#author-<name>`, or `#authors=<keys>` from a person page's link. Only
  // the address the page opened at counts.
  const opened = useRef(
    typeof window === 'undefined' ? '' : fragment(window.location.hash),
  );
  useEffect(() => {
    const hash = opened.current;
    opened.current = '';
    const anchor = hash.startsWith('authors=')
      ? (authorFor(view, hash.slice(8).split('|'))?.anchor ?? null)
      : hash.startsWith('author-') || hash === 'stances-no-byline'
        ? hash
        : undefined;
    if (anchor !== undefined) requestAnimationFrame(() => showAuthors(anchor));
  }, [view, showAuthors]);
  useEffect(() => {
    if (mode !== 'author' || !jumpTo.current) return;
    const target = document.getElementById(jumpTo.current);
    jumpTo.current = null;
    target?.scrollIntoView({ block: 'start' });
    target?.focus({ preventScroll: true });
  }, [mode, shown]);
  const others = propositionFrames.filter((c) => c.id !== frame.id);
  const props = { selectedClaimId, onClaim };
  return (
    <article
      className="doc-history stances-page"
      aria-label={`${stancesTitle}: ${frame.title}`}
    >
      <header className="doc-lede">
        <span className="eyebrow">
          {stancesTitle} · {view.counts.propositions} propositions ·{' '}
          {view.counts.records} records · {view.counts.texts} texts
        </span>
        <h1>{frame.title}</h1>
        <p className="landing-deck">{frame.question}</p>
        <p className="doc-intro">
          Each row is one text’s stance on one proposition, as a stored record
          states it: articulates, contests or bears on. A stance belongs to the
          text, not to its author. Rows are in date order, which records no
          influence between texts. Authors appear as the texts’ own bylines
          print them, pseudonyms included. “Earliest located” marks only a text
          the collection’s records name as the earliest the searches found.
        </p>
        <div className="doc-actions">
          <a className="text-button" href={stancesCsvPath(frame.id)} download>
            Download the stances shown (CSV)
          </a>
          <CopyLink
            target={{ kind: 'stances', id: frame.id }}
            label="Copy link to this page"
          />
        </div>
        <p className="stances-related">
          <NavLink
            className="text-button"
            href={startHref({ kind: 'propositions', id: frame.id }, startIds)}
            onOpen={() => onAction({ kind: 'propositions', id: frame.id })}
          >
            Read the collection, with passages and headlines →
          </NavLink>
        </p>
      </header>
      <div className="stances-modes" role="group" aria-label="Read by">
        <button
          type="button"
          className="stances-mode"
          data-in-page=""
          aria-pressed={mode === 'proposition'}
          onClick={() => setMode('proposition')}
        >
          By proposition
        </button>
        <button
          type="button"
          className="stances-mode"
          data-in-page=""
          aria-pressed={mode === 'author'}
          onClick={() => setMode('author')}
        >
          By author
        </button>
      </div>
      {mode === 'proposition' ? (
        <ByProposition view={view} {...props} />
      ) : (
        <ByAuthor view={view} onEntity={onEntity} {...props} />
      )}
      <nav className="stances-others" aria-labelledby="stances-others-title">
        <h2 id="stances-others-title">Other collections</h2>
        <ul>
          {others.map((c) => (
            <li key={c.id}>
              <NavLink
                className="text-button"
                href={startHref({ kind: 'stances', id: c.id }, startIds)}
                onOpen={() => onAction({ kind: 'stances', id: c.id })}
              >
                {c.title} →
              </NavLink>
            </li>
          ))}
          <li>
            <NavLink
              className="text-button"
              href={startHref({ kind: 'stances' }, startIds)}
              onOpen={() => onAction({ kind: 'stances' })}
            >
              All collections →
            </NavLink>
          </li>
        </ul>
      </nav>
    </article>
  );
}
