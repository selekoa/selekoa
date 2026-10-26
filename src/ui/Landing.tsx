import { useState } from 'react';
import type { LandingSummary } from '../domain/landing';
import { HubCards } from './Hub';
import type { StartAction } from './SiteChrome';
import './reading-first.css';
import './control-commitments.css';

export function Landing({
  summary,
  onAction,
}: {
  summary: LandingSummary;
  onAction: (action: StartAction) => void;
}) {
  const { coverage } = summary;
  const [text, setText] = useState('');
  return (
    <main className="landing" id="start" tabIndex={-1}>
      <section className="landing-lede" aria-labelledby="landing-title">
        <h1 id="landing-title" className="landing-opening">
          Selekoa is a machine-first starting point for research on the history
          of machine intelligence: machines find and check the records, and
          every one links to its source, for you to verify and build on.
        </h1>
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
        <HubCards summary={summary} onAction={onAction} />
      </section>
      <section className="landing-gaps" aria-labelledby="start-not-covered">
        <h2 id="start-not-covered">Not yet covered</h2>
        <p>
          Whether developers followed their own frameworks, model capabilities
          and benchmark results, chip export controls, and most AI developers
          other than those named on the About & method page. Economics is
          covered only through the propositions in its collection under Ideas &
          debates. Coverage is selective throughout, and a missing record is a
          gap in coverage.{' '}
          <button
            className="text-button"
            onClick={() => onAction({ kind: 'about' })}
          >
            About Selekoa and its method →
          </button>
        </p>
      </section>
      <p className="landing-coverage">
        Current coverage: {coverage.claims} claims about {coverage.entities}{' '}
        people, organisations, documents and other subjects, resting on{' '}
        {coverage.evidence} evidence records from {coverage.sources} sources.
        Dated records run from {coverage.firstYear} to {coverage.lastYear}, and
        some records are undated. Evidence was checked between{' '}
        {coverage.firstCheck} and {coverage.lastCheck}. Coverage is selective
        and uneven.
      </p>
    </main>
  );
}
