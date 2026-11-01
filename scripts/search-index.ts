// Serves the static search index (src/domain/search-index.ts) as modules, so
// that Vite hashes each file into /assets/ (cached as immutable) and the dev
// server serves them too. `virtual:search-index` holds the manifest, the
// search page's facets and a loader per file; each file is a module of its
// own, `virtual:search-index/<kind>/<n>`, loaded when a query needs it.
// Computed from the data files on every build and dev load; never tracked.
// See docs/data-loading-design-c.md ("Search index").
import path from 'node:path';
import { createServer, type Plugin } from 'vite';
import { landingSummaryModule, siteFactsModule } from './landing-summary.ts';
import { siteModule } from './site-config.ts';
import type { IndexFiles } from '../src/domain/search-index.ts';
import type { SearchFacets } from '../src/ui/search-facets.ts';

const moduleId = 'virtual:search-index';
// The relation core of per-page data (src/domain/slices.ts), built
// alongside. Each slice carries the collection index entries of its own
// records (src/domain/collection-index.ts).
const coreId = 'virtual:records-core';
// The rest of every record, which with the core makes the whole dataset.
const contentId = 'virtual:records-content';
const kinds = ['postings', 'chunk', 'collection', 'organisation'] as const;
type Kind = (typeof kinds)[number];
const lists: Record<Kind, keyof IndexFiles> = {
  postings: 'postings',
  chunk: 'chunks',
  collection: 'collections',
  organisation: 'organisations',
};

/**
 * The index and facets of the data files, as the application builds them.
 * The application's modules are loaded through a Vite server of their own,
 * which handles their stylesheet and virtual-module imports, during the
 * build and the dev server alike: the project's configuration bundles every
 * dependency for a worker, which Node cannot evaluate.
 */
export async function searchIndexFiles() {
  const own = await createServer({
    // The application's own virtual modules, with dependencies loaded by
    // Node as usual (the config bundles them for a worker instead).
    configFile: false,
    plugins: [landingSummaryModule(), siteFactsModule(), siteModule()],
    server: { middlewareMode: true, hmr: false, watch: null },
    appType: 'custom',
    optimizeDeps: { noDiscovery: true, include: [] },
    logLevel: 'error',
  });
  try {
    const load = <T>(file: string) => own.ssrLoadModule(file) as Promise<T>;
    const { repository } = await load<
      typeof import('../src/domain/repository')
    >('/src/domain/repository.ts');
    const { buildIndexFiles } = await load<
      typeof import('../src/domain/search-index')
    >('/src/domain/search-index.ts');
    const { searchFacets } = await load<
      typeof import('../src/ui/search-facets')
    >('/src/ui/search-facets.ts');
    const { coreOf, contentOf } = await load<
      typeof import('../src/domain/slices')
    >('/src/domain/slices.ts');
    const facets: SearchFacets = searchFacets(repository.data);
    const files: IndexFiles = buildIndexFiles(repository.data, {
      collections: facets.collections,
      organisations: facets.organisations.map((o) => o.id),
    });
    return {
      facets,
      files,
      core: coreOf(repository.data),
      content: contentOf(repository.data),
    };
  } finally {
    await own.close();
  }
}

/** JSON as a module whose value is parsed once, faster than a literal. */
const jsonModule = (value: unknown) =>
  `export default JSON.parse(${JSON.stringify(JSON.stringify(value))});`;

export function searchIndexModule(): Plugin {
  let built: ReturnType<typeof searchIndexFiles> | null = null;
  return {
    name: 'selekoa-search-index',
    resolveId: (id) =>
      id === moduleId ||
      id.startsWith(`${moduleId}/`) ||
      id === coreId ||
      id === contentId
        ? '\0' + id
        : undefined,
    async load(id) {
      if (!id.startsWith('\0virtual:')) return;
      // A data change during development rebuilds every module built here.
      for (const name of ['meta', 'entities', 'claims', 'sources', 'evidence'])
        this.addWatchFile(path.resolve('data', `${name}.json`));
      if (id === '\0' + coreId || id === '\0' + contentId) {
        built ??= searchIndexFiles();
        const { core, content } = await built;
        return jsonModule(id === '\0' + coreId ? core : content);
      }
      if (!id.startsWith('\0' + moduleId)) return;
      built ??= searchIndexFiles();
      const { facets, files } = await built;
      const part = id.slice(1 + moduleId.length);
      if (!part) {
        const loaders = kinds.map((kind) => {
          const count = (files[lists[kind]] as unknown[]).length;
          const imports = Array.from(
            { length: count },
            (_, i) => `() => import('${moduleId}/${kind}/${i}')`,
          );
          return `${kind}: [${imports.join(',\n')}]`;
        });
        return [
          `export const manifest = ${jsonModule(files.manifest).slice('export default '.length)}`,
          `export const facets = ${jsonModule(facets).slice('export default '.length)}`,
          `const files = {${loaders.join(',\n')}};`,
          `const open = (kind) => (i) => files[kind][i]().then((m) => m.default);`,
          `export const load = { ${kinds.map((k) => `${k}: open('${k}')`).join(', ')} };`,
        ].join('\n');
      }
      const [, kind, n] = part.split('/');
      const list = files[lists[kind as Kind]] as unknown[] | undefined;
      const value = list?.[Number(n)];
      if (value === undefined) throw new Error(`No search index file ${id}`);
      return jsonModule(value);
    },
    // A data change during development rebuilds the index.
    watchChange(id) {
      if (id.replaceAll('\\', '/').includes('/data/')) built = null;
    },
  };
}
