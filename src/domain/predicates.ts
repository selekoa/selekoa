export const predicates = {
  evaluation_engagement: {
    label: 'documented evaluation engagement with',
    description:
      'An evaluator’s explicitly documented, system-specific engagement with a developer. Proposed, announced and reported performed work are distinct activity stages. Reported performance does not independently verify execution, effectiveness or certification.',
    // Schema 2.20: a government AI safety institute is a public body.
    subjects: ['organisation', 'public_body'],
    objects: ['organisation'],
  },
  separation_announced: {
    label: 'announced separation from',
    description:
      'A unit or organisation announced separation from its parent institution. Direction is separating unit to parent, not to an inferred successor. This does not establish completed incorporation, staff transfer, ownership transfer or legal succession.',
    subjects: ['organisation'],
    objects: ['organisation'],
  },
  name_transition_announced: {
    label: 'announced new name as',
    description:
      'An explicit historical naming announcement links the earlier named institutional referent to the newly named referent. Dataset identities remain distinct. This is not acquisition, merger, ownership transfer or independently established legal succession.',
    subjects: ['organisation'],
    objects: ['organisation'],
  },
  invested_in: {
    label: 'invested in',
    description:
      'A reported realised investment, scoped to the cited event or snapshot. Instrument and stage are separate; this does not imply control. From schema 2.21 the investor may be a public body.',
    subjects: ['organisation', 'public_body'],
    objects: ['organisation'],
  },
  extended_credit_to: {
    label: 'extended credit to',
    description:
      'Debt financing extended to the borrower. Convertible notes are not automatically equity; conversion and disbursement remain separately qualified.',
    subjects: ['organisation'],
    objects: ['organisation'],
  },
  compute_capacity: {
    label: 'arranged compute capacity with',
    description:
      'A customer-side capacity plan, commitment or contract with the named provider. Stage distinguishes intentions from agreements and delivery; no ownership is implied.',
    subjects: ['organisation'],
    objects: ['organisation'],
  },
  cloud_terms: {
    label: 'reported cloud terms with',
    description:
      'A dated cloud agreement provision, including scoped exclusivity or capacity rights. Does not assert current continuity or payment.',
    subjects: ['organisation'],
    objects: ['organisation'],
  },
  plans_infrastructure_spend: {
    label: 'planned infrastructure spending of',
    description:
      'An infrastructure spending plan, not a funding round, realised expenditure or direct investment in its customer. From schema 2.21 the object may be the identified site the plan is for.',
    subjects: ['organisation'],
    objects: ['literal', 'infrastructure'],
  },
  plans_capacity: {
    label: 'planned capacity for',
    description:
      'Planned capacity of an identified compute asset or, from schema 2.21, of a group of sites a source states together (a literal naming the group). No deployment, operation, procurement or ownership is established, and a group’s figure is never divided among its sites.',
    subjects: ['organisation'],
    objects: ['infrastructure', 'literal'],
  },
  supersedes_document: {
    label: 'supersedes version',
    description:
      'A publisher-documented replacement within one framework family. Direction is newer version to predecessor; later publication alone is insufficient. This does not revise or retire dataset claims.',
    subjects: ['document'],
    objects: ['document'],
  },
  changes_from: {
    label: 'changes from',
    description:
      'One scoped difference between document versions. The claim identifies publisher-stated change, official changelog/redline, or an explicitly inferred comparison. It does not establish implementation, effectiveness or a safety ranking.',
    subjects: ['document'],
    objects: ['document'],
  },
  states_provision: {
    label: 'states provision',
    description:
      'An exact framework edition, or another document with an exact expression, states one provision: a capability threshold or risk level and its trigger, a required safeguard or action, a decision authority (who decides, recommends, can overrule or is informed), a stated exception, or another statement of its content, such as a licence term or a prospectus statement. The passage records what the document says, not implementation, compliance or effectiveness. Provisions with the same key align across editions of one family.',
    subjects: ['document'],
    objects: ['literal'],
  },
  provision_not_found: {
    label: 'has no matching provision within the inspected scope',
    description:
      'A recorded absence: within the stated locator scope of an exact edition, no passage stating the keyed provision was found. It is not an inferred deletion and says nothing about other documents, practice or intent.',
    subjects: ['document'],
    objects: ['literal'],
  },
  provision_assessed: {
    label: 'has a disputed assessment of its provision',
    description:
      'Competent sources assess one keyed provision of an exact edition, for example whether it adequately constrains what it governs. The record keeps the assessments on each side and is contested or unresolved, never supported. It is not evidence of what the text says, which the provision record quotes.',
    subjects: ['document'],
    objects: ['literal'],
  },
  holds_control_right: {
    label: 'holds a control right over',
    description:
      'A documented right through which the subject controls, or shapes the governance of, the object — controlling it as sole member or general partner, holding its voting control, or electing, appointing or removing its directors — through a named instrument and from a stated date. Stage separates planned, announced or agreed arrangements from effective ones. A control right is not an ownership share: an equity stake, an observer seat or a board seat is not control, and none is inferred from another.',
    subjects: ['organisation'],
    objects: ['organisation'],
  },
  has_legal_form: {
    label: 'has legal form',
    description:
      'A documented legal form or status at a stated date, for example a Delaware public benefit corporation or a nonprofit corporation. Legal form describes the entity, not how it is governed in practice.',
    subjects: ['organisation'],
    objects: ['literal'],
  },
  formed_entity: {
    label: 'formed',
    description:
      'An existing organisation is documented as forming a new entity, such as a partnership, subsidiary or trust. Formation is not evidence of control or ownership, which are recorded separately.',
    subjects: ['organisation'],
    objects: ['organisation'],
  },
  converted_into: {
    label: 'converted into',
    description:
      'A documented conversion or restructuring of one entity into another entity or legal form. Stage separates announced plans from effective conversions. Continuity of assets, contracts, obligations or control is not implied beyond the evidence.',
    subjects: ['organisation'],
    objects: ['organisation'],
  },
  control_assessed: {
    label: 'has an assessment of its control',
    description:
      'One substantive proposition about how an entity is controlled in practice, for example whether a nonprofit can exercise effective control after a restructuring. The record is contested when opposing passages assess that same proposition, or an unresolved question carrying context evidence only; it is never supported. It is not evidence of the arrangement itself, which other records state.',
    subjects: ['organisation', 'document'],
    objects: ['literal'],
  },
  enacted: {
    label: 'enacted',
    description:
      'A legislature or executive enacted, approved or adopted a legal instrument on the stated date. Enactment is not evidence of enforcement, compliance or applicability to any named organisation; operative dates are separate.',
    subjects: ['public_body'],
    objects: ['document'],
  },
  signed_commitment: {
    label: 'is documented as a signatory of',
    description:
      'An organisation, a public body or a country is documented as having signed, joined or made a commitment text, with the date basis (announcement, signature or listing) and any stated scope. Signing is not compliance, implementation or effectiveness.',
    subjects: ['organisation', 'public_body', 'country'],
    objects: ['document'],
  },
  lists_participants: {
    label: 'lists as participants',
    description:
      'A document lists the participants in a text or process, such as signatories, endorsers, attendees or reporting organisations, at a stated date (schema 2.19). The record gives the list and how many entries it has, stated by the source or counted by Selekoa. Lists of the same text at different dates are separate records. From schema 2.27 a record may give one listed entity’s entry, counted as one, naming the organisation it maps the listed name to. Being listed is not a signature, ratification, approval or compliance, and absence from a list is not a refusal.',
    subjects: ['document'],
    objects: ['literal'],
  },
  introduced: {
    label: 'introduced',
    description:
      'A legislative chamber records the introduction of a bill on the stated date (schema 2.19). Introduction is not passage or enactment.',
    subjects: ['public_body'],
    objects: ['document'],
  },
  passed: {
    label: 'passed',
    description:
      'A legislative chamber passed a bill on the stated date, as the cited record says (schema 2.19). The statement names the chamber. Passage by one chamber is not enactment.',
    subjects: ['public_body'],
    objects: ['document'],
  },
  vetoed: {
    label: 'vetoed',
    description:
      'An executive returned a bill without signature on the stated date (schema 2.19). Stated reasons are attributed to the executive, not adopted.',
    subjects: ['public_body'],
    objects: ['document'],
  },
  revoked: {
    label: 'revoked',
    description:
      'An instrument or a public body revoked or rescinded another instrument on the stated date (schema 2.19). An announced revocation not yet formalised carries the activity stage announced and is dated by its announcement. Revocation does not erase the revoked text or its history, and says nothing about measures taken under it.',
    subjects: ['document', 'public_body'],
    objects: ['document'],
  },
  declined_commitment: {
    label: 'stated it would not sign',
    description:
      'An organisation publicly stated that it would not sign a commitment text. The record is the statement, not a finding about the organisation’s practices or legal obligations.',
    subjects: ['organisation'],
    objects: ['document'],
  },
  references_commitment: {
    label: 'explicitly links itself to',
    description:
      'A framework or company document explicitly presents itself as fulfilling, implementing, responding to or prepared under a commitment or legal obligation, in its own words. The link is the document’s statement; it is not evidence of compliance.',
    subjects: ['document'],
    objects: ['document'],
  },
  applies_framework: {
    label: 'applies parts of',
    description:
      'A document explicitly applies parts of another framework. A version-unspecified reference targets a framework-family concept; this is not supersession or wholesale adoption.',
    subjects: ['document'],
    objects: ['document', 'concept'],
  },
  held_role: {
    label: 'held role at',
    description:
      'An institutional role with explicitly scoped time: snapshot, sourced interval, or unknown dates. No continuing appointment is implied.',
    subjects: ['person'],
    // Schema 2.20: a role at a public body, such as a government institute.
    objects: ['organisation', 'public_body'],
  },
  co_founded: {
    label: 'co-founded',
    description:
      'Participation in founding an organisation or research team. Neither sole founding nor legal incorporation is implied.',
    subjects: ['person'],
    objects: ['organisation'],
  },
  departure_announced: {
    label: 'had departure announced from',
    description:
      'A source announced this person’s departure from a specified role. The event date is the announcement, not an inferred final working day or end of every association.',
    subjects: ['person'],
    objects: ['organisation'],
  },
  launched: {
    label: 'publicly launched',
    description:
      'A public organisational launch by the named actor. This date does not establish legal incorporation or sole founding.',
    subjects: ['person'],
    objects: ['organisation'],
  },
  acquired: {
    label: 'acquired',
    description:
      'An acquisition of the named organisation, with timing and scope qualified by the evidence. Distinct from an internal reorganisation or team combination.',
    subjects: ['organisation'],
    objects: ['organisation'],
  },
  unit_of: {
    label: 'was a unit of',
    description:
      'A documented internal research team or unit within an organisation. Does not establish a separate legal subsidiary or an ownership transaction.',
    subjects: ['organisation'],
    objects: ['organisation'],
  },
  combined_into: {
    label: 'combined into',
    description:
      'An announced organisational combination; not a claim that the predecessor was a separate legal company.',
    subjects: ['organisation'],
    objects: ['organisation'],
  },
  // Schema 2.23 (AI in biology admission, decision 5 of 2026-10-30).
  partnership_announced: {
    label: 'announced a partnership with',
    description:
      'An organisation announced a collaboration or partnership with a named counterparty, as the announcement states it (stage announced). It is not evidence that the work was performed, that a payment was made or that the arrangement continues; an “up to” amount stays in the statement.',
    subjects: ['organisation'],
    objects: ['organisation'],
  },
  award_announced: {
    label: 'announced an award to',
    description:
      'An awarding body announced its decision to award a named prize to a person, with the citation in its own words. It is the awarding body’s statement, not a Selekoa assessment of the work, and it does not attribute the work to the laureate alone.',
    subjects: ['organisation', 'public_body'],
    objects: ['person'],
  },
  // Lab genealogy (schema 2.15).
  founding_stated: {
    label: 'is stated to have been founded in',
    description:
      'A source states the organisation’s founding date or year, at the precision it gives. Neither legal incorporation nor a complete founder roster is implied.',
    subjects: ['organisation'],
    objects: ['literal'],
  },
  licensing_hiring_agreement: {
    label: 'made a licensing and hiring agreement with',
    description:
      'An announced arrangement under which the subject licenses the object’s technology and hires some of its staff. It is not an acquisition, and the record does not establish which staff moved or the terms.',
    subjects: ['organisation'],
    objects: ['organisation'],
  },
  unit_disbanded: {
    label: 'ended as a unit of',
    description:
      'A source documents that a team or unit ceased to exist as a separate unit within its parent (subject: the unit; object: the parent). Where its members or work went is not established; a planned change is marked announced.',
    subjects: ['organisation'],
    objects: ['organisation'],
  },
  investment_announced: {
    label: 'announced investment in',
    description:
      'A counterparty announced an investment. Amount and transaction stage are qualified separately. From schema 2.21 the investor may be a public body.',
    subjects: ['organisation', 'public_body'],
    objects: ['organisation'],
  },
  participated_in_round: {
    label: 'participated in funding for',
    description:
      'Named participation in a financing round. The full round total is not attributed to this investor.',
    subjects: ['organisation'],
    objects: ['organisation'],
  },
  announced_funding: {
    label: 'announced funding of',
    description:
      'The reported total of a financing round, not a valuation or any one investor’s contribution.',
    subjects: ['organisation'],
    objects: ['literal'],
  },
  selected_cloud_provider: {
    label: 'selected cloud provider',
    description:
      'A dated announcement describing cloud provision. Direction runs from customer to provider; this does not assert payment or continuing exclusivity.',
    subjects: ['organisation'],
    objects: ['organisation'],
  },
  // Schema 2.21: the compute, power and orbit records.
  announced_site: {
    label: 'announced site',
    description:
      'A party announced a data-centre site, campus or other infrastructure, dated by the announcement. An announcement is not construction, operation, ownership or a contract.',
    subjects: ['organisation', 'public_body'],
    objects: ['infrastructure'],
  },
  status_stated: {
    label: 'has status as stated',
    description:
      'A party states the status of an infrastructure or programme, such as construction under way, energised or operating, dated by the statement. It is the stating party’s account, not an independent finding, and a stated status is not extended beyond what the statement covers.',
    subjects: ['infrastructure', 'public_body'],
    objects: ['literal'],
  },
  power_agreement: {
    label: 'has a power agreement with',
    description:
      'A stated agreement on electricity supply, a power purchase, a plant restart or the development of generation, at the stage the parties state. It is not delivery of power, and an agreement to explore is not a contract.',
    subjects: ['organisation', 'public_body'],
    objects: ['organisation', 'public_body'],
  },
  supply_agreement: {
    label: 'has a supply agreement with',
    description:
      'A stated agreement to supply chips, memory, systems or manufacturing, at the stage the parties state, with the product and quantity as worded. It is not delivery or payment.',
    subjects: ['organisation'],
    objects: ['organisation'],
  },
  government_award: {
    label: 'made a government award to',
    description:
      'A public body states an award, grant or selection, with its stage: preliminary, final or disbursed. A preliminary award is not a final one, and a final award is not disbursement.',
    subjects: ['public_body'],
    objects: ['organisation'],
  },
  granted_equity_right: {
    label: 'granted an equity right to',
    description:
      'A company states that it grants or issued a warrant or other right to acquire its shares, with its conditions. A right is not an exercised purchase or a holding.',
    subjects: ['organisation'],
    objects: ['organisation', 'public_body'],
  },
  announced_plan: {
    label: 'announced plan',
    description:
      'A party announced a plan, programme or intention, dated by the announcement. A plan is not an action, a contract or spending.',
    subjects: ['organisation', 'public_body'],
    objects: ['literal', 'infrastructure'],
  },
  launch_stated: {
    label: 'stated the launch of',
    description:
      'A party states that a spacecraft or constellation was launched, dated by the statement. Launch is not operation or performance in orbit.',
    subjects: ['organisation'],
    objects: ['infrastructure'],
  },
  filed_application: {
    label: 'filed application',
    description:
      'A party filed an application with a regulator, dated by the filing as the regulator lists it. A filing is not an authorisation.',
    subjects: ['organisation'],
    objects: ['document'],
  },
  regulator_decision: {
    label: 'recorded a regulator decision on',
    description:
      'A regulator’s decision, dated by the regulator’s own record where it was retrieved and otherwise by the statement that reports it, which the record names. The decision covers only what its record states.',
    subjects: ['public_body'],
    objects: ['literal', 'document', 'organisation', 'infrastructure'],
  },
  accepted_for_filing: {
    label: 'accepted for filing',
    description:
      'A regulator accepted an application for filing, opening it to comment. Acceptance for filing is not approval.',
    subjects: ['public_body'],
    objects: ['document'],
  },
  designated_zone: {
    label: 'designated zone',
    description:
      'A government designated a zone, such as an AI Growth Zone, dated by the designation as stated. A designation is not construction or investment in it.',
    subjects: ['public_body'],
    objects: ['infrastructure'],
  },
  uses_infrastructure: {
    label: 'uses infrastructure',
    description:
      'Use of a named compute asset at the documented date. Does not establish ownership.',
    subjects: ['organisation'],
    objects: ['infrastructure'],
  },
  uses_hardware_from: {
    label: 'uses hardware from',
    description:
      'Supplier hardware is reported in a compute asset. No purchase price or direct purchasing contract is implied.',
    subjects: ['infrastructure'],
    objects: ['organisation'],
  },
  published: {
    label: 'published',
    description:
      'Publication of a specific document or version. Publication of a policy is not evidence of implementation.',
    subjects: ['organisation', 'public_body'],
    objects: ['document'],
  },
  authored: {
    label: 'authored',
    description:
      'Authorship as credited in the document. Does not imply sole authorship.',
    subjects: ['person'],
    objects: ['document'],
  },
  cites: {
    label: 'cites',
    description:
      'An explicit reference to a work. Citation alone is neither agreement nor causal influence.',
    subjects: ['document'],
    objects: ['document'],
  },
  uses_method_from: {
    label: 'reports using method from',
    description:
      'A document explicitly reports using an identified method or architecture from another work in its own study. Requires a named method and primary evidence from the reporting document. Citation, comparison, proposed future use and similarity alone do not qualify. This is reported use, not independently verified implementation or institutional adoption.',
    subjects: ['document'],
    objects: ['document'],
  },
  explicitly_credits: {
    label: 'explicitly credits',
    description:
      'A document expressly attributes intellectual or practical contribution to a named actor, with the scope retained in the claim.',
    subjects: ['document'],
    // Schema 2.26: a literal actor, for a person the source names who has no
    // record of their own.
    objects: ['person', 'organisation', 'literal'],
  },
  discusses: {
    label: 'discusses',
    description:
      'The concept is explicitly discussed in the document. This makes no earliest-use, invention or transmission claim.',
    subjects: ['document'],
    objects: ['concept'],
  },
  // Schema 2.26: a naming record. The document uses a name for a family of
  // methods or a term that a concept's naming criterion describes.
  uses_term: {
    label: 'uses the name',
    description:
      'A passage of the document uses a name for a family of methods or a term, in the sense the concept’s naming criterion describes or, where labelled, in another sense. The record documents the use; it is not evidence that the name began there, and it implies no influence on or from another text.',
    subjects: ['document'],
    objects: ['concept'],
  },
  reports_evaluation_of: {
    label: 'reports evaluation of',
    description:
      'A document names a concept as an evaluation category. This is not a finding that the evaluated system exhibits the property.',
    subjects: ['document'],
    objects: ['concept'],
  },
  states_evaluation_result: {
    label: 'states evaluation result',
    description:
      'A report states the result of an evaluation it ran or commissioned, in its own words, with what was measured, by what kind of method, and the caveats the report itself gives (schema 2.22). The record is the report’s statement, not a verified finding: it says nothing about another system, a later version or real-world risk, and a null or limiting result is not evidence that no effect exists.',
    subjects: ['document'],
    objects: ['literal'],
  },
  // Schema 2.24 (key papers admission, decision 4 of 2026-10-28).
  states_contribution: {
    label: 'states its contribution',
    description:
      'A paper or other publication describes its own contribution, quoted from the expression the record names, usually its abstract or introduction. The record is the document’s own description, not an assessment: a claim of priority or novelty it contains is the document’s claim, flagged as such, and says nothing about earlier or later work.',
    subjects: ['document'],
    objects: ['literal'],
  },
  // Schema 2.25 (key papers admission, decision 2 of 2026-10-28).
  credits_work: {
    label: 'attributes to',
    description:
      'A document expressly attributes an argument, concept, term, finding or approach to another work, in its own words; the kind of attribution is recorded. The record is the citing document’s claim. It is not evidence that the cited work originated the idea, that the attribution is accurate, or of influence beyond the passage. Citation alone is recorded as a citation.',
    subjects: ['document'],
    objects: ['document'],
  },
  supported_research: {
    label: 'supported research for',
    description:
      'Research support expressly acknowledged by the authors. No grant amount or employment relationship is implied.',
    subjects: ['organisation'],
    objects: ['document'],
  },
  // How a text stands to a proposition (schema 2.11). The record documents what
  // the text says, in its register; it is not evidence that the proposition is
  // true, and it relates the text to no other text.
  articulates_proposition: {
    label: 'articulates',
    description:
      'A passage of the document meets the proposition’s criterion. The record documents what the text states, in its register (fiction and satire are labelled); it is not evidence that the proposition is true and implies no influence on or from another text.',
    subjects: ['document'],
    objects: ['concept'],
  },
  contests_proposition: {
    label: 'contests',
    description:
      'A passage of the document disputes the proposition or a premise it depends on. The record documents the text’s position, not who is right.',
    subjects: ['document'],
    objects: ['concept'],
  },
  bears_on_proposition: {
    label: 'bears on',
    description:
      'A passage of the document bears on the proposition without meeting its criterion; the record names the missing element. It is not an articulation and implies no influence.',
    subjects: ['document'],
    objects: ['concept'],
  },
} as const;

