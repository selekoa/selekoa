import type { LandingSummary } from '../domain/landing';
import type { HubId } from '../domain/deep-links';
import { startHref, type StartAction } from './SiteChrome';
import { NavLink } from './NavLink';
import { comparisonFacets } from '../domain/framework-comparison';
import './reading-first.css';
import './control-commitments.css';

export const hubTitles: Record<HubId, string> = {
  governance: 'Governance',
  ideas: 'Ideas & debates',
  institutions: 'Institutions & people',
};

/** The research programme each hub belongs to, shown under its title. */
export const hubSubtitles: Record<HubId, string> = {
  governance: 'Frontier AI governance',
  ideas: 'Human thought and institutions around machine intelligence',
  institutions: 'The institutional history of machine intelligence',
};

/** A line under the subtitle where a word in it needs defining. */
const hubScopeNotes: Partial<Record<HubId, string>> = {
  ideas:
    'Institutions here are the forums, journals, mailing lists and organisations where the debates took place.',
};

type Example = { question: string; action: StartAction };

/** What each hub covers, in one sentence, with example questions it can answer. */
export function hubOutline(summary: LandingSummary, hub: HubId) {
  const has = <T extends { id: string }>(list: T[], id: string) =>
    list.some((item) => item.id === id);
  const examples: Example[] =
    hub === 'governance'
      ? [
          {
            question:
              'How did each developer’s safety framework change between editions?',
            action: { kind: 'documents' },
          },
          {
            question:
              'What does each framework say about pausing development or deployment?',
            action: {
              kind: 'compare',
              id: 'frontier-safety-frameworks',
            } as StartAction,
          },
          ...(has(summary.controls, 'openai')
            ? [
                {
                  question:
                    'Who has controlled OpenAI, and through which instrument?',
                  action: { kind: 'control', id: 'openai' } as StartAction,
                },
              ]
            : []),
          ...summary.questions.slice(0, 1).map((q) => ({
            question: q.question,
            action: { kind: 'question', id: q.id } as StartAction,
          })),
        ]
      : hub === 'ideas'
        ? [
            ...(has(summary.propositions, 'superintelligence')
              ? [
                  {
                    question:
                      'Which text is the earliest located for each proposition about superintelligence?',
                    action: {
                      kind: 'propositions',
                      id: 'superintelligence',
                    } as StartAction,
                  },
                ]
              : []),
            ...(has(summary.propositions, 'yudkowsky-arguments')
              ? [
                  {
                    question:
                      'Which of his earlier views did Eliezer Yudkowsky later contest?',
                    action: {
                      kind: 'propositions',
                      id: 'yudkowsky-arguments',
                    } as StartAction,
                  },
                ]
              : []),
            ...(has(summary.propositions, 'economics-of-machine-intelligence')
              ? [
                  {
                    question:
                      'How did economists take up explosive growth and risk from AI?',
                    action: {
                      kind: 'propositions',
                      id: 'economics-of-machine-intelligence',
                    } as StartAction,
                  },
                ]
              : []),
          ]
        : [
            {
              question: summary.reading.question,
              action: { kind: 'reading' },
            },
            ...summary.dossiers
              .filter((d) => d.group !== 'Core institutions')
              .slice(0, 1)
              .map((d) => ({
                question: `What do the records show about ${d.label}?`,
                action: { kind: 'dossier', id: d.id } as StartAction,
              })),
          ];
  const description =
    hub === 'governance'
      ? `Safety frameworks edition by edition, who controls the labs, and ${summary.commitments.texts === 1 ? 'one external commitment or law' : `${summary.commitments.texts} external commitments and laws`}.`
      : hub === 'ideas'
        ? `${summary.propositions.length} collections of propositions about machine intelligence, with the texts that state, dispute or bear on them.`
        : `${summary.dossiers.length} institutional dossiers, among them Chinese AI histories, a guided reading on Anthropic and an index of ${summary.people.reduce((n, g) => n + g.people.length, 0)} people named in the records.`;
  return { title: hubTitles[hub], description, examples };
}

/** The three hub cards on the start page. */
export function HubCards({
  summary,
  onAction,
}: {
  summary: LandingSummary;
  onAction: (action: StartAction) => void;
}) {
  const hubs: HubId[] = ['governance', 'ideas', 'institutions'];
  return (
    <ul className="hub-cards">
      {hubs.map((hub) => {
        const outline = hubOutline(summary, hub);
        // The start page features the OpenAI control question above the cards.
        const examples = outline.examples.filter(
          (e) => !(e.action.kind === 'control' && e.action.id === 'openai'),
        );
        return (
          <li className="hub-card" key={hub}>
            <h3>
              <NavLink
                className="text-button"
                href={startHref({ kind: 'hub', id: hub }, summary)}
                onOpen={() => onAction({ kind: 'hub', id: hub })}
              >
                {outline.title}
              </NavLink>
            </h3>
            <p>{outline.description}</p>
            <ul
              className="hub-examples"
              aria-label={`${outline.title}: example questions`}
            >
              {examples.map((e) => (
                <li key={e.question}>
                  <NavLink
                    className="text-button"
                    href={startHref(e.action, summary)}
                    onOpen={() => onAction(e.action)}
                  >
                    {e.question}
                  </NavLink>
                </li>
              ))}
            </ul>
            <NavLink
              className="landing-action"
              href={startHref({ kind: 'hub', id: hub }, summary)}
              onOpen={() => onAction({ kind: 'hub', id: hub })}
            >
              All of {outline.title} →
            </NavLink>
          </li>
        );
      })}
    </ul>
  );
}

