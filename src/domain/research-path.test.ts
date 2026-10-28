import { describe, expect, it } from 'vitest';
import {
  questionPath,
  readingDates,
  readingPosition,
  resolveQuestion,
  researchPath,
  researchPaths,
} from './research-path';
import { repository } from './repository';
import { institutionalDossier } from './dossier';
import genealogy from '../../review/genealogy-admission-before-2026-10-17.json';
import archiveAdmissions from '../../review/archive-admissions-before-2026-10-26.json';
import authorPersons from '../../review/author-persons-before-2026-10-27.json';
import frameworksToLaw1 from '../../review/frameworks-to-law-1-before-2026-10-28.json';
import frameworksToLaw2 from '../../review/frameworks-to-law-2-before-2026-10-28.json';
const data = repository.data;
// Records of the 2026-10-17 lab genealogy, left out of the earlier counts.
// The genealogy records, including the five admitted on 2026-10-26, and the
// authorship records of the 2026-10-27 author-person admission.
const fromGenealogy = new Set([
  ...genealogy.added.claims,
  ...archiveAdmissions.added.claims,
  ...authorPersons.added.claims,
  ...frameworksToLaw1.added.claims,
  ...frameworksToLaw2.added.claims,
]);
const earlier = <T extends { id: string }>(claims: T[]) =>
  claims.filter((c) => !fromGenealogy.has(c.id));
const path = researchPath(data, 'anthropic')!;
const principalIds = [
  'dario-cofounded-anthropic-2021',
  'daniela-cofounded-anthropic-2021',
  'chris-olah-cofounded-anthropic-2021',
  'jack-clark-cofounded-anthropic-2021',
  'tom-brown-cofounded-anthropic-2021',
  'jared-kaplan-anthropic-cofounder',
  'sam-mccandlish-anthropic-cofounder',
  'dario-anthropic-2021',
  'daniela-anthropic-2021',
];
const originalIds = [
  ...principalIds,
  'lineage-dario-amodei-preferences',
  'lineage-preferences-cites-trpo',
  'olah-brain-team-2017',
  'lineage-mccandlish-authored-batch',
  'lineage-kaplan-authored-scaling',
  'lineage-scaling-uses-batch',
  'lineage-summaries-cites-preferences',
  'dario-openai-vp-2020',
  'dario-openai-departure-announced-2020',
  'daniela-openai-safety-prior',
  'olah-openai-interpretability-prior',
];