/** The kinds of an attributed credit (schema 2.25), as a reader reads them. */
export const attributionLabels = {
  builds_on: 'Builds on the work',
  attributes_term: 'Attributes a term or concept to the work',
  summarises: 'Summarises an argument or finding of the work',
  attributes_and_disputes: 'Attributes an argument to the work and disputes it',
} as const;

/** The stance of each proposition predicate (schema 2.11). */
export const propositionStances = {
  articulates_proposition: 'articulates',
  contests_proposition: 'contests',
  bears_on_proposition: 'bears_on',
} as const satisfies Partial<Record<keyof typeof predicates, string>>;

export type Predicate = keyof typeof predicates;
export const topics = [
  'people',
  'institutions',
  'ideas',
  'capital',
  'compute',
  'governance',
] as const;
export type Topic = (typeof topics)[number];

/**
 * Records whose route shows a narrower label than their predicate's, because
 * the statement says no more than the label does. The predicate is unchanged
 * (maintainer decision of 2026-10-29, review/reader-decisions-2026-10-29.md).
 */
export const relationLabelOverrides: Record<string, string> = {
  // The statement says only that the founder named a financial backer.
  'cn-high-flyer-backing': 'named as a financial backer of',
};

/** The relation label a record's route shows. */
export function relationLabel(claim: {
  id: string;
  predicate: Predicate;
}): string {
  return relationLabelOverrides[claim.id] ?? predicates[claim.predicate].label;
}
