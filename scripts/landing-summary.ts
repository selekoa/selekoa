// Serves the start page's summary as a small module computed from the data
// files, so the first page does not need the full dataset. The summary is
// derived on every build and dev load and is never tracked.
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import type { Plugin } from 'vite';
import { tsImport } from 'tsx/esm/api';

const moduleId = 'virtual:landing-summary';
const resolvedId = '\0' + moduleId;
const files = ['meta', 'entities', 'claims', 'sources', 'evidence'] as const;

/** Loads an application module fresh, outside the config's own imports. */
const load = <T>(file: string): Promise<T> =>
  tsImport(pathToFileURL(path.resolve(file)).href, import.meta.url);

export function landingSummaryModule(): Plugin {
  return {
    name: 'selekoa-landing-summary',
    resolveId: (id) => (id === moduleId ? resolvedId : undefined),
    async load(id) {
      if (id !== resolvedId) return;
      const input = Object.fromEntries(
        files.map((name) => {
          const file = path.resolve('data', `${name}.json`);
          this.addWatchFile(file);
          return [name, JSON.parse(readFileSync(file, 'utf8'))];
        }),
      );
      const { datasetSchema } = await load<
        typeof import('../src/domain/schema')
      >('src/domain/schema.ts');
      const { landingSummary } = await load<
        typeof import('../src/domain/landing')
      >('src/domain/landing.ts');
      const summary = landingSummary(datasetSchema.parse(input));
      return `export default ${JSON.stringify(summary)};`;
    },
  };
}
