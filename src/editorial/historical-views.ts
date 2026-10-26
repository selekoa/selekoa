// Test-only historical views. An authorised change to stored rows that a
// stored pack, packet or baseline hash depends on records a before-snapshot,
// `review/<increment>-before-<date>.json`: the earlier metadata, the IDs the
// change added, the rows it changed as they were before, and the hashes of
// the earlier dataset. Reverting the snapshots newest first reproduces each
// earlier dataset exactly, so stored references stay checkable without being
// rewritten. A new snapshot is one entry in the chain below, not a new module,
// and is needed only when something stored depends on the earlier state.
import meta from '../../data/meta.json';
import entities from '../../data/entities.json';
import claims from '../../data/claims.json';
import sources from '../../data/sources.json';
import evidence from '../../data/evidence.json';
import recheckCorrections from '../../review/recheck-corrections-before-2026-10-25.json';
import genealogy from '../../review/genealogy-admission-before-2026-10-17.json';
import y24Followup from '../../review/y24-followup-before-2026-10-17.json';
import crossFamily from '../../review/cross-family-dispositions-before-2026-10-17.json';
import esoteric from '../../review/esoteric-admission-before-2026-10-16.json';
import citationAuthors from '../../review/citation-authors-before-2026-10-15.json';
import researchDebt from '../../review/research-debt-before-2026-10-15.json';
import readerTextIds from '../../review/reader-text-ids-before-2026-10-15.json';
import economics from '../../review/economics-admission-before-2026-10-14.json';
import quoteTrims from '../../review/quote-trims-before-2026-10-13.json';
import frontierGovernance2 from '../../review/frontier-governance-2-before-2026-10-11.json';
import frontierGovernance from '../../review/frontier-governance-before-2026-10-10.json';
import noteWording from '../../review/evidence-note-wording-before-2026-10-11.json';
import waybackDates from '../../review/wayback-capture-dates-before-2026-10-09.json';
import yudkowsky from '../../review/yudkowsky-admission-before-2026-10-08.json';
import earliestFixes from '../../review/thought-spine-earliest-fixes-before-2026-10-06.json';
import thoughtSpine from '../../review/thought-spine-before-2026-10-06.json';
import fixPass from '../../review/fix-pass-before-2026-10-05.json';
import week4c from '../../review/week4c-before-2026-10-04.json';
import week4b from '../../review/week4b-before-2026-10-04.json';
import week4a from '../../review/week4a-before-2026-10-03.json';

type Row = { id: string };
type Name = 'entities' | 'claims' | 'sources' | 'evidence';
const names: Name[] = ['entities', 'claims', 'sources', 'evidence'];

export type Snapshot = {
  meta: unknown;
  added: Record<Name, string[]>;
  before: Record<Name, unknown[]>;
  /** Earlier row order, where a change reordered rows. */
  order?: Record<Name, string[] | null>;
};
type Raw = { meta: unknown } & { [N in Name]: Row[] };

/** The dataset as it was before the change that `snapshot` records. */
export function revert<R extends Raw>(raw: R, snapshot: Snapshot): R {
  const restore = (rows: Row[], name: Name) => {
    const added = new Set(snapshot.added[name]);
    const prior = new Map(
      (snapshot.before[name] as Row[]).map((row) => [row.id, row]),
    );
    const kept = rows
      .filter((row) => !added.has(row.id))
      .map((row) => structuredClone(prior.get(row.id) ?? row));
    const order = snapshot.order?.[name];
    if (!order) return kept;
    const position = new Map(order.map((id, i) => [id, i]));
    return kept.sort((a, b) => position.get(a.id)! - position.get(b.id)!);
  };
  const reverted = { ...raw, meta: structuredClone(snapshot.meta) } as R;
  for (const name of names) (reverted as Raw)[name] = restore(raw[name], name);
  return reverted;
}

const current = { meta, entities, claims, sources, evidence };

