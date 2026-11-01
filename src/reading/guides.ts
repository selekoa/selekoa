import { frontierFrameworksAndLaw } from './frameworks-and-law';
import { frameworkChanges } from './framework-changes';
import { computeBuildout } from './compute-buildout';

/** Guided readings: pages that bring several collections' records together. */
export const guides = [frontierFrameworksAndLaw];

/**
 * Guided readings of the framework comparison, edition by edition. Not yet a
 * release collection: registering one changes the release input.
 */
export const editionGuides = [frameworkChanges];

/**
 * Guided readings of the compute, power and chip records. Not yet a release
 * collection, for the same reason.
 */
export const computeGuides = [computeBuildout];

const allGuides = [...guides, ...editionGuides, ...computeGuides];

/** Every guided reading's address id, in page order. */
export const guideIds = allGuides.map((g) => g.id);

/** A guided reading's title and question, for page metadata. */
export const guideById = (id: string) => allGuides.find((g) => g.id === id);
