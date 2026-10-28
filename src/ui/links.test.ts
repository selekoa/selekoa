import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { repository } from '../domain/repository';
import { landingSummary } from '../domain/landing';
import { resolveReference } from '../domain/deep-links';
import { appearances } from '../domain/appearances';
import { hubOutline } from './Hub';
import { RecordHref, RecordLink } from './NavLink';
import { startHref, type StartAction } from './SiteChrome';
import { startIds } from './start-ids';

const data = repository.data;
const summary = landingSummary(data);

describe('real links: every navigation address resolves', () => {
  it('gives each start-page and hub action an address that opens a page', () => {
    const actions: StartAction[] = [
      ...(['governance', 'ideas', 'institutions'] as const).flatMap((hub) => [
        { kind: 'hub' as const, id: hub },
        ...hubOutline(summary, hub).examples.map((e) => e.action),
      ]),
      { kind: 'documents' },
      { kind: 'commitments' },
      { kind: 'reading' },
      { kind: 'about' },
      { kind: 'search', q: 'ASL-3' },
      ...summary.controls.map((c) => ({ kind: 'control' as const, id: c.id })),
      ...summary.propositions.map((p) => ({
        kind: 'propositions' as const,
        id: p.id,
      })),
      ...summary.questions.map((q) => ({
        kind: 'question' as const,
        id: q.id,
      })),
      ...summary.dossiers.map((d) => ({ kind: 'dossier' as const, id: d.id })),
      { kind: 'dossier', id: 'openai', view: 'map' },
      ...summary.people.flatMap((g) =>
        g.people.map((p) => ({ kind: 'person' as const, id: p.id })),
      ),
    ];
    for (const action of actions) {
      const href = startHref(action, summary);
      const resolved = resolveReference(href, data);
      expect(resolved.notice, href).toBeNull();
      expect(resolved.target, href).not.toBeNull();
      // The ids the workspace uses match the start page's summary.
      expect(startHref(action, startIds)).toBe(href);
    }
  });

  it('links every “Appears in” collection to its page', () => {
    for (const a of appearances(data, 'eliezer-yudkowsky')) {
      const resolved = resolveReference(startHref(a.target, startIds), data);
      expect(resolved.target).not.toBeNull();
    }
  });

  it('renders a record with an address as a link, and one without as a button', () => {
    const link = (href?: string) =>
      renderToStaticMarkup(
        createElement(
          RecordHref.Provider,
          { value: () => href },
          createElement(RecordLink, {
            id: 'x',
            onOpen: () => {},
            children: 'X',
          }),
        ),
      );
    expect(link('/person/x')).toBe(
      '<a href="/person/x" class="nav-link">X</a>',
    );
    expect(link()).toBe('<button>X</button>');
  });
});
