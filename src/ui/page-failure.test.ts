import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

/**
 * A change of page in the browser that fails is made by the browser
 * (src/ui/page-failure.ts): the link just followed, or the address in view
 * once it differs from the one loaded; nothing during the first load, so
 * that a page loaded afresh never loads itself again and again.
 */
type Listener = (event: unknown) => void;
let listeners: Listener[];
let location: {
  href: string;
  origin: string;
  pathname: string;
  search: string;
  hash: string;
  assign: ReturnType<typeof vi.fn>;
  reload: ReturnType<typeof vi.fn>;
};
const goTo = (address: string) => {
  const url = new URL(address, 'https://selekoa.test');
  Object.assign(location, {
    href: url.href,
    pathname: url.pathname,
    search: url.search,
    hash: url.hash,
  });
};

class Anchor {
  target = '';
  constructor(public href: string) {}
  hasAttribute() {
    return false;
  }
  closest() {
    return this;
  }
}

async function load(at: string) {
  vi.resetModules();
  listeners = [];
  location = {
    href: '',
    origin: 'https://selekoa.test',
    pathname: '/',
    search: '',
    hash: '',
    assign: vi.fn(),
    reload: vi.fn(),
  };
  goTo(at);
  vi.stubGlobal('HTMLAnchorElement', Anchor);
  vi.stubGlobal('window', {
    location,
    addEventListener: (_: string, listener: Listener) =>
      listeners.push(listener),
  });
  const failure = await import('./page-failure');
  failure.noteLinks();
  return failure;
}
const click = (href: string, extra: object = {}) =>
  listeners.forEach((l) =>
    l({ button: 0, target: new Anchor(href), ...extra }),
  );

beforeEach(() => {
  vi.spyOn(console, 'error').mockImplementation(() => {});
});
afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe('a change of page that fails', () => {
  it('does nothing during the first load of a page', async () => {
    const { pageFailed } = await load('/dossier/openai');
    expect(pageFailed('Failed', new Error('x'))).toBe(false);
    expect(location.assign).not.toHaveBeenCalled();
    expect(location.reload).not.toHaveBeenCalled();
  });

  it('opens the link just followed, even before the address changed', async () => {
    const { pageFailed } = await load('/');
    click('https://selekoa.test/dossier/openai?view=map');
    expect(pageFailed('Failed', new Error('x'))).toBe(true);
    expect(location.assign).toHaveBeenCalledWith('/dossier/openai?view=map');
  });

  it('reloads when the link’s address is already in view', async () => {
    const { pageFailed } = await load('/dossier/openai');
    click('https://selekoa.test/dossier/anthropic');
    goTo('/dossier/anthropic');
    pageFailed('Failed', new Error('x'));
    expect(location.reload).toHaveBeenCalledTimes(1);
    // Once: a second failure while the page is leaving changes nothing.
    pageFailed('Failed', new Error('y'));
    expect(location.reload).toHaveBeenCalledTimes(1);
  });

  it('reloads an address reached by a step back or forward', async () => {
    const { pageFailed } = await load('/dossier/openai');
    goTo('/dossier/anthropic');
    expect(pageFailed('Failed', new Error('x'))).toBe(true);
    expect(location.reload).toHaveBeenCalled();
  });

  it('ignores links to other sites, files, and new tabs, and old clicks', async () => {
    const { pageToLoad } = await load('/dossier/openai');
    click('https://elsewhere.test/page');
    click('https://selekoa.test/data/claims.json');
    click('https://selekoa.test/dossier/anthropic', { ctrlKey: true });
    expect(pageToLoad()).toBeNull();
    click('https://selekoa.test/dossier/anthropic');
    expect(pageToLoad()).toBe('/dossier/anthropic');
    expect(pageToLoad(Date.now() + 60_000)).toBeNull();
  });
});
