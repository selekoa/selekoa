import { useState } from 'react';
import type { LandingSummary } from '../domain/landing';
import { HubCards, startExamples } from './Hub';
import { startHref, type StartAction } from './SiteChrome';
import { readerTools, ToolLink } from './tools';
import { NavLink } from './NavLink';
import { useInBrowser } from './client';
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
  // The built page's search box answers once the page runs in the browser.
  const live = useInBrowser();
  return (
    <main className="landing" id="start" tabIndex={-1}>
      <section className="landing-lede" aria-labelledby="landing-title">
        <h1 id="landing-title">
          A documentary history of machine intelligence.
        </h1>
        <p className="landing-deck">
          Selekoa is a documentary history of machine intelligence and of human
          thought about it. Machines built it: they find the sources, quote them
          and check each other’s work, and every statement links to the passage
          it rests on. What they leave to <strong>you</strong> is the{' '}
          <em>human part</em>: the question, the point of view, the stance.
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
      <nav className="ways-in" aria-labelledby="ways-in-title">
        <h2 id="ways-in-title">Ways in</h2>
        <div>
          <h3>Questions to read</h3>
          <ul className="ways-in-questions">
            {startExamples(summary).map((e) => (
              <li key={e.question}>
                <NavLink
                  href={startHref(e.action, summary)}
                  onOpen={() => onAction(e.action)}
                >
                  {e.question}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3>Tools to use</h3>
          <ul className="ways-in-tools">
            {readerTools.map((tool) => (
              <li key={tool.id}>
                <ToolLink tool={tool} ids={summary} onAction={onAction} />
              </li>
            ))}
          </ul>
        </div>
      </nav>
      <section className="landing-entries" aria-labelledby="start-covered">
        <h2 id="start-covered">What’s covered</h2>
        <HubCards summary={summary} onAction={onAction} />
      </section>
      <section className="landing-gaps" aria-labelledby="start-not-covered">
        <h2 id="start-not-covered">Not yet covered</h2>
        <p>
          Coverage is selective. The largest gaps are whether developers
          followed their own frameworks, model capabilities, most export
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
          ' Dates after the latest check are scheduled dates stated in the sources.'}
      </p>
    </main>
  );
}
