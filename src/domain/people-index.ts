import type { Dataset } from './schema';

/**
 * One collation for the whole list. National alphabet orders (for example
 * Hungarian digraphs) are deliberately not applied; see docs/ontology.md.
 */
export const nameCollator = new Intl.Collator('en', { sensitivity: 'base' });

const initial = (sortName: string) =>
  sortName
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
    .charAt(0)
    .toLocaleUpperCase('en');

/**
 * People A–Z: sorted and grouped by the stored "Family, Given" sortName,
 * displayed under their stored name.
 */
export function peopleIndex(data: Dataset) {
  const people = data.entities
    .filter((e) => e.type === 'person')
    .map((e) => ({ id: e.id, name: e.name, sortName: e.sortName! }))
    .sort(
      (a, b) =>
        nameCollator.compare(a.sortName, b.sortName) ||
        a.id.localeCompare(b.id),
    );
  const groups: { letter: string; people: typeof people }[] = [];
  for (const person of people) {
    const letter = initial(person.sortName);
    if (groups.at(-1)?.letter !== letter) groups.push({ letter, people: [] });
    groups.at(-1)!.people.push(person);
  }
  return groups;
}

export type PeopleIndex = ReturnType<typeof peopleIndex>;
