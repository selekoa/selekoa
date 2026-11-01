# People: executives and single-record authors, scope and method

A candidate research pack outside application data, for two backlog items in the [roadmap](../../docs/roadmap.md): the **executives pass** and **single-record authors**. Nothing here is admitted or editorially accepted. It changes nothing in `data/`, the application, the schema or any release. Scope set on 2026-10-29 by the task prompt of that date; written before research began.

## Part 1: executives

**Who.** Chief executives and board chairs of developers and parent companies that the dataset covers:

- Sundar Pichai (Alphabet, Google), Satya Nadella (Microsoft), Mark Zuckerberg (Meta), Jensen Huang (NVIDIA), Masayoshi Son (SoftBank Group) and Larry Ellison (Oracle), because dataset records involve their companies;
- heads of Chinese developers, only where the dataset's Chinese records (the China atlas and the second Chinese collection) name them;
- existing person records that have no role record (`held_role`), other than the "Writer" records admitted from the author-person pack, whose rules exclude affiliations.

**What.** For each person:

- public roles (chief executive, chair, executive chair, chief technology officer, founder) with dated intervals or snapshots, each from a primary source: an annual report or proxy statement filed with a regulator, a prospectus, or the company's own announcement;
- their own signed statements that bear on frontier AI governance or compute: posts, letters and essays bylined or signed by the person, recorded as authorship plus what the text states.

**Rules.**

- An interval is recorded only where a source gives both or one boundary; otherwise a snapshot dated by the document. A snapshot is never a tenure.
- Never extrapolate a past role into the present. Where only a current page exists, the record is an "as of" snapshot dated by the retrieval and says so.
- An announcement date is not an effective date. Where an announcement gives an effective date, both are kept.
- A proxy or annual report states roles as of its own date; its publication date is the snapshot date unless the text dates the role.
- No affiliation from proximity, no ideology labels, no motives. A statement records what the text says, not what the person believes or did.
- Company announcements are primary evidence that the company announced; a filing is the filer's statement.

## Part 2: single-record authors

**Who.** Persons in the structured author list (`authorNames`) of a dataset source whose document record is the only dataset document that credits them, and who have no person record. Matching of printed forms follows the author-person pack (family name and compatible given name).

**Rule for a proposal.** A person record is proposed only where a **second public source** identifies the person as the author of that document: an institutional page (a university, laboratory or employer page) or another authored text (the person's own page or CV, or a later text by the person that claims the document). The byline itself is the first source. A same-name author of another paper is not enough without a link to the credited document. Otherwise the person is listed as a printed name only.

**What a candidate contains.** As in the author-person pack: proposed ID, the name as printed (other printed forms only where a source links them), a sort name, subtype "Writer", a description that says only which document credits the person, identity sources, and one `authored` record from the byline. No discipline, nationality, birth date, affiliation history, photograph or contact detail. An affiliation printed on the identifying page is not proposed as a role.

- Name as printed; never merge variant names without a source.
- No affiliation from proximity; no ideology labels.

## Sources and retrieval

Direct HTTP through `tools.mjs fetch`, sequential and paced, with final URL, HTTP status and SHA-256 recorded; bodies stay in the ignored `.local/people/` cache. Filings come from SEC EDGAR, retrieved under the SEC's fair-access rules with a user agent naming the project contact. Wikipedia and similar summaries are discovery aids only. Quotations follow the editorial policy (50 words; per-source budget).

## Bounds

- About 150 candidate records in all (person records, role records, authorship and statement records).
- Executives: roles in the companies the dataset covers, from 2004 to the check date; earlier roles only where a filing states them.
- Omissions are listed with their reasons. An omission is not a judgement of importance.

## Checks

- Mechanical: every quotation matched against the retrieved text of its own source; limits; locators; date fields.
- Same-family audit (`audit.md`): random and targeted sample, with dispositions.
- Cross-family brief: Part A blind (role dates, identity), Part B direct; the pack's answers in a separate verdicts file.
