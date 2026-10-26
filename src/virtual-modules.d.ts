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
