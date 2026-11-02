# Selekoa

**A documentary history of machine intelligence and of human thought about it.**

[selekoa.org](https://selekoa.org) · [About and method](https://selekoa.org/about) · [How it was built](https://selekoa.org/about#about-built) · [Dataset releases](release/CHANGELOG.md)

Selekoa records who built what in machine intelligence, who controlled which lab and when, what the labs' safety frameworks say edition by edition, how laws and governments responded, and what people have argued about it. Every statement links to the passage in the source it rests on. Machines found the sources, quoted them and checked each other's work. The question, the point of view and the stance are left to the reader.

This repository holds the site's source code and the full dataset.

## Ways in

- [Compare frameworks](https://selekoa.org/compare/frontier-safety-frameworks): the safety frameworks of seven developers, edition by edition, on the same 18 questions, each cell with its passage and page. There is a CSV of every cell.
- [Control timelines side by side](https://selekoa.org/control/side-by-side): the board, ownership and control records of OpenAI, Anthropic, Google DeepMind and xAI on one time axis.
- [Browse by year](https://selekoa.org/years): every dated record, one page per year.
- [Propositions by author](https://selekoa.org/stances): which texts state, contest or bear on each proposition about machine intelligence, and when.
- [Explore the records](https://selekoa.org/explore): every claim as a list, timeline or map, with institutional dossiers and a people index.

## How it is built

Every claim links to the passage it rests on, quoted word for word or marked as a paraphrase. AI agents, mostly Anthropic's Claude Code, drafted the research and the code. Since mid-October 2026, OpenAI's Codex has checked each batch blind: it gives its own answers before it sees the drafter's, and the disagreements are settled and recorded before anything is admitted. The editorial rules are enforced by tests: a page that breaks them fails the build. No person reads every record before publication. The maintainer sets the rules, reviews every batch of changes and decides what is admitted.

The [operating guide](docs/operating-guide.md) describes the pipeline, and the [editorial policy](docs/editorial-policy.md) the rules: "earliest located", never "first"; dates keep their kind and precision; an announcement stays an announcement; a commitment is never evidence of compliance.

Selekoa does not replace library research. Most scholarly literature sits behind paywalls that the machines building Selekoa cannot pass. Selekoa works from openly available material: company and government documents, archived web pages, open-access papers and preprints, forums and blogs. For much of the recent history of AI, that material is the primary record.

## Data

- **Releases:** [`release/`](release/CHANGELOG.md) holds every dataset release as JSON and CSV, with a manifest of counts and checksums, a changelog of records added, changed and removed, and a citation file. A release is never overwritten, and the latest one can be rebuilt from the data and checked byte for byte (`pnpm release <version> --check`).
- **Working data:** [`data/`](data/README.md). The format is described in [`docs/dataset-format.md`](docs/dataset-format.md).
- **For programs:** [selekoa.org/llms.txt](https://selekoa.org/llms.txt) describes the site and its data files.
- **Citing:** cite a record by its ID and release, for example "Selekoa, claim record `<claim-id>`, dataset release <version>". Each release's `CITATION.cff` gives the details.

## Licence

Code: MIT ([`LICENSE`](LICENSE)). Selekoa's own data and text: CC BY 4.0 ([`LICENSE-DATA.txt`](LICENSE-DATA.txt)). Third-party quotations and source documents are excluded. See [`LICENSING.md`](LICENSING.md).

## Contact

Corrections and suggestions for new collections: maintainer@selekoa.org. Please give the record ID, what is wrong, and the source that shows it.

## Development

This repository receives snapshots of the development repository at each release ([publishing](docs/publishing.md)). The project overview, current coverage, local commands and release mechanics are in [`docs/development.md`](docs/development.md).
