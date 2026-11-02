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

/**
 * A name's plain slug: marks removed, lower case, any other characters
 * joined by one hyphen. Most person records have it as their identifier.
 */
export const nameSlug = (name: string) =>
  name
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

/**
 * A person as the landing summary, which every page loads, lists them: the
 * name alone when the identifier is the name's slug, otherwise both.
 */
export type ListedPerson = string | { id: string; name: string };
export const listPerson = ({
  id,
  name,
}: {
  id: string;
  name: string;
}): ListedPerson => (id === nameSlug(name) ? name : { id, name });
/** The identifier and name of a listed person. */
export const listedPerson = (p: ListedPerson) =>
  typeof p === 'string' ? { id: nameSlug(p), name: p } : p;
