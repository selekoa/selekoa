import type { Coverage } from '../domain/coverage';
import latest from 'virtual:latest-release';

export type ManifestSummary = {
  version: string;
  releasedAt: string;
  dataset: { schemaVersion: string; updatedAt: string };
  counts: Record<'entities' | 'claims' | 'evidence' | 'sources', number>;
};

/**
 * The newest dataset release in this build, if any: only the fields shown,
 * from the build (`virtual:latest-release`), not every release's manifest.
 */
export const latestRelease: ManifestSummary | null = latest;

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
