import type { ComparisonCollection } from '../domain/framework-comparison';

export const frameworkComparison: ComparisonCollection = {
  id: 'frontier-safety-frameworks',
  version: 3,
  title: 'Compare frameworks',
  question:
    'What does each developer’s safety framework say on the same questions, edition by edition?',
  editorialStatus: 'machine-proposed',
  // Developers in alphabetical order, then framework name. Never by any count.
  families: [
    'anthropic-rsp',
    'deepmind-fsf',
    'meta-frontier-ai',
    'microsoft-frontier-governance',
    'openai-frontier-governance',
    'openai-preparedness',
    'xai-faif',
  ],
  introduction:
    'Each row is one question, worded so that it fits every framework. Each column is one framework, showing its latest edition unless you choose another. A cell gives what that edition says on the question, with the page, or records that no passage was found in a stated search. Six questions give the edition’s own words; the other twelve give Selekoa’s paraphrase, marked as such. The questions are Selekoa’s. An edition’s own terms, such as “ASL” or “Critical Capability Level”, appear only in quotation marks.',
  legend: {
    stated:
      'A passage meets the question’s criterion as worded, however conditional or narrow its scope. The condition or scope is in the note.',
    partly:
      'A passage has what the criterion asks for, but in a weaker form than the criterion’s own words: for example, no named person or body where the question asks for one, or a “may” where it asks for a statement that something will happen.',
    recorded:
      'A passage recorded earlier from an archive copy. The edition could not be retrieved again to re-check it for this comparison.',
    'not-found':
      'No passage meeting the criterion was found. The record lists the sections read, the search terms and every passage set aside, with the reason. It does not show that the developer lacks the practice, or that a provision was deleted.',
    'not-checked':
      'The edition could not be retrieved, and no passage on this question was recorded earlier.',
    'not-applicable':
      'The question does not apply: the edition is the first in its framework, so there is no earlier edition to change from.',
  },
  limits: [
    'Conditions that matter are in each cell’s note. A “stated” cell can carry conditions as important as those of a “stated, partly” one.',
    'The page compares and does not rank. There are no scores or totals, and columns are in a fixed order.',
    'Six questions, on required actions, who decides and exceptions, quote the edition. The other twelve, on risk domains, thresholds, evaluation timing, reporting and revision, give a paraphrase with the page, because quoting them as well would exceed Selekoa’s quotation limit for most editions. A paraphrase states what the passage says, in other words; read the edition at that page before relying on it.',
    'Passages were selected, checked and placed under each question by machine, and checked by a reviewer from a different model family. The maintainer decided the borderline cases. No editor has reviewed the records.',
  ],
  notChecked: [],
  notApplicable: [
    {
      editionIds: [
        'rsp-2023',
        'fsf-2024',
        'meta-faf-v1-1',
        'ms-fgf-2025',
        'frontier-governance-2026',
        'preparedness-beta-2023',
        'faif-2025',
      ],
      facetId: 'D8.changes',
      reason: 'First edition in this framework; there is no earlier edition.',
    },
  ],
};
