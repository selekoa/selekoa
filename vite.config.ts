import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { releaseDownloads } from './scripts/release-zip.ts';
import { landingSummaryModule } from './scripts/landing-summary.ts';
import { siteModule } from './scripts/site-config.ts';

export default defineConfig(({ isSsrBuild }) => ({
  // Pages have real paths (/person/<id>), so assets load from the site root.
  base: '/',
  plugins: [react(), releaseDownloads(), landingSummaryModule(), siteModule()],
  // The page renderer (src/prerender/render.tsx) is built as one bundle with
  // every dependency inside and no Node-only import, as a worker would need.
  ssr: { noExternal: true, target: 'webworker' },
  server: { host: '127.0.0.1', port: 5173, strictPort: true },
  preview: { host: '127.0.0.1', port: 4173, strictPort: true },
  build: {
    // The records are one chunk of their own, so a code change does not
    // invalidate a cached copy of the data, nor a data change the code. The
    // page renderer is one file.
    rolldownOptions: {
      output: isSsrBuild
        ? { codeSplitting: false }
        : {
            codeSplitting: {
              groups: [{ name: 'records', test: /\/data\/[^/]+\.json$/ }],
            },
          },
    },
    copyPublicDir: !isSsrBuild,
    // The records chunk grows with the corpus and loads after the start
    // page. Code chunks stay far below this limit.
    chunkSizeWarningLimit: 4096,
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