describe('branched reading projection', () => {
  it('groups all seven founding attributions and two leadership snapshots, retaining 11 optional records without factual mutation', () => {
    const before = JSON.stringify(data);
    expect(
      path.items
        .filter((i) => i.section.kind === 'principal')
        .map((i) => i.claimId),
    ).toEqual(principalIds);
    expect(
      path.sections.filter((s) => s.kind === 'context').map((s) => s.id),
    ).toEqual(['personnel', 'feedback', 'scaling']);
    expect(path.items.map((i) => i.claimId).sort()).toEqual(
      [...originalIds].sort(),
    );
    for (const item of path.items) {
      expect(item.claim).toBe(repository.claims.get(item.claimId));
      expect(item).not.toHaveProperty('readAlongside');
      for (const id of item.claim.evidenceIds)
        expect(repository.evidence.get(id)?.claimId).toBe(item.claimId);
    }
    expect(
      researchPath(
        {
          ...data,
          claims: [...data.claims].reverse(),
          entities: [...data.entities].reverse(),
          sources: [...data.sources].reverse(),
          evidence: [...data.evidence].reverse(),
        },
        'anthropic',
      ),
    ).toEqual(path);
    expect(JSON.stringify(data)).toBe(before);
    // 130 before week 4a, plus the two contested RSP change assessments,
    // plus week 4b's Frontier Compliance Framework announcement and RSP
    // v3.0's quoted reference to California SB 53, plus week 4c's eleven
    // control-structure records about Anthropic (legal forms, the 2021
    // committee, the Trust's rights and appointees, and one disputed
    // assessment) and its eleven commitment records (four listings or
    // announced intents, and seven quoted references in RSP editions to the
    // White House and Seoul commitments).
    // Provision-level records stay on document pages, not in dossiers.
    // The path's own selection is unchanged; the assessments are counted in
    // the dossier total, not selected as path items.
    // The 2026-10-17 lab genealogy adds its Anthropic records to the total,
    // and the 2026-10-28 frameworks-to-law admission its links from RSP
    // editions; both are excluded here.
    expect(
      path.totalClaims! -
        institutionalDossier(data, 'anthropic')!.claims.filter((c) =>
          fromGenealogy.has(c.id),
        ).length,
    ).toBe(156);
    expect(path.version).toBe(3);
    expect(path.editorialStatus).toBe('machine-proposed');
  });
  it('shows year precision and retrospective publication inline without dating undated events', () => {
    for (const id of principalIds.slice(0, 5)) {
      const item = path.items.find((i) => i.claimId === id)!;
      expect(item.dates.record).toBe('2021 · event · year-only precision');
      expect(item.dates.publications[0]).toMatchObject({
        date:
          id.startsWith('dario') || id.startsWith('daniela')
            ? '2022-04-29'
            : '2024',
        retrospective: true,
      });
    }
    const unknown = path.items.find(
      (i) => i.claimId === 'jared-kaplan-anthropic-cofounder',
    )!;
    expect(unknown.dates.record).toBe('Date unknown');
    expect(unknown.dates.publications[0]).toMatchObject({
      date: '2024-10-15',
      retrospective: false,
    });
    const c = repository.claims.get(principalIds[0])!;
    for (const date of ['2021', '2021-12-31', null]) {
      const scoped = {
        ...data,
        sources: data.sources.map((s) =>
          s.id === 'source-anthropic-series-b-2022'
            ? { ...s, publicationDate: date }
            : s,
        ),
      };
      expect(readingDates(scoped, c).publications[0].retrospective).toBe(false);
    }
  });
  it('resolves old bookmarks by identity after regrouping and rejects broken structure', () => {
    for (const id of originalIds)
      expect(path.items[readingPosition(path, id)].claimId).toBe(id);
    expect(path.items[readingPosition(path, 'removed')].claimId).toBe(
      principalIds[0],
    );
    const selection = researchPaths[0];
    expect(() =>
      researchPath(data, 'anthropic', [
        { ...selection, items: [...selection.items, selection.items[0]] },
      ]),
    ).toThrow('distinct claim IDs');
    expect(() =>
      researchPath(data, 'anthropic', [
        {
          ...selection,
          items: [{ ...selection.items[0], claimId: 'altman-openai-2015' }],
        },
      ]),
    ).toThrow('Invalid reading selection');
    expect(() =>
      researchPath(data, 'anthropic', [
        { ...selection, sections: selection.sections.slice(1) },
      ]),
    ).toThrow('exactly one principal');
    expect(researchPath(data, 'openai')).toBeNull();
  });
  it('keeps authored passages traceable to selected claims and rejects orphaned or ambiguous support', () => {
    const passages = [
      ...path.introduction,
      ...path.sections.flatMap((s) => s.passages),
    ];
    expect(passages.map((p) => p.id)).toEqual([
      'formation-introduction',
      'founding-testimony',
      'early-leadership',
      'personnel-context',
      'feedback-context',
      'scaling-context',
    ]);
    // The lab genealogy's further co-founder credits (2026-10-17) are not
    // part of the path's selection.
    const founders = earlier(data.claims).filter(
      (c) =>
        c.predicate === 'co_founded' &&
        c.object.kind === 'entity' &&
        c.object.entityId === 'anthropic',
    );
    expect(founders).toHaveLength(7);
    expect(founders.every((c) => principalIds.includes(c.id))).toBe(true);
    for (const passage of passages) {
      expect(passage.claimIds.length).toBeGreaterThan(0);
      for (const id of passage.claimIds) {
        const claim = repository.claims.get(id)!;
        expect(path.items.some((i) => i.claimId === id)).toBe(true);
        expect(claim.evidenceIds.length).toBeGreaterThan(0);
      }
    }
    const selection = researchPaths[0];
    for (const invalid of [
      { ...selection.introduction[0], claimIds: ['missing-claim'] },
      { ...selection.introduction[0], claimIds: [] },
      {
        ...selection.introduction[0],
        claimIds: [principalIds[0], principalIds[0]],
      },
      { ...selection.introduction[0], id: 'founding-testimony' },
    ])
      expect(() =>
        researchPath(data, 'anthropic', [
          { ...selection, introduction: [invalid] },
        ]),
      ).toThrow('Invalid reading passage support');
    for (const id of [
      'jared-kaplan-anthropic-cofounder',
      'sam-mccandlish-anthropic-cofounder',
    ]) {
      expect(path.items.find((i) => i.claimId === id)).toMatchObject({
        sectionId: 'formation',
        dates: { record: 'Date unknown' },
      });
    }
  });
  it('keeps OpenAI reusable without publishing a second selection', () => {
    const openai = institutionalDossier(data, 'openai')!;
    // 158 before week 4b, plus the Frontier Governance Framework's quoted
    // designation as OpenAI's framework under California SB 53, plus seven
    // week 4c records naming the OpenAI umbrella identity (the 2019 and 2025
    // structure announcements, the December 2024 plan and four board
    // changes), plus five commitment records (three listings, one announced
    // intent and its framework's quoted reference to the EU Code of
    // Practice). Records about its separate legal entities stay on the
    // control-structure page. The 2017 author-affiliation record of
    // 2026-10-15 makes Paul Christiano one of its people, which brings in
    // ten records about him and his papers.
    // The 2026-10-17 lab genealogy adds its OpenAI records, and the
    // 2026-10-28 frameworks-to-law admission two framework links; both are
    // excluded here.
    expect(earlier(openai.claims)).toHaveLength(181);
    expect(openai.claims.map((c) => c.id)).toContain('sb-link-openai-fgf');
    expect(
      earlier(openai.claims).filter((c) => c.time.kind === 'unknown'),
    ).toHaveLength(23);
    expect(
      openai.sections.people.filter((g) => earlier(g.claims).length),
    ).toHaveLength(22);
    expect(
      openai.sections.ideas.find((g) => g.id === 'human-preferences-paper')
        ?.connectionClaims?.[0].id,
    ).toBe('dario-openai-vp-2020');
    expect(
      openai.sections.ideas
        .find((g) => g.id === 'weak-strong-paper')
        ?.connectionClaims?.map((c) => c.id),
    ).toEqual(['lineage-ii-openai-published-weak']);
    const fixture = {
      ...researchPaths[0],
      institutionId: 'openai',
      introduction: [],
      sections: [{ ...researchPaths[0].sections[0], passages: [] }],
      items: [
        {
          claimId: 'altman-openai-2015',
          sectionId: 'formation',
          rationale: 'Test-only direct institutional snapshot.',
        },
      ],
    };
    expect(researchPath(data, 'openai', [fixture])?.items[0].claim).toBe(
      repository.claims.get('altman-openai-2015'),
    );
    expect(researchPaths.map((p) => p.institutionId)).toEqual(['anthropic']);
  });
  it('resolves the same question by ID, with computed disputes and open questions', () => {
    const question = questionPath(data, 'anthropic-formation')!;
    expect(question).toEqual(path);
    expect(questionPath(data, 'missing')).toBeNull();
    expect(question.disputed).toEqual({ claims: [], counterevidence: [] });
    // Branch limits and record warnings come from the selection, in order.
    expect(question.openQuestionList.map((q) => q.id)).toEqual([
      'limit-formation',
      'limit-personnel',
      'warning-dario-openai-departure-announced-2020',
      'warning-daniela-openai-safety-prior',
      'limit-feedback',
      'limit-scaling',
    ]);
    for (const q of question.openQuestionList)
      expect(q.text).toBe(
        q.source === 'branch-limit'
          ? question.sections.find((s) => s.id === q.sectionId)!.gap
          : question.items.find((i) => i.claimId === q.claimIds[0])!.warning,
      );
  });
  it('supports questions without an anchoring institution and authored open questions', () => {
    const selection = researchPaths[0];
    const unanchored = resolveQuestion(data, {
      ...selection,
      id: 'test-unanchored',
      institutionId: undefined,
      openQuestions: [
        {
          id: 'test-open',
          text: 'Test-only authored question.',
          claimIds: [selection.items[0].claimId],
        },
      ],
    });
    expect(unanchored.institution).toBeNull();
    expect(unanchored.totalClaims).toBeNull();
    expect(unanchored.openQuestionList[0]).toMatchObject({
      id: 'test-open',
      source: 'authored',
    });
    // Unanchored questions may read any stored claim.
    expect(
      resolveQuestion(data, {
        ...selection,
        institutionId: undefined,
        introduction: [],
        sections: [{ ...selection.sections[0], passages: [] }],
        items: [
          {
            claimId: 'altman-openai-2015',
            sectionId: 'formation',
            rationale: 'Test-only.',
          },
        ],
      }).items[0].context,
    ).toBe('Separate personnel context');
    const contested = structuredClone(data);
    contested.claims.find(
      (c) => c.id === selection.items[0].claimId,
    )!.resolution = 'contested';
    expect(
      questionPath(contested, selection.id)!.disputed.claims.map((c) => c.id),
    ).toEqual([selection.items[0].claimId]);
  });
});
