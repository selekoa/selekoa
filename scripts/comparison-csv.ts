// Writes the framework comparison as a CSV file beside its page
// (/compare/<id>.csv), from the same records and view as the page
// (src/domain/comparison-csv.ts). Derived on every build; never tracked.
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import type { Plugin } from 'vite';
import { tsImport } from 'tsx/esm/api';
import { loadDataset } from './landing-summary.ts';
import { readSiteConfig } from './site-config.ts';

const load = <T>(file: string): Promise<T> =>
  tsImport(pathToFileURL(path.resolve(file)).href, import.meta.url);

/** The file's published path and its text. */
export async function comparisonCsvFile() {
  const data = await loadDataset();
  const { comparisonCsv } = await load<
    typeof import('../src/domain/comparison-csv')
  >('src/domain/comparison-csv.ts');
  const { frameworkComparison } = await load<
    typeof import('../src/reading/framework-comparison')
  >('src/reading/framework-comparison.ts');
  const { comparisonCsvPath } = await load<
    typeof import('../src/domain/addresses')
  >('src/domain/addresses.ts');
  return {
    fileName: comparisonCsvPath(frameworkComparison.id).slice(1),
    source: comparisonCsv(data, frameworkComparison, readSiteConfig().baseUrl),
  };
}

export function comparisonCsvModule(): Plugin {
  return {
    name: 'selekoa-comparison-csv',
    async generateBundle() {
      // The page renderer's bundle carries no site files.
      if (this.environment?.config.consumer === 'server') return;
      this.emitFile({ type: 'asset', ...(await comparisonCsvFile()) });
    },
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (!/^\/compare\/[^/]+\.csv$/.test(req.url ?? '')) return next();
        void comparisonCsvFile().then((file) => {
          if (`/${file.fileName}` !== req.url) return next();
          res.setHeader('Content-Type', 'text/csv; charset=utf-8');
          res.end(file.source);
        }, next);
      });
    },
  };
}
