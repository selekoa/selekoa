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
import modelCards5 from '../../review/model-cards-admission-5-before-2026-11-10.json';
import auditCorrections from '../../review/audit-corrections-2026-11-10-before-2026-11-10.json';
import recheckReads from '../../review/recheck-and-reads-2026-11-07-before-2026-11-07.json';
import aiMoney from '../../review/ai-money-admission-before-2026-11-06.json';
import corrections from '../../review/corrections-2026-11-06-before-2026-11-06.json';
import predictions from '../../review/predictions-admission-before-2026-11-05.json';
import lawsCompared2 from '../../review/laws-compared-admission-2-before-2026-11-05.json';
import modelCards4 from '../../review/model-cards-admission-4-before-2026-11-05.json';
import modelCards3 from '../../review/model-cards-admission-3-before-2026-11-05.json';
import lawsCompared1 from '../../review/laws-compared-admission-1-before-2026-11-04.json';
import prehistory from '../../review/prehistory-admission-before-2026-11-04.json';
import modelCards2 from '../../review/model-cards-admission-2-before-2026-11-04.json';
import modelCards1 from '../../review/model-cards-admission-1-before-2026-11-03.json';
import absenceSweepApply2 from '../../review/absence-sweep-apply-2-before-2026-11-03.json';
import absenceSweepApply1 from '../../review/absence-sweep-apply-1-before-2026-11-02.json';
import auditSampleFixes from '../../review/audit-sample-fixes-before-2026-11-02.json';
import archiveFetchApply from '../../review/archive-fetch-apply-before-2026-11-02.json';
import recheckDecisions from '../../review/recheck-decisions-before-2026-11-02.json';
import recheckApply from '../../review/recheck-apply-before-2026-11-02.json';
import recheckInterim from '../../review/recheck-interim-before-2026-11-02.json';
import auditFollowups from '../../review/audit-followups-before-2026-11-02.json';
import prelaunchFixes from '../../review/prelaunch-fixes-before-2026-11-02.json';
import labGenealogy2 from '../../review/lab-genealogy-2-admission-before-2026-11-01.json';
import craneNrcFix from '../../review/crane-nrc-fix-before-2026-11-01.json';
import machineSuccession from '../../review/heterodox-admission-before-2026-11-01.json';
import riskDebate from '../../review/risk-debate-admission-before-2026-10-31.json';
import chinaLabs3Admission2 from '../../review/china-labs-3-admission-2-before-2026-10-31.json';
import chinaLabs3Admission1 from '../../review/china-labs-3-admission-1-before-2026-10-31.json';
import technicalHistory2 from '../../review/technical-history-admission-2-before-2026-10-31.json';
import technicalHistory1 from '../../review/technical-history-admission-1-before-2026-10-31.json';
import keyPapers3 from '../../review/key-papers-admission-3-before-2026-10-31.json';
import keyPapers2 from '../../review/key-papers-admission-2-before-2026-10-31.json';
import keyPapers1 from '../../review/key-papers-admission-1-before-2026-10-31.json';
import aiInBiology2 from '../../review/ai-in-biology-admission-2-before-2026-10-31.json';
import aiInBiology1 from '../../review/ai-in-biology-admission-1-before-2026-10-31.json';
import people from '../../review/people-admission-before-2026-10-31.json';
import aiBio2 from '../../review/ai-bio-admission-2-before-2026-10-30.json';
import aiBio1 from '../../review/ai-bio-admission-1-before-2026-10-30.json';
import archiveFixes from '../../review/archive-fixes-before-2026-10-30.json';
import cpoAdmission2 from '../../review/cpo-admission-2-before-2026-10-30.json';
import cpoAdmission1 from '../../review/cpo-admission-1-before-2026-10-30.json';
import readerDecisions from '../../review/reader-decisions-before-2026-10-29.json';
import auditFixes from '../../review/audit-fixes-before-2026-10-29.json';
import frameworksToLaw2 from '../../review/frameworks-to-law-2-before-2026-10-28.json';
import frameworksToLaw1 from '../../review/frameworks-to-law-1-before-2026-10-28.json';
import paraphraseCorrections from '../../review/paraphrase-corrections-before-2026-10-28.json';
import followups from '../../review/followups-before-2026-10-28.json';
import chinaLabs2 from '../../review/china-labs-2-before-2026-10-27.json';
import compareMoreFacets from '../../review/compare-more-facets-before-2026-10-27.json';
import authorPersons from '../../review/author-persons-before-2026-10-27.json';
import frameworkComparison from '../../review/framework-comparison-before-2026-10-27.json';
import archiveAdmissions from '../../review/archive-admissions-before-2026-10-26.json';
import dataFixes from '../../review/data-fixes-before-2026-10-26.json';
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
  /** Rows the change removed, as they were; restored at their earlier place. */
  removed?: Record<Name, unknown[]>;
  /** Earlier row order, where a change reordered or removed rows. */
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
      // Unchanged rows are shared with the newer view, not copied: a full
      // copy per step of the chain outgrew a 2.2 GB heap (2026-11-05).
      // Views are read-only; restored rows are copies of the snapshot's.
      .map((row) =>
        prior.has(row.id) ? structuredClone(prior.get(row.id)!) : row,
      )
      .concat(
        ((snapshot.removed?.[name] ?? []) as Row[]).map((row) =>
          structuredClone(row),
        ),
      );
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