function GovernanceEntries({
  summary,
  onAction,
}: {
  summary: LandingSummary;
  onAction: (action: StartAction) => void;
}) {
  const { history, controls, commitments, questions } = summary;
  const publishers = history.publishers;
  return (
    <>
      <li className="landing-entry landing-entry-lead">
        <span className="eyebrow">Document history</span>
        <h3>{history.title}</h3>
        <p>
          {history.editions} editions of {history.frameworks} safety frameworks
          from{' '}
          {publishers.slice(0, -1).join(', ') + ' and ' + publishers.at(-1)}.
          Each edition shows its dates, what replaced it, quoted provisions and
          the changes recorded since the previous edition. The page can be
          downloaded as a research starter, a file of the claims, sources and
          open questions.
        </p>
        <NavLink
          className="landing-action"
          href={startHref({ kind: 'documents' }, summary)}
          onOpen={() => onAction({ kind: 'documents' })}
        >
          Read the document histories →
        </NavLink>
      </li>
      <li className="landing-entry">
        <span className="eyebrow">Comparison</span>
        <h3>Compare frameworks</h3>
        <p>
          The same {comparisonFacets.length} questions put to every framework:
          which risks it covers, how thresholds are set, what must happen when
          one is reached, who decides, when models are evaluated, where the
          framework allows exceptions, what is reported and how the framework is
          revised. Each cell quotes or paraphrases the chosen edition with its
          page, or records that no passage was found in a stated search. It
          shows what the documents state, not what any developer did, and ranks
          no one.
        </p>
        <NavLink
          className="landing-action"
          href={startHref(
            { kind: 'compare', id: 'frontier-safety-frameworks' },
            summary,
          )}
          onOpen={() =>
            onAction({ kind: 'compare', id: 'frontier-safety-frameworks' })
          }
        >
          Compare frameworks →
        </NavLink>
      </li>
      <li className="landing-entry">
        <span className="eyebrow">
          {controls.length ? 'Control and commitments' : 'Commitments'}
        </span>
        <h3>
          {controls.length
            ? 'Who controls the labs, and what they committed to'
            : 'What external commitments and laws require'}
        </h3>
        <p>
          {controls.length > 0 &&
            'Dated timelines of who holds which control right over which organisation, through which instrument, and whether it was announced or in effect. '}
          {commitments.texts === 1
            ? 'One external commitment or law so far'
            : `The commitments page covers ${commitments.texts} external commitments and laws`}
          {commitments.organisations > 0 &&
            `, with signatory or refusal records for ${commitments.organisations} organisations`}
          .{' '}
          {commitments.texts === 1
            ? 'The page quotes its provisions, gives its dates and lists the published frameworks that link themselves to it.'
            : 'It quotes their provisions, gives their dates and lists the published frameworks that link themselves to them.'}{' '}
          A commitment or legal duty is never evidence of compliance.
        </p>
        {controls.length > 0 && (
          <ul className="landing-control">
            {controls.map((c) => (
              <li key={c.id}>
                <NavLink
                  className="text-button"
                  href={startHref({ kind: 'control', id: c.id }, summary)}
                  onOpen={() => onAction({ kind: 'control', id: c.id })}
                >
                  {c.title}
                </NavLink>{' '}
                <span className="small-note">{c.records} records</span>
              </li>
            ))}
          </ul>
        )}
        <NavLink
          className="landing-action"
          href={startHref({ kind: 'commitments' }, summary)}
          onOpen={() => onAction({ kind: 'commitments' })}
        >
          Read {commitments.title.toLowerCase()} →
        </NavLink>
      </li>
      {questions.map((q) => (
        <li className="landing-entry" key={q.id}>
          <span className="eyebrow">Research question</span>
          <h3>{q.title}</h3>
          <p>
            {q.question} A chronology and {q.records} existing records, each
            linked to its original source, with a list of what the records
            cannot answer. No essay or conclusion is added.
          </p>
          <NavLink
            className="landing-action"
            href={startHref({ kind: 'question', id: q.id }, summary)}
            onOpen={() => onAction({ kind: 'question', id: q.id })}
          >
            Open the research question →
          </NavLink>
        </li>
      ))}
    </>
  );
}

