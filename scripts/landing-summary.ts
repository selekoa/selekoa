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

/** The five data files, validated, as the application reads them. */
export async function loadDataset(watch?: (file: string) => void) {
  const input = Object.fromEntries(
    files.map((name) => {
      const file = path.resolve('data', `${name}.json`);
      watch?.(file);
      return [name, JSON.parse(readFileSync(file, 'utf8'))];
    }),
  );
  const { datasetSchema } = await load<typeof import('../src/domain/schema')>(
    'src/domain/schema.ts',
  );
  return datasetSchema.parse(input);
}

/** Serves `virtual:site-facts`, dataset-wide values (src/domain/site-facts.ts). */
export function siteFactsModule(): Plugin {
  const id = 'virtual:site-facts';
  return {
    name: 'selekoa-site-facts',
    resolveId: (source) => (source === id ? '\0' + id : undefined),
    async load(source) {
      if (source !== '\0' + id) return;
      const data = await loadDataset((file) => this.addWatchFile(file));
      const { siteFacts } = await load<
        typeof import('../src/domain/site-facts')
      >('src/domain/site-facts.ts');
      return `export default ${JSON.stringify(siteFacts(data))};`;
    },
  };
}

/**
 * Serves `virtual:about-facts`, the figures About & method shows
 * (src/domain/about-facts.ts).
 */
export function aboutFactsModule(): Plugin {
  const id = 'virtual:about-facts';
  return {
    name: 'selekoa-about-facts',
    resolveId: (source) => (source === id ? '\0' + id : undefined),
    async load(source) {
      if (source !== '\0' + id) return;
      const data = await loadDataset((file) => this.addWatchFile(file));
      const { aboutFacts } = await load<
        typeof import('../src/domain/about-facts')
      >('src/domain/about-facts.ts');
      return `export default ${JSON.stringify(aboutFacts(data))};`;
    },
  };
}

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
