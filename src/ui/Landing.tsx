import { useState } from 'react';
import type { LandingSummary } from '../domain/landing';
import { HubCards } from './Hub';
import { startHref, type StartAction } from './SiteChrome';
import { NavLink } from './NavLink';
import { useInBrowser } from './client';
import './reading-first.css';
import './control-commitments.css';

/** The featured map: the direct connections of OpenAI's dossier. */
const openAIMap: StartAction = { kind: 'dossier', id: 'openai', view: 'map' };

export function Landing({
  summary,
  onAction,
}: {
  summary: LandingSummary;
  onAction: (action: StartAction) => void;
}) {
  const { coverage } = summary;
  const [text, setText] = useState('');
  // The built page's search box answers once the page runs in the browser.
  const live = useInBrowser();
  return (
    <main className="landing" id="start" tabIndex={-1}>
      <section className="landing-lede" aria-labelledby="landing-title">
        <h1 id="landing-title">
          A documentary history of machine intelligence.
        </h1>
        <p className="landing-deck">
          Selekoa is a machine-first starting point for research on the history
          of machine intelligence: machines find and check the records, and
          every one links to its source, for you to verify and build on.
        </p>
        <form
          className="landing-search"
          role="search"
          onSubmit={(event) => {
            event.preventDefault();
            onAction({ kind: 'search', q: text.trim() || undefined });
          }}
        >
          <label htmlFor="landing-search-input" className="visually-hidden">
            Search the records
          </label>
          <input
            id="landing-search-input"
            readOnly={!live}
            type="search"
            value={text}
            onChange={(event) => setText(event.target.value)}
            placeholder="Search people, labs, documents, ideas…"
            autoComplete="off"
          />
          <button type="submit">Search</button>
        </form>
      </section>
      <section className="landing-entries" aria-labelledby="start-covered">
        <h2 id="start-covered">What’s covered</h2>
        {summary.controls.some((c) => c.id === 'openai') && (
          <div className="landing-featured">
            <p className="eyebrow">A question the records answer:</p>
            <p>
              <NavLink
                className="text-button"
                href={startHref({ kind: 'control', id: 'openai' }, summary)}
                onOpen={() => onAction({ kind: 'control', id: 'openai' })}
              >
                Who controlled OpenAI, and when? →
              </NavLink>
            </p>
            <p className="landing-featured-map">
              <NavLink
                className="text-button"
                href={startHref(openAIMap, summary)}
                onOpen={() => onAction(openAIMap)}
              >
                See it as a map: OpenAI’s direct connections →
              </NavLink>
            </p>
          </div>
        )}
        <HubCards summary={summary} onAction={onAction} />
      </section>
      <section className="landing-gaps" aria-labelledby="start-not-covered">
        <h2 id="start-not-covered">Not yet covered</h2>
        <p>
          Coverage is selective. The largest gaps are whether developers
          followed their own frameworks, model capabilities, chip export
          controls and most AI developers.{' '}
          <NavLink
            className="text-button"
            href={startHref({ kind: 'not-covered' }, summary)}
            onOpen={() => onAction({ kind: 'not-covered' })}
          >
            What is not covered →
          </NavLink>
        </p>
      </section>
      <p className="landing-coverage">
        Current coverage: {coverage.claims} claims about {coverage.entities}{' '}
        people, organisations, documents and other subjects, resting on{' '}
        {coverage.evidence} evidence records from {coverage.sources} sources.
        Dated records run from {coverage.firstYear} to {coverage.lastYear}, and
        some records are undated. Evidence was checked between{' '}
        {coverage.firstCheck} and {coverage.lastCheck}.
        {Number(coverage.lastYear) > Number(coverage.lastCheck.slice(0, 4)) &&
          ' Dates after the latest check are scheduled dates stated in the sources.'}{' '}
        Coverage is selective and uneven.
      </p>
    </main>
  );
}
