// Closed subtype lists adopted on 2026-10-29 (decisions C1 and C2 of
// review/dataset-audit-2026-10-29.md), and the mapping from the subtypes
// stored before. Recorded in docs/ontology.md; the consistency audit checks
// stored subtypes against these lists.

export const ORGANISATION = {
  'AI company': [
    'AI company',
    'AI laboratory',
    'AI research company',
    'AI data company',
    'AI software company',
    'AI company brand',
  ],
  'Technology company': [
    'Technology company',
    'Chip and networking supplier',
    'Cloud provider',
    'Cloud infrastructure company',
    'Cloud and AI services company',
    'Semiconductor and technology company',
    'Electronics company',
    'Hardware company',
    'Internet company',
    'Internet security company',
    'Software company',
    'Telecommunications group',
    'Blockchain organisation',
  ],
  Company: [
    'Corporate group',
    'Holding company',
    'Video game company',
    'Announced infrastructure venture',
  ],
  'Business unit': [
    'Business division',
    'Business group',
    'Product team',
    'Internal product organisation',
  ],
  'Research unit': [
    'Research unit',
    'Research team',
    'Research teams',
    'Internal research organisation',
    'Internal research unit',
    'Predecessor research organisation',
    'Predecessor research team',
    'Research and development unit',
    'Research department',
    'University research laboratory',
  ],
  'Governance body': [
    'Board committee',
    'Charter committee',
    'Internal governance body',
    'Safety council',
    'Purpose trust (as described by Anthropic)',
  ],
  'Research institute': [
    'Research institute',
    'Research institution',
    'Research laboratory',
  ],
  Nonprofit: [
    'Research nonprofit',
    'Evaluation nonprofit',
    'Evaluation organisation',
    'AI safety and governance organisation',
    'Collaborative funding initiative',
  ],
  'Industry association': ['Industry alliance'],
  Investor: [
    'Investor',
    'Investment firm',
    'Investment holding company',
    'Investment partnership',
    'Quantitative investment organisation',
  ],
  University: ['University'],
  'Legal entity': [
    'Limited liability company',
    'Limited partnership',
    'Nonprofit corporation',
    'Public benefit corporation',
  ],
  'Response centre': ['Cybersecurity emergency response centre'],
};

/** Role-relative subtypes, decided per record. */
export const ORGANISATION_BY_ID = {
  stripe: 'Technology company',
  tesla: 'Technology company',
  ssi: 'AI company',
  'thinking-machines-lab': 'AI company',
  'university-of-toronto': 'University',
  'x-company': 'Technology company',
  spacex: 'Company',
  'facebook-company': 'Technology company',
  meta: 'Technology company',
  cohere: 'AI company',
};

export const PUBLIC_BODY = {
  Legislature: [
    'State legislature',
    'EU legislators (ordinary legislative procedure)',
    'Legislature (China), standing body',
  ],
  'Legislative chamber': ['State legislative chamber'],
  'Executive office': [
    'State executive office',
    'Executive Office of the President of the United States',
    'Head of state (China), as an office',
    "Head of state's office (France)",
    'UK government office',
    'State attorney general’s office',
  ],
  'Government department': [
    'UK government department',
    'Government ministry (India)',
  ],
  'Government agency': ['US federal agency', 'Internet regulator'],
  'AI safety institute': [
    'Government AI safety institute (UK)',
    'Government AI safety institute',
  ],
  'Standards body': [
    'Standardisation technical committee',
    'National standards authorities (China), as joint publisher',
  ],
  'EU institution': ['EU institution'],
  'Intergovernmental body': [
    'Intergovernmental forum',
    'Intergovernmental organisation',
  ],
  'Advisory body': ['State policy working group (California)'],
};

/**
 * What a subtype carried that is not a kind and that the description does
 * not already say, moved to the description. The other qualified subtypes
 * (“not inspected”, “as described by the Governor”, “as an office”, “as
 * legislators”, “as joint publisher”, “not adopted”, “non-binding”, “standing
 * body”) are already stated in their descriptions.
 */
export const QUALIFICATIONS = {
  'Purpose trust (as described by Anthropic)':
    'Anthropic describes it as a purpose trust.',
  'Code of practice (voluntary instrument under the EU AI Act)':
    'A voluntary instrument under the EU AI Act.',
  'Departmental normative document (China), issued by notice':
    'A departmental normative document, issued by notice.',
};

