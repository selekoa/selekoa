import { readFileSync } from 'node:fs';
import { institutionalDossier } from '../../src/domain/dossier';
import { datasetSchema } from '../../src/domain/schema';

const data = datasetSchema.parse(
  Object.fromEntries(
    ['meta', 'entities', 'claims', 'sources', 'evidence'].map((name) => [
      name,
      JSON.parse(
        readFileSync(
          new URL('../../data/' + name + '.json', import.meta.url),
          'utf8',
        ),
      ),
    ]),
  ),
);

/**
 * A dossier's claim count. The 2026-10-17 lab genealogy (`lg-` records),
 * the 2026-10-27 author-person admission (`ap-` authorship records, which add
 * the papers of their people), the 2026-10-27 second Chinese institutions
 * collection (`c2-` records) and the 2026-10-28 frameworks-to-law admission
 * (`fl-` records) add records to several dossiers; the earlier records must
 * keep the count the tests recorded before them.
 */
export function dossierCount(id: string, earlier: number) {
  const claims = institutionalDossier(data, id)!.claims;
  const before = claims.filter(
    (c) =>
      !c.id.startsWith('lg-') &&
      !c.id.startsWith('ap-') &&
      !c.id.startsWith('c2-') &&
      !c.id.startsWith('fl-'),
  ).length;
  if (before !== earlier)
    throw new Error(`${id}: ${before} earlier records, expected ${earlier}`);
  return claims.length;
}
