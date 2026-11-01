import type { FrameworkChangesCollection } from '../domain/framework-changes';

/**
 * The framework comparison read edition by edition. Every status, difference
 * and earliest located edition on the page is computed from the comparison's
 * cells; the text below adds no claim and gives no reason for a difference.
 */
export const frameworkChanges: FrameworkChangesCollection = {
  id: 'frontier-frameworks-by-edition',
  version: 1,
  title: 'Frontier AI safety frameworks, edition by edition, 2023–2026',
  question:
    'What did each edition of each developer’s safety framework state on the comparison’s questions, and where do the recorded cells of consecutive editions differ?',
  editorialStatus: 'machine-proposed',
  reading: [
    'Each framework is read in the order of its compared editions. Consecutive means next in that order: an edition the dataset does not hold is not part of it.',
    'A difference is a difference between two editions’ recorded cells. Where the statuses differ, both are given. Where the status is the same and the recorded passages are not the same text, the page says so and shows both passages. It does not rank the editions, and it gives no reason for a difference.',
    'A step from “stated” to “not found” does not show that a provision was deleted, and a step from “not found” to “stated” does not show that one was added. “Not found” records only that no passage meeting the criterion was found in a stated search.',
  ],
  notCovered: [
    {
      id: 'practice',
      category: 'scope',
      text: 'Whether any developer applied, followed or departed from any edition. A cell records what an edition’s text states, and a commitment in a framework is never evidence of compliance.',
      claimIds: [],
    },
    {
      id: 'other-provisions',
      category: 'scope',
      text: 'Provisions outside the eighteen comparison questions. An edition can differ from the previous one on subjects the questions do not ask about. Recorded changes between editions are on the document histories page; the page lists them under each edition but does not sort them by question.',
      claimIds: [],
    },
    {
      id: 'openai-frameworks',
      category: 'scope',
      text: 'OpenAI’s two frameworks are read as two sequences, as on the comparison page. The Frontier Governance Framework describes itself as applying relevant parts of OpenAI’s continuing Preparedness approach to specific regulatory obligations; no record states that it replaces the Preparedness Framework, so no step joins the two.',
      claimIds: ['fgf-applies-preparedness'],
    },
    {
      id: 'assessments',
      category: 'scope',
      text: 'Recorded assessments of what an edition’s changes amount to. Two are recorded, both on Anthropic’s policy and both as unresolved questions; they are on the document histories page, with the sources on each side. This page shows only differences between recorded cells.',
      claimIds: ['rsp-v2-0-assessed-weakening', 'rsp-v3-0-assessed-weakening'],
    },
    {
      id: 'reasons',
      category: 'scope',
      text: 'Why an edition differs from the previous one. Where an edition states its own changes, its passage is given under “Stated changes from the previous edition”; it is the developer’s account, quoted or paraphrased.',
      claimIds: [],
    },
    {
      id: 'meta-v1-1-archive',
      category: 'archive',
      text: 'Meta’s Frontier AI Framework v1.1 was read in the Internet Archive capture of 13 February 2025, and a reviewer from a different model family matched its passages against the same capture on 27 October 2026.',
      claimIds: ['cmp-meta-faf-v1-1-d3-halt'],
    },
    {
      id: 'xai-2026-archive',
      category: 'archive',
      text: 'xAI’s June 2026 edition is no longer served at the publisher’s address. Its passages were checked on 15 October 2026 against the publisher copy, and its paraphrases were written on 27 October 2026 from those checked quotations, not from a fresh copy. The searches behind its recorded absences were re-checked on 26 October 2026 against an Internet Archive capture.',
      claimIds: ['cmp-faif-2026-d4-determination'],
    },
    {
      id: 'paraphrases',
      category: 'retrieval',
      text: 'Twelve of the eighteen questions give a paraphrase with its page, not the edition’s words, to keep each edition within Selekoa’s quotation limit. Two paraphrases can differ in wording where the editions’ passages do not, and the same paraphrase can stand for passages worded differently. Read both editions at the pages given before relying on a difference.',
      claimIds: [],
    },
  ],
  limits: [
    'The page reads the comparison’s cells and compares them. It adds no record, and it gives no reason for any difference.',
    'A status records what an edition’s text states. It is not evidence of implementation, compliance or effectiveness, and a shared question does not make two editions’ provisions equivalent.',
    '“Earliest located” names the earliest compared edition of a framework whose cell records a passage on the question. The developer may have said the same thing earlier elsewhere, and a later edition may record no passage.',
    'Passages were selected, checked and placed under each question by machine, and checked by a reviewer from a different model family. No editor has reviewed the records, the selection or the framing.',
  ],
};
