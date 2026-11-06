import type { LandingSummary } from '../domain/landing';
import { listedPerson } from '../domain/people-index';
import type { HubId } from '../domain/deep-links';
import { startHref, type StartAction } from './SiteChrome';
import { NavLink } from './NavLink';
import { toolById, ToolLink } from './tools';
import { stancesTitle } from '../reading/proposition-stances-page';
import { comparisonFacets } from '../domain/framework-comparison';
import { cardDevelopers, cardFacets } from '../domain/model-card-facets';
import { modelCardsTitle } from '../reading/model-cards-page';
import { lawsComparedTitle } from '../reading/laws-compared-page';
import { predictionsTitle } from '../reading/predictions-page';
import { lawFacets } from '../domain/law-questions';
import { chinaScopeNote } from '../reading/china-scope';
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

/** The questions the start page's "Ways in" panel offers as readings. */
export function startExamples(summary: LandingSummary): Example[] {
  return [
    ...(summary.controls.some((c) => c.id === 'openai')
      ? [
          {
            question: 'Who controlled OpenAI, and when?',
            action: { kind: 'control', id: 'openai' } as StartAction,
          },
        ]
      : []),
    ...(summary.propositions.some((p) => p.id === 'risk-debate')
      ? [
          {
            question:
              'Which texts argue for and against catastrophic risk from advanced AI?',
            action: { kind: 'propositions', id: 'risk-debate' } as StartAction,
          },
        ]
      : []),
  ];
}

