import { describe, expect, it } from 'vitest';
import { createRepository, repository } from './repository';
import { datasetSchema } from './schema';
import { nameCollator, peopleIndex } from './people-index';
import { preSortNameData } from '../editorial/pre-sort-name-data';
import { preFrameworkEvidenceRaw } from '../editorial/pre-framework-evidence-data';

const data = repository.data;
const people = data.entities.filter((e) => e.type === 'person');

describe('person sort names', () => {
  it('changes only sortName values and the schema label from the 2.5 dataset', () => {
    // Schema 2.7 changes are reversed separately by the pre-2.7 view.
    const pre27 = createRepository(preFrameworkEvidenceRaw).data;
    const restored = {
      ...pre27,
      meta: { ...pre27.meta, schemaVersion: '2.5' },
      entities: pre27.entities.map((e) =>
        Object.fromEntries(Object.entries(e).filter(([k]) => k !== 'sortName')),
      ),
    };
    expect(preSortNameData).toEqual(restored);
    expect(pre27.meta.schemaVersion).toBe('2.6');
  });

  it('gives every person a "Family, Given" sortName and no other entity one', () => {
    for (const p of people) expect(p.sortName).toMatch(/^[^,]+, [^,]+$/);
    for (const e of data.entities.filter((e) => e.type !== 'person'))
      expect(e.sortName).toBeUndefined();
  });

  it('rejects a person without a sortName and a non-person with one', () => {
    const missing = structuredClone(data);
    delete missing.entities.find((e) => e.type === 'person')!.sortName;
    expect(datasetSchema.safeParse(missing).success).toBe(false);
    missing.meta.schemaVersion = '2.5';
    expect(datasetSchema.safeParse(missing).success).toBe(true);
    const misplaced = structuredClone(data);
    misplaced.entities.find((e) => e.type === 'organisation')!.sortName =
      'Lab, Example';
    expect(datasetSchema.safeParse(misplaced).success).toBe(false);
  });

  it('sorts by sortName with one collation, groups by its initial and keeps display names', () => {
    const groups = peopleIndex(data);
    const flat = groups.flatMap((g) => g.people);
    expect(flat).toHaveLength(people.length);
    expect(flat.map((p) => p.sortName)).toEqual(
      [...flat.map((p) => p.sortName)].sort(nameCollator.compare),
    );
    for (const g of groups)
      for (const p of g.people)
        expect(p.sortName[0].toUpperCase()).toBe(g.letter);
    for (const p of flat)
      expect(p.name).toBe(people.find((e) => e.id === p.id)!.name);
    const byName = (name: string) => flat.find((p) => p.name === name)!;
    expect(byName('Liang Wenfeng / 梁文锋').sortName).toBe('Liang, Wenfeng');
    expect(byName('Yann LeCun').sortName).toBe('LeCun, Yann');
    expect(groups.map((g) => g.letter)).toEqual([
      ...new Set(groups.map((g) => g.letter)),
    ]);
  });
});
