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
 * collection (`c2-` records), the 2026-10-28 frameworks-to-law admission
 * (`fl-` records), the 2026-10-30 compute, power and orbit and AI and
 * biosecurity admissions (`cpo-` and `ab-` records), and the 2026-10-31 AI in
 * biology, people and technical history admissions (`aib-`, `pp-` and `th-`
 * records), the 2026-10-31 China III admission (`c3-` records) and the
 * 2026-10-31 risk-debate admission (`rd-` records) add records to several
 * dossiers; the earlier records must keep the
 * count the tests recorded before them. The 2026-10-31 key papers admission
 * (`kp-` records) also places earlier records in a dossier: its authorship
 * records add documents through the institution's people, and the earlier
 * claims about those documents follow. Its records are therefore taken out of
 * the dataset before the dossier is read. The 2026-11-01 second lab genealogy
 * (`lg2-` records) does the same through the people it adds to an
 * institution (Anthropic gains nine earlier records that way), so its records
 * are taken out too. The 2026-11-03 model-cards admission (`mc-` records)
 * adds the cards' publication by their developers and the cards' citations
 * of framework editions; its records are left out of the earlier count. The
 * 2026-11-04 antecedent-texts admission (`pre-` records) adds authorship
 * records for Turing and Wiener; its records are left out too, as are those
 * of the 2026-11-04 laws-compared admission (`lc-` records), which adds the
 * effect rule of New York's 2025 RAISE Act text, and those of the
 * 2026-11-05 predictions admission (`pr-` records), which add predictions
 * stated in documents the dossiers may already list.
 */
const beforeKeyPapers = {
  ...data,
  claims: data.claims.filter(
    (c) => !c.id.startsWith('kp-') && !c.id.startsWith('lg2-'),
  ),
};
export function dossierCount(id: string, earlier: number) {
  const claims = institutionalDossier(data, id)!.claims;
  const before = institutionalDossier(beforeKeyPapers, id)!.claims.filter(
    (c) =>
      !c.id.startsWith('lg-') &&
      !c.id.startsWith('ap-') &&
      !c.id.startsWith('c2-') &&
      !c.id.startsWith('fl-') &&
      !c.id.startsWith('cpo-') &&
      !c.id.startsWith('ab-') &&
      !c.id.startsWith('aib-') &&
      !c.id.startsWith('pp-') &&
      !c.id.startsWith('th-') &&
      !c.id.startsWith('c3-') &&
      !c.id.startsWith('rd-') &&
      !c.id.startsWith('mc-') &&
      !c.id.startsWith('pre-') &&
      !c.id.startsWith('lc-') &&
      !c.id.startsWith('pr-'),
  ).length;
  if (before !== earlier)
    throw new Error(`${id}: ${before} earlier records, expected ${earlier}`);
  return claims.length;
}
