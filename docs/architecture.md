# Architecture

## Decisions and flow

Selekoa is a source-critical institutional memory and research base for machine intelligence. Its durable asset is the evidence-backed historical corpus and its research semantics. Research collections, explanatory views and research starters are connected capabilities; the graph is one interface rather than the product identity. Dossiers, person views, document/version histories, timelines, source inspection, exports and future query interfaces should serve the research task. Graph functionality may be reduced or omitted when it does not improve historical understanding. The application flow below describes the existing atlas implementation. The [Reborn Genesis I decision](research-corpus.md) adds a separate validated corpus and deterministic exports under `research/collections/`, with pure code in `src/research`. Corpus propositions do not enter `data/`, graph queries or the browser bundle. Their upstream findings do not map automatically to claim resolution, evidence review or editorial acceptance.

TypeScript and React render a Vite application. Graphology holds a directed multigraph; Sigma renders curved arrow edges in WebGL. A deterministic component layout leaves unsupported connections absent and keeps positions stable. Distance has no analytical meaning.

Source-controlled JSON provides legible diffs, runtime validation and straightforward future ingestion. There is no database, backend, authentication, telemetry, crawler or cloud service.

```text
data/*.json
    → Zod shape and referential/editorial validation
    → repository (records and indexes)
    → pure search, temporal and neighbourhood queries
    → React lists and inspector
    → Graphology projection → Sigma
```

Every graph edge key is its claim ID. The shared `relationshipClaims` projection excludes literal objects. Parallel/opposing edges do not merge claims. Literal claims remain in text views. Evidence is attached to claims, never guessed from graph proximity.

Claim derivation, resolution and editorial state are stored separately from evidence roles and verification. Shared presentation helpers derive labels and evidence coverage; primary/secondary never controls a truth ranking.

The renderer loads as a separate chunk. The initial overview filters to institutions and compute assets; topics and entity focus disclose people, documents and concepts. Claims and Timeline provide text alternatives using the same filters. WebGL failure leaves those alternatives available.

## Loading

The start page renders from a summary computed from `data/*.json` at build time
(`scripts/landing-summary.ts`, `src/domain/landing.ts`), so the first load carries
no records. `src/App.tsx` is that light shell. Any other address, or a link from the
start page, loads `src/Workspace.tsx` with the records, which form one chunk of their
own so that a code change does not invalidate a cached copy of the data. Each page's
code (dossier, document history, search and so on) loads when the page first opens.
The earlier stylesheets still load with the first page, in their original order.

## Search

`src/domain/search.ts` is a pure full-text search over claim statements and
qualifications, evidence passages and locators, source titles, entity names and
aliases, and record IDs. A term matches the beginning of a word after case, accents,
dashes and quote styles are folded; every term must match. Collection and
organisation filters follow each record's claims and stored document publishers, and
infer nothing. The score only orders matches by field and completeness. Name lookup
is the same search restricted to names and aliases.

## Storage boundary

`src/domain` has no React or Sigma dependency. Future file, SQL or API loaders can supply the same validated Dataset to `createRepository`. Preserve the entity/claim/source/evidence contract and stable IDs while replacing storage behind that boundary. Larger datasets will need indexed queries and paginated neighbourhoods rather than a complete browser download.

The app records historical events/snapshots, not current-state contract and employment intervals. Counts describe the sample, never the real-world size of the sector. The build is static-host compatible; deployment is neither configured nor authorized.

## Quality

Vitest checks evidence gates, dates, references, filtering, multiple relations and layout edge cases. Playwright uses installed Edge against the production build and checks navigation, evidence, temporal/type filters, literal claims, keyboard access, responsive overflow and axe accessibility. Tests cannot establish factual truth; source assessment remains editorial work.

## Research pipeline boundary

`scripts/review-seed.ts` validates the dataset and uses a pure document renderer in `src/editorial` plus the explicit order in `review/seed-order.json`. It creates a deterministic, tracked Markdown working aid with no runtime dependency from the app. The generator uses no wall-clock timestamp, network requests, credentials or personal metadata, refuses to replace differing files and contains no decision importer.

Discovery → candidate extraction → source/version and passage capture → validation/deduplication → authorised exploratory admission as seeds → UI. Risk-based review and independent spot-checking follow the [editorial policy](editorial-policy.md). Human acceptance remains a separate explicit decision; curated interpretations require inspection of their selected claims, source paths and framing.

Future importers must write to a separate candidate inbox, never directly to application data. Retain extractor identity, upstream version, retrieval timestamp, locator and proposed assertion. Review source identity, temporal adequacy, context, reuse terms and competing evidence. Only an explicit editorial step changes acceptance.

External dataset facts remain attributed upstream records; Selekoa's interpretations linking them are separate claims. Prefer official downloads and preserve refresh mappings. Genesis does not need a crawler.

## Institutional reading projection

Integration I adds `src/domain/dossier.ts`: a pure bounded selection/grouping query over the validated Dataset. It returns original Claim objects, stable IDs, derived coverage/source counts and explicit document-inclusion context. It does not depend on React or Sigma, copy statements into another store, infer transitive relations or mutate review state. Reordered input produces deterministic output.

`src/ui/Dossier.tsx` presents chronological and thematic disclosure groups. `Workspace` owns institution focus and claim selection across Dossier, Map, Claims and Timeline, using the existing Inspector for evidence. Dossiers expose their own complete selection; map filters are hidden and preserved while dossier mode is active. Shared theme tokens affect presentation only. See [the selection contract and known limits](institutional-dossiers.md).