/** Raw stored rows at schema 2.15, before the 2026-10-25 re-check corrections (schema 2.16). */
export const preRecheckCorrectionsRaw = revert(current, recheckCorrections);
/** Raw stored rows at schema 2.14, before the 2026-10-17 lab genealogy admission (schema 2.15). */
export const preGenealogyRaw = revert(preRecheckCorrectionsRaw, genealogy);
/** Raw stored rows at schema 2.14, before the 2026-10-17 follow-up recheck of the remaining Y24 articulation. */
export const preY24FollowupRaw = revert(preGenealogyRaw, y24Followup);
/** Raw stored rows at schema 2.14, before the 2026-10-17 disposition of two cross-family checks. */
export const preCrossFamilyRaw = revert(preY24FollowupRaw, crossFamily);
/** Raw stored rows at schema 2.14, before the 2026-10-16 admission of the esoteric economics strand. */
export const preEsotericRaw = revert(preCrossFamilyRaw, esoteric);
/** Raw stored rows at schema 2.13, before the 2026-10-15 citation clean-up and structured author names (schema 2.14). */
export const preCitationAuthorsRaw = revert(preEsotericRaw, citationAuthors);
/** Raw stored rows at schema 2.13, before the 2026-10-15 research-debt pass. */
export const preResearchDebtRaw = revert(preCitationAuthorsRaw, researchDebt);
/** Raw stored rows at schema 2.13, before the 2026-10-15 removal of internal identifiers from reader-facing text. */
export const preReaderTextIdsRaw = revert(preResearchDebtRaw, readerTextIds);
/** Raw stored rows at schema 2.12, before the 2026-10-14 economics admission. */
export const preEconomicsRaw = revert(preReaderTextIdsRaw, economics);
/** Raw stored rows at schema 2.12, before the 2026-10-13 quotation trims. */
export const preQuoteTrimsRaw = revert(preEconomicsRaw, quoteTrims);
/** Raw stored rows at schema 2.12, before the 2026-10-11 second frontier-governance increment. */
export const preFrontierGovernance2Raw = revert(
  preQuoteTrimsRaw,
  frontierGovernance2,
);
/** Raw stored rows at schema 2.12, before the 2026-10-10 frontier-governance increment. */
export const preFrontierGovernanceRaw = revert(
  preFrontierGovernance2Raw,
  frontierGovernance,
);
/** Raw stored rows at schema 2.12, before the 2026-10-11 evidence-note rewording. */
export const preNoteWordingRaw = revert(preFrontierGovernanceRaw, noteWording);
/** Raw stored rows at schema 2.12, before the 2026-10-09 Wayback capture-date correction. */
export const preWaybackDatesRaw = revert(preNoteWordingRaw, waybackDates);
/** Raw stored rows at schema 2.11, before the 2026-10-08 Yudkowsky admission. */
export const preYudkowskyRaw = revert(preWaybackDatesRaw, yudkowsky);
/**
 * Raw stored rows at schema 2.11, before the corrections from the 2026-10-06
 * check of the earliest located records; the stored cross-model packet was
 * generated from them.
 */
export const preEarliestFixesRaw = revert(preYudkowskyRaw, earliestFixes);
/** Raw stored rows at schema 2.10, before the 2026-10-06 thought-spine admission. */
export const preThoughtSpineRaw = revert(preEarliestFixesRaw, thoughtSpine);
/** Raw stored rows at schema 2.9 as released in v0.1.0, before the 2026-10-05 fix pass. */
export const preFixPassRaw = revert(preThoughtSpineRaw, fixPass);
/** Raw stored rows as merged before the week 4c work. */
export const preWeek4cRaw = revert(preFixPassRaw, week4c);
/** Raw stored rows at schema 2.8, before the week 4b work. */
export const preControlRaw = revert(preWeek4cRaw, week4b);
/** Raw stored rows at schema 2.7, before the week 4a work. */
export const preProvisionsRaw = revert(preControlRaw, week4a);

/**
 * Snapshots in the chain, newest first, with the view each one reproduces.
 * The week 4b snapshot was taken at be7a450, before the week 4a
 * different-model corrections were merged, so its view still carries those
 * corrections and does not match its hashes; it is only a step towards the
 * pre-4a view, which restores the corrected rows and is exact.
 */
export const historicalViews = [
  { snapshot: recheckCorrections, view: preRecheckCorrectionsRaw, exact: true },
  { snapshot: genealogy, view: preGenealogyRaw, exact: true },
  { snapshot: y24Followup, view: preY24FollowupRaw, exact: true },
  { snapshot: crossFamily, view: preCrossFamilyRaw, exact: true },
  { snapshot: esoteric, view: preEsotericRaw, exact: true },
  { snapshot: citationAuthors, view: preCitationAuthorsRaw, exact: true },
  { snapshot: researchDebt, view: preResearchDebtRaw, exact: true },
  { snapshot: readerTextIds, view: preReaderTextIdsRaw, exact: true },
  { snapshot: economics, view: preEconomicsRaw, exact: true },
  { snapshot: quoteTrims, view: preQuoteTrimsRaw, exact: true },
  {
    snapshot: frontierGovernance2,
    view: preFrontierGovernance2Raw,
    exact: true,
  },
  { snapshot: frontierGovernance, view: preFrontierGovernanceRaw, exact: true },
  { snapshot: noteWording, view: preNoteWordingRaw, exact: true },
  { snapshot: waybackDates, view: preWaybackDatesRaw, exact: true },
  { snapshot: yudkowsky, view: preYudkowskyRaw, exact: true },
  { snapshot: earliestFixes, view: preEarliestFixesRaw, exact: true },
  { snapshot: thoughtSpine, view: preThoughtSpineRaw, exact: true },
  { snapshot: fixPass, view: preFixPassRaw, exact: true },
  { snapshot: week4c, view: preWeek4cRaw, exact: true },
  { snapshot: week4b, view: preControlRaw, exact: false },
  { snapshot: week4a, view: preProvisionsRaw, exact: true },
];
