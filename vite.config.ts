import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { releaseDownloads } from './scripts/release-zip.ts';
import { landingSummaryModule } from './scripts/landing-summary.ts';
import { siteModule } from './scripts/site-config.ts';

export default defineConfig({
  // Relative asset URLs: the build works from a host root or any sub-path
  // (the addresses are hash-based, so no server rewrite is needed).
  base: './',
  plugins: [react(), releaseDownloads(), landingSummaryModule(), siteModule()],
  server: { host: '127.0.0.1', port: 5173, strictPort: true },
  preview: { host: '127.0.0.1', port: 4173, strictPort: true },
  build: {
    // The records are one chunk of their own, so a code change does not
    // invalidate a cached copy of the data, nor a data change the code.
    rolldownOptions: {
      output: {
        codeSplitting: {
          groups: [{ name: 'records', test: /\/data\/[^/]+\.json$/ }],
        },
      },
    },
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
});
