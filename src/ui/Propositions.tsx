import { useEffect } from 'react';
import type { Repository } from '../domain/repository';
import { RecordLink } from './NavLink';
import {
  engagementLabels,
  laterContests,
  recordDates,
  registerLabels,
  roleLabels,
  stanceLabels,
  tierLabels,
  type PropositionEntry,
  type PropositionRecord,
  type PropositionsView,
} from '../domain/propositions';
import { CopyLink, ExportPropositionsStarter } from './ReferenceActions';
import { InspectLink, StatusBadge, type ClaimProps } from './ReadingRows';
import { ReviewMarkers } from './ReviewMarkers';
import './reading-first.css';
import './control-commitments.css';
import './propositions.css';

/** Whether a record's qualifier marks a model scenario (schema 2.13 collections). */
const isModelScenario = (r: PropositionRecord) =>
  !!r.qualifier?.startsWith('A model scenario');

/**
 * "Contests · Earliest located · Tier 1 · Engages a premise · Looking back ·
 * Fiction"; nonfiction is not labelled.
 */
function recordKind(r: PropositionRecord) {
  const roles = r.roles
    .filter((role) => !['articulation', 'contesting', 'context'].includes(role))
    .map((role) => roleLabels[role]);
  return [
    stanceLabels[r.stance],
    ...roles,
    ...(r.tier ? [tierLabels[r.tier.value]] : []),
    ...(isModelScenario(r) ? ['Model scenario'] : []),
    ...(r.engagement ? [engagementLabels[r.engagement.kind]] : []),
    ...(r.retrospective ? ['Looking back'] : []),
    ...(r.register === 'nonfiction' ? [] : [registerLabels[r.register]]),
  ].join(' · ');
}

function PropositionRow({
  record: r,
  later = [],
  onDocument,
  ...props
}: ClaimProps & {
  record: PropositionRecord;
  /** Later texts by the same author that contest the proposition. */
  later?: PropositionRecord[];
  onDocument: (id: string) => void;
}) {
  const { claim } = r;
  return (
    <li>
      <button
        className="dossier-claim doc-claim prop-row"
        data-claim-id={claim.id}
        aria-label={`Inspect claim & evidence: ${r.label}. ${claim.statement}`}
        aria-pressed={props.selectedClaimId === claim.id}
        onClick={() => props.onClaim(claim.id)}
      >
        <StatusBadge claim={claim} />
        <span className="record-row-heading">
          <span className="control-kind">{recordKind(r)}</span>
          <span className="control-route">{r.label}</span>
        </span>
        <span className="dossier-statement">{claim.statement}</span>
        {r.missing && (
          <span className="prop-missing">Missing: {r.missing}</span>
        )}
        {r.conditions && (
          <span className="prop-missing">Conditions: {r.conditions}</span>
        )}
        {r.estimates?.map((e) => (
          <span className="prop-missing" key={e.holder + e.value}>
            Estimate by {e.holder}: {e.value} · horizon: {e.horizon} ·
            definition: {e.definition}
            {e.conditional ? ' · conditional' : ''}
            {e.conditions ? ` · conditions: ${e.conditions}` : ''}
          </span>
        ))}
        <span className="dossier-relation">
          {recordDates(r)}{' '}
          <ReviewMarkers claim={claim} repository={props.repository} />
        </span>
        <span className="dossier-evidence-link">
          Inspect claim & evidence ↗
        </span>
      </button>
      {later.length > 0 && (
        <div className="prop-later">
          <span className="prop-later-label">
            Later texts by the same author that contest it
          </span>
          <ul>
            {later.map((l) => (
              <li key={l.claim.id}>
                <InspectLink
                  claim={l.claim}
                  label={`Inspect: ${l.claim.statement}`}
                  {...props}
                >
                  {l.label} · {recordDates(l)}
                </InspectLink>
              </li>
            ))}
          </ul>
        </div>
      )}
      <RecordLink
        className="text-button record-row-link"
        id={r.document.id}
        onOpen={() => onDocument(r.document.id)}
      >
        Document page →
      </RecordLink>
    </li>
  );
}

