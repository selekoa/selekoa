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
 * A dossier's claim count. The 2026-10-17 lab genealogy (`lg-` records)
 * adds records to several dossiers; the earlier records must keep the count
 * the tests recorded before it.
 */
export function dossierCount(id: string, earlier: number) {
  const claims = institutionalDossier(data, id)!.claims;
  const before = claims.filter((c) => !c.id.startsWith('lg-')).length;
  if (before !== earlier)
    throw new Error(`${id}: ${before} earlier records, expected ${earlier}`);
  return claims.length;
}
