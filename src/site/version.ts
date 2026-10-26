/** Reader wording for the project's version status, from a dataset release version. */

/** "0.x" for any 0.y.z release; "N.x" otherwise. Null before any release. */
export function seriesLabel(releaseVersion: string | null) {
  const major = releaseVersion?.split('.')[0];
  return major && /^\d+$/.test(major) ? `${major}.x` : null;
}

/** The status phrase for the start page: version series and its meaning. */
export function versionStatus(releaseVersion: string | null) {
  const series = seriesLabel(releaseVersion);
  if (!series) return 'a work in progress';
  return series.startsWith('0.')
    ? `version ${series}, a work in progress`
    : `version ${series}`;
}
