import type { ModelCardsCollection } from '../domain/model-cards';
import { modelCardsFrame } from './model-cards-frame';

// The collection "Model cards compared" (schema 2.30). Questions, criteria
// and legend are those of the adjudicated candidate pack
// (research/model-cards/questions.json), kept verbatim because every cell was
// classified against them. Written to docs/style-guide.md.
export const modelCards: ModelCardsCollection = {
  ...modelCardsFrame,
  introduction:
    'Each row is one card. Each column is one question, worded so that it fits every card. The questions are Selekoa’s; a card’s own terms appear only in quotation marks. A card is the developer’s own account of its model: what it states is recorded as stated, not as an independent finding.',
  questions: {
    'MC.Q01': {
      question: 'What date does the card carry, and of what kind?',
      criterion:
        'A date printed on the card or its own page (publication, issue or revision date), quoted with its kind. Revision dates are listed separately. Partly if the card carries only a month or year, or only a revision date. The release date of the model is Q02.',
    },
    'MC.Q02': {
      question:
        'Does the card state when the model was or will be released or made available, and in what form?',
      criterion:
        'A passage of the card giving the model’s release, launch or availability date, or the release form (API, consumer product, open weights, limited preview), quoted. Stated if a date or a dated event is given; partly if only the form of release, or only a relative timing (for example, “at launch”), is given.',
    },
    'MC.Q03': {
      question:
        'Does the card cite the developer’s own frontier safety framework, and which edition?',
      criterion:
        'The card names the developer’s framework (Responsible Scaling Policy, Preparedness Framework, Frontier Safety Framework, Risk Management Framework, Frontier AI Framework, Advanced AI Scaling Framework, Frontier Governance Framework, or a successor). Stated if it names the framework and identifies the edition (version number, date or a link to a dated edition); partly if it names the framework without an edition. Not applicable if the card predates every framework edition of its developer.',
    },
    'MC.Q04': {
      question:
        'Does the card link or refer the reader to the framework document itself?',
      criterion:
        'A hyperlink, address or bibliographic reference to the framework document in the card. Partly if it refers to the framework as a document without an address or reference. Not applicable if Q03 is not applicable.',
    },
    'MC.Q05': {
      question:
        'Does the card state a determination under the framework: a level, threshold or category reached, not reached or not ruled out?',
      criterion:
        'A sentence stating the outcome for the model in the framework’s own categories (for example, a safety level applied, a capability threshold reached or not reached, a risk category assigned), quoted. Partly if the card says a determination was made without stating its outcome, or states an outcome for some tracked domains only. Not applicable if Q03 is not applicable.',
    },
    'MC.Q06': {
      question:
        'Does the card state safeguards or mitigations that it ties to that determination?',
      criterion:
        'A passage naming safeguards, protections or a safeguard standard applied because of, or in line with, the determination or threshold in Q05 (for example, a deployment or security standard named in the framework). Partly if safeguards are stated without being tied to a determination or threshold. A stated safeguard is the developer’s account, not evidence that it works.',
    },
    'MC.Q07': {
      question:
        'Does the card report dangerous-capability evaluations for chemical or biological weapons?',
      criterion:
        'The card reports that evaluations in this domain were run and states their outcome category or threshold language (policy level only). Partly if evaluations are reported without any outcome or conclusion for the domain. Radiological and nuclear evaluations are noted where reported together.',
    },
    'MC.Q08': {
      question:
        'Does the card report dangerous-capability evaluations for cyber offence?',
      criterion:
        'The card reports that evaluations of offensive cyber capability were run and states their outcome category or threshold language (policy level only). Partly if evaluations are reported without any outcome or conclusion.',
    },
    'MC.Q09': {
      question:
        'Does the card report dangerous-capability evaluations for autonomy, self-replication, self-improvement or AI research and development?',
      criterion:
        'The card reports that evaluations in any of these domains were run and states their outcome category or threshold language (policy level only). Partly if evaluations are reported without any outcome or conclusion. Agentic task benchmarks reported only as product capability do not meet it.',
    },
    'MC.Q10': {
      question:
        'Does the card report evaluations of persuasion or manipulation of people?',
      criterion:
        'The card reports that evaluations of persuasive or manipulative capability were run and states their outcome category or conclusion. Partly if evaluations are reported without an outcome. Not found includes a card that states the domain was removed from evaluation; the note says so.',
    },
    'MC.Q11': {
      question:
        'Does the card report evaluations of misalignment, deception, scheming or sabotage of oversight?',
      criterion:
        'The card reports evaluations of the model’s own propensity or capability for deception, scheming, reward hacking, sabotage or undermining oversight, with a stated conclusion. Partly if evaluations are reported without a conclusion. Content-safety refusal tests do not meet it.',
    },
    'MC.Q12': {
      question: 'Does the card report red-teaming, and with what scope?',
      criterion:
        'A passage reporting adversarial testing described as red-teaming (internal, external or both), quoted with its scope (domains, number or kind of testers, or period) where given. Partly if red-teaming is mentioned without any scope.',
    },
    'MC.Q13': {
      question:
        'Does the card name external or third-party testers or evaluators?',
      criterion:
        'At least one external organisation (other than a government body, which is Q14) named as having tested or evaluated the model, quoted. Partly if external testers are described but not named.',
    },
    'MC.Q14': {
      question:
        'Does the card name a government body that tested the model or received pre-deployment access?',
      criterion:
        'A named government body (for example, the US AI Safety Institute or Center for AI Standards and Innovation, or the UK AI Safety or Security Institute) stated to have tested, evaluated or received access to the model, quoted. Partly if government testing is mentioned without naming the body.',
    },
    'MC.Q15': {
      question:
        'Does the card state a release or deployment decision, and who made it?',
      criterion:
        'A passage stating that a decision to release, deploy or launch was made (decided, chose, deemed acceptable for deployment, determined that safeguards suffice for launch), quoted. Stated if the decision is described and its maker is identifiable: a named person, office or committee, or the developer in its own voice (“we”), which counts as the company as such. Partly if a release is stated as following from an assessment without a decision being described (“we therefore release”), if a decision is described without any maker, or if a maker is named only for a capability or safeguards determination and not for the release.',
    },
    'MC.Q16': {
      question:
        'Does the card state limits or open uncertainties about its own evaluations?',
      criterion:
        'A passage stating a limitation, gap or uncertainty of the evaluations reported in the card (for example, that results may underestimate capability, that elicitation was incomplete, or that a threshold could not be ruled out with confidence), quoted. Limitations of the model as a product (for example, hallucination) do not meet it.',
    },
  },
  legend: {
    stated:
      'A passage of the card meets the question’s criterion as worded. The scope or condition is in the note.',
    partly:
      'A passage has what the criterion asks for in a weaker or narrower form than the criterion’s own words (for example, an evaluation referred to without its outcome, or testers described without being named). The note says which part is missing.',
    'not-found':
      'No passage meeting the criterion was found. The cell lists the sections read, the terms searched and every passage set aside, with the reason. It does not show that the developer did not do the thing asked about, or did not disclose it elsewhere.',
    'not-applicable':
      'The question does not arise for this card, for the reason given (for example, the card predates any framework of its developer, so no framework determination can be asked about).',
  },
  limits: [
    'A card is the developer’s account of its own model. A cell records what the card states. It does not show that an evaluation was run as described, that a safeguard works, or that anyone checked the result independently.',
    'Dangerous-capability evaluations are recorded at policy level only: whether an evaluation was run, its domain, the stated outcome and the threshold language. Methods, prompts, task contents and detailed results are not recorded.',
    'The table compares and does not rank. Rows are in a fixed order, by developer and then by date, and there are no scores or totals.',
    'Symbols are not to be summed. A row with many “stated” cells does not show that a developer disclosed more, and a shared question does not make two cards’ answers equivalent.',
  ],
  howWeSearched: [
    'The searches of 2 November 2026 covered releases dated 2023-01-01 to 2026-11-01 by the six developers whose frameworks are in Compare frameworks: Anthropic, Google DeepMind, Meta, Microsoft, OpenAI and xAI. They read each developer’s own index of cards where it has one (Anthropic’s system-card index, Google DeepMind’s model-card index, OpenAI’s Deployment Safety Hub), its repositories on GitHub and Hugging Face, its content hosts and the dataset’s own sources. Web searches were used only to find addresses. Every card located is listed in the pack’s inventory, about sixty in the population.',
    'A card is a document the developer published as the system card, model card or safety report of a named model or model family, including addenda and updates published as cards. Technical reports, research papers, blog posts and product pages are not cards. Gemma, Gemini Robotics (with Gemini Robotics-ER 1.5, which outputs text), Phi and image-input models such as GPT-4V are in the population. Image, video, audio and embedding models, image-generation models, safety classifiers such as Llama Guard and Prompt Guard, screen-reading models and research checkpoints are outside it, and so is GPT-Rosalind-6, whose card says it uses GPT-6 Astra’s weights.',
    'The first batch of twenty rows takes, for each developer and calendar year from 2023 to 2026, the latest card of that year that reports the developer’s own evaluations. The collection’s rule, set by the maintainer on 2026-11-03, is wider: every card that cites the developer’s frontier safety framework or states a determination under it, and, for each developer, the latest card before its first framework edition. A safety report published beside a model card is a row of its own when it cites the framework (set on 2026-11-04). The other cards follow in batches of about eight, in a fixed order: the developers in turn, each developer’s earliest-dated card first.',
    'The second batch, drafted on 4 November 2026, adds eight rows. To apply the rule, 137 documents were retrieved and searched for each developer’s framework names, and every hit was read. No Microsoft card located names Microsoft’s Frontier Governance Framework, so Microsoft adds no row. A card that cites its framework under another name would be missed.',
    'The third batch, drafted on 5 November 2026, takes the next eight cards in the order and adds six rows. The other two, Google DeepMind’s PaliGemma model card and xAI’s Grok-1 model card, were read only in Internet Archive captures, which the reviewer could not open; they are held for a later batch. Claude 3.7 Sonnet’s system card prints no date; Anthropic’s index gives February 2025.',
    'The fourth and fifth batches, drafted on 6 November 2026, take the next sixteen cards in the order and add sixteen rows. Claude Sonnet 4.5’s system card was already in the dataset, and its record is used unchanged. Gemini 2.5 Flash-Lite and Gemini 2.5 Flash were read in later expressions (dated September and December 2025) than the earliest located; the earlier archive captures could not be opened, so their cells describe the expressions read. The Muse Wonder and Muse Spark Open cards name the Meta Superintelligence Scaling Framework, which is not yet in the dataset, so no edition is linked.',
    'Each card is dated as it prints its own date. A card that prints no date has no date here; a repository commit date is not a card date. Some cards show an earlier publication date on an index, publication or announcement page that has not yet been checked, and keep their own date until it is. Meta’s Muse Spark Safety & Preparedness Report is read in its copy on arXiv, which prints 12 June 2026; Meta’s own earlier copy, which prints 14 April 2026, dates the report.',
    'openai.com, x.ai, ai.meta.com and microsoft.ai refused direct retrieval of their web pages (HTTP 403 or 400). The cards’ PDF files on the developers’ content hosts were retrieved directly. The Internet Archive refused connections, so no archive copy was opened; a reviewer later found archive captures of eight cards by index search. On 2026-11-03 the address of Meta’s Code World Model Preparedness Report answered HTTP 403. Its quotations had matched the copy retrieved on 2026-11-02, which the reviewer retrieved again with the same checksum. For the second batch the same hosts refused retrieval, and ai.meta.com answered HTTP 400 for the Muse Spark report; the reviewer retrieved the archive captures and Meta’s own copies of that report.',
    'Five further documents were retrieved after the batch was drafted. The cross-family check of 2026-11-03 retrieved Meta’s Muse Spark Safety & Preparedness Report and OpenAI’s o3 Operator addendum; each is earlier than the card chosen for its year. Its second pass of the same day retrieved OpenAI’s Sora system card (dated 9 December 2024), xAI’s Grok-1 model card (no card date; it gives the model’s release as October 2023) and Meta’s Muse Spark Open model card (model release October 2026). The Muse Spark report is a row of the second batch and the Muse Spark Open card a row of the fifth; the other three are not rows yet.',
    'Every quotation was matched by machine against the retrieved card. For the first batch, a reviewer from a different model family checked a sample of 130 cells on 2026-11-03, 90 of them answered blind before comparison. The maintainer excluded six cells on chemical and biological evaluations from that check: Q07 for Claude Haiku 5.5, Llama 3.3, Phi-2, Phi-4, Phi-4-mini-flash-reasoning and Grok 4.1. The reviewing model’s safety safeguards interrupted work on questions about chemical and biological weapons, even at the policy level these cells record. Both model families used for this collection apply such safeguards; these six cells rest on the drafting model’s reading alone. The other 190 cells were checked within the drafting model family only. The maintainer decided the disagreements; one, on the GPT-4V release decision, went to a second pass, which kept the reviewer’s reading.',
    'For the second batch, a reviewer from a different model family checked 60 cells on 2026-11-04, 40 of them answered blind before comparison; the other 68 cells were checked within the drafting model family only. Two of its findings changed a cell’s status, and both cells follow the reviewer’s reading.',
    'The first two batches were drafted by Claude models and checked by Codex, an OpenAI model of the GPT family. The roles were reversed for the third batch: Codex drafted it, and a Claude model checked 40 of its 96 cells on 2026-11-05, 24 of them answered blind before comparison. The other 56 cells have only the drafting model’s machine checks. One finding changed a cell’s status (Grok 4.20, question 5), and the cell follows the reviewer’s reading by the maintainer’s decision.',
    'The fourth and fifth batches were drafted by a Claude model and checked together by Codex on 2026-11-07: it answered 64 of their 256 cells blind before comparison and checked 24 more directly. The other 168 cells have only the drafting model family’s machine checks. Five of its findings changed a cell’s status, and those cells follow the reviewer’s reading. On one cell (Grok 4.6, question 9) the reviewer’s status and its own comparison pointed different ways; the maintainer kept “partly”. By the maintainer’s decision of 2026-11-10, question 5 of Gemini 3 Flash, whose card uses the same wording as the Gemini 2.5 Flash-Lite and Flash cards, now reads “partly” too.',
  ],
  notApplicable: [
    {
      cardId: 'llama-2-model-card',
      facetIds: ['MC.Q03'],
      reason:
        'The card predates every Meta framework edition in the dataset. Its text was added on 2023-07-18 and last revised on 2024-03-23; the earliest edition, the Frontier AI Framework, is dated 2025-02-03.',
    },
    {
      cardId: 'llama-3-3-model-card',
      facetIds: ['MC.Q03'],
      reason:
        'The card predates every Meta framework edition in the dataset. It is dated by the model’s release on 2024-12-06; the earliest edition, the Frontier AI Framework, is dated 2025-02-03. Its revisions of 2024-12-09 and 2025-02-12 change the emissions table, and the text read names no framework.',
    },
    {
      cardId: 'phi-2-model-card',
      facetIds: ['MC.Q03'],
      reason:
        'The card predates every Microsoft framework edition in the dataset. Its earliest located commit is dated 2023-12-13; the earliest edition, the Frontier Governance Framework, is dated 2025-02-08. The revision read, of 2025-12-08, adds a data-summary link and names no framework.',
    },
    {
      cardId: 'phi-4-model-card',
      facetIds: ['MC.Q03'],
      reason:
        'The card predates every Microsoft framework edition in the dataset. It prints a release date of 2024-12-12, and its earliest commit is dated 2024-12-11; the earliest edition, the Frontier Governance Framework, is dated 2025-02-08. The revision read, last changed on 2025-11-24, names no framework.',
    },
    {
      cardId: 'gpt-4v-system-card',
      facetIds: ['MC.Q03'],
      reason:
        'The card predates every OpenAI framework edition in the dataset. It is dated 2023-09-25; the earliest edition, the Preparedness Framework (Beta), is dated 2023-12-18. The card names no framework.',
    },
    ...[
      'llama-2-model-card',
      'llama-3-3-model-card',
      'phi-2-model-card',
      'phi-4-model-card',
      'gpt-4v-system-card',
    ].map((cardId) => ({
      cardId,
      facetIds: ['MC.Q04' as const, 'MC.Q05' as const],
      reason:
        'The card predates every framework edition of its developer in the dataset, so it has no framework to link to or to make a determination under.',
    })),
  ],
};
