// Writes each comparison as a CSV file beside its page
// (/compare/<id>.csv), from the same records and view as the page
// (src/domain/comparison-csv.ts, src/domain/model-cards-csv.ts,
// src/domain/law-comparison-csv.ts). Derived on every build; never tracked.
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import type { Plugin } from 'vite';
import { tsImport } from 'tsx/esm/api';
import { loadDataset } from './landing-summary.ts';
import { readSiteConfig } from './site-config.ts';

const load = <T>(file: string): Promise<T> =>
  tsImport(pathToFileURL(path.resolve(file)).href, import.meta.url);

/** Each file's published path and its text: Compare frameworks, model cards, laws, predictions, then AI and money. */
export async function comparisonCsvFiles() {
  const data = await loadDataset();
  const { comparisonCsv } = await load<
    typeof import('../src/domain/comparison-csv')
  >('src/domain/comparison-csv.ts');
  const { modelCardsCsv } = await load<
    typeof import('../src/domain/model-cards-csv')
  >('src/domain/model-cards-csv.ts');
  const { frameworkComparison } = await load<
    typeof import('../src/reading/framework-comparison')
  >('src/reading/framework-comparison.ts');
  const { lawsComparedCsv } = await load<
    typeof import('../src/domain/law-comparison-csv')
  >('src/domain/law-comparison-csv.ts');
  const { lawsCompared } = await load<
    typeof import('../src/reading/laws-compared')
  >('src/reading/laws-compared.ts');
  const { modelCards } = await load<
    typeof import('../src/reading/model-cards')
  >('src/reading/model-cards.ts');
  const { predictionsCsv } = await load<
    typeof import('../src/domain/predictions-csv')
  >('src/domain/predictions-csv.ts');
  const { predictionsOnRecord } = await load<
    typeof import('../src/reading/predictions')
  >('src/reading/predictions.ts');
  const { predictionsCsvPath } = await load<
    typeof import('../src/reading/predictions-page')
  >('src/reading/predictions-page.ts');
  const { propositionsCsv, propositionsCsvPath } = await load<
    typeof import('../src/domain/propositions-csv')
  >('src/domain/propositions-csv.ts');
  const { aiAndMoney } = await load<
    typeof import('../src/reading/ai-and-money')
  >('src/reading/ai-and-money.ts');
  const { comparisonCsvPath } = await load<
    typeof import('../src/domain/addresses')
  >('src/domain/addresses.ts');
  const { baseUrl } = readSiteConfig();
  return [
    {
      fileName: comparisonCsvPath(frameworkComparison.id).slice(1),
      source: comparisonCsv(data, frameworkComparison, baseUrl),
    },
    {
      fileName: comparisonCsvPath(modelCards.id).slice(1),
      source: modelCardsCsv(
        data,
        modelCards,
        frameworkComparison.families,
        baseUrl,
      ),
    },
    {
      fileName: comparisonCsvPath(lawsCompared.id).slice(1),
      source: lawsComparedCsv(data, lawsCompared, baseUrl),
    },
    {
      fileName: predictionsCsvPath.slice(1),
      source: predictionsCsv(data, predictionsOnRecord, baseUrl),
    },
    {
      fileName: propositionsCsvPath(aiAndMoney.id).slice(1),
      source: propositionsCsv(data, aiAndMoney, baseUrl),
    },
  ];
}

export function comparisonCsvModule(): Plugin {
  return {
    name: 'selekoa-comparison-csv',
    async generateBundle() {
      // The page renderer's bundle carries no site files.
      if (this.environment?.config.consumer === 'server') return;
      for (const file of await comparisonCsvFiles())
        this.emitFile({ type: 'asset', ...file });
    },
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (
          !/^\/(compare|predictions|propositions)\/[^/]+\.csv$/.test(
            req.url ?? '',
          )
        )
          return next();
        void comparisonCsvFiles().then((files) => {
          const file = files.find((f) => `/${f.fileName}` === req.url);
          if (!file) return next();
          res.setHeader('Content-Type', 'text/csv; charset=utf-8');
          res.end(file.source);
        }, next);
      });
    },
  };
}
