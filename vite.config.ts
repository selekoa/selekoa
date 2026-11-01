import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { releaseDownloads } from './scripts/release-zip.ts';
import {
  aboutFactsModule,
  landingSummaryModule,
  siteFactsModule,
} from './scripts/landing-summary.ts';
import { searchIndexModule } from './scripts/search-index.ts';
import { siteModule } from './scripts/site-config.ts';

export default defineConfig(({ isSsrBuild }) => ({
  // Pages have real paths (/person/<id>), so assets load from the site root.
  base: '/',
  plugins: [
    react(),
    releaseDownloads(),
    landingSummaryModule(),
    siteFactsModule(),
    aboutFactsModule(),
    searchIndexModule(),
    siteModule(),
  ],
  // The page renderer (src/prerender/render.tsx) is built as one bundle with
  // every dependency inside and no Node-only import, as a worker would need.
  ssr: { noExternal: true, target: 'webworker' },
  server: { host: '127.0.0.1', port: 5173, strictPort: true },
  preview: { host: '127.0.0.1', port: 4173, strictPort: true },
  build: {
    // The page renderer is one file. In the browser the records are
    // modules of their own (the relation core, the content, the search index
    // and the slices; docs/data-loading-design-c.md), so a code change does
    // not invalidate a cached copy of the data, nor a data change the code.
    rolldownOptions: {
      output: isSsrBuild ? { codeSplitting: false } : {},
    },
    copyPublicDir: !isSsrBuild,
    manifest: !isSsrBuild,
    // The records' content module grows with the corpus and loads only when
    // a page needs the whole records. Code chunks stay far below this limit.
    chunkSizeWarningLimit: 8192,
  },
  test: {
    include: ['src/**/*.test.ts'],
    // Several suites load and validate the whole dataset, and some render
    // packs through Prettier. With one worker per core they time out on a
    // loaded machine (five-second default); two workers and a generous
    // timeout make the default run dependable. Override with --maxWorkers.
    maxWorkers: 2,
    testTimeout: 60_000,
    hookTimeout: 60_000,
  },
}));