/** Raw stored rows at schema 2.34, after the audit corrections of 2026-11-10 and before part 5 of the model-cards admission of the same day (both released together). */
export const preModelCards5Raw = revert(current, modelCards5);
/** Raw stored rows at schema 2.33 as released in v0.32.1, before the corrections of the blind audit of 2026-11-09, applied on 2026-11-10 (schema 2.34). */
export const preAuditCorrections1110Raw = revert(
  preModelCards5Raw,
  auditCorrections,
);
/** Raw stored rows at schema 2.33 as released in v0.32.0, before the re-check settlement and reads of 2026-11-07. */
export const preRecheckReads1107Raw = revert(
  preAuditCorrections1110Raw,
  recheckReads,
);
/** Raw stored rows at schema 2.32 as released in v0.31.1, before the admission of "AI and money" of 2026-11-06 (schema 2.33). */
export const preAiMoneyRaw = revert(preRecheckReads1107Raw, aiMoney);
/** Raw stored rows at schema 2.32 as released in v0.31.0, before the correction release of 2026-11-06. */
export const preCorrections1106Raw = revert(preAiMoneyRaw, corrections);
/** Raw stored rows at schema 2.31 as released in v0.30.0, before the admission of "Predictions on record" of 2026-11-05 (schema 2.32). */
export const prePredictionsRaw = revert(preCorrections1106Raw, predictions);
/** Raw stored rows at schema 2.30 as released in v0.29.2, before part 2 of the laws-compared admission of 2026-11-05 (schema 2.31). */
export const preLawsCompared2Raw = revert(prePredictionsRaw, lawsCompared2);
/** Raw stored rows at schema 2.30 as released in v0.29.1, before part 4 of the model-cards admission of 2026-11-05. */
export const preModelCards4Raw = revert(preLawsCompared2Raw, modelCards4);
/** Raw stored rows at schema 2.30 as released in v0.28.1 (and unchanged by the collection registration of v0.29.0), before part 3 of the model-cards admission of 2026-11-05. */
export const preModelCards3Raw = revert(preModelCards4Raw, modelCards3);
/** Raw stored rows at schema 2.30 as released in v0.28.0, before part 1 of the laws-compared admission of 2026-11-04. */
export const preLawsCompared1Raw = revert(preModelCards3Raw, lawsCompared1);
/** Raw stored rows at schema 2.30 as released in v0.27.0, before the admission of the antecedent-texts collection of 2026-11-04. */
export const prePrehistoryRaw = revert(preLawsCompared1Raw, prehistory);
/** Raw stored rows at schema 2.29 as released in v0.26.4, before part 2 of the model-cards admission of 2026-11-04 (schema 2.30). */
export const preModelCards2Raw = revert(prePrehistoryRaw, modelCards2);
/** Raw stored rows at schema 2.29 as released in v0.26.3, before part 1 of the model-cards admission of 2026-11-03. */
export const preModelCards1Raw = revert(preModelCards2Raw, modelCards1);
/** Raw stored rows at schema 2.29 as released in v0.26.2, before part 2 of the textual absence-claims sweep of 2026-11-02 was applied. */
export const preAbsenceSweepApply2Raw = revert(
  preModelCards1Raw,
  absenceSweepApply2,
);
/** Raw stored rows at schema 2.29 as released in v0.26.1, before part 1 of the textual absence-claims sweep of 2026-11-02 was applied. */
export const preAbsenceSweepApply1Raw = revert(
  preAbsenceSweepApply2Raw,
  absenceSweepApply1,
);
/** Raw stored rows at schema 2.29 as released in v0.26.0, before the maintainer's decisions of 2026-11-02 on the cross-family audit sample and the Turing 1951 lead. */
export const preAuditSampleFixesRaw = revert(
  preAbsenceSweepApply1Raw,
  auditSampleFixes,
);
/** Raw stored rows at schema 2.29 as released in v0.25.0, before the maintainer's decisions of 2026-11-02 on the archive retrieval of held sources. */
export const preArchiveFetchApplyRaw = revert(
  preAuditSampleFixesRaw,
  archiveFetchApply,
);
/** Raw stored rows at schema 2.28 as released in v0.24.2, before the maintainer's decisions of 2026-11-02 on the earliest-located re-check (schema 2.29). */
export const preRecheckDecisionsRaw = revert(
  preArchiveFetchApplyRaw,
  recheckDecisions,
);
/** Raw stored rows at schema 2.28 as released in v0.24.1, before the adjudication of 2026-11-02 of the re-checked headlines. */
export const preRecheckApplyRaw = revert(preRecheckDecisionsRaw, recheckApply);
/** Raw stored rows at schema 2.28 as released in v0.24.0, before the interim withdrawal of 2026-11-02 of the headlines the cross-family re-check marks move or undecidable. */
export const preRecheckInterimRaw = revert(preRecheckApplyRaw, recheckInterim);
/** Raw stored rows at schema 2.27 as released in v0.23.3, before the maintainer's decisions of 2026-11-02 on the pre-launch audit (schema 2.28). */
export const preAuditFollowupsRaw = revert(
  preRecheckInterimRaw,
  auditFollowups,
);
/** Raw stored rows at schema 2.27 as released in v0.23.2, before the corrections of the pre-launch audit of 2026-11-02. */
export const prePrelaunchFixesRaw = revert(
  preAuditFollowupsRaw,
  prelaunchFixes,
);
/** Raw stored rows at schema 2.27 as released in v0.23.1, before the 2026-11-01 lab genealogy 2 admission. */
export const preLabGenealogy2Raw = revert(prePrelaunchFixesRaw, labGenealogy2);
/** Raw stored rows at schema 2.27 as released in v0.23.0, before the 2026-11-01 correction of the NRC Crane fuel amendment record. */
export const preCraneNrcFixRaw = revert(preLabGenealogy2Raw, craneNrcFix);
/** Raw stored rows at schema 2.27 as released in v0.22.0, before the 2026-11-01 machine succession admission. */
export const preMachineSuccessionRaw = revert(
  preCraneNrcFixRaw,
  machineSuccession,
);
/** Raw stored rows at schema 2.27 as released in v0.21.0, before the 2026-10-31 risk debate admission. */
export const preRiskDebateRaw = revert(preMachineSuccessionRaw, riskDebate);
/** Raw stored rows at schema 2.26 as released in v0.20.0, before part 2 of the 2026-10-31 admission of the third Chinese institutions collection (schema 2.27). */
export const preChinaLabs3Admission2Raw = revert(
  preRiskDebateRaw,
  chinaLabs3Admission2,
);
/** Raw stored rows at schema 2.26 as released in v0.19.0, before part 1 of the 2026-10-31 admission of the third Chinese institutions collection. */
export const preChinaLabs3Admission1Raw = revert(
  preChinaLabs3Admission2Raw,
  chinaLabs3Admission1,
);
/** Raw stored rows at schema 2.25 as released in v0.18.1, before part 2 of the 2026-10-31 technical history admission (schema 2.26). */
export const preTechnicalHistory2Raw = revert(
  preChinaLabs3Admission1Raw,
  technicalHistory2,
);
/** Raw stored rows at schema 2.25 as released in v0.18.0, before part 1 of the 2026-10-31 technical history admission. */
export const preTechnicalHistory1Raw = revert(
  preTechnicalHistory2Raw,
  technicalHistory1,
);
/** Raw stored rows at schema 2.24 as released in v0.17.1, before part 3 of the 2026-10-31 key papers admission (schema 2.25). */
export const preKeyPapers3Raw = revert(preTechnicalHistory1Raw, keyPapers3);
/** Raw stored rows at schema 2.24 as released in v0.17.0, before part 2 of the 2026-10-31 key papers admission. */
export const preKeyPapers2Raw = revert(preKeyPapers3Raw, keyPapers2);
/** Raw stored rows at schema 2.23 as released in v0.16.0, before part 1 of the 2026-10-31 key papers admission (schema 2.24). */
export const preKeyPapers1Raw = revert(preKeyPapers2Raw, keyPapers1);
/** Raw stored rows at schema 2.22 as released in v0.15.2, before part 2 of the 2026-10-31 AI in biology admission (schema 2.23). */
export const preAiInBiology2Raw = revert(preKeyPapers1Raw, aiInBiology2);
/** Raw stored rows at schema 2.22 as released in v0.15.1, before part 1 of the 2026-10-31 AI in biology admission. */
export const preAiInBiology1Raw = revert(preAiInBiology2Raw, aiInBiology1);
/** Raw stored rows at schema 2.22 as released in v0.15.0, before the 2026-10-31 people admission. */
export const prePeopleRaw = revert(preAiInBiology1Raw, people);
/** Raw stored rows at schema 2.21 as released in v0.14.2, before part 2 of the 2026-10-30 AI and biosecurity admission (schema 2.22). */
export const preAiBio2Raw = revert(prePeopleRaw, aiBio2);
/** Raw stored rows at schema 2.21 as released in v0.14.1, before part 1 of the 2026-10-30 AI and biosecurity admission. */
export const preAiBio1Raw = revert(preAiBio2Raw, aiBio1);
/** Raw stored rows at schema 2.21 as released in v0.14.0, before the maintainer's 2026-10-30 archive fixes and the narrowing of criterion O7. */
export const preArchiveFixesRaw = revert(preAiBio1Raw, archiveFixes);
/** Raw stored rows at schema 2.20 as released in v0.13.0, before part 2 of the 2026-10-30 compute, power and orbit admission (schema 2.21). */
export const preCpoAdmission2Raw = revert(preArchiveFixesRaw, cpoAdmission2);
/** Raw stored rows at schema 2.20 as released in v0.12.1, before part 1 of the 2026-10-30 compute, power and orbit admission. */
export const preCpoAdmission1Raw = revert(preCpoAdmission2Raw, cpoAdmission1);
/** Raw stored rows at schema 2.20 as released in v0.12.0, before the maintainer's 2026-10-29 decisions on the reader tasks. */
export const preReaderDecisionsRaw = revert(
  preCpoAdmission1Raw,
  readerDecisions,
);
/** Raw stored rows at schema 2.19 as released in v0.11.0, before the 2026-10-29 audit fixes (schema 2.20). */
export const preAuditFixesRaw = revert(preReaderDecisionsRaw, auditFixes);
/** Raw stored rows at schema 2.18 as released in v0.10.3, before part 2 of the 2026-10-28 frameworks-to-law admission (schema 2.19). */
export const preFrameworksToLaw2Raw = revert(
  preAuditFixesRaw,
  frameworksToLaw2,
);
/** Raw stored rows at schema 2.18 as released in v0.10.2, before part 1 of the 2026-10-28 frameworks-to-law admission. */
export const preFrameworksToLaw1Raw = revert(
  preFrameworksToLaw2Raw,
  frameworksToLaw1,
);
/** Raw stored rows at schema 2.18 as released in v0.10.1, before the 2026-10-28 paraphrase corrections. */
export const preParaphraseCorrectionsRaw = revert(
  preFrameworksToLaw1Raw,
  paraphraseCorrections,
);
/** Raw stored rows at schema 2.18 as released in v0.10.0, before the 2026-10-28 follow-ups. */
export const preFollowupsRaw = revert(preParaphraseCorrectionsRaw, followups);
/** Raw stored rows at schema 2.18, before the 2026-10-27 admission of the second Chinese institutions collection. */
export const preChinaLabs2Raw = revert(preFollowupsRaw, chinaLabs2);
/** Raw stored rows at schema 2.17 with the author persons, before the 2026-10-27 admission of the paraphrased comparison questions (schema 2.18). */
export const preCompareMoreFacetsRaw = revert(
  preChinaLabs2Raw,
  compareMoreFacets,
);
/** Raw stored rows at schema 2.17, before the 2026-10-27 author-person admission. */
export const preAuthorPersonsRaw = revert(
  preCompareMoreFacetsRaw,
  authorPersons,
);
/** Raw stored rows at schema 2.16, before the 2026-10-27 framework comparison admission (schema 2.17). */
export const preFrameworkComparisonRaw = revert(
  preAuthorPersonsRaw,
  frameworkComparison,
);
/** Raw stored rows at schema 2.16, before the 2026-10-26 archive admissions. */
export const preArchiveAdmissionsRaw = revert(
  preFrameworkComparisonRaw,
  archiveAdmissions,
);
/** Raw stored rows at schema 2.16, before the 2026-10-26 data fixes. */
export const preDataFixesRaw = revert(preArchiveAdmissionsRaw, dataFixes);
/** Raw stored rows at schema 2.15, before the 2026-10-25 re-check corrections (schema 2.16). */
export const preRecheckCorrectionsRaw = revert(
  preDataFixesRaw,
  recheckCorrections,
);
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
  { snapshot: aiBio2, view: preAiBio2Raw, exact: true },
  { snapshot: aiBio1, view: preAiBio1Raw, exact: true },
  { snapshot: archiveFixes, view: preArchiveFixesRaw, exact: true },
  { snapshot: cpoAdmission2, view: preCpoAdmission2Raw, exact: true },
  { snapshot: cpoAdmission1, view: preCpoAdmission1Raw, exact: true },
  { snapshot: readerDecisions, view: preReaderDecisionsRaw, exact: true },
  { snapshot: auditFixes, view: preAuditFixesRaw, exact: true },
  { snapshot: frameworksToLaw2, view: preFrameworksToLaw2Raw, exact: true },
  { snapshot: frameworksToLaw1, view: preFrameworksToLaw1Raw, exact: true },
  {
    snapshot: paraphraseCorrections,
    view: preParaphraseCorrectionsRaw,
    exact: true,
  },
  { snapshot: followups, view: preFollowupsRaw, exact: true },
  { snapshot: chinaLabs2, view: preChinaLabs2Raw, exact: true },
  {
    snapshot: compareMoreFacets,
    view: preCompareMoreFacetsRaw,
    exact: true,
  },
  { snapshot: authorPersons, view: preAuthorPersonsRaw, exact: true },
  {
    snapshot: frameworkComparison,
    view: preFrameworkComparisonRaw,
    exact: true,
  },
  {
    snapshot: archiveAdmissions,
    view: preArchiveAdmissionsRaw,
    exact: true,
  },
  { snapshot: dataFixes, view: preDataFixesRaw, exact: true },
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