export const DOCUMENT = {
  'Mailing-list message': ['Mailing-list message'],
  'Newsgroup message': ['Usenet message'],
  'Forum post': ['Forum post'],
  'Blog post': ['Blog post'],
  Comment: [
    'Online symposium comment',
    'Blog comment',
    'Commission report comment',
  ],
  'Web page': [
    'Web page',
    'Wiki page',
    'Glossary',
    'Model page',
    'Retrospective company profile',
    'Repository README',
    'Release policy snapshot',
  ],
  'Working paper': ['Working paper'],
  'Research paper': [
    'Research paper',
    'Research paper (work)',
    'Research document',
    'Conference paper',
  ],
  Preprint: ['Preprint'],
  'Technical report': ['Technical report'],
  Report: [
    'Report',
    'Report (OECD)',
    'Policy report',
    'Policy brief',
    'Book-length report',
    'Commission report',
    'Commission report appendix',
    'Commission appendix study',
    'Government evaluation report',
    'Evaluation summary (United States)',
    'Institutional research document',
  ],
  'Annual report': ['Annual report (Form 20-F)'],
  Prospectus: ['Prospectus'],
  'Journal article': ['Journal article', 'Journal editorial'],
  'Magazine article': [
    'Magazine article',
    'Magazine column',
    'Magazine debate',
  ],
  'Newspaper article': ['Newspaper article'],
  Letter: ['Newspaper letter', 'Regulatory letter'],
  Book: ['Book', 'Novel'],
  'Book chapter': ['Book chapter', 'Book selection'],
  Essay: ['Essay'],
  'Lecture or talk': ['Lecture typescript', 'Broadcast script'],
  Testimony: ['Congressional testimony', 'Congressional hearings'],
  'Research proposal': ['Research proposal', 'Research agenda (work)'],
  Announcement: [
    'Announcement',
    'Institutional publication',
    'Research announcement',
    'Research release announcement',
    'Release and licensing announcement',
    'Release policy announcement',
    'Organisational plan',
  ],
  'Press release': [
    'Press release',
    'Press release (UK government)',
    'Regulatory announcement (China)',
  ],
  'Model card': ['Model card', 'Model card (report)', 'System card'],
  Licence: ['Licence', 'Model licence'],
  'Framework edition': [
    'Framework version',
    'Framework release',
    'Policy release',
    'Compliance framework (edition not inspected)',
  ],
  'Certificate of incorporation': [
    'Certificate of incorporation (filed version)',
  ],
  'Voluntary commitments': ['Voluntary commitment text'],
  'Code of practice': [
    'Code of practice (voluntary instrument under the EU AI Act)',
    'Draft code of practice (under the EU AI Act)',
    'Voluntary code of conduct (G7)',
  ],
  'Reporting framework': ['Voluntary reporting framework (OECD)'],
  'Memorandum of understanding': [
    'Memorandum of understanding (UK government)',
    'Memorandum of understanding (text not inspected)',
  ],
  'Declaration or statement': [
    'Intergovernmental declaration',
    'Summit declaration',
    'Summit statement (web expression)',
    'Summit statement (PDF expression)',
    "Leaders' statement (G7)",
    'Ministerial statement (AI Seoul Summit)',
    "Chair's statement (AI Safety Summit)",
  ],
  Speech: ['Speech from the Throne (UK)'],
  'Briefing notes': ['Briefing notes (UK government)'],
  Statute: [
    'Statute (chaptered bill)',
    'Statute (as described by the Governor)',
    'Statute (announced by the Governor; amended by Chapter 96 of 2026)',
    'Statute (chapter amendment)',
    'Bill (chaptered)',
    'Amending decision of the NPC Standing Committee',
  ],
  Bill: ['Bill (vetoed)', 'Bill (introduced)'],
  Regulation: [
    'Regulation (EU law)',
    'Administrative measures (China)',
    'Departmental normative document (China), issued by notice',
    'Interim final rule (United States)',
  ],
  'Proposed rule': [
    'Proposed rule (United States)',
    'Draft implementing act (not adopted)',
  ],
  'Executive order': ['Executive order (United States)'],
  Standard: [
    'Mandatory national standard (China)',
    'Recommended national standard (China)',
  ],
  Guidance: [
    'Commission guidelines (non-binding interpretation)',
    'Draft guidance (United States)',
    'Commission communication',
    'Commission communication with template',
  ],
  Opinion: ['Commission opinion (assessment under Article 56 of the AI Act)'],
  'Rules of procedure': ['Rules of procedure'],
  'Policy plan': [
    'Policy plan (United States)',
    'Legislative recommendations (United States)',
  ],
};

/** A draft whose subtype said so; the name or description already says it. */
export const DOCUMENT_BY_ID = {
  'gpai-code-of-practice-draft1-2024': 'Code of practice',
};

export const PERSON = [
  'Researcher',
  'Executive',
  'Board member',
  'Investor',
  'Writer',
  'Public official',
];

const invert = (lists) =>
  Object.fromEntries(
    Object.entries(lists).flatMap(([to, from]) => from.map((f) => [f, to])),
  );
export const organisationMap = invert(ORGANISATION);
export const publicBodyMap = invert(PUBLIC_BODY);
export const documentMap = invert(DOCUMENT);
