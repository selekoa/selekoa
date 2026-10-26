export const predicates = {
  evaluation_engagement: {
    label: 'documented evaluation engagement with',
    description:
      'An evaluator’s explicitly documented, system-specific engagement with a developer. Proposed, announced and reported performed work are distinct activity stages. Reported performance does not independently verify execution, effectiveness or certification.',
    subjects: ['organisation'],
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
      'A reported realised investment, scoped to the cited event or snapshot. Instrument and stage are separate; this does not imply control.',
    subjects: ['organisation'],
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
      'An infrastructure spending plan, not a funding round, realised expenditure or direct investment in its customer.',
    subjects: ['organisation'],
    objects: ['literal'],
  },
  plans_capacity: {
    label: 'planned capacity for',
    description:
      'Planned capacity of an identified compute asset. No deployment, operation, procurement or ownership is established.',
    subjects: ['organisation'],
    objects: ['infrastructure'],
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
      'An exact framework edition states one provision: a capability threshold or risk level and its trigger, a required safeguard or action, a decision authority (who decides, recommends, can overrule or is informed), or a stated exception. The quoted text records what the edition says, not implementation, compliance or effectiveness. Provisions with the same key align across editions of one family.',
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
      'An organisation is documented as having signed, joined or made a commitment text, with the date basis (announcement, signature or listing) and any stated scope. Signing is not compliance, implementation or effectiveness.',
    subjects: ['organisation'],
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
    objects: ['organisation'],
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
      'A counterparty announced an investment. Amount and transaction stage are qualified separately.',
    subjects: ['organisation'],
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
    objects: ['person', 'organisation'],
  },
  discusses: {
    label: 'discusses',
    description:
      'The concept is explicitly discussed in the document. This makes no earliest-use, invention or transmission claim.',
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