function IdeasEntries({
  summary,
  onAction,
}: {
  summary: LandingSummary;
  onAction: (action: StartAction) => void;
}) {
  return (
    <>
      {summary.propositions.map((p) => (
        <li className="landing-entry" key={p.id}>
          <span className="eyebrow">Propositions</span>
          <h3>{p.title}</h3>
          {p.landing ? (
            <p>
              {p.landing
                .replace('{propositions}', String(p.propositions))
                .replace('{records}', String(p.records))
                .replace('{texts}', String(p.texts))}
            </p>
          ) : (
            <p>
              {p.propositions} propositions about machine intelligence, each
              with one criterion, and {p.records} records from {p.texts} texts
              that state, dispute or bear on them. Each proposition names its
              earliest located text, and fiction and satire are labelled. The
              page can be downloaded as a research starter, with the original
              sources first.
            </p>
          )}
          <NavLink
            className="landing-action"
            href={startHref({ kind: 'propositions', id: p.id }, summary)}
            onOpen={() => onAction({ kind: 'propositions', id: p.id })}
          >
            {p.action}
          </NavLink>
        </li>
      ))}
    </>
  );
}

function InstitutionEntries({
  summary,
  onAction,
}: {
  summary: LandingSummary;
  onAction: (action: StartAction) => void;
}) {
  const { dossiers, reading, people } = summary;
  const groups = [...new Set(dossiers.map((d) => d.group))];
  return (
    <>
      <li className="landing-entry">
        <span className="eyebrow">Institutional dossiers</span>
        <h3>Selected institutional histories</h3>
        <p>
          Each dossier gathers one institution’s claims under chronology,
          people, documents, capital and governance. The groups below are for
          navigation and imply no shared ownership, strategy or lineage.
        </p>
        {groups.map((group) => (
          <div className="landing-dossiers" key={group}>
            <span className="landing-dossier-group">{group}</span>
            <ul>
              {dossiers
                .filter((d) => d.group === group)
                .map((d) => (
                  <li key={d.id}>
                    <NavLink
                      className="text-button"
                      href={startHref({ kind: 'dossier', id: d.id }, summary)}
                      onOpen={() => onAction({ kind: 'dossier', id: d.id })}
                    >
                      {d.label}
                    </NavLink>
                  </li>
                ))}
            </ul>
          </div>
        ))}
      </li>
      <li className="landing-entry">
        <span className="eyebrow">Guided reading</span>
        <h3>Anthropic: {reading.title.toLowerCase()}</h3>
        <p>{reading.question}</p>
        <NavLink
          className="landing-action"
          href={startHref({ kind: 'reading' }, summary)}
          onOpen={() => onAction({ kind: 'reading' })}
        >
          Open the guided reading →
        </NavLink>
      </li>
      <li className="landing-entry landing-entry-wide" id="people-az">
        <span className="eyebrow">People</span>
        <h3>People, A–Z</h3>
        <p>
          {people.reduce((n, g) => n + g.people.length, 0)} people named in
          recorded claims, filed by family name as in a library index. Each page
          lists the claims about that person, with their sources. A person
          appears here because a record names them. That says nothing about
          their importance.
        </p>
        <div className="people-az">
          {people.map((group) => (
            <div key={group.letter}>
              <h4>{group.letter}</h4>
              <ul>
                {group.people.map((p) => (
                  <li key={p.id}>
                    <NavLink
                      className="text-button"
                      href={startHref({ kind: 'person', id: p.id }, summary)}
                      onOpen={() => onAction({ kind: 'person', id: p.id })}
                    >
                      {p.name}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </li>
    </>
  );
}

/** A topic hub: the collections, dossiers and indexes in one area. */
export function HubPage({
  hub,
  summary,
  onAction,
}: {
  hub: HubId;
  summary: LandingSummary;
  onAction: (action: StartAction) => void;
}) {
  const outline = hubOutline(summary, hub);
  const Entries =
    hub === 'governance'
      ? GovernanceEntries
      : hub === 'ideas'
        ? IdeasEntries
        : InstitutionEntries;
  return (
    <main className="landing hub" id="hub" tabIndex={-1}>
      <section className="landing-lede" aria-labelledby="hub-title">
        <h1 id="hub-title">{outline.title}</h1>
        <p className="hub-subtitle">{hubSubtitles[hub]}</p>
        {hubScopeNotes[hub] && (
          <p className="hub-scope-note">{hubScopeNotes[hub]}</p>
        )}
        <p className="landing-deck">{outline.description}</p>
      </section>
      <section className="landing-entries" aria-label={outline.title}>
        <ol>
          <Entries summary={summary} onAction={onAction} />
        </ol>
      </section>
    </main>
  );
}