const defaultAxis = {
  from: 1860,
  to: 2025,
  ticks: ['1863', '1900', '1950', '2000', '2022'],
};

/**
 * Each record's date on the collection's axis (1860–2025 by default), with a
 * line to the date from which its wording is attested. The list below is the
 * accessible equivalent.
 */
function DateStrip({
  entry,
  axis = defaultAxis,
}: {
  entry: PropositionEntry;
  axis?: PropositionsView['collection']['axis'];
}) {
  const { from, to, ticks } = axis;
  const x = (date: string) =>
    ((Number(date.slice(0, 4)) - from) / (to - from)) * 600;
  const largest = (r: PropositionRecord) =>
    r === entry.earliest ||
    r === entry.earliestContest ||
    r === entry.earliestTier2 ||
    r === entry.earliestContestTier2;
  return (
    <figure className="prop-strip">
      <svg viewBox="0 0 600 44" role="presentation" aria-hidden="true">
        <line className="prop-axis" x1="0" x2="600" y1="18" y2="18" />
        {ticks.map((t) => (
          <g key={t}>
            <line className="prop-tick" x1={x(t)} x2={x(t)} y1="15" y2="21" />
            <text className="prop-tick-label" x={x(t)} y="38">
              {t}
            </text>
          </g>
        ))}
        {entry.records.map((r) => (
          <g
            key={r.claim.id}
            className={`prop-mark prop-mark-${r.stance}${largest(r) ? ' prop-mark-earliest' : ''}`}
          >
            {r.attested?.date && (
              <line
                className="prop-attested"
                x1={x(r.dated)}
                x2={x(r.attested.date)}
                y1="25"
                y2="25"
              />
            )}
            <circle
              cx={x(r.dated)}
              cy="18"
              r={largest(r) ? 6 : r.stance === 'bears_on' ? 2.5 : 4}
            />
          </g>
        ))}
      </svg>
      <figcaption className="small-note">
        Filled dots articulate, open dots contest, small dots bear on the
        proposition; a large dot is an earliest located text. A line below a dot
        runs to the date from which its wording is attested.
      </figcaption>
    </figure>
  );
}

function Headline({
  label,
  record,
  empty,
  ...props
}: ClaimProps & {
  label: string;
  record: PropositionRecord | null;
  empty: string;
}) {
  return (
    <div>
      <dt>{label}</dt>
      <dd>
        {record ? (
          <InspectLink
            claim={record.claim}
            label={`Inspect: ${record.claim.statement}`}
            {...props}
          >
            {record.label} · {recordDates(record)}
            {record.term ? ` · “${record.term}”` : ''}
          </InspectLink>
        ) : (
          empty
        )}
      </dd>
    </div>
  );
}

