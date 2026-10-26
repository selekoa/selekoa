import { describe, expect, it } from 'vitest';
import { institutionalDossier } from './dossier';
import { repository } from './repository';
import week4b from '../../review/week4b-before-2026-10-04.json';
import week4c from '../../review/week4c-before-2026-10-04.json';
import genealogy from '../../review/genealogy-admission-before-2026-10-17.json';

const data = repository.data;
const dossier = institutionalDossier(data, 'anthropic')!;
const ids = (section: keyof typeof dossier.sections) =>
  dossier.sections[section].flatMap((g) => g.claims.map((c) => c.id));

describe('institutional dossier projection', () => {
  it('keeps DeepMind, Brain and Google DeepMind distinct while exposing evidenced navigation', () => {
    const dm = institutionalDossier(data, 'deepmind')!;
    const brain = institutionalDossier(data, 'google-brain')!;
    const gdm = institutionalDossier(data, 'google-deepmind')!;
    expect(
      dm.institutionLinks.map((l) => [l.entity.id, l.claim.id]),
    ).toContainEqual(['google-deepmind', 'deepmind-combined-2023']);
    // The 2026-10-17 lab genealogy adds four units recorded within Google
    // DeepMind.
    expect(gdm.institutionLinks.map((l) => l.entity.id)).toEqual([
      'google-brain',
      'deepmind',
      'gdm-responsibility-council',
      'google-research-model-building-teams',
      'google-research-responsible-ai-teams',
      'gemini-app-team',
      'gdm-agi-safety-council',
    ]);
    expect(brain.institutionLinks.map((l) => l.entity.id)).toContain(
      'google-deepmind',
    );
    expect(dm.institutionLinks.map((l) => l.entity.id)).not.toContain('openai');
    expect(gdm.claims.map((c) => c.id)).not.toContain(
      'atlas-deepmind-ethics-publication',
    );
    expect(
      dm.sections.governance.flatMap((g) => g.claims.map((c) => c.id)),
    ).not.toContain('issued-fsf-3-1');
    for (const link of [...dm.institutionLinks, ...gdm.institutionLinks])
      expect(link.claim).toBe(repository.claims.get(link.claim.id));
  });
  it('provides all five sections for OpenAI and both DeepMind identities with inspectable cross-institution context', () => {
    for (const id of ['openai', 'deepmind', 'google-deepmind']) {
      const d = institutionalDossier(data, id)!;
      for (const groups of Object.values(d.sections))
        expect(groups.length).toBeGreaterThan(0);
      expect(new Set(d.claims.map((c) => c.id)).size).toBe(d.claims.length);
    }
    const dm = institutionalDossier(data, 'deepmind')!;
    expect(dm.claims.map((c) => c.id)).toEqual(
      expect.arrayContaining([
        'google-acquired-deepmind-2014',
        'atlas-deepmind-chinchilla',
        'lineage-chinchilla-cites-scaling',
        'atlas-feedback-credits-openai',
        'atlas-deepmind-alphafold-compute',
      ]),
    );
    const gdm = institutionalDossier(data, 'google-deepmind')!;
    expect(
      gdm.sections.ideas
        .find((g) => g.id === 'alphafold-paper')!
        .connectionClaims!.map((c) => c.id),
    ).toEqual(['atlas-jumper-gdm', 'atlas-jumper-alphafold']);
  });
  it('preserves original claim identity, evidence, time and qualifications', () => {
    const before = JSON.stringify(data);
    institutionalDossier(data, 'anthropic');
    for (const c of dossier.claims) expect(c).toBe(repository.claims.get(c.id));
    expect(new Set(dossier.claims.map((c) => c.id)).size).toBe(
      dossier.claims.length,
    );
    expect(dossier.sourceIds).toEqual(
      [
        ...new Set(
          dossier.claims.flatMap((c) =>
            c.evidenceIds.map((id) => repository.evidence.get(id)!.sourceId),
          ),
        ),
      ].sort(),
    );
    expect(JSON.stringify(data)).toBe(before);
  });
  it('is deterministic even when input collections are reordered', () => {
    expect(
      institutionalDossier(
        {
          ...data,
          claims: [...data.claims].reverse(),
          entities: [...data.entities].reverse(),
          evidence: [...data.evidence].reverse(),
          sources: [...data.sources].reverse(),
        },
        'anthropic',
      ),
    ).toEqual(dossier);
  });
  it('includes founders and documented paths without joining their dates', () => {
    expect(ids('people')).toEqual(
      expect.arrayContaining([
        'dario-cofounded-anthropic-2021',
        'dario-openai-vp-2020',
        'dario-openai-departure-announced-2020',
        'daniela-openai-safety-prior',
        'jared-kaplan-anthropic-cofounder',
        'leike-deepmind-alignment-prior',
      ]),
    );
    const unknown = dossier.sections.chronology.at(-1)!;
    expect(unknown.label).toBe('Date unknown');
    expect(unknown.claims.map((c) => c.id)).toContain(
      'jared-kaplan-anthropic-cofounder',
    );
    expect(
      repository.claims.get('kingma-anthropic-research-from-2024')!.time,
    ).toMatchObject({ kind: 'interval', from: '2024' });
    expect(
      dossier.sections.people[0].claims.some(
        (c) =>
          c.predicate === 'co_founded' &&
          c.object.kind === 'entity' &&
          c.object.entityId === 'anthropic',
      ),
    ).toBe(true);
  });
  it('bounds documentary context to explicit links and gives its actual provenance', () => {
    expect(ids('ideas')).toEqual(
      expect.arrayContaining([
        'lineage-ii-leike-reward',
        'lineage-ii-weak-cites-reward',
        'lineage-ii-weak-discusses-oversight',
        'rsp-credits-arc-2023',
        'lineage-scaling-uses-attention',
      ]),
    );
    expect(ids('ideas')).not.toContain('lineage-ii-amplification-cites-debate');
    expect(ids('ideas')).not.toContain('iem-cites-good-2013');
    expect(
      dossier.sections.ideas
        .find((g) => g.id === 'weak-strong-paper')!
        .connectionClaims!.map((c) => c.id),
    ).toEqual([
      // From 2026-10-17 the dated joining record of the lab genealogy.
      'lg-ant-leike-joins-2024',
      'lineage-ii-leike-reward',
    ]);
    expect(dossier.connections['lineage-ii-weak-cites-reward']).toContain(
      'no adoption implied',
    );
  });
  it('keeps separate counterparties, stages and joint agreement edges', () => {
    expect(dossier.sections.capital.map((g) => g.id)).toEqual(
      expect.arrayContaining(['amazon', 'aws', 'google', 'broadcom']),
    );
    expect(ids('capital')).toEqual(
      expect.arrayContaining([
        'amazon-anthropic-initial-2023',
        'amazon-anthropic-conditional-2026',
        'anthropic-google-capacity-2026',
        'anthropic-broadcom-capacity-2026',
        'capital-ii-anthropic-aws-nonexclusive-2024',
      ]),
    );
    expect(
      dossier.claims.find((c) => c.id === 'amazon-anthropic-conditional-2026')!
        .attributes!.amount!.bound,
    ).toBe('up_to');
    expect(
      dossier.claims.find((c) => c.id === 'amazon-anthropic-initial-2023')!
        .time,
    ).toMatchObject({ date: '2023-09' });
  });
  it('includes the policy sequence and deltas without cross-publisher leakage', () => {
    // Eleven groups before week 4b; its Frontier Compliance Framework
    // announcement forms a twelfth, and RSP v3.0's quoted reference to
    // California SB 53 joins the RSP v3.0 records.
    const added = new Set(week4b.added.claims);
    const added4c = new Set(week4c.added.claims);
    // Board records of the 2026-10-17 lab genealogy form their own groups.
    const addedGenealogy = new Set(genealogy.added.claims);
    expect(
      dossier.sections.governance.filter((g) =>
        g.claims.some(
          (c) =>
            !added.has(c.id) && !added4c.has(c.id) && !addedGenealogy.has(c.id),
        ),
      ),
    ).toHaveLength(11);
    expect(
      ids('governance')
        .filter((id) => added.has(id))
        .sort(),
    ).toEqual(['sb-anthropic-fcf-published', 'sb-link-rsp-v3-0']);
    // Week 4c adds Anthropic's control-structure records; their provisions
    // and version changes stay on the control-structure page.
    const governance4c = ids('governance')
      .filter((id) => added4c.has(id))
      .sort();
    expect(governance4c.filter((id) => !id.startsWith('cm-'))).toEqual([
      'cs-anthropic-legal-form-2021',
      'cs-anthropic-legal-form-2025',
      'cs-anthropic-ltbc-director-approval-2021',
      'cs-anthropic-ltbt-class-t-consent',
      'cs-anthropic-ltbt-described-2023',
      'cs-anthropic-ltbt-elects-directors',
      'cs-anthropic-ltbt-removes-directors',
      'cs-assessed-anthropic-ltbt-independence',
      'cs-hastings-anthropic-board-2025',
      'cs-kreps-anthropic-board-2024',
      'cs-narasimhan-anthropic-board-2026',
    ]);
    // It also adds Anthropic's listings and announced intent for external
    // commitments, and its RSP editions' own references to them; provisions
    // of the commitment texts stay on the commitments page.
    expect(governance4c.filter((id) => id.startsWith('cm-'))).toEqual([
      'cm-eu-code-anthropic',
      'cm-eu-code-intent-anthropic',
      'cm-link-rsp-2023-wh',
      'cm-link-rsp-v2-0-seoul',
      'cm-link-rsp-v2-0-wh',
      'cm-link-rsp-v2-1-seoul',
      'cm-link-rsp-v2-1-wh',
      'cm-link-rsp-v2-2-seoul',
      'cm-link-rsp-v2-2-wh',
      'cm-seoul-anthropic',
      'cm-wh-2023-07-anthropic',
    ]);
    expect(ids('governance')).toContain('eval-ontology-i-arc-anthropic');
    expect(ids('governance')).toContain('rsp-v3-2-reviewer-approval');
    expect(
      dossier.claims.find((c) => c.id === 'issued-rsp-2-0')!.time,
    ).toMatchObject({ basis: 'effective' });
    expect(ids('governance').some((id) => id.includes('fsf'))).toBe(false);
  });
  it('works for another institution, keeps literal amounts, and handles empty/invalid focus', () => {
    const xai = institutionalDossier(data, 'xai')!;
    expect(
      xai.claims.some(
        (c) => c.id === 'xai-round-total-2024' && c.object.kind === 'literal',
      ),
    ).toBe(true);
    expect(xai.institution.id).toBe('xai');
    expect(institutionalDossier(data, 'dario-amodei')).toBeNull();
    expect(institutionalDossier(data, 'missing')).toBeNull();
    const empty = institutionalDossier({ ...data, claims: [] }, 'anthropic')!;
    expect(empty.claims).toEqual([]);
    expect(empty.coverage.from).toBeUndefined();
  });
});
