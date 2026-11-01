import type { Coverage } from '../domain/coverage';

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

/**
 * Whether the records visibly differ from the release's, by the dataset's
 * counts and description (`coverage` in src/domain/coverage.ts).
 */
export function changedSinceRelease(
  dataset: Pick<
    Coverage,
    | 'updatedAt'
    | 'schemaVersion'
    | 'entities'
    | 'claims'
    | 'evidence'
    | 'sources'
  >,
  release: ManifestSummary,
) {
  return (
    dataset.updatedAt !== release.dataset.updatedAt ||
    dataset.schemaVersion !== release.dataset.schemaVersion ||
    dataset.entities !== release.counts.entities ||
    dataset.claims !== release.counts.claims ||
    dataset.evidence !== release.counts.evidence ||
    dataset.sources !== release.counts.sources
  );
}
