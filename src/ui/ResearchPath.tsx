import { useLayoutEffect, useRef } from 'react';
import './research-path.css';
import type {
  ReadingPassage,
  ResearchPath as Path,
} from '../domain/research-path';
import { readingPosition } from '../domain/research-path';
import type { Repository } from '../domain/repository';
import { predicates } from '../domain/predicates';
import { CopyLink, ExportReading } from './ReferenceActions';
import { ReviewMarkers } from './ReviewMarkers';
import { StatusBadge } from './ReadingRows';
import { ArchiveLink } from './SourceArchive';
import { researchPaths } from '../domain/research-path';
import {
  derivationLabels,
  resolutionLabels,
  supportLabels,
} from '../domain/epistemics';
import { quoted } from './quote';

function Passages({
  passages,
  repository,
  onClaim,
}: {
  passages: ReadingPassage[];
  repository: Repository;
  onClaim: (id: string) => void;
}) {
  return passages.map((passage) => (
    <div className="path-prose" data-passage-id={passage.id} key={passage.id}>
      <p>{passage.text}</p>
      <details className="path-details path-passage-basis">
        <summary>Supporting records · {passage.claimIds.length}</summary>
        <ul>
          {passage.claimIds.map((id) => (
            <li key={id}>
              <button
                className="path-reference"
                data-passage-claim-id={id}
                onClick={() => onClaim(id)}
              >
                {repository.claims.get(id)!.statement} ↗<code>{id}</code>
              </button>
            </li>
          ))}
        </ul>
      </details>
    </div>
  ));
}