const sameAction = (a: StartAction, b: StartAction) =>
  a.kind === b.kind && ('id' in a ? a.id : '') === ('id' in b ? b.id : '');

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
            // The comparison's own page for this question, not the whole grid.
            action: {
              kind: 'compare',
              id: 'frontier-safety-frameworks',
              facet: 'D3.halt',
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
          ...summary.guides.slice(0, 1).map((g) => ({
            question:
              'Which laws and government texts address frontier AI developers, with what standing, and which frameworks name them?',
            action: { kind: 'guide', id: g.id } as StartAction,
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
            ...(has(summary.propositions, 'risk-debate')
              ? [
                  {
                    question:
                      'Which published texts argue for and against catastrophic risk from advanced AI, and which answer one another?',
                    action: {
                      kind: 'propositions',
                      id: 'risk-debate',
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
        // The start page's "Ways in" panel already offers its questions.
        const featured = startExamples(summary);
        const examples = outline.examples.filter(
          (e) => !featured.some((f) => sameAction(f.action, e.action)),
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
  const { history, controls, commitments, questions, guides, editionGuides } =
    summary;
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
        <span className="eyebrow">Tool · comparison</span>
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
        <ToolLink
          tool={toolById('compare')}
          ids={summary}
          onAction={onAction}
          described={false}
        />
      </li>
      <li className="landing-entry">
        <span className="eyebrow">Tool · comparison</span>
        <h3>{modelCardsTitle}</h3>
        <p>
          The same {cardFacets.length} questions put to system cards, model
          cards and safety reports from{' '}
          {cardDevelopers
            .slice(0, -1)
            .map((d) => d.name)
            .join(', ') +
            ' and ' +
            cardDevelopers.at(-1)!.name}
          : the card’s dates, the framework it cites and any determination under
          it, dangerous-capability and alignment evaluations, red-teaming,
          external and government testers, the release decision and the limits
          the card states. Each cell quotes the card with its locator, or
          records the search that found no passage. A card is the developer’s
          own account of its model, and the table ranks no one.
        </p>
        <ToolLink
          tool={toolById('model-cards')}
          ids={summary}
          onAction={onAction}
          described={false}
        />
      </li>
      <li className="landing-entry">
        <span className="eyebrow">Tool · comparison</span>
        <h3>{lawsComparedTitle}</h3>
        <p>
          The same {lawFacets.length} questions put to binding texts that
          address developers or providers of frontier and general-purpose AI
          models in the European Union, California, New York, Illinois and
          China. The EU Code of Practice is shown as a compliance route, and two
          US federal texts, one revoked and one with a rescission announced,
          close the table. The questions cover who is covered, thresholds,
          safety frameworks, risk evaluation, outside assessment, incident
          reporting, whistleblowers, dates, penalties and the enforcer. Each
          cell quotes the text with its locator, or records the search that
          found no passage. A cell records what a text requires, not who
          complied, and the table ranks no one.
        </p>
        <ToolLink
          tool={toolById('laws-compared')}
          ids={summary}
          onAction={onAction}
          described={false}
        />
      </li>
      {guides.map((g) => (
        <li className="landing-entry" key={g.id}>
          <span className="eyebrow">Guided reading</span>
          <h3>{g.title}</h3>
          <p>
            {g.editions} framework editions and {g.texts} laws and government
            texts from {g.jurisdictions} jurisdictions and forums, on one
            timeline built from the records. Each text shows its standing
            (binding, required by law, voluntary, announced or revoked), its
            dates and what it states; {g.links} framework statements name a law
            or commitment. It shows what the documents state, not compliance.
          </p>
          <NavLink
            className="landing-action"
            href={startHref({ kind: 'guide', id: g.id }, summary)}
            onOpen={() => onAction({ kind: 'guide', id: g.id })}
          >
            Read frameworks and law →
          </NavLink>
        </li>
      ))}
      {editionGuides.map((g) => (
        <li className="landing-entry" key={g.id}>
          <span className="eyebrow">Guided reading</span>
          <h3>{g.title}</h3>
          <p>
            The comparison read edition by edition: {g.editions} editions of{' '}
            {g.frameworks} frameworks against the same {g.questions} questions.
            For each framework, its editions in order, the status of every
            question in every edition, and where two consecutive editions’ cells
            differ, with both passages. For each question, the earliest compared
            edition of each framework that records it. A difference is between
            recorded cells; the page gives no reason for it.
          </p>
          <NavLink
            className="landing-action"
            href={startHref({ kind: 'guide', id: g.id }, summary)}
            onOpen={() => onAction({ kind: 'guide', id: g.id })}
          >
            Read the frameworks edition by edition →
          </NavLink>
        </li>
      ))}
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
            <li>
              <ToolLink
                tool={toolById('control-timelines')}
                ids={summary}
                onAction={onAction}
              />
            </li>
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
      <li className="landing-entry">
        <span className="eyebrow">Tool · predictions</span>
        <h3>{predictionsTitle}</h3>
        <p>
          Dated predictions about machine intelligence from 1950 to 2026:
          forecasts in papers, essays and posts, expert surveys, a public bet
          and a forecasting platform’s figure. Each record gives the text’s own
          words for the event, the horizon and any probability, and is dated by
          when the prediction was made. A chart places predictions with a
          printed target year; a table lists every record. The collection does
          not say whether any prediction came true.
        </p>
        <ToolLink
          tool={toolById('predictions')}
          ids={summary}
          onAction={onAction}
          described={false}
        />
      </li>
      <li className="landing-entry">
        <span className="eyebrow">Tool · propositions</span>
        <h3>{stancesTitle}</h3>
        <p>
          For each proposition, the texts that articulate, contest or bear on
          it, with their bylines and dates; or, for each author, the
          propositions their texts take a stance on. Built from the stored
          records alone, with a CSV of each collection.
        </p>
        <ToolLink
          tool={toolById('stances')}
          ids={summary}
          onAction={onAction}
          described={false}
        />
      </li>
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
            {group === 'Chinese AI histories' && (
              <p className="small-note" id="china-scope">
                {chinaScopeNote(summary.china)}
              </p>
            )}
          </div>
        ))}
      </li>
      {summary.computeGuides.map((g) => (
        <li className="landing-entry" key={g.id}>
          <span className="eyebrow">Guided reading</span>
          <h3>{g.title}</h3>
          <p>
            {g.records} records of data-centre sites, power agreements, chip
            supply, government measures, export-control rules and computing in
            orbit, on one timeline dated by the records themselves. Each figure
            is given as its source words it, with what it measures; targets and
            deadlines are listed apart from events. An announcement records what
            a party stated, not what was built.
          </p>
          <NavLink
            className="landing-action"
            href={startHref({ kind: 'guide', id: g.id }, summary)}
            onOpen={() => onAction({ kind: 'guide', id: g.id })}
          >
            Read the compute records →
          </NavLink>
        </li>
      ))}
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
                {group.people.map(listedPerson).map((p) => (
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
          <li className="landing-entry">
            <span className="eyebrow">Tool · chronicle</span>
            <h3>Browse by year</h3>
            <p>
              Every dated record, one page per year, in date order and grouped
              by topic, each with its date as its source gives it. Targets and
              other stated dates are listed apart from the records. Selective:
              what the records hold, not a history of any year.
            </p>
            <ToolLink
              tool={toolById('years')}
              ids={summary}
              onAction={onAction}
              described={false}
            />
          </li>
        </ol>
      </section>
    </main>
  );
}
