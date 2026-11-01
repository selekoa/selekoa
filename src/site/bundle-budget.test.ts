import { describe, expect, it } from 'vitest';
import {
  filesLoaded,
  pageTypes,
  pageWeights,
  type Manifest,
} from './bundle-budget';
import { pagePaths } from '../prerender/pages';
import { repository } from '../domain/repository';

const manifest: Manifest = {
  'index.html': {
    file: 'assets/index.js',
    imports: ['_shared.js'],
    css: ['assets/index.css'],
  },
  '_shared.js': { file: 'assets/shared.js' },
  'src/Workspace.tsx': {
    file: 'assets/Workspace.js',
    imports: ['index.html', '_shared.js', '_records.js'],
  },
  '_records.js': { file: 'assets/records.js' },
  'src/ui/Search.tsx': {
    file: 'assets/Search.js',
    imports: ['index.html'],
    css: ['assets/Search.css'],
  },
};

describe('bundle budget', () => {
  it('follows static imports and stylesheets once each', () => {
    expect(
      filesLoaded(manifest, ['src/Workspace.tsx', 'src/ui/Search.tsx']),
    ).toEqual([
      'assets/Search.css',
      'assets/Search.js',
      'assets/Workspace.js',
      'assets/index.css',
      'assets/index.js',
      'assets/records.js',
      'assets/shared.js',
    ]);
  });

  it('fails on a module the manifest does not have', () => {
    expect(() => filesLoaded(manifest, ['src/ui/Gone.tsx'])).toThrow(/Gone/);
  });

  it('adds data files and compares with the limit', () => {
    const size = (file: string) => (file === 'assets/records.js' ? 900 : 100);
    const [light, heavy] = pageWeights(manifest, size, [
      {
        name: 'a',
        path: '/',
        modules: ['index.html'],
        data: ['x.json'],
        limitKb: 0.4,
      },
      { name: 'b', path: '/x', modules: ['src/Workspace.tsx'], limitKb: 1 },
    ]);
    expect(light).toMatchObject({ bytes: 400, over: false });
    expect(light.files).toContain('x.json');
    expect(heavy).toMatchObject({ bytes: 1300, over: true });
  });

  it('counts the relation core for a page whose slice needs it', () => {
    const withCore = {
      ...manifest,
      'virtual:records-core': { file: 'assets/core.js' },
    };
    const size = (file: string) => (file === 'assets/core.js' ? 5000 : 100);
    const type = {
      name: 'a',
      path: '/x',
      modules: ['index.html'],
      data: ['slices/x.json'],
      limitKb: 1,
    };
    const [alone] = pageWeights(withCore, size, [type]);
    const [held] = pageWeights(withCore, size, [type], () => true);
    expect(alone.files).not.toContain('assets/core.js');
    expect(held.files).toContain('assets/core.js');
    expect(held).toMatchObject({ bytes: 5400, over: true });
  });

  it('measures pages the build writes', () => {
    const paths = new Set(pagePaths(repository.data));
    for (const type of pageTypes) expect(paths, type.path).toContain(type.path);
  });
});