export function ResearchPath({
  path,
  repository,
  claimId,
  onStep,
  onClaim,
  onDossier,
  onMap,
}: {
  path: Path;
  repository: Repository;
  claimId: string | null;
  onStep: (id: string) => void;
  onClaim: (id: string) => void;
  onDossier?: () => void;
  onMap?: () => void;
}) {
  const current = path.items[readingPosition(path, claimId)];
  const section = current.section;
  const principal = path.items.filter((i) => i.section.kind === 'principal');
  const items = path.items.filter((i) => i.sectionId === section.id);
  // Authored groups; a group without predicates takes the remaining records.
  const grouped = new Set(
    (section.groups ?? []).flatMap((g) => g.predicates ?? []),
  );
  const groups: { title: string | null; items: typeof items }[] = section.groups
    ? section.groups
        .map((group) => ({
          title: group.title,
          items: items.filter((i) =>
            group.predicates
              ? group.predicates.includes(i.claim.predicate)
              : !grouped.has(i.claim.predicate),
          ),
        }))
        .filter((group) => group.items.length)
    : [{ title: null, items }];
  const principalTitle =
    principal[0].section.title[0].toLowerCase() +
    principal[0].section.title.slice(1);
  const recordLabel = (id: string) =>
    repository.claims.get(id)?.statement ?? id;
  const root = useRef<HTMLElement>(null);
  const lastSection = useRef<string | null>(null);
  useLayoutEffect(() => {
    if (lastSection.current !== section.id) {
      const initial = lastSection.current === null;
      const target = initial
        ? root.current?.querySelector<HTMLElement>(
            '[data-reading-claim-id="' + current.claimId + '"] h4',
          )
        : root.current?.querySelector<HTMLElement>('.path-branch-heading');
      target?.focus({ preventScroll: true });
      if (!initial || current.claimId !== principal[0].claimId)
        target?.scrollIntoView({ block: 'start' });
      lastSection.current = section.id;
    }
  }, [section.id, current.claimId, principal]);
  const choose = (sectionId: string) =>
    onStep(path.items.find((i) => i.sectionId === sectionId)!.claimId);
  return (
    <article
      ref={root}
      className="research-path"
      aria-label={
        path.institution
          ? path.institution.name + ' guided research path'
          : path.title + ': research question'
      }
    >
      <header className="path-overview">
        <h1 className="path-title">
          {path.institution ? path.institution.name + ': ' : ''}
          {path.title}
        </h1>
        <p className="eyebrow">
          Guided reading · {principal.length} main claims ·{' '}
          {path.items.length - principal.length} optional context records
        </p>
        <h2>{path.question}</h2>
        <div className="doc-actions">
          <CopyLink
            target={{
              kind: 'question',
              id: path.id,
              section: section.id,
              claim: current.claimId,
            }}
            label="Copy link to this place"
          />
          <CopyLink
            target={{ kind: 'question', id: path.id, section: section.id }}
            label="Copy section link"
          />
          <ExportReading
            data={repository.data}
            selection={researchPaths.find((s) => s.id === path.id)!}
          />
        </div>
        {section.kind === 'principal' && (
          <Passages
            passages={path.introduction}
            repository={repository}
            onClaim={onClaim}
          />
        )}
        <p className="path-status">
          Written by machine · not human-reviewed or editorially accepted.
        </p>
        <details className="path-details">
          <summary>About this reading</summary>
          <p>
            A machine selected the records and wrote the text. No human review
            of the selection, source paths or framing is recorded. Each
            supporting record keeps its own review status.
          </p>
        </details>
        {(onDossier || onMap) && (
          <div className="path-exits">
            {onDossier && (
              <button onClick={onDossier}>
                Full dossier · {path.totalClaims} claims ↗
              </button>
            )}
            {onMap && <button onClick={onMap}>Institution map ↗</button>}
          </div>
        )}
      </header>
      <section
        className="path-branch"
        aria-label={section.title}
        data-branch-id={section.id}
      >
        {section.kind === 'context' && (
          <button
            className="path-back"
            onClick={() => onStep(principal[0].claimId)}
          >
            Back to {principalTitle}
          </button>
        )}
        <p className="eyebrow">
          {section.kind === 'principal'
            ? 'Main reading'
            : 'Optional documentary context'}
        </p>
        <h3 className="path-branch-heading" tabIndex={-1}>
          {section.title}
        </h3>
        <Passages
          passages={section.passages}
          repository={repository}
          onClaim={onClaim}
        />
        <p className="path-gap">{section.gap}</p>
        <div className="path-records">
          {groups.map((group) => (
            <section
              className={
                section.kind === 'principal'
                  ? 'path-record-group path-compact'
                  : 'path-record-group'
              }
              aria-label={group.title ?? 'Context records'}
              key={group.title ?? section.id}
            >
              {group.title && (
                <h3 className="path-group-heading">{group.title}</h3>
              )}
              {group.items.map((item) => {
                const claim = item.claim;
                const remember = () => {
                  if (item.claimId !== current.claimId) onStep(item.claimId);
                };
                return (
                  <section
                    className="path-record"
                    key={claim.id}
                    data-reading-claim-id={claim.id}
                    data-bookmarked={
                      current.claimId === claim.id ? 'true' : undefined
                    }
                    aria-label={claim.statement}
                    onFocusCapture={remember}
                    onPointerDownCapture={remember}
                  >
                    <StatusBadge claim={claim} />
                    <h4 className="path-statement" tabIndex={-1}>
                      {claim.statement}
                    </h4>
                    <div
                      className="path-dates"
                      aria-label="Record and documentation dates"
                    >
                      <p>{item.dates.record}</p>
                      {item.dates.publications.map((publication) => (
                        <p key={publication.sourceId}>
                          Source published:{' '}
                          {publication.date ?? 'publication date unknown'}
                          {publication.retrospective
                            ? ' · retrospective source'
                            : claim.predicate === 'co_founded' &&
                                claim.time.kind === 'unknown'
                              ? ' · retrospective attribution; founding date unknown'
                              : ''}
                        </p>
                      ))}
                    </div>
                    {item.warning && (
                      <p className="path-warning">
                        <strong>Interpretive gap.</strong> {item.warning}
                      </p>
                    )}
                    <div className="path-record-actions">
                      <button
                        className="path-evidence"
                        data-claim-id={claim.id}
                        aria-label={`Inspect claim & evidence: ${claim.statement}`}
                        onClick={() => onClaim(claim.id)}
                      >
                        Inspect claim & evidence ↗
                      </button>
                    </div>
                    <details className="path-details">
                      <summary>Record notes & sources</summary>
                      <p>
                        <strong>Qualification.</strong> {claim.qualification}
                      </p>
                      <p>
                        <strong>Why included.</strong> {item.rationale}
                      </p>
                      <p>
                        {item.context} · {derivationLabels[claim.derivation]} ·{' '}
                        {resolutionLabels[claim.resolution]}{' '}
                        <ReviewMarkers claim={claim} repository={repository} />
                      </p>
                      <p>{claim.time.note}</p>
                      <p>
                        {predicates[claim.predicate].label}:{' '}
                        {predicates[claim.predicate].description}
                      </p>
                      {claim.evidenceIds.map((id) => {
                        const evidence = repository.evidence.get(id)!;
                        const source = repository.sources.get(
                          evidence.sourceId,
                        )!;
                        return (
                          <div className="path-source" key={id}>
                            <a
                              href={source.evidenceUrl}
                              target="_blank"
                              rel="noreferrer"
                            >
                              {source.title} ↗
                            </a>
                            {source.archivedUrl && (
                              <>
                                {' · '}
                                <ArchiveLink source={source} />
                              </>
                            )}
                            <p>
                              {evidence.sourceRole} source ·{' '}
                              {supportLabels[evidence.support]}
                            </p>
                            <p>
                              {evidence.passageType === 'quote'
                                ? 'Excerpt'
                                : 'Paraphrase'}
                              :{' '}
                              {evidence.passageType === 'quote'
                                ? quoted(evidence.passage)
                                : evidence.passage}
                            </p>
                            <p>Location in source: {evidence.locator}</p>
                            <p>
                              {evidence.verification === 'machine_checked'
                                ? 'Machine-checked'
                                : 'Reviewed by ' + evidence.reviewer}{' '}
                              · {evidence.checkedAt}
                            </p>
                          </div>
                        );
                      })}
                      <code>{claim.id}</code>
                    </details>
                  </section>
                );
              })}
            </section>
          ))}
        </div>
      </section>
      <section className="path-contexts" aria-label="Optional context branches">
        <h3>Optional documentary context</h3>
        <p>
          {path.branchNote ??
            'Choose any branch. The branches are topics, not steps in a sequence.'}
        </p>
        <div className="path-branch-options">
          {path.sections
            .filter((s) => s.kind === 'context')
            .map((branch) => (
              <button
                key={branch.id}
                onClick={() => choose(branch.id)}
                aria-label={branch.title}
                aria-pressed={branch.id === section.id}
              >
                <strong>{branch.title}</strong>
                <span>{branch.description}</span>
                <small>
                  {path.items.filter((i) => i.sectionId === branch.id).length}{' '}
                  records
                </small>
              </button>
            ))}
        </div>
      </section>
      <section className="path-questions" aria-labelledby="question-disputed">
        <h3 id="question-disputed">What is disputed</h3>
        {path.disputed.claims.length || path.disputed.counterevidence.length ? (
          <ul>
            {path.disputed.claims.map((c) => (
              <li key={c.id}>
                <button
                  className="path-reference"
                  data-question-claim-id={c.id}
                  onClick={() => onClaim(c.id)}
                >
                  {resolutionLabels[c.resolution]}: {c.statement} ↗
                </button>
              </li>
            ))}
            {path.disputed.counterevidence.map((e) => (
              <li key={e.id}>
                <button
                  className="path-reference"
                  data-question-claim-id={e.claimId}
                  onClick={() => onClaim(e.claimId)}
                >
                  Contradicting evidence for: {recordLabel(e.claimId)} ↗
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>
            No selected record is contested or unresolved, and none has
            contradicting evidence linked to it. This describes the recorded
            evidence only. It is not a finding that no one disputes these
            accounts.
          </p>
        )}
        <h3>Open questions and limits</h3>
        <p className="path-questions-note">
          Collected from each branch’s stated limit and from record warnings.
        </p>
        <ul>
          {path.openQuestionList.map((q) => (
            <li
              key={q.id}
              data-open-question={q.id}
              className={
                q.source === 'record-warning'
                  ? 'path-question-warning'
                  : undefined
              }
            >
              <p>
                {q.source === 'record-warning' ? (
                  <strong>Record warning. </strong>
                ) : (
                  q.sectionId && (
                    <strong>
                      {path.sections.find((s) => s.id === q.sectionId)!.title}
                      .{' '}
                    </strong>
                  )
                )}
                {q.text}
              </p>
              <details className="path-details">
                <summary>Records · {q.claimIds.length}</summary>
                <ul>
                  {q.claimIds.map((id) => (
                    <li key={id}>
                      <button
                        className="path-reference"
                        data-question-claim-id={id}
                        onClick={() => onClaim(id)}
                      >
                        {recordLabel(id)} ↗<code>{id}</code>
                      </button>
                    </li>
                  ))}
                </ul>
              </details>
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}