function PropositionSection({
  entry,
  collection,
  onDocument,
  ...props
}: ClaimProps & {
  entry: PropositionEntry;
  collection: PropositionsView['collection'];
  onDocument: (id: string) => void;
}) {
  const mostDevelopedEmpty =
    collection.mostDevelopedEmpty === undefined
      ? 'None named: this proposition was looked for only before mid-1996.'
      : collection.mostDevelopedEmpty;
  const { proposition, entity } = entry;
  const tiered = !!collection.tiers;
  const anchor = 'proposition-' + proposition.code.toLowerCase();
  return (
    <section
      id={anchor}
      className="prop-section"
      aria-labelledby={anchor + '-heading'}
    >
      <h3 id={anchor + '-heading'} tabIndex={-1}>
        <span className="prop-code">{proposition.code}</span> {entity.name}
      </h3>
      <p className="prop-criterion">
        <strong>Criterion.</strong> {proposition.criterion}
      </p>
      {proposition.terms.length > 0 && (
        <p className="small-note">
          Usual {proposition.terms.length === 1 ? 'name' : 'names'}:{' '}
          {proposition.terms.map((t) => `“${t}”`).join(', ')}
        </p>
      )}
      <dl className="prop-headlines">
        <Headline
          label={tiered ? 'Earliest located, tier 1' : 'Earliest located'}
          record={entry.earliest}
          empty={
            entry.earliestWithheld
              ? 'Not assigned. ' + entry.earliestWithheld
              : (collection.earliestEmpty ??
                'No located text meets the criterion.')
          }
          {...props}
        />
        {!entry.earliestTier2 && entry.earliestTier2Withheld && (
          <Headline
            label="Earliest located, tier 2"
            record={null}
            empty={'Not assigned. ' + entry.earliestTier2Withheld}
            {...props}
          />
        )}
        {entry.earliestTier2 && (
          <Headline
            label="Earliest located, tier 2"
            record={entry.earliestTier2}
            empty=""
            {...props}
          />
        )}
        {entry.earliestContest && (
          <Headline
            label={
              tiered
                ? 'Earliest located tier-1 text that contests it'
                : 'Earliest located text that contests it'
            }
            record={entry.earliestContest}
            empty=""
            {...props}
          />
        )}
        {entry.earliestContestTier2 && (
          <Headline
            label="Earliest located tier-2 text that contests it"
            record={entry.earliestContestTier2}
            empty=""
            {...props}
          />
        )}
        {proposition.terms.length > 0 && (
          <Headline
            label="Earliest located use of the name"
            record={entry.earliestTerm}
            empty="No located text uses the name."
            {...props}
          />
        )}
        {(entry.mostDeveloped || mostDevelopedEmpty !== null) && (
          <Headline
            label="Most developed"
            record={entry.mostDeveloped}
            empty={mostDevelopedEmpty ?? ''}
            {...props}
          />
        )}
      </dl>
      <DateStrip entry={entry} axis={collection.axis} />
      <h4>Texts that articulate or contest it ({entry.stated.length})</h4>
      <ol className="record-rows prop-rows">
        {entry.stated.map((r) => (
          <PropositionRow
            key={r.claim.id}
            record={r}
            later={laterContests(r, entry.records)}
            onDocument={onDocument}
            {...props}
          />
        ))}
      </ol>
      {entry.context.length > 0 && (
        <details className="prop-context">
          <summary>
            Texts that bear on it without meeting the criterion (
            {entry.context.length})
          </summary>
          <ol className="record-rows prop-rows">
            {entry.context.map((r) => (
              <PropositionRow
                key={r.claim.id}
                record={r}
                onDocument={onDocument}
                {...props}
              />
            ))}
          </ol>
        </details>
      )}
      {entry.openPremises.length > 0 && (
        <div className="prop-open">
          <h4>Not addressed by any located passage</h4>
          <ul>
            {entry.openPremises.map((o) => (
              <li key={o}>{o}</li>
            ))}
          </ul>
        </div>
      )}
      {entry.corrections.length > 0 && (
        <div className="prop-corrections">
          <h4>Headlines replaced</h4>
          <ul>
            {entry.corrections.map((c) => (
              <li key={c.replaced}>
                {c.replaced} {c.reason}{' '}
                <span className="small-note">Recorded {c.recordedAt}.</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}

function SearchNote({ view }: { view: PropositionsView }) {
  const note = view.collection.searchNote;
  return (
    <section className="prop-search" aria-labelledby="prop-search-title">
      <h2 id="prop-search-title">How we searched</h2>
      <p>{note.scope}</p>
      <details>
        <summary>Venues and years searched</summary>
        {note.venues.map((v) => (
          <div key={v.period}>
            <h3>{v.period}</h3>
            <ul>
              {v.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </details>
      <details>
        <summary>Methods</summary>
        <ul>
          {note.methods.map((m) => (
            <li key={m}>{m}</li>
          ))}
        </ul>
      </details>
      <h3>Known gaps</h3>
      <ul className="prop-gaps">
        {note.gaps.map((g) => (
          <li key={g}>{g}</li>
        ))}
      </ul>
      <p>{note.corrections}</p>
    </section>
  );
}

function ReadingKey({ view }: { view: PropositionsView }) {
  const records = view.groups.flatMap((g) =>
    g.propositions.flatMap((p) => p.records),
  );
  const engagement = records.some((r) => r.engagement);
  const retrospective = records.some((r) => r.retrospective);
  const restatement = records.some((r) =>
    r.roles.includes('later-restatement'),
  );
  const contextOnly = records.some((r) =>
    r.evidence.some((e) => e.contextOnly),
  );
  const earliestContest = records.some(
    (r) => r.stance === 'contests' && r.roles.includes('earliest-located'),
  );
  const mostDeveloped =
    view.collection.mostDevelopedEmpty !== null ||
    records.some((r) => r.roles.includes('most-developed'));
  const tiers = view.collection.tiers;
  const conditions = records.some((r) => r.conditions);
  const estimates = records.some((r) => r.estimates);
  const scenario = records.some(isModelScenario);
  return (
    <details className="doc-limits-box prop-key">
      <summary>How to read a record</summary>
      <dl>
        <dt>Articulates</dt>
        <dd>A passage meets the proposition’s criterion.</dd>
        <dt>Contests</dt>
        <dd>A passage disputes the proposition or a premise it depends on.</dd>
        <dt>Bears on</dt>
        <dd>
          A passage comes close without meeting the criterion; the record names
          what is missing.
        </dd>
        <dt>Earliest located</dt>
        <dd>
          The earliest articulation the searches found, dated by its wording. It
          is not a claim that no earlier text exists.
          {earliestContest &&
            ' The earliest located text that contests a proposition is chosen by the same rule.'}
        </dd>
        {tiers && (
          <>
            <dt>Tier 1, tier 2</dt>
            <dd>
              Tier 1: {tiers[1]} Tier 2: {tiers[2]} Earliest located is named
              within tier 1, and the earliest located tier-2 text separately. A
              tier is not a ranking of quality.
            </dd>
          </>
        )}
        <dt>Earliest located use of the name</dt>
        <dd>
          The earliest located text that uses the proposition’s usual name. A
          title can carry the name without stating the proposition.
        </dd>
        {mostDeveloped && (
          <>
            <dt>Most developed</dt>
            <dd>
              The fullest treatment among the located texts. An editorial
              judgement, not a measure.
            </dd>
          </>
        )}
        {conditions && (
          <>
            <dt>Conditions</dt>
            <dd>
              The model assumptions or stated conditions under which a passage
              holds. A conditional result is not a forecast.
            </dd>
          </>
        )}
        {scenario && (
          <>
            <dt>Model scenario</dt>
            <dd>
              A case of a formal model, under its conditions, that meets the
              criterion. It is not the author’s own claim, and it is shown only
              with its context.
            </dd>
          </>
        )}
        {estimates && (
          <>
            <dt>Estimate</dt>
            <dd>
              An estimate as the text states it, with its holder, horizon and
              the text’s own definition. Estimates from different texts are not
              converted or combined.
            </dd>
          </>
        )}
        {engagement && (
          <>
            <dt>Engages a premise, states the contrary</dt>
            <dd>
              A contesting passage engages a premise when its paragraph, message
              or dialogue turn gives a reason against it. Otherwise it states
              the contrary conclusion only.
            </dd>
          </>
        )}
        {restatement && (
          <>
            <dt>Later restatement</dt>
            <dd>
              The author restates a point made in an earlier located text of
              their own.
            </dd>
          </>
        )}
        {retrospective && (
          <>
            <dt>Looking back</dt>
            <dd>
              The author reports an earlier belief of their own. The record is
              dated by the report, not by the belief it describes.
            </dd>
          </>
        )}
        {contextOnly && (
          <>
            <dt>Shown only with its context</dt>
            <dd>
              A passage that would mislead on its own, such as an earlier view
              without the later text that rejects it. The evidence inspector
              shows it only together with the context it needs.
            </dd>
          </>
        )}
        <dt>Dates</dt>
        <dd>
          The first date is the one the work is dated by. “Wording attested”
          gives the date from which the quoted wording is known, when it
          survives only in a later copy. “Claimed” gives an earlier talk, draft
          or presentation that does not date the wording.
        </dd>
        <dt>Register: the kind of text</dt>
        <dd>
          Fiction, satire, a dream frame or a relay of another author is
          labelled. A passage in fiction records what the work says, not its
          author’s view. Unlabelled records are nonfiction.
        </dd>
      </dl>
    </details>
  );
}

export function Propositions({
  view,
  repository,
  selectedClaimId,
  onClaim,
  onEntity,
  focus,
  onFocused,
}: {
  view: PropositionsView;
  repository: Repository;
  selectedClaimId: string | null;
  onClaim: (id: string) => void;
  onEntity: (id: string) => void;
  /** A proposition to scroll to once the page has rendered. */
  focus?: string | null;
  onFocused?: () => void;
}) {
  const { collection, groups } = view;
  const props = { repository, selectedClaimId, onClaim };
  const count = groups.reduce((n, g) => n + g.propositions.length, 0);
  const jump = (id: string) => {
    // Hash addresses belong to the router; move focus instead.
    const target = document.getElementById(id);
    target?.scrollIntoView({ block: 'start' });
    target?.focus({ preventScroll: true });
  };
  useEffect(() => {
    if (!focus) return;
    const code = groups
      .flatMap((g) => g.propositions)
      .find((p) => p.entity.id === focus)?.proposition.code;
    if (code) jump(`proposition-${code.toLowerCase()}-heading`);
    onFocused?.();
  }, [focus, groups, onFocused]);
  return (
    <article className="doc-history prop-page" aria-label={collection.title}>
      <header className="doc-lede">
        <span className="eyebrow">
          Propositions · {count} propositions · {view.claimIds.length} records ·{' '}
          {view.years.first}–{view.years.last}
        </span>
        <h1>{collection.title}</h1>
        <p className="landing-deck">{collection.question}</p>
        <p className="doc-intro">{collection.introduction}</p>
        <p className="doc-status">
          A machine selected and arranged these records. No human review of the
          selection or framing is recorded.
        </p>
        <div className="doc-actions">
          <ExportPropositionsStarter
            data={repository.data}
            collection={collection}
          />
          <CopyLink
            target={{ kind: 'propositions', id: collection.id }}
            label="Copy link to this page"
          />
        </div>
      </header>
      <nav className="prop-toc" aria-label="Propositions">
        {groups.map((g) => (
          <div key={g.id}>
            <span className="prop-toc-group">
              {g.id} · {g.label}
            </span>
            <ul>
              {g.propositions.map((p) => (
                <li key={p.entity.id}>
                  <button
                    className="text-button"
                    onClick={() =>
                      jump(
                        'proposition-' +
                          p.proposition.code.toLowerCase() +
                          '-heading',
                      )
                    }
                  >
                    {p.proposition.code} {p.entity.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>
      <SearchNote view={view} />
      <ReadingKey view={view} />
      <details className="doc-limits-box">
        <summary>Limits of this page</summary>
        <ul className="doc-limits">
          {collection.limits.map((limit) => (
            <li key={limit}>{limit}</li>
          ))}
        </ul>
      </details>
      {groups.map((g) => (
        <section
          key={g.id}
          className="doc-family prop-group"
          aria-labelledby={'prop-group-' + g.id}
        >
          <h2 id={'prop-group-' + g.id}>
            {g.id} · {g.label}
          </h2>
          <p className="doc-family-note">{g.description}</p>
          {g.propositions.map((p) => (
            <PropositionSection
              key={p.entity.id}
              entry={p}
              collection={collection}
              onDocument={onEntity}
              {...props}
            />
          ))}
        </section>
      ))}
    </article>
  );
}
