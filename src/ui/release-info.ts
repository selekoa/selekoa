import type { Dataset } from '../domain/schema';

type ManifestSummary = {
  version: string;
  releasedAt: string;
  dataset: { schemaVersion: string; updatedAt: string };
  counts: Record<'entities' | 'claims' | 'evidence' | 'sources', number>;
};

const manifests = Object.values(
  import.meta.glob<ManifestSummary>('../../release/v*/manifest.json', {
    eager: true,
    import: 'default',
  }),
);
const parts = (v: string) => v.split('.').map(Number);
const newer = (a: ManifestSummary, b: ManifestSummary) => {
  const [x, y] = [parts(a.version), parts(b.version)];
  return x[0] - y[0] || x[1] - y[1] || x[2] - y[2];
};

/** The newest dataset release in this build, if any. */
export const latestRelease =
  [...manifests].sort((a, b) => newer(b, a))[0] ?? null;

/** The local archive built from the release files (scripts/release-zip.ts). */
export const releaseDownload = (version: string) =>
  `release/selekoa-dataset-v${version}.zip`;

/** Whether the loaded records visibly differ from the release's. */
export function changedSinceRelease(data: Dataset, release: ManifestSummary) {
  return (
    data.meta.updatedAt !== release.dataset.updatedAt ||
    data.meta.schemaVersion !== release.dataset.schemaVersion ||
    data.entities.length !== release.counts.entities ||
    data.claims.length !== release.counts.claims ||
    data.evidence.length !== release.counts.evidence ||
    data.sources.length !== release.counts.sources
  );
}
