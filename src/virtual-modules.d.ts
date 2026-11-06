declare module 'virtual:landing-summary' {
  const summary: import('./domain/landing').LandingSummary;
  export default summary;
}

declare module 'virtual:site' {
  /** Latest dataset release in this build, such as "0.4.0"; null if none. */
  export const releaseVersion: string | null;
  /** The corrections address, or null while it is still the placeholder. */
  export const contact: string | null;
  /** The analytics provider switched on in site.config.json. */
  export const analytics: 'none' | 'cloudflare' | 'goatcounter';
  /** Whether search engines may index the site. */
  export const indexing: boolean;
  /** Whether indexing or analytics is on, so the site counts as public. */
  export const isLive: boolean;
}

declare module 'virtual:latest-release' {
  /** The newest dataset release's summary (scripts/site-config.ts). */
  const release: import('./ui/release-info').ManifestSummary | null;
  export default release;
}

declare module 'virtual:site-facts' {
  const facts: import('./domain/site-facts').SiteFacts;
  export default facts;
}

declare module 'virtual:about-facts' {
  const facts: import('./domain/about-facts').AboutFacts;
  export default facts;
}

declare module 'virtual:search-index' {
  export const manifest: import('./domain/search-index').IndexManifest;
  export const facets: import('./ui/search-facets').SearchFacets;
  export const load: import('./domain/search-index').IndexLoader;
}

declare module 'virtual:records-core' {
  const core: import('./domain/slices').PlacedSlice;
  export default core;
}

declare module 'virtual:records-content' {
  const content: import('./domain/slices').Content;
  export default content;
}
